import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {BufferEndType, BufferRadiusUnit} from '../REST';
import {BufferDistance} from './BufferDistance';

/**
 * @class SuperMap.BufferSetting
 * @classdesc 缓冲区分析通用设置类。
 * @param options - {Object} 缓冲区分析设置可选参数。如：<br>
 *         endType - {SuperMap.BufferEndType} 缓冲区端点枚举值。<br>
 *         leftDistance - {{@link SuperMap.BufferDistance}} 左侧缓冲距离。<br>
 *         rightDistance - {{@link SuperMap.BufferDistance}} 右侧缓冲距离。<br>
 *         semicircleLineSegment - {number} 圆头缓冲圆弧处线段的个数。<br>
 *         radiusUnit - {{@link SuperMap.BufferRadiusUnit}} 缓冲半径单位。
 */
export class BufferSetting {
    /**
     * @member SuperMap.BufferSetting.prototype.endType - {SuperMap.BufferEndType}
     * @description 缓冲区端点枚举值。分为平头和圆头两种，默认为平头，即 SuperMap.BufferEndType.FLAT
     */
    endType = BufferEndType.FLAT;

    /**
     * @member SuperMap.BufferSetting.prototype.leftDistance - {SuperMap.BufferDistance}
     * @description 左侧缓冲距离。
     * 默认为100。当为GeometryBufferAnalyst时，单位为默认地图的投影系的单位（如3857为米，4326为度），
     * 当为DatasetBufferAnalyst时，单位通过BufferSetting.radiusUnit设置（默认全部为米）。
     */
    leftDistance = null;

    /**
     * @member SuperMap.BufferSetting.prototype.rightDistance -{SuperMap.BufferDistance}
     * @description 右侧缓冲距离。
     * 默认为100。当为GeometryBufferAnalyst时，单位为默认地图的投影系的单位（如3857为米，4326为度），
     * 当为DatasetBufferAnalyst时，单位通过BufferSetting.radiusUnit设置（默认全部为米）。
     */
    rightDistance = null;

    /**
     * @member SuperMap.BufferSetting.prototype.semicircleLineSegment -{number}
     * @description 圆头缓冲圆弧处线段的个数。即用多少个线段来模拟一个半圆，默认值为4。
     */
    semicircleLineSegment = 4;

    /**
     * @member SuperMap.BufferSetting.prototype.radiusUnit - {SuperMap.BufferRadiusUnit}
     * @description 缓冲半径单位，默认值为SuperMap.BufferRadiusUnit.METER，还可以是SuperMap.BufferRadiusUnit.MILIMETER、SuperMap.BufferRadiusUnit.CENTIMETER、SuperMap.BufferRadiusUnit.DECIMETER、SuperMap.BufferRadiusUnit.KILOMETER、SuperMap.BufferRadiusUnit.FOOT、SuperMap.BufferRadiusUnit.INCH、SuperMap.BufferRadiusUnit.MILE、SuperMap.BufferRadiusUnit.YARD。仅对BufferAnalyst有效
     */
    radiusUnit = BufferRadiusUnit.METER;

    constructor(options) {
        let me = this;
        me.leftDistance = new BufferDistance();
        me.rightDistance = new BufferDistance();
        if (options) {
            Util.extend(this, options);
        }
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

    CLASS_NAME = "SuperMap.BufferSetting";
}

SuperMap.BufferSetting = BufferSetting;