/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26601 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        SuperMap.Geometry.AlgoSymbol26600.prototype.initialize.apply(this, arguments);

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

        var dLineDistance = allDistance * 0.02;

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //清理重复的点
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        //贝塞尔曲线的平行线

        //求贝塞尔曲线的左边的平行线
        var leftBezierPts  = SuperMap.Plot.PlottingUtil.paraLine(shapePts, dLineDistance*0.5, true);
        //求贝塞尔曲线的右边的平行线
        var rightBezierPts = SuperMap.Plot.PlottingUtil.paraLine(shapePts, dLineDistance*0.5, false);

        this.createDashLine(leftBezierPts);
        this.createDashLine(rightBezierPts);

        this.clearBounds();
    },

    //创建虚线
    createDashLine: function(linePts){
        var lineLength = SuperMap.Plot.PlottingUtil.polylineDistance(linePts);

        var stepLength = lineLength / 19;

        for(var i = 0; i < 18; i++){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(linePts, stepLength);
            if(-1 === result.index){
                continue;
            }

            if(0 === i%2){
                var pts = [];
                for(var m = 0; m < result.index+1; m++){
                    pts.push(linePts[m].clone());
                }
                pts.push(result.pt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts);
            }

            var tempPts = [];
            tempPts.push(result.pt);
            for(var k = result.index+1; k < linePts.length; k++){
                tempPts.push(linePts[k]);
            }

            linePts = [];
            linePts = linePts.concat(tempPts);
        }

        if(linePts.length > 1){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26601"
});
