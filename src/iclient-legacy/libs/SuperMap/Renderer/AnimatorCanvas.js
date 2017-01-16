/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer.js
 */

/**
 * Class: SuperMap.Renderer.AnimatorCanvas
 * 基于 2D 'canvas' 的一种渲染，用于渲染矢量动画效果
 * 支持点线面的渐变效果
 * 
 * Inherits from:
 *  - <SuperMap.Renderer>
 */
SuperMap.Renderer.AnimatorCanvas = SuperMap.Class(SuperMap.Renderer, {
    
    /**
     * Property: hitDetection
     * {Boolean} 是否允许监测 features，默认为 true（现在还不支持事件，没得必要绘制）。
     * （其实就是是否支持选择事件）
     */
    hitDetection: true,
    
    /**
     * Property: hitOverflow
     * {Number} The method for converting feature identifiers to color values
     *     supports 16777215 sequential values.  Two features cannot be 
     *     predictably detected if their identifiers differ by more than this
     *     value.  The hitOverflow allows for bigger numbers (but the 
     *     difference in values is still limited).
     *     好像是用于控制颜色值转换为featureid时的模糊处理
     */
    hitOverflow: 0,

    /**
     * Property: canvas
     * {Canvas} The canvas context object.
     */
    canvas: null, 
    
    /**
     * Property: features
     * {Object} Internal object of feature/style pairs for use in redrawing the layer.
     */
    features: null,
    


    /**
     * Property: londingimgs
     * {Object} 处于下载中的图片
     */
    londingimgs:{},
    /**
     * Property: londedimgs
     * {Object} 下载完毕的图片
     */
    londedimgs:{},
    /**
     * Property: layer
     * {<SuperMap.Layer.AnimatorVector>} 存放图层
     */
    layer:null,
    /**
     * Constructor: SuperMap.Renderer.AnimatorCanvas
     * 动画渲染类的构造函数
     * （不允许用户初始化）
     */
    initialize: function(containerID, options,layer) {
        this.layer = layer;
        SuperMap.Renderer.prototype.initialize.apply(this, arguments);
        this.root = document.createElement("canvas");
        this.container.appendChild(this.root);
        this.canvas = this.root.getContext("2d");
        this.features = {};
        //事件
        if (this.hitDetection) {
            this.hitCanvas = document.createElement("canvas");
            this.hitContext = this.hitCanvas.getContext("2d");
        }
    },
    
    /**
     * Method: setExtent
     * Set the visible part of the layer.
     *
     * Parameters:
     * extent - {<OpenLayers.Bounds>}
     * resolutionChanged - {Boolean}
     *
     * Returns:
     * {Boolean} true to notify the layer that the new extent does not exceed
     *     the coordinate range, and the features will not need to be redrawn.
     *     False otherwise.
     */
    setExtent: function(extent, resolutionChanged) { 
        SuperMap.Renderer.prototype.setExtent.apply(this, arguments);
        // always redraw features
        return false;
    },
    
    /** 
     * Method: eraseGeometry
     * Erase a geometry from the renderer. Because the Canvas renderer has
     *     'memory' of the features that it has drawn, we have to remove the
     *     feature so it doesn't redraw.   
     * 
     * Parameters:
     * geometry - {<SuperMap.Geometry>}
     * featureId - {String}
     */
    eraseGeometry: function(geometry, featureId) {
        this.eraseFeatures(this.features[featureId][0]);
    },

    /**
     * APIMethod: supported
     * 判断浏览器是否支持动画渲染
     * Returns:
     * {Boolean} 返回浏览器是否支持动画的渲染（也就是canvas渲染）
     */
    supported: function() {
        var canvas = document.createElement("canvas");
        return !!canvas.getContext;
    },    
    
    /**
     * Method: setSize
     * Sets the size of the drawing surface.
     *
     * Once the size is updated, redraw the canvas.
     *
     * Parameters:
     * size - {<SuperMap.Size>} 
     */
    setSize: function(size) {
        this.size = size.clone();
        var root = this.root;
        root.style.width = size.w + "px";
        root.style.height = size.h + "px";
        root.width = size.w;
        root.height = size.h;
        this.resolution = null;
        if (this.hitDetection) {
            var hitCanvas = this.hitCanvas;
            hitCanvas.style.width = size.w + "px";
            hitCanvas.style.height = size.h + "px";
            hitCanvas.width = size.w;
            hitCanvas.height = size.h;
        }
    },

    /**
     * Method: isInnerExtent
     * 判断传入的Geometry是否需要被绘制
     *
     * Parameters:
     * geo - {<SuperMap.Geometry>}
     * style - {<Object>}
     *
     * Returns:
     * {Boolean} 返回Geoemtry是否绘制，它的geometry超出返回或者未定义、不显示等情况都不绘制
     */
    isNeedToDraw: function(geo, style) {
        var rendered;
        geo.calculateBounds();
        var bounds = geo.getBounds();
        rendered = (style.display !== "none") && !!bounds &&
            bounds.intersectsBounds(this.extent);
        return rendered;
    },

    /**
     * Method: createGeometry
     * 根据传入参数类型，创建相应类型的Geometry
     *
     * Parameters:
     * geoType - {<String>}
     *
     * Returns:
     * {SuperMap.Geometry} 返回创建好的Geometry
     */
    createGeometry: function(geoType){
        var geometry;
        switch (geoType) {
            case "SuperMap.Geometry.Collection": {
                geometry = new SuperMap.Geometry.Collection();
                break;
            }
            case "SuperMap.Geometry.MultiPoint": {
                geometry = new SuperMap.Geometry.MultiPoint();
                break;
            }
            case "SuperMap.Geometry.MultiLineString": {
                geometry = new SuperMap.Geometry.MultiLineString();
                break;
            }
            case "SuperMap.Geometry.MultiPolygon": {
                geometry = new SuperMap.Geometry.MultiPolygon();
                break;
            }
            default: {
                break;
            }
        }
        return geometry;
    },

    /**
     * Method: removeById
     *从数组中移除指定ID的元素
     *
     * Parameters:
     * arr - {<Array>}
     * id - {<String>}
     */
    removeById: function(arr, id) {
        var featureId= this.features[id][0].id;
        for(var i=0; i<arr.length; i++) {
            if(arr[i][0].id == featureId) {
                arr.splice(i, 1);
                break;
            }
        }
    },

    /**
     * Method: drawFeature
     * Draw the feature. Stores the feature in the features list,
     * then redraws the layer. 
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 
     * style - {<Object>} 
     *
     * Returns:
     * {Boolean} 返回feature是否绘制，它的geometry超出返回或者未定义、不显示等情况都不绘制
     */
    drawFeature: function(feature, style, option) {
        var rendered;
        if (feature.geometry) {
            this.features[feature.id] = [feature, style, option];
            //获取style
            style = this.applyDefaultSymbolizer(style || feature.style);
            //如果display===none或者bounds不在extent之内，都不绘制（没必要绘制）
            //feature.geometry.calculateBounds();//重新计算一下bounds
            var recordGeometry = this.createGeometry(feature.geometry.CLASS_NAME);
            var renderedGeometry = this.drawGeometry(
                feature.geometry,
                style,
                feature.id,
                feature.frontFeature && feature.frontFeature.geometry,
                feature.backFeature && feature.backFeature.geometry,
                recordGeometry
            );
            if(!!renderedGeometry) {
                rendered = feature.clone();
                rendered.geometry = renderedGeometry;
            } else {
                this.removeById(this.features, feature.id);
            }
        }
        return rendered;
    },

    /** 
     * Method: drawGeometry
     * Used when looping (in redraw) over the features; draws
     * the canvas. 
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 
     * style - {Object} 
     */
    drawGeometry: function(geometry, style, featureId,frontGeometry,backGeometry, recordGeometry) {
        var className = geometry.CLASS_NAME;
        if ((className === "SuperMap.Geometry.Collection") ||
            (className === "SuperMap.Geometry.MultiPoint") ||
            (className === "SuperMap.Geometry.MultiLineString") ||
            (className === "SuperMap.Geometry.MultiPolygon")) {
            for (var i = 0; i < geometry.components.length; i++) {
                var smoothedGeometry = this.drawGeometry(
                    geometry.components[i],
                    style,
                    featureId,
                    frontGeometry && frontGeometry.components[i],
                    backGeometry && backGeometry.components[i],
                    recordGeometry
                );
                recordGeometry.components[i] = smoothedGeometry;
            }
            return recordGeometry;
        }
        switch (geometry.CLASS_NAME) {
            case "SuperMap.Geometry.Point":
                //这里进行位置转换，然后再去调用drawPoint
                //此处的geometry还为经过平滑处理
                var points = this.smoothConvertPoint(geometry,frontGeometry,backGeometry,featureId);
                //将处理过的点再次进行绘制
                if(this.isNeedToDraw(points[0], style)) {
                    this.drawPoint(points[0], style, featureId,points[1],points[2]);
                    return points[0];
                } else {
                    return geometry;
                }
            case "SuperMap.Geometry.LineString":
            //当对象为路由对象时，进行判断并绘制
            case "SuperMap.REST.Route":
                var lineStrings = this.smoothConvertLine(geometry,frontGeometry,backGeometry,featureId);
                if(this.isNeedToDraw(lineStrings[0], style)) {
                    this.drawLineString(lineStrings[0], style, featureId,lineStrings[1],lineStrings[2]);
                    return lineStrings[0];
                } else {
                    return geometry;
                }
            case "SuperMap.Geometry.LinearRing":
                var lineRings = this.smoothConvertLine(geometry,frontGeometry,backGeometry,featureId);
                if(this.isNeedToDraw(lineRings[0], style)) {
                    this.drawLinearRing(lineRings[0], style, featureId,lineRings[1],lineRings[2]);
                    return lineRings[0];
                } else {
                    return geometry;
                }
            case "SuperMap.Geometry.Polygon":
                var polygons = this.smoothConvertPolygon(geometry,frontGeometry,backGeometry,featureId);
                if(this.isNeedToDraw(polygons[0], style)) {
                    this.drawPolygon(polygons[0], style, featureId,polygons[1],polygons[2]);
                    return polygons[0];
                } else {
                    return geometry;
                }
//            case "SuperMap.Geometry.Rectangle":
//                this.drawRectangle(geometry, style, featureId);
//                break;
            default:
                break;
        }
    },
    /**
     * APIMethod: smoothConvertPoint
     * 对点进行特殊转换以实现希望的效果
     * （此方法用于继承重写）
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
        var options = this.features[featureId][2];
        if(options && options.smooth && options.smooth[0])
        {
            var geo = geometry.clone();
            geo.x = frontGeometry.x + (geo.x - frontGeometry.x)*options.smooth[1];
            geo.y = frontGeometry.y + (geo.y - frontGeometry.y)*options.smooth[1];

            return [geo,frontGeometry,geometry];
        }
        else
        {
            return [geometry,frontGeometry,backGeometry];
        }
    },
    //记录线的改变，用于提高效率
    linesIndex:[],
    /**
     * APIMethod: smoothConvertLine
     * 对线进行特殊转换以实现希望的效果
     * （此方法用于继承重写）
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
            //如果之前计算过，存在了，就直接使用
            if(this.linesIndex[featureId] && this.linesIndex[featureId][geometry.id])
            {
                var ar = this.linesIndex[featureId][geometry.id];
                if(ar[0] === frontGeometry.id)
                {
                    var arr1_ = ar[1];
                    var arr2_ = ar[2];
                    var arr_ = [];
                    for(var k= 0,len_=arr1_.length;k<len_;k++)
                    {
                        arr_.push(
                            new SuperMap.Geometry.Point(
                                arr1_[k].x + (arr2_[k].x - arr1_[k].x)*options.smooth[1],
                                arr1_[k].y + (arr2_[k].y - arr1_[k].y)*options.smooth[1]
                                )
                        );
                    }
                    geo.components = arr_;

                    return [geo,frontGeometry,geometry];
                }
            }
            //否则需要计算
            var geo1 = frontGeometry.clone();
            var geo2 = geometry.clone();
            var len1 = geo1.getLength();
            var len2 = geo2.getLength();
            var arr1 = [geo1.components[0].clone()];
            var arr2 = [geo2.components[0].clone()];
            var arr = [new SuperMap.Geometry.Point(
                geo1.components[0].x + (geo2.components[0].x - geo1.components[0].x)*options.smooth[1],
                geo1.components[0].y + (geo2.components[0].y - geo1.components[0].y)*options.smooth[1]
            )];
            var dis1 = 0;
            var dis2 = 0;
            var i= 1,j=1;
            for(;i<geo1.components.length || j<geo2.components.length;)
            {
                var po1 = geo1.components[i];
                var po2 = geo2.components[j];
                var po1_f = geo1.components[i-1];
                var po2_f = geo2.components[j-1];

                var d1 = po1.distanceTo(po1_f);
                var d2 = po2.distanceTo(po2_f);
                if((dis1+d1)/len1>(dis2+d2)/len2)
                {
                    //出第二条线的节点在第一条线上的位置离上一个节点的模
                    var mo1 = len1*(dis2+d2)/len2-dis1;
                    dis2+=d2;
                    //计算位置
                    var x = po1_f.x + (po1.x-po1_f.x)*mo1/d1;
                    var y = po1_f.y + (po1.y-po1_f.y)*mo1/d1;
                    var po2_ = new SuperMap.Geometry.Point(x,y);
                    arr1.push(po2_);
                    arr2.push(po2.clone());
                    arr.push(new SuperMap.Geometry.Point(
                        po2_.x + (po2.x - po2_.x)*options.smooth[1],
                        po2_.y + (po2.y - po2_.y)*options.smooth[1]
                    ));
                    if((j===geo2.components.length-1) && (i===geo1.components.length-1))
                    {
                        break;
                    }
                    if(j<geo2.components.length-1){
                        j++;
                    }
                }
                else if((dis1+d1)/len1<(dis2+d2)/len2)
                {
                    var mo2 = len2*(dis1+d1)/len1-dis2;
                    dis1+=d1;
                    //计算位置
                    var x = po2_f.x + (po2.x-po2_f.x)*mo2/d2;
                    var y = po2_f.y + (po2.y-po2_f.y)*mo2/d2;
                    var po1_ = new SuperMap.Geometry.Point(x,y);
                    arr1.push(po1.clone());
                    arr2.push(po1_);
                    arr.push(new SuperMap.Geometry.Point(
                        po1.x + (po1_.x - po1.x)*options.smooth[1],
                        po1.y + (po1_.y - po1.y)*options.smooth[1]
                    ));
                    if((j===geo2.components.length-1) && (i===geo1.components.length-1))
                    {
                        break;
                    }
                    if(i<geo1.components.length-1){
                        i++;
                    }
                }
                else
                {
                    arr1.push(po1.clone());
                    arr2.push(po2.clone());
                    arr.push(new SuperMap.Geometry.Point(
                        po1.x + (po2.x - po1.x)*options.smooth[1],
                        po1.y + (po2.y - po1.y)*options.smooth[1]
                    ));
                    if((j===geo2.components.length-1) && (i===geo1.components.length-1))
                    {
                        break;
                    }
                    if(i<geo1.components.length-1){
                        i++;
                    }
                    if(j<geo2.components.length-1){
                        j++;
                    }
                }
            }
            geo.components = arr;
            if(!this.linesIndex[featureId])
            {
                this.linesIndex[featureId] = {};
            }
            //存起来
            this.linesIndex[featureId][geometry.id] = [frontGeometry.id,arr1,arr2];
            return [geo,frontGeometry,geometry];
        }
        else
        {
            return [geometry,frontGeometry,backGeometry];
        }
    },
    //记录面的改变，用于提高效率
    polygonsIndex:[],
    /**
     * APIMethod: smoothConvertPolygon
     * 对面进行特殊转换以实现希望的效果
     * （此方法用于继承重写）
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
    smoothConvertPolygon:function(geometry,frontGeometry,backGeometry,featureId){
        var options = this.features[featureId][2];
        if(options && options.smooth && options.smooth[0])
        {
            var geo = geometry.clone();
            //如果之前计算过，存在了，就直接使用
            if(this.polygonsIndex[featureId] && this.polygonsIndex[featureId][geometry.id])
            {
                var arh = this.polygonsIndex[featureId][geometry.id];
                //和之前的情况一样才使用，否则跳过，还是需要计算
                if(arh[0] === frontGeometry.id)
                {
                    //一个面里面可能有多个环
                    for(var n = 0;n<arh[1].length;n++)
                    {
                        var ar = arh[1][n];
                        var arr1_ = ar[0];
                        var arr2_ = ar[1];
                        var arr_ = [];
                        for(var k= 0,len_=arr1_.length;k<len_;k++)
                        {
                            arr_.push(
                                new SuperMap.Geometry.Point(
                                    arr1_[k].x + (arr2_[k].x - arr1_[k].x)*options.smooth[1],
                                    arr1_[k].y + (arr2_[k].y - arr1_[k].y)*options.smooth[1]
                                )
                            );
                        }
                        geo.components[n].components = arr_;


                    }
                    return [geo,frontGeometry,geometry];
                }

            }

            if(!this.polygonsIndex[featureId])
            {
                this.polygonsIndex[featureId] = {};
            }

            //否则需要计算
            var geo1 = frontGeometry.clone();
            var geo2 = geometry.clone();
            //记录面里面所有的环数组
            var arrHuan = [];
            for(var m = 0;m<geo2.components.length;m++)
            {
                var len1 = geo1.components[m].getLength();
                var len2 = geo2.components[m].getLength();
                var arr1 = [geo1.components[m].components[0].clone()];
                var arr2 = [geo2.components[m].components[0].clone()];
                var arr = [new SuperMap.Geometry.Point(
                    geo1.components[m].components[0].x + (geo2.components[m].components[0].x - geo1.components[m].components[0].x)*options.smooth[1],
                    geo1.components[m].components[0].y + (geo2.components[m].components[0].y - geo1.components[m].components[0].y)*options.smooth[1]
                )];
                var dis1 = 0;
                var dis2 = 0;
                var i= 1,j=1;
                for(;i<geo1.components[m].components.length || j<geo2.components[m].components.length;)
                {
                    var po1 = geo1.components[m].components[i];
                    var po2 = geo2.components[m].components[j];
                    var po1_f = geo1.components[m].components[i-1];
                    var po2_f = geo2.components[m].components[j-1];

                    var d1 = po1.distanceTo(po1_f);
                    var d2 = po2.distanceTo(po2_f);
                    if((dis1+d1)/len1>(dis2+d2)/len2)
                    {
                        //出第二条线的节点在第一条线上的位置离上一个节点的模
                        var mo1 = len1*(dis2+d2)/len2-dis1;
                        dis2+=d2;
                        //计算位置
                        var x = po1_f.x + (po1.x-po1_f.x)*mo1/d1;
                        var y = po1_f.y + (po1.y-po1_f.y)*mo1/d1;
                        var po2_ = new SuperMap.Geometry.Point(x,y);
                        arr1.push(po2_);
                        arr2.push(po2.clone());
                        arr.push(new SuperMap.Geometry.Point(
                            po2_.x + (po2.x - po2_.x)*options.smooth[1],
                            po2_.y + (po2.y - po2_.y)*options.smooth[1]
                        ));
                        if((j===geo2.components[m].components.length-1) && (i===geo1.components[m].components.length-1))
                        {
                            break;
                        }
                        if(j<geo2.components[m].components.length-1){
                            j++;
                        }
                    }
                    else if((dis1+d1)/len1<(dis2+d2)/len2)
                    {
                        var mo2 = len2*(dis1+d1)/len1-dis2;
                        dis1+=d1;
                        //计算位置
                        var x = po2_f.x + (po2.x-po2_f.x)*mo2/d2;
                        var y = po2_f.y + (po2.y-po2_f.y)*mo2/d2;
                        var po1_ = new SuperMap.Geometry.Point(x,y);
                        arr1.push(po1.clone());
                        arr2.push(po1_);
                        arr.push(new SuperMap.Geometry.Point(
                            po1.x + (po1_.x - po1.x)*options.smooth[1],
                            po1.y + (po1_.y - po1.y)*options.smooth[1]
                        ));
                        if((j===geo2.components[m].components.length-1) && (i===geo1.components[m].components.length-1))
                        {
                            break;
                        }
                        if(i<geo1.components[m].components.length-1){
                            i++;
                        }
                    }
                    else
                    {
                        arr1.push(po1.clone());
                        arr2.push(po2.clone());
                        arr.push(new SuperMap.Geometry.Point(
                            po1.x + (po2.x - po1.x)*options.smooth[1],
                            po1.y + (po2.y - po1.y)*options.smooth[1]
                        ));
                        if((j===geo2.components[m].components.length-1) && (i===geo1.components[m].components.length-1))
                        {
                            break;
                        }
                        if(i<geo1.components[m].components.length-1){
                            i++;
                        }
                        if(j<geo2.components[m].components.length-1){
                            j++;
                        }
                    }
                }
                geo.components[m].components = arr;
                arrHuan.push([arr1,arr2]);
            }
            //存起来
            this.polygonsIndex[featureId][geometry.id] = [frontGeometry.id,arrHuan];



            return [geo,frontGeometry,geometry];
        }
        else
        {
            return [geometry,frontGeometry,backGeometry];
        }
    },
    /**
     * Method: drawExternalGraphic
     * Called to draw External graphics. 
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawExternalGraphic: function(geometry, style, featureId) {
        var t = this;
        var feature = t.features[featureId][0];
        var frontFeature = feature.frontFeature;

        var img;
        if(this.londedimgs[style.externalGraphic])
        {
            img = this.londedimgs[style.externalGraphic];
            var width = style.graphicWidth || style.graphicHeight;
            var height = style.graphicHeight || style.graphicWidth;
            width = width ? width : style.pointRadius * 2;
            height = height ? height : style.pointRadius * 2;
            var xOffset = (style.graphicXOffset != undefined) ?
                style.graphicXOffset : -(0.5 * width);
            var yOffset = (style.graphicYOffset != undefined) ?
                style.graphicYOffset : -(0.5 * height);

            var opacity = style.graphicOpacity || style.fillOpacity,
                allowRotate=style.allowRotate;
            var pt = t.getLocalXY(geometry);
            var p0 = pt[0];
            var p1 = pt[1];
            var rotation=0;
            if(allowRotate){
                if(frontFeature)
                {
                    var geo_f = frontFeature.geometry;
                    rotation = Math.PI/2-Math.atan2(geometry.y-geo_f.y,geometry.x-geo_f.x);
                }
                else
                {
                    if(feature.backFeature && feature.backFeature.geometry)
                    {
                        var geo_b =  feature.backFeature.geometry;
                        rotation = Math.PI/2-Math.atan2(geo_b.y-geometry.y,geo_b.x-geometry.x);
                    }
                    else
                    {
                        rotation = 0;
                    }
                }
            }
            if(!isNaN(p0) && !isNaN(p1)) {
                var x = (p0 + xOffset) | 0;
                var y = (p1 + yOffset) | 0;
                var canvas = t.canvas;
                canvas.globalAlpha = opacity;
                var factor = SuperMap.Renderer.Canvas.drawImageScaleFactor ||
                    (SuperMap.Renderer.Canvas.drawImageScaleFactor =
                        /android 2.1/.test(navigator.userAgent.toLowerCase()) ?
                            // 320 is the screen width of the G1 phone, for
                            // which drawImage works out of the box.
                            320 / window.screen.width : 1
                        );
                if(rotation != 0)
                {
                    canvas.save();
                    canvas.translate(p0, p1);
                    canvas.rotate(rotation);
                    canvas.drawImage(
                        img, (x-p0)*factor, (y-p1)*factor, width*factor, height*factor
                    );
                    canvas.restore();
                }
                else
                {
                    canvas.drawImage(
                        img, x*factor, y*factor, width*factor, height*factor
                    );
                }
                if (t.hitDetection) {
                    t.setHitContextStyle("fill", featureId);
                    t.hitContext.fillRect(x, y, width, height);
                }
            }
            return;
        }
        //判断
        if(this.londingimgs[style.externalGraphic]){
            this.londingimgs[style.externalGraphic].onload = function(){
                return false;
            }
        }


        var img = new Image();
        this.londingimgs[style.externalGraphic] = img;

//        if (style.graphicTitle) {
//            img.title = style.graphicTitle;
//        }

        var onLoad = function() {
            var featureId = this.featureId;
            var geometry = this.geometry;
            var style = this.style;
            var img = this.img;


            t.londingimgs[style.externalGraphic] = null;
            t.londedimgs[style.externalGraphic] = img;
            if(!t.features[featureId]) {
                return;
            }
            var feature = t.features[featureId][0];
            var frontFeature = feature.frontFeature;

            var width = style.graphicWidth || style.graphicHeight;
            var height = style.graphicHeight || style.graphicWidth;
            width = width ? width : style.pointRadius * 2;
            height = height ? height : style.pointRadius * 2;
            var xOffset = (style.graphicXOffset != undefined) ?
                style.graphicXOffset : -(0.5 * width);
            var yOffset = (style.graphicYOffset != undefined) ?
                style.graphicYOffset : -(0.5 * height);

            var opacity = style.graphicOpacity || style.fillOpacity;

            var pt = t.getLocalXY(geometry);
            var p0 = pt[0];
            var p1 = pt[1];
            var rotation;
            if(frontFeature)
            {
                var geo_f = frontFeature.geometry;
                rotation = Math.PI/2-Math.atan2(geometry.y-geo_f.y,geometry.x-geo_f.x);
            }
            else
            {
                if(feature.backFeature)
                {
                    var geo_b =  feature.backFeature.geometry;
                    rotation = Math.PI/2-Math.atan2(geo_b.y-geometry.y,geo_b.x-geometry.x);
                }
                else
                {
                    rotation = 0;
                }
            }
            if(!isNaN(p0) && !isNaN(p1)) {
                var x = (p0 + xOffset) | 0;
                var y = (p1 + yOffset) | 0;
                var canvas = t.canvas;
                canvas.globalAlpha = opacity;
                //android 2.1特殊情况
                var factor = SuperMap.Renderer.Canvas.drawImageScaleFactor ||
                    (SuperMap.Renderer.Canvas.drawImageScaleFactor =
                        /android 2.1/.test(navigator.userAgent.toLowerCase()) ?
                            // 320 is the screen width of the G1 phone, for
                            // which drawImage works out of the box.
                            320 / window.screen.width : 1
                    );
                if(rotation != 0)
                {
                    canvas.save();
                    canvas.translate(p0, p1);
                    canvas.rotate(rotation);
                    canvas.drawImage(
                        img, (x-p0)*factor, (y-p1)*factor, width*factor, height*factor
                    );
                    canvas.restore();
                }
                else
                {
                    canvas.drawImage(
                        img, x*factor, y*factor, width*factor, height*factor
                    );
                }

                if (t.hitDetection) {
                    t.setHitContextStyle("fill", featureId);
                    t.hitContext.fillRect(x, y, width, height);
                }
            }
        };

        img.onload = SuperMap.Function.bind(onLoad, {
            featureId:featureId,
            geometry:geometry.clone(),
            style:style,
            img:img
        });
        img.src = style.externalGraphic;
    },

    /**
     * Method: setCanvasStyle
     * Prepare the canvas for drawing by setting various global settings.
     *
     * Parameters:
     * type - {String} one of 'stroke', 'fill', or 'reset'
     * style - {Object} Symbolizer hash
     */
    setCanvasStyle: function(type, style) {
        if (type === "fill") {     
            this.canvas.globalAlpha = style['fillOpacity'];
            this.canvas.fillStyle = style['fillColor'];
        } else if (type === "stroke") {  
            this.canvas.globalAlpha = style['strokeOpacity'];
            this.canvas.lineCap = style['strokeLinecap'];
            this.canvas.strokeStyle = style['strokeColor'];
            this.canvas.lineWidth = style['strokeWidth'];
        } else {
            this.canvas.globalAlpha = 0;
            this.canvas.lineWidth = 1;
        }
    },
    
    /**
     * Method: featureIdToHex
     * Convert a feature ID string into an RGB hex string.
     *
     * Parameters:
     * featureId - {String} Feature id
     *
     * Returns:
     * {String} RGB hex string.
     */
    featureIdToHex: function(featureId) {

        var id = Number(featureId.split("_").pop()) + 1; // zero for no feature
        if (id >= 16777216) {
            this.hitOverflow = id - 16777215;
            id = id % 16777216 + 1;
        }
        var hex = "000000" + id.toString(16);
        var len = hex.length;
        hex = "#" + hex.substring(len-6, len);
        return hex;
    },
    
    /**
     * Method: setHitContextStyle
     * Prepare the hit canvas for drawing by setting various global settings.
     *
     * Parameters:
     * type - {String} one of 'stroke', 'fill', or 'reset'
     * featureId - {String} The feature id.
     * symbolizer - {<SuperMap.Symbolizer>} The symbolizer.
     */
    setHitContextStyle: function(type, featureId, symbolizer) {
        var hex = this.featureIdToHex(featureId);
        if (type === "fill") {
            this.hitContext.globalAlpha = 1.0;
            this.hitContext.fillStyle = hex;
        } else if (type === "stroke") {  
            this.hitContext.globalAlpha = 1.0;
            this.hitContext.strokeStyle = hex;
            // bump up stroke width to deal with antialiasing
            this.hitContext.lineWidth = symbolizer.strokeWidth + 2;
        } else {
            this.hitContext.globalAlpha = 0;
            this.hitContext.lineWidth = 1;
        }
    },
    /**
     * APIMethod: drawPoint
     * 此方法具体实现在canvas上绘制点
     * （用于子类重写）
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>} 需要绘制的点
     * style    - {Object}  绘制时的style
     * featureId - {String}  geometry 对应的 feature 的 id
     * frontGeometry - {<SuperMap.Geometry>}  geometry 的前一个数据（同一实物）
     * backGeometry - {<SuperMap.Geometry>}  geometry 的后一个数据（同一实物）
     */ 
    drawPoint: function(geometry, style, featureId,frontGeometry,backGeometry) {
        var me = this;
        if(style.graphic !== false) {
            if(style.externalGraphic) {
                me.drawExternalGraphic(geometry, style, featureId);
            } else {
                var pt = me.getLocalXY(geometry);
                var p0 = pt[0];
                var p1 = pt[1];
                if(!isNaN(p0) && !isNaN(p1)) {
                    var twoPi = Math.PI*2;
                    var radius = style.pointRadius;
                    if(style.fill !== false) {
                        me.setCanvasStyle("fill", style);
                        me.canvas.beginPath();
                        me.canvas.arc(p0, p1, radius, 0, twoPi, true);
                        me.canvas.fill();
                        if (this.hitDetection) {
                            this.setHitContextStyle("fill", featureId, style);
                            this.hitContext.beginPath();
                            this.hitContext.arc(p0, p1, radius, 0, twoPi, true);
                            this.hitContext.fill();
                        }
                    }

                    if(style.stroke !== false) {
                        this.setCanvasStyle("stroke", style);
                        this.canvas.beginPath();
                        this.canvas.arc(p0, p1, radius, 0, twoPi, true);
                        this.canvas.stroke();
                        if (this.hitDetection) {
                            this.setHitContextStyle("stroke", featureId, style);
                            this.hitContext.beginPath();
                            this.hitContext.arc(p0, p1, radius, 0, twoPi, true);
                            this.hitContext.stroke();
                        }
                        this.setCanvasStyle("reset");
                    }
                }
            }
        }


    },
    
    /**
     * APIMethod: drawLineString
     * 此方法具体实现在canvas上绘制线
     * （用于子类重写）
     * Parameters: 
     * geometry - {<SuperMap.Geometry>} 需要绘制的线
     * style    - {Object}  绘制时的style
     * featureId - {String}  geometry 对应的 feature 的 id
     * frontGeometry - {<SuperMap.Geometry>}  geometry 的前一个数据（同一实物）
     * backGeometry - {<SuperMap.Geometry>}  geometry 的后一个数据（同一实物）
     */ 
    drawLineString: function(geometry, style, featureId,frontGeometry,backGeometry) {
        style = SuperMap.Util.applyDefaults({fill: false}, style);
        this.drawLinearRing(geometry, style, featureId);
    },    
    
    /**
     * Method: drawLinearRing
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawLinearRing: function(geometry, style, featureId) {
        //绘制面填充
        if (style.fill !== false) {
            this.setCanvasStyle("fill", style);
            this.renderPath(this.canvas, geometry, style, featureId, "fill");
            if (this.hitDetection) {
                this.setHitContextStyle("fill", featureId, style);
                this.renderPath(this.hitContext, geometry, style, featureId, "fill");
            }
        }
        //绘制边缘线
        if (style.stroke !== false) {
            this.setCanvasStyle("stroke", style);
            this.renderPath(this.canvas, geometry, style, featureId, "stroke");
            if (this.hitDetection) {
                this.setHitContextStyle("stroke", featureId, style);
                this.renderPath(this.hitContext, geometry, style, featureId, "stroke");
            }
        }
        this.setCanvasStyle("reset");
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

    /**
     * APIMethod: drawPolygon
     * 此方法具体实现在canvas上绘制面
     * （用于子类重写）
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 需要绘制的面
     * style    - {Object}  绘制时的style
     * featureId - {String}  geometry 对应的 feature 的 id
     * frontGeometry - {<SuperMap.Geometry>}  geometry 的前一个数据（同一实物）
     * backGeometry - {<SuperMap.Geometry>}  geometry 的后一个数据（同一实物）
     */
    drawPolygon: function(geometry, style, featureId,frontGeometry,backGeometry) {
        var components = geometry.components;
        var len = components.length;
        this.drawLinearRing(components[0], style, featureId);
        // erase inner rings
        for (var i=1; i<len; ++i) {
            /** 
             * Note that this is overly agressive.  Here we punch holes through 
             * all previously rendered features on the same canvas.  A better 
             * solution for polygons with interior rings would be to draw the 
             * polygon on a sketch canvas first.  We could erase all holes 
             * there and then copy the drawing to the layer canvas. 
             * TODO: http://trac.osgeo.org/SuperMap/ticket/3130 
             */
            this.canvas.globalCompositeOperation = "destination-out";
            if (this.hitDetection) {
                this.hitContext.globalCompositeOperation = "destination-out";
            }
            this.drawLinearRing(
                components[i], 
                SuperMap.Util.applyDefaults({stroke: false, fillOpacity: 1.0}, style),
                featureId
            );
            this.canvas.globalCompositeOperation = "source-over";
            if (this.hitDetection) {
                this.hitContext.globalCompositeOperation = "source-over";
            }
            this.drawLinearRing(
                components[i], 
                SuperMap.Util.applyDefaults({fill: false}, style),
                featureId
            );
        }
    },
    /**
     * Method: drawRectangle
     * 该方法用于绘制矩形
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>}  这里传进来的是矩形
     * style    - {Object}  用户设置的style
     * featureId - {String}  当前绘制的feature的id
     */
    drawRectangle:function(geometry, style, featureId){
        //绘制矩形我们可以将其创建为一个矩形的面环，就可以重复利用以前的代码
        var geo = (new SuperMap.Geometry.LinearRing([
            new SuperMap.Geometry.Point(geometry.x, geometry.y),
            new SuperMap.Geometry.Point(geometry.x+geometry.width, geometry.y),
            new SuperMap.Geometry.Point(geometry.x+geometry.width, geometry.y+geometry.height),
            new SuperMap.Geometry.Point(geometry.x, geometry.y+geometry.height)
        ]));

        this.drawLinearRing(geo, style, featureId);
    },
    /**
     * Method: drawText
     * This method is only called by the renderer itself.
     *
     * Parameters:
     * location - {<SuperMap.Point>}
     * style    - {Object}
     */
    drawText: function(location, style) {
        style = SuperMap.Util.extend({
            fontColor: "#000000",
            labelAlign: "cm"
        }, style);
        var pt = this.getLocalXY(location);

        if (style.labelXOffset  || style.labelYOffset ) {
            var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
            var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
            pt[0] += xOffset;
            pt[1] -= yOffset;
        }

        this.setCanvasStyle("reset");
        this.canvas.fillStyle = style.fontColor;
        this.canvas.globalAlpha = style.fontOpacity || 1.0;
        var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
                         "normal", // "font-variant" not supported
                         style.fontWeight ? style.fontWeight : "normal",
                         style.fontSize ? style.fontSize : "1em",
                         style.fontFamily ? style.fontFamily : "sans-serif"].join(" ");
        var labelRows = style.label.split('\n');
        var numRows = labelRows.length;
        if (this.canvas.fillText) {
            // HTML5
            this.canvas.font = fontStyle;
            this.canvas.textAlign =
                SuperMap.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[0]] ||
                "center";
            this.canvas.textBaseline =
                SuperMap.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[1]] ||
                "middle";
            var vfactor =
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            var lineHeight =
                this.canvas.measureText('Mg').height ||
                this.canvas.measureText('xx').width;
            pt[1] += lineHeight*vfactor*(numRows-1);
            for (var i = 0; i < numRows; i++) {
                if(style.rotation != 0)
                {
                    this.canvas.save();
                    this.canvas.translate(pt[0], pt[1]);
                    this.canvas.rotate(style.rotation*Math.PI/180);
                    this.canvas.fillText(labelRows[i], 0,  (lineHeight*i));
                    this.canvas.restore();
                }else{
                    this.canvas.fillText(labelRows[i], pt[0], pt[1] + (lineHeight*i));
                }
            }
        } else if (this.canvas.mozDrawText) {
            // Mozilla pre-Gecko1.9.1 (<FF3.1)
            this.canvas.mozTextStyle = fontStyle;
            // No built-in text alignment, so we measure and adjust the position
            var hfactor =
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[0]];
            if (hfactor == null) {
                hfactor = -.5;
            }
            var vfactor =
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            var lineHeight = this.canvas.mozMeasureText('xx');
            pt[1] += lineHeight*(1 + (vfactor*numRows));
            for (var i = 0; i < numRows; i++) {
                var x = pt[0] + (hfactor*this.canvas.mozMeasureText(labelRows[i]));
                var y = pt[1] + (i*lineHeight);
                this.canvas.translate(x, y);
                this.canvas.mozDrawText(labelRows[i]);
                this.canvas.translate(-x, -y);
            }
        }
        this.setCanvasStyle("reset");
    },

    /**
     * Method: dashStyle
     *
     * Parameters:
     * style - {Object}
     * widthFactor - {Number}
     *
     * Returns:
     * {String} A Canvas Parameters of setLineDash Method 'strokeDasharray' value
     */
    dashStyle: function(style, widthFactor) {
        if(!style)return [];
        var w = style.strokeWidth * widthFactor;
        var str = style.strokeDashstyle;
        switch (str) {
            case 'solid':
                return [];
            case 'dot':
                return [1, 4 * w];
            case 'dash':
                return [4 * w, 4 * w];
            case 'dashdot':
                return [4 * w, 4 * w, 1, 4 * w];
            case 'longdash':
                return [8 * w, 4 * w];
            case 'longdashdot':
                return [8 * w, 4 * w, 1, 4 * w];
            default:
                if(!str)return [];
                if(SuperMap.Util.isArray(str))return str;
                str=SuperMap.String.trim(str).replace(/\s+/g, ",");
                return str.replace(/\[|\]/gi,"").split(",");
        }
    },

    /**
     * Method: getLocalXY
     * transform geographic xy into pixel xy
     *
     * Parameters: 
     * point - {<SuperMap.Geometry.Point>}
     */
    getLocalXY: function(point) {
        var resolution = this.getResolution();
        var extent = this.extent;
        var x = (point.x / resolution + (-extent.left / resolution));
        var y = ((extent.top / resolution) - point.y / resolution);
        return [x, y];
    },

    /**
     * Method: clear
     * Clear all vectors from the renderer.
     */    
    clear: function() {
        var height = this.root.height;
        var width = this.root.width;
        this.canvas.clearRect(0, 0, width, height);
        this.features = {};
        if (this.hitDetection) {
            this.hitContext.clearRect(0, 0, width, height);
        }
    },

    /**
     * Method: getFeatureIdFromEvent
     * Returns a feature id from an event on the renderer.  
     * 
     * Parameters:
     * evt - {<SuperMap.Event>} 
     *
     * Returns:
     * {<SuperMap.Feature.Vector} A feature or null.  This method returns a 
     *     feature instead of a feature id to avoid an unnecessary lookup on the
     *     layer.
     */
    getFeatureIdFromEvent: function(evt) {
        var feature = null;
        if (this.hitDetection) {
            // this dragging check should go in the feature handler
            if (!this.map.dragging) {
                var xy = evt.xy;
                var x = xy.x | 0;
                var y = xy.y | 0;
                var data = this.hitContext.getImageData(x, y, 1, 1).data;
                if (data[3] === 255) { // antialiased
                    var id = data[2] + (256 * (data[1] + (256 * data[0])));
                    if (id) {
                        feature = this.features["SuperMap.Feature.Vector_" + (id - 1 + this.hitOverflow)][0];
                    }
                }
            }
        }
        return feature;
    },
    
    /**
     * Method: eraseFeatures 
     * This is called by the layer to erase features; removes the feature from
     *     the list, then redraws the layer.
     * 
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 
     */
    eraseFeatures: function(features) {
        if(!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        for(var i=0; i<features.length; ++i) {
            delete this.features[features[i].id];
        }
        this.redraw();
    },


    CLASS_NAME: "SuperMap.Renderer.AnimatorCanvas"
});

