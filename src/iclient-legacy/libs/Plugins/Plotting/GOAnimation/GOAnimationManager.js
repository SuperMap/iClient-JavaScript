/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionManager
 * 动画管理类，负责标号动画的管理。
 */
SuperMap.Plot.GOAniamtionManager = SuperMap.Class({

    /**
     * APIProperty: goAnimatons
     * {Array(<SuperMap.Geometry.GOAniamtion>)} 动画数组。
     */
    goAnimatons: null,

    /**
     * Property: map
     * <SuperMap.Map>
     */
    map: null,

    /**
     * Property: goAnimationLayer
     * {<SuperMap.Layer.GOAnimationLayer>} 动画图层。
     */
    goAnimationLayer:null,

    /**
     * Constructor: <SuperMap.Plot.GOAniamtionManager>
     * 构建一个动画管理类。
     *
     */
    initialize: function(options){
        this.goAnimatons = [];
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。
     */
    destroy: function() {
        this.goAnimatons = null;

        //移除图层
        this.map.removeLayer(this.goAnimationLayer);
        this.goAnimationLayer = null;
        this.map = null;
    },

    /**
     * APIMethod: setMap
     * 设置地图对象
     *
     * Parameters:
     * map - {<SuperMap.Map>} 地图对象。
     *
     * Returns:
     * {Boolean} 设置成功返回true,否则返回false
     */
    setMap: function (map) {
        if(null === map){
            return false;
        }

        if(this.map === map){
            return true;
        }

        if(null !== this.map && null !== this.goAnimationLayer){
            this.destroy();
            this.goAnimatons = [];
        }

        this.map = map;

        //初始化动画矢量图层
        this.goAnimationLayer = new SuperMap.Layer.GOAnimationLayer("GOAnimationLayer");
        return this.map.addLayer(this.goAnimationLayer);
    },

    /**
     * APIMethod: createGOAnimation
     * 创建动画。
     *
     * Parameters:
     * animationType - {<SuperMap.Plot.GOAniamtionType>} 动画类型。
     * goFeature - {<SuperMap.Feature.Vector>} 动画原始几何对象。
     * name - {String} 动画名称
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtion>}动画对象
     */
    createGOAnimation : function(animationType,name,goFeature){
        var goAnimation = this.createGOAnimationByType(animationType,name);
        if(null === goAnimation){
            return null;
        }

        if(goAnimation.setGOFeture(goFeature)){
            this.goAnimatons.push(goAnimation);
            return goAnimation;
        }else{
            return null;
        }
    },

    /**
     * APIMethod: findGOAnimationByName
     * 创建动画。
     *
     * Parameters:
     * name - {String} 动画名称。
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtion>}动画对象
     */
    findGOAnimationByName : function(name){
        if( null === this.goAnimatons || null === name || "" === name){
            return null;
        }

        var goAnimation = null;
        for(var i = 0; i < this.goAnimatons.length; i++){
            if(this.goAnimatons[i].name === name){
                goAnimation = this.goAnimatons[i];
                break;
            }
        }

        return goAnimation;
    },

    /**
     * APIMethod: findGOAnimationByName
     * 创建动画。
     *
     * Parameters:
     * goFeature - {<SuperMap.Feature.Vector>} 动画原始几何对象。
     *
     * Returns:
     * {Array<SuperMap.Plot.GOAniamtion>}动画对象
     */
    findGOAnimationsByFeature : function(goFeature){
        var results = [];
        if( null === this.goAnimatons || goFeature === "undefined" || null === goFeature){
            return results;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            if(this.goAnimatons[i].getGOFeture() === goFeature){
                results.push(this.goAnimatons[i]);
            }
        }

        return results;
    },

    /**
     * APIMethod: removeGOAnimationByName
     * 根据名称删除动画。
     *
     * Parameters:
     * name - {String} 动画名称。
     *
     * Returns:
     * {Boolean} 是否删除成功
     */
    removeGOAnimationByName: function(name){
        if( null === this.goAnimatons || null === name || "" === name){
            return false;
        }

        var goAnimation = this.findGOAnimationByName(name);
        return this.removeGOAnimation(goAnimation);
    },

    /**
     * APIMethod: removeGOAnimationByName
     * 删除动画。
     *
     * Parameters:
     * goAniamtion - {<SuperMap.Plot.GOAniamtion>} 动画名称。
     *
     * Returns:
     * {Boolean} 是否删除成功
     */
    removeGOAnimation: function(goAniamtion){
        if(null === this.goAnimatons || null === goAniamtion){
            return false;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            if(this.goAnimatons[i] === goAniamtion){

                goAniamtion.reset();

                this.goAnimatons.splice(i, 1);
                goAniamtion.destroy();
                break;
            }
        }

        return true;
    },

    /**
     * APIMethod: removeGOAnimationByName
     * 删除所有动画。
     */
    removeAllGOAnimation: function(){
        if(null === this.goAnimatons){
            return;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            this.removeGOAnimation(this.goAnimatons[i]);
        }

        this.goAnimatons = [];
    },

    /**
     * APIMethod: excute
     * 执行动画。
     *
     * Returns:
     * {Boolean} 有动画执行则返回true，否则返回false
     */
    excute: function(){
        if( null === this.goAnimatons || null === this.goAnimationLayer){
            return false;
        }

        var haveAnimaitonExcute = false;
        if(this.hasGrowanimation()){
            for(var i = 0; i < this.goAnimatons.length; i++){
                if(this.goAnimatons[i].excute()){
                    haveAnimaitonExcute = true;
                    this.goAnimationLayer.drawFeature(this.goAnimationLayer.features[i],undefined,{smooth:[true,1.0]});
                }
            }
        }else{
            for(var i = 0; i < this.goAnimatons.length; i++){
                if(this.goAnimatons[i].excute()){
                    haveAnimaitonExcute = true;
                }
            }

            if(haveAnimaitonExcute){
                //重绘动画图层
                this.goAnimationLayer.drawFeatures();
            }
        }

        return haveAnimaitonExcute;
    },
    /**
     * Method: hasGrowanimation
     * 是否含有生长动画
     */
    hasGrowanimation : function(){
        //需要访问服务器的生长动画和 其他动画一起播放 会不显示， 单独处理
        if(null === this.goAnimatons){
            return false;
        }

        if( this.goAnimatons.length<2){
            return false;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            if(this.goAnimatons[i].animationGOFeature.grow===true)
                return true;
        }
    },

    /**
     * APIMethod: play
     * 播放所有动画
     */
    play : function(){
       if(null === this.goAnimatons){
           return;
       }

        for(var i = 0; i < this.goAnimatons.length; i++){
            this.goAnimatons[i].play();
        }
    },

    /**
     * APIMethod: stop
     * 停止所有动画
     */
    stop : function(){
        if(null === this.goAnimatons){
            return;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            this.goAnimatons[i].stop();
        }
    },

    /**
     * APIMethod: pause
     * 暂停所有动画
     */
    pause : function(){
        if(null === this.goAnimatons){
            return;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            this.goAnimatons[i].pause();
        }
    },

    /**
     * APIMethod: reset
     * 复位所有动画
     */
    reset : function(){
        if(null === this.goAnimatons){
            return;
        }

        for(var i = 0; i < this.goAnimatons.length; i++){
            this.goAnimatons[i].reset();
        }
    },

    /**
     * Method: createGOAnimationByType
     * 根据类型创建动画。
     *
     * Parameters:
     * animationType - {<SuperMap.Plot.GOAniamtionType>} 动画类型。
     * name - {String} 动画名称
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtion>}动画对象
     */
    createGOAnimationByType : function(animationType, name){

        if(null == this.goAnimationLayer || null === name || "" === name){
            return null;
        }

        if(null !== this.findGOAnimationByName(name)){
            return null;
        }

        var goAnimation = null;
        switch (animationType){
            case SuperMap.Plot.GOAniamtionType.ANIMATION_WAY:{
                goAnimation = new SuperMap.Plot.GOAniamtionWay();
                break;
            }
            case SuperMap.Plot.GOAniamtionType.ANIMATION_BLINK:{
                goAnimation = new SuperMap.Plot.GOAniamtionBlink();
                break;
            }
            case SuperMap.Plot.GOAniamtionType.ANIMATION_ATTRIBUTE:{
                goAnimation = new SuperMap.Plot.GOAniamtionAttribute();
                break;
            }
            case SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW:{
                goAnimation = new SuperMap.Plot.GOAniamtionShow();
                break;
            }
            case SuperMap.Plot.GOAniamtionType.ANIMATION_ROTATE:{
                goAnimation = new SuperMap.Plot.GOAniamtionRotate();
                break;
            }
            case SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE:{
                goAnimation = new SuperMap.Plot.GOAniamtionScale();
                break;
            }
            case SuperMap.Plot.GOAniamtionType.ANIMATION_GROW:{
                goAnimation = new SuperMap.Plot.GOAniamtionGrow();
                break;
            }
            default :{
                return null;
            }
        }

        if(null !== goAnimation){
            goAnimation.name = name;
        }

        return goAnimation;
    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionManager"
});