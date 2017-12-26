import {SuperMap} from './SuperMap';

/**
 * @name DataFormat
 * @memberOf SuperMap
 * @description 服务请求返回结果数据类型
 *
 * @property {string} GEOJSON  GEOJSON
 * @property {string} ISERVER  ISERVER
 */
export var DataFormat = SuperMap.DataFormat = {
    GEOJSON: "GEOJSON",
    ISERVER: "ISERVER"
};

/**
 * @name ServerType
 * @memberOf SuperMap
 * @description 服务器类型
 *
 * @property {string} ISERVER  ISERVER
 * @property {string} IPORTAL  IPORTAL
 * @property {string} ONLINE  ONLINE
 */
export var ServerType = SuperMap.ServerType = {
    ISERVER: "ISERVER",
    IPORTAL: "IPORTAL",
    ONLINE: "ONLINE"
};

/**
 * @name GeometryType
 * @memberOf SuperMap
 * @description 几何对象枚举,定义了一系列几何对象类型。
 *
 * @property {string} LINE  LINE
 * @property {string} LINEM  LINEM
 * @property {string} POINT  POINT
 * @property {string} REGION  REGION
 * @property {string} ELLIPSE  ELLIPSE
 * @property {string} CIRCLE  CIRCLE
 * @property {string} TEXT  TEXT
 * @property {string} UNKNOWN  UNKNOWN
 */
export var GeometryType = SuperMap.GeometryType = {
    LINE: "LINE",
    LINEM: "LINEM",
    POINT: "POINT",
    REGION: "REGION",
    ELLIPSE: "ELLIPSE",
    CIRCLE: "CIRCLE",
    TEXT: "TEXT",
    UNKNOWN: "UNKNOWN"
};

/**
 * @name QueryOption
 * @memberOf SuperMap
 * @description 查询结果类型枚举,描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 *
 * @property {string} ATTRIBUTE  ATTRIBUTE
 * @property {string} ATTRIBUTEANDGEOMETRY  ATTRIBUTEANDGEOMETRY
 * @property {string} GEOMETRY  GEOMETRY
 */
export var QueryOption = SuperMap.QueryOption = {
    ATTRIBUTE: "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    GEOMETRY: "GEOMETRY"
};

/**
 * @name JoinType
 * @memberOf SuperMap
 * @description 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 *
 * @property {string} INNERJOIN  INNERJOIN
 * @property {string} LEFTJOIN  LEFTJOIN
 */
export var JoinType = SuperMap.JoinType = {
    INNERJOIN: "INNERJOIN",
    LEFTJOIN: "LEFTJOIN"
};


/**
 * @name SpatialQueryMode
 * @memberOf SuperMap
 * @description  空间查询模式枚举。该类定义了空间查询操作模式常量。
 *
 * @property {string} CONTAIN  CONTAIN
 * @property {string} CROSS  CROSS
 * @property {string} DISJOINT  DISJOINT
 * @property {string} IDENTITY  IDENTITY
 * @property {string} INTERSECT  INTERSECT
 * @property {string} NONE  NONE
 * @property {string} OVERLAP  OVERLAP
 * @property {string} TOUCH  TOUCH
 * @property {string} WITHIN  WITHIN
 */
export var SpatialQueryMode = SuperMap.SpatialQueryMode = {
    CONTAIN: "CONTAIN",
    CROSS: "CROSS",
    DISJOINT: "DISJOINT",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    NONE: "NONE",
    OVERLAP: "OVERLAP",
    TOUCH: "TOUCH",
    WITHIN: "WITHIN"
};

/**
 * @name SpatialRelationType
 * @memberOf SuperMap
 * @description  数据集对象间的空间关系枚举。
 * 该类定义了数据集对象间的空间关系类型常量。
 *
 * @property {string} CONTAIN 包含关系 CONTAIN  CONTAIN
 * @property {string} INTERSECT 相交关系 INTERSECT  INTERSECT
 * @property {string} INTERSECT 被包含关系 WITHIN  WITHIN
 */
export var SpatialRelationType = SuperMap.SpatialRelationType = {
    CONTAIN: "CONTAIN",
    INTERSECT: "INTERSECT",
    WITHIN: "WITHIN"
};

/**
 * @name MeasureMode
 * @memberOf SuperMap
 * @property {string} DISTANCE DISTANCE
 * @property {string} AREA AREA
 * @description  量算模式枚举。
 * 该类定义了两种测量模式：距离测量和面积测量。
 */
export var MeasureMode = SuperMap.MeasureMode = {
    DISTANCE: "DISTANCE",
    AREA: "AREA"
};

/**
 * @name Unit
 * @memberOf SuperMap
 * @description  距离单位枚举。
 * 该类定义了一系列距离单位类型。
 *
 * @property {string} METER  METER
 * @property {string} KILOMETER  KILOMETER
 * @property {string} MILE  MILE
 * @property {string} YARD  YARD
 * @property {string} DEGREE  DEGREE
 * @property {string} MILLIMETER  MILLIMETER
 * @property {string} CENTIMETER  CENTIMETER
 * @property {string} INCH  INCH
 * @property {string} DECIMETER  DECIMETER
 * @property {string} FOOT  FOOT
 * @property {string} SECOND  SECOND
 * @property {string} MINUTE  MINUTE
 * @property {string} RADIAN  RADIAN
 */
export var Unit = SuperMap.Unit = {
    METER: "METER",
    KILOMETER: "KILOMETER",
    MILE: "MILE",
    YARD: "YARD",
    DEGREE: "DEGREE",
    MILLIMETER: "MILLIMETER",
    CENTIMETER: "CENTIMETER",
    INCH: "INCH",
    DECIMETER: "DECIMETER",
    FOOT: "FOOT",
    SECOND: "SECOND",
    MINUTE: "MINUTE",
    RADIAN: "RADIAN"
};

/**
 * @name BufferRadiusUnit
 * @memberOf SuperMap
 * @description  缓冲区距离单位枚举。
 * 该类定义了一系列缓冲距离单位类型。
 *
 * @property {string} CENTIMETER   厘米
 * @property {string} DECIMETER   分米
 * @property {string} FOOT   英尺
 * @property {string} INCH  英寸
 * @property {string} KILOMETER  千米
 * @property {string} METER   米
 * @property {string} MILE   英里
 * @property {string} MILLIMETER    毫米
 * @property {string} YARD    码
 */
export var BufferRadiusUnit = SuperMap.BufferRadiusUnit = {
    CENTIMETER: "CENTIMETER",
    DECIMETER: "DECIMETER",
    FOOT: "FOOT",
    INCH: "INCH",
    KILOMETER: "KILOMETER",
    METER: "METER",
    MILE: "MILE",
    MILLIMETER: "MILLIMETER",
    YARD: "YARD"
}

/**
 * @name EngineType
 * @memberOf SuperMap
 * @description  数据源引擎类型枚举。
 *
 * @property {string} IMAGEPLUGINS  IMAGEPLUGINS
 * @property {string} OGC  OGC
 * @property {string} ORACLEPLUS  ORACLEPLUS
 * @property {string} SDBPLUS  SDBPLUS
 * @property {string} SQLPLUS  SQLPLUS
 * @property {string} UDB  UDB
 */
export var EngineType = SuperMap.EngineType = {
    IMAGEPLUGINS: "IMAGEPLUGINS",
    OGC: "OGC",
    ORACLEPLUS: "ORACLEPLUS",
    SDBPLUS: "SDBPLUS",
    SQLPLUS: "SQLPLUS",
    UDB: "UDB"
};

/**
 * @name ThemeGraphTextFormat
 * @memberOf SuperMap
 * @description  统计专题图文本显示格式枚举。
 *
 * @property {string} CAPTION  CAPTION
 * @property {string} CAPTION_PERCENT  CAPTION_PERCENT
 * @property {string} CAPTION_VALUE  CAPTION_VALUE
 * @property {string} PERCENT  PERCENT
 * @property {string} VALUE  VALUE
 */
export var ThemeGraphTextFormat = SuperMap.ThemeGraphTextFormat = {
    CAPTION: "CAPTION",
    CAPTION_PERCENT: "CAPTION_PERCENT",
    CAPTION_VALUE: "CAPTION_VALUE",
    PERCENT: "PERCENT",
    VALUE: "VALUE"
};

/**
 * @name ThemeGraphType
 * @memberOf SuperMap
 * @description  统计专题图类型枚举。
 *
 * @property {string} AREA  AREA
 * @property {string} BAR  BAR
 * @property {string} BAR3D  BAR3D
 * @property {string} LINE  LINE
 * @property {string} PIE  PIE
 * @property {string} PIE3D  PIE3D
 * @property {string} POINT  POINT
 * @property {string} RING  RING
 * @property {string} ROSE  ROSE
 * @property {string} ROSE3D  ROSE3D
 * @property {string} STACK_BAR  STACK_BAR
 * @property {string} STACK_BAR3D  STACK_BAR3D
 * @property {string} STEP  STEP
 */
export var ThemeGraphType = SuperMap.ThemeGraphType = {
    AREA: "AREA",
    BAR: "BAR",
    BAR3D: "BAR3D",
    LINE: "LINE",
    PIE: "PIE",
    PIE3D: "PIE3D",
    POINT: "POINT",
    RING: "RING",
    ROSE: "ROSE",
    ROSE3D: "ROSE3D",
    STACK_BAR: "STACK_BAR",
    STACK_BAR3D: "STACK_BAR3D",
    STEP: "STEP"
};

/**
 * @name GraphAxesTextDisplayMode
 * @memberOf SuperMap
 * @description  统计专题图坐标轴文本显示模式。
 *
 * @property {string} ALL  ALL, 显示全部文本
 * @property {string} NONE  NONE, 没有显示
 * @property {string} YAXES  YAXES. 显示Y轴的文本
 */
export var GraphAxesTextDisplayMode = SuperMap.GraphAxesTextDisplayMode = {
    ALL: "ALL",
    NONE: "NONE",
    YAXES: "YAXES"
};

/**
 * @name GraduatedMode
 * @memberOf SuperMap
 * @description  专题图分级模式枚举。
 *
 * @property {string} CONSTANT  CONSTANT
 * @property {string} LOGARITHM  LOGARITHM
 * @property {string} SQUAREROOT  SQUAREROOT
 */
export var GraduatedMode = SuperMap.GraduatedMode = {
    CONSTANT: "CONSTANT",
    LOGARITHM: "LOGARITHM",
    SQUAREROOT: "SQUAREROOT"
};

/**
 * @name RangeMode
 * @memberOf SuperMap
 * @description  范围分段专题图分段方式枚举。
 *
 * @property {string} CUSTOMINTERVAL  CUSTOMINTERVAL
 * @property {string} EQUALINTERVAL  EQUALINTERVAL
 * @property {string} LOGARITHM  LOGARITHM
 * @property {string} QUANTILE  QUANTILE
 * @property {string} SQUAREROOT  SQUAREROOT
 * @property {string} STDDEVIATION  STDDEVIATION
 */
export var RangeMode = SuperMap.RangeMode = {
    CUSTOMINTERVAL: "CUSTOMINTERVAL",
    EQUALINTERVAL: "EQUALINTERVAL",
    LOGARITHM: "LOGARITHM",
    QUANTILE: "QUANTILE",
    SQUAREROOT: "SQUAREROOT",
    STDDEVIATION: "STDDEVIATION"
};

/**
 * @name ThemeType
 * @memberOf SuperMap
 * @description  专题图类型枚举。
 *
 * @property {string} DOTDENSITY  DOTDENSITY
 * @property {string} GRADUATEDSYMBOL  GRADUATEDSYMBOL
 * @property {string} GRAPH  GRAPH
 * @property {string} LABEL  LABEL
 * @property {string} RANGE  RANGE
 * @property {string} UNIQUE  UNIQUE
 */
export var ThemeType = SuperMap.ThemeType = {
    DOTDENSITY: "DOTDENSITY",
    GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
    GRAPH: "GRAPH",
    LABEL: "LABEL",
    RANGE: "RANGE",
    UNIQUE: "UNIQUE"
};

/**
 * @name ColorGradientType
 * @memberOf SuperMap
 * @description  渐变颜色枚举。
 *
 * @property {string} BLACK_WHITE  BLACKWHITE
 * @property {string} BLUE_BLACK  BLUEBLACK
 * @property {string} BLUE_RED   BLUERED
 * @property {string} BLUE_WHITE  BLUEWHITE
 * @property {string} CYAN_BLACK  CYANBLACK
 * @property {string} CYAN_BLUE  CYANBLUE
 * @property {string} CYAN_GREEN  CYANGREEN
 * @property {string} CYAN_WHITE  CYANWHITE
 * @property {string} GREEN_BLACK  GREENBLACK
 * @property {string} GREEN_BLUE  GREENBLUE
 * @property {string} GREEN_ORANGE_VIOLET  GREENORANGEVIOLET
 * @property {string} GREEN_RED  GREENRED
 * @property {string} GREEN_WHITE  GREENWHITE
 * @property {string} PINK_BLACK  PINKBLACK
 * @property {string} PINK_BLUE  PINKBLUE
 * @property {string} PINK_RED  PINKRED
 * @property {string} PINK_WHITE  PINKWHITE
 * @property {string} RAIN_BOW  RAINBOW
 * @property {string} RED_BLACK  REDBLACK
 * @property {string} RED_WHITE  REDWHITE
 * @property {string} SPECTRUM  SPECTRUM
 * @property {string} TERRAIN  TERRAIN
 * @property {string} YELLOW_BLACK  YELLOWBLACK
 * @property {string} YELLOW_BLUE  YELLOWBLUE
 * @property {string} YELLOW_GREEN  YELLOWGREEN
 * @property {string} YELLOW_RED  YELLOWRED
 * @property {string} YELLOW_WHITE  YELLOWWHITE
 */
export var ColorGradientType = SuperMap.ColorGradientType = {
    BLACK_WHITE: "BLACKWHITE",
    BLUE_BLACK: "BLUEBLACK",
    BLUE_RED: "BLUERED",
    BLUE_WHITE: "BLUEWHITE",
    CYAN_BLACK: "CYANBLACK",
    CYAN_BLUE: "CYANBLUE",
    CYAN_GREEN: "CYANGREEN",
    CYAN_WHITE: "CYANWHITE",
    GREEN_BLACK: "GREENBLACK",
    GREEN_BLUE: "GREENBLUE",
    GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
    GREEN_RED: "GREENRED",
    GREEN_WHITE: "GREENWHITE",
    PINK_BLACK: "PINKBLACK",
    PINK_BLUE: "PINKBLUE",
    PINK_RED: "PINKRED",
    PINK_WHITE: "PINKWHITE",
    RAIN_BOW: "RAINBOW",
    RED_BLACK: "REDBLACK",
    RED_WHITE: "REDWHITE",
    SPECTRUM: "SPECTRUM",
    TERRAIN: "TERRAIN",
    YELLOW_BLACK: "YELLOWBLACK",
    YELLOW_BLUE: "YELLOWBLUE",
    YELLOW_GREEN: "YELLOWGREEN",
    YELLOW_RED: "YELLOWRED",
    YELLOW_WHITE: "YELLOWWHITE"
};

/**
 * @name TextAlignment
 * @memberOf SuperMap
 * @description  文本对齐枚举。
 *
 * @property {string} TOPLEFT  TOPLEFT
 * @property {string} TOPCENTER  TOPCENTER
 * @property {string} TOPRIGHT  TOPRIGHT
 * @property {string} BASELINELEFT  BASELINELEFT
 * @property {string} BASELINECENTER  BASELINECENTER
 * @property {string} BASELINERIGHT  BASELINERIGHT
 * @property {string} BOTTOMLEFT  BOTTOMLEFT
 * @property {string} BOTTOMCENTER  BOTTOMCENTER
 * @property {string} BOTTOMRIGHT  BOTTOMRIGHT
 * @property {string} MIDDLELEFT  MIDDLELEFT
 * @property {string} MIDDLECENTER  MIDDLECENTER
 * @property {string} MIDDLERIGHT  MIDDLERIGHT
 */
export var TextAlignment = SuperMap.TextAlignment = {
    TOPLEFT: "TOPLEFT",
    TOPCENTER: "TOPCENTER",
    TOPRIGHT: "TOPRIGHT",
    BASELINELEFT: "BASELINELEFT",
    BASELINECENTER: "BASELINECENTER",
    BASELINERIGHT: "BASELINERIGHT",
    BOTTOMLEFT: "BOTTOMLEFT",
    BOTTOMCENTER: "BOTTOMCENTER",
    BOTTOMRIGHT: "BOTTOMRIGHT",
    MIDDLELEFT: "MIDDLELEFT",
    MIDDLECENTER: "MIDDLECENTER",
    MIDDLERIGHT: "MIDDLERIGHT"
};

/**
 * @name FillGradientMode
 * @memberOf SuperMap
 * @description  渐变填充风格的渐变类型枚举。
 *
 * @property {string} NONE  NONE
 * @property {string} LINEAR  LINEAR
 * @property {string} RADIAL  RADIAL
 * @property {string} CONICAL  CONICAL
 * @property {string} SQUARE  SQUARE
 */
export var FillGradientMode = SuperMap.FillGradientMode = {
    NONE: "NONE",
    LINEAR: "LINEAR",
    RADIAL: "RADIAL",
    CONICAL: "CONICAL",
    SQUARE: "SQUARE"
};

/**
 * @name AlongLineDirection
 * @memberOf SuperMap
 * @name AlongLineDirection
 * @memberOf SuperMap
 * @description  标签沿线标注方向枚举。
 *
 * @property {string} NORMAL  ALONG_LINE_NORMAL
 * @property {string} LB_TO_RT  LEFT_BOTTOM_TO_RIGHT_TOP
 * @property {string} LT_TO_RB  LEFT_TOP_TO_RIGHT_BOTTOM
 * @property {string} RB_TO_LT  RIGHT_BOTTOM_TO_LEFT_TOP
 * @property {string} RT_TO_LB  RIGHT_TOP_TO_LEFT_BOTTOM
 */
export var AlongLineDirection = SuperMap.AlongLineDirection = {
    NORMAL: "ALONG_LINE_NORMAL",
    LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
    LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
    RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
    RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
};

/**
 * @name LabelBackShape
 * @memberOf SuperMap
 * @description  标签专题图中标签背景的形状枚举。
 *
 * @property {string} DIAMOND  DIAMOND
 * @property {string} ELLIPSE  ELLIPSE
 * @property {string} MARKER  MARKER
 * @property {string} NONE  NONE
 * @property {string} RECT  RECT
 * @property {string} ROUNDRECT  ROUNDRECT
 * @property {string} TRIANGLE  TRIANGLE
 */
export var LabelBackShape = SuperMap.LabelBackShape = {
    DIAMOND: "DIAMOND",
    ELLIPSE: "ELLIPSE",
    MARKER: "MARKER",
    NONE: "NONE",
    RECT: "RECT",
    ROUNDRECT: "ROUNDRECT",
    TRIANGLE: "TRIANGLE"
};

/**
 * @name LabelOverLengthMode
 * @memberOf SuperMap
 * @description  标签专题图中超长标签的处理模式枚举。
 *
 * @property {string} NEWLINE  NEWLINE
 * @property {string} NONE  NONE
 * @property {string} OMIT  OMIT
 */
export var LabelOverLengthMode = SuperMap.LabelOverLengthMode = {
    NEWLINE: "NEWLINE",
    NONE: "NONE",
    OMIT: "OMIT"
};

/**
 * @name DirectionType
 * @memberOf SuperMap
 * @description  网络分析中方向枚举。
 * 在行驶引导子项中使用。
 *
 * @property {string} EAST  EAST
 * @property {string} NONE  NONE
 * @property {string} NORTH  NORTH
 * @property {string} SOURTH  SOURTH
 * @property {string} WEST  WEST
 */
export var DirectionType = SuperMap.DirectionType = {
    EAST: "EAST",
    NONE: "NONE",
    NORTH: "NORTH",
    SOURTH: "SOURTH",
    WEST: "WEST"
};


/**
 * @name SideType
 * @memberOf SuperMap
 * @description  行驶位置枚举。
 * 表示在行驶在路的左边、右边或者路上的枚举,该类用在行驶导引子项类中。
 *
 * @property {string} LEFT  LEFT
 * @property {string} MIDDLE  MIDDLE
 * @property {string} NONE  NONE
 * @property {string} RIGHT  RIGHT
 */
export var SideType = SuperMap.SideType = {
    LEFT: "LEFT",
    MIDDLE: "MIDDLE",
    NONE: "NONE",
    RIGHT: "RIGHT"
};

/**
 * @name SupplyCenterType
 * @memberOf SuperMap
 * @description  资源供给中心类型枚举。
 * 该枚举定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析； 固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 *
 * @property {string} FIXEDCENTER  FIXEDCENTER
 * @property {string} NULL  NULL
 * @property {string} OPTIONALCENTER  OPTIONALCENTER
 */
export var SupplyCenterType = SuperMap.SupplyCenterType = {
    FIXEDCENTER: "FIXEDCENTER",
    NULL: "NULL",
    OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * @name TurnType
 * @memberOf SuperMap
 * @description  转弯方向枚举。
 * 用在行驶引导子项类中，表示转弯的方向。
 *
 * @property {string} AHEAD  AHEAD
 * @property {string} BACK  BACK
 * @property {string} END  END
 * @property {string} LEFT  LEFT
 * @property {string} NONE  NONE
 * @property {string} RIGHT  RIGHT
 */
export var TurnType = SuperMap.TurnType = {
    AHEAD: "AHEAD",
    BACK: "BACK",
    END: "END",
    LEFT: "LEFT",
    NONE: "NONE",
    RIGHT: "RIGHT"
};

/**
 * @name BufferEndType
 * @memberOf SuperMap
 * @description  缓冲区分析BufferEnd类型。
 *
 * @property {string} FLAT  FLAT
 * @property {string} ROUND  ROUND
 */
export var BufferEndType = SuperMap.BufferEndType = {
    FLAT: "FLAT",
    ROUND: "ROUND"
};

/**
 * @name OverlayOperationType
 * @memberOf SuperMap
 * @description  叠加分析类型枚举。
 *
 * @property {string} CLIP  CLIP
 * @property {string} ERASE  ERASE
 * @property {string} IDENTITY  IDENTITY
 * @property {string} INTERSECT  INTERSECT
 * @property {string} UNION  UNION
 * @property {string} UPDATE  UPDATE
 * @property {string} XOR  XOR
 */
export var OverlayOperationType = SuperMap.OverlayOperationType = {
    CLIP: "CLIP",
    ERASE: "ERASE",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    UNION: "UNION",
    UPDATE: "UPDATE",
    XOR: "XOR"
};

/**
 * @name OutputType
 * @memberOf SuperMap
 * @description  分布式分析输出类型枚举。
 *
 * @property {string} INDEXEDHDFS  INDEXEDHDFS
 * @property {string} UDB  UDB
 * @property {string} MONGODB  MONGODB
 * @property {string} PG  PG
 */
export var OutputType = SuperMap.OutputType = {
    INDEXEDHDFS: "INDEXEDHDFS",
    UDB: "UDB",
    MONGODB: "MONGODB",
    PG: "PG"
};

/**
 * @name SmoothMethod
 * @memberOf SuperMap
 * @description  光滑方法枚举。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 *
 * @property {string} BSPLINE  BSPLINE
 * @property {string} POLISH  POLISH
 */
export var SmoothMethod = SuperMap.SmoothMethod = {
    BSPLINE: "BSPLINE",
    POLISH: "POLISH"
};

/**
 * @name SurfaceAnalystMethod
 * @memberOf SuperMap
 * @description  表面分析方法枚举。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 *
 * @property {string} ISOLINE  ISOLINE
 * @property {string} ISOREGION  ISOREGION
 */
export var SurfaceAnalystMethod = SuperMap.SurfaceAnalystMethod = {
    ISOLINE: "ISOLINE",
    ISOREGION: "ISOREGION"
};
/**
 * @name DataReturnMode
 * @memberOf SuperMap
 * @description  数据返回模式枚举。
 * 该枚举用于指定空间分析返回结果模式,包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 *
 * @property {string} DATASET_AND_RECORDSET  DATASET_AND_RECORDSET
 * @property {string} DATASET_ONLY  DATASET_ONLY
 * @property {string} RECORDSET_ONLY  RECORDSET_ONLY
 */
export var DataReturnMode = SuperMap.DataReturnMode = {
    DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
    DATASET_ONLY: "DATASET_ONLY",
    RECORDSET_ONLY: "RECORDSET_ONLY"
};

/**
 * @name EditType
 * @memberOf SuperMap
 * @description  要素集更新模式枚举。
 * 该枚举用于指定数据服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 *
 * @property {string} ADD  add
 * @property {string} UPDATE  update
 * @property {string} DELETE  delete
 */
export var EditType = SuperMap.EditType = {
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete"
};

/**
 * @name TransferTactic
 * @memberOf SuperMap
 * @description  公交换乘策略枚举。
 * 该枚举用于指定公交服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 *
 * @property {string} LESS_TIME  LESS_TIME
 * @property {string} LESS_TRANSFER  LESS_TRANSFER
 * @property {string} LESS_WALK  LESS_WALK
 * @property {string} MIN_DISTANCE  MIN_DISTANCE
 */
export var TransferTactic = SuperMap.TransferTactic = {
    LESS_TIME: "LESS_TIME",
    LESS_TRANSFER: "LESS_TRANSFER",
    LESS_WALK: "LESS_WALK",
    MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * @name TransferPreference
 * @memberOf SuperMap
 * @description  公交换乘策略枚举。
 * 该枚举用于指定交通换乘服务中设置地铁优先、公交优先、不乘地铁、无偏好等偏好设置。
 *
 * @property {string} BUS  BUS
 * @property {string} SUBWAY  SUBWAY
 * @property {string} NO_SUBWAY  NO_SUBWAY
 * @property {string} NONE  NONE
 */
export var TransferPreference = SuperMap.TransferPreference = {
    BUS: "BUS",
    SUBWAY: "SUBWAY",
    NO_SUBWAY: "NO_SUBWAY",
    NONE: "NONE"
};

/**
 * @name GridType
 * @memberOf SuperMap
 * @description  地图背景格网类型枚举。
 *
 * @property {string} CROSS  CROSS
 * @property {string} GRID  GRID
 * @property {string} POINT  POINT
 */
export var GridType = SuperMap.GridType = {
    CROSS: "CROSS",
    GRID: "GRID",
    POINT: "POINT"
};

/**
 * @name ColorSpaceType
 * @memberOf SuperMap
 * @description  色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 *
 * @property {string} CMYK  CMYK
 * @property {string} RGB  RGB
 */
export var ColorSpaceType = SuperMap.ColorSpaceType = {
    CMYK: "CMYK",
    RGB: "RGB"
};

/**
 * @name LayerType
 * @memberOf SuperMap
 * @description  图层类型。
 *
 * @property {string} UGC  UGC
 * @property {string} WMS  WMS
 * @property {string} WFS  WFS
 * @property {string} CUSTOM  CUSTOM
 */
export var LayerType = SuperMap.LayerType = {
    UGC: "UGC",
    WMS: "WMS",
    WFS: "WFS",
    CUSTOM: "CUSTOM"

};

/**
 * @name UGCLayerType
 * @memberOf SuperMap
 * @description  UGC图层类型。
 *
 * @property {string} THEME  THEME
 * @property {string} VECTOR  VECTOR
 * @property {string} GRID  GRID
 * @property {string} IMAGE  IMAGE
 */
export var UGCLayerType = SuperMap.UGCLayerType = {
    THEME: "THEME",
    VECTOR: "VECTOR",
    GRID: "GRID",
    IMAGE: "IMAGE"

};

/**
 * @name StatisticMode
 * @memberOf SuperMap
 * @description  字段统计方法类型。
 *
 * @property {string} AVERAGE  AVERAGE, 统计所选字段的平均值
 * @property {string} MAX  MAX, 统计所选字段的最大值
 * @property {string} MIN  MIN, 统计所选字段的最小值
 * @property {string} STDDEVIATION  STDDEVIATION, 统计所选字段的标准差
 * @property {string} SUM  SUM, 统计所选字段的总和
 * @property {string} VARIANCE  VARIANCE, 统计所选字段的方差
 */
export var StatisticMode = SuperMap.StatisticMode = {
    AVERAGE: "AVERAGE",
    MAX: "MAX",
    MIN: "MIN",
    STDDEVIATION: "STDDEVIATION",
    SUM: "SUM",
    VARIANCE: "VARIANCE"
};

/**
 * @name PixelFormat
 * @memberOf SuperMap
 * @description  栅格与影像数据存储的像素格式枚举。
 *
 * @property {string} BIT16  BIT16, 每个像元用16个比特(即2个字节)表示
 * @property {string} BIT32  BIT32, 每个像元用32个比特(即4个字节)表示
 * @property {string} BIT64  BIT64, 每个像元用64个比特(即8个字节)表示，只提供给栅格数据集使用
 * @property {string} SINGLE  SINGLE, 每个像元用4个字节来表示，只提供给栅格数据集使用
 * @property {string} DOUBLE  DOUBLE, 每个像元用8个字节来表示，只提供给栅格数据集使用
 * @property {string} UBIT1  UBIT1, 每个像元用1个比特表示
 * @property {string} UBIT4  UBIT4, 每个像元用4个比特来表示
 * @property {string} UBIT8  UBIT8, 每个像元用8个比特(即1个字节)来表示
 * @property {string} UBIT24  UBIT24, 每个像元用24个比特(即3个字节)来表示
 * @property {string} UBIT32  UBIT32, 每个像元用32个比特(即4个字节)来表示
 */
export var PixelFormat = SuperMap.PixelFormat = {
    BIT16: "BIT16",
    BIT32: "BIT32",
    BIT64: "BIT64",
    SINGLE: "SINGLE",
    DOUBLE: "DOUBLE",
    UBIT1: "UBIT1",
    UBIT4: "UBIT4",
    UBIT8: "UBIT8",
    UBIT24: "UBIT24",
    UBIT32: "UBIT32"
};

/**
 * @name SearchMode
 * @memberOf SuperMap
 * @description  内插时使用的样本点的查找方式枚举
 *
 * @property {string} KDTREE_FIXED_COUNT  KDTREE_FIXED_COUNT, 使用 KDTREE 的固定点数方式查找参与内插分析的点
 * @property {string} KDTREE_FIXED_RADIUS  KDTREE_FIXED_RADIUS, 使用 KDTREE 的定长方式查找参与内插分析的点
 * @property {string} NONE  NONE, 不进行查找，使用所有的输入点进行内插分析
 * @property {string} QUADTREE  QUADTREE, 使用 QUADTREE 方式查找参与内插分析的点，仅对样条（RBF）插值和普通克吕金（Kriging）有用
 */
export var SearchMode = SuperMap.SearchMode = {
    KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
    KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
    NONE: "NONE",
    QUADTREE: "QUADTREE"
};

/**
 * @name InterpolationAlgorithmType
 * @memberOf SuperMap
 * @description  插值分析的算法的类型
 *
 * @property {string} KRIGING  KRIGING, 普通克吕金插值法
 * @property {string} SimpleKriging  SimpleKriging, 简单克吕金插值法
 * @property {string} UniversalKriging  UniversalKriging, 泛克吕金插值法
 */
export var InterpolationAlgorithmType = SuperMap.InterpolationAlgorithmType = {
    KRIGING: "KRIGING",
    SimpleKriging: "SimpleKriging",
    UniversalKriging: "UniversalKriging"
};

/**
 * @name VariogramMode
 * @memberOf SuperMap
 * @description  克吕金（Kriging）插值时的半变函数类型枚举
 *
 * @property {string} EXPONENTIAL  EXPONENTIAL, 指数函数（Exponential Variogram Mode）
 * @property {string} GAUSSIAN  GAUSSIAN,  高斯函数（Gaussian Variogram Mode）
 * @property {string} SPHERICAL  SPHERICAL, 球型函数（Spherical Variogram Mode）
 */
export var VariogramMode = SuperMap.VariogramMode = {
    EXPONENTIAL: "EXPONENTIAL",
    GAUSSIAN: "GAUSSIAN",
    SPHERICAL: "SPHERICAL"
};

/**
 * @name Exponent
 * @memberOf SuperMap
 * @description  定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数
 *
 * @property {string} EXP1  EXP1, 阶数为1
 * @property {string} EXP2  EXP2, 阶数为2
 */
export var Exponent = SuperMap.Exponent = {
    EXP1: "EXP1",
    EXP2: "EXP2"
};

/**
 * @name ClientType
 * @memberOf SuperMap
 * @description token申请的客户端标识类型
 *
 * @property {string} IP  IP
 * @property {string} REFERER  Referer
 * @property {string} REQUESTIP  RequestIP
 * @property {string} NONE  NONE
 * @property {string} SERVER  SERVER
 * @property {string} WEB  WEB
 */
export var ClientType = SuperMap.ClientType = {
    IP: "IP",
    REFERER: "Referer",
    REQUESTIP: "RequestIP",
    NONE: "NONE",
    SERVER: "SERVER",
    WEB: "WEB"
};

/**
 * @name ChartType
 * @memberOf SuperMap
 * @description 客户端专题图图表类型
 *
 * @property {string} BAR  Bar
 * @property {string} BAR3D  Bar3D
 * @property {string} CIRCLE  Circle
 * @property {string} PIE  Pie
 * @property {string} POINT  Point
 * @property {string} LINE  Line
 * @property {string} RING  Ring
 */
export var ChartType = SuperMap.ChartType = {
    BAR: "Bar",
    BAR3D: "Bar3D",
    CIRCLE: "Circle",
    PIE: "Pie",
    POINT: "Point",
    LINE: "Line",
    RING: "Ring"
};

/**
 * @name ClipAnalystMode
 * @memberOf SuperMap
 * @description  裁剪分析模式
 *
 * @property {string} CLIP  clip
 * @property {string} INTERSECT  intersect
 */
export var ClipAnalystMode = SuperMap.ClipAnalystMode = {
    CLIP: "clip",
    INTERSECT: "intersect"
};
/**
 * @name AnalystAreaUnit
 * @memberOf SuperMap
 * @description 分布式分析面积单位
 *
 * @property {string} SQUAREMETER  SquareMeter
 * @property {string} SQUAREKILOMETER   SquareKiloMeter
 * @property {string} HECTARE  Hectare
 * @property {string} ARE   Are
 * @property {string} ACRE   Acre
 * @property {string} SQUAREFOOT   SquareFoot
 * @property {string} SQUAREYARD   SquareYard
 * @property {string} SQUAREMILE   SquareMile
 */
export var AnalystAreaUnit = SuperMap.AnalystAreaUnit = {
    "SQUAREMETER": "SquareMeter",
    "SQUAREKILOMETER": "SquareKiloMeter",
    "HECTARE": "Hectare",
    "ARE": "Are",
    "ACRE": "Acre",
    "SQUAREFOOT": "SquareFoot",
    "SQUAREYARD": "SquareYard",
    "SQUAREMILE": "SquareMile"
};
/**
 * @name AnalystSizeUnit
 * @memberOf SuperMap
 * @description 分布式分析单位
 *
 * @property {string} METER   Meter
 * @property {string} KILOMETER   Kilometer
 * @property {string} YARD   Yard
 * @property {string} FOOT   Foot
 * @property {string} MILE   Mile
 */
export var AnalystSizeUnit = SuperMap.AnalystSizeUnit = {
    "METER": "Meter",
    "KILOMETER": "Kilometer",
    "YARD": "Yard",
    "FOOT": "Foot",
    "MILE": "Mile"
};
/**
 * @name StatisticAnalystMode
 * @memberOf SuperMap
 * @description 分布式分析统计模式
 *
 * @property {string} MAX   max
 * @property {string} MIN   min
 * @property {string} AVERAGE   average
 * @property {string} SUM   sum
 * @property {string} VARIANCE   variance
 * @property {string} STDDEVIATION   stdDeviation
 */
export var StatisticAnalystMode = SuperMap.StatisticAnalystMode = {
    "MAX": "max",
    "MIN": "min",
    "AVERAGE": "average",
    "SUM": "sum",
    "VARIANCE": "variance",
    "STDDEVIATION": "stdDeviation"
};
/**
 * @name SummaryType
 * @memberOf SuperMap
 * @description 分布式分析聚合类型
 *
 * @property {string} SUMMARYMESH   SUMMARYMESH
 * @property {string} SUMMARYREGION SUMMARYREGION
 */
export var SummaryType = SuperMap.SummaryType = {
    "SUMMARYMESH": "SUMMARYMESH",
    "SUMMARYREGION": "SUMMARYREGION"
};
/**
 * @name TopologyValidatorRule
 * @memberOf SuperMap
 * @description  拓扑检查模式枚举。该类定义了拓扑检查操作模式常量。
 *
 * @property {string} REGIONNOOVERLAP  REGIONNOOVERLAP
 * @property {string} REGIONNOOVERLAPWITH  REGIONNOOVERLAPWITH
 * @property {string} REGIONCONTAINEDBYREGION  REGIONCONTAINEDBYREGION
 * @property {string} REGIONCOVEREDBYREGION  REGIONCOVEREDBYREGION
 * @property {string} LINENOOVERLAP  LINENOOVERLAP
 * @property {string} LINENOOVERLAPWITH  LINENOOVERLAPWITH
 * @property {string} POINTNOIDENTICAL  POINTNOIDENTICAL
 */
export var TopologyValidatorRule = SuperMap.TopologyValidatorRule = {
    REGIONNOOVERLAP: "REGIONNOOVERLAP",
    REGIONNOOVERLAPWITH: "REGIONNOOVERLAPWITH",
    REGIONCONTAINEDBYREGION: "REGIONCONTAINEDBYREGION",
    REGIONCOVEREDBYREGION: "REGIONCOVEREDBYREGION",
    LINENOOVERLAP: "LINENOOVERLAP",
    LINENOOVERLAPWITH: "LINENOOVERLAPWITH",
    POINTNOIDENTICAL: "POINTNOIDENTICAL"
};