/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol39500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SUBSYMSCALE :0.2,

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
        this.scaleValues.push(0.08);
        this.scaleValues.push(0.181818);
        this.scaleValues.push(0.285714);
        this.scaleValues.push(0.285714);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8700));
        }
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
            this.scaleValues = [];
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.08);
            this.scaleValues.push(0.181818);
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.285714);
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

        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd)* this.RTOD;

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
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPts[j], angle);
            shapePts.push(pt);
        }

        // 需要颠倒一下顺序，否则会导致衬线绘制不正确
        var allPts = [];
        for(var i = shapePts.length - 1; i >= 0; --i){
            allPts.push(shapePts[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, allPts);

        //添加子符号
        var midPt = geoPts[0];

        var ptStart2D = geoPts[0];
        var ptEnd2D = geoPts[1];

        //旋转角度
        var dAngle = SuperMap.Plot.PlottingUtil.radian(ptStart2D,ptEnd2D)*this.RTOD+270;
        var dSymbolSize = dDistance * this.SUBSYMSCALE;

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],midPt,dSymbolSize, dAngle);
        }

        this.scalePoints = [];
        this.addScalePoint(shapePts[0]);
        this.addScalePoint(shapePts[1]);
        this.addScalePoint(shapePts[2]);
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
        if(pt.isScalePoint && (index >= 0 || index < 3)){

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);

            var ptStart = geoPts[0].clone();
            var ptEnd = geoPts[1].clone();

            var ptScale2D = pt.clone();

            if(index == 0){
                var distance = SuperMap.Plot.PlottingUtil.distance(ptScale2D, ptStart);
                var scaleValue = distance/dDistance;
                this.scaleValues[0] = scaleValue;
            }
            else  if(index == 1){
                var ptPlumb = SuperMap.Plot.PlottingUtil.projectPoint(ptScale2D,ptStart,ptEnd);

                var distance1 = SuperMap.Plot.PlottingUtil.distance(ptPlumb, ptScale2D);
                var dScaleValue1 = distance1/dDistance;
                this.scaleValues[1] = dScaleValue1;

                var distance2 = SuperMap.Plot.PlottingUtil.distance(ptPlumb, ptEnd);
                var dScaleValue3 = distance2/dDistance;
                this.scaleValues[3] = dScaleValue3;
            }
            else if(index == 2){
                var ptPlumb = SuperMap.Plot.PlottingUtil.projectPoint(ptScale2D,ptStart,ptEnd);

                var distance1 = SuperMap.Plot.PlottingUtil.distance(ptPlumb, ptScale2D);
                var dScaleValue2 = distance1/dDistance;
                this.scaleValues[2] = dScaleValue2;

                var distance2 = SuperMap.Plot.PlottingUtil.distance(ptPlumb, ptEnd);
                var dScaleValue4 = distance2/dDistance;
                this.scaleValues[4] = dScaleValue4;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol39500"

});