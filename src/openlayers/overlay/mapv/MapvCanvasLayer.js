/**
 * @class ol.supermap.MapvCanvasLayer
 * @classdesc Mapv渲染器。
 * @private
 * @param options - {Object} 可选参数。如：<br>
 *        paneName - {string} 窗口名。<br>
 *        enableMassClear - {} 。<br>
 *        context - {string} 内容。<br>
 *        zIndex - {number} 层级。<br>
 *        width - {number} 画布宽。<br>
 *        height - {number} 画布高。<br>
 *        mixBlendMode - {string} 最小混合模式。
 */
export class MapvCanvasLayer {

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
     * @description 生成地图
     */
    draw() {
        this.options.update && this.options.update.call(this);
    }

    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.resize
     * @param mapWidth - {number} 地图宽度
     * @param mapHeight - {number} 地图高度
     * @description 调整地图大小
     */
    resize(mapWidth, mapHeight) {
        this.canvas.width = mapWidth;
        this.canvas.height = mapHeight;
        this.canvas.style.width = mapWidth + "px";
        this.canvas.style.height = mapHeight + "px";
    }

    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.getContainer
     * @description 获取容器
     * @return {Element} 包含Mapv图层的dom对象
     */
    getContainer() {
        return this.canvas;
    }

    /**
     * @function ol.supermap.MapvCanvasLayer.prototype.setZIndex
     * @param zIndex - {number} 层级参数
     * @description 设置图层层级
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