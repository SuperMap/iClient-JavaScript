/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol6020402 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol6020400, {

    /**
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array(<SuperMap.Geometry.Point>)} 子标号位置点
     *
     */
    getSubSymbolPts: function(symbolSize){
        var cells = [];

        var cellPts1 = [];
        cellPts1.push(new SuperMap.Geometry.Point(-symbolSize/2, 0));
        cellPts1.push(new SuperMap.Geometry.Point( symbolSize/2, 0));
        cells.push(cellPts1);

        var cellPts2 = [];
        cellPts2.push(new SuperMap.Geometry.Point(0, 0));
        cellPts2.push(new SuperMap.Geometry.Point(0,symbolSize/2));
        cells.push(cellPts2);

        return cells;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol6020402"
});


