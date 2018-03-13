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
            inputCSS("http://cdn.bootcss.com/leaflet/1.2.0/leaflet.css");
            inputScript("http://cdn.bootcss.com/leaflet/1.2.0/leaflet.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("https://cdn.bootcss.com/Turf.js/4.6.1/turf.min.js");
        }
        if (inArray(includes, 'echarts')) {
            inputScript("http://cdn.bootcss.com/echarts/3.8.5/echarts.min.js");
        }
        if (inArray(includes, 'd3')) {
            inputScript("https://cdn.bootcss.com/d3/4.10.2/d3.min.js");
        }
        if (inArray(includes, 'd3-hexbin')) {
            inputScript("https://d3js.org/d3-hexbin.v0.2.min.js");
        }
        if (inArray(includes, 'd3Layer')) {
            inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet.d3Layer/leaflet-d3Layer.min.js");
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript("http://cdn.bootcss.com/elasticsearch/13.0.1/elasticsearch.min.js");
        }
        if (!inArray(excludes, 'iclient9-leaflet')) {
            inputScript("../../dist/iclient9-leaflet.min.js");
        }
        if (inArray(includes, 'iclient9-leaflet-css')) {
            inputCSS("../../dist/iclient9-leaflet.min.css");
        }
        if (inArray(includes, 'leaflet.heat')) {
            inputScript("http://cdn.bootcss.com/leaflet.heat/0.2.0/leaflet-heat.js");
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript("http://iclient.supermap.io/libs/osmbuildings/OSMBuildings-Leaflet.js");
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS("http://cdn.bootcss.com/leaflet.markercluster/1.0.3/MarkerCluster.Default.css");
            inputCSS("http://cdn.bootcss.com/leaflet.markercluster/1.0.3/MarkerCluster.css");
            inputScript("http://cdn.bootcss.com/leaflet.markercluster/1.0.3/leaflet.markercluster.js");
        }
        if (inArray(includes, 'leaflet-icon-pulse')) {
            inputCSS("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.css");
            inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.js");
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS("http://cdn.bootcss.com/leaflet.draw/0.4.12/leaflet.draw.css");
            inputScript("http://cdn.bootcss.com/leaflet.draw/0.4.12/leaflet.draw.js");
        }
        if (inArray(includes, 'leaflet.pm')) {
            inputCSS("http://cdn.bootcss.com/leaflet.pm/0.16.0/leaflet.pm.min.css");
            inputScript("http://cdn.bootcss.com/leaflet.pm/0.16.0/leaflet.pm.min.js");
        }
        if (inArray(includes, 'leaflet.miniMap')) {
            inputCSS("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-miniMap/dist/Control.MiniMap.min.css");
            inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-miniMap/dist/Control.MiniMap.min.js");
        }
        if (inArray(includes, 'leaflet.sidebyside')) {
            inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-side-by-side/leaflet-side-by-side.min.js");
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();
