/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28301 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.3);
        this.scaleValues.push(1.0);

        if(this.subSymbols.length >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 18600));
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

        if(this.scaleValues.length != 2){
            this.scaleValues = [];
            this.scaleValues.push(0.3);
            this.scaleValues.push(1.0);
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);

        var ptStart = geoPts[0].clone();
        var ptEnd = geoPts[1].clone();

        var dSymbolSize = SuperMap.Plot.PlottingUtil.distance(ptStart,ptEnd);
        //获取比例值
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];

        //旋转角度
        var dAngle;
        if(SuperMap.Plot.PlottingUtil.equalFuzzy(1.0,dScale1))
        {
            dAngle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd) + 270 * this.DTOR;
        }
        else
        {
            dAngle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd) + 90 * this.DTOR;

            var tempPt;
            tempPt = ptStart;
            ptStart = ptEnd;
            ptEnd = tempPt;
        }

        var dSize = dSymbolSize*dScale0*0.67;

        var ptLeft = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dSize,dSize,dAngle*this.RTOD);

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],ptLeft,dSymbolSize*dScale0, dAngle*this.RTOD);
        }

        var ptRight = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,dSize,dSize,dAngle*this.RTOD);

        if(this.subSymbols.length > 1){
            this.computeSubSymbol(this.subSymbols[1],ptRight,dSymbolSize*dScale0, dAngle*this.RTOD);
        }

        this.scalePoints = [];
        var scaleAngle = dAngle*this.RTOD;
        var disScale = dSymbolSize * dScale0;
        var circlePt = geoPts[0].clone();
        var scalePt2D = SuperMap.Plot.PlottingUtil.circlePoint(circlePt,disScale,disScale,scaleAngle);
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

            var ptStart = geoPts[0].clone();
            var ptEnd = geoPts[1].clone();
            var ptScale2D = pt.clone();

            var dDistance = SuperMap.Plot.PlottingUtil.distance(ptStart,ptEnd);
            var dScaleDis = SuperMap.Plot.PlottingUtil.PlumbLineLen(ptScale2D,ptStart,ptEnd);

            var dScale0 = dScaleDis/dDistance;

            if(dScale0 < 0.0 || SuperMap.Plot.PlottingUtil.equalFuzzy(dScale0,0.0)) {
                return;
            }

            this.scaleValues[0] = dScale0;

            if(SuperMap.Plot.PlottingUtil.PointIsRightToLine(ptStart,ptEnd,ptScale2D)) {
                this.scaleValues[1] = 1.0;
            }
            else {
                this.scaleValues[1] = 0.0;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol28301"
});
