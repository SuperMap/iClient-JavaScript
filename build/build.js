var commonModules = deps.common;
/**
 * 自定义打包页面只需配置clientTabs即可
 * key为显示在页面上Tab选项卡的名称
 * value为deps文件中一级配置(客户端)的key
 */
var clientsTabs = {
    "OpenLayers": "openlayers",
    "Leaflet": "leaflet",
    "MapboxGL": "mapboxgl",
    "iClient Classic": "classic"
};
var exceptFields = ["title", "description", "description_en"];

//设当前客户端名称，其值为clientsTabs的key值之一
var currentClientTab = "OpenLayers";

function init() {
    initClientTabs();
    addModule('common', deplist, true);

    $('#deplist li')[0].className = 'active';

    for (var key  in clientsTabs) {
        initModules(clientsTabs[key], deps[clientsTabs[key]]);
    }

    updateCommand();
    bindEvents();
}

function initClientTabs() {
    var $clientTabList = $("ul#client");
    var $clientTabContents = $('div.tab-content');
    for (var clientName in clientsTabs) {
        var target = clientsTabs[clientName];
        var $tab = $("<li role='presentation'><a href='#" + target + "select'>" + clientName + "</a></li>").appendTo($clientTabList);
        var $tabContent = $("<div role='tabpanel' class='tab-pane deplistContent' id='" + target + "select'></div>").appendTo($clientTabContents);
        if (clientName === currentClientTab) {
            $tab.addClass("active");
            $tabContent.addClass("active");
        }
    }
}

function bindEvents() {
    $('.clientTabs li a').click(function (e) {
        e.preventDefault();
        currentClientTab = this.innerHTML;
        for (var name in clientsTabs) {
            if (name === currentClientTab) {
                continue;
            }
            cancelChecked(clientsTabs[name])
        }
        updateCommand();
        $(this).tab('show');
    });
    $('#select-all').on('click', function () {
        select(true);
    });
    $('#deselect-all').on('click', function () {
        select(false);
    });
}

function select(selectAll) {
    var lists = $('.deplistContent.active ul');
    for (var i = 0; i < lists.length; i++) {
        var checks = lists[i].getElementsByTagName('input');
        for (var j = 0; j < checks.length; j++) {
            if (checks[j].id === 'common') {
                continue;
            }
            checks[j].checked = selectAll;
        }
        var lis = lists[i].getElementsByTagName('li');
        for (var n = 0; n < checks.length; n++) {
            if (checks[n].id === 'common') {
                continue;
            }
            lis[n].className = (selectAll) ? 'active' : '';
        }
    }
    updateCommand();
    return false;
}

function initModules(clientName, modules) {
    if (!clientName) {
        return;
    }
    clientName = clientName.toLowerCase();

    for (var key in modules) {
        var module = modules[key];
        var title = module.title;
        addGroup(clientName, key, title, module.description, $("#" + clientName + "select")[0]);
        var $container = $("#" + clientName + "_" + key);
        for (var itemKey in module) {
            if (exceptFields.indexOf(itemKey) > -1) {
                continue;
            }
            addModule(itemKey, $container[0], false, module[itemKey].name);
        }
        $container.append($("<div style='clear:both;'></div>"));
    }
}

function cancelChecked(clientName) {
    var checks = $('#' + clientName + 'select .deplist input');
    for (var i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            checks[i].checked = false;
            checks[i].parentNode.className = '';
        }
    }
}

function addGroup(client, id, title, description, div) {
    var ul = document.createElement('ul');
    ul.id = client + '_' + id;
    ul.className = 'deplist';
    var container = document.createElement('div');
    container.className = "contents";
    var h3 = document.createElement('h3');
    var span = document.createElement('span');
    h3.innerHTML = title;
    span.innerHTML = description;
    h3.appendChild(span);
    container.appendChild(h3);
    container.appendChild(ul);
    div.appendChild(container);
}

function addModule(title, list, checked, name) {
    var li = document.createElement('li');
    var content = document.createElement('div');
    var label = document.createElement('label');
    var check = document.createElement('input');
    check.type = 'checkbox';
    check.id = title;
    check.checked = (checked) ? 'checked' : '';
    check.onchange = onCheckboxChange;
    li.appendChild(check);
    label.htmlFor = title;
    li.appendChild(label);
    content.className = 'item';
    if (!name) {
        name = title;
    }
    content.appendChild(document.createTextNode(name));
    li.appendChild(content);
    if (!checked) {
        li.onclick = onModuleClick;
    }
    list.appendChild(li);
}

function onModuleClick(evt) {
    var checkbox = this.getElementsByTagName('input')[0];
    this.className = (!checkbox.checked) ? 'active' : '';
    checkbox.checked = !checkbox.checked;
    updateCommand();
}

function updateCommand() {
    var commandInput = $('#command2')[0];
    var deplistItems = $('#deplist li input');
    var modulePaths = '';

    var deplistItems2 = $('.deplist li input');
    for (var i = 0; i < deplistItems2.length; i++) {
        if (deplistItems2[i].id === "common") {
            continue;
        }
        if (deplistItems2[i].checked) {
            modulePaths += deplistItems2[i].id + ',';
        }
    }
    modulePaths = modulePaths.substring(0, modulePaths.length - 1);
    commandInput.value = 'npm run package - ' + getPackage() + " " + modulePaths;
}

function getPackage() {
    var current = clientsTabs[currentClientTab];
    var $currentTab = $("#" + current + "select .deplist li input");
    for (var check in $currentTab) {
        if ($currentTab[check].checked) {
            return current;
        }
    }
    return "common";
}

function onCheckboxChange() {
    if (this.checked) {
        var depDeps = deps[this.id].deps;
        if (depDeps) {
            for (var i = 0; i < depDeps.length; i++) {
                var check = document.getElementById(depDeps[i]);
                if (!check.checked) {
                    check.checked = true;
                    check.onchange();
                }
            }
        }
    } else {
        var checks = $('.deplist input');
        for (var i = 0; i < checks.length; i++) {
            var dep = deps[checks[i].id];
            if (!dep.deps) {
                continue;
            }
            for (var j = 0; j < dep.deps.length; j++) {
                if (dep.deps[j] === this.id) {
                    if (checks[i].checked) {
                        checks[i].checked = false;
                        checks[i].onchange();
                    }
                }
            }
        }
    }
    updateCommand();
}
