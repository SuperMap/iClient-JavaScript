import proj4 from 'proj4';
import CoordTransfer from '../../../src/common/overlay/video/CoordTransfer';
import MapboxCoordTransfer from '../../../src/mapboxgl/mapping/CoordTransfer';
import { VideoFrameProcessor } from '../../../src/common/overlay/video/VideoFrameProcessor';

describe('common_VideoFrameProcessor', () => {
    var cv, processor, matrices, extent;
    var parameters = { fovX: 90, fovY: 90, x: 50, y: 50, z: 50, pitch: 90, roll: 0, yaw: 0, centerX: 2, centerY: 2 };

    beforeEach(() => {
        matrices = [];
        function Mat(rows = 0, cols = 0) {
            this.rows = rows;
            this.cols = cols;
            this.data = new Uint8Array(rows * cols * 4);
            this.delete = jasmine.createSpy('delete');
            matrices.push(this);
        }
        cv = {
            Mat,
            Size: function (width, height) { this.width = width; this.height = height; },
            CV_8UC4: 24,
            CV_32FC2: 13,
            matFromArray: jasmine.createSpy('matFromArray').and.callFake((rows, cols, type, values) => {
                var matrix = new Mat(rows, cols);
                matrix.values = values;
                matrix.data32F = new Float32Array(values);
                return matrix;
            }),
            findHomography: jasmine.createSpy('findHomography').and.callFake(() => new Mat(3, 3)),
            warpPerspective: jasmine.createSpy('warpPerspective').and.callFake((source, destination) => {
                destination.data = source.data;
            })
        };
        spyOn(CoordTransfer.prototype, 'init').and.callFake(function () { return Promise.resolve(this); });
        spyOn(CoordTransfer.prototype, 'setCameraLocation');
        spyOn(CoordTransfer.prototype, 'toSpatialCoordinate').and.callFake((point) => [point[0] * 25, 100 - point[1] * 25, 0]);
        extent = [[0, 100], [100, 100], [100, 0], [0, 0]].map((point) => proj4('EPSG:3857', 'EPSG:4326', point));
        processor = new VideoFrameProcessor(cv);
    });

    afterEach(() => processor.dispose());

    it('keeps the existing MapboxGL import bound to the shared calibration class', () => {
        expect(MapboxCoordTransfer).toBe(CoordTransfer);
    });

    it('keeps SEI geometry intersections on the near clipping plane projectable', () => {
        var camera = new CoordTransfer(null, {});
        camera._fx = camera._fy = 1;
        camera._cx = camera._cy = 0;
        // SEI 裁剪交点恰好位于近裁剪平面，迁移共用算法时必须保留边界可见性。
        expect(camera.projectCameraToVideo([0.01, 0.02, 0.01])).toEqual([1, 2]);
        expect(camera.projectCameraToVideo([0.01, 0.02, 0.009])).toBeNull();
    });

    it('releases owned camera matrices and makes disposal idempotent', () => {
        var camera = new CoordTransfer(cv, {});
        camera.rotationMatrix = new cv.Mat();
        camera.rotationMat3 = new cv.Mat();
        camera.translationMatrix = new cv.Mat();
        camera.k = new cv.Mat();
        camera.dispose();
        camera.dispose();
        matrices.forEach((matrix) => expect(matrix.delete.calls.count()).toBe(1));
    });

    it('normalizes the Mercator ground coordinates to a stable output size', async () => {
        await processor.init(4, 4, parameters, extent);
        expect(processor.width).toBe(4);
        expect(processor.height).toBe(4);
        var destination = cv.matFromArray.calls.argsFor(1)[3];
        [0, 0, 4, 0, 4, 4, 0, 4].forEach((value, index) => expect(destination[index]).toBeCloseTo(value, 5));
    });

    it('clips the geographic extent and reuses frame buffers and matrices', async () => {
        await processor.init(4, 4, parameters, extent.slice(0, 3));
        var video = document.createElement('canvas');
        video.width = video.height = 4;
        video.getContext('2d').fillRect(0, 0, 4, 4);
        var output = document.createElement('canvas');
        output.width = output.height = 4;
        var count = matrices.length;
        processor.render(video, output);
        processor.render(video, output);
        expect(output.getContext('2d').getImageData(3, 0, 1, 1).data[3]).toBe(255);
        expect(output.getContext('2d').getImageData(0, 3, 1, 1).data[3]).toBe(0);
        expect(matrices.length).toBe(count);
        processor.dispose();
        processor.dispose();
        matrices.forEach((matrix) => expect(matrix.delete.calls.count()).toBe(1));
    });

    it('applies the video pixel clipping before reading a frame', async () => {
        await processor.init(4, 4, parameters, extent, [[1, 0], [3, 0], [3, 4], [1, 4]]);
        var video = document.createElement('canvas');
        video.width = video.height = 4;
        video.getContext('2d').fillRect(0, 0, 4, 4);
        var output = document.createElement('canvas');
        output.width = output.height = 4;
        processor.render(video, output);
        expect(processor._source.data[3]).toBe(0);
        expect(processor._source.data[7]).toBe(255);
        expect(processor._source.data[15]).toBe(0);
    });

    it('updates camera and homography without reallocating image buffers or growing live matrices', async () => {
        await processor.init(4, 4, parameters, extent);
        var capture = processor._capture;
        var frame = processor._frame;
        var destination = processor._dstTri;
        var transform = processor._transform;
        var shifted = [[0, 100], [200, 100], [200, 0], [0, 0]].map((point) => proj4('EPSG:3857', 'EPSG:4326', point));
        for (var index = 1; index <= 20; index++) {
            processor.updateParameters({ ...parameters, x: index }, shifted);
        }
        expect(CoordTransfer.prototype.setCameraLocation.calls.mostRecent().args[0].x).toBe(20);
        expect(processor.width).toBe(4);
        expect(processor.height).toBe(4);
        expect(processor._capture).toBe(capture);
        expect(processor._frame).toBe(frame);
        expect(processor._dstTri).toBe(destination);
        [0, 0, 2, 0, 2, 4, 0, 4].forEach((value, index) => expect(destination.data32F[index]).toBeCloseTo(value, 5));
        expect(transform.delete.calls.count()).toBe(1);
        expect(processor._matrices.length).toBe(5);
        expect(matrices.filter((matrix) => !matrix.delete.calls.count()).length).toBe(5);
        processor.dispose();
        matrices.forEach((matrix) => expect(matrix.delete.calls.count()).toBe(1));
    });

    it('redraws the geographic mask for each extent and ignores updates after disposal', async () => {
        await processor.init(4, 4, parameters, extent);
        var context = processor._mask.getContext('2d');
        expect(context.getImageData(0, 3, 1, 1).data[3]).toBe(255);
        processor.updateParameters(parameters, extent.slice(0, 3));
        expect(context.getImageData(0, 3, 1, 1).data[3]).toBe(0);
        var count = matrices.length;
        processor.dispose();
        processor.updateParameters(parameters, extent);
        expect(matrices.length).toBe(count);
    });

    it('retains the previous homography when a time update cannot calculate a valid transform', async () => {
        await processor.init(4, 4, parameters, extent);
        var transform = processor._transform;
        var invalid = new cv.Mat();
        cv.findHomography.and.returnValue(invalid);
        expect(() => processor.updateParameters(parameters, extent)).toThrowError('Cannot calculate video homography');
        expect(invalid.delete.calls.count()).toBe(1);
        expect(processor._transform).toBe(transform);
        expect(transform.delete).not.toHaveBeenCalled();
        expect(processor._matrices.length).toBe(5);
    });

    it('releases matrices if homography initialization fails', async () => {
        cv.findHomography.and.returnValue(null);
        await expectAsync(processor.init(4, 4, parameters, extent)).toBeRejectedWithError('Cannot calculate video homography');
        matrices.forEach((matrix) => expect(matrix.delete.calls.count()).toBe(1));
    });

    it('does not allocate frame resources after disposal during initialization', async () => {
        var pending = processor.init(4, 4, parameters, extent);
        processor.dispose();
        await pending;
        expect(matrices.length).toBe(0);
    });
});
