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
SuperMap.Geometry.AlgoSymbol34801 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues.push(0.4);

        if(null !== this.feature){
            this.feature.style.strokeColor = "#0000ff";
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

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        //圆弧1
        var pts2D = [];
        var ptStart = geoPts[0].clone();
        var ptEnd = geoPts[1].clone();
        var dRadius = SuperMap.Plot.PlottingUtil.distance(ptStart,ptEnd);

        var i =0.0;
        for( i = 15; i <= 180.0-15; i += 4)
        {
            pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dRadius,dRadius,i));
        }

        if(SuperMap.Plot.PlottingUtil.equalFuzzy(i,180.0-15))
        {
            i = 180.0-15;
            pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dRadius,dRadius,i));
        }

        var arcPts2D = [];
        for(i = pts2D.length-1 ; i >= 0; i--)
        {
            arcPts2D.push(pts2D[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,arcPts2D);

        //圆弧2
        pts2D = [];
        for( i = 180.0+15; i <= 360.0-15; i += 4)
        {
            pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dRadius,dRadius,i));
        }

        if(SuperMap.Plot.PlottingUtil.equalFuzzy(i,360.0-15))
        {
            i = 360.0-15;
            pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dRadius,dRadius,i));
        }

        arcPts2D = [];
        for(i = pts2D.length-1; i >= 0; i--)
        {
            arcPts2D.push(pts2D[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,arcPts2D);

        //计算横线
        var dLineDis = 2 * this.scaleValues[0] * dRadius;
        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x-dLineDis,ptStart.y));
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x-0.4*dLineDis,ptStart.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true});

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x-0.2*dLineDis,ptStart.y));
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x+0.4*dLineDis,ptStart.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true});

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x+0.6*dLineDis,ptStart.y));
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x+dLineDis,ptStart.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true});

        //计算竖线
        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x-this.scaleValues[0]*dRadius,ptStart.y));
        pts2D.push(new SuperMap.Geometry.Point(ptStart.x-this.scaleValues[0]*dRadius,ptStart.y+this.scaleValues[0]*dRadius));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true});
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34801"
});
