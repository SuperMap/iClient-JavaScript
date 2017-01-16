/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol15804 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol15800, {


    RATIO_PLUMBLENGTH: 0.3,

    RATIO_TWOLINEDISTANCE: 0.15,

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
        SuperMap.Geometry.AlgoSymbol15800.prototype.initialize.apply(this, arguments);
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
        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        var shapePts = allPoints;
        //清理重复的点
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        //第0个比例值是折线高度的一半/各定位点间折线总长
        var firstScaleValue = this.scaleValues[0];
        var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //折线高度的一半
        var dHalfLine = firstScaleValue * allPolyLineDistance;
        //第2个比例值是折线间隔/各定位点间折线总长
        var thirdScaleValue = this.scaleValues[2];
        //折线间隔距离的距离
        var dLineInterval = thirdScaleValue * allPolyLineDistance * 0.5;
        //第一个比例值是折线方向，左侧为0，右侧为1
        var secondScaleValue = this.scaleValues[1];
        //判定方向
        var bLeft = false;
        if (secondScaleValue === 0) {
            bLeft = true;
        } else {
            bLeft = false;
        }
        var dAllLength = SuperMap.Plot.PlottingUtil.polylineDistance(allPoints);

        if (dAllLength === 0.0) {
            return;
        }
        var midPt = new SuperMap.Geometry.Point(0.0, 0.0);
        var mainLinePts = [];
        for (var d = 0.0; d <= dAllLength; d += dLineInterval) {
            //求贝塞尔折线段上距离起点为d的点
            var pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d);
            if (pntPathTextStart.index < 0) {
                continue;
            }
            var sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dHalfLine, shapePts[pntPathTextStart.index + 1], pntPathTextStart.pt);
            //添加折线的起始点
            if (bLeft) {
                mainLinePts.push(sidepoints.pntRight);
            }
            else {
                mainLinePts.push(sidepoints.pntLeft);
            }
            //添加比例点
            if (Math.abs(d) <= 1E-6) {
                this.scalePoints = [];
                var scalePoint = new SuperMap.Geometry.Point(mainLinePts[0].x, mainLinePts[0].y);
                scalePoint.isScalePoint = true;
                scalePoint.tag = 0;
                this.scalePoints.push(scalePoint);
            }
            else if (Math.abs(dLineInterval * 2 - d) <= 1E-6) {
                scalePoint = new SuperMap.Geometry.Point(pntPathTextStart.pt.x, pntPathTextStart.pt.y);
                scalePoint.isScalePoint = true;
                scalePoint.tag = 1;
                this.scalePoints.push(scalePoint);
            }

            bLeft = !bLeft;
        }

        //生成折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, mainLinePts);


        //生成桩
        var nMainPts = mainLinePts.length;
        var dLen = 0.0;    //垂直线的距离
        for (var i = 0; i < (nMainPts - 1); ++i) {
            var tempPt1 = new SuperMap.Geometry.Point(mainLinePts[i].x, mainLinePts[i].y);
            var tempPt2 = new SuperMap.Geometry.Point(mainLinePts[i + 1].x, mainLinePts[i + 1].y);
            dLen = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2) * this.RATIO_PLUMBLENGTH;
            //求第一个桩
            var linePts = [];
            var pt = SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio(0.5 - this.RATIO_TWOLINEDISTANCE, mainLinePts[i], mainLinePts[i + 1]);

            //生成靠近起点垂直点
            var firstPts = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLen * 0.5, mainLinePts[i], pt);
            //线段数组
            linePts.push(firstPts.pntRight);

            //线段中点
            midPt = new SuperMap.Geometry.Point((mainLinePts[i].x + mainLinePts[i + 1].x) / 2, (mainLinePts[i].y + mainLinePts[i + 1].y) / 2);
            var rightPt = new SuperMap.Geometry.Point(midPt.x * 2 - firstPts.pntLeft.x, midPt.y * 2 - firstPts.pntLeft.y);

            var seconds = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLen * this.RATIO_PLUMBLENGTH, mainLinePts[i], midPt);
            linePts.push(seconds.pntLeft);
            linePts.push(rightPt);

            //生成第一根桩折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts);
        }
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol15804"
});