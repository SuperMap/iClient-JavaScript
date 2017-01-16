module("GML");

test("Read", function () {
	//对iServer返回的一个点进行测试
    var testData='<?xml version="1.0" encoding="UTF-8"?><wfs:FeatureCollection xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:World="http://www.supermap.com/World" xsi:schemaLocation="http://www.opengis.net/wfs http://localhost:8090/iserver/services/data-world/wfs100?request=getschema&amp;file=wfs,1.0.0,WFS-basic.xsd http://www.supermap.com/World http://localhost:8090/iserver/services/data-world/wfs100?SERVICE=WFS&amp;REQUEST=DESCRIBEFEATURETYPE&amp;VERSION=1.0.0&amp;TYPENAME=World:Capitals" xmlns="http://www.opengis.net/gml"><gml:boundedBy><gml:null>unknown</gml:null></gml:boundedBy><gml:featureMember><World:Capitals fid="World.Capitals.1"><World:the_geom><gml:Point srsName="EPSG:4326"><gml:coordinates>25.27596664428711,54.688568115234375</gml:coordinates></gml:Point></World:the_geom><World:SMY>54.688568115234375</World:SMY><World:SMX>25.27596664428711</World:SMX><World:SMUSERID>14</World:SMUSERID><World:SMLIBTILEID>1</World:SMLIBTILEID><World:SMID>1</World:SMID><World:SMGEOMETRYSIZE>16</World:SMGEOMETRYSIZE><World:COUNTRY>立陶宛</World:COUNTRY><World:CAP_POP>582000.0</World:CAP_POP><World:CAPITAL>维尔纽斯</World:CAPITAL></World:Capitals></gml:featureMember></wfs:FeatureCollection>';
	var format = new SuperMap.Format.GML();
    var features = format.read(testData);
	equal(features[0].geometry.x,25.27596664428711,"x坐标值");
	equal(features[0].geometry.y,54.688568115234375,"y坐标值");
});