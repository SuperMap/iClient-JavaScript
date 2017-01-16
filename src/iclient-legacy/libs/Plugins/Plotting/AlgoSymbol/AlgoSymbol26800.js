/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol26800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{


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
        this.maxEditPts = 3;

        this.scaleValues = [];

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (2 === this.controlPoints.length) {
            this.scaleValues.push(1.0);
            this.scaleValues.push(0.0);
            this.scaleValues.push(2.0 * Math.PI);
            //长度
            var allDistance = 0;
            for (var i = 0, len = geoPts.length - 1; i < len; i++) {
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
            }
            var dRadius = allDistance * this.scaleValues[0];

            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, this.controlPoints);
            this.controlPoints = new SuperMap.Geometry.Point(geoPts[0].x + dRadius, geoPts[0].y);

            //三个点的情况下
        } else if (3 === this.controlPoints.length) {

            var pt1 = new SuperMap.Geometry.Point(this.controlPoints[0].x,this.controlPoints[0].y);
            var pt2 = new SuperMap.Geometry.Point(this.controlPoints[1].x,this.controlPoints[1].y);
            var pt3 = new SuperMap.Geometry.Point(this.controlPoints[2].x,this.controlPoints[2].y);

            var dDistance = SuperMap.Plot.PlottingUtil.distance(pt2,pt3);
            if (0 >= dDistance) {
                return;
            }
            this.scaleValues = [];
            var dRadiusr = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
            //缩放比例
            var dScaler = dRadiusr / dDistance;
            this.scaleValues.push(dScaler);

            var angle1 = SuperMap.Plot.PlottingUtil.radian(pt1,pt2) * 180 / Math.PI;
            if (angle1 > 90.0) {
                angle1 -= 90;
            }
            else {
                angle1 = 270 + angle1;
            }

            this.scaleValues.push(angle1 * (Math.PI / 180));

            var angle2 = SuperMap.Plot.PlottingUtil.radian(pt1,pt3) * 180 / Math.PI;
            if (angle2 > 90.0) {
                angle2 -= 90;
            } else {
                angle2 = 270 + angle2;
            }
            this.scaleValues.push(angle2 * (Math.PI / 180));

            var dRadius = this.scaleValues[0] * dDistance;
            var dStartAngleR = this.scaleValues[1] * (180 / Math.PI ) + 90;
            var dEndAngleR = this.scaleValues[2] * (180 / Math.PI) + 90;
            if (dStartAngleR < dEndAngleR) {
                dStartAngleR += 360;
            }
            var pts2D = [];
            for (var i = dStartAngleR; i >= dEndAngleR; i -= 4) {
                var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(this.controlPoints[0], dRadius, dRadius, i);
                pts2D.push(tempPt2D);
            }
            if (i != dEndAngleR) {
                var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(this.controlPoints[0], dRadius, dRadius, dEndAngleR);
                pts2D.push(tempPt2D);
            }

            pts2D.push(geoPts[0]);
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);
        }

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26800"
});