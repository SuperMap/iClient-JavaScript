/**
 * Class: SuperMap.Geometry.Brace
 * 大括号对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.Brace = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    /**
     * Constructor: SuperMap.Geometry.Brace
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.Brace>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.BRACESYMBOL;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.BRACESYMBOL;
        this.symbolName = "Brace";

        this.minEditPts = 2;
        this.maxEditPts = 2;

        this.scaleValues = [];
        this.scaleValues.push(0.1);
        this.scaleValues.push(0.1);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints === null || this.controlPoints.length < 2){
            return;
        }

        var pPnts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        var nCount = pPnts.length;

        var ptStart = pPnts[0];
        var ptEnd = pPnts[1];

        var dDistance = SuperMap.Plot.PlottingUtil.distance(ptStart, ptEnd);

        if (this.scaleValues.length < 2)
        {
            this.scaleValues = [];
            this.scaleValues.push(0.1);
            this.scaleValues.push(0.1);
        }

        var scaleValue1 = this.scaleValues[0];
        var scaleValue2 = this.scaleValues[1];

        var pt1 = new SuperMap.Geometry.Point(dDistance*scaleValue1,dDistance*scaleValue1);
        var pt2 = new SuperMap.Geometry.Point(dDistance*(0.5-scaleValue2/2),0);
        var pt3 = new SuperMap.Geometry.Point(dDistance*0.5,-dDistance*scaleValue2);
        var pt4 = new SuperMap.Geometry.Point(dDistance*(0.5+scaleValue2/2),0);
        var pt5 = new SuperMap.Geometry.Point(dDistance*(1-scaleValue1),dDistance*scaleValue1);

        var tempPts = [];
        var nStartAngle = 180 * Math.PI / 180 ;
        var nEndAngle = 270 * Math.PI / 180;
        var stepangle = 3 * Math.PI / 180;

        for (var i = nStartAngle; i <= nEndAngle; i += stepangle)
        {
            var tempPt1 = new SuperMap.Geometry.Point(pt1.x+dDistance*scaleValue1,pt1.y);
            tempPt1 = SuperMap.Plot.PlottingUtil.RotateAngle(pt1,i,tempPt1);
            tempPts.push(tempPt1);
        }

        tempPts.push(pt2);
        tempPts.push(pt3);
        tempPts.push(pt4);

        nStartAngle = 270 * Math.PI / 180 ;
        nEndAngle = 360 * Math.PI / 180;
        for (var i = nStartAngle; i <= nEndAngle; i += stepangle)
        {
            var tempPt1 = new SuperMap.Geometry.Point(pt5.x+dDistance*scaleValue1,pt5.y);
            tempPt1 = SuperMap.Plot.PlottingUtil.RotateAngle(pt5,i,tempPt1);
            tempPts.push(tempPt1);
        }

        var dAngle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd);

        var shapePnts = [];
        for(var j = 0; j < tempPts.length; j++)
        {
            var tempPt = new SuperMap.Geometry.Point(tempPts[j].x + ptStart.x, tempPts[j].y + ptStart.y);
            tempPt = SuperMap.Plot.PlottingUtil.RotateAngle(ptStart,dAngle,tempPt);
            shapePnts.push(tempPt);
        }
        
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePnts);

        //计算比例点
        this.scalePoints = [];
        var pt6 = new SuperMap.Geometry.Point(dDistance*scaleValue1,0);
        var tempPt6 = new SuperMap.Geometry.Point(pt6.x + ptStart.x,pt6.y + ptStart.y);

        tempPt6 = SuperMap.Plot.PlottingUtil.RotateAngle(ptStart,dAngle,tempPt6);
        tempPt6.isScalePoint = true;
        tempPt6.tag = 0;
        this.scalePoints.push(tempPt6);

        var tempPt3 = new SuperMap.Geometry.Point(pt3.x + ptStart.x,pt3.y + ptStart.y);
        SuperMap.Plot.PlottingUtil.RotateAngle(ptStart,dAngle,tempPt3);
        tempPt3.isScalePoint = true;
        tempPt3.tag = 1;
        this.scalePoints.push(tempPt3);
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            var pPnts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            //var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
            //var angle = Math.acos((pt.x - geoPts[0].x) / distance) * 180 / Math.PI;

            var dDistance = SuperMap.Plot.PlottingUtil.distance(pPnts[0],pPnts[1]);

            if(0 == index)
            {
                var dis = SuperMap.Plot.PlottingUtil.distance(pPnts[0],pt);

                var dScaleValue = dis/dDistance;
                if (dScaleValue > 0 && dScaleValue < 0.4)
                {
                    this.scaleValues[0] = dScaleValue;
                }
            }
            else if (1 == index)
            {
                var centerPt2D = new SuperMap.Geometry.Point((pPnts[0].x+pPnts[1].x)/2,(pPnts[0].y+pPnts[1].y)/2);
                var scalePt2D = new SuperMap.Geometry.Point(pt.x,centerPt2D.y);

                var dDisScale = SuperMap.Plot.PlottingUtil.distance(pt, centerPt2D);

                var dScaleValue = dDisScale/dDistance;
                if(0 < dScaleValue && 0.2 > dScaleValue)
                {
                    this.scaleValues[1] = dScaleValue;
                }
            }
        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.Brace"
});
