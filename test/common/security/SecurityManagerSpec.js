require('../../../src/common/security/SecurityManager');
describe('testSecurityManager', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("registerServers", function () {
        var serverInfo = new SuperMap.ServerInfo(SuperMap.ServerType.IPORTAL, {
            server: "http://localhost:8092/iportal",
        });
        SuperMap.SecurityManager.registerServers([serverInfo]);
        expect(JSON.stringify(SuperMap.SecurityManager.servers[serverInfo.server])).toBe(JSON.stringify(serverInfo));
    });

    it("generateToken", function () {
        var url = "http://localhost:78989/iportal";
        var param = new SuperMap.TokenServiceParameter();
        var result = SuperMap.SecurityManager.generateToken(url, param);
        expect(result).toBeUndefined();
    });

    it("registerToken", function () {
        var url = "http://localhost:8092/iportal/web/services/32";
        var token = "_Bo_ksR9DC56MvnAXc6liuhAdWmmt1SuoLX758QIeBJUvteLqHqUeeHnQ6OU0i0VBoN5FjNP_SOQ2o1xyudBjA..";
        SuperMap.SecurityManager.registerToken(url, token);
        var result = SuperMap.SecurityManager.getToken('http://localhost:8092/iportal');
        expect(result).not.toBeNull();
        expect(result).toBe(token);

    });

    it("registerKey", function () {
        var ids = ["http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China"];
        var key = "ZlQAFd5VSxSECMuvCToUQ6ja";
        SuperMap.SecurityManager.registerKey(ids, key);
        var result = SuperMap.SecurityManager.getKey('http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest');
        expect(result).not.toBeNull();
        expect(result).toBe(key);
    });

    it("getServerInfo", function () {
        var url = "http://localhost:8093";
        serverInfo = new SuperMap.ServerInfo(SuperMap.ServerType.IPORTAL, {
            server: url,
        });
        SuperMap.SecurityManager.registerServers(serverInfo);
        var result = SuperMap.SecurityManager.getServerInfo(url);
        expect(result.CLASS_NAME).toBe("SuperMap.ServerInfo");
        expect(result.keyServiceUrl).toBe("http://localhost:8093/web/mycontent/keys/register.json");
        expect(result.server).toBe("http://localhost:8093");
        expect(result.tokenServiceUrl).toBe("http://localhost:8093/services/security/tokens.json");
        expect(result.type).toBe("IPORTAL");
    });

    it("getToken", function () {
        var url = "http://localhost:8091/iportal";
        var token = "_Ro_ksR9DC56MvnAXc6liuhAdWmmt1SuoLX758QIeBJUvteLqHqUeeHnQ6OU0i0VBoN5FjNP_SOQ2o1xyudBjA..";
        SuperMap.SecurityManager.registerToken(url, token);
        url = "http://localhost:8091/iportal/web/services/32";
        var result = SuperMap.SecurityManager.getToken(url);
        expect(result).not.toBeNull();
        expect(result).toBe(token);
    });

    it("getKey", function () {
        var ids = ["http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China"];
        var key = "ZlQAFd5VSxSECM1212121Q6ja";
        SuperMap.SecurityManager.registerKey(ids, key);
        var result = SuperMap.SecurityManager.getKey(ids[0]);
        expect(result).not.toBeNull();
        expect(result).toBe(key);
    });

    it("loginOnline", function () {
        var callbackLocation = "Online";
        var newTab = false;
        SuperMap.SecurityManager.loginOnline(callbackLocation, newTab);
    });

    it("loginiPortal", function () {
        var url = 'http://localhost:8092';
        SuperMap.SecurityManager.loginiPortal(url, "admin","admin");
    });

    it("destroyAllCredentials", function () {
        SuperMap.SecurityManager.destroyAllCredentials();
        expect(SuperMap.SecurityManager.keys).toBeNull();
        expect(SuperMap.SecurityManager.tokens).toBeNull();
        expect(SuperMap.SecurityManager.servers).toBeNull();
    });

    it("destroyToken", function () {
        var url = "http://localhost:8092/web/services/32";
        expect(SuperMap.SecurityManager.getToken(url)).not.toBeNull();
        SuperMap.SecurityManager.destroyToken(url);
        expect(SuperMap.SecurityManager.getToken(url)).toBeUndefined();
    });

    it("destroyKey", function () {
        var id = "http://localhost:8099/s3h4sgb3/iserver/services/map-china400/rest/maps/China";
        expect(SuperMap.SecurityManager.getKey(id)).not.toBeNull();
        SuperMap.SecurityManager.destroyKey(id);
        expect(SuperMap.SecurityManager.getKey(id)).toBeUndefined();
    });

});
