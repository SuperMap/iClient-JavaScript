import { VideoMap } from '../../../src/mapboxgl/mapping/VideoMap';
import { VideoMapDrawControl } from '../../../src/mapboxgl/control/VideoMapDrawControl';
import { Lang } from '../../../src/common/lang/Lang';
import mapboxgl from 'mapbox-gl';
import mbglmap, { revertCRS } from '../../tool/mock_mapboxgl_map';

var videoUrl = 'base/resources/data/test.mp4';

describe('mapboxgl_VideoMapDrawControl', () => {
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
          delete: function () {}
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
          delete: function () {},
          data64F: [200, 100],
          cols: 2,
          rows: 2,
          data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
        };
      },
      gemm: function () {},
      Rodrigues: function () {},
      projectPoints: function () {},
      multiply: function () {},
      subtract: function () {}
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
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  function createVideoMap() {
    return new VideoMap({
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
  }

  it('onAdd renders draw buttons', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      var control = new VideoMapDrawControl();
      spyOn(videoMap.map, 'addControl').and.callThrough();
      videoMap.addControl(control, 'top-left');
      expect(videoMap.map.addControl).toHaveBeenCalledWith(control, 'top-left');
      expect(control._container).not.toBeNull();
      expect(control._container.className).toContain('sm-videomap-draw-ctrl');
      expect(control._buttons.point).toBeDefined();
      expect(control._buttons.point.className).toContain('mapbox-gl-draw_point');
      expect(control._buttons.line_string.className).toContain('mapbox-gl-draw_line');
      expect(control._buttons.polygon.className).toContain('mapbox-gl-draw_polygon');
      expect(control._buttons.trash.className).toContain('mapbox-gl-draw_trash');
      expect(control._buttons.line_string).toBeDefined();
      expect(control._buttons.polygon).toBeDefined();
      expect(control._buttons.trash).toBeDefined();
      expect(control._buttons.trash.disabled).toBeTruthy();
      done();
    });
  });

  it('localizes button title and aria-label', () => {
    var originalLanguage = Lang.code;
    Lang.code = 'en-US';
    var control = new VideoMapDrawControl();
    var container = control.onAdd({ _smVideoMap: null });
    expect(control._buttons.point.title).toBe('Draw point');
    expect(control._buttons.point.getAttribute('aria-label')).toBe('Draw point');
    expect(container.querySelectorAll('button').length).toBe(4);
    control.onRemove();
    Lang.code = originalLanguage;
  });

  it('uses the configured control position', () => {
    var control = new VideoMapDrawControl({ position: 'bottom-right' });
    expect(control.getDefaultPosition()).toBe('bottom-right');
    expect(control.options.position).toBe('bottom-right');
  });

  it('buttons change draw mode', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      var control = new VideoMapDrawControl();
      videoMap.addControl(control);
      control._buttons.point.click();
      expect(videoMap.getDrawUiMode()).toBe('draw_point');
      expect(control._buttons.point.className).toContain('active');
      control._buttons.line_string.click();
      expect(videoMap.getDrawUiMode()).toBe('draw_line_string');
      expect(control._buttons.point.className).not.toContain('active');
      expect(control._buttons.line_string.className).toContain('active');
      control._buttons.line_string.click();
      expect(videoMap.getDrawUiMode()).toBe('simple_select');
      done();
    });
  });

  it('trash deletes selected feature', (done) => {
    var videoMap = createVideoMap();
    videoMap.on('load', function () {
      spyOn(videoMap, 'toSpatialCoordinate').and.callFake(function (lngLat) {
        return [lngLat.lng, lngLat.lat, 0];
      });
      var control = new VideoMapDrawControl();
      videoMap.addControl(control);
      control._buttons.point.click();
      expect(control._buttons.trash.disabled).toBeFalsy();
      videoMap.map.fire('click', { lngLat: { lng: 11587478.81, lat: 3570800.19 } });
      var featureId = videoMap.getDrawData().features[0].id;
      expect(videoMap.getDrawSelected().features[0].id).toBe(featureId);
      expect(control._buttons.trash.disabled).toBeFalsy();
      control._buttons.trash.click();
      expect(videoMap.getDrawData().features.length).toBe(0);
      expect(control._buttons.trash.disabled).toBeTruthy();
      done();
    });
  });

  it('controls option hides buttons', () => {
    var control = new VideoMapDrawControl({
      controls: { point: true, trash: true }
    });
    var container = control.onAdd({
      _smVideoMap: null
    });
    expect(control._buttons.point).toBeDefined();
    expect(control._buttons.trash).toBeDefined();
    expect(control._buttons.line_string).toBeUndefined();
    expect(control._buttons.polygon).toBeUndefined();
    expect(container.querySelectorAll('button').length).toBe(2);
    control.onRemove();
  });
});
