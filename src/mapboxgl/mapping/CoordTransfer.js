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
    this.rotationMatrix = this.toRotationMatrix(pitch, roll, yaw);
    this.translationMatrix = this.toTranslationMatrix(x, y, z);
    this.k = this.toCameraMatrix(fx, fy, centerX, centerY);
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
    this.cv.gemm(rx, ry, 1, new this.cv.Mat(), 0, tempResult);
    this.cv.gemm(tempResult, rz, 1, new this.cv.Mat(), 0, tempResult);
    this.cv.Rodrigues(tempResult, rotationMatrix);
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
    this.cv.Rodrigues(this.rotationMatrix, rotationMatrix);
    this.cv.gemm(rotationMatrix, tvecs, 1.0, new this.cv.Mat(), 0, translationMatrix);
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
   * @function CoordTransfer.prototype.toVideoCoordinate
   * @description  转换视频像素坐标到空间地理坐标。
   * @param {Array} coord - 空间坐标。
   * @returns {Array} 视频像素坐标。
   */
  toVideoCoordinate(coord) {
    if (!this.cv || !this.cv.Mat) {
      return [];
    }
    let emptyMat = new this.cv.Mat();
    let point3 = this.cv.matFromArray(3, 1, this.cv.CV_64FC1, [coord[0], coord[1], 0]);
    let point2 = new this.cv.Mat(2, 1, this.cv.CV_64FC1);
    this.cv.projectPoints(point3, this.rotationMatrix, this.translationMatrix, this.k, emptyMat, point2);
    return point2;
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
    let uvPoint = new this.cv.matFromArray(3, 1, this.cv.CV_64FC1, [videoPoint[0], videoPoint[1], 1.0]);
    let rotationMatrix = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
    this.cv.Rodrigues(this.rotationMatrix, rotationMatrix);
    let tempMat = new this.cv.Mat();
    this.cv.gemm(rotationMatrix.inv(3), this.k.inv(3), 1, new this.cv.Mat(), 0, tempMat);
    this.cv.gemm(tempMat, uvPoint, 1, new this.cv.Mat(), 0, tempMat);
    let tempMat2 = new this.cv.Mat();
    this.cv.gemm(rotationMatrix.inv(3), this.translationMatrix, 1, new this.cv.Mat(), 0, tempMat2);
    let zConst = 0;
    let s = zConst + tempMat2.data64F[2];
    s /= tempMat.data64F[2];
    let result = new this.cv.Mat();
    this.cv.gemm(this.k.inv(3), uvPoint, 1, new this.cv.Mat(), 0, result);
    this.cv.multiply(result, new this.cv.matFromArray(4, 1, this.cv.CV_64FC1, [s, 0, 0, 0]), result);
    this.cv.subtract(result, this.translationMatrix, result);
    this.cv.gemm(rotationMatrix.inv(3), result, 1, new this.cv.Mat(), 0, result);
    return result.data64F;
  }
}