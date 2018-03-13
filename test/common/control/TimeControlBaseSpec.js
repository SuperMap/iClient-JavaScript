import {TimeControlBase} from '../../../src/common/control/TimeControlBase';

describe('TimeControlBase', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    var options = {
        speed: 1,
        frequency: 1000,
        startTime: 1498772645000,
        endTime: 1498935332000,
        repeat: true,
        reverse: false,
    };

    it('updateOptions', () => {
        var timecontrolbase = new TimeControlBase(options);
        timecontrolbase.updateOptions(options);
        expect(timecontrolbase.getSpeed()).toBe(1);
        expect(timecontrolbase.getFrequency()).toBe(1000);
        expect(timecontrolbase.getStartTime()).toBe(1498772645000);
        expect(timecontrolbase.getEndTime()).toBe(1498935332000);
        expect(timecontrolbase.getRepeat()).toBeTruthy();
        expect(timecontrolbase.getReverse()).toBeFalsy();
    });

    it('start', () => {
        var timecontrolbase = new TimeControlBase(options);
        expect(timecontrolbase.getRunning()).toBeFalsy();
        timecontrolbase.start();
        expect(timecontrolbase.getRunning()).toBeTruthy();
    });

    it('pause', () => {
        var timecontrolbase = new TimeControlBase(options);
        timecontrolbase.start();
        expect(timecontrolbase.getRunning()).toBeTruthy();
        timecontrolbase.pause();
        expect(timecontrolbase.getRunning()).toBeFalsy();
    });

    it('stop', () => {
        var timecontrolbase = new TimeControlBase(options);
        timecontrolbase.start();
        expect(timecontrolbase.getRunning()).toBeTruthy();
        timecontrolbase.stop();
        expect(timecontrolbase.getStartTime()).toBe(timecontrolbase.getCurrentTime());
        expect(timecontrolbase.getRunning()).toBeFalsy();
    });

    it('toggle', () => {
        var timecontrolbase = new TimeControlBase(options);
        expect(timecontrolbase.getRunning()).toBeFalsy();
        timecontrolbase.toggle();
        expect(timecontrolbase.getRunning()).toBeTruthy();
    });

    it('setSpeed', () => {
        var timecontrolbase = new TimeControlBase(options);
        var speed = 1;
        var result = timecontrolbase.setSpeed(speed);
        expect(result).toBeTruthy();
        expect(timecontrolbase.getSpeed()).toBe(speed);
    });

    it('getSpeed', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getSpeed();
        expect(result).toBe(1);
    });

    it('setFrequency', () => {
        var timecontrolbase = new TimeControlBase(options);
        var frequency = 1000;
        var result = timecontrolbase.setFrequency(frequency);
        expect(result).toBeTruthy();
        expect(timecontrolbase.getFrequency()).toBe(frequency);
        frequency = 0;
        result = timecontrolbase.setFrequency(frequency);
        expect(result).toBeTruthy();
        expect(timecontrolbase.getFrequency()).toBe(frequency);
        frequency = -1;
        result = timecontrolbase.setFrequency(frequency);
        expect(result).toBeFalsy();
    });

    it('getFrequency', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getFrequency();
        expect(result).toBe(1000);
    });

    it('setStartTime', () => {
        var timecontrolbase = new TimeControlBase(options);
        var startTime = 1498772645000;
        var result = timecontrolbase.setStartTime(startTime);
        expect(result).toBeTruthy();
        expect(timecontrolbase.getStartTime()).toBe(startTime);
    });

    it('getStartTime', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getStartTime();
        expect(result).toBe(1498772645000);
    });

    it('setEndTime', () => {
        var timecontrolbase = new TimeControlBase(options);
        var endtime = 1498935332001;
        var result = timecontrolbase.setEndTime(endtime);
        expect(result).toBeTruthy();
        expect(timecontrolbase.getStartTime()).toBe(timecontrolbase.getCurrentTime());
        expect(timecontrolbase.getEndTime()).toBe(endtime);
    });

    it('getEndTime', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getEndTime();
        expect(result).toBe(1498935332000);
    });

    it('setCurrentTime', () => {
        var timecontrolbase = new TimeControlBase(options);
        var currentTime = 1498772655001;
        var result = timecontrolbase.setCurrentTime(currentTime);
        expect(result).toBeTruthy();
        expect(timecontrolbase.getCurrentTime()).toBe(currentTime);

    });

    it('getCurrentTime', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getCurrentTime();
        expect(result).toBe(1498772645000);
    });

    it('setRepeat', () => {
        var timecontrolbase = new TimeControlBase(options);
        var repeat = true;
        timecontrolbase.setRepeat(repeat);
        expect(timecontrolbase.getRepeat()).toBeTruthy();
    });

    it('getRepeat', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getRepeat();
        expect(result).toBeTruthy();
    });

    it('setReverse', () => {
        var timecontrolbase = new TimeControlBase(options);
        var reverse = true;
        timecontrolbase.setReverse(reverse);
        expect(timecontrolbase.getReverse()).toBeTruthy();
    });

    it('getReverse', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getReverse();
        expect(result).toBeFalsy();
    });

    it('getRunning', () => {
        var timecontrolbase = new TimeControlBase(options);
        var result = timecontrolbase.getRunning();
        expect(result).toBeFalsy();
    });

    it('destroy', () => {
        var timecontrolbase = new TimeControlBase(options);
        timecontrolbase.destroy();
        expect(timecontrolbase.getSpeed()).toBeNull();
        expect(timecontrolbase.getFrequency()).toBeNull();
        expect(timecontrolbase.getStartTime()).toBeNull();
        expect(timecontrolbase.getEndTime()).toBeNull();
        expect(timecontrolbase.getCurrentTime()).toBeNull();
        expect(timecontrolbase.getRepeat()).toBeNull();
        expect(timecontrolbase.getRunning()).toBeFalsy();
        expect(timecontrolbase.getReverse()).toBeNull();
    });
});

