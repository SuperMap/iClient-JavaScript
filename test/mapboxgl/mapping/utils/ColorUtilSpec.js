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
});
