/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25901 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25500, {

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
        SuperMap.Geometry.AlgoSymbol25800.prototype.initialize.apply(this, arguments);

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if(geoPts.length <= this.minEditPts){
            if(geoPts.length >= 2){
                this.calAssistantLine();
            }
            return;
        }

        //创建任意多边形图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);

        //获得任意多边形的中心
        var polygoncenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if (!this.isEdit) {
            this.scaleValues[2] = this.getSubSymbolScaleValue() * 2;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(polygoncenter.x + dDistance * dScale0, polygoncenter.y + dDistance * dScale1);
        var ddis = dScale2 * dDistance / 2;

        var polyPts = [];
        polyPts.push(new SuperMap.Geometry.Point((symbolPt.x - ddis), symbolPt.y));
        polyPts.push(new SuperMap.Geometry.Point((symbolPt.x + ddis), symbolPt.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts, null, true);

        var dsmalldis = ddis * 0.3;

        var polyPts2 = [];
        polyPts2.push(new SuperMap.Geometry.Point((symbolPt.x - ddis), (symbolPt.y + dsmalldis / 2)));
        polyPts2.push(new SuperMap.Geometry.Point((symbolPt.x - ddis), (symbolPt.y - dsmalldis / 2)));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts2, null, true);

        var polyPts3 = [];
        polyPts3.push(new SuperMap.Geometry.Point((symbolPt.x + ddis), (symbolPt.y + dsmalldis / 2)));
        polyPts3.push(new SuperMap.Geometry.Point((symbolPt.x + ddis), (symbolPt.y - dsmalldis / 2)));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts3, null, true);

        var polyPts4 = [];
        polyPts4.push(new SuperMap.Geometry.Point(symbolPt.x, symbolPt.y));
        polyPts4.push(new SuperMap.Geometry.Point(symbolPt.x, (symbolPt.y + dsmalldis * 1.5)));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts4, null, true);

        var polyPts5 = [];
        polyPts5.push(new SuperMap.Geometry.Point((symbolPt.x - dsmalldis / 2), symbolPt.y));
        polyPts5.push(new SuperMap.Geometry.Point((symbolPt.x - dsmalldis), (symbolPt.y + dsmalldis)));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts5, null, true);

        var polyPts6 = [];
        polyPts6.push(new SuperMap.Geometry.Point((symbolPt.x + dsmalldis / 2), symbolPt.y));
        polyPts6.push(new SuperMap.Geometry.Point((symbolPt.x + dsmalldis), (symbolPt.y + dsmalldis)));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts6, null, true);

        //添加比例点
        this.addScalePoint(symbolPt);

        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, ddis, ddis, 90);
        this.addScalePoint(scalePt2);

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol25901"
});