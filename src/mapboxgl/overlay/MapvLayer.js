var MapvRenderer = require("./mapv/MapvRenderer");

class MapvLayer {

    constructor(map, dataSet, mapVOptions) {
        this.map = map;
        this.mapvLayer = new MapvRenderer(map, this, dataSet, mapVOptions);
        this.canvas = this._createCanvas();
        this._redraw();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        var me = this;

        map.on('resize', function (e) {
            me._redraw();
        });

        map.on('move', function (e) {
            me._redraw();
        });

        map.on('zoomstart', function (e) {
            me._hide();
        });

        map.on('zoomend', function (e) {
            me._show();
        });

        map.on('remove', function (e) {
            me.mapContainer.removeChild(me.canvas);
        });
    }

    getTopLeft() {
        var map = this.map;
        var topLeft;
        if (map) {
            var bounds = map.getBounds();
            topLeft = bounds.getNorthWest();
        }
        return topLeft;
    }

    _createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.width = parseInt(this.map.getCanvas().style.width);
        canvas.height = parseInt(this.map.getCanvas().style.height);
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
        return canvas;
    }

    _redraw() {
        this._resize();
        this.mapvLayer._canvasUpdate();
    }

    _resize() {
        var canvas = this.canvas;
        if (!canvas) {
            return;
        }
        canvas.width = parseInt(this.map.getCanvas().style.width);
        canvas.height = parseInt(this.map.getCanvas().style.height);
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
    }

    _hide() {
        this.canvas.style.display = 'none';
    }

    _show() {
        this.canvas.style.display = 'block';
    }

}
window.mapvlayer = MapvLayer;

module.exports = MapvLayer;