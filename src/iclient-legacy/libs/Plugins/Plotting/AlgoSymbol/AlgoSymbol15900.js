/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol15900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol15800, {
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

        this.scaleValues.push(0.02);
        this.scaleValues.push(1);
        this.scaleValues.push(0.05);
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
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        //折线高度的一半
        var halfLine = allDistance * this.scaleValues[0];
        //折线间隔距离的距离
        var lineInterval = allDistance * this.scaleValues[2];
        //第一个比例值是折线方向，左侧为0，右侧为1
        var isLeft = false;
        //判定方向
        if (0 === this.scaleValues[0]) {
            isLeft = true;
        }
        else {
            isLeft = false;
        }

        //当前点距离起点的距离
        var shapePtsLen = 0;
        for (var i = 0; i < shapePts.length - 1; i++) {
            shapePtsLen += SuperMap.Plot.PlottingUtil.distance(shapePts[i], shapePts[i + 1]);
        }

        if (0 === shapePtsLen) {
            return;
        }

        for (var d = 0.0; d <= shapePtsLen; d += lineInterval) {
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d);
            if (-1 === result.index) {
                continue;
            }

            var linePts = [];
            var rightAndLeftPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(halfLine, shapePts[result.index + 1], result.pt);

            if (isLeft) {
                linePts.push(rightAndLeftPt1.pntRight);
            }
            else {
                linePts.push(rightAndLeftPt1.pntLeft);
            }

            var nextDis = d + lineInterval;
            var result2 = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, nextDis);
            if (-1 === result2.index) {
                continue;
            }

            var rightAndLeftPt2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(halfLine, shapePts[result2.index + 1], result2.pt);

            if (isLeft) {
                linePts.push(rightAndLeftPt2.pntLeft);
            }
            else {
                linePts.push(rightAndLeftPt2.pntRight);
            }
            //比例点
            if (Math.abs(d) < 1E-6) {
                //第一个
                this.addScalePoint(linePts[0], 0);
                //第二个
                this.addScalePoint(result2.pt, 1);
            }

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts);
        }

        this.clearBounds();
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol15900"
});
