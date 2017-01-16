/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/Theme/Theme.js
 * @requires SuperMap/REST/Theme/ThemeFlow.js
 * @requires SuperMap/REST/Theme/ThemeOffset.js
 * @requires SuperMap/REST/Theme/ThemeGraduatedSymbolStyle.js
 */
 
/**
 * Class: SuperMap.REST.ThemeGraduatedSymbol
 * 等级符号专题图。  
 * 等级符号专题图是采用不同的形状、颜色和大小的符号，表示各自独立的、以整体概念显示的各个物体的数量与质量特征。通常，以符号的形状、
 * 颜色和大小反映物体的特定属性；符号的形状与颜色表示质量特征，符号的大小表示数量特征。等级符号专题图多用于具有数量特征的地图上，
 * 比如表示不同地区的粮食产量、GDP、人口等的分级，也就是说，用于制作等级符号专题图的专题变量类型为数值型。
 * 
 * Inherits from:
 * -<SuperMap.REST.Theme>
 */
 
 SuperMap.REST.ThemeGraduatedSymbol = SuperMap.Class(SuperMap.REST.Theme, {
     
    /**
     * APIProperty: baseValue
     * { Number} 等级符号专题图的基准值，单位同专题变量的单位。
     * 依据此值系统会自动根据分级方式计算其余值对应的符号大小，每个符号的显示大小等于 ThemeValueSection.positiveStyle（或 zeroStyle，negativeStyle）.markerSize * value / basevalue，
     * 其中 value 是 expression 所指定字段对应的值经过分级计算之后的值。默认值为0，建议通过多次尝试设置该值才能达到较好的显示效果。 
     */
    baseValue: 0,
    
    /**
     * APIProperty: expression
     * {String} 用于创建等级符号专题图的字段或字段表达式，字段或字段表达式应为数值型。必设字段。  
     */
    expression: null,
    
    /**
     * APIProperty: flow
     * {<SuperMap.REST.ThemeFlow>} 等级符号专题图符号流动显示与牵引线设置类。
     * 通过该字段可以设置等级符号是否流动显示和牵引线风格。
     */
    flow: null,
    
    /**
     * APIProperty: graduatedMode
     * {<SuperMap.REST.GraduatedMode>} 等级符号专题图分级模式。
     * 分级主要是为了减少制作等级符号专题图中数据大小之间的差异。如果数据之间差距较大，则可以采用对数或者平方根的分级方式来进行，
     * 这样就减少了数据之间的绝对大小的差异，使得等级符号图的视觉效果比较好，同时不同类别之间的比较也是有意义的。
     * 有三种分级模式：常数、对数和平方根，对于有值为负数的字段，在用对数或平方根方式分级时，默认对负数取正。
     * 不同的分级模式用于确定符号大小的数值是不相同的：常数按照字段的原始数据进行；对数则是对每条记录对应的专题变量取自然对数；平方根则是对其取平方根，然后用最终得到的结果来确定其等级符号的大小。
     * 默认值为 SuperMap.REST.GraduatedMode.Constant。 
     */
    graduatedMode: SuperMap.REST.GraduatedMode.CONSTANT,
    
    /**
     * APIProperty: offset
     * {<SuperMap.REST.ThemeOffset>} 用于设置等级符号图相对于要素内点的偏移量。
     */
    offset: null,
    
    /**
     * APIProperty: style
     * {<SuperMap.REST.ThemeGraduatedSymbolStyle>} 用于设置等级符号图正负和零值显示风格。
     */
    style: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeGraduatedSymbol
     * 等级符号专题图构造函数，用于创建 ThemeGraduatedSymbol类的新实例。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * baseValue - {Number} 等级符号专题图的基准值，单位同专题变量的单位。
     * expression - {String} 等级符号专题图的字段或字段表达式。 
     * flow - {<SuperMap.REST.ThemeFlow>} 等级符号专题图符号流动显示与牵引线设置类。
     * graduatedMode - {<SuperMap.REST.GraduatedMode>} 等级符号专题图分级模式。
     * offset - {<SuperMap.REST.ThemeOffset>} 用于设置标签专题图中标记文本相对于要素内点的偏移量对象。
     * style - {<SuperMap.REST.ThemeGraduatedSymbolStyle>} 用于设置等级符号图正负和零值显示风格。  
     * memoryData - {<SuperMap.REST.ThemeMemoryData>} 专题图内存数据。
     */
    initialize: function(options) {
        SuperMap.REST.Theme.prototype.initialize.apply(this, ["GRADUATEDSYMBOL", options]);
        var me = this;
        me.flow = new SuperMap.REST.ThemeFlow();
        me.offset = new SuperMap.REST.ThemeOffset();
        me.style = new SuperMap.REST.ThemeGraduatedSymbolStyle();
        if (options){
            SuperMap.Util.extend(this, options);
        }
    },
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.REST.Theme.prototype.destroy.apply(this, arguments);
        var me = this;
        me.expression = null;
        if (me.flow) {
            me.flow.destroy();
            me.flow = null;
        }
        me.graduatedMode = SuperMap.REST.GraduatedMode.CONSTANT;
        if (me.offset) {
            me.offset.destroy();
            me.offset = null;
        }
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
    },
    
    /**
     * Method: toJSON
     * 将themeLabel对象转化为json字符串。   
     *
     * Returns:
     * {String} 返回转换后的 JSON 字符串。
     */
     toJSON: function() {
        return SuperMap.Util.toJSON(this.toServerJSONObject());
    },
    
    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var obj = new Object();
        obj.type = this.type;
        obj.memoryData = this.memoryData;
        obj.baseValue = this.baseValue;
        obj.expression = this.expression;
        obj.graduatedMode = this.graduatedMode;
        if (this.flow) {
            obj.flowEnabled = this.flow.flowEnabled;
            obj.leaderLineDisplayed = this.flow.leaderLineDisplayed;
            obj.leaderLineStyle = this.flow.leaderLineStyle;
        }
        if (this.offset) {
            obj.offsetFixed = this.offset.offsetFixed;
            obj.offsetX = this.offset.offsetX;
            obj.offsetY = this.offset.offsetY;
        } 
        if (this.style) {
            obj.negativeStyle = this.style.negativeStyle;
            obj.negativeDisplayed = this.style.negativeDisplayed;
            obj.positiveStyle = this.style.positiveStyle;
            obj.zeroDisplayed = this.style.zeroDisplayed;
            obj.zeroStyle = this.style.zeroStyle;
        }
        return obj;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeGraduatedSymbol"
});
SuperMap.REST.ThemeGraduatedSymbol.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeGraduatedSymbol();
    SuperMap.Util.copy(res, obj);
    res.flow = SuperMap.REST.ThemeFlow.fromObj(obj);
    res.offset = SuperMap.REST.ThemeOffset.fromObj(obj);
    res.style = SuperMap.REST.ThemeGraduatedSymbolStyle.fromObj(obj);
    return res;
}
