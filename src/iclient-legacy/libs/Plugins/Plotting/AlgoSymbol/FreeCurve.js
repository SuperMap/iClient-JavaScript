/**
 * Class: SuperMap.Geometry.ArrowLine
 * 箭头线对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.FreeCurve = SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{
    EditMode: 1,
    /**
     * Constructor: SuperMap.Geometry.ArrowLine
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.ArrowLine>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.FREECURVE;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.FREECURVE;
        this.symbolName = "FreeCurve";

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

        if(this.controlPoints === null || this.controlPoints.length < 2){
            return;
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts, 10);

        this.scalePoints = [];

        var ptsarr = [];
        if(geoPts.length < 3) {
            ptsarr.push(geoPts[0]);
            ptsarr.push(geoPts[1]);
        }
        else {

            var resampelpts = geoPts;
            if(!this.isEdit){
                var pixelBounds = new SuperMap.Bounds(0, 0, 100, 100);
                var ltLonLat = this.layer.map.getLonLatFromLayerPx(new SuperMap.Pixel(pixelBounds.left, pixelBounds.top));
                var rbLonLat = this.layer.map.getLonLatFromLayerPx(new SuperMap.Pixel(pixelBounds.right, pixelBounds.bottom));
                var bounds = new SuperMap.Bounds(ltLonLat.lon, rbLonLat.lat, rbLonLat.lon, ltLonLat.lat);

                var resampelpts = this.reSample(geoPts, bounds.getWidth() / 50);
                //resampelpts = this.reSampleByAngle(resampelpts, 20);
                //var resampelpts = this.reSampleByAngle(geoPts, 30);

                if(resampelpts.length < 3){
                    resampelpts = geoPts;
                }

                this.controlPoints = [];
                this.controlPoints.push.apply(this.controlPoints, resampelpts);
            }


            var beizerPoints = SuperMap.Plot.PlottingUtil.ComputeBeizerPoints(this.isEdit, resampelpts, this.scaleValues);
            this.scaleValues = beizerPoints.scaleValues;
            for(var m = 0; m < beizerPoints.scalePoints.length; m++){
                //this.addScalePoint(beizerPoints.scalePoints[m]);
                var ptctrl = beizerPoints.scalePoints[m].clone();
                ptctrl.isScalePoint = true;
                ptctrl.tag = m;
                this.scalePoints.push(ptctrl);
            }
            ptsarr = beizerPoints.beizerPoints;
        }

        var geometryLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsarr);
        geometryLine.style = {surroundLineFlag: false};
        this.components.push(geometryLine);






        // var halfArrowAngle = this.arrowAngle * Math.PI / 180.0 / 2;
        //
        // // 末尾箭头
        // var lineAngle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[1], this.controlPoints[0]);
        //
        // var angleLeftLine = lineAngle - halfArrowAngle;
        // var pntLeftLineX = this.controlPoints[1].x + this.arrowLength * Math.cos(angleLeftLine);
        // var pntLeftLineY = this.controlPoints[1].y + this.arrowLength * Math.sin(angleLeftLine);
        // var pntArrowLeft = new SuperMap.Geometry.Point(pntLeftLineX, pntLeftLineY);
        //
        // var angleRightLine = lineAngle + halfArrowAngle;
        // var pntRightLineX = this.controlPoints[1].x + this.arrowLength * Math.cos(angleRightLine);
        // var pntRightLineY = this.controlPoints[1].y + this.arrowLength * Math.sin(angleRightLine);
        // var pntArrowRight = new SuperMap.Geometry.Point(pntRightLineX, pntRightLineY);
        //
        // var ptsArrowEnd = [];
        // ptsArrowEnd.push(pntArrowLeft);
        // ptsArrowEnd.push(this.controlPoints[1].clone());
        // ptsArrowEnd.push(pntArrowRight);
        //
        // var codeID = this.arrowTypeEnd === 0 ? SuperMap.Plot.SymbolType.POLYLINESYMBOL : SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        // var geometryArrowEnd = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(codeID, ptsArrowEnd);
        // geometryArrowEnd.style = {surroundLineFlag: false, fillLimit: true,lineTypeLimit:true};
        //
        // // 校正中间线段数据
        // var pntArrowLineEnd = new SuperMap.Geometry.Point((pntLeftLineX + pntRightLineX) / 2, (pntLeftLineY + pntRightLineY) / 2);
        //
        // // 起始箭头
        // //lineAngle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[0], this.controlPoints[1]);
        // lineAngle += Math.PI;
        //
        // angleLeftLine = lineAngle - halfArrowAngle;
        // pntLeftLineX = this.controlPoints[0].x + this.arrowLength * Math.cos(angleLeftLine);
        // pntLeftLineY = this.controlPoints[0].y + this.arrowLength * Math.sin(angleLeftLine);
        // pntArrowLeft = new SuperMap.Geometry.Point(pntLeftLineX, pntLeftLineY);
        //
        // angleRightLine = lineAngle + halfArrowAngle;
        // pntRightLineX = this.controlPoints[0].x + this.arrowLength * Math.cos(angleRightLine);
        // pntRightLineY = this.controlPoints[0].y + this.arrowLength * Math.sin(angleRightLine);
        // pntArrowRight = new SuperMap.Geometry.Point(pntRightLineX, pntRightLineY);
        //
        // var ptsArrowStart = [];
        // ptsArrowStart.push(pntArrowLeft);
        // ptsArrowStart.push(this.controlPoints[0].clone());
        // ptsArrowStart.push(pntArrowRight);
        //
        // codeID = this.arrowTypeStart === 0 ? SuperMap.Plot.SymbolType.POLYLINESYMBOL : SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        // var geometryArrowStart = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(codeID, ptsArrowStart);
        // geometryArrowStart.style = {surroundLineFlag: false, fillLimit: true, lineTypeLimit:true};
        // if(this.arrowTypeStart !== 2){
        //     this.components.push(geometryArrowStart);
        // }
        //
        // var pntArrowLineStart = new SuperMap.Geometry.Point((pntLeftLineX + pntRightLineX) / 2, (pntLeftLineY + pntRightLineY) / 2);
        //
        // // 用校正后数据创建
        // var ptsArrowLine = [];
        // if(this.arrowTypeStart === 0 || this.arrowTypeStart === 2){
        //     ptsArrowLine.push(this.controlPoints[0].clone());
        // }else{
        //     ptsArrowLine.push(pntArrowLineStart);
        // }
        // if(this.arrowTypeEnd === 0 || this.arrowTypeEnd === 2){
        //     ptsArrowLine.push(this.controlPoints[1].clone());
        // }else{
        //     ptsArrowLine.push(pntArrowLineEnd);
        // }
        //
        // var geometryLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsArrowLine);
        // geometryLine.style = {surroundLineFlag: false};
        // this.components.push(geometryLine);
        // if(this.arrowTypeEnd !== 2){
        //     this.components.push(geometryArrowEnd);
        // }
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

            //var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            var dallDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            // var dBeizerDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
            // if(SuperMap.Plot.PlottingUtil.equalFuzzy(dallDistance,0.0) || SuperMap.Plot.PlottingUtil.equalFuzzy(dBeizerDistance,0.0))
            // {
            //     return;
            // }

            // if(2*(geoPts.length-1) == index || (geoPts.length == 2 && index == 0))
            // {
            //     var scalePt2D = pt;
            //     var pts = [], i;
            //     for(i = 0; i < shapePts.length; i++)
            //     {
            //         pts.push(shapePts[i]);
            //     }
            //
            //     var nCircleIndex = -1;
            //     var dDitanceCtoP = 0.0;
            //     var circleCenterPt;
            //
            //     for(i = 0; i < pts.length-1; i++)
            //     {
            //         var tempPts = [];
            //         tempPts.push(pts[i]);
            //         tempPts.push(pts[i+1]);
            //
            //         var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,pts[i],pts[i+1]);
            //
            //         var ptonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
            //         if(!ptonline.isOnPolyLine)
            //         {
            //             continue;
            //         }
            //
            //         var tempDistance = SuperMap.Plot.PlottingUtil.distance(scalePt2D,plumbPt);
            //
            //         if(-1 == nCircleIndex)
            //         {
            //             nCircleIndex = i;
            //             circleCenterPt = plumbPt;
            //             dDitanceCtoP = tempDistance;
            //         }
            //         else
            //         {
            //             if(dDitanceCtoP > tempDistance)
            //             {
            //                 nCircleIndex = i;
            //                 circleCenterPt = plumbPt;
            //                 dDitanceCtoP = tempDistance;
            //             }
            //         }
            //     }
            //
            //     if(-1 == nCircleIndex || nCircleIndex > pts.length-1)
            //     {
            //         return;
            //     }
            //
            //     var distance = 0.0;
            //     //计算圆心到起始点的距离
            //     for(i = 0; i < nCircleIndex; i++)
            //     {
            //         var pt1 = shapePts[i];
            //         var pt2 = shapePts[i+1];
            //         distance += SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
            //     }
            //
            //     var tempPt = shapePts[nCircleIndex];
            //     distance += SuperMap.Plot.PlottingUtil.distance(tempPt,circleCenterPt);
            //
            //     if(distance < 0 || distance > dBeizerDistance)
            //     {
            //         return;
            //     }
            //
            //     var dScaleValue = distance/dBeizerDistance;
            //
            //     //为了解决圆超出主线之后崩溃的问题，Add by XW
            //     if (dScaleValue > 0.9 || dScaleValue < 0.1)
            //     {
            //         return;
            //     }
            //     //为了解决圆超出主线之后崩溃的问题，Add by XW
            //
            //     if(geoPts.length == 2)
            //     {
            //         this.scaleValues[0] = dScaleValue;
            //     }
            //     else
            //     {
            //         this.scaleValues[2 * index] = dScaleValue;
            //     }
            // }
            // else if(2*geoPts.length-1 == index  || (geoPts.length == 2 && index == 1))
            // {
            //     var dlength = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[0]);
            //     var dscale = dlength*1.667/dallDistance;
            //
            //     if(geoPts.length == 2)
            //     {
            //         this.scaleValues[1] = dscale;
            //     }
            //     else
            //     {
            //         this.scaleValues[2*index-1] = dscale;
            //     }
            // }
            // else
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

    parseSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        // //自己特有
        // if(!!this.symbolData){
        //     this.arrowAngle = this.symbolData.arrowAngle;
        //     this.arrowLength = this.symbolData.arrowLength;
        //     this.arrowTypeEnd = this.symbolData.arrowTypeEnd;
        //     this.arrowTypeStart = this.symbolData.arrowTypeStart;
        // }
    },

    setSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        // // if(!!this.symbolData){
        // this.symbolData.arrowAngle = this.arrowAngle;
        // this.symbolData.arrowLength = this.arrowLength;
        // this.symbolData.arrowTypeEnd = this.arrowTypeEnd;
        // this.symbolData.arrowTypeStart = this.arrowTypeStart;
        // // }
    },

    reSample: function (pPoint2Ds, dTolerance) {
        var arrPoint2Ds = [];
        if (pPoint2Ds == null || dTolerance < 0.0)
        {
            return arrPoint2Ds;
        }

        var nCount = pPoint2Ds.length;
        if(nCount>2)
        {
            var pnt2D = new SuperMap.Geometry.Point(0.0, 0.0);
            var dAngle = 0.0, dDistance = 0.0;
            var dminAngle = 0.0, dmaxAngle = 2 * Math.PI;
            //var dminAngle = -PI/2, dmaxAngle = 2.5 * PI;
            pnt2D = pPoint2Ds[0];
            arrPoint2Ds.push(pnt2D);
            var bReSample = false;

            var bEditMinAngle = false;
            var bEditMaxAngle = false;
            for(var i=1;i<nCount;i++)
            {
                dDistance=Math.sqrt((pPoint2Ds[i].y-pnt2D.y)*(pPoint2Ds[i].y-pnt2D.y)
                    +(pPoint2Ds[i].x-pnt2D.x)*(pPoint2Ds[i].x-pnt2D.x));
                if(!SuperMap.Plot.PlottingUtil.equalFuzzy(0, dDistance))
                {
                    var cosa=(pPoint2Ds[i].x-pnt2D.x)/dDistance;
                    var sina=(pPoint2Ds[i].y-pnt2D.y)/dDistance;
                    if(sina>0 || SuperMap.Plot.PlottingUtil.equalFuzzy(0, sina))//在一二象限内（0<dAngle<PI）
                    {
                        dAngle=Math.acos(cosa);
                    }
                    else					 //在三四象限内（PI<dAngle<2PI）
                    {
                        dAngle=2*Math.PI-Math.acos(cosa);
                    }
                    //特殊情形处理一下（0<dAngle<2PI）,把dAngle调整到和dminAngle,dmaxAngel同一周期  by gengjing 2012-7-5
                    if (dmaxAngle>2*Math.PI && (dAngle+2*Math.PI)<dmaxAngle)//dAngle在第一象限
                    {
                        dAngle+=2*Math.PI;
                        if (dminAngle<0)
                        {
                            dminAngle+=2*Math.PI;
                        }
                    }

                    else if (dminAngle<0 && (dAngle-2*Math.PI)>dminAngle)//dAngle在第四象限
                    {
                        dAngle-=2*Math.PI;
                        if (dmaxAngle>2*Math.PI)
                        {
                            dmaxAngle-=2*Math.PI;
                        }
                    }

                    //在角度范围内；
                    if((dAngle>dminAngle && dAngle<dmaxAngle) ||
                        SuperMap.Plot.PlottingUtil.equalFuzzy(0, dAngle-dminAngle) || SuperMap.Plot.PlottingUtil.equalFuzzy(0, dAngle-dmaxAngle) )
                    {
                        //(-PI/2<dAngleTmp<PI/2)====>>(-PI/2<dminAngle,dmaxAngle<5/2PI)
                        var dAngleTmp = Math.atan(dTolerance/dDistance);
                        if(!bEditMinAngle)
                        {
                            bEditMinAngle = true;
                            dminAngle = dAngle-dAngleTmp;
                        }
                        else
                        {
                            if(dminAngle < dAngle - dAngleTmp)
                            {
                                dminAngle = dAngle - dAngleTmp;
                            }
                        }
                        if(!bEditMaxAngle)
                        {
                            bEditMaxAngle = true;
                            dmaxAngle = dAngle + dAngleTmp;
                        }
                        else
                        {
                            if(dmaxAngle > dAngle + dAngleTmp)
                            {
                                dmaxAngle = dAngle + dAngleTmp;
                            }
                        }

                        bReSample = true;
                    }
                    else
                    {
                        pnt2D = pPoint2Ds[i-1];
                        i--;
                        arrPoint2Ds.push(pnt2D);
                        //dminAngle = -PI/2;
                        //dmaxAngle = 2.5*PI;
                        dminAngle = 0.0;
                        dmaxAngle = 2*Math.PI;
                        bReSample = false;
                        bEditMinAngle = false;
                        bEditMaxAngle = false;
                    }
                }
                else if(bReSample)
                {
                    pnt2D = pPoint2Ds[i-1];
                    i--;
                    arrPoint2Ds.push(pnt2D);
                    //dminAngle = -PI/2;
                    //dmaxAngle = 2.5*PI;
                    dminAngle = 0.0;
                    dmaxAngle = 2*Math.PI;
                    bReSample = false;
                    bEditMinAngle = false;
                    bEditMaxAngle = false;
                }
            }
            arrPoint2Ds.push(pPoint2Ds[nCount-1]);
            // if(arrPoint2Ds.length === nCount)
            // {
            //     arrPoint2Ds = [];
            //     return arrPoint2Ds;
            // }

            return arrPoint2Ds;
        }
        return arrPoint2Ds;
    },

    reSampleByAngle: function (pPoints, dTolerAngle) {
        var pPointsRes = [];
        var dTolerDist = 1e-10;
        var nCount = pPoints.length;
        //有效性
        if ((pPoints == null) || (nCount <= 0) || (dTolerAngle <= 0))
        {
            return pPointsRes;
        }
        var pPointsSrc = pPoints;
        var nCountSrc		 = nCount;

        //区分Region和Line;首尾重合的Line和Region一样处理
        var bIsRegion = false;
        while (SuperMap.Plot.PlottingUtil.equalFuzzy(pPointsSrc[0].x, pPointsSrc[nCountSrc-1].x) &&
                SuperMap.Plot.PlottingUtil.equalFuzzy(pPointsSrc[0].y, pPointsSrc[nCountSrc-1].y))
        {
            nCountSrc -= 1;
            if (nCountSrc <= 0)return pPointsRes;
            bIsRegion  = true;
        }

        var pID = [];

        var i,j;
        for(i = 0; i < nCountSrc; i++){
            pID.push(0);
        }

        pID[0] = 1;
        pID[nCountSrc-1] = 1;
        j=0;
        for (i=1; i < nCountSrc-1; i++)
        {
            if ((SuperMap.Plot.PlottingUtil.distance(pPointsSrc[j],pPointsSrc[i]) > dTolerDist) &&
                (SuperMap.Plot.PlottingUtil.distance(pPointsSrc[j],pPointsSrc[i+1]) > dTolerDist))
            {
                var dAngle = SuperMap.Plot.PlottingUtil.InnerAngle(pPointsSrc[i],pPointsSrc[j],pPointsSrc[i+1]) * 180 / Math.PI ;
                if ((dAngle>dTolerAngle) && (dAngle<180-dTolerAngle))
                {//保留
                    pID[i] = 1;
                    j++;
                }
            }
        }

        var nCountRes = 0;
        for (i=0; i < nCountSrc; i++)
        {
            if (pID[i] == 1)
            {
                nCountRes++;
            }
        }

        if (nCountRes > 0)
        {
            if (bIsRegion)
            {
                nCountRes++;
            }

            pPointsRes = [];

            j=0;
            for (i=0; i < nCountSrc; i++)
            {
                if (pID[i] == 1)
                {
                    pPointsRes[j++] = pPointsSrc[i];
                }
            }

            if (bIsRegion)
            {
                pPointsRes[j] = pPointsRes[0];
            }

            return pPointsRes;
        }

        return pPointsRes;
    },

    CLASS_NAME: "SuperMap.Geometry.FreeCurve"
});

