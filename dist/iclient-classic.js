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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = window.SuperMap = window.SuperMap || {};
module.exports = SuperMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummaryType = exports.StatisticAnalystMode = exports.AnalystSizeUnit = exports.AnalystAreaUnit = exports.ClipAnalystMode = exports.ChartType = exports.ClientType = exports.Exponent = exports.VariogramMode = exports.InterpolationAlgorithmType = exports.SearchMode = exports.PixelFormat = exports.StatisticMode = exports.UGCLayerType = exports.LayerType = exports.ColorSpaceType = exports.GridType = exports.TransferPreference = exports.TransferTactic = exports.EditType = exports.DataReturnMode = exports.SurfaceAnalystMethod = exports.SmoothMethod = exports.OverlayOperationType = exports.BufferEndType = exports.TurnType = exports.SupplyCenterType = exports.SideType = exports.DirectionType = exports.LabelOverLengthMode = exports.LabelBackShape = exports.AlongLineDirection = exports.FillGradientMode = exports.TextAlignment = exports.ColorGradientType = exports.ThemeType = exports.RangeMode = exports.GraduatedMode = exports.GraphAxesTextDisplayMode = exports.ThemeGraphType = exports.ThemeGraphTextFormat = exports.EngineType = exports.Unit = exports.MeasureMode = exports.SpatialRelationType = exports.SpatialQueryMode = exports.JoinType = exports.QueryOption = exports.GeometryType = exports.ServerType = exports.DataFormat = undefined;

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name DataFormat
 * @memberOf SuperMap
 * @description 服务请求返回结果数据类型
 *
 * @property {string} GEOJSON  GEOJSON
 * @property {string} ISERVER  ISERVER
 */
var DataFormat = exports.DataFormat = _SuperMap2.default.DataFormat = {
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
var ServerType = exports.ServerType = _SuperMap2.default.ServerType = {
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
 * @name QueryOption
 * @memberOf SuperMap
 * @description 查询结果类型枚举,描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 *
 * @property {string} ATTRIBUTE  ATTRIBUTE
 * @property {string} ATTRIBUTEANDGEOMETRY  ATTRIBUTEANDGEOMETRY
 * @property {string} GEOMETRY  GEOMETRY
 */
var QueryOption = exports.QueryOption = _SuperMap2.default.QueryOption = {
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
var JoinType = exports.JoinType = _SuperMap2.default.JoinType = {
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
 * @name SpatialRelationType
 * @memberOf SuperMap
 * @description  数据集对象间的空间关系枚举。
 * 该类定义了数据集对象间的空间关系类型常量。
 *
 * @property {string} CONTAIN 包含关系 CONTAIN  CONTAIN
 * @property {string} INTERSECT 相交关系 INTERSECT  INTERSECT
 * @property {string} INTERSECT 被包含关系 WITHIN  WITHIN
 */
var SpatialRelationType = exports.SpatialRelationType = _SuperMap2.default.SpatialRelationType = {
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
var MeasureMode = exports.MeasureMode = _SuperMap2.default.MeasureMode = {
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
var EngineType = exports.EngineType = _SuperMap2.default.EngineType = {
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
var ThemeGraphTextFormat = exports.ThemeGraphTextFormat = _SuperMap2.default.ThemeGraphTextFormat = {
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
 * @name GraphAxesTextDisplayMode
 * @memberOf SuperMap
 * @description  统计专题图坐标轴文本显示模式。
 *
 * @property {string} ALL  ALL, 显示全部文本
 * @property {string} NONE  NONE, 没有显示
 * @property {string} YAXES  YAXES. 显示Y轴的文本
 */
var GraphAxesTextDisplayMode = exports.GraphAxesTextDisplayMode = _SuperMap2.default.GraphAxesTextDisplayMode = {
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
var GraduatedMode = exports.GraduatedMode = _SuperMap2.default.GraduatedMode = {
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
var RangeMode = exports.RangeMode = _SuperMap2.default.RangeMode = {
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
var ThemeType = exports.ThemeType = _SuperMap2.default.ThemeType = {
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
var FillGradientMode = exports.FillGradientMode = _SuperMap2.default.FillGradientMode = {
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
var AlongLineDirection = exports.AlongLineDirection = _SuperMap2.default.AlongLineDirection = {
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
 * @name LabelOverLengthMode
 * @memberOf SuperMap
 * @description  标签专题图中超长标签的处理模式枚举。
 *
 * @property {string} NEWLINE  NEWLINE
 * @property {string} NONE  NONE
 * @property {string} OMIT  OMIT
 */
var LabelOverLengthMode = exports.LabelOverLengthMode = _SuperMap2.default.LabelOverLengthMode = {
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
var DirectionType = exports.DirectionType = _SuperMap2.default.DirectionType = {
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
var SideType = exports.SideType = _SuperMap2.default.SideType = {
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
var SupplyCenterType = exports.SupplyCenterType = _SuperMap2.default.SupplyCenterType = {
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
var TurnType = exports.TurnType = _SuperMap2.default.TurnType = {
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
var BufferEndType = exports.BufferEndType = _SuperMap2.default.BufferEndType = {
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
 * @name SmoothMethod
 * @memberOf SuperMap
 * @description  光滑方法枚举。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 *
 * @property {string} BSPLINE  BSPLINE
 * @property {string} POLISH  POLISH
 */
var SmoothMethod = exports.SmoothMethod = _SuperMap2.default.SmoothMethod = {
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
var SurfaceAnalystMethod = exports.SurfaceAnalystMethod = _SuperMap2.default.SurfaceAnalystMethod = {
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
var DataReturnMode = exports.DataReturnMode = _SuperMap2.default.DataReturnMode = {
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
var EditType = exports.EditType = _SuperMap2.default.EditType = {
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
var TransferTactic = exports.TransferTactic = _SuperMap2.default.TransferTactic = {
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
var TransferPreference = exports.TransferPreference = _SuperMap2.default.TransferPreference = {
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
var GridType = exports.GridType = _SuperMap2.default.GridType = {
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
var ColorSpaceType = exports.ColorSpaceType = _SuperMap2.default.ColorSpaceType = {
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
var LayerType = exports.LayerType = _SuperMap2.default.LayerType = {
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
var UGCLayerType = exports.UGCLayerType = _SuperMap2.default.UGCLayerType = {
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
var StatisticMode = exports.StatisticMode = _SuperMap2.default.StatisticMode = {
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
 * @name SearchMode
 * @memberOf SuperMap
 * @description  内插时使用的样本点的查找方式枚举
 *
 * @property {string} KDTREE_FIXED_COUNT  KDTREE_FIXED_COUNT, 使用 KDTREE 的固定点数方式查找参与内插分析的点
 * @property {string} KDTREE_FIXED_RADIUS  KDTREE_FIXED_RADIUS, 使用 KDTREE 的定长方式查找参与内插分析的点
 * @property {string} NONE  NONE, 不进行查找，使用所有的输入点进行内插分析
 * @property {string} QUADTREE  QUADTREE, 使用 QUADTREE 方式查找参与内插分析的点，仅对样条（RBF）插值和普通克吕金（Kriging）有用
 */
var SearchMode = exports.SearchMode = _SuperMap2.default.SearchMode = {
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
var InterpolationAlgorithmType = exports.InterpolationAlgorithmType = _SuperMap2.default.InterpolationAlgorithmType = {
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
var VariogramMode = exports.VariogramMode = _SuperMap2.default.VariogramMode = {
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
var Exponent = exports.Exponent = _SuperMap2.default.Exponent = {
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
var ClientType = exports.ClientType = _SuperMap2.default.ClientType = {
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
 * @name ClipAnalystMode
 * @memberOf SuperMap
 * @description  裁剪分析模式
 *
 * @property {string} CLIP  clip
 * @property {string} INTERSECT  intersect
 */
var ClipAnalystMode = exports.ClipAnalystMode = _SuperMap2.default.ClipAnalystMode = {
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
var AnalystSizeUnit = exports.AnalystSizeUnit = _SuperMap2.default.AnalystSizeUnit = {
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
var StatisticAnalystMode = exports.StatisticAnalystMode = _SuperMap2.default.StatisticAnalystMode = {
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
 * @description 分布式分析服务基类
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 分布式分析服务地址。
 * @param options - {Object} 参数。如：<br>
 *        events - {{@link SuperMap.Events}} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {{@link ServerType}} 服务器类型，iServer|iPortal|Online。<br>
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
     * @function SuperMap.ProcessingServiceBase.prototype.destroy
     * @override
     */


    _createClass(ProcessingServiceBase, [{
        key: 'destroy',
        value: function destroy() {
            _get(ProcessingServiceBase.prototype.__proto__ || Object.getPrototypeOf(ProcessingServiceBase.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.ProcessingServiceBase.prototype.getJobs
         * @description 获取分布式分析任务。
         * @param url - {string} 资源地址。
         */

    }, {
        key: 'getJobs',
        value: function getJobs(url) {
            var me = this;
            _FetchRequest.FetchRequest.get(url).then(function (response) {
                return response.json();
            }).then(function (result) {
                me.events.triggerEvent("processCompleted", { result: result });
            }).catch(function (e) {
                me.eventListeners.processFailed({ error: e });
            });
        }

        /**
         * @function SuperMap.ProcessingServiceBase.prototype.addJob
         * @description 添加分布式分析任务。
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
            _FetchRequest.FetchRequest.post(me._processUrl(url), JSON.stringify(parameterObject), options).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.succeed) {
                    me.serviceProcessCompleted(result, seconds);
                } else {
                    me.serviceProcessFailed(result);
                }
            }).catch(function (e) {
                me.serviceProcessFailed({ error: e });
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
                    _FetchRequest.FetchRequest.get(result.newResourceLocation).then(function (response) {
                        return response.json();
                    }).then(function (job) {
                        me.events.triggerEvent("processRunning", { id: job.id, state: job.state });
                        if (job.state.runState === 'LOST' || job.state.runState === 'KILLED' || job.state.runState === 'FAILED') {
                            clearInterval(id);
                            me.events.triggerEvent("processFailed", { error: job.state.errorMsg, state: job.state.runState });
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


var SuperMap = window.SuperMap = window.SuperMap || {};
SuperMap.REST = SuperMap.REST || {};
module.exports = SuperMap;

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

var _FetchRequest = __webpack_require__(5);

__webpack_require__(24);

__webpack_require__(22);

__webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.CommonServiceBase
 * @classdesc 对接iServer各种服务的Service的基类。
 * @param url - {string} 服务地址。
 * @param options - {Object} 可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
var CommonServiceBase = function () {
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
     * @description 释放资源，将引用的资源属性置空。
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
         *        method - {string} 请求方式，包括"GET"，"POST"，"PUT"，"DELETE"。<br>
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
         * @return {SuperMap.Credential} 凭据信息对象。
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

__webpack_require__(44);

var _whatwgFetchImportable = __webpack_require__(20);

var _whatwgFetchImportable2 = _interopRequireDefault(_whatwgFetchImportable);

var _fetchJsonp2 = __webpack_require__(14);

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
        options = options || {};
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
        options = options || {};
        var type = 'DELETE';
        url = this._processUrl(url, options);
        url = _SuperMap2.default.Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url) && Support.cors) {
            return this._fetch(url, params, options, type);
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    post: function post(url, params, options) {
        options = options || {};
        return this._fetch(this._processUrl(url, options), params, options, 'POST');
    },

    put: function put(url, params, options) {
        options = options || {};
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

        if (url.indexOf('.json') === -1 && !options.withoutFormatSuffix) {
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayExt = exports.FunctionExt = exports.NumberExt = exports.StringExt = undefined;

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *@namespace SuperMap
 */

/**
 * @description In addition to the mandatory C and P parameters, an arbitrary number of
 * objects can be passed, which will extend C.
 * @memberOf SuperMap
 * @param C - {Object} the class that inherits
 * @param P - {Object} the superclass to inherit from
 */
_SuperMap2.default.inherit = function (C, P) {
    var F = function F() {};
    F.prototype = P.prototype;
    C.prototype = new F();
    var i, l, o;
    for (i = 2, l = arguments.length; i < l; i++) {
        o = arguments[i];
        if (typeof o === "function") {
            o = o.prototype;
        }
        _SuperMap2.default.Util.extend(C.prototype, o);
    }
};

/**
 * @description 实现多重继承
 * @memberOf SuperMap
 * @param ...mixins {Class|Object}继承的类
 */
_SuperMap2.default.mixin = function () {
    for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
    }

    var Mix = function Mix(options) {
        _classCallCheck(this, Mix);

        for (var index = 0; index < mixins.length; index++) {
            copyProperties(this, new mixins[index](options));
        }
    };

    for (var index = 0; index < mixins.length; index++) {
        var mixin = mixins[index];
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
        copyProperties(Mix.prototype, new mixin());
    }
    return Mix;

    function copyProperties(target, source) {
        var ownKeys = Object.getOwnPropertyNames(source);
        if (Object.getOwnPropertySymbols) {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source));
        }
        for (var index = 0; index < ownKeys.length; index++) {
            var key = ownKeys[index];
            if (key !== "constructor" && key !== "prototype" && key !== "name" && key !== "length") {
                var desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }
};

/**
 * @name String
 * @memberOf SuperMap
 * @namespace
 * @description 字符串操作的一系列常用扩展函数.
 */
var StringExt = exports.StringExt = _SuperMap2.default.String = {

    /**
     * @description 判断目标字符串是否以指定的子字符串开头.
     * @param str - {string} 目标字符串.
     * @param sub - {string} 查找的子字符串.
     * @returns {Boolean} 目标字符串以指定的子字符串开头,则返回true;否则返回false.
     */
    startsWith: function startsWith(str, sub) {
        return str.indexOf(sub) == 0;
    },

    /**
     * @description 判断目标字符串是否包含指定的子字符串.
     * @param str - {string} 目标字符串.
     * @param sub - {string} 查找的子字符串.
     * @returns {Boolean} 目标字符串中包含指定的子字符串,则返回true;否则返回false.
     */
    contains: function contains(str, sub) {
        return str.indexOf(sub) != -1;
    },

    /**
     * @description 删除一个字符串的开头和结尾处的所有空白字符.
     * @param str - {string} (可能)存在空白字符填塞的字符串.
     * @returns {string} 删除开头和结尾处空白字符后的字符串.
     */
    trim: function trim(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },

    /**
     * @description 骆驼式("-")连字符的字符串处理.
     * 例如: "chicken-head" becomes "chickenHead",
     *       "-chicken-head" becomes "ChickenHead".
     * @param str - {string} 要处理的字符串,原始内容不应被修改.
     * @returns {string}
     */
    camelize: function camelize(str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i = 1, len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },

    /**
     * @description 提供带 ${token} 标记的字符串, 返回context对象属性中指定标记的属性值.
     * @example
     * 示例:
     * (code)
     * 1、template = "${value,getValue}";
     *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
     *         args = [2,23,12,36,21];
     *       返回值:36
     * (end)
     * 示例:
     * (code)
     * 2、template = "$${{value,getValue}}";
     *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
     *         args = [2,23,12,36,21];
     *       返回值:"${36}"
     * (end)
     * 示例:
     * (code)
     * 3、template = "${a,b}";
     *         context = {a: {b:"format"}};
     *         args = null;
     *       返回值:"format"
     * (end)
     * 示例:
     * (code)
     * 3、template = "${a,b}";
     *         context = null;
     *         args = null;
     *       返回值:"${a.b}"
     * (end)
     * @param template - {string} 带标记的字符串将要被替换.参数 template 格式为"${token}",此处的 token 标记会替换为 context["token"] 属性的值
     * @param context - {Object} 带有属性的可选对象的属性用于匹配格式化字符串中的标记.如果该参数为空,将使用 window 对象.
     * @param args - {Array} 可选参数传递给在context对象上找到的函数.
     * @returns {string} 从 context 对象属性中替换字符串标记位的字符串.
     */
    format: function format(template, context, args) {
        if (!context) {
            context = window;
        }

        // Example matching:
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function replacer(str, match) {
            var replacement;

            // Loop through all subs. Example: ${a.b.c}
            // 0 -> replacement = context[a];
            // 1 -> replacement = context[a][b];
            // 2 -> replacement = context[a][b][c];
            var subs = match.split(/\.+/);
            for (var i = 0; i < subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }

                replacement = replacement[subs[i]];
            }

            if (typeof replacement === "function") {
                replacement = args ? replacement.apply(null, args) : replacement();
            }

            // If replacement is undefined, return the string 'undefined'.
            // This is a workaround for a bugs in browsers not properly
            // dealing with non-participating groups in regular expressions:
            // http://blog.stevenlevithan.com/archives/npcg-javascript
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement;
            }
        };

        return template.replace(_SuperMap2.default.String.tokenRegEx, replacer);
    },

    /**
     * @description Used to find tokens in a string.
     * @default  /\$\{([\w.]+?)\}/g
     * @example
     * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
     */
    tokenRegEx: /\$\{([\w.]+?)\}/g,

    /**
     * @description Used to test strings as numbers.
     * @default  /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/
     */
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,

    /**
     * @description 判断一个字符串是否只包含一个数值.
     * @example
     * (code)
     * SuperMap.String.isNumeric("6.02e23") // true
     * SuperMap.String.isNumeric("12 dozen") // false
     * SuperMap.String.isNumeric("4") // true
     * SuperMap.String.isNumeric(" 4 ") // false
     * (end)
     * @returns {Boolean} 字符串包含唯一的数值,返回true;否则返回false.
     */
    isNumeric: function isNumeric(value) {
        return _SuperMap2.default.String.numberRegEx.test(value);
    },

    /**
     * @description 把一个看似数值型的字符串转化为一个数值.
     *
     * @returns {number|string} 如果能转换为数值则返回数值,否则返回字符串本身.
     */
    numericIf: function numericIf(value) {
        return _SuperMap2.default.String.isNumeric(value) ? parseFloat(value) : value;
    }

};

/**
 * @name Number
 * @memberOf SuperMap
 * @namespace
 * @description 数值操作的一系列常用扩展函数.
 */
var NumberExt = exports.NumberExt = _SuperMap2.default.Number = {

    /**
     *  @description 格式化数字时默认的小数点分隔符.
     *  @constant
     *  @default "."
     */
    decimalSeparator: ".",

    /**
     *  @description 格式化数字时默认的千位分隔符.
     *  @constant
     *  @default ","
     */
    thousandsSeparator: ",",

    /**
     * @description 限制浮点数的有效数字位数.
     * @param num - {number}
     * @param sig - {integer}
     * @returns {number} 将数字四舍五入到指定数量的有效位数.
     */
    limitSigDigs: function limitSigDigs(num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },

    /**
     * @description 数字格式化输出.
     * @param num  - {number}
     * @param dec  - {integer} 数字的小数部分四舍五入到指定的位数.默认为 0. 设置为null值时小数部分不变.
     * @param tsep - {string} 千位分隔符. 默认为",".
     * @param dsep - {string} 小数点分隔符. 默认为".".
     * @returns {string} 数字格式化后的字符串.
     */
    format: function format(num, dec, tsep, dsep) {
        dec = typeof dec != "undefined" ? dec : 0;
        tsep = typeof tsep != "undefined" ? tsep : _SuperMap2.default.Number.thousandsSeparator;
        dsep = typeof dsep != "undefined" ? dsep : _SuperMap2.default.Number.decimalSeparator;

        if (dec != null) {
            num = parseFloat(num.toFixed(dec));
        }

        var parts = num.toString().split(".");
        if (parts.length === 1 && dec == null) {
            // integer where we do not want to touch the decimals
            dec = 0;
        }

        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/;
            while (thousands.test(integer)) {
                integer = integer.replace(thousands, "$1" + tsep + "$2");
            }
        }

        var str;
        if (dec == 0) {
            str = integer;
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0");
            }
            str = integer + dsep + rem;
        }
        return str;
    }
};

if (!Number.prototype.limitSigDigs) {
    /**
     * APIMethod: Number.limitSigDigs
     * 限制浮点数的有效数字位数.
     * @param sig - {integer}
     * @returns {integer} 将数字四舍五入到指定数量的有效位数.
     *           如果传入值为 null、0、或者是负数, 返回值 0
     */
    Number.prototype.limitSigDigs = function (sig) {
        return NumberExt.limitSigDigs(this, sig);
    };
}

/**
 * @name Function
 * @memberOf SuperMap
 * @namespace
 * @description 函数操作的一系列常用扩展函数.
 */
var FunctionExt = exports.FunctionExt = _SuperMap2.default.Function = {
    /**
     * @description 绑定函数到对象.方便创建this的作用域.
     * @param func - {function} 输入函数.
     * @param object - {Object} 对象绑定到输入函数(作为输入函数的this对象).
     * @returns {function} object参数作为func函数的this对象.
     */
    bind: function bind(func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
            return func.apply(object, newArgs);
        };
    },

    /**
     * @description 绑定函数到对象,在调用该函数时配置并使用事件对象作为第一个参数.
     * @param func - {function} 用于监听事件的函数.
     * @param object - {Object} this 对象的引用.
     * @returns {function}
     */
    bindAsEventListener: function bindAsEventListener(func, object) {
        return function (event) {
            return func.call(object, event || window.event);
        };
    },

    /**
     * @description 该函数仅仅返回false.该函数主要是避免在IE8以下浏览中DOM事件句柄的匿名函数问题.
     * @example
     * document.onclick = SuperMap.Function.False;
     * @returns {Boolean}
     */
    False: function False() {
        return false;
    },

    /**
     * @description 该函数仅仅返回true.该函数主要是避免在IE8以下浏览中DOM事件句柄的匿名函数问题.
     * @example
     * document.onclick = SuperMap.Function.True;
     * @returns {Boolean}
     */
    True: function True() {
        return true;
    },

    /**
     * @description 可重用函数,仅仅返回"undefined".
     * @returns {undefined}
     */
    Void: function Void() {}

};

/**
 * @name Array
 * @memberOf SuperMap
 * @namespace
 * @description 数组操作的一系列常用扩展函数.
 */
var ArrayExt = exports.ArrayExt = _SuperMap2.default.Array = {

    /**
     * @description 过滤数组.提供了ECMA-262标准中Array.prototype.filter函数的扩展.
     * @see {@link http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter}
     * @param array - {Array} 要过滤的数组..
     * @param callback - {function} 数组中的每一个元素调用该函数.<br>
     *     如果函数的返回值为true,该元素将包含在返回的数组中.该函数有三个参数: 数组中的元素,元素的索引,数组自身.<br>
     *     如果设置了可选参数caller,在调用callback时,使用可选参数caller设置为callback的参数.<br>
     * @param caller - {Object} 在调用callback时,使用可选参数caller设置为callback的参数.
     * @returns {Array} callback函数返回true时的元素将作为返回数组中的元素.
     */
    filter: function filter(array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val);
                    }
                }
            }
        }
        return selected;
    }

};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Util = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Util = exports.Util = _SuperMap2.default.Util = _SuperMap2.default.Util || {};
/**
 * @name Util
 * @memberOf SuperMap
 * @namespace
 * @description common工具类。
 */

/**
 * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 * @example
 * 要复制SuperMap.Size对象的所有属性到自定义对象上，使用方法如下:
 *     var size = new SuperMap.Size(100, 100);
 *     var obj = {}；
 *     SuperMap.Util.extend(obj, size);
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象，其属性将被设置到目标对象上。
 * @return {Object} 目标对象。
 */

_SuperMap2.default.Util.extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event === "function" && source instanceof window.Event;

        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
/**
 * @description 对象拷贝。
 * @param des - {Object} 目标对象。
 * @param soc - {Object} 源对象
 */
_SuperMap2.default.Util.copy = function (des, soc) {
    des = des || {};
    var v;
    if (soc) {
        for (var p in des) {
            v = soc[p];
            if (typeof v !== 'undefined') {
                des[p] = v;
            }
        }
    }
};
/**
 * @description 销毁对象，将其属性置空
 * @param obj - {Object} 目标对象。
 */
_SuperMap2.default.Util.reset = function (obj) {
    obj = obj || {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (_typeof(obj[p]) === "object" && obj[p] instanceof Array) {
                for (var i in obj[p]) {
                    if (obj[p][i].destroy) {
                        obj[p][i].destroy();
                    }
                }
                obj[p].length = 0;
            } else if (_typeof(obj[p]) === "object" && obj[p] instanceof Object) {
                if (obj[p].destroy) {
                    obj[p].destroy();
                }
            }
            obj[p] = null;
        }
    }
};

/**
 * @description 获取HTML元素数组。
 * @param argument - {String | HTMLElement | Window}
 * @return {Array<HTMLElement>} HTML元素数组。
 */
_SuperMap2.default.Util.getElement = function () {
    var elements = [];

    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

/**
 * @description instance of的跨浏览器实现。
 * @param o - {Object} 对象。
 * @return {boolean}
 */
_SuperMap2.default.Util.isElement = function (o) {
    return !!(o && o.nodeType === 1);
};

/**
 * @description 判断一个对象是否是数组。
 * @param a - {Object} 对象。
 * @return {boolean} 是否是数组。
 */
_SuperMap2.default.Util.isArray = function (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
};

/**
 * @description 从数组中删除某一项。
 * @param array - {Array} 数组。
 * @param item - {Object} 数组中要删除的一项。
 * @return {Array} 执行删除操作后的数组。
 */
_SuperMap2.default.Util.removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
            array.splice(i, 1);
            //break;more than once??
        }
    }
    return array;
};

/**
 * @description 获取某对象再数组中的索引值。
 * @param array - {Array} 数组。
 * @param obj - {Object} 对象。
 * @return {number} 某对象再数组中的索引值。
 */
_SuperMap2.default.Util.indexOf = function (array, obj) {
    if (array == null) {
        return -1;
    } else {
        // use the build-in function if available.
        if (typeof array.indexOf === "function") {
            return array.indexOf(obj);
        } else {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
};

/**
 * @description 修改某DOM元素的许多属性。
 * @param element - {HTMLElement} 待修改的DOM元素。
 * @param id - {string} DOM元素的id。
 * @param px - {SuperMap.Pixel} 包含DOM元素的style属性的left和top属性。
 * @param sz - {SuperMap.Size} 包含DOM元素的width和height属性。
 * @param position - {string} DOM元素的position属性。
 * @param border - {string} DOM元素的style属性的border属性。
 * @param overflow - {string} DOM元素的style属性的overflow属性。
 * @param opacity - {number} 不透明度值。取值范围为 (0.0 - 1.0)。
 */
_SuperMap2.default.Util.modifyDOMElement = function (element, id, px, sz, position, border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};

/**
 * @param params - {Object} 参数对象。
 * @return {string} HTTP的GEI请求中的参数字符串。
 * @description 将参数对象转换为HTTP的GEI请求中的参数字符串。例如："key1=value1&key2=value2&key3=value3"。
 */
_SuperMap2.default.Util.getParameterString = function (params) {
    var paramsArray = [];

    for (var key in params) {
        var value = params[key];
        if (value != null && typeof value !== 'function') {
            var encodedValue;
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array) {
                /* value is an array; encode items and separate with "," */
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent(item === null || item === undefined ? "" : item));
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                /* value is a string; simply encode */
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }

    return paramsArray.join("&");
};

/**
 * @description 给url追加参数。
 * @param url - {string} 待追加参数的url字符串。
 * @param paramStr - {string} 待追加的参数。
 * @return {string} The new url
 */
_SuperMap2.default.Util.urlAppend = function (url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += parts.pop() === " " ? paramStr : parts.length ? "&" + paramStr : "?" + paramStr;
    }
    return newUrl;
};

/**
 * @description 为了避免浮点精度错误而保留的有效位数。
 * @type {number}
 * @default 14
 */
_SuperMap2.default.Util.DEFAULT_PRECISION = 14;

/**
 * @description 将字符串以接近的精度转换为数字。
 * @param number - {string} 字符串。
 * @param precision - {number} 精度。
 * @return {number} 数字。
 */
_SuperMap2.default.Util.toFloat = function (number, precision) {
    if (precision == null) {
        precision = _SuperMap2.default.Util.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
        number = parseFloat(number);
    }
    return precision === 0 ? number : parseFloat(number.toPrecision(precision));
};

/**
 * @description 角度转弧度。
 * @param x - {number} 角度。
 * @return {number} 弧度。
 */
_SuperMap2.default.Util.rad = function (x) {
    return x * Math.PI / 180;
};

/**
 * @description 从URL字符串中解析出参数对象。
 * @param url - {string} url。
 * @return {Object} 解析出的参数对象。
 */
_SuperMap2.default.Util.getParameters = function (url) {
    // if no url specified, take it from the location bar
    url = url === null || url === undefined ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = "";
    if (_SuperMap2.default.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = _SuperMap2.default.String.contains(url, "#") ? url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }

    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {

            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }

            // being liberal by replacing "+" with " "
            var value = (keyValue[1] || '').replace(/\+/g, " ");

            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }

            // follow OGC convention of comma delimited values
            value = value.split(",");

            //if there's only one value, do not return as array                    
            if (value.length == 1) {
                value = value[0];
            }

            parameters[key] = value;
        }
    }
    return parameters;
};

/**
 * @description 不断递增计数变量，用于生成唯一ID。
 * @type {number}
 * @default 0
 */
_SuperMap2.default.Util.lastSeqID = 0;

/**
 * @description 创建唯一ID值。
 * @param prefix {string} 前缀。
 * @return {string} 唯一的ID值。
 */
_SuperMap2.default.Util.createUniqueID = function (prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    _SuperMap2.default.Util.lastSeqID += 1;
    return prefix + _SuperMap2.default.Util.lastSeqID;
};

/**
 * @memberOf SuperMap
 * @description 每单位的英尺数。
 * @type {Object}
 * @constant
 */
_SuperMap2.default.INCHES_PER_UNIT = {
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
_SuperMap2.default.INCHES_PER_UNIT["in"] = _SuperMap2.default.INCHES_PER_UNIT.inches;
_SuperMap2.default.INCHES_PER_UNIT["degrees"] = _SuperMap2.default.INCHES_PER_UNIT.dd;
_SuperMap2.default.INCHES_PER_UNIT["nmi"] = 1852 * _SuperMap2.default.INCHES_PER_UNIT.m;

// Units from CS-Map
_SuperMap2.default.METERS_PER_INCH = 0.02540005080010160020;
_SuperMap2.default.Util.extend(_SuperMap2.default.INCHES_PER_UNIT, {
    "Inch": _SuperMap2.default.INCHES_PER_UNIT.inches,
    "Meter": 1.0 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9001
    "Foot": 0.30480060960121920243 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9003
    "IFoot": 0.30480000000000000000 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9002
    "ClarkeFoot": 0.3047972651151 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9005
    "SearsFoot": 0.30479947153867624624 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9041
    "GoldCoastFoot": 0.30479971018150881758 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9094
    "IInch": 0.02540000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "MicroInch": 0.00002540000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Mil": 0.00000002540000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Centimeter": 0.01000000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Kilometer": 1000.00000000000000000000 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9036
    "Yard": 0.91440182880365760731 / _SuperMap2.default.METERS_PER_INCH,
    "SearsYard": 0.914398414616029 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9040
    "IndianYard": 0.91439853074444079983 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9084
    "IndianYd37": 0.91439523 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9085
    "IndianYd62": 0.9143988 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9086
    "IndianYd75": 0.9143985 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9087
    "IndianFoot": 0.30479951 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9080
    "IndianFt37": 0.30479841 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9081
    "IndianFt62": 0.3047996 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9082
    "IndianFt75": 0.3047995 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9083
    "Mile": 1609.34721869443738887477 / _SuperMap2.default.METERS_PER_INCH,
    "IYard": 0.91440000000000000000 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9096
    "IMile": 1609.34400000000000000000 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9093
    "NautM": 1852.00000000000000000000 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9030
    "Lat-66": 110943.316488932731 / _SuperMap2.default.METERS_PER_INCH,
    "Lat-83": 110946.25736872234125 / _SuperMap2.default.METERS_PER_INCH,
    "Decimeter": 0.10000000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Millimeter": 0.00100000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Dekameter": 10.00000000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Decameter": 10.00000000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "Hectometer": 100.00000000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "GermanMeter": 1.0000135965 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9031
    "CaGrid": 0.999738 / _SuperMap2.default.METERS_PER_INCH,
    "ClarkeChain": 20.1166194976 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9038
    "GunterChain": 20.11684023368047 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9033
    "BenoitChain": 20.116782494375872 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9062
    "SearsChain": 20.11676512155 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9042
    "ClarkeLink": 0.201166194976 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9039
    "GunterLink": 0.2011684023368047 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9034
    "BenoitLink": 0.20116782494375872 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9063
    "SearsLink": 0.2011676512155 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9043
    "Rod": 5.02921005842012 / _SuperMap2.default.METERS_PER_INCH,
    "IntnlChain": 20.1168 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9097
    "IntnlLink": 0.201168 / _SuperMap2.default.METERS_PER_INCH, //EPSG:9098
    "Perch": 5.02921005842012 / _SuperMap2.default.METERS_PER_INCH,
    "Pole": 5.02921005842012 / _SuperMap2.default.METERS_PER_INCH,
    "Furlong": 201.1684023368046 / _SuperMap2.default.METERS_PER_INCH,
    "Rood": 3.778266898 / _SuperMap2.default.METERS_PER_INCH,
    "CapeFoot": 0.3047972615 / _SuperMap2.default.METERS_PER_INCH,
    "Brealey": 375.00000000000000000000 / _SuperMap2.default.METERS_PER_INCH,
    "ModAmFt": 0.304812252984505969011938 / _SuperMap2.default.METERS_PER_INCH,
    "Fathom": 1.8288 / _SuperMap2.default.METERS_PER_INCH,
    "NautM-UK": 1853.184 / _SuperMap2.default.METERS_PER_INCH,
    "50kilometers": 50000.0 / _SuperMap2.default.METERS_PER_INCH,
    "150kilometers": 150000.0 / _SuperMap2.default.METERS_PER_INCH
});

//unit abbreviations supported by PROJ.4
_SuperMap2.default.Util.extend(_SuperMap2.default.INCHES_PER_UNIT, {
    "mm": _SuperMap2.default.INCHES_PER_UNIT["Meter"] / 1000.0,
    "cm": _SuperMap2.default.INCHES_PER_UNIT["Meter"] / 100.0,
    "dm": _SuperMap2.default.INCHES_PER_UNIT["Meter"] * 100.0,
    "km": _SuperMap2.default.INCHES_PER_UNIT["Meter"] * 1000.0,
    "kmi": _SuperMap2.default.INCHES_PER_UNIT["nmi"], //International Nautical Mile
    "fath": _SuperMap2.default.INCHES_PER_UNIT["Fathom"], //International Fathom
    "ch": _SuperMap2.default.INCHES_PER_UNIT["IntnlChain"], //International Chain
    "link": _SuperMap2.default.INCHES_PER_UNIT["IntnlLink"], //International Link
    "us-in": _SuperMap2.default.INCHES_PER_UNIT["inches"], //U.S. Surveyor's Inch
    "us-ft": _SuperMap2.default.INCHES_PER_UNIT["Foot"], //U.S. Surveyor's Foot
    "us-yd": _SuperMap2.default.INCHES_PER_UNIT["Yard"], //U.S. Surveyor's Yard
    "us-ch": _SuperMap2.default.INCHES_PER_UNIT["GunterChain"], //U.S. Surveyor's Chain
    "us-mi": _SuperMap2.default.INCHES_PER_UNIT["Mile"], //U.S. Surveyor's Statute Mile
    "ind-yd": _SuperMap2.default.INCHES_PER_UNIT["IndianYd37"], //Indian Yard
    "ind-ft": _SuperMap2.default.INCHES_PER_UNIT["IndianFt37"], //Indian Foot
    "ind-ch": 20.11669506 / _SuperMap2.default.METERS_PER_INCH //Indian Chain
});

/**
 * @memberOf SuperMap
 * @description 分辨率与比例尺之间转换的常量，默认值96。
 * @type {Object}
 * @default 96
 */
_SuperMap2.default.DOTS_PER_INCH = 96;

/**
 * @param scale - {number}
 * @return {number}
 */
_SuperMap2.default.Util.normalizeScale = function (scale) {
    var normScale = scale > 1.0 ? 1.0 / scale : scale;
    return normScale;
};

/**
 * @param scale - {number} 比例尺。
 * @param units - {string} 比例尺单位。
 * @return {number} 分辨率。
 */
_SuperMap2.default.Util.getResolutionFromScale = function (scale, units) {
    var resolution;
    if (scale) {
        if (units == null) {
            units = "degrees";
        }
        var normScale = _SuperMap2.default.Util.normalizeScale(scale);
        resolution = 1 / (normScale * _SuperMap2.default.INCHES_PER_UNIT[units] * _SuperMap2.default.DOTS_PER_INCH);
    }
    return resolution;
};

/**
 * @description 分辨率转比例尺。
 * @param resolution - {number} 分辨率。
 * @param units - {string} 分辨率单位。
 * @return {number} 比例尺。
 */
_SuperMap2.default.Util.getScaleFromResolution = function (resolution, units) {

    if (units == null) {
        units = "degrees";
    }

    var scale = resolution * _SuperMap2.default.INCHES_PER_UNIT[units] * _SuperMap2.default.DOTS_PER_INCH;
    return scale;
};

/**
 * @memberOf SuperMap
 * @description 如果userAgent捕获到浏览器使用的是Gecko引擎则返回true。
 * @constant
 */
_SuperMap2.default.IS_GECKO = function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") === -1 && ua.indexOf("gecko") !== -1;
}();

/**
 * @memberOf SuperMap
 * @description 浏览器名称，依赖于userAgent属性，BROWSER_NAME可以是空，或者以下浏览器：
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 * @constant
 */
_SuperMap2.default.Browser = function () {
    var name = '',
        version = '',
        device = 'pc',
        uaMatch;
    //以下进行测试
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1) {
        name = 'msie';
        uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
    } else if (ua.indexOf("chrome") > -1) {
        name = 'chrome';
        uaMatch = ua.match(/chrome\/([\d.]+)/);
    } else if (ua.indexOf("firefox") > -1) {
        name = 'firefox';
        uaMatch = ua.match(/firefox\/([\d.]+)/);
    } else if (ua.indexOf("opera") > -1) {
        name = 'opera';
        uaMatch = ua.match(/version\/([\d.]+)/);
    } else if (ua.indexOf("safari") > -1) {
        name = 'safari';
        uaMatch = ua.match(/version\/([\d.]+)/);
    }
    version = uaMatch ? uaMatch[1] : '';

    if (ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("iphone") > -1) {
        device = 'apple';
    } else if (ua.indexOf("android") > -1) {
        uaMatch = ua.match(/version\/([\d.]+)/);
        version = uaMatch ? uaMatch[1] : '';
        device = 'android';
    }
    return { name: name, version: version, device: device };
}();

/**
 * @description 获取浏览器相关信息。支持的浏览器包括：Opera，Internet Explorer，Safari，Firefox。
 * @return {Object} 获取浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
 */
_SuperMap2.default.Util.getBrowser = function () {
    return _SuperMap2.default.Browser;
};

/**
 * @description 浏览器是否支持Canvas。
 * @return {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
_SuperMap2.default.Util.isSupportCanvas = function () {
    var checkRes = true,
        broz = _SuperMap2.default.Util.getBrowser();
    if (document.createElement("canvas").getContext) {
        if (broz.name === 'firefox' && parseFloat(broz.version) < 5) {
            checkRes = false;
        }
        if (broz.name === 'safari' && parseFloat(broz.version) < 4) {
            checkRes = false;
        }
        if (broz.name === 'opera' && parseFloat(broz.version) < 10) {
            checkRes = false;
        }
        if (broz.name === 'msie' && parseFloat(broz.version) < 9) {
            checkRes = false;
        }
    } else {
        checkRes = false;
    }
    return checkRes;
}();

/**
 * @description 判断；浏览器是否支持Canvas。
 * @return {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
_SuperMap2.default.Util.supportCanvas = function () {
    return _SuperMap2.default.Util.isSupportCanvas;
};

//将服务端的地图单位转成SuperMap的地图单位
_SuperMap2.default.INCHES_PER_UNIT["degree"] = _SuperMap2.default.INCHES_PER_UNIT.dd;
_SuperMap2.default.INCHES_PER_UNIT["meter"] = _SuperMap2.default.INCHES_PER_UNIT.m;
_SuperMap2.default.INCHES_PER_UNIT["foot"] = _SuperMap2.default.INCHES_PER_UNIT.ft;
_SuperMap2.default.INCHES_PER_UNIT["inch"] = _SuperMap2.default.INCHES_PER_UNIT.inches;
_SuperMap2.default.INCHES_PER_UNIT["mile"] = _SuperMap2.default.INCHES_PER_UNIT.mi;
_SuperMap2.default.INCHES_PER_UNIT["kilometer"] = _SuperMap2.default.INCHES_PER_UNIT.km;
_SuperMap2.default.INCHES_PER_UNIT["yard"] = _SuperMap2.default.INCHES_PER_UNIT.yd;

/**
 * @description 判断一个 URL 请求是否在当前域中。
 * @param url - {string}  URL 请求字符串。
 * @return {boolean} URL请求是否在当前域中。
 */
_SuperMap2.default.Util.isInTheSameDomain = function (url) {
    if (!url) {
        return true;
    }
    var index = url.indexOf("//");
    var documentUrl = document.location.toString();
    var documentIndex = documentUrl.indexOf("//");
    if (index === -1) {
        return true;
    } else {
        var protocol;
        var substring = protocol = url.substring(0, index);
        var documentSubString = documentUrl.substring(documentIndex + 2);
        documentIndex = documentSubString.indexOf("/");
        var documentPortIndex = documentSubString.indexOf(":");
        var documentDomainWithPort = documentSubString.substring(0, documentIndex);
        var documentPort;

        var documentprotocol = document.location.protocol;
        if (documentPortIndex !== -1) {
            documentPort = +documentSubString.substring(documentPortIndex, documentIndex);
        } else {
            documentDomainWithPort += ':' + (documentprotocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
            return false;
        }
        substring = url.substring(index + 2);
        var portIndex = substring.indexOf(":");
        index = substring.indexOf("/");
        var domainWithPort = substring.substring(0, index);
        var domain;
        if (portIndex !== -1) {
            domain = substring.substring(0, portIndex);
        } else {
            domain = substring.substring(0, index);
            domainWithPort += ':' + (protocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        var documentDomain = document.domain;
        if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
            return true;
        }
    }
    return false;
};

/**
 * @description 计算iServer服务的REST图层的显示分辨率，需要从iServer的REST图层表述中获取viewBounds、viewer、scale、coordUnit、datumAxis 五个参数，来进行计算。
 * @param viewBounds - {SuperMap.Bounds} 地图的参照可视范围，即地图初始化时默认的地图显示范围。
 * @param viewer - {SuperMap.Size} 地图初始化时默认的地图图片的尺寸。
 * @param scale - {number} 地图初始化时默认的显示比例尺。
 * @param coordUnit - {string} 投影坐标系统的地图单位。
 * @param datumAxis - {number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，则系统默认为WGS84参考系的椭球体长半轴6378137。
 * @return {number} 返回图层显示分辨率。
 */
_SuperMap2.default.Util.calculateDpi = function (viewBounds, viewer, scale, coordUnit, datumAxis) {
    //10000 是 0.1毫米与米的转换。DPI的计算公式：Viewer / DPI *  0.0254 * 10000 = ViewBounds * scale ，公式中的10000是为了提高计算结果的精度，以下出现的ratio皆为如此。
    if (!viewBounds || !viewer || !scale) {
        return;
    }
    var ratio = 10000,
        rvbWidth = viewBounds.getWidth(),
        rvbHeight = viewBounds.getHeight(),
        rvWidth = viewer.w,
        rvHeight = viewer.h;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "degrees";
    if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
        var num1 = rvbWidth / rvWidth,
            num2 = rvbHeight / rvHeight,
            resolution = num1 > num2 ? num1 : num2,
            dpi = 0.0254 * ratio / resolution / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
        return dpi;
    } else {
        var resolution = rvbWidth / rvWidth,
            dpi = 0.0254 * ratio / resolution / scale / ratio;
        return dpi;
    }
};

/**
 * @description 将对象转换成 JSON 字符串。
 * @param obj - {Object} 要转换成 JSON 的 Object 对象。
 * @return {string} 返回转换后的 JSON 对象。
 */
_SuperMap2.default.Util.toJSON = function (obj) {
    var objInn = obj;
    if (objInn == null) {
        return null;
    }
    switch (objInn.constructor) {
        case String:
            //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
            objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
            objInn = objInn.replace(/\n/g, "\\n");
            objInn = objInn.replace(/\r/g, "\\r");
            objInn = objInn.replace("<", "&lt;");
            objInn = objInn.replace(">", "&gt;");
            objInn = objInn.replace(/%/g, "%25");
            objInn = objInn.replace(/&/g, "%26");
            return objInn;
        case Array:
            var arr = [];
            for (var i = 0, len = objInn.length; i < len; i++) {
                arr.push(_SuperMap2.default.Util.toJSON(objInn[i]));
            }
            return "[" + arr.join(",") + "]";
        case Number:
            return isFinite(objInn) ? String(objInn) : null;
        case Boolean:
            return String(objInn);
        case Date:
            var dateStr = "{" + "'__type':\"System.DateTime\"," + "'Year':" + objInn.getFullYear() + "," + "'Month':" + (objInn.getMonth() + 1) + "," + "'Day':" + objInn.getDate() + "," + "'Hour':" + objInn.getHours() + "," + "'Minute':" + objInn.getMinutes() + "," + "'Second':" + objInn.getSeconds() + "," + "'Millisecond':" + objInn.getMilliseconds() + "," + "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
            return dateStr;
        default:
            if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
                return objInn.toJSON();
            }
            if ((typeof objInn === 'undefined' ? 'undefined' : _typeof(objInn)) === "object") {
                if (objInn.length) {
                    var arr = [];
                    for (var i = 0, len = objInn.length; i < len; i++) {
                        arr.push(_SuperMap2.default.Util.toJSON(objInn[i]));
                    }return "[" + arr.join(",") + "]";
                }
                var arr = [];
                for (var attr in objInn) {
                    //为解决SuperMap.Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
                    if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME" && attr !== "parent") {
                        arr.push("'" + attr + "':" + _SuperMap2.default.Util.toJSON(objInn[attr]));
                    }
                }

                if (arr.length > 0) {
                    return "{" + arr.join(",") + "}";
                } else {
                    return "{}";
                }
            }
            return objInn.toString();
    }
};

/**
 * @description 根据比例尺和dpi计算屏幕分辨率。
 * @param scale - {number} 比例尺。
 * @param dpi - {number} 图像分辨率，表示每英寸内的像素个数。
 * @param coordUnit - {string} 投影坐标系统的地图单位。
 * @param datumAxis - {number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，则DPI默认按照WGS84参考系的椭球体长半轴6378137来计算。
 * @return {number} 返回当前比例尺下的屏幕分辨率。
 */
_SuperMap2.default.Util.getResolutionFromScaleDpi = function (scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
        ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (scale > 0 && dpi > 0) {
        scale = _SuperMap2.default.Util.normalizeScale(scale);
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            //scale = SuperMap.Util.normalizeScale(scale);
            resolution = 0.0254 * ratio / dpi / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
            return resolution;
        } else {
            resolution = 0.0254 * ratio / dpi / scale / ratio;
            return resolution;
        }
    }
    return -1;
};

/**
 * @description 根据resolution、dpi、coordUnit和datumAxis计算比例尺。
 * @param resolution - {number} 用于计算比例尺的地图分辨率。
 * @param dpi - {number} 图像分辨率，表示每英寸内的像素个数。
 * @param coordUnit - {string} 投影坐标系统的地图单位。
 * @param datumAxis - {number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，则DPI默认按照WGS84参考系的椭球体长半轴6378137来计算。
 * @return {number} 返回当前屏幕分辨率下的比例尺。
 */
_SuperMap2.default.Util.getScaleFromResolutionDpi = function (resolution, dpi, coordUnit, datumAxis) {
    var scale = null,
        ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (resolution > 0 && dpi > 0) {
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            scale = 0.0254 * ratio / dpi / resolution / (Math.PI * 2 * datumAxis / 360) / ratio;
            return scale;
        } else {
            scale = 0.0254 * ratio / dpi / resolution / ratio;
            return scale;
        }
    }
    return -1;
};

/**
 * @description 转换查询结果。
 * @param result - {Object} 查询结果。
 * @return {Object} 转换后的查询结果。
 */
_SuperMap2.default.Util.transformResult = function (result) {
    if (result.responseText && typeof result.responseText === "string") {
        //支持JSON对象的浏览器Firefox 3.1 + ，IE 8 RC1 +
        if (typeof JSON != 'undefined' && JSON.parse) {
            result = JSON.parse(result.responseText);
        } else {
            result = eval("(" + result.responseText + ")");
        }
    }
    return result;
};

/**
 * @description 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
 * @param destination - {Object} 拷贝目标。
 * @param source - {Object} 源对象。
 *
 */
_SuperMap2.default.Util.copyAttributes = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/**
 * @description 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象。
 * @param clip - {Array<string>} 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
 *
 */
_SuperMap2.default.Util.copyAttributesWithClip = function (destination, source, clip) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            //去掉禁止拷贝的属性
            var isInClip = false;
            if (clip && clip.length) {
                for (var i = 0, len = clip.length; i < len; i++) {
                    if (property === clip[i]) {
                        isInClip = true;
                        break;
                    }
                }
            }
            if (isInClip === true) {
                continue;
            }

            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/**
 * @description 克隆一份Object对象
 * @param obj - {Object}  需要克隆的对象。
 * @return {Object} 返回对象的拷贝对象，注意是新的对象，不是指向。
 */
_SuperMap2.default.Util.cloneObject = function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = obj.slice(0);
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = _SuperMap2.default.Util.cloneObject(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

/**
 * @description 判断两条线段是不是有交点。
 * @param a1 - {SuperMap.Geometry.Point}  第一条线段的起始节点。
 * @param a2 - {SuperMap.Geometry.Point}  第一条线段的结束节点。
 * @param b1 - {SuperMap.Geometry.Point}  第二条线段的起始节点。
 * @param b2 - {SuperMap.Geometry.Point}  第二条线段的结束节点。
 * @return {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系。
 */
_SuperMap2.default.Util.lineIntersection = function (a1, a2, b1, b2) {
    var intersectValue = null;
    var k1;
    var k2;
    var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    //ab==0代表两条线断的斜率一样
    if (ab != 0) {
        k1 = b / ab;
        k2 = a / ab;

        if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0) {
            intersectValue = new _SuperMap2.default.Geometry.Point(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
        } else {
            intersectValue = "No Intersection";
        }
    } else {

        if (b == 0 && a == 0) {
            var maxy = Math.max(a1.y, a2.y);
            var miny = Math.min(a1.y, a2.y);
            var maxx = Math.max(a1.x, a2.x);
            var minx = Math.min(a1.x, a2.x);
            if ((b1.y >= miny && b1.y <= maxy || b2.y >= miny && b2.y <= maxy) && b1.x >= minx && b1.x <= maxx || b2.x >= minx && b2.x <= maxx) {
                intersectValue = "Coincident"; //重合
            } else {
                intersectValue = "Parallel"; //平行
            }
        } else {
            intersectValue = "Parallel"; //平行
        }
    }
    return intersectValue;
};

/**
 * @description 获取文本外接矩形宽度与高度。
 * @param style - {SuperMap.Style} 文本样式。
 * @param text - {string} 文本内容。
 * @param element - {Object} DOM元素。
 * @return {Object} 返回裁剪后的宽度，高度信息。
 */
_SuperMap2.default.Util.getTextBounds = function (style, text, element) {
    document.body.appendChild(element);
    element.style.width = 'auto';
    element.style.height = 'auto';
    if (style.fontSize) element.style.fontSize = style.fontSize;
    if (style.fontFamily) element.style.fontFamily = style.fontFamily;
    if (style.fontWeight) element.style.fontWeight = style.fontWeight;
    element.style.position = 'relative';
    element.style.visibility = 'hidden';
    //fix 在某些情况下，element内的文本变成竖起排列，导致宽度计算不正确的bug
    element.style.display = 'inline-block';
    element.innerHTML = text;
    var textWidth = element.clientWidth;
    var textHeight = element.clientHeight;
    document.body.removeChild(element);
    return {
        textWidth: textWidth,
        textHeight: textHeight
    };
};

/***/ }),
/* 9 */
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

var _MapVRenderer = __webpack_require__(21);

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
     * @param options 有两个参数<br>
     *  * dataSet: mapv 的dataSet对象
     *  * options: mapv 绘图风格配置信息
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
     * @function SuperMap.Layer.MapVLayer.prototype.destroy
     * @override
     */


    /**
     * @private
     * @member SuperMap.Layer.MapVLayer.prototype.canvasContext -{CanvasContext}
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
         * @param dataSet - {mapv.DataSet} mapv数据集
         * @param options - {Object} mapv绘图参数
         */

    }, {
        key: 'addData',
        value: function addData(dataSet, options) {
            this.renderer && this.renderer.addData(dataSet, options);
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.
         * @description 设置数据
         * @param dataSet {mapv.DataSet} mapv数据集
         * @param options {Object} mapv绘图参数
         */

    }, {
        key: 'setData',
        value: function setData(dataSet, options) {
            this.renderer && this.renderer.setData(dataSet, options);
        }

        /**
         * @function SuperMap.Layer.MapVLayer.prototype.getData
         * @description 获取数据
         * @return {mapv.DataSet} mapv数据集
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
         *    if(data.id="1"){
         *      return true
         *    }
         *    return false;
         *  }
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
/* 10 */
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

var _AddressMatchService = __webpack_require__(27);

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
     * @description 正向匹配
     * @param params - {SuperMap.GeoCodingParameter} 正向匹配参数
     * @param callback - {function} 回调函数
     * @return {this}
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
         * @description 反向匹配
         * @param params - {SuperMap.GeoDeCodingParameter} 反向匹配参数
         * @param callback - {function} 回调函数
         * @return {this}
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
/* 11 */
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

var _KernelDensityJobsService = __webpack_require__(31);

var _KernelDensityJobsService2 = _interopRequireDefault(_KernelDensityJobsService);

var _SingleObjectQueryJobsService = __webpack_require__(33);

var _SingleObjectQueryJobsService2 = _interopRequireDefault(_SingleObjectQueryJobsService);

var _SummaryMeshJobsService = __webpack_require__(35);

var _SummaryMeshJobsService2 = _interopRequireDefault(_SummaryMeshJobsService);

var _SummaryRegionJobsService = __webpack_require__(37);

var _SummaryRegionJobsService2 = _interopRequireDefault(_SummaryRegionJobsService);

var _VectorClipJobsService = __webpack_require__(39);

var _VectorClipJobsService2 = _interopRequireDefault(_VectorClipJobsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.REST.ProcessingService
 * @classdesc 分布式分析相关服务类。
 * @augments SuperMap.CommonServiceBase
 * @example
 * 用法：
 * new SuperMap.REST.ProcessingService(url,options)
 *    .getKernelDensityJobs(function(result){
 *       //doSomething
 * })
 * @param url -{string} 分布式分析服务地址。
 * @param options - {Object} 可选参数
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
     * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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
         * @return {this}
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

var _TimeControlBase2 = __webpack_require__(26);

var _TimeControlBase3 = _interopRequireDefault(_TimeControlBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.TimeFlowControl
 * @classdesc 时间管理类。
 * @description 此类只负责时间上的控制，具体执行的操作需要用户在初始化时的回调函数内部进行实现。<br>
 *              如设置起始时间为1000，结束时间是2000，步长设置为1，
 *              那么表示按照每次1年（可以通过setSpeed进行修改）的变化从公元1000年开始到公元2000年为止，默认每1秒会1次(通过setFrequency修改)
 * @extends SuperMap.TimeControlBase
 * @param callback - {function} 每次刷新回调函数，必设属性。具体的效果需要用户在此回调函数里面实现。
 * @param options - {Object} 该类开放的可选属性。如：<br>
 *        speed - {number}步长(单位ms)。不能小于0，默认为1（表示每次刷新的数据之间的间隔为1ms）。<br>
 *        frequency -  {number} 刷新频率(单位ms)，默认为1000ms。<br>
 *        startTime - {number}起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。<br>
 *        endTime - {number}结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。<br>
 *        repeat - {boolean} 是否重复循环。默认为true。<br>
 *        reverse - {boolean} 是否反向。默认为false。
 */
var TimeFlowControl = function (_TimeControlBase) {
    _inherits(TimeFlowControl, _TimeControlBase);

    function TimeFlowControl(callback, options) {
        _classCallCheck(this, TimeFlowControl);

        var _this = _possibleConstructorReturn(this, (TimeFlowControl.__proto__ || Object.getPrototypeOf(TimeFlowControl)).call(this, options));

        _this.callback = null;
        _this.CLASS_NAME = "SuperMap.TimeFlowControl";

        var me = _this;

        //先让IE下支持bind方法
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }
                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function fNOP() {
                    //empty Function
                },
                    fBound = function fBound() {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };
                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();
                return fBound;
            };
        }
        //保证 this.tick 的上下文还是 TimeControl 这个对象
        me.update = me.update.bind(me);

        me.oldTime = me.currentTime;
        //记录回调函数
        me.callback = callback;
        return _this;
    }

    /**
     * @function SuperMap.TimeFlowControl.prototype.updateOptions
     * @override
     */


    /**
     * @member SuperMap.TimeFlowControl.prototype.callback -{function}
     * @description 每次刷新执行的回调函数
     */


    _createClass(TimeFlowControl, [{
        key: 'updateOptions',
        value: function updateOptions(options) {
            options = options || {};
            _get(TimeFlowControl.prototype.__proto__ || Object.getPrototypeOf(TimeFlowControl.prototype), 'updateOptions', this).call(this, options);
        }

        /**
         * @function SuperMap.TimeFlowControl.prototype.start
         * @override
         */

    }, {
        key: 'start',
        value: function start() {
            var me = this;
            if (me.running) {
                return;
            }
            me.running = true;
            if (me.reverse) {
                if (me.currentTime === me.startTime) {
                    me.oldTime = me.endTime;
                    me.currentTime = me.oldTime;
                }
            } else {
                if (me.oldTime === me.endTime) {
                    me.currentTime = me.startTime;
                    me.oldTime = me.currentTime;
                }
            }
            me.tick();
        }

        /**
         * @function SuperMap.TimeFlowControl.prototype.stop
         * @override
         */

    }, {
        key: 'stop',
        value: function stop() {
            _get(TimeFlowControl.prototype.__proto__ || Object.getPrototypeOf(TimeFlowControl.prototype), 'stop', this).call(this);
            var me = this;
            me.oldTime = me.currentTime;

            if (me.running) {
                me.running = false;
            }
            //清除定时tick
            me.intervalId && window.clearTimeout(me.intervalId);
        }

        /**
         * @function SuperMap.TimeFlowControl.prototype.destroy
         * @override
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            _get(TimeFlowControl.prototype.__proto__ || Object.getPrototypeOf(TimeFlowControl.prototype), 'destroy', this).call(this);
            var me = this;
            me.oldTime = null;
            me.callback = null;
        }

        /**
         * @function SuperMap.TimeFlowControl.prototype.tick
         * @description 定时刷新
         */

    }, {
        key: 'tick',
        value: function tick() {
            var me = this;
            me.intervalId && window.clearInterval(me.intervalId);
            me.intervalId = null;
            me.intervalId = window.setInterval(me.update, me.frequency);
        }

        /**
         * @function SuperMap.TimeFlowControl.prototype.update
         * @override
         */

    }, {
        key: 'update',
        value: function update() {
            var me = this;

            //判定是否还需要继续
            if (!me.running) {
                return;
            }
            //调用回调函数
            me.callback && me.callback(me.currentTime); //destroy之后callback就为空，所以需要判定一下

            if (!me.reverse) {
                //如果相等，则代表上一帧已经运行到了最后，下一帧运行初始化的状态
                if (me.currentTime === me.endTime) {
                    //不循环时
                    if (!me.repeat) {
                        me.running = false;
                        me.stop();
                        return null;
                    }
                    me.stop();
                    me.currentTime = me.startTime;
                    me.oldTime = me.currentTime;
                    me.start();
                }
                //否则时间递增
                else {
                        me.oldTime = me.currentTime;
                        me.currentTime += me.speed;
                    }

                if (me.currentTime >= me.endTime) {
                    me.currentTime = me.endTime;
                }
            } else {
                //如果相等，则代表上一帧已经运行到了最前，下一帧运行结束的状态
                if (me.currentTime === me.startTime) {
                    //不循环时
                    if (!me.repeat) {
                        me.running = false;
                        return null;
                    }

                    me.oldTime = me.endTime;
                    me.currentTime = me.oldTime;
                }
                //否则时间递减
                else {
                        me.currentTime = me.oldTime;
                        me.oldTime -= me.speed;
                    }

                if (me.oldTime <= me.startTime) {
                    me.oldTime = me.startTime;
                }
            }
        }
    }]);

    return TimeFlowControl;
}(_TimeControlBase3.default);

exports.default = TimeFlowControl;


_SuperMap2.default.TimeFlowControl = TimeFlowControl;

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

var _elasticsearch = __webpack_require__(45);

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.ElasticSearch
 * @classdesc ElasticSearch服务类。
 * @param url - {string} ElasticSearch服务地址。
 * @param options - {Object} 可选参数。如:</br>
 *         change - {function} 服务器返回数据后执行的函数。</br>
 *         openGeoFence - {boolean} 是否开启地理围栏验证，默认为不开启。</br>
 *         outOfGeoFence - {function} 数据超出地理围栏后执行的函数。</br>
 *         geoFence - {Object} 地理围栏。</br>
 */

var ElasticSearch = function () {

    /**
     * @member SuperMap.ElasticSearch.prototype.events -{SuperMap.Events}
     * @description 事件
     */


    /**
     * @member SuperMap.ElasticSearch.prototype.geoFence -{Object}
     * @description 地理围栏
     * @example {
     *    radius: 1000,//单位是m
     *    center: [104.40, 30.43],
     *    unit: 'meter|degree'
     *  }
     */

    /**
     *  @member SuperMap.ElasticSearch.prototype.openGeoFence -{boolean}
     *  @description 是否开启地理围栏验证，默认为不开启。
     */

    /**
     *  @member SuperMap.ElasticSearch.prototype.client -{Object}
     *  @description client ES客户端
     */
    function ElasticSearch(url, options) {
        _classCallCheck(this, ElasticSearch);

        this.url = null;
        this.client = null;
        this.change = null;
        this.openGeoFence = false;
        this.outOfGeoFence = null;
        this.geoFence = null;
        this.EVENT_TYPES = ['change', 'error', 'outOfGeoFence'];
        this.events = null;
        this.eventListeners = null;

        options = options || {};
        var me = this;
        me.url = url;
        me.client = new _elasticsearch2.default.Client({
            host: me.url
        });
        me.change = options.change;
        me.geoFence = options.geoFence;
        me.openGeoFence = options.openGeoFence;
        me.outOfGeoFence = options.outOfGeoFence;
        me.events = new _SuperMap2.default.Events(me, null, me.EVENT_TYPES);
        me.eventListeners = options.eventListeners;
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.setGeoFence
     * @description 设置地理围栏，openGeoFence参数为true的时候，设置的地理围栏才生效。
     * @param geoFence - {SuperMap.Geometry} 地理围栏。
     */

    /**
     * @member SuperMap.ElasticSearch.prototype.eventListeners -{Object}
     * @description 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */


    /*
     * Constant: EVENT_TYPES
     * {Array<String>}
     * 此类支持的事件类型。
     *
     */

    /**
     *  @member SuperMap.ElasticSearch.prototype.outOfGeoFence -{function}
     *  @description 数据超出地理围栏后执行的函数
     */

    /**
     *  @member SuperMap.ElasticSearch.prototype.change -{function}
     *  @description 服务器返回数据后执行的函数
     */

    /**
     *  @member SuperMap.ElasticSearch.prototype.url -{string}
     *  @description ElasticSearch服务地址
     */


    _createClass(ElasticSearch, [{
        key: 'setGeoFence',
        value: function setGeoFence(geoFence) {
            this.geoFence = geoFence;
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.bulk
         * @description 批量操作API，允许执行多个索引/删除操作。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-bulk</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'bulk',
        value: function bulk(params, callback) {
            return this.client.bulk(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.clearScroll
         * @description 通过指定scroll参数进行查询来清除已经创建的scroll请求。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-clearscroll</br>
         *更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'clearScroll',
        value: function clearScroll(params, callback) {
            return this.client.clearScroll(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.count
         * @description 获取集群、索引、类型或查询的文档个数。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-count</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'count',
        value: function count(params, callback) {
            return this.client.count(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.count
         * @description 在特定索引中添加一个类型化的JSON文档，使其可搜索。如果具有相同index，type且id已经存在的文档将发生错误。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-create</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'create',
        value: function create(params, callback) {
            return this.client.create(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.delete
         * @description 根据其ID从特定索引中删除键入的JSON文档。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-delete</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'delete',
        value: function _delete(params, callback) {
            return this.client.delete(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.delete
         * @description 根据其ID从特定索引中删除键入的JSON文档。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletebyquery</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'deleteByQuery',
        value: function deleteByQuery(params, callback) {
            return this.client.deleteByQuery(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.delete
         * @description 根据其ID删除脚本。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletescript</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'deleteScript',
        value: function deleteScript(params, callback) {
            return this.client.deleteScript(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.deleteTemplate
         * @description 根据其ID删除模板。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletetemplate</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'deleteTemplate',
        value: function deleteTemplate(params, callback) {
            return this.client.deleteTemplate(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.exists
         * @description 检查给定文档是否存在。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-exists</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'exists',
        value: function exists(params, callback) {
            return this.client.exists(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.existsSource
         * @description 检查资源是否存在。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-existssource</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'existsSource',
        value: function existsSource(params, callback) {
            return this.client.existsSource(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.explain
         * @description 提供与特定查询相关的特定文档分数的详细信息。它还会告诉您文档是否与指定的查询匹配。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-explain</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-explain.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'explain',
        value: function explain(params, callback) {
            return this.client.explain(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.fieldCaps
         * @description 允许检索多个索引之间的字段的功能。(实验性API，可能会在未来版本中删除)</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-fieldcaps</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-field-caps.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'fieldCaps',
        value: function fieldCaps(params, callback) {
            return this.client.fieldCaps(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.get
         * @description 从索引获取一个基于其id的类型的JSON文档。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'get',
        value: function get(params, callback) {
            return this.client.get(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.getScript
         * @description 获取脚本。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getscript</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'getScript',
        value: function getScript(params, callback) {
            return this.client.getScript(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.getSource
         * @description 通过索引，类型和ID获取文档的源。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getsource</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'getSource',
        value: function getSource(params, callback) {
            return this.client.getSource(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.getTemplate
         * @description 获取模板。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-gettemplate</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'getTemplate',
        value: function getTemplate(params, callback) {
            return this.client.getTemplate(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.index
         * @description 在索引中存储一个键入的JSON文档，使其可搜索。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-index</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'index',
        value: function index(params, callback) {
            return this.client.index(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.info
         * @description 从当前集群获取基本信息。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-info</br>
         * 更多信息参考 https://www.elastic.co/guide/index.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'info',
        value: function info(params, callback) {
            return this.client.info(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.mget
         * @description 根据索引，类型（可选）和ids来获取多个文档。mget所需的主体可以采用两种形式：文档位置数组或文档ID数组。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mget</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'mget',
        value: function mget(params, callback) {
            return this.client.mget(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.msearch
         * @description 在同一请求中执行多个搜索请求。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearch</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'msearch',
        value: function msearch(params, callback) {
            var me = this;
            if (me.openGeoFence) {
                return me.client.msearch(params, callback).then(function (resp) {
                    me._update(resp.responses);
                }, function (err) {
                    me.events.triggerEvent('error', { error: err });
                });
            }
            return me.client.msearch(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.msearchTemplate
         * @description 在同一请求中执行多个搜索模板请求。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearchtemplate</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'msearchTemplate',
        value: function msearchTemplate(params, callback) {
            return this.client.msearchTemplate(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.mtermvectors
         * @description 多termvectors API允许一次获得多个termvectors。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mtermvectors</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-termvectors.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'mtermvectors',
        value: function mtermvectors(params, callback) {
            return this.client.mtermvectors(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.ping
         * @description 测试连接。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-ping</br>
         * 更多信息参考 https://www.elastic.co/guide/index.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'ping',
        value: function ping(params, callback) {
            return this.client.ping(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.putScript
         * @description 添加脚本。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-putscript</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'putScript',
        value: function putScript(params, callback) {
            return this.client.putScript(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.putTemplate
         * @description 添加模板。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-puttemplate</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'putTemplate',
        value: function putTemplate(params, callback) {
            return this.client.putTemplate(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.reindex
         * @description 重新索引。</br>
         * 参数设置参考 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindex</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'reindex',
        value: function reindex(params, callback) {
            return this.client.reindex(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.reindexRessrottle
         * @description 重新索引。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindexrethrottle</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'reindexRessrottle',
        value: function reindexRessrottle(params, callback) {
            return this.client.reindexRessrottle(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.renderSearchTemplate
         * @description 搜索模板。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-rendersearchtemplate</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'renderSearchTemplate',
        value: function renderSearchTemplate(params, callback) {
            return this.client.renderSearchTemplate(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.scroll
         * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'scroll',
        value: function scroll(params, callback) {
            return this.client.scroll(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.search
         * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'search',
        value: function search(params, callback) {
            var me = this;
            if (me.openGeoFence) {
                return me.client.search(params, callback).then(function (resp) {
                    me._update(resp.responses);
                }, function (err) {
                    me.events.triggerEvent('error', { error: err });
                });
            }
            return me.client.search(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.searchShards
         * @description  返回要执行搜索请求的索引和分片。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchshards</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-shards.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'searchShards',
        value: function searchShards(params, callback) {
            return this.client.searchShards(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.searchTemplate
         * @description  搜索模板。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchtemplate</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'searchTemplate',
        value: function searchTemplate(params, callback) {
            return this.client.searchTemplate(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.suggest
         * @description 该建议功能通过使用特定的建议者，基于所提供的文本来建议类似的术语。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-suggest</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'suggest',
        value: function suggest(params, callback) {
            return this.client.suggest(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.termvectors
         * @description 返回有关特定文档字段中的术语的信息和统计信息。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-termvectors</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'termvectors',
        value: function termvectors(params, callback) {
            return this.client.termvectors(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.update
         * @description 更新文档的部分。</br>
         * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-update</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'update',
        value: function update(params, callback) {
            return this.client.update(params, callback);
        }

        /**
         * @function  SuperMap.ElasticSearch.prototype.update
         * @description 通过查询API来更新文档。</br>
         * 参数设置参考 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-updatebyquery</br>
         * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html</br>
         * @param params - {Object} 参数。
         * @param callback - {function} 回调函数。
         */

    }, {
        key: 'updateByQuery',
        value: function updateByQuery(params, callback) {
            return this.client.updateByQuery(params, callback);
        }
    }, {
        key: '_update',
        value: function _update(data) {
            var me = this;
            if (!data) {
                return;
            }
            me.data = data;
            if (me.geoFence) {
                me._validateDatas(data);
            }
            me.events.triggerEvent('change', { data: me.data });
            me.change && me.change(data);
        }
    }, {
        key: '_validateDatas',
        value: function _validateDatas(datas) {
            if (!datas) {
                return;
            }
            if (!(datas instanceof Array)) {
                datas = [datas];
            }
            var i,
                len = datas.length;
            for (i = 0; i < len; i++) {
                this._validateData(datas[i]);
            }
        }
    }, {
        key: '_validateData',
        value: function _validateData(data) {
            var me = this;
            data.hits.hits.map(function (source) {
                var content = source._source;
                var meterUnit = me._getMeterPerMapUnit(me.geoFence.unit);
                var geoFenceCX = me.geoFence.center[0] * meterUnit;
                var geoFenceCY = me.geoFence.center[1] * meterUnit;
                var contentX = content.x * meterUnit;
                var contentY = content.y * meterUnit;
                var distance = me._distance(contentX, contentY, geoFenceCX, geoFenceCY);
                var radius = me.geoFence.radius;
                if (distance > radius) {
                    me.outOfGeoFence && me.outOfGeoFence(data);
                    me.events.triggerEvent('outOfGeoFence', { data: data });
                }
            });
        }
    }, {
        key: '_distance',
        value: function _distance(x1, y1, x2, y2) {
            return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        }
    }, {
        key: '_getMeterPerMapUnit',
        value: function _getMeterPerMapUnit(mapUnit) {
            var earchRadiusInMeters = 6378137;
            var meterPerMapUnit = void 0;
            if (mapUnit === 'meter') {
                meterPerMapUnit = 1;
            } else if (mapUnit === 'degree') {
                // 每度表示多少米。
                meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
            }
            return meterPerMapUnit;
        }
    }]);

    return ElasticSearch;
}();

exports.default = ElasticSearch;

_SuperMap2.default.ElasticSearch = ElasticSearch;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined") {
    win = self;
} else {
    win = {};
}

module.exports = win;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(19);
var global = __webpack_require__(15);
exports.setImmediate = global.setImmediate;
exports.clearImmediate = global.clearImmediate;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }
})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16).setImmediate))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(17)))

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SuperMap = __webpack_require__(3);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _mapv = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SuperMap.MapVRenderer
 * @classdesc MapV渲染器。
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
/* 22 */
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
 * @class SuperMap.Credential
 * @classdesc SuperMap的安全证书类，其中包括token等安全验证信息。<br>
 * 需要使用用户名和密码在："http://localhost:8090/iserver/services/security/tokens"下申请value <br>
 * 获得形如："2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ.."的value<br>
 * 目前支持的功能包括：地图服务、专题图、量算、查询、公交换乘、空间分析、网络分析，不支持轮询功能。
 * @param value - {string}  访问受安全限制的服务时用于通过安全认证的验证信息。
 * @param name - {string}  验证信息前缀，name=value部分的name部分，默认为“token”。
 * @example
 * var pixcel = new SuperMap.Credential("valueString","token");
 * pixcel.destroy();
 */
var Credential = function () {

  /**
   * @member SuperMap.Bounds.prototype.name -{string}
   * @description 验证信息前缀，name=value部分的name部分，默认为“token”。
   */
  function Credential(value, name) {
    _classCallCheck(this, Credential);

    this.value = "";
    this.name = "token";
    this.CLASS_NAME = "SuperMap.Credential";

    this.value = value ? value : this.value;
    this.name = name ? name : this.name;
  }

  /**
   * @function SuperMap.Credential.prototype.getUrlParameters
   * @example
   * var credential = new SuperMap.Credential("valueString","token");
   * //这里 str = "token=valueString";
   * var str = credential.getUrlParameters();
   * @returns {string} 返回安全信息组成的url片段。
   */

  /**
   * @member SuperMap.Credential.CREDENTIAL -{SuperMap.Credential}
   * @description 这个对象保存一个安全类的实例，在服务端需要安全验证的时候必须进行设置。
   * @constant
   * @example
   * 代码实例:
   *  // 当iServer启用服务安全的时候，下边的代码是必须的。安全证书类能够接收一个value和一个name参数。
   *  var value = "(以iServer为例，这里是申请的token值)";
   *  var name = "token";
   *  // 默认name参数为token，所以当使用iServer服务的时候可以不进行设置。
   *  SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(value, name);
   *
   */

  /**
   * @member SuperMap.Bounds.prototype.value -{string}
   * @description 访问受安全限制的服务时用于通过安全认证的验证信息。
   */


  _createClass(Credential, [{
    key: "getUrlParameters",
    value: function getUrlParameters() {
      //当需要其他安全信息的时候，则需要return this.name + "=" + this.value + "&" + "...";的形式添加。
      return this.name + "=" + this.value;
    }

    /**
     * @function SuperMap.Bounds.prototype.getValue
     * @description 获取value
     * @example
     * var credential = new SuperMap.Credential("2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..","token");
     * //这里 str = "2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..";
     * var str = credential.getValue();
     * @returns {string} 返回value字符串，在iServer服务下该value值即为token值。
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }

    /**
     *
     * @function SuperMap.Credential.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为null，而不是初始值。
     * @example
     * var credential = new SuperMap.Credential("valueString","token");
     * credential.destroy();
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.value = null;
      this.name = null;
    }
  }]);

  return Credential;
}();

Credential.CREDENTIAL = null;
exports.default = Credential;

_SuperMap2.default.Credential = Credential;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Event = undefined;

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _Util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name Event
 * @memberOf SuperMap
 * @namespace
 * @description 事件处理函数.
 */
var Event = exports.Event = _SuperMap2.default.Event = {

    /**
     * @description  A hashtable cache of the event observers. Keyed by element._eventCacheID
     * @type {Boolean}
     * @default false
     */
    observers: false,

    /**
     * @description KEY_SPACE
     * @type {number}
     * @default 32
     */
    KEY_SPACE: 32,

    /**
     * @description KEY_BACKSPACE
     * @type {number}
     * @default 8
     */
    KEY_BACKSPACE: 8,

    /**
     * @description KEY_TAB
     * @type {number}
     * @default 9
     */
    KEY_TAB: 9,

    /**
     * @description KEY_RETURN
     * @type {number}
     * @default 13
     */
    KEY_RETURN: 13,

    /**
     * @description KEY_ESC
     * @type {number}
     * @default 27
     */
    KEY_ESC: 27,

    /**
     * @description KEY_LEFT
     * @type {number}
     * @default 37
     */
    KEY_LEFT: 37,

    /**
     * @description KEY_UP
     * @type {number}
     * @default 38
     */
    KEY_UP: 38,

    /**
     * @description KEY_RIGHT
     * @type {number}
     * @default 39
     */
    KEY_RIGHT: 39,

    /**
     * @description KEY_DOWN
     * @type {number}
     * @default 40
     */
    KEY_DOWN: 40,

    /**
     * @description KEY_DELETE
     * @type {number}
     * @default 46
     */
    KEY_DELETE: 46,

    /**
     * @description Cross browser event element detection.
     * @param event - {Event}
     * @returns {HTMLElement} The element that caused the event
     */
    element: function element(event) {
        return event.target || event.srcElement;
    },

    /**
     * @description Determine whether event was caused by a single touch
     * @param event - {Event}
     * @returns {Boolean}
     */
    isSingleTouch: function isSingleTouch(event) {
        return event.touches && event.touches.length === 1;
    },

    /**
     * @description Determine whether event was caused by a multi touch
     * @param event - {Event}
     * @returns {Boolean}
     */
    isMultiTouch: function isMultiTouch(event) {
        return event.touches && event.touches.length > 1;
    },

    /**
     * @description Determine whether event was caused by a left click.
     * @param event - {Event}
     * @returns {Boolean}
     */
    isLeftClick: function isLeftClick(event) {
        return event.which && event.which === 1 || event.button && event.button === 1;
    },

    /**
     * @description Determine whether event was caused by a right mouse click.
     * @param event - {Event}
     * @returns {Boolean}
     */
    isRightClick: function isRightClick(event) {
        return event.which && event.which === 3 || event.button && event.button === 2;
    },

    /**
     * @description Stops an event from propagating.
     * @param event - {Event}
     * @param allowDefault - {Boolean} If true, we stop the event chain but still allow the default browser  behaviour (text selection, radio-button clicking, etc) Default false
     */
    stop: function stop(event, allowDefault) {

        if (!allowDefault) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }

        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /**
     * @param event - {Event}
     * @param tagName - {string} html标签名
     * @returns {HTMLElement} The first node with the given tagName, starting from the node the event was triggered on and traversing the DOM upwards
     */
    findElement: function findElement(event, tagName) {
        var element = _SuperMap2.default.Event.element(event);
        while (element.parentNode && (!element.tagName || element.tagName.toUpperCase() != tagName.toUpperCase())) {
            element = element.parentNode;
        }
        return element;
    },

    /**
     * @description 监听事件，注册事件处理方法。
     * @param elementParam - {HTMLElement | string} 待监听的DOM对象或者其id标识。
     * @param name - {string} 监听事件的类别名称。
     * @param observer - {function} 注册的事件处理方法。
     * @param useCapture - {Boolean} 是否捕获。
     */
    observe: function observe(elementParam, name, observer, useCapture) {
        var element = _Util.Util.getElement(elementParam);
        useCapture = useCapture || false;

        if (name === 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
            name = 'keydown';
        }

        //if observers cache has not yet been created, create it
        if (!this.observers) {
            this.observers = {};
        }

        //if not already assigned, make a new unique cache ID
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix;
            }
            element._eventCacheID = _Util.Util.createUniqueID(idPrefix);
        }

        var cacheID = element._eventCacheID;

        //if there is not yet a hash entry for this element, add one
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = [];
        }

        //add a new observer to this element's list
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });

        //add the actual browser event listener
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer);
        }
    },

    /**
     * @description Given the id of an element to stop observing, cycle through the
     *   element's cached observers, calling stopObserving on each one,
     *   skipping those entries which can no longer be removed.
     *
     * @param elementParam - {HTMLElement | string}
     */
    stopObservingElement: function stopObservingElement(elementParam) {
        var element = _Util.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;

        this._removeElementObservers(_SuperMap2.default.Event.observers[cacheID]);
    },

    /*
     * @param elementObservers - {Array<Object>} Array of (element, name,
     *                                         observer, usecapture) objects,
     *                                         taken directly from hashtable
     */
    _removeElementObservers: function _removeElementObservers(elementObservers) {
        if (elementObservers) {
            for (var i = elementObservers.length - 1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
                var removed = _SuperMap2.default.Event.stopObserving.apply(this, args);
            }
        }
    },

    /**
     * @description 移除事件监听和注册的事件处理方法。注意：事件的移除和监听相对应，移除时的各属性信息必须监听时
     * 保持一致才能确保事件移除成功。
     * @param elementParam - {HTMLElement | string} 被监听的DOM元素或者其id。
     * @param name - {string} 需要移除的被监听事件名称。
     * @param observer - {function} 需要移除的事件处理方法。
     * @param useCapture - {Boolean} 是否捕获。
     * @returns {Boolean} Whether or not the event observer was removed
     */
    stopObserving: function stopObserving(elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;

        var element = _Util.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;

        if (name === 'keypress') {
            if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
                name = 'keydown';
            }
        }

        // find element's entry in this.observers cache and remove it
        var foundEntry = false;
        var elementObservers = _SuperMap2.default.Event.observers[cacheID];
        if (elementObservers) {

            // find the specific event type in the element's list
            var i = 0;
            while (!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];

                if (cacheEntry.name === name && cacheEntry.observer === observer && cacheEntry.useCapture === useCapture) {

                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete _SuperMap2.default.Event.observers[cacheID];
                    }
                    foundEntry = true;
                    break;
                }
                i++;
            }
        }

        //actually remove the event listener from browser
        if (foundEntry) {
            if (element.removeEventListener) {
                element.removeEventListener(name, observer, useCapture);
            } else if (element && element.detachEvent) {
                element.detachEvent('on' + name, observer);
            }
        }
        return foundEntry;
    },

    /**
     * @description Cycle through all the element entries in the events cache and call
     *   stopObservingElement on each.
     */
    unloadCache: function unloadCache() {
        // check for SuperMap.Event before checking for observers, because
        // SuperMap.Event may be undefined in IE if no map instance was
        // created
        if (_SuperMap2.default.Event && _SuperMap2.default.Event.observers) {
            for (var cacheID in _SuperMap2.default.Event.observers) {
                var elementObservers = _SuperMap2.default.Event.observers[cacheID];
                _SuperMap2.default.Event._removeElementObservers.apply(this, [elementObservers]);
            }
            _SuperMap2.default.Event.observers = false;
        }
    },

    CLASS_NAME: "SuperMap.Event"
};
_SuperMap2.default.Event = Event;
/* prevent memory leaks in IE */
_SuperMap2.default.Event.observe(window, 'unload', _SuperMap2.default.Event.unloadCache, false);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _Pixel = __webpack_require__(25);

var _Pixel2 = _interopRequireDefault(_Pixel);

var _Event = __webpack_require__(23);

var _BaseTypes = __webpack_require__(7);

var _Util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.Events
 * @classdesc 事件类。
 * @param object - {Object} 当前事件对象被添加到的JS对象。
 * @param element - {HTMLElement} 响应浏览器事件的dom元素。
 * @param eventTypes - {Array<string>} 自定义应用事件的数组。
 * @param fallThrough - {boolean} 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡。
 * @param options - {Object} 事件对象选项。
 */
var Events = function () {

    /**
     * @member SuperMap.Events.prototype.extensionCount - {Object}
     */


    /**
     * @member SuperMap.Events.prototype.includeXY -{boolean}
     * @description 判断是否让xy属性自动创建到浏览器上的鼠标事件，一般设置为false，如果设置为true，鼠标事件将会在事件传递过程中自动产生xy属性。
     *                可根据事件对象的'evt.object'属性在相关的事件句柄上调用getMousePosition函数。这个选项习惯默认为false的原因在于，当创建一个
     *                事件对象，其主要目的是管理。在一个div的相对定位的鼠标事件,将其设为true也是有意义的。这个选项也可以用来控制是否抵消缓存。如果
     *                设为false不抵消，如果设为true，用this.clearMouseCache() 清除缓存偏移（边界元素偏移，元素在页面的位置偏移）。
     * @example
     *  function named(evt) {
     *        this.xy = this.object.events.getMousePosition(evt);
     *  }
     */


    /**
     * @member SuperMap.Events.prototype.eventHandler -{function}
     * @description 绑定在元素上的事件处理器对象。
     */


    /**
     * @member SuperMap.Events.prototype.element  -{HTMLElement}
     * @description 接受浏览器事件的DOM节点。
     */


    /**
     * @member SuperMap.Events.prototype.listeners -{Object}
     * @description Hashtable of Array(function): events listener functions
     */
    function Events(object, element, eventTypes, fallThrough, options) {
        _classCallCheck(this, Events);

        this.BROWSER_EVENTS = ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup", "MSGestureStart", "MSGestureChange", "MSGestureEnd", "contextmenu"];
        this.listeners = null;
        this.object = null;
        this.element = null;
        this.eventTypes = null;
        this.eventHandler = null;
        this.fallThrough = null;
        this.includeXY = false;
        this.extensions = null;
        this.extensionCount = null;
        this.clearMouseListener = null;
        this.CLASS_NAME = "SuperMap.Events";

        _Util.Util.extend(this, options);
        this.object = object;
        this.fallThrough = fallThrough;
        this.listeners = {};
        this.extensions = {};
        this.extensionCount = {};

        this.eventTypes = [];
        if (eventTypes != null) {
            for (var i = 0, len = eventTypes.length; i < len; i++) {
                this.addEventType(eventTypes[i]);
            }
        }

        if (element != null) {
            this.attachToElement(element);
        }
    }

    /**
     * @function SuperMap.Events.prototype.destroy
     * @description 移除当前要素element上的所有事件监听和处理。
     */

    /**
     * @member SuperMap.Events.prototype.clearMouseListener - {Object}
     */


    /**
     * @member SuperMap.Events.prototype.extensions - {Object}
     * @description 事件扩展。Keys代表事件类型，values代表事件对象。
     * @example
     * 以扩展"foostart" 和 "fooend" 事件为例。展示替换css属性为foo的元素的click事件。
     *
     *   SuperMap.Events.foostart = SuperMap.Class({
     *       initialize: function(target) {
     *           this.target = target;
     *           this.target.register("click", this, this.doStuff, {extension: true});
     *           // only required if extension provides more than one event type
     *           this.target.extensions["foostart"] = true;
     *           this.target.extensions["fooend"] = true;
     *       },
     *       destroy: function() {
     *           var target = this.target;
     *           target.unregister("click", this, this.doStuff);
     *           delete this.target;
     *           // only required if extension provides more than one event type
     *           delete target.extensions["foostart"];
     *           delete target.extensions["fooend"];
     *       },
     *       doStuff: function(evt) {
     *           var propagate = true;
     *           if (SuperMap.Event.element(evt).className === "foo") {
     *               propagate = false;
     *               var target = this.target;
     *               target.triggerEvent("foostart");
     *               window.setTimeout(function() {
     *                   target.triggerEvent("fooend");
     *               }, 1000);
     *           }
     *           return propagate;
     *       }
     *   });
     *   // only required if extension provides more than one event type
     *   SuperMap.Events.fooend = SuperMap.Events.foostart;
     */


    /**
     * @member SuperMap.Events.prototype.fallThrough -{boolean}
     * @description 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡。
     */


    /**
     * @member SuperMap.Events.prototype.eventTypes  -{Array<string>}
     * @description 支持的事件类型列表。
     */


    /**
     * @member SuperMap.Events.prototype.object  -{Object}
     * @description  发布应用程序事件的对象。
     */


    /**
     * @member SuperMap.Events.prototype.BROWSER_EVENTS -{Array<string>}
     * @description 支持的事件。
     * @constant
     * @default [
     "mouseover", "mouseout","mousedown", "mouseup", "mousemove",
     "click", "dblclick", "rightclick", "dblrightclick","resize",
     "focus", "blur","touchstart", "touchmove", "touchend","keydown",
     "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
     "MSGestureStart", "MSGestureChange", "MSGestureEnd","contextmenu"
     ]
     */


    _createClass(Events, [{
        key: 'destroy',
        value: function destroy() {
            for (var e in this.extensions) {
                if (typeof this.extensions[e] !== "boolean") {
                    this.extensions[e].destroy();
                }
            }
            this.extensions = null;
            if (this.element) {
                _Event.Event.stopObservingElement(this.element);
                if (this.element.hasScrollEvent) {
                    _Event.Event.stopObserving(window, "scroll", this.clearMouseListener);
                }
            }
            this.element = null;

            this.listeners = null;
            this.object = null;
            this.eventTypes = null;
            this.fallThrough = null;
            this.eventHandler = null;
        }

        /**
         * @function SuperMap.Events.prototype.addEventType
         * @description 在此事件对象中添加新的事件类型，如果这个事件类型已经添加过了，则不做任何事情。
         * @param eventName - {string} 事件名。
         */

    }, {
        key: 'addEventType',
        value: function addEventType(eventName) {
            if (!this.listeners[eventName]) {
                this.eventTypes.push(eventName);
                this.listeners[eventName] = [];
            }
        }

        /**
         * @function SuperMap.Events.prototype.attachToElement
         * @description 给dom元素绑定浏览器事件。
         * @param element - {HTMLDOMElement} 绑定浏览器事件的dom元素。
         */

    }, {
        key: 'attachToElement',
        value: function attachToElement(element) {
            if (this.element) {
                _Event.Event.stopObservingElement(this.element);
            } else {
                // keep a bound copy of handleBrowserEvent() so that we can
                // pass the same function to both Event.observe() and .stopObserving()
                this.eventHandler = _BaseTypes.FunctionExt.bindAsEventListener(this.handleBrowserEvent, this);

                // to be used with observe and stopObserving
                this.clearMouseListener = _BaseTypes.FunctionExt.bind(this.clearMouseCache, this);
            }
            this.element = element;
            for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
                var eventType = this.BROWSER_EVENTS[i];

                // every browser event has a corresponding application event
                // (whether it's listened for or not).
                this.addEventType(eventType);

                // use Prototype to register the event cross-browser
                _Event.Event.observe(element, eventType, this.eventHandler);
            }
            // disable dragstart in IE so that mousedown/move/up works normally
            _Event.Event.observe(element, "dragstart", _Event.Event.stop);
        }

        /**
         * @function SuperMap.Events.prototype.on
         * @description 在一个相同的范围内注册监听器的方法，此方法调用register函数。
         * @example
         * // 注册一个"loadstart"监听事件
         * events.on({"loadstart": loadStartListener});
         *
         * // 同样注册一个"loadstart"监听事件
         * events.register("loadstart", undefined, loadStartListener);
         *
         * // 同时为对象注册多个监听事件
         * events.on({
         *     "loadstart": loadStartListener,
         *     "loadend": loadEndListener,
         *     scope: object
         * });
         *
         * // 同时为对象注册多个监听事件，多次调用register方法
         * events.register("loadstart", object, loadStartListener);
         * events.register("loadend", object, loadEndListener);
         *
         *
         * @param  object - {Object} 添加监听的对象。
         */

    }, {
        key: 'on',
        value: function on(object) {
            for (var type in object) {
                if (type !== "scope" && object.hasOwnProperty(type)) {
                    this.register(type, object.scope, object[type]);
                }
            }
        }

        /**
         * @function SuperMap.Events.prototype.register
         * @description 在事件对象上注册一个事件。当事件被触发时，'func'函数被调用，假设我们触发一个事件，
         *                指定SuperMap.Bounds作为‘obj’,当事件被触发时，回调函数的上下文作为Bounds对象。
         * @param type - {string} 事件注册者的名字。
         * @param obj - {Object} 对象绑定的回调。如果没有特定的对象，则默认是事件的object属性。
         * @param func - {function} 回调函数，如果没有特定的回调，则这个函数不做任何事情。
         * @param priority - {boolean|Object} 当为true时将新的监听加在事件队列的前面。
         */

    }, {
        key: 'register',
        value: function register(type, obj, func, priority) {
            if (type in Events && !this.extensions[type]) {
                this.extensions[type] = new Events[type](this);
            }
            if (func != null && _Util.Util.indexOf(this.eventTypes, type) !== -1) {

                if (obj == null) {
                    obj = this.object;
                }
                var listeners = this.listeners[type];
                if (!listeners) {
                    listeners = [];
                    this.listeners[type] = listeners;
                    this.extensionCount[type] = 0;
                }
                var listener = { obj: obj, func: func };
                if (priority) {
                    listeners.splice(this.extensionCount[type], 0, listener);
                    if ((typeof priority === 'undefined' ? 'undefined' : _typeof(priority)) === "object" && priority.extension) {
                        this.extensionCount[type]++;
                    }
                } else {
                    listeners.push(listener);
                }
            }
        }

        /**
         * @function SuperMap.Events.prototype.registerPriority
         * @description 相同的注册方法，但是在前面增加新的监听者事件查询而代替到方法的结束。
         * @param type - {string} 事件注册者的名字。
         * @param obj - {Object} 对象绑定方面的回调。如果没有特定的对象，则默认是事件的object属性。
         * @param func - {function} 回调函数，如果没有特定的回调，则这个函数不做任何事情。
         */

    }, {
        key: 'registerPriority',
        value: function registerPriority(type, obj, func) {
            this.register(type, obj, func, true);
        }

        /**
         * @function SuperMap.Events.prototype.un
         * @description 在一个相同的范围内取消注册监听器的方法，此方法调用unregister函数。
         * @example
         * // 移除"loadstart" 事件监听
         * events.un({"loadstart": loadStartListener});
         *
         * // 使用unregister方法移除"loadstart" 事件监听
         * events.unregister("loadstart", undefined, loadStartListener);
         *
         * // 取消对象多个事件监听
         * events.un({
         *     "loadstart": loadStartListener,
         *     "loadend": loadEndListener,
         *     scope: object
         * });
         *
         * // 取消对象多个事件监听，多次调用unregister方法。
         * events.unregister("loadstart", object, loadStartListener);
         * events.unregister("loadend", object, loadEndListener);
         *
         * @param object - {Object} 移除监听的对象。
         */

    }, {
        key: 'un',
        value: function un(object) {
            for (var type in object) {
                if (type !== "scope" && object.hasOwnProperty(type)) {
                    this.unregister(type, object.scope, object[type]);
                }
            }
        }

        /**
         * @function SuperMap.Events.prototype.unregister
         * @description 取消注册。
         * @param type - {string} 事件类型。
         * @param obj - {Object} 默认为 this.object。
         * @param func - {function} 事件监听。
         */

    }, {
        key: 'unregister',
        value: function unregister(type, obj, func) {
            if (obj == null) {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (listeners != null) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i].obj === obj && listeners[i].func === func) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }

        /**
         * @function SuperMap.Events.prototype.remove
         * @description 删除某个事件类型的所有监听，如果该事件类型没有注册，则不做任何操作。
         * @param type - {string} 事件类型。
         */

    }, {
        key: 'remove',
        value: function remove(type) {
            if (this.listeners[type] != null) {
                this.listeners[type] = [];
            }
        }

        /**
         * @function SuperMap.Events.prototype.triggerEvent
         * @description 触发一个特定的注册事件。
         * @param type - {string} 触发事件类型。
         * @param evt - {Event} 事件对象。
         * @returns {boolean} 返回监听对象，如果返回是falee，则停止监听。
         */

    }, {
        key: 'triggerEvent',
        value: function triggerEvent(type, evt) {
            var listeners = this.listeners[type];

            // fast path
            if (!listeners || listeners.length == 0) {
                return undefined;
            }

            // prep evt object with object & div references
            if (evt == null) {
                evt = {};
            }
            evt.object = this.object;
            evt.element = this.element;
            if (!evt.type) {
                evt.type = type;
            }

            // execute all callbacks registered for specified type
            // get a clone of the listeners array to
            // allow for splicing during callbacks
            listeners = listeners.slice();
            var continueChain;
            for (var i = 0, len = listeners.length; i < len; i++) {
                var callback = listeners[i];
                // bind the context to callback.obj
                continueChain = callback.func.apply(callback.obj, [evt]);

                if (continueChain != undefined && continueChain == false) {
                    // if callback returns false, execute no more callbacks.
                    break;
                }
            }
            // don't fall through to other DOM elements
            if (!this.fallThrough) {
                _Event.Event.stop(evt, true);
            }
            return continueChain;
        }

        /**
         * @function SuperMap.Events.prototype.handleBrowserEvent
         * @description 对triggerEvent函数的包装，给事件对象设置了xy属性(即当前鼠标点的xy坐标)。
         * @param evt - {Event} 事件对象。
         */

    }, {
        key: 'handleBrowserEvent',
        value: function handleBrowserEvent(evt) {
            var type = evt.type,
                listeners = this.listeners[type];
            if (!listeners || listeners.length == 0) {
                // noone's listening, bail out
                return;
            }
            // add clientX & clientY to all events - corresponds to average x, y
            var touches = evt.touches;
            if (touches && touches[0]) {
                var x = 0;
                var y = 0;
                var num = touches.length;
                var touch;
                for (var i = 0; i < num; ++i) {
                    touch = touches[i];
                    x += touch.clientX;
                    y += touch.clientY;
                }
                evt.clientX = x / num;
                evt.clientY = y / num;
            }
            if (this.includeXY) {
                evt.xy = this.getMousePosition(evt);
            }
            this.triggerEvent(type, evt);
        }

        /**
         * @function SuperMap.Events.prototype.clearMouseCache
         * @description 清除鼠标缓存。
         */

    }, {
        key: 'clearMouseCache',
        value: function clearMouseCache() {
            this.element.scrolls = null;
            this.element.lefttop = null;
            var body = document.body;
            if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) && navigator.userAgent.match(/iPhone/i))) {
                this.element.offsets = null;
            }
        }

        /**
         * @function SuperMap.Events.prototype.getMousePosition
         * @param evt - {Event} 事件对象。
         * @returns {SuperMap.Pixel} 当前的鼠标的xy坐标点。
         */

    }, {
        key: 'getMousePosition',
        value: function getMousePosition(evt) {
            if (!this.includeXY) {
                this.clearMouseCache();
            } else if (!this.element.hasScrollEvent) {
                _Event.Event.observe(window, "scroll", this.clearMouseListener);
                this.element.hasScrollEvent = true;
            }

            if (!this.element.scrolls) {
                var viewportElement = _Util.Util.getViewportElement();
                this.element.scrolls = [viewportElement.scrollLeft, viewportElement.scrollTop];
            }

            if (!this.element.lefttop) {
                this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0];
            }

            if (!this.element.offsets) {
                this.element.offsets = _Util.Util.pagePosition(this.element);
            }

            return new _Pixel2.default(evt.clientX + this.element.scrolls[0] - this.element.offsets[0] - this.element.lefttop[0], evt.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1]);
        }
    }]);

    return Events;
}();

exports.default = Events;

_SuperMap2.default.Events = Events;
_SuperMap2.default.Events.prototype.BROWSER_EVENTS = ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup", "MSGestureStart", "MSGestureChange", "MSGestureEnd", "contextmenu"];

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SuperMap.Pixel
 * @classdesc 此类用x,y坐标描绘屏幕坐标（像素点）。
 * @param x - {number} x坐标，默认为0.0
 * @param y - {number} y坐标，默认为0.0
 * @param mode - {string} 坐标模式，默认为{@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
 *
 * @example
 * //单独创建一个对象
 * var pixcel = new SuperMap.Pixel(100,50);
 *
 * //依据size创建
 *  var size = new SuperMap.Size(21,25);
 *  var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
 */
var Pixel = function () {

    /**
     * @member SuperMap.Pixel.prototype.y -{number}
     * @description y坐标，默认为0.0
     */
    function Pixel(x, y, mode) {
        _classCallCheck(this, Pixel);

        this.x = 0.0;
        this.y = 0.0;
        this.mode = null;
        this.CLASS_NAME = "SuperMap.Pixel";

        this.x = x ? parseFloat(x) : this.x;
        this.y = y ? parseFloat(y) : this.y;
        this.mode = mode;
    }

    /**
     * @function SuperMap.Pixel.prototype.toString
     * @description 返回此对象的字符串形式
     * @example
     *
     * var pixcel = new SuperMap.Pixel(100,50);
     * var str = pixcel.toString();
     *
     * @returns {string} 例如: "x=200.4,y=242.2"
     */


    /**
     * @member SuperMap.Pixel.prototype.mode -{SuperMap.Pixel.Mode}
     * @description 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。<br>
     * 值有<br>
     * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
     * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.RightTop}
     * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.RightBottom}
     * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftBottom}
     *
     * 这四种 默认值为：{@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
     *
     * @default {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
     */


    /**
     * @member SuperMap.Pixel.prototype.x -{number}
     * @description x坐标，默认为0.0
     */


    _createClass(Pixel, [{
        key: "toString",
        value: function toString() {
            return "x=" + this.x + ",y=" + this.y;
        }

        /**
         * @function SuperMap.Pixel.prototype.clone
         * @description 克隆当前的 pixel 对象。
         * @example
         * var pixcel = new SuperMap.Pixel(100,50);
         * var pixcel2 = pixcel.clone();
         * @returns {SuperMap.Pixel} 返回一个新的与当前 pixel 对象有相同x、y坐标的 pixel 对象。
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Pixel(this.x, this.y, this.mode);
        }

        /**
         * @function SuperMap.Pixel.prototype.equals
         * @description 比较两 pixel 是否相等
         * @example
         * var pixcel = new SuperMap.Pixel(100,50);
         * var pixcel2 = new SuperMap.Pixel(100,50);
         * var isEquals = pixcel.equals(pixcel2);
         *
         * @param px - {SuperMap.Pixel} 用于比较相等的 pixel 对象。
         * @returns {Boolean} 如果传入的像素点和当前像素点相同返回true,如果不同或传入参数为NULL则返回false
         */

    }, {
        key: "equals",
        value: function equals(px) {
            var equals = false;
            if (px != null) {
                equals = this.x == px.x && this.y == px.y || isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y);
            }
            return equals;
        }

        /**
         * @function SuperMap.Pixel.prototype.distanceTo
         * @description 返回两个 pixel 的距离。
         * @example
         * var pixcel = new SuperMap.Pixel(100,50);
         * var pixcel2 = new SuperMap.Pixel(110,30);
         * var distance = pixcel.distanceTo(pixcel2);
         *
         * @param px - {SuperMap.Pixel} 用于计算的一个 pixel
         * @returns {float} 作为参数传入的像素与当前像素点的距离。
         */

    }, {
        key: "distanceTo",
        value: function distanceTo(px) {
            return Math.sqrt(Math.pow(this.x - px.x, 2) + Math.pow(this.y - px.y, 2));
        }

        /**
         * @function SuperMap.Pixel.prototype.add
         * @description 在原来像素坐标基础上，x值加上传入的x参数，y值加上传入的y参数。
         * @example
         * var pixcel = new SuperMap.Pixel(100,50);
         * //pixcel2是新的对象
         * var pixcel2 = pixcel.add(20,30);
         *
         * @param x - {number} 传入的x值。
         * @param y - {number} 传入的y值。
         * @returns {SuperMap.Pixel} 返回一个新的pixel对象，该pixel是由当前的pixel与传
         *      入的x,y相加得到。
         */

    }, {
        key: "add",
        value: function add(x, y) {
            if (x == null || y == null) {
                throw new TypeError('Pixel.add cannot receive null values');
            }
            return new Pixel(this.x + x, this.y + y);
        }

        /**
         * @function SuperMap.Pixel.prototype.offset
         * @description 通过传入的 {@link SuperMap.Pixel} 参数对原屏幕坐标进行偏移。
         * @example
         * var pixcel = new SuperMap.Pixel(100,50);
         * var pixcel2 = new SuperMap.Pixel(130,20);
         * //pixcel3 是新的对象
         * var pixcel3 = pixcel.offset(pixcel2);
         *
         * @param px - {SuperMap.Pixel}  传入的 <SuperMap.Pixel> 对象。
         * @returns {SuperMap.Pixel} 返回一个新的pixel，该pixel是由当前的pixel对象的x，y
         *      值与传入的Pixel对象的x，y值相加得到。
         */

    }, {
        key: "offset",
        value: function offset(px) {
            var newPx = this.clone();
            if (px) {
                newPx = this.add(px.x, px.y);
            }
            return newPx;
        }

        /**
         *
         * @function SuperMap.Pixel.prototype.destroy
         * @description 销毁此对象。
         * 销毁后此对象的所有属性为null，而不是初始值。
         * @example
         * var pixcel = new SuperMap.Pixel(100,50);
         * pixcel.destroy();
         */

    }, {
        key: "destroy",
        value: function destroy() {
            this.x = null;
            this.y = null;
            this.mode = null;
        }

        /**
         * @member SuperMap.Pixel.Mode
         * @enum {string}
         * @readonly
         * @description 模式
         *
         * * SuperMap.Pixel.Mode.LeftTop 左上模式
         * * SuperMap.Pixel.Mode.RightTop 右上模式
         * * SuperMap.Pixel.Mode.RightBottom 右下模式
         * * SuperMap.Pixel.Mode.LeftBottom 左下模式
         */

    }]);

    return Pixel;
}();

Pixel.Mode = {
    LeftTop: "lefttop",
    RightTop: "righttop",
    RightBottom: "rightbottom",
    LeftBottom: "leftbottom"
};
exports.default = Pixel;

_SuperMap2.default.Pixel = Pixel;

/***/ }),
/* 26 */
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
 * @class SuperMap.TimeControlBase
 * @classdesc 时间控制基类类。
 * @param options - {Object} 该类开放的可选属性。如：<br>
 *        speed - {number}速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大速度越快。<br>
 *        startTime - {number}的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。<br>
 *        endTime - {number}的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。<br>
 *        repeat - {boolean} 是否重复循环。默认为true。<br>
 *        reverse - {boolean} 是否反向。默认为false。<br>
 */
var TimeControlBase = function () {

    /**
     * @private
     * @member SuperMap.TimeControlBase.prototype.EVENT_TYPES -{Array<string>}
     * @description 此类支持的事件类型。
     *
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.running -{boolean}
     * @description 记录当前是否处于运行中，默认为false。
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.currentTime -{number}
     * @description 记录近期的时间，也就是当前帧运行到的时间。
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.endTime -{number}
     * @description 记录的结束时间，必须为数字，
     *              如果不设置，初始化时以当前时间进行设置，建议设置
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.frequency -{number}
     * @description 刷新频率(单位ms)，服务器刷新的时间间隔，默认为1s
     */
    function TimeControlBase(options) {
        _classCallCheck(this, TimeControlBase);

        this.speed = 1;
        this.frequency = 1000;
        this.startTime = null;
        this.endTime = null;
        this.repeat = true;
        this.currentTime = null;
        this.oldTime = null;
        this.running = false;
        this.reverse = false;
        this.EVENT_TYPES = ["start", "pause", "stop"];
        this.events = null;
        this.CLASS_NAME = "SuperMap.TimeControlBase";

        //设置步长，刷新频率、开始结束时间、是否循环、是否反向
        var me = this;
        options = options || {};
        me.speed = options.speed && options.speed >= 0 ? options.speed : me.speed;
        me.frequency = options.speed && options.frequency >= 0 ? options.frequency : me.frequency;
        me.startTime = options.startTime && options.startTime != null ? options.startTime : 0;
        me.endTime = options.endTime && options.endTime != null && options.endTime >= me.startTime ? options.endTime : +new Date();
        me.repeat = options.repeat != undefined ? options.repeat : me.repeat;
        me.reverse = options.reverse != undefined ? options.reverse : me.reverse;

        me.speed = Number(me.speed);
        me.frequency = Number(me.frequency);
        me.startTime = Number(me.startTime);
        me.endTime = Number(me.endTime);

        me.events = new _SuperMap2.default.Events(this, null, this.EVENT_TYPES);
        me.startTime = Date.parse(new Date(this.startTime));
        me.endTime = Date.parse(new Date(this.endTime));

        //初始化处于非运行阶段
        me.running = false;

        //初始化当前时间
        me.currentTime = me.startTime;
    }

    /**
     * @function SuperMap.TimeControlBase.prototype.updateOptions
     * @param options - {Object} 设置参数得可选参数。设置步长，刷新频率、开始结束时间、是否循环、是否反向。
     */


    /**
     * @private
     * @member SuperMap.TimeControlBase.prototype.events -{SuperMap.Events}
     * @description 事件
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.reverse -{boolean}
     * @description 是否反向，默认为false。
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.oldTime -{number}
     * @description 记录上一帧的时间，也就是之前运行到的时间。
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.repeat -{boolean}
     * @description 是否重复循环，默认为true。
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.startTime -{number}
     * @description 记录的起始时间，必须为数字，
     *              如果不设置，初始化时为0，建议设置
     */


    /**
     * @member SuperMap.TimeControlBase.prototype.speed -{number}
     * @description 步长，必须为非负数，默认为1（表示前后两次渲染的数据之间的间隔为1）
     */


    _createClass(TimeControlBase, [{
        key: "updateOptions",
        value: function updateOptions(options) {
            //设置步长，刷新频率、开始结束时间、是否循环、是否反向
            var me = this;
            options = options || {};
            if (options.speed && options.speed >= 0) {
                me.speed = options.speed;
                me.speed = Number(me.speed);
            }

            if (options.speed && options.frequency >= 0) {
                me.frequency = options.frequency;
                me.frequency = Number(me.frequency);
            }

            if (options.startTime && options.startTime != null) {
                me.startTime = options.startTime;
                me.startTime = Date.parse(new Date(me.startTime));
            }

            if (options.endTime && options.endTime != null && options.endTime >= me.startTime) {
                me.endTime = options.endTime;
                me.endTime = Date.parse(new Date(me.endTime));
            }

            if (options.repeat != null) {
                me.repeat = options.repeat;
            }

            if (options.reverse != null) {
                me.reverse = options.reverse;
            }
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.start
         * @description 开始
         */

    }, {
        key: "start",
        value: function start() {
            var me = this;

            if (!me.running) {
                me.running = true;
                me.tick();
                me.events.triggerEvent('start', me.currentTime);
            }
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.pause
         * @description 暂停
         */

    }, {
        key: "pause",
        value: function pause() {
            var me = this;
            me.running = false;
            me.events.triggerEvent('pause', me.currentTime);
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.stop
         * @description 停止，停止后返回起始状态
         */

    }, {
        key: "stop",
        value: function stop() {
            var me = this;
            //停止时 时间设置为开始时间
            me.currentTime = me.startTime;
            //如果正在运行，修改为初始时间即可绘制一帧
            if (me.running) {
                me.running = false;
            }
            me.events.triggerEvent('stop', me.currentTime);
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.toggle
         * @description 开关切换，切换的是开始和暂停
         */

    }, {
        key: "toggle",
        value: function toggle() {
            var me = this;

            if (me.running) {
                me.pause();
            } else {
                me.start();
            }
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setSpeed
         * @description 设置步长。
         * @param speed - {number}步长，必须为非负数，默认为1
         * @return {boolean} true代表设置成功，false设置失败（speed小于0时失败）
         */

    }, {
        key: "setSpeed",
        value: function setSpeed(speed) {
            var me = this;
            if (speed >= 0) {
                me.speed = speed;
                return true;
            }
            return false;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getSpeed
         * @description 获取步长。
         * @return {number} 返回当前的步长
         */

    }, {
        key: "getSpeed",
        value: function getSpeed() {
            return this.speed;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setFrequency
         * @description 设置刷新频率。
         * @param frequency - {number}刷新频率，单位为ms，默认为1s
         * @return {boolean} true代表设置成功，false设置失败（frequency小于0时失败）
         */

    }, {
        key: "setFrequency",
        value: function setFrequency(frequency) {
            var me = this;
            if (frequency >= 0) {
                me.frequency = frequency;
                return true;
            }
            return false;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getFrequency
         * @description 获取刷新频率。
         * @return {number} 返回当前的刷新频率
         */

    }, {
        key: "getFrequency",
        value: function getFrequency() {
            return this.frequency;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setStartTime
         * @description 设置起始时间，设置完成后如果当前时间小于起始时间，则从起始时间开始
         * @param startTime - {number}需要设置的起始时间
         * @return {boolean} true代表设置成功，false设置失败（startTime 大于结束时间时失败）
         */

    }, {
        key: "setStartTime",
        value: function setStartTime(startTime) {
            var me = this;
            startTime = Date.parse(new Date(startTime));
            //起始时间不得大于结束时间
            if (startTime > me.endTime) {
                return false;
            }
            me.startTime = startTime;
            //如果当前时间小于了起始时间，则从当前起始时间开始
            if (me.currentTime < me.startTime) {
                me.currentTime = me.startTime;
                me.tick();
            }
            return true;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getStartTime
         * @description 获取起始时间
         * @return {number} 返回当前的起始时间
         */

    }, {
        key: "getStartTime",
        value: function getStartTime() {
            return this.startTime;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setEndTime
         * @description 设置结束时间，设置完成后如果当前时间大于结束，则从起始时间开始
         * @param endTime - {number}需要设置的结束时间
         * @return {boolean} true代表设置成功，false设置失败（endTime 小于开始时间时失败）
         */

    }, {
        key: "setEndTime",
        value: function setEndTime(endTime) {
            var me = this;
            me.endTime = Date.parse(new Date(me.endTime));
            //结束时间不得小于开始时间
            if (endTime < me.startTime) {
                return false;
            }
            me.endTime = endTime;
            //如果当前时间大于了结束时间，则从起始时间开始
            if (me.currentTime >= me.endTime) {
                me.currentTime = me.startTime;
                me.tick();
            }
            return true;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getEndTime
         * @description 获取结束时间
         * @return {number} 返回当前的结束时间
         */

    }, {
        key: "getEndTime",
        value: function getEndTime() {
            return this.endTime;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setCurrentTime
         * @description 设置当前时间
         * @param currentTime - {number}需要设置的当前时间
         * @return {boolean} true代表设置成功，false设置失败
         */

    }, {
        key: "setCurrentTime",
        value: function setCurrentTime(currentTime) {
            var me = this;
            me.currentTime = Date.parse(new Date(me.currentTime));
            //结束时间不得小于开始时间
            if (currentTime >= me.startTime && currentTime <= me.endTime) {
                me.currentTime = currentTime;
                me.startTime = me.currentTime;
                me.tick();
                return true;
            }
            return false;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getCurrentTime
         * @description 获取当前时间
         * @return {number} 返回当前时间
         */

    }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
            return this.currentTime;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setRepeat
         * @description 设置是否重复循环
         * @param repeat - {boolean} 是否重复循环
         */

    }, {
        key: "setRepeat",
        value: function setRepeat(repeat) {
            this.repeat = repeat;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getRepeat
         * @description 获取是否重复循环，默认是true。
         * @return {boolean} 返回是否重复循环
         */

    }, {
        key: "getRepeat",
        value: function getRepeat() {
            return this.repeat;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.setReverse
         * @description 设置是否反向
         * @param reverse - {boolean} 是否反向
         */

    }, {
        key: "setReverse",
        value: function setReverse(reverse) {
            this.reverse = reverse;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getReverse
         * @description 获取是否反向，默认是false。
         * @return {boolean} 返回是否反向
         */

    }, {
        key: "getReverse",
        value: function getReverse() {
            return this.reverse;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.getRunning
         * @description 获取运行状态
         * @return {boolean} true代表正在运行，false发表没有运行
         */

    }, {
        key: "getRunning",
        value: function getRunning() {
            return this.running;
        }

        /**
         * @function SuperMap.TimeControlBase.prototype.destroy
         * @description 销毁Animator对象，释放资源。
         */

    }, {
        key: "destroy",
        value: function destroy() {
            var me = this;
            me.speed = null;
            me.frequency = null;
            me.startTime = null;
            me.endTime = null;
            me.currentTime = null;
            me.repeat = null;
            me.running = false;
            me.reverse = null;
        }
    }, {
        key: "tick",
        value: function tick() {
            //TODO 每次刷新执行的操作。子类实现
        }
    }]);

    return TimeControlBase;
}();

exports.default = TimeControlBase;


_SuperMap2.default.TimeControlBase = TimeControlBase;

/***/ }),
/* 27 */
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

var _GeoCodingParameter = __webpack_require__(28);

var _GeoCodingParameter2 = _interopRequireDefault(_GeoCodingParameter);

var _GeoDecodingParameter = __webpack_require__(29);

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
     * @function SuperMap.AddressMatchService.prototype.destroy
     * @override
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
            _FetchRequest.FetchRequest.get(url, params).then(function (response) {
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
/* 28 */
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
 * @param options - {Object} 可选参数。如:</br>
 *         address - {string} 地点关键词。</br>
 *         fromIndex - {number} 设置返回对象的起始索引值。</br>
 *         toIndex - {number} 设置返回对象的结束索引值。</br>
 *         filters - {Array<string>} 过滤字段，限定查询区域。</br>
 *         prjCoordSys - {string} 查询结果的坐标系。</br>
 *         maxReturn - {number} 最大返回结果数。
 */
var GeoCodingParameter = function () {

    /**
     * @member SuperMap.GeoCodingParameter.prototype.prjCoordSys - {string}
     * @description  查询结果的坐标系。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.toIndex - {number}
     * @description 设置返回对象的结束索引值。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.address - {string}
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
     * @member SuperMap.GeoCodingParameter.prototype.maxReturn - {number}
     * @description 最大返回结果数。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.filters - {Array<string>}
     * @description 过滤字段，限定查询区域。
     */


    /**
     * @member SuperMap.GeoCodingParameter.prototype.fromIndex - {number}
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
/* 29 */
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
 * @param options - {Object}可选参数。如:<br>
 *        x - {number} 查询位置的横坐标。<br>
 *        y - {number} 查询位置的纵坐标。<br>
 *        fromIndex - {number} 设置返回对象的起始索引值。<br>
 *        filters - {Array<string>} 过滤字段，限定查询区域。<br>
 *        prjCoordSys - {string} 查询结果的坐标系。<br>
 *        maxReturn - {number} 最大返回结果数。<br>
 *        geoDecodingRadius - {number} 查询半径。
 */
var GeoDecodingParameter = function () {

    /**
     *  @member SuperMap.GeoDecodingParameter.prototype.maxReturn - {number}
     *  @description 最大返回结果数。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.filters - {Array<string>}
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
     * @member SuperMap.GeoDecodingParameter.prototype.geoDecodingRadius - {number}
     * @description 查询半径。
     */


    /**
     * @member SuperMap.GeoDecodingParameter.prototype.prjCoordSys - {string}
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
/* 30 */
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
 * @classdesc 密度分析任务参数类。
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName - {string} 数据集名。<br>
 *        query - {Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
 *        resolution - {number} 分辨率。<br>
 *        method - {number} 分析方法。<br>
 *        meshType - {number} 分析类型。<br>
 *        fields - {string} 权重索引。<br>
 *        radius - {number} 分析的影响半径。
 */
var KernelDensityJobParameter = function () {

  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.radiusUnit - {SuperMap.AnalystSizeUnit}
   * @description 搜索半径单位。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.radius - {number}
   * @description 分析的影响半径。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.meshType - {number}
   * @description 分析类型。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.resolution - {number}
   * @description 网格大小。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.datasetName - {string}
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
   * @member SuperMap.KernelDensityJobParameter.prototype.areaUnit - {SuperMap.AnalystAreaUnit}
   * @description 面积单位。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.meshSizeUnit - {SuperMap.AnalystSizeUnit}
   * @description 网格大小单位。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.fields - {string}
   * @description 权重索引。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.method - {number}
   * @description 分析方法。
   */


  /**
   * @member SuperMap.KernelDensityJobParameter.prototype.query - {Object}
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
     * @param kernelDensityJobParameter -{SuperMap.KernelDensityJobParameter} 密度分析任务参数类。
     * @param tempObj - {SuperMap.KernelDensityJobParameter} 密度分析任务参数对象。
     * @description 将密度分析任务参数对象转换为JSON对象。
     * @return JSON对象。
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
/* 31 */
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

var _KernelDensityJobParameter = __webpack_require__(30);

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
     * @function SuperMap.KernelDensityJobsService.prototype.destroy
     * @override
     */


    _createClass(KernelDensityJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
         * @description 获取核密度分析任务
         */

    }, {
        key: 'getKernelDensityJobs',
        value: function getKernelDensityJobs() {
            _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
         * @description 获取指定id的核密度分析服务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getKernelDensityJob',
        value: function getKernelDensityJob(id) {
            _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
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
            _get(KernelDensityJobsService.prototype.__proto__ || Object.getPrototypeOf(KernelDensityJobsService.prototype), 'addJob', this).call(this, this.url, params, _KernelDensityJobParameter2.default, seconds);
        }
    }]);

    return KernelDensityJobsService;
}(_ProcessingServiceBase2.default);

exports.default = KernelDensityJobsService;


_SuperMap2.default.KernelDensityJobsService = KernelDensityJobsService;

/***/ }),
/* 32 */
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
 *         mode -{{@link SuperMap.SpatialQueryMode}} 空间查询模式 。 <br>
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
/* 33 */
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

var _SingleObjectQueryJobsParameter = __webpack_require__(32);

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
     *@override
     */


    _createClass(SingleObjectQueryJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
         * @description 获取单对象空间查询分析所有任务
         */

    }, {
        key: 'getQueryJobs',
        value: function getQueryJobs() {
            _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
         * @description 获取指定id的单对象空间查询分析服务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getQueryJob',
        value: function getQueryJob(id) {
            _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
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
            _get(SingleObjectQueryJobsService.prototype.__proto__ || Object.getPrototypeOf(SingleObjectQueryJobsService.prototype), 'addJob', this).call(this, this.url, params, _SingleObjectQueryJobsParameter2.default, seconds);
        }
    }]);

    return SingleObjectQueryJobsService;
}(_ProcessingServiceBase2.default);

exports.default = SingleObjectQueryJobsService;


_SuperMap2.default.SingleObjectQueryJobsService = SingleObjectQueryJobsService;

/***/ }),
/* 34 */
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
 *        statisticModes -{{@link SuperMap.StatisticAnalystMode}} 分析模式。<br>
 *        meshType -{number}分析类型。<br>
 *        fields -{number}权重索引。<br>
 *        type -{{@link SuperMap.SummaryType}} 聚合类型。
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
     * @function SuperMap.SummaryMeshJobParameter.destroy
     * @override
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
/* 35 */
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

var _SummaryMeshJobParameter = __webpack_require__(34);

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
     * @override
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
            _get(SummaryMeshJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJob
         * @description 获取指定ip的点聚合分析任务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getSummaryMeshJob',
        value: function getSummaryMeshJob(id) {
            _get(SummaryMeshJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryMeshJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
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
/* 36 */
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
 *         query -{Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
 *         standardSummaryFields -{boolean} 以标准属字段统计。 <br>
 *         standardFields -{string} 以标准属字段统计的字段名称。 <br>
 *         standardStatisticModes -{{@link SuperMap.StatisticAnalystMode}} 以标准属字段统计的统计模式。 <br>
 *         weightedSummaryFields -{boolean} 以权重字段统计。 <br>
 *         weightedFields -{string} 以权重字段统计的字段名称。 <br>
 *         weightedStatisticModes -{{@link SuperMap.StatisticAnalystMode}} 以权重字段统计的统计模式。 <br>
 *         resolution -{number}网格大小。 <br>
 *         meshType -{number}网格面汇总类型。 <br>
 *         meshSizeUnit -{{@link SuperMap.AnalystSizeUnit}} 网格大小单位。 <br>
 *         type -{{@link SuperMap.SummaryType}} 汇总类型。 <br>
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
/* 37 */
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

var _SummaryRegionJobParameter = __webpack_require__(36);

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
     *@override
     */


    _createClass(SummaryRegionJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJobs
         * @description 获取区域汇总分析任务集合。
         */

    }, {
        key: 'getSummaryRegionJobs',
        value: function getSummaryRegionJobs() {
            _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJob
         * @description 获取指定id的区域汇总分析任务。
         * @param id -{string} 要获取区域汇总分析任务的id
         */

    }, {
        key: 'getSummaryRegionJob',
        value: function getSummaryRegionJob(id) {
            _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
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
            _get(SummaryRegionJobsService.prototype.__proto__ || Object.getPrototypeOf(SummaryRegionJobsService.prototype), 'addJob', this).call(this, this.url, params, _SummaryRegionJobParameter2.default, seconds);
        }
    }]);

    return SummaryRegionJobsService;
}(_ProcessingServiceBase2.default);

exports.default = SummaryRegionJobsService;


_SuperMap2.default.SummaryRegionJobsService = SummaryRegionJobsService;

/***/ }),
/* 38 */
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
 *         mode -{{@link SuperMap.ClipAnalystMode}} 裁剪分析模式 。 <br>
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
/* 39 */
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

var _VectorClipJobsParameter = __webpack_require__(38);

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
     *@override
     */


    _createClass(VectorClipJobsService, [{
        key: 'destroy',
        value: function destroy() {
            _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'destroy', this).call(this);
        }

        /**
         * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
         * @description 获取矢量裁剪分析所有任务
         */

    }, {
        key: 'getVectorClipJobs',
        value: function getVectorClipJobs() {
            _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'getJobs', this).call(this, this.url);
        }

        /**
         * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
         * @description 获取指定id的矢量裁剪分析服务
         * @param id -{string} 指定要获取数据的id
         */

    }, {
        key: 'getVectorClipJob',
        value: function getVectorClipJob(id) {
            _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'getJobs', this).call(this, this.url + '/' + id);
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
            _get(VectorClipJobsService.prototype.__proto__ || Object.getPrototypeOf(VectorClipJobsService.prototype), 'addJob', this).call(this, this.url, params, _VectorClipJobsParameter2.default, seconds);
        }
    }]);

    return VectorClipJobsService;
}(_ProcessingServiceBase2.default);

exports.default = VectorClipJobsService;


_SuperMap2.default.VectorClipJobsService = VectorClipJobsService;

/***/ }),
/* 40 */
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
 *        clientType - {{@link SuperMap.ClientType}} 服务端类型。<br>
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SuperMap = __webpack_require__(0);

var _SuperMap2 = _interopRequireDefault(_SuperMap);

var _ServerInfo = __webpack_require__(42);

var _ServerInfo2 = _interopRequireDefault(_ServerInfo);

var _TokenServiceParameter = __webpack_require__(43);

var _TokenServiceParameter2 = _interopRequireDefault(_TokenServiceParameter);

var _KeyServiceParameter = __webpack_require__(40);

var _KeyServiceParameter2 = _interopRequireDefault(_KeyServiceParameter);

var _FetchRequest = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name SecurityManager
 * @memberOf SuperMap
 * @namespace
 * @description 安全管理中心，提供iServer,iPortal,Online统一权限认证管理
 *  > 使用说明：
 *  > 创建任何一个服务之前调用{@link SuperMap.SecurityManager.registerToken}或
 *  > {@link SuperMap.SecurityManager.registerKey}注册凭据。
 *  > 发送请求时根据url或者服务id获取相应的key或者token并自动添加到服务地址中
 */
_SuperMap2.default.SecurityManager = {

    INNER_WINDOW_WIDTH: 600,
    INNER_WINDOW_HEIGHT: 600,
    /**
     * @description 从服务器获取一个token,在此之前要注册服务器信息
     * @param url {string}-服务器域名+端口，如：http://localhost:8092
     * @param tokenParam -{SuperMap.TokenServiceParameter} token申请参数
     * @return {Promise}
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
     * @description 服务请求都会自动带上这个token
     * @param url {string} -服务器域名+端口：如http://localhost:8090
     * @param token -{string} token
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
     * @description 注册key,ids为数组(存在一个key对应多个服务)
     * @param ids -{Array} 可以是服务id数组或者url地址数组或者webAPI类型数组
     * @param key -{string} key
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
     * @description 获取服务器信息
     * @param url {string}-服务器域名+端口，如：http://localhost:8092
     * @returns {SuperMap.ServerInfo} 服务器信息
     */
    getServerInfo: function getServerInfo(url) {
        this.servers = this.servers || {};
        return this.servers[url];
    },

    /**
     * @description 根据Url获取token
     * @param url -{string} 服务器域名+端口，如：http://localhost:8092
     * @returns {string} token
     */
    getToken: function getToken(url) {
        if (!url) {
            return;
        }
        this.tokens = this.tokens || {};
        var domain = this._getTokenStorageKey(url);
        return this.tokens[domain];
    },

    /**
     * @description 根据Url获取key
     * @param id -{string} id
     * @returns {string} key
     */
    getKey: function getKey(id) {
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        return this.keys[key];
    },

    /**
     * @description Online登录验证
     * @param callbackLocation -{string} 跳转位置
     * @param newTab -{boolean}是否新窗口打开
     */
    loginOnline: function loginOnline(callbackLocation, newTab) {
        var loginUrl = _SuperMap2.default.SecurityManager.SSO + "/login?service=" + callbackLocation;
        this._open(loginUrl, newTab);
    },

    /**
     * @description iPortal登录验证
     * @param url -{string} iportal首页地址
     * @param username -{string} 用户名
     * @param password -{string} 密码
     * @returns {Promise}
     */
    loginiPortal: function loginiPortal(url, username, password) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "web/login.json" : "/web/login.json";
        var loginInfo = {
            username: username && username.toString(),
            password: password && password.toString()
        };
        loginInfo = JSON.stringify(loginInfo);
        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withCredentials: true
        };
        return _FetchRequest.FetchRequest.post(url, loginInfo, requestOptions).then(function (response) {
            return response.json();
        });
    },

    /**
     * @description iPortal登录验证
     * @param url -{string} iportal首页地址
     * @returns {Promise}
     */
    logoutiPortal: function logoutiPortal(url) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "services/security/logout" : "/services/security/logout";

        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withCredentials: true,
            withoutFormatSuffix: true
        };
        return _FetchRequest.FetchRequest.get(url, "", requestOptions).then(function () {
            return true;
        }).catch(function () {
            return false;
        });
    },

    /**
     * @description iManager登录验证
     * @param url -{string} iManager地址。<br>
     *                      地址参数为iManager首页地址，如： http://localhost:8390/imanager<br>
     * @param loginInfoParams -{Object} iManager 登录参数<br>
     *        userName -{string} 用户名<br>
     *        password-{string} 密码
     * @param options -{Object} <br>
     *        isNewTab -{boolean} 不同域时是否在新窗口打开登录页面
     * @return {Promise}
     */
    loginManager: function loginManager(url, loginInfoParams, options) {
        if (!_SuperMap2.default.Util.isInTheSameDomain(url)) {
            var isNewTab = options ? options.isNewTab : true;
            this._open(url, isNewTab);
            return;
        }
        var end = url.substr(url.length - 1, 1);
        var requestUrl = end === "/" ? url + "icloud/security/tokens.json" : url + "/icloud/security/tokens.json";
        var params = loginInfoParams || {};
        var loginInfo = {
            username: params.userName && params.userName.toString(),
            password: params.password && params.password.toString()
        };
        loginInfo = JSON.stringify(loginInfo);
        var requestOptions = {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        };
        var me = this;
        return _FetchRequest.FetchRequest.post(requestUrl, loginInfo, requestOptions).then(function (response) {
            response.text().then(function (result) {
                me.imanagerToken = result;
                return result;
            });
        });
    },

    /**
     * @description 清空全部验证信息
     */
    destroyAllCredentials: function destroyAllCredentials() {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    },
    /**
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
        var patten = /(.*?):\/\/([^\/]+)/i;
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
/* 42 */
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
 *        tokenServiceUrl - {string} 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json<br>
 *        keyServiceUrl - {string} 非必填，如：http://supermapiserver:8092/web/mycontent/keys/register.json
 */
var ServerInfo =

/**
 * @member SuperMap.ServerInfo.prototype.tokenServiceUrl -{string}
 * @description 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
 */

/**
 * @member SuperMap.ServerInfo.prototype.type -{ServerType}
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
    // var patten = /http:\/\/([^\/]+)/i;
    //this.server = this.server.match(patten)[0];

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
/* 43 */
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
 * @param options - {Object} token申请参数。
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
   * @member SuperMap.TokenServiceParameter.prototype.ip -{string}
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promisePolyfill = __webpack_require__(18);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Promise = _promisePolyfill2.default;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function(){try{return elasticsearch}catch(e){return {}}}();

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
__webpack_require__(10);
__webpack_require__(12);
__webpack_require__(13);
module.exports = __webpack_require__(9);


/***/ })
/******/ ]);