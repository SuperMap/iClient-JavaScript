import SuperMap from '../SuperMap';

/**
 * @class SuperMap.TerrainCurvatureCalculationParameters
 * @classdesc 地形曲率计算参数类。
 * @param options - {Object} 可选参数。如</br>
 *        dataset - {String} 要用来做地形曲率计算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。必设字段。</br>
 *        zFactor - {Number} 指定的高程缩放系数。默认值为 1.0，表示不缩放。</br>
 *        averageCurvatureName - {String} 结果数据集：平均曲率数据集的名称，必设字段。</br>
 *        profileCurvatureName - {String} 结果数据集：剖面曲率数据集的名称。</br>
 *        planCurvatureName - {String} 结果数据集：平面曲率数据集的名称。</br>
 *        deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。</br>
 */
export default  class TerrainCurvatureCalculationParameters {

    /**
     * @member SuperMap.TerrainCurvatureCalculationParameters.prototype.dataset -{String}
     * @description 要用来做地形曲率计算数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。必设字段。
     * 注：地形曲率计算必须为栅格数据集。
     */
    dataset = null;

    /**
     * @member SuperMap.TerrainCurvatureCalculationParameters.prototype.zFactor -{Number}
     * @description 指定的高程缩放系数。默认值为 1.0，表示不缩放。
     * 该值是指在 DEM 栅格数据中，栅格值（Z 坐标，即高程值）相对于 X 和 Y 坐标的单位变换系数。
     * 通常有 X，Y，Z 都参加的计算中，需要将高程值乘以一个高程缩放系数，使得三者单位一致。
     * 例如，X、Y 方向上的单位是米，而 Z 方向的单位是英尺，由于 1 英尺等于 0.3048 米，则需要指定缩放系数为 0.3048。
     */
    zFactor = 1.0;

    /**
     * @member SuperMap.TerrainCurvatureCalculationParameters.prototype.averageCurvatureName -{String}
     * @description 结果数据集：平均曲率数据集的名称，必设字段。
     */
    averageCurvatureName = null;

    /**
     * @member SuperMap.TerrainCurvatureCalculationParameters.prototype.profileCurvatureName -{String}
     * @description 结果数据集：剖面曲率数据集的名称。
     */
    profileCurvatureName = "";

    /**
     * @member SuperMap.TerrainCurvatureCalculationParameters.prototype.planCurvatureName -{String}
     * @description 结果数据集：平面曲率数据集的名称。
     */
    planCurvatureName = "";

    /**
     * @member SuperMap.TerrainCurvatureCalculationParameters.prototype.deleteExistResultDataset -{Boolean}
     * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset = false;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataset = null;
        me.zFactor = 1.0;
        me.averageCurvatureName = null;
        me.profileCurvatureName = null;
        me.planCurvatureName = null;
        me.deleteExistResultDataset = true;
    }

    static toObject(derrainCurvatureCalculationParameters, tempObj) {
        for (var name in derrainCurvatureCalculationParameters) {
            if (name !== "dataset") {
                tempObj[name] = derrainCurvatureCalculationParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.TerrainCurvatureCalculationParameters"
}

SuperMap.TerrainCurvatureCalculationParameters = TerrainCurvatureCalculationParameters;
