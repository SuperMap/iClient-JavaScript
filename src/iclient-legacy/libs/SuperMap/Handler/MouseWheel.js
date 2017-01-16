/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 */

/**
 * Class: SuperMap.Handler.MouseWheel
 * 鼠标滚轮事件处理器。
 * 
 * Inherits from:
 *  - <SuperMap.Handler>
 */
SuperMap.Handler.MouseWheel = SuperMap.Class(SuperMap.Handler, {
    /** 
     * Property: wheelListener 
     * {function} 
     */
    wheelListener: null,

    /** 
     * Property: mousePosition
     * {<SuperMap.Pixel>} mousePosition is necessary because
     * evt.clientX/Y is buggy in Moz on wheel events, so we cache and use the
     * value from the last mousemove.
     */
    mousePosition: null,

    /**
     * Property: interval
     * {Integer} In order to increase server performance, an interval (in 
     *     milliseconds) can be set to reduce the number of up/down events 
     *     called. If set, a new up/down event will not be set until the 
     *     interval has passed. 
     *     Defaults to 0, meaning no interval. 
     */
    interval: 0,
    
    /**
     * Property: delta
     * {Integer} When interval is set, delta collects the mousewheel z-deltas
     *     of the events that occur within the interval.
     *      See also the cumulative option
     */
    delta: 0,
    
    /**
     * Property: cumulative
     * {Boolean} When interval is set: true to collect all the mousewheel 
     *     z-deltas, false to only record the delta direction (positive or
     *     negative)
     */
    cumulative: true,

    /**
     * Constructor: SuperMap.Handler.MouseWheel
     * 构造函数，返回一个新的鼠标滚轮事件处理器。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器对象的控件，如果控件拥有一个有效的地图属性引用，
	 * 则会被事件处理器的seMap方法使用。如果在options中明确指定了map属性，则以
	 * 后者为准传入setMap方法。
     * callbacks - {Object} 回调对象函数，包含一个单一的函数回调。这个回调接受鼠标滚珠事件event作为参数。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。     
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.prototype.initialize.apply(this, arguments);
        this.wheelListener = SuperMap.Function.bindAsEventListener(
            this.onWheelEvent, this
        );
    },

    /**
     * Method: destroy
     */    
    destroy: function() {
        SuperMap.Handler.prototype.destroy.apply(this, arguments);
        this.wheelListener = null;
    },

    /**
     *  Mouse ScrollWheel code thanks to http://adomas.org/javascript-mouse-wheel/
     */

    /** 
     * Method: onWheelEvent
     * Catch the wheel event and handle it xbrowserly
     * 
     * Parameters:
     * e - {Event} 
     */
    onWheelEvent: function(e){
        
        // make sure we have a map and check keyboard modifiers
        if (!this.map || !this.checkModifiers(e)) {
            return;
        }
        
        // Ride up the element's DOM hierarchy to determine if it or any of 
        //  its ancestors was: 
        //   * specifically marked as scrollable
        //   * one of our layer divs
        //   * the map div
        //
        var overScrollableDiv = false;
        var overLayerDiv = false;
        var overMapDiv = false;
        
        var elem = SuperMap.Event.element(e);
        while((elem != null) && !overMapDiv && !overScrollableDiv) {

            if (!overScrollableDiv) {
                try {
                    if (elem.currentStyle) {
                        var overflow = elem.currentStyle["overflow"];
                    } else {
                        var style = 
                            document.defaultView.getComputedStyle(elem, null);
                        var overflow = style.getPropertyValue("overflow");
                    }
                    overScrollableDiv = ( overflow && 
                        (overflow === "auto") || (overflow === "scroll") );
                } catch(err) {
                    //sometimes when scrolling in a popup, this causes 
                    // obscure browser error
                }
            }

            if (!overLayerDiv) {
                for(var i=0, len=this.map.layers.length; i<len; i++) {
                    // Are we in the layer div? Note that we have two cases
                    // here: one is to catch EventPane layers, which have a 
                    // pane above the layer (layer.pane)
                    if (elem === this.map.layers[i].div 
                        || elem === this.map.layers[i].pane) { 
                        overLayerDiv = true;
                        break;
                    }
                }
            }
            overMapDiv = (elem === this.map.div);

            elem = elem.parentNode;
        }
        
        // Logic below is the following:
        //
        // If we are over a scrollable div or not over the map div:
        //  * do nothing (let the browser handle scrolling)
        //
        //    otherwise 
        // 
        //    If we are over the layer div: 
        //     * zoom/in out
        //     then
        //     * kill event (so as not to also scroll the page after zooming)
        //
        //       otherwise
        //
        //       Kill the event (dont scroll the page if we wheel over the 
        //        layerswitcher or the pan/zoom control)
        //
        if (!overScrollableDiv && overMapDiv) {
            if (overLayerDiv) {
                var delta = 0;
                if (!e) {
                    e = window.event;
                }
                if (e.wheelDelta) {
                    delta = e.wheelDelta/120; 
                    if (window.opera && window.opera.version() < 9.2) {
                        delta = -delta;
                    }
                } else if (e.detail) {
                    delta = -e.detail / 3;
                }
                this.delta = this.delta + delta;

                if(this.interval) {
                    window.clearTimeout(this._timeoutId);
                    this._timeoutId = window.setTimeout(
                        SuperMap.Function.bind(function(){
                            this.wheelZoom(e);
                        }, this),
                        this.interval
                    );
                } else {
                    this.wheelZoom(e);
                }
            }
            SuperMap.Event.stop(e);
        }
    },

    /**
     * Method: wheelZoom
     * Given the wheel event, we carry out the appropriate zooming in or out,
     *     based on the 'wheelDelta' or 'detail' property of the event.
     * 
     * Parameters:
     * e - {Event}
     */
    wheelZoom: function(e) {
        var delta = this.delta;
        this.delta = 0;
        
        if (delta) {
            // add the mouse position to the event because mozilla has 
            // a bug with clientX and clientY (see 
            // https://bugzilla.mozilla.org/show_bug.cgi?id=352179)
            // getLonLatFromViewPortPx(e) returns wrong values
            if (this.mousePosition) {
                e.xy = this.mousePosition;
            } 
            if (!e.xy) {
                // If the mouse hasn't moved over the map yet, then
                // we don't have a mouse position (in FF), so we just
                // act as if the mouse was at the center of the map.
                // Note that we can tell we are in the map -- and 
                // this.map is ensured to be true above.
                e.xy = this.map.getPixelFromLonLat(
                    this.map.getCenter()
                );
            }
            if (delta < 0) {
                this.callback("down", [e, this.cumulative ? delta : -1]);
            } else {
                this.callback("up", [e, this.cumulative ? delta : 1]);
            }
        }
    },
    
    /**
     * Method: mousemove
     * Update the stored mousePosition on every move.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    mousemove: function (evt) {
        this.mousePosition = evt.xy;
    },

    /**
     * Method: activate 
     */
    activate: function (evt) {
        if (SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            //register mousewheel events specifically on the window and document
            var wheelListener = this.wheelListener;
            SuperMap.Event.observe(window, "DOMMouseScroll", wheelListener);
            SuperMap.Event.observe(window, "mousewheel", wheelListener);
            SuperMap.Event.observe(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },

    /**
     * Method: deactivate 
     */
    deactivate: function (evt) {
        if (SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            // unregister mousewheel events specifically on the window and document
            var wheelListener = this.wheelListener;
            SuperMap.Event.stopObserving(window, "DOMMouseScroll", wheelListener);
            SuperMap.Event.stopObserving(window, "mousewheel", wheelListener);
            SuperMap.Event.stopObserving(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },

    CLASS_NAME: "SuperMap.Handler.MouseWheel"
});
