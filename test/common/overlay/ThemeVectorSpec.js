import { ThemeVector } from '../../../src/common/overlay/ThemeVector';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { MultiPoint } from '../../../src/common/commontypes/geometry/MultiPoint';
import { Rectangle } from '../../../src/common/commontypes/geometry/Rectangle';

import { ServerGeometry } from '../../../src/common/iServer/ServerGeometry';
import { GeometryType } from '../../../src/common/REST';

describe('ThemeVector', () => {
  const mockLayer = {
    getLocalXY: function () {
      return [10, 10];
    },
    map: {
      getResolution: function () {
        return 1;
      }
    },
    renderer: function () {}
  };
  // beforeAll(() => {
  //       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  //       jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  //   });
  it('constructor, destroy', () => {
    const point = new Point(111.4687675858, 353.85481148);
    var themeVector = new ThemeVector({ geometry: point }, mockLayer);
    themeVector.destroy();
    expect(themeVector.dataBounds).toBeNull();
  });

  // 创建一个图形 点
  it('multiPointToTF', () => {
    var options = {
      id: 1,
      parts: [1, 1],
      points: [
        { y: -4377.027184298267, x: 4020.0045221720466 },
        { y: -4381.569363260499, x: 4057.0600591960642 }
      ],
      type: GeometryType.POINT
    };
    var serverGeometry = new ServerGeometry(options);
    var toGeoPointMulti = serverGeometry.toGeoPoint();
    var themeVector = new ThemeVector({ geometry: toGeoPointMulti }, mockLayer);
    themeVector.destroy();
    expect(themeVector.dataBounds).toBeNull();
  });
  it('rectangleToTF', () => {
    var recttangle = new Rectangle(1, 2, 10, 20);

    var themeVector = new ThemeVector({ geometry: recttangle }, mockLayer);
    themeVector.destroy();
    expect(themeVector.dataBounds).toBeNull();
  });
  it('multiLineStringToTF', () => {
    var options = {
      id: 1,
      parts: [4, 4],
      points: [
        { y: -4377.027184298267, x: 4020.0045221720466 },
        { y: -4381.569363260499, x: 4057.0600591960642 },
        { y: -4382.60877717323, x: 4064.595810063362 },
        { y: -4382.939424428795, x: 4076.2655245045335 },
        { y: -4382.333381109672, x: 4215.049444583775 },
        { y: -4382.389670274902, x: 4247.756955878764 },
        { y: -4382.285032149534, x: 4428.153084011883 },
        { y: -4383.017499027105, x: 4647.579232906979 }
      ],
      type: GeometryType.LINE
    };
    var serverGeometry = new ServerGeometry(options);
    var geoLine_MultiLineString = serverGeometry.toGeoLine();
    var themeVector = new ThemeVector({ geometry: geoLine_MultiLineString }, mockLayer);
    themeVector.destroy();
    expect(themeVector.dataBounds).toBeNull();
  });
});
