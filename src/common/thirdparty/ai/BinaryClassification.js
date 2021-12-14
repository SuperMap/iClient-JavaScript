import MachineLearningBase from './MachineLearningBase';

/**
 * @class BinaryClassification
 * @deprecatedclass SuperMap.BinaryClassification
 * @classdesc 二元分类类。
 * @category BinaryClassification
 * @extends {MachineLearningBase}
 * @usage
 */

export class BinaryClassification extends MachineLearningBase {
    constructor(options) {
      super(options);
    }
    /**
     * @function  BinaryClassification.prototype.handleResult
     * @description 对预测数据进行处理
     * @param {Object} prediction - 模型预测后的张量。
     * @returns {Object} 处理返回的数据
     */

    handleResult(prediction) {
        const width = prediction.shape.slice(1, 2)[0];
        const height = prediction.shape.slice(2, 3)[0];
        return { data: prediction.dataSync(), width, height };
    }
}

