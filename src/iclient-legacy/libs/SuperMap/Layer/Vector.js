/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer.js
 * @requires SuperMap/Renderer.js
 * @requires SuperMap/StyleMap.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Console.js
 * @requires SuperMap/Lang.js
 */

/**
 * Class: SuperMap.Layer.Vector
 * 该图层用于渲染矢量要素。
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.Vector = SuperMap.Class(SuperMap.Layer, {

    /**
     * Register a listener for a particular event with the following syntax:
     * (code)
     * layer.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to layer.events.object.
     * element - {DOMElement} A reference to layer.events.element.
     *
     * Supported map event types (in addition to those from <SuperMap.Layer>):mo
     * beforefeatureadded - Triggered before a feature is added.  Listeners
     *      will receive an object with a *feature* property referencing the
     *      feature to be added.  To stop the feature from being added, a
     *      listener should return false.
     * beforefeaturesadded - Triggered before an array of features is added.
     *      Listeners will receive an object with a *features* property
     *      referencing the feature to be added. To stop the features from
     *      being added, a listener should return false.
     * featureadded - Triggered after a feature is added.  The event
     *      object passed to listeners will have a *feature* property with a
     *      reference to the added feature.
     * featuresadded - Triggered after features are added.  The event
     *      object passed to listeners will have a *features* property with a
     *      reference to an array of added features.
     * beforefeatureremoved - Triggered before a feature is removed. Listeners
     *      will receive an object with a *feature* property referencing the
     *      feature to be removed.
     * beforefeaturesremoved - Triggered before multiple features are removed. 
     *      Listeners will receive an object with a *features* property
     *      referencing the features to be removed.
     * featureremoved - Triggerd after a feature is removed. The event
     *      object passed to listeners will have a *feature* property with a
     *      reference to the removed feature.
     * featuresremoved - Triggered after features are removed. The event
     *      object passed to listeners will have a *features* property with a
     *      reference to an array of removed features.
     * beforefeatureselected - Triggered after a feature is selected.  Listeners
     *      will receive an object with a *feature* property referencing the
     *      feature to be selected. To stop the feature from being selectd, a
     *      listener should return false.
     * featureselected - Triggered after a feature is selected.  Listeners
     *      will receive an object with a *feature* property referencing the
     *      selected feature.
     * featureunselected - Triggered after a feature is unselected.
     *      Listeners will receive an object with a *feature* property
     *      referencing the unselected feature.
     * beforefeaturemodified - Triggered when a feature is selected to 
     *      be modified.  Listeners will receive an object with a *feature* 
     *      property referencing the selected feature.
     * featuremodified - Triggered when a feature has been modified.
     *      Listeners will receive an object with a *feature* property referencing 
     *      the modified feature.
     * afterfeaturemodified - Triggered when a feature is finished being modified.
     *      Listeners will receive an object with a *feature* property referencing 
     *      the modified feature.
     * vertexmodified - Triggered when a vertex within any feature geometry
     *      has been modified.  Listeners will receive an object with a
     *      *feature* property referencing the modified feature, a *vertex*
     *      property referencing the vertex modified (always a point geometry),
     *      and a *pixel* property referencing the pixel location of the
     *      modification.
     * vertexremoved - Triggered when a vertex within any feature geometry
     *      has been deleted.  Listeners will receive an object with a
     *      *feature* property referencing the modified feature, a *vertex*
     *      property referencing the vertex modified (always a point geometry),
     *      and a *pixel* property referencing the pixel location of the
     *      removal.
     * sketchstarted - Triggered when a feature sketch bound for this layer
     *      is started.  Listeners will receive an object with a *feature*
     *      property referencing the new sketch feature and a *vertex* property
     *      referencing the creation point.
     * sketchmodified - Triggered when a feature sketch bound for this layer
     *      is modified.  Listeners will receive an object with a *vertex*
     *      property referencing the modified vertex and a *feature* property
     *      referencing the sketch feature.
     * sketchcomplete - Triggered when a feature sketch bound for this layer
     *      is complete.  Listeners will receive an object with a *feature*
     *      property referencing the sketch feature.  By returning false, a
     *      listener can stop the sketch feature from being added to the layer.
     * refresh - Triggered when something wants a strategy to ask the protocol
     *      for a new set of features.
     * featuremove - 要素绘制过程中，移动要素时触发此事件
     * featurerotate - 要素绘制过程中，旋转要素时触发此事件
     * featureresize - 要素绘制过程中，缩放要素时触发此事件
     */
     
     EVENT_TYPES: ["beforefeatureadded", "beforefeaturesadded",
        "featureadded", "featuresadded", "beforefeatureremoved",
        "beforefeaturesremoved", "featureremoved", "featuresremoved",
        "beforefeatureselected", "featureselected", "featureunselected",
        "beforefeaturemodified", "featuremodified", "afterfeaturemodified",
        "vertexmodified", "vertexremoved", "sketchstarted",
        "sketchmodified", "sketchcomplete", "refresh",'featuremove','featurerotate','featureresize'],

    /**
     * APIProperty: isBaseLayer
     * {Boolean} 该图层是否是 基础图层，默认值为 false。可以在构造函数中是通过options设置。
     */
    isBaseLayer: false,

    /** 
     * APIProperty: isFixed
     * {Boolean} 设置当前图层在鼠标拖动及放大缩小时位置是否固定，默认为 false。
     */
    isFixed: false,
    /**
     * Property: isFirstDraw
     * {Boolean} 是否是第一次绘制，用于协助isFixed。
     */
    isFirstDraw:true,

    /**
     * APIProperty: clipFeature
     * {Boolean} 是否对要素进行裁剪，当图层使用SVG或者VML渲染时候有效，默认为true。注意此属性在Canvas渲染时无效，Canvas图层不进行裁剪。
     */
    clipFeature:true,

    /** 
     * APIProperty: features
     * {Array(<SuperMap.Feature.Vector>)}用于存放矢量要素。
     */
    features: null,
    
    /** 
     * Property: filter
     * {<SuperMap.Filter>} The filter set in this layer,
     *     a strategy launching read requests can combined
     *     this filter with its own filter.
     */
    filter: null,
    
    /** 
     * Property: selectedFeatures
     * {Array(<SuperMap.Feature.Vector>)} 
     */
    selectedFeatures: null,
    
    /**
     * Property: unrenderedFeatures
     * {Object} 由feature对象组成的hash表，key值为feature.id，标识渲染失败的feature。
     */
    unrenderedFeatures: null,

    /**
     * APIProperty: reportError
     * {Boolean} 当读取渲染器失败时，是否发送友好的的错误消息，默认为true。
     */
    reportError: true, 

    /** 
     * APIProperty: style
     * {Object} 当前图层的默认样式。
     */
    style: null,
    
    /**
     * APIProperty: styleMap
     * {<SuperMap.StyleMap>} 适用于图层的样式组，包含不同状态下的样式信息，使用方式参考 <SuperMap.StyleMap>
     */
    styleMap: null,
    
    /**
     * Property: strategies
     * {Array(<SuperMap.Strategy>})} 可选属性中的策略。
     */
    strategies: null,
    
    /**
     * Property: protocol
     * {<SuperMap.Protocol>} 可选属性中的协议。
     */
    protocol: null,
    
    /**
     * APIProperty: renderers
     * {Array(String)} 可支持渲染器的列表，支持的渲染方式有'SVG', 'VML', 'Canvas'，'Canvas2'
     * 如果在可选属性中未设置 'renderer' 选项，则使用当前浏览器支持的此列表中的第一个渲染方式。
     * Canvas、Canvas2 渲染方式均是基于 Html5 Canvas 实现的，若使用这两种方式渲染矢量数据的话需要选用支持Html5  
     * Canvas的浏览器。其中，Canvas2 是对 Canvas 在性能上的优化，Canvas2 只绘制发生变化的瓦片，减少了重绘次数，
     * 提高了绘制速度，而且对于数量在10000以上的矢量要素，采用分块显示，增强了用户体验效果。
     * 相对于Canvas，建议使用Canvas2渲染方式。
     * 这几种渲染方式都可以实现对要素的编辑，在IE9以下建议用 SVG、VML 两种渲染方式，其他浏览器建议使用Canvas渲染。
     */
    renderers: ['SVG', 'VML', 'Canvas', 'Canvas2'],
    
    /** 
     * Property: renderer
     * {<SuperMap.Renderer>}
     */
    renderer: null,
    
    /**
     * APIProperty: rendererOptions
     * {Object} 渲染器的可选属性。
     */
    rendererOptions: null,
    
    /** 
     * APIProperty: geometryType
     * {String} geometryType可以设置此图层几何形状的限制，
     * 比如可以设置为 "SuperMap.Geometry.Point" 进行限制。
     */
    geometryType: null,

    /** 
     * Property: drawn
     * {Boolean} 是否这个图层的feature已经被绘制。
     */
    drawn: false,
    
    /** 
     * APIProperty: ratio
     * {Float} 设置矢量要素在图层中与map上的比例，默认为1。
     */ 
    ratio: 1,

    /** 
    * APIProperty: transition
    * {Boolean} 是否使用缩放动画，默认为true。
    * 缩放动画只在使用Canvas2渲染时有效。
    */
    transition: true,

    /** 
     * Property: firstload
     * {Boolean} 是否第一次加载。
     */    
    firstLoad: true,
    
    /** 
     * Property: featureGridList
     * {Array} 二维数组，行号代表所对应的分块，列代表每一分块的feature集合。
     */ 
    featureGridList: [],

    /** 
     * Property: featuresGridRow
     * {Number} 设置分组的行数。
     */     
    featuresGridRow: 10,

    /** 
     * Property: featuresGridColumn
     * {Number} 设置分组的列数。
     */
    featuresGridColumn: 20,
    
    /** 
     * Property: unitsWidth
     * {Double} 每一分块的地理宽度。
     */    
    unitsWidth: null,
    
    /** 
     * Property: unitsHeight
     * {Double} 每一分块的地理高度。
     */    
    unitsHeight: null,    
    
    /** 
     * Property: featuresGrid
     * {Array} 数组的长度是 featuresGridRow 与 featuresGridColumn 相乘。
     * 保存着每一分块的地理范围。
     */    
    featuresGrid: [],

    /** 
     * Property: zoomChanged
     * {Boolean} 当前的地图操作是否是缩放操作。
     */
    zoomChanged: null,
    
    /** 
     * Property: useCanvas2
     * {Function} 当前的渲染器是否使用 Canvas2，即高速渲染图层。
     */ 
    useCanvas2: false,
 
   // /** 
     //* Property: backStyle
     //* {Object} 提高性能：缓存计算出的style为下次同样的style使用。
     //*/  
    //backStyle: null,
    
    /**
     * Property: lastResolution
     * {Number} 记录上一次的Resolution
     */
    lastResolution: 0.0,

    /**
     * Property: lastCanvasPosition
     * {<SuperMap.LonLat>} 获取Canvas左上角相对于当前图层的地理位置。
     */
    lastCanvasPosition: 0,


    
    /**
     * Constructor: SuperMap.Layer.Vector
     * 创建一个矢量图层。
     * (start code)
     * //创建一个名为“Vector Layer”    、采用 Canvas2 渲染方式渲染的矢量图层。
     *  var vectorLayer = new SuperMap.Layer.Vector("Vector Layer", {renderers: ["Canvas2"]});
     * (end)     
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.Vector>} 新的矢量图层。
     */
    initialize: function(name, options) {
        this.EVENT_TYPES =
            SuperMap.Layer.Vector.prototype.EVENT_TYPES.concat(
            SuperMap.Layer.prototype.EVENT_TYPES
        );

        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        
        //判断是否设置了renderer，没有则通过渲染器列表判断支持情况。
        if (!this.renderer || !this.renderer.supported()) {  
            this.assignRenderer();
        }

        // 如果最终没有可用的renderer，显示错误信息。
        if (!this.renderer || !this.renderer.supported()) {
            this.renderer = null;
            this.displayError();
        } 

        if (!this.styleMap) {
            this.styleMap = new SuperMap.StyleMap();
        }
        // this.features = {};
        this.features = [];
        this.selectedFeatures = [];
        this.unrenderedFeatures = {};
        if(this.strategies){
            for(var i=0, len=this.strategies.length; i<len; i++) {
                this.strategies[i].setLayer(this);
            }
        }
        this.tempIndex = [];
        //this.backStyle = {};
        //这个图层是否是使用canvas渲染，因为我们在canvas上做了一些优化，所以得判断下。
        this.useCanvas2 = this.renderer instanceof SuperMap.Renderer.Canvas2;
    },

    /**
     * APIMethod: destroy
     * 销毁Vector图层，释放资源。
     */
    destroy: function() {
        if (this.strategies) {
            var strategy, i, len;
            for(i=0, len=this.strategies.length; i<len; i++) {
                strategy = this.strategies[i];
                if(strategy.autoDestroy) {
                    strategy.destroy();
                }
            }
            this.strategies = null;
        }
        if (this.protocol) {
            if(this.protocol.autoDestroy) {
                this.protocol.destroy();
            }
            this.protocol = null;
        }
        this.destroyFeatures();
        this.features = null;
        this.selectedFeatures = null;
        this.unrenderedFeatures = null;
        if (this.renderer) {
            this.renderer.destroy();
        }
        this.renderer = null;
        this.geometryType = null;
        this.drawn = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);  
    },

    //toTest
    /**
     * Method: clone
     * 创建这个图层的副本。
     * 
     * 注意: 这个图层上的Features一样会被克隆。 
     *
     * Returns:
     * {<SuperMap.Layer.Vector>} 图层对象的副本。
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new SuperMap.Layer.Vector(this.name, this.getOptions());
        }

        obj = SuperMap.Layer.prototype.clone.apply(this, [obj]);
        
        var features = this.features;
        var len = features.length;
        var clonedFeatures = new Array(len);
        for(var i=0; i<len; ++i) {
            clonedFeatures[i] = features[i].clone();
        }
        obj.features = clonedFeatures;
        
        return obj;
        // var features = this.features;
        // var clonedFeatures = {};
        // for(var id in features) {
            // clonedFeatures[id] = features[id].clone();
        // }
        // obj.features = clonedFeatures;

        // return obj;
    },    
    
    /**
     * Method: refresh
     * 让图层重新请求Features并重绘。
     *     Triggers the refresh event if the layer is in range and visible.
     *
     * Parameters:
     * obj - {Object} Optional object with properties for any listener of
     *     the refresh event.
     */
    refresh: function(obj) {
        if(this.calculateInRange() && this.visibility) {
            this.events.triggerEvent("refresh", obj);
        }
    },

    /** 
     * Method: assignRenderer
     * 获取一个当前浏览器支持的渲染方式。
     */    
    assignRenderer: function()  {
        for (var i=0, len=this.renderers.length; i<len; i++) {
            var rendererClass = this.renderers[i];
            var renderer = (typeof rendererClass === "function") ?
                rendererClass :
                SuperMap.Renderer[rendererClass];
            if (renderer && renderer.prototype.supported()) {
                this.renderer = new renderer(this.div, this.rendererOptions, this);
                break;
            }  
        }  
    },

    /** 
     * Method: displayError 
     * 让用户知道他的浏览器不支持。
     */
    displayError: function() {
        /* SuperMap.Console类会被删除，下面的代码运行会出错。
     * if (this.reportError) {
            SuperMap.Console.userError(SuperMap.i18n("browserNotSupported", 
                                     {'renderers':this.renderers.join("\n")}));
        }*/
    },

    /** 
     * Method: setMap
     * 图层已经添加到Map控件中。
     * 
     * 如果没有设置renderer集合，这个图层将不可用，从map控件中删除，
     * 否则，给当前渲染器添加map的引用，并设置渲染器的大小。
     * 
     * Parameters:
     * map - {<SuperMap.Map>}需要与图层绑定的map。
     */
    setMap: function(map) {        
        SuperMap.Layer.prototype.setMap.apply(this, arguments);

        if (!this.renderer) {
            this.map.removeLayer(this);
        } else {
            this.renderer.map = this.map;

            var newSize = this.map.getSize();
            newSize.w = newSize.w * this.ratio;
            newSize.h = newSize.h * this.ratio;
            this.renderer.setSize(newSize);
        }
    },

    /**
     * Method: afterAdd
     * Called at the end of the map.addLayer sequence.  At this point, the map
     *     will have a base layer.  Any autoActivate strategies will be
     *     activated here.
     */
    afterAdd: function() {
        if(this.strategies) {
            var strategy, i, len;
            for(i=0, len=this.strategies.length; i<len; i++) {
                strategy = this.strategies[i];
                if(strategy.autoActivate) {
                    strategy.activate();
                }
            }
        }
    },

    /**
     * Method: removeMap
     * The layer has been removed from the map.
     *
     * Parameters:
     * map - {<SuperMap.Map>}
     */
    removeMap: function(map) {
        this.drawn = false;
        if(this.strategies) {
            var strategy, i, len;
            for(i=0, len=this.strategies.length; i<len; i++) {
                strategy = this.strategies[i];
                if(strategy.autoActivate) {
                    strategy.deactivate();
                }
            }
        }
    },
    
    /**
     * Method: onMapResize
     * 通知渲染器的尺寸变化。
     * 
     */
    onMapResize: function() {
        SuperMap.Layer.prototype.onMapResize.apply(this, arguments);
        var newSize = this.map.getSize();
        newSize.w = newSize.w * this.ratio;
        newSize.h = newSize.h * this.ratio;
        this.renderer.setSize(newSize);
    },

    /**
     * Method: moveTo
     * 重置当前矢量图层的div，再一次与Map控件保持一致。
     * 通知渲染器视图范围的改变，在缩放级别改变时，重绘对象。
     *
     * 如果对象未绘制，则遍历对象，并绘制。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 
     * zoomChanged - {Boolean} 
     * dragging - {Boolean} 
     */
    moveTo: function(bounds, zoomChanged, dragging) {
        var me = this;
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        //设置了固定位置后
        if(this.isFixed && !this.isFirstDraw)
        {
            if(zoomChanged)
            {
                this.div.style.left = 0 + 'px';
                this.div.style.top = 0 + 'px';
            }
            else
            {
                this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left, 10) + 'px';
                this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top, 10) + 'px';
            }

            return;
        }
        this.isFirstDraw = false;

        var useCanvas2 = this.useCanvas2;
        this.zoomChanged = zoomChanged;
        var ng = (SuperMap.Renderer.NG && this.renderer instanceof SuperMap.Renderer.NG);
        if (ng) {
            dragging || this.renderer.updateDimensions(zoomChanged);
        } else {
            var coordSysUnchanged = true;

            if (!dragging) {
                this.renderer.root.style.visibility = "hidden";        
                //保存canvas绘图状态。
                if(useCanvas2){
                    this.renderer.restoreCanvas();
                }
                var viewSize = this.map.getSize(),
                viewWidth = viewSize.w,
                viewHeight = viewSize.h,
                offsetLeft = (viewWidth / 2 * this.ratio) - viewWidth / 2,
                offsetTop = (viewHeight / 2 * this.ratio) - viewHeight / 2;
        offsetLeft += parseInt(this.map.layerContainerDiv.style.left, 10);
            offsetLeft = -Math.round(offsetLeft);
            offsetTop += parseInt(this.map.layerContainerDiv.style.top, 10);
            offsetTop = -Math.round(offsetTop);
                this.div.style.left = offsetLeft + 'px';
                this.div.style.top = offsetTop + 'px';
                var extent = this.map.getExtent().scale(this.ratio);
                //在setExtent方法中设置了canvasRenderer的lastbounds。
                coordSysUnchanged = this.renderer.setExtent(extent, zoomChanged);

                this.renderer.root.style.visibility = "visible";

                // Force a reflow on gecko based browsers to prevent jump/flicker.
                // This seems to happen on only certain configurations; it was originally
                // noticed in FF 2.0 and Linux.
                if (SuperMap.IS_GECKO === true) {
                    this.div.scrollLeft = this.div.scrollLeft;
                }
            
                //在canvas渲染的情况下永远进不来。
                if(!zoomChanged && coordSysUnchanged) {
                    this.drawFeatures(bounds);
//                    for(var i in this.unrenderedFeatures) {
//                        var feature = this.unrenderedFeatures[i];
//
//                    }
                }
            }
        }

        if (!this.drawn || (!ng && (zoomChanged || !coordSysUnchanged))) {
            this.drawn = true;
            //如果是canvas2则有缩放动画
            if(this.transition && useCanvas2){
                if(!zoomChanged ||!this.lastCanvasPosition) {
                    this.drawFeatures(bounds);
                }else {
                    var lefttop = this.map.getLayerPxFromLonLat(this.lastCanvasPosition),
                        callback = SuperMap.Function.bind(function(){
                           　 return function(zoomChanged) {
                                 me.drawFeatures(bounds, zoomChanged);
                             }(zoomChanged)
                        }, this);
                    this.renderer.transitionObj.begin(this.renderer.root, lefttop, callback);
                }
            }
            //如果不是canvas选热则使用正常的步骤进行。
            if(!useCanvas2 || !this.transition) {
                this.drawFeatures(bounds);        
            }
            this.firstLoad = false;
        }
        
        //为渲染器做缩放动画做参数。
        if(useCanvas2){
            this.lastResolution = this.map.getResolution();
            var canvasPosition = new SuperMap.Pixel(parseInt(this.renderer.container.style.left), 
                parseInt(this.renderer.container.style.top));
            this.lastCanvasPosition = this.map.getLonLatFromLayerPx(canvasPosition);
        }
    },
    /**
     * Method: moveByPx
     * 重写父类方法。
     */
    moveByPx: function(dx, dy) {
        if(this.isFixed)
        {
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left, 10) + 'px';
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top, 10) + 'px';
        }
    },
    
    /**
     * Method: drawFeatures
     * 遍历所有features，并绘制，
     */
     drawFeatures: function(bounds, zoomChanged) {
        var me = this, 
            feature, 
            drawFeatures = me.features;
        //这里我们为了提高性能把features数组变成了对象，
        //但是在除了canvas的绘图方式时候我们不能这样做，
        //所以还得转化回数组。
        // var drawFeatures = [];
        // for(var hex in me.features){
            // feature = me.features[hex];
            // drawFeatures.push(feature);
        // }
        me.renderer.locked = true;
        for(var i = 0, len = drawFeatures.length; i < len; i++) {
            if(i === (len - 1)){
                me.renderer.locked = false;
            }
            feature = drawFeatures[i];
            me.drawFeature(feature, undefined, {isNewAdd: me.firstLoad || (zoomChanged || me.zoomChanged) });
        }
    },
       
    /**
     * APIMethod: redraw
     * 重绘该图层，成功则返回true，否则返回false。
     *
     * Returns:
     * {Boolean} 重绘该图层。
     */
    redraw: function() {
        if (SuperMap.Renderer.NG && this.renderer instanceof SuperMap.Renderer.NG) {
            this.drawn = false;
        }
        return SuperMap.Layer.prototype.redraw.apply(this, arguments);
    },
    
    /** 
     * APIMethod: display
     * 临时隐藏或者显示图层。通过对CSS控制产生即时效果，重新渲染失效。 一般用 setVisibility 方法来动态控制图层的显示和隐藏。
     * 
     * Parameters:
     * display - {Boolean}true代表不隐藏，false代表隐藏。
     * (start code)
     * vectorLayer.display(true/false);
     * (end)
     */
    display: function(display) {
        SuperMap.Layer.prototype.display.apply(this, arguments);
        // we need to set the display style of the root in case it is attached
        // to a foreign layer
        var currentDisplay = this.div.style.display;
        if(currentDisplay !== this.renderer.root.style.display) {
            this.renderer.root.style.display = currentDisplay;
        }
    },

    ///**
    // * APIMethod: setOpacity
    // * 设置图层的不透明度,取值[0-1]之间。使用方法如：
    // *
    // * (code)
    // * var vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
    // * vectorLayer.setOpacity(0.2);
    // * (end)
    // *
    // * Parameter:
    // * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
    // */
    //setOpacity: function(opacity) {
    //    if (opacity !== this.opacity) {
    //        this.opacity = opacity;
    //        var element = this.renderer.root;
    //        SuperMap.Util.modifyDOMElement(element, null, null, null,
    //                                             null, null, null, opacity);
    //        // 区分canvas图层和普通瓦片img图层对待
    //        // if(this.useCanvas){
    //        //     this.redraw();
    //        // }else{
    //        //     var element = this.renderer.root;
    //        //     SuperMap.Util.modifyDOMElement(element, null, null, null,
    //        //                                      null, null, null, opacity);
    //        //     for(var i=0, len=this.div.childNodes.length; i<len; ++i) {
    //        //         var element = this.div.childNodes[i].firstChild;
    //        //         SuperMap.Util.modifyDOMElement(element, null, null, null,
    //        //                                      null, null, null, opacity);
    //        //     }
    //        // }
    //
    //        if (this.map != null) {
    //            this.map.events.triggerEvent("changelayer", {
    //                layer: this,
    //                property: "opacity"
    //            });
    //        }
    //    }
    //},
    
    /**
     * APIMethod: addFeatures
     * 给这个图层添加features。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)}需要添加的要素数组。
     */
    addFeatures: function(features, options) {
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        
        var notify = !options || !options.silent;
        if(notify) {
            var event = {features: features};
            var ret = this.events.triggerEvent("beforefeaturesadded", event);
            if(ret === false) {
                return;
            }
            features = event.features;
        }
        
        var featuresFailAdded = [];                
        this.renderer.locked = true;
        
        for (var i=0, len=features.length; i<len; i++) {
            if (i === (len - 1)) {
                this.renderer.locked = false;
            }    
            var feature = features[i];            
            //如果设置了类型限制，则判断他。
            if (this.geometryType &&
              !(feature.geometry instanceof this.geometryType)) {
                throw new TypeError('addFeatures: component should be an ' +
                                    this.geometryType.prototype.CLASS_NAME);
            }
            //给feature当前图层的引用。
            feature.layer = this;
            // 取消给Feature强制赋值样式，避免二次更改失效 by hansj
            // if (!feature.style && this.style) {
                // feature.style = SuperMap.Util.extend({}, this.style);
            // }       

            // this.features[feature.id] = feature;
            this.features.push(feature);
            //geometry 类型为 GeoText 的要素（标签）交给策略 Strategy.GeoText 展现，这里不进行绘制。
            if(feature.geometry && feature.geometry.CLASS_NAME === "SuperMap.Geometry.GeoText"){continue;}
            //此时的feature是新添加的feature。
            var drawn = this.drawFeature(feature, undefined, {isNewAdd: true});
            
            //如果当前feature不可被绘制则加入到featuresFailAdded数组中。
            if(!drawn) {
                featuresFailAdded.push(feature);
            }
        }
        var succeed = featuresFailAdded.length == 0 ? true : false;
        this.events.triggerEvent("featuresadded", {features: featuresFailAdded, succeed: succeed});
    },
    
    /**
     * Method: destroyFeatures
     * Erase and destroy features on the layer.
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} An optional array of
     *     features to destroy.  If not supplied, all features on the layer
     *     will be destroyed.
     * options - {Object}
     */
    destroyFeatures: function(features, options) {
        var all = (features == undefined); // evaluates to true if
                                           // features is null
        if(all) {
            features = this.features;
        }
        if(features) {
            this.removeFeatures(features, options);
            for(var i=features.length-1; i>=0; i--) {
                features[i].destroy();
            }
        }
    },
    
    /**
     * APIMethod: removeFeatures
     * 从当前图层中删除feature。这个函数擦除所有传递进来的矢量要素。
     * 参数中的features数组中的每一项，必须是已经添加到当前图层中的feature，
     * 如果无法确定feature数组，则可以调用removeAllFeatures来删除所有feature。
     * 如果要删除的feature数组中的元素特别多，推荐使用removeAllFeatures，
     * 删除所有feature后再重新添加。这样效率会更高。
     * 
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要删除feature的数组。
     */
    removeFeatures: function(features) {
        if(!features || features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        if (features === this.selectedFeatures) {
            features = features.slice();
        }
        var featuresFailRemoved = [];
        
        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];
            delete this.unrenderedFeatures[feature.id];
            
            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。           
            var findex = SuperMap.Util.indexOf(this.features, feature);
            
            if(findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            this.features.splice(findex, 1);
            if (SuperMap.Util.indexOf(this.selectedFeatures, feature) !== -1){
                SuperMap.Util.removeItem(this.selectedFeatures, feature);
            }
            // if(!this.features[feature.id]) {
                // featuresFailRemoved.push(feature);
                // continue;
            // }
            //delete this.features[feature.id];
			//这里移除了feature之后将它的layer也移除掉，避免内存泄露
            feature.layer = null;
        }
        
        //先清除再重绘。
        this.renderer.clear();
        // this.redraw();
        var drawFeatures = [];
        for(var hex = 0, len = this.features.length; hex < len; hex++){
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this.addFeatures(drawFeatures);
        
        var succeed = featuresFailRemoved.length == 0 ? true : false;
        this.events.triggerEvent("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    },
    
    /** 
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function() {
        this.renderer.clear();
        this.featureGridList = [];
        // this.features = {};
        this.features = [];
        this.unrenderedFeatures = {};
        this.selectedFeatures = [];
        this.events.triggerEvent("featuresremoved", {features: [], succeed: true});
    },

    /**
     * APIMethod: drawFeature
     * 在当前图层中绘制一个feature。如果参数中的样式（style）被设置
     * 则使用。否则使用矢量要素的样式。如果未设置要素的样式，则使用图层上的样式。
     * 
     * 当要素的样式更改或者要素已经添加到图层上需要更新时使用该函数。
     *
     * Parameters: 
     * feature - {<SuperMap.Feature.Vector>}需要绘制的要素
     * style - {String | Object} 风格
     */
    drawFeature: function(feature, style, option) {
        var t = this;
        // don't try to draw the feature with the renderer if the layer is not 
        // drawn itself
        if (!this.drawn) {
            return;
        }
        if (!style||typeof style !== "object") {
            if(!style && feature.state === SuperMap.State.DELETE) {
                style = "delete";
            }
            var renderIntent = feature.renderIntent;
            if(renderIntent==="select"&&feature._selectStyle){
                style= feature._selectStyle;
            }
            else{
                style = feature.style || this.style;
            }
            if (!style) {
                style = this.styleMap.createSymbolizer(feature, renderIntent);
                /*if(!this.backStyle[renderIntent]){
                    style = this.styleMap.createSymbolizer(feature, renderIntent);
                    this.backStyle[renderIntent] = style;
                } else {
                    feature.renderIntent = renderIntent;
                    style = this.backStyle[renderIntent];
                }*/
            }
        }
        var drawn;
        //Canvas Canvas2绘制性能很高，不需要裁剪，裁剪了反而影响了很大的性能问题
        //if(this.clipFeature&& (this.renderer.CLASS_NAME === "SuperMap.Renderer.SVG") || (this.renderer.CLASS_NAME === "SuperMap.Renderer.VML"))
        if(this.clipFeature&& (this.renderer instanceof SuperMap.Renderer.SVG) || (this.renderer instanceof SuperMap.Renderer.VML))
        {
            //进行裁剪，需要替换掉geo
            var geo = feature.geometry;
            //对SVG和VML做的特殊处理，由于裁剪后生成的geo和裁剪前不一定一样，数量可能改变，id无法对应，所以需要处理掉之前绘制的svg
			if(geo){
                    //移除label，如果不存在，内部会自动判定，这里不用判定
                    this.renderer.removeText(feature.id);
                    this.renderer.removeBackground(geo.id);
                    //获取id
                    if ((geo.CLASS_NAME === "SuperMap.Geometry.Collection") ||
                        (geo.CLASS_NAME === "SuperMap.Geometry.MultiPoint") ||
                        (geo.CLASS_NAME === "SuperMap.Geometry.MultiLineString") ||
                        (geo.CLASS_NAME === "SuperMap.Geometry.MultiPolygon")
                        || geo.isMultiPlotting || geo.isPlottingGeometry ) {
                        for (var i = 0, len = geo.components.length; i < len; i++) {
                            var id = geo.components[i].id;
                            //if(document.getElementById(id))
                            //{
                            //	this.renderer.vectorRoot.removeChild(document.getElementById(id));
                            //}
                            loopRemoveDom(id);
                        }
                    }
				else
				{
                        //if(document.getElementById(geo.id))
                        //{
                        //	this.renderer.vectorRoot.removeChild(document.getElementById(geo.id));
                        //}
                            loopRemoveDom(geo.id);
                    }
			}

            //将当前窗口的bounds扩大一倍进行裁剪
            var bou = this.getExtent();
            var wi = bou.getWidth();
            var he = bou.getHeight();
            // isRetArr参数设置为true，当裁剪为多段时，返回一个多线
            var geometry  = SuperMap.Util.clipGeometryRect(feature.geometry,new SuperMap.Bounds(bou.left-wi,bou.bottom-he,bou.right+wi,bou.top+he),true,true);
            feature.geometry = geometry;

                drawn = this.renderer.drawFeature(feature, style, option);
            //绘制完毕后在换回来
            feature.geometry = geo;
            //设置feature的鼠标样式
            this.renderer.vectorRoot.style.cursor="pointer";
        }
        else
        {
            drawn = this.renderer.drawFeature(feature, style, option);
            //this.renderer.container.style.cursor="pointer";
        }

        // TODO remove the check for null when we get rid of Renderer.SVG
        if (drawn === false || drawn === null) {
            this.unrenderedFeatures[feature.id] = feature;
        } else {
            delete this.unrenderedFeatures[feature.id];
        }
        
        return drawn;
        //对于多线对象，各个标签都有后缀“_clip_i”,该方法用于确保将裁剪后的多段线都删掉
        function loopRemoveDom(id,i){
            if(i){
                var a = document.getElementById(id+"_clip_"+i);
                i++;
            }
            else{
                var a = document.getElementById(id);
                i=1;
            }
            if(a)
            {
                        t.renderer.vectorRoot.removeChild(a);
                    loopRemoveDom(id, i);
            }
        }
    },
    
    /**
     * Method: eraseFeatures
     * 擦除feature的显示，但是不从列表中删除。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 
     */
    eraseFeatures: function(features) {
        this.renderer.eraseFeatures(features);
    },

    /**
     * Method: getFeatureFromEvent
     * 通过一个事件，从渲染器中获取一个对应的feature，如果没有则返回null。
     *
     * Parameters:
     * evt - {Event} 
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 一个通过事件选中的feature。
     */
    getFeatureFromEvent: function(evt) {
       if(this.visibility == false)
        return null;

        if (!this.renderer) {
            throw new Error('getFeatureFromEvent called on layer with no ' +
                            'renderer. This usually means you destroyed a ' +
                            'layer, but not some handler which is associated ' +
                            'with it.');
        }
        var feature = null;
        var featureId = this.renderer.getFeatureIdFromEvent(evt);
        if (featureId) {
            if (typeof featureId === "string") {
                feature = this.getFeatureById(featureId);
            } else {
                feature = featureId;
            }
        }
        return feature;
    },

    /**
     * Method: getFeatureBy
     * 在Vector的要素数组features里面遍历每一个feature，当feature[property]===value时，
     * 返回此feature（并且只返回第一个）。
     *
     * Parameters:
     * property - {String}feature的某个属性名称。
     * value - {String}property所对应的值。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy: function(property, value) {
        //TBD - would it be more efficient to use a hash for this.features?
        var feature = null;
        for(var id in this.features) {
            if(this.features[id][property] === value) {
                feature = this.features[id];
                break;
            }
        }
        return feature;
    },

    /**
     * APIMethod: getFeatureById
     * 通过给定一个id，返回对应的矢量要素。
     *
     * Parameters:
     * featureId - {String}矢量要素的属性id。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应id的feature，如果不存在则返回null。
     */
    getFeatureById: function(featureId) {
        return this.getFeatureBy('id', featureId);
    },

    /**
     * Method: getFeatureByFid
     * 通过给定一个fid，返回对应的矢量要素。
     *
     * Parameters:
     * featureFid - {String}矢量要素的属性fid。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应fid的feature，如果不存在则返回null。
     */
    getFeatureByFid: function(featureFid) {
        return this.getFeatureBy('fid', featureFid);
    },
    
    /**
     * APIMethod: getFeaturesByAttribute
     * 通过给定一个属性的key值和value值，返回所有匹配的要素数组。
     *
     * Parameters:
     * attrName - {String}属性的key。
     * attrValue - {Mixed}属性对应的value值。
     *
     * Returns:
     * Array(<SuperMap.Feature.Vector>) 一个匹配的feature数组。
     */
    getFeaturesByAttribute: function(attrName, attrValue) {
        var i,
            feature,    
            foundFeatures = [];
        for(var id in this.features) {            
            feature = this.features[id];
            if(feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    },

    /**
     * Unselect the selected features
     * i.e. clears the featureSelection array
     * change the style back
    clearSelection: function() {

       var vectorLayer = this.map.vectorLayer;
        for (var i = 0; i < this.map.featureSelection.length; i++) {
            var featureSelection = this.map.featureSelection[i];
            vectorLayer.drawFeature(featureSelection, vectorLayer.style);
        }
        this.map.featureSelection = [];
    },
     */


    /**
     * Method: onFeatureInsert
     * method called after a feature is inserted.
     * Does nothing by default. Override this if you
     * need to do something on feature updates.
     *
     * Parameters: 
     * feature - {<SuperMap.Feature.Vector>} 
     */
    onFeatureInsert: function(feature) {
    },
    
    /**
     * Method: preFeatureInsert
     * method called before a feature is inserted.
     * Does nothing by default. Override this if you
     * need to do something when features are first added to the
     * layer, but before they are drawn, such as adjust the style.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 
     */
    preFeatureInsert: function(feature) {
    },

    //todo
    /** 
     * APIMethod: getDataExtent
     * 计算所有要素集的最大范围。
     * 
     * Returns:
     * {<SuperMap.Bounds>} 如果没有feature则返回null，否则返回
     * 所有feature的geometry的最大范围。
     */
    getDataExtent: function () {
        var maxExtent = null;
        var features = this.features;
        if(features) {
            var geometry = null;
            for(var id in this.features) {
                geometry = features[id].geometry;
                if (geometry) {
                    if (maxExtent === null) {
                        maxExtent = new SuperMap.Bounds();
                    }
                    maxExtent.extend(geometry.getBounds());
                }
            }
        }
        return maxExtent;
    },

    CLASS_NAME: "SuperMap.Layer.Vector"
});
