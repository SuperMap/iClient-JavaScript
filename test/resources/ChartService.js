var queryChartResult = {};
var getChartFeatureInfo = {};
var chartAcronymClassify = [{ aliasName: '物标组一', chartAcronymGroupInfos: [], name: 'group1' }];
var layersRes = [
  {
    subLayers: {
      layers: [
        {
          ugcLayerType: 'GRID',
          displayFilter: null,
          dashStyle: null,
          solidStyle: null,
          sizeFixed: false,
          fieldValuesDisplayFilter: {
            fieldName: '',
            values: [],
            fieldValuesDisplayMode: 'DISABLE'
          },
          specialValueTransparent: true,
          verticalSpacing: 0,
          spatialDisplayFilter: null,
          caption: 'S102_102YYYY000000000002_Group01_D@nanbaoS102v3003f',
          description: '',
          type: 'UGC',
          colors: [
            {
              red: 88,
              green: 175,
              blue: 156,
              alpha: 255
            },
            {
              red: 97,
              green: 184,
              blue: 255,
              alpha: 255
            },
            {
              red: 130,
              green: 202,
              blue: 255,
              alpha: 255
            },
            {
              red: 167,
              green: 218,
              blue: 252,
              alpha: 255
            },
            {
              red: 201,
              green: 237,
              blue: 255,
              alpha: 255
            }
          ],
          datasetInfo: {
            schema: null,
            charset: null,
            recordCount: 0,
            supportTransaction: false,
            isFileCache: false,
            description: null,
            type: 'GRID',
            dataSourceName: 'nanbaoS102v3003f',
            tableName: null,
            isReadOnly: false,
            encodeType: null,
            bounds: {
              top: 22.783377663035903,
              left: 113.61800085384725,
              bottom: 22.76666001559844,
              leftBottom: {
                x: 113.61800085384725,
                y: 22.76666001559844,
                m: null
              },
              right: 113.63603004159953,
              rightTop: {
                x: 113.63603004159953,
                y: 22.783377663035903,
                m: null
              }
            },
            name: 'S102_102YYYY000000000002_Group01_D',
            prjCoordSys: null,
            datasourceConnectionInfo: null
          },
          gridType: 'GRID',
          clipRegionEnabled: true,
          horizontalSpacing: 0,
          minVisibleGeometrySize: 0.1,
          minScale: 0,
          specialValue: 1000000,
          joinItems: null,
          completeLineSymbolDisplayed: false,
          clipRegion: null,
          visible: true,
          maxScale: 0,
          imageInterpolationMode: 'NEARESTNEIGHBOR',
          symbolScalable: false,
          subLayers: {},
          colorGradientType: null,
          queryable: false,
          brightness: 0,
          opaqueRate: 100,
          contrast: 0,
          name: 'S102_102YYYY000000000002_Group01_D@nanbaoS102v3003f',
          bounds: {
            top: 22.783377663035903,
            left: 113.61800085384725,
            bottom: 22.76666001559844,
            leftBottom: {
              x: 113.61800085384725,
              y: 22.76666001559844,
              m: null
            },
            right: 113.63603004159953,
            rightTop: {
              x: 113.63603004159953,
              y: 22.783377663035903,
              m: null
            }
          },
          colorDictionary: {
            '0.0': {
              red: 97,
              green: 184,
              blue: 255,
              alpha: 255
            },
            '2.0': {
              red: 130,
              green: 202,
              blue: 255,
              alpha: 255
            },
            '-10.0': {
              red: 88,
              green: 175,
              blue: 156,
              alpha: 255
            },
            '20.0': {
              red: 201,
              green: 237,
              blue: 255,
              alpha: 255
            },
            '15.0': {
              red: 167,
              green: 218,
              blue: 252,
              alpha: 255
            }
          },
          specialColor: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 255
          },
          displayOrderBy: null,
          symbolScale: 0,
          fields: null,
          gamma: 1,
          representationField: ''
        }
      ]
    }
  }
];
var datasetRes = {
  childUriList: [
    'http://localhost:8090/iserver/services/data-WorkSpace1-2/rest/data/datasources/nanbaoS102v3003f/datasets/S102_102YYYY000000000002_Group01_D/fields',
    'http://localhost:8090/iserver/services/data-WorkSpace1-2/rest/data/datasources/nanbaoS102v3003f/datasets/S102_102YYYY000000000002_Group01_D/features',
    'http://localhost:8090/iserver/services/data-WorkSpace1-2/rest/data/datasources/nanbaoS102v3003f/datasets/S102_102YYYY000000000002_Group01_D/domain'
  ],
  supportAttachments: false,
  supportFeatureMetadatas: false,
  datasetInfo: {
    schema: null,
    pixelFormat: 'SINGLE',
    maxValue: 26.8700008392334,
    supportTransaction: false,
    description: 'S-102',
    type: 'GRID',
    blockSize: 1024,
    dataSourceName: 'nanbaoS102v3003f',
    tableName: 'S102_102YYYY000_3',
    noValue: 1000000,
    minValue: 0.35499998927116394,
    isReadOnly: true,
    encodeType: 'NONE',
    width: 2008,
    bounds: {
      top: 22.783377663035903,
      left: 113.61800085384725,
      bottom: 22.76666001559844,
      leftBottom: {
        x: 113.61800085384725,
        y: 22.76666001559844,
        m: null
      },
      right: 113.63603004159953,
      rightTop: {
        x: 113.63603004159953,
        y: 22.783377663035903,
        m: null
      }
    },
    name: 'S102_102YYYY000000000002_Group01_D',
    prjCoordSys: {
      distanceUnit: 'METER',
      projectionParam: null,
      epsgCode: 4326,
      coordUnit: 'DEGREE',
      name: 'GCS_WGS_1984',
      projection: null,
      type: 'PCS_EARTH_LONGITUDE_LATITUDE',
      coordSystem: {
        datum: {
          name: 'D_WGS_1984',
          type: 'DATUM_WGS_1984',
          spheroid: {
            flatten: 0.00335281066474748,
            name: 'WGS_1984',
            axis: 6378137,
            type: 'SPHEROID_WGS_1984'
          }
        },
        unit: 'DEGREE',
        spatialRefType: 'SPATIALREF_EARTH_LONGITUDE_LATITUDE',
        name: 'GCS_WGS_1984',
        type: 'GCS_WGS_1984',
        primeMeridian: {
          longitudeValue: 0,
          name: 'Greenwich',
          type: 'PRIMEMERIDIAN_GREENWICH'
        }
      }
    },
    datasourceConnectionInfo: null,
    height: 1862
  }
};
var gridValue = {
  column: 385,
  row: 845,
  value: 12,
  centerPoint: {
    x: 113.62145767211913,
    y: 22.775788497924808,
    m: null
  }
};

var featuresRes = {
  features: [
    {
      stringID: null,
      fieldNames: ['SMID', 'SMUSERID', 'STATIONID', 'CELLID', 'GROUPID'],
      geometry: {
        center: {
          x: 113.63333333333334,
          y: 22.783333333333335,
          m: null
        },
        parts: [1],
        style: null,
        prjCoordSys: null,
        id: 2072,
        type: 'POINT',
        partTopo: null,
        points: [
          {
            x: 113.63333333333334,
            y: 22.783333333333335,
            m: null
          }
        ]
      },
      fieldValues: ['2072', '0', '113382247', '1', '1'],
      ID: 2072
    }
  ],
  featureUriList: [],
  datasetInfos: [],
  totalCount: 1,
  featureCount: 1
};
var WLfeaturesRes = {
  features: [
    {
      stringID: null,
      fieldNames: [
        'SMID',
        'SMUSERID',
        'WATERLEVELHEIGHT',
        'UNCERTAINTY',
        'WATERLEVELTREND',
        'TIMEID',
        'CELLID',
        'GROUPID',
        'STATIONID'
      ],
      geometry: null,
      fieldValues: ['6538753', '0', '3.313', '0.29', '2', '1', '1', '1', '113382247'],
      ID: 6538753
    }
  ],
  featureUriList: [],
  datasetInfos: [],
  totalCount: 1,
  featureCount: 1
};
var timefeaturesRes = {
  features: [
    {
      stringID: null,
      fieldNames: ['SMID', 'SMUSERID', 'CELLID', 'TIMEPOINT', 'TIMEID'],
      geometry: null,
      fieldValues: ['1', '0', '1', '20251224T000000Z', '1'],
      ID: 1
    }
  ],
  featureUriList: [],
  datasetInfos: [],
  totalCount: 1,
  featureCount: 1
};
