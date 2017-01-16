/**
 * Created by Administrator on 2016/12/6.
 */
/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry.js
 */

/**
 * Class: SuperMap.Geometry.Point
 * 点几何对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry>
 */
SuperMap.Geometry.EditPoint = SuperMap.Class(SuperMap.Geometry.Collection, {

    pt: null,

    /**
     * Property: size
     * {Integer} 位置点的大小，单位为像素
     */
    size:3.5,

    rotateSize: 4,

    /**
     * Property: layer
     * {<SuperMap.Layer.PlottingLayer>} 用来存储点的类型
     */
    layer: null,

    isMultiPlotting: true,
    /**
     * Constructor: SuperMap.Geometry.Point
     * 实例化点对象。
     * (code)
     *  var point = new SuperMap.Geometry.Point(-111.04, 45.68);
     * (end)
     *
     * Parameters:
     * x - {float} x-坐标
     * y - {float} y-坐标
     * type - {String} 用来存储点的类型
     * tag -  {float} 用来存储额外的属性，比如差值分析中的Z值。
     *
     */
    initialize: function(pt, layer) {
        SuperMap.Geometry.prototype.initialize.apply(this, arguments);

        this.pt = pt;
        this.layer = layer;
        this.isMultiPlotting = true;

        if(this.components === null){
            this.components = [];
        }
    },

    /**
     * Method: calculateBounds
     * Create a new Bounds based on the lon/lat
     * 计算点对象的范围。
     */
    calculateBounds: function () {
        this.bounds = new SuperMap.Bounds(this.pt.x, this.pt.y,
            this.pt.x, this.pt.y);
        //this.bounds = null;
        //var bounds = new SuperMap.Bounds();
        //var components = this.components;
        //if (components) {
        //    for (var i=0, len=components.length; i<len; i++) {
        //        bounds.extend(components[i].getBounds());
        //    }
        //}
        //// to preserve old behavior, we only set bounds if non-null
        //// in the future, we could add bounds.isEmpty()
        //if (bounds.left != null && bounds.bottom != null &&
        //    bounds.right != null && bounds.top != null) {
        //    this.setBounds(bounds);
        //}
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        if(null === this.pt || null === this.layer || null === this.layer.map){
            return;
        }

        var controlPoints = [];
        if (undefined !== this.pt.nHandle && null !== this.pt.nHandle) {
            var tempPt0 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0, 0));
            var tempPt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(this.size, 0));
            var dis = SuperMap.Plot.PlottingUtil.distance({x: tempPt0.lon, y: tempPt0.lat}, {x: tempPt1.lon,y: tempPt1.lat});

            switch (this.pt.nHandle) {
                case 1:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y + 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - 2 * dis, this.pt.y + 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - 2 * dis, this.pt.y));
                    break;
                }
                case 2:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - dis, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + dis, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + dis, this.pt.y + 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - dis, this.pt.y + 2 * dis));
                    break;
                }
                case 3:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + 2 * dis, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + 2 * dis, this.pt.y + 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y + 2 * dis));
                    break;
                }
                case 4:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y + dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - 2 * dis, this.pt.y + dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - 2 * dis, this.pt.y - dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y - dis));
                    break;
                }
                case 5:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y + dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + 2 * dis, this.pt.y + dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + 2 * dis, this.pt.y - dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y - dis));
                    break;
                }
                case 6:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y - 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - 2 * dis, this.pt.y - 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - 2 * dis, this.pt.y));
                    break;
                }
                case 7:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - dis, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x - dis, this.pt.y - 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + dis, this.pt.y - 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + dis, this.pt.y));
                    break;
                }
                case 8:
                {
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + 2 * dis, this.pt.y));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x + 2 * dis, this.pt.y - 2 * dis));
                    controlPoints.push(new SuperMap.Geometry.Point(this.pt.x, this.pt.y - 2 * dis));
                    break;
                }
                default :
                {
                    return;
                }
            }
        }
        else if (true === this.pt.isRotatePoint) {
            var tempPt0 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0, 0));
            var tempPt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(this.rotateSize, 0));
            var dis = 2*SuperMap.Plot.PlottingUtil.distance({x: tempPt0.lon, y: tempPt0.lat}, {x: tempPt1.lon,y: tempPt1.lat});

            var tempPt = new SuperMap.Geometry.Point(0,0);
            var arcPt1 = [];
            for(var i = 15; i <= 75; i += 10){
                arcPt1.push(SuperMap.Plot.PlottingUtil.circlePoint(tempPt, dis, dis, i));
            }

            var arcPt2 = [];
            for(var i = 15; i <= 75; i += 10){
                arcPt2.push(SuperMap.Plot.PlottingUtil.circlePoint(tempPt, 1.2*dis, 1.2*dis, i));
            }

            var radius = dis * 0.8;

            var pt1 = arcPt1[0];
            var pt2 = arcPt2[0];
            var anlge1 = SuperMap.Plot.PlottingUtil.radian(pt1, pt2)*180/Math.PI;

            var centerPt1 = new SuperMap.Geometry.Point((pt1.x+pt2.x)/2,(pt1.y+pt2.y)/2);

            var arrowPt1 = SuperMap.Plot.PlottingUtil.LinePnt(pt1,pt2,dis*0.5);
            var arrowPt2 = SuperMap.Plot.PlottingUtil.LinePnt(pt2,pt1,dis*0.5);
            var arrowPt3 = SuperMap.Plot.PlottingUtil.circlePoint(centerPt1, radius, radius, anlge1-90);

            var pt3 = arcPt1[arcPt1.length-1];
            var pt4 = arcPt2[arcPt2.length-1];
            var centerPt2 = new SuperMap.Geometry.Point((pt3.x+pt4.x)/2,(pt3.y+pt4.y)/2);
            var anlge2 = SuperMap.Plot.PlottingUtil.radian(pt3, pt4)*180/Math.PI;
            var arrowPt4 = SuperMap.Plot.PlottingUtil.LinePnt(pt3,pt4,dis*0.5);
            var arrowPt5 = SuperMap.Plot.PlottingUtil.LinePnt(pt4,pt3,dis*0.5);
            var arrowPt6 = SuperMap.Plot.PlottingUtil.circlePoint(centerPt2, radius, radius, anlge2+90);

            controlPoints = controlPoints.concat(arcPt1);
            controlPoints.push(arrowPt5);
            controlPoints.push(arrowPt6);
            controlPoints.push(arrowPt4);

            for(var i = arcPt2.length-1; i >= 0; i--){
                controlPoints.push(arcPt2[i]);
            }

            controlPoints.push(arrowPt1);
            controlPoints.push(arrowPt3);
            controlPoints.push(arrowPt2);

            for(var m = 0; m < controlPoints.length; m++){
                controlPoints[m].x += this.pt.x;
                controlPoints[m].y += this.pt.y;
            }
        }
        else {
            var tempPt0 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0, 0));
            var tempPt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(this.size, 0));
            var dis = SuperMap.Plot.PlottingUtil.distance({x: tempPt0.lon, y: tempPt0.lat}, {x: tempPt1.lon,y: tempPt1.lat});

            var topLeftPt = new SuperMap.Geometry.Point(this.pt.x - dis, this.pt.y + dis);
            var downLeftPt = new SuperMap.Geometry.Point(this.pt.x - dis, this.pt.y - dis);
            var topRightPt = new SuperMap.Geometry.Point(this.pt.x + dis, this.pt.y + dis);
            var downRightPt = new SuperMap.Geometry.Point(this.pt.x + dis, this.pt.y - dis);

            controlPoints.push(topLeftPt);
            controlPoints.push(topRightPt);
            controlPoints.push(downRightPt);
            controlPoints.push(downLeftPt);
        }

        if(this.components.length === 0){
            var linearRing = new SuperMap.Geometry.LinearRing(controlPoints);
            var polygon = new SuperMap.Geometry.Polygon([linearRing]);

            this.components.push(polygon);

        } else {
            this.components[0].components[0].components = controlPoints;
        }

        //this.clearBounds();
    },

    /**
     * Method: clearBounds
     * Nullify this components bounds and that of its parent as well.
     * 清除几何对象的bounds。
     * 如果该对象有父类，也会清除父类几何对象的bounds。
     */
    clearBounds: function() {
        SuperMap.Geometry.Collection.prototype.clearBounds.apply(this, arguments);

        for(var i = 0; i < this.components.length; i++){
            if(this.components[i] instanceof SuperMap.Feature.Vector){
                this.components[i].geometry.clearBounds();
            } else {
                this.components[i].clearBounds();
            }
        }
    },

    /**
    * APIMethod: move
    * 沿着x、y轴的正方向上按照给定的位移移动点对象，move 不仅改变了几何对象的位置并且清理了边界缓存。
    *
    * Parameters:
    * x - {Float} x轴正方向上的偏移量。
    * y - {Float} y轴正方向上偏移量。
    *
    * (code)
    * var point = new SuperMap.Geometry.Point(10,20);
    * var dx = 10*Math.random();
    * var dy = 10*Math.random();
    * point.move(dx,dy);
    * (end)
    */
    move: function(x, y) {
        this.pt.x = this.pt.x + x;
        this.pt.y = this.pt.y + y;
        this.calculateParts();
        this.clearBounds();
    },

    /**
     * APIMethod: destroy
     *释放点对象的资源
     */
    destroy: function() {
        this.pt.x = null;
        this.pt.y=null;
        SuperMap.Geometry.prototype.destroy.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.Geometry.EditPoint"
});

