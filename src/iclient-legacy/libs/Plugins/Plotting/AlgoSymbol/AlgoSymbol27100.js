/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol27100 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{


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
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues.push(0.1);
        this.scaleValues.push(0.2);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 7700));
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

        var startPt = geoPts[0];
        var endPt   = geoPts[1];

        var dDistance = SuperMap.Plot.PlottingUtil.distance(startPt, endPt);
        var dRadius = dDistance * this.scaleValues[0];
        var angle = SuperMap.Plot.PlottingUtil.radian(startPt,endPt)*180/Math.PI;

        var startResult = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,endPt,startPt);
        var startLeftPt  = startResult.pntLeft;
        var startRightPt = startResult.pntRight;

        var endResult = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,startPt,endPt);
        var endLeftPt  = endResult.pntLeft;
        var endRightPt = endResult.pntRight;

        var symbolSize = dDistance * this.scaleValues[1];

        var upLineMidPt = new SuperMap.Geometry.Point((startRightPt.x+endLeftPt.x)/2,(startRightPt.y+endLeftPt.y)/2);

        var upLinePt1 = SuperMap.Plot.PlottingUtil.LinePnt(startRightPt,endLeftPt, (dDistance-symbolSize)/2-0.04*dDistance);
        var upLinePt2 = SuperMap.Plot.PlottingUtil.LinePnt(startRightPt,endLeftPt, dDistance/2+symbolSize/2+0.04*dDistance);

        var pts2D = [];
        pts2D.push(upLinePt1);
        for(var i = angle+90; i < angle+270; i += 4){
            var pt = SuperMap.Plot.PlottingUtil.circlePoint(startPt, dRadius, dRadius, i);
            pts2D.push(pt);
        }
        pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(startPt, dRadius, dRadius, angle+270));

        for(var i = angle-90; i < angle+90; i+=4){
            var pt = SuperMap.Plot.PlottingUtil.circlePoint(endPt, dRadius, dRadius, i);
            pts2D.push(pt);
        }
        pts2D.push(SuperMap.Plot.PlottingUtil.circlePoint(endPt, dRadius, dRadius, angle+90));
        pts2D.push(upLinePt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算子标号
        if (this.subSymbols.length > 0) {
            this.computeSubSymbol(this.subSymbols[0], upLineMidPt, symbolSize, angle+90);
        }

        this.addScalePoint(startLeftPt);
        this.addScalePoint(SuperMap.Plot.PlottingUtil.circlePoint(upLineMidPt, symbolSize/2, symbolSize/2, angle+180));

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
            if (this.minEditPts > geoPts.length)
            {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            if(0 === dDistance)
            {
                return;
            }

            var startPt = geoPts[0];
            var endPt = geoPts[1];

            if(0 === index)
            {
                var tempPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, startPt, endPt);
                var dis = SuperMap.Plot.PlottingUtil.distance(pt, tempPt);
                var dScale = dis/dDistance;
                this.scaleValues[0] = dScale;
            }
            else if(1 === index){
                var tempPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, startPt, endPt);
                var midPt = new SuperMap.Geometry.Point((startPt.x+endPt.x)/2, (startPt.y+endPt.y)/2);
                var dis = SuperMap.Plot.PlottingUtil.distance(tempPt, midPt);
                var dScale = 2*dis/dDistance;

                if(dScale > 0.8){
                    dScale = 0.8;
                }

                this.scaleValues[1] = dScale;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol26800"
});