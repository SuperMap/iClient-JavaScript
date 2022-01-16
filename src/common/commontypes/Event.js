/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from './Util';

 /**
  * @name Event
  * @namespace
  * @description 事件处理函数.
  */
 export var Event = {

     /**
      * @description  事件观察者列表。
      * @type {Object}
      * @default false
      */
     observers: false,

     /**
      * @description KEY_SPACE
      * @type {number}
      * @default 32
      */
     KEY_SPACE: 32,

     /**
      * @description KEY_BACKSPACE
      * @type {number}
      * @default 8
      */
     KEY_BACKSPACE: 8,

     /**
      * @description KEY_TAB
      * @type {number}
      * @default 9
      */
     KEY_TAB: 9,

     /**
      * @description KEY_RETURN
      * @type {number}
      * @default 13
      */
     KEY_RETURN: 13,

     /**
      * @description KEY_ESC
      * @type {number}
      * @default 27
      */
     KEY_ESC: 27,

     /**
      * @description KEY_LEFT
      * @type {number}
      * @default 37
      */
     KEY_LEFT: 37,

     /**
      * @description KEY_UP
      * @type {number}
      * @default 38
      */
     KEY_UP: 38,

     /**
      * @description KEY_RIGHT
      * @type {number}
      * @default 39
      */
     KEY_RIGHT: 39,

     /**
      * @description KEY_DOWN
      * @type {number}
      * @default 40
      */
     KEY_DOWN: 40,

     /**
      * @description KEY_DELETE
      * @type {number}
      * @default 46
      */
     KEY_DELETE: 46,


     /**
      * @description Cross browser event element detection.
      * @param {Event} event - Event 对象。
      * @returns {HTMLElement} 触发事件的 DOM 元素。
      */
     element: function (event) {
         return event.target || event.srcElement;
     },

     /**
      * @description 判断事件是否由单次触摸引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否有且只有一个当前在与触摸表面接触的 Touch 对象。
      */
     isSingleTouch: function (event) {
         return event.touches && event.touches.length === 1;
     },

     /**
      * @description 判断事件是否由多点触控引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否存在多个当前在与触摸表面接触的 Touch 对象。
      */
     isMultiTouch: function (event) {
         return event.touches && event.touches.length > 1;
     },

     /**
      * @description 确定事件是否由左键单击引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否点击鼠标左键。
      */
     isLeftClick: function (event) {
         return (((event.which) && (event.which === 1)) ||
             ((event.button) && (event.button === 1)));
     },

     /**
      * @description 确定事件是否由鼠标右键单击引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否点击鼠标右键。
      */
     isRightClick: function (event) {
         return (((event.which) && (event.which === 3)) ||
             ((event.button) && (event.button === 2)));
     },

     /**
      * @description 阻止事件冒泡。
      * @param {Event} event - Event 对象。
      * @param {boolean} allowDefault - 默认为 false，表示阻止事件的默认行为。
      */
     stop: function (event, allowDefault) {

         if (!allowDefault) {
             if (event.preventDefault) {
                 event.preventDefault();
             } else {
                 event.returnValue = false;
             }
         }

         if (event.stopPropagation) {
             event.stopPropagation();
         } else {
             event.cancelBubble = true;
         }
     },

     /**
      * @param {Event} event - Event 对象。
      * @param {string} tagName - html 标签名。
      * @returns {HTMLElement} DOM 元素。
      */
     findElement: function (event, tagName) {
         var element = Event.element(event);
         while (element.parentNode && (!element.tagName ||
             (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
             element = element.parentNode;
         }
         return element;
     },

     /**
      * @description 监听事件，注册事件处理方法。
      * @param {(HTMLElement|string)} elementParam - 待监听的 DOM 对象或者其 ID 标识。
      * @param {string} name - 监听事件的类别名称。
      * @param {function} observer - 注册的事件处理方法。
      * @param {boolean} [useCapture=false] - 是否捕获。
      */
     observe: function (elementParam, name, observer, useCapture) {
         var element = Util.getElement(elementParam);
         useCapture = useCapture || false;

         if (name === 'keypress' &&
             (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
                 || element.attachEvent)) {
             name = 'keydown';
         }

         //if observers cache has not yet been created, create it
         if (!this.observers) {
             this.observers = {};
         }

         //if not already assigned, make a new unique cache ID
         if (!element._eventCacheID) {
             var idPrefix = "eventCacheID_";
             if (element.id) {
                 idPrefix = element.id + "_" + idPrefix;
             }
             element._eventCacheID = Util.createUniqueID(idPrefix);
         }

         var cacheID = element._eventCacheID;

         //if there is not yet a hash entry for this element, add one
         if (!this.observers[cacheID]) {
             this.observers[cacheID] = [];
         }

         //add a new observer to this element's list
         this.observers[cacheID].push({
             'element': element,
             'name': name,
             'observer': observer,
             'useCapture': useCapture
         });

         //add the actual browser event listener
         if (element.addEventListener) {
             if(name === 'mousewheel'){
                 // https://www.chromestatus.com/features/6662647093133312
                 element.addEventListener(name, observer, {useCapture: useCapture, passive: false} );
             } else {
                 element.addEventListener(name, observer, useCapture);
             }
         } else if (element.attachEvent) {
             element.attachEvent('on' + name, observer);
         }
     },

     /**
      * @description 移除给定 DOM 元素的监听事件。
      * @param {(HTMLElement|string)} elementParam - 待监听的 DOM 对象或者其 ID 标识。
      */
     stopObservingElement: function (elementParam) {
         var element = Util.getElement(elementParam);
         var cacheID = element._eventCacheID;
         this._removeElementObservers(Event.observers[cacheID]);
     },
     _removeElementObservers: function (elementObservers) {
         if (elementObservers) {
             for (var i = elementObservers.length - 1; i >= 0; i--) {
                 var entry = elementObservers[i];
                 var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
                 Event.stopObserving.apply(this, args);
             }
         }
     },

     /**
      * @description 移除事件监听和注册的事件处理方法。注意：事件的移除和监听相对应，移除时的各属性信息必须监听时
      * 保持一致才能确保事件移除成功。
      * @param {(HTMLElement|string)} elementParam - 被监听的 DOM 元素或者其 ID。
      * @param {string} name - 需要移除的被监听事件名称。
      * @param {function} observer - 需要移除的事件处理方法。
      * @param {boolean} [useCapture=false] - 是否捕获。
      * @returns {boolean} 监听事件是否被移除。
      */
     stopObserving: function (elementParam, name, observer, useCapture) {
         useCapture = useCapture || false;

         var element = Util.getElement(elementParam);
         var cacheID = element._eventCacheID;

         if (name === 'keypress') {
             if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) ||
                 element.detachEvent) {
                 name = 'keydown';
             }
         }

         // find element's entry in this.observers cache and remove it
         var foundEntry = false;
         var elementObservers = Event.observers[cacheID];
         if (elementObservers) {

             // find the specific event type in the element's list
             var i = 0;
             while (!foundEntry && i < elementObservers.length) {
                 var cacheEntry = elementObservers[i];

                 if ((cacheEntry.name === name) &&
                     (cacheEntry.observer === observer) &&
                     (cacheEntry.useCapture === useCapture)) {

                     elementObservers.splice(i, 1);
                     if (elementObservers.length == 0) {
                         delete Event.observers[cacheID];
                     }
                     foundEntry = true;
                     break;
                 }
                 i++;
             }
         }

         //actually remove the event listener from browser
         if (foundEntry) {
             if (element.removeEventListener) {
                 element.removeEventListener(name, observer, useCapture);
             } else if (element && element.detachEvent) {
                 element.detachEvent('on' + name, observer);
             }
         }
         return foundEntry;
     },

     /**
      * @description 移除缓存中的监听事件。
      */
     unloadCache: function () {
         // check for Event before checking for observers, because
         // Event may be undefined in IE if no map instance was
         // created
         if (Event && Event.observers) {
             for (var cacheID in Event.observers) {
                 var elementObservers = Event.observers[cacheID];
                 Event._removeElementObservers.apply(this,
                     [elementObservers]);
             }
             Event.observers = false;
         }
     },

     CLASS_NAME: "SuperMap.Event"
 };
 /* prevent memory leaks in IE */
 Event.observe(window, 'resize', Event.unloadCache, false);
