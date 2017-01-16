/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31304 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol31300, {
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

        var ddis = this.scaleValues[0] * allDistance;

        var ptCenter = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[0], geoPts[1], 0.5 * allDistance);
        //求两个断点
        var ptLeft = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, geoPts[0], ddis);
        var ptRight = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, geoPts[1], ddis);


        //创建头部垂线

        var sidePoint1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(2 * ddis, geoPts[1], geoPts[0]);
        var sidePoint2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(2 * ddis, geoPts[0], geoPts[1]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidePoint1.pntLeft, sidePoint1.pntRight]);

        //创建尾部垂线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidePoint2.pntLeft, sidePoint2.pntRight]);

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
        for (var i = 0; i < ptsUpLeft.length; i++) {
            ptsLineUpLeft.push(ptsUpLeft[i]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineUpLeft);

        for (var j = 0; j < ptsUpRight.length; j++) {
            ptsLineUpRight.push(ptsUpRight[j]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineUpRight);

        //*********************************下面那条线*********************************
        //创建上面直线
        var ptsLineDownLeft = [];
        var ptsLineDownRight = [];
        for (var m = 0; m < ptsDownLeft.length; m++) {
            ptsLineDownLeft.push(ptsDownLeft[m]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineDownLeft);

        for (var n = 0; n < ptsDownRight.length; n++) {
            ptsLineDownRight.push(ptsDownRight[n]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLineDownRight);
        //文字
        var ptLeftEnd = ptLeft;
        var ptRightStart = ptRight;

        var dAngle = SuperMap.Plot.PlottingUtil.radian(ptLeftEnd, ptRightStart) * this.RTOD;
        var dWidth = SuperMap.Plot.PlottingUtil.distance(ptLeftEnd, ptRightStart);

        var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit: true};
        style.labelAlign = "cm";
        style.labelRotation = -dAngle;
        this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, ptCenter, style, true, SuperMap.i18n("symbolAlgo_31304"));

        //计算比例点
        if (this.isEdit) {
            this.addScalePoint(sidePoint1.pntRight, 0);
        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31304"
});
