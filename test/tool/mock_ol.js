import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { createXYZ } from 'ol/tilegrid';
import Map from 'ol/Map';
import GeoJSON from 'ol/format/GeoJSON';
import MVT from 'ol/format/MVT';
import { unByKey } from 'ol/Observable';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import VectorTileSource from 'ol/source/VectorTile';
import XYZ from 'ol/source/XYZ';

const ol = {
    style: { Style, Fill, Stroke, Icon, Text, Circle },
    geom: { Point },
    proj: { fromLonLat },
    tilegrid: { createXYZ },
    format: { GeoJSON, MVT },
    Map,
    Observable: { unByKey },
    layer: { TileLayer, VectorLayer, VectorTileLayer },
    source: { TileJSON, VectorSource, VectorTileSource, XYZ }
};
window.ol = ol;
export default ol;
