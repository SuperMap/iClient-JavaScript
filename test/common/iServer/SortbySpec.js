import { Sortby } from '@supermap/iclient-common/iServer';

var option = {
    field: '属性名称',
    direction: 'DESC'
};
describe('Sortby', () => {
    it('constructor destroy', () => {
        var parameter = new Sortby(option);
        expect(parameter.field).toEqual('属性名称');
        expect(parameter.direction).toEqual('DESC');
        expect(parameter.CLASS_NAME).toEqual('SuperMap.Sortby');
        parameter.destroy();
        expect(parameter.field).toEqual(undefined);
        expect(parameter.direction).toEqual('ASC');
    });

    it('constructFromObject', () => {
        var obj = Sortby.constructFromObject(option);
        var res = obj instanceof Sortby;
        expect(res).toBeTruthy();
    });

    it('constructFromObject other key', () => {
        var data = {
            test: 'test'
        };
        var obj = Sortby.constructFromObject(data);
        expect(obj.hasOwnProperty('test')).toBeFalsy();
    });
});
