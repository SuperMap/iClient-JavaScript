/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Handler/Drag.js
 */

/**
 * Class: SuperMap.Control.DragPan
 * 该类可通过鼠标拖拽的方式平移地图。
 * 
 * 可以通过使用 activate 和 deactivate 实现动态的激活和注销。
 *
 * 激活控件时，可用：
 * (code)
 * dragPan.activate();
 * (end)
 * 注销控件时可用：
 * (code)
 * drag.deactivate();
 * (end)
 *
 * DragPan 控件的使用方法，如下：
 * (code)
 * //实例化 DragPan 控件 
 * var dragPan = new SuperMap.Control.DragPan(); 
 *  
 * //将 dragPan 控件添加到 map  
 * var map = new SuperMap.Map("map",{controls:[dragPan]});
 *
 * //激活控件
 * dragPan.activate(); 
 * (end)
 *  
 * 也可以通过 map 的 addControl() 方法添加控件，如：
 * (code)
 * var map = new SuperMap.Map("map");
 * map.addControl(dragPan);
 * (end)
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.DragPan = SuperMap.Class(SuperMap.Control, {

    /** 
     * Property: type
     * {SuperMap.Control.TYPES}
     */
    type: SuperMap.Control.TYPE_TOOL,
    
    /**
     * Property: panned
     * {Boolean} The map moved.
     */
    panned: false,
    
    /**
     * Property: interval
     * {Integer} The number of milliseconds that should ellapse before
     *     panning the map again. Defaults to 1 millisecond. In most cases
     *     you won't want to change this value. For slow machines/devices
     *     larger values can be tried out.
     *  间隔 1毫秒底层渲染一次，如果浏览器反应不灵敏，1毫秒会造成运算量大，可能导致浏览器崩溃。
     *  避免出现这种情况，可以将interval的值设置为1000，间隔1秒平移地图一次。
     */
    interval: 1,
    
    /**
     * APIProperty: documentDrag
     * {Boolean} 当该属性为true，拖拽地图时，鼠标移动到地图可视区域外依然有效。默认为false。
     */
    documentDrag: false,

    /**
     * Property: kinetic
     * {SuperMap.Kinetic} The SuperMap.Kinetic object.
     */
    kinetic: null,

    /**
     * APIProperty: enableKinetic
     * {Boolean} 设置是否使用拖拽动画。默认为false，不使用动画。
     */
    enableKinetic: false,

    /**
     * APIProperty: kineticInterval
     * {Integer} 执行动画的间隔，默认为10，单位是毫秒。
     */
    kineticInterval: 10,

    /**
     * Method: draw
     * 创建一个事件处理器 ，将<panMap>和 <panMapDone>作为回调函数。
     *
     */    
    draw: function() {
        if(this.enableKinetic) {
            var config = {interval: this.kineticInterval};
            if(typeof this.enableKinetic === "object") {
                config = SuperMap.Util.extend(config, this.enableKinetic);
            }
            this.kinetic = new SuperMap.Kinetic(config);
        }
        this.handler = new SuperMap.Handler.Drag(this, {
                "move": this.panMap,
                "done": this.panMapDone,
                "down": this.panMapStart
            }, {
                interval: this.interval,
                documentDrag: this.documentDrag
            }
        );
    },

    /**
     * Method: panMapStart
     * 通过鼠标移动地图的开始开始调用该方法 。
     *
     */
    panMapStart: function() {
        if(this.kinetic && this.map.isIESingleTouch) {
        //if(this.kinetic) {
            this.kinetic.begin();
        }
    },

    /**
    * Method: panMap
    *   移动过程中调用该方法。
     *
    * Parameters:
    * xy - {<SuperMap.Pixel>} Pixel of the mouse position
     * xy-{<SuperMap.Pixel>} 当前鼠标获取的像素坐标
    */
    panMap: function(xy) {
        if(!this.map.isIESingleTouch) return;
        if(this.kinetic) {
            this.kinetic.update(xy);
        }
        this.panned = true;
        this.map.pan(
            this.handler.last.x - xy.x,
            this.handler.last.y - xy.y,
            {dragging: true, animate: false}
        );
    },
    
    /**
     * Method: panMapDone
     * Finish the panning operation.  Only call setCenter (through <panMap>)
     *     if the map has actually been moved.
     *地图完成移动的过程，调用该方法 。
     *
     * Parameters:
     * xy - {<SuperMap.Pixel>} 当前鼠标获取的像素坐标。
     */
    panMapDone: function(xy) {
        if(!this.map.isIESingleTouch) return;
        if(this.panned) {
            var res = null;
            if (this.kinetic) {
                res = this.kinetic.end(xy);
            }
            this.map.pan(
                this.handler.last.x - xy.x,
                this.handler.last.y - xy.y,
                {dragging: !!res, animate: false}
            );
            if (res) {
                var self = this;
                this.kinetic.move(res, function(x, y, end) {
                    self.map.pan(x, y, {dragging: !end, animate: false});
                });
            }
            this.panned = false;
        }
    },

    CLASS_NAME: "SuperMap.Control.DragPan"
});
