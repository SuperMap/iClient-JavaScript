L.supermap.plotting.initSignTreePanel = function (div, plotMapManager, layer) {
    plotMapManager.on(SuperMap.Plot.Event.signsymbollayeradded, function (event) {
        event.signSymbolLayer.on(SuperMap.Plot.Event.signsymbolsadded, refresh);
        event.signSymbolLayer.on(SuperMap.Plot.Event.signsymbolsremoved, refresh);
        signSymbolAdd();
    });
    plotMapManager.on(SuperMap.Plot.Event.signsymbollayerremoved, function (event) {
        signSymbolAdd();
    });
    if (layer != null || layer != undefined) {
        layer.on(SuperMap.Plot.Event.signsymbolsadded, refresh);
        layer.on(SuperMap.Plot.Event.signsymbolsremoved, refresh);
        activeSignSymbolLayer = layer;
    }
    document.getElementsByClassName("title_active")[0].innerText = `当前激活图层：${activeSignSymbolLayer.name}`
    var signTreePanel = document.getElementById(div);
    var treeNodeStyle = document.createElement("div");
    treeNodeStyle.style.height = '100%';
    treeNodeStyle.style.width = '100%';
    treeNodeStyle.style.border = '1px solid #617775';
    treeNodeStyle.style.overflow = 'scroll';
    var treeNode = document.createElement("div");
    treeNode.id = "signSymbolTree";
    treeNode.className = "ztree";
    treeNodeStyle.appendChild(treeNode);
    signTreePanel.appendChild(treeNodeStyle);
    initSignTree();
}

function signSymbolAdd() {
    initSignTree();
}
function initSignTree() {
    function beforeClickSignSymbolTreeNode(treeId, treeNode) {
        currentSelectedSignSymbolUuid = null;
        if (treeNode.tag == "signSymbol") {
            currentSelectedSignSymbolUuid = treeNode.uuid;
            var sign = map.getSignSymbolByUuid(currentSelectedSignSymbolUuid);
            if (sign) {
                sign.getLayer().setSelectedSignSymbol(sign);
                currentSelectedSignSymbolUuid = treeNode.uuid;
                if (sign.getVisible()) {
                    document.getElementById("signSymbolVisiable").value = resources.title_hideSignSymbol;
                } else {
                    document.getElementById("signSymbolVisiable").value = resources.title_showSignSymbol;
                }
            }
        }
        selectedSignSymbolLayer = null;
        if (treeNode.tag == "signLayer") {
            if (editControl.getSelectedSignSymbols()[0]) {
                editControl.unselectSignSymbol();
            }
            var layerName = treeNode.name;
            var layers = map.getSignSymbolLayers();
            for (var i in layers) {
                if (layers[i].name == layerName) {
                    selectedSignSymbolLayer = layers[i];
                    if (selectedSignSymbolLayer) {
                        activeSignSymbolLayer = selectedSignSymbolLayer;
                        document.getElementsByClassName("title_active")[0].innerText = `当前激活图层：${activeSignSymbolLayer.name}`;
                    }
                    break;
                }
            }
            if (selectedSignSymbolLayer.getVisibility()) {
                document.getElementById("layerVisiable").value = resources.title_hideLayer
            } else {
                document.getElementById("layerVisiable").value = resources.title_showLayer
            }
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
            beforeClick: beforeClickSignSymbolTreeNode
        }
    };

    var treeData = analysisSignTree();
    $.fn.zTree.init($("#signSymbolTree"), setting, treeData);
}
function analysisSignTree() {
    var treeData = [];
    var rootid = 10000;
    var childid = 5000;
    var layers = L.supermap.plotting.getControl().getPlotMapManager().getSignSymbolLayers();
    for (var n = 0; n < layers.length; n++) {
        var layer = layers[n];
        var cellRootNode = new Object();
        cellRootNode.id = rootid - n;
        cellRootNode.pId = 0;
        cellRootNode.name = layer.name;
        cellRootNode.fullName = layer.name + "/";
        cellRootNode.tag = "signLayer";
        treeData.push(cellRootNode);
        var cellId = cellRootNode.id + 1;
        var nid = cellId + 1;
        var signSymbols = layer.features;
        if (signSymbols.length == 0) {
            continue;
        }
        for (var i = 0; i < signSymbols.length; i++) {
            var signSymbol = signSymbols[i];
            if (signSymbol.associatedUuid != null) {
                var feature = map.getFeatureByUuid(signSymbol.associatedUuid);
                if (feature == null) {
                    continue;
                }
                var isAdd = false;
                var childRootNode;
                for (let j = 0; j < treeData.length; j++) {
                    if (treeData[j].associatedUuid) {
                        if (treeData[j].associatedUuid == signSymbol.associatedUuid && treeData[j].layername == layer.name) {
                            isAdd = true;
                            childRootNode = treeData[j];
                        }
                    }
                }
                if (!isAdd) {
                    childRootNode = new Object();
                    childRootNode.id = childid--;
                    childRootNode.pId = cellRootNode.id;
                    childRootNode.name = feature.symbolName;
                    childRootNode.associatedUuid = feature.uuid;
                    childRootNode.layerName = layer.name;
                    childRootNode.fullName = feature.symbolName + "/";
                    childRootNode.tag = "feature";
                    treeData.push(childRootNode);
                }
                var rootNode = new Object();
                rootNode.pId = childRootNode.id;
                rootNode.name = signSymbol.getSignSymbolName();
                rootNode.uuid = signSymbol.uuid;
                rootNode.tag = "signSymbol"
                treeData.push(rootNode);
            } else {
                var childRootNode = new Object();
                childRootNode.pId = cellRootNode.id;
                childRootNode.name = signSymbol.getSignSymbolName();
                childRootNode.uuid = signSymbol.uuid;
                childRootNode.tag = "signSymbol"
                treeData.push(childRootNode);
            }
        }
    }
    return treeData;
}
function refresh() {
    signSymbolAdd();
}




L.supermap.plotting.initSignStylePanel = function (div, editControl) {
    editControl.on(SuperMap.Plot.Event.signsymbolselected, function (event) {
        showSignSymbolProperty(event);
        currentSelectedSignSymbolUuid = event.signSymbols[0].uuid;
    });
    editControl.on(SuperMap.Plot.Event.signsymbolunselected, function (event) {
        hideSignSymbolProperty(event);
    });
    editControl.on(SuperMap.Plot.Event.signsymboldrag, function (event) {
        showSignSymbolProperty(event);
        currentSelectedSignSymbolUuid = event.signSymbols[0].uuid;
    })
    function afterModifySelectSignSymbol(rowIndex, rowData, changes) {
        var updated = $('#pg_signsymbol').propertygrid('getChanges', "updated");
        if (updated.length !== 0) {
            var _this = this;
            new Promise(function (resolve, reject) {
                if (updated.length !== 0) {
                    updateSelectSignSymbol(updated[0], map.getSignSymbolByUuid(currentSelectedSignSymbolUuid));
                }
                $('#pg_signsymbol').propertygrid('loadData', collectionSignSymbolPropertyGridRows(map.getSignSymbolByUuid(currentSelectedSignSymbolUuid)));
                return;
            }).then(function (selectFeatures) {
                $('#pg_signsymbol').propertygrid('loadData', collectionSignSymbolPropertyGridRows(map.getSignSymbolByUuid(currentSelectedSignSymbolUuid)));
                return;

            })
        }

    }
    var stylePanel = document.getElementById(div);
    var pg = document.createElement("table");
    pg.id = "pg_signsymbol";
    pg.className = "easyui-propertygrid";
    stylePanel.appendChild(pg);
    $('#pg_signsymbol').propertygrid({
        showGroup: true,
        columns: [[
            { field: 'name', title: 'Name', width: 100, resizable: true },
            {
                field: 'value', title: 'Value', width: 100, resizable: false
            }
        ]],
        onAfterEdit: afterModifySelectSignSymbol
    });
}

function showSignSymbolProperty(event) {
    var rows = [];
    if (event.signSymbols.length !== 0) {
        var rows = collectionSignSymbolPropertyGridRows(event.signSymbols[0]);
    }
    $('#pg_signsymbol').propertygrid('loadData', rows);
}
function hideSignSymbolProperty(event) {
    var rows = [];
    $('#pg_signsymbol').propertygrid('loadData', rows);
}

function updateSelectSignSymbol(updated, signSymbol) {
    var transaction = new SuperMap.Plot.Transaction();
    L.supermap.plotting.getControl(map).getTransManager().add(transaction);
    var transInfo = new SuperMap.Plot.TransactionInfo();
    transInfo.layerId = signSymbol.layer._leaflet_id;
    transInfo.uuid = signSymbol.uuid;
    switch (updated.name) {
        case displaySignName[0]:
            transInfo.functionName = "setSignSymbolLatlngs";
            transInfo.undoParams = [{ lat: signSymbol.latLngs.lat, lng: signSymbol.latLngs.lng }];
            var ll;
            if (updated.value.indexOf(",") != -1) {
                ll = updated.value.split(",");
            } else if (updated.value.indexOf("，") != -1) {
                ll = updated.value.split("，");
            }
            transInfo.redoParams = [{ lat: parseFloat(ll[0]), lng: parseFloat(ll[1]) }];
            signSymbol.setSignSymbolLatlngs(L.latLng(parseFloat(ll[0]), parseFloat(ll[1])));
            break;
        case displaySignName[10]:
            transInfo.functionName = "setUrl";
            transInfo.undoParams = [signSymbol.symbolText.templateUrl];
            transInfo.redoParams = [parseUrlFromIndex(updated.value)];
            signSymbol.setUrl(parseUrlFromIndex(updated.value));
            break;
        case displaySignName[1]:
            transInfo.functionName = "setPosition";
            transInfo.undoParams = [signSymbol.getPosition()];
            transInfo.redoParams = [parseInt(updated.value)];
            signSymbol.setPosition(parseInt(updated.value));
            break;
        case displaySignName[2]:
            transInfo.functionName = "setTitle";
            transInfo.undoParams = [signSymbol.getTitle()];
            transInfo.redoParams = [updated.value];
            signSymbol.setTitle(updated.value);
            break;
        case displaySignName[3]:
            transInfo.functionName = "setContent";
            transInfo.undoParams = [signSymbol.getTexts()];
            transInfo.redoParams = [updated.value];

            if (updated.value.includes(";")) {
                values = updated.value.split(";")
            } else if (updated.value.includes("；")) {
                values = updated.value.split("；")
            } else if (updated.value.includes(",")) {
                values = updated.value.split(",")
            }  else if (updated.value.includes("，")) {
                values = updated.value.split("，")
            }  else {
                values = [updated.value];
            }
            signSymbol.setTexts(values);
            break;
        case displaySignName[4]:
            transInfo.functionName = "setOffset";
            transInfo.undoParams = [signSymbol.getOffset()];
            transInfo.redoParams = [{ x: parseInt(updated.value), y: signSymbol.getOffset().y }];
            signSymbol.setOffset(parseInt(updated.value), signSymbol.getOffset().y);
            break;
        case displaySignName[5]:
            transInfo.functionName = "setOffset";
            transInfo.undoParams = [signSymbol.getOffset()];
            transInfo.redoParams = [{ x: signSymbol.getOffset().x, y: parseInt(updated.value) }];
            signSymbol.setOffset(signSymbol.getOffset().x, parseInt(updated.value));
            break;
        case displaySignName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.paddingX];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ paddingX: updated.value });
            break;
        case displaySignName[7]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.paddingY];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ paddingY: updated.value });
            break;
        case displaySignName[8]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.borderColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ borderColor: updated.value });
            break;
        case displaySignName[9]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.borderWidth];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ borderWidth: updated.value });
            break;
        case displaySignTitleStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTitleStyle().fontFamily];
            transInfo.redoParams = [updated.value];
            signSymbol.setTitleStyle({ fontFamily: updated.value });
            break;
        case displaySignTitleStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTitleStyle().color];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getTitleStyle().color;
            color = c.includes("#") ? c : colorConvert(c);
            signSymbol.setTitleStyle({ color: hexToRgb(updated.value, color.alpha) });
            break;
        case displaySignTitleStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTitleStyle().fontSize];
            transInfo.redoParams = [updated.value];
            signSymbol.setTitleStyle({ fontSize: updated.value });
            break;
        case displaySignTitleStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.titleBackgroundColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ titleBackgroundColor: updated.value });
            break;
        case displaySignTitleStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.titleOpacity];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ titleOpacity: updated.value });
            break;
        case displaySignTitleStyleName[5]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.titleWeight];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ titleWeight: updated.value });
            break;
        case displaySignTitleStyleName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.titleAlign];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ titleAlign: updated.value });
            break;


        case displaySignTitleFrameStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTitleFrameStyle().lineColor];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getTitleFrameStyle().lineColor;
            color = c.includes("#") ? c : colorConvert(c);
            signSymbol.setTitleFrameStyle({ lineColor: [hexToRgb(updated.value, color.alpha)] });
            break;
        case displaySignTitleFrameStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTitleFrameStyle().lineColor];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getTitleFrameStyle().lineColor;
            if (c.includes("#")) {
                signSymbol.setTitleFrameStyle({ lineColor: [hexToRgb(c, updated.value)] });
            } else {
                color = colorConvert(c);
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                signSymbol.setTitleFrameStyle({ lineColor: [hexToRgb(hexColor, updated.value)] });
            }
            break;
        case displaySignTitleFrameStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTitleFrameStyle().backgroundColor];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getTitleFrameStyle().backgroundColor;
            color = c.includes("#") ? c : colorConvert(c);
            signSymbol.setTitleFrameStyle({ backgroundColor: [hexToRgb(updated.value, color.alpha)] });
            break;
        case displaySignTitleFrameStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.titleWeight];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getTitleFrameStyle().backgroundColor;
            value = updated.value;
            if (updated.value > 1) {
                value = updated.value / 255;
            } else {
                value = updated.value;
            }
            if (c.includes("#")) {
                signSymbol.setTitleFrameStyle({ backgroundColor: [hexToRgb(c, value)] });
            } else {
                color = colorConvert(c);
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                signSymbol.setTitleFrameStyle({ backgroundColor: [hexToRgb(hexColor, value)] });
            }
            break;


        case displaySignContentFrameStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getContentFrameStyle().lineColor];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getContentFrameStyle().lineColor;
            color = c.includes("#") ? c : colorConvert(c);
            signSymbol.setContentFrameStyle({ lineColor: [hexToRgb(updated.value, color.alpha)] });
            break;
        case displaySignContentFrameStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getContentFrameStyle().lineColor];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getContentFrameStyle().lineColor;
            if (c.includes("#")) {
                signSymbol.setContentFrameStyle({ lineColor: [hexToRgb(c, updated.value)] });
            } else {
                color = colorConvert(c);
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                signSymbol.setContentFrameStyle({ lineColor: [hexToRgb(hexColor, updated.value)] });
            }
            break;
        case displaySignContentFrameStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getContentFrameStyle().backgroundColor];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getContentFrameStyle().backgroundColor;
            color = c.includes("#") ? c : colorConvert(c);
            signSymbol.setContentFrameStyle({ backgroundColor: [hexToRgb(updated.value, color.alpha)] });
            break;
        case displaySignContentFrameStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.titleWeight];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getContentFrameStyle().backgroundColor;
            value = updated.value;
            if (updated.value > 1) {
                value = updated.value / 255;
            } else {
                value = updated.value;
            }
            if (c.includes("#")) {
                signSymbol.setContentFrameStyle({ backgroundColor: [hexToRgb(c, value)] });
            } else {
                color = colorConvert(c);
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                signSymbol.setContentFrameStyle({ backgroundColor: [hexToRgb(hexColor, value)] });
            }
            break;


        case displaySignContentStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTextStyles()[0].fontFamily];
            transInfo.redoParams = [updated.value];
            signSymbol.setTextStyle({ fontFamily: updated.value });
            break;
        case displaySignContentStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTextStyles()[0].color];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getTextStyles()[0].color;
            color = c.includes("#") ? c : colorConvert(c);
            signSymbol.setTextStyle({ color: hexToRgb(updated.value, color.alpha) });
            break;
        case displaySignContentStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.getTextStyles()[0].fontSize];
            transInfo.redoParams = [updated.value];
            signSymbol.setTextStyle({ fontSize: updated.value });
            break;
        case displaySignContentStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.contentBackgroundColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ contentBackgroundColor: updated.value });
            break;
        case displaySignContentStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.contentOpacity];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ contentOpacity: updated.value });
            break;
        case displaySignContentStyleName[5]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.contentWeight];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ contentWeight: updated.value });
            break;
        case displaySignContentStyleName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.symbolText.style.contentAlign];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({ contentAlign: updated.value });
            break;
        case displaySignLineStyleName[0]:
            transInfo.functionName = "setIndecatorLineStyle";
            transInfo.undoParams = [signSymbol.getIndecatorLineStyle().color];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getIndecatorLineStyle().color;
            color = colorConvert(c);
            signSymbol.setIndecatorLineStyle({ lineColor: hexToRgb(updated.value, color.alpha) });
            break;
        case displaySignLineStyleName[1]:
            transInfo.functionName = "setIndecatorLineStyle";
            transInfo.undoParams = [signSymbol.getIndecatorLineStyle().weight];
            transInfo.redoParams = [updated.value];
            signSymbol.setIndecatorLineStyle({ lineWidth: parseInt(updated.value) });
            break;
        case displaySignLineStyleName[2]:
            transInfo.functionName = "setIndecatorLineStyle";
            transInfo.undoParams = [signSymbol.getIndecatorLineStyle().opacity];
            transInfo.redoParams = [updated.value];
            c = signSymbol.getIndecatorLineStyle().color;
            if (c.includes("#")) {
                signSymbol.setIndecatorLineStyle({ lineColor: hexToRgb(c, updated.value), opacity: parseFloat(updated.value) });
            } else {
                color = colorConvert(c);
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                signSymbol.setIndecatorLineStyle({ lineColor: hexToRgb(hexColor, updated.value), opacity: parseFloat(updated.value) });
            }
            break;
        default:
            break;
    }
    transaction.transInfos.push(transInfo);
}
function parseUrlFromIndex(index) {
    index = parseInt(index);
    var templateURL;
    switch (index) {
        case 0:
            templateURL = "../data/plot-sign/sign1_图片背景.html";
            break;
        case 1:
            templateURL = "../data/plot-sign/sign2_多行文字_无边框.html";
            break;
        case 2:
            templateURL = "../data/plot-sign/sign3_蓝色.html";
            break;
        case 3:
            templateURL = "../data/plot-sign/sign4_红色.html";
            break;
        case 4:
            templateURL = "../data/plot-sign/sign5_多行文字.html";
            break;
        case 5:
            templateURL = "../data/plot-sign/sign6_多行文字1.html";
            break;
        case 6:
            templateURL = "../data/plot-sign/sign7_图片背景1.html";
            break;
        case 7:
            templateURL = "../data/plot-sign/sign8_图片背景2.html";
            break;
        case 8:
            templateURL = "../data/plot-sign/sign9_图片背景3.html";
            break;
        case 9:
            templateURL = "../data/plot-sign/sign10_图片背景4.html";
            break;
        case 10:
            templateURL = "../data/plot-sign/sign11_图片背景5.html";
            break;
        case 11:
            templateURL = "../data/plot-sign/sign12_图片背景6.html";
            break;
        default:
            break;
    }
    return templateURL
}

var signGroup = [resources.text_signSymbol, resources.text_titleStyle, resources.text_titleFrameStyle, resources.text_contentStyle, resources.text_contentFrameStyle, resources.text_opt_border, resources.text_associatedLine];
var displaySignName = [resources.text_signAssociatedPoint, resources.text_signPosition, resources.text_title, resources.text_content, resources.text_XOffset, resources.text_YOffset, resources.horizenFillDis, resources.verticalFillDis, resources.text_borderColor, resources.text_borderWidth, resources.text_mode];
var displaySignTitleStyleName = [resources.text_titleFont, resources.text_titleColor, resources.text_titleFontSize, resources.text_titleBackColor, resources.text_titleOpacity, resources.text_titleBold, resources.text_titleAlignType];
var displaySignTitleFrameStyleName = [resources.text_titleFrameColor, resources.text_titleFrameLineOpacity, resources.text_titleFrameBackColor, resources.text_titleFrameBackOpacity];
var displaySignContentStyleName = [resources.text_contentFont, resources.text_contentColor, resources.text_contentFontSize, resources.text_contentBackColor, resources.text_contentOpacity, resources.text_contentBold, resources.text_contentAlignType];
var displaySignContentFrameStyleName = [resources.text_contentFrameColor, resources.text_contentFrameLineOpacity, resources.text_contentFrameBackColor, resources.text_contentFrameBackOpacity];
var displaySignLineStyleName = [resources.text_signLineColor, resources.text_signLineWidth, resources.text_signLineOpacity];

function collectionSignSymbolPropertyGridRows(signSymbol) {
    var rows = [];
    //标牌的位置
    if (signSymbol.associatedUuid == null) {
        rows.push({ "name": displaySignName[0], "value": signSymbol.latLngs != null ? `${signSymbol.latLngs.lat},${signSymbol.latLngs.lng}` : null, "editor": "text", "group": signGroup[0] });
    }
    // var position = new Object();
    // position.group = signGroup[0];
    // position.name = displaySignName[1];
    // position.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getPositionRows() } }
    // position.value = positionValueToString(signSymbol.symbolText.textPosition);
    // rows.push(position);

    // if (signSymbol.symbolText.signMode == 2) {
    //     var templateURL = new Object();
    //     templateURL.group = signGroup[0];
    //     templateURL.name = displaySignName[10];
    //     templateURL.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getURLRows() } }
    //     templateURL.value = urlValueToString(signSymbol.symbolText.templateUrl);
    //     rows.push(templateURL);
    // }

    var offsetX = new Object();
    offsetX.group = signGroup[0];
    offsetX.name = displaySignName[4];
    offsetX.editor = "text"
    if (signSymbol.symbolText.offsetX != undefined) {
        offsetX.value = signSymbol.symbolText.offsetX;
    }
    rows.push(offsetX);

    var offsetY = new Object();
    offsetY.group = signGroup[0];
    offsetY.name = displaySignName[5];
    offsetY.editor = "text"
    if (signSymbol.symbolText.offsetY != undefined) {
        offsetY.value = signSymbol.symbolText.offsetY;
    }
    rows.push(offsetY);

    // var paddingX = new Object();
    // paddingX.group = signGroup[0];
    // paddingX.name = displaySignName[6];
    // paddingX.editor = "text"
    // if (signSymbol.symbolText.paddingX != undefined) {
    //     paddingX.value = signSymbol.symbolText.paddingX;
    // }
    // rows.push(paddingX);

    // var paddingY = new Object();
    // paddingY.group = signGroup[0];
    // paddingY.name = displaySignName[7];
    // paddingY.editor = "text"
    // if (signSymbol.symbolText.paddingY != undefined) {
    //     paddingY.value = signSymbol.symbolText.paddingY;
    // }
    // rows.push(paddingY);

    var title = new Object();
    title.group = signGroup[1];
    title.name = displaySignName[2];
    title.editor = "text"
    if (signSymbol.getTitle() != undefined) {
        title.value = signSymbol.getTitle();
    }
    rows.push(title);
    if (signSymbol.symbolText.signMode != 2) {
        // if (signSymbol.symbolText.signMode != 2) {
        var titleFont = new Object();
        titleFont.group = signGroup[1];
        titleFont.name = displaySignTitleStyleName[0];
        titleFont.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontRows() } }
        titleFont.value = fontValueToStrin(signSymbol.getTitleStyle().fontFamily);
        rows.push(titleFont);

        var titleFontColor = new Object();
        titleFontColor.group = signGroup[1];
        titleFontColor.name = displaySignTitleStyleName[1];
        titleFontColor.editor = "colorpicker";
        if (signSymbol.getTitleStyle() !== undefined) {
            let c = signSymbol.getTitleStyle().color;
            let color = c.includes("#") ? c : colorConvert(c);
            if (color.includes && color.includes("#")) {
                titleFontColor.value = color;
            } else {
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                titleFontColor.value = hexColor;
            }

        }
        rows.push(titleFontColor);

        var titleFontSize = new Object();
        titleFontSize.group = signGroup[1];
        titleFontSize.name = displaySignTitleStyleName[2];
        titleFontSize.editor = "text";
        if (signSymbol.getTitleStyle() != undefined) {
            titleFontSize.value = signSymbol.getTitleStyle().fontSize;
        }
        rows.push(titleFontSize);

        var titleFrameColor = new Object();
        titleFrameColor.group = signGroup[2];
        titleFrameColor.name = displaySignTitleFrameStyleName[0];
        titleFrameColor.editor = "colorpicker";
        if (signSymbol.getTitleFrameStyle() !== undefined) {
            let c = signSymbol.getTitleFrameStyle().lineColor;
            let color = c.includes("#") ? c : colorConvert(c);
            if (color.includes && color.includes("#")) {
                titleFrameColor.value = color;
            } else {
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                titleFrameColor.value = hexColor;
            }

        }
        rows.push(titleFrameColor);

        var titleFrameOpacity = new Object();
        titleFrameOpacity.group = signGroup[2];
        titleFrameOpacity.name = displaySignTitleFrameStyleName[1];
        titleFrameOpacity.editor = "text"
        if (signSymbol.getTitleFrameStyle() != undefined) {
            let color = colorConvert(signSymbol.getTitleFrameStyle().lineColor);
            titleFrameOpacity.value = color.alpha;
        }
        rows.push(titleFrameOpacity);

        var titleBackgroundColor = new Object();
        titleBackgroundColor.group = signGroup[2];
        titleBackgroundColor.name = displaySignTitleFrameStyleName[2];
        titleBackgroundColor.editor = "colorpicker";
        if (signSymbol.getTitleFrameStyle() !== undefined) {
            let c = signSymbol.getTitleFrameStyle().backgroundColor;
            let color = c.includes("#") ? c : colorConvert(c);

            if (color.includes && color.includes("#")) {
                titleBackgroundColor.value = color;
            } else {
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                titleBackgroundColor.value = hexColor;
            }
        }
        rows.push(titleBackgroundColor);

        var titleBackgroundOpacity = new Object();
        titleBackgroundOpacity.group = signGroup[2];
        titleBackgroundOpacity.name = displaySignTitleFrameStyleName[3];
        titleBackgroundOpacity.editor = "text"
        if (signSymbol.getTitleFrameStyle() != undefined) {

            let color = colorConvert(signSymbol.getTitleFrameStyle().backgroundColor);
            titleBackgroundOpacity.value = color.alpha;
        }
        rows.push(titleBackgroundOpacity);
    }


    // var titleBackgroundColor = new Object();
    // titleBackgroundColor.group = signGroup[1];
    // titleBackgroundColor.name = displaySignTitleStyleName[3];
    // titleBackgroundColor.editor = "colorpicker";
    // if (signSymbol.symbolText.style.titleBackgroundColor !== undefined) {
    //     titleBackgroundColor.value = signSymbol.symbolText.style.titleBackgroundColor;
    // }
    // rows.push(titleBackgroundColor);
    // var titleOpacity = new Object();
    // titleOpacity.group = signGroup[1];
    // titleOpacity.name = displaySignTitleStyleName[4];
    // titleOpacity.editor = "text"
    // if (signSymbol.symbolText.style.titleOpacity != undefined) {
    //     titleOpacity.value = signSymbol.getTitleStyle().color;
    // }
    // rows.push(titleOpacity);

    // // }
    // var titleWeight = new Object();
    // titleWeight.group = signGroup[1];
    // titleWeight.name = displaySignTitleStyleName[5];
    // titleWeight.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontWeight() } }
    // titleWeight.value = fontWeightValueToString(signSymbol.getTitleStyle().fontWeight);
    // rows.push(titleWeight);


    // if(signSymbol.symbolText.signMode !=0){
    //     var titleAlign = new Object();
    //     titleAlign.group = signGroup[1];
    //     titleAlign.name = displaySignTitleStyleName[6];
    //     titleAlign.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontAlign() } }
    //     titleAlign.value = fontAlignValueToString(signSymbol.symbolText.style.titleAlign);
    //     rows.push(titleAlign);
    // }
    if (signSymbol.symbolText.signMode == 1 || signSymbol.symbolText.signMode == 2) {
        var content = new Object();
        content.group = signGroup[3];
        content.name = displaySignName[3];
        content.editor = "text"
        if (signSymbol.getTexts() != undefined) {
            content.value = signSymbol.getTexts();
        }
        rows.push(content);
    }
    if (signSymbol.symbolText.signMode == 1){
        var contentFont = new Object();
        contentFont.group = signGroup[3];
        contentFont.name = displaySignContentStyleName[0];
        contentFont.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontRows() } }
        contentFont.value = fontValueToStrin(signSymbol.getTextStyles()[0].fontFamily);
        rows.push(contentFont);

        var contentFontColor = new Object();
        contentFontColor.group = signGroup[3];
        contentFontColor.name = displaySignContentStyleName[1];
        contentFontColor.editor = "colorpicker";
        if (signSymbol.getTextStyles() !== undefined) {
            let c = signSymbol.getTextStyles()[0].color;
            let color = c.includes("#") ? c : colorConvert(c);
            if (color.includes && color.includes("#")) {
                contentFontColor.value = color;
            } else {
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                contentFontColor.value = hexColor;
            }

        }
        rows.push(contentFontColor);

        var contentFontSize = new Object();
        contentFontSize.group = signGroup[3];
        contentFontSize.name = displaySignContentStyleName[2];
        contentFontSize.editor = "text";
        if (signSymbol.getTextStyles() != undefined) {
            contentFontSize.value = signSymbol.getTextStyles()[0].fontSize;
        }
        rows.push(contentFontSize);

        var contentFrameColor = new Object();
        contentFrameColor.group = signGroup[4];
        contentFrameColor.name = displaySignContentFrameStyleName[0];
        contentFrameColor.editor = "colorpicker";
        if (signSymbol.getContentFrameStyle() !== undefined) {
            let c = signSymbol.getContentFrameStyle().backgroundColor;
            let color = c.includes("#") ? c : colorConvert(c);
            if (color.includes && color.includes("#")) {
                contentFrameColor.value = color;
            } else {
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                contentFrameColor.value = hexColor;
            }

        }
        rows.push(contentFrameColor);

        var contentFrameOpacity = new Object();
        contentFrameOpacity.group = signGroup[4];
        contentFrameOpacity.name = displaySignContentFrameStyleName[1];
        contentFrameOpacity.editor = "text"
        if (signSymbol.getContentFrameStyle() != undefined) {
            let color = colorConvert(signSymbol.getContentFrameStyle().lineColor);
            contentFrameOpacity.value = color.alpha;
        }
        rows.push(contentFrameOpacity);

        var contentBackgroundColor = new Object();
        contentBackgroundColor.group = signGroup[4];
        contentBackgroundColor.name = displaySignContentFrameStyleName[2];
        contentBackgroundColor.editor = "colorpicker";
        if (signSymbol.getContentFrameStyle() !== undefined) {
            let c = signSymbol.getContentFrameStyle().backgroundColor;
            let color = c.includes("#") ? c : colorConvert(c);
            if (color.includes && color.includes("#")) {
                contentBackgroundColor.value = color;
            } else {
                let hexColor = rgbToHex(color.red, color.green, color.blue);
                contentBackgroundColor.value = hexColor;
            }

        }
        rows.push(contentBackgroundColor);

        var contentBackgroundOpacity = new Object();
        contentBackgroundOpacity.group = signGroup[4];
        contentBackgroundOpacity.name = displaySignContentFrameStyleName[3];
        contentBackgroundOpacity.editor = "text"
        if (signSymbol.getContentFrameStyle() != undefined) {

            // let color = signSymbol.getContentFrameStyle().backgroundColor[0].includes("#") ? signSymbol.getContentFrameStyle().backgroundColor[0] :colorConvert(signSymbol.getContentFrameStyle().backgroundColor[0]);
            let color = colorConvert(signSymbol.getContentFrameStyle().backgroundColor);
            contentBackgroundOpacity.value = color.alpha;
        }
        rows.push(contentBackgroundOpacity);

    }





    // var contentBackgroundColor = new Object();
    // contentBackgroundColor.group = signGroup[3];
    // contentBackgroundColor.name = displaySignContentStyleName[3];
    // contentBackgroundColor.editor = "colorpicker";
    // if (signSymbol.symbolText.style.contentBackgroundColor !== undefined) {
    //     contentBackgroundColor.value = signSymbol.symbolText.style.contentBackgroundColor;
    // }
    // rows.push(contentBackgroundColor);

    // var contentOpacity = new Object();
    // contentOpacity.group = signGroup[3];
    // contentOpacity.name = displaySignContentStyleName[4];
    // contentOpacity.editor = "text"
    // if (signSymbol.symbolText.style.contentOpacity != undefined) {
    //     contentOpacity.value = signSymbol.symbolText.style.contentOpacity;
    // }
    // rows.push(contentOpacity);

    // if (signSymbol.symbolText.signMode == 1) {
    //     var content = new Object();
    //     content.group = signGroup[2];
    //     content.name = displaySignName[3];
    //     content.editor = "text"
    //     if (signSymbol.symbolText.textContent != undefined) {
    //         content.value = signSymbol.symbolText.textContent;
    //     }
    //     rows.push(content);

    //     var contentFont = new Object();
    //     contentFont.group = signGroup[2];
    //     contentFont.name = displaySignContentStyleName[0];
    //     contentFont.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontRows() } }
    //     contentFont.value = fontValueToStrin(signSymbol.symbolText.style.contentFont);
    //     rows.push(contentFont);

    //     var contentFontColor = new Object();
    //     contentFontColor.group = signGroup[2];
    //     contentFontColor.name = displaySignContentStyleName[1];
    //     contentFontColor.editor = "colorpicker";
    //     if (signSymbol.symbolText.style.contentFontColor !== undefined) {
    //         contentFontColor.value = signSymbol.symbolText.style.contentFontColor;
    //     }
    //     rows.push(contentFontColor);

    //     var contentFontSize = new Object();
    //     contentFontSize.group = signGroup[2];
    //     contentFontSize.name = displaySignContentStyleName[2];
    //     contentFontSize.editor = "text";
    //     if (signSymbol.symbolText.style.contentFontSize != undefined) {
    //         contentFontSize.value = signSymbol.symbolText.style.contentFontSize;
    //     }
    //     rows.push(contentFontSize);


    //     var contentBackgroundColor = new Object();
    //     contentBackgroundColor.group = signGroup[2];
    //     contentBackgroundColor.name = displaySignContentStyleName[3];
    //     contentBackgroundColor.editor = "colorpicker";
    //     if (signSymbol.symbolText.style.contentBackgroundColor !== undefined) {
    //         contentBackgroundColor.value = signSymbol.symbolText.style.contentBackgroundColor;
    //     }
    //     rows.push(contentBackgroundColor);

    //     var contentOpacity = new Object();
    //     contentOpacity.group = signGroup[2];
    //     contentOpacity.name = displaySignContentStyleName[4];
    //     contentOpacity.editor = "text"
    //     if (signSymbol.symbolText.style.contentOpacity != undefined) {
    //         contentOpacity.value = signSymbol.symbolText.style.contentOpacity;
    //     }
    //     rows.push(contentOpacity);


    //     var contentWeight = new Object();
    //     contentWeight.group = signGroup[2];
    //     contentWeight.name = displaySignContentStyleName[5];
    //     contentWeight.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontWeight() } }
    //     contentWeight.value = fontWeightValueToString(signSymbol.symbolText.style.contentWeight);
    //     rows.push(contentWeight);

    //     var contentAlign = new Object();
    //     contentAlign.group = signGroup[2];
    //     contentAlign.name = displaySignContentStyleName[6];
    //     contentAlign.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontAlign() } }
    //     contentAlign.value = fontAlignValueToString(signSymbol.symbolText.style.contentAlign);
    //     rows.push(contentAlign);

    // }


    // if (signSymbol.symbolText.signMode != 2) {
    //     var borderWidth = new Object();
    //     borderWidth.group = signGroup[3];
    //     borderWidth.name = displaySignName[9];
    //     borderWidth.editor = "text";
    //     if (signSymbol.symbolText.style.borderWidth !== undefined) {
    //         borderWidth.value = signSymbol.symbolText.style.borderWidth;
    //     }
    //     rows.push(borderWidth);

    //     var borderColor = new Object();
    //     borderColor.group = signGroup[3];
    //     borderColor.name = displaySignName[8];
    //     borderColor.editor = "colorpicker";
    //     if (signSymbol.symbolText.style.borderColor !== undefined) {
    //         borderColor.value = signSymbol.symbolText.style.borderColor;
    //     }
    //     rows.push(borderColor);
    // }

    var lineColor = new Object();
    lineColor.group = signGroup[6];
    lineColor.name = displaySignLineStyleName[0];
    lineColor.editor = "colorpicker";
    if (signSymbol.getIndecatorLineStyle() !== undefined) {
        if (signSymbol.getIndecatorLineStyle().color.includes("#")) {
            lineColor.value = signSymbol.getIndecatorLineStyle().color;
        } else {
            let color = colorConvert(signSymbol.getIndecatorLineStyle().color);
            let hexColor = rgbToHex(color.red, color.green, color.blue);
            lineColor.value = hexColor;
        }


    }
    rows.push(lineColor);

    var lineWeight = new Object();
    lineWeight.group = signGroup[6];
    lineWeight.name = displaySignLineStyleName[1];
    lineWeight.editor = "text";
    if (signSymbol.getIndecatorLineStyle() != undefined) {
        lineWeight.value = signSymbol.getIndecatorLineStyle().weight;
    }
    rows.push(lineWeight);

    var lineOpacity = new Object();
    lineOpacity.group = signGroup[6];
    lineOpacity.name = displaySignLineStyleName[2];
    lineOpacity.editor = "text";
    if (signSymbol.getIndecatorLineStyle() != undefined) {
        lineOpacity.value = signSymbol.getIndecatorLineStyle().opacity;
    }
    rows.push(lineOpacity);


    return rows;
}

function rgbToHex(red, green, blue) {
    const toHex = (colorValue) => {
        const hex = colorValue.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    return "#" + toHex(red) + toHex(green) + toHex(blue);
}

function hexToRgb(hex, alpha) {
    hex = hex.replace(/^\s*#|\s*$/g, '');
    let red = parseInt(hex.substr(0, 2), 16);
    let green = parseInt(hex.substr(2, 2), 16);
    let blue = parseInt(hex.substr(4, 2), 16);
    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function colorConvert(colorString) {
    if (colorString instanceof Array) {
        colorString = colorString[0]
    }
    var red = 0;
    var green = 0;
    var blue = 0;
    var alpha = 1;
    if (colorString.includes("#")) {
        red = parseInt(colorString.slice(1, 3), 16);
        green = parseInt(colorString.slice(3, 5), 16);
        blue = parseInt(colorString.slice(5, 7), 16);
        alpha = parseInt(colorString.slice(7, 9), 16) / 255;
    } else {
        var strs = colorString.split(",");
        red = Number(strs[0].split("(")[1]);
        green = Number(strs[1]);
        blue = Number(strs[2]);
        alpha = Number(strs[3].split(")")[0]);
    }
    if (isNaN(alpha) || alpha == 1) {
        alpha = 1;
    }

    return { red: red, green: green, blue: blue, alpha: alpha };
}

function getTie() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_false });
    rows.push({ "value": "1", "text": resources.text_true });
    return rows;
}
function tieValueToString(value) {
    var type = parseInt(value);
    var result;
    switch (type) {
        case 0:
            result = resources.text_false;
            break;
        case 1:
            result = resources.text_true;
            break;
        default:
            break;
    }
    return result;
}
function getPositionRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_top });
    rows.push({ "value": "1", "text": resources.text_bottom });
    rows.push({ "value": "2", "text": resources.text_left });
    rows.push({ "value": "3", "text": resources.text_right });
    return rows;
}
function positionValueToString(value) {
    var type = parseInt(value);
    var result;
    switch (type) {
        case 0:
            result = resources.text_top;
            break;
        case 1:
            result = resources.text_bottom;
            break;
        case 2:
            result = resources.text_left;
            break;
        case 3:
            result = resources.text_right;
            break;
        default:
            break;
    }
    return result;
}
function getFontRows() {
    var rows = [];
    rows.push({ "value": resources.text_song, "text": resources.text_song });
    rows.push({ "value": resources.text_li, "text": resources.text_li });
    rows.push({ "value": resources.text_kai, "text": resources.text_kai });
    rows.push({ "value": "Helvetica", "text": "Helvetica" });
    rows.push({ "value": "Times New Roman", "text": "Times New Roman" });
    return rows;
}
function fontValueToStrin(value) {
    var result;
    switch (value) {
        case resources.text_song:
            result = resources.text_song;
            break;
        case resources.text_li:
            result = resources.text_li;
            break;
        case resources.text_kai:
            result = resources.text_kai;
            break;
        case "Helvetica":
            result = "Helvetica";
            break;
        case "Times New Roman":
            result = "Times New Roman";
            break;
        case "微软雅黑":
            result = value;
            break;
        default:
            break;
    }
    return result;
}
function getFontWeight() {
    var rows = [];
    rows.push({ "value": " ", "text": resources.text_unbold });
    rows.push({ "value": "bold", "text": resources.text_bold });
    return rows;
}
function fontWeightValueToString(value) {
    var result;
    switch (value) {
        case " ":
            result = resources.text_unbold;
            break;
        case "bold":
            result = resources.text_bold;
            break;
        default:
            break;
    }
    return result;
}
function getFontAlign() {
    var rows = [];
    rows.push({ "value": "left", "text": "left" });
    rows.push({ "value": "center", "text": "center" });
    rows.push({ "value": "right", "text": "right" });
    return rows;
}
function fontAlignValueToString(value) {
    var result;
    switch (value) {
        case "left":
            result = "left";
            break;
        case "center":
            result = "center";
            break;
        case "right":
            result = "right";
            break;
        default:
            break;
    }
    return result;
}
function getURLRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.title_template1 });
    rows.push({ "value": "1", "text": resources.title_template2 });
    rows.push({ "value": "2", "text": resources.title_template3 });
    rows.push({ "value": "3", "text": resources.title_template4 });
    rows.push({ "value": "4", "text": resources.title_template5 });
    rows.push({ "value": "5", "text": resources.title_template6 });
    rows.push({ "value": "6", "text": resources.title_template7 });
    return rows;
}
function urlValueToString(value) {
    var result;
    switch (value) {
        case "../../dist/leaflet/html/sign1.html":
            result = resources.title_template1;
            break;
        case "../../dist/leaflet/html/sign2.html":
            result = resources.title_template2;
            break;
        case "../../dist/leaflet/html/sign3.html":
            result = resources.title_template3;
            break;
        case "../../dist/leaflet/html/sign4.html":
            result = resources.title_template4;
            break;
        case "../../dist/leaflet/html/sign5.html":
            result = resources.title_template5;
            break;
        case "../../dist/leaflet/html/sign6.html":
            result = resources.title_template6;
            break;
        case "../../dist/leaflet/html/sign7.html":
            result = resources.title_template7;
            break;
        default:
            break;
    }
    return result
}