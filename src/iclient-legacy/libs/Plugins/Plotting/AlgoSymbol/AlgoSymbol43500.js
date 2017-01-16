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
SuperMap.Geometry.AlgoSymbol43500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        // this.scaleValues[0] = 0;
        // this.scaleValues[1] = 0;
        // this.scaleValues[2] = 0.1;
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

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dRadius = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);
        var nAngleStep = 15;
        //第一段圆弧
        var cellpts = [],i;
        for (i = nAngleStep; i <= 90-nAngleStep; i+=5) {
            cellpts.push(SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],dRadius,dRadius,i));
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);

        //第二段圆弧
        cellpts = [];
        for (i = 90+nAngleStep; i <= 180-nAngleStep; i+=5) {
            cellpts.push(SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],dRadius,dRadius,i));
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);
        //第三段圆弧
        cellpts = [];
        for (i = 180+nAngleStep; i <= 270-nAngleStep; i+=5) {
            cellpts.push(SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],dRadius,dRadius,i));
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);

        //第四段圆弧
        cellpts = [];
        for (i = 270+nAngleStep; i <= 360-nAngleStep; i+=5) {
            cellpts.push(SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],dRadius,dRadius,i));
        }
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);

        //重要点
        var ddis = dRadius * 0.2;
        var ptimport = new SuperMap.Geometry.Point((geoPts[0].x-ddis),geoPts[0].y);
        //折线点
        var ptpoly1,ptpoly2,ptpoly3,ptnouse;
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis,geoPts[0],ptimport);
        ptpoly1 = sidepoint.pntRight;
        ptpoly2 = sidepoint.pntLeft;

        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((2*ddis),ptpoly1,ptpoly2);
        ptnouse = sidepoint.pntRight;
        ptpoly3 = sidepoint.pntLeft;

        //三角形点
        var tranglept1,tranglept2;
        var temppt = new SuperMap.Geometry.Point((ptpoly1.x+2*ddis),ptpoly1.y);
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis,ptpoly1,temppt);
        tranglept1 = sidepoint.pntRight;
        tranglept2 = sidepoint.pntLeft;

        cellpts  = [];
        cellpts.push(ptpoly3);
        cellpts.push(ptpoly2);
        cellpts.push(ptpoly1);
        cellpts.push(tranglept2);
        cellpts.push(tranglept1);
        cellpts.push(ptpoly1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts,{fillLimit:true,lineTypeLimit:true,surroundLineLimit:true});
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol43500"
});

