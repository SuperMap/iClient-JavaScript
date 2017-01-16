/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control/DragPan.js
 * @requires SuperMap/Control/PinchZoom.js
 * @requires SuperMap/Handler/Click.js
 */

/**
 * Class: SuperMap.Control.TouchNavigation
 * 当前控件支持触摸事件(拖拽，双击，两个手指双击，和缩放)，在触摸屏上进行手势操作地图，可以使用该类。
 *
 * 若只发布移动应用，使用该控件即可。除此之外， <SuperMap.Control.Navigation>  控件也包含了该控件的功能。
 *
 * Inherits:
 *  - <SuperMap.Control>
 */
SuperMap.Control.TouchNavigation = SuperMap.Class(SuperMap.Control, {

    /**
     * Property: dragPan
     * {<SuperMap.Control.DragPan>}
     */
    dragPan: null,

    /**
     * Property: dragPanOptions
     * {Object} Options passed to the DragPan control.
     */
    dragPanOptions: null,

    /**
     * Property: pinchZoom
     * {<SuperMap.Control.PinchZoom>}
     */
    pinchZoom: null,

    /**
     * Property: pinchZoomOptions
     * {Object} Options passed to the PinchZoom control.
     */
    pinchZoomOptions: null,

    /**
     * Property: clickHandlerOptions
     * {Object} Options passed to the Click handler.
     */
    clickHandlerOptions: null,

    /**
     * APIProperty: documentDrag
     * {Boolean} 设置手势在地图区域外是否能拖拽地图。默认为false，当手势移动到地图外时，不能拖拽地图。
     */
    documentDrag: false,

    /**
     * APIProperty: autoActivate
     * {Boolean} 设置当控件加载到地图上时，是否自动激活控件。默认为true。
     */
    autoActivate: true,

    /**
     * Constructor: SuperMap.Control.TouchNavigation
     * 创建该类的新实例。
     *
     * Parameters:
     * options - {Object} 设置该类及其父类开放的属性值。
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
        if(this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;
        if (this.pinchZoom) {
            this.pinchZoom.destroy();
            delete this.pinchZoom;
        }
        SuperMap.Control.prototype.destroy.apply(this,arguments);
    },

    /**
     * Method: activate
     */
    activate: function() {
        if(SuperMap.Control.prototype.activate.apply(this,arguments)) {
            this.dragPan.activate();
            this.handlers.click.activate();
            this.pinchZoom.activate();
            return true;
        }
        return false;
    },

    /**
     * Method: deactivate
     */
    deactivate: function() {
        if(SuperMap.Control.prototype.deactivate.apply(this,arguments)) {
            this.dragPan.deactivate();
            this.handlers.click.deactivate();
            this.pinchZoom.deactivate();
            return true;
        }
        return false;
    },
    
    /**
     * Method: draw
     */
    draw: function() {
        var clickCallbacks = {
            click: this.defaultClick,
            dblclick: this.defaultDblClick
        };
        var clickOptions = SuperMap.Util.extend({
            "double": true,
            stopDouble: true,
            pixelTolerance: 2
        }, this.clickHandlerOptions);
        this.handlers.click = new SuperMap.Handler.Click(
            this, clickCallbacks, clickOptions
        );
        this.dragPan = new SuperMap.Control.DragPan(
            SuperMap.Util.extend({
                map: this.map,
                documentDrag: this.documentDrag
            }, this.dragPanOptions)
        );
        this.dragPan.draw();
        this.pinchZoom = new SuperMap.Control.PinchZoom(
            SuperMap.Util.extend({map: this.map}, this.pinchZoomOptions)
        );
    },

    /**
     * Method: defaultClick
     *
     * Parameters:
     * evt - {Event}
     */
    defaultClick: function (evt) {
        if(evt.lastTouches && evt.lastTouches.length === 2) {
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
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },

    CLASS_NAME: "SuperMap.Control.TouchNavigation"
});
