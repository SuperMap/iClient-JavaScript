/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Filter.js
 */

/**
 * Class: SuperMap.Filter.Spatial
 * 这个类代表一个空间过滤器。
 * 目前应用的有： BBOX，DWithin 和 Intersects
 * 
 * Inherits from:
 * - <SuperMap.Filter>
 */
SuperMap.Filter.Spatial = SuperMap.Class(SuperMap.Filter, {

    /**
     * APIProperty: type
     * {String} 空间过滤器的类型。
     *
     * 类型应该是下面其中之一:
     * - SuperMap.Filter.Spatial.BBOX
     * - SuperMap.Filter.Spatial.INTERSECTS
     * - SuperMap.Filter.Spatial.DWITHIN
     * - SuperMap.Filter.Spatial.WITHIN
     * - SuperMap.Filter.Spatial.CONTAINS
     */
    type: null,
    
    /**
     * APIProperty: property
     * {String} 用来比较的指定上下文的属性名称。
     */
    property: null,
    
    /**
     * APIProperty: value
     * {<SuperMap.Bounds> || <SuperMap.Geometry>} 被过滤器使用的bounds或geometry。
     *     bounds应用于BBOX过滤器，geometry应用于INTERSECTS或DWITHIN过滤器。
     */
    value: null,

    /**
     * APIProperty: distance
     * {Number} 应用于DWithin空间过滤器中的距离属性。
     */
    distance: null,

    /**
     * APIProperty: distanceUnits
     * {String} 距离属性的单位，例如：'m'。
     */
    distanceUnits: null,
    
    /** 
     * Constructor: SuperMap.Filter.Spatial
     * 创建一个空间过滤器。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性应用于过滤器。
     * 
     * Returns:
     * {<SuperMap.Filter.Spatial>}
     */

   /**
    * Method: evaluate
    * 判定空间要素是否被过滤。
    * 
    * Parameters:
    * feature - {<SuperMap.Feature.Vector>} 应用这个过滤器的要素。
    * 
    * Returns:
    * {Boolean} 判定要素是否达到过滤标准。true：不过滤，false：被过滤掉。
    */
    evaluate: function(feature) {
        var intersect = false;
        switch(this.type) {
            case SuperMap.Filter.Spatial.BBOX:
            case SuperMap.Filter.Spatial.INTERSECTS:
                if(feature.geometry) {
                    var geom = this.value;
                    if(this.value.CLASS_NAME === "SuperMap.Bounds") {
                        geom = this.value.toGeometry();
                    }
                    if(feature.geometry.intersects(geom)) {
                        intersect = true;
                    }
                }
                break;
            default:
                throw new Error('evaluate is not implemented for this filter type.');
        }
        return intersect;
    },

    /**
     * APIMethod: clone
     * 复制过滤器。
     * 
     * Returns:
     * {<SuperMap.Filter.Spatial>} 过滤器的副本。
     */
    clone: function() {
        var options = SuperMap.Util.applyDefaults({
            value: this.value && this.value.clone && this.value.clone()
        }, this);
        return new SuperMap.Filter.Spatial(options);
    },
    CLASS_NAME: "SuperMap.Filter.Spatial"
});

SuperMap.Filter.Spatial.BBOX = "BBOX";
SuperMap.Filter.Spatial.INTERSECTS = "INTERSECTS";
SuperMap.Filter.Spatial.DWITHIN = "DWITHIN";
SuperMap.Filter.Spatial.WITHIN = "WITHIN";
SuperMap.Filter.Spatial.CONTAINS = "CONTAINS";
