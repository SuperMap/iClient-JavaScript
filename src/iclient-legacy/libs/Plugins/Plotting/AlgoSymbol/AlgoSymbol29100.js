/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 3;

        this.scaleValues = [];
        this.scaleValues.push(0.05);
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
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //设置子标号大小比例值
        if (!this.isEdit) {
            this.scaleValues[0] = this.getSubSymbolScaleValue() * 0.5;
        }
        var shapePts = [];
        if (3 >= geoPts.length) {
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
            SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        }
        else {
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);
        //计算四个三角形
        for (var i = 0; i < 4; i++)
        {
            var index = Math.floor(i * (shapePts.length) / 4);

            var tempPt11 = new SuperMap.Geometry.Point(shapePts[index].x, shapePts[index].y);
            var tempPt12 = new SuperMap.Geometry.Point(shapePts[index + 1].x, shapePts[index + 1].y);

            var midPt = new SuperMap.Geometry.Point((tempPt11.x + tempPt12.x) / 2, (tempPt11.y + tempPt12.y) / 2);

            var angle = SuperMap.Plot.PlottingUtil.radian(tempPt12, midPt) * this.RTOD;
            var radius = this.scaleValues[0] * allDistance / 2;
            var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(midPt, radius, radius, angle);
            var tempPt2 = SuperMap.Plot.PlottingUtil.circlePoint(midPt, radius * 4, radius * 4, angle + 270);

            var tempPt3 = SuperMap.Plot.PlottingUtil.circlePoint(midPt, radius, radius, angle + 180);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [
                tempPt1, tempPt2, tempPt3
            ], {
                lineTypeLimit: true,
                surroundLineLimit: true
            });
        }
        this.clearBounds();
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol29100"
});