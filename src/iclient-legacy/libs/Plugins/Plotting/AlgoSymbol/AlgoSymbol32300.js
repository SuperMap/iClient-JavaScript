/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol32300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    INNERSACLE :0.5,
    RADIUSSACLE :0.09,
    CERCLESACLE :0.37,

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

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var ptStart =  geoPts[0];
        var ptEnd = geoPts[1];

        var ptHead;
        if (2 == geoPts.length)
        {
            ptHead = ptEnd;
        }
        else
        {
            ptHead = geoPts[2];
        }


        //计算两个尾点的中点
        var ptTailCenter = new SuperMap.Geometry.Point(((ptStart.x + ptEnd.x)/2),((ptStart.y + ptEnd.y)/2));

        //计算尾点的中心点和第三个点的距离
        var dDistance = SuperMap.Plot.PlottingUtil.distance(ptTailCenter, ptHead);
        var dHeaddis = dDistance*this.INNERSACLE;

        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dHeaddis,ptTailCenter,ptHead);
        var ptHeadLeft = sidepoint.pntLeft;
        var ptHeadRight = sidepoint.pntRight;

        var bisright = !(ptTailCenter.x > ptHead.x);

        var shapePts = [];
        if(bisright) {
            shapePts.push(ptStart);
            shapePts.push(ptHeadLeft);
        }
        else
        {
            shapePts.push(ptStart);
            shapePts.push(ptHeadRight);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        //创建折线图元
        var shapePts2 = [];

        if(bisright)
        {
            shapePts2.push(ptEnd);
            shapePts2.push(ptHeadRight);
        }
        else
        {
            shapePts2.push(ptEnd);
            shapePts2.push(ptHeadLeft);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts2);

        //圆心
        var dCenterdis = dDistance*this.CERCLESACLE;
        var ptCercleCenter = SuperMap.Plot.PlottingUtil.LinePnt(ptTailCenter,ptHead,dCenterdis);

        //圆的半径
        var dRadius = dDistance*this.RADIUSSACLE;

        //创建圆图元
        var circlePts = [];
        circlePts.push(ptCercleCenter);
        circlePts.push(new SuperMap.Geometry.Point(ptCercleCenter.x, ptCercleCenter.y + dRadius));

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,circlePts);

        //添加折线图元
        var sidepoint,polylinept1,polylinept2, polylinept3,polylinept4,ptnouse;
        if(bisright){
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,ptTailCenter,ptCercleCenter);
            ptnouse = sidepoint.pntRight;
            polylinept1 = sidepoint.pntLeft;
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius*2,ptTailCenter,ptCercleCenter);
            ptnouse = sidepoint.pntRight;
            polylinept2 = sidepoint.pntLeft;
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,polylinept1,polylinept2);
            polylinept3 = sidepoint.pntRight;
            polylinept4 = sidepoint.pntLeft;
        }
        else{
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,ptTailCenter,ptCercleCenter);
            polylinept1 = sidepoint.pntRight;
            ptnouse = sidepoint.pntLeft;
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius*2,ptTailCenter,ptCercleCenter);
            polylinept2 = sidepoint.pntRight;
            ptnouse = sidepoint.pntLeft;
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,polylinept1,polylinept2);
            polylinept3 = sidepoint.pntRight;
            polylinept4 = sidepoint.pntLeft;
        }

        var shapePts3 = [];
        shapePts3.push(polylinept1);
        shapePts3.push(polylinept2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts3,{lineTypeLimit:true});

        var shapePts4 = [];
        shapePts4.push(polylinept3);
        shapePts4.push(polylinept4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts4,{lineTypeLimit:true});
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol32300"
});
