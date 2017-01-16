/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Layer/TiledDynamicRESTLayer.js
 * @requires SuperMap/Layer/Markers.js
 * @requires SuperMap/Layer/UTFGrid.js
 */

/**
 * Class: SuperMap.GOIs
 * 麻点图，服务端将点数据生成一个临时的图层，客户端通过动态图层的方式展现出来，从而达到高效率渲染大数据量点的目的，事件通过utfgrid实现。
 */
SuperMap.GOIs = SuperMap.Class({
    /**
     * APIProperty: url
     * {String} 地图资源url。
     */
    url: null,

    /**
     * APIProperty: datasetName
     * {String} 所要显示的点数据集图层名称。
     */
    datasetName: null,

    /**
     * APIProperty: style
     * {SuperMap.REST.ServerStyle} 图层中点的默认风格。
     */
    style: null,

    /**
     * APIProperty: filter
     * {String} poi的过滤条件。假如过滤条件里面还有子字符串，比如"NAME = '刘河乡'"，则外面的引号必须为双引号，里面的为单引号，
     * 也就是不能写成'NAME = "刘河乡"'的形式。
     *
     * (start code)
     *  myGOIs = new SuperMap.GOIs({
     *          "url":url,
     *          "datasetName":datasetName,
     *          "style":new SuperMap.REST.ServerStyle({
     *              "markerSymbolID":907942,
     *              "markerSize":4
     *          }),
     *          "pixcell": 16,
     *          "filter":"NAME = '刘河乡'"
     *      });
     * (end)
     */
    filter: null,

    /**
     * APIProperty: cacheEnabled
     * {Boolean} 是否使用服务端的图片缓存，默认为 true，即使用服务端的图片缓存。同TiledDynamicRESTLayer的 cacheEnabled属性
     */
    cacheEnabled: true,

    /**
     * APIProperty: resolutions
     * {Array} 分辨率数组，如果设置了dpi，resolutions和scales设置其一。
     */
    resolutions: null,

    /**
     * APIProperty: scales
     * {Array} 比例尺数组，如果设置了dpi，resolutions和scales设置其一。
     */
    scales:null,

    /**
     * APIProperty: dpi
     * {Number} 图像分辨率，表示每英寸内的像素个数。
     */
    dpi:null,

    /**
     * APIProperty: units
     * {String} 地图坐标系统的单位。
     */
    units:null,

    /**
     * APIProperty: datumAxis
     * {Number} 椭球体长半轴。
     */
    datumAxis:null,

    /**
     * APIProperty: format
     * {String} 栅格图层图片格式。
     */
    format:null,

    /**
     * APIProperty: projection
     * {<SuperMap.Projection>} or {<String>} 投影字符串。如“EPSG：900913”
     */
    projection:null,

    /**
     * APIProperty: pixcell
     * {Number} UTFGrid瓦片中每个单元格的像素宽度, 默认为8，详见SuperMap.Layer.UTFGrid的pixcell参数。
     */
    pixcell:8,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *initialized* 初始化结束时触发该事件。例如：
     * - *initializeFailed* 初始化失败时触发该事件。
     * - *onTiledDynamicRESTLayerCreated* 内部临时图层创建成功时触发该事件。
     * - *onMarkerLayerCreated* 内部marker图层创建成功时触发该事件。
     * - *onUtfgridLayerCreated* 内部Utfgrid图层创建成功时触发该事件。
     * (start code)
     *  myGOIs.events.on({"initialized": onGOIsInitialized});
     *  function onGOIsInitialized() {
     *      //code
     *  }
     * (end)
     */
    EVENT_TYPES: ["initialized","initializeFailed","onTiledDynamicRESTLayerCreated",
        "onMarkerLayerCreated","onUtfgridLayerCreated"],

    /**
     * Property: events
     * {<SuperMap.Events>}
     */
    events: null,

    /**
     * Property: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数。通过 SuperMap.Events.on 注册。
     */
    eventListeners: null,

    /**
     * Property: getLayersInfoService
     * {SuperMap.REST.GetLayersInfoService} poi的过滤条件。
     */
    getLayersInfoService: null,

    /**
     * Property: tiledDynamicRESTLayer
     * {SuperMap.Layer.TiledDynamicRESTLayer} 临时图层。
     */
    tiledDynamicRESTLayer: null,

    /**
     * Property: utfgridLayer
     * {SuperMap.Layer.UTFGrid} utfgrid图层。
     */
    utfgridLayer: null,

    /**
     * Property: markerLayer
     * {SuperMap.Layer.Markers} marker图层。
     */
    markerLayer:null,
    /**
     * Property: __isPoi
     * {Boolean}
     */
    __isPoi:null,

    /**
     * Constructor: SuperMap.GOIs
     * 创建一个GOIs对象。
     *
     *  (start code)
     *  var map = new SuperMap.Map("map",{allOverlays: true,projection: "EPSG:3857"});//需要给map设置allOverlays和projection两个属性
     *  var myGOIs = new SuperMap.GOIs({
     *      "url":url,
     *      "datasetName":"China_Town_P@China400",
     *  });
     *  myGOIs.events.on({"initialized": function(){
     *     var layers = myGOIs.getLayers();
　  *     map.addLayers(layers);
　  *     var control = new SuperMap.Control.GOIs(layers);
　  *     map.addControl(control);
　  *     control.events.on("mouseover",function(){
     *         //code
     *     });
　  *     control.events.on("mouseout",function(){
     *         //code
     *     });
　  *     control.events.on("click",function(){
     *         //code
     *     });
     *  }});
     * (end)
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * map - {SuperMap.Map} map对象。
     * url - {String} 地图资源url。
     * datasetName - {String} 所要显示的点数据集图层名称。
     * style - {SuperMap.REST.ServerStyle} 图层中点的默认风格。
     * filter - {String} poi的过滤条件。
     * resolutions - {Array} 分辨率数组。如果设置了dpi，resolutions和scales设置其一
     * scales - {Array} 比例尺数组。如果设置了dpi，resolutions和scales设置其一
     * dpi - {Number} 图像分辨率，表示每英寸内的像素个数。
     * units - {String} 地图坐标系统的单位。
     * datumAxis - {Number} 椭球体长半轴。
     * format - {String} 栅格图层图片格式。
     * projection - {<SuperMap.Projection>} or {<String>} 投影字符串。如“EPSG：900913”。
     * cacheEnabled - {Boolean} 是否使用服务端的图片缓存，默认为 true，即使用服务端的图片缓存。同TiledDynamicRESTLayer的 cacheEnabled属性
     */

    initialize: function(options) {
        var t = this;
        if (options) {
            SuperMap.Util.extend(this, options);
        }

        this.events = new SuperMap.Events(t, null, t.EVENT_TYPES);

        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }

        this.getLayersInfo();
    },

    /**
     * APIMethod: updateLayerInfo
     * 修改服务端图层信息
     *
     * (start code)
     * var myGOIs = new SuperMap.GOIs({
     *      "url":url,
     *      "datasetName":"China_Town_P@China400",
     *      "updateLayerInfo":function(layerInfo){
     *           if(layerInfo&&layerInfo.style){
     *                layerInfo.style.markerSymbolID = 252217;
     *           }
     *           return layerInfo;
     *      }
     * });
     * (end)
     *
     * Parameters:
     * layerInfo - {Object} 图层信息对象。
     */
    updateLayerInfo: function (layerInfo) {
        var t = this;

        if(t.filter){
            layerInfo.displayFilter = t.filter;
        }
        if(t.style){
            for(var key in t.style){
                layerInfo.style[key] = t.style[key];
            }
        }
        return layerInfo;
    },

    /**
     * APIMethod: destroy
     * 销毁
     */
    destroy:function(){
        var t = this;

//        if(t.map){
//            if(t.markerLayer)t.map.removeLayer(t.markerLayer);
//            t.markerLayer = null;
//            if(t.utfgridLayer)t.map.removeLayer(t.utfgridLayer);
//            t.utfgridLayer = null;
//            if(t.tiledDynamicRESTLayer)t.map.removeLayer(t.tiledDynamicRESTLayer);
//            t.tiledDynamicRESTLayer = null;
//        }
        t.markerLayer = null;
        t.utfgridLayer = null;
        t.tiledDynamicRESTLayer = null;

        t.style = null;
        t.highlightIcon = null;
        t.transparentIcon = null;
        t.map = null;

        if(t.events){
            t.events.destroy();
            t.events = null;
        }

        t.eventListeners = null;

        if(t.getLayersInfoService){
            t.getLayersInfoService.destroy();
            t.getLayersInfoService = null;
        }

        for(var key in this){
            this[key] = null;
        }
    },

    /**
     * APIMethod: hide
     * 隐藏
     */
    hide:function(){
        var t = this;
        if(t.markerLayer){
            t.markerLayer.setVisibility(false);
        }
        if(t.utfgridLayer){
            t.utfgridLayer.setVisibility(false);
        }
        if(t.tiledDynamicRESTLayer){
            t.tiledDynamicRESTLayer.setVisibility(false);
        }
    },

    /**
     * APIMethod: show
     * 显示
     */
    show:function(){
        var t = this;
        if(t.markerLayer){
            t.markerLayer.setVisibility(true);
        }
        if(t.utfgridLayer){
            t.utfgridLayer.setVisibility(true);
        }
        if(t.tiledDynamicRESTLayer){
            t.tiledDynamicRESTLayer.setVisibility(true);
        }
    },

    /**
     * APIMethod: getLayers
     * 获取该类中的几个图层。
     */
    getLayers:function(){
        return [
            this.tiledDynamicRESTLayer,
            this.utfgridLayer,
            this.markerLayer
        ];
    },

    /**
     * APIMethod: setOpacity
     * 设置其中各图层的不透明度,取值[0-1]之间。
     *
     * Parameter:
     * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
     */
    setOpacity:function(opacity){
         if(this.tiledDynamicRESTLayer){
             this.tiledDynamicRESTLayer.setOpacity(opacity);
         }
         if(this.markerLayer){
             this.markerLayer.setOpacity(opacity);
         }
    },

    /**
     * Method: getLayersInfo
     * 获取图层信息
     */
    getLayersInfo:function(){
        var t = this;

        if(t.url && t.datasetName){
            t.getLayersInfoService = new SuperMap.REST.GetLayersInfoService(t.url);
            t.getLayersInfoService.events.on({
                "processCompleted":t.getLayerInfoCompleted,
                "processFailed":function(args){
                    t.events.triggerEvent('initializeFailed',{"msg":"获取图层信息失败","args":args});
                },
                "scope":t
            });
            t.getLayersInfoService.processAsync();
        }
        else{
            t.events.triggerEvent('initializeFailed',{"msg":"未设置url、datasetName"});
        }
    },

    /**
     * Method: getLayerInfoCompleted
     * 获取图层信息成功。
     *
     * Parameters:
     * getLayersInfoEventArgs - {SuperMap.REST.GetLayersInfoEventArgs} 获取图层信息服务事件数据类。
     */
    getLayerInfoCompleted: function (getLayersInfoEventArgs) {
        var t = this;
        if(t.datasetName){
            var result = getLayersInfoEventArgs.result;
            if (result) {
                {
                    var subLayers = result.subLayers;
                    if (subLayers) {
                        //此处做了优化，设置所有subLayers.layers会导致服务器解析很慢，大约生成临时图层800mm
                        //修改为传递给服务器一个图层之后，大约50mm
                        var layers = subLayers.layers;
                        var layer = null;
                        for (var j = 0; j < layers.length; j++) {
                            if(layers[j].name === t.datasetName){
                                if(layers[j].datasetInfo&&layers[j].datasetInfo.type){
                                    var type = layers[j].datasetInfo.type;
                                    if(type){
                                        type = type.toUpperCase();
                                        if(type==="LINE"||type==="REGION"){
                                            t.__isPoi = false;
                                        }
                                        else{
                                            t.__isPoi = true;
                                        }
                                    }
                                }
                                layers[j].visible = true;
                                layers[j].minScale = 0;
                                layers[j].maxScale = 0;
                                layers[j] = t.updateLayerInfo(layers[j]);
                                layer = layers[j];
                                break;
                            }
                        }
                        if(layer)
                        {
                            subLayers.layers = [layer];
                        }
                    }
                    var services = new SuperMap.REST.SetLayersInfoService(t.url, {
                        eventListeners: {
                            "processCompleted": t.setLayersInfoCompleted,
                            "processFailed": function(args){
                                t.events.triggerEvent('initializeFailed',{"msg":"设置图层信息失败","args":args});
                            },
                            "scope":t
                        }
                    });
                    services.processAsync(getLayersInfoEventArgs.result);
                }
            }
        }
    },

    /**
     * Method: setLayersInfoCompleted
     * 设置图层信息完成事件
     *
     * Parameters:
     * setLayersInfoEventArgs - {SuperMap.REST.SetLayersInfoEventArgs} 设置图层信息事件数据类
     */
    setLayersInfoCompleted: function (setLayersInfoEventArgs) {
        var t = this;
        var tempLayerID = setLayersInfoEventArgs.result.newResourceID;

        var params = {transparent: true, cacheEnabled: !!t.cacheEnabled, redirect: true, layersID: tempLayerID};

        var options = {maxResolution: "auto",useCanvas:false};
        if(t.resolutions){
            options.resolutions = t.resolutions;
        }
        if(t.scales){
            options.scales = t.scales;
        }
        if(t.dpi){
            options.dpi = t.dpi;
        }
        if(t.units){
            options.units = t.units;
        }
        if(t.datumAxis){
            options.datumAxis = t.datumAxis;
        }
        if(t.format){
            options.format = t.format;
        }
        if(t.projection){
            options.projection = t.projection;
        }

        //创建 TiledDynamicRESTLayer
        t.tiledDynamicRESTLayer = new SuperMap.Layer.TiledDynamicRESTLayer("templayer", t.url, params,options);
        t.events.triggerEvent('onTiledDynamicRESTLayerCreated',t.tiledDynamicRESTLayer);
        t.tiledDynamicRESTLayer.events.on({
            "layerInitialized": t.addTiledDynamicRESTLayer,
            "scope":t
        });
    },

    /**
     * Method: addTiledDynamicRESTLayer
     *  将临时图层加入到map对象
     */
    addTiledDynamicRESTLayer: function () {
        var t = this;

        var params = {
            layerName: t.datasetName,
            utfTileSize: 256,
            pixcell: t.pixcell,
            isUseCache: !!t.cacheEnabled
        };
        if(t.filter){
            params.filter = t.filter;
        }
        var options = {
            utfgridResolution: t.pixcell
        };
        if(t.projection){
            options.projection = t.projection;
        }
        options.maxExtent = t.tiledDynamicRESTLayer.getMaxExtent().clone();//ICL-524

        t.utfgridLayer = new SuperMap.Layer.UTFGrid("UTFGridLayer",t.url,params,options);
		t.utfgridLayer.layer = t.tiledDynamicRESTLayer;
        if(t.__isPoi!=null){
            t.utfgridLayer.__isPoi = t.__isPoi;
        }
        t.events.triggerEvent('onUtfgridLayerCreated',t.utfgridLayer);

        t.markerLayer = new SuperMap.Layer.Markers("Markers");
        t.events.triggerEvent('onMarkerLayerCreated',t.markerLayer);

        var layers = [t.tiledDynamicRESTLayer, t.utfgridLayer,t.markerLayer];

        t.events.triggerEvent('initialized',layers);
    },

    CLASS_NAME: "SuperMap.GOIs"
});
