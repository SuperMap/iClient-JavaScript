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
SuperMap.Geometry.AlgoSymbol3020901 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {



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
        this.scaleValues.push(0);
        this.scaleValues.push(0);
        this.scaleValues.push(0.125000);

        if(this.subSymbols >= 0){
            //this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4800));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts)
        {
            return;
        }

        var pts2D = [];
        if(2 == geoPts.length)
        {
            var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
            var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);

            var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
            var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI;

            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dis,dis,dAngle+60);

            pts2D.push(geoPts[0]);
            pts2D.push(pt2);
            pts2D.push(pt3);

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);
        }
        else
        {
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);

            for(var i = 0; i < geoPts.length; i++)
            {
                pts2D.push(geoPts[i]);
            }
        }

        //计算中心点
        //求多边形的中心点
        var center2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        if(!this.isEdit){
            this.scaleValues[2] = dAllDistance*this.getSubSymbolScaleValue()/dAllDistance;
        }

        var dScaleValue0 = this.scaleValues[0];
        var dScaleValue1 = this.scaleValues[1];
        var dScaleValue2 = this.scaleValues[2];

        var symbolPt = new SuperMap.Geometry.Point(center2D.x+dAllDistance*dScaleValue0,center2D.y+dAllDistance*dScaleValue1);
        var dSymbolSize = dAllDistance * dScaleValue2;

        ////////////////////////////////////////////////////////////
        //添加子符号
        if (0 < this.subSymbols.length)
        {
            this.computeSubSymbol(this.subSymbols[0], symbolPt, dSymbolSize, 0);
        }
        this.addScalePoint(symbolPt.clone());

        var scalePt2D = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt, 0.5*dSymbolSize, 0.5*dSymbolSize, 90);
        this.addScalePoint(scalePt2D);

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

            //获取位置点
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            if (geoPts.length < this.minEditPts)
            {
                return;
            }

            var pts2D = [];
            if(2 == geoPts.length)
            {
                var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
                var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);

                var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI;

                var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dis,dis,dAngle+60);

                pts2D.push(geoPts[0]);
                pts2D.push(pt2);
                pts2D.push(pt3);

                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);
            }
            else
            {
                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geoPts);

                for(var i = 0; i < geoPts.length; i++)
                {
                    pts2D.push(geoPts[i]);
                }
            }

            //求多边形的中心点
            var center2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);
            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            if(0 === index){
                this.scaleValues[0] = (pt.x-center2D.x)/dAllDistance;
                this.scaleValues[1] = (pt.y-center2D.y)/dAllDistance;
            }
            else if(1 === index){
                var symbolPt = new SuperMap.Geometry.Point(center2D.x+dAllDistance*this.scaleValues[0],center2D.y+dAllDistance*this.scaleValues[1]);
                var dis = SuperMap.Plot.PlottingUtil.distance(pt,symbolPt);
                var dScale = 2*dis/dAllDistance;

                if(dScale < 0.5){
                    this.scaleValues[2] = dScale;
                }
            }
        }

        this.calculateParts();
    },


    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol3020901"
});
