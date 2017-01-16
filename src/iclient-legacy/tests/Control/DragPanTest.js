/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-3-31
 * Time: 上午10:27
 * To change this template use File | Settings | File Templates.
 */
 module('DragPan');
test("testDragPan_DefaultProperty",function(){
         expect(5);
    var map= new SuperMap.Map("map");
    var dragPan= new SuperMap.Control.DragPan();
    map.addControl(dragPan);
    ok(!dragPan.documentDrag,"Property:documentDrag");
    ok(!dragPan.panned,"Property:panned");
    ok(!dragPan.enableKinetic,"Property:enableKinetic");
    equals(dragPan.interval,1,"Property:interval");
    equals(dragPan.kineticInterval,10,"Property:kineticInterval");
    map.destroy();
});
test("testDragPan_setProperty",function(){
      expect(5);
    var dragPan= new SuperMap.Control.DragPan();
    var map = new SuperMap.Map("map",{controls:[dragPan]});
     dragPan.documentDrag=true;
    dragPan.panned=true;
    dragPan.enableKinetic=true;
    dragPan.interval=10;
    dragPan.kineticInterval=50;
    ok(dragPan.documentDrag,"Property:documentDrag");
    ok(dragPan.panned,"Property:panned");
    ok(dragPan.enableKinetic,"Property:enableKinetic");
    equals(dragPan.interval,10,"Property:interval");
    equals(dragPan.kineticInterval,50,"Property:kineticInterval");
    map.destroy();
});
