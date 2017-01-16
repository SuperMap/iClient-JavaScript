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
SuperMap.Geometry.AlgoSymbol42700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SCALE :0.04,
    BODYSCALE :0.02,

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
        //
        // if(this.scaleValues.length < 3){
        //     this.scaleValues = [];
        //     this.scaleValues[0] = 0;
        //     this.scaleValues[1] = 0;
        //     this.scaleValues[2] = 0.1;
        // }

        // if(!this.isEdit){
        //     this.scaleValues[2] = this.getSubSymbolScaleValue();
        // }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        // var dScaleValue0 = this.scaleValues[0];
        // var dScaleValue1 = this.scaleValues[1];
        // var dScaleValue2 = this.scaleValues[2];

        // var dOutRecDis = SuperMap.Plot.PlottingUtil.GetOutRectangleDis(geoPts);
        // if(0 == dOutRecDis)
        // {
        //     return;
        // }

        //创建任意多边形图元
        if (2 == geoPts.length) {
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);
        }
        else {
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,geoPts,{fill:false});
        }

        //获得任意多边形的中心
        var polygoncenter =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        //画小人
        //画头部，圆形
        var PeopleHeadCenter;//头部的圆心
        var ptnouse;//头部的圆心
        var PeopleHeadRadius;//头部半径

        PeopleHeadRadius = (dDistance*this.SCALE)/2;
        var  Peopledis = dDistance * this.BODYSCALE;//this.getSubSymbolScaleValue();
        var  tempdis = Peopledis + PeopleHeadRadius;

        PeopleHeadCenter = new SuperMap.Geometry.Point(polygoncenter.x,(polygoncenter.y+tempdis));//头部的圆心

        // //获得人头的圆心
        // var sidepoint;
        // if(isright == true){
        //     sidepoint  = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(tempdis,ptEnd,ptStart);
        //     PeopleHeadCenter = sidepoint.pntRight;
        //     ptnouse = sidepoint.pntLeft;
        // }
        // else{
        //     sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(tempdis,ptEnd,ptStart);
        //     PeopleHeadCenter = sidepoint.pntLeft;
        //     ptnouse = sidepoint.pntRight;
        // }

        var cellpts = [];
        cellpts.push(PeopleHeadCenter);
        cellpts.push(new SuperMap.Geometry.Point(PeopleHeadCenter.x+PeopleHeadRadius,PeopleHeadCenter.y));
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, cellpts);

        //画小人的身体
        //用任意多边形
        var PeopleBodypt1 = new SuperMap.Geometry.Point(polygoncenter.x,(polygoncenter.y+Peopledis*0.8));
        var PeopleBodypt2 = new SuperMap.Geometry.Point((polygoncenter.x-Peopledis),(polygoncenter.y - Peopledis));
        var PeopleBodypt3 = new SuperMap.Geometry.Point((polygoncenter.x+Peopledis),(polygoncenter.y - Peopledis));
        var temppt;

        // if(isright == true)
        // {
        //     sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((Peopledis*0.85),ptEnd,ptStart);
        //     PeopleBodypt1 = sidepoint.pntRight;
        //     temppt = sidepoint.pntLeft;
        //
        //     //计算两个底端点
        //     sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(Peopledis,PeopleBodypt1,temppt);
        //     PeopleBodypt2 = sidepoint.pntRight;
        //     PeopleBodypt3 = sidepoint.pntLeft;
        // }
        // else
        // {
        //     sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((Peopledis*0.85),ptEnd,ptStart);
        //     PeopleBodypt1 = sidepoint.pntLeft;
        //     temppt = sidepoint.pntRight;
        //
        //     //计算两个底端点
        //     sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(Peopledis,PeopleBodypt1,temppt);
        //     PeopleBodypt2 = sidepoint.pntLeft;
        //     PeopleBodypt3 = sidepoint.pntRight;
        // }

        cellpts = [];
        cellpts.push(PeopleBodypt1);
        cellpts.push(PeopleBodypt2);
        cellpts.push(PeopleBodypt3);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, cellpts,{fillLimit:true,fillStyle:0});

        //添加小人的两条腿
        var PeopleLegLeftStart = new SuperMap.Geometry.Point((polygoncenter.x-0.5*Peopledis),(polygoncenter.y - Peopledis));
        var PeopleLegLeftEnd = new SuperMap.Geometry.Point(PeopleBodypt2.x,(PeopleBodypt2.y - PeopleHeadRadius*2));
        var PeopleLegRightStart = new SuperMap.Geometry.Point((polygoncenter.x+0.5*Peopledis),(polygoncenter.y - Peopledis));
        var PeopleLegRightEnd = new SuperMap.Geometry.Point(PeopleBodypt3.x,(PeopleBodypt3.y - PeopleHeadRadius*2));

        // //计算两个底端点
        // sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((PeopleHeadRadius*2),PeopleBodypt2,PeopleBodypt3);
        // PeopleLegRightEnd = sidepoint.pntRight;
        // //计算两个底端点
        // sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((PeopleHeadRadius*2),PeopleBodypt3,PeopleBodypt2);
        // PeopleLegLeftEnd = sidepoint.pntLeft;
        //
        // //计算交点
        // var interlines = SuperMap.Plot.PlottingUtil.intersectLines(PeopleBodypt1,PeopleLegLeftEnd,PeopleBodypt3,PeopleBodypt2);
        // if(!interlines.isIntersectLines)
        //     return;
        // PeopleLegLeftStart = interlines.intersectPoint;
        //
        // interlines = SuperMap.Plot.PlottingUtil.intersectLines(PeopleBodypt1,PeopleLegRightEnd,PeopleBodypt3,PeopleBodypt2);
        // if(!interlines.isIntersectLines)
        //     return;
        // PeopleLegRightStart = interlines.intersectPoint;

        //添加一个折线
        //添加小人腿的图元，用的是折线
        cellpts = [];
        cellpts.push(PeopleLegLeftStart);
        cellpts.push(PeopleLegLeftEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);

        cellpts = [];
        cellpts.push(PeopleLegRightStart);
        cellpts.push(PeopleLegRightEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol42700"
});

