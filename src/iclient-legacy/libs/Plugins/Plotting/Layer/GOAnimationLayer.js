/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer.js
 * @requires SuperMap/Renderer.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Console.js
 * @requires SuperMap/Lang.js
 */

/**
 * Class: SuperMap.Layer.AnimatorVector
 * 该图层用于渲染动态矢量要素。
 *
 * 目的在于表达现实事物在时间上的空间变化，如车辆监控、气象模拟等
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.GOAnimationLayer = SuperMap.Class(SuperMap.Layer.AnimatorVector, {//SuperMap.Layer.PlottingLayer,

    /**
     * APIProperty: rendererType
     * {String} 渲染类型，当前支持：
     * 默认为 "Canvas"
     */
    rendererType: 'PlotCanvas',

    /**
     * Method: drawFeatures
     * 遍历所有features，并绘制，
     */
     drawFeatures: function(bounds) {
        var me = this,
            drawFeatures = me.features;
        //如果当前图层不可见，则不进行绘制
        if(!me.visibility)
        {
            return;
        }
        //清除图层一下
        this.renderer.clear();
        if(!drawFeatures || drawFeatures.length<1)
        {
            return;
        }
        //方法一：直接循环遍历
        for(var k = 0, len = drawFeatures.length; k < len; k++) {
            var feature = drawFeatures[k];
            //var ratio = me.getRatioByTime();
            me.drawFeature(feature,undefined,{smooth:[true,1.0]});
        }
    },

    /**
     * Method: drawFeature
     * 在当前图层中绘制一个feature。如果参数中的样式（style）被设置
     * 则使用。否则使用矢量要素的样式。如果未设置要素的样式，则使用图层上的样式。
     * 
     * 当要素的样式更改或者要素已经添加到图层上需要更新时使用该函数。
     *
     * Parameters: 
     * feature - {<SuperMap.Feature.Vector>}需要绘制的要素
     * style - {String | Object} 风格
     */
     drawFeature: function(feature, style,option) {
        //生成默认的style
        if (typeof style !== "object") {
            if(!style && feature.state === SuperMap.State.DELETE) {
                style = "delete";
            }
            var renderIntent = style || feature.renderIntent;
            style = feature.style || this.style;
            if (!style) {
                style = this.styleMap.createSymbolizer(feature, renderIntent);
            }
        }

        if(!feature || !feature.geometry){
            return;
        }

        if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.AlgoSymbol"  && feature.grow ===true)
        {
            //send to server
            function getCompleted(result){
                feature.geometry.symbolData.innerCells = result.originResult.innerCells;
                feature.geometry.feature = feature;
                feature.geometry.calculateParts();

                var renderedFeature = this.renderer.drawFeature(feature, style, option);
                renderedFeature && this.recordDrawedFeature(renderedFeature);
                this.renderer.container.style.cursor = "pointer";
                renderedFeature && this.events.triggerEvent('featurerendered', renderedFeature);
            }

            //获取数据失败
            function getFailed(result){
                feature.geometry.controlPoints = [];
                var renderedFeature = this.renderer.drawFeature(feature, style, option);
                return;
            }

            var plotting = SuperMap.Plotting.getInstance();
            if(null === plotting.serverUrl){
                return;
            }

            //对接iserver中的服务
            var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(plotting.serverUrl);
            getSymbolInfo.events.on({
                "processCompleted": getCompleted,
                "processFailed": getFailed,
                scope: this
            });

            var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
            getSymbolInfoParams.libID = feature.geometry.symbolData.libID;
            getSymbolInfoParams.code = feature.geometry.symbolData.code;
            getSymbolInfoParams.inputPoints = feature.geometry.controlPoints;
            getSymbolInfo.processAsync(getSymbolInfoParams);

        }
        else
        {
            var renderedFeature = this.renderer.drawFeature(feature, style, option);
            renderedFeature && this.recordDrawedFeature(renderedFeature);
            this.renderer.container.style.cursor = "pointer";
            renderedFeature && this.events.triggerEvent('featurerendered', renderedFeature);
        }

    },

    /**
     * Method: addFeature
     * 添加要素
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}需要绘制的要素
     */
    addFeature: function(feature){
        if(null === feature){
            return;
        }

        this.features.push(feature);
    },

    /**
     * Method: addFeatures
     * 添加要素
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)}需要绘制的要素数组
     */
    addFeatures: function(features){
        if(null === features){
            return;
        }

        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }

       for(var i = 0; i < features.length; i++){
           this.addFeature(features[i]);
       }
    },

    /**
     * Method: removeFeature
     * 删除要素
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}需要绘制的要素
     */
    removeFeature: function(feature){
        if(null === feature){
            return;
        }

        for(var i = 0; i < this.features.length; i++){
            if(this.features[i] === feature){
                this.features.splice(i,1);
                break;
            }
        }
    },

    /**
     * Method: removeFeatures
     * 删除要素
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)}需要绘制的要素数组
     */
    removeFeatures: function(features) {
        if(null === features){
            return;
        }

        for(var i = 0; i < features.length; i++){
            this.removeFeature(features[i]);
        }
    },

    CLASS_NAME: "SuperMap.Layer.GOAnimationLayer"
});
