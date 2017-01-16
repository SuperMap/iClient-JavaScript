/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Tile.js
 * @requires SuperMap/Format/JSON.js
 */

/**
 * Class: SuperMap.Tile.UTFGrid
 * SuperMap.Tile.UTFGrid的实例用来管理UTFGrid图层瓦片。这个类型与其他类型
 * 的切片不同，它不进行图片渲染，是为了便于查找要素属性。
 *
 * 查看 <SuperMap.Tile.UTFGrid> 构造函数以获取详情。
 *
 * Inherits from:
 *  - <SuperMap.Tile>
 */
SuperMap.Tile.UTFGrid = SuperMap.Class(SuperMap.Tile, {

    /**
     * Property: url
     * {String}
     * UTFGrid切片对应文件的位置，通过 <getURL> 方法获取。
     */
    url: null,

    /**
     * Property: utfgridResolution
     * {Number}
     * 瓦片像素点个数与UTFGrid单行数据点个数的比值。如果UTFGrid中的一个字符码
     * 对应表示4x4的像素块，则utfgridResolution的值为4，默认值为2。
     */
    utfgridResolution: 2,

    /**
     * Property: json
     * {Object} 存储UTFGrid瓦片数据解析后的JSON数据。
     */
    json: null,

    /**
     * Property: format
     * {SuperMap.Format.JSON}
     * 用于将JSON数据解析成跨浏览器支持的解析器实例原生的JSON.parse方法在大
     * 部分情况下有效（除了IE<8）。
     */
    format: null,

    /**
     * Method: destroy
     * 销毁瓦片实例。
     */
    destroy: function() {
        this.clear();
        SuperMap.Tile.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: draw
     * Check that a tile should be drawn, and draw it.
     * In the case of UTFGrids, "drawing" it means fetching and
     * parsing the json.
     *
     * Returns:
     * {Boolean} Was a tile drawn?
     */
    draw: function() {
        var t = this;
        var drawn = SuperMap.Tile.prototype.draw.apply(this, arguments);
        if (drawn) {
            if (this.isLoading) {
                this.abortLoading();
                //if we're already loading, send 'reload' instead of 'loadstart'.
                this.events.triggerEvent("reload");
            } else {
                this.isLoading = true;
                this.events.triggerEvent("loadstart");
            }
            this.url = this.layer.getURL(this.bounds);

            this.url = window.encodeURI(this.url);
            this.url = this.url.replace('#',window.encodeURIComponent('#'));
            if (this.layer.useJSONP) {
                t.json = null;
                // Use JSONP method to avoid xbrowser policy
                var ols = new SuperMap.Protocol.Script({
                    url: this.url,
                    callback: function(url){
                        return function(response){
                            if(url === t.url){
                                t.isLoading = false;
                                t.events.triggerEvent("loadend");
                                t.json = response.data;
                            }
                        }
                    }(t.url),
                    scope: this
                });
                ols.read();
                this.request = ols;
            } else {
                // Use standard XHR
                this.request = SuperMap.Request.GET({
                    url: this.url,
                    callback: function(url) {
                        return function(response){
                            if(url === t.url){
                                t.isLoading = false;
                                t.events.triggerEvent("loadend");
                                if (response.status === 200) {
                                    t.parseData(response.responseText);
                                }
                            }
                        }
                    }(t.url),
                    scope: this
                });
            }
        } else {
            this.unload();
        }
        return drawn;
    },

    /**
     * Method: abortLoading
     * Cancel a pending request.
     */
    abortLoading: function() {
        if (this.request) {
            this.request.abort();
            delete this.request;
        }
        this.isLoading = false;
    },

    /**
     * Method: getFeatureInfo
     * 获取与屏幕像素偏移值对应的地图要素的信息。当像素偏移值能够对应到一个地理
     * 要素，则返回对象将包含id和data属性。否则返回null。
     *
     *
     * Parameters:
     * i - {Number} X轴像素偏移量 (切片的左上角点为原点)
     * j - {Number} Y轴像素偏移量 (切片的左上角点为原点)
     *
     * Returns:
     * {Object} Object with feature id and data properties corresponding to the
     *     given pixel offset.
     */
    getFeatureInfo: function(i, j) {
        var info = null;
        if (this.json) {
            var id = this.getFeatureId(i, j);
            if (id !== null) {
                info = {id: id, data: this.json.data[id]};
            }
        }
        return info;
    },

    /**
     * Method: getFeatureId
     * 获取与像素偏移相对应的要素标识符。
     *
     * Parameters:
     * i - {Number} X轴像素偏移量 (切片的左上角点为原点)
     * j - {Number} Y轴像素偏移量 (切片的左上角点为原点)
     *
     * Returns:
     * {Object} 与像素偏移相对应的要素标识符，如果像素点没有对应的要素则返回null
     */
    getFeatureId: function(i, j) {
        var id = null;
        if (this.json) {
            var utfgridresolution = this.utfgridResolution;
            var row = Math.floor(j / utfgridresolution);
            var col = Math.floor(i / utfgridresolution);
            //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
            try{
                var charCode = this.json.grid[row].charCodeAt(col);
            }catch (e){
                return null;
            }
            var index = this.indexFromCharCode(charCode);
            var keys = this.json.keys;
            if (!isNaN(index) && (index in keys)) {
                id = keys[index];
            }
        }
        return id;
    },

    /**
     * Method: indexFromCharCode
     * 给定一个UTFGrid中grid属性中的字符码对应的十进制表示，将其解析成UTFGrid
     * 中keys数组上的索引。
     *
     * Parameters:
     * charCode - {Integer} 字符的十进制代码
     *
     * Returns:
     * {Integer} UTFGrid中keys数组上的索引，对应能够检索到要素的索引值（通常是id值）
     */
    indexFromCharCode: function(charCode) {
        if (charCode >= 93) {
            charCode--;
        }
        if (charCode >= 35) {
            charCode --;
        }
        return charCode - 32;
    },

    /**
     * Method: parseData
     * 将请求返回的字符串数据解析成JSON对象并存储在<json>中
     *
     * Parameters:
     * str - {String} UTFGrid的字符串表示
     *
     * Returns:
     * {Object} 解析后的JavaScript数据对象
     */
    parseData: function(str) {
        if (!this.format) {
            this.format = new SuperMap.Format.JSON();
        }
        this.json = this.format.read(str);
    },

    /**
     * Method: clear
     * 清除该瓦片存储的数据。
     */
    clear: function() {
        this.json = null;
    },

    CLASS_NAME: "SuperMap.Tile.UTFGrid"

});
