const env = require('jsdoc/lib/jsdoc/env');

const globalParams = env.conf.templates;
const moduleconditionNames = [];
const moduleconditionMap = {};
exports.defineTags = function (dictionary) {
  dictionary.defineTag('modulecondition', {
    mustHaveValue: false,
    mustNotHaveDescription: false,
    canHaveType: false,
    canHaveName: false,
    onTagged: function (doclet, tag) {
      if (tag.value) {
        const [modulecondition, value] = tag.value.split(':');
        if (modulecondition === globalParams.moduleName) {
          moduleconditionNames.push(doclet.name);
          moduleconditionMap[doclet.name] = value.split('|');
        }
      }
      doclet.undocumented = true;
    }
  });
};

// 处理类型名称替换，支持普通类型和泛型类型（如 Array.<Name>）
function replaceTypeName(name) {
  // 直接匹配
  if (moduleconditionNames.indexOf(name) >= 0) {
    return moduleconditionMap[name];
  }

  // 检查是否包含泛型形式，如 Array.<Name> 或 Array.<Name|others>
  const genericMatch = name.match(/^(.+?)<(.+)>$/);
  if (genericMatch) {
    const [, prefix, inner] = genericMatch;

    // 去除外层括号 (如果有)
    let cleanInner = inner.trim();
    let hasOuterParens = false;
    if (cleanInner.startsWith('(') && cleanInner.endsWith(')')) {
      cleanInner = cleanInner.substring(1, cleanInner.length - 1);
      hasOuterParens = true;
    }

    const types = cleanInner.split('|').map((t) => t.trim());
    const newTypes = [];
    let hasReplacement = false;

    types.forEach((type) => {
      const trimmedType = type.trim();
      if (moduleconditionNames.indexOf(trimmedType) >= 0) {
        const values = moduleconditionMap[trimmedType];
        if (values && values.length > 0) {
          hasReplacement = true;
          newTypes.push(...values);
        } else {
          newTypes.push(trimmedType);
        }
      } else {
        newTypes.push(trimmedType);
      }
    });

    if (hasReplacement) {
      // 返回单个泛型类型，内部是联合类型，保留原有的括号
      const innerTypes = newTypes.join('|');
      const result = hasOuterParens ? `${prefix}<(${innerTypes})>` : `${prefix}<${innerTypes}>`;
      return [result];
    }
  }

  return null;
}

exports.handlers = {
  newDoclet: function (e) {
    if (moduleconditionNames.length === 0) {
      return;
    }
    // 处理成员类型
    if (e.doclet.kind === 'member') {
      if (!e.doclet.type || !e.doclet.type.names) {
        return;
      }
      // 从后向前遍历，避免在遍历时修改数组导致的问题
      for (let i = e.doclet.type.names.length - 1; i >= 0; i--) {
        const name = e.doclet.type.names[i];
        const replacedValues = replaceTypeName(name);
        if (replacedValues && replacedValues.length > 0) {
          e.doclet.type.names.splice(i, 1, ...replacedValues);
        }
      }
      return;
    }

    // 处理function参数和返回值类型
    const parameters = e.doclet.params;
    if (!parameters) {
      return;
    }

    parameters.forEach((element) => {
      if (!element.type || !element.type.names) {
        return;
      }
      // 从后向前遍历，避免在遍历时修改数组导致的问题
      for (let i = element.type.names.length - 1; i >= 0; i--) {
        const name = element.type.names[i];
        const replacedValues = replaceTypeName(name);
        if (replacedValues && replacedValues.length > 0) {
          element.type.names.splice(i, 1, ...replacedValues);
        }
      }
    });

    const returns = e.doclet.returns;
    if (returns) {
      returns.forEach((element) => {
        if (!element.type || !element.type.names) {
          return;
        }
        // 从后向前遍历，避免在遍历时修改数组导致的问题
        for (let i = element.type.names.length - 1; i >= 0; i--) {
          const name = element.type.names[i];
          const replacedValues = replaceTypeName(name);
          if (replacedValues && replacedValues.length > 0) {
            element.type.names.splice(i, 1, ...replacedValues);
          }
        }
      });
    }
  }
};
