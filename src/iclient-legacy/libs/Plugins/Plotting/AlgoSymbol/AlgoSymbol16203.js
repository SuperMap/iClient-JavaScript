/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16203 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        var subSymbolScale = this.getSubSymbolScaleValue();

        if(!this.isEdit){
            this.scaleValues[0] = subSymbolScale * 0.3;
        }

        //折线段长度
        var lineLength = this.scaleValues[0] * allDistance;

        //第1个比例值是两大折线段之间的距离／各定位点间折线总长
        //两大折线段之间的距离
        var dLineDistance = this.scaleValues[1] * allDistance;

        //起始段长度
        var dStartLength = 0.05 * allDistance;

        var shapePtsLen = 0;
        for(var i = 0; i < shapePts.length-1; i++){
            shapePtsLen += SuperMap.Plot.PlottingUtil.distance(shapePts[i],shapePts[i+1]);
        }

        for(var d = dStartLength, index = 0; d <= shapePtsLen; d += dLineDistance,index++)
        {
            //计算曲线上小线段的长度
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d);
            if(-1 === result.index)
            {
                return;
            }

            //根据平面类型来取出二维点
            var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, shapePts[result.index], result.pt);

            //添加折线的两个点
            var linePts = [];
            linePts.push(leftAndRightPt.pntLeft);
            linePts.push(leftAndRightPt.pntRight);

            if(0 === index)
            {
                this.addScalePoint(linePts[0],0);
            }
            else if(1 === index)
            {
                this.addScalePoint(result.pt,1);
            }

            var style = {surroundLineFlag: false,lineWidthLimit:true,strokeWidth:this.feature.style.strokeWidth*6};
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, style);
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

            var startDis = allDistance * 0.05;

            if(0 == index)     //修改第0个比例点
            {
                var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,startDis);
                if(-1 === result.index){
                    return;
                }

                var dLineDistance = SuperMap.Plot.PlottingUtil.distance(pt, result.pt);

                //更新第0个比例值
                this.scaleValues[0] = dLineDistance/allDistance;
            }
            else if(1 == index)        //修改第1个比例点
            {
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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16203"
});
