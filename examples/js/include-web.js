/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.*/
(function () {
    var r = new RegExp("(^|(.*?\\/))(include-web\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'), targetScript;
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

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        inputScript("../js/tokengenerator.js");
        var jQueryInclude = false;
        if (!inArray(excludes, 'example-i18n')) {
            inputScript("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js");

            inputScript("https://cdn.bootcss.com/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdn.bootcss.com/jquery-i18next/1.2.1/jquery-i18next.min.js");

            inputScript("../js/utils.js");
            inputScript("../js/localization.js");
            document.writeln("<script>Localization.initializeI18N('../', function () {Localization.localize();Localization.initGlobal();}); </script>");
            jQueryInclude = true;
        }
        if (inArray(includes, 'jquery') && !jQueryInclude) {
            inputScript("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js");
        }

        if (inArray(includes, 'bootstrap')) {
            inputScript("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js");
            inputCSS("https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
            inputScript("https://cdn.bootcss.com/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }
        if (inArray(includes, 'bootstrap-css')) {
            inputCSS("https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css")
        }

        if (inArray(includes, 'bootstrap-js')) {
            inputScript("https://cdn.bootcss.com/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }

        if (inArray(includes, 'jquery-ui')) {
            inputCSS("https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.css");
            inputScript("https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js");
        }

        if (inArray(includes, 'template')) {
            inputScript("https://iclient.supermap.io/web/libs/art-template/template-web.js");
        }
        if (inArray(includes, 'randomcolor')) {
            inputScript("https://cdn.bootcss.com/randomcolor/0.5.2/randomColor.min.js");
        }
        if (inArray(includes, 'papaparse')) {
            inputScript("https://cdn.bootcss.com/PapaParse/4.3.2/papaparse.min.js");
        }
        if (inArray(includes, 'moment')) {
            inputScript("https://cdn.bootcss.com/moment.js/2.18.1/moment.min.js");
            inputScript("https://cdn.bootcss.com/moment.js/2.18.1/locale/zh-cn.js");
        }
        if (inArray(includes, 'bootstrap-datetimepicker')) {
            inputCSS("https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css");
            inputScript("https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js");
        }
        if (inArray(includes, 'bootstrap-select')) {
            inputCSS("https://cdn.bootcss.com/bootstrap-select/1.12.2/css/bootstrap-select.min.css");
            inputScript("https://cdn.bootcss.com/bootstrap-select/1.12.2/js/bootstrap-select.min.js");
        }
        if (inArray(includes, 'geohash')) {
            inputScript("https://iclient.supermap.io/web/libs/geohash/geohash.js");
        }
        if (inArray(includes, 'dat-gui')) {
            inputScript("https://cdn.bootcss.com/dat-gui/0.7.6/dat.gui.js");
            datGuiI18N();
        }
        if (inArray(includes, 'admin-lte')) {
            inputCSS("https://iclient.supermap.io/web/libs/admin-lte/css/AdminLTE.min.css");
            inputCSS("https://iclient.supermap.io/web/libs/admin-lte/css/skins/skin-blue.min.css");
            inputCSS("https://iclient.supermap.io/web/libs/font-awesome/css/font-awesome.min.css");
            inputScript("https://iclient.supermap.io/web/libs/admin-lte/js/app.min.js");
        }
        if (inArray(includes, 'jquery.scrollto')) {
            inputScript("https://iclient.supermap.io/web/libs/jquery.scrollto/jquery.scrollTo.min.js");
        }
        if (inArray(includes, 'ace')) {
            inputScript("https://cdn.bootcss.com/ace/1.2.6/ace.js");
        }
        if (inArray(includes, 'widgets.alert')) {
            inputScript("../js/widgets.js");
        }

        if (inArray(includes, 'widgets')) {
            inputCSS("https://cdn.bootcss.com/css-loader/2.2.0/css-loader.css");
            inputScript("../js/widgets.js");
        }
        if (inArray(includes, 'zTree')) {
            inputCSS("https://cdn.bootcss.com/zTree.v3/3.5.29/css/zTreeStyle/zTreeStyle.min.css");
            inputScript("https://cdn.bootcss.com/zTree.v3/3.5.29/js/jquery.ztree.all.min.js");
        }
        if (inArray(includes, 'jquery-scontextMenu')) {
            inputCSS("https://cdn.bootcss.com/jquery-contextmenu/2.6.3/jquery.contextMenu.min.css");
            inputScript("https://cdn.bootcss.com/jquery-contextmenu/2.6.3/jquery.contextMenu.min.js");
        }
        if (inArray(includes, 'colorpicker')) {
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/jquery.js");
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/jquery.colorpicker.js");
        }
        if (inArray(includes, 'fileupLoad')) {
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/jquery.js");
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/fileupLoad.js");
        }
        if (inArray(includes, 'sticklr')) {
            inputCSS("https://iclient.supermap.io/web/libs/iclient8c/examples/css/jquery-sticklr.css");
            inputCSS("https://iclient.supermap.io/web/libs/iclient8c/examples/css/icon.css");
        }
        if (inArray(includes, 'responsive')) {
            inputCSS("https://iclient.supermap.io/web/libs/iclient8c/examples/css/bootstrap-responsive.min.css");
        }
        if (inArray(includes, 'lazyload')) {
            inputScript("https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js");
        }
        if (inArray(includes, 'i18n')) {
            inputScript("https://cdn.bootcss.com/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdn.bootcss.com/jquery-i18next/1.2.1/jquery-i18next.min.js");
        }
        if (inArray(includes, 'react')) {
            inputScript("https://iclient.supermap.io/web/libs/react/16.4.2/react.production.min.js");
            inputScript("https://iclient.supermap.io/web/libs/react/16.4.2/react-dom.production.min.js");
            inputScript("https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js");
        }
        if (inArray(includes, 'vue')) {
            inputScript("https://iclient.supermap.io/web/libs/vue/2.5.17/vue.min.js");
        }
        if (inArray(includes, 'ionRangeSlider')) {
            inputCSS("https://cdn.bootcss.com/ion-rangeslider/2.2.0/css/ion.rangeSlider.css");
            inputCSS("https://cdn.bootcss.com/normalize/8.0.0/normalize.css");
            inputCSS("https://cdn.bootcss.com/ion-rangeslider/2.2.0/css/ion.rangeSlider.skinHTML5.css");
            inputScript("https://cdn.bootcss.com/ion-rangeslider/2.2.0/js/ion.rangeSlider.min.js");
        }
        if (inArray(includes, 'plottingPanel')) {
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/plottingPanel/zTree/jquery.ztree.core.js");
            inputCSS("https://iclient.supermap.io/web/libs/iclient8c/examples/js/plottingPanel/zTree/css/zTreeStyle.css");
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/plottingPanel/jquery-easyui-1.4.4/jquery.easyui.min.js");
            inputCSS("https://iclient.supermap.io/web/libs/iclient8c/examples/js/plottingPanel/jquery-easyui-1.4.4/css/easyui.css");
            inputScript("https://iclient.supermap.io/web/libs/iclient8c/examples/js/plottingPanel/colorpicker/js/colorpicker.js");
            inputCSS("https://iclient.supermap.io/web/libs/iclient8c/examples/js/plottingPanel/colorpicker/css/colorpicker.css");
        }
    }

    function datGuiI18N() {
        document.writeln("<script>function registerEventListener(evt,fn){" +
            "if(window.attachEvent){window.attachEvent('on'+evt,fn);}" +
            "else{window.addEventListener(evt,fn,false);}" +
            "}</script>");
        document.writeln("<script>registerEventListener('load',function() { " +
            "dat.GUI.TEXT_CLOSED=resources.text_close;dat.GUI.TEXT_OPEN=resources.text_open;" +
            "})</script>")
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
    window.version = "10.1.1";
    window.preRelease = "";
})();
