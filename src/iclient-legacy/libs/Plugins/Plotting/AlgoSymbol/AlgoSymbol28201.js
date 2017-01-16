/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28201 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.scaleValues.push(1);

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

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        var dAllDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);
        var ddis = dAllDistance*this.scaleValues[0];

        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis/2, geoPts[0], geoPts[1]);
        var uprightpt = sidepoint.pntRight;
        var upleftpt = sidepoint.pntLeft;

        var angle = SuperMap.Plot.PlottingUtil.radian(uprightpt,upleftpt)*this.RTOD;
        var ptuphead = SuperMap.Plot.PlottingUtil.circlePoint(uprightpt,ddis/6,ddis/6,angle-170.0);
        var ptuptail = SuperMap.Plot.PlottingUtil.circlePoint(upleftpt,ddis/6,ddis/6,angle+10.0);

        var pts2D = [];
        pts2D.push(ptuphead);
        pts2D.push(uprightpt);
        pts2D.push(upleftpt);
        pts2D.push(ptuptail);

        this.scalePoints = [];
        this.addScalePoint(uprightpt);

        //创建贝赛尔图元
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(pts2D);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        var pts2D2 = SuperMap.Plot.PlottingUtil.paraLine(pts2D,dAllDistance,true);

        //创建贝赛尔图元
        var shapePts2 = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(pts2D2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts2);
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if(index != 0){
                return;
            }
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            var allDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);

            if(index == 0){
                var distance = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[1]);
                var dScaleValue = (distance*2)/allDistance;
                this.scaleValues[0] = dScaleValue;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol28201"
});