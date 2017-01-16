/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30102 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol30100, {

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

        this.scaleValues = [];
        this.scaleValues.push(0.5);		//从第一定位点到线上箭头的曲线距离/曲线总长
        this.scaleValues.push(Math.PI / 2.0);	//箭头线段与它在曲线上基底位置的切线组成的夹角（弧度）
        this.scaleValues.push(0.069485);
        this.scaleValues.push(0.15);
        this.scaleValues.push(0.1);
        this.scaleValues.push(1.731025);
        this.scaleValues.push(2.076877);
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

        if (!this.isEdit) {
            this.scaleValues[2] = this.getSubSymbolScaleValue();
        }

        //求开始点到中点的距离
        var dArrowdis = allDistance * this.scaleValues[0];//箭头的位置距离
        var scaleAngle = this.scaleValues[1] * 180 / Math.PI;//箭头的角度
        var distance = allDistance * this.scaleValues[2];//箭头的大小

        //获取折线的中心点
        var center = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dArrowdis);
        if (center.index === -1) {
            return;
        }
        var nIndex = center.index;
        var center2D = center.pt;

        var ptStart = new SuperMap.Geometry.Point(shapePts[nIndex].x, shapePts[nIndex].y);
        var ptEnd = new SuperMap.Geometry.Point(shapePts[nIndex + 1].x, shapePts[nIndex + 1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd) * 180 / Math.PI;

        var ptLine1 = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance / 2, distance / 2, angle + scaleAngle);
        var ptLine2 = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance, distance, angle + scaleAngle + 180);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [ptLine1, ptLine2]);

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, ptLine1) * 180 / Math.PI;
        //箭头三角形
        var pt1 = new SuperMap.Geometry.Point(-0.2 * distance, 0.05 * distance);
        var pt2 = new SuperMap.Geometry.Point(-0.2 * distance, -0.05 * distance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine1, pt1, tempAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine1, pt2, tempAngle);

        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [ptLine1, tempPt1, tempPt2], style);

        //添加线
        var dScale5 = this.scaleValues[5];
        var distance5 = 0.25 * distance * dScale5;
        var dScale6 = this.scaleValues[6];
        var distance6 = 0.25 * distance * dScale6;
        var pt3 = new SuperMap.Geometry.Point(0, -0.9 * (distance5 - 0.25 * distance6));
        var pt4 = new SuperMap.Geometry.Point(0, 0.9 * (distance5 - 0.25 * distance6));
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine2, pt3, tempAngle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine2, pt4, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt3, tempPt4]);

        //左菱形
        var ptLeft = new SuperMap.Geometry.Point(0, distance5);
        var tempPtLeft = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine2, ptLeft, tempAngle);
        var ptL1 = new SuperMap.Geometry.Point(0.5 * distance6, -0.25 * distance6);
        var ptL2 = new SuperMap.Geometry.Point(-0.5 * distance6, -0.25 * distance6);
        var ptL3 = new SuperMap.Geometry.Point(-0.5 * distance6, 0.25 * distance6);
        var ptL4 = new SuperMap.Geometry.Point(0.25 * distance6, 0.25 * distance6);
        var tempPtL1 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, ptL1, tempAngle);
        var tempPtL2 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, ptL2, tempAngle);
        var tempPtL3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, ptL3, tempAngle);
        var tempPtL4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, ptL4, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPtL1, tempPtL2, tempPtL3, tempPtL4, tempPtL1]);


        //右菱形
        var ptRight = new SuperMap.Geometry.Point(0, -distance5);
        var tempPtRight = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine2, ptRight, tempAngle);
        var ptR1 = new SuperMap.Geometry.Point(0, 0.25 * distance6);
        var ptR2 = new SuperMap.Geometry.Point(0.5 * distance6, 0);
        var ptR3 = new SuperMap.Geometry.Point(0, -0.25 * distance6);
        var ptR4 = new SuperMap.Geometry.Point(-0.5 * distance6, 0);
        var tempPtR1 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, ptR1, tempAngle);
        var tempPtR2 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, ptR2, tempAngle);
        var tempPtR3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, ptR3, tempAngle);
        var tempPtR4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, ptR4, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPtR1, tempPtR2, tempPtR3, tempPtR4, tempPtR1]);

        //添加比例点
        if (this.isEdit) {

            this.addScalePoint(center2D, 0);
            var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance, distance, angle + scaleAngle);
            this.addScalePoint(tempPt, 1);

            var pt9 = new SuperMap.Geometry.Point(0, -distance5);
            var tempPt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptLine2, pt9, tempAngle);
            this.addScalePoint(tempPt9, 2);

            var pt10 = new SuperMap.Geometry.Point(-0.5 * distance6, 0);
            var tempPt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt10, tempAngle);
            this.addScalePoint(tempPt10, 3);
        }

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30102"
});
