/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol12502 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol12500, {

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
        this.scaleValues.push(0.5);
        this.scaleValues.push(0.03);

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
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (this.scaleValues.length == 0) {
            this.scaleValues.push(0.5);
            this.scaleValues.push(0.03);
        }

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        var scaleLine = this.scaleValues[0];
        if (!this.isEdit) {
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }
        //半径长度
        var dRadius = this.scaleValues[1] * allDistance;
        //开始点到中点的距离
        var startToCenterDistance = scaleLine * allDistance;
        //获取圆心的坐标和线段的索引
        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(geoPts, startToCenterDistance);
        if (-1 === result.index) {
            return;
        }
        var circleCenterPt = result.pt;

        var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [circleCenterPt, new SuperMap.Geometry.Point(circleCenterPt.x + dRadius, circleCenterPt.y)]);
        //获取圆的拟合点
        var circlePts = SuperMap.Geometry.Primitives.getSpatialData(geometry);

        for (var i = 0; i < geoPts.length - 1; i++) {
            var pt0 = geoPts[i];
            var pt1 = geoPts[i + 1];
            //判断折线与圆的关系
            var pt0Dis = SuperMap.Plot.PlottingUtil.distance(circleCenterPt, pt0);
            var pt1Dis = SuperMap.Plot.PlottingUtil.distance(circleCenterPt, pt1);
            if (pt0Dis < dRadius && pt1Dis < dRadius) {//两个点都在圆内
                continue;
            }
            else if ((pt0Dis > dRadius && pt1Dis < dRadius) || (pt0Dis < dRadius && pt1Dis > dRadius)) {//一个点在圆内，一个点在圆外
                //在圆外的点
                var outPt;
                if (pt0Dis > dRadius) {
                    outPt = pt0;
                }
                else {
                    outPt = pt1;
                }

                var intersectPts = this.getLineAddCircleIntersectPts(pt0, pt1, circlePts);

                if (intersectPts.length > 0) {
                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [intersectPts[0], outPt]);
                }
            }
            else {//两个都在圆外
                //求垂足
                var projectPt = SuperMap.Plot.PlottingUtil.projectPoint(circleCenterPt, pt0, pt1);
                //求圆心到直线的距离
                var dis = SuperMap.Plot.PlottingUtil.distance(circleCenterPt, projectPt);

                //距离小于半径
                if (dis >= dRadius) {
                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt0, pt1]);
                }
                else {
                    //垂足不折线段上
                    if (!SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(projectPt, pt0, pt1)) {
                        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [pt0, pt1]);
                    }
                    else {
                        var intersectPts = this.getLineAddCircleIntersectPts(pt0, pt1, circlePts);

                        if (intersectPts.length > 0) {
                            intersectPts.unshift(pt0);
                            intersectPts.push(pt1);

                            for (var m = 0; m < intersectPts.length - 1; m++) {
                                if (!this.isLineInCircle(intersectPts[m], intersectPts[m + 1], circleCenterPt, dRadius)) {
                                    this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [intersectPts[m], intersectPts[m + 1]]);
                                }
                            }
                        }
                    }
                }
            }
        }

        //添加箭头
        var arrpts = [];
        var pt1 = new SuperMap.Geometry.Point(circleCenterPt.x - dRadius, circleCenterPt.y);
        var pt2 = new SuperMap.Geometry.Point(circleCenterPt.x + dRadius * 0.5, circleCenterPt.y);
        arrpts.push(pt1, pt2);
        //计算箭身拟合点
        var bodyResult = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePtsBySingleLine(arrpts, 0.1, SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_POLYLINE);

        var lastPts = [];
        lastPts.push(bodyResult.arrowBodyPts[bodyResult.arrowBodyPts.length - 1]);
        lastPts.push(bodyResult.arrowBodyPts[bodyResult.arrowBodyPts.length - 2]);

        //获取箭头的大小比值
        var headPts = SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePtsBySingleLine(arrpts, lastPts, 0.2, bodyResult.arrowHeadLen, SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_TRIANGLE_SOLID);

        //创建箭身
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arrpts);

        //创建箭头
        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, headPts, style);


        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [circleCenterPt, new SuperMap.Geometry.Point(circleCenterPt.x + dRadius, circleCenterPt.y)]);


        //第一个比例点
        if(this.isEdit){
            this.addScalePoint(circleCenterPt,0);
            this.addScalePoint(new SuperMap.Geometry.Point(circleCenterPt.x + dRadius, circleCenterPt.y),1);
        }
        this.clearBounds();
    },

    isLineInCircle: function (pStart, pEnd, pCenter, dRadius) {
        //获取线的中点
        var pCenterPoint = new SuperMap.Geometry.Point((pStart.x + pEnd.x) / 2, (pStart.y + pEnd.y) / 2);
        //获取中点到圆心的距离
        var dis = SuperMap.Plot.PlottingUtil.distance(pCenterPoint, pCenter);
        //小于半径的情况下
        if (dRadius > dis) {
            return true;
        } else {
            return false;
        }
    },

    getLineAddCircleIntersectPts: function (pt0, pt1, circlePts) {
        var intersectPts = [];

        for (var m = 0; m < circlePts.length - 1; m++) {
            var circlePt1 = circlePts[m];
            var circlePt2 = circlePts[m + 1];

            //求交点
            var intersectReuslt = SuperMap.Plot.PlottingUtil.intersectLines(pt0, pt1, circlePt1, circlePt2);
            if (intersectReuslt.isIntersectLines) {
                if (SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(intersectReuslt.intersectPoint, pt0, pt1) &&
                    SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(intersectReuslt.intersectPoint, circlePt1, circlePt2)) {
                    intersectPts.push(intersectReuslt.intersectPoint);
                }
            }
        }

        for (var k = 0; k < intersectPts.length - 1; k++) {
            if (SuperMap.Plot.PlottingUtil.isSamePt(intersectPts[k], intersectPts[k + 1])) {
                intersectPts.splice(k, 1);
                k--;
            }
        }

        //排序
        if (pt0.x > pt1.x) {
            //从大到小排序
            for (var j = 0; j < intersectPts.length; j++) {
                if (j == intersectPts.length - 1) {
                    break;
                }

                if (intersectPts[j].x < intersectPts[j + 1].x) {
                    var temp = intersectPts[j];
                    intersectPts[j] = intersectPts[j + 1];
                    intersectPts[j + 1] = temp;
                }
            }
        }
        else if (pt0.x < pt1.x) {
            //从大到小排序
            for (var j = 0; j < intersectPts.length; j++) {
                if (j == intersectPts.length - 1) {
                    break;
                }

                if (intersectPts[j].x > intersectPts[j + 1].x) {
                    var temp = intersectPts[j];
                    intersectPts[j] = intersectPts[j + 1];
                    intersectPts[j + 1] = temp;
                }
            }
        }
        else {
            if (pt0.y > pt1.y) {
                //从大到小排序
                for (var j = 0; j < intersectPts.length; j++) {
                    if (j == intersectPts.length - 1) {
                        break;
                    }
                    if (intersectPts[j].y < intersectPts[j + 1].y) {
                        var temp = intersectPts[j];
                        intersectPts[j] = intersectPts[j + 1];
                        intersectPts[j + 1] = temp;
                    }
                }
            }
            else if (pt0.y < pt1.y) {
                //从大到小排序
                for (var j = 0; j < intersectPts.length; j++) {
                    if (j == intersectPts.length - 1) {
                        break;
                    }

                    if (intersectPts[j].y > intersectPts[j + 1].y) {
                        var temp = intersectPts[j];
                        intersectPts[j] = intersectPts[j + 1];
                        intersectPts[j + 1] = temp;
                    }
                }
            }
        }

        return intersectPts;
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol12502"
});
