/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.PointWithMeasure
 * 路由点类。
 * 路由点是指具有线性度量值(Measure)的二维地理坐标点。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.Point>
 */
SuperMap.REST.PointWithMeasure = SuperMap.Class(SuperMap.Geometry.Point, {
    
    /** 
     * APIProperty: x
     * {Number} 获取当前点对象在地理坐标系下的 X 坐标值。
     */
    x: null,
    
    /** 
     * APIProperty: y
     * {Number} 获取当前点对象在地理坐标系下的 Y 坐标值。
     */
    y: null,
    
    /** 
     * APIProperty: measure
     * {Number} 度量值，即路由对象属性值 M。
     */
    measure: null,
    
    /**
     * Constructor: SuperMap.REST.PointWithMeasure
     * 路由点类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * measure - {Number} 度量值，即路由对象属性值 M。
     * x - {Number} 获取当前点对象在地理坐标系下的 X 坐标值。
     * y - {Number} 获取当前点对象在地理坐标系下的 Y 坐标值。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    /**
     * APIMethod: equals
     * 判断两个路由点对象是否相等。如果两个路由点对象具有相同的坐标以及度量值，则认为是相等的。
     *
     * Parameters:
     * geom - {<SuperMap.REST.PointWithMeasure>} 需要判断的路由点对象。
     *
     * Returns:
     * {Boolean} 两个路由点对象是否相等（true为相等，false为不等）。
     */
    equals: function(geom) {
        var equals = false;
        if (geom != null) {
            equals = ((this.x === geom.x && this.y === geom.y && this.measure === geom.measure) ||
                (isNaN(this.x) && isNaN(this.y) && isNaN(this.measure) && isNaN(geom.x) && isNaN(geom.y) && isNaN(geom.measure)));
        }
        return equals;
    },
    /**
     * Method: toJson
     * 转换为json对象。
     */
    toJson:function(){
        var result = "{";
        if(this.measure!=null && this.measure!=undefined)
        {
            result+="\"measure\":"+this.measure +",";
        }
        result+= "\"x\":"+this.x +",";
        result+= "\"y\":"+this.y;
        result += "}";
        return result;
    },
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.measure = null;
        me.x = null;
        me.y = null;
    },
    
    CLASS_NAME: "SuperMap.REST.PointWithMeasure"
});

/**
 * Function: SuperMap.REST.PointWithMeasure.fromJson
 * 将 JSON 对象转换为 PointWithMeasure 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的路由点。 
 *
 * Returns:
 * {<SuperMap.REST.PointWithMeasure>} 转化后的 PointWithMeasure 对象。
 */
SuperMap.REST.PointWithMeasure.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.PointWithMeasure({
        x: jsonObject.x,
        y: jsonObject.y,
        measure: jsonObject.measure
    });
};