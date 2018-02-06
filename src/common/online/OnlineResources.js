import { SuperMap } from '../SuperMap';

/**
 * @name ServiceStatus
 * @memberOf SuperMap
 * @namespace
 * @category iPortal/Online
 * @description 服务发布状态
 * @property {string} DOES_NOT_INVOLVE  DOES_NOT_INVOLVE
 * @property {string} PUBLISH_FAILED  PUBLISH_FAILED
 * @property {string} PUBLISHED  PUBLISHED
 * @property {string} PUBLISHING  PUBLISHING
 * @property {string} UNPUBLISHED  UNPUBLISHED
 * @property {string} UNPUBLISHED_FAILED  UNPUBLISHED_FAILED
 */
export var ServiceStatus = SuperMap.ServiceStatus = {
    DOES_NOT_INVOLVE: "DOES_NOT_INVOLVE",
    PUBLISH_FAILED: "PUBLISH_FAILED",
    PUBLISHED: "PUBLISHED",
    PUBLISHING: "PUBLISHING",
    UNPUBLISHED: "UNPUBLISHED",
    UNPUBLISHED_FAILED: "UNPUBLISHED_FAILED"
};

/**
 * 
 * @name DataItemType
 * @memberOf SuperMap
 * @namespace
 * @category iPortal/Online
 * @description 数据项类型
 * @property {string} AUDIO AUDIO
 * @property {string} COLOR COLOR
 * @property {string} COLORSCHEME COLORSCHEME
 * @property {string} CSV CSV
 * @property {string} EXCEL EXCEL
 * @property {string} FILLSYMBOL FILLSYMBOL
 * @property {string} IMAGE IMAGE
 * @property {string} LAYERTEMPLATE LAYERTEMPLATE
 * @property {string} LAYOUTTEMPLATE LAYOUTTEMPLATE
 * @property {string} LINESYMBOL LINESYMBOL
 * @property {string} MAPTEMPLATE MAPTEMPLATE
 * @property {string} MARKERSYMBOL MARKERSYMBOL
 * @property {string} MBTILES MBTILES
 * @property {string} PHOTOS PHOTOS
 * @property {string} SHP SHP
 * @property {string} SMTILES SMTILES
 * @property {string} SVTILES SVTILES
 * @property {string} THEMETEMPLATE THEMETEMPLATE
 * @property {string} TPK TPK
 * @property {string} UDB UDB
 * @property {string} UGCV5 UGCV5
 * @property {string} UNKNOWN UNKNOWN
 * @property {string} VIDEO VIDEO
 * @property {string} WORKENVIRONMENT WORKENVIRONMENT
 * @property {string} WORKSPACE WORKSPACE
 */
export var DataItemType = SuperMap.DataItemType = {
    AUDIO: "AUDIO",
    COLOR: "COLOR",
    COLORSCHEME: "COLORSCHEME",
    CSV: "CSV",
    EXCEL: "EXCEL",
    FILLSYMBOL: "FILLSYMBOL",
    IMAGE: "IMAGE",
    LAYERTEMPLATE: "LAYERTEMPLATE",
    LAYOUTTEMPLATE: "LAYOUTTEMPLATE",
    LINESYMBOL: "LINESYMBOL",
    MAPTEMPLATE: "MAPTEMPLATE",
    MARKERSYMBOL: "MARKERSYMBOL",
    MBTILES: "MBTILES",
    PHOTOS: "PHOTOS",
    SHP: "SHP",
    SMTILES: "SMTILES",
    SVTILES: "SVTILES",
    THEMETEMPLATE: "THEMETEMPLATE",
    TPK: "TPK",
    UDB: "UDB",
    UGCV5: "UGCV5",
    UNKNOWN: "UNKNOWN",
    VIDEO: "VIDEO",
    WORKENVIRONMENT: "WORKENVIRONMENT",
    WORKSPACE: "WORKSPACE"
};

/**
 * @name DataItemOrderBy
 * @memberOf SuperMap
 * @namespace
 * @category iPortal/Online
 * @description 数据排序字段
 * @property {string} FILENAME  FILENAME
 * @property {string} ID  ID
 * @property {string} LASTMODIFIEDTIME  LASTMODIFIEDTIME
 * @property {string} NICKNAME  NICKNAME
 * @property {string} SERVICESTATUS  SERVICESTATUS
 * @property {string} SIZE  SIZE
 * @property {string} STATUS  STATUS
 * @property {string} TYPE  TYPE
 * @property {string} UPDATETIME  UPDATETIME
 * @property {string} USERNAME  USERNAME
 */
export var DataItemOrderBy = SuperMap.DataItemOrderBy = {
    FILENAME: "FILENAME",
    ID: "ID",
    LASTMODIFIEDTIME: "LASTMODIFIEDTIME",
    NICKNAME: "NICKNAME",
    SERVICESTATUS: "SERVICESTATUS",
    SIZE: "SIZE",
    STATUS: "STATUS",
    TYPE: "TYPE",
    UPDATETIME: "UPDATETIME",
    USERNAME: "USERNAME"
};

/**
 * @name FilterField
 * @memberOf SuperMap
 * @namespace
 * @category iPortal/Online
 * @description 关键字查询时的过滤字段
 * @property {string} LINKPAGE  LINKPAGE
 * @property {string} MAPTITLE  MAPTITLE
 * @property {string} NICKNAME  NICKNAME
 * @property {string} RESTITLE  RESTITLE
 * @property {string} USERNAME  USERNAME
 */
export var FilterField = SuperMap.FilterField = {
    LINKPAGE: "LINKPAGE",
    MAPTITLE: "MAPTITLE",
    NICKNAME: "NICKNAME",
    RESTITLE: "RESTITLE",
    USERNAME: "USERNAME"
};



