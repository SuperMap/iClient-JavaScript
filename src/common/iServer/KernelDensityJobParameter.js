import SuperMap from '../SuperMap';
import {AnalystSizeUnit, AnalystAreaUnit} from '../REST';

/**
 * @class SuperMap.KernelDensityJobParameter
 * @classdesc 密度分析任务参数类。
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName - {string} 数据集名。<br>
 *        query - {Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
 *        resolution - {number} 分辨率。<br>
 *        method - {number} 分析方法。<br>
 *        meshType - {number} 分析类型。<br>
 *        fields - {string} 权重索引。<br>
 *        radius - {number} 分析的影响半径。
 */
export default class KernelDensityJobParameter {

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.datasetName - {string}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.query - {Object}
     * @description 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
     */
    query = "";

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.resolution - {number}
     * @description 网格大小。
     */
    resolution = 80;

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.method - {number}
     * @description 分析方法。
     */
    method = 0;

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshType - {number}
     * @description 分析类型。
     */
    meshType = 0;

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.fields - {string}
     * @description 权重索引。
     */
    fields = "";

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radius - {number}
     * @description 分析的影响半径。
     */
    radius = 300;

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshSizeUnit - {SuperMap.AnalystSizeUnit}
     * @description 网格大小单位。
     */
    meshSizeUnit = AnalystSizeUnit.METER;

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radiusUnit - {SuperMap.AnalystSizeUnit}
     * @description 搜索半径单位。
     */
    radiusUnit = AnalystSizeUnit.METER;

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.areaUnit - {SuperMap.AnalystAreaUnit}
     * @description 面积单位。
     */
    areaUnit = AnalystAreaUnit.SQUAREMILE;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.KernelDensityJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.query = null;
        this.resolution = null;
        this.method = null;
        this.radius = null;
        this.meshType = null;
        this.fields = null;
        this.meshSizeUnit = null;
        this.radiusUnit = null;
        this.areaUnit = null;
    }

    /**
     * @function SuperMap.KernelDensityJobParameter.toObject
     * @param kernelDensityJobParameter -{SuperMap.KernelDensityJobParameter} 密度分析任务参数类。
     * @param tempObj - {SuperMap.KernelDensityJobParameter} 密度分析任务参数对象。
     * @description 将密度分析任务参数对象转换为JSON对象。
     * @return JSON对象。
     */
    static toObject(kernelDensityJobParameter, tempObj) {
        for (var name in kernelDensityJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = kernelDensityJobParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            if (name === 'query') {
                tempObj['analyst'][name] = kernelDensityJobParameter[name].toBBOX();
            } else {
                tempObj['analyst'][name] = kernelDensityJobParameter[name];
            }
        }
    }

}

SuperMap.KernelDensityJobParameter = KernelDensityJobParameter;
