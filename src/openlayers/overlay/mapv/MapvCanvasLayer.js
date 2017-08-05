import ol from 'openlayers/dist/ol-debug';
export default class MapvCanvasLayer {

    constructor(options) {
        this.options = options || {};
        this.paneName = this.options.paneName || 'mapPane';
        this.context = this.options.context || '2d';
        this.zIndex = this.options.zIndex || 2;
        this.mixBlendMode = this.options.mixBlendMode || null;
        this.enableMassClear = this.options.enableMassClear;
        this._map = options.map;
        this.initialize();
    }

    initialize() {
        var me = this;
        var canvas = me.canvas = document.createElement("canvas");
        canvas.style.cssText = "position:absolute;" + "left:0;" + "top:0;" + "z-index:" + me.zIndex + ";user-select:none;";
        canvas.style.mixBlendMode = me.mixBlendMode;
        canvas.className = "mapvClass";
        var size = me._map.getSize();
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = me.devicePixelRatio = global$2.devicePixelRatio;
        canvas.width = size[0];
        canvas.height = size[1];
        if (me.context == '2d') {
            canvas.getContext(me.context).scale(devicePixelRatio, devicePixelRatio);
        }
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
    }

    draw() {
        var size = this._map.getSize();
        var center = this._map.getView().getCenter();
        if (center) {
            var _p = this._map.getPixelFromCoordinate(center);
            if (_p) {
                this.canvas.style.left = _p[0] - size[0] / 2 + 'px';
                this.canvas.style.top = _p[1] - size[1] / 2 + 'px';
                this.options.update && this.options.update.call(this);
            }
        }
    }

    getContainer() {
        return this.canvas;
    }

    setZIndex(zIndex) {
        this.canvas.style.zIndex = zIndex;
    }

    getZIndex() {
        return this.zIndex;
    }
}