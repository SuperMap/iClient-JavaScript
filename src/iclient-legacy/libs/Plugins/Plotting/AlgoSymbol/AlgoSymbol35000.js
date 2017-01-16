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
SuperMap.Geometry.AlgoSymbol35000 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SCALE: 0.06,

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
        this.maxEditPts = 9999;

        this.scaleValues = [];
        this.scaleValues[0] = 0.03;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2)
        {
            return;
        }

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues[0] = 0.03;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);

        var startPt = shapePts[0];
        var startPt1 = shapePts[1];
        var endPt = shapePts[shapePts.length-1];
        var endPt1 = shapePts[shapePts.length-2];

        var startAngle = SuperMap.Plot.PlottingUtil.radian(startPt,startPt1)*this.RTOD;
        var endAngle = SuperMap.Plot.PlottingUtil.radian(endPt1,endPt)*this.RTOD;

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var dScale0 = this.scaleValues[0];
        var dDistance = allDistance * dScale0;

        //开始竖线
        var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(startPt,dDistance,dDistance,startAngle+90);
        var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(startPt,dDistance,dDistance,startAngle+270);

        var pts2D = [];
        pts2D.push(pt1);
        pts2D.push(pt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true});

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(pt2);

        //结束竖线
        var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(endPt,dDistance,dDistance,endAngle+90);
        var pt4 = SuperMap.Plot.PlottingUtil.circlePoint(endPt,dDistance,dDistance,endAngle+270);

        pts2D = [];
        pts2D.push(pt3);
        pts2D.push(pt4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true});

        //
        var nPtCount = geoPts.length;
        var nScaleCount = this.scaleValues.length;
        var i;

        if(nScaleCount != nPtCount)
        {
            this.scaleValues = [];
            this.scaleValues.push(dScale0);

            var dScale = 1.0/nPtCount;

            for(i = 0; i < nPtCount-1; i++)
            {
                this.scaleValues.push(dScale*(i+1));
            }
        }

        for(i = 0; i < nPtCount-1; i++)
        {
            var dScale = this.scaleValues[i+1];
            var distance = dScale*allDistance;

            var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(distance, shapePts);
            if(!ptsindex.bfind)
            {
                return;
            }
            var center = ptsindex.pts;
            var nIndex = ptsindex.index;

            var dWidth = this.SCALE*allDistance;
            var dHeight = dWidth*0.3;

            var angle = SuperMap.Plot.PlottingUtil.radian(shapePts[nIndex],shapePts[nIndex+1])*this.RTOD;

            var ptLine1 = new SuperMap.Geometry.Point( dWidth,-dHeight);
            var ptLine2 = new SuperMap.Geometry.Point(-dWidth,-dHeight);
            var ptLine3 = new SuperMap.Geometry.Point(-dWidth,0);
            var ptLine4 = new SuperMap.Geometry.Point( dWidth,0);

            var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(center,ptLine1,angle);
            var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(center,ptLine2,angle);
            var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(center,ptLine3,angle);
            var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(center,ptLine4,angle);

            pts2D = [];
            pts2D.push(tempPt1);
            pts2D.push(tempPt2);
            pts2D.push(tempPt3);
            pts2D.push(tempPt4);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D,{lineTypeLimit:true,fillLimit:true,fillStyle:0});
            //添加比例点
            this.addScalePoint(center);
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
            if(index < 0 || index >= this.scalePoints.length) {
                return;
            }

            var geoPts = this.controlPoints;
            if (2 > geoPts.length) {
                return;
            }

            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            if(0 == index)
            {
                var distance = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[0]);

                var dScale = distance/allDistance;

                this.scaleValues[0] = dScale;
            }
            else
            {
                var scalePt2D = pt;
                var pts = [], i;
                for(i = 0; i < shapePts.length; i++)
                {
                    pts.push(shapePts[i]);
                }

                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt = new SuperMap.Geometry.Point(0.0,0.0);

                for(i = 0; i < pts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(pts[i]);
                    tempPts.push(pts[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,pts[i],pts[i+1]);

                    var pointonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                    if(!pointonline.isOnPolyLine)
                    {
                        continue;
                    }

                    var tempDistance = SuperMap.Plot.PlottingUtil.distance(scalePt2D,plumbPt);

                    if(-1 == nCircleIndex)
                    {
                        nCircleIndex = i;
                        circleCenterPt = plumbPt;
                        dDitanceCtoP = tempDistance;
                    }
                    else
                    {
                        if(dDitanceCtoP > tempDistance)
                        {
                            nCircleIndex = i;
                            circleCenterPt = plumbPt;
                            dDitanceCtoP = tempDistance;
                        }
                    }
                }

                if(-1 == nCircleIndex || nCircleIndex > pts.length-1) {
                    return;
                }

                var distance = 0.0;
                //计算圆心到起始点的距离
                for(i = 0; i < nCircleIndex; i++) {
                    distance += SuperMap.Plot.PlottingUtil.distance(shapePts[i],shapePts[i+1]);
                }

                distance += SuperMap.Plot.PlottingUtil.distance(shapePts[nCircleIndex],circleCenterPt);

                if(distance < 0 || distance > allDistance)
                {
                    return;
                }

                var dScaleValue = distance/allDistance;
                this.scaleValues[index] = dScaleValue;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol35000"
});
