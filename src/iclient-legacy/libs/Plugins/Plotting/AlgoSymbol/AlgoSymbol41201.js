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
SuperMap.Geometry.AlgoSymbol41201 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues[0] = 0;
        this.scaleValues[1] = 0;
        this.scaleValues[2] = 0.1;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2)
        {
            return;
        }

        if(this.scaleValues.length < 3){
            this.scaleValues = [];
            this.scaleValues[0] = 0;
            this.scaleValues[1] = 0;
            this.scaleValues[2] = 0.1;
        }

        // if(!this.isEdit){
        //     this.scaleValues[2] = this.getSubSymbolScaleValue();
        // }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dScaleValue0 = this.scaleValues[0];
        var dScaleValue1 = this.scaleValues[1];
        var dScaleValue2 = this.scaleValues[2];

        var dOutRecDis = SuperMap.Plot.PlottingUtil.GetOutRectangleDis(geoPts);
        if(0 == dOutRecDis)
        {
            return;
        }

        //创建任意多边形图元
        if (2 == geoPts.length) {
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);
        }
        else {
            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,geoPts,{fill:false});
        }

        //获得任意多边形的中心
        var polygoncenter =  SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

        var symbolPt = new SuperMap.Geometry.Point(polygoncenter.x+dScaleValue0*dOutRecDis,polygoncenter.y+dScaleValue1*dOutRecDis);
        var dDis = dScaleValue2*dOutRecDis;

        //
        var ptranglept1 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dDis,dDis,90);
        var ptranglept2 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dDis,dDis,210);
        var ptranglept3 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dDis,dDis,330);

        var cellpts = [];
        cellpts.push(ptranglept1);
        cellpts.push(ptranglept2);
        cellpts.push(ptranglept3);
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,cellpts,{fill:false,lineTypeLimit:true,surroundLineLimit:true});

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(symbolPt);
        var scalePt1 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dDis,dDis,90);
        this.addScalePoint(scalePt1);
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
            if (2 > geoPts.length) {
                return;
            }


            var dOutRecDis = SuperMap.Plot.PlottingUtil.GetOutRectangleDis(geoPts);
            if(0 == dOutRecDis)
            {
                return;
            }

            var centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(geoPts);

            var scalePt2D = pt;
            if(0 == index)
            {
                var dScale0 = (scalePt2D.x-centerPt.x)/dOutRecDis;
                this.scaleValues[0] = dScale0;

                var dScale1 = (scalePt2D.y-centerPt.y)/dOutRecDis;
                this.scaleValues[1] = dScale1;
            }
            else if(1 == index)
            {
                var dScale0 = this.scaleValues[0];
                var dScale1 = this.scaleValues[1];

                var symbolPt = new SuperMap.Geometry.Point(centerPt.x+dScale0*dOutRecDis,centerPt.y+dScale1*dOutRecDis);
                var dDis = SuperMap.Plot.PlottingUtil.distance(scalePt2D,symbolPt);
                var dScale2 = dDis/dOutRecDis;

                this.scaleValues[2] = dScale2;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol41201"
});

