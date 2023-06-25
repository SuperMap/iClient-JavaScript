const env = require('jsdoc/lib/jsdoc/env');

const globalParams =  env.conf.templates;
exports.defineTags = function (dictionary) {
  dictionary.defineTag('modulecategory', {
    mustHaveValue: true,
    mustNotHaveDescription: false,
    canHaveType: false,
    canHaveName: false,
    onTagged: function (doclet, tag) {
      doclet.modulecategory = {
        globalParams,
        category: tag.value,
        name: doclet.name,
        des_en: doclet.name
      };
    }
  });
};

exports.handlers = {
  newDoclet: function (e) {
    const modulecategory = e.doclet.modulecategory;
    if (modulecategory) {
      e.doclet.modulecategory.className = modulecategory.name;
      if (!modulecategory.name.startsWith('SuperMap')) {
        const matchTag = e.doclet.tags.find(tag => tag.title === 'browsernamespace') || {};
        const prefix = matchTag.value || globalParams.namespace;
        e.doclet.modulecategory.name = `${prefix}.${modulecategory.name}`;
      }
      e.doclet.modulecategory.des = (e.doclet.classdesc || '').split('。')[0].replace('<p>', '').replace('类', '');
    }
  }
};
