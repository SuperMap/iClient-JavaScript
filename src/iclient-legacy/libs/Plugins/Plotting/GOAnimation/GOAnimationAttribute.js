/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionAttribute
 * 动态标绘属性动画类。
 */
SuperMap.Plot.GOAniamtionAttribute = SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * APIProperty: lineColorAnimation
     * {Boolean} 线色动画是否有效。
     */
    lineColorAnimation : false,

    /**
     * APIProperty: startLineColor
     * {String} 开始线色。
     */
    startLineColor : "#FF0000",

    /**
     * APIProperty: endLineColor
     * {String} 结束线色。
     */
    endLineColor : "#0000FF",

    /**
     * APIProperty: lineWidthAnimation
     * {Boolean} 线宽动画是否有效。
     */
    lineWidthAnimation : false,

    /**
     * APIProperty: startLineWidth
     * {Float} 开始线宽。
     */
    startLineWidth : 0.0,

    /**
     * APIProperty: endLineWidth
     * {Float} 结束线宽。
     */
    endLineWidth : 5.0,

    /**
     * APIProperty: surroundLineColorAnimation
     * {Boolean} 衬线线色动画是否有效。
     */
    surroundLineColorAnimation : false,

    /**
     * APIProperty: startSurroundLineColor
     * {String} 开始衬线线色。
     */
    startSurroundLineColor : "#ffff00",

    /**
     * APIProperty: endSurroundLineColor
     * {String} 结束衬线线色。
     */
    endSurroundLineColor : "#00ffff",

    /**
    * APIProperty: lineWidthAnimation
    * {Boolean} 衬线线宽动画是否有效。
    */
    surroundLineWidthAnimation : false,

    /**
     * APIProperty: startSurroundLineWidth
     * {Float} 开始衬线宽。
     */
    startSurroundLineWidth : 0.0,

    /**
     * APIProperty: endSurroundLineWidth
     * {Float} 结束衬线宽。
     */
    endSurroundLineWidth : 1.0,

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_ATTRIBUTE;
    },

    /**
     * Method: excute
     * 执行动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute: function(){
        //判断是否执行结束
        if(!this.canExcute()){
            return false;
        }

        var ratio = this.ratio;

        var isExcuteLineColorAnimation = this.excuteLineColorAnimation(ratio);

        var isExcuteLineWidthAnimation = this.excuteLineWidthAnimation(ratio);

        var isExcuteSLineColorAnimation = this.excuteSurroundLineColorAnimation(ratio);

        var isExcuteSLineWidthAnimation = this.excuteSurroundLineWidthAnimation(ratio);

        //必须有这句话
        this.animationGOFeature.geometry.calculateParts();

        return isExcuteLineColorAnimation || isExcuteLineWidthAnimation || isExcuteSLineColorAnimation || isExcuteSLineWidthAnimation;
    },

    /**
     * Method: excuteLineColorAnimation
     * 执行线色动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excuteLineColorAnimation: function(ratio){
        if(!this.lineColorAnimation){
            return false;
        }

        var startColor = SuperMap.Plot.PlottingUtil.colorStringToRGB(this.startLineColor);
        var endColor = SuperMap.Plot.PlottingUtil.colorStringToRGB(this.endLineColor);

        var r = parseInt(startColor.red   + (endColor.red   - startColor.red  ) * ratio);
        var g = parseInt(startColor.green + (endColor.green - startColor.green) * ratio);
        var b = parseInt(startColor.blue  + (endColor.blue  - startColor.blue ) * ratio);
        this.animationGOFeature.style.strokeColor = SuperMap.Plot.PlottingUtil.colorRGBToString({red:r,green:g,blue:b});

        return true;
    },

    /**
     * Method: excuteLineWidthAnimation
     * 执行线宽动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excuteLineWidthAnimation: function(ratio){
        if(!this.lineWidthAnimation){
            return false;
        }

        this.animationGOFeature.style.strokeWidth = this.startLineWidth + (this.endLineWidth - this.startLineWidth) * ratio;
        return true;
    },

    /**
     * Method: excuteSurroundLineColorAnimation
     * 执行衬线色动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excuteSurroundLineColorAnimation: function(ratio){
        if(!this.surroundLineColorAnimation){
            return false;
        }

        var startColor = SuperMap.Plot.PlottingUtil.colorStringToRGB(this.startSurroundLineColor);
        var endColor = SuperMap.Plot.PlottingUtil.colorStringToRGB(this.endSurroundLineColor);

        var r = parseInt(startColor.red   + (endColor.red   - startColor.red  ) * ratio);
        var g = parseInt(startColor.green + (endColor.green - startColor.green) * ratio);
        var b = parseInt(startColor.blue  + (endColor.blue  - startColor.blue ) * ratio);
        this.animationGOFeature.style.surroundLineColor = SuperMap.Plot.PlottingUtil.colorRGBToString({red:r,green:g,blue:b});

        return true;
    },

    /**
     * Method: excuteSurroundLineWidthAnimation
     * 执行衬线宽动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excuteSurroundLineWidthAnimation: function(ratio){
        if(!this.surroundLineWidthAnimation){
            return false;
        }

        this.animationGOFeature.style.surroundLineWidth = this.startSurroundLineWidth + (this.endSurroundLineWidth - this.startSurroundLineWidth) * ratio;
        return true;
    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionAttribute"
});
