
import { ImageGFHillShade } from '@supermap/iclient-common/iServer';

var option = {
  "girdFuncName": "GFHillShade1",
  "Azimuth": 45,
  "Altitude": 2,
  "ZFactor": 1
}
describe('ImageGFHillShade', () => {
  it('constructor destroy', () => {
    var parameter = new ImageGFHillShade(option);
    expect(parameter.girdFuncName).toEqual("GFHillShade1");
    expect(parameter.Azimuth).toEqual(45);
    expect(parameter.Altitude).toEqual(2);
    expect(parameter.ZFactor).toEqual(1);
    expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageGFHillShade');
    parameter.destroy();
    expect(parameter.girdFuncName).toEqual('GFHillShade');
    expect(parameter.Azimuth).toEqual(315);
    expect(parameter.Altitude).toEqual(45);
    expect(parameter.ZFactor).toEqual(1);
  });


  it('constructFromObject', () => {
   var obj = ImageGFHillShade.constructFromObject(option);
   var res = obj instanceof ImageGFHillShade;
   expect(res).toBeTruthy();
  })

  it('constructFromObject other key', () => {
    var data = {
      'test':'test'
    }
   var obj = ImageGFHillShade.constructFromObject(data);
   expect(obj.hasOwnProperty('test')).toBeFalsy();
  })
});


