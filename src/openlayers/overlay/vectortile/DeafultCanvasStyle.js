require('../../core/Base');

ol.supermap.DeafultCanvasStyle = {
    "TEXT": {
        font: "10px sans-serif",
        textAlign: "middle",
        textBaseline: "center",
        direction: "ltr",
        /*expand*/
        bold: false,
        haloRadius: 0,
        backColor: "rgba(255,255,255,1)",
        foreColor: "rgba(0,0,0,1)",
        // foreColor: "rgba(0,0,0,0)",
        offsetX: 0,
        offsetY: 0,
        textHeight: 0,

        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        imageSmoothingEnabled: true
    },
    /*expand*/
    "POINT": {
        pointFile: "",

        /*expand*/
        pointRadius: 3,
        pointHaloRadius: 1,
        pointHaloColor: "#c33",
        offsetX: 0,
        offsetY: 0,
        fillStyle: "#fc0",

        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        imageSmoothingEnabled: true
    },
    "LINE": {
        strokeStyle: "rgba(0,0,0,0)",
        lineWidth: 1,
        lineCap: "butt",
        lineJoin: "round",
        miterLimit: 10,
        lineDashOffset: 0,
        /*expand*/
        lineDasharray: [],
        strokeOpacity: 1,
        offset: 0,

        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        imageSmoothingEnabled: true
    },
    "REGION": {
        /*包含LINE的部分*/
        strokeStyle: "rgba(0,0,0,0)",
        lineWidth: 1,
        lineCap: "butt",
        lineJoin: "round",
        miterLimit: 10,
        lineDashOffset: 0,
        /*expand*/
        lineOpacity: 1,
        fillOpacity: 1,
        lineDasharray: [],

        fillStyle: "rgba(0,0,0,0)",
        polygonOpacity: 1,

        /*expand*/
        offsetX: 0,
        offsetY: 0,

        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        imageSmoothingEnabled: true
    },
    "SHADOW": {
        shadowBlur: 0,
        shadowColor: "rgba(0,0,0,0)",
        shadowOffsetX: 0,
        shadowOffsetY: 0
    },
    "GLOBAL": {
        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        imageSmoothingEnabled: true
    }
};

module.exports = function () {
    return new ol.supermap.DeafultCanvasStyle();
};