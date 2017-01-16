/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.OrbitPoint
 * 卫星轨道星下点
 */
SuperMap.Plot.OrbitPoint = new SuperMap.Class({

    /**
     * APIProperty: x
     * {Integer} 星下点经度
     */
    x: null,

    /**
     * APIProperty: y
     * {Integer} 星下点纬度
     */
    y: null,

    /**
     * APIProperty: z
     * {Integer} 星下点高度
     */
    z: null,

    /**
     * APIProperty: number
     *  {Integer} 星下点序号
     */
    number: null,

    /**
     * APIProperty: time
     *  {String} 星下点时间
     */
    time: null,

    /**
     * Constructor: SuperMap.Plot.OrbitPoint
     * 卫星轨道星下点。
     *
     * Parameters:
     * x - {Float} 经度
     * y - {Float} 纬度
     * z - {Float} 高度
     * number - {Integer} 序号
     * time - {String} 时间
     *
     * Returns:
     * {<SuperMap.Plot.OrbitPoint>} 新的卫星轨道星下点。
     */
    initialize:function(x, y, z, number, time){
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        if (z || z == 0) {
            this.z = parseFloat(z);
        }
        if(number){
            this.number = number;
        }
        if(time){
            this.time = time;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.x = null;
        this.y = null;
        this.z = null;
        this.index = null;
        this.time = null;
    },
    /**
     * APIMethod: clone
     * 克隆点对象。
     * Returns:
     * {<SuperMap.Plot.OrbitPoint>} 克隆后的点对象。
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new SuperMap.Plot.OrbitPoint(this.x, this.y,this.z);
        }

        // catch any randomly tagged-on properties
        SuperMap.Util.applyDefaults(obj, this);

        return obj;
    },

    CLASS_NAME:"SuperMap.Plot.OrbitPoint"
});