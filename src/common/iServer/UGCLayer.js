import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Bounds} from '../commontypes/Bounds';
import '../REST';

/**
 * @class SuperMap.UGCLayer
 * @category  iServer Map Layer
 * @classdesc UGC 图层类。
 * @param options - {Object} 可选参数。如：<br>
 *        bounds - {{@link SuperMap.Bounds}} 图层范围。<br>
 *        caption - {string} 图层的标题。<br>
 *        description - {string} 图层的描述信息。<br>
 *        name - {string} 图层的名称。<br>
 *        queryable - {boolean} 图层中的对象是否可以查询。<br>
 *        subUGCLayers - {boolean} 是否允许图层的符号大小随图缩放。<br>
 *        type - {{@link SuperMap.UGCLayerType}} 图层类型。<br>
 *        visible - {boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。
 */
export class UGCLayer {

    constructor(options) {
        options =  options || {};
        /**
         * @member SuperMap.UGCLayer.prototype.bounds -{SuperMap.Bounds}
         * @description 图层范围。
         */
        this.bounds = null;

        /**
         * @member SuperMap.UGCLayer.prototype.caption -{string}
         * @description 图层的标题。
         */
        this.caption = null;

        /**
         * @member SuperMap.UGCLayer.prototype.description -{string}
         * @description 图层的描述信息。
         */
        this.description = null;

        /**
         * @member SuperMap.UGCLayer.prototype.name -{string}
         * @description 图层的名称。
         */
        this.name = null;

        /**
         * @member SuperMap.UGCLayer.prototype.queryable -{boolean}
         * @description 图层中的对象是否可以查询。
         */
        this.queryable = null;

        /**
         * @member SuperMap.UGCLayer.prototype.subLayers -{Array}
         * @description 子图层集。
         */
        this.subLayers = null;

        /**
         * @member SuperMap.UGCLayer.prototype.type -{SuperMap.UGCLayerType}
         * @description 图层类型。
         */
        this.type = null;

        /**
         * @member SuperMap.UGCLayer.prototype.visible -{boolean}
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
     * @param jsonObject - {Object} 要转换的 JSON 对象。
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
     * @return{Object} 对应的 JSON 格式对象。
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