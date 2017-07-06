require.config({
    paths: {
        'Cesium': 'https://www.supermapol.com/earth/Build/Cesium/Cesium',
        'Zlib': 'https://www.supermapol.com/earth/Build/Cesium/Workers/zlib.min'
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
