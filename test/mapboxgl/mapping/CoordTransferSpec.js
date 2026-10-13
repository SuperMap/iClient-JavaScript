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
});