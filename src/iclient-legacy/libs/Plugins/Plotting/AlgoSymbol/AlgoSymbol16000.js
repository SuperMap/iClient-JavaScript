/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16000 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues.push(1);
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

        //创建左侧折线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, leftPts);
        //创建右侧折线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, rightPts);

        var pts = [];
        if(this.scaleValues[0] < 0){
            pts = pts.concat(rightPts);
        }
        else{
            pts = pts.concat(leftPts);
        }

        var allDistance = 0;
        for(var i = 0; i < pts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(pts[i],pts[i+1]);
        }

        var scaleValue = this.getSubSymbolScaleValue();
        //实心三角形的高度
        var triangleHeight = allDistance * scaleValue*0.5;
        //实心三角形的宽度
        var triangleWidth = allDistance * scaleValue*0.125;

        //两个实心三角形之间的距离
        var triangleStepDis = allDistance * 0.1;

        var startLen = allDistance * scaleValue * 0.5;

        for(var d = 0.0; d <= allDistance; d += triangleStepDis){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pts,d + startLen);
            if(-1 === result.index){
                continue;
            }

            //计算三角形的尖角顶点
            var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(triangleHeight,pts[result.index],result.pt);
            var scalePt;
            if(this.scaleValues[0] > 0){
                scalePt = new SuperMap.Geometry.Point(leftAndRightPt.pntLeft.x,leftAndRightPt.pntLeft.y);
            }
            else{
                scalePt = new SuperMap.Geometry.Point(leftAndRightPt.pntRight.x,leftAndRightPt.pntRight.y);
            }

            //求三角形的底面两个点
            var leftAndRightPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(triangleWidth,scalePt,result.pt);

            var trianglePts = [];
            trianglePts.push(leftAndRightPt1.pntRight);
            trianglePts.push(scalePt);
            trianglePts.push(leftAndRightPt1.pntLeft);

            if(0 === d){
                var scalePoint1 = new SuperMap.Geometry.Point(scalePt.x,scalePt.y);
                scalePoint1.isScalePoint = true;
                scalePoint1.tag = 0;
                this.scalePoints.push(scalePoint1);
            }

            var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, trianglePts, style);
        }

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
            if(0 === index)
            {
                //获取位置点
                var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

                //判断此点在左边还是又边
                var bRight =  SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[0], geoPts[1], pt);

                if(bRight)
                {
                    this.scaleValues[0] = -1.0;
                }
                else
                {
                    this.scaleValues[0] = 1.0;
                }
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16000"
});
