/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol22200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 99999;

        if(null !== this.feature){
            this.feature.style.strokeColor = "#0000ff";
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
        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        var shapePts = [];

        if(3 >= geoPts.length){
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
        }
        else{
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        //创建圆图元
        //获取位置点折线总长
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var dRadius = allDistance * this.getSubSymbolScaleValue();

        var circlePts = [];
        circlePts.push(new SuperMap.Geometry.Point(plygonCenter.x,plygonCenter.y));
        circlePts.push(new SuperMap.Geometry.Point(plygonCenter.x+dRadius,plygonCenter.y));

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, circlePts);

        //创建竖着的折线图元
        var linePts1 = [];
        linePts1.push(new SuperMap.Geometry.Point(plygonCenter.x,plygonCenter.y+0.8*dRadius));
        linePts1.push(new SuperMap.Geometry.Point(plygonCenter.x,plygonCenter.y-0.8*dRadius));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts1);

        //创建横着的折线图元
        var linePts2 = [];
        linePts2.push(new SuperMap.Geometry.Point(plygonCenter.x+0.8*dRadius,plygonCenter.y));
        linePts2.push(new SuperMap.Geometry.Point(plygonCenter.x-0.8*dRadius,plygonCenter.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts2);

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol22200"
});