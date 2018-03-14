import mapboxgl from "mapbox-gl";
import '../../core/Base'


function wrap(source, min, max) {
    if (source === max || source === min) {
        return source;
    }
    let len = max - min;
    return ((source - min) % len + len) % len + min
}

function rad(angle) {
    return angle * Math.PI / 180;
}


export var Projection = {

    R: 6378137,
    minZoom: 0,
    maxZoom: 22,
    nativeMaxZoom: 19,

    RAD: Math.PI / 180,
    METERS_PER_DEGREE: 6378137 * Math.PI / 180,
    MAX_LATITUDE: 85.0511287798,

    project: function (lngLat) {
        const rad = this.RAD,
            metersPerDegree = this.METERS_PER_DEGREE,
            max = this.MAX_LATITUDE;

        let ll = (lngLat instanceof Array)
            ? {lng: lngLat[0], lat: lngLat[1]}
            : {lng: lngLat.lng, lat: lngLat.lat};

        let lng = ll.lng, lat = Math.max(Math.min(max, ll.lat), -max);
        let c;
        if (lat === 0) {
            c = 0;
        } else {
            c = Math.log(Math.tan((90 + lat) * rad / 2)) / rad;
        }
        return {x: lng * metersPerDegree, y: c * metersPerDegree};

    },

    unproject: function (point) {
        const x = point.x,
            y = point.y;
        const rad = this.RAD,
            metersPerDegree = this.METERS_PER_DEGREE;
        let c;
        if (y === 0) {
            c = 0;
        } else {
            c = y / metersPerDegree;
            c = (2 * Math.atan(Math.exp(c * rad)) - Math.PI / 2) / rad;
        }
        return {lng: wrap(x / metersPerDegree, -180, 180), lat: wrap(c, -this.MAX_LATITUDE, this.MAX_LATITUDE)};
    },

    locate: function (lngLat, dx, dy) {
        if (!lngLat) {
            return null;
        }
        dx = !dx ? 0 : dx;
        dy = !dy ? 0 : dy;

        if (!dx && !dy) {
            return lngLat;
        }


        let lng = lngLat.lng;
        if (dx !== 0) {
            let ndx = Math.abs(dx), radLng = rad(lngLat.lng);
            let sLng = 2 * Math.sqrt(Math.pow(Math.sin(ndx / (2 * this.R)), 2) / Math.pow(Math.cos(radLng), 2));
            radLng = radLng + sLng * (ndx > 0 ? 1 : -1);
            lng = wrap(radLng * 180 / Math.PI, -180, 180);
        }

        let lat = lngLat.lat;
        if (dy !== 0) {
            let ndy = Math.abs(dy), radLat = rad(lngLat.lat);
            let sLat = Math.sin(ndy / (2 * this.R)) * 2;
            radLat = radLat + sLat * (ndy > 0 ? 1 : -1);
            lat = wrap(radLat * 180 / Math.PI, -90, 90);
        }
        return {lng, lat};
    },

    getResolution: function (zoom) {
        if (!this.resolutions) {
            var resolutions = [];
            var d = 2 * 6378137 * Math.PI;
            for (var i = 0; i <= this.maxZoom; i++) {
                resolutions[i] = d / (256 * Math.pow(2, i));
            }
            this.resolutions = resolutions;
        }
        let z = (zoom | 0), length = this.resolutions.length;
        z = z < 0 ? 0 : z > length - 1 ? length - 1 : z;
        const res = this.resolutions[z];
        if ((zoom | 0) !== zoom && z !== length - 1) {
            const next = this.resolutions[z + 1];
            return res + (next - res) * (zoom - z);
        }
        return res;
    }
};

export var Transform = {
    matrix: [1, -1, 0, 0],
    projection: Projection,

    project: function (lngLat) {
        return this.projection.project(lngLat);
    },

    unproject: function (point) {
        return this.projection.unproject(point);
    },

    lngLatToPoint: function (lngLat, zoom) {
        var pt = this.project(lngLat);
        return this.transform(pt, this.projection.getResolution(zoom));
    },

    locate: function (lngLat, dx, dy) {
        return this.projection.locate(lngLat, dx, dy);
    },

    transform: function (point, scale) {
        return {
            x: this.matrix[0] * (point.x - this.matrix[2]) / scale,
            y: this.matrix[1] * (point.y - this.matrix[3]) / scale
        };
    }
};

mapboxgl.supermap.Transform = Transform;

