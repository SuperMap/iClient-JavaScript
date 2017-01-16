/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 99999;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if(geoPts.length < this.minEditPts){
            return;
        }

        //创建贝赛尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //计算折线图元的点
        //获取贝赛尔曲线的拟合点
        var dallDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dallDistance/2);
        if(-1 === result.index)
        {
            return;
        }
        var midPt = result.pt;

        //折线段的几何点数组
        var dLen = 1.5 * this.getSubSymbolScaleValue() * dallDistance;
        var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLen, shapePts[result.index], midPt);

        var linePts = [];
        linePts.push(result1.pntLeft);
        linePts.push(midPt);

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, null, true);

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26500"
})