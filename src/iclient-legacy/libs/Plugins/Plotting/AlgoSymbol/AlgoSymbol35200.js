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
SuperMap.Geometry.AlgoSymbol35200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 9999;

        this.scaleValues = [];
        this.scaleValues[0] = 0.05;

        if (this.subSymbols.length >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 6803));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2)
        {
            return;
        }

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues[0] = 0.05;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if(geoPts.length == 2){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);
        }
        else{
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,geoPts);
        }

        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var polygoncenter =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dScale0 = this.scaleValues[0];
        var dSymbolSize = dAllDistance*dScale0;

        //添加子符号
        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],polygoncenter, dSymbolSize, 0);
        }

        //添加比例点
        this.scalePoints = [];
        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(polygoncenter,dSymbolSize,dSymbolSize,90);
        this.addScalePoint(scalePt);
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function(index, pt) {
        if(pt.isScalePoint === true){
            if(index != 0) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            var centerPt2D =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

            if(0 == index)
            {
                var dDis = SuperMap.Plot.PlottingUtil.distance(pt,centerPt2D);

                var dScale = dDis/dAllDistance;

                this.scaleValues[0] = dScale;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol35200"
});

