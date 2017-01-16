
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
SuperMap.Geometry.AlgoSymbol36401= new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    HEADSCALE: 0.03,

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
        this.scaleValues[0] = 0.1;

        if (this.subSymbols.length >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 7200));
        }
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
            this.scaleValues[0] = 0.1;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        //计算圆心点在位置点数组上的位置
        //获取第0个比例值，第0个比例值是线上圆圆心到第一位置点间的距离/折线总长

        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = dAllDistance * 0.5;

        var secScaleValue = this.scaleValues[0];
        //计算线上三角形的半径
        var dRadius = dAllDistance * secScaleValue;


        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt, geoPts);
        var circlePtIndex = ptsindex.index;
        var circlePt = ptsindex.pts;


        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt+dRadius, geoPts);
        var circlePtAfterIndex = ptsindex.index;
        var circlePtAfter = ptsindex.pts;

        if(circlePtIndex < 0 || circlePtAfterIndex < 0)
        {
            return;
        }

        if(circlePtIndex != circlePtAfterIndex)//不在同一个线段上
        {
            var ddis = SuperMap.Plot.PlottingUtil.distance(geoPts[circlePtIndex+1],geoPts[circlePtIndex]);

            if(ddis <= dRadius*2)
            {
                dRadius = ddis/2;
                circlePt.x = (geoPts[circlePtIndex+1].x + geoPts[circlePtIndex].x)/2;
                circlePt.y = (geoPts[circlePtIndex+1].y + geoPts[circlePtIndex].y)/2;
            }
            else
            {
                //重新计算圆心点
                circlePt = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[circlePtIndex+1],geoPts[circlePtIndex], dRadius);
            }
        }
        else//在一条线段上
        {
            var ddis = SuperMap.Plot.PlottingUtil.distance(geoPts[circlePtIndex+1],geoPts[circlePtIndex]);

            if(ddis <= dRadius*2)
            {
                dRadius = ddis/2;
                circlePt.x = (geoPts[circlePtIndex+1].x + geoPts[circlePtIndex].x)/2;
                circlePt.y = (geoPts[circlePtIndex+1].y + geoPts[circlePtIndex].y)/2;
            }
            else
            {
                var dcercledis = SuperMap.Plot.PlottingUtil.distance(geoPts[circlePtIndex],circlePt);

                if(dcercledis < dRadius)
                {
                    //重新计算圆心点
                    circlePt = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[circlePtIndex],geoPts[circlePtIndex], dRadius);
                }
            }
        }

        var firstPts = [], i;//圆前面的整体折线
        for(i = 0; i < circlePtIndex+1; i++){
            firstPts.push(geoPts[i]);
        }

        //计算第一条折线的终点
        var firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt,geoPts[circlePtIndex],dRadius);
        firstPts.push(firstEndPt);

        //创建第一条折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,firstPts);

        //计算第二条折线的起点
        var secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt,geoPts[circlePtIndex+1],dRadius);
        var secondPts = [];
        secondPts.push(secStartPt);
        var nPts = geoPts.length;
        for(i = (circlePtIndex+1); i < nPts; ++i)
        {
            secondPts.push(geoPts[i]);
        }

        //创建第二条折线图元
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,secondPts);

        //添加两端的折线
        var ptStart1 = geoPts[0];
        var ptStart2 = geoPts[1];
        var ptEnd1 = geoPts[geoPts.length-2];
        var ptEnd2 = geoPts[geoPts.length-1];

        var dlen = dAllDistance*this.HEADSCALE;
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen,ptStart2,ptStart1);
        var ptStartRight = sidepoint.pntRight;
        var ptStartLeft = sidepoint.pntLeft;
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen,ptEnd1,ptEnd2);
        var ptEndRight = sidepoint.pntRight;
        var ptEndLeft = sidepoint.pntLeft;

        var poly1Pts = [];
        poly1Pts.push(ptStartRight);
        poly1Pts.push(ptStartLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,poly1Pts,{lineTypeLimit:true});

        var poly2Pts = [];
        poly2Pts.push(ptEndRight);
        poly2Pts.push(ptEndLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,poly2Pts,{lineTypeLimit:true});

        //*******************************创建飞机图元*******************************
        var dSymbolAngle = SuperMap.Plot.PlottingUtil.radian(secStartPt,firstEndPt)*this.RTOD;
        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], circlePt,0.8*dRadius,dSymbolAngle-90);
        }

        this.scalePoints  = [];
        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(circlePt,dRadius,dRadius,dSymbolAngle-90);
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
        if (pt.isScalePoint === true) {
            if (index != 0) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            if(0 == index)//飞机大小
            {
                var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(0.5*dAllDistance, geoPts);
                var scalePt2D = pt;
                var circlePt2D = ptsindex.pts;
                var ddis = SuperMap.Plot.PlottingUtil.distance(scalePt2D,circlePt2D);

                var dscale = ddis/dAllDistance;
                this.scaleValues[0] = dscale;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol36401"
});

