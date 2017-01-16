/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        if(this.controlPoints.length < this.minEditPts) {
            return;
        }
        //获取位置点

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, geoPts);
        //计算矩形（矩形）的中心点
        var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        var dWidth = Math.abs(geoPts[1].x - geoPts[0].x) * this.getSubSymbolScaleValue();
        //计算矩形（内下）的两个点
        var pt1 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y - dWidth);
        var pt2 = new SuperMap.Geometry.Point(centerPt.x + dWidth, centerPt.y + dWidth);
        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, [pt1,pt2], style, true);
        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol31400"
});
