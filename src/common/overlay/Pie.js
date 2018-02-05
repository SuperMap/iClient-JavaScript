import {SuperMap} from '../SuperMap';
import {ShapeFactory} from './feature/ShapeFactory';
import {Sector} from './feature/Sector';
import {Graph} from './Graph';

/**
 * @class SuperMap.Feature.Theme.Pie
 * @classdesc 饼图。
 * @category Visualization Theme
 * @description 图表 Pie 配置对象 chartsSetting（<SuperMap.Layer.Graph::chartsSetting>） 可设属性如下：</br>
 * width - {number} 专题要素（图表）宽度，必设参数。</br>
 * height - {number} 专题要素（图表）高度，必设参数。</br>
 * codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
 * XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
 * YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
 * dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，
 * 它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。默认值为：[0, 0, 0, 0]。</br>
 * decimalNumber - {Array<number>}数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
 * useBackground - {boolean} 是否使用图表背景框，默认不使用。</br>
 * backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <SuperMap.Feature.ShapeParameters.Rectangle::style>。</br>
 * backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。</br>
 * sectorStyle - {Object} 饼图中扇形的基础 style，此参数控制饼图扇形基础样式，优先级低于 sectorStyleByFields 和 sectorStyleByCodomain。
 * 此样式对象对象可设属性： <SuperMap.Feature.ShapeParameters.Sector::style> 。</br>
 * sectorStyleByFields - {Array<Object>} 按专题字段 themeFields（<SuperMap.Layer.Graph::themeFields>）为饼图扇形赋 style，此参数按字段控制饼图扇形样式，优先级低于 sectorStyleByCodomain，高于 sectorStyle。此数组中的元素是样式对象，其可设属性： <SuperMap.Feature.ShapeParameters.Sector::style> 。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<SuperMap.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],
 * sectorStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的饼图扇形使用 style1，字段 POP_1995 对应的饼图扇形使用 style2 ，字段 POP_1999 对应的饼图扇形使用 style3。</br>
 * sectorStyleByCodomain - {Array<Object>} 按饼图扇形代表的数据值所在值域范围控制饼图扇形样式，优先级高于 sectorStyle 和 sectorStyleByFields。
 * @param data - {SuperMap.Feature.Vector}  用户数据，必设参数。
 * @param layer - {SuperMap.Layer.Graph} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {SuperMap.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 *
 * @example
 * // sectorStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <SuperMap.Feature.ShapeParameters.Sector::style> 。
 * // sectorStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 * sectorHoverStyle - {Object} 饼图扇形 hover 状态时的样式，sectorHoverAble 为 true 时有效。</br>
 * sectorHoverAble - {Object} 是否允许饼图扇形使用 hover 状态，默认允许。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽饼图扇形对专题图层事件的响应。</br>
 * sectorClickAble - {Object} 是否允许饼图扇形被点击，默认允许。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽饼图扇形对专题图层事件的响应。
 * @extends {SuperMap.Feature.Theme.Graph}
 */
export class Pie extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Pie";
    }

    /**
     * @function SuperMap.Feature.Theme.Pie.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.Feature.Theme.Pie.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 一个默认 style 组
        var defaultStyleGroup = [
            {fillColor: "#ff9277"}, {fillColor: "#dddd00"}, {fillColor: "#ffc877"}, {fillColor: "#bbe3ff"}, {fillColor: "#d5ffbb"},
            {fillColor: "#bbbbff"}, {fillColor: "#ddb000"}, {fillColor: "#b0dd00"}, {fillColor: "#e2bbff"}, {fillColor: "#ffbbe3"},
            {fillColor: "#ff7777"}, {fillColor: "#ff9900"}, {fillColor: "#83dd00"}, {fillColor: "#77e3ff"}, {fillColor: "#778fff"},
            {fillColor: "#c877ff"}, {fillColor: "#ff77ab"}, {fillColor: "#ff6600"}, {fillColor: "#aa8800"}, {fillColor: "#77c7ff"},
            {fillColor: "#ad77ff"}, {fillColor: "#ff77ff"}, {fillColor: "#dd0083"}, {fillColor: "#777700"}, {fillColor: "#00aa00"},
            {fillColor: "#0088aa"}, {fillColor: "#8400dd"}, {fillColor: "#aa0088"}, {fillColor: "#dd0000"}, {fillColor: "#772e00"}
        ];

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 背景框，默认不启用
        if (sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 数据值数组
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 值域范围
        var codomain = this.DVBCodomain;
        // 值域范围检测
        for (let i = 0; i < fv.length; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 值的绝对值总和
        var valueSum = 0;
        for (let i = 0; i < fv.length; i++) {
            valueSum += Math.abs(fv[i]);
        }

        // 重要步骤：定义图表 Pie 数据视图框中单位值的含义，单位值：每度代表的数值
        this.DVBUnitValue = 360 / valueSum;
        var uv = this.DVBUnitValue;

        var dvbCenter = this.DVBCenterPoint;        // 数据视图框中心作为扇心

        var startAngle = 0;         // 扇形起始边角度
        var endAngle = 0;          // 扇形终止边角度
        var startAngleTmp = startAngle;           // 扇形临时起始边角度
        // 扇形（自适应）半径
        var r = this.DVBHeight < this.DVBWidth ? this.DVBHeight / 2 : this.DVBWidth / 2;

        for (var i = 0; i < fv.length; i++) {
            var fvi = Math.abs(fv[i]);
            //计算终止角
            if (i === 0) {
                endAngle = startAngle + fvi * uv;
            } else if (i === fvi.length - 1) {
                endAngle = startAngleTmp;
            } else {
                endAngle = startAngle + fvi * uv;
            }
            //矫正误差计算
            if ((endAngle - startAngle) >= 360) {
                endAngle = 359.9999999;
            }

            // 扇形参数对象
            var sectorSP = new Sector(dvbCenter[0], dvbCenter[1], r, startAngle, endAngle);
            // 扇形样式
            if (typeof(sets.sectorStyleByFields) === "undefined") {
                // 使用默认 style 组
                var colorIndex = i % defaultStyleGroup.length;
                sectorSP.style = ShapeFactory.ShapeStyleTool(null, sets.sectorStyle, defaultStyleGroup, null, colorIndex);
            } else {
                sectorSP.style = ShapeFactory.ShapeStyleTool(null, sets.sectorStyle, sets.sectorStyleByFields, sets.sectorStyleByCodomain, i, fv[i]);
            }

            // 扇形 hover 样式
            sectorSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.sectorHoverStyle);
            // 扇形 hover 与 click 设置
            if (typeof(sets.sectorHoverAble) !== "undefined") {
                sectorSP.hoverable = sets.sectorHoverAble;
            }
            if (typeof(sets.sectorClickAble) !== "undefined") {
                sectorSP.clickable = sets.sectorClickAble;
            }
            // 图形携带的数据信息
            sectorSP.refDataID = this.data.id;
            sectorSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建扇形并把此扇形添加到图表图形数组
            this.shapes.push(this.shapeFactory.createShape(sectorSP));

            // 把上一次的结束角度作为下一次的起始角度
            startAngle = endAngle;
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

}

SuperMap.Feature.Theme.Pie = Pie;