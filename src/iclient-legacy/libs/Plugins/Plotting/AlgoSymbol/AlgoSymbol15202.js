/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol15202 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.scaleValues.push(parseFloat(0.1732));
        this.scaleValues.push(0.1);
        this.scaleValues.push(1.0);

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

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geoPts);

        //创建第一条折线图元
        var startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var endPt2D = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
        var dMainLineDistance = SuperMap.Plot.PlottingUtil.distance(startPt2D, endPt2D);

        //获取第0个比例值，箭头长/主线长度
        var firstScaleValue = this.scaleValues[0];
        var dArrowLength = firstScaleValue * dMainLineDistance;        //箭头长度

        //获取第一个比例值，箭头宽度/主线长度
        var secondScaleValue = this.scaleValues[1];
        var dArrowWidth = secondScaleValue * dMainLineDistance;        //箭头宽度

        //用于控制是否在延长线上
        var thirdScaleValue = this.scaleValues[2];

        //箭头的点在主线上的垂足
        var footPt = null;
        if (1.0 === thirdScaleValue)       //在延长线上
        {
            var footPt2D = SuperMap.Plot.PlottingUtil.LinePnt(endPt2D, startPt2D, dMainLineDistance + dArrowLength);
            footPt = new SuperMap.Geometry.Point(footPt2D.x, footPt2D.y);
        } else {
            //不在延长线上
            footPt2D = SuperMap.Plot.PlottingUtil.LinePnt(endPt2D, startPt2D, dMainLineDistance - dArrowLength);
            footPt = new SuperMap.Geometry.Point(footPt2D.x, footPt2D.y);
        }
        //求起始几何点的箭头的两点
        var sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArrowWidth * 0.5, geoPts[0], footPt);
        var startPts = [];
        startPts.push(sidepoints.pntRight);
        startPts.push(geoPts[0]);
        startPts.push(sidepoints.pntLeft);
        //添加起始点上折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, startPts);
        //计算终止点的两个箭头的点
        var endPts = [];
        var midPt = new SuperMap.Geometry.Point((geoPts[0].x + geoPts[1].x) / 2, (geoPts[0].y + geoPts[1].y) / 2);

        if (1.0 === thirdScaleValue) {
            var endUpPt = new SuperMap.Geometry.Point(midPt.x * 2.0 - sidepoints.pntLeft.x, midPt.y * 2.0 - sidepoints.pntLeft.y);
            endPts.push(endUpPt);
            endPts.push(geoPts[1]);

            var endDownPt = new SuperMap.Geometry.Point(midPt.x * 2.0 - sidepoints.pntRight.x, midPt.y * 2.0 - sidepoints.pntRight.y);
            endPts.push(endDownPt);

        } else {
            endUpPt = new SuperMap.Geometry.Point(midPt.x * 2.0 - sidepoints.pntRight.x, midPt.y * 2.0 - sidepoints.pntRight.y);
            endPts.push(endUpPt);
            endPts.push(geoPts[1]);

            endDownPt = new SuperMap.Geometry.Point(midPt.x * 2.0 - sidepoints.pntLeft.x, midPt.y * 2.0 - sidepoints.pntLeft.y);
            endPts.push(endDownPt);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, endPts);
        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol15202"
});