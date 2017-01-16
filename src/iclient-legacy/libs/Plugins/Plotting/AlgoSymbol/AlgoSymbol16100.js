/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.minEditPts = 3;
        this.maxEditPts = 1000;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
            return;
        }
        else if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        //创建多边形
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);

        var polygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        var allDistance = 0;
        for(var i = 0; i < geoPts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
        }

        geoPts.push(geoPts[0]);

        var scaleValue = this.getSubSymbolScaleValue();
        var stepDis = allDistance * scaleValue;

        var exist = true;
        var leftStep = polygonCenter.x;
        var rightStep = polygonCenter.x+stepDis;

        var style = {surroundLineFlag: false,lineWidthLimit:true,strokeWidth:this.feature.style.strokeWidth*0.3};

        while(exist){
            exist = false;
            var pts_45 = [];
            var pts_135 = [];

            //往左画
            var tempLeftPt1 = new SuperMap.Geometry.Point(leftStep, polygonCenter.y);
            var tempLeftPt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempLeftPt1,10,10,45);
            var tempLeftPt3 = SuperMap.Plot.PlottingUtil.circlePoint(tempLeftPt1,10,10,135);

            for(var i = 0; i < geoPts.length-1; i++){
                var result45 = SuperMap.Plot.PlottingUtil.intersectLines(tempLeftPt1, tempLeftPt2, geoPts[i], geoPts[i+1]);
                if(result45.isIntersectLines){
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result45.intersectPoint,geoPts[i],geoPts[i+1])){
                        pts_45.push(result45.intersectPoint);
                    }
                }

                var result135 = SuperMap.Plot.PlottingUtil.intersectLines(tempLeftPt1, tempLeftPt3, geoPts[i], geoPts[i+1]);
                if(result135.isIntersectLines){
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result135.intersectPoint,geoPts[i],geoPts[i+1])){
                        pts_135.push(result135.intersectPoint);
                    }
                }
            }

            if(1 < pts_45.length){
                var tempPts45 = [];
                tempPts45 = this.sortPts2D(pts_45);

                for(var m = 0; m < tempPts45.length-1; m++){
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((tempPts45[m].x+tempPts45[m+1].x)/2, (tempPts45[m].y+tempPts45[m+1].y)/2);

                    if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(geoPts, tempPt)){
                        var linePts = [];
                        linePts.push(tempPts45[m]);
                        linePts.push(tempPts45[m+1]);

                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts,style,true);
                    }
                }
            }

            if(1 < pts_135.length){
                var tempPts135 = [];
                tempPts135 = this.sortPts2D(pts_135);

                for(var m = 0; m < tempPts135.length-1; m++){
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((tempPts135[m].x+tempPts135[m+1].x)/2, (tempPts135[m].y+tempPts135[m+1].y)/2);

                    if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(geoPts, tempPt)){
                        var linePts = [];
                        linePts.push(tempPts135[m]);
                        linePts.push(tempPts135[m+1]);

                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, style, true);
                    }
                }
            }

            if(pts_45.length > 0 || pts_135.length > 0){
                exist = true;
            }

            //往右画
            pts_45 = [];
            pts_135 = [];

            var tempRightPt1 = new SuperMap.Geometry.Point(rightStep,polygonCenter.y);
            var tempRightPt2 = SuperMap.Plot.PlottingUtil.circlePoint(tempRightPt1,10,10,45);
            var tempRightPt3 = SuperMap.Plot.PlottingUtil.circlePoint(tempRightPt1,10,10,135);

            for(var i = 0; i < geoPts.length-1; i++){
                var result45 = SuperMap.Plot.PlottingUtil.intersectLines(tempRightPt1, tempRightPt2, geoPts[i], geoPts[i+1]);
                if(result45.isIntersectLines){
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result45.intersectPoint,geoPts[i],geoPts[i+1])){
                        pts_45.push(result45.intersectPoint);
                    }
                }

                var result135 = SuperMap.Plot.PlottingUtil.intersectLines(tempRightPt1, tempRightPt3, geoPts[i], geoPts[i+1]);
                if(result135.isIntersectLines){
                    if(SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(result135.intersectPoint,geoPts[i],geoPts[i+1])){
                        pts_135.push(result135.intersectPoint);
                    }
                }
            }

            if(1 < pts_45.length){
                var tempPts45 = [];
                tempPts45 = this.sortPts2D(pts_45);

                for(var m = 0; m < tempPts45.length-1; m++){
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((tempPts45[m].x+tempPts45[m+1].x)/2, (tempPts45[m].y+tempPts45[m+1].y)/2);

                    if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(geoPts, tempPt)){
                        var linePts = [];
                        linePts.push(tempPts45[m]);
                        linePts.push(tempPts45[m+1]);

                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, style,true);
                    }
                }
            }

            if(1 < pts_135.length){
                var tempPts135 = [];
                tempPts135 = this.sortPts2D(pts_135);

                for(var m = 0; m < tempPts135.length-1; m++){
                    //计算中点
                    var tempPt = new SuperMap.Geometry.Point((tempPts135[m].x+tempPts135[m+1].x)/2, (tempPts135[m].y+tempPts135[m+1].y)/2);

                    if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(geoPts, tempPt)){
                        var linePts = [];
                        linePts.push(tempPts135[m]);
                        linePts.push(tempPts135[m+1]);

                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, style,true);
                    }
                }
            }

            if(pts_45.length > 0 || pts_135.length > 0){
                exist = true;
            }

            leftStep  -= stepDis;
            rightStep += stepDis;
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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16100"
});
