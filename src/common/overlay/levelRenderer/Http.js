/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Http
 * @category Visualization Theme
 * LevelRenderer 工具-Http
 *
 */
export class Http {

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Http
     * 构造函数。
     *
     */
    constructor() {
        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Http"

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
    get(url, onsuccess, onerror) {
        if (typeof(url) === 'object') {
            var obj = url;
            url = obj.url;
            onsuccess = obj.onsuccess;
            onerror = obj.onerror;

        }
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new window.ActiveXObject('Microsoft.XMLHTTP');
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
    }

}