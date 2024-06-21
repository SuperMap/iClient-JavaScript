L.supermap.plotting.initSpecialEffectStylePanel = function (div, specialEffectManager) {
    specialEffectManager.on(SuperMap.Plot.Event.specialeffectselected, function (event) {
        selectedSpecialEffectUuid = event.specialEffect.uuid;
        selectedSpecialEffect = event.specialEffect;
        showSpecialEffectProperty(event.specialEffect);
    });
    specialEffectManager.on(SuperMap.Plot.Event.specialeffectunselected, function (event) {
        hideSpecialEffectProperty(event);
    });
    function afterModifySelectSpecialEffect(rowIndex, rowData, changes) {
        var updated = $('#pg_specialeffect').propertygrid('getChanges', "updated");
        if (updated.length !== 0) {
            var _this = this;
            new Promise(function (resolve, reject) {
                if (updated.length !== 0) {
                    updateSelectSpecialEffect(updated[0], selectedSpecialEffect);
                }
                $('#pg_specialeffect').propertygrid('loadData', collectionSpecialEffectPropertyGridRows(selectedSpecialEffect));
                return;
            }).then(function (selectFeatures) {
                $('#pg_specialeffect').propertygrid('loadData', selectedSpecialEffect);
                return;

            })
        }
    }
    var stylePanel = document.getElementById(div);
    var pg = document.createElement("table");
    pg.id = "pg_specialeffect";
    pg.className = "easyui-propertygrid";
    stylePanel.appendChild(pg);
    $('#pg_specialeffect').propertygrid({
        showGroup: true,
        columns: [[
            { field: 'name', title: 'Name', width: 100, resizable: true },
            {
                field: 'value', title: 'Value', width: 100, resizable: false
            }
        ]],
        onAfterEdit: afterModifySelectSpecialEffect
    });
}

function showSpecialEffectProperty(event) {
    var rows = [];
    if (event) {
        var rows = collectionSpecialEffectPropertyGridRows(event);
    }
    $('#pg_specialeffect').propertygrid('loadData', rows);
}
function hideSpecialEffectProperty(event) {
    var rows = [];
    $('#pg_specialeffect').propertygrid('loadData', rows);
}
function updateSelectSpecialEffect(updated, specialEffect) {
    var transaction = new SuperMap.Plot.Transaction();
    L.supermap.plotting.getControl(map).getTransManager().add(transaction);
    var transInfo = new SuperMap.Plot.TransactionInfo();
    transInfo.uuid = specialEffect.uuid;
    switch (updated.name) {
        case associatedLatlngName[0]:
            transInfo.functionName = "_updatePosition";
            transInfo.undoParams = [specialEffect.position];
            transInfo.redoParams = [getLatLng(updated.value)];
            specialEffect._updatePosition(getLatLng(updated.value));
            break;
        case aimAssociatedLatlngName[0]:
            transInfo.functionName = "_updatePosition";
            transInfo.undoParams = [specialEffect.position];
            transInfo.redoParams = [getLatLng(updated.value)];
            specialEffect._updatePosition(getLatLng(updated.value), "view");
            break;
        case aimAssociatedLatlngName[1]:
            transInfo.functionName = "_updatePosition";
            transInfo.undoParams = [specialEffect.position];
            transInfo.redoParams = [getLatLng(updated.value)];
            specialEffect._updatePosition(getLatLng(updated.value), "aim");
            break;
        case communicationAssociatedLatlngName[0]:
            transInfo.functionName = "_updatePosition";
            transInfo.undoParams = [specialEffect.position];
            transInfo.redoParams = [getLatLng(updated.value)];
            specialEffect._updatePosition(getLatLng(updated.value), 0);
            break;
        case communicationAssociatedLatlngName[1]:
            transInfo.functionName = "_updatePosition";
            transInfo.undoParams = [specialEffect.position];
            transInfo.redoParams = [getLatLng(updated.value)];
            specialEffect._updatePosition(getLatLng(updated.value), 1);
            break;
        case aimPropsName[0]:
            transInfo.functionName = "setLoop";
            transInfo.undoParams = [specialEffect.loop];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setLoop(fromCheckboxValue(updated.value));
            break;
        case aimPropsName[1]:
            transInfo.functionName = "setBarkTimes";
            transInfo.undoParams = [specialEffect.barkTimes];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setBarkTimes(parseInt(updated.value));
            break;
        case aimPropsName[2]:
            transInfo.functionName = "setBarkInterval";
            transInfo.undoParams = [specialEffect.barkInterval];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setBarkInterval(parseInt(updated.value));
            break;
        case aimPropsName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.radius];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setRadius(parseInt(updated.value));
            break;
        case aimPropsName[4]:
            transInfo.functionName = "setVisible";
            transInfo.undoParams = [specialEffect.visible];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setVisible(fromCheckboxValue(updated.value));
            break;
        case boomPropsName[0]:
            transInfo.functionName = "setLoop";
            transInfo.undoParams = [specialEffect.loop];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setLoop(fromCheckboxValue(updated.value));
            break;
        case boomPropsName[1]:
            transInfo.functionName = "setBoomTimes";
            transInfo.undoParams = [specialEffect.boomTimes];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setBoomTimes(parseInt(updated.value));
            break;
        case boomPropsName[2]:
            transInfo.functionName = "setVisible";
            transInfo.undoParams = [specialEffect.visible];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setVisible(fromCheckboxValue(updated.value));
            break;
        case communicationLinkPropsName[0]:
            transInfo.functionName = "setDashSpeed";
            transInfo.undoParams = [specialEffect.dashSpeed];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setDashSpeed(parseInt(updated.value));
            break;
        case communicationLinkPropsName[1]:
            transInfo.functionName = "setVisible";
            transInfo.undoParams = [specialEffect.visible];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setVisible(fromCheckboxValue(updated.value));
            break;
        case destroyPropsName[0]:
            transInfo.functionName = "setDurationTime";
            transInfo.undoParams = [specialEffect.durationTime];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setDurationTime(parseInt(updated.value));
            break;
        case radarPropsName[0]:
            transInfo.functionName = "setLoop";
            transInfo.undoParams = [specialEffect.loop];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setLoop(fromCheckboxValue(updated.value));
            break;
        case radarPropsName[1]:
            transInfo.functionName = "setStartAngle";
            transInfo.undoParams = [specialEffect.angle];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setStartAngle(parseInt(updated.value));
            break;
        case radarPropsName[2]:
            transInfo.functionName = "setPeriod";
            transInfo.undoParams = [specialEffect.period];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setPeriod(parseInt(updated.value));
            break;
        case radarPropsName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.radius];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setRadius(parseInt(updated.value));
            break;
        case radarPropsName[4]:
            transInfo.functionName = "setVisible";
            transInfo.undoParams = [specialEffect.visible];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setVisible(fromCheckboxValue(updated.value));
            break;
        case sectorDetectionPropsName[0]:
            transInfo.functionName = "setAngle";
            transInfo.undoParams = [specialEffect.period];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setAngle(parseInt(updated.value));
            break;
        case sectorDetectionPropsName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.radius];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setRadius(parseInt(updated.value));
            break;
        case sectorDetectionPropsName[2]:
            transInfo.functionName = "setVisible";
            transInfo.undoParams = [specialEffect.visible];
            transInfo.redoParams = [fromCheckboxValue(updated.value)];
            specialEffect.setVisible(fromCheckboxValue(updated.value));
            break;
        case aimStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.aimTargetColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ aimTargetColor: updated.value });
            break;
        case aimStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.aimLineColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ aimLineColor: updated.value });
            break;
        case aimStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.aimLineWeight];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setStyle({ aimLineWeight: parseInt(updated.value) });
            break;
        case aimStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.aimLineOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ aimLineOpacity: parseFloat(updated.value) });
            break;
        case aimStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.aimLineDashArray];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ aimLineDashArray: updated.value });
            break;
        case communicationLinkStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.weight];
            transInfo.redoParams = [parseInt(updated.value)];
            specialEffect.setStyle({ weight: parseInt(updated.value) });
            break;
        case communicationLinkStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.dashArray];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ dashArray: updated.value });
            break;
        case communicationLinkStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.movePathColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ movePathColor: updated.value });
            break;
        case communicationLinkStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.movePathOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ movePathOpacity: parseFloat(updated.value) });
            break;
        case communicationLinkStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.staticPathColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ staticPathColor: updated.value });
            break;
        case communicationLinkStyleName[5]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.staticPathOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ staticPathOpacity: parseFloat(updated.value) });
            break;
        case sectorDetectionStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.fillColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ fillColor: updated.value });
            break;
        case sectorDetectionStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.fillOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ fillOpacity: parseFloat(updated.value) });
            break;
        case sectorDetectionStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.color];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ color: updated.value });
            break;
        case sectorDetectionStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.opacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ opacity: parseFloat(updated.value) });
            break;
        case sectorDetectionStyleName[4]:
            transInfo.functionName = "setScanStyle";
            transInfo.undoParams = [specialEffect.scanStyle.fillColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setScanStyle({ fillColor: updated.value });
            break;
        case sectorDetectionStyleName[5]:
            transInfo.functionName = "setScanStyle";
            transInfo.undoParams = [specialEffect.scanStyle.fillOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setScanStyle({ fillOpacity: parseFloat(updated.value) });
            break;
        case sectorDetectionStyleName[6]:
            transInfo.functionName = "setScanStyle";
            transInfo.undoParams = [specialEffect.scanStyle.color];
            transInfo.redoParams = [updated.value];
            specialEffect.setScanStyle({ color: updated.value });
            break;
        case sectorDetectionStyleName[7]:
            transInfo.functionName = "setScanStyle";
            transInfo.undoParams = [specialEffect.scanStyle.opacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setScanStyle({ opacity: parseFloat(updated.value) });
            break;
        case radarStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.centerStyle.fillColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ centerStyle: { fillColor: updated.value } });
            break;
        case radarStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.centerStyle.fillOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ centerStyle: { fillOpacity: parseFloat(updated.value) } });
            break;
        case radarStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.centerStyle.color];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ centerStyle: { color: updated.value } });
            break;
        case radarStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.centerStyle.opacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ centerStyle: { opacity: parseFloat(updated.value) } });
            break;
        case radarStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.circleStyle.fillColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ circleStyle: { fillColor: updated.value } });
            break;
        case radarStyleName[5]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.circleStyle.fillOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ circleStyle: { fillOpacity: parseFloat(updated.value) } });
            break;
        case radarStyleName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.circleStyle.color];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ circleStyle: { color: updated.value } });
            break;
        case radarStyleName[7]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.circleStyle.opacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ circleStyle: { opacity: parseFloat(updated.value) } });
            break;
        case radarStyleName[8]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.scanStyle.fillColor];
            transInfo.redoParams = [updated.value];
            specialEffect.setStyle({ scanStyle: { fillColor: updated.value } });
            break;
        case radarStyleName[9]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [specialEffect.style.scanStyle.fillOpacity];
            transInfo.redoParams = [parseFloat(updated.value)];
            specialEffect.setStyle({ scanStyle: { fillOpacity: parseFloat(updated.value) } });
            break;
        default:
            break;
    }
    transaction.transInfos.push(transInfo);
}

L.supermap.plotting.initSpecialEffectTreePanel = function (divId, specialEffectManager) {
    specialEffectManager.on(SuperMap.Plot.Event.specialeffectadded, function (event) {
        updateSpecialEffectTree();
    });
    specialEffectManager.on(SuperMap.Plot.Event.specialeffectremoved, function (event) {
        updateSpecialEffectTree();
    });
    var specialEffectTreePanel = document.getElementById(divId);
    var treeNodeStyle = document.createElement("div");
    treeNodeStyle.style.height = '100%';
    treeNodeStyle.style.width = '100%';
    treeNodeStyle.style.border = '1px solid #617775';
    treeNodeStyle.style.overflow = 'scroll';
    var treeNode = document.createElement("div");
    treeNode.id = "specialEffecttree";
    treeNode.className = "ztree";
    treeNodeStyle.appendChild(treeNode);
    specialEffectTreePanel.appendChild(treeNodeStyle);
    updateSpecialEffectTree();
}

var currentSelectedSpecialEffectUuid = null, curSelectEffect = null;
function updateSpecialEffectTree() {

    function beforeClickSpecialEffectTreeNode(treeId, treeNode) {
        // currentSelectedSpecialEffectUuid = null;
        if (treeNode.tag == "specialEffect") {
            currentSelectedSpecialEffectUuid = treeNode.uuid;
            var specialEffectManager = L.supermap.plotting.getControl().getSpecialEffectManager();
            var effect = specialEffectManager.getSpecialEffectByUuid(currentSelectedSpecialEffectUuid);

            var plottingLayers = window.map.getPlottingLayers();
            for (var i = 0; i < plottingLayers.length; i++) {
                var features = plottingLayers[i].features;
                for (var j = 0; j < features.length; j++) {
                    var specialEffects = features[j].getSpecialEffects();
                    for(var k = 0; k < specialEffects.length; k++){
                        if(specialEffects[k].uuid == currentSelectedSpecialEffectUuid){
                            effect = specialEffects[k];
                        }
                    }
                }
            }

            specialEffectManager.fire(SuperMap.Plot.Event.specialeffectselected, { specialEffect: effect });
            if(curSelectEffect){
                specialEffectManager.unSelectedSpecialEffect(curSelectEffect);
            }
            specialEffectManager.selectedSpecialEffect(effect);

            curSelectEffect = effect;
        } else {
            var tree = $.fn.zTree.getZTreeObj("specialEffecttree");
            if (currentSelectedSpecialEffectUuid) {
                var treeData = tree.transformToArray(tree.getNodes());
                var node;
                for (let i = 0; i< treeData.length; i++) {
                    if (treeData[i].uuid && treeData[i].uuid == currentSelectedSpecialEffectUuid) {
                        node = treeData[i]
                    }
                }
                var timer = setTimeout(() => {
                    tree.selectNode(node);
                    clearTimeout(timer);
                }, 5);
            } else {
                tree.cancelSelectedNode();
            }

            // tree.cancelSelectedNode();
        }
    }
    var setting = {
        check: {
            enable: true
        },
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: true,
            showIcon: true
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        callback: {
            beforeClick: beforeClickSpecialEffectTreeNode
        }
    };

    var treeData = getSpecialEffectTreeData();
    $.fn.zTree.init($("#specialEffecttree"), setting, treeData);
}

function getSpecialEffectTreeData() {
    var treeData = [];
    var rootid = 10000;
    var childid = 5000;
    var specialEffectList = L.supermap.plotting.getControl().getSpecialEffectManager().getSpecialEffectList();

    var plottingLayers = window.map.getPlottingLayers();
    for (var i = 0; i < plottingLayers.length; i++) {
        var features = plottingLayers[i].features;
        for (var j = 0; j < features.length; j++) {
            var specialEffects = features[j].getSpecialEffects();
            if (specialEffects.length != 0) {

                specialEffectList = specialEffectList.concat(specialEffects);
            }
        }
    }

    var cellRootNode = new Object();
    cellRootNode.id = rootid - 1;
    cellRootNode.pId = 0;
    cellRootNode.name = resources.text_specialEffectList;
    cellRootNode.fullName = resources.text_specialEffectList + "/";
    cellRootNode.tag = "specialEffectList";
    treeData.push(cellRootNode);
    var cellId = cellRootNode.id + 1;
    var nid = cellId + 1;
    if (specialEffectList.length == 0) {
        return [];
    }
    for (var i = 0; i < specialEffectList.length; i++) {
        var specialEffect = specialEffectList[i];
        var features = [];
        var name = "";
        switch (specialEffect.getType()) {
            case SuperMap.Plot.SpecialEffectType.COMMUNICATIONLINK:
                name = resources.option_communication;
                break;
            case SuperMap.Plot.SpecialEffectType.AIM:
                name = resources.text_aim;
                break;
            case SuperMap.Plot.SpecialEffectType.BOOM:
                name = resources.text_boom;
                break;
            case SuperMap.Plot.SpecialEffectType.DESTROY:
                name = resources.text_destroy;
                break;
            case SuperMap.Plot.SpecialEffectType.SCANRADAR:
                name = resources.text_scanRadar;
                break;
            case SuperMap.Plot.SpecialEffectType.SECTORDETECTIONRANGE:
                name = resources.text_sectorDetectionRange;
                break;

            default:
                break;
        }

        var childRootNode = new Object();
        childRootNode.pId = cellRootNode.id;
        childRootNode.name = name;
        childRootNode.uuid = specialEffect.uuid;
        childRootNode.tag = "specialEffect"
        treeData.push(childRootNode);

    }
    return treeData;
}