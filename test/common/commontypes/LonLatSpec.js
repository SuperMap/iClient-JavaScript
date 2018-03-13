import {LonLat} from '../../../src/common/commontypes/LonLat';
import {Bounds} from '../../../src/common/commontypes/Bounds';

describe('LonLat', () => {
    it('constructor, toString, toShortString, clone, destroy', () => {
        var lonLat1 = new LonLat(30, 45);
        var lonLat2 = new LonLat([10, 12], 45);
        expect(lonLat1).not.toBeNull();
        expect(lonLat1.CLASS_NAME).toEqual("SuperMap.LonLat");
        expect(lonLat1.lat).toEqual(45);
        expect(lonLat1.lon).toEqual(30);
        expect(lonLat2).not.toBeNull();
        expect(lonLat2.CLASS_NAME).toEqual("SuperMap.LonLat");
        expect(lonLat2.lat).toEqual(12);
        expect(lonLat2.lon).toEqual(10);
        var str1 = lonLat1.toString();
        expect(str1).toEqual("lon=30,lat=45");
        var str2 = lonLat1.toShortString();
        expect(str2).toEqual("30,45");
        var newLonLat = lonLat1.clone();
        expect(newLonLat).toEqual(lonLat1);
        lonLat1.destroy();
        expect(lonLat1.lat).toBeNull();
        expect(lonLat1.lon).toBeNull();
        lonLat2.destroy();
    });

    it('add', () => {
        var lonLat1 = new LonLat(30, 45);
        var lonLat2 = lonLat1.add(10, 10);
        expect(lonLat2.CLASS_NAME).toEqual("SuperMap.LonLat");
        expect(lonLat2.lat).toEqual(55);
        expect(lonLat2.lon).toEqual(40);
        lonLat1.destroy();
        lonLat2.destroy();
    });

    it('equals', () => {
        var lonLat1 = new LonLat(30, 45);
        var lonLat2 = new LonLat(30, 45);
        var lonLat3 = new LonLat(31, 45);
        var isEquals1 = lonLat2.equals(lonLat1);
        var isEquals2 = lonLat3.equals(lonLat1);
        expect(isEquals1).toBeTruthy();
        expect(isEquals2).toBeFalsy();
        lonLat1.destroy();
        lonLat2.destroy();
        lonLat3.destroy();
    });

    it('wrapDateLine', () => {
        var lonLat1 = new LonLat(420, 50);
        var lonLat2 = new LonLat(-190, 50);
        var lonLat3 = lonLat1.wrapDateLine(
            new Bounds(-180, -90, 180, 90)
        );
        var lonLat4 = lonLat2.wrapDateLine(
            new Bounds(-180, -90, 180, 90)
        );
        expect(lonLat3).not.toBeNull();
        expect(lonLat4).not.toBeNull();
        lonLat1.destroy();
        lonLat2.destroy();
        lonLat3.destroy();
        lonLat4.destroy();
    });

    it('fromString', () => {
        var str = "100,50";
        var lonLat = new LonLat.fromString(str);
        expect(lonLat).not.toBeNull();
        expect(lonLat.CLASS_NAME).toEqual("SuperMap.LonLat");
        expect(lonLat.lat).toEqual(50);
        expect(lonLat.lon).toEqual(100);
        lonLat.destroy();
    });

    it('fromArray', () => {
        var arr = [100, 50];
        var lonLat = new LonLat.fromArray(arr);
        expect(lonLat).not.toBeNull();
        expect(lonLat.CLASS_NAME).toEqual("SuperMap.LonLat");
        expect(lonLat.lat).toEqual(50);
        expect(lonLat.lon).toEqual(100);
        lonLat.destroy();
    });
});