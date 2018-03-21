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

        let layers = this.getLayers().getArray();
        let resolution = this.getView().getResolution();
        let coordinate = this.getCoordinateFromPixel(pixel);
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].getSource()._forEachFeatureAtCoordinate) {
                layers[i].getSource()._forEachFeatureAtCoordinate(coordinate, resolution, callback, pixel);
            }
        }
    }
}();