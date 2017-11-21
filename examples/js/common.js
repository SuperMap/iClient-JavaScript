$().ready(function () {
    initI18N();
    bindEvents();

    function initI18N() {
        var lan = utils.getLanguage();
        i18next
            .use(i18nextXHRBackend)
            .init({
                lng: lan,
                whitelist: ["zh-CN", "en"],//语言列表，跟locales下的目录名对应
                ns: "resources",//locales下的json文件名称
                defaultNS: "resources",//locales下的json文件名称
                fallbackLng: "zh-CN",//默认语言
                backend: {
                    loadPath: '../locales/{{lng}}/{{ns}}.json'
                }
            }, function (err, t) {
                if (window.isSite) {
                    localize();
                }
                jqueryI18next.init(i18next, $);
                $(".nav").localize();//翻译nav下所有的文档
                onLoadCallBack(); //设置标题栏当前语言
            });
    }

    function onLoadCallBack() {
        var lan = utils.getLanguage();
        var lang_text = $("[data-lang=" + lan + "]").html() || "中文";
        $('#lang').html(lang_text);
    }

    function bindEvents() {
        $(".nav").ready(function () {
            $('.lang-option').click(function () {
                var value = $(this).data('lang');
                utils.setLanguage(value);
                $('#lang').html($(this).html());
                i18next.changeLanguage(value);
                if (window.isSite) {
                    localize();
                    return;
                }
                window.location.reload();
            });
        })
    }

    function localize() {
        var lang = utils.getLanguage();
        var pathname = window.location.pathname.replace("/en/", "/");
        var href = window.location.origin + pathname;
        if (lang === "en") {
            href = window.location.origin + pathname.replace(/([^\/]*\/){1}([^\/]*)/, '/en/$2');
        }
        if ((window.location.origin + window.location.pathname) === href) {
            return;
        }
        window.location = href;
    }

});