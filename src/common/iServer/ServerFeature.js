import {SuperMap} from '../SuperMap';
import {Vector} from '../commontypes/Vector';
import {ServerGeometry} from './ServerGeometry';
import {Util} from '../commontypes/Util';

/**
 * @private
 * @class SuperMap.ServerFeature
 * @category  iServer  
 * @classdesc 服务端矢量要素类。该类描述了服务端返回的矢量要素的相关信息，包括字段和几何信息。
 */
export class ServerFeature {
    /*
     * Constructor: SuperMap.ServerFeature
     * 服务端矢量要素类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * fieldNames - {Array(String)} 矢量要素的属性字段名集合。
     * fieldValues - {Array(String)} 矢量要素的属性字段值集合。
     * geometry - {<SuperMap.ServerGeometry>} 矢量要素的几何信息。
     */
    constructor(options) {

        /*
         * APIProperty: fieldNames
         * {Array(String)} 矢量要素的属性字段名集合。
         */
        this.fieldNames = null;

        /*
         * APIProperty: fieldValues
         * {Array(String)} 矢量要素的属性字段值集合。
         */
        this.fieldValues = null;

        /*
         * APIProperty: geometry
         * {<SuperMap.ServerGeometry>} 矢量要素的几何信息。
         */
        this.geometry = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ServerFeature";
    }

    /*
     * @function SuperMap.ServerFeature.prototype.destroy
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
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

    /*
     * APIMethod: toFeature
     * 将服务端矢量要素 ServerFeature 转换为客户端矢量要素 Feature。
     *
     * Returns
     * {<Vector>} 转换后的客户端矢量要素。
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

    /*
     * Function: SuperMap.ServerFeature.fromJson
     * 将 JSON 对象表示服务端矢量要素转换为 ServerFeature
     *
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     *
     * Returns:
     * {SuperMap.ServerFeature} 转化后的 ServerFeature 对象。
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


SuperMap.ServerFeature = ServerFeature;