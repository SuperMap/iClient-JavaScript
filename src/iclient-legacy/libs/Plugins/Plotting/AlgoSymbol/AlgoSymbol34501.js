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
SuperMap.Geometry.AlgoSymbol34501 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    HEADSCALE :0.03,

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
        this.maxEditPts = 2;

        this.scaleValues = [];
        if(this.subSymbols.length == 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8406));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2) {
            return;
        }

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*this.RTOD;

        var dScale1 = 0.25;
        //横线
        var pt10 = new SuperMap.Geometry.Point(0,0);
        var pt11 = new SuperMap.Geometry.Point(1.9*dScale1*allDistance,0);

        var tempLinePt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt10,angle);
        var tempLinePt11 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt11,angle);

        var pts2D = [];
        pts2D.push(tempLinePt10);
        pts2D.push(tempLinePt11);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        //
        var linePt1 = new SuperMap.Geometry.Point(2.1*dScale1*allDistance,0);
        var linePt2 = new SuperMap.Geometry.Point(2.9*dScale1*allDistance,0);

        var tempLinePt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,linePt1,angle);
        var tempLinePt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,linePt2,angle);

        pts2D = [];
        pts2D.push(tempLinePt1);
        pts2D.push(tempLinePt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        //
        var linePt3 = new SuperMap.Geometry.Point(3.1*dScale1*allDistance,0);
        var linePt4 = new SuperMap.Geometry.Point(3.8*dScale1*allDistance,0);

        var tempLinePt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,linePt3,angle);
        var tempLinePt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,linePt4,angle);

        pts2D = [];
        pts2D.push(tempLinePt3);
        pts2D.push(tempLinePt4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        if(this.subSymbols.length > 0){
            var dSymbolSize = allDistance * 0.2;
            var symbolPt = new SuperMap.Geometry.Point(allDistance,0.4*dSymbolSize);
            symbolPt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,symbolPt,angle);
            this.computeSubSymbol(this.subSymbols[0],symbolPt,dSymbolSize,angle);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34500" +
    "1"
});
