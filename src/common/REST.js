/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

 /**
 * @enum DataFormat
 * @description 服务请求返回结果数据类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DataFormat.GEOJSON;
 *
 * </script>
 * // ES6 Import
 * import { DataFormat } from '{npm}';
 *
 * const result = DataFormat.GEOJSON;
 * ```
 */
var DataFormat = {
    /** GeoJSON */
    GEOJSON: "GEOJSON",
    /** ISERVER */
    ISERVER: "ISERVER",
    /** FGB */
    FGB: "FGB"
};

/**
 * @enum ServerType
 * @description 服务器类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ServerType.ISERVER;
 *
 * </script>
 * // ES6 Import
 * import { ServerType } from '{npm}';
 *
 * const result = ServerType.ISERVER;
 * ```
 */
var ServerType = {
    /** ISERVER */
    ISERVER: "ISERVER",
    /** IPORTAL */
    IPORTAL: "IPORTAL",
    /** ONLINE */
    ONLINE: "ONLINE"
};

/**
 * @enum GeometryType
 * @description 几何对象枚举，定义了一系列几何对象类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GeometryType.LINE;
 *
 * </script>
 * // ES6 Import
 * import { GeometryType } from '{npm}';
 *
 * const result = GeometryType.LINE;
 * ```
 */
var GeometryType = {
    /** 线几何对象。 */
    LINE: "LINE",
    /** 路由对象。 */
    LINEM: "LINEM",
    /** 点几何对象。 */
    POINT: "POINT",
    /** 面几何对象。 */
    REGION: "REGION",
    /** EPS 点几何对象。 */
    POINTEPS: "POINTEPS",
    /** EPS 线几何对象。 */
    LINEEPS: "LINEEPS",
    /** EPS 面几何对象。 */
    REGIONEPS: "REGIONEPS",
    /** 椭圆几何对象。 */
    ELLIPSE: "ELLIPSE",
    /** 圆形几何对象。 */
    CIRCLE: "CIRCLE",
    /** 文本几何对象。 */
    TEXT: "TEXT",
    /** 矩形几何对象。 */
    RECTANGLE: "RECTANGLE",
    /** 未定义。 */
    UNKNOWN: "UNKNOWN",
    /** 复合几何对象。 */
    GEOCOMPOUND:"GEOCOMPOUND"
};

/**
 * @enum QueryOption
 * @description 查询结果类型，描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.QueryOption.ATTRIBUTE;
 *
 * </script>
 * // ES6 Import
 * import { QueryOption } from '{npm}';
 *
 * const result = QueryOption.ATTRIBUTE;
 * ```
 */
var QueryOption = {
    /** 属性。 */
    ATTRIBUTE: "ATTRIBUTE",
    /** 属性和几何对象。 */
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    /** 几何对象。 */
    GEOMETRY: "GEOMETRY"
};

/**
 * @enum JoinType
 * @description 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.JoinType.INNERJOIN;
 *
 * </script>
 * // ES6 Import
 * import { JoinType } from '{npm}';
 *
 * const result = JoinType.INNERJOIN;
 * ```
 */
var JoinType = {
    /** 内连接。 */
    INNERJOIN: "INNERJOIN",
    /** 左连接。 */
    LEFTJOIN: "LEFTJOIN"
};

/**
 * @enum SpatialQueryMode
 * @description  空间查询模式枚举。该类定义了空间查询操作模式常量。空间查询是通过几何对象之间的空间位置关系来构建过滤条件的一种查询方式。
 * 例如：通过空间查询可以找到被包含在面中的空间对象，相离或者相邻的空间对象等。<br>
 * 注意：当前版本提供对点、线、面、网络和文本类型数据的空间查询，其中文本类型仅支持 Intersect 和 Contain 两种空间查询模式，
 * 而且只能作为被搜索对象不能作为搜索对象。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SpatialQueryMode.CONTAIN;
 *
 * </script>
 * // ES6 Import
 * import { SpatialQueryMode } from '{npm}';
 *
 * const result = SpatialQueryMode.CONTAIN;
 * ```
 */
var SpatialQueryMode = {
    /** 包含空间查询模式。 */
    CONTAIN: "CONTAIN",
    /** 交叉空间查询模式。 */
    CROSS: "CROSS",
    /** 分离空间查询模式。 */
    DISJOINT: "DISJOINT",
    /** 重合空间查询模式。 */
    IDENTITY: "IDENTITY",
    /** 相交空间查询模式。 */
    INTERSECT: "INTERSECT",
    /** 无空间查询。 */
    NONE: "NONE",
    /** 叠加空间查询模式。 */
    OVERLAP: "OVERLAP",
    /** 邻接空间查询模式。 */
    TOUCH: "TOUCH",
    /** 被包含空间查询模式。 */
    WITHIN: "WITHIN"
};

/**
 * @enum SpatialRelationType
 * @description  数据集对象间的空间关系枚举。
 * 该类定义了数据集对象间的空间关系类型常量。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SpatialRelationType.CONTAIN;
 *
 * </script>
 * // ES6 Import
 * import { SpatialRelationType } from '{npm}';
 *
 * const result = {namespace}.SpatialRelationType.CONTAIN;
 * ```
 */
var SpatialRelationType = {
    /** 包含关系。 */
    CONTAIN: "CONTAIN",
    /** 相交关系。 */
    INTERSECT: "INTERSECT",
    /** 被包含关系。 */
    WITHIN: "WITHIN"
};

/**
 * @enum MeasureMode
 * @type {string}
 * @description  量算模式枚举。
 * @category BaseTypes Constant
 * 该类定义了两种测量模式：距离测量和面积测量。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.MeasureMode.DISTANCE;
 *
 * </script>
 * // ES6 Import
 * import { MeasureMode } from '{npm}';
 *
 * const result = MeasureMode.DISTANCE;
 * ```
 */
var MeasureMode = {
    /** 距离测量。 */
    DISTANCE: "DISTANCE",
    /** 面积测量。 */
    AREA: "AREA"
};

/**
 * @enum Unit
 * @description  距离单位枚举。
 * 该类定义了一系列距离单位类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Unit.METER;
 *
 * </script>
 * // ES6 Import
 * import { Unit } from '{npm}';
 *
 * const result = Unit.METER;
 * ```
 */
var Unit = {
    /**  米。 */
    METER: "METER",
    /**  千米。 */
    KILOMETER: "KILOMETER",
    /**  英里。 */
    MILE: "MILE",
    /**  码。 */
    YARD: "YARD",
    /**  度。 */
    DEGREE: "DEGREE",
    /**  毫米。 */
    MILLIMETER: "MILLIMETER",
    /**  厘米。 */
    CENTIMETER: "CENTIMETER",
    /**  英寸。 */
    INCH: "INCH",
    /**  分米。 */
    DECIMETER: "DECIMETER",
    /**  英尺。 */
    FOOT: "FOOT",
    /**  秒。 */
    SECOND: "SECOND",
    /**  分。 */
    MINUTE: "MINUTE",
    /**  弧度。 */
    RADIAN: "RADIAN"
};

/**
 * @enum BufferRadiusUnit
 * @description  缓冲区距离单位枚举。该类定义了一系列缓冲距离单位类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BufferRadiusUnit.CENTIMETER;
 *
 * </script>
 * // ES6 Import
 * import { BufferRadiusUnit } from '{npm}';
 *
 * const result = BufferRadiusUnit.CENTIMETER;
 * ```
 */
var BufferRadiusUnit = {
    /**  厘米。 */
    CENTIMETER: "CENTIMETER",
    /**  分米。 */
    DECIMETER: "DECIMETER",
    /**  英尺。 */
    FOOT: "FOOT",
    /**  英寸。 */
    INCH: "INCH",
    /**  千米。 */
    KILOMETER: "KILOMETER",
    /**  米。 */
    METER: "METER",
    /**  英里。 */
    MILE: "MILE",
    /**  毫米。 */
    MILLIMETER: "MILLIMETER",
    /**  码。 */
    YARD: "YARD"
}

/**
 * @enum EngineType
 * @description  数据源引擎类型枚举。SuperMap SDX+ 是 SuperMap 的空间引擎技术，
 * 它提供了一种通用的访问机制（或模式）来访问存储在不同引擎里的数据。引擎类型包括数据库引擎、文件引擎和 Web 引擎。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.EngineType.IMAGEPLUGINS;
 *
 * </script>
 * // ES6 Import
 * import { EngineType } from '{npm}';
 *
 * const result = EngineType.IMAGEPLUGINS;
 * ```
 */
var EngineType = {
    /** 影像只读引擎类型，文件引擎，针对通用影像格式如 BMP，JPG，TIFF 以及超图自定义影像格式 SIT 等。 */
    IMAGEPLUGINS: "IMAGEPLUGINS",
    /**  OGC 引擎类型，针对于 Web 数据源，Web 引擎，目前支持的类型有 WMS，WFS，WCS。 */
    OGC: "OGC",
    /**  Oracle 引擎类型，针对 Oracle 数据源，数据库引擎。 */
    ORACLEPLUS: "ORACLEPLUS",
    /**  SDB 引擎类型，文件引擎，即 SDB 数据源。 */
    SDBPLUS: "SDBPLUS",
    /**  SQL Server 引擎类型，针对 SQL Server 数据源，数据库引擎。 */
    SQLPLUS: "SQLPLUS",
    /**  UDB 引擎类型，文件引擎。 */
    UDB: "UDB"
};

/**
 * @enum ThemeGraphTextFormat
 * @description  统计专题图文本显示格式枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ThemeGraphTextFormat.CAPTION;
 *
 * </script>
 * // ES6 Import
 * import { ThemeGraphTextFormat } from '{npm}';
 *
 * const result = ThemeGraphTextFormat.CAPTION;
 * ```
 */
var ThemeGraphTextFormat = {
    /**  标题。以各子项的标题来进行标注。 */
    CAPTION: "CAPTION",
    /**  标题 + 百分数。以各子项的标题和所占的百分比来进行标注。 */
    CAPTION_PERCENT: "CAPTION_PERCENT",
    /**  标题 + 实际数值。以各子项的标题和真实数值来进行标注。 */
    CAPTION_VALUE: "CAPTION_VALUE",
    /**  百分数。以各子项所占的百分比来进行标注。 */
    PERCENT: "PERCENT",
    /**  实际数值。以各子项的真实数值来进行标注。 */
    VALUE: "VALUE"

};

/**
 * @enum ThemeGraphType
 * @description  统计专题图类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ThemeGraphType.AREA;
 *
 * </script>
 * // ES6 Import
 * import { ThemeGraphType } from '{npm}';
 *
 * const result = ThemeGraphType.AREA;
 * ```
 */
var ThemeGraphType = {
    /**  面积图。 */
    AREA: "AREA",
    /**  柱状图。 */
    BAR: "BAR",
    /**  三维柱状图。 */
    BAR3D: "BAR3D",
    /**  折线图。 */
    LINE: "LINE",
    /**  饼图。 */
    PIE: "PIE",
    /**  三维饼图。 */
    PIE3D: "PIE3D",
    /**  点状图。 */
    POINT: "POINT",
    /**  环状图。 */
    RING: "RING",
    /**  玫瑰图。 */
    ROSE: "ROSE",
    /**  三维玫瑰图。 */
    ROSE3D: "ROSE3D",
    /**  堆叠柱状图。 */
    STACK_BAR: "STACK_BAR",
    /**  三维堆叠柱状图。 */
    STACK_BAR3D: "STACK_BAR3D",
    /**  阶梯图。 */
    STEP: "STEP"
};

/**
 * @enum GraphAxesTextDisplayMode
 * @description  统计专题图坐标轴文本显示模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GraphAxesTextDisplayMode.ALL;
 *
 * </script>
 * // ES6 Import
 * import { GraphAxesTextDisplayMode } from '{npm}';
 *
 * const result = GraphAxesTextDisplayMode.ALL;
 * ```
 */
var GraphAxesTextDisplayMode = {
    /**  显示全部文本。 */
    ALL: "ALL",
    /**  不显示文本。 */
    NONE: "NONE",
    /**  显示 Y 轴的文本。 */
    YAXES: "YAXES"
};

/**
 * @enum GraduatedMode
 * @description  主要用在统计专题图和等级符号专题图中。<br>
 * 分级主要是为了减少制作专题图时数据大小之间的差异。如果数据之间差距较大，则可以采用对数或者平方根的分级方式来进行，
 * 减少数据之间绝对大小的差异，使得专题图的视觉效果比较好，同时不同类别之间的比较也还是有意义的。
 * 有三种分级模式：常数、对数和平方根，对于有值为负数的字段，不可以采用对数和平方根的分级方式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GraduatedMode.CONSTANT;
 *
 * </script>
 * // ES6 Import
 * import { GraduatedMode } from '{npm}';
 *
 * const result = GraduatedMode.CONSTANT;
 * ```
 */
var GraduatedMode = {
    /**  常量分级模式。 */
    CONSTANT: "CONSTANT",
    /** 对数分级模式。 */
    LOGARITHM: "LOGARITHM",
    /**  平方根分级模式。 */
    SQUAREROOT: "SQUAREROOT"
};

/**
 * @enum RangeMode
 * @description  范围分段专题图分段方式枚举。在分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段，
 * 要素或记录根据其所对应的字段值或表达式值被分配到其中一个分段中，在同一个范围段中要素或记录使用相同的风格进行显示。
 * 分段专题图一般用来表现连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等，
 * 从而反映现象在各区域的集中程度或发展水平的分布差异。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.RangeMode.CUSTOMINTERVAL;
 *
 * </script>
 * // ES6 Import
 * import { RangeMode } from '{npm}';
 *
 * const result = RangeMode.CUSTOMINTERVAL;
 * ```
 */
var RangeMode = {
    /**  自定义分段法。 */
    CUSTOMINTERVAL: "CUSTOMINTERVAL",
    /**  等距离分段法。 */
    EQUALINTERVAL: "EQUALINTERVAL",
    /**  对数分段法。 */
    LOGARITHM: "LOGARITHM",
    /**  等计数分段法。 */
    QUANTILE: "QUANTILE",
    /**  平方根分段法。 */
    SQUAREROOT: "SQUAREROOT",
    /**  标准差分段法。 */
    STDDEVIATION: "STDDEVIATION"
};

/**
 * @enum ThemeType
 * @description  专题图类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ThemeType.DOTDENSITY;
 *
 * </script>
 * // ES6 Import
 * import { ThemeType } from '{npm}';
 *
 * const result = ThemeType.DOTDENSITY;
 * ```
 */
var ThemeType = {
    /** 点密度专题图。 */
    DOTDENSITY: "DOTDENSITY",
    /** 等级符号专题图。 */
    GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
    /** 统计专题图。 */
    GRAPH: "GRAPH",
    /** 标签专题图。 */
    LABEL: "LABEL",
    /** 分段专题图。 */
    RANGE: "RANGE",
    /** 単值专题图。 */
    UNIQUE: "UNIQUE"
};

/**
 * @enum ColorGradientType
 * @description  渐变颜色枚举。颜色渐变是多种颜色间的逐渐混合，可以是从起始色到终止色两种颜色的渐变，
 * 或者在起始色到终止色之间具有多种中间颜色进行渐变。该颜色渐变类型可应用于专题图对象的颜色方案设置中如：
 * 单值专题图、 分段专题图、栅格分段专题图。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ColorGradientType.BLACK_WHITE;
 *
 * </script>
 * // ES6 Import
 * import { ColorGradientType } from '{npm}';
 *
 * const result = ColorGradientType.BLACK_WHITE;
 * ```
 */
var ColorGradientType = {
    /** 黑白渐变色。 */
    BLACK_WHITE: "BLACKWHITE",
    /** 蓝黑渐变色。 */
    BLUE_BLACK: "BLUEBLACK",
    /** 蓝红渐变色。 */
    BLUE_RED: "BLUERED",
    /** 蓝白渐变色。 */
    BLUE_WHITE: "BLUEWHITE",
    /** 青黑渐变色。 */
    CYAN_BLACK: "CYANBLACK",
    /** 青蓝渐变色。 */
    CYAN_BLUE: "CYANBLUE",
    /** 青绿渐变色。 */
    CYAN_GREEN: "CYANGREEN",
    /** 青白渐变色。 */
    CYAN_WHITE: "CYANWHITE",
    /** 绿黑渐变色。 */
    GREEN_BLACK: "GREENBLACK",
    /** 绿蓝渐变色。 */
    GREEN_BLUE: "GREENBLUE",
    /** 绿橙紫渐变色。 */
    GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
    /** 绿红渐变色。 */
    GREEN_RED: "GREENRED",
    /** 蓝红渐变色。 */
    GREEN_WHITE: "GREENWHITE",
    /** 粉黑渐变色。 */
    PINK_BLACK: "PINKBLACK",
    /** 粉蓝渐变色。 */
    PINK_BLUE: "PINKBLUE",
    /** 粉红渐变色。 */
    PINK_RED: "PINKRED",
    /** 粉白渐变色。 */
    PINK_WHITE: "PINKWHITE",
    /** 彩虹色。 */
    RAIN_BOW: "RAINBOW",
    /** 红黑渐变色。 */
    RED_BLACK: "REDBLACK",
    /** 红白渐变色。 */
    RED_WHITE: "REDWHITE",
    /** 光谱渐变。 */
    SPECTRUM: "SPECTRUM",
    /** 地形渐变，用于三维显示效果较好。 */
    TERRAIN: "TERRAIN",
    /** 黄黑渐变色。 */
    YELLOW_BLACK: "YELLOWBLACK",
    /** 黄蓝渐变色。 */
    YELLOW_BLUE: "YELLOWBLUE",
    /** 黄绿渐变色。 */
    YELLOW_GREEN: "YELLOWGREEN",
    /** 黄红渐变色。 */
    YELLOW_RED: "YELLOWRED",
    /** 黄白渐变色。 */
    YELLOW_WHITE: "YELLOWWHITE"
};

/**
 * @enum TextAlignment
 * @description  文本对齐方式枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TextAlignment.TOPLEFT;
 *
 * </script>
 * // ES6 Import
 * import { TextAlignment } from '{npm}';
 *
 * const result = TextAlignment.TOPLEFT;
 * ```
 */
var TextAlignment = {
    /** 左上角对齐。 */
    TOPLEFT: "TOPLEFT",
    /** 顶部居中对齐。 */
    TOPCENTER: "TOPCENTER",
    /** 右上角对齐。 */
    TOPRIGHT: "TOPRIGHT",
    /** 基准线左对齐。 */
    BASELINELEFT: "BASELINELEFT",
    /** 基准线居中对齐。 */
    BASELINECENTER: "BASELINECENTER",
    /** 基准线右对齐。 */
    BASELINERIGHT: "BASELINERIGHT",
    /** 左下角对齐。 */
    BOTTOMLEFT: "BOTTOMLEFT",
    /** 底部居中对齐。 */
    BOTTOMCENTER: "BOTTOMCENTER",
    /** 右下角对齐。 */
    BOTTOMRIGHT: "BOTTOMRIGHT",
    /** 左中对齐。 */
    MIDDLELEFT: "MIDDLELEFT",
    /** 中心对齐。 */
    MIDDLECENTER: "MIDDLECENTER",
    /** 右中对齐。 */
    MIDDLERIGHT: "MIDDLERIGHT"
};

/**
 * @enum FillGradientMode
 * @description  渐变填充风格的渐变类型枚举。所有渐变类型都是两种颜色之间的渐变，即从渐变起始色到渐变终止色之间的渐变。
 * 渐变风格的计算都是以填充区域的边界矩形，即最小外接矩形作为基础的，因而以下提到的填充区域范围即为填充区域的最小外接矩形。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.FillGradientMode.NONE;
 *
 * </script>
 * // ES6 Import
 * import { FillGradientMode } from '{npm}';
 *
 * const result = FillGradientMode.NONE;
 * ```
 */
var FillGradientMode = {
    /** 无渐变。 */
    NONE: "NONE",
    /** 线性渐变填充。 */
    LINEAR: "LINEAR",
    /** 辐射渐变填充。 */
    RADIAL: "RADIAL",
    /** 圆锥渐变填充。 */
    CONICAL: "CONICAL",
    /** 四角渐变填充。 */
    SQUARE: "SQUARE"
};

/**
 * @enum AlongLineDirection
 * @description  标签沿线标注方向枚举。路线与水平方向的锐角夹角在 60 度以上表示上下方向，60 度以下表示左右方向。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AlongLineDirection.NORMAL;
 *
 * </script>
 * // ES6 Import
 * import { AlongLineDirection } from '{npm}';
 *
 * const result = AlongLineDirection.NORMAL;
 * ```
 */
var AlongLineDirection = {
    /** 沿线的法线方向放置标签。 */
    NORMAL: "ALONG_LINE_NORMAL",
    /** 从下到上，从左到右放置。 */
    LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
    /** 从上到下，从左到右放置。 */
    LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
    /** 从下到上，从右到左放置。 */
    RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
    /** 从上到下，从右到左放置。 */
    RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
};

/**
 * @enum LabelBackShape
 * @description  标签专题图中标签背景的形状枚举。标签背景是 SuperMap iServer 支持的一种标签的显示风格，
 * 使用一定颜色的各种形状作为各标签背景，从而可以突出显示标签或者使标签专题图更美观。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.LabelBackShape.DIAMOND;
 *
 * </script>
 * // ES6 Import
 * import { LabelBackShape } from '{npm}';
 *
 * const result = LabelBackShape.DIAMOND;
 * ```
 */
var LabelBackShape = {
    /** 菱形背景，即标签背景的形状为菱形。 */
    DIAMOND: "DIAMOND",
    /** 椭圆形背景，即标签背景的行状为椭圆形。 */
    ELLIPSE: "ELLIPSE",
    /** 符号背景，即标签背景的形状为设定的符号。 */
    MARKER: "MARKER",
    /** 空背景，即不使用任何形状作为标签背景。 */
    NONE: "NONE",
    /** 矩形背景，即标签背景的形状为矩形。 */
    RECT: "RECT",
    /** 圆角矩形背景，即标签背景的形状为圆角矩形。 */
    ROUNDRECT: "ROUNDRECT",
    /** 三角形背景，即标签背景的形状为三角形。 */
    TRIANGLE: "TRIANGLE"
};

/**
 * @enum LabelOverLengthMode
 * @description  标签专题图中超长标签的处理模式枚举。对于标签的长度超过设置的标签最大长度的标签称为超长标签，
 * 标签的最大长度可以通过 ThemeLabel.maxLabelLength 来设置。
 * SuperMap 提供三种超长标签的处理方式来控制超长标签的显示行为，即换行显示、对超长标签不进行处理、省略超出部分。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.LabelOverLengthMode.NEWLINE;
 *
 * </script>
 * // ES6 Import
 * import { LabelOverLengthMode } from '{npm}';
 *
 * const result = LabelOverLengthMode.NEWLINE;
 * ```
 */
var LabelOverLengthMode = {
    /** 对超长标签换行显示。 */
    NEWLINE: "NEWLINE",
    /** 对超长标签不进行处理。 */
    NONE: "NONE",
    /** 省略标签超出的部分。 */
    OMIT: "OMIT"
};

/**
 * @enum DirectionType
 * @description  网络分析中方向枚举。
 * 在行驶引导子项中使用。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DirectionType.EAST;
 *
 * </script>
 * // ES6 Import
 * import { DirectionType } from '{npm}';
 *
 * const result = DirectionType.EAST;
 * ```
 */
var DirectionType = {
    /** 东。 */
    EAST: "EAST",
    /** 无方向。 */
    NONE: "NONE",
    /** 北。 */
    NORTH: "NORTH",
    /** 南。 */
    SOURTH: "SOURTH",
    /** 西。 */
    WEST: "WEST"
};

/**
 * @enum SideType
 * @description  行驶位置枚举。
 * 表示在行驶在路的左边、右边或者路上的枚举，该类用在行驶导引子项类中。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SideType.LEFT;
 *
 * </script>
 * // ES6 Import
 * import { SideType } from '{npm}';
 *
 * const result = SideType.LEFT;
 * ```
 */
var SideType = {
    /** 路的左侧。 */
    LEFT: "LEFT",
    /** 在路上（即路的中间）。 */
    MIDDLE: "MIDDLE",
    /** 无效值。 */
    NONE: "NONE",
    /** 路的右侧。 */
    RIGHT: "RIGHT"
};

/**
 * @enum SupplyCenterType
 * @description  资源供给中心类型枚举。
 * 该枚举定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析；固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SupplyCenterType.FIXEDCENTER;
 *
 * </script>
 * // ES6 Import
 * import { SupplyCenterType } from '{npm}';
 *
 * const result = SupplyCenterType.FIXEDCENTER;
 * ```
 */
var SupplyCenterType = {
    /** 固定中心点，用于资源分配和选址分区。 */
    FIXEDCENTER: "FIXEDCENTER",
    /** 非中心点，在资源分配和选址分区时都不予考虑。 */
    NULL: "NULL",
    /** 可选中心点，用于选址分区。 */
    OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * @enum TurnType
 * @description  转弯方向枚举。
 * 用在行驶引导子项类中，表示转弯的方向。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TurnType.AHEAD;
 *
 * </script>
 * // ES6 Import
 * import { TurnType } from '{npm}';
 *
 * const result = TurnType.AHEAD;
 * ```
 */
var TurnType = {
    /** 向前直行。 */
    AHEAD: "AHEAD",
    /** 掉头。 */
    BACK: "BACK",
    /** 终点，不转弯。 */
    END: "END",
    /** 左转弯。 */
    LEFT: "LEFT",
    /** 无效值。 */
    NONE: "NONE",
    /** 右转弯。 */
    RIGHT: "RIGHT"
};

/**
 * @enum BufferEndType
 * @description  缓冲区分析的缓冲端点类型。用以区分线对象缓冲区分析时的端点是圆头缓冲还是平头缓冲。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BufferEndType.FLAT;
 *
 * </script>
 * // ES6 Import
 * import { BufferEndType } from '{npm}';
 *
 * const result = BufferEndType.FLAT;
 * ```
 */
var BufferEndType = {
    /** 平头缓冲。 */
    FLAT: "FLAT",
    /** 圆头缓冲。 */
    ROUND: "ROUND"
};
/**
 * @enum OverlayOperationType
 * @description  叠加分析类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OverlayOperationType.CLIP;
 *
 * </script>
 * // ES6 Import
 * import { OverlayOperationType } from '{npm}';
 *
 * const result = OverlayOperationType.CLIP;
 * ```
 */
 var OverlayOperationType = {
    /** 操作数据集（几何对象）裁剪被操作数据集（几何对象）。 */
    CLIP: "CLIP",
    /** 在被操作数据集（几何对象）上擦除掉与操作数据集（几何对象）相重合的部分。 */
    ERASE: "ERASE",
    /**对被操作数据集（几何对象）进行同一操作，即操作执行后，被操作数据集（几何对象）包含来自操作数据集（几何对象）的几何形状。 */
    IDENTITY: "IDENTITY",
    /** 对两个数据集（几何对象）求交，返回两个数据集（几何对象）的交集。 */
    INTERSECT: "INTERSECT",
    /** 对两个面数据集（几何对象）进行合并操作。 */
    UNION: "UNION",
    /** 对两个面数据集（几何对象）进行更新操作。 */
    UPDATE: "UPDATE",
    /** 对两个面数据集（几何对象）进行对称差操作。 */
    XOR: "XOR"
};

/**
 * @enum OutputType
 * @description  分布式分析输出类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OutputType.INDEXEDHDFS;
 *
 * </script>
 * // ES6 Import
 * import { OutputType } from '{npm}';
 *
 * const result = OutputType.INDEXEDHDFS;
 * ```
 */
var OutputType =  {
    /** HDFS 的索引文件。 */
    INDEXEDHDFS: "INDEXEDHDFS",
    /** 本地 UDB 文件。 */
    UDB: "UDB",
    /** MongoDB 数据库。 */
    MONGODB: "MONGODB",
    /** PostgreSQL 数据库。 */
    PG: "PG"
};

/**
 * @enum SmoothMethod
 * @description  平滑方法枚举。
 * 用于从 Grid 或 DEM 数据生成等值线或等值面时，对等值线或者等值面的边界线进行平滑处理的方法。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SmoothMethod.BSPLINE;
 *
 * </script>
 * // ES6 Import
 * import { SmoothMethod } from '{npm}';
 *
 * const result = SmoothMethod.BSPLINE;
 * ```
 */
 var SmoothMethod = {
    /** B 样条法。 */
    BSPLINE: "BSPLINE",
    /** 磨角法。 */
    POLISH: "POLISH"
};

/**
 * @enum SurfaceAnalystMethod
 * @description  表面分析方法枚举。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SurfaceAnalystMethod.ISOLINE;
 *
 * </script>
 * // ES6 Import
 * import { SurfaceAnalystMethod } from '{npm}';
 *
 * const result = SurfaceAnalystMethod.ISOLINE;
 * ```
 */
var SurfaceAnalystMethod = {
    /** 等值线提取。 */
    ISOLINE: "ISOLINE",
    /** 等值面提取。 */
    ISOREGION: "ISOREGION"
};

/**
 * @enum DataReturnMode
 * @description  数据返回模式枚举。
 * 该枚举用于指定空间分析返回结果模式，包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DataReturnMode.DATASET_AND_RECORDSET;
 *
 * </script>
 * // ES6 Import
 * import { DataReturnMode } from '{npm}';
 *
 * const result = DataReturnMode.DATASET_AND_RECORDSET;
 * ```
 */
var DataReturnMode = {
    /** 返回结果数据集标识(数据集名称@数据源名称)和记录集（RecordSet）。 */
    DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
    /** 只返回数据集标识（数据集名称@数据源名称）。 */
    DATASET_ONLY: "DATASET_ONLY",
    /** 只返回记录集（RecordSet）。 */
    RECORDSET_ONLY: "RECORDSET_ONLY"
};

/**
 * @enum EditType
 * @description  要素集更新模式枚举。
 * 该枚举用于指定数据服务中要素集更新模式，包含添加要素集、更新要素集和删除要素集。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.EditType.ADD;
 *
 * </script>
 * // ES6 Import
 * import { EditType } from '{npm}';
 *
 * const result = {namespace}.EditType.ADD;
 * ```
 */
var EditType = {
    /** 增加操作。 */
    ADD: "add",
    /** 修改操作。 */
    UPDATE: "update",
    /** 删除操作。 */
    DELETE: "delete"
};

/**
 * @enum TransferTactic
 * @description  公交换乘策略枚举。
 * 该枚举用于指定公交服务中的公交换乘策略，包含时间最短、换乘最少、步行最少、距离最短等设置。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TransferTactic.LESS_TIME;
 *
 * </script>
 * // ES6 Import
 * import { TransferTactic } from '{npm}';
 *
 * const result = TransferTactic.LESS_TIME;
 * ```
 */
var TransferTactic = {
    /** 时间最短。 */
    LESS_TIME: "LESS_TIME",
    /** 换乘最少。 */
    LESS_TRANSFER: "LESS_TRANSFER",
    /** 步行最少。 */
    LESS_WALK: "LESS_WALK",
    /** 距离最短。 */
    MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * @enum TransferPreference
 * @description  交通换乘偏好枚举。
 * 该枚举用于指定交通换乘服务中的地铁优先、公交优先、不乘坐地铁、无乘车偏好等交通换乘偏好设置。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TransferPreference.BUS;
 *
 * </script>
 * // ES6 Import
 * import { TransferPreference } from '{npm}';
 *
 * const result = TransferPreference.BUS;
 * ```
 */
var TransferPreference = {
    /** 公交汽车优先。 */
    BUS: "BUS",
    /** 地铁优先。 */
    SUBWAY: "SUBWAY",
    /** 不乘坐地铁。 */
    NO_SUBWAY: "NO_SUBWAY",
    /** 无乘车偏好。 */
    NONE: "NONE"
};

/**
 * @enum GridType
 * @description  地图背景格网类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GridType.CROSS;
 *
 * </script>
 * // ES6 Import
 * import { GridType } from '{npm}';
 *
 * const result = GridType.CROSS;
 * ```
 */
var GridType =  {
    /** 十字叉丝。 */
    CROSS: "CROSS",
    /** 网格线。 */
    GRID: "GRID",
    /** 点。 */
    POINT: "POINT"
};

/**
 * @enum ColorSpaceType
 * @description  色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ColorSpaceType.CMYK;
 *
 * </script>
 * // ES6 Import
 * import { ColorSpaceType } from '{npm}';
 *
 * const result = ColorSpaceType.CMYK;
 * ```
 */
var ColorSpaceType = {
    /** CMYK色彩模式，该类型主要在印刷系统使用。 */
    CMYK: "CMYK",
    /** RGB色彩模式，该类型主要在显示系统中使用。 */
    RGB: "RGB"
};

/**
 * @enum LayerType
 * @description  图层类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.LayerType.UGC;
 *
 * </script>
 * // ES6 Import
 * import { LayerType } from '{npm}';
 *
 * const result = LayerType.UGC;
 * ```
 */
var LayerType = {
    /** SuperMap UGC 类型图层。如矢量图层、栅格(Grid)图层、影像图层。 */
    UGC: "UGC",
    /** WMS 图层。 */
    WMS: "WMS",
    /** WFS 图层。 */
    WFS: "WFS",
    /** 自定义图层。 */
    CUSTOM: "CUSTOM"
};

/**
 * @enum UGCLayerType
 * @description  SuperMap 图层类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.UGCLayerType.THEME;
 *
 * </script>
 * // ES6 Import
 * import { UGCLayerType } from '{npm}';
 *
 * const result = UGCLayerType.THEME;
 * ```
 */
var UGCLayerType = {
    /** 专题图层。 */
    THEME: "THEME",
    /** 矢量图层。 */
    VECTOR: "VECTOR",
    /** 栅格图层。 */
    GRID: "GRID",
    /** 影像图层。 */
    IMAGE: "IMAGE"
};

/**
 * @enum StatisticMode
 * @description  字段统计方法类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.StatisticMode.AVERAGE;
 *
 * </script>
 * // ES6 Import
 * import { StatisticMode } from '{npm}';
 *
 * const result = StatisticMode.AVERAGE;
 * ```
 */
var StatisticMode = {
    /** 统计所选字段的平均值。 */
    AVERAGE: "AVERAGE",
    /** 统计所选字段的最大值。 */
    MAX: "MAX",
    /** 统计所选字段的最小值。 */
    MIN: "MIN",
    /** 统计所选字段的标准差。 */
    STDDEVIATION: "STDDEVIATION",
    /** 统计所选字段的总和。 */
    SUM: "SUM",
    /** 统计所选字段的方差。 */
    VARIANCE: "VARIANCE"
};

/**
 * @enum PixelFormat
 * @description  定义栅格与影像数据存储的像素格式枚举。光栅数据结构实际上就是像元的阵列，
 * 像元（或像素）是光栅数据的最基本信息存储单位，本枚举类包含了表示一个像元（或像素）的字节长度。
 * 在 SuperMap 中有两种类型的光栅数据：栅格数据集和影像数据集（参见 DatasetGridInfo和DatasetImageInfo）。 
 * 栅格数据集多用来进行栅格分析，因而其像元值为地物的属性值，如高程，降水量等；
 * 而影像数据集一般用来进行显示或作为底图，因而其像元值为颜色值或颜色的索引值。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.PixelFormat.BIT16;
 *
 * </script>
 * // ES6 Import
 * import { PixelFormat } from '{npm}';
 *
 * const result = PixelFormat.BIT16;
 * ```
 */
var PixelFormat = {
    /** 每个像元用16个比特(即2个字节)表示。 */
    BIT16: "BIT16",
    /** 每个像元用32个比特(即4个字节)表示。 */
    BIT32: "BIT32",
    /** 每个像元用64个比特(即8个字节)表示，只提供给栅格数据集使用。 */
    BIT64: "BIT64",
    /** 每个像元用4个字节来表示，只提供给栅格数据集使用。 */
    SINGLE: "SINGLE",
    /** 每个像元用8个字节来表示，只提供给栅格数据集使用。 */
    DOUBLE: "DOUBLE",
    /** 每个像元用1个比特表示。 */
    UBIT1: "UBIT1",
    /** 每个像元用4个比特来表示。 */
    UBIT4: "UBIT4",
    /** 每个像元用8个比特(即1个字节)来表示。 */
    UBIT8: "UBIT8",
    /** 每个像元用24个比特(即3个字节)来表示。 */
    UBIT24: "UBIT24",
    /** 每个像元用32个比特(即4个字节)来表示。 */
    UBIT32: "UBIT32"
};

/**
 * @enum SearchMode
 * @description  插值分析时使用的样本点的查找方式枚举。对于同一种插值方法，样本点的选择方法不同，得到的插值结果也会不同。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SearchMode.KDTREE_FIXED_COUNT;
 *
 * </script>
 * // ES6 Import
 * import { SearchMode } from '{npm}';
 *
 * const result = SearchMode.KDTREE_FIXED_COUNT;
 * ```
 */
var SearchMode = {
    /** 使用 KDTREE 的固定点数方式查找参与内插分析的点。 */
    KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
    /** 使用 KDTREE 的定长方式查找参与内插分析的点。 */
    KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
    /** 不进行查找，使用所有的输入点进行内插分析。 */
    NONE: "NONE",
    /** 使用 QUADTREE 方式查找参与内插分析的点，仅对样条（RBF）插值和普通克吕金（Kriging）有用。 */
    QUADTREE: "QUADTREE"
};

/**
 * @enum InterpolationAlgorithmType
 * @description  插值分析所采用算法的类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.InterpolationAlgorithmType.KRIGING;
 *
 * </script>
 * // ES6 Import
 * import { InterpolationAlgorithmType } from '{npm}';
 *
 * const result = InterpolationAlgorithmType.KRIGING;
 * ```
 */
var InterpolationAlgorithmType = {
    /** 普通克吕金插值法。 */
    KRIGING: "KRIGING",
    /** 简单克吕金插值法。 */
    SimpleKriging: "SimpleKriging",
    /** 泛克吕金插值法。 */
    UniversalKriging: "UniversalKriging"
};

/**
 * @enum VariogramMode
 * @description  克吕金（Kriging）插值时的半变异函数类型枚举。<br>
 * 指数函数：适用于空间相关关系随样本间距的增加呈指数递减的情况，其空间自相关关系在样本间距的无穷远处完全消失。<br>
 * 高斯函数：适用于空间自相关关系随样本间距的增加而逐渐减少，直到超出一定的距离时空间自相关关系消失的情况。<br>
 * 球形函数：适用于半变异函数值渐进地逼近基台值的情况。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.VariogramMode.EXPONENTIAL;
 *
 * </script>
 * // ES6 Import
 * import { VariogramMode } from '{npm}';
 *
 * const result = VariogramMode.EXPONENTIAL;
 * ```
 */
var VariogramMode = {
    /** 指数函数。 */
    EXPONENTIAL: "EXPONENTIAL",
    /** 高斯函数。 */
    GAUSSIAN: "GAUSSIAN",
    /** 球型函数。 */
    SPHERICAL: "SPHERICAL"
};

/**
 * @enum Exponent
 * @description  定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Exponent.EXP1;
 *
 * </script>
 * // ES6 Import
 * import { Exponent } from '{npm}';
 *
 * const result = Exponent.EXP1;
 * ```
 */
var Exponent = {
    /** 阶数为1。 */
    EXP1: "EXP1",
    /** 阶数为2。 */
    EXP2: "EXP2"
};

/**
 * @enum ClientType
 * @description token 申请的客户端标识类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ClientType.IP;
 *
 * </script>
 * // ES6 Import
 * import { ClientType } from '{npm}';
 *
 * const result = ClientType.IP;
 * ```
 */
var ClientType = {
    /** 指定的 IP 地址。 */
    IP: "IP",
    /** 指定的 URL。 */
    REFERER: "Referer",
    /** 发送申请令牌请求的客户端 IP。 */
    REQUESTIP: "RequestIP",
    /** 不做任何验证。 */
    NONE: "NONE",
    /** 服务端。 */
    SERVER: "SERVER",
    /** 浏览器端。 */
    WEB: "WEB"
};

/**
 * @enum ChartType
 * @description 客户端专题图图表类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ChartType.BAR;
 *
 * </script>
 * // ES6 Import
 * import { ChartType } from '{npm}';
 *
 * const result = ChartType.BAR;
 * ```
 */
var ChartType = {
    /** 柱状图。 */
    BAR: "Bar",
    /** 三维柱状图。 */
    BAR3D: "Bar3D",
    /** 圆形图。 */
    CIRCLE: "Circle",
    /** 饼图。 */
    PIE: "Pie",
    /** 散点图。 */
    POINT: "Point",
    /** 折线图。 */
    LINE: "Line",
    /** 环状图。 */
    RING: "Ring"
};

/**
 * @enum ClipAnalystMode
 * @description  裁剪分析模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ClipAnalystMode.CLIP;
 *
 * </script>
 * // ES6 Import
 * import { ClipAnalystMode } from '{npm}';
 *
 * const result = ClipAnalystMode.CLIP;
 * ```
 */
var ClipAnalystMode = {
    /** 裁剪分析操作。 */
    CLIP: "clip",
    /** 求交分析操作。 */
    INTERSECT: "intersect"
};

/**
 * @enum AnalystAreaUnit
 * @description 分布式分析的面积单位。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AnalystAreaUnit.SQUAREMETER;
 *
 * </script>
 * // ES6 Import
 * import { AnalystAreaUnit } from '{npm}';
 *
 * const result = AnalystAreaUnit.SQUAREMETER;
 * ```
 */
var AnalystAreaUnit = {
    /** 平方米。 */
    "SQUAREMETER": "SquareMeter",
    /** 平方千米。 */
    "SQUAREKILOMETER": "SquareKiloMeter",
    /** 公顷。 */
    "HECTARE": "Hectare",
    /** 公亩。 */
    "ARE": "Are",
    /** 英亩。 */
    "ACRE": "Acre",
    /** 平方英尺。 */
    "SQUAREFOOT": "SquareFoot",
    /** 平方码。 */
    "SQUAREYARD": "SquareYard",
    /** 平方英里。 */
    "SQUAREMILE": "SquareMile"
};

/**
 * @enum AnalystSizeUnit
 * @description 分布式分析单位。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AnalystSizeUnit.METER;
 *
 * </script>
 * // ES6 Import
 * import { AnalystSizeUnit } from '{npm}';
 *
 * const result = AnalystSizeUnit.METER;
 * ```
 */
var AnalystSizeUnit = {
    /** 米。 */
    "METER": "Meter",
    /** 千米。 */
    "KILOMETER": "Kilometer",
    /** 码。 */
    "YARD": "Yard",
    /** 英尺。 */
    "FOOT": "Foot",
    /** 英里。 */
    "MILE": "Mile"
};

/**
 * @enum StatisticAnalystMode
 * @description 分布式分析统计模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.StatisticAnalystMode.MAX;
 *
 * </script>
 * // ES6 Import
 * import { StatisticAnalystMode } from '{npm}';
 *
 * const result = StatisticAnalystMode.MAX;
 * ```
 */
var StatisticAnalystMode = {
    /** 统计所选字段的最大值。 */
    "MAX": "max",
    /** 统计所选字段的最小值。 */
    "MIN": "min",
    /** 统计所选字段的平均值。 */
    "AVERAGE": "average",
    /** 统计所选字段的总和。 */
    "SUM": "sum",
    /** 统计所选字段的方差。 */
    "VARIANCE": "variance",
    /** 统计所选字段的标准差。 */
    "STDDEVIATION": "stdDeviation"
};

/**
 * @enum SummaryType
 * @description 分布式分析聚合类型。该枚举定义了点聚合分析中点要素的划分和聚合方式。
 * 点聚合分析是指针对点数据集制作聚合图的一种空间分析作业。通过格网面或多边形对地图点要素进行划分，
 * 然后，计算每个面对象内点要素的数量，并作为面对象的统计值，也可以引入点的权重信息，
 * 考虑面对象内点的加权值作为面对象的统计值；最后基于面对象的统计值，按照统计值大小排序的结果，通过色带对面对象进行色彩填充。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SummaryType.SUMMARYMESH;
 *
 * </script>
 * // ES6 Import
 * import { SummaryType } from '{npm}';
 *
 * const result = SummaryType.SUMMARYMESH;
 * ```
 */
var SummaryType = {
    /** 格网聚合。 */
    "SUMMARYMESH": "SUMMARYMESH",
    /** 多边形聚合。 */
    "SUMMARYREGION": "SUMMARYREGION"
};

/**
 * @enum TopologyValidatorRule
 * @description  拓扑检查模规则枚举。该类定义了拓扑检查操作模式常量。
 * 拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TopologyValidatorRule.REGIONNOOVERLAP;
 *
 * </script>
 * // ES6 Import
 * import { TopologyValidatorRule } from '{npm}';
 *
 * const result = TopologyValidatorRule.REGIONNOOVERLAP;
 * ```
 */
var TopologyValidatorRule = {
    /** 面内无重叠，用于对面数据进行拓扑检查。 */
    REGIONNOOVERLAP: "REGIONNOOVERLAP",
    /** 面与面无重叠，用于对面数据进行拓扑检查。 */
    REGIONNOOVERLAPWITH: "REGIONNOOVERLAPWITH",
    /** 面被面包含，用于对面数据进行拓扑检查。 */
    REGIONCONTAINEDBYREGION: "REGIONCONTAINEDBYREGION",
    /** 面被面覆盖，用于对面数据进行拓扑检查。 */
    REGIONCOVEREDBYREGION: "REGIONCOVEREDBYREGION",
    /** 线与线无重叠，用于对线数据进行拓扑检查。 */
    LINENOOVERLAP: "LINENOOVERLAP",
    /** 线内无重叠，用于对线数据进行拓扑检查。 */
    LINENOOVERLAPWITH: "LINENOOVERLAPWITH",
    /** 点不相同，用于对点数据进行拓扑检查。 */
    POINTNOIDENTICAL: "POINTNOIDENTICAL"
};

/**
 * @enum BucketAggType
 * @description  格网聚合查询枚举类，该类定义了 Elasticsearch 数据服务中聚合查询模式常量。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BucketAggType.GEOHASH_GRID;
 *
 * </script>
 * // ES6 Import
 * import { BucketAggType } from '{npm}';
 *
 * const result = BucketAggType.GEOHASH_GRID;
 * ```
 */
var BucketAggType = {
    /** 格网聚合类型。 */
    GEOHASH_GRID: "geohash_grid"
};

/**
 * @enum MetricsAggType
 * @description  指标聚合类型枚举类，该类定义了 Elasticsearch 数据服务中聚合查询模式常量。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.MetricsAggType.AVG;
 *
 * </script>
 * // ES6 Import
 * import { MetricsAggType } from '{npm}';
 *
 * const result = MetricsAggType.AVG;
 * ```
 */
var MetricsAggType = {
  /** 平均值聚合类型。 */
  AVG:'avg',
  /** 最大值聚合类型。 */
  MAX:'max',
  /** 最小值聚合类型。 */
  MIN:'min',
  /** 求和聚合类型。 */
  SUM:'sum'
};

/**
 * @enum GetFeatureMode
 * @description 数据查询的模式（获取要素的方式）枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GetFeatureMode.BOUNDS;
 *
 * </script>
 * // ES6 Import
 * import { GetFeatureMode } from '{npm}';
 *
 * const result = GetFeatureMode.BOUNDS;
 * ```
 */
var GetFeatureMode = {
    /** 通过范围查询来获取要素。 */
    BOUNDS: "BOUNDS",
    /** 通过几何对象的缓冲区来获取要素。 */
    BUFFER: "BUFFER",
    /** 通过 ID 来获取要素。 */
    ID: "ID",
    /** 通过空间查询模式来获取要素。 */
    SPATIAL: "SPATIAL",
    /** 通过 SQL 查询来获取要素。 */
    SQL: 'SQL'
}

/**
 * @enum RasterFunctionType
 * @description 栅格分析方法。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GetFeatureMode.NDVI;
 *
 * </script>
 * // ES6 Import
 * import { GetFeatureMode } from '{npm}';
 *
 * const result = GetFeatureMode.NDVI;
 * ```
 */
var RasterFunctionType = {
    /** 归一化植被指数。 */
    NDVI: "NDVI",
    /** 阴影面分析。 */
    HILLSHADE: "HILLSHADE"
}

/**
 * @enum ResourceType
 * @description SuperMap iPortal 资源类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GetFeatureMode.MAP;
 *
 * </script>
 * // ES6 Import
 * import { GetFeatureMode } from '{npm}';
 *
 * const result = GetFeatureMode.MAP;
 * ```
 */
var ResourceType = {
    /** 地图资源。 */
    MAP: "MAP",
    /** 服务资源。 */
    SERVICE: "SERVICE",
    /** 三维场景资源。 */
    SCENE: "SCENE",
    /** 数据资源。 */
    DATA: "DATA",
    /** 数据洞察资源。 */
    INSIGHTS_WORKSPACE: "INSIGHTS_WORKSPACE",
    /** 地图大屏资源。 */
    MAP_DASHBOARD: "MAP_DASHBOARD"
}

/**
 * @enum OrderBy
 * @description SuperMap iPortal 资源排序字段。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OrderBy.UPDATETIME;
 *
 * </script>
 * // ES6 Import
 * import { OrderBy } from '{npm}';
 *
 * const result = OrderBy.UPDATETIME;
 * ```
 */
var OrderBy = {
    /** 按更新时间排序。 */
    UPDATETIME: "UPDATETIME",
    /** 按热度(可能是访问量、下载量)排序。 */
    HEATLEVEL: "HEATLEVEL",
    /** 按相关性排序。 */
    RELEVANCE: "RELEVANCE"
}

/**
 * @enum OrderType
 * @description SuperMap iPortal 资源升序还是降序过滤。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OrderType.ASC;
 *
 * </script>
 * // ES6 Import
 * import { OrderType } from '{npm}';
 *
 * const result = OrderType.ASC;
 * ```
 */
var OrderType = {
    /** 升序过滤。 */
    ASC: "ASC",
    /** 降序过滤。 */
    DESC: "DESC"
}

/**
 * @enum SearchType
 * @description 对 SuperMap iPortal 资源查询的范围进行过滤。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SearchType.PUBLIC;
 *
 * </script>
 * // ES6 Import
 * import { SearchType } from '{npm}';
 *
 * const result = SearchType.PUBLIC;
 * ```
 */
var SearchType = {
    /** 公开资源。 */
    PUBLIC: "PUBLIC",
    /** 我的资源。 */
    MY_RES: "MY_RES",
    /** 我的群组资源。 */
    MYGROUP_RES: "MYGROUP_RES",
    /** 我的部门资源。 */
    MYDEPARTMENT_RES: "MYDEPARTMENT_RES",
    /** 分享给我的资源。 */
    SHARETOME_RES: "SHARETOME_RES"
}

/**
 * @enum AggregationTypes
 * @description SuperMap iPortal 资源支持的聚合查询类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AggregationTypes.TAG;
 *
 * </script>
 * // ES6 Import
 * import { AggregationTypes } from '{npm}';
 *
 * const result = AggregationTypes.TAG;
 * ```
 */
var AggregationTypes = {
    /** 标签聚合。 */
    TAG: "TAG",
    /** 资源类型聚合。 */
    TYPE: "TYPE"
}

/**
 * @enum PermissionType
 * @description SuperMap iPortal 资源权限类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.PermissionType.SEARCH;
 *
 * </script>
 * // ES6 Import
 * import { PermissionType } from '{npm}';
 *
 * const result = PermissionType.SEARCH;
 * ```
 */
var PermissionType = {
    /** 可检索。 */
    SEARCH:"SEARCH",
    /** 可查看。 */
    READ: "READ",
    /** 可编辑。 */
    READWRITE: "READWRITE",
    /** 可删除。 */
    DELETE: "DELETE",
    /** 可下载，包括可查看、可检索。 */
    DOWNLOAD:"DOWNLOAD"
}

/**
 * @enum EntityType
 * @description SuperMap iPortal 资源实体类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.EntityType.DEPARTMENT;
 *
 * </script>
 * // ES6 Import
 * import { EntityType } from '{npm}';
 *
 * const result = EntityType.DEPARTMENT;
 * ```
 */
var EntityType = {
    /** 部门。 */
    DEPARTMENT: "DEPARTMENT",
    /** 用户组。 */
    GROUP: "GROUP",
    /** 群组。 */
    IPORTALGROUP: "IPORTALGROUP",
    /** 角色。 */
    ROLE: "ROLE",
    /** 用户。 */
    USER: "USER"
}

/**
 * @enum DataItemType
 * @description SuperMap iPortal 数据类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DataItemType.GEOJSON;
 *
 * </script>
 * // ES6 Import
 * import { DataItemType } from '{npm}';
 *
 * const result = DataItemType.GEOJSON;
 * ```
 */
var DataItemType = {
    /** GeoJSON 数据。 */
    GEOJSON: "GEOJSON",
    /** UGCV5_MVT 矢量瓦片。 */
    UGCV5_MVT: "UGCV5_MVT",
    /** JSON 数据。  */
    JSON: "JSON",
    /** 音频文件。 */
    AUDIO: "AUDIO",
    /** Color 颜色。 */
    COLOR: "COLOR",
    /** ColorScheme 颜色方案。 */
    COLORSCHEME: "COLORSCHEME",
    /** CSV 数据。 */
    CSV: "CSV",
    /** EXCEL 数据。 */
    EXCEL: "EXCEL",
    /** FillSymbol 填充符号库。 */
    FILLSYMBOL: "FILLSYMBOL",
    /** 图片类型。 */
    IMAGE: "IMAGE",
    /** LayerTemplate 图层模板。 */
    LAYERTEMPLATE: "LAYERTEMPLATE",
    /** LayoutTemplate 布局模板。 */
    LAYOUTTEMPLATE: "LAYOUTTEMPLATE",
    /** LineSymbol 线符号库。 */
    LINESYMBOL: "LINESYMBOL",
    /** MapTemplate 地图模板。 */
    MAPTEMPLATE: "MAPTEMPLATE",
    /** MarkerSymbol 点符号库。 */
    MARKERSYMBOL: "MARKERSYMBOL",
    /** MBTiles 地图瓦片。 */
    MBTILES: "MBTILES",
    /** 照片。 */
    PHOTOS: "PHOTOS",
    /** SHP 空间数据。 */
    SHP: "SHP",
    /** SMTiles 地图瓦片。 */
    SMTILES: "SMTILES",
    /** SVTiles 地图瓦片。 */
    SVTILES: "SVTILES",
    /** ThemeTemplate 专题图模板。 */
    THEMETEMPLATE: "THEMETEMPLATE",
    /** ArcGIS TPK 瓦片。 */
    TPK: "TPK",
    /** UDB 数据源。 */
    UDB: "UDB",
    /** UGCV5 矢量瓦片。 */
    UGCV5: "UGCV5",
    /** 其他类型（普通文件）。 */
    UNKNOWN: "UNKNOWN",
    /** 视频文件。 */
    VIDEO: "VIDEO",
    /** WorkEnviroment 工作环境。 */
    WORKENVIRONMENT: "WORKENVIRONMENT",
    /** 工作空间。 */
    WORKSPACE: "WORKSPACE"
}

/**
 * @enum WebExportFormatType
 * @description Web 打印输出的格式。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebExportFormatType.PNG;
 *
 * </script>
 * // ES6 Import
 * import { WebExportFormatType } from '{npm}';
 *
 * const result = WebExportFormatType.PNG;
 * ```
 */
var WebExportFormatType = {
    /** PNG */
    PNG: "PNG",
    /** PDF */
    PDF: "PDF"
}

/**
 * @enum WebScaleOrientationType
 * @description Web 比例尺的方位样式。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebScaleOrientationType.HORIZONTALLABELSBELOW;
 *
 * </script>
 * // ES6 Import
 * import { WebScaleOrientationType } from '{npm}';
 *
 * const result = WebScaleOrientationType.HORIZONTALLABELSBELOW;
 * ```
 */
var WebScaleOrientationType = {
    /** 位于地图上侧的水平方向标签。 */
    HORIZONTALLABELSBELOW: "HORIZONTALLABELSBELOW",
    /** 位于地图下侧的水平方向标签。 */
    HORIZONTALLABELSABOVE: "HORIZONTALLABELSABOVE",
    /** 位于地图左侧的垂直方向标签。 */
    VERTICALLABELSLEFT: "VERTICALLABELSLEFT",
    /** 位于地图右侧的垂直方向标签。 */
    VERTICALLABELSRIGHT: "VERTICALLABELSRIGHT"
}

/**
 * @enum WebScaleType
 * @description Web 比例尺的样式。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebScaleType.LINE;
 *
 * </script>
 * // ES6 Import
 * import { WebScaleType } from '{npm}';
 *
 * const result = WebScaleType.LINE;
 * ```
 */
var WebScaleType = {
    /** line. */
    LINE: "LINE",
    /** bar. */
    BAR: "BAR",
    /** bar sub. */
    BAR_SUB: "BAR_SUB"
}

/**
 * @enum WebScaleUnit
 * @description Web 打印中地图比例尺的单位制。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebScaleUnit.METER;
 *
 * </script>
 * // ES6 Import
 * import { WebScaleUnit } from '{npm}';
 *
 * const result = WebScaleUnit.METER;
 * ```
 */
var WebScaleUnit = {
    /** 米。 */
    METER: "METER",
    /** 英尺。 */
    FOOT: "FOOT",
    /** 度。 */
    DEGREES: "DEGREES"
}

/**
 * @enum BoundsType
 * @description 范围类型。
 * @category BaseTypes Constant
 * @version 11.1.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BoundsType.UNION;
 *
 * </script>
 * // ES6 Import
 * import { BoundsType } from '{npm}';
 *
 * const result = BoundsType.UNION;
 * ```
 */
var BoundsType = {
  /** 自定义范围。 */
  CUSTOM: "CUSTOM",
  /** 输入栅格数据集范围的交集。 */
  INTERSECTION: "INTERSECTION",
  /** 输入栅格数据集范围的并集。 */
  UNION: "UNION"
}

/**
 * @enum CellSizeType
 * @description 单元格大小类型。
 * @category BaseTypes Constant
 * @version 11.1.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.CellSizeType.MAX;
 *
 * </script>
 * // ES6 Import
 * import { CellSizeType } from '{npm}';
 *
 * const result = CellSizeType.MAX;
 * ```
 */
var CellSizeType = {
  /** 将用户自己输入的单元格值大小作为单元格大小类型。 */
  CUSTOM: "CUSTOM",
  /** 输入栅格数据集中单元格最大值作为单元格大小类型。*/
  MAX : "MAX",
  /** 输入栅格数据集中单元格最小值作为单元格大小类型。 */
  MIN : "MIN"
}

/**
 * @enum ColourModeChart
 * @description 颜色模式的类型。
 * @category BaseTypes Constant
 * @version 11.2.0
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ColourModeChart.DAY_BRIGHT;
 *
 * </script>
 * // ES6 Import
 * import { ColourModeChart } from '{npm}';
 *
 * const result = ColourModeChart.DAY_BRIGHT;
 * ```
 */
var ColourModeChart = {
  /** 白昼模式。 */
  DAY_BRIGHT: "DAY_BRIGHT",
  /** 晨昏模式。*/
  DUSK : "DUSK",
  /** 夜晚模式。 */
  NIGHT : "NIGHT"
}

/**
 * @enum DisplayModeChart
 * @description 海图显示模式的类型。
 * @category BaseTypes Constant
 * @version 11.2.0
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DisplayModeChart.STANDARD;
 *
 * </script>
 * // ES6 Import
 * import { DisplayModeChart } from '{npm}';
 *
 * const result = DisplayModeChart.STANDARD;
 * ```
 */
var DisplayModeChart = {
  /** 基本显示模式 */
  BASIC: "BASIC",
  /** 标准显示模式*/
  STANDARD : "STANDARD",
  /** 其他显示模式。 */
  OTHER : "OTHER"
}

export {
    DataFormat,
    ServerType,
    GeometryType,
    QueryOption,
    JoinType,
    SpatialQueryMode,
    SpatialRelationType,
    MeasureMode,
    Unit,
    BufferRadiusUnit,
    EngineType,
    ThemeGraphTextFormat,
    ThemeGraphType,
    GraphAxesTextDisplayMode,
    GraduatedMode,
    RangeMode,
    ThemeType,
    ColorGradientType,
    TextAlignment,
    FillGradientMode,
    AlongLineDirection,
    LabelBackShape,
    LabelOverLengthMode,
    DirectionType,
    SideType,
    SupplyCenterType,
    TurnType,
    BufferEndType,
    OverlayOperationType,
    OutputType,
    SmoothMethod,
    SurfaceAnalystMethod,
    DataReturnMode,
    EditType,
    TransferTactic,
    TransferPreference,
    GridType,
    ColorSpaceType,
    LayerType,
    UGCLayerType,
    StatisticMode,
    PixelFormat,
    SearchMode,
    InterpolationAlgorithmType,
    VariogramMode,
    Exponent,
    ClientType,
    ChartType,
    ClipAnalystMode,
    AnalystAreaUnit,
    AnalystSizeUnit,
    StatisticAnalystMode,
    SummaryType,
    TopologyValidatorRule,
    BucketAggType,
    MetricsAggType,
    GetFeatureMode,
    RasterFunctionType,
    ResourceType,
    OrderBy,
    OrderType,
    SearchType,
    AggregationTypes,
    PermissionType,
    EntityType,
    DataItemType,
    WebExportFormatType,
    WebScaleOrientationType,
    WebScaleType,
    WebScaleUnit,
    BoundsType,
    CellSizeType,
    ColourModeChart,
    DisplayModeChart
}
