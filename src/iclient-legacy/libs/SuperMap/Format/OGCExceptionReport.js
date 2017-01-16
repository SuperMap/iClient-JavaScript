/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/XML.js
 */

/**
 * Class: SuperMap.Format.OGCExceptionReport
 * 用来读取各种OGC服务和版本异常报告的类。
 *
 * Inherits from:
 *  - <SuperMap.Format.XML>
 */
SuperMap.Format.OGCExceptionReport = SuperMap.Class(SuperMap.Format.XML, {

    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        ogc: "http://www.opengis.net/ogc"
    },

    /**
     * Property: regExes
     * Compiled regular expressions for manipulating strings.
     */
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g)
    },

    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "ogc",

    /**
     * Constructor: SuperMap.Format.OGCExceptionReport
     * 创建一个新的OGC异常报告解析器。
     *
     * Parameters:
     * options - {Object} 选项对象，其属性将被设置到实例。
     */

    /**
     * APIMethod: read
     * 从字符串中读取OGC异常报告数据，并返回一个包含异常信息的对象。
     *
     * Parameters:
     * data - {String} or {DOMElement} 读取/解析的数据。
     *
     * Returns:
     * {Object} 发生异常的信息(包含异常信息的对象)。
     */
    read: function(data) {
        var result;
        if(typeof data === "string") {
            data = SuperMap.Format.XML.prototype.read.apply(this, [data]);
        }
        var root = data.documentElement;
        var exceptionInfo = {exceptionReport: null}; 
        if (root) {
            this.readChildNodes(data, exceptionInfo);
            if (exceptionInfo.exceptionReport === null) {
                // fall-back to OWSCommon since this is a common output format for exceptions
                // we cannot easily use the ows readers directly since they differ for 1.0 and 1.1
                exceptionInfo = new SuperMap.Format.OWSCommon().read(data);
            }
        }
        return exceptionInfo;
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
        "ogc": {
            "ServiceExceptionReport": function(node, obj) {
                obj.exceptionReport = {exceptions: []};
                this.readChildNodes(node, obj.exceptionReport);
            },
            "ServiceException": function(node, exceptionReport) {
                var exception = {
                    code: node.getAttribute("code"),
                    locator: node.getAttribute("locator"),
                    text: this.getChildValue(node)
                };
                exceptionReport.exceptions.push(exception);
            }
        }
    },
    
    CLASS_NAME: "SuperMap.Format.OGCExceptionReport"
    
});
