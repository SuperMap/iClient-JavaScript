/**
 * Class: SuperMap.Geometry.Route
 * 航线对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GroupObject>
 */
SuperMap.Geometry.Route = new SuperMap.Class(SuperMap.Geometry.GroupObject,{

    /**
     * APIProperty: routeNodes
     * {Array(<SuperMap.Plot.RouteNode>)} 航线点类型
     */
    routeNodes: null,

    /**
     * APIProperty: nextRouteNodeType
     * {Array(<SuperMap.Plot.RouteNodeType>)} 下一个航线点类型
     */
    nextRouteNodeType: null,

    /**
     * APIProperty: arrRoutePts
     * {Array(Array(<SuperMap.Geometry.Point>))} 航线路径点数组
     */
    arrRoutePts: null,

    /**
     * Constructor: SuperMap.Geometry.Route
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.Route>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.PlottingGeometry.prototype.initialize.apply(this, arguments);

        this.minEditPts = 2;
        this.maxEditPts = 9999;

        if(this.routeNodes === null){
            this.routeNodes = [];
        }

        if(this.scaleByMap === null){
            this.scaleByMap = true;
        }

        if(null === this.arrRoutePts){
            this.arrRoutePts = [];
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.routeNodes = null;
        this.arrRoutePts = null;
        SuperMap.Geometry.PlottingGeometry.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: setStrokeColor
     * 设置组合标号的线色
     *
     * Parameters:
     * strokeColor - {String} 组合标号的线色。
     */
    setStrokeColor:function(strokeColor){
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            feature.style.strokeColor = strokeColor;
        }

        this.feature.style.strokeColor = strokeColor;
    },

    /**
     * APIMethod: getStrokeColor
     * 获取组合标号的线色
     *
     * Returns:
     * {String} 返回组合标号的线色。
     */
    getStrokeColor:function(){
        return this.feature.style.strokeColor;
    },

    /**
     * APIMethod: setStrokeWidth
     * 设置组合标号的线宽
     *
     * Parameters:
     * strokeWidth - {Float} 组合标号的线宽。
     */
    setStrokeWidth:function(strokeWidth){
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            feature.style.strokeWidth = strokeWidth;
        }

        this.feature.style.strokeWidth = strokeWidth;
    },

    /**
     * APIMethod: getStrokeWidth
     * 获取组合标号的线宽
     *
     * Returns:
     * {Float} 返回组合标号的线宽。
     */
    getStrokeWidth:function(){
        return this.feature.style.strokeWidth;
    },

    /**
     * APIMethod: deleteRouteNode
     * 删除航线节点。
     *
     * Parameters:
     * routeNode - {<SuperMap.Plot.RouteNode>} 航线点
     */
    deleteRouteNode: function (routeNode) {
        for(var i = 0; i < this.routeNodes.length; i++){
            for(var j = 0; j < this.routeNodes[i].towardNodes.length; j++){
                if(this.routeNodes[i].towardNodes[j].routeNodeId === routeNode.id){
                    this.routeNodes[i].towardNodes.splice(j, 1);
                    this.routeNodes[i].towardNodes = this.routeNodes[i].towardNodes.concat(routeNode.towardNodes);
                    continue;
                }
            }
        }

        for(var k = 0; k < this.routeNodes.length; k++){
            if(this.routeNodes[k].id === routeNode.id){
                this.routeNodes.splice(k, 1);
            }
        }

        for(var m = 0; m < this.controlPoints.length; m++){
            if(this.controlPoints[m].routeNodeId === routeNode.id){
                this.controlPoints.splice(m, 1);
            }
        }

        this.calculateParts();
        this.layer.drawFeature(this.feature);
    },

    /**
     * APIMethod: updateRouteNode
     * 更新航线节点。
     *
     * Parameters:
     * routeNode - {<SuperMap.Plot.RouteNode>} 航线点
     */
    updateRouteNode: function (routeNode) {
        var nodeFeature = this.getNodeFeature(routeNode);
        if(nodeFeature !== null){
            nodeFeature.geometry.routeNode = routeNode;

            nodeFeature.geometry.calculateParts();
            this.layer.drawFeature(nodeFeature);

            var startFeature = this.getFeatureStartWith(nodeFeature.geometry.routeNode);
            for(var i = 0; i < startFeature.length; i++){
                startFeature[i].geometry.controlPoints[0] = new SuperMap.Geometry.Point(nodeFeature.geometry.routeNode.positionPoint.x, nodeFeature.geometry.routeNode.positionPoint.y);
                startFeature[i].geometry.calculateParts();
                this.layer.drawFeature(startFeature[i]);
            }

            var endFeature = this.getFeatureEndWith(nodeFeature.geometry.routeNode);
            for(var j = 0; j < endFeature.length; j++){
                endFeature[j].geometry.controlPoints[1] = new SuperMap.Geometry.Point(nodeFeature.geometry.routeNode.positionPoint.x, nodeFeature.geometry.routeNode.positionPoint.y);
                endFeature[j].geometry.calculateParts();
                this.layer.drawFeature(endFeature[j]);
            }

            return;
        }

        var existNode = this.getNodeByUuid(routeNode.id);
        if(existNode !== null){
            existNode = routeNode;
        } else {
            this.routeNodes.push(routeNode);
            var controlPt = new SuperMap.Geometry.Point(routeNode.positionPoint.x, routeNode.positionPoint.y);
            controlPt.routeNodeId = routeNode.id;
            this.controlPoints.push(controlPt);
        }

        this.calculateParts();
        this.layer.drawFeature(this.feature);
    },

    /**
     * APIMethod: insertRouteNode
     * 插入航线节点。
     *
     * Parameters:
     * routeNode - {<SuperMap.Plot.RouteNode>} 航线点
     * startNode - {<SuperMap.Plot.RouteNode>} 插入的起始航线点
     * endNode - {<SuperMap.Plot.RouteNode>} 插入的结束航线点
     * removeOldRel - {Boolean} 是否移除原来的起始点与结束点间的连接关系
     * startText - {Array(String)} 起始航线点与该航线点间文字
     * startRel - {<SuperMap.Plot.RelLineText>} 起始航线点与该航线点间文字与线的关系
     * endText - {Array(String)} 结束航线点与该航线点间文字
     * endRel - {<SuperMap.Plot.RelLineText>} 结束航线点与该航线点间文字与线的关系
     */
    insertRouteNode: function (routeNode, startNode, endNode, removeOldRel, startText, startRel, endText, endRel) {
        if(removeOldRel === undefined){
            removeOldRel = true;
        }

        if(removeOldRel && endNode){
            for(var j = 0; j < startNode.towardNodes.length; j++){
                if(startNode.towardNodes[j].routeNodeId === endNode.id){
                    startNode.towardNodes.splice(j, 1);
                }
            }
        }

        var existNode = this.getNodeByUuid(routeNode.id);
        if(existNode === null){
            this.routeNodes.push(routeNode);
            var controlPt = new SuperMap.Geometry.Point(routeNode.positionPoint.x, routeNode.positionPoint.y);
            controlPt.routeNodeId = routeNode.id;
            this.controlPoints.push(controlPt);
        }

        if(startNode){
            var isAddStartNode = false;
            for(var i = 0; i < startNode.towardNodes.length; i++){
                if(startNode.towardNodes[i].routeNodeId === routeNode.id){
                    isAddStartNode = true;
                }
            }
            if(isAddStartNode === false){
                var towardNode = new SuperMap.Plot.TowardNode();
                towardNode.routeNodeId = routeNode.id;
                if(startText !== undefined){
                    towardNode.textContent = startText;
                }
                if(startRel !== undefined){
                    towardNode.relLineText = startRel;
                }

                startNode.towardNodes.push(towardNode);
            }
        }

        if(endNode){
            var isAddEndNode = false;
            for(var i = 0; i < routeNode.towardNodes.length; i++){
                if(routeNode.towardNodes[i].routeNodeId === endNode.id){
                    isAddEndNode = true;
                }
            }
            if(isAddEndNode === false){
                var towardNode = new SuperMap.Plot.TowardNode();
                towardNode.routeNodeId = endNode.id;
                if(endText !== undefined){
                    towardNode.textContent = endText;
                }
                if(endRel !== undefined){
                    towardNode.relLineText = endRel;
                }
                routeNode.towardNodes.push(towardNode);
            }
        }

        this.calculateParts();
        this.layer.drawFeature(this.feature);
    },

    /**
     * APIMethod: addRouteNode
     * 添加航线节点。
     *
     * Parameters:
     * routeNode - {<SuperMap.Plot.RouteNode>} 航线点
     * startNode - {<SuperMap.Plot.RouteNode>} 该节点的起始节点
     * startText - {Array(String)} 该节点与上一节点间的文字
     * startRel - {<SuperMap.Plot.RelLineText>} 该节点与上一节点间文字与线的关系
     */
    addRouteNode: function (routeNode, startNode, startText, startRel) {
        var existNode = this.getNodeByUuid(routeNode.id);
        if(existNode === null){
            this.routeNodes.push(routeNode);
            var controlPt = new SuperMap.Geometry.Point(routeNode.positionPoint.x, routeNode.positionPoint.y);
            controlPt.routeNodeId = routeNode.id;
            this.controlPoints.push(controlPt);
        }

        if(startNode){
            var isAddStartNode = false;
            for(var i = 0; i < startNode.towardNodes.length; i++){
                if(startNode.towardNodes[i].routeNodeId === routeNode.id){
                    isAddStartNode = true;
                }
            }
            if(isAddStartNode === false){
                var towardNode = new SuperMap.Plot.TowardNode();
                towardNode.routeNodeId = routeNode.id;
                if(startText !== undefined){
                    towardNode.textContent = startText;
                }
                if(startRel !== undefined){
                    towardNode.relLineText = startRel;
                }

                startNode.towardNodes.push(towardNode);
            }
        }

        this.calculateParts();
        this.layer.drawFeature(this.feature);
    },

    /**
     * APIMethod: setNextRouteNodeType
     * 设置下一个航线节点类型。
     *
     * Parameters:
     * routeNodeType - {<SuperMap.Plot.RouteNodeType>} 下一个航线点类型
     */
    setNextRouteNodeType: function (routeNodeType) {
        this.nextRouteNodeType = routeNodeType;
    },

    /**
     * APIMethod: getNodeFeature
     * 获取航线节点
     */
    getNodeFeature: function (routeNode) {
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i].routeNode === routeNode.id){
                return this.components[i];
            }
        }

        return null;
    },

    /**
     * Method: getFeatureStartWith
     * 获取以改航线节点为起点的航线段
     */
    getFeatureStartWith: function (routeNode) {
        var startFeature = [];
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i].startRouteNode !== undefined && this.components[i].startRouteNode === routeNode.id){
                startFeature.push(this.components[i]);
            }
        }

        return startFeature;
    },

    /**
     * Method: getFeatureEndWith
     * 获取以改航线节点为结束点的航线段
     */
    getFeatureEndWith: function (routeNode) {
        var endFeature = [];
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i].endRouteNode !== undefined && this.components[i].endRouteNode === routeNode.id){
                endFeature.push(this.components[i]);
            }
        }

        return endFeature;
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    initRoute: function () {
        for(var i = 0; i < this.components.length; i++){
            this.components[i].geometry.init();
        }
        //清空原有的所有点
        this.components = [];

        //编程标绘
        if( this.controlPoints.length === 0 && this.routeNodes.length >= this.minEditPts) {
            for(var i = 0; i < this.routeNodes.length; i++){
                this.routeNodes[i].positionPoint.routeNodeId = this.routeNodes[i].id;
                this.controlPoints.push(this.routeNodes[i].positionPoint);
            }
        } else if(this.controlPoints.length > this.routeNodes.length) {
            for(var i = this.routeNodes.length; i < this.controlPoints.length; i++){
                if(this.controlPoints[i].isTrackingPoint !== true){
                    if(this.arrRoutePts.length === 0){
                        var routePts = [];
                        this.arrRoutePts.push(routePts);
                    }
                    this.arrRoutePts[0].push(this.controlPoints[i]);

                    var routeNode = new SuperMap.Plot.RouteNode();
                    routeNode.positionPoint = this.controlPoints[i];
                    this.controlPoints[i].routeNodeId = routeNode.id;
                    if(this.nextRouteNodeType === null){
                        if(i === 0){
                            routeNode.type = SuperMap.Plot.RouteNodeType.AIMING;
                        } else {
                            routeNode.type = SuperMap.Plot.RouteNodeType.TURNING;
                        }
                    } else {
                        routeNode.type = this.nextRouteNodeType;
                    }

                    routeNode.index = i+1;

                    if(this.routeNodes.length > 0){
                        var towardNode = new SuperMap.Plot.TowardNode();
                        towardNode.routeNodeId = routeNode.id;
                        this.routeNodes[this.routeNodes.length-1].towardNodes.push(towardNode);
                    }

                    this.routeNodes.push(routeNode);
                }
            }
        }
    },

    /**
     * Method: calculateTracking
     * 绘制跟踪线
     */
    calculateTracking: function () {
        if(this.controlPoints.length === 0 || this.routeNodes.length === 0){
            return;
        }

        if(this.controlPoints[this.controlPoints.length-1].isTrackingPoint === true){
            //创建连线
            var linePts = [];
            linePts.push(this.routeNodes[this.routeNodes.length-1].positionPoint);
            linePts.push(this.controlPoints[this.controlPoints.length-1]);
            var lineFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, {layer: this.layer});
            this.components.push(lineFeature);

            var routeNode = new SuperMap.Plot.RouteNode();
            routeNode.positionPoint = this.controlPoints[this.controlPoints.length-1];
            this.controlPoints[this.controlPoints.length-1].routeNodeId = routeNode.id;
            routeNode.type = SuperMap.Plot.RouteNodeType.TURNING;
            routeNode.index = this.controlPoints.length;

            if(this.routeNodes.length > 0){
                var towardNode = new SuperMap.Plot.TowardNode();
                towardNode.routeNodeId = routeNode.id;
                this.routeNodes[this.routeNodes.length-1].towardNodes.push(towardNode);
            }

            //this.routeNodes.push(routeNode);

            var pointFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.ROUTENODE, [this.controlPoints[this.controlPoints.length-1]], {layer: this.layer, routeNode: routeNode});
            pointFeature.style = SuperMap.Util.copyAttributes(pointFeature.style, {});
            pointFeature.layer = this.layer;
            this.components.push(pointFeature);
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.initRoute();

        if(undefined !== this.arrRoutePts && null !== this.arrRoutePts){
            for(var i = 0; i < this.arrRoutePts.length; i++){
                //创建连线
                var linePts = this.arrRoutePts[i];
                if(linePts.length < 2){
                    continue;
                }
                var lineFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, {layer: this.layer});
                this.components.push(lineFeature);
            }
        }

        for(var i = 0; i < this.routeNodes.length; i++){
            var routeNode = this.routeNodes[i];
            if(null === routeNode){
                continue;
            }

            if(!routeNode.towardNodes || null === routeNode.towardNodes){
                continue;
            }

            for(var j = 0; j < routeNode.towardNodes.length; j++){
                var toNode = this.getNodeByUuid(routeNode.towardNodes[j].routeNodeId);//routeNode.towardNodes[j].routeNode;
                if(null === toNode){
                    continue;
                }

                //创建连线
                var linePts = [];
                linePts.push(routeNode.positionPoint);
                linePts.push(toNode.positionPoint);
                //var lineFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, {layer: this.layer});
                //lineFeature.startRouteNode = routeNode.id;
                //lineFeature.endRouteNode = toNode.id;
                //this.components.push(lineFeature);

                //创建沿线注记
                var textContent = routeNode.towardNodes[j].textContent;
                if(null === textContent){
                    continue;
                }

                var relLineText = routeNode.towardNodes[j].relLineText;
                if(undefined === relLineText || null === relLineText){
                    relLineText = SuperMap.Plot.RelLineText.ONLEFTLINE;
                }

                var textFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.PATHTEXT, linePts, {layer: this.layer, relLineText: relLineText, showPathLine: false, textContent: textContent});
                textFeature.startRouteNode = routeNode.id;
                textFeature.endRouteNode = toNode.id;
                textFeature.layer = this.layer;
                this.components.push(textFeature);
            }

            //创建节点
            this.createRouteNode(routeNode);
        }

        if(this.feature !== null){
            for(var i = 0; i < this.components.length; i++){
                this.components[i].style = SuperMap.Util.copyAttributes(this.components[i].style, this.feature.style);
            }
        }
        //var lineFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.POLYLINESYMBOL, this.controlPoints, {layer: this.layer});
        //lineFeature.startRouteNode = routeNode.id;
        //lineFeature.endRouteNode = toNode.id;
        //this.components.push(lineFeature);

        //this.calculateTracking();
    },

    /**
     * Method: createRouteNode
     * 创建节点
     *
     * Parameters:
     * routeNode - {<SuperMap.Plot.RouteNode>} 节点对象。
     */
    createRouteNode: function(routeNode){
        if(null === routeNode){
            return;
        }

        var pointFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.ROUTENODE, [routeNode.positionPoint], {layer: this.layer, routeNode: routeNode, route: this});
        pointFeature.style = SuperMap.Util.copyAttributes(pointFeature.style, routeNode.style);
        pointFeature.routeNode = routeNode.id;
        pointFeature.layer = this.layer;
        this.components.push(pointFeature);
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.Route>} 克隆的几何对象集合。
     */
    clone: function () {
        //var geometry = SuperMap.Geometry.GroupObject.prototype.clone.apply(this, arguments);

        var options = {libID: this.libID, code: this.code, layer: this.layer};
        var geometry = eval("new " + this.CLASS_NAME + "(options)");

        geometry.subAssociatedUuids = this.subAssociatedUuids;

        geometry.controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geometry.arrRoutePts = [];
        for(var i = 0; i < this.arrRoutePts.length; i++){
            geometry.arrRoutePts.push(SuperMap.Plot.PlottingUtil.clonePoints(this.arrRoutePts[i]));
        }

        for(var i = 0; i < this.routeNodes.length; i++){
            geometry.routeNodes.push(this.routeNodes[i].clone());
        }

        return geometry;
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.routeNodes = this.symbolData.routeNodes;

            for(var i = 0; i < this.routeNodes.length; i++){
                if(!(this.routeNodes[i].positionPoint instanceof SuperMap.Geometry.Point)){
                    this.routeNodes[i].positionPoint = new SuperMap.Geometry.Point(this.routeNodes[i].positionPoint.x, this.routeNodes[i].positionPoint.y);
                }
            }

            this.arrRoutePts = [];
            for(var i = 0; i < this.symbolData.arrRoutePts.length; i++){
                var routePts = [];
                for(var j = 0; j < this.symbolData.arrRoutePts[i].length; j++){
                    routePts.push(new SuperMap.Geometry.Point(this.symbolData.arrRoutePts[i][j].x, this.symbolData.arrRoutePts[i][j].y));
                }
                this.arrRoutePts.push(routePts);
            }
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.routeNodes = this.routeNodes;
            this.symbolData.arrRoutePts = this.arrRoutePts;
        }

    },

    /**
     * Method: getNodeByUuid
     * 根据uuid或者RouteNode。
     *
     * Returns:
     * {<SuperMap.Plot.RouteNode>} 返回航线点。
     *
     */
    getNodeByUuid: function(id) {
        for(var i = 0; i < this.routeNodes.length; i++){
            if(this.routeNodes[i].id === id){
                return this.routeNodes[i];
            }
        }

        return null;
    },

    /**
     * Method: move
     * 沿着x、y轴的正方向上按照给定的位移移动几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     *
     * Parameters:
     * x - {Float} x轴正方向上移动的距离。
     * y - {Float} y轴正方向上移动的距离。
     */
    move: function(x, y) {
        //SuperMap.Geometry.GroupObject.prototype.move.apply(this, arguments);
        //
        //for(var i = 0; i < this.routeNodes.length; i++){
        //    this.routeNodes[i].positionPoint.move(x, y);
        //}

        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i].geometry instanceof SuperMap.Geometry.GeoRouteNode){
                this.components[i].geometry.move(x, y);
            }
        }
    },

    /**
     * Method: resizeControlPoints
     * 根据拖动的手柄位置，改变编辑点坐标
     */
    resizeControlPoints: function(pixel, nHandle, oldBounds, controlPoints) {
        SuperMap.Geometry.GroupObject.prototype.resizeControlPoints.apply(this, arguments);

        for(var i = 0, len = this.routeNodes.length; i < len; i++) {
            this.routeNodes[i].positionPoint.x = this.controlPoints[i].x;
            this.routeNodes[i].positionPoint.y = this.controlPoints[i].y;
        }
    },

    /**
     * Method: rotate
     * 围绕中心点旋转组合对象。
     *
     * Parameters:
     * rotateValue - {Float} 旋转角的度数。
     */
    rotate: function(rotateValue, anchorPoint) {
        SuperMap.Geometry.GroupObject.prototype.rotate.apply(this, arguments);

        for(var j = 0; j < this.controlPoints.length; j++){
            this.controlPoints[j].rotate(rotateValue, anchorPoint);
        }

        for(var i = 0, len = this.routeNodes.length; i < len; i++) {
            this.routeNodes[i].positionPoint.x = this.controlPoints[i].x;
            this.routeNodes[i].positionPoint.y = this.controlPoints[i].y;
        }

        this.dRotate += rotateValue;
    },

    /**
     * Method: reView
     * 随图缩放时，沿线文字重新计算
     *
     */
    reView: function () {
        for(var i = 0; i < this.components.length; i++){
            this.components[i].geometry.scaleByMap = this.scaleByMap;
            this.components[i].geometry.dRotate = this.dRotate;
            this.components[i].geometry.reView();
        }
    },

    CLASS_NAME:"SuperMap.Geometry.Route"
});