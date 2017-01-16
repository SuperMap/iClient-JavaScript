/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer/AnimatorCanvas.js
 */

/**
 * Class: SuperMap.Renderer.RadiatePoint
 * 在 AnimatorCanvas 的基础上重写点渲染方式，实现了点的发射效果，发射效果使用线来模拟
 * 可以模拟人口迁徙
 * 
 * Inherits from:
 *  - <SuperMap.Renderer.AnimatorCanvas>
 */
SuperMap.Renderer.RadiatePoint = SuperMap.Class(SuperMap.Renderer.AnimatorCanvas, {

    /**
     * APIProperty: items
     * {Array} 线子对象数组，
     * 此数组用于设置每条线长度、代表的数据范围和style：
     *
     * 此数组的每一个子对象必须有四个属性：
     * start : 当前线表示的数据的下限（包含）;
     * end：当前线表示的数据的上限（不包含）;
     * style：代表需要赋值线的style。
     *
     * (start code)
     * items数组形如：
     * [
     *   {
     *      start:0,
     *      end:101,
     *      length:55,
     *      style:{
     *           strokeOpacity: 1,
     *          strokeColor: "#000000",
     *          strokeWidth: 1
     *      }
     *   },
     *   {
     *      start:101,
     *      end:201,
     *      length:60,
     *      style:{
     *          strokeOpacity: 1,
     *          strokeColor: "#0000FF",
     *          strokeWidth: 1.5
     *      }
     *   }
     *
     * ]
     * (end)
     * style详细属性请查看SuperMap.Feature.Vector.style
     */
    items:null,
    /**
     * APIProperty: dataField
     * 存放数据的字段，获取数据通过feature.attributes[dataField]获取
     * {String} 默认为null
     */
    dataField:null,
    /**
     * Property: style
     * 临时存储当前需要渲染所需的style
     * {Object} 默认为null
     */
    style:null,
    /**
     * Constructor: SuperMap.Renderer.RadiatePoint
     * 发射点渲染
     * （不允许用户初始化）
     *
     */
    initialize: function(containerID, options,layer) {
        SuperMap.Renderer.AnimatorCanvas.prototype.initialize.apply(this, arguments);
        this.glintId = {};
    },


    /**
     * APIMethod: smoothConvertPoint
     * 重写父类方法，对点进行模拟线的发射效果转换
     *
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>}   与当前时刻最接近的即将绘制的geometry
     * frontGeometry - {<SuperMap.Geometry>}  geometry 的前一个数据（同一实物）
     * backGeometry - {<SuperMap.Geometry>}  geometry 的后一个数据（同一实物）
     * featureId - {String} geometry 所对应的feature的id
     *
     * Returns:
     * {Array} 返回 [即将需要绘制的 geometry，geometry 的前一个数据，geometry 的后一个数据]
     */
    smoothConvertPoint:function(geometry,frontGeometry,backGeometry,featureId){
        var me = this;
        var options = me.features[featureId][2];
        var feature = me.features[featureId][0];


        if(options && options.smooth && options.smooth[0] && frontGeometry && me.items)
        {
            var data = feature.frontFeature.attributes[me.dataField];
            //计算运行到的位置
            var geo = geometry.clone();
            geo.x = frontGeometry.x + (geo.x - frontGeometry.x)*options.smooth[1];
            geo.y = frontGeometry.y + (geo.y - frontGeometry.y)*options.smooth[1];
            //计算geo和 frontGeometry 的距离
            var dis1 = geo.distanceTo(frontGeometry);
            //计算geo和 geometry 的距离
            var dis2 = geo.distanceTo(geometry);

            //寻找线的长度
            var len = 0;
            for(var i = 0;i<me.items.length;i++)
            {
                var item = me.items[i];
                if(data>=item.start && data<=item.end)
                {
                    len = item.length;
                    me.style = item.style;
                    break;
                }
            }

            //获取当前的分辨率
            var re = me.layer.map.getResolution();
            //把像素长度转换为地理
            len = len*re;
            //寻找前面的节点
            var pointF;
            var pointB;
            if(len/2<dis1)
            {
                if(len/2<dis2)
                {
                    pointF = new SuperMap.Geometry.Point(
                        (frontGeometry.x-  geo.x)*len/dis1/2+geo.x,
                        (frontGeometry.y-  geo.y)*len/dis1/2+geo.y
                    );
                    pointB = new SuperMap.Geometry.Point(
                        (geometry.x-  geo.x)*len/dis2/2+geo.x,
                        (geometry.y-  geo.y)*len/dis2/2+geo.y
                    );
                }
                else
                {
                    pointB= geometry.clone();
                    pointF = new SuperMap.Geometry.Point(
                        geo.x*2-pointB.x,
                        geo.y*2-pointB.y
                    );
                }


            }
            else
            {
                if(len/2<dis2)
                {
                    pointF= frontGeometry.clone();
                    pointB = new SuperMap.Geometry.Point(
                        geo.x*2-pointF.x,
                        geo.y*2-pointF.y
                    );
                }
                else
                {
                    pointB = geometry.clone();
                    pointF = frontGeometry.clone();
                }

            }

            //寻找后面的节点




            return [new SuperMap.Geometry.LineString([pointF,pointB]),frontGeometry,geometry];
        }
        else
        {
            return [geometry,frontGeometry,backGeometry];
        }
    },
    /**
     * APIMethod: drawPoint
     * 重写父类方法，调用线的绘制
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 需要绘制的点
     * style    - {Object}  绘制时的style
     * featureId - {String}  geometry 对应的 feature 的 id
     * frontGeometry - {<SuperMap.Geometry>}  geometry 的前一个数据（同一实物）
     * backGeometry - {<SuperMap.Geometry>}  geometry 的后一个数据（同一实物）
     */
    drawPoint: function(geometry, style, featureId,frontGeometry,backGeometry){
        var me = this;
        if(geometry instanceof SuperMap.Geometry.LineString)
        {
            this.drawLineString(geometry, me.style, featureId,null,null);
        }

    },
    /**
     * Method: renderPath
     * Render a path with stroke and optional fill.
     */
    renderPath: function(context, geometry, style, featureId, type) {
        var widthFactor=1;
        if(typeof context.setLineDash==="function"){
            var dasharray=this.dashStyle(style,widthFactor);
            context.setLineDash(dasharray);
        }

        var components = geometry.components;
        var len = components.length;
        context.beginPath();
        var start = this.getLocalXY(components[0]);
        var x = start[0];
        var y = start[1];


        if (!isNaN(x) && !isNaN(y)) {
            context.moveTo(start[0], start[1]);
            for (var i=1; i<len; ++i) {
                var pt = this.getLocalXY(components[i]);

                var grd=context.createLinearGradient(x,y,pt[0], pt[1]);
                grd.addColorStop("0","rgba(255,255,255,0)");
                grd.addColorStop("1",style.strokeColor);
//                context.lineCap="round";
                context.strokeStyle=grd;
                context.lineCap="round";

                context.lineTo(pt[0], pt[1]);
            }
            if (type === "fill") {
                context.fill();
            } else {
                context.stroke();
            }
        }
        if(typeof context.setLineDash==="function"){
            context.setLineDash([]);
        }
    },


        CLASS_NAME: "SuperMap.Renderer.RadiatePoint"
});

