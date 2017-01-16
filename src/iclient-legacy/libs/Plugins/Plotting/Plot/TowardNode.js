
/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.TowardNode
 * 航线节点信息
 */
SuperMap.Plot.TowardNode = new SuperMap.Class({
    /**
     * APIProperty: routeNodeId
     * {String} 指向节点对象的routeNodeId
     */
    routeNodeId: null,

    /**
     * APIProperty: relLineText
     * {<SuperMap.Plot.RelLineText>} HJ航线文字与沿线的关系
     */
    relLineText: null,

    /**
     * APIProperty: textContent
     * {Array(String)} 两个节点间文字内容，文字内容保存在指向节点上。
     */
    textContent: null,

    /**
     * APIProperty: offsetX
     * {Integer} 标牌文字与两航站点的中间点的X偏移量
     */
    offsetX: null,

    /**
     * APIProperty: offsetY
     * {Integer} 标牌文字与两航站点的中间点的Y偏移量
     */
    offsetY: null,

    /**
     * Constructor: SuperMap.Plot.TowardNode
     * 指向节点。
     *
     * Parameters:
     * options - {Object} 指向节点参数
     *
     * Returns:
     * {<SuperMap.Plot.TowardNode>} 新的指向节点。
     */
    initialize:function(options){
        SuperMap.Util.extend(this, options);

        if(this.relLineText === null){
            this.relLineText = SuperMap.Plot.RelLineText.ONLEFTLINE;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.routeNodeId = null;
        this.relLineText = null;
        this.textContent = null;
    },

    /**
     * APIMethod: clone
     * 克隆航线点对象。
     *
     * Returns:
     * {<SuperMap.Plot.RouteNode>} 克隆后的航线点对象。
     */
    clone: function() {
        var options = { routeNodeId: this.routeNodeId,
            relLineText: this.relLineText,
            textContent: this.textContent }

        return new SuperMap.Plot.TowardNode(options);
    },

    CLASS_NAME:"SuperMap.Plot.TowardNode"
});