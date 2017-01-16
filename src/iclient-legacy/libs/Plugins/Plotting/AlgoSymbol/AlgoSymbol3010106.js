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
SuperMap.Geometry.AlgoSymbol3010106 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 1000;

        //两个小圆的间隔距离与定位点折线的长度的比值
        this.scaleValues.push(0.3);
        //比例点所在的方向，1表示在左边，0表示在右
        this.scaleValues.push(0.6);
        this.scaleValues.push(0.05);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if (this.controlPoints < 2) {
            return;
        }

        if (this.scaleValues.length !== 3) {
            this.scaleValues = [];
            this.scaleValues.push(0.3);
            this.scaleValues.push(0.6);
            this.scaleValues.push(0.05);
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);
        var linePts = [];
        //添加起点
        linePts.push(shapePts[shapePts.length - 1]);
        var dAlldistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var firstDistance = dAlldistance * this.scaleValues[0];
        var firstResult = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, firstDistance);
        if (firstResult.index === -1) {
            return;
        }
        var firstpt = firstResult.pt;
        var firstIndex = firstResult.index;

        if(!this.isEdit){
            this.scaleValues[2] = this.getSubSymbolScaleValue()*0.8;
        }

        var lineLength = dAlldistance * this.scaleValues[2] * 0.5;

        var angle = SuperMap.Plot.PlottingUtil.radian(firstpt, shapePts[firstIndex + 1]) * this.RTOD;

        var pt = SuperMap.Plot.PlottingUtil.circlePoint(firstpt, lineLength, lineLength, angle + 90);
        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(firstpt, lineLength, lineLength, angle - 90);

        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, firstpt, pt);
        var sidepoint1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, firstpt, pt1);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidepoint.pntLeft, sidepoint.pntRight]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidepoint1.pntLeft, sidepoint1.pntRight]);


        //第二段
        var secondDistance = dAlldistance * this.scaleValues[1] ;
        var secondResult = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, secondDistance);
        if (secondResult.index === -1) {
            return;
        }
        var secondpt = secondResult.pt;
        var secondIndex = secondResult.index;

        var angle1 = SuperMap.Plot.PlottingUtil.radian(secondpt, shapePts[secondIndex + 1]) * this.RTOD;

        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(secondpt, lineLength, lineLength, angle1 + 90);
        var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(secondpt, lineLength, lineLength, angle1 - 90);

        var sidepoint2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, secondpt, pt2);
        var sidepoint3 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, secondpt, pt3);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidepoint2.pntLeft, sidepoint2.pntRight]);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [sidepoint3.pntLeft, sidepoint3.pntRight])

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //添加箭头
        this.addArrow(shapePts);
        if (this.isEdit) {
            this.addScalePoint(pt3, 0);
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
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if (0 != index) {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length) {
                return;
            }

            //创建贝塞尔曲线
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);
            var dAllLength = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            //添加第一个圆图元
            //第1个比例值，表示两个圆间的距离
            var firstScaleValue = this.scaleValues[1];


            //添加第二个圆图元
            var dSecondCircle = dAllLength * (0.5 + firstScaleValue * 0.5);
            var objSecond = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dSecondCircle, shapePts);
            if (!objSecond.bfind) {
                return;
            }
            var resultSecond = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(1.0, shapePts[objSecond.index], objSecond.pts);

            var bRight = SuperMap.Plot.PlottingUtil.PointIsRightToLine(shapePts[objSecond.index], shapePts[objSecond.index + 1], pt);
            if (bRight) {
                this.scaleValues[2] = 0.0;
            }
            else {
                this.scaleValues[2] = 1.0;
            }
            //计算比例点在垂线上的垂足
            var footPt;
            footPt = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, new SuperMap.Geometry.Point(resultSecond.pntLeft.x, resultSecond.pntLeft.y), new SuperMap.Geometry.Point(resultSecond.pntRight.x, resultSecond.pntRight.y));
            var dRadius = SuperMap.Plot.PlottingUtil.distance(footPt.projectPoint, new SuperMap.Geometry.Point(objSecond.pts.x, objSecond.pts.y));

            this.scaleValues[2] = dRadius / dAllLength;

        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol3010106"
});
