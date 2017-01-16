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
SuperMap.Geometry.AlgoSymbol3010107 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4500));
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
            this.scaleValues.push(0.5);
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

        var firstSubSymbolPtDis = allDis * 0.5;

        var result1 = this.getLinePts(shapePts,firstSubSymbolPtDis,subSymbolSize);

        //创建第一个子标号
        var symbolPt1 = new SuperMap.Geometry.Point((result1.startPt.x+result1.endPt.x)/2,(result1.startPt.y+result1.endPt.y)/2);
        var symbolAngle1 = SuperMap.Plot.PlottingUtil.radian(result1.startPt,result1.endPt)*180/Math.PI;

        //子标号
        if (0 < this.subSymbols.length) {
            this.computeSubSymbol(this.subSymbols[0], symbolPt1, subSymbolSize, symbolAngle1 - 90);
        }


        //创建主线
        var linePts1 = [];
        var linePts2 = [];
        for(var i = 0; i <= result1.startIndex; i++){
            linePts1.push(shapePts[i]);
        }
        linePts1.push(result1.startPt);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts1);
        if(result1.endIndex <= shapePts.length){
            linePts2.push(result1.endPt);
            for(var i = result1.endIndex+1; i <= shapePts.length -1; i++){
                linePts2.push(shapePts[i]);
            }
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,linePts2);
        }

        //添加箭头
        this.addArrow(shapePts);

        //添加比例点
        if(this.isEdit){

            var pt = new SuperMap.Geometry.Point(symbolPt1.x,symbolPt1.y);

            var circlrPt = SuperMap.Plot.PlottingUtil.circlePoint(pt,subSymbolSize * 0.5,subSymbolSize*0.5,symbolAngle1 + 90);

            this.addScalePoint(circlrPt,0);

        }

        this.clearBounds();
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
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function(index, pt) {
       if(index === 0){
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

               var secondSubSymbolPtDis = allDis * 0.5;

               var result2 = this.getLinePts(shapePts,secondSubSymbolPtDis,lineDis*this.scaleValues[0]);

               //创建第二个子标号
               var symbolPt2 = new SuperMap.Geometry.Point((result2.startPt.x+result2.endPt.x)/2,(result2.startPt.y+result2.endPt.y)/2);

               var dScale = 2*SuperMap.Plot.PlottingUtil.distance(symbolPt2,pt)/lineDis;

               if(dScale <= 0.5){
                   this.scaleValues[0] = dScale;
               }else{
                    this.scaleValues[0] = 0.5;
               }
           }
       }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol3010107"
});
