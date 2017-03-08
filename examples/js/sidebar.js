function createSideBarMenuItem(id, config, containAll) {
    if (!config) {
        return;
    }
    containExample = containAll;
    var li = $("<li id='" + id + "' ></li>");
    if (config.name) {
        createSideBarMenuTitle("title menuTitle", id, config.name).appendTo(li);
    }
    if (config.content) {
        createSideBarSecondMenu(config.content).appendTo(li);
    }
    return li;
}

//创建中间菜单item项
function createSideBarMenuTitle(className, id, title) {
    var div = $("<a>" + title + "</a>");
    if (className) {
        div.attr({"class": className})
    }
    if (id) {
        div.attr({"id": id})
    }
    return div;
}

//创建二级菜单
function createSideBarSecondMenu(config) {
    var ul = $("<ul class='secondMenu'></ul>");
    for (var key in config) {
        var li = $("<li id='" + key + "' ></li>");
        li.appendTo(ul);
        var configItem = config[key];
        createSideBarMenuTitle("title secondMenuTitle", key, configItem.name).appendTo(li);
        if (containExample && configItem.content) {
            createSideBarThirdMenu(configItem.content).appendTo(li);
        }
    }
    return ul;
}

//创建三级菜单
function createSideBarThirdMenu(examples) {
    var ul = $("<ul class='thirdMenu'></ul>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        var example = examples[i];
        if (example.fileName && example.name) {
            createEndMenuItem(example.fileName, example.name).appendTo(ul);
        }
    }
    return ul;
}

//创建叶节点菜单item项
function createEndMenuItem(id, title) {
    var li = $("<li></li>");
    var a = $("<a class='link' id='" + id + "'>" + title + "</a>");
    li.append(a);
    return li;
}

function selectMenu(id) {
    $("#sidebar a.active").removeClass("active");
    var link = $("#sidebar a#" + id);
    var className = link.attr("class");
    if (!className || className.indexOf("active") === -1) {
        link.addClass("active");
    }
}