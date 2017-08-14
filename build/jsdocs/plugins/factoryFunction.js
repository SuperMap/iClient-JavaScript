'use strict';

var logger = require('jsdoc/util/logger');

exports.handlers = {
    /**
     * Support @source tag. Expected value like:
     *
     *     { "filename": "myfile.js", "lineno": 123 }
     *
     * Modifies the corresponding meta values on the given doclet.
     *
     * WARNING: If you are using a JSDoc template that generates pretty-printed source files,
     * such as JSDoc's default template, this plugin can cause JSDoc to crash. To fix this issue,
     * update your template settings to disable pretty-printed source files.
     *
     * @source { "filename": "sourcetag.js", "lineno": 9 }
     */
    newDoclet: function (e) {
        var longname = e.doclet.longname
        if (longname && longname.indexOf('L.') == 0) {
            e.doclet.isFactoryFunction = true;
        }

    }
};