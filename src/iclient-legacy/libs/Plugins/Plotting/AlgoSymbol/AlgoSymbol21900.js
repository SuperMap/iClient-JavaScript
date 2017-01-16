/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol21900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 255;

        this.scaleValues = [];
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.01);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 19700));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = this.GetGoPts();
        if(geoPts.length < 2){
            return;
        }

        if(this.scaleValues.length != 3){
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.01);
        }

        //设置子标号大小比例值
        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
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

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }

        if(secondPts.length >= 2){
            var lineStart = secondPts[secondPts.length - 2].clone();
            var lineend = secondPts[secondPts.length - 1].clone();

            var dDiatance = SuperMap.Plot.PlottingUtil.distance(lineStart, lineend);
            var Arrowangle = SuperMap.Plot.PlottingUtil.radian(lineStart, lineend) * this.RTOD;

            //把最后一个点去掉
            var secondPtsTemp = [];
            for(var i = 0; i < secondPts.length - 1; i++){
                secondPtsTemp.push(secondPts[i]);
            }
            secondPts = secondPtsTemp;

            //设置箭头大小
            var ddis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts)*this.getSubSymbolScaleValue()*0.5;
            var dRadiusTemp = ddis;
            var ptRight = SuperMap.Plot.PlottingUtil.circlePoint(lineend,dRadiusTemp,dRadiusTemp,Arrowangle+157.5);
            var ptLeft = SuperMap.Plot.PlottingUtil.circlePoint(lineend,dRadiusTemp,dRadiusTemp,Arrowangle+202.5);

            var shapePtsHead = [];
            shapePtsHead.push(ptRight.clone());
            shapePtsHead.push(geoPts[geoPts.length - 1]);
            shapePtsHead.push(ptLeft.clone());

            //创建折线图元
            var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePtsHead, style, true);
        }

        var CarlineStart = secondPts[0].clone();
        var Carlineend = firstPts[firstPts.length - 1].clone();
        var CarlineCenter = new SuperMap.Geometry.Point((CarlineStart.x +Carlineend.x)/2, (CarlineStart.y +Carlineend.y)/2);
        circlePt.x = CarlineCenter.x;
        circlePt.y = CarlineCenter.y;

        var dCarDis = SuperMap.Plot.PlottingUtil.distance(CarlineStart, Carlineend);
        var Carangle = SuperMap.Plot.PlottingUtil.radian(CarlineStart, Carlineend) * this.RTOD;

        var pt1,pt2,pt3,pt4,pt5;//车的点
        var pt6,pt7,pt8,pt9;//车里的东西
        var pt10,pt11,pt12,pt13;//天线
        var ptyellow;

        pt1 = new SuperMap.Geometry.Point(0,0);
        pt2 = new SuperMap.Geometry.Point(0,0);
        pt3 = new SuperMap.Geometry.Point(0,0);
        pt4 = new SuperMap.Geometry.Point(0,0);
        pt5 = new SuperMap.Geometry.Point(0,0);
        pt6 = new SuperMap.Geometry.Point(0,0);
        pt7 = new SuperMap.Geometry.Point(0,0);
        pt8 = new SuperMap.Geometry.Point(0,0);
        pt9 = new SuperMap.Geometry.Point(0,0);
        pt10 = new SuperMap.Geometry.Point(0,0);
        pt11 = new SuperMap.Geometry.Point(0,0);
        pt12 = new SuperMap.Geometry.Point(0,0);
        pt13 = new SuperMap.Geometry.Point(0,0);
        ptyellow = new SuperMap.Geometry.Point(0,0);

        if(CarlineStart.x >= Carlineend.x){
            pt1.x = -dCarDis*0.25;
            pt1.y = -dCarDis*0.25;
            pt2.x = dCarDis*0.5;
            pt2.y = -dCarDis*0.25;
            pt3.x = dCarDis*0.5;
            pt3.y = dCarDis*0.25;
            pt4.x = -dCarDis*0.5;
            pt4.y = dCarDis*0.25;
            pt5.x = -dCarDis*0.5;
            pt5.y = 0;
            pt6.x = dCarDis*0.25;
            pt6.y = -dCarDis*0.125;
            pt7.x = 0;
            pt7.y = dCarDis*0.125;
            pt8.x = 0;
            pt8.y = -dCarDis*0.125;
            pt9.x = -dCarDis*0.25;
            pt9.y = dCarDis*0.125;
            pt10.x = 0;
            pt10.y = -dCarDis*0.25;
            pt11.x = -dCarDis*0.125;
            pt11.y = -dCarDis*0.5;
            pt12.x = dCarDis*0.25;
            pt12.y = -dCarDis*0.25;
            pt13.x = dCarDis*0.375;
            pt13.y = -dCarDis*0.5;
            ptyellow.x = 0;
            ptyellow.y = dRadius;
        }
        else {
            pt1.x = -dCarDis*0.25;
            pt1.y = dCarDis*0.25;
            pt2.x = dCarDis*0.5;
            pt2.y = dCarDis*0.25;
            pt3.x = dCarDis*0.5;
            pt3.y = -dCarDis*0.25;
            pt4.x = -dCarDis*0.5;
            pt4.y = -dCarDis*0.25;
            pt5.x = -dCarDis*0.5;
            pt5.y = 0;
            pt6.x = dCarDis*0.25;
            pt6.y = dCarDis*0.125;
            pt7.x = 0;
            pt7.y = -dCarDis*0.125;
            pt8.x = 0;
            pt8.y = dCarDis*0.125;
            pt9.x = -dCarDis*0.25;
            pt9.y = -dCarDis*0.125;
            pt10.x = 0;
            pt10.y = dCarDis*0.25;
            pt11.x = -dCarDis*0.125;
            pt11.y = dCarDis*0.5;
            pt12.x = dCarDis*0.25;
            pt12.y = dCarDis*0.25;
            pt13.x = dCarDis*0.375;
            pt13.y = dCarDis*0.5;
            ptyellow.x = 0;
            ptyellow.y = dRadius;
        }

        var CarShapePts = [];
        var LightingShapePts = [];
        var TianShapePtsLeft = [],TianShapePtsRight = [];
        var ArrowShpePts = [];

        var Transpt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt1,Carangle);
        var Transpt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt2,Carangle);
        var Transpt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt3,Carangle);
        var Transpt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt4,Carangle);
        var Transpt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt5,Carangle);
        var Transpt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt6,Carangle);
        var Transpt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt7,Carangle);
        var Transpt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt8,Carangle);
        var Transpt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt9,Carangle);
        var Transpt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt10,Carangle);
        var Transpt11 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt11,Carangle);
        var Transpt12 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt12,Carangle);
        var Transpt13 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt13,Carangle);

        CarShapePts.push(Transpt1);
        CarShapePts.push(Transpt2);
        CarShapePts.push(Transpt3);
        CarShapePts.push(Transpt4);
        CarShapePts.push(Transpt5);
        LightingShapePts.push(Transpt6);
        LightingShapePts.push(Transpt7);
        LightingShapePts.push(Transpt8);
        LightingShapePts.push(Transpt9);
        TianShapePtsLeft.push(Transpt10);
        TianShapePtsLeft.push(Transpt11);
        TianShapePtsRight.push(Transpt12);
        TianShapePtsRight.push(Transpt13);

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, CarShapePts, null, true);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, LightingShapePts, null, true);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, TianShapePtsLeft, null, true);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, TianShapePtsRight, null, true);

        //画箭头
        var ddis = SuperMap.Plot.PlottingUtil.distance(Transpt8,Transpt9) * 0.3;
        var Arrowpt = SuperMap.Plot.PlottingUtil.LinePnt(Transpt9,Transpt8,ddis);
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(0.3*ddis, Transpt9,Arrowpt);
        ArrowShpePts.push(sidepoint.pntLeft);
        ArrowShpePts.push(Transpt9);
        ArrowShpePts.push(sidepoint.pntRight);

        //创建折线图元
        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, ArrowShpePts, style, true);


        // var dangle = SuperMap.Plot.PlottingUtil.radian(firstEndPt, secStartPt) * this.RTOD;
        // var dsymbolsize = dRadius*0.8;
        //
        // if(this.subSymbols.length > 0){
        //     this.computeSubSymbol(this.subSymbols[0], circlePt, dsymbolsize, dangle + 180);
        // }

        //添加比例点
        this.scalePoints = [];
        var TransptYellow = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,ptyellow,Carangle);
        TransptYellow.isScalePoint = true;
        TransptYellow.tag = 0;
        this.scalePoints.push(TransptYellow);
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
        if (pt.isScalePoint) {
            if (index != 0) {
                return;
            }

            var geoPts = this.GetGoPts();
            if(geoPts.length < 2){
                return;
            }

            var shapePts;
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            if(index == 0){
                var dalldistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
                var ptsIndex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dalldistance*0.5, shapePts);
                var distance = SuperMap.Plot.PlottingUtil.distance(pt, ptsIndex.pts);
                var dScaleValue = distance/dalldistance;

                if(dScaleValue < 0.2){
                    this.scaleValues[1] = dScaleValue;
                }
            }
        }
        this.calculateParts();
    },

    GetGoPts: function () {
        var pts2D = [];
        var nCount = this.controlPoints.length;
        if(nCount < 2){
            return pts2D;
        }
        pts2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(pts2D);
        if(pts2D.length == 1){
            pts2D = [];
        }
        return pts2D;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol21900"
});