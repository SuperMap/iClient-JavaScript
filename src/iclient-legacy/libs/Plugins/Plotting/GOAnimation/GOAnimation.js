/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtion
 * 动态标绘动画基类。
 */
SuperMap.Plot.GOAniamtion = SuperMap.Class({

    /**
     * APIProperty: startTime
     * {Double}  动画开始时间,单位为秒。
     */
    startTime: 0.0,

    /**
     * APIProperty: duration
     * {Double}  动画时长,单位为秒。
     */
    duration: 5.0,

    /**
     * APIProperty: repeat
     * {Boolean} 是否重复循环播放，默认为false。
     */
    repeat: false,

    /**
     * APIProperty: name
     * {String} 标号名称,动画的唯一标示
     */
    name: null,

    /**
     * Property: animationState
     * {<SuperMap.Plot.GOAnimationState>} 动画播放状态
     */
    animationState: SuperMap.Plot.GOAnimationState.UNKNOW,

    /**
     * Property: goFeature
     * {<SuperMap.Feature.Vector>} 动画原始几何对象。
     */
    goFeature: null,

    /**
     * Property: goFeature
     * {<SuperMap.Feature.Vector>} 动画几何对象。
     */
    animationGOFeature: null,

    /**
     * Property: innerStartTime
     * {Double} 记录播放动画的开始时间。
     */
    innerStartTime: 0.0,

    /**
     * Property: lastExcute
     * {Integer} 动画最后一次是否执行了。
     */
    lastExcute: false,

    /**
     * Property: pauseTime
     * {Double} 记录动画暂停时间。
     */
    pauseTime:0.0,
    /**
     * Property: ratio
     * {Double} 记录动画当前时间比例。
     */
    ratio:0.0,

    /**
     * Constructor: <SuperMap.Plot.GOAniamtionManager>
     * 构建一个动画管理类。
     *
     */
    initialize: function(options){
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。
     */
    destroy: function() {
        //显示原来对象，隐藏动画对象
        this.showAnimationFeature(false);

        //移除动画图层中的动画对象
        this.removeAnimationFeature();

        this.goFeature = null;
        this.plottingLayer = null;
        this.animationGOFeature = null;
        this.name = null;
        this.animationState = SuperMap.Plot.GOAnimationState.UNKNOW;
    },

    /**
     * APIMethod: setGOFeture
     * 设置创建动画的对象。
     *
     * Parameters:
     * goFeature - {<SuperMap.Feature.Vector>} 动画原始几何对象。
     *
     * Returns:
     * {Boolean} 设置成功返回true,否则返回false
     */
    setGOFeture: function(goFeature){
        if(undefined === goFeature || null === goFeature || null === goFeature.layer){
            return false;
        }

        //获取动画图层
        var plotting = SuperMap.Plotting.getInstance();
        var animationManager = plotting.getGOAnimationManager();
        if(null === animationManager.goAnimationLayer){
            return false;
        }

        this.goFeature = goFeature;
        this.animationGOFeature = this.cloneGOFeature(goFeature);

        if(null === this.animationGOFeature){
            return false;
        }

        //添加到GOAnimationLayer中
        this.animationGOFeature.layer = animationManager.goAnimationLayer;
        this.animationGOFeature.geometry.layer = animationManager.goAnimationLayer;
        animationManager.goAnimationLayer.addFeature(this.animationGOFeature);

        //if(this.getGOAnimationType() === SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW){
        //    this.removeTextContent();
        //}

        //不显示动画对象
        this.showAnimationFeature(false);

        return true;
    },

    /**
     * APIMethod: getGOFeture
     * 获取动画的原始几何对象。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 动画原始几何对象
     */
    getGOFeture : function(){
        return this.goFeature;
    },

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_UNKNOW;
    },

    /**
     * APIMethod: play
     * 播放
     */
     play : function(){
        var myDate = new Date();
        if(this.animationState === SuperMap.Plot.GOAnimationState.PAUSE){
            this.innerStartTime += myDate.getTime() / 1000.0 - this.pauseTime;
        }
        else{
            this.innerStartTime =  myDate.getTime() / 1000.0;
        }

        this.lastExcute = false;
        this.animationState = SuperMap.Plot.GOAnimationState.PLAYING;


        if(this.goFeature!==null && this.goFeature.layer !== null)
        {
            this.goFeature.layer.plottingEdit.clearSelectFeatures();
        }
        this.showAnimationFeature(true);
    },

    /**
     * APIMethod: stop
     * 停止
     */
    stop : function(){
        this.animationState = SuperMap.Plot.GOAnimationState.STOP;
    },

    /**
     * APIMethod: pause
     * 暂停
     */
    pause : function(){
        this.animationState = SuperMap.Plot.GOAnimationState.PAUSE;
        var myDate = new Date();
        this.pauseTime = myDate.getTime() / 1000.0;
    },

    /**
     * APIMethod: reset
     * 复位
     */
    reset : function(){
        this.animationState = SuperMap.Plot.GOAnimationState.RESET;
        this.showAnimationFeature(false);
    },


    /**
     * Method: excute
     * 执行动画
     *
     * Returns:
     * {Boolean} 如果动画执行则返回true，否则返回false
     */
    excute: function(){
        return false;
    },

    /**
     * Method: excute
     * 判断是否可以执行
     *
     * Returns:
     * {Boolean} 如果可以执行则返回true，否则返回false。
     */
    canExcute: function(){

        if(this.animationState !== SuperMap.Plot.GOAnimationState.PLAYING){
            return false;
        }

        var ratio = this.getRatioByTime();

        if((ratio > 1.0 && this.lastExcute) || ratio < 0.0){
            return false;
        }
        else{
            return true;
        }
    },

    /**
     * Method: getRatioByTime
     * 根据时间获取动画当前执行的比例
     *
     * Returns:
     * {Double} 比例
     */
    getRatioByTime: function(){

        if(this.animationState !== SuperMap.Plot.GOAnimationState.PLAYING){
            return 0.0;
        }

        var myDate = new Date();
        var curentDate = myDate.getTime() / 1000.0;

        if(this.innerStartTime + this.startTime > curentDate){
            return 0.0;
        }

        var ratio = (curentDate - this.innerStartTime - this.startTime ) / this.duration;

        if(ratio >= 1.0 && !this.lastExcute){//执行最后一次

            if(this.repeat){
                this.innerStartTime =  myDate.getTime() / 1000.0;
                ratio = 0.0;
                this.lastExcute = false;
                this.animationState = SuperMap.Plot.GOAnimationState.PLAYING;
            }
            else{
                ratio = 1.0;
                this.lastExcute = true;
                this.animationState = SuperMap.Plot.GOAnimationState.STOP;
            }

        }
        else if(ratio < 0.0){
            ratio = 0.0;
        }
        this.ratio = ratio;
        return ratio;
    },

    /**
     * Method: showAnimationFeature
     * 设置动画对象和原对象是否显示
     *
     * Parameters:
     * show - {Boolean} 动画对象是否显示。
     */
    showAnimationFeature : function(show){

        var  display = "display";
        var unDisplay = "none";

        if(null !== this.animationGOFeature && null !== this.animationGOFeature.style){
            if(show){
                this.animationGOFeature.style.display = display;
            }
            else{
                this.animationGOFeature.style.display = unDisplay;

                if(this.getGOAnimationType() === SuperMap.Plot.GOAniamtionType.ANIMATION_WAY){
                    if(null !== this.pathFeature){
                        this.pathFeature.style.display= unDisplay;
                    }
                }
            }
            this.animationGOFeature.layer.drawFeatures();
        }

        if(null !== this.goFeature && null !== this.goFeature.style){
            if(show){
                this.goFeature.style.display = unDisplay;
            }
            else{
                this.goFeature.style.display = display;
            }
            //重绘标号
            if(null !== this.goFeature.layer){
                if(this.goFeature.layer.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas2"){
                    this.goFeature.layer.redraw();
                }
                else {
                    this.goFeature.layer.drawFeature(this.goFeature);
                }
            }
        }
    },

    /**
     * Method: isPlottingGeometry
     * 判断是否是标绘对象
     *
     * Returns:
     * {Boolean} 是则返回true，否则返回false
     */
    isGeoGraphicObject: function (feature) {
        if (feature.geometry instanceof SuperMap.Geometry.DotSymbol ||
            feature.geometry instanceof SuperMap.Geometry.AlgoSymbol){
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Method: isDot
     * 判断是否是点标号
     *
     * Returns:
     * {Boolean} 是则返回true，否则返回false
     */
    isDot: function (feature) {
        if (feature.geometry instanceof SuperMap.Geometry.DotSymbol){
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Method: isAlgo
     * 判断是否是线面标号
     *
     * Returns:
     * {Boolean} 是则返回true，否则返回false
     */
    isAlgo: function (feature) {
        if (feature.geometry instanceof SuperMap.Geometry.AlgoSymbol){
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Method: cloneGOFeature
     * 克隆动画的对象。
     *
     * Parameters:
     * goFeature - {<SuperMap.Feature.Vector>} 动画原始几何对象。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 克隆的对象
     */
    cloneGOFeature: function(goFeature){
        var animationGOFeature = null;

        var plotting = SuperMap.Plotting.getInstance();
        var animationManager = plotting.getGOAnimationManager();
        var goAnimatons = animationManager.goAnimatons;

        //查找这个对象是否已经创建了动画对象
        if(null !== goAnimatons){
            for(var i = 0; i < goAnimatons.length; i++){
                var animaiton = goAnimatons[i];
                if(animaiton.goFeature === goFeature){
                    animationGOFeature = animaiton.animationGOFeature;
                    break;
                }
            }
        }

        if(null === animationGOFeature){
            animationGOFeature = SuperMap.Plot.PlottingUtil.copyFeature(goFeature);
        }

        return animationGOFeature;
    },

    /**
     * Method: removeAnimationFeature
     * 删除动画对象
     */
    removeAnimationFeature: function () {
        if(null === this.animationGOFeature || null === this.animationGOFeature.layer){
            return;
        }

        var plotting = SuperMap.Plotting.getInstance();
        var animationManager = plotting.getGOAnimationManager();
        var goAnimatons = animationManager.goAnimatons;

        //查找动画对象是否还有动画在使用，如果没有删除动画对象
        var isUse = false;
        if(null !== goAnimatons){
            for(var i = 0; i < goAnimatons.length; i++){

                var animaiton = goAnimatons[i];
                if(animaiton === this){
                    continue;
                }

                if(animaiton.animationGOFeature === this.animationGOFeature){
                    isUse = true;
                    break;
                }
            }
        }

        if(!isUse){
            var features = [];
            features.push(this.animationGOFeature);
            this.animationGOFeature.layer.removeFeatures(features);
        }
    },



    CLASS_NAME: "SuperMap.Plot.GOAniamtion"
});