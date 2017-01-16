/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16201 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol16200, {
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
        this.scaleValues.push(0.1);
        this.scaleValues.push(0);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        //计算贝塞尔曲线拟合点
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue() * 0.5;
        }

        var subLineLen = this.scaleValues[0] * allDistance;

        //贝塞尔曲线的平行线
        var leftBezierPts = [], rightBezierPts = [];
        //求贝塞尔曲线的左边的平行线
        leftBezierPts = SuperMap.Plot.PlottingUtil.paraLine(shapePts, subLineLen, true);
        //求贝塞尔曲线的右边的平行线
        rightBezierPts = SuperMap.Plot.PlottingUtil.paraLine(shapePts, subLineLen, false);

        leftBezierPts = SuperMap.Plot.PlottingUtil.clearSamePts(leftBezierPts);
        rightBezierPts = SuperMap.Plot.PlottingUtil.clearSamePts(rightBezierPts);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, leftBezierPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, rightBezierPts);

        var lineStepDis = allDistance * this.scaleValues[1];

        var startDis = subLineLen * 1.5;

        var curveDis = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        for(var d = startDis, index = 0; d < curveDis; d += lineStepDis, index++){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,d);
            if(-1 === result.index){
                continue;
            }

            var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(subLineLen,shapePts[result.index+1],result.pt);

            var linePts = [];
            linePts.push(result.pt);
            linePts.push(leftAndRightPt.pntRight);
            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, linePts);

            if(0 === index){
                this.addScalePoint(leftAndRightPt.pntRight,1);
            }
            else if(1 === index){
                this.addScalePoint(result.pt,1);
            }
        }

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16201"
});
