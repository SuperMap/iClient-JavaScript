/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol39000 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SCALE :0.2,
    TRANGLE_SCALE :0.1,

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
        this.maxEditPts = 9999;

        this.scaleValues = [];

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4600));
        }
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

        if(2 > shapePts.length){
            return;
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        //求猪腰子或者闭合贝赛尔曲线拟合点的最大、最小x、y坐标
        var minX = shapePts[0].x;
        var maxX = shapePts[0].x;
        var minY = shapePts[0].y;
        var maxY = shapePts[0].y;
        for(var i = 0; i < shapePts.length; i++)
        {
            if(minX > shapePts[i].x)
            {
                minX = shapePts[i].x;
            }

            if(maxX < shapePts[i].x)
            {
                maxX = shapePts[i].x;
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

        //计算中心点
        //求多边形的中心点
        var plygonCenter = new SuperMap.Geometry.Point((maxX+minX)/2,(maxY+minY)/2);
        var dDistanceX = maxX - minX;
        var dDistanceY = maxY - minY;

        //计算三个三角形的中心
        var ddisx = dDistanceX*this.SCALE;
        var ddisy = dDistanceY*this.SCALE;

        var tranglecenter1 = new SuperMap.Geometry.Point(plygonCenter.x,plygonCenter.y+ddisy);
        var tranglecenter2 = new SuperMap.Geometry.Point(plygonCenter.x-ddisx,plygonCenter.y-ddisy);
        var tranglecenter3 = new SuperMap.Geometry.Point(plygonCenter.x+ddisx,plygonCenter.y-ddisy);

        //计算三个三角形的顶点
        //第一个三角形
        ddisx = dDistanceX*this.TRANGLE_SCALE;
        ddisy = dDistanceY*this.TRANGLE_SCALE;

        var trangle1pt1 = new SuperMap.Geometry.Point(tranglecenter1.x,tranglecenter1.y+ddisy);
        var trangle1pt2 = new SuperMap.Geometry.Point(tranglecenter1.x-ddisx,tranglecenter1.y-ddisy);
        var trangle1pt3 = new SuperMap.Geometry.Point(tranglecenter1.x+ddisx,tranglecenter1.y-ddisy);

        var trangle1pt4 = new SuperMap.Geometry.Point((trangle1pt1.x+trangle1pt2.x)/2,(trangle1pt1.y+trangle1pt2.y)/2);
        var trangle1pt5 = new SuperMap.Geometry.Point((trangle1pt1.x+trangle1pt3.x)/2,(trangle1pt1.y+trangle1pt3.y)/2);

        var ptscell = [];
        ptscell.push(trangle1pt1);
        ptscell.push(trangle1pt4);
        ptscell.push(trangle1pt5);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptscell,{lineTypeLimit:true,surroundLineLimit:true});

        //第一个任意多边形
        ptscell = [];
        ptscell.push(trangle1pt4);
        ptscell.push(trangle1pt5);
        ptscell.push(trangle1pt3);
        ptscell.push(trangle1pt2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptscell,{fillLimit:true,fillStyle:0,lineTypeLimit:true,surroundLineLimit:true});

        //第二个三角形
        var trangle2pt1 = new SuperMap.Geometry.Point(tranglecenter2.x,tranglecenter2.y+ddisy);
        var trangle2pt2 = new SuperMap.Geometry.Point(tranglecenter2.x-ddisx,tranglecenter2.y-ddisy);
        var trangle2pt3 = new SuperMap.Geometry.Point(tranglecenter2.x+ddisx,tranglecenter2.y-ddisy);

        var trangle2pt4 = new SuperMap.Geometry.Point((trangle2pt1.x+trangle2pt2.x)/2,(trangle2pt1.y+trangle2pt2.y)/2);
        var trangle2pt5 = new SuperMap.Geometry.Point((trangle2pt1.x+trangle2pt3.x)/2,(trangle2pt1.y+trangle2pt3.y)/2);

        ptscell = [];
        ptscell.push(trangle2pt1);
        ptscell.push(trangle2pt4);
        ptscell.push(trangle2pt5);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptscell,{lineTypeLimit:true,surroundLineLimit:true});

        ptscell = [];
        ptscell.push(trangle2pt4);
        ptscell.push(trangle2pt5);
        ptscell.push(trangle2pt3);
        ptscell.push(trangle2pt2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptscell,{fillLimit:true,fillStyle:0,lineTypeLimit:true,surroundLineLimit:true});

        //第三个三角形
        var trangle3pt1 = new SuperMap.Geometry.Point(tranglecenter3.x,tranglecenter3.y+ddisy);
        var trangle3pt2 = new SuperMap.Geometry.Point(tranglecenter3.x-ddisx,tranglecenter3.y-ddisy);
        var trangle3pt3 = new SuperMap.Geometry.Point(tranglecenter3.x+ddisx,tranglecenter3.y-ddisy);

        var trangle3pt4 = new SuperMap.Geometry.Point((trangle3pt1.x+trangle3pt2.x)/2,(trangle3pt1.y+trangle3pt2.y)/2);
        var trangle3pt5 = new SuperMap.Geometry.Point((trangle3pt1.x+trangle3pt3.x)/2,(trangle3pt1.y+trangle3pt3.y)/2);

        ptscell = [];
        ptscell.push(trangle3pt1);
        ptscell.push(trangle3pt4);
        ptscell.push(trangle3pt5);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptscell,{lineTypeLimit:true,surroundLineLimit:true});

        ptscell = [];
        ptscell.push(trangle3pt4);
        ptscell.push(trangle3pt5);
        ptscell.push(trangle3pt3);
        ptscell.push(trangle3pt2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptscell,{fillLimit:true,fillStyle:0,lineTypeLimit:true,surroundLineLimit:true});
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol39000"
});
