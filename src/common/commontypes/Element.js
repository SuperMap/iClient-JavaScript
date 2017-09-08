import SuperMap from '../SuperMap';
import {StringExt} from './BaseTypes';
import {Util} from './Util';

/**
 * @name Element
 * @memberOf SuperMap
 * @namespace
 * @description SuperMap.Element实现元素的显示，隐藏，删除，取得高度，取得范围等功能。
 */
export var Element = SuperMap.Element = {

    /**
     * @description 判断元素是否可见。
     * @example
     *  //element 必须是页面已经存在了的元素
     * var visible = SuperMap.Element.visible(element);
     * @param element - {HTMLElement} 要进行判断的元素。
     * @returns {Boolean} 返回元素可见性。
     */
    visible: function (element) {
        return Util.getElement(element).style.display !== 'none';
    },

    /**
     * @description 切换传入的DOM元素的可见性。
     * @example
     *  //element1、element2 必须是页面已经存在了的元素
     * //这里传入的数量可以是任意个数
     * SuperMap.Element.toggle(element1,element2);
     * @param element - {HTMLElement} DOM元素，用户可以传入任意数量的元素。
     */
    toggle: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = Util.getElement(arguments[i]);
            var display = Element.visible(element) ? 'none' : '';
            element.style.display = display;
        }
    },

    /**
     * @description 从DOM中删除指定的元素。（自动寻找到父元素，将当前元素删除）
     * @example
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * SuperMap.Element.remove(element);
     * @param element - {HTMLElement} 指定要删除的DOM元素。
     */
    remove: function (element) {
        element = Util.getElement(element);
        element.parentNode.removeChild(element);
    },

    /**
     * @description 获取指定DOM元素的高度。
     * @example
     *  //element 必须是页面已经存在了的元素
     * var height = SuperMap.Element.getHeight(element);
     * @param element - {HTMLElement} 指定要获取高度的DOM元素。
     * @returns {Integer} 指定DOM元素的高度。
     */
    getHeight: function (element) {
        element = Util.getElement(element);
        return element.offsetHeight;
    },


    /**
     * @description 获取DOM元素是否设置了className（class ，用于修改CSS）
     * @example
     *  //element 必须是页面已经存在了的元素
     *  //假设 element.className = "className"，那么 isHas = true
     * var isHas = SuperMap.Element.hasClass(element,"className");
     * @param element - {HTMLElement} DOM元素
     * @param name - {string} 需要判定的DOM className
     * @returns {Boolean} 返回DOM元素是否设置了 name这个className属性
     */
    hasClass: function (element, name) {
        if (!element || !element.className) return false;
        var names = element.className;
        return (!!names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },

    /**
     * @description 给当前DOM元素的属性className上添加新的name（如果存在了，则不添加）
     * @example
     *  //element 必须是页面已经存在了的元素
     * var element = SuperMap.Element.addClass(element,"className2");
     *  //假设  element.className = "className1";
     *  //添加后  element.className = "className1 className2";
     * @param element - {HTMLElement} DOM元素
     * @param name - {string} 需要新添加的 className
     * @returns {HTMLElement} 返回添加后的DOM元素
     */
    addClass: function (element, name) {
        if (!element) return;
        if (!Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },

    /**
     * @description 在当前DOM元素的属性 className 上移除name
     * @example
     *  //element 必须是页面已经存在了的元素
     * var element = SuperMap.Element.removeClass(element,"className2");
     *  //假设  element.className = "className1 className2";
     *  //移除后 element.className = "className1";
     * @param element - {HTMLElement} DOM元素
     * @param name - {string} 需要移除的  className
     * @returns {HTMLElement} 返回移除后的DOM元素
     */
    removeClass: function (element, name) {
        if (!Element.hasClass(element, name)) return;
        var names = element.className;
        if (names) {
            element.className = SuperMap.String.trim(
                names.replace(
                    new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "
                )
            );
        }
        return element;
    },

    /**
     * @description 给DOM移除（存在了name）或添加（不存在）
     * @example
     * //element 必须是页面已经存在了的元素
     * var element = SuperMap.Element.toggleClass(element,"className");
     * @param element - {HTMLElement} DOM对象
     * @param name - {string} 需要判定的className，存在就移除，不存在，就添加
     * @returns {HTMLElement} 修改后的DOM对象
     */
    toggleClass: function (element, name) {
        if (Element.hasClass(element, name)) {
            Element.removeClass(element, name);
        } else {
            Element.addClass(element, name);
        }
        return element;
    },

    /**
     * @description 获取指定DOM元素的某一样式的值。
     * @example
     *  //假设界面上有 < canvas id="example" width="150" height="220" style="background-color: #ff0000;">
     *  var element = document.getElementById('example');
     * var style = SuperMap.Element.getStyle(element,"background-color");
     * //style = "rgb(255, 0, 0)";
     * @param element - {HTMLElement} 指定获取样式的DOM元素。
     * @param style - {string} 指定样式名称。
     * @returns {Boolean|String} 返回指定的样式名称对应的样式值。
     */
    getStyle: function (element, style) {
        element = Util.getElement(element);

        var value = null;
        if (element && element.style) {
            value = element.style[StringExt.camelize(style)];
            if (!value) {
                if (document.defaultView &&
                    document.defaultView.getComputedStyle) {

                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[StringExt.camelize(style)];
                }
            }

            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera &&
                (Util.indexOf(positions, style) !== -1) &&
                (Element.getStyle(element, 'position') === 'static')) {
                value = 'auto';
            }
        }

        return value === 'auto' ? null : value;
    },

    /**
     * @description 获取指定DOM元素位置信息。
     * @example
     * //假设界面上有 < canvas id="example" width="150" height="220" style="background-color: #ff0000;">
     * var element = document.getElementById('example');
     * var style = SuperMap.Element.getPosition(element);
     * @param node - {HTMLElement} 指定获取样式的DOM元素。。
     * @returns {Object} 返回指定的样式名称对应的位置信息。
     */
    getPosition: function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top: pos.top + scrollt, right: pos.right + scrollx, bottom: pos.bottom + scrollt, left: pos.left + scrollx}
    }
};
