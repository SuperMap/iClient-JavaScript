var olapi = "https://openlayers.org/en/v4.6.5/apidoc/";
var lfapi = "http://leafletjs.com/reference-1.3.1.html";
var mbglapi = "https://www.mapbox.com/mapbox-gl-js/api/";
var mapv = "https://github.com/huiyan-fe/mapv/blob/master/src/";
var classicapi="http://iclient.supermap.io/libs/iclient8c/apidoc/files/SuperMap"
var geojsonapi = "http://geojson.org";
var typeLinks = {
    //openlayers
    "ol.Map": olapi + "ol.Map.html",
    "ol.View": olapi + "ol.View.html",
    "ol.extent": olapi + "ol.extent.html",
    "ol.feature": olapi + "ol.feature.html",
    "ol.geom.Polygon": olapi + "ol.geom.Polygon.html",
    "ol.geom.LineString": olapi + "ol.geom.LineString.html",
    "ol.geom.Point": olapi + "ol.geom.Point.html",
    "ol.geom.Geometry":olapi + "ol.geom.Geometry.html",
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
    "ol.layer.Layer": olapi + "ol.layer.Layer.html",
    "ol.FeatureStyleFunction": olapi + "ol.html#.FeatureStyleFunction",
    "ol.StyleFunction": olapi + "ol.html#.StyleFunction",
    "ol.control.ScaleLine": olapi + "ol.control.ScaleLine",
   

    //leaflet
    "L.Marker": lfapi + '#marker',
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
    "L.Path-option": lfapi + '#path-option',
    "L.Rectangle": lfapi + '#rectangle',
    'L.LatLngBounds': lfapi+ '#latlngbounds',
    'L.Map': lfapi + '#map-example',
    'L.Evented':lfapi +'#evented',

    //mapboxgl
    "mapboxgl.Evented": mbglapi + '#Evented',
    "mapboxgl.Map": mbglapi + '#map',
    //mapv
    "Mapv.DataSet": mapv + 'data/DataSet.md',
    "Mapv.BaiduMapLayer": mapv + 'map/baidu-map/Layer.md',

    //classic
    "SuperMap.Layer":classicapi + '/Layer-js.html',
    "SuperMap.Layer.Graph": classicapi + '/Layer/Theme/Graph-js.html#SuperMap.Layer.Graph',
    
	//GeoJSON
    "GeoJSONObject": geojsonapi
    
}
exports.typeLinks = typeLinks;