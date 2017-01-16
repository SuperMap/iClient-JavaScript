/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol37301 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    LINESCALE :0.05,

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
        this.scaleValues[2] = 0.25;
        this.scaleValues[3] = 0.8;
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

        if(this.scaleValues.length < 4){
            this.scaleValues = [];
            this.scaleValues[0] = 0.125;
            this.scaleValues[1] = 0.02;
            this.scaleValues[2] = 0.25;
            this.scaleValues[3] = 0.8;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,geoPts);

        var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[1],geoPts[0]);
        var startAngle = SuperMap.Plot.PlottingUtil.radian(geoPts[1],geoPts[0])*this.RTOD;

        //创建三角形图元
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];

        var pt1 = new SuperMap.Geometry.Point(dScale0*dDistance,dScale1*dDistance);
        var pt2 = new SuperMap.Geometry.Point(dScale0*dDistance,-dScale1*dDistance);

        var tempPt1 = SuperMap.Plot.PlottingUtil.coordinateTrans(geoPts[1],pt1,startAngle);
        var tempPt2 = SuperMap.Plot.PlottingUtil.coordinateTrans(geoPts[1],pt2,startAngle);

        var pts2D = [];
        pts2D.push(tempPt1);
        pts2D.push(tempPt2);
        pts2D.push(geoPts[1]);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D,{fillLimit:true,fillStyle:0});

        //第一条竖线
        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dScale2*dDistance, geoPts);
        if(!ptsindex.bfind) {
            return;
        }

        var dLenght = this.LINESCALE*dDistance;
        var line1Center = ptsindex.pts;

        var line1Pt1 = SuperMap.Plot.PlottingUtil.circlePoint(line1Center,dLenght,dLenght,startAngle+90);
        var line1Pt2 = SuperMap.Plot.PlottingUtil.circlePoint(line1Center,dLenght,dLenght,startAngle+270);

        pts2D = [];
        pts2D.push(line1Pt1);
        pts2D.push(line1Pt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true,surroundLineLimit:true});

        //第二条竖线
        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dScale3*dDistance, geoPts);
        if(!ptsindex.bfind) {
            return;
        }

        var line2Center = ptsindex.pts;
        var line2Pt1 = SuperMap.Plot.PlottingUtil.circlePoint(line2Center,dLenght,dLenght,startAngle+90);
        var line2Pt2 = SuperMap.Plot.PlottingUtil.circlePoint(line2Center,dLenght,dLenght,startAngle+270);

        pts2D = [];
        pts2D.push(line2Pt1);
        pts2D.push(line2Pt2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true,surroundLineLimit:true});

        //计算比例点
        this.scalePoints = [];
        this.addScalePoint(tempPt2);
        this.addScalePoint(line1Center);
        this.addScalePoint(line2Center);
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
            if (index < 0 || index > 2) {
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
            else if(1 == index)
            {
                var distance2 = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
                var dScale2 = distance2/dDistance;

                if(0.1 > dScale2 || dScale2 > 0.95)
                {
                    return;
                }

                this.scaleValues[2] = dScale2;
            }
            else if(2 == index)
            {
                var distance3 = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
                var dScale3 = distance3/dDistance;

                if(0.1 > dScale3 || dScale3 > 0.95)
                {
                    return;
                }

                this.scaleValues[3] = dScale3;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol37301"
});


