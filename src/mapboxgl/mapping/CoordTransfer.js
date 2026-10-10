/**
 * @class CoordTransfer
 * @version 11.2.0
 * @private
 * @classdesc 坐标转换
 * @param {Object} options - 配准参数。
 * @param {number} options.pitch - 俯仰角。
 * @param {number} options.roll - 侧偏角。
 * @param {number} options.yaw - 偏航角。
 * @param {number} options.x - 视频 x 坐标。
 * @param {number} options.y - 视频 y 坐标。
 * @param {number} options.z - 视频 z 坐标。
 * @param {number} options.fx - 水平视场角。
 * @param {number} options.fy - 垂直视场角。
 * @param {number} options.centerX - 相机中心的水平坐标。
 * @param {number} options.centerY - 相机中心的垂直坐标。
 */

export default class CoordTransfer {
  constructor(cv, configs) {
    this.configs = configs;
    this.cv = cv;
  }

  /**
   * @function CoordTransfer.prototype.init
   * @description 初始化。
   */
  init() {
    return new Promise((resolve) => {
      this.cv.then(() => {
        this.setCameraLocation(this.configs);
        resolve(this);
      });
    });
  }

  /**
   * @function CoordTransfer.prototype.setCameraLocation
   * @description  设置视频配准参数。
   * @param {Object} options - 配准参数。
   * @param {Object} [options.pitch] - 俯仰角。
   * @param {Object} [options.roll] - 侧偏角。
   * @param {Object} [options.yaw] - 偏航角。
   * @param {Object} [options.x] - 视频 x 坐标。
   * @param {Object} [options.y] - 视频 y 坐标。
   * @param {Object} [options.z] - 视频 z 坐标。
   * @param {Object} [options.fx] - 相机水平焦距。
   * @param {Object} [options.fy] - 相机垂直焦距。
   * @param {Object} [options.centerX] - 相机中心的水平坐标。
   * @param {Object} [options.centerY] - 相机中心的垂直坐标。
   */
  setCameraLocation(configs) {
    const { pitch, roll, yaw, x, y, z, fx, fy, centerX, centerY } = configs;
    if (!this.cv) {
      return;
    }
    if (this.rotationMatrix) {
      this.rotationMatrix.delete();
    }
    if (this.rotationMat3) {
      this.rotationMat3.delete();
    }
    if (this.translationMatrix) {
      this.translationMatrix.delete();
    }
    if (this.k) {
      this.k.delete();
    }
    this.rotationMatrix = this.toRotationMatrix(pitch, roll, yaw);
    this.rotationMat3 = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
    this.cv.Rodrigues(this.rotationMatrix, this.rotationMat3);
    this.translationMatrix = this.toTranslationMatrix(x, y, z);
    this.k = this.toCameraMatrix(fx, fy, centerX, centerY);
    this._R = this.rotationMat3.data64F ? Array.from(this.rotationMat3.data64F) : null;
    this._t = this.translationMatrix.data64F ? Array.from(this.translationMatrix.data64F) : null;
    this._fx = fx;
    this._fy = fy;
    this._cx = centerX;
    this._cy = centerY;
    this._x = x;
    this._y = y;
    this._z = z;
  }

  /**
   * @function CoordTransfer.prototype.toRotationMatrix
   * @description  计算旋转矩阵。
   * @param {number} pitch - 俯仰角
   * @param {number} roll - 侧偏角
   * @param {number} yaw - 偏航角
   * @returns {Array} 旋转矩阵。
   */
  toRotationMatrix(pitch, roll, yaw) {
    if (!this.cv) {
      return;
    }
    let x = (pitch - 90) * (Math.PI / 180); // pitch
    let y = roll * (Math.PI / 180); // roll
    let z = yaw * -1 * (Math.PI / 180); // yaw
    let rotationMatrix = new this.cv.Mat(3, 1, this.cv.CV_64FC1);
    let rx = this.cv.matFromArray(3, 3, this.cv.CV_64FC1, [
      1,
      0,
      0,
      0,
      Math.cos(x),
      Math.sin(x),
      0,
      -Math.sin(x),
      Math.cos(x)
    ]);
    let ry = this.cv.matFromArray(3, 3, this.cv.CV_64FC1, [
      Math.cos(y),
      0,
      -Math.sin(y),
      0,
      1,
      0,
      Math.sin(y),
      0,
      Math.cos(y)
    ]);

    let rz = this.cv.matFromArray(3, 3, this.cv.CV_64FC1, [
      Math.cos(z),
      Math.sin(z),
      0,
      -Math.sin(z),
      Math.cos(z),
      0,
      0,
      0,
      1
    ]);

    let tempResult = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
    let zeroMat = new this.cv.Mat();
    this.cv.gemm(rx, ry, 1, zeroMat, 0, tempResult);
    this.cv.gemm(tempResult, rz, 1, zeroMat, 0, tempResult);
    this.cv.Rodrigues(tempResult, rotationMatrix);
    rx.delete();
    ry.delete();
    rz.delete();
    tempResult.delete();
    zeroMat.delete();
    return rotationMatrix;
  }

  /**
   * @function CoordTransfer.prototype.toTranslationMatrix
   * @description  计算偏移矩阵
   * @param {number} x - 视频 x 坐标
   * @param {number} y - 视频 y 坐标
   * @param {number} z - 视频 z 坐标
   * @returns {Array} 平移矩阵。
   */
  toTranslationMatrix(x, y, z) {
    if (!this.cv) {
      return;
    }
    let translationMatrix = new this.cv.Mat();
    let tvecs = this.cv.matFromArray(3, 1, this.cv.CV_64FC1, [-x, -y, -z]);

    let rotationMatrix = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
    let zeroMat = new this.cv.Mat();
    this.cv.Rodrigues(this.rotationMatrix, rotationMatrix);
    this.cv.gemm(rotationMatrix, tvecs, 1.0, zeroMat, 0, translationMatrix);
    tvecs.delete();
    rotationMatrix.delete();
    zeroMat.delete();
    return translationMatrix;
  }

  /**
   * @function CoordTransfer.prototype.toCameraMatrix
   * @description  计算相机矩阵。
   * @param {Object} fx - 水平焦距。
   * @param {Object} fy - 垂直焦距。
   * @param {Object} centerX - 相机中心的水平坐标
   * @param {Object} centerY - 相机中心的垂直坐标。
   * @returns {Array} 视频矩阵。
   */
  toCameraMatrix(fx, fy, centerX, centerY) {
    return this.cv.matFromArray(3, 3, this.cv.CV_64FC1, [fx, 0, centerX, 0, fy, centerY, 0, 0, 1]);
  }
  /**
   * @function CoordTransfer.prototype.toCameraCoordinate
   * @description 将空间坐标转换到相机坐标系。Z > 0 表示在相机前方。
   * @param {Array<number>} coord - 空间坐标 [x, y] 或 [x, y, z]（EPSG:3857）。
   * @returns {Array<number>|null} 相机坐标 [Xc, Yc, Zc]。
   */
  toCameraCoordinate(coord) {
    if (!this._R || this._R.length < 9 || !this._t || this._t.length < 3 || !coord || coord.length < 2) {
      return null;
    }
    const x = coord[0];
    const y = coord[1];
    const z = coord.length > 2 ? coord[2] : 0;
    const R = this._R;
    const t = this._t;
    return [
      R[0] * x + R[1] * y + R[2] * z + t[0],
      R[3] * x + R[4] * y + R[5] * z + t[1],
      R[6] * x + R[7] * y + R[8] * z + t[2]
    ];
  }

  /**
   * @function CoordTransfer.prototype.projectCameraToVideo
   * @description 将相机坐标投影为视频像素坐标。相机后方的点返回 null。
   * @param {Array<number>} camera - 相机坐标 [Xc, Yc, Zc]。
   * @param {number} [zNear=0.01] - 近裁剪面，单位与空间坐标一致。
   * @returns {Array<number>|null} 视频像素坐标 [u, v]。
   */
  projectCameraToVideo(camera, zNear = 0.01) {
    if (!camera || this._fx == null || this._fy == null) {
      return null;
    }
    const depth = camera[2];
    if (!(depth > zNear)) {
      return null;
    }
    return [
      this._fx * camera[0] / depth + this._cx,
      this._fy * camera[1] / depth + this._cy
    ];
  }

  /**
   * @function CoordTransfer.prototype.toVideoCoordinate
   * @description  将空间地理坐标转换为视频像素坐标。相机后方的点 data64F 为空数组。
   * @param {Array} coord - 空间坐标。
   * @returns {{data64F: Array<number>, depth: (number|null)}} 视频像素坐标及相机深度。
   */
  toVideoCoordinate(coord) {
    const camera = this.toCameraCoordinate(coord);
    if (!camera) {
      return { data64F: [], depth: null };
    }
    const uv = this.projectCameraToVideo(camera);
    return {
      data64F: uv || [],
      depth: camera[2]
    };
  }
  /**
   * @function CoordTransfer.prototype.toSpatialCoordinate
   * @description  转换视频像素坐标到空间地理坐标
   * @param {Array} point - 像素坐标。
   * @returns {Array} 空间地理坐标。
   */
  toSpatialCoordinate(videoPoint) {
    if (!this.cv || !this.cv.Mat) {
      return [];
    }
    let uvPoint = this.cv.matFromArray(3, 1, this.cv.CV_64FC1, [videoPoint[0], videoPoint[1], 1.0]);
    let rotationMatrix = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
    this.cv.Rodrigues(this.rotationMatrix, rotationMatrix);
    let zeroMat = new this.cv.Mat();
    let tempMat = new this.cv.Mat();
    this.cv.gemm(rotationMatrix.inv(3), this.k.inv(3), 1, zeroMat, 0, tempMat);
    this.cv.gemm(tempMat, uvPoint, 1, zeroMat, 0, tempMat);
    let tempMat2 = new this.cv.Mat();
    this.cv.gemm(rotationMatrix.inv(3), this.translationMatrix, 1, zeroMat, 0, tempMat2);
    let zConst = 0;
    let s = zConst + tempMat2.data64F[2];
    s /= tempMat.data64F[2];
    let result = new this.cv.Mat();
    let scaleMat = this.cv.matFromArray(4, 1, this.cv.CV_64FC1, [s, 0, 0, 0]);
    this.cv.gemm(this.k.inv(3), uvPoint, 1, zeroMat, 0, result);
    this.cv.multiply(result, scaleMat, result);
    this.cv.subtract(result, this.translationMatrix, result);
    this.cv.gemm(rotationMatrix.inv(3), result, 1, zeroMat, 0, result);
    const data64F = [result.data64F[0], result.data64F[1], result.data64F[2]];
    uvPoint.delete();
    rotationMatrix.delete();
    zeroMat.delete();
    tempMat.delete();
    tempMat2.delete();
    scaleMat.delete();
    result.delete();
    return data64F;
  }
}