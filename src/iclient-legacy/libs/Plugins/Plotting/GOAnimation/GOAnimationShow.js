/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionShow
 * 动态标绘显隐动画类。
 */
SuperMap.Plot.GOAniamtionShow = SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * APIProperty: startScale
     * {Boolean} 是否有显隐特效，默认无特效。
     */
    showEffect : false,

    /**
     * APIProperty: startScale
     * {Boolean} 最终显示状态，默认不显示。
     */
    finalDisplay : false,

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW;
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

        if(this.showEffect){//有显隐特效
            this.excuteHaveEffect(ratio);
        }
        else{//无显隐特效
            this.excuteNoEffect(ratio);
        }

        //必须有这句话
        this.animationGOFeature.geometry.calculateParts();
        return true;
    },

    /**
     * Method: excuteNoEffect
     * 执行动画,没有显隐特效时
     */
    excuteNoEffect: function(ratio){
        var  display = "display";
        var unDisplay = "none";

        if(this.finalDisplay){//显示
            if (1.0 - ratio < 0.01)
            {
                this.animationGOFeature.style.display = display;
            }
            else
            {
                this.animationGOFeature.style.display = unDisplay;
            }
        }
        else{//不显示
            if (1.0 - ratio < 0.01)
            {
                this.animationGOFeature.style.display = unDisplay;
            }
            else
            {
                this.animationGOFeature.style.display = display;
            }
        }
    },

    /**
     * Method: excuteHaveEffect
     * 执行动画,有显隐特效时
     */
    excuteHaveEffect: function(ratio){
        if(!this.finalDisplay){
            ratio = 1.0 - ratio;
        }

        var opacity = parseFloat(ratio) < 0 ? 0 : parseFloat(ratio);
        opacity = parseFloat(ratio) > 1 ? 1 : parseFloat(ratio);
        this.animationGOFeature.style.strokeOpacity = opacity;
        this.animationGOFeature.style.fontOpacity = opacity;
        //控制衬线透明度
        this.animationGOFeature.style.surroundLineColorOpacity = this.goFeature.style.surroundLineColorOpacity*ratio;

        if(this.animationGOFeature.style.fill){
            //控制填充透明度
            this.animationGOFeature.style.fillOpacity = this.goFeature.style.fillOpacity*ratio;
            console.log(this.animationGOFeature.style.fillOpacity);
            //控制填充背景透明度
            this.animationGOFeature.style.fillBackOpacity = this.goFeature.style.fillBackOpacity*ratio;
        }
    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionShow"
});
