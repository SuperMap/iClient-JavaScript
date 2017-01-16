/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        var dSapce = (maxX-minX)/5;
        var dRadius = dSapce*0.2;

        var circleBase2Ds = [];
        for(var i = 0; i < 360; i += 18)
        {
            var circlePt = SuperMap.Plot.PlottingUtil.circlePoint(new SuperMap.Geometry.Point(0.0,0.0),dRadius,dRadius,i);
            circleBase2Ds.push(circlePt);
        }

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        for(var dStepX = minX; dStepX < maxX; dStepX += dSapce)
        {
            for(var dStepY = minY; dStepY < maxY; dStepY += dSapce)
            {
                var tempPt = new SuperMap.Geometry.Point(dStepX,dStepY);
                if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(shapePts,tempPt))
                {
                    continue;
                }

                var pts2D = [];
                var bOut = false;

                for(var i = 0; i < circleBase2Ds.length; i++)
                {
                    var circlePt = new SuperMap.Geometry.Point(tempPt.x+circleBase2Ds[i].x,tempPt.y+circleBase2Ds[i].y);
                    if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(shapePts,circlePt))
                    {
                        bOut = true;
                        break;
                    }
                    pts2D.push(circlePt);
                }

                if(bOut)
                {
                    continue;
                }

                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D, style, true);
            }
        }

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol17400"
});
