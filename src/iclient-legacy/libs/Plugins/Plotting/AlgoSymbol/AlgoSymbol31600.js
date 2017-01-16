/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31600 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 2;

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
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, geoPts);
        //计算矩形（矩形）的中心点
        var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        var dWidth = Math.abs(geoPts[1].x - geoPts[0].x) * this.getSubSymbolScaleValue();
        //计算矩形（内下）的X
        var pt1 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y + dWidth);
        var pt2 = new SuperMap.Geometry.Point(centerPt.x - 3 * dWidth, centerPt.y - dWidth);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt1, pt2]);
        this.clearBounds();
        var pt3 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y - dWidth);
        var pt4 = new SuperMap.Geometry.Point(centerPt.x - 3 * dWidth, centerPt.y + dWidth);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt3, pt4]);

        //计算矩形（内下）的三
        var pt5 = new SuperMap.Geometry.Point(centerPt.x + 2 * dWidth, centerPt.y + dWidth);
        var pt6 = new SuperMap.Geometry.Point(centerPt.x + 3 * dWidth, centerPt.y + dWidth);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt5, pt6]);
        this.clearBounds();
        var pt7 = new SuperMap.Geometry.Point(centerPt.x + dWidth, centerPt.y);
        var pt8 = new SuperMap.Geometry.Point(centerPt.x + 4 * dWidth, centerPt.y);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt7, pt8]);

        var pt9 = new SuperMap.Geometry.Point(centerPt.x + 2 * dWidth, centerPt.y - dWidth);
        var pt10 = new SuperMap.Geometry.Point(centerPt.x + 3 * dWidth, centerPt.y - dWidth);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt9, pt10]);
        this.clearBounds();

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31600"
});
