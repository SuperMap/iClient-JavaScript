import {IPortalServicesQueryParam} from '../../../src/common/iPortal/iPortalServicesQueryParam';

describe('iPortalMapsQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalServicesQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });
});