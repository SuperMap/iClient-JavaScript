module("KML");

test("TestKML_constructorDefault",function(){
    expect(15);
    var params = new SuperMap.Format.KML();
    var namespace = {
            kml: "http://www.opengis.net/kml/2.2",
            gx: "http://www.google.com/kml/ext/2.2"
        };
    ok(params!==null,"function:constructorDefault");
    deepEqual(params.namespaces,namespace,"params.namespaces");
    equal(params.placemarksDesc,"No description available","params.placemarksDesc");
    equal(params.foldersName,"SuperMap export","params.folderName");
    equal(params.extractAttributes, true, "params.extractAttributes");
    equal(params.kvpAttributes, false, "params.kvpAttributes");
    equal(params.extractStyles, false, "params.extractStyles");
    equal(params.extractTracks, false, "params.extractTracks");
    equal(params.trackAttributes, null, "params.trackAttributes");
    equal(params.internalns, null, "params.internalns");
    equal(params.features, null, "params.features");
    equal(params.styles, null, "params.styles");
    equal(params.styleBaseUrl, "", "params.styleBaseUrl");
    equal(params.fetched, null, "params.fetched");
    equal(params.maxDepth, 0, "maxDepth");
});

test("TestKML_Read", function () {
    //对iServer返回的一个点进行测试
    expect(2);
    var testData='<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name>四川.kml</name><Style id="s_ylw-pushpin"><IconStyle><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle></Style><StyleMap id="m_ylw-pushpin"><Pair><key>normal</key><styleUrl>#s_ylw-pushpin</styleUrl></Pair><Pair><key>highlight</key><styleUrl>#s_ylw-pushpin_hl</styleUrl></Pair></StyleMap><Style id="s_ylw-pushpin_hl"><IconStyle><scale>1.3</scale><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle></Style><Placemark><name>四川</name><LookAt><longitude>100.1242640928596</longitude><latitude>30.91208961765191</latitude><altitude>0</altitude><heading>-2.181228188962515</heading><tilt>0</tilt><range>5695499.134062896</range><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt><styleUrl>#m_ylw-pushpin</styleUrl><Point><gx:drawOrder>1</gx:drawOrder><coordinates>102.8695197841935,30.25565184045622,0</coordinates></Point></Placemark></Document></kml>';
    var format = new SuperMap.Format.KML();
    var features = format.read(testData);
    equal(features[0].geometry.x,102.8695197841935,"x坐标值");
    equal(features[0].geometry.y,30.25565184045622,"y坐标值");
    for(var i in features){
        features[i].destroy();
    }
    features=null;
    format.destroy();
});


test("TestKML_Write", function () {
    expect(2);
    //对iServer返回的一个点进行测试
    var testData='<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name>四川.kml</name><Style id="s_ylw-pushpin"><IconStyle><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle></Style><StyleMap id="m_ylw-pushpin"><Pair><key>normal</key><styleUrl>#s_ylw-pushpin</styleUrl></Pair><Pair><key>highlight</key><styleUrl>#s_ylw-pushpin_hl</styleUrl></Pair></StyleMap><Style id="s_ylw-pushpin_hl"><IconStyle><scale>1.3</scale><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle></Style><Placemark><name>四川</name><LookAt><longitude>100.1242640928596</longitude><latitude>30.91208961765191</latitude><altitude>0</altitude><heading>-2.181228188962515</heading><tilt>0</tilt><range>5695499.134062896</range><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt><styleUrl>#m_ylw-pushpin</styleUrl><Point><gx:drawOrder>1</gx:drawOrder><coordinates>102.8695197841935,30.25565184045622,0</coordinates></Point></Placemark></Document></kml>';
    var format = new SuperMap.Format.KML();
    var features = format.read(testData);
    var testData1=format.write(features);
    var features1 = format.read(testData1);
    equal(features[0].geometry.x,features1[0].geometry.x,"x坐标值");
    equal(features[0].geometry.y,features1[0].geometry.y,"y坐标值");
    for(var i in features){
        features[i].destroy();
    }
    features=null;
    for(var i in features1){
        features1[i].destroy();
    }
    features1=null;
    format.destroy();
});