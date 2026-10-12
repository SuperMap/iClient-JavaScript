import VideoMapDraw from '../../../src/mapboxgl/mapping/VideoMapDraw';

describe('VideoMapDraw', () => {
  function createVideoMap() {
    return {
      sourceCache: {},
      map: {
        getCanvas: () => ({ style: {} }),
        doubleClickZoom: {
          enable: jasmine.createSpy('enable'),
          disable: jasmine.createSpy('disable')
        }
      },
      fire: jasmine.createSpy('fire')
    };
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
});
