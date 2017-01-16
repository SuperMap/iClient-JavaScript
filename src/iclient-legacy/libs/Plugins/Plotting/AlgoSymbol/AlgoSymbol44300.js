/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol44300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.088259);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);

        // if(this.subSymbols >= 0){
        //     this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 39100));
        // }
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
            this.scaleValues.push(0.088259);
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

        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        //求多边形的中心点
        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue() * 0.5;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];

        plygonCenter.x = plygonCenter.x + dScale2*dDistance;
        plygonCenter.y = plygonCenter.y + dScale3*dDistance;

        var dRadius1 = dScale0*dDistance;
        var pt2D1_1 = SuperMap.Plot.PlottingUtil.circlePoint(plygonCenter,dRadius1,dRadius1,90);
        var pt2D1_2 = SuperMap.Plot.PlottingUtil.circlePoint(plygonCenter,dRadius1,dRadius1,210);
        var pt2D1_3 = SuperMap.Plot.PlottingUtil.circlePoint(plygonCenter,dRadius1,dRadius1,330);

        var cellpts = [];
        cellpts.push(pt2D1_1);
        cellpts.push(pt2D1_2);
        cellpts.push(pt2D1_3);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,cellpts,{lineTypeLimit:true,lineColorLimit:true,strokeColor:"#0000FF",surroundLineLimit:true,fillLimit:true,fillStyle:0,fillColor:"#0000FF"});

        //计算比例点
        this.scalePoints = [];
        var ptScale2D0 = SuperMap.Plot.PlottingUtil.circlePoint(plygonCenter,dScale0*dDistance,dScale0*dDistance,180);
        this.addScalePoint(ptScale2D0);
        this.addScalePoint(plygonCenter);
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

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
            //求多边形的中心点
            var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

            if(0 == index)
            {
                var dX = dAllDistance*this.scaleValues[2];
                var dY = dAllDistance*this.scaleValues[3];
                var circleCenter2D = new SuperMap.Geometry.Point(plygonCenter.x+dX,plygonCenter.y+dY);

                var dDistance = SuperMap.Plot.PlottingUtil.distance(pt,circleCenter2D);
                var dScale0 = dDistance/dAllDistance;

                this.scaleValues[0] = dScale0;
            }
            else if(1 == index)
            {
                var tempdX = pt.x - plygonCenter.x;
                var tempdY = pt.y - plygonCenter.y;

                var dScale2 = tempdX/dAllDistance;
                var dScale3 = tempdY/dAllDistance;

                this.scaleValues[2] = dScale2;
                this.scaleValues[3] = dScale3;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol44300"
});
