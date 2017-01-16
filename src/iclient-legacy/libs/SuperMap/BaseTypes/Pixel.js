/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Pixel
 * 此类用x,y坐标描绘屏幕坐标（像素点）。
 */
SuperMap.Pixel = SuperMap.Class({
    
    /**
     * APIProperty: x
     * {Number} x坐标，默认为0.0
     */
    x: 0.0,

    /**
     * APIProperty: y
     * {Number} y坐标，默认为0.0
     */
    y: 0.0,

    /**
     * APIProperty: mode
     * {String} 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。
     *          值有SuperMap.Pixel.Mode.LeftTop，SuperMap.Pixel.Mode.RightTop，SuperMap.Pixel.Mode.RightBottom，
     *          SuperMap.Pixel.Mode.LeftBottom 这四种,默认值为：SuperMap.Pixel.Mode.LeftTop
     * */
    mode:null,
    
    /**
     * Constructor: SuperMap.Pixel
     * 创建新的SuperMap.Pixel实例。
     *
     * 例如:
     * (start code)
     * //单独创建一个对象
     * var pixcel = new SuperMap.Pixel(100,50);
     *
     * //依据size创建
     *  var size = new SuperMap.Size(21,25);
     *	var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
     * (end)	 
     *		 
     * Parameters:
     * x - {Number} x坐标，默认为0.0
     * y - {Number} y坐标，默认为0.0
     * mode - {String} 坐标模式，默认为SuperMap.Pixel.Mode.LeftTop
     *
     * Returns:
     * 返回 <SuperMap.Pixel> 实例。
     */
    initialize: function(x, y,mode) {
        this.x = x?parseFloat(x):this.x;
        this.y = y?parseFloat(y):this.y;
        this.mode=mode;
    },
    
    /**
     * APIMethod: toString
     * 返回此对象的字符串形式
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * var str = pixcel.toString();
     * (end)
     *
     * Returns:
     * {String} 例如: "x=200.4,y=242.2"
     */
    toString:function() {
        return ("x=" + this.x + ",y=" + this.y);
    },

    /**
     * APIMethod: clone
     * 克隆当前的 pixel 对象。
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = pixcel.clone();
     * (end)
     *
     * Returns:
     * {<SuperMap.Pixel>} 返回一个新的与当前 pixel 对象有相同x、y坐标的 pixel 对象。
     */
    clone:function() {
        return new SuperMap.Pixel(this.x, this.y,this.mode);
    },
    
    /**
     * APIMethod: equals
     * 比较两 pixel 是否相等
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(100,50);
     * var isEquals = pixcel.equals(pixcel2);
     * (end)
     *
     * Parameters:
     * px - {<SuperMap.Pixel>} 用于比较相等的 pixel 对象。
     *
     * Returns:
     * {Boolean} 如果传入的像素点和当前像素点相同返回true,如果不同或传入参数为NULL则返回false
     */
    equals:function(px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) ||
                      (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },

    /**
     * APIMethod: distanceTo
     * 返回两个 pixel 的距离。
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(110,30);
     * var distance = pixcel.distanceTo(pixcel2);
     * (end)
     *
     * Parameters:
     * px - {<SuperMap.Pixel>} 用于计算的一个 pixel
     *
     * Returns:
     * {Float} 作为参数传入的像素与当前像素点的距离。
     */
    distanceTo:function(px) {
        return Math.sqrt(
            Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2)
        );
    },

    /**
     * APIMethod: add
     * 在原来像素坐标基础上，x值加上传入的x参数，y值加上传入的y参数。
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * //pixcel2是新的对象
     * var pixcel2 = pixcel.add(20,30);
     * (end)
     *
     * Parameters:
     * x - {Number} 传入的x值。
     * y - {Number} 传入的y值。
     *
     * Returns:
     * {<SuperMap.Pixel>} 返回一个新的pixel对象，该pixel是由当前的pixel与传
     *      入的x,y相加得到。
     */
    add:function(x, y) {
        if ( (x == null) || (y == null) ) {
            throw new TypeError('Pixel.add cannot receive null values');
        }
        return new SuperMap.Pixel(this.x + x, this.y + y);
    },

    /**
     * APIMethod: offset
     * 通过传入的 <SuperMap.Pixel> 参数对原屏幕坐标进行偏移。
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(130,20);
     * //pixcel3 是新的对象
     * var pixcel3 = pixcel.offset(pixcel2);
     * (end)
     *
     * Parameters
     * px - {<SuperMap.Pixel>}  传入的 <SuperMap.Pixel> 对象。
     *
     * Returns:
     * {<SuperMap.Pixel>} 返回一个新的pixel，该pixel是由当前的pixel对象的x，y
     *      值与传入的Pixel对象的x，y值相加得到。
     */
    offset:function(px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },
    /**
     *
     * APIMethod: destroy
     * 销毁此对象。
     * 销毁后此对象的所有属性为null，而不是初始值。
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Pixel(100,50);
     * pixcel.destroy();
     * (end)
     *
     */
    destroy: function() {
        this.x = null;
        this.y = null;
        this.mode=null;
    },

    CLASS_NAME: "SuperMap.Pixel"
});

/**
 * Constant:SuperMap.Pixel.Mode.LeftTop
 * 左上模式
 * */

/**
 * Constant:SuperMap.Pixel.Mode.RightTop
 * 右上模式
 * */

/**
 * Constant:SuperMap.Pixel.Mode.RightBottom
 * 右下模式
 * */

/**
 * Constant:SuperMap.Pixel.Mode.LeftBottom
 * 左下模式
 * */
SuperMap.Pixel.Mode={
    LeftTop:"lefttop",
    RightTop:"righttop",
    RightBottom:"rightbottom",
    LeftBottom:"leftbottom"
}
