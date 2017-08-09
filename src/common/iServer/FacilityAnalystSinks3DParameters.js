import  SuperMap from '../SuperMap';
import FacilityAnalyst3DParameters from './FacilityAnalyst3DParameters';

/**
 * @class SuperMap.FacilityAnalystSinks3DParameters
 * @classdesc 最近设施分析参数类(汇查找资源)<br>
 *               最近设施分析是指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。<br>
 *               设施点一般为学校、超市、加油站等服务设施；事件点为需要服务设施的事件位置。<br>
 *               例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，超过10分钟能到达的都不予考虑。此例中，事故发生地即是一个事件点，周边的医院则是设施点。<br>
 *               最近设施查找实际上也是一种路径分析，因此对路径分析起作用的障碍边、障碍点、转向表、耗费等属性在最近设施分析时同样可设置。
 * @extends SuperMap.FacilityAnalyst3DParameters
 * @param options - {Object} 可选参数。如：<br>
 *         edgeID - {Number} 指定的弧段ID。<br>
 *         nodeID - {Integer} 指定的结点ID。<br>
 *         weightName -{String} 指定的权值字段信息对象的名称。<br>
 *         isUncertainDirectionValid -{Boolean} 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；<br>
 *                                              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找
 */
export default  class FacilityAnalystSinks3DParameters extends FacilityAnalyst3DParameters {

    /*
     * Constructor: SuperMap.FacilityAnalystSinks3DParameters
     * 最近设施分析参数类构造函数。
     */
    constructor(options) {
        super(options);
    }


    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
    }


    CLASS_NAME = "SuperMap.FacilityAnalystSinks3DParameters"
}
SuperMap.FacilityAnalystSinks3DParameters = FacilityAnalystSinks3DParameters;