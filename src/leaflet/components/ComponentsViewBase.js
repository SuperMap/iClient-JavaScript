/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';

/**
 * @class L.supermap.components.componentsViewBase
 * @classdesc Lealfet 组件基类。
 * @category Components Common
 * @version 9.1.1
 * @param {Object} options - 参数。
 * @param {string} [options.position='topright'] - 组件在地图中显示的位置，包括：'topleft'，'topright'，'bottomleft' 和 'bottomright'，继承自 leaflet control。
 * @param {function} [options.style] - 设置图层点线面默认样式，点样式返回 maker 或者 circleMaker；线和面返回 L.path 样式。
 * @param {function} [options.onEachFeature] - 在创建和设置样式后，将为每个创建的要素调用一次的函数。用于将事件和弹出窗口附加到要素。默认情况下，对新创建的图层不执行任何操作。
 * @extends {L.Control}
 */
export var ComponentsViewBase = L.Control.extend({
    options: {
        //控件位置 继承自leaflet control
        position: 'topright',
        //默认样式，以支持组件设置图层基本样式
        style: (feature, latLng) => {
            if (latLng /*&& feature instanceof L.latLng || feature.geometry.type.toLowerCase() === "point"*/) {
                return L.circleMarker(latLng, {
                    fillColor: 'blue',
                    weight: 1,
                    opacity: 1,
                    color: 'blue',
                    fillOpacity: 0.6
                });
            } else {
                return {
                    fillColor: 'blue',
                    weight: 1,
                    opacity: 1,
                    color: 'blue',
                    fillOpacity: 0.6
                }
            }
        },
        onEachFeature: null
    },

    initialize(options) {
        L.setOptions(this, options);
        //组件事件处理对象：//todo 确认一些公开或私有的成员变量
        this._event = new L.Evented();
        //组件根 dom 元素：
        this.rootContainer = null;
        //图层参数，主要配置组件返回数据图层的样式和事件等
    },

    /**
     * @function L.supermap.components.componentsViewBase.prototype.onAdd
     * @description 向地图添加组件。
     */
    onAdd(map) {
        //子类实现此方法
        this.map = map;
        this.rootContainer = this._initView();
        return this.rootContainer;
    },

    /**
     * @function L.supermap.components.componentsViewBase.prototype.on
     * @param {string} eventType - 监听的事件类型。
     * @param {Function} callback - 监听事件的回调函数。
     */
    on(eventType, callback) {
        this._event.on(eventType, callback);
    },

    /**
     * @function L.supermap.components.componentsViewBase.prototype.off
     * @description 事件关闭。
     * @param {string} eventType - 监听的事件名。
     * @param {Function} callback - 监听事件的回调函数。
     */
    off(eventType, callback) {
        this._event.off(eventType, callback);
    },

    /**
     * @function L.supermap.components.componentsViewBase.prototype._initView
     * @description 初始化组件 UI。
     * @private
     */
    _initView() {
        //子类实现此方法
    },

    /**
     * @function L.supermap.components.componentsViewBase.prototype._preventMapEvent
     * @description 阻止 map 默认事件。
     * @private
     */
    _preventMapEvent(div, map) {
        if (!div || !map) {
            return;
        }
        div.addEventListener('mouseover', function () {
            map.dragging.disable();
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
        });
        div.addEventListener('mouseout', function () {
            map.dragging.enable();
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();
        });
    }

});

export var componentsViewBase = function (options) {
    return new ComponentsViewBase(options);
};

L.supermap.components.componentsViewBase = componentsViewBase;