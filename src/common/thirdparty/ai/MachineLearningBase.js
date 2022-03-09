import * as tf from '@tensorflow/tfjs';

export var backendOptions = {
    WEBGL: 'webgl',
    CPU: 'cpu'
};

/**
 * @class MachineLearningBase
 * @deprecatedclass SuperMap.MachineLearningBase
 * @classdesc MachineLearning 的分析基类。
 * @category MachineLearning
 * @param {string} modelUrl - 模型分析地址。
 * @param {PixelData|ImageData|HTMLImageElement|HTMLCanvasElement| HTMLVideoElement|ImageBitmap} image - 图片对象。
 * @param {string} [backend=backendOptions.WEBGL] - 模型分析方式( cpu 或 webgl)。
 * @usage
 */

export default class MachineLearningModelBase {
    constructor(options) {
        const { modelUrl, image, backend } = options;
        /**
         *  @member {string} MachineLearningBase.prototype.modelUrl
         *  @description 模型地址
         */
        this.modelUrl = modelUrl;
        /**
         *  @member {PixelData|ImageData|HTMLImageElement|HTMLCanvasElement| HTMLVideoElement|ImageBitmap} MachineLearningBase.prototype.image
         *  @description 图片对象
         */
        this.image = image;
        /**
         *  @member {Object} MachineLearningBase.prototype.backend
         *  @description 模型分析方式( cpu 或 webgl)。
         */
        this.backend = backend || backendOptions.WEBGL;
        tf.setBackend(this.backend);
    }

    /**
     * @function  MachineLearningBase.prototype._loadModel
     * @description 加载模型
     * @param {string} modelUrl - 模型地址。
     * @returns {Promise.<tf.GraphModel>}
     */

    async _loadModel(modelUrl) {
        return await tf.loadGraphModel(modelUrl);
    }

    /**
     * @function  MachineLearningBase.prototype.handleResult
     * @description 对预测数据进行处理
     */

    handleResult() {}

    /**
     * @function  MachineLearningBase.prototype.handleInputParams
     * @description 处理输入张量
     * @param {PixelData|ImageData|HTMLImageElement|HTMLCanvasElement| HTMLVideoElement|ImageBitmap} image - 图片对象。
     * @param {number} width - 图片宽度。
     * @param {number} height - 图片高度。
     * @param {string} dtype - 数据类型。
     * @returns {Object} - 输入处理后的张量
     */

    handleInputParams(image, width = 640, height = 640, dtype = 'float32') {
        return tf.cast(tf.image.resizeBilinear(tf.expandDims(tf.browser.fromPixels(image)), [width, height]), dtype);
    }

    /**
     * @function  MachineLearningBase.prototype.predict
     * @description 对模型进行预测
     * @returns {Object}
     */

    async predict() {
        if (!this.modelUrl || !this.image) {
            return;
        }
        if (!this.model) {
            this.model = await this._loadModel(this.modelUrl);
        }
        this.imageTensor = this.handleInputParams(this.image);
        const prediction = await this.model.executeAsync(this.imageTensor);
        return this.handleResult(prediction);
    }

    /**
     * @function  MachineLearningBase.prototype.dispose
     * @description 释放内存
     */

    dispose() {
        this.imageTensor && this.imageTensor.dispose();
        this.imageTensor = null;
    }
}
