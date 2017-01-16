/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
    
/**
 * @requires SuperMap/Layer/HTTPRequest.js
 */

/**
 * Class: SuperMap.Layer.Grid
 * 使用网格状瓦片图层的基类，{<SuperMap.Layer.Grid>}构造函数可创建新的网格瓦片图层。
 *
 * Inherits from:
 *  - <SuperMap.Layer.HTTPRequest>
 */
SuperMap.Layer.Grid = SuperMap.Class(SuperMap.Layer.HTTPRequest, {
    
    /**
     * APIProperty: tileSize
     * {<SuperMap.Size>}瓦片的大小。
     */
    tileSize: null,

    /**
     * Property: tileOriginCorner
     * {String} If the <tileOrigin> property is not provided, the tile origin 
     *     will be derived from the layer's <maxExtent>.  The corner of the 
     *     <maxExtent> used is determined by this property.  Acceptable values
     *     are "tl" (top left), "tr" (top right), "bl" (bottom left), and "br"
     *     (bottom right).  Default is "bl".
     */
    tileOriginCorner: "bl",
    
    /**
     * APIProperty: tileOrigin 
     * {<SuperMap.LonLat>} 网格瓦片的原点。
     *  如果提供了tileOrigin，需要根据这个位置调整所有的resolutions，
     * 如果没有提供，网格瓦片会根据图层的maxExtent进行调整。
     *    默认为null。
     */
    tileOrigin: null,
    
    /** APIProperty: tileOptions
     *  {Object} 实例化{<SuperMap.Tile>} 的可选参数
     */
    tileOptions: null,
    
    /**
     * APIProperty: tileClass
     * {<SuperMap.Tile>} tileClass属性应用于当前图层，表示瓦片类型，默认值是
     *     SuperMap.Tile.Image.
     */
    tileClass: SuperMap.Tile.Image,
    
    /**
     * Property: grid
     * {Array(Array(<SuperMap.Tile>))} This is an array of rows, each row is 
     *     an array of tiles.
     */
    grid: null,

    /**
     * APIProperty: singleTile
     * {Boolean} 加载单个的瓦片。瓦片大小取决于ratio属性。
     */
    singleTile: false,

    /** APIProperty: ratio
     *  {Float} 瓦片大小改变后与改变前的比值，默认为1.5。
     *  仅在单一瓦片模式下使用。
     */
    ratio: 1.5,

    /**
     * APIProperty: buffer
     * {Integer} 仅在网格化的模式使用，默认为0。
     * 在计算图片分块数以及位置时使用。
     * buffer越大，初始化访问的图片数量越多，减少鼠标平移地图时再次访问服务器的次数。
     */
    buffer: 0,
    
    /**
     * APIProperty: transitionEffect
     * {String} 在地图上下左右移动或者缩放时的过渡效果。
     * 当图层为透明图层时（例如专题图），
     * 建议不使用过渡效果或将removeBackBufferDelay
     * （删除过渡效果图片等待时间)调短，例如500
     *
     * 当前支持的值：
     *  - *null* 没有过渡效果（默认为null）
     *  - *resize*  存在的瓦片在缩放后调整大小时提供可见的过渡效果，
     * 当新的瓦片在地图上出现之后，将其绘制在调整了大小的瓦片之上。
     */
    transitionEffect: null,
    
    /**
     * Property: SUPPORTED_TRANSITIONS
     * {Array} An immutable (that means don't change it!) list of supported ，所支持的过渡效果
     *     transitionEffect values.
     */
    SUPPORTED_TRANSITIONS: ["resize"],

    /**
     * Property: backBuffer
     * {DOMElement} The back buffer.为显示过渡效果，而缓存的图层
     */
    backBuffer: null,
    /**
     * Property: backBufferp
     * {DOMElement} backBuffer的父容器
     */
    backBufferp: null,
    
    
    /**
     * Property: gridResolution
     * {Number} 当前图层的Resolution，为缩放过渡效果所用.
     *     This property is updated each the grid is initialized.
     */
    gridResolution: null,

    /**
     * Property: backBufferResolution
     * {Number} 当前缓存图层的Resolution. This property is
     *     updated each time a back buffer is created.
     */
    backBufferResolution: null,

    /**
     * Property: backBufferLonLat
     * {Object} 当前缓存图层左上角的坐标. Includes lon
     *     and lat properties. This object is updated each time a back buffer
     *     is created.
     */
    backBufferLonLat: null,

    /**
     * Property: backBufferTimerId
     * {Number} 删除当前缓存图层的等待计时器id, thereby preventing
     *     flash effects caused by tile animation.
     */
    backBufferTimerId: null,

    /**
     * APIProperty: removeBackBufferDelay
     * {Number} 删除当前缓存图层所等待的时间，当所有瓦片下载完后会删除缓存图层
     */
    removeBackBufferDelay: null,   

    /**
     * APIProperty: numLoadingTiles
     * {Integer} 加载瓦片的数量。
     */
    numLoadingTiles: 0,
    numLoadingTiles1: 0,

    /**
     * APIProperty: tileLoadingDelay
     * {Integer} - 移动和加载瓦片的毫秒数。
     *     默认为100。
     */
    tileLoadingDelay: 100,

    /**
     * Property: timerId
     * {Number} - The id of the tileLoadingDelay timer.
     */
    timerId: null,

    /**
     * Constructor: SuperMap.Layer.Grid
     * 创建新的网格图层。
     *
     * Parameters:
     * name - {String}图层名称。
     * url - {String}图层的服务地址。
     * params - {Object}设置到url上的可选参数。
     * options - {Object} 该类及其父类开放的属性。 
     */
    initialize: function(name, url, params, options) {
        SuperMap.Layer.HTTPRequest.prototype.initialize.apply(this, 
                                                                arguments);
        
        if (this.removeBackBufferDelay === null) {
            this.removeBackBufferDelay = this.singleTile ? 0 : 2500;
        }

        if(!!options && !!options.buffer) {
            this.buffer = options.buffer;
        }
        
        //grid layers will trigger 'tileloaded' when each new tile is 
        // loaded, as a means of progress update to listeners.
        // listeners can access 'numLoadingTiles' if they wish to keep track
        // of the loading progress
        //
        this.events.addEventType("tileloaded");

        this.grid = [];
        
        this._moveGriddedTiles = SuperMap.Function.bind(
            this.moveGriddedTiles, this
        );
    },

    /**
     * Method: removeMap
     * Called when the layer is removed from the map.
     *
     * Parameters:
     * map - {<SuperMap.Map>} The map.
     */
    removeMap: function(map) {
        if(this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
        
        if(this.backBufferTimerId !== null) {
            window.clearTimeout(this.backBufferTimerId);
            this.backBufferTimerId = null;
        }
    },

    /**
     * APIMethod: destroy
     * 解构图层和清除网格。
     */
    destroy: function() {
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        SuperMap.Layer.HTTPRequest.prototype.destroy.apply(this, arguments); 
    },

    /**
     * Method: clearGrid
     * Go through and remove all tiles from the grid, calling
     *    destroy() on each of them to kill circular references
     */
    clearGrid:function() {
        if (this.grid) {
            for(var iRow=0, len=this.grid.length; iRow<len; iRow++) {
                var row = this.grid[iRow];
                for(var iCol=0, clen=row.length; iCol<clen; iCol++) {
                    var tile = row[iCol];
                    this.removeTileMonitoringHooks(tile);
                    tile.destroy();
                }
            }
            this.grid = [];
            this.gridResolution = null;
        }
    },

    /**
     * APIMethod: clone
     * 创建克隆的图层。
     *
     * Parameters:
     * obj - {Object} 
     * 
     * Returns:
     * {<SuperMap.Layer.Grid>} Grid图层的克隆副本。
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new SuperMap.Layer.Grid(this.name,
                                            this.url,
                                            this.params,
                                            this.getOptions());
        }

        //get all additions from superclasses
        obj = SuperMap.Layer.HTTPRequest.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone();
        }
        
        // we do not want to copy reference to grid, so we make a new array
        obj.grid = [];
        obj.gridResolution = null;
        // same for backbuffer
        obj.backBuffer = null;
        obj.backBufferp = null;
        obj.backBufferTimerId = null;

        return obj;
    },    

    /**
     * Method: moveTo
     * This function is called whenever the map is moved. All the moving
     * of actual 'tiles' is done by the map, but moveTo's role is to accept
     * a bounds and make sure the data that that bounds requires is pre-loaded.
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        SuperMap.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
        
        bounds = bounds || this.map.getExtent();
        
//        // the new map resolution
//        var resolution = this.map.getResolution();

        if (bounds != null) {
             
            // if grid is empty or zoom has changed, we *must* re-tile
            var forceReTile = !this.grid.length || zoomChanged;

            // total bounds of the tiles
            var tilesBounds = this.getTilesBounds();            
      
            if (this.singleTile) {
                
                // We want to redraw whenever even the slightest part of the 
                //  current bounds is not contained by our tile.
                //  (thus, we do not specify partial -- its default is false)
                if ( forceReTile || 
                     (!dragging && !tilesBounds.containsBounds(bounds))) {
                    this.initSingleTile(bounds);
                }
            } else {
             
                // if the bounds have changed such that they are not even 
                //  *partially* contained by our tiles (IE user has 
                //  programmatically panned to the other side of the earth) 
                //  then we want to reTile (thus, partial true).  
                //
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
//                    if(zoomChanged && this.transitionEffect === 'resize') {
//                        this.applyBackBuffer(resolution);
//                    }
                    this.initGriddedTiles(bounds);
                } else {
                    this.scheduleMoveGriddedTiles();
                }
            }
        }
    },


    /**
     * Method: getTileData
     * Given a map location, retrieve a tile and the pixel offset within that
     *     tile corresponding to the location.  If there is not an existing
     *     tile in the grid that covers the given location, null will be
     *     returned.
     *
     * Parameters:
     * loc - {<SuperMap.LonLat>} map location
     *
     * Returns:
     * {Object} Object with the following properties: tile ({<SuperMap.Tile>}),
     *     i ({Number} x-pixel offset from top left), and j ({Integer} y-pixel
     *     offset from top left).
     */
    getTileData: function(loc) {
        var data = null,
            x = loc.lon,
            y = loc.lat,
            numRows = this.grid.length;

        if (this.map && numRows) {
            var res = this.map.getResolution(),
                tileWidth = this.tileSize.w,
                tileHeight = this.tileSize.h,
                bounds = this.grid[0][0].bounds,
                left = bounds.left,
                top = bounds.top;

            if (x < left) {
                // deal with multiple worlds
                if (this.map.baseLayer.wrapDateLine) {
                    var worldWidth = this.map.getMaxExtent().getWidth();
                    var worldsAway = Math.ceil((left - x) / worldWidth);
                    x += worldWidth * worldsAway;
                }
            }
            // tile distance to location (fractional number of tiles);
            var dtx = (x - left) / (res * tileWidth);
            var dty = (top - y) / (res * tileHeight);
            // index of tile in grid
            var col = Math.floor(dtx);
            var row = Math.floor(dty);
            if (row >= 0 && row < numRows) {
                var tile = this.grid[row][col];
                if (tile) {
                    data = {
                        tile: tile,
                        // pixel index within tile
                        i: Math.floor((dtx - col) * tileWidth),
                        j: Math.floor((dty - row) * tileHeight)
                    };
                }
            }
        }
        return data;
    },

    /**
     * Method: applyBackBuffer
     * Create, insert, scale and position a back buffer for the layer.
     *
     * Parameters:
     * resolution - {Number} The resolution to transition to.
     */
    applyBackBuffer: function(resolution) {
        if(this.backBufferTimerId !== null) {
            this.removeBackBuffer();
        }
        var backBuffer = this.backBuffer;
        if(!backBuffer) {
            var backBuffers = this.createBackBuffer();
            backBuffer = backBuffers[1];
            var backBufferp = this.backBufferp = backBuffers[0];
            if(!backBuffer) {
                return;
            }
            this.div.insertBefore(backBufferp, this.div.firstChild);
            this.backBuffer = backBuffer;

            // set some information in the instance for subsequent
            // calls to applyBackBuffer where the same back buffer
            // is reused
            var topLeftTileBounds = this.grid[0][0].bounds;
            this.backBufferLonLat = {
                lon: topLeftTileBounds.left,
                lat: topLeftTileBounds.top
            };
            this.backBufferResolution = this.gridResolution;
        }

        var style = backBuffer.style;

        // scale the back buffer
        var ratio = this.backBufferResolution / resolution;
        style.width = 100 * ratio + '%';
        style.height = 100 * ratio + '%';

        // and position it (based on the grid's top-left corner)
        var position = this.getViewPortPxFromLonLat(
                this.backBufferLonLat, resolution);
        var leftOffset = parseInt(this.map.layerContainerDiv.style.left, 10);
        var topOffset = parseInt(this.map.layerContainerDiv.style.top, 10);
        backBuffer.style.left = Math.round(position.x - leftOffset) + '%';
        backBuffer.style.top = Math.round(position.y - topOffset) + '%';
    },

    /**
     * Method: createBackBuffer
     * Create a back buffer.
     *
     * Returns:
     * {DOMElement} The DOM element for the back buffer, undefined if the
     * grid isn't initialized yet.
     */
    createBackBuffer: function() {
        var backBuffer;
        if(this.grid.length > 0) {
            var backBufferp = document.createElement('div');
            backBufferp.id = this.div.id + '_pp';
            backBufferp.className = 'smBackBufferpp';
            backBufferp.style.position = 'absolute';
            backBufferp.style.width = '100px';
            backBufferp.style.height = '100px';
            
            backBuffer = document.createElement('div');
            backBuffer.id = this.div.id + '_bb';
            backBuffer.className = 'smBackBuffer';
            backBuffer.style.position = 'absolute';
            backBuffer.style.width = '100%';
            backBuffer.style.height = '100%';
            backBufferp.appendChild(backBuffer);
            for(var i=0, lenI=this.grid.length; i<lenI; i++) {
                for(var j=0, lenJ=this.grid[i].length; j<lenJ; j++) {
                    var tile = this.grid[i][j].createBackBuffer();
                    if(!tile) {
                        continue;
                    }
                    // to be able to correctly position the back buffer we
                    // place the tiles grid at (0, 0) in the back buffer
                    tile.style.top = (i * this.tileSize.h) + '%';
                    tile.style.left = (j * this.tileSize.w) + '%';
                    backBuffer.appendChild(tile);
                }
            }
        }
        return [backBufferp,backBuffer];
    },

    /**
     * Method: removeBackBuffer
     * Remove back buffer from DOM.
     */
    removeBackBuffer: function() {
        if(this.backBuffer) {
            this.div.removeChild(this.backBufferp);
            this.backBuffer = null;
            this.backBufferp = null;
            this.backBufferResolution = null;
            if(this.backBufferTimerId !== null) {
                window.clearTimeout(this.backBufferTimerId);
                this.backBufferTimerId = null;
            }
        }
    },

    /**
     * Method: moveByPx
     * Move the layer based on pixel vector.
     *
     * Parameters:
     * dx - {Number}
     * dy - {Number}
     */
    moveByPx: function(dx, dy) {
        if (!this.singleTile) {
            this.scheduleMoveGriddedTiles();
        }
    },

    /**
     * Method: scheduleMoveGriddedTiles
     * Schedule the move of tiles.
     */
    scheduleMoveGriddedTiles: function() {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
        }
        this.timerId = window.setTimeout(
            this._moveGriddedTiles,
            this.tileLoadingDelay
        );
    },
    
    /**
     * APIMethod: setTileSize
     * 首先判断是否在singleTile模式，若是则根据ratio和地图的size计算瓦片的size。
     * 
     * Parameters:
     * size - {<SuperMap.Size>}
     */
    setTileSize: function(size) { 
        if (this.singleTile) {
            size = this.map.getSize();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio);
        } 
        SuperMap.Layer.HTTPRequest.prototype.setTileSize.apply(this, [size]);
    },
        
    /**
     * Method: getGridBounds  2.12升级删除
     * Deprecated. This function will be removed in 3.0. Please use 
     *     getTilesBounds() instead.
     * 
     * Returns:
     * {<SuperMap.Bounds>} A Bounds object representing the bounds of all the
     * currently loaded tiles (including those partially or not at all seen 
     * onscreen)
     */
    //getGridBounds: function() {
    //    return this.getTilesBounds();
    //},

    /**
     * APIMethod: getTilesBounds
     * 返回网格状瓦片的边界。
     *
     * Returns:
     * {<SuperMap.Bounds>} 所有当前加载的瓦片的bounds对象（包括屏幕上看到或完全没有加载出来的瓦片的bounds）。
     */
    getTilesBounds: function() {    
        var bounds = null; 
        
        if (this.grid.length) {
            var bottom = this.grid.length - 1;
            var bottomLeftTile = this.grid[bottom][0];
    
            var right = this.grid[0].length - 1; 
            var topRightTile = this.grid[0][right];
    
            bounds = new SuperMap.Bounds(bottomLeftTile.bounds.left, 
                                           bottomLeftTile.bounds.bottom,
                                           topRightTile.bounds.right, 
                                           topRightTile.bounds.top);
            
        }   
        return bounds;
    },

    /**
     * Method: initSingleTile
     * 
     * Parameters: 
     * bounds - {<SuperMap.Bounds>}
     */
    initSingleTile: function(bounds) {

        //determine new tile bounds
        var center = bounds.getCenterLonLat();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
                                       
        var tileBounds = 
            new SuperMap.Bounds(center.lon - (tileWidth/2),
                                  center.lat - (tileHeight/2),
                                  center.lon + (tileWidth/2),
                                  center.lat + (tileHeight/2));
  
        var ul = new SuperMap.LonLat(tileBounds.left, tileBounds.top);
        var px = this.map.getLayerPxFromLonLat(ul);

        if (!this.grid.length) {
            this.grid[0] = [];
        }

        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile;
        } else {
            tile.moveTo(tileBounds, px);
        }           
        
        //remove all but our single tile
        this.removeExcessTiles(1,1);
    },

    /** 
     * Method: calculateGridLayout
     * Generate parameters for the grid layout.
     *
     * Parameters:
     * bounds - {<SuperMap.Bound>}
     * origin - {<SuperMap.LonLat>}
     * resolution - {Number}
     *
     * Returns:
     * Object containing properties tilelon, tilelat, tileoffsetlat,
     * tileoffsetlat, tileoffsetx, tileoffsety
     */
    calculateGridLayout: function(bounds, origin, resolution) {
        //计算出每一张图片（默认256*256屏幕大小）包含的地理范围（经纬度表示）
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        
        var offsetlon = bounds.left - origin.lon;
        var tilecol = Math.floor(offsetlon/tilelon) - this.buffer;
        var tilecolremain = offsetlon/tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = origin.lon + tilecol * tilelon;
        
        var offsetlat = bounds.top - (origin.lat + tilelat);  
        var tilerow = Math.ceil(offsetlat/tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat/tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = origin.lat + tilerow * tilelat;
        
        return { 
          tilelon: tilelon, tilelat: tilelat,
          tileoffsetlon: tileoffsetlon, tileoffsetlat: tileoffsetlat,
          tileoffsetx: tileoffsetx, tileoffsety: tileoffsety
        };

    },
    
    /**
     * Method: getTileOrigin
     * Determine the origin for aligning the grid of tiles.  If a <tileOrigin>
     *     property is supplied, that will be returned.  Otherwise, the origin
     *     will be derived from the layer's <maxExtent> property.  In this case,
     *     the tile origin will be the corner of the <maxExtent> given by the 
     *     <tileOriginCorner> property.
     *
     * Returns:
     * {<SuperMap.LonLat>} The tile origin.
     */
    getTileOrigin: function() {
        var origin = this.tileOrigin;
        if (!origin) {
            var extent = this.getMaxExtent();
            var edges = ({
                "tl": ["left", "top"],
                "tr": ["right", "top"],
                "bl": ["left", "bottom"],
                "br": ["right", "bottom"]
            })[this.tileOriginCorner];
            origin = new SuperMap.LonLat(extent[edges[0]], extent[edges[1]]);
        }
        return origin;
    },

    /**
     * Method: initGriddedTiles
     * 
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     */
    initGriddedTiles:function(bounds) {
        
        // work out mininum number of rows and columns; this is the number of
        // tiles required to cover the viewport plus at least one for panning
        //地图div的长宽
        var viewSize = this.map.getSize();
        //通过map默认的tileSize（256*256）来计算一下横排和竖排需要多少张图片
        var minRows = Math.ceil(viewSize.h/this.tileSize.h) + 
                      Math.max(1, 2 * this.buffer);
        var minCols = Math.ceil(viewSize.w/this.tileSize.w) +
                      Math.max(1, 2 * this.buffer);
        //获取最大地图范围左上角的坐标
        var origin = this.getTileOrigin();
        //获取当前的分辨率
        var resolution = this.map.getResolution();
        
        var tileLayout = this.calculateGridLayout(bounds, origin, resolution);

        var tileoffsetx = Math.round(tileLayout.tileoffsetx); // heaven help us
        var tileoffsety = Math.round(tileLayout.tileoffsety);

        var tileoffsetlon = tileLayout.tileoffsetlon;
        var tileoffsetlat = tileLayout.tileoffsetlat;
        
        var tilelon = tileLayout.tilelon;
        var tilelat = tileLayout.tilelat;

        this.origin = new SuperMap.Pixel(tileoffsetx, tileoffsety);

        var startX = tileoffsetx; 
        var startLon = tileoffsetlon;

        var rowidx = 0;
        
        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);
        
        var tileData = [], center = this.map.getCenter();
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }

            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
 
            do {
                var tileBounds = 
                    new SuperMap.Bounds(tileoffsetlon, 
                                          tileoffsetlat, 
                                          tileoffsetlon + tilelon,
                                          tileoffsetlat + tilelat);

                var x = tileoffsetx;
                x -= layerContainerDivLeft;

                var y = tileoffsety;
                y -= layerContainerDivTop;

                var px = new SuperMap.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
                
                var tileCenter = tileBounds.getCenterLonLat();
                tileData.push({
                    tile: tile,
                    distance: Math.pow(tileCenter.lon - center.lon, 2) +
                        Math.pow(tileCenter.lat - center.lat, 2)
                });
     
                tileoffsetlon += tilelon;       
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer)
                     || colidx < minCols || !((tileoffsetlon = startLon)==0?true:true)); //该条件是为解决IE10及WinRT下的乱图问题。

            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while((tileoffsetlat >= bounds.bottom - tilelat * this.buffer)
                || rowidx < minRows);
                
        this.gridResolution = this.map.getResolution();
        
        //shave off exceess rows and colums
        this.removeExcessTiles(rowidx, colidx);

        //now actually draw the tiles
        tileData.sort(function(a, b) {
            return a.distance - b.distance; 
        });
        for (var i=0, ii=tileData.length; i<ii; ++i) {
            tileData[i].tile.draw();
        }
        
        //now actually draw the tiles
        //this.spiralTileLoad();
    },

    /**
     * Method: getMaxExtent
     * Get this layer's maximum extent. (Implemented as a getter for
     *     potential specific implementations in sub-classes.)
     *
     * Returns:
     * {SuperMap.Bounds}
     */
    getMaxExtent: function() {
        return this.maxExtent;
    },

    /**
     * APIMethod: addTile
     * 添加瓦片，首先创建，然后初始化后将其加载到图层的div。
     *
     * Parameters
     * bounds - {<SuperMap.Bounds>} 
     * position - {<SuperMap.Pixel>} 
     *
     * Returns:
     * {<SuperMap.Tile>} 返回新添加瓦片。
     */
    addTile:function(bounds, position) {
        var tile = new this.tileClass(
            this, position, bounds, null, this.tileSize, this.tileOptions
        );
        this.events.triggerEvent("addtile", {tile: tile});
        return tile;
    },
    
    /** 
     * Method: addTileMonitoringHooks
     * This function takes a tile as input and adds the appropriate hooks to 
     *     the tile so that the layer can keep track of the loading tiles.
     * 
     * Parameters: 
     * tile - {<SuperMap.Tile>}
     */
    addTileMonitoringHooks: function(tile) {
        
        //tile.onLoadStart = function() {
        //    //if that was first tile then trigger a 'loadstart' on the layer
        //    if (this.numLoadingTiles == 0) {
        //        this.events.triggerEvent("loadstart");
        //    }
        //    this.numLoadingTiles++;
        //};
        //tile.events.register("loadstart", this, tile.onLoadStart);
        //
        //tile.onLoadEnd = function(idx) {
        //    this.numLoadingTiles--;
        //    this.events.triggerEvent("tileloaded", {tile: tile,"idx":idx.idx});
        //    //if that was the last tile, then trigger a 'loadend' on the layer
        //    if (this.numLoadingTiles == 0) {
        //        this.events.triggerEvent("loadend");
        //
        //        if(this.backBuffer) {
        //            // the removal of the back buffer is delayed to prevent flash
        //            // effects due to the animation of tile displaying
        //            this.backBufferTimerId = window.setTimeout(
        //                SuperMap.Function.bind(this.removeBackBuffer, this),
        //                this.removeBackBufferDelay
        //            );
        //        }
        //    }
        //};

        //ICL758 临时出包测试
        tile.onLoadStart = function() {
            //if that was first tile then trigger a 'loadstart' on the layer
            if (this.numLoadingTiles == 0) {
                this.numLoadingTiles1 = 0;
                this.events.triggerEvent("loadstart");
            }
            this.numLoadingTiles++;
            this.numLoadingTiles1++;
        };
        tile.events.register("loadstart", this, tile.onLoadStart);

        tile.onLoadEnd = function(idx) {
            this.numLoadingTiles1--;
            this.events.triggerEvent("tileloaded", {tile: tile,"idx":idx.idx});
            //if that was the last tile, then trigger a 'loadend' on the layer
            if (this.numLoadingTiles1 === 0) {
                this.numLoadingTiles = 0;
                this.events.triggerEvent("loadend");
                if(this.backBuffer) {
                    // the removal of the back buffer is delayed to prevent flash
                    // effects due to the animation of tile displaying
                    this.backBufferTimerId = window.setTimeout(
                        SuperMap.Function.bind(this.removeBackBuffer, this),
                        this.removeBackBufferDelay
                    );
                }
            }
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
        tile.events.register("unload", this, tile.onLoadEnd);
    },

    /** 
     * Method: removeTileMonitoringHooks
     * This function takes a tile as input and removes the tile hooks 
     *     that were added in addTileMonitoringHooks()
     * 
     * Parameters: 
     * tile - {<SuperMap.Tile>}
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
     * Method: moveGriddedTiles
     */
    moveGriddedTiles: function() {
        var shifted = true;
        var buffer = this.buffer || 1;
        var tlLayer = this.grid[0][0].position;
        var offsetX = parseInt(this.map.layerContainerDiv.style.left);
        var offsetY = parseInt(this.map.layerContainerDiv.style.top);
        var tlViewPort = tlLayer.add(offsetX, offsetY);
        if (tlViewPort.x > -this.tileSize.w * (buffer - 1)) {
            this.shiftColumn(true);
        } else if (tlViewPort.x < -this.tileSize.w * buffer) {
            this.shiftColumn(false);
        } else if (tlViewPort.y > -this.tileSize.h * (buffer - 1)) {
            this.shiftRow(true);
        } else if (tlViewPort.y < -this.tileSize.h * buffer) {
            this.shiftRow(false);
        } else {
            shifted = false;
        }
        if (shifted) {
            // we may have other row or columns to shift, schedule it
            // with a setTimeout, to give the user a chance to sneak
            // in moveTo's
            this.timerId = window.setTimeout(this._moveGriddedTiles, 0);
        }
    },

    /**
     * Method: shiftRow
     * Shifty grid work
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftRow:function(prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var grid = this.grid;
        var modelRow = grid[modelRowIndex];

        var resolution = this.map.getResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;

        var row = (prepend) ? grid.pop() : grid.shift();

        for (var i=0, len=modelRow.length; i<len; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            row[i].moveTo(bounds, position);
        }

        if (prepend) {
            grid.unshift(row);
        } else {
            grid.push(row);
        }
    },

    /**
     * Method: shiftColumn
     * Shift grid work in the other dimension
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftColumn: function(prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.map.getResolution();
        var deltaLon = resolution * deltaX;

        for (var i=0, len=this.grid.length; i<len; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;

            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            tile.moveTo(bounds, position);
            if (prepend) {
                row.unshift(tile);
            } else {
                row.push(tile);
            }
        }
    },
    
    /**
     * Method: removeExcessTiles
     * When the size of the map or the buffer changes, we may need to
     *     remove some excess rows and columns.
     * 
     * Parameters:
     * rows - {Integer} Maximum number of rows we want our grid to have.
     * columns - {Integer} Maximum number of columns we want our grid to have.
     */
    removeExcessTiles: function(rows, columns) {
        
        // remove extra rows
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (var i=0, l=row.length; i<l; i++) {
                var tile = row[i];
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
        
        // remove extra columns
        while (this.grid[0].length > columns) {
            for (var i=0, l=this.grid.length; i<l; i++) {
                var row = this.grid[i];
                if(row.length <= columns) continue;
                var tile = row.pop();
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
    },

    /**
     * Method: onMapResize
     * For singleTile layers, this will set a new tile size according to the
     * dimensions of the map pane.
     */
    onMapResize: function() {
        if (this.singleTile) {
            this.clearGrid();
            this.setTileSize();
        }
    },
    
    /**
     * APIMethod: getTileBounds
     * 返回瓦片的范围。
     *
     * Parameters:
     * viewPortPx - {<SuperMap.Pixel>} 传入的像素点。
     *
     * Returns:
     * {<SuperMap.Bounds>} 返回瓦片的范围。
     */
    getTileBounds: function(viewPortPx) {
        var maxExtent = this.maxExtent;
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this.getLonLatFromViewPortPx(viewPortPx);
        var tileLeft = maxExtent.left + (tileMapWidth *
                                         Math.floor((mapPoint.lon -
                                                     maxExtent.left) /
                                                    tileMapWidth));
        var tileBottom = maxExtent.bottom + (tileMapHeight *
                                             Math.floor((mapPoint.lat -
                                                         maxExtent.bottom) /
                                                        tileMapHeight));
        return new SuperMap.Bounds(tileLeft, tileBottom,
                                     tileLeft + tileMapWidth,
                                     tileBottom + tileMapHeight);
    },

    /**
     * Method: getServerResolution
     * Return the closest highest server-supported resolution. Throw an
     * exception if none is found in the serverResolutions array.
     *
     * Parameters:
     * resolution - {Number} The base resolution. If undefined the
     *     map resolution is used.
     *
     * Returns:
     * {Number} The closest highest server resolution value.
     */
    getServerResolution: function(resolution) {
        resolution = resolution || this.map.getResolution();
        if(this.serverResolutions &&
            SuperMap.Util.indexOf(this.serverResolutions, resolution) === -1) {
            var i, serverResolution;
            for(i=this.serverResolutions.length-1; i>= 0; i--) {
                serverResolution = this.serverResolutions[i];
                if(serverResolution > resolution) {
                    resolution = serverResolution;
                    break;
                }
            }
            if(i === -1) {
                throw 'no appropriate resolution in serverResolutions';
            }
        }
        return resolution;
    },

    /**
     * Method: getServerZoom
     * Return the zoom value corresponding to the best matching server
     * resolution, taking into account <serverResolutions> and <zoomOffset>.
     *
     * Returns:
     * {Number} The closest server supported zoom. This is not the map zoom
     *     level, but an index of the server's resolutions array.
     */
    getServerZoom: function() {
        var resolution = this.getServerResolution();
        return this.serverResolutions ?
            SuperMap.Util.indexOf(this.serverResolutions, resolution) :
            this.map.getZoomForResolution(resolution) + (this.zoomOffset || 0);
    },
    
    CLASS_NAME: "SuperMap.Layer.Grid"
});
