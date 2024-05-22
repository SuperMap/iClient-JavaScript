/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
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
    function load(config) {
        var libsurl = config.libsurl;
        var disturl = config.disturl;
        var includes = (targetScript.getAttribute('include') || '').split(',');
        var excludes = (targetScript.getAttribute('exclude') || '').split(',');
        // 在线
        if (!inArray(includes, 'ol-debug') && !inArray(includes, 'ol@4.6.5') && !inArray(excludes, 'ol')) {
            inputCSS(libsurl + '/openlayers/6.14.1/ol.css');
            inputScript(libsurl + '/openlayers/6.14.1/ol.js');
        }
        if (inArray(includes, 'ol@4.6.5')) {
            inputCSS(libsurl + '/openlayers/4.6.5/ol.css');
            inputScript(libsurl + '/openlayers/4.6.5/ol.js');
        }
        if (inArray(includes, 'ol-debug')) {
            inputCSS(libsurl + '/openlayers/4.6.5/ol-debug.css');
            inputScript(libsurl + '/openlayers/4.6.5/ol-debug.js');
        }
        if (inArray(includes, 'g6')) {
          inputScript(libsurl + '/antv/g6/4.3.2/g6.min.js');
        }
        if (inArray(includes, 'mapv')) {
            inputScript(libsurl + '/mapv/2.0.62/mapv.min.js');
        }
        if (inArray(includes, 'turf')) {
            inputScript(libsurl + '/turf/6.5.0/turf.min.js');
        }
        if (inArray(includes, 'echarts')) {
          inputScript(libsurl + '/echarts/5.5.0/echarts.min.js');
        }
        if (inArray(includes, 'proj4')) {
            inputScript(libsurl + '/proj4/2.11.0/proj4.min.js');
        }
        if (inArray(includes, 'ol3-echarts')) {
            inputScript(libsurl + '/openlayers/ol3-echarts/2.0.6/ol3Echarts.min.js');
        }
        if (inArray(includes, 'ol3-echarts@1.3.6')) {
            inputScript(libsurl + '/openlayers/ol3-echarts/1.3.6/ol3Echarts.min.js');
        }
        if (inArray(includes, 'ol-mapbox-style')) {
            inputScript(libsurl + '/openlayers/plugins/ol-mapbox-style/2.11.2-4/olms.js');
        }
        if (inArray(includes, 'deck')) {
            inputScript(libsurl + '/deck.gl/5.1.3/deck.gl.min.js');
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript(libsurl + '/osmbuildings/OSMBuildings-OL3.js');
        }
        if (inArray(includes, 'animatedclusterlayer')) {
            inputScript(libsurl + '/openlayers/plugins/animatedclusterlayer/animatedclusterlayer.js');
        }
        if (inArray(includes, 'layerswitcher')) {
            inputCSS(libsurl + '/openlayers/plugins/ol-layerswitcher/3.8.3/ol-layerswitcher.css');
            inputScript(libsurl + '/openlayers/plugins/ol-layerswitcher/3.8.3/ol-layerswitcher.js');
        }
        if (inArray(includes, 'jsonsql')) {
          inputScript(libsurl + '/jsonsql/0.2.5/jsonsql.min.js');
        }
        if (inArray(includes, 'geostats')) {
            inputScript(libsurl + '/geostats/geostats.js');
        }
        if (inArray(includes, 'canvg')) {
            inputScript(libsurl + '/canvg/3.0.10/umd.min.js');
        }
        if (inArray(includes, 'tensorflow')) {
          inputScript(libsurl + '/tensorflow/3.9.0/tf.min.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript(libsurl + '/xlsx/0.19.3/xlsx.core.min.js');
        }
        if (inArray(includes, 'lodash')) {
          inputScript(libsurl + '/lodash/4.17.21/lodash.min.js');
        }
        if (inArray(includes, 'ugcwasm')) {
          inputScript(libsurl + '/ugcwasm/1.0.0/UGCWasmAll.js');
        }

        // dist
        if (!inArray(excludes, 'iclient-ol')) {
            if (supportES6()) {
                inputScript(disturl + '/ol/iclient-ol-es6.min.js');
            } else {
                inputScript(disturl + '/ol/iclient-ol.min.js');
            }
        }
        if (!inArray(excludes, 'iclient-ol-css')) {
            inputCSS(disturl + '/ol/iclient-ol.min.css');
        }
    }

    load({
        libsurl: 'https://iclient.supermap.io/web/libs',
        disturl: '../../dist'
    });
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//)
        ? 'http://localhost:8090'
        : document.location.protocol + '//' + document.location.host;
})();
