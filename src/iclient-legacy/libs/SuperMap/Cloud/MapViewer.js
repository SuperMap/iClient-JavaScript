/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Cloud.js
 */

/**
 * Class: SuperMap.Cloud.MapViewer
 * iportal或者isupermap的地图展示类，只需要url地址和地图id，就可以在自己的页面上创建一幅iportal或者isupermap的公开地图
 */
SuperMap.Cloud.MapViewer=SuperMap.Class({
    /**
     * Property: isFirstPreview
     * {boolean} 是否为第一次预览mapviewer的地图，默认为true
     */
    isFirstPreview:null,
    /**
     * Property: url
     * {String} 地图浏览对象的根地址
     * */
    url:null,

    /**
     * Property: actived
     * {Boolean} 状态位，用判断此对象是否已失效，是的话就阻止回调函数进行回调
     * */
    actived:null,

    /**
     * Property: container
     * {String|DOMElement} 地图容器DOM元素或者其id
     * */
    container:null,

    /**
     * APIProperty: map
     * {<SuperMap.Map>} mapviewer的地图对象
     * */
    map:null,

    /**
     * APIProperty: baseLayer
     * {<SuperMap.Layer>} 地图的底图图层
     * */
    baseLayer:null,

    /**
     * APIProperty: modifyFeatureVectorLayer
     * {<SuperMap.Layer.Vector>} 用于修改矢量要素的临时图层，修改前将要修改的要素放到此图层里面进行修改，
     * 修改完后再放回原图层进行显示
     * */
    modifyFeatureVectorLayer:null,

    /**
     * APIProperty: layers
     * {Array<SuperMap.Layer>} 在MapViewer中创建的图层数组（不包括modifyFeatureVectorLayer和用户自定义图层）
     * */
    layers:null,

    /**
     * Property: layerCounter
     * {Number} 图层计数器，用于统计未创建完成的图层数
     * */
    layerCounter:0,

    /**
     * APIProperty: selectCtrl
     * {<SuperMap.Control.SelectFeature>} MapViewer自带的要素选择控件
     * */
    selectCtrl:null,

    /**
     * APIProperty: modifyFeatureCtrl
     * {<SuperMap.Control.ModifyFeature>} MapViewer自带的要素修改控件
     * */
    modifyFeatureCtrl:null,

    /**
     * Property: mapInfo
     * {Object} 地图信息对象，保存比如center,level,bounds等信息
     * */
    mapInfo:null,

    /**
     * APIProperty: displayCoords
     * {Boolean} 是否添加鼠标坐标显示控件，默认为false
     * */
    displayCoords:false,

    hasBaseLayer:null,

    mapIds: null,

    /**
     * Property: EVENT_TYPES
     * {Array} 事件数据
     * */
    EVENT_TYPES: ['loadMapError',"baselayerInitialized","layersInitialized","markerClicked","featureSelected","featureUnSelected","featureEditing","featureEdited"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 事件管理器.
     *
     * 支持事件类型:
     * loadMapError - 地图加载失败。
     * baselayerInitialized - 当底图加载完成后触发此事件。
     * layersInitialized - 当所有的图层加载完成触发此事件。
     * markerClicked - 当Marker图层上的marker被点击时触发此事件。
     * featureSelected - 当被设置到SelectCtr上的Vector里要素被选择时的时触发此事件。
     * featureUnSelected - 当被设置到SelectCtr上的Vector里要素被取消选择时的时触发此事件。
     * featureEditing - 当modifyFeatureVectorLayer的要素被编辑时触发此事件。
     * featureEdited - 当modifyFeatureVectorLayer的要素被编辑完成触发此事件。
     *
     * (start code)
     * //例如点击marker弹出popup
     * viewer.events.on({
     *    "markerClicked":openInfoWin,
     *    "scope": viewer
     * });
     *  var popup;
     * function openInfoWin(marker){
     *     var lonlat = marker.getLonLat();
     *     var attributes=marker.attributes;
     *     var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
     *     contentHTML += "<div>"+attributes.description+"</div></div>";
     *     if(popup){
     *          this.map.removePopup(popup);
     *          popup.destroy();
     *          popup=null;
     *      }
     *
     *     popup = new SuperMap.Popup.FramedCloud(attributes.title,new SuperMap.LonLat(lonlat.lon,lonlat.lat),null,contentHTML,null,true);
     *    this.map.addPopup(popup);
     * }
     * (end)
     */
    events:null,

    /**
     * Property: reOrderLayer
     * {Function} 用于保存重排序图层顺序的函数
     * */
    reOrderLayer:null,

    /**
     * Constructor: SuperMap.Cloud.MapViewer
     * iportal或者isupermap的地图展示类，只需要url地址和地图id，就可以在自己的页面上创建一幅iportal或者isupermap的公开地图
     *
     * (start code)
     *  var url="http://www.isupermap.com";
     *  var viewer=new SuperMap.Cloud.MapViewer(url,"map");
     *  viewer.previewMapById(14);
     * (end)
     *
     * Parameters:
     * url - {String} iportal或者isupermap的url。
     * container - {String|DOMElement}  地图容器DOM元素或者其id。
     * options - {Object} 可选参数，用于批量设置MapViewer对象的相应属性,比如key
     * */
    initialize:function(url,container,options){
        var end = url.substr(url.length - 1, 1);
        this.isOnline = url.indexOf('supermapol.com');
        this.url=url+(end==="/"?"apps/viewer/":"/apps/viewer/");
        SuperMap.Util.extend(this, options);
        this.setContainer(container);
        this.events = new SuperMap.Events(this, null,
            this.EVENT_TYPES);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        var key = options && options.key;
        //创建map,并添加一些必要的控件
        this.createMap(container,key);
        this.isFirstPreview = true;
        this.hasBaseLayer = false;
        this.actived=true;
        this.mapIds = [];
    },

    /**
     * APIMethod: setContainer
     * 设置mapviewer对象的容器
     *
     * Parameters:
     * container - {String|DOMElement}  地图容器DOM元素或者其id。
     * */
    setContainer:function(container){
        this.container=container&&SuperMap.Util.getElement(container);
    },

    /**
     * APIMethod: destroy
     * 销毁MapViewer对象
     * */
    destroy:function(){
        this.map.destroy();
        for(var lindex= 0,len=this.layers.length;lindex<len;lindex++){
            var layer=this.layers[lindex];
            layer.destroy();
        }
        this.actived=null;
        this.url=null;
        this.container=null;
        this.map=null;
        this.mapInfo=null;
        this.baseLayer=null;
        this.selectCtrl=null;
        this.modifyFeatureCtrl=null;
        this.modifyFeatureVectorLayer=null;
        this.layers=null;
        this.layerCounter=null;
        this.displayCoords=null;
        if (this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.events=null;
        this.mapIds = null;
    },

    /**
     * APIMethod: previewMapById
     * 根据地图id来生成地图
     *
     * Parameters:
     * mapid - {Number} 地图id
     * key - {String} [可选参数]地图所需要的key
     * container - {String|DOMElement}  [可选参数]地图容器DOM元素或者其id。
     * */
    previewMapById:function(mapid,key,container){
        var url;
        this.mapIds.push(mapid);
        if(this.isOnline && key){
            url = this.url+ mapid +'/share.json?key='+key;
        }else{
            url = this.url + mapid +".json";
        }
        var isInTheSameDomain=SuperMap.Util.isInTheSameDomain(url);
        var that=this;
        if(!isInTheSameDomain){
            url=url.replace(/.json/,".jsonp");
        }
        if(!this.isFirstPreview){
            this.destroyMap();
        }
        this.isFirstPreview = false;
        //创建map,并添加一些必要的控件
        this.createMap(container,key);
        SuperMap.Util.committer({
            url:url,
            isInTheSameDomain:isInTheSameDomain,
            method:"GET",
            success:function(isInTheSameDomain){
                return function(result){
                    var jsonObj = isInTheSameDomain?new SuperMap.Format.JSON().read(result.responseText):result;
                    if(!jsonObj||!that.actived){
                        return;
                    }
                    this.previewMapByJson(jsonObj,key,container,true);
                }
            }(isInTheSameDomain),
            failure:function(err){
                if(!that.actived){
                    return;
                }
                that.events.triggerEvent("loadMapError",that);
            },
            scope:this
        });
        return this;
    },

    /**
     * APIMethod: previewMapByJson
     * 根据地图的json数据来生成地图
     *
     * Parameters:
     * jsonObj - {Object} 地图json数据，由用户根据地图的url地址请求得到
     * key - {String} [可选参数]地图所需要的key
     * container - {String|DOMElement}  [可选参数]地图容器DOM元素或者其id。
     * */
    previewMapByJson:function(jsonObj,key,container,isMapCreated){
        var mapId = this.mapIds[this.mapIds.length - 1];
        if(!!mapId && mapId == jsonObj.id) {
            this.mapIds.length = 0;
        } else {
            return;
        }
        if(!jsonObj){
            return;
        }
        if(!isMapCreated){
            this.destroyMap();
            //创建map,并添加一些必要的控件
            this.createMap(container,key);
        }
        //所有图层加载完成后重排序图层
        this.reOrderLayer=function(layers){
            if(!this.actived){
                return;
            }
            for(var i= 0,len=layers.length;i<len;i++){
                var layer=layers[i],
                    _originIndex=layer._originIndex;
                if(_originIndex!==undefined){
                    this.map.setLayerIndex(layer,_originIndex);
                    delete layer._originIndex;
                }
            }
            if(this.modifyFeatureVectorLayer){
                this.map.setLayerIndex(this.modifyFeatureVectorLayer,len);
            }
        };
        //注册'layersInitialized'事件，以在所有图层加载完成后重排序图层
        this.events.on({"layersInitialized":this.reOrderLayer,"scope":this});
        var layers=jsonObj.layers;
        this.mapInfo=jsonObj;
        this.createLayersByJson(layers);
        return this;
    },

    /**
     * Method: createLayerByJson
     * 根据请求回来的地图信息中的图层信息来创建图层
     * */
    createLayersByJson:function(jsonObj){
        if(!SuperMap.Util.isArray(jsonObj)){
            return;
        }
        if(jsonObj.length===0){
            return;
        }
        var map=this.createMap();
        this.layers=[];
        var layerQueue=[];
        var len=this.layerCounter=jsonObj.length;
        for(var i= 0;i<len;i++){
            var layerInfo=jsonObj[i];
            layerInfo["_originIndex"]=i;
            var layerType=layerInfo.layerType=layerInfo.layerType||"BASE_LAYER";
            var type=layerInfo.type;
            if(layerType!=="BASE_LAYER"){
                //如果图层不是底图，则先加到图层队列里面等待底图完成后再处理
                layerQueue.unshift(layerInfo);
                if(this.hasBaseLayer){
                    //底图加载完成后开始处理图层队列里的图层
                    this.createLayerByQueue(layerQueue);
                }
                continue;
            }else{
                layerInfo.isBaseLayer=true;
            }
            //创建底图
            var layer, center=this.mapInfo.center||layerInfo.center,
                level=this.mapInfo.level||layerInfo.level,
                bounds=this.mapInfo.bounds||layerInfo.bounds;
            //假如是'SUPERMAP_REST'或者'SUPERMAP_REST_VECTOR'图层，则采用异步的方法来创建图层
            if(type.indexOf("SUPERMAP_REST")>-1){
                layer=this.asynCreateLayer(type,layerInfo,function(layer){
                    if(!this.actived){
                        return;
                    }
                    layer && this.addBaseLayer2Map(map,layer,center,level,bounds,layerQueue);
                },this);
            }else{
                layer=this.createLayer(type,layerInfo);
                layer && this.addBaseLayer2Map(map,layer,center,level,bounds,layerQueue);
            }
            layer["_originIndex"]=layerInfo["_originIndex"];
        }
    },

    /**
     * Method: addBaseLayer2Map
     * 在底图创建完成后将其添加到map中，同时设置map的中心和初始显示级别，
     * 同时对添加时map的图层进行计数
     * */
    addBaseLayer2Map:function(map,layer,center,level,bounds,layerQueue){
        map.addLayer(layer);
        this.layers.push(layer);
        this.counter();
        this.setCenterByOption(center,level,bounds);
        //底图加载完成后开始处理图层队列里的图层
        this.createLayerByQueue(layerQueue);
        this.hasBaseLayer = true;
        this.events.triggerEvent("baselayerInitialized",layer);
    },

    /**
     * Method: setCenterByOption
     * 设置地图的中心点和显示级别
     * */
    setCenterByOption:function(center,level,bounds){
        var map=this.createMap();
        if (center && center.x!=null &&center.y!=null && level > -1) {
            map.setCenter(new SuperMap.LonLat(center.x, center.y), level);
        } else if (bounds instanceof SuperMap.Bounds) {
            map.zoomToExtent(bounds);
        } else if(bounds){
            bounds=new SuperMap.Bounds(bounds.left,bounds.bottom,bounds.right,bounds.top);
            map.zoomToExtent(bounds);
        }else{
            map.zoomToMaxExtent();
        }
    },

    /**
     * Method: counter
     * 每将一个图层添加到map时，计数一次，直到所有的图层添加完毕，则触发layersInitialized事件
     * */
    counter:function(){
        this.layerCounter--;
        if(this.layerCounter===0){
            this.events.triggerEvent("layersInitialized",this.layers);
        }
    },

    /**
     * Method: createMap
     * 创建地图和相关的控件
     * */
    createMap:function(key,container){
        var map=this.map;
        container=container&&SuperMap.Util.getElement(container)||this.container;
        this.actived=true;
        var that=this;
        if(!map){
            if(key){
                SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(key,'key');
            }
            var selectCtrl =this.selectCtrl= new SuperMap.Control.SelectFeature(new SuperMap.Layer.Vector(), {
                onSelect: function(){
                    that.events.triggerEvent("featureSelected",arguments);
                },
                onUnselect: function(){
                    that.events.triggerEvent("featureUnSelected",arguments);
                },
                repeat: true
            });
            var modifyFeatureVectorLayer=this.modifyFeatureVectorLayer=new SuperMap.Layer.Vector("modify Feature vector layer",{
                displayInLayerSwitcher:false
            });
            var modifyFeatureCtrl =this.modifyFeatureCtrl= new SuperMap.Control.ModifyFeature(modifyFeatureVectorLayer, {
                mode: SuperMap.Control.ModifyFeature.RESHAPE | SuperMap.Control.ModifyFeature.DRAG
            });
            modifyFeatureVectorLayer.events.on({
                "featuremodified": function(){
                    that.events.triggerEvent("featureEditing",arguments);
                }
            });
            modifyFeatureVectorLayer.events.on({
                "afterfeaturemodified": function(){
                    that.events.triggerEvent("featureEdited",arguments);
                }
            });
            map =this.map= new SuperMap.Map(container, {
                controls: [
                    new SuperMap.Control.ScaleLine(),
                    new SuperMap.Control.Zoom(),
                    new SuperMap.Control.LayerSwitcher(),
                    new SuperMap.Control.Navigation({
                        dragPanOptions: {
                            enableKinetic: true
                        }
                    }), selectCtrl, modifyFeatureCtrl]
            });
            if (SuperMap.Browser.name==="msie"&&SuperMap.Browser.version>=9) {
                map.addControl(new SuperMap.Control.OverviewMap({maximized: false}));
            }
            if (this.displayCoords) {
                map.addControl(new SuperMap.Control.MousePosition());
            }
            selectCtrl.activate();
            map.addLayer(modifyFeatureVectorLayer);
        }
        return map;
    },

    /**
     * APIMethod: destroyMap
     * 销毁图层及相关控件，并移除所有图层加载完成事件的监听
     * */
    destroyMap:function(){
        this.actived=null;
        if(this.events) {
            this.eventListeners&&this.events.un(this.eventListeners);
            this.events.un({"layersInitialized":this.reOrderLayer});
        }
        this.reOrderLayer=null;
        this.selectCtrl&&this.selectCtrl.destroy();
        this.selectCtrl=null;
        this.modifyFeatureVectorLayer&&this.modifyFeatureVectorLayer.destroy();
        this.modifyFeatureVectorLayer=null;
        this.modifyFeatureCtrl&&this.modifyFeatureCtrl.destroy();
        this.modifyFeatureCtrl=null;
        this.map&&this.map.destroy();
        this.map=null;
    },

    /**
     * Method: asynCreateLayer
     * 异步创建图层，仅当图层为'SUPERMAP_REST'和'SUPERMAP_REST_VECTOR'类型的时候用到
     * */
    asynCreateLayer:function(type,layerInfo,callback,scope){
        scope=scope||this;
        var layer;
        if(type==="SUPERMAP_REST"){
            layer=this.createTiledLayer(layerInfo,callback,scope);
        }else if(type==="SUPERMAP_REST_VECTOR"){
            layer=this.createTiledVectorLayer(layerInfo,callback,scope);
        }else{
            throw new Error('unSupported Layer Type');
        }
        return layer;
    },

    /**
     * Method: createLayer
     * 同步方式创建图层并返回
     * */
    createLayer:function(type,layerInfo){
        var layer;
        switch(type){
            case "TIANDITU_VEC":
            case "TIANDITU_IMG":
            case "TIANDITU_TER":
                layer=this.createTiandituLayer(layerInfo);
                break;
            case "BAIDU":
                layer=this.createBaiduLayer(layerInfo);
                break;
            case 'BING':
                layer = this.createBingMap(layerInfo);
                break;
            case "WMS":
                layer=this.createWmsLayer(layerInfo);
                break;
            case "WMTS":
                layer=this.createWmtsLayer(layerInfo);
                break;
            case "CLOUD":
                layer=this.createCloudLayer(layerInfo);
                break;
            case "MARKER_LAYER":
                layer=this.createMarkerLayer(layerInfo);
                if(layer){
                    this.addMarkers2Layer(layerInfo,layer);
                }
                break;
            case "FEATURE_LAYER":
                if(layerInfo.identifier=="ANIMATORVECTOR"){
                    layer=this.createAnimatorVectorLayer(layerInfo);
                }else{
                    layer=this.createVectorLayer(layerInfo);
                    if(layer){
                        this.addFeature2Layer(layerInfo,layer);
                    }
                }
                break;
            default:
                throw new Error('unSupported Layer Type');
                break;
        }
        return layer;
    },

    /**
     * Method: createLayerByQueue
     * 循环取出图层队列的所有图层信息来创建地图图层
     * */
    createLayerByQueue:function(queue){
        var map=this.createMap();
        while(queue.length>0){
            var layer;
            var layerInfo=queue.pop();
            var layerType=layerInfo.layerType;
            var type=layerInfo.type;
            if(layerType!=="BASE_LAYER"&&layerType!=="OVERLAY_LAYER") {
                type = layerType;
            }
            if(type.indexOf("SUPERMAP_REST")>-1){
                layer=this.asynCreateLayer(type,layerInfo,addLayer2Map,this);
            }else{
                layer=this.createLayer(type,layerInfo);
                addLayer2Map.call(this,layer);
            }
            layer["_originIndex"]=layerInfo["_originIndex"];
        }

        //将非底图图层添加到map中，同时计数
        function addLayer2Map(layer){
            if(!this.actived){
                return;
            }
            map.addLayer(layer);
            this.layers.push(layer);
            this.counter();
        }
    },

    /**
     * Method: createTiandituLayer
     * 创建天地图图层
     *
     */
    createTiandituLayer:function(layerInfo){
        var title = layerInfo.title,
            isLabel = (layerInfo.layerType === 'OVERLAY_LAYER'),
            url = layerInfo.url,
            opacity=layerInfo.opacity,
            layerType = layerInfo.type.split('_')[1].toLowerCase(),
            isVisible = layerInfo.isVisible,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode;
        var tdtLayer = new SuperMap.Layer.Tianditu({
            name: title,
            url: url,
            layerType: layerType,
            isLabel: isLabel,
            projection: "EPSG:" + epsgCode,
            opacity:opacity,
            visibility:isVisible
        });
        if (isLabel) {
            tdtLayer.setIsBaseLayer(false);
        }else{
            tdtLayer.setIsBaseLayer(true);
        }
        return tdtLayer;
    },

    /**
     * Method: createBingMap
     * 创建必应图层
     *
     */
    createBingMap:function(layerInfo) {
        var name = layerInfo.title,
            opacity = layerInfo.opacity,
            isVisible = layerInfo.isVisible,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode;
        return new SuperMap.Layer.Bing(name, {
            opacity:opacity,
            projection: "EPSG:" + epsgCode,
            visibility:isVisible
        });
    },

    /**
     * Method: createBaiduLayer
     * 创建百度图层
     *
     */
    createBaiduLayer:function(layerInfo){
        var opacity=layerInfo.opacity,
            isVisible = layerInfo.isVisible,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode;
        return new SuperMap.Layer.Baidu({
        	opacity:opacity,
            projection: "EPSG:" + epsgCode,
            visibility:isVisible
        });
    },

    /**
     * Method: createCloudLayer
     * 创建云图层
     * */
    createCloudLayer: function (layerInfo) {
        var title=layerInfo.title,
            opacity=layerInfo.opacity,
            isVisible = layerInfo.isVisible,
            url=layerInfo.url,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode;
        return new SuperMap.Layer.CloudLayer({
            name: title,
            url: url,
            opacity:opacity,
            projection: "EPSG:" + epsgCode,
            visibility:isVisible
        });
    },

    /**
     * Method: createTiledLayer
     * 创建动态切片图层
     * */
    createTiledLayer:function(layerInfo,callback,scope){
        var tiledLayer,
            isBaseLayer=layerInfo.isBaseLayer,
            title=layerInfo.title,
            resolutions=this.mapInfo.resolutions||layerInfo.resolutions,
            opacity=layerInfo.opacity,
            url=layerInfo.url,
            isVisible = layerInfo.isVisible,
            subLayers=layerInfo.subLayers,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode;
        if (isBaseLayer) {
            tiledLayer = new SuperMap.Layer.TiledDynamicRESTLayer(title, url, {
                transparent: true,
                cacheEnabled: true,
                redirect: false
            }, {
                resolutions: resolutions,
                maxResolution: "auto",
                isBaseLayer: true,
                opacity: opacity,
                visibility:isVisible,
                projection: "EPSG:" + epsgCode
            });
        } else {
            var layerID = "";
            if(subLayers && subLayers.length > 0){
                layerID = "[0:";
                for (var i = 0; i < subLayers.length; i++){
                    var sublayer = subLayers[i];
                    if(sublayer.visible){
                        if(i<subLayers.length)
                        {
                            layerID += sublayer.id.toString();
                        }
                        if(i<subLayers.length-1)
                        {
                            layerID += ",";
                        }
                    }
                }
                layerID += "]";
            }
            if (epsgCode === -1000) {
                tiledLayer = new SuperMap.Layer.TiledDynamicRESTLayer(title, url, {
                    transparent: true,
                    cacheEnabled: true,
                    redirect: false,
                    layersID: layerID
                }, {
                    resolutions: resolutions,
                    maxResolution: "auto",
                    isBaseLayer: false,
                    bufferImgCount: 0,
                    opacity: opacity,
                    visibility:isVisible,
                    projection: "EPSG:" + epsgCode
                });
            } else {
                tiledLayer = new SuperMap.Layer.TiledDynamicRESTLayer(title, url, {
                    transparent: true,
                    cacheEnabled: false,
                    redirect: false,
                    layersID: layerID
                }, {
                    resolutions: resolutions,
                    maxResolution: "auto",
                    isBaseLayer: false,
                    bufferImgCount: 0,
                    opacity: opacity,
                    projection: "EPSG:" + epsgCode,
                    visibility:isVisible
                });
            }
        }
        tiledLayer.events.on({
            "layerInitialized": function(){
                callback.apply(scope,arguments);
            }
        });
        return tiledLayer;
    },

    /**
     * Method: createTiledVectorLayer
     * 创建动态矢量切片图层
     * */
    createTiledVectorLayer:function(layerInfo,callback,scope){
        var tiledVectorLayer,
            isBaseLayer=layerInfo.isBaseLayer,
            title=layerInfo.title,
            resolutions=this.mapInfo.resolutions||layerInfo.resolutions,
            opacity=layerInfo.opacity,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
            url=layerInfo.url,
            isVisible = layerInfo.isVisible,
            subLayers=layerInfo.subLayers,
            cartoCSS=layerInfo.cartoCSS;
        var cartocssStr=!!cartoCSS?decodeURIComponent(cartoCSS):null;
        if (isBaseLayer) {
            tiledVectorLayer = new SuperMap.Layer.TiledVectorLayer(title, url, {
                transparent: true,
                cacheEnabled: true,
                redirect: false
            }, {
                resolutions: resolutions,
                maxResolution: "auto",
                isBaseLayer: true,
                opacity: opacity,
                useLocalStorage:true,
                cartoCss:cartocssStr,
                projection: "EPSG:" + epsgCode,
                visibility:isVisible
            });
        } else {
            if (epsgCode === -1000) {
                tiledVectorLayer = new SuperMap.Layer.TiledVectorLayer(title, url, {
                    transparent: true,
                    cacheEnabled: true,
                    redirect: false,
                    layersID: subLayers
                }, {
                    resolutions: resolutions,
                    maxResolution: "auto",
                    isBaseLayer: false,
                    bufferImgCount: 0,
                    opacity: opacity,
                    useLocalStorage:true,
                    cartoCss:cartocssStr,
                    projection: "EPSG:" + epsgCode,
                    visibility:isVisible
                });
            } else {
                tiledVectorLayer = new SuperMap.Layer.TiledVectorLayer(title, url, {
                    transparent: true,
                    cacheEnabled: false,
                    redirect: false,
                    layersID: subLayers
                }, {
                    resolutions: resolutions,
                    maxResolution: "auto",
                    isBaseLayer: false,
                    bufferImgCount: 0,
                    opacity: opacity,
                    projection: "EPSG:" + epsgCode,
                    useLocalStorage:true,
                    cartoCss:cartocssStr,
                    visibility:isVisible
                });
            }
        }
        tiledVectorLayer.events.on({
            "layerInitialized": function(){
                callback.apply(scope,arguments);
            }
        });
        return tiledVectorLayer;
    },

    /**
     * Method: createWmsLayer
     * 创建WMS图层
     * */
    createWmsLayer: function (layerInfo) {
        var title=layerInfo.title,
            url=layerInfo.url,
            isBaseLayer=layerInfo.isBaseLayer,
            opacity=layerInfo.opacity,
            isVisible = layerInfo.isVisible,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
            subLayers=layerInfo.subLayers,
            resolutions=this.mapInfo.resolutions||layerInfo.resolutions;

        if (subLayers === null || subLayers === undefined || subLayers === "undefined" || subLayers === "null") subLayers = "0";
        return  new SuperMap.Layer.WMS(title, url, {
            transparent: true,
            layers: subLayers
        }, {
            resolutions: resolutions,
            projection: "EPSG:" + epsgCode,
            opacity: opacity,
            singleTile: false,
            isBaseLayer: isBaseLayer,
            //加上dpi参数，否则叠加的rest图层的比例尺会大于1
            dpi:96,
            visibility:isVisible
        });
    },

    /**
     * Method: createWmtsLayer
     * 创建WMTS图层
     * */
    createWmtsLayer: function (layerInfo) {
        var title=layerInfo.title,
            url=layerInfo.url,
            identifier=layerInfo.identifier,
            isBaseLayer=layerInfo.isBaseLayer,
            opacity=layerInfo.opacity,
            units=layerInfo.units,
            scales=layerInfo.scales,
            isVisible = layerInfo.isVisible,
            prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode;
        var wellKnownScaleSet = identifier.split("_")[0];
        var layerName = identifier.substring(identifier.indexOf("_") + 1);

        if (wellKnownScaleSet === "Custom") {
            this.setMapExtentUnits(new SuperMap.Bounds(extent.left || extent[0], extent.bottom || extent[1], extent.right || extent[2], extent.top || extent[3]), units);
        }
        var info = this.getWmtsResolutionsAndMatrixIds(wellKnownScaleSet, units, scales);
        var matrixIds=info.matrixIds,
            resolutions=info.resolutions;
        return new SuperMap.Layer.WMTS({
            name: title,
            url: url,
            layer: layerName,
            style: "default",
            matrixSet: identifier,
            format: "image/png",
            resolutions: resolutions,
            matrixIds: matrixIds,
            opacity: opacity,
            requestEncoding: "KVP",
            projection: "EPSG:" + epsgCode,
            isBaseLayer: isBaseLayer,
            //加上dpi参数，否则叠加的rest图层的比例尺会大于1
            dpi:96,
            visibility:isVisible
        });
    },

    /**
     * Method: setMapExtentUnits
     * 设置地图的最大范围和地图单位
     * */
    setMapExtentUnits:function(maxExtent, units) {
        if (!this.map) return;
        if (maxExtent) this.map.maxExtent = maxExtent;
        if (units) this.map.units = units;
    },

    /**
     * Method: getWmtsResolutionsAndMatrixIds
     * 获取WMTS图层的分辨率数组和标识矩阵
     * */
    getWmtsResolutionsAndMatrixIds:function(wellKnownScaleSet, units, scales){
        var resolutions, matrixIds;
        var base=SuperMap.Cloud.MapViewer;
        switch (wellKnownScaleSet) {
            case "ChinaPublicServices":
            {
                resolutions = base.chinaPublicServiceResolutions;
                matrixIds = this.generateMatrixIds(base.chinaPublicServiceResolutions.length);
                break;
            }
            case "GlobalCRS84Scale":
            {
                resolutions = base.globalCRS84ScaleResolutions;
                matrixIds = this.generateMatrixIds(base.globalCRS84ScaleResolutions.length);
                break;
            }
            case "GlobalCRS84Pixel":
            {
                resolutions = base.globalCRS84PixelResolutions;
                matrixIds = this.generateMatrixIds(base.globalCRS84PixelResolutions.length);
                break;
            }
            case "GoogleMapsCompatible":
            {
                resolutions = base.googleMapsCompatibleResolutions;
                matrixIds = this.generateMatrixIds(base.googleMapsCompatibleResolutions.length);
                break;
            }
            case "GoogleCRS84Quad":
            {
                resolutions = base.googleCRS84QuadResolutions;
                matrixIds = this.generateMatrixIds(base.googleCRS84QuadResolutions.length);
                break;
            }
            case "Custom":
            {
                var info = this.getResolutionsMatrixIdsFromScales(scales, units);
                resolutions = info.resolutions;
                matrixIds = info.matrixIds;
                break;
            }
        }

        return {
            resolutions: resolutions,
            matrixIds: matrixIds
        };
    },

    /**
     * Method: generateMatrixIds
     * 初始化标识矩阵
     * */
    generateMatrixIds:function(len) {
        var matrixIds = [];
        for (var i = 0; i < len; i++) {
            matrixIds.push({
                identifier: i
            });
        }
        return matrixIds;
    },

    /**
     * Method: getResolutionsMatrixIdsFromScales
     * 根据比例尺数组获取分辨率矩阵
     * */
    getResolutionsMatrixIdsFromScales:function(scales, units) {
        var resolutions = [],
            matrixIds = [];

        for (var i = 0; i < scales.length; i++) {
            resolutions.push(SuperMap.Util.getResolutionFromScaleDpi(scales[i], 90.71446714322, units));
            matrixIds.push({
                identifier: i
            });
        }

        return {
            resolutions: resolutions,
            matrixIds: matrixIds
        };
    },

    /**
     * Method: createVectorLayer
     * 创建矢量要素图层
     * */
    createVectorLayer: function ( layerInfo) {
        var title=layerInfo.title,
            style=layerInfo.style,
            opacity=layerInfo.opacity,
            isVisible = layerInfo.isVisible,
            readonly=layerInfo.readonly;
        if(!style||style.pointStyle!==undefined){
            style=SuperMap.Cloud.MapViewer.vectorLayerdefaultStyle;
        }
        var vectorLayer;
        if (readonly) {
            vectorLayer = new SuperMap.Layer.Vector(title, {
                style: style,
                renderers: ["Canvas2", "SVG", "VML"],
                opacity:opacity,
                visibility:isVisible
            });
        } else {
            vectorLayer = new SuperMap.Layer.Vector(title, {
                style: style,
                visibility:isVisible
            });
        }
        return vectorLayer;
    },

    /**
     * Method: addFeature2Layer
     * 添加要素到矢量要素图层
     * */
    addFeature2Layer:function(layerInfo,layer){
        if(layerInfo.layerType!=="FEATURE_LAYER"||(!layer instanceof SuperMap.Layer.Vector)){
            return;
        }
        if (!layerInfo.url) {
            var
                features = layerInfo.features,
                tempFeatures = [],
                tempFeature, geometry, points, tempPoints, point, feature,pIndex,plen;

            for (var fIndex = 0,flen=features.length; fIndex < flen; fIndex++) {
                tempFeature = features[fIndex];
                geometry = tempFeature.geometry;
                points = geometry.points;
                if (geometry.type === "point") {
                    geometry = new SuperMap.Geometry.Point(points[0].x, points[0].y);
                } else if (geometry.type === "line") {
                    tempPoints = [];
                    for (pIndex = 0,plen=points.length; pIndex < plen; pIndex++) {
                        point = points[pIndex];
                        tempPoints.push(new SuperMap.Geometry.Point(point.x, point.y));
                    }
                    geometry = new SuperMap.Geometry.LineString(tempPoints);
                } else {
                    tempPoints = [];
                    for (pIndex = 0,plen=points.length; pIndex < plen; pIndex++) {
                        point = points[pIndex];
                        tempPoints.push(new SuperMap.Geometry.Point(point.x, point.y));
                    }
                    geometry = new SuperMap.Geometry.Polygon([new SuperMap.Geometry.LinearRing(tempPoints)]);
                }
                var style = typeof tempFeature.style !== "undefined" ? JSON.parse(tempFeature.style) : null;
                feature = new SuperMap.Feature.Vector(geometry, tempFeature.attributes, style);
                feature.id = tempFeature.id;
                tempFeatures.push(feature);
            }
            layer.addFeatures(tempFeatures);
        } else {
            var url = layerInfo.url,
                datasourceName = layerInfo.name,
                datasetNames = layerInfo.features;
            style = layerInfo.style;
            for (var setNameIndex = 0,dlen=datasetNames.length; setNameIndex < dlen; setNameIndex++) {
                var dataset = datasetNames[setNameIndex];
                if (dataset.visible) {
                    this.getFeaturesBySQL(url, [datasourceName + ":" + dataset.name],null, function (getFeaturesEventArgs) {
                        var  features, feature, result = getFeaturesEventArgs.result,
                            addedFeatures = [];
                        if (result && result.features) {
                            features = result.features;
                            for (var fi = 0,felen = features.length; fi < felen; fi++) {
                                feature = features[fi];
                                if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
                                    feature.style = style.pointStyle;
                                } else if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.LineString") {
                                    feature.style = style.lineStyle;
                                } else {
                                    feature.style = style.polygonStyle;
                                }
                                addedFeatures.push(feature);
                            }
                            layer.addFeatures(addedFeatures);
                        }
                    });
                }
            }
        }
    },

    /**
     * Method: getFeaturesBySQL
     * 用SQL的方式查询要素
     * */
    getFeaturesBySQL:function(url, datasetNames,filter, processCompleted, processFailed) {
        var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        filter=filter||"SMID > 0";
        getFeatureParam = new SuperMap.REST.FilterParameter({
            name: datasetNames.join().replace(":", "@"),
            attributeFilter: filter
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: datasetNames,
            fromIndex: 0,
            toIndex: 100000,
            returnContent: true
        });
        var that=this;
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
            eventListeners: {
                processCompleted: function (getFeaturesEventArgs) {
                    if(!that.actived){
                        return;
                    }
                    processCompleted && processCompleted(getFeaturesEventArgs);
                },
                processFailed: function (e) {
                    if(!that.actived){
                        return;
                    }
                    processFailed && processFailed(e);
                }
            }
        });

        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },

    /**
     * Method: createMarkerLayer
     * 创建标注物图层
     * */
    createMarkerLayer: function (layerInfo) {
        var title=layerInfo.title,
            isVisible = layerInfo.isVisible,
            opacity=layerInfo.opacity;
        return new SuperMap.Layer.Markers(title, {
            opacity: opacity,
            visibility:isVisible
        });
    },

    /**
     * Method: addMarkers2Layer
     * 根据json数据重新生成Marker，并添加到标注物图层上
     * */
    addMarkers2Layer:function(layerInfo, layer) {
        if(layerInfo.layerType!=="MARKER_LAYER"||(!layer instanceof SuperMap.Layer.Markers)){
            return;
        }

        var markers = layerInfo.markers || [],
            marker, point, size, offset, icon,that=this;

        for (var mIndex = 0,mlen=markers.length; mIndex < mlen; mIndex++) {
            marker = markers[mIndex];

            point = marker.geometry.points[0];
            size = new SuperMap.Size(48, 43);
            offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
            icon = new SuperMap.Icon(marker.icon, size, offset);
            var Marker = new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon);
            layer.addMarker(Marker);
            Marker.events.on({"click":clickEventHandler,"scope":Marker});
            Marker.id = marker.id;
            Marker.attributes=marker.attributes;
        }
        function clickEventHandler(){
            var marker=this;
            that.events.triggerEvent("markerClicked",marker);
        }
    },

    /**
     * Method: createAnimatorVectorLayer
     * 创建动态矢量要素图层
     * */
    createAnimatorVectorLayer: function(layerInfo){
        var title=layerInfo.title,
            layerStatus=JSON.parse(layerInfo.cartoCSS),
            opacity=layerInfo.opacity,
            datasetsInfo=layerInfo.subLayers,
            isVisible = layerInfo.isVisible,
            style=layerInfo.style;
        var rendererType=layerStatus.rendererType,
            featureIdField=layerStatus.featureIdField,
            timeField=layerStatus.timeField,
            startTime=layerStatus.startTime,
            endTime=layerStatus.endTime,
            dataField=layerStatus.dataField,
            dataRange=layerStatus.dataRange,
            itemIndex=layerStatus.itemIndex,
            rendererStatus=layerStatus.rendererStatus,
            controlStatus=layerStatus.controlStatus;
        var speed=controlStatus.speed*controlStatus.times;
        var layerStyle;
        if(!style||style.pointStyle!==undefined){
            layerStyle=SuperMap.Cloud.MapViewer.vectorLayerdefaultStyle;
        }
        var animatorVector = new SuperMap.Layer.AnimatorVector(title,
            {
                style:layerStyle,
                rendererType:rendererType,
                opacity:opacity,
                visibility:isVisible
            },
            {
                speed:speed,
                startTime:startTime,
                endTime:endTime,
                repeat:true
            });
        if(featureIdField){
            animatorVector.featureIdName=featureIdField;
        }
        if(timeField){
            animatorVector.timeName=timeField;
        }
        if(rendererType==="RadiatePoint"&&dataField&&dataRange){
            animatorVector.renderer.dataField = dataField;
            var min=Number(dataRange.min);
            var max=Number(dataRange.max);
            var items=this.getItemsByRange(itemIndex,min,max);
            animatorVector.renderer.items = items;
        }else if(rendererType==="TadpolePoint"&&rendererStatus){
            var tail=rendererStatus.tail,
                glint=rendererStatus.glint;
            animatorVector.renderer.tail=tail;
            animatorVector.renderer.glint=glint;
        }
        this.addFeaturesByJson(datasetsInfo,style,animatorVector);
        return animatorVector;
    },

    /**
     * Method: addFeaturesByJson
     * 根据图层保存的数据集信息查询要素
     * */
    addFeaturesByJson:function(datasetsInfo,style,layer){
        if(!datasetsInfo||datasetsInfo.length<=0){
            return;
        }
        for(var di= 0,dlen=datasetsInfo.length;di<dlen;di++){
            var datasetInfo=JSON.parse(datasetsInfo[di]);
            var url=datasetInfo.url,
                datasetName=datasetInfo.datasetName,
                datasourceName=datasetInfo.datasourceName,
                min=datasetInfo.startTime,
                max=datasetInfo.endTime,
                timeField=datasetInfo.timeField;
            var filter=timeField+">="+min+" and "+timeField+"<="+max;
            this.getFeaturesBySQL(url,[datasourceName+":"+datasetName],filter,function(getFeaturesEventArgs){
                var features, feature, result = getFeaturesEventArgs.result,
                    addedFeatures = [];
                if (result && result.features) {
                    features = result.features;
                    for (var fi = 0, flen = features.length; fi < flen; fi++) {
                        feature = features[fi];
                        if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.Point"||
                            feature.geometry.CLASS_NAME === "SuperMap.Geometry.MultiPoint") {
                            feature.style = style.pointStyle;
                        } else if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.LineString"||
                            feature.geometry.CLASS_NAME === "SuperMap.Geometry.MultiLineString"||
                            feature.geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") {
                            feature.style = style.lineStyle;
                        } else {
                            feature.style = style.polygonStyle;
                        }
                        addedFeatures.push(feature);
                    }
                    layer.addFeatures(addedFeatures);
                    layer.animator.start();
                }
            })
        }
    },

    /**
     * Method: getItemsByRange
     * 根据最大值和最小值获取分段数据
     * */
    getItemsByRange:function(itemIndex,min,max){
        itemIndex=Number(itemIndex);
        min=Number(min);
        max=Number(max);
        if(isNaN(itemIndex)||isNaN(min)||isNaN(max)){
            return null;
        }
        if(itemIndex>(SuperMap.Cloud.MapViewer.colorItems.length-1)||itemIndex<0){
            return null;
        }
        var colors=SuperMap.Cloud.MapViewer.colorItems[itemIndex].colors,
            len=colors.length,
            step=(max-min)/len,
            lengthBase=60,
            strokeWidthBase=2;
        var items=[];
        for(var ci=0;ci<len;ci++){
            var start=min+step*ci;
            var item={
                start:start,
                end:start+step,
                length:lengthBase+ci*5,
                style:{
                    strokeOpacity:1,
                    strokeColor:colors[ci],
                    strokeWidth:strokeWidthBase+0.5*ci
                }
            };
            items.push(item);
        }
        return items;
    },

    CLASS_NAME:"SuperMap.Cloud.MapViewer"
});
SuperMap.Cloud.MapViewer.vectorLayerdefaultStyle = {
    pointRadius: 6,
    fillColor: "#1abd9c",
    fillOpacity: 1,
    strokeColor: "#3498db",
    strokeOpacity: 1,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeDashstyle: "solid"
};
SuperMap.Cloud.MapViewer.colorItems=[{
    name:"rainbow",
    value:0,
    colors:["#EC1A22","#EFC409","#FCF100","#27B14D","#00ADEF","#0082CB","#852F8A"],
    selected:true,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/rainbow.png"
},{
    name:"firework",
    value:1,
    colors:["#FFFFFF","#FF6600","#FDFDCE","#F70938","#CCCCCC","#1F0099","#CF415E","#2900CC","#800080"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/firework.png"
},{
    name:"color0",
    value:2,
    colors:["#aaf0e7","#b0f3bc","#eef9ae","#42ae39","#1b873a","#d7b216","#c73b02","#7d0e01","#6b300f","#a69a93"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/color0.png"
},{
    name:"color1",
    value:3,
    colors:["#8686c2","#0003ff","#00b4ff","#00ffff","#00ff0a","#24ffda","#ffff00","#ff9900","#ff9900","#ff00ff","#ff00ff"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/color1.png"
},{
    name:"color2",
    value:4,
    colors:["#00ff00","#03d603","#04b904","#049c04","#037803","#025702","#013801","#011d01","#000800"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/color2.png"
},{
    name:"color3",
    value:5,
    colors:["#FFFFFF","#f0f0f0","#e2e2e2","#d2d2d2","#c3c3c3","#b4b4b4","#a5a5a5","#969696","#878787","#787878","#696969","#5a5a5a","#4b4b4b","#3c3c3c","#2d2d2d","#1e1e1e","#000000"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/color3.png"
},{
    name:"color4",
    value:6,
    colors:["#ffff00","#fdfd1f","#fefe3a","#fdfd56","#fefe75","#fdfd91","#ffffab","#ffffc5","#fefee0","#fefefe"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/color4.png"
},{
    name:"color5",
    value:7,
    colors:["#ff0000","#fe1b1b","#fe3636","#fe5454","#fd6f6f","#fe8989","#fda5a5","#ffc0c0","#fee0e0","#ffffff"],
    selected:false,
    imageSrc:SuperMap.Util.getImagesLocation()+"colorItem/color5.png"
}];

/****
 * globalCRS84ScaleResolutions 分辨率数组
 */
SuperMap.Cloud.MapViewer.globalCRS84ScaleResolutions= [1.25764139776733, 0.628820698883665, 0.251528279553466,
    0.125764139776733, 0.0628820698883665, 0.0251528279553466, 0.0125764139776733, 0.00628820698883665,
    0.00251528279553466, 0.00125764139776733, 0.000628820698883665, 0.000251528279553466,
    0.000125764139776733, 0.0000628820698883665, 0.0000251528279553466, 0.0000125764139776733,
    0.00000628820698883665, 0.00000251528279553466, 0.00000125764139776733, 0.000000628820698883665,
    0.00000025152827955346];

/****
 * googleCRS84QuadResolutions 分辨率数组
 */
SuperMap.Cloud.MapViewer.googleCRS84QuadResolutions= [1.40625000000000, 0.703125000000000, 0.351562500000000, 0.175781250000000,
    0.0878906250000000, 0.0439453125000000, 0.0219726562500000, 0.0109863281250000,
    0.00549316406250000, 0.00274658203125000, 0.00137329101562500, 0.000686645507812500,
    0.000343322753906250, 0.000171661376953125, 0.0000858306884765625,
    0.0000429153442382812, 0.0000214576721191406, 0.0000107288360595703, 0.00000536441802978516];

/****
 * globalCRS84PixelResolutions 分辨率数组
 */
SuperMap.Cloud.MapViewer.globalCRS84PixelResolutions= [240000, 120000, 60000, 40000,
    20000, 10000, 4000, 2000,
    1000, 500, 166, 100,
    33, 16, 10, 3,
    1, 0.33];

/****
 * googleMapsCompatibleResolutions 分辨率数组
 */
SuperMap.Cloud.MapViewer.googleMapsCompatibleResolutions= [156543.0339280410, 78271.51696402048, 39135.75848201023,
    19567.87924100512, 9783.939620502561, 4891.969810251280, 2445.984905125640,
    1222.992452562820, 611.4962262814100, 305.7481131407048, 152.8740565703525,
    76.43702828517624, 38.21851414258813, 19.10925707129406, 9.554628535647032,
    4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395];

/****
 * chinaPublicServiceResolutions 分辨率数组
 */
SuperMap.Cloud.MapViewer.chinaPublicServiceResolutions= [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
    0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625,
    0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625,
    0.00004291534423828125, 0.000021457672119140625, 0.000010728836059570312, 0.000005364418029785156,
    0.000002682209014892578];
/**
 * 云服务图层分辨率
 */
SuperMap.Cloud.MapViewer.cloudLayerResolution= [156543.033928041, 78271.5169640203, 39135.7584820102,
    19567.8792410051, 9783.93962050254, 4891.96981025127, 2445.98490512563,
    1222.99245256282, 611.496226281409, 305.748113140704, 152.874056570352,
    76.4370282851761, 38.218514142588, 19.109257071294, 9.55462853564701,
    4.77731426782351, 2.38865713391175, 1.19432856695588, 0.597164283477938];