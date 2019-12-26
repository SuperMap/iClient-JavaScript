import {IPortal} from '../../../src/common/iPortal/iPortal';
import {IPortalQueryParam} from "../../../src/common/iPortal/iPortalQueryParam";
import {IPortalShareParam} from "../../../src/common/iPortal/iPortalShareParam";
import { FetchRequest } from '../../../src/common/util/FetchRequest';
describe('iportal', () => {
    var iportalUrl = "http://rdc.ispeco.com";
    var iportal = new IPortal(iportalUrl);
    it('constructor', () => {
        expect(iportal.iportalUrl).toBe(iportalUrl);
    })

    it('queryResources', () => {
        // 传入错误的参数
        let queryParams = {
            resourceType: "",
            pageSize: 12,
            currentPage: 1,
            orderBy: "UPDATETIME",
            orderType: "DESC"
        };
        iportal.queryResources(queryParams).then(res => {
            expect(res).toBe("queryParams is not instanceof iPortalQueryParam !");
        })
    })

    it('updateResourcesShareSetting', () => {
        // 传入错误的参数
        let shareParams = {
            ids: [],
            entities: [],
            resourceType: ""
        };
        iportal.updateResourcesShareSetting(shareParams).then(res => {
            expect(res).toBe("shareParams is not instanceof iPortalShareParam !");
        })
    })
})