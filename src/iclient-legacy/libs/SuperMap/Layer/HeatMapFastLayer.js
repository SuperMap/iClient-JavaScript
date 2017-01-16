/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/HeatMapLayer.js
 */

/**
 * Class: SuperMap.Layer.HeatMapFastLayer
 * 重写HeatMapLayer的热点渲染方法，提升渲染速度，不再支持可变热点半径。
 *
 *  * Inherits from:
 *  - <SuperMap.Layer.HeatMapLayer>
 */
SuperMap.Layer.HeatMapFastLayer = SuperMap.Class(SuperMap.Layer.HeatMapLayer, {

    /**
     * APIProperty: colors
     * {Array()} 颜色线性渐变数组,颜色值必须为canvas所支持，默认为['blue','cyan','lime','yellow','red']。
     *
     */
    colors: ['blue','cyan','lime','yellow','red'],

    /**
     * APIProperty: radius
     * {Number} 热点半径 默认为 50。
     * 热点显示的时候以精确点为中心点开始往四周辐射衰减，
     * 其衰减半径和权重值成比列。
     * 注：默认为像素，如需与图层地理坐标保持一致需设置useGeoUnit = true。
     */
    radius: 50,

    /**
     * APIProperty: useGeoUnit
     * {Boolean} 使用地理单位，默认是false，即默认热点半径默认使用像素单位。 当设置为true时，热点半径和图层地理坐标保持一致。
     */
    useGeoUnit: false,

    /**
     * APIProperty: maxWeight
     * {Number} 设置权重最大值。
     */
    maxWeight: null,


    /**
     * Constructor: SuperMap.Layer.HeatMapFastLayer
     * 创建一个热点图层。
     * (start code)
     * //创建一个名为“heatmapfastlayer” 的热点渲染图层。
     *  var heatmapfastlayer = new SuperMap.Layer.HeatMapFastLayer("heatmapfastlayer");
     * (end)
     *
     * Parameters:
     * name - 此图层的图层名 {String}
     * options - {Object} 设置此类上没有默认值的属性。
     *
     * Returns:
     * {<SuperMap.Layer.HeatMapFastLayer>} 新的热点图层。
     */
    initialize: function(name, options) {
        SuperMap.Layer.HeatMapLayer.prototype.initialize.apply(this, arguments);
    },



    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function() {
        this.useGeoUnit = null;
        SuperMap.Layer.HeatMapLayer.prototype.destroy.apply(this, arguments);
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
            //this.drawHeatPoints(bounds);
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
        var data = [], x, y, k,resolution = this.map.getResolution(), maxTemp, minTemp, maxWeightTemp;

        //热点半径
        this.useRadius = this.useGeoUnit ? parseInt(this.radius/resolution) : this.radius;

        for(var i = 0; i<this.features.length; i++){
            var feature = this.features[i];
            var point = feature.geometry;
            //当前范围点
            if(bounds.contains(point.x,point.y)){
                //var pixelPoint = this.getViewPortPxFromLonLat(new SuperMap.LonLat(point.x,point.y));
                var pixelPoint = this.getPixelXY(point.x, point.y, bounds, resolution);
                if(this.featureWeight) {
                    pixelPoint.weight = feature.attributes[this.featureWeight];//point.value;
                    if(!this.maxWeight){
                        //找出最大最小权重值
                        maxTemp = maxTemp?maxTemp:pixelPoint.weight;
                        minTemp = minTemp?minTemp:pixelPoint.weight;
                        maxTemp = Math.max(maxTemp, pixelPoint.weight);
                        minTemp = Math.min(minTemp, pixelPoint.weight);
                    }
                }else {
                    pixelPoint.weight = 1;
                }

                x = Math.floor(pixelPoint.x);
                y = Math.floor(pixelPoint.y);
                k = pixelPoint.weight;

                data.push([x, y, k]);
            }
        }

        //无最大权重设置
        if(!this.maxWeight){
            if(maxTemp && minTemp){
                maxWeightTemp = (maxTemp+minTemp)/2;
            } else {
                maxWeightTemp = 1;
            }
            this.draw(data,maxWeightTemp);
        }else {
            this.draw(data,this.maxWeight);
        }
    },

    /**
     * Method: draw
     * 绘制热点图
     *
     * Parameters:
     * data  convertToPixelPoints方法计算出的点
     */
    draw: function(data,maxWeight){
        //清空
        var ctx= this.canvasContext;
        this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxHeight);
        this.drawCircle(this.useRadius);
        this.createGradient();

        for(var i = 0; i<data.length; i++){
            var p = data[i];
            this.canvasContext.globalAlpha = Math.max(p[2]/maxWeight, 0.05);
            this.canvasContext.drawImage(this.circle,p[0] -this.useRadius,p[1] - this.useRadius);
        }

        var colored = ctx.getImageData(0,0,this.maxWidth,this.maxHeight);
        this.colorize(colored.data,this.grad);
        ctx.putImageData(colored,0,0);
        this.events.triggerEvent("featuresdrawcompleted");
    },


    /**
     * Method: colorize
     * 根据渐变色重置热点图rgb值
     *
     * Parameters:
     * pixels  像素RGBA值
     * gradient 渐变canvas.getImageData.data
     */
    colorize: function(pixels,gradient){
        for(var i = 0, j; i<pixels.length; i+=4){
            j = pixels[i+3]*4;
            if(j){
                pixels[i] = gradient[j];
                pixels[i+1] = gradient[j+1];
                pixels[i+2] = gradient[j+2];
            }
        }
    },

    /**
     * Method: drawCircle
     * 绘制热点半径圆
     *
     * Parameters:
     * r  热点半径
     */
     drawCircle: function(r){
         var blur = r/2;

         var circle = this.circle = document.createElement('canvas'),
             ctx = circle.getContext("2d");

         circle.height = 2*r;
         circle.width = 2*r;
         ctx.shadowOffsetX = ctx.shadowOffsetY = 2*r;
         ctx.shadowBlur = blur;
         ctx.shadowColor = "#000000";

         ctx.beginPath();
         ctx.arc(-r,-r,r/2,0,Math.PI*2,true);
         ctx.closePath();
         ctx.fill();
     },

    /**
     * Method: createGradient
     * 根据this.colors设置渐变并getImageData
     */
    createGradient: function(){
       var colors = this.colors;
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d"),
            gradient = ctx.createLinearGradient(0,0,0,256);
        canvas.height =256;
        canvas.width = 1;

        var index = 1;
        for(var i = 0, len = colors.length; i<len; i++){
            gradient.addColorStop(index/len,colors[i]);
            index++;
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,1,256);

        this.grad = ctx.getImageData(0,0,1,256).data;
    },

    CLASS_NAME: "SuperMap.Layer.HeatMapFastLayer"
});