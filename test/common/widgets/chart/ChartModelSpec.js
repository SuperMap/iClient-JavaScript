import { ChartModel } from '@supermap/iclient-common/widgets/chart/ChartModel';
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import '../../../resources/LayersInfo';

describe('ChartModel', () => {
    var datasets = {
        url: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data/datasources/Jingjin/datasets/BaseMap_P",
        queryInfo: {
            attributeFilter: "SmID > 0"
        }
    };
    var chartModel = new ChartModel(datasets);

    it('constructor, getDatasetInfo', () => {
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
        }
        chartModel.getDatasetInfo(succeed);
    });
    it('constructor, getDataFeatures', () => {
        var datasetInf = {
            result: {
                dataSourceName: "Jingjin",
                datasetName: "BaseMap_P",
                dataUrl: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data"
            }
        }
        var succeed = function (results) {
            expect(results).not.toBeNull();
        }
        chartModel.getDataFeatures(datasetInf, succeed);
    });

    it('constructor, getLayerFeatures', () => {
        var dataset = {
            url: "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World/layers/Rivers@World@@World",
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        }
        var datasetInf = {
            result: {
                dataSourceName: "World",
                datasetName: "Rivers",
                mapName: "Rivers@World",
                dataUrl: "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World"
            }
        }
        var succeed = function (results) {
            expect(results).not.toBeNull();
        };
        chartModel.datasets = dataset;
        chartModel.getLayerFeatures(datasetInf, succeed);
    });
});