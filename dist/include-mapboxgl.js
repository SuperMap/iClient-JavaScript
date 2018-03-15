(function () {
    var r = new RegExp("(^|(.*?\\/))(include-mapboxgl\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'), targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    function inputScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }

    function inputCSS(url) {
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }

    function inArray(arr, item) {
        for (i in arr) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        if (!inArray(excludes, 'mapbox-gl')) {
            inputCSS("https://cdn.bootcss.com/mapbox-gl/0.43.0/mapbox-gl.css");
            inputScript("https://cdn.bootcss.com/mapbox-gl/0.43.0/mapbox-gl.js");
        }
        if (inArray(includes, 'draw')) {
            inputCSS("http://iclient.supermap.io/libs/mapbox-gl-js/plugins/mapbox-gl-draw/mapbox-gl-draw.css");
            inputScript("http://iclient.supermap.io/libs/mapbox-gl-js/plugins/mapbox-gl-draw/mapbox-gl-draw.js");
        }
        if (inArray(includes, 'compare')) {
            inputCSS("http://iclient.supermap.io/libs/mapbox-gl-js/plugins/mapbox-gl-compare/mapbox-gl-compare.css");
            inputScript("http://iclient.supermap.io/libs/mapbox-gl-js/plugins/mapbox-gl-compare/mapbox-gl-compare.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        if (inArray(includes, 'echarts')) {
            inputScript("https://cdn.bootcss.com/echarts/3.8.0/echarts.min.js");
            inputScript("http://iclient.supermap.io/libs/echartsLayer/EchartsLayer.js");
        }
        if (inArray(includes, 'three')) {
            inputScript("https://cdn.bootcss.com/three.js/90/three.min.js");
        }
        if (!inArray(excludes, 'iclient9-mapboxgl')) {
            inputScript("../../dist/iclient9-mapboxgl.min.js");
        }
        if (inArray(includes, 'proj4')) {
            inputScript("https://cdn.bootcss.com/proj4js/2.4.3/proj4.js");
        }
        if (inArray(includes, 'echarts-gl')) {
            inputScript("http://echarts.baidu.com/resource/echarts-gl-latest/dist/echarts-gl.js");
        }
        if (inArray(includes, 'shapefile')) {
            inputScript("https://unpkg.com/shapefile@0.6.6/dist/shapefile.js");
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();
