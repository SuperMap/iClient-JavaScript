/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function() {
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
            inputCSS('https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css');
            inputScript('https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js');
        }
        if (inArray(includes, 'leaflet.heat')) {
            inputScript('https://cdn.bootcss.com/leaflet.heat/0.2.0/leaflet-heat.js');
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS('https://cdn.bootcss.com/leaflet.markercluster/1.4.1/MarkerCluster.Default.css');
            inputCSS('https://cdn.bootcss.com/leaflet.markercluster/1.4.1/MarkerCluster.css');
            inputScript('https://cdn.bootcss.com/leaflet.markercluster/1.4.1/leaflet.markercluster.js');
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS('https://cdn.bootcss.com/leaflet.draw/1.0.4/leaflet.draw.css');
            inputScript('https://cdn.bootcss.com/leaflet.draw/1.0.4/leaflet.draw.js');
        }
        if (inArray(includes, 'leaflet-geoman')) {
            inputCSS('https://cdn.jsdelivr.net/npm/@geoman-io/leaflet-geoman-free@2.7.0/dist/leaflet-geoman.css');
            inputScript('https://cdn.jsdelivr.net/npm/@geoman-io/leaflet-geoman-free@2.7.0/dist/leaflet-geoman.min.js');
        }
        if (inArray(includes, 'leaflet.miniMap')) {
            inputCSS('https://cdn.bootcss.com/leaflet-minimap/3.6.1/Control.MiniMap.min.css');
            inputScript('https://cdn.bootcss.com/leaflet-minimap/3.6.1/Control.MiniMap.min.js');
        }
        if (inArray(includes, 'mapv')) {
            inputScript('https://cdn.jsdelivr.net/npm/mapv@2.0.56/build/mapv.min.js');
        }
        if (inArray(includes, 'turf')) {
            inputScript('https://cdn.bootcss.com/Turf.js/5.1.6/turf.min.js');
        }
        if (inArray(includes, 'echarts')) {
            inputScript('https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js');
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript('https://cdn.bootcss.com/elasticsearch/16.7.1/elasticsearch.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript('https://cdn.jsdelivr.net/npm/xlsx@0.16.7/dist/xlsx.core.min.js');
        }
        // 本地
        if (inArray(includes, 'leaflet.sidebyside')) {
            inputScript(
                'https://iclient.supermap.io/web/libs/leaflet/plugins/leaflet-side-by-side/leaflet-side-by-side.min.js'
            );
        }
        if (inArray(includes, 'd3')) {
            inputScript('https://cdn.bootcss.com/d3/6.1.1/d3.min.js');
        }
        if (inArray(includes, 'd3-hexbin')) {
            inputScript('https://d3js.org/d3-hexbin.v0.2.min.js');
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
            inputScript('https://cdn.bootcss.com/pixi.js/4.8.7/pixi.js');
            inputScript('https://cdn.jsdelivr.net/npm/leaflet-pixi-overlay@1.8.1/L.PixiOverlay.min.js');
            inputScript(
                'https://iclient.supermap.io/web/libs/leaflet/plugins/Leaflet.PixiOverlay/1.8.1/MarkerContainer.js'
            );
            inputScript('https://iclient.supermap.io/web/libs/bezier-easing/2.1.0/bezier-easing.js');
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
            inputCSS('https://iclient.supermap.io/web/libs/plotting/leaflet/10.1.0/iclient-plot-leaflet.css');
            if (supportES6()) {
                inputScript(
                    'https://iclient.supermap.io/web/libs/plotting/leaflet/10.1.0/iclient-plot-leaflet-es6.min.js'
                );
            } else {
                inputScript('https://iclient.supermap.io/web/libs/plotting/leaflet/10.1.0/iclient-plot-leaflet.min.js');
            }
        }
        if (inArray(includes, 'ant-design-vue')) {
            inputCSS('https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.css');
            inputScript('https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.js');
        }
        if (inArray(includes, 'echarts-vue')) {
            inputScript('https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js');
            inputScript('https://cdn.jsdelivr.net/npm/vue-echarts@4.1.0/dist/vue-echarts.min.js');
            inputScript('https://cdn.jsdelivr.net/npm/echarts-liquidfill@2.0.6/dist/echarts-liquidfill.min.js');
            inputScript('https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js');
        }
        if (inArray(includes, 'iclient-leaflet-vue')) {
            inputCSS('../../dist/leaflet/iclient-leaflet-vue.css');
            inputScript('../../dist/leaflet/iclient-leaflet-vue.min.js');
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//)
        ? 'http://localhost:8090'
        : document.location.protocol + '//' + document.location.host;
})();
