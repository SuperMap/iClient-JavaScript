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
SuperMap.Geometry.AlgoSymbol4022102 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol23500, {


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
        SuperMap.Geometry.AlgoSymbol4022101.prototype.initialize.apply(this, arguments);
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

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        //创建圆图元
        //获取位置点折线总长
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        if (!this.isEdit) {
            this.scaleValues[0] = this.getSubSymbolScaleValue() * 2;
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

        //箭头
        var symbolSize = allDistance * this.scaleValues[0] * 0.5;
        var pt1 = new SuperMap.Geometry.Point(symbolPt.x + symbolSize * 2, symbolPt.y + symbolSize);
        var pt2 = new SuperMap.Geometry.Point(symbolPt.x + symbolSize * 2, symbolPt.y - symbolSize);
        var temp = [];
        temp.push(pt2);
        temp.push(pt1);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, temp);
        this.addArrow1(temp);


        if (this.isEdit) {
            this.addScalePoint(symbolPt);

            var radius = subSymbolSize;
            var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, radius, radius, 90);
            this.addScalePoint(scalePt2);
        }
        this.clearBounds();
    },

    addArrow1: function (shapePts) {

        if (shapePts.length !== 0) {

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            var scale = 0.5;

            if (!this.isEdit) {
                scale = this.getSubSymbolScaleValue() * 2;
            } else {
                scale = this.getSubSymbolScaleValue() * 2;
            }
            var arrowHeadDis = allDistance * scale;
            var lineStart = shapePts[shapePts.length - 2];
            var lineEnd = shapePts[shapePts.length - 1];
            var dRadius = arrowHeadDis;
            var angle = SuperMap.Plot.PlottingUtil.radian(lineStart, lineEnd) * this.RTOD;
            var ptRight = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd, dRadius, dRadius, angle + 157.5);
            var ptLeft = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd, dRadius, dRadius, angle + 202.5);

            var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
            //创建箭头
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [ptRight, shapePts[shapePts.length - 1], ptLeft], style, true);
        }
    },
    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol4022102"
});
