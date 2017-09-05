require('../../../src/common/control/TimeFlowControl');

describe('testTimeFlowControl', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var options = {
        speed: 1,
        frequency: 1000,
        startTime: 1498772645000,
        endTime: 1498935332000,
        repeat: true,
        reverse: false
    };

    var callback = function (currentTime) {

    };

    it("updateOptions", function () {
        var option = {
            speed: 2,
            frequency: 2000,
            startTime: 2498772645000,
            endTime: 2498935332000,
            repeat: false,
            reverse: true
        };
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, options);
        timeflowcontrol.updateOptions(option);
        expect(timeflowcontrol.getSpeed()).toBe(2);
        expect(timeflowcontrol.getFrequency()).toBe(2000);
        expect(timeflowcontrol.getStartTime()).toBe(2498772645000);
        expect(timeflowcontrol.getEndTime()).toBe(2498935332000);
        expect(timeflowcontrol.getReverse()).toBeTruthy();
        expect(timeflowcontrol.getRepeat()).toBeFalsy();

    });

    it("start", function () {
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, options);
        timeflowcontrol.start();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.intervalId).toBeGreaterThan(1);

    });

    it("start_reverse_true", function () {
        var option = {
            speed: 2,
            frequency: 2000,
            startTime: 2498772645000,
            endTime: 2498935332000,
            repeat: false,
            reverse: true
        };
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.start();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.intervalId).toBeGreaterThan(1);
    });

    it("start_isEnd", function () {
        var option = {
            speed: 1,
            frequency: 2000,
            startTime: 2498772645000,
            endTime: 2498772645001,
            repeat: false,
            reverse: false
        };
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.oldTime = timeflowcontrol.endTime;
        timeflowcontrol.start();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.intervalId).toBeGreaterThan(1);
    });

    it("stop", function () {
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, options);
        timeflowcontrol.stop();
        expect(timeflowcontrol.getStartTime()).toBe(timeflowcontrol.currentTime);
        expect(timeflowcontrol.getRunning()).toBeFalsy();
    });

    it("destroy", function () {
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, options);
        timeflowcontrol.destroy();
        expect(timeflowcontrol.oldTime).toBeNull();
        expect(timeflowcontrol.callback).toBeNull();
    });

    it("tick", function () {
        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, options);
        expect(timeflowcontrol.intervalId).not.toBeDefined();
        timeflowcontrol.tick();
        expect(timeflowcontrol.intervalId).not.toBeNull();
        expect(timeflowcontrol.intervalId).toBeGreaterThan(1);
    });


    it("update", function () {
        var option = {
            speed: 1000,
            frequency: 1000,
            startTime: 1498772645000,
            endTime: 1498772647000,
            repeat: false,
            reverse: false
        };

        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.running = true;
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.getCurrentTime()).toBe(1498772646000);
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.getCurrentTime()).toBe(1498772647000);
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeFalsy();
    });

    it("update_reverse_true", function () {
        var option = {
            speed: 1000,
            frequency: 1000,
            startTime: 1498772645000,
            endTime: 1498772646000,
            repeat: false,
            reverse: false
        };

        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.running = true;
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.getCurrentTime()).toBe(1498772646000);
        timeflowcontrol.setReverse(true);
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
    });

    it("update_reverse_false_and_repeat_true", function () {
        var option = {
            speed: 1000,
            frequency: 1000,
            startTime: 1498772645000,
            endTime: 1498772646000,
            repeat: true,
            reverse: false
        };

        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.running = true;
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.getCurrentTime()).toBe(1498772646000);
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
    });
    it("update_reverse_true_and_repeat_true", function () {
        var option = {
            speed: 1000,
            frequency: 1000,
            startTime: 1498772645000,
            endTime: 1498772646000,
            repeat: true,
            reverse: true
        };

        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.running = true;
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
        expect(timeflowcontrol.getCurrentTime()).toBe(1498772646000);
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeTruthy();
    });

    it("update_reverse_true_and_repeat_false", function () {
        var option = {
            speed: 1000,
            frequency: 1000,
            startTime: 1498772645000,
            endTime: 1498772646000,
            repeat: false,
            reverse: true
        };

        var timeflowcontrol = new SuperMap.TimeFlowControl(callback, option);
        timeflowcontrol.running = true;
        timeflowcontrol.update();
        expect(timeflowcontrol.getRunning()).toBeFalsy();
    });


});
