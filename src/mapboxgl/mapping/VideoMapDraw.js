import proj4 from 'proj4';
import mapboxgl from 'mapbox-gl';
import distance from '@turf/distance';
import center from '@turf/center';
import area from '@turf/area';
import { Lang } from '@supermapgis/iclient-common/lang/Lang';

const SOURCE_ID = 'sm-videomap-draw';
const PREVIEW_SOURCE_ID = 'sm-videomap-draw-preview';
const DRAW_TYPES = ['Point', 'LineString', 'Polygon'];
const SELECT_COLOR = '#fbb03b';
const DEFAULT_COLOR = '#1890ff';
const MEASURE_LABEL_MS = 3000;

const DEFAULT_STYLES = {
  point: {
    'circle-radius': 5,
    'circle-color': DEFAULT_COLOR,
    'circle-opacity': 1,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  },
  line: {
    'line-color': DEFAULT_COLOR,
    'line-width': 2,
    'line-opacity': 1
  },
  polygon: {
    'fill-color': DEFAULT_COLOR,
    'fill-opacity': 0.25,
    'line-color': DEFAULT_COLOR,
    'line-width': 2,
    'line-opacity': 1
  },
  selected: {
    color: SELECT_COLOR
  }
};

// 选中时覆盖的颜色属性
const SELECTABLE_COLOR_PROPS = ['circle-color', 'line-color', 'fill-color'];

const PREVIEW_PROPS = {
  point: ['circle-radius', 'circle-color', 'circle-opacity', 'circle-stroke-width', 'circle-stroke-color'],
  line: ['line-color', 'line-width', 'line-opacity', 'line-dasharray'],
  polygon: ['fill-color', 'fill-opacity', 'line-color', 'line-width', 'line-opacity', 'line-dasharray']
};

function mergeStyles(base, styles) {
  const merged = {};
  Object.keys(DEFAULT_STYLES).forEach((key) => {
    const custom = styles && styles[key];
    const allowed = DEFAULT_STYLES[key];
    merged[key] = Object.assign({}, base[key]);
    if (custom && typeof custom === 'object') {
      Object.keys(custom).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(allowed, prop) || prop === 'line-dasharray') {
          merged[key][prop] = custom[prop];
        }
      });
    }
  });
  merged.preview = {};
  Object.keys(PREVIEW_PROPS).forEach((key) => {
    const custom = styles && styles.preview && styles.preview[key];
    merged.preview[key] = Object.assign({}, base.preview && base.preview[key]);
    if (custom && typeof custom === 'object') {
      PREVIEW_PROPS[key].forEach((prop) => {
        if (custom[prop] !== undefined) {
          merged.preview[key][prop] = custom[prop];
        }
      });
    }
  });
  return merged;
}

function buildPaint(styles, group, prefixes) {
  const styleGroup = styles[group];
  const paint = {};
  Object.keys(styleGroup).forEach((prop) => {
    if (prefixes.some((prefix) => prop.indexOf(prefix) === 0)) {
      paint[prop] =
        SELECTABLE_COLOR_PROPS.indexOf(prop) > -1 ? paintBySelected(styleGroup[prop], styles.selected.color) : styleGroup[prop];
    }
  });
  return paint;
}

const MODE_SIMPLE_SELECT = 'simple_select';
const MODE_DIRECT_SELECT = 'direct_select';
const MODE_DRAW_POINT = 'draw_point';
const MODE_DRAW_LINE_STRING = 'draw_line_string';
const MODE_DRAW_POLYGON = 'draw_polygon';

const TYPE_TO_MODE = {
  Point: MODE_DRAW_POINT,
  LineString: MODE_DRAW_LINE_STRING,
  Polygon: MODE_DRAW_POLYGON
};

const MODE_TO_TYPE = {
  [MODE_DRAW_POINT]: 'Point',
  [MODE_DRAW_LINE_STRING]: 'LineString',
  [MODE_DRAW_POLYGON]: 'Polygon'
};

function emptyCollection() {
  return { type: 'FeatureCollection', features: [] };
}

function sameCoord(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1] && (a[2] || 0) === (b[2] || 0);
}

function toDrawCoord(spatial) {
  if (!spatial || spatial.length < 2) {
    return null;
  }
  const lngLat = proj4('EPSG:3857', 'EPSG:4326', [spatial[0], spatial[1]]);
  if (spatial.length > 2) {
    return [lngLat[0], lngLat[1], spatial[2]];
  }
  return lngLat;
}

function paintBySelected(idleColor, selectedColor) {
  return ['case', ['boolean', ['get', 'selected'], false], selectedColor, idleColor];
}

function lngLatOf(coord) {
  return [coord[0], coord[1]];
}

function formatLength(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)}${Lang.i18n('text_videoMapUnitKilometer')}`;
  }
  return `${meters.toFixed(1)}${Lang.i18n('text_videoMapUnitMeter')}`;
}

function formatArea(squareMeters) {
  if (squareMeters >= 1000000) {
    return `${(squareMeters / 1000000).toFixed(2)}${Lang.i18n('text_videoMapUnitSquareKilometer')}`;
  }
  return `${squareMeters.toFixed(1)}${Lang.i18n('text_videoMapUnitSquareMeter')}`;
}

/**
 * @class VideoMapDraw
 * @private
 * @classdesc 视频地图点、线、面标绘。顶点按真实地理坐标保存，随相机更新重投影。
 * 交互模式对齐 mapbox-gl-draw：`simple_select` / `draw_point` / `draw_line_string` / `draw_polygon`，
 * `direct_select` 预留给后续顶点编辑。
 */
export default class VideoMapDraw {
  constructor(videoMap, options) {
    this.videoMap = videoMap;
    this._styles = mergeStyles(DEFAULT_STYLES, options && options.styles);
    this.mode = null;
    this.vertices = [];
    this.features = [];
    this.selectedIds = [];
    this._featureSeq = 0;
    this._onClick = this._onClick.bind(this);
    this._onDblClick = this._onDblClick.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._measurePopups = [];
    this._measureTimer = null;
  }

  activate() {
    this._ensureLayers();
    this._bind();
  }

  start(type) {
    if (DRAW_TYPES.indexOf(type) === -1) {
      throw new Error("draw type must be 'Point', 'LineString' or 'Polygon'");
    }
    this._clearMeasureLabels();
    this._ensureLayers();
    this._resetDraft();
    this._setSelectedIds([]);
    this.mode = type;
    this._applyPreviewStyle();
    this._setCursor('crosshair');
    this._setDoubleClickZoom(type === 'Point');
    this._bind();
    this.videoMap.fire('drawstart', { type, mode: this.getUiMode() });
    this._emitModeChange();
    this._emitUpdate();
  }

  changeMode(mode, options) {
    const type = MODE_TO_TYPE[mode];
    if (type) {
      this.start(type);
      return;
    }
    if (mode === MODE_DIRECT_SELECT) {
      const featureId = options && options.featureId;
      this._enterSelect(featureId ? [featureId] : this.selectedIds.slice());
      return;
    }
    this._enterSelect(options && options.featureIds);
  }

  finish() {
    if (!this.mode || this.mode === 'Point') {
      return null;
    }
    this._dedupeLastVertex();
    const feature = this._createFeature(this.mode, this.vertices);
    if (!feature) {
      return null;
    }
    return this._completeFeature(feature);
  }

  cancel() {
    const hadMode = !!this.mode;
    this._resetDraft();
    this.mode = null;
    this._setCursor('');
    this._setDoubleClickZoom(true);
    if (hadMode) {
      this.videoMap.fire('drawcancel');
      this._emitModeChange();
      this._emitUpdate();
    }
  }

  clear() {
    this._clearMeasureLabels();
    this._resetDraft();
    this.features = [];
    this._setSelectedIds([]);
    this._syncResult();
    this.videoMap.fire('drawclear');
    this._emitUpdate();
  }

  delete(ids) {
    const targetIds = ids == null ? this.selectedIds.slice() : [].concat(ids);
    if (!targetIds.length) {
      return this.getData();
    }
    const idMap = {};
    targetIds.forEach((id) => {
      idMap[id] = true;
    });
    const removed = this.features.filter((feature) => idMap[feature.id]);
    this.features = this.features.filter((feature) => !idMap[feature.id]);
    this._setSelectedIds(this.selectedIds.filter((id) => !idMap[id]));
    this._syncResult();
    this.videoMap.fire('drawdelete', { features: removed, data: this.getData() });
    this._emitUpdate();
    return this.getData();
  }

  getData() {
    return {
      type: 'FeatureCollection',
      features: this.features.slice()
    };
  }

  getLiveData(cursor) {
    return {
      type: 'FeatureCollection',
      features: this.features.concat(this._draftFeatures(cursor))
    };
  }

  getMode() {
    return this.mode;
  }

  getUiMode() {
    return TYPE_TO_MODE[this.mode] || MODE_SIMPLE_SELECT;
  }

  getSelectedIds() {
    return this.selectedIds.slice();
  }

  getSelected() {
    const selected = {};
    this.selectedIds.forEach((id) => {
      selected[id] = true;
    });
    return {
      type: 'FeatureCollection',
      features: this.features.filter((feature) => selected[feature.id])
    };
  }

  getStyles() {
    return JSON.parse(JSON.stringify(this._styles));
  }

  setStyles(styles) {
    this._styles = mergeStyles(this._styles, styles);
    const map = this.videoMap.map;
    if (!map || !map.getLayer(`${SOURCE_ID}-point`)) {
      return;
    }
    const layers = {
      [`${SOURCE_ID}-point`]: buildPaint(this._styles, 'point', ['circle-']),
      [`${SOURCE_ID}-line`]: buildPaint(this._styles, 'line', ['line-']),
      [`${SOURCE_ID}-fill`]: buildPaint(this._styles, 'polygon', ['fill-']),
      [`${SOURCE_ID}-polygon-line`]: buildPaint(this._styles, 'polygon', ['line-'])
    };
    Object.keys(layers).forEach((layerId) => {
      Object.keys(layers[layerId]).forEach((prop) => {
        map.setPaintProperty(layerId, prop, layers[layerId][prop]);
      });
    });
    this._applyPreviewStyle();
  }

  _applyPreviewStyle() {
    const map = this.videoMap.map;
    if (!map || !map.getLayer(`${PREVIEW_SOURCE_ID}-line`)) {
      return;
    }
    const isPolygon = this.mode === 'Polygon';
    const own = this._styles.preview[isPolygon ? 'polygon' : 'line'];
    const fallback = isPolygon ? this._styles.polygon : this._styles.line;
    const pick = (group, fallbackGroup, prop, defaultValue) => {
      if (group[prop] !== undefined) {
        return group[prop];
      }
      return fallbackGroup && fallbackGroup[prop] !== undefined ? fallbackGroup[prop] : defaultValue;
    };
    const lineId = `${PREVIEW_SOURCE_ID}-line`;
    map.setPaintProperty(lineId, 'line-color', pick(own, fallback, 'line-color', DEFAULT_COLOR));
    map.setPaintProperty(lineId, 'line-width', pick(own, fallback, 'line-width', 2));
    map.setPaintProperty(lineId, 'line-opacity', pick(own, fallback, 'line-opacity', 1));
    map.setPaintProperty(lineId, 'line-dasharray', pick(own, null, 'line-dasharray', [2, 1]));
    if (map.getLayer(`${PREVIEW_SOURCE_ID}-fill`)) {
      const fillId = `${PREVIEW_SOURCE_ID}-fill`;
      map.setPaintProperty(fillId, 'fill-color', pick(own, this._styles.polygon, 'fill-color', DEFAULT_COLOR));
      map.setPaintProperty(fillId, 'fill-opacity', pick(own, this._styles.polygon, 'fill-opacity', 0.25));
    }
    const pointOwn = this._styles.preview.point;
    const pointId = `${PREVIEW_SOURCE_ID}-point`;
    map.setPaintProperty(pointId, 'circle-radius', pick(pointOwn, null, 'circle-radius', 4));
    map.setPaintProperty(pointId, 'circle-color', pick(pointOwn, null, 'circle-color', '#fff'));
    map.setPaintProperty(pointId, 'circle-opacity', pick(pointOwn, null, 'circle-opacity', 1));
    map.setPaintProperty(pointId, 'circle-stroke-width', pick(pointOwn, null, 'circle-stroke-width', 2));
    map.setPaintProperty(
      pointId,
      'circle-stroke-color',
      pick(pointOwn, null, 'circle-stroke-color', this._styles.point['circle-color'])
    );
  }

  destroy() {
    this._clearMeasureLabels();
    this._unbind();
    this.mode = null;
    this.vertices = [];
    this.features = [];
    this.selectedIds = [];
    this._setCursor('');
    this._setDoubleClickZoom(true);
  }

  _enterSelect(featureIds) {
    const hadMode = !!this.mode;
    this._resetDraft();
    this.mode = null;
    this._setCursor('');
    this._setDoubleClickZoom(true);
    this._setSelectedIds(featureIds || []);
    this._ensureLayers();
    this._bind();
    if (hadMode) {
      this.videoMap.fire('drawcancel');
    }
    this._emitModeChange();
    this._emitUpdate();
  }

  _ensureLayers() {
    const videoMap = this.videoMap;
    if (!videoMap.sourceCache[SOURCE_ID]) {
      videoMap.addSource(SOURCE_ID, { type: 'geojson', data: emptyCollection() });
      videoMap.addLayer({
        id: `${SOURCE_ID}-fill`,
        type: 'fill',
        source: SOURCE_ID,
        filter: ['==', '$type', 'Polygon'],
        paint: buildPaint(this._styles, 'polygon', ['fill-'])
      });
      videoMap.addLayer({
        id: `${SOURCE_ID}-polygon-line`,
        type: 'line',
        source: SOURCE_ID,
        filter: ['==', '$type', 'Polygon'],
        paint: buildPaint(this._styles, 'polygon', ['line-'])
      });
      videoMap.addLayer({
        id: `${SOURCE_ID}-line`,
        type: 'line',
        source: SOURCE_ID,
        filter: ['==', '$type', 'LineString'],
        paint: buildPaint(this._styles, 'line', ['line-'])
      });
      videoMap.addLayer({
        id: `${SOURCE_ID}-point`,
        type: 'circle',
        source: SOURCE_ID,
        filter: ['==', '$type', 'Point'],
        paint: buildPaint(this._styles, 'point', ['circle-'])
      });
    }
    if (!videoMap.sourceCache[PREVIEW_SOURCE_ID]) {
      videoMap.addSource(PREVIEW_SOURCE_ID, { type: 'geojson', data: emptyCollection() });
      videoMap.addLayer({
        id: `${PREVIEW_SOURCE_ID}-fill`,
        type: 'fill',
        source: PREVIEW_SOURCE_ID,
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': DEFAULT_COLOR,
          'fill-opacity': 0.25
        }
      });
      videoMap.addLayer({
        id: `${PREVIEW_SOURCE_ID}-line`,
        type: 'line',
        source: PREVIEW_SOURCE_ID,
        paint: {
          'line-color': DEFAULT_COLOR,
          'line-width': 2,
          'line-dasharray': [2, 1]
        }
      });
      videoMap.addLayer({
        id: `${PREVIEW_SOURCE_ID}-point`,
        type: 'circle',
        source: PREVIEW_SOURCE_ID,
        paint: {
          'circle-radius': 4,
          'circle-color': '#fff',
          'circle-stroke-width': 2,
          'circle-stroke-color': DEFAULT_COLOR
        }
      });
    }
  }

  _bind() {
    const map = this.videoMap.map;
    if (!map || this._bound) {
      return;
    }
    map.on('click', this._onClick);
    map.on('dblclick', this._onDblClick);
    map.on('mousemove', this._onMouseMove);
    map.on('contextmenu', this._onContextMenu);
    window.addEventListener('keydown', this._onKeyDown);
    this._bound = true;
  }

  _unbind() {
    const map = this.videoMap && this.videoMap.map;
    if (map && this._bound) {
      map.off('click', this._onClick);
      map.off('dblclick', this._onDblClick);
      map.off('mousemove', this._onMouseMove);
      map.off('contextmenu', this._onContextMenu);
    }
    window.removeEventListener('keydown', this._onKeyDown);
    this._bound = false;
  }

  _onClick(e) {
    if (!e) {
      return;
    }
    if (!this.mode) {
      this._onSelectClick(e);
      return;
    }
    if (!e.lngLat) {
      return;
    }
    if (e.originalEvent && e.originalEvent.button && e.originalEvent.button !== 0) {
      return;
    }
    const coord = toDrawCoord(this.videoMap.toSpatialCoordinate(e.lngLat));
    if (!coord) {
      return;
    }
    if (this.mode === 'Point') {
      this._completeFeature(this._createFeature('Point', [coord]));
      return;
    }
    this.vertices.push(coord);
    this._syncPreview();
  }

  _onSelectClick(e) {
    const ids = this._queryFeatureIds(e);
    this._setSelectedIds(ids.length ? [ids[0]] : []);
    this._syncResult();
  }

  _completeFeature(feature) {
    if (!feature) {
      return null;
    }
    this._resetDraft();
    this.mode = null;
    this._setCursor('');
    this._setDoubleClickZoom(true);
    this.features.push(feature);
    this._setSelectedIds([feature.id]);
    this._syncResult();
    this.videoMap.fire('drawcreate', { feature, data: this.getData() });
    this._emitModeChange();
    this._emitUpdate();
    this._showMeasureLabels(feature);
    return feature;
  }

  _showMeasureLabels(feature) {
    this._clearMeasureLabels();
    const map = this.videoMap && this.videoMap.map;
    if (!map || !mapboxgl.Popup || !feature || !feature.geometry) {
      return;
    }
    try {
      const labels = this._measureLabels(feature);
      labels.forEach((item) => {
        const position = this._toVideoLngLat(item.coord);
        if (!position) {
          return;
        }
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          anchor: 'bottom',
          offset: [0, -8],
          className: 'sm-videomap-draw-measure'
        });
        popup.setLngLat(position).setText(item.text).addTo(map);
        this._measurePopups.push(popup);
      });
    } catch (e) {
      this._clearMeasureLabels();
      return;
    }
    if (!this._measurePopups.length) {
      return;
    }
    this._measureTimer = setTimeout(() => {
      this._clearMeasureLabels();
    }, MEASURE_LABEL_MS);
  }

  _measureLabels(feature) {
    const { type, coordinates } = feature.geometry;
    if (type === 'LineString') {
      return this._lineMeasureLabels(coordinates);
    }
    if (type === 'Polygon') {
      return this._polygonMeasureLabels(coordinates);
    }
    return [];
  }

  _lineMeasureLabels(coordinates) {
    if (!coordinates || coordinates.length < 2) {
      return [];
    }
    const labels = [{ coord: coordinates[0], text: Lang.i18n('text_videoMapMeasurementStart') }];
    let sum = 0;
    for (let i = 1; i < coordinates.length; i++) {
      sum += distance(lngLatOf(coordinates[i - 1]), lngLatOf(coordinates[i]), { units: 'meters' });
      const text =
        i === coordinates.length - 1
          ? `${Lang.i18n('text_videoMapMeasurementTotalDistance')}${formatLength(sum)}`
          : formatLength(sum);
      labels.push({ coord: coordinates[i], text });
    }
    return labels;
  }

  _polygonMeasureLabels(coordinates) {
    const ring = coordinates && coordinates[0];
    if (!ring || ring.length < 4) {
      return [];
    }
    const polygon = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [ring.map(lngLatOf)]
      }
    };
    const squareMeters = area(polygon);
    const centroid = center(polygon);
    if (!centroid || !centroid.geometry || !centroid.geometry.coordinates) {
      return [];
    }
    return [
      {
        coord: centroid.geometry.coordinates,
        text: `${Lang.i18n('text_videoMapMeasurementArea')}${formatArea(squareMeters)}`
      }
    ];
  }

  _toVideoLngLat(coord) {
    if (!coord || !this.videoMap || typeof this.videoMap.toVideoMapCoordinate !== 'function') {
      return null;
    }
    const mercator = proj4('EPSG:4326', 'EPSG:3857', lngLatOf(coord));
    const videoCoord = this.videoMap.toVideoMapCoordinate(mercator);
    if (!videoCoord || videoCoord.length < 2 || !isFinite(videoCoord[0]) || !isFinite(videoCoord[1])) {
      return null;
    }
    return videoCoord;
  }

  _clearMeasureLabels() {
    if (this._measureTimer) {
      clearTimeout(this._measureTimer);
      this._measureTimer = null;
    }
    (this._measurePopups || []).forEach((popup) => {
      if (popup && popup.remove) {
        popup.remove();
      }
    });
    this._measurePopups = [];
  }

  _queryFeatureIds(e) {
    const map = this.videoMap.map;
    if (!map || typeof map.queryRenderedFeatures !== 'function' || !e.point) {
      return [];
    }
    const layers = [`${SOURCE_ID}-fill`, `${SOURCE_ID}-polygon-line`, `${SOURCE_ID}-line`, `${SOURCE_ID}-point`].filter((id) => map.getLayer(id));
    if (!layers.length) {
      return [];
    }
    const pad = 8;
    const box = [
      [e.point.x - pad, e.point.y - pad],
      [e.point.x + pad, e.point.y + pad]
    ];
    const queried = map.queryRenderedFeatures(box, { layers }) || [];
    const ids = [];
    queried.forEach((item) => {
      const id = item.id || (item.properties && (item.properties.id || item.properties.drawId));
      if (id && ids.indexOf(id) === -1) {
        ids.push(id);
      }
    });
    return ids;
  }

  _onDblClick(e) {
    if (!this.mode || this.mode === 'Point') {
      return;
    }
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.originalEvent && e.originalEvent.preventDefault) {
      e.originalEvent.preventDefault();
    }
    this.finish();
  }

  _onMouseMove(e) {
    if (!this.mode || this.mode === 'Point' || !this.vertices.length || !e || !e.lngLat) {
      return;
    }
    const coord = toDrawCoord(this.videoMap.toSpatialCoordinate(e.lngLat));
    if (!coord) {
      return;
    }
    this._syncPreview(coord);
  }

  _onContextMenu(e) {
    if (!this.mode || this.mode === 'Point') {
      return;
    }
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.originalEvent && e.originalEvent.preventDefault) {
      e.originalEvent.preventDefault();
    }
    this.vertices.pop();
    this._syncPreview();
  }

  _onKeyDown(e) {
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    if (e.key === 'Escape') {
      if (this.mode) {
        this.cancel();
      } else if (this.selectedIds.length) {
        this._setSelectedIds([]);
        this._syncResult();
      }
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedIds.length && !this.mode) {
      e.preventDefault();
      this.delete();
      return;
    }
    if (e.key === 'Enter' && this.mode) {
      this.finish();
    }
  }

  _createFeature(type, vertices) {
    if (type === 'Point') {
      if (!vertices.length) {
        return null;
      }
      return this._feature('Point', vertices[0]);
    }
    if (type === 'LineString') {
      if (vertices.length < 2) {
        return null;
      }
      return this._feature('LineString', vertices.slice());
    }
    if (vertices.length < 3) {
      return null;
    }
    const ring = vertices.slice();
    if (!sameCoord(ring[0], ring[ring.length - 1])) {
      ring.push(ring[0].slice());
    }
    return this._feature('Polygon', [ring]);
  }

  _feature(type, coordinates) {
    this._featureSeq += 1;
    const id = `videomap-draw-${this._featureSeq}`;
    return {
      type: 'Feature',
      id,
      properties: { drawType: type, id },
      geometry: { type, coordinates }
    };
  }

  _syncResult() {
    const source = this.videoMap.sourceCache[SOURCE_ID];
    if (source) {
      source.setData(this._displayData());
    }
  }

  _displayData() {
    const selected = {};
    this.selectedIds.forEach((id) => {
      selected[id] = true;
    });
    return {
      type: 'FeatureCollection',
      features: this.features.map((feature) => {
        return {
          type: 'Feature',
          id: feature.id,
          properties: Object.assign({}, feature.properties, { selected: !!selected[feature.id] }),
          geometry: feature.geometry
        };
      })
    };
  }

  _syncPreview(cursor) {
    const source = this.videoMap.sourceCache[PREVIEW_SOURCE_ID];
    if (!source) {
      return;
    }
    const vertices = cursor ? this.vertices.concat([cursor]) : this.vertices;
    const features = [];
    vertices.forEach((coord, index) => {
      features.push(this._previewFeature(`p${index}`, 'Point', coord));
    });
    if (this.mode === 'LineString' && vertices.length >= 2) {
      features.push(this._previewFeature('line', 'LineString', vertices));
    }
    if (this.mode === 'Polygon' && vertices.length >= 2) {
      if (vertices.length >= 3) {
        const ring = vertices.concat([vertices[0]]);
        features.push(this._previewFeature('polygon', 'Polygon', [ring]));
      } else {
        features.push(this._previewFeature('line', 'LineString', vertices));
      }
    }
    source.setData({ type: 'FeatureCollection', features });
    this._emitUpdate(cursor);
  }

  _draftFeatures(cursor) {
    if (!this.mode || this.mode === 'Point') {
      return [];
    }
    const vertices = cursor ? this.vertices.concat([cursor]) : this.vertices.slice();
    const features = [];
    vertices.forEach((coord, index) => {
      features.push({
        type: 'Feature',
        id: `videomap-draw-draft-p${index}`,
        properties: { drawType: 'Point', draft: true },
        geometry: { type: 'Point', coordinates: coord }
      });
    });
    if (this.mode === 'LineString' && vertices.length >= 2) {
      features.push({
        type: 'Feature',
        id: 'videomap-draw-draft-line',
        properties: { drawType: 'LineString', draft: true },
        geometry: { type: 'LineString', coordinates: vertices }
      });
    }
    if (this.mode === 'Polygon' && vertices.length >= 2) {
      if (vertices.length >= 3) {
        features.push({
          type: 'Feature',
          id: 'videomap-draw-draft-polygon',
          properties: { drawType: 'Polygon', draft: true },
          geometry: { type: 'Polygon', coordinates: [vertices.concat([vertices[0]])] }
        });
      } else {
        features.push({
          type: 'Feature',
          id: 'videomap-draw-draft-line',
          properties: { drawType: 'LineString', draft: true },
          geometry: { type: 'LineString', coordinates: vertices }
        });
      }
    }
    return features;
  }

  _emitUpdate(cursor) {
    this.videoMap.fire('drawupdate', {
      data: this.getData(),
      live: this.getLiveData(cursor)
    });
  }

  _emitModeChange() {
    this.videoMap.fire('drawmodechange', {
      mode: this.getUiMode(),
      type: this.mode
    });
  }

  _setSelectedIds(ids) {
    const next = (ids || []).slice();
    const same =
      next.length === this.selectedIds.length && next.every((id, index) => id === this.selectedIds[index]);
    this.selectedIds = next;
    if (!same) {
      this.videoMap.fire('drawselectionchange', {
        features: this.getSelected().features
      });
    }
  }

  _previewFeature(id, type, coordinates) {
    return {
      type: 'Feature',
      id,
      properties: {},
      geometry: { type, coordinates }
    };
  }

  _resetDraft() {
    this.vertices = [];
    const source = this.videoMap.sourceCache && this.videoMap.sourceCache[PREVIEW_SOURCE_ID];
    if (source) {
      source.setData(emptyCollection());
    }
  }

  _dedupeLastVertex() {
    const n = this.vertices.length;
    if (n >= 2 && sameCoord(this.vertices[n - 1], this.vertices[n - 2])) {
      this.vertices.pop();
    }
  }

  _setCursor(cursor) {
    const map = this.videoMap.map;
    if (!map || !map.getCanvas) {
      return;
    }
    const canvas = map.getCanvas();
    if (canvas && canvas.style) {
      canvas.style.cursor = cursor;
    }
  }

  _setDoubleClickZoom(enabled) {
    const control = this.videoMap.map && this.videoMap.map.doubleClickZoom;
    if (!control) {
      return;
    }
    if (enabled) {
      control.enable();
    } else {
      control.disable();
    }
  }
}

export {
  DRAW_TYPES,
  MODE_SIMPLE_SELECT,
  MODE_DIRECT_SELECT,
  MODE_DRAW_POINT,
  MODE_DRAW_LINE_STRING,
  MODE_DRAW_POLYGON,
  TYPE_TO_MODE,
  MODE_TO_TYPE
};
