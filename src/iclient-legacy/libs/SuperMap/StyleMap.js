/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style.js
 * @requires SuperMap/Feature/Vector.js
 */
 
/**
 * Class: SuperMap.StyleMap
 * 图层样式组类，定义vector图层不同状态下的样式信息。属性styles中存储由key(‘state’), value(‘Style’) 
 * 组成的状态-样式键值对信息。
 */
SuperMap.StyleMap = SuperMap.Class({
    
    /**
     * APIProperty: styles
     * Hash of {<SuperMap.Style>} 属性styles中存储由key(‘state’), value(‘Style’) 组成的状态-样式键值对构成。 
     * 默认支持四种样式 "default", "temporary", "select", "delete"。
     * "default":即矢量要素默认状态（不被进行任何操作）下的style，若用户不进行单独设置其图层的style属性或者feature要素的style属性，则会使用stylemap中的default对应的style属性。它默认填充色透明黄色，可在stylemap类的声明时候进行更改。
     * "temporary"：在激活drawfeature控件下，矢量要素在被绘制的过程状态下的style，它默认蓝色实心边界，填充带有透明度的蓝色，可在stylemap类的声明时候进行更改。
     * "select"：在激活selectFeature控件下，矢量要素被选中（点击该矢量要素）状态下的style，若用户不进行单独设置其selectfeature的selectstyle属性，则会使用stylemap中的select对应的style。它默认填充色透明紫色，可在stylemap类的声明时候进行更改。
     * "delete"：用来表示被删除的要素的样式（实际上未被删除，还留在图层上）。
     */
    styles: null,
    
    /**
     * Property: extendDefault
     * {Boolean} if true, every render intent will extend the symbolizers
     * specified for the "default" intent at rendering time. Otherwise, every
     * rendering intent will be treated as a completely independent style.
     */
    extendDefault: true,
    
    /**
     * Constructor: SuperMap.StyleMap
     * 构造 StyleMap 新实例，可通过三种方式构造StyleMap 新实例。
     *
     *
     * Parameters:
     * style - {Object} 传入的style参数。
     *
     * 样式参数分多种情况:
     * 1)设置单一样式对象Style，结果会将四种状态样式都设置为此，即相当于没有了状态区别；
     *
     * 2)样式组信息，由状态标签-样式组成的键值对key：Style（或者Object），读取提供的样式，覆盖默认值，
     * 如果后面的值不是Style对象，内部对其封装成Style后使用；
     *
     * 3)有样式具体信息构成的Object对象，直接将其封装成Style样式，然后同1；
     *
     * 4)当默认支持的四种状态不能满足用户需求时，用户也可自定义状态及其样式。
     *      
     * 以上几种情况示例代码如下所示： 
     *      
     * (1) 直接设置单一style，实现代码如下,依照下面代码定义样式之后，四种状态都有下面的style样式     
     * (code)
     * var myStyles = new SuperMap.StyleMap(     
     *     new SuperMap.Style({     
     *            fillColor:"#ffcc33",    
     *            strokeColor:"#ccff99",
     *            strokeWidth:2,
     *            graphicZIndex:1
     *     })
     * );      
     * (end)           
     * (2) 直接设置状态-样式键值对，代码如下所示，需要注意的是，代码中只定义了default 和 select两个状态的样式
     * 所以仅仅这两个状态有样式，两外两种状态 temporary、delete 的样式为 null     
     * (code)     
     * var myStyles = new SuperMap.StyleMap({     
     *     "default":new SuperMap.Style({     
     *            fillColor:"#ffcc33",    
     *            strokeColor:"#ccff99",
     *            strokeWidth:2,
     *            graphicZIndex:1
     *     }),     
     *     "select":{
     *            fillColor:"33eeff",
     *            strokeColor:"3366aa",
     *            graphicZIndex:2
     *     }
     * });          
     * (end)      
     *      
     * (3)直接传入样式信息，实现代码如下：     
     * (code)     
     * var myStyles = new SuperMap.StyleMap({     
     *        fillColor:"#ffcc33",    
     *        strokeColor:"#ccff99",
     *        strokeWidth:2,
     *        graphicZIndex:1
     * });     
     * (end)      
     *      
     * (4) 自定义状态及其样式，代码如下：     
     * (code)     
     * var myStyles = new SuperMap.StyleMap({     
     *     "default":new SuperMap.Style({     
     *            fillColor:"#ffcc33",    
     *            strokeColor:"#ccff99",
     *            strokeWidth:2,
     *            graphicZIndex:1
     *     }),     
     *     "click":{
     *            fillColor:"33eeff",
     *            strokeColor:"3366aa",
     *            graphicZIndex:2
     *     }     
     * });     
     * (end)      
     *      
     * options - {Object} 此类开出来的属性。
     */
    initialize: function (style, options) {
        this.styles = {
            "default": new SuperMap.Style(
                SuperMap.Feature.Vector.style["default"]),
            "select": new SuperMap.Style(
                SuperMap.Feature.Vector.style["select"]),
            "temporary": new SuperMap.Style(
                SuperMap.Feature.Vector.style["temporary"]),
            "delete": new SuperMap.Style(
                SuperMap.Feature.Vector.style["delete"])
        };
        
        // take whatever the user passed as style parameter and convert it
        // into parts of stylemap.
        if(style instanceof SuperMap.Style) {
            // user passed a style object
            this.styles["default"] = style;
            this.styles["select"] = style;
            this.styles["temporary"] = style;
            this.styles["delete"] = style;
        } else if(typeof style === "object") {
            for(var key in style) {
                if(style[key] instanceof SuperMap.Style) {
                    // user passed a hash of style objects
                    this.styles[key] = style[key];
                } else if(typeof style[key] === "object") {
                    // user passsed a hash of style hashes
                    this.styles[key] = new SuperMap.Style(style[key]);
                } else {
                    // user passed a style hash (i.e. symbolizer)
                    this.styles["default"] = new SuperMap.Style(style);
                    this.styles["select"] = new SuperMap.Style(style);
                    this.styles["temporary"] = new SuperMap.Style(style);
                    this.styles["delete"] = new SuperMap.Style(style);
                    break;
                }
            }
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * Method: destroy
     */
    destroy: function() {
        for(var key in this.styles) {
            this.styles[key].destroy();
        }
        this.styles = null;
    },
    
    /**
     * Method: createSymbolizer
     * Creates the symbolizer for a feature for a render intent.
     * 
     * Parameters:
     * feature - {<SuperMap.Feature>} The feature to evaluate the rules
     *           of the intended style against.
     * intent  - {String} The intent determines the symbolizer that will be
     *           used to draw the feature. Well known intents are "default"
     *           (for just drawing the features), "select" (for selected
     *           features) and "temporary" (for drawing features).
     * 
     * Returns:
     * {Object} symbolizer hash
     */
    createSymbolizer: function(feature, intent) {
        if(!feature) {
            feature = new SuperMap.Feature.Vector();
        }
        if(!this.styles[intent]) {
            intent = "default";
        }
        feature.renderIntent = intent;
        var defaultSymbolizer = {};
        if(this.extendDefault && intent !== "default") {
            defaultSymbolizer = this.styles["default"].createSymbolizer(feature);
        }
        return SuperMap.Util.extend(defaultSymbolizer,
            this.styles[intent].createSymbolizer(feature));
    },
    
    /**
     * Method: addUniqueValueRules
     * Convenience method to create comparison rules for unique values of a
     * property. The rules will be added to the style object for a specified
     * rendering intent. This method is a shortcut for creating something like
     * the "unique value legends" familiar from well known desktop GIS systems
     * 
     * Parameters:
     * renderIntent - {String} rendering intent to add the rules to
     * property     - {String} values of feature attributes to create the
     *                rules for
     * symbolizers  - {Object} Hash of symbolizers, keyed by the desired
     *                property values 
     * context      - {Object} An optional object with properties that
     *                symbolizers' property values should be evaluated
     *                against. If no context is specified, feature.attributes
     *                will be used
     */
    addUniqueValueRules: function(renderIntent, property, symbolizers, context) {
        var rules = [];
        for (var value in symbolizers) {
            rules.push(new SuperMap.Rule({
                symbolizer: symbolizers[value],
                context: context,
                filter: new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.EQUAL_TO,
                    property: property,
                    value: value
                })
            }));
        }
        this.styles[renderIntent].addRules(rules);
    },

    CLASS_NAME: "SuperMap.StyleMap"
});
