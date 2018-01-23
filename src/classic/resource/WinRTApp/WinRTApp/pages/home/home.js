(function () {
    "use strict";

    var map, layer, positionLayer, lenCtrl, areaCtrl, vectorLayer,
        style = {
            strokeColor: "#304DBE",
            strokeWidth: 1,
            pointerEvents: "visiblePainted",
            fillColor: "#304DBE",
            fillOpacity: 0.5
        };

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            // 初始化地图
            map = new SuperMap.Map("map", {
                controls: [
                new SuperMap.Control.ScaleLine(),
                new SuperMap.Control.ZoomBox({ out: true }),
                new SuperMap.Control.MousePosition(),
                new SuperMap.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                })], units: "m"
            });
            positionLayer = new SuperMap.Layer.Markers();
            vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
            layer = new SuperMap.Layer.CloudLayer();
            map.addLayers([layer, positionLayer, vectorLayer]);
            map.setCenter(new SuperMap.LonLat(12967569.18530, 4846508.10110), 11);

            //测量控件加入map对象中
            lenCtrl = new SuperMap.Control.Measure(SuperMap.Handler.Path, { persist: true });
            areaCtrl = new SuperMap.Control.Measure(SuperMap.Handler.Polygon, { persist: false });
            lenCtrl.events.on({
                "measure": handleMeasure
            });
            areaCtrl.events.on({
                "measure": handleMeasure
            });
            map.addControls([lenCtrl, areaCtrl]);

            //功能键单击事件
            element.querySelector("#map").addEventListener("click", function (event) {
                element.querySelector("#dropMenu").className = "hideDropMenu";
            }, false);

            //element.querySelector("#dropMenu").addEventListener("blur", function (event) {
            //    element.querySelector("#dropMenuItem").className = "hideDropMenu";
            //}, false);
            var img_len = element.querySelector("#measureLength");
            img_len.addEventListener("click", function (event) {
                element.querySelector("#dropMenu").className = "hideDropMenu";
                vectorLayer.removeAllFeatures();
                lenCtrl.activate();
            }, false);
            img_len.addEventListener("mousemove", function (event) {
                img_len.src = "/images/images/measure_len_over.png";
            }, false);
            img_len.addEventListener("mouseout", function (event) {
                img_len.src = "/images/images/measure_len.png";
            }, false);
            var img_area = element.querySelector("#measureArea");
            img_area.addEventListener("click", function (event) {
                element.querySelector("#dropMenu").className = "hideDropMenu";
                vectorLayer.removeAllFeatures();
                areaCtrl.activate();
            }, false);
            img_area.addEventListener("mousemove", function (event) {
                img_area.src = "/images/images/measure_area_over.png";
            }, false);
            img_area.addEventListener("mouseout", function (event) {
                img_area.src = "/images/images/measure_area.png";
            }, false);

            var img_measure = element.querySelector("#measure");
            img_measure.addEventListener("click", function (event) {
                element.querySelector("#dropMenu").className = "showDropMenu";
                element.querySelector("#dropMenu").focus();
            }, false);
            img_measure.addEventListener("mousemove", function (event) {
                img_measure.src = "/images/images/measure_over.png";
                element.querySelector("#dropMenu").className = "showDropMenu";
                element.querySelector("#dropMenu").focus();
            }, false);
            img_measure.addEventListener("mouseout", function (event) {
                img_measure.src = "/images/images/measure.png";
            }, false);

            var img_clear = element.querySelector("#clear");
            img_clear.addEventListener("click", function (event) {
                lenCtrl.deactivate();
                areaCtrl.deactivate();
                positionLayer.clearMarkers();
                vectorLayer.removeAllFeatures();
                element.querySelector("#dropMenu").className = "hideDropMenu";
                element.querySelector("#statusMessage").className = "hideMessage";
            }, false);
            img_clear.addEventListener("mousemove", function (event) {
                img_clear.src = "/images/images/clear_over.png";
                element.querySelector("#dropMenu").className = "hideDropMenu";
            }, false);
            img_clear.addEventListener("mouseout", function (event) {
                img_clear.src = "/images/images/clear.png";
            }, false);

            //zoomin
            var img_in = element.querySelector("#zoomin");
            img_in.addEventListener("click", function (event) {
                map.zoomIn();
            }, false);
            img_in.addEventListener("mousemove", function (event) {
                img_in.src = "/images/images/zoomin_over.png";
            }, false);
            img_in.addEventListener("mouseout", function (event) {
                img_in.src = "/images/images/zoomin.png";
            }, false);

            //zoomout
            var img_out = element.querySelector("#zoomout");
            img_out.addEventListener("click", function (event) {
                map.zoomOut();
            }, false);
            img_out.addEventListener("mousemove", function (event) {
                img_out.src = "/images/images/zoomout_over.png";
            }, false);
            img_out.addEventListener("mouseout", function (event) {
                img_out.src = "/images/images/zoomout.png";
            }, false);

            //location
            var img_position = element.querySelector("#myPosition");
            img_position.addEventListener("click", function (event) {
                //实现定位功能
                var geolocator = Windows.Devices.Geolocation.Geolocator();
                geolocator.getGeopositionAsync().done(function (position) {
                    var lon = position.coordinate.longitude,
                    x = lon * 20037508.342789 / 180,
                    lat = position.coordinate.latitude,
                    tempy = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180),
                    y = tempy * 20037508.34789 / 180,
                    lonLat = new SuperMap.LonLat(x, y),
                    size = new SuperMap.Size(44, 33),
                    offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                    icon = new SuperMap.Icon("/theme/images/marker.png", size, offset);
                    positionLayer.clearMarkers();
                    positionLayer.addMarker(new SuperMap.Marker(lonLat, icon));
                    map.setCenter(lonLat);
                });
            }, false);
            img_position.addEventListener("mousemove", function (event) {
                img_position.src = "/images/images/position_over.png";
            }, false);
            img_position.addEventListener("mouseout", function (event) {
                img_position.src = "/images/images/position.png";
            }, false);
        }
    });

    //量测结果函数
    function handleMeasure(event) {
        lenCtrl.deactivate();
        areaCtrl.deactivate();

        var statusMessage = document.getElementById("statusMessage");
        statusMessage.className = "showMessage";
        if (event.order === 1) {
            statusMessage.innerText = "测量结果：" + event.measure + " 公里";
        } else if (event.order === 2) {
            statusMessage.innerText = "测量结果：" + event.measure + " 平方公里";
        }

        var feature = new SuperMap.Feature.Vector();
        feature.geometry = event.geometry,
        feature.style = style;
        vectorLayer.addFeatures(feature);
    }
})();