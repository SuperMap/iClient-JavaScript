/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues.push(0.02);
        this.scaleValues.push(0.1);
        this.scaleValues.push(0);
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
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //计算贝塞尔曲线拟合点
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        var subSymbolScale = this.getSubSymbolScaleValue();

        if(!this.isEdit){
            this.scaleValues[0] = subSymbolScale * 0.5;
        }

        var subLineLen = this.scaleValues[0] * allDistance;

        //贝塞尔曲线的平行线
        var leftBezierPts = [], rightBezierPts = [];
        //求贝塞尔曲线的左边的平行线
        leftBezierPts = SuperMap.Plot.PlottingUtil.paraLine(shapePts, subLineLen*0.5, true);
        //求贝塞尔曲线的右边的平行线
        rightBezierPts = SuperMap.Plot.PlottingUtil.paraLine(shapePts, subLineLen*0.5, false);

        leftBezierPts = SuperMap.Plot.PlottingUtil.clearSamePts(leftBezierPts);
        rightBezierPts = SuperMap.Plot.PlottingUtil.clearSamePts(rightBezierPts);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, leftBezierPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, rightBezierPts);

        var lineStepDis = allDistance * this.scaleValues[1];

        var startDis = subLineLen * 0.5;

        var curveDis = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        for(var d = startDis, index = 0; d < curveDis; d += lineStepDis, index++){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,d);
            if(-1 === result.index){
                continue;
            }

            var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(subLineLen,shapePts[result.index+1],result.pt);

            var linePts = [];
            linePts.push(leftAndRightPt.pntLeft);
            linePts.push(leftAndRightPt.pntRight);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts);

            if(0 === index){
                this.addScalePoint(leftAndRightPt.pntRight,0);
            }
            else if(1 === index){
                this.addScalePoint(result.pt,1);
            }
        }

        this.clearBounds();
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function(index, pt) {
        this.isEdit = true;

        if(pt.isScalePoint === true){
            //获取位置点
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

            var allDistance = 0;
            for(var i = 0; i < geoPts.length-1; i++){
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
            }

            //计算贝塞尔曲线拟合点
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

            if(0 == index)     //修改第0个比例点
            {
                var subLineLen = allDistance * this.scaleValues[0];
                var startDis = subLineLen * 0.5;

                var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,startDis);
                if(-1 === result.index){
                    return;
                }

                //根据平面类型来取出二维点
                var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(startDis, shapePts[result.index], result.pt);

                //求此点到图元几何点线段的垂足
                //var footPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, leftAndRightPt.pntLeft, result.pt);

                var dLineDistance = SuperMap.Plot.PlottingUtil.distance(pt, result.pt);

                //更新第0个比例值
                this.scaleValues[0] = dLineDistance/allDistance;
            }
            else if(1 === index)        //修改第1个比例点
            {
                var subLineLen = allDistance * this.scaleValues[0];
                var startDis = subLineLen * 0.5;

                var result1 = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,startDis);
                if(-1 === result1.index){
                    return;
                }

                var result2 = SuperMap.Plot.PlottingUtil.projectPtOnPolyLine(pt, shapePts);
                if(-1 == result2.index)
                {
                    return;
                }

                var dLineLength = SuperMap.Plot.PlottingUtil.distance(result1.pt, shapePts[result1.index+1]);
                for(var i = result1.index+1; i < result2.index; i++){
                    dLineLength += SuperMap.Plot.PlottingUtil.distance(shapePts[i], shapePts[i+1]);
                }
                dLineLength += SuperMap.Plot.PlottingUtil.distance(shapePts[result2.index], result2.pt);

                //更新第1个比例值
                this.scaleValues[1] = dLineLength/allDistance;
            }
        }


        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16200"
});
