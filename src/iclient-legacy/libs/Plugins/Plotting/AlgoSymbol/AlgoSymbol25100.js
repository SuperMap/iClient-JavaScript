/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25000, {

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
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues.push(0.285714);
        this.scaleValues.push(0.285714);
        this.scaleValues.push(0.5);
        this.scaleValues.push(0.333333);
        this.scaleValues.push(0.333333);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        if(geoPts.length == 0){
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.5);
            this.scaleValues.push(0.333333);
            this.scaleValues.push(0.333333);
        }

        var ptStart = geoPts[0].clone();
        var ptEnd = geoPts[1].clone();
        var dDistance = SuperMap.Plot.PlottingUtil.distance(ptStart, ptEnd);

        var scaleValue0 = this.scaleValues[0];
        var pt1 = new SuperMap.Geometry.Point(0, -dDistance*scaleValue0);
        var pt7 = new SuperMap.Geometry.Point(0, dDistance*scaleValue0);

        var scaleValue1 = this.scaleValues[1];
        var scaleValue3 = this.scaleValues[3];
        var pt2 = new SuperMap.Geometry.Point(dDistance*(1-scaleValue3),-dDistance*scaleValue1);
        var pt6 = new SuperMap.Geometry.Point(dDistance*(1-scaleValue3), dDistance*scaleValue1);

        var scaleValue2 = this.scaleValues[2];
        var scaleValue4 = this.scaleValues[4];
        var pt3 = new SuperMap.Geometry.Point(dDistance*(1-scaleValue4),-dDistance*scaleValue2);
        var pt5 = new SuperMap.Geometry.Point(dDistance*(1-scaleValue4), dDistance*scaleValue2);

        var pt4 = new SuperMap.Geometry.Point(dDistance, 0);

        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd);

        var tempPts = [];
        tempPts.push(pt1);
        tempPts.push(pt2);
        tempPts.push(pt3);
        tempPts.push(pt4);
        tempPts.push(pt5);
        tempPts.push(pt6);
        tempPts.push(pt7);

        var shapePts = [];
        for(var j = 0; j < tempPts.length; j++){
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPts[j], angle * this.RTOD);
            shapePts.push(pt);
        }

        // 需要颠倒一下顺序，否则会导致衬线绘制不正确
        var allPts = [];
        for(var i = shapePts.length - 1; i >= 0; --i){
            allPts.push(shapePts[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        this.scalePoints = [];
        var scalePt1 = shapePts[0].clone();
        scalePt1.isScalePoint = true;
        scalePt1.tag = 0;
        this.scalePoints.push(scalePt1);
        var scalePt2 = shapePts[1].clone();
        scalePt2.isScalePoint = true;
        scalePt2.tag = 1;
        this.scalePoints.push(scalePt2);
        var scalePt3 = shapePts[2].clone();
        scalePt3.isScalePoint = true;
        scalePt3.tag = 2;
        this.scalePoints.push(scalePt3);

        //添加小折线
        //计算偏移量
        var drifthead = dDistance*0.04;//箭头偏移量
        var drifttail = dDistance*0.0475;//箭尾偏移量

        //箭头偏移点
        var spt0 = new SuperMap.Geometry.Point((pt4.x - drifthead),0);

        //计算交点

        var tempspt= new SuperMap.Geometry.Point(pt3.x,(pt3.y + drifttail));
        var intersect = SuperMap.Plot.PlottingUtil.intersectLines(pt2,pt3,spt0,tempspt);
        var spt1 = intersect.intersectPoint;
        if(intersect.isIntersectLines == false)
            return;

        //计算交点

        var tempspt2 = new SuperMap.Geometry.Point(pt5.x,(pt5.y - drifttail));
        intersect = SuperMap.Plot.PlottingUtil.intersectLines(pt5,pt6,spt0,tempspt2);
        var spt2 = intersect.intersectPoint;
        if(intersect.isIntersectLines == false)
            return;

        var smalltempPts = [];
        smalltempPts.push(spt1);
        smalltempPts.push(spt0);
        smalltempPts.push(spt2);

        var smallshapePts = [];
        for(var p = 0; p < smalltempPts.length; p++)
        {
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,smalltempPts[p],angle*this.RTOD);
            smallshapePts.push(pt);
        }

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, smallshapePts);
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25100"
});