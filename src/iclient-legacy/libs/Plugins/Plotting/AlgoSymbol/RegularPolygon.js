/**
 * Class: SuperMap.Geometry.RegularPolygon
 * 正多边形对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.RegularPolygon = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    /**
     * Constructor: SuperMap.Geometry.RegularPolygon
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.RegularPolygon>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.REGULARPOLYGON;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.REGULARPOLYGON;
        this.symbolName = "RegularPolygon";

        this.minEditPts = 2;
        this.maxEditPts = 9999;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints === null || this.controlPoints.length < 2){
            return;
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        var nCount = geoPts.length;

        var pts2D = [];

        var nstepAngle = Math.PI * 2 / (nCount + 1);
        var startAngle = Math.PI / 2;
        var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[nCount - 1]);

        var pStart = new SuperMap.Geometry.Point(geoPts[0].x + distance, geoPts[0].y);

        var pRotate = pStart.clone();
        pRotate = SuperMap.Plot.PlottingUtil.RotateAngle(geoPts[0], startAngle, pRotate);
        pts2D.push(pRotate.clone());
        for(var i = 1; i < nCount+1; i++)
        {
            pRotate = SuperMap.Plot.PlottingUtil.RotateAngle(geoPts[0], nstepAngle, pRotate);
            pts2D.push(pRotate.clone());
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D, {surroundLineFlag: false,fill:false});
    },

    CLASS_NAME: "SuperMap.Geometry.RegularPolygon"
});
