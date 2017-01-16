/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry/Collection.js
 * @requires SuperMap/Geometry/Point.js
 */

/**
 * Class: SuperMap.Geometry.MultiPoint
 *
 * Inherits from:
 *  - <SuperMap.Geometry.Collection>
 *  - <SuperMap.Geometry>
 */
SuperMap.Geometry.MultiPoint = SuperMap.Class(
  SuperMap.Geometry.Collection, {

    /**
     * Property: componentTypes
     * {Array(String)} An array of class names representing the types of
     * components that the collection can include.  A null value means the
     * component types are not restricted.
     */
    componentTypes: ["SuperMap.Geometry.Point"],

    /**
     * Constructor: SuperMap.Geometry.MultiPoint
     * 实例化 MultiPoint 几何对象。
     * 
     * (code)
     * var point1 = new SuperMap.Geometry.Point(5,6);
     * var poine2 = new SuperMap.Geometry.Point(7,8);
     * var multiPoint = new SuperMap.Geometry.MultiPoint([point1,point2]);       
     * (end)
     * 
     * Parameters:
     * components - {Array(<SuperMap.Geometry.Point>)}点对象数组。
     *
     * Returns:
     * {<SuperMap.Geometry.MultiPoint>}
     */
     
    initialize: function(components) {
        SuperMap.Geometry.Collection.prototype.initialize.apply(this,
                                                                  arguments);
    },

    /**
     * APIMethod: addPoint
     * 添加点，封装了 <SuperMap.Geometry.Collection.addComponent>}方法。
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>} 添加的点。
     * index - {Integer} 可选的下标。
     */
    addPoint: function(point, index) {
        this.addComponent(point, index);
    },
    
    /**
     * APIMethod: removePoint
     * 移除点,封装了 <SuperMap.Geometry.Collection.removeComponent> 方法。
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>} 移除的点对象。
     */
    removePoint: function(point){
        this.removeComponent(point);
    },

    CLASS_NAME: "SuperMap.Geometry.MultiPoint"
});
