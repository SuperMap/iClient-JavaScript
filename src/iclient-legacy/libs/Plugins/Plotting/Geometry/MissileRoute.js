/**
 * Class: SuperMap.Geometry.MissileRoute
 * 航线对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.Route>
 */
SuperMap.Geometry.MissileRoute = new SuperMap.Class(SuperMap.Geometry.Route,{

    /**
     * Constructor: SuperMap.Geometry.MissileRoute
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.MissileRoute>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.Route.prototype.initialize.apply(this, arguments);

        //自己特有
        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.MISSILEROUTE;
        this.symbolType = SuperMap.Plot.SymbolType.MISSILEROUTE;
        this.symbolName = "MissileRoute";
    },

    CLASS_NAME:"SuperMap.Geometry.MissileRoute"
});