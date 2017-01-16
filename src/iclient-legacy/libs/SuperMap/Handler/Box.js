/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 * @requires SuperMap/Handler/Drag.js
 */

/**
 * Class: SuperMap.Handler.Box
 * 地图拖拽矩形框的控制事件处理器，这个矩形在按下鼠标的时候开始显示，然后移动鼠标，最后在鼠标松开时完成。
 *
 * Inherits from:
 *  - <SuperMap.Handler> 
 */
SuperMap.Handler.Box = SuperMap.Class(SuperMap.Handler, {

    /** 
     * Property: dragHandler 
     * {<SuperMap.Handler.Drag>} 
     */
    dragHandler: null,

    /**
     * APIProperty: boxDivClassName
     * {String} 应用到拖拽矩形的css样式名称。默认值是 smHandlerBoxZoomBox。
     */
    boxDivClassName: 'smHandlerBoxZoomBox',
    
    /**
     * Property: boxOffsets
     * {Object} Caches box offsets from css. This is used by the getBoxOffsets
     * method.
     */
    boxOffsets: null,

    /**
     * APIProperty: cursorCSS
     * {String} 设置鼠标CSS样式
     *
     * 比如拉框放大缩小控件的使用，可以创建新的控件:
     *  (code)
     *  var zoomBox = new SuperMap.Control.ZoomBox({out:true}, {cursorCSS:"url('./images/aero_arrow.cur'), default"});
     *  map.addControl(zoomBox);
     *  zoomBox.activate();
     * (end)
     *
     * 或者在map的构造函数中添加:
     *  (code)
     *   var zoombox = new SuperMap.Control.ZoomBox(null, {cursorCSS:"url('./images/aero_arrow.cur'), default"})
     *   map = new SuperMap.Map("map",{
     *          controls: [zoombox]
     *   });
     *   zoombox.activate();
     * (end)
     */
    cursorCSS:null,

    /**
     * Constructor: SuperMap.Handler.Box
     * 创建一个box事件处理器。
     *  
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器对象的控件，如果控件拥有一个有效的地图属性引用，则会被事件处理器的seMap方法使用。如果在options中明确指定了map属性，则以
     * 后者为准传入setMap方法。
     * callbacks - {Object} 回调函数对象，详细事件信息参见下面的描述。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     *
     * Named callbacks:
     * start - 开始事件，当矩形框开始拖拽时触发。
     * done - 完成事件，当矩形框拖拽操作完成时触发。
     *     回调函数接受一个参数，矩形框的bounds或者一个像素坐标。
     *     如果矩形框的宽、高小于5像素，则返回当前鼠标的像素位置代替矩形框的bounds信息。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.prototype.initialize.apply(this, arguments);
        this.dragHandler = new SuperMap.Handler.Drag(
            this, 
            {
                down: this.startBox, 
                move: this.moveBox, 
                out: this.removeBox,
                up: this.endBox
            }, 
            {keyMask: this.keyMask}
        );
        if (options && options.cursorCSS) {
            this.cursorCSS = options.cursorCSS;
        }
    },

    /**
     * Method: destroy
     */
    destroy: function() {
        SuperMap.Handler.prototype.destroy.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.destroy();
            this.dragHandler = null;
        }            
    },

    /**
     * Method: setMap
     */
    setMap: function (map) {
        SuperMap.Handler.prototype.setMap.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.setMap(map);
        }
    },

    /**
    * Method: startBox
    *
    * Parameters:
    * xy - {<SuperMap.Pixel>}
    */
    startBox: function (xy) {
        this.callback("start", []);
        this.zoomBox = SuperMap.Util.createDiv('zoomBox', {
            x: -9999, y: -9999
        });
        this.zoomBox.className = this.boxDivClassName;                                         
        this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
        
        this.map.eventsDiv.appendChild(this.zoomBox);
        
        SuperMap.Element.addClass(
            this.map.eventsDiv, "smDrawBox"
        );
        if(this.cursorCSS){
            this.map.eventsDiv.style.cursor = this.cursorCSS;
        }
    },

    /**
    * Method: moveBox
    */
    moveBox: function (xy) {
        var startX = this.dragHandler.start.x;
        var startY = this.dragHandler.start.y;
        var deltaX = Math.abs(startX - xy.x);
        var deltaY = Math.abs(startY - xy.y);

        var offset = this.getBoxOffsets();
        this.zoomBox.style.width = (deltaX + offset.width + 1) + "px";
        this.zoomBox.style.height = (deltaY + offset.height + 1) + "px";
        this.zoomBox.style.left = (xy.x < startX ?
            startX - deltaX - offset.left : startX - offset.left) + "px";
        this.zoomBox.style.top = (xy.y < startY ?
            startY - deltaY - offset.top : startY - offset.top) + "px";
    },

    /**
    * Method: endBox
    */
    endBox: function(end) {
        var result;
        if (Math.abs(this.dragHandler.start.x - end.x) > 5 ||    
            Math.abs(this.dragHandler.start.y - end.y) > 5) {   
            var start = this.dragHandler.start;
            var top = Math.min(start.y, end.y);
            var bottom = Math.max(start.y, end.y);
            var left = Math.min(start.x, end.x);
            var right = Math.max(start.x, end.x);

            result = new SuperMap.Bounds(left, bottom, right, top);
        } else {
            result = this.dragHandler.start.clone(); // i.e. OL.Pixel
        } 
        this.removeBox();
        if(this.cursorCSS){
            this.map.eventsDiv.style.cursor = "";
        }
        this.callback("done", [result]);
    },

    /**
     * Method: removeBox
     * Remove the zoombox from the screen and nullify our reference to it.
     */
    removeBox: function(evt) {
        //ICL 858 鼠标移出地图 结束当前绘制 yzy
        if(evt && evt.xy){
            this.endBox(evt.xy);
        }else {
            this.map.eventsDiv.removeChild(this.zoomBox);
            this.zoomBox = null;
            this.boxOffsets = null;
            SuperMap.Element.removeClass(
                this.map.eventsDiv, "smDrawBox"
            );
        }
    },

    /**
     * Method: activate
     */
    activate: function () {
        if (SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            this.dragHandler.activate();
            return true;
        } else {
            return false;
        }
    },

    /**
     * Method: deactivate
     */
    deactivate: function () {
        if (SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            if (this.dragHandler.deactivate()) {
                if (this.zoomBox) {
                    this.removeBox();
                }
            }
            return true;
        } else {
            return false;
        }
    },
    
    /**
     * Method: getBoxOffsets
     * Determines border offsets for a box, according to the box model.
     * 
     * Returns:
     * {Object} an object with the following offsets:
     *     - left
     *     - right
     *     - top
     *     - bottom
     *     - width
     *     - height
     */
    getBoxOffsets: function() {
        if (!this.boxOffsets) {
            // Determine the box model. If the testDiv's clientWidth is 3, then
            // the borders are outside and we are dealing with the w3c box
            // model. Otherwise, the browser uses the traditional box model and
            // the borders are inside the box bounds, leaving us with a
            // clientWidth of 1.
            var testDiv = document.createElement("div");
            //testDiv.style.visibility = "hidden";
            testDiv.style.position = "absolute";
            testDiv.style.border = "1px solid black";
            testDiv.style.width = "3px";
            document.body.appendChild(testDiv);
            var w3cBoxModel = testDiv.clientWidth === 3;
            document.body.removeChild(testDiv);
            
            var left = parseInt(SuperMap.Element.getStyle(this.zoomBox,
                "border-left-width"));
            var right = parseInt(SuperMap.Element.getStyle(
                this.zoomBox, "border-right-width"));
            var top = parseInt(SuperMap.Element.getStyle(this.zoomBox,
                "border-top-width"));
            var bottom = parseInt(SuperMap.Element.getStyle(
                this.zoomBox, "border-bottom-width"));
            this.boxOffsets = {
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                width: w3cBoxModel === false ? left + right : 0,
                height: w3cBoxModel === false ? top + bottom : 0
            };
        }
        return this.boxOffsets;
    },
  
    CLASS_NAME: "SuperMap.Handler.Box"
});
