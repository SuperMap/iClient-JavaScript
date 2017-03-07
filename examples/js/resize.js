var winHeight;
screenSize();
function screenSize() {
    if (typeof(window.innerHeight) == 'number') {
        winHeight = window.innerHeight;
    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        winHeight = document.documentElement.clientHeight;
    }
    window.onresize = function () {
        if (typeof( window.innerHeight ) == 'number') {
            winHeight = window.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight) {
            winHeight = document.documentElement.clientHeight;
        }
        mapHeight();
    };
}
function mapHeight() {
    var toolBar = document.getElementById("toolbar");
    var offsetHeight = (toolBar &&toolBar.offsetHeight) ? toolBar.offsetHeight : 0;
    document.getElementById("map").style.height = (winHeight - offsetHeight)+"px";
}