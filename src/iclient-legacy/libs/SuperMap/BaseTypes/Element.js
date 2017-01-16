/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/BaseTypes.js
 */

/**
 * Namespace: SuperMap.Element
 * SuperMap.Element实现元素的显示，隐藏，删除，取得高度，取得范围等功能。
 */
SuperMap.Element = {

    /**
     * APIFunction: visible
     * 判断元素是否可见。
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * var visible = SuperMap.Element.visible(element);
     * (end)
     * 
     * Parameters: 
     * element - {DOMElement} 要进行判断的元素。
     * 
     * Returns:
     * {Boolean} 返回元素可见性。
     */
    visible: function(element) {
        return SuperMap.Util.getElement(element).style.display !== 'none';
    },

    /**
     * APIFunction: toggle
     * 切换传入的DOM元素的可见性。
     *
     * 例如:
     * (start code)
     *  //element1、element2 必须是页面已经存在了的元素
     * //这里传入的数量可以是任意个数
     * SuperMap.Element.toggle(element1,element2);
     * (end)
     * 
     * Parameters:
     * element - {DOMElement} DOM元素，用户可以传入任意数量的元素。
     */
    toggle: function() {
        for (var i=0, len=arguments.length; i<len; i++) {
            var element = SuperMap.Util.getElement(arguments[i]);
            var display = SuperMap.Element.visible(element) ? 'none' 
                                                              : '';
            element.style.display = display;
        }
    },

    /**
     * APIFunction: remove
     * 从DOM中删除指定的元素。
     * （自动寻找到父元素，将当前元素删除）
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * SuperMap.Element.remove(element);
     * (end)
     * 
     * Parameters:
     * element - {DOMElement} 指定要删除的DOM元素。
     */
    remove: function(element) {
        element = SuperMap.Util.getElement(element);
        element.parentNode.removeChild(element);
    },

    /**
     * APIFunction: getHeight
     * 获取指定DOM元素的高度。
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * var height = SuperMap.Element.getHeight(element);
     * (end)
     *  
     * Parameters:
     * element - {DOMElement} 指定要获取高度的DOM元素。
     * 
     * Returns:
     * {Integer} 指定DOM元素的高度。
     */
    getHeight: function(element) {
        element = SuperMap.Util.getElement(element);
        return element.offsetHeight;
    },

    /**
     * Function: getDimensions
     * *Deprecated*. 已过时。
     *  
     * Parameters:
     * element - {DOMElement}
     * 
     * Returns:
     * {Object} 返回宽度、高度属性对象。
     */
    /*getDimensions: function(element) {
        element = SuperMap.Util.getElement(element);
        if (SuperMap.Element.getStyle(element, 'display') !== 'none') {
            return {width: element.offsetWidth, height: element.offsetHeight};
        }
    
        // All *Width and *Height properties give 0 on elements with display none,
        // so enable the element temporarily
        var els = element.style;
        var originalVisibility = els.visibility;
        var originalPosition = els.position;
        var originalDisplay = els.display;
        els.visibility = 'hidden';
        els.position = 'absolute';
        els.display = '';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = originalDisplay;
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {width: originalWidth, height: originalHeight};
    },*/

    /**
     * APIFunction: hasClass
     * 获取DOM元素是否设置了className（class ，用于修改CSS）
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     *  //假设 element.className = "className"，那么 isHas = true
     * var isHas = SuperMap.Element.hasClass(element,"className");
     *
     * (end)
     *
     * Parameters:
     * element - {DOMElement} DOM元素
     * name - {String} 需要判定的DOM className
     *
     * Returns:
     * {Boolean} 返回DOM元素是否设置了 name这个className属性
     */
    hasClass: function(element, name) {
        if(!element || !element.className)return false;
        var names = element.className;
        return (!!names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },
    
    /**
     * APIFunction: addClass
     * 给当前DOM元素的属性className上添加新的name
     * （如果存在了，则不添加）
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * var element = SuperMap.Element.addClass(element,"className2");
     *  //假设  element.className = "className1";
     *  //添加后  element.className = "className1 className2";
     * (end)
     *
     * Parameters:
     * element - {DOMElement} DOM元素
     * name - {String} 需要新添加的 className
     *
     * Returns:
     * {DOMElement} 返回添加后的DOM元素
     */
    addClass: function(element, name) {
        if(!element)return;
        if(!SuperMap.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },

    /**
     * APIFunction: removeClass
     * 在当前DOM元素的属性 className 上移除name
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * var element = SuperMap.Element.removeClass(element,"className2");
     *  //假设  element.className = "className1 className2";
     *  //移除后 element.className = "className1";
     * (end)
     *
     * Parameters:
     * element - {DOMElement} DOM元素
     * name - {String} 需要移除的  className
     *
     * Returns:
     * {DOMElement} 返回移除后的DOM元素
     */
    removeClass: function(element, name) {
        if(!SuperMap.Element.hasClass(element, name))return;
        var names = element.className;
        if(names) {
            element.className = SuperMap.String.trim(
                names.replace(
                    new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "
                )
            );
        }
        return element;
    },

    /**
     * APIFunction: toggleClass
     * 给DOM移除（存在了name）或添加（不存在）
     *
     * 例如:
     * (start code)
     *  //element 必须是页面已经存在了的元素
     * var element = SuperMap.Element.toggleClass(element,"className");
     * (end)
     *
     * Parameters:
     * element - {DOMElement} DOM对象
     * name - {String} 需要判定的className，存在就移除，不存在，就添加
     *
     * Returns:
     * {DOMElement} 修改后的DOM对象
     */
    toggleClass: function(element, name) {
        if(SuperMap.Element.hasClass(element, name)) {
            SuperMap.Element.removeClass(element, name);
        } else {
            SuperMap.Element.addClass(element, name);
        }
        return element;
    },

    /**
     * APIFunction: getStyle
     * 获取指定DOM元素的某一样式的值。
     *
     * 例如:
     * (start code)
     *  //假设界面上有 < canvas id="example" width="150" height="220" style="background-color: #ff0000;">
     *  var element = document.getElementById('example');
     * var style = SuperMap.Element.getStyle(element,"background-color");
     * //style = "rgb(255, 0, 0)";
     * (end)
     *
     * Parameters:
     * element - {DOMElement} 指定获取样式的DOM元素。
     * style - {String} 指定样式名称。
     *
     * Returns:
     * {Boolean||String} 返回指定的样式名称对应的样式值。
     */
    getStyle: function(element, style) {
        element = SuperMap.Util.getElement(element);

        var value = null;
        if (element && element.style) {
            value = element.style[SuperMap.String.camelize(style)];
            if (!value) {
                if (document.defaultView && 
                    document.defaultView.getComputedStyle) {
                    
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[SuperMap.String.camelize(style)];
                }
            }
        
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera &&
                (SuperMap.Util.indexOf(positions,style) !== -1) &&
                (SuperMap.Element.getStyle(element, 'position') === 'static')) { 
                value = 'auto';
            }
        }
    
        return value === 'auto' ? null : value;
    },

    /**
     * APIFunction: getPosition
     * 获取指定DOM元素位置信息。
     *
     * 例如:
     * (start code)
     *  //假设界面上有 < canvas id="example" width="150" height="220" style="background-color: #ff0000;">
     *  var element = document.getElementById('example');
     * var style = SuperMap.Element.getPosition(element);
     * (end)
     *
     * Parameters:
     * element - {DOMElement} 指定获取样式的DOM元素。。
     *
     * Returns:
     * {Object} 返回指定的样式名称对应的位置信息。
     */
    getPosition:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    }
};
