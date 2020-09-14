/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function() {
    var r = new RegExp('(^|(.*?\\/))(include-mapboxgl.js)(\\?|$)'),
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
        if (!inArray(includes, 'mapbox-gl-enhance') && !inArray(excludes, 'mapbox-gl')) {
            inputCSS('https://cdn.jsdelivr.net/npm/mapbox-gl@1.12.0/dist/mapbox-gl.min.css');
            inputScript('https://cdn.jsdelivr.net/npm/mapbox-gl@1.12.0/dist/mapbox-gl.min.js');
        }
        if (inArray(includes, 'mapbox-gl-enhance')) {
            inputCSS('https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.2.0/mapbox-gl-enhance.css');
            inputScript('https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.2.0/mapbox-gl-enhance.js');
        }
        if (inArray(includes, 'draw')) {
            inputCSS('https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-draw/1.2.0/mapbox-gl-draw.css');
            inputScript('https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-draw/1.2.0/mapbox-gl-draw.js');
        }
        if (inArray(includes, 'compare')) {
            inputCSS('https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-compare/0.4.0/mapbox-gl-compare.css');
            inputScript('https://iclient.supermap.io/web/libs/mapbox-gl-js/plugins/mapbox-gl-compare/0.4.0/mapbox-gl-compare.js');
        }
        if (inArray(includes, 'mapv')) {
            inputScript('https://cdn.jsdelivr.net/npm/mapv@2.0.56/build/mapv.min.js');
        }
        if (inArray(includes, 'echarts')) {
            inputScript('https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js');
            inputScript('https://cdn.jsdelivr.net/npm/echarts-liquidfill@2.0.6/dist/echarts-liquidfill.min.js');
            inputScript('https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js');
        }
        if (inArray(includes, 'echarts-vue')) {
            inputScript('https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js');
            inputScript('https://cdn.jsdelivr.net/npm/vue-echarts@4.1.0/dist/vue-echarts.min.js');
            inputScript('https://cdn.jsdelivr.net/npm/echarts-liquidfill@2.0.6/dist/echarts-liquidfill.min.js');
            inputScript('https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js');
        }
        if (inArray(includes, 'three')) {
            inputScript('https://cdn.bootcss.com/three.js/92/three.min.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript('https://cdn.bootcss.com/xlsx/0.16.7/xlsx.core.min.js');
        }
        if (inArray(includes, 'proj4')) {
            inputScript('https://cdn.bootcss.com/proj4js/2.6.2/proj4.js');
        }
        if (inArray(includes, 'shapefile')) {
            inputScript('https://cdn.jsdelivr.net/npm/shapefile@0.6.6/dist/shapefile.js');
        }
        if (inArray(includes, 'ant-design-vue')) {
            inputCSS('https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.css');
            inputScript('https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.js');
        }
        if (inArray(includes, 'antd')) {
            inputCSS('https://cdn.bootcss.com/antd/3.25.3/antd.min.css');
            inputScript('https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js');
            inputScript('https://cdn.bootcss.com/antd/3.25.3/antd.js');
        }
        if (inArray(includes, 'deck')) {
            inputScript('https://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js');
        }
        if (inArray(includes, 'jsonsql')) {
            inputScript('https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js');
        }
        if (inArray(includes, 'geostats')) {
            inputScript('https://iclient.supermap.io/web/libs/geostats/geostats.js');
        }
        if (inArray(includes, 'canvg')) {
            inputScript('https://cdn.jsdelivr.net/npm/canvg@3.0.6/lib/umd.min.js');
        }
        if (inArray(includes, 'convert')) {
            inputScript('https://iclient.supermap.io/web/libs/xml-js/1.6.8/xml-js.min.js');
        }
        if (inArray(includes, 'LoaderSupport')) {
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/LoaderCommons.js');
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/LoaderBuilder.js');
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/LoaderWorkerSupport.js');
        }
        if (inArray(includes, 'OBJLoader')) {
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/OBJLoader.js');
        }
        if (inArray(includes, 'OBJLoader2')) {
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/OBJLoader2.js');
        }
        if (inArray(includes, 'MTLLoader')) {
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/MTLLoader.js');
        }
        if (inArray(includes, 'GLTFLoader')) {
            inputScript('https://iclient.supermap.io/web/libs/three/plugins/loaders/GLTFLoader.js');
        }
        if (inArray(includes, 'echarts-gl')) {
            inputScript('https://iclient.supermap.io/web/libs/echarts-gl/1.1.2/echarts-gl.min.js');
        }
        if (inArray(includes, 'mapbox-print-pdf')) {
            inputScript('https://iclient.supermap.io/web/libs/mapbox-print-pdf/0.4.4/mapbox-print-pdf.min.js');
        }
        // dist
        if (!inArray(excludes, 'iclient-mapboxgl')) {
            if (supportES6()) {
                inputScript('../../dist/mapboxgl/iclient-mapboxgl-es6.min.js');
            } else {
                inputScript('../../dist/mapboxgl/iclient-mapboxgl.min.js');
            }
        }
        if (!inArray(excludes, 'iclient-mapboxgl-css')) {
            inputCSS('../../dist/mapboxgl/iclient-mapboxgl.min.css');
        }
        if (inArray(includes, 'iclient-mapboxgl-vue')) {
            inputCSS('../../dist/mapboxgl/iclient-mapboxgl-vue.css');
            inputScript('../../dist/mapboxgl/iclient-mapboxgl-vue.min.js');
        }
        if (inArray(includes, 'iclient-mapboxgl-react')) {
            inputCSS('../../dist/mapboxgl/iclient-mapboxgl-react.css');
            inputScript('../../dist/mapboxgl/iclient-mapboxgl-react.min.js');
        }
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//)
        ? 'http://localhost:8090'
        : document.location.protocol + '//' + document.location.host;
})();
