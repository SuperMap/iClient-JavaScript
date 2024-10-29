
import { ImageGFOrtho } from '@supermapgis/iclient-common/iServer';

var option = {
  "girdFuncName": "GFOrtho1"
}
describe('ImageGFOrtho', () => {
  it('constructor destroy', () => {
    var parameter = new ImageGFOrtho(option);
    expect(parameter.girdFuncName).toEqual("GFOrtho1");
    expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageGFOrtho');
    parameter.destroy();
    expect(parameter.girdFuncName).toEqual('GFOrtho');
  });


  it('constructFromObject', () => {
   var obj = ImageGFOrtho.constructFromObject(option);
   var res = obj instanceof ImageGFOrtho;
   expect(res).toBeTruthy();
  })

  it('constructFromObject other key', () => {
    var data = {
      'test':'test'
    }
   var obj = ImageGFOrtho.constructFromObject(data);
   expect(obj.hasOwnProperty('test')).toBeFalsy();
  })
});


