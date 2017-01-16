module("AnimatorVector");

function featureToArray(features) {
    var array = [];
    for(var feature in features) {
        if(features.hasOwnProperty(feature)){
            array.push(features[feature]);
        }
    }
    return array;
}

test("AnimatorVector_constructorDefault",function()
{
     expect(6);
	 var name = "animatorvector name";
     var layer = new SuperMap.Layer.AnimatorVector(name,{isBaseLayer:true},{
	              speed:0.02,
	              startTime:1,
                  endTime:22
	 });
	 ok(layer instanceof SuperMap.Layer.AnimatorVector,"layer  instanceof  SuperMap.Layer.AnimatorVector");
	 ok(layer.animator.speed,"0.02");
	 ok(layer.animator.startTime,"1");
	 ok(layer.animator.endTime,"22");
	 equals(layer.CLASS_NAME,"SuperMap.Layer.AnimatorVector","CLASS_NAME");
	 equals(layer.name,name,"AnimatorVector");
	         layer.destroy();
});

test("test_Layer_AnimatorVector_addFeatures",function()
{ 
    expect(10);
     var layer = new SuperMap.Layer.AnimatorVector("animatorVector",{isBaseLayer:true});

	 var pointFeatures = [];
	 var points =[ [1,0,11586022.821001,3591070.6119623], 
			  [2,2,11449489.047049,3507894.864612],
			  [2,1,11518540.610887,3564391.5986613],
			  [3,1,11518540.610887,3564391.5986613],
			  [1,3,11377298.775764,3501617.4497177]];
			  for(i = 0;i< points.length;i++)
			  {
		         var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
	             if(points[i][0]==1)
                    {var pointFeature = new SuperMap.Feature.Vector(point,{
			                FEATUREID:points[i][0],
                            TIME:points[i][1] });
			         }
					 else
					 {
					    var pointFeature = new SuperMap.Feature.Vector(point,{
                            FEATUREID:points[i][0],
                            TIME:points[i][1]});
					 }
			   pointFeatures.push(pointFeature);
			   
			  }
    layer.addFeatures(pointFeatures);    
	equals(layer.features[0].attributes.TIME,0, "测试feature根据时间排序是否成功。");
	equals(layer.features[0].attributes.FEATUREID,1, "测试feature根据时间排序的FEATUREID是否正确。");
	equals(layer.features[1].attributes.TIME,1, "测试feature根据时间排序是否成功。");
	equals(layer.features[1].attributes.FEATUREID,2, "测试feature根据时间排序的FEATUREID是否正确。");
	equals(layer.features[2].attributes.TIME,1, "测试feature根据时间排序是否成功。");
	equals(layer.features[2].attributes.FEATUREID,3, "测试feature根据时间排序的FEATUREID是否正确。");
	equals(layer.features[3].attributes.TIME,2, "测试feature根据时间排序是否成功。");
	equals(layer.features[3].attributes.FEATUREID,2, "测试feature根据时间排序的FEATUREID是否正确。");
	equals(layer.features[4].attributes.TIME,3, "测试feature根据时间排序是否成功。");
	equals(layer.features[4].attributes.FEATUREID,1, "测试feature根据时间排序的FEATUREID是否正确。");
	layer.destroy();
	
});

test("test_Layer_AnimatorVector_isTheSameType",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorVector",{isBaseLayer:true});
	var className0 = "SuperMap.Geometry.LinearRing";
	var className1 = "SuperMap.Geometry.MultiLineString";
	var issametype = layer.isTheSameType(className0,className1);
	equals(issametype,true,"function:isTheSameType,类型相同的图形进行测试");
	layer.destroy();

});
test("test_Layer_AnimatorVector_isTheSameType1",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorVector",{isBaseLayer:true});
	var className0 = "SuperMap.Geometry.LinearRing";
	var className1 = "SuperMap.Geometry.Point";
	var issametype = layer.isTheSameType(className0,className1);
	equals(issametype,false,"function:isTheSameType，类型不同的图形进行测试");
	layer.destroy();
});
test("test_Layer_AnimatorVector_isTheSameType2",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorVector",{isBaseLayer:true});
	var className0 = "SuperMap.Geometry.LinearRing";
	var className1 = "";
	var issametype = layer.isTheSameType(className0,className1);
	equals(issametype,false,"function:isTheSameType，一个没有图形，一个有类型进行测试");
	layer.destroy();
});
test("test_Layer_AnimatorVector_destroy",function()
{
    expect(4);
     var layer = new SuperMap.Layer.AnimatorVector(name,{isBaseLayer:true},{
	              speed:0.02,
	              startTime:1,
                  endTime:22
	 });
	layer.destroy();
	equals(layer.map, null,"layer.map is null after destroy");
	ok(layer.animator ==null,"animator");
	ok(layer.featureIdName == null,"featureIdName");
	ok(layer.timeName == null,"time");
});
test("test_Layer_AnimatorVector_getFeatureBy",function()
{
	expect(2);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var pointFeatures = [];
	var points =[ [1,0,11586022.821001,3591070.6119623],
		[2,1,11449489.047049,3507894.864612],
		[1,1,11518540.610887,3564391.5986613],
		[1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	{
		var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
		var pointFeature = new SuperMap.Feature.Vector(point);
		pointFeature.fid = i;
		pointFeatures.push(pointFeature);
	}
	var featuredefault = layer.getFeatureBy("fid",1);
	var isok1 = false;
	if(featuredefault == null){
		isok1 = true
	}
	ok(isok1,"function:getFeatureBy,测试在没有添加feature时候使用这个方法");
	layer.addFeatures(pointFeatures);
	var feature = layer.getFeatureBy("fid",1);
	equals(feature.fid,1,"function:getFeatureBy,测试查找fid属性的要素");

	layer.destroy();
});
test("test_Layer_AnimatorVector_getFeaturesByAttribute",function()
{
     expect(2);
	 var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	 var pointFeatures = [];
	 var points =[ [1,0,11586022.821001,3591070.6119623], 
			  [2,1,11449489.047049,3507894.864612],
			  [1,1,11518540.610887,3564391.5986613],
			  [1,3,11377298.775764,3501617.4497177]];
			  for(i = 0;i< points.length;i++)
			  {
		         var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
                    var pointFeature = new SuperMap.Feature.Vector(point,{
			                FEATUREID:points[i][0],
                            TIME:points[i][1] });    
			   pointFeatures.push(pointFeature);
			   
			  }
    equals(layer.getFeaturesByAttribute("FEATUREID",1).length,0,"测试在没有添加feature时候使用这个方法");
    layer.addFeatures(pointFeatures);   
    equals(layer.getFeaturesByAttribute("TIME",1).length,2,"测试查找属性名为：TIME，属性值为数字1的feature数目");
	layer.destroy();
});

test("test_Layer_AnimatorVector_getFeatureById",function()
{
   expect(1);
	 var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	 var pointFeatures = [];
	 var points =[ [1,0,11586022.821001,3591070.6119623], 
			  [2,1,11449489.047049,3507894.864612],
			  [1,1,11518540.610887,3564391.5986613],
			  [1,3,11377298.775764,3501617.4497177]];
			  for(i = 0;i< points.length;i++)
			  {
		         var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
                    var pointFeature = new SuperMap.Feature.Vector(point,{
			                FEATUREID:points[i][0],
                            TIME:points[i][1] });    
			   pointFeatures.push(pointFeature);
			  }
			  layer.addFeatures(pointFeatures); 
	          var sid = layer.getFeatureById(layer.features[0].id);
				equals(sid.id,layer.features[0].id,"测试这个方法查找的id是否正确");
			   layer.destroy();
});
test("test_Layer_AnimatorVector_removeFeatures",function()
{
   expect(2);
   var features;
   var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var pointFeatures = [];
   var points =[ [1,0,11586022.821001,3591070.6119623], 
			     [2,1,11449489.047049,3507894.864612],
			     [1,1,11518540.610887,3564391.5986613],
			     [1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	   {
		    var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
            var pointFeature = new SuperMap.Feature.Vector(point,{
			                FEATUREID:points[i][0],
                            TIME:points[i][1] });    
			  pointFeatures.push(pointFeature);
			   
	   }
    layer.addFeatures(pointFeatures); 
	var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
	var pointFeature1 = new SuperMap.Feature.Vector(point1);
	  layer.addFeatures(pointFeature1);
	  
	  features = layer.removeFeatures([pointFeature1]);
      equals(layer.features[pointFeature1.id], undefined, "从feature对象中删除一个feature。");
	
	features = layer.removeFeatures(layer.features);
    equals(featureToArray(layer.features).length, 0,"测试传入数据为layer.features时候删除全部feature");
	layer.destroy();
});
test("test_Layer_AnimatorVector_removeAllFeatures",function()
{	expect(1);
	var pointFeatures = [];
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var points =[ [1,0,11586022.821001,3591070.6119623],
		[2,1,11449489.047049,3507894.864612],
		[1,1,11518540.610887,3564391.5986613],
		[1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	{
		var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
		var pointFeature = new SuperMap.Feature.Vector(point,{
			FEATUREID:points[i][0],
			TIME:points[i][1] });
		pointFeatures.push(pointFeature);

	}
	layer.addFeatures(pointFeatures);
	layer.removeAllFeatures();
	var isok = false;
	if(layer.features = []){
		isok = true;
	}
	equal(isok,true,"function:removeAllFeatures");
	layer.destroy();
});
test("test_Layer_AnimatorVector_getDataExtent",function()
{
   expect(1);
   var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var pointFeatures = [];
   var points =[ [1,0,11586022.821001,3591070.6119623], 
			     [2,1,11449489.047049,3507894.864612],
			     [1,1,11518540.610887,3564391.5986613],
			     [1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	   {
		    var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
            var pointFeature = new SuperMap.Feature.Vector(point,{
			                FEATUREID:points[i][0],
                            TIME:points[i][1] });    
			  pointFeatures.push(pointFeature);
			   
	   }
    layer.addFeatures(pointFeatures);
    var extent = layer.getDataExtent();	
    equals(extent.toBBOX(), "11377298.775764,3501617.449718,11586022.821001,3591070.611962", "测试获取layer范围是否成功");
	layer.destroy();
});
test("test_Layer_AnimatorVector_setOpacity",function()
{
    expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	 var pointFeatures = [];
   var points =[ [1,0,11586022.821001,3591070.6119623], 
			     [2,1,11449489.047049,3507894.864612],
			     [1,1,11518540.610887,3564391.5986613],
			     [1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	   {
		    var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
            var pointFeature = new SuperMap.Feature.Vector(point,{
			                FEATUREID:points[i][0],
                            TIME:points[i][1]});    
			  pointFeatures.push(pointFeature);
	   }
    layer.addFeatures(pointFeatures);
	layer.setOpacity(0.6);
	equals(layer.renderer.root.style.opacity,"0.6","测试layer图层的不透明度是否成功");
	layer.destroy();
});
test("test_Layer_AnimatorVector_display",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var isdisplay = false;
	layer.display(isdisplay);
	equals(layer.renderer.root.style.display,'none',"function:display,测试layer图层的临时隐藏是否成功");
	layer.destroy();
});
test("test_Layer_AnimatorVector_displaydefault",function()
{
    expect(1);
    var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
    var isdisplay = true;
    layer.display(isdisplay);
    var result = layer.renderer.root.style.display;
    var isok = false;
    if(result != null){
        isok = true;
    }
    ok(isok,"function:display,测试图层显示是否成功");
    layer.destroy();
});
test("test_Layer_AnimatorVector_onMapResize",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var map = new SuperMap.Map({
		div:"map",
		layers:[layer],
		center:new SuperMap.LonLat(0,0),
		zoom:0
	});
	var size1 = layer.map.getSize();
	layer.onMapResize();
	var size2 = layer.map.getSize();
	var isok = true;
	if(size1 == size2){
		isok = false;
	}
	ok(isok,"测试是否通知渲染器的尺寸变化");
	layer.destroy();
	map.destroy();
});
test("test_Layer_AnimatorVector_redraw",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var map = new SuperMap.Map({
		div:"map",
		layers:[layer],
		center:new SuperMap.LonLat(0,0),
		zoom:0
	});
	var isok = false;
	isok = layer.redraw();
	ok(isok,"function:redraw");
});
test("test_Layer_AnimatorVector_drawFeature",function()
{
    expect(1);
    var style = {
        strokeColor:"#339933"
    }
    var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
    layer.style = style;
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var geometry = new SuperMap.Geometry.Point(-115,10);
    var style1 = {
        strokeColor:"#ffffff"
    }
    var pointFeature = new SuperMap.Feature.Vector(geometry,null,style1);
    layer.drawFeature(pointFeature);
    equals(pointFeature.style,style1,"function:drawFeature,测试与矢量要素的样式一致");
    layer.destroy();
});
test("test_Layer_AnimatorVector_getFeatureByFid",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var map = new SuperMap.Map({
		div: "map",
		layers: [layer],
		center: new SuperMap.LonLat(0, 0),
		zoom: 0
	});
	var pointFeatures = [];
	var points =[ [1,0,11586022.821001,3591070.6119623],
		[2,1,11449489.047049,3507894.864612],
		[1,1,11518540.610887,3564391.5986613],
		[1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	{
		var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
		var pointFeature = new SuperMap.Feature.Vector(point,{
			FEATUREID:points[i][0],
			TIME:points[i][1] });
		pointFeatures.push(pointFeature);
	}
	layer.addFeatures(pointFeatures);
	var sid = layer.getFeatureByFid(layer.features[0].fid);
	equals(sid.fid,layer.features[0].fid,"测试这个方法查找的fid是否正确");
	layer.destroy();
	map.destroy();
});
test("test_Layer_AnimatorVector_getDataExtentdefault",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var map = new SuperMap.Map({
		div: "map",
		layers: [layer],
		center: new SuperMap.LonLat(0, 0),
		zoom: 0
	});
	var maxextent = layer.getDataExtent();
	var isok = false;
	if(maxextent == null){
		isok = true;
	}
	ok(isok,"function:getDataExtent");
});
test("test_Layer_AnimatorVector_getDataExtent",function()
{
	expect(1);
	var layer = new SuperMap.Layer.AnimatorVector("animatorvector",{isBaseLayer:true});
	var map = new SuperMap.Map({
		div: "map",
		layers: [layer],
		center: new SuperMap.LonLat(0, 0),
		zoom: 0
	});
	var pointFeatures = [];
	var points =[ [1,0,11586022.821001,3591070.6119623],
		[2,1,11449489.047049,3507894.864612],
		[1,1,11518540.610887,3564391.5986613],
		[1,3,11377298.775764,3501617.4497177]];
	for(i = 0;i< points.length;i++)
	{
		var point = new SuperMap.Geometry.Point(points[i][2],points[i][3]);
		var pointFeature = new SuperMap.Feature.Vector(point,{
			FEATUREID:points[i][0],
			TIME:points[i][1] });
		pointFeatures.push(pointFeature);
	}
	layer.addFeatures(pointFeatures);
	var maxextent = layer.getDataExtent();
	var isok = false;
	if(maxextent != null){
		isok = true;
	}
	ok(isok,"function:getDataExtent");
});



