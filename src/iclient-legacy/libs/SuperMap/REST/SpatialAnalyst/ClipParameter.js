/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Geometry.js
 */

/**
 * Class: SuperMap.REST.ClipParameter
 * 用于裁剪的参数。优先使用用户指定的裁剪区域多边形进行裁剪，也可以通过指定数据源和数据集名，从而使用指定数据集的边界多边形进行裁剪。
 */
SuperMap.REST.ClipParameter = SuperMap.Class({

    /**
     * APIProperty: clipDatasetName
     * {String} 用于裁剪的数据集名，当clipRegion不设置时起作用。
     */
    clipDatasetName : null,

    /**
     * APIProperty: clipDatasourceName
     * {String} 用于裁剪的数据集所在数据源的名字。
     */
    clipDatasourceName : null,

    /**
     * APIProperty: clipRegion
     * {<SuperMap.Geometry.Polygon>} 用户指定的裁剪区域，优先使用。
     */
    clipRegion : null,

    /**
     * APIProperty: isClipInRegion
     * {Boolean} 是否对裁剪区内的数据集进行裁剪。
     */
    isClipInRegion : false,

    /**
     * APIProperty: isExactClip
     * {Boolean} 是否使用精确裁剪。
     */
    isExactClip : null,

    /**
     * Constructor: SuperMap.REST.ClipParameter
     * 裁剪参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * clipDatasetName - {String} 裁剪的数据集名。
     * clipDatasourceName - {String} 裁剪的数据集所在数据源的名字。
     * clipRegion - {<SuperMap.Geometry.Polygon>} 用户指定的裁剪区域。
     * isClipInRegion - {Boolean} 是否对裁剪区内的数据集进行裁剪。
     * isExactClip - {Boolean} 是否使用精确裁剪。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        me.clipDatasetName = null;
        me.clipDatasourceName = null;
        me.clipRegion = null;
        me.isClipInRegion = null;
        me.isExactClip = null;
    },

    /**
     * Method: toJSON
     * 将 ClipParameter 对象转化为json字符串。
     *
     * Returns:
     * {String} 返回转换后的 JSON 字符串。
     */
    toJSON: function() {
        if(this.isClipInRegion == false)
            return null;
        var strClipParameter = "";
        var me = this;

        strClipParameter +="'isClipInRegion':" + SuperMap.Util.toJSON(me.isClipInRegion);

        if(me.clipDatasetName != null)
            strClipParameter += "," + "'clipDatasetName':" + SuperMap.Util.toJSON(me.clipDatasetName);

        if(me.clipDatasourceName != null)
            strClipParameter += "," + "'clipDatasourceName':" + SuperMap.Util.toJSON(me.clipDatasourceName);

        if(me.isExactClip != null)
            strClipParameter += "," + "'isExactClip':" + SuperMap.Util.toJSON(me.isExactClip);

        if(me.clipRegion != null)
        {
            var serverGeometry = SuperMap.REST.ServerGeometry.fromGeometry(me.clipRegion);
            if (serverGeometry) {
                var pointsCount = serverGeometry.parts[0];
                var point2ds = serverGeometry.points.splice(0, pointsCount);
                strClipParameter += "," + "'clipRegion':" +  "{\"point2Ds\":";
                strClipParameter += SuperMap.Util.toJSON(point2ds);
                strClipParameter += "}";
            }
        }
        return "{" +  strClipParameter + "}";
    },

    CLASS_NAME: "SuperMap.REST.ClipParameter"
});