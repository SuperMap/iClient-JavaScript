/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function () {
    var r = new RegExp("(^|(.*?\\/))(include-ol\.js)(\\?|$)"),
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
        if (!inArray(excludes, 'ol') && !inArray(includes, 'ol-debug') && !inArray(includes, 'ol@4.6.5')) {
            inputCSS("https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css");
            inputScript("https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js");
        }
        if (inArray(includes, 'ol@4.6.5')){
            inputCSS("https://cdn.bootcss.com/openlayers/4.6.5/ol.css");
            inputScript("https://cdn.bootcss.com/openlayers/4.6.5/ol.js");
        }
        if (inArray(includes, 'ol-debug')) {
            inputCSS("https://cdn.bootcss.com/openlayers/4.6.5/ol-debug.css");
            inputScript("https://cdn.bootcss.com/openlayers/4.6.5/ol-debug.js");
        }
        if (inArray(includes, 'mapv')) {
          inputScript("https://cdn.jsdelivr.net/npm/mapv@2.0.43/build/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("https://cdn.bootcss.com/Turf.js/5.1.6/turf.min.js");
        }
        if (inArray(includes, 'echarts')) {
          inputScript('https://cdn.jsdelivr.net/npm/echarts@4.5.0/dist/echarts.min.js');
        }
        if (inArray(includes, 'proj4')) {
          inputScript('https://cdn.bootcss.com/proj4js/2.6.0/proj4.js');
        }
        if (inArray(includes, 'ol3-echarts')) {
          inputScript("https://cdn.jsdelivr.net/npm/ol3-echarts@2.0.1/dist/ol3Echarts.min.js");
        }
        if (inArray(includes, 'ol3-echarts@1.3.6')) {
          inputScript("https://cdn.jsdelivr.net/npm/ol3-echarts@1.3.6/dist/ol3Echarts.min.js");
        }
        if (inArray(includes, 'ol-mapbox-style')) {
            inputScript("https://iclient.supermap.io/web/libs/openlayers/plugins/ol-mapbox-style/2.11.2/olms.js");
        }
        if (inArray(includes, 'deck')) {
            inputScript("https://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js");
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript("https://iclient.supermap.io/web/libs/osmbuildings/OSMBuildings-OL3.js");
        }
        if (inArray(includes, 'animatedclusterlayer')) {
            inputScript("https://iclient.supermap.io/web/libs/openlayers/plugins/animatedclusterlayer/animatedclusterlayer.js");
        }
        if (inArray(includes, 'layerswitcher')) {
            inputCSS("https://iclient.supermap.io/web/libs/openlayers/plugins/ol-layerswitcher/2.0.0/ol-layerswitcher.css");
            inputScript("https://iclient.supermap.io/web/libs/openlayers/plugins/ol-layerswitcher/2.0.0/ol-layerswitcher.js");
        }
        if (inArray(includes, 'jsonsql')) {
            inputScript("https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js");
        }
        if (inArray(includes, 'geostats')) {
            inputScript("https://iclient.supermap.io/web/libs/geostats/geostats.js");
        }
        if (inArray(includes, 'canvg')) {
          inputScript("https://cdn.jsdelivr.net/npm/canvg@3.0.2/lib/umd.min.js");
        }
        
        // dist
        if (!inArray(excludes, 'iclient-ol')) {
          if (supportES6()) {
              inputScript("../../dist/ol/iclient-ol-es6.min.js");
          } else {
              inputScript("../../dist/ol/iclient-ol.min.js");
          }
        }
        if (!inArray(excludes, 'iclient-ol-css')) {
            inputCSS("../../dist/ol/iclient-ol.min.css");
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();