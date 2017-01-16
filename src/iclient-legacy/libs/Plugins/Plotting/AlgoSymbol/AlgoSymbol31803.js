/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31803 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        if(0 === this.subSymbols.length){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8402));
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
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //求开始点到中点的距离
        var dArrowdis = allDistance * 0.5;//箭头的位置距离
        var scaleAngle = 90;//箭头的角度
        var dArrowLength = allDistance * this.getSubSymbolScaleValue();//箭头的大小
        var centerDis = dArrowLength;

        //获取折线的中心点
        var resultPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dArrowdis);
        if (resultPt.index === -1) {
            return;
        }
        var centerPt = resultPt.pt;
        var lineStratPt = new SuperMap.Geometry.Point(shapePts[resultPt.index].x, shapePts[resultPt.index].y);
        var lineEndPt = new SuperMap.Geometry.Point(shapePts[resultPt.index + 1].x, shapePts[resultPt.index + 1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(lineStratPt, lineEndPt) * 180 / Math.PI;
        //箭头点
        var pt = SuperMap.Plot.PlottingUtil.circlePoint(centerPt, dArrowLength, dArrowLength, angle + scaleAngle);
        //添加折线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [centerPt, pt]);
        var tempAngle = SuperMap.Plot.PlottingUtil.radian(centerPt, pt) * 180 / Math.PI;
        //箭头三角形
        var pt1 = new SuperMap.Geometry.Point(-0.2 * dArrowLength, 0.05 * dArrowLength);
        var pt2 = new SuperMap.Geometry.Point(-0.2 * dArrowLength, -0.05 * dArrowLength);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt1, tempAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt2, tempAngle);

        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt, tempPt1, tempPt2], style);

        //直升机
        var symbolPt = new SuperMap.Geometry.Point(0, -0.6 * centerDis);
        symbolPt = SuperMap.Plot.PlottingUtil.coordinateTrans(centerPt, symbolPt, angle);

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], symbolPt, centerDis, angle - 90);
        }

        this.clearBounds();
    },



    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31803"
});
