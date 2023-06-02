function toStyleVariable(variable) {
    return `--${variable.replace(/[A-Z]/g, '-$&').toLowerCase()}`;
}

function setRootStyle (theme) {
    let acceptedThemeStyle = window.themeConfig.find((item) => item.label === theme) || window.themeConfig[1];
    const variables = {};
    const themeKeys = Object.keys(acceptedThemeStyle);
    themeKeys.forEach((key) => {
      const varKey = toStyleVariable(key);
      variables[varKey] = acceptedThemeStyle[key];
    })
    const rootStyleSelector = ':root';
    const antdStyleId =  'sm-theme-style';
    const rootStyle = `${rootStyleSelector} ${JSON.stringify(variables, null, 2)
    .replace(/(:.+),/g, '$1;')
    .replace(/"/g, '')}`;
    let rootStyleTag = document.getElementById(antdStyleId);
    if (!rootStyleTag) {
        rootStyleTag = document.createElement('style');
        rootStyleTag.setAttribute('id', antdStyleId);
        rootStyleTag.setAttribute('type', 'text/css');
        document.head.insertBefore(rootStyleTag, document.head.firstChild);
    }
    rootStyleTag.innerHTML = rootStyle;
}
document.addEventListener("DOMContentLoaded", function() {
  initSkin();
});

function initSkin() {
  var skin = window.sessionStorage.getItem('theme') || 'light';
  var bodyElem = document.querySelector('body');
  bodyElem.classList.remove("light", "dark");
  bodyElem.classList.add(skin);
  setRootStyle(skin);
}