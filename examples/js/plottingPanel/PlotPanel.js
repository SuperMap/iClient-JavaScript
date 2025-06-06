
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.*/
L.supermap.plotting.initPlotPanel = function (div, serverUrl, drawControl) {
    var plotPanel = document.getElementById(div);

    var treeNodeStyle = document.createElement("div");
    treeNodeStyle.style.height = '50%';
    treeNodeStyle.style.width = '100%';
    treeNodeStyle.style.border = '1px solid #617775';
    treeNodeStyle.style.overflow = 'scroll';

    var treeNode = document.createElement("div");
    treeNode.id = "tree";
    treeNode.className = "ztree";

    var iconNodeStyle = document.createElement("div");
    iconNodeStyle.style.height = '50%';
    iconNodeStyle.style.width = '100%';

    var iconNode = document.createElement("div");
    iconNode.id = "icon";
    iconNode.style.height = '100%';
    iconNode.style.width = '100%';
    iconNode.style.border = '1px solid #617775';
    iconNode.style.overflow = 'scroll';

    treeNodeStyle.appendChild(treeNode);
    iconNodeStyle.appendChild(iconNode);

    plotPanel.appendChild(treeNodeStyle);
    plotPanel.appendChild(iconNodeStyle);

    function beforeClickTreeNode(treeId, treeNode) {
        var tree = $.fn.zTree.getZTreeObj(treeId);
        if (treeNode.isParent) {
            tree.expandNode(treeNode);
            return false;
        } else {
            var iconNode = document.getElementById("icon");
            iconNode.innerHTML = "";
            createDrawNodes(treeNode, iconNode, drawControl, serverUrl);
        }
    }

    var setting = {
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
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
            beforeClick: beforeClickTreeNode
        }
    };

    var symbolLibManager = L.supermap.plotting.symbolLibManager(serverUrl);
    if (symbolLibManager.isInitializeOK()) {
        var symbolTreeData = analysisSymbolTree(symbolLibManager);

        $.fn.zTree.init($("#tree"), setting, symbolTreeData);
    } else {
        symbolLibManager.on(SuperMap.Plot.Event.initializecompleted, function (result) {
            if (result.libIDs.length !== 0) {
                var symbolTreeData = analysisSymbolTree(symbolLibManager);
                $.fn.zTree.init($("#tree"), setting, symbolTreeData);
            }
        });
        symbolLibManager.initializeAsync();
    }
}

function analysisSymbolTree(symbolLibManager) {
    var treeData = [];
    var idIndex = addBasicCellTreeNodes(treeData);
    var idIndex = addRouteTreeNodes(treeData);

    for (var i = 0; i < symbolLibManager.getSymbolLibNumber(); i++) {
        var symbolLib = symbolLibManager.getSymbolLibByIndex(i);
        var rootSymbolInfo = symbolLib.getRootSymbolInfo();
        var rootSymbolIconUrl = symbolLib.getRootSymbolIconUrl();

        if (rootSymbolInfo.symbolNodeType === "SYMBOL_GROUP") {
            var rootNode = new Object();
            rootNode.id = idIndex + i;
            rootNode.pId = 0;
            rootNode.name = rootSymbolInfo.symbolName;
            rootNode.fullName = rootSymbolInfo.symbolName + "/";
            treeData.push(rootNode);

            idIndex = innerAnalysisSymbolTree(rootSymbolInfo.childNodes, treeData, rootNode, rootSymbolIconUrl);
        }

    }

    return treeData;
}

function createDrawNodes(treeNode, iconNode, drawControl, serverUrl) {
    var drawNodeClick = function () {
        if (drawControl !== null) {
            drawControl.handler.libID = this.libID;
            drawControl.handler.code = this.symbolCode;
            drawControl.handler.serverUrl = this.serverUrl;

            drawControl.handler.disable();
            drawControl.handler.enable();
        }
    }

    var me = this;
    var drawData = treeNode.drawData;

    var table = document.createElement("table");
    table.style.height = "100%";
    table.style.width = "100%";
    var i = 0;
    var rowLength = (drawData.length % 3 === 0) ? drawData.length / 3 : drawData.length / 3 + 1;
    for (var j = 0; j < rowLength; j++) {
        var tr = document.createElement("tr");
        for (var k = 0; k < 3; k++) {
            if (drawData[i]) {
                //存储菜单信息
                var td = document.createElement("td");
                var drawNode = document.createElement("div");
                drawNode.onclick = drawNodeClick;
                drawNode.style.textAlign = "center";
                drawNode.id = drawData[i].libID + "" + drawData[i].symbolCode;
                drawNode.libID = drawData[i].libID;
                drawNode.symbolCode = drawData[i].symbolCode;
                drawNode.serverUrl = serverUrl;
                //图片
                var img = document.createElement("img");
                img.src = drawData[i].icon;
                //文本
                var text = document.createElement("div");
                text.innerHTML = drawData[i].symbolName;

                drawNode.appendChild(img);
                drawNode.appendChild(text);
                td.appendChild(drawNode);

                tr.appendChild(td);
            }
            i++;
        }
        table.appendChild(tr);
    }

    iconNode.appendChild(table);
}

function addBasicCellTreeNodes(treeData) {
    var cellRootNode = new Object();
    cellRootNode.id = 1;
    cellRootNode.pId = 0;
    cellRootNode.name = resources.text_commonSymbol;
    cellRootNode.fullName = "BasicCell" + "/";
    cellRootNode.drawData = [];
    treeData.push(cellRootNode);

    var symbolCode = [24, 28, 29, 31, 34, 410, 32, 590, 360, 390, 400, 350, 26, 370, 380, 44, 3701, 3801, 4401, 48, 320
        , 1019, 1022, 1024, 321, 1023, 1025
        , 1013, 1014, 1016, 1017, 1026
        , 1001, 1003, 1004, 1028, 1029, 3000];
    var symbolName = [resources.text_foldLine, resources.text_parallelogram, resources.btn_circle, resources.text_elliptical, resources.text_textContent, resources.text_regularPolygon, resources.btn_polygon, resources.text_bezierCurves, resources.text_closeBezierCurves
        , resources.text_rallyGround, resources.text_braces, resources.text_trapezium, resources.text_input_value_drawRectangle, resources.text_bow, resources.text_sector, resources.text_arc, resources.text_bow, resources.text_sector, resources.text_arc, resources.text_parallel, resources.text_textNodeBox
        , resources.text_concentricCircle, resources.text_combinedCircle, resources.text_textbox, resources.text_mutilAngleTextbox, resources.text_freeLine, resources.text_nodeChain
        , resources.text_runway, resources.text_eight, resources.text_arrowLine, resources.text_textAlongLine, resources.text_linearText
        , resources.text_objectLines, resources.text_polygonArea, resources.text_sectorArea, resources.text_barbedWire, resources.text_straightLineArrow, resources.option_picture];
    var cellId = cellRootNode.id + 1;
    for (var i = 0; i < symbolCode.length; i++) {
        var drawCellNode = {
            id: cellId++,
            pId: 0,
            icon: "../img/plottingPanel/" + cellRootNode.fullName + symbolCode[i] + ".png",
            symbolCode: symbolCode[i],
            libID: 0,
            symbolName: symbolName[i]
        };
        cellRootNode.drawData.push(drawCellNode);
    }

    return cellId;
}

function addRouteTreeNodes(treeData) {
    var cellRootNode = new Object();
    cellRootNode.id = 1;
    cellRootNode.pId = 0;
    cellRootNode.name = resources.text_routeObj;
    cellRootNode.drawData = [];
    treeData.push(cellRootNode);

    var symbolCode = [1005, 1006, 1007];
    var symbolName = [resources.text_route1, resources.text_route2, resources.text_route3];
    var cellId = cellRootNode.id + 1;
    for (var i = 0; i < symbolCode.length; i++) {
        var drawCellNode = {
            id: cellId++,
            pId: 0,
            icon: "../img/plottingPanel/BasicCell/RouteIcon/" + symbolCode[i] + ".png",
            symbolCode: symbolCode[i],
            libID: 0,
            symbolName: symbolName[i]
        };
        cellRootNode.drawData.push(drawCellNode);
    }

    return cellId;
}

function innerAnalysisSymbolTree(childSymbolInfos, treeData, parentNode, rootSymbolIconUrl) {
    var drawData = [];
    var treeNodeId = parentNode.id + 1;
    for (var i = 0; i < childSymbolInfos.length; i++) {
        if (childSymbolInfos[i].symbolNodeType === "SYMBOL_GROUP") {
            var treeNode = new Object();
            treeNode.id = treeNodeId++;
            treeNode.pId = parentNode.id;
            treeNode.name = childSymbolInfos[i].symbolName;
            treeNode.fullName = parentNode.fullName + childSymbolInfos[i].symbolName + "/";
            treeData.push(treeNode);

            treeNodeId = innerAnalysisSymbolTree(childSymbolInfos[i].childNodes, treeData, treeNode, rootSymbolIconUrl);
        } else if (childSymbolInfos[i].symbolNodeType === "SYMBOL_NODE") {
            var drawNode = new Object();
            drawNode.id = treeNodeId++;
            drawNode.pId = parentNode.id;
            drawNode.icon = rootSymbolIconUrl + parentNode.fullName + childSymbolInfos[i].symbolCode + ".png";
            drawNode.symbolCode = childSymbolInfos[i].symbolCode;
            drawNode.libID = childSymbolInfos[i].libID;
            drawNode.symbolName = childSymbolInfos[i].symbolName + "_" + childSymbolInfos[i].symbolCode;
            drawData.push(drawNode);
        }
    }

    if (drawData.length !== 0) {
        parentNode.drawData = drawData;
    }

    return treeNodeId;
}
