/* Copyright (c) 2006-2012 by SuperMap Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the SuperMap distribution or repository for the
 * full text of the license. */

/**
 * @requires SuperMap/Layer.js
 * @requires SuperMap/Tile/Image.js
 * @requires SuperMap/Layer/CanvasImage.js
 */

/**
 * Class: SuperMap.Layer.Image
 * 此图层用于显示单一的图片，可以将用户设置的图片同其他图层一起叠加，
 * 实现同步放大、缩小、平移等效果。用于单一影像图与其他图层的叠加。
 *
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.Image = SuperMap.Class(SuperMap.Layer, {

    /**
     * Property: isBaseLayer
     * {Boolean} 是否为基础图层，默认为true。
     * 此属性可以通过layer的options属性设置。
     * 一个地图里面只能存在一个地图，如果多个图层的此属性被设置为true，
     * 那么以第一个加载到map里面的图层作为底图，其他作为预选底图，可以通过再次设置isBaseLayer来将其转化为底图
     */
    isBaseLayer: true,

    /**
     * Property: url
     * {String} image的访问地址，默认为空。
     * 需要在初始化类的时候设置。
     * 图片地址支持两种：
     * 1.本地地址，如“E:/Penguins.jpg”;
     * 2.网址，如“http://fmn.xnpic.com/fmn056/20130108/1055/original_KGvP_46e70001b92f125c.jpg”。
     * 图片格式支持：jpg、jpe、jpeg、JPEG、gif、GIF、bmp、BMP 格式
     */
    url: null,
    /**
     * Property: useCanvas
     * {Boolean} 设置是否将一个图层用Canvas元素显示，默认为true，使用Canvas显示。
     * 图层在初始化时会进行浏览器检测，若不支持Canvas方式显示时，自动处理为Image
     * 方式出图，该属性会被设置成false。
     *  此属性可以通过layer的options属性设置。
     */
    useCanvas: true,
    /**
     * Property: extent
     * {<SuperMap.Bounds>} 地图的Bounds，此范围在初始化的时候会默认作为图层的最大 Bounds
     * 如果你希望最大Bounds与这个不同，请设置 maxExtent。
     * 如果只浏览这一张图片，设置此参数只会改变图片的形状，与地理位置无关系。
     * 如果用户使用的图片为一张影像图，希望与其他图层叠加，那么你首先需要知道这张图片所代表的实际地理范围是多大，
     * 然后根据当前map里面的投影系来计算出一个范围，并且将其设置为此Bounds，在显示上才能匹配。
     *
     */
    extent: null,

    /**
     *  Property: changeDx
     *  {Number}x轴上的位移量
     */
    changeDx:0,

    /**
     *  Property: changeDx
     *  {Number}y轴上的位移量
     */
    changeDy:0,

    /**
     *  Property: memoryImg
     *  {Object}用于存储第一次访问的图片。
     *  第二次使用时直接读取，不必要再次童工网址加载，提高效率
     */
    memoryImg:null,
    /**
     * Property: tile
     * {<SuperMap.Tile.Image>或<SuperMap.Tile.CanvasImage>}瓦片
     */
    tile: null,

    /**
     * Property: tileOriginPx
     * {<SuperMap.Pixel>}图片在当前比例尺的左上角像素坐标
     */
    tileOriginPx:null,

    /**
     * Constructor: SuperMap.Layer.Image
     * 创建一个image layer
     *
     * Parameters:
     * name - {String} 图层的名称。
     * url - {String} 图片的路径
     * extent - {<SuperMap.Bounds>} 图片的bounds
     * options - {Object} 设置到layer的optins属性上的临时哈希表
     *
     * Allowed params properties:
     * isBaseLayer - {Boolean} 是否为基础图层，默认为true。
     * useCanvas - {Boolean} 设置是否将一个图层用Canvas元素显示，默认为true，使用Canvas显示。
     *
     * (start code)
     * //默认useCanvas=true,isBaseLayer=true
     * var options = {numZoomLevels: 14,useCanvas:false,isBaseLayer:true};
     * var bounds= new SuperMap.Bounds(-180,-90,180,90);
     * var layer = new SuperMap.Layer.Image(
     *      "World_Day",
     *      'http://localhost:8090/JSBev/Day.jpg',
     *      bounds ,
     *      options
     *      );
     * map.addLayer(layer);
     * map.zoomToMaxExtent();
     * (end)
     */
    initialize: function(name, url, extent,  options) {
        var broz = SuperMap.Browser;
        this.url = url;
        this.extent = extent;
        this.maxExtent = extent;
        SuperMap.Layer.prototype.initialize.apply(this, [name, options]);

        if(this.useCanvas) {
            //通过浏览器的判定决定是否支持Canvas绘制
            this.useCanvas = SuperMap.Util.supportCanvas();
        }
        //如果为android手持端，那么不能支持Canvas绘制
        if(broz.device === 'android') {
            this.useCanvas = false;
        }
        //如果采用canvas绘制，创建canvas
        if(this.useCanvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.id = "Canvas_" + this.id;
            this.canvas.style.position = "absolute";
            this.div.appendChild(this.canvas);
            this.canvasContext = this.canvas.getContext('2d');
        }
    },

    /**
     * Method: destroy
     * 释放图层占用资源
     */
    destroy: function() {
        if (this.tile) {
            this.removeTileMonitoringHooks(this.tile);
            this.tile.destroy();
            this.tile = null;
        }
        this.url=null;
        this.useCanvas=true;
        this.memoryImg=null;
        this.isBaseLayer=true;
        this.extent=null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: clone
     * 克隆一个同样的图层
     *
     * Paramters:
     * obj - {Object} An optional layer (is this ever used?)
     *
     * Returns:
     * {<SuperMap.Layer.Image>} 复制和当前有共同属性的图层
     */
    clone: function(obj) {
        if(obj == null) {
            obj = new SuperMap.Layer.Image(
                this.name,
                this.url,
                this.extent,
                this.getOptions());
        }
        //get all additions from superclasses
        obj = SuperMap.Layer.prototype.clone.apply(this, [obj]);
        // copy/set any non-init, non-simple values here
        return obj;
    },

    /**
     * Method: moveTo
     * Create the tile for the image or resize it for the new resolution 、
     * 创建瓦片或者调整瓦片
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}当前级别下计算出的地图范围
     * zoomChanged - {Boolean}缩放级别是否改变
     * dragging - {Boolean}是否为拖动触发的
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        var style = this.map.layerContainerDiv.style,
            left = parseInt(style.left),
            top = parseInt(style.top);

        this.changeDx= -left;
        this.changeDy= -top;

        SuperMap.Layer.prototype.moveTo.apply(this, arguments);

        var firstRendering = (this.tile == null);

        if(zoomChanged || firstRendering) {
            this.setTileSize();
            //determine new position (upper left corner of new bounds)
            var ulPx = this.tileOriginPx = this.map.getLayerPxFromLonLat({
                lon: this.extent.left,
                lat: this.extent.top
            });
            if(firstRendering) {
                //初始化
                if(this.useCanvas)
                {
                    this.tile=new SuperMap.Tile.CanvasImage(this,
                        new SuperMap.Pixel(ulPx.x-this.changeDx,ulPx.y-this.changeDy),
                        this.extent,null, this.tileSize, this.useCanvas);
                    this.addTileMonitoringHooks(this.tile);
                }
                else
                {
                    this.tile = new SuperMap.Tile.Image(this, ulPx, this.extent,null, this.tileSize);
                    this.addTileMonitoringHooks(this.tile);
                }
            } else {
                this.tile.size = this.tileSize.clone();
                if(this.useCanvas)
                {
                    this.tile.position = new SuperMap.Pixel(ulPx.x-this.changeDx,ulPx.y-this.changeDy);
                }
                else
                {
                    this.tile.position=ulPx.clone();
                }
            }
            this.tile.draw();
            //由于当使用canvas方式时需要把position重新定位到之前
            //this.tile.position=ulPx.clone();
            if(!this.useCanvas)
            {
                //绘制完毕后需要设置frame可见
                this.tile.frame.style.display=  "";
                this.tile.imgDiv.style.opacity=1;
            }
        }
        else{
            if(this.useCanvas)
            {
                this.fixPosition();
            }
        }
    },
    /**
     * Method: fixPosition
     * 平移逻辑。
     */
    fixPosition:function()
    {
        var positionX = this.tileOriginPx.x-this.changeDx;
        var positionY = this.tileOriginPx.y-this.changeDy;
        var position=new SuperMap.Pixel(positionX,positionY);
        this.drawCanvasTile(this.tile.lastImage,position);
    },
    /**
     * Method: moveByPx
     * 移动瓦片（重写父类方法）。
     *
     * Parameters:
     * dx - {Number} x上的位移
     * dy - {Number} y上的位移
     */
    moveByPx: function(dx, dy) {
        if(this.useCanvas)
        {
            this.changeDx +=dx;
            this.changeDy +=dy;
            this.fixPosition();
        }

    },

    /**
     * Method: drawCanvasTile
     * 当Image加载完成后，将image绘制到canvas上。
     *
     * Parameters:
     * image - {<Image>} 需要绘制的瓦片
     * position - {<SuperMap.Pixel>} 瓦片的左上角像素位置
     */
    drawCanvasTile:function(image,position)
    {
        this.canvas.width = this.map.viewPortDiv.clientWidth;
        this.canvas.height = this.map.viewPortDiv.clientHeight;
        this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.canvasContext.drawImage(image, position.x, position.y,this.tile.size.w,this.tile.size.h);

    }  ,

    /**
     * Method: getMemoryImg
     * 根据瓦片的bounds获取内存中该记录的image。
     * 此image只存在一张图片
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {Object} image对象，不存在返回null
     */
    getMemoryImg:function(bounds)
    {
        return this.memoryImg;
    },
    /**
     * Method: addMemoryImg
     * 记录瓦片bounds和对应的图片信息。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     * image - {<Image>} 瓦片对应的图片信息
     *
     */
    addMemoryImg:function(bounds,image)
    {
        this.memoryImg= image;
    }   ,

    /**
     * Method: getXYZ
     * 根据瓦片的bounds获取xyz值。
     *  此image只存在一张图片，不需要使用xyz访问服务器的形式出图
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。如：{"x": 0, "y": 0, "z": 0}。
     */
    getXYZ:function(bounds)
    {
         return {"x": 0, "y": 0, "z": 0};
    }   ,

    /**
     * Method: setTileSize
     * 设置瓦片的大小。
     */
    setTileSize: function() {
        var tileWidth = this.extent.getWidth() / this.map.getResolution();
        var tileHeight = this.extent.getHeight() / this.map.getResolution();
        this.tileSize = new SuperMap.Size(tileWidth, tileHeight);
    },

    /**
     * Method: addTileMonitoringHooks
     * This function takes a tile as input and adds the appropriate hooks to
     *     the tile so that the layer can keep track of the loading tiles.
     * 此方法通过接受一个瓦片并添加监听，以便可以跟踪加载
     *
     * Parameters:
     * tile - {<SuperMap.Tile>}瓦片
     */
    addTileMonitoringHooks: function(tile) {
        tile.onLoadStart = function() {
            this.events.triggerEvent("loadstart");
        };
        tile.events.register("loadstart", this, tile.onLoadStart);
        tile.onLoadEnd = function() {
            this.events.triggerEvent("loadend");
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
        tile.events.register("unload", this, tile.onLoadEnd);
    },

    /**
     * Method: removeTileMonitoringHooks
     * This function takes a tile as input and removes the tile hooks
     *     that were added in <addTileMonitoringHooks>.
     *  移除跟踪瓦片加载的监听
     *
     * Parameters:
     * tile - {<SuperMap.Tile>}瓦片
     */
    removeTileMonitoringHooks: function(tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: this
        });
    },

    /**
     * APIMethod: getURL
     * 获取图片的访问地址
     *
     * Returns:
     * {String} 图片的url地址
     */
    getURL: function() {
        return this.url;
    },
    /**
     * Method: initResolutions
     * 初始化Resolutions数组。（重写基类方法）
     */
    initResolutions: function () {
        // 我们想要得到resolutions，以下是我们的策略：
        // 1. 如果在layer配置中定义了resolutions和scales，使用它们，
        // 2. 如果在layer配置中定义resolutions，使用它，
        // 3. 否则，如果在layer配置中定义scales，那么从这些scales中得出resolutions，
        // 4. 再者，试图从在layer配置中设置的 maxResolution,minResolution, numZoomLevels, maxZoomLevel 计算出resolutions，
        // 5. 如果在map中设置了resolutions和scales，使用它们，
        // 6. 如果我们仍然没有获得resolutions，并且resolutions在map中已经定义了，使用它们，
        // 7. 否则，如果scales在map中定义了，那么从scales中得出resolutions，
        // 8. 再者，试图从在map中设置的maxResolution, minResolution, numZoomLevels, maxZoomLevel 计算出resolutions。

        var me = this,
            i, len, p, startZoomLevel,
            props = {},
            alwaysInRange = true;

        //如果在layer中定义了resolutions和scales，直接使用layer的resolutions和scales，并且通过它们计算出
        //maxResolution, minResolution, numZoomLevels, maxScale和minScale
        if (me.resolutions && me.scales) {
            var len = me.resolutions.length;
            me.resolutions.sort(function(a, b) {
                return (b - a);
            });
            if (!me.maxResolution) {
                me.maxResolution = me.resolutions[0];
            }

            if (!me.minResolution) {
                me.minResolution = me.resolutions[len-1];
            }
            me.scales.sort(function(a, b) {
                return (a - b);
            });
            if (!me.maxScale) {
                me.maxScale = me.scales[len-1];
            }

            if (!me.minScale) {
                me.minScale = me.scales[0];
            }
            me.numZoomLevels = len;
            return;
        }

        // 从layer的配置中获得计算resolutions的数据。
        for (i = 0, len = me.RESOLUTION_PROPERTIES.length; i < len; i++) {
            p = me.RESOLUTION_PROPERTIES[i];
            props[p] = me.options[p];
            if (alwaysInRange && me.options[p]) {
                alwaysInRange = false;
            }
        }

        if (me.alwaysInRange == null) {
            me.alwaysInRange = alwaysInRange;
        }

        // 如果没有得到resolutions，利用scales计算resolutions。
        if (props.resolutions == null) {
            props.resolutions = me.resolutionsFromScales(props.scales);
        }

        // 如果仍没有得到resolutions，利用layer配置中设置的
        //maxResolution,minResolution, numZoomLevels, maxZoomLevel 计算出resolutions
        if (props.resolutions == null) {
            props.resolutions = me.calculateResolutions(props);
        }

        //如果没有从layer的配置数据中获得resolutions，并且map中同时设置了resolutions和scales，直接使用它们，
        //并且通过它们计算出maxResolution, minResolution, numZoomLevels, maxScale和minScale
        if (me.map.resolutions && me.map.scales) {
            me.resolutions = me.map.resolutions;
            me.scales = me.map.scales;
            var len = me.resolutions.length;
            me.resolutions.sort(function(a, b) {
                return (b - a);
            });
            if (!me.maxResolution) {
                me.maxResolution = me.resolutions[0];
            }

            if (!me.minResolution) {
                me.minResolution = me.resolutions[len-1];
            }
            me.scales.sort(function(a, b) {
                return (a - b);
            });
            if (!me.maxScale) {
                me.maxScale = me.scales[len-1];
            }

            if (!me.minScale) {
                me.minScale = me.scales[0];
            }
            me.numZoomLevels = len;
            return;
        }

        //如果此时仍没有计算出resolutions，那么先从baselayer上获取,之后从map中获得（方法同上），最后再计算。
        if (props.resolutions == null) {
            for (i = 0, len = me.RESOLUTION_PROPERTIES.length; i<len; i++) {
                p = me.RESOLUTION_PROPERTIES[i];
                props[p] = me.options[p] != null ?
                    me.options[p] : me.map[p];
            }
            if (props.resolutions == null) {
                props.resolutions = me.resolutionsFromScales(props.scales);
            }
            if (props.resolutions == null) {
                if(me.map.baseLayer!=null){
                    props.resolutions = me.map.baseLayer.resolutions;
                }
            }
            if (props.resolutions == null) {
                props.resolutions = me.calculateResolutions(props);
            }
        }

        var maxRes;
        if (me.options.maxResolution && me.options.maxResolution !== "auto") {
            maxRes = me.options.maxResolution;
        }
        if (me.options.minScale) {
            maxRes = SuperMap.Util.getResolutionFromScaleDpi(me.options.minScale, me.dpi, me.units, me.datumAxis);
        }

        var minRes;
        if (me.options.minResolution && me.options.minResolution !== "auto") {
            minRes = me.options.minResolution;
        }
        if (me.options.maxScale) {
            minRes = SuperMap.Util.getResolutionFromScaleDpi(me.options.maxScale, me.dpi, me.units, me.datumAxis);
        }
        //设置最大最小的resolution
        if (props.resolutions) {

            props.resolutions.sort(function(a, b) {
                return (b - a);
            });

            if (!maxRes) {
                maxRes = props.resolutions[0];
            }

            if (!minRes) {
                var lastIdx = props.resolutions.length - 1;
                minRes = props.resolutions[lastIdx];
            }
        }
        //根据resolutions获取scales
        me.resolutions = props.resolutions;
        if (me.resolutions) {
            len = me.resolutions.length;
            me.scales = [len];
            if(me.map.baseLayer){
                startZoomLevel = this.calculateResolutionsLevel(me.resolutions);
            }
            else{
                startZoomLevel = 0;
            }
            for (i = startZoomLevel; i < len + startZoomLevel; i++) {
                me.scales[i] = SuperMap.Util.getScaleFromResolutionDpi(me.resolutions[i- startZoomLevel], me.dpi, me.units, me.datumAxis);
            }
            me.numZoomLevels = len;
        }
        me.minResolution = minRes;
        if (minRes) {
            me.maxScale = SuperMap.Util.getScaleFromResolutionDpi(minRes, me.dpi, me.units, me.datumAxis);
        }
        me.maxResolution = maxRes;
        if (maxRes) {
            me.minScale = SuperMap.Util.getScaleFromResolutionDpi(maxRes, me.dpi, me.units, me.datumAxis);
        }
    },

    /**
     * Method: calculateResolutionsLevel
     * 根据resolutions数组计算等级。（重写基类Layer里面的方法）
     *
     * Parameters:
     * resolutions - {Array({Number})}resolutions数组
     */
    calculateResolutionsLevel: function(resolutions){
        var me = this, j, len, resolution,
            baseLayerResolutions;
        baseLayerResolutions = me.map.baseLayer.resolutions;
        len = baseLayerResolutions.length;
        resolution = resolutions[0];
        for(j=0; j<len; j++){
            if(resolution === baseLayerResolutions[j]){
                return j;
            }
        }
        return 0;
    },

    CLASS_NAME: "SuperMap.Layer.Image"
});
