/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/Feature/Vector.js
 */

/**
 * Class: SuperMap.Style
 * 风格样式类.
 */
SuperMap.Style = SuperMap.Class({

    /**
     * Property: id
     * {String} A unique id for this session.
     */
    id: null,
    
    /**
     * APIProperty: name
     * {String} 样式名称
     */
    name: null,
    
    /**
     * Property: title
     * {String} Title of this style (set if included in SLD)
     */
    title: null,
    
    /**
     * Property: description
     * {String} Description of this style (set if abstract is included in SLD)
     */
    description: null,

    /**
     * APIProperty: layerName
     * {<String>} 样式所属图层的名称。
     */
    layerName: null,
    
    /**
     * APIProperty: isDefault
     * {Boolean}
     */
    isDefault: false,
     
    /** 
     * Property: rules 
     * {Array(<SuperMap.Rule>)}
     */
    rules: null,
    
    /**
     * Property: context
     * {Object} An optional object with properties that symbolizers' property
     * values should be evaluated against. If no context is specified,
     * feature.attributes will be used
     */
    context: null,

    /**
     * Property: defaultStyle
     * {Object} hash of style properties to use as default for merging
     * rule-based style symbolizers onto. If no rules are defined,
     * createSymbolizer will return this style. If <defaultsPerSymbolizer> is set to
     * true, the defaultStyle will only be taken into account if there are
     * rules defined.
     */
    defaultStyle: null,
    
    /**
     * Property: defaultsPerSymbolizer
     * {Boolean} If set to true, the <defaultStyle> will extend the symbolizer
     * of every rule. Properties of the <defaultStyle> will also be used to set
     * missing symbolizer properties if the symbolizer has stroke, fill or
     * graphic set to true. Default is false.
     */
    defaultsPerSymbolizer: false,
    
    /**
     * Property: propertyStyles
     * {Hash of Boolean} cache of style properties that need to be parsed for
     * propertyNames. Property names are keys, values won't be used.
     */
    propertyStyles: null,
    

    /** 
     * Constructor: SuperMap.Style
     * 创建用户的样式。
     *
     * Parameters:
     * style   - {Object} 传入的指定样式，如果构造函数中没有指定style，则通过 <SuperMap.Feature.Vector> 方法使用默认风格。
     * options - {Object} 设置在此类上的属性。
     * 
     * Return:
     * {<SuperMap.Style>}
     */
    initialize: function(style, options) {

        SuperMap.Util.extend(this, options);
        this.rules = [];
        if(options && options.rules) {
            this.addRules(options.rules);
        }

        // use the default style from SuperMap.Feature.Vector if no style
        // was given in the constructor
        this.setDefaultStyle(style ||
                             SuperMap.Feature.Vector.style["default"]);

        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_");
    },

    /** 
     * APIMethod: destroy
     * 销毁对象使对其的引用无效，以防止循环引用和内存泄漏。
     */
    destroy: function() {
        for (var i=0, len=this.rules.length; i<len; i++) {
            this.rules[i].destroy();
            this.rules[i] = null;
        }
        this.rules = null;
        this.defaultStyle = null;
    },
    
    /**
     * Method: createSymbolizer
     * creates a style by applying all feature-dependent rules to the base
     * style.
     * 
     * Parameters:
     * feature - {<SuperMap.Feature>} feature to evaluate rules for
     * 
     * Returns:
     * {Object} symbolizer hash
     */
    createSymbolizer: function(feature) {
        var style = this.defaultsPerSymbolizer ? {} : this.createLiterals(
            SuperMap.Util.extend({}, this.defaultStyle), feature);
        
        var rules = this.rules;

        var rule, context;
        var elseRules = [];
        var appliedRules = false;
        for(var i=0, len=rules.length; i<len; i++) {
            rule = rules[i];
            // does the rule apply?
            var applies = rule.evaluate(feature);
            
            if(applies) {
                if(rule instanceof SuperMap.Rule && rule.elseFilter) {
                    elseRules.push(rule);
                } else {
                    appliedRules = true;
                    this.applySymbolizer(rule, style, feature);
                }
            }
        }
        
        // if no other rules apply, apply the rules with else filters
        if(appliedRules == false && elseRules.length > 0) {
            appliedRules = true;
            for(var i=0, len=elseRules.length; i<len; i++) {
                this.applySymbolizer(elseRules[i], style, feature);
            }
        }

        // don't display if there were rules but none applied
        if(rules.length > 0 && appliedRules == false) {
            style.display = "none";
        }
        
        if (style.label != null && typeof style.label !== "string") {
            style.label = String(style.label);
        }
        
        return style;
    },
    
    /**
     * Method: applySymbolizer
     *
     * Parameters:
     * rule - {SuperMap.Rule}
     * style - {Object}
     * feature - {<OpenLayer.Feature.Vector>}
     *
     * Returns:
     * {Object} A style with new symbolizer applied.
     */
    applySymbolizer: function(rule, style, feature) {
        var symbolizerPrefix = feature.geometry ?
                this.getSymbolizerPrefix(feature.geometry) :
                SuperMap.Style.SYMBOLIZER_PREFIXES[0];

        var symbolizer = rule.symbolizer[symbolizerPrefix] || rule.symbolizer;
        
        if(this.defaultsPerSymbolizer === true) {
            var defaults = this.defaultStyle;
            SuperMap.Util.applyDefaults(symbolizer, {
                pointRadius: defaults.pointRadius
            });
            if(symbolizer.stroke === true || symbolizer.graphic === true) {
                SuperMap.Util.applyDefaults(symbolizer, {
                    strokeWidth: defaults.strokeWidth,
                    strokeColor: defaults.strokeColor,
                    strokeOpacity: defaults.strokeOpacity,
                    strokeDashstyle: defaults.strokeDashstyle,
                    strokeLinecap: defaults.strokeLinecap
                });
            }
            if(symbolizer.fill === true || symbolizer.graphic === true) {
                SuperMap.Util.applyDefaults(symbolizer, {
                    fillColor: defaults.fillColor,
                    fillOpacity: defaults.fillOpacity
                });
            }
            if(symbolizer.graphic === true) {
                SuperMap.Util.applyDefaults(symbolizer, {
                    pointRadius: this.defaultStyle.pointRadius,
                    externalGraphic: this.defaultStyle.externalGraphic,
                    graphicName: this.defaultStyle.graphicName,
                    graphicOpacity: this.defaultStyle.graphicOpacity,
                    graphicWidth: this.defaultStyle.graphicWidth,
                    graphicHeight: this.defaultStyle.graphicHeight,
                    graphicXOffset: this.defaultStyle.graphicXOffset,
                    graphicYOffset: this.defaultStyle.graphicYOffset
                });
            }
        }

        // merge the style with the current style
        return this.createLiterals(
                SuperMap.Util.extend(style, symbolizer), feature);
    },
    
    /**
     * Method: createLiterals
     * creates literals for all style properties that have an entry in
     * <this.propertyStyles>.
     * 
     * Parameters:
     * style   - {Object} style to create literals for. Will be modified
     *           inline.
     * feature - {Object}
     * 
     * Returns:
     * {Object} the modified style
     */
    createLiterals: function(style, feature) {
        var context = SuperMap.Util.extend({}, feature.attributes || feature.data);
        SuperMap.Util.extend(context, this.context);
        
        for (var i in this.propertyStyles) {
            style[i] = SuperMap.Style.createLiteral(style[i], context, feature, i);
        }
        return style;
    },
    
    /**
     * Method: findPropertyStyles
     * Looks into all rules for this style and the defaultStyle to collect
     * all the style hash property names containing ${...} strings that have
     * to be replaced using the createLiteral method before returning them.
     * 
     * Returns:
     * {Object} hash of property names that need createLiteral parsing. The
     * name of the property is the key, and the value is true;
     */
    findPropertyStyles: function() {
        var propertyStyles = {};

        // check the default style
        var style = this.defaultStyle;
        this.addPropertyStyles(propertyStyles, style);

        // walk through all rules to check for properties in their symbolizer
        var rules = this.rules;
        var symbolizer, value;
        for (var i=0, len=rules.length; i<len; i++) {
            symbolizer = rules[i].symbolizer;
            for (var key in symbolizer) {
                value = symbolizer[key];
                if (typeof value === "object") {
                    // symbolizer key is "Point", "Line" or "Polygon"
                    this.addPropertyStyles(propertyStyles, value);
                } else {
                    // symbolizer is a hash of style properties
                    this.addPropertyStyles(propertyStyles, symbolizer);
                    break;
                }
            }
        }
        return propertyStyles;
    },
    
    /**
     * Method: addPropertyStyles
     * 
     * Parameters:
     * propertyStyles - {Object} hash to add new property styles to. Will be
     *                  modified inline
     * symbolizer     - {Object} search this symbolizer for property styles
     * 
     * Returns:
     * {Object} propertyStyles hash
     */
    addPropertyStyles: function(propertyStyles, symbolizer) {
        var property;
        for (var key in symbolizer) {
            property = symbolizer[key];
            if (typeof property === "string" &&
                    property.match(/\$\{\w+\}/)) {
                propertyStyles[key] = true;
            }
        }
        return propertyStyles;
    },
    
    /**
     * Method: addRules
     * 添加样式规则。
     * 
     * Parameters:
     * rules - {Array(<SuperMap.Rule>)}
     */
    addRules: function(rules) {
        Array.prototype.push.apply(this.rules, rules);
        this.propertyStyles = this.findPropertyStyles();
    },
    
    /**
     * APIMethod: setDefaultStyle
     * 为当前样式设置默认样式属性。
     * 
     * Parameters:
     * style - {Object} 需要被设置为默认的样式属性。
     */
    setDefaultStyle: function(style) {
        this.defaultStyle = style; 
        this.propertyStyles = this.findPropertyStyles();
    },
        
    /**
     * Method: getSymbolizerPrefix
     * Returns the correct symbolizer prefix according to the
     * geometry type of the passed geometry
     * 
     * Parameters:
     * geometry {<SuperMap.Geometry>}
     * 
     * Returns:
     * {String} key of the according symbolizer
     */
    getSymbolizerPrefix: function(geometry) {
        var prefixes = SuperMap.Style.SYMBOLIZER_PREFIXES;
        for (var i=0, len=prefixes.length; i<len; i++) {
            if (geometry.CLASS_NAME.indexOf(prefixes[i]) !== -1) {
                return prefixes[i];
            }
        }
    },
    
    /**
     * APIMethod: clone
     * 克隆当前样式。
     * 
     * Returns:
     * {<SuperMap.Style>} 当前样式的克隆副本。
     */
    clone: function() {
        var options = SuperMap.Util.extend({}, this);
        // clone rules
        if(this.rules) {
            options.rules = [];
            for(var i=0, len=this.rules.length; i<len; ++i) {
                options.rules.push(this.rules[i].clone());
            }
        }
        // clone context
        options.context = this.context && SuperMap.Util.extend({}, this.context);
        //clone default style
        var defaultStyle = SuperMap.Util.extend({}, this.defaultStyle);
        return new SuperMap.Style(defaultStyle, options);
    },
    
    CLASS_NAME: "SuperMap.Style"
});


/**
 * Function: createLiteral
 * converts a style value holding a combination of PropertyName and Literal
 * into a Literal, taking the property values from the passed features.
 * 
 * Parameters:
 * value - {String} value to parse. If this string contains a construct like
 *         "foo ${bar}", then "foo " will be taken as literal, and "${bar}"
 *         will be replaced by the value of the "bar" attribute of the passed
 *         feature.
 * context - {Object} context to take attribute values from
 * feature - {<SuperMap.Feature.Vector>} optional feature to pass to
 *           <SuperMap.String.format> for evaluating functions in the
 *           context.
 * property - {String} optional, name of the property for which the literal is
 *            being created for evaluating functions in the context.
 * 
 * Returns:
 * {String} the parsed value. In the example of the value parameter above, the
 * result would be "foo valueOfBar", assuming that the passed feature has an
 * attribute named "bar" with the value "valueOfBar".
 */
SuperMap.Style.createLiteral = function(value, context, feature, property) {
    if (typeof value === "string" && value.indexOf("${") !== -1) {
        value = SuperMap.String.format(value, context, [feature, property]);
        value = (isNaN(value) || !value) ? value : parseFloat(value);
    }
    return value;
};
    
/**
 * Constant: SuperMap.Style.SYMBOLIZER_PREFIXES
 * {Array} sld symbolizers的前缀，与geometry类型相同，可以是Point，Line，Polygon，Text，Raster。 
 */
SuperMap.Style.SYMBOLIZER_PREFIXES = ['Point', 'Line', 'Polygon', 'Text',
    'Raster'];
