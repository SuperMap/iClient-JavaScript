import { VideoMapDrawControl } from '../../../src/mapboxgl/control/VideoMapDrawControl';

function createDrawStub() {
  return {
    activate: jasmine.createSpy('activate'),
    changeMode: jasmine.createSpy('changeMode'),
    setStyles: jasmine.createSpy('setStyles'),
    getStyles: jasmine.createSpy('getStyles').and.returnValue({ point: {} }),
    getUiMode: jasmine.createSpy('getUiMode').and.returnValue('simple_select'),
    getSelectedIds: jasmine.createSpy('getSelectedIds').and.returnValue([]),
    getMode: jasmine.createSpy('getMode').and.returnValue(null),
    delete: jasmine.createSpy('delete'),
    cancel: jasmine.createSpy('cancel')
  };
}

function createVideoMapStub(draw) {
  return {
    on: jasmine.createSpy('on'),
    off: jasmine.createSpy('off'),
    _getDraw: jasmine.createSpy('_getDraw').and.returnValue(draw)
  };
}

describe('VideoMapDrawControl branches', () => {
  it('binds, switches and unbinds VideoMap event listeners', () => {
    const firstDraw = createDrawStub();
    const nextDraw = createDrawStub();
    const firstVideoMap = createVideoMapStub(firstDraw);
    const nextVideoMap = createVideoMapStub(nextDraw);
    const control = new VideoMapDrawControl();
    control.onAdd({});

    control.setVideoMap(firstVideoMap);
    expect(firstVideoMap.on.calls.count()).toBe(5);
    expect(firstDraw.activate).toHaveBeenCalled();
    control.setVideoMap(nextVideoMap);
    expect(firstVideoMap.off.calls.count()).toBe(5);
    expect(nextVideoMap.on.calls.count()).toBe(5);
    expect(nextDraw.activate).toHaveBeenCalled();

    control.onRemove();
    expect(nextVideoMap.off.calls.count()).toBe(5);
    expect(nextDraw.changeMode).toHaveBeenCalledWith('simple_select');
  });

  it('forwards styles and returns null styles without a VideoMap', () => {
    const control = new VideoMapDrawControl();
    control.setStyles({ point: { 'circle-color': '#f00' } });
    expect(control.getStyles()).toBeNull();

    const draw = createDrawStub();
    const videoMap = createVideoMapStub(draw);
    control.setVideoMap(videoMap);
    const styles = { line: { 'line-width': 5 } };
    control.setStyles(styles);
    expect(videoMap._getDraw).toHaveBeenCalledWith({ styles: control.options.styles });
    expect(draw.setStyles).toHaveBeenCalledWith(styles);
    expect(control.getStyles()).toEqual({ point: {} });
  });

  it('handles missing targets and each draw/trash button action', () => {
    const control = new VideoMapDrawControl();
    control._onButtonClick({ mode: 'draw_point' });

    const draw = createDrawStub();
    const videoMap = createVideoMapStub(draw);
    control.setVideoMap(videoMap);
    control._onButtonClick({ mode: 'draw_point' });
    expect(draw.changeMode).toHaveBeenCalledWith('draw_point');

    draw.getUiMode.and.returnValue('draw_point');
    control._onButtonClick({ mode: 'draw_point' });
    expect(draw.changeMode).toHaveBeenCalledWith('simple_select');

    draw.getSelectedIds.and.returnValue(['feature-1']);
    control._onButtonClick({ mode: 'trash' });
    expect(draw.delete).toHaveBeenCalled();

    draw.getSelectedIds.and.returnValue([]);
    draw.getMode.and.returnValue('LineString');
    control._onButtonClick({ mode: 'trash' });
    expect(draw.cancel).toHaveBeenCalled();
  });
});