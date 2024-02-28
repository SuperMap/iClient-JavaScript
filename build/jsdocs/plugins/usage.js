const env = require('jsdoc/lib/jsdoc/env');

const globalParams =  env.conf.templates;
exports.defineTags = function (dictionary) {
  dictionary.defineTag('usage', {
    mustHaveValue: false,
    mustNotHaveDescription: false,
    canHaveType: false,
    canHaveName: false,
    onTagged: function (doclet, tag) {
      if (tag.value) {
        doclet.usage = tag.value;
      } else {
        const deprecatedClasses = [];
        let aliasClass = '';
        let deprecatedClassInstance;
        let browserNamespace = '';
        if (doclet.tags) {
          for (let index = 0; index < doclet.tags.length; index++) {
            const tag = doclet.tags[index];
            if (tag.title === 'deprecatedclass') {
              deprecatedClasses.push(tag.value);
            }
            if (tag.title === 'aliasclass') {
              aliasClass = tag.value;
            }
            if (tag.title === 'deprecatedclassinstance') {
              deprecatedClassInstance = tag.value;
            }
            if (tag.title === 'browsernamespace') {
              browserNamespace = tag.value;
            }
          }
        }
        doclet.usage = {
          className: doclet.kind === 'class' ? doclet.name : '',
          aliasClass: aliasClass,
          globalParams,
          deprecatedClasses: deprecatedClasses,
          deprecatedClassInstance: deprecatedClassInstance,
          browserNamespace: browserNamespace
        };
      }
    }
  });
};

exports.handlers = {
  newDoclet: function (e) {
    var usage = e.doclet.usage;
    if (usage && usage.indexOf) {
      for (const key in globalParams) {
        if (Object.hasOwnProperty.call(globalParams, key)) {
          const element = globalParams[key];
          e.doclet.usage = e.doclet.usage.replace(`{${key}}`, element);
        }
      }
    }
  }
};
