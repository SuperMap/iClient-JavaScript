/**
 * Class: SuperMap.Geometry.GeoRouteNode
 * 航线对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.GeoRouteNode = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * Property: route
     * {Integer} 航线节点所在的航线
     */
    route: null,

    /**
     * Property: routeNode
     * {Integer} 航线节点
     */
    routeNode: null,

    /**
     * APIMethod: setType
     * 修改航线点类型
     *
     * Parameters:
     * routeNodeType - {<SuperMap.Plot.RouteNodeType>} 航线点类型
     */
    setType: function (routeNodeType) {
        this.routeNode.type = routeNodeType;
        this.calculateParts();

        this.layer.drawFeature(this.feature);
    },

    /**
     * APIMethod: setIndex
     * 修改航线点的索引值
     *
     * Parameters:
     * index - {Integer} 航线点索引
     */
    setIndex: function (index) {
        this.routeNode.index = index;
        this.calculateParts();

        this.layer.drawFeature(this.feature);
    },

    /**
     * APIMethod: setPosition
     * 修改航线点位置
     *
     * Parameters:
     * routeNodePos - {<SuperMap.Geometry.Point>} 航线点位置
     */
    setPosition: function (routeNodePos) {
        this.controlPoints[0].x = routeNodePos.x;
        this.controlPoints[0].y = routeNodePos.y;
        this.routeNode.positionPoint.x = routeNodePos.x;
        this.routeNode.positionPoint.y = routeNodePos.y;
        for(var k = 0; k < this.controlPoints.length; k++){
            if(this.controlPoints[k].routeNodeId === this.routeNode.id){
                this.controlPoints[k].x = routeNodePos.x;
                this.controlPoints[k].y = routeNodePos.y;
            }
        }
        this.calculateParts();
        this.layer.drawFeature(this.feature);

        var startFeature = this.route.getFeatureStartWith(this.routeNode);
        for(var i = 0; i < startFeature.length; i++){
            startFeature[i].geometry.controlPoints[0] = new SuperMap.Geometry.Point(routeNodePos.x, routeNodePos.y);
            startFeature[i].geometry.calculateParts();
            this.layer.drawFeature(startFeature[i]);
        }

        var endFeature = this.route.getFeatureEndWith(this.routeNode);
        for(var j = 0; j < endFeature.length; j++){
            endFeature[j].geometry.controlPoints[1] = new SuperMap.Geometry.Point(routeNodePos.x, routeNodePos.y);
            endFeature[j].geometry.calculateParts();
            this.layer.drawFeature(endFeature[j]);
        }
    },

    /**
     * APIMethod: setRotate
     * 修改待机点包围圆的旋转角度
     *
     * Parameters:
     * rotateValue - {Float} 待机点点旋转角度
     */
    setRotate: function (rotateValue) {
        this.routeNode.rotate = rotateValue;
        this.calculateParts();

        this.layer.drawFeature(this.feature);
    },

    /**
     * Constructor: SuperMap.Plot.GeoRouteNode
     * 创建一个航线节点。
     *
     * Parameters:
     * options - {Object}
     *
     * Returns:
     * {<SuperMap.Plot.GeoRouteNode>} 新的航线节点。
     */
    initialize:function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.anchorPoint = new SuperMap.Geometry.Point(0, 0);
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.route = null;
        this.routeNode = null;

        SuperMap.Geometry.GroupObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length === 0){
            this.controlPoints = [new SuperMap.Geometry.Point(this.routeNode.positionPoint.x, this.routeNode.positionPoint.y)];
        }

        if( this.controlPoints.length >= this.minEditPts) {
            if(this.routeNode.type === SuperMap.Plot.RouteNodeType.STANDBY){

                var outerSymbolCells = SuperMap.Geometry.RouteNodePrimitives.getRouteNodeCells(this.routeNode.type, false,this.routeNode.rotate);
                this.transformSymbolCellsToGeometrys(outerSymbolCells);
                var innerSymbolCells = SuperMap.Geometry.RouteNodePrimitives.getRouteNodeCells(this.routeNode.type, true);
                this.transformSymbolCellsToGeometrys(innerSymbolCells);
            } else {
                var symbolCells = SuperMap.Geometry.RouteNodePrimitives.getRouteNodeCells(this.routeNode.type);
                this.transformSymbolCellsToGeometrys(symbolCells);
            }

            this.clearBounds();

            if(this.routeNode.index !== null){
                var bounds = this.getBounds();
                var indexPos = new SuperMap.Geometry.Point(bounds.right, bounds.top);
                var geometryText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.TEXTSYMBOL, [indexPos], this.routeNode.index.toString());
                geometryText.style = {surroundLineFlag: false, fontSize: 12};
                geometryText.style.labelAlign = "cb";

                this.components.push(geometryText);
            }
        }
    },

    /**
     * Method: transformSymbolCellsToCompontGeometrys
     * 将图元从数据层面转换成几何对象层面
     *
     * Parameters:
     * feature - {Array(Object)}需要绘制的要素
     */
    transformSymbolCellsToGeometrys: function(symbolCells){

        var locationPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x,this.controlPoints[0].y));

        for(var i = 0; i < symbolCells.length; i++){
            var symbolCell = symbolCells[i];

            if (symbolCell.type === SuperMap.Plot.SymbolType.TEXTSYMBOL) {
                symbolCell.style.fontSize = this.dScale * symbolCell.style.fontSize;
                symbolCell.style.labelRotation += -this.dRotate;
            }

            for (var j = 0; j < symbolCell.positionPoints.length; j++) {
                symbolCell.positionPoints[j].x = symbolCell.positionPoints[j].x * this.dScale;
                symbolCell.positionPoints[j].y = symbolCell.positionPoints[j].y * this.dScale;

                symbolCell.positionPoints[j].rotate(this.dRotate, this.anchorPoint);

                symbolCell.positionPoints[j] = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, symbolCell.positionPoints[j], locationPixel);
            }

            //if(symbolCell.type === SuperMap.Plot.SymbolType.TEXTSYMBOL){
            //    symbolCell.style.fontSize = symbolCell.style.fontSize;
            //}
            //
            //for(var j = 0; j < symbolCell.positionPoints.length; j++){
            //    symbolCell.positionPoints[j] = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, symbolCell.positionPoints[j],locationPixel);
            //}

            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCell.type, symbolCell.positionPoints, symbolCell.textContent, this.dRotate);
            geometry.style = symbolCell.style;
            this.components.push(geometry);
        }
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
        SuperMap.Geometry.GeoGraphicObject.prototype.move.apply(this, arguments);

        this.routeNode.positionPoint.move(x, y);
        this.setPosition(this.routeNode.positionPoint);
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.Route>} 克隆的几何对象集合。
     */
    clone: function () {
        SuperMap.Geometry.GroupObject.prototype.clone.apply(this, arguments);

        //自己特有
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     */
    reView: function () {
        if(this.resolution !== this.layer.renderer.getResolution()){
            if (!this.scaleByMap || this.scaleByMap === false) {
                this.calculateParts();

            } else {
                this.dScale *= this.resolution / this.layer.renderer.getResolution();

                if(this.dScale > 5){
                    this.dScale = 5;
                } else if(this.dScale < 1){
                    this.dScale = 1;
                }

                this.calculateParts();
            }

            this.resolution = this.layer.renderer.getResolution();
        }
    },

    CLASS_NAME:"SuperMap.Geometry.GeoRouteNode"
});