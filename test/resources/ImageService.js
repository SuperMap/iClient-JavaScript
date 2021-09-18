var getCollectionByIDJson = {
  stac_version: '1.0.0-beta.2',
  stac_extensions: [],
  id: 'Sentinel-2',
  title: '哨兵 -2 多光谱成像仪 MSI, Level-1C 数据',
  description:
    '哨兵二号是一种宽波段、高分辨率、多光谱成像任务。\n哨兵-2号卫星携带一枚多光谱成像仪(MSI)，高度为786km，可覆盖13个光谱波段，\n幅宽达290千米。地面分辨率分别为10m、20m和60m、一颗卫星的重访周期为10天，\n两颗互补，重访周期为5天。从可见光和近红外到短波红外，具有不同的空间分辨率，\n在光学数据中，哨兵-2号数据是唯一一个在红边范围含有三个波段的数据，\n这对监测植被健康信息非常有效。\n\nesa：欧洲航天局（ESA）\neo：对地观测EO(Earth Observation)\nmsi：多光谱成像仪(MSI)\nradiance：辐射率或辐射亮度值(Radiance)\nsentinel：哨兵\n',
  license: 'proprietary',
  keywords: ['copernicus', 'esa', 'eu', 'msi', 'radiance', 'sentinel'],
  providers: [
    {
      name: 'ESA',
      roles: ['producer', 'licensor'],
      url: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-2-msi'
    }
  ],
  extent: {
    spatial: {
      bbox: [[-180, -56, 180, 83]]
    },
    temporal: {
      interval: [['2015-06-23T00:00:00Z', '2019-07-10T13:44:56Z']]
    }
  },
  summaries: {
    datetime: {
      min: '2015-06-23T00:00:00Z',
      max: '2019-07-10T13:44:56Z'
    },
    'sci:citation': ['Copernicus Sentinel data [Year]'],
    'eo:gsd': [10, 30, 60],
    platform: ['sentinel-2a', 'sentinel-2b'],
    constellation: ['sentinel-2'],
    instruments: ['msi'],
    'view:off_nadir': {
      min: 0,
      max: 100
    },
    'view:sun_elevation': {
      min: 6.78,
      max: 89.9
    },
    'eo:bands': [
      [
        {
          name: 'B12',
          common_name: 'swir22',
          center_wavelength: 2.2024
        }
      ]
    ]
  },
  links: [
    {
      rel: 'license',
      href: 'https://scihub.copernicus.eu/twiki/pub/SciHubWebPortal/TermsConditions/Sentinel_Data_Terms_and_Conditions.pdf',
      title: 'Legal notice on the use of Copernicus Sentinel Data and Service Information'
    }
  ]
};
var getCollectionsJson = [getCollectionByIDJson];

var getLandingPageJson = {
  stac_version: '1.0.0-beta.1',
  id: 'sentinel',
  title: '哨兵卫星影像',
  description: '哨兵 1 和哨兵2 卫星影像目录',
  conformsTo: ['https://api.stacspec.org/v1.0.0-beta.1/core', 'https://api.stacspec.org/v1.0.0-beta.1/item-search'],
  links: [
    {
      href: 'http://data.example.org/',
      rel: 'self',
      type: 'application/json',
      title: '当前文档'
    }
  ]
};
