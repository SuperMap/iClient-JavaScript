import ol from 'openlayers';

/**
 * @function MapExtend
 * @description 扩展openlayers的一些原始方法
 * @private
 */
export var MapExtend = function () {
    ol.Map.prototype.forEachFeatureAtPixelDefault = ol.Map.prototype.forEachFeatureAtPixel;

    ol.Map.prototype.forEachFeatureAtPixel = function (pixel, callback, opt_options) {

        this.forEachFeatureAtPixelDefault(pixel, callback, opt_options);

        const layerFilter = (opt_options && opt_options.layerFilter) ? opt_options.layerFilter : () => {
            return true;
        };

        const layers = this.getLayers().getArray();
        const resolution = this.getView().getResolution();
        const coordinate = this.getCoordinateFromPixel(pixel);
        for (let i = 0; i < layers.length; i++) {
            if (layerFilter.call(null, layers[i]) && layers[i].getSource()._forEachFeatureAtCoordinate) {
                layers[i].getSource()._forEachFeatureAtCoordinate(coordinate, resolution, callback, pixel);
            }
        }
    }
}();