'use strict';

var logger = require('jsdoc/util/logger');
var env = require('jsdoc/env');
exports.handlers = {
    newDoclet: function (e) {
        if (e.doclet.augments) {
            for (var i = 0; i < e.doclet.augments.length; i++) {
                var a = e.doclet.augments[i];
                if (a.indexOf("@linkdoc")) {
                    var reg = new RegExp("@(linkdoc.*?)/");
                    var match = a.match(reg);
                    if (match) {
                        e.doclet.augments[i] = a.replace("@" + match[1] + "/", env.conf.tags[match[1]]);
                        if (env.conf.tags["linkdoc-htmlExtension"]) {
                            e.doclet.augments[i] = e.doclet.augments[i].replace("}", ".html}");
                        }
                    }

                }
            }
        }
        if (e.doclet.params) {
            for (var i = 0; i < e.doclet.params.length; i++) {
                var a = e.doclet.params[i].description;
                if (a && a.indexOf("@linkdoc")) {
                    var reg = new RegExp("@(linkdoc.*?)/");
                    var match = a.match(reg);
                    if (match) {
                        var str="@" + match[1] + "/";
                        e.doclet.params[i].description = a.replace(new RegExp(str,'g'), "@link "+ env.conf.tags[match[1]]);
                    }
                }
            }
        }
    }
};