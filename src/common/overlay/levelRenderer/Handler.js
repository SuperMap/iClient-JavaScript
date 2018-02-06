import {Eventful} from './Eventful';
import {Config} from './Config';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Handler
 * @category Visualization Theme
 * Handler 控制模块。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Eventful>
 */
export class Handler extends Eventful {

    /**
     * Constructor: SuperMap.LevelRenderer.Handler
     * 构造函数。
     *
     * Parameters:
     * root - {HTMLElement} 绘图区域。
     * storage - {<SuperMap.LevelRenderer.Storage>} Storage 实例。
     * painter - {<SuperMap.LevelRenderer.Painter>} Painter 实例。
     *
     */
    constructor(root, storage, painter) {
        super(root, storage, painter);
        /**
         * Property: root
         * {HTMLElement} 绘图区域。
         *
         */
        this.root = root;

        /**
         * Property: storage
         * {<SuperMap.LevelRenderer.Storage>} Storage 实例。
         *
         */
        this.storage = storage;

        /**
         * Property: painter
         * {<SuperMap.LevelRenderer.Painter>} Painter 实例。
         *
         */
        this.painter = painter;

        /**
         * Property: _lastX
         * {Number} 默认值：0。
         *
         */
        this._lastX = 0;

        /**
         * Property: _lastY
         * {Number} 默认值：0。
         *
         */
        this._lastY = 0;

        /**
         * Property: _mouseX
         * {Number} 默认值：0。
         *
         */
        this._mouseX = 0;

        /**
         * Property: _mouseY
         * {Number} 默认值：0。
         *
         */
        this._mouseY = 0;

        /**
         * Property: _findHover
         * {Function} 查找 Hover 图形。
         *
         */
        this._findHover = null;

        /**
         * Property: _domHover
         * {Object} 高亮 DOM。
         *
         */
        this._domHover = null;

        // 各种事件标识的私有变量
        // this._hasfound = false;              // 是否找到 hover 图形元素
        // this._lastHover = null;              // 最后一个 hover 图形元素
        // this._mouseDownTarget = null;
        // this._draggingTarget = null;         // 当前被拖拽的图形元素
        // this._isMouseDown = false;
        // this._isDragging = false;
        // this._lastMouseDownMoment;
        // this._lastTouchMoment;
        // this._lastDownButton;

        this._findHover = bind3Arg(findHover, this);
        this._domHover = painter.getDomHover();

        this.CLASS_NAME = "SuperMap.LevelRenderer.Handler";
        var domHandlers = {
            /**
             * Method: resize
             * 窗口大小改变响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            resize: function (event) {
                event = event || window.event;
                this._lastHover = null;
                this._isMouseDown = 0;

                // 分发SuperMap.LevelRenderer.Config.EVENT.RESIZE事件，global
                this.dispatch(Config.EVENT.RESIZE, event);
            },

            /**
             * Method: click
             * 点击响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            click: function (event) {
                event = this._zrenderEventFixed(event);

                // 分发SuperMap.LevelRenderer.Config.EVENT.CLICK事件
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable)
                    || !_lastHover
                ) {

                    // 判断没有发生拖拽才触发click事件
                    if (this._clickThreshold < 10) {
                        this._dispatchAgency(_lastHover, Config.EVENT.CLICK, event);
                    }
                }

                this._mousemoveHandler(event);
            },

            /**
             * Method: dblclick
             * 双击响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            dblclick: function (event) {
                event = event || window.event;
                event = this._zrenderEventFixed(event);

                // 分发SuperMap.LevelRenderer.Config.EVENT.DBLCLICK事件
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable)
                    || !_lastHover
                ) {

                    // 判断没有发生拖拽才触发dblclick事件
                    if (this._clickThreshold < 5) {
                        this._dispatchAgency(_lastHover, Config.EVENT.DBLCLICK, event);
                    }
                }

                this._mousemoveHandler(event);
            },

            /**
             * Method: mousewheel
             * 鼠标滚轮响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mousewheel: function (event) {
                event = this._zrenderEventFixed(event);

                // http://www.sitepoint.com/html5-javascript-mouse-wheel/
                // https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
                var delta = event.wheelDelta // Webkit
                    || -event.detail; // Firefox
                var scale = delta > 0 ? 1.1 : 1 / 1.1;

                var layers = this.painter.getLayers();

                var needsRefresh = false;
                for (var z in layers) {
                    if (z !== 'hover') {
                        var layer = layers[z];
                        var pos = layer.position;
                        if (layer.zoomable) {
                            layer.__zoom = layer.__zoom || 1;
                            var newZoom = layer.__zoom;
                            newZoom *= scale;
                            newZoom = Math.max(
                                Math.min(layer.maxZoom, newZoom),
                                layer.minZoom
                            );
                            scale = newZoom / layer.__zoom;
                            layer.__zoom = newZoom;
                            // Keep the mouse center when scaling
                            pos[0] -= (this._mouseX - pos[0]) * (scale - 1);
                            pos[1] -= (this._mouseY - pos[1]) * (scale - 1);
                            layer.scale[0] *= scale;
                            layer.scale[1] *= scale;
                            layer.dirty = true;
                            needsRefresh = true;
                        }
                    }
                }
                if (needsRefresh) {
                    this.painter.refresh();
                }

                // 分发SuperMap.LevelRenderer.Config.EVENT.MOUSEWHEEL事件
                this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEWHEEL, event);
                this._mousemoveHandler(event);
            },

            /**
             * Method: mousemove
             * 鼠标（手指）移动响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mousemove: function (event) {
                // 拖拽不触发click事件
                this._clickThreshold++;

                event = this._zrenderEventFixed(event);
                this._lastX = this._mouseX;
                this._lastY = this._mouseY;
                this._mouseX = SUtil.Util_event.getX(event);
                this._mouseY = SUtil.Util_event.getY(event);
                var dx = this._mouseX - this._lastX;
                var dy = this._mouseY - this._lastY;

                // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGSTART事件
                // 避免手抖点击误认为拖拽
                // if (this._mouseX - this._lastX > 1 || this._mouseY - this._lastY > 1) {
                this._processDragStart(event);
                // }
                this._hasfound = 0;
                this._event = event;

                this._iterateAndFindHover();

                // 找到的在迭代函数里做了处理，没找到得在迭代完后处理
                if (!this._hasfound) {
                    // 过滤首次拖拽产生的mouseout和dragLeave
                    if (!this._draggingTarget
                        || (this._lastHover && this._lastHover != this._draggingTarget)
                    ) {
                        // 可能出现SuperMap.LevelRenderer.Config.EVENT.MOUSEOUT事件
                        this._processOutShape(event);

                        // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE事件
                        this._processDragLeave(event);
                    }

                    this._lastHover = null;
                    this.storage.delHover();
                    this.painter.clearHover();
                }

                // set cursor for root element
                var cursor = '';

                // 如果存在拖拽中元素，被拖拽的图形元素最后addHover
                if (this._draggingTarget) {
                    this.storage.drift(this._draggingTarget.id, dx, dy);
                    this._draggingTarget.modSelf();
                    this.storage.addHover(this._draggingTarget);
                } else if (this._isMouseDown) {
                    // Layer dragging
                    var layers = this.painter.getLayers();

                    var needsRefresh = false;
                    for (var z in layers) {
                        if (z !== 'hover') {
                            var layer = layers[z];
                            if (layer.panable) {
                                // PENDING
                                cursor = 'move';
                                // Keep the mouse center when scaling
                                layer.position[0] += dx;
                                layer.position[1] += dy;
                                needsRefresh = true;
                                layer.dirty = true;
                            }
                        }
                    }
                    if (needsRefresh) {
                        this.painter.refresh();
                    }
                }

                if (this._draggingTarget || (this._hasfound && this._lastHover.draggable)) {
                    cursor = 'move';
                } else if (this._hasfound && this._lastHover.clickable) {
                    cursor = 'pointer';
                }
                this.root.style.cursor = cursor;

                // 分发SuperMap.LevelRenderer.Config.EVENT.MOUSEMOVE事件
                this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEMOVE, event);

                if (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) {
                    this.painter.refreshHover();
                }
            },

            /**
             * Method: mouseout
             * 鼠标（手指）离开响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mouseout: function (event) {
                event = this._zrenderEventFixed(event);

                var element = event.toElement || event.relatedTarget;
                if (element != this.root) {
                    while (element && element.nodeType != 9) {
                        // 忽略包含在root中的dom引起的mouseOut
                        if (element == this.root) {
                            this._mousemoveHandler(event);
                            return;
                        }

                        element = element.parentNode;
                    }
                }

                event.zrenderX = this._lastX;
                event.zrenderY = this._lastY;
                this.root.style.cursor = '';
                this._isMouseDown = 0;

                this._processOutShape(event);
                this._processDrop(event);
                this._processDragEnd(event);

                this.painter.refreshHover();

                this.dispatch(Config.EVENT.GLOBALOUT, event);
            },

            /**
             * Method: mousedown
             * 鼠标（手指）按下响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mousedown: function (event) {
                // 重置 clickThreshold
                this._clickThreshold = 0;

                if (this._lastDownButton == 2) {
                    this._lastDownButton = event.button;
                    this._mouseDownTarget = null;
                    // 仅作为关闭右键菜单使用
                    return;
                }

                this._lastMouseDownMoment = new Date();
                event = this._zrenderEventFixed(event);
                this._isMouseDown = 1;

                // 分发SuperMap.LevelRenderer.Config.EVENT.MOUSEDOWN事件
                this._mouseDownTarget = this._lastHover;
                this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEDOWN, event);
                this._lastDownButton = event.button;
            },

            /**
             * Method: mouseup
             * 鼠标（手指）抬起响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mouseup: function (event) {
                event = this._zrenderEventFixed(event);
                this.root.style.cursor = '';
                this._isMouseDown = 0;
                this._mouseDownTarget = null;

                // 分发SuperMap.LevelRenderer.Config.EVENT.MOUSEUP事件
                this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEUP, event);
                this._processDrop(event);
                this._processDragEnd(event);
            },

            /**
             * Method: touchstart
             * Touch 开始响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            touchstart: function (event) {
                // SUtil.Util_event.stop(event);// 阻止浏览器默认事件，重要
                event = this._zrenderEventFixed(event, true);
                this._lastTouchMoment = new Date();

                // 平板补充一次findHover
                this._mobildFindFixed(event);
                this._mousedownHandler(event);
            },

            /**
             * Method: touchmove
             * Touch 移动响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            touchmove: function (event) {
                event = this._zrenderEventFixed(event, true);
                this._mousemoveHandler(event);
                if (this._isDragging) {
                    SUtil.Util_event.stop(event);// 阻止浏览器默认事件，重要
                }
            },

            /**
             * Method: touchend
             * Touch 结束响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            touchend: function (event) {
                // SUtil.Util_event.stop(event);// 阻止浏览器默认事件，重要
                event = this._zrenderEventFixed(event, true);
                this._mouseupHandler(event);

                var now = new Date();
                if (now - this._lastTouchMoment < Config.EVENT.touchClickDelay) {
                    this._mobildFindFixed(event);
                    this._clickHandler(event);
                    if (now - this._lastClickMoment < Config.EVENT.touchClickDelay / 2) {
                        this._dblclickHandler(event);
                        if (this._lastHover && this._lastHover.clickable) {
                            SUtil.Util_event.stop(event);// 阻止浏览器默认事件，重要
                        }
                    }
                    this._lastClickMoment = now;
                }
                this.painter.clearHover();
            }
        };

        initDomHandler(this);

        // 初始化，事件绑定，支持的所有事件都由如下原生事件计算得来
        if (window.addEventListener) {
            window.addEventListener('resize', this._resizeHandler);

            if (SUtil.Util_env.os.tablet || SUtil.Util_env.os.phone) {
                // mobile支持
                root.addEventListener('touchstart', this._touchstartHandler);
                root.addEventListener('touchmove', this._touchmoveHandler);
                root.addEventListener('touchend', this._touchendHandler);
            } else {
                // mobile的click/move/up/down自己模拟
                root.addEventListener('click', this._clickHandler);
                root.addEventListener('dblclick', this._dblclickHandler);
                root.addEventListener('mousewheel', this._mousewheelHandler);
                root.addEventListener('mousemove', this._mousemoveHandler);
                root.addEventListener('mousedown', this._mousedownHandler);
                root.addEventListener('mouseup', this._mouseupHandler);
            }
            root.addEventListener('DOMMouseScroll', this._mousewheelHandler);
            root.addEventListener('mouseout', this._mouseoutHandler);
        } else {
            window.attachEvent('onresize', this._resizeHandler);

            root.attachEvent('onclick', this._clickHandler);
            //root.attachEvent('ondblclick ', this._dblclickHandler);
            root.ondblclick = this._dblclickHandler;
            root.attachEvent('onmousewheel', this._mousewheelHandler);
            root.attachEvent('onmousemove', this._mousemoveHandler);
            root.attachEvent('onmouseout', this._mouseoutHandler);
            root.attachEvent('onmousedown', this._mousedownHandler);
            root.attachEvent('onmouseup', this._mouseupHandler);
        }

        // 辅助函数 start
        /**
         * Method: bind1Arg
         * bind 一个参数的 function。
         *
         * Parameters:
         * handler - {Function} 要 bind 的 function。
         * context - {Object} 运行时 this 环境。
         *
         * Returns:
         * {Function}
         */
        function bind1Arg(handler, context) {
            return function (e) {
                return handler.call(context, e);
            };
        }

        /*
         // bind 两个参数的 function
         function bind2Arg(handler, context) {
         return function (arg1, arg2) {
         return handler.call(context, arg1, arg2);
         };
         }
         */

        // bind 三个参数的 function
        function bind3Arg(handler, context) {
            return function (arg1, arg2, arg3) {
                return handler.call(context, arg1, arg2, arg3);
            };
        }

        /**
         * Method: initDomHandler
         * 为控制类实例初始化 dom 事件处理函数。
         *
         * Parameters:
         * instance - {<SuperMap.LevelRenderer.Handler>} 控制类实例 。
         *
         * Returns:
         * {Function}
         */
        function initDomHandler(instance) {
            var domHandlerNames = [
                'resize', 'click', 'dblclick',
                'mousewheel', 'mousemove', 'mouseout', 'mouseup', 'mousedown',
                'touchstart', 'touchend', 'touchmove'
            ];

            var len = domHandlerNames.length;
            while (len--) {
                var name = domHandlerNames[len];
                instance['_' + name + 'Handler'] = bind1Arg(domHandlers[name], instance);
            }
        }

        /**
         * Method: findHover
         * 迭代函数，查找 hover 到的图形元素并即时做些事件分发。
         *
         * Parameters:
         * shape - {Object} 图形。
         * x - {Number} 鼠标 x。
         * y - {Number} 鼠标 y。
         *
         * Returns:
         * {Boolean} 是否找到图形。
         *
         */
        function findHover(shape, x, y) {
            var me = this;
            if (
                (me._draggingTarget && me._draggingTarget.id == shape.id) // 迭代到当前拖拽的图形上
                || shape.isSilent() // 打酱油的路过，啥都不响应的shape~
            ) {
                return false;
            }

            var event = me._event;
            if (shape.isCover(x, y)) {
                if (shape.hoverable) {
                    // SMIC-修改 - start
                    if (shape.isHoverByRefDataID && shape.isHoverByRefDataID === true) {
                        if (shape.refDataID) {
                            var fid = shape.refDataID;
                            //me.painter.clearHover();
                            //me.storage.delHover();

                            var hoverGroup = null;
                            if (shape.refDataHoverGroup) {
                                hoverGroup = shape.refDataHoverGroup;
                            }

                            //查找同一个用户数据 feature 的所有图形
                            var shapeList = me.storage._shapeList;
                            for (var i = 0, len = shapeList.length; i < len; i++) {
                                var si = shapeList[i];
                                if (si.refDataID && fid === si.refDataID) {
                                    if (hoverGroup) {
                                        if (si.refDataHoverGroup && hoverGroup === si.refDataHoverGroup) {
                                            me.storage.addHover(si);
                                        }
                                    } else {
                                        me.storage.addHover(si);
                                    }
                                }
                            }
                        }
                    } else {
                        me.storage.addHover(shape);
                    }
                    //初始代码：
                    //  me.storage.addHover(shape);
                    // SMIC-修改 - end
                }
                // 查找是否在 clipShape 中
                var p = shape.parent;
                while (p) {
                    if (p.clipShape && !p.clipShape.isCover(me._mouseX, me._mouseY)) {
                        // 已经被祖先 clip 掉了
                        return false;
                    }
                    p = p.parent;
                }

                if (me._lastHover != shape) {
                    me._processOutShape(event);

                    // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE事件
                    me._processDragLeave(event);

                    me._lastHover = shape;

                    // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGENTER事件
                    me._processDragEnter(event);
                }

                me._processOverShape(event);

                // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGOVER
                me._processDragOver(event);

                me._hasfound = 1;

                return true;    // 找到则中断迭代查找
            }

            return false;
        }

        // 辅助函数 end
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._lastX = null;
        this._lastY = null;
        this._mouseX = null;
        this._mouseY = null;
        this._findHover = null;

        Eventful.prototype.destroy.apply(this, arguments);
    }


    /**
     * APIMethod: on
     * 自定义事件绑定。
     *
     * Parameters:
     * eventName - {string} 事件名称，resize、hover、drag 等。
     * handler - {Function} 响应函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Handler>} this。
     */
    on(eventName, handler) {
        this.bind(eventName, handler);
        return this;
    }


    /**
     * APIMethod: un
     * 自定义事件解除绑定。
     *
     * Parameters:
     * eventName - {string} 事件名称，resize、hover、drag 等。
     * handler - {Function} 响应函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Handler>} this。
     */
    un(eventName, handler) {
        this.unbind(eventName, handler);
        return this;
    }


    /**
     * APIMethod: trigger
     * 事件触发。
     *
     * Parameters:
     * eventName - {string} 事件名称，resize、hover、drag 等。
     * eventArgs - {event} dom事件对象。
     *
     */
    trigger(eventName, eventArgs) {
        var EVENT = Config.EVENT;
        switch (eventName) {
            case EVENT.RESIZE:
            case EVENT.CLICK:
            case EVENT.DBLCLICK:
            case EVENT.MOUSEWHEEL:
            case EVENT.MOUSEMOVE:
            case EVENT.MOUSEDOWN:
            case EVENT.MOUSEUP:
            case EVENT.MOUSEOUT:
                this['_' + eventName + 'Handler'](eventArgs);
                break;
        }
    }


    /**
     * APIMethod: dispose
     * 释放，解绑所有事件。
     */
    dispose() {
        var root = this.root;

        if (window.removeEventListener) {
            window.removeEventListener('resize', this._resizeHandler);

            if (SUtil.Util_env.os.tablet || SUtil.Util_env.os.phone) {
                // mobile支持
                root.removeEventListener('touchstart', this._touchstartHandler);
                root.removeEventListener('touchmove', this._touchmoveHandler);
                root.removeEventListener('touchend', this._touchendHandler);
            } else {
                // mobile的click自己模拟
                root.removeEventListener('click', this._clickHandler);
                root.removeEventListener('dblclick', this._dblclickHandler);
                root.removeEventListener('mousewheel', this._mousewheelHandler);
                root.removeEventListener('mousemove', this._mousemoveHandler);
                root.removeEventListener('mousedown', this._mousedownHandler);
                root.removeEventListener('mouseup', this._mouseupHandler);
            }
            root.removeEventListener('DOMMouseScroll', this._mousewheelHandler);
            root.removeEventListener('mouseout', this._mouseoutHandler);
        } else {
            window.detachEvent('onresize', this._resizeHandler);

            root.detachEvent('onclick', this._clickHandler);
            root.detachEvent('dblclick', this._dblclickHandler);
            root.detachEvent('onmousewheel', this._mousewheelHandler);
            root.detachEvent('onmousemove', this._mousemoveHandler);
            root.detachEvent('onmouseout', this._mouseoutHandler);
            root.detachEvent('onmousedown', this._mousedownHandler);
            root.detachEvent('onmouseup', this._mouseupHandler);
        }

        this.root = null;
        this._domHover = null;
        this.storage = null;
        this.painter = null;

        this.un();
    }


    /**
     * Method: _processDragStart
     * 拖拽开始。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragStart(event) {
        var _lastHover = this._lastHover;

        if (this._isMouseDown
            && _lastHover
            && _lastHover.draggable
            && !this._draggingTarget
            && this._mouseDownTarget == _lastHover
        ) {
            // 拖拽点击生效时长阀门，某些场景需要降低拖拽敏感度
            if (_lastHover.dragEnableTime &&
                new Date() - this._lastMouseDownMoment < _lastHover.dragEnableTime
            ) {
                return;
            }

            var _draggingTarget = _lastHover;
            this._draggingTarget = _draggingTarget;
            this._isDragging = 1;

            _draggingTarget.invisible = true;
            this.storage.mod(_draggingTarget.id);

            // 分发 Config.EVENT.DRAGSTART事件
            this._dispatchAgency(
                _draggingTarget,
                Config.EVENT.DRAGSTART,
                event
            );
            this.painter.refresh();
        }
    }


    /**
     * Method: _processDragEnter
     * 拖拽进入目标元素。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragEnter(event) {
        if (this._draggingTarget) {
            // 分发SuperMap.LevelRenderer.Config.EVENT.DRAGENTER事件
            this._dispatchAgency(
                this._lastHover,
                Config.EVENT.DRAGENTER,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDragOver
     * 拖拽在目标元素上移动。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragOver(event) {
        if (this._draggingTarget) {
            // 分发SuperMap.LevelRenderer.Config.EVENT.DRAGOVER事件
            this._dispatchAgency(
                this._lastHover,
                Config.EVENT.DRAGOVER,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDragLeave
     * 拖拽离开目标元素。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragLeave(event) {
        if (this._draggingTarget) {
            // 分发SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE事件
            this._dispatchAgency(
                this._lastHover,
                Config.EVENT.DRAGLEAVE,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDrop
     * 拖拽在目标元素上完成。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDrop(event) {
        if (this._draggingTarget) {
            this._draggingTarget.invisible = false;
            this.storage.mod(this._draggingTarget.id);
            this.painter.refresh();

            // 分发SuperMap.LevelRenderer.Config.EVENT.DROP事件
            this._dispatchAgency(
                this._lastHover,
                Config.EVENT.DROP,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDragEnd
     * 拖拽结束。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragEnd(event) {
        if (this._draggingTarget) {
            // 分发SuperMap.LevelRenderer.Config.EVENT.DRAGEND事件
            this._dispatchAgency(
                this._draggingTarget,
                Config.EVENT.DRAGEND,
                event
            );

            this._lastHover = null;
        }

        this._isDragging = 0;
        this._draggingTarget = null;
    }


    /**
     * Method: _processOverShape
     * 鼠标在某个图形元素上移动。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processOverShape(event) {
        // 分发SuperMap.LevelRenderer.Config.EVENT.MOUSEOVER事件
        this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEOVER, event);
    }


    /**
     * Method: _processOutShape
     * 鼠标离开某个图形元素。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processOutShape(event) {
        // 分发SuperMap.LevelRenderer.Config.EVENT.MOUSEOUT事件
        this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEOUT, event);
    }


    /**
     * Method: _dispatchAgency
     * 鼠标离开某个图形元素。
     *
     * Parameters:
     * targetShape - {Object} 目标图形元素。
     * eventName - {Object} 事件名称。
     * event - {Object} 事件对象。
     * draggedShape - {Object} 拖拽事件特有，当前被拖拽图形元素。
     *
     */
    _dispatchAgency(targetShape, eventName, event, draggedShape) {
        var eventHandler = 'on' + eventName;
        var eventPacket = {
            type: eventName,
            event: event,
            target: targetShape,
            cancelBubble: false
        };

        var el = targetShape;

        if (draggedShape) {
            eventPacket.dragged = draggedShape;
        }

        while (el) {
            el[eventHandler]
            && (eventPacket.cancelBubble = el[eventHandler](eventPacket));
            el.dispatch(eventName, eventPacket);

            el = el.parent;

            if (eventPacket.cancelBubble) {
                break;
            }
        }

        if (targetShape) {
            // 冒泡到顶级 zrender 对象
            if (!eventPacket.cancelBubble) {
                this.dispatch(eventName, eventPacket);
            }
        } else if (!draggedShape) {
            // 无hover目标，无拖拽对象，原生事件分发
            this.dispatch(eventName, {
                type: eventName,
                event: event
            });
        }
    }


    /**
     * Method: _iterateAndFindHover
     * 迭代寻找 hover shape。
     *
     */
    _iterateAndFindHover() {
        var invTransform = SUtil.Util_matrix.create();

        var list = this.storage.getShapeList();
        var currentZLevel;
        var currentLayer;
        var tmp = [0, 0];
        for (var i = list.length - 1; i >= 0; i--) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                currentLayer = this.painter.getLayer(shape.zlevel, currentLayer);
                tmp[0] = this._mouseX;
                tmp[1] = this._mouseY;

                if (currentLayer.needTransform) {
                    SUtil.Util_matrix.invert(invTransform, currentLayer.transform);
                    SUtil.Util_vector.applyTransform(tmp, tmp, invTransform);
                }
            }

            if (this._findHover(shape, tmp[0], tmp[1])) {
                break;
            }
        }
    }


    /**
     * Method: _mobildFindFixed
     * touch 有指尖错觉，四向尝试，让touch上的点击更好触发事件。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _mobildFindFixed(event) {
        // touch指尖错觉的尝试偏移量配置
        var MOBILE_TOUCH_OFFSETS = [
            {x: 10},
            {x: -20},
            {x: 10, y: 10},
            {y: -20}
        ];

        this._lastHover = null;
        this._mouseX = event.zrenderX;
        this._mouseY = event.zrenderY;

        this._event = event;

        this._iterateAndFindHover();

        for (var i = 0; !this._lastHover && i < MOBILE_TOUCH_OFFSETS.length; i++) {
            var offset = MOBILE_TOUCH_OFFSETS[i];
            offset.x && (this._mouseX += offset.x);
            offset.y && (this._mouseX += offset.y);

            this._iterateAndFindHover();
        }

        if (this._lastHover) {
            event.zrenderX = this._mouseX;
            event.zrenderY = this._mouseY;
        }
    }


    /**
     * Method: _zrenderEventFixed
     * 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标 。
     *
     * Parameters:
     * event - {Object} 事件。
     * isTouch - {Boolean} 是否触摸。
     *
     */
    _zrenderEventFixed(event, isTouch) {
        if (event.zrenderFixed) {
            return event;
        }

        if (!isTouch) {
            event = event || window.event;
            // 进入对象优先~
            var target = event.toElement
                || event.relatedTarget
                || event.srcElement
                || event.target;

            if (target && target != this._domHover) {
                event.zrenderX = (typeof event.offsetX != 'undefined'
                    ? event.offsetX
                    : event.layerX)
                    + target.offsetLeft;
                event.zrenderY = (typeof event.offsetY != 'undefined'
                    ? event.offsetY
                    : event.layerY)
                    + target.offsetTop;
            }
        } else {
            var touch = event.type != 'touchend'
                ? event.targetTouches[0]
                : event.changedTouches[0];
            if (touch) {
                var rBounding = this.root.getBoundingClientRect();
                // touch事件坐标是全屏的~
                event.zrenderX = touch.clientX - rBounding.left;
                event.zrenderY = touch.clientY - rBounding.top;
            }
        }

        event.zrenderFixed = 1;
        return event;
    }


    // SMIC-方法扩展 - start
    /**
     * Method: getLastHoverOne
     * 获取单个高亮图形。
     *
     */
    getLastHoverOne() {
        if (this._lastHover) {
            return this._lastHover;
        }
        return null;
    }

    // SMIC-方法扩展 - end

}