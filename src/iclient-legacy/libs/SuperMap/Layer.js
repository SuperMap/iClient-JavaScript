/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Map.js
 * @requires SuperMap/Projection.js
 */

/**
 * Class: SuperMap.Layer
 * 图层类。
 */
SuperMap.Layer = SuperMap.Class({

    /**
     * APIProperty: id
     * {String}图层id，唯一标识图层，默认为null，在初始化时会动态创建唯一的值
     */
    id: null,

    /** 
     * APIProperty: name
     * {String}图层名称，默认为null。初始化图层时可以外部传参进行修改，
     * 可以通过图层管理器（LayerSwitcher）查看当前所有图层的名称。
     */
    name: null,

    /** 
     * APIProperty: div
     * {DOMElement}存放图层的界面元素div，默认为null。
     */
    div: null,

    /**
     * Property: opacity
     * {Float} 图层的透明度，取值范围为[0,1]。
     */
    opacity: null,

    /**
     * APIProperty: alwaysInRange
     * {Boolean} 当前地图显示的分辨率在图层的最大最小分辨率范围内，如果图层以非比例尺显示，此变量设置为true。
     */
    alwaysInRange: null,

    /**
     * Property: useAnimation
     * {Boolean} ]是否使用缩放动画。
     */
    useAnimation: true,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} 支持事件的类型，注册监听事件方法如下所示：
     * (code)
     * layer.events.register(type, obj, listener);
     * (end)
     *
     * 所有监听对象具备如下属性:
     * object - {Object} object引用。
     * element - {DOMElement} element引用。
     *
     * 支持事件类型:
     * loadstart - 当图层开始加载时触发事件。
     * loadend - 当图层结束加载时候触发事件。
     * loadcancel - 当图层取消加载时候触发事件。
     * visibilitychanged - 当图层可见性发生变化时触发事件。
     * move - 当图层移动时触发此事件(拖拽时每次鼠标移动触发此事件)。
     * moveend - 当图层移动结束时触发此事件。
     * added - 图层加载到map上触发此事件。 
     * removed - 图层从map上移除后触发此事件。
     * tileloaded - 每个瓦片下载完成所触发的事件，返回该瓦片对象。
     * (code)
	 * //需要将layer的bufferImgCount设置为0,并且将页面在服务端发布出来
	 * layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.china, {transparent: true, cacheEnabled: true, redirect: true}, {maxResolution:"auto",bufferImgCount:0});
     * layer.events.on({tileloaded: function(evt) {
     *     var ctx = evt.tile.getCanvasContext();
     *     if (ctx) {
     *         var imgd = ctx.getImageData(0, 0, evt.tile.size.w, evt.tile.size.h);
     *         imgd = modify(imgd);
     *         ctx.putImageData(imgd, 0, 0);
     *         evt.tile.drawImgData(ctx.canvas.toDataURL(),evt);
     *     }
     * }});
	 * function modify(imgPixels){
     *   for(var y = 0, h = imgPixels.height; y < h; y++){
     *       for(var x = 0, w = imgPixels.width; x < w; x++){
     *           var i = (y * 4) * w + x * 4;
     *           
     *           var gray = 0.299*imgPixels.data[i] + 0.587*imgPixels.data[i + 1] + 0.114*imgPixels.data[i + 2];
     *           imgPixels.data[i] = gray;
     *           imgPixels.data[i + 1] = gray;
     *           imgPixels.data[i + 2] = gray;
     *       }
     *   }
     *   return imgPixels;
     * }
     * (end)
     */
    EVENT_TYPES: ["loadstart", "loadend", "loadcancel", "visibilitychanged",
                  "move", "moveend", "added", "removed","tileloaded"],

    /**
     * Constant: RESOLUTION_PROPERTIES
     * {Array}  resolutions 计算使用的属性数组，这些属性包括：scales、resolutions、maxScale、minScale
     * maxResolution、minResolution、numZoomLevels、maxZoomLevel。
     */
    RESOLUTION_PROPERTIES: [
        'scales', 'resolutions',
        'maxScale', 'minScale',
        'maxResolution', 'minResolution',
        'numZoomLevels', 'maxZoomLevel'
    ],

    /**
     * APIProperty: events
     * {<SuperMap.Events>}
     */
    events: null,

    /**
     * APIProperty: map
     * {<SuperMap.Map>} 图层所关联的地图，默认为null。当图层添加到地图上时设置此变量。
     */
    map: null,
    
    /**
     * APIProperty: isBaseLayer
     * {Boolean} 当前图层是否为基础层，默认为false。需在子类中单独设置此属性。
     *
     */
    isBaseLayer: false,
 
    /**
     * Property: alpha
     * {Boolean} The layer's images have an alpha channel.  Default is false. 
     */
    alpha: false,

    /** 
     * APIProperty: displayInLayerSwitcher
     * {Boolean} 是否在图层管理器（LayerSwitcher）中显示图层名字，默认为 true。
     */
    displayInLayerSwitcher: true,

    /**
     * APIProperty: visibility
     * {Boolean} 图层是否可见，默认为 true。
     */
    visibility: true,

    /** 
     * Property: inRange
     * {Boolean} The current map resolution is within the layer's min/max 
     *     range. This is set in <SuperMap.Map.setCenter> whenever the zoom 
     *     changes.
     */
    inRange: false,
    
    /**
     * Propery: imageSize
     * {<SuperMap.Size>} For layers with a gutter, the image is larger than 
     *     the tile by twice the gutter in each dimension.
     */
    imageSize: null,
    
    /**
     * Property: imageOffset
     * {<SuperMap.Pixel>} For layers with a gutter, the image offset 
     *     represents displacement due to the gutter.
     */
    imageOffset: null,

  // OPTIONS

    /** 
     * Property: options
     * {Object} An optional object whose properties will be set on the layer.
     *     Any of the layer properties can be set as a property of the options
     *     object and sent to the constructor when the layer is created.
     */
    options: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数。通过 SuperMap.Events.on 注册。
     */
    eventListeners: null,

    /**
     * APIProperty: gutter
     * {Integer} 瓦片间的交接间距（像素），默认为0。
     */ 
    gutter: 0, 

    /**
     * APIProperty: projection
     * {<SuperMap.Projection>} or {String} 地图投影，默认为null。创建图层时，
     * 在图层的 options 上可以设置当前图层默认的投影字符串，如“EPSG：4326”
     * 还需要设置 maxExtent、maxResolution、units 。
     */
    projection: null,    
    
    /**
     * APIProperty: units
     * {String} 地图单位，可以为 'degrees' (or 'dd'), 'm', 'ft', 'km', 'mi', 'inches',默认为 'degrees'。
     */
    units: null,

    /**
     * APIProperty: scales
     * {Array} 降序排列的比例尺数组，默认为null。一般会通过resolutions来自动计算，
     * 也可以在图层初始化的时候设置。
     */
    scales: null,

    /**
     * APIProperty: resolutions
     * {Array} 降序排列的地图分辨率列表。如果在创建layer时没有设置resolutions，则需要计算，
     * 此时需设置resolution计算相关的属性(maxExtent,maxResolution, maxScale等)。
     */
    resolutions: null,
    
    /**
     * APIProperty: maxExtent
     * {<SuperMap.Bounds>} 在图层实例化的时候设置图层的最大范围，平移过程中边界中心点不会偏离可视窗口。
     * 不同的投影下范围不同，如world在“EPSG：4326”下一般为左下： ( -180.0 , -90.0 )，右上： ( 180.0 , 90.0 )
     * 而在“EPSG：3857”下为左下： ( -20037508.34 , -25776731.36 )，右上： ( 20037508.34 , 25776731.36 )
     */
    maxExtent: null,
    
    /**
     * APIProperty: minExtent
     * {<SuperMap.Bounds>}在图层实例化的时候设置图层最小范围。
     */
    minExtent: null,
    
    /**
     * APIProperty: maxResolution
     * {Float} 在图层实例化的时候设置图层最大的分辨率，默认最大的是360度/256像素（投影为4326），相当于缩放级别为0级。
     * 不同的投影下maxResolution会不同，内部会进行计算。
     */
    maxResolution: null,

    /**
     * APIProperty: minResolution
     * {Float}在图层实例化的时候设置图层最小分辨率，默认最小的是360度/（256*16）像素（投影为4326），相当于缩放级别为16级。
     * 不同的投影下minResolution会不同，内部会进行计算。
     */
    minResolution: null,

    /**
     * APIProperty: numZoomLevels
     * {Integer}在图层实例化的时候设置缩放级别，一般为16。
     */
    numZoomLevels: null,
    
    /**
     * APIProperty: minScale
     * {Float}在图层实例化的时候设置最小比例尺，在不同的投影下根据minResolution计算
     */
    minScale: null,
    
    /**
     * APIProperty: maxScale
     * {Float}在图层实例化的时候设置最大比例尺，在不同的投影下根据maxResolution计算
     */
    maxScale: null,

    /**
     * APIProperty: displayOutsideMaxExtent
     * {Boolean} 判断请求地图瓦片是否完全超出了当前图层的最大范围，
     *     默认为false。
     */
    displayOutsideMaxExtent: false,

    /**
     * APIProperty: wrapDateLine
     * {Boolean}  在底图图层的最大范围等于世界范围情况时，当底图图层平移到日期变更线外边后是否仍然继续循环显示。当为false时不显示，默认为false
     */
    wrapDateLine: false,

    /**
     * Property: metadata
     * {Object} This object can be used to store additional information on a
     *     layer object.
     */
    metadata: {},
    
    /**
     * Constructor: SuperMap.Layer
     *
     * Parameters:
     * name - {String} 图层的名字。
     * options - {Object} 该类开放的属性。
     */
    initialize: function(name, options) {

        this.addOptions(options);

        this.name = name;
        
        if (this.id == null) {

            this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_");

            this.div = SuperMap.Util.createDiv(this.id);
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.div.dir = "ltr";

            this.events = new SuperMap.Events(this, this.div, 
                                                this.EVENT_TYPES);
            if(this.eventListeners instanceof Object) {
                this.events.on(this.eventListeners);
            }

        }

        if (this.wrapDateLine) {
            this.displayOutsideMaxExtent = true;
        }
    },
    
    /**
     * Method: destroy
     * Destroy is a destructor: this is to alleviate cyclic references which
     *     the Javascript garbage cleaner can not take care of on its own.
     *
     * Parameters:
     * setNewBaseLayer - {Boolean} Set a new base layer when this layer has
     *     been destroyed.  Default is true.
     */
    destroy: function(setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.map != null) {
            this.map.removeLayer(this, setNewBaseLayer);
        }
        this.projection = null;
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;

        if (this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.eventListeners = null;
        this.events = null;
    },

    /**
     * Method: clean
     * 清除掉比例尺及分辨率，以便重新计算
     * */
    clean:function(){
        this.resolutions=null;
        this.scales=null;
    },
    
   /**
    * Method: clone
    *
    * Parameters:
    * obj - {<SuperMap.Layer>} The layer to be cloned
    *
    * Returns:
    * {<SuperMap.Layer>} An exact clone of this <SuperMap.Layer>
    */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new SuperMap.Layer(this.name, this.getOptions());
        }
        
        // catch any randomly tagged-on properties
        SuperMap.Util.applyDefaults(obj, this);
        
        // a cloned layer should never have its map property set
        //  because it has not been added to a map yet. 
        obj.map = null;
        
        return obj;
    },
    
    /**
     * Method: getOptions
     * Extracts an object from the layer with the properties that were set as
     *     options, but updates them with the values currently set on the
     *     instance.
     * 
     * Returns:
     * {Object} the options of the layer, representing the current state.
     */
    getOptions: function() {
        var options = {};
        for(var o in this.options) {
            options[o] = this[o];
        }
        return options;
    },
    
    /** 
     * APIMethod: setName
     * 将新的名字赋给当前图层，可以触发地图上的 changelayer 事件。
     *
     * Parameters:
     * newName - {String} 新的图层名字.
     */
    setName: function(newName) {
        if (newName !== this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "name"
                });
            }
        }
    },    
    
   /**
    * APIMethod: addOptions
    * 通过新的Options覆盖以前的Options参数。
    * Parameters:
    * newOptions - {Object}新的Options参数。
    * reinitialize - {Boolean} 如果设为 true,并且当前的 baseLayer 的 resolution 发生变化，
    * 则 map 需要重新定位有效的 resolution ，并且触发 changebaselayer 事件。
    */
    addOptions: function (newOptions, reinitialize) {

        if (this.options == null) {
            this.options = {};
        }

       if (newOptions) {
           // make sure this.projection references a projection object
           if(typeof newOptions.projection === "string") {
               newOptions.projection = new SuperMap.Projection(newOptions.projection);
           }
           if (newOptions.projection) {
               // get maxResolution, units and maxExtent from projection defaults if
               // they are not defined already
               SuperMap.Util.applyDefaults(newOptions,
                   SuperMap.Projection.defaults[newOptions.projection.getCode()]);
           }
           // allow array for extents
           if (newOptions.maxExtent && !(newOptions.maxExtent instanceof SuperMap.Bounds)) {
               newOptions.maxExtent = new SuperMap.Bounds(newOptions.maxExtent);
           }
           if (newOptions.minExtent && !(newOptions.minExtent instanceof SuperMap.Bounds)) {
               newOptions.minExtent = new SuperMap.Bounds(newOptions.minExtent);
           }
       }

        // update our copy for clone
        SuperMap.Util.extend(this.options, newOptions);

        // add new options to this
        SuperMap.Util.extend(this, newOptions);

        // get the units from the projection, if we have a projection
        // and it it has units
        if(this.projection && this.projection.getUnits()) {
            this.units = this.projection.getUnits();
        }

        // re-initialize resolutions if necessary, i.e. if any of the
        // properties of the "properties" array defined below is set
        // in the new options
        if(this.map) {
            // store current resolution so we can try to restore it later
            var resolution = this.map.getResolution();
            var properties = this.RESOLUTION_PROPERTIES.concat(
                ["projection", "units", "minExtent", "maxExtent"]
            );
            for(var o in newOptions) {
                if(newOptions.hasOwnProperty(o) &&
                   SuperMap.Util.indexOf(properties, o) >= 0) {

                    this.initResolutions();
                    if (reinitialize && this.map.baseLayer === this) {
                        // update map position, and restore previous resolution
                        this.map.setCenter(this.map.getCenter(),
                            this.map.getZoomForResolution(resolution),
                            false, true
                        );
                        // trigger a changebaselayer event to make sure that
                        // all controls (especially
                        // SuperMap.Control.PanZoomBar) get notified of the
                        // new options
                        this.map.events.triggerEvent("changebaselayer", {
                            layer: this
                        });
                    }
                    break;
                }
            }
        }
    },

    /**
     * APIMethod: onMapResize
     * 此函数在子类中复写实现。
     */
    onMapResize: function() {
        //this function can be implemented by subclasses  
    },

    /**
     * APIMethod: redraw
     * 重新绘制图层，对于图片图层，该方法销毁掉该图层的div以及地图图片，然后重新组织div，重新请求地图图片。如果图层被重绘返回true，否则返回false。在子图层控制时，修改图层信息后，调用该方法重新绘制图层显示改变后的效果。该方法不适用于覆盖物图层，例如SuperMap.Layer.Markers。
     *
     * Returns:
     * {Boolean} 图层是否被重绘。
     */
    redraw: function() {
        var redrawn = false;
        if (this.map) {

            // min/max Range may have changed
            this.inRange = this.calculateInRange();

            // map's center might not yet be set
            var extent = this.getExtent();

            if (extent && this.inRange && this.visibility) {
                var zoomChanged = true;
                this.moveTo(extent, zoomChanged, false);
                this.events.triggerEvent("moveend",
                    {"zoomChanged": zoomChanged});
                redrawn = true;
            }
        }
        return redrawn;
    },

    /**
     * Method: moveTo
     * 
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean} Tells when zoom has changed, as layers have to
     *     do some init work in that case.
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        var display = this.visibility;
        if (!this.isBaseLayer) {
            display = display && this.inRange;
        }
        this.display(display);
    },

    /**
     * Method: moveByPx
     * Move the layer based on pixel vector. To be implemented by subclasses.
     *
     * Parameters:
     * dx - {Number} The x coord of the displacement vector.
     * dy - {Number} The y coord of the displacement vector.
     */
    moveByPx: function(dx, dy) {
    },

    /**
     * Method: setMap
     * Set the map property for the layer. This is done through an accessor
     *     so that subclasses can override this and take special action once 
     *     they have their map variable set. 
     * 
     *     Here we take care to bring over any of the necessary default 
     *     properties from the map. 
     * 
     * Parameters:
     * map - {<SuperMap.Map>}
     */
    setMap: function(map) {
        if (this.map == null) {
        
            this.map = map;
            
            // grab some essential layer data from the map if it hasn't already
            //  been set
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.minExtent = this.minExtent || this.map.minExtent;

            this.projection = this.projection || this.map.projection;
            if (typeof this.projection === "string") {
                this.projection = new SuperMap.Projection(this.projection);
            }

            // Check the projection to see if we can get units -- if not, refer
            // to properties.
            if(!this.units)this.units = this.projection.getUnits() || this.map.units;
            //初始化分辨率，基类CanvasLayer重写了此方法
            this.initResolutions();
            
            if (!this.isBaseLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visibility) && (this.inRange));
                this.div.style.display = show ? "" : "none";
            }
            
            // deal with gutters
            //计算瓦片的size，在子类中重写
            this.setTileSize();
        }
    },
    
    /**
     * Method: afterAdd
     * Called at the end of the map.addLayer sequence.  At this point, the map
     *     will have a base layer.  To be overridden by subclasses.
     */
    afterAdd: function() {
    },
    
    /**
     * APIMethod: removeMap
     * 从地图中移除图层。
     * 
     * Parameters:
     * map - {<SuperMap.Map>}图层所在的地图。
     */
    removeMap: function(map) {
        //to be overridden by subclasses
    },
    
    /**
     * APIMethod: getImageSize
     * 获取瓦片的大小。
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 瓦片的边界选项。可以被子类用来处理图层上不同瓦片的边缘范围（例如：Zoomify）。
     * 
     * Returns:
     * {<SuperMap.Size>} 图像的大小。
     */ 
    getImageSize: function(bounds) { 
        return (this.imageSize || this.tileSize); 
    },    
  
    /**
     * APIMethod: setTileSize
     * 设置瓦片的大小。
     * 
     * Parameters:
     * size - {<SuperMap.Size>}瓦片的大小。
     */
    setTileSize: function(size) {
        var tileSize = (size) ? size :
                                ((this.tileSize) ? this.tileSize :
                                                   this.map.getTileSize());
        this.tileSize = tileSize;
        if(this.gutter) {
            this.imageOffset = new SuperMap.Pixel(-this.gutter, 
                                                    -this.gutter); 
            this.imageSize = new SuperMap.Size(tileSize.w + (2*this.gutter), 
                                                 tileSize.h + (2*this.gutter)); 
        }
    },

    /**
     * APIMethod: getVisibility
     * 获取当前图层可见性。
     * Returns:
     * {Boolean} 是否可见（当前地图的resolution在最大最小resolution之间）。
     */
    getVisibility: function() {
        return this.visibility;
    },

    /** 
     * APIMethod: setVisibility
     * 设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
     * 
     * Parameters:
     * visibility - {Boolean} 是否显示图层（当前地图的resolution在最大最小resolution之间）。 
     */
    setVisibility: function(visibility) {
        if (visibility !== this.visibility) {
            this.visibility = visibility;
            if(visibility) {
                this.useAnimation = false;
            }
            this.display(visibility);
            this.redraw();
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "visibility"
                });
            }
            this.events.triggerEvent("visibilitychanged");
            this.useAnimation = true;
        }
    },

    /** 
     * APIMethod: display
     * 临时隐藏或者显示图层。通过对CSS控制产生即时效果，重新渲染失效。
     * 一般用 setVisibility 方法来动态控制图层的显示和隐藏。
     * 
     * Parameters:
     * display - {Boolean}
     */
    display: function(display) {
        if (display !== (this.div.style.display !== "none")) {
            this.div.style.display = (display && this.calculateInRange()) ? "block" : "none";
        }
    },

    /**
     * APIMethod: calculateInRange
     * 计算当前地图显示的分辨率是否在图层的最大最小分辨率范围内
     * Returns:
     * {Boolean} 图层以当前地图分辨率显示，如果'alwaysInRange' 设置为true，则此函数返回true。
     */
    calculateInRange: function() {
        var inRange = false;
        //允许分辨率误差数
        var RELATIVEERROR=0.00000000000001;
        if (this.alwaysInRange) {
            inRange = true;
        } else {
            if (this.map) {
                var resolution = this.map.getResolution();
                //ICL748、749：当前分辨率在最大最小分辨率范围内（在允许误差内,精度：0.00000000000001）时，inRange为true，否则为false
                inRange = ( (resolution-this.minResolution>=-RELATIVEERROR) &&
                            (resolution-this.maxResolution<=RELATIVEERROR) );
            }
        }
        return inRange;
    },

    /** 
     * APIMethod: setIsBaseLayer
     * 设置当前图层性质（底图或普通图层），一旦图层性质改变会触发changebaselayer事件。
     * Parameters:
     * isBaseLayer - {Boolean}
     */
    setIsBaseLayer: function(isBaseLayer) {
        if (isBaseLayer !== this.isBaseLayer) {
            this.isBaseLayer = isBaseLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changebaselayer", {
                    layer: this
                });
            }
        }
    },

  /********************************************************/
  /*                                                      */
  /*                 Baselayer Functions                  */
  /*                                                      */
  /********************************************************/
  
    /** 
     * Method: initResolutions
     * This method's responsibility is to set up the 'resolutions' array 
     *     for the layer -- this array is what the layer will use to interface
     *     between the zoom levels of the map and the resolution display 
     *     of the layer.
     * 
     * The user has several options that determine how the array is set up.
     *  
     * For a detailed explanation, see the following wiki from the 
     *     SuperMap.org homepage:
     *     http://trac.SuperMap.org/wiki/SettingZoomLevels
     */
    initResolutions: function() {

        // ok we want resolutions, here's our strategy:
        //
        // 1. if resolutions are defined in the layer config, use them
        // 2. else, if scales are defined in the layer config then derive
        //    resolutions from these scales
        // 3. else, attempt to calculate resolutions from maxResolution,
        //    minResolution, numZoomLevels, maxZoomLevel set in the
        //    layer config
        // 4. if we still don't have resolutions, and if resolutions
        //    are defined in the same, use them
        // 5. else, if scales are defined in the map then derive
        //    resolutions from these scales
        // 6. else, attempt to calculate resolutions from maxResolution,
        //    minResolution, numZoomLevels, maxZoomLevel set in the
        //    map
        // 7. hope for the best!

        var i, len, p;
        var props = {}, alwaysInRange = true;

        // get resolution data from layer config
        // (we also set alwaysInRange in the layer as appropriate)
        for(i=0, len=this.RESOLUTION_PROPERTIES.length; i<len; i++) {
            p = this.RESOLUTION_PROPERTIES[i];
            props[p] = this.options[p];
            if(alwaysInRange && this.options[p]) {
                alwaysInRange = false;
            }
        }
        if(this.alwaysInRange == null) {
            this.alwaysInRange = alwaysInRange;
        }

        // if we don't have resolutions then attempt to derive them from scales
        if(props.resolutions == null) {
            props.resolutions = this.resolutionsFromScales(props.scales);
        }

        // if we still don't have resolutions then attempt to calculate them
        if(props.resolutions == null) {
            props.resolutions = this.calculateResolutions(props);
        }

        // if we couldn't calculate resolutions then we look at we have
        // in the map
        if(props.resolutions == null) {
            for(i=0, len=this.RESOLUTION_PROPERTIES.length; i<len; i++) {
                p = this.RESOLUTION_PROPERTIES[i];
                props[p] = this.options[p] != null ?
                    this.options[p] : this.map[p];
            }
            if(props.resolutions == null) {
                props.resolutions = this.resolutionsFromScales(props.scales);
            }
            if(props.resolutions == null) {
                props.resolutions = this.calculateResolutions(props);
            }
        }

        // ok, we new need to set properties in the instance

        // get maxResolution from the config if it's defined there
        var maxResolution;
        if(this.options.maxResolution &&
           this.options.maxResolution !== "auto") {
            maxResolution = this.options.maxResolution;
        }
        if(this.options.minScale) {
            maxResolution = SuperMap.Util.getResolutionFromScale(
                this.options.minScale, this.units);
        }

        // get minResolution from the config if it's defined there
        var minResolution;
        if(this.options.minResolution &&
           this.options.minResolution !== "auto") {
            minResolution = this.options.minResolution;
        }
        if(this.options.maxScale) {
            minResolution = SuperMap.Util.getResolutionFromScale(
                this.options.maxScale, this.units);
        }

        if(props.resolutions) {

            //sort resolutions array descendingly
            props.resolutions.sort(function(a, b) {
                return (b - a);
            });

            // if we still don't have a maxResolution get it from the
            // resolutions array
            if(!maxResolution) {
                maxResolution = props.resolutions[0];
            }

            // if we still don't have a minResolution get it from the
            // resolutions array
            if(!minResolution) {
                var lastIdx = props.resolutions.length - 1;
                minResolution = props.resolutions[lastIdx];
            }
        }

        this.resolutions = props.resolutions;
        if(this.resolutions) {
            len = this.resolutions.length;
            this.scales = new Array(len);
            for(i=0; i<len; i++) {
                this.scales[i] = SuperMap.Util.getScaleFromResolution(
                    this.resolutions[i], this.units);
            }
            this.numZoomLevels = len;
        }
        this.minResolution = minResolution;
        if(minResolution) {
            this.maxScale = SuperMap.Util.getScaleFromResolution(
                minResolution, this.units);
        }
        this.maxResolution = maxResolution;
        if(maxResolution) {
            this.minScale = SuperMap.Util.getScaleFromResolution(
                maxResolution, this.units);
        }
    },

    /**
     * Method: resolutionsFromScales
     * Derive resolutions from scales.
     *
     * Parameters:
     * scales - {Array(Number)} Scales
     *
     * Returns
     * {Array(Number)} Resolutions
     */
    resolutionsFromScales: function(scales) {
        if(scales == null) {
            return;
        }
        var resolutions, i, len;
        len = scales.length;
        resolutions = new Array(len);
        for(i=0; i<len; i++) {
            resolutions[i] = SuperMap.Util.getResolutionFromScale(
                scales[i], this.units);
        }
        return resolutions;
    },

    /**
     * Method: calculateResolutions
     * Calculate resolutions based on the provided properties.
     *
     * Parameters:
     * props - {Object} Properties
     *
     * Return:
     * {Array({Number})} Array of resolutions.
     */
    calculateResolutions: function(props) {

        var viewSize, wRes, hRes;

        // determine maxResolution
        var maxResolution = props.maxResolution;
        if(props.minScale != null) {
            maxResolution =
                SuperMap.Util.getResolutionFromScale(props.minScale,
                                                       this.units);
        } else if(maxResolution === "auto" && this.maxExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.maxExtent.getWidth() / viewSize.w;
            hRes = this.maxExtent.getHeight() / viewSize.h;
            maxResolution = Math.max(wRes, hRes);
        }

        // determine minResolution
        var minResolution = props.minResolution;
        if(props.maxScale != null) {
            minResolution =
                SuperMap.Util.getResolutionFromScale(props.maxScale,
                                                       this.units);
        } else if(props.minResolution === "auto" && this.minExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.minExtent.getWidth() / viewSize.w;
            hRes = this.minExtent.getHeight()/ viewSize.h;
            minResolution = Math.max(wRes, hRes);
        }

        if(typeof maxResolution !== "number" &&
            typeof minResolution !== "number" &&
            this.maxExtent != null) {
            // maxResolution for default grid sets assumes that at zoom
            // level zero, the whole world fits on one tile.
            var tileSize = this.map.getTileSize();
            maxResolution = Math.max(
                this.maxExtent.getWidth() / tileSize.w,
                this.maxExtent.getHeight() / tileSize.h
            );
        }

        // determine numZoomLevels
        var maxZoomLevel = props.maxZoomLevel;
        var numZoomLevels = props.numZoomLevels;
        if(typeof minResolution === "number" &&
           typeof maxResolution === "number" && numZoomLevels === undefined) {
            var ratio = maxResolution / minResolution;
            numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
        } else if(numZoomLevels === undefined && maxZoomLevel != null) {
            numZoomLevels = maxZoomLevel + 1;
        }

        // are we able to calculate resolutions?
        if(typeof numZoomLevels !== "number" || numZoomLevels <= 0 ||
           (typeof maxResolution !== "number" &&
                typeof minResolution !== "number")) {
            return;
        }

        // now we have numZoomLevels and at least one of maxResolution
        // or minResolution, we can populate the resolutions array

        var resolutions = new Array(numZoomLevels);
        var base = 2;
        if(typeof minResolution === "number" &&
           typeof maxResolution === "number") {
            // if maxResolution and minResolution are set, we calculate
            // the base for exponential scaling that starts at
            // maxResolution and ends at minResolution in numZoomLevels
            // steps.
            base = Math.pow(
                    (maxResolution / minResolution),
                (1 / (numZoomLevels - 1))
            );
        }

        var i;
        if(typeof maxResolution === "number") {
            for(i=0; i<numZoomLevels; i++) {
                resolutions[i] = maxResolution / Math.pow(base, i);
            }
        } else {
            for(i=0; i<numZoomLevels; i++) {
                resolutions[numZoomLevels - 1 - i] =
                    minResolution * Math.pow(base, i);
            }
        }

        return resolutions;
    },

    /**
     * APIMethod: getResolution
     * 获得当前图层分辨率。
     * 
     * Returns:
     * {Float} 图层分辨率，从resolution数组中根据当前地图的缩放等级获得。
     */
    getResolution: function() {
        var zoom = this.map.getZoom();
        return this.getResolutionForZoom(zoom);
    },

    /** 
     * APIMethod: getExtent
     * 获得边界范围。
     *
     * Returns:
     * {<SuperMap.Bounds>} 当前视图窗口边界。
     */
    getExtent: function() {
        // just use stock map calculateBounds function -- passing no arguments
        //  means it will user map's current center & resolution
        //
        return this.map.calculateBounds();
    },

    /**
     * APIMethod: getZoomForExtent
     *  获得当前的缩放级别。
     * Parameters:
     * extent - {<SuperMap.Bounds>}
     * closest - {Boolean} 查找最接近指定范围边界的缩放级别。
     *     默认为false.
     *
     * Returns:
     * {Integer} 传入的exent对应的缩放级别的索引。首先调用getSize函数获取当前地图的size，
     * 然后利用此size和传入的exent计算理想的分辨率（idealResolution），
     * 最后根据idealResolution和传入的closest参数调用getZoomForResolution函数获得当前的缩放级别。
     */
    getZoomForExtent: function(extent, closest) {
        var viewSize = this.map.getSize();
        var idealResolution;
        if(this.map && this.map.restrictedExtent){
            //在设置map的restrictedExtent属性时，将本来的Math.max(）改为Math.min(）方法，更符合实际情况。
            idealResolution = Math.min( extent.getWidth()  / viewSize.w,
                extent.getHeight() / viewSize.h );
        }
        else{
            idealResolution = Math.max( extent.getWidth()  / viewSize.w,
                extent.getHeight() / viewSize.h );
        }

        return this.getZoomForResolution(idealResolution, closest);
    },
    
    /** 
     * Method: getDataExtent
     * Calculates the max extent which includes all of the data for the layer.
     *     This function is to be implemented by subclasses.
     * 
     * Returns:
     * {<SuperMap.Bounds>}
     */
    getDataExtent: function () {
        //to be implemented by subclasses
    },

    /**
     * APIMethod: getResolutionForZoom
     * 根据指定的缩放级别返回对应的分辨率。
     * Parameter:
     * zoom - {Float}缩放级别，范围一般在[0,16]内。
     * 
     * Returns:
     * {Float} 返回一个指定缩放级别对应的resolution。
     */
    getResolutionForZoom: function(zoom) {
        zoom = Math.max(0, Math.min(zoom, this.resolutions.length - 1));
        var resolution;
        if(this.map.fractionalZoom) {
            var low = Math.floor(zoom);
            var high = Math.ceil(zoom);
            resolution = this.resolutions[low] -
                ((zoom-low) * (this.resolutions[low]-this.resolutions[high]));
        } else {
            resolution = this.resolutions[Math.round(zoom)];
        }
        return resolution;
    },
    /**
     * APIMethod: getScaleForZoom
     * 通过指定的缩放级别返回对应的比例尺。
     * Parameter:
     * zoom - {Float}缩放级别，范围一般在[0,16]内。
     *
     * Returns:
     * {Float} 返回一个指定缩放级别对应的Scale。
     */
    getScaleForZoom: function(zoom) {
        var r,s,u;

        r = this.getResolutionForZoom(zoom);
        u = this.units;
        if(this.dpi){
            s = SuperMap.Util.getScaleFromResolutionDpi(r, this.dpi, u, this.datumAxis);
        }else{
            s = SuperMap.Util.getScaleFromResolution(r, u);
        }

        return s;
    },

    /**
     * APIMethod: getZoomForResolution
     * 根据指定的分辨率返回对应的缩放级别。
     * Parameters:
     * resolution - {Float} 分辨率大小。
     * closest - {Boolean} 查找当前显示的分辨率对应的缩放级别，默认为false。
     * 
     * Returns:
     * {Integer} 返回缩放级别的下标。
     */
    getZoomForResolution: function(resolution, closest) {
        //修改切换底图时级别zoom问题
        if(!resolution){
            return 0;
        }
        var zoom, i, len;
        if(this.map.fractionalZoom) {
            var lowZoom = 0;
            var highZoom = this.resolutions.length - 1;
            var highRes = this.resolutions[lowZoom];
            var lowRes = this.resolutions[highZoom];
            var res;
            for(i=0, len=this.resolutions.length; i<len; ++i) {
                res = this.resolutions[i];
                if(res >= resolution) {
                    highRes = res;
                    lowZoom = i;
                }
                if(res <= resolution) {
                    lowRes = res;
                    highZoom = i;
                    break;
                }
            }
            var dRes = highRes - lowRes;
            if(dRes > 0) {
                zoom = lowZoom + ((highRes - resolution) / dRes);
            } else {
                zoom = lowZoom;
            }
        } else {
            var diff;
            var minDiff = Number.POSITIVE_INFINITY;
            for(i=0, len=this.resolutions.length; i<len; i++) {            
                if (closest) {
                    diff = Math.abs(this.resolutions[i] - resolution);
                    if (diff > minDiff) {
                        break;
                    }
                    minDiff = diff;
                } else {
                    if (this.resolutions[i] < resolution) {
                        break;
                    }
                }
            }
            zoom = Math.max(0, i-1);
        }
        return zoom;
    },
    
    /**
     * APIMethod: getLonLatFromViewPortPx
     * 根据指定的像素点位置返回经纬度坐标。
     * Parameters:
     * viewPortPx - {<SuperMap.Pixel>}传入的像素点。
     *
     * Returns:
     * {<SuperMap.LonLat>} 返回经纬度，此经纬度是由传入类型为 <SuperMap.Pixel>的参数viewPortPx计算得到。
     */
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        var map = this.map;
        if (viewPortPx != null && map.minPx) {
            var res = map.getResolution();
            //这里计算地理点，需要使用地图的最大bounds，不能一点map设置了显示bounds，则有错误，解决ICL-682
            //var maxExtent = map.getMaxExtent({restricted: true});
            var maxExtent = map.getMaxExtent();
            var lon = (viewPortPx.x - map.minPx.x) * res + maxExtent.left;
            var lat = (map.minPx.y - viewPortPx.y) * res + maxExtent.top;
            lonlat = new SuperMap.LonLat(lon, lat);

            if (this.wrapDateLine) {
                lonlat = lonlat.wrapDateLine(this.maxExtent);
            }
        }
        return lonlat;
    },

    /**
     * APIMethod: getViewPortPxFromLonLat
     *
     * 根据指定的纬度坐标返回像素点位置。
     * Parameters:
     * lonlat - {<SuperMap.LonLat>}经纬度。
     *
     * Returns: 
     * {<SuperMap.Pixel>} 通过与传入的<SuperMap.LonLat>类型的LonLat参数计算像素点在当前视图窗口的位置。
     * 
     */
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null; 
        if (lonlat != null) {
            var resolution = this.map.getResolution();
            var extent = this.map.getExtent();
            px = new SuperMap.Pixel(
                (1/resolution * (lonlat.lon - extent.left)),
                (1/resolution * (extent.top - lonlat.lat))
            );    
        }
        return px;
    },
    
    /**
     * APIMethod: setOpacity
     * 设置图层的不透明度,取值[0-1]之间。使用方法如：
     * 
     * (code)
     * var map = new SuperMap.Map("map");
     * var url = "http://localhost:8090/iserver/services/map-jingjin/rest/maps
     *     /京津地区人口分布图_专题图";
     * var layerJinjing = new SuperMap.Layer.TiledDynamicRESTLayer("World", 
     *     url, {transparent: true, cacheEnabled: true});
     * layerJinjing.events.on({"layerInitialized": addLayer1});     
     * layerJinjing.setOpacity(0.2);
     *     
     * function addLayer1(){
     *     map.addLayer(layerJinjing);
     *     map.setCenter(new SuperMap.LonLat(0, 0),3);
     * }
     * (end)
     * 
     * Parameter:
     * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
     */
    setOpacity: function(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            //区分canvas图层和普通瓦片img图层对待
            if(this.useCanvas){
                this.redraw();
            }else{
                for(var i=0, len=this.div.childNodes.length; i<len; ++i) {
                    var element = this.div.childNodes[i].firstChild || this.div.childNodes[i] ;  // 添加 || this.div.childNodes[i] 考虑 this.div.childNodes[i].firstChild 不存在情况
                    //var element;
                    ////online vector图层 设置透明度无效  将svg标签透明度改到<g>标签上
                    //if(this.renderer.CLASS_NAME === "SuperMap.Renderer.SVG" ){
                    //     element = this.div.childNodes[i].childNodes[0];
                    //}else{
                    //     element = this.div.childNodes[i].firstChild || this.div.childNodes[i] ;  // 添加 || this.div.childNodes[i] 考虑 this.div.childNodes[i].firstChild 不存在情况
                    //}

                    SuperMap.Util.modifyDOMElement(element, null, null, null, 
                                                 null, null, null, opacity);
                }
            }
            
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },

    /**
     * Method: getZIndex
     * 
     * Returns: 
     * {Integer} the z-index of this layer
     */    
    getZIndex: function () {
        return this.div.style.zIndex;
    },

    /**
     * Method: setZIndex
     * 
     * Parameters: 
     * zIndex - {Integer}
     */    
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },

    /**
     * Method: adjustBounds
     * This function will take a bounds, and if wrapDateLine option is set
     *     on the layer, it will return a bounds which is wrapped around the 
     *     world. We do not wrap for bounds which *cross* the 
     *     maxExtent.left/right, only bounds which are entirely to the left 
     *     or entirely to the right.
     * 
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     */
    adjustBounds: function (bounds) {

        if (this.gutter) {
            // Adjust the extent of a bounds in map units by the 
            // layer's gutter in pixels.
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new SuperMap.Bounds(bounds.left - mapGutter,
                                           bounds.bottom - mapGutter,
                                           bounds.right + mapGutter,
                                           bounds.top + mapGutter);
        }

        if (this.wrapDateLine) {
            // wrap around the date line, within the limits of rounding error
            var wrappingOptions = { 
                'rightTolerance':this.getResolution(),
                'leftTolerance':this.getResolution()
            };    
            bounds = bounds.wrapDateLine(this.maxExtent, wrappingOptions);
                              
        }
        return bounds;
    },

    CLASS_NAME: "SuperMap.Layer"
});
