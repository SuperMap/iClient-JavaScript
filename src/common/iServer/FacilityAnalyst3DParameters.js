import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.FacilityAnalyst3DParameters
 * @category  iServer FacilityAnalyst3D
 * @classdesc 最近设施分析参数基类。最近设施分析是指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *            设施点一般为学校、超市、加油站等服务设施；事件点为需要服务设施的事件位置。例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，
 *            超过10分钟能到达的都不予考虑。此例中，事故发生地即是一个事件点，周边的医院则是设施点。最近设施查找实际上也是一种路径分析，因此对路径分析起
 *            作用的障碍边、障碍点、转向表、耗费等属性在最近设施分析时同样可设置。
 * @param {Object} options - 参数。<br>
 * @param {number} options.edgeID - 指定的弧段ID。<br>
 * @param {number} options.nodeID - 指定的结点ID。<br>
 * @param {string} options.weightName - 指定的权值字段信息对象的名称。<br>
 * @param {boolean} options.isUncertainDirectionValid - 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 *                                                      指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 */
export class FacilityAnalyst3DParameters {


    constructor(options) {
        /**
         * @member {number} SuperMap.FacilityAnalyst3DParameters.prototype.edgeID
         * @description 指定的弧段ID。
         */
        this.edgeID = null;

        /**
         * @member {number} SuperMap.FacilityAnalyst3DParameters.prototype.nodeID
         * @description 指定的结点ID。
         */
        this.nodeID = null;

        /**
         * @member {string} SuperMap.FacilityAnalyst3DParameters.prototype.weightName
         * @description 指定的权值字段信息对象的名称。
         */
        this.weightName = null;

        /**
         * @member {boolean} SuperMap.FacilityAnalyst3DParameters.prototype.isUncertainDirectionValid
         * @description 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
         *              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找
         */
        this.isUncertainDirectionValid = false;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalyst3DParameters";

    }

    /**
     * @function SuperMap.FacilityAnalyst3DParameters.prototype.destroy
     * @override
     */
    destroy() {
        var me = this;
        me.edgeID = null;
        me.nodeID = null;
        me.weightName = null;
        me.isUncertainDirectionValid = null;
    }
}

SuperMap.FacilityAnalyst3DParameters = FacilityAnalyst3DParameters;