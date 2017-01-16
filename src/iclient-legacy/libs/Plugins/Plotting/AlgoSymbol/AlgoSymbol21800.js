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
SuperMap.Geometry.AlgoSymbol21800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues.push(0.2);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.scaleValues.length !== 1)
        {
            this.scaleValues = [];
           this.scaleValues.push(0.05);
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        if (this.scaleValues.length < 1)
        {
            this.scaleValues = [];
            this.scaleValues.push(0.2);
        }

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var dScale = this.scaleValues[0];
        var dDistance = allDistance * dScale;
        var distance = dDistance * 0.5;

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd   = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;

        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dDistance,dDistance,angle+90);
        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dDistance,dDistance,angle+270);
        var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,distance,distance,angle);
        var pt4 = SuperMap.Plot.PlottingUtil.circlePoint(pt2,distance,distance,angle);

        var pts2D = [];
        pts2D.push(pt4);
        pts2D.push(pt2);
        pts2D.push(pt1);
        pts2D.push(pt3);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var pt5 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,dDistance,dDistance,angle+90);
        var pt6 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,dDistance,dDistance,angle+270);
        var pt7 = SuperMap.Plot.PlottingUtil.circlePoint(pt5,distance,distance,angle+180);
        var pt8 = SuperMap.Plot.PlottingUtil.circlePoint(pt6,distance,distance,angle+180);

        pts2D = [];
        pts2D.push(pt7);
        pts2D.push(pt5);
        pts2D.push(pt6);
        pts2D.push(pt8);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算比例点
        this.addScalePoint(pt1);

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

            if(0 != index)
            {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length)
            {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var distance = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[0]);

            var dScaleValue = distance/dDistance;
            this.scaleValues[0] = dScaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol21800"
});
