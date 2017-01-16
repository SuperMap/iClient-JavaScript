/**
 * @requires SuperMap/Handler/Plotting
 * @requires SuperMap/Geometry/GeoPoint
 */

/**
 * Class: SuperMap.Handler.GraphicObject
 * 绘制动态标绘标号的事件处理器。
 * 该处理器会触发标记为"done"、"cancel"和“modify"的事件回调。其中modify回调会在每一次变化时被调用并传入最近一次绘制的点。
 * 使用 <SuperMap.Handler.GraphicObject> 构造函数可以创建一个新的绘制点的事件处理器实例。
 *
 * Inherits from:
 *  - <SuperMap.Handler>
 */
SuperMap.Handler.GraphicObject = SuperMap.Class(SuperMap.Handler, {

    /**
     * APIProperty: serverUrl
     * {String} 标绘服务地址。
     */
    serverUrl: "",

    /**
     * APIProperty: libID
     * {Integer} 标号库ID。
     */
    libID: -1,

    /**
     * APIProperty: symbolCode
     * {Integer} 标号Code。
     */
    symbolCode: -1,

    /**
     * APIProperty: symbolInfo
     * {Object} 服务器返回的标号信息。
     */
    symbolInfo: null,

    /**
     * Property: originalSymbolInfo
     * {Object} 上一次绘制的标号信息。
     */
    originalSymbolInfo:null,

    /**
     * Property: controlPoints
     * {Array(<SuperMap.Geometry.Point>)} 存储动态标绘标号的控制点。
     */
    controlPoints: [],

    /**
     * APIProperty: plotting
     * {<SuperMap.Feature.Vector>} 正在标绘的对象。
     */
    plotting: null,

    /**
     * Property: isDrawing
     * 标号是否处于绘制过程中，控制标号的动态显示。
     */
    isDrawing: false,

    /**
     * Property: layerOptions
     * {Object} 临时绘制图层的可选属性，可用来设置图层的样式。
     */
    layerOptions: null,

    /**
     * Property: pixelTolerance
     * {Number} 绘制点像素容差。绘制点操作所允许的鼠标 down 和 up（包括普通的mousedown、mouseup和touchstart、touchend）
     * 事件之间的最大像素间隔。
     * 如果设置为有效的integer值，则当鼠标down和up之间间隔超过该值时将被忽略，不会添加点要素。默认值是 5。
     */
    pixelTolerance: 5,

    /**
     * Property: point
     * {<SuperMap.Feature.Vector>} The currently drawn point （当前鼠标位置点，即绘制点）
     */
    point: null,

    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>} The temporary drawing layer
     */
    layer: null,

    /**
     * Property: multi
     * {Boolean} 在传递事件到图层leyer之前，为多个节点的几何对象创建feature要素实例。默认值是false。
     */
    multi: false,

    /**
     * Property: mouseDown
     * {Boolean} The mouse is down
     */
    mouseDown: false,

    /**
     * Property: stoppedDown
     * {Boolean} Indicate whether the last mousedown stopped the event
     * propagation.
     */
    stoppedDown: null,

    /**
     * Property: lastDown
     * {<SuperMap.Pixel>} Location of the last mouse down
     */
    lastDown: null,

    /**
     * Property: lastUp
     * {<SuperMap.Pixel>}
     */
    lastUp: null,

    /**
     * Property: persist
     * {Boolean} 保留呈现的feature要素直到destroyFeature方法被调用。默认为false。
     * 如果设置为true，那么feature会保持呈现，直到handler被设置为无效或者开启另一次绘制的时候调用destroyFeature方法来清除。
     */
    persist: false,

    /**
     * Property: stopDown
     * {Boolean} 停止鼠标mousedown事件的传播。在允许"绘制过程中平移"的时候必须设置为false。默认值为false。
     */
    stopDown: false,

    /**
     * Propery: stopUp
     * {Boolean} 停止鼠标事件的传播。在允许"拖拽过程中平移"的时候必须设置为false。默认值为false。
     */
    stopUp: false,

    /**
     * Property: touch
     * {Boolean} Indcates the support of touch events.
     */
    touch: false,

    /**
     * Property: lastTouchPx
     * {<SuperMap.Pixel>} The last pixel used to know the distance between
     * two touches (for double touch).
     */
    lastTouchPx: null,

    /**
     * Constructor: SuperMap.Handler.GraphicObject
     * 构造函数，创建一个新的绘制标号的事件处理器。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 构建当前事件处理器的控件对象。
     * callbacks - {Object} 回调函数对象。关于回调的具体描述参见下文。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     *
     * Named callbacks:
     * create - 当要素草图第一次创建的时候调用，回调函数需接收两个参数：当前点几何对象、当前要素。
     * modify - 顶点的每一次变化时调用，回调函数接受参数：几何点对象、当前要素。
     * done - 当绘制点操作完成时调用，回调函数接收一个参数，当前点的几何对象。
     * cancel - 绘制过程中关闭当前事件处理器的监听时调用，回调函数接收当前要素的几何对象作为参数。
     */
    initialize: function(control, callbacks, options) {
        if(!(options && options.layerOptions && options.layerOptions.styleMap)) {
            if(!this.style)
                this.style = SuperMap.Util.extend(SuperMap.Feature.Vector.style['default'], {});
        }

        SuperMap.Handler.prototype.initialize.apply(this, arguments);

        this.serverUrl = this.control.layer.serverUrl;
    },

    /**
     * APIMethod: activate
     * 激活事件处理器对象上的监听处理，如果这个事件处理器对象已经激活，则返回false.
     *
     * Returns:
     * {Boolean} 事件处理器对象监听激活成功.
     */
    activate: function() {
        if(!SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            return false;
        }

        this.controlPoints = [];
        this.plotting = null;
        this.isDrawing = false;

        // create temporary vector layer for rendering Geometry sketch
        // TBD: this could be moved to initialize/destroy - setting visibility here
        var options = SuperMap.Util.extend({
            displayInLayerSwitcher: false,
            calculateInRange: SuperMap.Function.True
        }, this.layerOptions);
        this.layer = new SuperMap.Layer.PlottingLayer(this.CLASS_NAME, "", options);
        this.map.addLayer(this.layer);
        SuperMap.Element.addClass(
            this.map.viewPortDiv, "smDefault");

        return true;
    },

    /**
     * APIMethod: deactivate
     * 关闭事件处理器对象上的监听处理，如果这个事件处理器已经是关闭状态，则返回false
     *
     * Returns:
     * {Boolean} 事件处理器对象监听已经成功关闭。
     */
    deactivate: function() {
        if(!SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }

        this.controlPoints = [];
        this.plotting = null;
        this.isDrawing = false;

        this.cancel();
        // If a layer's map property is set to null, it means that that layer
        // isn't added to the map. Since we ourself added the layer to the map
        // in activate(), we can assume that if this.layer.map is null it means
        // that the layer has been destroyed (as a result of map.destroy() for
        // example.
        if (this.layer.map != null) {
            //deactivate后，移除绘制时的鼠标样式
            SuperMap.Element.removeClass(
                this.map.viewPortDiv, "smDefault");
            this.destroyFeature(true);
            this.layer.destroy(false);
        }
        this.layer = null;
        this.touch = false;
        return true;
    },

    /**
     * Method: createFeature
     * 创建标号。
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} 当前鼠标在地图上的像素位置。
     */
    createFeature: function(pixel) {
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
        var geometry = new SuperMap.Geometry.Point(
            lonlat.lon, lonlat.lat
        );
        this.point = new SuperMap.Feature.Vector(geometry);

        if(!SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.symbolCode)){
            this.plotting = this.createDefaultFeature({layer: this.control.layer});
            if(this.plotting.geometry.subSymbols && this.plotting.geometry.subSymbols.length > 0){
                for(var i = 0; i < this.plotting.geometry.subSymbols.length; i++){
                    var libID = this.plotting.geometry.subSymbols[i].libID;
                    var code = this.plotting.geometry.subSymbols[i].code;
                    this.plotting.geometry.subSymbols[i].symbolData = this.control.layer.getSymbolDataFromCache(libID, code);
                    if(this.plotting.geometry.subSymbols[i].symbolData === null){
                        this.control.layer.getDataFromServer(libID, code, null, getCompleted, getFailed, this);
                    }
                }

                function getCompleted(result){
                    this.symbolInfo = result.originResult;
                    if(this.symbolInfo.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                        SuperMap.Plot.SymbolLib.dotSymbols.push(SuperMap.Util.cloneObject(this.symbolInfo));
                    }

                    for(var i = 0; i < this.plotting.geometry.subSymbols.length; i++){
                        var symbolData = SuperMap.Util.cloneObject(this.symbolInfo);
                        var libID = this.plotting.geometry.subSymbols[i].libID;
                        var code = this.plotting.geometry.subSymbols[i].code;
                        if(libID === this.symbolInfo.libID && code === this.symbolInfo.code){
                            this.plotting.geometry.subSymbols[i].symbolData = symbolData;
                        }
                    }
                }

                //获取数据失败
                function getFailed(result){

                }
            }

            this.callback("create", [this.point.geometry, this.getSketch()]);
            this.point.geometry.clearBounds();
        } else {
            function getCompleted(result){
                this.symbolInfo = result.originResult;
                if(this.symbolInfo.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                    SuperMap.Plot.SymbolLib.dotSymbols.push(SuperMap.Util.cloneObject(this.symbolInfo));
                }

                var symbolData = SuperMap.Util.cloneObject(this.symbolInfo);
                this.plotting = this.createDefaultFeature({symbolData: symbolData, layer: this.control.layer});

                this.callback("create", [this.point.geometry, this.getSketch()]);
                this.point.geometry.clearBounds();
            }

            //获取数据失败
            function getFailed(result){

            }

            this.symbolInfo = this.control.layer.getSymbolDataFromCache(this.libID, this.symbolCode);
            if(this.symbolInfo === null){
                this.control.layer.getDataFromServer(this.libID, this.symbolCode, null, getCompleted, getFailed, this);
            } else {
                var symbolData = SuperMap.Util.cloneObject(this.symbolInfo);
                this.plotting = this.createDefaultFeature({symbolData: symbolData, layer: this.control.layer});

                this.callback("create", [this.point.geometry, this.getSketch()]);
                this.point.geometry.clearBounds();
            }
        }
    },

    /**
     * Method: modifyFeature
     * 绘制过程中修改标号形状。
     * 根据已添加（up函数中添加）的部分的控制点和由当前鼠标位置作为的一个临时控制点产生的标号。
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} 鼠标在地图上的当前像素位置
     */
    modifyFeature: function(pixel) {
        //忽略Chrome mouseup触发瞬间 mousemove 产生的相同点
        if (this.lastUp && this.lastUp.equals(pixel)) {
            return true;
        }

        //新建标绘扩展符号
        if((!this.point || !this.plotting)) {
            this.createFeature(pixel);
        }

        //新建标绘扩展符号
        if(this.point && this.plotting) {
            //修改临时点的位置（鼠标位置）
            var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
            this.point.geometry.x = lonlat.lon;
            this.point.geometry.y = lonlat.lat;

            if(this.isDrawing == true || this.plotting.geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                var geometry = new SuperMap.Geometry.Point(
                    lonlat.lon, lonlat.lat
                );

                //航线会用
                geometry.isTrackingPoint = true;

                var cp = this.controlPoints.concat([geometry]);
                //重新设置标绘扩展符号的控制点
                this.setControlPoints(cp);

                if(this.plotting.geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL ||
                    (!SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.symbolCode) &&
                    this.plotting.geometry.controlPoints.length >= this.plotting.geometry.minEditPts)){
                    //重新计算标绘扩展符号的geometry
                    this.plotting.geometry.calculateParts();
                    this.callback("modify", [this.point.geometry, this.getSketch(), false]);
                    this.point.geometry.clearBounds();
                    this.drawFeature({isNewAdd:true});
                } else if(this.plotting.geometry.controlPoints.length >= this.plotting.geometry.minEditPts){
                    // 获取数据成功
                    function getCompleted(result){
                        if(this.plotting === null){
                            return;
                        }

                        this.plotting.geometry.symbolData = result.originResult;
                        this.symbolInfo = result.originResult;
                        //重新计算标绘扩展符号的geometry
                        this.plotting.geometry.calculateParts();

                        this.callback("modify", [this.point.geometry, this.getSketch(), false]);
                        this.point.geometry.clearBounds();
                        this.drawFeature({isNewAdd:true});
                    }

                    //获取数据失败
                    function getFailed(result){
                        return;
                    }

                    //对接iserver中的服务
                    var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.serverUrl);
                    getSymbolInfo.events.on({
                        "processCompleted": getCompleted,
                        "processFailed": getFailed,
                        scope: this
                    });

                    var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
                    getSymbolInfoParams.libID = this.plotting.geometry.libID;
                    getSymbolInfoParams.code = this.plotting.geometry.code;
                    getSymbolInfoParams.inputPoints = this.plotting.geometry.controlPoints;
                    getSymbolInfo.processAsync(getSymbolInfoParams);
                } else if(this.plotting.geometry.controlPoints.length >= 2 && this.plotting.geometry.controlPoints.length < this.plotting.geometry.minEditPts){
                    //重新计算标绘扩展符号的geometry
                    this.plotting.geometry.calculateParts();

                    this.callback("modify", [this.point.geometry, this.getSketch(), false]);
                    this.point.geometry.clearBounds();
                    this.drawFeature({isNewAdd:true});
                }
            }
        }
    },

    /**
     * Method: down
     * 操作 mousedown 和 touchstart。 重绘几何对象。
     *
     * Parameters:
     * evt - {Event} 浏览器事件。
     *
     * Returns:
     * {Boolean} 是否允许事件继续在 map 上传送。
     */
    down: function(evt) {
        if(evt.button == 2){
            return true;
        }

        if(!this.control.layer.isEditable){
            return true;
        }

        this.mouseDown = true;
        this.lastDown = evt.xy;
        this.isDrawing = true;
        if(!this.touch) {
            this.modifyFeature(evt.xy);
        }
        this.stoppedDown = this.stopDown;
        return !this.stopDown;
    },

    /**
     * Method: up
     * 操作 mouseup 和 touchend，发送最后一个 mouseup 点。
     *
     * Parameters:
     * evt - {Event} 浏览器事件，evt.xy 为最后一个 mouseup 的像素位置。
     *
     * Returns:
     * {Boolean} 是否允许事件继续在 map 上传送。
     */
    up: function (evt) {
        if(!this.control.layer.isEditable){
            return true;
        }

        this.mouseDown = false;
        this.stoppedDown = this.stopDown;

        // ignore double-clicks
        if (this.lastUp && this.lastUp.equals(evt.xy)) {
            return true;
        }
        if (this.lastDown && this.passesTolerance(this.lastDown, evt.xy, this.pixelTolerance)) {
            if (this.touch) {
                this.modifyFeature(evt.xy);
            }
            if(this.persist) {
                this.destroyPersistedFeature();
            }

            if(this.plotting){
                this.lastUp = evt.xy;
                this.addControlPoint(evt.xy);
                var len = this.controlPoints.length;
                if(len === this.plotting.geometry.maxEditPts || 0 === this.plotting.geometry.maxEditPts){
                    this.drawComplete();
                }
            }

            return true;
        } else {
            return true;
        }
    },

    /**
     * Method: dblclick
     * 操作 double-clicks.  Double-clicks 不继续在地图上传送。
     *
     * Parameters:
     * evt - {Event} 浏览器事件。
     *
     * Returns:
     * {Boolean} 是否允许事件继续在 map 上传送。
     */
    dblclick: function(evt) {
        if(this.controlPoints.length >= this.plotting.geometry.minEditPts){
            if(this.plotting.geometry instanceof SuperMap.Geometry.Route){
                delete this.plotting.geometry.controlPoints[this.plotting.geometry.controlPoints.length-1].isTrackingPoint;
            }
            this.drawComplete();
        }

        SuperMap.Event.stop(evt);
        return false;
    },

    /**
     * Method: down
     * 操作 mousemove 和 touchmove。 重绘几何对象。
     *
     * Parameters:
     * evt - {Event} 浏览器事件。
     *
     * Returns:
     * {Boolean} 是否允许事件继续在 map 上传送。
     */
    move: function (evt) {
        if(!this.control.layer.isEditable){
            return true;
        }

        if(!this.touch // no point displayed until up on touch devices
            && (!this.mouseDown || this.stoppedDown)) {
            this.modifyFeature(evt.xy);
        }
        return true;
    },

    /**
     * Method: click
     * 操作 clicks.  Clicks 不继续在地图上传送。
     *
     * Parameters:
     * evt - {Event} 浏览器事件。
     *
     * Returns:
     * {Boolean} 是否允许事件继续在 map 上传送。
     */
    click: function(evt) {
        SuperMap.Event.stop(evt);
        return false;
    },

    /**
     * Method: destroyPersistedFeature
     * 销毁保留呈现的feature。
     */
    destroyPersistedFeature: function() {
        var layer = this.layer;
        if(layer && layer.features.length > 1) {
            this.layer.features[0].destroy();
        }
    },

    /**
     * Method: addControlPoint
     * 向 controlPoints 添加控制点
     */
    addControlPoint: function(pixel) {
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
        var geometry = new SuperMap.Geometry.Point(
            lonlat.lon, lonlat.lat
        );

        this.controlPoints.push(geometry);
    },

    /**
     * Method: drawFeature
     * 在临时图层上绘制feature。
     */
    drawFeature: function(options) {
        this.layer.renderer.clear();
        this.layer.drawFeature(this.plotting, this.style, options);
        this.layer.drawFeature(this.point, this.style, options);
    },

    /**
     * Method: getSketch
     * Return the sketch feature.
     *
     * Returns:
     * {<SuperMap.Feature.Vector>}
     */
    getSketch: function() {
        return this.plotting;
    },

    /**
     * Method: destroyFeature
     * Destroy the temporary geometries
     *
     * Parameters:
     * force - {Boolean} Destroy even if persist is true.
     */
    destroyFeature: function(force) {
        if(this.layer && (force || !this.persist)) {
            this.layer.destroyFeatures();
        }
        this.point = null;
        this.plotting = null;
    },

    /**
     * Method: finalize
     * Finish the Geometry and call the "done" callback.
     *
     * Parameters:
     * cancel - {Boolean} Call cancel instead of done callback.  Default
     *          is false.
     */
    finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.lastTouchPx = null;

        var copyFeature = SuperMap.Plot.PlottingUtil.copyFeature(this.plotting);

        //创建完成点标号后，mousemove的时候会创建第二个同样的标号，此时，缩放地图第二个未保存到图层的标号
        //会一起跟着缩放，为了解决该问题，加入该变量用以区分状态
        if(null !== copyFeature){
            copyFeature.geometry.isEdit = true;
        }

        this.callback(key, [copyFeature]);
        this.destroyFeature(cancel);
    },

    /**
     * APIMethod: cancel
     * 结束绘制操作并且调用cancel回调
     */
    cancel: function() {
        this.finalize(true);
    },

    /**
     * Method: mousedown
     * Handle mousedown.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns:
     * {Boolean} Allow event propagation
     */
    mousedown: function(evt) {
        return this.down(evt);
    },

    /**
     * Method: touchstart
     * Handle touchstart.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns:
     * {Boolean} Allow event propagation
     */
    touchstart: function(evt) {
        if (!this.touch) {
            this.touch = true;
            // unregister mouse listeners
            this.map.events.un({
                mousedown: this.mousedown,
                mouseup: this.mouseup,
                mousemove: this.mousemove,
                click: this.click,
                dblclick: this.dblclick,
                scope: this
            });
        }
        this.lastTouchPx = evt.xy;
        return this.down(evt);
    },

    /**
     * Method: mousemove
     * Handle mousemove.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns:
     * {Boolean} Allow event propagation
     */
    mousemove: function(evt) {
        return this.move(evt);
    },

    /**
     * Method: touchmove
     * Handle touchmove.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns:
     * {Boolean} Allow event propagation
     */
    touchmove: function(evt) {
        this.lastTouchPx = evt.xy;
        return this.move(evt);
    },

    /**
     * Method: mouseup
     * Handle mouseup.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns:
     * {Boolean} Allow event propagation
     */
    mouseup: function(evt) {
        return this.up(evt);
    },

    /**
     * Method: touchend
     * Handle touchend.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns:
     * {Boolean} Allow event propagation
     */
    touchend: function(evt) {
        evt.xy = this.lastTouchPx;
        return this.up(evt);
    },

    /**
     * Method: mouseout
     * Handle mouse out.  For better user experience reset mouseDown
     * and stoppedDown when the mouse leaves the map viewport.
     *
     * Parameters:
     * evt - {Event} The browser event
     */
    mouseout: function(evt) {
        if(SuperMap.Util.mouseLeft(evt, this.map.eventsDiv)) {
            this.stoppedDown = this.stopDown;
            this.mouseDown = false;
        }
    },

    /**
     * Method: passesTolerance
     * Determine whether the event is within the optional pixel tolerance.
     *
     * Returns:
     * {Boolean} The event is within the pixel tolerance (if specified).
     */
    passesTolerance: function(pixel1, pixel2, tolerance) {
        var passes = true;

        if (tolerance != null && pixel1 && pixel2) {
            var dist = pixel1.distanceTo(pixel2);
            if (dist > tolerance) {
                passes = false;
            }
        }
        return passes;
    },

    /**
     * Method: drawComplete
     * 绘制完成操作
     * 当一个标绘扩展符号完成时调用此函数
     *
     */
    drawComplete: function(){
        if(this.plotting !== null){
            if(this.plotting.geometry.controlPoints.length >= 2 && this.plotting.geometry.controlPoints.length < this.plotting.geometry.minEditPts) {
                this.plotting.geometry.clear();
            } else {
                this.finalize();
            }
            //this.finalize();
            this.isDrawing = false;
            this.controlPoints = [];

            if(this.active == true){
                this.layer.removeAllFeatures();
            }
        }
    },

    /**
     * Method: setControlPoints
     * 给this.plotting.geometry设置定位点
     */
    setControlPoints: function(controlPoints) {
        if(this.plotting !== null){
            //this.plotting.geometry.controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(controlPoints);
            for(var i = 0; i < controlPoints.length; i++){
                if(this.plotting.geometry.controlPoints.length > i){
                    this.plotting.geometry.controlPoints[i].x = controlPoints[i].x;
                    this.plotting.geometry.controlPoints[i].y = controlPoints[i].y;
                } else {
                    this.plotting.geometry.controlPoints.push(new SuperMap.Geometry.Point(controlPoints[i].x, controlPoints[i].y));
                }
            }
            //if(this.plotting.geometry instanceof SuperMap.Geometry.DotSymbol){
            //    this.plotting.geometry.leadLinePoints = SuperMap.Plot.PlottingUtil.clonePoints(controlPoints);
            //}
        }
    },

    /**
     * Method: createDefaultFeature
     * 创建Feature
     */
    createDefaultFeature: function(options) {
        var feature = new SuperMap.Geometry.PlottingGeometry.createFeature(this.libID, this.symbolCode, null, options);
        if(feature && null !== feature){
            feature.geometry.isEdit = false;
        }
        return feature;
    },

    CLASS_NAME: "SuperMap.Handler.GraphicObject"
});

