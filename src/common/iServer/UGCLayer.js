import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Bounds} from '../commontypes/Bounds';
import '../REST';

/**
 * @class SuperMap.UGCLayer
 * @category  iServer Map Layer
 * @classdesc UGC 图层类。
 * @param {Object} options - 参数。 
 * @param {SuperMap.Bounds} options.bounds - 图层范围。 
 * @param {string} options.caption - 图层的标题。 
 * @param {string} [options.description] - 图层的描述信息。 
 * @param {string} options.name - 图层的名称。 
 * @param {boolean} [options.queryable] - 图层中的对象是否可以查询 
 * @param {boolean} [options.subUGCLayers] - 是否允许图层的符号大小随图缩放。 
 * @param {SuperMap.UGCLayerType} options.type  - 图层类型 
 * @param {boolean} [options.visible=false] - 地图对象在同一范围内时，是否重叠显示。
 */
export class UGCLayer {

    constructor(options) {
        options =  options || {};
        /**
         * @member {SuperMap.Bounds} SuperMap.UGCLayer.prototype.bounds
         * @description 图层范围。
         */
        this.bounds = null;

        /**
         * @member {string} SuperMap.UGCLayer.prototype.caption
         * @description 图层的标题。
         */
        this.caption = null;

        /**
         * @member {string} SuperMap.UGCLayer.prototype.description
         * @description 图层的描述信息。
         */
        this.description = null;

        /**
         * @member {string} SuperMap.UGCLayer.prototype.name
         * @description 图层的名称。
         */
        this.name = null;

        /**
         * @member {boolean} SuperMap.UGCLayer.prototype.queryable
         * @description 图层中的对象是否可以查询。
         */
        this.queryable = null;

        /**
         * @member {Array} SuperMap.UGCLayer.prototype.subLayers
         * @description 子图层集。
         */
        this.subLayers = null;

        /**
         * @member {SuperMap.UGCLayerType} SuperMap.UGCLayer.prototype.type
         * @description 图层类型。
         */
        this.type = null;

        /**
         * @member {boolean} SuperMap.UGCLayer.prototype.visible
         * @description 图层是否可视。
         */
        this.visible = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.UGCLayer";
    }

    /**
     * @function SuperMap.UGCLayer.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        Util.reset(me);
    }

    /**
     * @function SuperMap.UGCLayer.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        jsonObject = jsonObject ? jsonObject : {};
        Util.extend(this, jsonObject);
        var b = this.bounds;
        if (b) {
            this.bounds = new Bounds(b.leftBottom.x, b.leftBottom.y, b.rightTop.x, b.rightTop.y);
        }
    }


    /**
     * @function SuperMap.UGCLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = {};
        jsonObject = Util.copyAttributes(jsonObject, this);
        if (jsonObject.bounds) {
            if (jsonObject.bounds.toServerJSONObject) {
                jsonObject.bounds = jsonObject.bounds.toServerJSONObject();
            }
        }
        return jsonObject;
    }

}

SuperMap.UGCLayer = UGCLayer;