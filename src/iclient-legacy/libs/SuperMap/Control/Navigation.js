/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control/ZoomBox.js
 * @requires SuperMap/Control/DragPan.js
 * @requires SuperMap/Handler/MouseWheel.js
 * @requires SuperMap/Handler/Click.js
 */

/**
 * Class: SuperMap.Control.Navigation
 * 此控件处理伴随鼠标事件（拖拽，双击、鼠标滚轮缩放）的地图浏览，
 * 如果创建地图时没有设置任何控件，此控件会默认添加到地图。
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.Navigation = SuperMap.Class(SuperMap.Control, {

    /** 
     * Property: dragPan
     * {<SuperMap.Control.DragPan>} 
     */
    dragPan: null,

    /**
     * APIProperty: dragPanOptions
     * {Object} 传给 DragPan 控件的属性。详见{<SuperMap.Control.DragPan>}
     */
    dragPanOptions: null,

    /**
     * Property: pinchZoom
     * {<SuperMap.Control.PinchZoom>}
     */
    pinchZoom: null,

    /**
     * APIProperty: pinchZoomOptions
     * {Object} 传给 PinchZoom 控件的属性。详见{<SuperMap.Control.PinchZoom>}
     */
    pinchZoomOptions: null,

    /**
     * APIProperty: documentDrag
     * {Boolean} 允许拖拽地图，使地图能够平移到视图窗口外。默认为false。
     */
    documentDrag: false,

    /** 
     * Property: zoomBox
     * {<SuperMap.Control.ZoomBox>}
     */
    zoomBox: null,

    /**
     * APIProperty: zoomBoxEnabled
     * {Boolean} 是否允许用户绘制缩放框，默认为true。
     */
    zoomBoxEnabled: true, 

    /**
     * APIProperty: zoomWheelEnabled
     * {Boolean} 是否允许用户滑动鼠标滚轴缩放地图，默认为true。
     */
    zoomWheelEnabled: true,
    
    /**
     * Property: mouseWheelOptions
     * {Object} Options passed to the MouseWheel control (only useful if
     *     <zoomWheelEnabled> is set to true)
     */
    mouseWheelOptions: null,

    /**
     * APIProperty: handleRightClicks
     * {Boolean} 是否响应右键点击，默认为false。
     */
    handleRightClicks: false,

    /**
     * APIProperty: zoomBoxKeyMask
     * {Integer} 默认为SuperMap.Handler.MOD_SHIFT，详见SuperMap.Handler类。
     */
    zoomBoxKeyMask: SuperMap.Handler.MOD_SHIFT,
    
    /**
     * APIProperty: autoActivate
     * {Boolean} 添加到地图的控件是否自动生效，默认为true。
     */
    autoActivate: true,

    /**
     * Constructor: SuperMap.Control.Navigation
     * 创建新的导航（navigation）控件。
     * 
     * Parameters:
     * options - {Object} 此控件类开放的属性。
     *
     * 可用两种方式添加 Navigation 控件：	 
     * （1）在初始化构造 Map 的时候，设置 Map 的 controls 属性来添加控件，如 ：
     * (code)	 
     * var map = new SuperMap.Map('map',{controls:[new SuperMap.Control.Navigation({
     *     dragPanOptions: {
     *         enableKinetic: true
     * 	   }
     * })]}); 	 
     * (end)
     * 	 
     * （2）在Map构造完成后，调用接口 Map 的方法 addControl() 来添加控件，如 ：
     * (code)	 
     * var map = new SuperMap.Map('map');
     * map.addControl(new SuperMap.Control.Navigation({
     *     dragPanOptions: {
     *         enableKinetic: true
     * 	   }
     * })); 	 
     * (end)
     */
    initialize: function(options) {
        this.handlers = {};
        SuperMap.Control.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: destroy
     * The destroy method is used to perform any clean up before the control
     * is dereferenced.  Typically this is where event listeners are removed
     * to prevent memory leaks.
     */
    destroy: function() {
        this.deactivate();

        if (this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;

        if (this.zoomBox) {
            this.zoomBox.destroy();
        }
        this.zoomBox = null;

        if (this.pinchZoom) {
            this.pinchZoom.destroy();
        }
        this.pinchZoom = null;

        SuperMap.Control.prototype.destroy.apply(this,arguments);
    },
    
    /**
     * Method: activate
     */
    activate: function() {
        this.dragPan.activate();
        if (this.zoomWheelEnabled) {
            this.handlers.wheel.activate();
        }    
        this.handlers.click.activate();
        if (this.zoomBoxEnabled) {
            this.zoomBox.activate();
        }
        if (this.pinchZoom) {
            this.pinchZoom.activate();
        }
        return SuperMap.Control.prototype.activate.apply(this,arguments);
    },

    /**
     * Method: deactivate
     */
    deactivate: function() {
        if (this.pinchZoom) {
            this.pinchZoom.deactivate();
        }
        this.zoomBox.deactivate();
        this.dragPan.deactivate();
        this.handlers.click.deactivate();
        this.handlers.wheel.deactivate();
        return SuperMap.Control.prototype.deactivate.apply(this,arguments);
    },
    
    /**
     * Method: draw
     */
    draw: function() {
        // disable right mouse context menu for support of right click events
        if (this.handleRightClicks) {
            this.map.viewPortDiv.oncontextmenu = SuperMap.Function.False;
        }

        var clickCallbacks = { 
            'click': this.defaultClick,
            'dblclick': this.defaultDblClick, 
            'dblrightclick': this.defaultDblRightClick 
        };
        var clickOptions = {
            'double': true, 
            'stopDouble': true
        };
        this.handlers.click = new SuperMap.Handler.Click(
            this, clickCallbacks, clickOptions
        );
        this.dragPan = new SuperMap.Control.DragPan(
            SuperMap.Util.extend({
                map: this.map,
                documentDrag: this.documentDrag
            }, this.dragPanOptions)
        );
        this.zoomBox = new SuperMap.Control.ZoomBox(
                    {map: this.map, keyMask: this.zoomBoxKeyMask});
        this.dragPan.draw();
        this.zoomBox.draw();
        this.handlers.wheel = new SuperMap.Handler.MouseWheel(
                                    this, {"up"  : this.wheelUp,
                                           "down": this.wheelDown},
                                    this.mouseWheelOptions );
        if (SuperMap.Control.PinchZoom) {
            this.pinchZoom = new SuperMap.Control.PinchZoom(
                SuperMap.Util.extend(
                    {map: this.map}, this.pinchZoomOptions));
        }
    },

    /**
     * Method: defaultClick
     *
     * Parameters:
     * evt - {Event}
     */
    defaultClick: function (evt) {
        if (evt.lastTouches && evt.lastTouches.length === 2) {
            this.map.zoomOut();
        }
    },

    /**
     * Method: defaultDblClick 
     * 
     * Parameters:
     * evt - {Event} 
     */
    defaultDblClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx( evt.xy ); 
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },

    /**
     * Method: defaultDblRightClick 
     * 
     * Parameters:
     * evt - {Event} 
     */
    defaultDblRightClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx( evt.xy ); 
        this.map.setCenter(newCenter, this.map.zoom - 1);
    },
    
    /**
     * Method: wheelChange  
     *
     * Parameters:
     * evt - {Event}
     * deltaZ - {Integer}
     */
    wheelChange: function(evt, deltaZ) {
        var currentZoom = this.map.getZoom();
        var newZoom = this.map.getZoom() + Math.round(deltaZ);
        newZoom = Math.max(newZoom, 0);
        newZoom = Math.min(newZoom, this.map.getNumZoomLevels());
        if (newZoom === currentZoom) {
            return;
        }
        var size    = this.map.getSize();
        var deltaX  = size.w/2 - evt.xy.x;
        var deltaY  = evt.xy.y - size.h/2;
        this.map.centerPixelOffset = new SuperMap.Pixel(deltaX,deltaY);
        var newRes  = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
        var newCenter = new SuperMap.LonLat(
                            zoomPoint.lon + deltaX * newRes,
                            zoomPoint.lat + deltaY * newRes );
        this.map.setCenter( newCenter, newZoom );
        this.map.centerPixelOffset = new SuperMap.Pixel(0,0);
    },

    /** 
     * Method: wheelUp
     * User spun scroll wheel up
     * 
     * Parameters:
     * evt - {Event}
     * delta - {Integer}
     */
    wheelUp: function(evt, delta) {
        this.wheelChange(evt, delta || 1);
    },

    /** 
     * Method: wheelDown
     * User spun scroll wheel down
     * 
     * Parameters:
     * evt - {Event}
     * delta - {Integer}
     */
    wheelDown: function(evt, delta) {
        this.wheelChange(evt, delta || -1);
    },
    
    /**
     * Method: disableZoomBox
     */
    disableZoomBox : function() {
        this.zoomBoxEnabled = false;
        this.zoomBox.deactivate();       
    },
    
    /**
     * Method: enableZoomBox
     */
    enableZoomBox : function() {
        this.zoomBoxEnabled = true;
        if (this.active) {
            this.zoomBox.activate();
        }    
    },
    
    /**
     * Method: disableZoomWheel
     */
    
    disableZoomWheel : function() {
        this.zoomWheelEnabled = false;
        this.handlers.wheel.deactivate();       
    },
    
    /**
     * Method: enableZoomWheel
     */
    
    enableZoomWheel : function() {
        this.zoomWheelEnabled = true;
        if (this.active) {
            this.handlers.wheel.activate();
        }    
    },

    CLASS_NAME: "SuperMap.Control.Navigation"
});
