/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry/Collection.js
 * @requires SuperMap/Geometry/Polygon.js
 */

/**
 * Class: SuperMap.Geometry.MultiPolygon
 * 
 * Inherits from:
 *  - <SuperMap.Geometry.Collection>
 */
SuperMap.Geometry.MultiPolygon = SuperMap.Class(
  SuperMap.Geometry.Collection, {

    /**
     * Property: componentTypes
     * {Array(String)} An array of class names representing the types of
     * components that the collection can include.  A null value means the
     * component types are not restricted.
     */
    componentTypes: ["SuperMap.Geometry.Polygon"],

    /**
     * Constructor: SuperMap.Geometry.MultiPolygon
     * 实例化 MultiPolygon 对象。
     *
     * Parameters:
     * components - {Array(<SuperMap.Geometry.Polygon>)} 形成 MultiPolygon 的多边形数组。
     * 
     * (code)
     * var points1 = [new SuperMap.Geometry.Point(10,10),new SuperMap.Geometry.Point(0,0)];
     * var points2 = [new SuperMap.Geometry.Point(10,10),new SuperMap.Geometry.Point(0,0),new SuperMap.Geometry.Point(3,3),new SuperMap.Geometry.Point(10,10)];
     * 
     * var linearRing1 = new SuperMap.Geometry.LinearRing(points1);
     * var linearRing2 = new SuperMap.Geometry.LinearRing(points2);
     * 
     * var polygon1 = new SuperMap.Geometry.Polygon([linearRing1]);
     * var polygon2 = new SuperMap.Geometry.Polygon([linearRing2]);
     *     
     * var multiPolygon1 = new SuperMap.Geometry.MultiPolygon([polygon1,polygon2]); 
     * (end)
     */
     
    initialize: function(components) {
        SuperMap.Geometry.Collection.prototype.initialize.apply(this,
                                                                  arguments);
    },

    CLASS_NAME: "SuperMap.Geometry.MultiPolygon"
});
