/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Grid.js
 * @requires SuperMap/Tile/Image.js
 */

/**
 * Class: SuperMap.Layer.WMTS
 * 该类用于访问图片服务器，基于OGC WMTS 1.0.0 标准实现，该服务支持三种请求模式：HTTP KVP（Key-Value Pair）方式、SOAP  * 方式、REST 方式。
 * SuperMap iServer 目前提供了KVP、 REST两种方式的实现。
 *
 * 图层的url、matrixSet、layer、style、matrixIds、resolutions为必设属性.
 * 当matrixIds设置字符串数组时，传入矩阵标识符列表，所设置的各级图层矩阵标识符要求与地图分辨率resolutions一一对应;
 * 当matrixIds设置为对象数组时，此数组应与WMTS capabilities 中声明矩阵的描述一致，对象属性参考matrixIds属性描述。
 * 如果未设置matrixIds，则矩阵标识符（identifier）默认为地图缩放级别的interger值："0"、"1"、"2"...等。
 * resolutions属性继承于父类layer，
 * 用户在创建WMTS图层时需要依照服务端出图的标准比例尺集( GlobalCRS84Scale、 GlobalCRS84Pixel、 GoogleCRS84Quad、
 * GoogleMapsCompatible)设置此属性，否则在出图时可能会出现地图偏差等问题。
 * 用户自定义缩放级别时须同时设置resolutions和matrixIds信息，并保证两者信息一一对应。
 * 各个标准比例尺集对应的分辨率数组如下：
 * 
 * (start code)
 * var GlobalCRS84ScaleResolutions = [1.25764139776733, 0.628820698883665, 0.251528279553466,
 *     0.125764139776733, 0.0628820698883665, 0.0251528279553466, 0.0125764139776733, 0.00628820698883665,
 *     0.00251528279553466, 0.00125764139776733, 0.000628820698883665, 0.000251528279553466,    
 *     0.000125764139776733, 0.0000628820698883665, 0.0000251528279553466, 0.0000125764139776733,    
 *     0.00000628820698883665, 0.00000251528279553466, 0.00000125764139776733, 0.000000628820698883665,
 *     0.00000025152827955346
 * ];
 * 
 * var GoogleCRS84QuadResolution = [1.40625000000000, 0.703125000000000, 0.351562500000000, 0.175781250000000,
 *     0.0878906250000000, 0.0439453125000000, 0.0219726562500000, 0.0109863281250000,
 *     0.00549316406250000, 0.00274658203125000, 0.00137329101562500, 0.000686645507812500,
 *     0.000343322753906250, 0.000171661376953125, 0.0000858306884765625,
 *     0.0000429153442382812, 0.0000214576721191406, 0.0000107288360595703, 0.00000536441802978516
 * ];
 *
 * var GlobalCRS84PixelResolution= [240000, 120000, 60000, 40000, 
 *     20000, 10000, 4000, 2000, 
 *       1000, 500, 166, 100, 
 *       33, 16, 10, 3, 
 *       1, 0.33 
 * ];
 * 
 * var GoogleMapsCompatibleResolutions = [156543.0339280410, 78271.51696402048, 39135.75848201023,
 *     19567.87924100512, 9783.939620502561, 4891.969810251280, 2445.984905125640,
 *     1222.992452562820, 611.4962262814100, 305.7481131407048, 152.8740565703525,
 *     76.43702828517624, 38.21851414258813, 19.10925707129406, 9.554628535647032,
 *     4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395
 * ];
 * (end)
 * 
 * Inherits from:
 *  - <SuperMap.Layer.Grid>
 */
SuperMap.Layer.WMTS = SuperMap.Class(SuperMap.Layer.Grid, {
    
    /**
     * APIProperty: isBaseLayer
     * {Boolean} 图层是否为基础图层，默认为true。
     */
    isBaseLayer: true,

    /**
     * Property: version
     * {String} WMTS版本号，默认“1.0.0”,当前只支持1.0.0版本。
     */
    version: "1.0.0",
    
    /**
     * APIProperty: requestEncoding
     * {String} 请求编码。可以是 "REST" 或者 "KVP"， 默认为"KVP"。
     */
    requestEncoding: "KVP",
    
    /**
     * APIProperty: url
     * {Array(String) or String} WMTS图层的服务地址，必设属性，是数组也可以是单个url，前者支持多地图服务轮询出图，大大提高显示速度。
     * 如："http://localhost:8090/iserver/services/map-china400/wmts100"  ，默认为null
     */
    url: null,

    /**
     * APIProperty: layer
     * {String} WMTS服务发布的图层标识符，必设属性，默认为null。
     * 所请求的地图的名称。 必须有且唯一。
     * 如："China400"
     */
    layer: null,
    
    /** 
     * APIProperty: matrixSet
     * {String} 发布的标识符矩阵集，必设属性。
     *
     */
    matrixSet: null,

    /** 
     * APIProperty: style
     * {String} 发布的图层样式，默认为"default"。
     * SuperMap iServer 目前只提供默认样式，因此其值可以省略或者设为 "default"。
     */
    style: "default",
    
    /** 
     * APIProperty: format
     * {String} 图像的MIME类型，默认为 "image/png"。当前只支持这一种格式。
     */
    format: "image/png",
    
    /**
     * APIProperty: tileOrigin
     * {<SuperMap.LonLat>} 瓦片矩阵左上角。如果发布的矩阵集中每个矩阵原点不同，
     * 则需要在<matrixIds>属性中包含<topLeftCorner>的值。若未提供，那么瓦片的左上角
     * 将设置为图层 <maxExtent>属性的左上角。
     */
    tileOrigin: null,
    
    /**
     * APIProperty: tileFullExtent
     * {<SuperMap.Bounds>} 瓦片设置的最大范围。如果没有提供，则将会用图层的<maxExtent>。
     */
    tileFullExtent: null,

    /**
     * APIProperty: formatSuffix
     * {String} REST请求编码，图片请求必须包括的图片后缀名。若未提供，则
     * 从 <format> 属性中获取。
     */
    formatSuffix: null,    

    /**
     * APIProperty: matrixIds
     * {Array} 矩阵标识符列表。若未提供，那么矩阵标识符会被假定为地图
     * 地图缩放级别，且该属性子项为 integer类型。
     * 若指定为字符串数组，矩阵标识符应与地图缩放级别对应。
     * 另外，也可以设置为对象数组。对象应于WMTS capabilities中声明矩阵的描述一致。
     * 对象属性设置如下：
     * 
     * Matrix properties:
     * identifier - {String} 矩阵标识符。
     * topLeftCorner - {<SuperMap.LonLat>} 左上角,如果与 <tileOrigin> 不同，必须设置。
     * tileWidth - {Number} 瓦片矩阵宽度。如果与<tileSize>不同则必须设置。
     * tileHeight - {Number} 瓦片矩阵高度。如果与<tileSize>不同则必须设置。 
     */
    matrixIds: null,
    
    /**
     * APIProperty: dimensions
     * {Array} REST请求编码，设置 WMTS 标准中其他可选属性设置。
     * 该属性中的项应为 <params> 属性设置的对象属性名，且一一对应。
     */
    dimensions: null,
    
    /**
     * APIProperty: params
     * {Object} 请求中的额外参数。若是KVP方式的请求，这些属性会在URL的查询字符串中；
     * 若为REST方式的请求，这些属性会在请求的路径中。
     */
    params: null,
    
    /**
     * APIProperty: zoomOffset
     * {Number} 当WMTS提供的图片级别比该图层需要访问的基本多时，可设置该属性，默认值为0。
     * 偏移量会与当前地图的缩放级别相加，进而决定该图层请求时的级别。
     * 例如：该属性设置为 3，地图级别为 0 时，图层会从缓存的第 3 级别开始请求。
     * 此外，该图层为叠加图层，且缓存级别低于底图时，可将此属性设置为
     * 负值。比如：地图级别为 1，WMTS图层级别为 0时，该属性可设置为 -1。
     */
    zoomOffset: 0,
    
    /**
     * Property: formatSuffixMap
     * {Object} a map between WMTS 'format' request parameter and tile image file suffix
     */
    formatSuffixMap: {
        "image/png": "png",
        "image/png8": "png",
        "image/png24": "png",
        "image/png32": "png",
        "png": "png",
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "jpeg": "jpg",
        "jpg": "jpg"
    },
    
    /**
     * Property: matrix
     * {Object} Matrix definition for the current map resolution.  Updated by
     *     the <updateMatrixProperties> method.
     */
    matrix: null,
    
    /**
     * Constructor: SuperMap.Layer.WMTS
     * 创建该类的新实例。 
     *
     * 例如:
     * (code)
     * var matrixIds = new Array(21);
     * for (var i = 0; i < 22; ++i) {
     *     matrixIds[i] = {identifier:i};
     * };
     * //当前图层的分辨率数组信息,和matrixIds一样，需要用户从wmts服务获取并明确设置,resolutions数组和matrixIds数组长度相同
     * var resolutions = [1.25764139776733,0.628820698883665,0.251528279553466,
     *     0.125764139776733,0.0628820698883665,0.0251528279553466,0.0125764139776733,0.00628820698883665,
     *     0.00251528279553466,0.00125764139776733,0.000628820698883665,0.000251528279553466,    
     *     0.000125764139776733,0.0000628820698883665,0.0000251528279553466,0.0000125764139776733,
     *     0.00000628820698883665,0.00000251528279553466,0.00000125764139776733,0.000000628820698883665,0.000000251528279553466];
     * var wmts = new SuperMap.Layer.WMTS({
     *     name: "World",
     *     url: "http://localhost:8090/iserver/services/map-World/wmts100",
     *     layer: "World",
     *     style: "default",
     *     matrixSet: "GlobalCRS84Scale_World",
     *     resolutions: resolutions,
     *     matrixIds: matrixIds
     * });
     * (end)
     *
     * Parameters:
     * config - {Object} 设置该类开放的属性。
     *
     * Required configuration properties:
     * name - {String} 图层名称，如"世界地图"，可选参数。
     * url - {Array(String) or String} WMTS图层的服务地址，是数组也可以是单个url，前者支持多地图服务轮询出图，大大提高显示速度。
     * layer - {String} 图层标识符，必设参数。
     * style - {String} 图层样式标识符，可选参数。
     * matrixSet - {String} 瓦片矩阵集标识符，必设参数。
     * format - {String} 图片格式，可选参数。
     * resolutions - {Array(Number)} 分辨率数组，必设参数。
     * matrixIds - {Array(Number)}  矩阵标识符列表，必设参数。
     */
    initialize: function(config) {

        // confirm required properties are supplied
        var required = {
            url: true,
            layer: true,
            style: true,
            matrixSet: true
        };
        for (var prop in required) {
            if (!(prop in config)) {
                throw new Error("Missing property '" + prop + "' in layer configuration.");
            }
        }

        config.params = SuperMap.Util.upperCaseObject(config.params);
        var args = [config.name, config.url, config.params, config];
        SuperMap.Layer.Grid.prototype.initialize.apply(this, args);
        

        // determine format suffix (for REST)
        if (!this.formatSuffix) {
            this.formatSuffix = this.formatSuffixMap[this.format] || this.format.split("/").pop();            
        }

        // expand matrixIds (may be array of string or array of object)
        if (this.matrixIds) {
            var len = this.matrixIds.length;
            if (len && typeof this.matrixIds[0] === "string") {
                var ids = this.matrixIds;
                this.matrixIds = new Array(len);
                for (var i=0; i<len; ++i) {
                    this.matrixIds[i] = {identifier: ids[i]};
                }
            }
        }

    },
    
    /**
     * Method: setMap
     */
    setMap: function() {
        SuperMap.Layer.Grid.prototype.setMap.apply(this, arguments);
        this.updateMatrixProperties();
    },
    
    /**
     * Method: updateMatrixProperties
     * Called when map resolution changes to update matrix related properties.
     */
    updateMatrixProperties: function() {
        this.matrix = this.getMatrix();
        if (this.matrix) {
            if (this.matrix.topLeftCorner) {
                this.tileOrigin = this.matrix.topLeftCorner;
            }
            if (this.matrix.tileWidth && this.matrix.tileHeight) {
                this.tileSize = new SuperMap.Size(
                    this.matrix.tileWidth, this.matrix.tileHeight
                );
            }
            if (!this.tileOrigin) { 
                this.tileOrigin = new SuperMap.LonLat(
                    this.maxExtent.left, this.maxExtent.top
                );
            }   
            if (!this.tileFullExtent) { 
                this.tileFullExtent = this.maxExtent;
            }
        }
    },
    
    /**
     * Method: moveTo
     * 
     * Parameters:
     * bound - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean} Tells when zoom has changed, as layers have to
     *     do some init work in that case.
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        if (zoomChanged || !this.matrix) {
            this.updateMatrixProperties();
        }
        return SuperMap.Layer.Grid.prototype.moveTo.apply(this, arguments);
    },

    /**
     * APIMethod: clone
     * 克隆此图层。
     * Parameters:
     * obj - {Object}
     * 
     * Returns:
     * {<SuperMap.Layer.WMTS>} 克隆 后的<SuperMap.Layer.WMTS>图层。
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new SuperMap.Layer.WMTS(this.options);
        }
        //get all additions from superclasses
        obj = SuperMap.Layer.Grid.prototype.clone.apply(this, [obj]);
        // copy/set any non-init, non-simple values here
        return obj;
    },
    
    /**
     * Method: getMatrix
     * Get the appropriate matrix definition for the current map resolution.
     */
    getMatrix: function() {
        var matrix;
        if (!this.matrixIds || this.matrixIds.length === 0) {
            matrix = {identifier: this.map.getZoom() + this.zoomOffset};
        } else {
            // get appropriate matrix given the map scale if possible
            if ("scaleDenominator" in this.matrixIds[0]) {
                // scale denominator calculation based on WMTS spec
                var denom = 
                    SuperMap.METERS_PER_INCH * 
                    SuperMap.INCHES_PER_UNIT[this.units] * 
                    this.map.getResolution() / 0.28E-3;
                var diff = Number.POSITIVE_INFINITY;
                var delta;
                for (var i=0, ii=this.matrixIds.length; i<ii; ++i) {
                    delta = Math.abs(1 - (this.matrixIds[i].scaleDenominator / denom));
                    if (delta < diff) {
                        diff = delta;
                        matrix = this.matrixIds[i];
                    }
                }
            } else {
                // fall back on zoom as index
                matrix = this.matrixIds[this.map.getZoom() + this.zoomOffset];
            }
        }
        return matrix;
    },
    
    /** 
     * Method: getTileInfo
     * Get tile information for a given location at the current map resolution.
     *
     * Parameters:
     * loc - {<SuperMap.LonLat} A location in map coordinates.
     *
     * Returns:
     * {Object} An object with "col", "row", "i", and "j" properties.  The col
     *     and row values are zero based tile indexes from the top left.  The
     *     i and j values are the number of pixels to the left and top 
     *     (respectively) of the given location within the target tile.
     */
    getTileInfo: function(loc) {
        var res = this.map.getResolution();
        
        var fx = (loc.lon - this.tileOrigin.lon) / (res * this.tileSize.w);
        var fy = (this.tileOrigin.lat - loc.lat) / (res * this.tileSize.h);

        var col = Math.floor(fx);
        var row = Math.floor(fy);
        
        return {
            col: col, 
            row: row,
            i: Math.floor((fx - col) * this.tileSize.w),
            j: Math.floor((fy - row) * this.tileSize.h)
        };
    },
    
    /**
     * Method: getURL
     * 
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * 
     * Returns:
     * {String} A URL for the tile corresponding to the given bounds.
     */
    getURL: function(bounds) {
        bounds = this.adjustBounds(bounds);
        var url = "";
        if (!this.tileFullExtent || this.tileFullExtent.intersectsBounds(bounds)) {            

            var center = bounds.getCenterLonLat();            
            var info = this.getTileInfo(center);
            var matrixId = this.matrix.identifier;

            if (this.requestEncoding.toUpperCase() === "REST") {

                // include 'version', 'layer' and 'style' in tile resource url
                //注掉关于version的信息var path = this.version + "/" + this.layer + "/" + this.style + "/";
                var path = this.layer + "/" + this.style + "/";

                // append optional dimension path elements
                if (this.dimensions) {
                    for (var i=0; i<this.dimensions.length; i++) {
                        if (this.params[this.dimensions[i]]) {
                            path = path + this.params[this.dimensions[i]] + "/";
                        }
                    }
                }

                // append other required path elements
                path = path + this.matrixSet + "/" + this.matrix.identifier + 
                    "/" + info.row + "/" + info.col + "." + this.formatSuffix;
                
                if (SuperMap.Util.isArray(this.url)) {
                    url = this.selectUrl(path, this.url);
                } else {
                    url = this.url;
                }
                if (!url.match(/\/$/)) {
                    url = url + "/";
                }
                url = url + path;

            } else if (this.requestEncoding.toUpperCase() === "KVP") {

                // assemble all required parameters
                var params = {
                    SERVICE: "WMTS",
                    REQUEST: "GetTile",
                    VERSION: this.version,
                    LAYER: this.layer,
                    STYLE: this.style,
                    TILEMATRIXSET: this.matrixSet,
                    TILEMATRIX: this.matrix.identifier,
                    TILEROW: info.row,
                    TILECOL: info.col,
                    FORMAT: this.format
                };
                if (SuperMap.Credential.CREDENTIAL) {
                    params[SuperMap.Credential.CREDENTIAL.name] = SuperMap.Credential.CREDENTIAL.getValue();
                }
                url = SuperMap.Layer.Grid.prototype.getFullRequestString.apply(this, [params]);

            }
        }
        return url;    
    },
    
    /**
     * APIMethod: mergeNewParams
     * 为 params 附加新值，图层会被自动刷新。
     * 仅在 KVP 方式的请求时有效。
     * 
     * Parameters:
     * newParams - {Object} 附加到 <params> 属性的新值。
     */
    mergeNewParams: function(newParams) {
        if (this.requestEncoding.toUpperCase() === "KVP") {
            return SuperMap.Layer.Grid.prototype.mergeNewParams.apply(
                this, [SuperMap.Util.upperCaseObject(newParams)]
            );
        }
    },

    CLASS_NAME: "SuperMap.Layer.WMTS"
});
