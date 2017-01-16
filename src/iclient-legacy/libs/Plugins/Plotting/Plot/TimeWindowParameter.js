/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.TimeWindowParameter
 * 卫星轨道星下点
 */
SuperMap.Plot.TimeWindowParameter = new SuperMap.Class({

    ///**
    // * APIProperty: type
    // * {String} 序号("Number")或者时间("Time")
    // */
    //type: null,

    /**
     * APIProperty: startOrbitPoint
     * {Integer|String} 起始卫星轨道点序号或者时间
     */
    startOrbitPoint: null,

    /**
     * APIProperty: startOrbitPoint
     * {Integer|String} 结束卫星轨道点序号或者时间
     */
    endOrbitPoint: null,

    /**
     * Constructor: SuperMap.Plot.TimeWindowParameter
     * 可见时间窗参数。
     *
     * Parameters:
     * x - {Float} 经度
     * y - {Float} 纬度
     * z - {Float} 高度
     * number - {Integer} 序号
     * time - {String} 时间
     *
     * Returns:
     * {<SuperMap.Plot.TimeWindowParameter>} 新的可见时间窗参数。
     */
    initialize:function(startOrbitPoint, endOrbitPoint){
        this.startOrbitPoint = startOrbitPoint;
        this.endOrbitPoint = endOrbitPoint;
        //if (type && type === "Time") {
        //    this.type = "Time";
        //} else {
        //    this.type = "Number";
        //}
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.startOrbitPoint = null;
        this.endOrbitPoint = null;
        this.type = null;
    },

    CLASS_NAME:"SuperMap.Plot.TimeWindowParameter"
});