/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 1000;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if(geoPts.length <= this.minEditPts){
            if(geoPts.length >= 2){
                this.calAssistantLine();
            }
            return;
        }

        var minX = geoPts[0].x;
        var maxX = geoPts[0].x;

        for(var i = 0; i < geoPts.length; i++)
        {
            if(minX > geoPts[i].x)
                minX = geoPts[i].x;

            if(maxX < geoPts[i].x)
                maxX = geoPts[i].x;
        }

        var dSpaceLen = (maxX-minX)/50;

        //创建外面的任意多边形
        var ptsOut2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,true);

        //创建里面的任意多边形
        var ptsInner2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,false);

        //取外多边的三个点pts，取内多边形的一个点pt，
        //如果pt在pts内则pts是外面的多边形，否则是内多边形

        if(ptsOut2D.length > 2 && ptsInner2D.length > 0)
        {
            var tempPts = [];
            for(var i = 0; i < ptsOut2D.length; i++)
            {
                tempPts.push(ptsOut2D[i]);
            }
            var tempPt = ptsInner2D[0];

            var tempPts2D = [];

            if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(tempPts,tempPt))
            {
                tempPts2D = tempPts2D.concat(ptsOut2D);

                ptsOut2D = [];
                ptsOut2D = ptsOut2D.concat(ptsInner2D);

                ptsInner2D = [];
                ptsInner2D = ptsInner2D.concat(tempPts2D);
            }
        }

        //创建任意多边形图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, ptsOut2D);

        var style = {surroundLineFlag: false,lineWidthLimit:true,strokeWidth:this.feature.style.strokeWidth*0.3};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, ptsInner2D, style, true);

        //获得任意多边形的中心
        ptsInner2D.push(ptsInner2D[0]);

        var polygoncenter =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        var dSpace = dSpaceLen*10.0;

        var bExist = true;
        var dLeftStep = polygoncenter.x;
        var dRightStep = polygoncenter.x;
        while(bExist)
        {
            bExist = false;
            var pts2D_45 = [];

            //往左画
            var tempLeftPt1 = new SuperMap.Geometry.Point(dLeftStep,polygoncenter.y);
            var tempLeftPt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempLeftPt1,10,10,45);

            //求45度斜线
            for(var i = 0; i < ptsInner2D.length-1;i++)
            {
                var intersectResult = SuperMap.Plot.PlottingUtil.intersectLines(tempLeftPt1,tempLeftPt2,ptsInner2D[i],ptsInner2D[i+1]);

                if(intersectResult.isIntersectLines)
                {
                    var pt45 = intersectResult.intersectPoint;
                    var tempPts2D = [];
                    tempPts2D.push(ptsInner2D[i]);
                    tempPts2D.push(ptsInner2D[i+1]);

                    var result = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(pt45,tempPts2D);
                    if(result.isOnPolyLine)
                    {
                        pts2D_45.push(pt45);
                    }
                }
            }

            if(1 < pts2D_45.length)
            {
                //将交点排序
                this.sortPts2D(pts2D_45);

                for(var j = 0; j < pts2D_45.length-1; j++)
                {
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((pts2D_45[j].x+pts2D_45[j+1].x)/2,(pts2D_45[j].y+pts2D_45[j+1].y)/2);
                    if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(ptsInner2D,tempPt))
                    {
                        var pts2D = [];
                        pts2D.push(pts2D_45[j]);
                        pts2D.push(pts2D_45[j+1]);

                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, style, true);
                    }
                }
            }

            if(pts2D_45.length > 0)
            {
                bExist = true;
            }

            //往右画
            pts2D_45 = [];
            var tempRightPt1 = new SuperMap.Geometry.Point(dRightStep,polygoncenter.y);
            var tempRightPt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempRightPt1,5,5,45);

            //求45度斜线
            for(var i = 0; i < ptsInner2D.length-1;i++)
            {
                var result = SuperMap.Plot.PlottingUtil.intersectLines(tempRightPt1,tempRightPt2,ptsInner2D[i],ptsInner2D[i+1]);

                if(result.isIntersectLines)
                {
                    var pt45 = result.intersectPoint;
                    var tempPts2D = [];
                    tempPts2D.push(ptsInner2D[i]);
                    tempPts2D.push(ptsInner2D[i+1]);

                    var result = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(pt45,tempPts2D);
                    if(result.isOnPolyLine)
                    {
                        pts2D_45.push(pt45);
                    }
                }
            }

            if(1 < pts2D_45.length)
            {
                //将交点排序
                this.sortPts2D(pts2D_45);

                for(var j = 0; j < pts2D_45.length-1; j++ )
                {
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((pts2D_45[j].x+pts2D_45[j+1].x)/2,(pts2D_45[j].y+pts2D_45[j+1].y)/2);
                    if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(ptsInner2D,tempPt))
                    {
                        var pts2D = [];
                        pts2D.push(pts2D_45[j]);
                        pts2D.push(pts2D_45[j+1]);

                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, style, true);
                    }
                }
            }

            if(pts2D_45.length > 0)
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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25700"
})