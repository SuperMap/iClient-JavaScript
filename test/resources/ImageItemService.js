var postFeatureJson = {
    stac_version: '1.0.0',
    stac_extensions: ['eo', 'view', 'https://example.com/cs-extension/1.0/schema.json'],
    type: 'Feature',
    id: 'CS3-20160503_132131_05',
    bbox: [-122.59750209, 37.48803556, -122.2880486, 37.613537207],
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [-122.308150179, 37.488035566],
                [-122.597502109, 37.538869539],
                [-122.576687533, 37.613537207],
                [-122.2880486, 37.562818007],
                [-122.308150179, 37.488035566]
            ]
        ]
    },
    properties: {
        datetime: '2016-05-03T13:22:30.040Z',
        title: 'A CS3 item',
        license: 'PDDL-1.0',
        providers: [
            {
                name: 'CoolSat',
                roles: ['producer', 'licensor'],
                url: 'https://cool-sat.com/'
            }
        ],
        'view:sun_azimuth': 168.7,
        'eo:cloud_cover': 0.12,
        'view:off_nadir': 1.4,
        platform: 'coolsat2',
        instruments: ['cool_sensor_v1'],
        'eo:bands': [],
        'view:sun_elevation': 33.4,
        'eo:gsd': 0.512
    },
    collection: 'CS3',
    links: [
        {
            rel: 'collection',
            href: 'http://cool-sat.com/collections/CS3'
        }
    ],
    assets: {
        analytic: {
            href: 'http://cool-sat.com/static-catalog/CS3/20160503_132130_04/analytic.tif',
            title: '4-Band Analytic'
        },
        thumbnail: {
            href: 'http://cool-sat.com/static-catalog/CS3/20160503_132130_04/thumbnail.png',
            title: 'Thumbnail'
        }
    }
};
