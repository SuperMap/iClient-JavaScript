/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Plot
 * 动态标绘中用到的枚举类型。
 */

/**
 * Constant: SuperMap.Plot.SymbolType
 * {Object} 标号图层几何类型的枚举类。
 * 该类定义了一系列几何对象类型。
 *
 * DOTSYMBOL: 点标号,
 *
 * ALGOSYMBOL: 线面标号,
 *
 * TEXTSYMBOL: 文本,
 *
 * ELLIPSESYMBOL: 椭圆,
 *
 * CIRCLESYMBOL: 圆,
 *
 * RECTANGLESYMBOL: 矩形,
 *
 * ARBITRARYPOLYGONSYMBOL: 任意多边形,
 *
 * POLYLINESYMBOL: 折线,
 *
 * PARALLELOGRAM: 平行四边形,
 *
 * ARCSYMBOL: 弧线,
 *
 * REGULARPOLYGON: 正多边形,
 *
 * CHORDSYMBOL: 弓形,
 *
 * PIESYMBOL: 扇形,
 *
 * KIDNEY: 集结地,
 *
 * POLYBEZIERSYMBOL: 贝塞尔曲线,
 *
 * PARALLELLINE: 平行线,
 *
 * BRACESYMBOL: 大括号,
 *
 * ANNOFRAMESYMBOL: 注记指示框,
 *
 * TRAPEZOIDSYMBOL: 梯形,
 *
 * POLYBEZIERCLOSESYMBOL: 闭合贝塞尔曲线,
 *
 * GROUPOBJECT: 组合对象,
 *
 * LINERELATION: 对象间连线关系,
 *
 * INTERFERENCEBEAM: 干扰波束,
 *
 * POLYGONREGION: 多边形区域,
 *
 * ARCREGION: 扇形区域,
 *
 * AIRROUTE: KJ航线,
 *
 * NAVYROUTE: HJ航线,
 *
 * MISSILEROUTE: DD航线,
 *
 * NAVYDEPLOYMENT: HJBLBS,
 *
 * AIRDEPLOYMENT: KJBLBS
 *
 * SATELLITE: 卫星
 *
 * SATELLITETIMEWINDOWS: 卫星可见时间窗
 *
 * SYMBOLTEXT: 对象标注
 *
 * RUNWAYROUTE: 跑道航线
 *
 * CURVEEIGHTROUTE: 8字形航线
 *
 * ROUTENODE：航线节点
 *
 * ARROWLINE: 单线箭头
 *
 * PATHTEXT: 沿线注记
 *
 * LITERATESIGN: 标牌文字
 *
 * CONCENTRICCIRCLE: 同心圆
 *
 * FLAGGROUP: 多旗
 *
 * SYMBOLTEXT1: 注记1
 *
 * COMBINATIONALCIRCLE: 组合圆
 *
 * FREECURVE: 自由曲线
 */
SuperMap.Plot.SymbolType = {
    DOTSYMBOL: 1,
    ALGOSYMBOL: 2,
    TEXTSYMBOL: 34,
    ELLIPSESYMBOL: 31,
    CIRCLESYMBOL: 29,
    RECTANGLESYMBOL: 26,
    ARBITRARYPOLYGONSYMBOL: 32,
    POLYLINESYMBOL:24,
    PARALLELOGRAM: 28,
    ARCSYMBOL: 44,
    REGULARPOLYGON: 410,
    CHORDSYMBOL: 370,
    PIESYMBOL: 380,
    KIDNEY: 390,
    POLYBEZIERSYMBOL: 590,
    PARALLELLINE: 48,
    BRACESYMBOL: 400,
    ANNOFRAMESYMBOL: 320,
    ANNOFRAMESYMBOLM: 321,
    TRAPEZOIDSYMBOL: 350,
    POLYBEZIERCLOSESYMBOL: 360,
    GROUPOBJECT:1000,
    LINERELATION: 1001,
    INTERFERENCEBEAM: 1002,
    POLYGONREGION: 1003,
    ARCREGION: 1004,
    AIRROUTE: 1005,
    NAVYROUTE: 1006,
    MISSILEROUTE: 1007,
    NAVYDEPLOYMENT: 1008,
    AIRDEPLOYMENT: 1009,
    SATELLITE:1010,
    SATELLITETIMEWINDOWS: 1011,
    SYMBOLTEXT: 1012,
    RUNWAY: 1013,
    CURVEEIGHT: 1014,
    ROUTENODE: 1015,
    ARROWLINE: 1016,
    PATHTEXT: 1017,
    LITERATESIGN: 1018,
    CONCENTRICCIRCLE:1019,
    FLAGGROUP:1020,
    SYMBOLTEXT1: 1021,
    COMBINATIONALCIRCLE:1022,
    FREECURVE: 1023,
    SYMBOLTEXTBOX: 1024,
    NODECHAIN:1025
};

/**
 * Constant: SuperMap.Plot.LineRelation
 * 对象间连线关系的类型.
 *
 * SOLID: 实线,
 *
 * DASH: 虚线
 */
SuperMap.Plot.LineRelation = {
    SOLID: 0,
    DASH: 1
};

/**
 * Constant: SuperMap.Plot.AlgoSurroundLineType
 * 线面标号的衬线类型.
 *
 * NONE: 无衬线,
 *
 * INNER: 内侧衬线,
 *
 * OUT: 外侧衬线,
 *
 * ALL: 双侧衬线.
 */
SuperMap.Plot.AlgoSurroundLineType = {
    NONE: 0,
    INNER: 1,
    OUT: 2,
    ALL: 3
};

/**
 * Constant: SuperMap.Plot.RouteNodeType
 * 航线点类型.
 *
 * RENDEZVOUS: 会合点,
 *
 * EXPANDING: 展开点,
 *
 * VOLLEY: 齐射点,
 *
 * STANDBY: 待机点,
 *
 * SUPPLY: 补给点,
 *
 * TAKEOFF: 起飞点,
 *
 * INITIAL: 初始点,
 *
 * VISUALINITAL: 可视初始点,
 *
 * LANCH: 发射点,
 *
 * TURNING: 转弯点,
 *
 * AIMING: 瞄准点,
 *
 * COMMONROUTEPOINT 普通航路点,
 *
 * WEAPONLAUNCHPOINT 武器发射点
 */
SuperMap.Plot.RouteNodeType = {
    RENDEZVOUS: "RENDEZVOUS",
    EXPANDING: "EXPANDING",
    VOLLEY: "VOLLEY",
    STANDBY: "STANDBY",
    SUPPLY: "SUPPLY",
    TAKEOFF: "TAKEOFF",
    INITIAL: "INITIAL",
    VISUALINITAL: "VISUALINITAL",
    LANCH: "LANCH",
    TURNING: "TURNING",
    AIMING: "AIMING",
    COMMONROUTEPOINT: "COMMONROUTEPOINT",
    WEAPONLAUNCHPOINT: "WEAPONLAUNCHPOINT"
};

/**
 * Constant: SuperMap.Plot.RelLineText
 * 沿线文字，文字和线的关系
 *
 * ONLINE: 文字在线上,
 *
 * ONLEFTLINE: 文字在线的左侧,
 *
 * ONRIGHTLINE: 文字在线的右侧。
 */
SuperMap.Plot.RelLineText = {
    ONLINE: 0,
    ONLEFTLINE: 1,
    ONRIGHTLINE: 2,
    ONBOTHLINE: 3
};

/**
 * Constant: SuperMap.Plot.RadiusLineType
 * 扇形区域的半径线的类型.
 *
 * NONE: 不显示半径线,
 *
 * SOLID: 直线,
 *
 * ARROW: 箭头线
 */
SuperMap.Plot.RadiusLineType = {
    NONE: 0,
    SOLID: 1,
    ARROW: 2
};

/**
 * Constant: SuperMap.Plot.AnnoPosition
 * 点标号注记位置.
 *
 * LEFTTOP: 左上,
 *
 * LEFTBOTTOM: 左下,
 *
 * RIGHTTOP: 右上,
 *
 * RIGHTBOTTOM: 右下,
 *
 * TOP: 上,
 *
 * BOTTOM: 下,
 *
 * LEFT: 左,
 *
 * RIGHT: 右,
 *
 */
SuperMap.Plot.AnnoPosition = {
    LEFTTOP: 0,
    LEFTBOTTOM: 1,
    RIGHTTOP: 2,
    RIGHTBOTTOM: 3,
    TOP: 4,
    BOTTOM: 5,
    LEFT: 6,
    RIGHT: 7
};

/**
 * Constant: SuperMap.Plot.ArrowLineType
 * 箭头类型.
 *
 * DOUBLELINE: 双线箭头
 *
 * TRIANGLESOLID: 实心三角形
 *
 * NONE: 无箭头
 */
SuperMap.Plot.ArrowLineType = {
    DOUBLELINE: 0,
    TRIANGLESOLID: 1,
    NONE: 2
};

/**
 * Constant: SuperMap.Plot.TextBoxType
 * 标注框边框类型.
 *
 * WITHTIPBOX: 带角矩形边框
 *
 * RECTBOX: 矩形边框
 *
 * NONEBOX: 无边框
 */
SuperMap.Plot.TextBoxType = {
    WITHTIPBOX: 0,
    RECTBOX: 1,
    NONEBOX: 2
};

