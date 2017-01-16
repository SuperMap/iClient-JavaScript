/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol27902 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol27900, {


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
        SuperMap.Geometry.AlgoSymbol27900.prototype.initialize.apply(this, arguments);


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

        //创建外圆图元（外）
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, geoPts);
        //计算圆（外）的半径
        var dRadius = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
        //创建外圆图元（内）
        var style = {
            surroundLineFlag: false,
            fillLimit: true,
            fillColorLimit: true,
            fillStyle: 0,
            fillColor: "#ffff00"
        };
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [geoPts[0], new SuperMap.Geometry.Point(geoPts[0].x - dRadius * this.scaleValues[0], geoPts[0].y)], style);


        //添加折线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [new SuperMap.Geometry.Point(geoPts[0].x + dRadius * (this.scaleValues[0] + 0.1), geoPts[0].y + dRadius * this.scaleValues[0]), new SuperMap.Geometry.Point(geoPts[0].x - dRadius * (this.scaleValues[0] + 0.1), geoPts[0].y + dRadius * this.scaleValues[0])]);

        //添加比例点
        if (this.isEdit) {
            this.addScalePoint(new SuperMap.Geometry.Point(geoPts[0].x + dRadius * this.scaleValues[0], geoPts[0].y), 0);
        }
        this.clearBounds();
    },



    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol27902"
});