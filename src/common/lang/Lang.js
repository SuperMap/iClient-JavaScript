/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { en } from './locales/en-US';
 import { zh } from './locales/zh-CN';
/**
 * @name Lang
 * @namespace
 * @category BaseTypes Internationalization
 * @description 国际化的命名空间，包含多种语言和方法库来设置和获取当前的语言。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Lang.getCode();
 *
 *   // 弃用的写法
 *   const result = SuperMap.Lang.getCode();
 *
 * </script>
 *
 * // ES6 Import
 * import { Lang } from '{npm}';
 * 
 * const result = Lang.getCode();
 *
 * ```
 */
let Lang = {
   'en-US': en,
   "zh-CN": zh,
    /**
     * @member {string} Lang.code
     * @description 当前所使用的语言类型。
     */
    code: null,

    /**
     * @member {string} [Lang.defaultCode='en-US']
     * @description 默认使用的语言类型。
     */
    defaultCode: "en-US",

    /**
     * @function Lang.getCode
     * @description 获取当前的语言代码。
     * @returns {string} 当前的语言代码。
     */
    getCode: function () {
        if (!Lang.code) {
            Lang.setCode();
        }
        return Lang.code;
    },

    /**
     * @function Lang.setCode
     * @description 设置语言代码。
     * @param {string} code - 此参数遵循IETF规范。
     */
    setCode: function () {
        var lang = this.getLanguageFromCookie();
        if (!lang) {
            lang = Lang.defaultCode;
            if (navigator.appName === 'Netscape') {
                lang = navigator.language;
            } else {
                lang = navigator.browserLanguage;
            }
        }
        if (lang.indexOf('zh') === 0) {
            lang = 'zh-CN';
        }
        if (lang.indexOf('en') === 0) {
            lang = 'en-US';
        }

        Lang.code = lang;
    },
    /**
     * @function Lang.getLanguageFromCookie
     * @description 从 cookie 中获取语言类型。
     */
    getLanguageFromCookie() {
        var name = 'language=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length, c.length)
            }
        }
        return "";
    },

    /**
     * @function Lang.i18n
     * @description 从当前语言字符串的字典查找 key。
     * @param {string} key - 字典中 i18n 字符串值的关键字。
     * @returns {string} 国际化的字符串。
     */
    i18n: function (key) {
        var dictionary = Lang[Lang.getCode()];
        var message = dictionary && dictionary[key];
        if (!message) {
            // Message not found, fall back to message key
            message = key;
        }
        return message;
    }

};

export { Lang };

