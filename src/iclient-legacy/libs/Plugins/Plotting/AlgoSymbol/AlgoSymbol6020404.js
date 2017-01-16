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
SuperMap.Geometry.AlgoSymbol6020404 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.scaleValues.push(0.1);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if(geoPts.length < this.minEditPts){
            return;
        }

        if(!this.isEdit){
            var dScale = this.getSubSymbolScaleValue()*0.3;
            if(dScale > 0.05){
                dScale = 0.05;
            }
            this.scaleValues[0] = dScale;
        }

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var dashLineDis = Math.abs(allDistance*this.scaleValues[0]);

        var arrDashLinePts = this.getDashLinePts(geoPts,dashLineDis);

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        var index = 1;
        for(var i = 0; i < arrDashLinePts.length; i++){
            var dashLinePts = arrDashLinePts[i];
            if(0 === index%2){
                if(2 === dashLinePts.length && i !== arrDashLinePts.length-1){
                    var midPt = new SuperMap.Geometry.Point((dashLinePts[0].x+dashLinePts[1].x)/2,(dashLinePts[0].y+dashLinePts[1].y)/2);
                    var result = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(2*dashLineDis,dashLinePts[0],midPt);
                    var pt = null;
                    if(this.scaleValues[0] > 0){
                        pt = result.pntLeft;
                    }
                    else{
                        pt = result.pntRight;
                    }
                    this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,[pt,dashLinePts[0],dashLinePts[1]],style);
                }
                else{
                    index--;
                }
            }

            if(arrDashLinePts[i].length > 1){
                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,dashLinePts);
            }

            index++;
        }

        var angle = SuperMap.Plot.PlottingUtil.radian(geoPts[0],geoPts[1])*180/Math.PI;

        if(this.scaleValues[0] > 0){
            angle += 90;
        }
        else{
            angle -= 90;
        }

        var scalPt = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],2*dashLineDis,2*dashLineDis,angle);
        this.addScalePoint(scalPt);

        this.clearBounds();
    },

    /*
    * 求虚线
    * */
    getDashLinePts:function(geoPts, dashLineDis){
        var arrDashLinePts = [];
        var lineDis = dashLineDis;
        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        if(dashLineDis > allDistance){
            return arrDashLinePts;
        }

        var tempShapePts = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
        var nCount = parseInt(allDistance/(1.5*dashLineDis))*2;
        for(var i = 0; i < nCount; i++){
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(tempShapePts, dashLineDis);
            if(-1 === result.index){
                continue;
            }

            if (0 === i % 2) {
                var pts = [];
                for (var m = 0; m < result.index + 1; m++) {
                    pts.push(tempShapePts[m].clone());
                }
                pts.push(result.pt);
                arrDashLinePts.push(pts);
            }
            else {
                lineDis += dashLineDis * 0.5;
            }

            var tempPts = [];
            tempPts.push(result.pt);
            for(var k = result.index+1; k < tempShapePts.length; k++){
                tempPts.push(tempShapePts[k]);
            }

            tempShapePts = [];
            tempShapePts = tempShapePts.concat(tempPts);
        }

        if(tempShapePts.length > 0){
            arrDashLinePts.push(tempShapePts);
        }

        return arrDashLinePts;
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if (index != 0) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            if (geoPts < this.minEditPts) {
                return;
            }

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            var dis = SuperMap.Plot.PlottingUtil.distance(geoPts[0], pt);

            var dScale = 0.5*dis / allDistance;
            if(dScale >= 0.05){
                dScale = 0.05;
            }

            if(SuperMap.Plot.PlottingUtil.isRight(pt,geoPts[0],geoPts[1])){
                dScale = -dScale;
            }
            else{

            }

            this.scaleValues[0] = dScale;
        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol6020404"
});
