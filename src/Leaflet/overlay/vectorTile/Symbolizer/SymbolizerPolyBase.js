var PolyBase = {
    _makeFeatureParts: function (feat, pxPerExtent) {
        pxPerExtent = pxPerExtent || {x: 1, y: 1};
        var rings = feat.geometry;
        var coord;

        this._parts = [];
        for (var i = 0; i < rings.length; i++) {
            var ring = rings[i];
            var part = [];
            for (var j = 0; j < ring.length; j++) {
                coord = ring[j];
                part.push(L.point(coord).scaleBy(pxPerExtent));
            }
            this._parts.push(part);
        }
    },

    makeInteractive: function () {
        this._pxBounds = this._getPixelBounds();
    }
};

module.exports = PolyBase;
