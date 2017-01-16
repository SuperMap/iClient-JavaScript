/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29103 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        SuperMap.Geometry.AlgoSymbol21900.prototype.initialize.apply(this, arguments);

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

        for (var i = 0; i < 4; i++) {
            //设置索引
            var index = i * (shapePts.length - 1) / 4;
            //第一个点
            var tempPt11 = new SuperMap.Geometry.Point(shapePts[index].x, shapePts[index].y);
            //第二个点
            var tempPt12 = new SuperMap.Geometry.Point(shapePts[index + 1].x, shapePts[index + 1].y);
            //中间点
            var tempPt13 = new SuperMap.Geometry.Point((tempPt11.x + tempPt12.x) / 2, (tempPt11.y + tempPt12.y) / 2);
            var angle = SuperMap.Plot.PlottingUtil.radian(tempPt13, tempPt12) * 180 / Math.PI;
            var radius = allDistance * this.scaleValues[0] / 2;

            var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(tempPt13, radius, radius, angle);
            var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempPt13, radius * 4, radius * 4, angle + 270);
            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(tempPt13, radius, radius, angle + 180);
            var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt1, pt2, pt3], style);
        }

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol29103"
});