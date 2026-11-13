const util = require('node:util');

const compatibilityChecks = {
    isArray: Array.isArray,
    isDate: util.types.isDate,
    isError: util.types.isNativeError,
    isRegExp: util.types.isRegExp
};

for (const [name, check] of Object.entries(compatibilityChecks)) {
    if (typeof util[name] !== 'function') {
        util[name] = check;
    }
}
