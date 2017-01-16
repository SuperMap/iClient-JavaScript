/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol12501 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues.push(0.1);
        //高度的缩放比值
        this.scaleValues.push(0.03);
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

        if(!this.isEdit){
            var scale = this.getSubSymbolScaleValue();
            //this.scaleValues[0] = scale;
            //this.scaleValues[1] = scale;
            this.scaleValues[3] = scale;
        }

        //设置缩放点
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        //克隆控制点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        //获取曲线的拟合点
        var curvePts2D = this.GetCurvePts(geoPts, dScale0, dScale1);

        if (0 === curvePts2D.pt.length) {
            return;
        }
        var dAllCurveDistance = 0;
        for (var i = 0; i < curvePts2D.pt.length - 1; i++) {
            dAllCurveDistance += SuperMap.Plot.PlottingUtil.distance(curvePts2D.pt[i], curvePts2D.pt[i + 1]);
        }
        //圆在线上的位置点总长度的一半
        var disCircle = dAllCurveDistance * dScale2;

        //获取圆的点曲线的坐标点
        var circleCenterPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(curvePts2D.pt, disCircle);
        if (-1 === circleCenterPt.index) {
            return;
        }
        //总长度
        var dAllPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var dScale3 = this.scaleValues[3];

        //圆的半径
        var dRadius = dAllPolyLineDistance * dScale3;
        var circlePts = [];
        for (var i = 0.0; i < 360; i += 12.0) {
            circlePts.push(SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt.pt, dRadius, dRadius, i));
        }
        //构成一个闭合的圆（首尾相连）
        circlePts.push(circlePts[0]);
        //添加圆
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, circlePts);

        //曲线
        var arrPts2D = [];
        var tempPts2D = [];
        for (var i = 0; i < curvePts2D.pt.length; i++) {
            if (SuperMap.Plot.PlottingUtil.ptIsInPolygon(circlePts, curvePts2D.pt[i])) {
                if (tempPts2D.length > 1) {
                    arrPts2D.push(tempPts2D);
                    tempPts2D = [];
                }
            } else {

                tempPts2D.push(curvePts2D.pt[i]);
            }

        }

        if (tempPts2D.length > 1) {
            arrPts2D.push(tempPts2D);

        }
        for (var i = 0; i < arrPts2D.length; i++) {
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arrPts2D[i]);
        }
        //添加比例点

        ////调节曲线波长
        var scalePoint = new SuperMap.Geometry.Point(curvePts2D.pt[0].x, curvePts2D.pt[0].y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;
        this.scalePoints.push(scalePoint);

        //调节曲线周期
        var scalePt2 = new SuperMap.Geometry.Point(curvePts2D.scalePt.x, curvePts2D.scalePt.y);
        scalePt2.isScalePoint = true;
        scalePt2.tag = 1;
        this.scalePoints.push(scalePt2);

        //调节圆心
        var scalePoint1 = new SuperMap.Geometry.Point(circleCenterPt.pt.x, circleCenterPt.pt.y);
        scalePoint1.isScalePoint = true;
        scalePoint1.tag = 2;
        this.scalePoints.push(scalePoint1);

        ////调节圆的半径
        var circlPt2D = SuperMap.Plot.PlottingUtil.circlePoint(new SuperMap.Geometry.Point(circleCenterPt.pt.x, circleCenterPt.pt.y), dRadius, dRadius, 0.0);
        var scaleRadius = new SuperMap.Geometry.Point(circlPt2D.x, circlPt2D.y);
        scaleRadius.tag = 3;
        this.scalePoints.push(scaleRadius);

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
        if (null == pt) {
            return;
        }
        if (this.controlPoints.length < this.minEditPts) {
            return;
        }
        if (4 > this.scaleValues.length) {
            return;
        }
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        //定位点连线总长
        var dAllDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            dAllDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);


        var scalePt2D = new SuperMap.Geometry.Point(pt.x, pt.y);
        if (0 === index) {
            var startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            var dDistance = SuperMap.Plot.PlottingUtil.distance(startPt2D, scalePt2D);
            var dScale1 = 2 * dDistance / dAllDistance;
            this.scaleValues[1] = dScale1;
        }
        else if (1 === index) {
            startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            dDistance = SuperMap.Plot.PlottingUtil.distance(startPt2D, scalePt2D);
            var dScale0 = dDistance / dAllDistance;
            this.scaleValues[0] = dScale0;
        }
        //圆心缩放点
        else if (2 == index) {
            var nCircleIndex = -1;
            var dDitanceCtoP = 0.0;
            var circleCenterPt = new SuperMap.Geometry.Point(0.0, 0.0);

            var dScale0 = this.scaleValues[0];
            var dScale1 = this.scaleValues[1];
            var scalePt = [];
            //获取曲线的拟合点
            var curvePts2D = this.GetCurvePts(geoPts, dScale0, dScale1, scalePt);
            if (0 === curvePts2D.pt.length) {
                return;
            }


            for (var i = 0; i < curvePts2D.pt.length - 1; i++) {
                var pt1 = curvePts2D.pt[i];
                var pt2 = curvePts2D.pt[i + 1];
                //求垂足
                var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D, pt1, pt2);

                if (!SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(plumbPt, pt1, pt2)) {
                    continue;
                }

                var tempDistance = SuperMap.Plot.PlottingUtil.distance(scalePt2D, plumbPt);

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

            if (-1 == nCircleIndex || nCircleIndex > curvePts2D.pt.length - 1) {
                return;
            }

            var dAllCurveDistance = SuperMap.Plot.PlottingUtil.polylineDistance(curvePts2D.pt);

            var tempPts2D = [];
            //计算圆心到起始点的距离
            for (var i = 0; i < nCircleIndex; i++) {
                tempPts2D.push(curvePts2D.pt[i]);
            }
            tempPts2D.push(circleCenterPt);

            var distance = SuperMap.Plot.PlottingUtil.polylineDistance(tempPts2D);

            if (distance < 0 || distance > dAllCurveDistance) {
                return;
            }
            var dScale2 = distance / dAllCurveDistance;
            this.scaleValues[2] = dScale2;
        }
        else if (3 === index) {
            var dScale0 = this.scaleValues[0];
            var dScale1 = this.scaleValues[1];
            var dScale2 = this.scaleValues[2];

            var curvePts2D = this.GetCurvePts(geoPts, dScale0, dScale1);

            if (0 == curvePts2D.pt.length) {
                return;
            }
            var dAllCurveDistance = 0;

            for (var i = 0; i < curvePts2D.pt.length - 1; i++) {
                dAllCurveDistance += SuperMap.Plot.PlottingUtil.distance(curvePts2D.pt[i], curvePts2D.pt[i + 1]);
            }
            var disCircle = dAllCurveDistance * dScale2;//中心点

            //获取圆的位置
            var circleCenterPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, disCircle);
            if (-1 === circleCenterPt.index) {
                return;
            }

            var dRadius = SuperMap.Plot.PlottingUtil.distance(circleCenterPt.pt, pt);
            var dScale3 = dRadius / dAllDistance;
            this.scaleValues[3] = dScale3;
        }
        this.calculateParts();
    },

    /**
     * Method: GetCurvePts
     * 获取贝塞尔曲线的点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    GetCurvePts: function (geoPts, dScale0, dScale1) {
        //获取贝塞尔曲线的拟合点
        var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        var shapePts = allPoints;
        //获取贝塞尔曲线的总长度
        var dAllPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        //获取一段周期的长度
        var dCycleDis = dAllPolyLineDistance * dScale0;
        //获取高度
        var dMaxCurveHeight = dAllPolyLineDistance * dScale1 / 2;
        //曲线点数组
        var curvePts2D = [];
        //最后一个周期点
        var lastCyclePts = [];
        //波的开始点
        var startPt = shapePts[0];
        //第二个比例点
        var scalePt2_2D;
        //是否设置缩放
        var bSetScale2 = false;
        var lastStartPt = shapePts[0];
        for (var i = 1; i < shapePts.length; i++) {
            var endPt = shapePts[i];
            //波长的距离
            var dTempDis = SuperMap.Plot.PlottingUtil.distance(startPt, endPt);

            if (dTempDis < dCycleDis && i !== shapePts.length - 1) {
                continue;
            }
            //获取周期的总数量
            var nCount = parseInt(dTempDis / dCycleDis);

            var tempEndPt;
            for (var n = 0; n < nCount; n++) {
                tempEndPt = SuperMap.Plot.PlottingUtil.LinePnt(startPt, endPt, dCycleDis);
                if (!bSetScale2) {
                    scalePt2_2D = tempEndPt;
                    bSetScale2 = true;
                }
                //获取余弦点
                var tempCurvePts2D = this.GetCosPts2D(startPt, tempEndPt, dCycleDis, dMaxCurveHeight);
                if (lastCyclePts.length > 1 && 0 === n) {
                    curvePts2D = this.ClearCurvePts2D(lastStartPt, startPt, endPt, lastCyclePts, tempCurvePts2D, curvePts2D);
                }
                else {
                    curvePts2D = curvePts2D.concat(tempCurvePts2D);
                }

                lastCyclePts = [];
                lastCyclePts = lastCyclePts.concat(tempCurvePts2D);

                lastStartPt = startPt;
                startPt = tempEndPt;
            }

            if (i === shapePts.length - 1) {
                tempEndPt = shapePts[shapePts.length - 1];
                tempCurvePts2D = this.GetCosPts2D(startPt, tempEndPt, dCycleDis, dMaxCurveHeight);

                if (lastCyclePts.length > 1 && tempCurvePts2D.length > 1) {
                    curvePts2D = this.ClearCurvePts2D(lastStartPt, startPt, endPt, lastCyclePts, tempCurvePts2D, curvePts2D);
                }
                else {
                    curvePts2D = curvePts2D.concat(tempCurvePts2D);
                }
            }
        }

        return {pt: curvePts2D, scalePt: scalePt2_2D};
    },


    /*
     获取余弦点坐标
     *
     * */
    GetCosPts2D: function (startPt, endPt, dCycleDis, dMaxCurveHeight) {
        var curvePts2D = [];
        //求开始点到结束点的距离
        var dDis = SuperMap.Plot.PlottingUtil.distance(startPt, endPt);
        //步数
        var dStepDis = dCycleDis / 30;
        for (var m = 0; m < dDis; m += dStepDis) {
            //x坐标点
            var x = m * (2 * Math.PI / dCycleDis);
            var y = dMaxCurveHeight * Math.cos(x);
            var tempPt = new SuperMap.Geometry.Point(m, y);
            //获取开始点到结束点的角度
            var dAngle = SuperMap.Plot.PlottingUtil.radian(startPt, endPt) * 180 / Math.PI;
            var coordPt = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, tempPt, dAngle);
            curvePts2D.push(coordPt);
        }
        return curvePts2D;
    },

    /*
     * 清除拟合点
     *
     * */
    ClearCurvePts2D: function (startPt, midPt, endPt, lastCyclePts, nextCyclePts, curvePts2D) {
        //计算角平分线
        var angle1 = SuperMap.Plot.PlottingUtil.radian(midPt, endPt) * 180 / Math.PI;
        var angle2 = SuperMap.Plot.PlottingUtil.radian(midPt, startPt) * 180 / Math.PI;
        //获取夹角
        var angle = angle2 - angle1;

        while (angle <= 0) {
            angle = angle + 360;
        }

        var dRadians = angle / 2;

        var pnt = endPt;

        pnt = SuperMap.Plot.PlottingUtil.RotateAngle(midPt, dRadians * Math.PI / 180, pnt);

        var temppt = SuperMap.Plot.PlottingUtil.LinePnt(midPt, pnt, 1.0);

        var nIndex = 0;
        for (var i = 0; i < lastCyclePts.length; i++) {
            if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(midPt, temppt, lastCyclePts[i])) {
                nIndex = i;
                break;
            }
        }

        if (0 != nIndex) {
            for (var m = 0; m < lastCyclePts.length - nIndex; m++) {
                curvePts2D.slice(m, curvePts2D.length - 1);
            }
        }
        //下一个圆的位置点
        for (var i = 0; i < nextCyclePts.length; i++) {
            if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(midPt, temppt, nextCyclePts[i])) {
                curvePts2D.push(nextCyclePts[i]);
            }
        }
        return curvePts2D;
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol12501"
});