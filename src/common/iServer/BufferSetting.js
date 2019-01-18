/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {BufferEndType, BufferRadiusUnit} from '../REST';
import {BufferDistance} from './BufferDistance';

/**
 * @class SuperMap.BufferSetting
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析通用设置类。
 * @param {Object} options - 参数。 
 * @param {SuperMap.BufferEndType} [options.endType=SuperMap.BufferEndType.FLAT] - 缓冲区端点枚举值。 
 * @param {SuperMap.BufferDistance} [options.leftDistance=100] - 左侧缓冲距离。 
 * @param {SuperMap.BufferDistance} [options.rightDistance=100] - 右侧缓冲距离。 
 * @param {number} [options.semicircleLineSegment=4] - 圆头缓冲圆弧处线段的个数。 
 * @param {SuperMap.BufferRadiusUnit} [options.radiusUnit=SuperMap.BufferRadiusUnit.METER] - 缓冲半径单位。
 */
export class BufferSetting {


    constructor(options) {
        /**
         * @member {SuperMap.BufferEndType} [SuperMap.BufferSetting.prototype.endType = SuperMap.BufferEndType.FLAT]
         * @description 缓冲区端点枚举值。分为平头和圆头两种。
         */
        this.endType = BufferEndType.FLAT;

        /**
         * @member {SuperMap.BufferDistance} [SuperMap.BufferSetting.prototype.leftDistance=100]
         * @description 左侧缓冲距离。
         * 当为 GeometryBufferAnalyst 时，单位为默认地图的投影系的单位（如3857为米，4326为度），
         * 当为 DatasetBufferAnalyst 时，单位通过{@link BufferSetting.radiusUnit}设置（默认全部为米）。
         */
        this.leftDistance = new BufferDistance();

        /**
         * @member {SuperMap.BufferDistance} [SuperMap.BufferSetting.prototype.rightDistance=100]
         * @description 右侧缓冲距离。
         * 当为 GeometryBufferAnalyst 时，单位为默认地图的投影系的单位（如3857为米，4326为度），
         * 当为 DatasetBufferAnalyst 时，单位通过{@link BufferSetting.radiusUnit}设置（默认全部为米）。
         */
        this.rightDistance = new BufferDistance();

        /**
         * @member {number} [SuperMap.BufferSetting.prototype.semicircleLineSegment=4]
         * @description 圆头缓冲圆弧处线段的个数。即用多少个线段来模拟一个半圆。
         */
        this.semicircleLineSegment = 4;

        /**
         * @member {SuperMap.BufferRadiusUnit} [SuperMap.BufferSetting.prototype.radiusUnit = SuperMap.BufferRadiusUnit.METER]
         * @description 缓冲半径单位，可以是{@link SuperMap.BufferRadiusUnit.METER}、{@link SuperMap.BufferRadiusUnit.MILIMETER}、
         * {@link SuperMap.BufferRadiusUnit.CENTIMETER}、{@link SuperMap.BufferRadiusUnit.DECIMETER}、{@link SuperMap.BufferRadiusUnit.KILOMETER}、
         * {@link SuperMap.BufferRadiusUnit.FOOT}、{@link SuperMap.BufferRadiusUnit.INCH}、{@link SuperMap.BufferRadiusUnit.MILE}、{@link SuperMap.BufferRadiusUnit.YARD}。
         * 仅对BufferAnalyst有效。
         */
        this.radiusUnit = BufferRadiusUnit.METER;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.BufferSetting";
    }


    /**
     * @function SuperMap.BufferSetting.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        let me = this;
        me.endType = null;
        if (me.leftDistance) {
            me.leftDistance.destroy();
            me.leftDistance = null;
        }
        if (me.rightDistance) {
            me.rightDistance.destroy();
            me.rightDistance = null;
        }
        me.semicircleLineSegment = null;
        me.radiusUnit = null;
    }
}

SuperMap.BufferSetting = BufferSetting;