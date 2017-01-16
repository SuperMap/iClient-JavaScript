/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26600 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //清理重复的点
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var stepLength = allDistance / 19;
        for(var i = 0; i < 18; i++){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, stepLength);
            if(-1 === result.index){
                continue;
            }

            if(0 === i%2){
                var pts = [];
                for(var m = 0; m < result.index+1; m++){
                    pts.push(shapePts[m].clone());
                }
                pts.push(result.pt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts);
            }

            var tempPts = [];
            tempPts.push(result.pt);
            for(var k = result.index+1; k < shapePts.length; k++){
                tempPts.push(shapePts[k]);
            }

            shapePts = [];
            shapePts = shapePts.concat(tempPts);
        }

        if(shapePts.length > 1){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);
        }

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26600"
});
