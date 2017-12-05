var utils = {
    //设置语言。参数："zh_CN"，"en"
    setLanguage: null,
    //获取当前语言。默认从cookie读取，没有则读取浏览器默认语言
    getLanguage: null,
    //设置cookie
    setCookie: null,
    //获取cookie
    getCookie: null,

    //获取给定key在当前语言环境下对应的key所对应的值。如读取name字段的值在英语环境下应该变为读取name_en字段的值
    getLocalPairs: null,
    //加载模板文件，依赖art-template库
    loadTemplate: null
};
(function (utils) {
    var cKey = "userLanguage";

    //设置语言。参数："zh_CN"，"en"
    function setLanguage(language) {
        //默认设置过期时间为1个小时
        setCookie(cKey, language, 60 * 60 * 1000);
    }

    //获取当前语言。默认从cookie读取，没有则读取浏览器默认语言
    function getLanguage() {
        var lang = getCookie(cKey);
        if (lang) {
            return lang;
        }
        if (navigator.appName === 'Netscape') {
            return navigator.language;
        }
        else {
            return navigator.browserLanguage;
        }
    }

    //设置cookie,参数分别为：key,value,过期时间（单位:ms）,域
    function setCookie(cKey, cValue, exp, domain) {
        var cookie = cKey + "=" + cValue;
        if (exp) {
            var d = new Date();
            d.setTime(d.getTime() + exp);
            cookie += ";expires=" + d.toUTCString();
        }
        cookie += domain ? ";path=" + domain : ";path=/";
        document.cookie = cookie;
    }

    function getCookie(cKey) {
        var name = cKey + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    //清除cookie
    function clearCookie(name) {
        setCookie(name, "", -1);
    }

    function getLocalKey(key) {
        var lang = getLanguage();
        var localKey = key;
        if (lang === "en") {
            localKey = key + "_" + lang;
        }
        return localKey;
    }

    function getLocalPairs(obj, key) {
        if (!obj) {
            return;
        }
        var localKey = getLocalKey(key);
        return obj[localKey] != null ? obj[localKey] : obj[key];
    }

    function loadTemplate(element, templateFilePath, data) {
        if (!window.$ || !window.jQuery) {
            throw new Error("jQuery is required")
        }
        if (!window.template) {
            throw new Error("art-template.js is required")
        }
        if (!element) {
            throw new Error("element is required")
        }
        $.get(templateFilePath, function (html) {
            $(element).html(window.template.compile(html)(data));
        });

    }

    utils.setLanguage = setLanguage;
    utils.getLanguage = getLanguage;
    utils.setCookie = setCookie;
    utils.getCookie = getCookie;
    utils.getLocalPairs = getLocalPairs;
    utils.loadTemplate = loadTemplate;

})(utils);