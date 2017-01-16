
/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Layer/CanvasLayer.js
 */

/**
 * Class: SuperMap.Layer.MapABC
 *    此图层可以访问 MapABC 的地图服务。
 *
 * Inherits from:
 *  - <SuperMap.Layer.CanvasLayer>
 */
SuperMap.Layer.MapABC = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * APIProperty: name
     * {String}图层名称，默认为“MapABC”，防止初始化时未设置图层名
     *
     */
    name: "MapABC",

    /**
     * APIProperty: url
     * {String}默认的MapABC的服务器地址，不需要要用户设置
     */
    url: "http://emap${a}.mapabc.com/mapabc/maptile?v=w2.61&&x=${x}&y=${y}&z=${z}",


    /**
     * Constructor: SuperMap.Layer.MapABC
     * 创建MapABC图层，可以浏览MapABC地图
     * Example:
     * (code)
     *
     * var layer = new SuperMap.Layer.MapABC("MyName");
     * //将Layer图层加载到Map对象上
     * map.addLayer(layer);
     * //出图，map.setCenter函数显示地图
     * //MapABC图层默认为墨卡托投影，所以定位需要转换
     * map.setCenter(
     *  new SuperMap.LonLat(110,39.5 ).transform(
     *  new SuperMap.Projection("EPSG:4326"),
     *  map.getProjectionObject()
     *  ), 4
     *  );
     *                                    
     * (end)
     *
     *
     * Parameters:
     * name - {String} 图层名称
     */
    initialize: function(name) {
        this.name = name;
        //设置为墨卡托投影
        var options = {
            projection: "EPSG:900913",
            numZoomLevels: 16
        };
        SuperMap.CanvasLayer.prototype.initialize.apply(this,[name,this.url,{},options] );
    },

    /**
     * APIMethod: clone
     * 复制一份MapABC图层
     *
     * Returns
     * {<SuperMap.Layer.MapABC>} 返回复制后的MapABC图层。
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new SuperMap.Layer.MapABC(
                this.name);
        }
        obj = SuperMap.CanvasLayer.prototype.clone.apply(this, [obj]);
        return obj;
    },

    /**
     * APIMethod: destroy
     * 解构MapABC类，释放资源。
     */
    destroy: function () {
        var me = this;
        me.name = null;
        me.url = null;
        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
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
        var me = this,  url;
        url = me.url;
        url= SuperMap.String.format(url, {
            a: xyz.x%4,
            x: xyz.x,
            y: xyz.y,
            z: xyz.z
        });
        return  url;
    },

    CLASS_NAME: "SuperMap.Layer.MapABC"
});
