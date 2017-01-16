module("Slider");

//不带参数
test("SliderTest_constructor", function() {
    expect(21);

    var slider = new SuperMap.Tool.Slider();
    equal(slider.CLASS_NAME, "SuperMap.Tool.Slider", "Slider_constructor");
    equal(slider.enable, true, "Slider_constructor");
    equal(slider.container, null, "Slider_constructor");
    equal(slider.barSize, 16, "Slider_constructor");
    equal(slider.sliderSize, 150, "Slider_constructor");
    equal(slider.min, 0, "Slider_constructor");
    equal(slider.max, 1, "Slider_constructor");
    equal(slider.value, 0, "Slider_constructor");
    equal(slider.step, 0.05, "Slider_constructor");
    equal(slider.slider.tagName, "DIV", "Slider_constructor");
    equal(slider.slider.className, "smToolSlider", "Slider_constructor");
    equal(slider._completeBar.tagName, "DIV", "Slider_constructor");
    equal(slider._completeBar.className, "smToolCompleteBar", "Slider_constructor");
    equal(slider._sliderBar.tagName, "DIV", "Slider_constructor");
    equal(slider._sliderBar.className, "smToolSliderBar", "Slider_constructor");
    equal(typeof slider.onChanging, "function", "Slider_constructor");
    equal(typeof slider.onChanged, "function", "Slider_constructor");
    equal(typeof slider.drag, "function", "Slider_constructor");
    equal(typeof slider.drop, "function", "Slider_constructor");
    equal(typeof slider.mousedown, "function", "Slider_constructor");
    equal(slider.slider.smSlider.toString(), slider.toString(), "Slider_constructor");
});

//带参数
test("SliderTest_constructor", function() {
    expect(4);

    var slider = new SuperMap.Tool.Slider({"min":0,"max":100,"step":10});
    equal(slider.min, 0, "Slider_constructor");
    equal(slider.max, 100, "Slider_constructor");
    equal(slider.value, 0, "Slider_constructor");
    equal(slider.step, 10, "Slider_constructor");
});

test("SliderTest_destroy", function() {
    expect(17);

    var slider = new SuperMap.Tool.Slider();
    slider.destroy();
    equal(slider.enable, null, "Slider_destroy");
    equal(slider.container, null, "Slider_destroy");
    equal(slider.barSize, null, "Slider_destroy");
    equal(slider.sliderSize, null, "Slider_destroy");
    equal(slider.min, null, "Slider_destroy");
    equal(slider.max, null, "Slider_destroy");
    equal(slider.value, null, "Slider_destroy");
    equal(slider.step, null, "Slider_destroy");
    equal(slider.slider, null, "Slider_destroy");
    equal(slider._completeBar, null, "Slider_destroy");
    equal(slider._sliderBar, null, "Slider_destroy");
    equal(slider.onChanging, null, "Slider_destroy");
    equal(slider.onChanged, null, "Slider_destroy");
    equal(slider.drag, null, "Slider_destroy");
    equal(slider.drop, null, "Slider_destroy");
    equal(slider.mousedown, null, "Slider_destroy");
    equal(slider.smSlider, null, "Slider_destroy");
});

test("SliderTest_getValue", function() {
    var slider = new SuperMap.Tool.Slider({"max": 100});
    slider.setValue(25);
    var value = slider.getValue();
    equal(value, 25, "Slider_getValue");
});

test("SliderTest_setValue", function() {
    expect(11);

    var slider = new SuperMap.Tool.Slider({"max": 100});
    slider.setValue(500);
    equal(slider.value, 100, "Slider_setValue");
    equal(slider.max, 100, "Slider_setValue");
    equal(slider._sliderBar.style.left, "134px", "Slider_setValue");
    equal(slider._completeBar.style.width, "134px", "Slider_setValue");

    var slider1 = new SuperMap.Tool.Slider({"min": 5});
    slider1.setValue(2);
    equal(slider1.value, 5, "Slider_setValue");
    equal(slider1.min, 5, "Slider_setValue");
    equal(slider1._sliderBar.style.left, "0px", "Slider_setValue");
    equal(slider1._completeBar.style.width, "0px", "Slider_setValue");

    var slider2 = new SuperMap.Tool.Slider({"max": 100, "min": 0});
    slider2.setValue(25);
    equal(slider2.value, 25, "Slider_setValue");
    equal(slider2._sliderBar.style.left, "33.5px", "Slider_setValue");
    equal(slider2._completeBar.style.width, "33.5px", "Slider_setValue");
});

test("SliderTest_createSlider", function() {
    expect(7);

    var slider = new SuperMap.Tool.Slider();
    slider.createSlider();
    equal(slider.slider.tagName, "DIV", "Slider_createSlider");
    equal(slider.slider.className, "smToolSlider", "Slider_createSlider");
    equal(slider._completeBar.tagName, "DIV", "Slider_createSlider");
    equal(slider._completeBar.className, "smToolCompleteBar", "Slider_createSlider");
    equal(slider._sliderBar.tagName, "DIV", "Slider_createSlider");
    equal(slider._sliderBar.className, "smToolSliderBar", "Slider_createSlider");
    equal(typeof slider.mousedown, "function", "Slider_createSlider");
});

test("SliderTest_setSliderSize", function() {
    expect(2);

    var slider = new SuperMap.Tool.Slider();
    slider.setSliderSize(50);
    equal(slider.sliderSize, 50, "Slider_setSliderSize");
    equal(slider.slider.style.width, "50px", "Slider_setSliderSize");
});

test("SliderTest_setCompleteBarSize", function() {
    expect(1);

    var slider = new SuperMap.Tool.Slider();
    slider.setCompleteBarSize();
    equal(slider._completeBar.style.width, "0px", "Slider_setCompleteBarSize");
});

test("SliderTest_setSliderBarSize", function() {
    expect(2);

    var slider = new SuperMap.Tool.Slider();
    slider.setSliderBarSize(50);
    equal(slider.barSize, 50, "Slider_setSliderSize");
    equal(slider._sliderBar.style.width, "50px", "Slider_setSliderSize");
});

test("SliderTest_appendTo", function() {
    expect(2);

    var slider = new SuperMap.Tool.Slider();
    var element = document.createElement("div");
    slider.appendTo(element);
    equal(slider.container.toString(), element.toString(), "Slider_appendTo");
    equal(element.childNodes[0].toString(), slider.slider.toString(), "Slider_appendTo");
});

test("SliderTest_handleMouseDown", function() {
    expect(1);

    var slider = new SuperMap.Tool.Slider();
    var event = "";
    var reg = /down/;
    slider.enable = true;
    slider.handleMouseDown(event);
    equal(reg.test(slider._sliderBar.className), true, "Slider_handleMouseDown");
});

test("SliderTest_handleDrag", function() {
    expect(2);

    var slider = new SuperMap.Tool.Slider();
    var evt = {
        "clientX": 20,
        "preventDefault": function() {},
        "stopPropagation": function() {}
    };
    slider.handleDrag(evt);
    equal(slider._sliderBar.style.left, "13.4px", "Slider_handleDrag");
    equal(slider._completeBar.style.width, "13.4px", "Slider_handleDrag");
});

test("SliderTest_handleDrop", function() {
    expect(1);

    var slider = new SuperMap.Tool.Slider();
    var evt = "";
    var reg= /down/;
    slider.handleDrop(evt);
    equal(reg.test(slider._sliderBar.className), false, "Slider_handleDrop");
});

test("SliderTest_caculatePosition", function() {
    expect(1);

    var slider = new SuperMap.Tool.Slider();
    var pos = slider.caculatePosition(20);
    equal(pos, 20.1,"Slider_caculatePosition");
});

test("SliderTest_getElementPosiontion", function() {
    expect(4);

    var slider = new SuperMap.Tool.Slider();
    var element = {
        "offsetLeft": 50,
        "offsetTop": 40,
        "offsetParent": null
    };
    var pos = slider.getElementPosiontion(element);
    equal(pos.left, 50, "Slider_getElementPosiontion");
    equal(pos.top, 40, "Slider_getElementPosiontion");

    var element1 = null;
    var pos1 = slider.getElementPosiontion(element1);
    equal(pos1.left, 0, "Slider_getElementPosiontion");
    equal(pos1.top, 0, "Slider_getElementPosiontion");
});