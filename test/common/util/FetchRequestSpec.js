import { FetchRequest, isCORS, setCORS } from '../../../src/common//util/FetchRequest';

describe('FetchRequest', () => {
    var defaultval = SuperMap.Util.RequestJSONPPromise.limitLength;
    var defaltCors=isCORS();
    it('RequestJSONPPromise', () => {
        var url = "http://test.supermap.io/examples/leaflet/editor.html#addressMatchService";
        var params;
        var options;
        spyOn(SuperMap.Util.RequestJSONPPromise, 'issue').and.callThrough();
        setCORS(false);
        FetchRequest.get(url, params, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue).toHaveBeenCalled();
        var paramsde = {
            "completeLineSymbolDisplayed": false,
            "visible": true,
        };
        SuperMap.Util.RequestJSONPPromise.limitLength = 5;
        var deleteUri = "http://test/GUID=PCdd8b1ab00896b3a7a&app=ydrive&cl=desktop?leftBottom%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D,%22rightTo"
        FetchRequest.delete(deleteUri, paramsde, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue.calls.count()).toBe(2);

        FetchRequest.post(deleteUri, paramsde, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue.calls.count()).toBe(3);

        SuperMap.Util.RequestJSONPPromise.limitLength = 180;
        spyOn(FetchRequest, '_fetchJsonp').and.callFake(() => {
        });
        FetchRequest.put(deleteUri, paramsde, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue.calls.count()).toBe(4);
    });

    afterAll(() => {
        SuperMap.Util.RequestJSONPPromise.limitLength = defaultval;
        setCORS(defaltCors);
    });
})