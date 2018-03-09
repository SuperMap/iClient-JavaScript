import {LinkItem} from '../../../src/common/iServer/LinkItem';

describe('LinkItem', () => {
    it('constructor, destroy', () => {
        var options = {
            foreignKeys: ["test1", "test2"],
            foreignTable: "test",
            linkFields: ["test1", "test2"],
            linkFilter: "test",
            name: "test",
            primaryKeys: ["test1", "test2"]
        };
        var linkItem = new LinkItem(options);
        expect(linkItem.foreignKeys.length).toBe(2);
        expect(linkItem.foreignTable).toBe("test");
        expect(linkItem.linkFields.length).toBe(2);
        expect(linkItem.linkFilter).toBe("test");
        expect(linkItem.name).toBe("test");
        expect(linkItem.primaryKeys.length).toBe(2);
        linkItem.destroy();
        expect(linkItem.foreignKeys).toBeNull();
        expect(linkItem.foreignTable).toBeNull();
        expect(linkItem.linkFields).toBeNull();
        expect(linkItem.linkFilter).toBeNull();
        expect(linkItem.name).toBeNull();
        expect(linkItem.primaryKeys).toBeNull();
    })
});