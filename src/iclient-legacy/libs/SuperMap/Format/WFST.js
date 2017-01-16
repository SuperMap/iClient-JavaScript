/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
/**
 * @requires SuperMap/Format.js
 */

/**
 * Function: SuperMap.Format.WFST
 * 用于创建一个版本控制的WFS协议。默认版本是1.0.0。
 *
 * Returns:
 * {<SuperMap.Format>} 一个给定版本的WFST格式(format)。
 */
SuperMap.Format.WFST = function(options) {
    options = SuperMap.Util.applyDefaults(
        options, SuperMap.Format.WFST.DEFAULTS
    );
    var cls = SuperMap.Format.WFST["v"+options.version.replace(/\./g, "_")];
    if(!cls) {
        throw "Unsupported WFST version: " + options.version;
    }
    return new cls(options);
};

/**
 * Constant: SuperMap.Format.WFST.DEFAULTS
 * {Object} WFST格式的默认属性。
 */
SuperMap.Format.WFST.DEFAULTS = {
    "version": "1.0.0"
};
