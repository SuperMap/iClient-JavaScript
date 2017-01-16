/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25101 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25000, {

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

        this.scaleValues = [];
        this.scaleValues.push(0.105263);
        this.scaleValues.push(0.105263);
        this.scaleValues.push(0.181818);
        this.scaleValues.push(0.285714);
        this.scaleValues.push(0.285714);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = this.GetGoPts();
        if (geoPts.length == 0) {
            return;
        }

        if (this.scaleValues.length == 0) {
            this.scaleValues.push(0.105263);
            this.scaleValues.push(0.105263);
            this.scaleValues.push(0.181818);
            this.scaleValues.push(0.285714);
            this.scaleValues.push(0.285714);
        }

        var ptStart = geoPts[0].clone();
        var ptEnd = geoPts[1].clone();
        var dDistance = SuperMap.Plot.PlottingUtil.distance(ptStart, ptEnd);

        var scaleValue0 = this.scaleValues[0];
        var pt1 = new SuperMap.Geometry.Point(0, -dDistance * scaleValue0);
        var pt7 = new SuperMap.Geometry.Point(0, dDistance * scaleValue0);

        var scaleValue1 = this.scaleValues[1];
        var scaleValue3 = this.scaleValues[3];
        var pt2 = new SuperMap.Geometry.Point(dDistance * (1 - scaleValue3), -dDistance * scaleValue1);
        var pt6 = new SuperMap.Geometry.Point(dDistance * (1 - scaleValue3), dDistance * scaleValue1);

        var scaleValue2 = this.scaleValues[2];
        var scaleValue4 = this.scaleValues[4];
        var pt3 = new SuperMap.Geometry.Point(dDistance * (1 - scaleValue4), -dDistance * scaleValue2);
        var pt5 = new SuperMap.Geometry.Point(dDistance * (1 - scaleValue4), dDistance * scaleValue2);

        var pt4 = new SuperMap.Geometry.Point(dDistance, 0);

        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd);

        var tempPts = [];
        tempPts.push(pt1);
        tempPts.push(pt2);
        tempPts.push(pt3);
        tempPts.push(pt4);
        tempPts.push(pt5);
        tempPts.push(pt6);
        tempPts.push(pt7);

        var shapePts = [];
        for (var j = 0; j < tempPts.length; j++) {
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, tempPts[j], angle * this.RTOD);
            shapePts.push(pt);
        }

        // 需要颠倒一下顺序，否则会导致衬线绘制不正确
        var allPts = [];
        for (var i = shapePts.length - 1; i >= 0; --i) {
            allPts.push(shapePts[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        this.scalePoints = [];
        var scalePt1 = shapePts[0].clone();
        scalePt1.isScalePoint = true;
        scalePt1.tag = 0;
        this.scalePoints.push(scalePt1);
        var scalePt2 = shapePts[1].clone();
        scalePt2.isScalePoint = true;
        scalePt2.tag = 1;
        this.scalePoints.push(scalePt2);
        var scalePt3 = shapePts[2].clone();
        scalePt3.isScalePoint = true;
        scalePt3.tag = 2;
        this.scalePoints.push(scalePt3);

        //十字的长度和距离
        var CrossDis = 0.08125 * dDistance;

        //十字的中心点
        var ptCenter = new SuperMap.Geometry.Point((pt4.x - CrossDis), 0);

        //十字的沿箭身方向的线
        var linebodystart = new SuperMap.Geometry.Point((ptCenter.x - CrossDis / 2), 0);
        var linebodyend = new SuperMap.Geometry.Point((ptCenter.x + CrossDis / 2), 0);

        var shapePts1 = [];
        var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, linebodystart, angle * this.RTOD);
        shapePts1.push(pt.clone());

        pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, linebodyend, angle * this.RTOD);
        shapePts1.push(pt.clone());

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts1);

        //十字的垂直于箭身方向的线
        var linestandstart = new SuperMap.Geometry.Point(ptCenter.x, (ptCenter.y - CrossDis / 2));
        var linestandend = new SuperMap.Geometry.Point(ptCenter.x, (ptCenter.y + CrossDis / 2));

        var shapePts2 = [];
        pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, linestandend, angle * this.RTOD);
        shapePts2.push(pt.clone());

        pt = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart, linestandstart, angle * this.RTOD);
        shapePts2.push(pt.clone());

        //创建折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts2);
    },


    GetGoPts: function () {
        var pts2D = [];
        var nCount = this.controlPoints.length;
        if (nCount < 2) {
            return pts2D;
        }
        pts2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(pts2D);
        if (pts2D.length == 1) {
            pts2D = [];
        }
        return pts2D;
    }
});