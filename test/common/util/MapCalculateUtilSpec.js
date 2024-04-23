import { getMeterPerMapUnit } from '../../../src/common/util/MapCalculateUtil';

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
});
