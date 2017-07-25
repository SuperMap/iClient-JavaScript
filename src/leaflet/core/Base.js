/**
 *SuperMap Leaflet基类
 * 定义命名空间
 * 提供公共模块
 */
var L = require("leaflet");
L.supermap = L.supermap || {};
L.supermap.control = L.supermap.control || {};
require('../../common/SuperMap');
require('../../common/REST');
require('./Util');
require('./CommontypesConversion');
require('./NonEarthCRS');
require('./Proj4Leaflet');
require('./ExtendsCRS');
