/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-3-17
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
module('Geolocate');
test("testGeolocate_constructordefault",function(){
        var map = new SuperMap.Map("map");
        var layer = new SuperMap.Layer.CloudLayer();
        var geolocate= new SuperMap.Control.Geolocate();
        map.addLayer(layer);
        map.addControl(geolocate);
        equals(geolocate.bind,true,"Property:bind");
        equals(geolocate.watch,false,"Property:watch");
        same(geolocate.geolocationOptions,{},"Property:geolocationOptions");
        map.destroy();
});
test("testGeolocate_constructor",function(){
    expect(2);
    var map= new SuperMap.Map("map");
    var layer = new SuperMap.Layer.CloudLayer();
    var geolocate = new SuperMap.Control.Geolocate({
        bind:false,
        geolocationOptions:{
            maximumAge:0
        }
    });
    map.addLayer(layer);
    map.addControl(geolocate);
    equals(geolocate.bind,false,"Property:bind");
    equals(geolocate.geolocationOptions.maximumAge,0,"Property:geolocationOptions")
    map.destroy();
});
//test("testGeolocate_destroy",function(){
//    try{
//        function geolocateCompleted(){
//
//            geolocate.destroy();
//
//            map.destroy();
//            console.log("cc1");
//        };
//        function geolocateFailed(){
//
//            geolocate.destroy();
//
//            map.destroy();
//            console.log("cc2");
//        }
//        var map = new SuperMap.Map('map');
//        var geolocate = new SuperMap.Control.Geolocate({
//            bind: false,
//            watch:true,
//            geolocationOptions: {
//                enableHighAccuracy: false,
//                maximumAge:0
//            },
//            eventListeners: {
//                "locationupdated": geolocateCompleted,
//                "locationfailed": geolocateFailed
//            }
//        });
//        console.log("cc3");
//        map.addControl(geolocate);
//
//        geolocate.activate();
//
//    } catch(e){
//          console.log(e);
//    }
//
//});
//asyncTest("testGeolocate_activate",function(){
//    try{
//        expect(1);
//        var map = new SuperMap.Map("map",{projection:3857});
//        var layer = new SuperMap.Layer.CloudLayer();
//        var geolocate= new SuperMap.Control.Geolocate({
//            bind:false,
//            watch:true,
//            geolocationOptions:{
//                maximumAge:0
//            },
//            eventListeners: {
//                "locationupdated": geolocateCompleted,
//                "locationfailed": geolocateFailed
//            }
//        });
//        map.addLayer(layer);
//        map.addControl(geolocate);
//        map.setCenter(new SuperMap.LonLat(11339634.286396, 4588716.5813769),4);
//
//           var geo=geolocate.activate();
//        ok(geo,"Function:activate");
//        function geolocateCompleted(){
//            start();
//            geolocate.deactivate();
//            map.destroy();
//        }
//        function geolocateFailed(){
//            start();
//            geolocate.deactivate();
//            map.destroy();
//        }
//    }catch(e){
//
//    }
//
//});
//
//test("testGeolocate_activateGeolocation",function(){
//    try{
//       // expect(1);
//        var map = new SuperMap.Map("map",{projection: "EPSG:3857"});
//        var geolocate= new SuperMap.Control.Geolocate({
//            bind:false,
//            geolocationOptions:{
//                maximumAge:0
//            },
//            geolocation:null ,
//            eventListeners: {
//                "locationupdated": geolocateCompleted,
//                "locationfailed": geolocateFailed
//            }
//
//        });
//        map.addControl(geolocate);
//        geolocate.activate();
//        function geolocateCompleted(event){
//        };
//        function geolocateFailed(event){
//            alert("您当前使用的浏览器不支持地图定位服务");
//        }
//       // ok(!geo,"Function:activate");
//        geolocate.deactivate();
//        map.destroy();
//
//    }catch(e){}
//
//});
//test("testGeolocate_activateDefault",function(){
//       try{
//           expect(1);
//           var map = new SuperMap.Map("map",{projection: "EPSG:3857"});
//
//           var geolocate= new SuperMap.Control.Geolocate({
//               bind:false,
//               active:true,
//               geolocationOptions:{
//                   maximumAge:0
//               }
//           });
//           map.addControl(geolocate);
//           var geo=geolocate.activate();
//           ok(!geo,"Function:activate");
//           geolocate.deactivate();
//           map.destroy();
//       }catch(e){
//
//       }
//});
//asyncTest("testGeolocate_deactivateDeafault",function(){
//    try{
//        expect(1);
//        var map = new SuperMap.Map("map",{projection:"EPSG:3857"});
//        var geolocate= new SuperMap.Control.Geolocate({
//            bind:false,
//            geolocationOptions:{
//                maximumAge:0
//            },
//            eventListeners: {
//                "locationupdated": geolocateCompleted,
//                "locationfailed": geolocateFailed
//            }
//        });
//        map.addControl(geolocate);
//        geolocate.activate();
//        function geolocateCompleted(){
//            start();
//            var deGeo= geolocate.deactivate();
//            ok(deGeo,"Function:deactivate");
//            map.destroy();
//        }
//        function geolocateFailed(){
//            start();
//            var deGeo= geolocate.deactivate();
//            ok(deGeo,"Function:deactivate");
//            map.destroy();
//        }
//    }catch(e){
//
//    }
//
//});



