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
SuperMap.Geometry.AlgoSymbol23901 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 3;

        this.scaleValues = []
        this.scaleValues.push(0.333333);
        this.scaleValues.push(0.333333);
        this.scaleValues.push(0.125000);
        this.scaleValues.push(90);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4800));
        }

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        var pts2D = [];
        if(2 == geoPts.length)
        {
            var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
            var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);

            var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
            var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI;

            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dis,dis,dAngle+60);

            pts2D.push(geoPts[0]);
            pts2D.push(pt2);
            pts2D.push(pt3);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);
        }
        else
        {
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);

            for(var i = 0; i < geoPts.length; i++)
            {
                pts2D.push(geoPts[i]);
            }
        }

        //计算中心点
        //求多边形的中心点
        var center2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);

        pts2D.push(pts2D[0]);
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(pts2D);//计算周长

        if(!this.isEdit){
            var geoPtsDis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            this.scaleValues[2] = 2*geoPtsDis*this.getSubSymbolScaleValue()/dAllDistance;
        }

        var dScaleValue0 = this.scaleValues[0];
        var dScaleValue1 = this.scaleValues[1];
        var dScaleValue2 = this.scaleValues[2];
        var dScaleValue3 = this.scaleValues[3];

        var symbolPt = this.ComputeSubSymbolPt(dScaleValue0,dScaleValue1,pts2D,center2D);
        var dSymbolSize = dAllDistance * dScaleValue2;

        ////////////////////////////////////////////////////////////
        //添加子符号
        var midPt = symbolPt;

        //旋转角度
        var dAngle = dScaleValue3-90;

        if (0 < this.subSymbols.length)
        {
            this.computeSubSymbol(this.subSymbols[0], midPt, dSymbolSize, dAngle);
        }

        this.addScalePoint(midPt);

        var scalePt2D = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, dSymbolSize, dSymbolSize, dScaleValue3);
        this.addScalePoint(scalePt2D);

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
            if(this.scalePoints.length <= index)
                return;

            var geoPts = this.controlPoints;
            if (this.minEditPts > geoPts.length)
            {
                return;
            }

            var pts2D = [];
            if(2 == geoPts.length)
            {
                var pt1 = geoPts[0];
                var pt2 = geoPts[1];

                var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI;

                var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dis,dis,dAngle+60);

                pts2D.push(pt1);
                pts2D.push(pt2);
                pts2D.push(pt3);
            }
            else
            {
                pts2D = pts2D.concat(geoPts);
            }

            var pt1 = pts2D[0];
            var pt2 = pts2D[1];
            var pt3 = pts2D[2];

            var center2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);

            pts2D.push(pts2D[0]);
            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(pts2D);//计算周长

            var scalePt2D = pt;
            if(0 == index)
            {
                var dDis1 = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt3,pt1,pt2);
                var dDis2 = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt2,pt1,pt3);

                var dTempDis1 = SuperMap.Plot.PlottingUtil.PlumbLineLen(scalePt2D,pt1,pt2);
                var dTempDis2 = SuperMap.Plot.PlottingUtil.PlumbLineLen(scalePt2D,pt1,pt3);

                var dNewScaleValue0 = dTempDis1/dDis1;
                var dNewScaleValue1 = dTempDis2/dDis2;

                if(dNewScaleValue0 > 1.0)
                {
                    dNewScaleValue0 = 1.0;
                }

                if(dNewScaleValue1 > 1.0)
                {
                    dNewScaleValue1 = 1.0;
                }

               this.scaleValues[0] = dNewScaleValue0;
               this.scaleValues[1] = dNewScaleValue1;
            }
            else if(1 == index)
            {
                var dScaleValue0 = this.scaleValues[0];
                var dScaleValue1 = this.scaleValues[1];

                var symbolPt = this.ComputeSubSymbolPt(dScaleValue0,dScaleValue1,pts2D,center2D);

                var dDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,scalePt2D);
                var dNewScaleValue2 = dDis/dAllDistance;
                this.scaleValues[2] = dNewScaleValue2;

                var dNewScaleValue3 = SuperMap.Plot.PlottingUtil.radian(symbolPt,scalePt2D)*180/Math.PI;
                this.scaleValues[3] = dNewScaleValue3;
            }
        }

        this.calculateParts();
    },

    ComputeSubSymbolPt: function (dScaleValue0, dScaleValue1, pts2D, centerPt2D) {
        var pt1 = pts2D[0];
        var pt2 = pts2D[1];
        var pt3 = pts2D[2];
        var dDis1 = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt3, pt1, pt2);
        var dDis2 = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt2, pt1, pt3);

        var dSymbolDis1 = dDis1 * dScaleValue0;
        var dSymbolDis2 = dDis2 * dScaleValue1;

        var tempPts1 = [];
        if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(pt1, pt2, centerPt2D)) {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt2);
            tempPts1 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis1, false);
        }
        else {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt2);
            tempPts1 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis1, true);
        }

        var tempPts2;
        if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(pt1, pt3, centerPt2D)) {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt3);
            tempPts2 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis2, false);
        }
        else {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt3);
            tempPts2 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis2, true);
        }

        if (2 > tempPts1.length || 2 > tempPts2.length) {
            return centerPt2D;
        }

        var result = SuperMap.Plot.PlottingUtil.intersectLines(tempPts1[0], tempPts1[1], tempPts2[0], tempPts2[1]);

        if (result.isIntersectLines) {
            return result.intersectPoint;
        }
        else {
            return centerPt2D;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol23901"
});
