
/**
 * Class: SuperMap.Geometry.Runway
 * AirLineStation对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.Runway = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * Constructor: SuperMap.Geometry.Runway
     * 创建一个AirLineStation对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.Runway>} 新的标绘对象。
     */
    initialize:function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.RUNWAY;
        this.symbolType = SuperMap.Plot.SymbolType.RUNWAY;
        this.symbolName = "Runway";

        this.scaleValues.push(0.2);

        this.minEditPts = 2;
        this.maxEditPts = 2;
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.AlgoSymbol.prototype.destroy.apply(this, arguments);
    },

    /**
    * Method: calculateParts
    * 重写了父类的方法
    */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length >= this.minEditPts){

            var startPt = this.controlPoints[0];
            var endPt = this.controlPoints[1];

            var width = SuperMap.Plot.PlottingUtil.distance(startPt, endPt);
            var height = this.scaleValues[0]*width;

            var upPts = SuperMap.Plot.PlottingUtil.parallel(this.controlPoints, height/2);
            var downPts = SuperMap.Plot.PlottingUtil.parallel(this.controlPoints, -height/2);

            var angle = SuperMap.Plot.PlottingUtil.radian(startPt, endPt)*180/Math.PI;

            var leftArcPts = [];
            for(var i = angle+90; i <= angle+270; i += 10){
                var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(startPt,height/2,height/2,i);
                leftArcPts.push(tempPt);
            }

            var rightArcPts = [];
            for(var m = angle-90; m <= angle+90; m += 10){
                var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(endPt,height/2,height/2,m);
                rightArcPts.push(tempPt);
            }

            var pts = [];
            pts = pts.concat(leftArcPts);
            pts = pts.concat(downPts);
            pts = pts.concat(rightArcPts);
            pts = pts.concat(upPts);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts);

            var scalePoint1 = new SuperMap.Geometry.Point(leftArcPts[0].x,leftArcPts[0].y);
            this.addScalePoint(scalePoint1);
        }
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
            if(index == 0) {
                var radius = SuperMap.Plot.PlottingUtil.distance(pt, this.controlPoints[0]);
                var allDis = SuperMap.Plot.PlottingUtil.distance(this.controlPoints[0], this.controlPoints[1]);

                this.scaleValues[0] = radius*2 / allDis;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.Runway"
});
