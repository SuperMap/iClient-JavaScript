import CoordTransfer from '../../../src/mapboxgl/mapping/CoordTransfer';

function createCv() {
  function Mat() {
    this.data64F = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    this.delete = jasmine.createSpy('delete');
    this.inv = () => this;
  }

  return {
    CV_64FC1: 'CV_64FC1',
    Mat,
    matFromArray: (rows, cols, type, values) => {
      const mat = new Mat(rows, cols, type);
      mat.data64F = values;
      return mat;
    },
    Rodrigues: jasmine.createSpy('Rodrigues'),
    gemm: jasmine.createSpy('gemm'),
    multiply: jasmine.createSpy('multiply'),
    subtract: jasmine.createSpy('subtract')
  };
}

describe('CoordTransfer', () => {
  it('shares video camera calibration without mutating the supplied pose', () => {
    const parameters = Object.freeze({ fovX: 90, fovY: 90, centerX: 320, centerY: 180, x: 1000, y: 2000 });
    const camera = CoordTransfer.fromVideoParameters(null, parameters, 640, 360);
    expect(camera.configs.fx).toBeCloseTo(320, 8);
    expect(camera.configs.fy).toBeCloseTo(180, 8);
    expect(camera.configs.x).toBe(parameters.x);
    expect(parameters.fx).toBeUndefined();
    expect(parameters.fy).toBeUndefined();
  });

  it('roundtrips ground coordinates using cached rotation and non-square focal lengths', () => {
    const rotations = [
      [1, 0, 0, 0, -1, 0, 0, 0, -1],
      [0, 1, 0, 1, 0, 0, 0, 0, -1],
      [0.8, 0.6, 0, 0.6, -0.8, 0, 0, 0, -1],
      [1, 0, 0, 0, -0.8, 0.6, 0, -0.6, -0.8]
    ];
    rotations.forEach((R) => {
      const camera = new CoordTransfer(null, {});
      const origin = [13498549.6, 3676577.9, 103.4];
      camera._R = R;
      camera._t = [0, 1, 2].map((row) => -R.slice(row * 3, row * 3 + 3).reduce((sum, value, column) => sum + value * origin[column], 0));
      camera._fx = 800;
      camera._fy = 650;
      camera._cx = 320;
      camera._cy = 180;
      for (let u = 0; u <= 640; u += 80) {
        for (let v = 0; v <= 360; v += 60) {
          const ground = camera.toSpatialCoordinate([u, v]);
          const pixel = camera.toVideoCoordinate(ground).data64F;
          expect(ground[2]).toBeCloseTo(0, 8);
          expect(pixel[0]).toBeCloseTo(u, 5);
          expect(pixel[1]).toBeCloseTo(v, 5);
        }
      }
    });
  });

  it('uses no OpenCV allocations for repeated unprojection and rejects the horizon', () => {
    const cv = createCv();
    spyOn(cv, 'Mat').and.callThrough();
    spyOn(cv, 'matFromArray').and.callThrough();
    const camera = new CoordTransfer(cv, {});
    camera._R = [1, 0, 0, 0, -1, 0, 0, 0, -1];
    camera._t = [-1000, 2000, 100];
    camera._fx = camera._fy = 100;
    camera._cx = camera._cy = 50;
    for (let i = 0; i < 10000; i++) {
      expect(camera.toSpatialCoordinate([50, 50])).toEqual([1000, 2000, 0]);
    }
    expect(cv.Mat).not.toHaveBeenCalled();
    expect(cv.matFromArray).not.toHaveBeenCalled();
    expect(cv.Rodrigues).not.toHaveBeenCalled();
    expect(cv.gemm).not.toHaveBeenCalled();
    camera._R = [1, 0, 0, 0, 0, 1, 0, -1, 0];
    expect(camera.toSpatialCoordinate([50, 50]).every(Number.isFinite)).toBe(false);
    camera.dispose();
    expect(camera.toSpatialCoordinate([50, 50])).toEqual([]);
  });

  it('should return null for invalid camera input and points behind the camera', () => {
    const transfer = new CoordTransfer(null, {});

    expect(transfer.toRotationMatrix(0, 0, 0)).toBeUndefined();
    expect(transfer.toCameraCoordinate([1])).toBeNull();
    expect(transfer.projectCameraToVideo([1, 2, 3])).toBeNull();

    transfer._fx = 100;
    transfer._fy = 100;
    transfer._cx = 10;
    transfer._cy = 20;
    expect(transfer.projectCameraToVideo([1, 2, 0])).toBeNull();
    expect(transfer.projectCameraToVideo([1, 2, 2])).toEqual([60, 120]);
  });

  it('should convert camera coordinates and video coordinates', () => {
    const transfer = new CoordTransfer(null, {});
    transfer._R = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    transfer._t = [10, 20, 30];
    transfer._fx = 100;
    transfer._fy = 200;
    transfer._cx = 5;
    transfer._cy = 6;

    expect(transfer.toCameraCoordinate([1, 2])).toEqual([11, 22, 30]);
    const videoCoordinate = transfer.toVideoCoordinate([1, 2]);
    expect(videoCoordinate.data64F[0]).toBeCloseTo(41.6667, 4);
    expect(videoCoordinate.data64F[1]).toBeCloseTo(152.6667, 4);
    expect(videoCoordinate.depth).toBe(30);
    expect(transfer.toVideoCoordinate([1])).toEqual({ data64F: [], depth: null });
  });

  it('should build camera matrices and release replaced matrices', () => {
    const cv = createCv();
    const transfer = new CoordTransfer(cv, {});
    transfer.rotationMatrix = new cv.Mat();
    transfer.rotationMat3 = new cv.Mat();
    transfer.translationMatrix = new cv.Mat();
    transfer.k = new cv.Mat();
    transfer.setCameraLocation({
      pitch: 0,
      roll: 0,
      yaw: 0,
      x: 1,
      y: 2,
      z: 3,
      fx: 100,
      fy: 200,
      centerX: 10,
      centerY: 20
    });

    expect(cv.Rodrigues).toHaveBeenCalled();
    expect(cv.gemm).toHaveBeenCalled();
    expect(transfer.toCameraMatrix(100, 200, 10, 20).data64F).toEqual([
      100, 0, 10, 0, 200, 20, 0, 0, 1
    ]);
  });

  it('reuses matrices for the same physical pose and recalculates them when the camera moves', () => {
    const cv = createCv();
    const camera = new CoordTransfer(cv, {});
    const parameters = { pitch: -90, roll: 0, yaw: 0, x: 1000, y: 2000, z: 100, fx: 320, fy: 180, centerX: 320, centerY: 180 };
    camera.setCameraLocation(parameters);
    const matrices = [camera.rotationMatrix, camera.rotationMat3, camera.translationMatrix, camera.k];
    cv.Rodrigues.calls.reset();
    cv.gemm.calls.reset();
    camera.setCameraLocation({ ...parameters, time: 1, extent: [[0, 0], [1, 1]] });
    expect([camera.rotationMatrix, camera.rotationMat3, camera.translationMatrix, camera.k]).toEqual(matrices);
    expect(cv.Rodrigues).not.toHaveBeenCalled();
    expect(cv.gemm).not.toHaveBeenCalled();
    matrices.forEach((matrix) => expect(matrix.delete).not.toHaveBeenCalled());
    camera.setCameraLocation({ ...parameters, x: 1001 });
    expect(cv.Rodrigues).toHaveBeenCalled();
    expect(camera._x).toBe(1001);
    matrices.forEach((matrix) => expect(matrix.delete.calls.count()).toBe(1));
    camera.dispose();
  });
});
