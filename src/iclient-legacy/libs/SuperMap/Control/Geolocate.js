/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Geometry/Point.js
 * @requires SuperMap/Projection.js
 */

/**
 * Class: SuperMap.Control.Geolocate
 * 地理定位控件包装了w3c 的geolocation 接口，与map结合使用；在位置改变时可以响应事件。
 *
 * 通过 activate 和 deactivate 两个方法，实现动态的激活和注销。
 * 
 * 可用 activate 激活控件，方法如下：
 * (code)
 *  geolocate.activate();
 * (end)
 * 注销控件可用 deactivate 方法实现，方法如下：
 * (code)
 * geolocate.deactivate();
 * (end)
 * 
 * 如果map控件的投影不是 EPSG:4326 或者 EPSG:900913 时需要加载proj4js 库。
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.Geolocate = SuperMap.Class(SuperMap.Control, {

    /**
     * Constant: EVENT_TYPES
     * 支持的事件类型:
     *  - *locationupdated* 当浏览器返回新的位置时触发。
     *  - *locationfailed* 当地理定位失败时触发。
     *  - *locationuncapable* 当前浏览器不支持地理定位时触发。
     */
    EVENT_TYPES: ["locationupdated", "locationfailed", "locationuncapable"],

    /**
     * Property: geolocation
     * {Object} 获取地理位置信息 。默认为navigator.geolocation， 获取基于浏览器的当前用户地理位置。
     */
    geolocation: navigator.geolocation,

    /**
     * APIProperty: bind
     * {Boolean} 地理位置改变时，当前地图的中心点是否变化。默认为true，地图中心点会变化。
     */
    bind: true,

    /**
     * APIProperty: watch
     * {Boolean} 地理位置是否经常更新。默认为false，地理位置不会更新。
     */
    watch: false,

    /**
     * APIProperty: geolocationOptions
     * {Object} 传递给 geolocation api 的可选参数。默认不传递任何参数。
     *     参数可选：
     *         enableHighAccuracy：指示浏览器获取高精度的位置，默认为false.
     *         timeout：指定获取地理位置的超时时间，单位毫秒（ms），默认为不限时。
     *        maximumAge：最长有效期，在重复获取地理位置时， 此参数指定多久再次获取位置。默认为0，表示浏览器需要立刻重新计算位置。
     *  参数详见： <http://dev.w3.org/geo/api/spec-source.html> 。
     */
    geolocationOptions: null,

    /**
     * Constructor: SuperMap.Control.Geolocate
     * 创建 Geolocate 新对象，创建方法如下：
     * 
     * (code)
     * //实例化 Geolocate 对象
     * var geolocate = new SuperMap.Control.Geolocate({
     *     bind:false,
     *     //geolocationOption 的参数可以参见 <http://dev.w3.org/geo/api/spec-source.html>
     *     geolocationOption:{
     *         enableHighAccuracy:false,
     *         timeout:7000,
     *         maximumAge:0
     *     }
     * });
     * var map = new SuperMap.Map("map");	 
     * map.addControl(geolocate);
     * //激活控件	 
     * geolocate.activate();	 
     * 	 
     * //监听了 locationupdated 和 locationFailed 两事件
     * //当返回新的位置时触发 locationupdated 事件，定位失败时触发 locationFailed 事件
     * geolocate.events.on({
     *     "locationupdated":locationupdatedCompleted,
     *     "locationFailed":locationFailed
     * });
     * 	 
     * //定义 locationupdated 事件的响应函数，需要传入event参数，该参数具有 position 和 point 两个属性
     * //其中，position 属性表示的是经纬度坐标，point 是具有x,y坐标值的几何点对象。
     * function locationupdatedCompleted (event){
     *     //TODO
     * }
     * 
     * 
     * function locationFailed (event){
     *     //TODO
     * }
     * (end)
     */
    initialize: function(options) {
        // concatenate events specific to this control with those from the base
        this.EVENT_TYPES =
            SuperMap.Control.Geolocate.prototype.EVENT_TYPES.concat(
            SuperMap.Control.prototype.EVENT_TYPES
        );
        this.geolocationOptions = {};
        SuperMap.Control.prototype.initialize.apply(this, [options]);
    },

    /**
     * Method: destroy
     *  销毁该类，释放引用的资源。
     */
    destroy: function() {
        this.deactivate();
        SuperMap.Control.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: activate
     * 激活控件和要素处理程序。
     *
     * Returns:
     * {Boolean} 该控件是否成功被激活。
     */
    activate: function () {
        if (!this.geolocation) {
            this.events.triggerEvent("locationuncapable");
            return false;
        }
        if (SuperMap.Control.prototype.activate.apply(this, arguments)) {
            if (this.watch) {
                this.watchId = this.geolocation.watchPosition(
                    SuperMap.Function.bind(this.geolocate, this),
                    SuperMap.Function.bind(this.failure, this),
                    this.geolocationOptions
                );
            } else {
                this.getCurrentLocation();
            }
            return true;
        }
        return false;
    },

    /**
     * Method: deactivate
     * 取消激活控件和要素处理函数。
     *
     * Returns:
     * {Boolean} 该控件是否成功被注销。
     */
    deactivate: function () {
        if (this.active && this.watchId !== null) {
            this.geolocation.clearWatch(this.watchId);
        }
        return SuperMap.Control.prototype.deactivate.apply(
            this, arguments
        );
    },

    /**
     * Method: geolocate
     * 浏览器获取当前的地理位置 。
     *
     */
    geolocate: function (position) {
        var center = new SuperMap.LonLat(
            position.coords.longitude,
            position.coords.latitude
        ).transform(
            new SuperMap.Projection("EPSG:4326"),
            this.map.getProjectionObject()
        );
        if (this.bind) {
            this.map.setCenter(center);
        }
        this.events.triggerEvent("locationupdated", {
            position: position,
            point: new SuperMap.Geometry.Point(
                center.lon, center.lat
            )
        });
    },

    /**
     * APIMethod: getCurrentLocation
     * 获取当前的地理位置。
     *
     * Returns:
     * {Boolean} 当前控件未激活或者watch属性为false时返回false，否则返回true。
     */
    getCurrentLocation: function() {
        if (!this.active || this.watch) {
            return false;
        }
        this.geolocation.getCurrentPosition(
            SuperMap.Function.bind(this.geolocate, this),
            SuperMap.Function.bind(this.failure, this),
            this.geolocationOptions
        );
        return true;
    },

    /**
     * Method: failure
     * 浏览器定位失败
     *
     */
    failure: function (error) {
        this.events.triggerEvent("locationfailed", {error: error});
    },

    CLASS_NAME: "SuperMap.Control.Geolocate"
});
