/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.*/
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
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");

            inputScript("https://cdnjs.cloudflare.com/ajax/libs/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js");

            inputScript("../js/utils.js");
            inputScript("../js/localization.js");
            document.writeln("<script>Localization.initializeI18N('../', function () {Localization.localize();Localization.initGlobal();}); </script>");
            jQueryInclude = true;
        }
        if (inArray(includes, 'jquery') && !jQueryInclude) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        }

        if (inArray(includes, 'bootstrap')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }
        if (inArray(includes, 'bootstrap-css')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css")
        }

        if (inArray(includes, 'bootstrap-js')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }

        if (inArray(includes, 'jquery-ui')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");
        }

        if (inArray(includes, 'template')) {
            inputScript("http://iclient.supermap.io/libs/art-template/template-web.js");
        }
        if (inArray(includes, 'randomcolor')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.5.2/randomColor.min.js");
        }
        if (inArray(includes, 'papaparse')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.3.2/papaparse.min.js");
        }
        if (inArray(includes, 'moment')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/locale/zh-cn.js");
        }
        if (inArray(includes, 'bootstrap-datetimepicker')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js");
        }
        if (inArray(includes, 'bootstrap-select')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js");
        }
        if (inArray(includes, 'geohash')) {
            inputScript("http://iclient.supermap.io/libs/geohash/geohash.js");
        }
        if (inArray(includes, 'dat-gui')) {
            inputScript("https://cdn.bootcss.com/dat-gui/0.7.6/dat.gui.js");
            datGuiI18N();
        }
        if (inArray(includes, 'admin-lte')) {
            inputCSS("http://iclient.supermap.io/libs/admin-lte/css/AdminLTE.min.css");
            inputCSS("http://iclient.supermap.io/libs/admin-lte/css/skins/skin-blue.min.css");
            inputCSS("http://iclient.supermap.io/libs/font-awesome/css/font-awesome.min.css");
            inputScript("http://iclient.supermap.io/libs/admin-lte/js/app.min.js");
        }
        if (inArray(includes, 'jquery.scrollto')) {
            inputScript("http://iclient.supermap.io/libs/jquery.scrollto/jquery.scrollTo.min.js");
        }
        if (inArray(includes, 'ace')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js");
        }
        if (inArray(includes, 'widgets.alert')) {
            inputScript("../js/widgets.js");
        }

        if (inArray(includes, 'widgets')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/css-loader/2.2.0/css-loader.css");
            inputScript("../js/widgets.js");
        }
        if (inArray(includes, 'zTree')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/zTree.v3/3.5.29/css/zTreeStyle/zTreeStyle.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/zTree.v3/3.5.29/js/jquery.ztree.all.min.js");
        }
        if (inArray(includes, 'jquery-scontextMenu')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.6.3/jquery.contextMenu.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.6.3/jquery.contextMenu.min.js");
        }
        if (inArray(includes, 'colorpicker')) {
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/jquery.js");
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/jquery.colorpicker.js");
        }
        if (inArray(includes, 'fileupLoad')) {
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/jquery.js");
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/fileupLoad.js");
        }
        if (inArray(includes, 'sticklr')) {
            inputCSS("http://iclient.supermap.io/libs/iclient8c/examples/css/jquery-sticklr.css");
            inputCSS("http://iclient.supermap.io/libs/iclient8c/examples/css/icon.css");
        }
        if (inArray(includes, 'responsive')) {
            inputCSS("http://iclient.supermap.io/libs/iclient8c/examples/css/bootstrap-responsive.min.css");
        }
        if (inArray(includes, 'lazyload')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.7/jquery.lazyload.min.js");
        }
        if (inArray(includes, 'i18n')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js");
        }
        if (inArray(includes, 'react')) {
            inputScript("http://iclient.supermap.io/web/libs/react/16.4.2/react.production.min.js");
            inputScript("http://iclient.supermap.io/web/libs/react/16.4.2/react-dom.production.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js");
        }
        if (inArray(includes, 'vue')) {
            inputScript("http://iclient.supermap.io/web/libs/vue/2.5.17/vue.min.js");
        }
        if (inArray(includes, 'ionRangeSlider')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.2.0/css/ion.rangeSlider.css");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.2.0/css/ion.rangeSlider.skinHTML5.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.2.0/js/ion.rangeSlider.min.js");
        }
        if (inArray(includes, 'plottingPanel')) {
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/plottingPanel/zTree/jquery.ztree.core.js");
            inputCSS("http://iclient.supermap.io/libs/iclient8c/examples/js/plottingPanel/zTree/css/zTreeStyle.css");
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/plottingPanel/jquery-easyui-1.4.4/jquery.easyui.min.js");
            inputCSS("http://iclient.supermap.io/libs/iclient8c/examples/js/plottingPanel/jquery-easyui-1.4.4/css/easyui.css");
            inputScript("http://iclient.supermap.io/libs/iclient8c/examples/js/plottingPanel/colorpicker/js/colorpicker.js");
            inputCSS("http://iclient.supermap.io/libs/iclient8c/examples/js/plottingPanel/colorpicker/css/colorpicker.css");
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
    window.version = "10.0.0";
    window.preRelease = "";
})();
