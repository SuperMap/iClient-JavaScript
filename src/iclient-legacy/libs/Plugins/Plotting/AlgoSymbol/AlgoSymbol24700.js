/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol24700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues.push(0.1);
        this.scaleValues.push(0.025);
        this.scaleValues.push(0);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = this.GetGoPts();
        if(geoPts.length == 0){
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues = [];
            this.scaleValues.push(0.1);
            this.scaleValues.push(0.025);
            this.scaleValues.push(0.0);
        }

        //创建贝塞尔曲线
        var allPoints, shapePts;
        shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        var midPt = new SuperMap.Geometry.Point(0,0);
        var index = -1;
        //第0个比例值是曲线上小三角的间隔/曲线总长
        var firstScaleValue = this.scaleValues[0];

        //计算位置点折线段总长
        var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //小三角的间隔
        var lineLength = firstScaleValue * allPolyLineDistance;

        //第1个比例值是两端短线长度的一半/曲线总长
        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }
        var secondScaleValue = this.scaleValues[1];

        //三角的高度
        var dLineDistance = secondScaleValue * SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var firstLineDistance = 0.0;     //第一条折线和第二条折线距离起点的距离

        //每个小线段之间的间隔
        var dSpaceLength = 0.3 * lineLength;

        var cells = this.ComputeDashLine(3*allPolyLineDistance/19, allPolyLineDistance/19, shapePts);

        //头部的短线
        var ptQD = shapePts[1].clone();
        var ptZD = shapePts[0].clone();

        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLineDistance, ptQD, ptZD);
        var RightPt = sidepoint.pntRight;
        var LeftPt = sidepoint.pntLeft;

        var LinetPts = [];
        LinetPts.push(LeftPt.clone());
        LinetPts.push(RightPt.clone());


        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, LinetPts);

        var dSmallLen = dSpaceLength * 3;
        var ptStart = shapePts[0].clone();
        var pos = 0;
        for(var d = 0.0; d <= allPolyLineDistance; d += dSmallLen){
            //计算曲线上小线段的长度
            firstLineDistance = d + dSpaceLength * 2;
            var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(firstLineDistance, shapePts);
            if(!ptsindex.bfind){
                continue;
            }

            index = ptsindex.index;
            midPt = ptsindex.pts;

            if(ptsindex.index >= shapePts.length){
                break;
            }

            var LinePts = [];
            LinePts.push(ptStart.clone());
            LinePts.push(midPt.clone());

            //创建折线图元
            //this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, LinetPts);

            if(d == 0.00){
                var scalepnt1 = midPt.clone();
                scalepnt1.isScalePoint = true;
                scalepnt1.tag = 0;
                this.scalePoints.push(scalepnt1);
                var scalepnt2 = RightPt.clone();
                scalepnt2.isScalePoint = true;
                scalepnt2.tag = 1;
                this.scalePoints.push(scalepnt2);
            }

            var thirdScaleValue = this.scaleValues[2];

            if(thirdScaleValue == 0.0){//朝外
                //求线段的中点
                var ptCenter = new SuperMap.Geometry.Point((ptStart.x + midPt.x)/2, (ptStart.y + midPt.y)/2);
                var ptBegin = ptStart.clone();
                var ptEnd = ptCenter.clone();
                var ptZD = midPt.clone();

                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLineDistance, ptBegin, ptEnd);
                var ptNouse = sidepoint.pntRight;
                var ptLeft = sidepoint.pntLeft;

                var ptDing1 = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, ptBegin, (dLineDistance * 0.3));
                var ptDing2 = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, ptZD, (dLineDistance * 0.3));

                if(d == 0.0){
                    var scalepnt3 = ptLeft.clone();
                    scalepnt3.isScalePoint = true;
                    scalepnt3.tag = 2;
                    this.scalePoints.push(scalepnt3);
                }

                var RectPts = [];
                RectPts.push(ptLeft.clone());
                RectPts.push(ptDing1.clone());
                RectPts.push(ptDing2.clone());

                //创建折线图元
                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, RectPts, null, true);
            }
            else {//朝里
                //求线段的中点
                var ptCenter = new SuperMap.Geometry.Point((ptStart.x + midPt.x)/2, (ptStart.y + midPt.y)/2);
                var ptBegin = ptStart.clone();
                var ptEnd = ptCenter.clone();
                var ptZD = midPt.clone();

                sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLineDistance, ptBegin, ptEnd);
                var ptNouse = sidepoint.pntLeft;
                var ptRight = sidepoint.pntRight;

                var ptDing1 = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, ptBegin, (dSpaceLength * 0.3));
                var ptDing2 = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter, ptZD, (dSpaceLength * 0.3));

                if(d == 0.0){
                    var scalepnt3 = ptRight.clone();
                    scalepnt3.isScalePoint = true;
                    scalepnt3.tag = 2;
                    this.scalePoints.push(scalepnt3);
                }

                var RectPts = [];
                RectPts.push(ptRight.clone());
                RectPts.push(ptDing1.clone());
                RectPts.push(ptDing2.clone());

                //创建折线图元
                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, RectPts, null, true);
            }

            firstLineDistance = d + dSpaceLength*3;
            ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(firstLineDistance, shapePts);
            if(!ptsindex.bfind){
                continue;
            }

            index = ptsindex.index;
            midPt = ptsindex.pts;
            if(!(ptsindex.index < shapePts.length)){
                break;
            }
            pos = index;
            ptStart = midPt;
        }

        //尾部的短线
        ptQD = shapePts[shapePts.length - 2].clone();
        ptZD = shapePts[shapePts.length - 1].clone();

        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLineDistance, ptQD, ptZD);
        LinetPts = [];
        LinetPts.push(sidepoint.pntLeft.clone());
        LinetPts.push(sidepoint.pntRight.clone());


        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, LinetPts);

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
    modifyPoint: function(pindex, posPt) {
        if(posPt.isScalePoint === true){
            if((0 != pindex) && (1 != pindex) && (2 != pindex)) {
                return;//索引值非0或者非1，则直接返回false
            }
            var geoPts = this.GetGoPts();
            var allPoints, shapePts;
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            //计算位置点折线段总长
            var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
            var scalePt2D = posPt.clone();
            var headPt2D = shapePts[0].clone();
            if(pindex == 0){
                var ddis = SuperMap.Plot.PlottingUtil.distance(scalePt2D, headPt2D);
                var dscale = (ddis/0.6)/allPolyLineDistance;
                this.scaleValues[0] = dscale;
            }
            else if(pindex == 1){
                var ddis =  SuperMap.Plot.PlottingUtil.distance(scalePt2D, headPt2D);
                var dscale = ddis/allPolyLineDistance;
                this.scaleValues[1] = dscale;
            }
            else  if(pindex == 2){
                //第0个比例值是曲线上小线段的长度/各定位点间折线总长
                var firstScaleValue = this.scaleValues[0];

                //折线段长度
                var lineLength = firstScaleValue * allPolyLineDistance;

                //起始段长度
                var dStartLength = 0.01 * allPolyLineDistance;
                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dStartLength, shapePts);
                if(!ptsindex.bfind){
                    return;
                }

                var index = ptsindex.index;
                midPt = ptsindex.pts.clone();
                if(!(ptsindex.index < shapePts.length)){
                    return;
                }

                //折线段的终点
                //根据平面类型来取出二维点
                var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, shapePts[index], midPt);
                var firstLinePt = sidepoint.pntLeft.clone();

                //求此点到图元几何点线段的垂足
                var footPt = SuperMap.Plot.PlottingUtil.projectPoint(posPt, firstLinePt, midPt);

                //更新第三个比例值
                if(((firstLinePt.x - midPt.x) * (footPt.x - midPt.x) + (firstLinePt.y - midPt.y) * (footPt.y - midPt.y)) >= 0){
                    this.scaleValues[2] = 0.0;//如果点乘大于或者等于0，则说明在同向
                }
                else {
                    this.scaleValues[2] = 1.0;//如果小于0，说明在反向
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

    ComputeDashLine: function (linedis,dashlinedis,shapepts) {
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapepts);

        var tempShapePts = SuperMap.Plot.PlottingUtil.clonePoints(shapepts);
        var stepDis = allDistance / 9;
        for(var i = 0; i < 9; i++){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(tempShapePts, stepDis);
            if(-1 === result.index){
                continue;
            }

            if(0 === i%2){
                var pts = [];
                for(var m = 0; m < result.index+1; m++){
                    pts.push(tempShapePts[m].clone());
                }
                pts.push(result.pt);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts);
            }

            var tempPts = [];
            tempPts.push(result.pt);
            for(var k = result.index+1; k < tempShapePts.length; k++){
                tempPts.push(tempShapePts[k]);
            }

            tempShapePts = [];
            tempShapePts = tempShapePts.concat(tempPts);
        }

        if(tempShapePts.length > 1){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,tempShapePts);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol24700"
})