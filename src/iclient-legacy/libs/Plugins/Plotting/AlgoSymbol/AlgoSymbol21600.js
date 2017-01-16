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
SuperMap.Geometry.AlgoSymbol21600 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

    /**
     * 标号文本
     */
    subText: null,


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

        this.scaleValues.push(0.05);

        subText = SuperMap.i18n("symbolAlgo_21600");
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.scaleValues.length !== 1)
        {
            this.scaleValues = [];
           this.scaleValues.push(0.05);
        }

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        var defualtSacleValue = this.getSubSymbolScaleValue();

        var allDistance = 0;
        for(var i = 0; i < shapePts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(shapePts[i], shapePts[i+1]);
        }

        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = allDistance * 0.5;

        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dCircleToFirstPt);
        if(-1 === result.index)
        {
            return;
        }

        var circlePt = result.pt;

        var firstPts = [];//圆前面的整体折线
        var firstDistance = 0;
        for(var i = 0; i < result.index+1; i++){
            firstPts.push(shapePts[i]);

            if(i > 0){
                firstDistance += SuperMap.Plot.PlottingUtil.distance(firstPts[i],firstPts[i-1]);
            }
        }

        var dDelta = dCircleToFirstPt - firstDistance;

        //计算线上圆的半径
        var dRadius = allDistance * defualtSacleValue*0.5;

        var firstEndPt,secStartPt;
        var secondPts = [];
        if(dDelta >= dRadius)//圆心到前面那个点的距离大于半径
        {
            //计算第一条折线的终点
            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[result.index], dRadius);
            firstPts.push(firstEndPt);

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            //计算第二条折线的起点
            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[result.index+1], dRadius);
            secondPts.push(secStartPt);
            var nPts = shapePts.length;
            for(var i = (result.index+1); i < nPts; ++i)
            {
                secondPts.push(shapePts[i]);
            }

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }
        else
        {
            var pos = -1;
            for(var i = (firstPts.length-1); i >=0; i--)//找到第一个在圆外面的点
            {
                var tempPt1 = new SuperMap.Geometry.Point(firstPts[i].x,firstPts[i].y);
                var tempPt2 = new SuperMap.Geometry.Point(circlePt.x,circlePt.y);
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);
                if(dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos = i;
                    break;
                }
            }

            if(pos != -1)
            {
                firstPts.splice((pos+1),(firstPts.length-1-pos));
                //计算第一条折线的终点
                firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos], dRadius);
                firstPts.push(firstEndPt);
            }
            else
                return;

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            var pos2 = -1;
            for(var i = result.index; i < shapePts.length; i ++)//找到第一个在圆外面的点
            {
                var tempPt1 = new SuperMap.Geometry.Point(shapePts[i].x,shapePts[i].y);
                var tempPt2 = new SuperMap.Geometry.Point(circlePt.x,circlePt.y);
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);
                if(dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos2 = i;
                    break;
                }
            }

            if(pos2 != -1)
            {
                //计算第二条折线的起点
                secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos2], dRadius);

                secondPts.push(secStartPt);
                for(var i = (pos2+1); i <  shapePts.length; ++i)
                {
                    secondPts.push(shapePts[i]);
                }
            }
            else
                return;

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }

        //计算贝赛尔曲线起始竖线
        if(firstPts.length < 2)
        {
            return;
        }

        var geoPtsDis = 0;
        for(var i = 0; i < geoPts.length-1; i++){
            geoPtsDis += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
        }

        if(!this.isEdit){
            this.scaleValues[0] = defualtSacleValue*0.6;
        }

        var dLineDis = geoPtsDis *  this.scaleValues[0];

        var ptStart1 = new SuperMap.Geometry.Point(firstPts[0].x,firstPts[0].y);
        var ptStart2 = new SuperMap.Geometry.Point(firstPts[1].x,firstPts[1].y);

        var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLineDis,ptStart2,ptStart1);

        var pts2D = [];
        pts2D.push(leftAndRightPt.pntLeft);
        pts2D.push(leftAndRightPt.pntRight);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        //计算贝赛尔曲线结束竖线
        if(secondPts.length < 2)
        {
            return;
        }
        var ptEnd1 = new SuperMap.Geometry.Point(secondPts[secondPts.length-1].x,secondPts[secondPts.length-1].y);
        var ptEnd2 = new SuperMap.Geometry.Point(secondPts[secondPts.length-2].x,secondPts[secondPts.length-2].y);

        var leftAndRightPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dLineDis,ptEnd2,ptEnd1);

        pts2D = [];
        pts2D.push(leftAndRightPt1.pntLeft);
        pts2D.push(leftAndRightPt1.pntRight);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

        var ptLeftEnd = firstEndPt;
        var ptRightStart = secStartPt;

        var dAngle = SuperMap.Plot.PlottingUtil.radian(ptLeftEnd, ptRightStart)*180/Math.PI;
        var dWidth = SuperMap.Plot.PlottingUtil.distance(ptLeftEnd, ptRightStart);

        var ptcenter = new SuperMap.Geometry.Point((firstEndPt.x+secStartPt.x)/2.0, (firstEndPt.y+secStartPt.y)/2.0);

        //创建文本图元
        pts2D = [];
        pts2D.push(ptcenter);

        var textContent = subText;
        var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit:true};
        style.labelAlign = "cm";
        style.labelRotation = -dAngle;
        this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, pts2D, style,true, textContent);

        this.addScalePoint(leftAndRightPt.pntLeft);

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
            if(this.scalePoints.length <= index)
                return;

            if(0 != index)
            {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length)
            {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var distance = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[0]);

            var dScaleValue = distance/dDistance;
            this.scaleValues[0] = dScaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol21600"
});
