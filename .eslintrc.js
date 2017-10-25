module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        //启用 ES6 语法
        "es6": true
    },
    "plugins": ["import"],
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        //启用 ES6 语法
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended"],
    "rules": {
        //8个空格缩进
        "indent": ["off", 8, {"SwitchCase": 1}],
        //禁止不必要的分号
        "no-extra-semi": "warn",
        //强制使用一致的换行风格
        "linebreak-style": ["warn", "windows"],
        //if while function 后面的{必须与if在同一行，java风格。
        "brace-style": ["warn", "1tbs", {"allowSingleLine": true}],
        //数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号
        "comma-dangle": ["error", "never"],
        //不强制规定引号的使用
        "quotes": "off",
        //强制所有控制语句使用一致的括号风格
        "curly": "warn",
        //允许有console输出
        "no-console": "off",
        //禁止多次声明同一变量
        "no-redeclare": "warn",
        //允许出现未使用过的变量
        "no-unused-vars": "warn",
        //不要求在构造函数中有 super() 的调用
        "constructor-super": "off",
        //允许在嵌套的块中出现function声明
        "no-inner-declarations": "off",
        //强制数组方法的回调函数中有 return 语句
        "array-callback-return": "error",
        //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        "no-undef": "error",
        //禁止将标识符定义为受限的名字
        "no-shadow-restricted-names": "error",
        //允许不必要的转义字符
        "no-useless-escape": "off",
        //禁止 case 语句落空
        "no-fallthrough": "warn",
        //禁止直接调用eval()
        "no-eval": ["error", {"allowIndirect": true}],
        //Ensure imports point to a file/module that can be resolved
        "import/no-unresolved": [2, {commonjs: true, amd: true}],
        //Ensure named imports correspond to a named export in the remote file
        "import/named": 2,
        //Ensure a default export is present, given a default import
        "import/default": 2,
        //Restrict which files can be imported in a given folder
        "import/no-restricted-paths": 2,
        //Forbid import of modules using absolute paths
        "import/no-absolute-path": 2,
        //Forbid require() calls with expressions
        "import/no-dynamic-require": 2,
        //Forbid named default exports
        "import/no-named-default": 2,
        //Forbid anonymous values as default exports
        "import/no-anonymous-default-export": 2,
        //Report repeated import of the same module in multiple places
        "import/no-duplicates": 1,
        //Ensure consistent use of file extension within the import path
        "import/extensions": 1,
        //Ensure all imports appear before other statements
        "import/first": 1,
        //Enforce a newline after import statements
        "import/newline-after-import": 1,
        //Prevent importing the submodules of other modules
        "import/no-internal-modules": 0,
        //Forbid unassigned imports
        "import/no-unassigned-import": 0


    },
};