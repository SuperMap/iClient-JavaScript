/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol27700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues.push(0.1);

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
        var dScale = this.scaleValues[0];
        //获取缩放距离
        var dDistance = dScale * allDistance;

        //计算平行线
        var leftLinePts = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, true);
        var rightLinePts = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, false);
        //添加线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, leftLinePts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, rightLinePts);

        //开始点
        var startPt = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var endPt = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);

        //设置旋转角度
        var centerAngle = SuperMap.Plot.PlottingUtil.radian(startPt, endPt) * 180 / Math.PI;
        if (90 < centerAngle && centerAngle < 270) {
            var tempPt = startPt;
            startPt = endPt;
            endPt = tempPt;
            centerAngle = SuperMap.Plot.PlottingUtil.radian(startPt, endPt) * 180 / Math.PI;
        }

        //计算左边的符号
        var pt1_1 = new SuperMap.Geometry.Point(0.25 * allDistance, 0);
        var pt1_2 = new SuperMap.Geometry.Point(0.25 * allDistance + 0.2 * dDistance, 0.3 * dDistance);
        var pt1_3 = new SuperMap.Geometry.Point(0.25 * allDistance + 0.2 * dDistance, -0.3 * dDistance);

        var tempPt1_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt1_1, centerAngle);
        var tempPt1_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt1_2, centerAngle);
        var tempPt1_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt1_3, centerAngle);

        var pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt1_2.x, tempPt1_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt1_1.x, tempPt1_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt1_3.x, tempPt1_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);


        var pt2_1 = new SuperMap.Geometry.Point(0.3 * allDistance, 0);
        var pt2_2 = new SuperMap.Geometry.Point(0.3 * allDistance + 0.2 * dDistance, 0.3 * dDistance);
        var pt2_3 = new SuperMap.Geometry.Point(0.3 * allDistance + 0.2 * dDistance, -0.3 * dDistance);

        var tempPt2_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt2_1, centerAngle);
        var tempPt2_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt2_2, centerAngle);
        var tempPt2_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt2_3, centerAngle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt2_2.x, tempPt2_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt2_1.x, tempPt2_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt2_3.x, tempPt2_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var pt3_1 = new SuperMap.Geometry.Point(0.7 * allDistance, 0);
        var pt3_2 = new SuperMap.Geometry.Point(0.7 * allDistance + 0.2 * dDistance, 0.3 * dDistance);
        var pt3_3 = new SuperMap.Geometry.Point(0.7 * allDistance + 0.2 * dDistance, -0.3 * dDistance);

        var tempPt3_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt3_1, centerAngle);
        var tempPt3_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt3_2, centerAngle);
        var tempPt3_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt3_3, centerAngle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt3_2.x, tempPt3_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt3_1.x, tempPt3_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt3_3.x, tempPt3_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var pt4_1 = new SuperMap.Geometry.Point(0.75 * allDistance, 0);
        var pt4_2 = new SuperMap.Geometry.Point(0.75 * allDistance + 0.2 * dDistance, 0.3 * dDistance);
        var pt4_3 = new SuperMap.Geometry.Point(0.75 * allDistance + 0.2 * dDistance, -0.3 * dDistance);

        var tempPt4_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt4_1, centerAngle);
        var tempPt4_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt4_2, centerAngle);
        var tempPt4_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, pt4_3, centerAngle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt4_2.x, tempPt4_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt4_1.x, tempPt4_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt4_3.x, tempPt4_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);


        //添加比例点
        if (this.isEdit) {
            this.addScalePoint(leftLinePts[0], 0);
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
        if (index === 0) {
            var allDistance = 0;
            for (var i = 0; i < this.controlPoints.length - 1; i++) {
                allDistance += SuperMap.Plot.PlottingUtil.distance(this.controlPoints[i], this.controlPoints[i + 1]);
            }
            var dDistance = SuperMap.Plot.PlottingUtil.distance(this.controlPoints[0], pt);

            var dScale1 = dDistance / allDistance;

            this.scaleValues[0] = dScale1;

        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol27700"
});