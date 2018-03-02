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
    MAX_LATITUDE: 85.0511287798,
    minZoom: 0,
    maxZoom: 22,
    nativeMaxZoom: 19,

    project: function (lngLat) {
        let ll = (lngLat instanceof Array)
            ? {lng: lngLat[0], lat: lngLat[1]}
            : {lng: lngLat.lng, lat: lngLat.lat};

        let d = Math.PI / 180,
            max = this.MAX_LATITUDE,
            lat = Math.max(Math.min(max, ll.lat), -max),
            sin = Math.sin(lat * d);

        return {
            x: this.R * ll.lng * d,
            y: this.R * Math.log((1 + sin) / (1 - sin)) / 2
        };
    },

    unproject: function (point) {
        var d = 180 / Math.PI;
        var pt = point;
        if (point instanceof Array) {
            pt = {x: point[0], y: point[1]};
        }
        return {
            lng: pt.x * d / this.R,
            lat: (2 * Math.atan(Math.exp(pt.y / this.R)) - (Math.PI / 2)) * d
        }
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
        return this.resolutions[Math.ceil(zoom)];
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

