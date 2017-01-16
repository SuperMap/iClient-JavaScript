module('Style_Image_hitClover');

test('test_HitClover_constructor',function(){
    expect(3);
    var hitClover = new SuperMap.Style.HitClover();
    equal(hitClover.angle,30,'hitClover.angle');
    equal(hitClover.spaceAngle,0,'hitClover.spaceAngle');
    equal(hitClover.count,3,'hitClover.count');
    hitClover.destroy();
});

test('test_HitClover_render',function(){
    expect(4);
    var hitClover = new SuperMap.Style.HitClover();
    var renderOpt = {
        strokeStyle: new SuperMap.Style.Stroke({
            color: "#ff0000",
            width: 1
        }),
        fillStyle: new SuperMap.Style.Fill({
            color: "#0099ff"
        }),
        size: [21,21],
        radius: 10,
        angle: 60,
        eAngle: 0,
        sAngle: 60
    };
    hitClover.render(renderOpt);
    ok(hitClover.context !== null,'hitClover.context');
    equal(hitClover.anchor[0],renderOpt.size[0]/2,'hitClover.anchor[0]');
    equal(hitClover.size[0],renderOpt.size[0],'hitClover.size[0]');
    hitClover.destroy();
    ok(hitClover.context === null,'hitClover.context');
});