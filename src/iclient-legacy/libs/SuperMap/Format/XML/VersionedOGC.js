/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/XML.js
 * @requires SuperMap/Format/OGCExceptionReport.js
 */

/**
 * Class: SuperMap.Format.XML.VersionedOGC
 * 版本化格式类的基类，例如一个支持多版本的格式类。
 * 
 * Inherits from:
 *  - <SuperMap.Format.XML>
 */
SuperMap.Format.XML.VersionedOGC = SuperMap.Class(SuperMap.Format.XML, {
    
    /**
     * APIProperty: defaultVersion
     * {String} 在没有找到版本号的情况下呈现的版本号。
     */
    defaultVersion: null,
    
    /**
     * APIProperty: version
     * {String} 在已知一个版本号的情况下指定的一个版本字符串。
     */
    version: null,

    /**
     * APIProperty: profile
     * {String} 如果被提供，则使用自定义配置文件。
     */
    profile: null,

    /**
     * APIProperty: errorProperty
     * {String} 返回对象的属性，查找它是为了判断是否解析失败的属性如果
     *      errorProperty在返回的对象属性中是未定义的，那么文档就会通过
     *      <OGCExceptionReport> 解析。
     */
    errorProperty: null,

    /**
     * Property: name
     * {String} The name of this parser, this is the part of the CLASS_NAME
     * except for "SuperMap.Format."
     */
    name: null,

    /**
     * APIProperty: stringifyOutput
     * {Boolean} 如果设置为true， write方法将会返回一个字符串，否则返回的是
     *      DOMElement。默认值是false。
     */
    stringifyOutput: false,

    /**
     * Property: parser
     * {Object} Instance of the versioned parser.  Cached for multiple read and
     *     write calls of the same version.
     */
    parser: null,

    /**
     * Constructor: SuperMap.Format.XML.VersionedOGC.
     * 构造函数。
     *
     * Parameters:
     * options - {Object} 可选选项对象，其属性将被设置到实例。
     */
    initialize: function(options) {
        SuperMap.Format.XML.prototype.initialize.apply(this, [options]);
        var className = this.CLASS_NAME;
        this.name = className.substring(className.lastIndexOf(".")+1);
    },

    /**
     * Method: getVersion
     * Returns the version to use. Subclasses can override this function
     * if a different version detection is needed.
     *
     * Parameters:
     * root - {DOMElement}
     * options - {Object} Optional configuration object.
     *
     * Returns:
     * {String} The version to use.
     */
    getVersion: function(root, options) {
        var version;
        // read
        if (root) {
            version = this.version;
            if(!version) {
                version = root.getAttribute("version");
                if(!version) {
                    version = this.defaultVersion;
                }
            }
        } else { // write
            version = (options && options.version) || 
                this.version || this.defaultVersion;
        }
        return version;
    },

    /**
     * Method: getParser
     * Get an instance of the cached parser if available, otherwise create one.
     *
     * Parameters:
     * version - {String}
     *
     * Returns:
     * {<SuperMap.Format>}
     */
    getParser: function(version) {
        version = version || this.defaultVersion;
        var profile = this.profile ? "_" + this.profile : "";
        if(!this.parser || this.parser.VERSION !== version) {
            var format = SuperMap.Format[this.name][
                "v" + version.replace(/\./g, "_") + profile
            ];
            if(!format) {
                throw "Can't find a " + this.name + " parser for version " +
                      version + profile;
            }
            this.parser = new format(this.options);
        }
        return this.parser;
    },

    /**
     * APIMethod: write
     * 编写一个文档。
     *
     * Parameters:
     * obj - {Object} 一个表示文档(document)对象对象。
     * options - {Object} 可选的配置(configuration)对象。
     *
     * Returns:
     * {String} 文档(document)的字符串表示。
     */
    write: function(obj, options) {
        var version = this.getVersion(null, options);
        this.parser = this.getParser(version);
        var root = this.parser.write(obj, options);
        if (this.stringifyOutput === false) {
            return root;
        } else {
            return SuperMap.Format.XML.prototype.write.apply(this, [root]);
        }
    },

    /**
     * APIMethod: read
     * 读取一个文档，并返回一个对象，该对象代表这个文档。
     *
     * Parameters:
     * data - {String | DOMElement} 要被读取的数据。
     * options - {Object} 读取操作的选项。
     *
     * Returns:
     * {Object} 文档(document)的对象表示。
     */
    read: function(data, options) {
        if(typeof data === "string") {
            data = SuperMap.Format.XML.prototype.read.apply(this, [data]);
        }
        var root = data.documentElement;
        var version = this.getVersion(root);
        this.parser = this.getParser(version);
        var obj = this.parser.read(data, options);
        if (this.errorProperty !== null && obj[this.errorProperty] === undefined) {
            // an error must have happened, so parse it and report back
            var format = new SuperMap.Format.OGCExceptionReport();
            obj.error = format.read(data);
        }
        obj.version = version;
        return obj;
    },

    CLASS_NAME: "SuperMap.Format.XML.VersionedOGC"
});
