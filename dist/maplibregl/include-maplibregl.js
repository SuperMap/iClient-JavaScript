/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
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
  function load({ libsurl }) {
    var includes = (targetScript.getAttribute('include') || '').split(',');
    var excludes = (targetScript.getAttribute('exclude') || '').split(',');
    inputCSS('https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css');
    inputScript('https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js');
    if (inArray(includes, 'draw')) {
      inputCSS(`${libsurl}/mapbox-gl-js/plugins/mapbox-gl-draw/1.4.1/mapbox-gl-draw.min.css`);
      inputScript(`${libsurl}/mapbox-gl-js/plugins/mapbox-gl-draw/1.4.1/mapbox-gl-draw.min.js`);
    }
    if (inArray(includes, 'mapboxgl-draw-rectangle-drag')) {
      inputScript(`${libsurl}/mapboxgl-draw-rectangle-drag/1.0.1/mapboxgl-draw-rectangle-drag.browser.js`);
    }
    if (!inArray(excludes, 'iclient-maplibregl')) {
      if (supportES6()) {
        inputScript('../../dist/maplibregl/iclient-maplibregl-es6.min.js');
      } else {
        inputScript('../../dist/maplibregl/iclient-maplibregl.min.js');
      }
    }
    if (inArray(includes, 'turf')) {
      inputScript(`${libsurl}/turf/6.5.0/turf.min.js`);
    }
    if (!inArray(excludes, 'iclient-maplibregl-css')) {
      inputCSS('../../dist/maplibregl/iclient-maplibregl.min.css');
    }
  }

  load({
    libsurl: 'https://iclient.supermap.io/web/libs'
  });
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//)
    ? 'http://localhost:8090'
    : document.location.protocol + '//' + document.location.host;
})();
