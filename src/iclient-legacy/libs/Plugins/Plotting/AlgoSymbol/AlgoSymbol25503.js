/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25503 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25500, {
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

        this.minEditPts = 3;
        this.maxEditPts = 9999;

        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0.02);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8402));
        }
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
            this.scaleValues.push(0.02);
        }

        if(this.subSymbols.length == 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8402));
        }

        //创建任意多边形图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,geoPts);

        //获得任意多边形的中心
        var polygoncenter =   SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[2] = this.getSubSymbolScaleValue()*0.5;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(polygoncenter.x+dDistance*dScale0,polygoncenter.y+dDistance*dScale1);
        var distance = dScale2*dDistance;//this.getSubSymbolScaleValue()
        //var dsmalldis = ddis * this.SMALLSCALE;

        //左竖线
        var pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(symbolPt.x-4*distance,symbolPt.y+distance/2));
        pts2D.push(new SuperMap.Geometry.Point(symbolPt.x-4*distance,symbolPt.y-distance/2));

        var style = {surroundLineFlag: false, lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,style);

        //左横线
        var polyPts2 = [];
        polyPts2.push(new SuperMap.Geometry.Point(symbolPt.x-4*distance,symbolPt.y));
        polyPts2.push(new SuperMap.Geometry.Point(symbolPt.x-distance,symbolPt.y));

        var style = {surroundLineFlag: false, surroundLineLimit:true, lineTypeLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts2, style);

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], symbolPt, 2*distance, 0);
        }

        //右横线
        var polyPts3 = [];
        polyPts3.push(new SuperMap.Geometry.Point(symbolPt.x+4*distance,symbolPt.y));
        polyPts3.push(new SuperMap.Geometry.Point(symbolPt.x+distance,symbolPt.y));

        var style = {surroundLineFlag: false, surroundLineLimit:true, lineTypeLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts3, style);

        //右竖线
        var polyPts4 = [];
        polyPts4.push(new SuperMap.Geometry.Point(symbolPt.x+4*distance,symbolPt.y+distance/2));
        polyPts4.push(new SuperMap.Geometry.Point(symbolPt.x+4*distance,symbolPt.y-distance/2));

        var style = {surroundLineFlag: false, surroundLineLimit:true, lineTypeLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,polyPts4,style);

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(symbolPt.clone());
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,2*distance,2*distance,90);
        this.addScalePoint(scalePt2);
    },


    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25503"
});
