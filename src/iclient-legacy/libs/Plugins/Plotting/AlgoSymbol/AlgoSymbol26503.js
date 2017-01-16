/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26503 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol22000, {

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
        this.maxEditPts = 99999;

        this.scaleValues = [];
        this.scaleValues.push(0.05);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if (this.scaleValues.length < 1) {
            this.scaleValues = [];
            this.scaleValues.push(0.05);
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts) {
            return;
        }

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //清理重复的点
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算圆心点在位置点数组上的位置
        //获取第0个比例值，第0个比例值是线上圆圆心到第一位置点间的距离/折线总长
        //MGdouble firstScaleValue = m_geoAttr.GetScaleValue(0);
        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = allDistance * 0.5;

        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dCircleToFirstPt);
        var circlePtIndex = result.index;
        var circlePt = result.pt;
        if (circlePtIndex < 0) {
            return;
        }

        var firstPts = [];//圆前面的整体折线
        for (var i = 0; i < circlePtIndex + 1; i++) {
            firstPts.push(shapePts[i]);
        }

        var firstDistance = SuperMap.Plot.PlottingUtil.polylineDistance(firstPts);//计算第一段折线段之前的距离
        var dDelta = dCircleToFirstPt - firstDistance;

        if (!this.isEdit) {
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var secScaleValue = this.scaleValues[0];
        //计算线上圆的半径
        var dRadius = allDistance * secScaleValue;

        var firstEndPt, secStartPt;
        if (dDelta >= dRadius)//圆心到前面那个点的距离大于半径
        {
            //计算第一条折线的终点
            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex], dRadius);
            firstPts.push(firstEndPt);

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            //计算第二条折线的起点
            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex + 1], dRadius);
            var secondPts = [];
            secondPts.push(secStartPt);
            for (var i = (circlePtIndex + 1); i < shapePts.length; ++i) {
                secondPts.push(shapePts[i]);
            }

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }
        else {
            var pos = -1;
            for (var i = (firstPts.length - 1); i >= 0; i--)//找到第一个在圆外面的点
            {
                var tempPt1 = firstPts[i];
                var tempPt2 = circlePt;
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2);

                if (dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos = i;
                    break;
                }
            }

            if (pos != -1) {
                firstPts.splice((pos + 1), (firstPts.length - 1 - pos));
                //计算第一条折线的终点
                firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos], dRadius);
                firstPts.push(firstEndPt);
            }
            else
                return;

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            var pos2 = -1;
            for (var i = circlePtIndex; i < shapePts.length; i++)//找到第一个在圆外面的点
            {
                var tempPt1 = shapePts[i];
                var tempPt2 = circlePt;
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2);

                if (dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos2 = i;
                    break;
                }
            }

            var secondPts = [];
            if (pos2 != -1) {
                //计算第二条折线的起点
                secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos2], dRadius);

                secondPts.push(secStartPt);
                for (var i = (pos2 + 1); i < shapePts.length; ++i) {
                    secondPts.push(shapePts[i]);
                }
            }
            else
                return;

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }

        var dangle = SuperMap.Plot.PlottingUtil.radian(firstEndPt, secStartPt) * 180 / Math.PI;
        var symbolPt = new SuperMap.Geometry.Point((firstEndPt.x + secStartPt.x) / 2, (firstEndPt.y + secStartPt.y) / 2);

        //计算子标号start
        //创建箭头和弧线
        var  dArcRadius = dRadius*0.5;
        var ptiadd1 = new SuperMap.Geometry.Point(firstEndPt.x,firstEndPt.y);
        var ptidec1 = new SuperMap.Geometry.Point(secStartPt.x,secStartPt.y);

        var dsubdis = SuperMap.Plot.PlottingUtil.distance(ptiadd1,ptidec1);
        var dspacedis = dsubdis * 0.2;

        var ptStart = SuperMap.Plot.PlottingUtil.LinePnt(ptiadd1,ptidec1,dspacedis);
        var ptEnd = SuperMap.Plot.PlottingUtil.LinePnt(ptidec1,ptiadd1,dspacedis);

        var dTrangle = dsubdis*0.5;
        var ptTrangle = SuperMap.Plot.PlottingUtil.LinePnt(ptiadd1,ptidec1,dTrangle);


        var ptArcCenter = new SuperMap.Geometry.Point((ptStart.x + ptTrangle.x)/2,(ptStart.y + ptTrangle.y)/2);
        var result = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArcRadius,ptEnd,ptArcCenter);
        var ptArcLeft = result.pntLeft;
        var ptArcRight = result.pntRight;

        var ArcPts = [];
        ArcPts.push(ptArcRight);
        ArcPts.push(ptStart);
        ArcPts.push(ptArcLeft);

        //生成弧线图元
        this.addCell(SuperMap.Plot.SymbolType.ARCSYMBOL, ArcPts, null, true);

        var dArrowTail = dsubdis*0.1;

        var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArrowTail,ptStart,ptTrangle);
        var ptTrangleLeft = result1.pntLeft;
        var ptTrangleRight = result1.pntRight;

        var ptsTrangle = [];
        ptsTrangle.push(ptStart);
        ptsTrangle.push(ptTrangleLeft);
        ptsTrangle.push(ptTrangleRight);

        //生成三角形
        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, ptsTrangle, style, true);

        var ptsPoly = [];
        ptsPoly.push(ptTrangle);
        ptsPoly.push(ptEnd);

        //画箭尾
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsPoly, null, true);
        //计算子标号end

        //圆上点角度
        var threeScaleValus = 0;

        var circlePt2D = circlePt;

        var onCirclePt2D = SuperMap.Plot.PlottingUtil.circlePoint(circlePt2D, allDistance * secScaleValue, allDistance * secScaleValue, threeScaleValus);

        //添加两端的折线
        var ptStart1 = shapePts[0];
        var ptStart2 = shapePts[1];

        var ptEnd1 = shapePts[(shapePts.length - 2)];
        var ptEnd2 = shapePts[(shapePts.length - 1)];

        var dlen = dRadius * 0.5;
        var leftAndRightPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen, ptStart2, ptStart1);
        var leftAndRightPt2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen, ptEnd1, ptEnd2);
        var ptStartLeft = leftAndRightPt1.pntLeft;
        var ptEndLeft = leftAndRightPt2.pntLeft;

        var pPoly1Pts = [];
        pPoly1Pts.push(ptStart1);
        pPoly1Pts.push(ptStartLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pPoly1Pts);

        var pPoly2Pts = [];
        pPoly2Pts.push(ptEnd2);
        pPoly2Pts.push(ptEndLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pPoly2Pts);

        //添加比例点
        this.addScalePoint(onCirclePt2D);

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol26503"
});