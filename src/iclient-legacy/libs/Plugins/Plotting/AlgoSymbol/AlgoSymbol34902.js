/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol34902 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
       SuperMap.Geometry.AlgoSymbol34900.prototype.initialize.apply(this,arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if (this.controlPoints <2)
        {
            return;
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //箭头相关
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(allDistance / 2,shapePts);
        if(!ptsindex.bfind)
        {
            return;
        }
        var index = ptsindex.index;
        var midPt = ptsindex.pts;

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }
        var dDistance = allDistance*this.scaleValues[0];

        //计算贝赛尔曲线左侧的部分
        var pts2DLeft = [], i;
        pts2DLeft.push(midPt);
        for(i = index; i >= 0; i--)
        {
            pts2DLeft.push(shapePts[i]);
        }


        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DLeft);
        if(!ptsindex.bfind)
        {
            return;
        }
        var nIndexLeft = ptsindex.index;
        var ptLeft = ptsindex.pts;

        var pts2D = [];
        for(i = pts2DLeft.length-1; i > nIndexLeft; i--)
        {
            pts2D.push(pts2DLeft[i]);
        }
        pts2D.push(ptLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //计算贝赛尔曲线右侧的部分
        var pts2DRight = [];
        pts2DRight.push(midPt);
        for(i = index+1; i < shapePts.length; i++)
        {
            pts2DRight.push(shapePts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DRight);
        if(!ptsindex.bfind)
        {
            return;
        }
        var nIndexRight = ptsindex.index;
        var ptRight = ptsindex.pts;

        pts2D = [];
        pts2D.push(ptRight);
        for(i = nIndexRight+1; i < pts2DRight.length; i++)
        {
            pts2D.push(pts2DRight[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //中间圆
        var dRadius = 0.1*dDistance;

        var ptLeft2D = ptLeft;
        var ptRight2D = ptRight;

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(ptLeft2D,ptRight2D)*this.RTOD;
        var center = new SuperMap.Geometry.Point((ptLeft2D.x+ptRight2D.x)/2,(ptLeft2D.y+ptRight2D.y)/2);

        var circleCenter1 = SuperMap.Plot.PlottingUtil.circlePoint(center,2*dRadius,2*dRadius,tempAngle);
        var circleCenter2 = SuperMap.Plot.PlottingUtil.circlePoint(center,2*dRadius,2*dRadius,tempAngle+180);

        var circlePt1 = SuperMap.Plot.PlottingUtil.circlePoint(circleCenter1,dRadius,dRadius,0);
        pts2D = [];
        pts2D.push(circleCenter1);
        pts2D.push(circlePt1);

        var style = {surroundLineLimit:true,lineTypeLimit:true,fillLimit:true,fillStyle:0};
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,pts2D, style);

        var circlePt2 = SuperMap.Plot.PlottingUtil.circlePoint(circleCenter2,dRadius,dRadius,0);
        pts2D = [];
        pts2D.push(circleCenter2);
        pts2D.push(circlePt2);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,pts2D, style);

        var ptStart = shapePts[0].clone();
        var pt1 = shapePts[1].clone();

        //直角梯形
        var startAngle = SuperMap.Plot.PlottingUtil.radian(pt1,ptStart)*this.RTOD;

        var tempPt1 = new SuperMap.Geometry.Point(0,0.5*dDistance);
        var tempPt2 = new SuperMap.Geometry.Point(dDistance,0.5*dDistance);
        var tempPt3 = new SuperMap.Geometry.Point(1.5*dDistance,0);

        var tempPt1_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,tempPt1,startAngle);
        var tempPt1_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,tempPt2,startAngle);
        var tempPt1_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(ptStart,tempPt3,startAngle);

        pts2D = [];
        pts2D.push(shapePts[0]);
        pts2D.push(tempPt1_1);
        pts2D.push(tempPt1_2);
        pts2D.push(tempPt1_3);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D);

        //箭头
       this.addArrow(shapePts);
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34902"
});
