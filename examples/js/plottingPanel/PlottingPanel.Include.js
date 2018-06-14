(function() {
    var r = new RegExp("(^|(.*?\\/))(PlottingPanel.Include\.js)(\\?|$)"),
    s = document.getElementsByTagName('script'),
    src, m, baseurl = "";
    for(var i=0, len=s.length; i<len; i++) {
        src = s[i].getAttribute('src');
        if(src) {
            var m = src.match(r);
            if(m) {
                baseurl = m[1];
                break;
            }
        }
    }
    function inputScript(inc){
        var script = '<' + 'script type="text/javascript" src="' + inc + '"' + '><' + '/script>';
        document.writeln(script);
    }
    //加载类库资源文件
    function loadSMLibs() {
        inputScript(baseurl+'customEditor/ColorpickerEditor.js');
        inputScript(baseurl+'PlotPanel.js');
        inputScript(baseurl+'StylePanel.js');
        inputScript(baseurl+'SMLInfosPanel.js');
    }
    loadSMLibs();
})();
