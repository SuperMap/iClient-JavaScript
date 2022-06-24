/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function () {
    var r = new RegExp('(^|(.*?\\/))(include-leaflet.js)(\\?|$)'),
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
        if (!inArray(excludes, 'leaflet')) {
          inputCSS('https://iclient.supermap.io/web/libs/leaflet/1.7.1/leaflet.css');
          inputScript('https://iclient.supermap.io/web/libs/leaflet/1.7.1/leaflet.js');
        }
        if (inArray(includes, 'mapbox-gl-enhance')) {
            inputCSS('https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.0/mapbox-gl-enhance.css');
            inputScript('https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.0/mapbox-gl-enhance.js');
        }
        if (inArray(includes, 'leaflet.heat')) {
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.heat/leaflet-heat.js');
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.markercluster/1.5.3/MarkerCluster.Default.css');
            inputCSS('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.markercluster/1.5.3/MarkerCluster.css');
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.markercluster/1.5.3/leaflet.markercluster.js');
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.draw/1.0.4/leaflet.draw.css');
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.draw/1.0.4/leaflet.draw.js');
        }
        if (inArray(includes, 'leaflet-geoman')) {
          inputCSS('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-geoman/2.11.3/leaflet-geoman.css');
          inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-geoman/2.11.3/leaflet-geoman.min.js');

        }
        if (inArray(includes, 'leaflet.miniMap')) {
            inputCSS('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-miniMap/3.6.1/dist/Control.MiniMap.min.css');
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-miniMap/3.6.1/dist/Control.MiniMap.min.js');
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
        if (inArray(includes, 'elasticsearch')) {
            inputScript('https://iclient.supermap.io/web/libs/elasticsearch/16.7.3/elasticsearch.min.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript('https://iclient.supermap.io/web/libs/xlsx/0.18.5/xlsx.core.min.js');
        }
        // 本地
        if (inArray(includes, 'leaflet.sidebyside')) {
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-side-by-side/leaflet-side-by-side.min.js');
        }
        if (inArray(includes, 'd3')) {
            inputScript('https://iclient.supermap.io/web/libs/d3/7.4.4/d3.min.js');
        }
        if (inArray(includes, 'd3-hexbin')) {
            inputScript('https://iclient.supermap.io/web/libs/d3/d3-hexbin.v0.2.min.js');
        }
        if (inArray(includes, 'd3Layer')) {
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet.d3Layer/leaflet-d3Layer.js');
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript('https://iclient.supermap.io/web/libs/osmbuildings/OSMBuildings-Leaflet.js');
        }
        if (inArray(includes, 'leaflet-icon-pulse')) {
            inputCSS('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.css');
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.js');
        }
        if (inArray(includes, 'deck')) {
            inputScript('https://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js');
        }
        if (inArray(includes, 'pixi')) {
            inputScript('https://iclient.supermap.io/web/libs/pixi/4.8.7/pixi.min.js');
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/Leaflet.PixiOverlay/1.8.2/L.PixiOverlay.min.js');
            inputScript('https://iclient.supermap.io/web/libs/leaflet/plugins/Leaflet.PixiOverlay/MarkerContainer.js');
            inputScript('https://iclient.supermap.io/web/libs/bezier-easing/2.1.0/bezier-easing.js');
        }
        if (inArray(includes, 'tensorflow')) {
            inputScript('https://iclient.supermap.io/web/libs/tensorflow/3.9.0/tf.min.js');
        }

        // iclient
        if (!inArray(excludes, 'iclient-leaflet')) {
            if (supportES6()) {
                inputScript('../../dist/leaflet/iclient-leaflet-es6.min.js');
            } else {
                inputScript('../../dist/leaflet/iclient-leaflet.min.js');
            }
        }
        if (inArray(includes, 'iclient-leaflet-css')) {
            inputCSS('../../dist/leaflet/iclient-leaflet.min.css');
        }
        if (inArray(includes, 'iclient-plot-leaflet')) {
            inputCSS('https://iclient.supermap.io/web/libs/plotting/leaflet/11.0.0/iclient-plot-leaflet.css');
            if (supportES6()) {
                inputScript('https://iclient.supermap.io/web/libs/plotting/leaflet/11.0.0/iclient-plot-leaflet-es6.min.js');
            } else {
                inputScript('https://iclient.supermap.io/web/libs/plotting/leaflet/11.0.0/iclient-plot-leaflet.min.js');
            }
        }
        if (inArray(includes, 'ant-design-vue')) {
            inputCSS('https://iclient.supermap.io/web/libs/ant-design-vue/1.7.8/antd.min.css');
            inputScript('https://iclient.supermap.io/web/libs/ant-design-vue/1.7.8/antd.min.js');
        }
        if (inArray(includes, 'echarts-vue')) {
            inputScript('https://iclient.supermap.io/web/libs/echarts/4.9.0/echarts.min.js');
            inputScript('https://iclient.supermap.io/web/libs/vue-echarts/4.1.0/vue-echarts.min.js');
            inputScript('https://iclient.supermap.io/web/libs/echarts-liquidfill/2.0.6/echarts-liquidfill.min.js');
            inputScript('https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js');
        }
        if (inArray(includes, 'iclient-leaflet-vue')) {
            inputCSS('../../dist/leaflet/iclient-leaflet-vue.css');
            inputScript('../../dist/leaflet/iclient-leaflet-vue.min.js');
        }
        if (inArray(includes, 'leaflet-mapbox-gl')) {
            inputScript('https://iclient.supermap.io/web/libs/leaflet-mapbox-gl/0.0.15/leaflet-mapbox-gl.min.js');
        }

    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//)
        ? 'http://localhost:8090'
        : document.location.protocol + '//' + document.location.host;
})();
