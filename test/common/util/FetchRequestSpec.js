import { FetchRequest, isCORS, setCORS, setFetch } from '../../../src/common//util/FetchRequest';

describe('FetchRequest', () => {
    const defaultval = SuperMap.Util.RequestJSONPPromise.limitLength;
    const defaltCors = isCORS();
    let fetch;
    beforeAll(() => {
        fetch = jasmine.createSpy('fetch').and.resolveTo({ success: 'ok' });
        setFetch(fetch);
    });
    xit('RequestJSONPPromise', () => {
        var url = 'http://test.supermap.io/examples/leaflet/editor.html#addressMatchService';
        var params;
        var options;
        spyOn(SuperMap.Util.RequestJSONPPromise, 'issue').and.callThrough();
        setCORS(defaltCors);
        FetchRequest.get(url, params, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue).toHaveBeenCalled();
        var paramsde = {
            completeLineSymbolDisplayed: false,
            visible: true
        };
        SuperMap.Util.RequestJSONPPromise.limitLength = 5;
        var deleteUri =
            'http://test/GUID=PCdd8b1ab00896b3a7a&app=ydrive&cl=desktop?leftBottom%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D,%22rightTo';
        FetchRequest.delete(deleteUri, paramsde, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue.calls.count()).toBe(2);

        FetchRequest.post(deleteUri, paramsde, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue.calls.count()).toBe(3);

        SuperMap.Util.RequestJSONPPromise.limitLength = 180;
        spyOn(FetchRequest, '_fetchJsonp').and.callFake(() => {});
        FetchRequest.put(deleteUri, paramsde, options);
        expect(SuperMap.Util.RequestJSONPPromise.issue.calls.count()).toBe(4);
        setCORS(true);
    });

    it('Get_arrayObject', () => {
        var url = 'http://test.supermap.io/examples/leaflet/editor.html#addressMatchService';
        var params = {
            tags: ['bb', 'aa'],
            aa: { aa: 1 }
        };
        setCORS(true);
        spyOn(FetchRequest, '_fetch').and.callFake((url) => {
            expect(url).toContain('%5B%22bb%22%2C%22aa%22%5D');
            expect(url).toContain('%7B%22aa%22%3A1%7D');
        });
        FetchRequest.get(url, params);
        expect(FetchRequest._fetch.calls.count()).toBe(1);
    });
    it('Get_withCredentials_true', () => {
        var url = 'http://test.supermap.io';
        setCORS(true);
        FetchRequest.get(url, null, { withCredentials: true });
        expect(fetch).toHaveBeenCalledWith('http://test.supermap.io.json', {
            method: 'GET',
            body: undefined,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            credentials: 'include',
            mode: 'cors',
            timeout: 45000
        });
    });
    it('Get_withCredentials_false', () => {
        var url = 'http://test.supermap.io';
        setCORS(true);
        FetchRequest.get(url, null, { withCredentials: false });
        expect(fetch).toHaveBeenCalledWith('http://test.supermap.io.json', {
            method: 'GET',
            body: undefined,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            credentials: 'omit',
            mode: 'cors',
            timeout: 45000
        });
    });
    it('Get_withCredentials_any', () => {
        var url = 'http://test.supermap.io';
        setCORS(true);
        FetchRequest.get(url, null, { withCredentials: 'depends' });
        expect(fetch).toHaveBeenCalledWith('http://test.supermap.io.json', {
            method: 'GET',
            body: undefined,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            credentials: 'same-origin',
            mode: 'cors',
            timeout: 45000
        });
    });
    afterAll(() => {
        SuperMap.Util.RequestJSONPPromise.limitLength = defaultval;
        setCORS(defaltCors);
        setFetch(window.fetch);
    });
});
