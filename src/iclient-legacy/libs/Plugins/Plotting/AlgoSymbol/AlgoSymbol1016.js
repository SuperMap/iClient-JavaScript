/**
 * Created by xuxiaorong01 on 2016/12/28.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1016 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

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
    initialize:function(option){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 99999;
        //this.arrowHeadType = SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_COATTAIL;
        //this.arrowBodyType = SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_POLYBEZIER;
        //this.arrowTailType = SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_LINE;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        //计算箭身拟合点
        var bodyResult = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePtsBySingleLine(geoPts,0.0,this.arrowBodyType);

        var lastPts = [];
        lastPts.push(bodyResult.arrowBodyPts[bodyResult.arrowBodyPts.length-1]);
        lastPts.push(bodyResult.arrowBodyPts[bodyResult.arrowBodyPts.length-2]);
        //获取箭头的大小比值
        var scaleValue = this.getSubSymbolScaleValue();

        var ptsClone = this.calculateforHead(geoPts,bodyResult,lastPts,scaleValue);

        var headPts = SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePtsBySingleLine(geoPts,ptsClone,lastPts,scaleValue,bodyResult.arrowHeadLen, this.arrowHeadType);

        //箭尾拟合点
        var tailPts = SuperMap.Plot.ArrowToolKit.generateArrowTailShapePts(ptsClone,lastPts,scaleValue, this.arrowTailType);

        //创建箭身
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsClone);

        var style,cellHeadtype;
        if(this.arrowHeadType === SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_COATTAIL
            || this.arrowHeadType === SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_TRIANGLE_SOLID){
            style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
            cellHeadtype = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        }
        else cellHeadtype = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        //创建箭头
        this.addCell(cellHeadtype, headPts,style);

        //创建箭尾
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, tailPts);
        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1016"
});