/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Handler/Keyboard.js
 */

/**
 * Class: SuperMap.Control.KeyboardDefaults
 * 该类可以通过键盘操作地图平移和缩放。
 * 默认时，箭头键表示平移，+/- 键表示缩放，Page Up/Page Down/Home/End 表示滚动当前页面的3行。
 * 该控件不可见。 
 * 可以通过两种方法在 map 上添加控件
 * 第一种是，在实例化 map 时 设置 map 的 options 属性添加控件，如：
 * (code)
 * var map = new SuperMap.Map("map",{controls:[
 *     new SuperMap.Control.KeyboardDefaults() 
 * ]});
 * (end)
 * 第二种方法是通过 map 的 addControl() 方法添加控件，如：
 * (code)
 * var map = new SuperMap.Map("map");
 * map.addControl(new SuperMap.Control.KeyboardDefaults());
 * (end)
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.KeyboardDefaults = SuperMap.Class(SuperMap.Control, {

    /**
     * APIProperty: autoActivate
     * {Boolean} 加载到页面上时，是否自动激活。默认为true，自动激活。
     */
    autoActivate: true,

    /**
     * APIProperty: slideFactor
     * 滑动系数，默认为75。
     */
    slideFactor: 75,
       
    /**
     * Method: draw
     * Create handler.
     */
    draw: function() {
        this.handler = new SuperMap.Handler.Keyboard( this, { 
                                "keydown": this.defaultKeyPress });
    },
    
    /**
     * Method: defaultKeyPress
     * When handling the key event, we only use evt.keyCode. This holds 
     * some drawbacks, though we get around them below. When interpretting
     * the keycodes below (including the comments associated with them),
     * consult the URL below. For instance, the Safari browser returns
     * "IE keycodes", and so is supported by any keycode labeled "IE".
     * 
     * Very informative URL:
     *    http://unixpapa.com/js/key.html
     *
     * Parameters:
     * evt - {Event} 
     */
    defaultKeyPress: function (evt) {
        var size, handled = true;
        switch(evt.keyCode) {
            case SuperMap.Event.KEY_LEFT:
                this.map.pan(-this.slideFactor, 0);
                break;
            case SuperMap.Event.KEY_RIGHT: 
                this.map.pan(this.slideFactor, 0);
                break;
            case SuperMap.Event.KEY_UP:
                this.map.pan(0, -this.slideFactor);
                break;
            case SuperMap.Event.KEY_DOWN:
                this.map.pan(0, this.slideFactor);
                break;
            
            case 33: // Page Up. Same in all browsers.
                size = this.map.getSize();
                this.map.pan(0, -0.75*size.h);
                break;
            case 34: // Page Down. Same in all browsers.
                size = this.map.getSize();
                this.map.pan(0, 0.75*size.h);
                break; 
            case 35: // End. Same in all browsers.
                size = this.map.getSize();
                this.map.pan(0.75*size.w, 0);
                break; 
            case 36: // Home. Same in all browsers.
                size = this.map.getSize();
                this.map.pan(-0.75*size.w, 0);
                break; 

            case 43:  // +/= (ASCII), keypad + (ASCII, Opera)
            case 61:  // +/= (Mozilla, Opera, some ASCII)
            case 187: // +/= (IE)
            case 107: // keypad + (IE, Mozilla)
                this.map.zoomIn();
                break; 
            case 45:  // -/_ (ASCII, Opera), keypad - (ASCII, Opera)
            case 109: // -/_ (Mozilla), keypad - (Mozilla, IE)
            case 189: // -/_ (IE)
            case 95:  // -/_ (some ASCII)
                this.map.zoomOut();
                break; 
            default:
                handled = false;
        } 
        if (handled) {
            // prevent browser default not to move the page
            // when moving the page with the keyboard
            SuperMap.Event.stop(evt);
        }
    },

    CLASS_NAME: "SuperMap.Control.KeyboardDefaults"
});
