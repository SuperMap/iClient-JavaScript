/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Handler/Box.js
 */

/**
 * Class: SuperMap.Control.ZoomBox
 * 该类实现在地图上绘制矩形区域，放缩地图的操作。 
 * 可以通过两种方法在map上添加ZoomBox控件，
 * 第一种是，在实例化map时设置map的options属性添加控件，如：
 * (code)
 * var map = new SuperMap.Map("map",{controls:[
 *     new SuperMap.Control.ZoomBox({out:true}) 
 * ]});
 * (end)
 * 第二种方法是通过 map 的 addControl() 方法添加 ZoomBox 控件，如：
 * (code)
 * var map = new SuperMap.Map("map");
 * map.addControl(new SuperMap.Control.ZoomBox({out:true}));
 * (end)
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.ZoomBox = SuperMap.Class(SuperMap.Control, {
    /**
     * Property: type
     * {SuperMap.Control.TYPE}
     */
    type: SuperMap.Control.TYPE_TOOL,

    /**
     * APIProperty: out
     * {Boolean} 是否将该控件设置为拉框缩小，默认为false，拉框放大。
     */
    out: false,

    /**
     * APIProperty: keyMask
     * {Integer} 缩放只发生在按住键盘某个键的同时鼠标拖拽。如果不适使用
     *     按键，设置为null。默认值为null。
     */
    keyMask: null,

    /**
     * Property: handlerOptions
     * {Object} 设置Handler一些特殊属性，cursorCSS用来设置鼠标CSS样式；
     */
    handlerOptions: null,

    /**
     * Property: alwaysZoom
     * {Boolean} Always zoom in/out, when box drawed 
     */
    alwaysZoom: false,

    /**
     * Constructor: SuperMap.Control.ZoomBox
     * 创建该类的新实例。
     *
     * Parameters:
     * options - {Object} 设置该类及其父类开放的属性值。
     * handlerOptions - {Object}设置Handler支持的属性
     *
     *  例如设置拉框鼠标样式:
     *  (code)
     * 1.单独添加zoombox
     * var map = new SuperMap.Map("map", { controls:[
     *     new SuperMap.Control.ZoomBox({keyMask: SuperMap.Handler.MOD_SHIFT,"autoActivate":true},{cursorCSS:"url('images/arr_left.cur'),auto"})
     * ]});
     * 2.当同时添加Navigation和ZoomBox控件时，由于Navigation中会默认添加一个ZoomBox控件，所以会导致用户添加的ZoomBox属性无效，解决办法是禁用Navigation的ZoomBox
     * var map = new SuperMap.Map("map", { controls:[
     *     new SuperMap.Control.Navigation({
     *         dragPanOptions:{
     *             enableKinetic:true
     *         },
     *         zoomBoxEnabled:false     //禁用Navigation的ZoomBox
     *     }),
     *      new SuperMap.Control.ZoomBox({keyMask: SuperMap.Handler.MOD_SHIFT,"autoActivate":true},{cursorCSS:"url('images/arr_left.cur'),auto"})
     * ]});
     * (end)
     */
    initialize: function(option, handlerOptions) {
        SuperMap.Control.prototype.initialize.apply(this, arguments);
        if(handlerOptions){
            this.handlerOptions = handlerOptions;
        }
    },

    /**
     * Method: draw
     */    
    draw: function() {
        var options = SuperMap.Util.extend({keyMask:this.keyMask},
            this.handlerOptions);
        this.handler = new SuperMap.Handler.Box( this,
                            {done: this.zoomBox}, options );
    },

    /**
     * Method: zoomBox
     *
     * Parameters:
     * position - {<SuperMap.Bounds>} or {<SuperMap.Pixel>}
     */
    zoomBox: function (position) {
        if (position instanceof SuperMap.Bounds) {
            var bounds;
            if (!this.out) {
                var minXY = this.map.getLonLatFromPixel({
                    x: position.left,
                    y: position.bottom
                });
                var maxXY = this.map.getLonLatFromPixel({
                    x: position.right,
                    y: position.top
                });
                bounds = new SuperMap.Bounds(minXY.lon, minXY.lat,
                                               maxXY.lon, maxXY.lat);
            } else {
                var pixWidth = Math.abs(position.right-position.left);
                var pixHeight = Math.abs(position.top-position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight),
                    (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.getLonLatFromPixel(
                    position.getCenterPixel());
                var xmin = center.lon - (extent.getWidth()/2)*zoomFactor;
                var xmax = center.lon + (extent.getWidth()/2)*zoomFactor;
                var ymin = center.lat - (extent.getHeight()/2)*zoomFactor;
                var ymax = center.lat + (extent.getHeight()/2)*zoomFactor;
                bounds = new SuperMap.Bounds(xmin, ymin, xmax, ymax);
            }
            // always zoom in/out 
            var lastZoom = this.map.getZoom(); 
            this.map.zoomToExtent(bounds);
            if (lastZoom === this.map.getZoom() && this.alwaysZoom == true){ 
                this.map.zoomTo(lastZoom + (this.out ? -1 : 1)); 
            }
        } else { // it's a pixel
            if (!this.out) {
                this.map.setCenter(this.map.getLonLatFromPixel(position),
                               this.map.getZoom() + 1);
            } else {
                this.map.setCenter(this.map.getLonLatFromPixel(position),
                               this.map.getZoom() - 1);
            }
        }
    },

    CLASS_NAME: "SuperMap.Control.ZoomBox"
});
