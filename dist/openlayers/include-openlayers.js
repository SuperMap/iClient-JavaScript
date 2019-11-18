﻿(function () {
    var r = new RegExp("(^|(.*?\\/))(include-openlayers\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'),
        targetScript;
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
        if (!inArray(excludes, 'ol') && !inArray(includes, 'ol-debug')) {
            inputCSS("https://cdn.bootcss.com/openlayers/4.6.5/ol.css");
            inputScript("https://cdn.bootcss.com/openlayers/4.6.5/ol.js");
        }
        if (inArray(includes, 'ol-debug')) {
            inputCSS("https://cdn.bootcss.com/openlayers/4.6.5/ol-debug.css");
            inputScript("https://cdn.bootcss.com/openlayers/4.6.5/ol-debug.js");
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
        if (inArray(includes, 'proj4')) {
          inputScript("https://cdn.bootcss.com/proj4js/2.5.0/proj4.js");
        }
        if (inArray(includes, 'ol3-echarts')) {
          inputScript("https://cdn.jsdelivr.net/npm/ol3-echarts@1.3.6/dist/ol3Echarts.min.js");
        }


        if (inArray(includes, 'ol-mapbox-style')) {
            inputScript("http://iclient.supermap.io/web/libs/openlayers/plugins/ol-mapbox-style/2.11.2/olms.js");
        }
        if (inArray(includes, 'deck')) {
            inputScript("http://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js");
        }
        
        
        if (inArray(includes, 'osmbuildings')) {
            inputScript("http://iclient.supermap.io/libs/osmbuildings/OSMBuildings-OL3.js");
        }
        if (inArray(includes, 'animatedclusterlayer')) {
            inputScript("http://iclient.supermap.io/libs/openlayers/plugins/animatedclusterlayer/animatedclusterlayer.js");
        }
        if (inArray(includes, 'layerswitcher')) {
            inputCSS("http://iclient.supermap.io/libs/openlayers/plugins/ol-layerswitcher/2.0.0/ol-layerswitcher.css");
            inputScript("http://iclient.supermap.io/libs/openlayers/plugins/ol-layerswitcher/2.0.0/ol-layerswitcher.js");
        }
        if (inArray(includes, 'jsonsql')) {
            inputScript("http://iclient.supermap.io/web/libs/jsonsql/jsonsql.js");
        }
        if (inArray(includes, 'geostats')) {
            inputScript("http://iclient.supermap.io/web/libs/geostats/geostats.js");
        }
        if (inArray(includes, 'canvg')) {
            inputScript("http://iclient.supermap.io/web/libs/canvg/canvg.min.js");
        }
        
        // dist
        if (!inArray(excludes, 'iclient-openlayers')) {
          if (supportES6()) {
              inputScript("../../dist/openlayers/iclient-openlayers-es6.min.js");
          } else {
              inputScript("../../dist/openlayers/iclient-openlayers.min.js");
          }
        }
        if (!inArray(excludes, 'iclient-openlayers-css')) {
            inputCSS("../../dist/openlayers/iclient-openlayers.min.css");
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();