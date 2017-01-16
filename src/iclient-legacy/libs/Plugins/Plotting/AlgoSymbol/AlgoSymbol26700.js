/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.1);
        this.scaleValues.push(0);

        this.subSymbols = [];
        this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4500));
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts) {
            return;
        }

        //清理重复的点
        var dalldis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var dparascale = this.scaleValues[0];
        var dparadis = dparascale * dalldis;

        var ptsparaleft = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dparadis, true);
        var ptspararight = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dparadis, false);

        var ptMid = new SuperMap.Geometry.Point((geoPts[0].x+geoPts[1].x) / 2, (geoPts[0].y+geoPts[1].y) / 2);


        var dsymbolsize = dparadis * 2 * 0.8;
        var dangle = SuperMap.Plot.PlottingUtil.radian(geoPts[0], geoPts[1]) * 180 / Math.PI;
        //计算子标号
        if (this.subSymbols.length > 0) {
            this.computeSubSymbol(this.subSymbols[0], ptMid, dsymbolsize, dangle);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsparaleft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptspararight);

        if (0 === this.scaleValues[1]) {
            this.addScalePoint(ptsparaleft[0]);
        }
        else {
            this.addScalePoint(ptspararight[0]);
        }

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
            if(this.scalePoints.length <= index)
                return;

            var geoPts = this.controlPoints;

            if (this.minEditPts > geoPts.length)
            {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            if(0 === dDistance)
            {
                return;
            }

            if(0 === index)
            {
                var dis = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[0]);
                var dScale = dis/dDistance;
                this.scaleValues[0] = dScale;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26700"
});
