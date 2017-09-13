import SuperMap from '../SuperMap';

/**
 * @class SuperMap.ClipParameter
 * @classdesc 用于裁剪的参数。
 * @description 优先使用用户指定的裁剪区域多边形进行裁剪，也可以通过指定数据源和数据集名，从而使用指定数据集的边界多边形进行裁剪。
 * @param options - {Object} 参数。<br>
 *          clipDatasetName - {String} 裁剪的数据集名。<br>
 *          clipDatasourceName - {String} 裁剪的数据集所在数据源的名字。<br>
 *          clipRegion - {Object} 用户指定的裁剪区域。面对象可以是SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。</br>
 *          isClipInRegion - {Boolean} 是否对裁剪区内的数据集进行裁剪。<br>
 *          isExactClip - {Boolean} 是否使用精确裁剪。
 */
export default class ClipParameter {

    /**
     * @member SuperMap.ClipParameter.prototype.clipDatasetName -{string}
     * @description 用于裁剪的数据集名，当clipRegion不设置时起作用。
     */
    clipDatasetName = null;

    /**
     * @member SuperMap.ClipParameter.prototype.clipDatasourceName -{string}
     * @description 用于裁剪的数据集所在数据源的名字。
     */
    clipDatasourceName = null;

    /**
     * @member SuperMap.ClipParameter.prototype.clipRegion -{Object}
     * @description 用户指定的裁剪区域，优先使用。<br>
     * 面对象可以是SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。
     */
    clipRegion = null;

    /**
     * @member SuperMap.ClipParameter.prototype.isClipInRegion -{boolean}
     * @description 是否对裁剪区内的数据集进行裁剪。
     */
    isClipInRegion = false;

    /**
     * @member SuperMap.ClipParameter.prototype.isExactClip -{boolean}
     * @description 是否使用精确裁剪。
     */
    isExactClip = null;

    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /**
     * @function SuperMap.ClipParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.clipDatasetName = null;
        me.clipDatasourceName = null;
        me.clipRegion = null;
        me.isClipInRegion = null;
        me.isExactClip = null;
    }


    /**
     * @function SuperMap.ClipParameter.prototype.toJSON
     * @description 将 ClipParameter 对象转化为json字符串。
     * @return {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        if (this.isClipInRegion == false)
            return null;
        var strClipParameter = "";
        var me = this;

        strClipParameter += "'isClipInRegion':" + SuperMap.Util.toJSON(me.isClipInRegion);

        if (me.clipDatasetName != null)
            strClipParameter += "," + "'clipDatasetName':" + SuperMap.Util.toJSON(me.clipDatasetName);

        if (me.clipDatasourceName != null)
            strClipParameter += "," + "'clipDatasourceName':" + SuperMap.Util.toJSON(me.clipDatasourceName);

        if (me.isExactClip != null)
            strClipParameter += "," + "'isExactClip':" + SuperMap.Util.toJSON(me.isExactClip);

        if (me.clipRegion != null) {
            var serverGeometry = SuperMap.REST.ServerGeometry.fromGeometry(me.clipRegion);
            if (serverGeometry) {
                var pointsCount = serverGeometry.parts[0];
                var point2ds = serverGeometry.points.splice(0, pointsCount);
                strClipParameter += "," + "'clipRegion':" + "{\"point2Ds\":";
                strClipParameter += SuperMap.Util.toJSON(point2ds);
                strClipParameter += "}";
            }
        }
        return "{" + strClipParameter + "}";
    }


    CLASS_NAME = "SuperMap.ClipParameter"
}
SuperMap.ClipParameter = ClipParameter;