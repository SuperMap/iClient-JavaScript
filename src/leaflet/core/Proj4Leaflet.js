/**
 * Inspired by https://github.com/kartena/Proj4Leaflet
 */
import L from "leaflet";
import proj4 from "proj4";

window.proj4 = proj4;
window.Proj4js = proj4;
L.Proj = {};

L.Proj._isProj4Obj = function (a) {
    return (typeof a.inverse !== 'undefined' &&
    typeof a.forward !== 'undefined');
};

/**
 * @class L.Proj.Projection
 * @private
 * @classdesc Proj投影定义类
 * @category BaseTypes Projection
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param code - {number}地理编码
 * @param def - {string} 定位
 * @param bounds - {L.bounds} 投影范围参数
 */
L.Proj.Projection = L.Class.extend({

    initialize: function (code, def, bounds) {
        var isP4 = L.Proj._isProj4Obj(code);
        this._proj = isP4 ? code : this._projFromCodeDef(code, def);
        var boundsOption = bounds;
        if (L.Util.isArray(bounds)) {
            boundsOption = L.bounds(bounds);
        }
        this.bounds = isP4 ? def : boundsOption;
    },

    /**
     * @function L.Proj.Projection.prototype.project
     * @description 通过地理坐标得到投影坐标
     * @param latlng - {L.laylng} 经纬度坐标
     * @return {Point} 返回投影坐标点
     */
    project: function (latlng) {
        var point = this._proj.forward([latlng.lng, latlng.lat]);
        return new L.Point(point[0], point[1]);
    },

    /**
     * @function L.Proj.Projection.prototype.unproject
     * @description 通过投影坐标得到地理坐标
     * @param point {L.Point} 地理坐标点
     * @param unbounded - {string} 坐标点高程不限
     * @return {LatLng} 返回经纬度坐标
     */
    unproject: function (point, unbounded) {
        if (this.bounds) {
            point.x = point.x < this.bounds.min.x ? this.bounds.min.x : (point.x > this.bounds.max.x ? this.bounds.max.x : point.x );
            point.y = point.y < this.bounds.min.y ? this.bounds.min.y : (point.y > this.bounds.max.y ? this.bounds.max.y : point.y);
        }
        var point2 = this._proj.inverse([point.x, point.y]);
        return new L.LatLng(point2[1], point2[0], unbounded);
    },

    _projFromCodeDef: function (code, def) {
        if (def) {
            proj4.defs(code, def);
        } else if (proj4.defs[code] === undefined) {
            var urn = code.split(':');
            if (urn.length > 3) {
                code = urn[urn.length - 3] + ':' + urn[urn.length - 1];
            }
            if (proj4.defs[code] === undefined) {
                throw 'No projection definition for code ' + code;
            }
        }

        return proj4(code);
    },
    getUnits: function () {
        return this._proj.oProj.units;
    }
});

/**
 * @class L.Proj.CRS
 * @classdesc 基于Proj4坐标系统扩展类
 * @category BaseTypes Projection
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param srsCode -{string} proj srsCode。
 * @param options -{Object} options。可选参数：<br>
 *                     def -{string} 投影的proj4定义。<br>
 *                     origin -{Array|L.Point} 原点。必填<br>
 *                     scales -{Array} 比例尺数组 <br>
 *                     scaleDenominators -{Array} 比例尺分母数组 <br>
 *                     resolutions -{Array} 分辨率数组 <br>
 *                     bounds -{Array|L.Bounds} 范围
 * @example
 * 用法：
 *    var crs =L.Proj.CRS("EPSG:4326",{
 *          origin: [-180,90],
 *          scaleDenominators: [2000,1000,500,200,100,50,20,10],
 *    });
 *    var map=L.map('map', {
 *       crs: crs
 *      ...
 *    })
 */
export var CRS = L.Class.extend({
    includes: L.CRS,

    options: {
        transformation: new L.Transformation(1, 0, -1, 0)
    },

    initialize: function (srsCode, options) {
        var code, proj, def;

        if (L.Proj._isProj4Obj(srsCode)) {
            proj = srsCode;
            code = proj.srsCode;
            options = options || {};

            this.projection = new L.Proj.Projection(proj, options.bounds);
        } else {
            code = srsCode;
            options = options || {};
            def = options.def || '';
            this.projection = new L.Proj.Projection(code, def, options.bounds);
        }

        L.Util.setOptions(this, options);
        this.code = code;
        this.transformation = this.options.transformation;

        if (this.options.bounds) {
            this.options.bounds = L.bounds(this.options.bounds);
        }
        if (!this.options.origin && this.options.bounds) {
            this.options.origin = [this.options.bounds.min.x, this.options.bounds.max.y];
        }
        if (this.options.origin) {
            if (this.options.origin instanceof L.Point) {
                this.options.origin = [this.options.origin.x, this.options.origin.y];
            }
            this.transformation =
                new L.Transformation(1, -this.options.origin[0],
                    -1, this.options.origin[1]);
        }

        if (this.options.scales && this.options.scales.length > 0) {
            this._scales = this._toProj4Scales(this.options.scales);
        } else if (this.options.scaleDenominators && this.options.scaleDenominators.length > 0) {
            var scales = [];
            for (let i = 0; i < this.options.scaleDenominators.length; i++) {
                scales[i] = 1 / this.options.scaleDenominators[i];
            }
            this._scales = this._toProj4Scales(scales);
        } else if (this.options.resolutions && this.options.resolutions.length > 0) {
            this._scales = [];
            for (let i = this.options.resolutions.length - 1; i >= 0; i--) {
                if (this.options.resolutions[i]) {
                    this._scales[i] = 1 / this.options.resolutions[i];
                }
            }
        } else if (this.options.bounds) {
            this._scales = this._getDefaultProj4ScalesByBounds(this.options.bounds);
        }

        this.infinite = !this.options.bounds;

    },

    /**
     * @function L.Proj.CRS.prototype.scale
     * @description 通过缩放级别获取比例尺值
     * @param zoom - {number}缩放级别
     * @return 比例尺值
     */
    scale: function (zoom) {
        var iZoom = Math.floor(zoom),
            baseScale,
            nextScale,
            scaleDiff,
            zDiff;
        if (zoom === iZoom) {
            return this._scales[zoom];
        } else {
            // Non-integer zoom, interpolate
            baseScale = this._scales[iZoom];
            nextScale = this._scales[iZoom + 1];
            scaleDiff = nextScale - baseScale;
            zDiff = (zoom - iZoom);
            return baseScale + scaleDiff * zDiff;
        }
    },

    /**
     * @function L.Proj.CRS.prototype.zoom
     * @description 根据比例尺返回缩放级别
     * @param scale - {number}比例尺
     * @return {number} 缩放级别
     */
    zoom: function (scale) {
        // Find closest number in this._scales, down
        var downScale = this._closestElement(this._scales, scale),
            downZoom = this._scales.indexOf(downScale),
            nextScale,
            nextZoom,
            scaleDiff;
        // Check if scale is downScale => return array index
        if (scale === downScale) {
            return downZoom;
        }
        // Interpolate
        nextZoom = downZoom + 1;
        nextScale = this._scales[nextZoom];
        if (nextScale === undefined) {
            return Infinity;
        }
        scaleDiff = nextScale - downScale;
        return (scale - downScale) / scaleDiff + downZoom;
    },

    distance: L.CRS.Earth.distance,

    R: L.CRS.Earth.R,

    /* Get the closest lowest element in an array */
    _closestElement: function (array, element) {
        var low;
        for (var i = array.length; i--;) {
            if (array[i] <= element && (low === undefined || low < array[i])) {
                low = array[i];
            }
        }
        return low;
    },

    _toProj4Scales: function (scales) {
        var proj4Scales = [];
        if (!scales) {
            return proj4Scales;
        }
        for (var i = 0; i < scales.length; i++) {
            var a = this.projection ? this._getMeterPerMapUnit(this.projection.getUnits()) : 1;
            proj4Scales[i] = 1 / ( 0.0254 / (96 * scales[i]) / a);
        }
        return proj4Scales;
    },
    _getMeterPerMapUnit: function (mapUnit) {
        var earchRadiusInMeters = 6378137;
        var meterPerMapUnit = 1;
        if (mapUnit === "meter") {
            meterPerMapUnit = 1;
        } else if (mapUnit === "degrees") {
            // 每度表示多少米。
            meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        } else if (mapUnit === "kilometer") {
            meterPerMapUnit = 1.0E-3;
        } else if (mapUnit === "inch") {
            meterPerMapUnit = 1 / 2.5399999918E-2;
        } else if (mapUnit === "feet") {
            meterPerMapUnit = 0.3048;
        }
        return meterPerMapUnit;
    },
    _getDefaultProj4ScalesByBounds: function (bounds) {
        if (!bounds) {
            return [];
        }
        var boundsSize = bounds.getSize();
        var extendsSize = Math.max(boundsSize.x, boundsSize.y);
        var resolution = extendsSize / 256;
        var scales = [];
        var maxZoom = 23;
        for (var i = 0; i < maxZoom; i++) {
            scales[i] = Math.pow(2, i) / resolution;
        }
        return scales;
    }
});
export var crs = function (srsCode, options) {
    return new CRS(srsCode, options)
};
L.Proj.CRS = crs;
