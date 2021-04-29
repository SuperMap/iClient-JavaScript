import { SuperMap } from '../../SuperMap';
import MachineLearningBase from './MachineLearningBase';

/**
 * @class SuperMap.BinaryClassification
 * @classdesc 二元分类类。
 * @category BinaryClassification
 * @extends {SuperMap.MachineLearningBase}
 */

export class BinaryClassification extends MachineLearningBase {
    constructor(options) {
      super(options);
    }
    /**
     * @function  SuperMap.BinaryClassification.prototype.handleResult
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

SuperMap.BinaryClassification = BinaryClassification;
