/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol21503 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol21501, {

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
        this.maxEditPts = 255;

        this.scaleValues = [];
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.01);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 7900));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        if(geoPts.length < 2){
            return;
        }

        if(this.scaleValues.length != 3){
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.01);
        }

        //设置子标号大小比例值
        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算线上圆圆心到第一个位置点间的距离
        var dCircleToFirstPt = allDistance * 0.5;

        var ptsIndex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dCircleToFirstPt, shapePts);
        var circlePtIndex = ptsIndex.index;
        var circlePt = ptsIndex.pts;
        if(circlePtIndex < 0){
            return;
        }

        //圆前面的整体折线
        var firstPts = [];
        for(var i = 0; i <= circlePtIndex; i++){
            firstPts.push(shapePts[i]);
        }

        //计算第一段折线段之前的距离
        var firstDistance = SuperMap.Plot.PlottingUtil.polylineDistance(firstPts);
        var dDelta = dCircleToFirstPt - firstDistance;

        var secScaleValue = this.scaleValues[1];
        //计算线上圆的半径
        var dRadius = allDistance * secScaleValue;

        var firstEndPt,secStartPt;
        var secondPts = [];
        //圆心到前面那个点的距离大于半径
        if(dDelta >= dRadius){
            //计算第一条折线的终点
            firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex], dRadius);
            firstPts.push(firstEndPt);
            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);
            //计算第二条折线的起点
            secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[circlePtIndex + 1], dRadius);
            secondPts.push(secStartPt);
            var nPts = shapePts.length;
            for (var i = (circlePtIndex + 1); i < nPts; i++){
                secondPts.push(shapePts[i].clone());
            }

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }else{
            var pos =  -1;
            //找到第一个在圆外面的点
            for(var i = (firstPts.length - 1); i >= 0; i--){
                var tempPt1 = firstPts[i].clone();
                var tempPt2 = circlePt.clone();
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2);
                if(dispt > dRadius){//点到圆心的距离大于半径
                    pos = i;
                    break;
                }
            }

            if(pos != -1){
                var firstPtsTemp = [];
                for(var i = 0; i <= pos; i++){
                    firstPtsTemp.push(firstPts[i]);
                }
                firstPts = firstPtsTemp;
                //计算第一条折线的终点
                firstEndPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos], dRadius);
                firstPts.push(firstEndPt);
            }else {
                return;
            }

            //创建第一条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, firstPts);

            var pos2 = -1;
            //找到第一个在圆外面的点
            for(var i = circlePtIndex; i < shapePts.length; i++){
                var tempPt1 = shapePts[i].clone();
                var tempPt2 = circlePt.clone();
                var dispt = SuperMap.Plot.PlottingUtil.distance(tempPt1, tempPt2);
                if(dispt > dRadius){//点到圆心的距离大于半径
                    pos2 = i;
                    break;
                }
            }

            if(pos2 != -1){
                //计算第二条折线的起点
                secStartPt = SuperMap.Plot.PlottingUtil.LinePnt(circlePt, shapePts[pos2], dRadius);
                secondPts.push(secStartPt);
                for(var i = (pos2 + 1); i < shapePts.length; i++){
                    secondPts.push(shapePts[i].clone());
                }
            }else{
                return;
            }

            //创建第二条折线图元
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, secondPts);
        }

        //添加箭头
        this.addArrow(shapePts,allDistance);

        var dangle = SuperMap.Plot.PlottingUtil.radian(firstEndPt, secStartPt) * this.RTOD;
        var dsymbolsize = dRadius*1.4;

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], circlePt, dsymbolsize, dangle - 90);
        }

        //添加比例点
        if(this.isEdit){
            var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius, firstEndPt, circlePt);
            var scalepoint = sidepoint.pntRight.clone();
            this.addScalePoint(scalepoint,0);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol21503"
});