import SuperMap from '../../SuperMap';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Http
 * LevelRenderer 工具-Http
 *
 */
export default class Http {

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Http
     * 构造函数。
     *
     */
    constructor() {

    }

    /**
     * Method: get
     * get请求。
     *
     * Parameters:
     * url - {string|IHTTPGetOption}
     * onsuccess - {Function}
     * onerror - {Function}
     * opts - {Object} 额外参数
     *
     * Returns:
     * {Number} cos 值。
     */
    get(url, onsuccess, onerror, opts) {
        if (typeof(url) === 'object') {
            var obj = url;
            url = obj.url;
            onsuccess = obj.onsuccess;
            onerror = obj.onerror;
            opts = obj;
        } else {
            if (typeof(onerror) === 'object') {
                opts = onerror;
            }
        }
        /* jshint ignore:start */
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    onsuccess && onsuccess(xhr.responseText);
                } else {
                    onerror && onerror();
                }
                xhr.onreadystatechange = new Function();
                xhr = null;
            }
        };

        xhr.send(null);
        /* jshint ignore:end */
    }

    CLASS_NAME = "SuperMap.LevelRenderer.Tool.Http"
}
SuperMap.LevelRenderer.Tool.Http = Http;