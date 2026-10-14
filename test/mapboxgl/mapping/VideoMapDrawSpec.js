import proj4 from 'proj4';
import VideoMapDraw from '../../../src/mapboxgl/mapping/VideoMapDraw';

describe('VideoMapDraw', () => {
  const CLICK_EVENT = { lngLat: { lng: 104.09, lat: 30.52 } };
  const CLICK_EVENT_2 = { lngLat: { lng: 104.1, lat: 30.53 } };
  const CLICK_EVENT_3 = { lngLat: { lng: 104.11, lat: 30.54 } };
  function createSource() {
    return { setData: jasmine.createSpy('setData'), getData: jasmine.createSpy('getData') };
  }

  function createVideoMap() {
    const videoMap = {
      sourceCache: {},
      addSource: jasmine.createSpy('addSource'),
      addLayer: jasmine.createSpy('addLayer'),
      getSource: jasmine.createSpy('getSource'),
      fire: jasmine.createSpy('fire'),
      toSpatialCoordinate: jasmine.createSpy('toSpatialCoordinate'),
      toVideoMapCoordinate: jasmine.createSpy('toVideoMapCoordinate').and.returnValue([100, 200]),
      map: {
        getCanvas: () => ({ style: {} }),
        getLayer: jasmine.createSpy('getLayer').and.returnValue(true),
        setPaintProperty: jasmine.createSpy('setPaintProperty'),
        on: jasmine.createSpy('on'),
        off: jasmine.createSpy('off'),
        queryRenderedFeatures: jasmine.createSpy('queryRenderedFeatures').and.returnValue([]),
        doubleClickZoom: {
          enable: jasmine.createSpy('enable'),
          disable: jasmine.createSpy('disable')
        }
      }
    };
    videoMap.addSource.and.callFake((id) => {
      videoMap.sourceCache[id] = createSource();
      return videoMap.sourceCache[id];
    });
    videoMap.getSource.and.callFake((id) => videoMap.sourceCache[id]);
    videoMap.toSpatialCoordinate.and.callFake((lngLat) => proj4('EPSG:4326', 'EPSG:3857', [lngLat.lng, lngLat.lat]));
    return videoMap;
  }

  function createDraw(videoMap) {
    return new VideoMapDraw(videoMap || createVideoMap());
  }

  function firedNames(videoMap) {
    return videoMap.fire.calls.allArgs().map((args) => args[0]);
  }

  function firedPayload(videoMap, name) {
    const call = videoMap.fire.calls.allArgs().find((args) => args[0] === name);
    return call ? call[1] : undefined;
  }

  it('keeps feature id internally without putting it in properties', () => {
    const videoMap = createVideoMap();
    const draw = new VideoMapDraw(videoMap);
    const feature = draw._feature('Point', [116, 39]);

    expect(feature.id).toBe('videomap-draw-1');
    expect(feature.properties).toEqual({});
  });

  it('removes feature id from the drawcreate event feature', () => {
    const videoMap = createVideoMap();
    const draw = new VideoMapDraw(videoMap);
    const feature = draw._feature('Point', [116, 39]);

    draw._completeFeature(feature);

    const drawcreateCall = videoMap.fire.calls.allArgs().find((args) => args[0] === 'drawcreate');
    const eventFeature = drawcreateCall[1].feature;
    expect(eventFeature.id).toBeUndefined();
    expect(eventFeature.properties).toEqual({});
    expect(draw.features[0].id).toBe('videomap-draw-1');
  });

  describe('constructor and options', () => {
    it('creates an idle draw instance', () => {
      const draw = createDraw();

      expect(draw.mode).toBeNull();
      expect(draw.vertices).toEqual([]);
      expect(draw.features).toEqual([]);
      expect(draw.selectedIds).toEqual([]);
      expect(draw.getMode()).toBeNull();
      expect(draw.getUiMode()).toBe('simple_select');
    });

    it('exposes default styles and merges user styles', () => {
      const draw = createDraw();

      expect(draw.getStyles().point['circle-radius']).toBe(5);

      const videoMap = createVideoMap();
      const customDraw = new VideoMapDraw(videoMap, { styles: { line: { 'line-width': 8 } } });
      customDraw.setStyles({ point: { 'circle-color': '#f00' }, preview: { line: { 'line-width': 3 } } });

      expect(videoMap.map.setPaintProperty).toHaveBeenCalled();
      expect(customDraw.getStyles().point['circle-color']).toBe('#f00');
      expect(customDraw.getStyles().line['line-width']).toBe(8);
    });

    it('skips style updates when the point layer is missing', () => {
      const videoMap = createVideoMap();
      videoMap.map.getLayer.and.returnValue(false);
      const draw = new VideoMapDraw(videoMap);

      draw.setStyles({ point: { 'circle-color': '#f00' } });

      expect(videoMap.map.setPaintProperty).not.toHaveBeenCalled();
    });
  });

  describe('layers and binding', () => {
    it('creates draw and preview sources and layers once', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.activate();
      draw.activate();

      expect(videoMap.addSource.calls.count()).toBe(2);
      expect(videoMap.addLayer.calls.count()).toBe(7);
      expect(videoMap.map.on).toHaveBeenCalledWith('click', jasmine.any(Function));

      draw.destroy();
    });

    it('ignores binding without a map and unbinds without a previous binding', () => {
      const videoMap = createVideoMap();
      videoMap.map = null;
      const draw = createDraw(videoMap);

      draw._bind();
      expect(draw._bound).toBeUndefined();

      videoMap.map = createVideoMap().map;
      draw._unbind();
      expect(draw._bound).toBe(false);
    });

    it('unbinds map and window listeners on destroy', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.activate();
      draw.features.push(draw._feature('Point', [116, 39]));
      draw._setSelectedIds(['videomap-draw-1']);

      draw.destroy();

      expect(videoMap.map.off.calls.count()).toBe(4);
      expect(draw._bound).toBe(false);
      expect(draw.features).toEqual([]);
      expect(draw.getSelectedIds()).toEqual([]);
    });
  });

  describe('draw lifecycle', () => {
    it('starts a draw mode and emits mode/update events', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.start('Point');

      expect(draw.getMode()).toBe('Point');
      expect(draw.getUiMode()).toBe('draw_point');
      expect(videoMap.map.doubleClickZoom.enable).toHaveBeenCalled();
      expect(firedNames(videoMap)).toContain('drawstart');
      expect(firedPayload(videoMap, 'drawstart').type).toBe('Point');
      expect(firedNames(videoMap)).toContain('drawmodechange');
      expect(firedNames(videoMap)).toContain('drawupdate');

      draw.destroy();
    });

    it('disables double click zoom for line and polygon modes', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.start('LineString');
      expect(videoMap.map.doubleClickZoom.disable).toHaveBeenCalled();

      draw.start('Polygon');
      expect(draw.getUiMode()).toBe('draw_polygon');

      draw.destroy();
    });

    it('rejects unsupported draw types', () => {
      const draw = createDraw();

      expect(() => draw.start('Circle')).toThrowError(/draw type must be/);
    });

    it('switches modes through changeMode', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.changeMode('draw_point');
      expect(draw.getMode()).toBe('Point');

      draw.changeMode('draw_line_string');
      expect(draw.getMode()).toBe('LineString');

      draw.changeMode('draw_polygon');
      expect(draw.getMode()).toBe('Polygon');

      draw.changeMode('simple_select');
      expect(draw.getMode()).toBeNull();
      expect(draw.getUiMode()).toBe('simple_select');

      draw.destroy();
    });

    it('fills a click into a point feature', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Point');

      draw._onClick(CLICK_EVENT);

      expect(draw.features.length).toBe(1);
      expect(draw.features[0].geometry.type).toBe('Point');
      expect(draw.getSelectedIds()).toEqual([draw.features[0].id]);
      expect(firedNames(videoMap)).toContain('drawcreate');
      expect(firedPayload(videoMap, 'drawcreate').feature.id).toBeUndefined();

      draw.destroy();
    });

    it('accumulates vertices for line mode and syncs the preview', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.start('LineString');
      const preview = videoMap.sourceCache['sm-videomap-draw-preview'];
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT_2);

      expect(draw.vertices.length).toBe(2);
      expect(preview.setData).toHaveBeenCalled();

      draw._onContextMenu({});
      expect(draw.vertices.length).toBe(1);

      draw.destroy();
    });

    it('ignores clicks without a position or with a non left button', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Point');

      draw._onClick(null);
      draw._onClick({});
      draw._onClick({ lngLat: { lng: 1, lat: 1 }, originalEvent: { button: 2 } });

      expect(draw.features.length).toBe(0);

      draw.destroy();
    });

    it('finishes a line feature and dedupes the repeated last vertex', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('LineString');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT_2);
      draw._onClick(CLICK_EVENT_2);

      const finished = draw.finish();

      expect(finished.geometry.type).toBe('LineString');
      expect(finished.geometry.coordinates.length).toBe(2);
      expect(draw.getMode()).toBeNull();

      draw.destroy();
    });

    it('does not finish without a mode, for point mode or with too few vertices', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      expect(draw.finish()).toBeNull();

      draw.start('Point');
      expect(draw.finish()).toBeNull();

      draw.start('LineString');
      draw._onClick(CLICK_EVENT);
      expect(draw.finish()).toBeNull();

      draw.start('Polygon');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT);
      expect(draw.finish()).toBeNull();

      draw.destroy();
    });

    it('closes the ring when finishing a polygon', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Polygon');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT_2);
      draw._onClick(CLICK_EVENT_3);

      const finished = draw.finish();
      const ring = finished.geometry.coordinates[0];

      expect(ring.length).toBe(4);
      expect(ring[0]).toEqual(ring[ring.length - 1]);
      expect(firedNames(videoMap)).toContain('drawcreate');

      draw.destroy();
    });

    it('cancels an active mode and fires drawcancel only when needed', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.cancel();
      expect(firedNames(videoMap)).not.toContain('drawcancel');

      draw.start('Polygon');
      draw._onClick(CLICK_EVENT);
      draw.cancel();

      expect(draw.getMode()).toBeNull();
      expect(draw.vertices).toEqual([]);
      expect(firedNames(videoMap)).toContain('drawcancel');

      draw.destroy();
    });

    it('clears all features and selection', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.features.push(draw._feature('Point', [116, 39]));
      draw._setSelectedIds(['videomap-draw-1']);

      draw.clear();

      expect(draw.features).toEqual([]);
      expect(draw.getSelectedIds()).toEqual([]);
      expect(firedNames(videoMap)).toContain('drawclear');
    });

    it('deletes only the given ids when provided', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      const first = draw._feature('Point', [116, 39]);
      const second = draw._feature('Point', [117, 39]);
      draw.features.push(first, second);

      const data = draw.delete(second.id);

      expect(data.features.length).toBe(1);
      expect(data.features[0].id).toBe(first.id);
    });

    it('returns the current data when nothing can be deleted', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      expect(draw.delete().features).toEqual([]);
    });

    it('filters draft features from the live data', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      expect(draw.getLiveData().features).toEqual([]);

      draw.start('Polygon');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT);

      expect(draw.getLiveData().features.length).toBeGreaterThan(0);
      expect(draw.getLiveData([1, 2]).features.length).toBeGreaterThanOrEqual(draw.getLiveData().features.length);

      draw.destroy();
    });
  });

  describe('selection', () => {
    it('exposes drawId in the rendered data so features stay selectable', () => {
      const draw = createDraw();
      const feature = draw._feature('Point', [116, 39]);
      draw.features.push(feature);
      draw._setSelectedIds([feature.id]);

      const data = draw._displayData();

      expect(data.features[0].id).toBe('videomap-draw-1');
      expect(data.features[0].properties.drawId).toBe('videomap-draw-1');
      expect(data.features[0].properties.selected).toBe(true);
    });

    it('pushes the rendered data into the draw source', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.activate();
      const source = videoMap.sourceCache['sm-videomap-draw'];
      source.setData.calls.reset();

      draw._syncResult();

      expect(source.setData).toHaveBeenCalled();
    });

    it('resolves feature ids from the promoted drawId property', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      videoMap.map.queryRenderedFeatures.and.returnValue([
        { properties: { drawId: 'videomap-draw-2' } },
        { properties: { drawId: 'videomap-draw-2' } },
        { properties: { drawId: 'videomap-draw-3' } }
      ]);

      expect(draw._queryFeatureIds({ point: { x: 10, y: 10 } })).toEqual(['videomap-draw-2', 'videomap-draw-3']);
      expect(videoMap.map.queryRenderedFeatures).toHaveBeenCalledWith(
        [
          [2, 2],
          [18, 18]
        ],
        jasmine.any(Object)
      );
    });

    it('falls back to numeric ids and skips unusable entries', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      videoMap.map.queryRenderedFeatures.and.returnValue([
        { id: 7 },
        { properties: { id: 'videomap-draw-4' } },
        { properties: { drawId: '' } },
        { properties: {} },
        {}
      ]);

      expect(draw._queryFeatureIds({ point: { x: 1, y: 1 } })).toEqual([7, 'videomap-draw-4']);
    });

    it('returns no ids when the query cannot run', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      expect(draw._queryFeatureIds({})).toEqual([]);

      delete videoMap.map.queryRenderedFeatures;
      expect(draw._queryFeatureIds({ point: { x: 1, y: 1 } })).toEqual([]);

      videoMap.map.queryRenderedFeatures = jasmine.createSpy('queryRenderedFeatures').and.returnValue([]);
      videoMap.map.getLayer.and.returnValue(false);
      expect(draw._queryFeatureIds({ point: { x: 1, y: 1 } })).toEqual([]);

      videoMap.map = null;
      expect(draw._queryFeatureIds({ point: { x: 1, y: 1 } })).toEqual([]);
    });

    it('re-selects a feature after it has been deselected', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      const feature = draw._feature('Point', [116, 39]);
      draw.features.push(feature);
      draw._setSelectedIds([feature.id]);

      draw._onKeyDown({ key: 'Escape' });
      expect(draw.getSelectedIds()).toEqual([]);

      videoMap.map.queryRenderedFeatures.and.returnValue([{ properties: { drawId: feature.id, selected: false } }]);
      draw._onClick({ point: { x: 10, y: 10 }, lngLat: { lng: 116, lat: 39 } });

      expect(draw.getSelectedIds()).toEqual([feature.id]);
      expect(draw.getSelected().features[0].id).toBe(feature.id);
    });

    it('clears the selection when clicking empty space', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      const feature = draw._feature('Point', [116, 39]);
      draw.features.push(feature);
      draw._setSelectedIds([feature.id]);

      videoMap.map.queryRenderedFeatures.and.returnValue([]);
      draw._onSelectClick({ point: { x: 0, y: 0 } });

      expect(draw.getSelectedIds()).toEqual([]);
    });

    it('fires drawselectionchange only when the selection really changes', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.features.push(draw._feature('Point', [116, 39]));

      draw._setSelectedIds(['videomap-draw-1']);
      expect(videoMap.fire.calls.count()).toBe(1);

      draw._setSelectedIds(['videomap-draw-1']);
      expect(videoMap.fire.calls.count()).toBe(1);

      draw._setSelectedIds([]);
      expect(videoMap.fire.calls.count()).toBe(2);
    });

    it('enters select mode and cancels an active draw', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Point');

      draw._enterSelect(['videomap-draw-9']);

      expect(draw.getMode()).toBeNull();
      expect(draw.getSelectedIds()).toEqual(['videomap-draw-9']);
      expect(firedNames(videoMap)).toContain('drawcancel');

      draw.destroy();
    });

    it('enters direct select for a given feature', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw.changeMode('direct_select', { featureId: 'videomap-draw-5' });
      expect(draw.getSelectedIds()).toEqual(['videomap-draw-5']);

      draw.changeMode('simple_select', { featureIds: ['videomap-draw-6'] });
      expect(draw.getSelectedIds()).toEqual(['videomap-draw-6']);

      draw.destroy();
    });
  });

  describe('keyboard shortcuts', () => {
    it('ignores keystrokes coming from form fields', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Point');

      draw._onKeyDown({ key: 'Escape', target: { tagName: 'INPUT' } });

      expect(draw.getMode()).toBe('Point');

      draw.destroy();
    });

    it('cancels an active mode with escape', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Polygon');

      draw._onKeyDown({ key: 'Escape' });

      expect(draw.getMode()).toBeNull();
      expect(firedNames(videoMap)).toContain('drawcancel');

      draw.destroy();
    });

    it('clears the selection with escape when idle', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.features.push(draw._feature('Point', [116, 39]));
      draw._setSelectedIds(['videomap-draw-1']);

      draw._onKeyDown({ key: 'Escape' });

      expect(draw.getSelectedIds()).toEqual([]);
    });

    it('deletes the selected feature with delete and backspace', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.features.push(draw._feature('Point', [116, 39]));
      draw._setSelectedIds(['videomap-draw-1']);
      const event = { key: 'Delete', preventDefault: jasmine.createSpy('preventDefault') };

      draw._onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(draw.features).toEqual([]);
      expect(firedNames(videoMap)).toContain('drawdelete');

      draw.features.push(draw._feature('Point', [116, 39]));
      draw._setSelectedIds(['videomap-draw-2']);
      draw._onKeyDown({ key: 'Backspace', preventDefault: jasmine.createSpy('preventDefault') });
      expect(draw.features).toEqual([]);
    });

    it('ignores delete without a selection and unknown keys', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.features.push(draw._feature('Point', [116, 39]));

      draw._onKeyDown({ key: 'Delete', preventDefault: jasmine.createSpy('preventDefault') });
      draw._onKeyDown({ key: 'a' });

      expect(draw.features.length).toBe(1);
    });

    it('finishes an active draw with enter', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('LineString');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT_2);

      draw._onKeyDown({ key: 'Enter' });

      expect(draw.features.length).toBe(1);
      expect(draw.getMode()).toBeNull();

      draw.destroy();
    });
  });

  describe('pointer helpers', () => {
    it('finishes a draw on double click only for line and polygon modes', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw._onDblClick({});
      expect(draw.features.length).toBe(0);

      draw.start('Point');
      draw._onDblClick({});
      expect(draw.features.length).toBe(0);

      draw.start('LineString');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT_2);
      const event = { preventDefault: jasmine.createSpy('preventDefault') };
      draw._onDblClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(draw.features.length).toBe(1);

      draw.destroy();
    });

    it('skips preview updates that are not applicable', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw._onMouseMove(CLICK_EVENT);
      expect(videoMap.sourceCache['sm-videomap-draw-preview']).toBeUndefined();

      draw.start('Point');
      draw._onMouseMove(CLICK_EVENT);
      draw.start('LineString');

      draw._onMouseMove(null);
      draw._onMouseMove({});
      expect(videoMap.sourceCache['sm-videomap-draw-preview']).toBeDefined();

      draw.destroy();
    });

    it('updates the preview with the cursor position', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('LineString');
      draw._onClick(CLICK_EVENT);

      draw._onMouseMove(CLICK_EVENT);

      const data = videoMap.sourceCache['sm-videomap-draw-preview'].setData.calls.mostRecent().args[0];
      expect(data.features.length).toBe(3);

      draw.destroy();
    });

    it('ignores context menu without an active line or polygon mode', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw._onContextMenu({});
      expect(draw.vertices).toEqual([]);

      draw.start('Point');
      draw._onContextMenu({});
      expect(draw.vertices).toEqual([]);

      draw.destroy();
    });

    it('pops the last vertex on context menu', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Polygon');
      draw._onClick(CLICK_EVENT);
      draw._onClick(CLICK_EVENT_2);

      const event = {
        preventDefault: jasmine.createSpy('preventDefault'),
        originalEvent: { preventDefault: jasmine.createSpy('originalPreventDefault') }
      };
      draw._onContextMenu(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.originalEvent.preventDefault).toHaveBeenCalled();
      expect(draw.vertices.length).toBe(1);

      draw.destroy();
    });

    it('tolerates a map without canvas or double click control', () => {
      const videoMap = createVideoMap();
      videoMap.map = { getLayer: () => true };
      const draw = createDraw(videoMap);

      expect(() => {
        draw._setCursor('crosshair');
        draw._setDoubleClickZoom(true);
      }).not.toThrow();
    });
  });

  describe('feature factory', () => {
    it('creates features only when the geometry is valid', () => {
      const draw = createDraw();

      expect(draw._createFeature('Point', [])).toBeNull();
      expect(draw._createFeature('LineString', [[1, 2]])).toBeNull();
      expect(
        draw._createFeature('Polygon', [
          [1, 2],
          [3, 4]
        ])
      ).toBeNull();

      expect(draw._createFeature('Point', [[1, 2]]).geometry.type).toBe('Point');
      expect(
        draw._createFeature('LineString', [
          [1, 2],
          [3, 4]
        ]).geometry.type
      ).toBe('LineString');
    });

    it('does not duplicate the closing coordinate of a ring', () => {
      const draw = createDraw();
      const feature = draw._createFeature('Polygon', [
        [1, 2],
        [3, 4],
        [1, 2]
      ]);

      expect(feature.geometry.coordinates[0].length).toBe(3);
      expect(feature.geometry.coordinates[0][0]).toEqual(feature.geometry.coordinates[0][2]);
    });

    it('builds a polygon ring from three vertices', () => {
      const draw = createDraw();
      const feature = draw._createFeature('Polygon', [
        [1, 2],
        [3, 4],
        [5, 6]
      ]);

      expect(feature.geometry.coordinates[0].length).toBe(4);
    });

    it('wraps preview features with the right geometry', () => {
      const draw = createDraw();
      const preview = draw._previewFeature('p0', 'Point', [1, 2]);

      expect(preview.id).toBe('p0');
      expect(preview.geometry).toEqual({ type: 'Point', coordinates: [1, 2] });
    });
  });

  describe('measurement labels', () => {
    it('builds line labels with meters and kilometers', () => {
      const draw = createDraw();

      expect(draw._measureLabels({ geometry: { type: 'Point', coordinates: [1, 2] } })).toEqual([]);
      expect(draw._lineMeasureLabels([[1, 2]])).toEqual([]);

      const shortLine = draw._lineMeasureLabels([
        [104.09, 30.52],
        [104.0901, 30.5201]
      ]);
      expect(shortLine.length).toBe(2);

      const longLine = draw._lineMeasureLabels([
        [104.09, 30.52],
        [104.09, 31.52],
        [105.09, 31.52]
      ]);
      expect(longLine.length).toBe(3);
    });

    it('builds polygon area labels with square meters and square kilometers', () => {
      const draw = createDraw();

      expect(draw._polygonMeasureLabels([[1, 2]])).toEqual([]);

      const small = draw._polygonMeasureLabels([
        [
          [104.09, 30.52],
          [104.0901, 30.52],
          [104.0901, 30.5201],
          [104.09, 30.52]
        ]
      ]);
      expect(small.length).toBe(1);
      expect(small[0].coord.length).toBe(2);

      const big = draw._polygonMeasureLabels([
        [
          [104, 30],
          [105, 30],
          [105, 31],
          [104, 30]
        ]
      ]);
      expect(big.length).toBe(1);
    });

    it('describes polygon geometry and ignores unsupported geometry', () => {
      const draw = createDraw();

      const labels = draw._measureLabels({
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [104, 30],
              [105, 30],
              [105, 31],
              [104, 30]
            ]
          ]
        }
      });
      expect(labels.length).toBe(1);

      expect(draw._measureLabels({ geometry: { type: 'MultiPolygon', coordinates: [] } })).toEqual([]);
    });

    it('skips labels without a map or feature geometry', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      draw._showMeasureLabels(null);
      draw._showMeasureLabels({ id: 'a' });
      expect(draw._measurePopups.length).toBe(0);

      videoMap.map = null;
      draw._showMeasureLabels({ id: 'a', geometry: { type: 'Point', coordinates: [1, 2] } });
      expect(draw._measurePopups.length).toBe(0);
    });

    it('clears pending measure labels and timers', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      const popup = { remove: jasmine.createSpy('remove') };
      draw._measurePopups = [popup, null];
      draw._measureTimer = setTimeout(() => {}, 10000);

      draw._clearMeasureLabels();

      expect(popup.remove).toHaveBeenCalled();
      expect(draw._measurePopups).toEqual([]);
      expect(draw._measureTimer).toBeNull();
    });

    it('resolves video coordinates for measure labels', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);

      expect(draw._toVideoLngLat([104.09, 30.52])).toEqual([100, 200]);
      expect(draw._toVideoLngLat(null)).toBeNull();

      videoMap.toVideoMapCoordinate.and.returnValue([NaN, NaN]);
      expect(draw._toVideoLngLat([104.09, 30.52])).toBeNull();

      videoMap.toVideoMapCoordinate.and.returnValue([1]);
      expect(draw._toVideoLngLat([104.09, 30.52])).toBeNull();

      delete videoMap.toVideoMapCoordinate;
      expect(draw._toVideoLngLat([104.09, 30.52])).toBeNull();
    });
  });

  describe('coverage helpers', () => {
    it('resets the draft without a preview source', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.vertices = [[1, 2]];

      draw._resetDraft();

      expect(draw.vertices).toEqual([]);
    });

    it('dedupes only identical trailing vertices', () => {
      const draw = createDraw();
      draw.vertices = [
        [1, 2],
        [3, 4]
      ];
      draw._dedupeLastVertex();
      expect(draw.vertices.length).toBe(2);

      draw.vertices = [
        [1, 2],
        [1, 2]
      ];
      draw._dedupeLastVertex();
      expect(draw.vertices.length).toBe(1);
    });

    it('emits update and mode change payloads', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.features.push(draw._feature('Point', [116, 39]));

      draw._emitUpdate();
      draw._emitModeChange();

      expect(firedPayload(videoMap, 'drawupdate').data.features.length).toBe(1);
      expect(firedPayload(videoMap, 'drawmodechange').mode).toBe('simple_select');
    });

    it('returns the selected feature collection', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      const feature = draw._feature('Point', [116, 39]);
      draw.features.push(feature);
      draw.selectedIds = [feature.id];

      expect(draw.getSelected().features.length).toBe(1);
      expect(draw.getSelectedIds()).toEqual([feature.id]);
      expect(draw.getData().features.length).toBe(1);
    });

    it('applies preview styles for polygon and line modes', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Polygon');

      expect(videoMap.map.setPaintProperty).toHaveBeenCalled();

      videoMap.map.getLayer.and.returnValue(false);
      draw._applyPreviewStyle();

      videoMap.map = null;
      expect(() => draw._applyPreviewStyle()).not.toThrow();

      draw.destroy();
    });

    it('drafts nothing without vertices', () => {
      const videoMap = createVideoMap();
      const draw = createDraw(videoMap);
      draw.start('Polygon');

      expect(videoMap.sourceCache['sm-videomap-draw-preview'].setData).toHaveBeenCalledWith({
        type: 'FeatureCollection',
        features: []
      });

      draw.destroy();
    });
  });
});
