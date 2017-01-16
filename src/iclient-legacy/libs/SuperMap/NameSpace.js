/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

//SuperMap所有命名空间
window.SuperMap = {
    /**
     * 版本号
     */
    VERSION_NUMBER: "Release 7.1.0",

    /**
     * Method: _getScriptLocation
     * 返回文件 “SuperMap.Include.js”的路径，
     * 如：src='../libs/SuperMap.Include.js' ，返回就是'../libs/'
     *
     * Returns:
     * {String} 返回 script 标签的路径
     */
    _getScriptLocation: (function() {
        //SuperMap-6.1.1-8828
//        var r = new RegExp("(^|(.*?\\/))(SuperMap(-(\\d{1}\.)*\\d{1}-\\d{4,})?\.js)(\\?|$)"),
        //修改为匹配SuperMap.Include.js
        var r = new RegExp("(^|(.*?\\/))(SuperMap.Include.js)(\\?|$)"),
            s = document.getElementsByTagName('script'),
            src, m, l = "";
        for(var i=0, len=s.length; i<len; i++) {
            src = s[i].getAttribute('src');
            if(src) {
                var m = src.match(r);
                if(m) {
                    l = m[1];
                    break;
                }
            }
        }
        return (function() { return l; });
    })()
};

SuperMap.Control = SuperMap.Control || {};

SuperMap.Util = SuperMap.Util || {};

SuperMap.REST = SuperMap.REST || {};

SuperMap.Layer = SuperMap.Layer || {};

SuperMap.Tile = SuperMap.Tile || {};

SuperMap.Scheme = SuperMap.Scheme || {};

SuperMap.Tool = SuperMap.Tool || {};

SuperMap.Plot = SuperMap.Plot || {};



