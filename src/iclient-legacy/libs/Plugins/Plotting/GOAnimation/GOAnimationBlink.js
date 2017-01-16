/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionBlink
 * 动态标绘闪烁动画类。
 */
SuperMap.Plot.GOAniamtionBlink = SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * APIProperty: blinkInterval
     * {Integer}  闪烁间隔，单位为毫秒。
     */
    blinkInterval: 500,

    /**
     * APIProperty: blinkStyle
     * {SuperMap.Plot.BlinkAnimationBlinkStyle}  闪烁类型。
     */
    blinkStyle: SuperMap.Plot.BlinkAnimationBlinkStyle.Blink_Frequency,

    /**
     * APIProperty: blinkNumber
     * {Integer}  闪烁次数。
     */
    blinkNumber: 0,

    /**
     * APIProperty: replaceStyle
     * {SuperMap.Plot.BlinkAnimationReplaceStyle}  颜色交替类型。
     */
    replaceStyle : SuperMap.Plot.BlinkAnimationReplaceStyle.Replace_NoColor,

    /**
     * APIProperty: startColor
     * {Integer}  开始颜色。
     */
    startColor: 0,

    /**
     * APIProperty: endColor
     * {Integer}  结束颜色。
     */
    endColor: 0,

    /**
     * Constructor: SuperMap.Plot.GOAniamtionBlink
     * 构建一个闪烁动画类。
     *
     */
    initialize: function(options){

        SuperMap.Plot.GOAniamtion.prototype.initialize.apply(options);

    },
    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_BLINK;
    },

    /**
     * Method: excute
     * 执行动画
     */
    excute: function(){

        //判断是否执行结束
        if(!this.canExcute()){
            return false;
        }
        var myDate = new Date();
        var curentDate = myDate.getTime() / 1000.0;
        var interval = this.blinkInterval/1000.0;
        if(this.blinkStyle ===  SuperMap.Plot.BlinkAnimationBlinkStyle.Blink_Number)
        {
          interval = this.blinkInterval = this.duration/this.blinkNumber;
        }
        //this.animationGOFeature.geometry.feature = this.animationGOFeature;
        //this.animationGOFeature.geometry.calculateParts(); no need

        var temp = (curentDate - this.innerStartTime) % (interval);
        if( temp <= interval/2) {
            if( this.replaceStyle===SuperMap.Plot.BlinkAnimationReplaceStyle.Replace_Color){
                this.animationGOFeature.style.strokeColor = this.startColor;
                this.animationGOFeature.style.display = "display";
            }
            else {
                this.animationGOFeature.style.display = "none";
            }
        }
        else{
            this.animationGOFeature.style.display = "display";
            if( this.replaceStyle===SuperMap.Plot.BlinkAnimationReplaceStyle.Replace_Color){
                this.animationGOFeature.style.strokeColor = this.endColor;
            }
        }
        return true;
    },


    CLASS_NAME: "SuperMap.Plot.GOAniamtionBlink"
});
