/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol37300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    CIRCLESCALE :0.35,
    RADIUSSCALE :0.05,

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
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues[0] = 0.125;
        this.scaleValues[1] = 0.02;
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

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);

        var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[1],geoPts[0]);
        var startAngle = SuperMap.Plot.PlottingUtil.radian(geoPts[1],geoPts[0])*this.RTOD;

        var tempPt = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[1],geoPts[0],this.CIRCLESCALE*dDistance);
        var circleCenter = SuperMap.Plot.PlottingUtil.circlePoint(tempPt,this.RADIUSSCALE*dDistance,this.RADIUSSCALE*dDistance,startAngle+90);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,[circleCenter,tempPt],{fill:false,fillLimit:true,lineTypeLimit:true,surroundLineLimit:true});

        //创建三角形图元
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];

        var pt1 = new SuperMap.Geometry.Point(dScale0*dDistance,dScale1*dDistance);
        var pt2 = new SuperMap.Geometry.Point(dScale0*dDistance,-dScale1*dDistance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(geoPts[1],pt1,startAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(geoPts[1],pt2,startAngle);

        var pts2D = [];
        pts2D.push(tempPt1);
        pts2D.push(tempPt2);
        pts2D.push(geoPts[1]);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D,{fillLimit:true,fillStyle:0});

        //计算比例点
        this.scalePoints = [];
        this.addScalePoint(tempPt2);
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
            if (index != 0) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[1],geoPts[0]);

            if(0 == index)
            {
                //求比例点到直线的垂足
                var plumbPt = SuperMap.Plot.PlottingUtil.projectPoint(pt,geoPts[1],geoPts[0]);

                //箭头长
                var distance1 = SuperMap.Plot.PlottingUtil.distance(plumbPt,geoPts[1]);
                var angle = SuperMap.Plot.PlottingUtil.radian(geoPts[1],plumbPt)*this.RTOD;

                if(90 > angle) {
                    distance1 = -distance1;
                }

                var dScale0 = distance1/dDistance;
                this.scaleValues[0] = dScale0;

                //箭头宽度的一半
                var distance2 = SuperMap.Plot.PlottingUtil.distance(pt,plumbPt);
                var dScale1 = distance2/dDistance;
                this.scaleValues[1] = dScale1;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol37300"
});


