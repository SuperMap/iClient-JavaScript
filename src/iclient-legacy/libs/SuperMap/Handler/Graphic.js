/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Handler.Feature.js
 */

/**
 * Class: SuperMap.Handler.Graphic
 * 绘制要素的鼠标事件的事件处理器。回调函数中定义的与绘制要素相关的如下事件：click, clickout, over, out 和 dblclick等，会在对应操作完成后得到触发通知。
 */
SuperMap.Handler.Graphic = SuperMap.Class(SuperMap.Handler.Feature, {


    /**
     * Property: graphic
     * {<SuperMap.Graphic>} The last graphic that was hovered.
     */
    graphic: null,

    /**
     * Property: lastGraphic
     * {<SuperMap.Graphic>} The last graphic that was handled.
     */
    lastGraphic: null,

    
    /**
     * Constructor: SuperMap.Handler.Graphic
     * 创建一个新的绘制要素的事件处理器对象
     * 
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器对象的控件，如果控件拥有一个有效的地图属性引用，
     * 则会被handler的seMap方法使用。如果在options中设置了map属性，则使用设置的属性。
     * layer - {<SuperMap.Layer.Graphic>} 矢量图层对象。
     * callbacks - {Object} 回调对象，包含属性'over'并且其属性值为鼠标移到绘制要素上的响应函数，
     * 这个响应函数需要传入当前绘制要素作为参数。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     */
    initialize: function(control, layer, callbacks, options) {
        SuperMap.Handler.Feature.prototype.initialize.apply(this, [control, layer, callbacks, options]);
    },

    /**
     * Method: handle
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} The event occurred over a relevant graphic.
     */
    handle: function(evt) {
        if(this.graphic && !this.graphic.layer) {
            // feature has been destroyed
            this.graphic = null;
        }
        var type = evt.type;
        var handled = false;
        var previouslyIn = !!(this.graphic); // previously in a graphic
        var click = (type === "click" || type === "dblclick" ||type==="contextmenu"||type==="touchstart");
        this.graphic = this.layer.getGraphicFromEvent(evt);
        if(this.graphic) {
            if(type === "touchstart") {
                // stop the event to prevent Android Webkit from
                // "flashing" the map div
                SuperMap.Event.stop(evt);
            }
            var inNew = (this.graphic !== this.lastGraphic);
            inNew = this.allowClickTwice ? true: inNew;
            if(this.geometryTypeMatches(this.graphic)) {
                // in to a graphic
                if(previouslyIn && inNew) {
                    // out of last graphic and in to another
                    if(this.lastGraphic) {
                        this.triggerCallback(type, 'out', [this.lastGraphic, evt]);
                    }
                    this.triggerCallback(type, 'in', [this.graphic, evt]);
                } else if(!previouslyIn || click) {
                    // in graphic for the first time
                    this.triggerCallback(type, 'in', [this.graphic, evt]);
                }
                this.lastGraphic = this.graphic;
                handled = true;
            } else {
                // not in to a graphic
                if(this.lastGraphic && (previouslyIn && inNew || click)) {
                    // out of last graphic for the first time
                    this.triggerCallback(type, 'out', [this.lastGraphic, evt]);
                }
                // next time the mouse goes in a graphic whose geometry type
                // doesn't match we don't want to call the 'out' callback
                // again, so let's set this.graphic to null so that
                // previouslyIn will evaluate to false the next time
                // we enter handle. Yes, a bit hackish...
                this.graphic = null;
            }
        } else {
            this.triggerCallback(type, 'out', [this.lastGraphic, evt]);
            this.graphic = null;
        }
        return handled;
    },

    CLASS_NAME: "SuperMap.Handler.Graphic"
});
