/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol23500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        this.scaleValues = [];
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 1300));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        if(4 > this.scaleValues.length){
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
        }

        var shapePts = [];
        if(3 >= geoPts.length){
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
        }
        else{
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        //创建圆图元
        //获取位置点折线总长
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue()*2;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];
        var subSymbolSize = allDistance*dScale0;

        var symbolPt = new SuperMap.Geometry.Point(plygonCenter.x+allDistance*dScale2,plygonCenter.y+allDistance*dScale3);


        if(this.subSymbols && null !== this.subSymbols && this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], symbolPt, subSymbolSize, 0);
        }

        this.addScalePoint(symbolPt);

        var radius = subSymbolSize;
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,radius,radius,90);
        this.addScalePoint(scalePt2);

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
        if(pt.isScalePoint === true){
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            if (geoPts.length < this.minEditPts)
            {
                return;
            }

            var shapePts = [];
            if(3 >= geoPts.length){
                //计算猪腰子拟合点
                var primitives = new SuperMap.Geometry.Primitives();
                shapePts = primitives.getKendyShapePts(geoPts);
            }
            else{
                geoPts.push(geoPts[0]);
                shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            }
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
            var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);
            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            if(0 === index)//圆上点
            {
                var dScale2 = (pt.x-centerPt.x)/dDistance;
                this.scaleValues[2] = dScale2;

                var dScale3 = (pt.y-centerPt.y)/dDistance;
                this.scaleValues[3] = dScale3;
            }
            else if(1 === index){
                var dScale2 = this.scaleValues[2];
                var dScale3 = this.scaleValues[3];

                var symbolPt = new SuperMap.Geometry.Point(centerPt.x+dDistance*dScale2,centerPt.y+dDistance*dScale3);
                var dDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,pt);
                var dScale0 = dDis/dDistance;
                this.scaleValues[0] = dScale0;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol23500"
});