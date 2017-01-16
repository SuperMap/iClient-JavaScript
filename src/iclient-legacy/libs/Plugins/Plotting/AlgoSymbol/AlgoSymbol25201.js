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
SuperMap.Geometry.AlgoSymbol25201 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 1000;

        this.scaleValues.push(0.05);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue()*0.5;
        }

        var arrowHeadDis = allDistance * this.scaleValues[0];

        var ptEnd = shapePts[shapePts.length-1];
        if(shapePts.length > 2){
            var nIndex = -1;
            for(var i = shapePts.length-2; i >= 0; i--){
                if(arrowHeadDis < SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[i])){
                    nIndex = i;
                    break;
                }
            }

            shapePts.splice(nIndex+1,shapePts.length-nIndex);
            shapePts.push(ptEnd);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        var lineStart = shapePts[shapePts.length-2];
        var lineEnd   = shapePts[shapePts.length-1];

        var dRadius = arrowHeadDis;
        var angle  = SuperMap.Plot.PlottingUtil.radian(lineStart,lineEnd)*180/Math.PI;
        var ptRight = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd,dRadius,dRadius,angle+157.5);
        var ptLeft  = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd,dRadius,dRadius,angle+202.5);

        var shapePtsHead = [];
        shapePtsHead.push(ptRight);
        shapePtsHead.push(ptEnd);
        shapePtsHead.push(ptLeft);

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};

        //创建箭头
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePtsHead, style, true);


        //添加比例点
        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(lineEnd,dRadius,dRadius,angle);
        this.addScalePoint(scalePt);

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

            var distance = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[geoPts.length-1]);

            var dScaleValue = distance/dDistance;
            if(dScaleValue > 0.5){
                return;
            }
            this.scaleValues[0] = dScaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25201"
});
