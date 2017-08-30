(function() {
    var r = new RegExp("(^|(.*?\\/))(include-mapboxgl\.js)(\\?|$)"),
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
    function inArray(arr,item){
        for (i in arr) {
            if (arr[i] == item){
                return true;
            }
        }
        return false;
    }
    //加载类库资源文件
    function load() {
        var includes=(targetScript.getAttribute('include')||"").split(",");
        var excludes=(targetScript.getAttribute('exclude')||"").split(",");
        if(!inArray(excludes,'mapbox-gl')) {
            inputCSS("https://cdn.bootcss.com/mapbox-gl/0.39.1/mapbox-gl.css");
            inputScript("https://cdn.bootcss.com/mapbox-gl/0.39.1/mapbox-gl.js");
        }
        if(inArray(includes,'mapv')){
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        if(inArray(includes,'echarts')){
            inputScript("http://cdn.bootcss.com/echarts/3.6.2/echarts.min.js");
            inputScript("http://iclient.supermapol.com/libs/echartsLayer/EchartsLayer.js");
        }
        if (!inArray(excludes, 'iclient9-mapboxgl')) {
            inputScript("../../dist/iclient9-mapboxgl.min.js");
        }
        if(inArray(includes,'proj4')){
            inputScript("https://cdn.bootcss.com/proj4js/2.4.3/proj4.js");
        }
    }
    load();
})();
