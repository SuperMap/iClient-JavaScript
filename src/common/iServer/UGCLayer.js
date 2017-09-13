import SuperMap from '../SuperMap';
import {UGCLayerType} from '../REST';

/**
 * @class SuperMap.UGCLayer
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
export default class UGCLayer {

    /**
     * @member SuperMap.UGCLayer.prototype.bounds -{SuperMap.Bounds}
     * @description 图层范围。
     */
    bounds = null;

    /**
     * @member SuperMap.UGCLayer.prototype.caption -{string}
     * @description 图层的标题。
     */
    caption = null;

    /**
     * @member SuperMap.UGCLayer.prototype.description -{string}
     * @description 图层的描述信息。
     */
    description = null;

    /**
     * @member SuperMap.UGCLayer.prototype.name -{string}
     * @description 图层的名称。
     */
    name = null;

    /**
     * @member SuperMap.UGCLayer.prototype.queryable -{boolean}
     * @description 图层中的对象是否可以查询。
     */
    queryable = null;

    /**
     * @member SuperMap.UGCLayer.prototype.subLayers -{Array}
     * @description 子图层集。
     */
    subLayers = null;

    /**
     * @member SuperMap.UGCLayer.prototype.type -{SuperMap.UGCLayerType}
     * @description 图层类型。
     */
    type = null;

    /**
     * @member SuperMap.UGCLayer.prototype.visible -{boolean}
     * @description 图层是否可视。
     */
    visible = null;

    constructor(options) {
        options = options ? options : {};
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.UGCLayer.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        SuperMap.Util.reset(me);
    }

    /**
     * @function SuperMap.UGCLayer.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        jsonObject = jsonObject ? jsonObject : {};
        SuperMap.Util.extend(this, jsonObject);
        var b = this.bounds;
        if (b) {
            this.bounds = new SuperMap.Bounds(b.leftBottom.x, b.leftBottom.y, b.rightTop.x, b.rightTop.y);
        }
    }


    /**
     * @function SuperMap.UGCLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return{Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = {};
        jsonObject = SuperMap.Util.copyAttributes(jsonObject, this);
        if (jsonObject.bounds) {
            if (jsonObject.bounds.toServerJSONObject) {
                jsonObject.bounds = jsonObject.bounds.toServerJSONObject();
            }
        }
        return jsonObject;
    }


    CLASS_NAME = "SuperMap.UGCLayer"
}

SuperMap.UGCLayer = UGCLayer;