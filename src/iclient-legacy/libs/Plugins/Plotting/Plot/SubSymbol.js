/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.SubSymbol
 * 子标号信息
 */
SuperMap.Plot.SubSymbol = new SuperMap.Class({

    /**
     * APIProperty: libID
     * {Integer} 标号的库ID
     */
    libID: null,

    /**
     * APIProperty: code
     * {Integer} 标号的代码
     */
    code: null,

    /**
     * APIProperty: symbolData
     * {Object} 子标号数据
     */
    symbolData: null,

    /**
     * APIProperty: textContent
     * {Integer} 子标号的注记
     */
    textContent: null,

    /**
     * APIProperty: totalNum
     * {Integer} 子标号个数
     */
    totalNum: null,

    /**
     * Constructor: SuperMap.Plot.SitDataStruct
     * 创建一个态势图信息结构。
     *
     * Parameters:
     * options - {Object} 态势图参数
     *
     * Returns:
     * {<SuperMap.Plot.SitDataStruct>} 新的图层结构。
     */
    initialize:function(libID, code, options){
        if(libID){
            this.libID = libID;
        }

        if(code){
            this.code = code;
        }

        if(options){
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.libID = null;
        this.code = null;
        this.symbolData = null;
        this.totalNum = null;
    },

    /**
     * APIMethod: clone
     * 克隆航线点对象。
     *
     * Returns:
     * {<SuperMap.Plot.RouteNode>} 克隆后的航线点对象。
     */
    clone: function() {
        var obj = new SuperMap.Plot.SubSymbol(this.libID, this.code);

        obj.symbolData = {};
        obj.symbolData = SuperMap.Util.copyAttributes(obj.symbolData, this.symbolData);

        obj.textContent = this.textContent;
        obj.totalNum = this.totalNum;

        return obj;
    },

    CLASS_NAME:"SuperMap.Plot.SubSymbol"
});