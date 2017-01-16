/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol27701 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.maxEditPts = 30;


    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();
        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }

        var shapePts = [];
        if (3 >= geoPts.length) {
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            var shapePts = primitives.getKendyShapePts(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        }
        else {
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);
        //几何中心
        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        var dDistance = this.getSubSymbolScaleValue() * allDistance;
        var dSmalldis = this.getSubSymbolScaleValue() * allDistance;

        var ptLeft1 = new SuperMap.Geometry.Point(plygonCenter.x - dDistance - dSmalldis, plygonCenter.y);
        var ptLeft2 = new SuperMap.Geometry.Point(plygonCenter.x - dDistance, plygonCenter.y);
        var ptLeft3 = new SuperMap.Geometry.Point(plygonCenter.x - dDistance + dSmalldis, plygonCenter.y);
        var ptRight1 = new SuperMap.Geometry.Point(plygonCenter.x + dDistance, plygonCenter.y);
        var ptRight2 = new SuperMap.Geometry.Point(plygonCenter.x + dDistance + dSmalldis, plygonCenter.y);
        var ptRight3 = new SuperMap.Geometry.Point(plygonCenter.x + dDistance + 2 * dSmalldis, plygonCenter.y);


        var sideLeftPts1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dSmalldis, ptLeft1, ptLeft2);
        var sideLeftPts2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dSmalldis, ptLeft2, ptLeft3);
        var sideRightPts1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dSmalldis, ptRight1, ptRight2);
        var sideRightPts2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dSmalldis, ptRight2, ptRight3);

        //第一个
        var pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(sideLeftPts1.pntLeft.x, sideLeftPts1.pntLeft.y));
        pts2D.push(new SuperMap.Geometry.Point(ptLeft1.x, ptLeft1.y));
        pts2D.push(new SuperMap.Geometry.Point(sideLeftPts1.pntRight.x, sideLeftPts1.pntRight.y));
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //第二个
        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(sideLeftPts2.pntLeft.x, sideLeftPts2.pntLeft.y));
        pts2D.push(new SuperMap.Geometry.Point(ptLeft2.x, ptLeft2.y));
        pts2D.push(new SuperMap.Geometry.Point(sideLeftPts2.pntRight.x, sideLeftPts2.pntRight.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //第三个
        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(sideRightPts1.pntLeft.x, sideRightPts1.pntLeft.y));
        pts2D.push(new SuperMap.Geometry.Point(ptRight1.x, ptRight1.y));
        pts2D.push(new SuperMap.Geometry.Point(sideRightPts1.pntRight.x, sideRightPts1.pntRight.y));
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //第四个
        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(sideRightPts2.pntLeft.x, sideRightPts2.pntLeft.y));
        pts2D.push(new SuperMap.Geometry.Point(ptRight2.x, ptRight2.y));
        pts2D.push(new SuperMap.Geometry.Point(sideRightPts2.pntRight.x, sideRightPts2.pntRight.y));
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);
        this.clearBounds();
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol27701"
});