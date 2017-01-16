module("ServiceUrls");

//测试使用默认参数值的有效性
test("TestConstructor", function() {
    expect(9);
    var url = GlobeParameter.WorldURL;
    var serviceUrls = new SuperMap.REST.ServiceUrls(url);

    ok(serviceUrls, !null, "Not Null");
    equal(serviceUrls.CLASS_NAME, "SuperMap.REST.ServiceUrls", "serviceUrls.CLASS_NAME");
    equal(serviceUrls.url, url, "serviceUrls.url");
    ok(typeof serviceUrls.EVENT_TYPES, Array, "serviceUrls.EVENT_TYPES");
    equal(serviceUrls.EVENT_TYPES[0], "processCompleted", "serviceUrls.EVENT_TYPES");
    equal(serviceUrls.EVENT_TYPES[1], "processFailed", "serviceUrls.EVENT_TYPES");
    ok(typeof serviceUrls.events, Function, serviceUrls.events);
    equal(serviceUrls.events.CLASS_NAME, "SuperMap.Events", "serviceUrls.events");
    equal(serviceUrls.isInTheSameDomain, SuperMap.Util.isInTheSameDomain(url), "serviceUrls.isInTheSameDomain");
});

//测试设置参数值的有效性
test("TestConstructor", function() {
    expect(1);
    var url = GlobeParameter.WorldURL;
    var eventListeners = {
        eventListeners: {
            "processCompleted": succeed,
            "processFailed": failed
        }
    };
    var serviceUrls = new SuperMap.REST.ServiceUrls(url, eventListeners);
    equal(serviceUrls.eventListeners.toString(), eventListeners.toString(), "serviceUrls.eventListeners");

    function succeed() {}
    function failed() {}
});

test("TestDestory", function() {
    expect(3);
    var url = GlobeParameter.WorldURL;
    var eventListeners = {
        eventListeners: {
            "processCompleted": succeed,
            "processFailed": failed
        }
    };
    var serviceUrls = new SuperMap.REST.ServiceUrls(url, eventListeners);
    serviceUrls.destroy();
    equal(serviceUrls.EVENT_TYPES, null, "destory");
    equal(serviceUrls.events, null, "destory");
    equal(serviceUrls.eventListeners, null, "destory");

    function succeed() {}
    function failed() {}
});