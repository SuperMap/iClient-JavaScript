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
SuperMap.Geometry.AlgoSymbol4011100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol23600, {


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

        this.scaleValues = [];
        this.scaleValues.push(0.1); //第一内部符号大小*0.4/第一基本点和第三基本点间的距离
        this.scaleValues.push(0);   //第一内部符号与x轴的夹角（度）
        this.scaleValues.push(1);
        this.scaleValues.push(0.1); //第二内部符号大小*0.4/第一基本点和第三基本点间的距离
        this.scaleValues.push(0);   //第二内部符号与x轴的夹角（度）
        this.scaleValues.push(1);
        this.scaleValues.push(0.0); //第一内部符号的中心点位置减去该符号的初始中心点位置（x）/ 第一基本点和第三基本点间的距离
        this.scaleValues.push(0.0); //第一内部符号的中心点位置减去该符号的初始中心点位置（y）/ 第一基本点和第三基本点间的距离
        this.scaleValues.push(0.0); //第二内部符号的中心点位置减去该符号的初始中心点位置（x）/ 第一基本点和第三基本点间的距离
        this.scaleValues.push(0.0); //第二内部符号的中心点位置减去该符号的初始中心点位置（y）/ 第一基本点和第三基本点间的距离

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4000));
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4001));
        }

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts) {
            return;
        }

        if (10 > this.scaleValues.length) {
            this.scaleValues = [];
            this.scaleValues.push(0.1); //第一内部符号大小*0.4/第一基本点和第三基本点间的距离
            this.scaleValues.push(0);   //第一内部符号与x轴的夹角（度）
            this.scaleValues.push(1);
            this.scaleValues.push(0.1); //第二内部符号大小*0.4/第一基本点和第三基本点间的距离
            this.scaleValues.push(0);   //第二内部符号与x轴的夹角（度）
            this.scaleValues.push(1);
            this.scaleValues.push(0.0); //第一内部符号的中心点位置减去该符号的初始中心点位置（x）/ 第一基本点和第三基本点间的距离
            this.scaleValues.push(0.0); //第一内部符号的中心点位置减去该符号的初始中心点位置（y）/ 第一基本点和第三基本点间的距离
            this.scaleValues.push(0.0); //第二内部符号的中心点位置减去该符号的初始中心点位置（x）/ 第一基本点和第三基本点间的距离
            this.scaleValues.push(0.0); //第二内部符号的中心点位置减去该符号的初始中心点位置（y）/ 第一基本点和第三基本点间的距离
        }

        var pt1 = geoPts[0];
        var pt2 = geoPts[1];
        var pt3;

        if (2 == geoPts.length) {
            var dTempDis = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
            var mid1And2 = new SuperMap.Geometry.Point((pt1.x + pt2.x) / 2, (pt1.y + pt2.y) / 2);

            var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dTempDis / 2.7, pt1, mid1And2);
            pt3 = leftAndRightPt.pntLeft;
            geoPts.push(pt3);
        }
        else if (3 == geoPts.length) {
            pt3 = geoPts[2];
        }

        //计算猪腰子拟合点
        var primitives = new SuperMap.Geometry.Primitives();
        var shapePts = primitives.getKendyShapePts(geoPts);
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePts);

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
            this.scaleValues[3] = this.getSubSymbolScaleValue();
        }

        //计算符号位置
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];
        var dScale4 = this.scaleValues[4];
        var dScale5 = this.scaleValues[5];
        var dScale6 = this.scaleValues[6];
        var dScale7 = this.scaleValues[7];
        var dScale8 = this.scaleValues[8];
        var dScale9 = this.scaleValues[9];

        var initialPt1 = new SuperMap.Geometry.Point(pt3.x + (pt2.x - pt3.x) / 2, pt3.y - (pt3.y - pt2.y) * 0.6);
        var initialPt2 = new SuperMap.Geometry.Point(pt3.x - (pt3.x - pt1.x) / 2, pt3.y - (pt3.y - pt1.y) * 0.6);

        var dDistance = SuperMap.Plot.PlottingUtil.distance(pt1, pt3);

        var symbolPt1 = new SuperMap.Geometry.Point(initialPt1.x + dDistance * dScale6, initialPt1.y + dDistance * dScale7);
        var symbolPt2 = new SuperMap.Geometry.Point(initialPt2.x + dDistance * dScale8, initialPt2.y + dDistance * dScale9);

        var pts2D = [];
        var dTempDis = SuperMap.Plot.PlottingUtil.distance(symbolPt1, symbolPt2) * 0.1;
        var linePt1 = SuperMap.Plot.PlottingUtil.LinePnt(symbolPt1, symbolPt2, dTempDis);
        var linePt2 = SuperMap.Plot.PlottingUtil.LinePnt(symbolPt2, symbolPt1, dTempDis);
        pts2D.push(linePt1);
        pts2D.push(linePt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var dSymbolSize1 = dDistance * dScale0 / 0.4;
        var dSymbolAngle1 = dScale1;

        if (this.subSymbols && null !== this.subSymbols && this.subSymbols.length > 0) {
            this.computeSubSymbol(this.subSymbols[0], symbolPt1, dSymbolSize1, dSymbolAngle1 - 90);
        }

        var dSymbolSize2 = dDistance * dScale3 / 0.4;
        var dSymbolAngle2 = dScale4;
        if (this.subSymbols && null !== this.subSymbols && this.subSymbols.length > 1) {
            this.computeSubSymbol(this.subSymbols[1], symbolPt2, dSymbolSize2, dSymbolAngle2 - 90);
        }

        //添加比例点
        this.addScalePoint(symbolPt1);

        var ptScale2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt1, 0.5 * dSymbolSize1, 0.5 * dSymbolSize1, dSymbolAngle1);
        this.addScalePoint(ptScale2);

        this.addScalePoint(symbolPt2);

        var ptScale4 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt2, 0.5 * dSymbolSize2, 0.5 * dSymbolSize2, dSymbolAngle2);
        this.addScalePoint(ptScale4);

        this.clearBounds();
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol23600"
});
