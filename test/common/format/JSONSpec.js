import {JSONFormat} from '../../../src/common/format/JSON';
import {Format} from '../../../src/common/format/Format';

describe('JSON', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var attributes = {
        "CITY": "北京市",
        "SMID": 1,
        "ADDRESS": ["海淀区", "天安门", "东城区"]
    };
    var POINTSARRAY = {"POINTSARRAY": [1, 2, 3, 4]};
    var BOOLEANOBJ = {"ISJSON": false};
    var DATE = {"DATE": new Date()};
    var pretty = true;

    it("read", () => {
        var attribute = JSON.stringify(attributes);
        var jsonFormat = new JSONFormat();
        var jsonObject = jsonFormat.read(attribute);
        expect(typeof (jsonObject)).toBe('object');
        expect(typeof (jsonObject.SMID)).toBe('number');
        expect(typeof (jsonObject.CITY)).toBe('string');
        expect((jsonObject.ADDRESS) instanceof Array).toBeTruthy();
    });

    it("write_object", () => {
        var jsonFormat = new JSONFormat();
        var jsonString = jsonFormat.write(attributes, pretty);
        expect(typeof (jsonString)).toBe('string');
    });

    it("write_array", () => {
        var jsonFormat = new JSONFormat();
        var jsonString = jsonFormat.write(POINTSARRAY, pretty);
        expect(typeof (jsonString)).toBe('string');
    });

    it("write_boolean", () => {
        var jsonFormat = new JSONFormat();
        var jsonString = jsonFormat.write(BOOLEANOBJ, pretty);
        expect(typeof (jsonString)).toBe('string');
    });

    it("write_date", () => {
        var jsonFormat = new JSONFormat();
        var jsonString = jsonFormat.write(DATE, pretty);
        expect(typeof (jsonString)).toBe('string');
    });

    it("write_number", () => {
        var jsonFormat = new JSONFormat();
        var jsonString = jsonFormat.write(POINTSARRAY, pretty);
        expect(typeof (jsonString)).toBe('string');
    });
});
