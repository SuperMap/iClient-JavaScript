/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Tile.js
 */

/**
 * Class: SuperMap.Tile.VectorImage
 * 该实例用来管理矢量分块图层上的矢量瓦片。使用 <SuperMap.Tile.VectorImage> 来创建
 *     新的矢量瓦片。
 *
 * Inherits from:
 *  - <SuperMap.Tile>
 */
SuperMap.Tile.VectorImage = SuperMap.Class(SuperMap.Tile, {
        /**
         * APIProperty: hitDetection
         * {Boolean} Allow for hit detection of features.  Default is true.
         */
        hitDetection: true,
        /**
         * Property: url
         * {String} The URL of the image being requested. No default. Filled in by
         * layer.getURL() function.
         */
        url: null,

        /**
         * Property: canvas
         * {Array} The div element which wraps the image.
         */
        canvasPool: null,


        hitCanvasPool:null,


        /**
         * Property: frame
         * {DOMElement} The image element is appended to the frame.  Any gutter on
         * the image will be hidden behind the frame.
         */
        frame: null,

        /**
         * Property: layerAlphaHack
         * {Boolean} True if the png alpha hack needs to be applied on the layer's div.
         */
        layerAlphaHack: null,

        /**
         * Property: isFirstDraw
         * {Boolean} Is this the first time the tile is being drawn?
         *     This is used to force resetBackBuffer to synchronize
         *     the backBufferTile with the foreground tile the first time
         *     the foreground tile loads so that if the user zooms
         *     before the layer has fully loaded, the backBufferTile for
         *     tiles that have been loaded can be used.
         */
        isFirstDraw: true,

        /**
         * Property: maxGetUrlLength
         * {Number} 设置了该值以后，GET请求的url字符长度大于该值的将使用
         *      HTTP POST来发送请求。通常限制url字符不要超过2048是比较好的实
         *      践。
         *
         *
         * Caution:
         * 老版本的基于Gecko的浏览器（例如 Firefox < 3.5）和 Opera < 10.0 ，不能
         *     完全支持该选项。
         *
         * Note:
         * 不要将这个选项应用于transitionEffect配置后的图层——因为这样通过POST请
         *     求返回的IFrame瓦片不能够被从新定义大小。
         */
        maxGetUrlLength: null,

        /**
         * Property: layersInfo
         * {Object} 当前地图服务中的图层信息。
         */
        layersInfo: null,

        pointImageUrls:null,

        cartoLayers:null,

        sortedCartoLayers:null,

        loadedCallback:null,

        lockedDraw:true,

        /**
         *
         * Constructor: SuperMap.Tile.VectorImage
         * 用于实例化新的 <SuperMap.Tile.VectorImage> 的构造器。
         *
         * Parameters:
         * layer - {<SuperMap.Layer>} 瓦片存放的图层。
         * position - {<SuperMap.Pixel>}
         * bounds - {<SuperMap.Bounds>}
         * url - {<String>} Deprecated. Remove me in 3.0.
         * size - {<SuperMap.Size>}
         * options - {Object}
         */
        initialize: function (layer, position, bounds, url, size, options) {
            SuperMap.Tile.prototype.initialize.apply(this, arguments);

            if (this.maxGetUrlLength != null) {
                SuperMap.Util.extend(this, SuperMap.Tile.Image.IFrame);
            }

            this.url = url; //deprecated remove me
            this.frame = document.createElement('div');
            this.frame.style.overflow = 'hidden';
            this.frame.style.position = 'absolute';
            this.canvasPool = [];
            this.hitCanvasPool = [];

            this.cartoLayers=[];
            this.sortedCartoLayers=[];

            this.layerAlphaHack = this.layer.alpha && SuperMap.Util.alphaHack();
            this.layersInfo = layer.layersInfo;
            this.layer = layer;
        },

        /**
         * APIMethod: destroy
         * 取消引用来防止循环引用和内存泄漏。
         */
        destroy: function () {
            if (this.canvas != null) {
                this.removeCanvas();
            }
            if ((this.frame != null) && (this.frame.parentNode === this.layer.div)) {
                this.layer.div.removeChild(this.frame);
            }
            for(var i= 0,len=this.cartoLayers.length;i<len;i++){
                var cartoLayer = this.cartoLayers[i];                
                this.cartoLayers[i].destroy();
            }
            this.frame = null;
            this.layer.events.unregister("loadend", this, this.showTile);
            SuperMap.Tile.prototype.destroy.apply(this, arguments);
            this.lockedDraw=true;
            this.loadedCallback=null;
            this.cartoLayers=null;
            this.sortedCartoLayers=null;
            this.newFeatureTag=null;
        },

        /**
         * Method: clone
         *
         * Parameters:
         * obj - {<SuperMap.Tile.VectorImage>} The tile to be cloned
         *
         * Returns:
         * {<SuperMap.Tile.VectorImage>} An exact clone of this <SuperMap.Tile.VectorImage>
         */
        clone: function (obj) {
            if (obj == null) {
                obj = new SuperMap.Tile.VectorImage(this.layer,
                    this.position,
                    this.bounds,
                    this.url,
                    this.size);
            }
            //pick up properties from superclass
            obj = SuperMap.Tile.prototype.clone.apply(this, [obj]);
            //dont want to directly copy the image div
            obj.canvas = null;
            return obj;
        },

        addCartoLayer:function(cartoLayer){
            if(cartoLayer instanceof SuperMap.CartoLayer){
                 this.cartoLayers.push(cartoLayer);
            }
        },

        removeCartoLayer:function(cartoLayer){
            if(cartoLayer instanceof SuperMap.CartoLayer){
                for(var i= 0,len=this.cartoLayers.length;i<len;i++){
                    if(cartoLayer.equals(this.cartoLayers[i])){
                        this.cartoLayers.splice(i,1);
                    }
                }
            }
        },

        sortCartoLayer:function(){
            if(!this.cartoLayers||this.cartoLayers.length<1)return [];
            function compare(layer0,layer1){
                var index0=layer0.index,index1=layer1.index;
                return index0-index1;
            }

            //chrome浏览器下排序时，当index都相同时，｛数组长度超过10时｝原来的数组顺序会被改变
            //在默认情况下，图层的index都为0,而用户设置的index一般不相同，因此只以用户设置的不为0的一部分图层进行排序
            //即可避免排序后原来index相同的图层的顺序被改变

            var negative_cartoLayers=[];
            var zero_cartoLayer=[];
            var positive_cartoLayers=[];
            for(var i= 0,len=this.cartoLayers.length;i<len;i++){
                var cartolayer=this.cartoLayers[i];
                if(cartolayer.index===0){
                    zero_cartoLayer.push(cartolayer);
                }else if(cartolayer.index<0){
                    negative_cartoLayers.push(cartolayer);
                }else{
                    positive_cartoLayers.push(cartolayer);
                }
            }
            negative_cartoLayers.length>0&&negative_cartoLayers.sort(compare);
            positive_cartoLayers.length>0&&positive_cartoLayers.sort(compare);
            return negative_cartoLayers.concat(zero_cartoLayer).concat(positive_cartoLayers);
        },

        /**
         * Method: draw
         * Check that a tile should be drawn, and draw it.
         *
         * Returns:
         * {Boolean} Always returns true.
         */
        draw: function () {
            if (this.layer !== this.layer.map.baseLayer && this.layer.reproject) {
                this.bounds = this.getBoundsFromBaseLayer(this.position);
            }
            var drawTile = SuperMap.Tile.prototype.draw.apply(this, arguments);
            this.clear();
            if ((SuperMap.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, this.layer.transitionEffect) !== -1) ||
                this.layer.singleTile) {
                if (drawTile) {
                    this.events.register('loadend', this, this.showTile);//newmodify
                    this.layer.events.register("loadend", this, this.showTile);//newmodify
                }
            } else {
                if (drawTile && this.isFirstDraw) {
                    this.events.register('loadend', this, this.showTile);
                    this.isFirstDraw = false;
                }
            }

            if (!drawTile) {
                return false;
            }

            if (this.isLoading) {
                this.events.triggerEvent("reload");
            } else {
                this.isLoading = true;
                this.events.triggerEvent("loadstart");
            }
            return this.renderTile();
        },

        /**
         * Method: renderTile
         * Internal function to actually initialize the image tile,
         *     position it correctly, and set its url.
         */
        renderTile: function () {
            this.lockedDraw=false;
            var urlInfo = this.layer.getURL(this.bounds);
            this.url = urlInfo.url;
            //this.events.triggerEvent(this._loadEvent);
            //this.initCanvas();
            this.frame.style.zIndex = this.isBackBuffer ? 0 : 1;
            this.layer.div.appendChild(this.frame);
            this.positionTile(urlInfo.xyz);
            return true;
        },

        /**
         * Method: positionTile
         * Using the properties currenty set on the layer, position the tile correctly.
         * This method is used both by the async and non-async versions of the Tile.Image
         * code.
         */
        positionTile: function (xyz) {
            if (this.layer === null) {
                return;
            }
            // position the frame
            SuperMap.Util.modifyDOMElement(this.frame,
                null, this.position, this.size);
            this.frame.setAttribute('data-xyz',xyz.x + '-'+ xyz.y + '-' + xyz.z);
            this.loadTileFeature();
        },

        /**
         * Method: clear
         *  Clear the tile of any bounds/position-related data so that it can
         *   be reused in a new location.
         */
        clear: function () {
            //this.frame.style.display = 'none';
            this.loadedCallback=function(){};
            this.lockedDraw=true;
            if(this.cartoLayers){
                for(var i = 0, len = this.cartoLayers.length; i < len; i++){
                    var cartolayer = this.cartoLayers[i];
                    var canvas = cartolayer.context && cartolayer.context.canvas;
                    var hitCanvas = cartolayer.hitContext && cartolayer.hitContext.canvas;
                    if(canvas){
                        this.canvasPool.push(canvas);
                    }
                    if(hitCanvas){
                        this.hitCanvasPool.push(hitCanvas);
                    }
                    cartolayer.clear();
                    cartolayer.context && this.frame.removeChild(cartolayer.context.canvas);
                }
            }
            this.cartoLayers=[];
           /* if (this.context) {
                var w=this.canvas.width,h= this.canvas.height;
                this.context.globalAlpha=0;
                this.context.clearRect(0, 0, w,h);
                if(this.hitContext){
                    this.hitContext.globalAlpha=0;
                    this.hitContext.clearRect(0,0,w,h);
                }
            }*/
        },

        /**
         * Method: initCanvas
         * Creates the canvas property on the tile.
         */
        initCanvas: function () {
            var canvas,context,hitCanvas,hitContext;
            var offset = this.layer.imageOffset||{x:0,y:0};
            var size = this.layer.getImageSize(this.bounds);
            if(this.canvasPool && this.canvasPool.length > 0){
                canvas = this.canvasPool.shift();
            }else{
                canvas = this.createCanvas(null,
                    offset,
                    size,
                    null,
                    "absolute",
                    null,
                    null,
                    true);
            }
            context=canvas.getContext("2d");
            if(this.hitDetection){
                if(this.hitCanvasPool && this.hitCanvasPool.length > 0){
                    hitCanvas = this.hitCanvasPool.shift();
                }else{
                    hitCanvas = this.createCanvas(null,
                        offset,
                        size,
                        null,
                        "absolute",
                        null,
                        null,
                        true);
                }
                hitContext=hitCanvas.getContext("2d");
            }

            if (this.layer.opacity != null) {

                SuperMap.Util.modifyDOMElement(canvas, null, null, null,
                    null, null, null,
                    this.layer.opacity);
            }
            return {
                canvas:canvas,
                context:context,
                hitCanvas:hitCanvas,
                hitContext:hitContext
            };
        },
        /**
         * Method: createCanvas
         * 创建canvas，在title使用canvas绘制时调用
         */
        createCanvas: function (id, px, sz, imgURL, position, border, opacity) {
            var canvas = document.createElement("canvas");
            if (!id) {
                id = SuperMap.Util.createUniqueID("SuperMapCanvas");
            }
            if (!position) {
                position = "absolute";
            }
            SuperMap.Util.modifyDOMElement(canvas, id, px, sz, position,
                border, null, opacity);
            canvas.width = 256;
            canvas.height = 256;
            return canvas;
        },
        /**
         * Method: loadTileFeature
         * 加载矢量切片数据。
         */
        loadTileFeature: function () {
            var me = this;
            me.isLoading = true;
            var tileFeature=me.layer.getMemoryTile(me.bounds);
            if(tileFeature){
                me.recordSetToCartoLayer(tileFeature);
                me.isLoading = false;
                //绘制carto图层
                me.refresh();
            }else{
                var json=new SuperMap.Format.JSON();
                //查看本地存储，假如本地存储中存有当前请求的数据，则直接绘制数据，不用再请求矢量分块数据
                var keyUrl=me.keyUrl=me.url.replace(/&t=\d+/,"");
                if(me.layer.useLocalStorage&&window.localStorage&&window.localStorage.getItem(keyUrl)){
                    me.events.triggerEvent("loadend");
                    var item= window.localStorage.getItem(keyUrl);
                    var result=json.read(item);
                    tileFeature=result.recordsets;
                    me.recordSetToCartoLayer(tileFeature);
                    me.isLoading = false;
                    //绘制carto图层
                    me.refresh();
                    me.layer.addMemoryTile(me.bounds,tileFeature);
                }else{
                    var isInTheSameDomain=SuperMap.Util.isInTheSameDomain(me.url);
                    var tileFeauterUrl="";
                    //跨域时用jsonp方式请求矢量切片
                    if(!isInTheSameDomain){
                        tileFeauterUrl=me.url.replace(/.json/,".jsonp");
                    }else{
                        tileFeauterUrl=me.url;
                    }
                    var key = me.layer.getXYZ(me.bounds);
                    var x=key.x,y=key.y,z=key.z;
                    tileFeauterUrl=window.decodeURIComponent(tileFeauterUrl);
                    var loadedCallback=this.loadedCallback=function (me,keyUrl,isInTheSameDomain) {
                        return function (result) {
                            if(!me.bounds){
                                return;
                            }
                            var currentKey=me.layer.getXYZ(me.bounds);
                            if(this.keyUrl!==keyUrl||me.lockedDraw||currentKey.x!==x||currentKey.y!==y||currentKey.z!==z){
                                return;
                            }
                            me.events.triggerEvent("loadend");
                            if(!result&&!result.responseText)return;
                            var response=isInTheSameDomain?SuperMap.Util.transformResult(result):result;
                            tileFeature=response.recordsets;
                            if(!tileFeature){
                                return;
                            }
                            //分别在浏览器内存及浏览器的离线存储保存
                            me.layer.addMemoryTile(me.bounds,tileFeature,key);
                            if(me.layer.useLocalStorage&&window.localStorage&&response){
                                var item=isInTheSameDomain?result.responseText:json.write(result);
                                try{
                                    //如果浏览器支持本地存储，则当请求回来时，将请求数据存入本地存储中
                                    window.localStorage.setItem(keyUrl,item);
                                }catch(e){
                                    window.localStorage.clear();
                                    window.localStorage.setItem(keyUrl,item);
                                }
                            }
                            me.recordSetToCartoLayer(tileFeature);
                            me.isLoading = false;
                            //绘制carto图层
                            me.refresh();
                        }
                    }(me,keyUrl,isInTheSameDomain);
                    SuperMap.Util.committer({
                        url:tileFeauterUrl,
                        method:"GET",
                        isInTheSameDomain:isInTheSameDomain,
                        success: loadedCallback,
                        failure:function(){
                            throw error("load tileFeature failured!");
                        },
                        scope: me
                    });
                }
            }
        },

        /**
         * Method: recordSetToCartoLayer
         * 将每个recordSet转化为CartoLayer对象，并每个Carto图层加上渲染信息，设置其图层index，然后将其渲染出来
         *
         * Parameters:
         * recordSets - {Array} 从服务端返回的矢量分块数据集
         * */
        recordSetToCartoLayer:function(recordSets){
            var renderer=this.layer&&this.layer.cartoRenderer;
            for(var i= 0,len=recordSets.length;i<len;i++){
                var recordSet=recordSets[i];
                var serverFeatures=recordSet.features;
                var layerName=recordSet.layerName;
                var layerInfo=this.getLayerInfo(layerName);
                var obj = this.initCanvas();
                //一个数据集对应一个Carto图层
                var cartoLayer=new SuperMap.CartoLayer(layerName,this,{
                    layer:this.layer,
                    originIndex:i,
                    index:i,
                    ugcLayerType:layerInfo && layerInfo.ugcLayerType,
                    context:obj.context,
                    hitContext:obj.hitContext,
                    cartoRenderer:renderer});
                cartoLayer.addFeatures(serverFeatures);
                this.setCartoLayerShaderer(cartoLayer,layerInfo && layerInfo.layerStyle);
                this.addCartoLayer(cartoLayer);
                //cartoLayer.redraw();      //carto图层默认按照数据集中的顺序进行绘制
            }
        },

        /**
         * Method: setCartoLayerShaderer
         * 设置图层的渲染器信息，当CartoCSS中包含有对该图层的渲染信息时，优先将其设置为Carto图层的渲染信息
         * 否则直接将服务端传过来的layerSytle设置为Carto图层的渲染信息
         * Parameters：
         * cartoLayer - {<SuperMap.CartoLayer>} 要设置渲染信息的Carto图层
         * layerStyle - {Object} 从服务端请求的图层信息里对应cartoLayer的渲染风格信息
         * */
        setCartoLayerShaderer:function(cartoLayer,layerStyle){
            if(!layerStyle){
                var layerInfo = this.getLayerInfo(cartoLayer.layerName);
                layerStyle=layerInfo && layerInfo.layerStyle;
            }
            var renderer=this.layer&&this.layer.cartoRenderer;
            var symbol=new SuperMap.CartoSymbolizer(cartoLayer,null,null,
                {
                    shader: layerStyle,
                    useLayerInfo: true,
                    layer:this.layer,
                    context:this.context,
                    hitContext:this.hitContext,
                    cartoRenderer:renderer
                });
            cartoLayer.addSymbolizer(symbol);
            this.layer && this.layer.serverCartoShaders && this.pickShader(cartoLayer,this.layer.serverCartoShaders,true);
            this.layer && this.layer.clientCartoShaders && this.pickShader(cartoLayer,this.layer.clientCartoShaders,false);
        },

        /**
         * Method：pickShader
         * 给cartoLayer拾取CartoCSS渲染器
         * Parameters：
         * cartoLayer - {<SuperMap.CartoLayer>} Carto图层
         * */
        pickShader:function(cartoLayer,shaders,fromServer){
            var renderer=this.layer&&this.layer.cartoRenderer;
            var picked=false;
            var isPC=SuperMap.Browser.device==="pc";
            for(var i= 0,len=shaders.length;i<len;i++){
                var shader=shaders[i];
                shader.fromServer = fromServer;
                if(shader.length<1&&!shader.layerIndex)continue;
                var checked=check(cartoLayer,shader.elements);
                if(checked){
                    if(shader.attachment.indexOf("click")>=0){
                        isPC?this.layer.registerMouseEvent("click"):this.layer.registerMouseEvent("touchend");
                        continue;
                    }
                    if(shader.attachment.indexOf("hover")>=0){
                        this.layer.registerMouseEvent("mousemove");
                        continue;
                    }
                    if(shader.length>=1){
                        var symbol=new SuperMap.CartoSymbolizer(cartoLayer,null,null,
                            {
                                shader:shader,
                                useLayerInfo:false,
                                layer:this.layer,
                                context:this.context,
                                hitContext:this.hitContext,
                                cartoRenderer:renderer
                            });
                        cartoLayer.addSymbolizer(symbol,shader.attachment);
                    }
                    if(shader.layerIndex||shader.layerIndex==0){         //shader.layerIndex为0时会被跳过，所以要把0的情况考虑上
                        cartoLayer.setIndex(shader.layerIndex);
                    }
                    picked=true;
                }
            }

            function check(cartoLayer,elements){
                if(elements.length<1){
                    return false;
                }
                for(var j= 0,len1=elements.length;j<len1;j++){
                    var element=elements[j];
                    var type=element.type;
                    if(type==="wildcard"){
                        return type;
                    }
                    type=type==="class"?"className":type;
                    if(cartoLayer[type]!==element.clean){
                        return false;
                    }
                }
                return true;
            }
            return picked;
        },

        /**
         * Method: getFeatureInfoes
         * 获取所有图层的要素信息
         * Parameters:
         * x - number x坐标
         * y - number y坐标
         * return:
         * featureInfoes - {Array} 所有图层的要素信息
         */
        getFeatureInfoes:function(x,y){
            var selectedLayers = [];
            if(this.sortedCartoLayers){
                for(var i = 0 , len = this.sortedCartoLayers.length; i<len;i++){
                    var cartolayer = this.sortedCartoLayers[i];
                    var featureInfo = cartolayer.getFeatureInfo(x,y);
                    if(featureInfo && featureInfo.feature){
                        selectedLayers.push(featureInfo);
                    }
                }
            }
            return selectedLayers.reverse();
        },

        /**
         * Method: getTopFeatureInfo
         * 获取顶上的图层的坐标获取要素信息，即获取hitCanvas所记录在其RGB里面的要素ID与图层ID
         * Parameters:
         * x - number x坐标
         * y - number y坐标
         * Return:
         * featureInfo - {Object} 要素信息，包含featureId与layer两个信息
         * */
        getTopFeatureInfo:function(x,y){
            if(this.sortedCartoLayers){
                var len = this.sortedCartoLayers.length;
                if(len > 0){
                    return this.sortedCartoLayers[len-1].getFeatureInfo(x,y);
                }
            }
        },

        /**
         * Method:   refresh。
         * 在不向服务端请求矢量切片数据的情况下刷新矢量切片。
         * Parameters:
         * refreshCartoCSS - {boolean}  是否更新了cartoCss
         */
        refresh: function (refreshCartoCSS, cartolayer) {
            SuperMap.Util.modifyDOMElement(this.frame,
                null, this.position, this.size);

            //this.context&&this.clearCanvas(this.context);
            //this.hitContext&&this.clearCanvas(this.hitContext);
            if(refreshCartoCSS){
                for(var i= 0,len=this.cartoLayers.length;i<len;i++){
                    var layer=this.cartoLayers[i];
                    layer.symbolizers=[];
                    layer.index=0;
                    this.setCartoLayerShaderer(layer);
                }
            }
            if(cartolayer){
                cartolayer.redraw();
            }else{
                while (this.frame.firstChild) {
                    this.frame.removeChild(this.frame.firstChild);
                }
                //对carto图层排序后再重绘
                var sortedCartoLayers=this.sortedCartoLayers=this.sortCartoLayer();
                for(var j= 0,len1=sortedCartoLayers.length;j<len1;j++){
                    layer=sortedCartoLayers[j];
                    layer.context && layer.context.canvas && this.frame.appendChild(layer.context.canvas);
                    //考虑到SVTile发布出来的地图没有ugcLayerType属性，取消ugcLayerType为VECTOR的限制
                    //暂时不支持除了ugcLayerType为VECTOR之外的图层的渲染
                    //if(layer.ugcLayerType!=="VECTOR")continue;
                    layer.redraw();
                }
                //this.frame.setAttribute('data-layers',len1);
                this.frame.style.display = 'block';
            }
        },

        clearCanvas: function (canvasContext) {
            canvasContext.globalAlpha=0;
            canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        /**
         * Method:  getLayerInfo
         * 根据图层名获取图层信息。
         * Parameters:
         * layerName - {String} 图层名。
         * Returns:
         *  {Object} 图层信息。
         */
        getLayerInfo: function (layerName) {
            if (this.layersInfo == undefined) {
                return null;
            }
            var layerInfo=this.layersInfo[layerName];
            if(!layerInfo)return null;
            var layerInfo_simple={layerIndex:layerInfo.layerIndex,ugcLayerType:layerInfo.ugcLayerType};
            switch(layerInfo.ugcLayerType){
                case "VECTOR":
                case "THEME":
                    layerInfo_simple.layerStyle=layerInfo.style;
                    break;
/*
                    layerInfo_simple.layerStyle=(layerInfo.theme&&layerInfo.theme.defaultStyle);
                    break;*/
                default :
                    //SVTile发布出来的地图没有ugcLayerType属性
                    if(layerInfo.style){
                        layerInfo_simple.layerStyle=layerInfo.style;
                    }
                    break;
            }
            return layerInfo_simple;
        },

        /**
         * Method: removeCanvas
         * Removes the canvas from the DOM and stops listening to events on it.
         */
        removeCanvas: function () {
            // unregister the "load" and "error" handlers. Only the "error" handler if
            // this.layerAlphaHack is true.
            SuperMap.Event.stopObservingElement(this.canvas);

            if (this.canvas.parentNode === this.frame) {
                this.frame.removeChild(this.canvas);
            }
        },

        /**
         * Method: show
         * Show the tile by showing its frame.
         */
        show: function () {
            this.frame.style.display = '';
            // Force a reflow on gecko based browsers to actually show the element
            // before continuing execution.
            if (SuperMap.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS,
                this.layer.transitionEffect) !== -1) {
                if (SuperMap.IS_GECKO === true) {
                    this.frame.scrollLeft = this.frame.scrollLeft;
                }
            }
        },

        /**
         * Method: hide
         * Hide the tile by hiding its frame.
         */
        hide: function () {
            this.frame.style.display = 'none';
        },

        /**
         * Method: createBackBuffer
         * Create a backbuffer for this tile. A backbuffer isn't exactly a clone
         * of the tile's markup, because we want to avoid the reloading of the
         * image. So we clone the frame, and steal the image from the tile.
         *
         * Returns:
         * {DOMElement} The markup, or undefined if the tile has no image
         * or if it's currently loading.
         */
        createBackBuffer: function () {
            if (!this.canvas || this.isLoading) {
                return;
            }
            var backBuffer;
            if (this.frame) {
                //backBuffer = this.frame.cloneNode(false);
                //backBuffer.appendChild(this.canvas);

                var temp = this.frame.cloneNode(false);
                backBuffer = this.canvas;
                backBuffer.style.position = "absolute";
                backBuffer.style.left = temp.style.left.replace(/px/, "%");
                backBuffer.style.right = temp.style.right.replace(/px/, "%");
                backBuffer.style.width = temp.style.width.replace(/px/, "%");
                backBuffer.style.height = temp.style.height.replace(/px/, "%");
            } else {
                backBuffer = this.canvas;
            }
            this.canvas = null;
            return backBuffer;
        },
        CLASS_NAME: "SuperMap.Tile.VectorImage"
    }
);

SuperMap.Tile.VectorImage.GeometryType = {
    LINE: "LINE",
    LINEM: "LINEM",
    POINT: "POINT",
    REGION: "REGION",
    ELLIPSE: "ELLIPSE",
    CIRCLE: "CIRCLE",
    TEXT: "TEXT",
    UNKNOWN: "UNKNOWN"
};

String.prototype.PadLeft = function (length, cha) {
    var str = this;
    for (var i = this.length; i < length; i++) {
        str = cha + str;
    }
    return str;
};
SuperMap.Tile.Image.useBlankTile = (
    SuperMap.Browser.name === "safari" ||
        SuperMap.Browser.name === "opera");
