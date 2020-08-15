export function mockCreateTile() {
    spyOn(L.TileLayer.prototype, 'createTile').and.callFake(function (coords, done) {
        var tile = document.createElement('img');

        L.DomEvent.on(tile, 'load', L.Util.bind(this._tileOnLoad, this, done, tile));
        L.DomEvent.on(tile, 'error', L.Util.bind(this._tileOnError, this, done, tile));

        if (this.options.crossOrigin || this.options.crossOrigin === '') {
            tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
        }
        tile.alt = '';
        tile.setAttribute('role', 'presentation');
        this.getTileUrl(coords);
        return tile;
    });
}
export function mockInitImage() {
    spyOn(L.ImageOverlay.prototype, '_initImage').and.callFake(function () {
        this._image = L.DomUtil.create('img');
        var me = this;
        setTimeout(function () {
            me.fire('load', {});
        }, 1000);
    });
}
