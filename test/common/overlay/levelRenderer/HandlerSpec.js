import { Storage } from '../../../../src/common/overlay/levelRenderer/Storage';
import { Painter } from '../../../../src/common/overlay/levelRenderer/Painter';
import { Handler } from '../../../../src/common/overlay/levelRenderer/Handler';

describe('Handler', () => {
  var testDiv;
  var storage;
  var painter;
  var event = {
    isTrusted: true,
    _stopped: true,
    altKey: false,
    altitudeAngle: 1.5707963267948966,
    azimuthAngle: 0,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,
    clientX: 613,
    clientY: 353,
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: false,
    detail: 1,
    eventPhase: 0,
    fromElement: null,
    height: 1,
    isPrimary: false,
    layerX: 613,
    layerY: 353,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    offsetX: 723,
    offsetY: 442,
    pageX: 613,
    pageY: 353,
    pointerId: 1,
    pointerType: "mouse",
    pressure: 0,
    relatedTarget: null,
    returnValue: true,
    screenX: 1443,
    screenY: 502,
    shiftKey: false,
    InputDeviceCapabilities: { firesTouchEvents: false },
    srcElement: {},
    tangentialPressure: 0,
    target: {},
    tiltX: 0,
    tiltY: 0,
    timeStamp: 39267,
    toElement: null,
    twist: 0,
    type: "click",
    which: 1,
    width: 1,
    x: 613,
    y: 353
  }
  beforeAll(() => {
    testDiv = window.document.createElement("div");
    testDiv.setAttribute("id", "group");
    testDiv.style.styleFloat = "left";
    testDiv.style.marginLeft = "8px";
    testDiv.style.marginTop = "50px";
    testDiv.style.width = "400px";
    testDiv.style.height = "400px";
    testDiv.style.border = "1px solid #000000";
    window.document.body.appendChild(testDiv);
    storage = new Storage();
    painter = new Painter(testDiv, storage);
  });
  afterAll(() => {
    window.document.body.removeChild(testDiv);
  });
  it('trigger resize', () => {
    var handler = new Handler(testDiv, storage, painter);

    handler.trigger('resize', event);
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger click', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('click', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger dblclick', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('dblclick', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger mousewheel', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('mousewheel', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger mousemove', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('mousemove', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger mousemove after mousedown', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('mousedown', event);
    handler.trigger('mousemove', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger mouseout', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('mouseout', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger mouseup', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('mouseup', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger mousedown', () => {
    var handler = new Handler(testDiv, storage, painter);
    spyOn(handler, '_zrenderEventFixed').and.callThrough();
    handler.trigger('mousedown', event);
    expect(handler._zrenderEventFixed).toHaveBeenCalled();
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger touchstart', () => {
    var handler = new Handler(testDiv, storage, painter);
    handler.trigger('touchstart', event);
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });

  it('trigger touchend', () => {
    var handler = new Handler(testDiv, storage, painter);
    handler.trigger('touchend', event);
    expect(storage).not.toBeNull();
    expect(handler.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Handler");
    handler.destroy();
    expect(handler._findHover).toBeNull();
    expect(handler._mouseY).toBeNull();
    expect(handler._lastY).toBeNull();
  });
});