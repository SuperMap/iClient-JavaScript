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
SuperMap.Geometry.AlgoSymbol23700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        if (geoPts.length < this.minEditPts) {
            return;
        }

        var shapePts = [];
        if (3 >= geoPts.length) {
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        }
        else {
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        var center2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(shapePts);

        //计算长度
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var dSymbolSize = dAllDistance * this.getSubSymbolScaleValue() * 0.5;

        //子符号，局部坐标
        var pts2D_1 = [];
        pts2D_1.push(new SuperMap.Geometry.Point(0, dSymbolSize));
        pts2D_1.push(new SuperMap.Geometry.Point(-dSymbolSize, 0));
        pts2D_1.push(new SuperMap.Geometry.Point(0, -dSymbolSize));

        var pts2D_2 = [];
        pts2D_2.push(new SuperMap.Geometry.Point(dSymbolSize, dSymbolSize));
        pts2D_2.push(new SuperMap.Geometry.Point(0, 0));
        pts2D_2.push(new SuperMap.Geometry.Point(dSymbolSize, -dSymbolSize));

        //计算第一个符号的位置
        var symbolPt1 = new SuperMap.Geometry.Point(-3 * dSymbolSize, 2 * dSymbolSize);
        var tempSymbolPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, symbolPt1, 0);

        var tempPts2D_1 = [], tempPts2D_2 = [];
        for (var i = 0; i < 3; i++) {
            tempPts2D_1.push(new SuperMap.Geometry.Point(pts2D_1[i].x + tempSymbolPt1.x, pts2D_1[i].y + tempSymbolPt1.y));
            tempPts2D_2.push(new SuperMap.Geometry.Point(pts2D_2[i].x + tempSymbolPt1.x, pts2D_2[i].y + tempSymbolPt1.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, tempPts2D_1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, tempPts2D_2);

        //计算第二个符号的位置
        var symbolPt2 = new SuperMap.Geometry.Point(3 * dSymbolSize, 2 * dSymbolSize);
        var tempSymbolPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, symbolPt2, 0);

        var pts3D_1 = [];
        var pts3D_2 = [];
        for (var i = 0; i < 3; i++) {
            pts3D_1.push(new SuperMap.Geometry.Point(pts2D_1[i].x + tempSymbolPt2.x, pts2D_1[i].y + tempSymbolPt2.y));
            pts3D_2.push(new SuperMap.Geometry.Point(pts2D_2[i].x + tempSymbolPt2.x, pts2D_2[i].y + tempSymbolPt2.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_2);

        //计算第三个符号的位置
        var symbolPt3 = new SuperMap.Geometry.Point(-4 * dSymbolSize, -2 * dSymbolSize);
        var tempSymbolPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, symbolPt3, 0);

        pts3D_1 = [];
        pts3D_2 = [];
        for (var i = 0; i < 3; i++) {
            pts3D_1.push(new SuperMap.Geometry.Point(pts2D_1[i].x + tempSymbolPt3.x, pts2D_1[i].y + tempSymbolPt3.y));
            pts3D_2.push(new SuperMap.Geometry.Point(pts2D_2[i].x + tempSymbolPt3.x, pts2D_2[i].y + tempSymbolPt3.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_2);

        //计算第四个符号的位置
        var symbolPt4 = new SuperMap.Geometry.Point(0, -2 * dSymbolSize);
        var tempSymbolPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, symbolPt4, 0);

        pts3D_1 = [];
        pts3D_2 = [];
        for (var i = 0; i < 3; i++) {
            pts3D_1.push(new SuperMap.Geometry.Point(pts2D_1[i].x + tempSymbolPt4.x, pts2D_1[i].y + tempSymbolPt4.y));
            pts3D_2.push(new SuperMap.Geometry.Point(pts2D_2[i].x + tempSymbolPt4.x, pts2D_2[i].y + tempSymbolPt4.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_2);

        //计算第五个符号的位置
        var symbolPt5 = new SuperMap.Geometry.Point(4 * dSymbolSize, -2 * dSymbolSize);
        var tempSymbolPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(center2D, symbolPt5, 0);

        pts3D_1 = [];
        pts3D_2 = [];
        for (var i = 0; i < 3; i++) {
            pts3D_1.push(new SuperMap.Geometry.Point(pts2D_1[i].x + tempSymbolPt5.x, pts2D_1[i].y + tempSymbolPt5.y));
            pts3D_2.push(new SuperMap.Geometry.Point(pts2D_2[i].x + tempSymbolPt5.x, pts2D_2[i].y + tempSymbolPt5.y));
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts3D_2);

        this.clearBounds();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol23700"
});
