/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol3010102 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

    ///**
    // * Constructor: SuperMap.Geometry.AlgoSymbol
    // * 创建一个线面标绘对象。
    // *
    // * Parameters:
    // * options - {Object} 此类与父类提供的属性。
    // *
    // * Returns:
    // * {<SuperMap.Geometry.AlgoSymbol>} 新的标绘对象。
    // */
    //initialize: function (option) {
    //    SuperMap.Geometry.AlgoSymbol3010105.prototype.initialize.apply(this, arguments);
    //},
    //

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
        this.scaleValues[0] = 0.05;
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

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts < this.minEditPts)
        {
            return;
        }
        var lineDis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        var allDis = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
        var subSymbolSize = lineDis * this.scaleValues[0];

        var firstSubSymbolPtDis = allDis * 5/14;
        var secondSubSymbolPtDis = allDis * 9/14;

        var result1 = this.getLinePts(shapePts,firstSubSymbolPtDis,subSymbolSize);
        var result2 = this.getLinePts(shapePts,secondSubSymbolPtDis,subSymbolSize);

        //创建第一个子标号
        var symbolPt1 = new SuperMap.Geometry.Point((result1.startPt.x+result1.endPt.x)/2,(result1.startPt.y+result1.endPt.y)/2);
        var symbolAngle1 = SuperMap.Plot.PlottingUtil.radian(result1.startPt,result1.endPt)*180/Math.PI;
        this.createSubSymbol1(symbolPt1,subSymbolSize,symbolAngle1);

        //创建第二个子标号
        var symbolPt2 = new SuperMap.Geometry.Point((result2.startPt.x+result2.endPt.x)/2,(result2.startPt.y+result2.endPt.y)/2);
        var symbolAngle2 = SuperMap.Plot.PlottingUtil.radian(result2.startPt,result2.endPt)*180/Math.PI;
        this.createSubSymbol2(symbolPt2,subSymbolSize,symbolAngle2);

        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt2,0.5*subSymbolSize,0.5*subSymbolSize,symbolAngle2+90);
        this.addScalePoint(scalePt);

        //创建主线
        var linePts1 = [];
        var linePts2 = [];
        var linePts3 = [];

        for(var i = 0; i <= result1.startIndex; i++){
            linePts1.push(shapePts[i]);
        }
        linePts1.push(result1.startPt);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts1);

        if(result1.endIndex <= result2.startIndex){
            linePts2.push(result1.endPt);
            for(var i = result1.endIndex+1; i <= result2.startIndex; i++){
                linePts2.push(shapePts[i]);
            }
            linePts2.push(result2.startPt);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts2);
        }

        linePts3.push(result2.endPt);
        for(var i = result2.endIndex+1; i < shapePts.length; i++){
            linePts3.push(shapePts[i]);
        }

        var arrowSize = this.getSubSymbolScaleValue() * lineDis *0.5;

        var tempLinePts = [];
        tempLinePts = tempLinePts.concat(linePts3);

        var ptEnd = tempLinePts[tempLinePts.length-1];
        var dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, tempLinePts[tempLinePts.length-1]);
        while(dis < 1.2*arrowSize){
            tempLinePts.pop();
            if(tempLinePts.length > 0){
                dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, tempLinePts[tempLinePts.length-1]);
            }
            else{
                break;
            }
        }
        tempLinePts.push(ptEnd);

        if(tempLinePts.length > 1){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,tempLinePts);

            //创建箭头
            var ptStart = tempLinePts[tempLinePts.length-2];

            var angle = SuperMap.Plot.PlottingUtil.radian(ptEnd, ptStart)*180/Math.PI;

            var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd, arrowSize, arrowSize, angle+22.5);
            var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd, arrowSize, arrowSize, angle-22.5);

            var arrowHeadpts = [];
            arrowHeadpts.push(pt1);
            arrowHeadpts.push(ptEnd);
            arrowHeadpts.push(pt2);

            var linestyle  = {surroundLineFlag: false};
            var style = {surroundLineFlag: false,fillLimit:true,fillColor: linestyle.strokeColor ,lineTypeLimit:true,fill:true};
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, arrowHeadpts, style);
        }
        else{
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts3);
        }

        this.clearBounds();
    },

    createSubSymbol1: function (symbolPt, symbolSize, angle) {
        var subPts = this.getSubSymbolPts(symbolSize);
        this.createSubSymbol(symbolPt, symbolSize, angle, subPts);
    },

    createSubSymbol2: function (symbolPt, symbolSize, angle) {
        var subPts = this.getSubSymbolPts(symbolSize);
        this.createSubSymbol(symbolPt, symbolSize, angle,subPts);
    },

    createSubSymbol: function(symbolPt, symbolSize, angle, subPts){
        var subSymbolPts = [];
        for(var i = 0; i < subPts.length; i++){
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt,subPts[i],angle);
            subSymbolPts.push(pt);
        }
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,subSymbolPts);
    },

    /**
     *
     */
    getLinePts: function(shapePts, subSymbolPtDis, subSymbolSize){
        var result = new Object();

        var bFindPt = false;
        var halfSize = subSymbolSize/2;

        var startNotFind = false;
        var endNotFind = false;

        var step = halfSize*0.02;
        while(!bFindPt){
            var result1 = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(subSymbolPtDis-halfSize, shapePts);
            if(!result1.bfind){
                startNotFind = true;
                bFindPt = true;
                break;
            }

            var result2 = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(subSymbolPtDis+halfSize, shapePts);
            if(!result2.bfind){
                endNotFind = true;
                bFindPt = true;
                break;
            }

            if(SuperMap.Plot.PlottingUtil.distance(result1.pts,result2.pts) > subSymbolSize){
                result.startIndex = result1.index;
                result.startPt    = result1.pts;
                result.endIndex   = result2.index;
                result.endPt      = result2.pts;

                bFindPt = true;
            }

            halfSize += step;
        }

        if(false === startNotFind && false === endNotFind){

        }
        else if(true === startNotFind && false === endNotFind){
            result.startIndex = 0;
            result.startPt    = shapePts[0];

            var resultTemp = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(subSymbolSize, shapePts);
            if(resultTemp.bfind){
                result.endIndex = resultTemp.index;
                result.endPt    = resultTemp.pts;
            }
            else{
                result.endIndex = shapePts.length-1;
                result.endPt    = shapePts[shapePts.length-1];
            }

        }
        else if(false === startNotFind && true === endNotFind){
            result.endIndex = shapePts.length-1;
            result.endPt    = shapePts[shapePts.length-1];

            var allDis = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);
            var resultTemp = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(allDis-subSymbolSize, shapePts);
            if(resultTemp.bfind){
                result.startIndex = resultTemp.index;
                result.startPt    = resultTemp.pts;
            }
            else{
                result.startIndex = 0;
                result.startPt    = shapePts[0];
            }
        }
        else{
            result.startIndex = 0;
            result.startPt    = shapePts[0];
            result.endIndex = shapePts.length-1;
            result.endPt    = shapePts[shapePts.length-1];
        }

        return result;
    },

    /**
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array<SuperMap.Geometry.Point>} 子标号位置点
     *
     */
    getSubSymbolPts: function(symbolSize){
        var d = symbolSize/4;
        var subPts = [];
        subPts.push(new SuperMap.Geometry.Point(-2*d,0));
        subPts.push(new SuperMap.Geometry.Point(0,-d));
        subPts.push(new SuperMap.Geometry.Point(2*d,0));
        subPts.push(new SuperMap.Geometry.Point(0,d));

        return subPts;
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
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            if (geoPts < this.minEditPts)
            {
                return;
            }
            var lineDis = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            var allDis = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            var secondSubSymbolPtDis = allDis * 9/14;

            var result2 = this.getLinePts(shapePts,secondSubSymbolPtDis,lineDis*this.scaleValues[0]);

            //创建第二个子标号
            var symbolPt2 = new SuperMap.Geometry.Point((result2.startPt.x+result2.endPt.x)/2,(result2.startPt.y+result2.endPt.y)/2);

            var dScale = 2*SuperMap.Plot.PlottingUtil.distance(symbolPt2,pt)/lineDis;

            if(dScale <= 0.3){
                this.scaleValues[0] = dScale;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol3010102"
});


