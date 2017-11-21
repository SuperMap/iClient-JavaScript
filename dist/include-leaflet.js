(function () {
    var r = new RegExp("(^|(.*?\\/))(include-leaflet\.js)(\\?|$)"),
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
        if (!inArray(excludes, 'leaflet')) {
            inputCSS("../../web/libs/leaflet/leaflet.css");
            inputScript("../../web/libs/leaflet/leaflet.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("../../web/libs/mapv/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("../../web/libs/turf/turf.min.js");
        }
        if (inArray(includes, 'echarts')) {
            inputScript("../../web/libs/echarts/echarts.min.js");
        }
        if (inArray(includes, 'd3')) {
            inputScript("../../web/libs/d3/d3.min.js");
        }
        if (inArray(includes, 'd3-hexbin')) {
            inputScript("../../web/libs/d3/d3-hexbin.v0.2.min.js");
        }
        if (inArray(includes, 'd3Layer')) {
            inputScript("../../web/libs/leaflet/plugins/leaflet.d3Layer/leaflet-d3Layer.min.js");
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript("../../web/libs/elasticsearch/elasticsearch.min.js");
        }
        if (!inArray(excludes, 'iclient9-leaflet')) {
            inputScript("../../dist/iclient9-leaflet.js");
        }
        if (inArray(includes, 'iclient9-leaflet-css')) {
            inputCSS("../../dist/iclient9-leaflet.min.css");
        }
        if (inArray(includes, 'leaflet.heat')) {
            inputScript("../../web/libs/leaflet/plugins/leaflet.heat/leaflet-heat.js");
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript("../../web/libs/osmbuildings/OSMBuildings-Leaflet.js");
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS("../../web/libs/leaflet/plugins/leaflet.markercluster/MarkerCluster.Default.css");
            inputCSS("../../web/libs/leaflet/plugins/leaflet.markercluster/MarkerCluster.css");
            inputScript("../../web/libs/leaflet/plugins/leaflet.markercluster/leaflet.markercluster.js");
        }
        if (inArray(includes, 'leaflet-icon-pulse')) {
            inputCSS("../../web/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.css");
            inputScript("../../web/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.js");
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS("../../web/libs/leaflet/plugins/leaflet.draw/leaflet.draw.css");
            inputScript("../../web/libs/leaflet/plugins/leaflet.draw/leaflet.draw.js");
        }
        if (inArray(includes, 'leaflet.pm')) {
            inputCSS("../../web/libs/leaflet/plugins/leaflet.pm/leaflet.pm.min.css");
            inputScript("../../web/libs/leaflet/plugins/leaflet.pm/leaflet.pm.min.js");
        }
    }

    load();
    window.isLocal = true;
    window.server = "http://localhost:8090";
})();
