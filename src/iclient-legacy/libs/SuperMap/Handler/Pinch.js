/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 */

/**
 * Class: SuperMap.Handler.Pinch
 * 手势操作事件处理器，用来处理一系列与手势操作相关的浏览器事件。
 * 可以告知控件一个手势操作的开始、发生经过、结束。
 * 使用手势操作处理器的控件通常要构建对应"start"、"move"、"done"的回调，
 * 这些回调会分别在手势操作开始，每一次变化和手势操作完成时被分别调用。
 *
 * 使用 <SuperMap.Handler.Pinch> 构造函数可以创建一个新的实例。
 *
 * Inherits from:
 *  - <SuperMap.Handler>
 */
SuperMap.Handler.Pinch = SuperMap.Class(SuperMap.Handler, {

    /**
     * Property: started
     * {Boolean} When a touchstart event is received, we want to record it,
     *     but not set 'pinching' until the touchmove get started after
     *     starting.
     */
    started: false,

    /**
     * Property: stopDown
     * {Boolean} Stop propagation of touchstart events from getting to
     *     listeners on the same element. Default is false.
     */
    stopDown: false,

    /**
     * Property: pinching
     * {Boolean}
     */
    pinching: false,

    /**
     * Property: last
     * {Object} Object that store informations related to pinch last touch.
     */
    last: null,

    /**
     * Property: start
     * {Object} Object that store informations related to pinch touchstart.
     */
    start: null,

    /**
     * Property: msGesture
     * {Object} 对应IE10的MSGesture对象。针对image出图时的手势对象。
     */
    msGesture: null,

    /**
     * Property: scale
     * {Number} 控制在IE10上 MSGestureChange 事件对象的scale，通过运算获取
     *      适当的scale，传递给control控件。
     */
    scale: null,

    /**
     * Constructor: SuperMap.Handler.Pinch
     * 构造函数，返回一个新的手势操作处理器实例。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器的控件，如果该事件处理器没有被控件使用，那么必须明确调用setMap方法给当前handler赋予一个有效值。
     * callbacks - {Object} 回调函数对象，包含了提供手势操作开始、变化、和结束时分别调用的函数。这些回调函数接收一个
     * 包含操作比例scale、手势距离distance以及当前触摸点坐标的信息对象作为参数。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     */
    initialize: function(control, callbacks, options) {
        var me = this;
        SuperMap.Handler.prototype.initialize.apply(me, arguments);
    },

    /**
    * 通过 addPointer 方法给 MSGesture 关联触摸点，通常触摸点是通过
     *      onmspointerdown 对象的pointerId添加的。pointerId 在触摸点整个生命
     *      周期都不会发生变化。可以这样理解：pointId必须通过addPointer方法被添
     *      加到一个已经设置了target属性的MSGesture对象，才能够使MSGesture的
     *      target对应的DOM元素能够触发MSGestureEvents（IE10 手势事件）。
     */
    MSPointerDown:function(evt){
        var MSGestureType = typeof MSGesture;
        if(this.msGesture === null && (MSGestureType  !== "undefined")){
            this.msGesture = new MSGesture();
            this.msGesture.target = evt.target;
        }
        if(evt.pointerType !== "mouse" && (MSGestureType !== "undefined")) {//针对鼠标事件不要将pointerId加入到MSGesture对象中
            this.msGesture.addPointer(evt.pointerId);
        }
    },
    
    MSPointerUp:function (evt) {
        if(this.msGesture) {
            this.msGesture.stop();
        }
    },

    pointerdown:function(evt){
        this.MSPointerDown(evt);
    },

    pointerup:function (evt) {
        this.MSPointerUp(evt);
    },

    /**
     * Method: touchstart
     * Handle touchstart events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    touchstart: function(evt) {
        var propagate = true;
        this.pinching = false;
        if (SuperMap.Event.isMultiTouch(evt)||SuperMap.isApp) {
            this.started = true;
            this.last = this.start = {
                distance: this.getDistance(evt.touches),
                delta: 0,
                scale: 1
            };
            this.callback("start", [evt, this.start]);
            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        // prevent document dragging
        SuperMap.Event.stop(evt);
        return propagate;
    },

    /**
     * Method: touchmove
     * Handle touchmove events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    touchmove: function(evt) {
        if (this.started && SuperMap.Event.isMultiTouch(evt)||SuperMap.isApp) {
            this.pinching = true;
            var current = this.getPinchData(evt);
            this.callback("move", [evt, current]);
            this.last = current;
            // prevent document dragging
            SuperMap.Event.stop(evt);
        }
        return true;
    },

    /**
     * Method: touchend
     * Handle touchend events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    touchend: function(evt) {
        if (this.started) {
            try{
                if(SuperMap.isApp)this.map.baseLayer.zoomDuration = 0;
            }
            catch(e){}
            this.started = false;
            this.pinching = false;
            this.callback("done", [evt, this.start, this.last]);
            this.start = null;
            this.last = null;
        }
        return true;
    },

    /**
     * Method: MSGestureStart
     * 监听MSGestureStart浏览器事件，并对事件对象进行处理。
     * 为了尽量小的影响之前的代码，提高代码重用，这里为事件添加xy属性对象，该
     * 属性对象包含x，y属性对应IE10手势的多点触摸的中心点x，y坐标，equals方法
     * 用来判断两个对象的x，y值是否相同。
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    MSGestureStart:function (evt) {
        var propagate = true;
        this.pinching = false;
        this.started = true;
        this.scale = 1;
        this.last = this.start = {
            scale: 1
        };
        this.callback("MSstart", [evt, this.start]);
        propagate = !this.stopDown;
        SuperMap.Event.stop(evt);
        return propagate;
    },

    /**
     * Method: MSGestureChange
     * 监听 MSGestureChange 浏览器事件，并对事件对象进行处理。
     * 其中事件的scale属性是相对于最近一次MSGestureEvent事件交互的比例，并且
     * 该属性是只读的，所以当MSGestureChange触发时，要随时存储它的scale值，
     * 以便于对下一次scale进行计算处理，然后传给control控件。具体描述详见( http://msdn.microsoft.com/en-us/library/ie/hh772082(v=vs.85).aspx )
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    MSGestureChange:function (evt) {
        if(evt.scale === 1) return;
        this.map.isIESingleTouch = false;
        if (this.started) {
           this.pinching = true;
           this.scale = evt.scale * this.scale;
           var current = {
               scale:this.scale
           };
           this.callback("MSmove", [evt, current]);
           this.last = current;
           SuperMap.Event.stop(evt);
        }
        return true;
    },

    /**
     * Method: MSGestureEnd
     * 监听MSGestureEnd浏览器事件，并对事件对象进行处理。
     * 对手势结束事件进行监听，同时将起始状态start与最终状态last传给control控件，
     * 通过其scale属性对地图进行缩放。
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    MSGestureEnd:function (evt) {
        if (this.started) {
            this.started = false;
            this.pinching = false;
            this.callback("MSdone", [evt, this.start, this.last]);
            this.start = null;
            this.last = null;
            this.scale = null;
        }
        return true;
    },

    /**
     * Method: activate
     * Activate the handler.
     *
     * Returns:
     * {Boolean} The handler was successfully activated.
     */
    activate: function() {
        var activated = false;
        if (SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            this.pinching = false;
            activated = true;
        }
        return activated;
    },

    /**
     * Method: deactivate
     * Deactivate the handler.
     *
     * Returns:
     * {Boolean} The handler was successfully deactivated.
     */
    deactivate: function() {
        var deactivated = false;
        if (SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            this.started = false;
            this.pinching = false;
            this.start = null;
            this.last = null;
            this.gesture = null,
            this.flag = 0,
            this.scale = 1,
            deactivated = true;
        }
        return deactivated;
    },

    /**
     * Method: getDistance
     * Get the distance in pixels between two touches.
     *
     * Parameters:
     * touches - {Array(Object)}
     *
     * Returns:
     * {Number} The distance in pixels.
     */
    getDistance: function(touches) {
        var t0 = touches[0];
        var t1 = touches[1];
        if(!t1){
            return 0;
        }
        else{
            return Math.sqrt(
                Math.pow(t0.clientX - t1.clientX, 2) +
                Math.pow(t0.clientY - t1.clientY, 2)
            );
        }
    },


    /**
     * Method: getPinchData
     * Get informations about the pinch event.
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Object} Object that contains data about the current pinch.
     */
    getPinchData: function(evt) {
        var distance = this.getDistance(evt.touches);
        var scale = distance / this.start.distance;
        if(distance==0||this.start.distance==0){
            var scale = 1;
        }
        else{
            var scale = distance / this.start.distance;
        }
        return {
            distance: distance,
            delta: this.last.distance - distance,
            scale: scale
        };
    },

    CLASS_NAME: "SuperMap.Handler.Pinch"
});

