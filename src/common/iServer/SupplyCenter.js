/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.SupplyCenter
 * @category  iServer NetworkAnalyst Location
 * @classdesc 资源供给中心类。在资源分配和选址分区分析两个功能中使用。
 * @param {Object} options - 参数。
 * @param {number} options.maxWeight - 资源供给中心的最大耗费值。
 * @param {number} options.nodeID - 资源供给中心点的结点 ID 号。资源供给中心必须是结点。
 * @param {number} options.resourceValue - 资源供给中心能提供的最大服务量或商品数量。
 * @param {SuperMap.SupplyCenterType} [options.type] - 资源供给中心点的类型常量。
 */
export class SupplyCenter {

    constructor(options) {
        /**
         * @member {number} SuperMap.SupplyCenter.prototype.maxWeight
         * @description 资源供给中心的最大耗费值。中心点最大阻值设置越小，表示中心点所提供的资源可影响范围越大。
         *              最大阻力值是用来限制需求点到中心点的花费。
         *              如果需求点（弧段或结点）到此中心的花费大于最大阻力值，则该需求点不属于该资源供给中心提供资源的范围。
         */
        this.maxWeight = null;

        /**
         * @member {number} SuperMap.SupplyCenter.prototype.nodeID
         * @description 资源供给中心点的结点 ID 号，资源供给中心必须是结点。
         */
        this.nodeID = null;

        /**
         * @member {number} SuperMap.SupplyCenter.prototype.resourceValue
         * @description 资源供给中心能提供的最大服务量或商品数量。例如资源中心为学校，资源中心资源量表示该学校能够接纳多少学生。
         */
        this.resourceValue = null;

        /**
         * @member {SuperMap.SupplyCenterType} [SuperMap.SupplyCenter.prototype.type]
         * @description 资源供给中心点的类型常量。资源供给中心点的类型包括非中心，固定中心和可选中心。
         *              固定中心用于资源分配分析；固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
         */
        this.type = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.SupplyCenter";
    }

    /**
     * @function SuperMap.SupplyCenter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.maxWeight = null;
        me.nodeID = null;
        me.resourceValue = null;
        me.type = null;
    }

    /**
     * @function SuperMap.SupplyCenter.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     * @returns {SuperMap.SupplyCenter} SupplyCenter 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new SupplyCenter({
            maxWeight: jsonObject.maxWeight,
            nodeID: jsonObject.nodeID,
            resourceValue: jsonObject.resourceValue,
            type: jsonObject.type
        });
    }

}

SuperMap.SupplyCenter = SupplyCenter;

