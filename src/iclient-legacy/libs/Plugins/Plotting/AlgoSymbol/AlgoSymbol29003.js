/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29003 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 99999;

        this.scaleValues.push(0.02);
        this.scaleValues.push(0);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        var  geoPts = this.controlPoints;

        if (this.controlPoints <2)
        {
            return;
        }

        if (this.scaleValues.length !== 2)
        {
            this.scaleValues = [];
            this.scaleValues.push(0.02);
            this.scaleValues.push(0);
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        //箭头相关
        //var scale = this.getSubSymbolScaleValue()*0.5;
        var dBezierDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];

        var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var lineLength = dScale0 * allPolyLineDistance;

        var dLineDistance = 0.083 * allPolyLineDistance;
        var firstLineDistance = 0.0;     //第一条折线和第二条折线距离起点的距离

        var dStartLength = 0.01 * allPolyLineDistance;
        var pos = 0, index, midPt;

        for(var d = 0.0; d <= dBezierDistance; d += dLineDistance){
            if(pos == 1 ||pos == 11 ||pos == 6)
            {
                firstLineDistance = d + dStartLength;
                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(firstLineDistance, shapePts);
                if(!ptsindex.bfind) {
                    return;
                }
                index = ptsindex.index;
                midPt = ptsindex.pts;

                var firstLinePts = [];

                var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, shapePts[index], midPt);
                if(0 == dScale1) {
                    firstLinePts.push(sidepoint.pntLeft);
                }
                else {
                    firstLinePts.push(sidepoint.pntRight);
                }

                if(pos == 1){
                    this.scalePoints = [];
                    this.addScalePoint(firstLinePts[0]);
                }

                firstLinePts.push(midPt);

                var sidepointup = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, firstLinePts[0], firstLinePts[1]);
                var sidepointdown = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, firstLinePts[1], firstLinePts[0]);

                var ptsarr =  [];
                ptsarr.push(sidepointup.pntLeft);
                ptsarr.push(sidepointup.pntRight);
                ptsarr.push(sidepointdown.pntLeft);
                ptsarr.push(sidepointdown.pntRight);
                ptsarr.push(sidepointup.pntLeft.clone());

                var style = {SurroundLineLimit: true,lineTypeLimit:true, fillLimit:true, fillStyle:0};
                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, ptsarr, style);
            }
            pos++;
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
            if(0 !== index) {
                return;
            }

            var geoPts = this.controlPoints;
            if (2 > geoPts.length) {
                return;
            }
            //创建贝塞尔曲线
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);

            if (index == 0)
            {
                var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

                var firstScaleValue = this.scaleValues[0];

                var allPolyLineDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
                var lineLength = firstScaleValue * allPolyLineDistance;

                var dStartLength = 0.01 * allPolyLineDistance;
                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dStartLength, shapePts);
                if(!ptsindex.bfind) {
                    return;
                }
                var midPt = ptsindex.pts;
                var index = ptsindex.index;

                var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(lineLength, shapePts[index], midPt);
                var firstLinePt = sidepoint.pntLeft;
                var footPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, firstLinePt, midPt);
                var dLineDistance = SuperMap.Plot.PlottingUtil.distance(footPt, midPt);
                var bright = SuperMap.Plot.PlottingUtil.PointIsRightToLine(footPt, midPt,pt);

                if (bright) {
                    this.scaleValues[1] = 1.0;
                }
                else {
                    this.scaleValues[1] = 0.0;
                }

                this.scaleValues[0] = dLineDistance/allPolyLineDistance;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol29003"
});
