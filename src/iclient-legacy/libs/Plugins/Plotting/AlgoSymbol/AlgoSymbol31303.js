/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31303 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol31300, {
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

        var ddis = this.scaleValues[0] * allDistance;
        var ptCenter = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[0], geoPts[1], 0.5 * allDistance);
        //求两个断点
        var ptLeft = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, geoPts[0], ddis);
        var ptRight = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, geoPts[1], ddis);

//*********************************中间那条线*********************************
        //创建主体直线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [geoPts[0],ptLeft]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [ptRight,geoPts[1]]);
        //创建头部垂线
        var sidePoint1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[1], geoPts[0]);
        var sidePoint2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[0], geoPts[1]);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidePoint1.pntLeft,sidePoint1.pntRight]);
        //创建尾部垂线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidePoint2.pntLeft,sidePoint2.pntRight]);

        //*********************************上面那条线*********************************
        var ptsCenterLeft = [];
        var ptsCenterRight = [];
        ptsCenterLeft.push(new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y));
        ptsCenterLeft.push(new SuperMap.Geometry.Point(ptLeft.x, ptLeft.y));

        ptsCenterRight.push(new SuperMap.Geometry.Point(ptRight.x, ptRight.y));
        ptsCenterRight.push(new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y));

        var ptsUpLeft = SuperMap.Plot.PlottingUtil.paraLine(ptsCenterLeft, ddis, true);
        var ptsUpRight = SuperMap.Plot.PlottingUtil.paraLine(ptsCenterLeft, ddis, false);
        var ptsDownLeft = SuperMap.Plot.PlottingUtil.paraLine(ptsCenterRight, ddis, true);
        var ptsDownRight = SuperMap.Plot.PlottingUtil.paraLine(ptsCenterRight, ddis, false);

        //创建上面直线
        var ptsLineUpLeft = [];
        var ptsLineUpRight = [];
        for (var n = 0; n < ptsUpLeft.length; n++) {
            ptsLineUpLeft.push(ptsUpLeft[n]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineUpLeft);

        for (var k = 0; k < ptsUpRight.length; k++) {
            ptsLineUpRight.push(ptsUpRight[k]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineUpRight);

        //*********************************下面那条线*********************************
        //创建上面直线
        var ptsLineDownLeft = [];
        var ptsLineDownRight = [];
        for (var j = 0; j < ptsDownLeft.length; j++) {
            ptsLineDownLeft.push(ptsDownLeft[j]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineDownLeft);

        for (var m = 0; m < ptsDownRight.length; m++) {
            ptsLineDownRight.push(ptsDownRight[m]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineDownRight);
        //子符号
        var dAngle = SuperMap.Plot.PlottingUtil.radian(geoPts[0], geoPts[1]) * this.RTOD;
        this.computeSubSymbol(this.subSymbols[0], ptCenter, 2 * ddis, dAngle);

        //计算比例点
        if (this.isEdit) {
            this.addScalePoint(sidePoint1.pntRight, 0);
        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31303"
});
