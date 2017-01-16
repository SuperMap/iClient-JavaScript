/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * Property: dOffset
     * {Float}线面标号求解衬线的偏移量
     */
    dOffset: null,

    /**
     * Property: isEdit
     * {Float}线面标号求是否处于编辑状态
     */
    isEdit: true,

    /**
     * Property: subSymbolSize
     * {Float} 子标号大小和位置点连线长度的比值
     */
    subSymbolScaleValue: null,

    /**
     * Property: RTOD
     * {Float} 弧度转角度
     */
    RTOD: 57.295779513082320876798154814,

    /**
     * Property: DTOR
     * {Float} 角度转弧度
     */
    DTOR: 0.0174532925199432957692369077,

    /**
     * Property: defaultStyle
     * {object} 默认属性
     */
    defaultStyle: null,

    /**
     * Property: constantSize
     * {object} 是否一直固定大小
     */
    constantSize: false,

    /**
     * APIProperty: subSymbolDefaultPixelSize
     * {object} 子标号默认像素大小
     */
    subSymbolDefaultPixelSize:30,

    /**
     * Property: arrowHeadType
     * {object} 箭头类型
     */
    arrowHeadType:0,

    /**
     * Property: arrowBodyType
     * {object} 箭身类型
     */
    arrowBodyType:0,

    /**
     * Property: arrowBodyType
     * {object} 箭身类型
     */
    arrowTailType:0,
    /**
     * APIMethod: getSubSymbol
     * 获取线面标号的子标号
     *
     * Returns:
     * {Object} 返回线面标号的子标号。
     */
    getSubSymbols:function(){
        return this.subSymbols;
    },

    /**
     * APIMethod: setSurroundLineType
     * 设置标号的衬线类型
     *
     * Parameters:
     * surroundLineType - {int} 标号的衬线类型。
     */
    setSurroundLineType:function(surroundLineType){
        this.surroundLineType = surroundLineType;
        this.dOffset = this.feature.style.surroundLineWidth/2.0 + this.feature.style.strokeWidth/2.0;
        this.calculateParts();
        this.layer.drawFeature(this.feature);
    },

    /**
     * Constructor: SuperMap.Geometry.AlgoSymbol
     * 创建一个线面标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AlgoSymbol>} 新的标绘对象。
     */
    initialize:function(option){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        if(this.libID === 0 && this.symbolType === null){
            this.symbolType = this.code;
        } else if(this.symbolType === null){
            this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;
        }

        if(this.minEditPts === 0 || this.maxEditPts === 0){
            this.setMinAndMaxEditPts();
        }

        if(null === this.subSymbolScaleValue){
            this.subSymbolScaleValue = 0.1;
        }

        if(undefined === option.scaleByMap || null === option.scaleByMap){
            this.scaleByMap = true;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.dOffset = null;

        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //console.log(this.controlPoints);//控制台打印鼠标绘制时控制点坐标
        if( this.controlPoints.length >= this.minEditPts) {
            if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)){
                this.calAccessServerSymbol();
            } else {
                this.calNotAccessServerSymbol();
            }
        } else if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        this.clearBounds();
    },

    /**
     * Method: calNotAccessServerSymbol
     * 计算标号，适用于部分基本图元类型，不需要实时访问服务器
     */
    calNotAccessServerSymbol: function () {
        if((!this.textContent || this.textContent === "" || this.textContent === "???") && this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL){
            this.textContent = "Test";
        }

        var symbolCell = {
            textContent: this.textContent,
            type: this.symbolType,
            surroundLineFlag: false,
            positionPoints: SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints),
            style: {
                strokeColor: "#ff0000",
                strokeOpacity: 1.0,
                strokeWidth: 1,
                fill: false,
                fillColor: "#ff0000",
                fillOpactity: 0.31,
                fontSize: "2em",
                lineColorLimit: false,
                lineTypeLimit: false,
                lineWidthLimit: false,
                fillLimit: false,
                fillColorLimit: false,
                surroundLineFlag: false
            }
        };

        if(symbolCell.type === SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL) {
            symbolCell.positionPoints.push(symbolCell.positionPoints[0]);
        }

        var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCell.type, symbolCell.positionPoints, symbolCell.textContent, 0.0, this.isCalculate);
        if(this.symbolType === SuperMap.Plot.SymbolType.PARALLELLINE){
            this.controlPoints[0].x = symbolCell.positionPoints[0].x;
            this.controlPoints[0].y = symbolCell.positionPoints[0].y;
        } else if(this.symbolType === SuperMap.Plot.SymbolType.ELLIPSESYMBOL){
            this.controlPoints[2].x = symbolCell.positionPoints[2].x;
            this.controlPoints[2].y = symbolCell.positionPoints[2].y;
            if(this.controlPoints.length===3){
                var pnt = new SuperMap.Geometry.Point(this.controlPoints[0].x*2 - this.controlPoints[1].x,this.controlPoints[0].y*2 - this.controlPoints[1].y);
                this.controlPoints.push(pnt);
                var pnt2 = new SuperMap.Geometry.Point(this.controlPoints[0].x*2 - this.controlPoints[2].x,this.controlPoints[0].y*2 - this.controlPoints[2].y);
                this.controlPoints.push(pnt2);
            }else if(this.controlPoints.length===5){
                var pnt2 = new SuperMap.Geometry.Point(this.controlPoints[0].x*2 - this.controlPoints[2].x,this.controlPoints[0].y*2 - this.controlPoints[2].y);
                this.controlPoints[4].x = pnt2.x;
                this.controlPoints[4].y = pnt2.y;
            }
                //this.dEllipseAngle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[0], this.controlPoints[1]);

        }
        if(geometry !== null){
            if(this.symbolType === SuperMap.Plot.SymbolType.PARALLELLINE){
                for(var i = 0; i < geometry.length; i++){
                    geometry[i].style = symbolCell.style;
                    this.components.push(geometry[i]);
                    this.addOrRemoveSurroundLine(geometry[i]);
                }
            } else {
                geometry.style = symbolCell.style;
                this.components.push(geometry);
                this.addOrRemoveSurroundLine(geometry);
            }
        }
    },

    /**
     * Method: calAccessServerSymbol
     * 计算标号，适用于需要实时访问服务器类型
     */
    calAccessServerSymbol: function () {
        var symbolCells = SuperMap.Plot.AnalysisSymbol.analysisSymbolCells(this.symbolData);
        for(var i = 0; i < symbolCells.length; i++){
            var symbolCell = symbolCells[i];
            if(symbolCell.type === 32) {
                symbolCell.positionPoints.push(symbolCell.positionPoints[0]);
            }

            if(this.symbolType === 320 && symbolCell.type === 34 && this.textContent.length === 0){
                continue;
            } else {
                var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCell.type, symbolCell.positionPoints, symbolCell.textContent, 0.0);
                if(geometry && geometry !== null){
                    geometry.style = symbolCell.style;
                    this.components.push(geometry);
                    this.addOrRemoveSurroundLine(geometry);
                }
            }
        }

        var algoBasicInfo = SuperMap.Plot.AnalysisSymbol.analysisAlgoBasicInfo(this.symbolData, false);
        this.scalePoints = algoBasicInfo.scalePoints;
        this.scaleValues = algoBasicInfo.scaleValues;
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        if (this.symbolData !== null) {
            if (undefined !== this.symbolData.subSymbolScaleValue && null !== this.symbolData.subSymbolScaleValue) {
                this.subSymbolScaleValue = this.symbolData.subSymbolScaleValue;
                if (undefined !== this.symbolData.isEdit && null !== this.symbolData.isEdit) {
                    this.isEdit = this.symbolData.isEdit;
                }
            }

            if(undefined !== this.symbolData.strokeWidth && null !== this.symbolData.strokeWidth){
                this.strokeWidth = this.symbolData.strokeWidth;
            }

            if(undefined !== this.symbolData.constantSize && null !== this.symbolData.constantSize){
                this.constantSize = this.symbolData.constantSize;
            }

            if(undefined !== this.symbolData.baseScale && null !== this.symbolData.baseScale){
                this.baseScale = this.symbolData.baseScale;
            }
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        if(this.symbolData !== null && !SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)){
            this.symbolData.subSymbolScaleValue = this.subSymbolScaleValue;
            this.symbolData.isEdit = this.isEdit;
            this.symbolData.baseScale = this.baseScale;
            this.symbolData.strokeWidth = this.strokeWidth;
            this.symbolData.constantSize = this.constantSize;
        }
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.GeoGraphicObject>} 克隆的几何对象集合。
     */
    clone: function () {
        var geometry = SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);

        geometry.dOffset = this.dOffset;

        if(this.symbolData === null){
            if(this.subSymbols){
                geometry.subSymbols = [];
                for(var i = 0; i < this.subSymbols.length; i++){
                    geometry.subSymbols.push(this.subSymbols[i].clone());
                }
            }

            if(this.subSymbolScaleValue){
                geometry.subSymbolScaleValue = this.subSymbolScaleValue;
            }

            if(this.scaleValues){
                geometry.scaleValues = [];
                for(var i = 0; i < this.scaleValues.length; i++){
                    geometry.scaleValues.push(this.scaleValues[i]);
                }
            }
        }

        return geometry;
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
        //if(this.editMode) return ;

        SuperMap.Geometry.GeoGraphicObject.prototype.move.apply(this, arguments);

        if(this.symbolData !== null && this.symbolData.innerCells){
            for(var m = 0; m < this.symbolData.innerCells.length; m++){
                for(var n = 0; n < this.symbolData.innerCells[m].positionPoints.length; n++){
                    var tempPositionPoint = new SuperMap.Geometry.Point(this.symbolData.innerCells[m].positionPoints[n].x, this.symbolData.innerCells[m].positionPoints[n].y);
                    tempPositionPoint.move(x, y);
                    this.symbolData.innerCells[m].positionPoints[n].x = tempPositionPoint.x;
                    this.symbolData.innerCells[m].positionPoints[n].y = tempPositionPoint.y;
                }
            }
        }

        if(this.symbolData !== null && this.symbolData.innerCells){
            for(var k = 0; k < this.symbolData.scalePoints.length; k++){
                var tempPositionPoint = new SuperMap.Geometry.Point(this.symbolData.scalePoints[k].x, this.symbolData.scalePoints[k].y);
                tempPositionPoint.move(x, y);
                this.symbolData.scalePoints[k].x = tempPositionPoint.x;
                this.symbolData.scalePoints[k].y = tempPositionPoint.y;
            }
        }
    },

    /**
     * Method: addOrRemoveSurroundLine
     * 添加或移除衬线，由于目前每次修改衬线之后都重绘图层，所以暂不涉及删除衬线
     */
    addOrRemoveSurroundLine: function (geometry) {
        if(geometry.CLASS_NAME === "SuperMap.Geometry.GeoText"){
            return false;
        }

        if(geometry.style.lineWidthLimit && geometry.style.strokeWidth === 0){
            return false;
        }

        if(this.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.NONE){
            return false;
        }

        var originGeometry = geometry.clone();
        originGeometry.style = {};
        if(geometry.style)
            originGeometry.style = SuperMap.Util.copyAttributes(originGeometry.style, geometry.style);
        originGeometry.style.fill = false;
        originGeometry.style.fillLimit = true;
        originGeometry.style.fillColorLimit = true;

        var surroundLineGeometry = originGeometry.clone();
        surroundLineGeometry.style = {};
        if(originGeometry.style)
            surroundLineGeometry.style = SuperMap.Util.copyAttributes(surroundLineGeometry.style, originGeometry.style);
        surroundLineGeometry.style.surroundLineFlag = true;
        surroundLineGeometry.originGeometry = originGeometry;
        this.components.push(surroundLineGeometry);

        if(this.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.ALL){
            var lineGeometry = originGeometry.clone();
            lineGeometry.style = {};
            if(originGeometry.style)
                lineGeometry.style = SuperMap.Util.copyAttributes(lineGeometry.style, originGeometry.style);

            this.components.push(lineGeometry);
        }

        return true;
    },

    /**
     * Method: handleSurroundLine
     * 计算衬线
     */
    handleSurroundLine: function (geometry) {
        if(geometry.CLASS_NAME === "SuperMap.Geometry.GeoText"){
            return null;
        }

        if(this.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.NONE){
            return null;
        }

        if(geometry.style.lineWidthLimit && geometry.style.strokeWidth === 0){
            return null;
        }

        if(this.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.INNER || this.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.OUT){
            var baseDir = (this.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.OUT) ? 1 : -1;

            var pointTemp = SuperMap.Geometry.Primitives.getSpatialData(geometry);

            var dir = SuperMap.Plot.PlottingUtil.innerOutlineDir(pointTemp);
            var dOffset = dir*baseDir*this.dOffset;

            var LLOffset = dOffset * this.layer.map.getResolution();

            var pntResult = this.getSurroundLinePts(pointTemp, LLOffset);
            if(0 === pntResult.length){
                return null;
            }

            var surroundLineGeometry = geometry.clone();
            surroundLineGeometry.style = {};
            if(geometry.style)
                surroundLineGeometry.style = SuperMap.Util.copyAttributes(surroundLineGeometry.style, geometry.style);
            surroundLineGeometry.style.surroundLineFlag = true;

            if(surroundLineGeometry.CLASS_NAME === "SuperMap.Geometry.LineString"){
                surroundLineGeometry.components = [];
                surroundLineGeometry.components = pntResult;
            } else if(surroundLineGeometry.CLASS_NAME === "SuperMap.Geometry.LinearRing"){
                surroundLineGeometry.components = [];
                surroundLineGeometry.components = pntResult;
            } else if(surroundLineGeometry.CLASS_NAME === "SuperMap.Geometry.Polygon"){
                if(surroundLineGeometry.components.length > 0){
                    surroundLineGeometry.components[0].components = [];
                    surroundLineGeometry.components[0].components  = pntResult;
                }
            }
        }

        surroundLineGeometry.originGeometry = geometry;
        return surroundLineGeometry;
    },

    /**
     * Method: setMinAndMaxEditPts
     * 计算衬线
     */
    setMinAndMaxEditPts: function () {
        if(this.libID === 0){
            switch(this.code){
                case SuperMap.Plot.SymbolType.TEXTSYMBOL:
                    this.minEditPts = 1;
                    this.maxEditPts = 1;
                    break;
                case SuperMap.Plot.SymbolType.CIRCLESYMBOL:
                case SuperMap.Plot.SymbolType.RECTANGLESYMBOL:
                    this.minEditPts = 2;
                    this.maxEditPts = 2;
                    break;
                case SuperMap.Plot.SymbolType.ARCSYMBOL:
                case SuperMap.Plot.SymbolType.CHORDSYMBOL:
                case SuperMap.Plot.SymbolType.PIESYMBOL:
                case SuperMap.Plot.SymbolType.ELLIPSESYMBOL:
                case SuperMap.Plot.SymbolType.PARALLELOGRAM:
                    this.minEditPts = 3;
                    this.maxEditPts = 3;
                    break;
                case SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL:
                case SuperMap.Plot.SymbolType.POLYLINESYMBOL:
                case SuperMap.Plot.SymbolType.POLYBEZIERSYMBOL:
                case SuperMap.Plot.SymbolType.POLYBEZIERCLOSESYMBOL:
                    this.minEditPts = 2;
                    this.maxEditPts = 9999;
                    break;
                case SuperMap.Plot.SymbolType.PARALLELLINE:
                    this.minEditPts = 3;
                    this.maxEditPts = 9999;
                    break;
                case SuperMap.Plot.SymbolType.KIDNEY:
                    this.minEditPts = 2;
                    this.maxEditPts = 3;
                    break;
            }
        }
    },

    /**
     * Method: getSurroundLinePts
     * 计算衬线点串
     */
    getSurroundLinePts: function(arrPoints, LLOffset)
    {
        var prevLine = [];

        var linepts = [];
        for(var i = 0; i < arrPoints.length-1; i++)
        {
            var temppts = [];
            var result1, result2;

            if(SuperMap.Plot.PlottingUtil.equalFuzzy(arrPoints[i].x, arrPoints[i+1].x) &&
                SuperMap.Plot.PlottingUtil.equalFuzzy(arrPoints[i].y, arrPoints[i+1].y)){
                continue;
            }

            temppts.push(arrPoints[i]);
            temppts.push(arrPoints[i+1]);

            var pntResults = SuperMap.Plot.PlottingUtil.parallel(temppts, LLOffset);

            result1 = pntResults[0];
            result2 = pntResults[1];

            if(prevLine.length != 0) {
                var intersectObj = SuperMap.Plot.PlottingUtil.intersectLines(result1, result2, prevLine[0], prevLine[1]);
                if(intersectObj.isIntersectLines) {
                    //去除箭头冒尖的问题
                    var intersectPt = intersectObj.intersectPoint;
                    var dDis1 = SuperMap.Plot.PlottingUtil.distance(result1,result2);
                    var dDis2 = SuperMap.Plot.PlottingUtil.distance(intersectPt,result2);
                    if (dDis2 > 2.0*dDis1) {
                        linepts.push(result2);
                    } else {
                        linepts[linepts.length-1] = intersectPt;
                        linepts.push(result2);
                    }
                } else {
                    linepts.push(result2);
                }
            } else {
                linepts.push(result1);
                linepts.push(result2);
            }

            prevLine = [];
            prevLine.push(linepts[linepts.length-2]);
            prevLine.push(linepts[linepts.length-1]);
        }

        if(arrPoints[0].x === arrPoints[arrPoints.length-1].x && arrPoints[0].y === arrPoints[arrPoints.length-1].y)
        {
            if(1 < linepts.length){
                var lastIntersectObj = SuperMap.Plot.PlottingUtil.intersectLines(linepts[0], linepts[1], linepts[linepts.length-2], linepts[linepts.length-1]);
                if(lastIntersectObj.isIntersectLines) {
                    var lastIntersectPt = lastIntersectObj.intersectPoint;
                    linepts[linepts.length-1] = lastIntersectPt;
                    linepts[0] = lastIntersectPt;
                }
            }
        }

        return linepts;
    },

    /**
     * Method: addCell
     * 添加图元
     */
    addCell: function(symbolType, pts, style, noSurrondLine, textContent){
       if(!symbolType || !pts){
           return;
       }

        var cell = null;
        var cellPts = SuperMap.Plot.PlottingUtil.clonePoints(pts);
        if(SuperMap.Plot.SymbolType.TEXTSYMBOL === symbolType){
            cell = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolType, cellPts,textContent);
        }
        else{
            cell = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolType, cellPts);
        }

        if(!cell || null === cell){
            return;
        }

        if(!style || null === style){
            cell.style = {surroundLineFlag: false};
        }
        else{
            cell.style = {};
            cell.style = style;
        }

        this.components.push(cell);

        if(noSurrondLine){
            return;
        }

        this.addOrRemoveSurroundLine(cell);
    },

    /**
     * Method: addScalePoint
     * 添加比例点
     */
    addScalePoint:function(pt ,index){
        if(!pt || null === pt){
            return;
        }

        if(index === undefined || null === index){
            if(this.scalePoints.length < 0){
                index = 0;
            }
            else{
                index = this.scalePoints.length;
            }
        }

        var scalePoint = new SuperMap.Geometry.Point(pt.x,pt.y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = index;
        this.scalePoints.push(scalePoint);
    },

    /**
     * Method: getDefaultSubSymbolSize
     * 获取子标号的默认大小
     */
    getDefaultSubSymbolSize: function(){
        var defaultPixelSize = this.subSymbolDefaultPixelSize;
        if(null === this.layer || null === this.layer.map){
            return 0.0;
        }

        var pt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
        var pt2 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(defaultPixelSize,0));

        return SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
    },

    /**
     * Method: reView
     * 根据标号的原始信息重新计算,主要想让箭头随图缩放。
     *
     */
    reView: function () {
        if(this.prevStrokeWidth !== undefined && this.prevStrokeWidth !== this.feature.style.strokeWidth){
            this.strokeWidth = this.feature.style.strokeWidth;
        }

        if(this.resolution !== this.layer.renderer.getResolution()){
            if(this.scaleByMap && this.isEdit === true){
                var mapScale = this.resolution / this.layer.renderer.getResolution();
                this.dScale *= mapScale;

                //处理线宽缩放
                if(this.strokeWidth === undefined || null === this.strokeWidth){
                    this.strokeWidth = this.feature.style.strokeWidth;
                }

                if(this.baseScale === undefined){
                    var bounds = this.getBounds();
                    var baseDis = bounds.getWidth();
                    if(baseDis < bounds.getHeight()){
                        baseDis = bounds.getHeight();
                    }
                    var scaleSize = (this.strokeWidth/0.5)*5;
                    var pt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
                    var pt2 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(scaleSize,0));

                    var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                    this.baseScale = dis/baseDis;
                }

                if(this.dScale <= this.baseScale){
                    this.scaleStrokeWidth = true;

                    var scaleSize = (this.strokeWidth/0.5)*5;
                    var currentSize = this.dScale*scaleSize/this.baseScale;
                    this.feature.style.strokeWidth = Math.round(currentSize/10);
                    if(this.feature.style.strokeWidth >= this.strokeWidth){
                        this.feature.style.strokeWidth = this.strokeWidth;
                    }
                    if(this.feature.style.strokeWidth <= 0.5){
                        this.feature.style.strokeWidth = 0.5;
                    }
                } else {
                    if(this.scaleStrokeWidth === true){
                        this.feature.style.strokeWidth = this.strokeWidth;
                        this.scaleStrokeWidth = false;
                    }
                    this.strokeWidth = this.feature.style.strokeWidth;
                }

                this.prevStrokeWidth = this.feature.style.strokeWidth;

                //处理文字缩放
                this.feature.style.fontSize *= mapScale;
                for(var i = 0; i < this.components.length; i++){
                    if(this.components[i] instanceof SuperMap.Geometry.GeoText){
                        this.components[i].style.fontSize *= mapScale;
                    }
                }

                //处理文字选择包围盒
                if(this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL && this.layer.selectedFeatures.indexOf(this.feature) !== -1){
                    this.layer.plottingEdit.resetControlPointsValue();
                }

                this.resolution = this.layer.renderer.getResolution();

                return;
            }

            if(this.isEdit){
                this.isEdit = false;
                this.calculateParts();
                this.isEdit = true;
            }
            else{
                this.calculateParts();
            }

            this.resolution = this.layer.renderer.getResolution();
        }
    },

    /**
     * Method: getDefaultSubSymbolSize
     * 获取子标号的比例值
     */
    getSubSymbolScaleValue: function(){
        if(!this.isEdit || this.constantSize){
            var allDistance = 0;
            for(var i = 0; i < this.controlPoints.length-1; i++){
                allDistance += SuperMap.Plot.PlottingUtil.distance(this.controlPoints[i], this.controlPoints[i+1]);
            }

            var subSymbolSize = this.getDefaultSubSymbolSize();
            this.subSymbolScaleValue = subSymbolSize/allDistance;

            if(!this.constantSize){
                if(this.subSymbolScaleValue > 0.3 || this.subSymbolScaleValue <= 0){
                    this.subSymbolScaleValue = 0.3;
                }
            }


            if(this.subSymbolScaleValue <= 0){
                this.subSymbolScaleValue = 0.3;
            }
        }

        return this.subSymbolScaleValue;
    },

    /**
     * Method: rotate
     * 围绕中心点旋转组合对象。
     *
     * Parameters:
     * rotateValue - {Float} 旋转角的度数。
     */
    rotate: function(rotateValue, anchorPoint) {
        for (var m = 0; m < this.controlPoints.length; m++) {
            this.controlPoints[m].rotate(rotateValue, anchorPoint);
        }

        for (var n = 0; n < this.scalePoints.length; n++) {
            this.scalePoints[n].rotate(rotateValue, anchorPoint);
        }

        if(this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL){
            if(!this.components[0].style.labelRotation){
                this.components[0].style.labelRotation = -rotateValue;
            } else {
                this.components[0].style.labelRotation += -rotateValue;
            }
        } else {

            var rotate = true;
            if(!SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)) {
                if(this.symbolType === SuperMap.Plot.SymbolType.ALGOSYMBOL){
                    this.calculateParts();
                    rotate = false;
                }
            }

            if(rotate){
                for (var i = 0, len = this.components.length; i < len; i++) {
                    if (this.components[i].CLASS_NAME !== "SuperMap.Geometry.GeoText") {
                        this.components[i].rotate(rotateValue, anchorPoint);
                        if (this.components[i].originGeometry && this.components[i].originGeometry !== null) {
                            this.components[i].originGeometry.rotate(rotateValue, anchorPoint);
                        }
                    } else {
                        var tempPt = new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y);
                        tempPt.rotate(rotateValue, anchorPoint);
                        this.components[i].x = tempPt.x;
                        this.components[i].y = tempPt.y;
                        if (!this.components[i].style.labelRotation) {
                            this.components[i].style.labelRotation = -rotateValue;
                        } else {
                            this.components[i].style.labelRotation += -rotateValue;
                        }
                    }
                }
            }
        }

        if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)){
            for(var k = 0; k < this.symbolData.innerCells.length; k++){
                for(var n = 0; n < this.symbolData.innerCells[k].positionPoints.length; n++){
                    var tempPositionPoint = new SuperMap.Geometry.Point(this.symbolData.innerCells[k].positionPoints[n].x, this.symbolData.innerCells[k].positionPoints[n].y);
                    tempPositionPoint.rotate(rotateValue, anchorPoint);
                    this.symbolData.innerCells[k].positionPoints[n].x = tempPositionPoint.x;
                    this.symbolData.innerCells[k].positionPoints[n].y = tempPositionPoint.y;
                }
            }

            for(var j = 0; j < this.symbolData.scalePoints.length; j++){
                var tempScalePoint = new SuperMap.Geometry.Point(this.symbolData.scalePoints[j].x, this.symbolData.scalePoints[j].y);
                tempScalePoint.rotate(rotateValue, anchorPoint);
                this.symbolData.scalePoints[j].x = tempScalePoint.x;
                this.symbolData.scalePoints[j].y = tempScalePoint.y;
            }
        }
    },

    /**
     * Method: resize
     * 相对于中心点缩放组合对象。
     *
     * Parameters:
     * scaleValue - {Float} 缩放比例。
     */
    resize: function(scaleValue, anchorPoint) {
        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i].CLASS_NAME !== "SuperMap.Geometry.GeoText"){
                this.components[i].resize(scaleValue, anchorPoint);
                if(this.components[i].originGeometry && this.components[i].originGeometry !== null){
                    this.components[i].originGeometry.resize(scaleValue, anchorPoint);
                }
            } else {
                var tempPt = new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y);
                tempPt.resize(scaleValue, anchorPoint);
                this.components[i].x = tempPt.x;
                this.components[i].y = tempPt.y;
                if(!this.components[i].style.fontSize){
                    this.components[i].style.fontSize = 12*scaleValue;
                } else {
                    this.components[i].style.fontSize *= scaleValue;
                }
            }
        }

        for (var m = 0; m < this.controlPoints.length; m++) {
            this.controlPoints[m].resize(scaleValue, anchorPoint);
        }

        for (var n = 0; n < this.scalePoints.length; n++) {
            this.scalePoints[n].resize(scaleValue, anchorPoint);
        }

        if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)){
            for(var k = 0; k < this.symbolData.innerCells.length; k++){
                for(var n = 0; n < this.symbolData.innerCells[k].positionPoints.length; n++){
                    var tempPositionPoint = new SuperMap.Geometry.Point(this.symbolData.innerCells[k].positionPoints[n].x, this.symbolData.innerCells[k].positionPoints[n].y);
                    tempPositionPoint.resize(scaleValue, anchorPoint);
                    this.symbolData.innerCells[k].positionPoints[n].x = tempPositionPoint.x;
                    this.symbolData.innerCells[k].positionPoints[n].y = tempPositionPoint.y;
                }
            }

            for(var j = 0; j < this.symbolData.scalePoints.length; j++){
                var tempScalePoint = new SuperMap.Geometry.Point(this.symbolData.scalePoints[j].x, this.symbolData.scalePoints[j].y);
                tempScalePoint.resize(scaleValue, anchorPoint);
                this.symbolData.scalePoints[j].x = tempScalePoint.x;
                this.symbolData.scalePoints[j].y = tempScalePoint.y;
            }
        }
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function(index, pt) {
        //this.isEdit = true;
        if(this.libID===0 &&this.code===31  /*&& index!==2 */){
            if(index ===0){
                this.controlPoints[0].x = ( this.controlPoints[1].x + this.controlPoints[3].x )/2;
                this.controlPoints[0].y = ( this.controlPoints[1].y + this.controlPoints[3].y )/2;
                return;
            }
            var pos =-1;

            pos = (index +2)%4;
            if(pos===0) pos = 4;

            var majorAxis = SuperMap.Plot.PlottingUtil.distance(this.controlPoints[0], this.controlPoints[index]);

            var pnt = SuperMap.Plot.PlottingUtil.findPointInLine(this.controlPoints[0], this.controlPoints[pos],majorAxis);

            var ptcontrol = new SuperMap.Geometry.Point(this.controlPoints[0].x*2 - pnt.x,this.controlPoints[0].y*2 - pnt.y);

            var pixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(pnt.x, pnt.y));
            var pixel2 = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(ptcontrol.x, ptcontrol.y));
            var flag = false;
            if(SuperMap.Plot.PlottingUtil.equalFuzzy(pixel.x-pixel2.x,0) || SuperMap.Plot.PlottingUtil.equalFuzzy(pixel.y-pixel2.y,0))
            {
                console.log("equal pixel2");
                flag = true;
                //return;
            }
            if(flag){
                this.controlPoints[pos].x = ptcontrol.x;
                this.controlPoints[pos].y = ptcontrol.y;
                this.controlPoints[index].x = pnt.x;
                this.controlPoints[index].y = pnt.y;
            }else{
                this.controlPoints[pos].x = pnt.x;
                this.controlPoints[pos].y = pnt.y;
                this.controlPoints[index].x = ptcontrol.x;
                this.controlPoints[index].y = ptcontrol.y;
            }

        }
        this.calculateParts();
        //this.isEdit = false;
    },

    /**
     * Method: computeSubSymbol
     * 计算子标号
     *
     * Parameters:
     */
    computeSubSymbol: function (subSymbol, geoPt, dSymbolSize, dAngle, dOffestX, dOffestY) {
        if(subSymbol.symbolData === null || subSymbol.symbolData.innerCells === null){
            return null;
        }

        if(dOffestX === undefined){
            dOffestX = 0.0;
        }

        if(dOffestY === undefined){
            dOffestY = 0.0;
        }

        var symbolCells = SuperMap.Plot.AnalysisSymbol.analysisSymbolCells(subSymbol.symbolData);

        var logicBounds = new SuperMap.Bounds();
        for(var i = 0; i < symbolCells.length; i++){
            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCells[i].type, symbolCells[i].positionPoints, [i].textContent, 0, false);
            logicBounds.extend(geometry.getBounds());
        }

        var maxPt = new SuperMap.Geometry.Point(logicBounds.right, logicBounds.top);
        var minPt = new SuperMap.Geometry.Point(logicBounds.left, logicBounds.bottom);

        //缩放比例
        var fScaley = (maxPt.y - minPt.y) / dSymbolSize;
        var fScalex = (maxPt.x - minPt.x) / dSymbolSize;

        var fScale = fScalex > fScaley ? fScalex : fScaley;

        //平移的向量
        var vecTranslate = new SuperMap.Geometry.Point((maxPt.x + minPt.x) * 0.5, (maxPt.y + minPt.y) * 0.5);
        vecTranslate.x += dOffestX*(maxPt.x-minPt.x);
        vecTranslate.y += dOffestY*(maxPt.y-minPt.y);

        for(var j = 0; j < symbolCells.length; j++){
            for(var k = 0; k < symbolCells[j].positionPoints.length; k++){
                symbolCells[j].positionPoints[k].x -= vecTranslate.x;
                symbolCells[j].positionPoints[k].y -= vecTranslate.y;

                symbolCells[j].positionPoints[k].x /= fScale;
                symbolCells[j].positionPoints[k].y /= fScale;

                symbolCells[j].positionPoints[k].rotate(dAngle, new SuperMap.Geometry.Point(0, 0));

                symbolCells[j].positionPoints[k].x += geoPt.x;
                symbolCells[j].positionPoints[k].y += geoPt.y;
            }

            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCells[j].type, symbolCells[j].positionPoints, [j].textContent, dAngle, false);
            geometry.style = symbolCells[j].style;
            this.components.push(geometry);
        }
        return symbolCells;
    },

    /**
     * Method: addArrow
     * 添加箭头
     */

    addArrow:function(shapePts){

        if(shapePts.length !== 0){

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            var scale = 0.05;

            if(!this.isEdit){
                scale = this.getSubSymbolScaleValue()*0.5;
            }else{
                scale = this.getSubSymbolScaleValue()*0.5;
            }
            var arrowHeadDis = allDistance * scale;
            var lineStart = shapePts[shapePts.length-2];
            var lineEnd   = shapePts[shapePts.length-1];
            var dRadius = arrowHeadDis;
            var angle  = SuperMap.Plot.PlottingUtil.radian(lineStart,lineEnd) * this.RTOD;
            var ptRight = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd,dRadius,dRadius,angle+157.5);
            var ptLeft  = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd,dRadius,dRadius,angle+202.5);

            var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
            //创建箭头
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [ptRight,shapePts[shapePts.length-1],ptLeft], style, true);
        }
    },
    /**
     * Method: calculateforHead
     * 计算箭头head
     */
    calculateforHead: function (geoPts,bodyResult,lastPts,scaleValue) {
        var allDistance=0;
        for(var i = 0; i < geoPts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i+1]);
        }

        //获取箭头的大小比值
        var dis = allDistance * scaleValue;
        //var n= 3,flag = false;
        var ptsClone =SuperMap.Plot.PlottingUtil.clonePoints( bodyResult.arrowBodyPts);
        while(SuperMap.Plot.PlottingUtil.distance(lastPts[0], lastPts[1])<dis){
            if(ptsClone.length<3){
                break;
            }
            if(SuperMap.Plot.PlottingUtil.distance(lastPts[0], ptsClone[ptsClone.length-3])<dis){
                lastPts.splice(1,1);
                ptsClone.splice(ptsClone.length -2,1);
                lastPts.push(ptsClone[ptsClone.length-2]);
                ///n++;

            }
            else{
                var ptproject = SuperMap.Plot.PlottingUtil.projectPoint(lastPts[0],ptsClone[ptsClone.length-2],ptsClone[ptsClone.length-3]);
                //console.log( ptproject);
                var dis1 = SuperMap.Plot.PlottingUtil.distance(lastPts[0], ptproject);
                var insertPt =  SuperMap.Plot.PlottingUtil.findPointInLine(ptproject,ptsClone[ptsClone.length-3],Math.sqrt(dis*dis-dis1*dis1));
                ptsClone.splice(ptsClone.length -2,1,insertPt);
                lastPts.splice(1,1,insertPt);
                break;
            }
            //flag=true;
        }
        return ptsClone;
    },
    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol"
});