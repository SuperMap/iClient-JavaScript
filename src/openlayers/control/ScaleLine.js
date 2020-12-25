/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import Scale from 'ol/control/ScaleLine';
import * as olProj from 'ol/proj';
import AssertionError from 'ol/AssertionError';

/**
 * @class ol.supermap.control.ScaleLine
 * @category  Control
 * @version 9.1.2
 * @classdesc 比例尺控件。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">该功能继承 {@link ol.control.ScaleLine },与 {@link ol.control.ScaleLine } 功能完全相同。仅为修复 `openlayers` v4.6.5 版本中 WGS84 等地理坐标系比例尺数值错误的问题。
 * </div>
 * @extends {ol/control/ScaleLine}
 * @param {options} options -参数。
 * @param {string} [options.className='ol-scale-line'] - CSS Class name.。
 * @param {number} [options.minWidth=64] - 最小像素宽度。
 * @param {(HTMLElement|string) } [options.target] - 指定比例尺控件目标容器。
 * @param {(ol.control.ScaleLineUnits|string)} [options.units='metric'] - 上一个版本的按钮布局。
 * @example
 * var control = new ol.supermap.control.ScaleLine();
 *      map.addControl(control)
 */
export class ScaleLine extends Scale {
    constructor(options) {
        options = options || {};
        //需在super之前定义render，真正的调用是在初始化完成后
        options.render = function (mapEvent) {
            var frameState = mapEvent.frameState;
            if (!frameState) {
                this.viewState_ = null; //NOSONAR
            } else {
                this.viewState_ = frameState.viewState; //NOSONAR
            }
            this.updateElementRepair(); //NOSONAR
        }
        super(options); //NOSONAR
    }

    updateElementRepair() {
        const viewState = this.viewState_ || this.o;

        if (!viewState) {
            this.renderedVisible_ = this.renderedVisible_ || this.j;
            if (this.renderedVisible_) {
                this.element_ = this.element_ || this.c;
                this.element.style.display = 'none';
                this.renderedVisible_ = false;
            }
            return;
        }

        const center = viewState.center;
        const projection = viewState.projection;
        const units = this.getUnits();
        const pointResolutionUnits = units == "degrees" ?
            "degrees" :
            "m";
        let pointResolution =
        olProj.getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);
        this.minWidth_ = this.minWidth_ || this.v;
        let nominalCount = this.minWidth_ * pointResolution;
        let suffix = '';
        if (units == "degrees") {
            const metersPerDegree = olProj.METERS_PER_UNIT["degrees"];
            nominalCount *= metersPerDegree;
            if (nominalCount < metersPerDegree / 60) {
                suffix = '\u2033'; // seconds
                pointResolution *= 3600;
            } else if (nominalCount < metersPerDegree) {
                suffix = '\u2032'; // minutes
                pointResolution *= 60;
            } else {
                suffix = '\u00b0'; // degrees
            }
        } else if (units == "imperial") {
            if (nominalCount < 0.9144) {
                suffix = 'in';
                pointResolution /= 0.0254;
            } else if (nominalCount < 1609.344) {
                suffix = 'ft';
                pointResolution /= 0.3048;
            } else {
                suffix = 'mi';
                pointResolution /= 1609.344;
            }
        } else if (units == "nautical") {
            pointResolution /= 1852;
            suffix = 'nm';
        } else if (units == "metric") {
            if (nominalCount < 0.001) {
                suffix = 'μm';
                pointResolution *= 1000000;
            } else if (nominalCount < 1) {
                suffix = 'mm';
                pointResolution *= 1000;
            } else if (nominalCount < 1000) {
                suffix = 'm';
            } else {
                suffix = 'km';
                pointResolution /= 1000;
            }
        } else if (units == "us") {
            if (nominalCount < 0.9144) {
                suffix = 'in';
                pointResolution *= 39.37;
            } else if (nominalCount < 1609.344) {
                suffix = 'ft';
                pointResolution /= 0.30480061;
            } else {
                suffix = 'mi';
                pointResolution /= 1609.3472;
            }
        } else {
            throw new AssertionError(33); // Invalid units
        }
        var DIGITS = [1, 2, 5];
        let i = 3 * Math.floor(
            Math.log(this.minWidth_ * pointResolution) / Math.log(10));
        let count, width, decimalCount;
        while (true) { //eslint-disable-line no-constant-condition
            decimalCount = Math.floor(i / 3);
            const decimal = Math.pow(10, decimalCount);
            count = DIGITS[((i % 3) + 3) % 3] * decimal;
            width = Math.round(count / pointResolution);
            if (isNaN(width)) {
                this.element.style.display = 'none';
                this.renderedVisible_ = false;
                return;
            } else if (width >= this.minWidth_) {
                break;
            }
            ++i;
        }
        this.renderedHTML_ = this.renderedHTML_ || this.D;
        this.innerElement_ = this.innerElement_ || this.l;
        this.renderedWidth_ = this.renderedWidth_ || this.B;
        this.renderedVisible_ = this.renderedVisible_ || this.j;
        this.element_ = this.element_ || this.c;
        let html= count.toFixed(decimalCount < 0 ? -decimalCount : 0) + ' ' + suffix;
        if (this.renderedHTML_ != html) {
            this.innerElement_.innerHTML = html;
            this.renderedHTML_ = html;
        }

        if (this.renderedWidth_ != width) {
            this.innerElement_.style.width = width + 'px';
            this.renderedWidth_ = width;
        }

        if (!this.renderedVisible_) {
            this.element.style.display = '';
            this.renderedVisible_ = true;
        }

    }
}