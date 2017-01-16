/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol36600 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues[0] = 0.1;//第一个比例值表示半圆的半径/两个定位点的距离
        this.scaleValues[1] = 0.2;//第二个比例值表示子符号的大小/两个定位点的距离

        if (this.subSymbols.length >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 7300));
        }
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

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues[0] = 0.1;
            this.scaleValues[1] = 0.2;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        //绘制第0个定位点的半圆
        var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);
        var dAngle = SuperMap.Plot.PlottingUtil.radian(geoPts[0],geoPts[1])*this.RTOD;
        //获取半圆的半径
        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];

        var dRadius = dScale0 * dDistance;

        var startArcPts = [], i, pt;
        for (i = 90; i <= 270; i+=3)
        {
            pt = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],dRadius,dRadius,i+dAngle);
            startArcPts.push(pt);
        }

        var endArcPts = [];
        for (i = -90; i <= 90; i+=3)
        {
            pt = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[1],dRadius,dRadius,i+dAngle);
            endArcPts.push(pt);
        }

        //取第二个比例值,符号大小/两个定位点之间的距离
        var dSymbolSize = dDistance * dScale1;        //符号大小
        //子符号的位置点
        var symbolPt = new SuperMap.Geometry.Point((startArcPts[0].x+endArcPts[endArcPts.length-1].x)/2,(startArcPts[0].y+endArcPts[endArcPts.length-1].y)/2);

        //添加第二条连线上靠近起始点的折线图元
        var lineStartPt = SuperMap.Plot.PlottingUtil.LinePnt(startArcPts[0], endArcPts[endArcPts.length-1], (dDistance - 1.2*dSymbolSize) * 0.5);
        var lineEndPt	= SuperMap.Plot.PlottingUtil.LinePnt(endArcPts[endArcPts.length-1], startArcPts[0], (dDistance - 1.2*dSymbolSize) * 0.5);

        var allpts = [];
        allpts.push(lineStartPt);
        allpts.push.apply(allpts,startArcPts);
        allpts.push.apply(allpts,endArcPts);
        allpts.push(lineEndPt);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,allpts);

        var subSymAngle = SuperMap.Plot.PlottingUtil.radian(lineEndPt,lineStartPt)*this.RTOD;
        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], symbolPt,dSymbolSize,subSymAngle-90);
        }

        //添加比例点
        this.scalePoints = [];
        this.addScalePoint(startArcPts[startArcPts.length-1]);

        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,dSymbolSize,dSymbolSize,subSymAngle+90);
        this.addScalePoint(scalePt);
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

            var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);

            if(0 == index)     //调整第0个比例点
            {
                var dScaleDis = SuperMap.Plot.PlottingUtil.distance(pt,geoPts[0]);
                var dScale0 = dScaleDis/dDistance;
                this.scaleValues[0] = dScale0;
            }
            else if(1 == index)
            {
                //获取半圆的半径
                var firstValue = this.scaleValues[0];
                var dRadius = firstValue * dDistance;

                var startArcPt = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],dRadius,dRadius,90);
                var endArcPt = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[1],dRadius,dRadius,90);
                var symbolPt = new SuperMap.Geometry.Point((startArcPt.x+endArcPt.x)/2,(startArcPt.y+endArcPt.y)/2);
                var dScaleDis = SuperMap.Plot.PlottingUtil.distance(symbolPt,pt);
                var dScale1 = dScaleDis/dDistance;
                this.scaleValues[1] = dScale1;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol36600"
});

