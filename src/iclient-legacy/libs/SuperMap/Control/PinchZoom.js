/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler/Pinch.js
 */

/**
 * Class: SuperMap.Control.PinchZoom
 * 该类实现触摸设备的缩放功能。在 <SuperMap.Control.TouchNavigation> 中被引用实现触摸缩放的控制，
 * 一般不单独使用。
 * Inherits:
 *  - <SuperMap.Control>
 */
SuperMap.Control.PinchZoom = SuperMap.Class(SuperMap.Control, {

    /** 
     * Property: type
     * {SuperMap.Control.TYPES}
     */
    type: SuperMap.Control.TYPE_TOOL,

    /**
     * Property: containerOrigin
     * {Object} Cached object representing the layer container origin (in pixels).
     */
    containerOrigin: null,

    /**
     * Property: pinchOrigin
     * {Object} Cached object representing the pinch start (in pixels).
     */
    pinchOrigin: null,    
    
    /**
     * Property: currentCenter
     * {Object} Cached object representing the latest pinch center (in pixels).
     */
    currentCenter: null,    

    /**
     * APIProperty: autoActivate
     * {Boolean} 设置是否在将该类添加到地图上时，自动激活该控件。默认为true。
     */
    autoActivate: true,
    
    /**
     * Constructor: SuperMap.Control.PinchZoom
     * 创建该类的新实例。
     *
     * Parameters:
     * options - {Object} 设置该类及其父类开放的属性值。
     */
    initialize: function(options) {
        SuperMap.Control.prototype.initialize.apply(this, arguments);
        this.handler = new SuperMap.Handler.Pinch(this, {
            start: this.pinchStart,
            move: this.pinchMove,
            done: this.pinchDone,
            MSstart: this.pinchStart,
            MSmove: this.pinchMove,
            MSdone: this.pinchDone
        }, this.handlerOptions);
    },
    
    /**
     * APIMethod: activate
     * 激活控件，需在添加到地图之后才能调用该函数。
     *
     * Returns:
     * {Boolean} 返回该控件是否激活。
     */
    activate: function() {
        var activated = SuperMap.Control.prototype.activate.apply(this,arguments);
        if (activated) {
            this.map.events.on({
                moveend: this.updateContainerOrigin,
                scope: this
            });
            this.updateContainerOrigin();
        }
        return activated;
    },

    /**
     * APIMethod: deactivate
     * 取消激活该控件。
     *
     * Returns:
     * {Boolean} 返回该控件是否被取消激活成功。
     */
    deactivate: function() {
        var deactivated = SuperMap.Control.prototype.deactivate.apply(this,arguments);
        if (this.map && this.map.events) {
            this.map.events.un({
                moveend: this.updateContainerOrigin,
                scope: this
            });
        }
        return deactivated;
    },
    
    /**
     * Method: updateContainerOrigin
     * Must be called each time the layer container origin changes.
     */
    updateContainerOrigin: function() {
        var container = this.map.layerContainerDiv;
        this.containerOrigin = {
            x: parseInt(container.style.left, 10),
            y: parseInt(container.style.top, 10)
        };
        this.containerOriginCanvas = {
            x: parseInt(0, 10),
            y: parseInt(0, 10)
        };
    },

    /**
     * Method: pinchStart
     *
     * Parameters:
     * evt - {Event}
     * pinchData - {Object} pinch data object related to the current touchmove
     *     of the pinch gesture. This give us the current scale of the pinch.
     */
    pinchStart: function(evt, pinchData) {
        this.pinchOrigin = evt.xy;
        this.currentCenter = evt.xy;
    },
    
    /**
     * Method: pinchMove
     *
     * Parameters:
     * evt - {Event}
     * pinchData - {Object} pinch data object related to the current touchmove
     *     of the pinch gesture. This give us the current scale of the pinch.
     */
    pinchMove: function(evt, pinchData) {
        var scale = pinchData.scale;
        var containerOrigin = this.containerOrigin;
        var containerOriginCanvas = this.containerOriginCanvas;
        
        var pinchOrigin = this.pinchOrigin;
        var current = evt.xy;
        var dx = Math.round((current.x - pinchOrigin.x) + (scale - 1) * (containerOrigin.x - pinchOrigin.x));
        var dy = Math.round((current.y - pinchOrigin.y) + (scale - 1) * (containerOrigin.y - pinchOrigin.y));
        
        var dxCanvas = Math.round((current.x - pinchOrigin.x) + (scale - 1) * (containerOriginCanvas.x - pinchOrigin.x));
        var dyCanvas = Math.round((current.y - pinchOrigin.y) + (scale - 1) * (containerOriginCanvas.y - pinchOrigin.y));

        this.applyTransform(
            "translate(" + dx + "px, " + dy + "px) scale(" + scale + ")"
        );
        
        /*this.applyTransformCanvas(
            "translate(" + dxCanvas + "px, " + dyCanvas + "px) scale(" + scale + ")"
        );*/
        this.currentCenter = current;
    },
    
    /**
     * Method: applyTransform
     * Applies the given transform to layers.
     */
    applyTransform: function(transform) {
        var style = this.map.layerContainerDiv.style;
        style['-webkit-transform'] = transform;
        style['-moz-transform'] = transform;
        style['-ms-transform'] = transform;
        style['transform'] = transform;
    },
    
    /**
     * Method: applyTransformCanvas
     * 为canvas类的的缩放。
     */
     //layerContainerDivCanvas已经与layerContainerDiv合并了，map上已经删除了这个div了
    /*applyTransformCanvas: function(transform) {
        var styleCanvas = this.map.layerContainerDivCanvas.style;
        styleCanvas['-webkit-transform'] = transform;
        styleCanvas['-moz-transform'] = transform;
        styleCanvas['-ms-transform'] = transform;
        styleCanvas['transform'] = transform;
    },*/
    
    /**
     * Method: pinchDone
     *
     * Parameters:
     * evt - {Event}
     * start - {Object} pinch data object related to the touchstart event that
     *     started the pinch gesture.
     * last - {Object} pinch data object related to the last touchmove event
     *     of the pinch gesture. This give us the final scale of the pinch.
     */
    pinchDone: function(evt, start, last) {
        this.applyTransform("");
        //this.applyTransformCanvas("");
        if(evt.type === "MSGestureEnd") {
            this.map.isIEMultipTouch = true;
            this.map.ratio = last.scale;
        }
        var zoom = this.map.getZoomForResolution(this.map.getResolution() / last.scale, true);
        if (zoom !== this.map.getZoom() || !this.currentCenter.equals(this.pinchOrigin)) {
            var resolution = this.map.getResolutionForZoom(zoom);

            var location = this.map.getLonLatFromPixel(this.pinchOrigin);
            var zoomPixel = this.currentCenter;        
            var size = this.map.getSize();

            location.lon += resolution * ((size.w / 2) - zoomPixel.x);
            location.lat -= resolution * ((size.h / 2) - zoomPixel.y);

            this.map.setCenter(location, zoom);
            this.map.isIEMultipTouch = false;
            this.map.isIESingleTouch = true;
        }
    },

    CLASS_NAME: "SuperMap.Control.PinchZoom"

});
