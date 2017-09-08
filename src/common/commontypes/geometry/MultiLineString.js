import SuperMap from '../../SuperMap';
import Collection from './Collection';
import LineString from './LineString';


/**
 * @class SuperMap.Geometry.MultiLineString
 * @classdesc 几何对象多线类。
 * @extends {SuperMap.Geometry.Collection}
 * @param components - {Array<SuperMap.Geometry.LineString>} LineString数组。
 * @example 
 * var multi = new SuperMap.Geometry.MultiLineString([
 *      new SuperMap.Geometry.LineString([
 *          new SuperMap.Geometry.Point(1, 0),
 *          new SuperMap.Geometry.Point(0, 1)
 *      ])
 *  ]);
 */
export default class MultiLineString extends Collection {

    /**
     * @member SuperMap.Geometry.MultiLineString.prototype.componentTypes -{Array<string>}
     * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
     * @readonly
     * @default ["{@link SuperMap.Geometry.LineString}"]
     */
    componentTypes = ["SuperMap.Geometry.LineString"];

    constructor(components) {
        super(components);
    }


    /**
     * @function SuperMap.Geometry.MultiLineString.prototype.split
     * @description Use this geometry (the source) to attempt to split a target geometry.
     * @param geometry - {SuperMap.Geometry} The target geometry.
     * @param options - {Object} Properties of this object will be used to determine
     *     how the split is conducted.<br>
     *
     * Valid options:<br>
     * mutual - {Boolean} Split the source geometry in addition to the target
     *     geometry.  Default is false.<br>
     * edge - {Boolean} Allow splitting when only edges intersect.  Default is
     *     true.  If false, a vertex on the source must be within the tolerance
     *     distance of the intersection to be considered a split.<br>
     * tolerance - {Number} If a non-null value is provided, intersections
     *     within the tolerance distance of an existing vertex on the source
     *     will be assumed to occur at the vertex.
     * @returns {Array} A list of geometries (of this same type as the target) that
     *     result from splitting the target with the source geometry.  The
     *     source and target geometry will remain unmodified.  If no split
     *     results, null will be returned.  If mutual is true and a split
     *     results, return will be an array of two arrays - the first will be
     *     all geometries that result from splitting the source geometry and
     *     the second will be all geometries that result from splitting the
     *     target geometry.
     */
    split(geometry, options) {
        var results = null;
        var mutual = options && options.mutual;
        var splits, sourceLine, sourceLines, sourceSplit, targetSplit;
        var sourceParts = [];
        var targetParts = [geometry];
        for (var i = 0, len = this.components.length; i < len; ++i) {
            sourceLine = this.components[i];
            sourceSplit = false;
            for (var j = 0; j < targetParts.length; ++j) {
                splits = sourceLine.split(targetParts[j], options);
                if (splits) {
                    if (mutual) {
                        sourceLines = splits[0];
                        for (var k = 0, klen = sourceLines.length; k < klen; ++k) {
                            if (k === 0 && sourceParts.length) {
                                sourceParts[sourceParts.length - 1].addComponent(
                                    sourceLines[k]
                                );
                            } else {
                                sourceParts.push(
                                    new MultiLineString([
                                        sourceLines[k]
                                    ])
                                );
                            }
                        }
                        sourceSplit = true;
                        splits = splits[1];
                    }
                    if (splits.length) {
                        // splice in new target parts
                        splits.unshift(j, 1);
                        Array.prototype.splice.apply(targetParts, splits);
                        break;
                    }
                }
            }
            if (!sourceSplit) {
                // source line was not hit
                if (sourceParts.length) {
                    // add line to existing multi
                    sourceParts[sourceParts.length - 1].addComponent(
                        sourceLine.clone()
                    );
                } else {
                    // create a fresh multi
                    sourceParts = [
                        new MultiLineString(
                            sourceLine.clone()
                        )
                    ];
                }
            }
        }
        if (sourceParts && sourceParts.length > 1) {
            sourceSplit = true;
        } else {
            sourceParts = [];
        }
        if (targetParts && targetParts.length > 1) {
            targetSplit = true;
        } else {
            targetParts = [];
        }
        if (sourceSplit || targetSplit) {
            if (mutual) {
                results = [sourceParts, targetParts];
            } else {
                results = targetParts;
            }
        }
        return results;
    }


    /**
     * @function SuperMap.Geometry.MultiLineString.prototype.splitWith
     * @description Split this geometry (the target) with the given geometry (the source).
     * @param geometry - {SuperMap.Geometry} A geometry used to split this geometry (the source).
     * @param options - {Object} Properties of this object will be used to determine
     *     how the split is conducted.<br>
     *
     * Valid options:<br>
     * mutual - {Boolean} Split the source geometry in addition to the target
     *     geometry.  Default is false.<br>
     * edge - {Boolean} Allow splitting when only edges intersect.  Default is
     *     true.  If false, a vertex on the source must be within the tolerance
     *     distance of the intersection to be considered a split.<br>
     * tolerance - {Number} If a non-null value is provided, intersections
     *     within the tolerance distance of an existing vertex on the source
     *     will be assumed to occur at the vertex.
     *
     * @returns {Array} A list of geometries (of this same type as the target) that
     *     result from splitting the target with the source geometry.  The
     *     source and target geometry will remain unmodified.  If no split
     *     results, null will be returned.  If mutual is true and a split
     *     results, return will be an array of two arrays - the first will be
     *     all geometries that result from splitting the source geometry and
     *     the second will be all geometries that result from splitting the
     *     target geometry.
     */
    splitWith(geometry, options) {
        var results = null;
        var mutual = options && options.mutual;
        var splits, targetLine, sourceLines, sourceSplit, targetSplit, sourceParts, targetParts;
        if (geometry instanceof LineString) {
            targetParts = [];
            sourceParts = [geometry];
            for (var i = 0, len = this.components.length; i < len; ++i) {
                targetSplit = false;
                targetLine = this.components[i];
                for (var j = 0; j < sourceParts.length; ++j) {
                    splits = sourceParts[j].split(targetLine, options);
                    if (splits) {
                        if (mutual) {
                            sourceLines = splits[0];
                            if (sourceLines.length) {
                                // splice in new source parts
                                sourceLines.unshift(j, 1);
                                Array.prototype.splice.apply(sourceParts, sourceLines);
                                j += sourceLines.length - 2;
                            }
                            splits = splits[1];
                            if (splits.length === 0) {
                                splits = [targetLine.clone()];
                            }
                        }
                        for (var k = 0, klen = splits.length; k < klen; ++k) {
                            if (k === 0 && targetParts.length) {
                                targetParts[targetParts.length - 1].addComponent(
                                    splits[k]
                                );
                            } else {
                                targetParts.push(
                                    new MultiLineString([
                                        splits[k]
                                    ])
                                );
                            }
                        }
                        targetSplit = true;
                    }
                }
                if (!targetSplit) {
                    // target component was not hit
                    if (targetParts.length) {
                        // add it to any existing multi-line
                        targetParts[targetParts.length - 1].addComponent(
                            targetLine.clone()
                        );
                    } else {
                        // or start with a fresh multi-line
                        targetParts = [
                            new MultiLineString([
                                targetLine.clone()
                            ])
                        ];
                    }

                }
            }
        } else {
            results = geometry.split(this);
        }
        if (sourceParts && sourceParts.length > 1) {
            sourceSplit = true;
        } else {
            sourceParts = [];
        }
        if (targetParts && targetParts.length > 1) {
            targetSplit = true;
        } else {
            targetParts = [];
        }
        if (sourceSplit || targetSplit) {
            if (mutual) {
                results = [sourceParts, targetParts];
            } else {
                results = targetParts;
            }
        }
        return results;
    }


    CLASS_NAME = "SuperMap.Geometry.MultiLineString"
}
SuperMap.Geometry.MultiLineString = MultiLineString;