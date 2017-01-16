/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Filter.js
 */

/**
 * Class: SuperMap.Filter.Comparison
 * 这个类代表一个比较过滤器。
 *
 * Inherits from:
 * - <SuperMap.Filter>
 */
SuperMap.Filter.Comparison = SuperMap.Class(SuperMap.Filter, {

    /**
     * APIProperty: type
     * {String} 比较方式的类型。
     *
     * 它是下边之一:
     * - SuperMap.Filter.Comparison.EQUAL_TO                 = "==";
     * - SuperMap.Filter.Comparison.NOT_EQUAL_TO             = "!=";
     * - SuperMap.Filter.Comparison.LESS_THAN                = "<";
     * - SuperMap.Filter.Comparison.GREATER_THAN             = ">";
     * - SuperMap.Filter.Comparison.LESS_THAN_OR_EQUAL_TO    = "<=";
     * - SuperMap.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO = ">=";
     * - SuperMap.Filter.Comparison.BETWEEN                  = "..";
     * - SuperMap.Filter.Comparison.LIKE                     = "~";
     */
    type:null,

    /**
     * APIProperty: property
     * {String}
     * 用于比较的给定环境属性的名称。
     */
    property:null,

    /**
     * APIProperty: value
     * {Number} or {String}
     * 二进制比较的比较值。当是字符串的时候，它可以是 "文本 ${属性名}" 形式
     *      的文本和属性名的一种结合。
     */
    value:null,

    /**
     * Property: matchCase
     * {Boolean} Force case sensitive searches for EQUAL_TO and NOT_EQUAL_TO
     *     comparisons.  The Filter Encoding 1.1 specification added a matchCase
     *     attribute to ogc:PropertyIsEqualTo and ogc:PropertyIsNotEqualTo
     *     elements.  This property will be serialized with those elements only
     *     if using the v1.1.0 filter format. However, when evaluating filters
     *     here, the matchCase property will always be respected (for EQUAL_TO
     *     and NOT_EQUAL_TO).  Default is true.
     */
    matchCase:true,

    /**
     * APIProperty: lowerBoundary
     * {Number} or {String}
     * 两者比较的下边界。 当是字符串的时候，它可以是 "文本 ${属性名}"  形式
     *      的文本和属性名的一种结合。
     */
    lowerBoundary:null,

    /**
     * APIProperty: upperBoundary
     * {Number} or {String}
     * 两者比较的上边界。 当是字符串的时候，它可以是 "文本 ${属性名}" 形式
     *      的文本和属性名的一种结合。
     */
    upperBoundary:null,

    /**
     * Constructor: SuperMap.Filter.Comparison
     * 创建一个比较规则。
     *
     * Parameters:
     * options - {Object} 一个可选的对象，它的属性将应用于规则。
     *
     * Returns:
     * {<SuperMap.Filter.Comparison>}
     */
    initialize:function (options) {
        SuperMap.Filter.prototype.initialize.apply(this, [options]);
        // since matchCase on PropertyIsLike is not schema compliant, we only
        // want to use this if explicitly asked for
        if (this.type === SuperMap.Filter.Comparison.LIKE
            && options.matchCase === undefined) {
            this.matchCase = null;
        }
    },

    /**
     * APIMethod: evaluate
     * 根据给定环境确定过滤与否。
     *
     * Parameters:
     * context - {Object} 用于确定过滤与否的给定环境。  如果提供一个矢量要素
     *      feature，则 feature.attributes 将会被用做给定环境。
     *
     * Returns:
     * {Boolean} 返回是否过滤。true：不过滤，false：被过滤掉。
     */
    evaluate:function (context) {
        if (context instanceof SuperMap.Feature.Vector) {
            context = context.attributes;
        }
        var result = false;
        var got = context[this.property];
        var exp;
        switch (this.type) {
            case SuperMap.Filter.Comparison.EQUAL_TO:
                exp = this.value;
                if (!this.matchCase &&
                    typeof got === "string" && typeof exp === "string") {
                    result = (got.toUpperCase() === exp.toUpperCase());
                } else {
                    result = (got === exp);
                }
                break;
            case SuperMap.Filter.Comparison.NOT_EQUAL_TO:
                exp = this.value;
                if (!this.matchCase &&
                    typeof got === "string" && typeof exp === "string") {
                    result = (got.toUpperCase() !== exp.toUpperCase());
                } else {
                    result = (got !== exp);
                }
                break;
            case SuperMap.Filter.Comparison.LESS_THAN:
                result = got < this.value;
                break;
            case SuperMap.Filter.Comparison.GREATER_THAN:
                result = got > this.value;
                break;
            case SuperMap.Filter.Comparison.LESS_THAN_OR_EQUAL_TO:
                result = got <= this.value;
                break;
            case SuperMap.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO:
                result = got >= this.value;
                break;
            case SuperMap.Filter.Comparison.BETWEEN:
                result = (got >= this.lowerBoundary) &&
                    (got <= this.upperBoundary);
                break;
            case SuperMap.Filter.Comparison.LIKE:
                var regexp = new RegExp(this.value, "gi");
                result = regexp.test(got);
                break;
        }
        return result;
    },

    /**
     * APIMethod: value2regex
     * 根据指定的通配符，将规则的值转换成一个正则表达式字符串。如果该值已
     *      经不是一个正则表达式，那么这个方法必须在类实例化后被调用。
     *
     * Parameters:
     * wildCard   - {Char} 通配符，默认为 "*"
     * singleChar - {Char} 单个字符的通配符，默认为 "."
     * escapeChar - {Char} 转义符，默认为 "!"
     *
     * Returns:
     * {String} 正则表达式字符串
     */
    value2regex:function (wildCard, singleChar, escapeChar) {
        if (wildCard === ".") {
            throw new Error("'.' is an unsupported wildCard character for " +
                "SuperMap.Filter.Comparison");
        }


        // set UMN MapServer defaults for unspecified parameters
        wildCard = wildCard ? wildCard : "*";
        singleChar = singleChar ? singleChar : ".";
        escapeChar = escapeChar ? escapeChar : "!";

        this.value = this.value.replace(
            new RegExp("\\" + escapeChar + "(.|$)", "g"), "\\$1");
        this.value = this.value.replace(
            new RegExp("\\" + singleChar, "g"), ".");
        this.value = this.value.replace(
            new RegExp("\\" + wildCard, "g"), ".*");
        this.value = this.value.replace(
            new RegExp("\\\\.\\*", "g"), "\\" + wildCard);
        this.value = this.value.replace(
            new RegExp("\\\\\\.", "g"), "\\" + singleChar);

        return this.value;
    },

    /**
     * Method: regex2value
     * 将正则表达式字符串的值转换成一个ogc标准的字面量字符串。其中通配符
     *     使用 "*" ，单个字符通配符使用 "."，转义符使用 "!"。保留 <value> 属性。
     *
     * Returns:
     * {String} 一个字符串值。
     */
    regex2value:function () {

        var value = this.value;

        // replace ! with !!
        value = value.replace(/!/g, "!!");

        // replace \. with !. (watching out for \\.)
        value = value.replace(/(\\)?\\\./g, function ($0, $1) {
            return $1 ? $0 : "!.";
        });

        // replace \* with #* (watching out for \\*)
        value = value.replace(/(\\)?\\\*/g, function ($0, $1) {
            return $1 ? $0 : "!*";
        });

        // replace \\ with \
        value = value.replace(/\\\\/g, "\\");

        // convert .* to * (the sequence #.* is not allowed)
        value = value.replace(/\.\*/g, "*");

        return value;
    },

    /**
     * APIMethod: clone
     * 复制这个过滤器。
     *
     * Returns:
     * {<SuperMap.Filter.Comparison>} 指定过滤器的副本。
     */
    clone:function () {
        return SuperMap.Util.extend(new SuperMap.Filter.Comparison(), this);
    },

    CLASS_NAME:"SuperMap.Filter.Comparison"
});


SuperMap.Filter.Comparison.EQUAL_TO = "==";
SuperMap.Filter.Comparison.NOT_EQUAL_TO = "!=";
SuperMap.Filter.Comparison.LESS_THAN = "<";
SuperMap.Filter.Comparison.GREATER_THAN = ">";
SuperMap.Filter.Comparison.LESS_THAN_OR_EQUAL_TO = "<=";
SuperMap.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO = ">=";
SuperMap.Filter.Comparison.BETWEEN = "..";
SuperMap.Filter.Comparison.LIKE = "~";
