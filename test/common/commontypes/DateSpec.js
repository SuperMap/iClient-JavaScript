import {DateExt} from '../../../src/common/commontypes/Date';

describe('Date', () => {
    it('toISOString', () => {
        var dateString = DateExt.toISOString(new Date());
        expect(dateString).not.toBeNaN();
    });

    it('parse', () => {
        var date1 = DateExt.parse("2010-08-07T11:58:23.123-06");
        var date2 = DateExt.parse("sca123");
        var date1String = DateExt.toISOString(date1);
        expect(date1String).toEqual("2010-08-07T17:58:23.123Z");
        expect(date2).not.toBeNull();
    });
});