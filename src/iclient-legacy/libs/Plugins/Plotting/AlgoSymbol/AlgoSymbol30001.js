/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30001 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts) {
            return;
        }
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        if(!this.isEdit){
            var dScale = this.getDefaultSubSymbolSize()/allDistance;
            if(dScale > 0.2 || dScale <= 0){
                dScale = 0.2;
            }

            this.scaleValues[2] = dScale;
            this.scaleValues[4] = dScale;
        }

        //求开始点到中点的距离
        var dArrowdis = allDistance * this.scaleValues[0];//箭头的位置距离
        var scaleAngle = this.scaleValues[1] * 180 / Math.PI;//箭头的角度
        var dArrowLength = allDistance * this.scaleValues[2];//箭头的大小

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

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(centerPt,pt) * 180 / Math.PI;

        //箭头三角形
        var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(pt,0.1 * dArrowLength,0.1 * dArrowLength,tempAngle - 157.5);
        var tempPt2 = SuperMap.Plot.PlottingUtil.circlePoint(pt,0.1 * dArrowLength,0.1 * dArrowLength,tempAngle + 157.5);
        var style = {surroundLineFlag: false, fillLimit: true, fillColorLimit: false, fillStyle: 0};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, [pt, tempPt1, tempPt2], style);

        //添加三根线
        //最下面一条横线
        var PtLineLow = new SuperMap.Geometry.Point(0.4*dArrowLength,0);
        var PtLineLowCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(centerPt,PtLineLow,tempAngle);
        //两边的点的位置
        var pt3 = new SuperMap.Geometry.Point(0, 0.1*dArrowLength);
        var pt4 = new SuperMap.Geometry.Point(0,  -0.1*dArrowLength);
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(PtLineLowCenter,pt3,tempAngle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(PtLineLowCenter,pt4,tempAngle);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,[tempPt3,tempPt4]);

        //中间一条横线
        var PtLineMid = new SuperMap.Geometry.Point(0.5*dArrowLength,0);
        var PtLineMidCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(centerPt,PtLineMid,tempAngle);
        var ptMid3 = new SuperMap.Geometry.Point(0, 0.1*dArrowLength);
        var ptMid4 = new SuperMap.Geometry.Point(0,  -0.1*dArrowLength);
        var tempPtMid3 = SuperMap.Plot.PlottingUtil.coordinateTrans(PtLineMidCenter,ptMid3,tempAngle);
        var tempPtMid4 = SuperMap.Plot.PlottingUtil.coordinateTrans(PtLineMidCenter,ptMid4,tempAngle);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,[tempPtMid3,tempPtMid4]);

        //上面一条横线
        var PtLineUp = new SuperMap.Geometry.Point(0.6*dArrowLength,0);
        var PtLineUpCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(centerPt,PtLineUp,tempAngle);
        var ptUp3 = new SuperMap.Geometry.Point(0, 0.1*dArrowLength);
        var ptUp4 = new SuperMap.Geometry.Point(0,  -0.1*dArrowLength);
        var tempPtUp3 = SuperMap.Plot.PlottingUtil.coordinateTrans(PtLineUpCenter,ptUp3,tempAngle);
        var tempPtUp4 = SuperMap.Plot.PlottingUtil.coordinateTrans(PtLineUpCenter,ptUp4,tempAngle);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,[tempPtUp3,tempPtUp4]);

        /////////////////////
        //菱形大小
        var dRecSize = allDistance * this.scaleValues[4];
        var subSymbolSize = 4 * dRecSize * Math.sin(Math.PI/8);

        //左菱形
        var leftDiamondPts = this.getLeftSubSymbolPts(subSymbolSize);

        var startPt = shapePts[0].clone();
        var leftIndex = -1;
        var leftDiamondPt = null;
        for(var i = 1; i < shapePts.length; i++){
            if(SuperMap.Plot.PlottingUtil.distance(startPt,shapePts[i]) > 0.5*subSymbolSize){
                leftIndex = i-1;
                leftDiamondPt = SuperMap.Plot.PlottingUtil.LinePnt(startPt,shapePts[i],0.5*subSymbolSize);
                break;
            }
        }

        if(-1 === leftIndex){
            leftIndex = shapePts.length-1;
            leftDiamondPt = shapePts[shapePts.length-1];
        }

        var subSymbolScalePt = null;
        if(null !== leftDiamondPt){
            var leftDiamondAngle = SuperMap.Plot.PlottingUtil.radian(startPt, leftDiamondPt)*180/Math.PI;

            var leftSubSymbolPts = [];
            for(var i = 0; i < leftDiamondPts.length; i++){
                leftSubSymbolPts.push(SuperMap.Plot.PlottingUtil.coordinateTrans(startPt, leftDiamondPts[i],leftDiamondAngle));
            }
            subSymbolScalePt = leftSubSymbolPts[3].clone();

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftSubSymbolPts);
        }

        //右菱形
        var rightDiamondPts = this.getRightSubSymbolPts(subSymbolSize);

        var endPt = shapePts[shapePts.length-1].clone();
        var rightIndex = -1;
        var rightDiamondPt = null;
        for(var i = shapePts.length-2; i >=0 ; i--){
            if(SuperMap.Plot.PlottingUtil.distance(endPt,shapePts[i]) > 0.5*subSymbolSize){
                rightIndex = i;
                rightDiamondPt = SuperMap.Plot.PlottingUtil.LinePnt(endPt,shapePts[i],0.5*subSymbolSize);
                break;
            }
        }

        if(-1 === rightIndex){
            rightIndex = 0;
            rightDiamondPt = shapePts[0];
        }

        if(null !== rightDiamondPt){
            var rightDiamondAngle = SuperMap.Plot.PlottingUtil.radian(endPt, rightDiamondPt)*180/Math.PI;

            var rightSubSymbolPts = [];
            for(var i = 0; i < rightDiamondPts.length; i++){
                rightSubSymbolPts.push(SuperMap.Plot.PlottingUtil.coordinateTrans(endPt, rightDiamondPts[i],rightDiamondAngle));
            }

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightSubSymbolPts);
        }

        if(leftIndex <= rightIndex){
            var linePts = [];

            linePts.push(leftDiamondPt);
            for(var i = leftIndex+1; i <= rightIndex; i++){
                linePts.push(shapePts[i]);
            }
            linePts.push(rightDiamondPt);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts);
        }

        this.addScalePoint(centerPt);
        this.addScalePoint(pt);
        if(null !== subSymbolScalePt){
            this.addScalePoint(subSymbolScalePt);
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
        if (pt.isScalePoint === true) {
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            if (index === 0) {
                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0, 0.0);

                for (var i = 0; i < shapePts.length - 1; i++) {
                    var tempPts = [];
                    tempPts.push(shapePts[i]);
                    tempPts.push(shapePts[i + 1]);

                    //垂足
                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, shapePts[i], shapePts[i + 1]);

                    var resultPt = SuperMap.Plot.PlottingUtil.projectPtOnPolyLine(plumbPt, tempPts);
                    if (resultPt.index === -1) {
                        continue;
                    }

                    var tempDistance = SuperMap.Plot.PlottingUtil.distance(pt, plumbPt);
                    if(isNaN(tempDistance)){
                        continue;
                    }

                    if (-1 == nCircleIndex) {
                        nCircleIndex = i;
                        circleCenterPt = plumbPt;
                        dDitanceCtoP = tempDistance;
                    }
                    else {
                        if (dDitanceCtoP > tempDistance) {
                            nCircleIndex = i;
                            circleCenterPt = plumbPt;
                            dDitanceCtoP = tempDistance;
                        }
                    }
                }

                if (-1 === nCircleIndex || nCircleIndex > shapePts.length - 1) {
                    return;
                }
                var distance = 0.0;
                //计算圆心到起始点的距离
                for (var i = 0; i < nCircleIndex; i++) {
                    distance += SuperMap.Plot.PlottingUtil.distance(shapePts[i], shapePts[i + 1]);
                }

                distance += SuperMap.Plot.PlottingUtil.distance(shapePts[nCircleIndex], circleCenterPt);

                if (distance < 0 || distance > allDistance) {
                    return;
                }

                var dScaleValue = distance / allDistance;
                this.scaleValues[0] = dScaleValue;
            }
            else if (index === 1) {
                var dDistance = allDistance * this.scaleValues[0];
                //箭头直线
                var centerPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dDistance);
                if (centerPt.index === -1) {
                    return;
                }

                //中心点的开始
                var center2D = centerPt.pt;
                var ptStart = shapePts[centerPt.index];
                var ptEnd = shapePts[centerPt.index + 1];
                var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd);
                var tempAngle = SuperMap.Plot.PlottingUtil.radian(center2D, pt);

                var dScale1 = tempAngle - angle;
                this.scaleValues[1] = dScale1;

                var distance = SuperMap.Plot.PlottingUtil.distance(center2D, pt);
                var dScale2 = distance / allDistance;
                this.scaleValues[2] = dScale2;
            }
            else if (index === 2) {
                var ddis = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[0]);
                var dscale = ddis / allDistance;
                if(dscale > 0.35){
                    dscale = 0.35;
                }
                this.scaleValues[4] = dscale;
            }
        }
        this.calculateParts();
    },

    /**
     * Method: getLeftSubSymbolPts
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array(<SuperMap.Geometry.Point>)} 子标号位置点
     *
     */
    getLeftSubSymbolPts: function(symbolSize){

        var d = symbolSize*0.25;

        var subSymbolPts = [];
        var diamondPt1 = new SuperMap.Geometry.Point(0,0);
        var diamondPt2 = new SuperMap.Geometry.Point(d,-2*d);
        var diamondPt3 = new SuperMap.Geometry.Point(2*d,0);
        var diamondPt4 = new SuperMap.Geometry.Point(d,2*d);

        subSymbolPts.push(diamondPt1);
        subSymbolPts.push(diamondPt2);
        subSymbolPts.push(diamondPt3);
        subSymbolPts.push(diamondPt4);
        subSymbolPts.push(diamondPt1);

        return subSymbolPts;
    },

    /**
     * Method: getLeftSubSymbolPts
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array(<SuperMap.Geometry.Point>)} 子标号位置点
     *
     */
    getRightSubSymbolPts: function(symbolSize){
        return this.getLeftSubSymbolPts(symbolSize);
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30001"
});
