/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol44400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        this.minEditPts = 3;
        this.maxEditPts = 9999;

        this.scaleValues = [];
        this.scaleValues[0] = 0;
        this.scaleValues[1] = 0;
        this.scaleValues[2] = 0.1;

        if(null !== this.feature){
            this.feature.style.strokeColor = "#0000ff";
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if (this.controlPoints.length < 3)
        {
            return;
        }

        if(this.scaleValues.length < 3){
            this.scaleValues = [];
            this.scaleValues[0] = 0;
            this.scaleValues[1] = 0;
            this.scaleValues[2] = 0.1;
        }

        // if(!this.isEdit){
        //     this.scaleValues[2] = this.getSubSymbolScaleValue();
        // }

        var pts2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D,{fill:false});

        //计算多边形中的横线
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(pts2D);
        var polygonCenterPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var dSpaceDis = dAllDistance * dScale2;
        var centerPt =  new SuperMap.Geometry.Point(polygonCenterPt.x+dAllDistance*dScale0,polygonCenterPt.y+dAllDistance*dScale1);
        var tempPt =  new SuperMap.Geometry.Point(centerPt.x+1,centerPt.y);
        var tempPts2D = [];
        pts2D.push(pts2D[0].clone());//首尾相连
        for(var i = 0; i < pts2D.length-1; i++)
        {
            var ptResult = SuperMap.Plot.PlottingUtil.intersectLines(centerPt,tempPt,pts2D[i],pts2D[i+1]);
            if(!ptResult.isIntersectLines)
            {
                continue;
            }

            if(!SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(ptResult.intersectPoint, pts2D[i],pts2D[i+1]))
            {
                continue;
            }

            tempPts2D.push(ptResult.intersectPoint);
        }

        if(0 >= tempPts2D.length)
        {
            return;
        }

        var ptCenterLeft = tempPts2D[0].clone();
        var ptCenterRight = tempPts2D[0].clone();
        for(i = 0; i < tempPts2D.length; i++)
        {
            if(ptCenterLeft.x > tempPts2D[i].x)
            {
                ptCenterLeft = tempPts2D[i].clone();
            }

            if(ptCenterRight.x < tempPts2D[i].x)
            {
                ptCenterRight = tempPts2D[i].clone();
            }
        }

        var cellpts  = [];
        //横线(左)
        var pt1 =  new SuperMap.Geometry.Point(centerPt.x-dSpaceDis/2,ptCenterLeft.y);
        if(pt1.x <= ptCenterRight.x && pt1.x >= ptCenterLeft.x)
        {
            cellpts = [];
            cellpts.push(ptCenterLeft);
            cellpts.push(pt1);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts);
        }

        //横线(右)
        var pt2 =  new SuperMap.Geometry.Point(centerPt.x+dSpaceDis/2,ptCenterRight.y);
        if(pt2.x <= ptCenterRight.x && pt2.x >= ptCenterLeft.x)
        {
            cellpts = [];
            cellpts.push(ptCenterRight);
            cellpts.push(pt2);
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,cellpts);
        }

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(centerPt);
        var scalept2 = SuperMap.Plot.PlottingUtil.circlePoint(centerPt,dSpaceDis/2,dSpaceDis/2,90);
        this.addScalePoint(scalept2);
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
        if (pt.isScalePoint === true) {
            if (index != 0 && index != 1) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (3 > geoPts.length) {
                return;
            }


            // var dOutRecDis = SuperMap.Plot.PlottingUtil.GetOutRectangleDis(geoPts);
            // if(0 == dOutRecDis)
            // {
            //     return;
            // }

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

            var scalePt2D = pt;
            if(0 == index)
            {
                var dScale0 = (scalePt2D.x-centerPt.x)/allDistance;
                this.scaleValues[0] = dScale0;

                var dScale1 = (scalePt2D.y-centerPt.y)/allDistance;
                this.scaleValues[1] = dScale1;
            }
            else if(1 == index)
            {
                var dScale0 = this.scaleValues[0];
                var dScale1 = this.scaleValues[1];

                var symbolPt = new SuperMap.Geometry.Point(centerPt.x+dScale0*allDistance,centerPt.y+dScale1*allDistance);
                var dDis = SuperMap.Plot.PlottingUtil.distance(scalePt2D,symbolPt);
                var dScale2 = 2*dDis/allDistance;

                this.scaleValues[2] = dScale2;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol44400"
});

