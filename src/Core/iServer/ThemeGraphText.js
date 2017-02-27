/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: ThemeGraphText
 * 统计图文字标注风格类。
 * 通过该类可以设置统计图表中文字可见性以及标注风格。
 */
require('../base');
require('./ServerTextStyle');
ThemeGraphText = SuperMap.Class({

    /**
     * APIProperty: graphTextDisplayed
     * {Boolean} 是否显示统计图上的文字标注。默认为 false，即不显示。
     */
    graphTextDisplayed: false,

    /**
     * APIProperty: graphTextFormat
     * {<ThemeGraphTextFormat>} 统计专题图文本显示格式。
     * 文本显示格式包括百分数、真实数值、标题、标题+百分数、标题+真实数值。默认为 ThemeGraphTextFormat.CAPTION。
     */
    graphTextFormat: ThemeGraphTextFormat.CAPTION,

    /**
     * APIProperty: graphTextStyle
     * {<ServerTextStyle>}统计图上的文字标注风格。
     */
    graphTextStyle: null,
    /**
     * Constructor: ThemeGraphText
     * 统计图文字标注风格类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * graphTextDisplayed - {Boolean} 是否显示统计图上的文字标注。
     * graphTextFormat - {<ThemeGraphTextFormat>} 统计专题图文本显示格式。
     * graphTextStyle - {<ServerTextStyle>} 统计图上的文字标注风格。
     */
    initialize: function (options) {
        var me = this;
        me.graphTextStyle = new ServerTextStyle();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.graphTextDisplayed = null;
        me.graphTextFormat = null;
        if (me.graphTextStyle) {
            me.graphTextStyle.destroy();
            me.graphTextStyle = null;
        }
    },

    CLASS_NAME: "ThemeGraphText"
});
ThemeGraphText.fromObj = function (obj) {
    var res = new ThemeGraphText();
    SuperMap.Util.copy(res, obj);
    res.graphTextStyle = ServerTextStyle.fromObj(obj.graphTextStyle);
    return res;

};
module.exports = function (options) {
    return new ThemeGraphText(options);
};
