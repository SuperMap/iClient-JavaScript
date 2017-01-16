/**
 * Class: SuperMap.Geometry.GeoLiterateSign
 * 标牌文字对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.GeoLiterateSign = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * Property: route
     * {<SuperMap.Geometry.Route>} 标牌文字所在的航线
     */
    route: null,

    /**
     * APIProperty: towardNode
     * {<SuperMap.Plot.TowardNode>} 指向节点，包含标牌文字信息
     */
    towardNode: null,

    /**
     * Property: textPosition
     * {<SuperMap.Plot.RouteNode>} 起始航站点
     */
    startRouteNode: null,

    /**
     * Property: textPosition
     * {<SuperMap.Geometry.Point>} 标牌文字位置
     */
    textAnchor: null,

    /**
     * APIProperty: space
     * {Integer} 标牌文字和航线的距离
     */
    space: null,

    /**
     * APIProperty: inner
     * {Boolean} 标牌文字在航线的内侧
     */
    inner: null,

    /**
     * APIProperty: style
     * {Integer} 文字样式
     */
    style: { fontSize: 12, fontSizeLimit: true, fontFamily: "Microsoft YaHei" },

    /**
     * APIMethod: destroy
     * 设置标牌文字的位置。
     */
    setPosition: function(textPosition){
        this.textPosition = textPosition;
        this.calculateOffset();
    },

    /**
     * Constructor: SuperMap.Plot.GeoLiterateSign
     * 创建一个标牌文字。
     *
     * Parameters:
     * options - {Object}
     *
     * Returns:
     * {<SuperMap.Plot.GeoLiterateSign>} 新的标牌文字。
     */
    initialize:function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.type = null;
        this.position = null;
        this.index = null;

        SuperMap.Geometry.GroupObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        if(this.startRouteNode === null){
            return;
        }

        if(this.towardNode === null){
            return;
        }

        if(this.towardNode.textContent === null || this.towardNode.textContent.length === 0){
            return;
        }

        this.init();

        var toNode = this.route.getNodeByUuid(this.towardNode.routeNodeId);
        var startPt = this.startRouteNode.positionPoint;
        var endPt = toNode.positionPoint;
        var textAnchor = new SuperMap.Geometry.Point((startPt.x+endPt.x)/2, (startPt.y+endPt.y)/2);

        var textLen = SuperMap.Plot.PlottingUtil.getTextCount(this.towardNode.textContent[0]);
        for(var i = 1; i < this.towardNode.textContent.length; i++){
            var tempLen = SuperMap.Plot.PlottingUtil.getTextCount(this.towardNode.textContent[i]);
            if(textLen < tempLen){
                textLen = tempLen;
            }
        }

        if(this.towardNode.offsetX === null || this.towardNode.offsetY === null){
            var space = this.space + (this.dScale*this.style.fontSize + 1)*textLen/2;
            var dir = SuperMap.Plot.PlottingUtil.innerOutlineDir(this.route.controlPoints);
            var dOffset = dir * space * this.layer.map.getResolution();
            if(this.inner === true){
                dOffset = -dOffset;
            }
            var pntResults = SuperMap.Plot.PlottingUtil.parallel([startPt, endPt], dOffset);

            this.controlPoints = [];
            var textPosition = new SuperMap.Geometry.Point((pntResults[0].x+pntResults[1].x)/2, (pntResults[0].y+pntResults[1].y)/2);
            this.controlPoints.push(textPosition);

            var textAnchorPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(textAnchor.x, textAnchor.y));
            var textPositionPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(textPosition.x, textPosition.y));

            this.towardNode.offsetX = textPositionPixel.x - textAnchorPixel.x;
            this.towardNode.offsetY = textPositionPixel.y - textAnchorPixel.y;
        } else {
            var anchorPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(textAnchor.x, textAnchor.y));
            var textPixel = new SuperMap.Pixel(anchorPixel.x+this.towardNode.offsetX, anchorPixel.y+this.towardNode.offsetY);
            var textLonLat = this.layer.map.getLonLatFromViewPortPx(textPixel);
            if(this.controlPoints.length === 0){
                this.controlPoints.push(new SuperMap.Geometry.Point(textLonLat.lon, textLonLat.lat));
            } else {
                this.controlPoints[0].x = textLonLat.lon;
                this.controlPoints[0].y = textLonLat.lat;
            }
        }

        var angle = SuperMap.Plot.PlottingUtil.radian(startPt, endPt)*180/Math.PI;

        var symbolCells = this.getTextContentsCells(textLen);

        for(var i = 0; i < symbolCells.length; i++){
            cell = symbolCells[i];
            var linePts = [];
            for(var j = 0; j < cell.positionPoints.length; j++){
                linePts.push(SuperMap.Plot.PlottingUtil.coordinateTrans(this.controlPoints[0],cell.positionPoints[j],angle));
            }

            if(cell.type === SuperMap.Plot.SymbolType.TEXTSYMBOL){
                if(cell.textContent.length !== 0){
                    var textGeo = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.TEXTSYMBOL, linePts, cell.textContent);

                    textGeo.style = {};
                    textGeo.style = cell.style;
                    textGeo.style.labelRotation = -angle+90;

                    this.components.push(textGeo);
                }
            }
            else{
                var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(cell.type, linePts);
                geometry.style = cell.style;
                this.components.push(geometry);
            }
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

        this.calculateOffset();
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     */
    reView: function () {
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
    },

    /**
     * Method: calculateOffset
     * 计算偏移
     */
    calculateOffset: function() {
        var toNode = this.route.getNodeByUuid(this.towardNode.routeNodeId);
        var startPt = this.startRouteNode.positionPoint;
        var endPt = toNode.positionPoint;
        var textAnchor = new SuperMap.Geometry.Point((startPt.x+endPt.x)/2, (startPt.y+endPt.y)/2);
        var textAnchorPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(textAnchor.x, textAnchor.y));
        var textPositionPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));
        this.towardNode.offsetX = textPositionPixel.x - textAnchorPixel.x;
        this.towardNode.offsetY = textPositionPixel.y - textAnchorPixel.y;
    },

    /**
     * Method: getTextContentsCells
     * 获取注记的所有图元。
     *
     */
    getTextContentsCells: function(textLen){
        var textContents = this.towardNode.textContent;
        var toNode = this.route.getNodeByUuid(this.towardNode.routeNodeId);

        var pixelStepWidth = this.dScale*this.style.fontSize + 1;
        var tempPt0 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
        var tempPt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(pixelStepWidth,0));
        var stepLonLat = SuperMap.Plot.PlottingUtil.distance({x:tempPt0.lon,y:tempPt0.lat},{x:tempPt1.lon,y:tempPt1.lat});

        var stepWidth = stepLonLat;
        var stepHeight = stepLonLat * textLen;

        var cout = textContents.length + 2;
        var symbolCells = [];
        var halfWidth = cout*stepWidth*0.5;

        //创建外部多边形
        var outPolygon = new Object;
        outPolygon.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        outPolygon.positionPoints = [];
        outPolygon.positionPoints.push(new SuperMap.Geometry.Point(halfWidth, 0));
        outPolygon.positionPoints.push(new SuperMap.Geometry.Point(-2*stepWidth+halfWidth,  0.5*stepHeight));
        outPolygon.positionPoints.push(new SuperMap.Geometry.Point(-cout*stepWidth+halfWidth,  0.5*stepHeight));
        outPolygon.positionPoints.push(new SuperMap.Geometry.Point(-cout*stepWidth+halfWidth, -0.5*stepHeight));
        outPolygon.positionPoints.push(new SuperMap.Geometry.Point(-2*stepWidth+halfWidth, -0.5*stepHeight));
        outPolygon.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(outPolygon);

        //创建竖线
        for(var i = 1; i <= textContents.length; i++){
            var polyline = new Object;
            polyline.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
            polyline.positionPoints = [];
            polyline.positionPoints.push(new SuperMap.Geometry.Point(-(i+1)*stepWidth+halfWidth,  0.5*stepHeight));
            polyline.positionPoints.push(new SuperMap.Geometry.Point(-(i+1)*stepWidth+halfWidth, -0.5*stepHeight));
            polyline.style = this.style;
            symbolCells.push(polyline);

            var text = new Object;
            text.type = SuperMap.Plot.SymbolType.TEXTSYMBOL;
            text.positionPoints = [];
            text.positionPoints.push(new SuperMap.Geometry.Point(-(0.5+i+1)*stepWidth+halfWidth, 0));
            text.textContent = textContents[i-1];
            text.style = {surroundLineFlag: false, fontSize: 12,fontSizeLimit:true, fontFamily: "Microsoft YaHei"};
            text.style.labelAlign = "cm";
            symbolCells.push(text);
        }

        var indexTextPt = new SuperMap.Geometry.Point(-1.4*stepWidth+halfWidth, 0);
        var cellIndexText = new Object;
        cellIndexText.type = SuperMap.Plot.SymbolType.TEXTSYMBOL;
        cellIndexText.positionPoints = [];
        cellIndexText.positionPoints.push(indexTextPt);
        cellIndexText.textContent = toNode.index.toString();
        cellIndexText.style = {surroundLineFlag: false, fontSize: 12,fontSizeLimit:true, fontFamily: "Microsoft YaHei"};
        cellIndexText.style.labelAlign = "cm";
        symbolCells.push(cellIndexText);

        var circle = new Object;
        circle.type = SuperMap.Plot.SymbolType.CIRCLESYMBOL;
        circle.positionPoints = [];
        circle.positionPoints.push(indexTextPt);
        circle.positionPoints.push(new SuperMap.Geometry.Point(indexTextPt.x, 0.4*stepWidth));
        circle.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(circle);

        return symbolCells;
    },

    CLASS_NAME:"SuperMap.Geometry.GeoRouteNode"
});