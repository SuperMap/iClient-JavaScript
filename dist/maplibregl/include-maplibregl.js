﻿/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function () {
  var r = new RegExp('(^|(.*?\\/))(include-maplibregl.js)(\\?|$)'),
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
    if (!inArray(includes, 'maplibre-gl-enhance') && !inArray(excludes, 'maplibregl')) {
      inputCSS(libsurl + '/maplibre-gl-js/5.6.0/maplibre-gl.min.css');
      inputScript(libsurl + '/maplibre-gl-js/5.6.0/maplibre-gl.min.js');
    }
    if (inArray(includes, 'maplibre-gl-enhance')) {
      inputCSS(libsurl + '/maplibre-gl-js-enhance/4.3.0-5/maplibre-gl-enhance.css');
      inputScript(libsurl + '/maplibre-gl-js-enhance/4.3.0-5/maplibre-gl-enhance.js');
    }
    if (inArray(includes, 'L7')) {
      inputScript(libsurl + '/maplibregl-l7-render/0.0.3/maplibregl-l7-render.js');
    }
    if (inArray(includes, 'g2')) {
      inputScript(libsurl + '/antv/g2/4.2.8/g2.min.js');
    }
    if (inArray(includes, 'turf')) {
      inputScript(libsurl + '/turf/7.2.0/turf.min.js');
    }
    if (inArray(includes, 'draw')) {
      inputCSS(libsurl + '/mapbox-gl-js/plugins/mapbox-gl-draw/1.4.3/mapbox-gl-draw.min.css');
      inputScript(libsurl + '/mapbox-gl-js/plugins/mapbox-gl-draw/1.4.3/mapbox-gl-draw.min.js');
    }
    if (inArray(includes, 'mapboxgl-draw-rectangle-drag')) {
      inputScript(libsurl + '/mapboxgl-draw-rectangle-drag/1.0.1/mapboxgl-draw-rectangle-drag.browser.js');
    }
    if (inArray(includes, 'mapv')) {
      inputScript(libsurl + '/mapv/2.0.62/mapv.min.js');
    }
    if (inArray(includes, 'echarts')) {
      inputScript(libsurl + '/echarts/5.5.0/echarts.min.js');
      inputScript(libsurl + '/maplibre-echartsLayer/EchartsLayer.min.js');
    }
    if (inArray(includes, 'echarts-vue')) {
      inputScript(libsurl + '/echarts/4.9.0/echarts.min.js');
      inputScript(libsurl + '/vue-echarts/4.1.0/vue-echarts.min.js');
      inputScript(libsurl + '/echarts-liquidfill/2.0.6/echarts-liquidfill.min.js');
      inputScript(libsurl + '/maplibre-echartsLayer/EchartsLayer.min.js');
    }
    if (inArray(includes, 'three')) {
      inputScript(libsurl + '/three/0.150.1/three.min.js');
    }
    if (inArray(includes, 'three@0.121.1')) {
      inputScript(libsurl + '/three/0.121.1/build/three.js');
    }
    if (inArray(includes, 'xlsx')) {
      inputScript(libsurl + '/xlsx/0.19.3/xlsx.core.min.js');
    }
    if (inArray(includes, 'proj4')) {
      inputScript(libsurl + '/proj4/2.17.0/proj4.min.js');
    }
    if (inArray(includes, 'shapefile')) {
      inputScript(libsurl + '/shapefile/shapefile.js');
    }
    if (inArray(includes, 'ant-design-vue')) {
      inputCSS(libsurl + '/ant-design-vue/1.7.8/antd.min.css');
      inputScript(libsurl + '/ant-design-vue/1.7.8/antd.min.js');
    }
    if (inArray(includes, 'antd')) {
      inputCSS(libsurl + '/antd/3.25.3/antd.min.css');
      inputScript(libsurl + '/moment/2.29.4/moment.min.js');
      inputScript(libsurl + '/antd/3.25.3/antd.min.js');
    }
    if (inArray(includes, 'deck')) {
      inputScript(libsurl + '/deck.gl/5.1.3/deck.gl.min.js');
    }
    if (inArray(includes, 'jsonsql')) {
      inputScript(libsurl + '/jsonsql/jsonsql.js');
    }
    if (inArray(includes, 'geostats')) {
      inputScript(libsurl + '/geostats/geostats.js');
    }
    if (inArray(includes, 'LegacyJSONLoader')) {
      inputScript(libsurl + '/three/0.110.0/examples/js/loaders/deprecated/LegacyJSONLoader.js');
    }
    if (inArray(includes, 'OBJLoader')) {
      inputScript(libsurl + '/three/0.129.0/examples/js/loaders/OBJLoader.js');
    }

    if (inArray(includes, 'three92')) {
      inputScript(libsurl + '/three/92/three.min.js');
    }
    if (inArray(includes, 'LoaderSupport')) {
      inputScript(libsurl + '/three/plugins/loaders/LoaderCommons.js');
      inputScript(libsurl + '/three/plugins/loaders/LoaderBuilder.js');
      inputScript(libsurl + '/three/plugins/loaders/LoaderWorkerSupport.js');
    }
    if (inArray(includes, 'OBJLoader2')) {
      inputScript(libsurl + '/three-wtm/1.0.0/three-wtm.js');
      inputScript(libsurl + '/wwobjloader2/4.0.0/wwobjloader2.js');
    }
    if (inArray(includes, 'MTLLoader')) {
      inputScript(libsurl + '/three/0.129.0/examples/js/loaders/MTLLoader.js');
    }
    if (inArray(includes, 'GLTFLoader')) {
      inputScript(libsurl + '/three/0.129.0/examples/js/loaders/GLTFLoader.js');
    }
    if (inArray(includes, 'echarts-gl')) {
      inputScript(libsurl + '/echarts-gl/2.0.9/echarts-gl.min.js');
    }
    if (inArray(includes, 'mapbox-print-pdf')) {
      inputScript(libsurl + '/mapbox-print-pdf/0.4.4/mapbox-print-pdf.min.js');
    }
    if (inArray(includes, 'moment')) {
      inputScript(libsurl + '/moment/2.30.1/moment.min.js');
    }
    if (inArray(includes, 'lodash')) {
      inputScript(libsurl + '/lodash/4.17.21/lodash.min.js');
    }
    if (inArray(includes, 'tensorflow')) {
      inputScript(libsurl + '/tensorflow/3.9.0/tf.min.js');
    }
    if (inArray(includes, 'videojs')) {
      inputCSS(libsurl + '/video-js/7.10.2/video-js.min.css');
      inputScript(libsurl + '/video-js/7.10.2/video.min.js');
    }
    if (inArray(includes, 'g6')) {
      inputScript(libsurl + '/antv/g6/4.3.2/g6.min.js');
    }
    if (inArray(includes, 'snap')) {
      inputScript(libsurl + '/mapbox-gl-draw-snap-mode/0.2.1/mapbox-gl-draw-snap-mode.min.js');
    }
    if (inArray(includes, 'ugcwasm')) {
      inputScript(libsurl + '/ugcwasm/1.0.1/UGCWasmAll.js');
    }
    if (!inArray(excludes, 'iclient-maplibregl')) {
      if (supportES6()) {
        inputScript(disturl + '/maplibregl/iclient-maplibregl-es6.min.js');
      } else {
        inputScript(disturl + '/maplibregl/iclient-maplibregl.min.js');
      }
    }
    if (!inArray(excludes, 'iclient-maplibregl-css')) {
      inputCSS(disturl + '/maplibregl/iclient-maplibregl.min.css');
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
  window.exampleWebSymbolBasePath = '../../dist/maplibregl/resources/symbols';
})();
