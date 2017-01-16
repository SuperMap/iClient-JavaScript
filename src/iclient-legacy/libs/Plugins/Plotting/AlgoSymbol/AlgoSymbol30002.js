/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol30002 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol30001, {

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
        SuperMap.Geometry.AlgoSymbol30001.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: getLeftSubSymbolPts
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array(<SuperMap.Geometry.Point>)} 子标号位置点
     *
     */
    getRightSubSymbolPts: function(symbolSize){
        var d = symbolSize*0.25;

        var pts = [];
        pts.push(new SuperMap.Geometry.Point(0  ,2*d));
        pts.push(new SuperMap.Geometry.Point(2*d,2*d));
        pts.push(new SuperMap.Geometry.Point(2*d,-d));
        pts.push(new SuperMap.Geometry.Point(0, -2*d));
        pts.push(new SuperMap.Geometry.Point(0, 2*d));
        return pts;
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol30002"
});
