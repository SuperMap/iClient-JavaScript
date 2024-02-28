import { SecurityManager } from '../../../src/common/security/SecurityManager';
import { ServerInfo } from '../../../src/common/security/ServerInfo';
import { TokenServiceParameter } from '../../../src/common/security/TokenServiceParameter';
import { ServerType } from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

describe('SecurityManager', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('registerServers', () => {
        var serverInfo = new ServerInfo(ServerType.IPORTAL, {
            server: 'http://localhost:8092/iportal'
        });
        SecurityManager.registerServers([serverInfo]);
        expect(JSON.stringify(SecurityManager.servers[serverInfo.server])).toBe(JSON.stringify(serverInfo));
    });

    it('generateToken', () => {
        var url = 'http://localhost:78989/iportal';
        var param = new TokenServiceParameter();
        var result = SecurityManager.generateToken(url, param);
        expect(result).toBeUndefined();
    });

    it('registerToken', () => {
        var url = 'http://localhost:8092/iportal/web/services/32';
        var token = '_Bo_ksR9DC56MvnAXc6liuhAdWmmt1SuoLX758QIeBJUvteLqHqUeeHnQ6OU0i0VBoN5FjNP_SOQ2o1xyudBjA..';
        SecurityManager.registerToken(url, token);
        var result = SecurityManager.getToken('http://localhost:8092/iportal');
        expect(result).not.toBeNull();
        expect(result).toBe(token);
    });

    it('registerKey', () => {
        var ids = ['http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China'];
        var key = 'ZlQAFd5VSxSECMuvCToUQ6ja';
        SecurityManager.registerKey(ids, key);
        var result = SecurityManager.getKey('http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest');
        expect(result).not.toBeNull();
        expect(result).toBe(key);
    });

    it('getServerInfo', () => {
        var url = 'http://localhost:8093';
        var serverInfo = new ServerInfo(ServerType.IPORTAL, {
            server: url
        });
        SecurityManager.registerServers(serverInfo);
        var result = SecurityManager.getServerInfo(url);
        expect(result.CLASS_NAME).toBe('SuperMap.ServerInfo');
        expect(result.keyServiceUrl).toBe('http://localhost:8093/web/mycontent/keys/register');
        expect(result.server).toBe('http://localhost:8093');
        expect(result.tokenServiceUrl).toBe('http://localhost:8093/services/security/tokens');
        expect(result.type).toBe('IPORTAL');
    });

    it('getToken', () => {
        var url = 'http://localhost:8091/iportal';
        var token = '_Ro_ksR9DC56MvnAXc6liuhAdWmmt1SuoLX758QIeBJUvteLqHqUeeHnQ6OU0i0VBoN5FjNP_SOQ2o1xyudBjA..';
        SecurityManager.registerToken(url, token);
        url = 'http://localhost:8091/iportal/web/services/32';
        var result = SecurityManager.getToken(url);
        expect(result).not.toBeNull();
        expect(result).toBe(token);
    });

    it('getKey', () => {
        var ids = ['http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China'];
        var key = 'ZlQAFd5VSxSECM1212121Q6ja';
        SecurityManager.registerKey(ids, key);
        var result = SecurityManager.getKey(ids[0]);
        expect(result).not.toBeNull();
        expect(result).toBe(key);
    });

    it('loginOnline', () => {
        spyOn(window, 'open').and.callFake(()=>{});
        var callbackLocation = 'Online';
        var newTab = false;
        SecurityManager.loginOnline(callbackLocation, newTab);
        expect(window.open).toHaveBeenCalled();
    });

    it('loginiPortal', () => {
        spyOn(FetchRequest, 'post').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe("http://fakeiportal/web/login");
            expect(params).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        var url = 'http://fakeiportal';
        SecurityManager.loginiPortal(url, 'admin', 'admin');
    });

    it('loginManager', () => {
      spyOn(FetchRequest, 'post').and.callFake((testUrl, params, options) => {
          expect(testUrl).toBe("http://fakeimanager/imanager/security/tokens");
          expect(params).not.toBeNull();
          return Promise.resolve(new Response(`test`));
      });
      var url = 'http://fakeimanager/imanager';
      SecurityManager.loginManager(url, 'admin', 'admin').then(res => {
        expect(res).toBe('test');
      })
  });

    it('destroyAllCredentials', () => {
        SecurityManager.destroyAllCredentials();
        expect(SecurityManager.keys).toBeNull();
        expect(SecurityManager.tokens).toBeNull();
        expect(SecurityManager.servers).toBeNull();
    });

    it('destroyToken', () => {
        var url = 'http://localhost:8092/web/services/32';
        expect(SecurityManager.getToken(url)).not.toBeNull();
        SecurityManager.destroyToken(url);
        expect(SecurityManager.getToken(url)).toBeUndefined();
    });

    it('destroyKey', () => {
        var id = 'http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China';
        expect(SecurityManager.getKey(id)).not.toBeNull();
        SecurityManager.destroyKey(id);
        expect(SecurityManager.getKey(id)).toBeUndefined();
    });

    it('appendCredential', () => {
        var url = 'http://localhost:8091/iportal';
        var token = '_Ro_ksR9DC56MvnAXc6liuhAdWmmt1SuoLX758QIeBJUvteLqHqUeeHnQ6OU0i0VBoN5FjNP_SOQ2o1xyudBjA..';
        SecurityManager.registerToken(url, token);
        url = 'http://localhost:8091/iportal/web/services/32';
        var newUrl = SecurityManager.appendCredential(url);
        expect(newUrl).toBe(url + '?token=' + token);
        SecurityManager.destroyAllCredentials();
    });
    it('appendCredentialKey', () => {
      var url = 'http://localhost:8091/iportal';
      var key = '_Ro_ksR9DC56MvnAXc6liuhAdWmmt1SuoL';
      SecurityManager.registerKey(url, key);
      var newUrl = SecurityManager.appendCredential(url);
      expect(newUrl).toBe(url + '?key=' + key);
      SecurityManager.destroyAllCredentials();
    });
    it('appendCredentialTokenKey', () => {
        var url = 'http://localhost:8091/iportal';
        var token = '_Ro_ksR9DC56MvnAXc6liuhAdWmmt1SuoLX758QIeBJUvteLqHqUeeHnQ6OU0i0VBoN5FjNP_SOQ2o1xyudBjA..';
        var key = '_Ro_ksR9DC56MvnAXc6liuhAdWmmt1SuoL';
        SecurityManager.registerToken(url, token);
        SecurityManager.registerKey(url, key);
        url = 'http://localhost:8091/iportal/web/services/32';
        var newUrl = SecurityManager.appendCredential(url);
        expect(newUrl).toBe(url + '?token=' + token);
        SecurityManager.destroyAllCredentials();
    });
    it('appendCredentialNull', () => {
        var url = 'http://localhost:8091/iportal/web/services/32';
        var newUrl = SecurityManager.appendCredential(url);
        expect(newUrl).toBe(url);
        SecurityManager.destroyAllCredentials();
    });
});
