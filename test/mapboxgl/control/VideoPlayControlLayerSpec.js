import { VideoPlayControl } from '../../../src/mapboxgl/control/VideoPlayControl';
import { Lang } from '@supermapgis/iclient-common/lang/Lang';

function createVideoLayer(initialPaused) {
  var paused = initialPaused;
  var listeners = {};
  return {
    listeners,
    on: function (event, callback) {
      listeners[event] = callback;
    },
    off: function (event, callback) {
      if (listeners[event] === callback) {
        delete listeners[event];
      }
    },
    paused: function () {
      return paused;
    },
    play: function () {
      paused = false;
    },
    pause: function () {
      paused = true;
    },
    fire: function (event) {
      if (listeners[event]) {
        listeners[event]();
      }
    }
  };
}

describe('mapboxgl_VideoPlayControl with VideoLayer', () => {
  it('creates a native bottom-left play control', () => {
    var videoLayer = createVideoLayer(true);
    var control = new VideoPlayControl({ target: videoLayer });
    var container = control.onAdd({});

    expect(control.getDefaultPosition()).toBe('bottom-left');
    expect(container.className).toContain('sm-mapboxgl-play-ctrl');
    expect(control._button.className).toContain('sm-mapboxgl-play-btn');
    expect(control._button.querySelector('.sm-mapboxgl-play-svg--play')).not.toBeNull();
    expect(control._button.querySelector('.sm-mapboxgl-play-svg--pause')).not.toBeNull();
    expect(control._button.className).toContain('is-paused');

    control.onRemove();
  });

  it('applies the configured button size', () => {
    var control = new VideoPlayControl({ size: 48 });
    control.onAdd({});

    expect(control._button.style.width).toBe('48px');
    expect(control._button.style.height).toBe('48px');

    control.onRemove();
  });

  it('toggles playback and syncs state from play and pause events', () => {
    var videoLayer = createVideoLayer(true);
    var control = new VideoPlayControl({ target: videoLayer });
    control.onAdd({});
    spyOn(videoLayer, 'play').and.callThrough();
    spyOn(videoLayer, 'pause').and.callThrough();

    control._button.click();
    expect(videoLayer.play).toHaveBeenCalled();
    videoLayer.fire('play');
    expect(control._button.className).toContain('is-playing');

    control._button.click();
    expect(videoLayer.pause).toHaveBeenCalled();
    videoLayer.fire('pause');
    expect(control._button.className).toContain('is-paused');

    control.onRemove();
  });

  it('rebinds events when the target changes', () => {
    var firstLayer = createVideoLayer(true);
    var nextLayer = createVideoLayer(false);
    var control = new VideoPlayControl({ target: firstLayer });
    control.onAdd({});

    control.setTarget(nextLayer);

    expect(firstLayer.listeners.play).toBeUndefined();
    expect(firstLayer.listeners.pause).toBeUndefined();
    expect(nextLayer.listeners.play).toBeDefined();
    expect(nextLayer.listeners.pause).toBeDefined();
    expect(control._button.className).toContain('is-playing');

    control.onRemove();
    expect(nextLayer.listeners.play).toBeUndefined();
    expect(nextLayer.listeners.pause).toBeUndefined();
  });

  it('renders custom content from setHTML before and after onAdd', () => {
    var videoLayer = createVideoLayer(true);
    var control = new VideoPlayControl({ target: videoLayer });

    expect(control.setHTML('<i class="my-play"></i><i class="my-pause"></i>')).toBe(control);
    control.onAdd({});
    expect(control._container.querySelector('.my-play')).not.toBeNull();
    expect(control._container.querySelector('.sm-mapboxgl-play-btn')).toBeNull();
    expect(control._button).toBeNull();

    control.setHTML('<b class="next"></b>');
    expect(control._container.querySelector('.next')).not.toBeNull();
    expect(control._container.querySelector('.my-play')).toBeNull();

    control.onRemove();
  });

  it('toggles playback when a custom button is clicked', () => {
    var videoLayer = createVideoLayer(true);
    var control = new VideoPlayControl({ target: videoLayer });
    control.setHTML('<button class="mine"><span class="sm-mapboxgl-play-when-paused">go</span></button>');
    control.onAdd({});
    spyOn(videoLayer, 'play').and.callThrough();

    control._container.querySelector('.mine').click();

    expect(videoLayer.play).toHaveBeenCalled();
    expect(control._container.className).toContain('is-paused');

    var whenPaused = control._container.querySelector('.sm-mapboxgl-play-when-paused');
    expect(whenPaused.style.display).toBe('');
    videoLayer.fire('play');
    expect(whenPaused.style.display).toBe('none');

    control.onRemove();
  });

  it('sanitizes dangerous markup passed to setHTML', () => {
    var control = new VideoPlayControl();
    control.onAdd({});
    control.setHTML(
      '<script>window.__xss = 1</script><iframe src="x"></iframe><style>a{}</style>' +
        '<img src="x" onerror="window.__xss = 1">' +
        '<a id="a1" href="java\nscript:alert(1)">x</a><a id="a2" href="https://example.com">y</a>' +
        '<svg><foreignObject><div></div></foreignObject><path d="M0 0" onclick="x"/></svg>' +
        '<span class="ok" style="color:red">z</span>'
    );
    var button = control._container;

    expect(button.querySelector('script, iframe, style, foreignObject')).toBeNull();
    expect(button.querySelector('img').hasAttribute('onerror')).toBe(false);
    expect(button.querySelector('#a1').hasAttribute('href')).toBe(false);
    expect(button.querySelector('#a2').getAttribute('href')).toBe('https://example.com');
    expect(button.querySelector('path').hasAttribute('onclick')).toBe(false);
    expect(button.querySelector('.ok').getAttribute('style')).toContain('color');
    expect(window.__xss).toBeUndefined();

    control.onRemove();
  });

  it('keeps custom content when the control is added again', () => {
    var control = new VideoPlayControl();
    control.setHTML('<i class="again"></i>');
    control.onAdd({});
    control.onRemove();
    control.onAdd({});

    expect(control._container.querySelector('.again')).not.toBeNull();

    control.onRemove();
  });

  it('rejects non-node values in setDOMContent', () => {
    var control = new VideoPlayControl();

    expect(() => control.setDOMContent('<b></b>')).toThrowError(TypeError);
  });

  it('keeps custom DOM content when playback state changes', () => {
    var videoLayer = createVideoLayer(true);
    var control = new VideoPlayControl({ target: videoLayer });
    var node = document.createElement('span');
    node.className = 'my-node';
    control.onAdd({});

    expect(control.setDOMContent(node)).toBe(control);
    videoLayer.play();
    videoLayer.fire('play');

    expect(control._container.firstChild).toBe(node);
    expect(control._container.className).toContain('is-playing');

    control.onRemove();
  });

  it('localizes play and pause button labels', () => {
    var previousCode = Lang.code;
    var videoLayer = createVideoLayer(true);
    var control = new VideoPlayControl({ target: videoLayer });

    try {
      Lang.code = 'en-US';
      control.onAdd({});
      expect(control._button.title).toBe('Play');
      videoLayer.play();
      control._syncUI();
      expect(control._button.title).toBe('Pause');

      Lang.code = 'zh-CN';
      control._syncUI();
      expect(control._button.title).toBe('暂停');
      videoLayer.pause();
      control._syncUI();
      expect(control._button.title).toBe('播放');
    } finally {
      control.onRemove();
      Lang.code = previousCode;
    }
  });
});