/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29101 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        SuperMap.Geometry.AlgoSymbol29100.prototype.initialize.apply(this, arguments);
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
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        }
        else {
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        //添加三角形
        for (var i = 0; i < 4; i++) {
            var index = i * (shapePts.length - 1 ) / 4;
            var pt1 = new SuperMap.Geometry.Point(shapePts[index].x, shapePts[index].y);
            var pt2 = new SuperMap.Geometry.Point(shapePts[index + 1].x, shapePts[index + 1].y);
            //获取中心点
            var midPt = new SuperMap.Geometry.Point((pt1.x + pt2.x) / 2, (pt1.y + pt2.y) / 2);

            //两点间的角度
            var angle = SuperMap.Plot.PlottingUtil.radian(midPt, pt2) * this.RTOD;

            var radius = this.scaleValues[0] * allDistance / 2;

            var temp1 = SuperMap.Plot.PlottingUtil.circlePoint(midPt, radius, radius, angle);
            var temp2 = SuperMap.Plot.PlottingUtil.circlePoint(midPt, radius * 4, radius * 4, angle + 270);
            var temp3 = SuperMap.Plot.PlottingUtil.circlePoint(midPt, radius, radius, angle + 180);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [temp1, temp2, temp3]);
        }


        this.clearBounds();
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol29101"
});