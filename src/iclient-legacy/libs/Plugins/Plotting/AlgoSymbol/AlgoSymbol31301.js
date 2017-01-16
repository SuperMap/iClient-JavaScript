/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31301 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol31300, {
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

        //*********************************中间那条线*********************************
        //创建主体直线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geoPts);
        //创建头部垂线
        var ddis = this.scaleValues[0] * allDistance;
        var sidePoinde1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[0], geoPts[1]);
        var sidePoinde2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[1], geoPts[0]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidePoinde1.pntLeft, sidePoinde1.pntRight]);
        //创建尾部垂线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidePoinde2.pntLeft, sidePoinde2.pntRight]);

        //*********************************上面那条线*********************************
        var ptsCenter = [];
        var dline = ddis * 3;
        ptsCenter.push(new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y));
        ptsCenter.push(new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y));
        //创建平行线
        var ptsUp = SuperMap.Plot.PlottingUtil.paraLine(ptsCenter, dline, true);
        var ptsDown = SuperMap.Plot.PlottingUtil.paraLine(ptsCenter, dline, false);

        //创建上面直线
        var ptsLinUp = [];
        for (var j = 0; j < ptsUp.length; j++) {
            ptsLinUp.push(ptsUp[j]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLinUp);
        //创建头部垂线
        var SidePoint3 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, ptsUp[1], ptsUp[0]);
        var SidePoint4 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, ptsUp[0], ptsUp[1]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [SidePoint3.pntLeft, SidePoint3.pntRight]);
        //创建尾部垂线

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [SidePoint4.pntLeft, SidePoint4.pntRight]);
        //*********************************下面那条线*********************************
        //创建上面直线
        var ptsLineDown = [];
        for (var k = 0; k < ptsDown.length; k++) {
            ptsLineDown.push(ptsDown[k]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineDown);

        //创建头部垂线
        var SidePoint5 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, ptsDown[1], ptsDown[0]);
        var SidePoint6 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, ptsDown[0], ptsDown[1]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [SidePoint5.pntLeft, SidePoint5.pntRight]);
        //创建尾部垂线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [SidePoint6.pntLeft, SidePoint6.pntRight]);
        //计算比例点
        if (this.isEdit) {
            this.addScalePoint(sidePoinde2.pntRight, 0);
        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31301"
});
