/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Graphic
 * 要素类组合了地理和属性，Graphic 类同时具有 style、attributes和geometry 属性。
 */
SuperMap.Graphic = SuperMap.Class({

    ///**
    // * Property: layer
    // * {<SuperMap.Layer>}
    // */
    //layer: null,

    /** 
     * Property: id 
     * {String} 
     */
    id: null,

    /**
     * APIProperty: geometry
     * {<SuperMap.Geometry.Point>} 该属性用于存放几何信息。
     */
    geometry: null,

    /**
     * APIProperty: attributes
     * {Object} 描述要素的任意的可序列化属性。
     */
    attributes: null,

    /**
     * APIProperty: style
     * {<SuperMap.Style>} 要素的样式属性,目前支持<SuperMap.Style.Circle>和<SuperMap.Style.RegularShape>。
     */
    style: null,

    /**
     * Constructor: SuperMap.Graphic
     * 实例化矢量要素。
     * (code)
     *  var geometry = new SuperMap.Geometry.Point(-115,10);
     *  var style = {
     *      iamge: new SuperMap.Style.Circle({
     *       opacity: 1.0,
     *       scale: 1.0,
     *       radius: 6,
     *       fill: new SuperMap.Style.Fill({
     *           color: "rgba(238, 153, 0, 0.4)"
     *       }),
     *       stroke: new SuperMap.Style.Stroke({
     *           color: "rgba(238,153,0,1)",
     *           width: 1
     *       })
     *   })
     *  }
     *  var pointGraphic = new SuperMap.Graphic(geometry,null,style);
     *  graphicLayer.addGraphics(pointGraphic);
     * (end)
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry.Point>} 代表要素的几何点要素。
     * attributes - {Object} 描述要素的任意的可序列化属性，将要映射到 attributes 属性中的可选对象。
     * style - {Object} 一个可选的样式对象。
     */
    initialize: function(geometry, attributes, style) {
        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME+ "_");
        this.geometry = geometry ? geometry : null;
        this.attributes = {};
        if (attributes) {
            this.attributes = SuperMap.Util.extend(this.attributes,
                attributes);
        }
        this.style = style ? style : null;
    },

    /**
     * Method: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        this.id = null;
        this.geometry = null;
        this.attributes = null;
        this.style = null;
    },

    /**
     * Method: clone
     * Create a clone of this vector graphic.  Does not set any non-standard
     *     properties.
     *
     * Returns:
     * {<SuperMap.Graphic>} An exact clone of this graphic.
     */
    clone: function () {
        return new SuperMap.Graphic(
            this.geometry ? this.geometry.clone() : null,
            this.attributes,
            this.style);
    },

    CLASS_NAME: "SuperMap.Graphic"
});
