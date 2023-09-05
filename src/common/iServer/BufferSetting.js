/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {BufferEndType, BufferRadiusUnit} from '../REST';
import {BufferDistance} from './BufferDistance';

/**
 * @class BufferSetting
 * @deprecatedclass SuperMap.BufferSetting
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析通用设置类。
 * @param {Object} options - 可选参数。
 * @param {BufferEndType} [options.endType=BufferEndType.FLAT] - 缓冲区端点枚举值。
 * @param {BufferDistance} [options.leftDistance=100] - 左侧缓冲距离。
 * @param {BufferDistance} [options.rightDistance=100] - 右侧缓冲距离。
 * @param {number} [options.semicircleLineSegment=4] - 圆头缓冲圆弧处线段的个数。
 * @param {BufferRadiusUnit} [options.radiusUnit=BufferRadiusUnit.METER] - 缓冲半径单位。
 * @usage
 */
export class BufferSetting {


    constructor(options) {
        /**
         * @member {BufferEndType} [BufferSetting.prototype.endType = BufferEndType.FLAT]
         * @description 缓冲区端点枚举值。分为平头和圆头两种。当设置缓冲区端点为平头时，左侧、右侧缓冲距离需为相同数值。
         */
        this.endType = BufferEndType.FLAT;

        /**
         * @member {BufferDistance} [BufferSetting.prototype.leftDistance=100]
         * @description 左侧缓冲距离。
         * 当为 GeometryBufferAnalyst 时，单位为默认地图的投影系的单位（如3857为米，4326为度），
         * 当为 DatasetBufferAnalyst 时，单位通过{@link BufferSetting.radiusUnit}设置（默认全部为米）。
         */
        this.leftDistance = new BufferDistance();

        /**
         * @member {BufferDistance} [BufferSetting.prototype.rightDistance=100]
         * @description 右侧缓冲距离。
         * 当为 GeometryBufferAnalyst 时，单位为默认地图的投影系的单位（如3857为米，4326为度），
         * 当为 DatasetBufferAnalyst 时，单位通过{@link BufferSetting#radiusUnit}设置（默认全部为米）。
         */
        this.rightDistance = new BufferDistance();

        /**
         * @member {number} [BufferSetting.prototype.semicircleLineSegment=4]
         * @description 圆头缓冲圆弧处线段的个数。即用多少个线段来模拟一个半圆。
         */
        this.semicircleLineSegment = 4;

        /**
         * @member {BufferRadiusUnit} [BufferSetting.prototype.radiusUnit = BufferRadiusUnit.METER]
         * @description 缓冲半径单位，可以是{@link BufferRadiusUnit.METER}、{@link BufferRadiusUnit.MILLIMETER}、
         * {@link BufferRadiusUnit.CENTIMETER}、{@link BufferRadiusUnit.DECIMETER}、{@link BufferRadiusUnit.KILOMETER}、
         * {@link BufferRadiusUnit.FOOT}、{@link BufferRadiusUnit.INCH}、{@link BufferRadiusUnit.MILE}、{@link BufferRadiusUnit.YARD}。
         * 仅对BufferAnalyst有效。
         */
        this.radiusUnit = BufferRadiusUnit.METER;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.BufferSetting";
    }


    /**
     * @function BufferSetting.prototype.destroy
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
