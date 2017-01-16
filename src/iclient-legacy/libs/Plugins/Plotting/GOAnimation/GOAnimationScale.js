/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionScale
 * 动态标绘比例动画类。
 */
SuperMap.Plot.GOAniamtionScale =  SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * APIProperty: startScale
     * {Float} 开始比例。
     */
    startScale : 0,

    /**
     * APIProperty: endScale
     * {Float} 结束比例。
     */
    endScale : 1.0,

    /**
     * Property: featureScale
     * {Float} 标号比例。
     */
    featureScale : 0.0,

    /**
     * Constructor: SuperMap.Plot.GOAniamtionScale
     * 构建一个动画类。
     *
     */
    initialize: function(options){
        SuperMap.Plot.GOAniamtion.prototype.initialize.apply(options);

    },

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE;
    },

    /**
     * Method: excute
     * 执行动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute: function(){
        //如果不是点标号不支持该动画
        if(!this.isDot(this.goFeature)){
            return false;
        }

        //判断是否执行结束
        if(!this.canExcute()){
            return false;
        }

        if(0 === this.featureScale){
            this.featureScale = this.goFeature.geometry.dScale;
        }

        this.animationGOFeature.geometry.dScale = this.featureScale*(this.startScale + this.ratio*(this.endScale-this.startScale)) ;
        this.animationGOFeature.geometry.feature = this.animationGOFeature;
        this.animationGOFeature.geometry.calculateParts();

        return true;
    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionScale"
});
