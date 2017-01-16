/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29903 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.01);

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        if (this.scaleValues.length != 3) {
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.01);
        }

        //设置子标号大小比例值
        if (!this.isEdit) {
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }
        //总长度
        var dAllDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            dAllDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }

        //创建贝塞尔曲线
        var shapePts;
        shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = allDistance * 0.5;

        var ptsIndex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt, shapePts);
        var circlePtIndex = ptsIndex.index;
        var circlePt = ptsIndex.pts;
        if(circlePtIndex < 0){
            return;
        }

        //圆前面的整体折线
        var firstPts = [];
        for(var i = 0; i <= circlePtIndex; i++){
            firstPts.push(shapePts[i]);
        }

        //计算第一段折线段之前的距离
        var firstDistance = SuperMap.Plot.PlottingUtil.polylineDistance(firstPts);
        var dDelta = dCircleToFirstPt - firstDistance;

        var secScaleValue = this.scaleValues[1];
        //计算线上圆的半径
        var dRadius = allDistance * secScaleValue;

        var firstEndPt,secStartPt;
        var secondPts = [];
        //圆心到前面那个点的距离大于半径
        if(dDelta >= dRadius){
            //计算第一条折线的终点
            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex], dRadius);
            firstPts.push(firstEndPt);

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            //计算第二条折线的起点
            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex + 1], dRadius);
            secondPts.push(secStartPt);
            var nPts = shapePts.length;
            for (var i = (circlePtIndex + 1); i < nPts; i++){
                secondPts.push(shapePts[i].clone());
            }

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }else{
            var pos =  -1;
            //找到第一个在圆外面的点
            for(var i = (firstPts.length - 1); i >= 0; i--){
                var tempPt1 = firstPts[i].clone();
                var tempPt2 = circlePt.clone();
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2);
                if(dispt > dRadius){//点到圆心的距离大于半径
                    pos = i;
                    break;
                }
            }

            if(pos != -1){
                var firstPtsTemp = [];
                for(var i = 0; i <= pos; i++){
                    firstPtsTemp.push(firstPts[i]);
                }
                firstPts = firstPtsTemp;
                //计算第一条折线的终点
                firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos], dRadius);
                firstPts.push(firstEndPt);
            }else {
                return;
            }

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            var pos2 = -1;
            //找到第一个在圆外面的点
            for(var i = circlePtIndex; i < shapePts.length; i++){
                var tempPt1 = shapePts[i].clone();
                var tempPt2 = circlePt.clone();
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2);
                if(dispt > dRadius){//点到圆心的距离大于半径
                    pos2 = i;
                    break;
                }
            }

            if(pos2 != -1){
                //计算第二条折线的起点
                secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos2], dRadius);
                secondPts.push(secStartPt);
                for(var i = (pos2 + 1); i < shapePts.length; i++){
                    secondPts.push(shapePts[i].clone());
                }
            }else{
                return;
            }

        }

        var tempPts2D = [];
        for (var i = 0; i < secondPts.length; i++) {
            tempPts2D.push(new SuperMap.Geometry.Point(secondPts[i].x, secondPts[i].y));
        }
        var dHeadDis = dAllDistance * this.getSubSymbolScaleValue();

        var nCount = secondPts.length;
        var endPt2D = new SuperMap.Geometry.Point(secondPts[nCount - 1].x, secondPts[nCount - 1].y);

        var nIndex = 1;
        for (var i = nCount - 2; i >= 0; i--) {
            var tempPt = new SuperMap.Geometry.Point(secondPts[i].x, secondPts[i].y);
            var dTempDis = SuperMap.Plot.PlottingUtil.distance(endPt2D, tempPt);
            if (dTempDis >= 2 * dHeadDis) {
                nIndex = i;
                break;
            }
        }

        var secondRealPts3D = [];
        for (var i = 0; i <= nIndex; i++) {
            secondRealPts3D.push(secondPts[i]);
        }
        secondRealPts3D.push(secondPts[nCount - 1]);

        //创建第二条折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondRealPts3D);

        //箭头
        if (secondRealPts3D.length >= 2) {
            var lineStart = new SuperMap.Geometry.Point();
            lineStart.x = secondRealPts3D[secondRealPts3D.length - 2].x;
            lineStart.y = secondRealPts3D[secondRealPts3D.length - 2].y;

            var lineend = new SuperMap.Geometry.Point();
            lineend.x = secondRealPts3D[secondRealPts3D.length - 1].x;
            lineend.y = secondRealPts3D[secondRealPts3D.length - 1].y;

            var Arrowangle = SuperMap.Plot.PlottingUtil.radian(lineStart, lineend) * 180 / Math.PI;

            //var ptRight = SuperMap.Plot.PlottingUtil.circlePoint(lineend, dHeadDis, dHeadDis, Arrowangle + 165);
            //var ptLeft = SuperMap.Plot.PlottingUtil.circlePoint(lineend, dHeadDis, dHeadDis, Arrowangle + 195);
            //
            //var shapePtsHead = [];
            //shapePtsHead.push(ptRight);
            //shapePtsHead.push(geoPts[geoPts.length - 1]);
            //shapePtsHead.push(ptLeft);
            //
            ////创建折线图元
            //var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
            //this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePtsHead, style);
            this.addArrow(shapePts);
            //计算两条竖线
            //1
            var dLineDis1 = 1.5 * dHeadDis;
            var ptLine1Center = SuperMap.Plot.PlottingUtil.circlePoint(lineend, dLineDis1, dLineDis1, Arrowangle + 180);

            var dTempDis1 = dHeadDis * 0.5;
            var pt1_Line1 = SuperMap.Plot.PlottingUtil.circlePoint(ptLine1Center, dTempDis1, dTempDis1, Arrowangle + 90);
            var pt2_Line1 = SuperMap.Plot.PlottingUtil.circlePoint(ptLine1Center, dTempDis1, dTempDis1, Arrowangle + 270);

            var pts2D = [];
            pts2D.push(pt1_Line1);
            pts2D.push(pt2_Line1);
            //创建第一条竖线
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);
            //2
            var dLineDis2 = 1.8 * dHeadDis;
            var ptLine2Center = SuperMap.Plot.PlottingUtil.circlePoint(lineend, dLineDis2, dLineDis2, Arrowangle + 180);

            var dTempDis2 = dHeadDis * 0.5;
            var pt1_Line2 = SuperMap.Plot.PlottingUtil.circlePoint(ptLine2Center, dTempDis2, dTempDis2, Arrowangle + 90);
            var pt2_Line2 = SuperMap.Plot.PlottingUtil.circlePoint(ptLine2Center, dTempDis2, dTempDis2, Arrowangle + 270);

            pts2D = [];
            pts2D.push(pt1_Line2);
            pts2D.push(pt2_Line2);
            //创建第二条竖线
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);
        }

        var CarlineStart = new SuperMap.Geometry.Point();
        CarlineStart.x = secondPts[0].x;
        CarlineStart.y = secondPts[0].y;

        var Carlineend = new SuperMap.Geometry.Point();
        Carlineend.x = firstPts[firstPts.length - 1].x;
        Carlineend.y = firstPts[firstPts.length - 1].y;

        var CarlineCenter = new SuperMap.Geometry.Point();
        CarlineCenter.x = (CarlineStart.x + Carlineend.x) / 2;
        CarlineCenter.y = (CarlineStart.y + Carlineend.y) / 2;

        circlePt.x = CarlineCenter.x;
        circlePt.y = CarlineCenter.y;

        var dCarDis = SuperMap.Plot.PlottingUtil.distance(CarlineStart, Carlineend);

        var Carangle = SuperMap.Plot.PlottingUtil.radian(CarlineStart, Carlineend) * 180 / Math.PI;

        var pt1 = new SuperMap.Geometry.Point(-0.5 * dCarDis, 0.0);
        var pt2 = new SuperMap.Geometry.Point(0.0, 0.25 * dCarDis);
        var pt3 = new SuperMap.Geometry.Point(0.5 * dCarDis, 0.0);
        var pt4 = new SuperMap.Geometry.Point(0.0, -0.25 * dCarDis);

        var CarShapePts = [];
        var Transpt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter, pt1, Carangle);
        var Transpt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter, pt2, Carangle);
        var Transpt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter, pt3, Carangle);
        var Transpt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter, pt4, Carangle);
        CarShapePts.push(Transpt1);
        CarShapePts.push(Transpt2);
        CarShapePts.push(Transpt3);
        CarShapePts.push(Transpt4);

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, CarShapePts);

        //添加比例

        if(this.isEdit){
            var scalePt = new SuperMap.Geometry.Point(0,dRadius);
            var Transpt = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,scalePt,Carangle);
            this.addScalePoint(Transpt,1);
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
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        //总长度
        var dAllDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            dAllDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }

        //创建贝塞尔曲线
        var allPoints, shapePts;
        shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = allDistance * 0.5;

        var ptsIndex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt, shapePts);
        var circlePtIndex = ptsIndex.index;
        var circlePt = ptsIndex.pts;
        if(circlePtIndex < 0){
            return;
        }
        if(index === 1){
            var distance = SuperMap.Plot.PlottingUtil.distance(pt,circlePt);
            var dScaleValue = distance/dAllDistance;
           this.scaleValues[1] = dScaleValue;

        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol29903"
});