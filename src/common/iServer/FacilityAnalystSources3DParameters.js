/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {FacilityAnalyst3DParameters} from './FacilityAnalyst3DParameters';

/**
 * @class FacilityAnalystSources3DParameters
 * @deprecatedclass SuperMap.FacilityAnalystSources3DParameters
 * @category  iServer FacilityAnalyst3D Sources
 * @classdesc 最近设施分析参数类(源查找资源)。最近设施分析是指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *            设施点一般为学校、超市、加油站等服务设施；事件点为需要服务设施的事件位置。例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，超过10分钟能到达的都不予考虑。此例中，事故发生地即是一个事件点，周边的医院则是设施点。最近设施查找实际上也是一种路径分析，因此对路径分析起作用的障碍边、障碍点、转向表、耗费等属性在最近设施分析时同样可设置。
 * @extends {FacilityAnalyst3DParameters}
 * @param {Object} options - 参数。
 * @param {string} options.weightName - 指定的权值字段信息对象的名称。
 * @param {number} [options.edgeID] - 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。
 * @param {number} [options.nodeID] - 指定的结点 ID，edgeID 与 nodeID 必须指定一个。
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 * 指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 * @usage
 */
export class FacilityAnalystSources3DParameters extends FacilityAnalyst3DParameters {


    constructor(options) {
        super(options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystSources3DParameters";
    }

    /**
     * @function FacilityAnalystSources3DParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


}
