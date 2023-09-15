import MachineLearningBase from './MachineLearningBase';

/**
 * @class LandcoverClassification
 * @deprecatedclass SuperMap.LandcoverClassification
 * @classdesc 二元分类类。
 * @category LandcoverClassification
 * @extends {MachineLearningBase}
 * @usage
 */

export class LandcoverClassification extends MachineLearningBase {
    constructor(options) {
        super(options);
    }
    /**
     * @function ObjectDetection.prototype.handleResult
     * @description 对模型进行预测
     * @param {Object} prediction - 模型预测后的张量。
     * @returns {Object} 处理返回的数据
     */

    handleResult(prediction) {
        const width = prediction.shape.slice(1, 2)[0];
        const height = prediction.shape.slice(2, 3)[0];
        const data = prediction.arraySync()[0];
        return { data, width, height };
    }
}

