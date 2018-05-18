import ol from 'openlayers';

//applyStyleFunction 调用了ol.geom.LineString.getFlatMidpoint但是该方法在ol-debug.js里才有
export var olExtends = function (targetMap) {

    window.targetMapCache = targetMap;
    ol.format.MVT.prototype.readProjection = function (source) {
        return new ol.proj.Projection({
            code: '',
            units: ol.proj.Units.TILE_PIXELS
        });
    };
    if (!ol.geom.LineString.getFlatMidpoint) {
        ol.geom.LineString.prototype.getFlatMidpoint = function () {
            return this.getCoordinateAt(0.5);
        };
    }
    ol.render.canvas.Replay.prototype.applyFill = function (state, geometry) {
        var fillStyle = state.fillStyle;
        var fillInstruction = [ol.render.canvas.Instruction.SET_FILL_STYLE, fillStyle];
        if (typeof fillStyle !== 'string') {
            var viewExtent = window.targetMapCache.getView().getProjection().getExtent();
            fillInstruction.push([viewExtent[0], viewExtent[3]]);
        }
        this.instructions.push(fillInstruction);
    };
    ol.format.MVT.prototype.createFeature_ = function (pbf, rawFeature, opt_options) {
        var type = rawFeature.type;
        if (type === 0) {
            return null;
        }

        var feature;
        var id = rawFeature.id;
        var values = rawFeature.properties;
        values[this.layerName_] = rawFeature.layer.name;

        var flatCoordinates = [];
        var ends = [];
        ol.format.MVT.readRawGeometry_(pbf, rawFeature, flatCoordinates, ends);

        var geometryType = ol.format.MVT.getGeometryType_(type, ends.length);

        if (this.featureClass_ === ol.render.Feature) {
            feature = new this.featureClass_(geometryType, flatCoordinates, ends, values, id);
        } else {
            var geom;
            if (geometryType == ol.geom.GeometryType.POLYGON) {
                var endss = [];
                var offset = 0;
                var prevEndIndex = 0;
                for (var i = 0, ii = ends.length; i < ii; ++i) {
                    var end = ends[i];
                    if (!ol.geom.flat.orient.linearRingIsClockwise(flatCoordinates, offset, end, 2)) {
                        endss.push(ends.slice(prevEndIndex, i + 1));
                        prevEndIndex = i + 1;

                    }
                    offset = end;
                }
                if (endss.length > 1) {
                    ends = endss;
                    geom = new ol.geom.MultiPolygon(null);
                } else {
                    geom = new ol.geom.Polygon(null);
                }
            } else {
                geom = geometryType === ol.geom.GeometryType.POINT ? new ol.geom.Point(null) :
                    geometryType === ol.geom.GeometryType.LINE_STRING ? new ol.geom.LineString(null) :
                    geometryType === ol.geom.GeometryType.POLYGON ? new ol.geom.Polygon(null) :
                    geometryType === ol.geom.GeometryType.MULTI_POINT ? new ol.geom.MultiPoint(null) :
                    geometryType === ol.geom.GeometryType.MULTI_LINE_STRING ? new ol.geom.MultiLineString(null) :
                    null;
            }
            geom.setFlatCoordinates(ol.geom.GeometryLayout.XY, flatCoordinates, ends);
            feature = new this.featureClass_();
            if (this.geometryName_) {
                feature.setGeometryName(this.geometryName_);
            }
            var geometry = ol.format.Feature.transformWithOptions(geom, false, this.adaptOptions(opt_options));
            feature.setGeometry(geometry);
            feature.setId(id);
            feature.setProperties(values);
        }

        return feature;
    };

    ol.geom.flat.textpath.lineString = function (flatCoordinates, offset, end, stride, text, measure, startM, maxAngle) {
        const result = [];

        // Keep text upright
        //const reverse = flatCoordinates[offset] > flatCoordinates[end - stride];
        const anglereverse = Math.atan2(flatCoordinates[end - stride + 1] - flatCoordinates[offset + 1], flatCoordinates[end - stride] - flatCoordinates[offset]);
        const reverse = anglereverse < -0.785 || anglereverse > 2.356 ? true : false; //0.785//2.356
        const isRotateUp = (anglereverse < -0.785 && anglereverse > -2.356) || (anglereverse > 0.785 && anglereverse < 2.356);

        const numChars = text.length;

        let x1 = flatCoordinates[offset];
        let y1 = flatCoordinates[offset + 1];
        offset += stride;
        let x2 = flatCoordinates[offset];
        let y2 = flatCoordinates[offset + 1];
        let segmentM = 0;
        let segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        let chunk = '';
        let chunkLength = 0;
        let data, index, previousAngle, previousLang;
        for (let i = 0; i < numChars; ++i) {
            index = reverse ? numChars - i - 1 : i;
            const char = text.charAt(index);
            const ischinese = char.charCodeAt(0) >= 19968 && char.charCodeAt(0) <= 40907 ? true : false;
            chunk = reverse ? char + chunk : chunk + char;
            const charLength = measure(chunk) - chunkLength;
            chunkLength += charLength;
            const charM = startM + charLength / 2;
            while (offset < end - stride && segmentM + segmentLength < charM) {
                x1 = x2;
                y1 = y2;
                offset += stride;
                x2 = flatCoordinates[offset];
                y2 = flatCoordinates[offset + 1];
                segmentM += segmentLength;
                segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            }
            const segmentPos = charM - segmentM;
            let angle = Math.atan2(y2 - y1, x2 - x1);
            if (reverse) {
                angle += angle > 0 ? -Math.PI : Math.PI;
            }
            if (ischinese && isRotateUp) {
                angle += angle > 0 ? -Math.PI / 2 : Math.PI / 2;
            }
            if (previousAngle !== undefined) {
                let delta = angle - previousAngle;
                delta += (delta > Math.PI) ? -2 * Math.PI : (delta < -Math.PI) ? 2 * Math.PI : 0;
                if (ischinese === previousLang ? Math.abs(delta) > maxAngle : Math.abs(delta) > (maxAngle + Math.PI / 2)) {
                    return null;
                }
            }
            const interpolate = segmentPos / segmentLength;
            const x = ol.math.lerp(x1, x2, interpolate);
            const y = ol.math.lerp(y1, y2, interpolate);
            if (previousAngle == angle && !isRotateUp) {
                if (reverse) {
                    data[0] = x;
                    data[1] = y;
                    data[2] = charLength / 2;
                }
                data[4] = chunk;
            } else {
                chunk = char;
                chunkLength = charLength;
                data = [x, y, charLength / 2, angle, chunk];
                if (reverse) {
                    result.unshift(data);
                } else {
                    result.push(data);
                }
                previousAngle = angle;
                previousLang = ischinese;
            }
            startM += charLength;
        }
        return result;
    }
    ol.layer.VectorTile.prototype.setFastRender = function (fastRender) {
        return this.fastRender = fastRender;
    };

    ol.renderer.canvas.VectorTileLayer.prototype.postCompose = function (context, frameState, layerState) {
        var layer = this.getLayer();
        var declutterReplays = layer.getDeclutter() ? {} : null;
        var source = /** @type {ol.source.VectorTile} */ (layer.getSource());
        var renderMode = layer.getRenderMode();
        var replayTypes = ol.renderer.canvas.VectorTileLayer.VECTOR_REPLAYS[renderMode];
        var pixelRatio = frameState.pixelRatio;
        var rotation = frameState.viewState.rotation;
        var size = frameState.size;
        var offsetX, offsetY;
        if (rotation) {
            offsetX = Math.round(pixelRatio * size[0] / 2);
            offsetY = Math.round(pixelRatio * size[1] / 2);
            ol.render.canvas.rotateAtOffset(context, -rotation, offsetX, offsetY);
        }
        if (declutterReplays) {
            this.declutterTree_.clear();
        }
        var tiles = this.renderedTiles;
        var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
        var clips = [];
        var zs = [];
        for (var i = tiles.length - 1; i >= 0; --i) {
            var tile = /** @type {ol.VectorImageTile} */ (tiles[i]);
            if (tile.getState() == ol.TileState.ABORT) {
                continue;
            }
            var tileCoord = tile.tileCoord;
            var worldOffset = tileGrid.getTileCoordExtent(tileCoord)[0] -
                tileGrid.getTileCoordExtent(tile.wrappedTileCoord)[0];
            var transform = undefined;
            for (var t = 0, tt = tile.tileKeys.length; t < tt; ++t) {
                var sourceTile = tile.getTile(tile.tileKeys[t]);
                if (sourceTile.getState() == ol.TileState.ERROR) {
                    continue;
                }
                var replayGroup = sourceTile.getReplayGroup(layer, tileCoord.toString());
                if (renderMode != ol.layer.VectorTileRenderType.VECTOR && (!replayGroup || !replayGroup.hasReplays(replayTypes))) {
                    if (layer.fastRender === true) {
                        sourceTile.replayGroups_ = {};
                        sourceTile.features_ = [];
                    }
                    continue;
                }
                if (!transform) {
                    transform = this.getTransform(frameState, worldOffset);
                }
                var currentZ = sourceTile.tileCoord[0];
                var currentClip = replayGroup.getClipCoords(transform);
                context.save();
                context.globalAlpha = layerState.opacity;
                // Create a clip mask for regions in this low resolution tile that are
                // already filled by a higher resolution tile
                for (var j = 0, jj = clips.length; j < jj; ++j) {
                    var clip = clips[j];
                    if (currentZ < zs[j]) {
                        context.beginPath();
                        // counter-clockwise (outer ring) for current tile
                        context.moveTo(currentClip[0], currentClip[1]);
                        context.lineTo(currentClip[2], currentClip[3]);
                        context.lineTo(currentClip[4], currentClip[5]);
                        context.lineTo(currentClip[6], currentClip[7]);
                        // clockwise (inner ring) for higher resolution tile
                        context.moveTo(clip[6], clip[7]);
                        context.lineTo(clip[4], clip[5]);
                        context.lineTo(clip[2], clip[3]);
                        context.lineTo(clip[0], clip[1]);
                        context.clip();
                    }
                }
                replayGroup.replay(context, transform, rotation, {}, replayTypes, declutterReplays);
                context.restore();
                clips.push(currentClip);
                zs.push(currentZ);
            }
        }
        if (declutterReplays) {
            ol.render.canvas.ReplayGroup.replayDeclutter(declutterReplays, context, rotation);
        }
        if (rotation) {
            ol.render.canvas.rotateAtOffset(context, rotation,
                /** @type {number} */
                (offsetX), /** @type {number} */ (offsetY));
        }
        ol.renderer.canvas.TileLayer.prototype.postCompose.apply(this, arguments);
    };
}
window.olExtends=olExtends;