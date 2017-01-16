/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/Events.js
 * @requires SuperMap/Tween.js
 * @requires SuperMap/Projection.js
 */

/**
 * Class: SuperMap.Map
 * 地图类。
 * 用于实例化map类创建一个新地图，实现地图在客户端的交互操作，可通过给创建的map添加图层和控件来扩展应用，
 * 在创建地图时，如果没有添加指定的控件，则默认Navigation、PanZoomBar控件。
 */  
SuperMap.Map = SuperMap.Class({

 /**
     * Constant: Z_INDEX_BASE
     * {Object} 不同的类的基本z-index值。
     */
    Z_INDEX_BASE: {
        BaseLayer: 100,
        Overlay: 325,
        Feature: 525,
        Marker: 750,
        Popup: 1000,
        Control: 1250
    },

    /**
     * Constant: EVENT_TYPES
     * 支持应用事件的类型。
     *
     * {Array(String)} 支持应用事件的类型。为一个特殊的事件注册一个监听对象使用下面的方法:
     *
     * (code)
     * map.events.register(type, obj, listener);
     * (end)
     *
     * 监听对象将会作为事件对象的参考，事件的属性将取决于所发生的事情。
     *
     * 所有的事件对象都有下面的这些属性:
     *  - *object* {Object} 发出浏览器事件的对象。
     *  - *element* {DOMElement} 浏览器接收事件的DOM元素。
     *
     * 浏览器事件有以下附加的属性:
     *  - *xy* {<SuperMap.Pixel>} 事件触发的像素位置（相对于地图视口）。
     *  - 其他的属性来源于浏览器事件.
     *
     * 支持地图事件类型:
     *  - *preaddlayer* 图层被添加之前被触发。事件对象包含 *layer* 属性来指明添
     *     加的图层。当监听函数返回“false”表示无法添加图层。
     *  - *addlayer* 图层被添加之后被触发。事件对象包含 *layer* 属性来指明添加
     *     的图层。
     *  - *preremovelayer* 图层被移除之前触发。事件对象包含 *layer* 属性来指明
     *     要被移除的图层。当监听函数返回“false”表示无法移除该图层。
     *  - *removelayer* 图层被移除后触发。事件对象包含 *layer* 属性来指明要被移
     *     除的图层。
     *  - *changelayer* 当一个图层的名称（name）、顺序（order）、透明度
     *     （opcity）、参数个数（params）、可见性（visibility）（由可见比例引
     *     起）或属性（attribution）发生改变时被触发。监听者会接收到一个事件
     *     对象，该事件对象包含 *layer* 和 *property* 属性，其中 *layer* 属性
     *     指明发生变化的图层， *property* 属性是代表变化属性的关键字（name,
     *     order, opacity, params, visibility or attribution）。
     *  - *movestart* drag，pan或zoom操作开始时会触发该事件。
     *  - *move* drag，pan或zoom操作开始后被触发。
     *  - *moveend* drag，pan或zoom操作完成时被触发。
     *  - *zoomend* zoom操作完成后被触发。
     *  - *mouseover* 鼠标移至地图时被触发。
     *  - *mouseout* 鼠标移出地图时被触发。
     *  - *mousemove* 鼠标在地图上移动时被触发。
     *  - *mouseup* 鼠标在地图上释放时被触发。
     *  - *click* 鼠标在地图上单击时被触发。
     *  - *changebaselayer* 改变基础图层时触发事件。
     */
    EVENT_TYPES: [ 
        "preaddlayer", "addlayer","preremovelayer", "removelayer", 
        "changelayer", "movestart",
        "move", "moveend", "zoomend", "popupopen", "popupclose",
        "addmarker", "removemarker", "clearmarkers", "mouseover",
        "mouseout", "mousemove", "dragstart", "drag", "dragend",
        "changebaselayer"],

    /**
     * Property: id
     * {String} Unique identifier for the map
     */
    id: null,
    
    /**
     * Property: isIESingleTouch
     * {String} 在IE10及windows应用商店中，主要用来解决多点触摸同时触发MSGestureChange和mousemove两个事件, 设置该变量为false，用来禁用DragPan.js中的地图平移事件。默认为true。
     */
    isIESingleTouch: true,
    
    /**
     * Property: isIEMultipeTouch
     * {String} 在IE10及windows应用商店中，主要用来解决多点触摸结束时清除早期的鼠标双击和鼠标滚轮的缩放动画。默认为 false。
     */
    isIEMultipeTouch: false,
    
    /**
     * APIProperty: fractionalZoom
     * {Boolean}
     * 允许地图缩放到比例尺数组中任意两个比例尺之间的值，默认为false
     *
     *当该属性设置为true时，地图可以缩放到任意范围。但是前提需要服务端是动态图层，支持任意比例尺（比如：TiledDynamicRESTLayer），预缓存图层则不支持该属性，例如（CloudLayer，SimpleCachedLayer）
     *
     *当你使用fractionalZoom，你需要通过getResolutionForZoom获取Resolution，而不是layer.resolutions[zoom]
     */
    fractionalZoom: false,
    
    /**
     * APIProperty: events
     * {SuperMap.Events} 事件对象,负责触发地图上的所有事件。
     */
    events: null,
    
    /**
     * APIProperty: allOverlays
     * {Boolean} 地图所有图层都被当做叠加图层来使用，默认是false。如果设置为 true，则图层相互叠加，
     * 最先绘制的图层可以被视为是底图（显示效果上的底图,但其isBaseLayer为false）；
     * 而且所有将要添加的图层的”isBaseLayer”属性在添加的时候都会被默认修改成false。。
     *
     * 提示:
     * 如果将map.allOverlays设置为true，则不能设置map.setBaseLayer 
     *     或者layer.setIsBaseLayer。当设置了allOverlays属性为true时，位于显示索引最
     *     下边的图层会被当做"base layer"，所以，如果想要更改"base layer"，使用
     *      <setLayerIndex>  或者  <raiseLayer>  将图层的index设置为0。
     */
    allOverlays: false,

    /**
     * APIProperty: div
     * {DOMElement|String} 装载地图的DOM元素（或一个元素的id值），如果
     *     调用 <SuperMap.Map> 构造函数的时候传递两个参数，它将作为第一
     *     个参数。此外，构造函数也能够只接收选项(options)对象作为唯一的参
     *     数，这种情况下，div属性可能会也可能不会被提供。如果div属性没有
     *     被提供，稍后可以使用 <render> 方法指定地图渲染的地方。
     *     
     * 提示：
     * 如果在地图定义以后使用 <render> 来指定渲染位置，不要将 <maxResolution>
     *     属性设置为auto，而是使用 <maxExtent> 指定你所期望的最大范围。
     */
    div: null,
    
    /**
     * Property: dragging
     * {Boolean} The map is currently being dragged.
     */
    dragging: false,

    /**
     * Property: size
     * {<SuperMap.Size>} Size of the main div (this.div)
     */
    size: null,
    
    /**
     * Property: viewPortDiv
     * {HTMLDivElement} The element that represents the map viewport
     */
    viewPortDiv: null,

    /**
     * Property: layerContainerOrigin
     * {<SuperMap.LonLat>} The lonlat at which the later container was
     *                       re-initialized (on-zoom)
     */
    layerContainerOrigin: null,

    /**
     * Property: layerContainerDiv
     * {HTMLDivElement} The element that contains the layers.
     */
    layerContainerDiv: null,
    
    /**
     * Property: layerContainerDivCanvas
     * {HTMLDivElement} 这个div专放canvaslayer生成的图层。
     */
    //layerContainerDivCanvas: null,

    /**
     * APIProperty: layers
     * {Array(<SuperMap.Layer>)} 地图上图层的有序列表。
     */
    layers: null,

    /**
     * Property: controls
     * {Array(<SuperMap.Control>)} List of controls associated with the map.
     *
     * If not provided in the map options at construction, the map will
     *     be given the following controls by default:
     *  - <SuperMap.Control.Navigation>
     *  - <SuperMap.Control.PanZoomBar>
     */
    controls: null,

    /**
     * APIProperty: popups
     * {Array(<SuperMap.Popup>)} 地图上的弹窗列表。
     */
    popups: null,

    /**
     * APIProperty: baseLayer
     * {<SuperMap.Layer>}  用来确定min/max zoom level、projection等属性。
     */
    baseLayer: null,
    
    /**
     * Property: center
     * {<SuperMap.LonLat>} The current center of the map
     */
    center: null,

    /**
     * Property: resolution
     * {Float} The resolution of the map.
     */
    resolution: null,

    /**
     * Property: zoom
     * {Integer} The current zoom level of the map
     */
    zoom: 0,    

    /**
     * Property: panRatio
     * {Float} The ratio of the current extent within
     *         which panning will tween.
     */
    panRatio: 1.5,    

    /**
     * Property: viewRequestID
     * {String} Used to store a unique identifier that changes when the map 
     *          view changes. viewRequestID should be used when adding data 
     *          asynchronously to the map: viewRequestID is incremented when 
     *          you initiate your request (right now during changing of 
     *          baselayers and changing of zooms). It is stored here in the 
     *          map and also in the data that will be coming back 
     *          asynchronously. Before displaying this data on request 
     *          completion, we check that the viewRequestID of the data is 
     *          still the same as that of the map. Fix for #480
     */
    viewRequestID: 0,

  // Options

     /**
     * APIProperty: tileSize
     * {<SuperMap.Size>} 在地图选项中被设置，用来设置地图上默认瓦片尺寸。
     */
    tileSize: null,

    /**
     * APIProperty: projection
     * {String} 在地图选项中被设置，用来指定地图添加图层的默认投影。同时
     *           也可以选择设置maxExtent、 maxResolution、 和 units等属性。该项
     *           默认值是"EPSG:4326"。
     */
    projection: "EPSG:4326",    
        
    /**
     * APIProperty: units
     * {String} 地图的单位。默认是'degrees'。可选值为'degrees'(或者 'dd'),
     *     'm','ft','km','mi','inches'。
     */
    units: 'degrees',

    /**
     * APIProperty: resolutions
     * {Array(Float)} 降序排列的地图分辨率数组 (地图上每个像素代表的尺寸)  
     *     如果在构造图层时没有设置该属性，可通过比例尺相关的属
     *     性（例如：maxExtent, maxResolution, maxScale等）计算获得。
     */
    resolutions: null,

    /**
     * APIProperty: maxResolution
     * {Float}  用于地图实例化的时候设置最大分辨率（设置该值可以使地图在分辨率达到某个值的时候无法
     *     再缩小）。当不想将整张地图都展示在通过 <tileSize> 指定大小的一张瓦
     *     片上的时候设置该值。设置为auto的时候地图会自适应视口大小。
     */
    maxResolution: null,

    /**
     * APIProperty: minResolution
     * {Float} 用于地图实例化的时候设置最小分辨率（设置该值可以使地图在分辨率达到某个值的时候无法
     *     再放大）。
     */
    minResolution: null,

    /**
     * APIProperty: maxScale
     * {Float} 用于地图实例化的时候设置最大比例（设置该值可以使地图在比例达到某个值的时候无法
     *     再放大）。
     */
    maxScale: null,

    /**
     * APIProperty: minScale
     * {Float} 用于地图实例化的时候设置最小比例（设置该值可以使地图在比例达到某个值的时候无法
     *     再缩小）。
     */
    minScale: null,

    /**
     * APIProperty: maxExtent
     * {<SuperMap.Bounds>} 用于地图实例化的时候设置地图的最大范围。默认是(-180, -90, 180, 90)。
     */
    maxExtent: null,
    
    /**
     * APIProperty: minExtent
     * {<SuperMap.Bounds>} 用于地图实例化的时候设置地图的最小范围。 默认值是null。
     */
    minExtent: null,
    
    /**
     * APIProperty: restrictedExtent
     * {<SuperMap.Bounds>} 限定地图缩放范围。
     *     如果设置了restrictedExtent, 平移将会被限制在指定的边界内。
     */
    restrictedExtent: null,

    /**
     * APIProperty: numZoomLevels
     * {Integer} 用于地图实例化的时候设置地图缩放级别的数量。默认值16，当需要的时候可以在地图选项中设置
     * 其他的值。
     */
    numZoomLevels: 16,

    /**
     * APIProperty: theme
     * {String} 要加载的主题风格的CSS文件的相对路径。如果想通过直接在页
     *          面添加层叠样式表链接或样式声明来设置样式，那就应该在地图属
     *          性（options）对象中指定为null（例如：{theme: null}）。
     */
    theme: null,
    
    /** 
     * APIProperty: displayProjection
     * {<SuperMap.Projection>} 将投影设置为除EPSG:4326 或
     *      EPSG:900913/EPSG:3857以外的投影，需要proj4js的支持。该投影用
     *      于通过控件（controls）向用户展示数据。如果设置了该属性，它就会
     *      被设置到任何一个在添加到地图上的时候displayProjection属性为null的
     *      控件上。
     * 
     */
    displayProjection: null,

    /**
     * APIProperty: fallThrough
     * {Boolean} 用来设置页面元素是否会接收地图触发的事件，默认是 true.
     */
    fallThrough: true,
    
    /**
     * Property: panTween
     * {SuperMap.Tween} Animated panning tween object, see panTo()
     */
    panTween: null,

    /**
     * APIProperty: eventListeners
     * {Object} 如果在构造方法中设置此选项，事件监听对象将注册。
     */
    eventListeners: null,

    /**
     * APIProperty: panMethod
     * {Function} 作用于平移时的动画效果方法，设置为null时，动画平移将关闭。
     */
    panMethod: SuperMap.Easing.Expo.easeOut,
    
    /**
     * Property: panDuration
     * {Integer} The number of steps to be passed to the
     * SuperMap.Tween.start() method when the map is
     * panned.
     * Default is 50.
     */
    panDuration: 50,
    
    /**
     * Property: paddingForPopups
     * {<SuperMap.Bounds>} Outside margin of the popup. Used to prevent 
     *     the popup from getting too close to the map border.
     */
    paddingForPopups : null,
    
    /**
     * Property: minPx
     * {<SuperMap.Pixel>} Lower left of maxExtent in viewport pixel space.
     *     Used to verify in moveByPx that the new location we're moving to
     *     is valid. It is also used in the getLonLatFromViewPortPx function
     *     of Layer.
     */
    minPx: null,
    
    /**
     * Property: maxPx
     * {<SuperMap.Pixel>} Top right of maxExtent in viewport pixel space.
     *     Used to verify in moveByPx that the new location we're moving to
     *     is valid.
     */
    maxPx: null,


    /**
     * Property： centerPixelOffset
     * {<SuperMap.Pixel>}
     * 保存用滚轮进行缩放时缩放中心点的偏移值
     */
    centerPixelOffset: new SuperMap.Pixel(0,0),

   /**
    * APIProperty: minZoom
    * {Number} 地图最小缩放级别。
    * （自 8.1 新增）
    */
    minZoom: null,

   /**
    * APIProperty: maxZoom
    * {Number} 地图最大缩放级别。
    * （自 8.1 新增）
    */
    maxZoom: null,
    
    /**
     * Constructor: SuperMap.Map
     * 实例化 Map 类。
     *
     * Parameters:
     * div - {DOMElement|String} 页面上装载地图的DOM元素，当设置了 <div>
     *     选项（option）或稍后调用 <render> 方法时可以省略。
     * options - {Object} 地图的选项设置，如果在此参数中没有对controls进行设置，则默认Navigation、PanZoomBar控件。
     *
     * Examples:
     * (code)
     * // 在id为map1的页面元素中创建一个map地图对象。
     * var map = new SuperMap.Map("map1");
     *
     * var options = {
     *     maxExtent: new SuperMap.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * };
     * //在id为map2的页面元素中创建一个map地图对象。
     * var map = new SuperMap.Map("map2", options);
     *
     * // 为地图的属性设置div、options参数。
     * var map = new SuperMap.Map({
     *     div: "map_id",
     *     maxExtent: new SuperMap.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * });
     * // 为地图的属性设置options参数。
     * var map = new SuperMap.Map({
     *     maxExtent: new SuperMap.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * });
     *
     * //用addControls方法为地图添加控件
     * var map = new SuperMap.Map('map', {controls: []});
     * map.addControl(new SuperMap.Control.Navigation());
     * 
     * //创建map地图对象，通过设置options参数添加指定控件
     * var map = new SuperMap.Map('map', {controls: [
     *               new SuperMap.Control.LayerSwitcher(),
     *               new SuperMap.Control.ScaleLine(),
     *               new SuperMap.Control.PanZoomBar(),
     *               new SuperMap.Control.Navigation()              
     * ]});
     * (end)
     */    
    initialize: function (div, options) {
        
        // If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }

        // Simple-type defaults are set in class definition. 
        //  Now set complex-type defaults 
        this.tileSize = new SuperMap.Size(SuperMap.Map.TILE_WIDTH,
                                            SuperMap.Map.TILE_HEIGHT);
        
        //this.maxExtent = new SuperMap.Bounds(-180, -90, 180, 90);
        
        this.paddingForPopups = new SuperMap.Bounds(15, 15, 15, 15);

        //style..css已在SuperMap.Include.js里面默认引入，这里就不用再引用了
        //this.theme = SuperMap._getScriptLocation() + '../theme/default/style.css';

        // now override default options 
        SuperMap.Util.extend(this, options);

        var projCode = this.projection instanceof SuperMap.Projection ?
            this.projection.projCode : this.projection;
        SuperMap.Util.applyDefaults(this, SuperMap.Projection.defaults[projCode]);

        // allow extents and center to be arrays
        if (this.maxExtent && !(this.maxExtent instanceof SuperMap.Bounds)) {
            this.maxExtent = new SuperMap.Bounds(this.maxExtent);
        }
        if (this.minExtent && !(this.minExtent instanceof SuperMap.Bounds)) {
            this.minExtent = new SuperMap.Bounds(this.minExtent);
        }
        if (this.restrictedExtent && !(this.restrictedExtent instanceof SuperMap.Bounds)) {
            this.restrictedExtent = new SuperMap.Bounds(this.restrictedExtent);
        }
        if (this.center && !(this.center instanceof SuperMap.LonLat)) {
            this.center = new SuperMap.LonLat(this.center);
        }

        // initialize layers array
        this.layers = [];

        this.id = SuperMap.Util.createUniqueID("SuperMap.Map_");

        this.div = SuperMap.Util.getElement(div);
        if(!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        this.div.style.touchAction = "none";          //禁用ie11触屏手势

        SuperMap.Element.addClass(this.div, 'smMap');
        //鼠标样式为手势，IE不识别CSS中 cursor的相对路径
        var  imagesLocation=SuperMap.Util.getImagesLocation() ;
        this.div.style.cursor="url('"+imagesLocation+"cursors/Pan.cur'),default";

        // the viewPortDiv is the outermost div we modify
        var id = this.id + "_SuperMap_ViewPort";
        this.viewPortDiv = SuperMap.Util.createDiv(id, null, null, null,
                                                     "relative", null,
                                                     "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "smMapViewport";
        this.div.appendChild(this.viewPortDiv);

        // the eventsDiv is where we listen for all map events
        var eventsDiv = document.createElement("div");
        eventsDiv.id = this.id + "_events";
        eventsDiv.style.position = "absolute";
        eventsDiv.style.width = "100%";
        eventsDiv.style.height = "100%";
        eventsDiv.style.zIndex = this.Z_INDEX_BASE.Control - 1;
        this.viewPortDiv.appendChild(eventsDiv);
        this.eventsDiv = eventsDiv;
        this.events = new SuperMap.Events(
            this, this.eventsDiv, this.EVENT_TYPES, this.fallThrough, 
            {includeXY: true}
        );

        // the layerContainerDiv is the one that holds all the layers
        id = this.id + "_SuperMap_Container";
        this.layerContainerDiv = SuperMap.Util.createDiv(id);
        this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;


        this.shadowContainerDiv = SuperMap.Util.createDiv("layerContainerShadowDiv");
        this.shadowContainerDiv.style.zIndex=this.Z_INDEX_BASE['Feature']-1;

        this.layerContainerDiv.appendChild(this.shadowContainerDiv);
        
        //生成转为canvas的div。
        //this.layerContainerDivCanvas = SuperMap.Util.createDiv(id);
        //this.layerContainerDivCanvas.style.zIndex=this.Z_INDEX_BASE['Popup']-1;
        
        //this.eventsDiv.appendChild(this.layerContainerDivCanvas);
        this.eventsDiv.appendChild(this.layerContainerDiv);

        this.updateSize();
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
 
        // update the map size and location before the map moves
        this.events.register("movestart", this, this.updateSize);

        // Because Mozilla does not support the "resize" event for elements 
        // other than "window", we need to put a hack here. 
        //if (SuperMap.String.contains(navigator.appName, "Microsoft")) {
            // If IE, register the resize on the div
            // but IE9 can not call resize event on the div, so comment 
            // this and regist the event on window。
            //this.events.register("resize", this, this.updateSize);
        //} else {
            // Else updateSize on catching the window's resize
            //  Note that this is ok, as updateSize() does nothing if the 
            //  map's size has not actually changed.
            this.updateSizeDestroy = SuperMap.Function.bind(this.updateSize, 
                this);
            SuperMap.Event.observe(window, 'resize',
                            this.updateSizeDestroy);
        //}
        
        // only append link stylesheet if the theme property is set
        if(this.theme) {
            // check existing links for equivalent url
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for(var i=0, len=nodes.length; i<len; ++i) {
                if(SuperMap.Util.isEquivalentUrl(nodes.item(i).href,
                                                   this.theme)) {
                    addNode = false;
                    break;
                }
            }
            // only add a new node if one with an equivalent url hasn't already
            // been added
            if(addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        
        if (this.controls == null) {
            if (SuperMap.Control != null) { // running full or lite?
                this.controls = [ new SuperMap.Control.Navigation(),
                                  new SuperMap.Control.PanZoomBar(),
                                  new SuperMap.Control.Attribution()
                                ];
            } else {
                this.controls = [];
            }
        }

        for(var i=0, len=this.controls.length; i<len; i++) {
            this.addControlToMap(this.controls[i]);
        }

        this.popups = [];

        this.unloadDestroy = SuperMap.Function.bind(this.destroy, this);
        

        // always call map.destroy()
        SuperMap.Event.observe(window, 'unload', this.unloadDestroy);
        
        // add any initial layers
        if (options && options.layers) {
            /** 
             * If you have set options.center, the map center property will be
             * set at this point.  However, since setCenter has not been caleld,
             * addLayers gets confused.  So we delete the map center in this 
             * case.  Because the check below uses options.center, it will
             * be properly set below.
             */
            delete this.center;
            this.addLayers(options.layers);        
            // set center (and optionally zoom)
            if (options.center && !this.getCenter()) {
                // zoom can be undefined here
                this.setCenter(options.center, options.zoom);
            }
        }
    },
    
    /**
     * APIMethod: render
     * 在指定的容器中渲染地图。
     * 
     * Parameters:
     * div - {String|DOMElement} 指定要渲染地图的DOM元素容器。如果与当前地图
     *     容器不同，则地图视口将会被移动到新的容器。
     */
    render: function(div) {
        this.div = SuperMap.Util.getElement(div);
        SuperMap.Element.addClass(this.div, 'smMap');
        this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
        this.div.appendChild(this.viewPortDiv);
        this.updateSize();
    },

    /**
     * Method: unloadDestroy
     * Function that is called to destroy the map on page unload. stored here
     *     so that if map is manually destroyed, we can unregister this.
     */
    unloadDestroy: null,
    
    /**
     * Method: updateSizeDestroy
     * When the map is destroyed, we need to stop listening to updateSize
     *    events: this method stores the function we need to unregister in 
     *    non-IE browsers.
     */
    updateSizeDestroy: null,

    /**
     * APIMethod: destroy
     * 销毁地图
     * 注意，如果从DOM中移除map容器，需要在destroy前执行。
     */
    destroy:function() {
        // if unloadDestroy is null, we've already been destroyed
        if (!this.unloadDestroy) {
            return false;
        }
        
        // make sure panning doesn't continue after destruction
        if(this.panTween) {
            this.panTween.stop();
            this.panTween = null;
        }

        // map has been destroyed. dont do it again!
        SuperMap.Event.stopObserving(window, 'unload', this.unloadDestroy);
        this.unloadDestroy = null;

        if (this.updateSizeDestroy) {
            SuperMap.Event.stopObserving(window, 'resize', 
                                           this.updateSizeDestroy);
        } else {
            this.events.unregister("resize", this, this.updateSize);
        }    
        
        this.paddingForPopups = null;    

        if (this.controls != null) {
            for (var i = this.controls.length - 1; i>=0; --i) {
                this.controls[i].destroy();
            } 
            this.controls = null;
        }
        if (this.layers != null) {
            for (var i = this.layers.length - 1; i>=0; --i) {
                //pass 'false' to destroy so that map wont try to set a new 
                // baselayer after each baselayer is removed
                this.layers[i].destroy(false);
            } 
            this.layers = null;
        }
        if (this.viewPortDiv) {
            this.div.removeChild(this.viewPortDiv);
        }
        this.viewPortDiv = null;

        if(this.eventListeners) {
            this.events.un(this.eventListeners);
            this.eventListeners = null;
        }
        this.events.destroy();
        this.events = null;

    },

    /**
     * APIMethod: setOptions
     * 设置地图的options.
     *
     * Parameters:
     * options - {Object} 标记地图的属性。
     */
    setOptions: function(options) {
        var updatePxExtent = this.minPx &&
            options.restrictedExtent !== this.restrictedExtent;
        SuperMap.Util.extend(this, options);
        // force recalculation of minPx and maxPx
        updatePxExtent && this.moveTo(this.getCachedCenter(), this.zoom, {
            forceZoomChange: true
        });
    },

    /**
     * APIMethod: getTileSize
     * 获取地图瓦片的大小。
     *
     * Returns:
     * {<SuperMap.Size>}  返回 <SuperMap.Size> 对象。
     */
     getTileSize: function() {
         return this.tileSize;
     },


    /**
     * APIMethod: getBy
     * 获取一个对象数组，并通过给定的属性匹配其中的项。
     *
     * Parameters:
     * array - {String} 地图的属性，获取该值能够得到一个数组。
     * property - {String} 通过指定的地图属性获得的数组中每一项都包含的属性。
     * match - {String | Object} 用于匹配属性值的字符串，可以是正则表达式的
     *      文本或对象。此外,正则表达式或包含名称为test方法的任意对象，如果使
     *      用match.test(map[array][i][property])计算返回的是true，那该项即被包
     *      含在返回的数组里边。如果没有找到符合标准的项目，返回的是一个
     *      空字符串。
     *
     * Returns:
     * {Array} 返回其属性匹配给定条件的项组成的一个数组。
     *
     * Examples:
     * (code)
     * //以下代码能够获取CLASS_NAME属性值为SuperMap.Control.ScaleLine的控件。
     *  map.getBy("controls","CLASS_NAME","SuperMap.Control.ScaleLine");
     *
     * //以下代码能够获得name属性为World的图层。
     *  map.getBy("layers","name","World");
     * (end)
     */
    getBy: function(array, property, match) {
        var test = (typeof match.test === "function");
        var found = SuperMap.Array.filter(this[array], function(item) {
            return item[property] === match || (test && match.test(item[property]));
        });
        return found;
    },

    /**
     * APIMethod: getLayersBy
     * 获取与给定属性和匹配字符串匹配的图层列表。
     *
     * Parameter:
     * property - {String} 用来匹配的图层属性。
     * match - {String | Object} 匹配字符串，可以使正则表达式的文字或者对象。
     *
     * Returns:
     * {Array(<SuperMap.Layer>)} 返回匹配到的图层列表。如果没有匹配到则返回空数组。
     */
    getLayersBy: function(property, match) {
        return this.getBy("layers", property, match);
    },

    /**
     * APIMethod: getLayersByName
     * 获取根据名称匹配得到的图层列表。
     *
     * Parameter:
     * match - {String | Object} 图层名称，可以使用正则表达式的文字或者对象。
     *
     * Returns:
     * {Array(<SuperMap.Layer>)} 根据图层名称匹配得到的图层列表，无匹配时返回空数组。
     */
    getLayersByName: function(match) {
        return this.getLayersBy("name", match);
    },

    /**
     * APIMethod: getLayersByClass
     * 根据类名获取的图层列表。
     *
     * Parameter:
     * match - {String | Object} 图层类名。匹配字符可以使用正则表达式的文字或者对象.
     *
     * Returns:
     * {Array(<SuperMap.Layer>)} 根据类名匹配到的图层列表。如果匹配不到将返回空数组。
     */
    getLayersByClass: function(match) {
        return this.getLayersBy("CLASS_NAME", match);
    },

    /**
     * APIMethod: getControlsBy
     * 根据给定的属性和匹配字符串匹配到的控件列表。
     *
     * Parameter:
     * property - {String} 用来匹配控件的属性。
     * match - {String | Object} 匹配字符串。可以是正则表达式的文字或者对象。
     *
     * Returns:
     * {Array(<SuperMap.Control>)} 根据属性匹配到的控件列表。如果匹配不到将返回空数组。
     */
    getControlsBy: function(property, match) {
        return this.getBy("controls", property, match);
    },

    /**
     * APIMethod: getControlsByClass
     * 根据给定类的类名匹配到的控件列表。
     *
     * Parameter:
     * match - {String | Object} 控件的类名。可以是正则表达式的文字或者对象
     *
     * Returns:
     * {Array(<SuperMap.Control>)} 返回匹配到的控件列表。如果匹配不到将返回空数组。
     */
    getControlsByClass: function(match) {
        return this.getControlsBy("CLASS_NAME", match);
    },

  /********************************************************/
  /*                                                      */
  /*                  Layer Functions                     */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Layers to and from the Map           */
  /*                                                      */
  /********************************************************/         

    /**
     * APIMethod: getLayer
     * 根据传入参数id获取图层。
     *
     * Parameter:
     * id - {String} 图层的id属性值。
     *
     * Returns:
     * {<SuperMap.Layer>} 返回id对应的图层，若没有匹配到返回null 。
     */
    getLayer: function(id) {
        var foundLayer = null;
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            if (layer.id === id) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
    },

    /**
    * Method: setLayerZIndex
    * 
    * Parameters:
    * layer - {<SuperMap.Layer>} 
    * zIdx - {int} 
    */    
    setLayerZIndex: function (layer, zIdx) {
//        if((layer instanceof SuperMap.Layer.Vector) || (layer instanceof SuperMap.Layer.Markers) )
//        if(layer instanceof SuperMap.Layer.Vector)
//        {
//            layer.setZIndex(
//                this.Z_INDEX_BASE['Feature']
//                    + zIdx * 5 );
//        } else
        if(layer instanceof SuperMap.Layer.Markers) {
            layer.setZIndex(
                this.Z_INDEX_BASE['Marker']
                    + zIdx * 5);
        }
        else
        {
            layer.setZIndex(
                this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay']
                    + zIdx * 5 );
        }
    },

    /**
     * Method: resetLayersZIndex
     * Reset each layer's z-index based on layer's array index
     */
    resetLayersZIndex: function() {
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i);
        }
    },

    /**
    * APIMethod: addLayer
    * 向地图中添加指定的单个图层。
    *
    * Parameters:
    * layer - {<SuperMap.Layer>} 指定向地图中添加的图层。
    */    
    addLayer: function (layer) {
        for(var i=0, len=this.layers.length; i <len; i++) {
            if (this.layers[i] === layer) {
                var msg = SuperMap.i18n('layerAlreadyAdded', 
                                                      {'layerName':layer.name});
                //SuperMap.Console.warn(msg);
                return false;
            }
        }
        if (this.events.triggerEvent("preaddlayer", {layer: layer}) === false) {
            return false;
        }
        if(this.allOverlays) {
            layer.isBaseLayer = false;
        }

        
        layer.div.className = "smLayerDiv";
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);


        this.layerContainerDiv.appendChild(layer.div);
        this.layers.push(layer);
        layer.setMap(this);

        if (layer.isBaseLayer || (this.allOverlays && !this.baseLayer))  {
            if (this.baseLayer == null) {
                // set the first baselaye we add as the baselayer
                this.setBaseLayer(layer);
            } else {
                layer.setVisibility(false);
            }
        } else {
            layer.redraw();
        }

        this.events.triggerEvent("addlayer", {layer: layer});
        layer.events.triggerEvent("added", {map: this, layer: layer});
        layer.afterAdd();

        return true;
    },

    /**
    * APIMethod: addLayers
    * 向地图中添加指定的多个图层。
    *
    * Parameters:
    * layers - {Array(<SuperMap.Layer>)} 指定向地图中添加的多个图层的数组。
    */    
    addLayers: function (layers) {
        for (var i=0, len=layers.length; i<len; i++) {
            this.addLayer(layers[i]);
        }
    },

    /** 
     * APIMethod: removeLayer
     * 通过删除可见元素（即layer.div属性）来移除地图上的图层。然后从地图的
     * 图层列表中移除该图层，同时设置图层的map属性为null。
     * 
     * Parameters:
     * layer - {<SuperMap.Layer>}  指定要被移除的图层。
     * setNewBaseLayer - {Boolean} 是否设置新的底图，默认值为true。
     */
    removeLayer: function(layer, setNewBaseLayer) {
        if (this.events.triggerEvent("preremovelayer", {layer: layer}) === false) {
            return;
        }
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }

        this.layerContainerDiv.removeChild(layer.div);
        SuperMap.Util.removeItem(this.layers, layer);
        layer.removeMap(this);
        layer.map = null;

        // if we removed the base layer, need to set a new one
        if(this.baseLayer === layer) {
            this.baseLayer = null;
            if(setNewBaseLayer) {
                for(var i=0, len=this.layers.length; i<len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBaseLayer || this.allOverlays) {
                        this.setBaseLayer(iLayer);
                        break;
                    }
                }
            }
        }

        this.resetLayersZIndex();

        this.events.triggerEvent("removelayer", {layer: layer});
        layer.events.triggerEvent("removed", {map: this, layer: layer});
    },

    /**
     * APIMethod: getNumLayers
     * 获取地图上的图层数量。
     * 
     * Returns:
     * {Int} 返回地图上加载的图层数量的整数值。
     */
    getNumLayers: function () {
        return this.layers.length;
    },

    /** 
     * APIMethod: getLayerIndex
     * 获取图层在地图上的索引值（索引值从零开始）。
     *
     * Parameters:
     * layer - {<SuperMap.Layer>} 指定要获取索引值的图层。
     *
     * Returns:
     * {Integer} 图层在地图上的索引值（索引值从零开始）。如果图层不在地图
     *     上则返回-1。
     */
    getLayerIndex: function (layer) {
        return SuperMap.Util.indexOf(this.layers, layer);
    },
    
    /** 
     * APIMethod: setLayerIndex
     * 移动图层到图层列表中的指定索引值（索引值从零开始）的位置。改变
     *     它在地图显示时的z-index值。使用map.getLayerIndex()方法查看图层
     *     当前的索引值。注意该方法不能将底图移动到叠加图层之上。
     *
     * Parameters:
     * layer - {<SuperMap.Layer>} 要改变索引值的图层。
     * idx - {int} 指定的索引值。
     */
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.layers.length) {
            idx = this.layers.length;
        }
        if (base !== idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            for (var i=0, len=this.layers.length; i<len; i++) {
                this.setLayerZIndex(this.layers[i], i);
            }
            this.events.triggerEvent("changelayer", {
                layer: layer, property: "order"
            });
            if(this.allOverlays) {
                if(idx === 0) {
                    this.setBaseLayer(layer);
                } else if(this.baseLayer !== this.layers[0]) {
                    this.setBaseLayer(this.layers[0]);
                }
            }
        }
    },

    /** 
     * APIMethod: raiseLayer
     * 通过给定的增量值（delta参数）来改变给定图层的索引值。如果增量值为
     *     正，图层就会在图层堆栈中向上移；如果增量值为负，图层就会向下移。
     *     这个方法同样不能将底图移动到叠加图层之上。
     *
     * Paremeters:
     * layer - {<SuperMap.Layer>}  要移动的图层。
     * delta - {int} 指定移动的增量值。
     */
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },
    
    /** 
     * APIMethod: setBaseLayer
     * 允许用户指定当前加载的某一图层为地图新的底图。
     * 
     * Parameters:
     * newBaseLayer - {<SuperMap.Layer>} 要被设置成新底图的图层。
     */
    setBaseLayer: function(newBaseLayer) {
        
        if (newBaseLayer !== this.baseLayer) {
          
            // ensure newBaseLayer is already loaded
            if (SuperMap.Util.indexOf(this.layers, newBaseLayer) !== -1) {

                // preserve center and scale when changing base layers
                var center = this.getCachedCenter();
                var newResolution = SuperMap.Util.getResolutionFromScale(
                    this.getScale(), newBaseLayer.units
                );

                // make the old base layer invisible 
                if (this.baseLayer != null && !this.allOverlays) {
                    this.baseLayer.setVisibility(false);
                }

                // set new baselayer
                this.baseLayer = newBaseLayer;

                //切换底图时，底图会去重新计算一套比例尺，而叠加图层的比例尺会与底图不太一致
                //不过理论上所有的比例尺都应该按照底图的来，而叠加图层不应该自己再去计算，分别计算的具体原因我
                //也没有深究，因此现在就先按照这个逻辑来吧
                if(this.layers.length>1){
                    for(var i= 0,len=this.layers.length;i<len;i++){
                        if(this.layers[i]!==newBaseLayer){
                            this.layers[i].clean();
                            this.layers[i].initResolutions&&this.layers[i].initResolutions();
                        }
                    }
                }
                
                // Increment viewRequestID since the baseLayer is
                // changing. This is used by tiles to check if they should 
                // draw themselves.
                this.viewRequestID++;
                if(!this.allOverlays || this.baseLayer.visibility) {
                    this.baseLayer.setVisibility(true);
                    // Layer may previously have been visible but not in range.
                    // In this case we need to redraw it to make it visible.
                    if (this.baseLayer.inRange === false) {
                        this.baseLayer.redraw();
                    }
                }

                // recenter the map
                if (center != null) {
                    // new zoom level derived from old scale
                    var newZoom = this.getZoomForResolution(
                        newResolution || this.resolution, true
                    );
                    // zoom and force zoom change
                    this.setCenter(center, newZoom, false, true);
                }

                this.events.triggerEvent("changebaselayer", {
                    layer: this.baseLayer
                });
            }        
        }
    },


  /********************************************************/
  /*                                                      */
  /*                 Control Functions                    */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Controls to and from the Map         */
  /*                                                      */
  /********************************************************/         

    /**
     * APIMethod: addControl
     * 为地图添加控件。可选的位置参数用来指定控件的像素位置。
     * 
     * Parameters:
     * control - {<SuperMap.Control>} 要添加的控件。
     * px - {<SuperMap.Pixel>} 控件添加的像素位置。
     */    
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToMap(control, px);
    },
    
    /**
     * APIMethod: addControls
     * 将控件添加到map上。
     * 可以通过options的第二个数组通过像素对象控制控件的位置
     * 两个数组应该匹配，如果pixel设为null，控件会显示在默认位置。 
     *     
     * Parameters:
     * controls - {Array(<SuperMap.Control>)} 要添加的控件数组。
     * pixels - {Array(<SuperMap.Pixel>)} 对应控件的像素位置数组。
     */    
    addControls: function (controls, pixels) {
        var pxs = (arguments.length === 1) ? [] : pixels;
        for (var i=0, len=controls.length; i<len; i++) {
            var ctrl = controls[i];
            var px = (pxs[i]) ? pxs[i] : null;
            this.addControl( ctrl, px );
        }
    },

    /**
     * Method: addControlToMap
     * 
     * Parameters:
     * 
     * control - {<SuperMap.Control>}
     * px - {<SuperMap.Pixel>}
     */    
    addControlToMap: function (control, px) {
        // If a control doesn't have a div at this point, it belongs in the
        // viewport.
        control.outsideViewport = (control.div != null);
        
        // If the map has a displayProjection, and the control doesn't, set 
        // the display projection.
        if (this.displayProjection && !control.displayProjection) {
            control.displayProjection = this.displayProjection;
        }    
        
        control.setMap(this);
        var div = control.draw(px);
        if (div) {
            if(!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] +
                                    this.controls.length;
                this.viewPortDiv.appendChild( div );
            }
        }
        if(control.autoActivate) {
            control.activate();
        }
    },
    
    /**
     * APIMethod: getControl
     * 通过id值获取控件对象。
     * 
     * Parameters:
     * id - {String} 要获取的控件的id。
     * 
     * Returns:
     * {<SuperMap.Control>} 根据id从map上的控件列表中匹配到控件。如果没有找到则返回null。
     */    
    getControl: function (id) {
        var returnControl = null;
        for(var i=0, len=this.controls.length; i<len; i++) {
            var control = this.controls[i];
            if (control.id === id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    
    /** 
     * APIMethod: removeControl
     * 移除控件。该方法不会使控件失效，若要使其失效，需调用该控件的deactivate方法。
     * 
     * Parameters:
     * control - {<SuperMap.Control>} 将被移除的控件。
     */    
    removeControl: function (control) {
        //make sure control is non-null and actually part of our map
        if ( (control) && (control === this.getControl(control.id)) ) {
            if (control.div && (control.div.parentNode === this.viewPortDiv)) {
                this.viewPortDiv.removeChild(control.div);
            }
            SuperMap.Util.removeItem(this.controls, control);
        }
    },

  /********************************************************/
  /*                                                      */
  /*                  Popup Functions                     */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Popups to and from the Map           */
  /*                                                      */
  /********************************************************/         

    /** 
     * APIMethod: addPopup
     * 在地图中添加弹出窗口。
     * 
     * Parameters:
     * popup - {<SuperMap.Popup>} 要添加的弹出窗口。
     * exclusive - {Boolean} 如果设为true，则首先关闭所有其他弹出窗口。
     */
    addPopup: function(popup, exclusive) {

        if (exclusive) {
            //remove all other popups from screen
            for (var i = this.popups.length - 1; i >= 0; --i) {
                this.removePopup(this.popups[i]);
            }
        }

        popup.map = this;
        this.popups.push(popup);
        var popupDiv = popup.draw();
        if (popupDiv) {
            popupDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] +
                                    this.popups.length;
            this.layerContainerDiv.appendChild(popupDiv);
        }
    },
    
    /** 
    * APIMethod: removePopup
    * 移除指定的弹出窗口。
    * 
    * Parameters:
    * popup - {<SuperMap.Popup>} 将删除的弹出窗口对象。
    */
    removePopup: function(popup) {
        SuperMap.Util.removeItem(this.popups, popup);
        if (popup.div) {
            try {
                this.layerContainerDiv.removeChild(popup.div);
            }
            catch (e) { } // Popups sometimes apparently get disconnected
                      // from the layerContainerDiv, and cause complaints.
        }
        if(popup.shadowDiv)
        {
            try {
                this.shadowContainerDiv.removeChild(popup.shadowDiv);
            }
            catch (e) { }
        }
        popup.map = null;
    },
    /**
     * APIMethod: removeAllPopup
     * 移除所有弹出窗口。
     *
     */
    removeAllPopup:function () {
        for (var i = this.popups.length - 1; i >= 0; --i) {
            this.removePopup(this.popups[i]);
        }
    },
  /********************************************************/
  /*                                                      */
  /*              Container Div Functions                 */
  /*                                                      */
  /*   The following functions deal with the access to    */
  /*    and maintenance of the size of the container div  */
  /*                                                      */
  /********************************************************/     

    /**
     * APIMethod: getSize
     * 获取当前地图容器大小。
     * 
     * Returns:
     * {<SuperMap.Size>} 返回加载当前地图的容器 Div 的大小size，以像素为单位。注意：返回的对象是本地Size
     * 对象的副本，意味着不允许用户修改。
     */
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone();
        }
        return size;
    },

    /**
     * APIMethod: updateSize
     * 通过动态调用updateSize()方式，来改变地图容器的大小。
     */
    updateSize: function() {
        // the div might have moved on the page, also
        var newSize = this.getCurrentSize();
        if (newSize && !isNaN(newSize.h) && !isNaN(newSize.w)) {
            this.events.clearMouseCache();
            var oldSize = this.getSize();
            if (oldSize == null) {
                this.size = oldSize = newSize;
            }
            if (!newSize.equals(oldSize)) {
                
                // store the new size
                this.size = newSize;
    
                //notify layers of mapresize
                for(var i=0, len=this.layers.length; i<len; i++) {
                    this.layers[i].onMapResize();                
                }
    
                var center = this.getCachedCenter();
    
                if (this.baseLayer != null && center != null) {
                    var zoom = this.getZoom();
                    this.zoom = null;
                    this.setCenter(center, zoom);
                }
    
            }
        }
    },
    
    /**
     * Method: getCurrentSize
     * 
     * Returns:
     * {<SuperMap.Size>} A new <SuperMap.Size> object with the dimensions 
     *                     of the map div
     */
    getCurrentSize: function() {

        var size = new SuperMap.Size(this.div.clientWidth, 
                                       this.div.clientHeight);

        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = this.div.offsetWidth;
            size.h = this.div.offsetHeight;
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height);
        }
        return size;
    },

    /** 
     * Method: calculateBounds
     * 
     * Parameters:
     * center - {<SuperMap.LonLat>} Default is this.getCenter()
     * resolution - {float} Default is this.getResolution() 
     * 
     * Returns:
     * {<SuperMap.Bounds>} A bounds based on resolution, center, and 
     *                       current mapsize.
     */
    calculateBounds: function(center, resolution) {

        var extent = null;
        
        if (center == null) {
            center = this.getCachedCenter();
        }                
        if (resolution == null) {
            resolution = this.getResolution();
        }
    
        if ((center != null) && (resolution != null)) {
            var halfWDeg = (this.size.w * resolution) / 2;
            var halfHDeg = (this.size.h * resolution) / 2;
        
            extent = new SuperMap.Bounds(center.lon - halfWDeg,
                                           center.lat - halfHDeg,
                                           center.lon + halfWDeg,
                                           center.lat + halfHDeg);
        
        }

        return extent;
    },


  /********************************************************/
  /*                                                      */
  /*            Zoom, Center, Pan Functions               */
  /*                                                      */
  /*    The following functions handle the validation,    */
  /*   getting and setting of the Zoom Level and Center   */
  /*       as well as the panning of the Map              */
  /*                                                      */
  /********************************************************/
    /**
     * APIMethod: getCenter
     * 获取当前地图的中心点坐标。
     * 
     * Returns:
     * {<SuperMap.LonLat>} 返回 <SuperMap.LonLat> 对象。
     */
    getCenter: function () {
        var center = null;
        var cachedCenter = this.getCachedCenter();
        if (cachedCenter) {
            center = cachedCenter.clone();
        }
        return center;
    },

    /**
     * Method: getCachedCenter
     *
     * Returns:
     * {<SuperMap.LonLat>}
     */
    getCachedCenter: function() {
        if (!this.center && this.size) {
            this.center = this.getLonLatFromViewPortPx({
                x: this.size.w / 2,
                y: this.size.h / 2
            });
        }
        return this.center;
    },

    /**
     * APIMethod: getZoom
     * 获取当前地图的缩放比例级别。
     * 
     * Returns:
     * {Integer} 返回代表当前地图缩放级别的整数值。
     */
    getZoom: function () {
        return this.zoom;
    },
    
    /**
     * Method: zoomFinished
     *    监测图层缩放动画是否完成
     * Returns:{Boolean} 
     */
    zoomFinished: function() {
        if(this.layers === null) return true;
        var isZoomming = true;
        for(var i=0,lyrs=this.layers,len=lyrs.length;i<len;i++) {
            var layer = lyrs[i];
            if(layer.isZoomming) {
                isZoomming = false;
                break;
            }
        }
        return isZoomming;
    },
    
    /** 
     * APIMethod: pan
     * 根据指定的屏幕像素值平移地图
     * 
     * Parameters:
     * dx - {Integer} 屏幕的x像素位置。
     * dy - {integer} 屏幕的y像素位置。
     * options - {Object} 平移的可选参数。
     * *animate* {Boolean} 平移过程是否使用动画。默认为true。
     * *dragging* {Boolean} 设置为true时调用setCenter()方法。默认为false。
     */
    pan: function(dx, dy, options) {
        options = SuperMap.Util.applyDefaults(options, {
            animate: true,
            dragging: false
        });
        if (options.dragging) {
            if ((dx != 0 || dy != 0) && this.zoomFinished()) {
                this.moveByPx(dx, dy);
            }
        } else {
            // getCenter
            var centerPx = this.getViewPortPxFromLonLat(this.getCachedCenter());

            // adjust
            var newCenterPx = centerPx.add(dx, dy);

            if (this.dragging || !newCenterPx.equals(centerPx)) {
                var newCenterLonLat = this.getLonLatFromViewPortPx(newCenterPx);
                if (options.animate) {
                    this.panTo(newCenterLonLat);
                } else {
                    this.moveTo(newCenterLonLat);
                    if(this.dragging) {
                        this.dragging = false;
                    }
                    this.events.triggerEvent("moveend",{});
                }
            }
        }
   },
   
   /** 
     * APIMethod: panTo
     * 平移地图到新的位置
     * 如果新的位置在地图的当前范围内，地图将平滑地移动。
     * 
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 要移动到的新位置。
     */
    panTo: function(lonlat) {
        if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(lonlat)) {
            if (!this.panTween) {
                this.panTween = new SuperMap.Tween(this.panMethod);
            }
            var center = this.getCachedCenter();

            // center will not change, don't do nothing
            if (lonlat.equals(center)) {
                return;
            }

            var from = this.getPixelFromLonLat(center);
            var to = this.getPixelFromLonLat(lonlat);
            var vector = { x: to.x - from.x, y: to.y - from.y };
            var last = { x: 0, y: 0 };

            this.panTween.start( { x: 0, y: 0 }, vector, this.panDuration, {
                callbacks: {
                    eachStep: SuperMap.Function.bind(function(px) {
                        var x = px.x - last.x,
                            y = px.y - last.y;
                        this.moveByPx(x, y);
                        last.x = Math.round(px.x);
                        last.y = Math.round(px.y);
                    }, this),
                    done: SuperMap.Function.bind(function(px) {
                        this.moveTo(lonlat);
                        this.dragging = false;
                        this.events.triggerEvent("moveend",{});
                    }, this)
                }
            });
        } else {
            this.setCenter(lonlat);
        }
    },

    /**
   * APIMethod: setCenter
     * 设置地图中心点。
     * 
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 要设置的中心点。
     * zoom - {Integer} 缩放级别。
     * dragging - {Boolean} 指定是否触发 movestart/end 事件。
     * forceZoomChange - {Boolean} 指定是否触发zoomchange事件，依赖于baseLayer的变化。
     */
    setCenter: function(lonlat, zoom, dragging, forceZoomChange) {
        this.panTween && this.panTween.stop();             
        this.moveTo(lonlat, zoom, {
            'dragging': dragging,
            'forceZoomChange': forceZoomChange
        });
    },
    
    /** 
     * Method: moveByPx
     * Drag the map by pixels.
     *
     * Parameters:
     * dx - {Number}
     * dy - {Number}
     */
    moveByPx: function(dx, dy) {
        var hw = this.size.w / 2;
        var hh = this.size.h / 2;
        var x = hw + dx;
        var y = hh + dy;
        var wrapDateLine = this.baseLayer.wrapDateLine;
        var xRestriction = 0;
        var yRestriction = 0;
        if (this.restrictedExtent) {
            xRestriction = hw;
            yRestriction = hh;
            // wrapping the date line makes no sense for restricted extents
            wrapDateLine = false;
        }
        dx = wrapDateLine ||
                    x <= this.maxPx.x - xRestriction &&
                    x >= this.minPx.x + xRestriction ? Math.round(dx) : 0;
        dy = y <= this.maxPx.y - yRestriction &&
                    y >= this.minPx.y + yRestriction ? Math.round(dy) : 0;
        var minX = this.minPx.x, maxX = this.maxPx.x;
        if (dx || dy) {
            if (!this.dragging) {
                this.dragging = true;
                this.events.triggerEvent("movestart",{});
            }
            this.center = null;
            if (dx) {
                this.layerContainerDiv.style.left =
                    parseInt(this.layerContainerDiv.style.left) - dx + "px";

                this.minPx.x -= dx;
                this.maxPx.x -= dx;
                if (wrapDateLine) {
                    if (this.maxPx.x > maxX) {
                        this.maxPx.x -= (maxX - minX);
                    }
                    if (this.minPx.x < minX) {
                        this.minPx.x += (maxX - minX);
                    }
                }
            }
            if (dy) {
                this.layerContainerDiv.style.top =
                    parseInt(this.layerContainerDiv.style.top) - dy + "px";

                this.minPx.y -= dy;
                this.maxPx.y -= dy;
            }
            var layer, i, len;
            for (i=0, len=this.layers.length; i<len; ++i) {
                layer = this.layers[i];
                if (layer.visibility &&
                    (layer === this.baseLayer || layer.inRange)) {
                    layer.moveByPx(dx, dy);
                    layer.events.triggerEvent("move",{x: dx, y: dy});
                }
            }
            this.events.triggerEvent("move",{x: dx, y: dy});
        }
    },

    adjustZoom: function(zoom) {
        var resolution, resolutions = this.baseLayer.resolutions,
            maxResolution = this.getMaxExtent().getWidth() / this.size.w;
        if (this.getResolutionForZoom(zoom) > maxResolution) {
            for (var i=zoom|0, ii=resolutions.length; i<ii; ++i) {
                if (resolutions[i] <= maxResolution) {
                    zoom = i;
                    break;
                }
            }
        }
        return zoom;
    },

    /**
     * Method: moveTo
     *
     * Parameters:
     * lonlat - {<SuperMap.LonLat>}
     * zoom - {Integer}
     * options - {Object}
     */
    moveTo: function(lonlat, zoom, options) {
        if (zoom != null) {
            zoom = parseFloat(zoom);
            if (!this.fractionalZoom) {
                zoom = Math.round(zoom);
            }
        }
        if(zoom !== this.getZoom())
        {
           var inRange = true;
           var newRes  = this.baseLayer.getResolutionForZoom(zoom);
           //最大最小分辨率判断
           if(this.minResolution !== null && this.maxResolution !== null)
           {
              inRange = ( (newRes >= this.minResolution) && (newRes <= this.maxResolution) );
           }
           else if(this.minResolution !== null && this.maxResolution === null)
           {
              inRange = (newRes >= this.minResolution);
           }
           else if(this.minResolution === null && this.maxResolution !== null)
           {
              inRange = (newRes <= this.maxResolution);
           }

           //最大最小zoom判断
           if(this.minZoom !== null && this.maxZoom !== null){
                inRange = ((zoom >= this.minZoom) && (zoom <= this.maxZoom));
           }
           else if(this.minZoom !== null && this.maxZoom === null){
              inRange = zoom >= this.minZoom;
           }
           else if(this.minZoom === null && this.maxZoom !== null){
              inRange = zoom <= this.maxZoom;
           }

           if(!inRange)
              return;
        }

        if (lonlat != null && !(lonlat instanceof SuperMap.LonLat)) {
            lonlat = new SuperMap.LonLat(lonlat);
        }
        if (!options) {
            options = {};
        }

        if (this.baseLayer.wrapDateLine) {
            var requestedZoom = zoom;
            //zoom = this.adjustZoom(zoom);
            if (zoom !== requestedZoom) {
                // zoom was adjusted, so keep old lonlat to avoid panning
                lonlat = this.getCenter();
            }
        }

        // dragging is false by default
        var dragging = options.dragging || this.dragging;
        // forceZoomChange is false by default
        var forceZoomChange = options.forceZoomChange;

        if (!this.getCachedCenter() && !this.isValidLonLat(lonlat)) {
            lonlat = this.maxExtent.getCenterLonLat();
            this.center = lonlat.clone();
        }

        if(this.restrictedExtent != null) {
            // In 3.0, decide if we want to change interpretation of maxExtent.
            if(lonlat == null) {
                lonlat = this.center;
            }
            if(zoom == null) {
                zoom = this.getZoom();
            }

            if(zoom<this.getZoomForExtent(this.restrictedExtent,true))
            {
                zoom=this.getZoomForExtent(this.restrictedExtent,true);
           }
            var resolution = this.getResolutionForZoom(zoom);
            var extent = this.calculateBounds(lonlat, resolution);
            if(!this.restrictedExtent.containsBounds(extent)) {
                var maxCenter = this.restrictedExtent.getCenterLonLat();
                if(extent.getWidth() > this.restrictedExtent.getWidth()) {
                    lonlat = new SuperMap.LonLat(maxCenter.lon, lonlat.lat);
                } else if(extent.left < this.restrictedExtent.left) {
                    lonlat = lonlat.add(this.restrictedExtent.left -
                                        extent.left, 0);
                } else if(extent.right > this.restrictedExtent.right) {
                    lonlat = lonlat.add(this.restrictedExtent.right -
                                        extent.right, 0);
                }
                if(extent.getHeight() > this.restrictedExtent.getHeight()) {
                    lonlat = new SuperMap.LonLat(lonlat.lon, maxCenter.lat);
                } else if(extent.bottom < this.restrictedExtent.bottom) {
                    lonlat = lonlat.add(0, this.restrictedExtent.bottom -
                                        extent.bottom);
                }
                else if(extent.top > this.restrictedExtent.top) {
                    lonlat = lonlat.add(0, this.restrictedExtent.top -
                                        extent.top);
                }
            }
        }

        var zoomChanged = forceZoomChange || (
                            (this.isValidZoomLevel(zoom)) &&
                            (zoom !== this.getZoom()) );

        var centerChanged = (this.isValidLonLat(lonlat)) &&
                            (!lonlat.equals(this.center));

        // if neither center nor zoom will change, no need to do anything
        if (zoomChanged || centerChanged || dragging) {
            dragging || this.events.triggerEvent("movestart",{zoomChanged: zoomChanged});

            if (centerChanged) {
                if (!zoomChanged && this.center) {
                    // if zoom hasnt changed, just slide layerContainer
                    //  (must be done before setting this.center to new value)
                    this.centerLayerContainer(lonlat);
                }
                this.center = lonlat.clone();
            }

            var res = zoomChanged ?
                this.getResolutionForZoom(zoom) : this.getResolution();
            // (re)set the layerContainerDiv's location
            if (zoomChanged || this.layerContainerOrigin == null) {
                this.layerContainerOrigin = this.getCachedCenter();
                this.layerContainerDiv.style.left = "0px";
                this.layerContainerDiv.style.top  = "0px";
                //解决ICL-682，这里不能使用限制的范围
//                var maxExtent = this.getMaxExtent({restricted: true});
                var maxExtent = this.getMaxExtent();
                var maxExtentCenter = maxExtent.getCenterLonLat();
                var lonDelta = this.center.lon - maxExtentCenter.lon;
                var latDelta = maxExtentCenter.lat - this.center.lat;
                var extentWidth = Math.round(maxExtent.getWidth() / res);
                var extentHeight = Math.round(maxExtent.getHeight() / res);
                this.minPx = {
                    x: (this.size.w - extentWidth) / 2 - lonDelta / res,
                    y: (this.size.h - extentHeight) / 2 - latDelta / res
                };
                this.maxPx = {
                    x: this.minPx.x + Math.round(maxExtent.getWidth() / res),
                    y: this.minPx.y + Math.round(maxExtent.getHeight() / res)
                };
            }

            if (zoomChanged) {
                this.zoom = zoom;
                this.resolution = res;
                // zoom level has changed, increment viewRequestID.
                this.viewRequestID++;
            }

            var bounds = this.getExtent();

            //send the move call to the baselayer and all the overlays

            if(this.baseLayer.visibility) {
                this.baseLayer.moveTo(bounds, zoomChanged, options.dragging);
                options.dragging || this.baseLayer.events.triggerEvent(
                    "moveend", {zoomChanged: zoomChanged}
                );
            }

            bounds = this.baseLayer.getExtent();

            for (var i=this.layers.length-1; i>=0; --i) {
                var layer = this.layers[i];
                if (layer !== this.baseLayer && !layer.isBaseLayer) {
                    var inRange = layer.calculateInRange();
                    if (layer.inRange !== inRange) {
                        // the inRange property has changed. If the layer is
                        // no longer in range, we turn it off right away. If
                        // the layer is no longer out of range, the moveTo
                        // call below will turn on the layer.
                        layer.inRange = inRange;
                        if (!inRange) {
                            layer.display(false);
                        }
                        this.events.triggerEvent("changelayer", {
                            layer: layer, property: "visibility"
                        });
                    }
                    if (inRange && layer.visibility) {
                        layer.moveTo(bounds, zoomChanged, options.dragging);
                        options.dragging || layer.events.triggerEvent(
                            "moveend", {zoomChanged: zoomChanged}
                        );
                    }
                }
            }

            this.events.triggerEvent("move",{zoomChanged: zoomChanged});
            dragging || this.events.triggerEvent("moveend",{zoomChanged: zoomChanged});

            if (zoomChanged) {
                //redraw popups
                for (var i=0, len=this.popups.length; i<len; i++) {
                    this.popups[i].updatePosition();
                }
                this.events.triggerEvent("zoomend",{});
            }
        }
    },

    /**
     * Method: centerLayerContainer
     * This function takes care to recenter the layerContainerDiv.
     *
     * Parameters:
     * lonlat - {<SuperMap.LonLat>}
     */
    centerLayerContainer: function (lonlat) {
        var originPx = this.getViewPortPxFromLonLat(this.layerContainerOrigin);
        var newPx = this.getViewPortPxFromLonLat(lonlat);

        if ((originPx != null) && (newPx != null)) {
            var oldLeft = parseInt(this.layerContainerDiv.style.left);
            var oldTop = parseInt(this.layerContainerDiv.style.top);
            var newLeft = Math.round(originPx.x - newPx.x);
            var newTop = Math.round(originPx.y - newPx.y);
            this.layerContainerDiv.style.left = newLeft + "px";
            this.layerContainerDiv.style.top  = newTop + "px";
            var dx = oldLeft - newLeft;
            var dy = oldTop - newTop;
            this.minPx.x -= dx;
            this.maxPx.x -= dx;
            this.minPx.y -= dy;
            this.maxPx.y -= dy;
        }
    },

    /**
     * Method: isValidZoomLevel
     *
     * Parameters:
     * zoomLevel - {Integer}
     *
     * Returns:
     * {Boolean} Whether or not the zoom level passed in is non-null and
     *           within the min/max range of zoom levels.
     */
    isValidZoomLevel: function(zoomLevel) {
        return ( (zoomLevel != null) &&
                 (zoomLevel >= 0) &&
                 (zoomLevel < this.getNumZoomLevels()) );
    },

    /**
     * Method: isValidLonLat
     *
     * Parameters:
     * lonlat - {<SuperMap.LonLat>}
     *
     * Returns:
     * {Boolean} Whether or not the lonlat passed in is non-null and within
     *           the maxExtent bounds
     */
    isValidLonLat: function(lonlat) {
        var valid = false;
        if (lonlat != null) {
            var maxExtent = this.getMaxExtent();
            var worldBounds = this.baseLayer.wrapDateLine && maxExtent;
            valid = maxExtent.containsLonLat(lonlat, {worldBounds: worldBounds});
        }
        return valid;
    },

  /********************************************************/
  /*                                                      */
  /*                 Layer Options                        */
  /*                                                      */
  /*    Accessor functions to Layer Options parameters    */
  /*                                                      */
  /********************************************************/

    /**
     * APIMethod: getProjection
     * 该方法返回代表投影的字符串。
     *
     * Returns:
     * {String} 来源于baseLayer的投影字符串或者是null。
     */
    getProjection: function() {
        var projection = this.getProjectionObject();
        return projection ? projection.getCode() : null;
    },

    /**
     * APIMethod: getProjectionObject
     * 返回baseLayer的投影。
     *
     * Returns:
     * {<SuperMap.Projection>} baseLayer的投影。
     */
    getProjectionObject: function() {
        var projection = null;
        if (this.baseLayer != null) {
            projection = this.baseLayer.projection;
        }
        return projection;
    },

    /**
     * APIMethod: getMaxResolution
     * 返回baseLayer最大的分辨率。
     *
     * Returns:
     * {<SuperMap.Projection>} baseLayer的最大的分辨率。
     */
    getMaxResolution: function() {
        var maxResolution = null;
        if (this.baseLayer != null) {
            maxResolution = this.baseLayer.maxResolution;
        }
        return maxResolution;
    },

    /**
     * APIMethod: getMaxExtent
     * 获取地图的最大范围。
     *
     * Parameters:
     * options - {Object} 选项对象。
     *
     * Allowed Options:
     * restricted - {Boolean} 如果将该选项设置为true，返回的就是restrictedExtent
     *      对应的范围（前提是设置了该限制范围）。
     *
     * Returns:
     * {<Supermap.Bounds>} 返回当前底图的maxExtent（最大范围）属性对应
     *     的范围，如果在选项（options）对象中设置了‘restricted’选项，返回的就
     *     是restrictedExtent对应的范围（前提是设置了该限制范围）。
     */
    getMaxExtent: function (options) {
        var maxExtent = null;
        if(options && options.restricted && this.restrictedExtent){
            maxExtent = this.restrictedExtent;
        } else if (this.baseLayer != null) {
            maxExtent = this.baseLayer.maxExtent;
        }
        return maxExtent;
    },

    /**
     * APIMethod: getNumZoomLevels
     * 获取当前底图的缩放级别总数，在底图存在的情况下与底图缩放级别（numZoomLevels）
     *      相同
     *
     * Returns:
     * {Integer} 当前底图能够展示的所有缩放级别的总个数。
     */
    getNumZoomLevels: function() {
        var numZoomLevels = null;
        if (this.baseLayer != null) {
            numZoomLevels = this.baseLayer.numZoomLevels;
        }
        return numZoomLevels;
    },

  /********************************************************/
  /*                                                      */
  /*                 Baselayer Functions                  */
  /*                                                      */
  /*    The following functions, all publicly exposed     */
  /*       in the API?, are all merely wrappers to the    */
  /*       the same calls on whatever layer is set as     */
  /*                the current base layer                */
  /*                                                      */
  /********************************************************/

    /**
     * APIMethod: getExtent
     * 获取当前地图的范围。
     * 
     * Returns:
     * {<SuperMap.Bounds>} 当前地图的范围，如果baseLayer未设置，则返回null。
     */
    getExtent: function () {
        var extent = null;
        if (this.baseLayer != null) {
            extent = this.baseLayer.getExtent();
        }
        return extent;
    },

    /**
     * APIMethod: getResolution
     * 获取当前地图的分辨率。
     * 
     * Returns:
     * {Float} 当前地图的分别率， 如果baseLayer未设置，则返回null。
     */
    getResolution: function () {
        var resolution = null;
        if (this.baseLayer != null) {
            resolution = this.baseLayer.getResolution();
        } else if(this.allOverlays === true && this.layers.length > 0) {
            // while adding the 1st layer to the map in allOverlays mode,
            // this.baseLayer is not set yet when we need the resolution
            // for calculateInRange.
            resolution = this.layers[0].getResolution();
        }
        return resolution;
    },

    /**
     * APIMethod: getUnits
     * 获取地图的当前单位。
     *
     * Returns:
     * {String} 地图的当前单位，没有底图的情况下返回的是null。
     */
    getUnits: function () {
        var units = null;
        if (this.baseLayer != null) {
            units = this.baseLayer.units;
        }
        return units;
    },

     /**
      * APIMethod: getScale
      * 获取当前地图的缩放比例。
      * 
      * Returns:
      * {Float} 当前地图的缩放比例。如果baseLayer未设置，则返回null。
      */
    getScale: function () {
        var scale = null;
        if (this.baseLayer != null) {
            var res = this.getResolution();
            var units = this.baseLayer.units;
            if(this.baseLayer.dpi){
                scale = SuperMap.Util.getScaleFromResolutionDpi(res, this.baseLayer.dpi, units, this.baseLayer.datumAxis);
            }else{
                scale = SuperMap.Util.getScaleFromResolution(res, units);
                if(scale)scale = 1/scale;
            }
        }
        return scale;
    },


    /**
     * APIMethod: getZoomForExtent
     * 通过给定的范围获取比例级别。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 指定要获取对应比例级别的范围。
     * closest - {Boolean} 是否找到最符合指定范围的比例级别。注意这样可能会
     *     导致返回的级别不完全包含指定范围。默认值是false。
     *
     * Returns:
     * {Integer} 适应给定范围的缩放级别。如果底图没有设置，返回null。
     */
    getZoomForExtent: function (bounds, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForExtent(bounds, closest);
        }
        return zoom;
    },

    /**
     * APIMethod: getResolutionForZoom
     * 根据缩放级别获取对应分辨率。
     *
     * Parameters:
     * zoom - {Float} 指定要获取对应分辨率的缩放级别。
     *
     * Returns:
     * {Float} 根据指定缩放级别获取的相对应的分辨率。如果没有设置底图，返回null。
     */
    getResolutionForZoom: function(zoom) {
        var resolution = null;
        if(this.baseLayer) {
            resolution = this.baseLayer.getResolutionForZoom(zoom);
        }
        return resolution;
    },

    /**
     * APIMethod: getZoomForResolution
     * 根据分辨率获取对应缩放级别。
     *
     * Parameters:
     * resolution - {Float}  指定要获取对应缩放级别的分辨率。
     * closest - {Boolean} 是否通过分辨率的精确值类获取缩放级别。设置为true
     *      的时候根据分辨率获得的比例级别实际上会小于我们想要的，默认值
     *      为false。
     *
     * Returns:
     * {Integer} 根据指定分辨率获取的相对应的缩放级别。如果没有设置底图，返回null。
     */
    getZoomForResolution: function(resolution, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForResolution(resolution, closest);
        }
        return zoom;
    },

  /********************************************************/
  /*                                                      */
  /*                  Zooming Functions                   */
  /*                                                      */
  /*    The following functions, all publicly exposed     */
  /*       in the API, are all merely wrappers to the     */
  /*               the setCenter() function               */
  /*                                                      */
  /********************************************************/
  
    /** 
     * APIMethod: zoomTo
     * 缩放到指定的级别。
     * 
     * Parameters:
     * zoom - {Integer}  指定缩放级别的整数值。
     */
    zoomTo: function(zoom) {
        if (this.isValidZoomLevel(zoom)) {
            this.setCenter(null, zoom);
        }
    },
    
    /**
     * APIMethod: zoomIn
     * 在当前缩放级别的基础上放大一级。
     * 
     */
    zoomIn: function() {
        this.zoomTo(this.getZoom() + 1);
    },
    
    /**
     * APIMethod: zoomOut
     * 在当前缩放级别的基础上缩小一级。
     * 
     */
    zoomOut: function() {
        this.zoomTo(this.getZoom() - 1);
    },

    /**
     * APIMethod: zoomToExtent
     * 缩放到指定范围，重新定位中心点。
     * 
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 要缩放到的指定范围。
     * closest - {Boolean} 是否找到最符合指定范围的比例级别。注意这样可能会
     *     导致返回的级别不完全包含指定范围。默认值是false。
     * 
     */
    zoomToExtent: function(bounds, closest) {
        if (!(bounds instanceof SuperMap.Bounds)) {
            bounds = new SuperMap.Bounds(bounds);
        }

        var center = bounds.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            var maxExtent = this.getMaxExtent();

            //fix straddling bounds (in the case of a bbox that straddles the 
            // dateline, it's left and right boundaries will appear backwards. 
            // we fix this by allowing a right value that is greater than the
            // max value at the dateline -- this allows us to pass a valid 
            // bounds to calculate zoom)
            //
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth();
            }
            //if the bounds was straddling (see above), then the center point 
            // we got from it was wrong. So we take our new bounds and ask it
            // for the center. Because our new bounds is at least partially 
            // outside the bounds of maxExtent, the new calculated center 
            // might also be. We don't want to pass a bad center value to 
            // setCenter, so we have it wrap itself across the date line.
            //
            center = bounds.getCenterLonLat().wrapDateLine(maxExtent);
        }
        this.setCenter(center, this.getZoomForExtent(bounds, closest));
    },

    /**
     * APIMethod: zoomToMaxExtent
     * 缩放到最大范围，并重新定位中心点。
     *
     * Parameters:
     * options - {Object} 选项对象参数。
     *
     * Allowed Options:
     * restricted - {Boolean} 设置为true就会缩放到 <restrictedExtent> （限定范围），
     *     前提是地图设置了restrictedExtent属性。默认值为true。
     */
    zoomToMaxExtent: function(options) {
        //restricted is true by default
        var restricted = (options) ? options.restricted : true;

        var maxExtent = this.getMaxExtent({
            'restricted': restricted 
        });
        this.zoomToExtent(maxExtent);
    },

    /** 
     * APIMethod: zoomToScale
     * 缩放到指定的比例  
     * 
     * Parameters:
     * scale - {float}  指定要缩放到得比例级别。
     * closest - {Boolean} 查找与指定比例尺最接近的缩放级别(zoomLevel)
     *     默认为 false。
     * 
     */
    zoomToScale: function(scale, closest) {
        var res = SuperMap.Util.getResolutionFromScale(scale, 
                                                         this.baseLayer.units);
        var halfWDeg = (this.size.w * res) / 2;
        var halfHDeg = (this.size.h * res) / 2;
        var center = this.getCachedCenter();

        var extent = new SuperMap.Bounds(center.lon - halfWDeg,
                                           center.lat - halfHDeg,
                                           center.lon + halfWDeg,
                                           center.lat + halfHDeg);
        this.zoomToExtent(extent, closest);
    },
    
  /********************************************************/
  /*                                                      */
  /*             Translation Functions                    */
  /*                                                      */
  /*      The following functions translate between       */
  /*           LonLat, LayerPx, and ViewPortPx            */
  /*                                                      */
  /********************************************************/
      
  //
  // TRANSLATION: LonLat <-> ViewPortPx
  //

    /**
     * Method: getLonLatFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {<SuperMap.LonLat>} An SuperMap.LonLat which is the passed-in view 
     *                       port <SuperMap.Pixel>, translated into lon/lat
     *                       by the current base layer.
     */
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null; 
        if (this.baseLayer != null) {
            lonlat = this.baseLayer.getLonLatFromViewPortPx(viewPortPx);
        }
        return lonlat;
    },

    /**
     * APIMethod: getViewPortPxFromLonLat
     * 根据指定地理位置，返回其相对于当前地图窗口左上角的像素位置。
     *
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 地理位置坐标。
     * 
     * Returns:
     * {<SuperMap.Pixel>} 返回指定地理位置相对于地图窗口左上角的像素坐标。
     */
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null; 
        if (this.baseLayer != null) {
            px = this.baseLayer.getViewPortPxFromLonLat(lonlat);
        }
        return px;
    },

    
  //
  // CONVENIENCE TRANSLATION FUNCTIONS FOR API
  //

    /**
     * APIMethod: getLonLatFromPixel
     * 根据相对于地图窗口左上角的像素位置，返回其在地图上的地理位置。依据当前baselayer转换成 lon/lat (经度/纬度)形式。
     *
     * Parameters:
     * px - {<SuperMap.Pixel>}
     *
     * Returns:
     * {<SuperMap.LonLat>} 指定地图窗口像素坐标所对应的地理位置LonLat对象。
     */
    getLonLatFromPixel: function (px) {
        return this.getLonLatFromViewPortPx(px);
    },

    /**
     * APIMethod: getPixelFromLonLat
     * 获取地图上的像素坐标。依照当前baselayer，将指定的地理点位置坐标，
     * 转换成其相对于地图窗口左上角点的像素坐标。
     * 
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 地图位置。
     * 
     * Returns: 
     * {<SuperMap.Pixel>} 返回视图窗口像素坐标位置，
     *     此坐标是根据当前地图的经纬度坐标转换成的视图窗口像素点坐标。
     */
    getPixelFromLonLat: function (lonlat) {
        var px = this.getViewPortPxFromLonLat(lonlat);
        px.x = Math.round(px.x);
        px.y = Math.round(px.y);
        return px;
    },
    
    /**
     * Method: getGeodesicPixelSize
     * 
     * Parameters:
     * px - {<SuperMap.Pixel>} The pixel to get the geodesic length for. If
     *     not provided, the center pixel of the map viewport will be used.
     * 
     * Returns:
     * {<SuperMap.Size>} The geodesic size of the pixel in kilometers.
     */
    getGeodesicPixelSize: function(px) {
        var lonlat = px ? this.getLonLatFromPixel(px) : (
            this.getCachedCenter() || new SuperMap.LonLat(0, 0));
        var res = this.getResolution();
        var left = lonlat.add(-res / 2, 0);
        var right = lonlat.add(res / 2, 0);
        var bottom = lonlat.add(0, -res / 2);
        var top = lonlat.add(0, res / 2);
        var dest = new SuperMap.Projection("EPSG:4326");
        var source = this.getProjectionObject() || dest;
        if(!source.equals(dest)) {
            left.transform(source, dest);
            right.transform(source, dest);
            bottom.transform(source, dest);
            top.transform(source, dest);
        }
        
        return new SuperMap.Size(
            SuperMap.Util.distVincenty(left, right),
            SuperMap.Util.distVincenty(bottom, top)
        );
    },



  //
  // TRANSLATION: ViewPortPx <-> LayerPx
  //

    /**
     * APIMethod: getViewPortPxFromLayerPx
     * 根据图层像素点坐标获取视图窗口像素点坐标。
     * 
     * Parameters:
     * layerPx - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {<SuperMap.Pixel>} 将图层像素点转换成视图窗口像素点坐标。
     */
    getViewPortPxFromLayerPx:function(layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this.layerContainerDiv.style.left);
            var dY = parseInt(this.layerContainerDiv.style.top);
            viewPortPx = layerPx.add(dX, dY);            
        }
        return viewPortPx;
    },
    
    /**
     * APIMethod: getLayerPxFromViewPortPx
     * 根据视图窗口像素点坐标获取图层像素点坐标。
     * 
     * Parameters:
     * viewPortPx - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {<SuperMap.Pixel>} 视图窗口像素点坐标转换成图层像素点坐标。
     */
    getLayerPxFromViewPortPx:function(viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this.layerContainerDiv.style.left);
            var dY = -parseInt(this.layerContainerDiv.style.top);
            layerPx = viewPortPx.add(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null;
            }
        }
        return layerPx;
    },
    
  //
  // TRANSLATION: LonLat <-> LayerPx
  //

    /**
     * Method: getLonLatFromLayerPx
     * 
     * Parameters:
     * px - {<SuperMap.Pixel>}
     *
     * Returns:
     * {<SuperMap.LonLat>}
     */
    getLonLatFromLayerPx: function (px) {
       //adjust for displacement of layerContainerDiv
       px = this.getViewPortPxFromLayerPx(px);
       return this.getLonLatFromViewPortPx(px);         
    },
    
    /**
     * APIMethod: getLayerPxFromLonLat
     * 根据传入的大地坐标获取图层坐标对象。
     * 
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 坐标点参数。
     *
     * Returns:
     * {<SuperMap.Pixel>} 通过传进的LonLat对象返回气相对于图层的坐标Pixel对象。
     */
    getLayerPxFromLonLat: function (lonlat) {
       //adjust for displacement of layerContainerDiv
       var px = this.getPixelFromLonLat(lonlat);
       return this.getLayerPxFromViewPortPx(px);         
    },

    CLASS_NAME: "SuperMap.Map"
});

/**
 * Constant: TILE_WIDTH
 * {Integer} 瓦片默认宽度 256。
 */
SuperMap.Map.TILE_WIDTH = 256;
/**
 * Constant: TILE_HEIGHT
 * {Integer} 瓦片默认高度 256。
 */
SuperMap.Map.TILE_HEIGHT = 256;



