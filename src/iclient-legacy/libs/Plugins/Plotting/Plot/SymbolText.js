/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.SymbolText
 * 子标号信息
 */
SuperMap.Plot.SymbolText = new SuperMap.Class({

    /**
     * APIProperty: textContent
     * {String} 文字内容
     */
    textContent: null,

    /**
     * APIProperty: textPosition
     * {<SuperMap.Plot.AnnoPosition>} 文字相对标号的位置
     */
    textPosition: null,

    /**
     * APIProperty: offsetX
     * {Float} 文字内容在X方向的偏移量,单位是像素
     */
    offsetX: null,

    /**
     * APIProperty: offsetY
     * {Float} 文字内容在Y方向的偏移量, 单位是像素
     */
    offsetY: null,

    /**
     * Constructor: SuperMap.Plot.SymbolText
     * 创建对象标注。
     *
     * Parameters:
     * options - {Object} 对象标注参数
     *
     * Returns:
     * {<SuperMap.Plot.SymbolText>} 新的对象标注。
     */
    initialize:function(textContent, textPosition, options){
        this.textContent = textContent;
        this.textPosition = textPosition;

        if(options){
            SuperMap.Util.extend(this, options);
        }

        if(this.textContent === undefined || this.textContent === null){
            this.textContent = "";
        }

        if(this.textPosition === undefined || this.textPosition === null){
            this.textPosition = 0;
        }

        if(this.offsetX === null){
            this.offsetX = 0;
        }

        if(this.offsetY === null){
            this.offsetY = 0;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.textContent = null;
        this.textPosition = null;
        this.offsetX = null;
        this.offsetY = null;
    },

    CLASS_NAME:"SuperMap.Plot.SymbolText"
});