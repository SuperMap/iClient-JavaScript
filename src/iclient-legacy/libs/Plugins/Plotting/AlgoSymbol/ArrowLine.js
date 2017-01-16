/**
 * Class: SuperMap.Geometry.ArrowLine
 * 箭头线对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.ArrowLine = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    /**
     * APIProperty: arrowType
     * {<SuperMap.Plot.ArrowLineType>} 线起始箭头类型
     */
    arrowTypeStart: 0,

    /**
     * APIProperty: arrowType
     * {<SuperMap.Plot.ArrowLineType>} 线结束箭头类型
     */
    arrowTypeEnd: 0,

    /**
     * APIProperty: arrowAngle
     * {Double} 箭头的夹角,默认为60度
     */
    arrowAngle: null,

    /**
     * APIProperty: arrowLength
     * {Double} 箭头的边长,默认为10
     */
    arrowLength: null,

    /**
     * Constructor: SuperMap.Geometry.ArrowLine
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.ArrowLine>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.ARROWLINE;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.ARROWLINE;
        this.symbolName = "ArrowLine";

        this.minEditPts = 2;
        this.maxEditPts = 2;

        if(this.arrowAngle === null){
            this.arrowAngle = 45;
        }

        if(this.arrowLength === null){
            this.arrowLength = 10;
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints === null || this.controlPoints.length < 2){
            return;
        }

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(this.controlPoints);
        if(!this.isEdit){
            var subSymbolSize = this.getDefaultSubSymbolSize();
            this.subSymbolScaleValue = 0.5*subSymbolSize/allDistance;

            if (this.subSymbolScaleValue > 0.3 || this.subSymbolScaleValue <= 0) {
                this.subSymbolScaleValue = 0.3;
            }

            if(this.subSymbolScaleValue <= 0){
                this.subSymbolScaleValue = 0.3;
            }
        }

        this.arrowLength = this.subSymbolScaleValue*allDistance;

        var halfArrowAngle = this.arrowAngle * Math.PI / 180.0 / 2;

        // 末尾箭头
        var lineAngle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[1], this.controlPoints[0]);

        var angleLeftLine = lineAngle - halfArrowAngle;
        var pntLeftLineX = this.controlPoints[1].x + this.arrowLength * Math.cos(angleLeftLine);
        var pntLeftLineY = this.controlPoints[1].y + this.arrowLength * Math.sin(angleLeftLine);
        var pntArrowLeft = new SuperMap.Geometry.Point(pntLeftLineX, pntLeftLineY);

        var angleRightLine = lineAngle + halfArrowAngle;
        var pntRightLineX = this.controlPoints[1].x + this.arrowLength * Math.cos(angleRightLine);
        var pntRightLineY = this.controlPoints[1].y + this.arrowLength * Math.sin(angleRightLine);
        var pntArrowRight = new SuperMap.Geometry.Point(pntRightLineX, pntRightLineY);

        var ptsArrowEnd = [];
        ptsArrowEnd.push(pntArrowLeft);
        ptsArrowEnd.push(this.controlPoints[1].clone());
        ptsArrowEnd.push(pntArrowRight);

        var codeID = this.arrowTypeEnd === 0 ? SuperMap.Plot.SymbolType.POLYLINESYMBOL : SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        var geometryArrowEnd = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(codeID, ptsArrowEnd);
        geometryArrowEnd.style = {surroundLineFlag: false, fillLimit: true,lineTypeLimit:true};

        // 校正中间线段数据
        var pntArrowLineEnd = new SuperMap.Geometry.Point((pntLeftLineX + pntRightLineX) / 2, (pntLeftLineY + pntRightLineY) / 2);

        // 起始箭头
        //lineAngle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[0], this.controlPoints[1]);
        lineAngle += Math.PI;

        angleLeftLine = lineAngle - halfArrowAngle;
        pntLeftLineX = this.controlPoints[0].x + this.arrowLength * Math.cos(angleLeftLine);
        pntLeftLineY = this.controlPoints[0].y + this.arrowLength * Math.sin(angleLeftLine);
        pntArrowLeft = new SuperMap.Geometry.Point(pntLeftLineX, pntLeftLineY);

        angleRightLine = lineAngle + halfArrowAngle;
        pntRightLineX = this.controlPoints[0].x + this.arrowLength * Math.cos(angleRightLine);
        pntRightLineY = this.controlPoints[0].y + this.arrowLength * Math.sin(angleRightLine);
        pntArrowRight = new SuperMap.Geometry.Point(pntRightLineX, pntRightLineY);

        var ptsArrowStart = [];
        ptsArrowStart.push(pntArrowLeft);
        ptsArrowStart.push(this.controlPoints[0].clone());
        ptsArrowStart.push(pntArrowRight);

        codeID = this.arrowTypeStart === 0 ? SuperMap.Plot.SymbolType.POLYLINESYMBOL : SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        var geometryArrowStart = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(codeID, ptsArrowStart);
        geometryArrowStart.style = {surroundLineFlag: false, fillLimit: true, lineTypeLimit:true};
        if(this.arrowTypeStart !== 2){
            this.components.push(geometryArrowStart);
        }

        var pntArrowLineStart = new SuperMap.Geometry.Point((pntLeftLineX + pntRightLineX) / 2, (pntLeftLineY + pntRightLineY) / 2);

        // 用校正后数据创建
        var ptsArrowLine = [];
        if(this.arrowTypeStart === 0 || this.arrowTypeStart === 2){
            ptsArrowLine.push(this.controlPoints[0].clone());
        }else{
            ptsArrowLine.push(pntArrowLineStart);
        }
        if(this.arrowTypeEnd === 0 || this.arrowTypeEnd === 2){
            ptsArrowLine.push(this.controlPoints[1].clone());
        }else{
            ptsArrowLine.push(pntArrowLineEnd);
        }

        var geometryLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsArrowLine);
        geometryLine.style = {surroundLineFlag: false};
        this.components.push(geometryLine);
        if(this.arrowTypeEnd !== 2){
            this.components.push(geometryArrowEnd);
        }
    },

    parseSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.arrowAngle = this.symbolData.arrowAngle;
            this.arrowLength = this.symbolData.arrowLength;
            this.arrowTypeEnd = this.symbolData.arrowTypeEnd;
            this.arrowTypeStart = this.symbolData.arrowTypeStart;
        }
    },

    setSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        // if(!!this.symbolData){
            this.symbolData.arrowAngle = this.arrowAngle;
            this.symbolData.arrowLength = this.arrowLength;
            this.symbolData.arrowTypeEnd = this.arrowTypeEnd;
            this.symbolData.arrowTypeStart = this.arrowTypeStart;
        // }
    },

    CLASS_NAME: "SuperMap.Geometry.ArrowLine"
});
