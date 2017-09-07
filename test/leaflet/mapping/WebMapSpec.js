require('../../../src/leaflet/mapping/WebMap');

describe('leaflet_WebMapTest', function() {
    var originalTimeout;
    var testDiv;
    beforeEach(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        window.document.body.removeChild(testDiv);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('TIANDITU add FEATURE_LAYER test', function (done) {
        var tianDiTuWebMap =  L.supermap.webmap(44, {server: "support.supermap.com.cn:8092"});
        setTimeout(function () {
            try {
                expect(tianDiTuWebMap).not.toBeNull();
                expect(tianDiTuWebMap.id).toBe(44);
                tianDiTuWebMap.remove();
                done();
            }catch(exception) {
                console.log("'TIANDITU'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }

        },5000);
    });

    it('BAIDU test', function (done) {
        var BaiDuWebMap =  L.supermap.webmap(53, {server: "support.supermap.com.cn:8092"});
        setTimeout(function () {
            try {
                expect(BaiDuWebMap).not.toBeNull();
                expect(BaiDuWebMap.id).toBe(53);
                BaiDuWebMap.remove();
                done();
            }catch(exception) {
                console.log("'BAIDU'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }

        },5000);
    });

    it('CLOUD test', function (done) {
        var CloudWebMap =  L.supermap.webmap(439);
        setTimeout(function () {
            try {
                expect(CloudWebMap).not.toBeNull();
                expect(CloudWebMap.id).toBe(439);
                CloudWebMap.remove();
                done()
            }catch(exception) {
                console.log("'CLOUD'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }

        },5000);
    });
});