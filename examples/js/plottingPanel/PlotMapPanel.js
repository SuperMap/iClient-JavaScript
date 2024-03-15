/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.*/
// import {ChildPlotLayer} from "../../../plugins/plotting/leaflet/mapping";

L.supermap.plotting.initPlotMapPanel = function(div, plotMapManager){
    var currentSelectedNode = null;

    plotMapManager.on(SuperMap.Plot.Event.featuresadded, function(event){
        featureAdded(event);
    });
    plotMapManager.on(SuperMap.Plot.Event.beforefeaturesremoved, function(event){
        featureAdded(event);
    });
    plotMapManager.on(SuperMap.Plot.Event.featuresremoved, function(event){
        featureAdded(event);
    });
    plotMapManager.on(SuperMap.Plot.Event.plottinglayeradded, function(event){
        featureAdded(event);
    });
    plotMapManager.on(SuperMap.Plot.Event.plottinglayerremoved, function(event){
        featureAdded(event);
    });
    plotMapManager.on(SuperMap.Plot.Event.childplotlayeradded, function(event){
        featureAdded(event);
    });
    plotMapManager.on(SuperMap.Plot.Event.childplotlayerremoved, function(event){
        featureAdded(event);
    });

    var plotMapPanel = document.getElementById(div);
    var treeNodeStyle = document.createElement("div");
    treeNodeStyle.style.height = '100%';
    treeNodeStyle.style.width = '100%';
    treeNodeStyle.style.border = '1px solid #617775';
    treeNodeStyle.style.overflow ='scroll';
    var treeNode = document.createElement("div");
    treeNode.id = "tree";
    treeNode.className = "ztree";

    createRightMenu(plotMapPanel);

    treeNodeStyle.appendChild(treeNode);
    plotMapPanel.appendChild(treeNodeStyle);

    initPlotMapTree();

    plotMapPanel.oncontextmenu = function(event){
        showRightMenu("root", event.clientX, event.clientY);
        if(event && event.stopPropagation){
            event.stopPropagation();
        }

        if(event && event.preventDefault()){
            event.preventDefault();
        }
    }


    function createRightMenu(plotMapPanel){
        var rMenu = document.createElement("div");
        rMenu.id = "rMenu";
        rMenu.style.position= 'absolute';
        rMenu.style.visibility = 'hidden';
        rMenu.style.top = '0';
        rMenu.style.backgroundColor = '#555';
        rMenu.style.textAlign = 'left';

        var rMenuUl = document.createElement("ul");
        rMenuUl.style.margin = '0px';
        rMenuUl.style.padding = '0px';

        var createPlotLayer = document.createElement("li");
        createPlotLayer.id="createPlottingLayer";
        createPlotLayer.innerText = "创建图元层";
        createPlotLayer.style.margin = '1px 0';
        createPlotLayer.style.padding = '0 5px';
        createPlotLayer.style.cursor = 'pointer';
        createPlotLayer.style.backgroundColor = '#cad4e6';
        createPlotLayer.style.listStyle = 'none outside none';
        createPlotLayer.onclick = function () {
            var plottingLayerName = "图元层";
            var plottingLayer = L.supermap.plotting.plottingLayer(plottingLayerName, serverUrl);
            plottingLayer.addTo(map);

            hideRightMenu();
        }
        rMenuUl.appendChild(createPlotLayer);

        var activePlottingLayer = document.createElement("li");
        activePlottingLayer.id="activePlottingLayer";
        activePlottingLayer.innerText = "激活";
        activePlottingLayer.style.margin = '1px 0';
        activePlottingLayer.style.padding = '0 5px';
        activePlottingLayer.style.cursor = 'pointer';
        activePlottingLayer.style.backgroundColor = '#cad4e6';
        activePlottingLayer.style.listStyle = 'none outside none';
        activePlottingLayer.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "PlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                L.supermap.plotting.getControl().getPlotMapManager().setActivePlottingLayer(plottingLayers[currentSelectedNode.tag]);
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(activePlottingLayer);

        var activeChildPlotLayer = document.createElement("li");
        activeChildPlotLayer.id="activeChildPlotLayer";
        activeChildPlotLayer.innerText = "激活";
        activeChildPlotLayer.style.margin = '1px 0';
        activeChildPlotLayer.style.padding = '0 5px';
        activeChildPlotLayer.style.cursor = 'pointer';
        activeChildPlotLayer.style.backgroundColor = '#cad4e6';
        activeChildPlotLayer.style.listStyle = 'none outside none';
        activeChildPlotLayer.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "ChildPlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                var childPlottingLayers = plottingLayers[currentSelectedNode.getParentNode().tag].getChildPlotLayers();
                L.supermap.plotting.getControl().getPlotMapManager().setActiveChildPlotLayer(childPlottingLayers[currentSelectedNode.tag]);
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(activeChildPlotLayer);

        var fixSymScale = document.createElement("li");
        fixSymScale.id="fixSymScale";
        fixSymScale.innerText = "修改缩放基准为当前地图比例尺";
        fixSymScale.style.margin = '1px 0';
        fixSymScale.style.padding = '0 5px';
        fixSymScale.style.cursor = 'pointer';
        fixSymScale.style.backgroundColor = '#cad4e6';
        fixSymScale.style.listStyle = 'none outside none';
        fixSymScale.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "PlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                plottingLayers[currentSelectedNode.tag].setSymScaleDefinition(L.supermap.plotting.getControl().getPlotMapManager().getLayerScale(),true);
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(fixSymScale);

        var createChildPlotLayer = document.createElement("li");
        createChildPlotLayer.id="createChildPlotLayer";
        createChildPlotLayer.innerText = "创建子图层";
        createChildPlotLayer.style.margin = '1px 0';
        createChildPlotLayer.style.padding = '0 5px';
        createChildPlotLayer.style.cursor = 'pointer';
        createChildPlotLayer.style.backgroundColor = '#cad4e6';
        createChildPlotLayer.style.listStyle = 'none outside none';
        createChildPlotLayer.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "PlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                var plottingLayerName = "子图层";
                var plottingLayerCaption = plottingLayerName;
                var childPlotLayer = L.supermap.plotting.childPlotLayer(plottingLayerName,plottingLayerCaption);
                plottingLayers[currentSelectedNode.tag].addChildPlotLayer(childPlotLayer);
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(createChildPlotLayer);

        var setMinVisibleScale = document.createElement("li");
        setMinVisibleScale.id="setMinVisibleScale";
        setMinVisibleScale.innerText = "设置当前地图比例尺为最小可见比例尺";
        setMinVisibleScale.style.margin = '1px 0';
        setMinVisibleScale.style.padding = '0 5px';
        setMinVisibleScale.style.cursor = 'pointer';
        setMinVisibleScale.style.backgroundColor = '#cad4e6';
        setMinVisibleScale.style.listStyle = 'none outside none';
        setMinVisibleScale.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "PlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                plottingLayers[currentSelectedNode.tag].setMinVisibleScale(L.supermap.plotting.getControl().getPlotMapManager().getLayerScale());
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(setMinVisibleScale);

        var setMaxVisibleScale = document.createElement("li");
        setMaxVisibleScale.id="setMaxVisibleScale";
        setMaxVisibleScale.innerText = "设置当前地图比例尺为最大可见比例尺";
        setMaxVisibleScale.style.margin = '1px 0';
        setMaxVisibleScale.style.padding = '0 5px';
        setMaxVisibleScale.style.cursor = 'pointer';
        setMaxVisibleScale.style.backgroundColor = '#cad4e6';
        setMaxVisibleScale.style.listStyle = 'none outside none';
        setMaxVisibleScale.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "PlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                plottingLayers[currentSelectedNode.tag].setMaxVisibleScale(L.supermap.plotting.getControl().getPlotMapManager().getLayerScale());
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(setMaxVisibleScale);

        var clearVisibleScale = document.createElement("li");
        clearVisibleScale.id="clearVisibleScale";
        clearVisibleScale.innerText = "清除可见比例尺设置";
        clearVisibleScale.style.margin = '1px 0';
        clearVisibleScale.style.padding = '0 5px';
        clearVisibleScale.style.cursor = 'pointer';
        clearVisibleScale.style.backgroundColor = '#cad4e6';
        clearVisibleScale.style.listStyle = 'none outside none';
        clearVisibleScale.onclick = function () {
            if(currentSelectedNode != null && currentSelectedNode.type === "PlottingLayer"){
                var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
                plottingLayers[currentSelectedNode.tag].setMinVisibleScale(0);
                plottingLayers[currentSelectedNode.tag].setMaxVisibleScale(0);
            }

            hideRightMenu();
        }
        rMenuUl.appendChild(clearVisibleScale);

        rMenu.appendChild(rMenuUl);

        plotMapPanel.appendChild(rMenu);
    }

    function initPlotMapTree() {
        hideRightMenu();

        function beforeClickTreeNode(treeId, treeNode){
            var tree = $.fn.zTree.getZTreeObj(treeId);
            if (treeNode.isParent) {
                tree.expandNode(treeNode);
                // if (treeNode.pId===1) {
                // //me.clickSmlFileName = treeNode.name;
                // if(clickTreeNode && typeof(clickTreeNode) === "function"){
                //     clickTreeNode(treeNode.name)
                // }
                // //me.events.triggerEvent("clickTreeNode");
                // }
                return false;
            }
        }

        function zTreeOnCheck() {
            refreshLayers();
        }

        function zTreeOnRightClick(event, treeId, treeNode) {
            currentSelectedNode = treeNode;
            if (treeNode && treeNode.type === "PlottingLayer") {
                showRightMenu("PlottingLayer", event.clientX, event.clientY);
            } else if(treeNode && treeNode.type === "ChildPlottingLayer"){
                showRightMenu("ChildPlottingLayer", event.clientX, event.clientY);
            }
        }

        var setting = {
            check:{
                enable: true
                // chkboxType:{"Y":"","N":""}
            },
            view: {
                dblClickExpand: true,
                showLine: true,
                selectedMulti: true,
                showIcon:true
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: 0
                }
            },
            callback: {
                beforeClick: beforeClickTreeNode,
                onCheck:zTreeOnCheck,
                onRightClick: zTreeOnRightClick
            }
        };

        var symbolTreeData = analysisPlotMap();
        $.fn.zTree.init($("#tree"), setting, symbolTreeData);
    }

    function refreshLayers() {
        hideRightMenu();

        var layers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
        var zTree = $.fn.zTree.getZTreeObj("tree");
        var changeNodes = zTree.getChangeCheckedNodes();
		if(changeNodes.length > 0){
			var treeNode = changeNodes[0];
			var tag = treeNode.tag;
			if(treeNode.type === "PlottingLayer"){
			    layers[tag].setVisibility(treeNode.checked);
			    treeNode.checkedOld = treeNode.checked;
			} else if(treeNode.type === "ChildPlottingLayer"){
			    tag = treeNode.getParentNode().tag;
			    var childPlottingLayers = layers[tag].getChildPlotLayers();
			    childPlottingLayers[treeNode.tag].setVisibility(treeNode.checked);
			    treeNode.checkedOld = treeNode.checked;
			} else if(treeNode.type === "Feature"){
			    for (var n = 0;n<layers.length;n++){
			        if(layers[n].getFeatureByUuid(treeNode.tag) !== -1 && treeNode.checked === false){
			            var feature1 = layers[n].getFeatureByUuid(treeNode.tag);
			            if(feature1 !== null){
			                feature1.setStyle({display: "none"});
			                treeNode.checkedOld = false;
			            }
			        } else if(layers[n].getFeatureByUuid(treeNode.tag) !== -1 && treeNode.checked === true){
			            var feature2 = layers[n].getFeatureByUuid(treeNode.tag);
			            if(feature2 !== null){
			                feature2.setStyle({display: "display"});
			                treeNode.checkedOld = true;
			            }
			        }
			    }
			}
		}
    }

    function showRightMenu(type, x, y){
        $("#rMenu ul").show();
        if (type === "root") {
            $("#createPlottingLayer").show();
            $("#activeChildPlotLayer").hide();
            $("#activePlottingLayer").hide();
            $("#fixSymScale").hide();
            $("#createChildPlotLayer").hide();
            $("#setMinVisibleScale").hide();
            $("#setMaxVisibleScale").hide();
            $("#clearVisibleScale").hide();
        } else if(type === "PlottingLayer"){
            $("#createPlottingLayer").hide();
            $("#activeChildPlotLayer").hide();
            $("#activePlottingLayer").show();
            $("#fixSymScale").show();
            $("#createChildPlotLayer").show();
            $("#setMinVisibleScale").show();
            $("#setMaxVisibleScale").show();
            $("#clearVisibleScale").show();
        } else if(type === "ChildPlottingLayer"){
            $("#createPlottingLayer").hide();
            $("#activePlottingLayer").hide();
            $("#fixSymScale").hide();
            $("#createChildPlotLayer").hide();
            $("#setMinVisibleScale").hide();
            $("#setMaxVisibleScale").hide();
            $("#clearVisibleScale").hide();
            $("#activeChildPlotLayer").show();
        }

        y += document.body.scrollTop;
        x += document.body.scrollLeft;
        $("#rMenu").css({"top":y+"px", "left":x+"px", "visibility":"visible"});

        $("body").bind("mousedown", onBodyMouseDown);
    }

    function hideRightMenu(){
        currentSelectedNode = null;
        if ($("#rMenu")) $("#rMenu").css({"visibility": "hidden"});
        $("body").unbind("mousedown", onBodyMouseDown);
    }

    function onBodyMouseDown(event){
        if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
            currentSelectedNode = null;
            $("#rMenu").css({"visibility" : "hidden"});
        }
    }

    function featureAdded(event) {
        initPlotMapTree();
    }

    function analysisPlotMap(){
        var treeData = [];
        var rootid = 10000;
        var childid = 5000;
        var grandid = 0;

        var plottingLayers = L.supermap.plotting.getControl().getPlotMapManager().getPlottingLayers();
        for(var n = 0; n < plottingLayers.length; n++){
            var plottingLayer = plottingLayers[n];

            var cellRootNode = new Object();
            cellRootNode.id = rootid-n;
            cellRootNode.pId = 0;
            cellRootNode.name = plottingLayer.caption;
            cellRootNode.fullName = plottingLayer.name +"/";
            cellRootNode.checked = plottingLayer.getVisibility();
            cellRootNode.tag = n;
            cellRootNode.type = "PlottingLayer";
            // if(plottingLayer.equals(L.supermap.plotting.getControl().getPlotMapManager().getActivePlottingLayer())){
            //     cellRootNode.style.fontStyle = "Bold";
            // }

            treeData.push(cellRootNode);

            var cellId = cellRootNode.id + 1;
            var nid = cellId+1;
            if(plottingLayer.getChildPlotLayers() == null){
                continue;
            }
            for(var i = 0; i < plottingLayer.getChildPlotLayers().length; i++){
                var childPlottingLayer = plottingLayer.getChildPlotLayers()[i];

                var rootNode = new Object();
                rootNode.id = childid--;
                rootNode.pId = cellRootNode.id;
                rootNode.name = childPlottingLayer.caption;
                rootNode.checked = childPlottingLayer.getVisibility();
                rootNode.tag = i;
                rootNode.type = "ChildPlottingLayer";
                // if(childPlottingLayer.equals(L.supermap.plotting.getControl().getPlotMapManager().getActiveChildPlotLayer())){
                //     rootNode.style.fontStyle = "Bold";
                // }
                treeData.push(rootNode);

                cellId = rootNode.id + 1;
                // var key = ["SMLAuthor","SMLDepat","SMLDesc","SMLName","SMLSeclevel","SMLTime"];
                // var value = [result.SMLAuthor,result.SMLDepat,result.SMLDesc,result.SMLName,result.SMLSeclevel,result.SMLTime];
                if(childPlottingLayer.getFeatures() === undefined || childPlottingLayer.getFeatures() == null){
                    continue;
                }
                for(var j = 0; j < childPlottingLayer.getFeatures().length; j++){
                    var feature = childPlottingLayer.getFeatures()[j];
                    var chrootNode = new Object();
                    chrootNode.id = grandid+1;
                    chrootNode.pId = rootNode.id;
                    chrootNode.name = feature.symbolName;
                    chrootNode.checked = !(feature.style.display !=null && feature.style.display === "none");
                    chrootNode.tag = feature.uuid;
                    chrootNode.type = "Feature";
                    treeData.push(chrootNode);
                }
            }
        }

        return treeData;
    }
};