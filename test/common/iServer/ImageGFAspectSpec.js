
import { ImageGFAspect } from '@supermapgis/iclient-common/iServer';

var option = {
  "girdFuncName": "GFAspect",
  "Azimuth": 360
}
describe('ImageGFAspect', () => {
  it('constructor destroy', () => {
    var parameter = new ImageGFAspect(option);
    expect(parameter.girdFuncName).toEqual("GFAspect");
    expect(parameter.Azimuth).toEqual(360);
    expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageGFAspect');
    parameter.destroy();
    expect(parameter.girdFuncName).toEqual('GFAspect');
    expect(parameter.Azimuth).toEqual(undefined);
  });


  it('constructFromObject', () => {
   var obj = ImageGFAspect.constructFromObject(option);
   var res = obj instanceof ImageGFAspect;
   expect(res).toBeTruthy();
  })

  it('constructFromObject other key', () => {
    var data = {
      'test':'test'
    }
   var obj = ImageGFAspect.constructFromObject(data);
   expect(obj.hasOwnProperty('test')).toBeFalsy();
  })
});


