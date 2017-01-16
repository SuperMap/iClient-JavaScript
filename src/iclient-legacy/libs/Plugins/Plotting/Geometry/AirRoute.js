/**
 * Created by Administrator on 2016/11/7.
 */
/**
 * Class: SuperMap.Geometry.AirRoute
 * KJ航线对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.Route>
 */
SuperMap.Geometry.AirRoute = new SuperMap.Class(SuperMap.Geometry.Route,{

    /**
     * APIProperty: space
     * {Integer} 标牌文字和航线的距离
     */
    space: null,

    /**
     * APIProperty: inner
     * {Boolean} 标牌文字在航线的内侧
     */
    inner: null,

    /**
     * Constructor: SuperMap.Geometry.AirRoute
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AirRoute>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.Route.prototype.initialize.apply(this, arguments);

        //自己特有
        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.AIRROUTE;
        this.symbolType = SuperMap.Plot.SymbolType.AIRROUTE;
        this.symbolName = "AirRoute";

        if(this.space === null){
            this.space = 20;
        }

        if(this.inner === null){
            this.inner = false;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.space = null;
        this.inner = null;
        SuperMap.Geometry.PlottingGeometry.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.initRoute();

        if(undefined !== this.arrRoutePts && null !== this.arrRoutePts){
            for(var i = 0; i < this.arrRoutePts.length; i++){
                //创建连线
                var linePts = this.arrRoutePts[i];
                if(!SuperMap.Util.isArray(linePts) || linePts.length < 2){
                    continue;
                }
                var lineFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, {layer: this.layer});
                this.components.push(lineFeature);
            }
        }

        for(var i = 0; i < this.routeNodes.length; i++){
            var routeNode = this.routeNodes[i];
            if(null === routeNode){
                continue;
            }

            if(!routeNode.towardNodes || null === routeNode.towardNodes){
                continue;
            }

            for(var j = 0; j < routeNode.towardNodes.length; j++){
                if(!routeNode.towardNodes[j] instanceof SuperMap.Plot.TowardNode){
                    continue;
                }

                var toNode = this.getNodeByUuid(routeNode.towardNodes[j].routeNodeId);
                if(null === toNode){
                    continue;
                }

                ////创建连线
                //var linePts = [];
                //linePts.push(routeNode.positionPoint);
                //linePts.push(toNode.positionPoint);
                //var lineFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.POLYLINESYMBOL, linePts, {layer: this.layer});
                //lineFeature.startRouteNode = routeNode.id;
                //lineFeature.endRouteNode = toNode.id;
                //this.components.push(lineFeature);

                //创建注记
                this.createLiterateSign(routeNode, routeNode.towardNodes[j]);
            }

            //创建节点
            this.createRouteNode(routeNode);
        }

        if(this.feature !== null){
            for(var i = 0; i < this.components.length; i++){
                this.components[i].style = SuperMap.Util.copyAttributes(this.components[i].style, this.feature.style);
            }
        }
       // this.calculateTracking();
    },

    /**
     * Method: createLiterateSign
     * 创建标牌文字。
     *
     */
    createLiterateSign: function(routeNode, towardNode){
        if(towardNode.textContent !== null && towardNode.textContent.length !== 0){
            var textFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.LITERATESIGN, null, {
                layer: this.layer, startRouteNode: routeNode, towardNode: towardNode, route: this, inner: this.inner, space: this.space});
            textFeature.layer = this.layer;
            textFeature.startRouteNode = routeNode.id;
            textFeature.endRouteNode = towardNode.routeNodeId;
            this.components.push(textFeature);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AirRoute"
});