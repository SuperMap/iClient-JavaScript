/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import proj4 from 'proj4';
import CoordTransfer from './CoordTransfer';

/** @private 将视频矫正到 EPSG:3857 平面，复用帧缓冲并支持随时间更新配准参数。 */
export class VideoFrameProcessor {
    constructor(cv) {
        this.cv = cv;
        this._matrices = [];
    }

    init(width, height, parameters, extent, clipRegion = []) {
        this._videoWidth = width;
        this._videoHeight = height;
        const camera = this._camera = CoordTransfer.fromVideoParameters(this.cv, parameters, width, height);
        return camera.init().then(() => {
            // OpenCV 可能晚于图层移除才就绪，已销毁的处理器不能再分配帧资源。
            if (this._disposed) {
                camera.dispose();
                return this;
            }
            this._initTransform(width, height, parameters, extent, clipRegion);
            return this;
        }).catch((error) => {
            camera.dispose();
            this.dispose();
            throw error;
        });
    }

    _keep(matrix) {
        this._matrices.push(matrix);
        return matrix;
    }

    _projectExtent(extent) {
        const points = extent.map((point) => proj4('EPSG:4326', 'EPSG:3857', point));
        const xs = points.map((point) => point[0]);
        const ys = points.map((point) => point[1]);
        const left = Math.min(...xs);
        const top = Math.max(...ys);
        const spanX = Math.max(...xs) - left;
        const spanY = top - Math.min(...ys);
        if (!(spanX > 0 && spanY > 0)) {
            throw new Error('extent must enclose a non-empty area');
        }
        return { points, left, top, spanX, spanY };
    }

    _initTransform(width, height, parameters, extent, clipRegion) {
        const cv = this.cv;
        const source = this._sourceQuad = clipRegion.length ? clipRegion : [[0, 0], [width, 0], [width, height], [0, height]];
        const { spanX, spanY } = this._projectExtent(extent);
        this.height = Math.ceil(Math.max(...source.map((point) => point[1])) - Math.min(...source.map((point) => point[1])));
        this.width = Math.round(this.height * spanX / spanY);
        if (!(this.width > 0 && this.height > 0)) {
            throw new Error('clipRegion must enclose a non-empty area');
        }
        this._srcTri = this._keep(cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...source)));
        this._mask = document.createElement('canvas');
        this._mask.width = this.width;
        this._mask.height = this.height;
        this.updateParameters(parameters, extent);
        this._source = this._keep(new cv.Mat(height, width, cv.CV_8UC4));
        this._destination = this._keep(new cv.Mat());
        this._size = new cv.Size(this.width, this.height);
        this._frame = new ImageData(this.width, this.height);
        this._capture = document.createElement('canvas');
        this._capture.width = width;
        this._capture.height = height;
        this._context = this._capture.getContext('2d', { willReadFrequently: true });
        this._path(this._context, source);
        this._context.clip();
    }

    updateParameters(parameters, extent) {
        if (this._disposed) {
            return this;
        }
        const { points, left, top, spanX, spanY } = this._projectExtent(extent);
        this._camera.setCameraLocation(CoordTransfer.getCameraParameters(parameters, this._videoWidth, this._videoHeight));
        // 输出尺寸在整个播放会话中保持不变；变化的地理范围通过目标点缩放适配。
        const toPixel = (point) => [(point[0] - left) * this.width / spanX, (top - point[1]) * this.height / spanY];
        const destination = this._sourceQuad.map((point) => toPixel(this._camera.toSpatialCoordinate(point)));
        if (!destination.every((point) => point.every(Number.isFinite))) {
            throw new Error('videoParameters do not project onto the ground plane');
        }
        const coordinates = [].concat(...destination);
        if (this._dstTri) {
            this._dstTri.data32F.set(coordinates);
        } else {
            this._dstTri = this._keep(this.cv.matFromArray(4, 1, this.cv.CV_32FC2, coordinates));
        }
        const transform = this.cv.findHomography(this._srcTri, this._dstTri);
        if (!transform || transform.rows !== 3 || transform.cols !== 3) {
            if (transform) {
                transform.delete();
            }
            throw new Error('Cannot calculate video homography');
        }
        // 每次更新只替换单应矩阵，立即释放旧矩阵，避免随关键帧数量累积 WASM 内存。
        if (this._transform) {
            this._matrices.splice(this._matrices.indexOf(this._transform), 1);
            this._transform.delete();
        }
        this._transform = this._keep(transform);
        const maskContext = this._mask.getContext('2d');
        maskContext.clearRect(0, 0, this.width, this.height);
        this._path(maskContext, points.map(toPixel));
        maskContext.fill();
        return this;
    }

    _path(context, points) {
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        points.slice(1).forEach((point) => context.lineTo(point[0], point[1]));
        context.closePath();
    }

    render(video, canvas) {
        const context = this._context;
        context.clearRect(0, 0, this._capture.width, this._capture.height);
        context.drawImage(video, 0, 0, this._capture.width, this._capture.height);
        this._source.data.set(context.getImageData(0, 0, this._capture.width, this._capture.height).data);
        this.cv.warpPerspective(this._source, this._destination, this._transform, this._size);
        this._frame.data.set(this._destination.data);
        const output = canvas.getContext('2d');
        output.putImageData(this._frame, 0, 0);
        output.globalCompositeOperation = 'destination-in';
        output.drawImage(this._mask, 0, 0);
        output.globalCompositeOperation = 'source-over';
    }

    dispose() {
        this._disposed = true;
        this._matrices.forEach((matrix) => matrix && matrix.delete());
        this._matrices = [];
        if (this._camera) {
            this._camera.dispose();
            this._camera = null;
        }
        this._srcTri = this._dstTri = this._transform = this._source = this._destination = null;
        this._capture = this._context = this._mask = this._frame = null;
    }
}
