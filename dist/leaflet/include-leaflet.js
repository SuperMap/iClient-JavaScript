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

    function supportES6() {
        var code = "'use strict'; class Foo {}; class Bar extends Foo {};";
        try {
            (new Function(code))();
        } catch (err) {
            return false;
        }
        if (!Array.from) {
            return false;
        }
        return true;
    }

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        // 在线
        if (!inArray(excludes, 'leaflet')) {
            inputCSS("https://cdn.bootcss.com/leaflet/1.5.1/leaflet.css");
            inputScript("https://cdn.bootcss.com/leaflet/1.5.1/leaflet.js");
        }
        if (inArray(includes, 'leaflet.heat')) {
          inputScript("https://cdn.bootcss.com/leaflet.heat/0.2.0/leaflet-heat.js");
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS("https://cdn.bootcss.com/leaflet.markercluster/1.4.1/MarkerCluster.Default.css");
            inputCSS("https://cdn.bootcss.com/leaflet.markercluster/1.4.1/MarkerCluster.css");
            inputScript("https://cdn.bootcss.com/leaflet.markercluster/1.4.1/leaflet.markercluster.js");
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS("https://cdn.bootcss.com/leaflet.draw/1.0.4/leaflet.draw.css");
            inputScript("https://cdn.bootcss.com/leaflet.draw/1.0.4/leaflet.draw.js");
        }
        if (inArray(includes, 'leaflet.pm')) {
            inputCSS("https://cdn.bootcss.com/leaflet.pm/2.2.0/leaflet.pm.css");
            inputScript("https://cdn.bootcss.com/leaflet.pm/2.2.0/leaflet.pm.min.js");
        }
        if (inArray(includes, 'leaflet.miniMap')) {
            inputCSS("https://cdn.bootcss.com/leaflet-minimap/3.6.1/Control.MiniMap.min.css");
            inputScript("https://cdn.bootcss.com/leaflet-minimap/3.6.1/Control.MiniMap.min.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("https://cdn.bootcss.com/Turf.js/5.1.6/turf.min.js");
        }
        if (inArray(includes, 'echarts')) {
          inputScript("https://cdn.bootcss.com/echarts/4.3.0-rc.2/echarts.min.js");
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript("https://cdn.bootcss.com/elasticsearch/16.3.0/elasticsearch.js");
        }
        if (inArray(includes, 'xlsx')) {
            inputScript("https://cdn.bootcss.com/xlsx/0.15.1/xlsx.core.min.js");
        }
        // 本地
        if (inArray(includes, 'leaflet.sidebyside')) {
            inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-side-by-side/leaflet-side-by-side.min.js");
        }
        if (inArray(includes, 'd3')) {
          inputScript("http://iclient.supermap.io/web/libs/d3/5.12.0/d3.js");
        }
        if (inArray(includes, 'd3-hexbin')) {
          inputScript("https://d3js.org/d3-hexbin.v0.2.min.js");
        }
        if (inArray(includes, 'd3Layer')) {
            inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet.d3Layer/leaflet-d3Layer.js");
        }
        if (inArray(includes, 'osmbuildings')) {
          inputScript("http://iclient.supermap.io/web/libs/osmbuildings/OSMBuildings-Leaflet.js");
        }
        if (inArray(includes, 'leaflet-icon-pulse')) {
          inputCSS("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.css");
          inputScript("http://iclient.supermap.io/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.js");
        }
        if (inArray(includes, 'deck')) {
          inputScript("http://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js");
        }

        // iclient
        if (!inArray(excludes, 'iclient-leaflet')) {
          if (supportES6()) {
              inputScript("../../dist/leaflet/iclient-leaflet-es6.min.js");
          } else {
              inputScript("../../dist/leaflet/iclient-leaflet.min.js");
          }
        }
        if (inArray(includes, 'iclient-leaflet-css')) {
            inputCSS("../../dist/leaflet/iclient-leaflet.min.css");
        }
        if (inArray(includes, 'iclient-plot-leaflet')) {
            inputCSS("http://iclient.supermap.io/web/libs/plotting/leaflet/10.0.0/iclient-plot-leaflet.css");
            if (supportES6()) {
                inputScript("http://iclient.supermap.io/web/libs/plotting/leaflet/10.0.0/iclient-plot-leaflet-es6.min.js");
            } else {
                inputScript("http://iclient.supermap.io/web/libs/plotting/leaflet/10.0.0/iclient-plot-leaflet.min.js");
            }
        }
        if (inArray(includes, 'ant-design-vue')) {
          inputCSS("https://unpkg.com/ant-design-vue@1.3.9/dist/antd.min.css");
          inputScript("https://unpkg.com/ant-design-vue@1.3.9/dist/antd.min.js");
        }
        if (inArray(includes, 'iclient-leaflet-vue')) {
          inputCSS("../../dist/leaflet/iclient-leaflet-vue.css");
          inputScript("../../dist/leaflet/iclient-leaflet-vue.min.js");
        }
    }


    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();
