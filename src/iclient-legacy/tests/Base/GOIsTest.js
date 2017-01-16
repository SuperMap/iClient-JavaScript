module("GOIs");
var name = "GOIs Name";

asyncTest("GOIs_Constructor", function () {
    expect(7);
    var myGOIs = new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        //"highlightIcon":new SuperMap.Icon('../Images/rectMarker.png',  new SuperMap.Size(8,8), new SuperMap.Pixel(-4, -4)),
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":252560,
            "markerSize":5
        })
        //isHighlight:true
    });
    //var map = new SuperMap.Map('map');
    ok(myGOIs instanceof SuperMap.GOIs, "instance");
    equal(myGOIs.url, GlobeParameter.ChinaURL, "url");
    //内部会把Options中属性部分进行连接，形成新的url，发送给服务器
    equal(myGOIs.datasetName, "China_Town_P@China400", "datasetName");
    ok(myGOIs.style instanceof SuperMap.REST.ServerStyle, "style");
    myGOIs.events.on({"initialized": function(){
        try{
            ok(myGOIs.tiledDynamicRESTLayer instanceof SuperMap.Layer.TiledDynamicRESTLayer, "tiledDynamicRESTLayer");
            ok(myGOIs.utfgridLayer instanceof SuperMap.Layer.UTFGrid, "utfgridLayer");
            ok(myGOIs.markerLayer instanceof SuperMap.Layer.Markers, "markerLayer");
            myGOIs.destroy();
            //map.destroy();
            start();
        }
        catch(excepion){
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }});
   // map.setScheme(scheme);
});

asyncTest("GOIs_destroy",function(){
    expect(6);
    var myGOIs = new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        //"highlightIcon":new SuperMap.Icon('../Images/rectMarker.png',  new SuperMap.Size(8,8), new SuperMap.Pixel(-4, -4)),
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":252560,
            "markerSize":5
        })
        //isHighlight:true
    });
    //var map = new SuperMap.Map('map');
    //map.setScheme(scheme);
    myGOIs.events.on({"initialized": function(){
        try{
            myGOIs.destroy();
            equal(myGOIs.url, null, "url");
            equal(myGOIs.datasetName, null, "datasetName");
            //equal(scheme.highlightIcon, null, "highPerformancePois highlightIcon");
            equal(myGOIs.style, null, "style");

            equal(myGOIs.tiledDynamicRESTLayer,null, "tiledDynamicRESTLayer");
            equal(myGOIs.utfgridLayer,null, "utfgridLayer");
            equal(myGOIs.markerLayer,null, "markerLayer");

           // map.destroy();
            start();
        }
        catch(excepion){
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }});
});

asyncTest("GOIs_hide",function(){
    expect(3);
    var myGOIs = new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        //"highlightIcon":new SuperMap.Icon('../Images/rectMarker.png',  new SuperMap.Size(8,8), new SuperMap.Pixel(-4, -4)),
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":252560,
            "markerSize":5
        })
        //isHighlight:true
    });
    //var map = new SuperMap.Map('map');
    //map.setScheme(scheme);
    myGOIs.events.on({"initialized": function(){
        try{
            myGOIs.hide();
            equal(myGOIs.markerLayer.visibility,false, "markerLayer visibility");
            equal(myGOIs.utfgridLayer.visibility,false, "utfgridLayer visibility");
            equal(myGOIs.tiledDynamicRESTLayer.visibility,false, "tiledDynamicRESTLayer visibility");
            myGOIs.destroy();
            //map.destroy();
            start();
        }
        catch(excepion){
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }});
});

asyncTest("GOIs_show",function(){
    expect(3);
    var myGOIs = new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        //"highlightIcon":new SuperMap.Icon('../Images/rectMarker.png',  new SuperMap.Size(8,8), new SuperMap.Pixel(-4, -4)),
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":252560,
            "markerSize":5
        })
        //isHighlight:true
    });
    //var map = new SuperMap.Map('map');
    //map.setScheme(scheme);
    myGOIs.events.on({"initialized": function(){
        try{
            myGOIs.hide();
            myGOIs.show();
            equal(myGOIs.markerLayer.visibility,true, "markerLayer visibility");
            equal(myGOIs.utfgridLayer.visibility,true, "utfgridLayer visibility");
            equal(myGOIs.tiledDynamicRESTLayer.visibility,true, "tiledDynamicRESTLayer visibility");
            myGOIs.destroy();
            //map.destroy();
            start();
        }
        catch(excepion){
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }});
});

asyncTest("GOIs_getLayers",function(){
    expect(3);
    var myGOIs = new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        //"highlightIcon":new SuperMap.Icon('../Images/rectMarker.png',  new SuperMap.Size(8,8), new SuperMap.Pixel(-4, -4)),
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":252560,
            "markerSize":5
        })
        //isHighlight:true
    });
    //var map = new SuperMap.Map('map');
    //map.setScheme(scheme);
    myGOIs.events.on({"initialized": function(){
        try{
            var layerArray = myGOIs.getLayers();
            ok(layerArray[0] instanceof SuperMap.Layer.TiledDynamicRESTLayer, "tiledDynamicRESTLayer");
            ok(layerArray[1] instanceof SuperMap.Layer.UTFGrid, "utfgridLayer");
            ok(layerArray[2] instanceof SuperMap.Layer.Markers, "markerLayer");
            myGOIs.destroy();
            //map.destroy();
            start();
        }
        catch(excepion){
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }});
});

asyncTest("GOIs_setOpacity",function(){
    expect(2);
    var myGOIs = new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        //"highlightIcon":new SuperMap.Icon('../Images/rectMarker.png',  new SuperMap.Size(8,8), new SuperMap.Pixel(-4, -4)),
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":252560,
            "markerSize":5
        })
        //isHighlight:true
    });
    //var map = new SuperMap.Map('map');
    //map.setScheme(scheme);
    myGOIs.events.on({"initialized": function(){
        try{
            myGOIs.setOpacity(0.5);

            equal(myGOIs.markerLayer.opacity,0.5, "markerLayer opacity");
            equal(myGOIs.tiledDynamicRESTLayer.opacity,0.5, "tiledDynamicRESTLayer opacity");

            myGOIs.destroy();
            //map.destroy();
            start();
        }
        catch(excepion){
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }});
});