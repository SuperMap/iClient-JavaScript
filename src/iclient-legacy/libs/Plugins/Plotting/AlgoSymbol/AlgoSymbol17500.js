/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for(var i = 0; i < geoPts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
        }

        var shapePts = [];
        if(3 >= this.controlPoints.length){
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
        }
        else{
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        if(3 > shapePts.length){
            return;
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,shapePts);

        //求猪腰子或者闭合贝赛尔曲线拟合点的最大、最小x、y坐标
        var minX = shapePts[0].x;
        var maxX = shapePts[0].x;
        var minY = shapePts[0].y;
        var maxY = shapePts[0].y;
        var minXPt = new SuperMap.Geometry.Point(shapePts[0].x,shapePts[0].y);
        var maxXPt = new SuperMap.Geometry.Point(shapePts[0].x,shapePts[0].y);

        for(var i = 0; i < shapePts.length; i++)
        {
            if(minX > shapePts[i].x)
            {
                minX = shapePts[i].x;
                minXPt = new SuperMap.Geometry.Point(shapePts[i].x,shapePts[i].y);
            }

            if(maxX < shapePts[i].x)
            {
                maxX = shapePts[i].x;
                maxXPt = new SuperMap.Geometry.Point(shapePts[i].x,shapePts[i].y);
            }

            if(minY > shapePts[i].y)
            {
                minY = shapePts[i].y;
            }

            if(maxY < shapePts[i].y)
            {
                maxY = shapePts[i].y;
            }
        }

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        //计算中心点
        //求多边形的中心点
        var plygonCenter = new SuperMap.Geometry.Point((maxX+minX)/2,(maxY+minY)/2);
        var dDistanceX = maxX - minX;
        var dDistanceY = maxY - minY;

        //计算三个三角形的中心
        var ddisx = dDistanceX*0.1;
        var ddisy = dDistanceY*0.1;

        var tranglecenter1 = new SuperMap.Geometry.Point(plygonCenter.x,plygonCenter.y+ddisy);
        var tranglecenter2 = new SuperMap.Geometry.Point(plygonCenter.x-ddisx,plygonCenter.y-ddisy);
        var tranglecenter3 = new SuperMap.Geometry.Point(plygonCenter.x+ddisx,plygonCenter.y-ddisy);

        //计算三个三角形的顶点
        //第一个三角形
        ddisx = dDistanceX*0.03;
        ddisy = dDistanceY*0.03;

        var trangle1pt1 = new SuperMap.Geometry.Point(tranglecenter1.x,tranglecenter1.y+ddisy);
        var trangle1pt2 = new SuperMap.Geometry.Point(tranglecenter1.x-ddisx,tranglecenter1.y-ddisy);
        var trangle1pt3 = new SuperMap.Geometry.Point(tranglecenter1.x+ddisx,tranglecenter1.y-ddisy);

        var pts2D = [];

        pts2D.push(new SuperMap.Geometry.Point(trangle1pt1.x,trangle1pt1.y));
        pts2D.push(new SuperMap.Geometry.Point(trangle1pt2.x,trangle1pt2.y));
        pts2D.push(new SuperMap.Geometry.Point(trangle1pt3.x,trangle1pt3.y));

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D, style);

        //第二个三角形
        var trangle2pt1 = new SuperMap.Geometry.Point(tranglecenter2.x,tranglecenter2.y+ddisy);
        var trangle2pt2 = new SuperMap.Geometry.Point(tranglecenter2.x-ddisx,tranglecenter2.y-ddisy);
        var trangle2pt3 = new SuperMap.Geometry.Point(tranglecenter2.x+ddisx,tranglecenter2.y-ddisy);

        var pts2D2 = [];

        pts2D2.push(new SuperMap.Geometry.Point(trangle2pt1.x,trangle2pt1.y));
        pts2D2.push(new SuperMap.Geometry.Point(trangle2pt2.x,trangle2pt2.y));
        pts2D2.push(new SuperMap.Geometry.Point(trangle2pt3.x,trangle2pt3.y));

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D2, style);

        //第三个三角形
        var trangle3pt1 = new SuperMap.Geometry.Point(tranglecenter3.x,tranglecenter3.y+ddisy);
        var trangle3pt2 = new SuperMap.Geometry.Point(tranglecenter3.x-ddisx,tranglecenter3.y-ddisy);
        var trangle3pt3 = new SuperMap.Geometry.Point(tranglecenter3.x+ddisx,tranglecenter3.y-ddisy);

        var pts2D3 = [];

        pts2D3.push(new SuperMap.Geometry.Point(trangle3pt1.x,trangle3pt1.y));
        pts2D3.push(new SuperMap.Geometry.Point(trangle3pt2.x,trangle3pt2.y));
        pts2D3.push(new SuperMap.Geometry.Point(trangle3pt3.x,trangle3pt3.y));

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D3, style);

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol17500"
});
