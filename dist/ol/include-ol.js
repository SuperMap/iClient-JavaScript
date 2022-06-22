/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function() {
    var r = new RegExp('(^|(.*?\\/))(include-ol.js)(\\?|$)'),
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
            new Function(code)();
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
        var includes = (targetScript.getAttribute('include') || '').split(',');
        var excludes = (targetScript.getAttribute('exclude') || '').split(',');
        // 在线
        if (!inArray(excludes, 'ol') && !inArray(includes, 'ol-debug') && !inArray(includes, 'ol@4.6.5')) {
            inputCSS('https://iclient.supermap.io/web/libs/openlayers/6.14.1/ol.css');
            inputScript('https://iclient.supermap.io/web/libs/openlayers/6.14.1/ol.js');
        }
        if (inArray(includes, 'ol@4.6.5')) {
            inputCSS('https://iclient.supermap.io/web/libs/openlayers/4.6.5/ol.css');
            inputScript('https://iclient.supermap.io/web/libs/openlayers/4.6.5/ol.js');
        }
        if (inArray(includes, 'ol-debug')) {
            inputCSS('https://iclient.supermap.io/web/libs/openlayers/4.6.5/ol-debug.css');
            inputScript('https://iclient.supermap.io/web/libs/openlayers/4.6.5/ol-debug.js');
        }
        if (inArray(includes, 'mapv')) {
            inputScript('https://iclient.supermap.io/web/libs/mapv/2.0.62/mapv.min.js');
        }
        if (inArray(includes, 'turf')) {
            inputScript('https://iclient.supermap.io/web/libs/turf/6.5.0/turf.min.js');
        }
        if (inArray(includes, 'echarts')) {
            inputScript('https://iclient.supermap.io/web/libs/echarts/4.9.0/echarts.min.js');
        }
        if (inArray(includes, 'proj4')) {
            inputScript('https://iclient.supermap.io/web/libs/proj4/2.8.0/proj4.js');
        }
        if (inArray(includes, 'ol3-echarts')) {
            inputScript('https://iclient.supermap.io/web/libs/openlayers/ol3-echarts/2.0.6/ol3Echarts.min.js');
        }
        if (inArray(includes, 'ol3-echarts@1.3.6')) {
            inputScript('https://iclient.supermap.io/web/libs/openlayers/ol3-echarts/1.3.6/ol3Echarts.min.js');
        }
        if (inArray(includes, 'ol-mapbox-style')) {
            inputScript('https://iclient.supermap.io/web/libs/openlayers/plugins/ol-mapbox-style/2.11.2-4/olms.js');
        }
        if (inArray(includes, 'deck')) {
            inputScript('https://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js');
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript('https://iclient.supermap.io/web/libs/osmbuildings/OSMBuildings-OL3.js');
        }
        if (inArray(includes, 'animatedclusterlayer')) {
            inputScript('https://iclient.supermap.io/web/libs/openlayers/plugins/animatedclusterlayer/animatedclusterlayer.js');
        }
        if (inArray(includes, 'layerswitcher')) {
            inputCSS('https://iclient.supermap.io/web/libs/openlayers/plugins/ol-layerswitcher/3.8.3/ol-layerswitcher.css');
            inputScript('https://iclient.supermap.io/web/libs/openlayers/plugins/ol-layerswitcher/3.8.3/ol-layerswitcher.js');
        }
        if (inArray(includes, 'jsonsql')) {
            inputScript('https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js');
        }
        if (inArray(includes, 'geostats')) {
            inputScript('https://iclient.supermap.io/web/libs/geostats/geostats.js');
        }
        if (inArray(includes, 'canvg')) {
            inputScript('https://iclient.supermap.io/web/libs/canvg/canvg.min.js');
        }
        if (inArray(includes, 'tensorflow')) {
          inputScript('https://iclient.supermap.io/web/libs/tensorflow/3.9.0/tf.min.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript('https://iclient.supermap.io/web/libs/xlsx/0.18.5/xlsx.core.min.js');
        }

        // dist
        if (!inArray(excludes, 'iclient-ol')) {
            if (supportES6()) {
                inputScript('../../dist/ol/iclient-ol-es6.min.js');
            } else {
                inputScript('../../dist/ol/iclient-ol.min.js');
            }
        }
        if (!inArray(excludes, 'iclient-ol-css')) {
            inputCSS('../../dist/ol/iclient-ol.min.css');
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//)
        ? 'http://localhost:8090'
        : document.location.protocol + '//' + document.location.host;
})();
