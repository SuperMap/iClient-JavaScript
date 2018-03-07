import mapboxgl from 'mapbox-gl';
import '../core/Base';

/**
 * @function mapboxgl.supermap.MapExtend
 * @description 扩展了mapboxgl.Map对图层相关的操作
 * @private
 */
export var MapExtend = function () {

    mapboxgl.Map.prototype.overlayLayersManager = {};

    mapboxgl.Map.prototype.addLayer = function (layer, before) {
        if (layer.source) {
            this.style.addLayer(layer, before);
            this._update(true);
            return this;
        }
        if (this.overlayLayersManager[layer.id] || this.style._layers[layer.id]) {
            this.fire('error', {error: new Error('A layer with this id already exists.')});
            return;
        }
        addLayer(layer, this);
        this.overlayLayersManager[layer.id] = layer;
        return this;
    };
    mapboxgl.Map.prototype.getLayer = function (id) {
        if (this.overlayLayersManager[id]) {
            return this.overlayLayersManager[id];
        }
        return this.style.getLayer(id);
    };

    mapboxgl.Map.prototype.moveLayer = function (id, beforeId) {
        if (this.overlayLayersManager[id]) {
            moveLayer(id, beforeId);
            return this;
        }
        if (this.style._layers[id]) {
            this.style.moveLayer(id, beforeId);
            this._update(true);
            return this;
        }
    };

    mapboxgl.Map.prototype.removeLayer = function (id) {
        if (this.overlayLayersManager[id]) {
            removeLayer(this.overlayLayersManager[id]);
            delete this.overlayLayersManager[id];
            return this;
        }
        this.style.removeLayer(id);
        this._update(true);
        return this;
    };

    //目前扩展的overlayer，只支持 显示或隐藏图层操作
    mapboxgl.Map.prototype.setLayoutProperty = function (layerID, name, value) {
        if (this.overlayLayersManager[layerID]) {
            if (name === "visibility") {
                if (value === "block") {
                    value = true;
                } else {
                    value = false;
                }
                setVisibility(this.overlayLayersManager[layerID], value);
            }
            return this;
        }
        this.style.setLayoutProperty(layerID, name, value);
        this._update(true);
        return this;
    };

    function addLayer(layer, map) {
        layer.onAdd(map);
    }

    /**
     * @function mapboxgl.supermap.MapExtend.prototype.removeFromMap
     * @description 移除事件
     */
    function removeLayer(layer) {
        layer.removeFromMap();
    }

    /**
     * @function mapboxgl.supermap.MapExtend.prototype.setVisibility
     * @description 设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
     * @param visibility - {string} 是否显示图层（当前地图的resolution在最大最小resolution之间）。
     */
    function setVisibility(layer, visibility) {
        layer.setVisibility(visibility);
    }

    /**
     * @function mapboxgl.supermap.MapExtend.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param layerID - {string} 待插入的图层ID。
     * @param beforeLayerID - {boolean} 是否将本图层插入到图层id为layerID的图层之前(默认为true，如果为false则将本图层插入到图层id为layerID的图层之后)。
     */
    function moveLayer(layerID, beforeLayerID) {
        var layer = document.getElementById(layerID);
        // var beforeLayer;
        if (beforeLayerID) {
            var beforeLayer = document.getElementById(beforeLayerID);
            if (!beforeLayer) {
                mapboxgl.Evented.prototype.fire("error", {error: new Error(`Layer with id "${beforeLayerID}" does not exist on this document.`)});
            }
        }
        if (layer && beforeLayer) {
            beforeLayer.parentNode.insertBefore(layer, beforeLayer);
        } else {
            //当没有传入beforeLayerID ，则默认将图层移动到最上面
            layer.parentNode.appendChild(layer);
        }
    }

}();