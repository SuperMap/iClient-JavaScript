var getCollectionLegendJson = {
    layerId: 0,
    layerName: 'DLTB',
    minScale: 0,
    maxScale: 0,
    legendType: 'Unique Values',
    legendCells: [
        {
            label: 'GRASS',
            url: 'deb6a75248269275154096a102200343',
            imageData:
                'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAHUlEQVQ4jWNkYDjBQC5gIlvnqOZRzaOaRzVTRTMAGxgA8IzR4/kAAAAASUVORK5CYII=',
            contentType: 'image/png',
            height: 20,
            width: 20,
            values: ['GRASS']
        }
    ]
};
var getCollectionStatisticsJson = {
    collectionId: 'string',
    imageFileCount: 0,
    imageFilesSize: 0,
    storageType: ['Local'],
    extent: {
        spatial: {
            bbox: [[-180, -90, 180, 90]],
            crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
        },
        temporal: {
            interval: [['2011-11-11T12:22:11Z', null]],
            trs: 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian'
        }
    },
    bandCount: 0,
    pixelType: 'UNKNOWN'
};

var getCollectionTileInfoJson = {
    width: 0,
    height: 0,
    format: 'string',
    origin: {
        x: 0,
        y: 0
    },
    dpi: 0,
    crs: 'string',
    levels: [
        {
            level: 0,
            resolution: 0,
            scale: 0
        }
    ]
};
