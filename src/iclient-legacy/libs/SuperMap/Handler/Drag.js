/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 */

/**
 * Class: SuperMap.Handler.Drag
 * 拖拽事件的事件处理器，用来处理与拖拽有关的一系列浏览器事件。控件使用该处理器获知拖拽事件的开始，发生和结束。
 * 
 * 使用拖拽事件处理器的控件通常要构建针对 down 、move和done事件的回调。这些对应key值的回调函数会在拖拽开始，
 * 每一次拖拽过程，拖拽结束时被分别调用。此外，如果用户区分符合拖拽序列结束的事件类型，
 * 控件也可以对key值为"up"和"out"的事件进行
 * 回调。如果拖拽没有发生（鼠标没有移动），那么"down"和"up"回调将被调用，但是拖拽"done"回调函数不会被调用。
 *
 * Inherits from:
 *  - <SuperMap.Handler>
 */
SuperMap.Handler.Drag = SuperMap.Class(SuperMap.Handler, {
  
    /** 
     * Property: started
     * {Boolean} When a mousedown or touchstart event is received, we want to
     * record it, but not set 'dragging' until the mouse moves after starting.
     */
    started: false,

    /**
     * Property: stopDown
     * {Boolean} Stop propagation of mousedown events from getting to listeners
     *     on the same element.  Default is true.
     */
    stopDown: true,

    /** 
     * Property: dragging 
     * {Boolean} 
     */
    dragging: false,

    /**
     * Property: touch
     * {Boolean} When a touchstart event is fired, touch will be true and all
     *     mouse related listeners will do nothing.
     */
    touch: false,

    /** 
     * Property: last
     * {<SuperMap.Pixel>} The last pixel location of the drag.
     */
    last: null,

    /** 
     * Property: start
     * {<SuperMap.Pixel>} The first pixel location of the drag.
     */
    start: null,

    /**
     * Property: lastMoveEvt
     * {Object} The last mousemove event that occurred. Used to
     *     position the map correctly when our "delay drag"
     *     timeout expired.
     */
    lastMoveEvt: null,

    /**
     * Property: oldOnselectstart
     * {Function}
     */
    oldOnselectstart: null,
    
    /**
     * Property: interval
     * {Integer} In order to increase performance, an interval (in 
     *     milliseconds) can be set to reduce the number of drag events 
     *     called. If set, a new drag event will not be set until the 
     *     interval has passed. 
     *     Defaults to 0, meaning no interval. 
     */
    interval: 0,
    
    /**
     * Property: timeoutId
     * {String} The id of the timeout used for the mousedown interval.
     *     This is "private", and should be left alone.
     */
    timeoutId: null,
    
    /**
     * APIProperty: documentDrag
     * {Boolean} 如果设置为true，则当鼠标移出当前map的viewport范围后当前事件处理器对象仍然会处理鼠标move事件。默认值为 false。
     *
     */
    documentDrag: false,
    
    /**
     * Property: documentEvents
     * {Boolean} Are we currently observing document events?
     */
    documentEvents: null,

    /**
     * Constructor: SuperMap.Handler.Drag
     * 构造函数，创建一个拖拽事件对象。
     * 
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件的控件，如果该事件没有被控件使用，
     * 那么必须明确调用setMap方法给当前事件赋予一个有效值。
     * callbacks - {Object} 回调函数对象，包含一个供拖拽事件完成时调用的回调函数。
     * 回调函数接受当前鼠标事件event对象作为唯一参数。
     * 也可以添加对"move"和"done"的回调。也可以明确添加对"down"、"up"、"out"的回调来响应处理这些事件。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.prototype.initialize.apply(this, arguments);
        
        if (this.documentDrag === true) {
            var me = this;
            this._docMove = function(evt) {
                me.mousemove({
                    xy: {x: evt.clientX, y: evt.clientY},
                    element: document
                });
            };
            this._docUp = function(evt) {
                me.mouseup({xy: {x: evt.clientX, y: evt.clientY}});
            };
        }
    },

    
    /**
     * Method: dragstart
     * This private method is factorized from mousedown and touchstart methods
     *
     * Parameters:
     * evt - {Event} The event
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    dragstart: function (evt) {
        var propagate = true;
        this.dragging = false;
        if (this.checkModifiers(evt) &&
               (SuperMap.Event.isLeftClick(evt) ||
                SuperMap.Event.isSingleTouch(evt))&&!SuperMap.isApp) {
            this.started = true;
            this.start = evt.xy;
            this.last = evt.xy;
            //设置拖动时的鼠标样式
            SuperMap.Element.addClass(
                this.map.viewPortDiv, "smDragDown" );
            var imagesLocation=SuperMap.Util.getImagesLocation() ;
            this.map.viewPortDiv.style.cursor="url('"+imagesLocation+"cursors/PanDown.cur'),move";
            this.down(evt);
            this.callback("down", [evt.xy]);

            SuperMap.Event.stop(evt);

            if(!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart ?
                    document.onselectstart : SuperMap.Function.True;
            }
            document.onselectstart = SuperMap.Function.False;

            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        return propagate;
    },

    /**
     * Method: dragmove
     * This private method is factorized from mousemove and touchmove methods
     *
     * Parameters:
     * evt - {Event} The event
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    dragmove: function (evt) {
        this.lastMoveEvt = evt;
        if (this.started && !this.timeoutId && (evt.xy.x !== this.last.x ||
                                                evt.xy.y !== this.last.y)) {
            if(this.documentDrag === true && this.documentEvents) {
                if(evt.element === document) {
                    this.adjustXY(evt);
                    // do setEvent manually because the documentEvents are not
                    // registered with the map
                    this.setEvent(evt);
                } else {
                    this.removeDocumentEvents();
                }
            }
            if (this.interval > 0) {
                this.timeoutId = setTimeout(
                    SuperMap.Function.bind(this.removeTimeout, this),
                    this.interval);
            }
            this.dragging = true;

            this.move(evt);
            this.callback("move", [evt.xy]);
            if(!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart;
                document.onselectstart = SuperMap.Function.False;
            }
            this.last = evt.xy;
        }
        return true;
    },

    /**
     * Method: dragend
     * This private method is factorized from mouseup and touchend methods
     *
     * Parameters:
     * evt - {Event} The event
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    dragend: function (evt) {
        if (this.started) {
            if(this.documentDrag === true && this.documentEvents) {
                this.adjustXY(evt);
                this.removeDocumentEvents();
            }
            var dragged = (this.start !== this.last);
            this.started = false;
            this.dragging = false;
            //设置拖动完成后的鼠标样式
                SuperMap.Element.removeClass(
                    this.map.viewPortDiv, "smDragDown" );
               this.map.viewPortDiv.style.cursor="";


            this.up(evt);
            this.callback("up", [evt.xy]);
            if(dragged) {
                this.callback("done", [evt.xy]);
            }
            document.onselectstart = this.oldOnselectstart;
        }
        return true;
    },

    /**
     * The four methods below (down, move, up, and out) are used by subclasses
     *     to do their own processing related to these mouse events.
     */

    /**
     * Method: down
     * This method is called during the handling of the mouse down event.
     *     Subclasses can do their own processing here.
     *
     * Parameters:
     * evt - {Event} The mouse down event
     */
    down: function(evt) {
    },

    /**
     * Method: move
     * This method is called during the handling of the mouse move event.
     *     Subclasses can do their own processing here.
     *
     * Parameters:
     * evt - {Event} The mouse move event
     *
     */
    move: function(evt) {
    },

    /**
     * Method: up
     * This method is called during the handling of the mouse up event.
     *     Subclasses can do their own processing here.
     *
     * Parameters:
     * evt - {Event} The mouse up event
     */
    up: function(evt) {
    },

    /**
     * Method: out
     * This method is called during the handling of the mouse out event.
     *     Subclasses can do their own processing here.
     *
     * Parameters:
     * evt - {Event} The mouse out event
     */
    out: function(evt) {
    },

    /**
     * The methods below are part of the magic of event handling.  Because
     *     they are named like browser events, they are registered as listeners
     *     for the events they represent.
     */

    /**
     * Method: mousedown
     * Handle mousedown events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    mousedown: function(evt) {
        return this.dragstart(evt);
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
        if (!this.touch) {
            this.touch = true;
            // unregister mouse listeners
            this.map.events.un({
                mousedown: this.mousedown,
                mouseup: this.mouseup,
                mousemove: this.mousemove,
                click: this.click,
                scope: this
            });
        }
        return this.dragstart(evt);
    },

    /**
     * Method: mousemove
     * Handle mousemove events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    mousemove: function(evt) {
        return this.dragmove(evt);
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
        return this.dragmove(evt);
    },

    /**
     * Method: removeTimeout
     * Private. Called by mousemove() to remove the drag timeout.
     */
    removeTimeout: function() {
        this.timeoutId = null;
        // if timeout expires while we're still dragging (mouseup
        // hasn't occurred) then call mousemove to move to the
        // correct position
        if(this.dragging) {
            this.mousemove(this.lastMoveEvt);
        }
    },

    /**
     * Method: mouseup
     * Handle mouseup events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    mouseup: function(evt) {
        return this.dragend(evt);
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
        // override evt.xy with last position since touchend does not have
        // any touch position
        evt.xy = this.last;
        return this.dragend(evt);
    },

    /**
     * Method: mouseout
     * Handle mouseout events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    mouseout: function (evt) {
        if (this.started && SuperMap.Util.mouseLeft(evt, this.map.eventsDiv)) {
            if(this.documentDrag === true) {
                this.addDocumentEvents();
            } else {
                var dragged = (this.start !== this.last);
                this.started = false; 
                this.dragging = false;
                //设置拖动鼠标出地图后的鼠标样式
                    SuperMap.Element.removeClass(
                        this.map.viewPortDiv, "smDragDown" );
              var  imagesLocation=SuperMap.Util.getImagesLocation() ;
                   this.map.viewPortDiv.style.cursor="url('"+imagesLocation+"cursors/Pan.cur'),default";
                this.out(evt);
                this.callback("out", [evt]);
                if(dragged) {
                    this.callback("done", [evt.xy]);
                }
                if(document.onselectstart) {
                    document.onselectstart = this.oldOnselectstart;
                }
            }
        }
        return true;
    },

    /**
     * Method: click
     * The drag handler captures the click event.  If something else registers
     *     for clicks on the same element, its listener will not be called 
     *     after a drag.
     * 
     * Parameters: 
     * evt - {Event} 
     * 
     * Returns:
     * {Boolean} Let the event propagate.
     */
    click: function (evt) {
        // let the click event propagate only if the mouse moved
        return (this.start === this.last);
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
        if(SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            this.dragging = false;
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
        if(SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            this.touch = false;
            this.started = false;
            this.dragging = false;
            this.start = null;
            this.last = null;
            deactivated = true;
        }
        return deactivated;
    },
    
    /**
     * Method: adjustXY
     * Converts event coordinates that are relative to the document body to
     * ones that are relative to the map viewport. The latter is the default in
     * SuperMap.
     * 
     * Parameters:
     * evt - {Object}
     */
    adjustXY: function(evt) {
        var pos = SuperMap.Util.pagePosition(this.map.viewPortDiv);
        evt.xy.x -= pos[0];
        evt.xy.y -= pos[1];
    },
    
    /**
     * Method: addDocumentEvents
     * Start observing document events when documentDrag is true and the mouse
     * cursor leaves the map viewport while dragging.
     */
    addDocumentEvents: function() {
        this.documentEvents = true;
        SuperMap.Event.observe(document, "mousemove", this._docMove);
        SuperMap.Event.observe(document, "mouseup", this._docUp);
    },
    
    /**
     * Method: removeDocumentEvents
     * Stops observing document events when documentDrag is true and the mouse
     * cursor re-enters the map viewport while dragging.
     */
    removeDocumentEvents: function() {
        this.documentEvents = false;
        SuperMap.Event.stopObserving(document, "mousemove", this._docMove);
        SuperMap.Event.stopObserving(document, "mouseup", this._docUp);
    },

    CLASS_NAME: "SuperMap.Handler.Drag"
});
