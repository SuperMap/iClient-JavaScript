/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17600 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues = [];
        this.scaleValues.push(0.1);
        this.scaleValues.push(0);
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

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};

        var dScale = this.scaleValues[0];
        var dDistance = dScale * allDistance;

        //计算平行线
        var paraPntsLeft = [], paraPntsRight = [];
        paraPntsLeft  = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance,true);
        paraPntsRight = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dDistance, false);

        var scalePoint = new SuperMap.Geometry.Point(paraPntsLeft[0].x,paraPntsLeft[0].y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;
        this.scalePoints.push(scalePoint);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, paraPntsLeft);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, paraPntsRight);

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd   = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;

        //计算左边的符号
        //符号中心点
        var leftCenter = new SuperMap.Geometry.Point(0.3*allDistance,0);
        var tempLeftCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,leftCenter,angle);

        //圆
        var circlePt = new SuperMap.Geometry.Point(0,0.7*dDistance);
        var tempCirclePt = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,circlePt,angle);

        var pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempLeftCenter.x,tempLeftCenter.y));
        pts2D.push(new SuperMap.Geometry.Point(tempCirclePt.x,tempCirclePt.y));

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, pts2D, style);

        //横线
        var pt1 = new SuperMap.Geometry.Point( 0.7*dDistance,0.7*dDistance);
        var pt2 = new SuperMap.Geometry.Point(-0.7*dDistance,0.7*dDistance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt1,angle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempLeftCenter,pt2,angle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt1.x,tempPt1.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt2.x,tempPt2.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算右边的符号
        //符号中心点
        var rightCenter = new SuperMap.Geometry.Point(0.7*allDistance,0);
        var tempRightCenter = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,rightCenter,angle);

        //矩形
        var pt3 = new SuperMap.Geometry.Point( 0.7*dDistance, 0.7*dDistance);
        var pt4 = new SuperMap.Geometry.Point( 0.7*dDistance,-0.7*dDistance);
        var pt5 = new SuperMap.Geometry.Point(-0.7*dDistance,-0.7*dDistance);
        var pt6 = new SuperMap.Geometry.Point(-0.7*dDistance, 0.7*dDistance);

        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt3,angle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt4,angle);
        var tempPt5 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt5,angle);
        var tempPt6 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt6,angle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt3.x,tempPt3.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt4.x,tempPt4.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt5.x,tempPt5.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt6.x,tempPt6.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt3.x,tempPt3.y));

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //矩形
        var pt7  = new SuperMap.Geometry.Point( 0.3*dDistance, 0.3*dDistance);
        var pt8  = new SuperMap.Geometry.Point( 0.3*dDistance,-0.3*dDistance);
        var pt9  = new SuperMap.Geometry.Point(-0.3*dDistance,-0.3*dDistance);
        var pt10 = new SuperMap.Geometry.Point(-0.3*dDistance, 0.3*dDistance);

        var tempPt7  = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt7,angle);
        var tempPt8  = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt8,angle);
        var tempPt9  = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt9,angle);
        var tempPt10 = SuperMap.Plot.PlottingUtil.coordinateTrans(tempRightCenter,pt10,angle);

        pts2D = [];
        pts2D.push(new SuperMap.Geometry.Point(tempPt7.x,tempPt7.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt8.x,tempPt8.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt9.x,tempPt9.y));
        pts2D.push(new SuperMap.Geometry.Point(tempPt10.x,tempPt10.y));

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D, style);

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
                var startPt = geoPts[0];
                var endPt = geoPts[1];

                var projectPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, startPt, endPt);
                var dLineDistance = SuperMap.Plot.PlottingUtil.distance(pt, projectPt);

                //更新第0个比例值
                this.scaleValues[0] = dLineDistance/allDistance;
            }
        }

        this.calculateParts();
    },


    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol17600"
});
