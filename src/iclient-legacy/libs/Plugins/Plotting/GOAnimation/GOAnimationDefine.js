
/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Plot.GOAniamtionType
 * 动态标绘中用到的动画类型。
 * ANIMATION_UNKNOW    : -1,//未知类型
 * ANIMATION_WAY       : 0, //路径动画
 * ANIMATION_BLINK     : 1, //闪烁动画
 * ANIMATION_ATTRIBUTE : 2, //属性动画
 * ANIMATION_SHOW      : 3, //显隐动画
 * ANIMATION_ROTATE    : 4, //旋转动画
 * ANIMATION_SCALE     : 5, //比例动画
 * ANIMATION_GROW      : 6  //生长动画
 */
SuperMap.Plot.GOAniamtionType = {
    ANIMATION_UNKNOW    : -1,//未知类型
    ANIMATION_WAY       : 0, //路径动画
    ANIMATION_BLINK     : 1, //闪烁动画
    ANIMATION_ATTRIBUTE : 2, //属性动画
    ANIMATION_SHOW      : 3, //显隐动画
    ANIMATION_ROTATE    : 4, //旋转动画
    ANIMATION_SCALE     : 5, //比例动画
    ANIMATION_GROW      : 6  //生长动画
}

/**
 * Class: SuperMap.Plot.BlinkAnimationBlinkStyle
 * 闪烁类型，按频率闪烁或按次数闪烁。
 * Blink_Frequency : 0,//频率闪烁。
 *Blink_Number    : 1 //次数闪烁。
 */
SuperMap.Plot.BlinkAnimationBlinkStyle = {

    Blink_Frequency : 0,//频率闪烁。
    Blink_Number    : 1 //次数闪烁。
}

/**
 * Class: SuperMap.Plot.BlinkAnimationReplaceStyle
 * 交替类型，闪烁交替是否替换颜色。
 *  Replace_NoColor : 0, //无颜色交替。
 *  Replace_Color   : 1  //有颜色交替。
 */
SuperMap.Plot.BlinkAnimationReplaceStyle = {

    Replace_NoColor : 0, //无颜色交替。
    Replace_Color   : 1  //有颜色交替。
}

/**
* Class: SuperMap.Plot.RotateDirection
* 交替类型，闪烁交替是否替换颜色。
 * ClockWise     : 0,//顺时针。
 * AntiClockWise : 1 //逆时针。
*/
SuperMap.Plot.RotateDirection = {

    ClockWise     : 0,//顺时针。
    AntiClockWise : 1 //逆时针。
};

/**
 * Class: SuperMap.Plot.WayPathType
 * 路径动画的路径类型。
 * POLYLINE : 0,//折线路。
 * CURVE    : 1 //曲线路径。
 */
SuperMap.Plot.WayPathType = {

    POLYLINE : 0,//折线路。
    CURVE    : 1 //曲线路径。
};

/**
 * Class: SuperMap.Plot.GOAnimationState
 * 动画播放状态。
 * UNKNOW  : 0, //待定状态。
 * PLAYING : 1, //正在播放。
 * PAUSE   : 2, //暂停播放。
 * STOP    : 3, //停止播放。
 * RESET   : 4  //复位。
 */
SuperMap.Plot.GOAnimationState = {

    UNKNOW  : 0, //待定状态。
    PLAYING : 1, //正在播放。
    PAUSE   : 2, //暂停播放。
    STOP    : 3, //停止播放。
    RESET   : 4  //复位。
};