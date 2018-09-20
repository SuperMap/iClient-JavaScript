/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class SuperMap.FindClosestFacilitiesParameters
 * @category iServer NetworkAnalyst ClosestFacility
 * @classdesc 最近设施分析参数类。
 * @param {Object} options - 参数。 
 * @param {(SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number)} options.event - 事件点，一般为需要获得服务设施服务的事件位置。 
 * @param {Array.<SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number>}  options.facilities - 设施点集合，一般为提供服务的服务设施位置。 
 * @param {number} [options.expectFacilityCount=1] - 要查找的设施点数量。 
 * @param {boolean} [options.fromEvent=false] - 是否从事件点到设施点进行查找。 
 * @param {boolean} [options.isAnalyzeById=false] - 事件点和设施点是否通过节点 ID 号来指定。 
 * @param {number} [options.maxWeight=0] - 查找半径。单位与该类中 parameter 字段（交通网络分析通用参数）中设置的耗费字段一致。 
 * @param {SuperMap.TransportationAnalystParameter} [options.parameter] - 交通网络分析通用参数。
 */
export class FindClosestFacilitiesParameters {


    constructor(options) {
        /**
         * @member {(SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number)} SuperMap.FindClosestFacilitiesParameters.prototype.event
         * @description 事件点，一般为需要获得服务设施服务的事件位置。
         *              可以通过两种方式赋予事件点：当该类中字段 isAnalyzeById = true 时，应输入事件点 ID 号；当 isAnalyzeById = false 时，应输入事件点坐标。
         */
        this.event = null;

        /**
         * @member {number} [SuperMap.FindClosestFacilitiesParameters.prototype.expectFacilityCount=1]
         * @description 要查找的设施点数量。
         */
        this.expectFacilityCount = 1;

        /**
         * @member {Array.<SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number>} [SuperMap.FindClosestFacilitiesParameters.prototype.facilities=false]
         * @description 设施点集合，一般为提供服务的服务设施位置。
         *              可以通过两种方式赋予设施点：当该类中字段 isAnalyzeById = true 时，应输入设施点 ID 号；当 isAnalyzeById = false 时，应输入设施点坐标。
         */
        this.facilities = null;

        /**
         * @member {boolean} [SuperMap.FindClosestFacilitiesParameters.prototype.fromEvent=false]
         * @description 是否从事件点到设施点进行查找。最近设施分析主要是通过设施点和事件点之间最优的路线来分析在一定范围内哪个或哪些设施与事件点有最优路线的关系。
         *              这个行走线路是通过网络图层进行网络分析算法计算出来的两点间的最优路线。由于存在从 A 点到 B 点与从 B 点到 A 点的耗费不一样的情况，因此起止点
         *              不同可能会得到不同的最优路线。因此在进行最近设施分析之前，需要设置获取的最优路线的方向，即是以事件点作为起点到最近设施点的方向分析，还是以最
         *              近设施点为起点到事件点的方向分析。如果需要以事件点作为起点到设施点方向进行查找，设置该字段值为 true；设置为 false，表示从设施点到事件点进行查找。
         */
        this.fromEvent = false;

        /**
         * @member {boolean} [SuperMap.FindClosestFacilitiesParameters.prototype.isAnalyzeById=false]
         * @description 事件点和设施点是否通过节点 ID 号来指定，设置为 false，表示通过坐标点指定事件点和设施点。
         */
        this.isAnalyzeById = false;

        /**
         * @member {number} [SuperMap.FindClosestFacilitiesParameters.prototype.maxWeight=0]
         * @description 查找半径。单位与该类中 parameter 字段（交通网络分析通用参数）中设置的耗费字段一致。
         *              例如事件发生点是一起交通事故，要求查找在 10 分钟内能到达的最近医院，超过 10 分钟能到达的都不予考虑。
         *              那么需要将网络分析参数中 parameter.weightFieldName 设置为表示时间的字段，然后设置查找范围的半径值为10。
         */
        this.maxWeight = 0;

        /**
         * @member {SuperMap.TransportationAnalystParameter} [SuperMap.FindClosestFacilitiesParameters.prototype.parameter]
         * @description 交通网络分析通用参数。通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息。
         *              它为 SuperMap.TransportationAnalystParameter 类型，虽然为可选参数，但是如果不设置其中的 resultSetting 字段，
         *              则返回结果空间信息等都为空。
         */
        this.parameter = new TransportationAnalystParameter();
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.FindClosestFacilitiesParameters";
    }

    /**
     * @function SuperMap.FindClosestFacilitiesParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.event = null;
        me.expectFacilityCount = null;
        me.facilities = null;
        me.fromEvent = null;
        me.isAnalyzeById = null;
        me.maxWeight = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }

}

SuperMap.FindClosestFacilitiesParameters = FindClosestFacilitiesParameters;