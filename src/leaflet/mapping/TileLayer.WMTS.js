import '../core/Base';
import L from "leaflet";
export var WMTSLayer = L.TileLayer.extend({
    options: {
        version: '1.0.0',
        style: '',
        tilematrixSet: '',
        format: 'image/png',
        tileSize: 256,
        matrixIds: null,
        layer: '',
        attribution: 'with <a href="http://iclient.supermapol.com/">SuperMap iClient</a>'
    },
    //todo 自动获取Capabilities
    initialize: function (url, options) { // (String, Object)
        this._url = url;
        L.setOptions(this, options);
    },
    getTileUrl: function (coords) { // (Point, Number) -> String
        var zoom = this._getZoomForUrl();
        var ident = this.options.matrixIds ? this.options.matrixIds[zoom].identifier : zoom;
        var url = L.Util.template(this._url, {s: this._getSubdomain(coords)});
        var obj = {
            service: 'WMTS',
            request: 'GetTile',
            version: this.options.version,
            style: this.options.style,
            tilematrixSet: this.options.tilematrixSet,
            format: this.options.format,
            width: this.options.tileSize,
            height: this.options.tileSize,
            layer: this.options.layer,
            tilematrix: ident,
            tilerow: coords.y,
            tilecol: coords.x
        };
        return url + L.Util.getParamString(obj, url);
    }
});

export var wmtsLayer = function (url, options) {
    return new WMTSLayer(url, options);
};
L.supermap.wmtsLayer = wmtsLayer;