var aceEditor;
var myWidth = 0, myHeight = 0;
var containExamples = true;

function initPage() {
    var config = exampleConfig;
    var menu = $("#sidebar>.menu");
    for (var key in config) {
        menu.append(createSideBarMenuItem(key, config[key], containExamples));
    }
    initSelect();
    initEditor();
    screenResize();
    dragCode();
}

function screenResize() {
    if (typeof( $(window).innerWidth()) == 'number') {
        myWidth = $(window).innerWidth();
        myHeight = $(window).innerHeight();
    }
    else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }
    window.onresize = function () {
        if (typeof( $(window).innerWidth() ) == 'number') {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        }
        else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        }
        mapHeight();
    };
}
//初始化编辑器
function initCodeEditor() {
    if (!aceEditor) {
        aceEditor = ace.edit("editor");
        aceEditor.setTheme("ace/theme/textmate");
        aceEditor.getSession().setMode("ace/mode/html");
        aceEditor.getSession().setUseWrapMode(true);
        aceEditor.setShowPrintMargin(false);
    }
    aceEditor.setValue($('#editor').val());
    aceEditor.clearSelection();
    aceEditor.moveCursorTo(0, 0);
}

//初始化编辑器以及预览内容
function initEditor() {
    var locationParam = getLocationParam();
    if (!locationParam) {
        return;
    }
    var href = window.location.toString();
    var mapUrl = href.substr(0, href.lastIndexOf('/') + 1);
    mapUrl = mapUrl + locationParam + ".html";
    if (!mapUrl) {
        return;
    }
    var html = $.ajax({
        url: mapUrl,
        async: false,
        error: function (error) {
            alert("请在服务器环境下运行示范程序！");
            html = "";
        }
    }).responseText;
    if (html && html != "") {
        $('#editor').val(html);
        loadPreview(html);
    }
    initCodeEditor();
}

function getLocationParam() {
    var param = window.location.toString();
    if (param.indexOf("#") === -1) {
        return null;
    }
    param = param.split("#");
    if (param && param.length > 0) {
        return param[1];
    }
}

//运行代码
function run() {
    var iframeContent = $("#editor").val();
    if (editor) {
        iframeContent = aceEditor.getValue();
    }
    loadPreview(iframeContent);
}

//填充预览效果内容
function loadPreview(content) {
    var iFrame = document.getElementById("innerPage").contentWindow;
    iFrame.document.open();
    iFrame.addEventListener('load',mapHeight);
    iFrame.document.write(content);
    iFrame.document.close();
    mapHeight();
}

/**设置显示源码的拖拽效果**/
function dragCode() {
    $("#drag").mousedown(function () {
        document.onselectstart = function () {
            return false;
        };
        document.onmousemove = function (e) {
            var bottomX = (e || window.event).clientX - 202;
            if (bottomX <= 0) {
                bottomX = 0;
            }
            if (bottomX >= myWidth - 202) {
                bottomX = myWidth - 202;
            }
            $("#codePane").width(bottomX);
            $("#editor").width(bottomX);
            aceEditor.resize();
            $("#preview").css({'left:': (myWidth - bottomX - 202) + "px"});
            $("#innerPage").width(myWidth - bottomX - 202);
            aceEditor.resize();
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            $("#overiframe").hide();
        };
    });
}
//重置编辑器
function refresh() {
    initEditor();
    run();
}

function initSelect() {
    var hash = window.location.hash;
    var id;
    if (hash.indexOf("#") === -1) {
        id = $("#sidebar .thirdMenu a.link").first().attr('id');
        window.location.hash = (id) ? "#" + id : window.location.hash;
    } else {
        id = hash.split("#")[1];
    }
    selectMenu(id);
}

function mapHeight() {
    $("#innerPage").contents().find("html").height("100%");
    $("#innerPage").contents().find("body").height("100%");
}

