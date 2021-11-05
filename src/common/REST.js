/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

 /**
 * @enum DataFormat
 * @memberOf SuperMap
 * @description 服务请求返回结果数据类型
 * @type {string}
 */
var DataFormat = {
    /** GEOJSON */
    GEOJSON: "GEOJSON",
    /** ISERVER */
    ISERVER: "ISERVER"
};

/**
 * @enum ServerType
 * @memberOf SuperMap
 * @description 服务器类型
 * @type {string}
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
 * @memberOf SuperMap
 * @description 几何对象枚举,定义了一系列几何对象类型。
 * @type {string}
 */
var GeometryType = {
    /** LINE */
    LINE: "LINE",
    /** LINEM */
    LINEM: "LINEM",
    /** POINT */
    POINT: "POINT",
    /** REGION */
    REGION: "REGION",
    /** POINTEPS */
    POINTEPS: "POINTEPS",
    /** LINEEPS */
    LINEEPS: "LINEEPS",
    /** REGIONEPS */
    REGIONEPS: "REGIONEPS",
    /** ELLIPSE */
    ELLIPSE: "ELLIPSE",
    /** CIRCLE */
    CIRCLE: "CIRCLE",
    /** TEXT */
    TEXT: "TEXT",
    /** RECTANGLE */
    RECTANGLE: "RECTANGLE",
    /** UNKNOWN */
    UNKNOWN: "UNKNOWN",
    /** GEOCOMPOUND */
    GEOCOMPOUND:"GEOCOMPOUND"
};

/**
 * @enum QueryOption
 * @memberOf SuperMap
 * @description 查询结果类型枚举,描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 * @type {string}
 */
var QueryOption = {
    /** 属性 */
    ATTRIBUTE: "ATTRIBUTE",
    /** 属性和几何对象 */
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    /** 几何对象 */
    GEOMETRY: "GEOMETRY"
};

/**
 * @enum JoinType
 * @memberOf SuperMap
 * @description 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 * @type {string}
 */
var JoinType = {
    /** INNERJOIN */
    INNERJOIN: "INNERJOIN",
    /** LEFTJOIN */
    LEFTJOIN: "LEFTJOIN"
};

/**
 * @enum SpatialQueryMode
 * @memberOf SuperMap
 * @description  空间查询模式枚举。该类定义了空间查询操作模式常量。
 * @type {string}
 */
var SpatialQueryMode = {
    /** 包含空间查询模式 */
    CONTAIN: "CONTAIN",
    /** 交叉空间查询模式 */
    CROSS: "CROSS",
    /** 分离空间查询模式 */
    DISJOINT: "DISJOINT",
    /** 重合空间查询模式 */
    IDENTITY: "IDENTITY",
    /** 相交空间查询模式 */
    INTERSECT: "INTERSECT",
    /** 无空间查询 */
    NONE: "NONE",
    /** 叠加空间查询模式 */
    OVERLAP: "OVERLAP",
    /** 邻接空间查询模式 */
    TOUCH: "TOUCH",
    /** 被包含空间查询模式 */
    WITHIN: "WITHIN"
};

/**
 * @enum SpatialRelationType
 * @memberOf SuperMap
 * @description  数据集对象间的空间关系枚举。
 * 该类定义了数据集对象间的空间关系类型常量。
 * @type {string}
 */
var SpatialRelationType = {
    /** 包含关系 */
    CONTAIN: "CONTAIN",
    /** 相交关系 */
    INTERSECT: "INTERSECT",
    /** 被包含关系 */
    WITHIN: "WITHIN"
};

/**
 * @enum MeasureMode
 * @memberOf SuperMap
 * @type {string}
 * @description  量算模式枚举。
 * 该类定义了两种测量模式：距离测量和面积测量。
 */
var MeasureMode = {
    /** 距离测量 */
    DISTANCE: "DISTANCE",
    /** 面积测量 */
    AREA: "AREA"
};

/**
 * @enum Unit
 * @memberOf SuperMap
 * @description  距离单位枚举。
 * 该类定义了一系列距离单位类型。
 * @type {string}
 */
var Unit = {
    /**  米 */
    METER: "METER",
    /**  千米 */
    KILOMETER: "KILOMETER",
    /**  英里 */
    MILE: "MILE",
    /**  码 */
    YARD: "YARD",
    /**  度 */
    DEGREE: "DEGREE",
    /**  毫米 */
    MILLIMETER: "MILLIMETER",
    /**  厘米 */
    CENTIMETER: "CENTIMETER",
    /**  英寸 */
    INCH: "INCH",
    /**  分米 */
    DECIMETER: "DECIMETER",
    /**  英尺 */
    FOOT: "FOOT",
    /**  秒 */
    SECOND: "SECOND",
    /**  分 */
    MINUTE: "MINUTE",
    /**  弧度 */
    RADIAN: "RADIAN"
};

/**
 * @enum BufferRadiusUnit
 * @memberOf SuperMap
 * @description  缓冲区距离单位枚举。
 * 该类定义了一系列缓冲距离单位类型。
 * @type {string}
 */
var BufferRadiusUnit = {
    /**  厘米 */
    CENTIMETER: "CENTIMETER",
    /**  分米 */
    DECIMETER: "DECIMETER",
    /**  英尺 */
    FOOT: "FOOT",
    /**  英寸 */
    INCH: "INCH",
    /**  千米 */
    KILOMETER: "KILOMETER",
    /**  米 */
    METER: "METER",
    /**  英里 */
    MILE: "MILE",
    /**  毫米 */
    MILLIMETER: "MILLIMETER",
    /**  码 */
    YARD: "YARD"
}

/**
 * @enum EngineType
 * @memberOf SuperMap
 * @description  数据源引擎类型枚举。
 * @type {string}
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
    /**  SQL Server 引擎类型，针对 SQL Server 数据源，数据库引擎 */
    SQLPLUS: "SQLPLUS",
    /**  UDB 引擎类型，文件引擎。 */
    UDB: "UDB"
};

/**
 * @enum ThemeGraphTextFormat
 * @memberOf SuperMap
 * @description  统计专题图文本显示格式枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  统计专题图类型枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  统计专题图坐标轴文本显示模式。
 * @type {string}
 */
var GraphAxesTextDisplayMode = {
    /**  显示全部文本。 */
    ALL: "ALL",
    /**  不显示。 */
    NONE: "NONE",
    /**  显示Y轴的文本。 */
    YAXES: "YAXES"
};

/**
 * @enum GraduatedMode
 * @memberOf SuperMap
 * @description  专题图分级模式枚举。
 *
 * @type {string}
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
 * @memberOf SuperMap
 * @description  范围分段专题图分段方式枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  专题图类型枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  渐变颜色枚举。
 * @type {string}
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
    /** 地形渐变,用于三维显示效果较好。 */
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
 * @memberOf SuperMap
 * @description  文本对齐枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  渐变填充风格的渐变类型枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  标签沿线标注方向枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  标签专题图中标签背景的形状枚举。
 * @type {string}
 */
var LabelBackShape = {
    /** 菱形背景，即标签背景的形状为菱形。 */
    DIAMOND: "DIAMOND",
    /** 椭圆形背景，即标签背景的行状为椭圆形。 */
    ELLIPSE: "ELLIPSE",
    /** 符号背景，即标签背景的形状为设定的符号。 */
    MARKER: "MARKER",
    /** 空背景，即不使用任何形状作为标签的背景。 */
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
 * @memberOf SuperMap
 * @description  标签专题图中超长标签的处理模式枚举。
 * @type {string}
 */
var LabelOverLengthMode = {
    /** 换行显示。 */
    NEWLINE: "NEWLINE",
    /** 对超长标签不进行处理。 */
    NONE: "NONE",
    /** 省略超出部分。 */
    OMIT: "OMIT"
};

/**
 * @enum DirectionType
 * @memberOf SuperMap
 * @description  网络分析中方向枚举。
 * 在行驶引导子项中使用。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  行驶位置枚举。
 * 表示在行驶在路的左边、右边或者路上的枚举,该类用在行驶导引子项类中。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  资源供给中心类型枚举。
 * 该枚举定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析； 固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 * @type {string}
 */
var SupplyCenterType = {
    /** 固定中心点。 */
    FIXEDCENTER: "FIXEDCENTER",
    /** 非中心点。 */
    NULL: "NULL",
    /** 可选中心点。 */
    OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * @enum TurnType
 * @memberOf SuperMap
 * @description  转弯方向枚举。
 * 用在行驶引导子项类中，表示转弯的方向。
 * @type {string}
 */
var TurnType = {
    /** 向前直行。 */
    AHEAD: "AHEAD",
    /** 掉头。 */
    BACK: "BACK",
    /** 终点，不拐弯。 */
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
 * @memberOf SuperMap
 * @description  缓冲区分析BufferEnd类型。
 * @type {string}
 */
var BufferEndType = {
    /** FLAT */
    FLAT: "FLAT",
    /** ROUND */
    ROUND: "ROUND"
};
/**
 * @enum OverlayOperationType
 * @memberOf SuperMap
 * @description  叠加分析类型枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  分布式分析输出类型枚举。
 * @type {string}
 */
var OutputType =  {
    /** INDEXEDHDFS */
    INDEXEDHDFS: "INDEXEDHDFS",
    /** UDB */
    UDB: "UDB",
    /** MONGODB */
    MONGODB: "MONGODB",
    /** PG */
    PG: "PG"
};

/**
 * @enum SmoothMethod
 * @memberOf SuperMap
 * @description  光滑方法枚举。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 * @type {string}
 */
 var SmoothMethod = {
    /** B 样条法。 */
    BSPLINE: "BSPLINE",
    /** 磨角法。 */
    POLISH: "POLISH"
};

/**
 * @enum SurfaceAnalystMethod
 * @memberOf SuperMap
 * @description  表面分析方法枚举。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 * @type {string}
 */
var SurfaceAnalystMethod = {
    /** 等值线提取。 */
    ISOLINE: "ISOLINE",
    /** 等值面提取。 */
    ISOREGION: "ISOREGION"
};

/**
 * @enum DataReturnMode
 * @memberOf SuperMap
 * @description  数据返回模式枚举。
 * 该枚举用于指定空间分析返回结果模式,包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  要素集更新模式枚举。
 * 该枚举用于指定数据服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  公交换乘策略枚举。
 * 该枚举用于指定公交服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 * @type {string}
 */
var TransferTactic = {
    /** 时间短。 */
    LESS_TIME: "LESS_TIME",
    /** 少换乘。 */
    LESS_TRANSFER: "LESS_TRANSFER",
    /** 少步行。 */
    LESS_WALK: "LESS_WALK",
    /** 距离最短。 */
    MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * @enum TransferPreference
 * @memberOf SuperMap
 * @description  公交换乘策略枚举。
 * 该枚举用于指定交通换乘服务中设置地铁优先、公交优先、不乘地铁、无偏好等偏好设置。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  地图背景格网类型枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 * @type {string}
 */
var ColorSpaceType = {
    /** 该类型主要在印刷系统使用。 */
    CMYK: "CMYK",
    /** 该类型主要在显示系统中使用。 */
    RGB: "RGB"
};

/**
 * @enum LayerType
 * @memberOf SuperMap
 * @description  图层类型。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  UGC图层类型。
 * @type {string}
 */
var UGCLayerType = {
    /** 专题图层。 */
    THEME: "THEME",
    /** 矢量图层。 */
    VECTOR: "VECTOR",
    /** 栅格图层。。 */
    GRID: "GRID",
    /** 影像图层。 */
    IMAGE: "IMAGE"
};

/**
 * @enum StatisticMode
 * @memberOf SuperMap
 * @description  字段统计方法类型。
 * @type {string}
 */
var StatisticMode = {
    /** 统计所选字段的平均值。 */
    AVERAGE: "AVERAGE",
    /** 统计所选字段的最大值。 */
    MAX: "MAX",
    /** 统计所选字段的最小值。 */
    MIN: "MIN",
    /** 统计所选字段的标准差 */
    STDDEVIATION: "STDDEVIATION",
    /** 统计所选字段的总和。 */
    SUM: "SUM",
    /** 统计所选字段的方差。 */
    VARIANCE: "VARIANCE"
};

/**
 * @enum PixelFormat
 * @memberOf SuperMap
 * @description  栅格与影像数据存储的像素格式枚举。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  内插时使用的样本点的查找方式枚举
 * @type {string}
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
 * @memberOf SuperMap
 * @description  插值分析的算法的类型
 * @type {string}
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
 * @memberOf SuperMap
 * @description  克吕金（Kriging）插值时的半变函数类型枚举
 * @type {string}
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
 * @memberOf SuperMap
 * @description  定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数
 * @type {string}
 */
var Exponent = {
    /** 阶数为1。 */
    EXP1: "EXP1",
    /** 阶数为2。 */
    EXP2: "EXP2"
};

/**
 * @enum ClientType
 * @memberOf SuperMap
 * @description token申请的客户端标识类型
 * @type {string}
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
    /** SERVER。 */
    SERVER: "SERVER",
    /** WEB。 */
    WEB: "WEB"
};

/**
 * @enum ChartType
 * @memberOf SuperMap
 * @description 客户端专题图图表类型
 * @type {string}
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
 * @memberOf SuperMap
 * @description  裁剪分析模式
 * @type {string}
 */
var ClipAnalystMode = {
    /** CLIP。 */
    CLIP: "clip",
    /** INTERSECT。 */
    INTERSECT: "intersect"
};

/**
 * @enum AnalystAreaUnit
 * @memberOf SuperMap
 * @description 分布式分析面积单位
 * @type {string}
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
 * @memberOf SuperMap
 * @description 分布式分析单位
 * @type {string}
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
 * @memberOf SuperMap
 * @description 分布式分析统计模式
 * @type {string}
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
    /** 统计所选字段的标准差 */
    "STDDEVIATION": "stdDeviation"
};

/**
 * @enum SummaryType
 * @memberOf SuperMap
 * @description 分布式分析聚合类型
 * @type {string}
 */
var SummaryType = {
    /** 格网聚合。 */
    "SUMMARYMESH": "SUMMARYMESH",
    /** 多边形聚合。 */
    "SUMMARYREGION": "SUMMARYREGION"
};

/**
 * @enum TopologyValidatorRule
 * @memberOf SuperMap
 * @description  拓扑检查模式枚举。该类定义了拓扑检查操作模式常量。
 * @type {string}
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
 * @memberOf SuperMap
 * @description  格网聚合查询枚举类，该类定义了Elasticsearch数据服务中聚合查询模式常量
 * @type {string}
 */
var BucketAggType = {
    /** 格网聚合类型 */
    GEOHASH_GRID: "geohash_grid"
};

/**
 * @enum MetricsAggType
 * @memberOf SuperMap
 * @description  指标聚合类型枚举类，该类定义了Elasticsearch数据服务中聚合查询模式常量
 * @type {string}
 */
var MetricsAggType = {
  /** 平均值聚合类型 */
  AVG:'avg',
  /** 最大值聚合类型 */
  MAX:'max',
  /** 最小值聚合类型 */
  MIN:'min',
  /** 求和聚合类型 */
  SUM:'sum'
};

/**
 * @enum GetFeatureMode
 * @memberOf SuperMap
 * @description feature 查询方式。
 * @type {string}
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
 * @memberOf SuperMap
 * @description 栅格分析方法。
 * @type {string}
 */
var RasterFunctionType = {
    /** 归一化植被指数。 */
    NDVI: "NDVI",
    /** 阴影面分析。 */
    HILLSHADE: "HILLSHADE"
}

/**
 * @enum ResourceType
 * @memberOf SuperMap
 * @description iportal资源类型。
 * @version 10.0.1
 * @type {string}
 */
var ResourceType = {
    /** 地图。 */
    MAP: "MAP",
    /** 服务。 */
    SERVICE: "SERVICE",
    /** 场景。 */
    SCENE: "SCENE",
    /** 数据。 */
    DATA: "DATA",
    /** 洞察。 */
    INSIGHTS_WORKSPACE: "INSIGHTS_WORKSPACE",
    /** 大屏。 */
    MAP_DASHBOARD: "MAP_DASHBOARD"
}

/**
 * @enum OrderBy
 * @memberOf SuperMap
 * @description iportal资源排序字段。
 * @version 10.0.1
 * @type {string}
 */
var OrderBy = {
    /** 按更新时间排序 */
    UPDATETIME: "UPDATETIME",
    /** 按热度(可能是访问量、下载量)排序 */
    HEATLEVEL: "HEATLEVEL",
    /** 按相关性排序 */
    RELEVANCE: "RELEVANCE"
}

/**
 * @enum OrderType
 * @memberOf SuperMap
 * @description iportal资源升序还是降序过滤
 * @version 10.0.1
 * @type {string}
 */
var OrderType = {
    /** 升序 */
    ASC: "ASC",
    /** 降序 */
    DESC: "DESC"
}

/**
 * @enum SearchType
 * @memberOf SuperMap
 * @description iportal资源查询的范围进行过滤
 * @version 10.0.1
 * @type {string}
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
 * @memberOf SuperMap
 * @description iportal资源聚合查询的类型
 * @version 10.0.1
 * @type {string}
 */
var AggregationTypes = {
    /** 标签 */
    TAG: "TAG",
    /** 资源类型 */
    TYPE: "TYPE"
}

/**
 * @enum PermissionType
 * @memberOf SuperMap
 * @description iportal资源权限类型。
 * @version 10.0.1
 * @type {string}
 */
var PermissionType = {
    /** 可检索 */
    SEARCH:"SEARCH",
    /** 可查看 */
    READ: "READ",
    /** 可编辑 */
    READWRITE: "READWRITE",
    /** 可删除 */
    DELETE: "DELETE",
    /** 可下载，包括可读、可检索 */
    DOWNLOAD:"DOWNLOAD"
}

/**
 * @enum EntityType
 * @memberOf SuperMap
 * @description iportal资源实体类型。
 * @version 10.0.1
 * @type {string}
 */
var EntityType = {
    /** 部门 */
    DEPARTMENT: "DEPARTMENT",
    /** 用户组 */
    GROUP: "GROUP",
    /** 群组 */
    IPORTALGROUP: "IPORTALGROUP",
    /** 角色 */
    ROLE: "ROLE",
    /** 用户 */
    USER: "USER"
}

/**
 * @enum DataItemType
 * @memberOf SuperMap
 * @description iportal数据类型。
 * @version 10.0.1
 * @type {string}
 */
var REST_DataItemType = {
    /** 工作空间 sxwu, smwu, sxw, smw */
    WORKSPACE: "WORKSPACE",
    /** udb 数据源 */
    UDB: "UDB",
    /** shp空间数据 */
    SHP: "SHP",
    /** excel数据 */
    EXCEL: "EXCEL",
    /** csv数据 */
    CSV: "CSV",
    /** geojson数据。 */
    GEOJSON: "GEOJSON",
    /** smtiles */
    SMTILES: "SMTILES",
    /** svtiles */
    SVTILES: "SVTILES",
    /** mbtiles */
    MBTILES: "MBTILES",
    /** tpk */
    TPK: "TPK",
    /** ugc v5 */
    UGCV5: "UGCV5",
    /** UGCV5_MVT  */
    UGCV5_MVT: "UGCV5_MVT",
    /** json数据  */
    JSON: "JSON"
}

/**
 * @enum WebExportFormatType
 * @memberOf SuperMap
 * @description Web 打印输出的格式。
 * @version 10.0.1
 * @type {string}
 */
var WebExportFormatType = {
    /** png */
    PNG: "PNG",
    /** pdf */
    PDF: "PDF"
}

/**
 * @enum WebScaleOrientationType
 * @memberOf SuperMap
 * @description Web 比例尺的方位样式。
 * @version 10.0.1
 * @type {string}
 */
var WebScaleOrientationType = {
    /** horizontal labels below */
    HORIZONTALLABELSBELOW: "HORIZONTALLABELSBELOW",
    /** horizontal labels above */
    HORIZONTALLABELSABOVE: "HORIZONTALLABELSABOVE",
    /** vertical labels left */
    VERTICALLABELSLEFT: "VERTICALLABELSLEFT",
    /** vertical labels right */
    VERTICALLABELSRIGHT: "VERTICALLABELSRIGHT"
}

/**
 * @enum WebScaleType
 * @memberOf SuperMap
 * @description Web 比例尺的样式。
 * @version 10.0.1
 * @type {string}
 */
var WebScaleType = {
    /** line */
    LINE: "LINE",
    /** bar */
    BAR: "BAR",
    /** bar sub */
    BAR_SUB: "BAR_SUB"
}

/**
 * @enum WebScaleUnit
 * @memberOf SuperMap
 * @description Web 比例尺的单位制。
 * @version 10.0.1
 * @type {string}
 */
var WebScaleUnit = {
    /** meter */
    METER: "METER",
    /** foot */
    FOOT: "FOOT",
    /** degrees */
    DEGREES: "DEGREES"
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
    REST_DataItemType,
    WebExportFormatType,
    WebScaleOrientationType,
    WebScaleType,
    WebScaleUnit
}