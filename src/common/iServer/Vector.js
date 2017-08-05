import SuperMap from '../SuperMap';
import UGCSubLayer from './UGCSubLayer';
import ServerStyle from './ServerStyle';

/**
 * Class: SuperMap.Vector
 * UGC 矢量图层类。
 *
 * Inherits from:
 *  - <SuperMap.UGCSubLayer>
 */

export default  class Vector extends UGCSubLayer {

    /**
     * APIProperty: style
     * {SuperMap.ServerStyle} 矢量图层的风格。
     */
    style = null;

    /**
     * Constructor: SuperMap.Vector
     * UGC 矢量图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * style - {SuperMap.ServerStyle} 矢量图层的风格。
     */
    constructor(options) {
        options = options || {};
        super(options);
    }

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }

    /**
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        var sty = this.style;
        if (sty) {
            this.style = new ServerStyle(sty);
        }
    }

    /**
     * APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = SuperMap.toServerJSONObject();
        if (jsonObject.style) {
            if (jsonObject.style.toServerJSONObject) {
                jsonObject.style = jsonObject.style.toServerJSONObject();
            }
        }
        return jsonObject;
    }

    CLASS_NAME = "SuperMap.Vector"
}

SuperMap.Vector = Vector;
