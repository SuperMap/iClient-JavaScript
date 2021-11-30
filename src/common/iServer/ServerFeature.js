/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Vector} from '../commontypes/Vector';
import {ServerGeometry} from './ServerGeometry';
import {Util} from '../commontypes/Util';

/**
 * @class ServerFeature
 * @deprecatedclass SuperMap.ServerFeature
 * @category  iServer
 * @classdesc 服务端矢量要素类。该类描述了服务端返回的矢量要素的相关信息，包括字段和几何信息。
 * @param {Object} options - 参数。
 * @param {ServerGeometry} geometry - 矢量要素的几何信息。
 * @param {Array.<string>} [options.fieldNames] - 矢量要素的属性字段名集合。
 * @param {Array.<string>} [options.fieldValues] - 矢量要素的属性字段值集合。
 * @usage
 */
export class ServerFeature {

    constructor(options) {

        /**
         * @member {Array.<string>} [ServerFeature.prototype.fieldNames]
         * @description 矢量要素的属性字段名集合。
         */
        this.fieldNames = null;

        /**
         * @member {Array.<string>} [ServerFeature.prototype.fieldValues]
         * @description 矢量要素的属性字段值集合。
         */
        this.fieldValues = null;

        /**
         * @member {ServerGeometry} ServerFeature.prototype.geometry
         * @description 矢量要素的几何信息。
         */
        this.geometry = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ServerFeature";
    }

    /**
     * @function ServerFeature.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.fieldNames = null;
        me.fieldValues = null;
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
    }

    /**
     * @function ServerFeature.prototype.toFeature
     * @description 将服务端矢量要素 ServerFeature 转换为客户端矢量要素 Feature。
     * @returns {Vector} 转换后的客户端矢量要素。
     */
    toFeature() {
        var names, values, geo,
            attr = {},
            me = this,
            feature;

        names = me.fieldNames;
        values = me.fieldValues;
        for (var i in names) {
            attr[names[i]] = values[i];
        }
        if (me.geometry) {
            geo = me.geometry.toGeometry();
        }
        feature = new Vector(geo, attr);
        if (me.geometry && me.geometry.id) {
            feature.fid = me.geometry.id;
        }

        return feature;
    }

    /**
     * @function ServerFeature.prototype.fromJson
     * @description 将 JSON 对象表示服务端矢量要素转换为 ServerFeature。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     * @returns {ServerFeature} 转化后的 ServerFeature 对象。
     */
    static fromJson(jsonObject) {
        var geo = null;
        if (!jsonObject) {
            return;
        }
        geo = jsonObject.geometry;
        if (geo) {
            geo = ServerGeometry.fromJson(geo);
        }
        return new ServerFeature({
            fieldNames: jsonObject.fieldNames,
            fieldValues: jsonObject.fieldValues,
            geometry: geo
        });
    }

}

