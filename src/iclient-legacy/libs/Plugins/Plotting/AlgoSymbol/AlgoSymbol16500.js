/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        //计算猪腰子拟合点
        var primitives = new SuperMap.Geometry.Primitives();
        var shapePts = primitives.getKendyShapePts(geoPts);
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        //求猪腰子或者闭合贝赛尔曲线拟合点的最大、最小x、y坐标
        var minX = shapePts[0].x;
        var maxX = shapePts[0].x;
        var minY = shapePts[0].y;
        var maxY = shapePts[0].y;
        var minXPt = new SuperMap.Geometry.Point(shapePts[0].x,shapePts[0].y);
        var maxXPt = new SuperMap.Geometry.Point(shapePts[0].x,shapePts[0].y);

        for( i = 0; i < shapePts.length; i++)
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

        var ptCenter = new SuperMap.Geometry.Point((maxX+minX)/2,(maxY+minY)/2);

        var dSpace = (maxX-minX)/5;

        var style = {surroundLineFlag: false,lineWidthLimit:true,strokeWidth:this.feature.style.strokeWidth*0.3};
        var bExist = true;
        var dLeftStep = ptCenter.x;
        var dRightStep = ptCenter.x;
        while(bExist)
        {
            bExist = false;
            var pts2D_45 = [];
            var pts2D_135 = [];

            //往左画
            var tempLeftPt1 = new SuperMap.Geometry.Point(dLeftStep,ptCenter.y);
            var tempLeftPt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempLeftPt1,10,10,45);
            var tempLeftPt3 = SuperMap.Plot.PlottingUtil.circlePoint(tempLeftPt1,10,10,135);

            //求45度斜线
            for(var i = 0; i < shapePts.length-1;i++)
            {
                var result45 = SuperMap.Plot.PlottingUtil.intersectLines(tempLeftPt1, tempLeftPt2, shapePts[i], shapePts[i+1]);
                if(result45.isIntersectLines)
                {
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result45.intersectPoint,shapePts[i],shapePts[i+1])){
                        pts2D_45.push(result45.intersectPoint);
                    }
                }

                var result135 = SuperMap.Plot.PlottingUtil.intersectLines(tempLeftPt1, tempLeftPt3, shapePts[i], shapePts[i+1]);
                if(result135.isIntersectLines)
                {
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result135.intersectPoint,shapePts[i],shapePts[i+1])){
                        pts2D_135.push(result135.intersectPoint);
                    }
                }
            }

            if(1 < pts2D_45.length)
            {
                //将交点排序
                pts2D_45 = this.sortPts2D(pts2D_45);

                for(var j = 0; j < pts2D_45.length-1; j++)
                {
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((pts2D_45[j].x+pts2D_45[j+1].x)/2,(pts2D_45[j].y+pts2D_45[j+1].y)/2);
                    if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(shapePts,tempPt))
                    {
                        continue;
                    }

                    var linePts = [];
                    linePts.push(pts2D_45[j]);
                    linePts.push(pts2D_45[j+1]);

                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, style, true);
                }
            }

            if(1 < pts2D_135.length)
            {
                //将交点排序
                pts2D_135 = this.sortPts2D(pts2D_135);

                for(var j = 0; j < pts2D_135.length-1; j ++)
                {
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((pts2D_135[j].x+pts2D_135[j+1].x)/2,(pts2D_135[j].y+pts2D_135[j+1].y)/2);
                    if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(shapePts,tempPt))
                    {
                        continue;
                    }

                    var pts2D = [];
                    pts2D.push(pts2D_135[j]);
                    pts2D.push(pts2D_135[j+1]);

                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, style, true);
                }
            }

            if(pts2D_45.length > 0 || pts2D_135.length > 0)
            {
                bExist = true;
            }

            //往右画
            pts2D_45 = [];
            pts2D_135 = [];
            var tempRightPt1 = new SuperMap.Geometry.Point(dRightStep,ptCenter.y);
            var tempRightPt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempRightPt1,5,5,45);
            var tempRightPt3 = SuperMap.Plot.PlottingUtil.circlePoint(tempRightPt1,5,5,135);

            //求45度斜线
            for(var i = 0; i < shapePts.length-1;i++)
            {
                var result45 = SuperMap.Plot.PlottingUtil.intersectLines(tempRightPt1, tempRightPt2, shapePts[i], shapePts[i+1]);

                if(result45.isIntersectLines)
                {
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result45.intersectPoint,shapePts[i],shapePts[i+1])){
                        pts2D_45.push(result45.intersectPoint);
                    }
                }

                var result135 = SuperMap.Plot.PlottingUtil.intersectLines(tempRightPt1, tempRightPt3, shapePts[i], shapePts[i+1]);
                if(result135.isIntersectLines)
                {
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result135.intersectPoint,shapePts[i],shapePts[i+1])){
                        pts2D_135.push(result135.intersectPoint);
                    }
                }
            }

            if(1 < pts2D_45.length)
            {
                //将交点排序
                pts2D_45 = this.sortPts2D(pts2D_45);

                for(var j = 0; j < pts2D_45.length-1; j += 2 )
                {
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((pts2D_45[j].x+pts2D_45[j+1].x)/2,(pts2D_45[j].y+pts2D_45[j+1].y)/2);
                    if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(shapePts,tempPt))
                    {
                        continue;
                    }

                    var pts2D = [];
                    pts2D.push(pts2D_45[j]);
                    pts2D.push(pts2D_45[j+1]);

                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, style, true);
                }
            }

            if(1 < pts2D_135.length)
            {
                //将交点排序
                pts2D_135 = this.sortPts2D(pts2D_135);

                for(var j = 0; j < pts2D_135.length-1; j++)
                {
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((pts2D_135[j].x+pts2D_135[j+1].x)/2,(pts2D_135[j].y+pts2D_135[j+1].y)/2);
                    if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(shapePts,tempPt))
                    {
                        continue;
                    }

                    var pts2D = [];
                    pts2D.push(pts2D_135[j]);
                    pts2D.push(pts2D_135[j+1]);

                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, style, true);
                }
            }

            if(pts2D_45.length > 0 || pts2D_135.length > 0)
            {
                bExist = true;
            }

            dLeftStep  -= dSpace;
            dRightStep += dSpace;
        }

        this.clearBounds();
    },

    /**
     * Method: sortPts2D
     * 对位置点进行排序
     */
    sortPts2D: function(sourcePt2Ds)
    {
        for(var m = 0; m < sourcePt2Ds.length; m++)
        {
            for(var n = 0; n < sourcePt2Ds.length-1-m;n++)
            {
                if(SuperMap.Plot.PlottingUtil.equalFuzzy(sourcePt2Ds[n].x,sourcePt2Ds[n+1].x))
                {
                    if(sourcePt2Ds[n].y > sourcePt2Ds[n+1].y)
                    {
                        var tempPt = sourcePt2Ds[n];
                        sourcePt2Ds[n] = sourcePt2Ds[n+1];
                        sourcePt2Ds[n+1] = tempPt;
                    }
                }
                else
                {
                    if(sourcePt2Ds[n].x > sourcePt2Ds[n+1].x)
                    {
                        var tempPt = sourcePt2Ds[n];
                        sourcePt2Ds[n] = sourcePt2Ds[n+1];
                        sourcePt2Ds[n+1] = tempPt;
                    }
                }
            }
        }

        return sourcePt2Ds;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16500"
});
