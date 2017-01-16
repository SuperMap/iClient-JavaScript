
/**
 * Class: SuperMap.Geometry.CurveEight
 * AirLineStation对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.CurveEight = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * Constructor: SuperMap.Geometry.CurveEight
     * 创建一个AirLineStation对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.CurveEight>} 新的标绘对象。
     */
    initialize:function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.CURVEEIGHT;
        this.symbolType = SuperMap.Plot.SymbolType.CURVEEIGHT;
        this.symbolName = "CurveEight";

        this.minEditPts = 2;
        this.maxEditPts = 3;
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.AlgoSymbol.prototype.destroy.apply(this, arguments);
    },

    /**
    * Method: calculateParts
    * 重写了父类的方法
    */
    calculateParts: function () {
        this.init();

        //清空原有的所有点
        //this.components = [];

        if(!this.controlPoints || null === this.controlPoints || 2 > this.controlPoints.length){
            return;
        }

        if(2 === this.controlPoints.length){
            var pt1 = this.controlPoints[0].clone();
            var pt2 = this.controlPoints[1].clone();

            var radius = SuperMap.Plot.PlottingUtil.distance(pt1, pt2)/2;
            var angle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI;

            var lineCenterPt = new SuperMap.Geometry.Point((pt1.x+pt2.x)/2, (pt1.y+pt2.y)/2);

            var circleCenterPt1 = SuperMap.Plot.PlottingUtil.circlePoint(lineCenterPt, radius, radius, angle+90);
            var circleCenterPt2 = SuperMap.Plot.PlottingUtil.circlePoint(lineCenterPt, radius*3, radius*3, angle+90);

            var circle1 = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [circleCenterPt1, new SuperMap.Geometry.Point(circleCenterPt1.x+radius,circleCenterPt1.y)]);
            circle1.style = {surroundLineFlag: false};
            var circle2 = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [circleCenterPt2, new SuperMap.Geometry.Point(circleCenterPt2.x+radius,circleCenterPt2.y)]);
            circle2.style = {surroundLineFlag: false};

            this.components.push(circle1);
            this.components.push(circle2);
        } else {
            var pt1 = this.controlPoints[0].clone();
            var pt2 = this.controlPoints[1].clone();
            var pt3 = this.controlPoints[2].clone();

            var isRight = SuperMap.Plot.PlottingUtil.isRight(pt3, pt1, pt2);

            var angle = 0;

            if(isRight){
                angle = SuperMap.Plot.PlottingUtil.radian(pt2,pt1)*180/Math.PI+90;
            }
            else{
                angle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI+90;
            }

            var radius = SuperMap.Plot.PlottingUtil.distance(pt1, pt2)/2;
            var lineCenterPt = new SuperMap.Geometry.Point((pt1.x+pt2.x)/2, (pt1.y+pt2.y)/2);
            var circleCenterPt1 = SuperMap.Plot.PlottingUtil.circlePoint(lineCenterPt, radius, radius, angle);

            //求pt3到线pt1——pt2的距离
            var length = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt3, pt1, pt2);
            if(length <= radius*4){
                var circleCenterPt2 = SuperMap.Plot.PlottingUtil.circlePoint(lineCenterPt, radius*3, radius*3, angle);

                var circle1 = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [circleCenterPt1, new SuperMap.Geometry.Point(circleCenterPt1.x+radius,circleCenterPt1.y)]);
                circle1.style = {surroundLineFlag: false};
                var circle2 = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, [circleCenterPt2, new SuperMap.Geometry.Point(circleCenterPt2.x+radius,circleCenterPt2.y)]);
                circle2.style = {surroundLineFlag: false};

                this.components.push(circle1);
                this.components.push(circle2);
            }
            else{
                var circleCenterPt2 = SuperMap.Plot.PlottingUtil.circlePoint(lineCenterPt, length-radius, length-radius, angle);
                var arcAngle = Math.acos(radius/(length-2*radius))*180/Math.PI;

                var startAnlge_Arc1 = angle+arcAngle-360;
                var endAnlge_Arc1 = angle-arcAngle;

                var startAnlge_Arc2 = angle-180+arcAngle;
                var endAnlge_Arc2 = angle-180-arcAngle+360;

                var pts_Arc1 = [];
                for(var i = startAnlge_Arc1; i <= endAnlge_Arc1; i += 4){
                    var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt1,radius,radius,i);
                    pts_Arc1.push(tempPt);
                }
                var endPt_Arc1 = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt1,radius,radius,endAnlge_Arc1);
                pts_Arc1.push(endPt_Arc1);

                var pts_Arc2 = [];
                for(var i = startAnlge_Arc2; i < endAnlge_Arc2; i += 4){
                    var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt2,radius,radius,i);
                    pts_Arc2.push(tempPt);
                }
                var endPt_Arc2 = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt2,radius,radius,endAnlge_Arc2);
                pts_Arc2.push(endPt_Arc2);

                var pts2D = [];
                pts2D = pts2D.concat(pts_Arc1);
                //pts2D = pts2D.concat(pts_Arc2);
                for(var i = pts_Arc2.length-1; i >= 0; i--){
                    pts2D.push(pts_Arc2[i]);
                }

                var polyLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);
                polyLine.style = {surroundLineFlag: false};

                this.components.push(polyLine);
            }

        }
    },

    CLASS_NAME:"SuperMap.Geometry.CurveEight"
});
