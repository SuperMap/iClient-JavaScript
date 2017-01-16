/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.CartoCSS
 * CartoCSS解析类，其主要功能为将CartoCSS字符串解析为CartoCSS的shader属性风格对象
 */
SuperMap.CartoCSS=SuperMap.Class({
    env:null,

    /**
     * APIProperty: parser
     * 解析器
     * */
    parser:null,

    /**
     * Property: ruleSet
     * CartoCSS规则对象
     * */
    ruleSet:null,

    /**
     * Property: cartoStr
     * CartoCSS样式表字符串
     * */
    cartoStr:"",

    /**
     * Property: shaders
     * Carto着色器集
     * */
    shaders:null,

    /**
     * Constructor: SuperMap.CartoCSS
     * 此类用于将CartoCSS样式表解析为Carto规则对象，然后可以将Carto规则集转化为Carto图层的渲染信息shader
     *
     * Parameters：
     * cartoStr - {String} CartoCSS样式表字符串
     *
     * Examples:
     * (code)
     * var cartocss=[
     * "@color:#111;",
     * "#China_Railway_L__China400::two{",
     * "line-color:@color;",
     * "line-width:2",
     * "}"
     * ].join("/n");
     * var carto=new SuperMap.CartoCSS(cartocss);
     * me.cartoShaders=carto.getShaders();
     * (end)
     *
     * */
    initialize:function(cartoStr){
       if(typeof cartoStr==="string"){
           this.cartoStr=cartoStr;
           this.env={
               frames: [],
               errors: [],
               error: function(obj) {
                   this.errors.push(obj);
               }
           };
           this.parser=this.getParser(this.env);
           this.parse(cartoStr);
           this.shaders=this.toShaders();
       }
    },

    /**
     * Method: getParser
     * 获取CartoCSS解析器
     * */
    getParser: function(env) {
        var input,       // LeSS input string
            i,           // current index in `input`
            j,           // current chunk
            temp,        // temporarily holds a chunk's state, for backtracking
            memo,        // temporarily holds `i`, when backtracking
            furthest,    // furthest index the parser has gone to
            chunks,      // chunkified input
            current,     // index of current chunk, in `input`
            parser;

        var that = this;

        // This function is called after all files
        // have been imported through `@import`.
        var finish = function() {};

        function save()    {
            temp = chunks[j];
            memo = i;
            current = i;
        }
        function restore() {
            chunks[j] = temp;
            i = memo;
            current = i;
        }

        function sync() {
            if (i > current) {
                chunks[j] = chunks[j].slice(i - current);
                current = i;
            }
        }
        //
        // Parse from a token, regexp or string, and move forward if match
        //
        function $(tok) {
            var match, args, length, c, index, endIndex, k;

            // Non-terminal
            if (tok instanceof Function) {
                return tok.call(parser.parsers);
                // Terminal
                // Either match a single character in the input,
                // or match a regexp in the current chunk (chunk[j]).
            } else if (typeof(tok) === 'string') {
                match = input.charAt(i) === tok ? tok : null;
                length = 1;
                sync();
            } else {
                sync();

                match = tok.exec(chunks[j]);
                if (match) {
                    length = match[0].length;
                } else {
                    return null;
                }
            }

            // The match is confirmed, add the match length to `i`,
            // and consume any extra white-space characters (' ' || '\n')
            // which come after that. The reason for this is that LeSS's
            // grammar is mostly white-space insensitive.
            if (match) {
                var mem = i += length;
                endIndex = i + chunks[j].length - length;

                while (i < endIndex) {
                    c = input.charCodeAt(i);
                    if (! (c === 32 || c === 10 || c === 9)) { break; }
                    i++;
                }
                chunks[j] = chunks[j].slice(length + (i - mem));
                current = i;

                if (chunks[j].length === 0 && j < chunks.length - 1) { j++; }

                if (typeof(match) === 'string') {
                    return match;
                } else {
                    return match.length === 1 ? match[0] : match;
                }
            }
        }

        // Same as $(), but don't change the state of the parser,
        // just return the match.
        function peek(tok) {
            if (typeof(tok) === 'string') {
                return input.charAt(i) === tok;
            } else {
                return !!tok.test(chunks[j]);
            }
        }

        // Make an error object from a passed set of properties.
        // Accepted properties:
        // - `message`: Text of the error message.
        // - `filename`: Filename where the error occurred.
        // - `index`: Char. index where the error occurred.
        function makeError(err) {
            var einput;

            var defautls={
                index: furthest,
                filename: env.filename,
                message: 'Parse error.',
                line: 0,
                column: -1
            };
            if (defautls) {
                for (var prop in defautls) {
                    if (err[prop] === void 0) err[prop] = defautls[prop];
                }
            }

            if (err.filename && that.env.inputs && that.env.inputs[err.filename]) {
                einput = that.env.inputs[err.filename];
            } else {
                einput = input;
            }

            err.line = (einput.slice(0, err.index).match(/\n/g) || '').length + 1;
            for (var n = err.index; n >= 0 && einput.charAt(n) !== '\n'; n--) {
                err.column++;
            }
            return new Error([err.filename,err.line,err.column,err.message].join(";"));
        }

        this.env = env = env || {};
        this.env.filename = this.env.filename || null;
        this.env.inputs = this.env.inputs || {};

        // The Parser
        parser = {

            // Parse an input string into an abstract syntax tree.
            // Throws an error on parse errors.
            parse: function(str) {
                var root, start, end, zone, line, lines, buff = [], c, error = null;

                i = j = current = furthest = 0;
                chunks = [];
                input = str.replace(/\r\n/g, '\n');
                if (env.filename) {
                    that.env.inputs[env.filename] = input;
                }

                var early_exit = false;

                // Split the input into chunks.
                chunks = (function (chunks) {
                    var j = 0,
                        skip = /(?:@\{[\w-]+\}|[^"'`\{\}\/\(\)\\])+/g,
                        comment = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,
                        string = /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`]|\\.)*)`/g,
                        level = 0,
                        match,
                        chunk = chunks[0],
                        inParam;

                    for (var i = 0, c, cc; i < input.length;) {
                        skip.lastIndex = i;
                        if (match = skip.exec(input)) {
                            if (match.index === i) {
                                i += match[0].length;
                                chunk.push(match[0]);
                            }
                        }
                        c = input.charAt(i);
                        comment.lastIndex = string.lastIndex = i;

                        if (match = string.exec(input)) {
                            if (match.index === i) {
                                i += match[0].length;
                                chunk.push(match[0]);
                                continue;
                            }
                        }

                        if (!inParam && c === '/') {
                            cc = input.charAt(i + 1);
                            if (cc === '/' || cc === '*') {
                                if (match = comment.exec(input)) {
                                    if (match.index === i) {
                                        i += match[0].length;
                                        chunk.push(match[0]);
                                        continue;
                                    }
                                }
                            }
                        }

                        switch (c) {
                            case '{': if (! inParam) { level ++;        chunk.push(c);                           break; }
                            case '}': if (! inParam) { level --;        chunk.push(c); chunks[++j] = chunk = []; break; }
                            case '(': if (! inParam) { inParam = true;  chunk.push(c);                           break; }
                            case ')': if (  inParam) { inParam = false; chunk.push(c);                           break; }
                            default:                                    chunk.push(c);                           break;
                        }

                        i++;
                    }
                    if (level !== 0) {
                        error = {
                            index: i - 1,
                            type: 'Parse',
                            message: (level > 0) ? "missing closing `}`" : "missing opening `{`"
                        };
                    }

                    return chunks.map(function (c) { return c.join(''); });
                })([[]]);

                if (error) {
                    throw makeError(error);
                }

                // Sort rules by specificity: this function expects selectors to be
                // split already.
                //
                // Written to be used as a .sort(Function);
                // argument.
                //
                // [1, 0, 0, 467] > [0, 0, 1, 520]
                var specificitySort = function(a, b) {
                    var as = a.specificity;
                    var bs = b.specificity;

                    if (as[0] != bs[0]) return bs[0] - as[0];
                    if (as[1] != bs[1]) return bs[1] - as[1];
                    if (as[2] != bs[2]) return bs[2] - as[2];
                    return bs[3] - as[3];
                };

                // Start with the primary rule.
                // The whole syntax tree is held under a Ruleset node,
                // with the `root` property set to true, so no `{}` are
                // output.
                root = new SuperMap.CartoCSS.Tree.Ruleset([], $(this.parsers.primary));
                root.root = true;

                // Get an array of Ruleset objects, flattened
                // and sorted according to specificitySort
                root.toList = (function() {
                    return function(env) {
                        env.error = function(e) {
                            if (!env.errors) env.errors = new Error('');
                            if (env.errors.message) {
                                env.errors.message += '\n' + makeError(e).message;
                            } else {
                                env.errors.message = makeError(e).message;
                            }
                        };
                        env.frames = env.frames || [];


                        // call populates Invalid-caused errors
                        var definitions = this.flatten([], [], env);
                        definitions.sort(specificitySort);
                        return definitions;
                    };
                })();

                return root;
            },

            // Here in, the parsing rules/functions
            //
            // The basic structure of the syntax tree generated is as follows:
            //
            //   Ruleset ->  Rule -> Value -> Expression -> Entity
            //
            //  In general, most rules will try to parse a token with the `$()` function, and if the return
            //  value is truly, will return a new node, of the relevant type. Sometimes, we need to check
            //  first, before parsing, that's when we use `peek()`.
            parsers: {
                // The `primary` rule is the *entry* and *exit* point of the parser.
                // The rules here can appear at any level of the parse tree.
                //
                // The recursive nature of the grammar is an interplay between the `block`
                // rule, which represents `{ ... }`, the `ruleset` rule, and this `primary` rule,
                // as represented by this simplified grammar:
                //
                //     primary  →  (ruleset | rule)+
                //     ruleset  →  selector+ block
                //     block    →  '{' primary '}'
                //
                // Only at one point is the primary rule not called from the
                // block rule: at the root level.
                primary: function() {
                    var node, root = [];

                    while ((node = $(this.rule) || $(this.ruleset) ||
                        $(this.comment)) ||
                        $(/^[\s\n]+/) || (node = $(this.invalid))) {
                        if (node) root.push(node);
                    }
                    return root;
                },

                invalid: function () {
                    var chunk = $(/^[^;\n]*[;\n]/);

                    // To fail gracefully, match everything until a semicolon or linebreak.
                    if (chunk) {
                        return new SuperMap.CartoCSS.Tree.Invalid(chunk, memo);
                    }
                },

                // We create a Comment node for CSS comments `/* */`,
                // but keep the LeSS comments `//` silent, by just skipping
                // over them.
                comment: function() {
                    var comment;

                    if (input.charAt(i) !== '/') return;

                    if (input.charAt(i + 1) === '/') {
                        return new SuperMap.CartoCSS.Tree.Comment($(/^\/\/.*/), true);
                    } else if (comment = $(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/)) {
                        return new SuperMap.CartoCSS.Tree.Comment(comment);
                    }
                },

                // Entities are tokens which can be found inside an Expression
                entities: {

                    // A string, which supports escaping " and ' "milky way" 'he\'s the one!'
                    quoted: function() {
                        if (input.charAt(i) !== '"' && input.charAt(i) !== "'") return;
                        var str = $(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/);
                        if (str) {
                            return new SuperMap.CartoCSS.Tree.Quoted(str[1] || str[2]);
                        }
                    },

                    // A reference to a Mapnik field, like [NAME]
                    // Behind the scenes, this has the same representation, but Carto
                    // needs to be careful to warn when unsupported operations are used.
                    field: function() {
                        var l='[',r=']';
                        if (! $(l)) return;
                        var field_name = $(/(^[^\]]+)/);
                        if (! $(r)) return;
                        if (field_name) return new SuperMap.CartoCSS.Tree.Field(field_name[1]);
                    },

                    // This is a comparison operator
                    comparison: function() {
                        var str = $(/^=~|=|!=|<=|>=|<|>/);
                        if (str) {
                            return str;
                        }
                    },

                    // A catch-all word, such as: hard-light
                    // These can start with either a letter or a dash (-),
                    // and then contain numbers, underscores, and letters.
                    keyword: function() {
                        var k = $(/^[A-Za-z\u4e00-\u9fa5-]+[A-Za-z-0-9\u4e00-\u9fa5_]*/);
                        if (k) { return new SuperMap.CartoCSS.Tree.Keyword(k); }
                    },

                    // A function call like rgb(255, 0, 255)
                    // The arguments are parsed with the `entities.arguments` parser.
                    call: function() {
                        var name, args;

                        if (!(name = /^([\w\-]+|%)\(/.exec(chunks[j]))) return;

                        name = name[1];

                        if (name === 'url') {
                            // url() is handled by the url parser instead
                            return null;
                        } else {
                            i += name.length;
                        }

                        var l='(',r=')';
                        $(l); // Parse the '(' and consume whitespace.

                        args = $(this.entities['arguments']);

                        if (!$(r)) return;

                        if (name) {
                            return new SuperMap.CartoCSS.Tree.Call(name, args, i);
                        }
                    },
                    // Arguments are comma-separated expressions
                    'arguments': function() {
                        var args = [], arg;

                        while (arg = $(this.expression)) {
                            args.push(arg);
                            var q=',';
                            if (! $(q)) { break; }
                        }

                        return args;
                    },
                    literal: function() {
                        return $(this.entities.dimension) ||
                            $(this.entities.keywordcolor) ||
                            $(this.entities.hexcolor) ||
                            $(this.entities.quoted);
                    },

                    // Parse url() tokens
                    //
                    // We use a specific rule for urls, because they don't really behave like
                    // standard function calls. The difference is that the argument doesn't have
                    // to be enclosed within a string, so it can't be parsed as an Expression.
                    url: function() {
                        var value;

                        if (input.charAt(i) !== 'u' || !$(/^url\(/)) return;
                        value = $(this.entities.quoted) || $(this.entities.variable) ||
                            $(/^[\-\w%@$\/.&=:;#+?~]+/) || '';
                        var r=')';
                        if (! $(r)) {
                            return new SuperMap.CartoCSS.Tree.Invalid(value, memo, 'Missing closing ) in URL.');
                        } else {
                            return new SuperMap.CartoCSS.Tree.URL((typeof value.value !== 'undefined' ||
                                value instanceof SuperMap.CartoCSS.Tree.Variable) ?
                                value : new SuperMap.CartoCSS.Tree.Quoted(value));
                        }
                    },

                    // A Variable entity, such as `@fink`, in
                    //
                    //     width: @fink + 2px
                    //
                    // We use a different parser for variable definitions,
                    // see `parsers.variable`.
                    variable: function() {
                        var name, index = i;

                        if (input.charAt(i) === '@' && (name = $(/^@[\w-]+/))) {
                            return new SuperMap.CartoCSS.Tree.Variable(name, index, env.filename);
                        }
                    },

                    hexcolor: function() {
                        var rgb;
                        if (input.charAt(i) === '#' && (rgb = $(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/))) {
                            return new SuperMap.CartoCSS.Tree.Color(rgb[1]);
                        }
                    },

                    keywordcolor: function() {
                        var rgb = chunks[j].match(/^[a-z]+/);
                        if (rgb && rgb[0] in SuperMap.CartoCSS.Tree.Reference.data.colors) {
                            return new SuperMap.CartoCSS.Tree.Color(SuperMap.CartoCSS.Tree.Reference.data.colors[$(/^[a-z]+/)]);
                        }
                    },

                    // A Dimension, that is, a number and a unit. The only
                    // unit that has an effect is %
                    dimension: function() {
                        var c = input.charCodeAt(i);
                        if ((c > 57 || c < 45) || c === 47) return;
                        var value = $(/^(-?\d*\.?\d+(?:[eE][-+]?\d+)?)(\%|\w+)?/);
                        if (value) {
                            return new SuperMap.CartoCSS.Tree.Dimension(value[1], value[2], memo);
                        }
                    }
                },

                // The variable part of a variable definition.
                // Used in the `rule` parser. Like @fink:
                variable: function() {
                    var name;

                    if (input.charAt(i) === '@' && (name = $(/^(@[\w-]+)\s*:/))) {
                        return name[1];
                    }
                },

                // Entities are the smallest recognized token,
                // and can be found inside a rule's value.
                entity: function() {
                    return $(this.entities.call) ||
                        $(this.entities.literal) ||
                        $(this.entities.field) ||
                        $(this.entities.variable) ||
                        $(this.entities.url) ||
                        $(this.entities.keyword);
                },

                // A Rule terminator. Note that we use `peek()` to check for '}',
                // because the `block` rule will be expecting it, but we still need to make sure
                // it's there, if ';' was ommitted.
                end: function() {
                    var q=';';
                    return $(q) || peek('}');
                },

                // Elements are the building blocks for Selectors. They consist of
                // an element name, such as a tag a class, or `*`.
                //增加对中文的支持，[\u4e00-\u9fa5]
                element: function() {
                    var e = $(/^(?:[.#][\w\u4e00-\u9fa5\-]+|\*|Map)/);
                    if (e) return new SuperMap.CartoCSS.Tree.Element(e);
                },

                // Attachments allow adding multiple lines, polygons etc. to an
                // object. There can only be one attachment per selector.
                attachment: function() {
                    var s = $(/^::([\w\-]+(?:\/[\w\-]+)*)/);
                    if (s) return s[1];
                },

                // Selectors are made out of one or more Elements, see above.
                selector: function() {
                    var a, attachment,
                        e, elements = [],
                        f, filters = new SuperMap.CartoCSS.Tree.Filterset(),
                        z, zooms = [],
                        segments = 0, conditions = 0;

                    while (
                        (e = $(this.element)) ||
                            (z = $(this.zoom)) ||
                            (f = $(this.filter)) ||
                            (a = $(this.attachment))
                        ) {
                        segments++;
                        if (e) {
                            elements.push(e);
                        } else if (z) {
                            zooms.push(z);
                            conditions++;
                        } else if (f) {
                            var err = filters.add(f);
                            if (err) {
                                throw makeError({
                                    message: err,
                                    index: i - 1
                                });
                            }
                            conditions++;
                        } else if (attachment) {
                            throw makeError({
                                message: 'Encountered second attachment name.',
                                index: i - 1
                            });
                        } else {
                            attachment = a;
                        }

                        var c = input.charAt(i);
                        if (c === '{' || c === '}' || c === ';' || c === ',') { break; }
                    }

                    if (segments) {
                        return new SuperMap.CartoCSS.Tree.Selector(filters, zooms, elements, attachment, conditions, memo);
                    }
                },

                filter: function() {
                    save();
                    var key, op, val,l='[',r=']';
                    if (! $(l)) return;
                    if (key = $(/^[a-zA-Z0-9\-_]+/) ||
                        $(this.entities.quoted) ||
                        $(this.entities.variable) ||
                        $(this.entities.keyword) ||
                        $(this.entities.field)) {
                        if (key instanceof SuperMap.CartoCSS.Tree.Quoted) {
                            key = new SuperMap.CartoCSS.Tree.Field(key.toString());
                        }
                        if ((op = $(this.entities.comparison)) &&
                            (val = $(this.entities.quoted) ||
                                $(this.entities.variable) ||
                                $(this.entities.dimension) ||
                                $(this.entities.keyword) ||
                                $(this.entities.field))) {
                            if (! $(r)) {
                                throw makeError({
                                    message: 'Missing closing ] of filter.',
                                    index: memo - 1
                                });
                            }
                            if (!key.is) key = new SuperMap.CartoCSS.Tree.Field(key);
                            return new SuperMap.CartoCSS.Tree.Filter(key, op, val, memo, env.filename);
                        }
                    }
                },

                zoom: function() {
                    save();
                    var op, val,r=']';
                    if ($(/^\[\s*zoom/g) &&
                        (op = $(this.entities.comparison)) &&
                        (val = $(this.entities.variable) || $(this.entities.dimension)) && $(r)) {
                        return new SuperMap.CartoCSS.Tree.Zoom(op, val, memo);
                    } else {
                        // backtrack
                        restore();
                    }
                },

                // The `block` rule is used by `ruleset`
                // It's a wrapper around the `primary` rule, with added `{}`.
                block: function() {
                    var content,l='{',r='}';

                    if ($(l) && (content = $(this.primary)) && $(r)) {
                        return content;
                    }
                },

                // div, .class, body > p {...}
                ruleset: function() {
                    var selectors = [], s, f, l, rules, filters = [],q=',';
                    save();

                    while (s = $(this.selector)) {
                        selectors.push(s);
                        while ($(this.comment)) {}
                        if (! $(q)) { break; }
                        while ($(this.comment)) {}
                    }
                    if (s) {
                        while ($(this.comment)) {}
                    }

                    if (selectors.length > 0 && (rules = $(this.block))) {
                        if (selectors.length === 1 &&
                            selectors[0].elements.length &&
                            selectors[0].elements[0].value === 'Map') {
                            var rs = new SuperMap.CartoCSS.Tree.Ruleset(selectors, rules);
                            rs.isMap = true;
                            return rs;
                        }
                        return new SuperMap.CartoCSS.Tree.Ruleset(selectors, rules);
                    } else {
                        // Backtrack
                        restore();
                    }
                },

                rule: function() {
                    var name, value, c = input.charAt(i);
                    save();

                    if (c === '.' || c === '#') { return; }

                    if (name = $(this.variable) || $(this.property)) {
                        value = $(this.value);

                        if (value && $(this.end)) {
                            return new SuperMap.CartoCSS.Tree.Rule(name, value, memo, env.filename);
                        } else {
                            furthest = i;
                            restore();
                        }
                    }
                },

                font: function() {
                    var value = [], expression = [], weight, font, e,q=',';

                    while (e = $(this.entity)) {
                        expression.push(e);
                    }

                    value.push(new SuperMap.CartoCSS.Tree.Expression(expression));

                    if ($(q)) {
                        while (e = $(this.expression)) {
                            value.push(e);
                            if (! $(q)) { break; }
                        }
                    }
                    return new SuperMap.CartoCSS.Tree.Value(value);
                },

                // A Value is a comma-delimited list of Expressions
                // In a Rule, a Value represents everything after the `:`,
                // and before the `;`.
                value: function() {
                    var e, expressions = [],q=',';

                    while (e = $(this.expression)) {
                        expressions.push(e);
                        if (! $(q)) { break; }
                    }

                    if (expressions.length > 1) {
                        return new SuperMap.CartoCSS.Tree.Value(expressions.map(function(e) {
                            return e.value[0];
                        }));
                    } else if (expressions.length === 1) {
                        return new SuperMap.CartoCSS.Tree.Value(expressions);
                    }
                },
                // A sub-expression, contained by parenthensis
                sub: function() {
                    var e,l='(',r=")";
                    if ($(l) && (e = $(this.expression)) && $(r)) {
                        return e;
                    }
                },
                // This is a misnomer because it actually handles multiplication
                // and division.
                multiplication: function() {
                    var m, a, op, operation,q='/';
                    if (m = $(this.operand)) {
                        while ((op = ($(q) || $('*') || $('%'))) && (a = $(this.operand))) {
                            operation = new SuperMap.CartoCSS.Tree.Operation(op, [operation || m, a], memo);
                        }
                        return operation || m;
                    }
                },
                addition: function() {
                    var m, a, op, operation,plus='+';
                    if (m = $(this.multiplication)) {
                        while ((op = $(/^[-+]\s+/) || (input.charAt(i - 1) != ' ' && ($(plus) || $('-')))) &&
                            (a = $(this.multiplication))) {
                            operation = new SuperMap.CartoCSS.Tree.Operation(op, [operation || m, a], memo);
                        }
                        return operation || m;
                    }
                },

                // An operand is anything that can be part of an operation,
                // such as a Color, or a Variable
                operand: function() {
                    return $(this.sub) || $(this.entity);
                },

                // Expressions either represent mathematical operations,
                // or white-space delimited Entities.  @var * 2
                expression: function() {
                    var e, delim, entities = [], d;

                    while (e = $(this.addition) || $(this.entity)) {
                        entities.push(e);
                    }

                    if (entities.length > 0) {
                        return new SuperMap.CartoCSS.Tree.Expression(entities);
                    }
                },
                property: function() {
                    var name = $(/^(([a-z][-a-z_0-9]*\/)?\*?-?[-a-z_0-9]+)\s*:/);
                    if (name) return name[1];
                }
            }
        };
        return parser;
    },

    /**
     * Method: parse
     * 利用CartoCSS解析器里面的parse方法，将CartoCSS样式表字符串转化为CartoCSS规则集
     *
     * Returns:
     * {Object} CartoCSS规则集
     * */
    parse:function(str){
        var parser=this.parser;
        var ruleSet=this.ruleSet=parser.parse(str);
        return ruleSet;
    },

    /**
     * Method: toShaders
     * 将CartoCSS规则集转化为着色器
     *
     * Returns:
     * {Array} CartoCSS着色器集
     * */
    toShaders:function(){
        if(this.ruleSet){
            var ruleset=this.ruleSet;
            if(ruleset) {
                var defs = ruleset.toList(this.env);
                defs.reverse();

                var shaders = {};
                var keys=[];
                for(var i = 0,len0=defs.length; i < len0; ++i) {
                    var def = defs[i];
                    var element_str=[];
                    for(var j= 0,len1=def.elements.length;j<len1;j++){
                        element_str.push(def.elements[j]);
                    }
                    var filters=def.filters.filters;
                    var filterStr=[];
                    for(var attr in filters){
                        filterStr.push(filters[attr].id);
                    }
                    var key=element_str.join("/")+ "::" + def.attachment+"_"+filterStr.join("_");
                    keys.push(key);
                    var shader = shaders[key] = (shaders[key] || {});
                    //shader.frames = [];
                    shader.zoom = SuperMap.CartoCSS.Tree.Zoom.all;
                    var props = def.toJS(this.env);
                    for(var v in props) {
                        (shader[v] = (shader[v] || [])).push(props[v].join('\n'))
                    }
                }

                var ordered_shaders = [];

                var done = {};
                for(var i = 0,len0=defs.length; i < len0; ++i) {
                    var def = defs[i];
                    var k = def.attachment;
                    var shader = shaders[keys[i]];
                    var shaderArray=[];
                    if(!done[k]) {
                        var j= 0;
                        for(var prop in shader) {
                            if (prop !== 'zoom' && prop !== 'frames'&&prop!=="attachment"&&prop!="elements") {
                                //对layer-index作特殊处理以实现图层的控制
                                if(prop==="layer-index"){
                                    var getLayerIndex=Function("attributes","zoom", "var _value = null;" +  shader[prop].join('\n') + "; return _value; ");
                                    var layerIndex = getLayerIndex();
                                    Object.defineProperty(shaderArray,"layerIndex",{configurable:true,enumerable:false,value:layerIndex});
                                }else{
                                    shaderArray[j++] = function(ops,shaderArray) {
                                        if(!Array.isArray(ops)){
                                            return ops;
                                        }
                                        var body = ops.join('\n');
                                        var myKeyword='attributes["FEATUREID"]&&attributes["FEATUREID"]';
                                        var index=body.indexOf(myKeyword);
                                        if(index>=0){
                                            //对featureID作一些特殊处理，以将featureID提取出来
                                            if(!shaderArray.featureFilter){
                                                var featureFilterStart=index+myKeyword.length;
                                                var featureFilterEnd=body.indexOf(")",featureFilterStart+1);
                                                var featureFilterStr="featureId&&(featureId"+body.substring(featureFilterStart,featureFilterEnd)+")";
                                                var featureFilter=Function("featureId","if("+featureFilterStr+"){return true;}return false;");
                                                Object.defineProperty(shaderArray,"featureFilter",{configurable:true,enumerable:false,value:featureFilter});
                                            }
                                            return {"property":prop,
                                                "getValue":Function("attributes","zoom","seftFilter", "var _value = null; var isExcute=typeof seftFilter=='function'?sefgFilter():seftFilter;if(isExcute){" +  body + ";} return _value; ")};
                                        }else{
                                            return {"property":prop,"getValue":Function("attributes","zoom", "var _value = null;" +  body + "; return _value; ")};
                                        }
                                    }(shader[prop],shaderArray);
                                }
                            }
                        }
                        Object.defineProperty(shaderArray,"attachment",{configurable:true,enumerable:false,value:k});
                        Object.defineProperty(shaderArray,"elements",{configurable:true,enumerable:false,value:def.elements});
                        ordered_shaders.push(shaderArray);
                        done[keys[i]] = true;
                    }
                    Object.defineProperty(shaderArray,"zoom",{configurable:true,enumerable:false,value:def.zoom});
                    //shader.frames.push(def.frame_offset);
                }
                return ordered_shaders;
            }
        }
        return null;
    },

    /**
     * APIMethod: getShaders
     * 获取CartoCSS着色器
     *
     * Returns:
     * {Array} 着色器集
     *
     * Examples:
     * (code)
     *   //shaders的结构大概如下：
     *   var shaders=[
     *   {
     *       attachment:"one",
     *       elements:[],
     *       zoom:23,
     *       length:2,
     *       0:{property:"line-color",value:function(attribute,zoom){var _value=null;if(zoom){_value="#123456"}return _vlaue;}},
     *       1:{preoperty:"line-width",value:function(attribute,zoom){var _value=null;if(zoom){_value=3}return _vlaue;}}
     *   },
     *   {
     *       attachment:"two",
     *       elements:[],
     *       zoom:23,
     *       length:2,
     *       0:{property:"polygon-color",value:function(attribute,zoom){var _value=null;if(zoom){_value="#123456"}return _vlaue;}},
     *       1:{property:"line-width",value:function(attribute,zoom){var _value=null;if(zoom){_value=3}return _vlaue;}}
     *   }
     *   ];
     * (end)
     * */
    getShaders:function(){
        return this.shaders;
    },

    /**
     * APIMethod: destroy
     * CartoCSS解析对象的析构函数，用于销毁CartoCSS解析对象
     * */
    destroy:function(){
        this.cartoStr=null;
        this.env=null;
        this.ruleSet=null;
        this.parser=null;
        this.shaders=null;
    },

    CLASS_NAME:"SuperMap.CartoCSS"
});

SuperMap._mapnik_reference_latest = {
    "version": "2.1.1",
    "style": {
        "filter-mode": {
            "type": [
                "all",
                "first"
            ],
            "doc": "Control the processing behavior of Rule filters within a Style. If 'all' is used then all Rules are processed sequentially independent of whether any previous filters matched. If 'first' is used then it means processing ends after the first match (a positive filter evaluation) and no further Rules in the Style are processed ('first' is usually the default for CSS implementations on top of Mapnik to simplify translation from CSS to Mapnik XML)",
            "default-value": "all",
            "default-meaning": "All Rules in a Style are processed whether they have filters or not and whether or not the filter conditions evaluate to true."
        },
        "image-filters": {
            "css": "image-filters",
            "default-value": "none",
            "default-meaning": "no filters",
            "type": "functions",
            "functions": [
                ["agg-stack-blur", 2],
                ["emboss", 0],
                ["blur", 0],
                ["gray", 0],
                ["sobel", 0],
                ["edge-detect", 0],
                ["x-gradient", 0],
                ["y-gradient", 0],
                ["invert", 0],
                ["sharpen", 0]
            ],
            "doc": "A list of image filters."
        },
        "comp-op": {
            "css": "comp-op",
            "default-value": "src-over",
            "default-meaning": "add the current layer on top of other layers",
            "doc": "Composite operation. This defines how this layer should behave relative to layers atop or below it.",
            "type": ["clear",
                "src",
                "dst",
                "src-over",
                "dst-over",
                "src-in",
                "dst-in",
                "src-out",
                "dst-out",
                "src-atop",
                "dst-atop",
                "xor",
                "plus",
                "minus",
                "multiply",
                "screen",
                "overlay",
                "darken",
                "lighten",
                "color-dodge",
                "color-burn",
                "hard-light",
                "soft-light",
                "difference",
                "exclusion",
                "contrast",
                "invert",
                "invert-rgb",
                "grain-merge",
                "grain-extract",
                "hue",
                "saturation",
                "color",
                "value"
            ]
        },
        "opacity": {
            "css": "opacity",
            "type": "float",
            "doc": "An alpha value for the style (which means an alpha applied to all features in separate buffer and then composited back to main buffer)",
            "default-value": 1,
            "default-meaning": "no separate buffer will be used and no alpha will be applied to the style after rendering"
        }
    },
    "layer" : {
        "name": {
            "default-value": "",
            "type":"string",
            "required" : true,
            "default-meaning": "No layer name has been provided",
            "doc": "The name of a layer. Can be anything you wish and is not strictly validated, but ideally unique  in the map"
        },
        "srs": {
            "default-value": "",
            "type":"string",
            "default-meaning": "No srs value is provided and the value will be inherited from the Map's srs",
            "doc": "The spatial reference system definition for the layer, aka the projection. Can either be a proj4 literal string like '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs' or, if the proper proj4 epsg/nad/etc identifier files are installed, a string that uses an id like: '+init=epsg:4326'"
        },
        "status": {
            "default-value": true,
            "type":"boolean",
            "default-meaning": "This layer will be marked as active and available for processing",
            "doc": "A property that can be set to false to disable this layer from being processed"
        },
        "minzoom": {
            "default-value": "0",
            "type":"float",
            "default-meaning": "The layer will be visible at the minimum possible scale",
            "doc": "The minimum scale denominator that this layer will be visible at. A layer's visibility is determined by whether its status is true and if the Map scale >= minzoom - 1e-6 and scale < maxzoom + 1e-6"
        },
        "maxzoom": {
            "default-value": "1.79769e+308",
            "type":"float",
            "default-meaning": "The layer will be visible at the maximum possible scale",
            "doc": "The maximum scale denominator that this layer will be visible at. The default is the numeric limit of the C++ double type, which may vary slightly by system, but is likely a massive number like 1.79769e+308 and ensures that this layer will always be visible unless the value is reduced. A layer's visibility is determined by whether its status is true and if the Map scale >= minzoom - 1e-6 and scale < maxzoom + 1e-6"
        },
        "queryable": {
            "default-value": false,
            "type":"boolean",
            "default-meaning": "The layer will not be available for the direct querying of data values",
            "doc": "This property was added for GetFeatureInfo/WMS compatibility and is rarely used. It is off by default meaning that in a WMS context the layer will not be able to be queried unless the property is explicitly set to true"
        },
        "clear-label-cache": {
            "default-value": false,
            "type":"boolean",
            "default-meaning": "The renderer's collision detector cache (used for avoiding duplicate labels and overlapping markers) will not be cleared immediately before processing this layer",
            "doc": "This property, by default off, can be enabled to allow a user to clear the collision detector cache before a given layer is processed. This may be desirable to ensure that a given layers data shows up on the map even if it normally would not because of collisions with previously rendered labels or markers"
        },
        "group-by": {
            "default-value": "",
            "type":"string",
            "default-meaning": "No special layer grouping will be used during rendering",
            "doc": "https://github.com/mapnik/mapnik/wiki/Grouped-rendering"
        },
        "buffer-size": {
            "default-value": "0",
            "type":"float",
            "default-meaning": "No buffer will be used",
            "doc": "Extra tolerance around the Layer extent (in pixels) used to when querying and (potentially) clipping the layer data during rendering"
        },
        "maximum-extent": {
            "default-value": "none",
            "type":"bbox",
            "default-meaning": "No clipping extent will be used",
            "doc": "An extent to be used to limit the bounds used to query this specific layer data during rendering. Should be minx, miny, maxx, maxy in the coordinates of the Layer."
        }
    },
    "symbolizers" : {
        "*": {
            "image-filters": {
                "css": "image-filters",
                "default-value": "none",
                "default-meaning": "no filters",
                "type": "functions",
                "functions": [
                    ["agg-stack-blur", 2],
                    ["emboss", 0],
                    ["blur", 0],
                    ["gray", 0],
                    ["sobel", 0],
                    ["edge-detect", 0],
                    ["x-gradient", 0],
                    ["y-gradient", 0],
                    ["invert", 0],
                    ["sharpen", 0]
                ],
                "doc": "A list of image filters."
            },
            "comp-op": {
                "css": "comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current layer on top of other layers",
                "doc": "Composite operation. This defines how this layer should behave relative to layers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            },
            "opacity": {
                "css": "opacity",
                "type": "float",
                "doc": "An alpha value for the style (which means an alpha applied to all features in separate buffer and then composited back to main buffer)",
                "default-value": 1,
                "default-meaning": "no separate buffer will be used and no alpha will be applied to the style after rendering"
            }
        },
        "map": {
            "background-color": {
                "css": "background-color",
                "default-value": "none",
                "default-meaning": "transparent",
                "type": "color",
                "doc": "Map Background color"
            },
            "background-image": {
                "css": "background-image",
                "type": "uri",
                "default-value": "",
                "default-meaning": "transparent",
                "doc": "An image that is repeated below all features on a map as a background.",
                "description": "Map Background image"
            },
            "srs": {
                "css": "srs",
                "type": "string",
                "default-value": "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
                "default-meaning": "The proj4 literal of EPSG:4326 is assumed to be the Map's spatial reference and all data from layers within this map will be plotted using this coordinate system. If any layers do not declare an srs value then they will be assumed to be in the same srs as the Map and not transformations will be needed to plot them in the Map's coordinate space",
                "doc": "Map spatial reference (proj4 string)"
            },
            "buffer-size": {
                "css": "buffer-size",
                "default-value": "0",
                "type":"float",
                "default-meaning": "No buffer will be used",
                "doc": "Extra tolerance around the map (in pixels) used to ensure labels crossing tile boundaries are equally rendered in each tile (e.g. cut in each tile). Not intended to be used in combination with \"avoid-edges\"."
            },
            "maximum-extent": {
                "css": "",
                "default-value": "none",
                "type":"bbox",
                "default-meaning": "No clipping extent will be used",
                "doc": "An extent to be used to limit the bounds used to query all layers during rendering. Should be minx, miny, maxx, maxy in the coordinates of the Map."
            },
            "base": {
                "css": "base",
                "default-value": "",
                "default-meaning": "This base path defaults to an empty string meaning that any relative paths to files referenced in styles or layers will be interpreted relative to the application process.",
                "type": "string",
                "doc": "Any relative paths used to reference files will be understood as relative to this directory path if the map is loaded from an in memory object rather than from the filesystem. If the map is loaded from the filesystem and this option is not provided it will be set to the directory of the stylesheet."
            },
            "paths-from-xml": {
                "css": "",
                "default-value": true,
                "default-meaning": "Paths read from XML will be interpreted from the location of the XML",
                "type": "boolean",
                "doc": "value to control whether paths in the XML will be interpreted from the location of the XML or from the working directory of the program that calls load_map()"
            },
            "minimum-version": {
                "css": "",
                "default-value": "none",
                "default-meaning": "Mapnik version will not be detected and no error will be thrown about compatibility",
                "type": "string",
                "doc": "The minumum Mapnik version (e.g. 0.7.2) needed to use certain functionality in the stylesheet"
            },
            "font-directory": {
                "css": "font-directory",
                "type": "uri",
                "default-value": "none",
                "default-meaning": "No map-specific fonts will be registered",
                "doc": "Path to a directory which holds fonts which should be registered when the Map is loaded (in addition to any fonts that may be automatically registered)."
            }
        },
        "polygon": {
            "fill": {
                "css": "polygon-fill",
                "type": "color",
                "default-value": "rgba(128,128,128,1)",
                "default-meaning": "gray and fully opaque (alpha = 1), same as rgb(128,128,128)",
                "doc": "Fill color to assign to a polygon"
            },
            "fill-opacity": {
                "css": "polygon-opacity",
                "type": "float",
                "doc": "The opacity of the polygon",
                "default-value": 1,
                "default-meaning": "opaque"
            },
            "gamma": {
                "css": "polygon-gamma",
                "type": "float",
                "default-value": 1,
                "default-meaning": "fully antialiased",
                "range": "0-1",
                "doc": "Level of antialiasing of polygon edges"
            },
            "gamma-method": {
                "css": "polygon-gamma-method",
                "type": [
                    "power",
                    "linear",
                    "none",
                    "threshold",
                    "multiply"
                ],
                "default-value": "power",
                "default-meaning": "pow(x,gamma) is used to calculate pixel gamma, which produces slightly smoother line and polygon antialiasing than the 'linear' method, while other methods are usually only used to disable AA",
                "doc": "An Antigrain Geometry specific rendering hint to control the quality of antialiasing. Under the hood in Mapnik this method is used in combination with the 'gamma' value (which defaults to 1). The methods are in the AGG source at https://github.com/mapnik/mapnik/blob/master/deps/agg/include/agg_gamma_functions.h"
            },
            "clip": {
                "css": "polygon-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "smooth": {
                "css": "polygon-smooth",
                "type": "float",
                "default-value": 0,
                "default-meaning": "no smoothing",
                "range": "0-1",
                "doc": "Smooths out geometry angles. 0 is no smoothing, 1 is fully smoothed. Values greater than 1 will produce wild, looping geometries."
            },
            "geometry-transform": {
                "css": "polygon-geometry-transform",
                "type": "functions",
                "default-value": "none",
                "default-meaning": "geometry will not be transformed",
                "doc": "Allows transformation functions to be applied to the geometry.",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ]
            },
            "comp-op": {
                "css": "polygon-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "line": {
            "stroke": {
                "css": "line-color",
                "default-value": "rgba(0,0,0,1)",
                "type": "color",
                "default-meaning": "black and fully opaque (alpha = 1), same as rgb(0,0,0)",
                "doc": "The color of a drawn line"
            },
            "stroke-width": {
                "css": "line-width",
                "default-value": 1,
                "type": "float",
                "doc": "The width of a line in pixels"
            },
            "stroke-opacity": {
                "css": "line-opacity",
                "default-value": 1,
                "type": "float",
                "default-meaning": "opaque",
                "doc": "The opacity of a line"
            },
            "stroke-linejoin": {
                "css": "line-join",
                "default-value": "miter",
                "type": [
                    "miter",
                    "round",
                    "bevel"
                ],
                "doc": "The behavior of lines when joining"
            },
            "stroke-linecap": {
                "css": "line-cap",
                "default-value": "butt",
                "type": [
                    "butt",
                    "round",
                    "square"
                ],
                "doc": "The display of line endings"
            },
            "stroke-gamma": {
                "css": "line-gamma",
                "type": "float",
                "default-value": 1,
                "default-meaning": "fully antialiased",
                "range": "0-1",
                "doc": "Level of antialiasing of stroke line"
            },
            "stroke-gamma-method": {
                "css": "line-gamma-method",
                "type": [
                    "power",
                    "linear",
                    "none",
                    "threshold",
                    "multiply"
                ],
                "default-value": "power",
                "default-meaning": "pow(x,gamma) is used to calculate pixel gamma, which produces slightly smoother line and polygon antialiasing than the 'linear' method, while other methods are usually only used to disable AA",
                "doc": "An Antigrain Geometry specific rendering hint to control the quality of antialiasing. Under the hood in Mapnik this method is used in combination with the 'gamma' value (which defaults to 1). The methods are in the AGG source at https://github.com/mapnik/mapnik/blob/master/deps/agg/include/agg_gamma_functions.h"
            },
            "stroke-dasharray": {
                "css": "line-dasharray",
                "type": "numbers",
                "doc": "A pair of length values [a,b], where (a) is the dash length and (b) is the gap length respectively. More than two values are supported for more complex patterns.",
                "default-value": "none",
                "default-meaning": "solid line"
            },
            "stroke-dashoffset": {
                "css": "line-dash-offset",
                "type": "numbers",
                "doc": "valid parameter but not currently used in renderers (only exists for experimental svg support in Mapnik which is not yet enabled)",
                "default-value": "none",
                "default-meaning": "solid line"
            },
            "stroke-miterlimit": {
                "css": "line-miterlimit",
                "type": "float",
                "doc": "The limit on the ratio of the miter length to the stroke-width. Used to automatically convert miter joins to bevel joins for sharp angles to avoid the miter extending beyond the thickness of the stroking path. Normally will not need to be set, but a larger value can sometimes help avoid jaggy artifacts.",
                "default-value": 4.0,
                "default-meaning": "Will auto-convert miters to bevel line joins when theta is less than 29 degrees as per the SVG spec: 'miterLength / stroke-width = 1 / sin ( theta / 2 )'"
            },
            "clip": {
                "css": "line-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "smooth": {
                "css": "line-smooth",
                "type": "float",
                "default-value": 0,
                "default-meaning": "no smoothing",
                "range": "0-1",
                "doc": "Smooths out geometry angles. 0 is no smoothing, 1 is fully smoothed. Values greater than 1 will produce wild, looping geometries."
            },
            "offset": {
                "css": "line-offset",
                "type": "float",
                "default-value": 0,
                "default-meaning": "no offset",
                "doc": "Offsets a line a number of pixels parallel to its actual path. Postive values move the line left, negative values move it right (relative to the directionality of the line)."
            },
            "rasterizer": {
                "css": "line-rasterizer",
                "type": [
                    "full",
                    "fast"
                ],
                "default-value": "full",
                "doc": "Exposes an alternate AGG rendering method that sacrifices some accuracy for speed."
            },
            "geometry-transform": {
                "css": "line-geometry-transform",
                "type": "functions",
                "default-value": "none",
                "default-meaning": "geometry will not be transformed",
                "doc": "Allows transformation functions to be applied to the geometry.",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ]
            },
            "comp-op": {
                "css": "line-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "markers": {
            "file": {
                "css": "marker-file",
                "doc": "An SVG file that this marker shows at each placement. If no file is given, the marker will show an ellipse.",
                "default-value": "",
                "default-meaning": "An ellipse or circle, if width equals height",
                "type": "uri"
            },
            "opacity": {
                "css": "marker-opacity",
                "doc": "The overall opacity of the marker, if set, overrides both the opacity of both the fill and stroke",
                "default-value": 1,
                "default-meaning": "The stroke-opacity and fill-opacity will be used",
                "type": "float"
            },
            "fill-opacity": {
                "css": "marker-fill-opacity",
                "doc": "The fill opacity of the marker",
                "default-value": 1,
                "default-meaning": "opaque",
                "type": "float"
            },
            "stroke": {
                "css": "marker-line-color",
                "doc": "The color of the stroke around a marker shape.",
                "default-value": "black",
                "type": "color"
            },
            "stroke-width": {
                "css": "marker-line-width",
                "doc": "The width of the stroke around a marker shape, in pixels. This is positioned on the boundary, so high values can cover the area itself.",
                "type": "float"
            },
            "stroke-opacity": {
                "css": "marker-line-opacity",
                "default-value": 1,
                "default-meaning": "opaque",
                "doc": "The opacity of a line",
                "type": "float"
            },
            "placement": {
                "css": "marker-placement",
                "type": [
                    "point",
                    "line",
                    "interior"
                ],
                "default-value": "point",
                "default-meaning": "Place markers at the center point (centroid) of the geometry",
                "doc": "Attempt to place markers on a point, in the center of a polygon, or if markers-placement:line, then multiple times along a line. 'interior' placement can be used to ensure that points placed on polygons are forced to be inside the polygon interior"
            },
            "multi-policy": {
                "css": "marker-multi-policy",
                "type": [
                    "each",
                    "whole",
                    "largest"
                ],
                "default-value": "each",
                "default-meaning": "If a feature contains multiple geometries and the placement type is either point or interior then a marker will be rendered for each",
                "doc": "A special setting to allow the user to control rendering behavior for 'multi-geometries' (when a feature contains multiple geometries). This setting does not apply to markers placed along lines. The 'each' policy is default and means all geometries will get a marker. The 'whole' policy means that the aggregate centroid between all geometries will be used. The 'largest' policy means that only the largest (by bounding box areas) feature will get a rendered marker (this is how text labeling behaves by default)."
            },
            "marker-type": {
                "css": "marker-type",
                "type": [
                    "arrow",
                    "ellipse"
                ],
                "default-value": "ellipse",
                "doc": "The default marker-type. If a SVG file is not given as the marker-file parameter, the renderer provides either an arrow or an ellipse (a circle if height is equal to width)"
            },
            "width": {
                "css": "marker-width",
                "default-value": 10,
                "doc": "The width of the marker, if using one of the default types.",
                "type": "expression"
            },
            "height": {
                "css": "marker-height",
                "default-value": 10,
                "doc": "The height of the marker, if using one of the default types.",
                "type": "expression"
            },
            "fill": {
                "css": "marker-fill",
                "default-value": "blue",
                "doc": "The color of the area of the marker.",
                "type": "color"
            },
            "allow-overlap": {
                "css": "marker-allow-overlap",
                "type": "boolean",
                "default-value": false,
                "doc": "Control whether overlapping markers are shown or hidden.",
                "default-meaning": "Do not allow makers to overlap with each other - overlapping markers will not be shown."
            },
            "ignore-placement": {
                "css": "marker-ignore-placement",
                "type": "boolean",
                "default-value": false,
                "default-meaning": "do not store the bbox of this geometry in the collision detector cache",
                "doc": "value to control whether the placement of the feature will prevent the placement of other features"
            },
            "spacing": {
                "css": "marker-spacing",
                "doc": "Space between repeated labels",
                "default-value": 100,
                "type": "float"
            },
            "max-error": {
                "css": "marker-max-error",
                "type": "float",
                "default-value": 0.2,
                "doc": "The maximum difference between actual marker placement and the marker-spacing parameter. Setting a high value can allow the renderer to try to resolve placement conflicts with other symbolizers."
            },
            "transform": {
                "css": "marker-transform",
                "type": "functions",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ],
                "default-value": "",
                "default-meaning": "No transformation",
                "doc": "SVG transformation definition"
            },
            "clip": {
                "css": "marker-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "smooth": {
                "css": "marker-smooth",
                "type": "float",
                "default-value": 0,
                "default-meaning": "no smoothing",
                "range": "0-1",
                "doc": "Smooths out geometry angles. 0 is no smoothing, 1 is fully smoothed. Values greater than 1 will produce wild, looping geometries."
            },
            "geometry-transform": {
                "css": "marker-geometry-transform",
                "type": "functions",
                "default-value": "none",
                "default-meaning": "geometry will not be transformed",
                "doc": "Allows transformation functions to be applied to the geometry.",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ]
            },
            "comp-op": {
                "css": "marker-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "shield": {
            "name": {
                "css": "shield-name",
                "type": "expression",
                "serialization": "content",
                "doc": "Value to use for a shield\"s text label. Data columns are specified using brackets like [column_name]"
            },
            "file": {
                "css": "shield-file",
                "required": true,
                "type": "uri",
                "default-value": "none",
                "doc": "Image file to render behind the shield text"
            },
            "face-name": {
                "css": "shield-face-name",
                "type": "string",
                "validate": "font",
                "doc": "Font name and style to use for the shield text",
                "default-value": "",
                "required": true
            },
            "unlock-image": {
                "css": "shield-unlock-image",
                "type": "boolean",
                "doc": "This parameter should be set to true if you are trying to position text beside rather than on top of the shield image",
                "default-value": false,
                "default-meaning": "text alignment relative to the shield image uses the center of the image as the anchor for text positioning."
            },
            "size": {
                "css": "shield-size",
                "type": "float",
                "doc": "The size of the shield text in pixels"
            },
            "fill": {
                "css": "shield-fill",
                "type": "color",
                "doc": "The color of the shield text"
            },
            "placement": {
                "css": "shield-placement",
                "type": [
                    "point",
                    "line",
                    "vertex",
                    "interior"
                ],
                "default-value": "point",
                "doc": "How this shield should be placed. Point placement attempts to place it on top of points, line places along lines multiple times per feature, vertex places on the vertexes of polygons, and interior attempts to place inside of polygons."
            },
            "avoid-edges": {
                "css": "shield-avoid-edges",
                "doc": "Tell positioning algorithm to avoid labeling near intersection edges.",
                "type": "boolean",
                "default-value": false
            },
            "allow-overlap": {
                "css": "shield-allow-overlap",
                "type": "boolean",
                "default-value": false,
                "doc": "Control whether overlapping shields are shown or hidden.",
                "default-meaning": "Do not allow shields to overlap with other map elements already placed."
            },
            "minimum-distance": {
                "css": "shield-min-distance",
                "type": "float",
                "default-value": 0,
                "doc": "Minimum distance to the next shield symbol, not necessarily the same shield."
            },
            "spacing": {
                "css": "shield-spacing",
                "type": "float",
                "default-value": 0,
                "doc": "The spacing between repeated occurrences of the same shield on a line"
            },
            "minimum-padding": {
                "css": "shield-min-padding",
                "default-value": 0,
                "doc": "Determines the minimum amount of padding that a shield gets relative to other shields",
                "type": "float"
            },
            "wrap-width": {
                "css": "shield-wrap-width",
                "type": "unsigned",
                "default-value": 0,
                "doc": "Length of a chunk of text in characters before wrapping text"
            },
            "wrap-before": {
                "css": "shield-wrap-before",
                "type": "boolean",
                "default-value": false,
                "doc": "Wrap text before wrap-width is reached. If false, wrapped lines will be a bit longer than wrap-width."
            },
            "wrap-character": {
                "css": "shield-wrap-character",
                "type": "string",
                "default-value": " ",
                "doc": "Use this character instead of a space to wrap long names."
            },
            "halo-fill": {
                "css": "shield-halo-fill",
                "type": "color",
                "default-value": "#FFFFFF",
                "default-meaning": "white",
                "doc": "Specifies the color of the halo around the text."
            },
            "halo-radius": {
                "css": "shield-halo-radius",
                "doc": "Specify the radius of the halo in pixels",
                "default-value": 0,
                "default-meaning": "no halo",
                "type": "float"
            },
            "character-spacing": {
                "css": "shield-character-spacing",
                "type": "unsigned",
                "default-value": 0,
                "doc": "Horizontal spacing between characters (in pixels). Currently works for point placement only, not line placement."
            },
            "line-spacing": {
                "css": "shield-line-spacing",
                "doc": "Vertical spacing between lines of multiline labels (in pixels)",
                "type": "unsigned"
            },
            "dx": {
                "css": "shield-text-dx",
                "type": "float",
                "doc": "Displace text within shield by fixed amount, in pixels, +/- along the X axis.  A positive value will shift the text right",
                "default-value": 0
            },
            "dy": {
                "css": "shield-text-dy",
                "type": "float",
                "doc": "Displace text within shield by fixed amount, in pixels, +/- along the Y axis.  A positive value will shift the text down",
                "default-value": 0
            },
            "shield-dx": {
                "css": "shield-dx",
                "type": "float",
                "doc": "Displace shield by fixed amount, in pixels, +/- along the X axis.  A positive value will shift the text right",
                "default-value": 0
            },
            "shield-dy": {
                "css": "shield-dy",
                "type": "float",
                "doc": "Displace shield by fixed amount, in pixels, +/- along the Y axis.  A positive value will shift the text down",
                "default-value": 0
            },
            "opacity": {
                "css": "shield-opacity",
                "type": "float",
                "doc": "(Default 1.0) - opacity of the image used for the shield",
                "default-value": 1
            },
            "text-opacity": {
                "css": "shield-text-opacity",
                "type": "float",
                "doc": "(Default 1.0) - opacity of the text placed on top of the shield",
                "default-value": 1
            },
            "horizontal-alignment": {
                "css": "shield-horizontal-alignment",
                "type": [
                    "left",
                    "middle",
                    "right",
                    "auto"
                ],
                "doc": "The shield's horizontal alignment from its centerpoint",
                "default-value": "auto"
            },
            "vertical-alignment": {
                "css": "shield-vertical-alignment",
                "type": [
                    "top",
                    "middle",
                    "bottom",
                    "auto"
                ],
                "doc": "The shield's vertical alignment from its centerpoint",
                "default-value": "middle"
            },
            "text-transform": {
                "css": "shield-text-transform",
                "type": [
                    "none",
                    "uppercase",
                    "lowercase",
                    "capitalize"
                ],
                "doc": "Transform the case of the characters",
                "default-value": "none"
            },
            "justify-alignment": {
                "css": "shield-justify-alignment",
                "type": [
                    "left",
                    "center",
                    "right",
                    "auto"
                ],
                "doc": "Define how text in a shield's label is justified",
                "default-value": "auto"
            },
            "clip": {
                "css": "shield-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "comp-op": {
                "css": "shield-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "line-pattern": {
            "file": {
                "css": "line-pattern-file",
                "type": "uri",
                "default-value": "none",
                "required": true,
                "doc": "An image file to be repeated and warped along a line"
            },
            "clip": {
                "css": "line-pattern-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "smooth": {
                "css": "line-pattern-smooth",
                "type": "float",
                "default-value": 0,
                "default-meaning": "no smoothing",
                "range": "0-1",
                "doc": "Smooths out geometry angles. 0 is no smoothing, 1 is fully smoothed. Values greater than 1 will produce wild, looping geometries."
            },
            "geometry-transform": {
                "css": "line-pattern-geometry-transform",
                "type": "functions",
                "default-value": "none",
                "default-meaning": "geometry will not be transformed",
                "doc": "Allows transformation functions to be applied to the geometry.",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ]
            },
            "comp-op": {
                "css": "line-pattern-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "polygon-pattern": {
            "file": {
                "css": "polygon-pattern-file",
                "type": "uri",
                "default-value": "none",
                "required": true,
                "doc": "Image to use as a repeated pattern fill within a polygon"
            },
            "alignment": {
                "css": "polygon-pattern-alignment",
                "type": [
                    "local",
                    "global"
                ],
                "default-value": "local",
                "doc": "Specify whether to align pattern fills to the layer or to the map."
            },
            "gamma": {
                "css": "polygon-pattern-gamma",
                "type": "float",
                "default-value": 1,
                "default-meaning": "fully antialiased",
                "range": "0-1",
                "doc": "Level of antialiasing of polygon pattern edges"
            },
            "opacity": {
                "css": "polygon-pattern-opacity",
                "type": "float",
                "doc": "(Default 1.0) - Apply an opacity level to the image used for the pattern",
                "default-value": 1,
                "default-meaning": "The image is rendered without modifications"
            },
            "clip": {
                "css": "polygon-pattern-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "smooth": {
                "css": "polygon-pattern-smooth",
                "type": "float",
                "default-value": 0,
                "default-meaning": "no smoothing",
                "range": "0-1",
                "doc": "Smooths out geometry angles. 0 is no smoothing, 1 is fully smoothed. Values greater than 1 will produce wild, looping geometries."
            },
            "geometry-transform": {
                "css": "polygon-pattern-geometry-transform",
                "type": "functions",
                "default-value": "none",
                "default-meaning": "geometry will not be transformed",
                "doc": "Allows transformation functions to be applied to the geometry.",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ]
            },
            "comp-op": {
                "css": "polygon-pattern-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "raster": {
            "opacity": {
                "css": "raster-opacity",
                "default-value": 1,
                "default-meaning": "opaque",
                "type": "float",
                "doc": "The opacity of the raster symbolizer on top of other symbolizers."
            },
            "filter-factor": {
                "css": "raster-filter-factor",
                "default-value": -1,
                "default-meaning": "Allow the datasource to choose appropriate downscaling.",
                "type": "float",
                "doc": "This is used by the Raster or Gdal datasources to pre-downscale images using overviews. Higher numbers can sometimes cause much better scaled image output, at the cost of speed."
            },
            "scaling": {
                "css": "raster-scaling",
                "type": [
                    "near",
                    "fast",
                    "bilinear",
                    "bilinear8",
                    "bicubic",
                    "spline16",
                    "spline36",
                    "hanning",
                    "hamming",
                    "hermite",
                    "kaiser",
                    "quadric",
                    "catrom",
                    "gaussian",
                    "bessel",
                    "mitchell",
                    "sinc",
                    "lanczos",
                    "blackman"
                ],
                "default-value": "near",
                "doc": "The scaling algorithm used to making different resolution versions of this raster layer. Bilinear is a good compromise between speed and accuracy, while lanczos gives the highest quality."
            },
            "mesh-size": {
                "css": "raster-mesh-size",
                "default-value": 16,
                "default-meaning": "Reprojection mesh will be 1/16 of the resolution of the source image",
                "type": "unsigned",
                "doc": "A reduced resolution mesh is used for raster reprojection, and the total image size is divided by the mesh-size to determine the quality of that mesh. Values for mesh-size larger than the default will result in faster reprojection but might lead to distortion."
            },
            "comp-op": {
                "css": "raster-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "point": {
            "file": {
                "css": "point-file",
                "type": "uri",
                "required": false,
                "default-value": "none",
                "doc": "Image file to represent a point"
            },
            "allow-overlap": {
                "css": "point-allow-overlap",
                "type": "boolean",
                "default-value": false,
                "doc": "Control whether overlapping points are shown or hidden.",
                "default-meaning": "Do not allow points to overlap with each other - overlapping markers will not be shown."
            },
            "ignore-placement": {
                "css": "point-ignore-placement",
                "type": "boolean",
                "default-value": false,
                "default-meaning": "do not store the bbox of this geometry in the collision detector cache",
                "doc": "value to control whether the placement of the feature will prevent the placement of other features"
            },
            "opacity": {
                "css": "point-opacity",
                "type": "float",
                "default-value": 1.0,
                "default-meaning": "Fully opaque",
                "doc": "A value from 0 to 1 to control the opacity of the point"
            },
            "placement": {
                "css": "point-placement",
                "type": [
                    "centroid",
                    "interior"
                ],
                "doc": "How this point should be placed. Centroid calculates the geometric center of a polygon, which can be outside of it, while interior always places inside of a polygon.",
                "default-value": "centroid"
            },
            "transform": {
                "css": "point-transform",
                "type": "functions",
                "functions": [
                    ["matrix", 6],
                    ["translate", 2],
                    ["scale", 2],
                    ["rotate", 3],
                    ["skewX", 1],
                    ["skewY", 1]
                ],
                "default-value": "",
                "default-meaning": "No transformation",
                "doc": "SVG transformation definition"
            },
            "comp-op": {
                "css": "point-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "text": {
            "name": {
                "css": "text-name",
                "type": "expression",
                "required": true,
                "default-value": "",
                "serialization": "content",
                "doc": "Value to use for a text label. Data columns are specified using brackets like [column_name]"
            },
            "face-name": {
                "css": "text-face-name",
                "type": "string",
                "validate": "font",
                "doc": "Font name and style to render a label in",
                "required": true
            },
            "size": {
                "css": "text-size",
                "type": "float",
                "default-value": 10,
                "doc": "Text size in pixels"
            },
            "text-ratio": {
                "css": "text-ratio",
                "doc": "Define the amount of text (of the total) present on successive lines when wrapping occurs",
                "default-value": 0,
                "type": "unsigned"
            },
            "wrap-width": {
                "css": "text-wrap-width",
                "doc": "Length of a chunk of text in characters before wrapping text",
                "default-value": 0,
                "type": "unsigned"
            },
            "wrap-before": {
                "css": "text-wrap-before",
                "type": "boolean",
                "default-value": false,
                "doc": "Wrap text before wrap-width is reached. If false, wrapped lines will be a bit longer than wrap-width."
            },
            "wrap-character": {
                "css": "text-wrap-character",
                "type": "string",
                "default-value": " ",
                "doc": "Use this character instead of a space to wrap long text."
            },
            "spacing": {
                "css": "text-spacing",
                "type": "unsigned",
                "doc": "Distance between repeated text labels on a line (aka. label-spacing)"
            },
            "character-spacing": {
                "css": "text-character-spacing",
                "type": "float",
                "default-value": 0,
                "doc": "Horizontal spacing adjustment between characters in pixels"
            },
            "line-spacing": {
                "css": "text-line-spacing",
                "default-value": 0,
                "type": "unsigned",
                "doc": "Vertical spacing adjustment between lines in pixels"
            },
            "label-position-tolerance": {
                "css": "text-label-position-tolerance",
                "default-value": 0,
                "type": "unsigned",
                "doc": "Allows the label to be displaced from its ideal position by a number of pixels (only works with placement:line)"
            },
            "max-char-angle-delta": {
                "css": "text-max-char-angle-delta",
                "type": "float",
                "default-value": "22.5",
                "doc": "The maximum angle change, in degrees, allowed between adjacent characters in a label. This value internally is converted to radians to the default is 22.5*math.pi/180.0. The higher the value the fewer labels will be placed around around sharp corners."
            },
            "fill": {
                "css": "text-fill",
                "doc": "Specifies the color for the text",
                "default-value": "#000000",
                "type": "color"
            },
            "opacity": {
                "css": "text-opacity",
                "doc": "A number from 0 to 1 specifying the opacity for the text",
                "default-value": 1.0,
                "default-meaning": "Fully opaque",
                "type": "float"
            },
            "halo-fill": {
                "css": "text-halo-fill",
                "type": "color",
                "default-value": "#FFFFFF",
                "default-meaning": "white",
                "doc": "Specifies the color of the halo around the text."
            },
            "halo-radius": {
                "css": "text-halo-radius",
                "doc": "Specify the radius of the halo in pixels",
                "default-value": 0,
                "default-meaning": "no halo",
                "type": "float"
            },
            "dx": {
                "css": "text-dx",
                "type": "float",
                "doc": "Displace text by fixed amount, in pixels, +/- along the X axis.  A positive value will shift the text right",
                "default-value": 0
            },
            "dy": {
                "css": "text-dy",
                "type": "float",
                "doc": "Displace text by fixed amount, in pixels, +/- along the Y axis.  A positive value will shift the text down",
                "default-value": 0
            },
            "vertical-alignment": {
                "css": "text-vertical-alignment",
                "type": [
                    "top",
                    "middle",
                    "bottom",
                    "auto"
                ],
                "doc": "Position of label relative to point position.",
                "default-value": "auto",
                "default-meaning": "Default affected by value of dy; \"bottom\" for dy>0, \"top\" for dy<0."
            },
            "avoid-edges": {
                "css": "text-avoid-edges",
                "doc": "Tell positioning algorithm to avoid labeling near intersection edges.",
                "default-value": false,
                "type": "boolean"
            },
            "minimum-distance": {
                "css": "text-min-distance",
                "doc": "Minimum permitted distance to the next text symbolizer.",
                "type": "float"
            },
            "minimum-padding": {
                "css": "text-min-padding",
                "doc": "Determines the minimum amount of padding that a text symbolizer gets relative to other text",
                "type": "float"
            },
            "minimum-path-length": {
                "css": "text-min-path-length",
                "type": "float",
                "default-value": 0,
                "default-meaning": "place labels on all paths",
                "doc": "Place labels only on paths longer than this value."
            },
            "allow-overlap": {
                "css": "text-allow-overlap",
                "type": "boolean",
                "default-value": false,
                "doc": "Control whether overlapping text is shown or hidden.",
                "default-meaning": "Do not allow text to overlap with other text - overlapping markers will not be shown."
            },
            "orientation": {
                "css": "text-orientation",
                "type": "expression",
                "doc": "Rotate the text."
            },
            "placement": {
                "css": "text-placement",
                "type": [
                    "point",
                    "line",
                    "vertex",
                    "interior"
                ],
                "default-value": "point",
                "doc": "Control the style of placement of a point versus the geometry it is attached to."
            },
            "placement-type": {
                "css": "text-placement-type",
                "doc": "Re-position and/or re-size text to avoid overlaps. \"simple\" for basic algorithm (using text-placements string,) \"dummy\" to turn this feature off.",
                "type": [
                    "dummy",
                    "simple"
                ],
                "default-value": "dummy"
            },
            "placements": {
                "css": "text-placements",
                "type": "string",
                "default-value": "",
                "doc": "If \"placement-type\" is set to \"simple\", use this \"POSITIONS,[SIZES]\" string. An example is `text-placements: \"E,NE,SE,W,NW,SW\";` "
            },
            "text-transform": {
                "css": "text-transform",
                "type": [
                    "none",
                    "uppercase",
                    "lowercase",
                    "capitalize"
                ],
                "doc": "Transform the case of the characters",
                "default-value": "none"
            },
            "horizontal-alignment": {
                "css": "text-horizontal-alignment",
                "type": [
                    "left",
                    "middle",
                    "right",
                    "auto"
                ],
                "doc": "The text's horizontal alignment from its centerpoint",
                "default-value": "auto"
            },
            "justify-alignment": {
                "css": "text-align",
                "type": [
                    "left",
                    "right",
                    "center",
                    "auto"
                ],
                "doc": "Define how text is justified",
                "default-value": "auto",
                "default-meaning": "Auto alignment means that text will be centered by default except when using the `placement-type` parameter - in that case either right or left justification will be used automatically depending on where the text could be fit given the `text-placements` directives"
            },
            "clip": {
                "css": "text-clip",
                "type": "boolean",
                "default-value": true,
                "default-meaning": "geometry will be clipped to map bounds before rendering",
                "doc": "geometries are clipped to map bounds by default for best rendering performance. In some cases users may wish to disable this to avoid rendering artifacts."
            },
            "comp-op": {
                "css": "text-comp-op",
                "default-value": "src-over",
                "default-meaning": "add the current symbolizer on top of other symbolizer",
                "doc": "Composite operation. This defines how this symbolizer should behave relative to symbolizers atop or below it.",
                "type": ["clear",
                    "src",
                    "dst",
                    "src-over",
                    "dst-over",
                    "src-in",
                    "dst-in",
                    "src-out",
                    "dst-out",
                    "src-atop",
                    "dst-atop",
                    "xor",
                    "plus",
                    "minus",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "contrast",
                    "invert",
                    "invert-rgb",
                    "grain-merge",
                    "grain-extract",
                    "hue",
                    "saturation",
                    "color",
                    "value"
                ]
            }
        },
        "building": {
            "fill": {
                "css": "building-fill",
                "default-value": "#FFFFFF",
                "doc": "The color of the buildings walls.",
                "type": "color"
            },
            "fill-opacity": {
                "css": "building-fill-opacity",
                "type": "float",
                "doc": "The opacity of the building as a whole, including all walls.",
                "default-value": 1
            },
            "height": {
                "css": "building-height",
                "doc": "The height of the building in pixels.",
                "type": "expression",
                "default-value": "0"
            }
        }
    },
    "colors": {
        "aliceblue":  [240, 248, 255],
        "antiquewhite":  [250, 235, 215],
        "aqua":  [0, 255, 255],
        "aquamarine":  [127, 255, 212],
        "azure":  [240, 255, 255],
        "beige":  [245, 245, 220],
        "bisque":  [255, 228, 196],
        "black":  [0, 0, 0],
        "blanchedalmond":  [255,235,205],
        "blue":  [0, 0, 255],
        "blueviolet":  [138, 43, 226],
        "brown":  [165, 42, 42],
        "burlywood":  [222, 184, 135],
        "cadetblue":  [95, 158, 160],
        "chartreuse":  [127, 255, 0],
        "chocolate":  [210, 105, 30],
        "coral":  [255, 127, 80],
        "cornflowerblue":  [100, 149, 237],
        "cornsilk":  [255, 248, 220],
        "crimson":  [220, 20, 60],
        "cyan":  [0, 255, 255],
        "darkblue":  [0, 0, 139],
        "darkcyan":  [0, 139, 139],
        "darkgoldenrod":  [184, 134, 11],
        "darkgray":  [169, 169, 169],
        "darkgreen":  [0, 100, 0],
        "darkgrey":  [169, 169, 169],
        "darkkhaki":  [189, 183, 107],
        "darkmagenta":  [139, 0, 139],
        "darkolivegreen":  [85, 107, 47],
        "darkorange":  [255, 140, 0],
        "darkorchid":  [153, 50, 204],
        "darkred":  [139, 0, 0],
        "darksalmon":  [233, 150, 122],
        "darkseagreen":  [143, 188, 143],
        "darkslateblue":  [72, 61, 139],
        "darkslategrey":  [47, 79, 79],
        "darkturquoise":  [0, 206, 209],
        "darkviolet":  [148, 0, 211],
        "deeppink":  [255, 20, 147],
        "deepskyblue":  [0, 191, 255],
        "dimgray":  [105, 105, 105],
        "dimgrey":  [105, 105, 105],
        "dodgerblue":  [30, 144, 255],
        "firebrick":  [178, 34, 34],
        "floralwhite":  [255, 250, 240],
        "forestgreen":  [34, 139, 34],
        "fuchsia":  [255, 0, 255],
        "gainsboro":  [220, 220, 220],
        "ghostwhite":  [248, 248, 255],
        "gold":  [255, 215, 0],
        "goldenrod":  [218, 165, 32],
        "gray":  [128, 128, 128],
        "grey":  [128, 128, 128],
        "green":  [0, 128, 0],
        "greenyellow":  [173, 255, 47],
        "honeydew":  [240, 255, 240],
        "hotpink":  [255, 105, 180],
        "indianred":  [205, 92, 92],
        "indigo":  [75, 0, 130],
        "ivory":  [255, 255, 240],
        "khaki":  [240, 230, 140],
        "lavender":  [230, 230, 250],
        "lavenderblush":  [255, 240, 245],
        "lawngreen":  [124, 252, 0],
        "lemonchiffon":  [255, 250, 205],
        "lightblue":  [173, 216, 230],
        "lightcoral":  [240, 128, 128],
        "lightcyan":  [224, 255, 255],
        "lightgoldenrodyellow":  [250, 250, 210],
        "lightgray":  [211, 211, 211],
        "lightgreen":  [144, 238, 144],
        "lightgrey":  [211, 211, 211],
        "lightpink":  [255, 182, 193],
        "lightsalmon":  [255, 160, 122],
        "lightseagreen":  [32, 178, 170],
        "lightskyblue":  [135, 206, 250],
        "lightslategray":  [119, 136, 153],
        "lightslategrey":  [119, 136, 153],
        "lightsteelblue":  [176, 196, 222],
        "lightyellow":  [255, 255, 224],
        "lime":  [0, 255, 0],
        "limegreen":  [50, 205, 50],
        "linen":  [250, 240, 230],
        "magenta":  [255, 0, 255],
        "maroon":  [128, 0, 0],
        "mediumaquamarine":  [102, 205, 170],
        "mediumblue":  [0, 0, 205],
        "mediumorchid":  [186, 85, 211],
        "mediumpurple":  [147, 112, 219],
        "mediumseagreen":  [60, 179, 113],
        "mediumslateblue":  [123, 104, 238],
        "mediumspringgreen":  [0, 250, 154],
        "mediumturquoise":  [72, 209, 204],
        "mediumvioletred":  [199, 21, 133],
        "midnightblue":  [25, 25, 112],
        "mintcream":  [245, 255, 250],
        "mistyrose":  [255, 228, 225],
        "moccasin":  [255, 228, 181],
        "navajowhite":  [255, 222, 173],
        "navy":  [0, 0, 128],
        "oldlace":  [253, 245, 230],
        "olive":  [128, 128, 0],
        "olivedrab":  [107, 142, 35],
        "orange":  [255, 165, 0],
        "orangered":  [255, 69, 0],
        "orchid":  [218, 112, 214],
        "palegoldenrod":  [238, 232, 170],
        "palegreen":  [152, 251, 152],
        "paleturquoise":  [175, 238, 238],
        "palevioletred":  [219, 112, 147],
        "papayawhip":  [255, 239, 213],
        "peachpuff":  [255, 218, 185],
        "peru":  [205, 133, 63],
        "pink":  [255, 192, 203],
        "plum":  [221, 160, 221],
        "powderblue":  [176, 224, 230],
        "purple":  [128, 0, 128],
        "red":  [255, 0, 0],
        "rosybrown":  [188, 143, 143],
        "royalblue":  [65, 105, 225],
        "saddlebrown":  [139, 69, 19],
        "salmon":  [250, 128, 114],
        "sandybrown":  [244, 164, 96],
        "seagreen":  [46, 139, 87],
        "seashell":  [255, 245, 238],
        "sienna":  [160, 82, 45],
        "silver":  [192, 192, 192],
        "skyblue":  [135, 206, 235],
        "slateblue":  [106, 90, 205],
        "slategray":  [112, 128, 144],
        "slategrey":  [112, 128, 144],
        "snow":  [255, 250, 250],
        "springgreen":  [0, 255, 127],
        "steelblue":  [70, 130, 180],
        "tan":  [210, 180, 140],
        "teal":  [0, 128, 128],
        "thistle":  [216, 191, 216],
        "tomato":  [255, 99, 71],
        "turquoise":  [64, 224, 208],
        "violet":  [238, 130, 238],
        "wheat":  [245, 222, 179],
        "white":  [255, 255, 255],
        "whitesmoke":  [245, 245, 245],
        "yellow":  [255, 255, 0],
        "yellowgreen":  [154, 205, 50],
        "transparent":  [0, 0, 0, 0]
    },
    "filter": {
        "value": [
            "true",
            "false",
            "null",
            "point",
            "linestring",
            "polygon",
            "collection"
        ]
    }
};

SuperMap.CartoCSS['mapnik_reference'] =  {
    version: {
        latest: SuperMap._mapnik_reference_latest,
        '2.1.1': SuperMap._mapnik_reference_latest
    }
};

SuperMap.CartoCSS.Tree={};

SuperMap.CartoCSS.Tree.functions={
    rgb: function (r, g, b) {
        return this.rgba(r, g, b, 1.0);
    },
    rgba: function (r, g, b, a) {
        var me=this;
        var rgb = [r, g, b].map(function (c) { return me.number(c); });
        a = me.number(a);
        if (rgb.some(isNaN) || isNaN(a)) return null;
        return new SuperMap.CartoCSS.Tree.Color(rgb, a);
    },
    // Only require val
    stop: function (val) {
        var color, mode;
        if (arguments.length > 1) color = arguments[1];
        if (arguments.length > 2) mode = arguments[2];

        return {
            is: 'tag',
            val: val,
            color: color,
            mode: mode,
            toString: function(env) {
                return '\n\t<stop value="' + val.ev(env) + '"' +
                    (color ? ' color="' + color.ev(env) + '" ' : '') +
                    (mode ? ' mode="' + mode.ev(env) + '" ' : '') +
                    '/>';
            }
        };
    },
    hsl: function (h, s, l) {
        return this.hsla(h, s, l, 1.0);
    },
    hsla: function (h, s, l, a) {
        h = (this.number(h) % 360) / 360;
        s = this.number(s); l = this.number(l); a = this.number(a);
        if ([h, s, l, a].some(isNaN)) return null;

        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s,
            m1 = l * 2 - m2;

        return this.rgba(hue(h + 1/3) * 255,
            hue(h)       * 255,
            hue(h - 1/3) * 255,
            a);

        function hue(h) {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if      (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
            else if (h * 2 < 1) return m2;
            else if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
            else                return m1;
        }
    },
    hue: function (color) {
        if (!('toHSL' in color)) return null;
        return new SuperMap.CartoCSS.Tree.Dimension(Math.round(color.toHSL().h));
    },
    saturation: function (color) {
        if (!('toHSL' in color)) return null;
        return new SuperMap.CartoCSS.Tree.Dimension(Math.round(color.toHSL().s * 100), '%');
    },
    lightness: function (color) {
        if (!('toHSL' in color)) return null;
        return new SuperMap.CartoCSS.Tree.Dimension(Math.round(color.toHSL().l * 100), '%');
    },
    alpha: function (color) {
        if (!('toHSL' in color)) return null;
        return new SuperMap.CartoCSS.Tree.Dimension(color.toHSL().a);
    },
    saturate: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();

        hsl.s += amount.value / 100;
        hsl.s = this.clamp(hsl.s);
        return this.hsla_simple(hsl);
    },
    desaturate: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();

        hsl.s -= amount.value / 100;
        hsl.s = this.clamp(hsl.s);
        return this.hsla_simple(hsl);
    },
    lighten: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();

        hsl.l += amount.value / 100;
        hsl.l = this.clamp(hsl.l);
        return this.hsla_simple(hsl);
    },
    darken: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();

        hsl.l -= amount.value / 100;
        hsl.l = this.clamp(hsl.l);
        return this.hsla_simple(hsl);
    },
    fadein: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();

        hsl.a += amount.value / 100;
        hsl.a = this.clamp(hsl.a);
        return this.hsla_simple(hsl);
    },
    fadeout: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();

        hsl.a -= amount.value / 100;
        hsl.a = this.clamp(hsl.a);
        return this.hsla_simple(hsl);
    },
    spin: function (color, amount) {
        if (!('toHSL' in color)) return null;
        var hsl = color.toHSL();
        var hue = (hsl.h + amount.value) % 360;

        hsl.h = hue < 0 ? 360 + hue : hue;

        return this.hsla_simple(hsl);
    },
    replace: function (entity, a, b) {
        if (entity.is === 'field') {
            return entity.toString + '.replace(' + a.toString() + ', ' + b.toString() + ')';
        } else {
            return entity.replace(a, b);
        }
    },
    //
    // Copyright (c) 2006-2009 Hampton Catlin, Nathan Weizenbaum, and Chris Eppstein
    // http://sass-lang.com
    //
    mix: function (color1, color2, weight) {
        var p = weight.value / 100.0;
        var w = p * 2 - 1;
        var a = color1.toHSL().a - color2.toHSL().a;

        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;

        var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
            color1.rgb[1] * w1 + color2.rgb[1] * w2,
            color1.rgb[2] * w1 + color2.rgb[2] * w2];

        var alpha = color1.alpha * p + color2.alpha * (1 - p);

        return new SuperMap.CartoCSS.Tree.Color(rgb, alpha);
    },
    greyscale: function (color) {
        return this.desaturate(color, new SuperMap.CartoCSS.Tree.Dimension(100));
    },
    '%': function (quoted /* arg, arg, ...*/) {
        var args = Array.prototype.slice.call(arguments, 1),
            str = quoted.value;

        for (var i = 0; i < args.length; i++) {
            str = str.replace(/%s/,    args[i].value)
                .replace(/%[da]/, args[i].toString());
        }
        str = str.replace(/%%/g, '%');
        return new SuperMap.CartoCSS.Tree.Quoted(str);
    },

     hsla_simple:function(h) {
         return this.hsla(h.h, h.s, h.l, h.a);
    },

    number:function(n) {
        if (n instanceof SuperMap.CartoCSS.Tree.Dimension) {
            return parseFloat(n.unit === '%' ? n.value / 100 : n.value);
        } else if (typeof(n) === 'number') {
            return n;
        } else {
            return NaN;
        }
    },

    clamp:function(val) {
        return Math.min(1, Math.max(0, val));
    }
};

SuperMap.CartoCSS.Tree.Call=SuperMap.Class({
    is: 'call',

    initialize:function(name, args, index) {
        this.name = name;
        this.args = args;
        this.index = index;
    },
    // When evuating a function call,
    // we either find the function in `tree.functions` [1],
    // in which case we call it, passing the  evaluated arguments,
    // or we simply print it out as it appeared originally [2].
    // The *functions.js* file contains the built-in functions.
    // The reason why we evaluate the arguments, is in the case where
    // we try to pass a variable to a function, like: `saturate(@color)`.
    // The function should receive the value, not the variable.
    'ev': function(env) {
        var args = this.args.map(function(a) { return a.ev(env); });

        for (var i = 0; i < args.length; i++) {
            if (args[i].is === 'undefined') {
                return {
                    is: 'undefined',
                    value: 'undefined'
                };
            }
        }

        if (this.name in SuperMap.CartoCSS.Tree.functions) {
            if (SuperMap.CartoCSS.Tree.functions[this.name].length <= args.length) {
                var val = SuperMap.CartoCSS.Tree.functions[this.name].apply(SuperMap.CartoCSS.Tree.functions, args);
                if (val === null) {
                    env.error({
                        message: 'incorrect arguments given to ' + this.name + '()',
                        index: this.index,
                        type: 'runtime',
                        filename: this.filename
                    });
                    return { is: 'undefined', value: 'undefined' };
                }
                return val;
            } else {
                env.error({
                    message: 'incorrect number of arguments for ' + this.name +
                        '(). ' + SuperMap.CartoCSS.Tree.functions[this.name].length + ' expected.',
                    index: this.index,
                    type: 'runtime',
                    filename: this.filename
                });
                return {
                    is: 'undefined',
                    value: 'undefined'
                };
            }
        } else {
            var fn = SuperMap.CartoCSS.Tree.Reference.mapnikFunctions[this.name];
            if (fn === undefined) {
                var functions = _.pairs(SuperMap.CartoCSS.Tree.Reference.mapnikFunctions);
                // cheap closest, needs improvement.
                var name = this.name;
                var mean = functions.map(function(f) {
                    return [f[0], SuperMap.CartoCSS.Tree.Reference.editDistance(name, f[0]), f[1]];
                }).sort(function(a, b) {
                        return a[1] - b[1];
                    });
                env.error({
                    message: 'unknown function ' + this.name + '(), did you mean ' +
                        mean[0][0] + '(' + mean[0][2] + ')',
                    index: this.index,
                    type: 'runtime',
                    filename: this.filename
                });
                return {
                    is: 'undefined',
                    value: 'undefined'
                };
            }
            if (fn !== args.length &&
                // support variable-arg functions like `colorize-alpha`
                fn !== -1) {
                env.error({
                    message: 'function ' + this.name + '() takes ' +
                        fn + ' arguments and was given ' + args.length,
                    index: this.index,
                    type: 'runtime',
                    filename: this.filename
                });
                return {
                    is: 'undefined',
                    value: 'undefined'
                };
            } else {
                // Save the evaluated versions of arguments
                this.args = args;
                return this;
            }
        }
    },

    toString: function(env, format) {
        if (this.args.length) {
            return this.name + '(' + this.args.join(',') + ')';
        } else {
            return this.name;
        }
    }
});

SuperMap.CartoCSS.Tree.Color= SuperMap.Class({
    is: 'color',
    initialize:function(rgb, a) {
        // The end goal here, is to parse the arguments
        // into an integer triplet, such as `128, 255, 0`
        //
        // This facilitates operations and conversions.
        if (Array.isArray(rgb)) {
            this.rgb = rgb.slice(0, 3);
        } else if (rgb.length == 6) {
            this.rgb = rgb.match(/.{2}/g).map(function(c) {
                return parseInt(c, 16);
            });
        } else {
            this.rgb = rgb.split('').map(function(c) {
                return parseInt(c + c, 16);
            });
        }

        if (typeof(a) === 'number') {
            this.alpha = a;
        } else if (rgb.length === 4) {
            this.alpha = rgb[3];
        } else {
            this.alpha = 1;
        }
    },
    'ev': function() { return this; },

    // If we have some transparency, the only way to represent it
    // is via `rgba`. Otherwise, we use the hex representation,
    // which has better compatibility with older browsers.
    // Values are capped between `0` and `255`, rounded and zero-padded.
    toString: function() {
       /* if (this.alpha < 1.0) {*/
            return 'rgba(' + this.rgb.map(function(c) {
                return Math.round(c);
            }).concat(this.alpha).join(', ') + ')';
        /*} else {
            return '#' + this.rgb.map(function(i) {
                i = Math.round(i);
                i = (i > 255 ? 255 : (i < 0 ? 0 : i)).toString(16);
                return i.length === 1 ? '0' + i : i;
            }).join('');
        }*/
    },

    // Operations have to be done per-channel, if not,
    // channels will spill onto each other. Once we have
    // our result, in the form of an integer triplet,
    // we create a new Color node to hold the result.
    operate: function(env, op, other) {
        var result = [];

        if (! (other instanceof SuperMap.CartoCSS.Tree.Color)) {
            other = other.toColor();
        }

        for (var c = 0; c < 3; c++) {
            result[c] = SuperMap.CartoCSS.Tree.operate(op, this.rgb[c], other.rgb[c]);
        }
        return new SuperMap.CartoCSS.Tree.Color(result);
    },

    toHSL: function() {
        var r = this.rgb[0] / 255,
            g = this.rgb[1] / 255,
            b = this.rgb[2] / 255,
            a = this.alpha;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2, d = max - min;

        if (max === min) {
            h = s = 0;
        } else {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s, l: l, a: a };
    }
});

SuperMap.CartoCSS.Tree.Comment=SuperMap.Class({
    initialize:function(value, silent){
        this.value = value;
        this.silent = !!silent;
    },
    toString: function(env) {
        return '<!--' + this.value + '-->';
    },
    'ev': function() { return this; }
});

SuperMap.CartoCSS.Tree.Definition=SuperMap.Class({
    initialize:function(selector, rules) {
        this.elements = selector.elements;
        //assert.ok(selector.filters instanceof SuperMap.CartoCSS.Tree.Filterset);
        this.rules = rules;
        this.ruleIndex = {};
        for (var i = 0; i < this.rules.length; i++) {
            if ('zoom' in this.rules[i]) this.rules[i] = this.rules[i].clone();
            this.rules[i].zoom = selector.zoom;
            this.ruleIndex[this.rules[i].updateID()] = true;
        }
        this.filters = selector.filters;
        this.zoom = selector.zoom;
        this.attachment = selector.attachment || '__default__';
        this.specificity = selector.specificity();
    },
    toString : function() {
        var str = this.filters.toString();
        for (var i = 0; i < this.rules.length; i++) {
            str += '\n    ' + this.rules[i];
        }
        return str;
    },
    toJS : function(env) {
        var shaderAttrs = {};

        // merge conditions from filters with zoom condition of the
        // definition
        var zoom = this.zoom;
        var frame_offset = this.frame_offset;
        var _if = this.filters.toJS(env);
        var filters = [zoom];
        if(_if) filters.push(_if);
        //if(frame_offset) filters.push('ctx["frame-offset"] === ' + frame_offset);
        _if = filters.join(" && ");
        function eachRule(rule) {
            if(rule instanceof SuperMap.CartoCSS.Tree.Rule) {
                shaderAttrs[rule.name] = shaderAttrs[rule.name] || [];
                if (_if) {
                    shaderAttrs[rule.name].push(
                        "if(" + _if + "){" + rule.value.toJS(env) + "}"
                    );
                } else {
                    shaderAttrs[rule.name].push(rule.value.toJS(env));
                }
            } else {
                if (rule instanceof SuperMap.CartoCSS.Tree.Ruleset) {
                    var sh = rule.toJS(env);
                    for(var v in sh) {
                        shaderAttrs[v] = shaderAttrs[v] || [];
                        for(var attr in sh[v]) {
                            shaderAttrs[v].push(sh[v][attr]);
                        }
                    }
                }
            }
        };
        for(var id in this.rules){
            eachRule(this.rules[id]);
        }
        return shaderAttrs;
    },
    clone : function(filters) {
        if (filters) assert.ok(filters instanceof SuperMap.CartoCSS.Tree.Filterset);
        var clone = Object.create(SuperMap.CartoCSS.Tree.Definition.prototype);
        clone.rules = this.rules.slice();
        clone.ruleIndex = _.clone(this.ruleIndex);
        clone.filters = filters ? filters : this.filters.clone();
        clone.attachment = this.attachment;
        return clone;
    },

    addRules : function(rules) {
        var added = 0;

        // Add only unique rules.
        for (var i = 0; i < rules.length; i++) {
            if (!this.ruleIndex[rules[i].id]) {
                this.rules.push(rules[i]);
                this.ruleIndex[rules[i].id] = true;
                added++;
            }
        }

        return added;
    },
    appliesTo : function(id, classes) {
        for (var i = 0, l = this.elements.length; i < l; i++) {
            var elem = this.elements[i];
            if (!(elem.wildcard ||
                (elem.type === 'class' && classes[elem.clean]) ||
                (elem.type === 'id' && id === elem.clean))) return false;
        }
        return true;
    },
    symbolizersToXML : function(env, symbolizers, zoom) {
        var xml = zoom.toXML(env).join('') + this.filters.toXML(env);

        // Sort symbolizers by the index of their first property definition
        var sym_order = [], indexes = [];
        for (var key in symbolizers) {
            indexes = [];
            for (var prop in symbolizers[key]) {
                indexes.push(symbolizers[key][prop].index);
            }
            var min_idx = Math.min.apply(Math, indexes);
            sym_order.push([key, min_idx]);
        }

        // Get a simple list of the symbolizers, in order
        function symbolizerList(sym_order) {
            return sym_order.sort(function(a, b) { return a[1] - b[1]; })
                .map(function(v) { return v[0]; });
        }
        sym_order = symbolizerList(sym_order);
        var sym_count = 0;

        for (var i = 0; i < sym_order.length; i++) {
            var attributes = symbolizers[sym_order[i]];
            var symbolizer = sym_order[i].split('/').pop();

            // Skip the magical * symbolizer which is used for universal properties
            // which are bubbled up to Style elements intead of Symbolizer elements.
            if (symbolizer === '*') continue;
            sym_count++;

            var fail = SuperMap.CartoCSS.Tree.Reference.requiredProperties(symbolizer, attributes);
            if (fail) {
                var rule = attributes[Object.keys(attributes).shift()];
                env.error({
                    message: fail,
                    index: rule.index,
                    filename: rule.filename
                });
            }
            function symbolizerName(symbolizer) {
                function capitalize(str) { return str[1].toUpperCase(); }
                return symbolizer.charAt(0).toUpperCase() +
                    symbolizer.slice(1).replace(/\-./, capitalize) + 'Symbolizer';
            }
            var name = symbolizerName(symbolizer);

            var selfclosing = true, tagcontent;
            xml += '    <' + name + ' ';
            for (var j in attributes) {
                if (symbolizer === 'map') env.error({
                    message: 'Map properties are not permitted in other rules',
                    index: attributes[j].index,
                    filename: attributes[j].filename
                });
                var x = SuperMap.CartoCSS.Tree.Reference.selector(attributes[j].name);
                if (x && x.serialization && x.serialization === 'content') {
                    selfclosing = false;
                    tagcontent = attributes[j].ev(env).toXML(env, true);
                } else if (x && x.serialization && x.serialization === 'tag') {
                    selfclosing = false;
                    tagcontent = attributes[j].ev(env).toXML(env, true);
                } else {
                    xml += attributes[j].ev(env).toXML(env) + ' ';
                }
            }
            if (selfclosing) {
                xml += '/>\n';
            } else if (typeof tagcontent !== "undefined") {
                if (tagcontent.indexOf('<') != -1) {
                    xml += '>' + tagcontent + '</' + name + '>\n';
                } else {
                    xml += '><![CDATA[' + tagcontent + ']]></' + name + '>\n';
                }
            }
        }
        if (!sym_count || !xml) return '';
        return '  <Rule>\n' + xml + '  </Rule>\n';
    },
    collectSymbolizers : function(zooms, i) {
        var symbolizers = {}, child;

        for (var j = i; j < this.rules.length; j++) {
            child = this.rules[j];
            var key = child.instance + '/' + child.symbolizer;
            if (zooms.current & child.zoom &&
                (!(key in symbolizers) ||
                    (!(child.name in symbolizers[key])))) {
                zooms.current &= child.zoom;
                if (!(key in symbolizers)) {
                    symbolizers[key] = {};
                }
                symbolizers[key][child.name] = child;
            }
        }

        if (Object.keys(symbolizers).length) {
            zooms.rule &= (zooms.available &= ~zooms.current);
            return symbolizers;
        }
    },
    toXML : function(env, existing) {
        var filter = this.filters.toString();
        if (!(filter in existing)) existing[filter] = SuperMap.CartoCSS.Tree.Zoom.all;

        var available = SuperMap.CartoCSS.Tree.Zoom.all, xml = '', zoom, symbolizers,
            zooms = { available: SuperMap.CartoCSS.Tree.Zoom.all };
        for (var i = 0; i < this.rules.length && available; i++) {
            zooms.rule = this.rules[i].zoom;
            if (!(existing[filter] & zooms.rule)) continue;

            while (zooms.current = zooms.rule & available) {
                if (symbolizers = this.collectSymbolizers(zooms, i)) {
                    if (!(existing[filter] & zooms.current)) continue;
                    xml += this.symbolizersToXML(env, symbolizers,
                        (new SuperMap.CartoCSS.Tree.Zoom()).setZoom(existing[filter] & zooms.current));
                    existing[filter] &= ~zooms.current;
                }
            }
        }

        return xml;
    }
});

SuperMap.CartoCSS.Tree.Dimension=SuperMap.Class({
    is: 'float',
    physical_units: ['m', 'cm', 'in', 'mm', 'pt', 'pc'],
    screen_units: ['px', '%'],
    all_units: ['m', 'cm', 'in', 'mm', 'pt', 'pc', 'px', '%'],
    densities: {
        m: 0.0254,
        mm: 25.4,
        cm: 2.54,
        pt: 72,
        pc: 6
    },

    initialize:function(value, unit, index) {
        this.value = parseFloat(value);
        this.unit = unit || null;
        this.index = index;
    },

    ev: function (env) {
        if (this.unit && !_.contains(this.all_units, this.unit)) {
            env.error({
                message: "Invalid unit: '" + this.unit + "'",
                index: this.index
            });
            return { is: 'undefined', value: 'undefined' };
        }

        // normalize units which are not px or %
        if (this.unit && _.contains(this.physical_units, this.unit)) {
            if (!env.ppi) {
                env.error({
                    message: "ppi is not set, so metric units can't be used",
                    index: this.index
                });
                return { is: 'undefined', value: 'undefined' };
            }
            // convert all units to inch
            // convert inch to px using ppi
            this.value = (this.value / this.densities[this.unit]) * env.ppi;
            this.unit = 'px';
        }

        return this;
    },
    toColor: function() {
        return new SuperMap.CartoCSS.Tree.Color([this.value, this.value, this.value]);
    },
    round: function() {
        this.value = Math.round(this.value);
        return this;
    },
    toString: function() {
        return this.value.toString();
    },
    operate: function(env, op, other) {
        if (this.unit === '%' && other.unit !== '%') {
            env.error({
                message: 'If two operands differ, the first must not be %',
                index: this.index
            });
            return {
                is: 'undefined',
                value: 'undefined'
            };
        }

        if (this.unit !== '%' && other.unit === '%') {
            if (op === '*' || op === '/' || op === '%') {
                env.error({
                    message: 'Percent values can only be added or subtracted from other values',
                    index: this.index
                });
                return {
                    is: 'undefined',
                    value: 'undefined'
                };
            }

            return new SuperMap.CartoCSS.Tree.Dimension(SuperMap.CartoCSS.Tree.operate(op,
                this.value, this.value * other.value * 0.01),
                this.unit);
        }

        //here the operands are either the same (% or undefined or px), or one is undefined and the other is px
        return new SuperMap.CartoCSS.Tree.Dimension(SuperMap.CartoCSS.Tree.operate(op, this.value, other.value),
            this.unit || other.unit);
    }
});

SuperMap.CartoCSS.Tree.Element=SuperMap.Class({
    initialize:function(value){
        this.value = value.trim();
        if (this.value[0] === '#') {
            this.type = 'id';
            this.clean = this.value.replace(/^#/, '');
        }
        if (this.value[0] === '.') {
            this.type = 'class';
            this.clean = this.value.replace(/^\./, '');
        }
        if (this.value.indexOf('*') !== -1) {
            this.type = 'wildcard';
        }
    },

    specificity : function() {
        return [
            (this.type === 'id') ? 1 : 0, // a
            (this.type === 'class') ? 1 : 0  // b
        ];
    },

    toString : function() {
        return this.value;
    }
});

SuperMap.CartoCSS.Tree.Expression=SuperMap.Class({
    is: 'expression',
    initialize:function(value) {
        this.value = value;
    },
    ev: function(env) {
        if (this.value.length > 1) {
            return new SuperMap.CartoCSS.Tree.Expression(this.value.map(function(e) {
                return e.ev(env);
            }));
        } else {
            return this.value[0].ev(env);
        }
    },

    toString: function(env) {
        return this.value.map(function(e) {
            return e.toString(env);
        }).join(' ');
    }
});

SuperMap.CartoCSS.Tree.Field=SuperMap.Class({
    is: 'field',
    initialize:function (content) {
        this.value = content || '';
    },
    toString: function() {
        return '["' + this.value.toUpperCase() + '"]';
    },
    'ev': function() {
        return this;
    }
});

SuperMap.CartoCSS.Tree.Filter=SuperMap.Class({
    initialize:function(key, op, val, index, filename) {
        this.key = key;
        this.op = op;
        this.val = val;
        this.index = index;
        this.filename = filename;

        this.id = this.key + this.op + this.val;
    },

    ops : {
        '<': [' &lt; ', 'numeric'],
        '>': [' &gt; ', 'numeric'],
        '=': [' = ', 'both'],
        '!=': [' != ', 'both'],
        '<=': [' &lt;= ', 'numeric'],
        '>=': [' &gt;= ', 'numeric'],
        '=~': ['.match(', 'string', ')']
    },

    ev : function(env) {
        this.key = this.key.ev(env);
        this.val = this.val.ev(env);
        return this;
    },

    toXML : function(env) {
        if (SuperMap.CartoCSS.Tree.Reference.data.filter) {
            if (this.key.is === 'keyword' && -1 === SuperMap.CartoCSS.Tree.Reference.data.filter.value.indexOf(this.key.toString())) {
                env.error({
                    message: this.key.toString() + ' is not a valid keyword in a filter expression',
                    index: this.index,
                    filename: this.filename
                });
            }
            if (this.val.is === 'keyword' && -1 === SuperMap.CartoCSS.Tree.Reference.data.filter.value.indexOf(this.val.toString())) {
                env.error({
                    message: this.val.toString() + ' is not a valid keyword in a filter expression',
                    index: this.index,
                    filename: this.filename
                });
            }
        }
        var key = this.key.toString(false);
        var val = this.val.toString(this.val.is == 'string');

        if (
            (this.ops[this.op][1] === 'numeric' && isNaN(val) && this.val.is !== 'field') ||
                (this.ops[this.op][1] === 'string' && (val)[0] != "'")
            ) {
            env.error({
                message: 'Cannot use operator "' + this.op + '" with value ' + this.val,
                index: this.index,
                filename: this.filename
            });
        }

        return key + this.ops[this.op][0] + val + (this.ops[this.op][2] || '');
    },

    toString : function() {
        return '[' + this.id + ']';
    }
});

SuperMap.CartoCSS.Tree.Filterset=SuperMap.Class({
    initialize:function(){
        this.filters = {};
    },

    toXML : function(env) {
        var filters = [];
        for (var id in this.filters) {
            filters.push('(' + this.filters[id].toXML(env).trim() + ')');
        }
        if (filters.length) {
            return '    <Filter>' + filters.join(' and ') + '</Filter>\n';
        } else {
            return '';
        }
    },

    toJS:function(env) {
        function eachFilter(filter) {
            var op = filter.op;
            if(op === "=") {
                op = "==";
            }
            var val = filter.val;
            if(filter._val !== undefined) {
                val = filter._val.toString(true);
            }

            //对scale进行特殊处理，将值转换成数值
            if(filter.key && filter.key.value === 'scale'){
                val = +val;
            }else if(typeof val === 'string' || typeof val === 'object'){
                val = "'"+ val + "'";
            }
            var attrs = "attributes";
            return attrs + "&&" +attrs + filter.key  + "&&" +attrs + filter.key  +" " + op  + val;
        };
        var results=[];
        for(var id in this.filters){
            results.push(eachFilter(this.filters[id]));
        }
        return results.join(' && ');
    },

    toString : function() {
        var arr = [];
        for (var id in this.filters) arr.push(this.filters[id].id);
        return arr.sort().join('\t');
    },

    ev : function(env) {
        for (var i in this.filters) {
            this.filters[i].ev(env);
        }
        return this;
    },

    clone : function() {
        var clone = new SuperMap.CartoCSS.Tree.Filterset();
        for (var id in this.filters) {
            clone.filters[id] = this.filters[id];
        }
        return clone;
    },

    cloneWith : function(other) {
        var additions = [];
        for (var id in other.filters) {
            var status = this.addable(other.filters[id]);
            // status is true, false or null. if it's null we don't fail this
            // clone nor do we add the filter.
            if (status === false) {
                return false;
            }
            if (status === true) {
                // Adding the filter will override another value.
                additions.push(other.filters[id]);
            }
        }

        // Adding the other filters doesn't make this filterset invalid, but it
        // doesn't add anything to it either.
        if (!additions.length) {
            return null;
        }

        // We can successfully add all filters. Now clone the filterset and add the
        // new rules.
        var clone = new SuperMap.CartoCSS.Tree.Filterset();

        // We can add the rules that are already present without going through the
        // add function as a Filterset is always in it's simplest canonical form.
        for (id in this.filters) {
            clone.filters[id] = this.filters[id];
        }

        // Only add new filters that actually change the filter.
        while (id = additions.shift()) {
            clone.add(id);
        }

        return clone;
    },

    addable : function(filter) {
        var key = filter.key.toString(),
            value = filter.val.toString();

        if (value.match(/^[0-9]+(\.[0-9]*)?$/)) value = parseFloat(value);

        switch (filter.op) {
            case '=':
                // if there is already foo= and we're adding foo=
                if (this.filters[key + '='] !== undefined) {
                    if (this.filters[key + '='].val.toString() != value) {
                        return false;
                    } else {
                        return null;
                    }
                }
                if (this.filters[key + '!=' + value] !== undefined) return false;
                if (this.filters[key + '>'] !== undefined && this.filters[key + '>'].val >= value) return false;
                if (this.filters[key + '<'] !== undefined && this.filters[key + '<'].val <= value) return false;
                if (this.filters[key + '>='] !== undefined  && this.filters[key + '>='].val > value) return false;
                if (this.filters[key + '<='] !== undefined  && this.filters[key + '<='].val < value) return false;
                return true;

            case '=~':
                return true;

            case '!=':
                if (this.filters[key + '='] !== undefined) return (this.filters[key + '='].val === value) ? false : null;
                if (this.filters[key + '!=' + value] !== undefined) return null;
                if (this.filters[key + '>'] !== undefined && this.filters[key + '>'].val >= value) return null;
                if (this.filters[key + '<'] !== undefined && this.filters[key + '<'].val <= value) return null;
                if (this.filters[key + '>='] !== undefined && this.filters[key + '>='].val > value) return null;
                if (this.filters[key + '<='] !== undefined && this.filters[key + '<='].val < value) return null;
                return true;

            case '>':
                if (key + '=' in this.filters) {
                    if (this.filters[key + '='].val <= value) {
                        return false;
                    } else {
                        return null;
                    }
                }
                if (this.filters[key + '<'] !== undefined && this.filters[key + '<'].val <= value) return false;
                if (this.filters[key + '<='] !== undefined  && this.filters[key + '<='].val <= value) return false;
                if (this.filters[key + '>'] !== undefined && this.filters[key + '>'].val >= value) return null;
                if (this.filters[key + '>='] !== undefined  && this.filters[key + '>='].val > value) return null;
                return true;

            case '>=':
                if (this.filters[key + '=' ] !== undefined) return (this.filters[key + '='].val < value) ? false : null;
                if (this.filters[key + '<' ] !== undefined && this.filters[key + '<'].val <= value) return false;
                if (this.filters[key + '<='] !== undefined && this.filters[key + '<='].val < value) return false;
                if (this.filters[key + '>' ] !== undefined && this.filters[key + '>'].val >= value) return null;
                if (this.filters[key + '>='] !== undefined && this.filters[key + '>='].val >= value) return null;
                return true;

            case '<':
                if (this.filters[key + '=' ] !== undefined) return (this.filters[key + '='].val >= value) ? false : null;
                if (this.filters[key + '>' ] !== undefined && this.filters[key + '>'].val >= value) return false;
                if (this.filters[key + '>='] !== undefined && this.filters[key + '>='].val >= value) return false;
                if (this.filters[key + '<' ] !== undefined && this.filters[key + '<'].val <= value) return null;
                if (this.filters[key + '<='] !== undefined && this.filters[key + '<='].val < value) return null;
                return true;

            case '<=':
                if (this.filters[key + '=' ] !== undefined) return (this.filters[key + '='].val > value) ? false : null;
                if (this.filters[key + '>' ] !== undefined && this.filters[key + '>'].val >= value) return false;
                if (this.filters[key + '>='] !== undefined && this.filters[key + '>='].val > value) return false;
                if (this.filters[key + '<' ] !== undefined && this.filters[key + '<'].val <= value) return null;
                if (this.filters[key + '<='] !== undefined && this.filters[key + '<='].val <= value) return null;
                return true;
        }
    },

    conflict : function(filter) {
        var key = filter.key.toString(),
            value = filter.val.toString();

        if (!isNaN(parseFloat(value))) value = parseFloat(value);

        // if (a=b) && (a=c)
        // if (a=b) && (a!=b)
        // or (a!=b) && (a=b)
        if ((filter.op === '=' && this.filters[key + '='] !== undefined &&
            value != this.filters[key + '='].val.toString()) ||
            (filter.op === '!=' && this.filters[key + '='] !== undefined &&
                value == this.filters[key + '='].val.toString()) ||
            (filter.op === '=' && this.filters[key + '!='] !== undefined &&
                value === this.filters[key + '!='].val.toString())) {
            return filter.toString() + ' added to ' + this.toString() + ' produces an invalid filter';
        }

        return false;
    },

    add : function(filter, env) {
        var key = filter.key.toString(),
            id,
            op = filter.op,
            conflict = this.conflict(filter),
            numval;

        if (conflict) return conflict;

        if (op === '=') {
            for (var i in this.filters) {
                if (this.filters[i].key === key) delete this.filters[i];
            }
            this.filters[key + '='] = filter;
        } else if (op === '!=') {
            this.filters[key + '!=' + filter.val] = filter;
        } else if (op === '=~') {
            this.filters[key + '=~' + filter.val] = filter;
        } else if (op === '>') {
            // If there are other filters that are also >
            // but are less than this one, they don't matter, so
            // remove them.
            for (var j in this.filters) {
                if (this.filters[j].key === key && this.filters[j].val <= filter.val) {
                    delete this.filters[j];
                }
            }
            this.filters[key + '>'] = filter;
        } else if (op === '>=') {
            for (var k in this.filters) {
                numval = (+this.filters[k].val.toString());
                if (this.filters[k].key === key && numval < filter.val) {
                    delete this.filters[k];
                }
            }
            if (this.filters[key + '!=' + filter.val] !== undefined) {
                delete this.filters[key + '!=' + filter.val];
                filter.op = '>';
                this.filters[key + '>'] = filter;
            }
            else {
                this.filters[key + '>='] = filter;
            }
        } else if (op === '<') {
            for (var l in this.filters) {
                numval = (+this.filters[l].val.toString());
                if (this.filters[l].key === key && numval >= filter.val) {
                    delete this.filters[l];
                }
            }
            this.filters[key + '<'] = filter;
        } else if (op === '<=') {
            for (var m in this.filters) {
                numval = (+this.filters[m].val.toString());
                if (this.filters[m].key === key && numval > filter.val) {
                    delete this.filters[m];
                }
            }
            if (this.filters[key + '!=' + filter.val] !== undefined) {
                delete this.filters[key + '!=' + filter.val];
                filter.op = '<';
                this.filters[key + '<'] = filter;
            }
            else {
                this.filters[key + '<='] = filter;
            }
        }
    }
});

SuperMap.CartoCSS.Tree.Fontset=SuperMap.Class({
    initialize:function(env, fonts) {
        this.fonts = fonts;
        this.name = 'fontset-' + env.effects.length;
    },
    toXML : function(env) {
        return '<FontSet name="' +
            this.name +
            '">\n' +
            this.fonts.map(function(f) {
                return '  <Font face-name="' + f +'"/>';
            }).join('\n') +
            '\n</FontSet>';
    }
});

SuperMap.CartoCSS.Tree.Imagefilter=SuperMap.Class({
    is: 'imagefilter',
    initialize:function(filter, args) {
        this.filter = filter;
        this.args = args || null;
    },

    ev: function() { return this; },

    toString: function() {
        if (this.args) {
            return this.filter + '(' + this.args.join(',') + ')';
        } else {
            return this.filter;
        }
    }
});

SuperMap.CartoCSS.Tree.Invalid=SuperMap.Class({
    is : 'invalid',
    initialize:function(chunk, index, message) {
        this.chunk = chunk;
        this.index = index;
        this.type = 'syntax';
        this.message = message || "Invalid code: " + this.chunk;
    },
    ev : function(env) {
        env.error({
            chunk: this.chunk,
            index: this.index,
            type: 'syntax',
            message: this.message || "Invalid code: " + this.chunk
        });
        return {
            is: 'undefined'
        };
    }
});

SuperMap.CartoCSS.Tree.Keyword=SuperMap.Class({
    ev: function() { return this; },
    initialize:function(value) {
        this.value = value;
        var special = {
            'transparent': 'color',
            'true': 'boolean',
            'false': 'boolean'
        };
        this.is = special[value] ? special[value] : 'keyword';
    },
    toString: function() { return this.value; }
});

/*Layer:SuperMap.Class(),*/

SuperMap.CartoCSS.Tree.Literal=SuperMap.Class({
    initialize:function(content) {
        this.value = content || '';
        this.is = 'field';
    },
    toString: function() {
        return this.value;
    },
    'ev': function() {
        return this;
    }
});

SuperMap.CartoCSS.Tree.Operation=SuperMap.Class({
    is : 'operation',
    initialize:function(op, operands, index) {
        this.op = op.trim();
        this.operands = operands;
        this.index = index;
    },
    ev : function(env) {
        var a = this.operands[0].ev(env),
            b = this.operands[1].ev(env),
            temp;

        if (a.is === 'undefined' || b.is === 'undefined') {
            return {
                is: 'undefined',
                value: 'undefined'
            };
        }

        if (a instanceof SuperMap.CartoCSS.Tree.Dimension && b instanceof SuperMap.CartoCSS.Tree.Color) {
            if (this.op === '*' || this.op === '+') {
                temp = b, b = a, a = temp;
            } else {
                env.error({
                    name: "OperationError",
                    message: "Can't substract or divide a color from a number",
                    index: this.index
                });
            }
        }

        // Only concatenate plain strings, because this is easily
        // pre-processed
        if (a instanceof SuperMap.CartoCSS.Tree.Quoted && b instanceof SuperMap.CartoCSS.Tree.Quoted && this.op !== '+') {
            env.error({
                message: "Can't subtract, divide, or multiply strings.",
                index: this.index,
                type: 'runtime',
                filename: this.filename
            });
            return {
                is: 'undefined',
                value: 'undefined'
            };
        }

        // Fields, literals, dimensions, and quoted strings can be combined.
        if (a instanceof SuperMap.CartoCSS.Tree.Field || b instanceof SuperMap.CartoCSS.Tree.Field ||
            a instanceof SuperMap.CartoCSS.Tree.Literal || b instanceof SuperMap.CartoCSS.Tree.Literal) {
            if (a.is === 'color' || b.is === 'color') {
                env.error({
                    message: "Can't subtract, divide, or multiply colors in expressions.",
                    index: this.index,
                    type: 'runtime',
                    filename: this.filename
                });
                return {
                    is: 'undefined',
                    value: 'undefined'
                };
            } else {
                return new SuperMap.CartoCSS.Tree.Literal(a.ev(env).toString(true) + this.op + b.ev(env).toString(true));
            }
        }

        if (a.operate === undefined) {
            env.error({
                message: 'Cannot do math with type ' + a.is + '.',
                index: this.index,
                type: 'runtime',
                filename: this.filename
            });
            return {
                is: 'undefined',
                value: 'undefined'
            };
        }

        return a.operate(env, this.op, b);
    }
});

SuperMap.CartoCSS.Tree.Quoted=SuperMap.Class({
    is: 'string',
    initialize:function(content) {
        this.value = content || '';
    },
    toString: function(quotes) {
        var escapedValue = this.value
            .replace(/&/g, '&amp;')
        var xmlvalue = escapedValue
            .replace(/\'/g, '\\\'')
            .replace(/\"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/\>/g, '&gt;');
        return (quotes === true) ? "'" + xmlvalue + "'" : escapedValue;
    },

    'ev': function() {
        return this;
    },

    operate: function(env, op, other) {
        return new SuperMap.CartoCSS.Tree.Quoted(SuperMap.CartoCSS.Tree.operate(op, this.toString(), other.toString(this.contains_field)));
    }
});

SuperMap.CartoCSS.Tree.Reference={
    _validateValue:{
        'font': function(env, value) {
            if (env.validation_data && env.validation_data.fonts) {
                return env.validation_data.fonts.indexOf(value) != -1;
            } else {
                return true;
            }
        }
    },
    setData : function(data) {
        this.data = data;
        this.selector_cache = generateSelectorCache(data);
        this.mapnikFunctions = generateMapnikFunctions(data);
        this.required_cache = generateRequiredProperties(data);

        function generateSelectorCache(data) {
            var index = {};
            for (var i in data.symbolizers) {
                for (var j in data.symbolizers[i]) {
                    if (data.symbolizers[i][j].hasOwnProperty('css')) {
                        index[data.symbolizers[i][j].css] = [data.symbolizers[i][j], i, j];
                    }
                }
            }
            return index;
        }

        function generateMapnikFunctions(data) {
            var functions = {};
            for (var i in data.symbolizers) {
                for (var j in data.symbolizers[i]) {
                    if (data.symbolizers[i][j].type === 'functions') {
                        for (var k = 0; k < data.symbolizers[i][j].functions.length; k++) {
                            var fn = data.symbolizers[i][j].functions[k];
                            functions[fn[0]] = fn[1];
                        }
                    }
                }
            }
            return functions;
        }

        function generateRequiredProperties(data) {
            var cache = {};
            for (var symbolizer_name in data.symbolizers) {
                cache[symbolizer_name] = [];
                for (var j in data.symbolizers[symbolizer_name]) {
                    if (data.symbolizers[symbolizer_name][j].required) {
                        cache[symbolizer_name].push(data.symbolizers[symbolizer_name][j].css);
                    }
                }
            }
            return cache;
        }
    },
    setVersion : function(version) {
        if (SuperMap.CartoCSS.mapnik_reference.version.hasOwnProperty(version)) {
            this.setData(SuperMap.CartoCSS.mapnik_reference.version[version]);
            return true;
        } else {
            return false;
        }
        return false;
    },
    selectorData : function(selector, i) {
        if (this.selector_cache&&this.selector_cache[selector]) return this.selector_cache[selector][i];
    },
    validSelector : function(selector) {
        return !!this.selector_cache[selector];
    },
    selectorName : function(selector) {
        return this.selectorData(selector, 2);
    },
    selector : function(selector) {
        return this.selectorData(selector, 0);
    },
    symbolizer : function(selector) {
        return this.selectorData(selector, 1);
    },
    requiredProperties : function(symbolizer_name, rules) {
        var req = this.required_cache[symbolizer_name];
        for (var i in req) {
            if (!(req[i] in rules)) {
                return 'Property ' + req[i] + ' required for defining ' +
                    symbolizer_name + ' styles.';
            }
        }
    },
    isFont : function(selector) {
        return this.selector(selector).validate === 'font';
    },
    editDistance : function(a, b){
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        var matrix = [];
        for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
        for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i-1) === a.charAt(j-1)) {
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                        Math.min(matrix[i][j-1] + 1, // insertion
                            matrix[i-1][j] + 1)); // deletion
                }
            }
        }
        return matrix[b.length][a.length];
    },
    validValue : function(env, selector, value) {
        function validateFunctions(value, selector) {
            if (value.value[0].is === 'string') return true;
            for (var i in value.value) {
                for (var j in value.value[i].value) {
                    if (value.value[i].value[j].is !== 'call') return false;
                    var f = _.find(this.selector(selector).functions, function(x) {
                        return x[0] === value.value[i].value[j].name;
                    });
                    if (!(f && f[1] === -1)) {
                        // This filter is unknown or given an incorrect number of arguments
                        if (!f || f[1] !== value.value[i].value[j].args.length) return false;
                    }
                }
            }
            return true;
        }

        function validateKeyword(value, selector) {
            if (typeof this.selector(selector).type === 'object') {
                return this.selector(selector).type
                    .indexOf(value.value[0].value) !== -1;
            } else {
                // allow unquoted keywords as strings
                return this.selector(selector).type === 'string';
            }
        }
        var i, j;
        if (!this.selector(selector)) {
            return false;
        } else if (value.value[0].is === 'keyword') {
            return validateKeyword(value, selector);
        } else if (value.value[0].is === 'undefined') {
            // caught earlier in the chain - ignore here so that
            // error is not overridden
            return true;
        } else if (this.selector(selector).type === 'numbers') {
            for (i in value.value) {
                if (value.value[i].is !== 'float') {
                    return false;
                }
            }
            return true;
        } else if (this.selector(selector).type === 'tags') {
            if (!value.value) return false;
            if (!value.value[0].value) {
                return value.value[0].is === 'tag';
            }
            for (i = 0; i < value.value[0].value.length; i++) {
                if (value.value[0].value[i].is !== 'tag') return false;
            }
            return true;
        } else if (this.selector(selector).type == 'functions') {
            // For backwards compatibility, you can specify a string for `functions`-compatible
            // values, though they will not be validated.
            return validateFunctions(value, selector);
        } else if (this.selector(selector).type === 'expression') {
            return true;
        } else if (this.selector(selector).type === 'unsigned') {
            if (value.value[0].is === 'float') {
                value.value[0].round();
                return true;
            } else {
                return false;
            }
        } else {
            if (this.selector(selector).validate) {
                var valid = false;
                for (i = 0; i < value.value.length; i++) {
                    if (this.selector(selector).type === value.value[i].is &&
                        this._validateValue[this.selector(selector).validate](env, value.value[i].value)) {
                        return true;
                    }
                }
                return valid;
            } else {
                return this.selector(selector).type === value.value[0].is;
            }
        }
    }
};
SuperMap.CartoCSS.Tree.Reference.setVersion("latest");

SuperMap.CartoCSS.Tree.Rule=SuperMap.Class({
    is : 'rule',
    initialize:function(name, value, index, filename) {
        var parts = name.split('/');
        this.name = parts.pop();
        this.instance = parts.length ? parts[0] : '__default__';
        this.value = (value instanceof SuperMap.CartoCSS.Tree.Value) ?
            value : new SuperMap.CartoCSS.Tree.Value([value]);
        this.index = index;
        this.symbolizer = SuperMap.CartoCSS.Tree.Reference.symbolizer(this.name);
        this.filename = filename;
        this.variable = (name.charAt(0) === '@');
    },
    clone : function() {
        var clone = Object.create(SuperMap.CartoCSS.Tree.Rule.prototype);
        clone.name = this.name;
        clone.value = this.value;
        clone.index = this.index;
        clone.instance = this.instance;
        clone.symbolizer = this.symbolizer;
        clone.filename = this.filename;
        clone.variable = this.variable;
        return clone;
    },
    updateID : function() {
        return this.id = this.zoom + '#' + this.instance + '#' + this.name;
    },
    toString : function() {
        return '[' + SuperMap.CartoCSS.Tree.Zoom.toString(this.zoom) + '] ' + this.name + ': ' + this.value;
    },
    toXML : function(env, content, sep, format) {
        if (!SuperMap.CartoCSS.Tree.Reference.validSelector(this.name)) {
            function getMean(name) {
                return Object.keys(SuperMap.CartoCSS.Tree.Reference.selector_cache).map(function(f) {
                    return [f, SuperMap.CartoCSS.Tree.Reference.editDistance(name, f)];
                }).sort(function(a, b) { return a[1] - b[1]; });
            }
            var mean = getMean(this.name);
            var mean_message = '';
            if (mean[0][1] < 3) {
                mean_message = '. Did you mean ' + mean[0][0] + '?';
            }
            return env.error({
                message: "Unrecognized rule: " + this.name + mean_message,
                index: this.index,
                type: 'syntax',
                filename: this.filename
            });
        }

        if ((this.value instanceof SuperMap.CartoCSS.Tree.Value) &&
            !SuperMap.CartoCSS.Tree.Reference.validValue(env, this.name, this.value)) {
            if (!SuperMap.CartoCSS.Tree.Reference.selector(this.name)) {
                return env.error({
                    message: 'Unrecognized property: ' +
                        this.name,
                    index: this.index,
                    type: 'syntax',
                    filename: this.filename
                });
            } else {
                var typename;
                if (SuperMap.CartoCSS.Tree.Reference.selector(this.name).validate) {
                    typename = SuperMap.CartoCSS.Tree.Reference.selector(this.name).validate;
                } else if (typeof SuperMap.CartoCSS.Tree.Reference.selector(this.name).type === 'object') {
                    typename = 'keyword (options: ' + SuperMap.CartoCSS.Tree.Reference.selector(this.name).type.join(', ') + ')';
                } else {
                    typename = SuperMap.CartoCSS.Tree.Reference.selector(this.name).type;
                }
                return env.error({
                    message: 'Invalid value for ' +
                        this.name +
                        ', the type ' + typename +
                        ' is expected. ' + this.value +
                        ' (of type ' + this.value.value[0].is + ') ' +
                        ' was given.',
                    index: this.index,
                    type: 'syntax',
                    filename: this.filename
                });
            }
        }

        if (this.variable) {
            return '';
        } else if (SuperMap.CartoCSS.Tree.Reference.isFont(this.name) && this.value.value.length > 1) {
            var f = SuperMap.CartoCSS.Tree._getFontSet(env, this.value.value);
            return 'fontset-name="' + f.name + '"';
        } else if (content) {
            return this.value.toString(env, this.name, sep);
        } else {
            return SuperMap.CartoCSS.Tree.Reference.selectorName(this.name) +
                '="' +
                this.value.toString(env, this.name) +
                '"';
        }
    },
    ev : function(context) {
        return new SuperMap.CartoCSS.Tree.Rule(this.name,
            this.value.ev(context),
            this.index,
            this.filename);
    }
});

SuperMap.CartoCSS.Tree.Ruleset=SuperMap.Class({
    is: 'ruleset',
    initialize:function(selectors, rules) {
        this.selectors = selectors;
        this.rules = rules;
        // static cache of find() function
        this._lookups = {};
    },
    'ev': function(env) {
        var i,
            rule,
            ruleset = new SuperMap.CartoCSS.Tree.Ruleset(this.selectors, this.rules.slice(0));
        ruleset.root = this.root;

        // push the current ruleset to the frames stack
        env.frames.unshift(ruleset);

        // Evaluate everything else
        for (i = 0, rule; i < ruleset.rules.length; i++) {
            rule = ruleset.rules[i];
            ruleset.rules[i] = rule.ev ? rule.ev(env) : rule;
        }

        // Pop the stack
        env.frames.shift();

        return ruleset;
    },
    match: function(args) {
        return !args || args.length === 0;
    },
    variables: function() {
        if (this._variables) { return this._variables; }
        else {
            return this._variables = this.rules.reduce(function(hash, r) {
                if (r instanceof SuperMap.CartoCSS.Tree.Rule && r.variable === true) {
                    hash[r.name] = r;
                }
                return hash;
            }, {});
        }
    },
    variable: function(name) {
        return this.variables()[name];
    },
    rulesets: function() {
        if (this._rulesets) { return this._rulesets; }
        else {
            return this._rulesets = this.rules.filter(function(r) {
                return (r instanceof SuperMap.CartoCSS.Tree.Ruleset);
            });
        }
    },
    find: function(selector, self) {
        self = self || this;
        var rules = [], rule, match,
            key = selector.toString();

        if (key in this._lookups) { return this._lookups[key]; }

        this.rulesets().forEach(function(rule) {
            if (rule !== self) {
                for (var j = 0; j < rule.selectors.length; j++) {
                    match = selector.match(rule.selectors[j]);
                    if (match) {
                        if (selector.elements.length > 1) {
                            Array.prototype.push.apply(rules, rule.find(
                                new SuperMap.CartoCSS.Tree.Selector(null, null, selector.elements.slice(1)), self));
                        } else {
                            rules.push(rule);
                        }
                        break;
                    }
                }
            }
        });
        return this._lookups[key] = rules;
    },
    // Zooms can use variables. This replaces SuperMap.CartoCSS.Tree.Zoom objects on selectors
    // with simple bit-arrays that we can compare easily.
    evZooms: function(env) {
        for (var i = 0; i < this.selectors.length; i++) {
            var zval = SuperMap.CartoCSS.Tree.Zoom.all;
            for (var z = 0; z < this.selectors[i].zoom.length; z++) {
                zval =  this.selectors[i].zoom[z].ev(env).zoom;
            }
            this.selectors[i].zoom = zval;
        }
    },
    flatten: function(result, parents, env) {
        var selectors = [], i, j;
        if (this.selectors.length === 0) {
            env.frames = env.frames.concat(this.rules);
        }
        // evaluate zoom variables on this object.
        this.evZooms(env);
        for (i = 0; i < this.selectors.length; i++) {
            var child = this.selectors[i];

            if (!child.filters) {
                // This is an invalid filterset.
                continue;
            }

            if (parents.length) {
                for (j = 0; j < parents.length; j++) {
                    var parent = parents[j];

                    var mergedFilters = parent.filters.cloneWith(child.filters);
                    if (mergedFilters === null) {
                        // Filters could be added, but they didn't change the
                        // filters. This means that we only have to clone when
                        // the zoom levels or the attachment is different too.
                        if (parent.zoom === child.zoom &&
                            parent.attachment === child.attachment &&
                            parent.elements.join() === child.elements.join()) {
                            selectors.push(parent);
                            continue;
                        } else {
                            mergedFilters = parent.filters;
                        }
                    } else if (!mergedFilters) {
                        // The merged filters are invalid, that means we don't
                        // have to clone.
                        continue;
                    }

                    var clone = Object.create(SuperMap.CartoCSS.Tree.Selector.prototype);
                    clone.filters = mergedFilters;
                    clone.zoom = child.zoom;
                    clone.elements = parent.elements.concat(child.elements);
                    if (parent.attachment && child.attachment) {
                        clone.attachment = parent.attachment + '/' + child.attachment;
                    }
                    else clone.attachment = child.attachment || parent.attachment;
                    clone.conditions = parent.conditions + child.conditions;
                    clone.index = child.index;
                    selectors.push(clone);
                }
            } else {
                selectors.push(child);
            }
        }

        var rules = [];
        for (i = 0; i < this.rules.length; i++) {
            var rule = this.rules[i];

            // Recursively flatten any nested rulesets
            if (rule instanceof SuperMap.CartoCSS.Tree.Ruleset) {
                rule.flatten(result, selectors, env);
            } else if (rule instanceof SuperMap.CartoCSS.Tree.Rule) {
                rules.push(rule);
            } else if (rule instanceof SuperMap.CartoCSS.Tree.Invalid) {
                env.error(rule);
            }
        }

        var index = rules.length ? rules[0].index : false;
        for (i = 0; i < selectors.length; i++) {
            // For specificity sort, use the position of the first rule to allow
            // defining attachments that are under current element as a descendant
            // selector.
            if (index !== false) {
                selectors[i].index = index;
            }
            result.push(new SuperMap.CartoCSS.Tree.Definition(selectors[i], rules.slice()));
        }

        return result;
    }
});

SuperMap.CartoCSS.Tree.Selector=SuperMap.Class({
    initialize:function(filters, zoom, elements, attachment, conditions, index) {
        this.elements = elements || [];
        this.attachment = attachment;
        this.filters = filters || {};
        this.zoom = typeof zoom !== 'undefined' ? zoom : SuperMap.CartoCSS.Tree.Zoom.all;
        this.conditions = conditions;
        this.index = index;
    },
    specificity : function() {
        return this.elements.reduce(function(memo, e) {
            var spec = e.specificity();
            memo[0] += spec[0];
            memo[1] += spec[1];
            return memo;
        }, [0, 0, this.conditions, this.index]);
    }
});

/*style:SuperMap.Class(),*/

SuperMap.CartoCSS.Tree.URL=SuperMap.Class({
    is: 'uri',
    initialize:function(val, paths) {
        this.value = val;
        this.paths = paths;
    },
    toString: function() {
        return this.value.toString();
    },
    ev: function(ctx) {
        return new SuperMap.CartoCSS.Tree.URL(this.value.ev(ctx), this.paths);
    }
});

SuperMap.CartoCSS.Tree.Value=SuperMap.Class({
    is: 'value',
    initialize:function(value) {
        this.value = value;
    },
    ev: function(env) {
        if (this.value.length === 1) {
            return this.value[0].ev(env);
        } else {
            return new SuperMap.CartoCSS.Tree.Value(this.value.map(function(v) {
                return v.ev(env);
            }));
        }
    },
    toJS : function(env) {
        //var v = this.value[0].value[0];
        var val = this.ev(env);
        var v = val.toString();
        if(val.is === "color" || val.is === 'uri' || val.is === 'string' || val.is === 'keyword') {
            v = "'" + v + "'";
        } else if (val.is === 'field') {
            // replace [varuable] by ctx['variable']
            v = v.replace(/\[(.*)\]/g, "attributes['\$1']")
        }
       else if(val.value && typeof val.value ==="object"){
            v="["+v+"]";
        }

        return "_value = " + v + ";";
    },
    toString: function(env, selector, sep, format) {
        return this.value.map(function(e) {
            return e.toString(env, format);
        }).join(sep || ', ');
    },
    clone: function() {
        var obj = Object.create(SuperMap.CartoCSS.Tree.Value.prototype);
        if (Array.isArray(obj)) obj.value = this.value.slice();
        else obj.value = this.value;
        obj.is = this.is;
        return obj;
    }
});

SuperMap.CartoCSS.Tree.Variable=SuperMap.Class({
    is: 'variable',
    initialize:function(name, index, filename) {
        this.name = name;
        this.index = index;
        this.filename = filename;
    },
    toString: function() {
        return this.name;
    },
    ev: function(env) {
        var variable,
            v,
            name = this.name;

        if (this._css) return this._css;

        var thisframe = env.frames.filter(function(f) {
            return f.name === this.name;
        }.bind(this));
        if (thisframe.length) {
            return thisframe[0].value.ev(env);
        } else {
            env.error({
                message: 'variable ' + this.name + ' is undefined',
                index: this.index,
                type: 'runtime',
                filename: this.filename
            });
            return {
                is: 'undefined',
                value: 'undefined'
            };
        }
    }
});

SuperMap.CartoCSS.Tree.Zoom=SuperMap.Class({
    initialize:function(op, value, index) {
        this.op = op;
        this.value = value;
        this.index = index;
    },
    setZoom : function(zoom) {
        this.zoom = zoom;
        return this;
    },
    ev : function(env) {
        var start = 0,
            end = Infinity,
            value = parseInt(this.value.ev(env).toString(), 10),
            zoom = 0;

        if (value > SuperMap.CartoCSS.Tree.Zoom.maxZoom || value < 0) {
            env.error({
                message: 'Only zoom levels between 0 and ' +
                    SuperMap.CartoCSS.Tree.Zoom.maxZoom + ' supported.',
                index: this.index
            });
        }

        switch (this.op) {
            case '=':
                this.zoom="zoom && zoom === "+value;
                return this;
            case '>':
                this.zoom="zoom && zoom > "+value;
                break;
            case '>=':
                this.zoom="zoom && zoom >= "+value;
                break;
            case '<':
                this.zoom="zoom && zoom < "+value;
                break;
            case '<=':
                this.zoom="zoom && zoom <= "+value;
                break;
        }
        /*
        for (var i = 0; i <= SuperMap.CartoCSS.Tree.Zoom.maxZoom; i++) {
            if (i >= start && i <= end) {
                zoom |= (1 << i);
            }
        }
        this.zoom = zoom;
        this.zoom=value+this.op+"zoom";*/
        return this;
    },
    toString : function() {
        var str = '';
        for (var i = 0; i <= SuperMap.CartoCSS.Tree.Zoom.maxZoom; i++) {
            str += (this.zoom & (1 << i)) ? 'X' : '.';
        }
        return str;
    },
    toXML : function() {
        var conditions = [];
        if (this.zoom != SuperMap.CartoCSS.Tree.Zoom.all) {
            var start = null, end = null;
            for (var i = 0; i <= SuperMap.CartoCSS.Tree.Zoom.maxZoom; i++) {
                if (this.zoom & (1 << i)) {
                    if (start === null) start = i;
                    end = i;
                }
            }
            if (start > 0) conditions.push('    <MaxScaleDenominator>' +
                SuperMap.CartoCSS.Tree.Zoom.ranges[start] + '</MaxScaleDenominator>\n');
            if (end < 22) conditions.push('    <MinScaleDenominator>' +
                SuperMap.CartoCSS.Tree.Zoom.ranges[end + 1] + '</MinScaleDenominator>\n');
        }
        return conditions;
    }

});

// Covers all zoomlevels from 0 to 22
SuperMap.CartoCSS.Tree.Zoom.all = 23;

SuperMap.CartoCSS.Tree.Zoom.maxZoom = 22;

SuperMap.CartoCSS.Tree.Zoom.ranges = {
    0: 1000000000,
    1: 500000000,
    2: 200000000,
    3: 100000000,
    4: 50000000,
    5: 25000000,
    6: 12500000,
    7: 6500000,
    8: 3000000,
    9: 1500000,
    10: 750000,
    11: 400000,
    12: 200000,
    13: 100000,
    14: 50000,
    15: 25000,
    16: 12500,
    17: 5000,
    18: 2500,
    19: 1500,
    20: 750,
    21: 500,
    22: 250,
    23: 100
};
