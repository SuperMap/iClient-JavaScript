/**
 * Created by Administrator on 2016/12/30.
 */

/**
 * Class: SuperMap.Geometry.NodeChain
 * AirLineStation对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.NodeChain = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * Constructor: SuperMap.Geometry.NodeChain
     * 创建一个NodeChain对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.NodeChain>} 新的标绘对象。
     */
    initialize:function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.NODECHAIN;
        this.symbolType = SuperMap.Plot.SymbolType.NODECHAIN;
        this.symbolName = "NodeChain";

        this.minEditPts = 2;
        this.maxEditPts = 9999999;

        this.scaleValues = [];
        this.scaleValues.push(0);
        this.scaleValues.push(0.1);
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.AlgoSymbol.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(!this.controlPoints || null === this.controlPoints){
            return;
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if(geoPts.length < this.minEditPts){
            return;
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geoPts);

        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue()*0.25;
        }

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var yOffset = allDistance*this.scaleValues[0];
        var radius = allDistance*this.scaleValues[1];

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        for(var i = 0; i < geoPts.length; i++){
            var circleCenterPt = new SuperMap.Geometry.Point(geoPts[i].x, geoPts[i].y+yOffset);
            var circlePts = this.getCirclePts(circleCenterPt,radius);
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, circlePts,style);
        }

        var scalePt1 = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y+yOffset);
        this.addScalePoint(scalePt1);
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(scalePt1,radius,radius,90);
        this.addScalePoint(scalePt2);
    },

    getCirclePts: function(circleCenterPt, radius){
        var circlePts = [];
        for(var i = 0; i <= 360; i+=12){
            var pt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt,radius,radius,i);
            circlePts.push(pt);
        }

        return circlePts;
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
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

            if(geoPts.length < this.minEditPts){
                return;
            }

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            if(0 === index){
                this.scaleValues[0] = (pt.y-geoPts[0].y)/allDistance;
            }
            else if(1 === index){
                var dis = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[0]);
                this.scaleValues[1] =dis/allDistance;
            }
        }
        this.calculateParts();
    },


    CLASS_NAME:"SuperMap.Geometry.NodeChain"
});
