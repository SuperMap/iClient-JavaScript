/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 */

/**
 * Class: SuperMap.Handler.Click
 * 鼠标点击事件的事件处理器。旨在对更多灵活的点击操作提供控制。浏览器触发点击事件两次则认为是双击。
 * 鼠标down、move、up序列也会触发单击事件。
 * 使用此事件处理器，控件可以决定是否忽略双击中的单击事件。
 * 通过设置pixlToerance属性，控件也可以忽略一个包含拖拽动作的单击。
 * 
 * Inherits from:
 *  - <SuperMap.Handler> 
 */
SuperMap.Handler.Click = SuperMap.Class(SuperMap.Handler, {
    /**
     * APIProperty: delay
     * {Number} 两次单击事件的最小间隔毫秒数，间隔小于该值则认为是双击事件。
     */
    delay: 300,
    
    /**
     * APIProperty: single
     * {Boolean} 单击事件，默认为 true。
     */
    single: true,
    
    /**
     * APIProperty: double
     * {Boolean} 双击事件,默认为 false。
     */
    'double': false,
    
    /**
     * APIProperty: pixelTolerance
     * {Number} 点击事件像素容差。点击事件允许的最大鼠标mousedown与mouseup的像素间隔距离，
     * 超过这个距离则将被忽略，不被认为是点击事件。默认是 0。
     */
    pixelTolerance: 0,
        
    /**
     * APIProperty: dblclickTolerance
     * {Number} 双击事件容差。鼠标双击事件中点击事件序列的最大像素间隔，默认是13。
     * 如果两侧点击间隔超过这个值，则不会触发双击事件。
     */
    dblclickTolerance: 13,

    /**
     * APIProperty: stopSingle
     * {Boolean} 从被通知点击的时候停止其它的监听。默认为false。
     */
    stopSingle: false,
    
    /**
     * APIProperty: stopDouble
     * {Boolean} 从被通知双击的时候停止其它的监听。默认为false。
     */
    stopDouble: false,

    /**
     * Property: timerId
     * {Number} The id of the timeout waiting to clear the <delayedCall>.
     */
    timerId: null,

    /**
     * Property: touch
     * {Boolean} When a touchstart event is fired, touch will be true and all
     *     mouse related listeners will do nothing.
     */
    touch: false,
    
    /**
     * Property: down
     * {Object} Object that store relevant information about the last
     *     mousedown or touchstart. Its 'xy' SuperMap.Pixel property gives
     *     the average location of the mouse/touch event. Its 'touches'
     *     property records clientX/clientY of each touches.
     */
    down: null,

    /**
     * Property: last
     * {Object} Object that store relevant information about the last
     *     mousemove or touchmove. Its 'xy' SuperMap.Pixel property gives
     *     the average location of the mouse/touch event. Its 'touches'
     *     property records clientX/clientY of each touches.
     */
    last: null,

    /** 
     * Property: first
     * {Object} When waiting for double clicks, this object will store 
     *     information about the first click in a two click sequence.
     */
    first: null,

    /**
     * Property: rightclickTimerId
     * {Number} The id of the right mouse timeout waiting to clear the 
     *     <delayedEvent>.
     */
    rightclickTimerId: null,
    
    /**
     * Constructor: SuperMap.Handler.Click
     * 创建一个新的点击事件handler。
     * 
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器的控件，如果该事件处理器没有被控件使用，那么必须明确调用setMap方法给当前事件处理器赋予一个有效值。
     * callbacks - {Object} 回调函数对象。回调函数接受点击事件event作为参数。支持click 和 dbclick 回调函数。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * Method: touchstart
     * Handle touchstart.
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    touchstart: function(evt) {
        if (!this.touch) {
            this.unregisterMouseListeners();
            this.touch = true;
        }
        this.down = this.getEventInfo(evt);
        this.last = this.getEventInfo(evt);
        return true;
    },
    
    /**
     * Method: touchmove
     *    Store position of last move, because touchend event can have
     *    an empty "touches" property.
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    touchmove: function(evt) {
        this.last = this.getEventInfo(evt);
        return true;
    },

    /**
     * Method: touchend
     *   Correctly set event xy property, and add lastTouches to have
     *   touches property from last touchstart or touchmove
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    touchend: function(evt) {
        // touchstart may not have been allowed to propagate
        if (this.down) {
            evt.xy = this.last.xy;
            evt.lastTouches = this.last.touches;
            this.handleSingle(evt);
            this.down = null;
        }
        return true;
    },
    
    /**
     * Method: unregisterMouseListeners
     * In a touch environment, we don't want to handle mouse events.
     */
    unregisterMouseListeners: function() {
        this.map.events.un({
            mousedown: this.mousedown,
            mouseup: this.mouseup,
            click: this.click,
            dblclick: this.dblclick,
            scope: this
        });
    },

    /**
     * Method: mousedown
     * Handle mousedown.
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    mousedown: function(evt) {
        this.down = this.getEventInfo(evt);
        this.last = this.getEventInfo(evt);
        return true;
    },

    /**
     * Method: mouseup
     * Handle mouseup.  Installed to support collection of right mouse events.
     * 
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    mouseup: function (evt) {
        var propagate = true;

        // Collect right mouse clicks from the mouseup
        //  IE - ignores the second right click in mousedown so using
        //  mouseup instead
        if (this.checkModifiers(evt) && this.control.handleRightClicks &&
           SuperMap.Event.isRightClick(evt)) {
            propagate = this.rightclick(evt);
        }

        return propagate;
    },
    
    /**
     * Method: rightclick
     * Handle rightclick.  For a dblrightclick, we get two clicks so we need 
     *     to always register for dblrightclick to properly handle single 
     *     clicks.
     *     
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    rightclick: function(evt) {
        if(this.passesTolerance(evt)) {
           if(this.rightclickTimerId != null) {
                //Second click received before timeout this must be 
                // a double click
                this.clearTimer();
                this.callback('dblrightclick', [evt]);
                return !this.stopDouble;
            } else { 
                //Set the rightclickTimerId, send evt only if double is 
                // true else trigger single
                var clickEvent = this['double'] ?
                    SuperMap.Util.extend({}, evt) : 
                    this.callback('rightclick', [evt]);

                var delayedRightCall = SuperMap.Function.bind(
                    this.delayedRightCall, 
                    this, 
                    clickEvent
                );
                this.rightclickTimerId = window.setTimeout(
                    delayedRightCall, this.delay
                );
            } 
        }
        return !this.stopSingle;
    },
    
    /**
     * Method: delayedRightCall
     * Sets <rightclickTimerId> to null.  And optionally triggers the 
     *     rightclick callback if evt is set.
     */
    delayedRightCall: function(evt) {
        this.rightclickTimerId = null;
        if (evt) {
           this.callback('rightclick', [evt]);
        }
    },
    
    /**
     * Method: click
     * Handle click events from the browser.  This is registered as a listener
     *     for click events and should not be called from other events in this
     *     handler.
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    click: function(evt) {
        if (!this.last) {
            this.last = this.getEventInfo(evt);
        }
        this.handleSingle(evt);
        return !this.stopSingle;
    },

    /**
     * Method: dblclick
     * Handle dblclick.  For a dblclick, we get two clicks in some browsers
     *     (FF) and one in others (IE).  So we need to always register for
     *     dblclick to properly handle single clicks.  This method is registered
     *     as a listener for the dblclick browser event.  It should *not* be
     *     called by other methods in this handler.
     *     
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    dblclick: function(evt) {
        this.handleDouble(evt);
        return !this.stopDouble;
    },
    
    /** 
     * Method: handleDouble
     * Handle double-click sequence.
     */
    handleDouble: function(evt) {
        if (this["double"] && this.passesDblclickTolerance(evt)) {
            this.callback("dblclick", [evt]);
        }
    },
    
    /** 
     * Method: handleSingle
     * Handle single click sequence.
     */
    handleSingle: function(evt) {
        if (this.passesTolerance(evt)) {
            if (this.timerId != null) {
                // already received a click
                if (this.last.touches && this.last.touches.length === 1) {
                    // touch device, no dblclick event - this may be a double
                    if (this["double"]) {
                        // on Android don't let the browser zoom on the page
                        SuperMap.Event.stop(evt);
                    }
                    this.handleDouble(evt);
                }
                // if we're not in a touch environment we clear the click timer
                // if we've got a second touch, we'll get two touchend events
                if (!this.last.touches || this.last.touches.length !== 2) {
                    this.clearTimer();
                }
            } else {
                // remember the first click info so we can compare to the second
                this.first = this.getEventInfo(evt);
                // set the timer, send evt only if single is true
                //use a clone of the event object because it will no longer 
                //be a valid event object in IE in the timer callback
                var clickEvent = this.single ?
                    SuperMap.Util.extend({}, evt) : null;
                this.queuePotentialClick(clickEvent);
            }
        }
    },
    
    /** 
     * Method: queuePotentialClick
     * This method is separated out largely to make testing easier (so we
     *     don't have to override window.setTimeout)
     */
    queuePotentialClick: function(evt) {
        this.timerId = window.setTimeout(
            SuperMap.Function.bind(this.delayedCall, this, evt),
            this.delay
        );
    },

    /**
     * Method: passesTolerance
     * Determine whether the event is within the optional pixel tolerance.  Note
     *     that the pixel tolerance check only works if mousedown events get to
     *     the listeners registered here.  If they are stopped by other elements,
     *     the <pixelTolerance> will have no effect here (this method will always
     *     return true).
     *
     * Returns:
     * {Boolean} The click is within the pixel tolerance (if specified).
     */
    passesTolerance: function(evt) {
        var passes = true;
        if (this.pixelTolerance != null && this.down && this.down.xy) {
            passes = this.pixelTolerance >= this.down.xy.distanceTo(evt.xy);
            // for touch environments, we also enforce that all touches
            // start and end within the given tolerance to be considered a click
            if (passes && this.touch && 
                this.down.touches.length === this.last.touches.length) {
                // the touchend event doesn't come with touches, so we check
                // down and last
                for (var i=0, ii=this.down.touches.length; i<ii; ++i) {
                    if (this.getTouchDistance(
                            this.down.touches[i], 
                            this.last.touches[i]
                        ) > this.pixelTolerance) {
                        passes = false;
                        break;
                    }
                }
            }
        }
        return passes;
    },
    
    /** 
     * Method: getTouchDistance
     *
     * Returns:
     * {Boolean} The pixel displacement between two touches.
     */
    getTouchDistance: function(from, to) {
        return Math.sqrt(
            Math.pow(from.clientX - to.clientX, 2) +
            Math.pow(from.clientY - to.clientY, 2)
        );
    },
    
    /**
     * Method: passesDblclickTolerance
     * Determine whether the event is within the optional double-cick pixel 
     *     tolerance.
     *
     * Returns:
     * {Boolean} The click is within the double-click pixel tolerance.
     */
    passesDblclickTolerance: function(evt) {
        var passes = true;
        if (this.down && this.first) {
            passes = this.down.xy.distanceTo(this.first.xy) <= this.dblclickTolerance;
        }
        return passes;
    },

    /**
     * Method: clearTimer
     * Clear the timer and set <timerId> to null.
     */
    clearTimer: function() {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
        if (this.rightclickTimerId != null) {
            window.clearTimeout(this.rightclickTimerId);
            this.rightclickTimerId = null;
        }
    },
    
    /**
     * Method: delayedCall
     * Sets <timerId> to null.  And optionally triggers the click callback if
     *     evt is set.
     */
    delayedCall: function(evt) {
        this.timerId = null;
        if (evt) {
            this.callback("click", [evt]);
        }
    },

    /**
     * Method: getEventInfo
     * This method allows us to store event information without storing the
     *     actual event.  In touch devices (at least), the same event is 
     *     modified between touchstart, touchmove, and touchend.
     *
     * Returns:
     * {Object} An object with event related info.
     */
    getEventInfo: function(evt) {
        var touches;
        if (evt.touches) {
            var len = evt.touches.length;
            touches = new Array(len);
            var touch;
            for (var i=0; i<len; i++) {
                touch = evt.touches[i];
                touches[i] = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
            }
        }
        return {
            xy: evt.xy,
            touches: touches
        };
    },

    /**
     * APIMethod: deactivate
     * 关闭事件处理器对象上的监听处理，如果这个事件处理器已经是关闭状态，则返回false。
     *
     * Returns:
     * {Boolean} 事件处理器对象监听已经成功关闭。
     */
    deactivate: function() {
        var deactivated = false;
        if(SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            this.down = null;
            this.first = null;
            this.last = null;
            this.touch = false;
            deactivated = true;
        }
        return deactivated;
    },

    CLASS_NAME: "SuperMap.Handler.Click"
});
