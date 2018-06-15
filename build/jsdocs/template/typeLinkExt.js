var olapi = "https://openlayers.org/en/latest/apidoc/";
var lfapi = "http://leafletjs.com/reference-1.3.0.html";
var mbglapi = "https://www.mapbox.com/mapbox-gl-js/api/";
var typeLinks = {
    //openlayers
    "ol.Map": olapi + "ol.Map.html",
    "ol.View": olapi + "ol.View.html",
    "ol.extent": olapi + "ol.extent.html",
    "ol.feature": olapi + "ol.feature.html",
    "ol.geom.Polygon": olapi + "ol.geom.Polygon.html",
    "ol.geom.LineString": olapi + "ol.geom.LineString.html",
    "ol.geom.Point": olapi + "ol.geom.Point.html",
    "ol.format.GeoJSON": olapi + "ol.format.GeoJSON.html",
    "ol.proj.Projection": olapi + "ol.proj.Projection",
    "ol.Observable": olapi + "ol.Observable",
    "ol.style.Image": olapi + "ol.style.Image",
    "ol.style.Fill": olapi + "ol.style.Fill",
    "ol.style.Stroke": olapi + "ol.style.Stroke",
    "ol.Object": olapi + "ol.Object",
    "ol.source.ImageCanvas": olapi + "ol.source.ImageCanvas",
    "ol.source.TileImage": olapi + "ol.source.TileImage",
    "ol.source.WMTS": olapi + "ol.source.WMTS",
    "ol.source.XYZ": olapi + "ol.source.XYZ",
    "ol.source.Vector": olapi + "ol.source.Vector",
    "ol.source.VectorTile": olapi + "ol.source.VectorTile",
    "ol.Pixel": olapi + "ol.html#.Pixel",
    "ol.source.State": olapi + "ol.source.html#.State",

    //leaflet
    "L.Bounds": lfapi + "#bounds",
    "L.Polygon": lfapi + "#polygon",
    "L.Polyline": lfapi + "#polyline",
    "L.Point": lfapi + "#point",
    "L.LatLng": lfapi + "#latlng",
    "L.GeoJSON": lfapi + "#geojson",
    "L.Control": lfapi + "#control",
    "L.Class": lfapi + "#class",
    "L.GridLayer": lfapi + '#gridlayer',
    "L.Path": lfapi + '#path',
    "L.SVG": lfapi + '#svg',
    "L.Canvas": lfapi + '#canvas',
    "L.Layer": lfapi + '#layer',
    "L.LayerGroup": lfapi + '#layergroup',
    "L.TileLayer": lfapi + '#tilelayer',
    "L.CircleMarker": lfapi + '#circlemarker',

    //mapboxgl
    "mapboxgl.Evented": mbglapi + '#Evented'
}
exports.typeLinks = typeLinks;