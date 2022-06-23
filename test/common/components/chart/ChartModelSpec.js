import {
    ChartModel
} from '../../../../src/common/components/chart/ChartModel';
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import '../../../resources/LayersInfo';

describe('ChartModel', () => {
    var datasets = {
        type: "iServer",
        url: "http://test.iserver.com/iserver/services/data-jingjin/rest/data/datasources/Jingjin/datasets/BaseMap_P",
        withCredentials: false,
        queryInfo: {
            attributeFilter: "SmID > 0"
        }
    };
    var chartModel;

    beforeEach(() => {
        chartModel = new ChartModel(datasets);
    });
   
    it('constructor, getDatasetInfo', (done) => {
        expect(chartModel.datasets.url).toBe(datasets.url);
        expect(chartModel.datasets.queryInfo).toBe(datasets.queryInfo);

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(datasets.url);
            return Promise.resolve(new Response(JSON.stringify(layerInfo)));
        });

        var succeed = function (results) {
            var datasetInf = results.result;
            expect(results).not.toBeNull();
            expect(datasetInf.dataSourceName).toBe("World");
            expect(datasetInf.datasetName).toBe("continent_T");
            expect(datasetInf.mapName).toBe("continent_T@World.1");
            done();
        }
        chartModel.getDatasetInfo(succeed);
    });
    it('constructor, getDataFeatures', (done) => {
        var datasetInf = {
            result: {
                dataSourceName: "Jingjin",
                datasetName: "BaseMap_P",
                dataUrl: "http://localhost/iserver/services/data-jingjin/rest/data"
            }
        }
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify({features:[]})));
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            done();
        }
        chartModel.getDataFeatures(datasetInf, succeed);
    });
    it('constructor, getLayerFeatures', (done) => {
        var dataset = {
            url: "http://test.iserver.com/iserver/services/map-world/rest/maps/World/layers/Rivers@World@@World",
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        }
        var datasetInf = {
            result: {
                dataSourceName: "World",
                datasetName: "Rivers",
                mapName: "Rivers@World",
                dataUrl: "http://test.iserver.com/iserver/services/map-world/rest/maps/World"
            }
        }
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if(url.indexOf('Rivers@World@@World') > -1){
                return Promise.resolve(new Response(JSON.stringify(layerInfo)));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify({features:[]})));
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            done();
        };
        chartModel.datasets = dataset;
        chartModel.getLayerFeatures(datasetInf, succeed);
    });
    it('constructor, getDataInfoByIptl', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1589681486',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === dataset.url) {
                return Promise.resolve(new Response(JSON.stringify({ "dataMetaInfo": { "firstRowIsHead": false, "previewURL": null, "fileEncoding": "UTF-8", "proxiedServiceType": null, "hasScene": false, "xIndex": null, "yField": null, "yIndex": null, "separator": null, "url": null, "baseLayerType": null, "xField": null, "epsgCode": 0, "realspaceType": null, "releaseTimeMilli": 0, "fieldTypes": null, "bounds": null, "proxiedServiceUrl": null, "providers": null }, "lastModfiedTime": 1546590400135, "fileName": "sichuan(3).geojson", "thumbnail": "http://fakeportal:8090/iportal/services/../web/static/portal/img/map/cloud.png", "dataItemServices": [{ "serviceType": "RESTDATA", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest", "dataID": 1589681486, "createTime": null, "serviceStatus": "PUBLISHED", "editable": true, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "data_sichuan-3-", "serviceName": "data_sichuan-3-" }], "dataCheckResult": { "serviceCheckInfos": [{ "serviceType": "RESTDATA", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 5, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }, { "serviceType": "RESTMAP", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 4, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }], "dataCheckInfo": { "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 3, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" } }, "publishInfo": null, "authorizeSetting": [{ "aliasName": "weidapao", "entityRoles": null, "entityType": "USER", "entityName": "weidapao", "dataPermissionType": "DELETE", "entityId": null }], "description": null, "userName": "weidapao", "type": "GEOJSON", "tags": [], "coordType": null, "size": 7490, "createTime": 1546590400135, "serviceStatus": "PUBLISHED", "nickname": "weidapao", "id": 1589681486, "serviceId": null, "downloadCount": 0, "storageId": "zhs4k8s2_pu59nqwi_ee9ea01d_5bd0_4cd6_9c18_e608778a7bd6", "status": "OK", "MD5": "c1e4a265e355de9a4aa2d5e40612285d" })));
            }else if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources') {
                return Promise.resolve(new Response(JSON.stringify({ "datasourceNames": ["supermap1_pg"], "childUriList": ["http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources/name/supermap1_pg"], "datasourceCount": 1 })));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources/supermap1_pg/datasets') {
                return Promise.resolve(new Response(JSON.stringify({ "datasetCount": 1, "datasetNames": ["dataGeoJson_2529638"], "childUriList": ["http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources/supermap1_pg/datasets/dataGeoJson_2529638"] })));
            }
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify({features:[]})));
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            done();
        };
        chartModel.datasets = dataset;
        chartModel.getDataInfoByIptl(succeed);

    });
    it('constructor, getServiceInfo_dataService', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1589681486',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === dataset.url) {
                return Promise.resolve(new Response(JSON.stringify({ "dataMetaInfo": { "firstRowIsHead": false, "previewURL": null, "fileEncoding": "UTF-8", "proxiedServiceType": null, "hasScene": false, "xIndex": null, "yField": null, "yIndex": null, "separator": null, "url": null, "baseLayerType": null, "xField": null, "epsgCode": 0, "realspaceType": null, "releaseTimeMilli": 0, "fieldTypes": null, "bounds": null, "proxiedServiceUrl": null, "providers": null }, "lastModfiedTime": 1546590400135, "fileName": "sichuan(3).geojson", "thumbnail": "http://fakeportal:8090/iportal/services/../web/static/portal/img/map/cloud.png", "dataItemServices": [{ "serviceType": "RESTDATA", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest", "dataID": 1589681486, "createTime": null, "serviceStatus": "PUBLISHED", "editable": true, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "data_sichuan-3-", "serviceName": "data_sichuan-3-" }], "dataCheckResult": { "serviceCheckInfos": [{ "serviceType": "RESTDATA", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 5, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }, { "serviceType": "RESTMAP", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 4, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }], "dataCheckInfo": { "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 3, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" } }, "publishInfo": null, "authorizeSetting": [{ "aliasName": "weidapao", "entityRoles": null, "entityType": "USER", "entityName": "weidapao", "dataPermissionType": "DELETE", "entityId": null }], "description": null, "userName": "weidapao", "type": "GEOJSON", "tags": [], "coordType": null, "size": 7490, "createTime": 1546590400135, "serviceStatus": "PUBLISHED", "nickname": "weidapao", "id": 1589681486, "serviceId": null, "downloadCount": 0, "storageId": "zhs4k8s2_pu59nqwi_ee9ea01d_5bd0_4cd6_9c18_e608778a7bd6", "status": "OK", "MD5": "c1e4a265e355de9a4aa2d5e40612285d" })));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources') {
                return Promise.resolve(new Response(JSON.stringify({ "datasourceNames": ["supermap1_pg"], "childUriList": ["http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources/name/supermap1_pg"], "datasourceCount": 1 })));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources/supermap1_pg/datasets') {
                return Promise.resolve(new Response(JSON.stringify({ "datasetCount": 1, "datasetNames": ["dataGeoJson_2529638"], "childUriList": ["http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/datasources/supermap1_pg/datasets/dataGeoJson_2529638"] })));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest/data/featureResults?returnContent=true&fromIndex=0&toIndex=100000') {
                return Promise.resolve(new Response(JSON.stringify({ "features": [{ "stringID": null, "fieldNames": ["SMID", "SMKEY", "SMSDRIW", "SMSDRIN", "SMSDRIE", "SMSDRIS", "SMGRANULE", "SMGEOMETRY", "SMUSERID", "SMLIBTILEID", "SMAREA", "SMPERIMETER", "PAC", "PINYIN", "POP_2014", "POP_2014_RURAL", "POP_2014_URBAN", "PER_CAPITA_GDP_2014", "GDP_2014", "NAME"], "geometry": { "center": { "x": 102.81566459814152, "y": 30.17315438920073 }, "parts": [3], "style": null, "prjCoordSys": null, "id": 1, "type": "REGION", "partTopo": [1], "points": [{ "x": 101.8400496800001, "y": 26.08599686926592 }, { "x": 101.6459944450001, "y": 26.33104981926121 }, { "x": 101.8400496800001, "y": 26.08599686926592 }] }, "fieldValues": ["1", "-2", "97.3801311200001", "34.26031190913554", "108.5099491700001", "26.08599686926592", "11.129818049999997", "[B@7f27b960", "0", "1", "4.848540935613763E11", "4543554.477096281", "510402.0", "Sichuan Sheng", "8140", "4371", "3769", "3.505732186732187", "28536.660", "四川省"], "ID": 1 }], "featureUriList": [], "totalCount": 1, "featureCount": 1 })))}
            return Promise.resolve();
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            expect(results.result.features).not.toBeNull();
            done();
        }
        chartModel.datasets = dataset;
        chartModel.getServiceInfo(dataset.url, succeed);

    });
    it('constructor, getServiceInfo_mapService', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1739577900',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        // return Promise.resolve(new Response(JSON.stringify()));
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === dataset.url) {
                return Promise.resolve(new Response(JSON.stringify({ "dataMetaInfo": null, "lastModfiedTime": 1546852939455, "fileName": "sichuan(4).geojson", "thumbnail": "http://fakeportal:8090/iportal/services/../web/static/portal/img/map/cloud.png", "dataItemServices": [{ "serviceType": "RESTMAP", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest", "dataID": 1739577900, "createTime": null, "serviceStatus": "PUBLISHED", "editable": false, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "map_sichuan-4-", "serviceName": "map_sichuan-4-" }], "dataCheckResult": { "serviceCheckInfos": [{ "serviceType": "RESTDATA", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 5, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }, { "serviceType": "RESTMAP", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 4, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }], "dataCheckInfo": { "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 3, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" } }, "publishInfo": null, "authorizeSetting": [{ "aliasName": "weidapao", "entityRoles": null, "entityType": "USER", "entityName": "weidapao", "dataPermissionType": "DELETE", "entityId": null }], "description": null, "userName": "weidapao", "type": "GEOJSON", "tags": ["用户数据"], "coordType": null, "size": 7490, "createTime": 1546852939455, "serviceStatus": "PUBLISHED", "nickname": "weidapao", "id": 1739577900, "serviceId": null, "downloadCount": 0, "storageId": "zhs4k8s2_pu59nqwi_afe25c7a_2e39_42a9_b56c_89e060f2e171", "status": "OK", "MD5": "c1e4a265e355de9a4aa2d5e40612285d" })));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest/maps') {
                return Promise.resolve(new Response(JSON.stringify([{ "resourceConfigID": "map", "supportedMediaTypes": ["application/xml", "text/xml", "application/json", "application/fastjson", "application/rjson", "text/html", "application/jsonp", "application/x-java-serialized-object", "application/ajax", "application/kml", "application/ifx", "application/flex", "application/flash", "application/flash3d", "application/ijs", "application/javascript", "application/html5", "application/ol3", "application/vt", "application/vectortile", "application/isl", "application/silverlight", "application/smc", "application/supermapcloud", "application/tdt", "application/tianditu", "application/ilt", "application/leaflet", "application/mbgl"], "path": "http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest/maps/mapOfsupermap1_pg", "name": "mapOfsupermap1_pg", "resourceType": "StaticResource" }])));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest/maps/mapOfsupermap1_pg/layers') {
                return Promise.resolve(new Response(JSON.stringify([{ "completeLineSymbolDisplayed": false, "visible": true, "maxScale": 0, "caption": null, "description": "", "symbolScalable": false, "subLayers": { "layers": [{ "joinItems": null, "completeLineSymbolDisplayed": false, "ugcLayerType": "VECTOR", "displayFilter": null, "visible": true, "maxScale": 0, "fieldValuesDisplayFilter": { "fieldName": "", "values": [], "fieldValuesDisplayMode": "DISABLE" }, "caption": "dataGeoJson_981423149@supermap1_pg", "description": "", "symbolScalable": false, "subLayers": {}, "type": "UGC", "datasetInfo": { "charset": null, "recordCount": 0, "isFileCache": false, "description": null, "type": "REGION", "dataSourceName": "supermap1_pg", "tableName": null, "isReadOnly": false, "encodeType": null, "bounds": { "top": 34.26031190913554, "left": 97.3801311200001, "bottom": 26.08599686926592, "leftBottom": { "x": 97.3801311200001, "y": 26.08599686926592 }, "right": 108.5099491700001, "rightTop": { "x": 108.5099491700001, "y": 34.26031190913554 } }, "name": "dataGeoJson_981423149", "prjCoordSys": null, "datasourceConnectionInfo": null }, "queryable": true, "opaqueRate": 100, "minVisibleGeometrySize": 0.1, "name": "dataGeoJson_981423149@supermap1_pg", "bounds": { "top": 34.26031190913554, "left": 97.3801311200001, "bottom": 26.08599686926592, "leftBottom": { "x": 97.3801311200001, "y": 26.08599686926592 }, "right": 108.5099491700001, "rightTop": { "x": 108.5099491700001, "y": 34.26031190913554 } }, "style": { "fillGradientOffsetRatioX": 0, "markerSize": 2.4, "fillForeColor": { "red": 208, "green": 255, "blue": 240, "alpha": 255 }, "fillGradientOffsetRatioY": 0, "markerWidth": 0, "markerAngle": 0, "fillSymbolID": 0, "lineColor": { "red": 0, "green": 128, "blue": 0, "alpha": 255 }, "markerSymbolID": 0, "lineWidth": 0.1, "markerHeight": 0, "fillOpaqueRate": 100, "fillBackOpaque": true, "fillBackColor": { "red": 255, "green": 255, "blue": 255, "alpha": 255 }, "fillGradientMode": "NONE", "lineSymbolID": 0, "fillGradientAngle": 0 }, "displayOrderBy": null, "symbolScale": 0, "minScale": 0, "representationField": "" }] }, "type": "UGC", "queryable": false, "opaqueRate": 100, "minVisibleGeometrySize": 0, "name": "mapOfsupermap1_pg", "bounds": { "top": 34.26031190913554, "left": 97.3801311200001, "bottom": 26.08599686926592, "leftBottom": { "x": 97.3801311200001, "y": 26.08599686926592 }, "right": 108.5099491700001, "rightTop": { "x": 108.5099491700001, "y": 34.26031190913554 } }, "symbolScale": 0, "minScale": 0 }])));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (url === 'http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest/maps/mapOfsupermap1_pg/queryResults?returnContent=true') {
                return Promise.resolve(new Response(JSON.stringify({ "recordsets": [{ "datasetName": "dataGeoJson_981423149@supermap1_pg", "features": [{ "fieldNames": ["SMID", "PAC", "PINYIN", "POP_2014", "POP_2014_RURAL", "POP_2014_URBAN", "PER_CAPITA_GDP_2014", "GDP_2014", "NAME"], "ID": 1, "fieldValues": ["1", "510402.0", "Sichuan Sheng", "8140", "4371", "3769", "3.505732186732187", "28536.660", "四川省"], "geometry": { "id": 1, "center": { "y": 30.17315438920073, "x": 102.81566459814152 }, "style": null, "parts": [3], "partTopo": [1], "points": [{ "y": 26.08599686926592, "x": 101.8400496800001 }, { "y": 26.33104981926121, "x": 101.6459944450001 }, { "y": 26.08599686926592, "x": 101.8400496800001 }], "type": "REGION" } }], "fieldCaptions": ["SmID", "SmKey", "SmSdriW", "SmSdriN", "SmSdriE", "SmSdriS", "SmGranule", "SmUserID", "SmLibTileID", "SmArea", "SmPerimeter", "PAC", "PINYIN", "pop_2014", "pop_2014_rural", "pop_2014_urban", "per_capita_GDP_2014", "GDP_2014", "NAME"], "fieldTypes": ["INT32", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT"], "fields": ["SMID", "PAC", "PINYIN", "POP_2014", "POP_2014_RURAL", "POP_2014_URBAN", "PER_CAPITA_GDP_2014", "GDP_2014", "NAME"] }], "totalCount": 1, "currentCount": 1, "customResponse": null })));
            }
            return Promise.resolve();
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            expect(results.result.recordsets[0].features).not.toBeNull();
            done();
        }
        chartModel.getServiceInfo(dataset.url, succeed);
    });
    it('constructor, getServiceInfo_map&dataService', (done) => {

        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1386367586',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === dataset.url) {
                return Promise.resolve(new Response(JSON.stringify({ "dataMetaInfo": { "firstRowIsHead": false, "previewURL": null, "fileEncoding": "UTF-8", "proxiedServiceType": null, "hasScene": false, "xIndex": null, "yField": null, "yIndex": null, "separator": null, "url": null, "baseLayerType": null, "xField": null, "epsgCode": 0, "realspaceType": null, "releaseTimeMilli": 0, "fieldTypes": null, "bounds": null, "proxiedServiceUrl": null, "providers": null }, "lastModfiedTime": 1546917370780, "fileName": "sichuan(7).geojson", "thumbnail": "http://fakeportal:8090/iportal/services/../web/static/portal/img/map/cloud.png", "dataItemServices": [{ "serviceType": "RESTMAP", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/map_sichuan-7-/rest", "dataID": 1386367586, "createTime": null, "serviceStatus": "PUBLISHED", "editable": false, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "map_sichuan-7-", "serviceName": "map_sichuan-7-" }, { "serviceType": "RESTDATA", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest", "dataID": 1386367586, "createTime": null, "serviceStatus": "PUBLISHED", "editable": true, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "data_sichuan-7-", "serviceName": "data_sichuan-7-" }], "dataCheckResult": { "serviceCheckInfos": [{ "serviceType": "RESTDATA", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 5, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }, { "serviceType": "RESTMAP", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 4, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }], "dataCheckInfo": { "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 3, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" } }, "publishInfo": null, "authorizeSetting": [{ "aliasName": "weidapao", "entityRoles": null, "entityType": "USER", "entityName": "weidapao", "dataPermissionType": "DELETE", "entityId": null }], "description": null, "userName": "weidapao", "type": "GEOJSON", "tags": [], "coordType": null, "size": 7490, "createTime": 1546917370780, "serviceStatus": "PUBLISHED", "nickname": "weidapao", "id": 1386367586, "serviceId": null, "downloadCount": 0, "storageId": "zhs4k8s2_pu59nqwi_976c5edc_e372_4c38_b9f0_04f196a7a426", "status": "OK", "MD5": "c1e4a265e355de9a4aa2d5e40612285d" })));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest/data/datasources') {
                return Promise.resolve(new Response(JSON.stringify({ "datasourceNames": ["supermap3_pg"], "childUriList": ["http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest/data/datasources/name/supermap3_pg"], "datasourceCount": 1 })));
            } else if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest/data/datasources/supermap3_pg/datasets') {
                return Promise.resolve(new Response(JSON.stringify({ "datasetCount": 1, "datasetNames": ["dataGeoJson_297020282"], "childUriList": ["http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest/data/datasources/supermap3_pg/datasets/dataGeoJson_297020282"] })));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (url === 'http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest/data/featureResults?returnContent=true&fromIndex=0&toIndex=100000') {
                return Promise.resolve(new Response(JSON.stringify({ "recordsets": [{ "datasetName": "dataGeoJson_981423149@supermap1_pg", "features": [{ "fieldNames": ["SMID", "PAC", "PINYIN", "POP_2014", "POP_2014_RURAL", "POP_2014_URBAN", "PER_CAPITA_GDP_2014", "GDP_2014", "NAME"], "ID": 1, "fieldValues": ["1", "510402.0", "Sichuan Sheng", "8140", "4371", "3769", "3.505732186732187", "28536.660", "四川省"], "geometry": { "id": 1, "center": { "y": 30.17315438920073, "x": 102.81566459814152 }, "style": null, "parts": [3], "partTopo": [1], "points": [{ "y": 26.08599686926592, "x": 101.8400496800001 }, { "y": 26.33104981926121, "x": 101.6459944450001 }, { "y": 26.08599686926592, "x": 101.8400496800001 }], "type": "REGION" } }], "fieldCaptions": ["SmID", "SmKey", "SmSdriW", "SmSdriN", "SmSdriE", "SmSdriS", "SmGranule", "SmUserID", "SmLibTileID", "SmArea", "SmPerimeter", "PAC", "PINYIN", "pop_2014", "pop_2014_rural", "pop_2014_urban", "per_capita_GDP_2014", "GDP_2014", "NAME"], "fieldTypes": ["INT32", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT", "TEXT"], "fields": ["SMID", "PAC", "PINYIN", "POP_2014", "POP_2014_RURAL", "POP_2014_URBAN", "PER_CAPITA_GDP_2014", "GDP_2014", "NAME"] }], "totalCount": 1, "currentCount": 1, "customResponse": null })));
            }
            return Promise.resolve();
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            expect(results.result.features).not.toBeNull();
            done();
        }


        chartModel.getServiceInfo(dataset.url, succeed);
    });
    it('constructor, getServiceInfo_noService', (done) => {

        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1102306300',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === dataset.url) {
                return Promise.resolve(new Response(JSON.stringify({ "dataMetaInfo": { "firstRowIsHead": false, "previewURL": null, "fileEncoding": "UTF-8", "proxiedServiceType": null, "hasScene": false, "xIndex": null, "yField": null, "yIndex": null, "separator": null, "url": null, "baseLayerType": null, "xField": null, "epsgCode": 0, "realspaceType": null, "releaseTimeMilli": 0, "fieldTypes": null, "bounds": null, "proxiedServiceUrl": null, "providers": null }, "lastModfiedTime": 1546917236055, "fileName": "sichuan(6).geojson", "thumbnail": "http://fakeportal:8090/iportal/services/../web/static/portal/img/map/cloud.png", "dataItemServices": [], "dataCheckResult": { "serviceCheckInfos": [{ "serviceType": "RESTDATA", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 5, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }, { "serviceType": "RESTMAP", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 4, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }], "dataCheckInfo": { "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 3, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" } }, "publishInfo": null, "authorizeSetting": [{ "aliasName": "weidapao", "entityRoles": null, "entityType": "USER", "entityName": "weidapao", "dataPermissionType": "DELETE", "entityId": null }], "description": null, "userName": "weidapao", "type": "GEOJSON", "tags": [], "coordType": null, "size": 7490, "createTime": 1546917236055, "serviceStatus": "UNPUBLISHED", "nickname": "weidapao", "id": 1102306300, "serviceId": null, "downloadCount": 0, "storageId": "zhs4k8s2_pu59nqwi_e5927e9f_8373_4cde_b5f5_5ed4dc27a871", "status": "OK", "MD5": "c1e4a265e355de9a4aa2d5e40612285d" })));
            } else if (url === 'http://fakeportal:8090/iportal/web/datas/1102306300/content.json?pageSize=9999999&currentPage=1') {
                return Promise.resolve(new Response(JSON.stringify({ "fileName": "sichuan(6).geojson", "type": "GEOJSON", "lineNumber": null, "content": "{\"type\":\"FeatureCollection\",\"features\":[{\"geometry\":{\"coordinates\":[[[101.8400496800001,26.08599686926592],[101.6459944450001,26.33104981926121],[101.9565442300001,26.08884462426595],[101.8400496800001,26.08599686926592]]],\"type\":\"Polygon\"},\"properties\":{\"GDP_2014\":28536.660,\"NAME\":\"四川省\",\"PAC\":510402.0,\"PINYIN\":\"Sichuan Sheng\",\"per_capita_GDP_2014\":3.505732186732187,\"pop_2014\":8140,\"pop_2014_rural\":4371,\"pop_2014_urban\":3769},\"type\":\"Feature\"}]}" })));}
            return Promise.resolve();
        });
        var succeed = function (results) {
            expect(results).not.toBeNull();
            expect(results.result.features).not.toBeNull();
            done();
        }

        chartModel.getServiceInfo(dataset.url, succeed);
    });
    xit('constructor, getServiceInfo_servicePublishFailed', (done) => {

        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/61056686',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === dataset.url) {
                return Promise.resolve(new Response(JSON.stringify({ "dataMetaInfo": null, "lastModfiedTime": 1547703872090, "fileName": "sichuan测试.geojson", "thumbnail": "http://fakeportal:8090/iportal/services/../web/static/portal/img/map/cloud.png", "dataItemServices": [{ "serviceType": "RESTMAP", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/map_sichuanceshi/rest", "dataID": 61056686, "createTime": null, "serviceStatus": "PUBLISH_FAILED", "editable": false, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "map_sichuanceshi", "serviceName": "map_sichuanceshi" }, { "serviceType": "RESTDATA", "accessCount": 0, "address": "http://192.168.12.230:8090/iserver/services/data_sichuanceshi/rest", "dataID": 61056686, "createTime": null, "serviceStatus": "PUBLISH_FAILED", "editable": true, "updateTime": null, "serviceNode": "2e7t6p3r", "serviceID": "data_sichuanceshi", "serviceName": "data_sichuanceshi" }], "dataCheckResult": { "serviceCheckInfos": [{ "serviceType": "RESTDATA", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 5, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }, { "serviceType": "RESTMAP", "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 4, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" }], "dataCheckInfo": { "checkStatus": "SUCCESS", "checkMsg": null, "dataType": "GEOJSON", "id": 3, "MD5": "c1e4a265e355de9a4aa2d5e40612285d" } }, "publishInfo": null, "authorizeSetting": [{ "aliasName": "weidapao", "entityRoles": null, "entityType": "USER", "entityName": "weidapao", "dataPermissionType": "DELETE", "entityId": null }], "description": null, "userName": "weidapao", "type": "GEOJSON", "tags": ["用户数据"], "coordType": null, "size": 7490, "createTime": 1547703872090, "serviceStatus": "PUBLISH_FAILED", "nickname": "weidapao", "id": 61056686, "serviceId": null, "downloadCount": 0, "storageId": "zhs4k8s2_pu59nqwi_1e5dc811_96ce_4da5_95b8_c304101e1932", "status": "OK", "MD5": "c1e4a265e355de9a4aa2d5e40612285d" })));
            } else if (url === 'http://fakeportal:8090/iportal/web/datas/61056686/content.json?pageSize=9999999&currentPage=1') {
                return Promise.resolve(new Response(JSON.stringify({ "fileName": "sichuan测试.geojson", "type": "GEOJSON", "lineNumber": null, "content": "{\"type\":\"FeatureCollection\",\"features\":[{\"geometry\":{\"coordinates\":[[[101.8400496800001,26.08599686926592],[101.6459944450001,26.33104981926121],[101.8400496800001,26.08599686926592]]],\"type\":\"Polygon\"},\"properties\":{\"GDP_2014\":28536.660,\"NAME\":\"四川省\",\"PAC\":510402.0,\"PINYIN\":\"Sichuan Sheng\",\"per_capita_GDP_2014\":3.505732186732187,\"pop_2014\":8140,\"pop_2014_rural\":4371,\"pop_2014_urban\":3769},\"type\":\"Feature\"}]}" })));
            }
            return Promise.resolve();
        });
        var succeed = function (results) {
            console.log('succeedresults',results)
            expect(results).not.toBeNull();
            expect(results.result.features).not.toBeNull();
            done();
        }

        chartModel.getServiceInfo(dataset.url, succeed);
    });
    it('constructor, getDatafromContent_GEOJSON', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1102306300',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(`${dataset.url}/content.json?pageSize=9999999&currentPage=1`);
            return Promise.resolve(new Response(JSON.stringify({ "fileName": "sichuan(6).geojson", "type": "GEOJSON", "lineNumber": null, "content": "{\"type\":\"FeatureCollection\",\"features\":[{\"geometry\":{\"coordinates\":[[[101.8400496800001,26.08599686926592],[101.6459944450001,26.33104981926121],[101.8400496800001,26.08599686926592]]],\"type\":\"Polygon\"},\"properties\":{\"GDP_2014\":28536.660,\"NAME\":\"四川省\",\"PAC\":510402.0,\"PINYIN\":\"Sichuan Sheng\",\"per_capita_GDP_2014\":3.505732186732187,\"pop_2014\":8140,\"pop_2014_rural\":4371,\"pop_2014_urban\":3769},\"type\":\"Feature\"}]}" })));
        });

        chartModel.getDatafromContent(dataset.url, (results) => {
            expect(results).not.toBeNull();
            done();
        });
    });
    it('constructor, getDatafromContent_EXCEL', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1815044756',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            // expect(url).toBe(dataset.url);
            return Promise.resolve(new Response(JSON.stringify(
                { "fileName": "全国省级行政规划.xlsx", "type": "EXCEL", "lineNumber": 32, "content": { "colTitles": ["省名"], "rows": [["北京"], ["天津"], ["上海"], ["重庆"], ["河北"], ["河南"], ["云南"], ["辽宁"], ["黑龙江"], ["湖南"], ["安徽"], ["山东"], ["新疆"], ["江苏"], ["浙江"], ["江西"], ["湖北"], ["广西"], ["甘肃"], ["山西"], ["内蒙古"], ["陕西"], ["吉林"], ["福建"], ["贵州"], ["广东"], ["青海"], ["西藏"], ["四川"], ["宁夏"], ["海南"], ["台湾"]] } }
            )));
        });
        chartModel.getDatafromContent(dataset.url, (results) => {
            expect(results).not.toBeNull();
            done();
        });
    });
    it('constructor, getDatafromContent_CSV', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal:8090/iportal/web/datas/1987252595',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify(
                { "fileName": "全国省级区域人口密度.csv", "type": "CSV", "lineNumber": 34, "content": { "colTitles": ["省", "人口", "面积", "人口密度"], "rows": [["广东省", "10430", "17.98", "580"], ["山东省", "9579", "15.71", "610"], ["河南省", "9402", "16.7", "563"], ["四川省", "8041", "48.5", "166"], ["江苏省", "7865", "10.26", "767"], ["河北省", "7185", "19", "378"], ["湖南省", "6568", "21.19", "310"], ["安徽省", "5950", "13.96", "426"], ["湖北省", "5723", "18.59", "308"], ["浙江省", "5442", "10.18", "535"], ["广西省", "4602", "23.63", "195"], ["云南省", "4596", "39.4", "117"], ["江西省", "4456", "16.69", "267"], ["辽宁省", "4374", "14.57", "300"], ["黑龙江省", "3831", "45.4", "84"], ["陕西省", "3732", "20.56", "182"], ["福建省", "3689", "12.14", "304"], ["山西省", "3571", "15.6", "229"], ["贵州省", "3474", "17.61", "197"], ["重庆市", "2884", "8.24", "350"], ["吉林省", "2746", "18.74", "147"], ["甘肃省", "2557", "45.5", "56"], ["内蒙古", "2470", "118.3", "21"], ["上海市", "2301", "0.634", "3629"], ["新疆维吾尔自治区", "2181", "166", "13"], ["北京市", "1961", "1.68", "1167"], ["天津市", "1293", "1.13", "1145"], ["海南省", "867", "3.5", "248"], ["宁夏回族自治区", "630", "6.64", "95"], ["青海省", "562", "69.66", "8"], ["西藏自治区", "300", "122.84", "2.5"], ["香港", "709", "0.1104", "6422"], ["澳门", "55", "0.0029", "19045"], ["台湾省", "2316", "3.6", "643"]] } }
            )));
        });

        var succeed = function (results) {
            expect(results).not.toBeNull();
            done();
        }
        chartModel.getDatafromContent(dataset.url, succeed);
    });
    it('constructor, getDatafromContent_404error', (done) => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://fakeportal/web/datas/445368375',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify({ "succeed": false, "error": { "code": 404, "errorMsg": "resource not exist." } })));
        });
        chartModel.events.on({
            "getdatafailed": (error) => {
                expect(error.message).toBe("获取数据失败！");
                done();
            }
        });
        var succeed = function (results) { }
        chartModel.getDatafromContent(dataset.url, succeed);
    });
    it('constructor, getDatafromRest_Map_401error', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === 'http://192.168.12.230:8095/portalproxy/iserver/services/map_beijingshichaoshiceshi/rest/maps') {
                return Promise.resolve(new Response(JSON.stringify(
                    { "code": 401, "contextPath": "", "errorMsg": "您无权进行当前操作!" }
                )));
            }

        });
        chartModel.events.on({
            "getdatafailed": (error) => {
                expect(error.message).toBe("获取数据失败！");
                done();
            }
        });
        var succeed = function (results) { }
        chartModel.getDatafromRest('RESTMAP', 'http://192.168.12.230:8095/portalproxy/iserver/services/map_beijingshichaoshiceshi/rest', succeed);
    });
    it('constructor, getDatafromRest_Data_401error', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === 'http://192.168.12.230:8095/portalproxy/iserver/services/data_beijingshichaoshiceshi/rest/data/datasources') {
                return Promise.resolve(new Response(JSON.stringify(
                    { "code": 401, "contextPath": "", "errorMsg": "您无权进行当前操作!" }
                )));
            }

        });
        chartModel.events.on({
            "getdatafailed": (error) => {
                expect(error.message).toBe("获取数据失败！");
                done();
            }
        });
        var succeed = function (results) { }
        chartModel.getDatafromRest('RESTDATA', 'http://192.168.12.230:8095/portalproxy/iserver/services/data_beijingshichaoshiceshi/rest', succeed);
    });

});