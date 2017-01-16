/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 1000;

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
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        var dDistance = allDistance * 0.5;

        var distance = allDistance * this.getSubSymbolScaleValue();

        //箭头直线
        var center = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dDistance)
        if (center.index === -1) {
            return;
        }

        var center2D = new SuperMap.Geometry.Point(center.pt.x, center.pt.y);
        var ptStart = new SuperMap.Geometry.Point(shapePts[center.index].x, shapePts[center.index].y);
        var ptEnd = new SuperMap.Geometry.Point(shapePts[center.index + 1].x, shapePts[center.index + 1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd) * this.RTOD;

        var pt = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance, distance, angle + 90);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [center.pt, pt]);

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, pt) * this.RTOD;

        //左箭头
        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(pt, distance, distance, tempAngle + 30);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt, pt1]);

        //箭头三角形
        var angle1 = SuperMap.Plot.PlottingUtil.radian(pt, pt1) * this.RTOD;
        var pt3 = new SuperMap.Geometry.Point(-0.2 * distance, 0.05 * distance);
        var pt4 = new SuperMap.Geometry.Point(-0.2 * distance, -0.05 * distance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt1, pt3, angle1);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt1, pt4, angle1);

        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt1, tempPt1, tempPt2], style);

        //右箭头
        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(pt, distance, distance, tempAngle + 330);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt, pt2]);

        //箭头三角形
        var angle2 = SuperMap.Plot.PlottingUtil.radian(pt, pt2) * this.RTOD;
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt2, pt3, angle2);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt2, pt4, angle2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt2, tempPt3, tempPt4], style);

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30800"
});
