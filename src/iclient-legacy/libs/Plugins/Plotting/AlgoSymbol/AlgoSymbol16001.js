/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16001 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 1000;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length < this.minEditPts) {
            return;
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var startPt = geoPts[0];
        var secondPt = geoPts[1];
        var dis = SuperMap.Plot.PlottingUtil.distance(startPt,secondPt);
        var firstLineDis = dis * 0.05;

        var leftPts = SuperMap.Plot.PlottingUtil.paraLine(geoPts,firstLineDis*0.5,true);
        var rightPts = SuperMap.Plot.PlottingUtil.paraLine(geoPts,firstLineDis*0.5,false);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, leftPts);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, rightPts);

        var leftLineDis = 0;
        for(var i = 0; i < leftPts.length-1; i++){
            leftLineDis += SuperMap.Plot.PlottingUtil.distance(leftPts[i],leftPts[i+1]);
        }

        var scaleValue = this.getSubSymbolScaleValue();
        //实心三角形的高度
        var triangleHeight = leftLineDis * scaleValue *0.5;
        //实心三角形的宽度
        var step = triangleHeight * 6;

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};

        for(var d = triangleHeight; d <= leftLineDis-triangleHeight/2; d += step){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(leftPts,d);
            if(-1 === result.index){
                continue;
            }

            //计算三角形的尖角顶点
            var angle = SuperMap.Plot.PlottingUtil.radian(leftPts[result.index],leftPts[result.index+1])*180/Math.PI;
            var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(result.pt, triangleHeight, triangleHeight, angle+90);
            var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(result.pt, 0.25*triangleHeight,0.25*triangleHeight, angle);
            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(result.pt, 0.25*triangleHeight,0.25*triangleHeight, angle+180);

            var trianglePts = [];
            trianglePts.push(pt1);
            trianglePts.push(pt2);
            trianglePts.push(pt3);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, trianglePts,style);
        }

        for(var d = triangleHeight; d <= leftLineDis-triangleHeight/2; d += step){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(rightPts,d);
            if(-1 === result.index){
                continue;
            }

            //计算三角形的尖角顶点
            var angle = SuperMap.Plot.PlottingUtil.radian(rightPts[result.index],rightPts[result.index+1])*180/Math.PI;
            var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(result.pt, triangleHeight, triangleHeight, angle+270);
            var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(result.pt, 0.25*triangleHeight,0.25*triangleHeight, angle);
            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(result.pt, 0.25*triangleHeight,0.25*triangleHeight, angle+180);

            var trianglePts = [];
            trianglePts.push(pt1);
            trianglePts.push(pt2);
            trianglePts.push(pt3);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, trianglePts,style);
        }

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16001"
});
