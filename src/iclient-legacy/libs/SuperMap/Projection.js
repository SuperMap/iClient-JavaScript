/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Projection
 * 坐标转换类。这个类封装了与 proj4js 投影对象进行交互的几种方法。
 * 
 * SuperMap 默认支持 EPSG:4326, CRS:84, urn:ogc:def:crs:EPSG:6.6:4326, EPSG:900913, EPSG:3857,
 * EPSG:102113, EPSG:102100 投影间的转换。
 *   
 * 对于 SuperMap 不支持或者用户想要自定义投影类型，可通过下载 proj4js 产品包，并引入产品包中的 proj4js.js
 * 实现自定义的投影转换。
 * 具体方法可以参见开发指南《坐标投影转换》。
 *  
 * 目前 proj4js 支持的投影种类有：
 * WGS84, EPSG:4326, EPSG:4269, EPSG:3875, EPSG:3785, EPSG4139,EPSG:4181, EPSG:4272, EPSG:4302, EPSG:21781,  
 * EPSG:102113,EPSG:26591,EPSG:26912, EPSG:27200, EPSG:27563, EPSG:41001, EPSG:42304,EPSG:102067, EPSG:102757, 
 * EPSG:102758, EPSG:900913, GOOGLE
 * 
 */
SuperMap.Projection = SuperMap.Class({

    /**
     * Property: proj
     * {Object} Proj4js.Proj instance.
     */
    proj: null,
    
    /**
     * APIProperty: projCode
     * {String} 投影编码。
     */
    projCode: null,
    
    /**
     * Property: titleRegEx
     * {RegExp} regular expression to strip the title from a proj4js definition
     */
    titleRegEx: /\+title=[^\+]*/,

    /**
     * Constructor: SuperMap.Projection
     *
     * Parameters:
     * projCode - {String} 投影编码。
     * options - {Object} 设置图层上的的附加属性。
     * 
     * (code)
     * var geographic = new SuperMap.Projection("EPSG:4326");
     * (end)
     *  
     * Returns:
     * {<SuperMap.Projection>} 投影对象。
     */
    initialize: function(projCode, options) {
        SuperMap.Util.extend(this, options);
        this.projCode = projCode;
        if (window.Proj4js) {
            this.proj = new Proj4js.Proj(projCode);
        }
    },
    
    /**
     * APIMethod: getCode
     * 获取SRS代码字符串。
     *
     * Returns:
     * {String} SRS代码。
     */
    getCode: function() {
        return this.proj ? this.proj.srsCode : this.projCode;
    },
   
    /**
     * APIMethod: getUnits
     * 获取投影的单位字符串。如果 proj4js 不可用则返回null。
     *
     * Returns:
     * {String} 获取的单位。
     */
    getUnits: function() {
        return this.proj ? this.proj.units : null;
    },

    /**
     * Method: toString
     * 将投影转换为字符串(内部封装了getCode方法)
     *
     * Returns:
     * {String} 投影代码。
     */
    toString: function() {
        return this.getCode();
    },

    /**
     * Method: equals
     * Test equality of two projection instances.  Determines equality based
     *     soley on the projection code.
     *
     * Returns:
     * {Boolean} The two projections are equivalent.
     */
    equals: function(projection) {
        var p = projection, equals = false;
        if (p) {
            if (!(p instanceof SuperMap.Projection)) {
                p = new SuperMap.Projection(p);
            }
            if (window.Proj4js && this.proj.defData && p.proj.defData) {
                equals = this.proj.defData.replace(this.titleRegEx, "") ===
                    p.proj.defData.replace(this.titleRegEx, "");
            } else if (p.getCode) {
                var source = this.getCode(), target = p.getCode();
                equals = source === target ||
                    !!SuperMap.Projection.transforms[source] &&
                    SuperMap.Projection.transforms[source][target] ===
                        SuperMap.Projection.nullTransform;
            }
        }
        return equals;   
    },

    /* Method: destroy
     * Destroy projection object.
     */
    destroy: function() {
        delete this.proj;
        delete this.projCode;
    },
    
    CLASS_NAME: "SuperMap.Projection" 
});     

/**
 * Property: transforms
 * Transforms is an object, with from properties, each of which may
 * have a to property. This allows you to define projections without 
 * requiring support for proj4js to be included.
 *
 * This object has keys which correspond to a 'source' projection object.  The
 * keys should be strings, corresponding to the projection.getCode() value.
 * Each source projection object should have a set of destination projection
 * keys included in the object. 
 * 
 * Each value in the destination object should be a transformation function,
 * where the function is expected to be passed an object with a .x and a .y
 * property.  The function should return the object, with the .x and .y
 * transformed according to the transformation function.
 *
 * Note - Properties on this object should not be set directly.  To add a
 *     transform method to this object, use the <addTransform> method.  For an
 *     example of usage, see the SuperMap.Layer.SphericalMercator file.
 */
SuperMap.Projection.transforms = {};

/**
 * APIProperty: defaults
 * {Object} SuperMap 默认支持 EPSG:4326, CRS:84, urn:ogc:def:crs:EPSG:6.6:4326, EPSG:900913, EPSG:3857,
 * EPSG:102113, EPSG:102100 投影间的转换。defaults 定义的关键字为坐标系统编码，相应的属性值为
 * units, maxExtent(坐标系统的有效范围)和yx(当坐标系统有反向坐标轴时为true) 
 */
SuperMap.Projection.defaults = {
    "EPSG:4326": {
        units: "degrees",
        maxExtent: [-180, -90, 180, 90],
        yx: true
        //maxResolution:1.40625
    },
    "CRS:84": {
        units: "degrees",
        maxExtent: [-180, -90, 180, 90]
    },
    "EPSG:900913": {
        units: "m",
        maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
    },
    "EPSG:3857": {
        units: "m",
        maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
    }
};

/** 
 * APIMethod: addTransform
 * 设置自定义投影转换方法。在proj4js库不可用或者自定义的投影需要处理时使用此方法。
 *
 * Parameters:
 * from - {String} 源投影代码。
 * to - {String} 目标投影代码。
 * method - {Function} 将作为参数的点的源投影转化为目标投影的方法。
 */
SuperMap.Projection.addTransform = function(from, to, method) {
    if (method === SuperMap.Projection.nullTransform) {
        var defaults = SuperMap.Projection.defaults[from];
        if (defaults && !SuperMap.Projection.defaults[to]) {
            SuperMap.Projection.defaults[to] = defaults;
        }
    }
    if(!SuperMap.Projection.transforms[from]) {
        SuperMap.Projection.transforms[from] = {};
    }
    SuperMap.Projection.transforms[from][to] = method;
};

/**
 * APIMethod: transform
 * 点投影转换。
 * 
 * Parameters:
 * point - {<SuperMap.Geometry.Point> | Object} 带有x,y坐标的点对象。
 * source - {SuperMap.Projection} 源地图坐标系统。
 * dest - {SuperMap.Projection} 目标地图坐标系统。
 *
 * Returns:
 * point - {object} 转换后的坐标。
 */
SuperMap.Projection.transform = function(point, source, dest) {
    if (source && dest) {
        if (!(source instanceof SuperMap.Projection)) {
            source = new SuperMap.Projection(source);
        }
        if (!(dest instanceof SuperMap.Projection)) {
            dest = new SuperMap.Projection(dest);
        }
        if (source.proj && dest.proj) {
            point = Proj4js.transform(source.proj, dest.proj, point);
        }
        else {
            var sourceCode = source.getCode();
            var destCode = dest.getCode();
            var transforms = SuperMap.Projection.transforms;
            if (transforms[sourceCode] && transforms[sourceCode][destCode]) {
                transforms[sourceCode][destCode](point);
            }
        }
    }
    return point;
};

/**
 * APIFunction: nullTransform
 * 空转换，有用的定义投影的别名时proj4js不可用：当proj4js不可用时，用来定义投影的别名。
 *
 * (code)
 * SuperMap.Projection.addTransform("EPSG:4326", "EPSG:3857",
 *     SuperMap.Layer.SphericalMercator.projectForward);
 * SuperMap.Projection.addTransform("EPSG:3857", "EPSG:3857",
 *     SuperMap.Layer.SphericalMercator.projectInverse);
 * SuperMap.Projection.addTransform("EPSG:3857", "EPSG:900913",
 *     SuperMap.Projection.nullTransform);
 * SuperMap.Projection.addTransform("EPSG:900913", "EPSG:3857",
 *     SuperMap.Projection.nullTransform);
 * (end)
 */
SuperMap.Projection.nullTransform = function(point) {
    return point;
};

/**
 * Note: Transforms for web mercator <-> geographic
 * SuperMap recognizes EPSG:3857, EPSG:900913, EPSG:102113 and EPSG:102100.
 * SuperMap originally started referring to EPSG:900913 as web mercator.
 * The EPSG has declared EPSG:3857 to be web mercator.
 * ArcGIS 10 recognizes the EPSG:3857, EPSG:102113, and EPSG:102100 as
 * equivalent.  See http://blogs.esri.com/Dev/blogs/arcgisserver/archive/2009/11/20/ArcGIS-Online-moving-to-Google-_2F00_-Bing-tiling-scheme_3A00_-What-does-this-mean-for-you_3F00_.aspx#12084.
 * For geographic, SuperMap recognizes EPSG:4326, CRS:84 and
 * urn:ogc:def:crs:EPSG:6.6:4326. SuperMap also knows about the reverse axis
 * order for EPSG:4326. 
 */
(function() {

    var pole = 20037508.34;

    function inverseMercator(xy) {
        xy.x = 180 * xy.x / pole;
        xy.y = 180 / Math.PI * (2 * Math.atan(Math.exp((xy.y / pole) * Math.PI)) - Math.PI / 2);
        return xy;
    }

    function forwardMercator(xy) {
        xy.x = xy.x * pole / 180;
        //xy.y = xy.y<-90?-89.99:xy.y;//经纬度转换为墨卡托，当纬度值小于-90时，转换后的结果为NaN，故不能超过范围
        //xy.y = xy.y>90?89.99:xy.y;
        xy.y = Math.log(Math.tan((90 + xy.y) * Math.PI / 360)) / Math.PI * pole;
        return xy;
    }

    function map(base, codes) {
        var add = SuperMap.Projection.addTransform;
        var same = SuperMap.Projection.nullTransform;
        var i, len, code, other, j;
        for (i=0, len=codes.length; i<len; ++i) {
            code = codes[i];
            add(base, code, forwardMercator);
            add(code, base, inverseMercator);
            for (j=i+1; j<len; ++j) {
                other = codes[j];
                add(code, other, same);
                add(other, code, same);
            }
        }
    }
    
    // list of equivalent codes for web mercator
    var mercator = ["EPSG:900913", "EPSG:3857", "EPSG:102113", "EPSG:102100"],
        geographic = ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"],
        i;
    for (i=mercator.length-1; i>=0; --i) {
        map(mercator[i], geographic);
    }
    for (i=geographic.length-1; i>=0; --i) {
        map(geographic[i], mercator);
    }

})();