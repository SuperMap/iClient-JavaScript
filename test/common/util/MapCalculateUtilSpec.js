import { getMeterPerMapUnit, scaleToResolution, scalesToResolutions } from '../../../src/common/util/MapCalculateUtil';

describe('MapCalculateUtil', () => {
  it('getMeterPerMapUnit m', () => {
      expect(getMeterPerMapUnit('m')).toBe(1);
      expect(getMeterPerMapUnit('M')).toBe(1);
      expect(getMeterPerMapUnit('meter')).toBe(1);
      expect(getMeterPerMapUnit('meters')).toBe(1);
      expect(getMeterPerMapUnit('METER')).toBe(1);
      expect(getMeterPerMapUnit('METERS')).toBe(1);
      expect(getMeterPerMapUnit('METRE')).toBeUndefined()
  });
  it('getMeterPerMapUnit dge', () => {
    expect(getMeterPerMapUnit('degrees')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('deg')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('degree')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('dd')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('DEGREES')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('DEG')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('DEGREE')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('DD')).toBeCloseTo(111319.49079327358, 0.00001);;
    expect(getMeterPerMapUnit('degre')).toBeUndefined()
  });
  it('scalesToResolutions with scales', () => {
    const scales = [50000, 25000];
    const resolutions = scalesToResolutions(scales, null, 96, 'm');

    expect(resolutions.length).toBe(2);
    expect(resolutions[0]).toBeCloseTo(scaleToResolution(25000, 96, 'm'), 12);
    expect(resolutions[1]).toBeCloseTo(scaleToResolution(50000, 96, 'm'), 12);
  });

  it('scalesToResolutions dpi empty value should equal 96', () => {
    const scales = [50000, 25000];
    const resolutionsWithEmptyDpi = scalesToResolutions(scales, null, undefined, 'm');
    const resolutionsWith96Dpi = scalesToResolutions(scales, null, 96, 'm');

    expect(resolutionsWithEmptyDpi.length).toBe(resolutionsWith96Dpi.length);
    expect(resolutionsWithEmptyDpi[0]).toBeCloseTo(resolutionsWith96Dpi[0], 12);
    expect(resolutionsWithEmptyDpi[1]).toBeCloseTo(resolutionsWith96Dpi[1], 12);
  });

  it('scalesToResolutions with baseScale', () => {
    const bounds = { left: -180, right: 180 };
    const level = 3;
    const maxResolution = Math.abs(bounds.left - bounds.right) / 256;
    const baseResolution = maxResolution / 2;
    const baseScale = 1 / (baseResolution * 96 * (1 / 0.0254));
    const resolutions = scalesToResolutions(null, bounds, 96, 'm', level, baseScale);

    expect(resolutions.length).toBe(level);
    expect(resolutions[0]).toBeCloseTo(maxResolution, 12);
    expect(resolutions[1]).toBeCloseTo(baseResolution, 12);
    expect(resolutions[2]).toBeCloseTo(baseResolution / 2, 12);
  });

  it('scalesToResolutions with bounds and level', () => {
    const bounds = { left: -180, right: 180 };
    const level = 4;
    const maxResolution = Math.abs(bounds.left - bounds.right) / 256;
    const resolutions = scalesToResolutions(null, bounds, 96, 'degrees', level);

    expect(resolutions.length).toBe(level);
    expect(resolutions[0]).toBeCloseTo(maxResolution, 12);
    expect(resolutions[1]).toBeCloseTo(maxResolution / 2, 12);
    expect(resolutions[2]).toBeCloseTo(maxResolution / 4, 12);
    expect(resolutions[3]).toBeCloseTo(maxResolution / 8, 12);
  });
});
