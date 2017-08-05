/**
 *SuperMap Leaflet基类
 * 定义命名空间
 * 提供公共模块
 */
import L from "leaflet"
L.supermap = L.supermap || {};
L.supermap.control = L.supermap.control || {};
import './NonEarthCRS';
import './Proj4Leaflet';
import './ExtendsCRS';