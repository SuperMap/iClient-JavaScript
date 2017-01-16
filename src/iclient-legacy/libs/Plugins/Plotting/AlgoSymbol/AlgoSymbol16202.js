/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16202 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 2;

        this.scaleValues.push(0.1);
        this.scaleValues.push(0);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for(var i = 0; i < geoPts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
        }

        var dDistance = this.scaleValues[0] * allDistance;

        var leftLinePts = [], rightLinePts = [];
        leftLinePts  = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, true);
        rightLinePts = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, false);

        var scalePoint = new SuperMap.Geometry.Point(leftLinePts[0].x,leftLinePts[0].y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;
        this.scalePoints.push(scalePoint);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, leftLinePts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, rightLinePts);

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;

        //计算左边的符号
        //符号中心点
        var leftCenter = new SuperMap.Geometry.Point(0.3*allDistance,0);
        var tempLeftCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,leftCenter,angle);

        //圆
        var circleCenter = new SuperMap.Geometry.Point(0,0.4*dDistance);
        var circlePt = new SuperMap.Geometry.Point(0,0.2*dDistance);

        var tempCircleCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,circleCenter,angle);
        var tempCirclePt = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,circlePt,angle);

        var pts2D = [];
        pts2D.push(tempCircleCenter);
        pts2D.push(tempCirclePt);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, pts2D);

        //竖线
        var pt1 = new SuperMap.Geometry.Point(0, 0.2*dDistance);
        var pt2 = new SuperMap.Geometry.Point(0,-0.4*dDistance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt1,angle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt2,angle);

        pts2D = [];
        pts2D.push(tempPt1);
        pts2D.push(tempPt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        // X
        var pt3 = new SuperMap.Geometry.Point( 0.2*dDistance,-0.2*dDistance);
        var pt4 = new SuperMap.Geometry.Point(-0.2*dDistance,-0.6*dDistance);

        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt3,angle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt4,angle);

        pts2D = [];
        pts2D.push(tempPt3);
        pts2D.push(tempPt4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var pt5 = new SuperMap.Geometry.Point(-0.2*dDistance,-0.2*dDistance);
        var pt6 = new SuperMap.Geometry.Point( 0.2*dDistance,-0.6*dDistance);

        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt5,angle);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt6,angle);

        pts2D = [];
        pts2D.push(tempPt5);
        pts2D.push(tempPt6);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算右边的符号
        //符号中心点
        var rightCenter = new SuperMap.Geometry.Point(0.7*allDistance,0);
        var tempRightCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,rightCenter,angle);

        var tempCircleCenter_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,circleCenter,angle);
        var tempCirclePt_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,circlePt,angle);

        pts2D = [];
        pts2D.push(tempCircleCenter_R);
        pts2D.push(tempCirclePt_R);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, pts2D);

        //竖线
        var tempPt1_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt1,angle);
        var tempPt2_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt2,angle);

        pts2D = [];
        pts2D.push(tempPt1_R);
        pts2D.push(tempPt2_R);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        // X
        var tempPt3_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt3,angle);
        var tempPt4_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt4,angle);

        pts2D = [];
        pts2D.push(tempPt3_R);
        pts2D.push(tempPt4_R);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var tempPt5_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt5,angle);
        var tempPt6_R = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt6,angle);

        pts2D = [];
        pts2D.push(tempPt5_R);
        pts2D.push(tempPt6_R);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

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
        this.isEdit = true;

        if(pt.isScalePoint === true){
            //获取位置点
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

            var allDistance = 0;
            for(var i = 0; i < geoPts.length-1; i++){
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
            }

            if(0 == index)     //修改第0个比例点
            {
                var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);

                var dScale = dDistance/allDistance;
                this.scaleValues[0] = dScale;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16202"
});
