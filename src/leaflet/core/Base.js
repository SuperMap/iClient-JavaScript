/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import './Proj4Leaflet';
import Attributions from './Attributions';

L.Control.Attribution.include({
    options: {
        position: 'bottomright',
        prefix: Attributions.Prefix
    }
});
L.Map.include({
    /*
      * 获取精确的像素坐标.
      * 当需要绘制比较平滑的曲线的时候可调用此方法代替latLngToContainerPoint
      * @param latlng
    */
    latLngToAccurateContainerPoint: function (latlng) {
        var projectedPoint = this.project(L.latLng(latlng));
        var layerPoint = projectedPoint._subtract(this.getPixelOrigin());
        return L.point(layerPoint).add(this._getMapPanePos());
    }
});

var projectionNames = ['EPSG4326', 'EPSG3857', 'EPSG3395', 'EPSG900913'];

projectionNames.forEach(function (projectionName) {
  L.Util.extend(L.CRS[projectionName], {
    curScale: null,
    preZoom: 0,
    latLngToPoint: function (latlng, zoom) {
      var projectedPoint = this.projection.project(latlng);
      var scale;
      if (this.curScale && this.prevZoom === zoom) {
        scale = this.curScale;
      } else {
        scale = this.scale(zoom);
        this.curScale = scale;
        this.prevZoom = zoom;
      }
      return this.transformation._transform(projectedPoint, scale);
    }
  });
});

L.Polyline.include({
  dirtyBounds: false,
  getBounds: function () {
    if (this.dirtyBounds && this._latlngs) {
      this._bounds = new L.latLngBounds();
      for (var i = 0, len = this._latlngs.length; i < len; i++) {
          this._bounds.extend(this._latlngs[i]);
      }
      this.dirtyBounds = false;
    }
    return this._bounds;
  },
  addLatLng: function (latlng, latlngs) {
    latlngs = latlngs || this._defaultShape();
    latlng = toLatLng(latlng);
    latlngs.push(latlng);
    this.dirtyBounds = true;
    return this.redraw();
  },
  _setLatLngs: function (latlngs) {
    this._latlngs = this._convertLatLngs(latlngs);
  },
  _convertLatLngs: function (latlngs) {
    var result = [],
      flat = L.LineUtil.isFlat(latlngs);

    for (var i = 0, len = latlngs.length; i < len; i++) {
      if (flat) {
        result[i] = toLatLng(latlngs[i]);
        this.dirtyBounds = true;
      } else {
        result[i] = this._convertLatLngs(latlngs[i]);
      }
    }
    return result;
  },
  _project: function () {
    var pxBounds = new L.Bounds();
    this._rings = [];
    this._projectLatlngs(this._latlngs, this._rings, pxBounds);
    if (pxBounds.isValid()) {
      this._rawPxBounds = pxBounds;
      this._updateBounds();
    }
  }
});

L.GeoJSON.include({
  initialize: function (geojson, options) {
    L.Util.setOptions(this, options);
    this._layers = {};
    this.defaultGeometryOptions = {};
    if (geojson) {
      this.addData(geojson);
    }
  },
  addData: function (geojson) {
    var features = Array.isArray(geojson) ? geojson : geojson.features,
      i, len, feature;

    if (features) {
      for (i = 0, len = features.length; i < len; i++) {
        feature = features[i];
        if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
          this.addData(feature);
        }
      }
      return this;
    }

    var options = this.options;

    if (options.filter && !options.filter(geojson)) { return this; }
    var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson;
    var layer = L.GeoJSON.geometryToLayer(geojson, options);
    if (!layer) {
      return this;
    }
    layer.feature = L.GeoJSON.asFeature(geojson);

    layer.defaultOptions = layer.options;
    if (this.defaultGeometryOptions) {
      var defaultGeometryOptions = this.defaultGeometryOptions[geometry.type];
      if (defaultGeometryOptions) {
        layer.commonOptions = Object.assign({}, defaultGeometryOptions);
      } else {
        this.defaultGeometryOptions[geometry.type] = L.Util.extend({}, layer.defaultOptions);
      }
    }
    this.resetStyle(layer);

    if (options.onEachFeature) {
      options.onEachFeature(geojson, layer);
    }

    return this.addLayer(layer);
  },
  resetStyle: function (layer) {
    if (layer === undefined) {
      return this.eachLayer(this.resetStyle, this);
    }
    if (layer.commonOptions) {
      layer.options = layer.commonOptions
    } else {
      layer.options = L.Util.extend({}, layer.defaultOptions);
    }
    this._setLayerStyle(layer, this.options.style);
    return this;
  }
});

wrapToGeoJSON([L.Polyline, L.Polygon, L.Marker, L.CircleMarker, L.Circle, L.LayerGroup]);

function wrapToGeoJSON(objClassArray) {
  objClassArray.map((objClass) => {
    objClass.defaultFunction = objClass.prototype.toGeoJSON;
    objClass.include({
      toGeoJSON: function (precision) {
        return objClass.defaultFunction.call(this, precision || L.toGeoJSONPrecision || 15);
      }
    })
    return objClass;
  })
}

function toLatLng(a, b, c) {
  if (a instanceof L.latLng) {
    return a;
  }
  if (Array.isArray(a) && typeof a[0] !== 'object') {
    if (a.length === 3) {
      return new L.latLng(a[0], a[1], a[2]);
    }
    if (a.length === 2) {
      return new L.latLng(a[0], a[1]);
    }
    return null;
  }
  if (a === undefined || a === null) {
    return a;
  }
  if (typeof a === 'object' && 'lat' in a) {
    return new L.latLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
  }
  if (b === undefined) {
    return null;
  }
  return new L.latLng(a, b, c);
}