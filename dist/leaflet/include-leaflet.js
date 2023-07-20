/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
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
    function load(config) {
        var libsurl = config.libsurl;
        var disturl = config.disturl;
        var includes = (targetScript.getAttribute('include') || '').split(',');
        var excludes = (targetScript.getAttribute('exclude') || '').split(',');
        // 在线
        if (!inArray(excludes, 'leaflet')) {
          inputCSS(libsurl + '/leaflet/1.9.4/leaflet.css');
          inputScript(libsurl + '/leaflet/1.9.4/leaflet.js');
        }
        if (inArray(includes, 'mapbox-gl-enhance')) {
            inputCSS(libsurl + '/mapbox-gl-js-enhance/1.12.0-1/mapbox-gl-enhance.css');
            inputScript(libsurl + '/mapbox-gl-js-enhance/1.12.0-1/mapbox-gl-enhance.js');
        }
        if (inArray(includes, 'leaflet.heat')) {
            inputScript(libsurl + '/leaflet/plugins/leaflet.heat/leaflet-heat.js');
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS(libsurl + '/leaflet/plugins/leaflet.markercluster/1.5.3/MarkerCluster.Default.css');
            inputCSS(libsurl + '/leaflet/plugins/leaflet.markercluster/1.5.3/MarkerCluster.css');
            inputScript(libsurl + '/leaflet/plugins/leaflet.markercluster/1.5.3/leaflet.markercluster.js');
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS(libsurl + '/leaflet/plugins/leaflet.draw/1.0.4/leaflet.draw.css');
            inputScript(libsurl + '/leaflet/plugins/leaflet.draw/1.0.4/leaflet.draw.js');
        }
        if (inArray(includes, 'leaflet-geoman')) {
          inputCSS(libsurl + '/leaflet/plugins/leaflet-geoman/2.14.2/leaflet-geoman.css');
          inputScript(libsurl + '/leaflet/plugins/leaflet-geoman/2.14.2/leaflet-geoman.min.js');

        }
        if (inArray(includes, 'leaflet.miniMap')) {
            inputCSS(libsurl + '/leaflet/plugins/leaflet-miniMap/3.6.1/dist/Control.MiniMap.min.css');
            inputScript(libsurl + '/leaflet/plugins/leaflet-miniMap/3.6.1/dist/Control.MiniMap.min.js');
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
          inputScript(libsurl + '/echarts/5.4.3/echarts.min.js');
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript(libsurl + '/elasticsearch/16.7.3/elasticsearch.min.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript(libsurl + '/xlsx/0.19.3/xlsx.core.min.js');
        }
        // 本地
        if (inArray(includes, 'leaflet.sidebyside')) {
            inputScript(libsurl + '/leaflet/plugins/leaflet-side-by-side/2.0.1/leaflet-side-by-side.min.js');
        }
        if (inArray(includes, 'd3')) {
            inputScript(libsurl + '/d3/7.8.2/d3.min.js');
        }
        if (inArray(includes, 'd3-hexbin')) {
            inputScript(libsurl + '/d3-hexbin/0.2.2/d3-hexbin.v0.2.min.js');
        }
        if (inArray(includes, 'd3Layer')) {
            inputScript(libsurl + '/leaflet/plugins/leaflet.d3Layer/leaflet-d3Layer.js');
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript(libsurl + '/osmbuildings/OSMBuildings-Leaflet.js');
        }
        if (inArray(includes, 'leaflet-icon-pulse')) {
            inputCSS(libsurl + '/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.css');
            inputScript(libsurl + '/leaflet/plugins/leaflet-icon-pulse/L.Icon.Pulse.js');
        }
        if (inArray(includes, 'deck')) {
            inputScript(libsurl + '/deck.gl/5.1.3/deck.gl.min.js');
        }
        if (inArray(includes, 'pixi')) {
            inputScript(libsurl + '/pixi/4.8.7/pixi.min.js');
            inputScript(libsurl + '/leaflet/plugins/Leaflet.PixiOverlay/1.9.4/L.PixiOverlay.min.js');
            inputScript(libsurl + '/leaflet/plugins/Leaflet.PixiOverlay/MarkerContainer.js');
            inputScript(libsurl + '/bezier-easing/2.1.0/bezier-easing.js');
        }
        if (inArray(includes, 'tensorflow')) {
            inputScript(libsurl + '/tensorflow/3.9.0/tf.min.js');
        }

        // iclient
        if (!inArray(excludes, 'iclient-leaflet')) {
            if (supportES6()) {
                inputScript(disturl + '/leaflet/iclient-leaflet-es6.min.js');
            } else {
                inputScript(disturl + '/leaflet/iclient-leaflet.min.js');
            }
        }
        if (inArray(includes, 'iclient-leaflet-css')) {
            inputCSS(disturl + '/leaflet/iclient-leaflet.min.css');
        }
        if (inArray(includes, 'iclient-plot-leaflet')) {
            inputCSS(libsurl + '/plotting/leaflet/11.1.0/iclient-plot-leaflet.css');
            if (supportES6()) {
                inputScript(libsurl + '/plotting/leaflet/11.1.0/iclient-plot-leaflet-es6.min.js');
            } else {
                inputScript(libsurl + '/plotting/leaflet/11.1.0/iclient-plot-leaflet.min.js');
            }
        }
        if (inArray(includes, 'ant-design-vue')) {
            inputCSS(libsurl + '/ant-design-vue/1.7.8/antd.min.css');
            inputScript(libsurl + '/ant-design-vue/1.7.8/antd.min.js');
        }
        if (inArray(includes, 'echarts-vue')) {
            inputScript(libsurl + '/echarts/4.9.0/echarts.min.js');
            inputScript(libsurl + '/vue-echarts/4.1.0/vue-echarts.min.js');
            inputScript(libsurl + '/echarts-liquidfill/2.0.6/echarts-liquidfill.min.js');
            inputScript(libsurl + '/echartsLayer/EchartsLayer.min.js');
        }
        if (inArray(includes, 'iclient-leaflet-vue')) {
            inputCSS(disturl + '/leaflet/iclient-leaflet-vue.css');
            inputScript(disturl + '/leaflet/iclient-leaflet-vue.min.js');
        }
        if (inArray(includes, 'leaflet-mapbox-gl')) {
            inputScript(libsurl + '/leaflet-mapbox-gl/0.0.15/leaflet-mapbox-gl.min.js');
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
