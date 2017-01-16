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
SuperMap.Geometry.AlgoSymbol34700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues[0] = 0.08;
        this.scaleValues[1] = 0.03;
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
            this.scaleValues[0] = 0.08;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = dAllDistance * 0.5;

        var secScaleValue = this.scaleValues[0];
        //计算线上三角形的半径
        var dRadius = dAllDistance * secScaleValue;

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt, geoPts);
        var circlePt = ptsindex.pts;
        var circlePtIndex = ptsindex.index;

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt+dRadius, geoPts);
        var circlePtAfterIndex = ptsindex.index;
        var circlePtAfter = ptsindex.pts;

        if(circlePtIndex < 0 || circlePtAfterIndex < 0) {
            return;
        }

        if(circlePtIndex != circlePtAfterIndex)//不在同一个线段上
        {
            var tempPt1 = new SuperMap.Geometry.Point(geoPts[circlePtIndex+1].x,geoPts[circlePtIndex+1].y);
            var tempPt2 = new SuperMap.Geometry.Point(geoPts[circlePtIndex].x,geoPts[circlePtIndex].y);
            var ddis = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);

            if(ddis <= dRadius*2)
            {
                dRadius = ddis/2;
                circlePt.x = (geoPts[circlePtIndex+1].x + geoPts[circlePtIndex].x)/2;
                circlePt.y = (geoPts[circlePtIndex+1].y + geoPts[circlePtIndex].y)/2;
            }
            else
            {
                //重新计算圆心点
                circlePt = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[circlePtIndex+1], geoPts[circlePtIndex], dRadius);
            }
        }
        else//在一条线段上
        {
            var tempPt1 = new SuperMap.Geometry.Point(geoPts[circlePtIndex+1].x,geoPts[circlePtIndex+1].y);
            var tempPt2 = new SuperMap.Geometry.Point(geoPts[circlePtIndex].x,geoPts[circlePtIndex].y);
            var ddis = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);

            if(ddis <= dRadius*2)
            {
                dRadius = ddis/2;
                circlePt.x = (geoPts[circlePtIndex+1].x + geoPts[circlePtIndex].x)/2;
                circlePt.y = (geoPts[circlePtIndex+1].y + geoPts[circlePtIndex].y)/2;
            }
            else
            {
                var tempPt1 = new SuperMap.Geometry.Point(geoPts[circlePtIndex].x,geoPts[circlePtIndex].y);
                var tempPt2 = new SuperMap.Geometry.Point(circlePt.x,circlePt.y);
                var dcercledis = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);

                if(dcercledis < dRadius)
                {
                    //重新计算圆心点
                    circlePt = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[circlePtIndex], geoPts[circlePtIndex], dRadius);
                }
            }
        }

        var firstPts = [], i;//圆前面的整体折线
        for(i = 0; i < circlePtIndex+1; i++){
            firstPts.push(geoPts[i]);
        }

        var firstEndPt;
        var secStartPt;

        //计算第一条折线的终点
        firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, geoPts[circlePtIndex], dRadius);
        firstPts.push(firstEndPt);

        //创建第一条折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,firstPts);

        //计算第二条折线的起点
        secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, geoPts[circlePtIndex+1], dRadius);
        var secondPts = [];
        secondPts.push(secStartPt);
        var nPts = geoPts.length;
        for(i = (circlePtIndex+1); i < nPts; ++i)
        {
            secondPts.push(geoPts[i]);
        }

        //创建第二条折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,secondPts);

        //创建三角形图元
        var circlePts = [];
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine((dRadius/2),firstEndPt,secStartPt);
        circlePts.push(firstEndPt);
        circlePts.push(sidepoint.pntRight);
        circlePts.push(sidepoint.pntLeft);

        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius,firstEndPt,circlePt);
        var dyellowpt = sidepoint.pntRight;

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,circlePts,{lineTypeLimit:true});

        //添加两端的折线
        var ptStart1 = geoPts[0].clone();
        var ptStart2 = geoPts[1].clone();
        var ptStartLeft,ptStartRight;
        var ptEnd1 = geoPts[geoPts.length-2].clone();
        var ptEnd2 = geoPts[geoPts.length-1].clone();
        var ptEndLeft,ptEndRight;

        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }

        var dlen = dAllDistance*this.scaleValues[1];
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen,ptStart2,ptStart1);
        ptStartRight = sidepoint.pntRight;
        ptStartLeft = sidepoint.pntLeft;
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen,ptEnd1,ptEnd2);
        ptEndRight = sidepoint.pntRight;
        ptEndLeft = sidepoint.pntLeft;

        var pPoly1Pts = [];
        pPoly1Pts.push(ptStartRight);
        pPoly1Pts.push(ptStartLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pPoly1Pts,{lineTypeLimit:true});

        var pPoly2Pts = [];
        pPoly2Pts.push(ptEndRight);
        pPoly2Pts.push(ptEndLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pPoly2Pts,{lineTypeLimit:true});

        this.scalePoints = [];
        this.addScalePoint(dyellowpt);
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

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            if(0 == index) {
                var dCircleToFirstPt = dAllDistance * 0.5;

                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt, geoPts);
                var circlePt = ptsindex.pts;
                var ddis = SuperMap.Plot.PlottingUtil.distance(pt,circlePt);

                var dscale = ddis/dAllDistance;
                this.scaleValues[0] = dscale;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34700"
});
