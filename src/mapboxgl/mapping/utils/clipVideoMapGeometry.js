import { featureEach } from '@turf/meta';
import cloneDeep from 'lodash.clonedeep';
import proj4 from 'proj4';
import { transformCoord } from './VideoMapUtil';

export const CAMERA_Z_NEAR = 0.01;
export const VIEW_MARGIN_RATIO = 0.05;

export function getImageClipRect(videoWidth, videoHeight, marginRatio = VIEW_MARGIN_RATIO) {
  const mx = videoWidth * marginRatio;
  const my = videoHeight * marginRatio;
  return {
    minX: -mx,
    minY: -my,
    maxX: videoWidth + mx,
    maxY: videoHeight + my
  };
}

export function isInImageRect(uv, rect) {
  return !!(uv && uv.length >= 2 && uv[0] >= rect.minX && uv[0] <= rect.maxX && uv[1] >= rect.minY && uv[1] <= rect.maxY);
}

function interpolate(a, b, t) {
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

function interpolateCamera(a, b, zNear, projectFn) {
  const denom = b.camera[2] - a.camera[2];
  const t = denom === 0 ? 0 : (zNear - a.camera[2]) / denom;
  const camera = [
    a.camera[0] + t * (b.camera[0] - a.camera[0]),
    a.camera[1] + t * (b.camera[1] - a.camera[1]),
    zNear
  ];
  return {
    camera,
    uv: projectFn(camera)
  };
}

export function clipSegmentToRect(x0, y0, x1, y1, rect) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  let t0 = 0;
  let t1 = 1;
  const p = [-dx, dx, -dy, dy];
  const q = [x0 - rect.minX, rect.maxX - x0, y0 - rect.minY, rect.maxY - y0];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) {
        return null;
      }
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > t1) {
          return null;
        }
        if (t > t0) {
          t0 = t;
        }
      } else {
        if (t < t0) {
          return null;
        }
        if (t < t1) {
          t1 = t;
        }
      }
    }
  }
  return [
    [x0 + t0 * dx, y0 + t0 * dy],
    [x0 + t1 * dx, y0 + t1 * dy]
  ];
}

export function clipPolylineToRect(points, rect) {
  const parts = [];
  let current = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) {
      continue;
    }
    const clipped = clipSegmentToRect(a[0], a[1], b[0], b[1], rect);
    if (!clipped) {
      if (current.length >= 2) {
        parts.push(current);
      }
      current = [];
      continue;
    }
    if (!current.length) {
      current.push(clipped[0], clipped[1]);
      continue;
    }
    const last = current[current.length - 1];
    if (Math.abs(last[0] - clipped[0][0]) < 1e-6 && Math.abs(last[1] - clipped[0][1]) < 1e-6) {
      current.push(clipped[1]);
    } else {
      if (current.length >= 2) {
        parts.push(current);
      }
      current = [clipped[0], clipped[1]];
    }
  }
  if (current.length >= 2) {
    parts.push(current);
  }
  return parts;
}

export function clipPolygonToRect(ring, rect) {
  const edges = [
    {
      inside: (p) => p[0] >= rect.minX,
      intersect: (a, b) => interpolate(a, b, (b[0] - a[0]) === 0 ? 0 : (rect.minX - a[0]) / (b[0] - a[0]))
    },
    {
      inside: (p) => p[0] <= rect.maxX,
      intersect: (a, b) => interpolate(a, b, (b[0] - a[0]) === 0 ? 0 : (rect.maxX - a[0]) / (b[0] - a[0]))
    },
    {
      inside: (p) => p[1] >= rect.minY,
      intersect: (a, b) => interpolate(a, b, (b[1] - a[1]) === 0 ? 0 : (rect.minY - a[1]) / (b[1] - a[1]))
    },
    {
      inside: (p) => p[1] <= rect.maxY,
      intersect: (a, b) => interpolate(a, b, (b[1] - a[1]) === 0 ? 0 : (rect.maxY - a[1]) / (b[1] - a[1]))
    }
  ];
  let output = uncloseRing(ring);
  for (let e = 0; e < edges.length; e++) {
    const edge = edges[e];
    if (!output.length) {
      break;
    }
    const input = output;
    output = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      const prev = input[(i + input.length - 1) % input.length];
      const curIn = edge.inside(cur);
      const prevIn = edge.inside(prev);
      if (curIn) {
        if (!prevIn) {
          output.push(edge.intersect(prev, cur));
        }
        output.push(cur);
      } else if (prevIn) {
        output.push(edge.intersect(prev, cur));
      }
    }
  }
  return output.length >= 3 ? closeRing(output) : [];
}

export function clipPolylineNearPlane(points, zNear, projectFn) {
  const parts = [];
  let current = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const visible = p.camera && p.camera[2] > zNear;
    if (i === 0) {
      if (visible) {
        current.push(withUv(p, projectFn));
      }
      continue;
    }
    const prev = points[i - 1];
    const prevVisible = prev.camera && prev.camera[2] > zNear;
    if (prevVisible && visible) {
      current.push(withUv(p, projectFn));
    } else if (prevVisible && !visible) {
      current.push(interpolateCamera(prev, p, zNear, projectFn));
      if (current.length >= 2) {
        parts.push(current);
      }
      current = [];
    } else if (!prevVisible && visible) {
      current.push(interpolateCamera(prev, p, zNear, projectFn));
      current.push(withUv(p, projectFn));
    }
  }
  if (current.length >= 2) {
    parts.push(current);
  }
  return parts;
}

export function clipRingNearPlane(points, zNear, projectFn) {
  const ring = uncloseProjectedRing(points);
  if (!ring.length) {
    return [];
  }
  const output = [];
  for (let i = 0; i < ring.length; i++) {
    const cur = ring[i];
    const prev = ring[(i + ring.length - 1) % ring.length];
    const curIn = cur.camera && cur.camera[2] > zNear;
    const prevIn = prev.camera && prev.camera[2] > zNear;
    if (curIn) {
      if (!prevIn) {
        output.push(interpolateCamera(prev, cur, zNear, projectFn));
      }
      output.push(withUv(cur, projectFn));
    } else if (prevIn) {
      output.push(interpolateCamera(prev, cur, zNear, projectFn));
    }
  }
  return output;
}

function withUv(point, projectFn) {
  if (point.uv && point.uv.length >= 2) {
    return point;
  }
  return {
    camera: point.camera,
    uv: projectFn(point.camera)
  };
}

function uncloseRing(ring) {
  if (ring.length >= 2 && samePoint(ring[0], ring[ring.length - 1])) {
    return ring.slice(0, -1);
  }
  return ring.slice();
}

function uncloseProjectedRing(ring) {
  if (ring.length >= 2 && sameProjected(ring[0], ring[ring.length - 1])) {
    return ring.slice(0, -1);
  }
  return ring.slice();
}

function closeRing(ring) {
  if (!ring.length) {
    return ring;
  }
  if (samePoint(ring[0], ring[ring.length - 1])) {
    return ring;
  }
  return ring.concat([ring[0].slice ? ring[0].slice() : ring[0]]);
}

function samePoint(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

function sameProjected(a, b) {
  if (!a || !b || !a.camera || !b.camera) {
    return false;
  }
  return a.camera[0] === b.camera[0] && a.camera[1] === b.camera[1] && a.camera[2] === b.camera[2];
}

function toMapCoord(uv, videoMap) {
  const { originCoordsRightBottom, originCoordsLeftTop, videoWidth, videoHeight } = videoMap;
  return transformCoord({
    videoPoint: uv,
    videoWidth,
    videoHeight,
    originCoordsRightBottom,
    originCoordsLeftTop
  });
}

function projectLngLat(coord, coordTransfer) {
  const world = proj4('EPSG:4326', 'EPSG:3857', coord);
  const camera = coordTransfer.toCameraCoordinate(world);
  if (!camera) {
    return { camera: [0, 0, -1], uv: null };
  }
  return {
    camera,
    uv: coordTransfer.projectCameraToVideo(camera, CAMERA_Z_NEAR)
  };
}

function transformPoint(coord, videoMap, rect) {
  const projected = projectLngLat(coord, videoMap.coordTransfer);
  if (!projected.uv || !isInImageRect(projected.uv, rect)) {
    return null;
  }
  return toMapCoord(projected.uv, videoMap);
}

function transformLine(coords, videoMap, rect) {
  const projected = coords.map((coord) => projectLngLat(coord, videoMap.coordTransfer));
  const nearParts = clipPolylineNearPlane(
    projected,
    CAMERA_Z_NEAR,
    (camera) => videoMap.coordTransfer.projectCameraToVideo(camera, CAMERA_Z_NEAR)
  );
  const mapParts = [];
  nearParts.forEach((part) => {
    const uvs = part.map((item) => item.uv).filter((uv) => uv && uv.length >= 2);
    clipPolylineToRect(uvs, rect).forEach((clipped) => {
      mapParts.push(clipped.map((uv) => toMapCoord(uv, videoMap)));
    });
  });
  return mapParts;
}

function transformRing(coords, videoMap, rect) {
  const projected = coords.map((coord) => projectLngLat(coord, videoMap.coordTransfer));
  const nearClipped = clipRingNearPlane(
    projected,
    CAMERA_Z_NEAR,
    (camera) => videoMap.coordTransfer.projectCameraToVideo(camera, CAMERA_Z_NEAR)
  );
  const uvs = nearClipped.map((item) => item.uv).filter((uv) => uv && uv.length >= 2);
  if (uvs.length < 3) {
    return [];
  }
  return clipPolygonToRect(uvs, rect).map((uv) => toMapCoord(uv, videoMap));
}

function transformPolygon(coordinates, videoMap, rect) {
  if (!coordinates || !coordinates.length) {
    return null;
  }
  const outer = transformRing(coordinates[0], videoMap, rect);
  if (outer.length < 4) {
    return null;
  }
  const rings = [outer];
  for (let i = 1; i < coordinates.length; i++) {
    const hole = transformRing(coordinates[i], videoMap, rect);
    if (hole.length >= 4) {
      rings.push(hole);
    }
  }
  return rings;
}

function transformGeometry(geometry, videoMap, rect) {
  if (!geometry || !geometry.type) {
    return null;
  }
  const { type, coordinates, geometries } = geometry;
  if (type === 'Point') {
    const coord = transformPoint(coordinates, videoMap, rect);
    return coord ? { type, coordinates: coord } : null;
  }
  if (type === 'MultiPoint') {
    const coords = (coordinates || []).map((coord) => transformPoint(coord, videoMap, rect)).filter(Boolean);
    return coords.length ? { type, coordinates: coords } : null;
  }
  if (type === 'LineString') {
    const parts = transformLine(coordinates, videoMap, rect);
    if (!parts.length) {
      return null;
    }
    if (parts.length === 1) {
      return { type: 'LineString', coordinates: parts[0] };
    }
    return { type: 'MultiLineString', coordinates: parts };
  }
  if (type === 'MultiLineString') {
    const parts = [];
    (coordinates || []).forEach((line) => {
      transformLine(line, videoMap, rect).forEach((part) => parts.push(part));
    });
    return parts.length ? { type: 'MultiLineString', coordinates: parts } : null;
  }
  if (type === 'Polygon') {
    const polygon = transformPolygon(coordinates, videoMap, rect);
    return polygon ? { type: 'Polygon', coordinates: polygon } : null;
  }
  if (type === 'MultiPolygon') {
    const polygons = (coordinates || []).map((polygon) => transformPolygon(polygon, videoMap, rect)).filter(Boolean);
    return polygons.length ? { type: 'MultiPolygon', coordinates: polygons } : null;
  }
  if (type === 'GeometryCollection') {
    const nextGeometries = (geometries || []).map((item) => transformGeometry(item, videoMap, rect)).filter(Boolean);
    return nextGeometries.length ? { type: 'GeometryCollection', geometries: nextGeometries } : null;
  }
  return null;
}

/**
 * 将地理 GeoJSON 投影到视频地图，并裁掉相机后方、视野外的几何。
 * @param {Object} data - GeoJSON Feature / FeatureCollection / Geometry。
 * @param {Object} videoMap - VideoMap 实例。
 * @returns {Object} 裁剪后的 GeoJSON。
 */
export function transformVideoMapGeoJSON(data, videoMap) {
  if (!data || !videoMap || !videoMap.coordTransfer) {
    return data;
  }
  const rect = getImageClipRect(videoMap.videoWidth, videoMap.videoHeight);
  const cloned = cloneDeep(data);
  if (cloned.type === 'FeatureCollection') {
    const features = [];
    featureEach(cloned, (feature) => {
      const geometry = transformGeometry(feature.geometry, videoMap, rect);
      if (geometry) {
        feature.geometry = geometry;
        features.push(feature);
      }
    });
    cloned.features = features;
    return cloned;
  }
  if (cloned.type === 'Feature') {
    const geometry = transformGeometry(cloned.geometry, videoMap, rect);
    if (!geometry) {
      return {
        type: 'FeatureCollection',
        features: []
      };
    }
    cloned.geometry = geometry;
    return cloned;
  }
  const geometry = transformGeometry(cloned, videoMap, rect);
  return geometry || { type: 'FeatureCollection', features: [] };
}
