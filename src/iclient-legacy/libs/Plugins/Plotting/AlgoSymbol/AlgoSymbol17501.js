/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17501 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        //计算中心点
        //求多边形的中心点
        var ptCenter = new SuperMap.Geometry.Point((maxX+minX)/2,(maxY+minY)/2);
        var dDistanceX = 0.33*(maxX-minX);
        var dDistanceY = 0.1 *(maxY-minY);

        //计算横线图元
        var pt1_1 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter,dDistanceX,dDistanceX,0);
        var pt1_2 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter,dDistanceX,dDistanceX,180);

        var pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(pt1_1.x,pt1_1.y));
        pts2D.push(new SuperMap.Geometry.Point(pt1_2.x,pt1_2.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算V图元（左）
        var pt2_2 = new SuperMap.Geometry.Point(ptCenter.x-dDistanceX*3/7,ptCenter.y+dDistanceY);
        var pt2_1 = SuperMap.Plot.PlottingUtil.circlePoint(pt2_2,dDistanceY,dDistanceY,60);
        var pt2_3 = SuperMap.Plot.PlottingUtil.circlePoint(pt2_2,dDistanceY,dDistanceY,120);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(pt2_1.x,pt2_1.y));
        pts2D.push(new SuperMap.Geometry.Point(pt2_2.x,pt2_2.y));
        pts2D.push(new SuperMap.Geometry.Point(pt2_3.x,pt2_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算V图元（左）
        var pt3_2 = new SuperMap.Geometry.Point(ptCenter.x+dDistanceX*3/7,ptCenter.y+dDistanceY);
        var pt3_1 = SuperMap.Plot.PlottingUtil.circlePoint(pt3_2,dDistanceY,dDistanceY,60);
        var pt3_3 = SuperMap.Plot.PlottingUtil.circlePoint(pt3_2,dDistanceY,dDistanceY,120);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(pt3_1.x,pt3_1.y));
        pts2D.push(new SuperMap.Geometry.Point(pt3_2.x,pt3_2.y));
        pts2D.push(new SuperMap.Geometry.Point(pt3_3.x,pt3_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol17501"
});
