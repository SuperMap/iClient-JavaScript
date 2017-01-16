/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.LonLat
 * 这个类用来表示经度和纬度对。
 */
SuperMap.LonLat = SuperMap.Class({

    /** 
     * APIProperty: lon
     * {Float} 地图的单位的X轴（横轴）坐标，默认为0.0。
     */
    lon: 0.0,
    
    /** 
     * APIProperty: lat
     * {Float} 地图的单位的Y轴（纵轴）坐标，默认为0.0。
     */
    lat: 0.0,

    /**
     * Constructor: SuperMap.LonLat
     * 创建一个新的地图位置对象。如：
     * (start code)
     *  var lonLat = new SuperMap.LonLat(30,45);
     *  (end) 
     * 	 
     * Parameters (two arguments):
     * lon - {Number} 地图单位上的X轴坐标，如果地图是地理投影，则此值是经度，否则，此值是地图地理位置的x坐标。 
     * lat - {Number} 地图单位上的Y轴坐标，如果地图是地理投影，则此值是纬度，否则，此值是地图地理位置的y坐标。
     *
     * Parameters (single argument):
     * location - {Array(Float)} [lon, lat]  横纵坐标组成的数组。
     */
    initialize: function(lon, lat) {
        if (SuperMap.Util.isArray(lon)) {
            lat = lon[1];
            lon = lon[0];
        }
        this.lon = lon?SuperMap.Util.toFloat(lon):this.lon;
        this.lat = lat?SuperMap.Util.toFloat(lat):this.lat;
    },
    
    /**
     * APIMethod: toString
     * 返回此对象的字符串形式
     *
     * 例如:
     * (start code)
     * var lonLat = new SuperMap.LonLat(100,50);
     * var str = lonLat.toString();
     * (end)
     *
     * Returns:
     * {String} 例如: "lon=100,lat=50"
     */
    toString:function() {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    },

    /** 
     * APIMethod: toShortString
     * 将经度纬度转换成简单字符串。
     *
     * 例如:
     * (start code)
     * var lonLat = new SuperMap.LonLat(100,50);
     * var str = lonLat.toShortString();
     * (end)
     * 
     * Returns:
     * {String} 返回处理后的经纬度字符串。例如："100,50"
     */
    toShortString:function() {
        return (this.lon + "," + this.lat);
    },

    /** 
     * APIMethod: clone
     * 复制坐标对象，并返回复制后的新对象。
     *
     * 例如:
     * (start code)
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * var lonLat2 = lonLat1.clone();
     * (end)
     * 
     * Returns:
     * {<SuperMap.LonLat>}  返回相同坐标值的新的坐标对象。
     */
    clone:function() {
        return new SuperMap.LonLat(this.lon, this.lat);
    },

    /** 
     * APIMethod: add
     * 在已有坐标对象的经纬度基础上加上新的坐标经纬度，并返回新的坐标对象。
     *
     * 例如:
     * (start code)
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * //lonLat2 是新的对象
     * var lonLat2 = lonLat1.add(100,50);
     * (end)
     * 
     * Parameters:
     * lon - {Float} 传入的精度参数。
     * lat - {Float} 传入的纬度参数。
     * 
     * Returns:
     * {<SuperMap.LonLat>} 返回一个新的LonLat对象，此对象的经纬度是由传
     *      入的经纬度与当前的经纬度相加所得。
     */
    add:function(lon, lat) {
        if ( (lon == null) || (lat == null) ) {
            throw new TypeError('LonLat.add cannot receive null values');
        }
        return new SuperMap.LonLat(this.lon + SuperMap.Util.toFloat(lon), 
                                     this.lat + SuperMap.Util.toFloat(lat));
    },

    /** 
     * APIMethod: equals
     * 判断两个坐标对象是否相等。
     *
     * 例如:
     * (start code)
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * var lonLat2 = new SuperMap.LonLat(100,50);
     * var isEquals = lonLat1.equals(lonLat2);
     * (end)
     * 
     * Parameters:
     * ll - {<SuperMap.LonLat>} 需要进行比较的坐标对象。
     * 
     * Returns:
     * {Boolean} 如果LonLat对象的经纬度和传入的经纬度一致则返回true,不一
     *      致或传入的ll参数为NULL则返回false。
     */
    equals:function(ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon === ll.lon && this.lat === ll.lat) ||
                      (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    },

    /**
     * APIMethod: transform
     * 经纬度对象的投影转换。
     * （在自身上做投影转换）
     *
     * 例如:
     * (start code)
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * //这里 lonLat1 = lonLat2
     * var lonLat2 = lonLat1.transform(
     *      new SuperMap.Projection("EPSG:4326"),
     *      new SuperMap.Projection("EPSG:3857")
     *  );
     * (end)
     *
     * Parameters: 
     * source - {<SuperMap.Projection>} 源投影 
     * dest   - {<SuperMap.Projection>} 目标投影 
     *
     * Returns:
     * {<SuperMap.LonLat>} 返回转换后的LonLat（坐标对象）。
     */
    transform: function(source, dest) {
        var point = SuperMap.Projection.transform(
            {'x': this.lon, 'y': this.lat}, source, dest);
        this.lon = point.x;
        this.lat = point.y;
        return this;
    },
    
    /**
     * APIMethod: wrapDateLine
     * 通过传入的范围对象对坐标对象转换到该范围内。
     * 如果经度小于给定范围最小精度，则在原经度基础上加上范围宽度，
     * 直到精度在范围内为止，如果经度大于给定范围则在原经度基础上减去范围宽度。
     * 换句话说就是将不在经度范围内的坐标转换到范围以内。
     *  （只会转换lon，不会转换lat，主要用于转移到日界线以内）
     *
     * 例如:
     * (start code)
     * var lonLat1 = new SuperMap.LonLat(420,50);
     * var lonLat2 = lonLat1.wrapDateLine(
     *      new SuperMap.Bounds(-180,-90,180,90)
     *  );
     * (end)
     * 
     * Parameters:
     * maxExtent - {<SuperMap.Bounds>} 最大边界的范围。
     * 
     * Returns:
     * {<SuperMap.LonLat>} 将坐标转换到范围对象以内，并返回新的坐标。
     */
    wrapDateLine: function(maxExtent) {    

        var newLonLat = this.clone();
    
        if (maxExtent) {
            //shift right?
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon +=  maxExtent.getWidth();
            }    
           
            //shift left?
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }    
        }
                
        return newLonLat;
    },
    /**
     *
     * APIMethod: destroy
     * 销毁此对象。
     * 销毁后此对象的所有属性为null，而不是初始值。
     *
     * 例如:
     * (start code)
     * var lonLat = new SuperMap.LonLat(100,50);
     * lonLat.destroy();
     * (end)
     *
     */
    destroy: function() {
        this.lon = null;
        this.lat = null;
    },

    CLASS_NAME: "SuperMap.LonLat"
});

/** 
 * APIMethod: fromString
 * 通过字符串生成一个<SuperMap.LonLat>对象
 *
 * 例如:
 * (start code)
 * var str = "100,50";
 * var lonLat = SuperMap.LonLat.fromString(str);
 * (end)
 * 
 * Parameters:
 * str - {String} 字符串的格式：Lon+","+Lat。如："100,50"
 * 
 * Returns:
 * {<SuperMap.LonLat>} 返回一个 <SuperMap.LonLat> 对象
 */
SuperMap.LonLat.fromString = function(str) {
    var pair = str.split(",");
    return new SuperMap.LonLat(pair[0], pair[1]);
};

/** 
 * APIMethod: fromArray
 * 通过数组生成一个<SuperMap.LonLat>对象
 * 
 * Parameters:
 * arr - {Array(Float)} 数组的格式，长度只能为2,：[Lon,Lat]。如： [5,-42]
 * 
 * Returns:
 * {<SuperMap.LonLat>} 返回一个 <SuperMap.LonLat> 对象
 */
SuperMap.LonLat.fromArray = function(arr) {
    var gotArr = SuperMap.Util.isArray(arr),
        lon = gotArr && arr[0],
        lat = gotArr && arr[1];
    return new SuperMap.LonLat(lon, lat);
};
