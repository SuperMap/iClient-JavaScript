/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.SetLayerStatusParameters
 * 子图层显示控制参数类。
 * 该类存储了各子图层是否可见的状态。子图层显示控制功能只针对 TiledDynamicIServerLayer 和 DynamicIServerLayer 图层。
 * 注意在 SuperMap iClient 系列产品中所说的图层与 SuperMap Deskpro 的地图对应，子图层与 SuperMap Deskpro 的图层对应。
 */
SuperMap.REST.SetLayerStatusParameters = SuperMap.Class({

    /**
     * APIProperty: layerStatusList
     * {Array<SuperMap.REST.LayerStatus>} 获取或设置图层可见状态（LayerStatus）集合，必设属性。集合中的每个 LayerStatus 对象代表一个子图层的可视状态。
     */
    layerStatusList: null,

    /**
     * APIProperty: holdTime
     * {Number} 获取或设置资源在服务端保存的时间。 默认为 15 分钟。
     */
    holdTime: 15,

    /**
     * APIProperty: resourceID
     * {String} 获取或设置资源服务 ID 。非必设参数，如果设置该参数则会在指定的 TempLayer 进行图层的显示控制；如果不设置该参数，则会首先创建一个 TempLayer ，然后在新创建的 TempLayer 进行图层的显示控制。
     */
    resourceID: null,

    /**
     * Constructor: SuperMap.REST.SetLayerStatusParameters
     *
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * layerStatusList - {Array<SuperMap.REST.LayerStatus>} 获取或设置图层可见状态（LayerStatus）集合，必设属性。集合中的每个 LayerStatus 对象代表一个子图层的可视状态。
     * holdTime - {String} 获取或设置资源在服务端保存的时间。
     * resourceID - {String} 获取或设置资源服务 ID。
     */
    initialize: function(options) {
        var me = this;
        me.layerStatusList = [];
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
        me.layerStatusList = null;
        me.holdTime = null;
        me.resourceID = null;
    },

    /**
     * Method: toJSON
     * 生成json。
     */
    toJSON:function(){
        var json = '{';
        json += '"layers":[';
        var v = [];
        for (var i = 0, len = this.layerStatusList.length; i < len; i++) {
            v.push(this.layerStatusList[i].toJSON());
        }

        json += v;
        json += ']';
        json += '}';

        return json;
    },

    CLASS_NAME: "SuperMap.REST.SetLayerStatusParameters"
})