/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/Style.js
 */

/**
 * Class: SuperMap.Rule
 * 规则类。
 */
SuperMap.Rule = SuperMap.Class({
    
    /**
     * Property: id
     * {String} A unique id for this session.
     */
    id: null,
    
    /**
     * APIProperty: name
     * {String} 当前规则名称。
     */
    name: null,
    
    /**
     * Property: title
     * {String} Title of this rule (set if included in SLD)
     */
    title: null,
    
    /**
     * Property: description
     * {String} Description of this rule (set if abstract is included in SLD)
     */
    description: null,

    /**
     * Property: context
     * {Object} An optional object with properties that the rule should be
     * evaluated against. If no context is specified, feature.attributes will
     * be used.
     */
    context: null,
    
    /**
     * Property: filter
     * {<SuperMap.Filter>} Optional filter for the rule.
     */
    filter: null,

    /**
     * Property: elseFilter
     * {Boolean} Determines whether this rule is only to be applied only if
     * no other rules match (ElseFilter according to the SLD specification). 
     * Default is false.  For instances of SuperMap.Rule, if elseFilter is
     * false, the rule will always apply.  For subclasses, the else property is 
     * ignored.
     */
    elseFilter: false,
    
    /**
     * Property: symbolizer
     * {Object} Symbolizer or hash of symbolizers for this rule. If hash of
     * symbolizers, keys are one or more of ["Point", "Line", "Polygon"]. The
     * latter if useful if it is required to style e.g. vertices of a line
     * with a point symbolizer. Note, however, that this is not implemented
     * yet in SuperMap, but it is the way how symbolizers are defined in
     * SLD.
     */
    symbolizer: null,
    
    /**
     * Property: symbolizers
     * {Array} Collection of symbolizers associated with this rule.  If 
     *     provided at construction, the symbolizers array has precedence
     *     over the deprecated symbolizer property.  Note that multiple 
     *     symbolizers are not currently supported by the vector renderers.
     *     Rules with multiple symbolizers are currently only useful for
     *     maintaining elements in an SLD document.
     */
    symbolizers: null,
    
    /**
     * APIProperty: minScaleDenominator
     * {Number} or {String} 绘制要素的最小比例尺。
     */
    minScaleDenominator: null,

    /**
     * APIProperty: maxScaleDenominator
     * {Number} or {String} 绘制要素的最大比例尺。
     */
    maxScaleDenominator: null,
    
    /** 
     * Constructor: SuperMap.Rule
     * 实例化规则类。
     *
     * Parameters:
     * options - {Object} 设置在规则上的可选属性。
     * 
     * Returns:
     * {<SuperMap.Rule>}
     */
    initialize: function(options) {
        this.symbolizer = {};
        SuperMap.Util.extend(this, options);
        if (this.symbolizers) {
            delete this.symbolizer;
        }
        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_");
    },

    /** 
     * APIMethod: destroy
     * 注销，防止循环引用和内存泄漏。
     */
    destroy: function() {
        for (var i in this.symbolizer) {
            this.symbolizer[i] = null;
        }
        this.symbolizer = null;
        delete this.symbolizers;
    },
    
    /**
     * APIMethod: evaluate
     * 判断指定要素规则。
     * 
     * Parameters:
     * feature - {<SuperMap.Feature>} 运用规则的要素。
     * 
     * Returns:
     * {Boolean} 如果规则适用返回true，否则返回false
     * 当前规则是默认规则，则一直返回true。
     */
    evaluate: function(feature) {
        var context = this.getContext(feature);
        var applies = true;

        if (this.minScaleDenominator || this.maxScaleDenominator) {
            var scale = feature.layer.map.getScale();
        }
        
        // check if within minScale/maxScale bounds
        if (this.minScaleDenominator) {
            applies = scale >= SuperMap.Style.createLiteral(
                    this.minScaleDenominator, context);
        }
        if (applies && this.maxScaleDenominator) {
            applies = scale < SuperMap.Style.createLiteral(
                    this.maxScaleDenominator, context);
        }
        
        // check if optional filter applies
        if(applies && this.filter) {
            // feature id filters get the feature, others get the context
            if(this.filter.CLASS_NAME === "SuperMap.Filter.FeatureId") {
                applies = this.filter.evaluate(feature);
            } else {
                applies = this.filter.evaluate(context);
            }
        }

        return applies;
    },
    
    /**
     * Method: getContext
     * Gets the context for evaluating this rule
     * 
     * Paramters:
     * feature - {<SuperMap.Feature>} feature to take the context from if
     *           none is specified.
     */
    getContext: function(feature) {
        var context = this.context;
        if (!context) {
            context = feature.attributes || feature.data;
        }
        if (typeof this.context === "function") {
            context = this.context(feature);
        }
        return context;
    },
    
    /**
     * APIMethod: clone
     * 克隆当前规则。
     * 
     * Returns:
     * {<SuperMap.Rule>} 当前规则的克隆副本。
     */
    clone: function() {
        var options = SuperMap.Util.extend({}, this);
        if (this.symbolizers) {
            // clone symbolizers
            var len = this.symbolizers.length;
            options.symbolizers = new Array(len);
            for (var i=0; i<len; ++i) {
                options.symbolizers[i] = this.symbolizers[i].clone();
            }
        } else {
            // clone symbolizer
            options.symbolizer = {};
            var value, type;
            for(var key in this.symbolizer) {
                value = this.symbolizer[key];
                type = typeof value;
                if(type === "object") {
                    options.symbolizer[key] = SuperMap.Util.extend({}, value);
                } else if(type === "string") {
                    options.symbolizer[key] = value;
                }
            }
        }
        // clone filter
        options.filter = this.filter && this.filter.clone();
        // clone context
        options.context = this.context && SuperMap.Util.extend({}, this.context);
        return new SuperMap.Rule(options);
    },
        
    CLASS_NAME: "SuperMap.Rule"
});