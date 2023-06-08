/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function () {
    var r = new RegExp("(^|(.*?\\/))(include-classic\.js)(\\?|$)"),
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
    function load(config) {
        var libsurl = config.libsurl;
        var disturl = config.disturl;
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        if (!inArray(excludes, 'iclient8c')) {
            if (!inArray(includes, 'iclient8c-plot')) {
                window.excludePlot = true;
            }
            inputScript(libsurl + '/iclient8c/libs/SuperMap.Include.js');
        }
        if (inArray(includes, 'mapv')) {
            inputScript(libsurl + '/mapv/2.0.62/mapv.min.js');
        }
        if (inArray(includes, 'echarts')) {
            inputScript(libsurl + '/echarts/4.9.0/echarts.min.js');
        }
        if (inArray(includes, 'nanoscroller')) {
            inputCSS(libsurl + '/iclient8c/examples/css/nanoscroller.css');
            inputScript(libsurl + '/iclient8c/examples/js/jquery.nanoscroller.min.js');
        }
        if (inArray(includes, 'infoWindow')) {
            inputCSS(libsurl + '/iclient8c/examples/js/plugins/infoWindow/infoWindow.css');
            inputScript(libsurl + '/iclient8c/examples/js/plugins/infoWindow/InfoWindow.js');
        }
        if (inArray(includes, 'heatmapColorCSS')) {
            inputCSS(libsurl + '/iclient8c/examples/css/heatmap.css');
        }
        if (!inArray(excludes, 'iclient-classic')) {
            if (supportES6()) {
                inputScript(disturl + '/classic/iclient-classic-es6.min.js');
            } else {
                inputScript(disturl + '/classic/iclient-classic.min.js');
            }
        }
        if (inArray(includes, 'tianditu')) {
            inputScript(libsurl + '/iclient8c/examples/js/layer/Tianditu.js');
        }
        if (inArray(includes, 'echarts-all')) {
            inputScript(libsurl + '/iclient8c/examples/js/echarts-all.js');
        }
        if (inArray(includes, 'baidu')) {
            inputScript(libsurl + '/iclient8c/examples/js/layer/Baidu.js');
        }
        if (inArray(includes, 'OSMBuildings-SuperMap')) {
            inputScript(libsurl + '/iclient8c/examples/js/OSMBuildings-SuperMap.js');
        }
        if (inArray(includes, 'D3WindMap')) {
            inputScript(libsurl + '/iclient8c/examples/js/D3WindMap.js');
        }
        if (inArray(includes, 'd3')) {
            inputScript(libsurl + '/iclient8c/examples/js/d3.v3.min.js');
        }
        if (inArray(includes, 'three')) {
            inputScript(libsurl + '/iclient8c/examples/js/third-party/Three/ThreeWebGL.js');
            inputScript(libsurl + '/iclient8c/examples/js/third-party/Three/ThreeExtras.js');
            inputScript(libsurl + '/iclient8c/examples/js/third-party/Three/RequestAnimationFrame.js');
            inputScript(libsurl + '/iclient8c/examples/js/third-party/Three/Detector.js');
            inputScript(libsurl + '/iclient8c/examples/js/third-party/globe.js');
        }
        if (inArray(includes, 'MapToImg')) {
            inputScript(libsurl + '/iclient8c/examples/js/MapToImg.js');
        }
        if (inArray(includes, 'Bar')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Bar.js');
        }
        if (inArray(includes, 'Bar3D')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Bar3D.js');
        }
        if (inArray(includes, 'Circle')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Circle.js');
        }
        if (inArray(includes, 'Line')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Line.js');
        }
        if (inArray(includes, 'Pie')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Pie.js');
        }
        if (inArray(includes, 'Point')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Point.js');
        }
        if (inArray(includes, 'Ring')) {
            inputScript(libsurl + '/iclient8c/examples/js/graph/Ring.js');
        }
        if (inArray(includes, 'style')) {
            inputCSS(libsurl + '/iclient8c/theme/default/style.css');
        }
        if (inArray(includes, 'sm-doc')) {
            inputCSS(libsurl + '/iclient8c/examples/css/sm-doc.css');
        }
        if (inArray(includes, 'LargeFormatPrints')) {
            inputScript(libsurl + '/iclient8c/examples/js/LargeFormatPrints.js');
        }
        if (inArray(includes, 'PlottingPanel')) {
            inputScript(libsurl + '/iclient8c/examples/js/plottingPanel/PlottingPanel.Include.js');
        }
        if (inArray(includes, 'bevInclude')) {
            inputScript(libsurl + '/iclient8c/examples/js/bevInclude.js');
        }
        if (inArray(includes, 'DefaultStyleConfiguration')) {
            inputScript(libsurl + '/iclient8c/resource/Plugins/Plotting/DefaultStyleConfiguration.js');
        }
        if (inArray(includes, 'tensorflow')) {
          inputScript(libsurl + '/tensorflow/3.9.0/tf.min.js');
        }
    }

    load({
        libsurl: 'https://iclient.supermap.io/web/libs',
        disturl: '../../dist'
    });
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();
