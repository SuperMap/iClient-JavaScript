import { Util } from '../../../src/maplibregl/core/Util';

describe('Util', () => {
  it('isString', () => {
    expect(Util.isString('m')).toBeTruthy();
    expect(Util.isString(5)).toBeFalsy();
  });
  it('toSuperMapPoint', () => {
    expect(Util.toSuperMapPoint([110, 10]).x).toBe(110);
    expect(Util.toSuperMapPoint({ lng: 110, lat: 10 }).x).toBe(110);
    expect(Util.toSuperMapPoint({ geometry: { coordinates: [110, 10] } }).x).toBe(110);
  });
  it('toGeoJSON', () => {
    expect(Util.toGeoJSON([{ type: 'Feature', properties: {} }]).type).toBe('FeatureCollection');
  });
  it('toProcessingParam', () => {
    expect(Util.toProcessingParam([[110, 10]]).type).toBe('REGION');
  });
  it('isNumber', () => {
    expect(Util.isNumber(5)).toBeTruthy();
    expect(Util.isNumber(isNaN)).toBeFalsy();
    expect(Util.isNumber('d')).toBeFalsy();
    expect(Util.isNumber('5')).toBeTruthy();
    expect(Util.isNumber('5f')).toBeFalsy();
    expect(Util.isNumber('')).toBeFalsy();
  });
  it('newGuid', () => {
    expect(Util.newGuid().length).toBe(31);
    expect(Util.newGuid(6).length).toBe(5);
  });
  it('hexToRgba', () => {
    expect(Util.hexToRgba('#fff', 1)).toBe('rgba(255,255,255,1)');
    expect(Util.hexToRgba('#ffffff', 1)).toBe('rgba(255,255,255,1)');
  });
  it('isMatchAdministrativeName', () => {
    expect(Util.isMatchAdministrativeName('张家界', '张家界市')).toBeTruthy();
    expect(Util.isMatchAdministrativeName('张家口', '张家界市')).toBeFalsy();
    expect(Util.isMatchAdministrativeName('张家口', '张家口市')).toBeTruthy();
    expect(Util.isMatchAdministrativeName('北京', '北京市')).toBeTruthy();
    expect(Util.isMatchAdministrativeName('北京', null)).toBeFalsy();
  });
});
