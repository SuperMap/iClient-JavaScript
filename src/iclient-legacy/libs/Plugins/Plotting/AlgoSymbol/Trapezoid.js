/**
 * Class: SuperMap.Geometry.Trapezoid
 * 梯形对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.Trapezoid = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    /**
     * Constructor: SuperMap.Geometry.Trapezoid
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.Trapezoid>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.TRAPEZOIDSYMBOL;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.TRAPEZOIDSYMBOL;
        this.symbolName = "Trapezoid";

        this.minEditPts = 3;
        this.maxEditPts = 3;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if(this.controlPoints === null || this.controlPoints.length < 3){
            return;
        }

        var pPnts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        var nCount = pPnts.length;

        var allPts = [];

        //构造梯形

        var rate = 1;
        var pt1 = pPnts[0];
        var pt2 = pPnts[1];
        var pt3 = pPnts[2];

        var pt4 = new SuperMap.Geometry.Point(0,0);
        this.GetPointsByTrapezoid(rate,pt3,pt2,pt1,pt4);

        allPts.push(pt1);
        allPts.push(pt2);
        allPts.push(pt3);
        allPts.push(pt4);

        var ptTemp1 = pt1;
        var interLInes = SuperMap.Plot.PlottingUtil.intersectLines(pt1,pt2,pt3,pt4);
        var ptTemp = interLInes.intersectPoint;
        if(interLInes.isIntersectLines)
        {
            if((ptTemp.x > pt1.x && ptTemp.x < pt2.x) ||
                (ptTemp.y > pt1.y && ptTemp.y < pt2.y) ||
                (ptTemp.x < pt1.x && ptTemp.x > pt2.x) ||
                (ptTemp.y < pt1.y && ptTemp.y > pt2.y)   )
            {
                allPts[0] = pt4;
                allPts[3] = pt1;
            }
        }

        if (4 == allPts.length)
        {
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, allPts);
        }
    },

    GetPointsByTrapezoid: function(rate,pt1,pt2,pt3,pt) {
        var x1 = pt1.x;
        var y1 = pt1.y;
        var x2 = pt2.x;
        var y2 = pt2.y;
        var x3 = pt3.x;
        var y3 = pt3.y;

        var xx = 0.0;
        var yy = 0.0;
        var x0 = 0.0;
        var y0 = 0.0;
        if (SuperMap.Plot.PlottingUtil.equalFuzzy(Math.abs(y1-y2),0))
        {
            xx=x1+x2-x3;
            yy=y3;
        }
        else if (SuperMap.Plot.PlottingUtil.equalFuzzy(Math.abs(x1-x2),0))
        {
            xx=x3;
            yy=y1+y2-y3;
        }
        else
        {
            var k=1.0*(y1-y2)/(x1-x2);
            var b1=(y2+y1)/2.0 + (x1+x2)/(2.0*k);
            var b2=y3-k*x3;
            xx=(b1-b2)/(k+1.0/k);
            yy = k*xx + b2;
            xx = 2.0*xx-x3;
            yy = 2.0*yy-y3;
        }

        var L1 =Math.sqrt(1.0*(x1-x2)*(x1-x2) + 1.0*(y1-y2)*(y1-y2));
        var L2 =Math.sqrt(1.0*(x1-xx)*(x1-xx) + 1.0*(y1-yy)*(y1-yy));
        if (L1 > 0)
        {
            x0 = x1 + (x2-x1)*L2/L1;
            y0 = y1 + (y2-y1)*L2/L1;
        }
        else
        {
            x0 = x1;
            y0 = y1;
        }

        var x = x0 + (xx-x0)*rate;
        var y = y0 + (yy-y0)*rate;

        pt.x = x;
        pt.y = y;
    },

    CLASS_NAME: "SuperMap.Geometry.Trapezoid"
});
