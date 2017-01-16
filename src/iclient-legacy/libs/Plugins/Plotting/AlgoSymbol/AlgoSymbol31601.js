/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31601 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        SuperMap.Geometry.AlgoSymbol31600.prototype.initialize.apply(this, arguments);
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
        //计算矩形（内下）的三
        var pt1 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y + dWidth);
        var pt2 = new SuperMap.Geometry.Point(centerPt.x + dWidth, centerPt.y + dWidth);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt1, pt2]);

        var pt3 = new SuperMap.Geometry.Point(centerPt.x - 2 * dWidth, centerPt.y);
        var pt4 = new SuperMap.Geometry.Point(centerPt.x + 2 * dWidth, centerPt.y);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt3, pt4]);

        var pt5 = new SuperMap.Geometry.Point(centerPt.x - dWidth, centerPt.y - dWidth);
        var pt6 = new SuperMap.Geometry.Point(centerPt.x + dWidth, centerPt.y - dWidth);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt5, pt6]);

        var y = 0.0;
        if (geoPts[0].y > geoPts[1].y) {
            //竖线-上
            var lPt1 = new SuperMap.Geometry.Point(centerPt.x, geoPts[0].y);
            var lPt2 = new SuperMap.Geometry.Point(centerPt.x, geoPts[0].y - dWidth);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt1, lPt2]);

            //下
            var lPt3 = new SuperMap.Geometry.Point(centerPt.x, geoPts[1].y);
            var lPt4 = new SuperMap.Geometry.Point(centerPt.x, geoPts[1].y + dWidth);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt3, lPt4]);
        }
        else {
            //竖线-上
            var lPt5 = new SuperMap.Geometry.Point(centerPt.x, geoPts[1].y);
            var lPt6 = new SuperMap.Geometry.Point(centerPt.x, geoPts[1].y - dWidth);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt5, lPt6]);

            //下
            var lPt7 = new SuperMap.Geometry.Point(centerPt.x, geoPts[0].y);
            var lPt8 = new SuperMap.Geometry.Point(centerPt.x, geoPts[0].y + dWidth);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt7, lPt8]);

        }

        if (geoPts[0].x > geoPts[1].x) {
            //右
            var lPt9 = new SuperMap.Geometry.Point(geoPts[0].x, centerPt.y);
            var lPt10 = new SuperMap.Geometry.Point(geoPts[0].x - dWidth, centerPt.y);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt9, lPt10]);

            //左
            var lPt11 = new SuperMap.Geometry.Point(geoPts[1].x, centerPt.y);
            var lPt12 = new SuperMap.Geometry.Point(geoPts[1].x + dWidth, centerPt.y);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt11, lPt12]);
        }
        else {
            //右
            var lPt13 = new SuperMap.Geometry.Point(geoPts[1].x, centerPt.y);
            var lPt14 = new SuperMap.Geometry.Point(geoPts[1].x - dWidth, centerPt.y);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt13, lPt14]);
            //左
            var lPt15 = new SuperMap.Geometry.Point(geoPts[0].x, centerPt.y);
            var lPt16 = new SuperMap.Geometry.Point(geoPts[0].x + dWidth, centerPt.y);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [lPt15, lPt16]);

        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31601"
});
