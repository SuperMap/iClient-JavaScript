import {SuperMap} from '../SuperMap';
import {MapVRenderer} from './mapv/MapVRenderer';

/**
 * @class SuperMap.Layer.MapVLayer
 * @category  Visualization MapV
 * @classdesc MapV图层。
 * @extends SuperMap.Layer
 * @param name - {string} 图层名
 * @param options  - {Object} 可选参数，有如下两个参数：<br>
 *        dataSet - {mapv.DataSet} mapv 的dataSet对象 <br>
 *        options - {Object} mapv 绘图风格配置信息
 */
export class MapVLayer extends SuperMap.Layer {

    /*
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description
     * MapV支持webgl和普通canvas渲染.
     * 但目前本图层webgl渲染不能正确显示，待解决
     *
     * @param name
     * @param options 有两个参数<br>
     *  * dataSet: mapv 的dataSet对象
     *  * options: mapv 绘图风格配置信息
     */
    constructor(name, options) {
        super(name, options);

        /**
         * @member SuperMap.Layer.MapVLayer.prototype.dataSet -{mapv.DataSet}
         * @description mapv dataset 对象
         */
        this.dataSet = null;

        /**
         * @member SuperMap.Layer.MapVLayer.prototype.options -{Object}
         * @description mapv 绘图风格配置信息
         */
        this.options = null;

        /**
         * @member SuperMap.Layer.MapVLayer.prototype.supported -{boolean}
         * @description 当前浏览器是否支持canvas绘制，默认为false。决定了MapV图是否可用，内部判断使用。
         */
        this.supported = false;

        /**
         * @member SuperMap.Layer.MapVLayer.prototype.canvas {Canvas}
         * @description MapV图主绘制面板。
         */
        this.canvas = null;

        /**
         * @private
         * @member SuperMap.Layer.MapVLayer.prototype.canvasContext -{CanvasContext}
         * @description MapV图主绘制对象。
         */
        this.canvasContext = null;

        if (options) {
            SuperMap.Util.extend(this, options);
        }
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
        var context = this.options && this.options.context || "2d";
        this.canvasContext = this.canvas.getContext(context);
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
        if (this.options.context == '2d') {
            this.canvasContext.scale(devicePixelRatio, devicePixelRatio);
        }
        this.attribution = "© 2017 百度 <a href='http://mapv.baidu.com' target='_blank'>MapV</a> with <span>© <a target='_blank' href='http://iclient.supermap.io' " +
            "style='color: #08c;text-decoration: none;'>SuperMap iClient</a></span>";

        this.CLASS_NAME = "SuperMap.Layer.MapVLayer";
    }


    /**
     * @function SuperMap.Layer.MapVLayer.prototype.destroy
     * @override
     */
    destroy() {
        this.dataSet = null;
        this.options = null;
        this.renderer = null;
        this.supported = null;
        this.canvas = null;
        this.canvasContext = null;
        this.maxWidth = null;
        this.maxHeight = null;
        super.destroy();
    }


    /**
     * @function SuperMap.Layer.MapVLayer.prototype.addData
     * @description 追加数据
     * @param dataSet - {mapv.DataSet} mapv数据集
     * @param options - {Object} mapv绘图参数
     */
    addData(dataSet, options) {
        this.renderer && this.renderer.addData(dataSet, options);
    }


    /**
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description 设置数据
     * @param dataSet {mapv.DataSet} mapv数据集
     * @param options {Object} mapv绘图参数
     */
    setData(dataSet, options) {
        this.renderer && this.renderer.setData(dataSet, options);
    }


    /**
     * @function SuperMap.Layer.MapVLayer.prototype.getData
     * @description 获取数据
     * @return {mapv.DataSet} mapv数据集
     */
    getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     * @example
     *  filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     *  }
     */
    removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.clearData
     * @description 清除数据
     */
    clearData() {
        this.renderer.clearData();
    }


    /**
     * @function SuperMap.Layer.MapVLayer.prototype.setMap
     * @description 图层已经添加到Map中。
     *              如果当前浏览器支持canvas，则开始渲染要素；如果不支持则移除图层。
     * @param map - {SuperMap.Map} 需要绑定的map对象
     */
    setMap(map) {
        super.setMap(map);
        this.renderer = new MapVRenderer(map, this, this.dataSet, this.options);
        if (!this.supported) {
            this.map.removeLayer(this);
        } else {
            this.redraw();
        }
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.moveTo
     * @description 重置当前MapV图层的div，再一次与Map控件保持一致。
     *              修改当前显示范围，当平移或者缩放结束后开始重绘MapV图的渲染效果。
     * @param bounds - {SuperMap.Bounds} 图层范围
     * @param zoomChanged - {boolean} 缩放级别是否改变
     * @param dragging - {boolean} 是否拖动
     */
    moveTo(bounds, zoomChanged, dragging) {
        super.moveTo(bounds, zoomChanged, dragging);
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
    }


    /**
     * @function SuperMap.Layer.MapVLayer.prototype.transferToMapLatLng
     * @description 将经纬度转成底图的投影坐标
     * @param latLng - {SuperMap.Lonlat} 经纬度坐标
     */
    transferToMapLatLng(latLng) {
        var source = "EPSG:4326", dest = "EPSG:4326";
        var unit = this.map.getUnits() || "degree";
        if (["m", "meter"].indexOf(unit.toLowerCase()) > -1) {
            dest = "EPSG:3857";
        }
        return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    }

}

SuperMap.Layer.MapVLayer = MapVLayer;
