/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25801 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25000, {

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
        SuperMap.Geometry.AlgoSymbol25800.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if(geoPts.length <= this.minEditPts){
            if(geoPts.length >= 2){
                this.calAssistantLine();
            }
            return;
        }

        //创建任意多边形图元
       this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);

        //获得任意多边形的中心
        var polygoncenter =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[2] = this.getSubSymbolScaleValue()*2;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(polygoncenter.x+dDistance*dScale0,polygoncenter.y+dDistance*dScale1);
        var dRadius = dScale2*dDistance/2;


        var polyPts = [];
        polyPts.push(new SuperMap.Geometry.Point(symbolPt.x,symbolPt.y));
        polyPts.push(new SuperMap.Geometry.Point(symbolPt.x,(symbolPt.y+dRadius)));

        var circleStyle = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, polyPts,circleStyle, true);

        var polyPts2 = [];
        polyPts2.push(new SuperMap.Geometry.Point((symbolPt.x-dRadius*1.5),(symbolPt.y+dRadius)));
        polyPts2.push(new SuperMap.Geometry.Point((symbolPt.x+dRadius*1.5),(symbolPt.y+dRadius)));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, polyPts2, null, true);

        //添加比例点
        this.addScalePoint(symbolPt);

        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, dRadius, dRadius, 90);
        this.addScalePoint(scalePt2);

        this.clearBounds();
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
            if(this.scalePoints.length <= index)
                return;

            var geoPts = this.controlPoints;

            if (2 > geoPts.length)
            {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            //获得任意多边形的中心
            var centerPt =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

            if(0 == dDistance)
            {
                return;
            }

            if(0 == index)
            {
                var dScale0 = (pt.x-centerPt.x)/dDistance;
                this.scaleValues[0] = dScale0;

                var dScale1 = (pt.y-centerPt.y)/dDistance;
                this.scaleValues[1] = dScale1;
            }
            else if(1 == index)
            {
                var dScale0 = this.scaleValues[0];
                var dScale1 = this.scaleValues[1];

                var symbolPt = new SuperMap.Geometry.Point(centerPt.x+dDistance*dScale0,centerPt.y+dDistance*dScale1);
                var dDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,pt);
                var dScale2 = 2*dDis/dDistance;
                this.scaleValues[2] = dScale2;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25801"
})