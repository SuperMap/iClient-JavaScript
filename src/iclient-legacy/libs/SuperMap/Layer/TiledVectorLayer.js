/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Layer.TiledVectorLayer
 * 矢量分块图层（对接SuperMap iServer 7C以上版本 ）。
 * 矢量瓦片是将地理数据以分块方式分发给浏览器或其他客户端设备的一种方式。
 * 矢量化瓦片和栅格瓦片相似，但是数据的表述方式不同。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Grid>
 */

SuperMap.Layer.TiledVectorLayer = SuperMap.Class(SuperMap.Layer.Grid, {

    /**
     * APIProperty: layerEditor
     * {<SuperMap.Control.TiledVectorLayerEditor>} 绑定了些图层的矢量地图编辑器
     * */
    layerEditor:null,

    /**
     * APIConstant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *layerInitialized* 初始化 TiledVectorLayer 时该图层发送获取地图
     * 状态的请求，根据响应信息初始化图层参数。当初始化完成后触发该事件，
     * 用户可以在该事件的响应函数中将该图层添加到地图中。例如：
     * (start code)
     *  则使用下面的方法将图层添加到map
     *  var layer = new SuperMap.Layer.TiledVectorLayer("layerName", layerURL);
     *  layer.events.on({"layerInitialized": addLayer});
     *     function addLayer() {
     *      map.addLayer(layer);
     *      map.setCenter(new SuperMap.LonLat(0, 0), 0);
     *  }
     * (end)
     */
    EVENT_TYPES: ["layerInitialized","cartocssChanged"],

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
     * Property: dpi
     * {Number}图像分辨率，表示每英寸内的像素个数。
     *
     */
    dpi: null,

    /**
     * Property: overlapDisplayed
     * {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为true。
     */
    overlapDisplayed: true,

    /**
     * Property: overlapDisplayedOptions
     * {<SuperMap.REST.OverlapDisplayedOptions>} 避免地图对象压盖显示的过滤选项，
     * 当 overlapDisplayed为 false 时有效，用来增强对地图对象压盖时的处理。
     */
    overlapDisplayedOptions: null,

    /**
     * Property:  layersInfo
     * 图层信息。
     */
    layersInfo: null,

    /**
     * Property: hightlightFeatureInfoes
     *当前高亮显示的要素ID与图层ID信息的集合。
     */
    hightlightFeatureInfoes: null,

    /**
     * Property:currentHightlightShader
     * 当前高亮时要用到的着色器
    * */
    currentHightlightShader:null,

    /**
     * Property: isBaseLayer
     * {Boolean} 图层是否为底图，默认为true。
     */
    isBaseLayer: true,

    /**
     * Property: tileOriginCorner
     * {String} 网格的原点位置。(当<tileOrigin>属性未被设置时，此属性有效)。
     *     可选的值包括"tl" (左上), "tr" (右上), "bl" (左下), and "br"(右下)， 默认为 "tl"。
     */
    tileOriginCorner: "tl",

    /**
     * Property: cartoShaders
     * {Array} carto着色器集合
     * */
    cartoShaders:null,

    /**
     * APIProperty: donotNeedServerCartoCss
     * {boolean} 是否不需要服务端的cartocss，默认为false
     *
     * */
    donotNeedServerCartoCss:false,

    /**
     * Property: cartoCss
     * {String} cartoCSS样式表
     *
     * */
    cartoCss:null,

    /**
     * Property: ServerCartoCss
     * {String} 服务端返回的样式表
     * */
    serverCartoCss:null,

    /**
     * Property: clientCartoCss
     * {String} 客户端设置的样式表
     * */
    clientCartoCss:null,

    /**
     * Property: highLightCartoShaders
     * {Array} cartocss高亮着色器集合
     * */
    highLightCartoShaders:null,

    /**
     * Property: highLightCartoCss
     * {String} cartoCSS高亮样式表
     *
     * */
    highLightCartoCss:null,

    /**
     * Property: fillImages
     * {Array} 面填充用的几个图片
     * */
    fillImages:null,

    /**
     * Property:cartoRenderer
     * {<SuperMap.Carto.CartoRenderer>} 渲染器
     * */
    cartoRenderer:null,

    /**
     * APIProperty: useLocalStorage
     * 是否开启本地存储功能，默认为false
     *
     * */
     useLocalStorage:false,

    /**
     * Property: zoomDuration
     * {Number} 设置两次滚轮事件触发的间隔，如果两次滚轮触发时间差小于180ms。
     * 则放弃前一次滚轮事件。（设置此属性的同时设置<SuperMap.Handler.MouseWheel>的interval属性，会产生错误）
     */
    zoomDuration:180,

    /**
     * Property: zoomDelay
     * {Number} 执行缩放的100ms后才开始执行缩放动画
     */
    zoomDelay:120,

    /**
     * Property: memoryTile
     * {Object} 存放已经加载的矢量瓦片要素作为缓存。
     * 在每次图层状态改变时需要重绘，就会首先读取此缓存内部是否已经存在此矢量瓦片要素，
     * 如果存在直接取出进行绘制，不存在再向服务器发送请求。
     * 这样可以提高效率，并且在断网状态下也可以查看缓存的矢量瓦片要素。
     */
    memoryTile: null,

    /**
     * Property: featureStyleMap
     * {Object} 要素的样式信息缓存
     * */
    featureStyleMap:null,

    /**
     * Property: memoryKeys
     * {Array} 保存已经缓存图片的key值。
     * 每一张图片有对应一个key，如x0y1z2，
     * 代表缩放级别为2下的第一横排，第二竖排的图片（从左上角开始计算）.
     */
    memoryKeys:[],

    /**
     * APIProperty: bufferTileCount
     * {Number} 用来记录内存中缓存矢量瓦片要素的数量，默认值为 1000。
     * 为了减少网络访问量，在使用 Canvas 模式时，图层会将访问过的矢量瓦片要素保存在内存中，
     * 如果访问的矢量瓦片要素数量超过该属性定义的值，那么新访问的矢量瓦片要素会替换已经缓存的矢量瓦片要素。
     */
    bufferTileCount:1000,

    /**
     * Constructor: SuperMap.Layer.TiledVectorLayer
     * 矢量分块图层（对接iServer 7C以上版本服务）
     *
     * Parameters:
     * name - {String}  图层标识名称。
     * url - {String} 图层的服务地址。
     * params - {Object} 矢量图层的中要加到矢量数据请求参数中的，常用的参数有cacheEnabled（是否在服务端缓存矢量数据）
     * options - {Object} 可选参数，包含useLocalStorage，以及cartoCss等等参数
     *
     * Examples:
     * (code)
     * var cartoCss=["#Road_L__China400{",
     * "line-color:#f00;",
     * "line-width:2;",
     * "}"].join("\n");
     * layer = new SuperMap.Layer.TiledVectorLayer("China", url,{cacheEnabled:true},{useLocalStorage:true,cartoCss:cartoCss});
     * layer.events.on({"layerInitialized": addLayer});
     * function addLayer(){
     *      map.addLayers([layer]);
     *      var center = new SuperMap.LonLat(0,0);
     *      map.setCenter(center, 1);
     * }
     * (end)
     *
     */
    initialize: function (name, url, params,options) {
        var me = this;
        me.useCanvas = false;//临时写法
        me.layersInfoInitialized = false;
        me.mapServiceInitialized = false;
        me.tileClass = SuperMap.Tile.VectorImage;
        me.memoryTile={};
        //判断是否为移动端，如果是，那么设置缓存矢量瓦片上限为500，比电脑上少了一半（考虑到手持端内存）
        if(!!SuperMap.isApp)me.bufferTileCount = 500;

        //例如options参数里设置了cartocss，则它将会被解析为cartoShaders保存起来
        if(options&&options.cartoCss){
            this.clientCartoCss = this.cartoCss = options.cartoCss;
            this.donotNeedServerCartoCss = options.donotNeedServerCartoCss;
            var carto=new SuperMap.CartoCSS(options.cartoCss);
            me.clientCartoShaders=carto.getShaders();
        }
        if(options&&options.highLightCartoCss){
            this.highLightCartoCss=options.highLightCartoCss;
            carto=new SuperMap.CartoCSS(options.highLightCartoCss);
            me.highLightCartoShaders=carto.getShaders();
        }

        //通过浏览器获取部分信息
        var broz = SuperMap.Browser;
        //me.tileSize = new SuperMap.Size(256, 256);
        //判断是否为移动端，如果是，那么设置缓存图片上限为500，比电脑上少了一半（考虑到手持端内存）
        if(!!SuperMap.isApp)me.bufferImgCount = 500;
        SuperMap.Layer.Grid.prototype.initialize.apply(me, arguments);

        me.initFillImages();

        //判断是否设置了renderer，没有则通过渲染器列表判断支持情况。
        if (!this.cartoRenderer) {
            this.cartoRenderer=new SuperMap.CartoRenderer(null,null,{layer:this});
        }

        //reports the progress of a tile filter
        if(me.useCanvas) {
            //通过浏览器的判定决定是否支持Canvas绘制
            me.useCanvas = SuperMap.Util.supportCanvas();
        }
        //如果为android手持端，那么不能支持Canvas绘制
        if(broz.device === 'android') {
            me.useCanvas = false;
        }

        if (SuperMap.isApp) {
            //me.sdcardPath = "file://" + window.plugins.localstoragemanager.getsdcard().sdcard + "/";
            cordova.exec(function(obj){
                me.sdcardPath = "file://" + obj.sdcard + "/";
            }, function(e){}, "LocalStoragePlugin","getsdcard", []);
            me.useCanvas = true;
        }

        if(me.useCanvas) {
            me.canvas = document.createElement("canvas");
            me.canvas.id = "Canvas_" + me.id;
            me.canvas.style.position = "absolute";
            me.div.appendChild(me.canvas);
            me.canvasContext = me.canvas.getContext('2d');
            me.transitionObj = new SuperMap.Animal(me);
            me.memoryImg = {};
        }

        //如果是Canvas策略采用高速出图 。
        me.useHighSpeed = me.useCanvas ? true : false;
        me.isFirstLoad = true;

        SuperMap.Util.applyDefaults(me.params, me.DEFAULT_PARAMS);
        me.events.addEventType("layerInitialized");
        if (typeof me.params.layersID !== "undefined") {
            if (!me.params.layersID) {
                delete me.params.layersID;
            }
        }
        //用户传Layer的地图单位
        if (me.units) {
            me.units = me.units.toLowerCase();
        }

        //保证了需要预先加载的图片能预先加载好了才开始被始化图层信息
        me.events.on({"fillImageLoaded":function(){
            me.initializeLayersInfo();
        }});
        if (me.dpi && me.maxExtent && (me.resolutions || me.scales)) {
            //如果设置了dpi、maxExtent、resolutions或者是scales,则不需要向服务端发出请求获取图层信息
        } else if (!me.dpi && (!me.viewBounds || !me.viewer || !me.scale)) {
            //当在options中设置viewBounds 、viewer 、scale 、units 、datumAxis，则计算dpi
            if (!!SuperMap.isApp) {
                var layerContext = {
                    tile: me
                };
                cordova.exec(function (layerContext) {
                    return function (r) {
                        layerContext.tile.getAppStatusSucceed(layerContext, r);
                    }
                }(layerContext), function (e) {
                    },
                    "LocalStoragePlugin", "getconfig",
                    [this.name, this.storageType]
                );
            } else {
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
        if (me.projection) {
            if (typeof me.projection === "string") {
                me.projection = new SuperMap.Projection(me.projection);
            }

            var arr = me.projection.getCode().split(":");
            if (arr instanceof Array && arr.length === 2) {
                me.prjStr1 = "{\"epsgCode\":" + arr[1] + "}";
            }
        }
    },

    /**
     * APIMethod: setCartoCSS
     * 给矢量要素图层设置CartoCSS样式并解析出来，然后重绘图层
     *
     * Parameters:
     * cartoCss - {String} cartoCSS样式表，通过CartoCSS样式表，我们可以定义点、
     * 线、面还有文本的符号属性，并且我们还可以通过图层ID和class选择器选择特定的图层来进行符号定制，除外
     * 本产品的CartoCSS还支持FeatureID和zoom的属性选择器，以选择特定id的要素或者对某一缩放级别下的图层属
     * 性才进行符号配置。目前本产品的CartoCSS只支持了标准CartoCSS的一部分，同时也对标准的CartoCSS进行了
     * 一些必要的扩展，这个CartoCSS样式表参照了标准的CartoCSS（来自MapBox的TileMill软件），
     * 其链接为：https://www.mapbox.com/tilemill/docs/manual/carto/，
     *
     * 其所实现的CartoCSS如下：
     *  CartoCSS的变量（在CartoCSS中，用户可以定义一个变量，然后在CartoCSS代码中使用）:
     *  (code)
     *  @color:#000;
     *  @width:2;
     *  #Road_L__China400{
     *      line-color:@color;
     *      line-width:@width;
     *  }
     *  (end)
     *  CartoCSS的选择器:
     *
     *   ID选择器（图层ID默认为将图层名中的"@"与"#"符号替换为"__"双划线，例如：图层名为："China_Road_L@China400#1"会替换为："China_Road_L__China400__1"）:
     *    (code)
     *    #China_Road_L__China400{
     *    }
     *    (end)
     *
     *   类选择器:
     *    (code)
     *    .China_Road_L__China400{
     *    }
     *    (end)
     *
     *   要素ID属性选择器:
     *    (code)
     *    #China_Road_L__China400{
     *        [featureID=1]{
     *            line-width:3;
     *        }
     *    }
     *    (end)
     *
     *   缩放级别控制（可以通过zoom来控制图层在不同缩放级别下的样式符号）:
     *     (code)
     *     #China_Road_L__China400{
     *         [zoom>4]{
     *             line-width:2;
     *         }
     *     }
     *     (end)
     *
     *    高亮显示（点击高亮以及鼠标移动高亮）:
     *      (code)
     *       #China_Road_L__China400{
     *           ::click{
     *               line-color:#f00;
     *           }
     *           ::hover{
     *               line-color:#0f0;
     *           }
     *       }
     *      (end)
     *
     *     伪类（当要素对同一图层定义不同的样式时可用到，如下，就定义了一根边框为红色，中间为黑色的，宽3px的线）
     *     (code)
     *      #China_Road_L__China400::one{
     *          line-color:#f00;
     *          line-width:3;
     *      }
     *      #China_Road_L__China400::tow{
     *          line-color:#000;
     *          line-width:1;
     *      }
     *     (end)
     *
     * CartoCSS实现的属性:
     *  其中的Color类型可为十六进行字符串：#000，也可为rgb：rgb(0,0,0)或者rgba：rgba(0,0,0,1)类型，和hsl类型：hsl(0.5,0.5,0.5)。
     *  而point-comp-op的值可为以下几种：src-over、dst-over、src-in、dst-in、src-out、dst-atop、xor、plus、lighten。
     *
     *  点图层属性:
     *  point-file - {URL} 点符号的文件url，格式为：url("./examples/images/marker.png")。
     *  point-radius - {Number} 矢量点的大小，单位为像素。
     *  point-halo-radius - {Number} 矢量点的外围边界宽度，单位为像素。
     *  point-halo-color - {Color} 矢量点的外围边界颜色，格式为：#000。
     *  point-fill - {Color} 矢量点符号的颜色值，只有当point-file为""时点才会被渲染成矢量点，格式为：#000。
     *  point-dx - {Number} 点在x轴上的偏移值，单位为px，正值为右移，负值为左移。
     *  point-dy - {Number} 点在y轴上的偏移值，单位为px，正值为下移，负值为上移。
     *  point-opacity - {Number} 点的透明度，值的范围为0~1。
     *  point-comp-op - {String} 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上，其中源图像是指您打算放置到地图上的绘图，而目标图像则指您已经放置在地图上的绘图。
     *
     *  线图层属性:
     *  line-color - {Color} 线的颜色值，格式为：#000。
     *  line-width - {Number} 线宽度，单位为px。
     *  line-cap - {String} 线端点的样式，值可为：平头"butt"、圆头"round"、方头"square"。
     *  line-join - {String} 线的拐角处的样式，值可为：泄角"bevel"、圆角"round"、尖角"miter"。
     *  line-miterlimit - {Number} 线的最大斜接长度。
     *  line-dash-offset - {Number} 虚线模式的偏移值，即虚线从偏移值处才开始虚线的绘制，被偏移掉的一段为实线。
     *  line-opacity - {Number} 线的透明度，值为0~1。
     *  line-dasharray - {Array} 虚线的模式，格式为：10,10，其中第0个值为第一段实线的长度，第1个值为第一段空线的长度，后面的虚线按照这个模式重复。
     *  line-offset - {Number} 线的偏移，单位为px，正值为向左偏移，负值为向右偏移。
     *  line-comp-op - {String} 同point-comp-op。
     *
     *  面图层属性(面支持除了line-offset和line-comp-op之外的所有线属性):
     *  polygon-fill - {Color} 面填充的颜色，格式为：#000。
     *  polygon-dx - {Number} 面在x轴上的偏移值，正值为向右偏移，负值为向左偏移，单位为px。
     *  polygon-dy - {Number} 面在y轴上的偏移值，正值为向下偏移，负值为向上偏移，单位为px。
     *  polygon-opacity - {Number} 面的填充透明度，值为0~1.
     *  polygon-comp-op - {String} 同point-comp-op。
     *
     *  文本图层属性:
     *  text-size - {Number} 文本的尺寸，单位为px。
     *  text-face-name - {String} 文本的字体名称，如：Times New Roman。
     *  text-align - {String} 文本在水平方向的对齐方式，值可为：center、left、right。
     *  text-vertical-alignment - {String} 文本在垂直方向上的对齐方式，值可为：top、middle、baseLine、bottom。
     *  text-halo-radius - {Number} 文本外围边框的宽度。
     *  text-halo-color - {Color} 文本外围边框的颜色。
     *  text-fill - {Color} 文本的颜色。
     *  text-opacity - {Number} 文本的透明度，值为0~1。
     *  text-dx - {Number} 文本在x轴上的偏移值，正值为向右偏移，负值为向左偏移，单位为px。
     *  text-dy - {Number} 文本在y轴上的偏移值，正值为向下偏移，负值为向上偏移，单位为px。
     *  text-comp-op - {String} 同point-comp-op。
     *
     * */
    setCartoCSS:function(cartoCss,fromServer){
        if(typeof cartoCss==="string"){
            var serverCartoCss,
                clientCartoCss,
                carto;
            //假如是来自服务端的样式表，则保存起来，否则，将自定义的样式表添加到服务端生成的样式表后面，以覆盖服务端样式表相应的属性
            if(fromServer){
                serverCartoCss = this.serverCartoCss = cartoCss;
                carto = new SuperMap.CartoCSS(serverCartoCss);
                this.serverCartoShaders=carto.getShaders();
            }else{
                clientCartoCss = this.clientCartoCss = cartoCss;
                carto = new SuperMap.CartoCSS(clientCartoCss);
                this.clientCartoShaders=carto.getShaders();
            }

            //this.collectHightlightShader(this.cartoShaders);
            //this.unRegisterMouseEvent("mousemove");
            //this.unRegisterMouseEvent("click");
            this.currentHightlightShader=null;
            //this.wholeHightligthtShader=null;
            this.resetCartoCSS = true;
            //重设样式表时，要清空一下样式缓存
            this.featureStyleMap = null;
            //遍历切片，对每个切片进行CartoCSS样式的重新设置。
            for (var i = 0,len00=this.grid.length; i < len00; i++) {
                var rowTiles = this.grid[i];
                for (var j = 0,len01=rowTiles.length; j < len01; j++) {
                    //rowTiles[j].highlight(id,layer);
                    rowTiles[j].refresh(true);
                }
            }
            this.resetCartoCSS = false;
            this.events.triggerEvent("cartocssChanged",{"cartoCSS":this.cartoCss});
        }
    },

    setHighLightCartoCSS:function(cartoCss){
        if(typeof cartoCss==="string"){
            this.highLightCartoCss=cartoCss;
            var highLightCartoCss=this.highLightCartoCss=new SuperMap.CartoCSS(cartoCss);
            this.highLightCartoShaders=carto.getShaders();
            this.events.triggerEvent("hightLightCartocssChanged",{"highLightCartoCss":this.highLightCartoCss});
        }
    },

    /**
     * APIMethod: getClientCartoCSS
     * 返回用户设置的cartocss样式
     *
     * returns:
     * {String} cartocss样式
     * */
    getClientCartoCSS:function(){
       return this.clientCartoCss;
    },

    /**
     * APIMethod: getServerCartoCSS
     * 返回服务端产生的cartocss样式
     *
     * returns:
     * {String} cartocss样式
     * */
    getServerCartoCSS:function(){
        return this.serverCartoCss;
    },

    collectHightlightShader:function(cartoShaders){
        this.hightlightShaders={};
         for(var i= 0,len=cartoShaders.length;i<len;i++){
             var shader=cartoShaders[i];
             if(shader.attachment.indexOf("click")>=0){
                 this.hightlightShaders.click=this.hightlightShaders.click||[];
                 this.hightlightShaders.click.push(shader);
             }
             if(shader.attachment.indexOf("hover")>=0){
                 this.hightlightShaders.mousemove=this.hightlightShaders.mousemove||[];
                 this.hightlightShaders.mousemove.push(shader);
             }
         }
    },

    initFillImages:function(){
        this.fillImages={length:0,state:"loading"};
        this.events.addEventType("fillImageLoaded");
        var that=this;
        var rootUrl=SuperMap.Util.getImagesLocation()+"fillStyle/";
        var imageNumber=6;
        for(var i= 0;i<imageNumber;i++){
             var image=new Image();
            var imageName="System "+(i+2);
            image.src=rootUrl+imageName+".png";
            image.onload=function(name,len,that){
                return function(){
                    if(!that.fillImages)return;
                    that.fillImages[name]=this;
                    that.fillImages.length++;
                    that.fillImages.state="loading";
                    if(that.fillImages.length===len){
                        that.fillImages.state="loaded";
                        that.events.triggerEvent("fillImageLoaded");
                    }
                }
            }(imageName,imageNumber,that);
        }
    },

    /**
     * Method: calculateResolutionsLevel
     * 根据resolutions数组计算scale数组。
     *
     * Parameters:
     * resolutions - {Array({Number})}resolutions数组
     */
    calculateResolutionsLevel: function(resolutions){
        var me = this, j, len, resolution,
            baseLayerResolutions;
        baseLayerResolutions = me.map.baseLayer.resolutions;
        len = baseLayerResolutions.length;
        resolution = resolutions[0];
        for(j=0; j<len; j++){
            if(resolution === baseLayerResolutions[j]){
                return j;
            }
        }
        return 0;
    },

    /**
     * Method: getAppStatusSucceed
     *
     */
    getAppStatusSucceed: function (layerContext, r) {
        var mapStatus = r.json;
        var me = this;
        if (mapStatus !== "false") {
            mapStatus = eval('(' + mapStatus + ')');
            var bounds = mapStatus.bounds;
            bounds = new SuperMap.Bounds(bounds.left, bounds.bottom, bounds.right, bounds.top);
            me.maxExtent = bounds;
            if (mapStatus.dpi) {
                me.dpi = mapStatus.dpi;
                me.options.scales = mapStatus.scales;
                me.units = mapStatus.unit;
                me.datumAxis = 6378137;
            }
            else {
                var viewBounds = mapStatus.viewBounds,
                    coordUnit = mapStatus.coordUnit,
                    viewer = mapStatus.viewer,
                    scale = mapStatus.scale,
                    datumAxis = mapStatus.datumAxis;
                //将jsonObject转化为SuperMap.Bounds，用于计算dpi。
                viewBounds = new SuperMap.Bounds(viewBounds.left, viewBounds.bottom, viewBounds.right, viewBounds.top);
                me.viewBounds = viewBounds;

                viewer = new SuperMap.Size(viewer.rightBottom.x, viewer.rightBottom.y);
                me.viewer = viewer;
                me.scale = scale;

                coordUnit = coordUnit.toLowerCase();
                me.units = me.units || coordUnit;
                me.datumAxis = datumAxis;

                me.dpi = SuperMap.Util.calculateDpi(viewBounds, viewer, scale, me.units, datumAxis);
            }
            me.events.triggerEvent('layerInitialized', me);
        } else {
            var strServiceUrl = me.url;
            if (SuperMap.Util.isArray(me.url)) {
                strServiceUrl = me.url[0];
            }
            var getMapStatusService = new SuperMap.REST.MapService(strServiceUrl,
                {eventListeners: {processCompleted: me.getStatusSucceed, scope: me,
                    processFailed: me.getStatusFailed}, projection: me.projection});
            getMapStatusService.processAsync();
        }
    },

    /**
     * Method: setMapStatus
     * 计算Dpi，设置maxExtent。
     */
    getStatusSucceed: function (mapStatus) {
        var me = this;
        if (mapStatus.result) {
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
            viewBounds = new SuperMap.Bounds(viewBounds.left, viewBounds.bottom, viewBounds.right, viewBounds.top);
            me.viewBounds = viewBounds;

            viewer = new SuperMap.Size(viewer.rightBottom.x, viewer.rightBottom.y);
            me.viewer = viewer;
            me.scale = scale;

            bounds = new SuperMap.Bounds(bounds.left, bounds.bottom, bounds.right, bounds.top);
            me.maxExtent = bounds;

            coordUnit = coordUnit.toLowerCase();
            me.units = me.units || coordUnit;
            me.datumAxis = datumAxis;

            me.dpi = SuperMap.Util.calculateDpi(viewBounds, viewer, scale, me.units, datumAxis);
            if(!me.projection&&projCode){
                me.projection = "EPSG:" + projCode;
            }
            if (!!SuperMap.isApp) {
                //window.plugins.localstoragemanager.savaconfig(this.name,mapStatus);
                cordova.exec(function () {
                }, function (e) {
                }, "LocalStoragePlugin", "savaconfig", [this.name, mapStatus]);
            }
            me.mapServiceInitialized = true;
            if (me.layersInfoInitialized) {
                me.events.triggerEvent('layerInitialized', me);
            }
        }
    },

    /**
     * Method: getStatusFailed
     * 获取图层状态失败
     */
    getStatusFailed: function (failedMessage) {
        //todo
    },


    /**
     * APIMethod: destroy
     * 解构TiledVectorLayer类，释放资源。
     */
    destroy: function () {
        var me = this;
        if (me.getMapStatusService) {
            me.getMapStatusService.events.listeners = null;
            me.getMapStatusService.destroy();
        }
        me.viewBounds = null;
        me.viewer = null;
        me.scale = null;
        me.hightlightFeatureInfoes=null;
        me.cartoShaders=null;
        me.layersInfo=null;
        me.cartoCss=null;
        me.fillImages=null;
        me.cartoRenderer&&me.cartoRenderer.destroy();
        me.layerEditor=null;

        SuperMap.Layer.Grid.prototype.destroy.apply(me, arguments);
        me.DEFAULT_PARAMS = null;
        me.memoryTile=null;
        me.memoryKeys=null;
        me.bufferTileCount=null;
    },

    /**
     * APIMethod: clone
     * 创建当前图层的副本。
     *
     * Parameters:
     * obj - {Object}
     *
     * Returns:
     * {<SuperMap.Layer.TiledVectorLayer>}  新的图层。
     */
    clone: function (obj) {
        var me = this;
        if (obj == null) {
            obj = new SuperMap.Layer.TiledVectorLayer(
                me.name, me.url, me.params, me.getOptions());
        }
        obj = SuperMap.Layer.Grid.prototype.clone.apply(me, [obj]);
        obj._timeoutId = null;

        return obj;
    },

    /**
     * Method: clean
     * 清除掉比例尺及分辨率，以便重新计算
     * */
    clean:function(){
        this.resolutions=null;
        this.scales=null;
        this.memoryTile={};
        this.memoryKeys=[];
    },

    /**
     * Method: moveTo
     * 当map移动时，出发此事件. 所有的瓦片移动操作实际是
     * 由map完成, moveTo's 的任务是接受一个bounds，并且确定
     * 此bounds下的所请求的图片是否被预加载。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function(bounds, zoomChanged, dragging) {
        var me = this,
            style = this.map.layerContainerDiv.style,
            left = parseInt(style.left),
            top = parseInt(style.top);
        this.inZoom = zoomChanged ? true: false;
        this.changeDx = -left;
        this.changeDy = -top;
        //如果是缩放出发的moveto，不进行fixposition。
        //当在缩放时进行平移，不能触发fixPosition()，因为
        //新图没有读出来，会出图错误。
        if(!zoomChanged && !me.isZoomming && me.useCanvas){
            this.fixPosition();
        }
        SuperMap.Layer.HTTPRequest.prototype.moveTo.apply(me, arguments);
        bounds = bounds || me.map.getExtent();

        // the new map resolution
        var resolution = this.map.getResolution();
        // 当操作为移动时候，并不重绘整个canvas
        me.redrawCanvas = zoomChanged;
        me.dragging = dragging;
        var ratio = this.lastResolution / resolution;
        // 当一切缩放属性都添加完后才能进行缩放动画。
        if ( ratio&&ratio!==1&&!this.map.isIEMultipTouch&&SuperMap.Browser.device==="pc") {
            var transform="translate("+(this.lastChangDx||0)+"px,"+(this.lastChangDy||0)+"px)";
            this.div.style["transform"]=transform;
            this.div.style["-ms-transform"]=transform;
            this.div.style["-moz-transform"]=transform;
            this.div.style["-webkit-transform"]=transform;
            this.div.style["-o-transform"]=transform;
            window.clearTimeout(this._timeoutDelayId);
            this._timeoutDelayId = window.setTimeout(
                SuperMap.Function.bind(function(){
                    this.tween&&this.tween.stop();
                    this.zoomAnimate(1,ratio);
                },this),this.zoomDelay);
        }

        if (bounds != null) {
            // 当grid为空，或是进行缩放必须重绘整个canvas
            var forceReTile = !me.grid.length || zoomChanged;
            // 获取所有tiles的bounds
            var tilesBounds = me.getTilesBounds();
            if (this.singleTile) {
                if ( forceReTile ||
                    (!dragging && !tilesBounds.containsBounds(bounds))) {
                    if(zoomChanged && this.transitionEffect !== 'resize') {
                        this.removeBackBuffer();
                    }
                    if(!zoomChanged || this.transitionEffect === 'resize') {
                        this.applyBackBuffer(resolution);
                    }
                    this.initSingleTile(bounds);
                }
            } else {
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
                    //判断是否第一次加载
                    if(this.isFirstLoad){
                        this.redrawCanvas = true;
                        this.inZoom = true;
                        this.isFirstLoad = false;

                        if(zoomChanged && this.transitionEffect === 'resize') {
                            this.applyBackBuffer(resolution);
                        }
                        this.initGriddedTiles(bounds);
                        this.lastCanvasPosition = this.map.getLonLatFromLayerPx(new SuperMap.Pixel(0,0));
                        this.lastResolution = resolution;
                    }else{
                        if (this.lastCanvasPosition&&this.lastResolution&&!this.map.isIEMultipTouch&&SuperMap.Browser.device==="pc") {
                            window.clearTimeout(this._timeoutId);
                            this._timeoutId = window.setTimeout(
                                SuperMap.Function.bind(function(){
                                    this.tween&&this.tween.stop();
                                    transform="";
                                    this.div.style["transform"]=transform;
                                    this.div.style["-ms-transform"]=transform;
                                    this.div.style["-moz-transform"]=transform;
                                    this.div.style["-webkit-transform"]=transform;
                                    this.div.style["-o-transform"]=transform;
                                    this.initGriddedTiles(bounds);
                                    //通过改变量计算canvas的地理位置。
                                    this.lastCanvasPosition = this.map.getLonLatFromLayerPx(new SuperMap.Pixel(0,0));
                                    this.lastResolution = this.map.getResolution();
                                }, this),
                                this.zoomDuration+this.zoomDelay);
                        } else {
                            this._timeoutId&&window.clearTimeout(this._timeoutId);
                            for(var i=0,len=this.grid.length;i<len;i++){
                                var row=this.grid[i];
                                for(var j=0,len0=row.length;j<len0;j++){
                                    var tile=row[j];
                                    tile&&tile.clear();
                                }
                            }
                            this.initGriddedTiles(bounds);
                            //通过改变量计算canvas的地理位置。
                            this.lastCanvasPosition = this.map.getLonLatFromLayerPx(new SuperMap.Pixel(0,0));
                            this.lastResolution = this.map.getResolution();               
                        }
                    }
                } else {
                    //地图平移时记录平移的偏移值
                    this.lastChangDx=left;
                    this.lastChangDy=top;
                    this.scheduleMoveGriddedTiles();
                }
            }
        }
    },

    /**
     * Method: zoomAnimate
     * 执行缩放动画,利用CSS3的transfrom属性进行缩放，并用Tween补间动画类对动画进行控制
     * */
    zoomAnimate:function(begin,finish){
        var me=this,step=6;
        var lefttop = me.map.getLayerPxFromLonLat(me.lastCanvasPosition).clone(),
            tween=me.tween=me.tween||new SuperMap.Tween(),
            offsetX=me.lastChangDx|| 0,offsetY=me.lastChangDy||0;
        var len=finish-begin;
        tween.INTERVAL=me.zoomDuration/step;
        tween.easing=SuperMap.Easing.Linear.easeInOut;
        me.isZoomming=true;
        tween.start([begin],[finish],step,{
            callbacks:{
                eachStep:function(value){
                    var scale=value[0],scaleOption=(scale-begin)/len,
                        dx = (lefttop.x-offsetX)*scaleOption||0,
                        dy =(lefttop.y-offsetY)*scaleOption|| 0;
                    dx+=offsetX;
                    dy+=offsetY;
                    var transform="translate("+dx+"px,"+dy+"px) "+"scale("+scale+")";
                    me.div.style["transform"]=transform;
                    me.div.style["-ms-transform"]=transform;
                    me.div.style["-moz-transform"]=transform;
                    me.div.style["-webkit-transform"]=transform;
                    me.div.style["-o-transform"]=transform;
                }
            }
        });
    },

    /**
     * Method: initGriddedTiles
     *  重写grid里的initGriddedTiles
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     */
    initGriddedTiles:function(bounds) {
        this.isZoomming = false;
        this.lastChangDx=0;
        this.lastChangDy=0;
        this.div.style.left="0px";
        this.div.style.top="0px";
        SuperMap.Layer.Grid.prototype.initGriddedTiles.apply(this,arguments);
        this.lenRow = this.grid.length;
        this.lenColumn = this.grid[0].length;
    },
    /**
     * Method: getURL
     * 根据瓦片的bounds获取URL。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {String} 瓦片的URL。
     */
    getURL: function (bounds) {
        var me = this,
            xyz;
        bounds = me.adjustBounds(bounds);
        xyz = me.getXYZ(bounds);
        return {url:me.getTileUrl(xyz),xyz:xyz};
    },
    /**
     * Method: getXYZ
     * 根据瓦片的bounds获取xyz值。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。
     */
    getXYZ: function (bounds) {
        var me = this,
            x, y, z,
            map = me.map,
            res = map.getResolution(),
            tOrigin = me.getTileOrigin(),
            tileSize = me.tileSize;
        x = Math.round((bounds.left - tOrigin.lon) / (res * tileSize.w));
        y = Math.round((tOrigin.lat - bounds.top) / (res * tileSize.h));
        z = map.getZoom();
        return {"x": x, "y": y, "z": z};
    },

    /**
     * Method: getMemoryTile
     * 根据矢量瓦片的bounds获取内存中该记录的矢量瓦片要素。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  矢量瓦片的bounds。
     *
     * Returns:
     * {Object} tileFeature对象，不存在返回null
     */
    getMemoryTile: function(bounds){
        var me = this, key = me.getXYZ(bounds);
        key = "x" + key.x + "y" + key.y + "z" + key.z;
        return me.memoryTile[key];
    },

    /**
     * Method: addMemoryTile
     * 记录瓦片bounds和对应的矢量瓦片要素信息。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  矢量瓦片的bounds。
     * tileFeature - {<Image>} 矢量瓦片对应的要素信息
     *
     */
    addMemoryTile:function(bounds, tileFeature,key){

        var me = this;

        if(me.bufferTileCount == 0){
            return;
        }
        var key = key||me.getXYZ(bounds);
        if(key&&key!=""){
            //删除缓存矢量瓦片要素
            if(me.memoryKeys.length >= me.bufferTileCount){
                var keyDel = me.memoryKeys.shift();
                me.memoryTile[keyDel] = null;
                delete me.memoryTile[keyDel];
            }
            var key = "x" + key.x + "y" + key.y + "z" + key.z;
            //缓存矢量瓦片要素并保存索引。
            me.memoryTile[key] = tileFeature;
            me.memoryKeys.push(key);
        }
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
        if (!scale)scale = this.getScaleForZoom(xyz.z);
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
            "width": tileSize.w,
            "height": tileSize.h,
            "x": xyz.x,
            "y": xyz.y,
            "scale": scale
        };
        if (SuperMap.Credential.CREDENTIAL) {
            newParams[SuperMap.Credential.CREDENTIAL.name] = SuperMap.Credential.CREDENTIAL.getValue();
        }
        if (!me.params.cacheEnabled) {
            newParams.t = new Date().getTime();
        }
        if (typeof me.params.layersID !== "undefined" && typeof newParams.layersID === "undefined") {
            if (me.params.layersID && me.params.layersID.length > 0) {
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
    getFullRequestString: function (newParams, altUrl) {
        var me = this,
            url = altUrl || this.url,
            allParams, paramsString, urlParams;
        allParams = SuperMap.Util.extend({}, me.params),
            allParams = SuperMap.Util.extend(allParams, newParams);

        if (allParams.overlapDisplayed === false) {
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
        url = url + "/tileFeature.json";//+ me.format;
        urlParams = SuperMap.Util.upperCaseObject(SuperMap.Util.getParameters(url));
        for (var key in allParams) {
            if (key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = SuperMap.Util.getParameterString(allParams);
        if (me.tileOrigin) {
            paramsString = paramsString + "&origin={\"x\":" + me.tileOrigin.lon + "," + "\"y\":" + me.tileOrigin.lat + "}";
        }
        if (me.overlapDisplayed === false) {
            me.overlapDisplayedOptions = me.overlapDisplayedOptions ? me.overlapDisplayedOptions : new SuperMap.REST.OverlapDisplayedOptions();
            paramsString += "&overlapDisplayed=false&overlapDisplayedOptions=" + me.overlapDisplayedOptions.toString();
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
     * Method:  addTile
     * 重写父类方法
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * position
     * @returns {*}
     */
    addTile: function (bounds, position) {
        var tile = new this.tileClass(
            this, position, bounds, null, this.tileSize, this.tileOptions
        );
        this.events.triggerEvent("addtile", {tile: tile});
        return tile;
    },

    /**
     * Method: getVectorStyles
     * 获取服务端的矢量瓦片样式表，格式为CartoCSS
     * */
    getVectorStyles: function(){
        var me = this;
        var layersUrl = me.url + "/tileFeature/vectorstyles.json";
        var isInTheSameDomain=SuperMap.Util.isInTheSameDomain(layersUrl);
        if(!isInTheSameDomain){
            layersUrl=layersUrl.replace(/.json/,".jsonp");
        }
		if(SuperMap.Credential.CREDENTIAL){
			layersUrl = layersUrl + "?" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
		}
        SuperMap.Util.committer({
            url:layersUrl,
            isInTheSameDomain:isInTheSameDomain,
            method:"GET",
            success:function(isInTheSameDomain){
                return function(result){
                    var styles = isInTheSameDomain?new SuperMap.Format.JSON().read(result.responseText):result;
                    if(!styles){
                        return;
                    }
                    if(styles.style && styles.type === 'cartoCSS'){
                        var style = styles.style;
                        style = style.replace(/[@]/gi,"___");
                        style = style.replace(/\\#/gi,"___");
                        style = style.replace(/[#]/gi,"\n#");
                        //将zoom转化为scale，以免引起混淆
                        style = style.replace(/\[zoom/gi,"[scale");
                        me.setCartoCSS(style,true);
                    }
                    if (me.mapServiceInitialized) {
                        me.events.triggerEvent('layerInitialized', me);
                    }
                }
            }(isInTheSameDomain),
            failure:function(){
                if (me.mapServiceInitialized) {
                    me.events.triggerEvent('layerInitialized', me);
                }
            },
            scope:me
        });
    },

    /**
     * Method:  initializeLayersInfo
     * 初使化图层信息。
     */
    initializeLayersInfo: function () {
        var me = this;
        var layersUrl = me.url + "/layers.json";
        var isInTheSameDomain=SuperMap.Util.isInTheSameDomain(layersUrl);
        if(!isInTheSameDomain){
            layersUrl=layersUrl.replace(/.json/,".jsonp");
        }
		if(SuperMap.Credential.CREDENTIAL){
			layersUrl = layersUrl + "?" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
		}
        SuperMap.Util.committer({
            url:layersUrl,
            isInTheSameDomain:isInTheSameDomain,
            method:"GET",
            success:function(isInTheSameDomain){
                return function(result){
                    me.layersInfoInitialized = true;
                    me.layersInfo = isInTheSameDomain?new SuperMap.Format.JSON().read(result.responseText):result;
                    if(!me.layersInfo){
                        return;
                    }
                    var layersInfo={};
                    for(var i= 0,len=me.layersInfo.length;i<len;i++){
                        var layers=me.layersInfo[i].subLayers.layers;
                        for(var j= 0,len1=layers.length;j<len1;j++){
                            layers[j].layerIndex=len1-j;
                            layersInfo[layers[j].name]=layers[j];
                        }
                    }
                    me.layersInfo=layersInfo;
                    if(!this.donotNeedServerCartoCss){
                        me.getVectorStyles();
                    }else if (me.mapServiceInitialized){
                        me.events.triggerEvent('layerInitialized', me);
                    }
                }
            }(isInTheSameDomain),
            failure:function(){

            },
            scope:me
        });
    },
    /**
     * APIMethod: getFeature
     * 根据像素坐标获取该坐标对应的几何对象。
     *
     * Parameters:
     *  i - {Number}  纵向像素坐标。
     *  j - {Number}  横向像素坐标。
     *
     * Returns:
     * {Object}  返回对像包含两个属性：layer,geometry。layer为几何对象对应的图层名，geometry记录了几何对象的id和坐标信息。
     */
    getFeature: function (i, j) {
        var lonLat = this.map.getLonLatFromPixel({"x": i, "y": j});
        if (!lonLat) {
            return null;
        }
        var tileInfo = this.getTileData(lonLat);
        if (!tileInfo) {
            return null;
        }
        var featureInfoes = tileInfo.tile.getFeatureInfoes(tileInfo.i, tileInfo.j);
        featureInfoes.xy = {x:i,y:j};
        return featureInfoes;
    },
    /**
     * APIMethod: highlightFeatures
     * 高亮显示一个或者多个几何对象。
     *
     * Parameters:
     * featureInfoes - {Array}|{Object}  此参数可以是数组也可以是对象，每个对象都必须有featureId与layerId两个属性
     *
     */
    highlightFeatures: function (featureInfo) {
        this.unHightlightFeatureInfo = this.hightlightFeatureInfo;
        this.hightlightFeatureInfo = featureInfo;
        this.activeHighLightFeature = true;
        this.unHightlightFeature = false;
        this.refresh(null,featureInfo && featureInfo.cartoLayer);
    },

    /**
     * APIMethod: unHightlightFeatures
     * 不高亮显示任何要素
     * */
    unHightlightFeatures:function(){
        this.activeHighLightFeature = false;
        this.unHightlightFeatureInfo = this.hightlightFeatureInfo;
        this.hightlightFeatureInfo = null;
        this.unHightlightFeature = true;
        this.refresh();
    },

    /**
     * APIMethod: refresh
     * 当地图需要刷新，但又不需要重新向服务器请求数据时，可调此方法对地图进行重绘
     * 此方法不对新设置的CartoCSS进行实时处理
     * */
    refresh:function(){
        for (var i = 0,len00=this.grid.length; i < len00; i++) {
            var rowTiles = this.grid[i];
            for (var j = 0,len01=rowTiles.length; j < len01; j++) {
                rowTiles[j].refresh();
            }
        }
    },

    /**
     * Method: registerMouseEvent
     * 向map注册click事件或者mousemove事件
     * */
    registerMouseEvent:function(type){
        if(this.mouseEventHandler&&this.mouseEventHandler[type])return;
        var map=this.map;
        var obj={};
        obj[type]=function(that,type){
            return function(evt){
                if (!evt.xy||!evt.xy.x) {
                    return;
                }
                if(type==="touchend"){
                    type="click";
                }
                var featureInfo = that.getFeature(evt.xy.x, evt.xy.y);
                var checked=false;
                var hltype={type:null};
                if(featureInfo&&featureInfo.cartoLayer){
                    var hlShaders=that.hightlightShaders&&that.hightlightShaders[type]||[];
                    for(var i= 0,len=hlShaders.length;i<len;i++){
                        if(hlShaders[i].length<1)continue;
                        var elements=hlShaders[i].elements;
                        checked=check(featureInfo.cartoLayer,elements,hltype);
                        if(checked&&hlShaders[i].featureFilter){
                            checked=hlShaders[i].featureFilter(featureInfo.featureId);
                        }
                        if(checked){
                            that.currentHightlightShader=hltype.type==="single"?hlShaders[i]:null;
                            that.wholeHightligthtShader=hltype.type==="whole"?hlShaders[i]:null
                            break;
                        }
                    }
                }
               if(checked){
                   that.highlightEventType=type;
                   //高亮显示
                   that.highlightFeatures(featureInfo);
               }else{
                   if(that.highlightEventType==="mousemove"||(that.highlightEventType==="click"&&type==="click")){
                       that.highlightEventType=null;
                       that.unHightlightFeatures();
                   }
               }

                function check(cartoLayer,elements,hltype){
                    if(elements.length<1){
                        return false;
                    }
                    for(var j= 0,len1=elements.length;j<len1;j++){
                        var element=elements[j];
                        var type=element.type;
                        if(type==="wildcard"){
                            hltype.type="whole";
                            return true;
                        }
                        if(cartoLayer[type]!==element.clean){
                            return false;
                        }
                    }
                    hltype.type="single";
                    return true;
                }
            }
        }(this,type);
        this.mouseEventHandler=this.mouseEventHandler||{};
        this.mouseEventHandler[type]=this.mouseEventHandler[type]||{};
        this.mouseEventHandler[type]=obj[type];
        map.events.on(obj);
    },

    /**
     * Method: unRegisterMouseEvent
     * 取消事件注册
     * */
    unRegisterMouseEvent:function(type){
        if(!this.mouseEventHandler||!this.mouseEventHandler[type])return;
        var map=this.map;
        var mouseEvtHandlers=this.mouseEventHandler[type];
        for(var i=mouseEvtHandlers.length-1;i>=0;i--){
            map.events.un(mouseEvtHandlers[i]);
        }
        this.mouseEventHandler[type]=null;
    },

    /**
     * Method: initResolutions
     * 初始化Resolutions数组。（重写基类方法）
     */
    initResolutions: function () {
        // 我们想要得到resolutions，以下是我们的策略：
        // 1. 如果在layer配置中定义了resolutions和scales，使用它们，
        // 2. 如果在layer配置中定义resolutions，使用它，
        // 3. 否则，如果在layer配置中定义scales，那么从这些scales中得出resolutions，
        // 4. 再者，试图从在layer配置中设置的 maxResolution,minResolution, numZoomLevels, maxZoomLevel 计算出resolutions，
        // 5. 如果在map中设置了resolutions和scales，使用它们，
        // 6. 如果我们仍然没有获得resolutions，并且resolutions在map中已经定义了，使用它们，
        // 7. 否则，如果scales在map中定义了，那么从scales中得出resolutions，
        // 8. 再者，试图从在map中设置的maxResolution, minResolution, numZoomLevels, maxZoomLevel 计算出resolutions。

        var me = this,
            i, len, p, startZoomLevel,
            props = {},
            alwaysInRange = true;

        //如果在layer中定义了resolutions和scales，直接使用layer的resolutions和scales，并且通过它们计算出
        //maxResolution, minResolution, numZoomLevels, maxScale和minScale
        if (me.resolutions && me.scales) {
            var len = me.resolutions.length;
            me.resolutions.sort(function(a, b) {
                return (b - a);
            });
            if (!me.maxResolution) {
                me.maxResolution = me.resolutions[0];
            }

            if (!me.minResolution) {
                me.minResolution = me.resolutions[len-1];
            }
            me.scales.sort(function(a, b) {
                return (a - b);
            });
            if (!me.maxScale) {
                me.maxScale = me.scales[len-1];
            }

            if (!me.minScale) {
                me.minScale = me.scales[0];
            }
            me.numZoomLevels = len;
            return;
        }

        // 从layer的配置中获得计算resolutions的数据。
        for (i = 0, len = me.RESOLUTION_PROPERTIES.length; i < len; i++) {
            p = me.RESOLUTION_PROPERTIES[i];
            props[p] = me.options[p];
            if (alwaysInRange && me.options[p]) {
                alwaysInRange = false;
            }
        }

        if (me.alwaysInRange == null) {
            me.alwaysInRange = alwaysInRange;
        }

        // 如果没有得到resolutions，利用scales计算resolutions。
        if (props.resolutions == null) {
            props.resolutions = me.resolutionsFromScales(props.scales);
        }

        // 如果仍没有得到resolutions，利用layer配置中设置的
        //maxResolution,minResolution, numZoomLevels, maxZoomLevel 计算出resolutions
        if (props.resolutions == null) {
            props.resolutions = me.calculateResolutions(props);
        }

        //如果没有从layer的配置数据中获得resolutions，并且map中同时设置了resolutions和scales，直接使用它们，
        //并且通过它们计算出maxResolution, minResolution, numZoomLevels, maxScale和minScale
        if (me.map.resolutions && me.map.scales) {
            me.resolutions = me.map.resolutions;
            me.scales = me.map.scales;
            var len = me.resolutions.length;
            me.resolutions.sort(function(a, b) {
                return (b - a);
            });
            if (!me.maxResolution) {
                me.maxResolution = me.resolutions[0];
            }

            if (!me.minResolution) {
                me.minResolution = me.resolutions[len-1];
            }
            me.scales.sort(function(a, b) {
                return (a - b);
            });
            if (!me.maxScale) {
                me.maxScale = me.scales[len-1];
            }

            if (!me.minScale) {
                me.minScale = me.scales[0];
            }
            me.numZoomLevels = len;
            return;
        }

        //如果此时仍没有计算出resolutions，那么先从baselayer上获取,之后从map中获得（方法同上），最后再计算。
        if (props.resolutions == null) {
            for (i = 0, len = me.RESOLUTION_PROPERTIES.length; i<len; i++) {
                p = me.RESOLUTION_PROPERTIES[i];
                props[p] = me.options[p] != null ?
                    me.options[p] : me.map[p];
            }
            if (props.resolutions == null) {
                props.resolutions = me.resolutionsFromScales(props.scales);
            }
            if (props.resolutions == null) {
                if(me.map.baseLayer!=null){
                    props.resolutions = me.map.baseLayer.resolutions;
                }
            }
            if (props.resolutions == null) {
                props.resolutions = me.calculateResolutions(props);
            }
        }

        var maxRes;
        if (me.options.maxResolution && me.options.maxResolution !== "auto") {
            maxRes = me.options.maxResolution;
        }
        if (me.options.minScale) {
            maxRes = SuperMap.Util.getResolutionFromScaleDpi(me.options.minScale, me.dpi, me.units, me.datumAxis);
        }

        var minRes;
        if (me.options.minResolution && me.options.minResolution !== "auto") {
            minRes = me.options.minResolution;
        }
        if (me.options.maxScale) {
            minRes = SuperMap.Util.getResolutionFromScaleDpi(me.options.maxScale, me.dpi, me.units, me.datumAxis);
        }

        if (props.resolutions) {

            props.resolutions.sort(function(a, b) {
                return (b - a);
            });

            if (!maxRes) {
                maxRes = props.resolutions[0];
            }

            if (!minRes) {
                var lastIdx = props.resolutions.length - 1;
                minRes = props.resolutions[lastIdx];
            }
        }

        me.resolutions = props.resolutions;
        if (me.resolutions) {
            len = me.resolutions.length;
            me.scales = [len];
            if(me.map.baseLayer){
                startZoomLevel = this.calculateResolutionsLevel(me.resolutions);
            }
            else{
                startZoomLevel = 0;
            }
            for (i = startZoomLevel; i < len + startZoomLevel; i++) {
                me.scales[i] = SuperMap.Util.getScaleFromResolutionDpi(me.resolutions[i- startZoomLevel], me.dpi, me.units, me.datumAxis);
            }
            me.numZoomLevels = len;
        }
        me.minResolution = minRes;
        if (minRes) {
            me.maxScale = SuperMap.Util.getScaleFromResolutionDpi(minRes, me.dpi, me.units, me.datumAxis);
        }
        me.maxResolution = maxRes;
        if (maxRes) {
            me.minScale = SuperMap.Util.getScaleFromResolutionDpi(maxRes, me.dpi, me.units, me.datumAxis);
        }
    },
    /**
     * Method: resolutionsFromScales
     * 根据scales数组计算resolutions数组。（重写基类方法）
     *
     * Parameters:
     * scales - {Array({Number})}scales数组。
     */
    resolutionsFromScales: function (scales) {
        if (scales == null) {
            return;
        }
        var me = this,
            resolutions, len;
        len = scales.length;
        resolutions = [len];
        for (var i = 0; i < len; i++) {
            resolutions[i] = SuperMap.Util.getResolutionFromScaleDpi(
                scales[i], me.dpi, me.units, me.datumAxis);
        }
        return resolutions;
    },
    /**
     * Method: calculateResolutions
     * 根据已提供的属性计算resolutions数组。（重写基类方法）
     *
     * Parameters:
     * props - {Object}
     *
     * Return:
     * {Array({Number})} resolutions数组.
     */
    calculateResolutions: function (props) {
        var me = this,
            maxResolution = props.maxResolution;
        if (props.minScale != null) {
            maxResolution = SuperMap.Util.getResolutionFromScaleDpi(props.minScale, me.dpi, me.units, me.datumAxis);
        } else if (maxResolution === "auto" && me.maxExtent != null) {
            var viewSize, wRes, hRes;
            viewSize = me.map.getSize();
            wRes = me.maxExtent.getWidth() / viewSize.w;
            hRes = me.maxExtent.getHeight() / viewSize.h;
            maxResolution = Math.max(wRes, hRes);
        }

        var minResolution = props.minResolution;
        if (props.maxScale != null) {
            minResolution = SuperMap.Util.getResolutionFromScaleDpi(props.maxScale, me.dpi, me.units, me.datumAxis);
        } else if (props.minResolution === "auto" && me.minExtent != null) {
            var viewSize, wRes, hRes;
            viewSize = me.map.getSize();
            wRes = me.minExtent.getWidth() / viewSize.w;
            hRes = me.minExtent.getHeight()/ viewSize.h;
            minResolution = Math.max(wRes, hRes);
        }

        if(typeof maxResolution !== "number" &&
            typeof minResolution !== "number" &&
            this.maxExtent != null) {
            // maxResolution for default grid sets assumes that at zoom
            // level zero, the whole world fits on one tile.
            var tileSize = this.map.getTileSize();
            maxResolution = Math.max(
                this.maxExtent.getWidth() / tileSize.w,
                this.maxExtent.getHeight() / tileSize.h
            );
        }

        var maxZoomLevel = props.maxZoomLevel;
        var numZoomLevels = props.numZoomLevels;
        if (typeof minResolution === "number" &&
            typeof maxResolution === "number" && numZoomLevels === undefined) {
            var ratio = maxResolution / minResolution;
            numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
        } else if (numZoomLevels === undefined && maxZoomLevel != null) {
            numZoomLevels = maxZoomLevel + 1;
        }

        if (typeof numZoomLevels !== "number" || numZoomLevels <= 0 ||
            (typeof maxResolution !== "number" &&
                typeof minResolution !== "number")) {
            return;
        }

        var resolutions = [numZoomLevels];
        var base = 2;
        if (typeof minResolution === "number" && typeof maxResolution === "number") {
            base = Math.pow(
                (maxResolution / minResolution),
                (1 / (numZoomLevels - 1))
            );
        }

        if (typeof maxResolution === "number") {
            for (var i = 0; i < numZoomLevels; i++) {
                resolutions[i] = maxResolution / Math.pow(base, i);
            }
        } else {
            for (i = 0; i < numZoomLevels; i++) {
                resolutions[numZoomLevels - 1 - i] =
                    minResolution * Math.pow(base, i);
            }
        }

        return resolutions;
    },
    CLASS_NAME: "SuperMap.Layer.TiledVectorLayer"
});
