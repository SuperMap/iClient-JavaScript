/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Tile/UTFGrid.js
 */

/**
 * Class: SuperMap.Layer.UTFGrid
 * 这个图层从UTFGrid切片数据源读取数据。由于UTFGrid本质上是基于JSON的ASCII
 * 码'字符画'与属性数据的结合，所以它不能被可视化渲染。
 *
 * 当需要实时查询地图上某些地物属性并且地物数量很大时，同时不希望实时的与服务
 * 器交互以获取属性信息，可以通过UTFGrid图层及时返回属性信息；例如：希望达到
 * 鼠标悬停或鼠标单击某一地物显示属性信息的快速交互。
 *
 * 为了在地图中使用这个图层，你必须同时添加 <SuperMap.Control.UTFGrid>
 * 控件类，来控制触发事件类型。
 *
 * 案例:
 *
 * (start code)
 * var china_utfgrid = new SuperMap.Layer.UTFGrid("UTFGridLayer", "http://localhost:8090/iserver/services/map-china400/rest/maps/China",
 * {
 *      layerName: "China_Province_R@China400",
 *      utfTileSize: 256,
 *      pixcell: 2,
 *      isUseCache: false
 * },
 * {
 *     utfgridResolution: 2
 * });
 * map.addLayer(china_utfgrid);
 *
 * var control = new SuperMap.Control.UTFGrid({
 *     layers: [china_utfgrid],
 *     handlerMode: 'move',
 *     callback: function(dataLookup) {
 *         // do something with returned data
 *     }
 * })
 * (end code)
 *
 *
 * Inherits from:
 *  - <SuperMap.Layer.Grid>
 */
SuperMap.Layer.UTFGrid = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * APIProperty: isBaseLayer
     * {Boolean} 是否为底图，默认值为false
     */
    isBaseLayer: false,

    /**
     * Property: isFirstLoad
     * {Bool} 记录是否第一次加载，默认为true。
     */
    isFirstLoad: true,

    /**
     * APIProperty: zoomDuration
     * {Number} 设置两次滚轮事件触发的间隔，如果两次滚轮触发时间差小于300ms。
     * 则放弃前一次滚轮事件，以防止缩放幅度大的时候，中间不需要的级别也会请求数据（设置此属性的同时设置<SuperMap.Handler.MouseWheel>的interval属性，会产生错误）
     */
    zoomDuration:300,

    /**
     * APIProperty: projection
     * {<SuperMap.Projection>}
     * UTFGrid的投影，默认为"EPSG:900913"。
     */
    projection: new SuperMap.Projection("EPSG:900913"),

    /**
     * Property: useJSONP
     * {Boolean}
     * Should we use a JSONP script approach instead of a standard AJAX call?
     *
     * Set to true for using utfgrids from another server.
     * Avoids same-domain policy restrictions.
     * Note that this only works if the server accepts
     * the callback GET parameter and dynamically
     * wraps the returned json in a function call.
     *
     * Default is false
     */
    useJSONP: false,

    /**
     * APIProperty: utfgridResolution
     * {Number}
     * 瓦片像素点个数与UTFGrid单行数据点个数的比值。如果UTFGrid中的一个字符码
     * 对应表示4x4的像素块，则utfgridResolution的值为4。默认值为2 。
     */

    /**
     * Property: tileClass
     * {<SuperMap.Tile>} 该图层上使用的瓦片类型。默认值为<SuperMap.Tile.UTFGrid>。
     */
    tileClass: SuperMap.Tile.UTFGrid,
	/**
     * Property: layer
     * {<SuperMap.Layer.TiledDynamicRESTLayer>} 使用在麻点图上面时，需要设置的底图
     */
	layer:null,
    /**
     * Constructor: SuperMap.Layer.UTFGrid
     * 创建新的UTFGrid图层。
     *
     * Parameters:
     * name - {String} 该UTFGrid图层名称。
     * url - {String} UTFGrid瓦片对应地图服务的url地址。
     *
     * params属性说明:
     * utfTileSize - {String} 瓦片的像素大小, 默认256像素的正方形。
     * pixcell - {Number} 瓦片中每个单元格的像素宽度, 默认为2，pixcell应该能够被瓦片宽与高整除，该属性与options属性中
     *   <utfgridResolution> 属性对应。
     * layerName - {String} 请求地图图层名称，例如：China_Province_R@China400。
     * isUseCache - {Boolean} 是否使用本地缓存策略。设置为false则不使用，默认使用。
     * filter - {String} 过滤条件，例如： filter:"SMID < 10  and SMPERIMETER > 7000000"
     *
     * options属性说明:
     * utfgridResolution - {Number} 瓦片像素点个数与UTFGrid单行数据点个数的比
     *  值。如果UTFGrid中的一个字符码对应表示4x4的像素块，则utfgridResolution
     *  的值为4，默认值为2。
     *
     * 必须配置的属性:
     * url - {String 或 Array(String)} UTFGrid瓦片对应地图服务的url地址。
     */
    initialize: function (name, url, params, options) {
        //url.indexOf("utfGrid.json")===-1的作用是防止用户使用clone方法
        //再次对参数进行url拼接。
        if (url && url.indexOf("utfGrid.json") === -1) {
            url += "/utfGrid.json?scale=${z}&x=${x}&y=${y}";
            if (!params.isUseCache || params.isUseCache == undefined) {
                url += "&_cache=false";
            }
            if (params.utfTileSize) {
                this.tileSize = new SuperMap.Size(params.utfTileSize, params.utfTileSize);
                url += "&width=" + params.utfTileSize + "&height=" + params.utfTileSize;
            }
            if (params.pixcell) {
                url += "&pixCell=" + params.pixcell;
            }
            var layerName = params.layerName;
            if (layerName) {
                url += "&layerNames=['" + layerName+"']";
            }

            var filter = params.filter;
            if(filter){
                url += '&filters=["' + filter+'"]';
            }
            if (SuperMap.Credential.CREDENTIAL) {
                url += "&" + SuperMap.Credential.CREDENTIAL.name + "=" + SuperMap.Credential.CREDENTIAL.getValue();
            }
            options.useCanvas = false;
            SuperMap.Layer.Grid.prototype.initialize.apply(
                this, [name, url, params, options]
            );
        }
        this.tileOptions = SuperMap.Util.extend({
            utfgridResolution: this.utfgridResolution
        }, this.tileOptions);
    },

    /**
     * APIMethod: clone
     * 创建该图层的一个副本。
     *
     * Parameters:
     * obj - {Object} 该图层的子类会使用到这个对象。
     *
     * Returns:
     * {<SuperMap.Layer.UTFGrid>} SuperMap.Layer.UTFGrid副本。
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new SuperMap.Layer.UTFGrid(this.getOptions());
        }

        // get all additions from superclasses
        obj = SuperMap.Layer.Grid.prototype.clone.apply(this, [obj]);

        return obj;
    },

    /**
     * Method: getFeatureInfo
     * 根据地图坐标位置获取一个要素的详细信息。返回对象会具有id和data属性。如
     * 果指定坐标没有对应要素，则返回null。
     *
     * Parameters:
     * location - {<SuperMap.LonLat>} 地图坐标。
     *
     * Returns:
     * {Object} 根据与给定地图坐标返回代表相关联要素id以及UTFGrid 数据的对象。
     * 当给定坐标不对应要素的时候返回null。
     *
     */
    getFeatureInfo: function (location) {
        if(!this.getVisibility()){
            return null;
        }
        var info = null;
        var tileInfo = this.getTileData(location);
        if (tileInfo && tileInfo.tile && tileInfo.tile.getFeatureInfo) {
            info = tileInfo.tile.getFeatureInfo(tileInfo.i, tileInfo.j);
        }
        return info;
    },

    /**
     * Method: getFeatureId
     * 获取与地图坐标相关联的要素标示符。
     *
     * Parameters:
     * location - {<SuperMap.LonLat>} 地图坐标
     *
     * Returns:
     * {String}与地图坐标相关联的要素标示符，如果对应坐标没有对应找到要素则返回null
     */
    getFeatureId: function (location) {
        var id = null;
        var info = this.getTileData(location);
        if (info.tile) {
            id = info.tile.getFeatureId(info.i, info.j);
        }
        return id;
    },

    /**
     * Method: getURL
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     *
     * Returns:
     * {String} 请求的URL地址。
     */
    getURL: function (bounds) {
        var xyz = this.getXYZ(bounds);
        var url = this.url;
        if (SuperMap.Util.isArray(url)) {
            var s = '' + xyz.x + xyz.y + xyz.z;
            url = this.selectUrl(s, url);
        }

        return SuperMap.String.format(url, xyz);
    },

    /**
     * Method: getXYZ
     * 通过给定的bounds计算x, y, z，其中z值为对应传给iServer服务的scale值。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     *
     * Returns:
     * {Object} - 包含x, y, z属性的对象。
     */
    getXYZ: function (bounds) {
        var res = this.getServerResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) /
            (res * this.tileSize.w));
        var y = Math.round((this.maxExtent.top - bounds.top) /
            (res * this.tileSize.h));
        var z = this.getServerZoom();
		
		var scale;
		if(this.layer && this.layer.scales){scale = this.layer.scales[z];}
		//if(!scale && this.getScaleForZoom){scale = this.getScaleForZoom(z);}
		if(!scale && this.map.getScale){scale = this.map.getScale(z);}

        if (this.wrapDateLine) {
            var limit = Math.pow(2, z);
            x = ((x % limit) + limit) % limit;
        }

        return {'x': x, 'y': y, 'z': scale};
    },

    /**
     * Method: initGriddedTiles
     * 调用Grid的initGriddedTiles方法
     */
    initGriddedTiles: function (bounds) {
        SuperMap.Layer.Grid.prototype.initGriddedTiles.apply(this, arguments);
    },

    /**
     * Method: moveByPx
     * 调用Grid的moveByPx方法
     */
    moveByPx: function (dx, dy) {
        SuperMap.Layer.Grid.prototype.moveByPx.apply(this, arguments);
    },

    /**
     * Method: moveGriddedTiles
     * 调用Grid的moveGriddedTiles方法
     */
    moveGriddedTiles: function () {
        SuperMap.Layer.Grid.prototype.moveGriddedTiles.apply(this, arguments);
    },

    /**
     * Method: moveTo
     * 调用Grid的moveTo方法
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function (bounds, zoomChanged, dragging) {
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
                    if(this.isFirstLoad){
                        this.isFirstLoad = false;
                        //首次加载的时候不需要延迟
                        this.initGriddedTiles(bounds);
                    }else if(this.zoomDuration) {
                        //延迟一段时间去加载，防止连续缩放好几级时，中间的级别了也在请求数据
                        window.clearTimeout(this._timeoutId);
                        this._timeoutId = window.setTimeout(
                            SuperMap.Function.bind(function(){
                                this.initGriddedTiles(bounds);
                            }, this),
                            this.zoomDuration
                        );
                    } else {
                        this.initGriddedTiles(bounds);
                    }
                } else {
                    this.scheduleMoveGriddedTiles();
                }
            }
        }
    },

    CLASS_NAME: "SuperMap.Layer.UTFGrid"
});
