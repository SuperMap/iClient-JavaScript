/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25601 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol25600, {

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
        SuperMap.Geometry.AlgoSymbol25600.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if (geoPts.length < this.minEditPts) {
            return;
        }

        //创建任意多边形图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,geoPts);

        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }
        var distance = this.scaleValues[0]*dDistance *0.5;

        var pts2D = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
        pts2D.push(pts2D[0].clone());
        for(var i = 0; i < pts2D.length-1; i++)
        {
            //计算每条折线的中点
            var ptCenter = new SuperMap.Geometry.Point((pts2D[i].x+pts2D[i+1].x)/2,(pts2D[i].y+pts2D[i+1].y)/2);

            //计算菱形的点
            var pt1 = new SuperMap.Geometry.Point(0,1.5*distance);
            var pt2 = new SuperMap.Geometry.Point(-0.5*distance,0);
            var pt3 = new SuperMap.Geometry.Point(0,-1.5*distance);
            var pt4 = new SuperMap.Geometry.Point(0.5*distance,0);

            var angle = SuperMap.Plot.PlottingUtil.radian(ptCenter,pts2D[i+1])*this.RTOD;

            var pt1_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt1,angle);
            var pt2_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt2,angle);
            var pt3_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt3,angle);
            var pt4_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt4,angle);

            var pts2Dtemp = [];
            pts2Dtemp.push(pt1_Temp);
            pts2Dtemp.push(pt2_Temp);
            pts2Dtemp.push(pt3_Temp);
            pts2Dtemp.push(pt4_Temp);
            pts2Dtemp.push(pt1_Temp.clone());

            var style = {surroundLineFlag:false,surroundLineLimit:true,lineTypeLimit:true,fillLimit:true,fillStyle:0,lineWidthLimit:true};
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2Dtemp,style);
        }
    },



    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25601"
});
