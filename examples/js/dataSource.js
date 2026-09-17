/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * 示例数据源支持：通过 sample-data cookie 切换示例列表与示例代码的来源目录。
 *
 * 无 cookie：            examples/<产品>/       （默认数据源）
 * sample-data=en：       examples/en/<产品>/    （英文数据源）
 *
 * 用 cookie 而非 url 参数，是因为站点内多处跳转不会带上查询串。
 * 该 cookie 只读，本仓库不写入。
 *
 * 中英文站点（/examples/... 与 /en/examples/...）指向同一份 examples 目录，
 * 因此这里全部使用相对路径，两个站点均可正常解析。
 */
var dataSource = {
    //当前数据源标识，如 "en"。使用默认数据源时为空字符串
    name: "",
    //当前产品名，如 "leaflet"
    product: "",
    //取指定产品配置文件的相对路径
    configUrl: null,
    //按顺序向页面追加各产品的示例配置脚本
    appendConfigs: null,
    //计算示例 html 的地址
    resolveExampleUrl: null,
    //计算 web 目录下页面的地址
    resolveWebUrl: null
};
(function (dataSource) {
    var cKey = "sample-data";

    //读取 cookie。只接受字母、数字与下划线，避免把非法字符拼进脚本地址
    function getDataSource() {
        var name = cKey + "=";
        var ca = document.cookie.split(";");
        var value = "";
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                value = c.substring(name.length, c.length);
                break;
            }
        }
        return /^[a-zA-Z0-9_]+$/.test(value) ? value : "";
    }

    //从路径中取产品名。取页面所在目录名，/examples/leaflet/ 与 /en/examples/leaflet/ 均取到 leaflet
    function getProduct() {
        var path = window.location.pathname.split("/");
        //末位是页面文件名，其前一位即当前目录
        return path[path.length - 2] || "";
    }

    //页面是否已位于该数据源目录下，如 examples/en/leaflet/。此时无需再跳转目录
    function isInDataSourceDir(name) {
        var path = window.location.pathname.split("/");
        return name ? path[path.length - 3] === name : false;
    }

    var name = getDataSource();
    var product = getProduct();
    //数据源目录已在当前路径上时不再叠加
    var useDataSource = !!name && !isInDataSourceDir(name);

    //取指定产品配置文件的相对路径。product 省略时取当前产品
    function configUrl(target) {
        target = target || product;
        if (target === product) {
            return useDataSource ? "../" + name + "/" + product + "/config.js" : "./config.js";
        }
        return useDataSource ? "../" + name + "/" + target + "/config.js" : "../" + target + "/config.js";
    }

    //按顺序向页面追加各产品的示例配置脚本。$body 为 body 的 jQuery 对象，
    //others 为除当前产品外需要加载的产品名数组（供头部导航菜单使用）
    function appendConfigs($body, others) {
        others = others || [];
        for (var i = 0; i < others.length; i++) {
            $body.append("<script type='text/javascript' src='" + configUrl(others[i]) + "'><\/script>");
        }
        //先清空，避免当前产品的 config.js 不存在（404）时，
        //页面把上一个加载成功的产品配置当成自己的渲染出来
        $body.append("<script type='text/javascript'>window.exampleConfig = {};<\/script>");
        //当前产品放最后，保证页面渲染用的 exampleConfig 是当前产品的配置
        $body.append("<script type='text/javascript' src='" + configUrl() + "'><\/script>");
    }

    //消解路径中的 "." 与 ".."，避免拼出 /examples/leaflet/../en/leaflet/xx.html 这类地址
    function normalizePath(path) {
        var parts = path.split("/");
        var stack = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part === "." || part === "") {
                continue;
            }
            if (part === "..") {
                stack.pop();
                continue;
            }
            stack.push(part);
        }
        return "/" + stack.join("/");
    }

    //计算示例 html 的地址。fileName 为配置中的 fileName 字段
    function resolveExampleUrl(fileName) {
        //只取 pathname 推导目录，避免查询串或 hash 中的 "/" 干扰
        var pathname = window.location.pathname;
        var dir = pathname.substr(0, pathname.lastIndexOf("/") + 1);
        var prefix = useDataSource ? "../" + name + "/" + product + "/" : "./";
        return window.location.origin + normalizePath(dir + prefix + fileName + ".html");
    }

    //计算 web 目录下页面的地址，如 404.html。
    //examples 与 web 同级，需从当前页退到 examples 的上一层再进 web。
    //退几层只取决于页面自身在 examples 下的深度，与数据源无关
    function resolveWebUrl(page) {
        var pathname = window.location.pathname;
        var parts = pathname.split("/");
        //去掉末位的页面文件名
        parts.pop();
        var index = parts.lastIndexOf("examples");
        //examples 到当前目录的层级数，加 1 是为了退到 examples 之外
        var levels = index > -1 ? parts.length - index : 2;
        var up = "";
        for (var i = 0; i < levels; i++) {
            up += "../";
        }
        var dir = pathname.substr(0, pathname.lastIndexOf("/") + 1);
        return window.location.origin + normalizePath(dir + up + "web/" + page);
    }

    dataSource.name = name;
    dataSource.product = product;
    dataSource.configUrl = configUrl;
    dataSource.appendConfigs = appendConfigs;
    dataSource.resolveExampleUrl = resolveExampleUrl;
    dataSource.resolveWebUrl = resolveWebUrl;

})(dataSource);
