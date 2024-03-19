L.supermap.plotting.initSignTreePanel = function (div, plotMapManager, layer) {
    plotMapManager.on(SuperMap.Plot.Event.signsymbollayeradded, function (event) {
        event.signSymbolLayer.on(SuperMap.Plot.Event.signsymbolsadded, refresh);
        event.signSymbolLayer.on(SuperMap.Plot.Event.signsymbolsremoved, refresh);
        signSymbolAdd();
    });
    plotMapManager.on(SuperMap.Plot.Event.signsymbollayerremoved, function (event) {
        signSymbolAdd();
    });
    if(layer!=null||layer!=undefined){
        layer.on(SuperMap.Plot.Event.signsymbolsadded, refresh);
        layer.on(SuperMap.Plot.Event.signsymbolsremoved,refresh);
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
    treeNode.id = "tree";
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
                if(sign.getVisible()){
                    document.getElementById("signSymbolVisiable").value = "标牌隐藏";
                }else{
                    document.getElementById("signSymbolVisiable").value = "标牌显示";
                }
            }
        }
        selectedSignSymbolLayer = null;
        if (treeNode.tag == "signLayer") {
            if(editControl.getSelectedSignSymbols()[0]){
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
            if(selectedSignSymbolLayer.getVisibility()){
                document.getElementById("layerVisiable").value = "图层隐藏"
            }else{
                document.getElementById("layerVisiable").value = "图层显示"
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
    $.fn.zTree.init($("#tree"), setting, treeData);
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
                if(feature==null){
                    continue;
                }
                var isAdd = false;
                var childRootNode;
                for (var j in treeData) {
                    if (treeData[j].associatedUuid) {
                        if (treeData[j].associatedUuid == signSymbol.associatedUuid&&treeData[j].layername == layer.name) {
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
    editControl.on(SuperMap.Plot.Event.signsymboldrag,function(event){
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
            transInfo.undoParams = [{lat:signSymbol.latLngs.lat,lng:signSymbol.latLngs.lng}];
            var ll;
            if(updated.value.indexOf(",")!=-1){
                ll = updated.value.split(",");
            }else if(updated.value.indexOf("，")!=-1){
                ll = updated.value.split("，");
            }
            transInfo.redoParams = [{lat:parseFloat(ll[0]),lng:parseFloat(ll[1])}];
            signSymbol.setSignSymbolLatlngs(L.latLng(parseFloat(ll[0]),parseFloat(ll[1])));
            break;
        case displaySignName[10]:
            transInfo.functionName = "setUrl";
            transInfo.undoParams = [signSymbol.sign.templateURL];
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
            transInfo.undoParams = [signSymbol.getContent()];
            transInfo.redoParams = [updated.value];
            signSymbol.setContent(updated.value);
            break;
        case displaySignName[4]:
            transInfo.functionName = "setOffset";
            transInfo.undoParams = [signSymbol.getOffset()];
            transInfo.redoParams = [{x:parseInt(updated.value),y:signSymbol.getOffset().y}];
            signSymbol.setOffset(parseInt(updated.value),signSymbol.getOffset().y);
            break;
        case displaySignName[5]:
            transInfo.functionName = "setOffset";
            transInfo.undoParams = [signSymbol.getOffset()];
            transInfo.redoParams = [{x:signSymbol.getOffset().x,y:parseInt(updated.value)}];
            signSymbol.setOffset(signSymbol.getOffset().x,parseInt(updated.value));
            break;
        case displaySignName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.paddingX];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({paddingX:updated.value});
            break;
        case displaySignName[7]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.paddingY];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({paddingY:updated.value});
            break;
        case displaySignName[8]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.borderColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({borderColor:updated.value});
            break;
        case displaySignName[9]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.borderWidth];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({borderWidth:updated.value});
            break;
        case displaySignTitleStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleFont];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleFont:updated.value});
            break;
        case displaySignTitleStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleFontColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleFontColor:updated.value});
            break;
        case displaySignTitleStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleFontSize];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleFontSize:updated.value});
            break;
        case displaySignTitleStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleBackgroundColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleBackgroundColor:updated.value});
            break;
        case displaySignTitleStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleOpacity];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleOpacity:updated.value});
            break;
        case displaySignTitleStyleName[5]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleWeight];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleWeight:updated.value});
            break;
        case displaySignTitleStyleName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.titleAlign];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({titleAlign:updated.value});
            break;
        case displaySignContentStyleName[0]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentFont];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentFont:updated.value});
            break;
        case displaySignContentStyleName[1]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentFontColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentFontColor:updated.value});
            break;
        case displaySignContentStyleName[2]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentFontSize];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentFontSize:updated.value});
            break;
        case displaySignContentStyleName[3]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentBackgroundColor];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentBackgroundColor:updated.value});
            break;
        case displaySignContentStyleName[4]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentOpacity];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentOpacity:updated.value});
            break;
        case displaySignContentStyleName[5]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentWeight];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentWeight:updated.value});
            break;
        case displaySignContentStyleName[6]:
            transInfo.functionName = "setStyle";
            transInfo.undoParams = [signSymbol.sign.style.contentAlign];
            transInfo.redoParams = [updated.value];
            signSymbol.setStyle({contentAlign:updated.value});
            break;
        case displaySignLineStyleName[0]:
            transInfo.functionName = "setLineStyle";
            transInfo.undoParams = [signSymbol.sign.lineStyle.color];
            transInfo.redoParams = [updated.value];
            signSymbol.setLineStyle({color:updated.value});
            break;
        case displaySignLineStyleName[1]:
            transInfo.functionName = "setLineStyle";
            transInfo.undoParams = [signSymbol.sign.lineStyle.weight];
            transInfo.redoParams = [updated.value];
            signSymbol.setLineStyle({weight:updated.value});
            break;
        case displaySignLineStyleName[2]:
            transInfo.functionName = "setLineStyle";
            transInfo.undoParams = [signSymbol.sign.lineStyle.opacity];
            transInfo.redoParams = [updated.value];
            signSymbol.setLineStyle({opacity:updated.value});
            break;
        default:
            break;
    }
    transaction.transInfos.push(transInfo);
}
function parseUrlFromIndex(index){
    index = parseInt(index);
    var templateURL;
    switch (index) {
        case 0:
            templateURL = "../../dist/leaflet/html/sign1.html";
        break;
        case 1:
            templateURL = "../../dist/leaflet/html/sign2.html";
        break;
        case 2:
            templateURL = "../../dist/leaflet/html/sign3.html";
        break;
        case 3:
            templateURL = "../../dist/leaflet/html/sign4.html";
        break;
        case 4:
            templateURL = "../../dist/leaflet/html/sign5.html";
        break;
        case 5:
            templateURL = "../../dist/leaflet/html/sign6.html";
        break;
        case 6:
            templateURL = "../../dist/leaflet/html/sign7.html";
        break;
       default:
           break;
   }
   return templateURL
}

var signGroup = ["标牌", "标题样式","内容样式","边框","连接线"];
var displaySignName = ["关联点位", "标牌位置", "标题", "内容", "偏移量X：", "偏移量Y：","横向填充距离", "纵向填充距离", "边框颜色","边框宽度","模板"];
var displaySignTitleStyleName = ["标题字体","标题颜色", "标题字体大小","标题背景色", "标题透明度", "标题是否加粗", "标题的对齐方式"];
var displaySignContentStyleName = [ "内容字体","内容颜色", "内容字体大小","内容背景色", "内容透明度" , "内容是否加粗", "内容的对齐方式"];
var displaySignLineStyleName = ["线的颜色", "线的宽度", "线的透明度"];

function collectionSignSymbolPropertyGridRows(signSymbol) {
    var rows = [];
    //标牌的位置
    if(signSymbol.associatedUuid==null){
        rows.push( { "name": displaySignName[0], "value": signSymbol.latLngs!=null?`${signSymbol.latLngs.lat},${signSymbol.latLngs.lng}`:null, "editor":"text","group": signGroup[0] });
    }
    var position = new Object();
    position.group = signGroup[0];
    position.name = displaySignName[1];
    position.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getPositionRows() } }
    position.value = positionValueToString(signSymbol.sign.signPosition);
    rows.push(position);

    var title = new Object();
    title.group = signGroup[1];
    title.name = displaySignName[2];
    title.editor = "text"
    if (signSymbol.sign.title != undefined) {
        title.value = signSymbol.sign.title;
    }
    rows.push(title);
    if(signSymbol.sign.signSymbolType == 2 ){
        var templateURL = new Object();
        templateURL.group = signGroup[0];
        templateURL.name = displaySignName[10];
        templateURL.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getURLRows() } }
        templateURL.value = urlValueToString(signSymbol.sign.templateURL);
        rows.push(templateURL);
    }
    if(signSymbol.sign.signSymbolType !=0){
        var content = new Object();
        content.group = signGroup[2];
        content.name = displaySignName[3];
        content.editor = "text"
        if (signSymbol.sign.content != undefined) {
            content.value = signSymbol.sign.content;
        }
        rows.push(content);
    }
       
    var offsetX = new Object();
    offsetX.group = signGroup[0];
    offsetX.name = displaySignName[4];
    offsetX.editor = "text"
    if (signSymbol.sign.offsetX != undefined) {
        offsetX.value = signSymbol.sign.offsetX;
    }
    rows.push(offsetX);

    var offsetY = new Object();
    offsetY.group = signGroup[0];
    offsetY.name = displaySignName[5];
    offsetY.editor = "text"
    if (signSymbol.sign.offsetY != undefined) {
        offsetY.value = signSymbol.sign.offsetY;
    }
    rows.push(offsetY);

    var paddingX = new Object();
    paddingX.group = signGroup[0];
    paddingX.name = displaySignName[6];
    paddingX.editor = "text"
    if (signSymbol.sign.style.paddingX != undefined) {
        paddingX.value = signSymbol.sign.style.paddingX;
    }
    rows.push(paddingX);

    var paddingY = new Object();
    paddingY.group = signGroup[0];
    paddingY.name = displaySignName[7];
    paddingY.editor = "text"
    if (signSymbol.sign.style.paddingY != undefined) {
        paddingY.value = signSymbol.sign.style.paddingY;
    }
    rows.push(paddingY);

    if(signSymbol.sign.signSymbolType !=2){
        var borderWidth = new Object();
        borderWidth.group = signGroup[3];
        borderWidth.name = displaySignName[9];
        borderWidth.editor = "text";
        if (signSymbol.sign.style.borderWidth !== undefined) {
            borderWidth.value = signSymbol.sign.style.borderWidth;
        }
        rows.push(borderWidth);
    
        var borderColor = new Object();
        borderColor.group = signGroup[3];
        borderColor.name = displaySignName[8];
        borderColor.editor = "colorpicker";
        if (signSymbol.sign.style.borderColor !== undefined) {
            borderColor.value = signSymbol.sign.style.borderColor;
        }
        rows.push(borderColor);
    }

    var lineColor = new Object();
    lineColor.group = signGroup[4];
    lineColor.name = displaySignLineStyleName[0];
    lineColor.editor = "colorpicker";
    if (signSymbol.sign.lineStyle.color !== undefined) {
        lineColor.value = signSymbol.sign.lineStyle.color;
    }
    rows.push(lineColor);

    var lineWeight = new Object();
    lineWeight.group = signGroup[4];
    lineWeight.name = displaySignLineStyleName[1];
    lineWeight.editor = "text";
    if (signSymbol.sign.lineStyle.weight != undefined) {
        lineWeight.value = signSymbol.sign.lineStyle.weight;
    }
    rows.push(lineWeight);

    var lineOpacity = new Object();
    lineOpacity.group = signGroup[4];
    lineOpacity.name = displaySignLineStyleName[2];
    lineOpacity.editor = "text";
    if (signSymbol.sign.lineStyle.opacity != undefined) {
        lineOpacity.value = signSymbol.sign.lineStyle.opacity;
    }
    rows.push(lineOpacity);


    var titleFont = new Object();
    titleFont.group = signGroup[1];
    titleFont.name = displaySignTitleStyleName[0];
    titleFont.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontRows() } }
    titleFont.value = fontValueToStrin(signSymbol.sign.style.titleFont);
    rows.push(titleFont);

    var titleFontColor = new Object();
    titleFontColor.group = signGroup[1];
    titleFontColor.name = displaySignTitleStyleName[1];
    titleFontColor.editor = "colorpicker";
    if (signSymbol.sign.style.titleFontColor !== undefined) {
        titleFontColor.value = signSymbol.sign.style.titleFontColor;
    }
    rows.push(titleFontColor);

    var titleFontSize = new Object();
    titleFontSize.group = signGroup[1];
    titleFontSize.name = displaySignTitleStyleName[2];
    titleFontSize.editor = "text";
    if (signSymbol.sign.style.titleFontSize != undefined) {
        titleFontSize.value = signSymbol.sign.style.titleFontSize;
    }
    rows.push(titleFontSize);

    if(signSymbol.sign.signSymbolType !=2){

        var titleBackgroundColor = new Object();
        titleBackgroundColor.group = signGroup[1];
        titleBackgroundColor.name = displaySignTitleStyleName[3];
        titleBackgroundColor.editor = "colorpicker";
        if (signSymbol.sign.style.titleBackgroundColor !== undefined) {
            titleBackgroundColor.value = signSymbol.sign.style.titleBackgroundColor;
        }
        rows.push(titleBackgroundColor);

        var titleOpacity = new Object();
        titleOpacity.group = signGroup[1];
        titleOpacity.name = displaySignTitleStyleName[4];
        titleOpacity.editor = "text"
        if (signSymbol.sign.style.titleOpacity != undefined) {
            titleOpacity.value = signSymbol.sign.style.titleOpacity;
        }
        rows.push(titleOpacity);

    }
    var titleWeight = new Object();
    titleWeight.group = signGroup[1];
    titleWeight.name = displaySignTitleStyleName[5];
    titleWeight.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontWeight() } }
    titleWeight.value = fontWeightValueToString(signSymbol.sign.style.titleWeight);
    rows.push(titleWeight);

    if(signSymbol.sign.signSymbolType !=0){
        var titleAlign = new Object();
        titleAlign.group = signGroup[1];
        titleAlign.name = displaySignTitleStyleName[6];
        titleAlign.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontAlign() } }
        titleAlign.value = fontAlignValueToString(signSymbol.sign.style.titleAlign);
        rows.push(titleAlign);
    }

    if (signSymbol.sign.signSymbolType != 0) {

        var contentFont = new Object();
        contentFont.group = signGroup[2];
        contentFont.name = displaySignContentStyleName[0];
        contentFont.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontRows() } }
        contentFont.value = fontValueToStrin(signSymbol.sign.style.contentFont);
        rows.push(contentFont);

        var contentFontColor = new Object();
        contentFontColor.group = signGroup[2];
        contentFontColor.name = displaySignContentStyleName[1];
        contentFontColor.editor = "colorpicker";
        if (signSymbol.sign.style.contentFontColor !== undefined) {
            contentFontColor.value = signSymbol.sign.style.contentFontColor;
        }
        rows.push(contentFontColor);

        var contentFontSize = new Object();
        contentFontSize.group = signGroup[2];
        contentFontSize.name = displaySignContentStyleName[2];
        contentFontSize.editor = "text";
        if (signSymbol.sign.style.contentFontSize != undefined) {
            contentFontSize.value = signSymbol.sign.style.contentFontSize;
        }
        rows.push(contentFontSize);

        if(signSymbol.sign.signSymbolType != 2){

        var contentBackgroundColor = new Object();
        contentBackgroundColor.group = signGroup[2];
        contentBackgroundColor.name = displaySignContentStyleName[3];
        contentBackgroundColor.editor = "colorpicker";
        if (signSymbol.sign.style.contentBackgroundColor !== undefined) {
            contentBackgroundColor.value = signSymbol.sign.style.contentBackgroundColor;
        }
        rows.push(contentBackgroundColor);

        var contentOpacity = new Object();
        contentOpacity.group = signGroup[2];
        contentOpacity.name = displaySignContentStyleName[4];
        contentOpacity.editor = "text"
        if (signSymbol.sign.style.contentOpacity != undefined) {
            contentOpacity.value = signSymbol.sign.style.contentOpacity;
        }
        rows.push(contentOpacity);

        }
        var contentWeight = new Object();
        contentWeight.group = signGroup[2];
        contentWeight.name = displaySignContentStyleName[5];
        contentWeight.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontWeight() } }
        contentWeight.value = fontWeightValueToString(signSymbol.sign.style.contentWeight);
        rows.push(contentWeight);

        var contentAlign = new Object();
        contentAlign.group = signGroup[2];
        contentAlign.name = displaySignContentStyleName[6];
        contentAlign.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontAlign() } }
        contentAlign.value = fontAlignValueToString(signSymbol.sign.style.contentAlign);
        rows.push(contentAlign);

    }
    return rows;
}
function getTie(){
    var rows = [];
    rows.push({ "value": "0", "text": "否" });
    rows.push({ "value": "1", "text": "是" });
    return rows;
}
function tieValueToString(value){
    var type = parseInt(value);
    var result ;
    switch (type) {
        case 0:
            result = "否";
            break;
        case 1:
            result = "是";
            break;
        default:
            break;
    }
    return result;
}
function getPositionRows() {
    var rows = [];
    rows.push({ "value": "0", "text": "上" });
    rows.push({ "value": "1", "text": "下" });
    rows.push({ "value": "2", "text": "左" });
    rows.push({ "value": "3", "text": "右" });
    return rows;
}
function positionValueToString(value) {
    var type = parseInt(value);
    var result;
    switch (type) {
        case 0:
            result = "上";
            break;
        case 1:
            result = "下";
            break;
        case 2:
            result = "左";
            break;
        case 3:
            result = "右";
            break;
        default:
            break;
    }
    return result;
}
function getFontRows() {
    var rows = [];
    rows.push({ "value": "宋体", "text": "宋体" });
    rows.push({ "value": "隶书", "text": "隶书" });
    rows.push({ "value": "楷书", "text": "楷书" });
    rows.push({ "value": "Helvetica", "text": "Helvetica" });
    rows.push({ "value": "Times New Roman", "text": "Times New Roman" });
    return rows;
}
function fontValueToStrin(value) {
    var result;
    switch (value) {
        case "宋体":
            result = "宋体";
            break;
        case "隶书":
            result = "隶书";
            break;
        case "楷书":
            result = "楷书";
            break;
        case "Helvetica":
            result = "Helvetica";
            break;
        case "Times New Roman":
            result = "Times New Roman";
            break;
        default:
            break;
    }
    return result;
}
function getFontWeight() {
    var rows = [];
    rows.push({ "value": " ", "text": "不加粗" });
    rows.push({ "value": "bold", "text": "加粗" });
    return rows;
}
function fontWeightValueToString(value) {
    var result;
    switch (value) {
        case " ":
            result = "不加粗";
            break;
        case "bold":
            result = "加粗";
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
function getURLRows(){
    var rows = [];
    rows.push({ "value": "0", "text": "模板样式一" });
    rows.push({ "value": "1", "text": "模板样式二" });
    rows.push({ "value": "2", "text": "模板样式三" });
    rows.push({ "value": "3", "text": "模板样式四" });
    rows.push({ "value": "4", "text": "模板样式五" });
    rows.push({ "value": "5", "text": "模板样式六" });
    rows.push({ "value": "6", "text": "模板样式七" });
    return rows;
}
function urlValueToString(value){
    var result;
    switch (value) {
        case "../../dist/leaflet/html/sign1.html":
            result = "模板样式一";
            break;
        case "../../dist/leaflet/html/sign2.html":
            result = "模板样式二";
            break;
        case "../../dist/leaflet/html/sign3.html":
            result = "模板样式三";
            break;
        case "../../dist/leaflet/html/sign4.html":
            result = "模板样式四";
            break;
        case "../../dist/leaflet/html/sign5.html":
            result = "模板样式五";
            break;
        case "../../dist/leaflet/html/sign6.html":
            result = "模板样式六";
            break;
        case "../../dist/leaflet/html/sign7.html":
            result = "模板样式七";
            break;
        default:
            break;
    }
    return result
}