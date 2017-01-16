/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol15806 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

    RATIO_RIGHTPTONBEZIER : 0.8,
    RATIO_SECONDPTONBEZIER: 0.6,
    DEFAULT_SECONDSCALEVALUE: 0.05,

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
        this.maxEditPts = 1000;

        this.scaleValues.push(0.06);
        this.scaleValues.push(1);
        this.scaleValues.push(0.1);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if( this.controlPoints.length >= this.minEditPts) {
            this.scalePoints = [];

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

            var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            var shapePts = allPoints;

            //清理重复的点
            SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

            //第0个比例值是折线高度的一半/各定位点间折线总长
            var firstScaleValue = this.scaleValues[0];

            var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            //折线高度的一半
            var dHalfLine = firstScaleValue * allPolyLineDistance;
            var dSecondHalfLine = dHalfLine * this.RATIO_SECONDPTONBEZIER;

            //第2个比例值是折线间隔/各定位点间折线总长
            var thirdScaleValue = this.scaleValues[2];
            //折线间隔距离的距离
            var dLineInterval = thirdScaleValue * allPolyLineDistance;

            //第一个比例值是折线方向，左侧为0，右侧为1
            var secondScaleValue = this.scaleValues[1];
            //判定方向
            var bLeft = (0 === secondScaleValue);

            var dcurrToStart = 0.0;     //当前点距离起点的距离
            var dAllLength = SuperMap.Plot.PlottingUtil.polylineDistance(allPoints);

            if (dAllLength === 0.0)
            {
                return;
            }

            var midPt;
            var index = -1;
            var lx = 0.0, ly = 0.0, rx = 0.0, ry = 0.0;
            var mainBezierPts = [];

            for(var d = 0.0; d <= dAllLength; d += dLineInterval){
                //求贝塞尔折线段上距离起点为d的点
                var pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d);
                if(pntPathTextStart.index < 0){
                    continue;
                }
                var sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dHalfLine, shapePts[pntPathTextStart.index + 1], pntPathTextStart.pt);

                //添加贝塞尔曲线的第一个点
                if(bLeft){
                    mainBezierPts.push(sidepoints.pntRight);
                }else {
                    mainBezierPts.push(sidepoints.pntLeft);
                }

                //计算第二个点
                pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d + dLineInterval * ( 0.5 + (this.RATIO_RIGHTPTONBEZIER - 0.5) * 0.5));
                if(pntPathTextStart.index < 0){
                    continue;
                }
                sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dSecondHalfLine, shapePts[pntPathTextStart.index + 1], pntPathTextStart.pt);
                if(bLeft){
                    mainBezierPts.push(sidepoints.pntRight);
                }else {
                    mainBezierPts.push(sidepoints.pntLeft);
                }

                //计算第三个点
                pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d + dLineInterval * this.RATIO_RIGHTPTONBEZIER);
                if(pntPathTextStart.index < 0){
                    continue;
                }
                //添加第三个点
                mainBezierPts.push(pntPathTextStart.pt);

                //计算第四个点
                pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d + dLineInterval * 0.5);
                if(pntPathTextStart.index < 0){
                    continue;
                }
                sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dHalfLine, shapePts[pntPathTextStart.index + 1], pntPathTextStart.pt);
                if(bLeft){
                    mainBezierPts.push(sidepoints.pntLeft);
                }else {
                    mainBezierPts.push(sidepoints.pntRight);
                }

                //计算第五个点
                pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d + dLineInterval * (1.0 - this.RATIO_RIGHTPTONBEZIER));
                mainBezierPts.push(pntPathTextStart.pt);

                //计算第六个点
                pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d + dLineInterval * ( 0.5 - (this.RATIO_RIGHTPTONBEZIER - 0.5) * 0.5));
                if(pntPathTextStart.index < 0){
                    continue;
                }
                sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dSecondHalfLine, shapePts[pntPathTextStart.index + 1], pntPathTextStart.pt);
                if(bLeft){
                    mainBezierPts.push(sidepoints.pntRight);
                }else {
                    mainBezierPts.push(sidepoints.pntLeft);
                }

                //计算第七个点
                pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, d + dLineInterval);
                if(pntPathTextStart.index < 0){
                    continue;
                }
                sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dHalfLine, shapePts[pntPathTextStart.index + 1], pntPathTextStart.pt);
                if(bLeft){
                    mainBezierPts.push(sidepoints.pntRight);
                }else {
                    mainBezierPts.push(sidepoints.pntLeft);
                }

                //添加比例点
                if (Math.abs(d) <= 1E-6) {
                    this.scalePoints = [];
                    var scalePoint = new SuperMap.Geometry.Point(mainBezierPts[0].x, mainBezierPts[0].y);
                    scalePoint.isScalePoint = true;
                    scalePoint.tag = 0;
                    this.scalePoints.push(scalePoint);
                    scalePoint = new SuperMap.Geometry.Point(pntPathTextStart.pt.x, pntPathTextStart.pt.y);
                    scalePoint.isScalePoint = true;
                    scalePoint.tag = 1;
                    this.scalePoints.push(scalePoint);
                }

            }

            var allPointsBeizer = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(mainBezierPts);
            var shapePtsBeizer = allPointsBeizer;

            SuperMap.Plot.PlottingUtil.clearSamePts(shapePtsBeizer);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePtsBeizer);
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
    modifyPoint: function(index, pt) {
        if(pt.isScalePoint === true){
            if(index !== 0 && index !== 1){
                return;
            }
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if(geoPts.length < 2){
                return;
            }
            var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
            var shapePts = allPoints;

            if(index === 0){
                var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
                var dUnitLength = 1.0;
                var sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dUnitLength, shapePts[1], shapePts[0]);
                var projectPtInfo = SuperMap.Plot.PlottingUtil.pointProjectToSegment(new SuperMap.Geometry.Point(pt.x,pt.y), sidepoints.pntRight, sidepoints.pntLeft);
                var dFootLen = SuperMap.Plot.PlottingUtil.distance(projectPtInfo.projectPoint, geoPts[0]);
                var firstScaleValue = dFootLen / allPolyLineDistance;
                this.scaleValues[0] = firstScaleValue;

                var bRight = SuperMap.Plot.PlottingUtil.PointIsRightToLine(shapePts[0], shapePts[1], new SuperMap.Geometry.Point(pt.x,pt.y));
                if(bRight){
                    this.scaleValues[1] = 1;
                }else {
                    this.scaleValues[1] = 0;
                }
            }else{
                var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
                var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

                var footPt;//垂足点
                var nindex = -1;
                for(var i = 0; i< (shapePts.length -1); i++){
                    var projectPtInfo = SuperMap.Plot.PlottingUtil.pointProjectToSegment(new SuperMap.Geometry.Point(pt.x,pt.y), shapePts[i], shapePts[i + 1]);
                    if(projectPtInfo.isOnline){
                        footPt = projectPtInfo.projectPoint;
                        nindex = i;
                        break;
                    }
                }

                if(nindex === -1){
                    this.scaleValues[2] = this.DEFAULT_SECONDSCALEVALUE;
                    return;
                }

                var pts = [];
                for(var i = 0; i <= nindex; i++){
                    pts.push(shapePts[i]);
                }
                pts.push(footPt);

                var dLineLength = SuperMap.Plot.PlottingUtil.polylineDistance(pts);
                this.scaleValues[2] = dLineLength / allPolyLineDistance;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol15806"
});
