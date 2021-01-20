import {IPortalResource} from '../../../src/common/iPortal/iPortalResource';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

describe('iPortalResource', () => {
    beforeAll(() => {
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            return Promise.resolve(new Response("{}"));
        });
    })
    it('constructor_default', () => {
        var iPortalResource = new IPortalResource("https://iportal.supermap.io/iportal",{resourceType:'MAP'});
        expect(iPortalResource).not.toBeNull();
        expect(iPortalResource.CLASS_NAME).toBe("SuperMap.iPortalServiceBase");
        expect(iPortalResource.authorizeSetting.length).toEqual(0);
        expect(iPortalResource.id).toEqual(0);
        expect(iPortalResource.epsgCode).toEqual(0);
        expect(iPortalResource.createTime).toEqual(0);
        expect(iPortalResource.heatLevel).toEqual(0);
        expect(iPortalResource.resourceId).toEqual(0);
        expect(iPortalResource.updateTime).toEqual(0);
        var load = iPortalResource.load();
        expect(load).not.toBeNull();
    });

    it('update', ()=> {
        var iPortalResource = new IPortalResource("https://iportal.supermap.io/iportal",{resourceType:'DATA'});
        expect(iPortalResource.update() instanceof Promise).toBeTruthy();
    });
});