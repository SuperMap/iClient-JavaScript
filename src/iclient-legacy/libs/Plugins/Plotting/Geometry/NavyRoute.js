/**
 * Class: SuperMap.Geometry.NavyRoute
 * 航线对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.Route>
 */
SuperMap.Geometry.NavyRoute = new SuperMap.Class(SuperMap.Geometry.Route,{

    /**
     * Constructor: SuperMap.Geometry.NavyRoute
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.NavyRoute>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.Route.prototype.initialize.apply(this, arguments);

        //自己特有
        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.NAVYROUTE;
        this.symbolType = SuperMap.Plot.SymbolType.NAVYROUTE;
        this.symbolName = "NavyRoute";
    },

    CLASS_NAME:"SuperMap.Geometry.NavyRoute"
});