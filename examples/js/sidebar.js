//左侧层级是否包含示例
var containExample = false;
var sideBarIconConfig = sideBarIconConfig || {};

function initSideBar() {
    var sideBar = $("ul#sidebar-menu");
    for (var key in exampleConfig) {
        sideBar.append(createSideBarMenuItem(key, exampleConfig[key], false));
    }
}

//创建菜单项
function createSideBarMenuItem(id, config, containAll) {
    if (!config) {
        return;
    }
    containExample = containAll;
    var li = $("<li id='" + id + "' class='treeview'></li>");
    var menuItemIcon = sideBarIconConfig[id];
    if (config.content) {
        createSideBarMenuTitle(id, config.name, true, menuItemIcon).appendTo(li);
        createSideBarSecondMenu(config.content).appendTo(li);
    } else {
        createSideBarMenuTitle(id, config.name, false, menuItemIcon).appendTo(li);
    }
    return li;
}

//创建二级菜单
function createSideBarSecondMenu(config) {
    var ul = $("<ul class='treeview-menu second-menu'></ul>");
    for (var key in config) {
        var li = $("<li class='menuTitle' id='" + key + "' ></li>");
        li.appendTo(ul);
        var configItem = config[key];

        if (containExample && configItem.content) {
            createSideBarFirstLevelTitle(key, configItem.name, true).appendTo(li);
            createSideBarThirdMenu(configItem.content).appendTo(li);
        } else {
            createSideBarSecondLevelTitle(key, configItem.name, false).appendTo(li);
        }
    }
    return ul;
}


//创建三级菜单
function createSideBarThirdMenu(examples) {
    var ul = $("<ul class='treeview-menu third-menu'></ul>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        var example = examples[i];
        var li = $("<li class='menuTitle' id='" + example.fileName + "' ></li>");
        li.appendTo(ul);
        if (example.fileName && example.name) {
            createSideBarSecondLevelTitle(example.fileName, example.name, false).appendTo(li);
        }
    }
    return ul;
}

function createSideBarFirstLevelTitle(id, title, collapse, iconName) {
    iconName = iconName || "fa-circle-o";
    return createSideBarMenuTitle(id, title, collapse, iconName)
}

function createSideBarSecondLevelTitle(id, title, collapse, iconName) {
    iconName = iconName || "  fa-genderless";
    return createSideBarMenuTitle(id, title, collapse, iconName)
}

function createSideBarMenuTitle(id, title, collapse, iconName) {
    id = id || "";
    var div = $("<a href='#' id='" + id + "'><i class='fa " + iconName + "'></i><span>" + title + "</span></a>");
    if (collapse) {
        div.append(createCollapsedIcon());
    }
    return div;
}

//创建右侧折叠菜单
function createCollapsedIcon() {
    return $("<span class='pull-right-container'> <i class='fa fa-angle-left pull-right'></i> </span>");
}

//只处理三层节点,后续可优化
function selectMenu(id) {
    $("section#sidebar ul.menu-open").removeClass("menu-open");
    $("section#sidebar li.active").removeClass("active");
    var target = $("section#sidebar li#" + id);
    target.addClass('active');
    selectTarget(target.parent().parent().parent());
    selectTarget(target.parent());
    selectTarget(target.find("ul"));
    function selectTarget(target) {
        if (!target || target.length < 1) {
            return;
        }
        var className = target.attr("class");
        if (className && className.indexOf("treeview-menu") > -1 && className.indexOf("menu-open") === -1) {
            target.addClass("menu-open");
            target.css("display", "block");
        }
    }
}

function collapseSideBar(rootElement, fold) {
    if (!rootElement) {
        return;
    }
    var collapseClassName = "sidebar-collapse";
    rootElement.removeClass(collapseClassName);
    if (fold) {
        rootElement.addClass(collapseClassName)
    } else {
        rootElement.removeClass(collapseClassName);
    }
}

