/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31401 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol31400, {
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
        SuperMap.Geometry.AlgoSymbol31400.prototype.initialize.apply(this, arguments);
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

        //创建矩形
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, geoPts);

        //设置宽度的一小段
        var dWidth = Math.abs(geoPts[1].x - geoPts[0].x) * this.getSubSymbolScaleValue();

        //获取中心点
        var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var pt1 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y - dWidth);
        var pt2 = new SuperMap.Geometry.Point(centerPt.x + dWidth, centerPt.y - 3 * dWidth);
        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, [pt1, pt2], style, true);

        var pt3 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y + dWidth);
        var pt4 = new SuperMap.Geometry.Point(centerPt.x - 3 * dWidth, centerPt.y + 3 * dWidth);
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, [pt3, pt4], style, true);

        var pt5 = new SuperMap.Geometry.Point(centerPt.x + dWidth, centerPt.y + dWidth);
        var pt6 = new SuperMap.Geometry.Point(centerPt.x + 3 * dWidth, centerPt.y + 3 * dWidth);
        this.addCell(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, [pt5, pt6], style, true);
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31401"
});
