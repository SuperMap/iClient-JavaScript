/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol33400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SCALE: 0.02,

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

        this.scaleValues = [];
        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0.125);
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

        if (this.scaleValues.length < 5)
        {
            this.scaleValues = [];
            this.scaleValues.push(0);
            this.scaleValues.push(0);
            this.scaleValues.push(0);
            this.scaleValues.push(0.125);
            this.scaleValues.push(0);
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
         shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        //箭头相关
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var dScaleStart, dScaleEnd;

        var subSymbolScale = this.getSubSymbolScaleValue()*1.5;
        if(geoPts.length == 2){
            if(!this.isEdit){
                this.scaleValues[3] = this.scaleValues[2] + subSymbolScale;
            }

            dScaleStart = this.scaleValues[2];
            dScaleEnd = this.scaleValues[3];
        }
        else{
            if(SuperMap.Plot.PlottingUtil.equalFuzzy(this.scaleValues[4], 0)){
                this.scaleValues = [];
                this.scaleValues.push(0);
                this.scaleValues.push(0);
                this.scaleValues.push(0);
                this.scaleValues.push(0);
                this.scaleValues.push(0.125);
            }

            if(!this.isEdit){
                this.scaleValues[4] = this.scaleValues[3] + subSymbolScale;
            }

            dScaleStart = this.scaleValues[3];
            dScaleEnd = this.scaleValues[4];
        }

        var dDistanceStart = dAllDistance*dScaleStart;

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistanceStart,shapePts);
        if(!ptsindex.bfind)
        {
            return;
        }
        var nIndexStart = ptsindex.index;
        var symStartPt = ptsindex.pts;

        var dDistanceEnd = dAllDistance*dScaleEnd;

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistanceEnd,shapePts);
        if(!ptsindex.bfind){
            return;
        }
        var nIndexEnd = ptsindex.index;
        var symEndPt = ptsindex.pts;

        var symStartPt2D = new SuperMap.Geometry.Point(symStartPt.x,symStartPt.y);
        var symEndPt2D = new SuperMap.Geometry.Point(symEndPt.x,symEndPt.y);

        var angle = SuperMap.Plot.PlottingUtil.radian(symStartPt2D,symEndPt2D)*this.RTOD;

        //创建前端贝赛尔曲线
        var pts2D = [];
        for(var i = 0; i <= nIndexStart; i++)
        {
            pts2D.push(shapePts[i]);
        }
        pts2D.push(symStartPt);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //创建后端贝赛尔曲线
        pts2D = [];
        pts2D.push(symEndPt);
        for(i = nIndexEnd+1; i < shapePts.length; i++)
        {
            pts2D.push(shapePts[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //创建曲线上的符号
        var distance = SuperMap.Plot.PlottingUtil.distance(symStartPt2D,symEndPt2D);

        var pt1 = new SuperMap.Geometry.Point(2.0/3*distance, 0.5/3*distance);
        var pt2 = new SuperMap.Geometry.Point(0, 0.5/3*distance);
        var pt3 = new SuperMap.Geometry.Point(0,-0.5/3*distance);
        var pt4 = new SuperMap.Geometry.Point(2.0/3*distance,-0.5/3*distance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(symStartPt2D,pt1,angle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(symStartPt2D,pt2,angle);
        var tempPt3 = SuperMap.Plot.PlottingUtil.coordinateTrans(symStartPt2D,pt3,angle);
        var tempPt4 = SuperMap.Plot.PlottingUtil.coordinateTrans(symStartPt2D,pt4,angle);

        pts2D = [];
        pts2D.push(tempPt1);
        pts2D.push(tempPt2);
        pts2D.push(tempPt3);
        pts2D.push(tempPt4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //
        var dRadius = distance/3*2;
        var angle5 = SuperMap.Plot.PlottingUtil.radian(symEndPt2D,tempPt1)*this.RTOD;
        var pt5 = SuperMap.Plot.PlottingUtil.circlePoint(symEndPt2D,dRadius,dRadius,angle5);
        var angle6 = SuperMap.Plot.PlottingUtil.radian(symEndPt2D,tempPt4)*this.RTOD;
        var pt6 = SuperMap.Plot.PlottingUtil.circlePoint(symEndPt2D,dRadius,dRadius,angle6);

        pts2D = [];
        pts2D.push(pt5);
        pts2D.push(symEndPt);
        pts2D.push(pt6);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //末端三角形
       this.addArrow(shapePts);

        //计算比例点
        this.scalePoints = [];
        this.addScalePoint(symEndPt);

        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(symStartPt2D,distance/2,distance/2,angle+90);
        this.addScalePoint(scalePt);
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

            var geoPts = this.controlPoints;
            if (2 > geoPts.length) {
                return;
            }
            //创建贝塞尔曲线
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false)

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
            //计算符号的起始点
            var dScaleStart = 0.0;
            var dScaleEnd = 0.0;

            if(2 == geoPts.length){
                dScaleStart = this.scaleValues[2];
                dScaleEnd = this.scaleValues[3];
            }
            else{
                dScaleStart = this.scaleValues[3];
                dScaleEnd = this.scaleValues[4];
            }

            if(0 == index)
            {
                var temp = dScaleEnd-dScaleStart;

                var scalePt2D = pt.clone();
                var pts = [];
                for(var i = 0; i < shapePts.length; i++){
                    pts.push(shapePts[i].clone());
                }

                var nCircleIndex = -1;
                var dDitanceCtoP = 0.0;
                var circleCenterPt;

                for(var i = 0; i < pts.length-1; i++)
                {
                    var tempPts = [];
                    tempPts.push(pts[i]);
                    tempPts.push(pts[i+1]);

                    var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(scalePt2D,pts[i],pts[i+1]);

                    var pntonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                    if(!pntonline.isOnPolyLine) {
                        continue;
                    }

                    var tempDistance = SuperMap.Plot.PlottingUtil.distance(scalePt2D,plumbPt);

                    if(-1 == nCircleIndex) {
                        nCircleIndex = i;
                        circleCenterPt = plumbPt;
                        dDitanceCtoP = tempDistance;
                    }
                    else {
                        if(dDitanceCtoP > tempDistance) {
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
                for(i = 0; i < nCircleIndex; i++) {
                    distance += SuperMap.Plot.PlottingUtil.distance(shapePts[i],shapePts[i+1]);
                }

                distance += SuperMap.Plot.PlottingUtil.distance(shapePts[nCircleIndex],circleCenterPt);

                if(distance < 0 || distance > dAllDistance) {
                    return;
                }

                var dScaleValue = distance/dAllDistance;

                if(dScaleValue > 0.7 || dScaleValue-temp < 0) {
                    return;
                }

                if(2 == geoPts.length) {
                    this.scaleValues[2] = dScaleValue-temp;
                    this.scaleValues[3] = dScaleValue;
                }
                else {
                    this.scaleValues[3] = dScaleValue-temp;
                    this.scaleValues[4] = dScaleValue;
                }
            }
            else if(1 == index)
            {
                var distance = dAllDistance*dScaleStart;


                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(distance,shapePts);
                if(!ptsindex.bfind) {
                    return;
                }
                var symStartPt = ptsindex.pts;

                var dis = SuperMap.Plot.PlottingUtil.distance(symStartPt,pt);
                var dScaleValue = (2*dis+distance)/dAllDistance;

                if(0.7 < dScaleValue) {
                    return;
                }

                if(2 == geoPts.length) {
                    this.scaleValues[3] = dScaleValue;
                }
                else {
                    this.scaleValues[4] = dScaleValue;
                }
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol33400"
});
