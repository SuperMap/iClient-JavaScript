var commonModules = deps.common;
var leafletModules = deps.leaflet;
var openlayersModules = deps.openlayers;

function init() {
    document.getElementById('select-all').onclick = function () {
        select(true);
    };
    document.getElementById('deselect-all').onclick = function () {
        select(false);
    };
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

    addModule('common', deplist, true);
    $('#deplist li')[0].className = 'active';
    for (var openlayersModule in openlayersModules) {
        var title = openlayersModules[openlayersModule].title;
        addGroup('openlayers', title, openlayersModules[openlayersModule].description, $('#openlayersselect')[0]);
        for (var module in openlayersModules[openlayersModule]) {
            if (module === 'title' || module === 'description') {
                continue;
            }
            addModule(module, $('#openlayers_' + title)[0], false, openlayersModules[openlayersModule][module].name);
        }
    }
    for (var leafletModule in leafletModules) {
        var title = leafletModules[leafletModule].title;
        addGroup('leaflet', title, leafletModules[leafletModule].description, $('#leafletselect')[0]);
        for (var module in leafletModules[leafletModule]) {
            if (module === 'title' || module === 'description') {
                continue;
            }
            addModule(module, $('#leaflet_' + title)[0], false, leafletModules[leafletModule][module].name);
        }
    }
    updateCommand();

    $('.clientTabs li a').click(function (e) {
        e.preventDefault();
        if (this.innerHTML === 'Leaflet') {
            cancelChecked('openlayers');
        }
        if (this.innerHTML === 'OpenLayers') {
            cancelChecked('leaflet');
        }
        updateCommand();
        $(this).tab('show');
    })
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

function addGroup(client, title, description, div) {
    var ul = document.createElement('ul');
    ul.id = client + '_' + title;
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
    commandInput.value = 'npm run package - ' + getKey() + " " + modulePaths;
}

function getKey() {
    var key = "common";
    for (var check in $('#openlayersselect .deplist li input')) {
        if ($('#openlayersselect .deplist li input')[check].checked) {
            key = "openlayers";
        }
    }
    for (var check in $('#leafletselect .deplist li input')) {
        if ($('#leafletselect .deplist li input')[check].checked) {
            key = "leaflet";
        }
    }
    return key;
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
