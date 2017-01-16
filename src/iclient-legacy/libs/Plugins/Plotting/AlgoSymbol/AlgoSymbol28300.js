/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues = [];
        this.scaleValues.push(0.1);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 18600));
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

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        var dAllDis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var centerPt2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        //获取比例值
        var dScale0 = this.scaleValues[0];
        var dSymbolSize = dAllDis*dScale0;

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],centerPt2D,dSymbolSize, 0);
        }

        this.scalePoints = [];
        var scalePt2D = SuperMap.Plot.PlottingUtil.circlePoint(centerPt2D,dSymbolSize,dSymbolSize,0.0);
        this.addScalePoint(scalePt2D);
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if(index != 0){
                return;
            }
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

            var dAllDis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            var centerPt2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

            if(index == 0){
                var distance = SuperMap.Plot.PlottingUtil.distance(pt,centerPt2D);
                var dScaleValue = distance/dAllDis;
                this.scaleValues[0] = dScaleValue;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol28300"
});
