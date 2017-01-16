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
SuperMap.Geometry.AlgoSymbol21500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        this.scaleValues.push(0.02);
        this.scaleValues.push(0.1);
        this.scaleValues.push(0);
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
            this.scaleValues.push(0.02);
            this.scaleValues.push(0.1);
            this.scaleValues.push(0);
        }


        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);
        //箭头相关
        var scale = this.getSubSymbolScaleValue() * 0.5;
        var dArrowDistance = scale * SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptEnd = geoPts[geoPts.length - 1];
        var dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[shapePts.length - 1]);
        while (dis < 1.5 * dArrowDistance) {
            shapePts.pop();
            dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[shapePts.length - 1]);
        }

        shapePts.push(ptEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //计算折线图元的点
        //获取贝赛尔曲线的拟合点
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        if (allDistance === 0.0) {
            return;
        }

        //第0个比例值是曲线上小线段的长度/各定位点间折线总长
        if (!this.isEdit) {
            this.scaleValues[0] = this.getSubSymbolScaleValue() * 0.5;
        }
        var firstScaleValue = this.scaleValues[0];

        //计算位置点折线段总长
        var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        //折线段长度
        var lineLength = firstScaleValue * allPolyLineDistance;

        //第1个比例值是两大折线段之间的距离／各定位点间折线总长
        var secondScaleValue = this.scaleValues[1];

        //两大折线段之间的距离
        var dLineDistance = secondScaleValue * allPolyLineDistance;
        var firstLineDistance = 0.0, secondLineDistance = 0.0;     //第一条折线和第二条折线距离起点的距离
        //起始段长度
        var dStartLength = 0.01 * allPolyLineDistance;

        for (var d = 0.0; d <= allDistance; d += dLineDistance) {
            //计算曲线上小线段的长度
            firstLineDistance = d + dStartLength;
            var result = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(firstLineDistance, shapePts);

            if (!result.bfind) {
                continue;
            }

            //折线段的几何点数组
            var linePts = [];

            //根据平面类型来取出二维点
            var sidePointObj = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, shapePts[result.index], result.pts);

            //添加折线的两个点
            linePts.push(new SuperMap.Geometry.Point(sidePointObj.pntLeft.x, sidePointObj.pntLeft.y));
            linePts.push(new SuperMap.Geometry.Point(sidePointObj.pntRight.x, sidePointObj.pntRight.y));

            //获取第二个比例值，用于控制比例点在曲线的左边还是右边

            var thirdScaleValue = this.scaleValues[2];
            if (SuperMap.Plot.PlottingUtil.equalFuzzy(0.0, d)) {
                //添加第一个比例点
                if (SuperMap.Plot.PlottingUtil.equalFuzzy(thirdScaleValue, 0.0)) {
                    var scalePoint = linePts[0];
                    scalePoint.isScalePoint = true;
                    scalePoint.tag = 0;
                    this.scalePoints.push(scalePoint);
                }
                else if (SuperMap.Plot.PlottingUtil.equalFuzzy(thirdScaleValue, 1.0)) {
                    var scalePoint = linePts[1];
                    scalePoint.isScalePoint = true;
                    scalePoint.tag = 0;
                    this.scalePoints.push(scalePoint);
                }

            }
            else if (SuperMap.Plot.PlottingUtil.equalFuzzy(dLineDistance, d)) {
                //添加第二个比例点
                var scalePoint = new SuperMap.Geometry.Point(result.pts.x, result.pts.y);
                scalePoint.isScalePoint = true;
                scalePoint.tag = 1;
                this.scalePoints.push(scalePoint);
            }

            //创建折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts);
        }

        //添加箭头
        this.addArrow(shapePts);

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

            if (0 !== index && 1 !== index) {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length) {
                return;
            }
            //创建贝塞尔曲线
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);

            if (0 === index) {//修改第0个比例点
                //第0个比例值是曲线上小线段的长度/各定位点间折线总长
                var firstScaleValue = this.scaleValues[0];

                //计算位置点折线段总长
                var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

                //折线段长度
                var lineLength = firstScaleValue * allPolyLineDistance;

                //起始段长度
                var dStartLength = 0.01 * allPolyLineDistance;

                var result = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dStartLength, shapePts);
                if (!result.bfind) {
                    return;
                }

                //折线段的终点
                var firstLinePt;

                //根据平面类型来取出二维点

                var segmentObj = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, shapePts[result.index], result.pts);
                firstLinePt = segmentObj.pntLeft;

                //求此点到图元几何点线段的垂足
                //垂足点
                var footPt = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, firstLinePt, result.pts);

                var dLineDistance = SuperMap.Plot.PlottingUtil.distance(footPt.projectPoint, result.pts);

                //更新第三个比例值
                var v1 = new SuperMap.Geometry.Point(firstLinePt.x - result.pts.x, firstLinePt.y - result.pts.y);
                var v2 = new SuperMap.Geometry.Point(footPt.projectPoint.x - result.pts.x, footPt.projectPoint.y - result.pts.y);

                if (v1.x * v2.x + v1.y * v2.y >= 0) {
                    //如果点乘大于或者等于0，则说明在同向
                    this.scaleValues[2] = 0.0;
                }
                else {
                    //如果小于0，说明在反向
                    this.scaleValues[2] = 1.0;
                }

                //更新第0个比例值
                this.scaleValues[0] = dLineDistance / allPolyLineDistance;
            }
            else if (1 === index)        //修改第1个比例点
            {
                var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
                var nindex = -1;

                //计算位置点折线段总长
                var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

                var footPt;//垂足点
                for (var i = 0; i < (shapePts.length - 1); i++) {
                    var pt;//垂足点
                    var segmentObj = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, shapePts[i], shapePts[i + 1]);
                    if (segmentObj.isOnline)//垂足在线上
                    {
                        footPt = segmentObj.projectPoint;
                        nindex = i;
                        break;
                    }
                }

                if (-1 === nindex) {
                    return;
                }

                var pts = [];
                pts.push(footPt);
                for (var i = 0; i < nindex + 1; i++) {
                    pts.push(shapePts[i].clone());
                }
                pts.push(footPt);
                var dLineLength = SuperMap.Plot.PlottingUtil.polylineDistance(pts);
                //更新第1个比例值
                this.scaleValues[1] = dLineLength / allPolyLineDistance * 0.5;
            }

        }

        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol21500"
});
