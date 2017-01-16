/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.ThemeLabelAlongLine
 * 标签沿线标注样式类。
 * 通过该类可以设置是否标签沿线标注以及沿线标注的多种样式。沿线标注属性只适用于线数据集专题图。
 */
SuperMap.REST.ThemeLabelAlongLine = SuperMap.Class({
    
    /** 
     * APIProperty: isAlongLine
     * {Boolean} 是否沿线显示文本。true 表示沿线显示文本，false 表示正常显示文本，默认为 true。  
     */
    isAlongLine: true,
    
    /** 
     * APIProperty: alongLineDirection
     * {<SuperMap.REST.AlongLineDirection>} 标签沿线标注方向。默认为 SuperMap.REST.AlongLineDirection.LB_TO_RT（从上到下，从左到右放置）。  
     */
    alongLineDirection: SuperMap.REST.AlongLineDirection.LB_TO_RT,

    /** 
     * APIProperty: angleFixed
     * {Boonlean} 当沿线显示文本时，是否将文本角度固定。true 表示按固定文本角度显示文本，false 表示按照沿线角度显示文本。
     * 默认值为 false。如果固定角度，则所有标签均按所设置的文本风格中字体的旋转角度来显示，不考虑沿线标注的方向；
     * 如果不固定角度，在显示标签时会同时考虑字体的旋转角度和沿线标注的方向。
     */
    angleFixed: false,
    
    /** 
     * APIProperty: repeatedLabelAvoided
     * {Boonlean} 沿线循环标注时是否避免标签重复标注。
     */
    repeatedLabelAvoided: false,
    
    /** 
     * APIProperty: repeatIntervalFixed
     * {Boonlean} 循环标注间隔是否固定。true 表示使用固定循环标注间隔，即使用逻辑坐标来显示循环标注间隔；
     * false 表示循环标注间隔随地图的缩放而变化，即使用地理坐标来显示循环标注间隔。默认值为 false。
     */
    repeatIntervalFixed: false,
    
    /** 
     * APIProperty: labelRepeatInterval
     * {Number} 沿线且循环标注时循环标注的间隔。长度的单位与地图的地理单位一致。只有设定 RepeatedLabelAvoided 为 true 
     * 的时候，labelRepeatInterval 属性才有效。默认为0地图单位。
     */
    labelRepeatInterval: 0,

    /**
     * Constructor: SuperMap.REST.ThemeLabelAlongLine 
     * 标签沿线标注样式类构造函数，用于创建 ThemeLabelAlongLine 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * isAlongLine - {Boolean} 是否沿线显示文本。
     * alongLineDirection - {<SuperMap.REST.AlongLineDirection>} 标签沿线标注方向。
     * angleFixed - {Boonlean} 当沿线显示文本时，是否将文本角度固定。
     * repeatedLabelAvoided - {Boonlean} 沿线循环标注时是否避免标签重复标注。
     * repeatIntervalFixed - {Boonlean} 循环标注间隔是否固定。
     * labelRepeatInterval - {Number} 沿线且循环标注时循环标注的间隔。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.isAlongLine = null;
        me.alongLineDirection = null;
        me.angleFixed = null;
        me.repeatedLabelAvoided = null;
        me.repeatIntervalFixed = null;
        me.labelRepeatInterval = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeLabelAlongLine"
});
SuperMap.REST.ThemeLabelAlongLine.fromObj = function(obj) {
    if(!obj) return;
    var t = new SuperMap.REST.ThemeLabelAlongLine();
    SuperMap.Util.copy(t, obj);
    return t;
}
