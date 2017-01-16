/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol34900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        this.scaleValues = [];
        this.scaleValues.push(0.05);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        var midPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, allDistance / 2);
        if (midPt.index === -1) {
            return;
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        if (!this.isEdit) {
            this.scaleValues[0] = this.getSubSymbolScaleValue()*0.5;
        }
        var dDistance = allDistance * this.scaleValues[0];

        var ptStart = new SuperMap.Geometry.Point(shapePts[0].x, shapePts[0].y);
        var pt1 = new SuperMap.Geometry.Point(shapePts[1].x, shapePts[1].y);


        //直角梯形
        var startAngle = SuperMap.Plot.PlottingUtil.radian(pt1, ptStart) * this.RTOD;

        var tempPt1 = new SuperMap.Geometry.Point(0, 0.5 * dDistance);
        var tempPt2 = new SuperMap.Geometry.Point(dDistance, 0.5 * dDistance);
        var tempPt3 = new SuperMap.Geometry.Point(1.5 * dDistance, 0);

        var tempPt1_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPt1, startAngle);
        var tempPt1_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPt2, startAngle);
        var tempPt1_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPt3, startAngle);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [shapePts[0], tempPt1_1, tempPt1_2, tempPt1_3]);

        //箭头
        this.addArrow(shapePts);
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol34900"
});
