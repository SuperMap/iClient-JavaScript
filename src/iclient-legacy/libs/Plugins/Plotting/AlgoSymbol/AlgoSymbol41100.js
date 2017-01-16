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
SuperMap.Geometry.AlgoSymbol41100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 9999;

        this.scaleValues = [];
        this.scaleValues[0] = 0.05;
        this.scaleValues[1] = 0.05;
        this.scaleValues[2] = -2.5;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2)
        {
            return;
        }

        if(this.scaleValues.length < 3){
            this.scaleValues = [];
            this.scaleValues[0] = 0.05;
            this.scaleValues[1] = 0.05;
            this.scaleValues[2] = -2.5;
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var bisCreate = false,i;
        //判断是编辑状态还是创建状态
        if(this.scaleValues.length == 3)//创建状态
        {
            bisCreate = true;
            this.scaleValues = [];
            for(i = 0; i<geoPts.length; i++)
            {
                this.scaleValues.push(0.0);//默认是在折线段的左边
            }
            this.scaleValues.push(0.05);//小短线的长度/各定位点连线的长度
            this.scaleValues.push(0.05);//保障箭头离第一定位点的折线距离/各定位点连线的长度
            this.scaleValues.push(-2.50000);
        }
        else if(this.scaleValues.length == (geoPts.length+3))//编辑状态
        {
            bisCreate = false;
        }
        else if(this.scaleValues.length == (geoPts.length+2))
        {
            this.scaleValues = [];
            for(i = 0; i<geoPts.length; i++)
            {
                this.scaleValues.push(0.0);//默认是在折线段的左边
            }
            this.scaleValues.push(0.05);//小短线的长度/各定位点连线的长度
            this.scaleValues.push(0.05);//保障箭头离第一定位点的折线距离/各定位点连线的长度
            this.scaleValues.push(-2.50000);
        }
        else
        {
            return;
        }

        if(!this.isEdit){
            this.scaleValues[this.scaleValues.length - 2] = this.getSubSymbolScaleValue();
        }

        //********************************创建主体折线图元****************************
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);
        //********************************************************************************


        //折线段总体长度
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //小短线长度
        var iScaleNum = this.scaleValues.length;
        var ScaleValue = this.scaleValues[iScaleNum-3];
        var dDis = dAllDistance * ScaleValue;

        //******************************第一定位点的垂线*******************************
        var dptxy,sidepoint;
        //第一个点和第二个点的垂线

        var dScale0 = this.scaleValues[0];
        if( dScale0 == 0.0)//小短线在定位点连线的左侧
        {
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[1], geoPts[0]);
            dptxy = sidepoint.pntRight;
        }
        else if(dScale0 == 1.0)//小短线在定位点连线的右侧
        {
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[1],geoPts[0]);
            dptxy = sidepoint.pntLeft;
        }
        else if(dScale0 == 2.0)//小短线长度为0
        {
            dptxy = geoPts[0];
        }
        else
        {
            return;
        }

        var shapearray = [];
        shapearray.push(geoPts[0]);
        shapearray.push(dptxy);

        //添加黄点
        this.scalePts = [];
        this.addScalePoint(dptxy);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapearray);

        //*************************************************************************************

        //*********************************************创建角平分线**********************
        if(geoPts.length>2)
        {
            for(i = 1; i<(geoPts.length-1); i++)
            {
                var temppt,pnt;
                var pti,ptiadd1,ptidec1,angle1,angle2,angle,dRadians;
                var dScale = this.scaleValues[i];
                if( dScale == 0.0)//小短线在定位点连线的左侧
                {
                    pti = geoPts[i];
                    ptiadd1 = geoPts[i+1];
                    ptidec1 = geoPts[i-1];
                    //计算角平分线
                    angle1 = SuperMap.Plot.PlottingUtil.radian(pti,ptiadd1)*this.RTOD;
                    angle2 = SuperMap.Plot.PlottingUtil.radian(pti,ptidec1)*this.RTOD;
                    angle = angle2-angle1;

                    while(angle < 0)
                    {
                        angle += 360;
                    }

                    dRadians = angle*this.DTOR/2;

                    pnt = geoPts[i+1].clone();
                    pnt = SuperMap.Plot.PlottingUtil.RotateAngle(pti,dRadians,pnt);
                    temppt = SuperMap.Plot.PlottingUtil.LinePnt(pti, pnt, dDis);
                }
                else if(dScale == 1.0)//小短线在定位点连线的右侧
                {
                    pti = geoPts[i];
                    ptiadd1 = geoPts[i+1];
                    ptidec1 = geoPts[i-1];
                    //计算角平分线
                    angle1 = SuperMap.Plot.PlottingUtil.radian(pti,ptiadd1)*this.RTOD;
                    angle2 = SuperMap.Plot.PlottingUtil.radian(pti,ptidec1)*this.RTOD;
                    angle = angle2-angle1;

                    while(angle < 0)
                    {
                        angle += 360;
                    }

                    dRadians = Math.PI - angle*this.DTOR/2;

                    pnt = geoPts[i-1].clone();
                    pnt = SuperMap.Plot.PlottingUtil.RotateAngle(pti,dRadians,pnt);
                    temppt = SuperMap.Plot.PlottingUtil.LinePnt(pti, pnt, dDis);
                }
                else if(dScale == 2.0)//小短线长度为0
                {
                    temppt = geoPts[i];
                }
                else
                {
                    return;
                }

                var shapearray6 = [];
                shapearray6.push(geoPts[i]);
                shapearray6.push(temppt);

                //添加黄点
                this.addScalePoint(temppt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapearray6);
            }

            //添加最后一个点的垂线
            //第二个点和第一个点的垂线
            var dptxy5,dptxy6;
            var pos = geoPts.length;
            var dTempScale = this.scaleValues[pos-1];
            if( dTempScale == 0.0)//小短线在定位点连线的左侧
            {
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[pos-2], geoPts[pos-1]);
                dptxy5 = sidepoint.pntLeft;

                //黄点
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[pos-2], geoPts[pos-1]);
                dptxy6 = sidepoint.pntLeft;
            }
            else if(dTempScale == 1.0)//小短线在定位点连线的右侧
            {
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[pos-2], geoPts[pos-1]);
                dptxy5 = sidepoint.pntRight;

                //黄点
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[pos-2], geoPts[pos-1]);
                dptxy6 = sidepoint.pntRight;
            }
            else if(dTempScale == 2.0)//小短线长度为0
            {
                dptxy5 = geoPts[pos-1];
                dptxy6 = geoPts[pos-1];
            }
            else
            {
                return;
            }

            var shapearray5 = [];
            shapearray5.push(geoPts[pos-1]);
            shapearray5.push(dptxy5);

            //添加黄点
            this.addScalePoint(dptxy5);
            this.addScalePoint(dptxy6);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapearray5);
        }
        else
        {
            //第二个点和第一个点的垂线
            var dptxy4, dptxy5;
            var dScale1 = this.scaleValues[1];
            if( dScale1 == 0.0)//小短线在定位点连线的左侧
            {
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[0], geoPts[1]);
                dptxy4 = sidepoint.pntLeft;

                //黄点
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[0], geoPts[1]);
                dptxy5 = sidepoint.pntLeft;
            }
            else if(dScale1 == 1.0)//小短线在定位点连线的右侧
            {
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,geoPts[0], geoPts[1]);
                dptxy4 = sidepoint.pntRight;

                //黄点
                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dDis*2),geoPts[0], geoPts[1]);
                dptxy5 = sidepoint.pntRight;
            }
            else if(dScale1 == 2.0)//小短线长度为0
            {
                dptxy4 = geoPts[1];

                //黄点
                dptxy5 = geoPts[1];
            }
            else
            {
                return;
            }

            var shapearray4 = [];
            shapearray4.push(geoPts[1]);
            shapearray4.push(dptxy4);

            //添加黄点
            this.scalePts.push(dptxy4);
            this.scalePts.push(dptxy5);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapearray4);
        }
        //*******************************************************************************

        //*****************************************画折线********************************
        //添加箭身图元
        var dptxy1;

        var ScalePtsNum = this.scaleValues.length;
        var ScaleValue1 = this.scaleValues[ScalePtsNum-2];
        var ddis = Math.abs(dAllDistance * ScaleValue1);//箭头到第一定位点的距离

        //计算箭头的长度
        var ScaleValue2 = this.scaleValues[ScalePtsNum-1];
        var dArrowLength = Math.abs(dDis * ScaleValue2);

        //箭头根点
        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(ddis, geoPts);
        var iptindex = ptsindex.index;
        var ptArrow = ptsindex.pts;//箭头根点

        if(!ptsindex.bfind) {
            return;
        }

        if(ScaleValue2 >= 0)//保障箭头的方向在定位点连线的右侧（从第一定位点往后）
        {
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArrowLength,geoPts[iptindex], ptArrow);
            dptxy1 = sidepoint.pntRight;
        }
        else//保障箭头的方向在定位点连线的左侧（从第一定位点往后）
        {
            sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dArrowLength,geoPts[iptindex], ptArrow);
            dptxy1 = sidepoint.pntLeft;
        }

        var ptHead = SuperMap.Plot.PlottingUtil.LinePnt(ptArrow,dptxy1,dArrowLength);

        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis,ptArrow, ptHead);
        var dptxy4 = sidepoint.pntRight;

        var shapearray2 = [];
        shapearray2.push(ptArrow);
        shapearray2.push(ptHead);
        shapearray2.push(dptxy4);

        //添加黄点
        this.addScalePoint(ptHead);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapearray2);
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
        if (pt.isScalePoint === true) {
            if (index < 0) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            var iPtsCount = geoPts.length;
            var scalePt2D = pt;
            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
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
                var circleCenterPt = new SuperMap.Geometry.Point(0,0);
                var i;

                for(i = 0; i < geoPts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(geoPts[i]);
                    tempPts.push(geoPts[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,geoPts[i],geoPts[i+1]);

                    var ptonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                    if(!ptonline.isOnPolyLine) {
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
                for(i = 0; i < nCircleIndex; i++)
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

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol41100"
});

