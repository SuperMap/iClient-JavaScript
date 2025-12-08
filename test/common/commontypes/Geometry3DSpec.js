import { Geometry3D } from '../../../src/common/commontypes/Geometry3D';

describe('Geometry3D', () => {
  it('constructor, destroy', () => {
    var geo = new Geometry3D({
      position: [0, 0, 1],
      rotationX: 1,
      rotationY: 1,
      rotationZ: 1,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    });
    expect(geo.CLASS_NAME).toEqual('SuperMap.Geometry3D');
    expect(geo.position.length).toEqual(3);
    geo.destroy();
    expect(geo.position).toBeNull();
  });
});
