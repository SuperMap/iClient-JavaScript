import { VideoMap } from '../../../src/mapboxgl/mapping/VideoMap';
import mapboxgl from 'mapbox-gl';
import mbglmap, { revertCRS } from '../../tool/mock_mapboxgl_map';
var videoUrl = 'base/resources/data/test.mp4';
describe('mapboxgl_videoMap', () => {
  var originalTimeout;
  var testDiv;
  var cv;
  beforeAll(() => {
    cv = {
      then(cb) {
        setTimeout(function () {
          cb();
        }, 200);
      },
      CV_32FC2: 'CV_32FC2',
      CV_64FC1: 'CV_64FC1',
      matFromImageData: function () {
        return {
          delete: function () { }
        };
      },
      Size: function () {
        return {
          width: 770,
          height: 690
        };
      },
        matFromArray: function () {
          return {
            inv: function () {
              return this;
            },
            data64F: [200, 100, 1],
            delete: function () {}
          };
        },
      Mat: function () {
        return {
          inv: function () {
            return this;
          },
          delete: function () { },
          data64F: [200, 100],
          cols: 2,
          rows: 2,
          data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
        };
      },
      gemm: function () { },
      Rodrigues: function () { },
      projectPoints: function () { },
      multiply: function () { },
      subtract: function () { }
    };
  });
  afterEach(() => {
    revertCRS();
    document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  beforeEach(() => {
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  it('init videoMap', (done) => {
    var url = videoUrl;
    var videoMap = new VideoMap({
      url: url,
      opencv: cv,
      interval: 0.2,
      vectorUpdateInterval: 0.05,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      expect(videoMap.vectorUpdateInterval).toBe(0.2);
      expect(videoMap.coordTransfer).not.toBe(null);
      expect(videoMap.videoParameters).not.toBe(null);
      var clickEvent;
      videoMap.on('click', function (event) {
        clickEvent = event;
      });
      videoMap.originCoordsLeftTop = { lng: 0, lat: 100 };
      videoMap.originCoordsRightBottom = { lng: 100, lat: 0 };
      videoMap.videoWidth = 100;
      videoMap.videoHeight = 100;
      spyOn(videoMap.coordTransfer, 'toSpatialCoordinate').and.returnValue([13358338.895192828, 3503549.8435043753, 0]);
      videoMap.map.fire('click', { lngLat: { lng: 120, lat: 30 }, point: { x: 10, y: 20 } });
      expect(clickEvent.lngLat.lng).toBeCloseTo(120, 6);
      expect(clickEvent.lngLat.lat).toBeCloseTo(30, 6);
      expect(clickEvent.point).toEqual({ x: 10, y: 20 });
      expect(clickEvent.mapEvent.lngLat).toEqual({ lng: 120, lat: 30 });
      var container = {};
      var projectedPoint = { x: 10, y: 20 };
      spyOn(videoMap.map, 'getContainer').and.returnValue(container);
      videoMap.map.project = jasmine.createSpy('project').and.returnValue(projectedPoint);
      spyOn(videoMap.coordTransfer, 'toVideoCoordinate').and.returnValue({ data64F: [50, 50] });
      expect(videoMap.getContainer()).toBe(container);
      expect(videoMap.project({ lng: 120, lat: 30 })).toBe(projectedPoint);
      expect(videoMap.map.project).toHaveBeenCalledWith(jasmine.objectContaining({ lng: 50, lat: 50 }));
      videoMap.map.project.calls.reset();
      videoMap.coordTransfer.toVideoCoordinate.calls.reset();
      expect(videoMap.projectVideoMapCoordinate([60, 70])).toBe(projectedPoint);
      expect(videoMap.map.project).toHaveBeenCalledWith(jasmine.objectContaining({ lng: 60, lat: 70 }));
      expect(videoMap.coordTransfer.toVideoCoordinate).not.toHaveBeenCalled();
      expect(videoMap.transform).toBe(videoMap.map.transform);
      var getMaxZoom = spyOn(videoMap.map, 'getMaxZoom').and.callThrough();
      expect(videoMap.getMaxZoom()).toBe(videoMap.map.maxZoom);
      expect(getMaxZoom.calls.mostRecent().object).toBe(videoMap.map);
      expect(videoMap.addLayer).toBe(VideoMap.prototype.addLayer);
      done();
    });
  });

  it('getVideoBounds returns the closed EPSG:4326 footprint polygon', (done) => {
    var videoMap = new VideoMap({
      url: videoUrl,
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      videoMap.videoWidth = 100;
      videoMap.videoHeight = 50;
      spyOn(videoMap.coordTransfer, 'toSpatialCoordinate').and.callFake(function (pixel) {
        return [11587478 + pixel[0], 3570800 - pixel[1], 0];
      });
      var footprint = videoMap.getVideoBounds();
      expect(footprint.type).toBe('Feature');
      expect(footprint.geometry.type).toBe('Polygon');
      expect(footprint.geometry.coordinates[0].length).toBe(5);
      expect(footprint.geometry.coordinates[0][4]).toEqual(footprint.geometry.coordinates[0][0]);
      footprint.geometry.coordinates[0].forEach(function (coord) {
        expect(Math.abs(coord[0])).toBeLessThan(180);
        expect(Math.abs(coord[1])).toBeLessThan(90);
      });
      done();
    });
  });

  it('addlayer removelayer', (done) => {
    var url = videoUrl;
    var videoMap = new VideoMap({
      url: url,
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      videoMap.addLayer({
        id: 'symbol1',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  SMID: '6',
                  SMUSERID: '0',
                  NAME: '时尚大厦',
                  CLASS: '写字楼',
                  X290: '290',
                  X300: '300'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [11588458.277327187, 3571913.832559694]
                },
                id: 6
              }
            ]
          }
        },
        layout: {
          'icon-image': 'ro-communal-3',
          'text-anchor': 'bottom',
          'text-field': '{NAME}',
          'icon-text-fit': 'both',
          'text-size': 12,
          'icon-text-fit-padding': [5, 10, 5, 10]
        },
        paint: {
          'text-color': 'black'
        }
      });
      expect(videoMap.layerCache['symbol1']).not.toBe(null);
      videoMap.removeLayer('symbol1');
      expect(videoMap.layerCache['symbol1']).toBeUndefined();
      done();
    });
  });

  it('addSource removeSource', (done) => {
    var url = videoUrl;
    var videoMap = new VideoMap({
      url: url,
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      videoMap.addSource('test111', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                SMID: '6',
                SMUSERID: '0',
                NAME: '时尚大厦',
                CLASS: '写字楼',
                X290: '290',
                X300: '300'
              },
              geometry: {
                type: 'Point',
                coordinates: [11588458.277327187, 3571913.832559694]
              },
              id: 6
            }
          ]
        }
      });
      expect(videoMap.sourceCache['test111']).not.toBe(null);
      videoMap.removeSource('test111');
      expect(videoMap.sourceCache['test111']).toBeUndefined();
      done();
    });
  });

  it('destroy', (done) => {
    var videoMap = new VideoMap({
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    setTimeout(() => {
      videoMap.videoMapLayer = null;
      videoMap.destroy();
      expect(videoMap.map).toBeNull();
      done();
    }, 2000);
  });

  it('play pause', (done) => {
    var videoMap = new VideoMap({
      url: videoUrl,
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      spyOn(videoMap.videoMapLayer, 'play').and.callThrough();
      spyOn(videoMap.videoMapLayer, 'pause').and.callThrough();
      videoMap.pause();
      expect(videoMap.videoMapLayer.pause).toHaveBeenCalled();
      expect(videoMap.paused()).toBeDefined();
      videoMap.play();
      expect(videoMap.videoMapLayer.play).toHaveBeenCalled();
      done();
    });
  });

  it('draw point line polygon', (done) => {
    var videoMap = new VideoMap({
      url: videoUrl,
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      spyOn(videoMap, 'toSpatialCoordinate').and.callFake(function (lngLat) {
        return [lngLat.lng, lngLat.lat, 0];
      });

      expect(videoMap.getDrawMode()).toBeNull();
      expect(videoMap.getDrawData().features.length).toBe(0);

      videoMap.startDraw('Point');
      expect(videoMap.getDrawMode()).toBe('Point');
      videoMap.map.fire('click', { lngLat: { lng: 11587478.81, lat: 3570800.19 } });
      expect(videoMap.getDrawData().features.length).toBe(1);
      expect(videoMap.getDrawData().features[0].geometry.type).toBe('Point');
      expect(videoMap.getDrawData().features[0].geometry.coordinates.length).toBe(3);
      expect(videoMap.getDrawUiMode()).toBe('simple_select');
      expect(videoMap.getDrawSelected().features.length).toBe(1);

      videoMap.startDraw('LineString');
      videoMap.map.fire('click', { lngLat: { lng: 11587478.81, lat: 3570800.19 } });
      videoMap.map.fire('click', { lngLat: { lng: 11587578.81, lat: 3570900.19 } });
      expect(videoMap.finishDraw().geometry.type).toBe('LineString');
      expect(videoMap.getDrawData().features.length).toBe(2);

      videoMap.startDraw('Polygon');
      videoMap.map.fire('click', { lngLat: { lng: 11587478.81, lat: 3570800.19 } });
      videoMap.map.fire('click', { lngLat: { lng: 11587578.81, lat: 3570800.19 } });
      videoMap.map.fire('click', { lngLat: { lng: 11587578.81, lat: 3570900.19 } });
      var polygon = videoMap.finishDraw();
      expect(polygon.geometry.type).toBe('Polygon');
      expect(polygon.geometry.coordinates[0].length).toBe(4);
      expect(videoMap.getDrawData().features.length).toBe(3);

      videoMap.cancelDraw();
      expect(videoMap.getDrawMode()).toBeNull();
      videoMap.clearDraw();
      expect(videoMap.getDrawData().features.length).toBe(0);
      expect(function () {
        videoMap.startDraw('Circle');
      }).toThrow();

      expect(videoMap.getDrawUiMode()).toBe('simple_select');
      videoMap.changeDrawMode('draw_point');
      expect(videoMap.getDrawUiMode()).toBe('draw_point');
      expect(videoMap.getDrawMode()).toBe('Point');
      videoMap.changeDrawMode('simple_select');
      expect(videoMap.getDrawMode()).toBeNull();
      done();
    });
  });

  it('draw select and delete', (done) => {
    var videoMap = new VideoMap({
      url: videoUrl,
      opencv: cv,
      videoParameters: {
        fovX: 84,
        fovY: 47,
        centerX: 960,
        centerY: 540,
        pitch: -20,
        roll: 0,
        yaw: 2,
        x: 11587478.810629973,
        y: 3570800.195541344,
        z: 154.50312
      }
    });
    videoMap.on('load', function () {
      spyOn(videoMap, 'toSpatialCoordinate').and.callFake(function (lngLat) {
        return [lngLat.lng, lngLat.lat, 0];
      });
      videoMap.startDraw('Point');
      videoMap.map.fire('click', { lngLat: { lng: 11587478.81, lat: 3570800.19 } });
      var featureId = videoMap.getDrawData().features[0].id;
      expect(featureId).toBeDefined();
      expect(videoMap.getDrawSelected().features.length).toBe(1);
      expect(videoMap.getDrawSelected().features[0].id).toBe(featureId);

      videoMap.changeDrawMode('simple_select');
      spyOn(videoMap.map, 'queryRenderedFeatures').and.returnValue([{ id: featureId }]);
      videoMap.map.fire('click', {
        lngLat: { lng: 11587478.81, lat: 3570800.19 },
        point: { x: 10, y: 10 }
      });
      expect(videoMap.getDrawSelected().features.length).toBe(1);
      expect(videoMap.getDrawSelected().features[0].id).toBe(featureId);

      videoMap.deleteDraw();
      expect(videoMap.getDrawData().features.length).toBe(0);
      expect(videoMap.getDrawSelected().features.length).toBe(0);
      done();
    });
  });
});
