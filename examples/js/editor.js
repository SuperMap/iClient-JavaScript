/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.*/
$(document).ready(function () {
    window.initI18N(function(){
    initPage();
    bindEvents();
    sidebarScrollFix();
});
});
var aceEditor;
var containExamples = true;
//当前预览示例所在目录，供 iframe 解析相对路径
var previewBaseUrl = "";

function initPage() {
    initSideBar();
    initEditor();
    screenResize();
}



//获取示例页面的配置信息
function getActiveExampleConfig(){
  var activeId = getActiveId();
  var config = exampleConfig;
  for(var key in config){
    const item = config[key];
    for(var contentKey in item.content){
      const contentItem = item.content[contentKey];
      for(var i=0; i< contentItem.content.length; i++ ){
         var arrItem = contentItem.content[i];
         if(activeId === arrItem.fileName){
           return arrItem;
         }
      }
    }
  }
  return {}
}

function initSideBar() {
    var config = exampleConfig;
    var sideBar = $("ul#sidebar-menu");
    for (var key in config) {
      if (typeof config[key] === 'object' && config[key] !== null) {
        sideBar.append(createSideBarMenuItem(key, config[key], containExamples));
      }
    }
    $(sideBar).ready(function () {
        initSelect();
    });

}

function screenResize() {
    window.onresize = function () {
        mapHeight();
    };
}

//初始化编辑器
function initCodeEditor(showCode) {
  const codeBtn = document.getElementById("showCodeBtn");
    if(showCode === false){
      codeBtn.classList.add('hide');
      return
    }
    codeBtn.classList.remove('hide');
    if (!aceEditor) {
        aceEditor = ace.edit("editor");
        aceEditor.setTheme("ace/theme/textmate");
        aceEditor.getSession().setMode("ace/mode/html");
        aceEditor.getSession().setUseWrapMode(true);
        aceEditor.setShowPrintMargin(false);
        aceEditor.$blockScrolling = Infinity;
    }
    aceEditor.setValue($('#editor').val());
    aceEditor.clearSelection();
    aceEditor.moveCursorTo(0, 0);
}

//初始化编辑器以及预览内容
function initEditor() {
  var pageConfig = getActiveExampleConfig();
    loadExampleHtml();
    initCodeEditor(pageConfig.showCode);
}

function loadExampleHtml() {
    var locationParam = getLocationParam();
    if (!locationParam) {
        return;
    }
    //示例 html 从当前数据源目录读取
    var mapUrl = dataSource.resolveExampleUrl(locationParam);
    //记录示例所在目录，预览时作为 iframe 内相对路径的基准
    previewBaseUrl = dataSource.resolveExampleDir(locationParam);
    if (!mapUrl) {
        return;
    }
    var isError = false;
    var response = $.ajax({
        url: mapUrl,
        async: false,
        error: function (error) {
            alert(resources.editor.envTips);
            isError = true;
        }
    });
    var html = response.responseText;
    if (html && html != "" && !isError) {
        $('#editor').val(html);
        loadPreview(html);
    } else {
      //用相对路径，避免部署在非根路径下时跳丢
      window.location.href = dataSource.resolveWebUrl('404.html');
    }
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
    var iFrame = createIFrame(),
        iframeDocument = iFrame.contentWindow.document;
    iFrame.contentWindow.resources=window.resources?window.resources.resources:{};
    iframeDocument.open();
    iframeDocument.write(withBaseUrl(content));
    iframeDocument.close();
    var doc = document;
    iFrame.addEventListener('load', function () {
        mapHeight();
        setTimeout(function () {
            doc.title = iframeDocument.title;
        }, 100);

    });

    mapHeight();
}

//预览用的 iframe 没有自己的 url，相对路径会按 editor.html 的位置解析。
//示例 html 里写的是相对它自身位置的真实路径，故注入 <base> 指向示例所在目录，
//这样无论示例在哪一层目录、站点部署在哪个路径下，都能正确解析
function withBaseUrl(content) {
    if (!previewBaseUrl) {
        return content;
    }
    var base = '<base href="' + previewBaseUrl + '">';
    //插到 <head> 之后，保证先于其它资源引用生效
    if (/<head[^>]*>/i.test(content)) {
        return content.replace(/<head[^>]*>/i, function (match) {
            return match + base;
        });
    }
    //没有 <head> 时退而插到 <html> 之后或开头
    if (/<html[^>]*>/i.test(content)) {
        return content.replace(/<html[^>]*>/i, function (match) {
            return match + base;
        });
    }
    return base + content;
}

function createIFrame() {
    var preViewPane = $("#previewPane");
    preViewPane.empty();
    var iframe = document.createElement("iframe");
    $(iframe).attr("id", "innerPage");
    $(iframe).attr("name", "innerPage");
    preViewPane.append(iframe);
    return iframe;
}

//重置编辑器
function refresh() {
    initEditor();
    run();
}

//获取当前页的id
function getActiveId(){
  var hash = window.location.hash;
  if (hash.indexOf("#") === -1) {
      return $("section#sidebar .thirdMenu a.link").first().attr('id');
  }
  return hash.split("#")[1];
}

function initSelect() {
    var hash = window.location.hash;
    var id = getActiveId();
    if (hash.indexOf("#") === -1) {
        window.location.hash = (id) ? "#" + id : window.location.hash;
    }
    selectMenu(id);
}

function mapHeight() {
    var doc = $("#innerPage").contents();
    doc.find("html").height("100%");
    doc.find("body").height("100%");
}

function bindEvents() {
    $("#sidebar ul.third-menu a").click(function (evt) {
        var target = $(evt.target).parent().parent();
        var nodeId = evt.target.id;
        //如果点击的是span节点还要往上一层
        if (evt.target.localName === "span") {
            nodeId = target.attr('id');
        }

        if (nodeId) {
            //阻止冒泡防止上层事件响应导致修改url hash值
            evt.preventDefault();
            window.location.hash = "#" + nodeId;
            initEditor();
            evt.stopPropagation();
        }
    });
    var codePane = $("#codePane");
    var previewPane = $("#previewPane");
    var expand = !!1;
    $("#showCodeBtn").click(function () {
        if (expand) {
            //编辑器和预览宽度5:7
            $(this).text(resources.editor.expand);
            $(this).addClass("fa-arrows-alt");
            $(this).removeClass(" fa-compress");
            codePane.show(10, function () {
                previewPane.removeClass("col-md-12");
                previewPane.addClass("col-md-7");
                codePane.addClass("col-md-5");
            });
        } else {
            //预览独占一行
            $(this).text(resources.editor.source);
            $(this).addClass(" fa-compress");
            $(this).removeClass("fa-arrows-alt");
            codePane.hide(200, function () {
                codePane.removeClass("col-md-5");
                previewPane.removeClass("col-md-7");
                previewPane.addClass("col-md-12");
            });
        }
        expand = !expand;
    });

    window.addEventListener("hashchange", function () {
        var hash = window.location.hash;
        if (hash.indexOf("#") !== -1) {
            var id = hash.split("#")[1];
            selectMenu(id);
        }
    });
}