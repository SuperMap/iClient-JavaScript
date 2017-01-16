/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry/MultiPoint.js
 */

/**
 * Class: SuperMap.Geometry.Curve
 * 几何对象曲线类。
 * 
 * Inherits: 
 *  - <SuperMap.Geometry.MultiPoint>
 */
SuperMap.Geometry.Curve = SuperMap.Class(SuperMap.Geometry.MultiPoint, {

    /**
     * Property: componentTypes
     * {Array(String)} An array of class names representing the types of 
     *                 components that the collection can include.  A null 
     *                 value means the component types are not restricted.
     */
    componentTypes: ["SuperMap.Geometry.Point", "SuperMap.REST.PointWithMeasure"],

    /**
     * Constructor: SuperMap.Geometry.Curve
     * 实例化曲线几何对象类。
     *
     * Parameters:
     * point - {Array(<SuperMap.Geometry.Point>)} 
     *      
     * (code)      
     * var point1 = new SuperMap.Geometry.Point(10,20);     
     * var point2 = new SuperMap.Geometry.Point(30,40);
     * var curve = new SuperMap.Geometry.Curve([point1,point2]);
     * (end) 
     */
     
     initialize: function(points) {
         SuperMap.Geometry.MultiPoint.prototype.initialize.apply(this,
                                                                   arguments);
     },
    
    /**
     * APIMethod: getLength
     * 获取曲线的总长度。
     * Returns:
     * {Float} 曲线对象的长度。
     */
    getLength: function() {
        var length = 0.0;
        if ( this.components && (this.components.length > 1)) {
            for(var i=1, len=this.components.length; i<len; i++) {
                length += this.components[i-1].distanceTo(this.components[i]);
            }
        }
        return length;
    },

    /**
     * APIMethod: getGeodesicLength
     * 计算几何对象投影到球面上的近似大地测量长度。
     *
     * projection - {<SuperMap.Projection>} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     * 
     * Returns:
     * {Float} 几何图形的近似大地测量长度，单位：meters。
     */
    getGeodesicLength: function(projection) {
        var geom = this;  // so we can work with a clone if needed
        if(projection) {
            var gg = new SuperMap.Projection("EPSG:4326");
            if(!gg.equals(projection)) {
                geom = this.clone().transform(projection, gg);
            }
        }
        var length = 0.0;
        if(geom.components && (geom.components.length > 1)) {
            var p1, p2;
            for(var i=1, len=geom.components.length; i<len; i++) {
                p1 = geom.components[i-1];
                p2 = geom.components[i];
                // this returns km and requires lon/lat properties
                length += SuperMap.Util.distVincenty(
                    {lon: p1.x, lat: p1.y}, {lon: p2.x, lat: p2.y}
                );
            }
        }
        // convert to m
        return length * 1000;
    },

    CLASS_NAME: "SuperMap.Geometry.Curve"
});
