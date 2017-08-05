import {Symbolizer} from './Symbolizer';
import L from "leaflet";
import {PolyBase} from './SymbolizerPolyBase';

export var RegionSymbolizer = L.Polygon.extend({
    includes: [Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    render: function (renderer, style) {
        Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    }
});