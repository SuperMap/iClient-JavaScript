/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

 SuperMap.Animal2 = SuperMap.Class(SuperMap.Animal, {
    
    /**
     * options: 必选参数
     * layer: 调用该类的图层引用。
     */
    initialize: function(layer) {
        this.layer = layer;
        
        this.backupCanvas = document.createElement('canvas');
        this.backupCanvas.style.display = 'none';
        this.backupCtx= this.backupCanvas.getContext('2d');
        
        this.aniCanvas = document.createElement('canvas'); 
        this.aniCtx = this.aniCanvas.getContext('2d');
        this.aniCanvas.style.position = "absolute";   
        this.layer.div.appendChild(this.aniCanvas);      
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
		if(1 === this.ratio){
			callback && callback();
			return;
		}
        this.leftTop = lefttop;
        this.baseCanvas = canvas;
        this.baseCanvasCtx = canvas.getContext('2d');
        this.width = canvas.width; 
        this.height = canvas.height;
    
        this.backupCanvas.width = this.width;
        this.backupCanvas.height = this.height;
        this.backupCtx.drawImage(this.baseCanvas, 0, 0);
        this.baseCanvasCtx.clearRect(0, 0, this.width, this.height);
        this.triggerAnimal(callback);
    },
    
    CLASS_NAME: "SuperMap.Animal2"
});
