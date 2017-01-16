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
SuperMap.Geometry.AlgoSymbol34300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        if (this.controlPoints < 2)
        {
            return;
        }

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*this.RTOD;
        var dRadius = dDistance * 0.02;

        var pts2D = [], i;
        for(i = 0; i < 360; i += 10)
        {
            pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(new SuperMap.Geometry.Point(0.0,0.0),dRadius,dRadius,i));
        }
        pts2D.push(pts2D[0]);

        var tempPts2D = [];
        //第一个圆
        var circlePt1 = new SuperMap.Geometry.Point(0.1*dDistance,0);
        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,circlePt1,angle);
        for(i = 0; i < pts2D.length; i++)
        {
            tempPts2D.push(new SuperMap.Geometry.Point(pts2D[i].x+tempPt1.x,pts2D[i].y+tempPt1.y));
        }

        var style = {lineTypeLimit:true,surroundLineLimit:true,fillLimit:true,fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,tempPts2D,style);


        //第二个圆
        var circlePt2 = new SuperMap.Geometry.Point(0.25*dDistance,0);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,circlePt2,angle);
        tempPts2D = [];
        for(i = 0; i < pts2D.length; i++)
        {
            tempPts2D.push(new SuperMap.Geometry.Point(pts2D[i].x+tempPt2.x,pts2D[i].y+tempPt2.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,tempPts2D,style);

        //第三个圆
        var circlePt3 = new SuperMap.Geometry.Point(0.4*dDistance,0);
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,circlePt3,angle);
        tempPts2D = [];
        for(i = 0; i < pts2D.length; i++)
        {
            tempPts2D.push(new SuperMap.Geometry.Point(pts2D[i].x+tempPt3.x,pts2D[i].y+tempPt3.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,tempPts2D,style);

        //第四个圆
        var circlePt4 = new SuperMap.Geometry.Point(0.6*dDistance,0);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,circlePt4,angle);
        tempPts2D = [];
        for(i = 0; i < pts2D.length; i++)
        {
            tempPts2D.push(new SuperMap.Geometry.Point(pts2D[i].x+tempPt4.x,pts2D[i].y+tempPt4.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,tempPts2D,style);

        //多边形
        var pt5 = new SuperMap.Geometry.Point(0.5*dDistance, 0.05*dDistance);
        var pt6 = new SuperMap.Geometry.Point(0.7*dDistance, 0.05*dDistance);
        var pt7 = new SuperMap.Geometry.Point(0.75*dDistance, 0);
        var pt8 = new SuperMap.Geometry.Point(0.7*dDistance,-0.05*dDistance);
        var pt9 = new SuperMap.Geometry.Point(0.5*dDistance,-0.05*dDistance);

        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt5,angle);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt6,angle);
        var tempPt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt7,angle);
        var tempPt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt8,angle);
        var tempPt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt9,angle);

        tempPts2D = [];
        tempPts2D.push(tempPt5);
        tempPts2D.push(tempPt6);
        tempPts2D.push(tempPt7);
        tempPts2D.push(tempPt8);
        tempPts2D.push(tempPt9);
        tempPts2D.push(tempPt5);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,tempPts2D);
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34300"
});
