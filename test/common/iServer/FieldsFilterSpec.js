
import { FieldsFilter } from '@supermapgis/iclient-common/iServer';

var option = {
  "include": ['f1'],
  "exclude": ['f2']
}
describe('FieldsFilter', () => {
  it('constructor destroy', () => {
    var parameter = new FieldsFilter(option);
    expect(parameter.include.length).toEqual(option.include.length);
    expect(parameter.exclude.length).toEqual(option.exclude.length);
    expect(parameter.CLASS_NAME).toEqual('SuperMap.FieldsFilter');
    parameter.destroy();
    expect(parameter.include).toEqual(undefined);
    expect(parameter.exclude).toEqual(undefined);
  });


  it('constructFromObject', () => {
   var obj = FieldsFilter.constructFromObject(option);
   var res = obj instanceof FieldsFilter;
   expect(res).toBeTruthy();
  })

  it('constructFromObject other key', () => {
    var data = {
      'test':'test'
    }
   var obj = FieldsFilter.constructFromObject(data);
   expect(obj.hasOwnProperty('test')).toBeFalsy();
  })
});


