/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol22000 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues.push(0.05);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 1000));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues.push(0.05);
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        //清理重复的点
        shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算圆心点在位置点数组上的位置
        //获取第0个比例值，第0个比例值是线上圆圆心到第一位置点间的距离/折线总长
        //MGdouble firstScaleValue = m_geoAttr.GetScaleValue(0);
        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = allDistance * 0.5;

        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,dCircleToFirstPt);
        var circlePtIndex = result.index;
        var circlePt = result.pt;
        if(circlePtIndex < 0)
        {
            return;
        }

        var firstPts = [];//圆前面的整体折线
        for(var i = 0; i < circlePtIndex+1; i++){
            firstPts.push(shapePts[i]);
        }

        var firstDistance = SuperMap.Plot.PlottingUtil.polylineDistance(firstPts);//计算第一段折线段之前的距离
        var dDelta = dCircleToFirstPt - firstDistance;

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var secScaleValue = this.scaleValues[0];
        //计算线上圆的半径
        var dRadius = allDistance * secScaleValue;

        var firstEndPt,secStartPt;
        if(dDelta >= dRadius)//圆心到前面那个点的距离大于半径
        {
            //计算第一条折线的终点
            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex], dRadius);
            firstPts.push(firstEndPt);

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            //计算第二条折线的起点
            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex+1], dRadius);
            var secondPts = [];
            secondPts.push(secStartPt);
            for(var i = (circlePtIndex+1); i < shapePts.length; ++i)
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
                var tempPt1 = firstPts[i];
                var tempPt2 = circlePt;
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
            for(var i = circlePtIndex; i < shapePts.length; i ++)//找到第一个在圆外面的点
            {
                var tempPt1 = shapePts[i];
                var tempPt2 = circlePt;
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1,tempPt2);

                if(dispt > dRadius)//点到圆心的距离大于半径
                {
                    pos2 = i;
                    break;
                }
            }

            var secondPts = [];
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

        var dangle = SuperMap.Plot.PlottingUtil.radian(firstEndPt,secStartPt)*180/Math.PI;
        var dsymbolsize = dRadius;

        var symbolPt = new SuperMap.Geometry.Point((firstPts[firstPts.length-1].x+secondPts[0].x)/2,(firstPts[firstPts.length-1].y+secondPts[0].y)/2);

        //计算子标号
        if (this.subSymbols.length > 0)
        {
            this.computeSubSymbol(this.subSymbols[0], symbolPt, dsymbolsize, dangle);
        }

        //圆上点角度
        var threeScaleValus = 0;

        var circlePt2D = circlePt;

        var onCirclePt2D = SuperMap.Plot.PlottingUtil.circlePoint(circlePt2D, allDistance*secScaleValue, allDistance*secScaleValue, threeScaleValus);

        //添加两端的折线
        var ptStart1 = shapePts[0];
        var ptStart2 = shapePts[1];

        var ptEnd1 = shapePts[(shapePts.length-2)];
        var ptEnd2 = shapePts[(shapePts.length-1)];

        var dlen = dRadius*0.5;
        var leftAndRightPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen,ptStart2,ptStart1);
        var leftAndRightPt2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dlen,ptEnd1,ptEnd2);
        var ptStartLeft = leftAndRightPt1.pntLeft;
        var ptEndLeft = leftAndRightPt2.pntLeft;

        var pPoly1Pts = [];
        pPoly1Pts.push(ptStart1);
        pPoly1Pts.push(ptStartLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pPoly1Pts);

        var pPoly2Pts = [];
        pPoly2Pts.push(ptEnd2);
        pPoly2Pts.push(ptEndLeft);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pPoly2Pts);

        //添加比例点
        this.addScalePoint(onCirclePt2D);

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
        if(pt.isScalePoint === true){
            if(0 == index)//圆上点
            {
                var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
                SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
                if (geoPts.length < this.minEditPts)
                {
                    return;
                }

                var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

                //清理重复的点
                shapePts = SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);
                var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

                //计算圆心点在位置点数组上的位置
                //获取第0个比例值，第0个比例值是线上圆圆心到第一位置点间的距离/折线总长
                //MGdouble firstScaleValue = m_geoAttr.GetScaleValue(0);
                //计算线上圆圆心到第一个位置点间的距离
                var dCircleToFirstPt = allDistance * 0.5;

                var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts, dCircleToFirstPt);
                if(-1 === result.index){
                    return;
                }

                var r = SuperMap.Plot.PlottingUtil.distance(result.pt,pt);
                var dScaleValue = r/allDistance;
                if(dScaleValue > 0.4){
                    dScaleValue = 0.4;
                }
                this.scaleValues[0] = dScaleValue;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol22000"
});