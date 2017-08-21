(function() {
    var r = new RegExp("(^|(.*?\\/))(mapboxgl-include\.js)(\\?|$)"),
    s = document.getElementsByTagName('script'), targetScript;
    for(var i=0;i<s.length; i++) {
        var src = s[i].getAttribute('src');
        if(src) {
            var m = src.match(r);
            if(m) {
                targetScript =s[i];
                break;
            }
        }
    }
    function inputScript(url){
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }
    function inputCSS(url){
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }
    //加载类库资源文件
    function loadCSS() {
        inputCSS("https://cdn.bootcss.com/mapbox-gl/0.39.1/mapbox-gl.css");
        if(targetScript.getAttribute('bootstrapcss')&&targetScript.getAttribute('bootstrapcss')==="on"){
            inputCSS("http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css");
        }
    }
    //加载类库资源文件
    function loadLibs() {
        inputScript("https://cdn.bootcss.com/mapbox-gl/0.39.1/mapbox-gl.js");
        if(targetScript.getAttribute('mapv')&&targetScript.getAttribute('mapv')==="on"){
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        inputScript("../../dist/iclient9-mapboxgl.min.js");
        if(targetScript.getAttribute('echarts')&&targetScript.getAttribute('echarts')==="on"){
            inputScript("http://cdn.bootcss.com/echarts/3.6.2/echarts.min.js");
            inputScript("http://iclient.supermapol.com/libs/echartsLayer/EchartsLayer.js");
        }
        if(targetScript.getAttribute('jquery')&&targetScript.getAttribute('jquery')==="on"){
            inputScript("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js");
        }
        if(targetScript.getAttribute('proj4')&&targetScript.getAttribute('proj4')==="on"){
            inputScript("https://cdn.bootcss.com/proj4js/2.4.3/proj4.js");
        }

    }

    loadCSS();
    loadLibs();
})();
