/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol42500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues.push(0.285714);
        this.scaleValues.push(0.285714);
        this.scaleValues.push(0.5);
        this.scaleValues.push(0.333333);
        this.scaleValues.push(0.333333);

        // if(this.subSymbols >= 0){
        //     this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8700));
        // }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        if(geoPts.length < 2){
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues = [];
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.5);
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

        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd)* this.RTOD;

        var tempPts = [];
        tempPts.push(pt7);
        tempPts.push(pt6);
        tempPts.push(pt5);
        tempPts.push(pt4);
        tempPts.push(pt3);
        tempPts.push(pt2);
        tempPts.push(pt1);

        var shapePts = [];
        for(var j = 0; j < tempPts.length; j++){
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPts[j], angle);
            shapePts.push(pt);
        }

        // // 需要颠倒一下顺序，否则会导致衬线绘制不正确
        // var allPts = [];
        // for(var i = shapePts.length - 1; i >= 0; --i){
        //     allPts.push(shapePts[i]);
        // }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //用来标记箭头是不是在小人的右侧
        var isright = true;
        if(ptStart.x > ptEnd.x)
            isright = false;

        //画小人
        //画头部，圆形
        var PeopleHeadCenter;//头部的圆心
        var ptnouse;//头部的圆心
        var  PeopleHeadRadius;//头部半径

        PeopleHeadRadius = (dDistance*0.12)/2;
        var  Peopledis;
        Peopledis = dDistance*0.1;
        var  tempdis = Peopledis + PeopleHeadRadius;

        //获得人头的圆心
        var sidepoint;
        if(isright == true){
            sidepoint  = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(tempdis,ptEnd,ptStart);
            PeopleHeadCenter = sidepoint.pntRight;
            ptnouse = sidepoint.pntLeft;
        }
        else{
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(tempdis,ptEnd,ptStart);
            PeopleHeadCenter = sidepoint.pntLeft;
            ptnouse = sidepoint.pntRight;
        }

        var cellpts = [];
        cellpts.push(PeopleHeadCenter);
        cellpts.push(new SuperMap.Geometry.Point(PeopleHeadCenter.x+PeopleHeadRadius,PeopleHeadCenter.y));
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, cellpts);

        //画小人的身体
        //用任意多边形
        var PeopleBodypt1;
        var PeopleBodypt2;
        var PeopleBodypt3;
        var temppt;

        if(isright == true)
        {
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((Peopledis*0.85),ptEnd,ptStart);
            PeopleBodypt1 = sidepoint.pntRight;
            temppt = sidepoint.pntLeft;

            //计算两个底端点
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(Peopledis,PeopleBodypt1,temppt);
            PeopleBodypt2 = sidepoint.pntRight;
            PeopleBodypt3 = sidepoint.pntLeft;
        }
        else
        {
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((Peopledis*0.85),ptEnd,ptStart);
            PeopleBodypt1 = sidepoint.pntLeft;
            temppt = sidepoint.pntRight;

            //计算两个底端点
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(Peopledis,PeopleBodypt1,temppt);
            PeopleBodypt2 = sidepoint.pntLeft;
            PeopleBodypt3 = sidepoint.pntRight;
        }

        cellpts = [];
        cellpts.push(PeopleBodypt1);
        cellpts.push(PeopleBodypt2);
        cellpts.push(PeopleBodypt3);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, cellpts,{fillLimit:true,fillStyle:0});

        //添加小人的两条腿
        var PeopleLegLeftStart,PeopleLegLeftEnd;
        var PeopleLegRightStart,PeopleLegRightEnd;

        //计算两个底端点
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((PeopleHeadRadius*2),PeopleBodypt2,PeopleBodypt3);
        PeopleLegRightEnd = sidepoint.pntRight;
        //计算两个底端点
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((PeopleHeadRadius*2),PeopleBodypt3,PeopleBodypt2);
        PeopleLegLeftEnd = sidepoint.pntLeft;

        //计算交点
        var interlines = SuperMap.Plot.PlottingUtil.intersectLines(PeopleBodypt1,PeopleLegLeftEnd,PeopleBodypt3,PeopleBodypt2);
        if(!interlines.isIntersectLines)
            return;
        PeopleLegLeftStart = interlines.intersectPoint;

        interlines = SuperMap.Plot.PlottingUtil.intersectLines(PeopleBodypt1,PeopleLegRightEnd,PeopleBodypt3,PeopleBodypt2);
        if(!interlines.isIntersectLines)
            return;
        PeopleLegRightStart = interlines.intersectPoint;

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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol42500"

});