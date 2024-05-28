import Color from '../../../../src/mapboxgl/mapping/utils/Color';

describe('ColorUtil', () => {
  it('toColor', (done) => {
    let res = Color.toColor([126, 211, 33, 1]);
    expect(res).toBe('rgb(126,211,33)');
    res = Color.toColor([126, 211, 33, 0.5], 'rgba');
    expect(res).toBe('rgba(126,211,33,0.5)');
    res = Color.toColor([126, 211, 33, 1], 'hex');
    expect(res).toBe('#7ed321');
    res = Color.toColor([126, 211, 33, 1], 'hsl');
    expect(res).toBe('hsl(126,211%,33%)');
    res = Color.toColor([126, 211, 33, 0.5], 'hsla');
    expect(res).toBe('hsla(126,211%,33%,0.5)');
    done();
  });

  it('getData invalid', (done) => {
    try {
      const res = Color.convert([126, 211, 33]);
    } catch (error) {
      expect(error.message).toBe('The color format error');
      done();
    }
  });

  it('convert', (done) => {
    let res = Color.convert(undefined);
    expect(res).toBeUndefined();
    res = Color.convert('#7ed321', 'rgba');
    expect(res).toBe('rgba(126,211,33,1)');
    res = Color.convert('hsb(480%, 88%, 46%)', 'hex');
    expect(res).toBe('#760f76');
    res = Color.convert('hsb(360%, 88%, 46%)', 'hex');
    expect(res).toBe('#760f0f');
    res = Color.convert('hsb(60%, 88%, 46%)', 'hex');
    expect(res).toBe('#76760f');
    res = Color.convert('hsb(120%, 88%, 46%)', 'hex');
    expect(res).toBe('#0f760f');
    res = Color.convert('hsb(180%, 88%, 46%)', 'hex');
    expect(res).toBe('#0f7676');
    res = Color.convert('hsb(240%, 88%, 46%)', 'hex');
    expect(res).toBe('#0f0f76');
    res = Color.convert('hsl(180%, 88%, 46%)', 'hex');
    expect(res).toBe('#0fdddd');
    res = Color.convert('hsl(180%, 88%, 6%)', 'hex');
    expect(res).toBe('#021d1d');
    done();
  });

  it('_HSL_2_RGB', (done) => {
    let res = Color._HSL_2_RGB([10, 0, 0.5]);
    expect(res).toEqual([127.5, 127.5, 127.5]);
    res = Color._HSL_2_RGB([10, 10, 15]);
    expect(res).toEqual([39525, 39525, 39525]);
    done();
  });

  it('_HUE_2_RGB', (done) => {
    let res = Color._HUE_2_RGB(10, 20, -1);
    expect(res).toBe(10);
    res = Color._HUE_2_RGB(10, 20, 6);
    expect(res).toBe(10);
    res = Color._HUE_2_RGB(10, 20, 0.1);
    expect(res).toBe(16);
    res = Color._HUE_2_RGB(10, 20, 0.2);
    expect(res).toBe(20);
    done();
  });

  it('trim', (done) => {
    const res = Color.trim(' #7ed321 ');
    expect(res).toBe('#7ed321');
    done();
  });

  it('map func invalid', (done) => {
    try {
      const res = Color.map([126, 211, 33], 2);
    } catch (error) {
      expect(error.name).toBe('TypeError');
      done();
    }
  });

  it('map array invalid', (done) => {
    const res = Color.map(undefined, () => {});
    expect(res).toBeUndefined();
    done();
  });

  it('adjust', (done) => {
    let res = Color.adjust(10, [10, 20]);
    expect(res).toBe(10);
    res = Color.adjust(30, [10, 20]);
    expect(res).toBe(20);
    done();
  });

  it('normalize', (done) => {
    const res = Color.normalize('#fff');
    expect(res).toBe('#ffffff');
    done();
  });
});
