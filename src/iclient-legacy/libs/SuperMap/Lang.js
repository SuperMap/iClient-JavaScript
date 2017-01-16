/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes.js
 */

/**
 * Namespace: SuperMap.Lang
 * 国际化的命名空间，包含多种语言和方法库来设置和获取当前的语言。
 */
SuperMap.Lang = {
    
    /** 
     * Property: code
     * {String}  Current language code to use in SuperMap.  Use the
     *     <setCode> method to set this value and the <getCode> method to
     *     retrieve it.
     */
    code: null,

    /** 
     * APIProperty: defaultCode
     * {String} 默认的语言代码，默认为“en”。
     */
    defaultCode: "en",
        
    /**
     * APIFunction: getCode
     * 获取当前的语言代码。
     *
     * Returns:
     * 当前的语言代码。
     */
    getCode: function() {
        if(!SuperMap.Lang.code) {
            SuperMap.Lang.setCode();
        }
        return SuperMap.Lang.code;
    },
    
    /**
     * APIFunction: setCode
     * 设置语言代码，此代码用于 <SuperMap.Lang.translate> 方法。
     *
     * Parameters:
     * code - {String} 此参数遵循IETF规范
     *     http://www.ietf.org/rfc/rfc3066.txt,如果没有设置，将检测浏览器的语言设置，
     * 如果当前设置的code的 <SuperMap.Lang> 库不存在，则使用 <SuperMap.String.defaultLang> 。
     */
    setCode: function(code) {
        var lang;
        if(!code) {
            code = (SuperMap.Browser.name === "msie") ?
                navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if(typeof SuperMap.Lang[parts[0]] === "object") {
            lang = parts[0];
        }

        // check for regional extensions
        if(parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if(typeof SuperMap.Lang[testLang] === "object") {
                lang = testLang;
            }
        }
        if(!lang) {
            lang = SuperMap.Lang.defaultCode;
        }
        
        SuperMap.Lang.code = lang;
    },

    /**
     * APIMethod: translate
     * 从当前语言字符串的字典查找key。
     *     getCode获取的值用来判断合适的字典。字典存储在 <SuperMap.Lang> 方法中。
     *
     * Parameters:
     * key - {String} 字典中i18n字符串值的关键字.
     * context - {Object} <SuperMap.String.format> 使用此参数。
     * 
     * Returns:
     * {String} 国际化的字符串。
     */
    translate: function(key, context) {
        var dictionary = SuperMap.Lang[SuperMap.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if(!message) {
            // Message not found, fall back to message key
            message = key;
        }
        if(context) {
            message = SuperMap.String.format(message, context);
        }
        return message;
    }
    
};


/**
 * APIMethod: SuperMap.i18n
 *  <SuperMap.Lang.translate> 的别名.  当前语言字符串的字典查找key。
 *  getCode获取的值用来判断合适的字典。字典存储在 <SuperMap.Lang> 方法中。
 *
 * Parameters:
 * key - {String} 字典中i18n字符串值的关键字.
 * context - {Object} <SuperMap.String.format> 使用此参数。
 * 
 * Returns:
 * {String} 国际化的字符串。
 */
SuperMap.i18n = SuperMap.Lang.translate;
