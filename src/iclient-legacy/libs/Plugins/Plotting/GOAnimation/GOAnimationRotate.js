/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionRotate
 * 动态标绘旋转动画类。
 */
SuperMap.Plot.GOAniamtionRotate = SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * APIProperty: rotateDirection
     * {<SuperMap.Plot.RotateDirection>} 旋转方向，默认顺时针。
     */
    rotateDirection : SuperMap.Plot.RotateDirection.ClockWise,

    /**
     * APIProperty: startAngle
     * {Float} 开始角度。
     */
    startAngle : 0,

    /**
     * APIProperty: endAngle
     * {Float} 结束角度。
     */
    endAngle : 360,

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_ROTATE;
    },

    /**
     * Method: excute
     * 执行动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute: function(){
        //如果不是点标号不支持旋转动画
        if(!this.isDot(this.goFeature)){
            return false;
        }

        //判断是否执行结束
        if(!this.canExcute()){
            return false;
        }

        var ratio = this.ratio;

        //获取当前角度
        var currentAngle = this.getCurrentAngle(this.startAngle,this.endAngle,ratio);

        //设置动画对象角度
        this.animationGOFeature.geometry.setRotate(currentAngle);
        this.animationGOFeature.geometry.calculateParts();
        return true;
    },

    /**
     * Method: getCurrentAngle
     * 获取当前角度
     *
     * Parameters:
     * startAngle - {Float} 开始角度。
     * endAngle - {Float} 结束角度。
     * endAngle - {Float} 比例。
     *
     * Returns:
     * {Float} 比例
     */
    getCurrentAngle: function(startAngle, endAngle, ratio){
        var currentAngle = 0.0;
        var rotateAngle = endAngle - startAngle;
        var cycle = parseInt(Math.abs(rotateAngle/360));

        if(startAngle !== endAngle){
            //逆时针
            if(this.rotateDirection === SuperMap.Plot.RotateDirection.AntiClockWise){
                if(rotateAngle < 0.0){
                    rotateAngle = rotateAngle + 360.0*(2*cycle+1);
                }

                currentAngle = startAngle + rotateAngle * ratio;
            }
            else{//顺时针
                var angle = 0.0;
                if (rotateAngle < 0.0)
                {
                    angle = rotateAngle + (cycle + 1) * 360.0;
                }
                else
                {
                    angle = rotateAngle - cycle * 360.0;
                }

                if (angle === 0.0)
                {
                    rotateAngle = cycle * 360.0;
                }
                else
                {
                    rotateAngle = (360.0 - angle) + cycle * 360.0;
                }

                currentAngle = startAngle + (360.0 - rotateAngle * ratio);
            }
        }

        return currentAngle;
    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionRotate"
});
