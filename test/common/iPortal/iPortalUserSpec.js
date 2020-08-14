import {IPortalUser} from '../../../src/common/iPortal/iPortalUser';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

describe('IPortalUser', () => {
    beforeAll(() => {
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            return Promise.resolve(new Response("{}"));
        });
    })
    it('constructor_default', () => {
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.iportalUrl).toBe("https://iptl.supermap.io/iportal");
    });

    it('deleteResources', ()=> {
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.deleteResources({ids: [], resourceType: "MAP"}) instanceof Promise).toBeTruthy();
    });

    it('addMap', (done) => {
        let iportalUrl = 'https://iptl.supermap.io/iportal';
        let iPortalUser = new IPortalUser(iportalUrl);
        // 传入错误的参数
        let addMapParams = {
            rootUrl: "http://rdc.ispeco.com:8080/iserver/services/map-Population/rest",
            tags: ["用户地图"],
            authorizeSetting: [
                {
                    permissionType: "SEARCH",
                    entityType: "USER",
                    entityName: "GUEST",
                    entityId: null
                }
            ]
        };
        iPortalUser.addMap(addMapParams).then(res => {
            expect(res).toBe("addMapParams is not instanceof IPortalAddResourceParam !");
            done();
        })
    });

    it('addScene', (done) => {
        let iportalUrl = 'https://iptl.supermap.io/iportal';
        let iPortalUser = new IPortalUser(iportalUrl);
        // 传入错误的参数
        let addSceneParams = {
            rootUrl: "http://rdc.ispeco.com:8080/iserver/services/3D-CBD/rest",
            tags: ["用户场景"],
            authorizeSetting: [
                {
                    permissionType: "SEARCH",
                    entityType: "USER",
                    entityName: "GUEST",
                    entityId: null
                }
            ]
        };
        iPortalUser.addScene(addSceneParams).then(res => {
            expect(res).toBe("addSceneParams is not instanceof IPortalAddResourceParam !");
            done();
        })
    });

    it('registerService', (done) => {
        let iportalUrl = 'https://iptl.supermap.io/iportal';
        let iPortalUser = new IPortalUser(iportalUrl);
        // 传入错误的参数
        let registerServiceParams = {
            type: "SUPERMAP_REST",
            tags: [],
            authorizeSetting: [
                {
                    permissionType: "SEARCH",
                    entityType: "USER",
                    entityName: "GUEST",
                    entityId: null
                }
            ],
            metadata: [],
            addedMapNames: [],
            addedSceneNames: []
        }
        iPortalUser.registerService(registerServiceParams).then(res => {
            expect(res).toBe("registerParams is not instanceof IPortalRegisterServiceParam !");
            done();
        })
    })

    it('uploadDataRequest', ()=> {
        var uploadParam = {
            id:1,
            formData:{}
        }
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.uploadDataRequest(uploadParam) instanceof Promise).toBeTruthy();
    });

    it('addData', ()=> {
        var addDataParam = {
            fileName:'test_addData',
            type:'WORKSPACE',
            tags: [],
            dataMetaInfo:{}
        }
        var formData = {};
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.addData(addDataParam,formData) instanceof Promise).toBeTruthy();
    });

    it('publishOrUnpublish', (done)=> {
        var options = {
            dataId:null,
            serviceType:'RESTDATA',
            dataServiceId: null
        }
        var forPublish = true;
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        iPortalUser.publishOrUnpublish(options,forPublish).then(res => {
            expect(res).toBe("option.dataID and option.serviceType are Required!");
            done();
        })
    });

    it('getDataPublishedStatus', ()=> {
        var dataId = 1;
        var dataServiceId = "map-city";
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.getDataPublishedStatus(dataId,dataServiceId) instanceof Promise).toBeTruthy();
    });

    it('unPublishDataService', (done)=> {
        var options = {
            dataId:1,
            serviceType:null,
            dataServiceId: null
        }
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        iPortalUser.unPublishDataService(options).then(res => {
            expect(res).toBe("option.dataID and option.serviceType are Required!");
            done();
        })
    });

    it('publishDataService', (done)=> {
        var options = {
            dataId:1,
            serviceType:null,
            dataServiceId: null
        }
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        iPortalUser.publishDataService(options).then(res => {
            expect(res).toBe("option.dataID and option.serviceType are Required!");
            done();
        })
    });
});