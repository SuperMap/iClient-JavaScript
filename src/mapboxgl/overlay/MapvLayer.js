import MapvRenderer from  "./mapv/MapvRenderer";
import mapboxgl from 'mapbox-gl';
/*
 @class MapvLayer
 */
export class MapvLayer {

    constructor(map, dataSet, mapVOptions) {
        this.map = map;
        this.mapvLayer = new MapvRenderer(map, this, dataSet, mapVOptions);
        this.canvas = this._createCanvas();
        this.mapvLayer._canvasUpdate();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
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

}
mapboxgl.supermap = mapboxgl.supermap || {};
mapboxgl.supermap.MapvLayer = MapvLayer;