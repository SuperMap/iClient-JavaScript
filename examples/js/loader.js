/*显示loading*/
function showLoader(text, type, attributes) {
    if (!type) {
        type = "loader-default";
        attributes = attributes || {'data-half': true}
    }
    var $body = document.getElementsByTagName('body');
    $body = $body && $body[0];
    if ($body) {
        var $loader = document.getElementsByClassName('loader')[0];
        if (!$loader) {
            $loader = createLoader(type);
        }
        $loader.classList.add('is-active');
        setLoaderText(text);
        setAttributes(attributes);
    }
}

/*设置loading文本，默认文本为"loading"*/
function setLoaderText(text, textAttributeField) {
    if (text != null) {
        var txtAttrField = textAttributeField != null ? textAttributeField : "data-text";
        var attributes = {};
        attributes[txtAttrField] = text;
        setAttributes(attributes);
    }
}

/*设置loader显示相关属性*/
function setAttributes(attributes) {
    var $loader = document.getElementsByClassName('loader')[0];
    if ($loader && attributes) {
        for (var attr in attributes) {
            $loader.setAttribute(attr, attributes[attr]);
        }
    }
}

/*移除loader*/
function removeLoader() {
    var $loader = document.getElementsByClassName('loader')[0];
    if ($loader) {
        $loader.parentNode.removeChild($loader);
    }
}


function createLoader(className) {
    var $loader, $body = document.getElementsByTagName('body');
    $body = $body && $body[0];
    if ($body) {
        $loader = document.createElement('div');
        $loader.className = "loader " + className;
        $body.insertBefore($loader, $body.children[0]);
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".loader.is-active{" +
            "background-color: rgba(0, 0, 0, 0.4) !important;" +
            "}";
        if (document.getElementsByTagName('head')) {
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }
    return $loader;
}