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
SuperMap.Geometry.AlgoSymbol20300 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
        this.maxEditPts = 99999;

        this.scaleValues.push(0.1);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        var  geoPts = this.controlPoints;

        if (this.controlPoints.length <2)
        {
            return;
        }

        if (this.scaleValues.length !== 1)
        {
            this.scaleValues = [];
           this.scaleValues.push(0.1);
        }
        this.components = [];

        //var geoLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, this.controlPoints);
        //geoLine.style = {surroundLineFlag: false};
        //this.components.push(geoLine);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, this.controlPoints);


        var dScale = this.scaleValues[0];

        var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var dStep = dDistance*dScale;

        //创建圆的点
        var dRadius = dDistance * this.getSubSymbolScaleValue()*0.3;

        if(dStep < 2*dRadius)
        {
            dRadius = dStep*0.5;
        }

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};
        var nIndex = 0;
        for(var dis = dStep; dis < dDistance-dRadius; dis += dStep)
        {
            var obj= SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dis,geoPts);
            if(!obj.bfind)
            {
                continue;
            }
            var tempPt = obj.pts;

            var ptscircle =[];
            ptscircle.push(tempPt);
            var onCirclePt = new SuperMap.Geometry.Point(tempPt.x+dRadius,tempPt.y);
            ptscircle.push(onCirclePt);

            this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, ptscircle, style);

            if(nIndex===0){
                var scalePoint = new SuperMap.Geometry.Point(tempPt.x,tempPt.y);
                scalePoint.isScalePoint = true;
                scalePoint.tag = 0;
                this.scalePoints.push(scalePoint);
            }
            nIndex++;

        }


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


            if(this.scalePoints.length <= index)
                return;

            if(0 != index)
            {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length)
            {
                return;
            }

            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var nCircleIndex = -1;
            var dDitanceCtoP = 0.0;
            var circleCenterPt =  new SuperMap.Geometry.Point(0.0,0.0);

            for(var i = 0; i < geoPts.length-1; i++)
            {
                var tempPts=[];
                tempPts.push(geoPts[i]);
                tempPts.push(geoPts[i+1]);

                var plumbPt;//垂足点
                var obj = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, geoPts[i], geoPts[i+1]);
                //return {isOnline: isOnline, projectPoint: resultPoint};
                if(obj.isOnline){
                    plumbPt = obj.projectPoint;
                }
                var index = -1;
                //{isOnPolyLine:isOnPolyLine, index:index};
                var result = SuperMap.Plot.PlottingUtil.PointIsOnPolyLines(plumbPt, tempPts);
                if(!result.isOnPolyLine)
                {
                    continue;
                }
                index = result.index;

                var tempDistance = SuperMap.Plot.PlottingUtil.distance(pt,plumbPt);

                if(-1 == nCircleIndex)
                {
                    nCircleIndex = i;
                    circleCenterPt = plumbPt;
                    dDitanceCtoP = tempDistance;
                }
                else
                {
                    if(dDitanceCtoP > tempDistance)
                    {
                        nCircleIndex = i;
                        circleCenterPt = plumbPt;
                        dDitanceCtoP = tempDistance;
                    }
                }
            }

            if(-1 == nCircleIndex || nCircleIndex > geoPts.length-1)
            {
                return;
            }

            var distance = 0.0;
            //计算圆心到起始点的距离
            for(var i = 0; i < nCircleIndex; i++)
            {
                var pt1 = new SuperMap.Geometry.Point(geoPts[i].x,geoPts[i].y);
                var pt2 = new SuperMap.Geometry.Point(geoPts[i+1].x,geoPts[i+1].y);
                distance += SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
            }

            var tempPt = new SuperMap.Geometry.Point(geoPts[nCircleIndex].x,geoPts[nCircleIndex].y);
            distance += SuperMap.Plot.PlottingUtil.distance(tempPt,circleCenterPt);

            if(distance < 0 || distance > dDistance)
            {
                return;
            }

            var dScaleValue = distance/dDistance;
            this.scaleValues[0] = dScaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol20300"
});
