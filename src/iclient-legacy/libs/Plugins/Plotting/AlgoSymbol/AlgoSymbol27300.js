/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol27300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.maxEditPts = 30;

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 1500));
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

        var allDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }

        var shapePts = [];
        if (3 >= geoPts.length) {
            //计算猪腰子拟合点
            var primitives = new SuperMap.Geometry.Primitives();
            shapePts = primitives.getKendyShapePts(geoPts);
            shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        }
        else {
            geoPts.push(geoPts[0]);
            shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        }


        //求猪腰子或者闭合贝赛尔曲线拟合点的最大、最小x、y坐标
        var minX = shapePts[0].x;
        var maxX = shapePts[0].x;
        var minY = shapePts[0].y;
        var maxY = shapePts[0].y;

        for(var i = 0; i < shapePts.length; i++)
        {
            if(minX > shapePts[i].x)
            {
                minX = shapePts[i].x;
            }

            if(maxX < shapePts[i].x)
            {
                maxX = shapePts[i].x;
            }

            if(minY > shapePts[i].y)
            {
                minY = shapePts[i].y;
            }

            if(maxY < shapePts[i].y)
            {
                maxY = shapePts[i].y;
            }
        }
        //几何中心点
        var ptCenter = new SuperMap.Geometry.Point((maxX+minX)/2,(maxY+minY)/2);
        var ptCellCenter = new SuperMap.Geometry.Point(ptCenter.x, 0.0);
        var nCount = 0;
        var nCellCenterIndex = -1;
        for (var i = 0; i < shapePts.length - 1; i++) {
            //求两条直线之间的交点
            var intersectPt = SuperMap.Plot.PlottingUtil.intersectLines(ptCenter, new SuperMap.Geometry.Point(ptCenter.x, ptCenter.y + 1), shapePts[i], shapePts[i + 1]);
            if (!intersectPt.isIntersectLines) {
                continue;
            }

            if (!SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(intersectPt.intersectPoint, shapePts[i], shapePts[i + 1])) {
                continue;
            }
            if (ptCellCenter.x !== intersectPt.intersectPoint.x) {
                continue;
            }
            if (0 == nCount) {
                ptCellCenter.y = intersectPt.intersectPoint.y;
                nCellCenterIndex = i;
            } else {
                if (ptCellCenter.y < intersectPt.intersectPoint.y) {
                    ptCellCenter.y = intersectPt.intersectPoint.y;
                    nCellCenterIndex = i;
                }
            }
            nCount++;
        }
        //求定位点的总长度
        var distance = this.getSubSymbolScaleValue() * allDistance;
        //计算猪腰子或者闭合贝赛尔曲线
        var tempPts2D = [];
        tempPts2D.push(ptCellCenter);

        for (var i = nCellCenterIndex + 1; i < shapePts.length - 1; i++) {
            tempPts2D.push(new SuperMap.Geometry.Point(shapePts[i].x, shapePts[i].y));
        }
        for (var i = 0; i <= nCellCenterIndex; i++) {
            tempPts2D.push(new SuperMap.Geometry.Point(shapePts[i].x, shapePts[i].y));
        }

        var tempDis = 0.8 * distance;
        //顺序截取一段
        var resultPt1 = SuperMap.Plot.PlottingUtil.findPointInPolyLine(tempPts2D, tempDis);
        if (resultPt1.index === -1) {
            return;
        }

        var tempPts2D2 = [];
        tempPts2D2.push(resultPt1.pt);

        for (var i = resultPt1.index + 1; i < tempPts2D.length - 1; i++) {
            tempPts2D2.push(tempPts2D[i]);
        }

        //将剩下的点串逆序，再截取一段
        tempPts2D = [];
        for (var i = tempPts2D2.length - 1; i > 0; i--) {
            tempPts2D.push(tempPts2D2[i]);
        }

        var resultPt2 = SuperMap.Plot.PlottingUtil.findPointInPolyLine(tempPts2D, tempDis);
        if (resultPt2.index === -1) {
            return;
        }

        tempPts2D2 = [];
        tempPts2D2.push(resultPt2.pt);
        for (var i = resultPt2.index + 1; i < tempPts2D.length - 1; i++) {
            tempPts2D2.push(tempPts2D[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, tempPts2D2);

        if (this.subSymbols && null !== this.subSymbols && this.subSymbols.length >= 0) {
            this.computeSubSymbol(this.subSymbols[0], ptCellCenter, distance, 0);
        }
        this.clearBounds();
    },


    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol27300"
});