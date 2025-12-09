import { IPortalUser } from '../../../src/common/iPortal/iPortalUser';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { IPortalAddResourceParam } from '../../../src/common/iPortal/iPortalAddResourceParam';
import { IPortalRegisterServiceParam } from '../../../src/common/iPortal/iPortalRegisterServiceParam';
import { IPortalAddDataParam } from '../../../src/common/iPortal/iPortalAddDataParam';
import { IPortalDataMetaInfoParam } from '../../../src/common/iPortal/iPortalDataMetaInfoParam';
import { IPortalDataStoreInfoParam } from '../../../src/common/iPortal/iPortalDataStoreInfoParam';
import { IPortalDataConnectionInfoParam } from '../../../src/common/iPortal/iPortalDataConnectionInfoParam';

describe('IPortalUser', () => {
  var spy;
  beforeAll(() => {
    spy = spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
      return Promise.resolve(new Response('{}'));
    });
  });
  afterEach(() => {
    spy.calls.reset();
  });
  it('constructor_default', () => {
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    expect(iPortalUser.iportalUrl).toBe('https://fack/iportal');
  });

  it('deleteResources', () => {
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    expect(iPortalUser.deleteResources({ ids: [], resourceType: 'MAP' }) instanceof Promise).toBeTruthy();
  });
  it('deleteResources_data', () => {
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    expect(iPortalUser.deleteResources({ ids: [], resourceType: 'DATA' }) instanceof Promise).toBeTruthy();
  });

  it('addMap_wrong', (done) => {
    let iportalUrl = 'https://fack/iportal';
    let iPortalUser = new IPortalUser(iportalUrl);
    // 传入错误的参数
    let addMapParams = {
      rootUrl: 'http://fack:8080/iserver/services/map-Population/rest',
      tags: ['用户地图'],
      authorizeSetting: [
        {
          permissionType: 'SEARCH',
          entityType: 'USER',
          entityName: 'GUEST',
          entityId: null
        }
      ]
    };
    iPortalUser.addMap(addMapParams).then((res) => {
      expect(res).toBe('addMapParams is not instanceof IPortalAddResourceParam !');
      done();
    });
  });
  it('addMap', (done) => {
    let iportalUrl = 'https://fack/iportal';
    let iPortalUser = new IPortalUser(iportalUrl);
    // 传入错误的参数
    let addMapParams = new IPortalAddResourceParam({
      rootUrl: 'http://fack:8080/iserver/services/map-Population/rest',
      tags: ['用户地图'],
      authorizeSetting: [
        {
          permissionType: 'SEARCH',
          entityType: 'USER',
          entityName: 'GUEST',
          entityId: null
        }
      ]
    });
    iPortalUser.addMap(addMapParams).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });

  it('addScene_wrong', (done) => {
    let iportalUrl = 'https://fack/iportal';
    let iPortalUser = new IPortalUser(iportalUrl);
    // 传入错误的参数
    let addSceneParams = {
      rootUrl: 'http://fack:8080/iserver/services/3D-CBD/rest',
      tags: ['用户场景'],
      authorizeSetting: [
        {
          permissionType: 'SEARCH',
          entityType: 'USER',
          entityName: 'GUEST',
          entityId: null
        }
      ]
    };
    iPortalUser.addScene(addSceneParams).then((res) => {
      expect(res).toBe('addSceneParams is not instanceof IPortalAddResourceParam !');
      done();
    });
  });
  it('addScene', (done) => {
    let iportalUrl = 'https://fack/iportal';
    let iPortalUser = new IPortalUser(iportalUrl);
    // 传入错误的参数
    let addSceneParams = new IPortalAddResourceParam({
      rootUrl: 'http://fack:8080/iserver/services/3D-CBD/rest',
      tags: ['用户场景'],
      authorizeSetting: [
        {
          permissionType: 'SEARCH',
          entityType: 'USER',
          entityName: 'GUEST',
          entityId: null
        }
      ]
    });
    iPortalUser.addScene(addSceneParams).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });

  it('registerService', (done) => {
    let iportalUrl = 'https://fack/iportal';
    let iPortalUser = new IPortalUser(iportalUrl);
    // 传入错误的参数
    let registerServiceParams = new IPortalRegisterServiceParam({
      type: 'SUPERMAP_REST',
      tags: [],
      authorizeSetting: [
        {
          permissionType: 'SEARCH',
          entityType: 'USER',
          entityName: 'GUEST',
          entityId: null
        }
      ],
      metadata: [],
      addedMapNames: [],
      addedSceneNames: []
    });
    iPortalUser.registerService(registerServiceParams).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });
  it('registerService_wrong', (done) => {
    let iportalUrl = 'https://fack/iportal';
    let iPortalUser = new IPortalUser(iportalUrl);
    // 传入错误的参数
    let registerServiceParams = {
      type: 'SUPERMAP_REST',
      tags: [],
      authorizeSetting: [
        {
          permissionType: 'SEARCH',
          entityType: 'USER',
          entityName: 'GUEST',
          entityId: null
        }
      ],
      metadata: [],
      addedMapNames: [],
      addedSceneNames: []
    };
    iPortalUser.registerService(registerServiceParams).then((res) => {
      expect(res).toBe('registerParams is not instanceof IPortalRegisterServiceParam !');
      done();
    });
  });

  it('uploadDataRequest_wrong', (done) => {
    var uploadParam = {
      id: 1,
      formData: {}
    };
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.uploadDataRequest(uploadParam).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });

  it('addData_wrong', (done) => {
    var addDataParam = {
      fileName: 'test_addData',
      type: 'WORKSPACE',
      tags: [],
      dataMetaInfo: {}
    };
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(res).toBe('params is not instanceof iPortalAddDataParam !');
      done();
    });
  });
  it('addData', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'WORKSPACE',
      tags: [],
      dataMetaInfo: {}
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });
  it('addData_csv', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'csv',
      tags: [],
      dataMetaInfo: new IPortalDataMetaInfoParam({
        xField: 'x',
        yField: 'y',
        fileEncoding: 'UTF-8',
        xIndex: 1,
        yIndex: 1,
        fieldTypes: [],
        separator: '',
        firstRowIsHead: true,
        url: '',
        dataStoreInfo: {}
      })
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });
  it('addData_hdfs', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'hdfs',
      tags: [],
      dataMetaInfo: new IPortalDataMetaInfoParam({
        xField: 'x',
        yField: 'y',
        fileEncoding: 'UTF-8',
        xIndex: 1,
        yIndex: 1,
        fieldTypes: [],
        separator: '',
        firstRowIsHead: true,
        url: '',
        dataStoreInfo: new IPortalDataStoreInfoParam({
          type: 'hdfs'
        })
      })
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });
  it('addData_hdfs_wrong', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'hdfs',
      tags: [],
      dataMetaInfo: {}
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(res).toBe('params.dataMetaInfo is not instanceof iPortalDataMetaInfoParam !');
      done();
    });
  });
  it('addData_hbase', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'hbase',
      tags: [],
      dataMetaInfo: new IPortalDataMetaInfoParam({
        xField: 'x',
        yField: 'y',
        fileEncoding: 'UTF-8',
        xIndex: 1,
        yIndex: 1,
        fieldTypes: [],
        separator: '',
        firstRowIsHead: true,
        url: '',
        dataStoreInfo: new IPortalDataStoreInfoParam({
          type: 'hbase',
          connectionInfo: new IPortalDataConnectionInfoParam({})
        })
      })
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });
   it('addData_hbase_wrong', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'hbase',
      tags: [],
      dataMetaInfo: new IPortalDataMetaInfoParam({
        xField: 'x',
        yField: 'y',
        fileEncoding: 'UTF-8',
        xIndex: 1,
        yIndex: 1,
        fieldTypes: [],
        separator: '',
        firstRowIsHead: true,
        url: '',
        dataStoreInfo: new IPortalDataStoreInfoParam({
          type: 'hbase',
          connectionInfo: {}
        })
      })
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(res).toBe("params.dataMetaInfo.dataStoreInfo.connectionInfo is not instanceof iPortalDataConnectionInfoParam !");
      done();
    });
  });
  it('addData_hbase_wrong2', (done) => {
    var addDataParam = new IPortalAddDataParam({
      fileName: 'test_addData',
      type: 'hbase',
      tags: [],
      dataMetaInfo: new IPortalDataMetaInfoParam({
        xField: 'x',
        yField: 'y',
        fileEncoding: 'UTF-8',
        xIndex: 1,
        yIndex: 1,
        fieldTypes: [],
        separator: '',
        firstRowIsHead: true,
        url: '',
        dataStoreInfo:{}
      })
    });
    var formData = {};
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.addData(addDataParam, formData).then((res) => {
      expect(res).toBe("params.dataMetaInfo.dataStoreInfo is not instanceof iPortalDataStoreInfoParam !");
      done();
    });
  });

  it('publishOrUnpublish_wrong', (done) => {
    var options = {
      dataId: null,
      serviceType: 'RESTDATA',
      dataServiceId: null
    };
    var forPublish = true;
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.publishOrUnpublish(options, forPublish).then((res) => {
      expect(res).toBe('option.dataID and option.serviceType are Required!');
      done();
    });
  });
   it('publishOrUnpublish', (done) => {
    var options = {
      dataId: 1234,
      serviceType: 'RESTDATA',
      dataServiceId: 12345
    };
    var forPublish = true;
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.publishOrUnpublish(options, forPublish).then((res) => {
      expect(FetchRequest.commit).toHaveBeenCalled();
      done();
    });
  });

  it('getDataPublishedStatus', () => {
    var dataId = 1;
    var dataServiceId = 'map-city';
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    expect(iPortalUser.getDataPublishedStatus(dataId, dataServiceId) instanceof Promise).toBeTruthy();
  });

  it('unPublishDataService', (done) => {
    var options = {
      dataId: 1,
      serviceType: null,
      dataServiceId: null
    };
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.unPublishDataService(options).then((res) => {
      expect(res).toBe('option.dataID and option.serviceType are Required!');
      done();
    });
  });

  it('publishDataService', (done) => {
    var options = {
      dataId: 1,
      serviceType: null,
      dataServiceId: null
    };
    var iportalUrl = 'https://fack/iportal';
    var iPortalUser = new IPortalUser(iportalUrl);
    iPortalUser.publishDataService(options).then((res) => {
      expect(res).toBe('option.dataID and option.serviceType are Required!');
      done();
    });
  });
});
