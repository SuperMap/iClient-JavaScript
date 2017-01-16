/**
 * Class: SuperMap.Geometry.InterferenceBeam
 * 干扰波束对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.InterferenceBeam = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * Constructor: SuperMap.Geometry.InterferenceBeam
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.InterferenceBeam>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.minEditPts = 3;
        this.maxEditPts = 9999;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.INTERFERENCEBEAM;
        this.symbolType = SuperMap.Plot.SymbolType.INTERFERENCEBEAM;
        this.symbolName = "InterferenceBeam";
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();
        //清空原有的所有点
        this.components = [];

        if (this.controlPoints !== null && this.controlPoints.length >= this.minEditPts) {
            var tempPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(32, tempPoints);
            geometry.style = {surroundLineFlag: false};
            this.components.push(geometry);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.InterferenceBeam"
});