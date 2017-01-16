/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol31300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geoPts);
        //获取一小段的距离
        var ddis = this.scaleValues[0] * allDistance;

        //创建头部垂
        var rightLine = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[0], geoPts[1]);
        var leftLine = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis, geoPts[1], geoPts[0]);
        //右边
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [rightLine.pntLeft, rightLine.pntRight]);
        //左边
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [leftLine.pntLeft, leftLine.pntRight]);
        //计算比例点
        if (this.isEdit) {
            this.addScalePoint(leftLine.pntRight, 0);
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

        if (index === 0) {
            var startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            var scalePt2D = new SuperMap.Geometry.Point(pt.x, pt.y);
            var distance = SuperMap.Plot.PlottingUtil.distance(scalePt2D, startPt2D);

            var dScale = distance / allDistance;
            this.scaleValues[0] = dScale;
        }
        this.calculateParts();
    },
    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol31300"
});
