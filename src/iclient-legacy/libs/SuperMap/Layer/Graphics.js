/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Layer.Graphic
 * 该图层用于高速渲染带有点符号样式的矢量要素。
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.Graphics = SuperMap.Class(SuperMap.Layer, {

    /**
     * Register a listener for a particular event with the following syntax:
     * (code)
     * layer.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to layer.events.object.
     * element - {DOMElement} A reference to layer.events.element.
     *
     * Supported map event types (in addition to those from <SuperMap.Layer>):
     * beforegraphicadded - Triggered before a graphic is added.  Listeners
     *      will receive an object with a *graphic* property referencing the
     *      graphic to be added.  To stop the graphic from being added, a
     *      listener should return false.
     * beforegraphicsadded - Triggered before an array of graphics is added.
     *      Listeners will receive an object with a *graphics* property
     *      referencing the graphic to be added. To stop the graphics from
     *      being added, a listener should return false.
     * graphicadded - Triggered after a graphic is added.  The event
     *      object passed to listeners will have a *graphic* property with a
     *      reference to the added graphic.
     * graphicsadded - Triggered after graphics are added.  The event
     *      object passed to listeners will have a *graphics* property with a
     *      reference to an array of added graphics.
     * beforegraphicremoved - Triggered before a graphic is removed. Listeners
     *      will receive an object with a *graphic* property referencing the
     *      graphic to be removed.
     * beforegraphicsremoved - Triggered before multiple graphics are removed.
     *      Listeners will receive an object with a *graphics* property
     *      referencing the graphics to be removed.
     * graphicremoved - Triggerd after a graphic is removed. The event
     *      object passed to listeners will have a *graphic* property with a
     *      reference to the removed graphic.
     * graphicsremoved - Triggered after graphics are removed. The event
     *      object passed to listeners will have a *graphics* property with a
     *      reference to an array of removed graphics.
     * beforegraphicselected - Triggered after a graphic is selected.  Listeners
     *      will receive an object with a *graphic* property referencing the
     *      graphic to be selected. To stop the graphic from being selectd, a
     *      listener should return false.
     * graphicselected - Triggered after a graphic is selected.  Listeners
     *      will receive an object with a *graphic* property referencing the
     *      selected graphic.
     * graphicunselected - Triggered after a graphic is unselected.
     *      Listeners will receive an object with a *graphic* property
     *      referencing the unselected graphic.
     * beforegraphicmodified - Triggered when a graphic is selected to
     *      be modified.  Listeners will receive an object with a *graphic*
     *      property referencing the selected graphic.
     * graphicmodified - Triggered when a graphic has been modified.
     *      Listeners will receive an object with a *graphic* property referencing
     *      the modified graphic.
     * aftergraphicmodified - Triggered when a graphic is finished being modified.
     *      Listeners will receive an object with a *graphic* property referencing
     *      the modified graphic.
     * vertexmodified - Triggered when a vertex within any graphic geometry
     *      has been modified.  Listeners will receive an object with a
     *      *graphic* property referencing the modified graphic, a *vertex*
     *      property referencing the vertex modified (always a point geometry),
     *      and a *pixel* property referencing the pixel location of the
     *      modification.
     * vertexremoved - Triggered when a vertex within any graphic geometry
     *      has been deleted.  Listeners will receive an object with a
     *      *graphic* property referencing the modified graphic, a *vertex*
     *      property referencing the vertex modified (always a point geometry),
     *      and a *pixel* property referencing the pixel location of the
     *      removal.
     * sketchstarted - Triggered when a graphic sketch bound for this layer
     *      is started.  Listeners will receive an object with a *graphic*
     *      property referencing the new sketch graphic and a *vertex* property
     *      referencing the creation point.
     * sketchmodified - Triggered when a graphic sketch bound for this layer
     *      is modified.  Listeners will receive an object with a *vertex*
     *      property referencing the modified vertex and a *graphic* property
     *      referencing the sketch graphic.
     * sketchcomplete - Triggered when a graphic sketch bound for this layer
     *      is complete.  Listeners will receive an object with a *graphic*
     *      property referencing the sketch graphic.  By returning false, a
     *      listener can stop the sketch graphic from being added to the layer.
     * refresh - Triggered when something wants a strategy to ask the protocol
     *      for a new set of graphics.
     */
     
     EVENT_TYPES: ["beforegraphicadded", "beforegraphicsadded",
              "graphicadded", "graphicsadded", "beforegraphicremoved",
              "beforegraphicsremoved", "graphicremoved", "graphicsremoved",
              "beforegraphicselected", "graphicselected", "graphicunselected",
              "beforegraphicmodified", "graphicmodified", "aftergraphicmodified",
              "vertexmodified", "vertexremoved", "sketchstarted",
              "sketchmodified", "sketchcomplete", "refresh"],

    /**
     * APIProperty: isBaseLayer
     * {Boolean} 该图层是否是 基础图层，默认值为 false。可以在构造函数中是通过options设置。
     */
    isBaseLayer: false,

    /** 
     * APIProperty: isFixed
     * {Boolean} 设置当前图层在鼠标拖动及放大缩小时位置是否固定，默认为 false。
     */
    isFixed: false,
    /**
     * Property: isFirstDraw
     * {Boolean} 是否是第一次绘制，用于协助isFixed。
     */
    isFirstDraw:true,

    /** 
     * APIProperty: graphics
     * {Array(<SuperMap.Graphic>)}用于存放graphic要素。
     */
    graphics: null,
    
    /** 
     * Property: filter
     * {<SuperMap.Filter>} The filter set in this layer,
     *     a strategy launching read requests can combined
     *     this filter with its own filter.
     */
    filter: null,
    
    /** 
     * Property: selectedGraphics
     * {Array(<SuperMap.Graphic>)}
     */
    selectedGraphics: null,
    
    /**
     * Property: unrenderedGraphics
     * {Object} 由graphic对象组成的hash表，key值为graphic.id，标识渲染失败的graphic。
     */
    unrenderedGraphics: null,

    
    /** 
     * Property: renderer
     * {<SuperMap.Renderer.Graphic>}
     */
    renderer: null,

    /** 
     * Property: drawn
     * {Boolean} 是否这个图层的graphic已经被绘制。
     */
    drawn: false,


    /** 
     * Property: firstload
     * {Boolean} 是否第一次加载。
     */    
    firstLoad: true,


    /** 
     * Property: zoomChanged
     * {Boolean} 当前的地图操作是否是缩放操作。
     */
    zoomChanged: null,
    

    /**
     * Constructor: SuperMap.Layer.Graphic
     * 创建一个矢量图层。
     * (start code)
     * //创建一个名为“Graphic Layer”
     *  var graphicLayer = new SuperMap.Layer.Graphic("Graphic Layer");
     * (end)     
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.Graphic>} 新的矢量图层。
     */
    initialize: function(name, options,renderopation) {
        this.EVENT_TYPES =
            SuperMap.Layer.Graphics.prototype.EVENT_TYPES.concat(
            SuperMap.Layer.prototype.EVENT_TYPES
        );
        
        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        
        this.renderer = new SuperMap.Renderer.Graphic(this.div,renderopation);
        // this.features = {};
        this.graphics = [];
        this.selectedGraphics = [];
        this.unrenderedGraphics = {};
    },

    /**
     * APIMethod: destroy
     * 销毁Grapchi图层，释放资源。
     */
    destroy: function() {
        this.destroyGraphics();
        this.graphics = null;
        this.selectedGraphics = null;
        this.unrenderedGraphics = null;
        if (this.renderer) {
            this.renderer.destroy();
        }
        this.renderer = null;
        this.drawn = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);  
    },

    
    /**
     * APIMethod: refresh
     * 让图层重新请求Graphics并重绘。
     *     Triggers the refresh event if the layer is in range and visible.
     *
     * Parameters:
     * obj - {Object} Optional object with properties for any listener of
     *     the refresh event.
     */
    refresh: function(obj) {
        if(this.calculateInRange() && this.visibility) {
            this.events.triggerEvent("refresh", obj);
        }
    },


    /** 
     * Method: setMap
     * 图层已经添加到Map控件中。
     * 
     * 如果没有设置renderer集合，这个图层将不可用，从map控件中删除，
     * 否则，给当前渲染器添加map的引用，并设置渲染器的大小。
     * 
     * Parameters:
     * map - {<SuperMap.Map>}需要与图层绑定的map。
     */
    setMap: function(map) {        
        SuperMap.Layer.prototype.setMap.apply(this, arguments);

        if (!this.renderer) {
            this.map.removeLayer(this);
        } else {
            this.renderer.map = this.map;

            var newSize = this.map.getSize();
            this.renderer.setSize(newSize);
        }
    },

    ///**
    // * Method: afterAdd
    // * Called at the end of the map.addLayer sequence.  At this point, the map
    // *     will have a base layer.  Any autoActivate strategies will be
    // *     activated here.
    // */
    //afterAdd: function() {
    //
    //},

    /**
     * Method: removeMap
     * The layer has been removed from the map.
     *
     * Parameters:
     * map - {<SuperMap.Map>}
     */
    removeMap: function() {
        this.drawn = false;
    },
    
    /**
     * Method: onMapResize
     * 通知渲染器的尺寸变化。
     */
    onMapResize: function() {
        SuperMap.Layer.prototype.onMapResize.apply(this, arguments);
        var newSize = this.map.getSize();
        this.renderer.setSize(newSize);
    },

    /**
     * Method: moveTo
     * 重置当前矢量图层的div，再一次与Map控件保持一致。
     * 通知渲染器视图范围的改变，在缩放级别改变时，重绘对象。
     *
     * 如果对象未绘制，则遍历对象，并绘制。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 
     * zoomChanged - {Boolean} 
     * dragging - {Boolean} 
     */
    moveTo: function(bounds, zoomChanged, dragging) {

        SuperMap.Layer.prototype.moveTo.apply(this, arguments);

        this.isFirstDraw = false;
        this.zoomChanged = zoomChanged;

        var coordSysUnchanged = true;

        if (!dragging) {
            this.renderer.root.style.visibility = "hidden";
            var
                //viewSize = this.map.getSize(),
                offsetLeft = 0,
                offsetTop = 0;
            offsetLeft += parseInt(this.map.layerContainerDiv.style.left, 10);
            offsetLeft = -Math.round(offsetLeft);
            offsetTop += parseInt(this.map.layerContainerDiv.style.top, 10);
            offsetTop = -Math.round(offsetTop);
            this.div.style.left = offsetLeft + 'px';
            this.div.style.top = offsetTop + 'px';
            var extent = this.map.getExtent();
            //在setExtent方法中设置了canvasRenderer的lastbounds。
            coordSysUnchanged = this.renderer.setExtent(extent, zoomChanged);

            this.renderer.root.style.visibility = "visible";

            // Force a reflow on gecko based browsers to prevent jump/flicker.
            // This seems to happen on only certain configurations; it was originally
            // noticed in FF 2.0 and Linux.
            if (SuperMap.IS_GECKO === true) {
                this.div.scrollLeft = this.div.scrollLeft;
            }

            //在canvas渲染的情况下永远进不来。
            if(!zoomChanged && coordSysUnchanged) {
                this.drawGraphics(bounds);
            }
        }

        if (!this.drawn || (zoomChanged || !coordSysUnchanged)) {
            this.drawn = true;
            if(!this.transition) {
                this.drawGraphics(bounds);
            }
            this.firstLoad = false;
        }
    },
    /**
     * Method: moveByPx
     * 重写父类方法。
     */
    moveByPx: function(dx, dy) {
        if(this.isFixed)
        {
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left, 10) + 'px';
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top, 10) + 'px';
        }
    },
    
    /**
     * Method: drawFeatures
     * 遍历所有features，并绘制，
     */
    drawGraphics: function(bounds) {
        var me = this,
             graphic,
            drawGraphics = me.graphics;
        me.renderer.locked = true;
        for(var i = 0, len = drawGraphics.length; i < len; i++) {
            if(i === (len - 1)){
                me.renderer.locked = false;
            }
            graphic = drawGraphics[i];
            me.drawGraphic(graphic, {isNewAdd: me.firstLoad || me.zoomChanged, opacity: this.opacity });
        }
    },
       
    /**
     * APIMethod: redraw
     * 重绘该图层，成功则返回true，否则返回false。
     *
     * Returns:
     * {Boolean} 重绘该图层。
     */
    redraw: function() {
        return SuperMap.Layer.prototype.redraw.apply(this, arguments);
    },
    
    /** 
     * APIMethod: display
     * 临时隐藏或者显示图层。通过对CSS控制产生即时效果，重新渲染失效。 一般用 setVisibility 方法来动态控制图层的显示和隐藏。
     * 
     * Parameters:
     * display - {Boolean}true代表不隐藏，false代表隐藏。
     * (start code)
     * graphicLayer.display(true/false);
     * (end)
     */
    display: function(display) {
        SuperMap.Layer.prototype.display.apply(this, arguments);
        // we need to set the display style of the root in case it is attached
        // to a foreign layer
        var currentDisplay = this.div.style.display;
        if(currentDisplay !== this.renderer.root.style.display) {
            this.renderer.root.style.display = currentDisplay;
        }
    },
    /**
     * APIMethod: setOpacity
     * 设置图层的不透明度,取值[0-1]之间。使用方法如：
     * 
     * (code)
     * var graphicLayer = new SuperMap.Layer.Graphic("Graphic Layer");
     * GraphicLayer.setOpacity(0.2);
     * (end)
     * 
     * Parameter:
     * opacity - {Float} 图层的透明度，取值范围：[0-1]。
     */
    setOpacity: function(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.renderer.root;
            SuperMap.Util.modifyDOMElement(element, null, null, null, 
                                                 null, null, null, opacity);
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },
    
    /**
     * APIMethod: addGraphics
     * 给这个图层添加Graphics。
     *
     * Parameters:
     * Graphics - {Array(<SuperMap.Graphic>)}需要添加的要素数组。
     */
    addGraphics: function(graphics) {
        var graphicsFailAdded = [];
        this.renderer.locked = true;

        for (var i=0, len=graphics.length; i<len; i++) {
            if (i === (len - 1)) {
                this.renderer.locked = false;
            }
            var graphic = graphics[i];

            this.graphics.push(graphic);
            var drawn = this.drawGraphic(graphic, {isNewAdd: true});

            //如果当前Graphic不可被绘制则加入到GraphicsFailAdded数组中。
            if(!drawn) {
                graphicsFailAdded.push(graphic);
            }
        }
        var succeed = graphicsFailAdded.length == 0 ? true : false;
        this.events.triggerEvent("graphicsadded", {graphics: graphicsFailAdded, succeed: succeed});
    },
    
    /**
     * Method: destroyGraphics
     * Erase and destroy graphics on the layer.
     *
     * Parameters:
     * graphics - {Array(<SuperMap.Graphic>)} An optional array of
     *     graphics to destroy.  If not supplied, all graphics on the layer
     *     will be destroyed.
     * options - {Object}
     */
    destroyGraphics: function(graphics, options) {
        var all = (graphics == undefined); // evaluates to true if
                                           // graphics is null
        if(all) {
            graphics = this.graphics;
        }
        if(graphics) {
            this.removeGraphics(graphics, options);
            for(var i=graphics.length-1; i>=0; i--) {
                graphics[i].destroy();
            }
        }
    },
    
    /**
     * APIMethod: removeGraphics
     * 从当前图层中删除Graphic。这个函数擦除所有传递进来的矢量要素。
     * 参数中的Graphics数组中的每一项，必须是已经添加到当前图层中的Graphic，
     * 如果无法确定Graphic数组，则可以调用removeAllGraphics来删除所有Graphic。
     * 如果要删除的Graphic数组中的元素特别多，推荐使用removeAllGraphics，
     * 删除所有Graphic后再重新添加。这样效率会更高。
     * 
     * Parameters:
     * Graphics - {Array(<SuperMap.Graphic.Vector>)} 要删除Graphic的数组。
     */
    removeGraphics: function(graphics) {
        if(!graphics || graphics.length === 0) {
            return;
        }
        if (graphics === this.graphics) {
            return this.removeAllGraphics();
        }
        if (!(SuperMap.Util.isArray(graphics))) {
            graphics = [graphics];
        }
        if (graphics === this.selectedGraphics) {
            graphics = graphics.slice();
        }
        var graphicsFailRemoved = [];
        
        for (var i = graphics.length - 1; i >= 0; i--) {
            var graphic = graphics[i];
            delete this.unrenderedGraphics[graphic.id];
            
            //如果我们传入的grapchic在graphics数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。           
            var findex = SuperMap.Util.indexOf(this.graphics, graphic);
            
            if(findex === -1) {
                graphicsFailRemoved.push(graphic);
                continue;
            }
            this.graphics.splice(findex, 1);
            if (SuperMap.Util.indexOf(this.selectedGraphics, graphic) !== -1){
                SuperMap.Util.removeItem(this.selectedGraphics, graphic);
            }
			//这里移除了graphic之后将它的layer也移除掉，避免内存泄露
            graphic.layer = null;
        }
        
        //先清除再重绘。
        this.renderer.clear();
        // this.redraw();
        var drawGraphics = [];
        for(var hex = 0, len = this.graphics.length; hex < len; hex++){
            graphic = this.graphics[hex];
            drawGraphics.push(graphic);
        }
        this.graphics = [];
        this.addGraphics(drawGraphics);
        
        var succeed = graphicsFailRemoved.length == 0 ? true : false;
        this.events.triggerEvent("graphicsremoved", {graphics: graphicsFailRemoved, succeed: succeed});
    },
    
    /** 
     * APIMethod: removeAllGraphics
     * 清除当前图层所有的矢量要素。
     */
    removeAllGraphics: function() {
        this.renderer.clear();
        this.graphics = [];
        this.unrenderedGraphics = {};
        this.selectedGraphics = [];
        this.events.triggerEvent("graphicsremoved", {graphics: [], succeed: true});
    },

    /**
     * APIMethod: drawGraphic
     * 在当前图层中绘制一个graphic。如果参数中的样式（style）被设置
     * 则使用。否则使用矢量要素的样式。如果未设置要素的样式，则使用图层上的样式。
     * 
     * 当要素的样式更改或者要素已经添加到图层上需要更新时使用该函数。
     *
     * Parameters: 
     * graphic - {<SuperMap.Graphic>}需要绘制的要素
     * style - {String | Object} 风格
     */
    drawGraphic: function(graphic) {
        // don't try to draw the graphic with the renderer if the layer is not
        // drawn itself
        if (!this.drawn) {
            return;
        }
        var drawn;
        drawn = this.renderer.drawGraphic(graphic);
        return drawn;
    },
    
    /**
     * Method: eraseGraphics
     * 擦除graphic的显示，但是不从列表中删除。
     *
     * Parameters:
     * graphics - {Array(<SuperMap.Graphic>)}
     */
    eraseGraphics: function(graphic) {
        this.renderer.eraseGraphics(graphic);
    },

    /**
     * Method: getGraphicFromEvent
     * 通过一个事件，从渲染器中获取一个对应的graphic，如果没有则返回null。
     *
     * Parameters:
     * evt - {Event} 
     *
     * Returns:
     * {<SuperMap.Graphic>} 一个通过事件选中的graphic。
     */
    getGraphicFromEvent: function(evt) {
       if(this.visibility == false)
        return null;

        if (!this.renderer) {
            throw new Error('getGraphicFromEvent called on layer with no ' +
                            'renderer. This usually means you destroyed a ' +
                            'layer, but not some handler which is associated ' +
                            'with it.');
        }
        var graphic = null;
        var graphicId = this.renderer.getGraphicIdFromEvent(evt);
        if (graphicId) {
            if (typeof graphicId === "string") {
                graphic = this.getGraphicById(graphicId);
            } else {
                graphic = graphicId;
            }
        }
        return graphic;
    },

    /**
     * Method: getGraphicBy
     * 在Vector的要素数组gra[hics里面遍历每一个graphic，当graphic[property]===value时，
     * 返回此graphic（并且只返回第一个）。
     *
     * Parameters:
     * property - {String}graphic的某个属性名称。
     * value - {String}property所对应的值。
     *
     * Returns:
     * {<SuperMap.Graphic.Vector>} 第一个匹配属性和值的矢量要素。
     */
    getGraphicBy: function(property, value) {
        //TBD - would it be more efficient to use a hash for this.graphics?
        var graphic = null;
        for(var id in this.graphics) {
            if(this.graphics[id][property] === value) {
                graphic = this.graphics[id];
                break;
            }
        }
        return graphic;
    },

    /**
     * APIMethod: getGraphicById
     * 通过给定一个id，返回对应的矢量要素。
     *
     * Parameters:
     * graphicId - {String}矢量要素的属性id。
     *
     * Returns:
     * {<SuperMap.Graphic>} 对应id的graphic，如果不存在则返回null。
     */
    getGraphicById: function(graphicId) {
        return this.getGraphicBy('id', graphicId);
    },


    
    /**
     * APIMethod: getGraphicsByAttribute
     * 通过给定一个属性的key值和value值，返回所有匹配的要素数组。
     *
     * Parameters:
     * attrName - {String}属性的key。
     * attrValue - {Mixed}属性对应的value值。
     *
     * Returns:
     * Array(<SuperMap.Graphic>) 一个匹配的graphic数组。
     */
    getGraphicsByAttribute: function(attrName, attrValue) {
        var graphic,
            foundgraphics = [];
        for(var id in this.graphics) {
            graphic = this.graphics[id];
            if(graphic && graphic.attributes) {
                if (graphic.attributes[attrName] === attrValue) {
                    foundgraphics.push(graphic);
                }
            }
        }
        return foundgraphics;
    },

    CLASS_NAME: "SuperMap.Layer.Graphics"
});
