/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @class  LevelRenderer.Tool.Env
 * @category Visualization Theme
 * @classdesc 环境识别
 * @private
 */
export class Env {
    constructor() {
        // Zepto.js
        // (c) 2010-2013 Thomas Fuchs
        // Zepto.js may be freely distributed under the MIT license.
        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Env";
        var me = this;

        function detect(ua) {
            var os = me.os = {};
            var browser = me.browser = {};
            var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
            var touchpad = webos && ua.match(/TouchPad/);
            var kindle = ua.match(/Kindle\/([\d.]+)/);
            var silk = ua.match(/Silk\/([\d._]+)/);
            var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
            var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
            var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
            var playbook = ua.match(/PlayBook/);
            var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
            var firefox = ua.match(/Firefox\/([\d.]+)/);
            var ie = ua.match(/MSIE ([\d.]+)/);
            var safari = webkit && ua.match(/Mobile\//) && !chrome;
            var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;

            // Todo: clean this up with a better OS/browser seperation:
            // - discern (more) between multiple browsers on android
            // - decide if kindle fire in silk mode is android or not
            // - Firefox on Android doesn't specify the Android version
            // - possibly devide in os, device and browser hashes

            /*eslint-disable*/
            if (browser.webkit = !!webkit) {
                browser.version = webkit[1];
            }

            if (android) {
                os.android = true;
                os.version = android[2];
            }
            if (iphone && !ipod) {
                os.ios = os.iphone = true;
                os.version = iphone[2].replace(/_/g, '.');
            }
            if (ipad) {
                os.ios = os.ipad = true;
                os.version = ipad[2].replace(/_/g, '.');
            }
            if (ipod) {
                os.ios = os.ipod = true;
                os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            }
            if (webos) {
                os.webos = true;
                os.version = webos[2];
            }
            if (touchpad) {
                os.touchpad = true;
            }
            if (blackberry) {
                os.blackberry = true;
                os.version = blackberry[2];
            }
            if (bb10) {
                os.bb10 = true;
                os.version = bb10[2];
            }
            if (rimtabletos) {
                os.rimtabletos = true;
                os.version = rimtabletos[2];
            }
            if (playbook) {
                browser.playbook = true;
            }
            if (kindle) {
                os.kindle = true;
                os.version = kindle[1];
            }
            if (silk) {
                browser.silk = true;
                browser.version = silk[1];
            }
            if (!silk && os.android && ua.match(/Kindle Fire/)) {
                browser.silk = true;
            }
            if (chrome) {
                browser.chrome = true;
                browser.version = chrome[1];
            }
            if (firefox) {
                browser.firefox = true;
                browser.version = firefox[1];
            }
            if (ie) {
                browser.ie = true;
                browser.version = ie[1];
            }
            if (safari && (ua.match(/Safari/) || !!os.ios)) {
                browser.safari = true;
            }
            if (webview) {
                browser.webview = true;
            }
            if (ie) {
                browser.ie = true;
                browser.version = ie[1];
            }

            os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
                (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
            os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
                (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
                (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

            return {
                browser: browser,
                os: os,
                // 原生canvas支持
                canvasSupported: document.createElement('canvas').getContext ? true : false
            };
        }

        return detect(navigator.userAgent);
    }
    destory() {
        return true;
    }
}
