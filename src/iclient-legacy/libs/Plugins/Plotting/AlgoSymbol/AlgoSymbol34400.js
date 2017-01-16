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
SuperMap.Geometry.AlgoSymbol34400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues[0] = 0.1;
        this.scaleValues[1] = 0.2;

        if(this.subSymbols.length == 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 6202));
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

        if(this.scaleValues.length < 2){
            this.scaleValues = [];
            this.scaleValues[0] = 0.1;
            this.scaleValues[1] = 0.2;
        }

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*this.RTOD;

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];

        if(dScale0 < 0 || dScale1 < 0){
            return;
        }

        var dDistance0 = dScale0 * allDistance;
        var dScale = (1-dScale1*(5.0/4.0));

        if(dScale < 0)
        {
            dScale = 0;
        }

        if(dScale > 1)
        {
            dScale = 1;
        }

        var dDistance1 = allDistance * dScale;

        var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dDistance1,dDistance1,angle);

        //计算平行线
        var arrPnts = [],paraPntsLeft = [],paraPntsRight = [];

        arrPnts.push(geoPts[0].clone());
        arrPnts.push(tempPt2D);

        paraPntsLeft = SuperMap.Plot.PlottingUtil.paraLine(arrPnts, dDistance0, true);
        paraPntsRight = SuperMap.Plot.PlottingUtil.paraLine(arrPnts, dDistance0, false);

        var leftLinePts = [], i;
        for(i = 0; i < paraPntsLeft.length; i++)
        {
            leftLinePts.push(paraPntsLeft[i]);
        }

        var rightLinePts = [];
        for(i = 0; i < paraPntsRight.length; i++)
        {
            rightLinePts.push(paraPntsRight[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftLinePts);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightLinePts);

        //计算符号
        var dDistance2 = dScale1 * allDistance;
        var midPt = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,dDistance2/2,dDistance2/2,angle);

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],midPt,dDistance2/2.0,angle+180);
        }

        var pts2D = [];
        //画斜线
        var dSpace = dDistance1 * 0.1;

        var leftLinePts2D = [];
        for(var i = 0; i < leftLinePts.length; i++)
        {
            leftLinePts2D.push(leftLinePts[i].clone());
        }

        var rightLinePts2D = [];
        for(i = 0; i < rightLinePts.length; i++)
        {
            rightLinePts2D.push(rightLinePts[i].clone());
        }

        var distance = SuperMap.Plot.PlottingUtil.distance(rightLinePts2D[0],rightLinePts2D[1]);
        if(dSpace >= distance) {
            return;
        }

        for(var d = dSpace; d < dDistance1 - dDistance0; d += dSpace)
        {
            var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(rightLinePts2D[0],d,d,angle);
            var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(tempPt,distance,distance,angle+45);


            var pntInter = SuperMap.Plot.PlottingUtil.intersectLines(tempPt,tempPt1,leftLinePts2D[0],leftLinePts2D[1]);
            if(pntInter.isIntersectLines);
            {
                var tempPt2 = pntInter.intersectPoint;
                var pntonline = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(tempPt2,leftLinePts2D);
                if(!pntonline.isOnPolyLine) {
                    break;
                }

                pts2D = [];
                pts2D.push(tempPt);
                pts2D.push(tempPt2);

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D,{lineTypeLimit:true,surroundLineLimit:true});
            }
        }

        //计算比例点
        this.scalePoints = [];
        var tempScalePt0 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dDistance0,dDistance0,angle+90);
        this.addScalePoint(tempScalePt0);
        var tempDis1 = dDistance2/2;
        var tempScalePt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd,tempDis1,tempDis1,angle+90);
        this.addScalePoint(tempScalePt1);
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
            if(0 !== index && 1 != index) {
                return;
            }

            var geoPts = this.controlPoints;
            if (2 > geoPts.length) {
                return;
            }

            var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            if(0 == index) {
                var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
                var dScale = dDistance/allDistance;
                this.scaleValues[0] = dScale;
            }
            else if(1 == index) {
                var dDistance = SuperMap.Plot.PlottingUtil.distance(geoPts[1],pt);
                var dScale = 2.0*dDistance/allDistance;
                this.scaleValues[1] = dScale;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol34400"
});
