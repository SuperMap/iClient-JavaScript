import { ChartQueryService } from '../../../src/common/iServer/ChartQueryService';
import { ChartQueryParameters } from '../../../src/common/iServer/ChartQueryParameters';
import {Bounds} from '../../../src/common/commontypes/Bounds';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';

describe('ChartQueryService', () => {
  var url = GlobeParameter.chartServiceURL;
  var queryRes1 = {
    "recordsets": [
        {
            "chartRecordsets": [
                {
                    "features": [
                        {
                            "stringID": null,
                            "fieldNames": [
                                "SmID",
                                "SmUserID",
                                "OBJL",
                                "Acronym",
                                "RCID",
                                "AGEN",
                                "FIDN",
                                "FIDS",
                                "RVER",
                                "LNAM",
                                "EditLockMark",
                                "CATOFP",
                                "COLOUR",
                                "COLPAT",
                                "CONDTN",
                                "CONRAD",
                                "CONVIS",
                                "DATEND",
                                "DATSTA",
                                "HEIGHT",
                                "NATCON",
                                "NOBJNM",
                                "OBJNAM",
                                "PRODCT",
                                "STATUS",
                                "VERACC",
                                "VERDAT",
                                "VERLEN",
                                "INFORM",
                                "NINFOM",
                                "NTXTDS",
                                "PICREP",
                                "SCAMIN",
                                "TXTDSC",
                                "SORDAT",
                                "SORIND"
                            ],
                            "geometry": {
                                "center": {
                                    "x": -93.716546,
                                    "y": 29.668007
                                },
                                "parts": [
                                    1
                                ],
                                "style": null,
                                "prjCoordSys": null,
                                "id": 222,
                                "type": "POINT",
                                "partTopo": null,
                                "points": [
                                    {
                                        "x": -93.716546,
                                        "y": 29.668007
                                    }
                                ]
                            },
                            "fieldValues": [
                                "222",
                                "0",
                                "87",
                                "OFSPLF",
                                "471",
                                "550",
                                "5433563",
                                "4031",
                                "1",
                                "US000543356304031",
                                "",
                                "2",
                                "",
                                "",
                                "",
                                "1",
                                "1",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "CH 121 20 WC 48 10",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "",
                                "260000",
                                "",
                                "19670601",
                                "US,US,reprt,USCG OPFAC"
                            ],
                            "ID": 222
                        }
                    ],
                    "acronym": "OFSPLF",
                    "fieldCaptions": [
                        "SmID",
                        "SmUserID",
                        "SmGeometry",
                        "OBJL",
                        "Acronym",
                        "RCID",
                        "AGEN",
                        "FIDN",
                        "FIDS",
                        "RVER",
                        "LNAM",
                        "EditLockMark",
                        "CATOFP",
                        "COLOUR",
                        "COLPAT",
                        "CONDTN",
                        "CONRAD",
                        "CONVIS",
                        "DATEND",
                        "DATSTA",
                        "HEIGHT",
                        "NATCON",
                        "NOBJNM",
                        "OBJNAM",
                        "PRODCT",
                        "STATUS",
                        "VERACC",
                        "VERDAT",
                        "VERLEN",
                        "INFORM",
                        "NINFOM",
                        "NTXTDS",
                        "PICREP",
                        "SCAMIN",
                        "TXTDSC",
                        "SORDAT",
                        "SORIND"
                    ],
                    "fieldTypes": [
                        "INT32",
                        "INT32",
                        "LONGBINARY",
                        "INT32",
                        "WTEXT",
                        "INT64",
                        "INT32",
                        "INT64",
                        "INT32",
                        "INT16",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "INT32",
                        "INT32",
                        "INT32",
                        "WTEXT",
                        "WTEXT",
                        "DOUBLE",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "DOUBLE",
                        "INT32",
                        "DOUBLE",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT",
                        "INT32",
                        "WTEXT",
                        "WTEXT",
                        "WTEXT"
                    ],
                    "datasetName": "US4TX71M_80000_OFSPLF_P@S57ChartReadOnly",
                    "fields": [
                        "SmID",
                        "SmUserID",
                        "SmGeometry",
                        "OBJL",
                        "Acronym",
                        "RCID",
                        "AGEN",
                        "FIDN",
                        "FIDS",
                        "RVER",
                        "LNAM",
                        "EditLockMark",
                        "CATOFP",
                        "COLOUR",
                        "COLPAT",
                        "CONDTN",
                        "CONRAD",
                        "CONVIS",
                        "DATEND",
                        "DATSTA",
                        "HEIGHT",
                        "NATCON",
                        "NOBJNM",
                        "OBJNAM",
                        "PRODCT",
                        "STATUS",
                        "VERACC",
                        "VERDAT",
                        "VERLEN",
                        "INFORM",
                        "NINFOM",
                        "NTXTDS",
                        "PICREP",
                        "SCAMIN",
                        "TXTDSC",
                        "SORDAT",
                        "SORIND"
                    ]
                }
            ],
            "datasetGroupName": "US4TX71M_80000"
        }
    ],
    "totalCount": 1
  }
  it('_tranformFeatureField', (done) => {
    var chartQueryParameters = new ChartQueryParameters({
      queryMode: "ChartAttributeQuery",
      bounds: new Bounds(-180, -90, 180, 90),
    });
    var service = new ChartQueryService(url, {});
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe("POST");
      expect(testUrl).toBe(url + "/queryResults?returnContent=true");
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(queryRes1)));
    });
    var callback = (serviceResult) => {
      expect(service).not.toBeNull();
      expect(serviceResult).not.toBeNull();
      expect(serviceResult.type).toEqual("processCompleted");
      var result = serviceResult.result;
      expect(result).not.toBeNull();
      var properties = result.recordsets[0].chartRecordsets[0].features.features[0].properties;
      expect(Object.keys(properties).includes('开始日期')).toBe(true);
      done();
    }
    service.processAsync(chartQueryParameters, callback)
  })
})