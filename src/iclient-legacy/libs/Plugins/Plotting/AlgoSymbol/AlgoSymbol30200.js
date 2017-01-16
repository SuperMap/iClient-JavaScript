/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues.push(1000);
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.1);
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

        if (!this.isEdit) {
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }

        var dDistance = allDistance * this.scaleValues[1];

        var startBezierPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dDistance);
        if (startBezierPt.index === -1) {
            return;
        }

        var startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var startBezierPt2D = new SuperMap.Geometry.Point(startBezierPt.pt.x, startBezierPt.pt.y);
        var angle = SuperMap.Plot.PlottingUtil.radian(startPt2D, startBezierPt2D) * this.RTOD;

        //起始符号
        //矩形
        var pt1 = new SuperMap.Geometry.Point(0, 0.1 * dDistance);
        var pt2 = new SuperMap.Geometry.Point(0.4 * dDistance, 0.1 * dDistance);
        var pt3 = new SuperMap.Geometry.Point(0.4 * dDistance, -0.1 * dDistance);
        var pt4 = new SuperMap.Geometry.Point(0, -0.1 * dDistance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt1, angle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt2, angle);
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt3, angle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt4, angle);

        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt1, tempPt2, tempPt3, tempPt4, tempPt1], style);

        //添加下面的两个分叉
        var distance = this.getSubSymbolScaleValue() * dDistance;
        var pt5 = new SuperMap.Geometry.Point(0.3 * dDistance, 0);
        var pt6 = SuperMap.Plot.PlottingUtil.circlePoint(pt5, distance, distance, 135);
        var pt7 = SuperMap.Plot.PlottingUtil.circlePoint(pt5, distance, distance, 225);
        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt5, angle);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt6, angle);
        var tempPt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt7, angle);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt6, tempPt5, tempPt7]);

        //横线
        var pt8 = new SuperMap.Geometry.Point(0.9 * dDistance, 0);
        var tempPt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt8, angle);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt5, tempPt8]);

        //三角形
        var pt10 = new SuperMap.Geometry.Point(0.8 * dDistance, 0.025 * dDistance);
        var pt11 = new SuperMap.Geometry.Point(0.8 * dDistance, -0.025 * dDistance);
        var tempPt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt10, angle);
        var tempPt11 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D, pt11, angle);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [tempPt8, tempPt10, tempPt11], style);

        //画剩下的贝赛尔曲线
        var pts2D = [];
        pts2D.push(startBezierPt.pt);
        for (var i = startBezierPt.index + 1; i < shapePts.length; i++) {
            pts2D.push(shapePts[i]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //末端三角形
        var lineStart = shapePts[shapePts.length - 2].clone();
        var lineend = shapePts[shapePts.length - 1].clone();
        var Arrowangle = SuperMap.Plot.PlottingUtil.radian(lineStart, lineend) * this.RTOD;
        //把最后一个点去掉
        var secondPtsTemp = [];
        for (var i = 0; i < shapePts.length - 1; i++) {
            secondPtsTemp.push(shapePts[i]);
        }
        //箭头大小
       this.addArrow(shapePts);

        //设置比例点
        if (this.isEdit) {
            var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(startPt2D, dDistance, dDistance, angle + 90);
            this.addScalePoint(scalePt, 0);
        }
        this.clearBounds();
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        var startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var scalePt2D = new SuperMap.Geometry.Point(pt.x, pt.y);
        var dDistance = SuperMap.Plot.PlottingUtil.distance(scalePt2D, startPt2D);

        if (index === 0) {
            var dScale1 = dDistance / allDistance;
            if (0.06 > dScale1 || 0.3 < dScale1) {
                return;
            }
            this.scaleValues[1] = dScale1;
        }

        this.calculateParts();
    },
    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30200"
});
