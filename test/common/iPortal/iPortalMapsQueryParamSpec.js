import {IPortalMapsQueryParam} from '../../../src/common/iPortal/iPortalMapsQueryParam';

describe('iPortalMapsQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalMapsQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });
});