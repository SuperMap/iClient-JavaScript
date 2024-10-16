/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @private
 * @class  LevelRenderer.Tool.Http
 * @category Visualization Theme
 * @classdesc LevelRenderer 工具-Http
 */
export class Http {
    constructor() {
        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Http"
    }

    /**
     * @function LevelRenderer.Tool.Http.prototype.get
     * @description get请求。
     * @param {(string|IHTTPGetOption)} url - 请求url
     * @param {function} onsuccess - 请求成功函数
     * @param {function} onerror - 请求失败函数
     * @param {Object} opts - 额外参数
     * @returns {number} cos值
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
