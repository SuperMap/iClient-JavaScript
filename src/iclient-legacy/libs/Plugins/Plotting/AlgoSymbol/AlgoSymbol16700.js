/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol16700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.scaleValues.push(0.1);
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
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var allDistance = 0;
        for(var i = 0; i < geoPts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
        }

        var dScale0 = this.scaleValues[0];
        var dDistance0 = dScale0 * allDistance;
        var dScale1 = this.scaleValues[1];
        var dDistance1 = dScale1 * allDistance;

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd   = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);

        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;

        var leftPt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dDistance0,dDistance0,angle+90);
        var leftPt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dDistance1,dDistance1,angle+90);

        var rightPt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,dDistance0,dDistance0,angle+90);
        var rightPt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,dDistance1,dDistance1,angle+90);

        var pts2D = [];
        pts2D.push(leftPt2);
        pts2D.push(leftPt1);
        pts2D.push(rightPt1);
        pts2D.push(rightPt2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, SuperMap.Plot.PlottingUtil.clonePoints(pts2D));

        //竖线
        pts2D = [];
        pts2D.push(leftPt2);
        pts2D.push(geoPts[0]);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, SuperMap.Plot.PlottingUtil.clonePoints(pts2D));

        //竖线
        pts2D = [];
        pts2D.push(rightPt2);
        pts2D.push(geoPts[1]);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, SuperMap.Plot.PlottingUtil.clonePoints(pts2D));

        //添加比例点
        var scalePoint = new SuperMap.Geometry.Point(leftPt1.x,leftPt1.y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;
        this.scalePoints.push(scalePoint);

        var scalePoint2 = new SuperMap.Geometry.Point(leftPt2.x,leftPt2.y);
        scalePoint2.isScalePoint = true;
        scalePoint2.tag = 1;
        this.scalePoints.push(scalePoint2);

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
        this.isEdit = true;

        if(pt.isScalePoint === true){
            //获取位置点
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

            var allDistance = 0;
            for(var i = 0; i < geoPts.length-1; i++){
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
            }

            if(0 == index)     //修改第0个比例点
            {
                var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
                var dScale0 = distance/allDistance;
                if(dScale0 < this.scaleValues[1])
                {
                    return;
                }

                this.scaleValues[0] = dScale0;
            }
            else if(1 == index)        //修改第1个比例点
            {
                var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
                var dScale1 = distance/allDistance;

                if(this.scaleValues[0] < dScale1)
                {
                    return;
                }

                this.scaleValues[1] = dScale1;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol16700"
});
