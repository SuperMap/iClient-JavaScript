import { FieldsFilter, ImageSearchParameter } from '@supermapgis/iclient-common/iServer';

var option = {
    bbox: [-110, 39.5, -105, 40.5],
    collections: [],
    ids: [],
    limit: 10,
    fields: new FieldsFilter({ include: ['f1'], exclude: ['f2'] }),
    query: {
        SmFiledName: {
            'eo:cloud_cover': { gt: 8, lt: 50 },
            platform: { eq: 'landsat-8' },
            datetime: { gte: '2018-02-12T00:00:00Z', lte: '2018-03-18T12:31:12Z' },
            'pl:item_type': { startsWith: 'PSScene' },
            product: { in: ['foo', 'bar', 'baz'] },
            'eo:gsd': { in: [10, 20] }
        }
    },
    sortby: [
        { field: 'properties.eo:cloud_cover', direction: 'asc' },
        { field: 'id', direction: 'desc' }
    ]
};
describe('ImageSearchParameter', () => {
    it('constructor destroy', () => {
        var parameter = new ImageSearchParameter(option);
        expect(parameter.bbox.length).toEqual(option.bbox.length);
        expect(parameter.collections.length).toEqual(option.collections.length);
        expect(parameter.ids.length).toEqual(option.ids.length);
        expect(parameter.limit).toEqual(10);
        expect(parameter.fields).not.toBeNull();
        expect(parameter.query).not.toBeNull();
        expect(parameter.sortby.length).toEqual(option.sortby.length);
        expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageSearchParameter');
        parameter.destroy();
        expect(parameter.bbox).toEqual(undefined);
        expect(parameter.collections).toEqual(undefined);
        expect(parameter.ids).toEqual(undefined);
        expect(parameter.limit).toEqual(undefined);
        expect(parameter.fields).toEqual(undefined);
        expect(parameter.query).toEqual(undefined);
        expect(parameter.sortby).toEqual(undefined);
    });

    it('constructFromObject', () => {
        var obj = ImageSearchParameter.constructFromObject(option);
        var res = obj instanceof ImageSearchParameter;
        expect(res).toBeTruthy();
    });

    it('constructFromObject other key', () => {
        var data = {
            test: 'test'
        };
        var obj = ImageSearchParameter.constructFromObject(data);
        expect(obj.hasOwnProperty('test')).toBeFalsy();
    });
});
