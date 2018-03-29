import ol from 'openlayers';

/**
 * @function MapExtend
 * @description 扩展openlayers的一些原始方法
 * @private
 */
export var MapExtend = function () {
    ol.Map.prototype.forEachFeatureAtPixelDefault = ol.Map.prototype.forEachFeatureAtPixel;

    ol.Map.prototype.forEachFeatureAtPixel = function (pixel, callback, opt_options) {

        //如果满足高性能图层选取要求优先返回高性能图层选中结果
        const layerFilter = (opt_options && opt_options.layerFilter) ? opt_options.layerFilter : () => {
            return true;
        };

        const layers = this.getLayers().getArray();
        const resolution = this.getView().getResolution();
        const coordinate = this.getCoordinateFromPixel(pixel);
        for (let i = 0; i < layers.length; i++) {
            if (layerFilter.call(null, layers[i]) && layers[i].getSource()._forEachFeatureAtCoordinate) {
                return layers[i].getSource()._forEachFeatureAtCoordinate(coordinate, resolution, callback, pixel);
            }
        }

        return this.forEachFeatureAtPixelDefault(pixel, callback, opt_options);

    }
}();