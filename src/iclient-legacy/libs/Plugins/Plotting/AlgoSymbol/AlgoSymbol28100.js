/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.349066);


    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        //开始点
        var startPt = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        //结束点
        var endPt = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
        //两点的弧度
        var centerAngle = SuperMap.Plot.PlottingUtil.radian(startPt, endPt) * 180 / Math.PI;
        //总长度
        var dDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            dDistance += SuperMap.Plot.PlottingUtil.distance(startPt, endPt);
        }
        //create circle Start
        var radius = this.scaleValues[0] * dDistance;
        //创建图元
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [startPt, new SuperMap.Geometry.Point(startPt.x + radius, startPt.y)]);
        //create end Circle

        //创建圆弧图元
        var scaleAngle = this.scaleValues[1] * 180 / Math.PI;//缩放角度
        //第一个点
        var arcPt1 = SuperMap.Plot.PlottingUtil.circlePoint(startPt, dDistance, dDistance, centerAngle - scaleAngle);
        //第二个点
        var arcPt2 = SuperMap.Plot.PlottingUtil.circlePoint(startPt, dDistance, dDistance, centerAngle + scaleAngle);

        //添加图元
        this.addCell(SuperMap.Plot.SymbolType.ARCSYMBOL, [arcPt1, endPt, arcPt2]);
        //添加中间的线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [geoPts[0], geoPts[1]]);
        //添加下面边的线
        var ptLine1 = SuperMap.Plot.PlottingUtil.circlePoint(startPt, radius, radius, centerAngle - 90);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [ptLine1, arcPt1]);
        //添加下面的线
        var ptLine2 = SuperMap.Plot.PlottingUtil.circlePoint(startPt, radius, radius, centerAngle + 90);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [ptLine2, arcPt2]);

        //添加圆中的线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [ptLine1, ptLine2]);

        //添加比例点
        var circleScalePts = SuperMap.Plot.PlottingUtil.circlePoint(startPt, radius, radius, centerAngle + 180);
        this.addScalePoint(new SuperMap.Geometry.Point(circleScalePts.x, circleScalePts.y), 0);

        this.addScalePoint(arcPt2, 1);

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
            var startPt = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            var endtPt = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
            //中心角度
            var centerAngle = SuperMap.Plot.PlottingUtil.radian(startPt, endtPt) * 180 / Math.PI;
            var allDistance = SuperMap.Plot.PlottingUtil.distance(startPt, endtPt);
            if (index === 0) {
                var dRadius = SuperMap.Plot.PlottingUtil.distance(startPt, pt);
                var scaleRadius = dRadius / allDistance;
                this.scaleValues[0] = scaleRadius;
            }
            if (index === 1) {

                var scaleAngle = SuperMap.Plot.PlottingUtil.radian(startPt, pt) * 180 / Math.PI;

                var dScale = Math.abs(scaleAngle - centerAngle);

                if (dScale > 270 && dScale < 360) {
                    dScale = 360 - dScale;
                }

                if (dScale > 90) {
                    return;
                }

                this.scaleValues[1] = dScale * Math.PI / 180;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol28100"
});