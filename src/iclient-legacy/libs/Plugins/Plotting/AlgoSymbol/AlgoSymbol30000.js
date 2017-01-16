/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30000 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.5);		//从第一定位点到线上箭头的曲线距离/曲线总长
        this.scaleValues.push(Math.PI / 2.0);	//箭头线段与它在曲线上基底位置的切线组成的夹角（弧度）
        this.scaleValues.push(0.2);		//箭头线段的长度/曲线总长。
        this.scaleValues.push(0.5);		//线上符号的中心到线上箭头的曲线距离/曲线总长。
        this.scaleValues.push(0.05);	//线上符号的大小/曲线总长。
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

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //求开始点到中点的距离
        var centerDis = allDistance * 0.5;

        var dArrowdis = allDistance * this.scaleValues[0];//箭头的位置距离
        var scaleAngle = this.scaleValues[1] * 180 / Math.PI;//箭头的角度

        if(!this.isEdit){
            var scale = this.getSubSymbolScaleValue();
            this.scaleValues[2] = scale;
        }

        var dScale2 = this.scaleValues[2];

        var dArrowLength = allDistance * dScale2;//箭头的大小

        //获取折线的中心点
        var resultPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dArrowdis);
        if (resultPt.index === -1) {
            return;
        }
        var centerPt = resultPt.pt;
        var lineStratPt = new SuperMap.Geometry.Point(shapePts[resultPt.index].x, shapePts[resultPt.index].y);
        var lineEndPt = new SuperMap.Geometry.Point(shapePts[resultPt.index + 1].x, shapePts[resultPt.index + 1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(lineStratPt, lineEndPt) * 180 / Math.PI;
        //箭头点
        var pt = SuperMap.Plot.PlottingUtil.circlePoint(centerPt, dArrowLength, dArrowLength, angle + scaleAngle);
        //添加折线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [centerPt, pt]);
        var tempAngle = SuperMap.Plot.PlottingUtil.radian(centerPt, pt) * 180 / Math.PI;
        //箭头三角形
        var pt1 = new SuperMap.Geometry.Point(-0.2 * dArrowLength, 0.05 * dArrowLength);
        var pt2 = new SuperMap.Geometry.Point(-0.2 * dArrowLength, -0.05 * dArrowLength);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt1, tempAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(pt, pt2, tempAngle);

        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt, tempPt1, tempPt2], style);
        //添加比例点
        if(this.isEdit){
            this.addScalePoint(centerPt,0);
            this.addScalePoint(pt,1);
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

        if(true === pt.isScalePoint){
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            if(index === 0){
                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0,0.0);

                for(var i = 0; i < shapePts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(shapePts[i]);
                    tempPts.push(shapePts[i+1]);

                    //垂足
                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(pt,shapePts[i],shapePts[i+1]);

                    var resultPt = SuperMap.Plot.PlottingUtil.projectPtOnPolyLine (plumbPt,tempPts);
                    if(resultPt.index === -1)
                    {
                        continue;
                    }

                    var tempDistance =SuperMap.Plot.PlottingUtil.distance(pt,plumbPt);

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

                if(-1 == nCircleIndex || nCircleIndex > shapePts.length-1)
                {
                    return;
                }
                var distance = 0.0;
                //计算圆心到起始点的距离
                for(var i = 0; i < nCircleIndex; i++)
                {
                    distance += SuperMap.Plot.PlottingUtil.distance(shapePts[i],shapePts[i+1]);
                }

                distance += SuperMap.Plot.PlottingUtil.distance(shapePts[nCircleIndex],circleCenterPt);

                if(distance < 0 || distance > allDistance)
                {
                    return;
                }

                var dScaleValue = distance/allDistance;
                this.scaleValues[0] = dScaleValue;
            }
            else if(index === 1){
                var dDistance = allDistance * this.scaleValues[0];
                //箭头直线
                var centerPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,dDistance);
                if(centerPt.index === -1)
                {
                    return;
                }

                //中心点的开始
                var center2D = centerPt.pt;
                var ptStart = shapePts[centerPt.index];
                var ptEnd = shapePts[centerPt.index+1];
                var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd);
                var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D,pt);

                var dScale1 = tempAngle-angle;
                this.scaleValues[1] = dScale1;

                var distance = SuperMap.Plot.PlottingUtil.distance(center2D,pt);
                var dScale2 = distance / allDistance;
                this.scaleValues[2] = dScale2;
            }
        }

        this.calculateParts();
    },
    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30000"
});
