/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/Layer.js
 */

/**
 * Class: SuperMap.Layer.HeatMapLayer
 * 热点图层。
 * 提供对热点信息的添加删除操作和渲染展示。
 * 由于使用canvas绘制，所以不支持直接修改操作。
 */
SuperMap.Layer.HeatMapLayer = SuperMap.Class(SuperMap.Layer, {

    /**
     * APIProperty: colors
     * {Array(<SuperMap.REST.ServerColor>)} 颜色线性渐变数组 ，默认为null。
     * 用于表示数据权重的渐变，此参数不设置的情况颜色由绿（低权重）到红（高权重）。
     * 此参数长度大于1时颜色渐变由数组决定，否则使用默认渐变。
     *
     * (start code)
     * //需要设置可以为如下方式：
     * //feature.attributes中表示权重的字段为height,则在HeatMapLayer的featureWeight参数赋值为"height"
     * feature1.attributes.height = 7.0;
     * feature2.attributes.height = 6.0;
     * var heatMapLayer = new SuperMap.Layer.HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
     * var colors = [
     *      new  SuperMap.REST.ServerColor(170,240,233),
     *      new  SuperMap.REST.ServerColor(180,245,185),
     *      new  SuperMap.REST.ServerColor(223,250,177)
     * ];
     * heatMapLayer.colors = colors;
     * heatMapLayer.addFeatures([feature1,feature2]);
     *
     * (end)
     *
     */
    colors: null,

    /**
     * APIProperty: radius
     * {Number} 热点渲染的最大半径（热点像素半径），默认为 50。
     * 热点显示的时候以精确点为中心点开始往四周辐射衰减，
     * 其衰减半径和权重值成比列。
     * 注：如果指定了热点地理半径字段名称，即设置了属性featureRadius，那么将按照指定的地理半径字段的值绘制热点图，此时radius将无效。
     */
    radius: 50,

    /**
     * APIProperty: features
     * {Array(<SuperMap.Feature.Vector>)} 热点信息数组，记录存储图层上添加的所有热点信息。
     */
    features: null,

    /**
     * APIProperty: maxWeight
     * {Number} 设置权重最大值。如果不设置此属性，将按照当前屏幕范围内热点所拥有的权重最大值绘制热点图。。
     */
    maxWeight: null,
    /**
     * APIProperty: minWeight
     * {Number} 设置权重最小值。如果不设置此属性，将按照当前屏幕范围内热点所拥有的权重最小值绘制热点图。
     */
    minWeight: null,

    /**
     * Property: boundsminWeight
     * {Number} 存储当前bounds内的最小权重值，用于判断用户设置的minWeight是否有效,如果用户没有设置minWeight,或者设置无效，即用此属性进行计算
     */
    boundsminWeight: null,

    /**
     * Property: usefulValue
     * {String} 存储当前有用的最小权重值 minWeight或者 boundsmaxWeight
     */
    usefulValue: null,

    /**
     * APIProperty: featureWeight
     * {String} 对应feature.attributes中的热点权重字段名称，feature.attributes中权重参数的类型为float
     * (start code)
     * //例如：
     * //feature.attributes中表示权重的字段为height,则在HeatMapLayer的featureWeight参数赋值为"height"
     * feature1.attributes.height = 7.0;
     * feature2.attributes.height = 6.0;
     * var heatMapLayer = new SuperMap.Layer.HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
     * heatMapLayer.addFeatures([feature1,feature2]);
     * (end)
     */
    featureWeight: null,

    /**
     * APIProperty: featureRadius
     * {String} 对应feature.attributes中的热点地理半径字段名称，feature.attributes中热点地理半径参数的类型为float
     * (start code)
     * //例如：
     * //feature.attributes中表示热点地理半径的字段为radius,则在HeatMapLayer的featureRadius参数赋值为"radius"
     * //feature.attributes.radius与 HeatMapLayer.radius（热点像素半径）属性二者只能选其一，当同时设置时，首选 feature.attributes.radius 属性。默认情况下使用 HeatMapLayer.radius 像素半径。
     * feature1.attributes.radius = 7.0;
     * feature2.attributes.radius = 6.0;
     * var heatMapLayer = new SuperMap.Layer.HeatMapLayer("heatmaplayer",{"featureRadius":"radius"});
     * heatMapLayer.addFeatures([feature1,feature2]);
     * (end)
     */
    featureRadius: null,

    /**
     * 监听一个自定义事件可用如下方式:
     * (code)
     * layer.events.register(type, obj, listener);
     * (end)
     *
     * 热点图自定义事件信息，事件调用时的属性与具体事件类型相对应。
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to layer.events.object.
     * element - {DOMElement} A reference to layer.events.element.
     *
     * 支持的事件如下 (另外包含 <SuperMap.Layer 中定义的其他事件>):
     * featuresadded - 热点添加完成时触发。传递参数为添加的热点信息数组和操作成功与否信息。
     *         参数类型：{features: features, succeed: succeed}
     * featuresremoved - 热点被删除时触发。传递参数为删除的热点信息数组和操作成功与否信息。
     *         参数类型：{features: features, succeed: succeed}
     * featuresdrawcompleted - 热点图渲染完成时触发，没有额外属性。
     */
    EVENT_TYPES: ["featuresadded","featuresremoved","featuresdrawcompleted"],

    /**
     * Proterty: supported
     * {Boolean} 当前浏览器是否支持canvas绘制，默认为false。
     * 决定了热点图是否可用，内部判断使用。
     */
    supported: false,

    /**
     * Proterty: rootCanvas
     * {Canvas} 热点图主绘制面板。
     */
    rootCanvas: null,

    /**
     * Proterty: rootCanvas
     * {Canvas} 热点图主绘制对象。
     */
    canvasContext: null,

    /**
     * Proterty: pixelHeatPoints
     * {Array(Object)} 记录热点在具体分辨率下的像素坐标位置，方便渲染使用。
     */
    pixelHeatPoints: null,

    /**
     * Proterty: alphaValues
     * {Array(Array(Number))} 记录热点渲染后每个像素点的透明度信息。
     */
    alphaValues: null,

    /**
     * Proterty: colorValues
     * {Array(Array(Number))} 记录热点渲染后每个像素点的颜色权重信息。
     */
    colorValues: null,

    /**
     * Proterty: canvasData
     * {ImageData)} 记录当前屏幕所要绘制的热点图位图信息。
     */
    canvasData: null,

    /**
     * Proterty: maxWidth
     * {Number)} 当前绘制面板宽度。和当前 map 窗口宽度一致。
     */
    maxWidth: null,

    /**
     * Proterty: maxHeight
     * {Number)} 当前绘制面板宽度。和当前 map 窗口高度一致。
     */
    maxHeight: null,

    /**
     * Constructor: SuperMap.Layer.HeatMapLayer
     * 创建一个热点图层。
     * (start code)
     * //创建一个名为“heatmaplayer” 的热点渲染图层。
     *  var heatMapLayer = new SuperMap.Layer.HeatMapLayer("heatmaplayer");
     * (end)
     *
     * Parameters:
     * name - 此图层的图层名 {String}
     * options - {Object} 设置此类上没有默认值的属性。
     *
     * Returns:
     * {<SuperMap.Layer.HeatMapLayer>} 新的热点图层。
     */
    initialize: function(name, options) {
        this.EVENT_TYPES =
            SuperMap.Layer.HeatMapLayer.prototype.EVENT_TYPES.concat(
                SuperMap.Layer.prototype.EVENT_TYPES
            );

        SuperMap.Layer.prototype.initialize.apply(this, arguments);

        //热点图要求使用canvas绘制，判断是否支持
        this.rootCanvas = document.createElement("canvas");
        if (!this.rootCanvas.getContext) {
            return;
        }
        this.supported = true;
        //构建绘图面板
        this.rootCanvas.id = "Canvas_" + this.id;
        this.rootCanvas.style.position = "absolute";
        this.div.appendChild(this.rootCanvas);
        this.canvasContext = this.rootCanvas.getContext('2d');
    },

    /**
     * APIMethod: addFeatures
     * 添加热点信息。
     *
     * Parameters:
     * features - {Array<SuperMap.Feature.Vector>} 热点信息数组。
     *
     * (start code)
     * var feature1 = new SuperMap.Feature.Vector();
     * feature1.geometry = new SuperMap.Geometry.Point(0,0);    //只支持point类型
     * feature1.attributes.height = 9;
     * var heatMapLayer = new SuperMap.Layer.HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
     * heatMapLayer.addFeatures([feature1]);
     * (end)
     */
    addFeatures: function(features){//addHeatPoints
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        this.features = this.features || [];
        if(0 == this.features.length){
            this.features = features;
        }else{
            this.features = this.features.concat(features);
        }
        this.events.triggerEvent("featuresadded", {features: features, succeed: true});
        this.refresh();
    },

    /**
     * APIMethod: removeFeatures
     * 移除指定的热点信息。
     *
     * Parameters:
     * features - {Array<SuperMap.Feature.Vector>} 热点信息数组。
     */
    removeFeatures: function(features){//removeHeatPoints
        if(!features || features.length === 0 || !this.features || this.features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        var heatPoint, index, heatPointsFailedRemoved = [];
        for(var i=0, len=features.length; i<len; i++){
            heatPoint = features[i];
            index = SuperMap.Util.indexOf(this.features, heatPoint);
            //找不到视为删除失败
            if(index === -1) {
                heatPointsFailedRemoved.push(heatPoint);
                continue;
            }
            //删除热点
            this.features.splice(index, 1);
        }
        var succeed = heatPointsFailedRemoved.length == 0? true : false;
        this.refresh();

        this.events.triggerEvent("featuresremoved", {features: heatPointsFailedRemoved, succeed: succeed});
    },

    /**
     * APIMethod: removeAllFeatures
     * 移除全部的热点信息。
     */
    removeAllFeatures: function(){//removeAllHeatPoints
        /*if(this.features && this.features.length > 0){
            for(var i=0, len= this.features.length; i < len; i++){
                this.features[i].destroy();
                this.features[i] = null;
            }
        }*/
        this.features = [];
        this.refresh();
    },

    /**
     * APIMethod: refresh
     * 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
     */
    refresh: function(){
        if(this.map){
            var extent = this.map.getExtent();
            this.updateHeatPoints(extent);
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function() {
        if(this.features && this.features.length > 0){
            for(var i=0, len= this.features.length; i < len; i++){
                this.features[i].destroy();
                this.features[i] = null;
            }
        }
        this.colors = null;
        this.features = null;
        this.radius = null;
        this.supported = null;
        this.canvasContext = null;
        this.pixelHeatPoints = null;
        this.rootCanvas = null;
        this.alphaValues = null;
        this.colorValues = null;
        this.canvasData = null;
        this.maxWeight = null;
        this.minWeight = null;
        this.boundsminWeight = null;
        this.usefulValue = null;
        this.maxWidth = null;
        this.maxHeight = null;
        this.featureRadius = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: setMap
     * 图层已经添加到Map中。
     *
     * 如果当前浏览器支持canvas，则开始渲染要素；如果不支持则移除图层。
     *
     * Parameters:
     * map - {<SuperMap.Map>}需要绑定的map对象。
     */
    setMap: function(map) {
        SuperMap.Layer.prototype.setMap.apply(this, arguments);
        if(!this.supported){
            this.map.removeLayer(this);
        }else{
            this.redraw();
        }
    },

    /**
     * Method: moveTo
     * 重置当前热点图层的div，再一次与Map控件保持一致。
     * 修改当前显示范围，当平移或者缩放结束后开始重绘热点图的渲染效果。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function(bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        if(!this.supported){
            return;
        }
        this.zoomChanged = zoomChanged;
        if(!dragging){
            this.div.style.visibility = "hidden";
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + "px";
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + "px";
            var size = this.map.getSize();
            this.rootCanvas.width = parseInt(size.w);
            this.rootCanvas.height = parseInt(size.h);
            this.maxWidth = size.w;
            this.maxHeight = size.h;
            this.div.style.visibility = "visible";
            if(!zoomChanged){
                this.updateHeatPoints(bounds);
            }
        }

        if(zoomChanged){
            this.updateHeatPoints(bounds);
        }
    },

    /**
     * Method: updateHeatPoints
     * 刷新热点图显示
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前显示范围
     */
    updateHeatPoints: function(bounds){
        this.pixelHeatPoints = [];
        if(this.features && this.features.length > 0){
            // var date = new Date();
            this.convertToPixelPoints(bounds);
            this.drawHeatPoints(bounds);
            // alert(new Date() - date);
        }else{
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxWidth);
        }
    },

    /**
     * Method: convertToPixelPoints
     * 过滤位于当前显示范围内的热点，并转换其为当前分辨率下的像素坐标。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前显示范围
     */
    convertToPixelPoints: function(bounds){
        var maxTemp,minTemp,resolution = this.map.getResolution();
        for(var i = this.features.length - 1; i >= 0; i--){
            var f = this.features[i];
            var point = f.geometry;
            //过滤，只显示当前范围
            if(bounds.contains(point.x, point.y)){
                var pixelPoint = this.getPixelXY(point.x, point.y, bounds, resolution);
                if(this.featureWeight){
                    pixelPoint.weight = f.attributes[this.featureWeight];//point.value;
                }else {
                    //无权重属性处理
                    pixelPoint.weight = 1;
                }
                var geoRadius = this.featureRadius&&f.attributes[this.featureRadius]?f.attributes[this.featureRadius]:null;
                //半径只考虑非整型
                pixelPoint.geoRadius = geoRadius? parseInt(geoRadius/resolution): geoRadius;
                this.pixelHeatPoints.push(pixelPoint);
                maxTemp = maxTemp?maxTemp:pixelPoint.weight;
                minTemp = minTemp?minTemp:pixelPoint.weight;
                maxTemp = Math.max(maxTemp, pixelPoint.weight);
                minTemp = Math.min(minTemp, pixelPoint.weight);
            }
        }
        //一个feature 或者多个feature.value 相等
        if(maxTemp === minTemp){
            if(this.minWeight){
                minTemp = this.minWeight >= minTemp ? 0.00001:this.minWeight;
            }else{
                minTemp = 0.00001;
            }

        }
        //this.maxWeight = this.maxWeight ? this.maxWeight : maxTemp;
        //this.minWeight = this.minWeight ? this.minWeight : minTemp;
        this.boundsminWeight =  minTemp;

        //用于判断this.tempValue 是否进行了重新计算
        var ref_tempValue = false;
        //用户设置了最大最小值
        if(this.maxWeight && this.minWeight){
            this.tempValue = this.maxWeight - this.minWeight;
            ref_tempValue = true;
            this.usefulValue = "minWeight";
        }
        //用户只设置其中一个值
        else if(this.maxWeight || this.minWeight){
            if(this.maxWeight){
                this.tempValue = this.maxWeight - this.boundsminWeight; //用户设置最大权重值
                this.usefulValue = "boundsminWeight";
            }else{
                this.tempValue = maxTemp - this.minWeight; //用户设置最小权重值
                this.usefulValue = "minWeight";
            }
            ref_tempValue = true;
        }
        //1 this.tempValue没有重新赋值；  2 当this.tempValue 重新赋值 并且赋值无效     终极解决，必定有效
        if(!ref_tempValue || (ref_tempValue && this.tempValue < 0) ){
            this.tempValue = maxTemp - this.boundsminWeight;
            this.usefulValue = "boundsminWeight";
        }
    },

    /**
     * Method: drawHeatPoints
     * 完成绘制热点图的初始工作，逐一完成热点的渲染
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前显示范围
     */
    drawHeatPoints:function(bounds){
        //清空上次的bitmap信息
        this.canvasData = this.canvasContext.createImageData(this.maxWidth, this.maxHeight);

        this.alphaValues = [];
        this.colorValues = [];
        var defaultColor = [0, 0, 0, 0],
            i, len;
        //默认开始为黑色全透明，不需要逐个设置
        // canvasData = this.canvasData;
        // for (i = canvasData.data.length - 5; i >= 0; i -= 4){
        // canvasData.data[i] = defaultColor[0];
        // canvasData.data[i+1] = defaultColor[1];
        // canvasData.data[i+2] = defaultColor[2];
        // canvasData.data[i+3] = defaultColor[3];
        // }

        //清除(初始化)记录颜色和透明度权重值的数组对象
        for(i = this.maxWidth - 1; i >= 0; i--){
            this.alphaValues.push(new Array(this.maxHeight));
            this.colorValues.push(new Array(this.maxHeight));
        }

        //遍历热点，计算其颜色和渲染透明效果,完成cavasData的数据更新
        for( i = this.pixelHeatPoints.length - 1; i >= 0; i--){
            this.showPoint(this.pixelHeatPoints[i].x, this.pixelHeatPoints[i].y,
                this.pixelHeatPoints[i].weight,this.pixelHeatPoints[i].geoRadius);
        }

        this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxHeight);
        //绘制热点图
        this.canvasContext.putImageData(this.canvasData, 0, 0);
        this.events.triggerEvent("featuresdrawcompleted");

    },

    /**
     * Method: showPoint
     * 实现单个热点的绘制方法。
     * 热点向四周辐射渲染，半径越大值越小，透明度越小。
     *
     * Parameters:
     * x - {Number} 热点的像素 x 坐标。
     * y - {Number} 热点的像素 y 坐标。
     * value - {Number} 热点的权重值。
     * geoRadius - {Number} 热点的地理半径，如果设置了geoRadius则忽略使用value和radius计算出来的半径值。
     */
    showPoint: function(x, y, value, geoRadius){
        //根据权重计算热点的中心值和半径范围，
        var valueWeight, radiusTemp, distance, alphaTemp, colorTemp;
        //用户定义minWeight 可用  否者用当前bounds 最大最小来处理
        if(this.usefulValue === "minWeight" && (value - this.minWeight)>0){
            valueWeight = (value - this.minWeight)/this.tempValue;
        }else{
            valueWeight = (value - this.boundsminWeight)/this.tempValue;
        }
        radiusTemp = 3 + parseInt(this.radius*valueWeight);

        // if(geoRadius != "undefined" && geoRadius != null){
        // radiusTemp = geoRadius;
        // }
        //如果设置了geoRadius则忽略使用value和radius计算出来的半径值。
        if(geoRadius || 0 == geoRadius){
            radiusTemp = geoRadius;
        }
        for(var i=0; i < radiusTemp; i++){
            for(var j=0; j <= radiusTemp; j++){
                // 计算半径，对应四个位置的值可用，x,y; -x,y;x,-y;-x,-y;
                // 这里主要考虑求根算法过慢，加之循环次数太多做优化
                if(i && j){
                    distance =  1 - Math.sqrt(i*i + j*j)/radiusTemp;
                    if(distance <= 0){
                        alphaTemp = 0;
                        colorTemp = 0;
                    }else{
                        //颜色权重正比，透明权重考虑边缘可见性确保其最小为0.1
                        colorTemp = distance * valueWeight;
                        alphaTemp = distance*distance*(0.1 + 0.9*valueWeight);
                    }
                    if(colorTemp <= 0 ){
                        break;
                    }
                    //设置具体像素位置的颜色和透明度
                    this.setPixelColor(x-i, y-j, alphaTemp, colorTemp);
                    this.setPixelColor(x-i, y+j, alphaTemp, colorTemp);
                    this.setPixelColor(x+i, y-j, alphaTemp, colorTemp);
                    this.setPixelColor(x+i, y+j, alphaTemp, colorTemp);

                }else if(!j){
                    //    j为0的情况下考虑y轴可能的重复绘制做判断
                    distance = 1 - i/radiusTemp;
                    colorTemp = distance * valueWeight;
                    alphaTemp = distance*distance*(0.1 + 0.9*valueWeight);
                    if(0 != i){
                        //j为0，绘制x轴上两个点
                        this.setPixelColor(x+i, y, alphaTemp, colorTemp);
                        this.setPixelColor(x-i, y, alphaTemp, colorTemp);
                    }else{
                        //x,y都为0的话则只绘制一个点
                        this.setPixelColor(x, y, alphaTemp, colorTemp);
                    }

                }else if(!i){
                    //i为0，绘制y轴上两个点
                    distance = 1 - j/radiusTemp;
                    colorTemp = distance * valueWeight;
                    alphaTemp = distance*distance*(0.1 + 0.9*valueWeight);
                    this.setPixelColor(x, y-j, alphaTemp, colorTemp);
                    this.setPixelColor(x, y+j, alphaTemp, colorTemp);
                }
            }
        }
    },

    /**
     * Method: setPixelColor
     * 设置单个像素点的颜色和透明度.
     *
     * Parameters:
     * x - {int} 热点的像素 x 坐标。
     * y - {int} 热点的像素 y 坐标。
     * alphaTemp - {Number} 热点的颜色权重。
     * colorTemp - {Number} 热点的透明度权重。
     */
    setPixelColor: function(x, y, alphaTemp, colorTemp){
        //范围外不予处理
        if( x >= 0 && x < this.maxWidth && y >= 0 && y < this.maxHeight){
            var alpha = this.alphaValues[x][y],
                color = this.colorValues[x][y],
                pixelColorIndex = y*this.maxWidth*4 + x*4,
                canvasData = this.canvasData;
            //叠加颜色和透明权重，颜色权重使用明度的叠加算法；
            //透明度叠加使用透明度叠加算法。两者基本一致
            if(alpha){
                alpha = alpha + alphaTemp - alphaTemp*alpha;
                color = color + colorTemp - colorTemp*color;
            }else{
                alpha = alphaTemp;
                color = colorTemp;
            }

            //记录权重值
            this.alphaValues[x][y] = alpha;
            this.colorValues[x][y] = color;


            var colorObj = this.convertWeightToColor(color);
            //填充颜色和透明度的具体值
            canvasData.data[pixelColorIndex] = colorObj.r;
            canvasData.data[pixelColorIndex+1] = colorObj.g;
            canvasData.data[pixelColorIndex+2] = colorObj.b;
            canvasData.data[pixelColorIndex+3] = alpha*255;
        }
    },

    /**
     * Method: convertWeightToColor
     * 将颜色权重转成具体的颜色。
     * 考虑更广泛和支持自定义行这个方法可能会做扩展支持，暂且不论。
     *
     * Parameters:
     * value - {Number} 颜色权重。
     */
    convertWeightToColor:function(value){
        var r, g, b,me = this;
        //转换颜色,这里是用颜色权重的三次方作为依据，已达到中心到边缘过渡的更迅速，重点突出（三次方效果）
        value = value*value*value;
        //如果设置了参数，且为数组，长度大于1，按照参数来
        if(me.colors && SuperMap.Util.isArray(me.colors) && me.colors.length>1)
        {
            var startC,endC,len = me.colors.length;
            var index = parseInt((value - value%(1/(len-1)))/(1/(len-1)));
            if(index === len-1)
            {
                index--;
            }
            startC =  me.colors[index];
            endC = me.colors[index+1];
            r = startC.red + (endC.red - startC.red)*value;
            g = startC.green + (endC.green - startC.green)*value;
            b = startC.blue + (endC.blue - startC.blue)*value;
        }
        //默认没有设置就按照绿到蓝，保持以前的不变
        else
        {
            if(value < 0.65)
            {
                g = 240;
                r = 370 * value;
            }
            else
            {
                r = 240;
                g = 50+(636 - 636*value);
            }
        }

        return {"r": r, "g": g,"b":b};
    },

    /**
     * Method: getPixelXY
     * 转换地理坐标为相对于当前窗口左上角的像素坐标
     *
     * Parameters:
     * x - {int} 热点的像素 x 坐标。
     * y - {int} 热点的像素 y 坐标。
     * bounds - {SuperMap.Bounds} 当前地图显示范围。
     * resolution - {Number} 当前地图分辨率。
     */
    getPixelXY: function(x, y, bounds, resolution) {
        var x = (x / resolution + (-bounds.left / resolution));
        var y = ((bounds.top / resolution) - y / resolution);
        return {x: parseInt(x), y: parseInt(y)};
    },

    CLASS_NAME: "SuperMap.Layer.HeatMapLayer"
});