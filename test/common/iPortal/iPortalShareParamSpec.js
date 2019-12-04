import {IPortalShareParam} from '../../../src/common/iPortal/iPortalShareParam';

describe('IPortalShareParam', () => {
    it('ids', () => {
        var param = new IPortalShareParam({ids: [1,2]});
        expect(param).not.toBeNull();
        expect(param.ids[1]).toEqual(2);
    });

    it('entities', () => {
        var param = new IPortalShareParam({ entities: ["demo"] });
        expect(param).not.toBeNull();
        expect(param.entities[0]).toEqual("demo");
    });

    it('resourceType', () => {
        var param = new IPortalShareParam({ resourceType: "MAP" });
        expect(param).not.toBeNull();
        expect(param.resourceType).toEqual("MAP");
    });
});
