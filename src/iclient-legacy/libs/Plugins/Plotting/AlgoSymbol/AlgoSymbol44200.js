/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol44200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(90);

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

        if(this.scaleValues.length < 3){
            this.scaleValues = [];
            this.scaleValues.push(0.5);
            this.scaleValues.push(0.05);
            this.scaleValues.push(90);
        }

        // //设置子标号大小比例值
        // if(!this.isEdit){
        //     this.scaleValues[1] = this.getSubSymbolScaleValue();
        // }

        //创建贝塞尔曲线
        var shapePts2D = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //清理重复的点
        SuperMap.Plot.PlottingUtil.clearSamePts(shapePts2D);

        //求整体贝塞尔曲线的中点
        //获取位置点折线总长
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts2D);

        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }

        //计算线上圆圆心到第一个位置点间的距离
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var distance = dAllDistance * dScale0;

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(distance,shapePts2D);
        if(!ptsindex.bfind) {
            return;
        }
        var nIndex = ptsindex.index;
        var ptSymbol = ptsindex.pts;

        var symbolPt2D = ptSymbol;
        var symbolSize = dScale1*dAllDistance;

        //矩形
        var pt1 = new SuperMap.Geometry.Point( symbolSize,-0.5*symbolSize);
        var pt2 = new SuperMap.Geometry.Point( symbolSize, 0.5*symbolSize);
        var pt3 = new SuperMap.Geometry.Point(-symbolSize, 0.5*symbolSize);
        var pt4 = new SuperMap.Geometry.Point(-symbolSize,-0.5*symbolSize);

        var temp1 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt1,dScale2);
        var temp2 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt2,dScale2);
        var temp3 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt3,dScale2);
        var temp4 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt4,dScale2);

        var rectanglePts2D = [];
        rectanglePts2D.push(temp1);
        rectanglePts2D.push(temp2);
        rectanglePts2D.push(temp3);
        rectanglePts2D.push(temp4);
        rectanglePts2D.push(temp1);

        //矩形
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, rectanglePts2D);

        //矩形内三角形
        var pt5 = new SuperMap.Geometry.Point(0.5*symbolSize, -0.3*symbolSize);
        var pt6 = new SuperMap.Geometry.Point(0.65*symbolSize,0.3*symbolSize);
        var pt7 = new SuperMap.Geometry.Point(0.35*symbolSize,0.3*symbolSize);

        var temp5 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt5,dScale2);
        var temp6 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt7,dScale2);
        var temp7 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt6,dScale2);

        var cellpts = [];
        cellpts.push(temp5);
        cellpts.push(temp6);
        cellpts.push(temp7);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, cellpts,{lineColorLimit:true,strokeColor:"#0000FF",fillLimit:true,fillStyle:0,fillColor:"#0000FF"});

        //箭头直线
        var pt8 = new SuperMap.Geometry.Point(symbolSize,0);
        var pt9 = new SuperMap.Geometry.Point(2*symbolSize,0);

        var temp8 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt8,dScale2);
        var temp9 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt9,dScale2);

        var cellpts = [];
        cellpts.push(temp8);
        cellpts.push(temp9);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);

        //箭头三角形
        var pt10 = new SuperMap.Geometry.Point(2*symbolSize, 0.15*symbolSize);
        var pt11 = new SuperMap.Geometry.Point(2*symbolSize,-0.15*symbolSize);
        var pt12 = new SuperMap.Geometry.Point(2.6*symbolSize,0);

        var temp10 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt10,dScale2);
        var temp11 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt11,dScale2);
        var temp12 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt2D,pt12,dScale2);

        var cellpts = [];
        cellpts.push(temp10);
        cellpts.push(temp11);
        cellpts.push(temp12);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, cellpts,{fillLimit:true,fillStyle:0});

        var leftLinePts = [];
        var rightLinePts = [];
        var i;

        for (i = 0; i <= nIndex; i++) {
            leftLinePts.push(shapePts2D[i]);
        }
        leftLinePts.push(symbolPt2D);

        rightLinePts.push(symbolPt2D);
        for (i = nIndex+1; i < shapePts2D.length; i++) {
            rightLinePts.push(shapePts2D[i]);
        }

        var dSpace = 1.2*symbolSize;

        if (distance > dSpace) {

            var ptsindexleft = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(distance-dSpace, leftLinePts);
            if(ptsindexleft.bfind)
            {
                var ptLeftSymbol = ptsindexleft.pts;
                var nLeftIndex = ptsindexleft.index;
                cellpts = [];
                for (i = 0; i <= nLeftIndex; i++) {
                    cellpts.push(leftLinePts[i]);
                }
                cellpts.push(ptLeftSymbol);
                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);
            }
        }

        if (dAllDistance-distance > dSpace) {
            var ptsindexright = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dSpace, rightLinePts);
            if(ptsindexright.bfind)
            {
                var ptRightSymbol = ptsindexright.pts;
                var nRightIndex = ptsindexright.index;
                cellpts = [];
                cellpts.push(ptRightSymbol);
                for (i = nRightIndex+1; i < rightLinePts.length; i++)
                {
                    cellpts.push(rightLinePts[i]);
                }
                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, cellpts);
            }
        }

        //计算比例点
        this.scalePoints = [];
        this.addScalePoint(ptSymbol);
        this.addScalePoint(temp9);
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

            var shapePts2D = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts2D);

            if(0 == index)
            {
                var scalePt2D = pt.clone();
                //var pts = SuperMap.Plot.PlottingUtil.clonePoints(shapePts2D);

                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0,0.0);

                for(var i = 0; i < shapePts2D.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(shapePts2D[i]);
                    tempPts.push(shapePts2D[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,shapePts2D[i],shapePts2D[i+1]);

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

                if(-1 == nCircleIndex || nCircleIndex > shapePts2D.length-1)
                {
                    return;
                }

                var distance = 0.0;
                for(var i = 0; i < nCircleIndex; i++) {
                    distance += SuperMap.Plot.PlottingUtil.distance(shapePts2D[i],shapePts2D[i+1]);
                }

                distance += SuperMap.Plot.PlottingUtil.distance(shapePts2D[nCircleIndex],circleCenterPt);

                if(distance < 0 || distance > dAllDistance) {
                    return;
                }

                var dScaleValue = distance/dAllDistance;
                this.scaleValues[0] = dScaleValue;
            }
            else if(1 == index)//圆心点
            {
                var dScale0 = this.scaleValues[0];
                var distance = dScale0*dAllDistance;
                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(distance, shapePts2D);
                if(!ptsindex.bfind)
                {
                    return;
                }
                var ptSymbol = ptsindex.pts;
                var nIndex = ptsindex.index;

                var r = SuperMap.Plot.PlottingUtil.distance(ptSymbol,pt);
                var dScaleValue = 0.5*r/dAllDistance;
                this.scaleValues[1] = dScaleValue;

                //计算角度
                var angle = SuperMap.Plot.PlottingUtil.radian(ptSymbol,pt)*this.RTOD;
                this.scaleValues[2] = angle;
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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol44200"
});