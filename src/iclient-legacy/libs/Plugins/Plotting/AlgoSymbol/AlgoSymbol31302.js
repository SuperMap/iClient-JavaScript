/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31302 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol31300, {
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
    initialize: function (option) {
        SuperMap.Geometry.AlgoSymbol31300.prototype.initialize.apply(this, arguments);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4400));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if (this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
        var dScale0 = this.scaleValues[0];
        var ddis = dScale0 * allDistance;

        var ptCenter = SuperMap.Plot.PlottingUtil.LinePnt(ptStart, ptEnd, 0.5 * allDistance);
        //创建头部垂
        var SidePoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[0], geoPts[1]);
        var SidePoint1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[1], geoPts[0]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [SidePoint.pntLeft,SidePoint.pntRight]);

        //创建尾部垂线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [SidePoint1.pntLeft,SidePoint1.pntRight]);
        var ptLeft2D = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, ptStart, ddis);
        var ptRight2D = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, ptEnd, ddis);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [geoPts[0],ptLeft2D]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [ptRight2D,geoPts[1]]);

        //子符号
        var dAngle = SuperMap.Plot.PlottingUtil.radian(geoPts[0], geoPts[1]) * this.RTOD;
        this.computeSubSymbol(this.subSymbols[0], ptCenter, 2 * ddis, dAngle);

        //计算比例点
        if (this.isEdit) {
            this.addScalePoint(SidePoint1.pntRight, 0);
        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31302"
});
