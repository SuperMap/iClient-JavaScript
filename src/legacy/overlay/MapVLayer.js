/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Layer.MapVLayer
 * MapV图层。
 */
var SuperMap = require('../SuperMap');
var MapVRenderer = require("./mapv/MapVRenderer");
SuperMap.Layer.MapVLayer = SuperMap.Class(SuperMap.Layer, {

    /**
     * mapv dataset 对象
     */
    dataSet: null,

    /**
     *mapv 绘图风格配置信息
     */
    options: null,

    /**
     * Proterty: supported
     * {Boolean} 当前浏览器是否支持canvas绘制，默认为false。
     * 决定了MapV图是否可用，内部判断使用。
     */
    supported: false,

    /**
     * Proterty: canvas
     * {Canvas} MapV图主绘制面板。
     */
    canvas: null,

    /**
     * Proterty: canvas
     * {Canvas} MapV图主绘制对象。
     */
    canvasContext: null,

    /**
     * MapV支持webgl和普通canvas渲染.
     * 但目前本图层webgl渲染不能正确显示，待解决
     *
     * @param name
     * @param options 有两个参数
     *        dataSet: mapv 的dataSet对象
     *        options: mapv 绘图风格配置信息
     */
    initialize: function (name, options) {
        this.EVENT_TYPES = SuperMap.Layer.prototype.EVENT_TYPES;

        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        //MapV图要求使用canvas绘制，判断是否支持
        this.canvas = document.createElement("canvas");
        if (!this.canvas.getContext) {
            return;
        }
        this.supported = true;
        //构建绘图面板
        this.canvas.style.position = "absolute";
        this.canvas.style.top = 0 + "px";
        this.canvas.style.left = 0 + "px";
        this.div.appendChild(this.canvas);
        var context = this.options.context || "2d";
        this.canvasContext = this.canvas.getContext(context);
        this.attribution = "© 2017 百度 MapV with <a target='_blank' href='http://iclient.supermapol.com' " +
            "style='color: #08c;text-decoration: none;'>SuperMap iClient</a>";
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function () {
        this.dataSet = null;
        this.options = null;
        this.renderer = null;
        this.supported = null;
        this.canvas = null;
        this.canvasContext = null;
        this.maxWidth = null;
        this.maxHeight = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * 追加数据
     * @param dataSet {MapV.DataSet}
     * @param options {MapV options}
     */
    addData: function (dataSet, options) {
        this.renderer && this.renderer.addData(dataSet, options);
    },

    /**
     * 设置数据
     * @param dataSet {MapV.DataSet}
     * @param options {MapV options}
     */
    setData: function (dataSet, options) {
        this.renderer && this.renderer.setData(dataSet, options);
    },

    getData: function () {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * 按照过滤条件移除数据
     * @param filter
     * eg: filter=function(data){
     *         if(data.id="1"){
     *            return true
     *         }
     *         return false;
     *     }
     */
    removeData: function (filter) {
        this.renderer && this.renderer.removeData(filter);
    },

    clearData: function () {
        this.renderer.clearData();
    },

    /**
     * Method: setMap
     * 图层已经添加到Map中。
     *
     * 如果当前浏览器支持canvas，则开始渲染要素；如果不支持则移除图层。
     *
     * Parameters:
     * map - {<SuperMap.Map>}需要绑定的map对象。
     */
    setMap: function (map) {
        SuperMap.Layer.prototype.setMap.apply(this, arguments);
        this.renderer = new MapVRenderer(map, this, this.dataSet, this.options);
        if (!this.supported) {
            this.map.removeLayer(this);
        } else {
            this.redraw();
        }
    },

    /**
     * Method: moveTo
     * 重置当前MapV图层的div，再一次与Map控件保持一致。
     * 修改当前显示范围，当平移或者缩放结束后开始重绘MapV图的渲染效果。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function (bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        if (!this.supported) {
            return;
        }
        this.zoomChanged = zoomChanged;
        if (!dragging) {
            this.div.style.visibility = "hidden";
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + "px";
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + "px";
            /*this.canvas.style.left = this.div.style.left;
             this.canvas.style.top = this.div.style.top;*/
            var size = this.map.getSize();
            this.div.style.width = parseInt(size.w) + "px";
            this.div.style.height = parseInt(size.h) + "px";
            this.canvas.width = parseInt(size.w);
            this.canvas.height = parseInt(size.h);
            this.canvas.style.width = this.div.style.width;
            this.canvas.style.height = this.div.style.height;
            this.maxWidth = size.w;
            this.maxHeight = size.h;
            this.div.style.visibility = "";
            if (!zoomChanged) {
                this.renderer && this.renderer.render();
            }
        }

        if (zoomChanged) {
            this.renderer && this.renderer.render();
        }
    },

    /**
     * 将经纬度转成底图的投影坐标
     * @param latLng
     */
    transferToMapLatLng: function (latLng) {
        var source = "EPSG:4326", dest = "EPSG:4326";
        var unit = this.map.getUnits();
        if (["m", "meter"].indexOf(unit.toLowerCase()) > -1) {
            dest = "EPSG:3857";
        }
        return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    },

    CLASS_NAME: "SuperMap.Layer.MapVLayer"
});

module.exports = SuperMap.Layer.MapVLayer;
