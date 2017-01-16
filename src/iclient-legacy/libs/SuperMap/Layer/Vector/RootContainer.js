/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Vector.js
 */

/**
 * Class: SuperMap.Layer.Vector.RootContainer
 * 一个特殊的图层类型，在一个独立的渲染器中结合了多个矢量图层，
 * 该类不支持从用户空间实例化，是大量矢量图层处理事件的控件的辅助类。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Vector>
 */
SuperMap.Layer.Vector.RootContainer = SuperMap.Class(SuperMap.Layer.Vector, {
    
    /**
     * Property: displayInLayerSwitcher
     * Set to false for this layer type
     * 是否在图层管理器中显示。
     */
    displayInLayerSwitcher: false,
    
    /**
     * APIProperty: layers
     * 附加到容器中的图层，需要配置选项。
     */
    layers: null,
    
    /**
     * Constructor: SuperMap.Layer.Vector.RootContainer
     * 创建新的大量矢量图层根容器，构造函数不支持用于用户空间，仅仅被大量矢量图层的要素选择的控件使用。
     *
     * Parameters:
     * name - {String} 图层名字。
     * options - {Object} 设置在图层上的带有非默认属性的可选对象
     * 
     * Required options properties:
     * layers - {Array(<SuperMap.Layer.Vector>)} 当前渲染器管理的图层。
     *
     * Returns:
     * {<SuperMap.Layer.Vector.RootContainer>} 一个新的矢量图层的根容器。
     */
    initialize: function(name, options) {
        SuperMap.Layer.Vector.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * Method: display
     */
    display: function() {},
    
    /**
     * Method: getFeatureFromEvent
     * walk through the layers to find the feature returned by the event
     * 
     * Parameters:
     * evt - {Object} event object with a feature property
     * 
     * Returns:
     * {<SuperMap.Feature.Vector>}返回的矢量要素。
     */
    getFeatureFromEvent: function(evt) {
        var layers = this.layers;
        var feature;
        for(var i=0; i<layers.length; i++) {
            feature = layers[i].getFeatureFromEvent(evt);
            if(feature) {
                return feature;
            }
        }
    },
    
    /**
     * Method: setMap
     * 绑定map对象，常在map里添加图层的时候使用。
     * Parameters:
     * map - {<SuperMap.Map>}需要要绑定的map。
     */
    setMap: function(map) {
        SuperMap.Layer.Vector.prototype.setMap.apply(this, arguments);
        this.collectRoots();

        for(var i=0;i<this.layers.length;i++){
            this.layers[i].div.style.pointerEvents = "none";
        }

        map.events.register("changelayer", this, this.handleChangeLayer);
    },
    
    /**
     * Method: removeMap
     * 移出map。
     * Parameters:
     * map - {<SuperMap.Map>}图层所绑定的map。
     */
    removeMap: function(map) {
        map.events.unregister("changelayer", this, this.handleChangeLayer);
        this.resetRoots();
        SuperMap.Layer.Vector.prototype.removeMap.apply(this, arguments);
    },
    
    /**
     * Method: collectRoots
     * Collects the root nodes of all layers this control is configured with
     * and moveswien the nodes to this control's layer
     */
    collectRoots: function() {
        var layer;
        // walk through all map layers, because we want to keep the order
        for(var i=0; i<this.map.layers.length; ++i) {
            layer = this.map.layers[i];
            if(SuperMap.Util.indexOf(this.layers, layer) !== -1) {
                layer.renderer.moveRoot(this.renderer);
            }
        }
    },
    
    /**
     * Method: resetRoots
     * Resets the root nodes back into the layers they belong to.
     */
    resetRoots: function() {
        var layer;
        for(var i=0; i<this.layers.length; ++i) {
            layer = this.layers[i];
            if(this.renderer && layer.renderer.getRenderLayerId() === this.id) {
                this.renderer.moveRoot(layer.renderer);
            }
        }
    },
    
    /**
     * Method: handleChangeLayer
     * Event handler for the map's changelayer event. We need to rebuild
     * this container's layer dom if order of one of its layers changes.
     * This handler is added with the setMap method, and removed with the
     * removeMap method.
     * 
     * Parameters:
     * evt - {Object}
     */
    handleChangeLayer: function(evt) {
        var layer = evt.layer;
        if(evt.property === "order" &&
                        SuperMap.Util.indexOf(this.layers, layer) !== -1) {
            this.resetRoots();
            this.collectRoots();
        }
    },

    CLASS_NAME: "SuperMap.Layer.Vector.RootContainer"
});
