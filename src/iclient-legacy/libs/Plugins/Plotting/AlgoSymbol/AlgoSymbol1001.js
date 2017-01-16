/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1001 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        this.scaleValues.push(0.1);//箭头的长度/箭头定位点连线的长度
        this.scaleValues.push(0.2);//肩颈宽度/箭头的长度
        this.scaleValues.push(0.000000);//是否是平行线箭身
        this.scaleValues.push(0.3);//箭耳宽度/箭头长度
        this.scaleValues.push(0.08);//箭耳到定位点连线的垂足点/箭头长度
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if (this.controlPoints.length >= this.minEditPts) {
            this.scalePoints = [];
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

            var arrowInfo = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePts(geoPts, this.scaleValues,
                SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_PARALLEL);
            //箭头
            var arrowTouLen = arrowInfo.arrowTouLen;
            //左箭头
            var leftBodyPts = arrowInfo.leftBodyPts;
            //右箭头
            var rightBodyPts = arrowInfo.rightBodyPts;

            var atPoints = [];
            atPoints.push(leftBodyPts[leftBodyPts.length - 1]);
            atPoints.push(rightBodyPts[rightBodyPts.length - 1]);

            var scaleClone = [];
            scaleClone.push(this.scaleValues[3]);
            scaleClone.push(this.scaleValues[4]);
            scaleClone.push(this.scaleValues[0]);
            scaleClone.push(this.scaleValues[1]);
            //箭头
            var arrowHeadPts = SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePts(geoPts, atPoints, scaleClone,
                arrowTouLen, SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_WITHOUT_EAR);

            var shapePts = [];
            shapePts = shapePts.concat(leftBodyPts);
            shapePts = shapePts.concat(arrowHeadPts);

            for (var j = rightBodyPts.length - 1; j >= 0; j--) {
                shapePts.push(rightBodyPts[j]);
            }

            var arrowJingMidPt = new SuperMap.Geometry.Point((atPoints[0].x + atPoints[1].x) / 2, (atPoints[0].y + atPoints[1].y) / 2);
            //第一个比例点
            var scalePoint1 = new SuperMap.Geometry.Point(arrowJingMidPt.x, arrowJingMidPt.y);
            scalePoint1.isScalePoint = true;
            scalePoint1.tag = 0;
            this.scalePoints.push(scalePoint1);
            //第二个比例点
            var scalePoint2 = new SuperMap.Geometry.Point(leftBodyPts[leftBodyPts.length - 1].x, leftBodyPts[leftBodyPts.length - 1].y);
            scalePoint2.isScalePoint = true;
            scalePoint2.tag = 1;
            this.scalePoints.push(scalePoint2);
            //第三个比例点
            var scalePoint3 = new SuperMap.Geometry.Point(arrowHeadPts[0].x, arrowHeadPts[0].y);
            scalePoint3.isScalePoint = true;
            scalePoint3.tag = 2;
            this.scalePoints.push(scalePoint3);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);
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
            var scalePt0 = new SuperMap.Geometry.Point(this.scalePoints[0].x, this.scalePoints[0].y);
            var scalePt1 = new SuperMap.Geometry.Point(this.scalePoints[1].x, this.scalePoints[1].y);
            var scalePt2 = new SuperMap.Geometry.Point(this.scalePoints[2].x, this.scalePoints[2].y);

            var arrowTouLenDiviedByArrowBodyLen = this.scaleValues[0];
            var dLength = SuperMap.Plot.PlottingUtil.polylineDistance(this.controlPoints);
            var arrowTouLen = dLength * arrowTouLenDiviedByArrowBodyLen;

            if (index == 0) {
                var projectPtInf = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, this.controlPoints[this.controlPoints.length - 2], this.controlPoints[this.controlPoints.length - 1]);
                var projectPt = projectPtInf.projectPoint;
                if (projectPtInf.isOnline) {
                    var dDis = SuperMap.Plot.PlottingUtil.distance(projectPt, this.controlPoints[this.controlPoints.length - 1]);
                    this.scaleValues[0] = dDis / dLength;
                }
            }
            else if (index == 1) {
                var projectPtInfo = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, scalePt1, scalePt2);
                var projectPt = projectPtInfo.projectPoint;
                var dDis1 = SuperMap.Plot.PlottingUtil.distance(projectPt, scalePt0);
                this.scaleValues[1] = dDis1 / arrowTouLen;
            }
            else if (index == 2) {
                var projectPtInfo1 = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, this.controlPoints[1], scalePt2);
                var projectPt1 = projectPtInfo1.projectPoint;

                var projectPtInfo2 = SuperMap.Plot.PlottingUtil.pointProjectToSegment(projectPt1, scalePt0, this.controlPoints[1]);
                var projectPt2 = projectPtInfo2.projectPoint;

                var dDis = SuperMap.Plot.PlottingUtil.distance(projectPt2, scalePt0);
                if (projectPtInfo2.inOnline === true) {
                    this.scaleValues[4] = -dDis / arrowTouLen;
                }
                else {
                    this.scaleValues[4] = dDis / arrowTouLen;
                }
            }
        }

        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol1001"
});