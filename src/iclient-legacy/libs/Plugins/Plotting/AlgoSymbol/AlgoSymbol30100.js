/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 30;

        this.scaleValues = [];
        this.scaleValues.push(0.5);		//从第一定位点到线上箭头的曲线距离/曲线总长
        this.scaleValues.push(Math.PI / 2.0);	//箭头线段与它在曲线上基底位置的切线组成的夹角（弧度）
        this.scaleValues.push(0.069485);
        this.scaleValues.push(0.15);
        this.scaleValues.push(0.1);
        this.scaleValues.push(1.731025);
        this.scaleValues.push(2.076877);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if (this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        if (!this.isEdit) {
            this.scaleValues[2] = this.getSubSymbolScaleValue();
        }

        //求开始点到中点的距离
        var dArrowdis = allDistance * this.scaleValues[0];//箭头的位置距离
        var scaleAngle = this.scaleValues[1] * this.RTOD;//箭头的角度
        var distance = allDistance * this.scaleValues[2];//半径大小

        //获取折线的中心点
        var centerPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dArrowdis);
        if (centerPt.index === -1) {
            return;
        }
        var center = centerPt.pt;
        var nIndex = centerPt.index;

        var center2D = new SuperMap.Geometry.Point(center.x, center.y);
        var ptStart = new SuperMap.Geometry.Point(shapePts[nIndex].x, shapePts[nIndex].y);
        var ptEnd = new SuperMap.Geometry.Point(shapePts[nIndex + 1].x, shapePts[nIndex + 1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd) * this.RTOD;

        var pt = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance * 1.5, distance * 1.5, angle + scaleAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [center, pt]);

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, pt) * this.RTOD;

        //箭头三角形
        var pt1 = new SuperMap.Geometry.Point(-0.2 * distance, 0.05 * distance);
        var pt2 = new SuperMap.Geometry.Point(-0.2 * distance, -0.05 * distance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt1, tempAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt2, tempAngle);
        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt, tempPt1, tempPt2], style);

        //箭头的0.4
        var ptCenter = new SuperMap.Geometry.Point(0.6 * distance, 0);
        var tempPtCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, ptCenter, tempAngle);

        var dScale5 = this.scaleValues[5];
        var distance5 = 0.4 * distance * dScale5;

        var dScale6 = this.scaleValues[6];
        var distance6 = 0.4 * distance * dScale6;

        var pt3 = new SuperMap.Geometry.Point(0, -0.9 * (distance5 - 0.25 * distance6));
        var pt4 = new SuperMap.Geometry.Point(0, 0.9 * (distance5 - 0.25 * distance6));

        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, pt3, tempAngle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, pt4, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt3, tempPt4]);

        //左边子符号
        var ptLeft = new SuperMap.Geometry.Point(0, distance5);
        var tempPtLeft = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, ptLeft, tempAngle);


        var pt5 = new SuperMap.Geometry.Point(0, 0.25 * distance6);
        var pt6 = new SuperMap.Geometry.Point(0.5 * distance6, 0);
        var pt7 = new SuperMap.Geometry.Point(0, -0.25 * distance6);
        var pt8 = new SuperMap.Geometry.Point(-0.5 * distance6, 0);

        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt5, tempAngle);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt6, tempAngle);
        var tempPt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt7, tempAngle);
        var tempPt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtLeft, pt8, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPt5, tempPt6, tempPt7, tempPt8, tempPt5]);

        //右菱形
        var ptRight = new SuperMap.Geometry.Point(0, -distance5);
        var tempPtRight = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, ptRight, tempAngle);


        var tempPtR1 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt5, tempAngle);
        var tempPtR2 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt6, tempAngle);
        var tempPtR3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt7, tempAngle);
        var tempPtR4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtRight, pt8, tempAngle);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [tempPtR1, tempPtR2, tempPtR3, tempPtR4, tempPtR1]);

        //添加比例点
        if (this.isEdit) {
           this.addScalePoint(center,0);
           this.addScalePoint(pt,1);
            var pt9 = new SuperMap.Geometry.Point(0,-distance5);
            var tempPt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter,pt9,tempAngle);
            this.addScalePoint(tempPt9,2);
            this.addScalePoint(tempPt8,3);
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
        if(true === pt.isScalePoint){
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

            var allDistance = 0;
            for (var i = 0; i < geoPts.length - 1; i++) {
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
            }
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

            if (index === 0) {

                var pts = [];
                for (var i = 0; i < shapePts.length; i++) {
                    pts.push(new SuperMap.Geometry.Point(shapePts[i].x, shapePts[i].y));
                }

                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0, 0.0);

                for (var i = 0; i < pts.length - 1; i++) {
                    var tempPts = [];
                    tempPts.push(pts[i]);
                    tempPts.push(pts[i + 1]);

                    //垂足
                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, pts[i], pts[i + 1]);

                    var resultPt = SuperMap.Plot.PlottingUtil.projectPtOnPolyLine(plumbPt, tempPts);
                    if (resultPt.index === -1) {
                        continue;
                    }

                    var tempDistance = SuperMap.Plot.PlottingUtil.distance(pt, plumbPt);

                    if (-1 == nCircleIndex) {
                        nCircleIndex = i;
                        circleCenterPt = plumbPt;
                        dDitanceCtoP = tempDistance;
                    }
                    else {
                        if (dDitanceCtoP > tempDistance) {
                            nCircleIndex = i;
                            circleCenterPt = plumbPt;
                            dDitanceCtoP = tempDistance;
                        }
                    }
                }

                if (-1 == nCircleIndex || nCircleIndex > pts.length - 1) {
                    return;
                }
                var distance = 0.0;
                //计算圆心到起始点的距离
                for (var i = 0; i < nCircleIndex; i++) {
                    var pt1 = new SuperMap.Geometry.Point(shapePts[i].x, shapePts[i].y);
                    var pt2 = new SuperMap.Geometry.Point(shapePts[i + 1].x, shapePts[i + 1].y);
                    distance += SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
                }

                var tempPt = new SuperMap.Geometry.Point(shapePts[nCircleIndex].x, shapePts[nCircleIndex].y);
                distance += SuperMap.Plot.PlottingUtil.distance(tempPt, circleCenterPt);

                if (distance < 0 || distance > allDistance) {
                    return;
                }

                var dScaleValue = distance / allDistance;
                this.scaleValues[0] = dScaleValue;
            }

            if (index === 1) {
                var dDistance = allDistance * this.scaleValues[0];
                //箭头直线
                var centerPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dDistance);
                if (centerPt.index === -1) {
                    return;
                }
                var center = centerPt.pt;
                //中心点的开始
                var center2D = new SuperMap.Geometry.Point(center.x, center.y);
                var ptStart = new SuperMap.Geometry.Point(shapePts[centerPt.index].x, shapePts[centerPt.index].y);
                var ptEnd = new SuperMap.Geometry.Point(shapePts[centerPt.index + 1].x, shapePts[centerPt.index + 1].y);
                var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd);
                var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, pt);

                var dScale1 = tempAngle - angle;
                this.scaleValues[1] = dScale1;

                var distance = SuperMap.Plot.PlottingUtil.distance(center, pt);
                var dScale2 = distance / allDistance;
                this.scaleValues[2] = dScale2;
            }
            else if (index === 2) {

                var ddis = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[0]);
                var dscale = ddis/allDistance;
                this.scaleValues[5] = dscale * 2;
            }
            else if (index === 3) {

                var dDistance = allDistance * this.scaleValues[0];
                var scaleAngle = this.scaleValues[0] * 180 / Math.PI;
                var distance = allDistance * this.scaleValues[2];

                //箭头直线
                //箭头直线
                var center = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dDistance);
                if (center.index === -1) {
                    return;
                }
                var center2D = new SuperMap.Geometry.Point(center.pt.x, center.pt.y);
                var ptStart = new SuperMap.Geometry.Point(shapePts[center.index].x, shapePts[center.index].y);
                var ptEnd = new SuperMap.Geometry.Point(shapePts[center.index + 1].x, shapePts[center.index + 1].y);
                var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd) * 180 / Math.PI;

                var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(center2D, distance, distance, angle + scaleAngle);
                var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, pt2) * 180 / Math.PI;
                //箭头的0.4
                var ptCenter = new SuperMap.Geometry.Point(0.6 * distance, 0);
                var tempPtCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, ptCenter, tempAngle);
                var distance5 = 0.4 * distance * this.scaleValues[5];
                //左菱形
                var ptLeft = new SuperMap.Geometry.Point(0, distance5);
                var tempPtLeft = SuperMap.Plot.PlottingUtil.coordinateTrans(tempPtCenter, ptLeft, tempAngle);

                var dis = SuperMap.Plot.PlottingUtil.distance(tempPtLeft, pt);
                var dScale6 = 2 * dis / (0.4 * distance);

                this.scaleValues[6] = dScale6 / 2;
            }

        }

        this.calculateParts();
    },
    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30100"
});
