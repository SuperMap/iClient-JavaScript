/*!
 * 
 *     iclient-classic.(http://iclient.supermapol.com)
 *     Copyright© 2000-2017 SuperMap Software Co. Ltd
 *     license: Apache-2.0
 *     version: v9.0.0
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(29);

exports.default = window.SuperMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SummaryType = exports.StatisticAnalystMode = exports.AnalystSizeUnit = exports.AnalystAreaUnit = exports.ClipAnalystMode = exports.ChartType = exports.ClientType = exports.ServerType = exports.Exponent = exports.VariogramMode = exports.InterpolationAlgorithmType = exports.SearchMode = exports.PixelFormat = exports.StatisticMode = exports.LayerType = exports.ColorSpaceType = exports.GridType = exports.TransferPreference = exports.TransferTactic = exports.EditType = exports.DataReturnMode = exports.SurfaceAnalystMethod = exports.SmoothMethod = exports.OverlayOperationType = exports.BufferEndType = exports.TurnType = exports.SupplyCenterType = exports.SideType = exports.DirectionType = exports.LabelOverLengthMode = exports.LabelBackShape = exports.AlongLineDirection = exports.FillGradientMode = exports.TextAlignment = exports.ColorGradientType = exports.ThemeType = exports.RangeMode = exports.GraduatedMode = exports.GraphAxesTextDisplayMode = exports.ThemeGraphType = exports.ThemeGraphTextFormat = exports.EngineType = exports.Unit = exports.MeasureMode = exports.SpatialRelationType = exports.SpatialQueryMode = exports.JoinType = exports.QueryOption = exports.GeometryType = exports.DataFormat = undefined;

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *服务请求返回结果数据类型
 *  GEOJSON: "GEOJSON",
 *  ISERVER: "ISERVER"
 */
var DataFormat = exports.DataFormat = _SuperMap2.default.DataFormat = {
    GEOJSON: "GEOJSON",
    ISERVER: "ISERVER"
};

/**
 * Constant: GeometryType
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
var GeometryType = exports.GeometryType = _SuperMap2.default.GeometryType = {
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
 * Constant: QueryOption
 * {Object} 查询结果类型枚举类。
 * 该类描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 *
 * ATTRIBUTE: "ATTRIBUTE",
 *
 * ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
 *
 * GEOMETRY: "GEOMETRY".
 */
var QueryOption = exports.QueryOption = _SuperMap2.default.QueryOption = {
    ATTRIBUTE: "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    GEOMETRY: "GEOMETRY"
};

/**
 * Constant: JoinType
 * {Object} 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 *
 * INNERJOIN: "INNERJOIN",
 *
 * LEFTJOIN: "LEFTJOIN".
 */
var JoinType = exports.JoinType = _SuperMap2.default.JoinType = {
    INNERJOIN: "INNERJOIN",
    LEFTJOIN: "LEFTJOIN"
};

/**
 * Constant: SpatialQueryMode
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
var SpatialQueryMode = exports.SpatialQueryMode = _SuperMap2.default.SpatialQueryMode = {
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
 * Constant: SpatialRelationType
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
var SpatialRelationType = exports.SpatialRelationType = _SuperMap2.default.SpatialRelationType = {
    CONTAIN: "CONTAIN",
    INTERSECT: "INTERSECT",
    WITHIN: "WITHIN"
};

/**
 * Constant: MeasureMode
 * {Object} 量算模式枚举类。
 * 该类定义了两种测量模式：距离测量和面积测量。
 *
 * DISTANCE: "DISTANCE",
 *
 * AREA: "AREA".
 */
var MeasureMode = exports.MeasureMode = _SuperMap2.default.MeasureMode = {
    DISTANCE: "DISTANCE",
    AREA: "AREA"
};

/**
 * Constant: Unit
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
var Unit = exports.Unit = _SuperMap2.default.Unit = {
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
 * Constant: EngineType
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
var EngineType = exports.EngineType = _SuperMap2.default.EngineType = {
    IMAGEPLUGINS: "IMAGEPLUGINS",
    OGC: "OGC",
    ORACLEPLUS: "ORACLEPLUS",
    SDBPLUS: "SDBPLUS",
    SQLPLUS: "SQLPLUS",
    UDB: "UDB"
};

/**
 * Constant: ThemeGraphTextFormat
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
var ThemeGraphTextFormat = exports.ThemeGraphTextFormat = _SuperMap2.default.ThemeGraphTextFormat = {
    CAPTION: "CAPTION",
    CAPTION_PERCENT: "CAPTION_PERCENT",
    CAPTION_VALUE: "CAPTION_VALUE",
    PERCENT: "PERCENT",
    VALUE: "VALUE"
};

/**
 * Constant: ThemeGraphType
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
var ThemeGraphType = exports.ThemeGraphType = _SuperMap2.default.ThemeGraphType = {
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
 * Constant: GraphAxesTextDisplayMode
 * {Object} 统计专题图坐标轴文本显示模式。
 * ALL: "ALL", 显示全部文本
 *
 * NONE: "NONE", 没有显示
 *
 * YAXES: "YAXES". 显示Y轴的文本
 */
var GraphAxesTextDisplayMode = exports.GraphAxesTextDisplayMode = _SuperMap2.default.GraphAxesTextDisplayMode = {
    ALL: "ALL",
    NONE: "NONE",
    YAXES: "YAXES"
};

/**
 * Constant: GraduatedMode
 * {Object} 专题图分级模式枚举类。 CONSTANT: "CONSTANT",
 *
 * LOGARITHM: "LOGARITHM",
 *
 * SQUAREROOT: "SQUAREROOT".
 */
var GraduatedMode = exports.GraduatedMode = _SuperMap2.default.GraduatedMode = {
    CONSTANT: "CONSTANT",
    LOGARITHM: "LOGARITHM",
    SQUAREROOT: "SQUAREROOT"
};

/**
 * Constant: RangeMode
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
var RangeMode = exports.RangeMode = _SuperMap2.default.RangeMode = {
    CUSTOMINTERVAL: "CUSTOMINTERVAL",
    EQUALINTERVAL: "EQUALINTERVAL",
    LOGARITHM: "LOGARITHM",
    QUANTILE: "QUANTILE",
    SQUAREROOT: "SQUAREROOT",
    STDDEVIATION: "STDDEVIATION"
};

/**
 * Constant: ThemeType
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
var ThemeType = exports.ThemeType = _SuperMap2.default.ThemeType = {
    DOTDENSITY: "DOTDENSITY",
    GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
    GRAPH: "GRAPH",
    LABEL: "LABEL",
    RANGE: "RANGE",
    UNIQUE: "UNIQUE"
};

/**
 * Constant: ColorGradientType
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
var ColorGradientType = exports.ColorGradientType = _SuperMap2.default.ColorGradientType = {
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
 * Constant: TextAlignment
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
var TextAlignment = exports.TextAlignment = _SuperMap2.default.TextAlignment = {
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
 * Constant: FillGradientMode
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
var FillGradientMode = exports.FillGradientMode = _SuperMap2.default.FillGradientMode = {
    NONE: "NONE",
    LINEAR: "LINEAR",
    RADIAL: "RADIAL",
    CONICAL: "CONICAL",
    SQUARE: "SQUARE"
};

/**
 * Constant: AlongLineDirection
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
var AlongLineDirection = exports.AlongLineDirection = _SuperMap2.default.AlongLineDirection = {
    NORMAL: "ALONG_LINE_NORMAL",
    LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
    LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
    RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
    RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
};

/**
 * Constant: LabelBackShape
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
var LabelBackShape = exports.LabelBackShape = _SuperMap2.default.LabelBackShape = {
    DIAMOND: "DIAMOND",
    ELLIPSE: "ELLIPSE",
    MARKER: "MARKER",
    NONE: "NONE",
    RECT: "RECT",
    ROUNDRECT: "ROUNDRECT",
    TRIANGLE: "TRIANGLE"
};

/**
 * Constant: LabelOverLengthMode
 * {Object} 标签专题图中超长标签的处理模式枚举类。
 *
 * NEWLINE: "NEWLINE",
 *
 * NONE: "NONE",
 *
 * OMIT: "OMIT".
 */
var LabelOverLengthMode = exports.LabelOverLengthMode = _SuperMap2.default.LabelOverLengthMode = {
    NEWLINE: "NEWLINE",
    NONE: "NONE",
    OMIT: "OMIT"
};

/**
 * Constant: DirectionType
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
var DirectionType = exports.DirectionType = _SuperMap2.default.DirectionType = {
    EAST: "EAST",
    NONE: "NONE",
    NORTH: "NORTH",
    SOURTH: "SOURTH",
    WEST: "WEST"
};

/**
 * Constant: SideType
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
var SideType = exports.SideType = _SuperMap2.default.SideType = {
    LEFT: "LEFT",
    MIDDLE: "MIDDLE",
    NONE: "NONE",
    RIGHT: "RIGHT"
};

/**
 * Constant: SupplyCenterType
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
var SupplyCenterType = exports.SupplyCenterType = _SuperMap2.default.SupplyCenterType = {
    FIXEDCENTER: "FIXEDCENTER",
    NULL: "NULL",
    OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * Constant: TurnType
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
var TurnType = exports.TurnType = _SuperMap2.default.TurnType = {
    AHEAD: "AHEAD",
    BACK: "BACK",
    END: "END",
    LEFT: "LEFT",
    NONE: "NONE",
    RIGHT: "RIGHT"
};

/**
 * Constant: BufferEndType
 * {Object} 缓冲区分析BufferEnd类型。
 *
 * FLAT: "FLAT",
 *
 * ROUND: "ROUND".
 */
var BufferEndType = exports.BufferEndType = _SuperMap2.default.BufferEndType = {
    FLAT: "FLAT",
    ROUND: "ROUND"
};

/**
 * Constant: OverlayOperationType
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
var OverlayOperationType = exports.OverlayOperationType = _SuperMap2.default.OverlayOperationType = {
    CLIP: "CLIP",
    ERASE: "ERASE",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    UNION: "UNION",
    UPDATE: "UPDATE",
    XOR: "XOR"
};

/**
 * Constant: SmoothMethod
 * {Object} 光滑方法枚举类。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 *
 * BSPLINE: "BSPLINE",
 *
 * POLISH: "POLISH".
 */
var SmoothMethod = exports.SmoothMethod = _SuperMap2.default.SmoothMethod = {
    BSPLINE: "BSPLINE",
    POLISH: "POLISH"
};

/**
 * Constant: SurfaceAnalystMethod
 * {Object} 表面分析方法枚举类。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 *
 * ISOLINE: "ISOLINE",
 *
 * ISOREGION: "ISOREGION".
 */
var SurfaceAnalystMethod = exports.SurfaceAnalystMethod = _SuperMap2.default.SurfaceAnalystMethod = {
    ISOLINE: "ISOLINE",
    ISOREGION: "ISOREGION"
};
/**
 * Constant: DataReturnMode
 * {Object} 数据返回模式枚举类。
 * 该枚举类用于指定空间分析返回结果模式,包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 *
 * DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
 *
 * DATASET_ONLY: "DATASET_ONLY",
 *
 * RECORDSET_ONLY: "RECORDSET_ONLY".
 */
var DataReturnMode = exports.DataReturnMode = _SuperMap2.default.DataReturnMode = {
    DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
    DATASET_ONLY: "DATASET_ONLY",
    RECORDSET_ONLY: "RECORDSET_ONLY"
};

/**
 * Constant: EditType
 * {Object} 要素集更新模式枚举类。
 * 该枚举类用于指定数据服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 *
 * ADD: "add",
 *
 * UPDATE: "update",
 *
 * DELETE: "delete".
 */
var EditType = exports.EditType = _SuperMap2.default.EditType = {
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete"
};

/**
 * Constant: TransferTactic
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
var TransferTactic = exports.TransferTactic = _SuperMap2.default.TransferTactic = {
    LESS_TIME: "LESS_TIME",
    LESS_TRANSFER: "LESS_TRANSFER",
    LESS_WALK: "LESS_WALK",
    MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * Constant: TransferPreference
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
var TransferPreference = exports.TransferPreference = _SuperMap2.default.TransferPreference = {
    BUS: "BUS",
    SUBWAY: "SUBWAY",
    NO_SUBWAY: "NO_SUBWAY",
    NONE: "NONE"
};

/**
 * Constant: GridType
 * {Object} 地图背景格网类型枚举类。
 *
 * CROSS: "CROSS",
 *
 * GRID: "GRID",
 *
 * POINT: "POINT"
 */
var GridType = exports.GridType = _SuperMap2.default.GridType = {
    CROSS: "CROSS",
    GRID: "GRID",
    POINT: "POINT"
};

/**
 * Constant: ColorSpaceType
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
var ColorSpaceType = exports.ColorSpaceType = _SuperMap2.default.ColorSpaceType = {
    CMYK: "CMYK",
    RGB: "RGB"
};

/**
 * Constant: LayerType
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
var LayerType = exports.LayerType = _SuperMap2.default.LayerType = {
    UGC: "UGC",
    WMS: "WMS",
    WFS: "WFS",
    CUSTOM: "CUSTOM"

};

/**
 * Constant: StatisticMode
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
var StatisticMode = exports.StatisticMode = _SuperMap2.default.StatisticMode = {
    AVERAGE: "AVERAGE",
    MAX: "MAX",
    MIN: "MIN",
    STDDEVIATION: "STDDEVIATION",
    SUM: "SUM",
    VARIANCE: "VARIANCE"
};

/**
 * Constant: PixelFormat
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
var PixelFormat = exports.PixelFormat = _SuperMap2.default.PixelFormat = {
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
 * Constant: SearchMode
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
var SearchMode = exports.SearchMode = _SuperMap2.default.SearchMode = {
    KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
    KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
    NONE: "NONE",
    QUADTREE: "QUADTREE"
};

/**
 * Constant: InterpolationAlgorithmType
 * {Object} 插值分析的算法的类型
 *
 * KRIGING: "KRIGING", 普通克吕金插值法
 *
 * SimpleKriging: "SimpleKriging", 简单克吕金插值法
 *
 * UniversalKriging: "UniversalKriging", 泛克吕金插值法
 */
var InterpolationAlgorithmType = exports.InterpolationAlgorithmType = _SuperMap2.default.InterpolationAlgorithmType = {
    KRIGING: "KRIGING",
    SimpleKriging: "SimpleKriging",
    UniversalKriging: "UniversalKriging"
};

/**
 * Constant: VariogramMode
 * {Object} 克吕金（Kriging）插值时的半变函数类型枚举
 *
 * EXPONENTIAL: "EXPONENTIAL", 指数函数（Exponential Variogram Mode）
 *
 * GAUSSIAN: "GAUSSIAN",  高斯函数（Gaussian Variogram Mode）
 *
 * SPHERICAL: "SPHERICAL", 球型函数（Spherical Variogram Mode）
 */
var VariogramMode = exports.VariogramMode = _SuperMap2.default.VariogramMode = {
    EXPONENTIAL: "EXPONENTIAL",
    GAUSSIAN: "GAUSSIAN",
    SPHERICAL: "SPHERICAL"
};

/**
 * Constant: Exponent
 * {Object} 定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数
 *
 * EXP1: "EXP1", 阶数为1
 *
 * EXP2: "EXP2", 阶数为2
 */
var Exponent = exports.Exponent = _SuperMap2.default.Exponent = {
    EXP1: "EXP1",
    EXP2: "EXP2"
};
var ServerType = exports.ServerType = _SuperMap2.default.ServerType = {
    ISERVER: "ISERVER",
    IPORTAL: "IPORTAL",
    ONLINE: "ONLINE"
};
/**
 * token申请的客户端标识类型
 * @type {{IP: string, REFERER: string, REQUESTIP: string, NONE: string}}
 */
var ClientType = exports.ClientType = _SuperMap2.default.ClientType = {
    IP: "IP",
    REFERER: "Referer",
    REQUESTIP: "RequestIP",
    NONE: "NONE",
    SERVER: "SERVER",
    WEB: "WEB"
};
/**
 * 客户端专题图图表类型
 * @type {{BAR: string, BAR3D: string, CIRCLE: string, PIE: string, POINT: string, LINE: string, RING: string}}
 */
var ChartType = exports.ChartType = _SuperMap2.default.ChartType = {
    BAR: "Bar",
    BAR3D: "Bar3D",
    CIRCLE: "Circle",
    PIE: "Pie",
    POINT: "Point",
    LINE: "Line",
    RING: "Ring"
};
/**
 * 裁剪分析模式
 * @type {{CLIP: string, INTERSECT: string}}
 */
var ClipAnalystMode = exports.ClipAnalystMode = _SuperMap2.default.ClipAnalystMode = {
    CLIP: "clip",
    INTERSECT: "intersect"
};
/**
 * 分布式空间分析面积单位
 * @type {{SQUAREMETER: string, SQUAREKILOMETER: string, HECTARE: string, ARE: string, ACRE: string, SQUAREFOOT: string, SQUAREYARD: string, SQUAREMILE: string}}
 */
var AnalystAreaUnit = exports.AnalystAreaUnit = _SuperMap2.default.AnalystAreaUnit = {
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
 * 分布式空间分析单位
 * @type {{METER: string, KILOMETER: string, YARD: string, FOOT: string, MILE: string}}
 */
var AnalystSizeUnit = exports.AnalystSizeUnit = _SuperMap2.default.AnalystSizeUnit = {
    "METER": "Meter",
    "KILOMETER": "Kilometer",
    "YARD": "Yard",
    "FOOT": "Foot",
    "MILE": "Mile"
};
/**
 * 分布式空间分析统计模式
 * @type {{MAX: string, MIN: string, AVERAGE: string, SUM: string, VARIANCE: string, STDDEVIATION: string}}
 */
var StatisticAnalystMode = exports.StatisticAnalystMode = _SuperMap2.default.StatisticAnalystMode = {
    "MAX": "max",
    "MIN": "min",
    "AVERAGE": "average",
    "SUM": "sum",
    "VARIANCE": "variance",
    "STDDEVIATION": "stdDeviation"
};
/**
 * 分布式空间分析聚合类型
 * @type {{SUMMARYMESH: string, SUMMARYREGION: string}}
 */
var SummaryType = exports.SummaryType = _SuperMap2.default.SummaryType = {
    "SUMMARYMESH": "SUMMARYMESH",
    "SUMMARYREGION": "SUMMARYREGION"

};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _CommonServiceBase2 = __webpack_require__(4);

var _CommonServiceBase3 = _interopRequireDefault(_CommonServiceBase2);

var _FetchRequest = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.ProcessingServiceBase
 * @description 分布式空间分析服务基类
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 分布式空间分析服务地址。
 * @param options - {Object} 参数。如：<br>
 *        events - {SuperMap.Events} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        index - {number}服务访问地址在数组中的位置。<br>
 *        length - {number}服务访问地址数组长度。
 */
var ProcessingServiceBase = function (_CommonServiceBase) {
    _inherits(ProcessingServiceBase, _CommonServiceBase);

    function ProcessingServiceBase(url, options) {
        _classCallCheck(this, ProcessingServiceBase);

        options = options || {};
        /*
         * Constant: EVENT_TYPES
         * {Array<string>}
         * 此类支持的事件类型
         * - *processCompleted* 创建成功后触发的事件。
         * - *processFailed* 创建失败后触发的事件 。
         * - *processRunning* 创建过程的整个阶段都会触发的事件，用于获取创建过程的状态 。
         */
        options.EVENT_TYPES = ["processCompleted", "processFailed", "processRunning"];

        var _this = _possibleConstructorReturn(this, (ProcessingServiceBase.__proto__ || Object.getPrototypeOf(ProcessingServiceBase)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.ProcessingServiceBase";
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(ProcessingServiceBase, [{
        key: 'destroy',
        value: function destroy() {
            _get(ProcessingServiceBase.prototype.__proto__ || Object.getPrototypeOf(ProcessingServiceBase.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.ProcessingServiceBase.prototype.getJobs
         * @description 获取分布式空间分析任务。
         * @param url - {string} 资源地址。
         */

    }, {
        key: 'getJobs',
        value: function getJobs(url) {
            var me = this;
            return _FetchRequest.FetchRequest.get(url).then(function (response) {
                return response.json();
            }).then(function (result) {
                me.events.triggerEvent("processCompleted", { result: result });
            }).catch(function (e) {
                me.eventListeners.processFailed({ error: e });
            });
        }

        /**
         * @function SuperMap.ProcessingServiceBase.prototype.addJob
         * @description 添加分布式空间分析任务。
         * @param url - {string} 资源根地址。
         * @param params - {Object} 创建一个空间分析的请求参数。
         * @param paramType - {string} - 请求参数类型。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         */

    }, {
        key: 'addJob',
        value: function addJob(url, params, paramType, seconds) {
            var me = this,
                parameterObject = null;
            if (params && params instanceof paramType) {
                parameterObject = new Object();
                paramType.toObject(params, parameterObject);
            }
            var options = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            return _FetchRequest.FetchRequest.post(me._processUrl(url), JSON.stringify(parameterObject), options).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.succeed) {
                    me.serviceProcessCompleted(result, seconds);
                } else {
                    me.serviceProcessFailed(result);
                }
            }).catch(function (e) {
                me.eventListeners.processFailed({ error: e });
            });
        }
    }, {
        key: 'serviceProcessCompleted',
        value: function serviceProcessCompleted(result, seconds) {
            result = _SuperMap2.default.Util.transformResult(result);
            seconds = seconds || 1000;
            var me = this;
            if (result) {
                var id = setInterval(function () {
                    return _FetchRequest.FetchRequest.get(result.newResourceLocation).then(function (response) {
                        return response.json();
                    }).then(function (job) {
                        me.events.triggerEvent("processRunning", { id: job.id, state: job.state });
                        if (job.state.runState === 'LOST') {
                            clearInterval(id);
                            me.events.triggerEvent("processFailed", { error: job.state.errorMsg });
                        }
                        if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
                            clearInterval(id);
                            me.events.triggerEvent("processCompleted", { result: job });
                        }
                    }).catch(function (e) {
                        clearInterval(id);
                        me.events.triggerEvent("processFailed", { error: e });
                    });
                }, seconds);
            }
        }
    }, {
        key: 'serviceProcessFailed',
        value: function serviceProcessFailed(result) {
            _get(ProcessingServiceBase.prototype.__proto__ || Object.getPrototypeOf(ProcessingServiceBase.prototype), 'serviceProcessFailed', this).call(this, result);
        }

        //为不是以.json结尾的url加上.json，并且如果有token的话，在.json后加上token参数。

    }, {
        key: '_processUrl',
        value: function _processUrl(url) {
            if (url.indexOf('.json') === -1) {
                url += '.json';
            }
            if (_SuperMap2.default.SecurityManager.getToken(url)) {
                url += '?token=' + _SuperMap2.default.SecurityManager.getToken(url);
            }
            return url;
        }
    }]);

    return ProcessingServiceBase;
}(_CommonServiceBase3.default);

exports.default = ProcessingServiceBase;


_SuperMap2.default.ProcessingServiceBase = ProcessingServiceBase;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = window.SuperMap;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

__webpack_require__(26);

var _FetchRequest = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.CommonServiceBase
 * @classdesc common服务基类
 * @param url - {string} 与客户端交互的服务地址。
 * @param options - {Object} 参数。如：<br>
 *        events - {SuperMap.Events} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        index - {number}服务访问地址在数组中的位置。<br>
 *        length - {number}服务访问地址数组长度。
 */
var CommonServiceBase = function () {

    /*
     * Property: _processFailed
     * {Function} 请求参数中失败回调函数。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.POLLING_TIMES -{Integer}
     * @description 默认请求失败次数。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.options -{Object}
     * @description 请求参数。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.index -{number}
     * @description 服务访问地址在数组中的位置。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.urls -{Array}
     * @description 服务访问地址数组。
     */


    /*
     * @member SuperMap.CommonServiceBase.prototype.eventListeners -{Object}
     * @description: 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */


    /*
     * @constant: EVENT_TYPES- {Array<string>}
     * @description 此类支持的事件类型
     * - *processCompleted* 服务端返回信息成功触发该事件 。
     * - *processFailed* 服务端返回信息失败触发该事件 。
     */
    function CommonServiceBase(url, options) {
        _classCallCheck(this, CommonServiceBase);

        this.EVENT_TYPES = ["processCompleted", "processFailed"];
        this.events = null;
        this.eventListeners = null;
        this.url = null;
        this.urls = null;
        this.serverType = null;
        this.index = null;
        this.length = null;
        this.options = null;
        this.totalTimes = null;
        this.POLLING_TIMES = 3;
        this._processSuccess = null;
        this._processFailed = null;
        this.isInTheSameDomain = null;
        this.CLASS_NAME = "SuperMap.CommonServiceBase";

        var me = this;

        if (_SuperMap2.default.Util.isArray(url)) {
            me.urls = url;
            me.length = url.length;
            me.totalTimes = me.length;
            if (me.length === 1) {
                me.url = url[0];
            } else {
                me.index = parseInt(Math.random() * me.length);
                me.url = url[me.index];
            }
        } else {
            me.totalTimes = 1;
            me.url = url;
        }

        if (_SuperMap2.default.Util.isArray(url) && !me.isServiceSupportPolling()) {
            me.url = url[0];
            me.totalTimes = 1;
        }

        me.serverType = me.serverType || _SuperMap2.default.ServerType.ISERVER;

        options = options || {};

        if (options) {
            _SuperMap2.default.Util.extend(this, options);
        }

        me.isInTheSameDomain = _SuperMap2.default.Util.isInTheSameDomain(me.url);

        me.events = new _SuperMap2.default.Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.destroy
     * @description: 释放资源，将引用的资源属性置空。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.isInTheSameDomain -{boolean}
     * @description 是否在同一领域内
     */


    /*
     * @member SuperMap.CommonServiceBase.prototype._processSuccess -{Function}
     * @description 请求参数中成功回调函数。
     */


    /**
     *  @member SuperMap.CommonServiceBase.prototype.totalTimes -{Integer}
     *  @description 实际请求失败次数。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.length -{number}
     * @description 服务访问地址数组长度。
     */


    /**
     * @member SuperMap.CommonServiceBase.prototype.serverType -{SuperMap.ServerType}
     * @description 服务器类型，iServer|iPortal|Online
     */


    /*
     * @member SuperMap.CommonServiceBase.prototype.url -{string}|{Array}
     * @description: 服务访问地址或者服务访问地址数组。
     * @example
     * var url1 = "http://localhost:8090/iserver/services/map-world/rest/maps/World";
     * var url2 = ["http://192.168.17.168:8090/iserver/services/map-world/rest/maps/World",
     *            "http://192.168.17.169:8091/iserver/services/map-world/rest/maps/World"];
     */


    /*
     * @member SuperMap.CommonServiceBase.prototype.events -{SuperMap.Events}
     * @description: 处理所有事件的对象，支持processCompleted 、processFailed 两种事件
     *               服务端成功返回地图信息结果时触发 processCompleted事件，服务端返回信息结果时触发 processFailed 事件。
     */


    _createClass(CommonServiceBase, [{
        key: 'destroy',
        value: function destroy() {
            var me = this;
            if (_SuperMap2.default.Util.isArray(me.urls)) {
                me.urls = null;
                me.index = null;
                me.length = null;
                me.totalTimes = null;
            }
            me.url = null;
            me.options = null;
            me._processSuccess = null;
            me._processFailed = null;
            me.isInTheSameDomain = null;

            me.EVENT_TYPES = null;
            if (me.events) {
                me.events.destroy();
                me.events = null;
            }
            if (me.eventListeners) {
                me.eventListeners = null;
            }
        }

        /**
         * @function  SuperMap.CommonServiceBase.prototype.request
         * @description: 该方法用于向服务发送请求。
         * @param options - {Object} 参数。
         *        method - {string} 请求方式，包括GET，POST，PUT， DELETE。<br>
         *        url - {string}  发送请求的地址。<br>
         *        params - {Object} 作为查询字符串添加到url中的一组键值对，此参数只适用于GET方式发送的请求。<br>
         *        data - {String } 发送到服务器的数据。<br>
         *        success - {function} 请求成功后的回调函数。<br>
         *        failure - {function} 请求失败后的回调函数。<br>
         *        scope - {Object} 如果回调函数是对象的一个公共方法，设定该对象的范围。<br>
         *        isInTheSameDomain - {boolean} 请求是否在当前域中。<br>
         */

    }, {
        key: 'request',
        value: function request(options) {
            var me = this;
            options.url = options.url || me.url;
            options.isInTheSameDomain = me.isInTheSameDomain;
            //为url添加安全认证信息片段
            var credential = this.getCredential(options.url);
            if (credential) {
                //当url中含有?，并且?在url末尾的时候直接添加token *网络分析等服务请求url会出现末尾是?的情况*
                //当url中含有?，并且?不在url末尾的时候添加&token
                //当url中不含有?，在url末尾添加?token
                var endStr = options.url.substring(options.url.length - 1, options.url.length);
                if (options.url.indexOf("?") > -1 && endStr === "?") {
                    options.url += credential.getUrlParameters();
                } else if (options.url.indexOf("?") > -1 && endStr !== "?") {
                    options.url += "&" + credential.getUrlParameters();
                } else {
                    options.url += "?" + credential.getUrlParameters();
                }
            }
            me.calculatePollingTimes();
            me._processSuccess = options.success;
            me._processFailed = options.failure;
            options.scope = me;
            options.success = me.getUrlCompleted;
            options.failure = me.getUrlFailed;
            me.options = options;
            me._commit(me.options);
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.getCredential
         * @description  获取凭据信息
         * @param url - {string} 服务地址。
         */

    }, {
        key: 'getCredential',
        value: function getCredential(url) {
            var keyUrl = url,
                credential = void 0,
                value = void 0;
            switch (this.serverType) {
                case _SuperMap2.default.ServerType.ISERVER:
                    value = _SuperMap2.default.SecurityManager.getToken(keyUrl);
                    credential = value ? new _SuperMap2.default.Credential(value, "token") : null;
                    break;
                case _SuperMap2.default.ServerType.IPORTAL:
                    value = _SuperMap2.default.SecurityManager.getToken(keyUrl);
                    credential = value ? new _SuperMap2.default.Credential(value, "token") : null;
                    if (!credential) {
                        value = _SuperMap2.default.SecurityManager.getKey(keyUrl);
                        credential = value ? new _SuperMap2.default.Credential(value, "key") : null;
                    }
                    break;
                case _SuperMap2.default.ServerType.ONLINE:
                    value = _SuperMap2.default.SecurityManager.getKey(keyUrl);
                    credential = value ? new _SuperMap2.default.Credential(value, "key") : null;
                    break;
                default:
                    value = _SuperMap2.default.SecurityManager.getToken(keyUrl);
                    credential = value ? new _SuperMap2.default.Credential(value, "token") : null;
                    break;
            }
            return credential;
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.getUrlCompleted
         * @description 请求成功后执行此方法。
         * @param result - {Object} 服务器返回的结果对象。
         */

    }, {
        key: 'getUrlCompleted',
        value: function getUrlCompleted(result) {
            var me = this;
            me._processSuccess(result);
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.getUrlFailed
         * @description 请求失败后执行此方法。
         * @param result - {Object} 服务器返回的结果对象。
         */

    }, {
        key: 'getUrlFailed',
        value: function getUrlFailed(result) {
            var me = this;
            if (me.totalTimes > 0) {
                me.totalTimes--;
                me.ajaxPolling();
            } else {
                me._processFailed(result);
            }
        }

        /**
         *
         * @function SuperMap.CommonServiceBase.prototype.ajaxPolling
         * @description 请求失败后，如果剩余请求失败次数不为0，重新获取url发送请求
         */

    }, {
        key: 'ajaxPolling',
        value: function ajaxPolling() {
            var me = this,
                url = me.options.url,
                re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
            me.index = parseInt(Math.random() * me.length);
            me.url = me.urls[me.index];
            url = url.replace(re, re.exec(me.url)[0]);
            me.options.url = url;
            me.options.isInTheSameDomain = _SuperMap2.default.Util.isInTheSameDomain(url);
            me._commit(me.options);
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.calculatePollingTimes
         * @description 计算剩余请求失败执行次数。
         */

    }, {
        key: 'calculatePollingTimes',
        value: function calculatePollingTimes() {
            var me = this;
            if (me.times) {
                if (me.totalTimes > me.POLLING_TIMES) {
                    if (me.times > me.POLLING_TIMES) {
                        me.totalTimes = me.POLLING_TIMES;
                    } else {
                        me.totalTimes = me.times;
                    }
                } else {
                    if (me.times < me.totalTimes) {
                        me.totalTimes = me.times;
                    }
                }
            } else {
                if (me.totalTimes > me.POLLING_TIMES) {
                    me.totalTimes = me.POLLING_TIMES;
                }
            }
            me.totalTimes--;
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.isServiceSupportPolling
         * @description 判断服务是否支持轮询。
         */

    }, {
        key: 'isServiceSupportPolling',
        value: function isServiceSupportPolling() {
            var me = this;
            return !(me.CLASS_NAME === "SuperMap.REST.ThemeService" || me.CLASS_NAME === "SuperMap.REST.EditFeaturesService");
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.serviceProcessCompleted
         * @description 状态完成，执行此方法。
         * @param result - {Object} 服务器返回的结果对象。
         */

    }, {
        key: 'serviceProcessCompleted',
        value: function serviceProcessCompleted(result) {
            result = _SuperMap2.default.Util.transformResult(result);
            this.events.triggerEvent("processCompleted", { result: result });
        }

        /**
         * @function SuperMap.CommonServiceBase.prototype.serviceProcessFailed
         * @description 状态失败，执行此方法。
         * @param result - {Object} 服务器返回的结果对象。
         */

    }, {
        key: 'serviceProcessFailed',
        value: function serviceProcessFailed(result) {
            result = _SuperMap2.default.Util.transformResult(result);
            var error = result.error || result;
            this.events.triggerEvent("processFailed", { error: error });
        }
    }, {
        key: '_commit',
        value: function _commit(options) {
            if (options.method === "POST" || options.method === "PUT") {
                if (options.params) {
                    options.url = _SuperMap2.default.Util.urlAppend(options.url, _SuperMap2.default.Util.getParameterString(options.params || {}));
                }
                options.params = options.data;
            }
            _FetchRequest.FetchRequest.commit(options.method, options.url, options.params, {
                headers: options.headers,
                withCredentials: options.withCredentials,
                timeout: options.async ? 0 : null,
                proxy: options.proxy
            }).then(function (response) {
                return response.text();
            }).then(function (text) {
                var result = new _SuperMap2.default.Format.JSON().read(text);
                if (!result) {
                    result = { error: text };
                }
                if (result.error) {
                    var failure = options.scope ? _SuperMap2.default.Function.bind(options.failure, options.scope) : options.failure;
                    failure(result.error);
                } else {
                    result.succeed = result.succeed == undefined ? true : result.succeed;
                    var success = options.scope ? _SuperMap2.default.Function.bind(options.success, options.scope) : options.success;
                    success(result);
                }
            });
        }
    }]);

    return CommonServiceBase;
}();

exports.default = CommonServiceBase;


_SuperMap2.default.CommonServiceBase = CommonServiceBase;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchRequest = exports.Support = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _whatwgFetchImportable = __webpack_require__(10);

var _whatwgFetchImportable2 = _interopRequireDefault(_whatwgFetchImportable);

var _fetchJsonp2 = __webpack_require__(9);

var _fetchJsonp3 = _interopRequireDefault(_fetchJsonp2);

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Support = exports.Support = _SuperMap2.default.Support = _SuperMap2.default.Support || {
    cors: window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()
};
var FetchRequest = exports.FetchRequest = _SuperMap2.default.FetchRequest = {
    commit: function commit(method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this.get(url, params, options);
            case 'POST':
                return this.post(url, params, options);
            case 'PUT':
                return this.put(url, params, options);
            case 'DELETE':
                return this.delete(url, params, options);
            default:
                return this.get(url, params, options);
        }
    },

    get: function get(url, params, options) {
        var type = 'GET';
        url = this._processUrl(url, options);
        url = _SuperMap2.default.Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url)) {
            if (_SuperMap2.default.Util.isInTheSameDomain(url) || Support.cors || options.proxy) {
                return this._fetch(url, params, options, type);
            }
            if (!_SuperMap2.default.Util.isInTheSameDomain(url)) {
                url = url.replace('.json', '.jsonp');
                return this._fetchJsonp(url, options);
            }
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    delete: function _delete(url, params, options) {
        var type = 'DELETE';
        url = this._processUrl(url, options);
        url = _SuperMap2.default.Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url) && Support.cors) {
            return this._fetch(url, params, options, type);
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    post: function post(url, params, options) {
        return this._fetch(this._processUrl(url, options), params, options, 'POST');
    },

    put: function put(url, params, options) {
        return this._fetch(this._processUrl(url, options), params, options, 'PUT');
    },
    urlIsLong: function urlIsLong(url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength++;
            } else if (0x0080 <= charCode && charCode <= 0x07ff) {
                totalLength += 2;
            } else if (0x0800 <= charCode && charCode <= 0xffff) {
                totalLength += 3;
            }
        }
        return totalLength < 2000 ? false : true;
    },
    _postSimulatie: function _postSimulatie(type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method= ' + type;
        return this.post(url, params, options);
    },

    _processUrl: function _processUrl(url, options) {
        if (this._isMVTRequest(url)) {
            return url;
        }

        if (url.indexOf('.json') === -1) {
            if (url.indexOf("?") < 0) {
                url += '.json';
            } else {
                var urlArrays = url.split("?");
                if (urlArrays.length === 2) {
                    url = urlArrays[0] + ".json?" + urlArrays[1];
                }
            }
        }
        if (options && options.proxy) {
            if (typeof options.proxy === "function") {
                url = options.proxy(url);
            } else {
                url = decodeURIComponent(url);
                url = options.proxy + encodeURIComponent(url);
            }
        }
        return url;
    },

    _fetch: function _fetch(url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        if (options.timeout) {
            return this._timeout(options.timeout, (0, _whatwgFetchImportable2.default)(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors'
            }).then(function (response) {
                return response;
            }));
        }
        return (0, _whatwgFetchImportable2.default)(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors'
        }).then(function (response) {
            return response;
        });
    },

    _fetchJsonp: function _fetchJsonp(url, options) {
        options = options || {};
        return (0, _fetchJsonp3.default)(url, { method: 'GET', timeout: options.timeout }).then(function (response) {
            return response;
        });
    },

    _timeout: function _timeout(seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"));
            }, seconds);
            promise.then(resolve, reject);
        });
    },

    _getParameterString: function _getParameterString(params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if (value != null && typeof value !== 'function') {
                var encodedValue;
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(item === null || item === undefined ? "" : item));
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    },

    _isMVTRequest: function _isMVTRequest(url) {
        return url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1;
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapVLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(3);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _MapVRenderer = __webpack_require__(11);

var _MapVRenderer2 = _interopRequireDefault(_MapVRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.Layer.MapVLayer
 * @classdesc MapV图层。
 * @extends SuperMap.Layer
 * @param name - {string} 图层名
 * @param options  - {Object} 可选参数，有如下两个参数：<br>
 *        dataSet - {mapv.DataSet} mapv 的dataSet对象 <br>
 *        options - {Object} mapv 绘图风格配置信息
 */
var MapVLayer = exports.MapVLayer = function (_SuperMap$Layer) {
    _inherits(MapVLayer, _SuperMap$Layer);

    /*
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description
     * MapV支持webgl和普通canvas渲染.
     * 但目前本图层webgl渲染不能正确显示，待解决
     *
     * @param name
     * @param options 有两个参数
     *        dataSet: mapv 的dataSet对象
     *        options: mapv 绘图风格配置信息
     */


    /**
     * @member SuperMap.Layer.MapVLayer.prototype.canvas {Canvas}
     * @description MapV图主绘制面板。
     */


    /**
     * @member SuperMap.Layer.MapVLayer.prototype.options -{Object}
     * @description mapv 绘图风格配置信息
     */
    function MapVLayer(name, options) {
        _classCallCheck(this, MapVLayer);

        var _this = _possibleConstructorReturn(this, (MapVLayer.__proto__ || Object.getPrototypeOf(MapVLayer)).call(this, name, options));

        _this.dataSet = null;
        _this.options = null;
        _this.supported = false;
        _this.canvas = null;
        _this.canvasContext = null;
        _this.CLASS_NAME = "SuperMap.Layer.MapVLayer";

        if (options) {
            _SuperMap2.default.Util.extend(_this, options);
        }
        //MapV图要求使用canvas绘制，判断是否支持
        _this.canvas = document.createElement("canvas");
        if (!_this.canvas.getContext) {
            return _possibleConstructorReturn(_this);
        }
        _this.supported = true;
        //构建绘图面板
        _this.canvas.style.position = "absolute";
        _this.canvas.style.top = 0 + "px";
        _this.canvas.style.left = 0 + "px";
        _this.div.appendChild(_this.canvas);
        var context = _this.options && _this.options.context || "2d";
        _this.canvasContext = _this.canvas.getContext(context);
        _this.attribution = "© 2017 百度 <a href='http://mapv.baidu.com' target='_blank'>MapV</a> with <span>© <a target='_blank' href='http://iclient.supermapol.com' " + "style='color: #08c;text-decoration: none;'>SuperMap iClient</a></span>";
        return _this;
    }

    /**
     * @inheritDoc
     */


    /**
     * @member SuperMap.Layer.MapVLayer.prototype.canvasContext -{Canvas}
     * @description MapV图主绘制对象。
     */


    /**
     * @member SuperMap.Layer.MapVLayer.prototype.supported -{boolean}
     * @description 当前浏览器是否支持canvas绘制，默认为false。决定了MapV图是否可用，内部判断使用。
     */


    /**
     * @member SuperMap.Layer.MapVLayer.prototype.dataSet -{mapv.DataSet}
     * @description mapv dataset 对象
     */


    _createClass(MapVLayer, [{
        key: 'destroy',
        value: function destroy() {
            this.dataSet = null;
            this.options = null;
            this.renderer = null;
            this.supported = null;
            this.canvas = null;
            this.canvasContext = null;
            this.maxWidth = null;
            this.maxHeight = null;
            _get(MapVLayer.prototype.__proto__ || Object.getPrototypeOf(MapVLayer.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.addData
         * @description 追加数据
         * @param dataSet - {MapV.DataSet} 追加数据集
         * @param options - {MapV.options} 追加的数据参数
         */

    }, {
        key: 'addData',
        value: function addData(dataSet, options) {
            this.renderer && this.renderer.addData(dataSet, options);
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.
         * @description 设置数据
         * @param dataSet {MapV.DataSet} 追加数据集
         * @param options {MapV.options} 追加的数据参数
         */

    }, {
        key: 'setData',
        value: function setData(dataSet, options) {
            this.renderer && this.renderer.setData(dataSet, options);
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.getData
         * @description 获取数据集
         * @return {SuperMap.Layer.MapVLayer.prototype.dataSet}
         */

    }, {
        key: 'getData',
        value: function getData() {
            if (this.renderer) {
                this.dataSet = this.renderer.getData();
            }
            return this.dataSet;
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.removeData
         * @description 按照过滤条件移除数据
         * @param filter - {string} 过滤条件
         * @example
         *  filter=function(data){
         *         if(data.id="1"){
         *            return true
         *         }
         *         return false;
         *     }
         */

    }, {
        key: 'removeData',
        value: function removeData(filter) {
            this.renderer && this.renderer.removeData(filter);
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.clearData
         * @description 清除数据
         */

    }, {
        key: 'clearData',
        value: function clearData() {
            this.renderer.clearData();
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.setMap
         * @description 图层已经添加到Map中。
         *              如果当前浏览器支持canvas，则开始渲染要素；如果不支持则移除图层。
         * @param map - {SuperMap.Map} 需要绑定的map对象
         */

    }, {
        key: 'setMap',
        value: function setMap(map) {
            _get(MapVLayer.prototype.__proto__ || Object.getPrototypeOf(MapVLayer.prototype), 'setMap', this).call(this, map);
            this.renderer = new _MapVRenderer2.default(map, this, this.dataSet, this.options);
            if (!this.supported) {
                this.map.removeLayer(this);
            } else {
                this.redraw();
            }
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.moveTo
         * @description 重置当前MapV图层的div，再一次与Map控件保持一致。
         *              修改当前显示范围，当平移或者缩放结束后开始重绘MapV图的渲染效果。
         * @param bounds - {SuperMap.Bounds} 图层范围
         * @param zoomChanged - {boolean} 缩放级别是否改变
         * @param dragging - {boolean} 是否拖动
         */

    }, {
        key: 'moveTo',
        value: function moveTo(bounds, zoomChanged, dragging) {
            _get(MapVLayer.prototype.__proto__ || Object.getPrototypeOf(MapVLayer.prototype), 'moveTo', this).call(this, bounds, zoomChanged, dragging);
            if (!this.supported) {
                return;
            }
            this.zoomChanged = zoomChanged;
            if (!dragging) {
                this.div.style.visibility = "hidden";
                this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + "px";
                this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + "px";
                /*this.canvas.style.left = this.div.style.left;
                 this.canvas.style.top = this.div.style.top;*/
                var size = this.map.getSize();
                this.div.style.width = parseInt(size.w) + "px";
                this.div.style.height = parseInt(size.h) + "px";
                this.canvas.width = parseInt(size.w);
                this.canvas.height = parseInt(size.h);
                this.canvas.style.width = this.div.style.width;
                this.canvas.style.height = this.div.style.height;
                this.maxWidth = size.w;
                this.maxHeight = size.h;
                this.div.style.visibility = "";
                if (!zoomChanged) {
                    this.renderer && this.renderer.render();
                }
            }

            if (zoomChanged) {
                this.renderer && this.renderer.render();
            }
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.transferToMapLatLng
         * @description 将经纬度转成底图的投影坐标
         * @param latLng - {SuperMap.Lonlat} 经纬度坐标
         */

    }, {
        key: 'transferToMapLatLng',
        value: function transferToMapLatLng(latLng) {
            var source = "EPSG:4326",
                dest = "EPSG:4326";
            var unit = this.map.getUnits();
            if (["m", "meter"].indexOf(unit.toLowerCase()) > -1) {
                dest = "EPSG:3857";
            }
            return new _SuperMap2.default.LonLat(latLng.lon, latLng.lat).transform(source, dest);
        }
    }]);

    return MapVLayer;
}(_SuperMap2.default.Layer);

_SuperMap2.default.Layer.MapVLayer = MapVLayer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddressMatchService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(3);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _CommonServiceBase2 = __webpack_require__(4);

var _CommonServiceBase3 = _interopRequireDefault(_CommonServiceBase2);

var _AddressMatchService = __webpack_require__(12);

var _AddressMatchService2 = _interopRequireDefault(_AddressMatchService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.REST.AddressMatchService
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @extends SuperMap.REST.CommonServiceBase
 * @param url - {string} 服务地址
 * @param options - {Object} 地址匹配服务可选参数
 */
var AddressMatchService = exports.AddressMatchService = function (_CommonServiceBase) {
    _inherits(AddressMatchService, _CommonServiceBase);

    function AddressMatchService(url, options) {
        _classCallCheck(this, AddressMatchService);

        var _this = _possibleConstructorReturn(this, (AddressMatchService.__proto__ || Object.getPrototypeOf(AddressMatchService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.REST.AddressMatchService";
        return _this;
    }

    /**
     * @function SuperMap.REST.AddressMatchService.prototype.code
     * @description 编码
     * @param params - {string} 编码参数
     * @param callback - {function} 回调函数
     * @return {SuperMap.REST.AddressMatchService} 返回正向匹配地址
     */


    _createClass(AddressMatchService, [{
        key: 'code',
        value: function code(params, callback) {
            var me = this;
            var addressMatchService = new _AddressMatchService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                }
            });
            addressMatchService.code(me.url + '/geocoding', params);
            return me;
        }

        /**
         * @function SuperMap.REST.AddressMatchService.prototype.decode
         * @description 解码
         * @param params - {string} 编码参数
         * @param callback - {function} 回调函数
         * @return {SuperMap.REST.AddressMatchService} 返回反向匹配地址
         */

    }, {
        key: 'decode',
        value: function decode(params, callback) {
            var me = this;
            var addressMatchService = new _AddressMatchService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                }
            });
            addressMatchService.decode(me.url + '/geodecoding', params);
            return me;
        }
    }]);

    return AddressMatchService;
}(_CommonServiceBase3.default);

_SuperMap2.default.REST.AddressMatchService = AddressMatchService;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProcessingService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(3);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

var _CommonServiceBase2 = __webpack_require__(4);

var _CommonServiceBase3 = _interopRequireDefault(_CommonServiceBase2);

var _KernelDensityJobsService = __webpack_require__(16);

var _KernelDensityJobsService2 = _interopRequireDefault(_KernelDensityJobsService);

var _SingleObjectQueryJobsService = __webpack_require__(18);

var _SingleObjectQueryJobsService2 = _interopRequireDefault(_SingleObjectQueryJobsService);

var _SummaryMeshJobsService = __webpack_require__(20);

var _SummaryMeshJobsService2 = _interopRequireDefault(_SummaryMeshJobsService);

var _SummaryRegionJobsService = __webpack_require__(22);

var _SummaryRegionJobsService2 = _interopRequireDefault(_SummaryRegionJobsService);

var _VectorClipJobsService = __webpack_require__(24);

var _VectorClipJobsService2 = _interopRequireDefault(_VectorClipJobsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.REST.ProcessingService
 * @classdesc 分布式空间分析相关服务类。
 * @augments SuperMap.CommonServiceBase
 * @example
 * 用法：
 *      new SuperMap.REST.ProcessingService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param url -{string} 分布式空间分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
var ProcessingService = exports.ProcessingService = function (_CommonServiceBase) {
    _inherits(ProcessingService, _CommonServiceBase);

    function ProcessingService(url, options) {
        _classCallCheck(this, ProcessingService);

        var _this = _possibleConstructorReturn(this, (ProcessingService.__proto__ || Object.getPrototypeOf(ProcessingService)).call(this, url, options));

        _this.kernelDensityJobs = {};
        _this.summaryMeshJobs = {};
        _this.queryJobs = {};
        _this.summaryRegionJobs = {};
        _this.vectorClipJobs = {};
        return _this;
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingService}
     */


    _createClass(ProcessingService, [{
        key: 'getKernelDensityJobs',
        value: function getKernelDensityJobs(callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var kernelDensityJobsService = new _KernelDensityJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            kernelDensityJobsService.getKernelDensityJobs();
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJob
         * @description 获取某一个密度分析。
         * @param id - {string}空间分析的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getKernelDensityJob',
        value: function getKernelDensityJob(id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var kernelDensityJobsService = new _KernelDensityJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            kernelDensityJobsService.getKernelDensityJob(id);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.addKernelDensityJob
         * @description 新建一个密度分析。
         * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'addKernelDensityJob',
        value: function addKernelDensityJob(params, callback, seconds, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var kernelDensityJobsService = new _KernelDensityJobsService2.default(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function processRunning(job) {
                        me.kernelDensityJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            kernelDensityJobsService.addKernelDensityJob(params, seconds);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobState
         * @description 获取密度分析的状态。
         * @param id - {string}密度分析的id。
         */

    }, {
        key: 'getKernelDensityJobState',
        value: function getKernelDensityJobState(id) {
            return this.kernelDensityJobs[id];
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobs
         * @description 获取点聚合分析的列表。
         * @param callback - {function}  请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getSummaryMeshJobs',
        value: function getSummaryMeshJobs(callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryMeshJobsService = new _SummaryMeshJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryMeshJobsService.getSummaryMeshJobs();
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJob
         * @description 获取某一个点聚合分析。
         * @param id - {string}空间分析的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getSummaryMeshJob',
        value: function getSummaryMeshJob(id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryMeshJobsService = new _SummaryMeshJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryMeshJobsService.getSummaryMeshJob(id);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.addSummaryMeshJob
         * @description 新建一个点聚合分析。
         * @param params - {SuperMap.SummaryMeshJobParameter} 点聚合分析任务参数类。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'addSummaryMeshJob',
        value: function addSummaryMeshJob(params, callback, seconds, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryMeshJobsService = new _SummaryMeshJobsService2.default(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function processRunning(job) {
                        me.summaryMeshJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            summaryMeshJobsService.addSummaryMeshJob(params, seconds);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobState
         * @description 获取点聚合分析的状态。
         * @param id - {string} 点聚合分析的id。
         */

    }, {
        key: 'getSummaryMeshJobState',
        value: function getSummaryMeshJobState(id) {
            return this.summaryMeshJobs[id];
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getQueryJobs
         * @description 获取单对象查询分析的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getQueryJobs',
        value: function getQueryJobs(callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var singleObjectQueryJobsService = new _SingleObjectQueryJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            singleObjectQueryJobsService.getQueryJobs();
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getQueryJob
         * @description 获取某一个单对象查询分析。
         * @param id - {string}空间分析的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getQueryJob',
        value: function getQueryJob(id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var singleObjectQueryJobsService = new _SingleObjectQueryJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            singleObjectQueryJobsService.getQueryJob(id);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.addQueryJob
         * @description 新建一个单对象查询分析。
         * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'addQueryJob',
        value: function addQueryJob(params, callback, seconds, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var singleObjectQueryJobsService = new _SingleObjectQueryJobsService2.default(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function processRunning(job) {
                        me.queryJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            singleObjectQueryJobsService.addQueryJob(params, seconds);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getQueryJobState
         * @description 获取单对象查询分析的状态。
         * @param id - {string}单对象查询分析的id。
         */

    }, {
        key: 'getQueryJobState',
        value: function getQueryJobState(id) {
            return this.queryJobs[id];
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobs
         * @description 获取区域汇总分析的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getSummaryRegionJobs',
        value: function getSummaryRegionJobs(callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryRegionJobsService = new _SummaryRegionJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryRegionJobsService.getSummaryRegionJobs();
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJob
         * @description 获取某一个区域汇总分析。
         * @param id - {string}区域汇总分析的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'getSummaryRegionJob',
        value: function getSummaryRegionJob(id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryRegionJobsService = new _SummaryRegionJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryRegionJobsService.getSummaryRegionJob(id);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.addSummaryRegionJob
         * @description 新建一个区域汇总分析。
         * @param params -{SuperMap.SummaryRegionJobParameter} 创建一个区域汇总分析的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingService}
         */

    }, {
        key: 'addSummaryRegionJob',
        value: function addSummaryRegionJob(params, callback, seconds, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryRegionJobsService = new _SummaryRegionJobsService2.default(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function processRunning(job) {
                        me.summaryRegionJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            summaryRegionJobsService.addSummaryRegionJob(params, seconds);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobState
         * @description 获取区域汇总分析的状态。
         * @param id - {string}区域汇总分析的id。
         */

    }, {
        key: 'getSummaryRegionJobState',
        value: function getSummaryRegionJobState(id) {
            return this.summaryRegionJobs[id];
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobs
         * @description 获取矢量裁剪分析的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.ProcessingService}
         */

    }, {
        key: 'getVectorClipJobs',
        value: function getVectorClipJobs(callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var vectorClipJobsService = new _VectorClipJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            vectorClipJobsService.getVectorClipJobs();
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJob
         * @description 获取某一个矢量裁剪分析。
         * @param id - {string}空间分析的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.ProcessingService}
         */

    }, {
        key: 'getVectorClipJob',
        value: function getVectorClipJob(id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var vectorClipJobsService = new _VectorClipJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            vectorClipJobsService.getVectorClipJob(id);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.addVectorClipJob
         * @description 新建一个矢量裁剪分析。
         * @param params -{SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.ProcessingService}
         */

    }, {
        key: 'addVectorClipJob',
        value: function addVectorClipJob(params, callback, seconds, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var vectorClipJobsService = new _VectorClipJobsService2.default(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function processRunning(job) {
                        me.vectorClipJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            vectorClipJobsService.addVectorClipJob(params, seconds);
            return me;
        }

        /**
         * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobState
         * @description 获取矢量裁剪分析的状态。
         * @param id - {string}矢量裁剪分析的id。
         */

    }, {
        key: 'getVectorClipJobState',
        value: function getVectorClipJobState(id) {
            return this.vectorClipJobs[id];
        }
    }, {
        key: '_processFormat',
        value: function _processFormat(resultFormat) {
            return resultFormat ? resultFormat : _REST.DataFormat.GEOJSON;
        }
    }]);

    return ProcessingService;
}(_CommonServiceBase3.default);

_SuperMap2.default.REST.ProcessingService = ProcessingService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
})(undefined, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
  // error if request timeout
  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    document.getElementsByTagName('head')[0].removeChild(script);
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
      }, timeout);
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whatwgFetch = function (self) {
  'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (!body) {
        this._bodyText = '';
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        return this.blob().then(readBlobAsArrayBuffer);
      };

      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this);
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  // self.Headers = Headers
  // self.Request = Request
  // self.Response = Response

  var fetch = function fetch(input, init) {
    // console.log('whatwgFetchWidthTimeout--->'+input, init);
    init = init || { timeout: 30000 };
    return new Promise(function (resolve, reject) {
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }

      var xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed due to timeout'));
      };

      xhr.open(request.method, request.url, true);
      xhr.timeout = init.timeout || 30000;

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  return fetch;
}(typeof self !== 'undefined' ? self : undefined);

module.exports = whatwgFetch;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(3);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _mapv = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.MapVRenderer
 * @classdesc 地图渲染类
 * @private
 * @extends mapv.MapVBaseLayer
 * @param map - {SuperMap.Map} 待渲染的地图
 * @param layer - {mapv.baiduMapLayer} 待渲染的图层
 * @param dataSet - {mapv.DataSet} 待渲染的数据集
 * @param options - {Object} 渲染的参数
 */
var MapVBaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;

var MapVRenderer = function (_MapVBaseLayer) {
    _inherits(MapVRenderer, _MapVBaseLayer);

    function MapVRenderer(map, layer, dataSet, options) {
        _classCallCheck(this, MapVRenderer);

        if (!MapVBaseLayer) {
            return _possibleConstructorReturn(_this);
        }

        var _this = _possibleConstructorReturn(this, (MapVRenderer.__proto__ || Object.getPrototypeOf(MapVRenderer)).call(this, map, dataSet, options));

        var self = _this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        _this.canvasLayer = layer;
        self.transferToMercator();
        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
        _this.bindEvent();
        return _this;
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.clickEvent
     * @description 点击事件
     * @param e - {Object} 触发对象
     */


    _createClass(MapVRenderer, [{
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.layerPoint;
            _get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), 'clickEvent', this).call(this, pixel, e);
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.mousemoveEvent
         * @description 鼠标移动事件
         * @param  e - {Object} 触发对象
         */

    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            var pixel = e.layerPoint;
            _get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.bindEvent
         * @description 绑定鼠标移动和鼠标点击事件
         * @param e - {Object} 触发对象
         */

    }, {
        key: 'bindEvent',
        value: function bindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.events.on({ 'click': this.clickEvent });
                }
                if (this.options.methods.mousemove) {
                    map.events.on({ 'mousemove': this.mousemoveEvent });
                }
            }
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.unbindEvent
         * @description 解绑鼠标移动和鼠标滑动触发的事件
         * @param e - {Object} 触发对象
         */

    }, {
        key: 'unbindEvent',
        value: function unbindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.events.un({ 'click': this.clickEvent });
                }
                if (this.options.methods.mousemove) {
                    map.events.un({ 'mousemove': this.mousemoveEvent });
                }
            }
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.getContext
         * @description 获取信息
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer && this.canvasLayer.canvasContext;
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.addData
         * @description 追加数据
         * @param data - {oject} 待添加的数据
         * @param options - {oject} 待添加的数据信息
         */

    }, {
        key: 'addData',
        value: function addData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet.add(_data);
            this.update({ options: options });
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.updateData
         * @description 更新覆盖原数据
         * @param data - {oject} 待更新的数据
         * @param options - {oject} 待更新的数据信息
         */

    }, {
        key: 'setData',
        value: function setData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet = this.dataSet || new mapv.DataSet();
            this.dataSet.set(_data);
            this.update({ options: options });
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.getData
         * @description 获取数据
         */

    }, {
        key: 'getData',
        value: function getData() {
            return this.dataSet;
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.removeData
         * @description 删除数据
         * @param filter - {string} 删除条件\过滤信息
         */

    }, {
        key: 'removeData',
        value: function removeData(filter) {
            if (!this.dataSet) {
                return;
            }
            var newData = this.dataSet.get(filter);
            this.dataSet.set(newData);
            this.update({ options: null });
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.clearData
         * @description 清除数据
         */

    }, {
        key: 'clearData',
        value: function clearData() {
            this.dataSet && this.dataSet.clear();
            this.update({ options: null });
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.render
         * @description 着色
         * @param time - {number}
         */

    }, {
        key: 'render',
        value: function render(time) {
            this._canvasUpdate(time);
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.transferToMercator
         * @description 墨卡托坐标为经纬度
         */

    }, {
        key: 'transferToMercator',
        value: function transferToMercator() {
            if (this.options.coordType && ["bd09mc", "coordinates_mercator"].indexOf(this.options.coordType) > -1) {
                var data = this.dataSet.get();
                data = this.dataSet.transferCoordinate(data, function (coordinates) {
                    var pixel = _SuperMap2.default.Projection.transform({
                        x: coordinates[0],
                        y: coordinates[1]
                    }, "EPSG:3857", "EPSG:4326");
                    return [pixel.x, pixel.y];
                }, 'coordinates', 'coordinates');
                this.dataSet._set(data);
            }
        }
    }, {
        key: '_canvasUpdate',
        value: function _canvasUpdate(time) {
            if (!this.canvasLayer) {
                return;
            }

            var self = this;

            var animationOptions = self.options.animation;

            var context = this.getContext();
            var map = this.map;
            if (self.isEnabledTime()) {
                if (time === undefined) {
                    this.clear(context);
                    return;
                }
                if (this.context === '2d') {
                    context.save();
                    context.globalCompositeOperation = 'destination-out';
                    context.fillStyle = 'rgba(0, 0, 0, .1)';
                    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                    context.restore();
                }
            } else {
                this.clear(context);
            }

            if (this.context === '2d') {
                for (var key in self.options) {
                    context[key] = self.options[key];
                }
            } else {
                context.clear(context.COLOR_BUFFER_BIT);
            }

            if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
                return;
            }
            var layer = self.canvasLayer;
            var dataGetOptions = {
                fromColumn: 'coordinates',
                transferCoordinate: function transferCoordinate(coordinate) {
                    var coord = layer.transferToMapLatLng({ lon: coordinate[0], lat: coordinate[1] });
                    var worldPoint = map.getViewPortPxFromLonLat(coord);
                    return [worldPoint.x, worldPoint.y];
                }
            };

            if (time !== undefined) {
                dataGetOptions.filter = function (item) {
                    var trails = animationOptions.trails || 10;
                    return time && item.time > time - trails && item.time < time;
                };
            }

            var data = self.dataSet.get(dataGetOptions);

            this.processData(data);

            self.options._size = self.options.size;

            var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({ lon: 0, lat: 0 }));

            var zoomUnit = Math.pow(2, 14 - map.getZoom());
            if (self.options.unit == 'm') {
                if (self.options.size) {
                    self.options._size = self.options.size / zoomUnit;
                }
                if (self.options.width) {
                    self.options._width = self.options.width / zoomUnit;
                }
                if (self.options.height) {
                    self.options._height = self.options.height / zoomUnit;
                }
            } else {
                self.options._size = self.options.size;
                self.options._height = self.options.height;
                self.options._width = self.options.width;
            }

            this.drawContext(context, new mapv.DataSet(data), self.options, worldPoint);

            self.options.updateCallback && self.options.updateCallback(time);
        }
    }, {
        key: 'init',
        value: function init(options) {

            var self = this;

            self.options = options;

            this.initDataRange(options);

            this.context = self.options.context || '2d';

            if (self.options.zIndex) {
                this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
            }

            this.initAnimator();
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.addAnimatorEvent
         * @description 添加动画事件
         */

    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {
            this.map.events.on({ 'movestart': this.animatorMovestartEvent.bind(this) });
            this.map.events.on({ 'moveend': this.animatorMoveendEvent.bind(this) });
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.clear
         * @description 清除环境
         * @param context - {Object} 当前环境
         */

    }, {
        key: 'clear',
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.show
         * @description 展示渲染效果
         */

    }, {
        key: 'show',
        value: function show() {
            this.map.addLayer(this.canvasLayer);
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.hide
         * @description 隐藏渲染效果
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.map.removeLayer(this.canvasLayer);
        }

        /**
         * @function SuperMap.MapVRenderer.prototype.draw
         * @description 渲染绘制
         */

    }, {
        key: 'draw',
        value: function draw() {
            this.canvasLayer.redraw();
        }
    }]);

    return MapVRenderer;
}(MapVBaseLayer);

exports.default = MapVRenderer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _CommonServiceBase2 = __webpack_require__(4);

var _CommonServiceBase3 = _interopRequireDefault(_CommonServiceBase2);

var _FetchRequest = __webpack_require__(5);

var _GeoCodingParameter = __webpack_require__(13);

var _GeoCodingParameter2 = _interopRequireDefault(_GeoCodingParameter);

var _GeoDecodingParameter = __webpack_require__(14);

var _GeoDecodingParameter2 = _interopRequireDefault(_GeoDecodingParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.AddressMatchService
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @param options - {Object} 参数。
 * @param url {string} 地址匹配服务地址。
 */
var AddressMatchService = function (_CommonServiceBase) {
    _inherits(AddressMatchService, _CommonServiceBase);

    function AddressMatchService(url, options) {
        _classCallCheck(this, AddressMatchService);

        var _this = _possibleConstructorReturn(this, (AddressMatchService.__proto__ || Object.getPrototypeOf(AddressMatchService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.AddressMatchService";
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(AddressMatchService, [{
        key: 'destroy',
        value: function destroy() {
            _get(AddressMatchService.prototype.__proto__ || Object.getPrototypeOf(AddressMatchService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.AddressMatchService.prototype.code
         * @param url {string} 正向地址匹配服务地址
         * @param params {SuperMap.GeoCodingParameter} 正向地址匹配服务参数
         */

    }, {
        key: 'code',
        value: function code(url, params) {
            this.processAsync(url, params);
        }

        /**
         * @function SuperMap.AddressMatchService.prototype.decode
         * @param url {string} 反向地址匹配服务地址
         * @param params {SuperMap.GeoDecodingParameter} 反向地址匹配服务参数
         */

    }, {
        key: 'decode',
        value: function decode(url, params) {
            this.processAsync(url, params);
        }

        /**
         * @function SuperMap.AddressMatchService.prototype.processAsync
         * @description 负责将客户端的动态分段服务参数传递到服务端。
         * @param url - {string} 服务地址
         * @param params - {Object} 参数
         */

    }, {
        key: 'processAsync',
        value: function processAsync(url, params) {
            var me = this;
            return _FetchRequest.FetchRequest.get(url, params).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result) {
                    me.serviceProcessCompleted(result);
                } else {
                    me.serviceProcessFailed(result);
                }
            }).catch(function (e) {
                me.eventListeners.processFailed({ error: e });
            });
        }

        /**
         * @function SuperMap.AddressMatchService.prototype.serviceProcessCompleted
         * @param result - {Object} 服务器返回的结果对象。
         * @description 服务流程是否完成
         */

    }, {
        key: 'serviceProcessCompleted',
        value: function serviceProcessCompleted(result) {
            _get(AddressMatchService.prototype.__proto__ || Object.getPrototypeOf(AddressMatchService.prototype), 'serviceProcessCompleted', this).call(this, result);
        }
        /**
         * @function SuperMap.AddressMatchService.prototype.serviceProcessCompleted
         * @param result - {Object} 服务器返回的结果对象。
         * @description 服务流程是否失败
         */

    }, {
        key: 'serviceProcessFailed',
        value: function serviceProcessFailed(result) {
            _get(AddressMatchService.prototype.__proto__ || Object.getPrototypeOf(AddressMatchService.prototype), 'serviceProcessFailed', this).call(this, result);
        }
    }]);

    return AddressMatchService;
}(_CommonServiceBase3.default);

exports.default = AddressMatchService;

_SuperMap2.default.AddressMatchService = AddressMatchService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.GeoCodingParameter
 * @classdesc 地理正向匹配参数类。
 * @param options - {Object} 参数。
 */
var GeoCodingParameter = function () {

    /**
     * @member SuperMap.GeoCodingParameter.prototype.prjCoordSys -{string}
     * @description  查询结果的坐标系。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.toIndex -{number}
     * @description 设置返回对象的结束索引值。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.address -{string}
     * @description 地点关键词。
     */
    function GeoCodingParameter(options) {
        _classCallCheck(this, GeoCodingParameter);

        this.address = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;

        if (!options) {
            return;
        }
        if (options.filters) {
            var strs = [];
            var fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
            });
            options.filters = strs;
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.GeoCodingParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.maxReturn -{string}
     * @description 最大返回结果数。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.filters -{Array}
     * @description 过滤字段，限定查询区域。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.fromIndex -{number}
     * @description 设置返回对象的起始索引值。
     */


    _createClass(GeoCodingParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.address = null;
            this.fromIndex = null;
            this.toIndex = null;
            this.filters = null;
            this.prjCoordSys = null;
            this.maxReturn = null;
        }
    }]);

    return GeoCodingParameter;
}();

exports.default = GeoCodingParameter;

_SuperMap2.default.GeoCodingParameter = GeoCodingParameter;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.GeoDecodingParameter
 * @classdesc 地理反向匹配参数类。
 * @param options - {Object} 参数。如：<br>
 *        x - {number}查询位置的横坐标。<br>
 *        y - {number}查询位置的纵坐标。<br>
 *        fromIndex - {number}设置返回对象的起始索引值。<br>
 *        filters -{Array} 过滤字段，限定查询区域。<br>
 *        prjCoordSys -{string} 查询结果的坐标系。<br>
 *        maxReturn -{number}最大返回结果数。<br>
 *        geoDecodingRadius -{number}查询半径。
 */
var GeoDecodingParameter = function () {

    /**
     *  @member SuperMap.GeoDecodingParameter.prototype.maxReturn -{number}
     *  @description 最大返回结果数。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.filters -{Array}
     * @description 过滤字段，限定查询区域。
     */

    /**
     * @member SuperMap.GeoDecodingParameter.prototype.fromIndex - {number}
     * @description  设置返回对象的起始索引值。
     */

    /**
     * @member SuperMap.GeoDecodingParameter.prototype.x - {number}
     * @description 查询位置的横坐标。
     */
    function GeoDecodingParameter(options) {
        _classCallCheck(this, GeoDecodingParameter);

        this.x = null;
        this.y = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
        this.geoDecodingRadius = null;

        if (!options) {
            return;
        }
        if (options.filters) {
            var strs = [];
            var fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
            });
            options.filters = strs;
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.GeoDecodingParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.geoDecodingRadius -{number}
     * @description 查询半径。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.prjCoordSys -{string}
     * @description 查询结果的坐标系。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.toIndex - {number}
     * @description 设置返回对象的结束索引值。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.y - {number}
     * @description 查询位置的纵坐标。
     */


    _createClass(GeoDecodingParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.x = null;
            this.y = null;
            this.fromIndex = null;
            this.toIndex = null;
            this.filters = null;
            this.prjCoordSys = null;
            this.maxReturn = null;
            this.geoDecodingRadius = null;
        }
    }]);

    return GeoDecodingParameter;
}();

exports.default = GeoDecodingParameter;


_SuperMap2.default.GeoDecodingParameter = GeoDecodingParameter;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.KernelDensityJobParameter
 * @classdesc 密度分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{string} 数据集名。 <br>
 *        query -{SuperMap.Bounds} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
 *        resolution -{number}分辨率。 <br>
 *        method -{number}分析方法。 <br>
 *        meshType -{number}分析类型。 <br>
 *        fields -{string} 权重索引。 <br>
 *        radius -{number}分析的影响半径。
 */
var KernelDensityJobParameter = function () {

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radiusUnit -{SuperMap.AnalystSizeUnit}
     * @description 搜索半径单位。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radius -{number}
     * @description 分析的影响半径。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshType -{number}
     * @description 分析类型。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.resolution -{number}
     * @description 网格大小。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    function KernelDensityJobParameter(options) {
        _classCallCheck(this, KernelDensityJobParameter);

        this.datasetName = "";
        this.query = "";
        this.resolution = 80;
        this.method = 0;
        this.meshType = 0;
        this.fields = "";
        this.radius = 300;
        this.meshSizeUnit = _REST.AnalystSizeUnit.METER;
        this.radiusUnit = _REST.AnalystSizeUnit.METER;
        this.areaUnit = _REST.AnalystAreaUnit.SQUAREMILE;

        if (!options) {
            return;
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.KernelDensityJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.areaUnit -{SuperMap.AnalystAreaUnit}
     * @description 面积单位。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshSizeUnit -{SuperMap.AnalystSizeUnit}
     * @description 网格大小单位。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.fields -{string}
     * @description 权重索引。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.method -{number}
     * @description 分析方法。
     */


    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
     */


    _createClass(KernelDensityJobParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.datasetName = null;
            this.query = null;
            this.resolution = null;
            this.method = null;
            this.radius = null;
            this.meshType = null;
            this.fields = null;
            this.meshSizeUnit = null;
            this.radiusUnit = null;
            this.areaUnit = null;
        }

        /**
         * @function SuperMap.KernelDensityJobParameter.toObject
         * @param kernelDensityJobParameter -{Object} 密度分析任务参数。
         * @param tempObj - {Object} 目标对象
         * @description 生成密度分析任务对象
         */

    }], [{
        key: 'toObject',
        value: function toObject(kernelDensityJobParameter, tempObj) {
            for (var name in kernelDensityJobParameter) {
                if (name === "datasetName") {
                    tempObj['input'] = tempObj['input'] || {};
                    tempObj['input'][name] = kernelDensityJobParameter[name];
                    continue;
                }
                tempObj['analyst'] = tempObj['analyst'] || {};
                if (name === 'query') {
                    tempObj['analyst'][name] = kernelDensityJobParameter[name].toBBOX();
                } else {
                    tempObj['analyst'][name] = kernelDensityJobParameter[name];
                }
            }
        }
    }]);

    return KernelDensityJobParameter;
}();

exports.default = KernelDensityJobParameter;


_SuperMap2.default.KernelDensityJobParameter = KernelDensityJobParameter;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ProcessingServiceBase = __webpack_require__(2);

var _ProcessingServiceBase2 = _interopRequireDefault(_ProcessingServiceBase);

var _KernelDensityJobParameter = __webpack_require__(15);

var _KernelDensityJobParameter2 = _interopRequireDefault(_KernelDensityJobParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.KernelDensityJobsService
 * @classdesc 核密度分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 核密度分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
var KernelDensityJobsService = function (_ProcessingServiceBas) {
    _inherits(KernelDensityJobsService, _ProcessingServiceBas);

    function KernelDensityJobsService(url, options) {
        _classCallCheck(this, KernelDensityJobsService);

        var _this = _possibleConstructorReturn(this, (KernelDensityJobsService.__proto__ || Object.getPrototypeOf(KernelDensityJobsService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.KernelDensityJobsService";

        _this.url += "/spatialanalyst/density";
        return _this;
    }

    /**
     *@inheritDoc
     */


    _createClass(KernelDensityJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
         * @description 获取核密度分析任务
         * @return {*}
         */

    }, {
        key: 'getKernelDensityJobs',
        value: function getKernelDensityJobs() {
            return _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
         * @description 获取指定id的核密度分析服务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getKernelDensityJob',
        value: function getKernelDensityJob(id) {
            return _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.prototype.addKernelDensityJob
         * @description 新建核密度分析服务
         * @param params - {SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         */

    }, {
        key: 'addKernelDensityJob',
        value: function addKernelDensityJob(params, seconds) {
            return _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'addJob', this).call(this, this.url, params, _KernelDensityJobParameter2.default, seconds);
        }
    }]);

    return KernelDensityJobsService;
}(_ProcessingServiceBase2.default);

exports.default = KernelDensityJobsService;


_SuperMap2.default.KernelDensityJobsService = KernelDensityJobsService;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.SingleObjectQueryJobsParameter
 * @classdesc 单对象空间查询分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetQuery -{string} 查询对象所在的数据集名称。 <br>
 *         mode -{SuperMap.SpatialQueryMode} 空间查询模式 。 <br>
 */
var SingleObjectQueryJobsParameter = function () {

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetQuery -{string}
     * @description 查询对象所在的数据集名称。
     */
    function SingleObjectQueryJobsParameter(options) {
        _classCallCheck(this, SingleObjectQueryJobsParameter);

        this.datasetName = "";
        this.datasetQuery = "";
        this.mode = _REST.SpatialQueryMode.CONTAIN;

        if (!options) {
            return;
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */


    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.mode -{SuperMap.SpatialQueryMode}
     * @description 空间查询模式 。
     */


    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */


    _createClass(SingleObjectQueryJobsParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.datasetName = null;
            this.datasetQuery = null;
            this.mode = null;
        }
        /**
         * @function SuperMap.SingleObjectQueryJobsParameter.toObject
         * @param singleObjectQueryJobsParameter -{Object} 单对象空间查询分析任务参数
         * @param tempObj - {Object} 目标对象
         * @description 生成单对象空间查询分析任务对象
         */

    }], [{
        key: 'toObject',
        value: function toObject(singleObjectQueryJobsParameter, tempObj) {
            for (var name in singleObjectQueryJobsParameter) {
                if (name === "datasetName") {
                    tempObj['input'] = tempObj['input'] || {};
                    tempObj['input'][name] = singleObjectQueryJobsParameter[name];
                    continue;
                }
                tempObj['analyst'] = tempObj['analyst'] || {};
                tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
            }
        }
    }]);

    return SingleObjectQueryJobsParameter;
}();

exports.default = SingleObjectQueryJobsParameter;


_SuperMap2.default.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ProcessingServiceBase = __webpack_require__(2);

var _ProcessingServiceBase2 = _interopRequireDefault(_ProcessingServiceBase);

var _SingleObjectQueryJobsParameter = __webpack_require__(17);

var _SingleObjectQueryJobsParameter2 = _interopRequireDefault(_SingleObjectQueryJobsParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.SingleObjectQueryJobsService
 * @classdesc 单对象查询分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 单对象空间查询分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
var SingleObjectQueryJobsService = function (_ProcessingServiceBas) {
    _inherits(SingleObjectQueryJobsService, _ProcessingServiceBas);

    function SingleObjectQueryJobsService(url, options) {
        _classCallCheck(this, SingleObjectQueryJobsService);

        var _this = _possibleConstructorReturn(this, (SingleObjectQueryJobsService.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.SingleObjectQueryJobsService";

        _this.url += "/spatialanalyst/query";
        return _this;
    }

    /**
     *@inheritDoc
     */


    _createClass(SingleObjectQueryJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
         * @description 获取单对象空间查询分析所有任务
         * @return {*}
         */

    }, {
        key: 'getQueryJobs',
        value: function getQueryJobs() {
            return _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
         * @description 获取指定id的单对象空间查询分析服务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getQueryJob',
        value: function getQueryJob(id) {
            return _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
        }

        /**
         * @function SuperMap.SingleObjectQueryJobsService.protitype.addQueryJob
         * @description 新建单对象空间查询分析服务
         * @param params - {SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         */

    }, {
        key: 'addQueryJob',
        value: function addQueryJob(params, seconds) {
            return _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'addJob', this).call(this, this.url, params, _SingleObjectQueryJobsParameter2.default, seconds);
        }
    }]);

    return SingleObjectQueryJobsService;
}(_ProcessingServiceBase2.default);

exports.default = SingleObjectQueryJobsService;


_SuperMap2.default.SingleObjectQueryJobsService = SingleObjectQueryJobsService;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.SummaryMeshJobParameter
 * @classdesc 点聚合分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{string} 数据集名。<br>
 *        query -{Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
 *        resolution -{number}分辨率。<br>
 *        statisticModes -{string} 分析模式。<br>
 *        meshType -{number}分析类型。<br>
 *        fields -{number}权重索引。<br>
 *        type -{string} 聚合类型。
 */
var SummaryMeshJobParameter = function () {

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.fields -{number}
     * @description 权重字段。
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.meshType -{number}
     * @description  网格面类型(聚合类型为网格面聚合时使用的参数),取值：0或1。
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.query -{Object}
     * @description 分析范围(聚合类型为网格面聚合时使用的参数)。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    function SummaryMeshJobParameter(options) {
        _classCallCheck(this, SummaryMeshJobParameter);

        this.datasetName = "";
        this.regionDataset = "";
        this.query = "";
        this.resolution = 100;
        this.meshType = 0;
        this.statisticModes = "";
        this.fields = "";
        this.type = _REST.SummaryType.SUMMARYMESH;

        if (!options) {
            return;
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @inheritDoc
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.type -{SuperMap.SummaryType}
     * @description 聚合类型。
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.statisticModes -{SuperMap.StatisticAnalystMode}
     * @description 统计模式。
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.resolution -{number}
     * @description 分辨率(聚合类型为网格面聚合时使用的参数)。
     */


    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.regionDataset -{string}
     * @description 聚合面数据集(聚合类型为多边形聚合时使用的参数)。
     */


    _createClass(SummaryMeshJobParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.datasetName = null;
            this.query = null;
            this.resolution = null;
            this.statisticModes = null;
            this.meshType = null;
            this.fields = null;
            this.regionDataset = null;
            this.type = null;
        }

        /**
         * @function SuperMap.SummaryMeshJobParameter.toObject
         * @param summaryMeshJobParameter - {Object} 点聚合分析任务参数。
         * @param tempObj - {Object} 目标对象。
         * @description 生成点聚合分析任务对象
         */

    }], [{
        key: 'toObject',
        value: function toObject(summaryMeshJobParameter, tempObj) {
            for (var name in summaryMeshJobParameter) {
                if (name === "datasetName") {
                    tempObj['input'] = tempObj['input'] || {};
                    tempObj['input'][name] = summaryMeshJobParameter[name];
                    continue;
                }
                if (name === "type") {
                    tempObj['type'] = summaryMeshJobParameter[name];
                    continue;
                }
                if (summaryMeshJobParameter.type === 'SUMMARYMESH' && name !== 'regionDataset' || summaryMeshJobParameter.type === 'SUMMARYREGION' && !contains(['meshType', 'resolution', 'query'], name)) {
                    tempObj['analyst'] = tempObj['analyst'] || {};
                    if (name === 'query') {
                        tempObj['analyst'][name] = summaryMeshJobParameter[name].toBBOX();
                    } else {
                        tempObj['analyst'][name] = summaryMeshJobParameter[name];
                    }
                }
            }

            function contains(arr, obj) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
        }
    }]);

    return SummaryMeshJobParameter;
}();

exports.default = SummaryMeshJobParameter;


_SuperMap2.default.SummaryMeshJobParameter = SummaryMeshJobParameter;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ProcessingServiceBase = __webpack_require__(2);

var _ProcessingServiceBase2 = _interopRequireDefault(_ProcessingServiceBase);

var _SummaryMeshJobParameter = __webpack_require__(19);

var _SummaryMeshJobParameter2 = _interopRequireDefault(_SummaryMeshJobParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.SummaryMeshJobsService
 * @classdesc 点聚合分析任务类。
 * @param url -{string} 点聚合分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        events - {SuperMap.Events} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        index - {number}服务访问地址在数组中的位置。<br>
 *        length - {number}服务访问地址数组长度。
 */
var SummaryMeshJobsService = function (_ProcessingServiceBas) {
    _inherits(SummaryMeshJobsService, _ProcessingServiceBas);

    function SummaryMeshJobsService(url, options) {
        _classCallCheck(this, SummaryMeshJobsService);

        var _this = _possibleConstructorReturn(this, (SummaryMeshJobsService.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.SummaryMeshJobsService";

        _this.url += "/spatialanalyst/aggregatepoints";
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(SummaryMeshJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(SummaryMeshJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJobs
         * @description 获取点聚合分析任务
         */

    }, {
        key: 'getSummaryMeshJobs',
        value: function getSummaryMeshJobs() {
            return _get(SummaryMeshJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJob
         * @description 获取指定ip的点聚合分析任务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getSummaryMeshJob',
        value: function getSummaryMeshJob(id) {
            return _get(SummaryMeshJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
        }

        /**
         * @function SuperMap.SummaryMeshJobsService.prototype.addSummaryMeshJob
         * @description 新建点聚合分析服务
         * @param params - {SuperMap.SummaryMeshJobParameter} 创建一个空间分析的请求参数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         */

    }, {
        key: 'addSummaryMeshJob',
        value: function addSummaryMeshJob(params, seconds) {
            _get(SummaryMeshJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService.prototype), 'addJob', this).call(this, this.url, params, _SummaryMeshJobParameter2.default, seconds);
        }
    }]);

    return SummaryMeshJobsService;
}(_ProcessingServiceBase2.default);

exports.default = SummaryMeshJobsService;


_SuperMap2.default.SummaryMeshJobsService = SummaryMeshJobsService;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.SummaryRegionJobParameter
 * @classdesc 区域汇总分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName -{string} 数据集名。 <br>
 *         sumShape -{boolean} 是否统计长度或面积。 <br>
 *         query -{SuperMap.Bounds} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
 *         standardSummaryFields -{boolean} 以标准属字段统计。 <br>
 *         standardFields -{string} 以标准属字段统计的字段名称。 <br>
 *         standardStatisticModes -{string} 以标准属字段统计的统计模式。 <br>
 *         weightedSummaryFields -{boolean} 以权重字段统计。 <br>
 *         weightedFields -{string} 以权重字段统计的字段名称。 <br>
 *         weightedStatisticModes -{string} 以权重字段统计的统计模式。 <br>
 *         resolution -{number}网格大小。 <br>
 *         meshType -{number}网格面汇总类型。 <br>
 *         meshSizeUnit -{string} 网格大小单位。 <br>
 *         type -{string} 汇总类型。 <br>
 */
var SummaryRegionJobParameter = function () {

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.meshSizeUnit -{SuperMap.AnalystSizeUnit}
     * @description 网格大小单位。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.meshType -{number}
     * @description 网格面汇总类型。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedFields -{string}
     * @description 以权重字段统计的字段名称。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes -{SuperMap.StatisticAnalystMode}
     * @description 以标准属字段统计的统计模式。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields -{boolean}
     * @description 以标准属字段统计。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.sumShape -{boolean}
     * @description 是否统计长度或面积。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    function SummaryRegionJobParameter(options) {
        _classCallCheck(this, SummaryRegionJobParameter);

        this.datasetName = "";
        this.regionDataset = "";
        this.sumShape = true;
        this.query = "";
        this.standardSummaryFields = false;
        this.standardFields = "";
        this.standardStatisticModes = "";
        this.weightedSummaryFields = false;
        this.weightedFields = "";
        this.weightedStatisticModes = "";
        this.meshType = 0;
        this.resolution = 100;
        this.meshSizeUnit = _REST.AnalystSizeUnit.METER;
        this.type = _REST.SummaryType.SUMMARYMESH;

        if (!options) {
            return;
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.SummaryRegionJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.type -{SuperMap.SummaryType}
     * @description 汇总类型。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.resolution -{number}
     * @description 网格大小。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedStatisticModes -{SuperMap.StatisticAnalystMode}
     * @description 以权重字段统计的统计模式。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields -{boolean}
     * @description 以权重字段统计。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardFields -{string}
     * @description 以标准属字段统计的字段名称。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.query
     * @description 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。
     */


    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.regionDataset -{string}
     * @description 汇总数据源（多边形汇总时用到的参数）。
     */


    _createClass(SummaryRegionJobParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.datasetName = null;
            this.sumShape = null;
            this.query = null;
            this.standardSummaryFields = null;
            this.standardFields = null;
            this.standardStatisticModes = null;
            this.weightedSummaryFields = null;
            this.weightedFields = null;
            this.weightedStatisticModes = null;
            this.meshType = null;
            this.resolution = null;
            this.meshSizeUnit = null;
            this.type = null;
        }

        /**
         * @function SuperMap.SummaryRegionJobParameter.toObject
         * @param summaryRegionJobParameter -{Object} 矢量裁剪分析任务参数。
         * @param tempObj - {Object} 目标对象。
         * @description 生成区域汇总分析服务对象
         */

    }], [{
        key: 'toObject',
        value: function toObject(summaryRegionJobParameter, tempObj) {
            for (var name in summaryRegionJobParameter) {
                if (name === "datasetName") {
                    tempObj['input'] = tempObj['input'] || {};
                    tempObj['input'][name] = summaryRegionJobParameter[name];
                    continue;
                }
                if (name === "type") {
                    tempObj['type'] = summaryRegionJobParameter[name];
                    continue;
                }
                if (summaryRegionJobParameter.type === "SUMMARYREGION" || summaryRegionJobParameter.type === "SUMMARYMESH" && name !== "regionDataset") {
                    tempObj['analyst'] = tempObj['analyst'] || {};
                    if (name === 'query') {
                        tempObj['analyst'][name] = summaryRegionJobParameter[name].toBBOX();
                    } else {
                        tempObj['analyst'][name] = summaryRegionJobParameter[name];
                    }
                }
            }
        }
    }]);

    return SummaryRegionJobParameter;
}();

exports.default = SummaryRegionJobParameter;


_SuperMap2.default.SummaryRegionJobParameter = SummaryRegionJobParameter;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ProcessingServiceBase = __webpack_require__(2);

var _ProcessingServiceBase2 = _interopRequireDefault(_ProcessingServiceBase);

var _SummaryRegionJobParameter = __webpack_require__(21);

var _SummaryRegionJobParameter2 = _interopRequireDefault(_SummaryRegionJobParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.SummaryRegionJobsService
 * @classdesc 区域汇总分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 区域汇总分析服务地址。
 * @param options - {Object} 区域汇总分析服务可选参数。
 */
var SummaryRegionJobsService = function (_ProcessingServiceBas) {
    _inherits(SummaryRegionJobsService, _ProcessingServiceBas);

    function SummaryRegionJobsService(url, options) {
        _classCallCheck(this, SummaryRegionJobsService);

        var _this = _possibleConstructorReturn(this, (SummaryRegionJobsService.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.SummaryRegionJobsService";

        _this.url += "/spatialanalyst/summaryregion";
        return _this;
    }

    /**
     *@inheritDoc
     */


    _createClass(SummaryRegionJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJobs
         * @description 获取区域汇总分析任务集合。
         * @return {*}
         */

    }, {
        key: 'getSummaryRegionJobs',
        value: function getSummaryRegionJobs() {
            return _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJob
         * @description 获取指定id的区域汇总分析任务。
         * @param id -{string} 要获取区域汇总分析任务的id
         */

    }, {
        key: 'getSummaryRegionJob',
        value: function getSummaryRegionJob(id) {
            return _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
        }

        /**
         * @function SuperMap.SummaryRegionJobsService.prototype.addSummaryRegionJob
         * @description 新建区域汇总任务。
         * @param params - {SuperMap.SummaryRegionJobParameter} 创建一个区域汇总任务的请求参数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         */

    }, {
        key: 'addSummaryRegionJob',
        value: function addSummaryRegionJob(params, seconds) {
            return _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'addJob', this).call(this, this.url, params, _SummaryRegionJobParameter2.default, seconds);
        }
    }]);

    return SummaryRegionJobsService;
}(_ProcessingServiceBase2.default);

exports.default = SummaryRegionJobsService;


_SuperMap2.default.SummaryRegionJobsService = SummaryRegionJobsService;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.VectorClipJobsParameter
 * @classdesc 矢量裁剪分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetOverlay -{string} 裁剪对象数据集。 <br>
 *         mode -{SuperMap.SpatialQueryMode} 裁剪分析模式 。 <br>
 */
var VectorClipJobsParameter = function () {

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetOverlay -{string}
     * @description 裁剪对象数据集。
     */
    function VectorClipJobsParameter(options) {
        _classCallCheck(this, VectorClipJobsParameter);

        this.datasetName = "";
        this.datasetOverlay = "";
        this.mode = _REST.ClipAnalystMode.CLIP;
        this.CLASS_NAME = "SuperMap.VectorClipJobsParameter";

        options = options || {};
        if (options.mode && typeof options.mode === "string") {
            options.mode = options.mode.toLowerCase();
        }
        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.VectorClipJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */


    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.mode -{SuperMap.ClipAnalystMode}
     * @description 裁剪分析模式 。
     */


    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */


    _createClass(VectorClipJobsParameter, [{
        key: 'destroy',
        value: function destroy() {
            this.datasetName = null;
            this.datasetOverlay = null;
            this.mode = null;
        }
        /**
         * @function SuperMap.VectorClipJobsParameter.toObject
         * @param vectorClipJobsParameter -{Object} 区域汇总分析服务参数
         * @param tempObj - {Object} 目标对象。
         * @description 矢量裁剪分析任务对象
         */

    }], [{
        key: 'toObject',
        value: function toObject(vectorClipJobsParameter, tempObj) {
            for (var name in vectorClipJobsParameter) {
                if (name === "datasetName") {
                    tempObj['input'] = tempObj['input'] || {};
                    tempObj['input'][name] = vectorClipJobsParameter[name];
                    continue;
                }
                tempObj['analyst'] = tempObj['analyst'] || {};
                tempObj['analyst'][name] = vectorClipJobsParameter[name];
            }
        }
    }]);

    return VectorClipJobsParameter;
}();

exports.default = VectorClipJobsParameter;


_SuperMap2.default.VectorClipJobsParameter = VectorClipJobsParameter;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ProcessingServiceBase = __webpack_require__(2);

var _ProcessingServiceBase2 = _interopRequireDefault(_ProcessingServiceBase);

var _VectorClipJobsParameter = __webpack_require__(23);

var _VectorClipJobsParameter2 = _interopRequireDefault(_VectorClipJobsParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.VectorClipJobsService
 * @classdesc 矢量裁剪分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 矢量裁剪分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
var VectorClipJobsService = function (_ProcessingServiceBas) {
    _inherits(VectorClipJobsService, _ProcessingServiceBas);

    function VectorClipJobsService(url, options) {
        _classCallCheck(this, VectorClipJobsService);

        var _this = _possibleConstructorReturn(this, (VectorClipJobsService.__proto__ || Object.getPrototypeOf(VectorClipJobsService)).call(this, url, options));

        _this.CLASS_NAME = "SuperMap.VectorClipJobsService";

        _this.url += "/spatialanalyst/vectorclip";
        return _this;
    }

    /**
     *@inheritDoc
     */


    _createClass(VectorClipJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
         * @description 获取矢量裁剪分析所有任务
         * @return {*}
         */

    }, {
        key: 'getVectorClipJobs',
        value: function getVectorClipJobs() {
            return _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
         * @description 获取指定id的矢量裁剪分析服务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getVectorClipJob',
        value: function getVectorClipJob(id) {
            return _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
        }

        /**
         * @function SuperMap.VectorClipJobsService.protitype.addVectorClipJob
         * @description 新建矢量裁剪分析服务
         * @param params - {SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
         * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
         */

    }, {
        key: 'addVectorClipJob',
        value: function addVectorClipJob(params, seconds) {
            return _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'addJob', this).call(this, this.url, params, _VectorClipJobsParameter2.default, seconds);
        }
    }]);

    return VectorClipJobsService;
}(_ProcessingServiceBase2.default);

exports.default = VectorClipJobsService;


_SuperMap2.default.VectorClipJobsService = VectorClipJobsService;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.KeyServiceParameter
 * @classdesc key申请参数
 * @param options - {Object} 参数。如：<br>
 *        name - {string} 申请服务名称。<br>
 *        serviceIds - {number}服务ID。<br>
 *        clientType - {ClientType} 服务端类型。<br>
 *        limitation - {number}有效期
 */
var KeyServiceParameter = function () {
    function KeyServiceParameter(options) {
        _classCallCheck(this, KeyServiceParameter);

        this.name = null;
        this.serviceIds = null;
        this.clientType = _REST.ClientType.SERVER;
        this.limitation = null;
        this.CLASS_NAME = "SuperMap.KeyServiceParameter";

        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.KeyServiceParameter.prototype.toJSON
     * @description 转换成JSON对象
     * @return {Object} 参数的JSON对象
     */


    _createClass(KeyServiceParameter, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                name: this.name,
                serviceIds: this.serviceIds,
                clientType: this.clientType,
                limitation: this.limitation
            };
        }
    }]);

    return KeyServiceParameter;
}();

exports.default = KeyServiceParameter;


_SuperMap2.default.KeyServiceParameter = KeyServiceParameter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ServerInfo = __webpack_require__(27);

var _ServerInfo2 = _interopRequireDefault(_ServerInfo);

var _TokenServiceParameter = __webpack_require__(28);

var _TokenServiceParameter2 = _interopRequireDefault(_TokenServiceParameter);

var _KeyServiceParameter = __webpack_require__(25);

var _KeyServiceParameter2 = _interopRequireDefault(_KeyServiceParameter);

var _FetchRequest = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class SuperMap.SecurityManager
 * @classdesc
 *  安全管理中心
 *  提供iServer,iPortal,Online统一权限认证管理
 *  使用说明：
 *  创建任何一个服务之前调用SuperMap.SecurityManager.registerToken或
 *  SuperMap.SecurityManager.registerKey注册凭据。
 *  发送请求时根据url或者服务id获取相应的key或者token并自动添加到服务地址中
 */
_SuperMap2.default.SecurityManager = {

    INNER_WINDOW_WIDTH: 600,
    INNER_WINDOW_HEIGHT: 600,
    /**
     * @function SuperMap.SecurityManager.prototype.generateToken
     * @description 从服务器获取一个token,在此之前要注册服务器信息
     * @param url {string}-服务器域名+端口，如：http://localhost:8092
     * @param tokenParam -{SuperMap.TokenServiceParameter} token申请参数
     */
    generateToken: function generateToken(url, tokenParam) {
        var serverInfo = this.servers[url];
        if (!serverInfo) {
            return;
        }
        return _FetchRequest.FetchRequest.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function (response) {
            return response.text();
        });
    },

    /**
     * @function SuperMap.SecurityManager.prototype.registerServers
     * @description 注册安全服务器相关信息
     * @param serverInfos -{SuperMap.ServerInfo} 服务器信息
     */
    registerServers: function registerServers(serverInfos) {
        this.servers = this.servers || {};
        if (!_SuperMap2.default.Util.isArray(serverInfos)) {
            serverInfos = [serverInfos];
        }
        for (var i = 0; i < serverInfos.length; i++) {
            var serverInfo = serverInfos[i];
            this.servers[serverInfo.server] = serverInfo;
        }
    },

    /**
     * @function SuperMap.SecurityManager.prototype.registerToken
     * @description 服务请求都会自动带上这个token
     * @param url {string} -服务器域名+端口：如http://localhost:8090
     * @param token -{string}
     */
    registerToken: function registerToken(url, token) {
        this.tokens = this.tokens || {};
        if (!url || !token) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens[domain] = token;
    },

    /**
     * @function SuperMap.SecurityManager.prototype.registerKey
     * @description 注册key,ids为数组(存在一个key对应多个服务)
     * @param ids -{Array} 可以是服务id数组或者url地址数组或者webAPI类型数组
     * @param key -{string}
     */
    registerKey: function registerKey(ids, key) {
        this.keys = this.keys || {};
        if (!ids || ids.length < 1 || !key) {
            return;
        }

        ids = _SuperMap2.default.Util.isArray(ids) ? ids : [ids];
        for (var i = 0; i < ids.length; i++) {
            var id = this._getUrlRestString(ids[0]) || ids[0];
            this.keys[id] = key;
        }
    },

    /**
     * @function SuperMap.SecurityManager.prototype.getServerInfo
     * @description 获取服务信息
     * @param url {string}-服务器域名+端口，如：http://localhost:8092
     */
    getServerInfo: function getServerInfo(url) {
        this.servers = this.servers || {};
        return this.servers[url];
    },

    /**
     * @function SuperMap.SecurityManager.prototype.getToken
     * @description token按照域名存储
     * @param url -{string}-服务器域名+端口，如：http://localhost:8092
     */
    getToken: function getToken(url) {
        if (!url) {
            return;
        }
        this.tokens = this.tokens || {};
        var domain = this._getTokenStorageKey(url);
        return this.tokens[domain];
    },

    getKey: function getKey(id) {
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        return this.keys[key];
    },

    /**
     * @function SuperMap.SecurityManager.prototype.loginOnline
     * @description Online登录验证
     * @param callbackLocation -{string} 跳转位置
     * @param newTab -{boolean}是否新窗口打开
     */
    loginOnline: function loginOnline(callbackLocation, newTab) {
        var loginUrl = _SuperMap2.default.SecurityManager.SSO + "/login?service=" + callbackLocation;
        this._open(loginUrl, newTab);
    },

    /**
     * @function SuperMap.SecurityManager.prototype.loginPortal
     * @description iPortal登录验证
     * @param url -{string} 网站地址
     * @param newTab -{boolean}是否新窗口打开
     */
    loginPortal: function loginPortal(url, newTab) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "web/login" : "/web/login";
        this._open(url, newTab);
    },
    /**
     * @function SuperMap.SecurityManager.prototype.destroyAllCredentials
     * @description 清空全部验证信息
     */
    destroyAllCredentials: function destroyAllCredentials() {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    },
    /**
     * @function SuperMap.SecurityManager.prototype.destroyToken
     * @description 清空令牌信息
     */
    destroyToken: function destroyToken(url) {
        if (!url) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens = this.tokens || {};
        if (this.tokens[domain]) {
            delete this.tokens[domain];
        }
    },
    /**
     * @function SuperMap.SecurityManager.prototype.destroyToken
     * @description 清空服务授权码
     */
    destroyKey: function destroyKey(id) {
        if (!id) {
            return;
        }
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        if (this.keys[key]) {
            delete this.keys[key];
        }
    },

    _open: function _open(url, newTab) {
        newTab = newTab != null ? newTab : true;
        var offsetX = window.screen.availWidth / 2 - this.INNER_WINDOW_WIDTH / 2;
        var offsetY = window.screen.availHeight / 2 - this.INNER_WINDOW_HEIGHT / 2;
        var options = "height=" + this.INNER_WINDOW_HEIGHT + ", width=" + this.INNER_WINDOW_WIDTH + ",top=" + offsetY + ", left=" + offsetX + ",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no";
        if (newTab) {
            window.open(url, 'login');
        } else {
            window.open(url, 'login', options);
        }
    },

    _getTokenStorageKey: function _getTokenStorageKey(url) {
        var patten = /http:\/\/([^\/]+)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    },

    _getUrlRestString: function _getUrlRestString(url) {
        if (!url) {
            return url;
        }
        var patten = /http:\/\/(.*\/rest)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    }

};
_SuperMap2.default.SecurityManager.SSO = "https://sso.supermap.com";
_SuperMap2.default.SecurityManager.ONLINE = "http://www.supermapol.com";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.ServerInfo
 * @classdesc 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 * @param type - {string} 服务器类型
 * @param options - {Object} 服务器信息相关可选参数。如：<br>
 *        server - {string} 服务器地址,如：http://supermapiserver:8090/iserver<br>
 *        tokenServiceUrl - {string} 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
 *        keyServiceUrl - {string} 非必填，如：http://supermapiserver:8092/web/mycontent/keys/register.json
 */
var ServerInfo =

/**
 * @member SuperMap.ServerInfo.prototype.tokenServiceUrl -{string}
 * @description 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
 */

/**
 * @member SuperMap.ServerInfo.prototype.type -{SuperMap.ServerType}
 * @description 服务器类型
 */
function ServerInfo(type, options) {
    _classCallCheck(this, ServerInfo);

    this.type = null;
    this.server = null;
    this.tokenServiceUrl = null;
    this.keyServiceUrl = null;
    this.CLASS_NAME = "SuperMap.ServerInfo";

    this.type = type || _REST.ServerType.ISERVER;
    _SuperMap2.default.Util.extend(this, options);
    if (!this.server) {
        console.error('server url require is not  undefined');
    }
    var patten = /http:\/\/([^\/]+)/i;
    this.server = this.server.match(patten)[0];

    var tokenServiceSuffix = "/services/security/tokens.json";
    if (this.type === _REST.ServerType.ISERVER && this.server.indexOf("iserver") < 0) {
        tokenServiceSuffix = "/iserver" + tokenServiceSuffix;
    }

    if (!this.tokenServiceUrl) {
        this.tokenServiceUrl = this.server + tokenServiceSuffix;
    }

    if (!this.keyServiceUrl) {
        if (this.type === _REST.ServerType.IPORTAL) {
            this.keyServiceUrl = this.server + "/web/mycontent/keys/register.json";
        } else if (this.type === _REST.ServerType.ONLINE) {
            this.keyServiceUrl = this.server + "/web/mycontent/keys.json";
        }
    }
}

/**
 * @member SuperMap.ServerInfo.prototype.keyServiceUrl -{string}
 * @description 非必填。如：http://supermapiserver:8092/web/mycontent/keys/register.json
 */


/**
 * @member SuperMap.ServerInfo.prototype.server -{string}
 * @description 必填，服务器地址
 */
;

exports.default = ServerInfo;


_SuperMap2.default.ServerInfo = ServerInfo;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _REST = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.TokenServiceParameter
 * @classdesc token申请参数
 * @param options - {Object} 参数。
 */
var TokenServiceParameter = function () {
    /**
     * @member SuperMap.TokenServiceParameter.prototype.referer -{string}
     * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
     */


    /**
     * @member SuperMap.TokenServiceParameter.prototype.clientType -{string}
     * @description token申请的客户端标识类型。
     */

    /**
     * @member SuperMap.TokenServiceParameter.prototype.userName -{string}
     * @description 用户名。
     */
    function TokenServiceParameter(options) {
        _classCallCheck(this, TokenServiceParameter);

        this.userName = null;
        this.password = null;
        this.clientType = _REST.ClientType.NONE;
        this.ip = null;
        this.referer = null;
        this.expiration = 60;
        this.CLASS_NAME = "SuperMap.TokenServiceParameter";

        _SuperMap2.default.Util.extend(this, options);
    }

    /**
     * @function SuperMap.TokenServiceParameter.prototype.toJSON
     * @description 将所有信息转成JSON字符串
     * @return {string} 参数的JSON字符串
     */


    /**
     * @member SuperMap.TokenServiceParameter.prototype.expiration -{number}
     * @description 申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
     */


    /**
     * @member SuperMap.TokenServiceParameter.prototype.referer -{string}
     * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
     */

    /**
     * @member SuperMap.TokenServiceParameter.prototype.password -{string}
     * @description 密码。
     */


    _createClass(TokenServiceParameter, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                userName: this.userName,
                password: this.password,
                clientType: this.clientType,
                ip: this.ip,
                referer: this.referer,
                expiration: this.expiration
            };
        }
    }]);

    return TokenServiceParameter;
}();

exports.default = TokenServiceParameter;


_SuperMap2.default.TokenServiceParameter = TokenServiceParameter;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = SuperMap;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
__webpack_require__(7);
module.exports = __webpack_require__(6);


/***/ })
/******/ ]);