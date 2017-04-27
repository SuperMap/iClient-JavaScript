require.config({
    paths: {
        'Cesium': './Cesium',
        'Zlib': './Workers/zlib.min'
    },
    shim: {
        Cesium: {
            exports: 'Cesium'
        },
        Zlib: {
            exports: 'Zlib'
        }
    }
});

if (typeof Cesium !== "undefined" && typeof Zlib !== "undefined") {
    onload(Cesium, Zlib);
} else if (typeof require === "function") {
    require(["Cesium", "Zlib"], onload);
}
