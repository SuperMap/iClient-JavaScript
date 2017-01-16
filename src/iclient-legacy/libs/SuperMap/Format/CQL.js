/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/WKT.js
 */

/**
 * Class: SuperMap.Format.CQL
 * 读取CQL字符串以获取 <SuperMap.Filter> 对象。  根据 <SuperMap.Filter> 对象
 *     以获取CQL字符串。 通过 <SuperMap.Format.CQL> 的构造函数创建一个新
 *     的解析器。
 *
 * Inherits from:
 *  - <SuperMap.Format>
 */
SuperMap.Format.CQL = (function() {
    
    var tokens = [
        "PROPERTY", "COMPARISON", "VALUE", "LOGICAL"
    ],

    patterns = {
        PROPERTY: /^[_a-zA-Z]\w*/,
        COMPARISON: /^(=|<>|<=|<|>=|>|LIKE)/i,
        COMMA: /^,/,
        LOGICAL: /^(AND|OR)/i,
        VALUE: /^('\w+'|\d+(\.\d*)?|\.\d+)/,
        LPAREN: /^\(/,
        RPAREN: /^\)/,
        SPATIAL: /^(BBOX|INTERSECTS|DWITHIN|WITHIN|CONTAINS)/i,
        NOT: /^NOT/i,
        BETWEEN: /^BETWEEN/i,
        GEOMETRY: function(text) {
            var type = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/.exec(text);
            if (type) {
                var len = text.length;
                var idx = text.indexOf("(", type[0].length);
                if (idx > -1) {
                    var depth = 1;
                    while (idx < len && depth > 0) {
                        idx++;
                        switch(text.charAt(idx)) {
                            case '(':
                                depth++;
                                break;
                            case ')':
                                depth--;
                                break;
                            default:
                                // 在默认情况下,什么也不做
                        }
                    }
                }
                return [text.substr(0, idx+1)];
            }
        },
        END: /^$/
    },

    follows = {
        LPAREN: ['GEOMETRY', 'SPATIAL', 'PROPERTY', 'VALUE', 'LPAREN'],
        RPAREN: ['NOT', 'LOGICAL', 'END', 'RPAREN'],
        PROPERTY: ['COMPARISON', 'BETWEEN', 'COMMA'],
        BETWEEN: ['VALUE'],
        COMPARISON: ['VALUE'],
        COMMA: ['GEOMETRY', 'VALUE', 'PROPERTY'],
        VALUE: ['LOGICAL', 'COMMA', 'RPAREN', 'END'],
        SPATIAL: ['LPAREN'],
        LOGICAL: ['NOT', 'VALUE', 'SPATIAL', 'PROPERTY', 'LPAREN'],
        NOT: ['PROPERTY', 'LPAREN'],
        GEOMETRY: ['COMMA', 'RPAREN']
    },

    operators = {
        '=': SuperMap.Filter.Comparison.EQUAL_TO,
        '<>': SuperMap.Filter.Comparison.NOT_EQUAL_TO,
        '<': SuperMap.Filter.Comparison.LESS_THAN,
        '<=': SuperMap.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
        '>': SuperMap.Filter.Comparison.GREATER_THAN,
        '>=': SuperMap.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        'LIKE': SuperMap.Filter.Comparison.LIKE,
        'BETWEEN': SuperMap.Filter.Comparison.BETWEEN
    },

    operatorReverse = {},

    logicals = {
        'AND': SuperMap.Filter.Logical.AND,
        'OR': SuperMap.Filter.Logical.OR
    },

    logicalReverse = {},

    precedence = {
        'RPAREN': 3,
        'LOGICAL': 2,
        'COMPARISON': 1
    };

    var i;
    for (i in operators) {
        if (operators.hasOwnProperty(i)) {
            operatorReverse[operators[i]] = i;
        }
    }

    for (i in logicals) {
        if (logicals.hasOwnProperty(i)) {
            logicalReverse[logicals[i]] = i;
        }
    }

    function tryToken(text, pattern) {
        if (pattern instanceof RegExp) {
            return pattern.exec(text);
        } else {
            return pattern(text);
        }
    }

    function nextToken(text, tokens) {
        var i, token, len = tokens.length;
        for (i=0; i<len; i++) {
            token = tokens[i];
            var pat = patterns[token];
            var matches = tryToken(text, pat);
            if (matches) {
                var match = matches[0];
                var remainder = text.substr(match.length).replace(/^\s*/, "");
                return {
                    type: token,
                    text: match,
                    remainder: remainder
                };
            }
        }

        var msg = "ERROR: In parsing: [" + text + "], expected one of: ";
        for (i=0; i<len; i++) {
            token = tokens[i];
            msg += "\n    " + token + ": " + patterns[token];
        }

        throw new Error(msg);
    }

    function tokenize(text) {
        var results = [];
        var token, expect = ["NOT", "GEOMETRY", "SPATIAL", "PROPERTY", "LPAREN"];

        do {
            token = nextToken(text, expect);
            text = token.remainder;
            expect = follows[token.type];
            if (token.type !== "END" && !expect) {
                throw new Error("No follows list for " + token.type);
            }
            results.push(token);
        } while (token.type !== "END");

        return results;
    }

    function buildAst(tokens) {
        var operatorStack = [],
            postfix = [];

        while (tokens.length) {
            var tok = tokens.shift();
            switch (tok.type) {
               case "PROPERTY":
               case "GEOMETRY":
                case "VALUE":
                    postfix.push(tok);
                    break;
                case "COMPARISON":
                case "BETWEEN":
                case "LOGICAL":
                    var p = precedence[tok.type];

                    while (operatorStack.length > 0 &&
                        (precedence[operatorStack[operatorStack.length - 1].type] <= p)
                    ) {
                        postfix.push(operatorStack.pop());
                    }

                    operatorStack.push(tok);
                    break;
                case "SPATIAL":
                case "NOT":
                case "LPAREN":
                    operatorStack.push(tok);
                    break;
                case "RPAREN":
                    while (operatorStack.length > 0 &&
                        (operatorStack[operatorStack.length - 1].type !== "LPAREN")
                    ) {
                        postfix.push(operatorStack.pop());
                    }
                    operatorStack.pop(); // toss out the LPAREN

                    if (operatorStack.length > 0 &&
                        operatorStack[operatorStack.length-1].type === "SPATIAL") {
                        postfix.push(operatorStack.pop());
                    }
                case "COMMA":
                case "END":
                    break;
                default:
                    throw new Error("Unknown token type " + tok.type);
            }
        }

        while (operatorStack.length > 0) {
            postfix.push(operatorStack.pop());
        }

        function buildTree() {
            var tok = postfix.pop();
            switch (tok.type) {
                case "LOGICAL":
                    var rhs = buildTree(),
                        lhs = buildTree();
                    return new SuperMap.Filter.Logical({
                        filters: [lhs, rhs],
                        type: logicals[tok.text.toUpperCase()]
                    });
                case "NOT":
                    var operand = buildTree();
                    return new SuperMap.Filter.Logical({
                        filters: [operand],
                        type: SuperMap.Filter.Logical.NOT
                    });
                case "BETWEEN":
                    var min, max, property;
                    postfix.pop(); // unneeded AND token here
                    max = buildTree();
                    min = buildTree();
                    property = buildTree();
                    return new SuperMap.Filter.Comparison({
                        property: property,
                        lowerBoundary: min,
                        upperBoundary: max,
                        type: SuperMap.Filter.Comparison.BETWEEN
                    });
                case "COMPARISON":
                    var value = buildTree(),
                        property = buildTree();
                    return new SuperMap.Filter.Comparison({
                        property: property,
                        value: value,
                        type: operators[tok.text.toUpperCase()]
                    });
                case "VALUE":
                    if ((/^'.*'$/).test(tok.text)) {
                        return tok.text.substr(1, tok.text.length - 2);
                    } else {
                        return Number(tok.text);
                    }
                case "SPATIAL":
                    switch(tok.text.toUpperCase()) {
                        case "BBOX":
                            var maxy = buildTree(),
                                maxx = buildTree(),
                                miny = buildTree(),
                                minx = buildTree(),
                                prop = buildTree();

                            return new SuperMap.Filter.Spatial({
                                type: SuperMap.Filter.Spatial.BBOX,
                                property: prop,
                                value: SuperMap.Bounds.fromArray(
                                    [minx, miny, maxx, maxy]
                                )
                            });
                        case "INTERSECTS":
                            var value = buildTree(),
                                property = buildTree();
                            return new SuperMap.Filter.Spatial({
                                type: SuperMap.Filter.Spatial.INTERSECTS,
                                property: property,
                                value: value
                            });
                        case "WITHIN":
                            var value = buildTree(),
                                property = buildTree();
                            return new SuperMap.Filter.Spatial({
                                type: SuperMap.Filter.Spatial.WITHIN,
                                property: property,
                                value: value
                            });
                        case "CONTAINS":
                            var value = buildTree(),
                                property = buildTree();
                            return new SuperMap.Filter.Spatial({
                                type: SuperMap.Filter.Spatial.CONTAINS,
                                property: property,
                                value: value
                            });
                        case "DWITHIN":
                            var distance = buildTree(),
                                value = buildTree(),
                                property = buildTree();
                            return new SuperMap.Filter.Spatial({
                                type: SuperMap.Filter.Spatial.DWITHIN,
                                value: value,
                                property: property,
                                distance: Number(distance)
                            });
                    }
                case "GEOMETRY":
                    return SuperMap.Geometry.fromWKT(tok.text);
                default:
                    return tok.text;
            }
        }

        var result = buildTree();
        if (postfix.length > 0) {
            var msg = "Remaining tokens after building AST: \n";
            for (var i = postfix.length - 1; i >= 0; i--) {
                msg += postfix[i].type + ": " + postfix[i].text + "\n";
            }
            throw new Error(msg);
        }

        return result;
    }

    return SuperMap.Class(SuperMap.Format, {
        /**
         * APIMethod: read
         * 通过CQL字符串生成一个过滤器。

         * Parameters:
         * text - {String} CQL文本。
         *
         * Returns:
         * {<SuperMap.Filter>} 根据CQL文本获取的过滤器。
         */
        read: function(text) { 
            var result = buildAst(tokenize(text));
            if (this.keepData) {
                this.data = result;
            }
            return result;
        },

        /**
         * APIMethod: write
         * 将一个过滤器转换成CQL字符串。

         * Parameters:
         * filter - {<SuperMap.Filter>} 被转换的过滤器。
         *
         * Returns:
         * {String} 根据过滤器转换而来的CQL字符串。
         */
        write: function(filter) {
            if (filter instanceof SuperMap.Geometry) {
                return filter.toString();
            }
            switch (filter.CLASS_NAME) {
                case "SuperMap.Filter.Spatial":
                    switch(filter.type) {
                        case SuperMap.Filter.Spatial.BBOX:
                            return "BBOX(" +
                                filter.property + "," +
                                filter.value.toBBOX() +
                                ")";
                        case SuperMap.Filter.Spatial.DWITHIN:
                            return "DWITHIN(" +
                                filter.property + ", " +
                                this.write(filter.value) + ", " +
                                filter.distance + ")";
                        case SuperMap.Filter.Spatial.WITHIN:
                            return "WITHIN(" +
                                filter.property + ", " +
                                this.write(filter.value) + ")";
                        case SuperMap.Filter.Spatial.INTERSECTS:
                            return "INTERSECTS(" +
                                filter.property + ", " +
                                this.write(filter.value) + ")";
                        case SuperMap.Filter.Spatial.CONTAINS:
                            return "CONTAINS(" +
                                filter.property + ", " +
                                this.write(filter.value) + ")";
                        default:
                            throw new Error("Unknown spatial filter type: " + filter.type);
                    }
                case "SuperMap.Filter.Logical":
                    if (filter.type === SuperMap.Filter.Logical.NOT) {
                        // TODO: deal with precedence of logical operators to 
                        // avoid extra parentheses (not urgent)
                        return "NOT (" + this.write(filter.filters[0]) + ")";
                    } else {
                        var res = "(";
                        var first = true;
                        for (var i = 0; i < filter.filters.length; i++) {
                            if (first) {
                                first = false;
                            } else {
                                res += ") " + logicalReverse[filter.type] + " (";
                            }
                            res += this.write(filter.filters[i]);
                        }
                        return res + ")";
                    }
                case "SuperMap.Filter.Comparison":
                    if (filter.type === SuperMap.Filter.Comparison.BETWEEN) {
                        return filter.property + " BETWEEN " + 
                            this.write(filter.lowerBoundary) + " AND " + 
                            this.write(filter.upperBoundary);
                    } else {
                        
                        return filter.property +
                            " " + operatorReverse[filter.type] + " " + 
                            this.write(filter.value);
                    }
                case undefined:
                    if (typeof filter === "string") {
                        return "'" + filter + "'";
                    } else if (typeof filter === "number") {
                        return String(filter);
                    }
                default:
                    throw new Error("Can't encode: " + filter.CLASS_NAME + " " + filter);
            }
        },

        CLASS_NAME: "SuperMap.Format.CQL"

    });
})();

