/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer/AnimatorCanvas.js
 */

/**
 * Class: SuperMap.Renderer.StretchLine
 * 在 AnimatorCanvas 的基础上重写线渲染方式，实现了线数据的延伸和缩短效果
 * 可以用于如地铁修建的模拟
 * 
 * Inherits from:
 *  - <SuperMap.Renderer.AnimatorCanvas>
 */
SuperMap.Renderer.StretchLine = SuperMap.Class(SuperMap.Renderer.AnimatorCanvas, {
    

    
    /**
     * Constructor: SuperMap.Renderer.StretchLine
     * 伸缩线渲染
     * （不允许用户初始化）
     *
     */
    initialize: function(containerID, options,layer) {
        SuperMap.Renderer.AnimatorCanvas.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: smoothConvertLine
     * 重写了父类的方法，对线进行了伸缩转换
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
    smoothConvertLine:function(geometry,frontGeometry,backGeometry,featureId){
        var options = this.features[featureId][2];
        if(options && options.smooth && options.smooth[0])
        {
            var geo = geometry.clone();
            var geo1 = frontGeometry.clone();
            var geo2 = geometry.clone();

            var arr = [];

            //记录 geo1 和 geo2 中点相等的起始位置
            var startIndex1 = 0;
            //记录 geo1 和 geo2 中点相等的结束位置
            var endIndex1 = 0;
            //记录 geo2 和 geo1 中点相等的起始位置
            var startIndex2 = 0;
            //记录 geo2 和 geo1 中点相等的结束位置
            var endIndex2 = 0;

            //记录 geo1 前面多出来的节点的总长度
            var disF1 = 0;
            //记录 geo1 前面多出来的节点是否还需要计算长度
            var disFS1 = true;
            //记录 geo2 前面多出来的节点的总长度
            var disF2 = 0;
            //记录 geo2 前面多出来的节点是否还需要计算长度
            var disFS2 = true;

            //定义是否处于两点相等
            var isE = false;
            //循环 geo2，假设  geo1 到 geo2 的开始是在延伸的
            for(var i = 0,len = geo2.components.length;i<len;i++)
            {
                if(isE) endIndex1++;
                var point1 = geo1.components[endIndex1];
                var point2 = geo2.components[i];
                if(point1)
                {
                    if(point1.equals(point2))
                    {
                        //进入相等节点地方
                        if(!isE)
                        {
                            isE = true;
                            startIndex2 = i;
                            //再加最后一次前部分长度
                            if(i>0 && disFS2)
                            {
                                disF2+= geo2.components[i].distanceTo(geo2.components[i-1]);
                            }
                            disFS2 = false;
                        }

                        endIndex2 = i;
                        arr.push(point2.clone());
                    }
                    else
                    {
                        //从最开始第二个节点开始计算长度
                        if(i>0 && disFS2)
                        {
                            disF2+= geo2.components[i].distanceTo(geo2.components[i-1]);
                        }

                    }
                }
                else
                {
                    if(endIndex1>0) endIndex1--;
                    break;
                }
            }

            if(endIndex2 == 0)
            {
                isE = false;
                //循环 geo1，假设  geo1 到 geo2 的开始是在收缩的
                for(var j = 0,len = geo1.components.length;j<len;j++)
                {
                    if(isE) endIndex2++;
                    var point1 = geo1.components[j];
                    var point2 = geo2.components[endIndex2];
                    if(point2)
                    {
                        if(point2.equals(point1))
                        {
                            //进入相等节点地方
                            if(!isE)
                            {
                                isE = true;
                                startIndex1 = j;
                                //再加最后一次前部分长度
                                if(i>0 && disFS2)
                                {
                                    disF1+= geo1.components[j].distanceTo(geo1.components[j-1]);
                                }
                                disFS1 = false;
                            }

                            endIndex1 = j;
                            arr.push(point1.clone());
                        }
                        else
                        {
                            //从最开始第二个节点开始计算长度
                            if(j>0 && disFS1)
                            {
                                disF1+= geo1.components[j].distanceTo(geo1.components[j-1]);
                            }

                        }
                    }
                    else
                    {
                        if(endIndex2>0) endIndex2--;
                        break;
                    }
                }
            }
            //计算geo1 到geo2时前面延伸的部分渐变
            if(startIndex2>0 && (startIndex1 == 0))
            {
                //至少有两个对象
                var arrF2 = geo2.components.slice(0,startIndex2+1);
                this.unshiftPoint(arr,arrF2,disF2,options.smooth[1]);
            }
            //计算geo1 到geo2时前面收缩的部分渐变
            if(startIndex1>0 && (startIndex2 == 0))
            {
                //至少有两个对象
                var arrF1 = geo1.components.slice(0,startIndex1+1);
                this.unshiftPoint(arr,arrF1,disF1,1-options.smooth[1]);
            }
            //计算geo1 到geo2时后面延伸的部分渐变
            if(endIndex2<geo2.components.length-1 && (endIndex1 === geo1.components.length-1))
            {
                //至少有两个对象
                var arrB2 = geo2.components.slice(endIndex2);
                var  disB2 = 0;
                for(var m = 0;m<arrB2.length-1;m++)
                {
                    disB2+=arrB2[m].distanceTo(arrB2[m+1]);
                }
                this.pushPoint(arr,arrB2,disB2,options.smooth[1]);
            }
            //计算geo1 到geo2时后面收缩的部分渐变
            if(endIndex1<geo1.components.length-1 && (endIndex2 === geo2.components.length-1))
            {
                //至少有两个对象
                var arrB1 = geo1.components.slice(endIndex1);
                var  disB1 = 0;
                for(var m = 0;m<arrB1.length-1;m++)
                {
                    disB1+=arrB1[m].distanceTo(arrB1[m+1]);
                }
                this.pushPoint(arr,arrB1,disB1,1-options.smooth[1]);
            }
            geo.components = arr;

            return [geo,frontGeometry,geometry];
        }
        else
        {
            return [geometry,frontGeometry,backGeometry];
        }
    },

    unshiftPoint:function(points,arr,dis,smooth){
        var la = 0;
        for(var a = arr.length-1;a>0;a--)
        {
            var point_a_B = arr[a];
            var point_a_F = arr[a-1];
            var mod_a_B_F = point_a_B.distanceTo(point_a_F);
            var cm_a = dis*smooth-la;
            if(cm_a<=mod_a_B_F)
            {
                var xa =  point_a_B.x + (point_a_F.x-point_a_B.x)*cm_a/mod_a_B_F;
                var ya =  point_a_B.y + (point_a_F.y-point_a_B.y)*cm_a/mod_a_B_F;
                points.unshift(new SuperMap.Geometry.Point(xa,ya));
                break;
            }
            else
            {
                la+= mod_a_B_F;
                points.unshift(point_a_F.clone());
            }
        }
        return points;
    },
    pushPoint:function(points,arr,dis,smooth){
        var la = 0;
        for(var a = 0;a<arr.length-1;a++)
        {
            var point_a_B = arr[a+1];
            var point_a_F = arr[a];
            var mod_a_B_F = point_a_B.distanceTo(point_a_F);
            var cm_a = dis*smooth-la;
            if(cm_a<=mod_a_B_F)
            {
                var xa =  point_a_F.x + (point_a_B.x-point_a_F.x)*cm_a/mod_a_B_F;
                var ya =  point_a_F.y + (point_a_B.y-point_a_F.y)*cm_a/mod_a_B_F;
                points.push(new SuperMap.Geometry.Point(xa,ya));
                break;
            }
            else
            {
                la+= mod_a_B_F;
                points.push(point_a_B.clone());
            }
        }
        return points;
    },
    



    CLASS_NAME: "SuperMap.Renderer.StretchLine"
});

