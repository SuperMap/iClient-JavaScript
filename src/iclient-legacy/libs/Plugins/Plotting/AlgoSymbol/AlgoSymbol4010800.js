/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol4010800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol23500, {


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
        SuperMap.Geometry.AlgoSymbol23500.prototype.initialize.apply(this, arguments);

        if (this.subSymbols >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 1300));
        }

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts) {
            return;
        }

        if (4 > this.scaleValues.length) {
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
        }

        var shapePts = [];
        if (3 >= geoPts.length) {
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
        }
        else {
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        //创建圆图元
        //获取位置点折线总长
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        if (!this.isEdit) {
            //获取子标号的大小
            var subSymbolSize = this.getDefaultSubSymbolSize() * 1.5;

            this.subSymbolScaleValue = subSymbolSize / allDistance;

            if (this.subSymbolScaleValue > 0.2) {
                this.subSymbolScaleValue = 0.2;
            }

            this.scaleValues[0] = this.subSymbolScaleValue;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];
        var subSymbolSize = allDistance * dScale0;

        var symbolPt = new SuperMap.Geometry.Point(plygonCenter.x + allDistance * dScale2, plygonCenter.y + allDistance * dScale3);

        if (this.subSymbols && null !== this.subSymbols && this.subSymbols.length > 0) {
            this.computeSubSymbol(this.subSymbols[0], symbolPt, subSymbolSize, 0);
        }

        for (var i = 0; i < this.components.length; i++) {
            this.components[i].style.strokeColor = "#000";
            this.components[i].style.lineColorLimit = true;
            this.components[i].style.strokeOpacity = 1;
        }


        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);
        this.addScalePoint(symbolPt);

        var radius = subSymbolSize;
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, radius, radius, 90);
        this.addScalePoint(scalePt2);

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol4010800"
});
