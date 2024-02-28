/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {UGCSubLayer} from './UGCSubLayer';
import {ServerStyle} from './ServerStyle';

/**
 * @class Vector
 * @deprecatedclass SuperMap.Vector
 * @category  iServer Map Layer
 * @classdesc SuperMap 矢量图层类。矢量数据结构是通过记录空间对象的坐标及空间关系，尽可能精确地表现点、线、多边形等地理实体空间位置的一种数据结构。
 * @extends {UGCSubLayer}
 * @param {Object} options - 可选参数。
 * @param {ServerStyle} [options.style] - 矢量图层的风格。
 * @usage
 */

export class Vector extends UGCSubLayer {

    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member {ServerStyle} Vector.prototype.style
         * @description 矢量图层的风格。
         */
        this.style = null;

        this.CLASS_NAME = "SuperMap.Vector";
    }

    /**
     * @function Vector.prototype.destroy
     * @description 销毁对象，将其属性置空。
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function Vector.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        var sty = this.style;
        if (sty) {
            this.style = new ServerStyle(sty);
        }
    }

    /**
     * @function Vector.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var jsonObject = super.toServerJSONObject();
        if (jsonObject.style) {
            if (jsonObject.style.toServerJSONObject) {
                jsonObject.style = jsonObject.style.toServerJSONObject();
            }
        }
        return jsonObject;
    }
}

