/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 */

/**
 * Class: SuperMap.Handler.Hover
 * 鼠标悬停事件的事件处理器，用来在地图操作中，模拟针对非Dom元素的鼠标悬停事件。
 * 例如，可以使用此处理器模拟用户在地图上的鼠标移动事件，来触发发送WMS/ GetFeatureInfo请求。
 * 
 * Inherits from:
 *  - <SuperMap.Handler> 
 */
SuperMap.Handler.Hover = SuperMap.Class(SuperMap.Handler, {

    /**
     * APIProperty: delay
     * {Integer}  鼠标移动过程中，触发悬停事件时在对象上停留的最小毫秒数。默认值 500。
     */
    delay: 500,
    
    /**
     * APIProperty: pixelTolerance
     * {Integer}  鼠标移动过程中，触发鼠标悬停事件所允许的鼠标最大移动像素范围。默认值 null。
     */
    pixelTolerance: null,

    /**
     * APIProperty: stopMove
     * {Boolean}  阻止其他监听获取鼠标移动事件。默认为false。
     */
    stopMove: false,

    /**
     * Property: px
     * {<SuperMap.Pixel>} - The location of the last mousemove, expressed
     *      in pixels.
     */
    px: null,

    /**
     * Property: timerId
     * {Number} - The id of the timer.
     */
    timerId: null,
 
    /**
     * Constructor: SuperMap.Handler.Hover
     * 构造函数，创建一个新的鼠标悬停事件处理器。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器对象的控件，如果该事件处理器没有被控件使用，那么必须明确调用setMap方法给当前事件处理器赋予一个有效值。
     * callbacks - {Object} 回调函数对象，其方法在控件中定义，被事件处理器中调用。接受当前event作为参数。支持"move":鼠标移动事件；"pausing"鼠标暂停。
     * options - {Object} 一个可选对象，其属性将会赋值到handler对象上。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: mousemove
     * Called when the mouse moves on the map.
     *
     * Parameters:
     * evt - {<SuperMap.Event>}
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    mousemove: function(evt) {
        if(this.passesTolerance(evt.xy)) {
            this.clearTimer();
            this.callback('move', [evt]);
            this.px = evt.xy;
            // clone the evt so original properties can be accessed even
            // if the browser deletes them during the delay
            evt = SuperMap.Util.extend({}, evt);
            this.timerId = window.setTimeout(
                SuperMap.Function.bind(this.delayedCall, this, evt),
                this.delay
            );
        }
        return !this.stopMove;
    },

    /**
     * Method: mouseout
     * Called when the mouse goes out of the map.
     *
     * Parameters:
     * evt - {<SuperMap.Event>}
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    mouseout: function(evt) {
        if (SuperMap.Util.mouseLeft(evt, this.map.eventsDiv)) {
            this.clearTimer();
            this.callback('move', [evt]);
        }
        return true;
    },

    /**
     * Method: passesTolerance
     * Determine whether the mouse move is within the optional pixel tolerance.
     *
     * Parameters:
     * px - {<SuperMap.Pixel>}
     *
     * Returns:
     * {Boolean} The mouse move is within the pixel tolerance.
     */
    passesTolerance: function(px) {
        var passes = true;
        if(this.pixelTolerance && this.px) {
            var dpx = Math.sqrt(
                Math.pow(this.px.x - px.x, 2) +
                Math.pow(this.px.y - px.y, 2)
            );
            if(dpx < this.pixelTolerance) {
                passes = false;
            }
        }
        return passes;
    },

    /**
     * Method: clearTimer
     * Clear the timer and set <timerId> to null.
     */
    clearTimer: function() {
        if(this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    },

    /**
     * Method: delayedCall
     * Triggers pause callback.
     *
     * Parameters:
     * evt - {<SuperMap.Event>}
     */
    delayedCall: function(evt) {
        this.callback('pause', [evt]);
    },

    /**
     * APIMethod: deactivate
     * 关闭当前事件处理器对象上的监听处理，如果已经是关闭状态，则返回false。
     *
     * Returns:
     * {Boolean} handler对象监听已经成功关闭。
     */
    deactivate: function() {
        var deactivated = false;
        if(SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            deactivated = true;
        }
        return deactivated;
    },

    CLASS_NAME: "SuperMap.Handler.Hover"
});
