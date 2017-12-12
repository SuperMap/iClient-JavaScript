require('../../../src/common/commontypes/Date');

describe('Date', function () {
    it('toISOString', function () {
        var dateString = SuperMap.Date.toISOString(new Date());
        expect(dateString).not.toBeNaN();
    });

    it('parse', function () {
        var date1 = SuperMap.Date.parse("2010-08-07T11:58:23.123-06");
        var date2 = SuperMap.Date.parse("sca123");
        var date1String = SuperMap.Date.toISOString(date1);
        expect(date1String).toEqual("2010-08-07T17:58:23.123Z");
        expect(date2).not.toBeNull();
    });
});