/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25600 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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

        this.scaleValues = [];
        this.scaleValues.push(0.01);
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
        //创建里面的任意多边形
        var ptsInner2D = [],ptsOut2D = [], isRight = true;
        if(geoPts.length > 2){
            //在头两个点构成直线的左边
            if(!SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[0],geoPts[1],geoPts[2])){
                isRight = false;
                ptsInner2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,true);
                ptsOut2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,false);
            }
            else{
                ptsInner2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,false);
                ptsOut2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,true);
            }
        }
        else{
            ptsInner2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,false);
            ptsOut2D = SuperMap.Plot.PlottingUtil.ParaPolygon(geoPts,dSpaceLen,true);
        }


        //创建任意多边形图元
        var style = {surroundLineFlag: false,lineWidthLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptsOut2D,style);

        //var lineWidth = this.symbolDefaultStyle.getLineWidth()* this.LINESCALE;
        style = {surroundLineFlag: false, lineWidthLimit:true/*, lineWidth:lineWidth*/};
        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,ptsInner2D,style);

        if(geoPts.length > 2){
            var dDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
            if(!this.isEdit){
                this.scaleValues[0] = this.getSubSymbolScaleValue();
            }

            var distance = this.scaleValues[0]*dDistance*0.5;

            //计算外多边形上的三角形
            ptsOut2D.push(ptsOut2D[0].clone());
            for(var i = 0; i < ptsOut2D.length-1; i++)
            {
                //计算每条折线的中点
                var ptCenter = new SuperMap.Geometry.Point((ptsOut2D[i].x+ptsOut2D[i+1].x)/2,(ptsOut2D[i].y+ptsOut2D[i+1].y)/2);

                var pt1 = new SuperMap.Geometry.Point(0,0);
                var pt2 = new SuperMap.Geometry.Point(0,0);
                var pt3 = new SuperMap.Geometry.Point(0,0);
                //计算菱形的点
                if(isRight)
                {
                    pt1.x = 0;
                    pt1.y = 1.5*distance;
                    pt2.x = -0.5*distance;
                    pt2.y = 0;
                    pt3.x = 0.5*distance;
                    pt3.y = 0;
                }
                else
                {
                    pt1.x = 0;
                    pt1.y = -1.5*distance;
                    pt2.x = -0.5*distance;
                    pt2.y = 0;
                    pt3.x = 0.5*distance;
                    pt3.y = 0;
                }

                var angle = SuperMap.Plot.PlottingUtil.radian(ptCenter,ptsOut2D[i+1])*this.RTOD;

                var pt1_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt1,angle);
                var pt2_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt2,angle);
                var pt3_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt3,angle);

                var pts2D = [];
                pts2D.push(pt1_Temp);
                pts2D.push(pt2_Temp);
                pts2D.push(pt3_Temp);

                var style = {surroundLineFlag:false,surroundLineLimit:true,lineTypeLimit:true,fillLimit:true,fillStyle:0,lineWidthLimit:true};
                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D,style);
            }

            //计算内多边形上的三角形
            ptsInner2D.push(ptsInner2D[0].clone());
            for(var i = 0; i < ptsInner2D.length-1; i++)
            {
                //计算每条折线的中点
                var ptCenter = new SuperMap.Geometry.Point((ptsInner2D[i].x+ptsInner2D[i+1].x)/2,(ptsInner2D[i].y+ptsInner2D[i+1].y)/2);

                var pt1 = new SuperMap.Geometry.Point(0,0);
                var pt2 = new SuperMap.Geometry.Point(0,0);
                var pt3 = new SuperMap.Geometry.Point(0,0);
                //计算菱形的点
                if(isRight)
                {
                    pt1.x = 0;
                    pt1.y = -1.5*distance;
                    pt2.x = -0.5*distance;
                    pt2.y = 0;
                    pt3.x = 0.5*distance;
                    pt3.y = 0;
                }
                else
                {
                    pt1.x = 0;
                    pt1.y = 1.5*distance;
                    pt2.x = -0.5*distance;
                    pt2.y = 0;
                    pt3.x = 0.5*distance;
                    pt3.y = 0;
                }


                var angle = SuperMap.Plot.PlottingUtil.radian(ptCenter,ptsInner2D[i+1])*this.RTOD;

                var pt1_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt1,angle);
                var pt2_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt2,angle);
                var pt3_Temp = SuperMap.Plot.PlottingUtil.coordinateTrans(ptCenter,pt3,angle);

                var pts2D = [];
                pts2D.push(pt1_Temp);
                pts2D.push(pt2_Temp);
                pts2D.push(pt3_Temp);

                var style = {surroundLineFlag:false,surroundLineLimit:true,lineTypeLimit:true,fillLimit:true,fillStyle:0,lineWidthLimit:true};
                this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,pts2D,style);
            }
        }
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
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25600"
});
