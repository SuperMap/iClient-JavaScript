var  vectorstylesEscapedJson={
    "sources": {
        "California": {
            "tiles": [
                "http://54.223.164.155:8090/iserver/services/map-mvt-California/rest/maps/California/tileFeature.mvt?returnAttributes=true&width=512&height=512&viewBounds={bbox-epsg-3857}"
            ],
            "type": "vector"
        }
    },
    "name": "California",
    "sprite": "http://54.223.164.155:8090/iserver/services/map-mvt-California/rest/maps/California/tilefeature/mvtsprites/sprite@2x",
    "layers": [
        {
            "paint": {
                "background-color": "rgba(168,209,221,1.00)"
            },
            "id": "background",
            "type": "background"
        },
        {
            "layout": {
                "visibility": "visible"
            },
            "maxzoom": 21,
            "paint": {
                "fill-color": "rgba(249,246,240,1.00)",
                "fill-antialias": true
            },
            "id": "Adm_R@California",
            "source": "California",
            "source-layer": "Adm_R@California",
            "type": "fill",
            "minzoom": 0
        },
        {
            "layout": {
                "visibility": "visible"
            },
            "maxzoom": 16,
            "paint": {
                "fill-color": "rgba(249,224,219,0.90)",
                "fill-antialias": true
            },
            "id": "Military_R@California#26",
            "source": "California",
            "source-layer": "Military_R@California",
            "type": "fill",
            "minzoom": 15
        }
    ],
    "glyphs": "http://54.223.164.155:8090/iserver/services/map-mvt-California/rest/maps/California/tileFeature/sdffonts/{fontstack}/{range}.pbf",
    "version": 8
}
var spriteEscapedJson={
    "BGRR_ECCDD1_11_7": {
        "pixelRatio": 1,
        "x": 276,
        "width": 21,
        "y": 37,
        "height": 17
    },
    "BGRR_ECCDD1_57_7": {
        "pixelRatio": 1,
        "x": 265,
        "width": 67,
        "y": 163,
        "height": 17
    },
    "BGRR_ECCDD1_15_7": {
        "pixelRatio": 1,
        "x": 174,
        "width": 25,
        "y": 37,
        "height": 17
    },
    "BGRR_ECCDD1_38_8": {
        "pixelRatio": 1,
        "x": 444,
        "width": 48,
        "y": 37,
        "height": 18
    },
   
    "BGRR_FCE1D6_60_8": {
        "pixelRatio": 1,
        "x": 138,
        "width": 70,
        "y": 109,
        "height": 18
    },
    "BGRR_FCE1D6_60_7": {
        "pixelRatio": 1,
        "x": 145,
        "width": 70,
        "y": 91,
        "height": 17
    },
    "BGRR_F9E9D4_52_8": {
        "pixelRatio": 1,
        "x": 319,
        "width": 62,
        "y": 18,
        "height": 18
    },
    "BGRR_FCE1D6_76_8": {
        "pixelRatio": 1,
        "x": 57,
        "width": 86,
        "y": 199,
        "height": 18
    },
 
    "BGRR_ECCDD1_42_8": {
        "pixelRatio": 1,
        "x": 0,
        "width": 52,
        "y": 127,
        "height": 18
    }
}