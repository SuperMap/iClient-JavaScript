/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25500 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    DISTANCE :0.0001,
    LINESCALE:0.25,
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

        this.minEditPts = 3;
        this.maxEditPts = 9999;

        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0.02);
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

        if(this.scaleValues.length == 0){
            this.scaleValues.push(0);
            this.scaleValues.push(0);
            this.scaleValues.push(0.02);
        }

        var minX = geoPts[0].x;
        var maxX = geoPts[0].x;

        for(var i = 0; i < geoPts.length; i++)
        {
            if(minX > geoPts[i].x)
                minX = geoPts[i].x;

            if(maxX < geoPts[i].x)
                maxX = geoPts[i].x;
        }

        var dSpaceLen = (maxX-minX)/50;

        //创建外面的任意多边形
        var ptsOut2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen, true);

        //创建任意多边形图元
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptsOut2D);

        //创建里面的任意多边形
        var ptsInner2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,false);

        //var lineWidth = this.symbolDefaultStyle.getLineWidth()* this.LINESCALE;
        var style = {surroundLineFlag: false, lineWidthLimit:true/*, lineWidth:lineWidth*/};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptsInner2D,style);

        //获得任意多边形的中心
        var polygoncenter =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[2] = this.getSubSymbolScaleValue()*0.5;
        }

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(polygoncenter.x+dDistance*dScale0,polygoncenter.y+dDistance*dScale1);
        var distance = dScale2*dDistance;

        //左竖线
        var pt1_1 = new SuperMap.Geometry.Point(symbolPt.x-4*distance,symbolPt.y+distance/2);
        var pt1_2 = new SuperMap.Geometry.Point(symbolPt.x-4*distance,symbolPt.y-distance/2);

        var pts2D = [];
        pts2D.push(pt1_1);
        pts2D.push(pt1_2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //左横线
        var pt2_1 = new SuperMap.Geometry.Point(symbolPt.x-4*distance,symbolPt.y);
        var pt2_2 = new SuperMap.Geometry.Point(symbolPt.x-1.5*distance,symbolPt.y);

        pts2D = [];
        pts2D.push(pt2_1);
        pts2D.push(pt2_2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        /*UGArray<CellPoints> cells = ComputeSubSymbol(100, 1300, symbolPt, 2.0*distance, 0);
         arr.Append(cells);*/
        //遮蔽区
        //V
        var pt3_1 = new SuperMap.Geometry.Point(symbolPt.x,symbolPt.y-distance);
        var pt3_2 = SuperMap.Plot.PlottingUtil.circlePoint(pt3_1,2*distance,2*distance,60);
        var pt3_3 = SuperMap.Plot.PlottingUtil.circlePoint(pt3_1,2*distance,2*distance,120);

        //半圆
        var ptCenter = new SuperMap.Geometry.Point((pt3_2.x+pt3_3.x)/2,pt3_2.y);
        var ptCirPts = [];
        for(var i = 0; i <= 180; i += 3){
            ptCirPts.push(SuperMap.Plot.PlottingUtil.circlePoint(ptCenter,distance,distance,i));
        }

        pts2D = [];
        for(var i = 0; i < ptCirPts.length; i++)
        {
            pts2D.push(ptCirPts[i].clone());
        }

        pts2D.push(pt3_3.clone());
        pts2D.push(pt3_1.clone());
        pts2D.push(pt3_2.clone());

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D);

        //右横线
        var pt7_1 = new SuperMap.Geometry.Point(symbolPt.x+4*distance,symbolPt.y);
        var pt7_2 = new SuperMap.Geometry.Point(symbolPt.x+1.5*distance,symbolPt.y);

        pts2D = [];
        pts2D.push(pt7_1.clone());
        pts2D.push(pt7_2.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //右竖线
        var pt8_1 = new SuperMap.Geometry.Point(symbolPt.x+4*distance,symbolPt.y+distance/2);
        var pt8_2 = new SuperMap.Geometry.Point(symbolPt.x+4*distance,symbolPt.y-distance/2);

        pts2D = [];
        pts2D.push(pt8_1.clone());
        pts2D.push(pt8_2.clone());

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(symbolPt.clone());
        var scalePt2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,distance,distance,90);
        this.addScalePoint(scalePt2.clone());
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

            if(0 != index && 1 != index) {
                return;
            }

            var geoPts = this.controlPoints;

            //获得任意多边形的中心
            var centerPt =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);
            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            if(SuperMap.Plot.PlottingUtil.equalFuzzy(dDistance, 0)){
                return;
            }

            if(0 == index)
            {
                var dScale0 = (pt.x-centerPt.x)/dDistance;
                this.scaleValues[0] = dScale0;

                var dScale1 = (pt.y-centerPt.y)/dDistance;
                this.scaleValues[1] = dScale1;
            }
            else if(1 == index)
            {
                var dScale0 = this.scaleValues[0];
                var dScale1 = this.scaleValues[1];

                var symbolPt = new SuperMap.Geometry.Point(centerPt.x+dDistance*dScale0,centerPt.y+dDistance*dScale1);
                var dDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,pt);
                var dScale2 = dDis/dDistance;
                this.scaleValues[2] = dScale2;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25500"
});
