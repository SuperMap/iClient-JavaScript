/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 3;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = this.GetGoPts();
        if(geoPts.length < 2){
            return;
        }

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[geoPts.length-1].x,geoPts[geoPts.length-1].y);
        var dAngle = 0.0;

        if(geoPts.length == 2){
            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, geoPts);
        }else{
            this.addCell(SuperMap.Plot.SymbolType.ELLIPSESYMBOL, geoPts);
            dAngle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd) * this.RTOD;
        }

        var dis = SuperMap.Plot.PlottingUtil.distance(ptStart, ptEnd);

        //第一条折线
        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 0.78*dis,0.78*dis,dAngle+180);
        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 1.26*dis,1.26*dis,dAngle+180);

        var pts2D = [];
        pts2D.push(pt1.clone());
        pts2D.push(pt2.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //第二条折线
        var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 0.1*dis,0.1*dis,dAngle+180);
        var pt4 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 0.58*dis,0.58*dis,dAngle+180);

        pts2D = [];
        pts2D.push(pt3.clone());
        pts2D.push(pt4.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //左边第一条折线
        var pt5 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 0.1*dis,0.1*dis,dAngle);
        var pt6 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 0.58*dis,0.58*dis,dAngle);

        pts2D = [];
        pts2D.push(pt5.clone());
        pts2D.push(pt6.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //左边第一条折线
        var pt7 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 0.78*dis,0.78*dis,dAngle);
        var pt8 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, 1.26*dis,1.26*dis,dAngle);

        pts2D = [];
        pts2D.push(pt7.clone());
        pts2D.push(pt8.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);
    },

    GetGoPts: function () {
        var pts2D = [];
        var nCount = this.controlPoints.length;
        if(nCount < 2){
            return pts2D;
        }
        pts2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(pts2D);
        if(pts2D.length == 1){
            pts2D = [];
        }
        return pts2D;
    }
})