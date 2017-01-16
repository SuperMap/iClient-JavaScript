/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/XML/VersionedOGC.js
 * @requires SuperMap/Filter/FeatureId.js
 * @requires SuperMap/Filter/Logical.js
 * @requires SuperMap/Filter/Comparison.js
 */

/**
 * Class: SuperMap.Format.Filter
 * 读/写符合ogc标准过滤器的类。使用 <SuperMap.Format.Filter> 构造函数创建新实例。
 *
 * Inherits from:
 *  - <SuperMap.Format.XML.VersionedOGC>
 */
SuperMap.Format.Filter = SuperMap.Class(SuperMap.Format.XML.VersionedOGC, {
    
    /**
     * APIProperty: defaultVersion
     * {String} 没有找到版本号的时候被设置的版本号。默认值是"1.0.0"。
     */
    defaultVersion: "1.0.0",
    
    /**
     * APIMethod: write
     * 写一个符合ogc标准过滤器的对象。
     *
     * Parameters:
     * filter - {<SuperMap.Filter>} 过滤器。
     * options - {Object} 可选的配置对象。
     *
     * Returns:
     * {Elment} 符合ogc标准过滤器的元素节点。
     */
    
    /**
     * APIMethod: read
     * 读取并过滤文档，同时返回一个用来表示过滤器的对象。
     *
     * Parameters:
     * data - {String | DOMElement} 要读取的数据。
     *
     * Returns:
     * {<SuperMap.Filter>} 过滤器对象。
     */

    CLASS_NAME: "SuperMap.Format.Filter" 
});
