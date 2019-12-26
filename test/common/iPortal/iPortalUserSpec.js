import {IPortalUser} from '../../../src/common/iPortal/iPortalUser';

describe('IPortalUser', () => {
    it('constructor_default', () => {
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.iportalUrl).toBe("https://iptl.supermap.io/iportal");
    });
});