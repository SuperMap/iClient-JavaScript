/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol32900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 100;

        this.scaleValues = [];
        this.scaleValues.push(0.03);
        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0);

        this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 6700));
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

        if (geoPts.length === 2) {
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geoPts);
        } else {
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);
        }

        //获取质心
        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var midPt = plygonCenter;

        if (!this.isEdit) {
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        //符号大小
        var dSymbolSize = allDistance * this.scaleValues[0];

        //旋转角度
        var dScale1 = this.scaleValues[1];
        var dAngle = dScale1;

        //符号位置
        var dScale3 = this.scaleValues[3];
        var dScale4 = this.scaleValues[4];

        midPt.x = plygonCenter.x + dScale3 * allDistance;
        midPt.y = plygonCenter.y + dScale4 * allDistance;

        //添加子符号
        this.computeSubSymbol(this.subSymbols[0], plygonCenter, dSymbolSize, dAngle);

        //计算比例点
        if (this.isEdit) {
            this.addScalePoint(midPt, 0);

            var subSymbolPt2D = new SuperMap.Geometry.Point(midPt.x, midPt.y);
            var scalePt2D_2 = SuperMap.Plot.PlottingUtil.circlePoint(subSymbolPt2D, dSymbolSize, dSymbolSize, 0);
            this.addScalePoint(scalePt2D_2, 1);

            var scalePt2D_3 = SuperMap.Plot.PlottingUtil.circlePoint(subSymbolPt2D, 2 * dSymbolSize, 2 * dSymbolSize, dScale1);
            this.addScalePoint(scalePt2D_3, 2);
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
        //获取中心点
        var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if (index === 0) {
            var dScale3 = (pt.x - centerPt.x) / allDistance;
            this.scaleValues[3] = dScale3;
            var dScale4 = (pt.y - centerPt.y) / allDistance;
            this.scaleValues[4] = dScale4;
        }

        if (index === 1) {
            var dScale3 = this.scaleValues[3];
            var dScale4 = this.scaleValues[4];
            var subSymbolPt = new SuperMap.Geometry.Point(centerPt.x + dScale3 * allDistance, centerPt.y + dScale4 * allDistance);

            var dis = SuperMap.Plot.PlottingUtil.distance(subSymbolPt, pt);
            var dScale0 = dis / allDistance;
            this.scaleValues[0] = dScale0;
        }

        if (index === 2) {

            var dScale3 = this.scaleValues[3];
            var dScale4 = this.scaleValues[4];
            var subSymbolPt = new SuperMap.Geometry.Point(centerPt.x + dScale3 * allDistance, centerPt.y + dScale4 * allDistance);

            var dScale1 = SuperMap.Plot.PlottingUtil.radian(subSymbolPt, pt) * this.RTOD;
            this.scaleValues[1] = dScale1;
        }
        this.calculateParts();

    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol32900"
});
