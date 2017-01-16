/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol40100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.05);
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
            this.scaleValues.push(0.05);
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

        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //求多边形的中心点
        var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue() * 0.5;
        }

        var dScaleValue0 = this.scaleValues[0];
        var dScaleValue1 = this.scaleValues[1];
        var dScaleValue2 = this.scaleValues[2];
        var dScaleValue3 = this.scaleValues[3];

        var dRadius = dAllDistance * dScaleValue0;
        var dX = dAllDistance * dScaleValue2;
        var dY = dAllDistance * dScaleValue3;

        var symbolCenter = new SuperMap.Geometry.Point(plygonCenter.x+dX,plygonCenter.y+dY);

        //十字图元
        var dRadius1 = 0.6*dRadius;
        var ptCenter1 = new SuperMap.Geometry.Point(symbolCenter.x+dRadius,symbolCenter.y);

        //十字横线
        var pt1_1 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter1,dRadius1,dRadius1,0);
        var pt1_2 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter1,dRadius1,dRadius1,180);

        var cellpts = [];
        cellpts.push(pt1_1);
        cellpts.push(pt1_2);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts,{lineTypeLimit:true});

        //十字竖线
        var pt1_3 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter1,dRadius1,dRadius1,90);
        var pt1_4 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter1,dRadius1,dRadius1,270);

        cellpts = [];
        cellpts.push(pt1_3);
        cellpts.push(pt1_4);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts,{lineTypeLimit:true});

        //航天力量图元
        var ptCenter2 = new SuperMap.Geometry.Point(symbolCenter.x-dRadius,symbolCenter.y);
        var pt2_1 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter2,0.5*dRadius,0.5*dRadius,270);
        var pt2_2 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter2,dRadius,dRadius,240);
        var pt2_3 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter2,dRadius,dRadius,90);
        var pt2_4 = SuperMap.Plot.PlottingUtil.circlePoint(ptCenter2,dRadius,dRadius,300);

        cellpts = [];
        cellpts.push(pt2_1);
        cellpts.push(pt2_2);
        cellpts.push(pt2_3);
        cellpts.push(pt2_4);
        cellpts.push(pt2_1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts,{lineTypeLimit:true});

        //计算比例点
        this.scalePoints = [];
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolCenter,dRadius,dRadius,0);
        this.addScalePoint(scalePt2);
        this.addScalePoint(symbolCenter);
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

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            //求多边形的中心点
            var plygonCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol40100"
});
