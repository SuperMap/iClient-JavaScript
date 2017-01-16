/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol27900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.scaleValues.push(0.25);

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
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,geoPts);
        //计算圆（外）的半径
        var dRadius = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);
        //创建外圆图元（内）
        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:true,fillStyle:0,fillColor:"#ffff00"};
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,[geoPts[0], new SuperMap.Geometry.Point(geoPts[0].x-dRadius * this.scaleValues[0],geoPts[0].y)],style);

        //添加比例点
        if(this.isEdit){
            this.addScalePoint(new SuperMap.Geometry.Point(geoPts[0].x + dRadius * this.scaleValues[0], geoPts[0].y), 0);
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
            var pt0 = new SuperMap.Geometry.Point(this.controlPoints[0].x, this.controlPoints[0].y);
            var pt1 = new SuperMap.Geometry.Point(this.controlPoints[1].x, this.controlPoints[1].y);
            var pt2 = new SuperMap.Geometry.Point(pt.x, pt.y);

            var dDistance = SuperMap.Plot.PlottingUtil.distance(pt0, pt2);
            var dRadius = SuperMap.Plot.PlottingUtil.distance(pt0, pt1);

            var dScale = dDistance / dRadius;

            if (0.9 < dScale) {
                return;
            }

            this.scaleValues[0] = dScale;
        }

        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol27900"
});