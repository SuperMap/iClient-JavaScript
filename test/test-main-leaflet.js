/**leaflet -- services**/
require('./leaflet/services/AddressMatchServiceSpec.js');

require('./leaflet/services/EditFeaturesServiceRegionSpec.js');
require('./leaflet/services/EditFeaturesServiceLineSpec.js');
require('./leaflet/services/EditFeaturesServicePointSpec.js');
require('./leaflet/services/GetFeaturesByIDsServiceSpec.js');
require('./leaflet/services/GetFeaturesByBoundsServiceSpec.js');
require('./leaflet/services/GetFeaturesByBufferServiceSpec.js');
require('./leaflet/services/GetFeaturesBySQLServiceSpec.js');
require('./leaflet/services/GetFeaturesByGeometryServiceSpec.js');

require('./leaflet/services/FieldServiceSpec.js');

require('./leaflet/services/QueryByBoundsServiceSpec.js');
require('./leaflet/services/QueryByDistanceServiceSpec.js');
require('./leaflet/services/QueryBySQLServiceSpec.js');
require('./leaflet/services/QueryByGeometryServiceSpec.js');

require('./leaflet/services/ThemeServiceSpec.js');

/*leaflet -- overlay*/
require('./leaflet/overlay/RankSymbolThemeLayerSpec.js');
require('./leaflet/overlay/TileVectorLayerSpec.js');
require('./leaflet/overlay/UniqueThemeLayerSpec.js');
require('./leaflet/overlay/theme/GraphThemeLayerSpec.js');
require('./leaflet/overlay/EchartsLayerSpec.js');
require('./leaflet/overlay/RangeThemeLayerSpec.js');
//require('./leaflet/overlay/DataFlowlayerSpec.js');
require('./leaflet/overlay/mapVLayerSpec.js');

/*leaflet -- mapping*/
require('./leaflet/mapping/WebMapSpec.js');
require('./leaflet/mapping/TiledMapLayerSpec.js');
require('./leaflet/mapping/ImageMapLayerSpec.js');

/*leaflet -- control*/
require('./leaflet/control/ChangeTileVersionSpec.js');