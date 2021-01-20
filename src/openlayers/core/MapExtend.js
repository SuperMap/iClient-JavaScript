/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import olMap from 'ol/Map';
import LayerGroup from 'ol/layer/Group';

/**
 * @function MapExtend
 * @description 扩展 OpenLayers 的一些原始方法。
 * @private
 */
export var MapExtend = function () {
    const fun = function (layer, coordinate, resolution, callback, pixel, e) {
        if (layer instanceof LayerGroup) {
            layer.getLayers().forEach(function (subLayer) {
                fun(subLayer, coordinate, resolution, callback, pixel, e)
            });
        } else {
            //当前高效率点图层满足筛选条件/并且可视时，可被选中：
            if (layer.getSource()._forEachFeatureAtCoordinate) {
                layer.getSource()._forEachFeatureAtCoordinate(coordinate, resolution, (feature) => {
                    callback(feature, layer)
                }, pixel, e);
            }
        }
    }
    olMap.prototype.forEachFeatureAtPixelDefault = olMap.prototype.forEachFeatureAtPixel;

    olMap.prototype.forEachFeatureAtPixel = olMap.prototype.Tc = function (pixel, callback, opt_options, e) {

        //如果满足高效率图层选取要求优先返回高效率图层选中结果
        const layerFilter = (opt_options && opt_options.layerFilter) ? opt_options.layerFilter : () => {
            return true;
        };

        const layers = this.getLayers().getArray();
        const resolution = this.getView().getResolution();
        const coordinate = this.getCoordinateFromPixel(pixel);

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer.getVisible() && layerFilter.call(null, layer)) {
                fun(layer, coordinate, resolution, callback, pixel, e)
            }

        }
        return this.forEachFeatureAtPixelDefault(pixel, callback, opt_options);
    }
}();