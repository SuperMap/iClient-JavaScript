import { extentToResolutions } from '../../../src/common/iServer/InitMapServiceBase'; 

describe('extentToResolutions', () => {
  it('should calculate resolutions for a given bounding box', () => {
    const bounds = { left: -180, right: 180 };
    const resolutions = extentToResolutions(bounds);
    expect(resolutions.length).toBe(22);
    expect(resolutions[0]).toBeCloseTo(0.703125);
    expect(resolutions[21]).toBeCloseTo(0.00000686328125);
  });

  it('should handle array bounds input', () => {
    const bounds = [-180, -90, 180, 90];
    const resolutions = extentToResolutions(bounds);
    expect(resolutions.length).toBe(22);
    expect(resolutions[0]).toBeCloseTo(0.703125);
    expect(resolutions[21]).toBeCloseTo(0.00000686328125);
  });

  it('should handle custom maxZoom and tileSize', () => {
    const bounds = { left: -180, right: 180 };
    const resolutions = extentToResolutions(bounds, 10, 256);
    expect(resolutions.length).toBe(10);
    expect(resolutions[0]).toBeCloseTo(1.40625);
    expect(resolutions[9]).toBeCloseTo(0.00146484375);
  });

  it('should handle zero width bounds', () => {
    const bounds = { left: 0, right: 0 };
    const resolutions = extentToResolutions(bounds);
    expect(resolutions.length).toBe(22);
    expect(resolutions[0]).toBe(0);
  });

  it('should handle negative width bounds', () => {
    const bounds = { left: 180, right: -180 };
    const resolutions = extentToResolutions(bounds);
    expect(resolutions.length).toBe(22);
    expect(resolutions[0]).toBeCloseTo(0.703125);
    expect(resolutions[21]).toBeCloseTo(0.00000686328125);
  });
});