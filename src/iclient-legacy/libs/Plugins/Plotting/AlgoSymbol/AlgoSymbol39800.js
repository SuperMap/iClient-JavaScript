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
SuperMap.Geometry.AlgoSymbol39800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    HEADLINESCALE	:0.05,
    CIRCLESCALE		:0.03,
    CIRCLEPOS		:0.5,

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

        // if(this.scaleValues.length < 1){
        //     this.scaleValues = [];
        //     this.scaleValues[0] = 0.05;
        // }
        //
        // if(!this.isEdit){
        //     this.scaleValues[0] = this.getSubSymbolScaleValue();
        // }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        //var ctrlpts = SuperMap.Plot.PlottingUtil.getBeizerCtrlPt(geoPts);
        var ptsarr = [];//SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt(ctrlpts);

        //var ptsarr = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //折线连成线的长度
        var dallDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        this.scalePoints = [];

        if(geoPts.length < 3) {
            ptsarr.push(geoPts[0]);
            ptsarr.push(geoPts[1]);

            // if(!this.isEdit) {
            //     this.scaleValues = [];
            // }
        }
        else {
            var beizerPoints = SuperMap.Plot.PlottingUtil.ComputeBeizerPoints(this.isEdit, geoPts, this.scaleValues);
            this.scaleValues = beizerPoints.scaleValues;
            for(var m = 0; m < beizerPoints.scalePoints.length; m++){
                this.addScalePoint(beizerPoints.scalePoints[m]);
            }
            ptsarr = beizerPoints.beizerPoints;
        }

        SuperMap.Plot.PlottingUtil.clearSamePts(ptsarr);

        //曲线的长度
        var dBeizerDistance = SuperMap.Plot.PlottingUtil.polylineDistance(ptsarr);

        // this.scaleValues.RemoveAll();
        // this.scaleValues.Append(m_scaleValues);


        if(ptsarr.length <= 0)
        {
            return;
        }

        var npos;
        if(geoPts.length == 2)
        {
            npos = 0;
        }
        else
        {
            npos = geoPts.length -1;
        }

        var ddis;
        if(!this.isEdit)
        {
            ddis = dBeizerDistance*this.CIRCLEPOS;
        }
        else
        {
            ddis = dBeizerDistance*this.scaleValues[4*npos];
        }

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(ddis, ptsarr);
        if(!ptsindex.bfind) {
            return;
        }
        var nIndex = ptsindex.index;
        var ptcenter = ptsindex.pts;

        var dtextsize = this.CIRCLESCALE*dallDistance;
        var dleftdis = ddis - dtextsize;
        var dRightdis = ddis + dtextsize;

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dleftdis, ptsarr);
        if(!ptsindex.bfind)
        {
            return;
        }
        var ptleft = ptsindex.pts;
        nIndex = ptsindex.index;

        //线的前半部分
        var ptsLeft = [], i;
        if(nIndex == 0)
        {
            ptsLeft.push(ptsarr[0]);
        }
        else
        {
            for(i = 0; i < nIndex; i++)
            {
                ptsLeft.push(ptsarr[i]);
            }
        }
        ptsLeft.push(ptleft);

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dRightdis, ptsarr);
        if(!ptsindex.bfind) {
            return;
        }
        var ptRight = ptsindex.pts;
        nIndex = ptsindex.index;

        //线的后半部分
        var ptsRight = [];
        ptsRight.push(ptRight);
        for(i = (nIndex+1); i < ptsarr.length; i++)
        {
            ptsRight.push(ptsarr[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ptsLeft);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ptsRight);

        //计算符号
        //计算符号角度
        var symbolAngle = SuperMap.Plot.PlottingUtil.radian(ptleft,ptRight)*this.RTOD;
        var dSymbolDis = SuperMap.Plot.PlottingUtil.distance(ptleft,ptRight);
        var symbolCenterPt = new SuperMap.Geometry.Point((ptleft.x+ptRight.x)/2.0,(ptleft.y+ptRight.y)/2.0);

        var cellpts = [];
        cellpts.push(symbolCenterPt);
        cellpts.push(new SuperMap.Geometry.Point(symbolCenterPt.x+dSymbolDis/2.0,symbolCenterPt.y));
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,cellpts);

        //
        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(symbolCenterPt,dSymbolDis/2.0,dSymbolDis/2.0,symbolAngle+90);
        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dSymbolDis,dSymbolDis,symbolAngle);

        cellpts = [];
        cellpts.push(pt1);
        cellpts.push(pt2);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts);

        //
        var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(symbolCenterPt,dSymbolDis/2.0,dSymbolDis/2.0,symbolAngle+270);
        var pt4 = SuperMap.Plot.PlottingUtil.circlePoint(pt3,dSymbolDis,dSymbolDis,symbolAngle);

        cellpts = [];
        cellpts.push(pt3);
        cellpts.push(pt4);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts);

        var dLineDis;
        if(!this.isEdit)
        {
            dLineDis = this.HEADLINESCALE*dallDistance;
        }
        else
        {
            dLineDis = (dallDistance*this.scaleValues[4*npos+1])/1.667;
        }

        //计算贝赛尔曲线起始竖线
        if(ptsLeft.length < 2)
        {
            return;
        }
        var ptStart1 = ptsLeft[0];
        var ptStart2 = ptsLeft[1];
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart1,ptStart2)*this.RTOD;

        var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart1,dLineDis,dLineDis,angle+90);
        var tempPt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart1,dLineDis,dLineDis,angle+270);

        cellpts = [];
        cellpts.push(tempPt1);
        cellpts.push(tempPt2);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts);

        //计算贝赛尔曲线结束竖线
        if(ptsRight.length < 2)
        {
            return;
        }
        var ptEnd1 = ptsRight[ptsRight.length-1];
        var ptEnd2 = ptsRight[ptsRight.length-2];
        var angleEnd = SuperMap.Plot.PlottingUtil.radian(ptEnd1,ptEnd2)*this.RTOD;

        var tempPt3 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd1,dLineDis,dLineDis,angleEnd+90);
        var tempPt4 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd1,dLineDis,dLineDis,angleEnd+270);

        cellpts = [];
        cellpts.push(tempPt3);
        cellpts.push(tempPt4);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts);

        //虚线
        var paraPntsRight = SuperMap.Plot.PlottingUtil.paraLine(ptsarr, dLineDis, false);

        var dParaLineDis = SuperMap.Plot.PlottingUtil.polylineDistance(paraPntsRight);
        var dStepDis = dParaLineDis/11.0;

        var dCurentDis = dStepDis;
        for (i = 0; i < 11; i++)
        {
            ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCurentDis-dStepDis, paraPntsRight);
            if(!ptsindex.bfind)
            {
                continue;
            }
            var nStartIndex = ptsindex.index;
            var tempStartPt = ptsindex.pts;

            ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCurentDis, paraPntsRight);
            if(!ptsindex.bfind) {
                continue;
            }
            var tempEndPt = ptsindex.pts;
            var nEndIndex = ptsindex.index;

            if (i%2 == 0)
            {
                var tempPts = [];
                tempPts.push(tempStartPt);
                for (var n = nStartIndex+1; n <= nEndIndex; n++)
                {
                    tempPts.push(paraPntsRight[n]);
                }
                tempPts.push(tempEndPt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,tempPts,{surroundLineLimit:true,lineColorLimit:true,lineColor:0xFF000000});
            }

            dCurentDis += dStepDis;
        }

        if(!this.isEdit)
        {
            this.scaleValues.push(this.CIRCLEPOS);
            var dheadlinescale = dLineDis*1.667/dallDistance;
            this.scaleValues.push(dheadlinescale);
        }

        this.addScalePoint(ptcenter);
        this.addScalePoint(tempPt1);
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
            if (index < 0 || index > 2 * this.controlPoints.length - 1) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            var dallDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var dBeizerDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
            if(SuperMap.Plot.PlottingUtil.equalFuzzy(dallDistance,0.0) || SuperMap.Plot.PlottingUtil.equalFuzzy(dBeizerDistance,0.0))
            {
                return;
            }

            if(2*(geoPts.length-1) == index || (geoPts.length == 2 && index == 0))
            {
                var scalePt2D = pt;
                var pts = [], i;
                for(i = 0; i < shapePts.length; i++)
                {
                    pts.push(shapePts[i]);
                }

                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt;

                for(i = 0; i < pts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(pts[i]);
                    tempPts.push(pts[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,pts[i],pts[i+1]);

                    var ptonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                    if(!ptonline.isOnPolyLine)
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

                if(-1 == nCircleIndex || nCircleIndex > pts.length-1)
                {
                    return;
                }

                var distance = 0.0;
                //计算圆心到起始点的距离
                for(i = 0; i < nCircleIndex; i++)
                {
                    var pt1 = shapePts[i];
                    var pt2 = shapePts[i+1];
                    distance += SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                }

                var tempPt = shapePts[nCircleIndex];
                distance += SuperMap.Plot.PlottingUtil.distance(tempPt,circleCenterPt);

                if(distance < 0 || distance > dBeizerDistance)
                {
                    return;
                }

                var dScaleValue = distance/dBeizerDistance;

                //为了解决圆超出主线之后崩溃的问题，Add by XW
                if (dScaleValue > 0.9 || dScaleValue < 0.1)
                {
                    return;
                }
                //为了解决圆超出主线之后崩溃的问题，Add by XW

                if(geoPts.length == 2)
                {
                    this.scaleValues[0] = dScaleValue;
                }
                else
                {
                    this.scaleValues[2 * index] = dScaleValue;
                }
            }
            else if(2*geoPts.length-1 == index  || (geoPts.length == 2 && index == 1))
            {
                var dlength = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[0]);
                var dscale = dlength*1.667/dallDistance;

                if(geoPts.length == 2)
                {
                    this.scaleValues[1] = dscale;
                }
                else
                {
                    this.scaleValues[2*index-1] = dscale;
                }
            }
            else
            {
                var npos = -1;
                if(index % 2 == 0)//偶数比例点
                {
                    npos = Math.floor(index/2);
                }
                else//奇数比例点
                {
                    npos = Math.floor((index+1)/2);
                }

                var dx = pt.x - geoPts[npos].x;
                var dy = pt.y - geoPts[npos].y;

                var dscalex = dx/dallDistance;
                var dscaley = dy/dallDistance;

                this.scaleValues[2*index] = dscalex;
                this.scaleValues[2*index+1] = dscaley;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol39800"
});

