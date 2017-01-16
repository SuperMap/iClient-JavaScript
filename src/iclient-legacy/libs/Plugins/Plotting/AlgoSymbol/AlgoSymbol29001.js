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
SuperMap.Geometry.AlgoSymbol29001 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    CARSCALE:  0.1,

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
        this.maxEditPts = 3;

        this.scaleValues = [];
        this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 5200));
        this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 5200));
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints <2)
        {
            return;
        }

        var  geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);


        // if (this.scaleValues.length !== 2)
        // {
        //     this.scaleValues = [];
        //     this.scaleValues.push(0.02);
        //     this.scaleValues.push(0);
        // }

        // if(!this.isEdit){
        //     this.scaleValues[0] = this.getSubSymbolScaleValue();
        // }

        var nCount = geoPts.length;


        var ddis = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);
        var dangle = SuperMap.Plot.PlottingUtil.radian(geoPts[0],geoPts[1]) * this.RTOD;
        var dsymbolsize = ddis*this.CARSCALE;// * this.getSubSymbolScaleValue();

        var ptCar1 = geoPts[1].clone();
        var ptCar2 = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[1],geoPts[0],2*ddis);

        if(this.subSymbols.length > 1){
            this.computeSubSymbol(this.subSymbols[0], ptCar1,dsymbolsize,dangle);
            this.computeSubSymbol(this.subSymbols[1], ptCar2,dsymbolsize,dangle);
        }

        var primitives = new SuperMap.Geometry.Primitives();
        var shapePts = [];
        if(nCount == 2){
            var linering = primitives.circle(geoPts);
            shapePts.push.apply(shapePts, linering.components[0].components);
        }
        else if(nCount == 3){
            var linering = primitives.ellipse(geoPts,0, true);
            shapePts.push.apply(shapePts, linering.components);
        }

        //计算圆或者椭圆的缺口
        //创建折线图元1
        var pt1_0 = new SuperMap.Geometry.Point(0.8*ddis,ddis*0.1);
        var pt1_1 = new SuperMap.Geometry.Point(1.2*ddis,ddis*0.1);
        var pt1_2 = new SuperMap.Geometry.Point(1.2*ddis,-ddis*0.1);
        var pt1_3 = new SuperMap.Geometry.Point(0.9*ddis,-ddis*0.1);

        var pts2D = [];
        pts2D.push(pt1_0);
        pts2D.push(pt1_1);
        pts2D.push(pt1_2);
        pts2D.push(pt1_3);

        var pts2D_1 = [];
        var i = 0;
        for(i = 0; i < 4; i++)
        {
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(geoPts[0],pts2D[i],dangle);
            pts2D_1.push(pt);
        }

        //创建折线图元2
        var pt2_0 = new SuperMap.Geometry.Point(-0.8*ddis,ddis*0.1);
        var pt2_1 = new SuperMap.Geometry.Point(-1.2*ddis,ddis*0.1);
        var pt2_2 = new SuperMap.Geometry.Point(-1.1*ddis,-ddis*0.1);
        var pt2_3 = new SuperMap.Geometry.Point(-0.8*ddis,-ddis*0.1);

        pts2D = [];
        pts2D.push(pt2_0);
        pts2D.push(pt2_1);
        pts2D.push(pt2_2);
        pts2D.push(pt2_3);

        var pts2D_2 = [];
        for(i = 0; i < 4; i++)
        {
            var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(geoPts[0],pts2D[i],dangle);
            pts2D_2.push(pt);
        }

        var ptStart = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[1],geoPts[0],3*ddis);
        var ptEnd = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[0],geoPts[1],2*ddis);

        var intersectionPts = [];
        for(var i = 0; i < shapePts.length-1; i++)
        {
            var tempPt = SuperMap.Plot.PlottingUtil.intersectLines(shapePts[i],shapePts[i+1],ptStart,ptEnd);
            if(tempPt.isIntersectLines)
            {
                var tempIndex = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(tempPt.intersectPoint,shapePts);
                if(tempIndex.isOnPolyLine)
                {
                    intersectionPts.push(tempPt.intersectPoint);
                }
            }
        }

        if(0 >= intersectionPts.length)
        {
            return;
        }

        var tempIndex = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(intersectionPts[0],shapePts);
        if(!tempIndex.isOnPolyLine)
        {
            return;
        }

        var sortPts = [];
        for(i = tempIndex.index+1; i < shapePts.length; i++)
        {
            sortPts.push(shapePts[i]);
        }
        for(i = 0; i <= tempIndex.index; i++)
        {
            sortPts.push(shapePts[i]);
        }

        var startPolygon = [];
        var endPolygon = [];

        if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(pts2D_1,intersectionPts[0]))
        {
            startPolygon.push.apply(startPolygon, pts2D_1);
            endPolygon.push.apply(endPolygon, pts2D_2);
        }
        else
        {
            startPolygon.push.apply(startPolygon, pts2D_2);
            endPolygon.push.apply(endPolygon, pts2D_1);
        }

        var ellipsePts1 = [];
        var ellipsePts2 = [];
        var tempIndex = -1;
        for(i = 0; i < sortPts.length; i++) {
            if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(startPolygon,sortPts[i])) {
                if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(endPolygon,sortPts[i])) {
                    ellipsePts1.push(sortPts[i]);
                }
                else {
                    tempIndex = i;
                    break;
                }
            }
        }

        if(-1 != tempIndex)
        {
            for(i = tempIndex; i < sortPts.length; i++)
            {
                if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(endPolygon,sortPts[i]))
                {
                    if(!SuperMap.Plot.PlottingUtil.ptIsInPolygon(startPolygon,sortPts[i]))
                    {
                        ellipsePts2.push(sortPts[i]);
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ellipsePts1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ellipsePts2);
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol29001"
});
