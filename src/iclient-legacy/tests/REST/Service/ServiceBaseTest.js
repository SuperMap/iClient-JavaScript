module("ServiceBase");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(12);
    var url = GlobeParameter.WorldURL;
    var serviceBase = new SuperMap.ServiceBase(url);
    ok(serviceBase, !null, "Not Null");
    equal(serviceBase.CLASS_NAME, "SuperMap.ServiceBase", "serviceBase.CLASS_NAME");
    equal(serviceBase.url, url, "serviceBase.url");
    equal(serviceBase.urls, null, "serviceBase.urls");
    equal(serviceBase.index, null, "serviceBase.index");
    equal(serviceBase.length, null, "serviceBase.length");
    equal(serviceBase.options, null, "serviceBase.options");
    equal(serviceBase.totalTimes, 1, "serviceBase.totalTimes");
    equal(serviceBase.POLLING_TIMES, 3, "serviceBase.POLLING_TIMES");
    equal(serviceBase._processSuccess, null, "serviceBase._processSuccess");
    equal(serviceBase._processFailed, null, "serviceBase._processFailed");
    equal(serviceBase.isInTheSameDomain, SuperMap.Util.isInTheSameDomain(url), "serviceBase.isInTheSameDomain");
});

//测试设置参数值的有效性
test("TestConstructor", function() {
    expect(3);
    var globeURL = GlobeParameter.WorldURL;
    var url = [globeURL, globeURL];
    var serviceBase = new SuperMap.ServiceBase(url);
    equal(serviceBase.urls.length, 2, "serviceBase.urls");
    equal(serviceBase.length, 2, "serviceBase.length");
    equal(serviceBase.totalTimes, 2, "serviceBase.totalTimes");
});

test("TestDestroy", function() {
    expect(4);
    var globeURL = GlobeParameter.WorldURL;
    var url = [globeURL, globeURL];
    var serviceBase = new SuperMap.ServiceBase(url);
    serviceBase.destroy();
    equal(serviceBase.urls, null, "serviceBase.urls");
    equal(serviceBase.length, null, "serviceBase.length");
    equal(serviceBase.totalTimes, null, "serviceBase.totalTimes");
    equal(serviceBase.isInTheSameDomain, null, "serviceBase.isInTheSameDomain");
});

//url不带安全信息
test("TestRequest", function() {
    expect(8);
    var url = GlobeParameter.WorldURL + ".jsonp";
    var serviceBase = new SuperMap.ServiceBase(url);
    var options = {
        url: url,
        method: "GET",
        isInTheSameDomain: false,
        success: succeed,
        failure: failed
    };
    serviceBase.request(options);
    equal(options.isInTheSameDomain, serviceBase.isInTheSameDomain, "requset");
    equal(serviceBase.totalTimes, 0, "request");
    equal(serviceBase._processSuccess, succeed, "request");
    equal(serviceBase._processFailed, failed, "request");
    equal(options.scope.toString(), serviceBase.toString(), "request");
    equal(options.success, serviceBase.getUrlCompleted, "request");
    equal(options.failure, serviceBase.getUrlFailed, "request");
    equal(serviceBase.options.toString(), options.toString(), "reqest");

    function succeed() {}
    function failed() {}
});

//url带安全信息
test("TestRequest", function() {
    expect(3);
    var url = GlobeParameter.WorldURL + ".jsonp";
    var serviceBase = new SuperMap.ServiceBase(url);
    var options = {
        url: url,
        method: "GET",
        isInTheSameDomain: false,
        success: succeed,
        failure: failed
    };
    SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(222, 1211);
    serviceBase.request(options);
    equal(options.url, url + "?1211=222", "request");

    var url = GlobeParameter.WorldURL + ".jsonp?";
    var serviceBase = new SuperMap.ServiceBase(url);
    var options = {
        url: url,
        method: "GET",
        isInTheSameDomain: false,
        success: succeed,
        failure: failed
    };
    SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(222, 1211);
    serviceBase.request(options);
    equal(options.url, url + "1211=222", "request");

    var url = GlobeParameter.WorldURL + ".jsonp?555";
    var serviceBase = new SuperMap.ServiceBase(url);
    var options = {
        url: url,
        method: "GET",
        isInTheSameDomain: false,
        success: succeed,
        failure: failed
    };
    SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(222, 1211);
    serviceBase.request(options);
    equal(options.url, url + "&1211=222", "request");

    function succeed() {}
    function failed() {}
});

test("TestGetUrlFailed", function() {
    expect(2);
    var globeURL = GlobeParameter.WorldURL + ".jsonp";
    var url = [globeURL, globeURL];
    var serviceBase = new SuperMap.ServiceBase(url);
    var options = {
        url: globeURL,
        method: "GET",
        isInTheSameDomain: false,
        success: succeed,
        failure: failed
    };
    serviceBase.request(options);
    equal(serviceBase.totalTimes, 1, "getUrlFailed");
    serviceBase.getUrlFailed();
    equal(serviceBase.totalTimes, 0, "getUrlFailed");

    function succeed() {}
    function failed() {}
});

test("TestCalculatePollingTimes", function() {
    expect(2);
    var globeURL = GlobeParameter.WorldURL + ".jsonp";
    var url = [globeURL, globeURL];
    var serviceBase = new SuperMap.ServiceBase(url);
    serviceBase.calculatePollingTimes();
    equal(serviceBase.totalTimes, 1, "calculatePollingTimes");

    var url = [globeURL, globeURL, globeURL, globeURL];
    var serviceBase = new SuperMap.ServiceBase(url);
    serviceBase.calculatePollingTimes();
    equal(serviceBase.totalTimes, 2, "calculatePollingTimes");
})