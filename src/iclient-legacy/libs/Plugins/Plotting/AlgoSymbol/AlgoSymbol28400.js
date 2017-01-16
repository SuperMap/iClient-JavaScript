/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 9999;

        this.scaleValues = [];
        this.scaleValues.push(0.087081);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4801));
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

        if(this.scaleValues.length == 0){
            this.scaleValues = [];
            this.scaleValues.push(0.087081);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
        }

        //获取位置点
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
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        if(0 > shapePts.length){
            return;
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //求多边形的中心点
        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];

        var dSymbolSize = dScale0*dDistance;

        var center2D = new SuperMap.Geometry.Point(plygonCenter.x + dScale2 * dDistance, plygonCenter.y + dScale3 * dDistance);

        var minX = geoPts[0].x;
        var maxX = geoPts[0].x;

        for(var i = 0; i < geoPts.length; i++) {
            if(minX > geoPts[i].x) {
                minX = geoPts[i].x;
            }
            if(maxX < geoPts[i].x) {
                maxX = geoPts[i].x;
            }
        }

        var dSpace = maxX-minX;
        var symbolPt = new SuperMap.Geometry.Point(center2D.x-0.25*dSpace,center2D.y);
        var dSymbolAngle = 180.0;

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],symbolPt,dSymbolSize*2.5, dSymbolAngle);
        }

        //计算比例点
        this.scalePoints = [];
        var scalePt0 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dSymbolSize,dSymbolSize,180);
        this.addScalePoint(scalePt0);
        this.addScalePoint(symbolPt);
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
            if(index < 0 || index > 1){
                return;
            }
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

            //获取位置点折线总长
            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            //获取多边形的中心点
            var plygonCenter2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
            var centerPt = new SuperMap.Geometry.Point();
            centerPt.x = plygonCenter2D.x + this.scaleValues[2]*allDistance;
            centerPt.y = plygonCenter2D.y + this.scaleValues[3]*allDistance;

            var minX = geoPts[0].x;
            var maxX = geoPts[0].x;

            for(var i = 0; i < geoPts.length; i++) {
                if(minX > geoPts[i].x) {
                    minX = geoPts[i].x;
                }
                if(maxX < geoPts[i].x) {
                    maxX = geoPts[i].x;
                }
            }

            var dSpace = maxX-minX;

            var symbolPt = new SuperMap.Geometry.Point(centerPt.x-0.25*dSpace,centerPt.y);

            if(0 == index)
            {
                var distance = SuperMap.Plot.PlottingUtil.distance(pt,symbolPt);
                var dScale = distance/allDistance;

                this.scaleValues[0] = dScale;
            }
            else if(1 == index)
            {
                var dScale2 = (pt.x-plygonCenter2D.x+0.25*dSpace)/allDistance;
                this.scaleValues[2] = dScale2;

                var dScale3 = (pt.y-plygonCenter2D.y)/allDistance;
                this.scaleValues[3] = dScale3;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol28400"
});
