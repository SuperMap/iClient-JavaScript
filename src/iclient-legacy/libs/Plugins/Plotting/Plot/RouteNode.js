/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.RouteNode
 * 航线节点信息
 */
SuperMap.Plot.RouteNode = new SuperMap.Class({

    /**
     * APIProperty: id
     * {Integer} 航线节点的id
     */
    id: null,

    /**
     * APIProperty: type
     * {Integer} 航线节点类型
     */
    type: null,

    /**
     * APIProperty: position
     * {<SuperMap.Geometry.Point>} 航线节点位置
     */
    positionPoint: null,

    /**
     * APIProperty: index
     * {Integer} 节点在航线中的位置
     */
    index: null,

    /**
     * Property: rotate
     * {Float} 待机点外部包围圆的旋转角度
     */
    rotate: 0,

    /**
     * APIProperty: towardNodes
     *  {<SuperMap.Plot.TowardNode>} 指向节点
     */
    towardNodes: null,

    /**
     * APIProperty: style
     *  {Object | {}} 航线点样式
     */
    style: null,

    /**
     * Constructor: SuperMap.Plot.RouteNode
     * 航线节点。
     *
     * Parameters:
     * options - {Object} 航线节点
     *
     * Returns:
     * {<SuperMap.Plot.RouteNode>} 新的航线节点。
     */
    initialize:function(options){
        SuperMap.Util.extend(this, options);
        if(this.id === null){
            this.id = SuperMap.Plot.PlottingUtil.generateUuid();
        }

        if(this.rotate === null){
            this.rotate = 0;
        }

        if(this.towardNodes === null){
            this.towardNodes = [];
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.type = null;
        this.position = null;
        this.index = null;
        this.id = null;
        this.rotate = null;

        if(!this.towardNodes || null === this.towardNodes){
            this.towardNodes = null;
        }

        for(var i = 0; i < this.towardNodes.length; i++){
            this.towardNodes[i].destroy();
        }

        this.towardNodes = null;
    },

    /**
     * APIMethod: clone
     * 克隆航线点对象。
     *
     * Returns:
     * {<SuperMap.Plot.RouteNode>} 克隆后的航线点对象。
     */
    clone: function() {
        var options = {
            id: this.id,
            type: this.type,
            index: this.index,
            rotate: this.rotate,
            towardNodes: this.towardNodes
        };

        var obj = new SuperMap.Plot.RouteNode(options);

        obj.positionPoint = this.positionPoint.clone();

        obj.style = {};
        obj.style = SuperMap.Util.copyAttributes(obj.style, this.style);

        return obj;
    },

    CLASS_NAME:"SuperMap.Plot.RouteNode"
});