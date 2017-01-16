/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Strategy
 * 矢量图层策略(strategy)的抽象类。使用策略类的实现子类进行实例化而不要直
 *     接实例化这个类。
 */
SuperMap.Strategy = SuperMap.Class({
    
    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>} The layer this strategy belongs to.
     */
    layer: null,
    
    /**
     * Property: options
     * {Object} Any options sent to the constructor.
     */
    options: null,

    /** 
     * Property: active 
     * {Boolean} The control is active.
     */
    active: null,

    /**
     * Property: autoActivate
     * {Boolean} The creator of the strategy can set autoActivate to false
     *      to fully control when the protocol is activated and deactivated.
     *      Defaults to true.
     */
    autoActivate: true,

    /**
     * Property: autoDestroy
     * {Boolean} The creator of the strategy can set autoDestroy to false
     *      to fully control when the strategy is destroyed. Defaults to
     *      true.
     */
    autoDestroy: true,

    /**
     * Constructor: SuperMap.Strategy
     * 矢量策略(strategy)的抽象类，使用其实现子类来实例化。
     *
     * Parameters:
     * options - {Object} 可选的选项(Optional )对象，其属性会被设置到实例。
     */
    initialize: function(options) {
        SuperMap.Util.extend(this, options);
        this.options = options;
        // set the active property here, so that user cannot override it
        this.active = false;
    },
    
    /**
     * APIMethod: destroy
     * 清除策略(strategy)。
     */
    destroy: function() {
        this.deactivate();
        this.layer = null;
        this.options = null;
    },

    /**
     * Method: setLayer
     * Called to set the <layer> property.
     *
     * Parameters:
     * layer - {<SuperMap.Layer.Vector>}
     */
    setLayer: function(layer) {
        this.layer = layer;
    },
    
    /**
     * Method: activate
     * Activate the strategy.  Register any listeners, do appropriate setup.
     *
     * Returns:
     * {Boolean} True if the strategy was successfully activated or false if
     *      the strategy was already active.
     */
    activate: function() {
        if (!this.active) {
            this.active = true;
            return true;
        }
        return false;
    },
    
    /**
     * Method: deactivate
     * Deactivate the strategy.  Unregister any listeners, do appropriate
     *     tear-down.
     *
     * Returns:
     * {Boolean} True if the strategy was successfully deactivated or false if
     *      the strategy was already inactive.
     */
    deactivate: function() {
        if (this.active) {
            this.active = false;
            return true;
        }
        return false;
    },
   
    CLASS_NAME: "SuperMap.Strategy" 
});
