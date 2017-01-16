/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/BaseTypes/Bounds.js
 * @requires SuperMap/CanvasLayer.js
 */

/**
 * Class: SuperMap.Layer.CloudLayer
 * 云服务图层类。
 *     通过向SuperMap 云服务器发送请求得到 SuperMap 云服务发布的图层。
 *
 * Inherits from:
 *  - <SuperMap.Layer.CanvasLayer>
 */

SuperMap.Layer.CloudLayer = SuperMap.Class(SuperMap.CanvasLayer, {
    /**
     * APIProperty: dpi
     * {Float} 屏幕上每英寸包含像素点的个数。
     * 该参数结合图层比例尺可以推算出该比例尺下图层的分辨率.默认为96。
     */
    dpi: 96,

    /**
     * APIProperty: name
     * {String} 图层标识名称，默认为：CloudLayer。
     */
    name: "CloudLayer",
    
    /**
     * Property: url
     * {String} 地图资源地址。默认为：http://t2.supermapcloud.com/FileService/image
     */
    url: 'http://t2.supermapcloud.com/FileService/image',
    
    /**
     * APIProperty: attribution
     * {String} 地图属性信息，可显示到地图上。
     */
    attribution: null,//'©2014 SuperMap - GS(2014)6070号-data©Navinfo',

    /**
     * APIProperty: mapName
     * {String} 地图名称，默认为 quanguo。
     */
    mapName: "quanguo",
        
    /**
     * Property: type
     * {String} 地图投影。
     */
    type: "web",

    /**
     * Constructor: SuperMap.Layer.CloudLayer
     * 云服务图层类。
     *
     * Parameters:
     * options - {Object}  附加到图层属性上的可选项。
     */
    initialize: function (options) {
        var me = this;
        this.attribution = SuperMap.i18n("cloudLayerAttr");
        //me.url = me.url + '?map=${mapName}&type=${type}&x=${x}&y=${y}&z=${z}';
        me.changeURL(me.url);
        //超图云只有一个开放的出图地址，投影为墨卡托投影，所以maxExtent和resolutions可以直接设置好
        options = SuperMap.Util.extend({
            maxExtent: new SuperMap.Bounds(
                -2.00375083427892E7,
                -2.00375083427892E7,
                2.00375083427892E7,
                2.00375083427892E7
            ),
            //第19级分辨率为0.298817952474，但由于绝大部分城市和地区在此级别都无图，所以暂不增加
//            resolutions: [156605.46875, 78302.734375, 39151.3671875, 19575.68359375, 9787.841796875, 4893.9208984375, 2446.96044921875, 1223.48022460937, 611.740112304687, 305.870056152344, 152.935028076172, 76.4675140380859, 38.233757019043, 19.1168785095215, 9.55843925476074, 4.77921962738037, 2.38960981369019, 1.19480490684509, 0.597402453422546]
            resolutions: [
                19567.8792410051, 9783.93962050254, 4891.96981025127, 2445.98490512563,
                1222.99245256282, 611.496226281409, 305.748113140704, 152.874056570352,
                76.4370282851761, 38.218514142588, 19.109257071294, 9.55462853564701,
                4.77731426782351, 2.38865713391175, 1.19432856695588, 0.597164283477938]
/*
            由于云服务采用聚合高德地图的方式提供数据，这里对分辨率也做了调整，移除前三个。
            注释部分为原来的完整分辨率；by jinjianbo-20160830
            resolutions: [156543.033928041, 78271.5169640203, 39135.7584820102,
                19567.8792410051, 9783.93962050254, 4891.96981025127, 2445.98490512563,
                1222.99245256282, 611.496226281409, 305.748113140704, 152.874056570352,
                76.4370282851761, 38.218514142588, 19.109257071294, 9.55462853564701,
                4.77731426782351, 2.38865713391175, 1.19432856695588, 0.597164283477938]
*/
        }, options);
        SuperMap.CanvasLayer.prototype.initialize.apply(me, [me.name, me.url, null, options]);
        me.units = "meter";
    },

    /**
     * APIMethod: changeURL
     * 更改URL，默认为：http://t2.supermapcloud.com/FileService/image。
     * @param url
     */
    changeURL: function(url){
       if(url){
           this.url += '?map=${mapName}&type=${type}&x=${x}&y=${y}&z=${z}';
       }
    },
    
    /**
     * APIMethod: destroy
     * 解构CloudLayer类，释放资源。  
     */
    destroy: function () {
        var me = this;
        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
        me.mapName = null;
        me.name = null;
        me.url = null;
    },

    /**
     * APIMethod: clone
     * 创建当前图层的副本。
     *
     * Parameters:
     * obj - {Object} 
     *
     * Returns:
     * {<SuperMap.Layer.CloudLayer>}新的图层。
     */
    clone: function (obj) {
        var me = this;
        if (obj == null) {
            obj = new SuperMap.Layer.CloudLayer(
                me.name, me.url, me.layerName, me.getOptions());
        }
       
        obj = SuperMap.CanvasLayer.prototype.clone.apply(me, [obj]);

        return obj;
    },
    
    /** 
     * Method: getTileUrl
     * 获取瓦片的URL。
     *
     * Parameters:
     * xyz - {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。
     *
     * Returns
     * {String} 瓦片的 URL。
     */
    getTileUrl: function (xyz) {
        var me = this,
            url = me.url;
        return SuperMap.String.format(url, {
            mapName: me.mapName,
            type: me.type,
            x: xyz.x,
            y: xyz.y,
            //仅针对高德地图做调整。by jinjianbo-20160830
            z: xyz.z + 3
        });
    },

    CLASS_NAME: "SuperMap.Layer.CloudLayer"
});
