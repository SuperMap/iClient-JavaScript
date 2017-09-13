(function () {
    var r = new RegExp("(^|(.*?\\/))(include-openlayers\.js)(\\?|$)"),
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
        if (!inArray(excludes, 'ol')) {
            inputCSS("http://cdn.bootcss.com/openlayers/4.2.0/ol.css");
            inputScript("http://cdn.bootcss.com/openlayers/4.2.0/ol.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("https://cdn.bootcss.com/Turf.js/4.6.1/turf.min.js");
        }
        if (!inArray(excludes, 'iclient9-openlayers')) {
            inputScript("../../dist/iclient9-openlayers.min.js");
        }
        if (!inArray(excludes, 'iclient9-openlayers-css')) {
            inputCSS("../../dist/iclient9-openlayers.min.css");
        }
        if (inArray(includes, 'echarts')) {
            inputScript("http://cdn.bootcss.com/echarts/3.6.2/echarts.min.js");
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript("http://iclient.supermapol.com/libs/osmbuildings/OSMBuildings-OL3.js");
        }
        if (inArray(includes, 'animatedclusterlayer')) {
            inputScript("http://viglino.github.io/OL3-AnimatedCluster/layer/animatedclusterlayer.js");
        }
        if (inArray(includes, 'datgui')) {
            inputScript("http://cdn.bootcss.com/dat-gui/0.6.5/dat.gui.js");
        }
    }

    load();
})();
