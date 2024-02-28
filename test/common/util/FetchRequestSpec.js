import { FetchRequest, isCORS, setCORS, setFetch, RequestJSONPPromise } from '../../../src/common//util/FetchRequest';

describe('FetchRequest', () => {
    const defaultval = RequestJSONPPromise.limitLength;
    const defaltCors = isCORS();
    let fetch;
    beforeAll(() => {
        fetch = jasmine.createSpy('fetch').and.resolveTo({ success: 'ok' });
        setFetch(fetch);
    });
    it('RequestJSONPPromise', () => {
        var url = 'http://test.supermap.io/examples/leaflet/editor.html#addressMatchService';
        var params;
        var options;
        spyOn(RequestJSONPPromise, 'issue').and.callFake(() => {});
        setCORS(false);
        FetchRequest.get(url, params, options);
        expect(RequestJSONPPromise.issue).toHaveBeenCalled();
        var paramsde = {
            completeLineSymbolDisplayed: false,
            visible: true
        };
        RequestJSONPPromise.limitLength = 5;
        var deleteUri =
            'http://test/GUID=PCdd8b1ab00896b3a7a&app=ydrive&cl=desktop?leftBottom%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D,%22rightTo';
        FetchRequest.delete(deleteUri, paramsde, options);
        expect(RequestJSONPPromise.issue.calls.count()).toBe(2);

        FetchRequest.post(deleteUri, paramsde, options);
        expect(RequestJSONPPromise.issue.calls.count()).toBe(3);

        RequestJSONPPromise.limitLength = 180;

        FetchRequest.put(deleteUri, paramsde, options);
        expect(RequestJSONPPromise.issue.calls.count()).toBe(4);
        setCORS(defaltCors);
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
    it('formdata', () => {
        var url = 'http://test.supermap.io';
        var data = new FormData();
        FetchRequest.post(url, new FormData(), { withCredentials: 'depends' });
        expect(fetch).toHaveBeenCalledWith('http://test.supermap.io.json', {
            method: 'POST',
            body: data,
            headers: { },
            credentials: 'same-origin',
            mode: 'cors',
            timeout: 45000
        });
    });
    it('formdata_includeContentType', () => {
        var url = 'http://test.supermap.io';
        var data = new FormData();
        FetchRequest.post(url, new FormData(), { withCredentials: 'depends', headers: { 'Content-Type': 'aaaaa' } });
        expect(fetch).toHaveBeenCalledWith('http://test.supermap.io.json', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'aaaaa' },
            credentials: 'same-origin',
            mode: 'cors',
            timeout: 45000
        });
    });
    it('delete_urllong', () => {
        var ids = []
        for(var i = 0;i <500; i++){
            ids.push(i)
        }
        var url = 'http://test.supermap.io/examples/leaflet/editor.html#addressMatchService';
        var params = {
            ids: ids
        };
        setCORS(true);
        spyOn(FetchRequest, '_fetch').and.callFake((url) => {
            expect(url).not.toContain('499');
        });
        FetchRequest.delete(url, params);
        expect(FetchRequest._fetch.calls.count()).toBe(1);
    });
    it('Get_urllong', () => {
        var ids = []
        for(var i = 0;i <500; i++){
            ids.push(i)
        }
        var url = 'http://test.supermap.io/examples/leaflet/editor.html#addressMatchService';
        var params = {
            ids: ids
        };
        setCORS(true);
        spyOn(FetchRequest, '_fetch').and.callFake((url) => {
            expect(url).not.toContain('499');
        });
        FetchRequest.get(url, params);
        expect(FetchRequest._fetch.calls.count()).toBe(1);
    });
    afterAll(() => {
        RequestJSONPPromise.limitLength = defaultval;
        setCORS(defaltCors);
        setFetch(window.fetch);
    });
});
