/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: ThemeParameters
 * 专题图参数类
 * 该类存储了制作专题所需的参数，包括数据源、数据集名称和专题图对象。
 */
require('../base');
require('./JoinItem');
require('./ThemeDotDensity');
require('./ThemeGraduatedSymbol');
require('./ThemeGraph');
require('./ThemeLabel');
require('./ThemeRange');
require('./ThemeUnique');
require('./ThemeGridRange');
require('./ThemeGridUnique');

ThemeParameters = SuperMap.Class({

    /**
     * APIProperty: datasetNames
     * {Array(String)} 要制作专题图的数据集数组，必设。
     */
    datasetNames: null,

    /**
     * APIProperty: dataSourceNames
     * {Array(String)} 要制作专题图的数据集所在的数据源数组，必设。
     */
    dataSourceNames: null,

    /**
     * APIProperty: joinItems
     * {Array(<JoinItem>)} 设置与外部表的连接信息 JoinItem 数组。
     * 使用此属性可以制作与外部表连接的专题图。
     */
    joinItems: null,

    /**
     * APIProperty: themes
     * {Array(<Theme>)} 专题图对象列表。
     * 该参数为实例化的各类专题图对象的集合。
     */
    themes: null,

    /**
     * APIProperty: displayFilters
     * {Array(String)} 专题图属性过滤条件。
     */
    displayFilters: null,

    /**
     * APIProperty: displayOrderBy
     * {Array(String)} 专题图对象生成符号叠加次序排序字段
     */
    displayOrderBys: null,

    /**
     * APIProperty: fieldValuesDisplayFilter
     * {Object} 图层要素的显示和隐藏的过滤属性，其带有三个属性，分别是:values、fieldName、fieldValuesDisplayMode,他们的作用如下：
     * values：{Array<Number>} - 就是要过滤的值；
     * fieldName：{String} - 要过滤的字段名称 只支持数字类型的字段；
     * fieldValuesDisplayMode：{String} 目前有两个DISPLAY/DISABLE。当为DISPLAY时，表示只显示以上设置的相应属性值的要素，否则表示不显示以上设置的相应属性值的要素
     * */
    fieldValuesDisplayFilter: null,

    /**
     * Constructor: ThemeParameters
     * 专题图参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * datasetNames - {Array(String)} 要制作专题图的数据集数组。
     * dataSourceNames - {Array(String)} 要制作专题图的数据集所在的数据源数组。
     * joinItems - {Array(<JoinItem>)} 专题图外部表的连接信息 JoinItem 数组。
     * themes - {Array(<Theme>)} 专题图对象列表。
     */
    initialize: function (options) {
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
        me.datasetNames = null;
        me.dataSourceNames = null;
        if (me.joinItems) {
            for (var i = 0, joinItems = me.joinItems, len = joinItems.length; i < len; i++) {
                joinItems[i].destroy();
            }
            me.joinItems = null;
        }
        if (me.themes) {
            for (var i = 0, themes = me.themes, len = themes.length; i < len; i++) {
                themes[i].destroy();
            }
            me.themes = null;
        }
    },

    CLASS_NAME: "ThemeParameters"
});

module.exports = function (options) {
    return new ThemeParameters(options);
};