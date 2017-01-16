/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol4020401 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol30100, {


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
        SuperMap.Geometry.AlgoSymbol30100.prototype.initialize.apply(this, arguments);

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
        var scaleAngle = this.scaleValues[1] * this.RTOD;//箭头的角度
        var distance = allDistance * this.scaleValues[2];//半径大小

        //获取折线的中心点
        var centerPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dArrowdis);
        if (centerPt.index === -1) {
            return;
        }
        var center = centerPt.pt;
        var nIndex = centerPt.index;

        var center2D = new SuperMap.Geometry.Point(center.x, center.y);
        var ptStart = new SuperMap.Geometry.Point(shapePts[nIndex].x, shapePts[nIndex].y);
        var ptEnd = new SuperMap.Geometry.Point(shapePts[nIndex + 1].x, shapePts[nIndex + 1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd) * this.RTOD;

        var pt = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance * 1.5, distance * 1.5, angle + scaleAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [center, pt]);

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, pt) * this.RTOD;

        //箭头三角形
        var pt1 = new SuperMap.Geometry.Point(-0.2 * distance, 0.05 * distance);
        var pt2 = new SuperMap.Geometry.Point(-0.2 * distance, -0.05 * distance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt1, tempAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt2, tempAngle);
        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt, tempPt1, tempPt2], style);

        //箭头的0.4
        var ptCenter = new SuperMap.Geometry.Point(0.6 * distance, 0);
        var tempPtCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, ptCenter, tempAngle);

        var dScale5 = this.scaleValues[5];
        var distance5 = 0.4 * distance * dScale5;

        var dScale6 = this.scaleValues[6];
        var distance6 = 0.4 * distance * dScale6;

        var pt3 = new SuperMap.Geometry.Point(0, -0.9 * (distance5 - 0.25 * distance6));
        var pt4 = new SuperMap.Geometry.Point(0, 0.9 * (distance5 - 0.25 * distance6));

        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, pt3, tempAngle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, pt4, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt3, tempPt4]);

        //左边子符号
        var ptLeft = new SuperMap.Geometry.Point(0, distance5);
        var tempPtLeft = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, ptLeft, tempAngle);


        var pt5 = new SuperMap.Geometry.Point(0.5 * distance6, -0.25 * distance6);
        var pt6 = new SuperMap.Geometry.Point(-0.5 * distance6, -0.25 * distance6);
        var pt7 = new SuperMap.Geometry.Point(-0.5 * distance6, 0.25 * distance6);
        var pt8 = new SuperMap.Geometry.Point(0.25 * distance6, 0.25 * distance6);

        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt5, tempAngle + 180);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt6, tempAngle + 180);
        var tempPt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt7, tempAngle + 180);
        var tempPt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt8, tempAngle + 180);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt5, tempPt6, tempPt7, tempPt8, tempPt5]);

        //右菱形
        var ptRight = new SuperMap.Geometry.Point(0, -distance5);
        var tempPtRight = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, ptRight, tempAngle);

        var tempPtR1 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt5, tempAngle + 180);
        var tempPtR2 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt6, tempAngle + 180);
        var tempPtR3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt7, tempAngle + 180);
        var tempPtR4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt8, tempAngle + 180);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPtR1, tempPtR2, tempPtR3, tempPtR4, tempPtR1]);

        //添加比例点
        if (this.isEdit) {
            this.addScalePoint(center,0);
            this.addScalePoint(pt,1);
            var pt9 = new SuperMap.Geometry.Point(0,-distance5);
            var tempPt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter,pt9,tempAngle);
            this.addScalePoint(tempPt9,2);
            this.addScalePoint(tempPt8,3);
        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol4020401"
});
