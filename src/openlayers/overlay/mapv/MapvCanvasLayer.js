import ol from 'openlayers/dist/ol-debug';
/**
 * @class ol.supermap.MapvCanvasLayer
 * @classdesc 地图画布图层
 * @param options - {object} 交互时所需可选参数
 */
export default class MapvCanvasLayer {
    constructor(options) {
        this.options = options || {};
        this.enableMassClear = this.options.enableMassClear;
        this._map = options.map;
        this.paneName = this.options.paneName || 'mapPane';
        this.context = this.options.context || '2d';
        this.zIndex = this.options.zIndex || 2;
        this.mixBlendMode = this.options.mixBlendMode || null;
        this.width = options.width;
        this.height = options.height;
        this.initialize();
    }

    initialize() {
        var me = this;
        var canvas = me.canvas = document.createElement("canvas");
        canvas.style.cssText = "position:absolute;" + "left:0;" + "top:0;" + "z-index:" + me.zIndex + ";user-select:none;";
        canvas.style.mixBlendMode = me.mixBlendMode;
        canvas.className = "mapvClass";
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = me.devicePixelRatio = global$2.devicePixelRatio;
        canvas.width = me.width;
        canvas.height = me.height;
        if (me.context == '2d') {
            canvas.getContext(me.context).scale(devicePixelRatio, devicePixelRatio);
        }
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
    }
    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.draw
     * @description 创建画布
     * @param mapWidth  - {number} 地图的宽度
     * @param mapHeight - {number} 地图的高度
     */
    draw(mapWidth, mapHeight) {
        this.canvas.width = mapWidth;
        this.canvas.height = mapHeight;
        this.canvas.style.width = mapWidth + "px";
        this.canvas.style.height = mapHeight + "px";
        this.options.update && this.options.update.call(this);
    }
    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.getContainer
     * @description 获取内容
     */
    getContainer() {
        return this.canvas;
    }
    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.setZIndex
     * @description 设置图层层级关系
     */
    setZIndex(zIndex) {
        this.canvas.style.zIndex = zIndex;
    }
    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.getZIndex
     * @description 获取图层层级
     */

    getZIndex() {
        return this.zIndex;
    }
}