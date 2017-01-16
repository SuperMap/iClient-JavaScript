/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol38700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues[0] = Math.PI/4;
        this.scaleValues[1] = Math.PI/4;
        this.scaleValues[2] = 0.3;
        this.scaleValues[3] = 0.1;

        if (this.subSymbols.length >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4600));
        }
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

        if(this.scaleValues.length < 4){
            this.scaleValues = [];
            this.scaleValues[0] = Math.PI/4;
            this.scaleValues[1] = Math.PI/4;
            this.scaleValues[2] = 0.3;
            this.scaleValues[3] = 0.1;
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var pt1 = geoPts[0];
        var pt2 = geoPts[1];

        var dRadius = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
        var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*this.RTOD;

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];

        var innerAngle = dScale0*this.RTOD;

        //创建里面的圆弧
        var innerStartAngle = dAngle - innerAngle;
        var innerEndAngle   = dAngle + innerAngle;

        var innerArcPts2D = this.GetArcPts(innerStartAngle,innerEndAngle,pt1,dRadius);

        if(2 > innerArcPts2D.length)
        {
            return;
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,innerArcPts2D);

        var dSymbolSize = dRadius * dScale2;
        var dSymbolAngle = dAngle-90;
        var dTempDis = dRadius * dScale3;
        var symbolPt = SuperMap.Plot.PlottingUtil.LinePnt(pt1,pt2,dTempDis);

        //添加子符号
        var symbolCells = null;
        if(this.subSymbols.length > 0){
            symbolCells = this.computeSubSymbol(this.subSymbols[0],symbolPt,dSymbolSize,dSymbolAngle,0.0,-0.5);
            if(symbolCells === null){
                return;
            }
        }

        //里层箭头start
        var dInnerArrowAngle = SuperMap.Plot.PlottingUtil.radian(symbolPt,pt2)*this.RTOD-30.0;
        var dInnerDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,pt2);
        //求箭头的起点
        var nTempIndex = 0;
        var ptInnerStart = geoPts[0].clone();
        var ptInnerEnd   = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dInnerDis,dInnerDis,dInnerArrowAngle);
        for (var i = 0; i < symbolCells.length; i++)
        {
            var tempPt;
            var nIndex = -1;
            if (2 > symbolCells[i].positionPoints)
            {
                continue;
            }
            for (var j = 0; j < symbolCells[i].positionPoints.length -1; j++)
            {
                var tempPt0 = symbolCells[i].positionPoints[j];
                var tempPt1 = symbolCells[i].positionPoints[j+1];
                var ptResult =  new SuperMap.Geometry.Point(0,0);
                if(SuperMap.Plot.PlottingUtil.intersectLineSegs(symbolPt,ptInnerEnd,tempPt0,tempPt1,ptResult))
                {
                    if (0 == nTempIndex)
                    {
                        ptInnerStart = ptResult;
                    }
                    else
                    {
                        if (SuperMap.Plot.PlottingUtil.distance(symbolPt,ptResult) > SuperMap.Plot.PlottingUtil.distance(symbolPt,ptInnerStart))
                        {
                            ptInnerStart = ptResult;
                        }
                    }
                    nTempIndex++;
                }
            }
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,[ptInnerStart,ptInnerEnd]);

        //箭头
        var dInnerArrowHeadAngle = SuperMap.Plot.PlottingUtil.radian(ptInnerEnd,ptInnerStart)*this.RTOD;
        var dInnerArrowDis = SuperMap.Plot.PlottingUtil.distance(ptInnerStart,ptInnerEnd);
        var ptInnerArrow1 = SuperMap.Plot.PlottingUtil.circlePoint(ptInnerEnd,0.1*dInnerArrowDis,0.1*dInnerArrowDis,dInnerArrowHeadAngle-15.0);
        var ptInnerArrow2 = SuperMap.Plot.PlottingUtil.circlePoint(ptInnerEnd,0.1*dInnerArrowDis,0.1*dInnerArrowDis,dInnerArrowHeadAngle+15.0);
        var innerArrowHead = [];
        innerArrowHead.push(ptInnerEnd);
        innerArrowHead.push(ptInnerArrow1);
        innerArrowHead.push(ptInnerArrow2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,innerArrowHead,{fillLimit:true,fillStyle:0});

        //里层箭头end
        //计算比例点
        this.scalePoints = [];
        var scalePt0 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dRadius,dRadius,innerEndAngle);
        this.addScalePoint(scalePt0);

        var scalePt1 = SuperMap.Plot.PlottingUtil.LinePnt(symbolPt,pt2,dRadius*dScale2);
        this.addScalePoint(scalePt1);
        this.addScalePoint(symbolPt);

        if(3 == geoPts.length)
        {
            var pt3 = geoPts[2];
            var dOutRadius = SuperMap.Plot.PlottingUtil.distance(pt1,pt3);
            var outAngle = dScale1*this.RTOD;

            //创建里面的圆弧
            var outStartAngle = dAngle - outAngle;
            var outEndAngle   = dAngle + outAngle;

            var outArcPts2D = this.GetArcPts(outStartAngle,outEndAngle,pt1,dOutRadius);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,outArcPts2D);

            var scalePt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dOutRadius,dOutRadius,outEndAngle);
            this.addScalePoint(scalePt3);

            //外层箭头start
            var ptOutArrowBodyStart = ptInnerEnd;
            var dOutArrowDis = SuperMap.Plot.PlottingUtil.distance(pt1,pt3)-dRadius;
            var ptOutArrowBodyEnd = SuperMap.Plot.PlottingUtil.circlePoint(ptOutArrowBodyStart,dOutArrowDis,dOutArrowDis,dInnerArrowAngle);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,[ptOutArrowBodyStart,ptOutArrowBodyEnd]);

            //箭头
            var ptOutArrowHead1 = SuperMap.Plot.PlottingUtil.circlePoint(ptOutArrowBodyEnd,0.1*dOutArrowDis,0.1*dOutArrowDis,dInnerArrowHeadAngle-15.0);
            var ptOutArrowHead2 = SuperMap.Plot.PlottingUtil.circlePoint(ptOutArrowBodyEnd,0.1*dOutArrowDis,0.1*dOutArrowDis,dInnerArrowHeadAngle+15.0);
            var outArrowHead = [];
            outArrowHead.push(ptOutArrowBodyEnd);
            outArrowHead.push(ptOutArrowHead1);
            outArrowHead.push(ptOutArrowHead2);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,outArrowHead,{fillLimit:true,fillStyle:0});
            //外层箭头end
        }
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
        if (pt.isScalePoint === true) {
            if (index < 0 || index > 3) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            var scalePt2D = pt;

            var pt1 = geoPts[0];
            var pt2 = geoPts[1];

            var dRadius = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
            var dAngle  = SuperMap.Plot.PlottingUtil.radian(pt1,pt2);

            if(0 == index)
            {
                var dScaleAngle0 = SuperMap.Plot.PlottingUtil.radian(pt1,scalePt2D);
                var dScale0 = Math.abs(dScaleAngle0-dAngle);
                this.scaleValues[0] = dScale0;
            }
            else if(1 == index)
            {
                var dTempDis = dRadius * this.scaleValues[3];
                var symbolPt = SuperMap.Plot.PlottingUtil.LinePnt(pt1,pt2,dTempDis);

                var dDis1 = SuperMap.Plot.PlottingUtil.distance(scalePt2D,symbolPt);
                var dScale2 = dDis1/dRadius;

                this.scaleValues[2] = dScale2;
            }
            else if(2 == index)
            {
                var dDis2 = SuperMap.Plot.PlottingUtil.distance(scalePt2D,pt1);
                var dScale3 = dDis2/dRadius;
                if(dScale3 >= 1)
                {
                    return;
                }

                this.scaleValues[3] = dScale3;
            }
            else if(3 == index)
            {
                var dScaleAngle3 = SuperMap.Plot.PlottingUtil.radian(pt1,scalePt2D);
                var dScale1 = Math.abs(dScaleAngle3-dAngle);
                this.scaleValues[1] = dScale1;
            }
        }
        this.calculateParts();
    },

    GetArcPts: function(startAngle,endAngle,circlePt,dRadius){
        var innerArcPts3D = [];
        var i = 0.0;
        for(i = startAngle; i < endAngle; i += 4)
        {
            var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(circlePt,dRadius,dRadius,i);
            innerArcPts3D.push(tempPt2D);
        }

        if(i != endAngle)
        {
            var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(circlePt,dRadius,dRadius,endAngle);
            innerArcPts3D.push(tempPt2D);
        }

        return innerArcPts3D;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol38700"
});

