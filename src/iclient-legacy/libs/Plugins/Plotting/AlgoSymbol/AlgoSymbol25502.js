/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25502 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25500, {
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
        SuperMap.Geometry.AlgoSymbol25501.prototype.initialize.apply(this, arguments);

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if (geoPts.length < this.minEditPts) {
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues.push(0);
            this.scaleValues.push(0);
            this.scaleValues.push(0.08);
        }

        //创建任意多边形图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,geoPts);

        //获得任意多边形的中心
        var polygoncenter =   SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[2] = this.getSubSymbolScaleValue()*2;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(polygoncenter.x+dDistance*dScale0,polygoncenter.y+dDistance*dScale1);
        var ddis = dScale2*dDistance / 2.5;//this.getSubSymbolScaleValue()
        var dsmalldis = ddis * 0.7;

        //画圆
        var polyPts = [];
        polyPts.push(new SuperMap.Geometry.Point(symbolPt.x,symbolPt.y));
        polyPts.push(new SuperMap.Geometry.Point((symbolPt.x+ddis),symbolPt.y));

        var style = {surroundLineFlag: false, lineTypeLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,polyPts,style);

        //画中间的部分
        var polyPts2 = [];
        polyPts2.push(new SuperMap.Geometry.Point((symbolPt.x+dsmalldis),(symbolPt.y-dsmalldis/2)));
        polyPts2.push(new SuperMap.Geometry.Point((symbolPt.x-dsmalldis),(symbolPt.y-dsmalldis/2)));

        var style = {surroundLineFlag: false, lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts2, style);

        var polyPts3 = [];
        polyPts3.push(new SuperMap.Geometry.Point(symbolPt.x,(symbolPt.y-dsmalldis/2)));
        polyPts3.push(new SuperMap.Geometry.Point(symbolPt.x,(symbolPt.y+dsmalldis)));

        var style = {surroundLineFlag: false, lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts3, style);

        var polyPts4 = [];
        polyPts4.push(new SuperMap.Geometry.Point((symbolPt.x-dsmalldis/2),(symbolPt.y-dsmalldis/2)));
        polyPts4.push(new SuperMap.Geometry.Point((symbolPt.x-dsmalldis),(symbolPt.y+dsmalldis/2)));

        var style = {surroundLineFlag: false, lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts4,style);

        var polyPts5 = [];
        polyPts5.push(new SuperMap.Geometry.Point((symbolPt.x+dsmalldis/2),(symbolPt.y-dsmalldis/2)));
        polyPts5.push(new SuperMap.Geometry.Point((symbolPt.x+dsmalldis),(symbolPt.y+dsmalldis/2)));

        var style = {surroundLineFlag: false, lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts5,style);

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(symbolPt.clone());
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,1.25*ddis,1.25*ddis,90);
        this.addScalePoint(scalePt2);
    },


    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25502"
});
