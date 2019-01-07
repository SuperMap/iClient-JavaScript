import { dataFlowView } from '../../../../src/leaflet/widgets/dataflow/DataFlowView';
import { FetchRequest } from "../../../../src/common/util/FetchRequest.js";
import { Server } from 'mock-socket';
import {NormalRenderer} from '../../../../src/leaflet/overlay/dataflow/NormalRenderer'
// var wsHost = "ws:\//" + "54.223.164.155:8800";
// var urlDataFlow = wsHost + "/iserver/services/dataflowTest/dataflow";
var urlDataFlow = "ws:\//localhost:8002";
// subscribe
var server;
var map, testDiv;
var mockServer;
describe('leaflet_dataflow_DataFlowView', () => {
    var serviceResult, dataView;
    var originalTimeout;
    // var wsHost = "ws:\//" + "54.223.164.155:8800";
    // var urlDataFlow = wsHost + "/iserver/services/dataflowTest/dataflow";
     mockServer = new Server(urlDataFlow+"/subscribe");
     var mocksocket
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.id = 'map';
        testDiv.style.margin = "0 auto";
        testDiv.style.width = "800px";
        testDiv.style.height = "px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: [20, 80],
            maxZoom: 18,
            zoom: 2
        });
        // 初始化微件
        dataView = new dataFlowView({
        }).addTo(map);

        var e = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                },
                "properties": {
                    "id": 1
                }
        };
        mockServer.on('connection', socket => {
            socket.on('message', () => {
                console.log("onmessage");
             });
            socket.on('close', () => { });
            socket.send(JSON.stringify(e));
            socket.close();
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    afterAll(() => {
        mockServer.stop();
        mockServer=null;
        map = null;
        window.document.body.removeChild(testDiv);
    });

    it('subscribe', (done) => {
        dataView.viewModel.on('subscribesucceeded', (e) => {
            try {
                expect(e.result.currentTarget.url).toBe(urlDataFlow+"/subscribe");
                done();
            } catch (exception) {
                console.log("'dataflow'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
        dataView.viewModel.subscribe(urlDataFlow);
    });

    it('dataupdated', (done) => {
        var corner1 = L.latLng(40.712, -74.227),
            corner2 = L.latLng(40.774, -74.125),
            bounds = L.latLngBounds(corner1, corner2);
        var layer = jasmine.createSpyObj('layer', {
            'getBounds': new function () {
                return bounds;
            },
        });
        var msg = {
            featureResult: null
        };
        dataView.viewModel.on('dataupdated', (e) => {
            try {
                expect(e.result.sourceTarget.url).toBe(urlDataFlow);
                done();
            } catch (exception) {
                console.log("'dataflow'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
        dataView.viewModel.dataFlowLayer.fire("dataupdated", {
            layer: layer,
            data: msg.featureResult
        });
    });


    it('closePopup', (done) => {
        spyOn(dataView.viewModel.dataFlowLayer, 'getLayers').and.callThrough();
        dataView.viewModel.closePopups();
        setTimeout(() => {
            expect(dataView.viewModel.dataFlowLayer.getLayers).toHaveBeenCalled();
            done();
        }, 500)
    });

    it('cancelSubscribe', (done) => {
        dataView.viewModel.cancelSubscribe();
        setTimeout(() => {
            expect(dataView.viewModel.dataFlowLayer).toBeNull();
            done();
        }, 500)
    });

})