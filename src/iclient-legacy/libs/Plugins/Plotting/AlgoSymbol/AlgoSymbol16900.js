/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16900 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.1);
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

        var dScale = this.scaleValues[0];
        var dDistance = dScale * allDistance;

        var ptStart= geoPts[0];
        var ptEnd = geoPts[1];

        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;

        var ptHead = SuperMap.Plot.PlottingUtil.LinePnt(ptEnd,ptStart,allDistance+allDistance*0.2);
        var ptTail = SuperMap.Plot.PlottingUtil.LinePnt(ptStart,ptEnd,allDistance+allDistance*0.2);

        //计算平行线
        var paraPntsLeft,paraPntsRight;
        paraPntsLeft = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, true);
        paraPntsRight = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, false);

        //计算头点
        var dHeadDis = allDistance*0.1;
        var ptHeadUp = SuperMap.Plot.PlottingUtil.circlePoint(paraPntsLeft[0],dHeadDis,dHeadDis,angle+135);
        var ptHeadDown = SuperMap.Plot.PlottingUtil.circlePoint(paraPntsRight[0],dHeadDis,dHeadDis,angle-135);
        var ptEndUp  = SuperMap.Plot.PlottingUtil.circlePoint(paraPntsLeft[paraPntsLeft.length-1],dHeadDis,dHeadDis,angle+45);
        var ptEndDown  = SuperMap.Plot.PlottingUtil.circlePoint(paraPntsRight[paraPntsRight.length-1],dHeadDis,dHeadDis,angle-45);

        var ptLeft1 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsLeft[0], paraPntsLeft[paraPntsLeft.length-1], 3*allDistance/11);
        var ptLeft2 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsLeft[0], paraPntsLeft[paraPntsLeft.length-1], 4*allDistance/11);
        var ptLeft3 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsLeft[0], paraPntsLeft[paraPntsLeft.length-1], 7*allDistance/11);
        var ptLeft4 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsLeft[0], paraPntsLeft[paraPntsLeft.length-1], 8*allDistance/11);

        var leftLinePts = [];
        leftLinePts.push(ptHeadUp);
        leftLinePts.push(paraPntsLeft[0]);
        leftLinePts.push(ptLeft1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftLinePts);

        leftLinePts = [];
        leftLinePts.push(ptLeft2);
        leftLinePts.push(ptLeft3);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftLinePts);

        leftLinePts = [];
        leftLinePts.push(ptLeft4);
        leftLinePts.push(paraPntsLeft[paraPntsLeft.length-1]);
        leftLinePts.push(ptEndUp);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftLinePts);

        var ptRight1 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsRight[0], paraPntsRight[paraPntsRight.length-1], 3*allDistance/11);
        var ptRight2 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsRight[0], paraPntsRight[paraPntsRight.length-1], 4*allDistance/11);
        var ptRight3 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsRight[0], paraPntsRight[paraPntsRight.length-1], 7*allDistance/11);
        var ptRight4 = SuperMap.Plot.PlottingUtil.LinePnt(paraPntsRight[0], paraPntsRight[paraPntsRight.length-1], 8*allDistance/11);

        var rightLinePts = [];
        rightLinePts.push(ptHeadDown);
        rightLinePts.push(paraPntsRight[0]);
        rightLinePts.push(ptRight1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightLinePts);

        rightLinePts = [];
        rightLinePts.push(ptRight2);
        rightLinePts.push(ptRight3);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightLinePts);

        rightLinePts = [];
        rightLinePts.push(ptRight4);
        rightLinePts.push(paraPntsRight[paraPntsRight.length-1]);
        rightLinePts.push(ptEndDown);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightLinePts);

        if(90 < angle && angle < 270)
        {
            var tempPt = ptStart;
            ptStart = ptEnd;
            ptEnd = tempPt;
            angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;
        }

        //计算左边的符号
        var pt1_1 = new SuperMap.Geometry.Point(0.25*allDistance,  dDistance+0.2*allDistance);
        var pt1_2 = new SuperMap.Geometry.Point(0.35*allDistance,  dDistance+0.2*allDistance + 0.1*allDistance);
        var pt1_3 = new SuperMap.Geometry.Point(0.35*allDistance,  dDistance+0.2*allDistance - 0.1*allDistance);

        var tempPt1_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt1_1,angle);
        var tempPt1_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt1_2,angle);
        var tempPt1_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt1_3,angle);

        var pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt1_2.x,tempPt1_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt1_1.x,tempPt1_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt1_3.x,tempPt1_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var pt2_1 = new SuperMap.Geometry.Point(0.35*allDistance, dDistance+0.2*allDistance);
        var pt2_2 = new SuperMap.Geometry.Point(0.4*allDistance,  dDistance+0.2*allDistance + 0.05*allDistance);
        var pt2_3 = new SuperMap.Geometry.Point(0.4*allDistance,  dDistance+0.2*allDistance - 0.05*allDistance);

        var tempPt2_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt2_1,angle);
        var tempPt2_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt2_2,angle);
        var tempPt2_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt2_3,angle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt2_2.x,tempPt2_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt2_1.x,tempPt2_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt2_3.x,tempPt2_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var pt3_1 = new SuperMap.Geometry.Point(0.7*allDistance,  dDistance+0.2*allDistance);
        var pt3_2 = new SuperMap.Geometry.Point(0.8*allDistance,  dDistance+0.2*allDistance + 0.1*allDistance);
        var pt3_3 = new SuperMap.Geometry.Point(0.8*allDistance,  dDistance+0.2*allDistance - 0.1*allDistance);

        var tempPt3_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt3_1,angle);
        var tempPt3_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt3_2,angle);
        var tempPt3_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt3_3,angle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt3_2.x,tempPt3_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt3_1.x,tempPt3_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt3_3.x,tempPt3_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var pt4_1 = new SuperMap.Geometry.Point(0.8*allDistance,   dDistance+0.2*allDistance);
        var pt4_2 = new SuperMap.Geometry.Point(0.85*allDistance,  dDistance+0.2*allDistance + 0.05*allDistance);
        var pt4_3 = new SuperMap.Geometry.Point(0.85*allDistance,  dDistance+0.2*allDistance - 0.05*allDistance);

        var tempPt4_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt4_1,angle);
        var tempPt4_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt4_2,angle);
        var tempPt4_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,pt4_3,angle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt4_2.x,tempPt4_2.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt4_1.x,tempPt4_1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt4_3.x,tempPt4_3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var scalePoint = new SuperMap.Geometry.Point(paraPntsLeft[0].x,paraPntsLeft[0].y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;
        this.scalePoints.push(scalePoint);

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
                var startPt = geoPts[0];
                var endPt = geoPts[1];

                var projectPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, startPt, endPt);
                var dLineDistance = SuperMap.Plot.PlottingUtil.distance(pt, projectPt);

                //更新第0个比例值
                this.scaleValues[0] = dLineDistance/allDistance;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16900"
});
