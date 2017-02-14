var coreModules = deps.Core;
var leafletModules = deps.Leaflet;
var ol3Modules = deps.OL3;

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
                checks[j].checked = selectAll;
            }
            var lis = lists[i].getElementsByTagName('li');
            for (var n = 0; n < checks.length; n++) {
                lis[n].className = (selectAll) ? 'active' : '';
            }
        }
        updateCommand();
        return false;
    }
    addModule('Core', deplist, true);
    $('#deplist li')[0].className = 'active';
    for(var ol3Module in ol3Modules){
        var title = ol3Modules[ol3Module].title;
        addGroup('ol3', title, ol3Modules[ol3Module].description, $('#ol3select')[0]);
        for(var module in ol3Modules[ol3Module]){
            if(module === 'title' || module === 'description'){
                continue;
            }
            addModule(module, $('#ol3_' + title)[0]);
        }
    }
    for (var leafletModule in leafletModules) {
        var title = leafletModules[leafletModule].title;
        addGroup('leaflet', title, leafletModules[leafletModule].description, $('#leafletselect')[0]);
        for(var module in leafletModules[leafletModule]){
            if(module === 'title' || module === 'description'){
                continue;
            }
            addModule(module, $('#leaflet_' + title)[0]);
        }
    }
    updateCommand();

    $('.clientTabs li a').click(function (e) {
        e.preventDefault()
        if(this.innerHTML === 'Leaflet'){
            var checks = $('.deplist input');
            for (var i = 0; i < checks.length; i++) {
                if(checks[i].id.indexOf('ol3_') !== -1 && checks[i].checked){
                    checks[i].checked = false;
                    checks[i].parentNode.className =  '';
                }
            }
        }
        if(this.innerHTML === 'OL3'){
            var checks = $('.deplist input');
            for (var i = 0; i < checks.length; i++) {
                if(checks[i].id.indexOf('leaflet_') !== -1 && checks[i].checked){
                    checks[i].checked = false;
                    checks[i].parentNode.className =  '';
                }
            }
        }
        updateCommand();
        $(this).tab('show');
    })
}

function addGroup(client, title, description, div) {
    var ul = document.createElement('ul');
    ul.id = client + '_' + title;
    ul.className = 'deplist';
    var h3 = document.createElement('h3');
    var span = document.createElement('span');
    h3.innerHTML = title;
    span.innerHTML = description;
    h3.appendChild(span);
    div.appendChild(h3);
    div.appendChild(ul);
}

function addModule(name, list, checked) {
    var li = document.createElement('li');
    var content = document.createElement('div');
    var label = document.createElement('label');
    var check = document.createElement('input');
    check.type = 'checkbox';
    check.id = name;
    check.checked = (checked) ? 'checked' : '';
    check.onchange = onCheckboxChange;
    li.appendChild(check);
    label.htmlFor = name;
    li.appendChild(label);
    content.className = 'item';
    content.appendChild(document.createTextNode(name.substring(name.indexOf('_') + 1)));
    li.appendChild(content);
    if(!checked){
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
    for (var i = 0; i < deplistItems.length; i++) {
        if (deplistItems[i].checked) {
            for (var coreModule in coreModules) {
                modulePaths += coreModule + ',';
            }
        }
    }
    var deplistItems2 = $('.deplist li input');
    for (var i = 0; i < deplistItems2.length; i++) {
        if (deplistItems2[i].checked) {
            modulePaths += deplistItems2[i].id + ',';
        }
    }
    modulePaths = modulePaths.substring(0, modulePaths.length - 1);
    if (modulePaths.indexOf('Leaflet') !== -1) {
        commandInput.value = modulePaths === '' ? modulePaths : 'npm run package - leaflet ' + modulePaths;
        return;
    }
    if (modulePaths.indexOf('OL3') !== -1) {
        commandInput.value = modulePaths === '' ? modulePaths : 'npm run package - ol3 ' + modulePaths;
        return;
    }
    commandInput.value = modulePaths === '' ? modulePaths : 'npm run package - core ' + modulePaths;
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
