/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/OWSCommon/v1.js
 */

/**
 * Class: SuperMap.Format.OWSCommon.v1_0_0
 * Parser for OWS Common version 1.0.0.
 *
 * Inherits from:
 *  - <SuperMap.Format.OWSCommon.v1>
 */
SuperMap.Format.OWSCommon.v1_0_0 = SuperMap.Class(SuperMap.Format.OWSCommon.v1, {
    
    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        ows: "http://www.opengis.net/ows",
        xlink: "http://www.w3.org/1999/xlink"
    },    
    
    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "ows": SuperMap.Util.applyDefaults({
            "ExceptionReport": function(node, obj) {
                obj.success = false;
                obj.exceptionReport = {
                    version: node.getAttribute('version'),
                    language: node.getAttribute('language'),
                    exceptions: []
                };
                this.readChildNodes(node, obj.exceptionReport);
            } 
        }, SuperMap.Format.OWSCommon.v1.prototype.readers.ows)
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "ows": SuperMap.Format.OWSCommon.v1.prototype.writers.ows
    },
    
    CLASS_NAME: "SuperMap.Format.OWSCommon.v1_0_0"

});
