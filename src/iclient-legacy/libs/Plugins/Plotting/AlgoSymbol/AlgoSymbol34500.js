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
SuperMap.Geometry.AlgoSymbol34500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        var pt1 = new SuperMap.Geometry.Point(allDistance, 0.05*dScale1*allDistance);
        var pt2 = new SuperMap.Geometry.Point(allDistance,-0.05*dScale1*allDistance);
        var pt3 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.8*dScale1*allDistance,0);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt1,angle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt2,angle);
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt3,angle);

        pts2D = [];
        pts2D.push(tempPt1);
        pts2D.push(tempPt3);
        pts2D.push(tempPt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        //横线
        var pt4 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.1*dScale1*allDistance,0);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt4,angle);

        pts2D = [];
        pts2D.push(tempPt3);
        pts2D.push(tempPt4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        //>
        var pt5 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.6*dScale1*allDistance,0);
        var pt6 = SuperMap.Plot.PlottingUtil.circlePoint(pt5,0.3*dScale1*allDistance,0.4*dScale1*allDistance,150);
        var pt7 = SuperMap.Plot.PlottingUtil.circlePoint(pt5,0.3*dScale1*allDistance,0.4*dScale1*allDistance,210);

        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt5,angle);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt6,angle);
        var tempPt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt7,angle);

        pts2D = [];
        pts2D.push(tempPt6);
        pts2D.push(tempPt5);
        pts2D.push(tempPt7);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        //竖线
        var pt8 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.2*dScale1*allDistance, 0.1*dScale1*allDistance);
        var pt9 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.2*dScale1*allDistance,-0.1*dScale1*allDistance);

        var tempPt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt8,angle);
        var tempPt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt9,angle);

        pts2D = [];
        pts2D.push(tempPt8);
        pts2D.push(tempPt9);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, {lineTypeLimit:true});

        //圆
        var pt110 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.05*dScale1*allDistance, 0);
        var pt111 = new SuperMap.Geometry.Point((1-dScale1)*allDistance+0.05*dScale1*allDistance,0.05*dScale1*allDistance);

        var tempPt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt110,angle);
        var tempPt11 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt111,angle);

        pts2D = [];
        pts2D.push(tempPt10);
        pts2D.push(tempPt11);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, pts2D, {lineTypeLimit:true});
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34500"
});
