/**
 * 基础云平台包结构
 */
SuperMap.Cloud=SuperMap.Cloud||{};

/**
 * Constant: SuperMap.Cloud.RouteType
 * {Object} 定义了路径导航行分析时所用的模式。
 *
 * MINLENGTH: "MINLENGTH", 距离最短
 *
 * NOHIGHWAY: "NOHIGHWAY", 不走高速
 *
 * RECOMMEND: "RECOMMEND", 推荐模式 
 */
SuperMap.Cloud.RouteType = {
	MINLENGTH: "MINLENGTH", 
	NOHIGHWAY: "NOHIGHWAY", 
	RECOMMEND: "RECOMMEND" 
};

/**
 * Constant: SuperMap.Cloud.TrafficTransferLineType
 * {Object} 定义了公交换乘的路线类型。
 *
 * BUS: "BUS", 公交
 *
 * SUBWAY: "SUBWAY", 地铁
 *
 * WALK: "WALK", 步行 
 */
SuperMap.Cloud.TrafficTransferLineType = {
    BUS: "BUS",
    SUBWAY: "SUBWAY",
    WALK: "WALK"
}
