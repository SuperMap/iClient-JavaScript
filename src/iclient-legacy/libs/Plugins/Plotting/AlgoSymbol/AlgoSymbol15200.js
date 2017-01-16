/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol15200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.1);

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
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //贝塞尔拟合点的总长
        var dBeizerDistance = 0;
        for (var i = 0,len = shapePts.length - 1; i < len; i++) {
            dBeizerDistance += SuperMap.Plot.PlottingUtil.distance(shapePts[i], shapePts[i + 1]);
        }

        //定位点连线总长
        var allDistance = 0;
        for (var j = 0,len = geoPts.length - 1; j <len; j++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[j], geoPts[j + 1]);
        }

        //绘制时控制子标号大小的比例
        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue()*0.5;
        }

        //第0个比例值是曲线上小线段的长度/各定位点间折线总长
        var firstScaleValue = this.scaleValues[0];
        //折线段长度
        var dlineLength = firstScaleValue * allDistance;
        //第1个比例值是短线方向，0表示线左侧，1表示线右侧
        var DirectionScaleValue = this.scaleValues[1];
        //第2个比例值是两大折线段之间的距离／各定位点间折线总长
        var secondScaleValue = this.scaleValues[2];
        //两大折线段之间的距离
        var dLineDistance = secondScaleValue * allDistance;
        //两个小短线之间的距离
        var dLindis = dLineDistance* 0.3;

        //比例点
        for(var d = dLineDistance; d < parseInt(dBeizerDistance); d += dLineDistance){
            //第一条折线的点距离曲线起始点的长度
            var firstMidPt = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(d, shapePts);
            if(-1 === firstMidPt.index){
                return;
            }

            //第二条折线的点距离曲线起始点的长度
            var dsecdis = d + dLindis;
            var secMidPt = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dsecdis,shapePts );
            if(-1 === secMidPt.index){
                return;
            }

            //折线段的几何点数组
            var firstLinePts = [];
            var secondLinePts = [];
            firstLinePts.push(firstMidPt.pts);

            //第一条线
            var rightAndLeftPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlineLength,shapePts[firstMidPt.index],firstMidPt.pts);
            //如果方向的比例值是0 的情况下在左边
            if(0.0 === DirectionScaleValue) {
                firstLinePts.push(new SuperMap.Geometry.Point(rightAndLeftPt1.pntLeft.x,rightAndLeftPt1.pntLeft.y));
            } else {
                firstLinePts.push(new SuperMap.Geometry.Point(rightAndLeftPt1.pntRight.x,rightAndLeftPt1.pntRight.y));
            }
            secondLinePts.push(secMidPt.pts);

            //第二跳线
            var rightAndLeftPt2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlineLength,shapePts[secMidPt.index],secMidPt.pts);

            if(0.0 === DirectionScaleValue) {
                secondLinePts.push(new SuperMap.Geometry.Point(rightAndLeftPt2.pntLeft.x,rightAndLeftPt2.pntLeft.y));
            } else {
                secondLinePts.push(new SuperMap.Geometry.Point(rightAndLeftPt2.pntRight.x,rightAndLeftPt2.pntRight.y));
            }

                if(dLineDistance === d)
                {
                    //添加第一个比例点
                    this.scalePoints = [];
                    var scalePoint = new SuperMap.Geometry.Point(firstLinePts[1].x, firstLinePts[1].y);
                    scalePoint.isScalePoint = true;
                    scalePoint.tag = 0;
                    this.scalePoints.push(scalePoint);

                    //添加第二个比例点
                    //第二份比例点
                    scalePoint = new SuperMap.Geometry.Point(firstLinePts[0].x, firstLinePts[0].y);
                    scalePoint.isScalePoint = true;
                    scalePoint.tag = 1;
                    this.scalePoints.push(scalePoint);
                }
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstLinePts);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondLinePts);
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

        if(this.controlPoints.length < this.minEditPts){
            return;
        }
        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            //定位点连线总长
            var allDistance = 0;
            for (var j = 0, len = geoPts.length - 1; j < len; j++) {
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[j], geoPts[j + 1]);
            }
             var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            var scalePt2D = new SuperMap.Geometry.Point(pt.x, pt.y);
                //第一个比例点
                if (0 === index) {
                    //第二个缩放点
                    var firstScalePoints = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, allDistance * this.scaleValues[2]);
                    if (-1 === firstScalePoints.index) {
                        return;
                    }

                    var dScaleDis = SuperMap.Plot.PlottingUtil.distance(firstScalePoints.pt, scalePt2D);
                    var dScale0 = dScaleDis / allDistance;
                    //TRUE表示在直线右边,FALSE表示在直线左边
                    var bRight = SuperMap.Plot.PlottingUtil.PointIsRightToLine(shapePts[0], shapePts[1], pt);
                    if (bRight) {
                        this.scaleValues[1] = 1.0;
                    } else {
                        this.scaleValues[1] = 0.0;
                    }
                    this.scaleValues[0] = dScale0;
                }
                //第二个比例点
                else if (1 === index) {
                    var dMindis = 0.0;
                    var nindex = -1;
                    var ptPlumb = [];
                    for (var i = 0, len = (shapePts.length - 1); i < len ; i++) {

                        var projectPtInfo = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, shapePts[i], shapePts[i + 1]);
                        if (projectPtInfo.isOnline)//垂足在线上
                        {
                            var ddis = SuperMap.Plot.PlottingUtil.distance(projectPtInfo.projectPoint, this.controlPoints[1]);

                            if (dMindis == 0.0) {
                                dMindis = ddis;
                                nindex = i;
                                ptPlumb = pt;
                            }
                            else {
                                if (ddis < dMindis)//求最短的那条垂线
                                {
                                    dMindis = ddis;
                                    nindex = i;
                                    ptPlumb = pt;
                                }
                            }
                        }
                    }

                    if (nindex == -1) {
                        return;
                    }

                    var dalllen = 0.0;
                    for (var i = 0, len =  nindex - 1; i < len; i++) {
                        dalllen += SuperMap.Plot.PlottingUtil.distance(shapePts[i], shapePts[i + 1]);
                    }

                    dalllen += SuperMap.Plot.PlottingUtil.distance(ptPlumb, shapePts[nindex]);

                    var dscale = dalllen / allDistance;

                    this.scaleValues[2] = dscale;
                }

        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol15200"
});