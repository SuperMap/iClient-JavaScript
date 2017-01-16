/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/CanvasLayer.js
 */

/**
 * Class: SuperMap.Layer.SimpleCachedLayer
 * 用于对接SuperMap iServer Java 6R的缓存图层(Version 3.1)。
 * 该图层用于对接iserver2.0缓存，即简易缓存。
 * 主要用于获取服务器上预先生成的地图缓存，在url访问上就有一定的特殊性
 * 例如在http://localhost:8090/iserver/output/cache/下是存放用户通过管理界面预先生成的缓存。
 * 所以url的组织就得按照这个目录来组织。
 *
 * Inherits from:
 * - <SuperMap.CanvasLayer>
 */

SuperMap.Layer.SimpleCachedLayer = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * APIProperty: urlTemplate
     * {String} URL模板。
	 * 默认取值为："${layerName}_${w}x${h}/${scale}/${x}/${y}.${format}"
	 * 其中：
	 * ${layerName}表示图层名称
	 * ${w}表示瓦片宽度
	 * ${h}表示瓦片高度
	 * ${scale}表示当前请求的比例尺
	 * ${x}表示当前请求的行索引号
	 * ${y}表示当前请求的列索引号
	 * ${format}请求图片的格式，比如png、gif等
	 * 转换为实际地址为 eg:http://localhost:8090/iserver/output/cache/World Map_512x512/10000000/0/0.png
     */
    urlTemplate: "${layerName}_${w}x${h}/${scale}/${x}/${y}.${format}",

    /**
     * APIProperty: layerName
     * {String} 地图名称，默认为null。
     * 图层初始化的时候设置，需要和服务器上已经缓存好的地图名称一样。
     */
    layerName: null,
        
    /** 
     * Constructor: SuperMap.Layer.SimpleCachedLayer
     * 分块缓存图层。
	 * 
     *
     * Parameters:
     * name - {String}  图层标识名称。
     * url - {Array(String) or String} 图层的服务地址，是数组也可以是单个url，前者支持多地图服务轮询出图，大大提高显示速度。
     * layerName - {String} 地图名称，必须和服务器上缓存好的地图名称相同。
     * options - {Object}  附加到图层属性上的可选项。dpi 和 resolutions或scales属性必设。
	 *
	 * Allowed options properties:
     * dpi - {String} 必设属性。
	 * resolutions - {Array} 分辨率数组。resolutions和scales设置其一
     * scales - {Array} 比例尺数组。，resolutions和scales设置其一
     * tileSize - {<SuperMap.Size>}设置瓦片的大小，默认为256x256。 
     */
    initialize: function (name, url, layerName, options) {
        var me = this;
        me.layerName = layerName;
        SuperMap.CanvasLayer.prototype.initialize.apply(me, [name, url, {}, options]);
    },
    
    /**
     * APIMethod: clone
     * 创建当前图层的副本。
     *
     * Parameters:
     * obj - {Object} 
     *
     * Returns:
     * {<SuperMap.Layer.SimpleCachedLayer>}新的图层。
     */
    clone: function (obj) {
        var me = this;
        if (obj == null) {
            obj = new SuperMap.Layer.SimpleCachedLayer(
                me.name, me.url, me.layerName, me.getOptions());
        }
       
        obj = SuperMap.CanvasLayer.prototype.clone.apply(me, [obj]);

        return obj;
    }, 

    /**
     * APIMethod: destroy
     * 解构TSimpleCachedLayer类，释放资源。
     */
    destroy: function () {
        var me = this;
        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
        me.layerName = null;
        me.urlTemplate = null;
    },
    
    /** 
     * Method: getTileUrl
     * 获取瓦片的URL。
     *
     * Parameters:
     * xyz - {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。
     *
     * Returns
     * {String} 瓦片的 URL 。
     */
    getTileUrl: function (xyz) {
        var me = this,
            tileSize = me.tileSize,
            scale = me.scales[xyz.z],
            url = me.url,
            urlTemplate = me.urlTemplate,
            layerName = me.layerName,
            format = me.format;
        //在没有设置任何投影的情况下，比例尺可能大于1，为了提高容错能力，注释掉比例尺矫正函数。 maoshuyu
        //scale = SuperMap.Util.normalizeScale(scale);
        if (SuperMap.Util.isArray(url)) {
            var s = "" + xyz.x + xyz.y + xyz.z + tileSize.h + tileSize.w + layerName + format;
            url = me.selectUrl(s, url);
        }
        url = (url.charAt(url.length - 1) === "/") ? url + urlTemplate : url + "/" + urlTemplate;
        return SuperMap.String.format(url, {
            x: xyz.x,
            y: xyz.y,
            scale: Math.round(1/scale),
            h: tileSize.h,
            w: tileSize.w,
            layerName: layerName,
            format: format
        });
    },
    
    CLASS_NAME: "SuperMap.Layer.SimpleCachedLayer"
});
