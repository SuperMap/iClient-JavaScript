/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Protocol/WFS/v1.js
 * @requires SuperMap/Format/WFST/v1_1_0.js
 */

/**
 * Class: SuperMap.Protocol.WFS.v1_1_0
 * 矢量图层的一个对应WFS v1.1.0的协议。使用 <SuperMap.Protocol.WFS.v1_1_0>
 *       构造函数创建一个新实例。
 *
 *  
 * Inherits from:
 *  - <SuperMap.Protocol.WFS.v1>
 */
SuperMap.Protocol.WFS.v1_1_0 = SuperMap.Class(SuperMap.Protocol.WFS.v1, {
    
    /**
     * Property: version
     * {String} WFS version number.
     */
    version: "1.1.0",
    
    /**
     * Constructor: SuperMap.Protocol.WFS.v1_1_0
     * 对应于给定图层的WFS v1.1.0协议的类。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性将被设置到实例。
     *
     * 有效地options属性:
     * featureType - {String} 要素类型名(必要的)，可以理解成数据集（不带数据
     *      源前缀）。
     * featureNS - {String} 要素的命名空间 (可选)。
     * featurePrefix - {String} F要素的命名空间别名 (可选 - 只有当featureNS被提供
     *     了才会被使用)。 默认值是 'feature'。可以理解成“数据源”。
     * geometryName - {String} 几何图形属性的名称。  默认值是 'the_geom'。
     * outputFormat - {String} （可选的）WFS获取Feature请求后的返回格式。可以设置任意的格式，
     * 如果输出格式不为GML3, GML2 或 JSON，需要设置一个合适的readFormat。
     * readFormat - {<SuperMap.Format>} 如果除数格式不是GML3, GML2 或 JSON中的一个，
     * 需要设置的一个合适的格式解析器
     */
    initialize: function(options) {
        SuperMap.Protocol.WFS.v1.prototype.initialize.apply(this, arguments);
        if (this.outputFormat && !this.readFormat) {
            if (this.outputFormat.toLowerCase() === "gml2") {
                this.readFormat = new SuperMap.Format.GML.v2({
                    featureType: this.featureType,
                    featureNS: this.featureNS,
                    geometryName: this.geometryName
                });
            } else if (this.outputFormat.toLowerCase() === "json") {
                this.readFormat = new SuperMap.Format.GeoJSON();
            }
        }
    },
   
    CLASS_NAME: "SuperMap.Protocol.WFS.v1_1_0"
});
