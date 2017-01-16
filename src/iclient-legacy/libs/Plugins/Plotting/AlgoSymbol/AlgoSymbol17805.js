/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17805 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        if(geoPts.length == 2){
            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, geoPts);
        }else{
            this.addCell(SuperMap.Plot.SymbolType.ELLIPSESYMBOL, geoPts);
        }

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);

        var dAllDistance = 0.0;
        if(geoPts.length == 2){
            dAllDistance = 2 * SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
        }else {
            dAllDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]) + SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[2]);
        }

        if(dAllDistance == 0){
            return;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(ptStart.x+dAllDistance*dScale0,ptStart.y+dAllDistance*dScale1);
        var dScaleDis = dAllDistance*dScale2;
        var dis = 3*dScaleDis;

        //子符号
        var pt1 = new SuperMap.Geometry.Point(-0.5*dis, 0.3*dis);
        var pt2 = new SuperMap.Geometry.Point(-0.5*dis, -0.3*dis);
        var pt3 = new SuperMap.Geometry.Point(0.5*dis, -0.3*dis);
        var pt4 = new SuperMap.Geometry.Point(0.5*dis, 0.3*dis);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt1, 0);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt2, 0);
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt3, 0);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt4, 0);

        var pts2D = [];
        pts2D.push(tempPt1.clone());
        pts2D.push(tempPt2.clone());
        pts2D.push(tempPt3.clone());
        pts2D.push(tempPt4.clone());

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);

        //
        var pt5 = new SuperMap.Geometry.Point(-0.3*dis,0.3*dis);
        var pt6 = new SuperMap.Geometry.Point(-0.3*dis,0.5*dis);

        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt5, 0);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt6, 0);

        pts2D = [];
        pts2D.push(tempPt5.clone());
        pts2D.push(tempPt6.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var pt7 = new SuperMap.Geometry.Point(-0.3*dis,-0.3*dis);
        var pt8 = new SuperMap.Geometry.Point(-0.3*dis,-0.5*dis);

        var tempPt7 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt7, 0);
        var tempPt8 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt8, 0);

        pts2D = [];
        pts2D.push(tempPt7.clone());
        pts2D.push(tempPt8.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var pt9 = new SuperMap.Geometry.Point(0.3*dis, 0.3*dis);
        var pt10 = new SuperMap.Geometry.Point(0.3*dis, 0.5*dis);

        var tempPt9 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt9, 0);
        var tempPt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt10, 0);

        pts2D = [];
        pts2D.push(tempPt9.clone());
        pts2D.push(tempPt10.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //
        var pt11 = new SuperMap.Geometry.Point(0.3*dis,-0.3*dis);
        var pt12 = new SuperMap.Geometry.Point(0.3*dis,-0.5*dis);

        var tempPt11 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt11, 0);
        var tempPt12 = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt, pt12, 0);

        pts2D = [];
        pts2D.push(tempPt11.clone());
        pts2D.push(tempPt12.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        this.scalePoints = [];
        var scalePt1 = new SuperMap.Geometry.Point(symbolPt.x + 0.1 * dis, symbolPt.y);
        scalePt1.isScalePoint = true;
        scalePt1.tag = 0;
        this.scalePoints.push(scalePt1);
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, 0.5 * dis, 0.5 * dis, 90);
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
                var dScale2 = 2.0/3.0*dDis/dDistance;
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