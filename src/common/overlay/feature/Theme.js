import {SuperMap} from '../../SuperMap';
import {Point} from '../../commontypes/geometry/Point';
import {GeoText} from '../../commontypes/geometry/GeoText';
import {LonLat} from '../../commontypes/LonLat';
import {Util} from '../../commontypes/Util';

/**
 * @private
 * @class  SuperMap.Feature.Theme
 * @category Visualization Theme
 * 专题要素基类，此类不可实例化。
 */
export class Theme {

    /**
     * Constructor: SuperMap.Feature.Theme
     * 构造函数。
     *
     * Parameters:
     * data - {Object}  用户数据，用于生成可视化 shape，必设参数。
     * layer - {<SuperMap.Layer.Theme>} 此专题要素所在图层，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.Theme>} 返回一个专题要素。
     */
    constructor(data, layer) {

        if (!data) {
            return;
        }
        // layer 必须已经添加到地图, 且已初始化渲染器
        if (!layer || !layer.map || !layer.renderer) {
            return;
        }

        /**
         * Property: id
         * {String} 专题要素唯一标识。
         */
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");

        /**
         * APIProperty: lonlat
         * {<SuperMap.LonLat>} 专题要素地理参考位置。子类中必须根据用户数据（或地理位置参数）对其赋值。
         */
        this.lonlat = null;

        /**
         * APIProperty: location
         * {Array} 专题要素像素参考位置。通常由地理参考位置决定。长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.location = [];

        /**
         * APIProperty: data
         * {Object} {ReadOnly} 用户数据，用于生成可视化 shape，可在子类中规定数据格式或类型，如： <SuperMap.Feature.Vector> 。
         */
        this.data = data;

        /**
         * APIProperty: shapes
         * {Array} {ReadOnly} 构成此专题要素的可视化图形对象数组，数组顺序控制渲染。
         */
        this.shapes = [];

        /**
         * APIProperty: layer
         * {<SuperMap.Layer.Theme>} {ReadOnly} 此专题要素所在专题图层。
         */
        this.layer = layer;

        this.CLASS_NAME = "SuperMap.Feature.Theme";

    }


    /**
     * APIMethod: destroy
     * 销毁专题要素。
     */
    destroy() {
        this.data = null;
        this.id = null;
        this.lonlat = null;
        this.location = null;
        this.shapes = null;
        this.layer = null;
    }


    /**
     * Method: getLocalXY
     * 地理坐标转为像素坐标。
     *
     * Parameters:
     * coordinate - {<SuperMap.Geometry.Point>/<SuperMap.Geometry.GeoText>/<SuperMap.LonLat>} 地理坐标点。
     *
     * Returns:
     * {Array} 长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    getLocalXY(coordinate) {
        var resolution = this.layer.map.getResolution();
        var extent = this.layer.map.getExtent();

        if (coordinate instanceof Point || coordinate instanceof GeoText) {
            let x = (coordinate.x / resolution + (-extent.left / resolution));
            let y = ((extent.top / resolution) - coordinate.y / resolution);
            return [x, y];
        } else if (coordinate instanceof LonLat) {
            let x = (coordinate.lon / resolution + (-extent.left / resolution));
            let y = ((extent.top / resolution) - coordinate.lat / resolution);
            return [x, y];
        } else {
            return null;
        }
    }

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.Theme = Theme;