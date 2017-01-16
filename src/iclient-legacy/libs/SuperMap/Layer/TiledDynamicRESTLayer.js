/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Layer.TiledDynamicRESTLayer
 * SuperMap iServer Java 6R 及以上分块动态 REST 图层， 用于对接 SuperMap iServer 的 REST 地图服务的分块动态栅格图层，有关 REST （REpresentational State Transfer，表述性状态转移）服务请参见 “SuperMap iServer Java 6R 帮助文档 "。
 *
 * Inherits from:
 *  - <SuperMap.CanvasLayer>
 */

SuperMap.Layer.TiledDynamicRESTLayer = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * Constant: DEFAULT_PARAMS
     * {Object} 设置到瓦片url请求上的参数的默认值。
     *  transparent（图层是否透明,默认为false）
     *  和cacheEnabled（是否使用服务端的缓存，默认为true）
     */
    DEFAULT_PARAMS: {
        //maxVisibleVertex: 360000,
        transparent: false,
        cacheEnabled: true
    },

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *layerInitialized* 初始化 TiledDynamicRESTLayer 时该图层发送获取地图
     * 状态的请求，根据响应信息初始化图层参数。当初始化完成后触发该事件，
     * 用户可以在该事件的响应函数中将该图层添加到地图中。例如：
     * (start code)
     *  //使用下面的方法将图层添加到map
     *  var layer = new SuperMap.Layer.TiledDynamicRESTLayer("layerName", layerURL, {transparent: true});
     *  layer.events.on({"layerInitialized": addLayer});
     *     function addLayer() {
     *      map.addLayer(layer);
     *      map.setCenter(new SuperMap.LonLat(0, 0), 0);
     *  }
     * (end)
     *
     * - *loadError* 初始化 TiledDynamicRESTLayer 时该图层发送获取地图
     * 状态的请求，根据响应信息初始化图层参数。如果初始化图层参数失败，触发该事件。
     */
    //EVENT_TYPES: ["layerInitialized"],
    //EVENT_TYPES: ["loadError"],

    /**
     * Property: prjStr
     * {String}
     * 投影键值串，在图层初始化完成时赋值。例如：prjCoordSys={"epsgCode":3857}
     * 内部使用，不公开
     */
    prjStr1: null,

    /**
     * Property: getmapstatusservice
     * {String}
     */
    getMapStatusService: null,

    /**
     * Property: viewBounds
     * {Object} 地图窗口显示区域的范围。
     */
    viewBounds: null,

    /**
     * Property: viewer
     * {Object} 用户显示视窗。
     */
    viewer: null,

    /**
     * Property: scale
     * {Number} 地图的显示比例尺。
     */
    scale: null,

    /**
     * APIProperty: dpi
     * {Number}图像分辨率，表示每英寸内的像素个数。
     *
     */
    dpi: null,

    /**
     * APIProperty: overlapDisplayed
     * {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为false。
     * 如果为true，则同一范围内的对象会直接压盖；如果为false则通过 overlapDisplayedOptions 控制对象不压盖显示 。
     */
    overlapDisplayed: false,

    /**
     * APIProperty: redirect
     * {Boolean} 是否重定向，HTTP 传输中的一个概念。如果为 true，则将请求重定向到图片的真实地址；
     * 如果为 false，则响应体中是图片的字节流。默认为 false，不进行重定向。缓存版本 5.0 不支持重定向。
     */
    redirect: false,

    /**
     * APIProperty: overlapDisplayedOptions
     * {<SuperMap.REST.OverlapDisplayedOptions>} 避免地图对象压盖显示的过滤选项，
     * 当 overlapDisplayed为 false 时有效，用来增强对地图对象压盖时的处理。
     */
    overlapDisplayedOptions: null,

    /**
     * Property: tilesets
     * {Object} 切片集列表
     */
    tilesets: null,

    /**
     * Property: tilesetsIndex
     * {Number} 当前切片在切片集中的index
     */
    tilesetsIndex: -1,
    tempIndex: -1,

    /**
     * Property: TilesVersionControl
     * {<SuperMap.Control.ChangeTilesVersion>} 与图层关联的版本切换控件
     */
    TilesVersionControl: null,

    /**
     * Constructor: SuperMap.Layer.TiledDynamicRESTLayer
     * 所有SuperMap iServer 6R 分块动态 REST 图层。
     * (start code)
     * // 向服务端发送请求获取后，获取透明、使用服务端缓存的图层，
     * // 通过options可以设置TiledDynamicRESTLayer的属性及其父类的属性
     * var layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", World_Map,
     *     {transparent: true, cacheEnabled:true}, {maxResolution:"auto"});
     *     (end)
     *
     * Parameters:
     * name - {String}  图层标识名称。
     * url - {Array(String) or String} 图层的服务地址，是数组也可以是单个url，前者支持多地图服务轮询出图，大大提高显示速度。
     * params - {Object} 设置到url上的可选参数。
     * options - {Object} 此类及其父类开放的属性，包括dpi、maxExtent、resolutions、scales、units、datumAxis六个参数，
     * 获取方式有两种：一是从服务端获取，二是用户自己设置得到，其中，对于units参数，如果用户设置了此参数，
     * 即使已经成功从服务端获取，但是依然会优先使用用户设置的units参数。
     * 当Layer的options设置了units参数，则用Layer的units计算dpi；
     * 如果options没有设置untis，此时会参照Map上的units计算dpi,
     * 此时需要注意的是，如果Layer是在平面坐标系下，Map的options必须设置untis，如果是地理坐标系的情况下可以不设置，
     * 系统默认为“degree”。
     *
     * Allowed params properties:
     * clipRegion - {<SuperMap.Geometry>} 地图显示裁剪的区域。
     * transparent - {Boolean} 图层是否透明，默认为 false，即不透明。
     * cacheEnabled - {Boolean} 是否使用服务端的缓存，默认为 true，即使用服务端的缓存。
     * layersID - {String} 需要进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合。如果此参数缺省则对全部图层进行切片。
     * layersID可以是临时图层创建时templayers的ID，如layersID=382139acf0，也可以是当前地图中的某些图层的ID编号。其中，当前地图图层ID的定义规则如下：
     * 1. 各级图层按照图层顺序自上而下从0开始编号；
     * 2. 冒号（:）前为顶级图层；
     * 3. 英文句号（.）表示其他各级图层间的从属关系；
     * 4. 英文逗号（,）表示图层间的分隔。
     * 例如：
     * 1. [0:0,1,2.0]表示顶级图层0下面的子图层：0、1及其下属所有子图层，和2下的子图层0；
     * 2. [1:1.2,2]表示顶级级图层1下面的子图层：1下的子图层2，和图层2及其下属所有子图层；
     * 3. 两个示例合并在一起则是：[0:0,1,2.0,1:1.2,2]。此外，[0,1,2,3]表示顶级图层0下面的图层0、1、2、3及所有子图层，[0:,1:,2:]表示顶级图层0、1、2及其所有子图层。
     * 4、当我们初始化图层之后还想改变图层显示时可以直接如下进行设置：
     * layer.params.layersID = "[0:0,1,7,11]"; //图层索引为0、1、7和11的显示，其他不显示
     * layer.redraw();
     * overlapDisplayedOptions - {<SuperMap.REST.OverlapDisplayedOptions>} 避免地图对象压盖显示的过滤选项，当 overlapDisplayed为 false 时有效，用来增强对地图对象压盖时的处理。默认值null。
     * overlapDisplayed - {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为false。
     * redirect - {Boolean} 是否重定向，HTTP 传输中的一个概念。如果为 true，则将请求重定向到图片的真实地址。缓存版本 5.0 不支持重定向。
     * 如果为 false，则响应体中是图片的字节流。默认为 false，不进行重定向。
     *
     * Allowed options properties:
     * resolutions - {Array} 分辨率数组。如果设置了dpi，resolutions和scales设置其一
     * scales - {Array} 比例尺数组。如果设置了dpi，resolutions和scales设置其一
     * dpi - {Number} 图像分辨率，表示每英寸内的像素个数。
     * units - {String} 地图坐标系统的单位。
     * datumAxis - {Number} 椭球体长半轴。
     * format - {String} 栅格图层图片格式、支持png、jpg、gif和bmp。
     * projection - {<SuperMap.Projection>} or {<String>} 创建图层时，在图层的 options 上设置当前图层默认的投影字符串。如“EPSG：900913”
     */
    initialize: function (name, url, params, options) {
        var me = this;
        SuperMap.CanvasLayer.prototype.initialize.apply(me, arguments);
        SuperMap.Util.applyDefaults(me.params, me.DEFAULT_PARAMS);
        me.events.addEventType("layerInitialized");
        me.events.addEventType("loadError");
        if (me.params.transparent) {
            if (me.format === "jpg") {
                me.format = SuperMap.Util.alphaHack() ? "gif" : "png";
            }
            if (me.format === "bmp") {
                me.format = SuperMap.Util.alphaHack() ? "bmp" : "png";
            }
        }
        if (typeof me.params.clipRegion !== "undefined") {
            if (me.params.clipRegion instanceof SuperMap.Geometry) {
                me.params.clipRegionEnabled = true;
                var sg = SuperMap.REST.ServerGeometry.fromGeometry(me.params.clipRegion);
                me.params.clipRegion = SuperMap.Util.toJSON(sg);
            } else {
                delete me.params.clipRegion;
            }
        }
        if (typeof me.params.layersID !== "undefined") {
            if (!me.params.layersID){
                delete me.params.layersID;
            }
        }
        if (me.params.redirect) {
            me.redirect = true;
        }

        //用户传Layer的地图单位
        if(me.units){
            me.units = me.units.toLowerCase();
        }

        if(me.dpi && me.maxExtent &&(me.resolutions || me.scales)) {
            //如果设置了dpi、maxExtent、resolutions或者是scales,则不需要向服务端发出请求获取图层信息
        }else if(!me.dpi && (!me.viewBounds || !me.viewer || !me.scale)) {
            //当在options中设置viewBounds 、viewer 、scale 、units 、datumAxis，则计算dpi
            if (!!SuperMap.isApp) {
                var layerContext = {
                    tile:me
                };

                /*window.plugins.localstoragemanager.getconfig(this.name,this.storageType,
                 function(layerContext){
                 return function(r){
                 layerContext.tile.getAppStatusSucceed(layerContext,r);
                 }
                 }(layerContext),
                 function(e){}
                 );*/
                cordova.exec(function(layerContext){
                        return function(r){
                            layerContext.tile.getAppStatusSucceed(layerContext,r);
                        }
                    }(layerContext), function(e){},
                    "LocalStoragePlugin","getconfig",
                    [this.name,this.storageType]
                );
            } else{
                var strServiceUrl = me.url;
                if (SuperMap.Util.isArray(url)) {
                    strServiceUrl = url[0];
                }
                var getMapStatusService = new SuperMap.REST.MapService(strServiceUrl,
                    {eventListeners: {processCompleted: me.getStatusSucceed, scope: me,
                        processFailed: me.getStatusFailed}, projection: me.projection});
                getMapStatusService.processAsync();
            }
        }
        // else if (me.viewBounds && me.viewer && me.scale) {
        // me.dpi = SuperMap.Util.calculateDpi(me.viewBounds, me.viewer, me.scale, me.units, me.datumAxis);
        // }
        if (me.projection) {
            if(typeof me.projection === "string") {
                me.projection = new SuperMap.Projection(me.projection);
            }

            var arr = me.projection.getCode().split(":");
            if (arr instanceof Array && arr.length === 2) {
                me.prjStr1 = "{\"epsgCode\":" + arr[1] + "}";
            }
        }
        // if (me.projection) {        
        // var arr = me.projection.getCode().split(":");
        // if (arr instanceof Array && arr.length === 2) {
        // me.prjStr1 = "{\"epsgCode\":" + arr[1] + "}";
        // }
        // }
    },

    getAppStatusSucceed:function(layerContext,r) {
        var mapStatus = r.json;
        var me = this;
        if (mapStatus !== "false")
        {
            mapStatus = eval('(' + mapStatus + ')');
            var bounds = mapStatus.bounds;
            bounds = new SuperMap.Bounds(bounds.left,bounds.bottom,bounds.right,bounds.top);
            me.maxExtent = bounds;
            if(mapStatus.dpi){
                me.dpi = mapStatus.dpi;
                me.options.scales = mapStatus.scales;
                me.units = mapStatus.unit;
                me.datumAxis = 6378137;
            }
            else{
                var viewBounds = mapStatus.viewBounds,
                    coordUnit = mapStatus.coordUnit,
                    viewer = mapStatus.viewer,
                    scale = mapStatus.scale,
                    datumAxis = mapStatus.datumAxis;
                //将jsonObject转化为SuperMap.Bounds，用于计算dpi。
                viewBounds = new SuperMap.Bounds(viewBounds.left,viewBounds.bottom,viewBounds.right,viewBounds.top);
                me.viewBounds = viewBounds;

                viewer = new SuperMap.Size(viewer.rightBottom.x, viewer.rightBottom.y);
                me.viewer = viewer;
                me.scale = scale;

                coordUnit = coordUnit.toLowerCase();
                me.units = me.units || coordUnit;
                me.datumAxis = datumAxis;

                me.dpi = SuperMap.Util.calculateDpi(viewBounds, viewer, scale, me.units, datumAxis);
            }
            me.events.triggerEvent('layerInitialized',me);
        }else{
            var strServiceUrl = me.url;
            if (SuperMap.Util.isArray(me.url)) {
                strServiceUrl = me.url[0];
            }
            var getMapStatusService = new SuperMap.REST.MapService(strServiceUrl,
                {eventListeners:{processCompleted: me.getStatusSucceed, scope: me,
                    processFailed: me.getStatusFailed}, projection: me.projection});
            getMapStatusService.processAsync();
        }
    },

    /**
     * Method: setMapStatus
     * 计算Dpi，设置maxExtent。
     */
    getStatusSucceed: function(mapStatus) {
        var me = this;

        if (mapStatus.result){
            // 当用户未设置scales，visibleScales存在值、visibleScalesEnable为true时,使layer.scales=visibleScales。
            var visScales = null;
            var orResult = mapStatus.originResult;
            if(orResult){
                visScales = orResult.visibleScales;
                if(!me.scales && orResult.visibleScalesEnabled && (visScales &&visScales.length&&visScales.length>0))
                {
                    this.options.scales=visScales;
                }
            }

            var mapStatus = mapStatus.result;
            var bounds = mapStatus.bounds, viewBounds = mapStatus.viewBounds,
                coordUnit = mapStatus.coordUnit,
                viewer = mapStatus.viewer,
                scale = mapStatus.scale,
                datumAxis = mapStatus.datumAxis,
                projCode = mapStatus.prjCode;
            //将jsonObject转化为SuperMap.Bounds，用于计算dpi。
            viewBounds = new SuperMap.Bounds(viewBounds.left,viewBounds.bottom,viewBounds.right,viewBounds.top);
            me.viewBounds = viewBounds;

            viewer = new SuperMap.Size(viewer.rightBottom.x, viewer.rightBottom.y);
            me.viewer = viewer;
            me.scale = scale;

            bounds = new SuperMap.Bounds(bounds.left,bounds.bottom,bounds.right,bounds.top);
            me.maxExtent = bounds;

            coordUnit = coordUnit.toLowerCase();
            me.units = me.units || coordUnit;
            me.datumAxis = datumAxis;

            me.dpi = SuperMap.Util.calculateDpi(viewBounds, viewer, scale, me.units, datumAxis);
            if(!me.projection&&projCode){
                me.projection = "EPSG:" + projCode;
            }
            if (!!SuperMap.isApp){
                //window.plugins.localstoragemanager.savaconfig(this.name,mapStatus);
                cordova.exec(function(){}, function(e){}, "LocalStoragePlugin","savaconfig", [this.name,mapStatus]);
            }

            me.events.triggerEvent('layerInitialized',me);
        }
    },

    /**
     * Method: getStatusFailed
     * 获取图层状态失败
     */
    getStatusFailed: function(failedMessage) {
        var me = this;
        me.events.triggerEvent('loadError',failedMessage);
    },


    /**
     * APIMethod: destroy
     * 解构TiledDynamicRESTLayer类，释放资源。
     */
    destroy: function () {
        var me = this;
        if(me.getMapStatusService) {
            me.getMapStatusService.events.listeners = null;
            me.getMapStatusService.destroy();
        }
        me.viewBounds = null;
        me.viewer = null;
        me.scale = null;

        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
        me.DEFAULT_PARAMS = null;
    },

    /**
     * APIMethod: clone
     * 创建当前图层的副本。
     *
     * Parameters:
     * obj - {Object}
     *
     * Returns:
     * {<SuperMap.Layer.TiledDynamicRESTLayer>}  新的图层。
     */
    clone: function (obj) {
        var me = this;
        if (obj == null) {
            obj = new SuperMap.Layer.TiledDynamicRESTLayer(
                me.name, me.url, me.params, me.getOptions());
        }

        obj = SuperMap.CanvasLayer.prototype.clone.apply(me, [obj]);
        obj._timeoutId = null;

        return obj;
    },

    /**
     * Method: getTileUrlByBounds
     * 获取瓦片的URL。
     *
     * Parameters:
     * bounds - {SuperMap.Bounds} 表示瓦片的显示范围
     *
     * Returns
     * {String} 瓦片的 URL 。
     */
    getTileUrlByBounds:function(bounds){
        var me = this,
            newParams,
            tileSize = me.tileSize,
            zoom = me.map.getZoom(),
            scale = me.scales[zoom];
        if(!scale) {
            scale = this.getScaleForZoom(zoom);
        }
        if(this.map && this.map.baseLayer && this !== this.map.baseLayer){
            var baseScale = this.map.baseLayer.getScaleForZoom(zoom);
            var PRECISION = [1e-9,2e-9,4e-9,8e-9,1.6e-8,3.2e-8,6.4e-8,1.28e-7,2.56e-7,5.12e-7,1.024e-6,2.048e-6,4.096e-6,8.192e-6,1.6384e-5,3.2768e-5,6.5536e-5,1.31072e-4];
            var idx = zoom > PRECISION.length ? PRECISION.length : zoom;
            if(baseScale &&Math.abs(baseScale-scale) > PRECISION[idx]){
                scale = baseScale;
            }
        }
        newParams = {
            "width" : tileSize.w,
            "height" : tileSize.h,
            "viewBounds": "{\"leftBottom\":{\"x\":" + bounds.left + ",\"y\":" + bounds.bottom + "},\"rightTop\":{\"x\":" + bounds.right + ",\"y\":" + bounds.top + "}}",
            "scale" : scale,
            //hansj，忽略后面的注释//由于服务器关于缓存有问题，所以redirect先设为false。
            "redirect" : me.redirect
        };
        if (SuperMap.Credential.CREDENTIAL) {
            newParams[SuperMap.Credential.CREDENTIAL.name] = SuperMap.Credential.CREDENTIAL.getValue();
        }
        if (!me.params.cacheEnabled) {
            newParams.t = new Date().getTime();
        }
        if (typeof me.params.layersID !== "undefined" && typeof newParams.layersID === "undefined") {
            if (me.params.layersID && me.params.layersID.length > 0){
                newParams.layersID = me.params.layersID;
            }
        }

        if (me.prjStr1) {
            newParams.prjCoordSys = me.prjStr1;
        }

        return me.getFullRequestString(newParams);
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
            newParams,
            tileSize = me.tileSize,
            scale = me.scales[xyz.z];
        //在没有设置任何投影的情况下，比例尺可能大于1，为了提高容错能力，注释掉比例尺矫正函数。 maoshuyu
        //scale = SuperMap.Util.normalizeScale(scale);
        if(!scale)scale = this.getScaleForZoom(xyz.z);
        //对比本图层与底图的比例尺，如果跟底图的差距太大则选用底图的比例尺，保证底图与叠加图层的比例尺一致
        if(this.map && this.map.baseLayer && this !== this.map.baseLayer){
            var baseScale = this.map.baseLayer.getScaleForZoom(xyz.z);
            var PRECISION = [1e-9,2e-9,4e-9,8e-9,1.6e-8,3.2e-8,6.4e-8,1.28e-7,2.56e-7,5.12e-7,1.024e-6,2.048e-6,4.096e-6,8.192e-6,1.6384e-5,3.2768e-5,6.5536e-5,1.31072e-4];
            var idx = xyz.z > PRECISION.length ? PRECISION.length : xyz.z;
            if(baseScale &&Math.abs(baseScale-scale) > PRECISION[idx]){
                scale = baseScale;
            }
        }
        newParams = {
            "width" : tileSize.w,
            "height" : tileSize.h,
            "x" : xyz.x,
            "y" : xyz.y,
            "scale" : scale,
            //hansj，忽略后面的注释//由于服务器关于缓存有问题，所以redirect先设为false。
            "redirect" : me.redirect
        };
        if (SuperMap.Credential.CREDENTIAL) {
            newParams[SuperMap.Credential.CREDENTIAL.name] = SuperMap.Credential.CREDENTIAL.getValue();
        }
        if (!me.params.cacheEnabled) {
            newParams.t = new Date().getTime();
        }
        if (typeof me.params.layersID !== "undefined" && typeof newParams.layersID === "undefined") {
            if (me.params.layersID && me.params.layersID.length > 0){
                newParams.layersID = me.params.layersID;
            }
        }

        if (me.prjStr1) {
            newParams.prjCoordSys = me.prjStr1;
        }

        return me.getFullRequestString(newParams);
    },

    /**
     * Method: getFullRequestString
     * 将参数与URL合并，获取完整的请求地址。（重写基类方法）
     *
     * Parameters:
     * newParams - {Object}
     * altUrl - {String}
     *
     * Returns:
     * {String}
     */
    getFullRequestString:function(newParams, altUrl) {
        var me = this,
            url = altUrl || this.url,
            allParams, paramsString, urlParams;
        allParams = SuperMap.Util.extend({}, me.params);
        allParams = SuperMap.Util.extend(allParams, newParams);

        if(allParams.overlapDisplayed === false) {
            me.overlapDisplayedOptions = allParams.overlapDisplayedOptions;
            me.overlapDisplayed = allParams.overlapDisplayed;
            delete allParams.overlapDisplayed;
            delete allParams.overlapDisplayedOptions;
        }
        paramsString = SuperMap.Util.getParameterString(allParams);

        if (SuperMap.Util.isArray(url)) {
            var s = "" + newParams.x + newParams.y;
            url = me.selectUrl(s, url);
        }
        if(me.singleTile) {
            url = url + "/image." + me.format;
        } else {
            url = url + "/tileImage." + me.format;
        }
        urlParams = SuperMap.Util.upperCaseObject(SuperMap.Util.getParameters(url));
        for (var key in allParams) {
            if(key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = SuperMap.Util.getParameterString(allParams);
        if( me.tileOrigin ){
            paramsString = paramsString + "&origin={\"x\":" + me.tileOrigin.lon + "," + "\"y\":" + me.tileOrigin.lat + "}";
        }
        if(me.overlapDisplayed === false) {
            paramsString += "&overlapDisplayed=false";
            if(me.overlapDisplayedOptions){
                paramsString += "&overlapDisplayedOptions="+ me.overlapDisplayedOptions.toString();
            }
        }else{
            paramsString += "&overlapDisplayed=true";
        }
        return SuperMap.Util.urlAppend(url, paramsString);
    },

    /**
     * Method: mergeNewParams
     * 动态修改URL的参数。(重写基类方法)
     *
     * Parameters:
     * newParams - {Object}
     *
     * Returns
     * {Boolean} 修改是否成功。
     */
    mergeNewParams: function (newParams) {
        if(this.useCanvas){
            this.clearMemoryImg();
        }
        if (typeof (newParams.clipRegion) !== "undefined") {
            if (newParams.clipRegion instanceof SuperMap.Geometry) {
                newParams.clipRegionEnabled = true;
                var sg = SuperMap.REST.ServerGeometry.fromGeometry(newParams.clipRegion);
                newParams.clipRegion = SuperMap.Util.toJSON(sg);
            } else {
                delete newParams.clipRegion;
            }
        }
        return SuperMap.Layer.HTTPRequest.prototype.mergeNewParams.apply(this, [newParams]);
    },

    /**
     * Method: lastTilesVersion
     * 请求上一个版本切片，并重新绘制。
     */
    lastTilesVersion: function(){
        this.tempIndex = this.tilesetsIndex-1;
        this.changeTilesVersion();
    },

    /**
     * Method: lastTilesVersion
     * 请求下一个版本切片，并重新绘制。
     */
    nextTilesVersion: function(){
        this.tempIndex = this.tilesetsIndex+1;
        this.changeTilesVersion();
    },

    /**
     * Method: changeTilesVersion
     * 切换到某一版本的切片，并重绘。
     * 通过this.tempIndex保存需要切换的版本索引
     */
    changeTilesVersion: function(){
        var me = this;
        //切片版本集信息是否存在
        if(me.tilesets !== null) {
            if(me.tempIndex !== me.tilesetsIndex && this.tempIndex>-1)
                if(me.tilesets){
                    //检测index是否可用
                    var tileVersions = me.tilesets.tileVersions;
                    if(tileVersions && me.tempIndex < tileVersions.length && me.tempIndex >= 0){
                        var name = tileVersions[me.tempIndex].name;
                        var result = me.mergeNewParams({tileversion: name});
                        if(result && me.TilesVersionControl){
                            me.tilesetsIndex = me.tempIndex;
                            var desc = tileVersions[this.tempIndex].desc;
                            this.TilesVersionControl.setInf(desc);
                        }
                    }
                }
        }else{
            //版本信息为空，重新查询，查询成功继续跳转到相应的版本 this.this.tempIndex 的作用
            me.getTilesetsInf();
        }
    },

    /**
     * Method: getTilesets
     * 获取当前图层切片版本列表,获取成功后存储当前的切片版本信息 并切换多相应的版本
     */
    getTilesetsInf: function(){
        var me = this;
        var tilesetsService = new SuperMap.REST.TilesetsService(me.url,{eventListeners:{
            "processCompleted": getTilesInfSucceed, scope: me
        }});
        tilesetsService.processAsync();

        //查询成功
        function getTilesInfSucceed(inf){
            me.tilesets = inf.result;
            me.changeTilesVersion();
            if(me.TilesVersionControl) {
                me.TilesVersionControl.setTileWidth();
            }
        }
    },

    CLASS_NAME: "SuperMap.Layer.TiledDynamicRESTLayer"
});
