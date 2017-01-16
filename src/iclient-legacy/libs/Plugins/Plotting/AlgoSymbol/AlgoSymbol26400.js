/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues.push(0.05);    //小短线的长度/各定位点连线的长度
        this.scaleValues.push(0.05);    //保障箭头离第一定位点的折线距离/各定位点连线的长度
        this.scaleValues.push(-1.5);//保障箭头的长度/小短线的长度。若该比例值为正，则表示保障箭头的方向在,定位点连线的左侧；若该比例值为负，则表示保障箭头的方向在定位点连线的右侧(连线中的定位点次序是从
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

        if(geoPts.length < this.minEditPts){
            return;
        }

        if (3 > this.scaleValues.length)
        {
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.05);
            this.scaleValues.push(-1.5);
        }

        //判断是编辑状态还是创建状态
        if(!this.isEdit || this.scaleValues.length == 3)//创建状态
        {
            this.scaleValues = [];
            for(var i = 0; i < geoPts.length; i++)
            {
                this.scaleValues.push(0.0);//默认是在折线段的左边
            }

            var dSubSymbolScale = this.getSubSymbolScaleValue();
            this.scaleValues.push(0.8*dSubSymbolScale);
            this.scaleValues.push(dSubSymbolScale);
            this.scaleValues.push(-1.5);
        }

        //********************************创建主体折线图元****************************
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geoPts);
        //********************************************************************************
        
        //折线段总体长度
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //小短线长度
        var iScaleNum = this.scaleValues.length;
        var ScaleValue = this.scaleValues[iScaleNum-3];
        var dDis = dAllDistance * ScaleValue;

        //******************************第一定位点的垂线*******************************

        var lienPt;
        //第一个点和第二个点的垂线
        var dScale0 = this.scaleValues[0];
        if( dScale0 == 0.0)//小短线在定位点连线的左侧
        {
            var result = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[1], geoPts[0]);
            lienPt = result.pntRight;
        }
        else if(dScale0 == 1.0)//小短线在定位点连线的右侧
        {
            var result = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[1], geoPts[0]);
            lienPt = result.pntLeft;
        }
        else if(dScale0 == 2.0)//小短线长度为0
        {
            lienPt = geoPts[0];
        }
        else
        {
            return;
        }

        var shapePts = [];
        shapePts.push(geoPts[0]);
        shapePts.push(lienPt);

        //添加黄点
        this.addScalePoint(lienPt);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts, null, true);

        //*************************************************************************************

        //*********************************************创建角平分线**********************
        if(geoPts.length > 2)
        {
            for(var i = 1; i < geoPts.length-1; i++)
            {
                var tempPt;
                var dScale = this.scaleValues[i];
                if( dScale == 0.0)//小短线在定位点连线的左侧
                {
                    var pti = geoPts[i];
                    var ptiadd1 = geoPts[i+1];
                    var ptidec1 = geoPts[i-1];
                    //计算角平分线
                    var angle1 = SuperMap.Plot.PlottingUtil.radian(pti,ptiadd1)*180/Math.PI;
                    var angle2 = SuperMap.Plot.PlottingUtil.radian(pti,ptidec1)*180/Math.PI;
                    var angle = angle2-angle1;

                    while(angle < 0)
                    {
                        angle += 360;
                    }

                    var dRadians = angle/2;

                    var pnt = geoPts[i+1].clone();
                    pnt.rotate(dRadians,pti);
                    tempPt = SuperMap.Plot.PlottingUtil.LinePnt(pti, pnt, dDis);
                }
                else if(dScale == 1.0)//小短线在定位点连线的右侧
                {
                    var pti = geoPts[i];
                    var ptiadd1 = geoPts[i+1];
                    var ptidec1 = geoPts[i-1];
                    //计算角平分线
                    var angle1 = SuperMap.Plot.PlottingUtil.radian(pti,ptiadd1)*180/Math.PI;
                    var angle2 = SuperMap.Plot.PlottingUtil.radian(pti,ptidec1)*180/Math.PI;
                    var angle = angle2-angle1;

                    while(angle < 0)
                    {
                        angle += 360;
                    }

                    var dRadians = 180 - angle/2;

                    var pnt = geoPts[i-1].clone();
                    pnt.rotate(dRadians, pti);
                    tempPt = SuperMap.Plot.PlottingUtil.LinePnt(pti, pnt, dDis);
                }
                else if(dScale == 2.0)//小短线长度为0
                {
                    tempPt = geoPts[i];
                }
                else
                {
                    continue;
                }

                var pts2D = [];
                pts2D.push(geoPts[i]);
                pts2D.push(tempPt);

                this.addScalePoint(tempPt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, null, true);
            }

            //添加最后一个点的垂线
            //第二个点和第一个点的垂线
            var linePt1, linePt2;
            var pos = geoPts.length;
            var dTempScale = this.scaleValues[pos-1];
            if( dTempScale == 0.0)//小短线在定位点连线的左侧
            {
                var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[pos-2], geoPts[pos-1]);
                linePt1 = result1.pntLeft;

                //黄点
                var result2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[pos-2], geoPts[pos-1]);
                linePt2 = result2.pntLeft;
            }
            else if(dTempScale == 1.0)//小短线在定位点连线的右侧
            {
                var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[pos-2], geoPts[pos-1]);
                linePt1 = result1.pntRight;

                //黄点
                var result2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[pos-2], geoPts[pos-1]);
                linePt2 = result2.pntRight;
            }
            else if(dTempScale == 2.0)//小短线长度为0
            {
                linePt1 = geoPts[pos-1].clone();
                linePt2 = geoPts[pos-1].clone();
            }
            else
            {
                return;
            }

            var pts2D = [];
            pts2D.push(geoPts[pos - 1]);
            pts2D.push(linePt1);

            //添加黄点
            this.addScalePoint(linePt1);
            this.addScalePoint(linePt2);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, null, true);
        }
        else
        {
            //第二个点和第一个点的垂线
            var linePt1;
            var linePt2;
            var dScale1 = this.scaleValues[1];
            if( dScale1 == 0.0)//小短线在定位点连线的左侧
            {
                var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[0],geoPts[1]);
                linePt1 = result1.pntLeft;

                //黄点
                var result2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[0],geoPts[1]);
                linePt2 = result2.pntLeft;
            }
            else if(dScale1 == 1.0)//小短线在定位点连线的右侧
            {
                var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[0],geoPts[1]);
                linePt1 = result1.pntRight;

                //黄点
                var result2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[0],geoPts[1]);
                linePt2 = result2.pntRight;
            }
            else if(dScale1 == 2.0)//小短线长度为0
            {
                linePt1 = geoPts[1].clone();

                //黄点
                linePt2 = geoPts[1].clone();
            }
            else
            {
                return;
            }

            var pts2D = [];
            pts2D.push(geoPts[1]);
            pts2D.push(linePt1);

            //添加黄点
            this.addScalePoint(linePt1);
            this.addScalePoint(linePt2);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, null, true);
        }
        //*******************************************************************************

        //*****************************************画箭头********************************
        //添加箭身图元
        var arrowHeadPt;

        var ScalePtsNum = this.scaleValues.length;
        var ScaleValue1 = this.scaleValues[ScalePtsNum-2];
        var ddis = Math.abs(dAllDistance * ScaleValue1);//箭头到第一定位点的距离

        //计算箭头的长度
        var ScaleValue2 = this.scaleValues[ScalePtsNum-1];
        var dArrowLength = Math.abs(dDis * ScaleValue2);

        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(geoPts, ddis);

        if(-1 === result.index)
        {
            return;
        }
        var iptindex = result.index;
        var ptArrow = result.pt;//箭头根点

        if(ScaleValue2 >= 0)//保障箭头的方向在定位点连线的右侧（从第一定位点往后）
        {
            var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArrowLength,geoPts[iptindex], ptArrow);
            arrowHeadPt = result1.pntRight;
        }
        else//保障箭头的方向在定位点连线的左侧（从第一定位点往后）
        {
            var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArrowLength,geoPts[iptindex], ptArrow);
            arrowHeadPt = result1.pntLeft;
        }

        var ptHead = SuperMap.Plot.PlottingUtil.LinePnt(ptArrow,arrowHeadPt,dArrowLength);

        var ddisarrowear = dArrowLength*0.3;
        var ptarrowear = SuperMap.Plot.PlottingUtil.LinePnt(ptHead,ptArrow,ddisarrowear);

        var result1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddisarrowear*0.3,ptHead, ptarrowear);
        var arrowLeftPt = result1.pntLeft;
        var arrowRightPt = result1.pntRight;

        var pts2D = [];
        pts2D.push(ptArrow);
        pts2D.push(ptHead);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D, null, true);

        pts2D = [];
        pts2D.push(arrowLeftPt);
        pts2D.push(ptHead);
        pts2D.push(arrowRightPt);

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D, style, true);

        //添加黄点
        this.addScalePoint(ptHead);

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
    modifyPoint: function(index, pt) {
        if(pt.isScalePoint === true){
            if(this.scalePoints.length <= index)
                return;

            var geoPts = this.controlPoints;

            if (this.minEditPts > geoPts.length)
            {
                return;
            }

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var iPtsCount = geoPts.length;
            var scalePt2D = pt;

            if(index >= 0 && index < iPtsCount)//改变的是小线段的朝向
            {
                //********************************判断点在折线的哪边**********************
                var isptRighttoLine = false;
                if( index == 0 )//端点
                {
                    isptRighttoLine = SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[index],geoPts[index+1],scalePt2D);
                }
                else if(index == (iPtsCount-1))//端点
                {
                    isptRighttoLine = SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[index-1],geoPts[index],scalePt2D);
                }
                else
                {
                    //第三个点和前两个点的关系
                    var isright1 = SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[index-1],geoPts[index],geoPts[index+1]);
                    //改变的比例点和前两个点的关系
                    var isright2 = SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[index-1],geoPts[index],scalePt2D);

                    if(isright1 != isright2)//第三个点和比例点不在一边
                    {
                        isptRighttoLine = isright2;
                    }
                    else
                    {
                        //判断比例点在第三个点的哪边
                        var isright3 = SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[index],geoPts[index+1],scalePt2D);
                        if(isright3 == isright2)
                        {
                            isptRighttoLine = isright2;
                        }
                        else
                        {
                            isptRighttoLine = isright3;
                        }
                    }
                }
                //**********************************************************************

                if(isptRighttoLine)
                {
                    this.scaleValues[index] = 1.0;
                }
                else
                {
                    this.scaleValues[index] = 0.0;
                }
            }
            else if(index == iPtsCount)//改变的是小短线的长度
            {
                var ddis = SuperMap.Plot.PlottingUtil.distance(geoPts[iPtsCount-1],scalePt2D);
                ddis = ddis/2;
                var dscale = ddis/dAllDistance;
                this.scaleValues[index] = dscale;
            }
            //改变的是保障箭头离第一定位点的折线距离和保障箭头的长度
            else if(index == (iPtsCount+1) || index == (iPtsCount+2))
            {
                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0,0.0);

                for(var i = 0; i < geoPts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(geoPts[i]);
                    tempPts.push(geoPts[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,geoPts[i],geoPts[i+1]);

                    var result = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                    if(!result.isOnPolyLine)
                    {
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

                if(-1 == nCircleIndex || nCircleIndex > geoPts.length-1)
                {
                    return;
                }

                var distance = 0.0;
                //计算圆心到起始点的距离
                for(var i = 0; i < nCircleIndex; i++)
                {
                    var pt1 = geoPts[i];
                    var pt2 = geoPts[i+1];
                    distance += SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                }

                var tempPt = geoPts[nCircleIndex];
                distance += SuperMap.Plot.PlottingUtil.distance(tempPt,circleCenterPt);

                if(distance < 0 || distance > dAllDistance)
                {
                    return;
                }

                var dScaleValue = distance/dAllDistance;
                this.scaleValues[iPtsCount+1] = dScaleValue;

                var iScaleNum = this.scaleValues.length;
                var ScaleValue = this.scaleValues[iScaleNum-3];
                var ddis = dAllDistance * ScaleValue;

                //判断点在折线的哪边
                var isptRight = SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[nCircleIndex],geoPts[nCircleIndex+1],scalePt2D);
                var dScaleValue2;
                if(isptRight)
                {
                    dScaleValue2 = dDitanceCtoP/ddis;
                }
                else
                {
                    dScaleValue2 = -Math.abs(dDitanceCtoP/ddis);
                }

                this.scaleValues[iPtsCount+2] = dScaleValue2;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26400"
})