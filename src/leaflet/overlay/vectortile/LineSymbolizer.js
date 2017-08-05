import L from "leaflet";
import {Symbolizer} from './Symbolizer';
import {PolyBase} from './SymbolizerPolyBase';

export var LineSymbolizer = L.Polyline.extend({
    includes: [Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    render: function (renderer, style) {
        style.fill = false;
        Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    },

    updateStyle: function (renderer, style) {
        style.fill = false;
        Symbolizer.prototype.updateStyle.call(this, renderer, style);
    }
});