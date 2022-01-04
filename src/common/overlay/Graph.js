/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Bounds} from '../commontypes/Bounds';
import {Theme} from './feature/Theme';
import {ShapeFactory} from './feature/ShapeFactory';

/**
 * @class FeatureThemeGraph
 * @aliasclass Feature.Theme.Graph
 * @deprecatedclass SuperMap.Feature.Theme.Graph
 * @classdesc 统计专题要素基类。
 * @category Visualization Theme
 * @description 此类定义了统计专题要素基础模型，具体的图表模型通过继承此类，在子类中实现 assembleShapes 方法。
 *              统计专题要素模型采用了可视化图形大小自适应策略，用较少的参数控制着图表诸多图形，图表配置对象 <FeatureThemeGraph.setting> 的基础属性只有 7 个，
 *              它们控制着图表结构、值域范围、数据小数位等基础图表形态。构成图表的图形必须在图表结构里自适应大小。
 *              此类不可实例化，此类的可实例化子类必须实现 assembleShapes() 方法。
 * @extends FeatureTheme
 * @param {FeatureVector} data - 用户数据。
 * @param {SuperMap.Layer.Theme} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {Object} setting - 图表配置对象。
 * @param {LonLat} [lonlat] - 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @usage
 */
export class Graph extends Theme {


    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);

        /**
         * @member {FeatureShapeFactory} FeatureThemeGraph.prototype.shapeFactory
         * @description 内置的图形工厂对象，调用其 createShape 方法创建图形。
         */
        this.shapeFactory = new ShapeFactory();

        /**
         * @member {Object} FeatureThemeGraph.prototype.shapeParameters
         * @description 当前图形参数对象，<ShapeParameters> 的子类对象。
         */
        this.shapeParameters = null;

        /**
         * @member {boolean} [FeatureThemeGraph.prototype.RelativeCoordinate]
         * @description 图形是否已经计算了相对坐标。
         */
        this.RelativeCoordinate = false;

        /**
         * @member {Object} FeatureThemeGraph.prototype.setting
         * @description 图表配置对象，该对象控制着图表的可视化显示。
         * @param {number} width - 专题要素（图表）宽度。
         * @param {number} height - 专题要素（图表）高度。
         * @param {Array.<number>} codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
         * @param {number} [XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
         * @param {number} [YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
         * @param {Array.<number>} [dataViewBoxParameter] - 数据视图框 dataViewBox 参数，它是指图表框 chartBox
         *                                                    （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
         * @param {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。
         *                                       如果不设置此参数，在取数据值时不对数据做小数位处理。
         *
         */
        this.setting = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.origonPoint
         * @description 专题要素（图表）原点，图表左上角点像素坐标，是长度为 2 的一维数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.origonPoint = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.chartBox
         * @description 专题要素（图表）区域，即图表框，长度为 4 的一维数组，数组的 4 个元素依次表示图表框左端 x 坐标值、
         *              下端 y坐标值、 右端 x坐标值、 上端 y 坐标值；[left, bottom, right, top]。
         */
        this.chartBox = null;

        /**
         * @readonly
         * @member {Bounds} FeatureThemeGraph.prototype.chartBounds
         * @description 图表 Bounds 随着 lonlat、XOffset、YOffset 更新，注意 chartBounds 是图表像素范围，不是地理范围。
         */
        this.chartBounds = null;

        /**
         * @readonly
         * @member {number} FeatureThemeGraph.prototype.width
         * @description 专题要素（图表）宽度 。
         */
        this.width = null;

        /**
         * @readonly
         * @member {number} FeatureThemeGraph.prototype.height
         * @description 专题要素（图表）高度 。
         */
        this.height = null;

        /**
         * @readonly
         * @member {number} FeatureThemeGraph.prototype.XOffset
         * @description 专题要素（图表）在 X 方向上的偏移值，单位像素。
         */
        this.XOffset = 0;

        /**
         * @readonly
         * @member {number} FeatureThemeGraph.prototype.YOffset
         * @description 专题要素（图表）在 Y 方向上的偏移值，单位像素。
         */
        this.YOffset = 0;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.DVBParameter
         * @description 数据视图框参数，长度为 4 的一维数组（数组元素值 >= 0），[leftOffset, bottomOffset, rightOffset, topOffset]，chartBox 内偏距值。
         *               此属性用于指定数据视图框 dataViewBox 的范围。
         */
        this.DVBParameter = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.dataViewBox
         * @description 数据视图框，长度为 4 的一维数组，[left, bottom, right, top]。
         *              dataViewBox 是统计专题要素最核心的内容，它负责解释数据在一个像素区域里的数据可视化含义，
         *              这种含义用可视化图形表达出来，这些表示数据的图形和一些辅助图形组合在一起构成统计专题图表。
         */
        this.dataViewBox = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.DVBCodomain
         * @description 数据视图框的内允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
         *              dataViewBox 中允许的数据范围，对数据溢出值域范围情况的处理需要在 assembleShapes 中进行。
         */
        this.DVBCodomain = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.DVBCenterPoint
         * @description 数据视图框中心点，长度为 2 的一维数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.DVBCenterPoint = null;

        /**
         * @readonly
         * @member {string} FeatureThemeGraph.prototype.DVBUnitValue
         * @description 单位值。在 assembleShapes() 中初始化其具体意义，例如：饼图的 DVBUnitValue 可以定义为"360/数据总和"，
         *              折线图的 DVBUnitValue 可以定义为 "DVBCodomain/DVBHeight"。
         */
        this.DVBUnitValue = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.DVBOrigonPoint
         * @description 数据视图框原点，数据视图框左上角点，长度为 2 的一维数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.DVBOrigonPoint = null;

        /**
         * @readonly
         * @member {number} FeatureThemeGraph.prototype.DVBWidth
         * @description 数据视图框宽度。
         */
        this.DVBWidth = null;

        /**
         * @readonly
         * @member {number} FeatureThemeGraph.prototype.DVBHeight
         * @description 数据视图框高度。
         */
        this.DVBHeight = null;

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.origonPointOffset
         * @description 数据视图框原点相对于图表框的原点偏移量，长度为 2 的一维数组，第一个元素表示 x 偏移量，第二个元素表示 y 偏移量。
         */
        this.origonPointOffset = null;

        /**
         * @readonly
         * @member {Array.<string>} FeatureThemeGraph.prototype.fields
         * @description 数据{FeatureVector}属性字段。
         */
        this.fields = fields || [];

        /**
         * @readonly
         * @member {Array.<number>} FeatureThemeGraph.prototype.dataValues
         * @description 图表展示的数据值，通过 fields 从数据 feature 属性中获得。
         */
        this.dataValues = null;
        // 图表位置
        if (lonlat) {
            this.lonlat = lonlat;
        } else {
            // 默认使用 bounds 中心
            this.lonlat = this.data.geometry.getBounds().getCenterLonLat();
        }

        // 配置项检测与赋值
        if (setting && setting.width && setting.height && setting.codomain) {
            this.setting = setting;
        }
        this.CLASS_NAME = "SuperMap.Feature.Theme.Graph";

    }

    /**
     * @function FeatureThemeGraph.prototype.destroy
     * @description 销毁专题要素。
     */
    destroy() {
        this.shapeFactory = null;
        this.shapeParameters = null;
        this.width = null;
        this.height = null;
        this.origonPoint = null;
        this.chartBox = null;
        this.dataViewBox = null;
        this.chartBounds = null;
        this.DVBParameter = null;
        this.DVBOrigonPoint = null;
        this.DVBCenterPoint = null;
        this.DVBWidth = null;
        this.DVBHeight = null;
        this.DVBCodomain = null;
        this.DVBUnitValue = null;
        this.origonPointOffset = null;
        this.XOffset = null;
        this.YOffset = null;
        this.fields = null;
        this.dataValues = null;
        this.setting = null;
        super.destroy();
    }


    /**
     * @function FeatureThemeGraph.prototype.initBaseParameter
     * @description 初始化专题要素（图表）基础参数。在调用此方法前，此类的图表模型相关属性都是不可用的 ，此方法在 assembleShapes 函数中调用。
     *              调用此函数关系到 setting 对象的以下属性。
     * @param {number} width - 专题要素（图表）宽度。
     * @param {number} height - 专题要素（图表）高度。
     * @param {Array.<number>} codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
     * @param {number} [XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
     * @param {number} [YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
     * @param {Array.<number>} [dataViewBoxParameter] - 数据视图框 dataViewBox 参数，它是指图表框 chartBox。
     *                                     （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
     * @param {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     * @returns {boolean} 初始化参数是否成功。
     */
    initBaseParameter() {
        // 参数初始化是否成功
        var isSuccess = true;

        // setting 属性是否已成功赋值
        if (!this.setting) {
            return false;
        }
        var sets = this.setting;
        // 检测 setting 的必设参数
        if (!(sets.width && sets.height && sets.codomain)) {
            return false;
        }

        // 数据
        var decimalNumber = (typeof(sets.decimalNumber) !== "undefined" && !isNaN(sets.decimalNumber)) ? sets.decimalNumber : -1;
        var dataEffective = Theme.getDataValues(this.data, this.fields, decimalNumber);
        this.dataValues = dataEffective ? dataEffective : [];

        // 基础参数  width, height, codomain
        this.width = parseFloat(sets.width);
        this.height = parseFloat(sets.height);
        this.DVBCodomain = sets.codomain;

        // 图表偏移
        // if(sets.XOffset) {this.XOffset = sets.XOffset};
        // if(sets.YOffset) {this.YOffset = sets.YOffset};
        this.XOffset = sets.XOffset ? sets.XOffset : 0;
        this.YOffset = sets.YOffset ? sets.YOffset : 0;

        // 其他默认值
        this.origonPoint = [];
        this.chartBox = [];
        this.dataViewBox = [];

        this.DVBParameter = sets.dataViewBoxParameter ? sets.dataViewBoxParameter : [0, 0, 0, 0];

        this.DVBOrigonPoint = [];
        this.DVBCenterPoint = [];
        this.origonPointOffset = [];

        // 图表位置
        this.resetLocation();

        // 专题要素宽度 w
        var w = this.width;
        // 专题要素高度 h
        var h = this.height;
        // 专题要素像素位置 loc
        var loc = this.location;

        // 专题要素像素位置 loc
        this.origonPoint = [loc[0] - w / 2, loc[1] - h / 2];
        // 专题要素原点（左上角）
        var op = this.origonPoint;

        // 图表框（[left, bottom, right, top]）
        this.chartBox = [op[0], op[1] + h, op[0] + w, op[1]];
        // 图表框
        var cb = this.chartBox;

        // 数据视图框参数，它是图表框各方向对应的内偏距
        var dbbP = this.DVBParameter;
        // 数据视图框 （[left, bottom, right, top]）
        this.dataViewBox = [cb[0] + dbbP[0], cb[1] - dbbP[1], cb[2] - dbbP[2], cb[3] + dbbP[3]];
        // 数据视图框
        var dvb = this.dataViewBox;
        //检查数据视图框是否合法
        if (dvb[0] >= dvb[2] || dvb[1] <= dvb[3]) {
            return false;
        }

        // 数据视图框原点
        this.DVBOrigonPoint = [dvb[0], dvb[3]];
        // 数据视图框宽度
        this.DVBWidth = Math.abs(dvb[2] - dvb[0]);
        // 数据视图框高度
        this.DVBHeight = Math.abs(dvb[1] - dvb[3]);
        // 数据视图框中心点
        this.DVBCenterPoint = [this.DVBOrigonPoint[0] + this.DVBWidth / 2, this.DVBOrigonPoint[1] + this.DVBHeight / 2]

        // 数据视图框原点与图表框的原点偏移量
        this.origonPointOffset = [this.DVBOrigonPoint[0] - op[0], this.DVBOrigonPoint[1] - op[1]];

        return isSuccess;
    }

    /**
     * @function FeatureThemeGraph.prototype.resetLocation
     * @description 根据地理位置 lonlat 重置专题要素（图表）位置。
     * @param {LonLat} lonlat - 专题要素新的像素中心位置。
     * @returns {Array.<number>} - 新专题要素像素参考位置。长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    resetLocation(lonlat) {
        if (lonlat) {
            this.lonlat = lonlat;
        }

        // 获取地理位置对应的像素坐标 newLocalLX
        var newLocalLX = this.getLocalXY(this.lonlat);
        // 处理偏移量 XOffset, YOffset
        newLocalLX[0] += this.XOffset;
        newLocalLX[1] += this.YOffset;
        // 将图形位置赋予  location 属性（注意 location 属性表示的是专题要素中心位置）
        this.location = newLocalLX;

        // 更新图表像素 Bounds
        var w = this.width;
        var h = this.height;
        var loc = this.location;
        this.chartBounds = new Bounds(loc[0] - w / 2, loc[1] + h / 2, loc[0] + w / 2, loc[1] - h / 2);

        //重新计算当前渐变色
        this.resetLinearGradient();

        return loc;
    }

    /**
     * @function FeatureThemeGraph.prototype.resetLinearGradient
     * @description resetLocation 中调用 图表的相对坐标存在的时候，重新计算渐变的颜色（目前用于二维柱状图渐变色 所以子类实现此方法）。
     */
    resetLinearGradient() {
        //子类实现此方法
    }

    /**
     * @function FeatureThemeGraph.prototype.shapesConvertToRelativeCoordinate
     * @description 将（构成图表）图形的节点转为相对坐标表示，此函数必须且只能在 assembleShapes() 结束时调用。
     */
    shapesConvertToRelativeCoordinate() {
        var shapes = this.shapes;
        var shapeROP = this.location;
        for (var i = 0, len = shapes.length; i < len; i++) {
            shapes[i].refOriginalPosition = shapeROP;

            var style = shapes[i].style;

            for (var sty in style) {
                switch (sty) {
                    case "pointList":
                        var pl = style[sty];
                        for (var j = 0, len2 = pl.length; j < len2; j++) {
                            pl[j][0] -= shapeROP[0];
                            pl[j][1] -= shapeROP[1];
                        }
                        break;
                    case "x":
                        style[sty] -= shapeROP[0];
                        break;
                    case "y":
                        style[sty] -= shapeROP[1];
                        break;
                    default:
                        break;
                }
            }
        }
        this.RelativeCoordinate = true;
    }


    /**
     * @function FeatureThemeGraph.prototype.assembleShapes
     * @description 图形装配函数。抽象方法，可视化子类必须实现此方法。<br>
     *              重写此方法的步骤：<br>
     *              1. 图表的某些特殊配置项（setting）处理，例如多数图表模型需要重新指定 dataViewBoxParameter 的默认值。<br>
     *              2. 调用 initBaseParameter() 方法初始化模型属性值，此步骤必须执行，只有当 initBaseParameter 返回 true 时才可以允许进行后续步骤。<br>
     *              3. 计算图形参数，制作图形，图形组合。在组装图表过程中，应该特别注意数据视图框单位值的定义、数据值溢出值域范围的处理和图形大小自适应。<br>
     *              4. 调用 shapesConvertToRelativeCoordinate() 方法，将图形的坐标值转为相对坐标，此步骤必须执行。
     * @example
     *  //子类实现 assembleShapes() 接口的步骤示例：
     *  assembleShapes: function(){
     *    // 第一步：图表的某些特殊配置项（setting）处理，例如多数图表模型需要重新指定 dataViewBoxParameter 的默认值。此步骤是非必须过程。
     *
     *    // 图表配置对象
     *    var sets = this.setting;
     *    // 默认数据视图框，这里展示在使用坐标轴和不使用坐标轴情况下对数据视图框参数赋予不同的默认值
     *    if(!sets.dataViewBoxParameter){
     *          if(typeof(sets.useAxis) === "undefined" || sets.useAxis){
     *              sets.dataViewBoxParameter = [45, 15, 15, 15];
     *          }
     *          else{
     *                  sets.dataViewBoxParameter = [5, 5, 5, 5];
     *          }
     *    }
     *
     *    // 第二步：初始化图表模型基本参数，只有在图表模型基本参数初始化成功时才可模型相关属性，如 this.dataViewBox、 this.DVBCodomain等。此步骤是必须过程。
     *    if(!this.initBaseParameter()) return;
     *
     *    // 第三步：用图形组装图表，在组装图表过程中，应该特别注意数据视图框单位值的定义、数据值溢出值域范围的处理和图形大小自适应。
     *    // 定义图表数据视图框中单位值的含义，下面行代码表示将数据视图框单位值定义为数据视图框高度上每像素代表的数据值
     *    this.DVBUnitValue =  (this.codomain[1] - this.codomain[0])/this.DVBHeight;
     *    var uv = this.DVBUnitValue;
     *
     *    // 图形参数计算代码......
     *
     *    // 关于图形装配，实际上就是利用图形工程对象 this.shapeFactory 的 createShape() 方法通过图形参数对象创建可视化的图形对象，并把这些图形对象按序添加到模型的图形库（his.shapes）中。下面的代码演示创建一个面图形参数对象，并允许通过图形配置对象设置图形的 style 和 highlightStyle，
     *    var barParams = new ShapeParametersPolygon(poiLists);
     *    barParams.style = sets.barStyle? sets.barStyle:{fillColor: "lightblue"};
     *    barParams.highlightStyle = sets.barHoverStyle? sets.barHoverStyle:{fillColor: "blue"};
     *    // 图形携带数据ID信息
     *    barParams.refDataID = this.data.id;
     *    // 创建图形并添加到图表图形数组中
     *    this.shapes.push(this.shapeFactory.createShape(barParams));
     *
     *    // 第四步：调用 shapesConvertToRelativeCoordinate() 方法，将图形库（his.shapes）中的图形转为由相对坐标表示的图形，客户端统计专题图模块从结构上要求可视化图形使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数。此步骤是必须过程。
     *    this.shapesConvertToRelativeCoordinate();
     * },
     */
    assembleShapes() {
        //子类必须实现此方法
    }

    /**
     * @function FeatureThemeGraph.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {LonLat} lonlat - 带转换的地理坐标。
     * @returns 屏幕像素坐标。
     */
    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }

}

/**
 * @function FeatureTheme.getDataValues
 * @description 根据字段名数组获取指定数据（feature）的属性值数组。属性值类型必须为 Number。
 * @param {FeatureVector} data - 数据。
 * @param {Array.<string>} [fields] - 字段名数组。
 * @param {number} [decimalNumber] - 小数位处理参数，对获取到的属性数据值进行小数位处理。
 * @returns {Array.<string>} 字段名数组对应的属性数据值数组。
 */
Theme.getDataValues = function (data, fields, decimalNumber) {
    if (!data.attributes) {
        return false;
    }

    var fieldsValue = [];

    var attrs = data.attributes;
    for (var i = 0; i < fields.length; i++) {
        for (var field in attrs) {
            if (field !== fields[i]) {
                continue
            }
            // 数字转换判断
            try {
                if (!isNaN(decimalNumber) && decimalNumber >= 0) {
                    fieldsValue.push(parseFloat(attrs[field].toString()).toFixed(decimalNumber));
                } else {
                    fieldsValue.push(parseFloat(attrs[field].toString()));
                }
            } catch (e) {
                throw new Error("not a number")
            }
        }
    }

    if (fieldsValue.length === fields.length) {
        return fieldsValue;
    } else {
        return false;
    }
};
