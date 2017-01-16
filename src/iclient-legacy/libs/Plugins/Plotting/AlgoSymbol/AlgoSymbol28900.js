/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.5);
        this.scaleValues.push(0.05);
        this.scaleValues.push(0);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 6803));
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
            this.scaleValues.push(0.5);
            this.scaleValues.push(0.05);
            this.scaleValues.push(0);
        }

        // //设置子标号大小比例值
        // if(!this.isEdit){
        //     this.scaleValues[1] = this.getSubSymbolScaleValue();
        // }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //清理重复的点
        SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        //求整体贝塞尔曲线的中点
        //获取位置点折线总长
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }

        //计算线上圆圆心到第一个位置点间的距离
        var dScaleValue0 = this.scaleValues[0];
        var dScaleValue1 = this.scaleValues[1];
        var dScaleValue2 = this.scaleValues[2];

        var dCircleToFirstPt = allDistance * dScaleValue0;

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt,shapePts);
        if(!ptsindex.bfind) {
            return;
        }
        var circlePtIndex = ptsindex.index;
        var circlePt = ptsindex.pts;

        var firstPts = [];//圆前面的整体折线
        for(var i = 0; i < circlePtIndex + 1; i++){
            firstPts.push(shapePts[i].clone());
        }
        var firstDistance = SuperMap.Plot.PlottingUtil.polylineDistance(firstPts);//计算第一段折线段之前的距离
        var dDelta = dCircleToFirstPt - firstDistance;

        //计算线上圆的半径
        var dRadius = allDistance * dScaleValue1;
        dRadius *= 0.5;

        var firstEndPt,secStartPt;
        var secondPts = [];
        if(dDelta >= dRadius)//圆心到前面那个点的距离大于半径
        {
            //计算第一条折线的终点
            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex], dRadius);
            firstPts.push(firstEndPt);

            //创建第一条折线图元
            var style = {surroundLineFlag: false,fillLimit:true};
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts, style);

            //计算第二条折线的起点
            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex+1], dRadius);
            secondPts.push(secStartPt);
            var nPts = shapePts.length;
            for(var i = (circlePtIndex+1); i < nPts; ++i) {
                secondPts.push(shapePts[i]);
            }
        }
        else
        {
            var pos = -1;
            for(var i = (firstPts.length-1); i >=0; i--)//找到第一个在圆外面的点
            {
                var tempPt1 = firstPts[i].clone();
                var tempPt2 = circlePt.clone();
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);
                if(dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos = i;
                    break;
                }
            }

            if(pos != -1)
            {
                firstPts.splice((pos+1),(firstPts.length-1-pos));
                //计算第一条折线的终点
                firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos], dRadius);
                firstPts.push(firstEndPt);
            }
            else
                return;

            //创建第一条折线图元
            var style = {surroundLineFlag: false,fillLimit:true};
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts, style);

            var pos2 = -1;
            for(var i = circlePtIndex; i < shapePts.length; i ++)//找到第一个在圆外面的点
            {
                var tempPt1 = shapePts[i].clone();
                var tempPt2 = circlePt.clone();
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);
                if(dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos2 = i;
                    break;
                }
            }

            if(pos2 != -1)
            {
                //计算第二条折线的起点
                secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos2], dRadius);

                secondPts.push(secStartPt);
                for(var i = (pos2+1); i <  shapePts.length; ++i)
                {
                    secondPts.push(shapePts[i].clone());
                }
            }
            else
                return;
        }

        //创建第二条折线图元
        var style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts, style);

        var CarlineStart = secondPts[0];

        var Carlineend = firstPts[firstPts.length-1];

        var CarlineCenter = new SuperMap.Geometry.Point((CarlineStart.x +Carlineend.x)/2, (CarlineStart.y +Carlineend.y)/2);

        circlePt.x = CarlineCenter.x;
        circlePt.y = CarlineCenter.y;

        var dCarDis = SuperMap.Plot.PlottingUtil.distance(CarlineStart, Carlineend);

        var Carangle = SuperMap.Plot.PlottingUtil.radian(CarlineStart,Carlineend);

        dCarDis = dRadius;

        var dAngle = 0.0;
        //椭圆
        var pt1 = new SuperMap.Geometry.Point(0.0,0.0);

        if(this.isEdit) {
            dAngle = dScaleValue2;
        }
        else {
            dAngle = Carangle*this.RTOD;
            this.scaleValues[2] = dAngle;
        }
        var pt2 = new SuperMap.Geometry.Point(0.5*dCarDis,0.0);
        var pt3 = new SuperMap.Geometry.Point(0.0,dCarDis);

        var CarShapePts = [];
        var Transpt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt1,dAngle);
        CarShapePts.push(Transpt1);

        var Transpt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt2,dAngle);
        CarShapePts.push(Transpt2);

        var Transpt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt3,dAngle);
        CarShapePts.push(Transpt3);

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.ELLIPSESYMBOL, CarShapePts);

        //箭头
        var pt2_1 = new SuperMap.Geometry.Point(0.0,-2*dCarDis);
        var pt2_2 = new SuperMap.Geometry.Point( 0.15*dCarDis,-1.6*dCarDis);
        var pt2_3 = new SuperMap.Geometry.Point(-0.15*dCarDis,-1.6*dCarDis);

        var Transpt2_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt2_1,dAngle);
        var Transpt2_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt2_2,dAngle);
        var Transpt2_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt2_3,dAngle);

        var pts2D = [];
        pts2D.push(Transpt2_1);
        pts2D.push(Transpt2_2);
        pts2D.push(Transpt2_3);

        var style = {surroundLineFlag: false,fillLimit:true, fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D, style);

        //
        var pt3_1 = new SuperMap.Geometry.Point(0.0,-dCarDis);
        var Transpt3_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,pt3_1,dAngle);
        pts2D = [];
        pts2D.push(Transpt3_1);
        pts2D.push(Transpt2_1.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, style);

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(CarlineCenter);
        var ptyellow = new SuperMap.Geometry.Point(0.0,-2*dRadius);
        var TransptYellow = SuperMap.Plot.PlottingUtil.coordinateTrans(CarlineCenter,ptyellow,dAngle);
        this.addScalePoint(TransptYellow);
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
            if (index < 0 || index > 1) {
                return;
            }

            var geoPts = this.GetGoPts();
            if(geoPts.length < 2){
                return;
            }

            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            if(0 == index)
            {
                var scalePt2D = pt.clone();
                var pts = SuperMap.Plot.PlottingUtil.clonePoints(shapePts);

                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0,0.0);

                for(var i = 0; i < pts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(pts[i]);
                    tempPts.push(pts[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,pts[i],pts[i+1]);

                    var pointonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                    if(!pointonline.isOnPolyLine) {
                        continue;
                    }

                    var tempDistance = SuperMap.Plot.PlottingUtil.distance(scalePt2D,plumbPt);

                    if(-1 == nCircleIndex)
                    {
                        nCircleIndex = i;
                        circleCenterPt = plumbPt;
                        dDitanceCtoP = tempDistance;
                    }
                    else
                    {
                        if(dDitanceCtoP > tempDistance)
                        {
                            nCircleIndex = i;
                            circleCenterPt = plumbPt;
                            dDitanceCtoP = tempDistance;
                        }
                    }
                }

                if(-1 == nCircleIndex || nCircleIndex > pts.length-1)
                {
                    return;
                }

                var distance = 0.0;
                for(var i = 0; i < nCircleIndex; i++) {
                    distance += SuperMap.Plot.PlottingUtil.distance(shapePts[i],shapePts[i+1]);
                }

                distance += SuperMap.Plot.PlottingUtil.distance(shapePts[nCircleIndex],circleCenterPt);

                if(distance < 0 || distance > allDistance) {
                    return;
                }

                var dScaleValue = distance/allDistance;
                this.scaleValues[0] = dScaleValue;
            }
            else if(1 == index)//圆心点
            {
                var symbolPt = new SuperMap.Geometry.Point(0,0);

                for(var n = 0; n < 1; n++){
                    //计算线上圆圆心到第一个位置点间的距离
                    var dScaleValue0 = this.scaleValues[0];
                    var dScaleValue1 = this.scaleValues[1];
                    var dScaleValue2 = this.scaleValues[2];

                    var dCircleToFirstPt = allDistance * dScaleValue0;

                    var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt,shapePts);
                    if(!ptsindex.bfind) {
                        break;
                    }
                    var circlePtIndex = ptsindex.index;
                    var circlePt = ptsindex.pts;

                    var firstPts = [];//圆前面的整体折线
                    for(var i = 0; i < circlePtIndex + 1; i++){
                        firstPts.push(shapePts[i].clone());
                    }
                    var firstDistance = SuperMap.Plot.PlottingUtil.polylineDistance(firstPts);//计算第一段折线段之前的距离
                    var dDelta = dCircleToFirstPt - firstDistance;

                    //计算线上圆的半径
                    var dRadius = allDistance * dScaleValue1;
                    dRadius *= 0.5;

                    var firstEndPt,secStartPt;
                    var secondPts = [];
                    if(dDelta >= dRadius)//圆心到前面那个点的距离大于半径
                    {
                        //计算第一条折线的终点
                        firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex], dRadius);
                        firstPts.push(firstEndPt);

                        //计算第二条折线的起点
                        secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex+1], dRadius);
                        secondPts.push(secStartPt);
                        var nPts = shapePts.length;
                        for(var i = (circlePtIndex+1); i < nPts; ++i) {
                            secondPts.push(shapePts[i]);
                        }
                    }
                    else
                    {
                        var pos = -1;
                        for(var i = (firstPts.length-1); i >=0; i--)//找到第一个在圆外面的点
                        {
                            var tempPt1 = firstPts[i].clone();
                            var tempPt2 = circlePt.clone();
                            var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);
                            if(dispt > dRadius)//点到圆心的距离大于半径
                            {
                                pos = i;
                                break;
                            }
                        }

                        if(pos != -1)
                        {
                            firstPts.splice((pos+1),(firstPts.length-1-pos));
                            //计算第一条折线的终点
                            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos], dRadius);
                            firstPts.push(firstEndPt);
                        }
                        else
                            break;

                        var pos2 = -1;
                        for(var i = circlePtIndex; i < shapePts.length; i ++)//找到第一个在圆外面的点
                        {
                            var tempPt1 = shapePts[i].clone();
                            var tempPt2 = circlePt.clone();
                            var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);
                            if(dispt > dRadius)//点到圆心的距离大于半径
                            {
                                pos2 = i;
                                break;
                            }
                        }

                        if(pos2 != -1)
                        {
                            //计算第二条折线的起点
                            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos2], dRadius);

                            secondPts.push(secStartPt);
                            for(var i = (pos2+1); i <  shapePts.length; ++i)
                            {
                                secondPts.push(shapePts[i].clone());
                            }
                        }
                        else
                            break;;
                    }

                    var CarlineStart = secondPts[0];
                    var CarlineEnd = firstPts[firstPts.length-1];
                    symbolPt = new SuperMap.Geometry.Point((CarlineStart.x +CarlineEnd.x)/2, (CarlineStart.y +CarlineEnd.y)/2);
                }

                var distance = SuperMap.Plot.PlottingUtil.distance(pt,symbolPt);
                var dScaleValue = distance/allDistance;
                this.scaleValues[1] = dScaleValue;

                var dAngle = SuperMap.Plot.PlottingUtil.radian(symbolPt,pt)*this.RTOD;
                this.scaleValues[2] = dAngle-270;
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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol28900"
});