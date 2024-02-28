var olapi = "https://openlayers.org/en/v6.14.1/apidoc/";
var lfapi = "https://leafletjs.com/reference.html";
var mbglapi = "https://www.mapbox.com/mapbox-gl-js/api/";
var mlbglapi = "https://maplibre.org/maplibre-gl-js-docs/api/";
var mapv = "https://github.com/huiyan-fe/mapv/blob/master/src/";
var classicapi="https://iclient.supermap.io/web/libs/iclient8c/apidoc/files/SuperMap"
var geojsonapi = "https://geojson.org";
var geometryapi="https://datatracker.ietf.org/doc/html/rfc7946";
var helpDocApi = "https://iportal.supermap.io/iportal/help/html/zh/index.htm";
var webApi = "https://developer.mozilla.org/zh-CN/docs/Web/";
var threeApi = "https://threejs.org/docs/index.html";
var typeLinks = {
    //openlayers
    "ol.Map": olapi + "module-ol_Map-Map",
    "ol.View": olapi + "module-ol_View-View",
    "ol.extent": olapi + "module-ol_extent.html",
    "ol.Feature": olapi + "module-ol_Feature-Feature.html",
    "ol.geom.Polygon": olapi + "module-ol_geom_Polygon-Polygon.html",
    "ol.geom.LineString": olapi + "module-ol_geom_LineString-LineString.html",
    "ol.geom.Point": olapi + "module-ol_geom_Point-Point.html",
    "ol.geom.Geometry":olapi + "module-ol_geom_Geometry-Geometry.html",
    "ol.format.GeoJSON": olapi + "module-ol_format_GeoJSON-GeoJSON.html",
    "ol.format.MVT": olapi + "module-ol_format_MVT-MVT.html",
    "ol.proj.Projection": olapi + "module-ol_proj_Projection-Projection.html",
    "ol.Observable": olapi + "module-ol_Observable-Observable.html",
    "ol.style.Image": olapi + "module-ol_style_Image-ImageStyle.html",
    "ol.style.Fill": olapi + "module-ol_style_Fill-Fill.html",
    "ol.style.Stroke": olapi + "module-ol_style_Stroke-Stroke.html",
    "ol.style.RegularShape": olapi + "module-ol_style_RegularShape.html",
    "ol.style.Style": olapi + "module-ol_style_Style-Style.html",
    "ol.Object": olapi + "module-ol_Object-BaseObject.html",
    "ol.source.ImageCanvas": olapi + "module-ol_source_ImageCanvas-ImageCanvasSource.html",
    "ol.source.TileImage": olapi + "module-ol_source_TileImage-TileImage.html",
    "ol.source.Image": olapi + "module-ol_source_Image-ImageSource.html",
    "ol.source.WMTS": olapi + "module-ol_source_WMTS-WMTS.html",
    "ol.source.XYZ": olapi + "module-ol_source_XYZ-XYZ.html",
    "ol.source.Vector": olapi + "module-ol_source_Vector-VectorSource.html",
    "ol.source.VectorTile": olapi + "module-ol_source_VectorTile-VectorTile.html",
    "ol.Pixel": olapi + "module-ol_pixel.html",
    "ol.source.State": olapi + "module-ol_source_State.html",
    "ol.layer.Layer": olapi + "module-ol_layer_Layer-Layer.html",
    "ol.layer.VectorTile": olapi + "module-ol_layer_VectorTile-VectorTileLayer.html",
    "ol.StyleFunction": olapi + "module-ol_style_Style.html#~StyleFunction",
    "ol.control.ScaleLine": olapi + "module-ol_control_ScaleLine-ScaleLine.html",
    "ol.control.ScaleLine.Units": olapi + "module-ol_control_ScaleLine.html",
    "ol.control.Control": olapi + "module-ol_control_Control-Control.html",
    "ol.tilegrid.TileGrid": olapi + "module-ol_tilegrid_TileGrid-TileGrid.html",
    "ol.tilegrid.WMTS": olapi + "module-ol_tilegrid_WMTS.html",
    "ol.loadingstrategy": olapi + "module-ol_loadingstrategy.html",

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
    "L.Circle": lfapi + '#circle',
    "L.Path-option": lfapi + '#path-option',
    "L.Rectangle": lfapi + '#rectangle',
    'L.LatLngBounds': lfapi+ '#latlngbounds',
    'L.Map': lfapi + '#map-example',
    'L.MapOptions': lfapi + '#map-option',
    'L.Evented':lfapi +'#evented',
    'L.Browser':lfapi +'#browser',

    //mapboxgl
    "mapboxgl.Evented": mbglapi + '#Evented',
    "mapboxgl.Map": mbglapi + '#map',
    "mapboxgl.LngLatBounds": mbglapi + '#lnglatbounds',
    "mapboxgl.LngLat": mbglapi + '#lnglat',
    "mapboxgl.Point": mbglapi + '#point',
    "mapboxgl.source": 'https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson',

    //maplibregl
    "maplibregl.Map": mlbglapi + '#map',
    "maplibregl.Evented": mlbglapi + '#Evented',
    "maplibregl.LngLatBounds": mlbglapi + '#lnglatbounds',

    //mapv
    "Mapv.DataSet": mapv + 'data/DataSet.md',
    "Mapv.BaiduMapLayer": mapv + 'map/baidu-map/Layer.md',

    //classic
    "SuperMap.Layer":classicapi + '/Layer-js.html',
    "SuperMap.Layer.Theme": classicapi + '/Layer/Theme-js.html#SuperMap.Layer.Theme',
    "SuperMap.Layer.Graph": classicapi + '/Layer/Theme/Graph-js.html#SuperMap.Layer.Graph',
    "SuperMap.Layer.RankSymbol": classicapi + '/Layer/Theme/RankSymbol-js.html#SuperMap.Layer.RankSymbol',
    "SuperMap.Map":classicapi + '/Map-js.html',
    "SuperMap.Bounds":classicapi + '/BaseTypes/Bounds-js.html',
    "SuperMap.LonLat":classicapi + '/BaseTypes/LonLat-js.html',

    // GeoJSON
    "GeoJSONObject": geojsonapi,
    "GeoJSONGeometry": geometryapi +'#section-3.1',
    "GeoJSONFeature": geometryapi + '#section-3.2',
    // WebMap 结构
    "WebMapSummaryObject": helpDocApi + '#iP/Appendix/WebMap/WebMapSummary.htm',
    "FlatGeobuf": 'https://github.com/flatgeobuf/flatgeobuf',

    // Web API
    "Promise": webApi + 'JavaScript/Reference/Global_Objects/Promise',
    "JSONObject": webApi + 'JavaScript/Reference/Global_Objects/JSON',
    "CanvasRenderingContext2D": webApi + 'API/CanvasRenderingContext2D',
    "HTMLElement": webApi + 'API/HTMLElement',
    "HTMLVideoElement": webApi + 'API/HTMLVideoElement',
    "HTMLCanvasElement": webApi + 'API/HTMLCanvasElement',
    "HTMLImageElement": webApi + 'API/HTMLImageElement',
    "ImageData": webApi + 'API/ImageData',
    "CanvasGradient": webApi + 'API/CanvasGradient',

    // THREE
    "THREE.Object3D": threeApi + '#api/core/Object3D',
    "THREE.Camera": threeApi + '#api/cameras/Camera',
    "THREE.Vector3": threeApi + '#api/math/Vector3',
    "THREE.Scene": threeApi + '#api/scenes/Scene',
    "THREE.WebGLRenderer": threeApi + '#api/renderers/WebGLRenderer',
    "THREE.Material": threeApi + '#api/en/materials/Material',
    "THREE.Mesh": threeApi + '#api/objects/Mesh',
    "THREE.Shape": threeApi + '#api/extras/core/Shape',

    // TF
    'tf.GraphModel': 'https://js.tensorflow.org/api/latest/#class:GraphModel',

    // File Blob
    'File': webApi + 'API/File',
    'Blob': webApi + 'API/Blob'
}
exports.typeLinks = typeLinks;
