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
SuperMap.Geometry.AlgoSymbol21400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var  geoPts = this.controlPoints;

        if (this.controlPoints <2)
        {
            return;
        }

        //创建贝塞尔曲线
        var allPoints, shapePts;

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);
        var linestyle  = {surroundLineFlag: false};


        var linePts = [];

        //添加起点
        linePts.push(shapePts[shapePts.length-1]);

        var dAllLength = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算箭头的箭尾的两点
        var scale = this.getSubSymbolScaleValue();
        var dArrowDistance = scale* SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptEnd = geoPts[geoPts.length-1];
        var dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[shapePts.length-1]);
        while(dis < 1.5*dArrowDistance){
            shapePts.pop();
            dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[shapePts.length-1]);
        }

        shapePts.push(ptEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        var ptStart = shapePts[shapePts.length-2];

        var angle = SuperMap.Plot.PlottingUtil.radian(ptEnd, ptStart)*180/Math.PI;

        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd, dArrowDistance, dArrowDistance, angle+22.5);
        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd, dArrowDistance, dArrowDistance, angle-22.5);

        var arrowHeadpts = [];
        arrowHeadpts.push(pt1);
        arrowHeadpts.push(ptEnd);
        arrowHeadpts.push(pt2);

        var style = {surroundLineFlag: false,fillLimit:true,fillColor: linestyle.strokeColor ,lineTypeLimit:true,fill:true};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, arrowHeadpts, style);
        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol21400"
});
