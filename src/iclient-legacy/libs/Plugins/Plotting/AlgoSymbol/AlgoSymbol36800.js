/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol36800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SCALE :0.1,

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
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2)
        {
            return;
        }

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues[0] = 0.05;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dAllDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);

        //创建主体直线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);

        //创建头部垂线
        var ddis = this.SCALE * dAllDistance;
        var ptStartrx,ptStartry,ptStartlx,ptStartly;
        var ptEndrx,ptEndry,ptEndlx,ptEndly;
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis,geoPts[1], geoPts[0]);
        var ptStartr = sidepoint.pntRight;
        var ptStartl = sidepoint.pntLeft;
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis,geoPts[0], geoPts[1]);
        var ptEndr = sidepoint.pntRight;
        var ptEndl = sidepoint.pntLeft;

        var ptsHead = [];
        ptsHead.push(ptStartr);
        ptsHead.push(ptStartl);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ptsHead);

        //创建尾部垂线
        var ptsTail = [];
        ptsTail.push(ptEndr);
        ptsTail.push(ptEndl);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ptsTail);

        //创建虚线
        var ptsDashLine = [];
        ptsDashLine.push(ptStartr);
        ptsDashLine.push(ptEndl);

        var dParaLineDis = SuperMap.Plot.PlottingUtil.polylineDistance(ptsDashLine);
        var dStepDis = dParaLineDis/11.0;
        var dCurentDis = dStepDis;
        for (var i = 0; i < 11; i++)
        {
            var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCurentDis-dStepDis, ptsDashLine);
            if(!ptsindex.bfind)
            {
                continue;
            }
            var nStartIndex = ptsindex.index;
            var tempStartPt = ptsindex.pts;

            ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCurentDis, ptsDashLine);
            if(!ptsindex.bfind)
            {
                continue;
            }
            var nEndIndex = ptsindex.index;
            var tempEndPt = ptsindex.pts;

            if (i%2 == 0)
            {
                var tempPts = [];
                tempPts.push(tempStartPt);
                for (var n = nStartIndex+1; n <= nEndIndex; n++)
                {
                    tempPts.push(ptsDashLine[n]);
                }
                tempPts.push(tempEndPt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,tempPts,{
                    lineColorLimit: true,
                    strokeColor: "#0000FF",
                    surroundLineLimit: true
                });
            }

            dCurentDis += dStepDis;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol36800"
});

