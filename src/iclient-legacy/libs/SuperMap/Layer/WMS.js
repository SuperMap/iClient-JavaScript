/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Layer/Grid.js
 * @requires SuperMap/Tile/Image.js
 */

/**
 * Class: SuperMap.Layer.WMS
 * 该类用来访问OGC地图服务网站的数据。
 *
 * SuperMap iServer 提供了 WMS（Web Map Service，Web 地图服务）服务，
 * 该服务符合 OGC（Open Geospatial Consortium，开放地理信息联盟）制定的 WMS 实现规范。
 * SuperMap iServer 目前支持1.1.1和1.3.0两个版本
 * 
 * Inherits from:
 *  - <SuperMap.Layer.Grid>
 */
SuperMap.Layer.WMS = SuperMap.Class(SuperMap.Layer.Grid, {

    /**
     * Constant: DEFAULT_PARAMS
     * {Object} 该类的默认值。
     */
    DEFAULT_PARAMS: { service: "WMS",
                      version: "1.1.1",
                      request: "GetMap",
                      styles: "",
                      format: "image/png"
                     },
    
    /**
     * Property: reproject
     * *Deprecated*. See http://trac.SuperMap.org/wiki/SphericalMercator
     * for information on the replacement for this functionality. 
     * {Boolean} Try to reproject this layer if its coordinate reference system
     *           is different than that of the base layer.  Default is false.  
     *           Set this in the layer options.  Should be set to false in 
     *           most cases.
     */
    reproject: false,
 
    /**
     * APIProperty: isBaseLayer
     * {Boolean} 是否是基础地图，默认为true。
     */
    isBaseLayer: true,
    
    /**
     * APIProperty: encodeBBOX
     * {Boolean} BBOX中的 “逗号”是否会被编码。默认为false。
     * 某些服务实现的WMS需要编码。
     */
    encodeBBOX: false,
    
    /** 
     * APIProperty: noMagic 
     * {Boolean} 如果设置为true，用TRANSPARENT=TRUE时图片格式不能自由转换
     *     image/jpeg 为 image/png 或者 image/gif 格式，而且不能用构造函数改变 isBaseLayer 属性。默认为false。
     */ 
    noMagic: false,
    
    /**
     * Property: yx
     * {Object} Keys in this object are EPSG codes for which the axis order
     *     is to be reversed (yx instead of xy, LatLon instead of LonLat), with
     *     true as value. This is only relevant for WMS versions >= 1.3.0.
     */
    yx: {'EPSG:4326': true},
    
    /**
     * Constructor: SuperMap.Layer.WMS
     * 构造函数，实例化一个WMS图层。
     *
     * 例如:
     *
     * 创建image/png格式的WMS图层
     * (code)
     * var url = "http://localhost:8090/iserver/services/map-china400/wms130/China";
     * var wms = new SuperMap.Layer.WMS("中国",url,{layers: "China"});
     *
     * (end)
     *
     * Parameters:
     * name - {String} 图层名字
     * url - {Array(String) or String} 图层的服务地址，是数组也可以是单个url，前者支持多地图服务轮询出图，大大提高显示速度
     *                (e.g. http://localhost:8090/iserver/services/map-china400/wms130/China)
     * params - {Object} 拥有键值对的对象。获取地图时必须的查询字符串参数和参数值。
     * options - {Object} 在该类及其父类总开放的属性。
     *
     * Allowed params properties:
     *
     * layers - {String} 地图图层列表，必设参数，地图图层之间以半角英文逗号进行分隔。最左边的图层在最底，下一个图层放到前一个的上面，依次类推。
     * 图层名称必须是 GetCapabilities 操作返回的文档中声明的 Name 元素或者Title元素的值。
     * format - {String} 地图的输出格式。格式类型可以是 PNG、GIF、JPEG、SVG、WebCGM 等。如："image/gif"。
     * version - {String} 请求版本号。现支持"1.1.1"和"1.3.0"。
     * transparent - {Boolean} 图层是否透明，默认为 false，即不透明。
     */
    initialize: function(name, url, params, options) {
        var newArguments = [];
        //uppercase params
        params = SuperMap.Util.upperCaseObject(params);
        if (parseFloat(params.VERSION) >= 1.3 && !params.EXCEPTIONS) {
            params.EXCEPTIONS = "INIMAGE";
        } 
        newArguments.push(name, url, params, options);
        SuperMap.Layer.Grid.prototype.initialize.apply(this, newArguments);
        SuperMap.Util.applyDefaults(
                       this.params, 
                       SuperMap.Util.upperCaseObject(this.DEFAULT_PARAMS)
                       );


        //layer is transparent        
        if (!this.noMagic && this.params.TRANSPARENT && 
            this.params.TRANSPARENT.toString().toLowerCase() === "true") {
            
            // unless explicitly set in options, make layer an overlay
            if ( (options == null) || (options.isBaseLayer==false) ) {
                this.isBaseLayer = false;
            } 
            
            // jpegs can never be transparent, so intelligently switch the 
            //  format, depending on the browser's capabilities
            if (this.params.FORMAT === "image/jpeg") {
                this.params.FORMAT = SuperMap.Util.alphaHack() ? "image/gif"
                                                                 : "image/png";
            }
        }

    },    

    /**
     * Method: destroy
     * Destroy this layer
     */
    destroy: function() {
        // for now, nothing special to do here. 
        SuperMap.Layer.Grid.prototype.destroy.apply(this, arguments);  
    },

    
    /**
     * Method: clone
     * Create a clone of this layer
     *
     * Returns:
     * {<SuperMap.Layer.WMS>} An exact clone of this layer
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new SuperMap.Layer.WMS(this.name,
                                           this.url,
                                           this.params,
                                           this.getOptions());
        }

        //get all additions from superclasses
        obj = SuperMap.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here

        return obj;
    },    
    
    /**
     * APIMethod: reverseAxisOrder
     * 在WMS标准大于等于1.3版本且投影为EPSG:4326时，坐标轴会被反转
     * yx会变成xy，LatLon会变成LonLat。
     * Returns:
     * {Boolean} 如果AxisOrder被倒转，则返回true，否则为false.
     */
    reverseAxisOrder: function() {
        var projCode = this.projection.getCode();
        return parseFloat(this.params.VERSION) >= 1.3 && 
            !!(this.yx[projCode] || this.yx === true);
    },
    
    /**
     * Method: getURL
     * Return a GetMap query string for this layer
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} A bounds representing the bbox for the
     *                                request.
     *
     * Returns:
     * {String} A string with the layer's url and parameters and also the
     *          passed-in bounds and appropriate tile size specified as 
     *          parameters.
     */
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        //以下两句对bounds进行截断，暂时用来解决bbox不是正方形的bug
        //var fix=4;
        //bounds=new SuperMap.Bounds(bounds.left.toFixed(fix),bounds.bottom.toFixed(fix),bounds.right.toFixed(fix),bounds.top.toFixed(fix));
        var imageSize = this.getImageSize();
        var newParams = {};
        // WMS 1.3 introduced axis order
        var reverseAxisOrder = this.reverseAxisOrder();
        newParams.BBOX = this.encodeBBOX ?
            bounds.toBBOX(null, reverseAxisOrder) :
            bounds.toArray(reverseAxisOrder);
        newParams.WIDTH = imageSize.w;
        newParams.HEIGHT = imageSize.h;
        if (SuperMap.Credential.CREDENTIAL) {
            newParams[SuperMap.Credential.CREDENTIAL.name] = SuperMap.Credential.CREDENTIAL.getValue();
        }
        var requestString = this.getFullRequestString(newParams);
        return requestString;
    },

    /**
     * APIMethod: mergeNewParams
     * 为 params 附加新值。该类重写父类的 mergeNewParams 方法。
     * 一旦参数改变，瓦片会使用这些新的参数加载图片。
     * 
     * Parameters:
     * newParams - {Object} 新参数。
     */
    mergeNewParams:function(newParams) {
        var upperParams = SuperMap.Util.upperCaseObject(newParams);
        var newArguments = [upperParams];
        return SuperMap.Layer.Grid.prototype.mergeNewParams.apply(this, 
                                                             newArguments);
    },

    /** 
     * APIMethod: getFullRequestString
     * 用图层的参数和附加的新参数组合url。
     *
     * Parameters:
     * newParams - {Object} 新的参数对象
     * altUrl - {String} 使用当前的url而代替图层的url。
     * 
     * Returns:
     * {String}返回组合后的url。
     */
    getFullRequestString:function(newParams, altUrl) {
        var mapProjection = this.map.getProjectionObject();
        var projectionCode = this.projection && this.projection.equals(mapProjection) ?
            this.projection.getCode() :
            mapProjection.getCode();
        var value = (projectionCode === "none") ? null : projectionCode;
        if (parseFloat(this.params.VERSION) >= 1.3) {
            this.params.CRS = value;
        } else {
            this.params.SRS = value;
        }
        
        if (typeof this.params.TRANSPARENT === "boolean") {
            newParams.TRANSPARENT = this.params.TRANSPARENT ? "TRUE" : "FALSE";
        }

        return SuperMap.Layer.Grid.prototype.getFullRequestString.apply(
                                                    this, arguments);
    },

    CLASS_NAME: "SuperMap.Layer.WMS"
});
