import { IManager } from '../../../src/common/IManager/IManager';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { SecurityManager } from '../../../src/common/security/SecurityManager';

SecurityManager.imanagerToken = 'test';
describe('IManager', () => {
  it('iServerList', (done) => {
    var imanager = new IManager('https://fake/imanager');
    expect(imanager).not.toBeNull();
    spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
      expect(options.headers['X-Auth-Token']).toBe('test');
      expect(testUrl).toBe('https://fake/imanager/cloud/web/nodes/server.json');
      return Promise.resolve(new Response(`{"list":[],"total":0}`));
    });
    imanager.iServerList().then(function (response) {
      const res = JSON.stringify(response);
      expect(res).toBe('{"list":[],"total":0}');
      done();
    });
  });
  it('createIServer', (done) => {
    var imanager = new IManager('https://fake/imanager');
    expect(imanager).not.toBeNull();
    spyOn(FetchRequest, 'post').and.callFake((testUrl, params, options) => {
      expect(options.headers['X-Auth-Token']).toBe('test');
      expect(testUrl).toBe('https://fake/imanager/cloud/web/nodes/server.json');
      return Promise.resolve(new Response(`{"isSucceed":true}`));
    });
    imanager.createIServer({}).then(function (response) {
      const res = JSON.stringify(response);
      expect(res).toBe('{"isSucceed":true}');
      done();
    });
  });
  it('startNodes', (done) => {
    var imanager = new IManager('https://fake/imanager');
    expect(imanager).not.toBeNull();
    spyOn(FetchRequest, 'post').and.callFake((testUrl, params, options) => {
      expect(options.headers['X-Auth-Token']).toBe('test');
      expect(testUrl).toBe('https://fake/imanager/cloud/web/nodes/started.json');
      return Promise.resolve(new Response(`{"isSucceed":true}`));
    });
    imanager.startNodes([1]).then(function (response) {
      const res = JSON.stringify(response);
      expect(res).toBe('{"isSucceed":true}');
      done();
    });
  });
  it('stopNodes', (done) => {
    SecurityManager.imanagerToken = 'test';
    var imanager = new IManager('https://fake/imanager');
    expect(imanager).not.toBeNull();
    spyOn(FetchRequest, 'post').and.callFake((testUrl, params, options) => {
      expect(options.headers['X-Auth-Token']).toBe('test');
      expect(testUrl).toBe('https://fake/imanager/cloud/web/nodes/stopped.json');
      return Promise.resolve(new Response(`{"isSucceed":true}`));
    });
    imanager.stopNodes([1]).then(function (response) {
      const res = JSON.stringify(response);
      expect(res).toBe('{"isSucceed":true}');
      done();
    });
  });
});
