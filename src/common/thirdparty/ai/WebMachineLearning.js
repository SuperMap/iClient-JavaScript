import { SuperMap } from '../../SuperMap';

/**
 * @class SuperMap.WebMachineLearning
 * @classdesc WebMachineLearning 分析类。
 * @category WebMachineLearning
 */

export class WebMachineLearning {
    /**
     * @function  SuperMap.WebMachineLearning.prototype.execute
     * @description 执行预测
     * @param {BinaryClassification|LandcoverClassification|ObjectDetection} instance - 模型实例。
     * @returns {Object} 返回处理的数据
     */
    execute(instance) {
        return instance.predict();
    }
}

SuperMap.WebMachineLearning = WebMachineLearning;
