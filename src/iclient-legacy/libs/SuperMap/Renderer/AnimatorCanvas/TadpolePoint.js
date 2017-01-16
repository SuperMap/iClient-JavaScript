/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer/AnimatorCanvas.js
 */

/**
 * Class: SuperMap.Renderer.TadpolePoint
 * 在 AnimatorCanvas 的基础上重写点渲染方式，模拟“蝌蚪”，增加了闪烁和尾巴的效果
 * 用于模拟一些事物的运动，如车辆监控
 * 
 * Inherits from:
 *  - <SuperMap.Renderer.AnimatorCanvas>
 */
SuperMap.Renderer.TadpolePoint = SuperMap.Class(SuperMap.Renderer.AnimatorCanvas, {

    /**
     * APIProperty: glint
     * {Boolean} 是否开启闪烁效果，默认为true。
     *
     */
    glint:true,
    /**
     * APIProperty: tail
     * {Boolean} 是否开启尾巴效果，默认为true。
     *
     */
    tail:true,
    /**
     * Property: glintId
     * {Object} 记录feature的闪烁值。
     */
    glintId:null,
    /**
     * Constructor: SuperMap.Renderer.TadpolePoint
     * 蝌蚪点渲染
     * （不允许用户初始化）
     *
     */
    initialize: function(containerID, options,layer) {
        SuperMap.Renderer.AnimatorCanvas.prototype.initialize.apply(this, arguments);
        this.glintId = {};
    },
    



    /**
     * APIMethod: drawPoint
     * 重写父类方法，实现点的闪烁和尾巴效果
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry.Point>} 需要绘制的点对象
     * style    - {Object} 需要绘制的风格
     * featureId - {String} 当前点所对应的feature的id
     * frontGeometry - {<SuperMap.Geometry.Point>} 当前点对象的前一时刻的位置
     * backGeometry - {<SuperMap.Geometry.Point>} 当前点对象的后一时刻的位置
     */ 
    drawPoint: function(geometry, style, featureId,frontGeometry,backGeometry) {
        var me = this;
        if(style.graphic !== false) {
            if(style.externalGraphic) {
                me.drawExternalGraphic(geometry, style, featureId);
            } else {
                var feature = me.features[featureId][0];
                var frontFeature = feature.frontFeature;
                //转换为像素坐标
                var pt = me.getLocalXY(geometry);
                var p0 = pt[0];
                var p1 = pt[1];

                if(!isNaN(p0) && !isNaN(p1)) {
                    var twoPi = Math.PI*2;
                    var radius = style.pointRadius;
                    if(style.fill !== false) {
                        //绘制点
                        me.setCanvasStyle("fill", style);
                        me.canvas.beginPath();
                        me.canvas.arc(p0, p1, radius, 0, twoPi, true);
                        me.canvas.fill();
                        //其他效果
                        var p0_b = p0;
                        var p1_b = p1;
                        //闪烁，同一个featureId的对象共用一个闪烁变量值
                        if(me.glint)
                        {
                            //添加闪烁值
                            var fId = feature.attributes[this.layer.featureIdName];
                            var glint =this.glintId[fId];
                            if(!glint)
                            {
                                //初始化第一次的值
                                this.glintId[fId] = Math.random()+0.5;
                            }
                            else
                            {
                                //每次绘制进行修改大小
                                if(glint+0.1>1)
                                {
                                    glint = glint+0.1-1;
                                }
                                else
                                {
                                    glint+=0.1;
                                }
                                this.glintId[fId] = glint;
                            }
                            var value = glint;
                            var style1 = SuperMap.Util.cloneObject(style);
                            style1.fillOpacity = 0.3;
                            me.setCanvasStyle("fill", style1);
                            me.canvas.beginPath();
                            me.canvas.arc(p0, p1, radius*(1+value*2), 0, twoPi, true);
                            me.canvas.fill();
                        }
                        if(me.tail)
                        {
                            me.canvas.save();
                            //尾巴
                            var geo_f;
                            if(frontGeometry)
                            {
                                geo_f = frontGeometry;
                                var pt_f = me.getLocalXY(geo_f);
                                var p0_f = pt_f[0];
                                var p1_f = pt_f[1];
                            }

                            if(!isNaN(p0_f) && !isNaN(p1_f))
                            {
                                //利用倒数函数让尾巴点的半径进行递减，同时其透明度也在递减
                                var step=1/radius,
                                    currentRadius=1/(2*step)+ 1,
                                    di =  radius*0.8,
                                    num=Math.round(1/0.9/step),
                                    opacity=style.fillOpacity|| 1,
                                    colorStep=opacity/num;

                                var ji = 1;
                                for(var i = 3;true;i++)
                                {
                                    if(currentRadius<1.9){
                                        break;
                                    }
                                    opacity-=colorStep;
                                    opacity=opacity<0?0:opacity;
                                    me.canvas.globalAlpha=opacity;
                                    me.canvas.beginPath();
                                    //获取当前点和之前点之间的距离
                                    var mode = Math.sqrt((p0_f-p0_b)*(p0_f-p0_b) + (p1_f-p1_b)*(p1_f-p1_b));
                                    if(mode==0)
                                    {
                                        //跳到后一个点
                                    }
                                    //计算当前尾巴点的变化坐标
                                    var s_x = di *(p0_f-p0_b)/mode;
                                    var s_y = di*(p1_f-p1_b)/mode;
                                    //第三种方式绘制尾巴
                                    if(Math.abs(s_x*ji)<Math.abs(p0_f-p0_b) || Math.abs(s_y*ji)<Math.abs(p1_f-p1_b))
                                    {
                                        me.canvas.arc(p0_b+s_x*ji, p1_b+s_y*ji, currentRadius, 0, twoPi, true);
                                        ji++;
                                    }
                                    else
                                    {
                                        me.canvas.arc(p0_f, p1_f, currentRadius, 0, twoPi, true);
                                        p0_b = p0_f;
                                        p1_b = p1_f;
                                        if(frontFeature.frontFeature)
                                        {
                                            geo_f = frontFeature.frontFeature.geometry;
                                            pt_f = me.getLocalXY(geo_f);
                                            p0_f = pt_f[0];
                                            p1_f = pt_f[1];
                                        }
                                        else
                                        {
                                            me.canvas.fill();
                                            break;
                                        }
                                        ji = 1;
                                    }
                                    me.canvas.fill();
                                    di=currentRadius;
                                    currentRadius=1/(i*step)+1;
                                }

                            }
                            me.canvas.restore();
                        }
                        //点内部事件
                        if (me.hitDetection) {
                            me.setHitContextStyle("fill", featureId, style);
                            me.hitContext.beginPath();
                            me.hitContext.arc(p0, p1, radius, 0, twoPi, true);
                            me.hitContext.fill();
                        }
                    }

                    if(style.stroke !== false) {
                        //点轮廓
                        me.setCanvasStyle("stroke", style);
                        me.canvas.beginPath();
                        me.canvas.arc(p0, p1, radius, 0, twoPi, true);
                        me.canvas.stroke();
                        //点轮廓事件
                        if (me.hitDetection) {
                            me.setHitContextStyle("stroke", featureId, style);
                            me.hitContext.beginPath();
                            me.hitContext.arc(p0, p1, radius, 0, twoPi, true);
                            me.hitContext.stroke();
                        }
                        me.setCanvasStyle("reset");
                    }
                }
            }
        }

    },
    



    CLASS_NAME: "SuperMap.Renderer.TadpolePoint"
});

