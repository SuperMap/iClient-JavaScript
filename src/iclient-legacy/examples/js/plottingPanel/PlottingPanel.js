//var isWinRT = (typeof Windows === "undefined") ? false : true;
{
    inputLink("colorpicker/css/colorpicker.css");
    inputLink("colorpicker/css/layout.css");
    inputLink("jquery-easyui-1.4.4/css/easyui.css");
    inputLink("zTree/css/zTreeStyle.css");

    inputScript("jquery-easyui-1.4.4/jquery.min.js");
    inputScript("jquery-easyui-1.4.4/jquery-ui.js");
    inputScript("jquery-easyui-1.4.4/jquery.easyui.min.js");

    inputScript("colorpicker/js/colorpicker.js");
    inputScript("colorpicker/js/colorpickerEditor.js");
    inputScript("colorpicker/js/eye.js");
    inputScript("colorpicker/js/utils.js");
    inputScript("colorpicker/js/layout.js");

    inputScript("zTree/jquery.ztree.core.js");

    inputScript("PlotPanel.js");
    inputScript("StylePanel.js");
    inputScript("TreePanel.js");

}

function inputLink(inc){
    //if (!isWinRT) {
        var link = '<' + 'link rel="stylesheet" type="text/css" media="screen,projection" href="../examples/js/plottingPanel/' + inc + '"' + '><' + '/>';
        document.writeln(link);
    //} else {
    //    var link = document.createElement("link");
    //    link.href = "../PlottingPanel/zTree/" + inc;
    //    document.getElementsByTagName("HEAD")[0].appendChild(link);
    //}
}

function inputScript(inc){
    //if (!isWinRT) {
        var script = '<' + 'script type="text/javascript" src="../examples/js/plottingPanel/' + inc + '"' + '><' + '/script>';
        document.writeln(script);
    //} else {
    //    var script = document.createElement("script");
    //    script.src = "../PlottingPanel/zTree/" + inc;
    //    document.getElementsByTagName("HEAD")[0].appendChild(script);
    //}
}
