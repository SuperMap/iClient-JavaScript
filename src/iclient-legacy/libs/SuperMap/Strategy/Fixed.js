/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Strategy.js
 */

/**
 * Class: SuperMap.Strategy.Fixed
 * 用来控制只执行一次请求的策略，不会反复请求新数据。
 *
 * Inherits from:
 *  - <SuperMap.Strategy>
 */
SuperMap.Strategy.Fixed = SuperMap.Class(SuperMap.Strategy, {
    
    /**
     * APIProperty: preload
     * {Boolean} 是否在图层显示之前就开始加载数据，默认为false.
     * 当你的数据量很大时，慎重设置此属性为true
     */
    preload: false,

    /**
     * Constructor: SuperMap.Strategy.Fixed
     * 构造一个新的 Fixed 策略对象.
     *
     * Parameters:
     * options - {Object} 将会被加到策略对象上的可选参数
     */

    /**
     * Method: activate
     * 激活此策略：加载数据或者添加一个监听者以在图层可视时加载数据
     *
     * Returns:
     * {Boolean} 当激活成功时返回true，否则返回false
     */
    activate: function() {
        var activated = SuperMap.Strategy.prototype.activate.apply(this, arguments);
        if(activated) {
            this.layer.events.on({
                "refresh": this.load,
                scope: this
            });
            if(this.layer.visibility == true || this.preload) {
                this.load();
            } else {
                this.layer.events.on({
                    "visibilitychanged": this.load,
                    scope: this
                });
            }
        }
        return activated;
    },
    
    /**
     * Method: deactivate
     * 关闭此策略.  撤消在激活时所进行的操作
     * 
     * Returns:
     * {Boolean} 当关闭成功时返回true，否则返回false
     */
    deactivate: function() {
        var deactivated = SuperMap.Strategy.prototype.deactivate.call(this);
        if(deactivated) {
            this.layer.events.un({
                "refresh": this.load,
                "visibilitychanged": this.load,
                scope: this
            });
        }
        return deactivated;
    },

    /**
     * Method: load
     * 调用layer里的protocol来加载数据并取消对visibilitychanged的监听
     *
     * Parameters:
     * options - {Object} 要传递给protocol进行读取的参数
     */
    load: function(options) {
        var layer = this.layer;
        layer.events.triggerEvent("loadstart", {filter: layer.filter});
        layer.protocol.read(SuperMap.Util.applyDefaults({
            callback: this.merge,
            filter: layer.filter,
            scope: this
        }, options));
        layer.events.un({
            "visibilitychanged": this.load,
            scope: this
        });
    },

    /**
     * Method: merge
     * 将所有的要素都添加到图层上.
     *     如果要素图层的坐标参考系与地图的不一样，那么要素图层将会被转换为地图的坐标参考系
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>} 由protocol传递回来的 response 对象
     */
    merge: function(resp) {
        var layer = this.layer;
        layer.destroyFeatures();
        var features = resp.features;
        if (features && features.length > 0) {
            var remote = layer.projection;
            var local = layer.map.getProjectionObject();
            if(!local.equals(remote)) {
                var geom;
                for(var i=0, len=features.length; i<len; ++i) {
                    geom = features[i].geometry;
                    if(geom) {
                        geom.transform(remote, local);
                    }
                }
            }
            layer.addFeatures(features);
        }
        layer.events.triggerEvent("loadend", {response: resp});
    },

    CLASS_NAME: "SuperMap.Strategy.Fixed"
});
