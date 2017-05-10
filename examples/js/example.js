$(document).ready(function () {
    initPage();
    bindEvents();
});
var exConfig = exampleConfig,
    containExamples = false,
    thumbLocation = getThumbLocation();

//左侧层级不包含例子，只包含分类
function initPage() {
    var sideBar = $("ul#sidebar-menu");
    var chartList = $("#charts-list");
    for (var key in exConfig) {
        sideBar.append(createSideBarMenuItem(key, exConfig[key], containExamples));
        chartList.append(createGalleryItem(key, exConfig[key]));
    }
    resizeCharts();
    initSelect();
}

function initSelect() {
    var hash = window.location.hash;

    if (hash.indexOf("#") === -1) {
        var id = $("#sidebar li.menuTitle").first().attr('id');
        window.location.hash = (id) ? "#" + id : window.location.hash;
    }
    scroll();
}


//初始化示例面板
function createGalleryItem(id, config) {
    if (!config) {
        return;
    }
    var categoryLi = $("<li class='category' id='" + id + "'></li>");
    if (config.name) {
        createGalleryItemTitle(id, config.name).appendTo(categoryLi);
    }
    if (config.content) {
        createSubGalleryItem(config.content).appendTo(categoryLi);
    }
    return categoryLi;
}

function createSubGalleryItem(config) {
    var categoryContentDiv = $("<div class='category-content'></div>");
    for (var key in config) {
        var configItem = config[key];
        var content = $("<div class='box box-default color-palette-box' id='category-content-" + key + "'></div>");
        createSubGalleryItemTitle(key, configItem.name).appendTo(content);
        if (configItem.content) {
            createGalleryCharts(configItem.content).appendTo(content);
        }
        content.appendTo(categoryContentDiv);
    }
    return categoryContentDiv;
}

function createGalleryItemTitle(id, title) {
    var menuItemIcon = exampleIconConfig[id];
    return $("<h3 class='category-title' id='" + id + "'>" + "<i class='fa " + menuItemIcon + "'></i>" + "&nbsp;&nbsp;"+title + "</h3>");
}

function createSubGalleryItemTitle(id, title) {
    return $("<div class='box-header with-border'>"+"<h3 class='box-title' id='category-type-" + id + "'>" + "&nbsp;&nbsp;" + title + "</h4>"+"</h3>"+"</div>");
}




function createGalleryCharts(examples) {
    var chartsDiv = $("<div class='box-body'></div>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        createGalleryChart(examples[i]).appendTo(chartsDiv);
    }
    return chartsDiv;
}

function createGalleryChart(example) {
    var target = "editor.html",
        title = example.name,
        href = example.fileName ? example.fileName : "",
        thumbnail = example.thumbnail ? thumbLocation + "/img/" + example.thumbnail : "";

    var chartDiv = $("<div class='col-xlg-2 col-lg-3 col-md-4 col-sm-6 col-xs-12'></div>");
    var chart = $("<div class='chart'></div>");
    var link = $("<a class='chart-link' target='_blank' href='" + target + "#" + href + "'></a>");
    var chartTitle = $("<h5 class='chart-title'>" + title + "</h5>");
    var thumb = $("<img class='chart-area' src='" + thumbnail + "' style='display: inline;'>");

    chartTitle.appendTo(link);
    thumb.appendTo(link);
    link.appendTo(chart);
    chart.appendTo(chartDiv);

    return chartDiv;
}

function getThumbLocation() {
    var param = window.location.toString();
    return param.substr(0, param.lastIndexOf('/'));
}

//chart宽高自适应
function resizeCharts() {
    var charts = $("#charts-list .chart .chart-area");
    charts.height(charts[0].offsetWidth * 0.8);
    window.onresize = function () {
        charts.height(charts[0].offsetWidth * 0.8);
    }
}

//根据url滚动到页面相应的位置
function scroll() {
    var hash = window.location.hash;
    var ele;
    if (hash && hash.indexOf("#") !== -1) {
        var param = hash.split("#")[1].split("-");
        if (param.length === 1) {
            ele = $(".category-title#" + param[0]);
            selectMenu(param[0]);
        }
        if (param.length === 2) {
            ele = $("#category-type-" + param[1]);
            selectMenu(param[1]);
        }
    }
    if (ele) {
        $('body').scrollTo(ele, 500, {offset: -60});
    }

}

function bindEvents() {
    $("ul#sidebar-menu>li").on('click', function (evt) {
        window.location.hash = "#" + evt.target.id;
    });

    $("ul#sidebar-menu ul.second-menu a").on('click', function (evt) {
        var target = $(evt.target).parent().parent();
        var nodeId = evt.target.id;
        //如果点击的是span节点还要往上一层
        if (evt.target.localName === "span") {
            nodeId = target.attr('id');
            target = target.parent().parent();
        }
        var prefixId = target.attr('id');
        if (nodeId) {
            evt.preventDefault();
            var id = prefixId + "-" + nodeId;
            window.location.hash = "#" + id;
            evt.stopPropagation();
        }
    });
    window.addEventListener("hashchange", function () {
        scroll();
    });
}

