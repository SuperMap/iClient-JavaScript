/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

 SuperMap.Animal = SuperMap.Class({
    /**
     * Property: count
     * {Number} 缩放动画执行的次数
     */
    count: 6,

    /**
     * Property: ratio
     * {Number} 缩放比例，根据此值判断是放大还是缩小。
     */
    ratio: 0,

    /**
     * Property: lefttop
     * {<SuperMap.Pixel>} canvas 的左上角
     */
    lefttop: null,

    /**
     * Property: backupCanvas
     * {Canvas} 备份层
     */
    backupCanvas: null,

    /**
     * Property: backupCtx
     * {Canvas.getContext('2d')}  备份层绘图板
     */
    backupCtx: null,
    
    /**
     * Property: aniCanvas
     * {Canvas}  动画层，通过动态绘制该层，实现动画效果
     */
    aniCanvas: null,

    /**
     * Property: aniCtx
     * {Canvas.getContext('2d')} 动画层的绘图板
     */
    aniCtx: null,

    /**
     * Property: width
     * {Number} 画图区域的宽度
     */
    width: 0,

    /**
     * Property: height
     * {Number} 画图区域的高度
     */
    height: 0,

    /**
     * Property: callback, 
     * {Function} 动画执行完毕调用的回调函数。
     */
    callback: null,

    /**
     * Property: timeoutID, 
     * {Number}
     */
    timeoutID: null, 
    /**
     * Property: layer
     * {<SuperMap.CanvasLayer> | <SuperMap.Layer.CanvasLayer>} 调用该类的layer引用。
     */
    layer: null,

    /**
     * Property: baseCanvas
     * {Canvas} 需要进行缩放动画的Canvas元素。
     */
    baseCanvas: null,

    /**
     * Property: baseCanvasCtx
     * Canvas.getContext('2d'), 需要进行缩放动画的canvas绘图板。
     */
    baseCanvasCtx: null,    
   
    /**
     * Property: aniFinish
     * {bool} 当前动画是否执行完毕。
     */
    aniFinish: true,
    
    /**
     * Property: step
     * {Number} 当前执行的缩放此事。最大值为this.ratio
     */
    step: 0,

    /**
     * options: 必选参数
     * layer: 调用该类的图层引用。
     */
    initialize: function(layer) {
        this.layer = layer;
        this.backupCanvas = document.createElement('canvas');
        this.backupCanvas.style.display = 'none';
        this.backupCtx = this.backupCanvas.getContext('2d');
        if(this.layer.useHighSpeed && SuperMap.Browser.device === 'pc'){
            this.aniCanvas = document.createElement('canvas'); 
            this.aniCtx = this.aniCanvas.getContext('2d');
            this.aniCanvas.style.position = "absolute";   
            
        }
    },

    /**
     * params: canvas,lefttop, callback
     *
     * canvas: 即将进行缩放动画的canvas元素。
     * lefttop: 绘图板相对应图层承载区域的左上角。
     * callback: 动画完成后执行的用户方法。
     */
    begin: function(canvas, lefttop, callback) {
        this.ratio = this.layer.lastResolution / this.layer.map.getResolution();
        this.leftTop = lefttop;
        this.baseCanvas = canvas;
        this.baseCanvasCtx = canvas.getContext('2d');
        this.width = canvas.width; 
        this.height = canvas.height;
    
        this.backupCanvas.width = this.width;
        this.backupCanvas.height = this.height;

        try{
            this.backupCtx.drawImage(this.baseCanvas, 0, 0);
        }catch(e){
            return;
        }
        this.layer.resetCanvas();
        this.baseCanvasCtx.drawImage(this.backupCanvas, this.leftTop.x, this.leftTop.y, this.width * this.ratio, this.height * this.ratio);
        if(SuperMap.Browser.device === 'pc'){
            this.triggerAnimal(callback);
        }
    },
    
    //实现缩放动画
    triggerAnimal: function(callback) {
        if(!this.aniFinish) {
            return;
        }
        this.layer.div.appendChild(this.aniCanvas);
        this.aniCanvas.width = this.width;
        this.aniCanvas.height = this.height;
        this.aniCanvas.style.left = this.baseCanvas.style.left;
        this.aniCanvas.style.top = this.baseCanvas.style.top;
        this.aniFinish = false;
        this.step = 0;
        this.baseCanvas.style.display = "none";    
        this.execZoomTo(callback);
    },
    
    //动画结束后调用此函数，清除动画层的图像。
    animalEnd: function() {
        this.aniFinish = true; 
        this.layer.div.removeChild(this.aniCanvas);
        this.baseCanvas.style.display = "";
    },

    //执行缩放动画
    execZoomTo: function(callback){
        //动画信息初始化
        var me = this;
        var perPx = (this.leftTop.x)/this.count, perPy = (this.leftTop.y)/this.count;
        var perWidth = (this.ratio - 1) * this.width / this.count,
            perHeight = (this.ratio - 1) * this.height / this.count;
        me.step++;
        me.aniCtx.clearRect(0,0,this.width,this.height);
        me.aniCtx.drawImage(me.backupCanvas, perPx*me.step, perPy*me.step, 
                                           perWidth * me.step + this.width,
                                           perHeight * me.step + this.height);
        me.timeoutID && window.clearTimeout(me.timeoutID);
        if (me.step === me.count) {
            this.animalEnd();
            callback && callback();
        }else{
            var _execZoomTo = SuperMap.Function.bind(arguments.callee, this, callback);
            me.timeoutID = window.setTimeout(_execZoomTo, 30)
        }
    },

    destroy: function() {
        var me = this;
        me.leftTop = null;
        me.backupCanvas = null;
        me.backupCtx = null;
        me.AniCanvas = null;
        me.AniCtx = null;
        me.callback = null;
        me.baseCanvas = null;
        me.baseCanvasCtx = null;
        me.layer = null;
        me.timeoutID && window.clearTimeout(me.timeoutID);
        me.timeoutID = null;
    }
});
