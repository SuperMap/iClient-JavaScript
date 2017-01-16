/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Tool.ColorPicker
 * 颜色拾取器。
 *
 */
SuperMap.Tool.ColorPicker = SuperMap.Class({

    /**
     * APIProperty: isAutoHide
     * {Boolean} 当鼠标移出拾取器范围时，自动隐藏拾取器。默认值 true。
     */
    isAutoHide: true,

    /**
     * Property: targetDom
     * {HTMLElement} 颜色选择器着色目标 Dom，该 Dom 的背景色将由颜色选取器的当前值着色，内容将由颜色的十六进制形式填充。
     */
    targetDom: null,

    /**
     * Property: pickerDiv
     * {HTMLElement} 拾取器 div。
     */
    pickerDiv: null,

    /**
     * Property: pickerCvs
     * {HTMLElement} 拾取器（主）底层 Canvas。
     */
    pickerCvs: null,

    /**
     * Property: pickerCvsForPointer
     * {HTMLElement} 拾取器十字和箭头拾取符号的 Canvas 层。
     */
    pickerCvsForPointer: null,

    /**
     * Property: pickerCtx
     * {Canvas2D} 拾取器（主）底层 Canvas 2D 上下文。
     */
    pickerCtx: null,

    /**
     * Property: pickerCvsForPointerrCtx
     * {Canvas2D} 拾取器十字和箭头拾取符号层的 Canvas 2D 上下文。
     */
    pickerCvsForPointerrCtx: null,

    /**
     * Property: pickerBox
     * {Array{Number}} 拾取器范围。
     */
    pickerBox: null,

    /**
     * Property: pickerABoxIn
     * {Array{Number}} 左取色（命名为色板A）板精确范围。
     */
    pickerABoxIn: null,

    /**
     * Property: pickerABoxOut
     * {Array{Number}} 左取色板模糊范围。
     */
    pickerABoxOut: null,

    /**
     * Property: pickerBBoxIn
     * {Array{Number}} 右取色（命名为色板A）板精确范围。
     */
    pickerBBoxIn: null,

    /**
     * Property: pickerBBoxOut
     * {Array{Number}} 右取色板模糊范围。
     */
    pickerBBoxOut: null,

    /**
     * Property: pickerBArrowY
     * {Array{Number}} 右取色板精确 Y 值，用于颜色值计算。
     */
    pickerBArrowY: null,

    /**
     * Property: pickerACurrentRGBA
     * {Array{Number}} 左取色板当前 RGBA 值。
     */
    pickerACurrentRGBA: null,

    /**
     * Property: pickerACrossPosition
     * {Object} 当前十字选色器位置，包含 x，y 属性的对象。
     */
    pickerACrossPosition: null,

    /**
     * Property: pickerBArrowsPosition
     * {Object} 当前箭头选色器位置，包含 x，y 属性的对象。
     */
    pickerBArrowsPosition: null,

    /**
     * Property: isMouseDowning
     * {Boolean} 当前鼠标是否按下，默认值 false。
     */
    isMouseDowning: false,

    /**
     * APIProperty: onChanging
     * {Function} - 颜色选择器颜色值发生改变时触发此函数，返回最新的颜色值。
     */
    onChange: null,

    /**
     * Constructor: SuperMap.Tool.ColorPicker
     * 构造函数，颜色拾取器对象。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * (end)
     *
     * Returns:
     * {<SuperMap.Tool.ColorPicker>} 颜色拾取器对象。
     */
    initialize: function() {
        this.pickerBox = [0, 120, 240, 0];
        this.pickerABoxIn = [10, 110, 190, 10];
        this.pickerABoxOut = [0, 120, 200, 0];
        this.pickerBBoxIn = [210, 110, 230, 10];
        this.pickerBBoxOut = [200, 120, 240, 0];
        this.pickerBArrowY = 10;
        this.pickerACrossPosition = {
           x: 10,
           y: 10
        };
        this.pickerBArrowsPosition = {
            x: 203,
            y: 10
        };
        this.pickerACurrentRGBA = [255, 0, 0, 255];

        if(!document.body){
            var selt = this;
            this.addEvent(document, "DOMContentLoaded", function(){
                selt.initPicker();
            });
        }
        else{
            this.initPicker();
        };

        this.onChange = function(value){};
    },

    /**
     * APIMethod: destroy
     * 销毁颜色拾取器对象。
     * 销毁后此对象的所有属性为 null，且不是初始值。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * colorPicker.destroy();
     * (end)
     *
     */
    destroy: function() {
        if(this.pickerDiv){
            document.getElementsByTagName('body')[0].removeChild(this.pickerDiv);
        }

        this.pickerDiv = null;
        this.pickerCvs = null;
        this.pickerCvsForPointer = null;
        this.pickerCtx = null;
        this.pickerCvsForPointerrCtx = null;

        this.pickerBox = null;
        this.pickerABoxIn = null;
        this.pickerABoxOut = null;
        this.pickerBBoxIn = null;
        this.pickerBBoxOut = null;

        this.pickerBArrowY = null;
        this.pickerACurrentRGBA = null;
        this.isMouseDowning = null;
        this.onChange = null;
    },

    /**
     * Method: initPicker
     * 初始化颜色选择器。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * colorPicker.initPicker();
     * (end)
     *
     * Parameters:
     * top - {Number} 颜色选择器相对于标签 body（第一个 body）的下偏距，默认值：0。
     * left - {Number} 颜色选择器相对于标签 body（第一个 body）的左偏距，默认值：0。
     * targetDom - {HTMLElement} 颜色选择器着色目标 Dom，该 Dom 的背景色将由颜色选取器的当前值着色，Dom 内容将显示颜色的十六进制形式字符串，若不绑定 dom， 可设置为： null。
     *
     * Returns:
     * {HTMLElement} 颜色选择器（div）。
     */
    initPicker: function(top, left, targetDom){
        this.targetDom = targetDom? targetDom: null;

        // 主div （& 事件 div）
        this.pickerDiv = document.createElement("Div");
        var pickerDiv = this.pickerDiv;
        pickerDiv.style.position = "absolute";
        pickerDiv.style.padding = "0px";
        pickerDiv.style.margin = "0px";
        pickerDiv.style.top = (top? top: 0) + "px";
        pickerDiv.style.left =  (left? left: 0) + "px";
        pickerDiv.style.width = "240px";
        pickerDiv.style.height = "120px";
        pickerDiv.style.display="none";
        pickerDiv.style.zIndex=9999;

        // 主画布
        this.pickerCvs = document.createElement("canvas");
        var pickerCvs = this.pickerCvs;
        pickerCvs.style.position = "absolute";
        pickerCvs.style.padding = "0px";
        pickerCvs.style.margin = "0px";
        pickerCvs.width = 240;
        pickerCvs.height = 120;
        this.pickerCtx = pickerCvs.getContext("2d");

        // 指示器画布
        this.pickerCvsForPointer = document.createElement("canvas");
        var pickerCvsForPointer = this.pickerCvsForPointer;
        pickerCvsForPointer.style.position = "absolute";
        pickerCvsForPointer.style.padding = "0px";
        pickerCvsForPointer.style.margin = "0px";
        pickerCvsForPointer.width = 240;
        pickerCvsForPointer.height = 120;
        pickerDiv.appendChild(pickerCvsForPointer);
        this.pickerCvsForPointerrCtx = pickerCvsForPointer.getContext("2d");

        // 组织层
        pickerDiv.appendChild(pickerCvs);
        pickerDiv.appendChild(pickerCvsForPointer);

        // 渲染取色板(渲染效果由属性 pickerACrossPosition, pickerBArrowsPosition, pickerACurrentRGBA 控制)
        this.renderPickerA();
        this.renderPickerB();
        this.renderPointerCross();
        this.renderPointerArrow();

        // 颜色选择器事件
        this.initEvents();

        this.hidePicker();
        document.getElementsByTagName('body')[0].appendChild(pickerDiv);
    },

    /**
     * Method: renderPickerA
     * （重新）渲染选择器左面板。
     *
     */
    renderPickerA: function(){
        if(this.pickerCtx){
            var pickerCtx = this.pickerCtx;
            var pickerABoxOut = this.pickerABoxOut;
            var pickerABoxIn = this.pickerABoxIn;

            // 清除（拾取色层）左面板
            pickerCtx.clearRect(pickerABoxOut[0], pickerABoxOut[3], pickerABoxOut[2] - pickerABoxOut[0],  pickerABoxOut[1] - pickerABoxOut[3]);

            // 背景绘制
            pickerCtx.fillStyle = "#C0C0C0"; //把渐变赋给填充样式
            pickerCtx.fillRect(pickerABoxOut[0], pickerABoxOut[3], pickerABoxOut[2] - pickerABoxOut[0],  pickerABoxOut[1] - pickerABoxOut[3]);

            // 左取色面板
            var imageHS = new Image();
            // 绑定 load 事件处理器，加载完成后执行
            imageHS.onload = function(){
                pickerCtx.drawImage(imageHS, pickerABoxIn[0], pickerABoxIn[3], imageHS.width, imageHS.height);
                // !!! 注意，image 没有加入到 dom之中
            };
            // 设置src属性，浏览器会自动加载。
            // 必须先绑定事件，才能设置src属性，否则会出同步问题。
            imageHS.src = SuperMap.Tool.ColorPicker.imageHSURL;
        }
    },

    /**
     * Method: renderPointerCross
     * （重新）渲染选十字指针。
     *
     */
    renderPointerCross: function(){
        if(this.pickerCvsForPointerrCtx){
            var pickerCvsForPointerrCtx = this.pickerCvsForPointerrCtx;
            var pickerABoxOut = this.pickerABoxOut;

            // 偏移处理
            var crossX = this.pickerACrossPosition.x - 7;
            var crossY = this.pickerACrossPosition.y - 7;

            // 清除（指示器层）左面板
            pickerCvsForPointerrCtx.clearRect(pickerABoxOut[0], pickerABoxOut[3], pickerABoxOut[2] - pickerABoxOut[0],  pickerABoxOut[1] - pickerABoxOut[3]);

            // 左取色面板上的十字选色器
            var pickerACrossImg = new Image();
            // 绑定 load 事件处理器，加载完成后执行
            pickerACrossImg.onload = function(){
                // 将图像绘制到canvas上
                pickerCvsForPointerrCtx.drawImage(pickerACrossImg, crossX, crossY, pickerACrossImg.width, pickerACrossImg.height);
            };
            // 设置src属性，浏览器会自动加载。
            pickerACrossImg.src = SuperMap.Tool.ColorPicker.imageCrossURL;
        }
    },

    /**
     * Method: renderPickerB
     * （重新）渲染选择器右面板。
     *
     */
    renderPickerB: function(){
        if(this.pickerCtx){
            var pickerCtx = this.pickerCtx;
            var pickerBBoxIn = this.pickerBBoxIn;
            var pickerBBoxOut = this.pickerBBoxOut;

            var rgba = "rgba(" + this.pickerACurrentRGBA[0] + ", " + this.pickerACurrentRGBA[1] + ", " + this.pickerACurrentRGBA[2] + ", " + this.pickerACurrentRGBA[3] + ")"; ;

            // 清除右选色面板
            pickerCtx.clearRect(pickerBBoxOut[0], pickerBBoxOut[3], pickerBBoxOut[2] - pickerBBoxOut[0],  pickerBBoxOut[1] - pickerBBoxOut[3]);

            // 背景绘制
            pickerCtx.fillStyle = "#C0C0C0"; //把渐变赋给填充样式
            pickerCtx.fillRect(pickerBBoxOut[0], pickerBBoxOut[3], pickerBBoxOut[2] - pickerBBoxOut[0],  pickerBBoxOut[1] - pickerBBoxOut[3]);

            // 渐变色
            var linear = pickerCtx.createLinearGradient(pickerBBoxIn[0] + ((pickerBBoxIn[2] - pickerBBoxIn[0])/2),
                pickerBBoxIn[3],
                pickerBBoxIn[0] + ((pickerBBoxIn[2] - pickerBBoxIn[0])/2),
                pickerBBoxIn[1] + 1);
            linear.addColorStop(0, rgba);
            // 结束色
            linear.addColorStop(1,'#000000');

            // 绘制右取色板
            pickerCtx.fillStyle = linear; //把渐变赋给填充样式
            pickerCtx.fillRect(pickerBBoxIn[0], pickerBBoxIn[3], pickerBBoxIn[2] - pickerBBoxIn[0],  pickerBBoxIn[1] - pickerBBoxIn[3] + 1); // 加1个补充像素
            pickerCtx.stroke();
        }
    },

    /**
     * Method: renderPointerArrow
     * （重新）渲染选箭头指针。
     *
     */
    renderPointerArrow: function(){
        if(this.pickerCvsForPointerrCtx){
            var pickerCvsForPointerrCtx = this.pickerCvsForPointerrCtx;
            var pickerBBoxIn = this.pickerBBoxIn;
            var pickerBBoxOut = this.pickerBBoxOut;
            var arrowX = pickerBBoxIn[0] - 7;
            var arrowY = this.pickerBArrowsPosition.y - 5;

            // 清除（指示器层）右面板
            pickerCvsForPointerrCtx.clearRect(pickerBBoxOut[0], pickerBBoxOut[3], pickerBBoxOut[2] - pickerBBoxOut[0],  pickerBBoxOut[1] - pickerBBoxOut[3]);

            // 箭头取色
            var pickerBArrowImg = new Image();
            // 绑定 load 事件处理器，加载完成后执行
            pickerBArrowImg.onload = function(){
                // 将图像绘制到canvas上
                pickerCvsForPointerrCtx.drawImage(pickerBArrowImg, arrowX, arrowY, pickerBArrowImg.width, pickerBArrowImg.height);
            };
            // 设置src属性，浏览器会自动加载。
            pickerBArrowImg.src = SuperMap.Tool.ColorPicker.imageArrowURL;
        }
    },

    /**
     * Method: initEvents
     * 初始化取色器所有事件监听。
     */
    initEvents: function(){
        // 将事件绑定到父div
        var eventDiv = this.pickerDiv;

        var pickerABoxOut = this.pickerABoxOut;
        var pickerBBoxOut = this.pickerBBoxOut;
        var self = this;

        this.addEvent(eventDiv, "mousedown",function(e){
            self.isMouseDowning = true;
        });
        this.addEvent(eventDiv, "mouseup",function(e){
            self.isMouseDowning = false;
        });

        this.addEvent(eventDiv, "mouseleave",function(e){
            if(self.isAutoHide == true){
                self.hidePicker();
            }
        });

        this.addEvent(eventDiv, "mousemove",function(e){
            var position = self.getEventPosition(e);
            // 鼠标样式
            if(self.isPositionInBox(position, pickerABoxOut)){
                eventDiv.style.cursor = "crosshair";
            }
            else{
                eventDiv.style.cursor = "default";
            }

            if(self.isMouseDowning === true){
                if(self.isPositionInBox(position, pickerABoxOut)){
                    var colorPositionA =  self.getColorPositionInPickerA(position);
                    if(!colorPositionA) return;
                    var imageData = self.pickerCtx.getImageData(colorPositionA.x , colorPositionA.y, 1, 1);

                    self.pickerACrossPosition = colorPositionA;
                    self.pickerACurrentRGBA = imageData.data;
                    self.renderPickerB();
                    self.renderPointerCross()

                    self.getColorValue();
                }

                if(self.isPositionInBox(position, pickerBBoxOut)){
                    var colorPositionB = self.getColorPositionInPickerB(position);
                    if(!colorPositionB) return;
                    self.pickerBArrowY = colorPositionB.y;

                    self.pickerBArrowsPosition = colorPositionB;
                    self.renderPointerArrow();

                    self.getColorValue();
                }
            }
        });

        this.addEvent(eventDiv, "click",function(e){
            var position = self.getEventPosition(e);

            if(self.isPositionInBox(position, pickerABoxOut)){
                var colorPositionA =  self.getColorPositionInPickerA(position);
                if(!colorPositionA) return;
                var imageData = self.pickerCtx.getImageData(colorPositionA.x , colorPositionA.y, 1, 1);

                self.pickerACrossPosition = colorPositionA;
                self.pickerACurrentRGBA = imageData.data;
                self.renderPointerCross();
                self.renderPickerB();

                self.getColorValue();
            }

            if(self.isPositionInBox(position, pickerBBoxOut)){
                var colorPositionB = self.getColorPositionInPickerB(position);
                if(!colorPositionB) return;
                self.pickerBArrowY = colorPositionB.y;
                self.pickerBArrowsPosition = colorPositionB;
                self.renderPointerArrow();

                self.getColorValue();
            }
        });
    },

    /**
     * Method: addEvent
     * 事件监听。
     *
     * Parameters:
     * el - {HTMLElement} 监听的 dom 对象
     * evnt - {String} 监听的事件名称
     * func - {Function} 事件回调函数
     *
     */
    addEvent: function(el, evnt, func) {
        if(el.addEventListener) {
            el.addEventListener(evnt, func, false);
        } else if(el.attachEvent) {
            el.attachEvent('on'+evnt, func);
        }
    },

    /**
     * Method: getColorPositionInPickerA
     * 从左取色面板中获取精确的取色位置。
     *
     * Parameters:
     * position - {Object} 鼠标在 Canvas 中的相对位置，该对象包含 x， y 属性。
     *
     * Returns:
     * {Object} 左取色面板中的取色位置，该对象包含 x， y 属性。
     */
    getColorPositionInPickerA: function(position){
        var pickerABoxIn = this.pickerABoxIn;
        var pickerABoxOut = this.pickerABoxOut;

        var colorPositionInA = {};
        if(this.isPositionInBox(position, pickerABoxIn)){
            colorPositionInA.x = position.x;
            colorPositionInA.y = position.y;
        }
        else if(this.isPositionInBox(position, pickerABoxOut)){
            if(position.x < pickerABoxIn[0]){
                colorPositionInA.x = pickerABoxIn[0];
            }
            if(position.x > pickerABoxIn[2]){
                colorPositionInA.x = pickerABoxIn[2];
            }
            if(typeof(colorPositionInA.x) == "undefined"){
                colorPositionInA.x = position.x;
            }

            if(position.y > pickerABoxIn[1]){
                colorPositionInA.y = pickerABoxIn[1];
            }
            if(position.y < pickerABoxIn[3]){
                colorPositionInA.y = pickerABoxIn[3];
            }
            if(typeof(colorPositionInA.y) == "undefined"){
                colorPositionInA.y = position.y;
            }
        }

        if(typeof(colorPositionInA.x) == "undefined" || typeof(colorPositionInA.y) == "undefined"){
            return false;
        }
        else{
            return colorPositionInA;
        }
    },

    /**
     * Method: getColorPositionInPickerB
     * 从右取色面板中获取精确的取色位置。
     *
     * Parameters:
     * position - {Object} 鼠标在 Canvas 中的相对位置，该对象包含 x， y 属性。
     *
     * Returns:
     * {Object} 右取色面板中的取色位置，该对象包含 x， y 属性。
     */
    getColorPositionInPickerB: function(position){
        var pickerBBoxIn = this.pickerBBoxIn;
        var pickerBBoxOut = this.pickerBBoxOut;
        var pickerABoxIn = this.pickerABoxIn;

        var colorPositionInB = {};
        if(this.isPositionInBox(position, pickerBBoxIn)){
            colorPositionInB.x = 220;
            colorPositionInB.y = position.y;
        }
        else if(this.isPositionInBox(position, pickerBBoxOut)){
            colorPositionInB.x = 220;

            if(position.y > pickerABoxIn[1]){
                colorPositionInB.y = pickerABoxIn[1];
            }
            if(position.y < pickerABoxIn[3]){
                colorPositionInB.y = pickerABoxIn[3];
            }
            if(typeof(colorPositionInB.y) == "undefined"){
                colorPositionInB.y = position.y;
            }
        }

        if(typeof(colorPositionInB.x) == "undefined" || typeof(colorPositionInB.y) == "undefined"){
            return false;
        }
        else{
            return colorPositionInB;
        }
    },

    /**
     * Method: getEventPosition
     * 获取当前事件在 Canvas 中的触发位置。
     *
     * Parameters:
     * evt - {HTTPEvent} Dom 事件返回对象。
     *
     * Returns:
     * {Object} 事件在 Canvas 中的触发位置，该对象包含 x， y 属性。
     */
    getEventPosition: function(evt){
        //注：使用这个函数，需要给Canvas元素的position设为absolute。
        // 或Canvas元素的父元素position设为absolute且Canvas元素和器父元素的内外偏距始终为0;
        var x, y;

        // 鼠标相对于当前 dom 的位置
        // ie 9 下 (layerX，layerY) 等价于 (offsetX, offsetY)
        // ie 11 下 (layerX，layerY) 不等于  (offsetX, offsetY)， (offsetX, offsetY) 是鼠标相对于当前 dom 的位置， (layerX，layerY) 不是此含义。
        // 火狐浏览器 只有 (layerX，layerY)
        // 谷歌浏览器 下 (layerX，layerY) 等价于 (offsetX, offsetY)
        if(typeof(evt.layerX) != "undefined" && typeof(evt.layerY) != "undefined"){
            x = evt.layerX;
            y = evt.layerY;
        }
        if(typeof(evt.offsetX) != "undefined" && typeof(evt.offsetY) != "undefined") {
            x = evt.offsetX;
            y = evt.offsetY;
        }

        return {x: x, y: y};
    },

    /**
     * Method: isPositionInBox
     * 判断当前位置是否在指定范围框里。
     *
     * Parameters:
     * position - {Object} 位置对象，该对象包含 x， y 属性。
     * box - {Array{Number}} 范围框。格式： [left, bottom, right, top]。
     *
     * Returns:
     * {Boolean} 当前位置是否在指定范围框里。
     */
    isPositionInBox: function(position, box){
        var xy = position;
        if(xy.x >= box[0] && xy.x <= box[2] && xy.y <= box[1] && xy.y >= box[3]){
            return true;
        }
        return false;
    },

    /**
     * APIMethod: reset
     * 获取当前取色器里的颜色值。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * colorPicker.reset(200, 150, dom);
     * (end)
     *
     * Parameters:
     * Parameters:
     * top - {Number} 颜色选择器相对于标签 body（第一个 body）的下偏距，默认值：0。
     * left - {Number} 颜色选择器相对于标签 body（第一个 body）的左偏距，默认值：0。
     * targetDom - {HTMLElement} 颜色选择器着色目标 Dom，该 Dom 的背景色将由颜色选取器的当前值着色，Dom 内容将显示颜色的十六进制形式字符串，若不绑定 dom， 可设置为： null。
     *
     */
    reset: function(top, left, targetDom){
        if(typeof(targetDom) !== "undefined"){
            this.targetDom = targetDom;
        }

        if(this.pickerDiv){
            if(typeof(top) !== "undefined"){
                this.pickerDiv.style.top = parseInt(top) + "px";
            }
            if(typeof(left) !== "undefined"){
                this.pickerDiv.style.left = parseInt(left) + "px";
            }
            this.togglePicker();
        }
    },

    /**
     * APIMethod: hidePicker
     * 隐藏着色版。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * colorPicker.hidePicker();
     * (end)
     */
    hidePicker: function(){
        if(this.pickerDiv){
            this.pickerDiv.style.display = "none";
        }
    },

    /**
     * APIMethod: showPicker
     * 显示着色版。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * colorPicker.showPicker();
     * (end)
     */
    showPicker: function(){
        if(this.pickerDiv){
            this.pickerDiv.style.display = "block";
        }
    },

    /**
     * APIMethod: togglePicker
     * 切换着色板的可视性
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * colorPicker.togglePicker();
     * (end)
     * */
    togglePicker:function(){
        if(this.pickerDiv){
            if(this.pickerDiv.style.display === "none"){
                this.showPicker();
            }else{
                this.hidePicker();
            }
        }
    },

    /**
     * APIMethod: getColorValue
     * 获取当前取色器里的颜色值。
     *
     * 例如:
     * (start code)
     * var colorPicker = new SuperMap.Tool.ColorPicker();
     * var color = colorPicker.getColorValue();
     * (end)
     *
     * Returns:
     * {return} 十六进制颜色值。
     */
    getColorValue: function(){
        var pickerBArrowY = this.pickerBArrowY;
        var pickerBBoxIn = this.pickerBBoxIn;
        var pickerACurrentRGBA = this.pickerACurrentRGBA;

        var rgba = [255, 0, 0, 255];

        // 此方式颜色差太小，改用数学方法计算颜色值
        // var imageData = this.pickerCtx.getImageData(220 , pickerBArrowY, 1, 1);
        // var data = imageData.data;
        // var rgbaStr = "rgba(" + data[0] + ", " + data[1] + ", " + data[2] + ", " + data[3] + ")";

        // 计算颜色值
        if(pickerBArrowY === pickerBBoxIn[3]){
            rgba[0] = pickerACurrentRGBA[0];
            rgba[1] = pickerACurrentRGBA[1];
            rgba[2] = pickerACurrentRGBA[2];
        }
        else if(pickerBArrowY === pickerBBoxIn[1]){
            rgba = [0, 0, 0, 255];
        }
        else{
            var sLen = pickerBBoxIn[1] - pickerBBoxIn[3];

            var pickerColorPosition = sLen - (pickerBArrowY - pickerBBoxIn[3]);

            rgba[0] = parseInt(pickerACurrentRGBA[0]*pickerColorPosition/sLen);
            rgba[1] = parseInt(pickerACurrentRGBA[1]*pickerColorPosition/sLen);
            rgba[2] = parseInt(pickerACurrentRGBA[2]*pickerColorPosition/sLen);
        }

        // var rgbStr = "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
        var hexStr = RGB2HEX(rgba);

        // 渲染目标 dom
        if(this.targetDom){
            var dom = this.targetDom;
            dom.style.backgroundColor = hexStr;

            /*if(dom.tagName.toLocaleUpperCase() == "INPUT"){
                dom.value = hexStr;
            }
            else{
                dom.innerHTML = hexStr;
            }*/
        }

        this.onChange(hexStr);

        return hexStr;

        // 十进制转化为16进制
        function hex(x){
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }

        // rgb to hex
        function RGB2HEX(rgb){
            return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
        }
    },

    CLASS_NAME: "SuperMap.Tool.ColorPicker"
});

// 标准 HS 颜色图片 base64 编码。
SuperMap.Tool.ColorPicker.imageHSURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAABlCAIAAACEDzXRAAAKQ0lEQVR42u2d23IjKwxFBeRh5v8/9uQlzXlI2gGELoCEm6pxubp6PI69WoV3C20uIQPAH4A/AH/p41/pDcTxP4BPGDtq3vYJGPpv8craeRdo/fyTI8ZhHnodOGgcV/3rnx8QI0SABO2xfAbiCfVR8Wj+CD8jenbRJNyGOxLoAaH1iLu4EUEHAv1+MsQ4zLE4AiIOcpibv4u9OET6+cP4ASnJ1JH4/G60A9km+GbBxLlpKAkADoR2JnaBrvWD/x1GCZn9EYLEHqVfI6Efx0D7E9tDF/rBSJ54l8FqTUse0J+EvxPrdK0fD4aOLXQi7zyGxMaRvvWjjH2U8o9I44OKnf+wyCpHoR/Phk6d/COq8481YrNI3/qR2B+kMl1Fl6J8o/JrU/GEA6HdiB2ha/0YBVx7rFwNHAj9JuIl6EI/qKyJug4Yvg7xA0QEpB8nQe8itoQu9EOT8M3mTsqUSUzykH6cBO1PbA9d91+ShDzV9xrtcgW21IT6L0yfcS90FKCdw+wS6Q9ISWjVfLTVVT2mdiPGGRduFKWm7dBStWlLmI0j/QExdgp7gT5qCu2BLKiLqtc94hI7PB8auQP4KuyIvSJ960fUqXWcd2F48Khr1bHSj2dDp/afmg7tMrFxpG/9mHMFuqrH3spFw0s0Bgr9OAzamdgFutaPpMuqo6WVEXWJdSL14xhof2J76MKfS2yXWGOVB1WXXGOVdxFSx587CXoLsTE0689RH7VW4RMLeKI9wPpzz4XeS2wDzdbXR52AWStjwiSAA6HdiB2h1f6cqT0whzzuzz0LejuxATTy90Xt40v7CzdGRvKS4O/zQ0AiXaRW5x/dv4vS4A/a308LYR5pFquRRvlHIrKWoCj5woCVId4eR/KPNDjURg2tdEC7rSQN5B9DYR70X5YivVxft7AyrOvrD4V2JnaBJurr+qpemLEywlRhT6qvPx16C7ExdK0fSjcj0maAzsqgBt7rfIxGP46B9iT2gi70I842bNj0U4wd/WAG/L5VP3p0W4iNoYv6Oh6eoJmSMW5laIzF8iT1TtgeV9RZoZ7QvdEUzsQu0CP+HOMKDFoZvDFg6s89CNqf2B5a4e8Hts84W0pgeohBtspBXYp8H3Tk/H23MBtHuvbn5mp7dlU9TUkP+XNJMabzHdCIbnuYDSItzZ+bdgUWrAwNPhwInRxw1/wXuYGj+4vo7flboRpjEQ6EjgojYK9/K04NFfNTauEBypXQWQLAfqQoHl9CfvpQ6C3ExtC9/q2YW2u6X1JWzfsYFPKX3L99LrQ/sT10XR+jKh+UN2AxlDOyXfLQaxxf/fkvT4d2JnaBZv258M6h4IFu2Em7/sezoLcQG0Mjfy6xrqLnVBLGWHw1i69WP5LCCn0TNEL3DLNXpCV/n5oo5jAVLY5Em6i8Pwm6uSNuCrNxpNX+nDira20qqyZriv384xhoZ2IX6Lr/wg8eiwpXYGQqPEgjsBrX+er3X46B9ie2h6bX/4i6IfcLS2mIY++7TfoCuLj6hwgN89CwBJ3Gx8rOVsn0kQ48tDS/4X1L8SzMb3BbkGdtwsD05AbP9YOU8xui+uljZei/P/3qx2HQbsSO0Ar/lveHLZYCVK4GeN1P5N+eAb2R2Aya9ueUY+8dlhLtdhWvgfEfz4AeGf9hR2wcaeTPpacvRdzLTx8J/Qq1Ij995PrJ3/mp0p8LO5YyF0s215g/9yxoZ2IXaLo+FiwtgTlvIAznp4+G3khsBk3Pf5mYvqOwMqZnNnw3i9cRDoT2JPaCZuvreskDuXkHxfQMvfbBgdBbiI2hC/3QLCg6lESZZkrfJ7nSj3gWNEMcRkYJsf5L0BXENBl1WV8/aquMLM9/eSJ0UtxZmFGGg4MigZ75ovHnvsOcUX09zRbzjCrU/K/Rev0gT2i2vu4cZrNI1+sH2e49Yb3lRC6e9fSS9ETohjj7hdkx0rQ/57/rxIrhBQdCv494Hlrtz1lo30Qjz1z+cRh02ndTNIMm1j8NxtmePs+76i+/esJHrH/6dGh/YntoRf9l2RtQWgJXzY4bdtbqx0OhnYldoHv7I79jf4+rOGGaRWr14yToLcTG0Ky/v32rjAsdX9S5vgI4ENqT2Asa7Z/9vq0yStiGNNVHkOe/RGmqwBQ0jEDHFpoJ85BLN+jPaRoHGWl2/2yx3msxVRHjZ0Td4GfV/Bf9bCM1dBiBfrHeJ1HR6dKEedDf5yPdBLilp/efC3Ribb1VxlUHGQe8iTb0598+Hdqf2B6a3b9SOerezsoIBWaJ3IBn1fp0j4PeQmwMzc5/idLK3UZWRkmKX2zA4Vc/DoPeSGwGrdvfY24RpKmVjrLuCQdCuxE7Qkv64TZ3Z44dVPrxUOh3EK9C1/lHGpz7ZzpVsYTF7K8Hyj+Ogd5FbAk9uL9H9LIyYg821sjo13gYtD+xPbRU/9Ds/b1sZTTIr5OStMGHA6GdiV2gUf2UmQcfJdUbXOoe6HoN1A0b2uQD4EBosXJqQTwKnXvXAEX+oZlfGaS9ewetDGCLeV1exH4e9Mr+2TDpv2iggYFW+LdBsTbngv/yUroGH0jleEX7MOgtxMbQ7PzKoMuajKyM8pYIiB194HnQzsQu0Gp/LvpulVHylsgK/TgG2p/YHrqXf6T3bJUBhfxFWUDPg95CbAytm/+ycasM9WOxWu0PnTniLWE2iLRi/4Z3bJXRvY76s0+Arl93I3aMNOHPBce2PdSkL7Kpnwe9l9gGutCPoFgkUtytXAGbex0vKCznSOs00o+ToLcQG0N/QErCrG6jrTIynVUDwo896vCzssPrNnAYtD+xPfR9fwmKeu/CVhm5OAn1STPkvhxBW1KXjeP60Y/DoJ2JXaAL/RCPy+PXc80L9d7OV294dVPbC/fb4EDoLcTG0IV+TCDrrIxMHIFg512BWj9OgvYk9oK+9SMoZG55q/JMiGS40/sLjacu28T3MVfd0Aha+u3QJXr+0Q//MBtHutaPQOzh3H0RBoZS5OJ/MjqJ9x2vQb7qgSuvX0StH0+FLptzrvTDh9gl0oV+iAbi2lAsqNmbK3yBAyLNdbRzW8Y6Btqf2B76A2IURE2zZY16KGfZlwqofJSL4feABka+xCNX+ekx0LuILaFr/Zit7s4ZA7y5Qg2sDr/t4zDodxCvQt/6occctDKGriMPzH85D9qN2BG61g/QwcLSVDSGl78C6LePY6A3EptBf0BKcjWWH/GqyJqoxKnMufEVBLJxAJwJ7U9sDH3fX0CxnIB4orMyuilTyRh6g+0bfDgQ2p/YHrrQD+jV6qb/SdRrMit8TRWwyEabxgFwJrQnsQt0rR+LR3VqFNiGHRBv73ge9EZiM+haPyicuRcVmIxzAMTMl9wfi3sGtBuxF3ShH92C29yJTteU+ohbRrZk3Qe9hdgY+tYPnOqanA+mTN33ZGKE06HQbsQu0LV+MF8+94rU5dK8B8/KyJaI+6D9ie2hC/3Q12QnSnYLn5p9P/6d0D7EltAh5wz/Hv8exON/LUjHOuz5CksAAAAASUVORK5CYII=";
// 十字选色图片 base64 编码。
SuperMap.Tool.ColorPicker.imageCrossURL = "data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=";
// 箭头选色图片 base64 编码。
SuperMap.Tool.ColorPicker.imageArrowURL = "data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7";
