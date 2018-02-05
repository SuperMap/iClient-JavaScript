import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ThemeFlow} from './ThemeFlow';
import {ThemeOffset} from './ThemeOffset';
import {ThemeGraphAxes} from './ThemeGraphAxes';
import {ThemeGraphSize} from './ThemeGraphSize';
import {ThemeGraphText} from './ThemeGraphText';
import {ThemeGraphItem} from './ThemeGraphItem';
import {ThemeGraphType, GraduatedMode, GraphAxesTextDisplayMode} from '../REST';


/**
 * @class SuperMap.ThemeGraph
 * @category  iServer Map Theme
 * @classdesc 统计专题图类。
 * @extends SuperMap.Theme
 * @param options - {Object} 参数。<br>
 *        barWidth - {number}柱状专题图中每一个柱的宽度。<br>
 *        flow - {SuperMap.ThemeFlow} 统计专题图流动显示与牵引线设置。<br>
 *        graduatedMode - {{@link SuperMap.GraduatedMode}} 统计图中地理要素的值与图表尺寸间的映射关系。<br>
 *        graphAxes - {{@link SuperMap.ThemeGraphAxes}} 统计图中坐标轴样式相关信息。<br>
 *        graphSize - {{@link SuperMap.ThemeGraphSize}} 统计符号的最大最小尺寸。<br>
 *        graphSizeFixed - {boolean} 缩放地图时统计图符号是否固定大小。<br>
 *        graphText - {{@link SuperMap.ThemeGraphText}} 统计图上的文字是否可以见以及文字标注风格。<br>
 *        graphAxesTextDisplayMode -{{@link SuperMap.GraphAxesTextDisplayMode}} 统计专题图坐标轴文本显示模式 。默认值 SuperMap.GraphAxesTextDisplayMode.NONE。
 *        graphType - {{@link SuperMap.ThemeGraphType}} 统计专题图类型。<br>
 *        items - {Array<{@link SuperMap.ThemeGraphItem}>} 统计专题图子项集合。<br>
 *        memoryKeys - {Array<integer>} 以内存数组方式制作专题图时的键数组。<br>
 *        negativeDisplayed - {boolean} 专题图中是否显示属性为负值的数据。<br>
 *        offset - {{@link SuperMap.ThemeOffset}} 统计图相对于要素内点的偏移量。<br>
 *        overlapAvoided - {boolean} 统计图是否采用避让方式显示。<br>
 *        roseAngle - {number}统计图中玫瑰图或三维玫瑰图用于等分的角度。<br>
 *        startAngle - {number}饼状统计图扇形的起始角度。
 */
export class ThemeGraph extends Theme {

    constructor(options) {
        super("GRAPH", options);
        /**
         * @member SuperMap.ThemeGraph.prototype.barWidth -{number}
         * @description 柱状专题图中每一个柱的宽度。使用地图坐标单位，默认值为0。<br>
         *              只有选择的统计图类型为柱状图（柱状图、三维柱状图、堆叠柱状图、三维堆叠柱状图）时，此项才可设置。
         */
        this.barWidth = 0;

        /**
         * @member SuperMap.ThemeGraph.prototype.flow -{SuperMap.ThemeFlow}
         * @description 统计专题图流动显示与牵引线设置。
         *              通过该字段可以设置统计符号是否流动显示和牵引线风格。
         */
        this.flow = new ThemeFlow();

        /**
         * @member SuperMap.ThemeGraph.prototype.graduatedMode -{SuperMap.GraduatedMode}
         * @description 统计图中地理要素的值与图表尺寸间的映射关系（常数、对数、平方根），即分级方式。
         *              默认值为 SuperMap.GraduatedMode.CONSTANT。
         *              分级主要是为了减少制作统计专题图中数据大小之间的差异，使得统计图的视觉效果比较好，同时不同类别之间的比较也还是有意义的。
         *              提供三种分级模式：常数、对数和平方根，对于有值为负数的字段，不可以采用对数和平方根的分级方式。不同的等级方式用于确定符号大小的数值是不相同的。
         */
        this.graduatedMode = GraduatedMode.CONSTANT;

        /**
         * @member SuperMap.ThemeGraph.prototype.graphAxes -{SuperMap.ThemeGraphAxes}
         * @description 用于设置统计图中坐标轴样式相关信息，如坐标轴颜色、是否显示、坐标文本样式等。
         */
        this.graphAxes = new ThemeGraphAxes();

        /**
         * @member SuperMap.ThemeGraph.prototype.graphSize -{SuperMap.ThemeGraphSize}
         * @description 用于设置统计符号的最大最小尺寸。
         */
        this.graphSize = new ThemeGraphSize();

        /**
         * @member SuperMap.ThemeGraph.prototype.graphSizeFixed -{boolean}
         * @description 缩放地图时统计图符号是否固定大小。默认值为 false，即统计图符号将随地图缩放。
         */
        this.graphSizeFixed = false;

        /**
         * @member SuperMap.ThemeGraph.prototype.graphText -{SuperMap.ThemeGraphText}
         * @description 统计图上的文字是否可以见以及文字标注风格。
         */
        this.graphText =  new ThemeGraphText();

        /**
         * @member SuperMap.ThemeGraph.prototype.graphType -{SuperMap.ThemeGraphType}
         * @description 统计专题图类型。SuperMap 提供了多种类型的统计图，<br>
         *              分别为面积图、阶梯图、折线图、点状图、柱状图、三维柱状图、饼图、三维饼图、玫瑰图、三维玫瑰图、堆叠柱状图、三维堆叠柱状图、环状图。默认为面积图。
         */
        this.graphType = ThemeGraphType.AREA;

        /**
         * @member SuperMap.ThemeGraph.prototype.graphAxesTextDisplayMode -{SuperMap.GraphAxesTextDisplayMode}
         * @description 统计专题图坐标轴文本显示模式 。默认值 SuperMap.GraphAxesTextDisplayMode.NONE。
         */
        this.graphAxesTextDisplayMode = GraphAxesTextDisplayMode.NONE;

        /**
         * @member SuperMap.ThemeGraph.prototype.items -{Array<SuperMap.ThemeGraphItem>}
         * @description 统计专题图子项集合。必设字段。
         *              统计专题图可以基于多个变量，反映多种属性，即可以将多个专题变量的值绘制在一个统计图上。每一个专题变量对应的统计图即为一个专题图子项。
         *              对于每个专题图子项可以为其设置标题、风格，甚至可以将该子项再制作成范围分段专题图。
         */
        this.items = null;

        /**
         * @member SuperMap.ThemeGraph.prototype.memoryKeys -{Array<integer>}
         * @description 以内存数组方式制作专题图时的键数组。<br>
         *              键数组内的数值代表 SmID 值，它与 SuperMap.ThemeGraphItem 类中的值数组（SuperMap.ThemeGraphItem.memoryDoubleValues）要关联起来应用。<br>
         *              键数组中数值的个数必须要与值数组的数值个数一致。值数组中的值将代替原来的专题值来制作统计专题图。<br>
         *              目前所有的专题图都支持以内存数组的方式制作专题图，但统计专题图与其他专题图指定内存数组的方式不同，<br>
         *              统计专题图使用 memoryKeys 指定内存数组，而其他专题图则使用 memoryData 来指定内存数组。
         * @example
         *  memoryKeys的使用方法如：
         *   function addThemeGraph() {
     *      removeTheme();
     *        //创建统计专题图对象，SuperMap.ThemeGraph 必设 items。
     *       //专题图参数 ThemeParameters 必设 theme（即以设置好的分段专题图对象）、dataSourceName 和 datasetName
     *      var style1 = new SuperMap.ServerStyle({
     *                   fillForeColor: new SuperMap.ServerColor(92,73,234),
     *                   lineWidth: 0.1
     *               }),
     *               style2 = new SuperMap.ServerStyle({
     *                   fillForeColor: new SuperMap.ServerColor(211,111,240),
     *                   lineWidth: 0.1
     *               }),
     *               item1 = new SuperMap.ThemeGraphItem({
     *                   memoryDoubleValues:[1.18,0.95,0.37,1.31,0.8,1.5],
     *                  caption: "1992-1995人口增长率",
     *                  graphExpression: "Pop_Rate95",
     *                   uniformStyle: style1
     *               }),
     *               item2 = new SuperMap.ThemeGraphItem({
     *               //以内存数组方式制作专题图时的值数组
     *                   memoryDoubleValues:[2.71,0,0.74,3.1,2.2,3.5],
     *                   caption: "1995-1999人口增长率",  //专题图子项的名称
     *                   graphExpression: "Pop_Rate99",  //统计专题图的专题变量
     *                   uniformStyle: style2      //统计专题图子项的显示风格
     *               }),
     *               themeGraph  = new SuperMap.ThemeGraph({
     *               //以内存数组方式制作专题图时的键数组，键数组内的数值代表 SmID 值
     *                    memoryKeys:[1,2,4,8,10,12],
     *                   items: new Array(item1,item2),
     *                   barWidth: 0.03,
     *                    //统计图中地理要素的值与图表尺寸间的映射关系为平方根
     *                   graduatedMode: SuperMap.GraduatedMode.SQUAREROOT,
     *                   //graphAxes用于设置统计图中坐标轴样式相关信息
     *                   graphAxes: new SuperMap.ThemeGraphAxes({
     *                       axesDisplayed: true
     *                   }),
     *                   graphSize: new SuperMap.ThemeGraphSize({
     *                       maxGraphSize: 1,
     *                       minGraphSize: 0.35
     *                   }),
     *                   //统计图上的文字是否可以见以及文字标注风格
     *                   graphText: new SuperMap.ThemeGraphText({
     *                       graphTextDisplayed: true,
     *                       graphTextFormat: SuperMap.ThemeGraphTextFormat.VALUE,
     *                       graphTextStyle: new SuperMap.ServerTextStyle({
     *                           sizeFixed: true,
     *                           fontHeight: 9,
     *                           fontWidth: 5
     *                       })
     *                   }),
     *                   //统计专题图类型为三维柱状图
     *                   graphType: SuperMap.ThemeGraphType.BAR3D
     *               }),
     * //专题图参数对象
     *               themeParameters = new SuperMap.ThemeParameters({
     *                   themes: [themeGraph],
     *                   dataSourceNames: ["Jingjin"],
     *                   datasetNames: ["BaseMap_R"]
     *               }),
     *    //与服务端交互
     *               themeService=new SuperMap.ThemeService(url, {
     *                   eventListeners: {
     *                       "processCompleted": ThemeCompleted,
     *                        "processFailed": themeFailed
     *                  }
     *              });
     *       themeService.processAsync(themeParameters);
     *   }
         */
        this.memoryKeys = null;

        /**
         * @member SuperMap.ThemeGraph.prototype.negativeDisplayed -{boolean}
         * @description 专题图中是否显示属性为负值的数据。true 表示显示；默认为 false 即不显示。
         */
        this.negativeDisplayed = false;

        /**
         * @member SuperMap.ThemeGraph.prototype.offset -{SuperMap.ThemeOffset}
         * @description 用于设置统计图相对于要素内点的偏移量。
         */
        this.offset = new ThemeOffset();

        /**
         * @member SuperMap.ThemeGraph.prototype.overlapAvoided -{boolean}
         * @description 统计图是否采用避让方式显示。<br>
         *              1.对数据集制作统计专题图:当统计图采用避让方式显示时，如果 overlapAvoided 为 true，则在统计图重叠度很大的情况下，
         *              会出现无法完全避免统计图重叠的现象；如果 overlapAvoided 为 false，会过滤掉一些统计图，从而保证所有的统计图均不重叠。<br>
         *              2.对数据集同时制作统计专题图和标签专题图：当统计图不显示子项文本时，标签专题图的标签即使和统计图重叠，两者也都可正常显示；
         *              当统计图显示子项文本时，如果统计图中的子项文本和标签专题图中的标签不重叠，则两者均正常显示；如果重叠，则会过滤掉统计图的子项文本，只显示标签。
         */
        this.overlapAvoided = true;

        /**
         * @member SuperMap.ThemeGraph.prototype.roseAngle -{number}
         * @description 统计图中玫瑰图或三维玫瑰图用于等分的角度，默认为0度，精确到0.1度。在角度为0或者大于360度的情况下均使用360度来等分制作统计图的字段数。
         */
        this.roseAngle = 0;

        /**
         * @member SuperMap.ThemeGraph.prototype.startAngle -{number}
         * @description 饼状统计图扇形的起始角度。默认为0度，精确到0.1度，以水平方向为正向。只有选择的统计图类型为饼状图（饼图、三维饼图、玫瑰图、三维玫瑰图）时，此项才可设置。
         */
        this.startAngle = 0;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraph";
    }


    /**
     * @function SuperMap.ThemeGraph.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.barWidth = null;
        if (me.flow) {
            me.flow.destroy();
            me.flow = null;
        }
        me.graduatedMode = null;
        if (me.graphAxes) {
            me.graphAxes.destroy();
            me.graphAxes = null;
        }
        if (me.graphSize) {
            me.graphSize.destroy();
            me.graphSize = null;
        }
        me.graphSizeFixed = null;
        if (me.graphText) {
            me.graphText.destroy();
            me.graphText = null;
        }
        me.graphType = null;
        if (me.items) {
            for (var i = 0, items = me.items, len = items.length; i < len; i++) {
                items[i].destroy();
            }
            me.items = null;
        }
        me.memoryKeys = null;
        me.negativeDisplayed = null;
        if (me.offset) {
            me.offset.destroy();
            me.offset = null;
        }
        me.overlapAvoided = null;
        me.roseAngle = null;
        me.startAngle = null;
        me.graphAxesTextDisplayMode = null;
    }

    /**
     * @function SuperMap.ThemeGraph.prototype.toJSON
     * @description 将SuperMap.ThemeGraph对象转化为json字符串。
     * @return {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        return Util.toJSON(this.toServerJSONObject());
    }

    /**
     * @function SuperMap.ThemeGraph.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj.type = this.type;
        if (this.graphText) {
            obj.graphTextDisplayed = this.graphText.graphTextDisplayed;
            obj.graphTextFormat = this.graphText.graphTextFormat;
            obj.graphTextStyle = this.graphText.graphTextStyle;
        }
        if (this.flow) {
            obj.flowEnabled = this.flow.flowEnabled;
            obj.leaderLineDisplayed = this.flow.leaderLineDisplayed;
            obj.leaderLineStyle = this.flow.leaderLineStyle;
        }
        if (this.graphAxes) {
            obj.axesColor = this.graphAxes.axesColor;
            obj.axesDisplayed = this.graphAxes.axesDisplayed;
            obj.axesGridDisplayed = this.graphAxes.axesGridDisplayed;
            obj.axesTextDisplayed = this.graphAxes.axesTextDisplayed;
            obj.axesTextStyle = this.graphAxes.axesTextStyle;
        }
        if (this.graphSize) {
            obj.maxGraphSize = this.graphSize.maxGraphSize;
            obj.minGraphSize = this.graphSize.minGraphSize;
        }
        if (this.offset) {
            obj.offsetFixed = this.offset.offsetFixed;
            obj.offsetX = this.offset.offsetX;
            obj.offsetY = this.offset.offsetY;
        }
        obj.barWidth = this.barWidth;
        obj.graduatedMode = this.graduatedMode;
        obj.graphSizeFixed = this.graphSizeFixed;
        obj.graphType = this.graphType;
        obj.graphAxesTextDisplayMode = this.graphAxesTextDisplayMode;
        obj.items = this.items;
        obj.memoryKeys = this.memoryKeys;
        obj.negativeDisplayed = this.negativeDisplayed;
        obj.overlapAvoided = this.overlapAvoided;
        obj.roseAngle = this.roseAngle;
        obj.startAngle = this.startAngle;
        return obj;
    }

    /**
     * @function SuperMap.ThemeGraph.fromObj
     * @description 从传入对象获取统计专题图类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGraph} ThemeGraph对象
     */
    static fromObj(obj) {
        var res = new ThemeGraph();
        var itemsG = obj.items;
        var len = itemsG ? itemsG.length : 0;
        Util.copy(res, obj);
        res.items = [];
        res.flow = ThemeFlow.fromObj(obj);
        res.graphAxes = ThemeGraphAxes.fromObj(obj);
        res.graphSize = ThemeGraphSize.fromObj(obj);
        res.graphText = ThemeGraphText.fromObj(obj);
        res.offset = ThemeOffset.fromObj(obj);
        for (var i = 0; i < len; i++) {
            res.items.push(ThemeGraphItem.fromObj(itemsG[i]));
        }
        return res;
    }

}

SuperMap.ThemeGraph = ThemeGraph;