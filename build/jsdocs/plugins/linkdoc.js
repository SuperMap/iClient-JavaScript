'use strict';

var logger = require('jsdoc/util/logger');
var env = require('jsdoc/env');
var typeLinks = require('../template/typeLinkExt').typeLinks;
var parseLink = function (str) {
    if (str && str.indexOf("@link") >= 0) {
        const patt = /{@link (\S*)}/g;
        let result;
        while ((result = patt.exec(str)) != null) {
            const link = result[1];
            if (link && typeLinks[link]) {
                str = str.replace(result[0], "[" + link + "]{@link " + typeLinks[result[1]] + "}");
            }
        }
    }
    return str;
}
exports.handlers = {

    newDoclet: function (e) {
        e.doclet.classdesc = parseLink(e.doclet.classdesc);
        e.doclet.description = parseLink(e.doclet.description);
        if (e.doclet.returns) {
            for (let i = 0; i < e.doclet.returns.length; i++) {
                e.doclet.returns[i].description = parseLink(e.doclet.returns[i].description);
            }
        }
        if (e.doclet.augments) {
            for (let i = 0; i < e.doclet.augments.length; i++) {
                e.doclet.augments[i] = parseLink(e.doclet.augments[i]);
            }
        }
        if (e.doclet.params) {
            for (var i = 0; i < e.doclet.params.length; i++) {
                e.doclet.params[i].description = parseLink(e.doclet.params[i].description);
            }
        }
    }
};