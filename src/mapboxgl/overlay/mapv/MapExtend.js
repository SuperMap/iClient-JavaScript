import mapboxgl from 'mapbox-gl';

mapboxgl.supermap = mapboxgl.supermap || {};
mapboxgl.supermap.map = mapboxgl.supermap.map || {};

/**
 * @class mapboxgl.supermap.map.getDefaultVectorTileStyle
 * @description 配置默认底图样式
 */
export var getDefaultVectorTileStyle = function (urlTemplate, options) {
    options = options || {};
    var defaultOptions = {};
    defaultOptions.version = options.version || 8;
    defaultOptions.layers = options.layers || [];
    defaultOptions.light = options.light || {
        "anchor": "viewport",
        "color": "#fcf6ef",
        "intensity": 0.5,
        "position": [1.15, 201, 20]
    };

    var style = {
        "version": defaultOptions.version,
        "sources": {
            "vector-tiles": {
                "type": "vector",
                "tiles": [urlTemplate]
            }
        },
        "layers": defaultOptions.layers,
        "light": defaultOptions.light
    };
    if (options.sprite != null) {
        style.sprite = options.sprite;
    }
    if (options.glyphs != null) {
        style.glyphs = options.glyphs;
    }
    return style;
};

/**
 * @class mapboxgl.supermap.map.setBackground
 * @description 设置地图背景
 */
export var setBackground = function (map, color) {
    if (color && map) {
        map.addLayer({
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": color
            }
        }, "background");
    }
};

/**
 * @class mapboxgl.supermap.map.setPaintProperty
 * @description  设置图层风格
 * @param map
 * @param layerIds
 * @param type
 * @param paint
 * @param source 非必填，默认vector-tiles
 * @param sourceLayers 非必填，默认与id对应
 */
export var setPaintProperty = function (map, layerIds, type, paint, source, sourceLayers,) {
    if (layerIds && map) {
        if (Object.prototype.toString.call(layerIds) !== '[object Array]') {
            layerIds = [layerIds];
        }
        for (var i = 0; i < layerIds.length; i++) {
            var sourceLayer = sourceLayers ? sourceLayers[i] : null;
            var layer = getLayer(layerIds[i], type, source, sourceLayer, paint);
            map.addLayer(layer, layerIds[i]);
            map.moveLayer(layerIds[i]);
        }
    }
};

function getLayer(id, type, source, sourceLayer, paint) {
    var sourceType = source || "vector-tiles";
    var sLayer = sourceLayer || id;
    var layer = {
        "id": id,
        "type": type,
        "source": sourceType,
        "source-layer": sLayer,
        "paint": paint
    };
    return layer;
}


mapboxgl.supermap.map.getDefaultVectorTileStyle = getDefaultVectorTileStyle;
mapboxgl.supermap.map.setBackground = setBackground;
mapboxgl.supermap.map.setPaintProperty = setPaintProperty;