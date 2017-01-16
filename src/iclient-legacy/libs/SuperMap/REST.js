/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST
 * 所有的枚举类。
 */

/**
 * Constant: SuperMap.REST.GeometryType
 * {Object} 几何对象枚举类。
 * 该类定义了一系列几何对象类型。
 *
 * LINE: "LINE",
 *
 * LINEM: "LINEM",
 *
 * POINT: "POINT",
 *
 * REGION: "REGION",
 *
 * ELLIPSE: "ELLIPSE",
 *
 * CIRCLE: "CIRCLE",
 *
 * TEXT: "TEXT",
 *
 * UNKNOWN: "UNKNOWN".
 */
SuperMap.REST.GeometryType = {
    LINE: "LINE",
    LINEM: "LINEM",
    POINT: "POINT",
    REGION: "REGION",
    ELLIPSE: "ELLIPSE",
    CIRCLE: "CIRCLE",
    TEXT: "TEXT",
    UNKNOWN: "UNKNOWN"
}

/**
 * Constant: SuperMap.REST.QueryOption
 * {Object} 查询结果类型枚举类。
 * 该类描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 *
 * ATTRIBUTE: "ATTRIBUTE",
 *
 * ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
 *
 * GEOMETRY: "GEOMETRY".
 */
SuperMap.REST.QueryOption = {
    ATTRIBUTE: "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    GEOMETRY: "GEOMETRY"
}

/**
 * Constant: SuperMap.REST.JoinType
 * {Object} 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 *
 * INNERJOIN: "INNERJOIN",
 *
 * LEFTJOIN: "LEFTJOIN".
 */
SuperMap.REST.JoinType = {
    INNERJOIN: "INNERJOIN",
    LEFTJOIN: "LEFTJOIN"
}


/**
 * Constant: SuperMap.REST.SpatialQueryMode 
 * {Object} 空间查询模式枚举类。
 * 该类定义了空间查询操作模式常量。
 *
 * CONTAIN: "CONTAIN",
 *
 * CROSS: "CROSS",
 *
 * DISJOINT: "DISJOINT",
 *
 * IDENTITY: "IDENTITY",
 * 
 * INTERSECT: "INTERSECT",
 *
 * NONE: "NONE",
 *
 * OVERLAP: "OVERLAP",
 *
 * TOUCH: "TOUCH",
 *
 * WITHIN: "WITHIN".
 */
SuperMap.REST.SpatialQueryMode = {
    CONTAIN: "CONTAIN",
    CROSS: "CROSS",
    DISJOINT: "DISJOINT",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    NONE: "NONE",
    OVERLAP: "OVERLAP",
    TOUCH: "TOUCH",
    WITHIN: "WITHIN"
}

/**
 * Constant: SuperMap.REST.SpatialRelationType 
 * {Object} 数据集对象间的空间关系枚举类。
 * 该类定义了数据集对象间的空间关系类型常量。
 *
 * 包含关系
 * CONTAIN: "CONTAIN",
 *
 * 相交关系
 * INTERSECT: "INTERSECT",
 *
 * 被包含关系
 * WITHIN: "WITHIN"。
 */
SuperMap.REST.SpatialRelationType = {
    CONTAIN: "CONTAIN",
    INTERSECT: "INTERSECT",
    WITHIN: "WITHIN"
}

/**
 * Constant: SuperMap.REST.MeasureMode 
 * {Object} 量算模式枚举类。
 * 该类定义了两种测量模式：距离测量和面积测量。
 *
 * DISTANCE: "DISTANCE",
 *
 * AREA: "AREA".
 */
SuperMap.REST.MeasureMode = {
    DISTANCE: "DISTANCE",
    AREA: "AREA"
}

/**
 * Constant: SuperMap.REST.Unit
 * {Object} 距离单位枚举类。
 * 该类定义了一系列距离单位类型。
 *
 * METER: "METER",
 *
 * KILOMETER: "KILOMETER",
 *
 * MILE: "MILE",
 *
 * YARD: "YARD",
 *
 * DEGREE: "DEGREE",
 *
 * MILLIMETER: "MILLIMETER",
 * 
 * CENTIMETER: "CENTIMETER",
 *
 * INCH: "INCH",
 *
 * DECIMETER: "DECIMETER",
 *
 * FOOT: "FOOT",
 *
 * SECOND: "SECOND",
 *
 * MINUTE: "MINUTE",
 *
 * RADIAN: "RADIAN".
 */
SuperMap.REST.Unit = {
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
}

/**
 * Constant: SuperMap.REST.EngineType 
 * {Object} 数据源引擎类型枚举类。
 *
 * IMAGEPLUGINS: "IMAGEPLUGINS",
 *
 * OGC: "OGC",
 *
 * ORACLEPLUS: "ORACLEPLUS",
 *
 * SDBPLUS: "SDBPLUS",
 *
 * SQLPLUS: "SQLPLUS",
 *
 * UDB: "UDB"。
 */
SuperMap.REST.EngineType = {
    IMAGEPLUGINS: "IMAGEPLUGINS",
    OGC: "OGC",
    ORACLEPLUS: "ORACLEPLUS",
    SDBPLUS: "SDBPLUS",
    SQLPLUS: "SQLPLUS",
    UDB: "UDB"
}

/**
 * Constant: SuperMap.REST.ThemeGraphTextFormat 
 * {Object } 统计专题图文本显示格式枚举类。
 *
 * CAPTION: "CAPTION",
 *
 * CAPTION_PERCENT: "CAPTION_PERCENT",
 *
 * CAPTION_VALUE: "CAPTION_VALUE",
 *
 * PERCENT: "PERCENT",
 *
 * VALUE: "VALUE".
 */
SuperMap.REST.ThemeGraphTextFormat = {
    CAPTION: "CAPTION",
    CAPTION_PERCENT: "CAPTION_PERCENT",
    CAPTION_VALUE: "CAPTION_VALUE",
    PERCENT: "PERCENT",
    VALUE: "VALUE"
}

/**
 * Constant: SuperMap.REST.ThemeGraphType
 * {Object} 统计专题图类型枚举类。
 *
 * AREA: "AREA",
 *
 * BAR: "BAR",
 *
 * BAR3D: "BAR3D",
 *
 * LINE: "LINE",
 *
 * PIE: "PIE",
 *
 * PIE3D: "PIE3D",
 *
 * POINT: "POINT",
 *
 * RING: "RING",
 *
 * ROSE: "ROSE",
 *
 * ROSE3D: "ROSE3D",
 *
 * STACK_BAR: "STACK_BAR",
 *
 * STACK_BAR3D: "STACK_BAR3D",
 *
 * STEP: "STEP".
 */
SuperMap.REST.ThemeGraphType = {
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
}

/**
 * Constant: SuperMap.REST.GraphAxesTextDisplayMode
 * {Object} 统计专题图坐标轴文本显示模式。
 * ALL: "ALL", 显示全部文本
 *
 * NONE: "NONE", 没有显示
 *
 * YAXES: "YAXES". 显示Y轴的文本
 */
SuperMap.REST.GraphAxesTextDisplayMode = {
    ALL: "ALL",
    NONE: "NONE",
    YAXES: "YAXES"
}

/**
 * Constant: SuperMap.REST.GraduatedMode
 * {Object} 专题图分级模式枚举类。 CONSTANT: "CONSTANT",
 *
 * LOGARITHM: "LOGARITHM",
 *
 * SQUAREROOT: "SQUAREROOT".
 */
SuperMap.REST.GraduatedMode = {
    CONSTANT: "CONSTANT",
    LOGARITHM: "LOGARITHM",
    SQUAREROOT: "SQUAREROOT"
}

/**
 * Constant: SuperMap.REST.RangeMode
 * {Object} 范围分段专题图分段方式枚举类。
 *
 * CUSTOMINTERVAL: "CUSTOMINTERVAL",
 *
 * EQUALINTERVAL: "EQUALINTERVAL",
 *
 * LOGARITHM: "LOGARITHM",
 *
 * QUANTILE: "QUANTILE",
 *
 * SQUAREROOT: "SQUAREROOT",
 *
 * STDDEVIATION: "STDDEVIATION".
 */
SuperMap.REST.RangeMode = {
    CUSTOMINTERVAL: "CUSTOMINTERVAL",
    EQUALINTERVAL: "EQUALINTERVAL",
    LOGARITHM: "LOGARITHM",
    QUANTILE: "QUANTILE",
    SQUAREROOT: "SQUAREROOT",
    STDDEVIATION: "STDDEVIATION"
}

/**
 * Constant: SuperMap.REST.ThemeType
 * {Object} 专题图类型枚举类。
 *
 * DOTDENSITY: "DOTDENSITY",
 *
 * GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
 *
 * GRAPH: "GRAPH",
 *
 * LABEL: "LABEL",
 *
 * RANGE: "RANGE",
 *
 * UNIQUE: "UNIQUE".
 */
SuperMap.REST.ThemeType = {
    DOTDENSITY: "DOTDENSITY",
    GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
    GRAPH: "GRAPH",
    LABEL: "LABEL",
    RANGE: "RANGE",
    UNIQUE: "UNIQUE"
}

/**
 * Constant: SuperMap.REST.ColorGradientType
 * {Object} 渐变颜色枚举类。
 *
 * BLACK_WHITE: "BLACKWHITE",
 *
 * BLUE_BLACK: "BLUEBLACK",
 *
 * BLUE_RED : "BLUERED",
 *
 * BLUE_WHITE: "BLUEWHITE",
 *
 * CYAN_BLACK: "CYANBLACK",
 *
 * CYAN_BLUE: "CYANBLUE",
 *
 * CYAN_GREEN: "CYANGREEN",
 *
 * CYAN_WHITE: "CYANWHITE",
 *
 * GREEN_BLACK: "GREENBLACK",
 *
 * GREEN_BLUE: "GREENBLUE",
 *
 * GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
 *
 * GREEN_RED: "GREENRED",
 *
 * GREEN_WHITE: "GREENWHITE",
 *
 * PINK_BLACK: "PINKBLACK",
 *
 * PINK_BLUE: "PINKBLUE",
 *
 * PINK_RED: "PINKRED",
 *
 * PINK_WHITE: "PINKWHITE",
 *
 * RAIN_BOW: "RAINBOW",
 *
 * RED_BLACK: "REDBLACK",
 *
 * RED_WHITE: "REDWHITE",
 *
 * SPECTRUM: "SPECTRUM",
 *
 * TERRAIN: "TERRAIN",
 *
 * YELLOW_BLACK: "YELLOWBLACK",
 *
 * YELLOW_BLUE: "YELLOWBLUE",
 *
 * YELLOW_GREEN: "YELLOWGREEN",
 *
 * YELLOW_RED: "YELLOWRED",
 *
 * YELLOW_WHITE: "YELLOWWHITE".
 */
SuperMap.REST.ColorGradientType = {
    BLACK_WHITE: "BLACKWHITE",
    BLUE_BLACK: "BLUEBLACK",
    BLUE_RED : "BLUERED",
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
}

/**
 * Constant: SuperMap.REST.TextAlignment
 * {Object} 文本对齐枚举类。
 *
 * TOPLEFT: "TOPLEFT",
 *
 * TOPCENTER: "TOPCENTER",
 *
 * TOPRIGHT: "TOPRIGHT",
 *
 * BASELINELEFT: "BASELINELEFT",
 *
 * BASELINECENTER: "BASELINECENTER",
 *
 * BASELINERIGHT: "BASELINERIGHT",
 *
 * BOTTOMLEFT: "BOTTOMLEFT",
 *
 * BOTTOMCENTER: "BOTTOMCENTER",
 *
 * BOTTOMRIGHT: "BOTTOMRIGHT",
 *
 * MIDDLELEFT: "MIDDLELEFT",
 *
 * MIDDLECENTER: "MIDDLECENTER",
 *
 * MIDDLERIGHT: "MIDDLERIGHT".
 */
SuperMap.REST.TextAlignment = {
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
}

/**
 * Constant: SuperMap.REST.FillGradientMode
 * {Object} 渐变填充风格的渐变类型枚举类。
 *
 * NONE: "NONE",
 *
 * LINEAR: "LINEAR",
 *
 * RADIAL: "RADIAL",
 *
 * CONICAL: "CONICAL",
 *
 * SQUARE: "SQUARE".
 */
SuperMap.REST.FillGradientMode = {
    NONE: "NONE",
    LINEAR: "LINEAR",
    RADIAL: "RADIAL",
    CONICAL: "CONICAL",
    SQUARE: "SQUARE"    
}

/**
 * Constant: SuperMap.REST.AlongLineDirection
 * {Object} 标签沿线标注方向枚举类。
 *
 * NORMAL: "ALONG_LINE_NORMAL",
 *
 * LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
 *
 * LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
 *
 * RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
 *
 * RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM".
 */
SuperMap.REST.AlongLineDirection = {
    NORMAL: "ALONG_LINE_NORMAL",
    LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
    LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
    RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
    RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
}

/**
 * Constant: SuperMap.REST.LabelBackShape
 * {Object} 标签专题图中标签背景的形状枚举类。
 *
 * DIAMOND: "DIAMOND",
 *
 * ELLIPSE: "ELLIPSE",
 *
 * MARKER: "MARKER",
 *
 * NONE: "NONE",
 *
 * RECT: "RECT",
 *
 * ROUNDRECT: "ROUNDRECT",
 *
 * TRIANGLE: "TRIANGLE".
 */
SuperMap.REST.LabelBackShape = {
    DIAMOND: "DIAMOND",
    ELLIPSE: "ELLIPSE",
    MARKER: "MARKER",
    NONE: "NONE",
    RECT: "RECT",
    ROUNDRECT: "ROUNDRECT",
    TRIANGLE: "TRIANGLE"
}

/**
 * Constant: SuperMap.REST.LabelOverLengthMode
 * {Object} 标签专题图中超长标签的处理模式枚举类。
 *
 * NEWLINE: "NEWLINE",
 *
 * NONE: "NONE",
 *
 * OMIT: "OMIT".
 */
SuperMap.REST.LabelOverLengthMode = {
    NEWLINE: "NEWLINE",
    NONE: "NONE",
    OMIT: "OMIT"
}

/**
 * Constant: SuperMap.REST.DirectionType
 * {Object} 网络分析中方向枚举类。
 * 在行驶引导子项中使用。
 *
 * EAST: "EAST",
 *
 * NONE: "NONE",
 *
 * NORTH: "NORTH",
 *
 * SOURTH: "SOURTH",
 *
 * WEST: "WEST".
 */
SuperMap.REST.DirectionType = {
    EAST: "EAST",
    NONE: "NONE",
    NORTH: "NORTH",
    SOURTH: "SOURTH",
    WEST: "WEST"
}


/**
 * Constant: SuperMap.REST.SideType
 * {Object} 行驶位置枚举类。
 * 表示在行驶在路的左边、右边或者路上的枚举,该类用在行驶导引子项类中。
 *
 * LEFT: "LEFT",
 *
 * MIDDLE: "MIDDLE",
 *
 * NONE: "NONE",
 *
 * RIGHT: "RIGHT".
 */
SuperMap.REST.SideType = {
    LEFT: "LEFT",
    MIDDLE: "MIDDLE",
    NONE: "NONE",
    RIGHT: "RIGHT"
}

/**
 * Constant: SuperMap.REST.SupplyCenterType
 * {Object} 资源供给中心类型枚举类。
 * 该枚举类定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析； 固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 *
 * FIXEDCENTER: "FIXEDCENTER",
 *
 * NULL: "NULL",
 *
 * OPTIONALCENTER: "OPTIONALCENTER".
 */
SuperMap.REST.SupplyCenterType = {
    FIXEDCENTER: "FIXEDCENTER",
    NULL: "NULL",
    OPTIONALCENTER: "OPTIONALCENTER"
}

/**
 * Constant: SuperMap.REST.TurnType
 * {Object} 转弯方向枚举类。
 * 用在行驶引导子项类中，表示转弯的方向。
 * 
 * AHEAD: "AHEAD",
 *
 * BACK: "BACK",
 *
 * END: "END",
 *
 * LEFT: "LEFT",
 *
 * NONE: "NONE",
 *
 * RIGHT: "RIGHT".
 */
SuperMap.REST.TurnType = {
    AHEAD: "AHEAD",
    BACK: "BACK",
    END: "END",
    LEFT: "LEFT",
    NONE: "NONE",
    RIGHT: "RIGHT"
}

/**
 * Constant: SuperMap.REST.BufferEndType
 * {Object} 缓冲区分析BufferEnd类型。
 *
 * FLAT: "FLAT",
 * 
 * ROUND: "ROUND".
 */
SuperMap.REST.BufferEndType = {
    FLAT: "FLAT",
    ROUND: "ROUND"
}

/**
 * Constant: SuperMap.REST.OverlayOperationType
 * {Object} 叠加分析类型枚举。
 *
 * CLIP: "CLIP",
 *
 * ERASE: "ERASE",
 *
 * IDENTITY: "IDENTITY",
 *
 * INTERSECT: "INTERSECT",
 *
 * UNION: "UNION",
 *
 * UPDATE: "UPDATE",
 *
 * XOR: "XOR".
 */
SuperMap.REST.OverlayOperationType = {
    CLIP: "CLIP",
    ERASE: "ERASE",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    UNION: "UNION",
    UPDATE: "UPDATE",
    XOR: "XOR"
}

/**
 * Constant: SuperMap.REST.SmoothMethod
 * {Object} 光滑方法枚举类。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 *
 * BSPLINE: "BSPLINE",
 *
 * POLISH: "POLISH".
 */
SuperMap.REST.SmoothMethod = {
    BSPLINE: "BSPLINE",
    POLISH: "POLISH"
}

/**
 * Constant: SuperMap.REST.SurfaceAnalystMethod
 * {Object} 表面分析方法枚举类。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 *
 * ISOLINE: "ISOLINE",
 *
 * ISOREGION: "ISOREGION".
 */
SuperMap.REST.SurfaceAnalystMethod = {
    ISOLINE: "ISOLINE",
    ISOREGION: "ISOREGION"
}
/**
 * Constant: SuperMap.REST.DataReturnMode
 * {Object} 数据返回模式枚举类。
 * 该枚举类用于指定空间分析返回结果模式,包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 * 
 * DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
 * 
 * DATASET_ONLY: "DATASET_ONLY",
 *
 * RECORDSET_ONLY: "RECORDSET_ONLY".
 */
SuperMap.REST.DataReturnMode = {
    DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
    DATASET_ONLY: "DATASET_ONLY",
    RECORDSET_ONLY: "RECORDSET_ONLY"
}

/**
 * Constant: SuperMap.REST.EditType
 * {Object} 要素集更新模式枚举类。
 * 该枚举类用于指定数据服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 * 
 * ADD: "add",
 * 
 * UPDATE: "update",
 *
 * DELETE: "delete".
 */
SuperMap.REST.EditType = {
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete"
}

/**
 * Constant: SuperMap.REST.TransferTactic
 * {Object} 公交换乘策略枚举类。
 * 该枚举类用于指定公交服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 * 
 * LESS_TIME: "LESS_TIME",
 * 
 * LESS_TRANSFER: "LESS_TRANSFER",
 *
 * LESS_WALK: "LESS_WALK",
 *
 * MIN_DISTANCE: "MIN_DISTANCE" 
 */
SuperMap.REST.TransferTactic = {
    LESS_TIME: "LESS_TIME",
    LESS_TRANSFER: "LESS_TRANSFER",
    LESS_WALK: "LESS_WALK",
    MIN_DISTANCE: "MIN_DISTANCE"
}

/**
 * Constant: SuperMap.REST.TransferPreference
 * {Object} 公交换乘策略枚举类。
 * 该枚举类用于指定交通换乘服务中设置地铁优先、公交优先、不乘地铁、无偏好等偏好设置。
 * 
 * BUS: "BUS",
 * 
 * SUBWAY: "SUBWAY",
 *
 * NO_SUBWAY: "NO_SUBWAY",
 *
 * NONE: "NONE" 
 */
SuperMap.REST.TransferPreference = {
    BUS: "BUS",
    SUBWAY: "SUBWAY",
    NO_SUBWAY: "NO_SUBWAY",
    NONE: "NONE"
}

/**
 * Constant: SuperMap.REST.GridType
 * {Object} 地图背景格网类型枚举类。
 * 
 * CROSS: "CROSS",
 * 
 * GRID: "GRID",
 *
 * POINT: "POINT"
 */
SuperMap.REST.GridType = {
    CROSS: "CROSS",
    GRID: "GRID",
    POINT: "POINT"
}

/**
 * Constant: SuperMap.REST.ColorSpaceType
 * {Object} 色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 *
 * CMYK: "CMYK",
 * 
 * RGB: "RGB"
 */
SuperMap.REST.ColorSpaceType = {
    CMYK: "CMYK",
    RGB: "RGB"
}

/**
 * Constant: SuperMap.REST.LayerType
 * {Object} 图层类型。
 *
 * UGC: "UGC",
 * 
 * WMS: "WMS"
 *
 * WFS: "WFS",
 * 
 * CUSTOM: "CUSTOM"
 */
SuperMap.REST.LayerType = {
    UGC: "UGC",
    WMS: "WMS",
    WFS: "WFS",
    CUSTOM: "CUSTOM"
    
}

/**
 * Constant: SuperMap.REST.StatisticMode
 * {Object} 字段统计方法类型。
 *
 * AVERAGE: "AVERAGE", 统计所选字段的平均值
 *
 * MAX: "MAX", 统计所选字段的最大值
 *
 * MIN: "MIN", 统计所选字段的最小值
 *
 * STDDEVIATION: "STDDEVIATION", 统计所选字段的标准差
 *
 * SUM: "SUM", 统计所选字段的总和
 *
 * VARIANCE: "VARIANCE", 统计所选字段的方差
 */
SuperMap.REST.StatisticMode = {
    AVERAGE: "AVERAGE",
    MAX: "MAX",
    MIN: "MIN",
    STDDEVIATION: "STDDEVIATION",
    SUM: "SUM",
    VARIANCE: "VARIANCE"
}

/**
 * Constant: SuperMap.REST.PixelFormat
 * {Object} 栅格与影像数据存储的像素格式枚举类。
 *
 * BIT16: "BIT16", 每个像元用16个比特(即2个字节)表示
 *
 * BIT32: "BIT32", 每个像元用32个比特(即4个字节)表示
 *
 * BIT64: "BIT64", 每个像元用64个比特(即8个字节)表示，只提供给栅格数据集使用
 *
 * SINGLE: "SINGLE", 每个像元用4个字节来表示，只提供给栅格数据集使用
 *
 * DOUBLE: "DOUBLE", 每个像元用8个字节来表示，只提供给栅格数据集使用
 *
 * UBIT1: "UBIT1", 每个像元用1个比特表示
 *
 * UBIT4: "UBIT4", 每个像元用4个比特来表示
 *
 * UBIT8: "UBIT8", 每个像元用8个比特(即1个字节)来表示
 *
 * UBIT24: "UBIT24", 每个像元用24个比特(即3个字节)来表示
 *
 * UBIT32: "UBIT32", 每个像元用32个比特(即4个字节)来表示
 */
SuperMap.REST.PixelFormat = {
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
}

/**
 * Constant: SuperMap.REST.SearchMode
 * {Object} 内插时使用的样本点的查找方式枚举
 *
 * KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT", 使用 KDTREE 的固定点数方式查找参与内插分析的点
 *
 * KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS", 使用 KDTREE 的定长方式查找参与内插分析的点
 *
 * NONE: "NONE", 不进行查找，使用所有的输入点进行内插分析
 *
 * QUADTREE: "QUADTREE", 使用 QUADTREE 方式查找参与内插分析的点，仅对样条（RBF）插值和普通克吕金（Kriging）有用
 */
SuperMap.REST.SearchMode = {
    KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
    KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
    NONE: "NONE",
    QUADTREE: "QUADTREE"
}

/**
 * Constant: SuperMap.REST.InterpolationAlgorithmType
 * {Object} 插值分析的算法的类型
 *
 * KRIGING: "KRIGING", 普通克吕金插值法
 *
 * SimpleKriging: "SimpleKriging", 简单克吕金插值法
 *
 * UniversalKriging: "UniversalKriging", 泛克吕金插值法
 */
SuperMap.REST.InterpolationAlgorithmType = {
    KRIGING: "KRIGING",
    SimpleKriging: "SimpleKriging",
    UniversalKriging: "UniversalKriging"
}

/**
 * Constant: SuperMap.REST.VariogramMode
 * {Object} 克吕金（Kriging）插值时的半变函数类型枚举
 *
 * EXPONENTIAL: "EXPONENTIAL", 指数函数（Exponential Variogram Mode）
 *
 * GAUSSIAN: "GAUSSIAN",  高斯函数（Gaussian Variogram Mode）
 *
 * SPHERICAL: "SPHERICAL", 球型函数（Spherical Variogram Mode）
 */
SuperMap.REST.VariogramMode = {
    EXPONENTIAL: "EXPONENTIAL",
    GAUSSIAN: "GAUSSIAN",
    SPHERICAL: "SPHERICAL"
}

/**
 * Constant: SuperMap.REST.Exponent
 * {Object} 定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数
 *
 * EXP1: "EXP1", 阶数为1
 *
 * EXP2: "EXP2", 阶数为2
 */
SuperMap.REST.Exponent = {
    EXP1: "EXP1",
    EXP2: "EXP2"
}
