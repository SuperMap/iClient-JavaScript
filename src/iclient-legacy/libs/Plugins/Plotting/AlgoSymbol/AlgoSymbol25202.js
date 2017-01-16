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
SuperMap.Geometry.AlgoSymbol25202 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues.push(0.025);
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

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue()*0.5;
        }

        var scaleValue0 = this.scaleValues[0];
        var dParralDis = allDistance*scaleValue0;

        var leftparaPnts = [];
        //获得左边的平行点数组
        leftparaPnts = SuperMap.Plot.PlottingUtil.paraLine(geoPts,dParralDis,true);

        var rightparaPnts = [];
        //获得右边的平行点数组
        rightparaPnts = SuperMap.Plot.PlottingUtil.paraLine(geoPts,dParralDis,false);

        //添加控制点
        this.addScalePoint(rightparaPnts[0]);

        //***************************
        //添加箭头
        //***************************
        var ptStart = rightparaPnts[rightparaPnts.length-1];
        var ptEnd = leftparaPnts[leftparaPnts.length-1];

        var dDistance = SuperMap.Plot.PlottingUtil.distance(ptStart, ptEnd);
        var tailDistance = dDistance * 0.5;

        var lineStart = leftparaPnts[leftparaPnts.length-2];
        var lineEnd   = leftparaPnts[leftparaPnts.length-1];

        var leftAndRightPt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(tailDistance,lineStart,lineEnd);

        //左箭尾点
        var ptLeft = leftAndRightPt.pntLeft;

        lineStart = rightparaPnts[rightparaPnts.length-2];
        lineEnd   = rightparaPnts[rightparaPnts.length-1];
        var leftAndRightPt1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(tailDistance,lineStart,lineEnd);

        //右箭尾点
        var ptRight = leftAndRightPt1.pntRight;

        //箭头点
        var headDistance = dDistance;
        lineStart = rightparaPnts[rightparaPnts.length-1];
        lineEnd = geoPts[geoPts.length-1];

        var leftAndRightPt2 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(headDistance,lineStart,lineEnd);

        var ptHead = leftAndRightPt2.pntRight;

        var shapePts = [];
        shapePts.push(ptLeft);
        shapePts.push(ptHead);
        shapePts.push(ptRight);

        //所有几何点
        var allPts = [];
        //添加左边数组
        allPts = allPts.concat(leftparaPnts);
        //添加箭头数组
        allPts = allPts.concat(shapePts);

        var nRightPts = rightparaPnts.length;
        for(var i = nRightPts - 1; i >=0; --i)
        {
            allPts.push(rightparaPnts[i]);
        }

       this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, allPts);

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

            var distance = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[0]);

            var dScaleValue = distance/dDistance;
            if(dScaleValue > 0.5){
                return;
            }
            this.scaleValues[0] = dScaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25202"
});
