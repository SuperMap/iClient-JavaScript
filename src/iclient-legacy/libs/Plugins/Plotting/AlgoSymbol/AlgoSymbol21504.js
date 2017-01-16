/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol21504 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol21501, {

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
        this.maxEditPts = 255;

        this.scaleValues = [];
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.01);

        if (this.subSymbols >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 8404));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        SuperMap.Geometry.AlgoSymbol21503.prototype.calculateParts.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol21504"
});