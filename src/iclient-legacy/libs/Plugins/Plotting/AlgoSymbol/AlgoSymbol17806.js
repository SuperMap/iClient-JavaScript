/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17806 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 3;

        this.scaleValues = [];
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.0);
        this.scaleValues.push(0.1);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = this.GetGoPts();
        if(geoPts.length < 2){
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues = [];
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.0);
            this.scaleValues.push(0.1);
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var symbolPt;
        var dDistance = 0.0;
        var dScaleDis = 0.0;

        if(geoPts.length == 2){
            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, geoPts);

            var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
            var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
            var dRadius = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
            dDistance = 2.0*dRadius;

            symbolPt = new SuperMap.Geometry.Point(pt1.x+dRadius*dScale0,pt1.y+dRadius*dScale1);
            var dSymbolRadius = 2.0*dRadius*dScale2/0.28/2.0;
            dScaleDis = dSymbolRadius;
            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dSymbolRadius,dSymbolRadius,0);

            var pts2D = [];
            pts2D.push(symbolPt.clone());
            pts2D.push(pt3.clone());

            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, pts2D);
        }else{
            this.addCell(SuperMap.Plot.SymbolType.ELLIPSESYMBOL, geoPts);

            var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
            var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
            var pt3 = new SuperMap.Geometry.Point(geoPts[2].x,geoPts[2].y);
            var rx = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
            var ry = SuperMap.Plot.PlottingUtil.distance(pt1, pt3);

            dDistance = rx+ry;
            symbolPt = new SuperMap.Geometry.Point(pt1.x+(rx+ry)*dScale0,pt1.y+(rx+ry)*dScale1);
            var dSymbolRx = (rx+ry)*dScale2/0.21/2.0;
            var dSymbolRy = (rx+ry)*dScale2/0.38/2.0;
            dScaleDis = dSymbolRx;

            var pt4 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dSymbolRx,dSymbolRx,0);
            var pt5 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dSymbolRy,dSymbolRy,90);

            var pts2D = [];
            pts2D.push(symbolPt.clone());
            pts2D.push(pt4.clone());
            pts2D.push(pt5.clone());

            this.addCell(SuperMap.Plot.SymbolType.ELLIPSESYMBOL, pts2D);
        }

        this.scalePoints = [];
        var scalePt1 = new SuperMap.Geometry.Point(symbolPt.x + 0.1 * dDistance, symbolPt.y);
        scalePt1.isScalePoint = true;
        scalePt1.tag = 0;
        this.scalePoints.push(scalePt1);
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, dScaleDis, dScaleDis, 90);
        scalePt2.isScalePoint = true;
        scalePt2.tag = 1;
        this.scalePoints.push(scalePt2);
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
        if(pt.isScalePoint){
            if(index != 0 && index != 1){
                return;
            }

            var geoPts = this.GetGoPts();
            var pts2D = [];

            //获得任意多边形的中心
            var centerPt = geoPts[0].clone();
            var dDistance = 0.0;
            if(geoPts.length == 2){
                dDistance = 2 * SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
            }else{
                dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]) + SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[2]);
            }

            if(dDistance == 0){
                return;
            }

            if(index == 0){
                var dScale2 = this.scaleValues[2];
                var dDis = dScale2 * dDistance;
                var dScale0 = (pt.x-0.1*dDis-centerPt.x)/dDistance;
                this.scaleValues[0] = dScale0;
                var dScale1 = (pt.y-centerPt.y)/dDistance;
                this.scaleValues[1] = dScale1;
            }
            else if(index == 1){
                var dScale0 = this.scaleValues[0];
                var dScale1 = this.scaleValues[1];
                var symbolPt = new SuperMap.Geometry.Point(centerPt.x+dDistance*dScale0,centerPt.y+dDistance*dScale1);
                var dDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,pt);
                var dScale2 = 0.0;
                if(geoPts.length == 2){
                    dScale2 = 0.28*2.0*dDis/dDistance;
                }else{
                    dScale2 = 0.21*2.0*dDis/dDistance;
                }
                this.scaleValues[2] = dScale2;
            }
        }

        this.calculateParts();
    },

    GetGoPts: function () {
        var pts2D = [];
        var nCount = this.controlPoints.length;
        if(nCount < 2){
            return pts2D;
        }
        pts2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(pts2D);
        if(pts2D.length == 1){
            pts2D = [];
        }
        return pts2D;
    }
})