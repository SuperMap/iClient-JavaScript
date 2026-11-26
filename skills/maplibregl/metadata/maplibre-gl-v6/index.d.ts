import Point, { default as Point$1 } from "@mapbox/point-geometry";
import { mat2, mat4, vec3, vec4 } from "gl-matrix";
import { GeoJSONVTOptions } from "@maplibre/geojson-vt";
import { AllLayoutProperties, AllPaintProperties, Color, ColorArray, CompositeExpression, DiffCommand, Feature, FeatureFilter, FeatureState, FilterSpecification, FontFacesSpecification, Formatted, FormattedSection, GeoJSONSourceSpecification, GlobalProperties, ICanonicalTileID, IMercatorCoordinate, ImageSourceSpecification, InterpolationType, LayerSpecification, LightSpecification, MLFontFace, NumberArray, Padding, ProjectionSpecification, PromoteIdSpecification, PropertyValueSpecification, RasterDEMSourceSpecification, RasterSourceSpecification, ResolvedImage, SkySpecification, SourceExpression, SourceSpecification, SpriteSpecification, StateSpecification, StylePropertyExpression, StylePropertySpecification, StyleSpecification, TerrainSpecification, TransitionSpecification, ValidationError, VariableAnchorOffsetCollection, VectorSourceSpecification, VideoSourceSpecification, VisibilityExpression, VisibilitySpecification } from "@maplibre/maplibre-gl-style-spec";
import { VectorTileFeatureLike, VectorTileLayerLike } from "@maplibre/vt-pbf";
import TinySDF, { TinySDFOptions } from "@mapbox/tiny-sdf";
import KDBush from "kdbush";
export type * from "@maplibre/maplibre-gl-style-spec";
//#region src/util/ajax.d.ts
/**
 * A type used to store the tile's expiration date and cache control definition
 */
type ExpiryData = {
  cacheControl?: string | null;
  expires?: Date | string | null;
  etag?: string;
};
/**
 * A `RequestParameters` object to be returned from Map.options.transformRequest callbacks.
 * @example
 * ```ts
 * // use transformRequest to modify requests that begin with `http://myHost`
 * transformRequest: function(url, resourceType) {
 *  if (resourceType === 'Source' && url.indexOf('http://myHost') > -1) {
 *    return {
 *      url: url.replace('http', 'https'),
 *      headers: { 'my-custom-header': true },
 *      credentials: 'include'  // Include cookies for cross-origin requests
 *    }
 *   }
 * }
 * ```
 */
type RequestParameters = {
  /**
   * The URL to be requested.
   */
  url: string;
  /**
   * The headers to be sent with the request.
   */
  headers?: any;
  /**
   * Request method `'GET' | 'POST' | 'PUT'`.
   */
  method?: "GET" | "POST" | "PUT";
  /**
   * Request body.
   */
  body?: string;
  /**
   * Response body type to be returned.
   */
  type?: "string" | "json" | "arrayBuffer" | "image";
  /**
   * `'same-origin'|'include'` Use 'include' to send cookies with cross-origin requests.
   */
  credentials?: "same-origin" | "include";
  /**
   * If `true`, Resource Timing API information will be collected for these transformed requests and returned in a resourceTiming property of relevant data events.
   */
  collectResourceTiming?: boolean;
  /**
   * Parameters supported only by browser fetch API. Property of the Request interface contains the cache mode of the request. It controls how the request will interact with the browser's HTTP cache. (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)
   */
  cache?: RequestCache;
  /**
   * The referrer policy to use for the request. Controls how much referrer information is sent. (https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy)
   */
  referrerPolicy?: ReferrerPolicy;
};
/**
 * The response object returned from a successful AJAx request
 */
type GetResourceResponse<T> = ExpiryData & {
  data: T;
};
/**
 * An error thrown when a HTTP request results in an error response.
 */
export declare class AJAXError extends Error {
  /**
   * The response's HTTP status code.
   */
  status: number;
  /**
   * The response's HTTP status text.
   */
  statusText: string;
  /**
   * The request's URL.
   */
  url: string;
  /**
   * The response's body.
   */
  body: Blob;
  /**
   * @param status - The response's HTTP status code.
   * @param statusText - The response's HTTP status text.
   * @param url - The request's URL.
   * @param body - The response's body.
   */
  constructor(status: number, statusText: string, url: string, body: Blob);
}
//#endregion
//#region src/util/config.d.ts
/**
 * The `data` a protocol handler resolves with. Which member is expected follows `RequestParameters.type`:
 *
 * - `'arrayBuffer'`: an `ArrayBuffer`, for example a non-compressed pbf vector tile.
 * - `'json'`: the parsed JSON value.
 * - `'string'`: a string.
 * - `'image'`: an `ImageBitmap` or `HTMLImageElement`, used as is, or an `ArrayBuffer` of encoded image
 *   bytes, which are decoded first. A handler that already holds decoded pixels should return them as an
 *   `ImageBitmap`, since encoding them only makes the library decode them again.
 */
type AddProtocolResponseData = ArrayBuffer | ImageBitmap | HTMLImageElement | string | object;
/**
 * This method type is used to register a protocol handler.
 * Use the abort controller for aborting requests.
 * Return a promise with the relevant resource response, see {@link AddProtocolResponseData} for what `data` may hold.
 */
type AddProtocolAction = (requestParameters: RequestParameters, abortController: AbortController) => Promise<GetResourceResponse<AddProtocolResponseData>>;
/**
 * This is a global config object used to store the configuration
 * It is available in the workers as well.
 * Only serializable data should be stored in it.
 */
type Config = {
  MAX_PARALLEL_IMAGE_REQUESTS: number;
  MAX_PARALLEL_IMAGE_REQUESTS_PER_FRAME: number;
  MAX_TILE_CACHE_ZOOM_LEVELS: number;
  REGISTERED_PROTOCOLS: {
    [x: string]: AddProtocolAction;
  };
  WORKER_URL: string;
};
export declare const config: Config;
//#endregion
//#region src/util/web_worker_transfer.d.ts
/**
 * A class that is serialized to and json, that can be constructed back to the original class in the worker or in the main thread
 */
type SerializedObject<S extends Serialized = any> = {
  [_: string]: S;
};
/**
 * All the possible values that can be serialized and sent to and from the worker
 */
type Serialized = null | void | boolean | number | string | Boolean | Number | String | Date | RegExp | ArrayBuffer | ArrayBufferView | ImageData | ImageBitmap | Blob | Serialized[] | SerializedObject;
//#endregion
//#region src/util/throttled_invoker.d.ts
/**
 * Invokes the wrapped function in a non-blocking way when trigger() is called.
 * Invocation requests are ignored until the function was actually invoked.
 */
declare class ThrottledInvoker {
  _channel: MessageChannel | undefined;
  _triggered: boolean;
  _methodToThrottle: Function;
  constructor(methodToThrottle: Function);
  trigger(): void;
  remove(): void;
}
//#endregion
//#region src/util/struct_array.d.ts
/**
 * @internal
 * A view type size
 */
declare const viewTypes: {
  Int8: Int8ArrayConstructor;
  Uint8: Uint8ArrayConstructor;
  Int16: Int16ArrayConstructor;
  Uint16: Uint16ArrayConstructor;
  Int32: Int32ArrayConstructor;
  Uint32: Uint32ArrayConstructor;
  Float32: Float32ArrayConstructor;
};
/**
 * @internal
 * A view type size
 */
type ViewType = keyof typeof viewTypes;
/** @internal */
declare class Struct {
  _pos1: number;
  _pos2: number;
  _pos4: number;
  _pos8: number;
  readonly _structArray: StructArray;
  size: number;
  /**
   * @param structArray - The StructArray the struct is stored in
   * @param index - The index of the struct in the StructArray.
   */
  constructor(structArray: StructArray, index: number);
}
/**
 * @internal
 * A struct array member
 */
type StructArrayMember = {
  name: string;
  type: ViewType;
  components: number;
  offset: number;
};
/**
 * An array that can be deserialized
 */
type SerializedStructArray = {
  length: number;
  arrayBuffer: ArrayBuffer;
};
/**
 * @internal
 * `StructArray` provides an abstraction over `ArrayBuffer` and `TypedArray`
 * making it behave like an array of typed structs.
 *
 * Conceptually, a StructArray is comprised of elements, i.e., instances of its
 * associated struct type. Each particular struct type, together with an
 * alignment size, determines the memory layout of a StructArray whose elements
 * are of that type.  Thus, for each such layout that we need, we have
 * a corresponding StructArrayLayout class, inheriting from StructArray and
 * implementing `emplaceBack()` and `_refreshViews()`.
 *
 * In some cases, where we need to access particular elements of a StructArray,
 * we implement a more specific subclass that inherits from one of the
 * StructArrayLayouts and adds a `get(i): T` accessor that returns a structured
 * object whose properties are proxies into the underlying memory space for the
 * i-th element.  This affords the convenience of working with (seemingly) plain
 * Javascript objects without the overhead of serializing/deserializing them
 * into ArrayBuffers for efficient web worker transfer.
 */
declare abstract class StructArray {
  capacity: number;
  length: number;
  isTransferred: boolean;
  arrayBuffer: ArrayBuffer;
  uint8: Uint8Array;
  members: StructArrayMember[];
  bytesPerElement: number;
  abstract emplaceBack(...v: number[]): number;
  abstract emplace(i: number, ...v: number[]): number;
  constructor();
  /**
   * Serialize a StructArray instance.  Serializes both the raw data and the
   * metadata needed to reconstruct the StructArray base class during
   * deserialization.
   */
  static serialize(array: StructArray, transferables?: Transferable[]): SerializedStructArray;
  static deserialize<T extends StructArray>(this: {
    prototype: T;
  } & (new () => T), input: SerializedStructArray): T;
  /**
   * Resize the array to discard unused capacity.
   */
  _trim(): void;
  /**
   * Resets the length of the array to 0 without de-allocating capacity.
   */
  clear(): void;
  /**
   * Resize the array.
   * If `n` is greater than the current length then additional elements with undefined values are added.
   * If `n` is less than the current length then the array will be reduced to the first `n` elements.
   * @param n - The new size of the array.
   */
  resize(n: number): void;
  /**
   * Indicate a planned increase in size, so that any necessary allocation may
   * be done once, ahead of time.
   * @param n - The expected size of the array.
   */
  reserve(n: number): void;
  /**
   * Create TypedArray views for the current ArrayBuffer.
   */
  _refreshViews(): void;
  /**
   * Replace the buffer with an empty one so typed views release the original ArrayBuffer for GC.
   */
  freeBufferAfterUpload(): void;
}
//#endregion
//#region src/data/array_types.g.d.ts
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[2]
 *
 */
declare class StructArrayLayout2i4 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number): number;
  emplace(i: number, v0: number, v1: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[3]
 *
 */
declare class StructArrayLayout3i6 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[2]
 * [4] - Int16[4]
 *
 */
declare class StructArrayLayout2i4i12 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[2]
 * [4] - Uint8[4]
 * [8] - Int8[2]
 *
 */
declare class StructArrayLayout2i4ub2b10 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  int8: Int8Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Float32[2]
 *
 */
declare class StructArrayLayout2f8 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number): number;
  emplace(i: number, v0: number, v1: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[4]
 * [8] - Uint16[4]
 * [16] - Int16[4]
 * [24] - Float32[1]
 *
 */
declare class StructArrayLayout4i4ui4i1f28 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint16: Uint16Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Float32[3]
 *
 */
declare class StructArrayLayout3f12 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint32[1]
 *
 */
declare class StructArrayLayout1ul4 extends StructArray {
  uint8: Uint8Array;
  uint32: Uint32Array;
  _refreshViews(): void;
  emplaceBack(v0: number): number;
  emplace(i: number, v0: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[6]
 * [12] - Uint32[1]
 * [16] - Uint16[2]
 *
 */
declare class StructArrayLayout6i1ul2ui20 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint32: Uint32Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint8[2]
 * [4] - Float32[2]
 * [12] - Int16[2]
 *
 */
declare class StructArrayLayout2ub2f2i16 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint16[3]
 *
 */
declare class StructArrayLayout3ui6 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[2]
 * [4] - Uint16[2]
 * [8] - Uint32[3]
 * [20] - Uint16[3]
 * [28] - Float32[2]
 * [36] - Uint8[3]
 * [40] - Uint32[1]
 * [44] - Int16[1]
 * [48] - Float32[1]
 *
 */
declare class StructArrayLayout2i2ui3ul3ui2f3ub1ul1i1f52 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint16: Uint16Array;
  uint32: Uint32Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Int16[8]
 * [16] - Uint16[15]
 * [48] - Uint32[1]
 * [52] - Float32[2]
 * [60] - Uint16[2]
 * [64] - Float32[1]
 *
 */
declare class StructArrayLayout8i15ui1ul2f2ui1f68 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint16: Uint16Array;
  uint32: Uint32Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number, v28: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number, v28: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Float32[1]
 *
 */
declare class StructArrayLayout1f4 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number): number;
  emplace(i: number, v0: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint16[1]
 * [4] - Float32[2]
 *
 */
declare class StructArrayLayout1ui2f12 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint32[1]
 * [4] - Uint16[2]
 *
 */
declare class StructArrayLayout1ul2ui8 extends StructArray {
  uint8: Uint8Array;
  uint32: Uint32Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint16[2]
 *
 */
declare class StructArrayLayout2ui4 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number): number;
  emplace(i: number, v0: number, v1: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0] - Uint16[1]
 *
 */
declare class StructArrayLayout1ui2 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number): number;
  emplace(i: number, v0: number): number;
}
/** @internal */
declare class CollisionBoxStruct extends Struct {
  _structArray: CollisionBoxArray;
  get anchorPointX(): number;
  get anchorPointY(): number;
  get x1(): number;
  get y1(): number;
  get x2(): number;
  get y2(): number;
  get featureIndex(): number;
  get sourceLayerIndex(): number;
  get bucketIndex(): number;
  get anchorPoint(): Point$1;
}
/** @internal */
declare class CollisionBoxArray extends StructArrayLayout6i1ul2ui20 {
  /**
   * Return the CollisionBoxStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): CollisionBoxStruct;
}
/** @internal */
declare class PlacedSymbolStruct extends Struct {
  _structArray: PlacedSymbolArray;
  get anchorX(): number;
  get anchorY(): number;
  get glyphStartIndex(): number;
  get numGlyphs(): number;
  get vertexStartIndex(): number;
  get lineStartIndex(): number;
  get lineLength(): number;
  get segment(): number;
  get lowerSize(): number;
  get upperSize(): number;
  get lineOffsetX(): number;
  get lineOffsetY(): number;
  get writingMode(): number;
  get placedOrientation(): number;
  set placedOrientation(x: number);
  get hidden(): number;
  set hidden(x: number);
  get crossTileID(): number;
  set crossTileID(x: number);
  get associatedIconIndex(): number;
  get heightOffset(): number;
}
type PlacedSymbol = PlacedSymbolStruct;
/** @internal */
declare class PlacedSymbolArray extends StructArrayLayout2i2ui3ul3ui2f3ub1ul1i1f52 {
  /**
   * Return the PlacedSymbolStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): PlacedSymbolStruct;
}
/** @internal */
declare class SymbolInstanceStruct extends Struct {
  _structArray: SymbolInstanceArray;
  get anchorX(): number;
  get anchorY(): number;
  get rightJustifiedTextSymbolIndex(): number;
  get centerJustifiedTextSymbolIndex(): number;
  get leftJustifiedTextSymbolIndex(): number;
  get verticalPlacedTextSymbolIndex(): number;
  get placedIconSymbolIndex(): number;
  get verticalPlacedIconSymbolIndex(): number;
  get key(): number;
  get textBoxStartIndex(): number;
  get textBoxEndIndex(): number;
  get verticalTextBoxStartIndex(): number;
  get verticalTextBoxEndIndex(): number;
  get iconBoxStartIndex(): number;
  get iconBoxEndIndex(): number;
  get verticalIconBoxStartIndex(): number;
  get verticalIconBoxEndIndex(): number;
  get featureIndex(): number;
  get numHorizontalGlyphVertices(): number;
  get numVerticalGlyphVertices(): number;
  get numIconVertices(): number;
  get numVerticalIconVertices(): number;
  get useRuntimeCollisionCircles(): number;
  get crossTileID(): number;
  set crossTileID(x: number);
  get textBoxScale(): number;
  get collisionCircleDiameter(): number;
  get textAnchorOffsetStartIndex(): number;
  get textAnchorOffsetEndIndex(): number;
  get heightOffset(): number;
}
type SymbolInstance = SymbolInstanceStruct;
/** @internal */
declare class SymbolInstanceArray extends StructArrayLayout8i15ui1ul2f2ui1f68 {
  /**
   * Return the SymbolInstanceStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): SymbolInstanceStruct;
}
/** @internal */
declare class GlyphOffsetArray extends StructArrayLayout1f4 {
  getoffsetX(index: number): number;
}
/** @internal */
declare class SymbolLineVertexArray extends StructArrayLayout3i6 {
  getx(index: number): number;
  gety(index: number): number;
  gettileUnitDistanceFromAnchor(index: number): number;
}
/** @internal */
declare class TextAnchorOffsetStruct extends Struct {
  _structArray: TextAnchorOffsetArray;
  get textAnchor(): number;
  get textOffset0(): number;
  get textOffset1(): number;
}
type TextAnchorOffset = TextAnchorOffsetStruct;
/** @internal */
declare class TextAnchorOffsetArray extends StructArrayLayout1ui2f12 {
  /**
   * Return the TextAnchorOffsetStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): TextAnchorOffsetStruct;
}
/** @internal */
declare class FeatureIndexStruct extends Struct {
  _structArray: FeatureIndexArray;
  get featureIndex(): number;
  get sourceLayerIndex(): number;
  get bucketIndex(): number;
}
/** @internal */
declare class FeatureIndexArray extends StructArrayLayout1ul2ui8 {
  /**
   * Return the FeatureIndexStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): FeatureIndexStruct;
}
declare class PosArray extends StructArrayLayout2i4 {}
declare class Pos3dArray extends StructArrayLayout3i6 {}
declare class CircleLayoutArray extends StructArrayLayout2i4 {}
declare class FillLayoutArray extends StructArrayLayout2i4 {}
declare class FillExtrusionLayoutArray extends StructArrayLayout2i4i12 {}
declare class LineLayoutArray extends StructArrayLayout2i4ub2b10 {}
declare class LineExtLayoutArray extends StructArrayLayout2f8 {}
declare class SymbolLayoutArray extends StructArrayLayout4i4ui4i1f28 {}
declare class SymbolDynamicLayoutArray extends StructArrayLayout3f12 {}
declare class SymbolOpacityArray extends StructArrayLayout1ul4 {}
declare class CollisionVertexArray extends StructArrayLayout2ub2f2i16 {}
declare class TriangleIndexArray extends StructArrayLayout3ui6 {}
declare class LineIndexArray extends StructArrayLayout2ui4 {}
declare class LineStripIndexArray extends StructArrayLayout1ui2 {}
//#endregion
//#region src/geo/lng_lat.d.ts
/**
 * A {@link LngLat} object, an array of two numbers representing longitude and latitude,
 * or an object with `lng` and `lat` or `lon` and `lat` properties.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let v1 = new LngLat(-122.420679, 37.772537);
 * let v2 = [-122.420679, 37.772537];
 * let v3 = {lon: -122.420679, lat: 37.772537};
 * ```
 */
type LngLatLike = LngLat | {
  lng: number;
  lat: number;
} | {
  lon: number;
  lat: number;
} | [number, number];
/**
 * A `LngLat` object represents a given longitude and latitude coordinate, measured in degrees.
 * These coordinates are based on the [WGS84 (EPSG:4326) standard](https://en.wikipedia.org/wiki/World_Geodetic_System#WGS84).
 *
 * MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match the
 * [GeoJSON specification](https://tools.ietf.org/html/rfc7946).
 *
 * Note that any MapLibre GL JS method that accepts a `LngLat` object as an argument or option
 * can also accept an `Array` of two numbers and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatLike}.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let ll = new LngLat(-123.9749, 40.7736);
 * ll.lng; // = -123.9749
 * ```
 * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
 */
export declare class LngLat {
  /**
   * Longitude, measured in degrees.
   */
  lng: number;
  /**
   * Latitude, measured in degrees.
   */
  lat: number;
  /**
   * @param lng - Longitude, measured in degrees.
   * @param lat - Latitude, measured in degrees.
   */
  constructor(lng: number, lat: number);
  /**
   * Returns a new `LngLat` object whose longitude is wrapped to the range (-180, 180).
   *
   * @returns The wrapped `LngLat` object.
   * @example
   * ```ts
   * let ll = new LngLat(286.0251, 40.7736);
   * let wrapped = ll.wrap();
   * wrapped.lng; // = -73.9749
   * ```
   */
  wrap(): LngLat;
  /**
   * Returns the coordinates represented as an array of two numbers.
   *
   * @returns The coordinates represented as an array of longitude and latitude.
   * @example
   * ```ts
   * let ll = new LngLat(-73.9749, 40.7736);
   * ll.toArray(); // = [-73.9749, 40.7736]
   * ```
   */
  toArray(): [number, number];
  /**
   * Returns the coordinates represent as a string.
   *
   * @returns The coordinates represented as a string of the format `'LngLat(lng, lat)'`.
   * @example
   * ```ts
   * let ll = new LngLat(-73.9749, 40.7736);
   * ll.toString(); // = "LngLat(-73.9749, 40.7736)"
   * ```
   */
  toString(): string;
  /**
   * Returns the approximate distance between a pair of coordinates in meters
   * Uses the Haversine Formula (from R.W. Sinnott, "Virtues of the Haversine", Sky and Telescope, vol. 68, no. 2, 1984, p. 159)
   *
   * @param lngLat - coordinates to compute the distance to
   * @returns Distance in meters between the two coordinates.
   * @example
   * ```ts
   * let new_york = new LngLat(-74.0060, 40.7128);
   * let los_angeles = new LngLat(-118.2437, 34.0522);
   * new_york.distanceTo(los_angeles); // = 3935751.690893987, "true distance" using a non-spherical approximation is ~3966km
   * ```
   */
  distanceTo(lngLat: LngLat): number;
  /**
   * Converts an array of two numbers or an object with `lng` and `lat` or `lon` and `lat` properties
   * to a `LngLat` object.
   *
   * If a `LngLat` object is passed in, the function returns it unchanged.
   *
   * @param input - An array of two numbers or object to convert, or a `LngLat` object to return.
   * @returns A new `LngLat` object, if a conversion occurred, or the original `LngLat` object.
   * @example
   * ```ts
   * let arr = [-73.9749, 40.7736];
   * let ll = LngLat.convert(arr);
   * ll;   // = LngLat {lng: -73.9749, lat: 40.7736}
   * ```
   */
  static convert(input: LngLatLike): LngLat;
}
//#endregion
//#region src/geo/mercator_coordinate.d.ts
/**
 * A `MercatorCoordinate` object represents a projected three dimensional position.
 *
 * `MercatorCoordinate` uses the web mercator projection ([EPSG:3857](https://epsg.io/3857)) with slightly different units:
 *
 * - the size of 1 unit is the width of the projected world instead of the "mercator meter"
 * - the origin of the coordinate space is at the north-west corner instead of the middle
 *
 * For example, `MercatorCoordinate(0, 0, 0)` is the north-west corner of the mercator world and
 * `MercatorCoordinate(1, 1, 0)` is the south-east corner. If you are familiar with
 * [vector tiles](https://github.com/mapbox/vector-tile-spec) it may be helpful to think
 * of the coordinate space as the `0/0/0` tile with an extent of `1`.
 *
 * The `z` dimension of `MercatorCoordinate` is conformal. A cube in the mercator coordinate space would be rendered as a cube.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let nullIsland = new MercatorCoordinate(0.5, 0.5, 0);
 * ```
 * @see [Add a custom style layer](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-custom-style-layer/)
 * @see [Add 3D Tiles, 3D objects and models using Three.js](https://maplibre.org/maplibre-gl-js/docs/examples/add-3d-tiles-3d-objects-and-models-using-threejs/)
 * @see [Add a simple custom layer on a globe](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-simple-custom-layer-on-a-globe/)
 */
export declare class MercatorCoordinate implements IMercatorCoordinate {
  x: number;
  y: number;
  z: number;
  /**
   * @param x - The x component of the position.
   * @param y - The y component of the position.
   * @param z - The z component of the position.
   */
  constructor(x: number, y: number, z?: number);
  /**
   * Project a `LngLat` to a `MercatorCoordinate`.
   *
   * @param lngLatLike - The location to project.
   * @param altitude - The altitude in meters of the position.
   * @returns The projected mercator coordinate.
   * @example
   * ```ts
   * let coord = MercatorCoordinate.fromLngLat({ lng: 0, lat: 0}, 0);
   * coord; // MercatorCoordinate(0.5, 0.5, 0)
   * ```
   */
  static fromLngLat(lngLatLike: LngLatLike, altitude?: number): MercatorCoordinate;
  /**
   * Returns the `LngLat` for the coordinate.
   *
   * @returns The `LngLat` object.
   * @example
   * ```ts
   * let coord = new MercatorCoordinate(0.5, 0.5, 0);
   * let lngLat = coord.toLngLat(); // LngLat(0, 0)
   * ```
   */
  toLngLat(): LngLat;
  /**
   * Returns the altitude in meters of the coordinate.
   *
   * @returns The altitude in meters.
   * @example
   * ```ts
   * let coord = new MercatorCoordinate(0, 0, 0.02);
   * coord.toAltitude(); // 6914.281956295339
   * ```
   */
  toAltitude(): number;
  /**
   * Returns the distance of 1 meter in `MercatorCoordinate` units at this latitude.
   *
   * For coordinates in real world units using meters, this naturally provides the scale
   * to transform into `MercatorCoordinate`s.
   *
   * @returns Distance of 1 meter in `MercatorCoordinate` units.
   */
  meterInMercatorCoordinateUnits(): number;
}
//#endregion
//#region src/tile/tile_id.d.ts
/**
 * A canonical way to define a tile ID
 */
declare class CanonicalTileID implements ICanonicalTileID {
  z: number;
  x: number;
  y: number;
  key: string;
  constructor(z: number, x: number, y: number);
  equals(id: ICanonicalTileID): boolean;
  /**
   * given a list of urls, choose a url template and return a tile URL
   */
  url(urls: string[], pixelRatio: number, scheme?: string | null): string;
  isChildOf(parent: ICanonicalTileID): boolean;
  getTilePoint(coord: IMercatorCoordinate): Point$1;
  toString(): string;
}
/**
 * @internal
 * An unwrapped tile identifier
 */
declare class UnwrappedTileID {
  wrap: number;
  canonical: CanonicalTileID;
  key: string;
  constructor(wrap: number, canonical: CanonicalTileID);
}
/**
 * An overscaled tile identifier
 */
declare class OverscaledTileID {
  overscaledZ: number;
  wrap: number;
  canonical: CanonicalTileID;
  key: string;
  /**
   * This matrix is used during terrain's render-to-texture stage only.
   * If the render-to-texture stage is active, this matrix will be present
   * and should be used, otherwise this matrix will be null.
   * The matrix should be float32 in order to avoid slow WebGL calls in Chrome.
   */
  terrainRttPosMatrix32f: Mat4f32 | null;
  constructor(overscaledZ: number, wrap: number, z: number, x: number, y: number);
  clone(): OverscaledTileID;
  equals(id: OverscaledTileID): boolean;
  /**
   * Returns a new `OverscaledTileID` representing the tile at the target zoom level.
   * When targetZ is greater than the current canonical z, the canonical coordinates are unchanged.
   * When targetZ is less than the current canonical z, the canonical coordinates are updated.
   * @param targetZ - the zoom level to scale to. Must be less than or equal to this.overscaledZ
   * @returns a new OverscaledTileID representing the tile at the target zoom level
   * @throws if targetZ is greater than this.overscaledZ
   */
  scaledTo(targetZ: number): OverscaledTileID;
  isOverscaled(): boolean;
  calculateScaledKey(targetZ: number, withWrap: boolean): string;
  isChildOf(parent: OverscaledTileID): boolean;
  children(sourceMaxZoom: number): OverscaledTileID[];
  isLessThan(rhs: OverscaledTileID): boolean;
  wrapped(): OverscaledTileID;
  unwrapTo(wrap: number): OverscaledTileID;
  overscaleFactor(): number;
  toUnwrapped(): UnwrappedTileID;
  toString(): string;
  getTilePoint(coord: MercatorCoordinate): Point$1;
  /**
   * Maps tile-local coordinates that may fall outside the `[0, extent)` range
   * to the correct neighbor tile and the corresponding in-tile position.
   *
   * Coordinates can exceed tile bounds when geometry (e.g. symbol labels along
   * lines) extends across tile edges. This method resolves such coordinates to
   * the appropriate adjacent tile, wrapping horizontally across world boundaries
   * and returning `null` when the target falls beyond the polar tile-grid limits.
   *
   * When the coordinates are already in bounds, the original tile ID is returned.
   *
   * @param x - x coordinate relative to this tile, may be outside `[0, extent)`
   * @param y - y coordinate relative to this tile, may be outside `[0, extent)`
   * @param extent - tile coordinate extent, default {@link EXTENT}
   * @returns the resolved tile ID and in-tile coordinates, or `null` if the
   *          target is beyond the tile grid (e.g. past the poles)
   */
  normalizeCoordinates(x: number, y: number, extent?: number): {
    tileID: OverscaledTileID;
    x: number;
    y: number;
  } | null;
}
//#endregion
//#region src/util/evented.d.ts
/**
 * A listener method used as a callback to events
 */
type Listener<E extends Event$1 = Event$1> = (event: E) => any;
/**
 * A mapping between event names and the event each of them carries.
 */
type EventTypeMap = Record<string, Event$1>;
/**
 * The event names of an {@link EventTypeMap}.
 */
type EventNames<EventType extends EventTypeMap> = Extract<keyof EventType, string>;
/**
 * Properties merged into every event bubbled up to an evented parent.
 */
type EventedParentData = Record<string, unknown>;
type Listeners<EventType extends EventTypeMap> = { [K in keyof EventType]?: Array<Listener<EventType[K]>>; };
/**
 * The event class
 */
declare class Event$1<TType extends string = string> {
  readonly type: TType;
  /**
   * The object that fired the event. Set when the event is fired, and narrowed to a more
   * specific type (e.g. `Map`, `Marker`) by the event subclasses.
   */
  target?: unknown;
  constructor(type: TType, data?: object);
}
type ErrorLike = {
  message: string;
};
/**
 * An error event
 */
export declare class ErrorEvent extends Event$1<"error"> {
  error: ErrorLike;
  constructor(error: ErrorLike, data?: object);
}
/**
 * The event map of an {@link Evented} that only reports errors.
 */
type ErrorEventType = {
  error: ErrorEvent;
};
/**
 * Methods mixed in to other classes for event capabilities.
 *
 * @group Event Related
 */
export declare abstract class Evented<EventType extends EventTypeMap = EventTypeMap> {
  _listeners?: Listeners<EventType>;
  _oneTimeListeners?: Listeners<EventType>;
  _eventedParent?: Evented;
  _eventedParentData?: EventedParentData | (() => EventedParentData);
  /**
   * Adds a listener to a specified event type.
   *
   * @param type - The event type to add a listen for.
   * @param listener - The function to be called when the event is fired.
   * The listener function is called with the data object passed to `fire`,
   * extended with `target` and `type` properties.
   */
  on<T extends EventNames<EventType>>(type: T, listener: (event: EventType[T]) => void): Subscription;
  /**
   * Removes a previously registered event listener.
   *
   * @param type - The event type to remove listeners for.
   * @param listener - The listener function to remove.
   */
  off<T extends EventNames<EventType>>(type: T, listener: (event: EventType[T]) => void): this;
  /**
   * Adds a listener that will be called only once to a specified event type.
   *
   * The listener will be called first time the event fires after the listener is registered.
   *
   * @param type - The event type to listen for.
   * @returns a promise that resolves with the event
   */
  once<T extends EventNames<EventType>>(type: T): Promise<EventType[T]>;
  /**
   * Adds a listener that will be called only once to a specified event type.
   *
   * The listener will be called first time the event fires after the listener is registered.
   *
   * @param type - The event type to listen for.
   * @param listener - The function to be called when the event is fired the first time.
   * @returns `this` when a listener is provided
   */
  once<T extends EventNames<EventType>>(type: T, listener: (event: EventType[T]) => void): this;
  /**
   * Calls every listener registered for the event's type.
   */
  fire(event: EventType[EventNames<EventType>]): this;
  /**
   * Compatibility with the (type: string, properties: Object) signature from previous versions.
   * See https://github.com/mapbox/mapbox-gl-js/issues/6522,
   *     https://github.com/mapbox/mapbox-gl-draw/issues/766
   */
  fire(type: EventNames<EventType>, properties?: object): this;
  /**
   * Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
   *
   * @param type - The event type
   * @returns `true` if there is at least one registered listener for specified event type, `false` otherwise
   */
  listens(type: EventNames<EventType>): boolean;
  /**
   * Bubble all events fired by this instance of Evented to this parent instance of Evented.
   */
  setEventedParent(parent?: Evented | null, data?: EventedParentData | (() => EventedParentData)): this;
}
//#endregion
//#region src/util/vectortile_to_geojson.d.ts
/**
 * A helper for type to omit a property from a type
 */
type DistributiveKeys<T> = T extends T ? keyof T : never;
/**
 * A helper for type to omit a property from a type
 */
type DistributiveOmit<T, K extends DistributiveKeys<T>> = T extends unknown ? Omit<T, K> : never;
/**
 * An extended geojson feature used by the events to return data to the listener
 */
type MapGeoJSONFeature = GeoJSONFeature & {
  layer: DistributiveOmit<LayerSpecification, "source"> & {
    source: string;
  };
  source: string;
  sourceLayer?: string;
  state: {
    [key: string]: any;
  };
};
/**
 * A geojson feature
 */
declare class GeoJSONFeature {
  type: "Feature";
  _geometry: GeoJSON.Geometry;
  properties: {
    [name: string]: any;
  };
  id: number | string | undefined;
  _x: number;
  _y: number;
  _z: number;
  _vectorTileFeature: VectorTileFeatureLike;
  constructor(vectorTileFeature: VectorTileFeatureLike, z: number, x: number, y: number, id: string | number | undefined);
  private projectPoint;
  private projectLine;
  get geometry(): GeoJSON.Geometry;
  set geometry(g: GeoJSON.Geometry);
  toJSON(): GeoJSON.Feature;
}
//#endregion
//#region src/util/update_queue.d.ts
/**
 * The functions an {@link UpdateQueue} calls for each update.
 */
type UpdateQueueHandlers<T, R> = {
  /**
   * Sends an update. The next one is not sent before the returned promise settles.
   */
  send: (update: T) => Promise<R>;
  /**
   * Called with the result of an update, once it is no longer being sent.
   * `replaced` is whether {@link UpdateQueue#replace} was called while the update was being sent, in which case
   * the result describes a state that has since been replaced.
   */
  onResult: (update: T, result: R, replaced: boolean) => void;
  /**
   * Called when sending an update, or handling its result, failed.
   */
  onError: (update: T, error: unknown) => void;
};
/**
 * Sends updates one at a time, in the order they were queued.
 * An update that is still waiting can be changed in place, through {@link UpdateQueue#top}, until it is sent.
 */
declare class UpdateQueue<T, R> {
  private readonly _handlers;
  private _waiting;
  private _sending;
  /**
   * Whether {@link UpdateQueue#replace} was called since the update being sent was sent.
   */
  private _replacedWhileSending;
  /**
   * What every {@link UpdateQueue#flush} call returns until the queue is idle again.
   * It is created by the first flush after the queue was idle, shared by the flushes that follow,
   * and resolved and cleared once no update is left, so it is only set while a flush is in progress.
   */
  private _flushing;
  constructor(handlers: UpdateQueueHandlers<T, R>);
  /**
   * Whether no update is being sent or waiting to be.
   */
  isIdle(): boolean;
  /**
   * The update queued last, if it is still waiting to be sent.
   * The update being sent is not waiting, so it is never returned.
   */
  top(): T | undefined;
  /**
   * Whether any waiting update matches the predicate. The update being sent is not waiting, so it is never tested.
   */
  some(predicate: (update: T) => boolean): boolean;
  /**
   * Queues an update without sending it.
   */
  enqueue(update: T): void;
  /**
   * Drops the waiting updates and queues this one instead.
   */
  replace(update: T): void;
  /**
   * Drops the waiting updates. The update being sent, if any, still runs to its end.
   */
  clear(): void;
  /**
   * Sends the waiting updates.
   * @returns a promise that resolves once no update is being sent or waiting to be.
   */
  flush(): Promise<void>;
  private _next;
  /**
   * Sends one update and hands its result, or the error that sending or handling it raised, to the handlers.
   *
   * The update stops counting as being sent once, before either handler runs, so that an update a handler
   * starts is still counted as being sent when that handler throws.
   */
  private _send;
}
//#endregion
//#region src/geo/lng_lat_bounds.d.ts
/**
 * A {@link LngLatBounds} object, an array of {@link LngLatLike} objects in `[sw, ne]` order,
 * or an array of numbers in `[west, south, east, north]` order.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let v1 = new LngLatBounds(
 *   new LngLat(-73.9876, 40.7661),
 *   new LngLat(-73.9397, 40.8002)
 * );
 * let v2 = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002])
 * let v3 = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
 * ```
 */
type LngLatBoundsLike = LngLatBounds | [LngLatLike, LngLatLike] | [number, number, number, number];
/**
 * A `LngLatBounds` object represents a geographical bounding box,
 * defined by its southwest and northeast points in longitude and latitude.
 *
 * If no arguments are provided to the constructor, a `null` bounding box is created.
 *
 * Note that any MapLibre GL method that accepts a `LngLatBounds` object as an argument or option
 * can also accept an `Array` of two {@link LngLatLike} constructs and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatBoundsLike}.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let sw = new LngLat(-73.9876, 40.7661);
 * let ne = new LngLat(-73.9397, 40.8002);
 * let llb = new LngLatBounds(sw, ne);
 * ```
 * @see [Fit to the bounds of a LineString](https://maplibre.org/maplibre-gl-js/docs/examples/fit-to-the-bounds-of-a-linestring/)
 */
export declare class LngLatBounds {
  _ne: LngLat;
  _sw: LngLat;
  /**
   * @param sw - The southwest corner of the bounding box.
   * OR array of 4 numbers in the order of  west, south, east, north
   * OR array of 2 LngLatLike: `[sw, ne]`
   * @param ne - The northeast corner of the bounding box.
   * @example
   * ```ts
   * let sw = new LngLat(-73.9876, 40.7661);
   * let ne = new LngLat(-73.9397, 40.8002);
   * let llb = new LngLatBounds(sw, ne);
   * ```
   * OR
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661, -73.9397, 40.8002]);
   * ```
   * OR
   * ```ts
   * let llb = new LngLatBounds([sw, ne]);
   * ```
   */
  constructor(sw?: LngLatLike | [number, number, number, number] | [LngLatLike, LngLatLike], ne?: LngLatLike);
  /**
   * Set the northeast corner of the bounding box
   *
   * @param ne - a {@link LngLatLike} object describing the northeast corner of the bounding box.
   */
  setNorthEast(ne: LngLatLike): this;
  /**
   * Set the southwest corner of the bounding box
   *
   * @param sw - a {@link LngLatLike} object describing the southwest corner of the bounding box.
   */
  setSouthWest(sw: LngLatLike): this;
  /**
   * Extend the bounds to include a given LngLatLike or LngLatBoundsLike.
   *
   * @param obj - object to extend to
   */
  extend(obj: LngLatLike | LngLatBoundsLike): this;
  /**
   * Returns the geographical coordinate equidistant from the bounding box's corners.
   *
   * @returns The bounding box's center.
   * @example
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.getCenter(); // = LngLat {lng: -73.96365, lat: 40.78315}
   * ```
   */
  getCenter(): LngLat;
  /**
   * Returns the southwest corner of the bounding box.
   *
   * @returns The southwest corner of the bounding box.
   */
  getSouthWest(): LngLat;
  /**
   * Returns the northeast corner of the bounding box.
   *
   * @returns The northeast corner of the bounding box.
   */
  getNorthEast(): LngLat;
  /**
   * Returns the northwest corner of the bounding box.
   *
   * @returns The northwest corner of the bounding box.
   */
  getNorthWest(): LngLat;
  /**
   * Returns the southeast corner of the bounding box.
   *
   * @returns The southeast corner of the bounding box.
   */
  getSouthEast(): LngLat;
  /**
   * Returns the west edge of the bounding box.
   *
   * @returns The west edge of the bounding box.
   */
  getWest(): number;
  /**
   * Returns the south edge of the bounding box.
   *
   * @returns The south edge of the bounding box.
   */
  getSouth(): number;
  /**
   * Returns the east edge of the bounding box.
   *
   * @returns The east edge of the bounding box.
   */
  getEast(): number;
  /**
   * Returns the north edge of the bounding box.
   *
   * @returns The north edge of the bounding box.
   */
  getNorth(): number;
  /**
   * Returns the bounding box represented as an array.
   *
   * @returns The bounding box represented as an array, consisting of the
   * southwest and northeast coordinates of the bounding represented as arrays of numbers.
   * @example
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.toArray(); // = [[-73.9876, 40.7661], [-73.9397, 40.8002]]
   * ```
   */
  toArray(): [[number, number], [number, number]];
  /**
   * Return the bounding box represented as a string.
   *
   * @returns The bounding box represents as a string of the format
   * `'LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))'`.
   * @example
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.toString(); // = "LngLatBounds(LngLat(-73.9876, 40.7661), LngLat(-73.9397, 40.8002))"
   * ```
   */
  toString(): string;
  /**
   * Check if the bounding box is an empty/`null`-type box.
   *
   * @returns True if bounds have been defined, otherwise false.
   */
  isEmpty(): boolean;
  /**
   * Check if the point is within the bounding box.
   *
   * @param lnglat - geographic point to check against.
   * @returns `true` if the point is within the bounding box.
   * @example
   * ```ts
   * let llb = new LngLatBounds(
   *   new LngLat(-73.9876, 40.7661),
   *   new LngLat(-73.9397, 40.8002)
   * );
   *
   * let ll = new LngLat(-73.9567, 40.7789);
   *
   * console.log(llb.contains(ll)); // = true
   * ```
   */
  contains(lnglat: LngLatLike): boolean;
  /**
   * Checks if this bounding box intersects with another bounding box.
   *
   * Returns true if the bounding boxes share any area, including cases where
   * they only touch along an edge or at a corner.
   *
   * This method properly handles cases where either or both bounding boxes cross
   * the antimeridian (date line).
   */
  intersects(other: LngLatBoundsLike): boolean;
  /**
   * Converts an array to a `LngLatBounds` object.
   *
   * If a `LngLatBounds` object is passed in, the function returns it unchanged.
   *
   * Internally, the function calls {@link LngLat.convert} to convert arrays to `LngLat` values.
   *
   * @param input - An array of two coordinates to convert, or a `LngLatBounds` object to return.
   * @returns A new `LngLatBounds` object, if a conversion occurred, or the original `LngLatBounds` object.
   * @example
   * ```ts
   * let arr = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
   * let llb = LngLatBounds.convert(arr); // = LngLatBounds {_sw: LngLat {lng: -73.9876, lat: 40.7661}, _ne: LngLat {lng: -73.9397, lat: 40.8002}}
   * ```
   */
  static convert(input: LngLatBoundsLike | null): LngLatBounds;
  /**
   * Returns a `LngLatBounds` from the coordinates extended by a given `radius`. The returned `LngLatBounds` completely contains the `radius`.
   *
   * @param center - center coordinates of the new bounds.
   * @param radius - Distance in meters from the coordinates to extend the bounds.
   * @returns A new `LngLatBounds` object representing the coordinates extended by the `radius`.
   * @example
   * ```ts
   * let center = new LngLat(-73.9749, 40.7736);
   * LngLatBounds.fromLngLat(100).toArray(); // = [[-73.97501862141328, 40.77351016847229], [-73.97478137858673, 40.77368983152771]]
   * ```
   */
  static fromLngLat(center: LngLat, radius?: number): LngLatBounds;
  /**
   * Adjusts the given bounds to handle the case where the bounds cross the 180th meridian (antimeridian).
   *
   * @returns The adjusted LngLatBounds
   * @example
   * ```ts
   * let bounds = new LngLatBounds([175.813127, -20.157768], [-178. 340903, -15.449124]);
   * let adjustedBounds = bounds.adjustAntiMeridian();
   * // adjustedBounds will be: [[175.813127, -20.157768], [181.659097, -15.449124]]
   * ```
   */
  adjustAntiMeridian(): LngLatBounds;
}
//#endregion
//#region src/util/primitives/bounding_volume.d.ts
declare const enum IntersectionResult {
  None = 0,
  Partial = 1,
  Full = 2
}
interface IBoundingVolume {
  /**
   * Performs an intersection test with a frustum.
   */
  intersectsFrustum(frustum: Frustum): IntersectionResult;
  /**
   * Performs an intersection test with a half-space defined by a plane equation.
   * The half-space is assumed to lie on the positive side of the plane.
   */
  intersectsPlane(plane: vec4): IntersectionResult;
}
//#endregion
//#region src/util/primitives/aabb.d.ts
declare class Aabb implements IBoundingVolume {
  min: vec3;
  max: vec3;
  center: vec3;
  constructor(min_: vec3, max_: vec3);
  quadrant(index: number): Aabb;
  distanceX(point: number[]): number;
  distanceY(point: number[]): number;
  /**
   * Performs a frustum-aabb intersection test.
   */
  intersectsFrustum(frustum: Frustum): IntersectionResult;
  /**
   * Performs a halfspace-aabb intersection test.
   */
  intersectsPlane(plane: vec4): IntersectionResult;
}
//#endregion
//#region src/util/primitives/frustum.d.ts
declare class Frustum {
  points: vec4[];
  planes: vec4[];
  aabb: Aabb;
  constructor(points: vec4[], planes: vec4[], aabb: Aabb);
  static fromInvProjectionMatrix(invProj: mat4, worldSize?: number, zoom?: number, horizonPlane?: vec4, flippedNearFar?: boolean): Frustum;
}
//#endregion
//#region src/webgl/index_buffer.d.ts
/**
 * @internal
 * an index buffer class
 */
declare class IndexBuffer {
  context: Context;
  buffer: WebGLBuffer;
  dynamicDraw: boolean;
  constructor(context: Context, array: TriangleIndexArray | LineIndexArray | LineStripIndexArray, dynamicDraw?: boolean);
  bind(): void;
  updateData(array: StructArray): void;
  destroy(): void;
}
//#endregion
//#region src/shaders/shaders.d.ts
type PreparedShader = {
  fragmentSource: string;
  vertexSource: string;
  staticAttributes: string[];
  staticUniforms: string[];
};
//#endregion
//#region src/webgl/uniform_binding.d.ts
type $ObjMap<T extends {}, F extends (v: any) => any> = { [K in keyof T]: F extends ((v: T[K]) => infer R) ? R : never; };
type UniformValues<Us extends {}> = $ObjMap<Us, <V>(u: Uniform<V>) => V>;
type UniformLocations = {
  [_: string]: WebGLUniformLocation;
};
/**
 * @internal
 * A base uniform abstract class
 */
declare abstract class Uniform<T> {
  gl: WebGL2RenderingContext;
  location: WebGLUniformLocation;
  current: T;
  constructor(context: Context, location: WebGLUniformLocation);
  abstract set(v: T): void;
}
declare class Uniform1i extends Uniform<number> {
  constructor(context: Context, location: WebGLUniformLocation);
  set(v: number): void;
}
/**
 * @internal
 * A uniform bindings
 */
type UniformBindings = {
  [_: string]: Uniform<any>;
};
//#endregion
//#region src/style/zoom_history.d.ts
declare class ZoomHistory {
  lastZoom: number;
  lastFloorZoom: number;
  lastIntegerZoom: number;
  lastIntegerZoomTime: number;
  first: boolean;
  constructor();
  update(z: number, now: number): boolean;
}
//#endregion
//#region src/style/evaluation_parameters.d.ts
type CrossfadeParameters = {
  fromScale: number;
  toScale: number;
  t: number;
};
/**
 * @internal
 * A parameter that can be evaluated to a value.
 * It's main purpose is a parameter to expression `evaluate` methods.
 */
declare class EvaluationParameters implements GlobalProperties {
  zoom: number;
  now: number;
  fadeDuration: number;
  zoomHistory: ZoomHistory;
  transition: TransitionSpecification;
  constructor(zoom: number, options?: any);
  crossFadingFactor(): number;
  getCrossfadeParameters(): CrossfadeParameters;
}
//#endregion
//#region src/style/properties.d.ts
type TimePoint = number;
/**
 * A from-to type
 */
type CrossFaded<T> = {
  to: T;
  from: T;
};
/**
 * @internal
 *  Implementations of the `Property` interface:
 *
 *  * Hold metadata about a property that's independent of any specific value: stuff like the type of the value,
 *    the default value, etc. This comes from the style specification JSON.
 *  * Define behavior that needs to be polymorphic across different properties: "possibly evaluating"
 *    an input value (see below), and interpolating between two possibly-evaluted values.
 *
 *  The type `T` is the fully-evaluated value type (e.g. `number`, `string`, `Color`).
 *  The type `R` is the intermediate "possibly evaluated" value type. See below.
 *
 *  There are two main implementations of the interface -- one for properties that allow data-driven values,
 *  and one for properties that don't. There are a few "special case" implementations as well: one for properties
 *  which cross-fade between two values rather than interpolating, one for `heatmap-color` and `line-gradient`,
 *  and one for `light-position`.
 */
interface Property<T, R> {
  specification: StylePropertySpecification;
  name: string;
  possiblyEvaluate(value: PropertyValue<T, R>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): R;
  interpolate(a: R, b: R, t: number): R;
}
/**
 * @internal
 *  `PropertyValue` represents the value part of a property key-value unit. It's used to represent both
 *  paint and layout property values, and regardless of whether or not their property supports data-driven
 *  expressions.
 *
 *  `PropertyValue` stores the raw input value as seen in a style or a runtime styling API call, i.e. one of the
 *  following:
 *
 *    * A constant value of the type appropriate for the property
 *    * A function which produces a value of that type (but functions are quasi-deprecated in favor of expressions)
 *    * An expression which produces a value of that type
 *    * "undefined"/"not present", in which case the property is assumed to take on its default value.
 *
 *  In addition to storing the original input value, `PropertyValue` also stores a normalized representation,
 *  effectively treating functions as if they are expressions, and constant or default values as if they are
 *  (constant) expressions.
 */
declare class PropertyValue<T, R> {
  property: Property<T, R>;
  value: PropertyValueSpecification<T> | void;
  expression: StylePropertyExpression;
  constructor(property: Property<T, R>, value: PropertyValueSpecification<T> | void, rootKey: string, globalState: Record<string, any>);
  isDataDriven(): boolean;
  getGlobalStateRefs(): Set<string>;
  /** Whether the expression reads one of the global state keys in `refs`. */
  readsGlobalState(refs: string[]): boolean;
  possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): R;
}
type TransitionParameters = {
  now: TimePoint;
  transition: TransitionSpecification;
};
/**
 * @internal
 * Paint properties are _transitionable_: they can change in a fluid manner, interpolating or cross-fading between
 * old and new value. The duration of the transition, and the delay before it begins, is configurable.
 *
 * `TransitionablePropertyValue` is a compositional class that stores both the property value and that transition
 * configuration.
 *
 * A `TransitionablePropertyValue` can calculate the next step in the evaluation chain for paint property values:
 * `TransitioningPropertyValue`.
 */
declare class TransitionablePropertyValue<T, R> {
  property: Property<T, R>;
  value: PropertyValue<T, R>;
  transition: TransitionSpecification | void;
  constructor(property: Property<T, R>, rootKey: string, globalState: Record<string, any>);
  /** The same `PropertyValue` means `setValue` was never called, so there is nothing to transition to. */
  transitioned(parameters: TransitionParameters, prior: TransitioningPropertyValue<T, R>): TransitioningPropertyValue<T, R>;
  untransitioned(): TransitioningPropertyValue<T, R>;
}
/**
 * @internal
 * `Transitionable` stores a map of all (property name, `TransitionablePropertyValue`) pairs for paint properties of a
 * given layer type. It can calculate the `TransitioningPropertyValue`s for all of them at once, producing a
 * `Transitioning` instance for the same set of properties.
 */
declare class Transitionable<Props> {
  _properties: Properties<Props>;
  _values: { [K in keyof Props]: TransitionablePropertyValue<any, unknown>; };
  private _globalState;
  private _rootKey;
  constructor(properties: Properties<Props>, rootKey: string, globalState: Record<string, any>);
  /** rootKey of a property, e.g. `layers[3].paint.line-color`. */
  private _propertyRootKey;
  hasProperty(name: string): boolean;
  getValue<S extends keyof Props, T>(name: S): PropertyValueSpecification<T> | void;
  setValue<S extends keyof Props, T>(name: S, value: PropertyValueSpecification<T> | void): void;
  /** Applies a whole spec, skipping the values we already hold so they do not transition. */
  setValues(values: {
    [name: string]: unknown;
  }): void;
  getTransition<S extends keyof Props>(name: S): TransitionSpecification | void;
  setTransition<S extends keyof Props>(name: S, value: TransitionSpecification | void): void;
  /** Keeps the transitions running in `transitioning` on `priorGlobalState` where they read one of `refs` live. */
  retainPriorGlobalState(refs: string[], priorGlobalState: Record<string, any>, transitioning: Transitioning<Props>): void;
  /** Reads every value that reads one of `refs` again and transitions it from what `transitioning` shows. */
  applyGlobalStateChange(refs: string[], priorGlobalState: Record<string, any>, transitioning: Transitioning<Props>, parameters: TransitionParameters): Transitioning<Props>;
  serialize(): any;
  transitioned(parameters: TransitionParameters, prior: Transitioning<Props>): Transitioning<Props>;
  untransitioned(): Transitioning<Props>;
}
/**
 * @internal
 * `TransitioningPropertyValue` implements the first of two intermediate steps in the evaluation chain of a paint
 * property value. In this step, transitions between old and new values are handled: as long as the transition is in
 * progress, `TransitioningPropertyValue` maintains a reference to the prior value, and interpolates between it and
 * the new value based on the current time and the configured transition duration and delay. The product is the next
 * step in the evaluation chain: the "possibly evaluated" result type `R`. See below for more on this concept.
 */
declare class TransitioningPropertyValue<T, R> {
  property: Property<T, R>;
  value: PropertyValue<T, R>;
  prior: TransitioningPropertyValue<T, R>;
  begin: TimePoint;
  end: TimePoint;
  constructor(property: Property<T, R>, value: PropertyValue<T, R>, prior: TransitioningPropertyValue<T, R>, transition: TransitionSpecification, now: TimePoint);
  possiblyEvaluate(parameters: EvaluationParameters, canonical: CanonicalTileID, availableImages: string[]): R;
}
/**
 * @internal
 * `Transitioning` stores a map of all (property name, `TransitioningPropertyValue`) pairs for paint properties of a
 * given layer type. It can calculate the possibly-evaluated values for all of them at once, producing a
 * `PossiblyEvaluated` instance for the same set of properties.
 */
declare class Transitioning<Props> {
  _properties: Properties<Props>;
  _values: { [K in keyof Props]: PossiblyEvaluatedPropertyValue<unknown>; };
  constructor(properties: Properties<Props>);
  possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): PossiblyEvaluated<Props, any>;
  hasTransition(): boolean;
}
/**
 * Because layout properties are not transitionable, they have a simpler representation and evaluation chain than
 * paint properties: `PropertyValue`s are possibly evaluated, producing possibly evaluated values, which are then
 * fully evaluated.
 *
 * `Layout` stores a map of all (property name, `PropertyValue`) pairs for layout properties of a
 * given layer type. It can calculate the possibly-evaluated values for all of them at once, producing a
 * `PossiblyEvaluated` instance for the same set of properties.
 */
declare class Layout<Props> {
  _properties: Properties<Props>;
  _values: { [K in keyof Props]: PropertyValue<any, PossiblyEvaluatedPropertyValue<any>>; };
  private _globalState;
  private _rootKey;
  constructor(properties: Properties<Props>, rootKey: string, globalState: Record<string, any>);
  /** rootKey of a property, e.g. `layers[3].layout.line-cap`. */
  private _propertyRootKey;
  hasValue<S extends keyof Props>(name: S): boolean;
  hasProperty(name: string): boolean;
  getValue<S extends keyof Props>(name: S): any;
  setValue<S extends keyof Props>(name: S, value: any): void;
  serialize(): any;
  possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): PossiblyEvaluated<Props, any>;
}
/**
 * "Possibly evaluated value" is an intermediate stage in the evaluation chain for both paint and layout property
 * values. The purpose of this stage is to optimize away unnecessary recalculations for data-driven properties. Code
 * which uses data-driven property values must assume that the value is dependent on feature data, and request that it
 * be evaluated for each feature. But when that property value is in fact a constant or camera function, the calculation
 * will not actually depend on the feature, and we can benefit from returning the prior result of having done the
 * evaluation once, ahead of time, in an intermediate step whose inputs are just the value and "global" parameters
 * such as current zoom level.
 *
 * `PossiblyEvaluatedValue` represents the three possible outcomes of this step: if the input value was a constant or
 * camera expression, then the "possibly evaluated" result is a constant value. Otherwise, the input value was either
 * a source or composite expression, and we must defer final evaluation until supplied a feature. We separate
 * the source and composite cases because they are handled differently when generating GL attributes, buffers, and
 * uniforms.
 *
 * Note that `PossiblyEvaluatedValue` (and `PossiblyEvaluatedPropertyValue`, below) are _not_ used for properties that
 * do not allow data-driven values. For such properties, we know that the "possibly evaluated" result is always a constant
 * scalar value. See below.
 */
type PossiblyEvaluatedValue<T> = {
  kind: "constant";
  value: T;
} | SourceExpression | CompositeExpression;
/**
 * @internal
 * `PossiblyEvaluatedPropertyValue` is used for data-driven paint and layout property values. It holds a
 * `PossiblyEvaluatedValue` and the `GlobalProperties` that were used to generate it. You're not allowed to supply
 * a different set of `GlobalProperties` when performing the final evaluation because they would be ignored in the
 * case where the input value was a constant or camera function.
 */
declare class PossiblyEvaluatedPropertyValue<T> {
  property: DataDrivenProperty<T>;
  value: PossiblyEvaluatedValue<T>;
  parameters: EvaluationParameters;
  constructor(property: DataDrivenProperty<T>, value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters);
  isConstant(): boolean;
  constantOr(value: T): T;
  evaluate(feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: string[]): T;
}
/**
 * @internal
 * `PossiblyEvaluated` stores a map of all (property name, `R`) pairs for paint or layout properties of a
 * given layer type.
 */
declare class PossiblyEvaluated<Props, PossibleEvaluatedProps> {
  _properties: Properties<Props>;
  _values: PossibleEvaluatedProps;
  constructor(properties: Properties<Props>);
  get<S extends keyof PossibleEvaluatedProps>(name: S): PossibleEvaluatedProps[S];
}
/**
 * @internal
 * An implementation of `Property` for properties that do not permit data-driven (source or composite) expressions.
 * This restriction allows us to declare statically that the result of possibly evaluating this kind of property
 * is in fact always the scalar type `T`, and can be used without further evaluating the value on a per-feature basis.
 */
declare class DataConstantProperty<T> implements Property<T, T> {
  specification: StylePropertySpecification;
  name: string;
  constructor(specification: StylePropertySpecification, name: string);
  possiblyEvaluate(value: PropertyValue<T, T>, parameters: EvaluationParameters): T;
  interpolate(a: T, b: T, t: number): T;
}
/**
 * @internal
 * An implementation of `Property` for properties that permit data-driven (source or composite) expressions.
 * The result of possibly evaluating this kind of property is `PossiblyEvaluatedPropertyValue<T>`; obtaining
 * a scalar value `T` requires further evaluation on a per-feature basis.
 */
declare class DataDrivenProperty<T> implements Property<T, PossiblyEvaluatedPropertyValue<T>> {
  specification: StylePropertySpecification;
  name: string;
  overrides: any;
  constructor(specification: StylePropertySpecification, name: string, overrides?: any);
  possiblyEvaluate(value: PropertyValue<T, PossiblyEvaluatedPropertyValue<T>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): PossiblyEvaluatedPropertyValue<T>;
  interpolate(a: PossiblyEvaluatedPropertyValue<T>, b: PossiblyEvaluatedPropertyValue<T>, t: number): PossiblyEvaluatedPropertyValue<T>;
  evaluate(value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: string[]): T;
}
/**
 * @internal
 * An implementation of `Property` for  data driven `line-pattern` which are transitioned by cross-fading
 * rather than interpolation.
 */
declare class CrossFadedDataDrivenProperty<T> extends DataDrivenProperty<CrossFaded<T>> {
  possiblyEvaluate(value: PropertyValue<CrossFaded<T>, PossiblyEvaluatedPropertyValue<CrossFaded<T>>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): PossiblyEvaluatedPropertyValue<CrossFaded<T>>;
  evaluate(value: PossiblyEvaluatedValue<CrossFaded<T>>, globals: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: string[]): CrossFaded<T>;
  _calculate(min: T, mid: T, max: T, parameters: EvaluationParameters): CrossFaded<T>;
  interpolate(a: PossiblyEvaluatedPropertyValue<CrossFaded<T>>): PossiblyEvaluatedPropertyValue<CrossFaded<T>>;
}
/**
 * @internal
 * An implementation of `Property` for `*-pattern` and `line-dasharray`, which are transitioned by cross-fading
 * rather than interpolation.
 */
declare class CrossFadedProperty<T> implements Property<T, CrossFaded<T>> {
  specification: StylePropertySpecification;
  name: string;
  constructor(specification: StylePropertySpecification, name: string);
  possiblyEvaluate(value: PropertyValue<T, CrossFaded<T>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): CrossFaded<T>;
  _calculate(min: T, mid: T, max: T, parameters: EvaluationParameters): CrossFaded<T>;
  interpolate(a?: CrossFaded<T> | null): CrossFaded<T>;
}
/**
 * @internal
 * An implementation of `Property` for `heatmap-color` and `line-gradient`. Interpolation is a no-op, and
 * evaluation returns a boolean value in order to indicate its presence, but the real
 * evaluation happens in StyleLayer classes.
 */
declare class ColorRampProperty implements Property<Color, boolean> {
  specification: StylePropertySpecification;
  name: string;
  constructor(specification: StylePropertySpecification, name: string);
  possiblyEvaluate(value: PropertyValue<Color, boolean>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: string[]): boolean;
  interpolate(): boolean;
}
/**
 * @internal
 * `Properties` holds objects containing default values for the layout or paint property set of a given
 * layer type. These objects are immutable, and they are used as the prototypes for the `_values` members of
 * `Transitionable`, `Transitioning`, `Layout`, and `PossiblyEvaluated`. This allows these classes to avoid
 * doing work in the common case where a property has no explicit value set and should be considered to take
 * on the default value: using `for (const property of Object.keys(this._values))`, they can iterate over
 * only the _own_ properties of `_values`, skipping repeated calculation of transitions and possible/final
 * evaluations for defaults, the result of which will always be the same.
 */
declare class Properties<Props> {
  properties: Props;
  defaultPropertyValues: { [K in keyof Props]: PropertyValue<unknown, any>; };
  defaultTransitionablePropertyValues: { [K in keyof Props]: TransitionablePropertyValue<unknown, unknown>; };
  defaultTransitioningPropertyValues: { [K in keyof Props]: TransitioningPropertyValue<unknown, unknown>; };
  defaultPossiblyEvaluatedValues: { [K in keyof Props]: PossiblyEvaluatedPropertyValue<unknown>; };
  overridableProperties: string[];
  constructor(properties: Props);
}
//#endregion
//#region src/style/sky_properties.g.d.ts
type SkyProps = {
  "sky-color": DataConstantProperty<Color>;
  "horizon-color": DataConstantProperty<Color>;
  "fog-color": DataConstantProperty<Color>;
  "fog-ground-blend": DataConstantProperty<number>;
  "horizon-fog-blend": DataConstantProperty<number>;
  "sky-horizon-blend": DataConstantProperty<number>;
  "atmosphere-blend": DataConstantProperty<number>;
};
type SkyPropsPossiblyEvaluated = {
  "sky-color": Color;
  "horizon-color": Color;
  "fog-color": Color;
  "fog-ground-blend": number;
  "horizon-fog-blend": number;
  "sky-horizon-blend": number;
  "atmosphere-blend": number;
};
//#endregion
//#region src/webgl/program/terrain_program.d.ts
type TerrainPreludeUniformsType = {
  "u_depth": Uniform1i;
  "u_terrain": Uniform1i;
};
//#endregion
//#region src/data/feature_position_map.d.ts
type SerializedFeaturePositionMap = {
  ids: Float64Array;
  positions: Uint32Array;
};
type FeaturePosition = {
  index: number;
  start: number;
  end: number;
};
declare class FeaturePositionMap {
  ids: number[];
  positions: number[];
  indexed: boolean;
  constructor();
  add(id: unknown, index: number, start: number, end: number): void;
  getPositions(id: unknown): FeaturePosition[];
  static serialize(map: FeaturePositionMap, transferables: ArrayBuffer[]): SerializedFeaturePositionMap;
  static deserialize(obj: SerializedFeaturePositionMap): FeaturePositionMap;
}
//#endregion
//#region src/webgl/vertex_array_object.d.ts
/**
 * @internal
 * A vertex array object used to pass data to the webgl code
 */
declare class VertexArrayObject {
  context: Context;
  boundProgram: Program<any>;
  boundLayoutVertexBuffer: VertexBuffer;
  boundPaintVertexBuffers: VertexBuffer[];
  boundIndexBuffer: IndexBuffer;
  boundVertexOffset: number;
  boundDynamicVertexBuffer: VertexBuffer;
  boundDynamicVertexBuffer2: VertexBuffer;
  boundDynamicVertexBuffer3: VertexBuffer;
  vao: any;
  constructor();
  bind(context: Context, program: Program<any>, layoutVertexBuffer: VertexBuffer, paintVertexBuffers: VertexBuffer[], indexBuffer?: IndexBuffer | null, vertexOffset?: number | null, dynamicVertexBuffer?: VertexBuffer | null, dynamicVertexBuffer2?: VertexBuffer | null, dynamicVertexBuffer3?: VertexBuffer | null): void;
  freshBind(program: Program<any>, layoutVertexBuffer: VertexBuffer, paintVertexBuffers: VertexBuffer[], indexBuffer?: IndexBuffer | null, vertexOffset?: number | null, dynamicVertexBuffer?: VertexBuffer | null, dynamicVertexBuffer2?: VertexBuffer | null, dynamicVertexBuffer3?: VertexBuffer | null): void;
  destroy(): void;
}
//#endregion
//#region src/data/segment.d.ts
/**
 * @internal
 * A single segment of a vector
 */
type Segment = {
  sortKey?: number;
  vertexOffset: number;
  primitiveOffset: number;
  vertexLength: number;
  primitiveLength: number;
  vaos: {
    [_: string]: VertexArrayObject;
  };
};
/**
 * @internal
 * Used for calculations on vector segments
 */
declare class SegmentVector {
  static MAX_VERTEX_ARRAY_LENGTH: number;
  segments: Segment[];
  private _forceNewSegmentOnNextPrepare;
  constructor(segments?: Segment[]);
  /**
   * Returns the last segment if `numVertices` fits into it.
   * If there are no segments yet or `numVertices` doesn't fit into the last one, creates a new empty segment and returns it.
   */
  prepareSegment(numVertices: number, layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
  /**
   * Creates a new empty segment and returns it.
   */
  createNewSegment(layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
  /**
   * Returns the last segment, or creates a new segments if there are no segments yet.
   */
  getOrCreateLatestSegment(layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
  /**
   * Causes the next call to {@link prepareSegment} to always return a new segment,
   * not reusing the current segment even if the new geometry would fit it.
   */
  forceNewSegmentOnNextPrepare(): void;
  get(): Segment[];
  destroy(): void;
  static simpleSegment(vertexOffset: number, primitiveOffset: number, vertexLength: number, primitiveLength: number): SegmentVector;
}
//#endregion
//#region src/render/subdivision_granularity_settings.d.ts
/**
 * Defines the granularity of subdivision for circles with `circle-pitch-alignment: 'map'` and for heatmap kernels.
 * More subdivision will cause circles to more closely follow the planet's surface.
 *
 * Possible values: 1, 3, 5, 7.
 * Subdivision of 1 results in a simple quad.
 */
type CircleGranularity = 1 | 3 | 5 | 7;
/**
 * Controls how much subdivision happens for a given type of geometry at different zoom levels.
 */
declare class SubdivisionGranularityExpression {
  /**
   * A tile of zoom level 0 will be subdivided to this granularity level.
   * Each subsequent zoom level will have its granularity halved.
   */
  private readonly _baseZoomGranularity;
  /**
   * No tile will have granularity level smaller than this.
   */
  private readonly _minGranularity;
  constructor(baseZoomGranularity: number, minGranularity: number);
  getGranularityForZoomLevel(zoomLevel: number): number;
}
/**
 * An object describing how much subdivision should be applied to different types of geometry at different zoom levels.
 */
declare class SubdivisionGranularitySetting {
  /**
   * Granularity settings used for fill and fill-extrusion layers (for fill, both polygons and their anti-aliasing outlines).
   */
  readonly fill: SubdivisionGranularityExpression;
  /**
   * Granularity used for the line layer.
   */
  readonly line: SubdivisionGranularityExpression;
  /**
   * Granularity used for geometry covering the entire tile: raster tiles, etc.
   */
  readonly tile: SubdivisionGranularityExpression;
  /**
   * Granularity used for stencil masks for tiles.
   */
  readonly stencil: SubdivisionGranularityExpression;
  /**
   * Controls the granularity of `pitch-alignment: map` circles and heatmap kernels.
   * More granular circles will more closely follow the map's surface.
   */
  readonly circle: CircleGranularity;
  constructor(options: {
    /**
     * Granularity settings used for fill and fill-extrusion layers (for fill, both polygons and their anti-aliasing outlines).
     */
    fill: SubdivisionGranularityExpression;
    /**
     * Granularity used for the line layer.
     */
    line: SubdivisionGranularityExpression;
    /**
     * Granularity used for geometry covering the entire tile: stencil masks, raster tiles, etc.
     */
    tile: SubdivisionGranularityExpression;
    /**
     * Granularity used for stencil masks for tiles.
     */
    stencil: SubdivisionGranularityExpression;
    /**
     * Controls the granularity of `pitch-alignment: map` circles and heatmap kernels.
     * More granular circles will more closely follow the map's surface.
     */
    circle: CircleGranularity;
  });
  /**
   * Granularity settings that disable subdivision altogether.
   */
  static readonly noSubdivision: SubdivisionGranularitySetting;
}
//#endregion
//#region src/util/transferable_grid_index.d.ts
type SerializedGrid = {
  buffer: ArrayBuffer;
};
declare class TransferableGridIndex {
  cells: number[][];
  arrayBuffer: ArrayBuffer;
  d: number;
  keys: number[];
  bboxes: number[];
  n: number;
  extent: number;
  padding: number;
  scale: any;
  uid: number;
  min: number;
  max: number;
  constructor(extent: number | ArrayBuffer, n?: number, padding?: number);
  insert(key: number, x1: number, y1: number, x2: number, y2: number): void;
  _insertReadonly(): void;
  _insertCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, uid: number): void;
  query(x1: number, y1: number, x2: number, y2: number, intersectionTest?: (x1: number, y1: number, x2: number, y2: number) => boolean): number[];
  _queryCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, result: number[], seenUids: Record<number, boolean>, intersectionTest: (x1: number, y1: number, x2: number, y2: number) => boolean): void;
  _forEachCell(x1: number, y1: number, x2: number, y2: number, fn: Function, arg1: unknown, arg2: unknown, intersectionTest?: (x1: number, y1: number, x2: number, y2: number) => boolean): void;
  _convertFromCellCoord(x: number): number;
  _convertToCellCoord(x: number): number;
  toArrayBuffer(): ArrayBuffer;
  static serialize(grid: TransferableGridIndex, transferables?: Transferable[]): SerializedGrid;
  static deserialize(serialized: SerializedGrid): TransferableGridIndex;
}
//#endregion
//#region src/util/dictionary_coder.d.ts
declare class DictionaryCoder {
  _stringToNumber: {
    [_: string]: number;
  };
  _numberToString: string[];
  constructor(strings: string[]);
  encode(string: string): number;
  decode(n: number): string;
}
//#endregion
//#region src/util/image.d.ts
type Size = {
  width: number;
  height: number;
};
type Point2D = {
  x: number;
  y: number;
};
/**
 * An image with alpha color value
 */
declare class AlphaImage {
  width: number;
  height: number;
  data: Uint8Array;
  constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
  resize(size: Size): void;
  clone(): AlphaImage;
  static copy(srcImg: AlphaImage, dstImg: AlphaImage, srcPt: Point2D, dstPt: Point2D, size: Size): void;
}
/**
 * An object to store image data not premultiplied, because ImageData is not premultiplied.
 * Premultiplication is applied in JS before uploading to a texture.
 */
declare class RGBAImage {
  width: number;
  height: number;
  /**
   * data must be a Uint8Array instead of Uint8ClampedArray because texImage2D does not support Uint8ClampedArray in all browsers.
   */
  data: Uint8Array;
  constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
  resize(size: Size): void;
  replace(data: Uint8Array | Uint8ClampedArray, copy?: boolean): void;
  clone(): RGBAImage;
  static copy(srcImg: RGBAImage | ImageData, dstImg: RGBAImage, srcPt: Point2D, dstPt: Point2D, size: Size): void;
  setPixel(row: number, col: number, value: Color): void;
}
//#endregion
//#region src/style/style_glyph.d.ts
/**
 * Some metices related to a glyph
 */
type GlyphMetrics = {
  width: number;
  height: number;
  left: number;
  top: number;
  advance: number;
  /**
   * isDoubleResolution = true for 48px textures
   */
  isDoubleResolution?: boolean;
};
/**
 * A style glyph type
 */
type StyleGlyph = {
  id: number;
  bitmap: AlphaImage;
  metrics: GlyphMetrics;
};
/** Grapheme clusters requested by font stack and variant, using `default` for standard glyphs. */
type GlyphRequests = Record<string, Record<string, string[]>>;
/** Glyphs keyed by font stack, variant, and grapheme cluster; `null` means unavailable. */
type GlyphMap = Record<string, Record<string, Record<string, StyleGlyph | null>>>;
//#endregion
//#region src/render/glyph_atlas.d.ts
/**
 * A rectangle type with position, width and height.
 */
type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};
/**
 * The glyph's position
 */
type GlyphPosition = {
  rect: Rect;
  metrics: GlyphMetrics;
};
/**
 * Glyph positions keyed by font stack, variant, and grapheme cluster.
 */
type GlyphPositions = Record<string, Record<string, Record<string, GlyphPosition>>>;
//#endregion
//#region src/style/style_image.d.ts
/**
 * The sprite data
 */
type SpriteOnDemandStyleImage = {
  width: number;
  height: number;
  x: number;
  y: number;
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
};
/**
 * The style's image metadata
 */
type StyleImageData = {
  data: RGBAImage;
  version?: number;
  hasRenderCallback?: boolean;
  isWebGLImage?: boolean;
  userImage?: StyleImageInterface;
  spriteData?: SpriteOnDemandStyleImage;
};
/**
 * Enumeration of possible values for StyleImageMetadata.textFitWidth and textFitHeight.
 */
declare const enum TextFit {
  /**
   * The image will be resized on the specified axis to tightly fit the content rectangle to target text.
   * This is the same as not being defined.
   */
  stretchOrShrink = "stretchOrShrink",
  /**
   * The image will be resized on the specified axis to fit the content rectangle to the target text, but will not
   * fall below the aspect ratio of the original content rectangle if the other axis is set to proportional.
   */
  stretchOnly = "stretchOnly",
  /**
   * The image will be resized on the specified axis to fit the content rectangle to the target text and
   * will resize the other axis to maintain the aspect ratio of the content rectangle.
   */
  proportional = "proportional"
}
/**
 * The style's image metadata
 */
type StyleImageMetadata = {
  /**
   * The ratio of pixels in the image to physical pixels on the screen
   */
  pixelRatio: number;
  /**
   * Whether the image should be interpreted as an SDF image
   */
  sdf: boolean;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines the part(s) of the image that can be stretched horizontally.
   */
  stretchX?: Array<[number, number]>;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines the part(s) of the image that can be stretched vertically.
   */
  stretchY?: Array<[number, number]>;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines the part of the image that can be covered by the content in `text-field`.
   */
  content?: [number, number, number, number];
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines constraints on the horizontal scaling of the image.
   */
  textFitWidth?: TextFit;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines constraints on the vertical scaling of the image.
   */
  textFitHeight?: TextFit;
};
/**
 * the style's image, including data and metedata
 */
type StyleImage = StyleImageData & StyleImageMetadata;
/**
 * Where a {@link StyleImageWebGLData.renderWithWebGL} callback writes its pixels.
 */
type StyleImageWebGLTarget = {
  gl: WebGL2RenderingContext;
  /**
   * The icon atlas to write into. MapLibre does not bind it for you, so start with
   * `gl.bindTexture(gl.TEXTURE_2D, texture)` or attach it to your own framebuffer.
   */
  texture: WebGLTexture;
  x: number;
  y: number;
  width: number;
  height: number;
};
/**
 * What a {@link StyleImageInterface} gives as its `data` when it renders itself with WebGL rather
 * than handing over an array of pixels.
 *
 * @see [Animate an icon on the GPU.](https://maplibre.org/maplibre-gl-js/docs/examples/animate-an-icon-on-the-gpu/)
 */
type StyleImageWebGLData = {
  /**
   * Render exactly `width` x `height` premultiplied-alpha pixels at (`x`, `y`) of
   * `target.texture`. That rectangle is the only part of the shared atlas that belongs to this
   * image; drawing outside it corrupts the others.
   *
   * This is the image's counterpart to {@link CustomLayerInterface.render}, and the context
   * arrives in the same state a custom layer's is given: cull face, active texture and the pixel
   * store settings at their WebGL defaults, and no vertex array bound. Everything is yours to
   * change, and MapLibre restores its own state afterwards. The scissor test is the one
   * exception: MapLibre leaves it disabled rather than restoring it, so an image that enables
   * it has to disable it again.
   *
   * Called before the first frame the image is used in, again whenever
   * {@link StyleImageInterface.render} returns `true`, and again for each atlas holding a slot
   * this image has never rendered into, so one change may mean several calls with different
   * targets.
   */
  renderWithWebGL: (target: StyleImageWebGLTarget) => void;
};
/**
 * Interface for dynamically generated style images. This is a specification for
 * implementers to model: it is not an exported method or class.
 *
 * Images implementing this interface can be redrawn for every frame. They can be used to animate
 * icons and patterns or make them respond to user input. Style images can implement a
 * {@link StyleImageInterface.render} method. The method is called every frame and
 * can be used to update the image.
 *
 * @see [Add an animated icon to the map.](https://maplibre.org/maplibre-gl-js/docs/examples/add-image-animated/)
 *
 * @example
 * ```ts
 * let flashingSquare = {
 *     width: 64,
 *     height: 64,
 *     data: new Uint8Array(64 * 64 * 4),
 *
 *     onAdd: function(map) {
 *         this.map = map;
 *     },
 *
 *     render: function() {
 *         // keep repainting while the icon is on the map
 *         this.map.triggerRepaint();
 *
 *         // alternate between black and white based on the time
 *         let value = Math.round(Date.now() / 1000) % 2 === 0  ? 255 : 0;
 *
 *         // check if image needs to be changed
 *         if (value !== this.previousValue) {
 *             this.previousValue = value;
 *
 *             let bytesPerPixel = 4;
 *             for (let x = 0; x < this.width; x++) {
 *                 for (let y = 0; y < this.height; y++) {
 *                     let offset = (y * this.width + x) * bytesPerPixel;
 *                     this.data[offset + 0] = value;
 *                     this.data[offset + 1] = value;
 *                     this.data[offset + 2] = value;
 *                     this.data[offset + 3] = 255;
 *                 }
 *             }
 *
 *             // return true to indicate that the image changed
 *             return true;
 *         }
 *     }
 *  }
 *
 *  map.addImage('flashing_square', flashingSquare);
 * ```
 */
interface StyleImageInterface {
  width: number;
  height: number;
  /**
   * The image's pixels, in the same format as `ImageData`, or a {@link StyleImageWebGLData}
   * callback that renders them with WebGL. A WebGL image renders straight into its slot of the
   * shared icon atlas. Nothing new is possible that pixels could not express, but an image that
   * changes often, such as an animated icon, gets much cheaper: no CPU pixel work and no upload.
   */
  data: Uint8Array | Uint8ClampedArray | StyleImageWebGLData;
  /**
   * This method is called once before every frame where the icon will be used.
   * The method can optionally update the image's `data` member with a new image.
   *
   * If the method updates the image it must return `true` to commit the change.
   * If the method returns `false` or nothing the image is assumed to not have changed.
   *
   * An animated image schedules its next frame by calling {@link Map.triggerRepaint}, typically
   * from a timer; returning `false` in between lets the map rest and fire `idle`.
   *
   * An image whose `data` renders with WebGL has nothing to update here; returning `true` is how
   * it asks for {@link StyleImageWebGLData.renderWithWebGL} to be called again.
   *
   * If updates are infrequent it maybe easier to use {@link Map.updateImage} to update
   * the image instead of implementing this method.
   *
   * @returns `true` if this method updated the image. `false` if the image was not changed.
   */
  render?: () => boolean;
  /**
   * Optional method called when the layer has been added to the Map with {@link Map.addImage}.
   *
   * @param map - The Map this custom layer was just added to.
   */
  onAdd?: (map: Map$1, id: string) => void;
  /**
   * Optional method called when the icon is removed from the map with {@link Map.removeImage}.
   * This gives the image a chance to clean up resources and event listeners.
   *
   * This also fires when the WebGL context is lost, after which the same image is added back
   * without a matching `onAdd`, so the image has to be able to build again whatever it
   * released here.
   */
  onRemove?: () => void;
}
//#endregion
//#region src/render/image_manager.d.ts
type MissingImageRequestHandler = (id: string) => void | Promise<void>;
type ImageManagerEventType = {
  error: ErrorEvent;
  styleimagemissing: MapStyleImageMissingEvent;
};
/**
 * Owns every image of the style - the ones the sprites bring in as well as the ones added at
 * runtime - and tracks requests for them from the tile workers, sending responses when the
 * requests are fulfilled.
 */
declare class ImageManager extends Evented<ImageManagerEventType> {
  images: Record<string, StyleImage>;
  /**
   * Incremented on every {@link ImageManager.updateImage} call. {@link ImageAtlas} instances
   * compare it against the value they last patched against, so that a tile whose atlas is up to
   * date can skip its patching work entirely.
   */
  updateVersion: number;
  loaded: boolean;
  /**
   * This is used to track requests for images that are not yet available. When the image is loaded,
   * the requestors will be notified.
   */
  requestors: Array<{
    ids: string[];
    promiseResolve: (value: GetImagesResponse | PromiseLike<GetImagesResponse>) => void;
  }>;
  missingImageResolver: MissingImageRequestHandler | null;
  /**
   * The images whose `render` callback already ran in the current frame. A given image usually
   * sits in the atlas of several tiles, so it would otherwise be asked to re-render once per
   * tile that holds it.
   */
  private _renderCallbacksDispatchedThisFrame;
  /**
   * The ids of the images each sprite has brought in, keyed by sprite id, so that they can be
   * removed again when that sprite is reloaded or removed.
   */
  private _spriteImagesIds;
  /** Cached result of {@link ImageManager.listImages}, invalidated whenever an image is added or removed */
  private _imagesIds;
  constructor();
  destroy(): void;
  isLoaded(): boolean;
  setLoaded(loaded: boolean): void;
  getImage(id: string): StyleImage;
  addImage(id: string, image: StyleImage): void;
  _validate(id: string, image: StyleImage): boolean;
  _validateStretch(stretch: Array<[number, number]>, size: number): boolean;
  _validateContent(content: [number, number, number, number], image: StyleImage): boolean;
  /**
   * Replaces an image that is already known under this id, bumping its version so that the
   * atlases holding it notice.
   *
   * The old record is read directly rather than through {@link ImageManager.getImage}, which
   * would force a synchronous decode of the sprite data of the very image being replaced. Its
   * size therefore comes from whichever of the two the pixels are still in, since an image that
   * came from a sprite and was never rendered has not been decoded yet, and its version is
   * defaulted, since images start out without one.
   *
   * @param validate - whether to reject an image of a different size than the one it replaces
   */
  updateImage(id: string, image: StyleImage, validate?: boolean): void;
  removeImage(id: string): void;
  /**
   * @returns the ids of every image currently held, sprite images and runtime ones alike. The
   * returned array is shared between callers and must not be modified.
   */
  listImages(): string[];
  /**
   * Images of the `default` sprite keep their plain id, the ones of any other sprite are
   * namespaced by their sprite's id.
   */
  private _getSpriteImageId;
  /**
   * Takes over the images of a single sprite: adds the new ones, updates the ones that are
   * already known, and removes the ones that a previous load of this same sprite had brought in
   * but that are not part of it anymore.
   *
   * @param spriteId - the id of the sprite the images belong to
   * @param images - the sprite's images, keyed by their id within the sprite
   * @returns the ids of the images that this sprite now provides, and the ids of the ones that
   * were removed because they are no longer part of it
   */
  setSpriteImages(spriteId: string, images: Record<string, StyleImage>): {
    loaded: string[];
    removed: string[];
  };
  /**
   * Removes all the images a single sprite has brought in.
   * @returns the ids of the removed images
   */
  removeSpriteImages(spriteId: string): string[];
  /**
   * Removes the images of every sprite, leaving the images added at runtime alone.
   * @returns the ids of the removed images
   */
  removeAllSpriteImages(): string[];
  setMissingImageResolver(resolver: MissingImageRequestHandler | null): void;
  getImages(ids: string[]): Promise<GetImagesResponse>;
  _getImagesForIds(ids: string[]): Promise<GetImagesResponse>;
  beginFrame(): void;
  /**
   * Re-renders the images among `ids` that were added with a `render` callback (see
   * `StyleImageInterface`), at most once per frame each.
   */
  dispatchRenderCallbacks(ids: string[]): void;
  cloneImages(): Record<string, StyleImage>;
}
//#endregion
//#region src/render/image_atlas.d.ts
declare class ImagePosition {
  paddedRect: Rect;
  pixelRatio: number;
  version: number;
  needsFirstWebGLRender: boolean;
  stretchY: Array<[number, number]>;
  stretchX: Array<[number, number]>;
  content: [number, number, number, number];
  textFitWidth: TextFit;
  textFitHeight: TextFit;
  constructor(paddedRect: Rect, { pixelRatio, version, isWebGLImage, stretchX, stretchY, content, textFitWidth, textFitHeight }: StyleImage);
  get tl(): [number, number];
  get br(): [number, number];
  get tlbr(): number[];
  get displaySize(): [number, number];
}
/**
 * A single tile's packed copy of the icons and patterns its features reference, built in the
 * worker so that the symbol layout can bake the positions within it straight into the vertex
 * buffers. Each tile owns one, along with the texture it is uploaded to - as opposed to
 * {@link ImageManager}, which owns the images of the whole style.
 * @internal
 */
declare class ImageAtlas {
  image: RGBAImage;
  iconPositions: Record<string, ImagePosition>;
  patternPositions: Record<string, ImagePosition>;
  haveRenderCallbacks: string[];
  uploaded: boolean;
  /**
   * The {@link ImageManager.updateVersion} this atlas' texture was last patched against.
   * Starts out at `-1` so that a freshly transferred atlas always patches once: images may have
   * been updated between the moment the worker snapshotted them and the moment the atlas arrives.
   */
  patchedUpdateVersion: number;
  constructor(icons: GetImagesResponse, patterns: GetImagesResponse);
  addImages(images: {
    [_: string]: StyleImage;
  }, positions: {
    [_: string]: ImagePosition;
  }, bins: Rect[]): void;
  /**
   * Brings this atlas' texture back in sync with the images it was built from, re-uploading the
   * ones that were replaced in the meantime.
   *
   * This runs for every in-view tile on every frame, so the common case of nothing having
   * changed has to cost nothing: a single comparison against {@link ImageManager.updateVersion}
   * ends the call. When something did change, only the images this atlas actually holds are
   * looked at - a handful per tile - and {@link ImageAtlas.patchUpdatedImage} then skips the
   * ones whose version still matches, leaving just the genuinely stale ones to upload.
   *
   * The render callbacks are dispatched first because they may update images themselves, and
   * those updates have to be part of the version this call catches up with - otherwise an
   * animated image would always be uploaded a frame late.
   */
  patchUpdatedImages(imageManager: ImageManager, texture: Texture): void;
  patchUpdatedImage(position: ImagePosition, image: StyleImage, texture: Texture): void;
}
//#endregion
//#region src/data/dem_data.d.ts
/**
 * The possible DEM encoding types
 */
type DEMEncoding = "mapbox" | "terrarium" | "custom";
/**
 * DEMData is a data structure for decoding, backfilling, and storing elevation data for processing in the hillshade shaders
 * data can be populated either from a png raw image tile or from serialized data sent back from a worker. When data is initially
 * loaded from a image tile, we decode the pixel values using the appropriate decoding formula, but we store the
 * elevation data as an Int32 value. we add 65536 (2^16) to eliminate negative values and enable the use of
 * integer overflow when creating the texture used in the hillshadePrepare step.
 *
 * DEMData also handles the backfilling of data from a tile's neighboring tiles. This is necessary because we use a pixel's 8
 * surrounding pixel values to compute the slope at that pixel, and we cannot accurately calculate the slope at pixels on a
 * tile's edge without backfilling from neighboring tiles.
 */
declare class DEMData {
  private static readonly byteViewCache;
  uid: string | number;
  data: Uint32Array;
  stride: number;
  dim: number;
  min: number;
  max: number;
  redFactor: number;
  greenFactor: number;
  blueFactor: number;
  baseShift: number;
  /**
	* Constructs a `DEMData` object
	* @param uid - the tile's unique id
	* @param data - RGBAImage data has uniform 2px padding on all sides: square tile edge size defines stride
	// and dim is calculated as stride - 4.
	* @param encoding - the encoding type of the data
	* @param redFactor - the red channel factor used to unpack the data, used for `custom` encoding only
	* @param greenFactor - the green channel factor used to unpack the data, used for `custom` encoding only
	* @param blueFactor - the blue channel factor used to unpack the data, used for `custom` encoding only
	* @param baseShift - the base shift used to unpack the data, used for `custom` encoding only
	*/
  constructor(uid: string | number, data: RGBAImage | ImageData, encoding: DEMEncoding, redFactor?: number, greenFactor?: number, blueFactor?: number, baseShift?: number);
  get(x: number, y: number): number;
  sampleBilinear(x: number, y: number): number;
  getUnpackVector(): number[];
  _idx(x: number, y: number): number;
  unpack(r: number, g: number, b: number): number;
  pack(v: number): {
    r: number;
    g: number;
    b: number;
  };
  getPixels(): RGBAImage;
  backfillBorder(borderTile: DEMData, dx: number, dy: number): void;
  private _getByteView;
  private _unpackAtIndex;
}
//#endregion
//#region src/render/line_atlas.d.ts
type DashRange = {
  left: number;
  right: number;
  isDash: boolean;
  zeroLength: boolean;
};
/**
 * A dash entry
 */
type DashEntry = {
  y: number;
  height: number;
  width: number;
};
/**
 * @internal
 * A LineAtlas lets us reuse rendered dashed lines
 * by writing many of them to a texture and then fetching their positions
 * using {@link LineAtlas.getDash}.
 *
 * @param width - the width
 * @param height - the height
 */
declare class LineAtlas {
  width: number;
  height: number;
  nextRow: number;
  bytes: number;
  data: Uint8Array;
  dashEntry: {
    [_: string]: DashEntry;
  };
  dirty: boolean;
  texture: WebGLTexture;
  constructor(width: number, height: number);
  /**
   * Get or create a dash line pattern.
   *
   * @param dasharray - the key (represented by numbers) to get the dash texture
   * @param round - whether to add circle caps in between dash segments
   * @returns position of dash texture in {@link DashEntry}
   */
  getDash(dasharray: number[], round: boolean): DashEntry;
  getDashRanges(dasharray: number[], lineAtlasWidth: number, stretch: number): DashRange[];
  addRoundDash(ranges: DashRange[], stretch: number, n: number): void;
  addRegularDash(ranges: DashRange[]): void;
  addDash(dasharray: number[], round: boolean): DashEntry;
  bind(context: Context): void;
}
//#endregion
//#region src/source/worker_source.d.ts
type TileEncoding = "mlt" | "mvt";
/**
 * Parameters to identify a tile
 */
type TileParameters = {
  type: string;
  source: string;
  uid: string | number;
};
/**
 * Parameters that are send when requesting to load a tile to the worker
 */
type WorkerTileParameters = TileParameters & {
  tileID: OverscaledTileID;
  request?: RequestParameters;
  zoom: number;
  maxZoom?: number;
  tileSize: number;
  promoteId: PromoteIdSpecification;
  pixelRatio: number;
  showCollisionBoxes: boolean;
  collectResourceTiming?: boolean;
  returnDependencies?: boolean;
  subdivisionGranularity: SubdivisionGranularitySetting;
  encoding?: TileEncoding;
  /**
   * Provide this property when the requested tile has a higher canonical Z than source maxzoom.
   * This allows the worker to know that it needs to overzoom from a source tile.
   */
  overzoomParameters?: OverzoomParameters;
  etag?: string;
};
/**
 * Parameters needed in order to load a tile that is overzoomed from a source tile
 */
type OverzoomParameters = {
  maxZoomTileID: CanonicalTileID;
  overzoomRequest: RequestParameters;
};
/**
 * The parameters needed in order to load a DEM tile
 */
type WorkerDEMTileParameters = TileParameters & {
  rawImageData: RGBAImage | ImageBitmap | ImageData;
  encoding: DEMEncoding;
  redFactor: number;
  greenFactor: number;
  blueFactor: number;
  baseShift: number;
};
/**
 * The worker tile's result type
 */
type WorkerTileWithData = ExpiryData & {
  buckets: Bucket[];
  imageAtlas: ImageAtlas;
  dashPositions: Record<string, DashEntry>;
  glyphAtlasImage: AlphaImage;
  featureIndex: FeatureIndex;
  collisionBoxArray: CollisionBoxArray;
  rawTileData?: ArrayBuffer;
  encoding?: TileEncoding;
  resourceTiming?: PerformanceResourceTiming[];
  glyphMap?: GlyphMap | null;
  iconMap?: {
    [_: string]: StyleImage;
  } | null;
  glyphPositions?: GlyphPositions | null;
  etagUnmodified?: false;
};
type WorkerTileWithoutData = ExpiryData & {
  etagUnmodified: true;
  resourceTiming?: PerformanceResourceTiming[];
};
type WorkerTileResult = WorkerTileWithData | WorkerTileWithoutData;
/**
 * This is how the @see {@link WorkerSource} constructor should look like.
 */
interface WorkerSourceConstructor {
  new (actor: IActor, layerIndex: StyleLayerIndex, availableImages: string[]): WorkerSource;
}
/**
 * `WorkerSource` should be implemented by custom source types to provide code that can be run on the WebWorkers.
 * Each of the methods has a relevant event that triggers it from the main thread with the relevant parameters.
 * @see {@link Map.addSourceType}
 */
interface WorkerSource {
  availableImages: string[];
  /**
   * Loads a tile from the given params and parse it into buckets ready to send
   * back to the main thread for rendering.  Should call the callback with:
   * `{ buckets, featureIndex, collisionIndex, rawTileData}`.
   */
  loadTile(params: WorkerTileParameters): Promise<WorkerTileResult>;
  /**
   * Re-parses a tile that has already been loaded.  Yields the same data as
   * {@link WorkerSource.loadTile}.
   */
  reloadTile(params: WorkerTileParameters): Promise<WorkerTileResult>;
  /**
   * Aborts loading a tile that is in progress.
   */
  abortTile(params: TileParameters): Promise<void>;
  /**
   * Removes this tile from any local caches.
   */
  removeTile(params: TileParameters): Promise<void>;
  /**
   * Tells the WorkerSource to abort in-progress tasks and release resources.
   * The foreground Source is responsible for ensuring that 'removeSource' is
   * the last message sent to the WorkerSource.
   */
  removeSource?: (params: RemoveSourceParams) => Promise<void>;
}
//#endregion
//#region src/webgl/types.d.ts
type BlendFuncConstant = WebGLRenderingContextBase["ZERO"] | WebGLRenderingContextBase["ONE"] | WebGLRenderingContextBase["SRC_COLOR"] | WebGLRenderingContextBase["ONE_MINUS_SRC_COLOR"] | WebGLRenderingContextBase["DST_COLOR"] | WebGLRenderingContextBase["ONE_MINUS_DST_COLOR"] | WebGLRenderingContextBase["SRC_ALPHA"] | WebGLRenderingContextBase["ONE_MINUS_SRC_ALPHA"] | WebGLRenderingContextBase["DST_ALPHA"] | WebGLRenderingContextBase["ONE_MINUS_DST_ALPHA"] | WebGLRenderingContextBase["CONSTANT_COLOR"] | WebGLRenderingContextBase["ONE_MINUS_CONSTANT_COLOR"] | WebGLRenderingContextBase["CONSTANT_ALPHA"] | WebGLRenderingContextBase["ONE_MINUS_CONSTANT_ALPHA"] | WebGLRenderingContextBase["BLEND_COLOR"];
type BlendFuncType = [BlendFuncConstant, BlendFuncConstant];
type BlendEquationType = WebGLRenderingContextBase["FUNC_ADD"] | WebGLRenderingContextBase["FUNC_SUBTRACT"] | WebGLRenderingContextBase["FUNC_REVERSE_SUBTRACT"];
type ColorMaskType = [boolean, boolean, boolean, boolean];
type CompareFuncType = WebGLRenderingContextBase["NEVER"] | WebGLRenderingContextBase["LESS"] | WebGLRenderingContextBase["EQUAL"] | WebGLRenderingContextBase["LEQUAL"] | WebGLRenderingContextBase["GREATER"] | WebGLRenderingContextBase["NOTEQUAL"] | WebGLRenderingContextBase["GEQUAL"] | WebGLRenderingContextBase["ALWAYS"];
type DepthMaskType = boolean;
type DepthRangeType = [number, number];
type DepthFuncType = CompareFuncType;
type StencilFuncType = {
  func: CompareFuncType;
  ref: number;
  mask: number;
};
type StencilOpConstant = WebGLRenderingContextBase["KEEP"] | WebGLRenderingContextBase["ZERO"] | WebGLRenderingContextBase["REPLACE"] | WebGLRenderingContextBase["INCR"] | WebGLRenderingContextBase["INCR_WRAP"] | WebGLRenderingContextBase["DECR"] | WebGLRenderingContextBase["DECR_WRAP"] | WebGLRenderingContextBase["INVERT"];
type StencilOpType = [StencilOpConstant, StencilOpConstant, StencilOpConstant];
type TextureUnitType = number;
type ViewportType = [number, number, number, number];
type StencilTestGL = {
  func: WebGLRenderingContextBase["NEVER"];
  mask: 0;
} | {
  func: WebGLRenderingContextBase["LESS"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["EQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["LEQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["GREATER"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["NOTEQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["GEQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["ALWAYS"];
  mask: 0;
};
type CullFaceModeType = WebGLRenderingContextBase["FRONT"] | WebGLRenderingContextBase["BACK"] | WebGLRenderingContextBase["FRONT_AND_BACK"];
type FrontFaceType = WebGLRenderingContextBase["CW"] | WebGLRenderingContextBase["CCW"];
//#endregion
//#region src/webgl/value.d.ts
interface IValue<T> {
  current: T;
  default: T;
  dirty: boolean;
  get(): T;
  setDefault(): void;
  set(value: T): void;
}
declare class BaseValue<T> implements IValue<T> {
  gl: WebGL2RenderingContext;
  current: T;
  default: T;
  dirty: boolean;
  constructor(context: Context);
  get(): T;
  set(value: T): void;
  getDefault(): T;
  setDefault(): void;
}
declare class ClearColor extends BaseValue<Color> {
  getDefault(): Color;
  set(v: Color): void;
}
declare class ClearDepth extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class ClearStencil extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class ColorMask extends BaseValue<ColorMaskType> {
  getDefault(): ColorMaskType;
  set(v: ColorMaskType): void;
}
declare class DepthMask extends BaseValue<DepthMaskType> {
  getDefault(): DepthMaskType;
  set(v: DepthMaskType): void;
}
declare class StencilMask extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class StencilFunc extends BaseValue<StencilFuncType> {
  getDefault(): StencilFuncType;
  set(v: StencilFuncType): void;
}
declare class StencilOp extends BaseValue<StencilOpType> {
  getDefault(): StencilOpType;
  set(v: StencilOpType): void;
}
declare class StencilTest extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class DepthRange extends BaseValue<DepthRangeType> {
  getDefault(): DepthRangeType;
  set(v: DepthRangeType): void;
}
declare class DepthTest extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class DepthFunc extends BaseValue<DepthFuncType> {
  getDefault(): DepthFuncType;
  set(v: DepthFuncType): void;
}
declare class Blend extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class BlendFunc extends BaseValue<BlendFuncType> {
  getDefault(): BlendFuncType;
  set(v: BlendFuncType): void;
}
declare class BlendColor extends BaseValue<Color> {
  getDefault(): Color;
  set(v: Color): void;
}
declare class BlendEquation extends BaseValue<BlendEquationType> {
  getDefault(): BlendEquationType;
  set(v: BlendEquationType): void;
}
declare class CullFace extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class CullFaceSide extends BaseValue<CullFaceModeType> {
  getDefault(): CullFaceModeType;
  set(v: CullFaceModeType): void;
}
declare class FrontFace extends BaseValue<FrontFaceType> {
  getDefault(): FrontFaceType;
  set(v: FrontFaceType): void;
}
declare class ProgramValue extends BaseValue<WebGLProgram> {
  getDefault(): WebGLProgram;
  set(v?: WebGLProgram | null): void;
}
declare class ActiveTextureUnit extends BaseValue<TextureUnitType> {
  getDefault(): TextureUnitType;
  set(v: TextureUnitType): void;
}
declare class Viewport extends BaseValue<ViewportType> {
  getDefault(): ViewportType;
  set(v: ViewportType): void;
}
declare class BindFramebuffer extends BaseValue<WebGLFramebuffer> {
  getDefault(): WebGLFramebuffer;
  set(v?: WebGLFramebuffer | null): void;
}
declare class BindRenderbuffer extends BaseValue<WebGLRenderbuffer> {
  getDefault(): WebGLRenderbuffer;
  set(v?: WebGLRenderbuffer | null): void;
}
declare class BindTexture extends BaseValue<WebGLTexture> {
  getDefault(): WebGLTexture;
  set(v?: WebGLTexture | null): void;
}
declare class BindVertexBuffer extends BaseValue<WebGLBuffer> {
  getDefault(): WebGLBuffer;
  set(v?: WebGLBuffer | null): void;
}
declare class BindElementBuffer extends BaseValue<WebGLBuffer> {
  getDefault(): WebGLBuffer;
  set(v?: WebGLBuffer | null): void;
}
declare class BindVertexArray extends BaseValue<WebGLVertexArrayObject | null> {
  getDefault(): WebGLVertexArrayObject | null;
  set(v: WebGLVertexArrayObject | null): void;
}
declare class PixelStoreUnpack extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class PixelStoreUnpackPremultiplyAlpha extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class PixelStoreUnpackFlipY extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class FramebufferAttachment<T> extends BaseValue<T> {
  parent: WebGLFramebuffer;
  context: Context;
  constructor(context: Context, parent: WebGLFramebuffer);
  getDefault(): T;
}
declare class ColorAttachment extends FramebufferAttachment<WebGLTexture> {
  setDirty(): void;
  set(v?: WebGLTexture | null): void;
}
declare class DepthAttachment extends FramebufferAttachment<WebGLRenderbuffer> {
  set(v?: WebGLRenderbuffer | null): void;
}
//#endregion
//#region src/webgl/framebuffer.d.ts
/**
 * @internal
 * A framebuffer holder object
 */
declare class Framebuffer {
  context: Context;
  width: number;
  height: number;
  framebuffer: WebGLFramebuffer;
  colorAttachment: ColorAttachment;
  depthAttachment: DepthAttachment;
  constructor(context: Context, width: number, height: number, hasDepth: boolean, hasStencil: boolean);
  destroy(): void;
}
//#endregion
//#region src/geo/edge_insets.d.ts
/**
 * An `EdgeInset` object represents screen space padding applied to the edges of the viewport.
 * This shifts the apparent center or the vanishing point of the map. This is useful for adding floating UI elements
 * on top of the map and having the vanishing point shift as UI elements resize.
 *
 * @group Geography and Geometry
 */
export declare class EdgeInsets {
  /**
   * @defaultValue 0
   */
  top: number;
  /**
   * @defaultValue 0
   */
  bottom: number;
  /**
   * @defaultValue 0
   */
  left: number;
  /**
   * @defaultValue 0
   */
  right: number;
  constructor(top?: number, bottom?: number, left?: number, right?: number);
  /**
   * Interpolates the inset in-place.
   * This maintains the current inset value for any inset not present in `target`.
   * @param start - interpolation start
   * @param target - interpolation target
   * @param t - interpolation step/weight
   * @returns the insets
   */
  interpolate(start: PaddingOptions | EdgeInsets, target: PaddingOptions, t: number): this;
  /**
   * Utility method that computes the new apparent center or vanishing point after applying insets.
   * This is in pixels and with the top left being (0.0) and +y being downwards.
   *
   * @param width - the width
   * @param height - the height
   * @returns the point
   */
  getCenter(width: number, height: number): Point$1;
  equals(other: PaddingOptions): boolean;
  clone(): EdgeInsets;
  /**
   * Returns the current state as json, useful when you want to have a
   * read-only representation of the inset.
   *
   * @returns state as json
   */
  toJSON(): Complete<PaddingOptions>;
}
/**
 * Options for setting padding on calls to methods such as {@link Map.fitBounds}, {@link Map.fitScreenCoordinates}, and {@link Map.setPadding}. Adjust these options to set the amount of padding in pixels added to the edges of the canvas. Set a uniform padding on all edges or individual values for each edge. All properties of this object must be
 * non-negative integers.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let bbox = [[-79, 43], [-73, 45]];
 * map.fitBounds(bbox, {
 *   padding: {top: 10, bottom:25, left: 15, right: 5}
 * });
 * ```
 *
 * @example
 * ```ts
 * let bbox = [[-79, 43], [-73, 45]];
 * map.fitBounds(bbox, {
 *   padding: 20
 * });
 * ```
 * @see [Fit to the bounds of a LineString](https://maplibre.org/maplibre-gl-js/docs/examples/zoomto-linestring/)
 * @see [Fit a map to a bounding box](https://maplibre.org/maplibre-gl-js/docs/examples/fitbounds/)
 */
type PaddingOptions = RequireAtLeastOne<{
  /**
   * Padding in pixels from the top of the map canvas.
   */
  top: number;
  /**
   * Padding in pixels from the bottom of the map canvas.
   */
  bottom: number;
  /**
   * Padding in pixels from the left of the map canvas.
   */
  right: number;
  /**
   * Padding in pixels from the right of the map canvas.
   */
  left: number;
}>;
//#endregion
//#region src/webgl/depth_mode.d.ts
declare class DepthMode {
  func: DepthFuncType;
  mask: DepthMaskType;
  range: DepthRangeType;
  static ReadOnly: boolean;
  static ReadWrite: boolean;
  constructor(depthFunc: DepthFuncType, depthMask: DepthMaskType, depthRange: DepthRangeType);
  static disabled: Readonly<DepthMode>;
}
//#endregion
//#region src/webgl/color_mode.d.ts
declare class ColorMode {
  blendFunction: BlendFuncType;
  blendColor: Color;
  mask: ColorMaskType;
  constructor(blendFunction: BlendFuncType, blendColor: Color, mask: ColorMaskType);
  static Replace: BlendFuncType;
  static disabled: Readonly<ColorMode>;
  static unblended: Readonly<ColorMode>;
  static alphaBlended: Readonly<ColorMode>;
}
//#endregion
//#region src/webgl/stencil_mode.d.ts
declare class StencilMode {
  test: StencilTestGL;
  ref: number;
  mask: number;
  fail: StencilOpConstant;
  depthFail: StencilOpConstant;
  pass: StencilOpConstant;
  constructor(test: StencilTestGL, ref: number, mask: number, fail: StencilOpConstant, depthFail: StencilOpConstant, pass: StencilOpConstant);
  static disabled: Readonly<StencilMode>;
}
//#endregion
//#region src/geo/projection/projection_data.d.ts
type ProjectionMatrix = Mat4f32 | Mat4f64;
/**
 * Projection data used by renderer shader uniforms. Renderer matrices are stored
 * as 32-bit floats so WebGL can consume them directly without per-upload copies.
 */
type RendererProjectionData = ProjectionData<Mat4f32> & {
  /** Draws of one frame with the same key share one uniform buffer. */
  uniformBufferKey?: string;
};
/**
 * Projection data exposed to custom layers. Some matrices are stored as 64-bit
 * floats so custom layer code can apply additional CPU-side transforms before
 * converting to 32-bit floats for WebGL upload when necessary.
 */
type CustomLayerProjectionData = ProjectionData<ProjectionMatrix, ProjectionMatrix>;
/**
 * This type contains all data necessary to project a tile to screen in MapLibre's shader system.
 * Contains data used for both mercator and globe projection.
 */
type ProjectionData<MainMatrix extends mat4 = mat4, FallbackMatrix extends mat4 = MainMatrix> = {
  /**
   * The main projection matrix. For mercator projection, it usually projects in-tile coordinates 0..EXTENT to screen,
   * for globe projection, it projects a unit sphere planet to screen.
   * Uniform name: `u_projection_matrix`.
   */
  mainMatrix: MainMatrix;
  /**
   * The extent of current tile in the mercator square.
   * Used by globe projection.
   * First two components are X and Y offset, last two are X and Y scale.
   * Uniform name: `u_projection_tile_mercator_coords`.
   *
   * Conversion from in-tile coordinates in range 0..EXTENT is done as follows:
   * @example
   * ```
   * vec2 mercator_coords = u_projection_tile_mercator_coords.xy + in_tile.xy * u_projection_tile_mercator_coords.zw;
   * ```
   */
  tileMercatorCoords: [number, number, number, number];
  /**
   * The plane equation for a plane that intersects the planet's horizon.
   * Assumes the planet to be a unit sphere.
   * Used by globe projection for clipping.
   * Uniform name: `u_projection_clipping_plane`.
   */
  clippingPlane: [number, number, number, number];
  /**
   * A value in range 0..1 indicating interpolation between mercator (0) and globe (1) projections.
   * Used by globe projection to hide projection transition at high zooms.
   * Uniform name: `u_projection_transition`.
   */
  projectionTransition: number;
  /**
   * Fallback matrix that projects the current tile according to mercator projection.
   * Used by globe projection to fall back to mercator projection in an animated way.
   * Uniform name: `u_projection_fallback_matrix`.
   */
  fallbackMatrix: FallbackMatrix;
  /**
   * Whether line fragments outside the tile's X extent should be discarded: true for the zoom 0 tile under globe projection, false otherwise.
   * The z0 tile covers the whole world, so its buffer wraps around the planet onto the tile itself,
   * drawing geometry near the antimeridian twice. Stencil clipping cannot remove this same-pixel overlap,
   * so lines are clipped in the fragment shader instead (fills are clipped during subdivision).
   * Uniform name: `u_projection_clip_antimeridian`.
   */
  clipAntimeridian: boolean;
};
/**
 * Parameters object for the transform's `getProjectionData` function.
 * Contains the requested tile ID and more.
 */
type ProjectionDataParams = {
  /**
   * The ID of the current tile
   */
  overscaledTileID: OverscaledTileID | null;
  /**
   * Set to true if a pixel-aligned matrix should be used, if possible (mostly used for raster tiles under mercator projection)
   */
  aligned?: boolean;
  /**
   * Set to true if the terrain matrix should be applied (i.e. when rendering terrain)
   */
  applyTerrainMatrix?: boolean;
  /**
   * Set to true if the globe matrix should be applied (i.e. when rendering globe)
   */
  applyGlobeMatrix?: boolean;
};
//#endregion
//#region src/render/mesh.d.ts
declare class Mesh {
  vertexBuffer: VertexBuffer;
  indexBuffer: IndexBuffer;
  segments: SegmentVector;
  constructor(vertexBuffer: VertexBuffer, indexBuffer: IndexBuffer, segments: SegmentVector);
  destroy(): void;
}
//#endregion
//#region src/style/light_properties.g.d.ts
type LightProps = {
  "anchor": DataConstantProperty<"map" | "viewport">;
  "position": DataConstantProperty<[number, number, number]>;
  "color": DataConstantProperty<Color>;
  "intensity": DataConstantProperty<number>;
};
type LightPropsPossiblyEvaluated = {
  "anchor": "map" | "viewport";
  "position": [number, number, number];
  "color": Color;
  "intensity": number;
};
//#endregion
//#region src/geo/projection/projection.d.ts
/**
 * Custom projections are handled both by a class which implements this `Projection` interface,
 * and a class that is derived from the `Transform` base class. What is the difference?
 *
 * The transform-derived class:
 * - should do all the heavy lifting for the projection - implement all the `project*` and `unproject*` functions, etc.
 * - must store the map's state - center, pitch, etc. - this is handled in the `Transform` base class
 * - must be cloneable - it should not create any heavy resources
 *
 * The projection-implementing class:
 * - must provide basic information and data about the projection, which is *independent of the map's state* - name, shader functions, subdivision settings, etc.
 * - must be a "singleton" - no matter how many copies of the matching Transform class exist, the Projection should always exist as a single instance (per Map)
 * - may create heavy resources that should not exist in multiple copies (projection is never cloned) - for example, see the GPU inaccuracy mitigation for globe projection
 * - must be explicitly disposed of after usage using the `destroy` function - this allows the implementing class to free any allocated resources
 */
/**
 * @internal
 * Specifies the usage for a square tile mesh:
 * - 'stencil' for drawing stencil masks
 * - 'raster' for drawing raster tiles, hillshade, etc.
 */
type TileMeshUsage = "stencil" | "raster";
/**
 * An interface the implementations of which are used internally by MapLibre to handle different projections.
 */
interface Projection {
  /**
   * @internal
   * A short, descriptive name of this projection, such as 'mercator' or 'globe'.
   */
  get name(): ProjectionSpecification["type"];
  /**
   * @internal
   * True if this projection needs to render subdivided geometry.
   * Optimized rendering paths for non-subdivided geometry might be used throughout MapLibre.
   * The value of this property may change during runtime, for example in globe projection depending on zoom.
   */
  get useSubdivision(): boolean;
  /**
   * Name of the shader projection variant that should be used for this projection.
   * Note that this value may change dynamically, for example when globe projection internally transitions to mercator.
   * Then globe projection might start reporting the mercator shader variant name to make MapLibre use faster mercator shaders.
   */
  get shaderVariantName(): string;
  /**
   * A `#define` macro that is injected into every MapLibre shader that uses this projection.
   * @example
   * `const define = projection.shaderDefine; // '#define GLOBE'`
   */
  get shaderDefine(): string;
  /**
   * @internal
   * A preprocessed prelude code for both vertex and fragment shaders.
   */
  get shaderPreludeCode(): PreparedShader;
  /**
   * Vertex shader code that is injected into every MapLibre vertex shader that uses this projection.
   */
  get vertexShaderPreludeCode(): string;
  /**
   * @internal
   * An object describing how much subdivision should be applied to rendered geometry.
   * The subdivision settings should be a constant for a given projection.
   * Projections that do not require subdivision should return {@link SubdivisionGranularitySetting.noSubdivision}.
   */
  get subdivisionGranularity(): SubdivisionGranularitySetting;
  /**
   * @internal
   * A number representing the current transition state of the projection.
   * The return value should be a number between 0 and 1,
   * where 0 means the projection is fully in the initial state,
   * and 1 means the projection is fully in the final state.
   */
  get transitionState(): number;
  /**
   * @internal
   * Cleans up any resources the projection created, especially GPU buffers.
   */
  destroy(): void;
  /**
   * @internal
   * Returns a subdivided mesh for a given tile ID, covering 0..EXTENT range.
   * @param context - WebGL context.
   * @param tileID - The tile coordinates for which to return a mesh. Meshes for tiles that border the top/bottom mercator edge might include extra geometry for the north/south pole.
   * @param hasBorder - When true, the mesh will also include a small border beyond the 0..EXTENT range.
   * @param allowPoles - When true, the mesh will also include geometry to cover the north (south) pole, if the given tileID borders the mercator range's top (bottom) edge.
   * @param usage - Specify the usage of the tile mesh, as different usages might use different levels of subdivision.
   */
  getMeshFromTileID(context: Context, tileID: CanonicalTileID, hasBorder: boolean, allowPoles: boolean, usage: TileMeshUsage): Mesh;
  /**
   * @internal
   * Recalculates the projection state based on the current evaluation parameters.
   * @param params - Evaluation parameters.
   */
  recalculate(params: EvaluationParameters): void;
  /**
   * @internal
   * Returns true if the projection is currently transitioning between two states.
   */
  hasTransition(): boolean;
}
//#endregion
//#region src/style/style_layer/symbol_style_layer_properties.g.d.ts
type SymbolLayoutProps = {
  "symbol-placement": DataConstantProperty<"point" | "line" | "line-center">;
  "symbol-spacing": DataConstantProperty<number>;
  "symbol-avoid-edges": DataConstantProperty<boolean>;
  "symbol-sort-key": DataDrivenProperty<number>;
  "symbol-z-order": DataConstantProperty<"auto" | "viewport-y" | "source">;
  "icon-allow-overlap": DataConstantProperty<boolean>;
  "icon-overlap": DataConstantProperty<"never" | "always" | "cooperative">;
  "icon-ignore-placement": DataConstantProperty<boolean>;
  "icon-optional": DataConstantProperty<boolean>;
  "icon-rotation-alignment": DataDrivenProperty<"map" | "viewport" | "auto">;
  "icon-size": DataDrivenProperty<number>;
  "icon-text-fit": DataConstantProperty<"none" | "width" | "height" | "both">;
  "icon-text-fit-padding": DataConstantProperty<[number, number, number, number]>;
  "icon-image": DataDrivenProperty<ResolvedImage>;
  "icon-rotate": DataDrivenProperty<number>;
  "icon-padding": DataDrivenProperty<Padding>;
  "icon-keep-upright": DataConstantProperty<boolean>;
  "icon-offset": DataDrivenProperty<[number, number]>;
  "icon-anchor": DataDrivenProperty<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "icon-pitch-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
  "text-pitch-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
  "text-rotation-alignment": DataConstantProperty<"map" | "viewport" | "viewport-glyph" | "auto">;
  "text-field": DataDrivenProperty<Formatted>;
  "text-font": DataDrivenProperty<string[]>;
  "text-size": DataDrivenProperty<number>;
  "text-max-width": DataDrivenProperty<number>;
  "text-line-height": DataConstantProperty<number>;
  "text-letter-spacing": DataDrivenProperty<number>;
  "text-justify": DataDrivenProperty<"auto" | "left" | "center" | "right">;
  "text-radial-offset": DataDrivenProperty<number>;
  "text-variable-anchor": DataConstantProperty<Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">>;
  "text-variable-anchor-offset": DataDrivenProperty<VariableAnchorOffsetCollection>;
  "text-anchor": DataDrivenProperty<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "text-max-angle": DataConstantProperty<number>;
  "text-writing-mode": DataConstantProperty<Array<"horizontal" | "vertical">>;
  "text-rotate": DataDrivenProperty<number>;
  "text-padding": DataConstantProperty<number>;
  "text-keep-upright": DataConstantProperty<boolean>;
  "text-transform": DataDrivenProperty<"none" | "uppercase" | "lowercase">;
  "text-offset": DataDrivenProperty<[number, number]>;
  "text-allow-overlap": DataConstantProperty<boolean>;
  "text-overlap": DataConstantProperty<"never" | "always" | "cooperative">;
  "text-ignore-placement": DataConstantProperty<boolean>;
  "text-optional": DataConstantProperty<boolean>;
  "symbol-height-offset": DataDrivenProperty<number>;
  "symbol-height-anchor": DataConstantProperty<"ground" | "absolute">;
};
type SymbolLayoutPropsPossiblyEvaluated = {
  "symbol-placement": "point" | "line" | "line-center";
  "symbol-spacing": number;
  "symbol-avoid-edges": boolean;
  "symbol-sort-key": PossiblyEvaluatedPropertyValue<number>;
  "symbol-z-order": "auto" | "viewport-y" | "source";
  "icon-allow-overlap": boolean;
  "icon-overlap": "never" | "always" | "cooperative";
  "icon-ignore-placement": boolean;
  "icon-optional": boolean;
  "icon-rotation-alignment": PossiblyEvaluatedPropertyValue<"map" | "viewport" | "auto">;
  "icon-size": PossiblyEvaluatedPropertyValue<number>;
  "icon-text-fit": "none" | "width" | "height" | "both";
  "icon-text-fit-padding": [number, number, number, number];
  "icon-image": PossiblyEvaluatedPropertyValue<ResolvedImage>;
  "icon-rotate": PossiblyEvaluatedPropertyValue<number>;
  "icon-padding": PossiblyEvaluatedPropertyValue<Padding>;
  "icon-keep-upright": boolean;
  "icon-offset": PossiblyEvaluatedPropertyValue<[number, number]>;
  "icon-anchor": PossiblyEvaluatedPropertyValue<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "icon-pitch-alignment": "map" | "viewport" | "auto";
  "text-pitch-alignment": "map" | "viewport" | "auto";
  "text-rotation-alignment": "map" | "viewport" | "viewport-glyph" | "auto";
  "text-field": PossiblyEvaluatedPropertyValue<Formatted>;
  "text-font": PossiblyEvaluatedPropertyValue<string[]>;
  "text-size": PossiblyEvaluatedPropertyValue<number>;
  "text-max-width": PossiblyEvaluatedPropertyValue<number>;
  "text-line-height": number;
  "text-letter-spacing": PossiblyEvaluatedPropertyValue<number>;
  "text-justify": PossiblyEvaluatedPropertyValue<"auto" | "left" | "center" | "right">;
  "text-radial-offset": PossiblyEvaluatedPropertyValue<number>;
  "text-variable-anchor": Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "text-variable-anchor-offset": PossiblyEvaluatedPropertyValue<VariableAnchorOffsetCollection>;
  "text-anchor": PossiblyEvaluatedPropertyValue<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "text-max-angle": number;
  "text-writing-mode": Array<"horizontal" | "vertical">;
  "text-rotate": PossiblyEvaluatedPropertyValue<number>;
  "text-padding": number;
  "text-keep-upright": boolean;
  "text-transform": PossiblyEvaluatedPropertyValue<"none" | "uppercase" | "lowercase">;
  "text-offset": PossiblyEvaluatedPropertyValue<[number, number]>;
  "text-allow-overlap": boolean;
  "text-overlap": "never" | "always" | "cooperative";
  "text-ignore-placement": boolean;
  "text-optional": boolean;
  "symbol-height-offset": PossiblyEvaluatedPropertyValue<number>;
  "symbol-height-anchor": "ground" | "absolute";
};
type SymbolPaintProps = {
  "icon-opacity": DataDrivenProperty<number>;
  "icon-color": DataDrivenProperty<Color>;
  "icon-halo-color": DataDrivenProperty<Color>;
  "icon-halo-width": DataDrivenProperty<number>;
  "icon-halo-blur": DataDrivenProperty<number>;
  "icon-translate": DataConstantProperty<[number, number]>;
  "icon-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "text-opacity": DataDrivenProperty<number>;
  "text-color": DataDrivenProperty<Color>;
  "text-halo-color": DataDrivenProperty<Color>;
  "text-halo-width": DataDrivenProperty<number>;
  "text-halo-blur": DataDrivenProperty<number>;
  "text-translate": DataConstantProperty<[number, number]>;
  "text-translate-anchor": DataConstantProperty<"map" | "viewport">;
};
type SymbolPaintPropsPossiblyEvaluated = {
  "icon-opacity": PossiblyEvaluatedPropertyValue<number>;
  "icon-color": PossiblyEvaluatedPropertyValue<Color>;
  "icon-halo-color": PossiblyEvaluatedPropertyValue<Color>;
  "icon-halo-width": PossiblyEvaluatedPropertyValue<number>;
  "icon-halo-blur": PossiblyEvaluatedPropertyValue<number>;
  "icon-translate": [number, number];
  "icon-translate-anchor": "map" | "viewport";
  "text-opacity": PossiblyEvaluatedPropertyValue<number>;
  "text-color": PossiblyEvaluatedPropertyValue<Color>;
  "text-halo-color": PossiblyEvaluatedPropertyValue<Color>;
  "text-halo-width": PossiblyEvaluatedPropertyValue<number>;
  "text-halo-blur": PossiblyEvaluatedPropertyValue<number>;
  "text-translate": [number, number];
  "text-translate-anchor": "map" | "viewport";
};
//#endregion
//#region src/style/style_layer/overlap_mode.d.ts
/**
 * The overlap mode for properties like `icon-overlap`and `text-overlap`
 */
type OverlapMode = "never" | "always" | "cooperative";
//#endregion
//#region src/symbol/grid_index.d.ts
type QueryResult<T> = {
  key: T;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
/**
 * A key for the grid
 */
type GridKey = {
  overlapMode?: OverlapMode;
};
/**
 * @internal
 * GridIndex is a data structure for testing the intersection of
 * circles and rectangles in a 2d plane.
 * It is optimized for rapid insertion and querying.
 * GridIndex splits the plane into a set of "cells" and keeps track
 * of which geometries intersect with each cell. At query time,
 * full geometry comparisons are only done for items that share
 * at least one cell. As long as the geometries are relatively
 * uniformly distributed across the plane, this greatly reduces
 * the number of comparisons necessary.
 */
declare class GridIndex<T extends GridKey> {
  circleKeys: T[];
  boxKeys: T[];
  boxCells: number[][];
  circleCells: number[][];
  bboxes: number[];
  circles: number[];
  xCellCount: number;
  yCellCount: number;
  width: number;
  height: number;
  xScale: number;
  yScale: number;
  boxUid: number;
  circleUid: number;
  constructor(width: number, height: number, cellSize: number);
  keysLength(): number;
  insert(key: T, x1: number, y1: number, x2: number, y2: number): void;
  insertCircle(key: T, x: number, y: number, radius: number): void;
  private _insertBoxCell;
  private _insertCircleCell;
  private _query;
  query(x1: number, y1: number, x2: number, y2: number): Array<QueryResult<T>>;
  hitTest(x1: number, y1: number, x2: number, y2: number, overlapMode: OverlapMode, predicate?: (key: T) => boolean): boolean;
  hitTestCircle(x: number, y: number, radius: number, overlapMode: OverlapMode, predicate?: (key: T) => boolean): boolean;
  private _queryCell;
  private _queryCellCircle;
  private _forEachCell;
  private _convertToXCellCoord;
  private _convertToYCellCoord;
  private _circlesCollide;
  private _circleAndRectCollide;
}
//#endregion
//#region src/symbol/shaping.d.ts
declare enum WritingMode {
  none = 0,
  horizontal = 1,
  vertical = 2,
  horizontalOnly = 3
}
//#endregion
//#region src/symbol/anchor.d.ts
declare class Anchor extends Point$1 {
  angle: any;
  segment?: number;
  constructor(x: number, y: number, angle: number, segment?: number);
  clone(): Anchor;
}
//#endregion
//#region src/style/style_layer/symbol_style_layer.d.ts
declare class SymbolStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<SymbolLayoutProps>;
  layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<SymbolPaintProps>;
  _transitioningPaint: Transitioning<SymbolPaintProps>;
  paint: PossiblyEvaluated<SymbolPaintProps, SymbolPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  recalculate(parameters: EvaluationParameters, availableImages: string[]): void;
  getValueAndResolveTokens(name: any, feature: Feature, canonical: CanonicalTileID, availableImages: string[]): any;
  createBucket(parameters: BucketParameters<any>): SymbolBucket;
  queryRadius(): number;
  queryIntersectsFeature(): boolean;
  _setPaintOverrides(): void;
  _handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
  static hasPaintOverride(layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>, propertyName: string): boolean;
}
//#endregion
//#region src/symbol/quads.d.ts
/**
 * A textured quad for rendering a single icon or glyph.
 *
 * The zoom range the glyph can be shown is defined by minScale and maxScale.
 *
 * @param tl - The offset of the top left corner from the anchor.
 * @param tr - The offset of the top right corner from the anchor.
 * @param bl - The offset of the bottom left corner from the anchor.
 * @param br - The offset of the bottom right corner from the anchor.
 * @param tex - The texture coordinates.
 */
type SymbolQuad = {
  tl: Point$1;
  tr: Point$1;
  bl: Point$1;
  br: Point$1;
  tex: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  pixelOffsetTL: Point$1;
  pixelOffsetBR: Point$1;
  writingMode: any | void;
  glyphOffset: [number, number];
  sectionIndex: number;
  isSDF: boolean;
  minFontScaleX: number;
  minFontScaleY: number;
};
//#endregion
//#region src/symbol/symbol_size.d.ts
/**
 * Per-bucket data for `text-size` or `icon-size`. Built in the worker, so it holds
 * plain transferable values, not the size expression itself.
 */
type SizeData = {
  kind: "constant";
  layoutSize: number;
} | {
  kind: "source";
} | {
  kind: "camera";
  zoomStops: number[];
  sizes: number[];
  layoutSize: number;
  interpolationType: InterpolationType;
} | {
  kind: "composite";
  minZoom: number;
  maxZoom: number;
  interpolationType: InterpolationType;
};
//#endregion
//#region src/data/bucket/symbol_bucket.d.ts
type SingleCollisionBox = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  anchorPointX: number;
  anchorPointY: number;
};
type CollisionArrays = {
  textBox?: SingleCollisionBox;
  verticalTextBox?: SingleCollisionBox;
  iconBox?: SingleCollisionBox;
  verticalIconBox?: SingleCollisionBox;
  textFeatureIndex?: number;
  verticalTextFeatureIndex?: number;
  iconFeatureIndex?: number;
  verticalIconFeatureIndex?: number;
};
type SymbolFeature = {
  sortKey: number | void;
  text: Formatted | void;
  icon: ResolvedImage;
  index: number;
  sourceLayerIndex: number;
  geometry: Point$1[][];
  properties: any;
  type: "Unknown" | "Point" | "LineString" | "Polygon";
  id?: any;
};
type SortKeyRange = {
  sortKey: number;
  symbolInstanceStart: number;
  symbolInstanceEnd: number;
};
declare class SymbolBuffers {
  layoutVertexArray: SymbolLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>;
  segments: SegmentVector;
  dynamicLayoutVertexArray: SymbolDynamicLayoutArray;
  dynamicLayoutVertexBuffer: VertexBuffer;
  opacityVertexArray: SymbolOpacityArray;
  opacityVertexBuffer: VertexBuffer;
  hasVisibleVertices: boolean;
  collisionVertexArray: CollisionVertexArray;
  collisionVertexBuffer: VertexBuffer;
  placedSymbolArray: PlacedSymbolArray;
  constructor(programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>);
  isEmpty(): boolean;
  upload(context: Context, dynamicIndexBuffer: boolean, upload?: boolean, update?: boolean): void;
  destroy(): void;
}
declare class CollisionBuffers {
  layoutVertexArray: StructArray;
  layoutAttributes: StructArrayMember[];
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray | LineIndexArray;
  indexBuffer: IndexBuffer;
  segments: SegmentVector;
  collisionVertexArray: CollisionVertexArray;
  collisionVertexBuffer: VertexBuffer;
  constructor(LayoutArray: {
    new (...args: any): StructArray;
  }, layoutAttributes: StructArrayMember[], IndexArray: {
    new (...args: any): TriangleIndexArray | LineIndexArray;
  });
  upload(context: Context): void;
  destroy(): void;
}
/**
 * @internal
 * Unlike other buckets, which simply implement `addFeature` with type-specific
 * logic for (essentially) triangulating feature geometries, SymbolBucket
 * requires specialized behavior:
 *
 * 1. WorkerTile.parse(), the logical owner of the bucket creation process,
 *    calls SymbolBucket.populate(), which resolves text and icon tokens on
 *    each feature, adds each glyphs and symbols needed to the passed-in
 *    collections options.glyphDependencies and options.iconDependencies, and
 *    stores the feature data for use in subsequent step (this.features).
 *
 * 2. WorkerTile asynchronously requests from the main thread all of the glyphs
 *    and icons needed (by this bucket and any others).
 *
 * 3. WorkerTile calls SymbolBucket.addFeatures(), which delegates text shaping
 *    and layout to performSymbolLayout(). This step populates:
 *      `this.symbolInstances`: metadata on generated symbols
 *      `this.collisionBoxArray`: collision data for use by foreground
 *      `this.text`: SymbolBuffers for text symbols
 *      `this.icons`: SymbolBuffers for icons
 *      `this.iconCollisionBox`: Debug SymbolBuffers for icon collision boxes
 *      `this.textCollisionBox`: Debug SymbolBuffers for text collision boxes
 *    The results are sent to the foreground for rendering
 *
 * 4. placement.ts is run on the foreground,
 *    and uses the CollisionIndex along with current camera settings to determine
 *    which symbols can actually show on the map. Collided symbols are hidden
 *    using a dynamic "OpacityVertexArray".
 */
declare class SymbolBucket implements Bucket {
  collisionBoxArray: CollisionBoxArray;
  zoom: number;
  overscaling: number;
  layers: SymbolStyleLayer[];
  layerIds: string[];
  stateDependentLayers: SymbolStyleLayer[];
  stateDependentLayerIds: string[];
  index: number;
  sdfIcons: boolean;
  iconsInText: boolean;
  iconsNeedLinear: boolean;
  bucketInstanceId: number;
  justReloaded: boolean;
  hasDependencies: boolean;
  textSizeData: SizeData;
  iconSizeData: SizeData;
  glyphOffsetArray: GlyphOffsetArray;
  /**
   * The glyph cap for this bucket, normally {@link MAX_GLYPHS}. Tests lower it to
   * exercise the overflow warning without filling a bucket with 65,535 glyphs.
   */
  maxGlyphs: number;
  lineVertexArray: SymbolLineVertexArray;
  features: SymbolFeature[];
  symbolInstances: SymbolInstanceArray;
  textAnchorOffsets: TextAnchorOffsetArray;
  collisionArrays: CollisionArrays[];
  sortKeyRanges: SortKeyRange[];
  pixelRatio: number;
  tilePixelRatio: number;
  compareText: {
    [_: string]: Point$1[];
  };
  fadeStartTime: number;
  sortFeaturesByKey: boolean;
  sortFeaturesByY: boolean;
  canOverlap: boolean;
  sortedAngle: number;
  featureSortOrder: number[];
  maxHeightOffset: number;
  collisionCircleArray: number[];
  text: SymbolBuffers;
  icon: SymbolBuffers;
  textCollisionBox: CollisionBuffers;
  iconCollisionBox: CollisionBuffers;
  uploaded: boolean;
  sourceLayerIndex: number;
  sourceID: string;
  symbolInstanceIndexes: number[];
  writingModes: WritingMode[];
  allowVerticalPlacement: boolean;
  hasRTLText: boolean;
  constructor(options: BucketParameters<SymbolStyleLayer>);
  createArrays(): void;
  /**
   * Collects the glyphs a label needs into `stacks`, so that the tile can ask for them.
   *
   * A cluster of several codepoints is asked for as a whole, so that it can be drawn as the one
   * shape it is written as. Its codepoints are asked for as well, to give layout something to draw
   * a codepoint at a time where the cluster itself yields no glyph. See `shapeLines`.
   *
   * A cluster can span two sections, a letter in one and the accent written on it in the next, so
   * the label is taken as a whole and each cluster attributed to the section its first character
   * came from -- the same way layout attributes it. Collecting each section's text on its own
   * would ask for glyphs no cluster is ever looked up by.
   */
  private calculateGlyphDependencies;
  populate(features: IndexedFeature[], options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  addFeatures({ options, canonical, glyphMap, glyphPositions, iconMap, iconPositions, showCollisionBoxes }: BucketDependencyParameters): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroyDebugData(): void;
  destroy(): void;
  addToLineVertexArray(anchor: Anchor, line: Point$1[]): {
    lineStartIndex: number;
    lineLength: number;
  };
  addSymbols(arrays: SymbolBuffers, quads: SymbolQuad[], sizeVertex: any, lineOffset: [number, number], alongLine: boolean, feature: SymbolFeature, writingMode: WritingMode, labelAnchor: Anchor, lineStartIndex: number, lineLength: number, associatedIconIndex: number, canonical: CanonicalTileID, elevation: number): void;
  _addCollisionDebugVertex(layoutVertexArray: StructArray, collisionVertexArray: StructArray, point: Point$1, anchorX: number, anchorY: number, extrude: Point$1): number;
  addCollisionDebugVertices(x1: number, y1: number, x2: number, y2: number, arrays: CollisionBuffers, boxAnchorPoint: Point$1, symbolInstance: SymbolInstance): void;
  addDebugCollisionBoxes(startIndex: number, endIndex: number, symbolInstance: SymbolInstance, isText: boolean): void;
  generateCollisionDebugBuffers(): void;
  _deserializeCollisionBoxesForSymbol(collisionBoxArray: CollisionBoxArray, textStartIndex: number, textEndIndex: number, verticalTextStartIndex: number, verticalTextEndIndex: number, iconStartIndex: number, iconEndIndex: number, verticalIconStartIndex: number, verticalIconEndIndex: number): CollisionArrays;
  deserializeCollisionBoxes(collisionBoxArray: CollisionBoxArray): void;
  hasTextData(): boolean;
  hasIconData(): boolean;
  hasDebugData(): CollisionBuffers;
  hasTextCollisionBoxData(): boolean;
  hasIconCollisionBoxData(): boolean;
  addIndicesForPlacedSymbol(iconOrText: SymbolBuffers, placedSymbolIndex: number): void;
  getSortedSymbolIndexes(angle: number): number[];
  addToSortKeyRanges(symbolInstanceIndex: number, sortKey: number): void;
  sortFeatures(angle: number): void;
}
//#endregion
//#region src/symbol/collision_index.d.ts
type PlacedCircles = {
  circles: number[];
  offscreen: boolean;
  collisionDetected: boolean;
};
type PlacedBox = {
  box: number[];
  placeable: boolean;
  offscreen: boolean;
  occluded: boolean;
};
type FeatureKey = {
  bucketInstanceId: number;
  featureIndex: number;
  collisionGroupID: number;
  overlapMode: OverlapMode;
};
/**
 * @internal
 * A collision index used to prevent symbols from overlapping. It keep tracks of
 * where previous symbols have been placed and is used to check if a new
 * symbol overlaps with any previously added symbols.
 *
 * There are two steps to insertion: first placeCollisionBox/Circles checks if
 * there's room for a symbol, then insertCollisionBox/Circles actually puts the
 * symbol in the index. The two step process allows paired symbols to be inserted
 * together even if they overlap.
 */
declare class CollisionIndex {
  grid: GridIndex<FeatureKey>;
  ignoredGrid: GridIndex<FeatureKey>;
  transform: IReadonlyTransform;
  pitchFactor: number;
  screenRightBoundary: number;
  screenBottomBoundary: number;
  gridRightBoundary: number;
  gridBottomBoundary: number;
  perspectiveRatioCutoff: number;
  constructor(transform: IReadonlyTransform, grid?: GridIndex<FeatureKey>, ignoredGrid?: GridIndex<FeatureKey>);
  placeCollisionBox(collisionBox: SingleCollisionBox, overlapMode: OverlapMode, textPixelRatio: number, tileID: OverscaledTileID, unwrappedTileID: UnwrappedTileID, pitchWithMap: boolean, rotateWithMap: boolean, translation: [number, number], collisionGroupPredicate?: (key: FeatureKey) => boolean, getElevation?: GetElevation, shift?: Point$1, simpleProjectionMatrix?: mat4, heightOffset?: number, heightAnchorGround?: boolean): PlacedBox;
  placeCollisionCircles(overlapMode: OverlapMode, symbol: PlacedSymbol, lineVertexArray: SymbolLineVertexArray, glyphOffsetArray: GlyphOffsetArray, fontSize: number, unwrappedTileID: UnwrappedTileID, pitchedLabelPlaneMatrix: mat4, showCollisionCircles: boolean, pitchWithMap: boolean, collisionGroupPredicate: (key: FeatureKey) => boolean, circlePixelDiameter: number, textPixelPadding: number, translation: [number, number], getElevation: GetElevation | undefined): PlacedCircles;
  projectPathToScreenSpace(projectedPath: Point$1[], projectionContext: SymbolProjectionContext): PointProjection[];
  /**
   * Because the geometries in the CollisionIndex are an approximation of the shape of
   * symbols on the map, we use the CollisionIndex to look up the symbol part of
   * `queryRenderedFeatures`.
   */
  queryRenderedSymbols(viewportQueryGeometry: Point$1[]): Record<number, number[]>;
  insertCollisionBox(collisionBox: number[], overlapMode: OverlapMode, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
  insertCollisionCircles(collisionCircles: number[], overlapMode: OverlapMode, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
  projectAndGetPerspectiveRatio(x: number, y: number, unwrappedTileID: UnwrappedTileID, elevation?: number, simpleProjectionMatrix?: mat4): {
    x: number;
    y: number;
    perspectiveRatio: number;
    isOccluded: boolean;
    signedDistanceFromCamera: number;
  };
  getPerspectiveRatio(x: number, y: number, unwrappedTileID: UnwrappedTileID, elevation?: number): number;
  isOffscreen(x1: number, y1: number, x2: number, y2: number): boolean;
  isInsideGrid(x1: number, y1: number, x2: number, y2: number): boolean;
  getViewportMatrix(): mat4;
  /**
   * Applies all layout+paint properties of the given box in order to find as good approximation of its screen-space bounding box as possible.
   */
  private _projectCollisionBox;
}
//#endregion
//#region src/style/style_layer/variable_text_anchor.d.ts
declare enum TextAnchorEnum {
  "center" = 1,
  "left" = 2,
  "right" = 3,
  "top" = 4,
  "bottom" = 5,
  "top-left" = 6,
  "top-right" = 7,
  "bottom-left" = 8,
  "bottom-right" = 9
}
type TextAnchor = keyof typeof TextAnchorEnum;
//#endregion
//#region src/symbol/placement.d.ts
declare class OpacityState {
  opacity: number;
  placed: boolean;
  constructor(prevState: OpacityState, increment: number, placed: boolean, skipFade?: boolean | null);
  isHidden(): boolean;
}
declare class JointOpacityState {
  text: OpacityState;
  icon: OpacityState;
  constructor(prevState: JointOpacityState, increment: number, placedText: boolean, placedIcon: boolean, skipFade?: boolean | null);
  isHidden(): boolean;
}
declare class JointPlacement {
  text: boolean;
  icon: boolean;
  skipFade: boolean;
  constructor(text: boolean, icon: boolean, skipFade: boolean);
}
declare class RetainedQueryData {
  bucketInstanceId: number;
  featureIndex: FeatureIndex;
  sourceLayerIndex: number;
  bucketIndex: number;
  tileID: OverscaledTileID;
  featureSortOrder: number[];
  constructor(bucketInstanceId: number, featureIndex: FeatureIndex, sourceLayerIndex: number, bucketIndex: number, tileID: OverscaledTileID);
}
type CollisionGroup = {
  ID: number;
  predicate?: (key: FeatureKey) => boolean;
};
declare class CollisionGroups {
  collisionGroups: {
    [groupName: string]: CollisionGroup;
  };
  maxGroupID: number;
  crossSourceCollisions: boolean;
  constructor(crossSourceCollisions: boolean);
  get(sourceID: string): CollisionGroup;
}
type VariableOffset = {
  textOffset: [number, number];
  width: number;
  height: number;
  anchor: TextAnchor;
  textBoxScale: number;
  prevAnchor?: TextAnchor;
};
type TileLayerParameters = {
  bucket: SymbolBucket;
  layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>;
  translationText: [number, number];
  translationIcon: [number, number];
  unwrappedTileID: UnwrappedTileID;
  pitchedLabelPlaneMatrix: mat4;
  scale: number;
  textPixelRatio: number;
  holdingForFade: boolean;
  collisionBoxArray: CollisionBoxArray;
  partiallyEvaluatedTextSize: {
    uSize: number;
    uSizeT: number;
  };
  collisionGroup: CollisionGroup;
};
type BucketPart = {
  sortKey?: number | void;
  symbolInstanceStart: number;
  symbolInstanceEnd: number;
  parameters: TileLayerParameters;
};
type CrossTileID = string | number;
/** What the last rewrite of a bucket's opacity buffers read, one entry per symbol. */
type OpacityInputs = {
  crossTileIDs: number[];
  /** True for every symbol whose label another bucket is drawing. */
  duplicates: boolean[];
};
declare class Placement {
  transform: IReadonlyTransform;
  terrain: Terrain;
  collisionIndex: CollisionIndex;
  placements: { [_ in CrossTileID]: JointPlacement; };
  opacities: { [_ in CrossTileID]: JointOpacityState; };
  variableOffsets: { [_ in CrossTileID]: VariableOffset; };
  placedOrientations: { [_ in CrossTileID]: number; };
  commitTime: number;
  prevZoomAdjustment: number;
  lastPlacementChangeTime: number;
  stale: boolean;
  fadeDuration: number;
  retainedQueryData: {
    [_: number]: RetainedQueryData;
  };
  collisionGroups: CollisionGroups;
  prevPlacement: Placement;
  zoomAtLastRecencyCheck: number;
  collisionCircleArrays: { [k in any]: number[]; };
  collisionBoxArrays: Map<number, Map<number, {
    text: number[];
    icon: number[];
  }>>;
  lastOpacityInputs: WeakMap<SymbolBucket, OpacityInputs>;
  constructor(transform: ITransform, terrain: Terrain, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement);
  private _getTerrainElevationFunc;
  getBucketParts(results: BucketPart[], styleLayer: StyleLayer, tile: Tile, sortAcrossTiles: boolean): void;
  attemptAnchorPlacement(textAnchorOffset: TextAnchorOffset, textBox: SingleCollisionBox, width: number, height: number, textBoxScale: number, rotateWithMap: boolean, pitchWithMap: boolean, textPixelRatio: number, tileID: OverscaledTileID, unwrappedTileID: UnwrappedTileID, collisionGroup: CollisionGroup, textOverlapMode: OverlapMode, symbolInstance: SymbolInstance, bucket: SymbolBucket, orientation: number, translationText: [number, number], translationIcon: [number, number], iconBox?: SingleCollisionBox | null, getElevation?: GetElevation, simpleProjectionMatrix?: mat4, heightOffset?: number, heightAnchorGround?: boolean): {
    shift: Point$1;
    placedGlyphBoxes: PlacedBox;
  };
  placeLayerBucketPart(bucketPart: BucketPart, seenCrossTileIDs: { [k in string | number]: boolean; }, showCollisionBoxes: boolean): void;
  storeCollisionData(bucketInstanceId: number, symbolIndex: number, collisionArrays: CollisionArrays, placedGlyphBoxes: PlacedBox, placedIconBoxes: PlacedBox, placedGlyphCircles: PlacedCircles): void;
  markUsedJustification(bucket: SymbolBucket, placedAnchor: TextAnchor, symbolInstance: SymbolInstance, orientation: number): void;
  markUsedOrientation(bucket: SymbolBucket, orientation: number, symbolInstance: SymbolInstance): void;
  commit(now: number): void;
  /** Writes the opacity buffers of `styleLayer`, skipping buckets a rewrite would leave as they are. */
  updateLayerOpacities(styleLayer: StyleLayer, tiles: Tile[]): void;
  /**
   * Marks the bucket's symbols whose label an earlier bucket already draws, and claims the rest in `seenCrossTileIDs`.
   * `changed` is false when the marks match the last call, which means the buffers are already up to date.
   */
  _markDuplicates(bucket: SymbolBucket, seenCrossTileIDs: { [k in string | number]: boolean; }): {
    duplicates: boolean[];
    changed: boolean;
  };
  updateBucketOpacities(bucket: SymbolBucket, tileID: OverscaledTileID, duplicates: boolean[], collisionBoxArray?: CollisionBoxArray | null): void;
  symbolFadeChange(now: number): number;
  zoomAdjustment(zoom: number): number;
  hasTransitions(now: number): boolean;
  stillRecent(now: number, zoom: number): boolean;
  setStale(): void;
}
//#endregion
//#region src/render/frame_render_context.d.ts
type RenderPass = "offscreen" | "opaque" | "translucent";
/** The code a projection adds to every shader, and the name that tells its programs apart. */
type ProjectionShaderVariant = {
  readonly name: string;
  readonly define: string;
  readonly prelude: PreparedShader;
};
/** Plain values that describe one frame. The map builds them once per frame. */
type FrameRenderData = {
  readonly showOverdrawInspector: boolean;
  readonly showTileBoundaries: boolean;
  readonly showPadding: boolean;
  readonly rotating: boolean;
  readonly zooming: boolean;
  readonly moving: boolean;
  readonly fadeDuration: number;
  /** Progress of the symbol fade since the last placement. */
  readonly symbolFadeChange: number;
  /** The anchors the last placement chose for symbols with variable anchors. */
  readonly variableOffsets: Readonly<Record<CrossTileID, VariableOffset>>;
  readonly anisotropicFilterPitch: number;
  readonly projectionTransition: number;
  readonly isRenderingGlobe: boolean;
  /** The projection's shader variant for this frame, undefined until the style has a projection. Globe switches it during its transition. */
  readonly projectionShaderVariant: ProjectionShaderVariant | undefined;
  /** Whether the projection subdivides tile meshes this frame. */
  readonly useSubdivision: boolean;
  /** Drawing buffer pixels per CSS pixel, after the map clamps it to the largest canvas the GPU supports. */
  readonly pixelRatio: number;
  /** The style's light, evaluated for this frame, undefined until the style has loaded. */
  readonly light: Readonly<LightPropsPossiblyEvaluated> | undefined;
  /** The style's sky, evaluated for this frame, undefined until the style has loaded. */
  readonly sky: Readonly<SkyPropsPossiblyEvaluated> | undefined;
};
type FrameRenderContextOptions = {
  transform: IReadonlyTransform;
  terrain: Terrain | null;
  data: FrameRenderData;
  context: Context;
  programCache: ProgramCache;
  currentPass: RenderPass;
  /** The projection that builds the tile meshes, undefined until the style has one. */
  projection: Projection | undefined;
};
/**
 * @internal
 * The state of one frame, created per render and updated as rendering proceeds.
 * Corresponds to part of MapLibre Native's `PaintParameters`.
 */
declare class FrameRenderContext {
  currentPass: RenderPass;
  currentLayer: number;
  opaquePassCutoff: number;
  depthRangeFor3D: DepthRangeType;
  isRenderingToTexture: boolean;
  readonly transform: IReadonlyTransform;
  readonly terrain: Terrain | null;
  readonly data: FrameRenderData;
  readonly context: Context;
  readonly programCache: ProgramCache;
  private readonly projection;
  /** The source whose clipping masks are in the stencil buffer. */
  private currentStencilSource;
  private nextStencilID;
  private tileClippingMaskIDs;
  constructor(options: FrameRenderContextOptions);
  getProjectionDataForTile(tileID: OverscaledTileID, options?: {
    aligned?: boolean;
    applyTerrainMatrix?: boolean;
  }): RendererProjectionData;
  /**
   * Returns terrain data for a tile.
   * Returns null if terrain is not configured or tiles are being rendered to a texture.
   */
  getTerrainDataForTile(tileID: OverscaledTileID): TerrainData | null;
  /** Returns the mesh the projection draws a tile with. */
  getMeshFromTileID(tileID: CanonicalTileID, hasBorder: boolean, allowPoles: boolean, usage: TileMeshUsage): Mesh;
  /**
   * Finds the required shader and its variant (base/terrain/globe, etc.) and binds it, compiling a new shader if required.
   * @param name - Name of the desired shader.
   * @param programConfiguration - Configuration of shader's inputs.
   * @param forceSimpleProjection - Whether to force the use of a shader variant with simple mercator projection vertex shader.
   * False by default. Use true when drawing with a simple projection matrix is desired, eg. when drawing a fullscreen quad.
   * @param defines - Additional macros to be injected at the beginning of the shader. Expected format is `['#define XYZ']`, etc.
   */
  useProgram(name: string, programConfiguration?: ProgramConfiguration | null, forceSimpleProjection?: boolean, defines?: string[]): Program<any>;
  colorModeForRenderPass(): Readonly<ColorMode>;
  getDepthModeForSublayer(n: number, mask: DepthMaskType, func?: DepthFuncType | null): Readonly<DepthMode>;
  getDepthModeFor3D(): Readonly<DepthMode>;
  /** Sets the depth range that 3D layers draw into, which lies below the depth values of every sublayer of the `layerCount` layers. */
  setDepthRangeFor3D(layerCount: number): void;
  /**
   * Returns whether the current layer can be drawn in the opaque pass. The opaque pass and 3D layers both use the depth buffer,
   * so layers drawn above 3D layers use the painter's algorithm to appear above 3D features.
   */
  opaquePassEnabledForLayer(): boolean;
  /**
   * Reset the drawing canvas by clearing the stencil buffer so that we can draw
   * new tiles at the same location, while retaining previously drawn pixels.
   */
  clearStencil(): void;
  /** Makes the next tile-clipped layer draw its clipping masks again. */
  invalidateTileClippingMasks(): void;
  /** Draws the clipping masks of a layer's tiles into the stencil buffer, unless its source's masks are already there. */
  renderTileClippingMasks(layer: StyleLayer, tileIDs: OverscaledTileID[]): void;
  private renderTileMasks;
  /** Returns a stencil mode that draws each pixel of a 3D layer only once. */
  stencilModeFor3D(): StencilMode;
  stencilModeForClipping(tileID: OverscaledTileID): StencilMode;
  /**
   * Sort coordinates by Z as drawing tiles is done in Z-descending order.
   * All children with the same Z write the same stencil value.  Children
   * stencil values are greater than parent's.  This is used only for raster
   * and raster-dem tiles, which are already clipped to tile boundaries, to
   * mask area of tile overlapped by children tiles.
   * Stencil ref values continue the range used by the tile clipping masks.
   *
   * Attention: This function changes the next stencil ID even if the result of it
   * is not used, which might cause problems when rendering due to invalid stencil
   * values.
   * Returns [StencilMode for tile overscaleZ map, sortedCoords].
   */
  getStencilConfigForOverlapAndUpdateStencilID(tileIDs: OverscaledTileID[]): [Record<number, Readonly<StencilMode>>, OverscaledTileID[]];
  stencilConfigForOverlapTwoPass(tileIDs: OverscaledTileID[]): [Record<number, Readonly<StencilMode>>, Record<number, Readonly<StencilMode>>, OverscaledTileID[]];
}
//#endregion
//#region src/webgl/program_cache.d.ts
type ProgramVariant = {
  name: string;
  programConfiguration?: ProgramConfiguration | null;
  projectionShaderVariant: ProjectionShaderVariant;
  showOverdrawInspector: boolean;
  useTerrain: boolean;
  defines: string[];
};
/**
 * @internal
 * Compiles each shader variant the first time it is asked for and deletes all of them on destroy.
 */
declare class ProgramCache {
  private readonly context;
  private programs;
  constructor(context: Context);
  /**
   * Returns the program for a shader variant, compiling it if the cache doesn't hold it yet.
   */
  getProgram(variant: ProgramVariant): Program<UniformBindings>;
  destroy(): void;
}
//#endregion
//#region src/tile/tile_cache.d.ts
/**
 * @internal
 * A [least-recently-used cache](https://en.wikipedia.org/wiki/Cache_algorithms)
 * with hash lookup made possible by keeping a list of keys in parallel to
 * an array of dictionary of values
 *
 * TileManager offloads currently unused tiles to this cache, and when a tile gets used again,
 * it is also removed from this cache. Thus addition is the only operation that counts as "usage"
 * for the purposes of LRU behaviour.
 */
declare class TileCache {
  max: number;
  data: {
    [key: string]: Array<{
      value: Tile;
      timeout: ReturnType<typeof setTimeout>;
    }>;
  };
  order: string[];
  onRemove: (element: Tile) => void;
  /**
   * @param max - number of permitted values
   * @param onRemove - callback called with items when they expire
   */
  constructor(max: number, onRemove: (element: Tile) => void);
  /**
   * Clear the cache
   *
   * @returns this cache
   */
  reset(): this;
  /**
   * Add a key, value combination to the cache, trimming its size if this pushes
   * it over max length.
   *
   * @param tileID - lookup key for the item
   * @param data - tile data
   *
   * @returns this cache
   */
  add(tileID: OverscaledTileID, data: Tile, expiryTimeout: number | void): this;
  /**
   * Determine whether the value attached to `key` is present
   *
   * @param tileID - the key to be looked-up
   * @returns whether the cache has this value
   */
  has(tileID: OverscaledTileID): boolean;
  /**
   * Get the value attached to a specific key and remove data from cache.
   * If the key is not found, returns `null`
   *
   * @param tileID - the key to look up
   * @returns the tile data, or null if it isn't found
   */
  getAndRemove(tileID: OverscaledTileID): Tile;
  _getAndRemoveByKey(key: string): Tile;
  getByKey(key: string): Tile;
  /**
   * Get the value attached to a specific key without removing data
   * from the cache. If the key is not found, returns `null`
   *
   * @param tileID - the key to look up
   * @returns the tile data, or null if it isn't found
   */
  get(tileID: OverscaledTileID): Tile;
  /**
   * Remove a key/value combination from the cache.
   *
   * @param tileID - the key for the pair to delete
   * @param value - If a value is provided, remove that exact version of the value.
   * @returns this cache
   */
  remove(tileID: OverscaledTileID, value?: {
    value: Tile;
    timeout: ReturnType<typeof setTimeout>;
  }): this;
  /**
   * Change the max size of the cache.
   *
   * @param max - the max size of the cache
   * @returns this cache
   */
  setMaxSize(max: number): this;
  /**
   * Remove entries that do not pass a filter function. Used for removing
   * stale tiles from the cache.
   *
   * @param filterFn - Determines whether the tile is filtered. If the supplied function returns false, the tile will be filtered out.
   */
  filter(filterFn: (tile: Tile) => boolean): void;
}
//#endregion
//#region src/tile/tile_manager_in_view_tiles.d.ts
declare class InViewTiles {
  private _tiles;
  handleWrapJump(wrapDelta: number): void;
  setFeatureState(featuresChanged: LayerFeatureStates, style: Style, revision: number): void;
  getAllTiles(): Tile[];
  getAllIds(sorted?: boolean): string[];
  getTileById(key: string): Tile | undefined;
  setTile(key: string, tile: Tile): void;
  deleteTileById(key: string): void;
  /**
   * Get a currently loaded tile.
   * - a cached tile is not a loaded tile
   * @returns the tile if it's in view and had data, null otherwise.
   */
  getLoadedTile(tileID: OverscaledTileID): Tile | null;
  isIdRenderable(id: string, symbolLayer?: boolean): boolean;
  getRenderableIds(bearingInRadians?: number, symbolLayer?: boolean): string[];
}
//#endregion
//#region src/util/worker_pool.d.ts
/**
 * Constructs a worker pool.
 */
declare class WorkerPool {
  static workerCount: number;
  active: { [_ in number | string]: boolean; };
  workersPromise: Promise<ActorTarget[]> | null;
  constructor();
  acquire(mapId: number | string): Promise<ActorTarget[]>;
  release(mapId: number | string): void;
  isPreloaded(): boolean;
  numActive(): number;
}
//#endregion
//#region src/util/dispatcher.d.ts
/**
 * Responsible for sending messages from a {@link Source} to an associated worker source (usually with the same name).
 */
declare class Dispatcher extends Evented<ErrorEventType> {
  workerPool: WorkerPool;
  actors: Actor[];
  actorsPromise: Promise<Actor[]>;
  currentActor: number;
  id: string | number;
  private removed;
  private workerErrorSubscriptions;
  constructor(workerPool: WorkerPool, mapId: string | number);
  private initActors;
  /**
   * Broadcast a message to all Workers.
   */
  broadcast<T extends MessageType>(type: T, data: RequestResponseMessageMap[T][0]): Promise<Array<RequestResponseMessageMap[T][1]>>;
  /**
   * Acquires an actor to dispatch messages to. The actors are distributed in round-robin fashion.
   * @returns An actor object backed by a web worker for processing messages.
   */
  getActor(): Promise<Actor>;
  waitForInitComplete(): Promise<void>;
  getReadyActor(): Actor;
  remove(mapRemoved?: boolean): void;
  registerMessageHandler<T extends MessageType>(type: T, handler: MessageHandler<T>): Promise<void>;
  unregisterMessageHandler<T extends MessageType>(type: T): Promise<void>;
}
/**
 * This function is used to get the global dispatcher that is shared across all maps instances.
 * It is used by the main thread to send messages to the workers, and by the workers to send messages back to the main thread.
 * If you import a script into the worker and need to send a message to the workers to pass some parameters for example,
 * you can use this function to get the global dispatcher and send a message to the workers.
 * @returns The global dispatcher instance.
 */
export declare function getGlobalDispatcher(): Dispatcher;
//#endregion
//#region src/style/style_layer/raster_style_layer_properties.g.d.ts
type RasterPaintProps = {
  "raster-opacity": DataConstantProperty<number>;
  "raster-hue-rotate": DataConstantProperty<number>;
  "raster-brightness-min": DataConstantProperty<number>;
  "raster-brightness-max": DataConstantProperty<number>;
  "raster-saturation": DataConstantProperty<number>;
  "raster-contrast": DataConstantProperty<number>;
  "resampling": DataConstantProperty<"linear" | "nearest">;
  "raster-resampling": DataConstantProperty<"linear" | "nearest">;
  "raster-fade-duration": DataConstantProperty<number>;
};
type RasterPaintPropsPossiblyEvaluated = {
  "raster-opacity": number;
  "raster-hue-rotate": number;
  "raster-brightness-min": number;
  "raster-brightness-max": number;
  "raster-saturation": number;
  "raster-contrast": number;
  "resampling": "linear" | "nearest";
  "raster-resampling": "linear" | "nearest";
  "raster-fade-duration": number;
};
//#endregion
//#region src/style/style_layer/raster_style_layer.d.ts
declare class RasterStyleLayer extends StyleLayer {
  _transitionablePaint: Transitionable<RasterPaintProps>;
  _transitioningPaint: Transitioning<RasterPaintProps>;
  paint: PossiblyEvaluated<RasterPaintProps, RasterPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
}
//#endregion
//#region src/webgl/program/raster_program.d.ts
/**
 * How the image of a raster tile or image source is warped onto its corner coordinates: the two
 * perspective terms of the projective mapping from the unit square onto them, followed by how far
 * that mapping is blended towards the bilinear one.
 */
type RasterImageWarp = [number, number, number];
//#endregion
//#region src/source/image_source.d.ts
/**
 * Four geographical coordinates,
 * represented as arrays of longitude and latitude numbers, which define the corners of the image.
 * The coordinates start at the top left corner of the image and proceed in clockwise order.
 * They do not have to represent a rectangle.
 */
type Coordinates = [[number, number], [number, number], [number, number], [number, number]];
/**
 * @experimental
 * How an {@link ImageSource} warps its image onto its four coordinates, for the cases where the
 * coordinates do not form a rectangle.
 *
 * - `perspective` maps the image as the perspective view of a plane, which is what georeferenced
 *   photography and any other image of a flat scene wants: straight lines in the image stay
 *   straight, and the image foreshortens towards its more distant edge.
 * - `flat` interpolates the image between the four coordinates bilinearly, pinning it like a rubber
 *   sheet, which is what an image being reshaped by hand wants: every corner moves the image only
 *   near itself, and the result is stable no matter how far a corner is dragged. Straight lines in
 *   the image only stay straight while they run parallel to its edges, and there is no
 *   foreshortening, in the same sense as the CSS `transform-style: flat`.
 * - `auto`, the default, is `perspective` while the coordinates plausibly describe a perspective
 *   view, and blends continuously towards `flat` as they stop doing so, which they do as a corner
 *   approaches the diagonal between its two neighbours.
 *
 * Coordinates with no perspective view at all - a concave, self-crossing or collinear quad - are
 * always warped flat, whichever of these is set.
 */
type ImageSourceWarp = "auto" | "perspective" | "flat";
/**
 * An already-decoded image that can be handed to an {@link ImageSource} directly,
 * without a network request.
 */
type ImageSourceImage = HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData;
/**
 * The options object for the {@link ImageSource.updateImage} method.
 *
 * Provide exactly one of `url` (to load an image over the network) or `image`
 * (an already-decoded image to display directly, without a network request).
 */
type UpdateImageOptions = {
  /**
   * The image coordinates
   */
  coordinates?: Coordinates;
} & ({
  /**
   * The image URL to load.
   */
  url: string;
} | {
  /**
   * An already-decoded image (`HTMLImageElement`, `HTMLCanvasElement`, `ImageBitmap` or `ImageData`)
   * to display directly, without a network request.
   */
  image: ImageSourceImage;
});
type CanonicalTileRange = {
  minTileY: number;
  maxTileY: number;
  /**
   * Image can exceed the boundary of a single "world" (tile 0/0/0),
   * so we need to know the tile range for wrapping.
   */
  minTileXWrapped: number;
  maxTileXWrapped: number;
  minWrap: number;
  maxWrap: number;
};
/**
 * A data source containing an image.
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/#sources-image) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * // add to map
 * map.addSource('some id', {
 *    type: 'image',
 *    url: 'https://www.maplibre.org/images/foo.png',
 *    coordinates: [
 *        [-76.54, 39.18],
 *        [-76.52, 39.18],
 *        [-76.52, 39.17],
 *        [-76.54, 39.17]
 *    ]
 * });
 *
 * // update coordinates
 * let mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * // update url and coordinates simultaneously
 * mySource.updateImage({
 *    url: 'https://www.maplibre.org/images/bar.png',
 *    coordinates: [
 *        [-76.54335737228394, 39.18579907229748],
 *        [-76.52803659439087, 39.1838364847587],
 *        [-76.5295386314392, 39.17683392507606],
 *        [-76.54520273208618, 39.17876344106642]
 *    ]
 * })
 *
 * // update with an already-decoded image (no network request)
 * const bitmap = await createImageBitmap(myCanvas);
 * mySource.updateImage({image: bitmap});
 *
 * // create an empty source (no url), then feed it entirely via updateImage
 * map.addSource('empty id', {
 *    type: 'image',
 *    coordinates: [
 *        [-76.54, 39.18],
 *        [-76.52, 39.18],
 *        [-76.52, 39.17],
 *        [-76.54, 39.17]
 *    ]
 * });
 * (map.getSource('empty id') as ImageSource).updateImage({image: bitmap});
 *
 * map.removeSource('some id');  // remove
 * ```
 */
export declare class ImageSource extends Evented<SourceEventType> implements Source {
  type: string;
  id: string;
  minzoom: number;
  maxzoom: number;
  tileSize: number;
  url: string;
  /**
   * This object is used to store the range of terrain tiles that overlap with this tile.
   * It is relevant for image tiles, as the image exceeds single tile boundaries.
   */
  terrainTileRanges: {
    [zoom: string]: CanonicalTileRange;
  };
  coordinates: Coordinates;
  tiles: {
    [_: string]: Tile;
  };
  options: any;
  dispatcher: Dispatcher;
  map: Map$1;
  texture: Texture | null;
  image: ImageSourceImage;
  tileID: CanonicalTileID;
  tileCoords: Point$1[];
  imageWarp: RasterImageWarp;
  flippedWindingOrder: boolean;
  _loaded: boolean;
  _abortController: AbortController;
  private _warp;
  private _imageDirty;
  /**
   * Whether the image has to be warped over a subdivided mesh instead of a pair of triangles,
   * because {@link imageWarp} is not the affine mapping that a parallelogram gets.
   */
  private _subdividedQuad;
  private _subdividedMesh;
  /** @internal */
  constructor(id: string, options: ImageSourceSpecification | VideoSourceSpecification | CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
  load(newCoordinates?: Coordinates): Promise<void>;
  loaded(): boolean;
  /**
   * Updates the image and, optionally, the coordinates. To avoid having the image flash after changing,
   * set the `raster-fade-duration` paint property on the raster layer to 0.
   *
   * Provide exactly one of `url` (to fetch a new image over the network) or `image` (an
   * already-decoded `HTMLImageElement`, `HTMLCanvasElement`, `ImageBitmap` or `ImageData` to
   * display directly, without a network request).
   *
   * @param options - The options object.
   */
  updateImage(options: UpdateImageOptions): this;
  /** Loaded tiles hold `this.texture`, so the wrapper has to outlive the images in it. */
  private _setImage;
  /**
   * @internal
   * The mesh the image is drawn with, or null to use the tile mesh of the current projection.
   *
   * The raster vertex shader evaluates {@link imageWarp} per vertex, so a pair of triangles only
   * samples it at the four corners. That is enough for the affine mapping of a parallelogram, and
   * for a purely projective mapping, whose straight lines survive linear interpolation across the
   * diagonal. Anything in between is neither, and would be textured as two independently warped
   * halves with a visible seam along that diagonal, so it needs the warp evaluated per grid cell.
   *
   * A projection that subdivides its own tile meshes already does this, so it keeps them.
   */
  getMesh(context: Context, projectionSubdividesTiles: boolean): Mesh | null;
  /** Teardown only: dropping the reference alone leaves the allocation to the GC. */
  private _disposeTexture;
  _finishLoading(): void;
  onAdd(map: Map$1): void;
  onRemove(): void;
  /**
   * @experimental
   * Sets how the image is warped onto its coordinates and re-renders the map.
   *
   * This only has an effect while the coordinates do not form a rectangle, and it is not part of
   * the style specification, so it does not survive `map.setStyle`.
   *
   * @param warp - The warp to use, see {@link ImageSourceWarp}.
   *
   * @example
   * ```ts
   * // Keep the image pinned to its corners while the user drags them around.
   * map.getSource('some id').setWarp('flat');
   * ```
   */
  setWarp(warp: ImageSourceWarp): this;
  /**
   * @experimental
   * Returns how the image is warped onto its coordinates.
   *
   * @returns The warp in use, see {@link ImageSourceWarp}.
   */
  getWarp(): ImageSourceWarp;
  /**
   * Sets the image's coordinates and re-renders the map.
   *
   * @param coordinates - Four geographical coordinates,
   * represented as arrays of longitude and latitude numbers, which define the corners of the image.
   * The coordinates start at the top left corner of the image and proceed in clockwise order.
   * They do not have to represent a rectangle.
   */
  setCoordinates(coordinates: Coordinates): this;
  prepare(): void;
  loadTile(tile: Tile): Promise<void>;
  serialize(): ImageSourceSpecification | VideoSourceSpecification | CanvasSourceSpecification;
  hasTransition(): boolean;
  /**
   * Given a list of coordinates, determine overlapping tile ranges for all zoom levels.
   *
   * @returns Overlapping tile ranges for all zoom levels.
   * @internal
   */
  private _getOverlappingTileRanges;
}
//#endregion
//#region src/source/canvas_source.d.ts
/**
 * Options to add a canvas source type to the map.
 */
type CanvasSourceSpecification = {
  /**
   * Source type. Must be `"canvas"`.
   */
  type: "canvas";
  /**
   * Four geographical coordinates denoting where to place the corners of the canvas, specified in `[longitude, latitude]` pairs.
   */
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
  /**
   * Whether the canvas source is animated. If the canvas is static (i.e. pixels do not need to be re-read on every frame), `animate` should be set to `false` to improve performance.
   * @defaultValue true
   */
  animate?: boolean;
  /**
   * Canvas source from which to read pixels. Can be a string representing the ID of the canvas element, or the `HTMLCanvasElement` itself.
   */
  canvas?: string | HTMLCanvasElement;
};
/**
 * A data source containing the contents of an HTML canvas. See {@link CanvasSourceSpecification} for detailed documentation of options.
 *
 * @group Sources
 *
 * @example
 * ```ts
 * // add to map
 * map.addSource('some id', {
 *    type: 'canvas',
 *    canvas: 'idOfMyHTMLCanvas',
 *    animate: true,
 *    coordinates: [
 *        [-76.54, 39.18],
 *        [-76.52, 39.18],
 *        [-76.52, 39.17],
 *        [-76.54, 39.17]
 *    ]
 * });
 *
 * // update
 * let mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * map.removeSource('some id');  // remove
 * ```
 */
export declare class CanvasSource extends ImageSource {
  options: CanvasSourceSpecification;
  animate: boolean;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  /**
   * Enables animation. The image will be copied from the canvas to the map on each frame.
   */
  play: () => void;
  /**
   * Disables animation. The map will display a static copy of the canvas image.
   */
  pause: () => void;
  _playing: boolean;
  /** @internal */
  constructor(id: string, options: CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
  load(): Promise<void>;
  /**
   * Returns the HTML `canvas` element.
   *
   * @returns The HTML `canvas` element.
   */
  getCanvas(): HTMLCanvasElement;
  onAdd(map: Map$1): void;
  onRemove(): void;
  prepare(): void;
  serialize(): CanvasSourceSpecification;
  hasTransition(): boolean;
  _hasInvalidDimensions(): boolean;
}
//#endregion
//#region src/tile/tile_bounds.d.ts
declare class TileBounds {
  bounds: LngLatBounds;
  minzoom: number;
  maxzoom: number;
  constructor(bounds: [number, number, number, number], minzoom?: number | null, maxzoom?: number | null);
  validateBounds(bounds: [number, number, number, number]): LngLatBoundsLike;
  contains(tileID: CanonicalTileID): boolean;
}
//#endregion
//#region src/source/vector_tile_source.d.ts
type VectorTileSourceOptions = VectorSourceSpecification & {
  collectResourceTiming?: boolean;
  tileSize?: number;
};
type LoadTileResult = {
  /**
   * Indicates that the tile requested was not modified.
   */
  unmodified?: boolean;
};
/**
 * A source containing vector tiles in [Maplibre Vector Tile format](https://maplibre.org/maplibre-tile-spec/) or [Mapbox Vector Tile format](https://docs.mapbox.com/vector-tiles/reference/).
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *     type: 'vector',
 *     url: 'https://demotiles.maplibre.org/tiles/tiles.json'
 * });
 * ```
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *     type: 'vector',
 *     tiles: ['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt'],
 *     minzoom: 6,
 *     maxzoom: 14
 * });
 * ```
 *
 * @example
 * ```ts
 * map.getSource('some id').setUrl("https://demotiles.maplibre.org/tiles/tiles.json");
 * ```
 *
 * @example
 * ```ts
 * map.getSource('some id').setTiles(['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt']);
 * ```
 * @see [Add a vector tile source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-vector-tile-source/)
 */
export declare class VectorTileSource extends Evented<SourceEventType> implements Source {
  type: "vector";
  id: string;
  minzoom: number;
  maxzoom: number;
  url: string;
  scheme: string;
  encoding: TileEncoding;
  tileSize: number;
  promoteId: PromoteIdSpecification;
  _options: VectorSourceSpecification;
  _collectResourceTiming: boolean;
  dispatcher: Dispatcher;
  map: Map$1;
  bounds: [number, number, number, number];
  tiles: string[];
  tileBounds: TileBounds;
  reparseOverscaled: boolean;
  isTileClipped: boolean;
  _tileJSONRequest: AbortController;
  _loaded: boolean;
  constructor(id: string, options: VectorTileSourceOptions, dispatcher: Dispatcher, eventedParent: Evented);
  load(sourceDataChanged?: boolean): Promise<void>;
  loaded(): boolean;
  hasTile(tileID: OverscaledTileID): boolean;
  onAdd(map: Map$1): void;
  setSourceProperty(callback: Function): void;
  /**
   * Sets the source `tiles` property and re-renders the map.
   *
   * @param tiles - An array of one or more tile source URLs, as in the TileJSON spec.
   */
  setTiles(tiles: string[]): this;
  /**
   * Sets the source `url` property and re-renders the map.
   *
   * @param url - A URL to a TileJSON resource. Supported protocols are `http:` and `https:`.
   */
  setUrl(url: string): this;
  onRemove(): void;
  serialize(): VectorSourceSpecification;
  loadTile(tile: Tile): Promise<LoadTileResult | void>;
  /**
   * When the requested tile has a higher canonical Z than source maxzoom, pass overzoom parameters so worker can load the
   * deepest tile at source max zoom to generate sub tiles using geojsonvt for highest performance on vector overscaling
   */
  private _getOverzoomParameters;
  private _afterTileLoadWorkerResponse;
  abortTile(tile: Tile): Promise<void>;
  unloadTile(tile: Tile): Promise<void>;
  hasTransition(): boolean;
}
//#endregion
//#region src/tile/tile_manager.d.ts
type TileResult = {
  tile: Tile;
  tileID: OverscaledTileID;
  queryGeometry: Point$1[];
  cameraQueryGeometry: Point$1[];
  scale: number;
};
/**
 * @internal
 * `TileManager` is responsible for
 *
 *  - creating an instance of `Source`
 *  - caching tiles loaded from an instance of `Source`
 *  - handling incoming source data events events from `Map` and coordinating updates
 *  - providing the current renderable tile coordinates to the `Painter`
 *  - loading the tiles needed to render a given viewport
 *  - retaining the tiles needed as substitutes for pending loading tiles
 *  - retaining the tiles needed for fading between parents and children (for raster sources)
 *  - reloading tiles when source data or dependencies change
 *  - handling tile expiration and refresh timers
 *  - unloading cached tiles not needed to render a given viewport
 *  - managing tile state and feature state
 */
declare class TileManager extends Evented<SourceEventType> {
  id: string;
  dispatcher: Dispatcher;
  map: Map$1;
  style: Style;
  _source: Source;
  /**
   * @internal
   * signifies that the TileJSON is loaded if applicable.
   * if the source type does not come with a TileJSON, the flag signifies the
   * source data has loaded (i.e geojson has been tiled on the worker and is ready)
   */
  _sourceLoaded: boolean;
  _maxContentElevationSeen: number;
  _sourceErrored: boolean;
  _inViewTiles: InViewTiles;
  _prevLng: number;
  _outOfViewCache: TileCache;
  _timers: Record<string, ReturnType<typeof setTimeout>>;
  _maxTileCacheSize: number;
  _maxTileCacheZoomLevels: number;
  _paused: boolean;
  _shouldReloadOnResume: boolean;
  transform: ITransform;
  terrain: Terrain;
  used: boolean;
  usedForTerrain: boolean;
  tileSize: number;
  _state: SourceFeatureState;
  _didEmitContent: boolean;
  _updated: boolean;
  _rasterFadeDuration: number;
  _maxFadingAncestorLevels: number;
  static maxUnderzooming: number;
  static maxOverzooming: number;
  constructor(id: string, options: SourceSpecification | CanvasSourceSpecification, dispatcher: Dispatcher);
  onAdd(map: Map$1): void;
  onRemove(map: Map$1): void;
  /**
   * Return true if no tile data is pending, tiles will not change unless
   * an additional API call is received.
   */
  loaded(): boolean;
  getSource(): Source;
  getState(): SourceFeatureState;
  pause(): void;
  resume(): void;
  _loadTile(tile: Tile, id: string, state: TileState, hadData: boolean): Promise<void>;
  _unloadTile(tile: Tile): void;
  _abortTile(tile: Tile): void;
  serialize(): any;
  prepare(context: Context): void;
  /**
   * Return all tile ids ordered with z-order, and cast to numbers
   */
  getIds(): string[];
  getRenderableIds(symbolLayer?: boolean): string[];
  hasRenderableParent(tileID: OverscaledTileID): boolean;
  /**
   * Reload tiles based on the current state of the source.
   * @param sourceDataChanged - If `true`, reload all tiles using a state of 'expired' (errored tiles use 'loading' since they have nothing to show yet), otherwise reload only non-errored tiles using state of 'reloading'.
   * @param shouldReloadTileOptions - Set of options associated with a `MapSourceDataChangedEvent` that can be passed back to the associated `Source` determine whether a tile should be reloaded.
   */
  reload(sourceDataChanged?: boolean, shouldReloadTileOptions?: any): void;
  _reloadTile(id: string, state: TileState): Promise<void>;
  _tileLoaded(tile: Tile, id: string, previousState: TileState, hadData: boolean, result: LoadTileResult): void;
  /**
   * Get a specific tile by TileID
   */
  getTile(tileID: OverscaledTileID): Tile;
  /**
   * Get a specific tile by id
   */
  getTileByID(id: string): Tile | undefined;
  /**
   * Retain the uppermost loaded children of each provided target tile, within a variable covering zoom range.
   *
   * On pitched maps, different parts of the screen show different zoom levels simultaneously.
   * Ideal tiles are generated using coveringTiles() above, which returns the ideal tile set for
   * the current pitched plane, which can carry tiles of varying zooms (overscaledZ).
   * See: https://maplibre.org/maplibre-gl-js/docs/examples/level-of-detail-control/
   *
   * A fixed `maxCoveringZoom` on a pitched map would incorrectly intersect with some
   * ideal tiles and cause distant high-pitch tiles to skip their uppermost children.
   *
   * To solve this, we calculate the max covering zoom for each ideal tile separately using its
   * `overscaledZ`. This effectively makes the "max covering zoom plane" parallel to the
   * "ideal tile plane," ensuring that we correctly capture the uppermost children
   * of each ideal tile across the pitched view.
   *
   * Analogy: imagine two sheets of paper in 3D space:
   *   - one sheet = ideal tiles at varying overscaledZ
   *   - the second sheet = maxCoveringZoom
   *
   * @param retainTileMap - this parameters will be updated with the child tiles to keep
   * @param idealTilesWithoutData - which of the ideal tiles currently does not have loaded data
   * @return a set of tiles that need to be loaded
   */
  _retainLoadedChildren(retainTileMap: Record<string, OverscaledTileID>, idealTilesWithoutData: Set<OverscaledTileID>): Set<OverscaledTileID>;
  /**
   * Return dictionary of qualified loaded descendents for each provided target tile id
   */
  _getLoadedDescendents(targetTileIDs: Set<OverscaledTileID>): Record<string, Tile[]>;
  /**
   * Determine if tile ids fully cover the current generation.
   * - 1st generation: need 4 children or 1 overscaled child
   * - 2nd generation: need 16 children or 1 overscaled child
   */
  _areDescendentsComplete(generationIDs: OverscaledTileID[], generationZ: number, ancestorZ: number): boolean;
  /**
   * Get a currently loaded tile.
   * - a cached tile is not a loaded tile
   * @returns the tile if it's in view and had data, null otherwise.
   */
  getLoadedTile(tileID: OverscaledTileID): Tile | null;
  /**
   * Resizes the tile cache based on the current viewport's size
   * or the maxTileCacheSize option passed during map creation
   *
   * Larger viewports use more tiles and need larger caches. Larger viewports
   * are more likely to be found on devices with more memory and on pages where
   * the map is more important.
   */
  updateCacheSize(transform: IReadonlyTransform): void;
  handleWrapJump(lng: number): void;
  /**
   * The highest elevation this source's symbols may reach, in meters: `symbol-height-offset`
   * constants read from the visible symbol layers, data-driven maxima tracked by the loaded
   * buckets at layout time. Only data-driven layers scan the loaded tiles, so styles without
   * them pay nothing beyond the layer loop. The value is a high-water mark: a maximum seen once is kept even
   * after its tile unloads, otherwise dropping the tile would also drop the reason to keep it,
   * and the tile could not come back while its content is still visible. The mark resets with
   * the tiles in `clearTiles`.
   */
  _updateMaxContentElevation(): number;
  /**
   * Removes tiles that are outside the viewport and adds new tiles that
   * are inside the viewport.
   */
  update(transform: ITransform, terrain?: Terrain): void;
  /**
   * Remove raster tiles that are no longer retained
   */
  _cleanUpRasterTiles(retain: Record<string, OverscaledTileID>): void;
  /**
   * Remove vector tiles that are no longer retained and also not needed for symbol fading
   */
  _cleanUpVectorTiles(retain: Record<string, OverscaledTileID>): void;
  /**
   * Add ideal tiles needed for 3D terrain rendering
   */
  _addTerrainIdealTiles(idealTileIDs: OverscaledTileID[]): OverscaledTileID[];
  releaseSymbolFadeTiles(): void;
  /**
   * Set tiles to be retained on update of the source. For ideal tiles that do not have data, retain their loaded
   * children so they can be displayed as substitutes pending load of each ideal tile (to reduce flickering).
   * If no loaded children are available, fallback to seeking loaded parents as an alternative substitute.
   */
  _updateRetainedTiles(idealTileIDs: OverscaledTileID[], zoom: number): Record<string, OverscaledTileID>;
  /**
   * Add a tile, given its coordinate, to the pyramid.
   */
  _addTile(tileID: OverscaledTileID): Tile;
  /**
   * Set a timeout to reload the tile after it expires
   */
  _setTileReloadTimer(id: string, tile: Tile): void;
  _clearTileReloadTimer(id: string): void;
  _resetTileReloadTimers(): void;
  /**
   * Reload any currently renderable tiles that are match one of the incoming `tileId` x/y/z
   */
  refreshTiles(tileIds: ICanonicalTileID[]): void;
  /**
   * Remove a tile, given its id, from the pyramid
   */
  _removeTile(id: string): void;
  /** @internal
   * Handles incoming source data messages (i.e. after the source has been updated via a worker that has fired
   * to map.ts data event). For sources with mutable data, the 'content' event fires when the underlying data
   * to a source has changed. (i.e. GeoJSONSource.setData and ImageSource.setCoordinates)
   */
  private _dataHandler;
  /**
   * Forgets the recorded maximum content elevation, so the next update recomputes it from the
   * current layers and loaded tiles. Called when a symbol layer is removed, since the removed
   * layer's heights would otherwise keep expanding tile coverage.
   */
  resetMaxContentElevation(): void;
  /**
   * Remove all tiles from this pyramid
   */
  clearTiles(): void;
  /**
   * Search through our current tiles and attempt to find the tiles that
   * cover the given bounds.
   * @param pointQueryGeometry - coordinates of the corners of bounding rectangle
   * @returns result items have `{tile, minX, maxX, minY, maxY}`, where min/max bounding values are the given bounds transformed in into the coordinate space of this tile.
   */
  tilesIn(pointQueryGeometry: Point$1[], maxPitchScaleFactor: number, has3DLayer: boolean): TileResult[];
  private transformBbox;
  getVisibleCoordinates(symbolLayer?: boolean): OverscaledTileID[];
  hasTransition(): boolean;
  setRasterFadeDuration(fadeDuration: number): void;
  /**
   * Set the value of a particular state for a feature
   */
  setFeatureState(sourceLayer: string, featureId: number | string, state: any): void;
  /**
   * Resets the value of a particular state key for a feature
   */
  removeFeatureState(sourceLayer?: string, featureId?: number | string, key?: string): void;
  /**
   * Get the entire state object for a feature
   */
  getFeatureState(sourceLayer: string, featureId: number | string): FeatureState;
  /**
   * Sets the set of keys that the tile depends on. This allows tiles to
   * be reloaded when their dependencies change.
   */
  setDependencies(tileKey: string, namespace: string, dependencies: string[]): void;
  /**
   * Reloads all tiles that depend on the given keys.
   */
  reloadTilesForDependencies(namespaces: string[], keys: string[]): void;
  areTilesLoaded(): boolean;
}
//#endregion
//#region src/webgl/draw/draw_symbol.d.ts
declare function drawSymbols(painter: Painter, tileManager: TileManager, layer: SymbolStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/webgl/draw/draw_circle.d.ts
declare function drawCircles(tileManager: TileManager, layer: CircleStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/data/bucket/heatmap_bucket.d.ts
declare class HeatmapBucket extends CircleBucket<HeatmapStyleLayer> {
  layers: HeatmapStyleLayer[];
}
//#endregion
//#region src/style/style_layer/heatmap_style_layer_properties.g.d.ts
type HeatmapPaintProps = {
  "heatmap-radius": DataDrivenProperty<number>;
  "heatmap-weight": DataDrivenProperty<number>;
  "heatmap-intensity": DataConstantProperty<number>;
  "heatmap-color": ColorRampProperty;
  "heatmap-opacity": DataConstantProperty<number>;
};
type HeatmapPaintPropsPossiblyEvaluated = {
  "heatmap-radius": PossiblyEvaluatedPropertyValue<number>;
  "heatmap-weight": PossiblyEvaluatedPropertyValue<number>;
  "heatmap-intensity": number;
  "heatmap-color": ColorRampProperty;
  "heatmap-opacity": number;
};
//#endregion
//#region src/style/style_layer/heatmap_style_layer.d.ts
/**
 * A style layer that defines a heatmap
 */
declare class HeatmapStyleLayer extends StyleLayer {
  heatmapFbos: Map<string, Framebuffer>;
  colorRamp: RGBAImage;
  colorRampTexture: Texture;
  _transitionablePaint: Transitionable<HeatmapPaintProps>;
  _transitioningPaint: Transitioning<HeatmapPaintProps>;
  paint: PossiblyEvaluated<HeatmapPaintProps, HeatmapPaintPropsPossiblyEvaluated>;
  createBucket(options: any): HeatmapBucket;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  _handleSpecialPaintPropertyUpdate(name: string): void;
  _updateColorRamp(): void;
  resize(): void;
  queryRadius(bucket: Bucket): number;
  queryIntersectsFeature({ queryGeometry, feature, featureState, geometry, transform, pixelsToTileUnits, unwrappedTileID, getElevation }: QueryIntersectsFeatureParams): boolean;
  hasOffscreenPass(): boolean;
}
//#endregion
//#region src/webgl/draw/draw_heatmap.d.ts
declare function drawHeatmap(painter: Painter, tileManager: TileManager, layer: HeatmapStyleLayer, tileIDs: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/data/bucket/line_bucket.d.ts
type LineClips = {
  start: number;
  end: number;
};
type GradientTexture = {
  texture?: Texture;
  gradient?: RGBAImage;
  version?: number;
};
/**
 * @internal
 * Line bucket class
 */
declare class LineBucket implements Bucket {
  distance: number;
  totalDistance: number;
  maxLineLength: number;
  scaledDistance: number;
  lineClips?: LineClips;
  e1: number;
  e2: number;
  index: number;
  zoom: number;
  overscaling: number;
  layers: LineStyleLayer[];
  layerIds: string[];
  gradients: {
    [x: string]: GradientTexture;
  };
  stateDependentLayers: any[];
  stateDependentLayerIds: string[];
  patternFeatures: BucketFeature[];
  lineClipsArray: LineClips[];
  layoutVertexArray: LineLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  layoutVertexArray2: LineExtLayoutArray;
  layoutVertexBuffer2: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<LineStyleLayer>;
  segments: SegmentVector;
  uploaded: boolean;
  constructor(options: BucketParameters<LineStyleLayer>);
  populate(features: IndexedFeature[], options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions: {
    [_: string]: DashEntry;
  }): void;
  addFeatures({ options, canonical, patternPositions, dashPositions }: BucketDependencyParameters): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  lineFeatureClips(feature: BucketFeature): LineClips | undefined;
  addFeature(feature: BucketFeature, geometry: Point$1[][], index: number, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions: Record<string, DashEntry>, subdivisionGranularity: SubdivisionGranularitySetting): void;
  addLine(vertices: Point$1[], feature: BucketFeature, join: string, cap: string, miterLimit: number, roundLimit: number, canonical: CanonicalTileID | undefined, subdivisionGranularity: SubdivisionGranularitySetting): void;
  /**
   * Add two vertices to the buffers.
   *
   * @param p - the line vertex to add buffer vertices for
   * @param normal - vertex normal
   * @param endLeft - extrude to shift the left vertex along the line
   * @param endRight - extrude to shift the left vertex along the line
   * @param segment - the segment object to add the vertex to
   * @param round - whether this is a round cap
   * @param offsetNormal - the vector `line-offset` moves this vertex along. An offset line turns its corner where
   * the two offset segments meet, on the angle bisector `miterLength` away, so every vertex of a join shares that
   * vector. Defaults to the vertex normal, which is where a vertex outside a join belongs.
   * @param offsetFallback - how far to ease `offsetNormal` back to the vertex normal, see {@link OFFSET_FALLBACK_START}
   */
  addCurrentVertex(p: Point$1, normal: Point$1, endLeft: number, endRight: number, segment: Segment, round?: boolean, offsetNormal?: Point$1, offsetFallback?: number): void;
  /**
   * Add a single vertex to the buffers.
   *
   * @param p - the line vertex to add a buffer vertex for
   * @param extrudeX - x of the vector the vertex is extruded along by half the line width
   * @param extrudeY - y of the vector the vertex is extruded along by half the line width
   * @param offsetX - x of the vector `line-offset` moves the vertex along
   * @param offsetY - y of the vector `line-offset` moves the vertex along
   * @param round - whether this is a round cap
   * @param up - whether this is the vertex on the positive side of the normal
   * @param segment - the segment object to add the vertex to
   */
  addHalfVertex({ x, y }: Point$1, extrudeX: number, extrudeY: number, offsetX: number, offsetY: number, round: boolean, up: boolean, segment: Segment): void;
  updateScaledDistance(): void;
  updateDistance(prev: Point$1, next: Point$1): void;
  private hasLineDasharray;
  private addLineDashDependencies;
}
//#endregion
//#region src/style/style_layer/line_style_layer_properties.g.d.ts
type LineLayoutProps = {
  "line-cap": DataDrivenProperty<"butt" | "round" | "square">;
  "line-join": DataDrivenProperty<"bevel" | "round" | "miter">;
  "line-miter-limit": DataDrivenProperty<number>;
  "line-round-limit": DataDrivenProperty<number>;
  "line-sort-key": DataDrivenProperty<number>;
};
type LineLayoutPropsPossiblyEvaluated = {
  "line-cap": PossiblyEvaluatedPropertyValue<"butt" | "round" | "square">;
  "line-join": PossiblyEvaluatedPropertyValue<"bevel" | "round" | "miter">;
  "line-miter-limit": PossiblyEvaluatedPropertyValue<number>;
  "line-round-limit": PossiblyEvaluatedPropertyValue<number>;
  "line-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
type LinePaintProps = {
  "line-opacity": DataDrivenProperty<number>;
  "line-layer-opacity": DataConstantProperty<number>;
  "line-color": DataDrivenProperty<Color>;
  "line-translate": DataConstantProperty<[number, number]>;
  "line-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "line-width": DataDrivenProperty<number>;
  "line-gap-width": DataDrivenProperty<number>;
  "line-offset": DataDrivenProperty<number>;
  "line-blur": DataDrivenProperty<number>;
  "line-dasharray": CrossFadedDataDrivenProperty<number[]>;
  "line-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
  "line-gradient": ColorRampProperty;
};
type LinePaintPropsPossiblyEvaluated = {
  "line-opacity": PossiblyEvaluatedPropertyValue<number>;
  "line-layer-opacity": number;
  "line-color": PossiblyEvaluatedPropertyValue<Color>;
  "line-translate": [number, number];
  "line-translate-anchor": "map" | "viewport";
  "line-width": PossiblyEvaluatedPropertyValue<number>;
  "line-gap-width": PossiblyEvaluatedPropertyValue<number>;
  "line-offset": PossiblyEvaluatedPropertyValue<number>;
  "line-blur": PossiblyEvaluatedPropertyValue<number>;
  "line-dasharray": PossiblyEvaluatedPropertyValue<CrossFaded<number[]>>;
  "line-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
  "line-gradient": ColorRampProperty;
};
//#endregion
//#region src/style/style_layer/line_style_layer.d.ts
declare class LineStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<LineLayoutProps>;
  layout: PossiblyEvaluated<LineLayoutProps, LineLayoutPropsPossiblyEvaluated>;
  gradientVersion: number;
  stepInterpolant: boolean;
  _transitionablePaint: Transitionable<LinePaintProps>;
  _transitioningPaint: Transitioning<LinePaintProps>;
  paint: PossiblyEvaluated<LinePaintProps, LinePaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  _handleSpecialPaintPropertyUpdate(name: string): void;
  gradientExpression(): StylePropertyExpression;
  recalculate(parameters: EvaluationParameters, availableImages: string[]): void;
  createBucket(parameters: BucketParameters<any>): LineBucket;
  queryRadius(bucket: Bucket): number;
  queryIntersectsFeature({ queryGeometry, feature, featureState, geometry, transform, pixelsToTileUnits }: QueryIntersectsFeatureParams): boolean;
  isTileClipped(): boolean;
}
//#endregion
//#region src/webgl/draw/draw_line.d.ts
declare function drawLine(painter: Painter, tileManager: TileManager, layer: LineStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/data/bucket/fill_bucket.d.ts
declare class FillBucket implements Bucket {
  index: number;
  zoom: number;
  overscaling: number;
  layers: FillStyleLayer[];
  layerIds: string[];
  stateDependentLayers: FillStyleLayer[];
  stateDependentLayerIds: string[];
  patternFeatures: BucketFeature[];
  layoutVertexArray: FillLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  indexArray2: LineIndexArray;
  indexBuffer2: IndexBuffer;
  hasDependencies: boolean;
  sdfPatterns: Record<string, boolean>;
  programConfigurations: ProgramConfigurationSet<FillStyleLayer>;
  segments: SegmentVector;
  segments2: SegmentVector;
  uploaded: boolean;
  constructor(options: BucketParameters<FillStyleLayer>);
  populate(features: IndexedFeature[], options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  addFeatures({ options, canonical, patternPositions, patternMap }: BucketDependencyParameters): void;
  private detectSdfPatterns;
  private recordSdfPattern;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  addFeature(feature: BucketFeature, geometry: Point$1[][], index: number, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, subdivisionGranularity: SubdivisionGranularitySetting): void;
}
//#endregion
//#region src/style/style_layer/fill_style_layer_properties.g.d.ts
type FillLayoutProps = {
  "fill-sort-key": DataDrivenProperty<number>;
};
type FillLayoutPropsPossiblyEvaluated = {
  "fill-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
type FillPaintProps = {
  "fill-antialias": DataConstantProperty<boolean>;
  "fill-opacity": DataDrivenProperty<number>;
  "fill-layer-opacity": DataConstantProperty<number>;
  "fill-color": DataDrivenProperty<Color>;
  "fill-outline-color": DataDrivenProperty<Color>;
  "fill-translate": DataConstantProperty<[number, number]>;
  "fill-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "fill-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
};
type FillPaintPropsPossiblyEvaluated = {
  "fill-antialias": boolean;
  "fill-opacity": PossiblyEvaluatedPropertyValue<number>;
  "fill-layer-opacity": number;
  "fill-color": PossiblyEvaluatedPropertyValue<Color>;
  "fill-outline-color": PossiblyEvaluatedPropertyValue<Color>;
  "fill-translate": [number, number];
  "fill-translate-anchor": "map" | "viewport";
  "fill-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
};
//#endregion
//#region src/style/style_layer/fill_style_layer.d.ts
declare class FillStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<FillLayoutProps>;
  layout: PossiblyEvaluated<FillLayoutProps, FillLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<FillPaintProps>;
  _transitioningPaint: Transitioning<FillPaintProps>;
  paint: PossiblyEvaluated<FillPaintProps, FillPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  recalculate(parameters: EvaluationParameters, availableImages: string[]): void;
  createBucket(parameters: BucketParameters<any>): FillBucket;
  queryRadius(): number;
  queryIntersectsFeature({ queryGeometry, geometry, transform, pixelsToTileUnits }: QueryIntersectsFeatureParams): boolean;
  isTileClipped(): boolean;
}
//#endregion
//#region src/webgl/draw/draw_fill.d.ts
declare function drawFill(painter: Painter, tileManager: TileManager, layer: FillStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/data/bucket/fill_extrusion_bucket.d.ts
declare class FillExtrusionBucket implements Bucket {
  index: number;
  zoom: number;
  overscaling: number;
  layers: FillExtrusionStyleLayer[];
  layerIds: string[];
  stateDependentLayers: FillExtrusionStyleLayer[];
  stateDependentLayerIds: string[];
  layoutVertexArray: FillExtrusionLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  centroidVertexArray: PosArray;
  centroidVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<FillExtrusionStyleLayer>;
  segments: SegmentVector;
  uploaded: boolean;
  features: BucketFeature[];
  constructor(options: BucketParameters<FillExtrusionStyleLayer>);
  populate(features: IndexedFeature[], options: PopulateParameters, canonical: CanonicalTileID): void;
  addFeatures({ options, canonical, patternPositions }: BucketDependencyParameters): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  addFeature(feature: BucketFeature, geometry: Point$1[][], index: number, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, subdivisionGranularity: SubdivisionGranularitySetting): void;
  private processPolygon;
  /**
   * Generates side faces for the supplied geometry. Assumes `geometry` to be a line string, like the output of {@link subdivideVertexLine}.
   * For rings, it is assumed that the first and last vertex of `geometry` are equal.
   */
  private _generateSideFaces;
}
//#endregion
//#region src/style/style_layer/fill_extrusion_style_layer_properties.g.d.ts
type FillExtrusionLayoutProps = {
  "fill-extrusion-rounded-corner-distance": DataConstantProperty<number>;
};
type FillExtrusionLayoutPropsPossiblyEvaluated = {
  "fill-extrusion-rounded-corner-distance": number;
};
type FillExtrusionPaintProps = {
  "fill-extrusion-opacity": DataConstantProperty<number>;
  "fill-extrusion-color": DataDrivenProperty<Color>;
  "fill-extrusion-translate": DataConstantProperty<[number, number]>;
  "fill-extrusion-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "fill-extrusion-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
  "fill-extrusion-height": DataDrivenProperty<number>;
  "fill-extrusion-base": DataDrivenProperty<number>;
  "fill-extrusion-vertical-gradient": DataConstantProperty<boolean>;
};
type FillExtrusionPaintPropsPossiblyEvaluated = {
  "fill-extrusion-opacity": number;
  "fill-extrusion-color": PossiblyEvaluatedPropertyValue<Color>;
  "fill-extrusion-translate": [number, number];
  "fill-extrusion-translate-anchor": "map" | "viewport";
  "fill-extrusion-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
  "fill-extrusion-height": PossiblyEvaluatedPropertyValue<number>;
  "fill-extrusion-base": PossiblyEvaluatedPropertyValue<number>;
  "fill-extrusion-vertical-gradient": boolean;
};
//#endregion
//#region src/style/style_layer/fill_extrusion_style_layer.d.ts
declare class FillExtrusionStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<FillExtrusionLayoutProps>;
  layout: PossiblyEvaluated<FillExtrusionLayoutProps, FillExtrusionLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<FillExtrusionPaintProps>;
  _transitioningPaint: Transitioning<FillExtrusionPaintProps>;
  paint: PossiblyEvaluated<FillExtrusionPaintProps, FillExtrusionPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  createBucket(parameters: BucketParameters<FillExtrusionStyleLayer>): FillExtrusionBucket;
  queryRadius(): number;
  is3D(): boolean;
  queryIntersectsFeature({ queryGeometry, feature, featureState, geometry, transform, pixelsToTileUnits, pixelPosMatrix }: QueryIntersectsFeatureParams): boolean | number;
}
//#endregion
//#region src/webgl/draw/draw_fill_extrusion.d.ts
declare function drawFillExtrusion(tileManager: TileManager, layer: FillExtrusionStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/style/style_layer/hillshade_style_layer_properties.g.d.ts
type HillshadePaintProps = {
  "hillshade-illumination-direction": DataConstantProperty<NumberArray>;
  "hillshade-illumination-altitude": DataConstantProperty<NumberArray>;
  "hillshade-illumination-anchor": DataConstantProperty<"map" | "viewport">;
  "hillshade-exaggeration": DataConstantProperty<number>;
  "hillshade-shadow-color": DataConstantProperty<ColorArray>;
  "hillshade-highlight-color": DataConstantProperty<ColorArray>;
  "hillshade-accent-color": DataConstantProperty<Color>;
  "hillshade-method": DataConstantProperty<"standard" | "basic" | "combined" | "igor" | "multidirectional">;
  "resampling": DataConstantProperty<"linear" | "nearest">;
};
type HillshadePaintPropsPossiblyEvaluated = {
  "hillshade-illumination-direction": NumberArray;
  "hillshade-illumination-altitude": NumberArray;
  "hillshade-illumination-anchor": "map" | "viewport";
  "hillshade-exaggeration": number;
  "hillshade-shadow-color": ColorArray;
  "hillshade-highlight-color": ColorArray;
  "hillshade-accent-color": Color;
  "hillshade-method": "standard" | "basic" | "combined" | "igor" | "multidirectional";
  "resampling": "linear" | "nearest";
};
//#endregion
//#region src/style/style_layer/hillshade_style_layer.d.ts
declare class HillshadeStyleLayer extends StyleLayer {
  _transitionablePaint: Transitionable<HillshadePaintProps>;
  _transitioningPaint: Transitioning<HillshadePaintProps>;
  paint: PossiblyEvaluated<HillshadePaintProps, HillshadePaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  getIlluminationProperties(): {
    directionRadians: number[];
    altitudeRadians: number[];
    shadowColor: Color[];
    highlightColor: Color[];
  };
  hasOffscreenPass(): boolean;
}
//#endregion
//#region src/webgl/draw/draw_hillshade.d.ts
declare function drawHillshade(painter: Painter, tileManager: TileManager, layer: HillshadeStyleLayer, tileIDs: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/style/style_layer/color_relief_style_layer_properties.g.d.ts
type ColorReliefPaintProps = {
  "color-relief-opacity": DataConstantProperty<number>;
  "color-relief-color": ColorRampProperty;
  "resampling": DataConstantProperty<"linear" | "nearest">;
};
type ColorReliefPaintPropsPossiblyEvaluated = {
  "color-relief-opacity": number;
  "color-relief-color": ColorRampProperty;
  "resampling": "linear" | "nearest";
};
//#endregion
//#region src/style/style_layer/color_relief_style_layer.d.ts
type ColorRamp = {
  elevationStops: number[];
  colorStops: Color[];
};
type ColorRampTextures = {
  elevationTexture: Texture;
  colorTexture: Texture;
};
declare class ColorReliefStyleLayer extends StyleLayer {
  colorRampExpression: StylePropertyExpression;
  colorRampTextures: ColorRampTextures;
  _transitionablePaint: Transitionable<ColorReliefPaintProps>;
  _transitioningPaint: Transitioning<ColorReliefPaintProps>;
  paint: PossiblyEvaluated<ColorReliefPaintProps, ColorReliefPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  /**
   * Create the color ramp, enforcing a maximum length for the vectors. This modifies the internal color ramp,
   * so that the remapping is only performed once.
   *
   * @param maxLength - the maximum number of stops in the color ramp
   *
   * @return a `ColorRamp` object with no more than `maxLength` stops.
   *
   */
  _createColorRamp(maxLength: number): ColorRamp;
  _colorRampChanged(): boolean;
  getColorRampTextures(context: Context, maxLength: number, unpackVector: number[]): ColorRampTextures;
  hasOffscreenPass(): boolean;
}
//#endregion
//#region src/webgl/draw/draw_color_relief.d.ts
declare function drawColorRelief(painter: Painter, tileManager: TileManager, layer: ColorReliefStyleLayer, tileIDs: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/webgl/draw/draw_raster.d.ts
declare function drawRaster(tileManager: TileManager, layer: RasterStyleLayer, tileIDs: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/style/style_layer/background_style_layer_properties.g.d.ts
type BackgroundPaintProps = {
  "background-color": DataConstantProperty<Color>;
  "background-pattern": CrossFadedProperty<ResolvedImage>;
  "background-opacity": DataConstantProperty<number>;
};
type BackgroundPaintPropsPossiblyEvaluated = {
  "background-color": Color;
  "background-pattern": CrossFaded<ResolvedImage>;
  "background-opacity": number;
};
//#endregion
//#region src/style/style_layer/background_style_layer.d.ts
declare class BackgroundStyleLayer extends StyleLayer {
  _transitionablePaint: Transitionable<BackgroundPaintProps>;
  _transitioningPaint: Transitioning<BackgroundPaintProps>;
  paint: PossiblyEvaluated<BackgroundPaintProps, BackgroundPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
}
//#endregion
//#region src/webgl/draw/draw_background.d.ts
declare function drawBackground(painter: Painter, tileManager: TileManager, layer: BackgroundStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/webgl/draw/draw_debug.d.ts
declare function drawDebugPadding(frameRenderContext: FrameRenderContext): void;
declare function drawDebug(painter: Painter, tileManager: TileManager, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/style/style_layer/custom_style_layer.d.ts
/**
 * Type for an object literal that specifies a map tile.
 */
type UnwrappedTileIDLiteral = {
  /**
   * An optional wrap values.
   * Useful in scenarios when multiple world copies are visible, such as a zoomed out map or a map centered around the antimeridian.
   * Tiles from each world copy should have different wrap values, with wrap increasing for each copy from west to east.
   */
  wrap?: number;
  /**
   * The tile's XY coordinates and zoom level.
   */
  canonical: {
    x: number;
    y: number;
    z: number;
  };
};
/**
 * Parameters object for the {@link CustomRenderMethodInput.getProjectionData} function.
 * Contains the requested tile ID and more.
 */
type CustomLayerProjectionDataParams = {
  /**
   * The coordinates of the current tile.
   */
  tileID: UnwrappedTileIDLiteral | null;
  /**
   * Set to true if a pixel-aligned matrix should be used, if possible.
   * This flag is mostly used for raster tiles under mercator projection.
   */
  aligned?: boolean;
  /**
   * Set to true if the terrain matrix should be applied when pre-rendering tiles into textures for 3D terrain.
   */
  applyTerrainMatrix?: boolean;
  /**
   * Set to true if the globe matrix should be applied when using globe projection.
   */
  applyGlobeMatrix?: boolean;
};
/**
 * Input arguments exposed by custom render function.
 */
type CustomRenderMethodInput = {
  /**
   * This value represents the distance from the camera to the far clipping plane.
   * It is used in the calculation of the projection matrix to determine which objects are visible.
   * farZ should be larger than nearZ.
   */
  farZ: number;
  /**
   * This value represents the distance from the camera to the near clipping plane.
   * It is used in the calculation of the projection matrix to determine which objects are visible.
   * nearZ should be smaller than farZ.
   */
  nearZ: number;
  /**
   * Vertical field of view in radians.
   */
  fov: number;
  /**
   * Model view projection matrix.
   * Represents the matrix converting from world space to clip space.
   * https://learnopengl.com/Getting-started/Coordinate-Systems
   * **/
  modelViewProjectionMatrix: mat4;
  /**
   * Projection matrix.
   * Represents the matrix converting from view space to clip space.
   * https://learnopengl.com/Getting-started/Coordinate-Systems
   */
  projectionMatrix: mat4;
  /**
   * Data required for picking and compiling a custom shader for the current projection.
   */
  shaderData: {
    /**
     * Name of the shader variant that should be used.
     * Depends on current projection.
     * Whenever the other shader properties change, this string changes as well,
     * and can be used as a key with which to cache compiled shaders.
     */
    variantName: string;
    /**
     * The prelude code to add to the vertex shader to access MapLibre's `projectTile` projection function.
     * Depends on current projection.
     * @example
     * ```
     * const vertexSource = `#version 300 es
     * ${shaderData.vertexShaderPrelude}
     * ${shaderData.define}
     * in vec2 a_pos;
     * void main() {
     *     gl_Position = projectTile(a_pos);
     * }`;
     * ```
     */
    vertexShaderPrelude: string;
    /**
     * Defines to add to the shader code.
     * Depends on current projection.
     * @example
     * ```
     * const vertexSource = `#version 300 es
     * ${shaderData.vertexShaderPrelude}
     * ${shaderData.define}
     * in vec2 a_pos;
     * void main() {
     *     gl_Position = projectTile(a_pos);
     *     #ifdef GLOBE
     *     // Do globe-specific things
     *     #endif
     * }`;
     * ```
     */
    define: string;
  };
  /**
   * Uniforms that should be passed to the vertex shader, if MapLibre's projection code is used.
   * For more details of this object's internals, see its doc comments in `src/geo/projection/projection_data.ts`.
   *
   * These uniforms are set so that `projectTile` in shader accepts a vec2 in range 0..1 in web mercator coordinates.
   * Use `getProjectionData({overscaledTileID: tileID})` to get uniforms for a given tile and pass vec2 in tile-local range 0..EXTENT instead.
   *
   * For projection 3D features, use `projectTileFor3D` in the shader.
   *
   * If you just need a projection matrix, use `defaultProjectionData.mainMatrix`.
   * A projection matrix is sufficient for simple custom layers that only support mercator projection.
   *
   * Under mercator projection, when these uniforms are used, the shader's `projectTile` function projects spherical mercator
   * coordinates to gl clip space coordinates. The spherical mercator coordinate `[0, 0]` represents the
   * top left corner of the mercator world and `[1, 1]` represents the bottom right corner. When
   * the `renderingMode` is `"3d"`, the z coordinate is conformal. A box with identical x, y, and z
   * lengths in mercator units would be rendered as a cube. {@link MercatorCoordinate.fromLngLat}
   * can be used to project a `LngLat` to a mercator coordinate.
   *
   * Under globe projection, when these uniforms are used, the `elevation` parameter
   * passed to `projectTileFor3D` in the shader is elevation in meters above "sea level",
   * or more accurately for globe, elevation above the surface of the perfect sphere used to render the planet.
   */
  defaultProjectionData: CustomLayerProjectionData;
  /**
   * Generates a {@link ProjectionData} instance to be used while rendering a given tile.
   * In custom layers, this function is only needed when rendering tiles in a completely custom way and with shaders that are compatible with both projections.
   *
   * @see [Add a custom layer with tiles to a globe](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-custom-layer-with-tiles-to-a-globe)
   * @param params - Parameters for the projection data generation.
   */
  getProjectionData: (params: CustomLayerProjectionDataParams) => RendererProjectionData;
  /**
   * @experimental
   * Draws the elevation of the terrain as the map draws it into a texture, so that the layer can place many
   * objects on the ground on the GPU. Only set in {@link CustomLayerInterface.prerender}, while terrain is enabled.
   * Call it again after the camera moves, terrain tiles load or the terrain changes, and set up your WebGL state afterwards.
   */
  renderTerrainHeightMap?: (target: TerrainHeightMapTarget) => void;
};
/**
 * @param gl - The map's gl context.
 * @param options - Argument object with render inputs like camera properties.
 */
type CustomRenderMethod = (gl: WebGL2RenderingContext, options: CustomRenderMethodInput) => void;
/**
 * @experimental
 * Input for {@link CustomLayerInterface.renderToTerrainTile}.
 */
type CustomTerrainRenderInput = {
  /** The terrain tile to draw. */
  tileID: UnwrappedTileIDLiteral;
  /** The width of the tile's framebuffer in pixels. */
  width: number;
  /** The height of the tile's framebuffer in pixels. */
  height: number;
};
/**
 * Interface for custom style layers. This is a specification for
 * implementers to model: it is not an exported method or class.
 *
 * Custom layers allow a user to render directly into the map's GL context using the map's camera.
 * These layers can be added between any regular layers using {@link Map.addLayer}.
 *
 * Custom layers must have a unique `id` and must have the `type` of `"custom"`.
 * They must implement `render` and may implement `prerender`, `onAdd` and `onRemove`.
 * They can trigger rendering using {@link Map.triggerRepaint}
 * and they should appropriately handle {@link MapContextEvent} with `webglcontextlost` and `webglcontextrestored`.
 *
 * The `renderingMode` property controls whether the layer is treated as a `"2d"` or `"3d"` map layer. Use:
 *
 * - `"renderingMode": "3d"` to use the depth buffer and share it with other layers
 * - `"renderingMode": "2d"` to add a layer with no depth. If you need to use the depth buffer for a `"2d"` layer you must use an offscreen
 *   framebuffer and {@link CustomLayerInterface.prerender}
 *
 * @example
 * Custom layer implemented as ES6 class
 * ```ts
 * class NullIslandLayer {
 *     constructor() {
 *         this.id = 'null-island';
 *         this.type = 'custom';
 *         this.renderingMode = '2d';
 *     }
 *
 *      onAdd(map: maplibregl.Map, gl: WebGL2RenderingContext) {
 *         const vertexSource = `
 *         uniform mat4 u_matrix;
 *         void main() {
 *             gl_Position = u_matrix * vec4(0.5, 0.5, 0.0, 1.0);
 *             gl_PointSize = 20.0;
 *         }`;
 *
 *         const fragmentSource = `
 *         void main() {
 *             fragColor = vec4(1.0, 0.0, 0.0, 1.0);
 *         }`;
 *
 *         const vertexShader = gl.createShader(gl.VERTEX_SHADER);
 *         gl.shaderSource(vertexShader, vertexSource);
 *         gl.compileShader(vertexShader);
 *         const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
 *         gl.shaderSource(fragmentShader, fragmentSource);
 *         gl.compileShader(fragmentShader);
 *
 *         this.program = gl.createProgram();
 *         gl.attachShader(this.program, vertexShader);
 *         gl.attachShader(this.program, fragmentShader);
 *         gl.linkProgram(this.program);
 *     }
 *
 *     render({
 *      gl,
 *      modelViewProjectionMatrix: matrix
 *      }: {
 *      gl: WebGL2RenderingContext;
 *      modelViewProjectionMatrix: Float32Array;
 *      }) {
 *         gl.useProgram(this.program);
 *         gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
 *         gl.drawArrays(gl.POINTS, 0, 1);
 *     }
 * }
 *
 * map.on('load', () => {
 *     map.addLayer(new NullIslandLayer());
 * });
 * ```
 */
interface CustomLayerInterface {
  /**
   * A unique layer id.
   */
  id: string;
  /**
   * The layer's type. Must be `"custom"`.
   */
  type: "custom";
  /**
   * Either `"2d"` or `"3d"`. Defaults to `"2d"`.
   */
  renderingMode?: "2d" | "3d";
  /**
   * Called during a render frame allowing the layer to draw into the GL context.
   *
   * The layer can assume blending and depth state is set to allow the layer to properly
   * blend and clip other layers. The layer cannot make any other assumptions about the
   * current GL state.
   *
   * If the layer needs to render to a texture, it should implement the `prerender` method
   * to do this and only use the `render` method for drawing directly into the main framebuffer.
   *
   * The blend function is set to `gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`. This expects
   * colors to be provided in premultiplied alpha form where the `r`, `g` and `b` values are already
   * multiplied by the `a` value. If you are unable to provide colors in premultiplied form you
   * may want to change the blend function to
   * `gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`.
   */
  render: CustomRenderMethod;
  /**
   * Optional method called during a render frame to allow a layer to prepare resources or render into a texture.
   *
   * The layer cannot make any assumptions about the current GL state and must bind a framebuffer before rendering.
   */
  prerender?: CustomRenderMethod;
  /**
   * @experimental
   * Optional method called instead of `render` while terrain is enabled, to draw the layer into a terrain tile that
   * MapLibre drapes over the terrain with the fill, line and raster layers around the layer in the style.
   * Clip space `(-1, -1)` is the tile's south-west corner and `(1, 1)` its north-east corner. Draw over what the
   * framebuffer holds, with the same blending as `render` and without depth or stencil testing. MapLibre calls it
   * again when it redraws the tile, and after {@link CustomLayerInterface.terrainTileRevision} changes.
   */
  renderToTerrainTile?: (gl: WebGL2RenderingContext, options: CustomTerrainRenderInput) => void;
  /**
   * @experimental
   * Optional number that the layer changes when what it draws in {@link CustomLayerInterface.renderToTerrainTile}
   * changes, before calling {@link Map.triggerRepaint}, so that MapLibre draws the terrain tiles again.
   */
  terrainTileRevision?: number;
  /**
   * Optional method called when the layer has been added to the Map with {@link Map.addLayer}. This
   * gives the layer a chance to initialize gl resources and register event listeners.
   *
   * @param map - The Map this custom layer was just added to.
   * @param gl - The gl context for the map.
   */
  onAdd?(map: Map$1, gl: WebGL2RenderingContext): void;
  /**
   * Optional method called when the layer has been removed from the Map with {@link Map.removeLayer}. This
   * gives the layer a chance to clean up gl resources and event listeners.
   *
   * @param map - The Map this custom layer was just added to.
   * @param gl - The gl context for the map.
   */
  onRemove?(map: Map$1, gl: WebGL2RenderingContext): void;
}
declare class CustomStyleLayer extends StyleLayer {
  implementation: CustomLayerInterface;
  constructor(implementation: CustomLayerInterface, globalState: Record<string, any>);
  is3D(): boolean;
  hasOffscreenPass(): boolean;
  recalculate(): void;
  updateTransitions(): void;
  hasTransition(): boolean;
  serialize(): LayerSpecification;
  onAdd: (map: Map$1) => void;
  onRemove: (map: Map$1) => void;
}
//#endregion
//#region src/webgl/draw/draw_custom.d.ts
declare function drawCustom(painter: Painter, tileManager: TileManager, layer: CustomStyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/webgl/draw/draw_terrain.d.ts
/**
 * Redraw the Depth Framebuffer
 * @param painter - the painter
 * @param terrain - the terrain
 * @param frameRenderContext - shared state for the current render
 */
declare function drawDepth(painter: Painter, terrain: Terrain, frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/webgl/draw/draw_sky.d.ts
declare function drawSky(mesh: Mesh, frameRenderContext: FrameRenderContext): void;
declare function drawAtmosphere(mesh: Mesh, frameRenderContext: FrameRenderContext): void;
//#endregion
//#region src/webgl/draw/index.d.ts
type DrawFunctions = {
  symbol: typeof drawSymbols;
  circle: typeof drawCircles;
  heatmap: typeof drawHeatmap;
  line: typeof drawLine;
  fill: typeof drawFill;
  fillExtrusion: typeof drawFillExtrusion;
  hillshade: typeof drawHillshade;
  colorRelief: typeof drawColorRelief;
  raster: typeof drawRaster;
  background: typeof drawBackground;
  sky: typeof drawSky;
  atmosphere: typeof drawAtmosphere;
  custom: typeof drawCustom;
  debug: typeof drawDebug;
  debugPadding: typeof drawDebugPadding;
  terrainDepth: typeof drawDepth;
};
//#endregion
//#region src/render/pattern_atlas.d.ts
/**
 * A texture atlas of the pattern images that are drawn without a tile's own {@link ImageAtlas},
 * i.e. `background-pattern`. Entries are packed on demand and re-packed whenever one of them is
 * added or changes, which is rare enough for the repacking cost not to matter.
 */
declare class PatternAtlas {
  private _imageManager;
  private _entries;
  private _image;
  private _texture;
  private _dirty;
  constructor(imageManager: ImageManager);
  destroy(): void;
  getPixelSize(): {
    width: number;
    height: number;
  };
  /**
   * @returns the position of the pattern within the atlas, or `null` if there is no such image
   */
  getPattern(id: string): ImagePosition;
  /**
   * Checks whether a pattern image is needed, and if it is, whether it is not loaded.
   *
   * @returns true if a needed image is missing and rendering needs to be skipped.
   */
  isPatternMissing(image?: CrossFaded<ResolvedImage> | null): boolean;
  bind(context: Context): void;
  private _update;
}
//#endregion
//#region src/render/render_to_texture_interface.d.ts
/**
 * Interface for render-to-texture implementations.
 * The painter uses this interface — concrete implementations live in backend folders (webgl/, webgpu/).
 */
interface IRenderToTexture {
  /**
   * Whether the render loop needs a follow-up frame to refresh cached textures that were kept this frame:
   * textures rendered at another zoom, and stale textures beyond the per-frame budget.
   */
  needsFollowUpFrame: boolean;
  prepareForRender(style: Style, zoom: number, isMoving: boolean): void;
  renderLayer(layer: StyleLayer, style: Style, frameRenderContext: FrameRenderContext): boolean;
  getTexture(tile: Tile): any;
}
//#endregion
//#region src/render/painter.d.ts
/**
 * Holds the texture used to render a 2D tile so it can be draped over 3D
 * terrain. All RTTObjects share a single FBO owned by the Painter; the
 * texture is swapped in via `Painter.bindRTT` before each render pass.
 * Owned by a `Tile` while in use, recycled via `Painter.releaseRTT` when
 * the tile no longer needs it.
 */
type RTTObject = {
  texture: Texture;
  size: number;
};
/**
 * @internal
 * Initialize a new painter object.
 */
declare class Painter {
  drawFunctions: DrawFunctions;
  context: Context;
  renderToTexture: IRenderToTexture;
  _tileTextures: {
    [_: number]: Texture[];
  };
  /**
   * A pool of recyclable {@link RTTObject}s (textures only; the FBO is shared).
   */
  _rttObjectRecyclePool: RTTObject[];
  /**
   * Shared FBO used by all RTT render passes. The color attachment is
   * swapped to the target RTTObject's texture via {@link bindRTT}.
   * Created lazily on first use.
   */
  _rttSharedFbo: {
    fbo: Framebuffer;
    depthRenderbuffer: WebGLRenderbuffer;
    size: number;
  } | null;
  /**
   * Shared scratch FBO (color + depth-stencil) used by `{line,fill}-layer-opacity`.
   * The layer is rendered into this FBO, then composited into whatever framebuffer was previously bound
   * The canvas in the flat case, the per-terrain-tile RTT texture in the terrain case.
   * Resized in place to match the target dimensions.
   */
  layerOpacityFbo: Framebuffer | null;
  width: number;
  height: number;
  tileExtentBuffer: VertexBuffer;
  tileExtentSegments: SegmentVector;
  tileExtentMesh: Mesh;
  /** A quad covering the viewport in clip space, which the sky and the atmosphere are drawn on. */
  skyMesh: Mesh;
  debugBuffer: VertexBuffer;
  debugSegments: SegmentVector;
  rasterBoundsBuffer: VertexBuffer;
  rasterBoundsSegments: SegmentVector;
  viewportBuffer: VertexBuffer;
  viewportSegments: SegmentVector;
  quadTriangleIndexBuffer: IndexBuffer;
  tileBorderIndexBuffer: IndexBuffer;
  lineAtlas: LineAtlas;
  patternAtlas: PatternAtlas;
  programCache: ProgramCache;
  debugOverlayTexture: Texture;
  debugOverlayCanvas: HTMLCanvasElement;
  terrainFacilitator: {
    depthDirty: boolean;
    matrix: mat4;
    renderTime: number;
  };
  constructor(gl: WebGL2RenderingContext);
  resize(width: number, height: number, pixelRatio: number): void;
  setup(): void;
  /**
   * Fills the depth buffer with the geometry of all supplied tiles.
   * Does not change the color buffer or the stencil buffer.
   */
  _renderTilesDepthBuffer(frameRenderContext: FrameRenderContext): void;
  render(style: Style, transform: IReadonlyTransform, data: FrameRenderData): void;
  /**
   * Invalidates cached terrain depth so the next eligible depth pass redraws it.
   * DEM data can change the rendered surface while the camera and terrain tile set stay unchanged.
   * Repeated calls coalesce without rendering or scheduling a frame, even if terrain is not yet present.
   */
  markTerrainDepthDirty(): void;
  /**
   * Updates the depth framebuffer after explicit invalidation, camera movement, or tile reloading.
   */
  maybeDrawDepth(frameRenderContext: FrameRenderContext): void;
  renderLayer(painter: Painter, tileManager: TileManager, layer: StyleLayer, coords: OverscaledTileID[], frameRenderContext: FrameRenderContext): void;
  static readonly MAX_TEXTURE_POOL_SIZE_PER_BUCKET = 50;
  saveTileTexture(texture: Texture): void;
  getTileTexture(size: number): Texture;
  acquireRTT(size: number): RTTObject;
  /**
   * Binds the shared RTT FBO with the given RTTObject's texture attached
   * as color target. Creates / resizes the shared FBO and depth-stencil
   * renderbuffer lazily.
   */
  bindRTT(obj: RTTObject): void;
  releaseRTT(obj: RTTObject): void;
  /**
   * Destroys the pooled {@link RTTObject}s, the drapes no tile holds. Called at the end of a frame at rest,
   * when they would otherwise stay resident until the next gesture reuses them.
   */
  clearRTTPool(): void;
  /**
   * Frees the pooled drapes and the shared render-to-texture FBO. Called when terrain is removed, after its tiles
   * released their drapes.
   */
  destroyRTTResources(): void;
  setBaseState(): void;
  initDebugOverlayCanvas(): void;
  destroy(): void;
  overLimit(): boolean;
}
//#endregion
//#region src/symbol/projection.d.ts
/**
 * The result of projecting a point to the screen, with some additional information about the projection.
 */
type PointProjection = {
  /**
   * The projected point.
   */
  point: Point$1;
  /**
   * The original W component of the projection.
   */
  signedDistanceFromCamera: number;
  /**
   * For complex projections (such as globe), true if the point is occluded by the projection, such as by being on the backfacing side of the globe.
   * If the point is simply beyond the edge of the screen, this should NOT be set to false.
   */
  isOccluded: boolean;
};
type IndexToPointCache = {
  [lineIndex: number]: Point$1;
};
/**
 * @internal
 * We calculate label-plane projected points for line vertices as we place glyphs along the line
 * Since we will use the same vertices for potentially many glyphs, cache the results for this bucket
 * over the course of the render. Each vertex location also potentially has one offset equivalent
 * for us to hold onto. The vertex indices are per-symbol-bucket.
 */
type ProjectionCache = {
  /**
   * tile-unit vertices projected into label-plane units
   */
  projections: IndexToPointCache;
  /**
   * label-plane vertices which have been shifted to follow an offset line
   */
  offsets: IndexToPointCache;
  /**
   * Cached projected anchor point.
   */
  cachedAnchorPoint: Point$1 | undefined;
  /**
   * Was any projected point occluded by the map itself (eg. occluded by the planet when using globe projection).
   *
   * Viewport-pitched line-following texts where *any* of the line points is hidden behind the planet curve becomes entirely hidden.
   * This is perhaps not the most ideal behavior, but it works, it is simple and planetary-scale texts such as this seem to be a rare edge case.
   */
  anyProjectionOccluded: boolean;
};
/**
 * @internal
 * Arguments necessary to project a vertex to the label plane
 */
type SymbolProjectionContext = {
  /**
   * Used to cache results, save cost if projecting the same vertex multiple times
   */
  projectionCache: ProjectionCache;
  /**
   * The array of tile-unit vertices transferred from worker
   */
  lineVertexArray: SymbolLineVertexArray;
  /**
   * Matrix for transforming from pixels (symbol shaping) to potentially rotated tile units (pitched map label plane).
   */
  pitchedLabelPlaneMatrix: mat4;
  /**
   * Function to get elevation at a point, absent when the map has no terrain
   * @param x - the x coordinate
   * @param y - the y coordinate
   */
  getElevation: GetElevation | undefined;
  /**
   * The evaluated `symbol-height-offset` of the symbol being projected, in meters. Defaults to 0.
   */
  heightOffset?: number;
  /**
   * Whether `symbol-height-anchor` is `ground`, so that `heightOffset` is measured from the
   * terrain surface rather than from the zero elevation datum. Defaults to true.
   */
  heightAnchorGround?: boolean;
  /**
   * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera,
   * but still convenient to pass it inside this type.
   */
  tileAnchorPoint: Point$1;
  /**
   * True when line glyphs are projected onto the map, instead of onto the viewport.
   */
  pitchWithMap: boolean;
  transform: IReadonlyTransform;
  unwrappedTileID: UnwrappedTileID;
  /**
   * Viewport width.
   */
  width: number;
  /**
   * Viewport height.
   */
  height: number;
  /**
   * Translation in tile units, computed using text-translate and text-translate-anchor paint style properties.
   */
  translation: [number, number];
};
//#endregion
//#region src/geo/projection/covering_tiles_details_provider.d.ts
interface CoveringTilesDetailsProvider {
  /**
   * Returns the center that the tiles are selected around.
   */
  getCenter: (transform: IReadonlyTransform) => LngLat;
  /**
   * Returns the distance from the point to the tile
   * @param pointX - point x.
   * @param pointY - point y.
   * @param tileID - Tile x, y and z for zoom.
   * @param boundingVolume - tile bounding volume
   */
  distanceToTile2d: (pointX: number, pointY: number, tileID: {
    x: number;
    y: number;
    z: number;
  }, boundingVolume: IBoundingVolume) => number;
  /**
   * Returns the wrap value for a given tile.
   */
  getWrap: (centerCoord: MercatorCoordinate, tileID: {
    x: number;
    y: number;
    z: number;
  }, parentWrap: number) => number;
  /**
   * Returns the bounding volume of the specified tile.
   * @param tileID - Tile x, y and z for zoom.
   * @param wrap - wrap number of the tile.
   * @param elevation - camera center point elevation.
   * @param options - CoveringTilesOptions.
   */
  getTileBoundingVolume: (tileID: {
    x: number;
    y: number;
    z: number;
  }, wrap: number, elevation: number, options: CoveringTilesOptionsInternal) => IBoundingVolume;
  /**
   * Whether to allow variable zoom, which is used at high pitch angle to avoid loading an excessive amount of tiles.
   */
  allowVariableZoom: (transform: IReadonlyTransform, options: CoveringTilesOptionsInternal) => boolean;
  /**
   * Whether to allow world copies to be rendered.
   */
  allowWorldCopies: () => boolean;
  /**
   * Prepare cache for the next frame.
   */
  prepareNextFrame(): void;
}
//#endregion
//#region src/geo/transform_interface.d.ts
/**
 * Samples the terrain elevation, in meters, at a point given in tile coordinates.
 *
 * Implementations are bound to a specific tile, so `x` and `y` are interpreted within that tile.
 * A missing function means the map has no terrain, in which case callers treat the elevation as 0.
 *
 * @param x - the x coordinate within the tile
 * @param y - the y coordinate within the tile
 * @returns the terrain elevation in meters
 */
type GetElevation = (x: number, y: number) => number;
/**
 * The callback defining how the transform constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
 * @see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
 */
type TransformConstrainFunction = (lngLat: LngLat, zoom: number) => {
  center: LngLat;
  zoom: number;
};
interface ITransformGetters {
  get tileSize(): number;
  get tileZoom(): number;
  /**
   * How many times "larger" the world is compared to zoom 0. Usually computed as `pow(2, zoom)`.
   * Relevant mostly for mercator projection.
   */
  get scale(): number;
  /**
   * How many units the current world has. Computed by multiplying {@link worldSize} by {@link tileSize}.
   * Relevant mostly for mercator projection.
   */
  get worldSize(): number;
  /**
   * Gets the transform's width in pixels. Use {@link ITransform.resize} to set the transform's size.
   */
  get width(): number;
  /**
   * Gets the transform's height in pixels. Use {@link ITransform.resize} to set the transform's size.
   */
  get height(): number;
  get lngRange(): [number, number];
  get latRange(): [number, number];
  get minZoom(): number;
  get maxZoom(): number;
  get zoom(): number;
  get center(): LngLat;
  get minPitch(): number;
  get maxPitch(): number;
  /**
   * Roll in degrees.
   */
  get roll(): number;
  get rollInRadians(): number;
  /**
   * Pitch in degrees.
   */
  get pitch(): number;
  get pitchInRadians(): number;
  /**
   * Bearing in degrees.
   */
  get bearing(): number;
  get bearingInRadians(): number;
  /**
   * Vertical field of view in degrees.
   */
  get fov(): number;
  get fovInRadians(): number;
  get elevation(): number;
  get minElevationForCurrentTile(): number;
  get padding(): PaddingOptions;
  get unmodified(): boolean;
  get renderWorldCopies(): boolean;
  /**
   * The distance from the camera to the center of the map in pixels space.
   */
  get cameraToCenterDistance(): number;
  get nearZ(): number;
  get farZ(): number;
  get autoCalculateNearFarZ(): boolean;
  get constrainOverride(): TransformConstrainFunction;
}
/**
 * @internal
 * All the functions that may mutate a transform.
 */
interface ITransformMutators {
  clone(): ITransform;
  /**
   * Applies a transform to the current transform.
   * @param that - The transform to apply to the current transform.
   * @param constrain - Whether to constrain the transform's center and zoom and recompute internal matrices once applied.
   */
  apply(that: IReadonlyTransform, constrain: boolean): void;
  /**
   * Sets the transform's minimal allowed zoom level.
   * Automatically constrains the transform's zoom to the new range and recomputes internal matrices if needed.
   */
  setMinZoom(zoom: number): void;
  /**
   * Sets the transform's maximal allowed zoom level.
   * Automatically constrains the transform's zoom to the new range and recomputes internal matrices if needed.
   */
  setMaxZoom(zoom: number): void;
  /**
   * Sets the transform's minimal allowed pitch, in degrees.
   * Automatically constrains the transform's pitch to the new range and recomputes internal matrices if needed.
   */
  setMinPitch(pitch: number): void;
  /**
   * Sets the transform's maximal allowed pitch, in degrees.
   * Automatically constrains the transform's pitch to the new range and recomputes internal matrices if needed.
   */
  setMaxPitch(pitch: number): void;
  setRenderWorldCopies(renderWorldCopies: boolean): void;
  /**
   * Sets the transform's bearing, in degrees.
   * Recomputes internal matrices if needed.
   */
  setBearing(bearing: number): void;
  /**
   * Sets the transform's pitch, in degrees.
   * Recomputes internal matrices if needed.
   */
  setPitch(pitch: number): void;
  /**
   * Sets the transform's roll, in degrees.
   * Recomputes internal matrices if needed.
   */
  setRoll(roll: number): void;
  /**
   * Sets the transform's vertical field of view, in degrees.
   * Recomputes internal matrices if needed.
   */
  setFov(fov: number): void;
  /**
   * Sets the transform's zoom.
   * Automatically constrains the transform's center and zoom and recomputes internal matrices if needed.
   */
  setZoom(zoom: number): void;
  /**
   * Sets the transform's center.
   * Automatically constrains the transform's center and zoom and recomputes internal matrices if needed.
   */
  setCenter(center: LngLat): void;
  setElevation(elevation: number): void;
  setMinElevationForCurrentTile(elevation: number): void;
  setPadding(padding: PaddingOptions): void;
  /**
   * Sets the overriding values to use for near and far Z instead of what the transform would normally compute.
   * If set to undefined, the transform will compute its ideal values.
   * Calling this will set `autoCalculateNearFarZ` to false.
   */
  overrideNearFarZ(nearZ: number, farZ: number): void;
  /**
   * Resets near and far Z plane override. Sets `autoCalculateNearFarZ` to true.
   */
  clearNearFarZOverride(): void;
  /**
   * Sets the transform's width and height and recomputes internal matrices.
   */
  resize(width: number, height: number, constrainTransform: boolean): void;
  /**
   * Helper method to update edge-insets in place
   *
   * @param start - the starting padding
   * @param target - the target padding
   * @param t - the step/weight
   */
  interpolatePadding(start: PaddingOptions, target: PaddingOptions, t: number): void;
  /**
   * This method works in combination with freezeElevation activated.
   * freezeElevation is enabled during map-panning because during this the camera should sit in constant height.
   * After panning finished, call this method to recalculate the zoom level and center point for the current camera-height in current terrain.
   * @param terrain - the terrain
   */
  recalculateZoomAndCenter(terrain?: Terrain): void;
  /**
   * Set's the transform's center so that the given point on screen is at the given world coordinates.
   * @param lnglat - Desired world coordinates of the point.
   * @param point - The screen point that should lie at the given coordinates.
   * @param elevation - Optional ground elevation in meters above sea level at `lnglat`,
   * defaults to the elevation at the map's center. Ignored when rendering the globe.
   */
  setLocationAtPoint(lnglat: LngLat, point: Point$1, elevation?: number): void;
  /**
   * Sets or clears the map's geographical constraints.
   * @param bounds - A {@link LngLatBounds} object describing the new geographic boundaries of the map.
   */
  setMaxBounds(bounds?: LngLatBounds | null): void;
  /** Sets or clears the custom callback overriding the transform's default constrain,
   * whose responsibility is to respect the longitude and latitude bounds by constraining the viewport's lnglat and zoom.
   * @param constrain - A {@link TransformConstrainFunction} callback defining how the viewport should respect the bounds.
   */
  setConstrainOverride(constrain?: TransformConstrainFunction | null): void;
  /**
   * @internal
   * Called before rendering to allow the transform implementation
   * to precompute data needed to render the given tiles.
   * Used in mercator transform to precompute tile matrices (posMatrix).
   * @param coords - Array of tile IDs that will be rendered.
   */
  populateCache(coords: OverscaledTileID[]): void;
  /**
   * @internal
   * Sets the transform's transition state from one projection to another.
   * @param value - The transition state value.
   */
  setTransitionState(value: number): void;
}
/**
 * The camera placement {@link IReadonlyTransform.calculateCameraOptionsFromTo} solves for.
 */
type CameraOptionsFromTo = {
  center: LngLat;
  elevation: number;
  zoom: number;
  pitch: number;
  bearing: number;
};
/**
 * @internal
 * A variant of {@link ITransform} without any mutating functions.
 * Note that an instance of {@link IReadonlyTransform} may still be mutated
 * by code that has a reference to in under the {@link ITransform} type.
 */
interface IReadonlyTransform extends ITransformGetters {
  /**
   * Distance from camera origin to view plane, in pixels.
   * Calculated using vertical fov and viewport height.
   * Center is considered to be in the middle of the viewport.
   */
  get cameraToCenterDistance(): number;
  get modelViewProjectionMatrix(): mat4;
  get projectionMatrix(): mat4;
  /**
   * Inverse of matrix from camera space to clip space.
   */
  get inverseProjectionMatrix(): mat4;
  get pixelsToClipSpaceMatrix(): mat4;
  get clipSpaceToPixelsMatrix(): mat4;
  get pixelsToGLUnits(): [number, number];
  get centerOffset(): Point$1;
  /**
   * Gets the transform's width and height in pixels (viewport size). Use {@link resize} to set the transform's size.
   */
  get size(): Point$1;
  get rotationMatrix(): mat2;
  /**
   * The center of the screen in pixels with the top-left corner being (0,0)
   * and +y axis pointing downwards. This accounts for padding.
   */
  get centerPoint(): Point$1;
  /**
   * @internal
   */
  get pixelsPerMeter(): number;
  /**
   * @internal
   * Returns the camera's position transformed to be in the same space as 3D features under this transform's projection. Mostly used for globe + fill-extrusion.
   */
  get cameraPosition(): vec3;
  /**
   * Returns if the padding params match
   *
   * @param padding - the padding to check against
   * @returns true if they are equal, false otherwise
   */
  isPaddingEqual(padding: PaddingOptions): boolean;
  /**
   * @internal
   * Return any "wrapped" copies of a given tile coordinate that are visible
   * in the current view.
   */
  getVisibleUnwrappedCoordinates(tileID: CanonicalTileID): UnwrappedTileID[];
  /**
   * @internal
   * Return the camera frustum for the current view.
   */
  getCameraFrustum(): Frustum;
  /**
   * @internal
   * Return the clipping plane, behind which nothing should be rendered. If the camera frustum is sufficient
   * to describe the render geometry (additional clipping is not required), this may be null.
   */
  getClippingPlane(): vec4 | null;
  /**
   * @internal
   * Returns this transform's CoveringTilesDetailsProvider.
   */
  getCoveringTilesDetailsProvider(): CoveringTilesDetailsProvider;
  /**
   * @internal
   * Given a LngLat location, return the screen point that corresponds to it.
   * @param lnglat - location
   * @param terrain - optional terrain
   * @returns screen point
   */
  locationToScreenPoint(lnglat: LngLat, terrain?: Terrain): Point$1;
  /**
   * @internal
   * Given a point on screen, return its LngLat location.
   * @param p - screen point
   * @param terrain - optional terrain
   * @returns lnglat location
   */
  screenPointToLocation(p: Point$1, terrain?: Terrain): LngLat;
  /**
   * @internal
   * Given a point on screen, return its LngLat location assuming the ground there
   * lies at the given elevation. When rendering the globe the elevation is ignored.
   * @param p - screen point
   * @param elevation - ground elevation in meters above sea level
   * @returns lnglat location
   */
  screenPointToLocationAtElevation(p: Point$1, elevation: number): LngLat;
  /**
   * @internal
   * Given a point on screen, return its mercator coordinate.
   * @param p - the point
   * @param terrain - optional terrain
   * @returns lnglat
   */
  screenPointToMercatorCoordinate(p: Point$1, terrain?: Terrain): MercatorCoordinate;
  /**
   * @internal
   * Given a point on screen, return the mercator coordinate where its ray hits the rendered terrain surface.
   * @param p - the point
   * @param terrain - the terrain
   * @returns the hit with z in meters, or null when the terrain has no renderable tiles or the ray never crosses the terrain surface
   */
  screenTerrainPointToMercatorCoordinate(p: Point$1, terrain: Terrain): MercatorCoordinate | null;
  /**
   * @internal
   * Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not
   * an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
   * @returns Returns a {@link LngLatBounds} object describing the map's geographical bounds.
   */
  getBounds(): LngLatBounds;
  /**
   * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
   * @returns max bounds
   */
  getMaxBounds(): LngLatBounds | null;
  /**
   * @internal
   * Returns whether the specified screen point lies on the map.
   * May return false if, for example, the point is above the map's horizon, or if doesn't lie on the planet's surface if globe is enabled.
   * @param p - The point's coordinates.
   * @param terrain - Optional terrain.
   */
  isPointOnMapSurface(p: Point$1, terrain?: Terrain): boolean;
  /**
   * @internal
   * The tranform's default callback that ensures that longitude and latitude bounds are respected by the viewport.
   */
  defaultConstrain: TransformConstrainFunction;
  /**
   * Constrain the center lngLat and zoom to ensure that longitude and latitude bounds are respected and regions beyond the map bounds are not displayed.
   */
  applyConstrain: TransformConstrainFunction;
  maxPitchScaleFactor(): number;
  /**
   * The camera looks at the map from a 3D (lng, lat, altitude) location. Let's use `cameraLocation`
   * as the name for the location under the camera and on the surface of the earth (lng, lat, 0).
   * `cameraPoint` is the projected position of the `cameraLocation`.
   *
   * This point is useful to us because only fill-extrusions that are between `cameraPoint` and
   * the query point on the surface of the earth can extend and intersect the query.
   *
   * When the map is not pitched the `cameraPoint` is equivalent to the center of the map because
   * the camera is right above the center of the map.
   */
  getCameraPoint(): Point$1;
  /**
   * The altitude of the camera above the sea level in meters.
   */
  getCameraAltitude(): number;
  /**
   * The longitude and latitude of the camera.
   */
  getCameraLngLat(): LngLat;
  /**
   * Given the camera position (lng, lat, alt), calculate the center point and zoom level
   * @param lngLat - lng, lat of the camera
   * @param alt - altitude of the camera above sea level, in meters
   * @param bearing - bearing of the camera, in degrees
   * @param pitch - pitch angle of the camera, in degrees
   */
  calculateCenterFromCameraLngLatAlt(lngLat: LngLatLike, alt: number, bearing?: number, pitch?: number): {
    center: LngLat;
    elevation: number;
    zoom: number;
  };
  /**
   * Given the camera position and the point it looks at, both as lng, lat and altitude above sea level in meters,
   * calculate the center, elevation, zoom, pitch and bearing that place the camera there.
   * @param from - lng, lat of the camera
   * @param altitudeFrom - altitude of the camera above sea level, in meters
   * @param to - lng, lat of the point the camera looks at, which becomes the center
   * @param altitudeTo - altitude of that point above sea level, in meters
   * @throws when the camera and the point coincide
   */
  calculateCameraOptionsFromTo(from: LngLatLike, altitudeFrom: number, to: LngLatLike, altitudeTo: number): CameraOptionsFromTo;
  getRayDirectionFromPixel(p: Point$1): vec3;
  /**
   * When the map is pitched, some of the 3D features that intersect a query will not intersect
   * the query at the surface of the earth. Instead the feature may be closer and only intersect
   * the query because it extrudes into the air.
   * @param queryGeometry - For point queries, the line from the query point to the "camera point",
   * for other geometries, the envelope of the query geometry and the "camera point"
   * @returns a geometry that includes all of the original query as well as all possible ares of the
   * screen where the *base* of a visible extrusion could be.
   *
   */
  getCameraQueryGeometry(queryGeometry: Point$1[]): Point$1[];
  /**
   * @internal
   * Calculate the fogMatrix that, given a tile coordinate, would be used to calculate fog on the map.
   * Currently only supported in mercator projection.
   * @param unwrappedTileID - the tile ID
   */
  calculateFogMatrix(unwrappedTileID: UnwrappedTileID): mat4;
  /**
   * @internal
   * Generates a `ProjectionData` instance to be used while rendering the supplied tile.
   * @param params - Parameters for the projection data generation.
   */
  getProjectionData(params: ProjectionDataParams): RendererProjectionData;
  /**
   * @internal
   * Whether the camera cannot see a location. The planet hides it when the location, at its elevation, lies beyond
   * the globe's horizon plane, the plane the globe shaders clip an elevated vertex with. With `terrain`, the terrain
   * hides it when the ray from the camera to the location meets the rendered terrain surface
   * (see {@link screenTerrainPointToMercatorCoordinate}) before it reaches the location, and a location behind the
   * camera or beyond the far plane is hidden too.
   * @param lngLat - the location
   * @param terrain - the terrain that can hide the location; without it only the planet can
   * @param elevation - the location's elevation in meters; the terrain's elevation there when omitted, zero without terrain. `Marker` raises its center with it
   * @returns true when the planet or the terrain lies between the camera and the location, false when the location is
   * in view. Terrain with no renderable tiles hides nothing.
   */
  isLocationOccluded(lngLat: LngLat, terrain?: Terrain, elevation?: number): boolean;
  /**
   * @internal
   */
  getPixelScale(): number;
  /**
   * @internal
   * Allows the projection to adjust the radius of `circle-pitch-alignment: 'map'` circles and heatmap kernels based on the map's latitude.
   * Circle radius and heatmap kernel radius is multiplied by this value.
   */
  getCircleRadiusCorrection(): number;
  /**
   * @internal
   * Allows the projection to adjust the scale of `text-pitch-alignment: 'map'` symbols's collision boxes based on the map's center and the text anchor.
   * Only affects the collision boxes (and click areas), scaling of the rendered text is mostly handled in shaders.
   * @param transform - The map's transform, with only the `center` property, describing the map's longitude and latitude.
   * @param textAnchorX - Text anchor position inside the tile, X axis.
   * @param textAnchorY - Text anchor position inside the tile, Y axis.
   * @param tileID - The tile coordinates.
   */
  getPitchedTextCorrection(textAnchorX: number, textAnchorY: number, tileID: UnwrappedTileID): number;
  /**
   * @internal
   * Returns light direction transformed to be in the same space as 3D features under this projection. Mostly used for globe + fill-extrusion.
   * @param transform - Current map transform.
   * @param dir - The light direction.
   * @returns A new vector with the transformed light direction.
   */
  transformLightDirection(dir: vec3): vec3;
  /**
   * @internal
   * Projects a point in tile coordinates to clip space. Used in symbol rendering.
   */
  projectTileCoordinates(x: number, y: number, unwrappedTileID: UnwrappedTileID, elevation?: number): PointProjection;
  /**
   * Return projection data such that coordinates in mercator projection in range 0..1 will get projected to the map correctly.
   */
  getProjectionDataForCustomLayer(applyGlobeMatrix: boolean): CustomLayerProjectionData;
  /**
   * Returns a tile-specific projection matrix. Used for symbol placement fast-path for mercator transform.
   */
  getFastPathSimpleProjectionMatrix(tileID: OverscaledTileID): mat4 | undefined;
}
/**
 * @internal
 * The transform stores everything needed to project or otherwise transform points on a map,
 * including most of the map's view state - center, zoom, pitch, etc.
 * A transform is cloneable, which is used when a given map state must be retained for multiple frames, mostly during symbol placement.
 */
interface ITransform extends IReadonlyTransform, ITransformMutators {}
//#endregion
//#region src/source/query_features.d.ts
/**
 * Options to pass to query the map for the rendered features
 */
type QueryRenderedFeaturesOptions = {
  /**
   * An array or set of [style layer IDs](https://maplibre.org/maplibre-style-spec/#layer-id) for the query to inspect.
   * Only features within these layers will be returned. If this parameter is undefined, all layers will be checked.
   */
  layers?: string[] | Set<string>;
  /**
   * A [filter](https://maplibre.org/maplibre-style-spec/layers/#filter) to limit query results.
   */
  filter?: FilterSpecification;
  /**
   * An array of string representing the available images
   */
  availableImages?: string[];
  /**
   * Whether to check if the `options.filter` conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
   */
  validate?: boolean;
};
/**
 * @internal
 * A version of QueryRenderedFeaturesOptions used internally
 */
type QueryRenderedFeaturesOptionsStrict = Omit<QueryRenderedFeaturesOptions, "layers"> & {
  layers: Set<string> | null;
  globalState?: Record<string, any>;
};
/**
 * The options object related to the {@link Map.querySourceFeatures} method
 */
type QuerySourceFeatureOptions = {
  /**
   * The name of the source layer to query. *For vector tile sources, this parameter is required.* For GeoJSON sources, it is ignored.
   */
  sourceLayer?: string;
  /**
   * A [filter](https://maplibre.org/maplibre-style-spec/layers/#filter)
   * to limit query results.
   */
  filter?: FilterSpecification;
  /**
   * Whether to check if the `parameters.filter` conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
   * @defaultValue true
   */
  validate?: boolean;
};
/**
 * @internal
 * A version of QuerySourceFeatureOptions used internally
 */
type QuerySourceFeatureOptionsStrict = QuerySourceFeatureOptions & {
  globalState?: Record<string, any>;
};
type QueryRenderedFeaturesResults = {
  [key: string]: QueryRenderedFeaturesResultsItem[];
};
type QueryRenderedFeaturesResultsItem = QueryResultsItem & {
  feature: MapGeoJSONFeature;
};
//#endregion
//#region src/webgl/rtt_fingerprint.d.ts
/**
 * What a render-to-texture tile's textures differ in from the state this frame would render them from,
 * least to most severe: `zoom` (the same layers and source tiles, evaluated at another zoom), `sourceTiles`
 * (other source tiles under the terrain tile), `visibleLayers` (a layer entered or left its zoom range) and
 * `revision` (the source data changed, or the textures were rendered without this source).
 *
 * @internal
 */
declare const RTT_DIFFERENCES: readonly ["none", "zoom", "sourceTiles", "visibleLayers", "revision"];
type RTTDifference = typeof RTT_DIFFERENCES[number];
/**
 * Immutable value describing the state a render-to-texture tile's textures were rendered from: the source
 * tiles drawn into them, the source data revision, the map zoom (zoom-dependent style properties are
 * evaluated then) and the ids of the layers visible at that zoom.
 *
 * @internal
 */
declare class RTTFingerprint {
  private readonly _tileKeys;
  private readonly _revision;
  private readonly _zoom;
  private readonly _visibleLayerIds;
  constructor(coords: OverscaledTileID[], revision: number, zoom: number, visibleLayerIds: string);
  /**
   * The most severe difference between this fingerprint and the one the textures were rendered from,
   * `none` when they match. A missing fingerprint counts as a revision difference.
   */
  difference(other: RTTFingerprint | undefined): RTTDifference;
}
//#endregion
//#region src/tile/tile.d.ts
/**
 * The tile's state, can be:
 *
 * - `loading` Tile data is in the process of loading.
 * - `loaded` Tile data has been loaded. Tile can be rendered.
 * - `reloading` Tile data has been loaded and is being updated. Tile can be rendered.
 * - `unloaded` Tile data has been deleted.
 * - `errored` Tile data was not loaded because of an error.
 * - `expired` Tile data was previously loaded, but has expired per its HTTP headers and is in the process of refreshing.
 */
type TileState = "loading" | "loaded" | "reloading" | "unloaded" | "errored" | "expired";
/** @internal */
type CrossFadeArgs = {
  fadingRole: FadingRoles;
  fadingDirection: FadingDirections;
  fadingParentID?: OverscaledTileID;
  fadeEndTime: number;
};
declare enum FadingRoles {
  Base = 0,
  Parent = 1
}
declare enum FadingDirections {
  Departing = 0,
  Incoming = 1
}
/**
 * A tile object is the combination of a Coordinate, which defines
 * its place, as well as a unique ID and data tracking for its content
 */
declare class Tile {
  tileID: OverscaledTileID;
  uid: number;
  uses: number;
  tileSize: number;
  buckets: {
    [_: string]: Bucket;
  };
  latestFeatureIndex: FeatureIndex | null;
  latestRawTileData: ArrayBuffer;
  latestEncoding: TileEncoding;
  imageAtlas: ImageAtlas;
  imageAtlasTexture: Texture;
  dashPositions: {
    [_: string]: DashEntry;
  };
  glyphAtlasImage: AlphaImage;
  glyphAtlasTexture: Texture;
  etag?: string;
  expirationTime: any;
  expiredRequestCount: number;
  state: TileState;
  fadingRole: FadingRoles;
  fadingDirection: FadingDirections;
  fadingParentID: OverscaledTileID;
  selfFading: boolean;
  timeAdded: number;
  fadeEndTime: number;
  fadeOpacity: number;
  collisionBoxArray: CollisionBoxArray;
  redoWhenDone: boolean;
  showCollisionBoxes: boolean;
  placementSource: any;
  actor: Actor;
  vtLayers: {
    [_: string]: VectorTileLayerLike;
  };
  neighboringTiles: Record<string, {
    backfilled: boolean;
  }>;
  dem: DEMData;
  demMatrix: mat4;
  aborted: boolean;
  needsHillshadePrepare: boolean;
  needsTerrainPrepare: boolean;
  needsColorReliefPrepare: boolean;
  abortController: AbortController;
  texture: any;
  fbo: Framebuffer;
  demTexture: Texture;
  refreshedUponExpiration: boolean;
  reloadPromise: {
    resolve: () => void;
    reject: () => void;
  };
  resourceTiming: PerformanceResourceTiming[];
  queryPadding: number;
  symbolFadeHoldUntil: number;
  hasSymbolBuckets: boolean;
  hasRTLText: boolean;
  dependencies: any;
  /**
   * @internal
   * Caches the result of rendering this 2D tile into a texture so it can be
   * draped over 3D terrain. Indexed by stack index, where a stack is a
   * contiguous run of RTT-eligible layers (fill, line, raster, etc.) split
   * by non-RTT layers like symbols. So `_rttObjects[0]` holds the texture
   * for layers below the first symbol break, `_rttObjects[1]` for layers
   * between the first and second symbol breaks, and so on. Each entry
   * survives across frames until the tile is unloaded or its source data
   * changes.
   */
  rttObjects: Array<RTTObject | undefined>;
  rttFingerprint: Record<string, RTTFingerprint>;
  featureStateRevision: number;
  /**
   * @param tileID - the tile ID
   * @param size - The tile size
   */
  constructor(tileID: OverscaledTileID, size: number);
  /**
   * Incoming and self-fading raster tiles must remain renderable at zero opacity because
   * drawing advances their opacity. Only transparent departing tiles have finished fading.
   */
  isRenderable(symbolLayer: boolean): boolean;
  /**
   * @internal
   * Many-to-one crossfade between a base tile and parent/ancestor tile (when zooming)
   */
  setCrossFadeLogic({ fadingRole, fadingDirection, fadingParentID, fadeEndTime }: CrossFadeArgs): void;
  /**
   * Self fading for edge tiles (when panning map)
   */
  setSelfFadeLogic(fadeEndTime: number): void;
  resetFadeLogic(): void;
  wasRequested(): boolean;
  clearTextures(painter: Painter): void;
  /**
   * @internal
   * Returns the cached RTT object for this stack, or undefined on a cache miss.
   */
  getRTT(stack: number): RTTObject | undefined;
  /**
   * @internal
   * Allocates a fresh RTT object from the painter's pool and stores it at the
   * given stack slot. Callers should check {@link getRTT} first; calling this
   * over an existing slot leaks the previous object.
   */
  acquireRTT(painter: Painter, stack: number, size: number): RTTObject;
  /**
   * @internal
   * Returns all cached RTT slots to the painter's pool.
   */
  releaseRTT(painter: Painter): void;
  /**
   * Given a data object with a 'buffers' property, load it into
   * this tile's elementGroups and buffers properties and set loaded
   * to true. If the data is null, like in the case of an empty
   * GeoJSON tile, no-op but still set loaded to true.
   * @param data - The data from the worker
   * @param style - the style the tile's layers belong to
   * @param justReloaded - `true` to just reload
   */
  loadVectorData(data: WorkerTileResult, style: Style, justReloaded?: boolean | null): void;
  /**
   * Release any data or WebGL resources referenced by this tile.
   */
  unloadVectorData(): void;
  getBucket(layer: StyleLayer): Bucket;
  upload(context: Context): void;
  prepare(imageManager: ImageManager): void;
  queryRenderedFeatures(layers: {
    [_: string]: StyleLayer;
  }, serializedLayers: {
    [_: string]: any;
  }, sourceFeatureState: SourceFeatureState, queryGeometry: Point$1[], cameraQueryGeometry: Point$1[], scale: number, params: Pick<QueryRenderedFeaturesOptionsStrict, "filter" | "layers" | "availableImages"> | undefined, transform: IReadonlyTransform, maxPitchScaleFactor: number, pixelPosMatrix: mat4, getElevation: GetElevation | undefined): QueryResults;
  querySourceFeatures(result: GeoJSONFeature[], params?: QuerySourceFeatureOptionsStrict): void;
  hasData(): boolean;
  patternsLoaded(): boolean;
  setExpiryData(data: ExpiryData): void;
  getExpiryTimeout(): number;
  setFeatureState(states: LayerFeatureStates, style: Style, revision: number): void;
  holdingForSymbolFade(): boolean;
  symbolFadeFinished(): boolean;
  clearSymbolFadeHold(): void;
  setSymbolHoldDuration(duration: number): void;
  setDependencies(namespace: string, dependencies: string[]): void;
  hasDependency(namespaces: string[], keys: string[]): boolean;
}
//#endregion
//#region src/source/source_state.d.ts
type FeatureStateEntry = {
  id: string;
  state: FeatureState;
};
type FeatureStates = FeatureStateEntry[];
type LayerFeatureStates = Record<string, FeatureStates>;
type FeatureStatesMap = Record<string, FeatureState>;
type LayerFeatureStatesMap = Record<string, FeatureStatesMap>;
/**
 * @internal
 * SourceFeatureState manages the state and pending changes
 * to features in a source, separated by source layer.
 * stateChanges and deletedStates batch all changes to the tile (updates and removes, respectively)
 * between coalesce() events. addFeatureState() and removeFeatureState() also update their counterpart's
 * list of changes, such that coalesce() can apply the proper state changes while agnostic to the order of operations.
 * In deletedStates, all null's denote complete removal of state at that scope
 */
declare class SourceFeatureState {
  state: LayerFeatureStatesMap;
  stateChanges: LayerFeatureStatesMap;
  deletedStates: {};
  revision: number;
  constructor();
  updateState(sourceLayer: string, featureId: number | string, newState: any): void;
  removeFeatureState(sourceLayer: string, featureId?: number | string, key?: string): void;
  getState(sourceLayer: string, featureId: number | string): FeatureState;
  initializeTileState(tile: Tile, style: Style): void;
  coalesceChanges(inViewTiles: InViewTiles, style: Style): void;
}
//#endregion
//#region src/data/feature_index.d.ts
type QueryParameters = {
  scale: number;
  pixelPosMatrix: mat4;
  transform: IReadonlyTransform;
  tileSize: number;
  queryGeometry: Point$1[];
  cameraQueryGeometry: Point$1[];
  queryPadding: number;
  getElevation: GetElevation | undefined;
  params: {
    filter?: FilterSpecification;
    layers?: Set<string> | null;
    availableImages?: string[];
    globalState?: Record<string, any>;
  };
};
type QueryResults = {
  [_: string]: QueryResultsItem[];
};
type QueryResultsItem = {
  featureIndex: number;
  feature: GeoJSONFeature;
  intersectionZ?: boolean | number;
};
/**
 * An in memory index class to allow fast interaction with features
 */
declare class FeatureIndex {
  tileID: OverscaledTileID;
  x: number;
  y: number;
  z: number;
  grid: TransferableGridIndex;
  grid3D: TransferableGridIndex;
  featureIndexArray: FeatureIndexArray;
  promoteId?: PromoteIdSpecification;
  encoding: TileEncoding;
  rawTileData: ArrayBuffer;
  bucketLayerIDs: string[][];
  vtLayers: {
    [_: string]: VectorTileLayerLike;
  };
  sourceLayerCoder: DictionaryCoder;
  constructor(tileID: OverscaledTileID, promoteId?: PromoteIdSpecification | null);
  insert(feature: VectorTileFeatureLike, geometry: Point$1[][], featureIndex: number, sourceLayerIndex: number, bucketIndex: number, is3D?: boolean): void;
  loadVTLayers(): {
    [_: string]: VectorTileLayerLike;
  };
  query(args: QueryParameters, styleLayers: {
    [_: string]: StyleLayer;
  }, serializedLayers: {
    [_: string]: any;
  }, sourceFeatureState: SourceFeatureState): QueryResults;
  loadMatchingFeature(result: QueryResults, bucketIndex: number, sourceLayerIndex: number, featureIndex: number, filter: FeatureFilter, filterLayerIDs: Set<string> | undefined, availableImages: string[], styleLayers: {
    [_: string]: StyleLayer;
  }, serializedLayers: {
    [_: string]: any;
  }, sourceFeatureState?: SourceFeatureState, intersectionTest?: (feature: VectorTileFeatureLike, styleLayer: StyleLayer, featureState: any, id: string | number | void) => boolean | number): void;
  lookupSymbolFeatures(symbolFeatureIndexes: number[], serializedLayers: {
    [_: string]: StyleLayer;
  }, bucketIndex: number, sourceLayerIndex: number, filterParams: {
    filterSpec: FilterSpecification;
    globalState: Record<string, any>;
  }, filterLayerIDs: Set<string> | null, availableImages: string[], styleLayers: {
    [_: string]: StyleLayer;
  }): QueryResults;
  hasLayer(id: string): boolean;
  getId(feature: VectorTileFeatureLike, sourceLayerId: string): string | number;
}
//#endregion
//#region src/data/bucket.d.ts
type BucketParameters<Layer extends TypedStyleLayer> = {
  index: number;
  layers: Layer[];
  zoom: number;
  pixelRatio: number;
  overscaling: number;
  collisionBoxArray: CollisionBoxArray;
  sourceLayerIndex: number;
  sourceID: string;
};
type PopulateParameters = {
  featureIndex: FeatureIndex;
  iconDependencies: Record<string, boolean>;
  patternDependencies: Record<string, boolean>;
  /**
   * The glyphs each fontstack is asked for, keyed by grapheme cluster: usually a single character,
   * but sometimes a letter with the marks written on it, which no single codepoint stands for.
   * Glyphs are requested separately for each variant.
   * @example
   * ```json
   * {"SomeFontName": {"default": {"a": true, "b": true}}}
   * ```
   */
  glyphDependencies: Record<string, Record<string, Record<string, boolean>>>;
  dashDependencies: Record<string, {
    round: boolean;
    dasharray: number[];
  }>;
  availableImages: string[];
  subdivisionGranularity: SubdivisionGranularitySetting;
};
/**
 * The asynchronously loaded tile content a bucket may need to finalize its
 * features. Every image, glyph, and dash entry referenced by the bucket's
 * layers arrives here after the worker has fetched it; pattern maps belong to
 * fill, fill-extrusion, and line buckets, icon maps and glyph maps to symbol
 * buckets.
 */
type BucketDependencyParameters = {
  options: PopulateParameters;
  canonical: CanonicalTileID;
  glyphMap: GlyphMap;
  glyphPositions: GlyphPositions;
  iconMap: GetImagesResponse;
  iconPositions: Record<string, ImagePosition>;
  patternMap: GetImagesResponse;
  patternPositions: Record<string, ImagePosition>;
  dashPositions: Record<string, DashEntry>;
  showCollisionBoxes: boolean;
};
type IndexedFeature = {
  feature: VectorTileFeatureLike;
  id: number | string;
  index: number;
  sourceLayerIndex: number;
};
type BucketFeature = {
  index: number;
  sourceLayerIndex: number;
  geometry: Point$1[][];
  properties: any;
  type: 0 | 1 | 2 | 3;
  id?: any;
  readonly patterns: {
    [_: string]: {
      "min": string;
      "mid": string;
      "max": string;
    };
  };
  readonly dashes?: NonNullable<Feature["dashes"]>;
  sortKey?: number;
};
/**
 * @hidden
 * The `Bucket` interface is the single point of knowledge about turning vector
 * tiles into WebGL buffers.
 *
 * `Bucket` is an abstract interface. An implementation exists for each style layer type.
 * Create a bucket via the `StyleLayer.createBucket` method.
 *
 * The concrete bucket types, using layout options from the style layer,
 * transform feature geometries into vertex and index data for use by the
 * vertex shader.  They also (via `ProgramConfiguration`) use feature
 * properties and the zoom level to populate the attributes needed for
 * data-driven styling.
 *
 * Buckets are designed to be built on a worker thread and then serialized and
 * transferred back to the main thread for rendering.  On the worker side, a
 * bucket's vertex, index, and attribute data is stored in `bucket.arrays: ArrayGroup`.
 * When a bucket's data is serialized and sent back to the main thread,
 * is gets deserialized (using `new Bucket(serializedBucketData)`, with
 * the array data now stored in `bucket.buffers: BufferGroup`. BufferGroups
 * hold the same data as ArrayGroups, but are tuned for consumption by WebGL.
 */
interface Bucket {
  layerIds: string[];
  hasDependencies: boolean;
  readonly layers: any[];
  readonly stateDependentLayers: any[];
  readonly stateDependentLayerIds: string[];
  populate(features: IndexedFeature[], options: PopulateParameters, canonical: CanonicalTileID): void;
  addFeatures(parameters: BucketDependencyParameters): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions: Record<string, DashEntry>): void;
  isEmpty(): boolean;
  upload(context: Context): void;
  uploadPending(): boolean;
  /**
   * Release the WebGL resources associated with the buffers. Note that because
   * buckets are shared between layers having the same layout properties, they
   * must be destroyed in groups (all buckets for a tile, or all symbol buckets).
   */
  destroy(): void;
}
//#endregion
//#region src/data/bucket/circle_bucket.d.ts
/**
 * @internal
 * Circles are represented by two triangles.
 *
 * Each corner has a pos that is the center of the circle and an extrusion
 * vector that is where it points.
 */
declare class CircleBucket<Layer extends CircleStyleLayer | HeatmapStyleLayer> implements Bucket {
  index: number;
  zoom: number;
  overscaling: number;
  layerIds: string[];
  layers: Layer[];
  stateDependentLayers: Layer[];
  stateDependentLayerIds: string[];
  layoutVertexArray: CircleLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<Layer>;
  segments: SegmentVector;
  uploaded: boolean;
  constructor(options: BucketParameters<Layer>);
  populate(features: IndexedFeature[], options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  addFeatures(_parameters: BucketDependencyParameters): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  addFeature(feature: BucketFeature, geometry: Point$1[][], index: number, canonical: CanonicalTileID, granularity?: CircleGranularity): void;
}
//#endregion
//#region src/style/style_layer/circle_style_layer_properties.g.d.ts
type CircleLayoutProps = {
  "circle-sort-key": DataDrivenProperty<number>;
};
type CircleLayoutPropsPossiblyEvaluated = {
  "circle-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
type CirclePaintProps = {
  "circle-radius": DataDrivenProperty<number>;
  "circle-color": DataDrivenProperty<Color>;
  "circle-blur": DataDrivenProperty<number>;
  "circle-opacity": DataDrivenProperty<number>;
  "circle-translate": DataConstantProperty<[number, number]>;
  "circle-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "circle-pitch-scale": DataConstantProperty<"map" | "viewport">;
  "circle-pitch-alignment": DataConstantProperty<"map" | "viewport">;
  "circle-stroke-width": DataDrivenProperty<number>;
  "circle-stroke-color": DataDrivenProperty<Color>;
  "circle-stroke-opacity": DataDrivenProperty<number>;
};
type CirclePaintPropsPossiblyEvaluated = {
  "circle-radius": PossiblyEvaluatedPropertyValue<number>;
  "circle-color": PossiblyEvaluatedPropertyValue<Color>;
  "circle-blur": PossiblyEvaluatedPropertyValue<number>;
  "circle-opacity": PossiblyEvaluatedPropertyValue<number>;
  "circle-translate": [number, number];
  "circle-translate-anchor": "map" | "viewport";
  "circle-pitch-scale": "map" | "viewport";
  "circle-pitch-alignment": "map" | "viewport";
  "circle-stroke-width": PossiblyEvaluatedPropertyValue<number>;
  "circle-stroke-color": PossiblyEvaluatedPropertyValue<Color>;
  "circle-stroke-opacity": PossiblyEvaluatedPropertyValue<number>;
};
//#endregion
//#region src/style/style_layer/circle_style_layer.d.ts
/**
 * A style layer that defines a circle
 */
declare class CircleStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<CircleLayoutProps>;
  layout: PossiblyEvaluated<CircleLayoutProps, CircleLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<CirclePaintProps>;
  _transitioningPaint: Transitioning<CirclePaintProps>;
  paint: PossiblyEvaluated<CirclePaintProps, CirclePaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  createBucket(parameters: BucketParameters<any>): CircleBucket<any>;
  queryRadius(bucket: Bucket): number;
  queryIntersectsFeature({ queryGeometry, feature, featureState, geometry, transform, pixelsToTileUnits, unwrappedTileID, getElevation }: QueryIntersectsFeatureParams): boolean;
}
//#endregion
//#region src/style/style_layer/typed_style_layer.d.ts
type TypedStyleLayer = CircleStyleLayer | FillStyleLayer | FillExtrusionStyleLayer | HeatmapStyleLayer | HillshadeStyleLayer | ColorReliefStyleLayer | LineStyleLayer | SymbolStyleLayer;
//#endregion
//#region src/data/program_configuration.d.ts
type BinderUniform = {
  name: string;
  property: string;
  binding: Uniform<any>;
};
type PaintOptions = {
  imagePositions: {
    [_: string]: ImagePosition;
  };
  dashPositions?: {
    [_: string]: DashEntry;
  };
  canonical?: CanonicalTileID;
  formattedSection?: FormattedSection;
  globalState?: Record<string, any>;
};
/**
 *  `Binder` is the interface definition for the strategies for constructing,
 *  uploading, and binding paint property data as GLSL attributes. Most style-
 *  spec properties have a 1:1 relationship to shader attribute/uniforms, but
 *  some require multiple values per feature to be passed to the GPU, and in
 *  those cases we bind multiple attributes/uniforms.
 *
 *  It has three implementations, one for each of the three strategies we use:
 *
 *  * For _constant_ properties -- those whose value is a constant, or the constant
 *    result of evaluating a camera expression at a particular camera position -- we
 *    don't need a vertex attribute buffer, and instead use a uniform.
 *  * For data expressions, we use a vertex buffer with a single attribute value,
 *    the evaluated result of the source function for the given feature.
 *  * For composite expressions, we use a vertex buffer with two attributes: min and
 *    max values covering the range of zooms at which we expect the tile to be
 *    displayed. These values are calculated by evaluating the composite expression for
 *    the given feature at strategically chosen zoom levels. In addition to this
 *    attribute data, we also use a uniform value which the shader uses to interpolate
 *    between the min and max value at the final displayed zoom level. The use of a
 *    uniform allows us to cheaply update the value on every frame.
 *
 *  Note that the shader source varies depending on whether we're using a uniform or
 *  attribute. We dynamically compile shaders at runtime to accommodate this.
 */
interface AttributeBinder {
  populatePaintArray(length: number, feature: Feature, options: PaintOptions): void;
  updatePaintArray(start: number, length: number, feature: Feature, featureState: FeatureState, options: PaintOptions): void;
  upload(a: Context): void;
  destroy(): void;
}
interface UniformBinder {
  uniformNames: string[];
  setUniform(uniform: Uniform<any>, globals: GlobalProperties, currentValue: PossiblyEvaluatedPropertyValue<any>, uniformName: string): void;
  getBinding(context: Context, location: WebGLUniformLocation, name: string): Partial<Uniform<any>>;
}
/**
 * @internal
 * ProgramConfiguration contains the logic for binding style layer properties and tile
 * layer feature data into GL program uniforms and vertex attributes.
 *
 * Non-data-driven property values are bound to shader uniforms. Data-driven property
 * values are bound to vertex attributes. In order to support a uniform GLSL syntax over
 * both, the [shaders](../shaders/README.md) define a `#pragma` abstraction, which
 * ProgramConfiguration is responsible for implementing. At runtime,
 * it examines the attributes of a particular layer, combines this with fixed knowledge
 * about how layers of the particular type are implemented, and determines which uniforms
 * and vertex attributes will be required. It can then substitute the appropriate text
 * into the shader source code, create and link a program, and bind the uniforms and
 * vertex attributes in preparation for drawing.
 *
 * When a vector tile is parsed, this same configuration information is used to
 * populate the attribute buffers needed for data-driven styling using the zoom
 * level and feature property data.
 */
declare class ProgramConfiguration {
  binders: {
    [_: string]: AttributeBinder | UniformBinder;
  };
  cacheKey: string;
  _buffers: VertexBuffer[];
  constructor(layer: TypedStyleLayer, zoom: number, filterProperties: (_: string) => boolean);
  getMaxValue(property: string): number;
  populatePaintArrays(newLength: number, feature: Feature, options: PaintOptions): void;
  setConstantPatternPositions(posTo: ImagePosition, posFrom: ImagePosition): void;
  setConstantDashPositions(dashTo: DashEntry, dashFrom: DashEntry): void;
  updatePaintArrays(featureStates: FeatureStates, featureMap: FeaturePositionMap, vtLayer: VectorTileLayerLike, layer: TypedStyleLayer, options: PaintOptions): boolean;
  defines(): string[];
  getBinderAttributes(): string[];
  getBinderUniforms(): string[];
  getPaintVertexBuffers(): VertexBuffer[];
  getUniforms(context: Context, locations: UniformLocations): BinderUniform[];
  setUniforms(context: Context, binderUniforms: BinderUniform[], properties: any, globals: GlobalProperties): void;
  updatePaintBuffers(crossfade?: CrossfadeParameters): void;
  upload(context: Context): void;
  destroy(): void;
}
declare class ProgramConfigurationSet<Layer extends TypedStyleLayer> {
  programConfigurations: {
    [_: string]: ProgramConfiguration;
  };
  needsUpload: boolean;
  _featureMap: FeaturePositionMap;
  _bufferOffset: number;
  constructor(layers: readonly Layer[], zoom: number, filterProperties?: (_: string) => boolean);
  populatePaintArrays(length: number, feature: Feature, index: number, options: PaintOptions): void;
  updatePaintArrays(featureStates: FeatureStates, vtLayer: VectorTileLayerLike, layers: readonly TypedStyleLayer[], options: PaintOptions): void;
  get(layerId: string): ProgramConfiguration;
  upload(context: Context): void;
  destroy(): void;
}
//#endregion
//#region src/webgl/cull_face_mode.d.ts
declare class CullFaceMode {
  enable: boolean;
  mode: CullFaceModeType;
  frontFace: FrontFaceType;
  constructor(enable: boolean, mode: CullFaceModeType, frontFace: FrontFaceType);
  static disabled: Readonly<CullFaceMode>;
  /**
   * The standard GL cull mode. Culls backfacing triangles when counterclockwise vertex order is used.
   * Use for 3D geometry such as terrain.
   */
  static backCCW: Readonly<CullFaceMode>;
  /**
   * Opposite of {@link backCCW}. Culls front-facing triangles when counterclockwise vertex order is used.
   */
  static frontCCW: Readonly<CullFaceMode>;
}
//#endregion
//#region src/webgl/program.d.ts
type DrawMode = WebGLRenderingContextBase["LINES"] | WebGLRenderingContextBase["TRIANGLES"] | WebGL2RenderingContext["LINE_STRIP"];
type ProgramAttribute = {
  location: number;
  isInteger: boolean;
};
/**
 * @internal
 * A webgl program to execute in the GPU space
 */
declare class Program<Us extends UniformBindings> {
  program: WebGLProgram;
  attributes: {
    [_: string]: ProgramAttribute;
  };
  numAttributes: number;
  fixedUniforms: Us;
  terrainUniforms: TerrainPreludeUniformsType;
  binderUniforms: BinderUniform[];
  failedToCreate: boolean;
  constructor(context: Context, source: PreparedShader, configuration: ProgramConfiguration, fixedUniforms: (b: Context, a: UniformLocations) => Us, showOverdrawInspector: boolean, useTerrain: boolean, projectionPrelude: PreparedShader, projectionDefine: string, extraDefines?: string[]);
  draw(context: Context, drawMode: DrawMode, depthMode: Readonly<DepthMode>, stencilMode: Readonly<StencilMode>, colorMode: Readonly<ColorMode>, cullFaceMode: Readonly<CullFaceMode>, uniformValues: UniformValues<Us>, terrain: TerrainData, projectionData: ProjectionData, layerID: string, layoutVertexBuffer: VertexBuffer, indexBuffer: IndexBuffer, segments: SegmentVector, currentProperties?: any, zoom?: number | null, configuration?: ProgramConfiguration | null, dynamicLayoutBuffer?: VertexBuffer | null, dynamicLayoutBuffer2?: VertexBuffer | null, dynamicLayoutBuffer3?: VertexBuffer | null): void;
}
//#endregion
//#region src/webgl/vertex_buffer.d.ts
/**
 * @internal
 * The `VertexBuffer` class turns a `StructArray` into a WebGL buffer. Each member of the StructArray's
 * Struct type is converted to a WebGL attribute.
 */
declare class VertexBuffer {
  length: number;
  attributes: readonly StructArrayMember[];
  itemSize: number;
  dynamicDraw: boolean;
  context: Context;
  buffer: WebGLBuffer;
  /**
   * @param dynamicDraw - Whether this buffer will be repeatedly updated.
   */
  constructor(context: Context, array: StructArray, attributes: readonly StructArrayMember[], dynamicDraw?: boolean);
  bind(): void;
  updateData(array: StructArray): void;
  enableAttributes(gl: WebGL2RenderingContext, program: Program<any>): void;
  /**
   * Set the attribute pointers in a WebGL context
   * @param gl - The WebGL context
   * @param program - The active WebGL program
   * @param vertexOffset - Index of the starting vertex of the segment
   */
  setVertexAttribPointers(gl: WebGL2RenderingContext, program: Program<any>, vertexOffset?: number | null): void;
  /**
   * Destroy the GL buffer bound to the given WebGL context
   */
  destroy(): void;
}
//#endregion
//#region src/webgl/uniform_buffer.d.ts
type Std140Layout = {
  offsets: Record<string, number>;
  contentWords: number;
  sizeWords: number;
};
/**
 * @internal
 * The buffer behind one std140 uniform block, bound to a fixed binding point. Callers write members into
 * `pending` at the layout's offsets and call `upload`, which skips the GPU write when nothing changed. Uploads
 * use `bufferData` because Apple's OpenGL driver stalls a `bufferSubData` into a buffer a pending draw still reads (#8468).
 */
declare class UniformBuffer {
  context: Context;
  buffer: WebGLBuffer;
  binding: number;
  contentWords: number;
  uploaded: Float32Array;
  pending: Float32Array;
  uploadedWords: Uint32Array;
  pendingWords: Uint32Array;
  hasData: boolean;
  constructor(context: Context, binding: number, layout: Std140Layout);
  upload(): void;
  /** Restores the indexed binding after external rendering without uploading unchanged data. */
  bind(): void;
  destroy(): void;
}
//#endregion
//#region src/webgl/context.d.ts
type ClearArgs = {
  color?: Color;
  depth?: number;
  stencil?: number;
};
/**
 * @internal
 * A webgl wrapper class to allow injection, mocking and abstraction
 */
declare class Context {
  gl: WebGL2RenderingContext;
  currentNumAttributes: number;
  maxTextureSize: number;
  clearColor: ClearColor;
  clearDepth: ClearDepth;
  clearStencil: ClearStencil;
  colorMask: ColorMask;
  depthMask: DepthMask;
  stencilMask: StencilMask;
  stencilFunc: StencilFunc;
  stencilOp: StencilOp;
  stencilTest: StencilTest;
  depthRange: DepthRange;
  depthTest: DepthTest;
  depthFunc: DepthFunc;
  blend: Blend;
  blendFunc: BlendFunc;
  blendColor: BlendColor;
  blendEquation: BlendEquation;
  cullFace: CullFace;
  cullFaceSide: CullFaceSide;
  frontFace: FrontFace;
  program: ProgramValue;
  activeTexture: ActiveTextureUnit;
  viewport: Viewport;
  bindFramebuffer: BindFramebuffer;
  bindRenderbuffer: BindRenderbuffer;
  bindTexture: BindTexture;
  bindVertexBuffer: BindVertexBuffer;
  bindElementBuffer: BindElementBuffer;
  bindVertexArray: BindVertexArray;
  pixelStoreUnpack: PixelStoreUnpack;
  pixelStoreUnpackPremultiplyAlpha: PixelStoreUnpackPremultiplyAlpha;
  pixelStoreUnpackFlipY: PixelStoreUnpackFlipY;
  boundUniformBuffers: WebGLBuffer[];
  projectionUniformBuffer: UniformBuffer;
  keyedProjectionUniformBuffers: Map<string, UniformBuffer>;
  freeProjectionUniformBuffers: UniformBuffer[];
  terrainUniformBuffer: UniformBuffer;
  frameUniformBuffer: UniformBuffer;
  extTextureFilterAnisotropic: EXT_texture_filter_anisotropic | null;
  extTextureFilterAnisotropicMax?: GLfloat;
  constructor(gl: WebGL2RenderingContext);
  /** Destroys the uniform buffers the context created. */
  destroy(): void;
  setDefault(): void;
  setDirty(): void;
  /**
   * Reset some GL state to default values before handing users the raw context, as we do for
   * custom layers and WebGL style images, to avoid hard-to-debug bugs in their code.
   *
   * MapLibre restores all of its own state afterwards, so the only state worth resetting first
   * is state users would be surprised to find dirty: `CULL_FACE`, `TEXTURE0` and the three
   * `UNPACK_` settings, whose defaults are meaningful enough that most code assumes them.
   * The vertex array is unbound rather than reset, so that MapLibre never has to track it and
   * a user's `vertexAttribPointer` calls cannot land on one of ours.
   */
  setCustomLayerDefaults(): void;
  createIndexBuffer(array: TriangleIndexArray | LineIndexArray | LineStripIndexArray, dynamicDraw?: boolean): IndexBuffer;
  createVertexBuffer(array: StructArray, attributes: readonly StructArrayMember[], dynamicDraw?: boolean): VertexBuffer;
  createRenderbuffer(storageFormat: number, width: number, height: number): WebGLRenderbuffer;
  createFramebuffer(width: number, height: number, hasDepth: boolean, hasStencil: boolean): Framebuffer;
  clear({ color, depth, stencil }: ClearArgs): void;
  setCullFace(cullFaceMode: Readonly<CullFaceMode>): void;
  setDepthMode(depthMode: Readonly<DepthMode>): void;
  setStencilMode(stencilMode: Readonly<StencilMode>): void;
  setColorMode(colorMode: Readonly<ColorMode>): void;
  createVertexArray(): WebGLVertexArrayObject | undefined;
  deleteVertexArray(x: WebGLVertexArrayObject | undefined): void;
  unbindVAO(): void;
}
//#endregion
//#region src/webgl/texture.d.ts
type TextureFormat = WebGLRenderingContextBase["RGBA"] | WebGLRenderingContextBase["ALPHA"];
type TextureFilter = WebGLRenderingContextBase["LINEAR"] | WebGLRenderingContextBase["LINEAR_MIPMAP_NEAREST"] | WebGLRenderingContextBase["LINEAR_MIPMAP_LINEAR"] | WebGLRenderingContextBase["NEAREST"];
type TextureWrap = WebGLRenderingContextBase["REPEAT"] | WebGLRenderingContextBase["CLAMP_TO_EDGE"] | WebGLRenderingContextBase["MIRRORED_REPEAT"];
type EmptyImage = {
  width: number;
  height: number;
  data: null;
};
type DataTextureImage = RGBAImage | AlphaImage | EmptyImage;
type TextureImage = TexImageSource | DataTextureImage;
/**
 * @internal
 * A `Texture` GL related object
 */
declare class Texture {
  context: Context;
  size: [number, number];
  texture: WebGLTexture;
  format: TextureFormat;
  magFilter: TextureFilter;
  minFilter: TextureFilter;
  wrap: TextureWrap;
  useMipmap: boolean;
  /** Tracks the original handle to detect corruption after context loss (#2811) */
  private _ownedHandle;
  constructor(context: Context, image: TextureImage, format: TextureFormat, options?: {
    premultiply?: boolean;
    useMipmap?: boolean;
  } | null);
  update(image: TextureImage, options?: {
    premultiply?: boolean;
    useMipmap?: boolean;
  } | null, position?: {
    x: number;
    y: number;
  }): void;
  private _uploadDomImage;
  private _uploadRawData;
  private _updateDomImage;
  private _updateRawData;
  bind(magFilter: TextureFilter, wrap: TextureWrap, minFilter?: TextureFilter | null): void;
  /**
   * Builds the mip chain after the texture was drawn into as a framebuffer attachment.
   * An allocation without pixels (`data: null`) gets no chain from `update`, so a render target is built once, here, after the draw.
   */
  generateMipmap(): void;
  destroy(): void;
}
//#endregion
//#region src/tile/terrain_tile_manager.d.ts
/**
 * @internal
 * This class is a helper for the Terrain-class, it:
 *
 * - loads raster-dem tiles
 * - manages all renderToTexture tiles.
 * - caches previous rendered tiles.
 * - finds all necessary renderToTexture tiles for a OverscaledTileID area
 * - finds the corresponding raster-dem tile for OverscaledTileID
 */
declare class TerrainTileManager extends Evented {
  /**
   * tile manager for the raster-dem source.
   */
  tileManager: TileManager;
  /**
   * stores all render-to-texture tiles.
   */
  _tiles: {
    [_: string]: Tile;
  };
  /**
   * contains a list of tileID-keys for the current scene. (only for performance)
   */
  _renderableTilesKeys: string[];
  /**
   * raster-dem-tile for a TileID cache.
   */
  _sourceTileCache: {
    [_: string]: string;
  };
  /**
   * minimum zoomlevel to render the terrain.
   */
  minzoom: number;
  /**
   * maximum zoomlevel to render the terrain.
   */
  maxzoom: number;
  /**
   * render-to-texture tileSize in scene.
   */
  tileSize: number;
  /**
   * raster-dem tiles will load for performance the actualZoom - deltaZoom zoom-level.
   */
  deltaZoom: number;
  /**
   * used to determine whether the depth framebuffer needs updating
   */
  _lastTilesetChange: number;
  constructor(tileManager: TileManager);
  destruct(): void;
  getSource(): Source;
  /**
   * Load Terrain Tiles, create internal render-to-texture tiles, free GPU memory.
   * @param transform - the operation to do
   * @param terrain - the terrain
   * @returns true when the set of renderable tiles changed
   */
  update(transform: ITransform, terrain: Terrain): boolean;
  /**
   * Release the RTT objects for `tileID` (and its ancestors/descendants),
   */
  releaseRTT(tileID: OverscaledTileID): void;
  /**
   * Release the A RTT objects for all tiles.
   */
  releaseAllRTT(): void;
  /**
   * get a list of tiles, which are loaded and should be rendered in the current scene
   * @returns the renderable tiles
   */
  getRenderableTiles(): Tile[];
  /**
   * get terrain tile by the TileID key
   * @param id - the tile id
   * @returns the tile
   */
  getTileByID(id: string): Tile;
  /**
   * Searches for the corresponding current renderable terrain-tiles
   * @param tileID - the tile to look for
   * @returns the tiles that were found
   */
  getTerrainCoords(tileID: OverscaledTileID, terrainTileRanges?: {
    [zoom: string]: CanonicalTileRange;
  }): Record<string, OverscaledTileID>;
  /**
   * Searches for the corresponding current renderable terrain-tiles.
   * Includes terrain tiles that are either:
   * - the same as the tileID
   * - a parent of the tileID
   * - a child of the tileID
   * @param tileID - the tile to look for
   * @returns the tiles that were found
   */
  _getTerrainCoordsForRegularTile(tileID: OverscaledTileID): Record<string, OverscaledTileID>;
  /**
   * Searches for the corresponding current renderable terrain-tiles.
   * Includes terrain tiles that are within terrain tile ranges.
   * @param tileID - the tile to look for
   * @returns the tiles that were found
   */
  _getTerrainCoordsForTileRanges(tileID: OverscaledTileID, terrainTileRanges: {
    [zoom: string]: CanonicalTileRange;
  }): Record<string, OverscaledTileID>;
  /**
   * find the covering raster-dem tile
   * @param tileID - the tile to look for
   * @param searchForDEM - Optional parameter to search for (parent) source tiles with loaded dem.
   * @returns the tile
   */
  getSourceTile(tileID: OverscaledTileID, searchForDEM?: boolean): Tile | undefined;
  findTileInCaches(key: string): Tile | undefined;
  /**
   * gets whether any tiles were loaded after a specific time. This is used to update the depth framebuffer.
   * @param time - the time
   * @returns true if any tiles came into view at or after the specified time
   */
  anyTilesAfterTime(time?: number): boolean;
  /**
   * Checks whether a tile is within the canonical tile ranges.
   * @param tileID - Tile to check
   * @param canonicalTileRanges - Canonical tile ranges
   * @returns
   */
  private _isWithinTileRanges;
}
//#endregion
//#region src/render/terrain_coverage.d.ts
type TerrainElevationSampler = (x: number, y: number, extent: number) => number;
type TerrainCoverageIndex = {
  zooms: number[];
  samplerPerTile: Map<string, TerrainElevationSampler | null>;
  minElevation: number;
  maxElevation: number;
};
/**
 * The drawn terrain tiles' DEM data as sampled on the CPU: an index of their elevation samplers, built on first use
 * and kept until {@link reset} (the renderable tile set changed, or the terrain source), in two views: every drawn
 * tile's DEM data, a loaded parent's where the tile's own has not loaded, or only the tiles' own.
 * @param tileManager - the terrain source's tiles, drawn and loaded
 * @param exaggeration - the terrain's exaggeration, which every sampled elevation includes
 */
declare class TerrainCoverage {
  private readonly tileManager;
  private readonly exaggeration;
  private _samplerCache;
  /** undefined means not built yet; null that no terrain tile is renderable. */
  private _index;
  private _ownDemIndex;
  constructor(tileManager: TerrainTileManager, exaggeration: number);
  /** Drops the samplers and both indexes. Missing DEM data is never cached, so a later sample can retry. */
  reset(): void;
  /**
   * @param ownDemOnly - whether a tile whose own DEM data has not loaded has none, though a loaded parent's is drawn
   * in its place
   * @returns the index, or null when no terrain tile is renderable
   */
  getIndex(ownDemOnly?: boolean): TerrainCoverageIndex | null;
  /**
   * The elevation the drawn tiles' DEM data gives at a location, in respect of exaggeration, or undefined where no
   * drawn tile has that data.
   */
  sample(lnglat: LngLat, ownDemOnly?: boolean): number | undefined;
  /** The cached sampler of a tile's raw DEM elevation, or null when its DEM data is not loaded. */
  getSampler(tileID: OverscaledTileID): TerrainElevationSampler | null;
  /**
   * A function that samples a tile's raw DEM elevation, without exaggeration, or null when the tile's DEM data is
   * not loaded. The DEM tile is the tile's own or a loaded parent's, so the tile's coordinates are scaled and offset
   * into it, as {@link Terrain._getDEMTileMatrix} does for the renderer; the sampler places DEM pixels at cell
   * centres, matching `get_elevation` in the vertex shader prelude.
   */
  private _createElevationSampler;
  private _build;
}
//#endregion
//#region src/render/terrain.d.ts
/**
 * @experimental
 * A float texture for {@link CustomRenderMethodInput.renderTerrainHeightMap}, such as `RGBA32F`, which needs the
 * `EXT_color_buffer_float` extension to be drawn into. Red holds the elevation in meters, including the terrain exaggeration, alpha
 * is 1 where terrain is loaded and 0 elsewhere, and the first row is the south edge.
 */
type TerrainHeightMapTarget = {
  /** A texture in the map's WebGL context. */
  texture: WebGLTexture;
  /** The width of the texture in pixels. */
  width: number;
  /** The height of the texture in pixels. */
  height: number;
  /** The area to draw, `[minX, minY, maxX, maxY]` in {@link MercatorCoordinate} units, with x counting world copies. */
  bounds: [number, number, number, number];
};
/**
 * @internal
 * A terrain GPU related object
 */
type TerrainData = {
  "u_depth": number;
  "u_terrain": number;
  "u_terrain_dim": number;
  "u_terrain_matrix": mat4;
  "u_terrain_unpack": number[];
  "u_terrain_exaggeration": number;
  texture: WebGLTexture;
  depthTexture: WebGLTexture;
  tile: Tile;
};
/**
 * @internal
 * This is the main class which handles most of the 3D Terrain logic. It has the following topics:
 *
 * 1. loads raster-dem tiles via the internal tileManager this.tileManager
 * 2. creates a depth-framebuffer, which is used to calculate the visibility of coordinates
 * 3. stores all render-to-texture tiles in the this.tileManager._tiles
 * 4. calculates the elevation for a specific tile-coordinate
 * 5. creates a terrain-mesh
 *
 * A note about the GPU resource-usage:
 *
 * Framebuffers:
 *
 * - one for the depth framebuffer with the size of the map-div.
 * - one for rendering a tile to texture with the size of tileSize (= 512x512).
 *
 * Textures:
 *
 * - one texture for an empty raster-dem tile with size 1x1
 * - one texture for an empty depth-buffer, when terrain is disabled with size 1x1
 * - one texture for an each loaded raster-dem with size of the source.tileSize
 * - one texture for the depth-framebuffer with the size of the map-div.
 * - finally for each render-to-texture tile (= this._tiles) a set of textures
 * for each render stack (The stack-concept is documented in painter.ts).
 *
 * Normally there exists 1-3 Textures per tile, depending on the stylesheet.
 * Each Textures has the size 2*tileSize (= 1024x1024). Also there exists a
 * cache of the last 150 newest rendered tiles.
 *
 */
declare class Terrain {
  /**
   * The style this terrain corresponds to
   */
  painter: Painter;
  /**
   * the tilemanager this terrain is based on
   */
  tileManager: TerrainTileManager;
  /**
   * the TerrainSpecification object passed to this instance
   */
  options: TerrainSpecification;
  /**
   * define the meshSize per tile.
   */
  meshSize: number;
  /**
   * multiplicator for the elevation. Used to make terrain more "extreme".
   */
  exaggeration: number;
  /**
   * to not see pixels in the render-to-texture tiles it is good to render them bigger
   * this number is the multiplicator (must be a power of 2) for the current tileSize.
   * So to get good results with not too much memory footprint a value of 2 should be fine.
   */
  qualityFactor: number;
  /**
   * holds the framebuffer object in size of the screen to render the depth into a texture.
   */
  _fbo: Framebuffer;
  _heightMapFbo: Framebuffer;
  _fboDepthTexture: Texture;
  _emptyDepthTexture: Texture;
  /**
   * GL Objects for the terrain-mesh
   * The mesh is a regular mesh, which has the advantage that it can be reused for all tiles.
   */
  _meshCache: {
    [key: string]: Mesh;
  };
  /**
   * variables for an empty dem texture, which is used while the raster-dem tile is loading.
   */
  _emptyDemUnpack: number[];
  _emptyDemTexture: Texture;
  _emptyDemMatrix: mat4;
  /**
   * as of overzooming of raster-dem tiles in high zoomlevels, this cache contains
   * matrices to transform from vector-tile coords to raster-dem-tile coords.
   */
  _demMatrixCache: Map<string, mat4>;
  /** The drawn tiles' DEM data as sampled on the CPU, see {@link TerrainCoverage}. */
  coverage: TerrainCoverage;
  /**
   * Controls how terrain skirt length is calculated.
   * @see {@link MapOptions.terrainSkirtLength}
   */
  _terrainSkirtLength: "none" | "auto";
  constructor(painter: Painter, tileManager: TileManager, options: TerrainSpecification, terrainSkirtLength?: "none" | "auto");
  destroy(): void;
  /**
   * Get the elevation-value from original dem-data for a given tile-coordinate.
   * Coordinates that fall outside `[0, extent)` are normalized to the
   * appropriate neighbor tile before lookup.
   * @param tileID - the tile to get the elevation for
   * @param x - x coordinate relative to the tile, may be outside `[0, extent)`
   * @param y - y coordinate relative to the tile, may be outside `[0, extent)`
   * @param extent - optional, default 8192
   * @returns the elevation
   */
  getDEMElevation(tileID: OverscaledTileID, x: number, y: number, extent?: number): number;
  /**
   * Get the elevation for given {@link LngLat} in respect of exaggeration.
   * @param lnglat - the location
   * @param zoom - the zoom, use {@link getElevationForLngLat} if you don't want a specific zoom level, but more accurate results.
   * @returns the elevation
   */
  getElevationForLngLatZoom(lnglat: LngLat, zoom: number): number;
  /**
   * Get the elevation for given {@link LngLat} in respect of exaggeration.
   * Where the location is covered by a rendered tile with loaded DEM data this samples the
   * rendered surface, so the result agrees with what is drawn; elsewhere it traverses up the
   * zoom levels to find the first tile with data to return.
   * @param lnglat - the location
   * @returns the elevation
   */
  getElevationForLngLat(lnglat: LngLat, transform: IReadonlyTransform): number;
  /**
   * Get the elevation of the terrain as drawn at the given {@link LngLat}, in respect of exaggeration, where a drawn
   * tile has DEM data there: its own, or with `ownDemOnly` false a loaded parent's drawn in its place, which can be
   * a few hundred meters off until the tile's own loads.
   * @param lnglat - the location
   * @param ownDemOnly - whether only a drawn tile's own DEM data counts
   * @returns the elevation, or undefined where no drawn tile has that DEM data
   */
  getDrawnElevationForLngLat(lnglat: LngLat, ownDemOnly?: boolean): number | undefined;
  /**
   * Whether {@link getElevationForLngLat} finds DEM data at the given {@link LngLat}, drawn or in the tile it falls
   * back to, rather than giving 0 for want of any.
   * @param lnglat - the location
   * @param transform - the transform {@link getElevationForLngLat} is given
   * @returns true where a drawn tile or the fallback tile has DEM data, its own or a loaded parent's
   */
  hasElevationForLngLat(lnglat: LngLat, transform: IReadonlyTransform): boolean;
  /**
   * The zoom {@link getElevationForLngLat} passes to {@link getElevationForLngLatZoom} where no drawn tile has DEM
   * data: the transform's tile zoom, where the terrain's tiles are loaded.
   */
  private _getFallbackZoom;
  /**
   * Get the elevation for given coordinate in respect of exaggeration.
   * @param tileID - the tile id
   * @param x - x coordinate relative to the tile, may be outside `[0, extent)`
   * @param y - y coordinate relative to the tile, may be outside `[0, extent)`
   * @param extent - optional, default 8192
   * @returns the elevation
   */
  getElevation(tileID: OverscaledTileID, x: number, y: number, extent?: number): number;
  /**
   * Clear the CPU samplers of the drawn tiles' DEM data, which may retain a previously selected DEM tile.
   * @internal
   */
  resetElevationCache(): void;
  /**
   * Index of the tiles the terrain currently renders, for sampling the terrain surface on the CPU.
   * @returns the index, or null when no terrain tile is renderable
   */
  getCoverageIndex(): TerrainCoverageIndex | null;
  /**
   * Get the matrix that maps a tile's coordinates into the DEM tile it is rendered with.
   * The transform is derived from the loaded DEM tile's own zoom level, not from the source's
   * declared maxzoom: getSourceTile falls back to a loaded parent tile while the deepest DEM
   * tile is still loading, and the scale and offset must match the tile that is actually used.
   * @param tileID - the tile id
   * @param sourceTile - the DEM tile that is used for this tile, either its own tile or a loaded parent
   * @returns the matrix that maps the tile's coordinates onto the DEM tile
   */
  _getDEMTileMatrix(tileID: OverscaledTileID, sourceTile: Tile): mat4;
  /**
   * returns a Terrain Object for a tile. Unless the tile corresponds to data (e.g. tile is loading), return a flat dem object
   * @param tileID - the tile to get the terrain for
   * @returns the terrain data to use in the program
   */
  getTerrainData(tileID: OverscaledTileID): TerrainData;
  /**
   * get a framebuffer as big as the map-div, which will be used to render depth into a texture
   * @returns the frame buffer
   */
  getFramebuffer(): Framebuffer;
  /**
   * get the framebuffer that draws the height map into a texture of a custom layer
   * @param texture - the texture to draw into
   * @returns the frame buffer
   */
  getHeightMapFramebuffer(texture: WebGLTexture): Framebuffer;
  /**
   * create a regular mesh which will be used by all terrain-tiles
   * @param globeEnabled - whether the globe is rendering, which adds the pole geometry of the edge tiles
   * @returns the created regular mesh
   */
  getTerrainMesh(tileId: OverscaledTileID, globeEnabled: boolean): Mesh;
  /**
   * Calculates the height of the tile skirts for the "auto" strategy.
   * @see {@link MapOptions.terrainSkirtLength}
   * @param zoom - current zoomlevel
   * @returns the elevation delta in meters
   */
  getSkirtLength(zoom: number): number;
  getMinTileElevationForLngLatZoom(lnglat: LngLat, zoom: number): number;
  /**
   * Get the minimum and maximum elevation contained in a tile. This includes any
   * exaggeration included in the terrain.
   *
   * @param tileID - ID of the tile to be used as a source for the min/max elevation
   * @returns the minimum and maximum elevation found in the tile, including the terrain's
   * exaggeration
   */
  getMinMaxElevation(tileID: OverscaledTileID): {
    minElevation: number | null;
    maxElevation: number | null;
  };
  _getOverscaledTileIDFromLngLatZoom(lnglat: LngLat, zoom: number): {
    tileID: OverscaledTileID;
    mercatorX: number;
    mercatorY: number;
  };
  /** Add an extra frame around the mesh to avoid hairline gaps (stitching) on tile boundaries with different zoomlevels.
   * @see {@link MapOptions.terrainSkirtLength}
   */
  _buildSkirts(vertexArray: Pos3dArray, indexArray: TriangleIndexArray, meshSize: number, delta: number, northPole: boolean, southPole: boolean): void;
}
//#endregion
//#region src/geo/projection/covering_tiles.d.ts
type CoveringTilesOptions = {
  /**
   * Smallest allowed tile zoom.
   */
  minzoom?: number;
  /**
   * Largest allowed tile zoom.
   */
  maxzoom?: number;
  /**
   * Whether to round or floor the target zoom level. If true, the value will be rounded to the closest integer. Otherwise the value will be floored.
   */
  roundZoom?: boolean;
  /**
   * Tile size, expressed in screen pixels.
   */
  tileSize: number;
};
type CoveringTilesOptionsInternal = CoveringTilesOptions & {
  /**
   * `true` if tiles should be sent back to the worker for each overzoomed zoom level, `false` if not.
   * Fill this option when computing covering tiles for a source.
   * When true, any tile at `maxzoom` level that should be overscaled to a greater zoom will have
   * its zoom set to the overscaled greater zoom. When false, such tiles will have zoom set to `maxzoom`.
   */
  reparseOverscaled?: boolean;
  /**
   * When terrain is present, tile visibility will be computed in regards to the min and max elevations for each tile.
   */
  terrain?: Terrain;
  /**
   * Optional function to redefine how tiles are loaded at high pitch angles.
   */
  calculateTileZoom?: CalculateTileZoomFunction;
  /**
   * The highest elevation, in meters, that this source's content may reach above the ground,
   * e.g. the largest `symbol-height-offset` in use. `maxContentElevation` can raise the
   * culling height above `ASSUMED_MAX_FEATURE_HEIGHT_METERS`, so tiles under highly elevated
   * content are not dropped while that content is still visible.
   */
  maxContentElevation?: number;
};
/**
 * Function to define how tiles are loaded at high pitch angles
 * @param requestedCenterZoom - the requested zoom level, valid at the center point.
 * @param distanceToTile2D - 2D distance from the camera to the candidate tile, in mercator units.
 * @param distanceToTileZ - vertical distance from the camera to the candidate tile, in mercator units.
 * @param distanceToCenter3D - distance from camera to center point, in mercator units
 * @param cameraVerticalFOV - camera vertical field of view, in degrees
 * @return the desired zoom level for this tile. May not be an integer.
 */
type CalculateTileZoomFunction = (requestedCenterZoom: number, distanceToTile2D: number, distanceToTileZ: number, distanceToCenter3D: number, cameraVerticalFOV: number) => number;
//#endregion
//#region src/source/source.d.ts
/**
 * The `Source` interface must be implemented by each source type, including "core" types (`vector`, `raster`,
 * `video`, etc.) and all custom, third-party types.
 *
 * **Event** `data` - Fired with `{dataType: 'source', sourceDataType: 'metadata'}` to indicate that any necessary metadata
 * has been loaded so that it's okay to call `loadTile`; and with `{dataType: 'source', sourceDataType: 'content'}`
 * to indicate that the source data has changed, so that any current caches should be flushed.
 *
 * @group Sources
 */
interface Source {
  readonly type: string;
  /**
   * The id for the source. Must not be used by any existing source.
   */
  id: string;
  /**
   * The minimum zoom level for the source.
   */
  minzoom: number;
  /**
   * The maximum zoom level for the source.
   */
  maxzoom: number;
  /**
   * The tile size for the source.
   */
  tileSize: number;
  /**
   * The attribution for the source.
   */
  attribution?: string;
  /**
   * `true` if zoom levels are rounded to the nearest integer in the source data, `false` if they are floor-ed to the nearest integer.
   */
  roundZoom?: boolean;
  /**
   * `false` if tiles can be drawn outside their boundaries, `true` if they cannot.
   */
  isTileClipped?: boolean;
  tileID?: CanonicalTileID;
  /**
   * `true` if tiles should be sent back to the worker for each overzoomed zoom level, `false` if not.
   */
  reparseOverscaled?: boolean;
  vectorLayerIds?: string[];
  /**
   * True if the source has transition, false otherwise.
   */
  hasTransition(): boolean;
  /**
   * True if the source is loaded, false otherwise.
   */
  loaded(): boolean;
  /**
   * An ability to fire an event to all the listeners, see {@link Evented}
   * @param event - The event to fire
   */
  fire(event: Event$1): unknown;
  /**
   * This method is called when the source is added to the map.
   * @param map - The map instance
   */
  onAdd?(map: Map$1): void;
  /**
   * This method is called when the source is removed from the map.
   * @param map - The map instance
   */
  onRemove?(map: Map$1): void;
  /**
   * This method does the heavy lifting of loading a tile.
   * In most cases it will defer the work to the relevant worker source.
   * @param tile - The tile to load
   */
  loadTile(tile: Tile): Promise<LoadTileResult | void>;
  /**
   * True is the tile is part of the source, false otherwise.
   * @param tileID - The tile ID
   */
  hasTile?(tileID: OverscaledTileID): boolean;
  /**
   * Allows to abort a tile loading.
   * @param tile - The tile to abort
   */
  abortTile?(tile: Tile): Promise<void>;
  /**
   * Allows to unload a tile.
   * @param tile - The tile to unload
   */
  unloadTile?(tile: Tile): Promise<void>;
  /**
   * @returns A plain (stringifiable) JS object representing the current state of the source.
   * Creating a source using the returned object as the `options` should result in a Source that is
   * equivalent to this one.
   */
  serialize(): any;
  /**
   * Allows to execute a prepare step before the source is used.
   */
  prepare?(): void;
  /**
   * Optional function to redefine how tiles are loaded at high pitch angles.
   */
  calculateTileZoom?: CalculateTileZoomFunction;
  /**
   * Optional function to determine whether a tile should be reloaded, given a
   * set of options associated with a `MapSourceDataChangedEvent`.
   * @internal
   */
  shouldReloadTile?(tile: Tile, options: GeoJSONSourceShouldReloadTileOptions): boolean;
}
/**
 * A general definition of a {@link Source} class for factory usage
 */
type SourceClass = {
  new (id: string, specification: SourceSpecification | CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented): Source;
};
/**
 * Adds a custom source type, making it available for use with {@link Map.addSource}.
 * @param name - The name of the source type; source definition objects use this name in the `{type: ...}` field.
 * @param SourceType - A {@link SourceClass} - which is a constructor for the `Source` interface.
 * @returns a promise that is resolved when the source type is ready or rejected with an error.
 */
export declare const addSourceType: (name: string, SourceType: SourceClass) => Promise<void>;
//#endregion
//#region src/source/geojson_source_diff.d.ts
/**
 * A way to identify a feature, either by string or by number
 */
type GeoJSONFeatureId = number | string;
/**
 * The geojson source diff object - processed in the following order: remove, add, update. Provides an efficient
 * way to update GeoJSON data in a map source without having to replace the entire dataset.
 */
type GeoJSONSourceDiff = {
  /**
   * When set to `true` it will remove all features
   */
  removeAll?: boolean;
  /**
   * An array of features IDs to remove
   */
  remove?: GeoJSONFeatureId[];
  /**
   * An array of features to add
   */
  add?: GeoJSON.Feature[];
  /**
   * An array of update objects
   */
  update?: GeoJSONFeatureDiff[];
};
/**
 * A geojson feature diff object - processed in the following order: new geometry, remove properties, add/update properties.
 * Provides an efficient way to update GeoJSON features in a map source without replacing the entire feature.
 */
type GeoJSONFeatureDiff = {
  /**
   * The feature ID
   */
  id: GeoJSONFeatureId;
  /**
   * If it's a new geometry, place it here
   */
  newGeometry?: GeoJSON.Geometry;
  /**
   * Setting to `true` will remove all preperties
   */
  removeAllProperties?: boolean;
  /**
   * The properties keys to remove
   */
  removeProperties?: string[];
  /**
   * The properties to add or update along side their values
   */
  addOrUpdateProperties?: Array<{
    key: string;
    value: any;
  }>;
};
//#endregion
//#region src/source/geojson_source.d.ts
/**
 * Options object for GeoJSONSource.
 */
type GeoJSONSourceOptions = GeoJSONSourceSpecification & {
  workerOptions?: GeoJSONWorkerOptions;
  collectResourceTiming?: boolean;
  data: GeoJSON.GeoJSON | string;
};
type GeoJSONSourceInternalOptions = {
  data?: GeoJSON.GeoJSON | string | undefined;
  cluster?: boolean;
  clusterMaxZoom?: number;
  clusterRadius?: number;
  clusterMinPoints?: number;
  generateId?: boolean;
};
/**
 * @internal
 */
type GeoJSONSourceShouldReloadTileOptions = {
  /**
   * Refresh all tiles that WILL contain these bounds.
   */
  affectedBounds: LngLatBounds[];
};
/**
 * The cluster options to set
 */
type SetClusterOptions = {
  /**
   * Whether or not to cluster
   */
  cluster?: boolean;
  /**
   * The cluster's max zoom.
   * Non-integer values are rounded to the closest integer due to supercluster integer value requirements.
   */
  clusterMaxZoom?: number;
  /**
   * The cluster's radius
   */
  clusterRadius?: number;
};
/**
 * The cluster options currently configured on a source, as returned by `getClusterOptions`
 */
type GetClusterOptions = {
  /**
   * Whether or not the source is clustered
   */
  cluster: boolean;
  /**
   * The cluster's max zoom
   */
  clusterMaxZoom: number;
  /**
   * The cluster's radius, in pixels
   */
  clusterRadius: number;
};
/**
 * A change to the data a source's worker already has: a diff to it and a refresh of its clusters, applied in
 * that order.
 */
type GeoJSONWorkerChange = {
  diff?: GeoJSONSourceDiff;
  /**
   * Whether the worker has to regroup its clusters with the current options. New data needs no such
   * refresh, since it is sent with the options current at that time.
   */
  updateCluster?: true;
};
/**
 * One update of a source's data in the worker: either new data, or a change to the data it has.
 */
type GeoJSONWorkerUpdate = {
  data: GeoJSON.GeoJSON | string;
} | GeoJSONWorkerChange;
/**
 * A source containing GeoJSON.
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/#sources-geojson) for detailed documentation of options.)
 *
 * GeoJSON is tiled internally for rendering. Features exposed from rendered tiles and related events come from vector-tile data, so GeoJSON foreign members that cannot be represented by the vector-tile format are not preserved there. Keep that data separately, or map it to supported feature properties, if you need it after tiling.
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *     type: 'geojson',
 *     data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
 * });
 * ```
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *    type: 'geojson',
 *    data: {
 *        "type": "FeatureCollection",
 *        "features": [{
 *            "type": "Feature",
 *            "properties": {},
 *            "geometry": {
 *                "type": "Point",
 *                "coordinates": [
 *                    -76.53063297271729,
 *                    39.18174077994108
 *                ]
 *            }
 *        }]
 *    }
 * });
 * ```
 *
 * @example
 * ```ts
 * map.getSource('some id').setData({
 *   "type": "FeatureCollection",
 *   "features": [{
 *       "type": "Feature",
 *       "properties": { "name": "Null Island" },
 *       "geometry": {
 *           "type": "Point",
 *           "coordinates": [ 0, 0 ]
 *       }
 *   }]
 * });
 * ```
 * @see [Draw GeoJSON points](https://maplibre.org/maplibre-gl-js/docs/examples/draw-geojson-points/)
 * @see [Add a GeoJSON line](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-geojson-line/)
 * @see [Create a heatmap from points](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-heatmap-layer/)
 * @see [Create and style clusters](https://maplibre.org/maplibre-gl-js/docs/examples/create-and-style-clusters/)
 */
export declare class GeoJSONSource extends Evented<SourceEventType> implements Source {
  type: "geojson";
  id: string;
  minzoom: number;
  maxzoom: number;
  tileSize: number;
  attribution: string;
  promoteId: PromoteIdSpecification;
  isTileClipped: boolean;
  reparseOverscaled: boolean;
  _data: ExactlyOne<{
    url: string;
    geojson: GeoJSON.GeoJSON;
    updateable: globalThis.Map<GeoJSONFeatureId, GeoJSON.Feature>;
  }>;
  _options: GeoJSONSourceInternalOptions;
  workerOptions: GeoJSONWorkerOptions;
  map: Map$1;
  actorPromise: Promise<Actor>;
  _workerUpdates: UpdateQueue<GeoJSONWorkerUpdate, GeoJSONWorkerSourceLoadDataResult>;
  _collectResourceTiming: boolean;
  _removed: boolean;
  /** @internal */
  constructor(id: string, options: GeoJSONSourceOptions, dispatcher: Dispatcher, eventedParent: Evented);
  /** The `promoteId` property name, when it is a plain string. */
  private get _promoteIdKey();
  private _pixelsToTileUnits;
  private _tileUnitsToPixels;
  private _getClusterMaxZoom;
  load(): Promise<void>;
  onAdd(map: Map$1): void;
  /**
   * Sets the GeoJSON data and re-renders the map.
   *
   * @param data - A GeoJSON data object or a URL to one. The latter is preferable in the case of large GeoJSON files.
   */
  setData(data: GeoJSON.GeoJSON | string): Promise<void>;
  /**
   * Updates the source's GeoJSON, and re-renders the map.
   *
   * For sources with lots of features, this method can be used to make updates more quickly.
   *
   * This approach requires unique IDs for every feature in the source. The IDs can either be specified on the feature,
   * or by using the promoteId option to specify which property should be used as the ID.
   *
   * It is an error to call updateData on a source that did not have unique IDs for each of its features already.
   *
   * Updates are applied on a best-effort basis, updating an ID that does not exist will not result in an error.
   *
   * @param diff - The changes that need to be applied.
   */
  updateData(diff: GeoJSONSourceDiff): Promise<void>;
  /**
   * Allows to get the source's actual GeoJSON data.
   *
   * Data set as a URL is returned once it has loaded.
   *
   * @returns a promise which resolves to the source's actual GeoJSON data
   */
  getData(): Promise<GeoJSON.GeoJSON>;
  /**
   * Allows getting the source's boundaries.
   * If there's a problem with the source's data, it will return an empty {@link LngLatBounds}.
   * @returns a promise which resolves to the source's boundaries
   */
  getBounds(): Promise<LngLatBounds>;
  /**
   * To disable/enable clustering on the source options
   * @param options - The options to set
   * @example
   * ```ts
   * map.getSource('some id').setClusterOptions({cluster: false});
   * map.getSource('some id').setClusterOptions({cluster: false, clusterRadius: 50, clusterMaxZoom: 14});
   * ```
   */
  setClusterOptions(options: SetClusterOptions): Promise<void>;
  /**
   * The change queued last for the worker, which a later change merges into, if it is still waiting to be sent.
   * Returns `undefined` when nothing is waiting or the update queued last is new data, which a change has to
   * wait behind instead.
   */
  private _getWaitingWorkerChange;
  /**
   * Gets the cluster options currently configured on the source.
   * The returned values mirror the options accepted by `setClusterOptions`.
   *
   * @returns the source's current cluster options
   * @example
   * ```ts
   * const {cluster, clusterMaxZoom, clusterRadius} = map.getSource('some id').getClusterOptions();
   * ```
   */
  getClusterOptions(): GetClusterOptions;
  /**
   * For clustered sources, fetches the zoom at which the given cluster expands.
   *
   * @param clusterId - The value of the cluster's `cluster_id` property.
   * @returns a promise that is resolved with the zoom number
   */
  getClusterExpansionZoom(clusterId: number): Promise<number>;
  /**
   * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
   *
   * @param clusterId - The value of the cluster's `cluster_id` property.
   * @returns a promise that is resolved when the features are retrieved
   */
  getClusterChildren(clusterId: number): Promise<GeoJSON.Feature[]>;
  /**
   * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
   *
   * @param clusterId - The value of the cluster's `cluster_id` property.
   * @param limit - The maximum number of features to return.
   * @param offset - The number of features to skip (e.g. for pagination).
   * @returns a promise that is resolved when the features are retrieved
   * @example
   * Retrieve cluster leaves on click
   * ```ts
   * map.on('click', 'clusters', (e) => {
   *   let features = map.queryRenderedFeatures(e.point, {
   *     layers: ['clusters']
   *   });
   *
   *   let clusterId = features[0].properties.cluster_id;
   *   let pointCount = features[0].properties.point_count;
   *   let clusterSource = map.getSource('clusters');
   *
   *   const features = await clusterSource.getClusterLeaves(clusterId, pointCount);
   *   // Print cluster leaves in the console
   *   console.log('Cluster leaves:', features);
   * });
   * ```
   */
  getClusterLeaves(clusterId: number, limit: number, offset: number): Promise<GeoJSON.Feature[]>;
  /**
   * Create the parameters object that will be sent to the worker and used to load GeoJSON.
   */
  private _getLoadGeoJSONParameters;
  /**
   * Responsible for invoking WorkerSource's geojson.loadData target, which
   * handles loading the geojson data and preparing to serve it up as tiles,
   * using geojson-vt or supercluster as appropriate.
   */
  private _sendWorkerUpdate;
  /**
   * Applies the result of a worker update to this source and fires the events that reload its tiles.
   *
   * The worker sends back the data it loaded from a URL, which becomes this source's copy of the data.
   *
   * An update that a `setData` call replaced while it was being sent leaves this source's copy of the data alone,
   * since the data its result describes is no longer the source's, and still fires its events.
   *
   * A diff reloads only the tiles it touches, but a cluster refresh can regroup points on any tile,
   * so an update that carries one reloads every tile, whatever diff comes with it.
   */
  private _onWorkerUpdateResult;
  private _onWorkerUpdateError;
  /**
   * Apply resource timing data to the event object.
   */
  private _applyResourceTiming;
  /**
   * Apply a diff to this source's data and return the affected feature geometries.
   * @param diff - The {@link GeoJSONSourceDiff} to apply.
   * @returns The affected geometries, or undefined if the diff is not applicable or all geometries are affected,
   * as they are whenever the source is clustered: a changed point can regroup clusters on any tile.
   */
  private _applyDiffToSource;
  /**
   * Get options for use in determining whether to reload a tile based on the modified features.
   * @param affectedGeometries - The feature geometries affected by the update.
   * @returns A {@link GeoJSONSourceShouldReloadTileOptions} object which contains an array of affected bounds caused by the update.
   */
  private _getShouldReloadTileOptions;
  /**
   * Determine whether a tile should be reloaded based on a set of options associated with a {@link MapSourceDataChangedEvent}.
   * @internal
   */
  shouldReloadTile(tile: Tile, { affectedBounds }: GeoJSONSourceShouldReloadTileOptions): boolean;
  loaded(): boolean;
  loadTile(tile: Tile): Promise<void>;
  abortTile(tile: Tile): Promise<void>;
  unloadTile(tile: Tile): Promise<void>;
  /**
   * Drops the worker updates waiting to be sent, which would otherwise rebuild the worker's state for a source
   * that is gone. The update being sent ends in a `dataabort` event.
   */
  onRemove(): void;
  serialize(): GeoJSONSourceSpecification;
  hasTransition(): boolean;
}
//#endregion
//#region src/ui/events.d.ts
/**
 * An event from the mouse relevant to a specific layer.
 *
 * @group Event Related
 */
type MapLayerMouseEvent = MapMouseEvent & {
  features?: MapGeoJSONFeature[];
};
/**
 * An event from a touch device relevant to a specific layer.
 *
 * @group Event Related
 */
type MapLayerTouchEvent = MapTouchEvent & {
  features?: MapGeoJSONFeature[];
};
/**
 * The source event data type
 */
type MapSourceDataType = "content" | "metadata" | "visibility" | "idle";
/**
 * `MapLayerEventType` - a mapping between the event name and the event.
 * !!! note
 *     These events are compatible with the optional `layerId` parameter.
 * If `layerId` is included as the second argument in {@link Map.on}, the event listener will fire only when the
 * event action contains a visible portion of the specified layer.
 * The following example can be used for all the events.
 *
 * @group Event Related
 * @example
 * ```ts
 * // Initialize the map
 * let map = new Map({ // map options });
 * // Set an event listener for a specific layer
 * map.on('the-event-name', 'poi-label', (e) => {
 *   console.log('An event has occurred on a visible portion of the poi-label layer');
 * });
 * ```
 */
type MapLayerEventType = {
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released contains a visible portion of the specified layer.
   *
   * @see [Measure distances](https://maplibre.org/maplibre-gl-js/docs/examples/measure-distances/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   */
  click: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released twice contains a visible portion of the specified layer.
   *
   * !!! note
   *     Under normal conditions, this event will be preceded by two `click` events.
   */
  dblclick: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed while inside a visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mousedown: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is released while inside a visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mouseup: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved while the cursor is inside a visible portion of the specified layer.
   * As you move the cursor across the layer, the event will fire every time the cursor changes position within that layer.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on over](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   * @see [Animate symbol to follow the mouse](https://maplibre.org/maplibre-gl-js/docs/examples/animate-symbol-to-follow-the-mouse/)
   */
  mousemove: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) enters a visible portion of a specified layer from
   * outside that layer or outside the map canvas.
   *
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   */
  mouseenter: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) leaves a visible portion of a specified layer, or leaves
   * the map canvas.
   *
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   */
  mouseleave: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved inside a visible portion of the specified layer.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   */
  mouseover: MapLayerMouseEvent;
  /**
   * Fired when a point device (usually a mouse) leaves the visible portion of the specified layer.
   */
  mouseout: MapLayerMouseEvent;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key is pressed within visible portion of the specified layer.
   */
  contextmenu: MapLayerMouseEvent;
  /**
   * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchstart: MapLayerTouchEvent;
  /**
   * Fired when a [`touchend`](https://developer.mozilla.org/en-US/docs/Web/Events/touchend) event occurs within the visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchend: MapLayerTouchEvent;
  /**
   * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchcancel: MapLayerTouchEvent;
};
/**
 * `MapEventType` - a mapping between the event name and the event value.
 * These events are used with the {@link Map.on} method.
 * When using a `layerId` with {@link Map.on} method, please refer to {@link MapLayerEventType}.
 * The following example can be used for all the events.
 *
 * @group Event Related
 * @example
 * ```ts
 * // Initialize the map
 * let map = new Map({ // map options });
 * // Set an event listener
 * map.on('the-event-name', () => {
 *   console.log('An event has occurred!');
 * });
 * ```
 */
type MapEventType = {
  /**
   * Fired when an error occurs. This is GL JS's primary error reporting
   * mechanism. We use an event instead of `throw` to better accommodate
   * asynchronous operations. If no listeners are bound to the `error` event, the
   * error will be printed to the console.
   */
  error: ErrorEvent;
  /**
   * Fired immediately after all necessary resources have been downloaded
   * and the first visually complete rendering of the map has occurred.
   *
   * @see [Draw GeoJSON points](https://maplibre.org/maplibre-gl-js/docs/examples/draw-geojson-points/)
   * @see [Add live realtime data](https://maplibre.org/maplibre-gl-js/docs/examples/add-live-realtime-data/)
   * @see [Animate a point](https://maplibre.org/maplibre-gl-js/docs/examples/animate-a-point/)
   */
  load: MapLibreEvent;
  /**
   * Fired after the last frame rendered before the map enters an
   * "idle" state:
   *
   * - No camera transitions are in progress
   * - All currently requested tiles have loaded
   * - All fade/transition animations have completed
   */
  idle: MapLibreEvent;
  /**
   * Fired immediately after the map has been removed with {@link Map.remove}.
   */
  remove: MapLibreEvent;
  /**
   * Fired whenever the map is drawn to the screen, as the result of
   *
   * - a change to the map's position, zoom, pitch, or bearing
   * - a change to the map's style
   * - a change to a GeoJSON source
   * - the loading of a vector tile, GeoJSON file, glyph, or sprite
   */
  render: MapLibreEvent;
  /**
   * Fired immediately after the map has been resized.
   */
  resize: MapLibreEvent;
  /**
   * Fired when the WebGL context is lost.
   */
  webglcontextlost: MapContextEvent;
  /**
   * Fired when the WebGL context is restored.
   */
  webglcontextrestored: MapContextEvent;
  /**
   * Fired when any map data (style, source, tile, etc) begins loading or
   * changing asynchronously. All `dataloading` events are followed by a `data`,
   * `dataabort` or `error` event.
   */
  dataloading: MapSourceDataEvent | MapStyleDataEvent;
  /**
   * Fired when any map data loads or changes. See {@link MapSourceDataEvent} and {@link MapStyleDataEvent} for more information.
   * @see [Display HTML clusters with custom properties](https://maplibre.org/maplibre-gl-js/docs/examples/display-html-clusters-with-custom-properties/)
   */
  data: MapSourceDataEvent | MapStyleDataEvent;
  /**
   * Fired when one of the map's sources begins loading or changing asynchronously.
   * All `sourcedataloading` events are followed by a `sourcedata`, `sourcedataabort` or `error` event.
   */
  sourcedataloading: MapSourceDataEvent;
  /**
   * Fired when the map's style begins loading or changing asynchronously.
   * All `styledataloading` events are followed by a `styledata`
   * or `error` event.
   */
  styledataloading: MapStyleDataEvent;
  /**
   * Fired when one of the map's sources loads or changes, including if a tile belonging
   * to a source loads or changes.
   */
  sourcedata: MapSourceDataEvent;
  /**
   * Fired when the map's style loads or changes.
   */
  styledata: MapStyleDataEvent;
  /**
   * Fired once the map's style has fully loaded or changed, after all
   * necessary resources referenced by the style have been requested.
   */
  "style.load": MapStyleLoadEvent;
  /**
   * Fired when an icon or pattern needed by the style is missing and no missing style image resolver
   * supplies it. To load or generate images on demand, use {@link Map.setMissingStyleImageResolver}.
   * Event listeners cannot resolve the missing image for the current request.
   * @see [Generate and add a missing icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/generate-and-add-a-missing-icon-to-the-map/)
   */
  styleimagemissing: MapStyleImageMissingEvent;
  /**
   * Fired when a request for one of the map's sources' tiles or data is aborted.
   */
  dataabort: MapSourceDataEvent;
  /**
   * Fired when a request for one of the map's sources' data is aborted.
   */
  sourcedataabort: MapSourceDataEvent;
  /**
   * Fired when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold.
   * See {@link BoxZoomHandler}.
   */
  boxzoomcancel: MapBoxZoomEvent;
  /**
   * Fired when a "box zoom" interaction starts. See {@link BoxZoomHandler}.
   */
  boxzoomstart: MapBoxZoomEvent;
  /**
   * Fired when a "box zoom" interaction ends.  See {@link BoxZoomHandler}.
   */
  boxzoomend: MapBoxZoomEvent;
  /**
   * Fired when a [`touchcancel`](https://developer.mozilla.org/en-US/docs/Web/Events/touchcancel) event occurs within the map.
   */
  touchcancel: MapTouchEvent;
  /**
   * Fired when a [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/Events/touchmove) event occurs within the map.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchmove: MapTouchEvent;
  /**
   * Fired when a [`touchend`](https://developer.mozilla.org/en-US/docs/Web/Events/touchend) event occurs within the map.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchend: MapTouchEvent;
  /**
   * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the map.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchstart: MapTouchEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released at the same point on the map.
   *
   * @see [Measure distances](https://maplibre.org/maplibre-gl-js/docs/examples/measure-distances/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   */
  click: MapMouseEvent;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key is pressed within the map.
   */
  contextmenu: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released twice at the same point on the map in rapid succession.
   *
   * !!! note
   *     Under normal conditions, this event will be preceded by two `click` events.
   */
  dblclick: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved while the cursor is inside the map.
   * As you move the cursor across the map, the event will fire every time the cursor changes position within the map.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on over](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   */
  mousemove: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is released within the map.
   *
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mouseup: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed within the map.
   *
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mousedown: MapMouseEvent;
  /**
   * Fired when a point device (usually a mouse) leaves the map's canvas.
   */
  mouseout: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the map.
   * As you move the cursor across a web page containing a map,
   * the event will fire each time it enters the map or any child elements.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   */
  mouseover: MapMouseEvent;
  /**
   * Fired just before the map begins a transition from one
   * view to another, as the result of either user interaction or methods such as {@link Map.jumpTo}.
   *
   */
  movestart: MapMovementEvent;
  /**
   * Fired repeatedly during an animated transition from one view to
   * another, as the result of either user interaction or methods such as {@link Map.flyTo}.
   *
   * @see [Display HTML clusters with custom properties](https://maplibre.org/maplibre-gl-js/docs/examples/display-html-clusters-with-custom-properties/)
   */
  move: MapMovementEvent;
  /**
   * Fired just after the map completes a transition from one
   * view to another, as the result of either user interaction or methods such as {@link Map.jumpTo}.
   *
   * @see [Display HTML clusters with custom properties](https://maplibre.org/maplibre-gl-js/docs/examples/display-html-clusters-with-custom-properties/)
   */
  moveend: MapMovementEvent;
  /**
   * Fired just before the map begins a transition from one zoom level to another,
   * as the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  zoomstart: MapMovementEvent;
  /**
   * Fired repeatedly during an animated transition from one zoom level to another,
   * as the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  zoom: MapMovementEvent;
  /**
   * Fired just after the map completes a transition from one zoom level to another,
   * as the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  zoomend: MapMovementEvent;
  /**
   * Fired when a "drag to rotate" interaction starts. See {@link DragRotateHandler}.
   */
  rotatestart: MapMovementEvent;
  /**
   * Fired repeatedly during a "drag to rotate" interaction. See {@link DragRotateHandler}.
   */
  rotate: MapMovementEvent;
  /**
   * Fired when a "drag to rotate" interaction ends. See {@link DragRotateHandler}.
   */
  rotateend: MapMovementEvent;
  /**
   * Fired when a "drag to pan" interaction starts. See {@link DragPanHandler}.
   */
  dragstart: MapMovementEvent;
  /**
   * Fired repeatedly during a "drag to pan" interaction. See {@link DragPanHandler}.
   */
  drag: MapMovementEvent;
  /**
   * Fired when a "drag to pan" interaction ends. See {@link DragPanHandler}.
   * @see [Create a draggable marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-marker/)
   */
  dragend: MapMovementEvent;
  /**
   * Fired whenever the map's pitch (tilt) begins a change as
   * the result of either user interaction or methods such as {@link Map.flyTo} .
   */
  pitchstart: MapMovementEvent;
  /**
   * Fired repeatedly during the map's pitch (tilt) animation between
   * one state and another as the result of either user interaction
   * or methods such as {@link Map.flyTo}.
   */
  pitch: MapMovementEvent;
  /**
   * Fired immediately after the map's pitch (tilt) finishes changing as
   * the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  pitchend: MapMovementEvent;
  /**
   * Fired whenever the map's roll begins a change as
   * the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  rollstart: MapMovementEvent;
  /**
   * Fired repeatedly during the map's roll animation between
   * one state and another as the result of either user interaction
   * or methods such as {@link Map.flyTo}.
   */
  roll: MapMovementEvent;
  /**
   * Fired immediately after the map's roll finishes changing as
   * the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  rollend: MapMovementEvent;
  /**
   * Fired when a [`wheel`](https://developer.mozilla.org/en-US/docs/Web/Events/wheel) event occurs within the map.
   */
  wheel: MapWheelEvent;
  /**
   * Fired when terrain is changed
   */
  terrain: MapTerrainEvent;
  /**
   * Fired whenever the cooperativeGestures option prevents a gesture from being handled by the map.
   * This is useful for showing your own UI when this happens.
   */
  cooperativegestureprevented: MapLibreEvent<WheelEvent | TouchEvent> & {
    gestureType: "wheel_zoom" | "touch_pan";
  };
  /**
   * Fired when map's projection is modified in other ways than by map being moved.
   */
  projectiontransition: MapProjectionEvent;
};
/**
 * `SourceEventType` - a mapping between the source data event names and their event value.
 * These are the events fired by a {@link Source} as its data loads or changes; they also bubble
 * up to the {@link Map}. See {@link MapSourceDataEvent} for the event shape.
 *
 * @group Event Related
 */
type SourceEventType = {
  /**
   * Fired when the source's data loads or changes.
   */
  data: MapSourceDataEvent;
  /**
   * Fired when the source begins loading or changing data.
   */
  dataloading: MapSourceDataEvent;
  /**
   * Fired when a request for the source's data is aborted.
   */
  dataabort: MapSourceDataEvent;
  /**
   * Fired when there's an error
   */
  error: ErrorEvent;
};
/**
 * The base event for MapLibre
 *
 * @group Event Related
 */
export declare class MapLibreEvent<TOrig = unknown> extends Event$1 {
  type: keyof MapEventType | keyof MapLayerEventType;
  target: Map$1;
  originalEvent: TOrig;
}
/**
 * `MapMovementEvent` is the event type for the camera-transition map events:
 * `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `rotatestart`, `rotate`, `rotateend`,
 * `dragstart`, `drag`, `dragend`, `pitchstart`, `pitch`, `pitchend`, `rollstart`, `roll` and `rollend`.
 * These are fired as the map's view changes, as a result of either user interaction or methods such
 * as {@link Map.jumpTo} / {@link Map.flyTo}.
 *
 * @group Event Related
 */
export declare class MapMovementEvent extends MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> {
  type: "movestart" | "move" | "moveend" | "zoomstart" | "zoom" | "zoomend" | "rotatestart" | "rotate" | "rotateend" | "dragstart" | "drag" | "dragend" | "pitchstart" | "pitch" | "pitchend" | "rollstart" | "roll" | "rollend";
}
/**
 * The `style.load` event, fired once the map's style has fully loaded or changed.
 *
 * @group Event Related
 */
export declare class MapStyleLoadEvent extends MapLibreEvent {
  type: "style.load";
  constructor(data?: any);
}
/**
 * The style data event
 *
 * @group Event Related
 */
export declare class MapStyleDataEvent extends MapLibreEvent {
  type: "data" | "dataloading" | "styledata" | "styledataloading";
  dataType: "style";
  constructor(type: MapStyleDataEvent["type"], data?: Omit<Partial<MapStyleDataEvent>, "type" | "dataType" | "target">);
}
/**
 * A `MapSourceDataEvent` is emitted with the source-related `data`, `dataloading`, `dataabort`,
 * `sourcedata`, `sourcedataloading` and `sourcedataabort` events. Its `dataType` is always `'source'`.
 *
 * Possible values for `sourceDataType`s are:
 *
 * - `'metadata'`: indicates that any necessary source metadata has been loaded (such as TileJSON) and it is ok to start loading tiles
 * - `'content'`: indicates the source data has changed (such as when source.setData() has been called on GeoJSONSource)
 * - `'visibility'`: send when the source becomes used when at least one of its layers becomes visible in style sense (inside the layer's zoom range and with layout.visibility set to 'visible')
 * - `'idle'`: indicates that no new source data has been fetched (but the source has done loading)
 *
 * @group Event Related
 *
 * @example
 * ```ts
 * // The sourcedata event is an example of a MapSourceDataEvent.
 * // Set up an event listener on the map.
 * map.on('sourcedata', (e) => {
 *    if (e.isSourceLoaded) {
 *        // Do something when the source has finished loading
 *    }
 * });
 * ```
 */
export declare class MapSourceDataEvent extends MapLibreEvent {
  type: "data" | "dataloading" | "dataabort" | "sourcedata" | "sourcedataloading" | "sourcedataabort";
  dataType: "source";
  /**
   * True if the event has a `dataType` of `source` and the source has no outstanding network requests.
   */
  isSourceLoaded: boolean;
  /**
   * The [style spec representation of the source](https://maplibre.org/maplibre-style-spec/#sources) if the event has a `dataType` of `source`.
   */
  source: SourceSpecification;
  sourceId: string;
  sourceDataType: MapSourceDataType;
  sourceDataChanged?: boolean;
  /**
   * The tile being loaded or changed, if the event has a `dataType` of `source` and
   * the event is related to loading of a tile.
   */
  tile: any;
  /**
   * The tile ID of the tile being loaded or changed, if the event is related to loading of a tile.
   */
  coord: OverscaledTileID;
  /**
   * Resource timing data, if `collectResourceTiming` is enabled for the source.
   */
  resourceTiming?: PerformanceResourceTiming[];
  /**
   * Options to determine whether a tile should be reloaded.
   * @internal
   */
  shouldReloadTileOptions: GeoJSONSourceShouldReloadTileOptions;
  constructor(type: MapSourceDataEvent["type"], data?: Omit<Partial<MapSourceDataEvent>, "type" | "dataType" | "target">);
}
/**
 * `MapMouseEvent` is the event type for mouse-related map events.
 *
 * @group Event Related
 *
 * @example
 * ```ts
 * // The `click` event is an example of a `MapMouseEvent`.
 * // Set up an event listener on the map.
 * map.on('click', (e) => {
 *   // The event object (e) contains information like the
 *   // coordinates of the point on the map that was clicked.
 *   console.log('A click event has occurred at ' + e.lngLat);
 * });
 * ```
 */
export declare class MapMouseEvent extends MapLibreEvent<MouseEvent> {
  /**
   * The event type
   */
  type: "mousedown" | "mouseup" | "click" | "dblclick" | "mousemove" | "mouseover" | "mouseenter" | "mouseleave" | "mouseout" | "contextmenu";
  /**
   * The `Map` object that fired the event.
   */
  target: Map$1;
  /**
   * The DOM event which caused the map event.
   */
  originalEvent: MouseEvent;
  /**
   * The pixel coordinates of the mouse cursor, relative to the map and measured from the top left corner.
   */
  point: Point$1;
  /**
   * The geographic location on the map of the mouse cursor.
   */
  lngLat: LngLat;
  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the following default map behaviors:
   *
   *   * On `mousedown` events, the behavior of {@link DragPanHandler}
   *   * On `mousedown` events, the behavior of {@link DragRotateHandler}
   *   * On `mousedown` events, the behavior of {@link BoxZoomHandler}
   *   * On `dblclick` events, the behavior of {@link DoubleClickZoomHandler}
   *
   */
  preventDefault(): void;
  /**
   * `true` if `preventDefault` has been called.
   */
  get defaultPrevented(): boolean;
  _defaultPrevented: boolean;
  constructor(type: string, map: Map$1, originalEvent: MouseEvent, data?: any);
}
/**
 * `MapTouchEvent` is the event type for touch-related map events.
 *
 * @group Event Related
 */
export declare class MapTouchEvent extends MapLibreEvent<TouchEvent> {
  /**
   * The event type.
   */
  type: "touchstart" | "touchmove" | "touchend" | "touchcancel";
  /**
   * The `Map` object that fired the event.
   */
  target: Map$1;
  /**
   * The DOM event which caused the map event.
   */
  originalEvent: TouchEvent;
  /**
   * The geographic location on the map of the center of the touch event points.
   */
  lngLat: LngLat;
  /**
   * The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left
   * corner.
   */
  point: Point$1;
  /**
   * The array of pixel coordinates corresponding to a
   * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
   */
  points: Point$1[];
  /**
   * The geographical locations on the map corresponding to a
   * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
   */
  lngLats: LngLat[];
  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the following default map behaviors:
   *
   *   * On `touchstart` events, the behavior of {@link DragPanHandler}
   *   * On `touchstart` events, the behavior of {@link TwoFingersTouchZoomRotateHandler}
   *
   */
  preventDefault(): void;
  /**
   * `true` if `preventDefault` has been called.
   */
  get defaultPrevented(): boolean;
  _defaultPrevented: boolean;
  constructor(type: string, map: Map$1, originalEvent: TouchEvent);
}
/**
 * `MapWheelEvent` is the event type for the `wheel` map event.
 *
 * @group Event Related
 */
export declare class MapWheelEvent extends MapLibreEvent<WheelEvent> {
  /**
   * The event type.
   */
  type: "wheel";
  /**
   * The `Map` object that fired the event.
   */
  target: Map$1;
  /**
   * The DOM event which caused the map event.
   */
  originalEvent: WheelEvent;
  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the behavior of {@link ScrollZoomHandler}.
   */
  preventDefault(): void;
  /**
   * `true` if `preventDefault` has been called.
   */
  get defaultPrevented(): boolean;
  _defaultPrevented: boolean;
  /** */
  constructor(map: Map$1, originalEvent: WheelEvent);
}
/**
 * A `MapBoxZoomEvent` is the event type for the boxzoom-related map events emitted by the {@link BoxZoomHandler}.
 *
 * @group Event Related
 */
export declare class MapBoxZoomEvent extends MapLibreEvent<MouseEvent> {
  /**
   * The type of boxzoom event. One of `boxzoomstart`, `boxzoomend` or `boxzoomcancel`
   */
  type: "boxzoomstart" | "boxzoomend" | "boxzoomcancel";
  /**
   * The `Map` instance that triggered the event
   */
  target: Map$1;
  /**
   * The DOM event that triggered the boxzoom event. Can be a `MouseEvent` or `KeyboardEvent`
   */
  originalEvent: MouseEvent;
}
/**
 * The terrain event
 *
 * @group Event Related
 */
export declare class MapTerrainEvent extends MapLibreEvent {
  type: "terrain";
  constructor(data?: any);
}
/**
 * The map projection event
 *
 * @group Event Related
 */
export declare class MapProjectionEvent extends MapLibreEvent {
  type: "projectiontransition";
  /**
   * Specifies the name of the new projection.
   * For example:
   *
   *  - `globe` to describe globe that has internally switched to mercator
   *  - `vertical-perspective` to describe a globe that doesn't change to mercator
   *  - `mercator` to describe mercator projection
   */
  newProjection: ProjectionSpecification["type"];
  constructor(data?: any);
}
/**
 * An event related to the web gl context
 *
 * @group Event Related
 */
export declare class MapContextEvent extends MapLibreEvent<WebGLContextEvent> {
  type: "webglcontextlost" | "webglcontextrestored";
  originalEvent: WebGLContextEvent;
}
/**
 * The style image missing event, fired when an image is still missing after the missing style image
 * resolver has been given a chance to supply it. To load or generate images on demand,
 * use {@link Map.setMissingStyleImageResolver}.
 * Event listeners cannot resolve the missing image for the current request.
 *
 * @group Event Related
 *
 * @see [Generate and add a missing icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/generate-and-add-a-missing-icon-to-the-map/)
 */
export declare class MapStyleImageMissingEvent extends MapLibreEvent {
  type: "styleimagemissing";
  id: string;
  constructor(data?: any);
}
//#endregion
//#region src/util/request_manager.d.ts
/**
 * A type of MapLibre resource.
 */
declare const enum ResourceType {
  Glyphs = "Glyphs",
  Image = "Image",
  Source = "Source",
  SpriteImage = "SpriteImage",
  SpriteJSON = "SpriteJSON",
  Style = "Style",
  Tile = "Tile",
  Unknown = "Unknown"
}
/**
 * This function is used to transform a request.
 * It is used just before executing the relevant request.
 */
type RequestTransformFunction = (url: string, resourceType?: ResourceType) => RequestParameters | Promise<RequestParameters> | undefined;
declare class RequestManager {
  _transformRequestFn: RequestTransformFunction | null;
  constructor(transformRequestFn?: RequestTransformFunction | null);
  transformRequest(url: string, type: ResourceType): RequestParameters | Promise<RequestParameters>;
  setTransformRequest(transformRequest: RequestTransformFunction | null): void;
}
//#endregion
//#region src/render/font_face_manager.d.ts
/**
 * An inclusive range of Unicode codepoints, parsed out of a `unicode-range` entry.
 */
type UnicodeRange = {
  start: number;
  end: number;
};
/**
 * A font file declared by the style, along with the bookkeeping needed to draw with it.
 */
type DeclaredFontFace = {
  /**
   * The font file's URL, as written in the style.
   */
  url: string;
  /**
   * The codepoints the style lets this file cover.
   */
  ranges: UnicodeRange[];
  /**
   * The CSS family name the file is registered under. It is generated rather than taken from the
   * style so that a style cannot restyle the surrounding page by declaring a font face named
   * after one the page uses, and so that each file can be selected on its own.
   */
  family: string;
  /**
   * Resolves to whether the file loaded and can be drawn with. Started the first time a codepoint
   * needs this file, so that a style may declare more fonts than any one map ever draws with.
   */
  loaded?: Promise<boolean>;
};
/**
 * Keeps the font files a style declares in its
 * [`font-faces`](https://maplibre.org/maplibre-style-spec/root/#font-faces) property, and hands the
 * {@link GlyphManager} the CSS family to draw a given codepoint with.
 *
 * The files go to the browser's CSS Font Loading API, so any format it can render text with works.
 * Each is registered under a family name of our own making, so that a style cannot restyle the
 * surrounding page and a codepoint can be pinned to one file rather than to whatever font matching
 * picks.
 *
 * Rasterizing happens a grapheme cluster at a time, so a letter reaches the browser's text engine
 * with its marks. Shaping across cluster boundaries still needs the RTL text plugin.
 */
declare class FontFaceManager {
  requestManager: RequestManager;
  /**
   * The declared files by the font name used in `text-font`, in the order the style listed them.
   */
  _faces: Record<string, DeclaredFontFace[]>;
  /**
   * Everything handed to `document.fonts`, so that it can all be handed back on destroy.
   */
  _registered: Set<FontFace>;
  constructor(requestManager: RequestManager);
  /**
   * Replaces the declared font faces. Nothing is downloaded here: each file waits until a
   * codepoint it covers is actually drawn.
   */
  setFontFaces(fontFaces?: FontFacesSpecification | null): void;
  /**
   * Whether the style declared any font face at all, so that the common case of a style without
   * `font-faces` costs nothing.
   */
  hasFontFaces(): boolean;
  /**
   * Finds the font file to draw a codepoint with: each name of the `text-font` stack in turn, and
   * within a name each declared file, until one covers it. A file that fails to load is skipped,
   * the specification asking for unsupported fonts to be ignored.
   *
   * @returns the CSS family to draw with, or `null` to leave the codepoint to the `glyphs` URL
   */
  getFontFamily(fontStack: string, codePoint: number): Promise<string | null>;
  /**
   * Turns one declaration into a face to draw with, or `null` if there is nothing usable in it.
   *
   * A bare URL is the same as a face that names no `unicode-range`: it covers every codepoint.
   */
  _declareFontFace(fontName: string, declaration: string | MLFontFace): DeclaredFontFace | null;
  /**
   * Downloads a declared file and hands it to the browser, reporting whether it can be drawn with.
   * A failure is not an error: its codepoints fall through to the next file, then to `glyphs`.
   */
  _loadFontFace(face: DeclaredFontFace): Promise<boolean>;
  /**
   * Downloads a font file, giving the map's `transformRequest` a chance to rewrite the request the
   * same way it gets one for a glyph range.
   */
  _downloadFontFile(url: string): Promise<ArrayBuffer>;
  _unregister(fontFace: FontFace): void;
  _unregisterAll(): void;
  destroy(): void;
}
//#endregion
//#region src/render/glyph_manager.d.ts
type Entry = {
  /**
   * The glyphs drawn or downloaded so far, keyed by variant and grapheme cluster.
   * `null` means the requested glyph is unavailable.
   */
  glyphs: Record<string, Record<string, StyleGlyph | null>>;
  requests: Record<number, Promise<{
    [_: number]: StyleGlyph | null;
  }>>;
  ranges: Record<number, boolean | null>;
  tinySDF?: Promise<Rasterizer>;
  ideographTinySDF?: Promise<Rasterizer>;
  /**
   * One TinySDF per `font-faces` file this stack draws with, keyed by the file's CSS family.
   */
  fontFaceTinySDFs?: Record<string, Promise<Rasterizer>>;
  /**
   * One TinySDF per font selection used to draw whole grapheme clusters, which need a wider canvas
   * to fit in than a single codepoint does.
   */
  clusterTinySDFs?: Record<string, Promise<Rasterizer>>;
};
/** A requested glyph with its lookup keys; `null` means unavailable. */
type GlyphResult = {
  stack: string;
  id: string;
  variant: string;
  glyph: StyleGlyph | null;
};
/**
 * The rasterizer, as it really is. TinySDF carries the `buffer` it was built with, which its type
 * declaration leaves out and which the canvas has to be widened through.
 */
type Rasterizer = TinySDF & {
  buffer: number;
};
/**
 * Builds the thing that rasterizes a glyph. Taken as a dependency so that a test can stand in for
 * the canvas it would otherwise need to draw on.
 *
 * @param options - what to draw with, whose `buffer` sizes the canvas
 * @param padding - the room to leave around each glyph in the bitmap, which is not that buffer
 */
type CreateRasterizer = (options: TinySDFOptions, padding: number) => Rasterizer;
declare class GlyphManager {
  requestManager: RequestManager;
  localIdeographFontFamily: string | false;
  entries: Record<string, Entry>;
  url: string;
  lang?: string;
  fontFaceManager: FontFaceManager;
  createRasterizer: CreateRasterizer;
  constructor(requestManager: RequestManager, localIdeographFontFamily?: string | false, lang?: string, createRasterizer?: CreateRasterizer);
  setURL(url?: string | null): void;
  /**
   * Replaces the font files the style declares in its `font-faces` property, dropping every glyph
   * drawn with the previous ones.
   */
  setFontFaces(fontFaces?: FontFacesSpecification | null): void;
  getGlyphs(glyphs: GlyphRequests): Promise<GlyphMap>;
  /**
   * Gets one glyph, asked for by grapheme cluster so that a letter and its marks are drawn as the
   * one shape they are written as.
   *
   * A cluster is drawn from a font rather than fetched, because a glyphs URL serves codepoints and
   * has no way to serve the one shape they are written as. A file the style pinned with
   * `font-faces` draws it where one covers it, and the local fonts otherwise. For a single
   * codepoint a declared file still wins over the glyphs URL and the local fallbacks.
   * Providers support the `default` variant; unsupported variants return `null`.
   */
  _getAndCacheGlyphsPromise(stack: string, id: string, variant: string): Promise<GlyphResult>;
  /**
   * Gets a glyph from the server-side cache, downloading the PBF range it falls in if need be.
   *
   * Only reached for a single codepoint. What comes back is keyed by codepoint, as the file is,
   * and is cached by cluster -- which for one codepoint is the character itself.
   */
  _downloadAndCacheRangePromise(stack: string, id: string): Promise<{
    stack: string;
    id: string;
    glyph: StyleGlyph;
  }>;
  /**
   * Downloads one range of 256 codepoints from the glyphs URL and parses the glyphs out of it.
   */
  _loadGlyphRange(fontstack: string, range: number): Promise<Record<number, StyleGlyph | null>>;
  _warnOnMissingGlyphRange(glyph: StyleGlyph, range: number, id: number, err: Error): void;
  /**
   * Returns whether the given codepoint should be rendered locally.
   */
  _charUsesLocalIdeographFontFamily(id: number): boolean;
  /**
   * Draws a glyph offscreen using TinySDF, created lazily. The whole cluster goes to TinySDF, which
   * is what lets the browser's text engine place a letter's marks on it.
   *
   * @param fontFaceFamily - the CSS family of the `font-faces` file covering this codepoint, if any
   */
  _drawGlyph(entry: Entry, stack: string, id: string, fontFaceFamily?: string): Promise<StyleGlyph>;
  /**
   * Returns the TinySDF that draws this grapheme, created lazily. A stack keeps one per font
   * selection, so a fallback cannot bleed into the rest of the text, and one more per font file
   * for the clusters drawn from it, which need a wider canvas.
   *
   * A font file carries its own weight and style, so neither is sniffed out of the family name.
   * Where no file covers the grapheme, `localIdeographFontFamily` beats the last resort fontstack.
   */
  _getTinySDF(entry: Entry, stack: string, id: string, fontFaceFamily?: string): Promise<Rasterizer>;
  /**
   * Builds the TinySDF that draws with a given font selection.
   *
   * TinySDF derives its canvas from `fontSize + buffer * 4`, so the buffer is the only way in to a
   * wider one. It also stands for the padding the atlas expects to be `GLYPH_PBF_BORDER`, so the
   * two are passed separately.
   *
   * @param emsWide - how wide the glyphs may be, in font sizes, before TinySDF cuts them off
   */
  _createTinySDF(stack: String | false, sniffFontStyles?: boolean, emsWide?: number): Promise<Rasterizer>;
  /**
   * Sniffs the font style out of a font family name.
   */
  _fontStyle(fontFamily: string): string;
  /**
   * Sniffs the font weight out of a font family name.
   */
  _fontWeight(fontFamily: string): string;
  destroy(): void;
}
//#endregion
//#region src/style/light.d.ts
declare class Light extends Evented {
  _transitionable: Transitionable<LightProps>;
  _transitioning: Transitioning<LightProps>;
  properties: PossiblyEvaluated<LightProps, LightPropsPossiblyEvaluated>;
  constructor(lightOptions: LightSpecification, globalState: Record<string, any>);
  getLight(): LightSpecification;
  /** The light's values for drawing, as evaluated last. */
  getEvaluated(): LightPropsPossiblyEvaluated;
  setLight(light: LightSpecification, options?: StyleSetterOptions): void;
  updateTransitions(parameters: TransitionParameters): void;
  hasTransition(): boolean;
  applyGlobalStateChange(refs: string[], priorGlobalState: Record<string, any>, parameters: TransitionParameters): void;
  recalculate(parameters: EvaluationParameters): void;
  _validate(validate: Validator, value: unknown, options?: StyleSetterOptions): boolean;
}
//#endregion
//#region src/style/sky.d.ts
declare class Sky extends Evented {
  properties: PossiblyEvaluated<SkyProps, SkyPropsPossiblyEvaluated>;
  _transitionable: Transitionable<SkyProps>;
  _transitioning: Transitioning<SkyProps>;
  constructor(sky: SkySpecification | undefined, globalState: Record<string, any>);
  /**
   * Validates and applies the sky. Returns false, after firing `error`, when
   * the value was rejected and nothing changed.
   */
  setSky(sky?: SkySpecification, options?: StyleSetterOptions): boolean;
  getSky(): SkySpecification;
  updateTransitions(parameters: TransitionParameters): void;
  hasTransition(): boolean;
  applyGlobalStateChange(refs: string[], priorGlobalState: Record<string, any>, parameters: TransitionParameters): void;
  recalculate(parameters: EvaluationParameters): void;
  _validate(validate: Validator, value: unknown, options?: StyleSetterOptions): boolean;
  /** The sky's values for drawing, as evaluated last. */
  getEvaluated(): SkyPropsPossiblyEvaluated;
}
//#endregion
//#region src/style/pauseable_placement.d.ts
declare class LayerPlacement {
  _sortAcrossTiles: boolean;
  _currentTileIndex: number;
  _currentPartIndex: number;
  _seenCrossTileIDs: { [k in string | number]: boolean; };
  _bucketParts: BucketPart[];
  constructor(styleLayer: SymbolStyleLayer);
  continuePlacement(tiles: Tile[], placement: Placement, showCollisionBoxes: boolean, styleLayer: StyleLayer, shouldPausePlacement: () => boolean): boolean;
}
declare class PauseablePlacement {
  placement: Placement;
  _done: boolean;
  _currentPlacementIndex: number;
  _forceFullPlacement: boolean;
  _showCollisionBoxes: boolean;
  _inProgressLayer: LayerPlacement;
  constructor(transform: ITransform, terrain: Terrain, order: string[], forceFullPlacement: boolean, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement);
  isDone(): boolean;
  continuePlacement(order: string[], layers: {
    [_: string]: StyleLayer;
  }, layerTiles: {
    [_: string]: Tile[];
  }): void;
  commit(now: number): Placement;
}
//#endregion
//#region src/symbol/cross_tile_symbol_index.d.ts
type SymbolsByKeyEntry = {
  index?: KDBush;
  positions?: Array<{
    x: number;
    y: number;
  }>;
  crossTileIDs: number[];
};
declare class TileLayerIndex {
  tileID: OverscaledTileID;
  bucketInstanceId: number;
  _symbolsByKey: Record<number, SymbolsByKeyEntry>;
  constructor(tileID: OverscaledTileID, symbolInstances: SymbolInstanceArray, bucketInstanceId: number);
  getScaledCoordinates(symbolInstance: SymbolInstance, childTileID: OverscaledTileID): {
    x: number;
    y: number;
  };
  findMatches(symbolInstances: SymbolInstanceArray, newTileID: OverscaledTileID, zoomCrossTileIDs: {
    [crossTileID: number]: boolean;
  }): void;
  /**
   * Matches a symbol instance against an entry backed by a KDBush spatial index
   * (used for keys with more than {@link KDBUSH_THRESHHOLD} symbols).
   *
   * Matches any symbol with the same key whose coordinates are within one grid
   * unit (with a 4px grid, this covers a 12px by 12px area). The lowest-index
   * unclaimed candidate is claimed in a single pass rather than sorting the
   * whole result set on every query: `range()` can return many candidates where
   * symbols are coincident (e.g. stacked point markers), so a per-query sort
   * would dominate placement cost on dense layers.
   *
   * Once a symbol is marked duplicate against a parent symbol, no other symbol
   * at the same zoom level may duplicate against the same parent (see issue #5993).
   */
  private findMatchesForIndexedEntry;
  /**
   * Matches a symbol instance against an entry that stores its positions as a
   * plain array (used for keys with at most {@link KDBUSH_THRESHHOLD} symbols).
   *
   * Matches any symbol with the same key whose coordinates are within one grid
   * unit (with a 4px grid, this covers a 12px by 12px area). Positions are
   * stored in symbol-instance order, so the first unclaimed match is also the
   * lowest-index one.
   *
   * Once a symbol is marked duplicate against a parent symbol, no other symbol
   * at the same zoom level may duplicate against the same parent (see issue #5993).
   */
  private findMatchesForNonIndexedEntry;
  getCrossTileIDsLists(): number[][];
}
declare class CrossTileIDs {
  maxCrossTileID: number;
  constructor();
  generate(): number;
}
declare class CrossTileSymbolLayerIndex {
  indexes: { [zoom in string | number]: { [tileId in string | number]: TileLayerIndex; }; };
  usedCrossTileIDs: { [zoom in string | number]: {
    [crossTileID: number]: boolean;
  }; };
  lng: number;
  constructor();
  handleWrapJump(lng: number): void;
  addBucket(tileID: OverscaledTileID, bucket: SymbolBucket, crossTileIDs: CrossTileIDs): boolean;
  removeBucketCrossTileIDs(zoom: string | number, removedBucket: TileLayerIndex): void;
  removeStaleBuckets(currentIDs: { [k in string | number]: boolean; }): boolean;
}
declare class CrossTileSymbolIndex {
  layerIndexes: {
    [layerId: string]: CrossTileSymbolLayerIndex;
  };
  crossTileIDs: CrossTileIDs;
  maxBucketInstanceId: number;
  bucketsInCurrentPlacement: {
    [_: number]: boolean;
  };
  constructor();
  addLayer(styleLayer: StyleLayer, tiles: Tile[], lng: number): boolean;
  pruneUnusedLayers(usedLayers: string[]): void;
}
//#endregion
//#region src/style/style.d.ts
/**
 * A feature identifier that is bound to a source
 */
type FeatureIdentifier = {
  /**
   * Unique id of the feature.
   */
  id?: string | number | undefined;
  /**
   * The id of the vector or GeoJSON source for the feature.
   */
  source: string;
  /**
   * *For vector tile sources, `sourceLayer` is required.*
   */
  sourceLayer?: string | undefined;
};
/**
 * The options object related to the {@link Map}'s style related methods
 */
type StyleOptions = {
  /**
   * If false, style validation will be skipped. Useful in production environment.
   */
  validate?: boolean;
  /**
   * Defines a CSS
   * font-family for locally overriding generation of Chinese, Japanese, and Korean characters.
   * For these characters, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * Set to `false`, to enable font settings from the map's style for these glyph ranges.
   * Forces a full update.
   */
  localIdeographFontFamily?: string | false;
  /**
   * Defines an initial global state for the map style. It overrides the defaults defined in the map style, as if {@link Map.setGlobalStateProperty} was called after loading the style.
   */
  globalState?: Record<string, any>;
};
/**
 * Supporting type to add validation to another style related type
 */
type StyleSetterOptions = {
  /**
   * Whether to check if the filter conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
   */
  validate?: boolean;
  /**
   * Defines an initial global state for the map style. It overrides the defaults defined in the map style, as if {@link Map.setGlobalStateProperty} was called after loading the style.
   */
  globalState?: Record<string, any>;
};
/**
 * Part of {@link Map.setStyle} options, transformStyle is a convenience function that allows to modify a style after it is fetched but before it is committed to the map state.
 *
 * This function exposes previous and next styles, it can be commonly used to support a range of functionalities like:
 *
 * - when previous style carries certain 'state' that needs to be carried over to a new style gracefully;
 * - when a desired style is a certain combination of previous and incoming style;
 * - when an incoming style requires modification based on external state.
 * - when an incoming style uses relative paths, which need to be converted to absolute.
 *
 * @param previous - The current style.
 * @param next - The next style.
 * @returns resulting style that will to be applied to the map
 *
 * @example
 * ```ts
 * map.setStyle('https://demotiles.maplibre.org/style.json', {
 *   transformStyle: (previousStyle, nextStyle) => ({
 *       ...nextStyle,
 *       // make relative sprite path like "../sprite" absolute
 *       sprite: new URL(nextStyle.sprite, "https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprites/").href,
 *       // make relative glyphs path like "../fonts/{fontstack}/{range}.pbf" absolute
 *       glyphs: new URL(nextStyle.glyphs, "https://demotiles.maplibre.org/font/").href,
 *       sources: {
 *           // make relative vector url like "../../" absolute
 *           ...nextStyle.sources.map(source => {
 *              if (source.url) {
 *                  source.url = new URL(source.url, "https://tiles.openfreemap.org/planet");
 *              }
 *              return source;
 *           }),
 *           // copy a source from previous style
 *           'osm': previousStyle.sources.osm
 *       },
 *       layers: [
 *           // background layer
 *           nextStyle.layers[0],
 *           // copy a layer from previous style
 *           previousStyle.layers[0],
 *           // other layers from the next style
 *           ...nextStyle.layers.slice(1).map(layer => {
 *               // hide the layers we don't need from demotiles style
 *               if (layer.id.startsWith('geolines')) {
 *                   layer.layout = {...layer.layout || {}, visibility: 'none'};
 *               // filter out US polygons
 *               } else if (layer.id.startsWith('coastline') || layer.id.startsWith('countries')) {
 *                   layer.filter = ['!=', ['get', 'ADM0_A3'], 'USA'];
 *               }
 *               return layer;
 *           })
 *       ]
 *   })
 * });
 * ```
 */
type TransformStyleFunction = (previous: StyleSpecification | undefined, next: StyleSpecification) => StyleSpecification;
/**
 * The options object related to the {@link Map}'s style related methods
 */
type StyleSwapOptions = {
  /**
   * If false, force a 'full' update, removing the current style
   * and building the given one instead of attempting a diff-based update.
   */
  diff?: boolean;
  /**
   * TransformStyleFunction is a convenience function
   * that allows to modify a style after it is fetched but before it is committed to the map state. Refer to {@link TransformStyleFunction}.
   */
  transformStyle?: TransformStyleFunction;
};
/**
 * Specifies a layer to be added to a {@link Style}. In addition to a standard {@link LayerSpecification}
 * or a {@link CustomLayerInterface}, a {@link LayerSpecification} with an embedded {@link SourceSpecification} can also be provided.
 */
type AddLayerObject = LayerSpecification | (Omit<LayerSpecification, "source"> & {
  source: SourceSpecification;
}) | CustomLayerInterface;
/**
 * The Style base class
 */
export declare class Style extends Evented<MapEventType> {
  map: Map$1;
  stylesheet: StyleSpecification;
  dispatcher: Dispatcher;
  imageManager: ImageManager;
  patternAtlas: PatternAtlas;
  glyphManager: GlyphManager;
  lineAtlas: LineAtlas;
  light: Light;
  projection: Projection | undefined;
  sky: Sky;
  _frameRequest: AbortController;
  _loadStyleRequest: AbortController;
  _spriteRequest: AbortController;
  _layers: {
    [_: string]: StyleLayer;
  };
  _serializedLayers: {
    [_: string]: LayerSpecification;
  };
  _order: string[];
  tileManagers: {
    [_: string]: TileManager;
  };
  zoomHistory: ZoomHistory;
  _loaded: boolean;
  _changed: boolean;
  _updatedSources: {
    [_: string]: "clear" | "reload";
  };
  _updatedLayers: {
    [_: string]: true;
  };
  _removedLayers: {
    [_: string]: StyleLayer;
  };
  _changedImages: {
    [_: string]: true;
  };
  _imagesListDirty: boolean;
  _glyphsDidChange: boolean;
  _updatedPaintProps: {
    [layer: string]: true;
  };
  _layerOrderChanged: boolean;
  _symbolPlacementTriggered: boolean;
  _placedProjectionTransition: number;
  _initialGlobalState: Record<string, any>;
  _globalState: Record<string, any>;
  crossTileSymbolIndex: CrossTileSymbolIndex;
  pauseablePlacement: PauseablePlacement;
  placement: Placement;
  z: number;
  constructor(map: Map$1, options?: StyleOptions);
  private _setInitialValues;
  _rtlPluginLoaded: () => void;
  setGlobalStateProperty(name: string, value: any): this;
  getGlobalState(): Record<string, any>;
  setGlobalState(newStylesheetState: StateSpecification): void;
  /** Sets the keys in `values` that differ, keeping a copy of the state from before so readers transition from it. */
  _setGlobalStateValues(values: Record<string, any>): void;
  /**
   * @internal
   * Find all sources that are affected by the global state changes and reload them.
   * Find all paint, light and sky properties that are affected and transition them from `priorGlobalState`, the state before the change.
   * For example, if a layer filter uses global-state expression, this function will find the source id of that layer.
   */
  _applyGlobalStateChanges(globalStateRefs: string[], priorGlobalState: Record<string, any>): void;
  loadURL(url: string, options?: StyleSwapOptions & StyleSetterOptions, previousStyle?: StyleSpecification): Promise<void>;
  loadJSON(json: StyleSpecification, options?: StyleSetterOptions & StyleSwapOptions, previousStyle?: StyleSpecification): void;
  loadEmpty(): void;
  _load(json: StyleSpecification, options: StyleSwapOptions & StyleSetterOptions, previousStyle?: StyleSpecification): void;
  private _createLayers;
  _loadSprite(sprite: SpriteSpecification, isUpdate?: boolean, completion?: (err: Error) => void): Promise<void>;
  _unloadSprite(): void;
  _validateLayer(layer: StyleLayer): void;
  loaded(): boolean;
  /**
   * @hidden
   * take an array of string IDs, and based on this._layers, generate an array of LayerSpecification
   * @param ids - an array of string IDs, for which serialized layers will be generated. If omitted, all serialized layers will be returned
   * @param returnClone - if true, return a clone of the layer object
   * @returns generated result
   */
  private _serializeByIds;
  /**
   * @hidden
   * Lazy initialization of this._serializedLayers dictionary and return it
   * @returns this._serializedLayers dictionary
   */
  private _serializedAllLayers;
  hasTransitions(): boolean;
  _checkLoaded(): void;
  /**
   * @internal
   * Apply queued style updates in a batch and recalculate zoom-dependent paint properties.
   */
  update(parameters: EvaluationParameters): void;
  _updateTilesForChangedImages(): void;
  _updateTilesForChangedGlyphs(): void;
  _updateWorkerLayers(updatedIds: string[], removedIds: string[]): void;
  /** Tells the layers that the canvas was resized. */
  resize(): void;
  _resetUpdates(): void;
  /**
   * Update this style's state to match the given style JSON, performing only
   * the necessary mutations.
   *
   * May throw an Error ('Unimplemented: METHOD') if the maplibre-gl-style-spec
   * diff algorithm produces an operation that is not supported.
   *
   * @returns true if any changes were made; false otherwise
   */
  setState(nextState: StyleSpecification, options?: StyleSwapOptions & StyleSetterOptions): boolean;
  /**
   * Translates a style diff into the calls that apply it to this style.
   * @param diff - the operations produced by the style-spec diff algorithm
   * @returns the operations to run, and the names of the commands that are not supported
   */
  _getOperationsToPerform(diff: DiffCommand[]): {
    operations: Array<() => void>;
    unimplemented: string[];
  };
  addImage(id: string, image: StyleImage): void;
  updateImage(id: string, image: StyleImage): void;
  getImage(id: string): StyleImage;
  setMissingImageResolver(resolver: MissingImageRequestHandler | null): void;
  removeImage(id: string): void;
  /**
   * Queues the tiles that depend on these images to be reloaded on the next update, which is
   * needed whenever an image appears, disappears or changes size.
   */
  _markImagesChanged(ids: string[]): void;
  _afterImageUpdated(id: string): void;
  listImages(): string[];
  addSource(id: string, source: SourceSpecification | CanvasSourceSpecification, options?: StyleSetterOptions): void;
  /**
   * Remove a source from this stylesheet, given its id.
   * @param id - id of the source to remove
   * @throws if no source is found with the given ID
   */
  removeSource(id: string): this;
  /**
   * Set the data of a GeoJSON source, given its id.
   * @param id - id of the source
   * @param data - GeoJSON source
   */
  setGeoJSONSourceData(id: string, data: GeoJSON.GeoJSON | string): void;
  /**
   * Get a source by ID.
   * @param id - ID of the desired source
   * @returns source
   */
  getSource(id: string): Source | undefined;
  /**
   * Add a layer to the map style. The layer will be inserted before the layer with
   * ID `before`, or appended if `before` is omitted.
   * @param layerObject - The style layer to add.
   * @param before - ID of an existing layer to insert before
   * @param options - Style setter options.
   */
  addLayer(layerObject: AddLayerObject, before?: string, options?: StyleSetterOptions): this;
  /**
   * Moves a layer to a different z-position. The layer will be inserted before the layer with
   * ID `before`, or appended if `before` is omitted.
   * @param id - ID of the layer to move
   * @param before - ID of an existing layer to insert before
   */
  moveLayer(id: string, before?: string): void;
  /**
   * Remove the layer with the given id from the style.
   * A {@link ErrorEvent} event will be fired if no such layer exists.
   *
   * @param id - id of the layer to remove
   */
  removeLayer(id: string): void;
  /**
   * Return the style layer object with the given `id`.
   *
   * @param id - id of the desired layer
   * @returns a layer, if one with the given `id` exists
   */
  getLayer(id: string): StyleLayer | undefined;
  /**
   * Return the ids of all layers currently in the style, including custom layers, in order.
   *
   * @returns ids of layers, in order
   */
  getLayersOrder(): string[];
  /**
   * Checks if a specific layer is present within the style.
   *
   * @param id - the id of the desired layer
   * @returns a boolean specifying if the given layer is present
   */
  hasLayer(id: string): boolean;
  setLayerZoomRange(layerId: string, minzoom?: number | null, maxzoom?: number | null): void;
  setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): void;
  /**
   * Get a layer's filter object
   * @param layer - the layer to inspect
   * @returns the layer's filter, if any
   */
  getFilter(layer: string): FilterSpecification | void;
  setLayoutProperty<K extends keyof AllLayoutProperties>(layerId: string, name: K, value: AllLayoutProperties[K], options?: StyleSetterOptions): void;
  /**
   * Get a layout property's value from a given layer
   * @param layerId - the layer to inspect
   * @param name - the name of the layout property
   * @returns the property value
   */
  getLayoutProperty<K extends keyof AllLayoutProperties>(layerId: string, name: K): AllLayoutProperties[K] | undefined;
  setPaintProperty<K extends keyof AllPaintProperties>(layerId: string, name: K, value: AllPaintProperties[K], options?: StyleSetterOptions): void;
  _updatePaintProperty<K extends keyof AllPaintProperties>(layer: StyleLayer, name: K, value: AllPaintProperties[K], options?: StyleSetterOptions): void;
  getPaintProperty<K extends keyof AllPaintProperties>(layer: string, name: K): AllPaintProperties[K];
  setFeatureState(target: FeatureIdentifier, state: any): void;
  removeFeatureState(target: FeatureIdentifier, key?: string): void;
  getFeatureState(target: FeatureIdentifier): FeatureState;
  getTransition(): {
    duration: number;
    delay: number;
  } & TransitionSpecification;
  serialize(): StyleSpecification | undefined;
  _updateLayer(layer: StyleLayer): void;
  _flattenAndSortRenderedFeatures(sourceResults: QueryRenderedFeaturesResults[]): MapGeoJSONFeature[];
  queryRenderedFeatures(queryGeometry: Point$1[], params: QueryRenderedFeaturesOptions, transform: IReadonlyTransform): MapGeoJSONFeature[];
  querySourceFeatures(sourceID: string, params?: QuerySourceFeatureOptions): GeoJSONFeature[];
  getLight(): LightSpecification;
  setLight(lightOptions: LightSpecification, options?: StyleSetterOptions): void;
  getProjection(): ProjectionSpecification;
  setProjection(projection?: ProjectionSpecification): void;
  getSky(): SkySpecification;
  setSky(skyOptions?: SkySpecification, options?: StyleSetterOptions): void;
  _setProjectionInternal(name: ProjectionSpecification["type"]): void;
  _validate(validate: Validator, key: string, value: any, props: any, options?: StyleSetterOptions): boolean;
  _remove(mapRemoved?: boolean): void;
  _clearSource(id: string): void;
  _reloadSource(id: string): void;
  _updateSources(transform: ITransform): void;
  _generateCollisionBoxes(): void;
  /**
   * Re-places symbols on the next frame.
   * Placement is skipped while its inputs look unchanged, so call this when something
   * the map cannot see for itself has moved symbols.
   */
  triggerSymbolPlacement(): void;
  /**
   * Whether re-running symbol placement could produce a different result than the last run.
   * Every camera and viewport parameter placement can observe perturbs the model-view-projection
   * matrix, so comparing the matrix covers them all. Inputs the matrix cannot see arrive as
   * {@link triggerSymbolPlacement} calls.
   *
   * @internal
   */
  _placementInputsChanged(transform: ITransform, showCollisionBoxes: boolean, crossSourceCollisions: boolean): boolean;
  _updatePlacement(transform: ITransform, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, forceFullPlacement?: boolean): boolean;
  _releaseSymbolFadeTiles(): void;
  getImages(mapId: string | number, params: GetImagesParameters): Promise<GetImagesResponse>;
  getGlyphs(mapId: string | number, params: GetGlyphsParameters): Promise<GlyphMap>;
  getGlyphsUrl(): string | null;
  setGlyphs(glyphsUrl: string | null | undefined, options?: StyleSetterOptions): void;
  getFontFaces(): FontFacesSpecification | null;
  setFontFaces(fontFaces: FontFacesSpecification | null | undefined): void;
  getDashes(mapId: string | number, params: GetDashesParameters): Promise<GetDashesResponse>;
  /**
   * Add a sprite.
   *
   * @param id - The id of the desired sprite
   * @param url - The url to load the desired sprite from
   * @param options - The style setter options
   * @param completion - The completion handler
   */
  addSprite(id: string, url: string, options?: StyleSetterOptions, completion?: (err: Error) => void): void;
  /**
   * Remove a sprite by its id. When the last sprite is removed, the whole `this.stylesheet.sprite` object becomes
   * `undefined`. This falsy `undefined` value later prevents attempts to load the sprite when it's absent.
   *
   * @param id - the id of the sprite to remove
   */
  removeSprite(id: string): void;
  /**
   * Get the current sprite value.
   *
   * @returns empty array when no sprite is set; id-url pairs otherwise
   */
  getSprite(): Array<{
    id: string;
    url: string;
  }>;
  /**
   * Set a new value for the style's sprite.
   *
   * @param sprite - new sprite value
   * @param options - style setter options
   * @param completion - the completion handler
   */
  setSprite(sprite: SpriteSpecification, options?: StyleSetterOptions, completion?: (err: Error) => void): void;
  /**
   * Destroys all internal resources of the style (sources, images, layers, etc.)
   */
  destroy(): void;
}
//#endregion
//#region src/style/validate_style.d.ts
/**
 * Validates a single part of a style, e.g. a source, a filter or a paint property.
 * The options it takes are the ones assembled by {@link validateAndEmit}.
 */
type Validator = (options: any) => readonly ValidationError[];
//#endregion
//#region src/style/style_layer.d.ts
type PaintPropertyEntry = { [K in keyof AllPaintProperties]: {
  name: K;
  value: AllPaintProperties[K];
}; }[keyof AllPaintProperties];
type QueryIntersectsFeatureParams = {
  /**
   * The geometry to check intersection with.
   * This geometry is in tile coordinates.
   */
  queryGeometry: Point$1[];
  /**
   * The feature to allow expression evaluation.
   */
  feature: VectorTileFeatureLike;
  /**
   * The feature state to allow expression evaluation.
   */
  featureState: FeatureState;
  /**
   * The geometry of the feature.
   * This geometry is in tile coordinates.
   */
  geometry: Point$1[][];
  /**
   * The current zoom level.
   */
  zoom: number;
  /**
   * The transform to convert from tile coordinates to pixels.
   */
  transform: IReadonlyTransform;
  /**
   * The number of pixels per tile unit.
   */
  pixelsToTileUnits: number;
  /**
   * The matrix to convert from tile coordinates to pixel coordinates.
   * The pixel coordinates are relative to the center of the screen.
   */
  pixelPosMatrix: mat4;
  /**
   * The unwrapped tile ID for the tile being queried.
   */
  unwrappedTileID: UnwrappedTileID;
  /**
   * A function to get the elevation of a point in tile coordinates.
   */
  getElevation: GetElevation | undefined;
};
/**
 * A base class for style layers
 */
declare abstract class StyleLayer extends Evented<ErrorEventType> {
  id: string;
  metadata: unknown;
  type: LayerSpecification["type"] | CustomLayerInterface["type"];
  source: string;
  sourceLayer: string;
  minzoom: number;
  maxzoom: number;
  filter: FilterSpecification | void;
  visibility: VisibilitySpecification;
  private _evaluatedVisibility;
  _crossfadeParameters: CrossfadeParameters;
  _unevaluatedLayout: Layout<any>;
  readonly layout: unknown;
  _transitionablePaint: Transitionable<any>;
  _transitioningPaint: Transitioning<any>;
  readonly paint: unknown;
  _featureFilter: FeatureFilter;
  _visibilityExpression: VisibilityExpression;
  readonly onAdd: ((map: Map$1) => void);
  readonly onRemove: ((map: Map$1) => void);
  queryRadius?(bucket: Bucket): number;
  queryIntersectsFeature?(params: QueryIntersectsFeatureParams): boolean | number;
  createBucket?(parameters: BucketParameters<any>): Bucket;
  private _globalState;
  constructor(layer: LayerSpecification | CustomLayerInterface, properties: Readonly<{
    layout?: Properties<any>;
    paint?: Properties<any>;
  }>, globalState: Record<string, any>);
  setFilter(filter: FilterSpecification | void): void;
  getCrossfadeParameters(): CrossfadeParameters;
  getLayoutProperty<K extends keyof AllLayoutProperties>(name: K): AllLayoutProperties[K];
  /**
   * Get list of global state references that are used within layout or filter properties.
   * This is used to determine if layer source need to be reloaded when global state property changes.
   *
   */
  getLayoutAffectingGlobalStateRefs(): Set<string>;
  /**
   * Get list of global state references that are used within paint properties.
   * This is used to determine if layer needs to be repainted when global state property changes.
   *
   */
  getPaintAffectingGlobalStateRefs(): globalThis.Map<string, PaintPropertyEntry[]>;
  /**
   * Get list of global state references that are used within visibility expression.
   * This is used to determine if layer visibility needs to be updated when global state property changes.
   */
  getVisibilityAffectingGlobalStateRefs(): Set<string>;
  setLayoutProperty<K extends keyof AllLayoutProperties>(name: K, value: AllLayoutProperties[K], options?: StyleSetterOptions): void;
  getPaintProperty<K extends keyof AllPaintProperties>(name: K): AllPaintProperties[K];
  setPaintProperty<K extends keyof AllPaintProperties>(name: K, value: AllPaintProperties[K], options?: StyleSetterOptions): boolean;
  _handleSpecialPaintPropertyUpdate(_: string): void;
  _handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
  isHidden(zoom?: number, roundMinZoom?: boolean): boolean;
  updateTransitions(parameters: TransitionParameters): void;
  /** The re-read itself goes through `setPaintProperty`, which also rebuilds colour ramps and relayouts. */
  retainPriorGlobalState(refs: string[], priorGlobalState: Record<string, any>): void;
  hasTransition(): boolean;
  recalculateVisibility(): void;
  recalculate(parameters: EvaluationParameters, availableImages: string[]): void;
  serialize(): LayerSpecification;
  _validate(validate: Validator, key: string, name: string, value: unknown, options?: StyleSetterOptions): boolean;
  is3D(): boolean;
  isTileClipped(): boolean;
  hasOffscreenPass(): boolean;
  resize(): void;
  isStateDependent(): boolean;
}
//#endregion
//#region src/style/style_layer_index.d.ts
type LayerConfigs = {
  [_: string]: LayerSpecification;
};
declare class StyleLayerIndex {
  familiesBySource: {
    [source: string]: {
      [sourceLayer: string]: StyleLayer[][];
    };
  };
  keyCache: {
    [source: string]: string;
  };
  _layerConfigs: LayerConfigs;
  _layers: {
    [_: string]: StyleLayer;
  };
  constructor(layerConfigs?: LayerSpecification[] | null, globalState?: Record<string, any>);
  replace(layerConfigs: LayerSpecification[], globalState?: Record<string, any>): void;
  update(layerConfigs: LayerSpecification[], removedIds: string[], globalState?: Record<string, any>): void;
}
//#endregion
//#region src/source/geojson_worker_source.d.ts
/**
 * The geojson worker options that can be passed to the worker
 */
type GeoJSONWorkerOptions = {
  source?: string;
  geojsonVtOptions?: GeoJSONVTOptions;
  clusterProperties?: Record<string, [unknown, unknown]>;
  filter?: FilterSpecification;
  collectResourceTiming?: boolean;
};
/**
 * Parameters needed to load GeoJSON to the worker - must specify either a `request`, `data` or `dataDiff`.
 */
type LoadGeoJSONParameters = GeoJSONWorkerOptions & {
  type: "geojson";
  /** The geojson source ID. */
  source: string;
  /**
   * Request parameters including a URL to fetch GeoJSON data.
   */
  request?: RequestParameters;
  /**
   * GeoJSON data to set as the source's data.
   */
  data?: GeoJSON.GeoJSON;
  /**
   * GeoJSONSourceDiff to apply to the existing GeoJSON source data.
   */
  dataDiff?: GeoJSONSourceDiff;
  /**
   * Update the supercluster using the latest worker cluster options, after applying {@link dataDiff} if there is one.
   */
  updateCluster?: boolean;
};
//#endregion
//#region src/source/rtl_text_plugin_status.d.ts
/**
 * The possible option of the plugin's status
 *
 * @deprecated Right-to-left text is drawn without a plugin, so this describes only a plugin set
 * through the deprecated {@link setRTLTextPlugin}.
 *
 * `unavailable`: Not loaded.
 *
 * `deferred`: The plugin URL has been specified, but loading has been deferred.
 *
 * `requested`: at least one tile needs RTL to render, but the plugin has not been set
 *
 * `loading`: RTL is in the process of being loaded by worker.
 *
 * `loaded`: The plugin is now loaded
 *
 *  `error`: The plugin failed to load
 */
type RTLPluginStatus = "unavailable" | "deferred" | "requested" | "loading" | "loaded" | "error";
/**
 * The RTL plugin state
 *
 * @deprecated Right-to-left text is drawn without a plugin, so this describes only a plugin set
 * through the deprecated {@link setRTLTextPlugin}.
 */
type PluginState = {
  pluginStatus: RTLPluginStatus;
  pluginURL: string;
};
//#endregion
//#region src/util/actor_messages.d.ts
/**
 * The parameters needed in order to get information about the cluster
 */
type ClusterIDAndSource = {
  type: "geojson";
  clusterId: number;
  source: string;
};
/**
 * Parameters needed to get the leaves of a cluster
 */
type GetClusterLeavesParams = ClusterIDAndSource & {
  limit: number;
  offset: number;
};
/**
 * The result of the call to load a geojson source
 */
type GeoJSONWorkerSourceLoadDataResult = {
  resourceTiming?: {
    [_: string]: PerformanceResourceTiming[];
  };
  abandoned?: boolean;
  data?: GeoJSON.GeoJSON;
};
/**
 * Parameters needed to remove a source
 */
type RemoveSourceParams = {
  source: string;
  type: string;
};
/**
 * Parameters needed to update the layers
 */
type UpdateLayersParameters = {
  layers: LayerSpecification[];
  removedIds: string[];
};
/**
 * Parameters needed to get the images
 */
type GetImagesParameters = {
  icons: string[];
  source: string;
  tileID: OverscaledTileID;
  type: string;
};
/**
 * Parameters needed to get the glyphs
 */
type GetGlyphsParameters = {
  type: string;
  /** Grapheme clusters requested for each font stack and variant. */
  stacks: GlyphRequests;
  source: string;
  tileID: OverscaledTileID;
};
/**
 * A response object returned when requesting images
 */
type GetImagesResponse = {
  [_: string]: StyleImage;
};
/**
 * Parameters needed to get the line dashes
 */
type GetDashesParameters = {
  dashes: {
    [key: string]: {
      dasharray: number[];
      round: boolean;
    };
  };
};
/**
 * A response object returned when requesting line dashes
 */
type GetDashesResponse = {
  [dashId: string]: DashEntry;
};
/**
 * All the possible message types that can be sent to and from the worker
 */
declare const enum MessageType {
  loadDEMTile = "LDT",
  getClusterExpansionZoom = "GCEZ",
  getClusterChildren = "GCC",
  getClusterLeaves = "GCL",
  loadData = "LD",
  loadTile = "LT",
  reloadTile = "RT",
  getGlyphs = "GG",
  getDashes = "GDA",
  getImages = "GI",
  setImages = "SI",
  updateGlobalState = "UGS",
  setLayers = "SL",
  updateLayers = "UL",
  syncRTLPluginState = "SRPS",
  setReferrer = "SR",
  removeSource = "RS",
  removeMap = "RM",
  importScript = "IS",
  removeTile = "RMT",
  abortTile = "AT",
  removeDEMTile = "RDT",
  getResource = "GR"
}
/**
 * This is basically a mapping between all the calls that are made to and from the workers.
 * The key is the event name, the first parameter is the event input type, and the last parameter is the output type.
 */
type RequestResponseMessageMap = {
  [MessageType.loadDEMTile]: [WorkerDEMTileParameters, DEMData];
  [MessageType.getClusterExpansionZoom]: [ClusterIDAndSource, number];
  [MessageType.getClusterChildren]: [ClusterIDAndSource, GeoJSON.Feature[]];
  [MessageType.getClusterLeaves]: [GetClusterLeavesParams, GeoJSON.Feature[]];
  [MessageType.loadData]: [LoadGeoJSONParameters, GeoJSONWorkerSourceLoadDataResult];
  [MessageType.loadTile]: [WorkerTileParameters, WorkerTileResult];
  [MessageType.reloadTile]: [WorkerTileParameters, WorkerTileResult];
  [MessageType.getGlyphs]: [GetGlyphsParameters, GlyphMap];
  [MessageType.getImages]: [GetImagesParameters, GetImagesResponse];
  [MessageType.setImages]: [string[], void];
  [MessageType.updateGlobalState]: [Record<string, any>, void];
  [MessageType.setLayers]: [LayerSpecification[], void];
  [MessageType.updateLayers]: [UpdateLayersParameters, void];
  [MessageType.syncRTLPluginState]: [PluginState, PluginState];
  [MessageType.setReferrer]: [string, void];
  [MessageType.removeSource]: [RemoveSourceParams, void];
  [MessageType.removeMap]: [undefined, void];
  [MessageType.importScript]: [string, void];
  [MessageType.removeTile]: [TileParameters, void];
  [MessageType.abortTile]: [TileParameters, void];
  [MessageType.removeDEMTile]: [TileParameters, void];
  [MessageType.getResource]: [RequestParameters, GetResourceResponse<any>];
  [MessageType.getDashes]: [GetDashesParameters, GetDashesResponse];
};
/**
 * The message to be sent by the actor
 */
type ActorMessage<T extends MessageType> = {
  type: T;
  data: RequestResponseMessageMap[T][0];
  targetMapId?: string | number | null;
  mustQueue?: boolean;
  sourceMapId?: string | number | null;
};
//#endregion
//#region src/util/actor.d.ts
/**
 * An interface to be sent to the actor in order for it to allow communication between the worker and the main thread
 */
interface ActorTarget {
  addEventListener: typeof window.addEventListener;
  removeEventListener: typeof window.removeEventListener;
  postMessage: typeof window.postMessage;
  terminate?: () => void;
}
/**
 * This is used to define the parameters of the message that is sent to the worker and back
 */
type MessageData = {
  id: string;
  type: MessageType | "<cancel>" | "<response>";
  origin: string;
  data?: Serialized;
  targetMapId?: string | number | null;
  mustQueue?: boolean;
  error?: Serialized | null;
  sourceMapId: string | number | null;
};
type ResolveReject = {
  resolve: (value?: RequestResponseMessageMap[MessageType][1]) => void;
  reject: (reason?: Error) => void;
};
/**
 * This interface allowing to substitute only the sendAsync method of the Actor class.
 */
interface IActor {
  sendAsync<T extends MessageType>(message: ActorMessage<T>, abortController?: AbortController): Promise<RequestResponseMessageMap[T][1]>;
}
type MessageHandler<T extends MessageType> = (mapId: string | number, params: RequestResponseMessageMap[T][0], abortController?: AbortController) => Promise<RequestResponseMessageMap[T][1]>;
/**
 * An implementation of the [Actor design pattern](https://en.wikipedia.org/wiki/Actor_model)
 * that maintains the relationship between asynchronous tasks and the objects
 * that spin them off - in this case, tasks like parsing parts of styles,
 * owned by the styles
 */
declare class Actor implements IActor {
  target: ActorTarget;
  mapId: string | number | null;
  resolveRejects: {
    [x: string]: ResolveReject;
  };
  name: string;
  tasks: {
    [x: string]: MessageData;
  };
  taskQueue: string[];
  abortControllers: {
    [x: number | string]: AbortController;
  };
  invoker: ThrottledInvoker;
  globalScope: ActorTarget;
  messageHandlers: { [K in MessageType]?: MessageHandler<K>; };
  subscription: Subscription;
  /**
   * @param target - The target
   * @param mapId - A unique identifier for the Map instance using this Actor.
   */
  constructor(target: ActorTarget, mapId?: string | number);
  registerMessageHandler<T extends MessageType>(type: T, handler: MessageHandler<T>): void;
  unregisterMessageHandler<T extends MessageType>(type: T): void;
  /**
   * Sends a message from a main-thread map to a Worker or from a Worker back to
   * a main-thread map instance.
   * @param message - the message to send
   * @param abortController - an optional AbortController to abort the request
   * @returns a promise that will be resolved with the response data
   */
  sendAsync<T extends MessageType>(message: ActorMessage<T>, abortController?: AbortController): Promise<RequestResponseMessageMap[T][1]>;
  receive(message: {
    data: MessageData;
  }): void;
  process(): void;
  processTask(id: string, task: MessageData): Promise<void>;
  completeTask(id: string, err: Error, data?: RequestResponseMessageMap[MessageType][1]): void;
  remove(): void;
}
//#endregion
//#region src/source/raster_dem_tile_worker_source.d.ts
declare class RasterDEMTileWorkerSource {
  actor: Actor;
  loaded: {
    [_: string]: DEMData;
  };
  constructor();
  loadTile(params: WorkerDEMTileParameters): Promise<DEMData | null>;
  removeTile(params: TileParameters): void;
}
//#endregion
//#region src/source/worker.d.ts
/**
 * The Worker class responsible for background thread related execution
 */
declare class Worker$1 {
  self: WorkerGlobalScopeInterface & ActorTarget;
  actor: Actor;
  layerIndexes: {
    [_: string]: StyleLayerIndex;
  };
  availableImages: {
    [_: string]: string[];
  };
  externalWorkerSourceTypes: {
    [_: string]: WorkerSourceConstructor;
  };
  /**
   * This holds a cache for the already created worker source instances.
   * The cache is build with the following hierarchy:
   * [mapId][sourceType][sourceName]: worker source instance
   * sourceType can be 'vector' for example
   */
  workerSources: {
    [_: string]: {
      [_: string]: {
        [_: string]: WorkerSource;
      };
    };
  };
  /**
   * This holds a cache for the already created DEM worker source instances.
   * The cache is build with the following hierarchy:
   * [mapId][sourceType]: DEM worker source instance
   * sourceType can be 'raster-dem' for example
   */
  demWorkerSources: {
    [_: string]: {
      [_: string]: RasterDEMTileWorkerSource;
    };
  };
  referrer: string;
  globalStates: Map<string, Record<string, any>>;
  constructor(self: WorkerGlobalScopeInterface & ActorTarget);
  private _getGlobalState;
  private _setImages;
  private _syncRTLPluginState;
  private _getAvailableImages;
  private _getLayerIndex;
  /**
   * This is basically a lazy initialization of a worker per mapId and sourceType and sourceName
   * @param mapId - the mapId
   * @param sourceType - the source type - 'vector' for example
   * @param sourceName - the source name - 'osm' for example
   * @returns a new instance or a cached one
   */
  private _getWorkerSource;
  /**
   * This is basically a lazy initialization of a worker per mapId and source
   * @param mapId - the mapId
   * @param sourceType - the source type - 'raster-dem' for example
   * @returns a new instance or a cached one
   */
  private _getDEMWorkerSource;
}
//#endregion
//#region src/util/web_worker.d.ts
interface WorkerGlobalScopeInterface {
  registerWorkerSource: (sourceName: string, sourceConstructor: WorkerSourceConstructor) => void;
  registerRTLTextPlugin: (_: any) => void;
  addProtocol: (customProtocol: string, loadFn: AddProtocolAction) => void;
  removeProtocol: (customProtocol: string) => void;
  makeRequest: (request: RequestParameters, abortController: AbortController) => Promise<GetResourceResponse<any>>;
  worker: Worker$1;
}
//#endregion
//#region src/util/util.d.ts
/**
 * A 4x4 gl-matrix matrix backed by 32-bit floats.
 */
type Mat4f32 = mat4 & Float32Array;
/**
 * A 4x4 gl-matrix matrix backed by 64-bit floats.
 */
type Mat4f64 = mat4 & Float64Array;
/**
 * Allows to unsubscribe from events without the need to store the method reference.
 */
interface Subscription {
  /**
   * Unsubscribes from the event.
   */
  unsubscribe(): void;
}
/**
 * Makes optional keys required and add the the undefined type.
 *
 * ```
 * interface Test {
 *  foo: number;
 *  bar?: number;
 *  baz: number | undefined;
 * }
 *
 * Complete<Test> {
 *  foo: number;
 *  bar: number | undefined;
 *  baz: number | undefined;
 * }
 *
 * ```
 *
 * See https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
 */
type Complete<T> = { [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined); };
/**
 * A helper to allow require of at least one property
 */
type RequireAtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>; }[keyof T];
/**
 * A helper to allow require exactly one one property
 */
type ExactlyOne<T, Keys extends keyof T = keyof T> = { [K in Keys]: Required<Pick<T, K>> & { [P in Exclude<Keys, K>]?: never; }; }[Keys];
//#endregion
//#region src/ui/hash.d.ts
/**
 * Adds the map's position to its page's location hash.
 * Passed as an option to the map object.
 *
 * @group Markers and Controls
 */
export declare class Hash {
  _map: Map$1;
  _hashName: string;
  constructor(hashName?: string | null);
  /**
   * Map element to listen for coordinate changes
   *
   * @param map - The map object
   */
  addTo(map: Map$1): this;
  /**
   * Removes hash
   */
  remove(): this;
  getHashString(mapFeedback?: boolean): string;
  _getHashParams: () => URLSearchParams;
  _getCurrentHash: () => string[];
  _onHashChange: () => boolean;
  _updateHashUnthrottled: () => void;
  _removeHash: () => void;
  /**
   * Mobile Safari doesn't allow updating the hash more than 100 times per 30 seconds.
   */
  _updateHash: () => ReturnType<typeof setTimeout>;
  _isValidHash(hash: string[]): boolean;
}
//#endregion
//#region src/ui/handler/drag_handler.d.ts
type DragMovementResult = {
  bearingDelta?: number;
  pitchDelta?: number;
  rollDelta?: number;
  around?: Point$1;
  panDelta?: Point$1;
};
interface DragPanResult extends DragMovementResult {
  around: Point$1;
  panDelta: Point$1;
}
interface DragRotateResult extends DragMovementResult {
  bearingDelta: number;
}
interface DragPitchResult extends DragMovementResult {
  pitchDelta: number;
}
interface DragRollResult extends DragMovementResult {
  rollDelta: number;
}
interface DragMoveHandler<T extends DragMovementResult, E extends Event> extends Handler {
  dragStart: (e: E, point: Point$1) => void;
  dragMove: (e: E, point: Point$1) => T | void;
  dragEnd: (e: E) => void;
}
//#endregion
//#region src/ui/handler/mouse.d.ts
/**
 * `MousePanHandler` allows the user to pan the map by clicking and dragging
 */
interface MousePanHandler extends DragMoveHandler<DragPanResult, MouseEvent> {}
/**
 * `MouseRotateHandler` allows the user to rotate the map by clicking and dragging
 */
interface MouseRotateHandler extends DragMoveHandler<DragRotateResult, MouseEvent> {}
/**
 * `MousePitchHandler` allows the user to zoom the map by pitching
 */
interface MousePitchHandler extends DragMoveHandler<DragPitchResult, MouseEvent> {}
/**
 * `MouseRollHandler` allows the user to roll the camera by holding `Ctrl`, right-clicking and dragging
 */
interface MouseRollHandler extends DragMoveHandler<DragRollResult, MouseEvent> {}
//#endregion
//#region src/ui/handler/touch_pan.d.ts
/**
 * A `TouchPanHandler` allows the user to pan the map using touch gestures.
 */
declare class TouchPanHandler implements Handler {
  _enabled: boolean;
  _active: boolean;
  _touches: { [k in string | number]: Point$1; };
  _clickTolerance: number;
  _sum: Point$1;
  _map: Map$1;
  constructor(options: {
    clickTolerance: number;
  }, map: Map$1);
  reset(): void;
  _shouldBePrevented(touchesCount: number): boolean;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): {
    around: Point$1;
    panDelta: Point$1;
  } | void;
  touchmove(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): {
    around: Point$1;
    panDelta: Point$1;
  } | void;
  touchend(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchcancel(): void;
  _calculateTransform(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): {
    around: Point$1;
    panDelta: Point$1;
  } | void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
//#endregion
//#region src/ui/handler/shim/drag_pan.d.ts
/**
 * A {@link DragPanHandler} options object
 */
type DragPanOptions = {
  /**
   * factor used to scale the drag velocity
   * @defaultValue 0
   */
  linearity?: number;
  /**
   * easing function applied to `map.panTo` when applying the drag.
   * @param t - the easing function
   * @defaultValue bezier(0, 0, 0.3, 1)
   */
  easing?: (t: number) => number;
  /**
   * the maximum value of the drag velocity.
   * @defaultValue 1400
   */
  deceleration?: number;
  /**
   * the rate at which the speed reduces after the pan ends.
   * @defaultValue 2500
   */
  maxSpeed?: number;
};
/**
 * The `DragPanHandler` allows the user to pan the map by clicking and dragging
 * the cursor.
 *
 * @group Handlers
 */
export declare class DragPanHandler {
  _el: HTMLElement;
  _mousePan: MousePanHandler;
  _touchPan: TouchPanHandler;
  _inertiaOptions: DragPanOptions | boolean;
  /** @internal */
  constructor(el: HTMLElement, mousePan: MousePanHandler, touchPan: TouchPanHandler);
  /**
   * Enables the "drag to pan" interaction.
   *
   * @param options - Options object
   * @example
   * ```ts
   *   map.dragPan.enable();
   *   map.dragPan.enable({
   *      linearity: 0.3,
   *      easing: bezier(0, 0, 0.3, 1),
   *      maxSpeed: 1400,
   *      deceleration: 2500,
   *   });
   * ```
   */
  enable(options?: DragPanOptions | boolean): void;
  /**
   * Disables the "drag to pan" interaction.
   *
   * @example
   * ```ts
   * map.dragPan.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "drag to pan" interaction is enabled.
   *
   * @returns `true` if the "drag to pan" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "drag to pan" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "drag to pan" interaction is active.
   */
  isActive(): boolean;
}
//#endregion
//#region src/ui/elevation_hold.d.ts
/** Who holds the center elevation: a gesture, or an animation with `freezeElevation`. */
type ElevationHolder = "gesture" | "animation";
/**
 * A hold on the center elevation, see {@link Camera.holdElevation}: one that started where no DEM data under a center
 * clamped to the ground had loaded, or whose terrain changed to one without DEM data there, waits for it and follows
 * the terrain drawn under the center until the tile there has its own. It holds no transform: a gesture's takes on the
 * terrain change, on the requested camera state its frames read; an animation's on its next frame, on the transform it
 * edits, which a projection change does not replace, or at its end when nothing ran in between.
 */
declare class ElevationHold {
  readonly holder: ElevationHolder;
  /**
   * Where the hold stands with the DEM data under the center:
   * - `loaded`: the tile under the center had its DEM data when the hold started, so the hold keeps its elevation.
   * - `awaiting`: no DEM data under the center yet, from the start or since a terrain change left none there; the
   * hold follows the terrain drawn there, see {@link take}.
   * - `taken`: the hold waited and then took the elevation of the tile's own DEM data. Unlike `loaded`, the elevation
   * came during the hold, so the end keeps the zoom where that data is missing again, see
   * {@link Camera.putCenterBackOnTerrain}.
   */
  private _dem;
  /**
   * While {@link Camera._keepCameraAboveTerrain} has lifted the held elevation: the elevation held and how far above
   * it the camera was lifted, so later frames can lower it again as the terrain allows and tell the lifted elevation
   * from one a take set anew, which carries no lift; null while nothing is lifted.
   */
  lift: {
    heldElevation: number;
    height: number;
  } | null;
  /**
   * Whether {@link Camera._keepCameraAboveTerrain} keeps the drawn terrain below where the center would sit at maxZoom,
   * see {@link Camera._terrainHeightAboveMaxZoomForCenter}: from the start of a hold that starts with the terrain below
   * that point, as on the ground at rest, or from the first frame the terrain is below it. A hold that starts with the
   * terrain above it, as behind a crest, leaves the terrain there.
   */
  keepsTerrainBelowMaxZoomForCenter: boolean;
  private _terrainChanged;
  /**
   * @param holder - who holds the elevation
   * @param startedWithoutDem - whether the hold started without DEM data under the center, and so waits for it
   * @param terrainBelowMaxZoomForCenter - whether the drawn terrain is below where the center would sit at maxZoom when
   * the hold starts, see {@link Camera._terrainHeightAboveMaxZoomForCenter}
   */
  constructor(holder: ElevationHolder, startedWithoutDem: boolean, terrainBelowMaxZoomForCenter: boolean);
  /** Whether the hold waited for DEM data under the center and took the data of the tile there. */
  get tookDem(): boolean;
  /** Asks the next {@link take} to check for DEM data under the center, after the terrain changed. */
  noteTerrainChange(): void;
  /**
   * While the hold waits, takes the elevation the terrain draws under the center: a loaded parent tile's DEM data,
   * drawn in place of the tile's own until that lands, and then the tile's own, which ends the wait. After a terrain
   * change that leaves no DEM data under the center, puts the center back at the 0 the terrain gives there and
   * waits again.
   * @param tr - the transform the gesture or animation edits
   * @param terrain - the terrain under it
   * @returns whether it changed the elevation
   */
  take(tr: ITransform, terrain: Terrain): boolean;
}
//#endregion
//#region src/util/task_queue.d.ts
type TaskID = number;
type Task = {
  callback: (timeStamp: number) => void;
  id: TaskID;
  cancelled: boolean;
};
declare class TaskQueue {
  _queue: Task[];
  _id: TaskID;
  _cleared: boolean;
  _currentlyRunning: Task[] | false;
  constructor();
  add(callback: (timeStamp: number) => void): TaskID;
  remove(id: TaskID): void;
  run(timeStamp?: number): void;
  clear(): void;
}
//#endregion
//#region src/geo/projection/camera_helper.d.ts
type MapControlsDeltas = {
  panDelta: Point$1;
  zoomDelta: number;
  bearingDelta: number;
  pitchDelta: number;
  rollDelta: number;
  around: Point$1;
  /**
   * Elevation in meters of the terrain under `around` at gesture start; when set,
   * pan and zoom keep the terrain at this elevation under `around`.
   */
  aroundElevation?: number;
};
type CameraForBoxAndBearingHandlerResult = {
  center: LngLat;
  zoom: number;
  bearing: number;
};
type EaseToHandlerOptions = {
  bearing: number;
  pitch: number;
  roll: number;
  padding: PaddingOptions;
  offsetAsPoint: Point$1;
  around?: LngLat;
  aroundPoint?: Point$1;
  center?: LngLatLike;
  zoom?: number;
  offset?: PointLike;
};
type EaseToHandlerResult = {
  easeFunc: (k: number) => void;
  /**
   * The map center when the animation ends.
   */
  elevationCenter: LngLat;
  isZooming: boolean;
};
type FlyToHandlerOptions = {
  bearing: number;
  pitch: number;
  roll: number;
  padding: PaddingOptions;
  offsetAsPoint: Point$1;
  center?: LngLatLike;
  locationAtOffset: LngLat;
  zoom?: number;
  minZoom?: number;
};
type FlyToHandlerResult = {
  easeFunc: (k: number, scale: number, centerFactor: number, pointAtOffset: Point$1) => void;
  scaleOfZoom: number;
  scaleOfMinZoom: number;
  /**
   * The map center when the animation ends.
   */
  targetCenter: LngLat;
  pixelPathLength: number;
};
/**
 * @internal
 * Contains projection-specific functions related to camera controls, easeTo, flyTo, inertia, etc.
 */
interface ICameraHelper {
  get useGlobeControls(): boolean;
  handlePanInertia(pan: Point$1, transform: IReadonlyTransform): {
    easingCenter: LngLat;
    easingOffset: Point$1;
  };
  handleMapControlsRollPitchBearingZoom(deltas: MapControlsDeltas, tr: ITransform): void;
  handleMapControlsPan(deltas: MapControlsDeltas, tr: ITransform, preZoomAroundLoc: LngLat): void;
  /**
   * @param fitPadding - The `padding` option of `cameraForBounds`: the space wanted around the bounds.
   * @param mapPadding - The map's own padding, as in `map.getPadding()`, which the bounds must also stay clear of.
   */
  cameraForBoxAndBearing(options: CameraForBoundsOptions, fitPadding: PaddingOptions, mapPadding: PaddingOptions, bounds: LngLatBounds, bearing: number, tr: IReadonlyTransform): CameraForBoxAndBearingHandlerResult;
  handleJumpToCenterZoom(tr: ITransform, options: {
    zoom?: number;
    center?: LngLatLike;
  }): void;
  handleEaseTo(tr: ITransform, options: EaseToHandlerOptions): EaseToHandlerResult;
  handleFlyTo(tr: ITransform, options: FlyToHandlerOptions): FlyToHandlerResult;
}
//#endregion
//#region src/ui/camera.d.ts
/**
 * A [Point](https://github.com/mapbox/point-geometry) or an array of two numbers representing `x` and `y` screen coordinates in pixels.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let p1 = new Point(-77, 38); // a PointLike which is a Point
 * let p2 = [-77, 38]; // a PointLike which is an array of two numbers
 * ```
 */
type PointLike = Point$1 | [number, number];
/**
 * Options common to {@link Map.jumpTo}, {@link Map.easeTo}, and {@link Map.flyTo}, controlling the desired location,
 * zoom, bearing, pitch, and roll of the camera. All properties are optional, and when a property is omitted, the current
 * camera value for that property will remain unchanged.
 *
 * @example
 * Set the map's initial perspective with CameraOptions
 * ```ts
 * let map = new Map({
 *   container: 'map',
 *   style: 'https://demotiles.maplibre.org/style.json',
 *   center: [-73.5804, 45.53483],
 *   pitch: 60,
 *   bearing: -60,
 *   zoom: 10
 * });
 * ```
 * @see [Set pitch and bearing](https://maplibre.org/maplibre-gl-js/docs/examples/set-pitch-and-bearing/)
 * @see [Jump to a series of locations](https://maplibre.org/maplibre-gl-js/docs/examples/jump-to-a-series-of-locations/)
 * @see [Fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location/)
 * @see [Display buildings in 3D](https://maplibre.org/maplibre-gl-js/docs/examples/display-buildings-in-3d/)
 */
type CameraOptions = CenterZoomBearing & {
  /**
   * The desired pitch in degrees. The pitch is the angle towards the horizon
   * measured in degrees with a range between 0 and 60 degrees. For example, pitch: 0 provides the appearance
   * of looking straight down at the map, while pitch: 60 tilts the user's perspective towards the horizon.
   * Increasing the pitch value is often used to display 3D objects.
   */
  pitch?: number;
  /**
   * The desired roll in degrees. The roll is the angle about the camera boresight.
   */
  roll?: number;
  /**
   * The elevation of the center point in meters above sea level.
   */
  elevation?: number;
};
/**
 * Holds center, zoom and bearing properties
 */
type CenterZoomBearing = {
  /**
   * The desired center.
   */
  center?: LngLatLike;
  /**
   * The desired mercator zoom level.
   */
  zoom?: number;
  /**
   * The desired bearing in degrees. The bearing is the compass direction that
   * is "up". For example, `bearing: 90` orients the map so that east is up.
   */
  bearing?: number;
};
/**
 * The options object related to the {@link Map.jumpTo} method
 */
type JumpToOptions = CameraOptions & {
  /**
   * Dimensions in pixels applied on each side of the viewport for shifting the vanishing point.
   */
  padding?: PaddingOptions;
};
/** Options for calculating an anchored camera. */
type AnchoredCameraOptions = {
  /** Geographic location to anchor. */
  anchorLocation: LngLatLike;
  /** Screen position for the anchor. */
  anchorScreenPoint: PointLike;
  /** Desired zoom level. */
  zoom?: number;
};
/**
 * A options object for the {@link Map.cameraForBounds} method
 */
type CameraForBoundsOptions = CameraOptions & {
  /**
   * The amount of padding in pixels to add to the given bounds, on top of the map's current padding.
   */
  padding?: number | PaddingOptions;
  /**
   * If `true`, `padding` replaces the map's current padding instead of adding to it, and is returned with the result.
   * This will become the default in version 7.
   * @defaultValue false
   */
  absolutePadding?: boolean;
  /**
   * The center of the given bounds relative to the map's center, measured in pixels.
   * @defaultValue [0, 0]
   */
  offset?: PointLike;
  /**
   * The maximum zoom level to allow when the camera would transition to the specified bounds.
   */
  maxZoom?: number;
};
/**
 * The {@link Map.flyTo} options object
 */
type FlyToOptions = AnimationOptions & CameraOptions & {
  /**
   * The zooming "curve" that will occur along the
   * flight path. A high value maximizes zooming for an exaggerated animation, while a low
   * value minimizes zooming for an effect closer to {@link Map.easeTo}. 1.42 is the average
   * value selected by participants in the user study discussed in
   * [van Wijk (2003)](https://www.win.tue.nl/~vanwijk/zoompan.pdf). A value of
   * `Math.pow(6, 0.25)` would be equivalent to the root mean squared average velocity. A
   * value of 1 would produce a circular motion.
   * @defaultValue 1.42
   */
  curve?: number;
  /**
   * The minimum zoom level that the flight arc may reach. The animation will
   * not zoom out beyond this level. If the natural flight arc stays within
   * this boundary, the arc is unchanged. This acts as a ceiling on zoom-out
   * even when `options.curve` is also specified.
   */
  minZoom?: number;
  /**
   * The average speed of the animation defined in relation to
   * `options.curve`. A speed of 1.2 means that the map appears to move along the flight path
   * by 1.2 times `options.curve` screenfulls every second. A _screenfull_ is the map's visible span.
   * It does not correspond to a fixed physical distance, but varies by zoom level.
   * @defaultValue 1.2
   */
  speed?: number;
  /**
   * The average speed of the animation measured in screenfulls
   * per second, assuming a linear timing curve. If `options.speed` is specified, this option is ignored.
   */
  screenSpeed?: number;
  /**
   * The animation's maximum duration, measured in milliseconds.
   * If duration exceeds maximum duration, it resets to 0.
   */
  maxDuration?: number;
  /**
   * The amount of padding in pixels to add to the given bounds.
   */
  padding?: number | PaddingOptions;
};
/**
 * The {@link Map.easeTo} options object
 */
type EaseToOptions = AnimationOptions & CameraOptions & {
  delayEndEvents?: number;
  padding?: number | PaddingOptions;
  /**
   * If `zoom` is specified, `around` determines the point around which the zoom is centered.
   */
  around?: LngLatLike;
  easeId?: string;
  noMoveStart?: boolean;
};
/**
 * Options for {@link Map.fitBounds} method
 */
type FitBoundsOptions = FlyToOptions & {
  /**
   * If `true`, the map transitions using {@link Map.easeTo}. If `false`, the map transitions using {@link Map.flyTo}.
   * See those functions and {@link AnimationOptions} for information about options available.
   * @defaultValue false
   */
  linear?: boolean;
  /**
   * If `true`, `padding` replaces the map's current padding instead of adding to it, and the map transitions to it.
   * This will become the default in version 7.
   * @defaultValue false
   */
  absolutePadding?: boolean;
  /**
   * The center of the given bounds relative to the map's center, measured in pixels.
   * @defaultValue [0, 0]
   */
  offset?: PointLike;
  /**
   * The maximum zoom level to allow when the map view transitions to the specified bounds.
   */
  maxZoom?: number;
};
/**
 * Options common to map movement methods that involve animation, such as {@link Map.panBy} and
 * {@link Map.easeTo}, controlling the duration and easing function of the animation. All properties
 * are optional.
 *
 */
type AnimationOptions = {
  /**
   * The animation's duration, measured in milliseconds.
   */
  duration?: number;
  /**
   * A function taking a time in the range 0..1 and returning a number where 0 is
   * the initial state and 1 is the final state.
   */
  easing?: (_: number) => number;
  /**
   * of the target center relative to real map container center at the end of animation.
   */
  offset?: PointLike;
  /**
   * If `false`, no animation will occur.
   */
  animate?: boolean;
  /**
   * If `true`, then the animation is considered essential and will not be affected by
   * [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/\@media/prefers-reduced-motion).
   */
  essential?: boolean;
  /**
   * Default false. Needed in 3D maps to let the camera stay in a constant
   * height based on sea-level. After the animation finished the zoom-level will be recalculated in respect of
   * the distance from the camera to the center-coordinate-altitude.
   */
  freezeElevation?: boolean;
};
/**
 * A callback hook that allows manipulating the camera and being notified about camera updates before they happen
 */
type CameraUpdateTransformFunction = (next: {
  center: LngLat;
  zoom: number;
  roll: number;
  pitch: number;
  bearing: number;
  elevation: number;
}) => {
  center?: LngLat;
  zoom?: number;
  roll?: number;
  pitch?: number;
  bearing?: number;
  elevation?: number;
};
type CameraInitOptions = {
  minZoom: number;
  maxZoom: number;
  minPitch: number;
  maxPitch: number;
  bearingSnap: number;
  zoomSnap: number;
  renderWorldCopies: boolean;
  centerClampedToGround: boolean;
  terrain: Terrain;
  transformConstrain: TransformConstrainFunction;
  requestRenderFrame: (a: () => void) => TaskID;
  cancelRenderFrame: (_: TaskID) => void;
  transformCameraUpdate: CameraUpdateTransformFunction | null;
  /**
   * @internal
   * Callback invoked by {@link Camera.stop} to halt any in-progress user gestures.
   * The `Camera` does not own the gesture handlers (the `Map` does), so it is injected
   * with a way to stop them rather than holding a reference to the `HandlerManager`.
   */
  stopHandlers?: () => void;
};
declare class Camera extends Evented<MapEventType> {
  transform: ITransform;
  /**
   * @internal
   * Copy of the map's `terrain` (which the `Map` owns).
   * The camera reads terrain for elevation handling but does not own it.
   */
  terrain: Terrain;
  cameraHelper: ICameraHelper;
  /**
   * @internal
   * Stops any in-progress user gestures. Injected by the owner so the camera does not need
   * a reference to the `HandlerManager`. See {@link CameraInitOptions.stopHandlers}.
   */
  _stopHandlers: () => void;
  _moving: boolean;
  _zooming: boolean;
  _rotating: boolean;
  _pitching: boolean;
  _rolling: boolean;
  _padding: boolean;
  _bearingSnap: number;
  _zoomSnap: number;
  _easeStart: number;
  _easeOptions: {
    duration?: number;
    easing?: (_: number) => number;
  };
  _easeId: string | void;
  _onEaseFrame: (_: number) => void;
  _onEaseEnd: (easeId?: string) => void;
  _easeFrameId: TaskID;
  /**
   * @internal
   * The map center when the animation ends; the animation eases the center elevation to the terrain there.
   */
  _elevationCenter: LngLat;
  /**
   * @internal
   * holds the targ altitude value, = center elevation of the target.
   * This value may changes during flight, because new terrain-tiles loads during flight.
   */
  _elevationTarget: number;
  /**
   * @internal
   * holds the start altitude value, = center elevation before animation begins
   * this value will recalculated during flight in respect of changing _elevationTarget values,
   * so the linear interpolation between start and target keeps smooth and without jumps.
   */
  _elevationStart: number;
  /**
   * @internal
   * Saves the current state of the elevation freeze - this is used during map movement to prevent "rocky" camera movement.
   */
  elevationFreeze: boolean;
  /**
   * @internal
   * The hold a gesture or an animation with `freezeElevation` keeps on the center elevation, or null while nothing
   * holds it, see {@link Camera.holdElevation}. An animation that eases the center elevation sets `elevationFreeze`
   * without one.
   */
  _elevationHold: ElevationHold | null;
  /**
   * @internal
   * Used to track accumulated changes during continuous interaction
   */
  _requestedCameraState?: ITransform;
  /**
   * A callback used to defer camera updates or apply arbitrary constraints.
   * If specified, this Camera instance can be used as a stateless component in React etc.
   */
  transformCameraUpdate: CameraUpdateTransformFunction | null;
  /**
   * @internal
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  _centerClampedToGround: boolean;
  _requestRenderFrame: (a: () => void) => TaskID;
  _cancelRenderFrame: (_: TaskID) => void;
  constructor(options: CameraInitOptions);
  /**
   * @internal
   * Hands the camera the map's terrain, or null when the map has none, and brings the center elevation up to date
   * with it, see {@link Camera.applyTerrainChange}. A hold waits again when the terrain changes to one without DEM
   * data under the center, see {@link ElevationHold.take}.
   */
  setTerrain(terrain: Terrain): void;
  migrateProjection(newTransform: ITransform, newCameraHelper: ICameraHelper): void;
  getCenter(): LngLat;
  setCenter(center: LngLatLike, eventData?: Record<string, unknown>): this;
  getCenterElevation(): number;
  setCenterElevation(elevation: number, eventData?: any): this;
  getCenterClampedToGround(): boolean;
  setCenterClampedToGround(centerClampedToGround: boolean): void;
  panBy(offset: PointLike, options?: EaseToOptions, eventData?: any): this;
  panTo(lnglat: LngLatLike, options?: EaseToOptions, eventData?: any): this;
  getZoom(): number;
  setZoom(zoom: number, eventData?: any): this;
  zoomTo(zoom: number, options?: EaseToOptions | null, eventData?: any): this;
  zoomIn(options?: AnimationOptions, eventData?: any): this;
  zoomOut(options?: AnimationOptions, eventData?: any): this;
  getVerticalFieldOfView(): number;
  setVerticalFieldOfView(fov: number, eventData?: any): this;
  getBearing(): number;
  setZoomSnap(snap: number): this;
  getZoomSnap(): number;
  setBearing(bearing: number, eventData?: any): this;
  getPadding(): PaddingOptions;
  setPadding(padding: PaddingOptions, eventData?: any): this;
  rotateTo(bearing: number, options?: EaseToOptions, eventData?: any): this;
  resetNorth(options?: AnimationOptions, eventData?: any): this;
  resetNorthPitch(options?: AnimationOptions, eventData?: any): this;
  snapToNorth(options?: AnimationOptions, eventData?: any): this;
  getPitch(): number;
  setPitch(pitch: number, eventData?: any): this;
  getRoll(): number;
  setRoll(roll: number, eventData?: any): this;
  /**
   * Returns {@link JumpToOptions} so the result can carry `padding` when `absolutePadding` is set.
   * Once that is the default, `padding` can move onto {@link CameraOptions} and this can return it.
   */
  cameraForBounds(bounds: LngLatBoundsLike, options?: CameraForBoundsOptions): JumpToOptions | undefined;
  /**
   * @internal
   * Calculate the center of these two points in the viewport and use
   * the highest zoom level up to and including {@link Map.getMaxZoom} that fits
   * the AABB defined by these points in the viewport at the specified bearing.
   * @param p0 - First point
   * @param p1 - Second point
   * @param bearing - Desired map bearing at end of animation, in degrees
   * @param options - the camera options
   * @returns If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`,
   *      plus `padding` when `absolutePadding` is set.
   *      If map is unable to fit, method will warn and return undefined.
   * @example
   * ```ts
   * let p0 = [-79, 43];
   * let p1 = [-73, 45];
   * let bearing = 90;
   * let newCameraTransform = map._cameraForBoxAndBearing(p0, p1, bearing, {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   */
  _cameraForBoxAndBearing(p0: LngLatLike, p1: LngLatLike, bearing: number, options?: CameraForBoundsOptions): JumpToOptions | undefined;
  fitBounds(bounds: LngLatBoundsLike, options?: FitBoundsOptions, eventData?: any): this;
  fitScreenCoordinates(p0: PointLike, p1: PointLike, bearing: number, options?: FitBoundsOptions, eventData?: any): this;
  _fitInternal(calculatedOptions?: JumpToOptions, options?: FitBoundsOptions, eventData?: any): this;
  jumpTo(options: JumpToOptions, eventData?: any): this;
  /**
   * Calculates camera options for moving a geographic anchor to a screen point without
   * changing this camera.
   */
  calculateAnchoredCameraOptions(options: AnchoredCameraOptions): CameraOptions;
  calculateCameraOptionsFromCameraLngLatAltRotation(cameraLngLat: LngLatLike, cameraAlt: number, bearing: number, pitch: number, roll?: number): CameraOptions;
  easeTo(options: EaseToOptions, eventData?: any): this;
  /**
   * @param elevation - over terrain, the transform the animation edits, the map center it ends on, and whether
   * it holds the center elevation (`freezeElevation`) instead of easing it
   */
  _prepareEase(eventData: any, noMoveStart: boolean, currently?: {
    moving?: boolean;
    zooming?: boolean;
    rotating?: boolean;
    pitching?: boolean;
    rolling?: boolean;
  }, elevation?: {
    tr: ITransform;
    center: LngLat;
    freeze: boolean;
  }): void;
  /**
   * @internal
   * Starts easing the center elevation: records where it stands on the transform the animation edits and
   * samples the terrain under the map center the animation ends on.
   * @param center - the map center when the animation ends
   * @param tr - the transform the animation edits
   */
  _prepareElevation(center: LngLat, tr: ITransform): void;
  /**
   * @internal
   * Eases the center elevation towards the terrain under `_elevationCenter`, on the transform the
   * animation edits, so that `applyUpdatedTransform` carries it to the rendered transform. A center
   * that is not clamped to the ground keeps its elevation.
   * @param k - the animation's progress, 0 to 1
   * @param tr - the transform the animation edits
   */
  _updateElevation(k: number, tr: ITransform): void;
  /**
   * @internal
   * Holds the center elevation for a gesture or an animation with `freezeElevation`: the frames leave it alone and
   * the end puts the center back onto the terrain. A hold that starts without DEM data under a center clamped to
   * the ground waits for it, see {@link ElevationHold.take}.
   * @param tr - the transform the gesture or animation edits, read for the center the hold starts at
   * @param holder - who holds it
   */
  holdElevation(tr: ITransform, holder: ElevationHolder): void;
  /**
   * @internal
   * Ends a hold on the center elevation, and any wait for DEM data with it, see {@link Camera.holdElevation}.
   */
  releaseElevation(): boolean;
  /**
   * @internal
   * Puts the center back onto the terrain at the end of a hold, re-solving zoom and center with the camera in place.
   * After a hold that took DEM data, a center over a tile without its own DEM data yet keeps the zoom and takes the
   * drawn elevation instead, with the camera check keeping the camera out of the terrain.
   * @param tr - the transform the end writes
   * @param terrain - the terrain the gesture or animation ends over
   * @param tookDem - whether the hold carried an elevation it took from DEM data, see {@link Camera.releaseElevation}
   */
  putCenterBackOnTerrain(tr: ITransform, terrain: Terrain, tookDem: boolean): void;
  /**
   * @internal
   * Lets a hold on the center elevation take DEM data that landed, see {@link ElevationHold.take}.
   * @param tr - the transform the hold's gesture or animation edits
   * @returns whether it changed the elevation
   */
  _takeLandedElevation(tr: ITransform): boolean;
  /**
   * @internal
   * Applies a change of the terrain under the center (terrain set or removed, a DEM tile landed): at rest the
   * camera moves with the center's elevation, as on every rendered frame; a hold keeps the camera where the user
   * put it unless it waits for DEM data. A gesture's hold takes here, on the requested camera state its frames
   * read; an animation's takes on its next frame, on the transform it edits, see {@link ElevationHold.take}.
   */
  applyTerrainChange(): void;
  /**
   * @internal
   * Called when the camera is about to be manipulated.
   * If `transformCameraUpdate` is specified or terrain is enabled, a copy of
   * the current transform is created to track the accumulated changes.
   * This underlying transform represents the "desired state" proposed by input handlers / animations / UI controls.
   * It may differ from the state used for rendering (`this.transform`).
   * @returns Transform to apply changes to
   */
  getTransformForUpdate(): ITransform;
  /**
   * @internal
   * Keeps the camera above the terrain for a camera update. While a gesture or an animation holds the center elevation
   * over mercator terrain, below a pitch of 90 degrees with the center clamped to the ground, the held elevation is
   * lifted on the given transform just far enough that the drawn terrain stays below where the center would sit at
   * maxZoom once the hold keeps it there, see {@link ElevationHold.keepsTerrainBelowMaxZoomForCenter}, so the end does
   * not move the camera back. A gesture's lift also keeps the camera and its near clipping plane above the terrain,
   * so its pitch and zoom stay where the user puts them; the camera of an animation, and of any camera update without
   * a hold, is kept above the terrain by {@link Camera._raiseCameraByPitchAndZoom} instead. The lift is lowered again
   * as the terrain allows.
   * @param tr - the transform the camera update edits
   * @returns the transform to render: `tr`, or its corrected copy
   */
  _keepCameraAboveTerrain(tr: ITransform): ITransform;
  /**
   * @internal
   * Where the camera is inside the terrain, re-solves pitch and zoom on a copy of the transform so the camera sits
   * above it at the same ground position, still looking at the same center at the same elevation, and the transform
   * the update edits keeps what it asked for; over mercator terrain high enough that its near clipping plane clears the terrain too. Without
   * terrain the camera is kept above sea level, which only needs checking where the center elevation is negative or
   * the pitch passes 90 degrees. On a globe the camera is left where it is.
   * @param tr - the transform the camera update edits
   * @returns `tr` while the camera is clear, else the corrected copy
   */
  _raiseCameraByPitchAndZoom(tr: ITransform): ITransform;
  /**
   * @internal
   * How far the terrain reaches above the camera, or the drawn terrain above one of nine points spread over its
   * near clipping plane, in meters, whichever is more; zero or less while all are clear. The renderer drops whatever
   * is nearer than that plane, so terrain reaching above it would show as a hole into the ground. The points are a
   * 3 by 3 grid weighted bilinearly over the plane's four corners, the frustum's first four points in order around
   * the plane. The plane is checked on mercator only, where the frustum is in mercator coordinates.
   * @param tr - the transform whose camera is checked
   */
  _terrainHeightAboveCamera(tr: ITransform): number;
  /**
   * @internal
   * How far the drawn terrain rises above the point on the center ray where the center would sit at maxZoom, with the
   * camera where it is, in meters; zero or less while the terrain is below that point, undefined where no terrain is
   * drawn under it. A hold's end puts the center onto the drawn terrain the center ray meets, with the camera where it
   * is, see {@link Camera.putCenterBackOnTerrain}; terrain above that point puts it nearer than maxZoom allows, and
   * `setZoom` clamps the zoom it needs by moving the camera back.
   * @param tr - the transform whose center ray is checked
   */
  _terrainHeightAboveMaxZoomForCenter(tr: ITransform): number | undefined;
  /**
   * @internal
   * Moves the center a zoom gesture holds onto the terrain the camera looks at and draws, with the camera where it
   * is, so a zoom toward rising terrain slows down before it instead of running into it. Farther terrain is followed
   * only by less than the frame zooms in, so the zoom keeps going in and speeds up gradually; a center ray that slips
   * over a crest onto terrain far behind it, and terrain so near that the zoom passes maxZoom, which would move the
   * camera back, are left to the gesture's end, as is everything with the center not clamped to the ground, and a
   * globe.
   * @param tr - the requested camera state
   * @param zoomDelta - how far the frame zooms in
   */
  moveCenterOntoTerrain(tr: ITransform, zoomDelta: number): void;
  /**
   * @internal
   * Called after the camera is done being manipulated. A hold on the center elevation takes DEM data that landed, see
   * {@link ElevationHold.take}; then the camera is kept above the terrain, see {@link Camera._keepCameraAboveTerrain};
   * `transformCameraUpdate`, if present, proposes its changes on a copy, and the "approved" result is applied to the
   * rendered transform.
   * @param tr - the requested camera end state
   */
  applyUpdatedTransform(tr: ITransform): void;
  /**
   * @internal
   * Applies a change that is not itself a movement, such as new bounds, limits or field of view, the way
   * any camera update is applied. A requested camera state created only for this change is dropped again,
   * so a later movement cannot restore the old values.
   */
  applyTransformChange(change: (tr: ITransform) => void): void;
  _fireMoveEvents(eventData?: Record<string, unknown>): void;
  /**
   * @param freezeElevation - whether the animation held the center elevation; its end then takes DEM data that
   * landed since its last frame and puts the center back onto the terrain, see {@link Camera.putCenterBackOnTerrain}
   */
  _afterEase(eventData?: Record<string, unknown>, easeId?: string, freezeElevation?: boolean): void;
  flyTo(options: FlyToOptions, eventData?: any): this;
  isEasing(): boolean;
  stop(allowGestures?: boolean): this;
  _stop(allowGestures?: boolean, easeId?: string): this;
  _ease(frame: (_: number) => void, finish: () => void, options: {
    animate?: boolean;
    duration?: number;
    easing?: (_: number) => number;
  }): void;
  _renderFrameCallback: () => void;
  _normalizeBearing(bearing: number, currentBearing: number): number;
  isMoving(): boolean;
  isZooming(): boolean;
  isRotating(): boolean;
}
//#endregion
//#region src/ui/handler_inertia.d.ts
type InertiaBufferEntry = {
  time: number;
  settings: HandlerResult;
};
declare class HandlerInertia {
  _map: Map$1;
  _inertiaBuffer: InertiaBufferEntry[];
  constructor(map: Map$1);
  clear(): void;
  record(settings: HandlerResult): void;
  _drainInertiaBuffer(): void;
  /**
   * Returns the entries the velocity is measured from: everything recorded within
   * {@link VELOCITY_WINDOW} before now, but never fewer than the last two, so that
   * inertia also works below two recorded updates per window.
   */
  _getVelocityEntries(): InertiaBufferEntry[];
  /**
   * Returns the ease which continues the gesture that has just ended.
   *
   * The velocity is measured over the time up to the release and not up to the last
   * recorded movement, so that a gesture held still before being released has a lower
   * velocity, down to no inertia at all. The delta of an entry happened before it was
   * recorded, so the first entry only marks the start of the measured interval; anchors
   * are the exception, as they describe the state at the moment of their entry.
   *
   * @param panInertiaOptions - overrides for the pan inertia defaults
   * @returns the ease options, or `undefined` when the measured interval holds no
   * movement, which terrain gestures produce by recording updates without any delta
   */
  _onMoveEnd(panInertiaOptions?: DragPanOptions | boolean): EaseToOptions;
}
//#endregion
//#region src/ui/handler/transform-provider.d.ts
/**
 * @internal
 * Shared utilities for the Handler classes to access the correct camera state.
 * If Camera.transformCameraUpdate is specified or terrain is enabled, the
 * "desired state" of camera may differ from the state used for rendering. The
 * handlers need the "desired state" to track accumulated changes.
 */
declare class TransformProvider {
  _camera: Camera;
  constructor(camera: Camera);
  get transform(): IReadonlyTransform;
  get center(): {
    lng: number;
    lat: number;
  };
  get zoom(): number;
  get pitch(): number;
  get bearing(): number;
  unproject(point: PointLike): LngLat;
}
//#endregion
//#region src/ui/handler_manager.d.ts
/**
 * State of a gesture in flight over terrain, all of it living from the gesture's
 * first handler frame to the end of its movement.
 */
type TerrainGesture = {
  /** Whether a gesture over terrain is in flight, and the center elevation frozen with it. */
  inFlight: boolean;
  /**
   * Elevation in meters of the plane a drag or zoom is solved on, sampled from the terrain under the pointer on
   * the gesture's first drag or zoom frame and again whenever the hold has changed the center elevation since:
   * `null` not sampled yet, a number the terrain point that frame grabbed, `undefined` no terrain loaded under
   * the pointer (the gesture is solved on the center's elevation; sampling on other frames would change how far
   * the map moves per pixel mid-gesture).
   */
  anchorElevation: number | null | undefined;
  /** The center elevation the anchor was sampled at, or null while it has not been sampled. */
  anchorCenterElevation: number | null;
};
/**
 * Handlers interpret dom events and return camera changes that should be
 * applied to the map (`HandlerResult`s). The camera changes are all deltas.
 * The handler itself should have no knowledge of the map's current state.
 * This makes it easier to merge multiple results and keeps handlers simpler.
 * For example, if there is a mousedown and mousemove, the mousePan handler
 * would return a `panDelta` on the mousemove.
 */
interface Handler {
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  /**
   * This is used to indicate if the handler is currently active or not.
   * In case a handler is active, it will block other handlers from getting the relevant events.
   * There is an allow list of handlers that can be active at the same time, which is configured when adding a handler.
   */
  isActive(): boolean;
  /**
   * `reset` can be called by the manager at any time and must reset everything to it's original state
   */
  reset(): void;
  readonly touchstart?: (e: TouchEvent, points: Point$1[], mapTouches: Touch[]) => HandlerResult | void;
  readonly touchmove?: (e: TouchEvent, points: Point$1[], mapTouches: Touch[]) => HandlerResult | void;
  readonly touchmoveWindow?: (e: TouchEvent, points: Point$1[], mapTouches: Touch[]) => HandlerResult | void;
  readonly touchend?: (e: TouchEvent, points: Point$1[], mapTouches: Touch[]) => HandlerResult | void;
  readonly touchcancel?: (e: TouchEvent, points: Point$1[], mapTouches: Touch[]) => HandlerResult | void;
  readonly mousedown?: (e: MouseEvent, point: Point$1) => HandlerResult | void;
  readonly mousemove?: (e: MouseEvent, point: Point$1) => HandlerResult | void;
  readonly mousemoveWindow?: (e: MouseEvent, point: Point$1) => HandlerResult | void;
  readonly mouseup?: (e: MouseEvent, point: Point$1) => HandlerResult | void;
  readonly mouseupWindow?: (e: MouseEvent, point: Point$1) => HandlerResult | void;
  readonly dblclick?: (e: MouseEvent, point: Point$1) => HandlerResult | void;
  readonly contextmenu?: (e: MouseEvent) => HandlerResult | void;
  readonly wheel?: (e: WheelEvent, point: Point$1) => HandlerResult | void;
  readonly keydown?: (e: KeyboardEvent) => HandlerResult | void;
  readonly keyup?: (e: KeyboardEvent) => HandlerResult | void;
  /**
   * `renderFrame` is the only non-dom event. It is called during render
   * frames and can be used to smooth camera changes (see scroll handler).
   */
  readonly renderFrame?: () => HandlerResult | void;
}
/**
 * All handler methods that are called with events can optionally return a `HandlerResult`.
 */
type HandlerResult = {
  panDelta?: Point$1;
  zoomDelta?: number;
  bearingDelta?: number;
  pitchDelta?: number;
  rollDelta?: number;
  /**
   * the point to not move when changing the camera
   */
  around?: Point$1 | null;
  /**
   * same as above, except for pinch actions, which are given higher priority
   */
  pinchAround?: Point$1 | null;
  /**
   * A method that can fire a one-off easing by directly changing the map's camera.
   */
  cameraAnimation?: (map: Map$1) => void;
  /**
   * The last three properties are needed by only one handler: scrollzoom.
   * The DOM event to be used as the `originalEvent` on any camera change events.
   */
  originalEvent?: Event$1;
  /**
   * Makes the manager trigger a frame, allowing the handler to return multiple results over time (see scrollzoom).
   */
  needsRenderFrame?: boolean;
  /**
   * The camera changes won't get recorded for inertial zooming.
   */
  noInertia?: boolean;
};
type EventInProgress = {
  handlerName: string;
  originalEvent: Event$1;
};
type EventsInProgress = {
  zoom?: EventInProgress;
  roll?: EventInProgress;
  pitch?: EventInProgress;
  rotate?: EventInProgress;
  drag?: EventInProgress;
};
type MapControlsScenarioOptions = {
  terrain?: Terrain | null;
  tr: ITransform;
  deltasForHelper: MapControlsDeltas;
  preZoomAroundLoc: LngLat;
  combinedEventsInProgress: EventsInProgress;
  panDelta?: Point$1;
};
declare class HandlerManager {
  _map: Map$1;
  _camera: Camera;
  _transformProvider: TransformProvider;
  _el: HTMLElement;
  _handlers: Array<{
    handlerName: string;
    handler: Handler;
    allowed: string[];
  }>;
  _eventsInProgress: EventsInProgress;
  _frameId: number;
  _inertia: HandlerInertia;
  _bearingSnap: number;
  _handlersById: {
    [x: string]: Handler;
  };
  _updatingCamera: boolean;
  _changes: Array<[HandlerResult, EventsInProgress, {
    [handlerName: string]: Event$1;
  }]>;
  /**
   * The gesture in flight over terrain, from its first handler frame to the `_fireEvents` call that sees the
   * movement end. It holds the center elevation (see {@link Camera.holdElevation}), which
   * {@link Camera._keepCameraAboveTerrain} may raise to keep the camera out of the terrain and lower again, and a
   * frame that zooms in moves the held center onto the terrain the camera looks at, with the camera where it is
   * (see {@link Camera.moveCenterOntoTerrain}); its end puts the center back onto the terrain, or at 0 keeping the
   * zoom with the terrain off.
   */
  _terrainGesture: TerrainGesture;
  _zoom: {
    handlerName: string;
  };
  _previousActiveHandlers: {
    [x: string]: Handler;
  };
  _listeners: Array<[Window | Document | HTMLElement, string, {
    passive?: boolean;
    capture?: boolean;
  } | undefined]>;
  /**
   * @internal
   * The document that contains the map container element, for cross-window support.
   */
  get _ownerDocument(): Document;
  /**
   * @internal
   * The window that contains the map container element, for cross-window support.
   */
  get _ownerWindow(): Window;
  constructor(map: Map$1, camera: Camera, options: CompleteMapOptions);
  destroy(): void;
  _addDefaultHandlers(options: CompleteMapOptions): void;
  _add(handlerName: string, handler: Handler, allowed?: string[]): void;
  stop(allowEndAnimation: boolean): void;
  isActive(): boolean;
  isZooming(): boolean;
  isRotating(): boolean;
  isMoving(): boolean;
  _blockedByActive(activeHandlers: {
    [x: string]: Handler;
  }, allowed: string[], myName: string): boolean;
  handleWindowEvent: (e: Event$1) => void;
  _getMapTouches(touches: TouchList): TouchList;
  handleEvent: (e: Event$1, eventName?: keyof Handler) => void;
  mergeHandlerResult(mergedHandlerResult: HandlerResult, eventsInProgress: EventsInProgress, handlerResult: HandlerResult, name: string, e?: UIEvent): void;
  _applyChanges(): void;
  /**
   * Applies a frame's combined handler deltas to the requested camera state and fires the movement
   * events. A frame without a change only fires the events and takes no requested camera state, so a
   * trailing frame that merely ends a handler leaves none behind for the next gesture to start from.
   */
  _updateMapTransform(combinedResult: HandlerResult, combinedEventsInProgress: EventsInProgress, deactivatedHandlers: {
    [handlerName: string]: Event$1;
  }): void;
  /**
   * The gesture's anchor point: the pinch midpoint when pinching, otherwise the
   * pan's anchor, clamped to the center point when it does not lie on the map.
   */
  _resolveAround(combinedResult: HandlerResult, terrain: Terrain | null, tr: ITransform): {
    around: Point$1;
    aroundOnSurface: boolean;
  };
  /**
   * The elevation of the plane a terrain gesture is solved on: the elevation of the
   * terrain point grabbed at gesture start, captured here on the gesture's first
   * frame. Undefined means the gesture is solved at the center's elevation instead —
   * when the grabbed terrain is not loaded, the anchor is the center point (a
   * center-point anchor is skipped by the camera helper and would lose the pan), or
   * the anchor plane is too close to the camera for a stable ray-plane solve.
   */
  _terrainGestureElevation(terrain: Terrain, around: Point$1, aroundOnSurface: boolean, tr: ITransform, combinedEventsInProgress: EventsInProgress): number | undefined;
  /**
   * The location that was under `around` before this frame's deltas — the point the
   * camera helper re-anchors after zooming — solved at `aroundElevation` when a
   * terrain gesture provides one. When rotating about the center point, the
   * transform's center is used directly to avoid numerical issues near the horizon.
   */
  _computePreZoomAroundLoc(tr: ITransform, around: Point$1, panDelta: Point$1 | undefined, aroundElevation: number | undefined): LngLat;
  _handleMapControls({ terrain, tr, deltasForHelper, preZoomAroundLoc, combinedEventsInProgress, panDelta }: MapControlsScenarioOptions): void;
  _fireEvents(newEventsInProgress: EventsInProgress, deactivatedHandlers: {
    [handlerName: string]: Event$1;
  }, allowEndAnimation: boolean): void;
  /**
   * Fires a movement event through the camera, whose evented parent is the map: the map's listeners
   * see the event as before, and the camera's own `moveend` listener drops the requested camera state,
   * so the next gesture starts from the rendered transform instead of the state this one ended in.
   */
  _fireEvent(type: string, e?: Event$1): void;
  _requestFrame(): number;
  _triggerRenderFrame(): void;
}
//#endregion
//#region src/ui/control/control.d.ts
/**
 * A position definition for the control to be placed, can be in one of the corners of the map.
 * When two or more controls are places in the same location they are stacked toward the center of the map.
 */
type ControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
/**
 * Interface for interactive controls added to the map. This is a
 * specification for implementers to model: it is not
 * an exported method or class.
 *
 * Controls must implement `onAdd` and `onRemove`, and must own an
 * element, which is often a `div` element. To use MapLibre GL JS's
 * default control styling, add the `maplibregl-ctrl` class to your control's
 * node.
 *
 * @example
 * ```ts
 * class HelloWorldControl: IControl {
 *     onAdd(map) {
 *         this._map = map;
 *         this._container = document.createElement('div');
 *         this._container.className = 'maplibregl-ctrl';
 *         this._container.textContent = 'Hello, world';
 *         return this._container;
 *     }
 *
 *     onRemove() {
 *         this._container.remove();
 *         this._map = undefined;
 *     }
 * }
 * ```
 */
interface IControl {
  /**
   * Register a control on the map and give it a chance to register event listeners
   * and resources. This method is called by {@link Map.addControl}
   * internally.
   *
   * @param map - the Map this control will be added to
   * @returns The control's container element. This should
   * be created by the control and returned by onAdd without being attached
   * to the DOM: the map will insert the control's element into the DOM
   * as necessary.
   */
  onAdd(map: Map$1): HTMLElement;
  /**
   * Unregister a control on the map and give it a chance to detach event listeners
   * and resources. This method is called by {@link Map.removeControl}
   * internally.
   *
   * @param map - the Map this control will be removed from
   */
  onRemove(map: Map$1): void;
  /**
   * Optionally provide a default position for this control. If this method
   * is implemented and {@link Map.addControl} is called without the `position`
   * parameter, the value returned by getDefaultPosition will be used as the
   * control's position.
   *
   * @returns a control position, one of the values valid in addControl.
   */
  readonly getDefaultPosition?: () => ControlPosition;
}
//#endregion
//#region src/ui/control/attribution_control.d.ts
/**
 * The {@link AttributionControl} options object
 */
type AttributionControlOptions = {
  /**
   * If `true`, the attribution control will always collapse when moving the map. If `false`,
   * force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide.
   * **Attribution should not be collapsed if it can comfortably fit on the map. `compact` should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.**
   */
  compact?: boolean;
  /**
   * Attributions to show in addition to any other attributions.
   */
  customAttribution?: string | string[];
};
/**
 * An `AttributionControl` control presents the map's attribution information. By default, the attribution control is expanded (regardless of map width).
 * @group Markers and Controls
 * @example
 * ```ts
 * let map = new Map({attributionControl: false})
 *     .addControl(new AttributionControl({
 *         compact: true
 *     }));
 * ```
 * @see [Change the default position for attribution](https://maplibre.org/maplibre-gl-js/docs/examples/change-the-default-position-for-attribution/)
 */
export declare class AttributionControl implements IControl {
  options: AttributionControlOptions;
  _map: Map$1;
  _compact: boolean | undefined;
  _container: HTMLElement;
  _innerContainer: HTMLElement;
  _compactButton: HTMLElement;
  _editLink: HTMLAnchorElement;
  _attribHTML: string;
  styleId: string;
  styleOwner: string;
  /**
   * @param options - the attribution options
   */
  constructor(options?: AttributionControlOptions);
  getDefaultPosition(): ControlPosition;
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  _setElementTitle(element: HTMLElement, title: "ToggleAttribution" | "MapFeedback"): void;
  _toggleAttribution: () => void;
  _updateData: (e: MapSourceDataEvent | MapStyleDataEvent | MapTerrainEvent) => void;
  _updateAttributions(): void;
  _updateCompact: () => void;
  _updateCompactMinimize: () => void;
}
//#endregion
//#region src/ui/default_locale.d.ts
declare const defaultLocale: {
  "AttributionControl.ToggleAttribution": string;
  "AttributionControl.MapFeedback": string;
  "FullscreenControl.Enter": string;
  "FullscreenControl.Exit": string;
  "GeolocateControl.FindMyLocation": string;
  "GeolocateControl.LocationNotAvailable": string;
  "LogoControl.Title": string;
  "Map.Title": string;
  "Marker.Title": string;
  "NavigationControl.ResetBearing": string;
  "NavigationControl.ZoomIn": string;
  "NavigationControl.ZoomOut": string;
  "Popup.Close": string;
  "ScaleControl.Feet": string;
  "ScaleControl.Meters": string;
  "ScaleControl.Kilometers": string;
  "ScaleControl.Miles": string;
  "ScaleControl.NauticalMiles": string;
  "GlobeControl.Enable": string;
  "GlobeControl.Disable": string;
  "TerrainControl.Enable": string;
  "TerrainControl.Disable": string;
  "CooperativeGesturesHandler.WindowsHelpText": string;
  "CooperativeGesturesHandler.MacHelpText": string;
  "CooperativeGesturesHandler.MobileHelpText": string;
};
//#endregion
//#region src/ui/handler/two_fingers_touch.d.ts
/**
 * An options object sent to the enable function of some of the handlers
 */
type AroundCenterOptions = {
  /**
   * If "center" is passed, map will zoom around the center of map
   */
  around: "center";
};
/**
 * The `TwoFingersTouchHandler`s allows the user to zoom, pitch and rotate the map using two fingers
 *
 */
declare abstract class TwoFingersTouchHandler implements Handler {
  _enabled?: boolean;
  _active?: boolean;
  _firstTwoTouches?: [number, number];
  _vector?: Point$1;
  _startVector?: Point$1;
  _aroundCenter?: boolean;
  /** @internal */
  constructor();
  reset(): void;
  abstract _start(points: [Point$1, Point$1]): void;
  abstract _move(points: [Point$1, Point$1], pinchAround: Point$1 | null, e: TouchEvent): HandlerResult | void;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchmove(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): HandlerResult | void;
  touchend(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchcancel(): void;
  /**
   * Enables the "drag to pitch" interaction.
   *
   * @example
   * ```ts
   * map.touchPitch.enable();
   * ```
   */
  enable(options?: AroundCenterOptions | boolean | null): void;
  /**
   * Disables the "drag to pitch" interaction.
   *
   * @example
   * ```ts
   * map.touchPitch.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "drag to pitch" interaction is enabled.
   *
   * @returns  `true` if the "drag to pitch" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "drag to pitch" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "drag to pitch" interaction is active.
   */
  isActive(): boolean;
}
/**
 * The `TwoFingersTouchHandler`s allows the user to zoom the map two fingers
 *
 * @group Handlers
 */
export declare class TwoFingersTouchZoomHandler extends TwoFingersTouchHandler {
  _distance?: number;
  _startDistance?: number;
  _zoomRate: number;
  _zoomThreshold: number;
  constructor();
  /**
   * Sets the zoom rate of touch gestures.
   * @param zoomRate - 1 The rate used to scale touch movement to a zoom value. Set to `undefined` to restore the default.
   * @example
   * Slow down touch zoom
   * ```ts
   * map.touchZoomRotate.setZoomRate(0.5);
   * ```
   */
  setZoomRate(zoomRate?: number): void;
  /**
   * Sets the threshold before a pinch gesture starts zooming.
   * @param zoomThreshold - 0.1 The minimum zoom delta before the pinch gesture becomes active. Set to `undefined` to restore the default.
   * @example
   * Make pinch zoom less sensitive
   * ```ts
   * map.touchZoomRotate.setZoomThreshold(0.3);
   * ```
   */
  setZoomThreshold(zoomThreshold?: number): void;
  reset(): void;
  _start(points: [Point$1, Point$1]): void;
  _move(points: [Point$1, Point$1], pinchAround: Point$1 | null): HandlerResult | void;
}
/**
 * The `TwoFingersTouchHandler`s allows the user to rotate the map two fingers
 *
 * @group Handlers
 */
export declare class TwoFingersTouchRotateHandler extends TwoFingersTouchHandler {
  _minDiameter?: number;
  reset(): void;
  _start(points: [Point$1, Point$1]): void;
  _move(points: [Point$1, Point$1], pinchAround: Point$1 | null, _e: TouchEvent): HandlerResult | void;
  _isBelowThreshold(vector: Point$1): boolean;
}
/**
 * The `TwoFingersTouchPitchHandler` allows the user to pitch the map by dragging up and down with two fingers.
 *
 * @group Handlers
 */
export declare class TwoFingersTouchPitchHandler extends TwoFingersTouchHandler {
  _valid?: boolean;
  _firstMove?: number;
  _lastPoints?: [Point$1, Point$1];
  _map: Map$1;
  _currentTouchCount: number;
  constructor(map: Map$1);
  reset(): void;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  _start(points: [Point$1, Point$1]): void;
  _move(points: [Point$1, Point$1], center: Point$1 | null, e: TouchEvent): HandlerResult | void;
  gestureBeginsVertically(vectorA: Point$1, vectorB: Point$1, timeStamp: number): boolean | undefined;
}
//#endregion
//#region src/ui/handler/scroll_zoom.d.ts
/**
 * The `ScrollZoomHandler` allows the user to zoom the map by scrolling.
 *
 * @group Handlers
 */
export declare class ScrollZoomHandler implements Handler {
  _map: Map$1;
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  _zooming: boolean;
  _aroundCenter: boolean;
  _aroundPoint: Point$1;
  _type: "wheel" | "trackpad" | null;
  _lastValue: number;
  _timeout: ReturnType<typeof setTimeout>;
  _finishTimeout: ReturnType<typeof setTimeout>;
  _lastWheelEvent: WheelEvent;
  _lastWheelEventTime: number;
  _lastExpectedZoom: number;
  _startZoom: number;
  _targetZoom: number;
  _delta: number;
  _easing: ((a: number) => number);
  _prevEase: {
    start: number;
    duration: number;
    easing: (_: number) => number;
  };
  _needsRerender: boolean;
  _triggerRenderFrame: () => void;
  _defaultZoomRate: number;
  _wheelZoomRate: number;
  /** @internal */
  constructor(map: Map$1, triggerRenderFrame: () => void, transformProvider: TransformProvider);
  /**
   * Set the zoom rate of a trackpad
   * @param zoomRate - 1/100 The rate used to scale trackpad movement to a zoom value.
   * @example
   * Speed up trackpad zoom
   * ```ts
   * map.scrollZoom.setZoomRate(1/25);
   * ```
   */
  setZoomRate(zoomRate: number): void;
  /**
   * Set the zoom rate of a mouse wheel
   * @param wheelZoomRate - 1/450 The rate used to scale mouse wheel movement to a zoom value.
   * @example
   * Slow down zoom of mouse wheel
   * ```ts
   * map.scrollZoom.setWheelZoomRate(1/600);
   * ```
   */
  setWheelZoomRate(wheelZoomRate: number): void;
  /**
   * Returns a Boolean indicating whether the "scroll to zoom" interaction is enabled.
   * @returns `true` if the "scroll to zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  isActive(): boolean;
  isZooming(): boolean;
  /**
   * Enables the "scroll to zoom" interaction.
   *
   * @param options - Options object.
   * @example
   * ```ts
   * map.scrollZoom.enable();
   * map.scrollZoom.enable({ around: 'center' })
   * ```
   */
  enable(options?: AroundCenterOptions | boolean): void;
  /**
   * Disables the "scroll to zoom" interaction.
   *
   * @example
   * ```ts
   * map.scrollZoom.disable();
   * ```
   */
  disable(): void;
  /**
   * Determines whether or not the gesture is blocked due to cooperativeGestures.
   */
  _shouldBePrevented(e: WheelEvent): boolean;
  wheel(e: WheelEvent): void;
  _onTimeout: (initialEvent: MouseEvent) => void;
  _start(e: MouseEvent): void;
  renderFrame(): {
    noInertia: boolean;
    needsRenderFrame: boolean;
    zoomDelta: number;
    around: Point$1;
    originalEvent: WheelEvent;
  } | void;
  _smoothOutEasing(duration: number): (t: number) => number;
  reset(): void;
}
//#endregion
//#region src/ui/handler/box_zoom.d.ts
/**
 * Callback for customizing what happens when a box zoom gesture ends.
 */
type BoxZoomEndHandler = (map: Map$1, startPos: Point$1, endPos: Point$1, originalEvent: MouseEvent) => void;
/**
 * A {@link BoxZoomHandler} options object.
 */
type BoxZoomHandlerOptions = {
  /**
   * A callback that runs when the user completes the Shift-drag box gesture.
   * Providing this callback suppresses the default fit-to-box zoom behavior.
   */
  boxZoomEnd?: BoxZoomEndHandler;
};
/**
 * The `BoxZoomHandler` allows the user to zoom the map to fit within a bounding box.
 * The bounding box is defined by clicking and holding `shift` while dragging the cursor.
 *
 * @group Handlers
 */
export declare class BoxZoomHandler implements Handler {
  _map: Map$1;
  _tr: TransformProvider;
  _el: HTMLElement;
  _container: HTMLElement;
  _enabled: boolean;
  _active: boolean;
  _startPos: Point$1;
  _lastPos: Point$1;
  _box: HTMLElement;
  _clickTolerance: number;
  _boxZoomEnd?: BoxZoomEndHandler;
  /** @internal */
  constructor(map: Map$1, options: {
    clickTolerance: number;
    boxZoom?: boolean | BoxZoomHandlerOptions;
  }, transformProvider: TransformProvider);
  /**
   * Returns a Boolean indicating whether the "box zoom" interaction is enabled.
   *
   * @returns `true` if the "box zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "box zoom" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "box zoom" interaction is active.
   */
  isActive(): boolean;
  /**
   * Enables the "box zoom" interaction.
   *
   * @example
   * ```ts
   * map.boxZoom.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "box zoom" interaction.
   *
   * @example
   * ```ts
   * map.boxZoom.disable();
   * ```
   */
  disable(): void;
  mousedown(e: MouseEvent, point: Point$1): void;
  mousemoveWindow(e: MouseEvent, point: Point$1): void;
  mouseupWindow(e: MouseEvent, point: Point$1): {
    cameraAnimation: (map: Map$1) => Map$1;
  } | void;
  keydown(e: KeyboardEvent): void;
  reset(): void;
  _fireEvent(type: string, e: MouseEvent | KeyboardEvent): Map$1;
}
//#endregion
//#region src/ui/handler/shim/drag_rotate.d.ts
/**
 * Options object for `DragRotateHandler`.
 */
type DragRotateHandlerOptions = {
  /**
   * Control the map pitch in addition to the bearing
   * @defaultValue true
   */
  pitchWithRotate: boolean;
  /**
   * Control the map roll in addition to the bearing
   * @defaultValue false
   */
  rollEnabled: boolean;
};
/**
 * The `DragRotateHandler` allows the user to rotate the map by clicking and
 * dragging the cursor while holding the right mouse button or `ctrl` key.
 *
 * @group Handlers
 */
export declare class DragRotateHandler {
  _mouseRotate: MouseRotateHandler;
  _mousePitch: MousePitchHandler;
  _mouseRoll: MouseRollHandler;
  _pitchWithRotate: boolean;
  _rollEnabled: boolean;
  /** @internal */
  constructor(options: DragRotateHandlerOptions, mouseRotate: MouseRotateHandler, mousePitch: MousePitchHandler, mouseRoll: MouseRollHandler);
  /**
   * Enables the "drag to rotate" interaction.
   *
   * @example
   * ```ts
   * map.dragRotate.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "drag to rotate" interaction.
   *
   * @example
   * ```ts
   * map.dragRotate.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "drag to rotate" interaction is enabled.
   *
   * @returns `true` if the "drag to rotate" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "drag to rotate" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "drag to rotate" interaction is active.
   */
  isActive(): boolean;
}
//#endregion
//#region src/ui/handler/cooperative_gestures.d.ts
/**
 * The {@link CooperativeGesturesHandler} options object for the gesture settings
 */
type GestureOptions = boolean;
/**
 * A `CooperativeGestureHandler` is a control that adds cooperative gesture info when user tries to zoom in/out.
 *
 * When the CooperativeGestureHandler blocks a gesture, it will emit a `cooperativegestureprevented` event.
 *
 * @group Handlers
 *
 * @example
 * ```ts
 * const map = new Map({
 *   cooperativeGestures: true
 * });
 * ```
 * @see [Example: cooperative gestures](https://maplibre.org/maplibre-gl-js/docs/examples/cooperative-gestures/)
 **/
export declare class CooperativeGesturesHandler implements Handler {
  _options: GestureOptions;
  _map: Map$1;
  _container: HTMLElement;
  /**
   * This is the key that will allow to bypass the cooperative gesture protection
   */
  _bypassKey: "metaKey" | "ctrlKey";
  _enabled: boolean;
  constructor(map: Map$1, options: GestureOptions);
  isActive(): boolean;
  reset(): void;
  _setupUI(): void;
  _destroyUI(): void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isBypassed(event: MouseEvent | WheelEvent | PointerEvent): boolean;
  notifyGestureBlocked(gestureType: "wheel_zoom" | "touch_pan", originalEvent: Event$1): void;
}
//#endregion
//#region src/ui/handler/keyboard.d.ts
/**
 * The `KeyboardHandler` allows the user to zoom, rotate, and pan the map using
 * the following keyboard shortcuts:
 *
 * - `=` / `+`: Increase the zoom level by 1.
 * - `Shift-=` / `Shift-+`: Increase the zoom level by 2.
 * - `-`: Decrease the zoom level by 1.
 * - `Shift--`: Decrease the zoom level by 2.
 * - Arrow keys: Pan by 100 pixels.
 * - `Shift+⇢`: Increase the rotation by 15 degrees.
 * - `Shift+⇠`: Decrease the rotation by 15 degrees.
 * - `Shift+⇡`: Increase the pitch by 10 degrees.
 * - `Shift+⇣`: Decrease the pitch by 10 degrees.
 *
 * @group Handlers
 */
export declare class KeyboardHandler implements Handler {
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  _panStep: number;
  _bearingStep: number;
  _pitchStep: number;
  _rotationDisabled: boolean;
  /** @internal */
  constructor(map: Map$1, transformProvider: TransformProvider);
  reset(): void;
  keydown(e: KeyboardEvent): {
    cameraAnimation: (map: Map$1) => void;
  } | void;
  /**
   * Enables the "keyboard rotate and zoom" interaction.
   *
   * @example
   * ```ts
   * map.keyboard.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "keyboard rotate and zoom" interaction.
   *
   * @example
   * ```ts
   * map.keyboard.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "keyboard rotate and zoom"
   * interaction is enabled.
   *
   * @returns `true` if the "keyboard rotate and zoom"
   * interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns true if the handler is enabled and has detected the start of a
   * zoom/rotate gesture.
   *
   * @returns `true` if the handler is enabled and has detected the
   * start of a zoom/rotate gesture.
   */
  isActive(): boolean;
  /**
   * Disables the "keyboard pan/rotate" interaction, leaving the
   * "keyboard zoom" interaction enabled.
   *
   * @example
   * ```ts
   * map.keyboard.disableRotation();
   * ```
   */
  disableRotation(): void;
  /**
   * Enables the "keyboard pan/rotate" interaction.
   *
   * @example
   * ```ts
   * map.keyboard.enable();
   * map.keyboard.enableRotation();
   * ```
   */
  enableRotation(): void;
}
//#endregion
//#region src/ui/handler/click_zoom.d.ts
/**
 * The `ClickZoomHandler` allows the user to zoom the map at a point by double clicking
 * It is used by other handlers
 */
declare class ClickZoomHandler implements Handler {
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  /** @internal */
  constructor(map: Map$1, transformProvider: TransformProvider);
  reset(): void;
  dblclick(e: MouseEvent, point: Point$1): {
    cameraAnimation: (map: Map$1) => void;
  };
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
//#endregion
//#region src/ui/handler/tap_recognizer.d.ts
declare class SingleTapRecognizer {
  numTouches: number;
  centroid: Point$1;
  startTime: number;
  aborted: boolean;
  touches: { [k in number | string]: Point$1; };
  constructor(options: {
    numTouches: number;
  });
  reset(): void;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchmove(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchend(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): Point$1 | void;
}
declare class TapRecognizer {
  singleTap: SingleTapRecognizer;
  numTaps: number;
  lastTime: number;
  lastTap: Point$1;
  count: number;
  constructor(options: {
    numTaps: number;
    numTouches: number;
  });
  reset(): void;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchmove(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchend(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): Point$1 | void;
}
//#endregion
//#region src/ui/handler/tap_zoom.d.ts
/**
 * A `TapZoomHandler` allows the user to zoom the map at a point by double tapping
 */
declare class TapZoomHandler implements Handler {
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  _zoomIn: TapRecognizer;
  _zoomOut: TapRecognizer;
  constructor(map: Map$1, transformProvider: TransformProvider);
  reset(): void;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchmove(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchend(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): {
    cameraAnimation: (map: Map$1) => Map$1;
  } | void;
  touchcancel(): void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
//#endregion
//#region src/ui/handler/shim/dblclick_zoom.d.ts
/**
 * The `DoubleClickZoomHandler` allows the user to zoom the map at a point by
 * double clicking or double tapping.
 *
 * @group Handlers
 */
export declare class DoubleClickZoomHandler {
  _clickZoom: ClickZoomHandler;
  _tapZoom: TapZoomHandler;
  /** @internal */
  constructor(clickZoom: ClickZoomHandler, TapZoom: TapZoomHandler);
  /**
   * Enables the "double click to zoom" interaction.
   *
   * @example
   * ```ts
   * map.doubleClickZoom.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "double click to zoom" interaction.
   *
   * @example
   * ```ts
   * map.doubleClickZoom.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "double click to zoom" interaction is enabled.
   *
   * @returns `true` if the "double click to zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "double click to zoom" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "double click to zoom" interaction is active.
   */
  isActive(): boolean;
}
//#endregion
//#region src/ui/handler/tap_drag_zoom.d.ts
/**
 * A `TapDragZoomHandler` allows the user to zoom the map at a point by double tapping. It also allows the user pan the map by dragging.
 */
declare class TapDragZoomHandler implements Handler {
  _enabled: boolean;
  _active: boolean;
  _swipePoint: Point$1;
  _swipeTouch: number;
  _tapTime: number;
  _tapPoint: Point$1;
  _tap: TapRecognizer;
  _zoomRate: number;
  constructor();
  setZoomRate(zoomRate?: number): void;
  reset(): void;
  touchstart(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchmove(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): {
    zoomDelta: number;
  } | void;
  touchend(e: TouchEvent, points: Point$1[], mapTouches: Touch[]): void;
  touchcancel(): void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
//#endregion
//#region src/ui/handler/shim/two_fingers_touch.d.ts
/**
 * The `TwoFingersTouchZoomRotateHandler` allows the user to zoom and rotate the map by
 * pinching on a touchscreen.
 *
 * They can zoom with one finger by double tapping and dragging. On the second tap,
 * hold the finger down and drag up or down to zoom in or out.
 *
 * @group Handlers
 */
export declare class TwoFingersTouchZoomRotateHandler {
  _el: HTMLElement;
  _touchZoom: TwoFingersTouchZoomHandler;
  _touchRotate: TwoFingersTouchRotateHandler;
  _tapDragZoom: TapDragZoomHandler;
  _rotationDisabled: boolean;
  _enabled: boolean;
  /** @internal */
  constructor(el: HTMLElement, touchZoom: TwoFingersTouchZoomHandler, touchRotate: TwoFingersTouchRotateHandler, tapDragZoom: TapDragZoomHandler);
  /**
   * Enables the "pinch to rotate and zoom" interaction.
   *
   * @param options - Options object.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.enable();
   * map.touchZoomRotate.enable({ around: 'center' });
   * ```
   */
  enable(options?: AroundCenterOptions | boolean | null): void;
  /**
   * Disables the "pinch to rotate and zoom" interaction.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "pinch to rotate and zoom" interaction is enabled.
   *
   * @returns `true` if the "pinch to rotate and zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns true if the handler is enabled and has detected the start of a zoom/rotate gesture.
   *
   * @returns `true` if the handler is active, `false` otherwise
   */
  isActive(): boolean;
  /**
   * Sets the zoom rate of touch gestures.
   * @param zoomRate - 1 The rate used to scale touch movement to a zoom value. Set to `undefined` to restore the default.
   * @example
   * Slow down touch zoom
   * ```ts
   * map.touchZoomRotate.setZoomRate(0.5);
   * ```
   */
  setZoomRate(zoomRate?: number): void;
  /**
   * Sets the threshold before a pinch gesture starts zooming.
   * @param zoomThreshold - 0.1 The minimum zoom delta before the pinch gesture becomes active. Set to `undefined` to restore the default.
   * @example
   * Make pinch zoom less sensitive
   * ```ts
   * map.touchZoomRotate.setZoomThreshold(0.3);
   * ```
   */
  setZoomThreshold(zoomThreshold?: number): void;
  /**
   * Disables the "pinch to rotate" interaction, leaving the "pinch to zoom"
   * interaction enabled.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.disableRotation();
   * ```
   */
  disableRotation(): void;
  /**
   * Enables the "pinch to rotate" interaction.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.enable();
   * map.touchZoomRotate.enableRotation();
   * ```
   */
  enableRotation(): void;
}
//#endregion
//#region src/ui/map.d.ts
type ContextType = "webgl2";
type WebGLContextAttributesWithType = WebGLContextAttributes & {
  contextType?: ContextType;
};
/**
 * The {@link Map} options object.
 */
type MapOptions = {
  /**
   * If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * For example, `https://example.com#2.59/39.26/53.07/-24.1/60`.
   *
   * An additional string may optionally be provided as an alternative to indicate a parameter-styled hash.
   * For example, passing `hash: "foo"` will produce a hash like `https://example.com#foo=2.59/39.26/53.07/-24.1/60`.
   * This is usefull for allowing multiple maps or other state.
   * @defaultValue false
   */
  hash?: boolean | string;
  /**
   * If `false`, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction.
   * @defaultValue true
   */
  interactive?: boolean;
  /**
   * The HTML element in which MapLibre GL JS will render the map, or the element's string `id`. The specified element must have no children.
   */
  container: HTMLElement | string;
  /**
   * The threshold, measured in degrees, that determines when the map's
   * bearing will snap to north. For example, with a `bearingSnap` of 7, if the user rotates
   * the map within 7 degrees of north, the map will automatically snap to exact north.
   * @defaultValue 7
   */
  bearingSnap?: number;
  /**
   * The step increment the zoom level will snap to.
   * For example, if `zoomSnap` is 1, the map will snap to whole integers during discrete zoom operations.
   * If set to 0, zooming is continuous.
   * @defaultValue 0
   */
  zoomSnap?: number;
  /**
   * If set, an {@link AttributionControl} will be added to the map with the provided options.
   * To disable the attribution control, pass `false`.
   * !!! note
   *     Showing the logo of MapLibre is not required for using MapLibre.
   * @defaultValue compact: true, customAttribution: "MapLibre ...".
   */
  attributionControl?: false | AttributionControlOptions;
  /**
   * If `true`, the MapLibre logo will be shown.
   */
  maplibreLogo?: boolean;
  /**
   * A string representing the position of the MapLibre wordmark on the map. Valid options are `top-left`,`top-right`, `bottom-left`, or `bottom-right`.
   * @defaultValue 'bottom-left'
   */
  logoPosition?: ControlPosition;
  /**
   * Set of WebGLContextAttributes that are applied to the WebGL context of the map.
   * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext for more details.
   * `contextType` is restricted to `'webgl2'`. This option is kept as a forward-looking API for future WebGPU support.
   * @defaultValue antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false, failIfMajorPerformanceCaveat: false, desynchronized: false, contextType: 'webgl2'
   */
  canvasContextAttributes?: WebGLContextAttributesWithType;
  /**
   * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.
   * @defaultValue true
   */
  refreshExpiredTiles?: boolean;
  /**
   * If set, the map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBoundsLike;
  /**
   * If `true`, the "scroll to zoom" interaction is enabled. {@link AroundCenterOptions} are passed as options to {@link ScrollZoomHandler.enable}.
   * @defaultValue true
   */
  scrollZoom?: boolean | AroundCenterOptions;
  /**
   * The minimum zoom level of the map. Users cannot zoom out beyond this level. (0–24)
   * @defaultValue 0
   */
  minZoom?: number | null;
  /**
   * The maximum zoom level of the map. Users cannot zoom in beyond this level. (0–24)
   * @defaultValue 22
   */
  maxZoom?: number | null;
  /**
   * The minimum pitch of the map (0-180).
   * @defaultValue 0
   */
  minPitch?: number | null;
  /**
   * The maximum pitch of the map (0-180).
   * @defaultValue 60
   */
  maxPitch?: number | null;
  /**
   * The pitch above which to apply anisotropic filtering to the map's raster layers (0-180).
   * @defaultValue 20
   */
  anisotropicFilterPitch?: number | null;
  /**
   * If `true`, the "box zoom" interaction is enabled (see {@link BoxZoomHandler}).
   * An `Object` value configures {@link BoxZoomHandler} options.
   * If `boxZoomEnd` is provided, the callback runs instead of the default fit-to-box zoom.
   * @defaultValue true
   */
  boxZoom?: boolean | BoxZoomHandlerOptions;
  /**
   * If `true`, the "drag to rotate" interaction is enabled (see {@link DragRotateHandler}).
   * @defaultValue true
   */
  dragRotate?: boolean;
  /**
   * If `true`, the "drag to pan" interaction is enabled. An `Object` value is passed as options to {@link DragPanHandler.enable}.
   * @defaultValue true
   */
  dragPan?: boolean | DragPanOptions;
  /**
   * If `true`, keyboard shortcuts are enabled (see {@link KeyboardHandler}).
   * @defaultValue true
   */
  keyboard?: boolean;
  /**
   * If `true`, the "double click to zoom" interaction is enabled (see {@link DoubleClickZoomHandler}).
   * @defaultValue true
   */
  doubleClickZoom?: boolean;
  /**
   * If `true`, the "pinch to rotate and zoom" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchZoomRotateHandler.enable}.
   * @defaultValue true
   */
  touchZoomRotate?: boolean | AroundCenterOptions;
  /**
   * If `true`, the "drag to pitch" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchPitchHandler.enable}.
   * @defaultValue true
   */
  touchPitch?: boolean | AroundCenterOptions;
  /**
   * If `true` or set to an options object, the map is only accessible on desktop while holding Command/Ctrl and only accessible on mobile with two fingers. Interacting with the map using normal gestures will trigger an informational screen. With this option enabled, "drag to pitch" requires a three-finger gesture. Cooperative gestures are disabled when a map enters fullscreen using {@link FullscreenControl}.
   * @defaultValue false
   */
  cooperativeGestures?: GestureOptions;
  /**
   * If `true`, the map will automatically resize when the browser window resizes.
   * @defaultValue true
   */
  trackResize?: boolean;
  /**
   * The initial geographical centerpoint of the map. If `center` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `[0, 0]`
   * !!! note
   *     MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
   * @defaultValue [0, 0]
   */
  center?: LngLatLike;
  /**
   * The elevation of the initial geographical centerpoint of the map, in meters above sea level. If `elevation` is not specified in the constructor options, it will default to `0`.
   * @defaultValue 0
   */
  elevation?: number;
  /**
   * The initial zoom level of the map. If `zoom` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
   * @defaultValue 0
   */
  zoom?: number;
  /**
   * The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If `bearing` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
   * @defaultValue 0
   */
  bearing?: number;
  /**
   * The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If `pitch` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.
   * @defaultValue 0
   */
  pitch?: number;
  /**
   * The initial roll angle of the map, measured in degrees counter-clockwise about the camera boresight. If `roll` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
   * @defaultValue 0
   */
  roll?: number;
  /**
   * If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
   *
   * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
   * container, there will be blank space beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
   * map and the other on the left edge of the map) at every zoom level.
   * @defaultValue true
   */
  renderWorldCopies?: boolean;
  /**
   * The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.
   * @defaultValue null
   */
  maxTileCacheSize?: number | null;
  /**
   * The maximum number of zoom levels for which to store tiles for a given source. Tile cache dynamic size is calculated by multiplying `maxTileCacheZoomLevels` with the approximate number of tiles in the viewport for a given source.
   * @defaultValue 5
   */
  maxTileCacheZoomLevels?: number;
  /**
   * A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
   * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.
   * @defaultValue null
   */
  transformRequest?: RequestTransformFunction | null;
  /**
   * A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
   * Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
   * @defaultValue null
   */
  transformCameraUpdate?: CameraUpdateTransformFunction | null;
  /**
   * A callback that overrides how the map constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
   * @see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
   * Expected to return an object containing center and zoom.
   * @defaultValue null
   */
  transformConstrain?: TransformConstrainFunction | null;
  /**
   * A patch to apply to the default localization table for UI strings, e.g. control tooltips. The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).
   * For an example, see https://maplibre.org/maplibre-gl-js/docs/examples/locale-switching/
   * Alternatively, search the official plugins page for plugins related to localization.
   * @defaultValue null
   */
  locale?: Record<string, string>;
  /**
   * Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.
   * @defaultValue 300
   */
  fadeDuration?: number;
  /**
   * If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.
   * @defaultValue true
   */
  crossSourceCollisions?: boolean;
  /**
   * If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of relevant `data` events.
   * @defaultValue false
   */
  collectResourceTiming?: boolean;
  /**
   * The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).
   * @defaultValue 3
   */
  clickTolerance?: number;
  /**
   * The initial bounds of the map. If `bounds` is specified, it overrides `center` and `zoom` constructor options.
   */
  bounds?: LngLatBoundsLike;
  /**
   * A {@link FitBoundsOptions} options object to use _only_ when fitting the initial `bounds` provided above.
   */
  fitBoundsOptions?: FitBoundsOptions;
  /**
   * Defines a CSS
   * font-family for locally overriding generation of Chinese, Japanese, and Korean characters.
   * For these characters, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * Set to `false`, to enable font settings from the map's style for these glyph ranges.
   * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
   * @see [Use locally generated ideographs](https://maplibre.org/maplibre-gl-js/docs/examples/use-locally-generated-ideographs/)
   * @defaultValue 'sans-serif'
   */
  localIdeographFontFamily?: string | false;
  /**
   * The map's MapLibre style. This must be a JSON object conforming to
   * the schema described in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/),
   * or a URL to such JSON.
   * When the style is not specified, calling {@link Map.setStyle} is required to render the map.
   */
  style?: StyleSpecification | string;
  /**
   * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
   * @defaultValue true
   */
  pitchWithRotate?: boolean;
  /**
   * If `false`, the map's roll control with "drag to rotate" interaction will be disabled.
   * @defaultValue false
   */
  rollEnabled?: boolean;
  /**
   * Degrees the map's bearing changes per pixel of horizontal drag when rotating.
   * @defaultValue 0.8
   */
  rotateSpeed?: number;
  /**
   * Degrees the map's pitch changes per pixel of vertical drag. Negative, so that
   * dragging up pitches the map toward the horizon.
   * @defaultValue -0.5
   */
  pitchSpeed?: number;
  /**
   * If `true`, gesture inertia (such as panning) is disabled. If not provided, gesture inertia defaults to the user's device settings.
   * @defaultValue undefined
   */
  reduceMotion?: boolean | undefined;
  /**
   * The pixel ratio.
   * The canvas' `width` attribute will be `container.clientWidth * pixelRatio` and its `height` attribute will be `container.clientHeight * pixelRatio`. Defaults to `devicePixelRatio` if not specified.
   */
  pixelRatio?: number;
  /**
   * If false, style validation will be skipped.
   * Useful in production environments due to enabling tree-shaking of the validation code in some environments and minor performance improvements.
   * Disabling this option comes at the cost of less clear error messages
   * @defaultValue true
   */
  validateStyle?: boolean;
  /**
   * Defines an initial global state for the map style. It overrides the defaults defined in the map style, as if {@link Map.setGlobalStateProperty} was called after loading the map. Subsequent calls to {@link Map.setStyle} will use the same defaults if the {@link StyleOptions.globalState} option is not set.
   */
  globalState?: Record<string, any>;
  /**
   * The canvas' `width` and `height` max size. The values are passed as an array where the first element is max width and the second element is max height.
   * You shouldn't set this above WebGl `MAX_TEXTURE_SIZE`.
   * A larger canvas is not refused: the pixel ratio is lowered to fit and a warning is logged once.
   * @defaultValue [4096, 4096].
   */
  maxCanvasSize?: [number, number];
  /**
   * Determines whether to cancel, or retain, tiles from the current viewport which are still loading but which belong to a farther (smaller) zoom level than the current one.
   * * If `true`, when zooming in, tiles which didn't manage to load for previous zoom levels will become canceled. This might save some computing resources for slower devices, but the map details might appear more abruptly at the end of the zoom.
   * * If `false`, when zooming in, the previous zoom level(s) tiles will progressively appear, giving a smoother map details experience. However, more tiles will be rendered in a short period of time.
   * @defaultValue true
   */
  cancelPendingTileRequestsWhileZooming?: boolean;
  /**
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  centerClampedToGround?: boolean;
  /**
   * Controls the length of the vertical extensions which are added to the edges of terrain tiles.
   *
   * If the skirts are introducing visually unappealing vertical artifacts, consider avoiding transparent or semi-transparent backgrounds,
   * for example, by having the first layer be a background layer with a [`background-color`](https://maplibre.org/maplibre-style-spec/layers/#background-color).
   * If that is impossible or insufficient, you can entirely disable skirts,
   * at the cost of potentially introducing some horizontal hairline gaps (stitches) on tile boundaries with different zoomlevels for some terrain datasets.
   *
   * - `"none"` disables skirts entirely.
   * - `"auto"` renders skirts with an automatically chosen length.
   * @defaultValue "auto"
   */
  terrainSkirtLength?: "none" | "auto";
  /**
   * Defines the number of zoom level that will overscale instead of split tiles below (inclusive) a map's `maxZoom`.
   * When `undefined`, all zoom levels after source's max zoom will be overscaled.
   *
   * This can help in reducing the size of the overscaling and improve performance in high zoom levels.
   * The drawback is that it changes rendering for polygon centered labels and changes the results of query rendered features.
   *
   * For example if map's `maxZoom` is 20, the source's `maxzoom` is 10 (tiles are avaliable until zoom 10) and `zoomLevelsToOverscale` is set to 3:
   * - The zoom levels of 20, 19, 18 will be overscaled.
   * - The zoom levels 11 to 17 will be split.
   * @defaultValue 4
   */
  zoomLevelsToOverscale?: number;
  /**
   * Determines the rotation interaction model:
   * - When true: Uses "Orbital" logic where rotation is relative to the pivot center.
   *   Dragging right at the top rotates clockwise, while dragging right at the bottom
   *   rotates counter-clockwise (like spinning a physical globe).
   * - When false: Uses "Linear" logic where horizontal mouse movement translates directly
   *   to bearing change regardless of cursor position.
   */
  aroundCenter?: boolean;
};
/**
 * Image data accepted by {@link Map.addImage}.
 */
type StyleImageSource = HTMLImageElement | ImageBitmap | ImageData | {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
} | StyleImageInterface;
/**
 * Callback used by {@link Map.setMissingStyleImageResolver} to resolve missing style images,
 * typically by calling {@link Map.addImage}. MapLibre awaits the returned promise before
 * treating the image as missing.
 */
type MissingStyleImageResolver = (id: string) => void | Promise<void>;
type CompleteMapOptions = Complete<MapOptions>;
type DelegatedListener = {
  layers: string[];
  listener: Listener;
  delegates: { [E in keyof MapEventType]?: Delegate<MapEventType[E]>; };
};
type Delegate<E extends Event$1 = Event$1> = (e: E) => void;
type LostContextStyle = {
  style: StyleSpecification | null;
  images: {
    [_: string]: StyleImage;
  } | null;
};
/**
 * The `Map` object represents the map on your page. It exposes methods
 * and properties that enable you to programmatically change the map,
 * and fires events as users interact with it.
 *
 * You create a `Map` by specifying a `container` and other options, see {@link MapOptions} for the full list.
 * Then MapLibre GL JS initializes the map on the page and returns your `Map` object.
 *
 * @group Main
 *
 * @example
 * ```ts
 * const map = new Map({
 *   container: 'map',
 *   center: [-122.420679, 37.772537],
 *   zoom: 13,
 *   style: style_object,
 *   hash: true,
 *   transformRequest: (url, resourceType) => {
 *     if (resourceType === 'Source' && url.startsWith('http://myHost')) {
 *       return {
 *        url: url.replace('http', 'https'),
 *        headers: { 'my-custom-header': true},
 *        credentials: 'include', // Include cookies for cross-origin requests
 *      }
 *     }
 *   }
 * });
 * ```
 * @see [Display a map](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-map/)
 */
declare class Map$1 extends Evented<MapEventType> {
  terrain: Terrain;
  style: Style;
  painter: Painter;
  _camera: Camera;
  _handlers: HandlerManager;
  _container: HTMLElement;
  _canvasContainer: HTMLElement;
  _controlContainer: HTMLElement;
  _controlPositions: Partial<Record<ControlPosition, HTMLElement>>;
  _interactive: boolean;
  _showTileBoundaries: boolean;
  _showCollisionBoxes: boolean;
  _showPadding: boolean;
  _showOverdrawInspector: boolean;
  _repaint: boolean;
  _vertices: boolean;
  _canvas: HTMLCanvasElement;
  _maxTileCacheSize: number | null;
  _maxTileCacheZoomLevels: number;
  _frameRequest: AbortController;
  _styleDirty: boolean;
  _sourcesDirty: boolean;
  _placementDirty: boolean;
  _anisotropicFilterPitch: number;
  _loaded: boolean;
  _idleTriggered: boolean;
  _fullyLoaded: boolean;
  _trackResize: boolean;
  _resizeObserver: ResizeObserver;
  _canvasContextAttributes: WebGLContextAttributesWithType;
  _refreshExpiredTiles: boolean;
  _hash: Hash;
  _delegatedListeners: Record<keyof MapEventType, DelegatedListener[]>;
  _fadeDuration: number;
  _crossSourceCollisions: boolean;
  _crossFadingFactor: number;
  _collectResourceTiming: boolean;
  _renderTaskQueue: TaskQueue;
  _controls: IControl[];
  _mapId: number;
  _localIdeographFontFamily: string | false;
  _validateStyle: boolean;
  _initialGlobalState: Record<string, any>;
  _styleUrl: string | null;
  _requestManager: RequestManager;
  _locale: Record<string, string>;
  _removed: boolean;
  _diffStyleRequest: AbortController;
  _clickTolerance: number;
  _overridePixelRatio: number | null | undefined;
  _maxCanvasSize: [number, number];
  _clampedPixelRatio: number;
  _terrainDataCallback: (e: MapStyleDataEvent | MapSourceDataEvent) => void;
  _missingStyleImageResolver: MissingStyleImageResolver | null;
  /** @internal */
  _zoomLevelsToOverscale: number | undefined;
  _terrainSkirtLength: "none" | "auto";
  /**
   * @internal
   * The window that owns the map container element, for cross-window support.
   * Returns `typeof window` to include global constructors like ResizeObserver.
   */
  get _ownerWindow(): typeof window;
  /**
   * @internal
   * image queue throttling handle. To be used later when clean up
   */
  _imageQueueHandle: number;
  /**
   * @internal
   * Used to store the previous style and images when a context loss occurs, so they can be restored.
   */
  _lostContextStyle: LostContextStyle;
  /**
   * The map's {@link ScrollZoomHandler}, which implements zooming in and out with a scroll wheel or trackpad.
   * Find more details and examples using `scrollZoom` in the {@link ScrollZoomHandler} section.
   */
  scrollZoom: ScrollZoomHandler;
  /**
   * The map's {@link BoxZoomHandler}, which implements zooming using a drag gesture with the Shift key pressed.
   * Find more details and examples using `boxZoom` in the {@link BoxZoomHandler} section.
   */
  boxZoom: BoxZoomHandler;
  /**
   * The map's {@link DragRotateHandler}, which implements rotating the map while dragging with the right
   * mouse button or with the Control key pressed. Find more details and examples using `dragRotate`
   * in the {@link DragRotateHandler} section.
   */
  dragRotate: DragRotateHandler;
  /**
   * The map's {@link DragPanHandler}, which implements dragging the map with a mouse or touch gesture.
   * Find more details and examples using `dragPan` in the {@link DragPanHandler} section.
   */
  dragPan: DragPanHandler;
  /**
   * The map's {@link KeyboardHandler}, which allows the user to zoom, rotate, and pan the map using keyboard
   * shortcuts. Find more details and examples using `keyboard` in the {@link KeyboardHandler} section.
   */
  keyboard: KeyboardHandler;
  /**
   * The map's {@link DoubleClickZoomHandler}, which allows the user to zoom by double clicking.
   * Find more details and examples using `doubleClickZoom` in the {@link DoubleClickZoomHandler} section.
   */
  doubleClickZoom: DoubleClickZoomHandler;
  /**
   * The map's {@link TwoFingersTouchZoomRotateHandler}, which allows the user to zoom or rotate the map with touch gestures.
   * Find more details and examples using `touchZoomRotate` in the {@link TwoFingersTouchZoomRotateHandler} section.
   */
  touchZoomRotate: TwoFingersTouchZoomRotateHandler;
  /**
   * The map's {@link TwoFingersTouchPitchHandler}, which allows the user to pitch the map with touch gestures.
   * Find more details and examples using `touchPitch` in the {@link TwoFingersTouchPitchHandler} section.
   */
  touchPitch: TwoFingersTouchPitchHandler;
  /**
   * The map's {@link CooperativeGesturesHandler}, which allows the user to see cooperative gesture info when user tries to zoom in/out.
   * Find more details and examples using `cooperativeGestures` in the {@link CooperativeGesturesHandler} section.
   */
  cooperativeGestures: CooperativeGesturesHandler;
  /**
   * The map's property which determines whether to cancel, or retain, tiles from the current viewport which are still loading but which belong to a farther (smaller) zoom level than the current one.
   * * If `true`, when zooming in, tiles which didn't manage to load for previous zoom levels will become canceled. This might save some computing resources for slower devices, but the map details might appear more abruptly at the end of the zoom.
   * * If `false`, when zooming in, the previous zoom level(s) tiles will progressively appear, giving a smoother map details experience. However, more tiles will be rendered in a short period of time.
   * @defaultValue true
   */
  cancelPendingTileRequestsWhileZooming: boolean;
  constructor(options: MapOptions);
  /**
   * @internal
   * Returns a unique number for this map instance which is used for the MapLoadEvent
   * to make sure we only fire one event per instantiated map object.
   * @returns the uniq map ID
   */
  _getMapId(): number;
  /**
   * Sets a global state property that can be retrieved with the [`global-state` expression](https://maplibre.org/maplibre-style-spec/expressions/#global-state).
   * If the value is null, it resets the property to its default value defined in the [`state` style property](https://maplibre.org/maplibre-style-spec/root/#state).
   *
   * @param propertyName - The name of the state property to set.
   * @param value - The value of the state property to set.
   */
  setGlobalStateProperty(propertyName: string, value: any): this;
  /**
   * Returns the global map state
   *
   * @returns The map state object.
   */
  getGlobalState(): Record<string, any>;
  /**
   * Adds an {@link IControl} to the map, calling `control.onAdd(this)`.
   *
   * An {@link ErrorEvent} will be fired if the control is invalid.
   *
   * @param control - The {@link IControl} to add.
   * @param position - position on the map to which the control will be added.
   * Valid values are `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. Defaults to `'top-right'`.
   * @example
   * Add zoom and rotation controls to the map.
   * ```ts
   * map.addControl(new NavigationControl());
   * ```
   * @see [Display map navigation controls](https://maplibre.org/maplibre-gl-js/docs/examples/display-map-navigation-controls/)
   */
  addControl(control: IControl, position?: ControlPosition): this;
  /**
   * Removes the control from the map.
   *
   * An {@link ErrorEvent} will be fired if the control is invalid.
   *
   * @param control - The {@link IControl} to remove.
   * @example
   * ```ts
   * // Define a new navigation control.
   * let navigation = new NavigationControl();
   * // Add zoom and rotation controls to the map.
   * map.addControl(navigation);
   * // Remove zoom and rotation controls from the map.
   * map.removeControl(navigation);
   * ```
   */
  removeControl(control: IControl): this;
  /**
   * Checks if a control exists on the map.
   *
   * @param control - The {@link IControl} to check.
   * @returns true if map contains control.
   * @example
   * ```ts
   * // Define a new navigation control.
   * let navigation = new NavigationControl();
   * // Add zoom and rotation controls to the map.
   * map.addControl(navigation);
   * // Check that the navigation control exists on the map.
   * map.hasControl(navigation);
   * ```
   */
  hasControl(control: IControl): boolean;
  /**
   * Returns an array of `OverscaledTileID` objects that cover the current viewport for a given tile size.
   * This method is useful for determining which tiles are visible in the current viewport.
   *
   * @param options - Options for calculating the covering tiles.
   * @returns An array of `OverscaledTileID` objects.
   * @example
   * ```ts
   * // Get the tiles to cover the view for a 512x512px tile source
   * const tiles = map.coveringTiles({tileSize: 512});
   * ```
   */
  coveringTiles(options: CoveringTilesOptions): OverscaledTileID[];
  /**
   * Sets the callback used to defer camera updates or apply arbitrary constraints.
   * If specified, this Camera instance can be used as a stateless component in React etc.
   */
  setTransformCameraUpdate(value: CameraUpdateTransformFunction | null): void;
  /**
   * Returns the map's geographical centerpoint.
   *
   * @returns The map's geographical centerpoint.
   * @example
   * Return a LngLat object such as `{lng: 0, lat: 0}`
   * ```ts
   * let center = map.getCenter();
   * // access longitude and latitude values directly
   * let {lng, lat} = map.getCenter();
   * ```
   */
  getCenter(): LngLat;
  /**
   * Sets the map's geographical centerpoint. Equivalent to `jumpTo({center: center})`.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param center - The centerpoint to set.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * map.setCenter([-74, 38]);
   * ```
   */
  setCenter(center: LngLatLike, eventData?: Record<string, unknown>): this;
  /**
   * Returns the elevation of the map's center point.
   *
   * @returns The elevation of the map's center point, in meters above sea level.
   */
  getCenterElevation(): number;
  /**
   * Sets the elevation of the map's center point, in meters above sea level. Equivalent to `jumpTo({elevation: elevation})`.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param elevation - The elevation to set, in meters above sea level.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  setCenterElevation(elevation: number, eventData?: any): this;
  /**
   * Sets the value of `centerClampedToGround`.
   *
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  setCenterClampedToGround(centerClampedToGround: boolean): void;
  /**
   * Pans the map by the specified offset.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param offset - `x` and `y` coordinates by which to pan the map.
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigate-the-map-with-game-like-controls/)
   */
  panBy(offset: PointLike, options?: EaseToOptions, eventData?: any): this;
  /**
   * Pans the map to the specified location with an animated transition.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param lnglat - The location to pan the map to.
   * @param options - Options describing the destination and animation of the transition.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * map.panTo([-74, 38]);
   * // Specify that the panTo animation should last 5000 milliseconds.
   * map.panTo([-74, 38], {duration: 5000});
   * ```
   * @see [Update a feature in realtime](https://maplibre.org/maplibre-gl-js/docs/examples/update-a-feature-in-realtime/)
   */
  panTo(lnglat: LngLatLike, options?: EaseToOptions, eventData?: any): this;
  /**
   * Returns the map's current zoom level.
   *
   * @returns The map's current zoom level.
   * @example
   * ```ts
   * map.getZoom();
   * ```
   */
  getZoom(): number;
  /**
   * Sets the map's zoom level. Equivalent to `jumpTo({zoom: zoom})`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param zoom - The zoom level to set (0-20).
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Zoom to the zoom level 5 without an animated transition
   * ```ts
   * map.setZoom(5);
   * ```
   */
  setZoom(zoom: number, eventData?: any): this;
  /**
   * Zooms the map to the specified zoom level, with an animated transition.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param zoom - The zoom level to transition to.
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * // Zoom to the zoom level 5 without an animated transition
   * map.zoomTo(5);
   * // Zoom to the zoom level 8 with an animated transition
   * map.zoomTo(8, {
   *   duration: 2000,
   *   offset: [100, 50]
   * });
   * ```
   */
  zoomTo(zoom: number, options?: EaseToOptions | null, eventData?: any): this;
  /**
   * Incrementally increases the map's zoom level by 1, first snapping to the nearest `zoomSnap` increment.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Zoom the map in one level with a custom animation duration
   * ```ts
   * map.zoomIn({duration: 1000});
   * ```
   */
  zoomIn(options?: AnimationOptions, eventData?: any): this;
  /**
   * Decreases the map's zoom level by 1, first snapping to the nearest `zoomSnap` increment.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Zoom the map out one level with a custom animation offset
   * ```ts
   * map.zoomOut({offset: [80, 60]});
   * ```
   */
  zoomOut(options?: AnimationOptions, eventData?: any): this;
  /**
   * Returns the map's current vertical field of view, in degrees.
   *
   * @returns The map's current vertical field of view.
   * @defaultValue 36.87
   * @example
   * ```ts
   * const verticalFieldOfView = map.getVerticalFieldOfView();
   * ```
   */
  getVerticalFieldOfView(): number;
  /**
   * Sets the map's vertical field of view, in degrees.
   *
   * Triggers the following events: `movestart`, `move`, and `moveend`.
   *
   * @param fov - The vertical field of view to set, in degrees (0-180).
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @defaultValue 36.87
   * @example
   * Change vertical field of view to 30 degrees
   * ```ts
   * map.setVerticalFieldOfView(30);
   * ```
   */
  setVerticalFieldOfView(fov: number, eventData?: any): this;
  /**
   * Returns the map's current bearing. The bearing is the compass direction that is "up"; for example, a bearing
   * of 90° orients the map so that east is up.
   *
   * @returns The map's current bearing.
   * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigate-the-map-with-game-like-controls/)
   */
  getBearing(): number;
  /**
   * Sets the map's bearing (rotation). The bearing is the compass direction that is "up"; for example, a bearing
   * of 90° orients the map so that east is up.
   *
   * Equivalent to `jumpTo({bearing: bearing})`.
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param bearing - The desired bearing.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Rotate the map to 90 degrees
   * ```ts
   * map.setBearing(90);
   * ```
   */
  setBearing(bearing: number, eventData?: any): this;
  /**
   * Returns the map's current zoom snap level.
   *
   * @returns The map's current zoom snap level.
   */
  getZoomSnap(): number;
  /**
   * Sets the map's zoom snap level.
   *
   * @param snap - The zoom snap level to set.
   */
  setZoomSnap(snap: number): this;
  /**
   * Returns the current padding applied around the map viewport.
   *
   * @returns The current padding around the map viewport.
   */
  getPadding(): PaddingOptions;
  /**
   * Sets the padding in pixels around the viewport.
   *
   * Equivalent to `jumpTo({padding: padding})`.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param padding - The desired padding.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Sets a left padding of 300px, and a top padding of 50px
   * ```ts
   * map.setPadding({ left: 300, top: 50 });
   * ```
   */
  setPadding(padding: PaddingOptions, eventData?: any): this;
  /**
   * Rotates the map to the specified bearing, with an animated transition. The bearing is the compass direction
   * that is "up"; for example, a bearing of 90° orients the map so that east is up.
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param bearing - The desired bearing.
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  rotateTo(bearing: number, options?: EaseToOptions, eventData?: any): this;
  /**
   * Rotates the map so that north is up (0° bearing), with an animated transition.
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  resetNorth(options?: AnimationOptions, eventData?: any): this;
  /**
   * Rotates and pitches the map so that north is up (0° bearing) and pitch and roll are 0°, with an animated transition.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  resetNorthPitch(options?: AnimationOptions, eventData?: any): this;
  /**
   * Snaps the map so that north is up (0° bearing), if the current bearing is close enough to it (i.e. within the
   * `bearingSnap` threshold).
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  snapToNorth(options?: AnimationOptions, eventData?: any): this;
  /**
   * Returns the map's current pitch (tilt).
   *
   * @returns The map's current pitch, measured in degrees away from the plane of the screen.
   */
  getPitch(): number;
  /**
   * Sets the map's pitch (tilt). Equivalent to `jumpTo({pitch: pitch})`.
   *
   * Triggers the following events: `movestart`, `moveend`, `pitchstart`, and `pitchend`.
   *
   * @param pitch - The pitch to set, measured in degrees away from the plane of the screen (0-60).
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  setPitch(pitch: number, eventData?: any): this;
  /**
   * Returns the map's current roll angle.
   *
   * @returns The map's current roll, measured in degrees about the camera boresight.
   */
  getRoll(): number;
  /**
   * Sets the map's roll angle. Equivalent to `jumpTo({roll: roll})`.
   *
   * Triggers the following events: `movestart`, `moveend`, `rollstart`, and `rollend`.
   *
   * @param roll - The roll to set, measured in degrees about the camera boresight
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  setRoll(roll: number, eventData?: any): this;
  /**
   * @param bounds - Calculate the center for these bounds in the viewport and use
   * the highest zoom level up to and including {@link Map.getMaxZoom} that fits
   * in the viewport. LngLatBounds represent a box that is always axis-aligned with bearing 0.
   * Bounds will be taken in `[sw, ne]` order. Southwest point will always be to the left of the northeast point.
   * @param options - Options object
   * @returns If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`,
   * plus `padding` when `absolutePadding` is set.
   * If map is unable to fit, method will warn and return undefined.
   * @example
   * ```ts
   * let bbox = [[-79, 43], [-73, 45]];
   * let newCameraTransform = map.cameraForBounds(bbox, {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   */
  cameraForBounds(bounds: LngLatBoundsLike, options?: CameraForBoundsOptions): JumpToOptions | undefined;
  /**
   * Pans and zooms the map to contain its visible area within the specified geographical bounds.
   * This function will also reset the map's bearing to 0 if bearing is nonzero.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param bounds - Center these bounds in the viewport and use the highest
   * zoom level up to and including {@link Map.getMaxZoom} that fits them in the viewport.
   * Bounds will be taken in `[sw, ne]` order. Southwest point will always be to the left of the northeast point.
   * @param options - Options supports all properties from {@link AnimationOptions} and {@link CameraOptions} in addition to the fields below.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * let bbox = [[-79, 43], [-73, 45]];
   * map.fitBounds(bbox, {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   * @see [Fit a map to a bounding box](https://maplibre.org/maplibre-gl-js/docs/examples/fit-a-map-to-a-bounding-box/)
   */
  fitBounds(bounds: LngLatBoundsLike, options?: FitBoundsOptions, eventData?: any): this;
  /**
   * Pans, rotates and zooms the map to to fit the box made by points p0 and p1
   * once the map is rotated to the specified bearing. To zoom without rotating,
   * pass in the current map bearing.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend` and `rotate`.
   *
   * @param p0 - First point on screen, in pixel coordinates
   * @param p1 - Second point on screen, in pixel coordinates
   * @param bearing - Desired map bearing at end of animation, in degrees
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * let p0 = [220, 400];
   * let p1 = [500, 900];
   * map.fitScreenCoordinates(p0, p1, map.getBearing(), {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   * @see Used by {@link BoxZoomHandler}
   */
  fitScreenCoordinates(p0: PointLike, p1: PointLike, bearing: number, options?: FitBoundsOptions, eventData?: any): this;
  /**
   * Changes any combination of center, zoom, bearing, pitch, and roll, without
   * an animated transition. The map will retain its current values for any
   * details not specified in `options`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
   * `pitch`, `pitchend`, `rollstart`, `roll`, `rollend` and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * // jump to coordinates at current zoom
   * map.jumpTo({center: [0, 0]});
   * // jump with zoom, pitch, and bearing options
   * map.jumpTo({
   *   center: [0, 0],
   *   zoom: 8,
   *   pitch: 45,
   *   bearing: 90
   * });
   * ```
   * @see [Jump to a series of locations](https://maplibre.org/maplibre-gl-js/docs/examples/jump-to-a-series-of-locations/)
   * @see [Update a feature in realtime](https://maplibre.org/maplibre-gl-js/docs/examples/update-a-feature-in-realtime/)
   */
  jumpTo(options: JumpToOptions, eventData?: any): this;
  /**
   * Calculates constrained camera options that place a geographic anchor at a screen point
   * without changing the map, using the same logic as MapLibre's interaction handlers.
   *
   * @param options - Anchor and optional zoom.
   * @returns Camera options that can be passed to {@link Map.jumpTo}.
   * @example
   * ```ts
   * const cameraOptions = map.calculateAnchoredCameraOptions({
   *   anchorLocation: map.unproject(pointerDownPosition),
   *   anchorScreenPoint: currentPointerPosition,
   *   zoom: map.getZoom() + 1,
   * });
   * map.jumpTo(cameraOptions);
   * ```
   */
  calculateAnchoredCameraOptions(options: AnchoredCameraOptions): CameraOptions;
  /**
   * Given a camera position and rotation, calculates zoom and center point and returns them as {@link CameraOptions}.
   * @param cameraLngLat - The lng, lat of the camera to look from
   * @param cameraAlt - The altitude of the camera to look from, in meters above sea level
   * @param bearing - Bearing of the camera, in degrees
   * @param pitch - Pitch of the camera, in degrees
   * @param roll - Roll of the camera, in degrees
   * @returns the calculated camera options
   * @example
   * ```ts
   * // Calculate options to look from camera position(1°, 0°, 1000m) with bearing = 90°, pitch = 30°, and roll = 45°
   * const cameraLngLat = new LngLat(1, 0);
   * const cameraAltitude = 1000;
   * const bearing = 90;
   * const pitch = 30;
   * const roll = 45;
   * const cameraOptions = map.calculateCameraOptionsFromCameraLngLatAltRotation(cameraLngLat, cameraAltitude, bearing, pitch, roll);
   * // Apply calculated options
   * map.jumpTo(cameraOptions);
   * ```
   */
  calculateCameraOptionsFromCameraLngLatAltRotation(cameraLngLat: LngLatLike, cameraAlt: number, bearing: number, pitch: number, roll?: number): CameraOptions;
  /**
   * Changes any combination of `center`, `zoom`, `bearing`, `pitch`, `roll`, and `padding` with an animated transition
   * between old and new values. The map will retain its current values for any
   * details not specified in `options`.
   *
   * !!! note "Reduced Motion"
   *     The transition will happen instantly if the user has enabled
   *     the `reduced motion` accessibility feature enabled in their operating system,
   *     unless `options` includes `essential: true`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
   * `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
   *
   * @param options - Options describing the destination and animation of the transition.
   * Accepts {@link CameraOptions} and {@link AnimationOptions}.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigate-the-map-with-game-like-controls/)
   */
  easeTo(options: EaseToOptions, eventData?: any): this;
  /**
   * Changes any combination of center, zoom, bearing, pitch, and roll, animating the transition along a curve that
   * evokes flight. The animation seamlessly incorporates zooming and panning to help
   * the user maintain her bearings even after traversing a great distance.
   *
   * !!! note "Reduced Motion"
   *     The animation will be skipped, and this will behave equivalently to `jumpTo`
   *     if the user has the `reduced motion` accessibility feature enabled in their operating system,
   *     unless 'options' includes `essential: true`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
   * `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
   *
   * @param options - Options describing the destination and animation of the transition.
   * Accepts {@link CameraOptions}, {@link AnimationOptions},
   * and the following additional options.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * // fly with default options to null island
   * map.flyTo({center: [0, 0], zoom: 9});
   * // using flyTo options
   * map.flyTo({
   *   center: [0, 0],
   *   zoom: 9,
   *   speed: 0.2,
   *   curve: 1,
   *   easing(t) {
   *     return t;
   *   }
   * });
   * ```
   * @see [Fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location/)
   * @see [Slowly fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/slowly-fly-to-a-location/)
   * @see [Fly to a location based on scroll position](https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location-based-on-scroll-position/)
   */
  flyTo(options: FlyToOptions, eventData?: any): this;
  /**
   * Stops any animated transition underway.
   */
  stop(): this;
  /**
   * Gets the elevation at a given location, in meters above sea level.
   * Returns null if terrain is not enabled.
   * If terrain is enabled with some exaggeration value, the value returned here will be reflective of (multiplied by) that exaggeration value.
   * This method should be used for proper positioning of custom 3d objects. If using maplibre-gl-three, see the example [here](https://maplibre-gl-three.readthedocs.io/latest/getting-started/#programmatically-calculating-terrain-height)
   * @param lngLatLike - `[x, y]` or LngLat coordinates of the location
   * @returns elevation in meters
   */
  queryTerrainElevation(lngLatLike: LngLatLike): number | null;
  /**
   * Returns the value of `centerClampedToGround`.
   *
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  getCenterClampedToGround(): boolean;
  /**
   * Given a camera 'from' position and a position to look at (`to`), calculates zoom and camera rotation and returns them as {@link CameraOptions}.
   * Under `globe` and `vertical-perspective` the calculation follows the sphere while the map renders as a globe, keeping the point looked at on the sea-level sphere; `altitudeTo` only becomes the center elevation.
   * @param from - The camera to look from
   * @param altitudeFrom - The altitude of the camera to look from
   * @param to - The center to look at
   * @param altitudeTo - Optional altitude of the center to look at. If none given the ground height will be used.
   * @returns the calculated camera options
   * @example
   * ```ts
   * // Calculate options to look from (1°, 0°, 1000m) to (1°, 1°, 0m)
   * const cameraLngLat = new LngLat(1, 0);
   * const cameraAltitude = 1000;
   * const targetLngLat = new LngLat(1, 1);
   * const targetAltitude = 0;
   * const cameraOptions = map.calculateCameraOptionsFromTo(cameraLngLat, cameraAltitude, targetLngLat, targetAltitude);
   * // Apply calculated options
   * map.jumpTo(cameraOptions);
   * ```
   */
  calculateCameraOptionsFromTo(from: LngLat, altitudeFrom: number, to: LngLat, altitudeTo?: number): CameraOptions;
  /**
   * Resizes the map according to the dimensions of its
   * `container` element.
   *
   * Checks if the map container size changed and updates the map if it has changed.
   * With the default `trackResize: true`, container size changes are picked up automatically,
   * including a container that becomes visible after being hidden with CSS. Call this method
   * explicitly when `trackResize` is `false`, or when the map's size changes in a way the
   * container's `ResizeObserver` cannot observe.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, and `resize`.
   *
   * @param eventData - Additional properties to be passed to `movestart`, `move`, `resize`, and `moveend`
   * events that get triggered as a result of resize. This can be useful for differentiating the
   * source of an event (for example, user-initiated or programmatically-triggered events).
   * @example
   * Resize a map with `trackResize` disabled when its container is shown after being hidden with CSS.
   * ```ts
   * let mapDiv = document.getElementById('map');
   * if (mapDiv.style.visibility === 'visible') map.resize();
   * ```
   */
  resize(eventData?: any, constrainTransform?: boolean): this;
  /**
   * Resizes the map according to the dimensions of its
   * `container` element.
   *
   * It does not trigger any events, and does not check for context loss.
   *
   * It is used internally and by {@link Map.resize}.
   *
   * @internal
   *
   * @param constrainTransform - whether to constrain the transform after resizing.
   */
  _resizeInternal(constrainTransform?: boolean): void;
  _resizeTransform(constrainTransform?: boolean): void;
  /**
   * @internal
   * Return the map's pixel ratio eventually scaled down to respect maxCanvasSize.
   * Internally you should use this and not getPixelRatio().
   * Warns once when the ratio is scaled down. The message carries no sizes: this runs on every
   * resize and `warnOnce` de-duplicates by message, so sizes would warn on every drag frame.
   */
  _getClampedPixelRatio(width: number, height: number): number;
  /**
   * Returns the map's pixel ratio.
   * Note that the pixel ratio actually applied may be lower to respect maxCanvasSize.
   * @returns The pixel ratio.
   */
  getPixelRatio(): number;
  /**
   * Sets the map's pixel ratio. This allows to override `devicePixelRatio`.
   * After this call, the canvas' `width` attribute will be `container.clientWidth * pixelRatio`
   * and its height attribute will be `container.clientHeight * pixelRatio`.
   * Set this to null to disable `devicePixelRatio` override.
   * Note that the pixel ratio actually applied may be lower to respect maxCanvasSize.
   * @param pixelRatio - The pixel ratio.
   */
  setPixelRatio(pixelRatio: number): void;
  /**
   * Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not
   * an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
   * @returns The geographical bounds of the map as {@link LngLatBounds}.
   * @example
   * ```ts
   * let bounds = map.getBounds();
   * ```
   */
  getBounds(): LngLatBounds;
  /**
   * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
   * @returns The map object.
   * @example
   * ```ts
   * let maxBounds = map.getMaxBounds();
   * ```
   */
  getMaxBounds(): LngLatBounds | null;
  /**
   * Sets or clears the map's geographical bounds.
   *
   * Pan and zoom operations are constrained within these bounds.
   * If a pan or zoom is performed that would
   * display regions outside these bounds, the map will
   * instead display a position and zoom level
   * as close as possible to the operation's request while still
   * remaining within the bounds.
   *
   * @param bounds - The maximum bounds to set. If `null` or `undefined` is provided, the function removes the map's maximum bounds.
   * @example
   * Define bounds that conform to the `LngLatBoundsLike` object as set the max bounds.
   * ```ts
   * let bounds = [
   *   [-74.04728, 40.68392], // [west, south]
   *   [-73.91058, 40.87764]  // [east, north]
   * ];
   * map.setMaxBounds(bounds);
   * ```
   */
  setMaxBounds(bounds?: LngLatBoundsLike | null): this;
  /**
   * Sets or clears the map's minimum zoom level.
   * If the map's current zoom level is lower than the new minimum,
   * the map will zoom to the new minimum and trigger the following events:
   * `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * It is not always possible to zoom out and reach the set `minZoom`.
   * Other factors such as map height may restrict zooming. For example,
   * if the map is 512px tall it will not be possible to zoom below zoom 0
   * no matter what the `minZoom` is set to.
   *
   * A {@link ErrorEvent} event will be fired if minZoom is out of bounds.
   *
   * @param minZoom - The minimum zoom level to set (-2 - 24).
   * If `null` or `undefined` is provided, the function removes the current minimum zoom (i.e. sets it to -2).
   * @example
   * ```ts
   * map.setMinZoom(12.25);
   * ```
   */
  setMinZoom(minZoom?: number | null): this;
  /**
   * Returns the map's minimum allowable zoom level.
   *
   * @param constrained - If `true`, returns the effective minimum zoom after applying the map's viewport constraints.
   * If `false` or omitted, returns the configured minimum zoom.
   * @returns minZoom
   * @example
   * ```ts
   * let minZoom = map.getMinZoom();
   * ```
   */
  getMinZoom(constrained?: boolean): number;
  /**
   * Sets or clears the map's maximum zoom level.
   * If the map's current zoom level is higher than the new maximum,
   * the map will zoom to the new maximum and trigger the following events:
   * `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * A {@link ErrorEvent} event will be fired if minZoom is out of bounds.
   *
   * @param maxZoom - The maximum zoom level to set.
   * If `null` or `undefined` is provided, the function removes the current maximum zoom (sets it to 22).
   * @example
   * ```ts
   * map.setMaxZoom(18.75);
   * ```
   */
  setMaxZoom(maxZoom?: number | null): this;
  /**
   * Returns the map's maximum allowable zoom level.
   *
   * @returns The maxZoom
   * @example
   * ```ts
   * let maxZoom = map.getMaxZoom();
   * ```
   */
  getMaxZoom(): number;
  /**
   * Sets or clears the map's minimum pitch.
   * If the map's current pitch is lower than the new minimum,
   * the map will pitch to the new minimum and trigger the following events:
   * `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, and `pitchend`.
   *
   * A {@link ErrorEvent} event will be fired if minPitch is out of bounds.
   *
   * @param minPitch - The minimum pitch to set (0-180). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.
   * If `null` or `undefined` is provided, the function removes the current minimum pitch (i.e. sets it to 0).
   */
  setMinPitch(minPitch?: number | null): this;
  /**
   * Returns the map's minimum allowable pitch.
   *
   * @returns The minPitch
   */
  getMinPitch(): number;
  /**
   * Sets or clears the map's maximum pitch.
   * If the map's current pitch is higher than the new maximum,
   * the map will pitch to the new maximum and trigger the following events:
   * `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, and `pitchend`.
   *
   * A {@link ErrorEvent} event will be fired if maxPitch is out of bounds.
   *
   * @param maxPitch - The maximum pitch to set (0-180). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.
   * If `null` or `undefined` is provided, the function removes the current maximum pitch (sets it to 60).
   */
  setMaxPitch(maxPitch?: number | null): this;
  /**
   * Returns the map's maximum allowable pitch.
   *
   * @returns The maxPitch
   */
  getMaxPitch(): number;
  /**
   * Returns the map's anisotropic filter pitch.
   * If the map is pitched beyond this threshold, anisotropic filtering will be applied to all raster layers.
   *
   * @returns The anisotropicFilterPitch
   * @example
   * ```ts
   * let anisotropicFilterPitch = map.getAnisotropicFilterPitch();
   * ```
   */
  getAnisotropicFilterPitch(): number;
  /**
   * Sets the map's anisotropic filter pitch or reverts it to its default.
   *
   * A {@link ErrorEvent} event will be fired if anisotropicFilterPitch is out of bounds.
   *
   * @param anisotropicFilterPitch - The pitch above which to apply anisotropic filtering to the map's raster layers (0-180).
   * If `null` or `undefined` is provided, the function reverts to the default pitch threshold (20).
   *
   *
   * @example
   * ```ts
   * map.setAnisotropicFilterPitch(85);
   * ```
   */
  setAnisotropicFilterPitch(anisotropicFilterPitch?: number | null): this;
  /**
   * Returns the state of `renderWorldCopies`. If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
   *
   * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
   * container, there will be blank space beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
   * map and the other on the left edge of the map) at every zoom level.
   * @returns The renderWorldCopies
   * @example
   * ```ts
   * let worldCopiesRendered = map.getRenderWorldCopies();
   * ```
   * @see [Render world copies](https://maplibre.org/maplibre-gl-js/docs/examples/render-world-copies/)
   */
  getRenderWorldCopies(): boolean;
  /**
   * Sets the state of `renderWorldCopies`.
   *
   * @param renderWorldCopies - If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
   *
   * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
   * container, there will be blank space beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
   * map and the other on the left edge of the map) at every zoom level.
   *
   * `undefined` is treated as `true`, `null` is treated as `false`.
   * @example
   * ```ts
   * map.setRenderWorldCopies(true);
   * ```
   * @see [Render world copies](https://maplibre.org/maplibre-gl-js/docs/examples/render-world-copies/)
   */
  setRenderWorldCopies(renderWorldCopies?: boolean | null): this;
  /** Sets or clears the callback overriding how the map constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
   *
   * @param constrain - A {@link TransformConstrainFunction} callback defining how the viewport should respect the bounds.
   *
   * `null` clears the callback and reverts the constrain to the map transform's default constrain function.
   * @example
   * ```ts
   * function customTransformConstrain(lngLat, zoom) {
   *   return {center: lngLat, zoom: zoom ?? 0};
   * };
   * map.setTransformConstrain(customTransformConstrain);
   * ```
   * @see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
   */
  setTransformConstrain(constrain?: TransformConstrainFunction | null): this;
  /**
   * Returns a [Point](https://github.com/mapbox/point-geometry) representing pixel coordinates, relative to the map's `container`,
   * that correspond to the specified geographical location.
   *
   * A location behind the camera has no corresponding pixel. For such a location the
   * returned point is outside the viewport, on the side through which the location left
   * the screen, one viewport width or height away from the edge.
   *
   * @param lnglat - The geographical location to project.
   * @returns The [Point](https://github.com/mapbox/point-geometry) corresponding to `lnglat`, relative to the map's `container`.
   * @example
   * ```ts
   * let coordinate = [-122.420679, 37.772537];
   * let point = map.project(coordinate);
   * ```
   */
  project(lnglat: LngLatLike): Point$1;
  /**
   * Returns a {@link LngLat} representing geographical coordinates that correspond
   * to the specified pixel coordinates.
   *
   * @param point - The pixel coordinates to unproject.
   * @returns The {@link LngLat} corresponding to `point`.
   * @example
   * ```ts
   * map.on('click', (e) => {
   *   // When the map is clicked, get the geographic coordinate.
   *   let coordinate = map.unproject(e.point);
   * });
   * ```
   */
  unproject(point: PointLike): LngLat;
  /**
   * Returns true if the map is panning, zooming, rotating, or pitching due to a camera animation or user gesture.
   * @returns true if the map is moving.
   * @example
   * ```ts
   * let isMoving = map.isMoving();
   * ```
   */
  isMoving(): boolean;
  /**
   * Returns true if the map is zooming due to a camera animation or user gesture.
   * @returns true if the map is zooming.
   * @example
   * ```ts
   * let isZooming = map.isZooming();
   * ```
   */
  isZooming(): boolean;
  /**
   * Returns true if the map is rotating due to a camera animation or user gesture.
   * @returns true if the map is rotating.
   * @example
   * ```ts
   * map.isRotating();
   * ```
   */
  isRotating(): boolean;
  _createDelegates(type: keyof MapEventType | string, layerIds: string[], listener: Listener): DelegatedListener["delegates"];
  _addDelegatedListener(type: keyof MapEventType | string, delegatedListener: DelegatedListener): void;
  _removeDelegatedListener(type: string, layerIds: string[], listener: Listener): void;
  /**
   * @event
   * Adds a listener for events of a specified type, optionally limited to features in a specified style layer(s).
   * See {@link MapEventType} and {@link MapLayerEventType} for a full list of events and their description.
   *
   * | Event                  | Compatible with `layerId` |
   * |------------------------|---------------------------|
   * | `mousedown`            | yes                       |
   * | `mouseup`              | yes                       |
   * | `mouseover`            | yes                       |
   * | `mouseout`             | yes                       |
   * | `mousemove`            | yes                       |
   * | `mouseenter`           | yes (required)            |
   * | `mouseleave`           | yes (required)            |
   * | `click`                | yes                       |
   * | `dblclick`             | yes                       |
   * | `contextmenu`          | yes                       |
   * | `touchstart`           | yes                       |
   * | `touchend`             | yes                       |
   * | `touchcancel`          | yes                       |
   * | `wheel`                |                           |
   * | `resize`               |                           |
   * | `remove`               |                           |
   * | `touchmove`            |                           |
   * | `movestart`            |                           |
   * | `move`                 |                           |
   * | `moveend`              |                           |
   * | `dragstart`            |                           |
   * | `drag`                 |                           |
   * | `dragend`              |                           |
   * | `zoomstart`            |                           |
   * | `zoom`                 |                           |
   * | `zoomend`              |                           |
   * | `rotatestart`          |                           |
   * | `rotate`               |                           |
   * | `rotateend`            |                           |
   * | `pitchstart`           |                           |
   * | `pitch`                |                           |
   * | `pitchend`             |                           |
   * | `boxzoomstart`         |                           |
   * | `boxzoomend`           |                           |
   * | `boxzoomcancel`        |                           |
   * | `webglcontextlost`     |                           |
   * | `webglcontextrestored` |                           |
   * | `load`                 |                           |
   * | `render`               |                           |
   * | `idle`                 |                           |
   * | `error`                |                           |
   * | `data`                 |                           |
   * | `styledata`            |                           |
   * | `sourcedata`           |                           |
   * | `dataloading`          |                           |
   * | `styledataloading`     |                           |
   * | `sourcedataloading`    |                           |
   * | `styleimagemissing`    |                           |
   * | `dataabort`            |                           |
   * | `sourcedataabort`      |                           |
   *
   * @param type - The event type to listen for. Events compatible with the optional `layerId` parameter are triggered
   * when the cursor enters a visible portion of the specified layer from outside that layer or outside the map canvas.
   * @param layer - The ID of a style layer or a listener if no ID is provided. Event will only be triggered if its location
   * is within a visible feature in this layer. The event will have a `features` property containing
   * an array of the matching features. If `layer` is not supplied, the event will not have a `features` property.
   * Please note that many event types are not compatible with the optional `layer` parameter.
   * @param listener - The function to be called when the event is fired.
   * @example
   * ```ts
   * // Set an event listener that will fire
   * // when the map has finished loading
   * map.on('load', () => {
   *   // Once the map has finished loading,
   *   // add a new layer
   *   map.addLayer({
   *     id: 'points-of-interest',
   *     source: {
   *       type: 'vector',
   *       url: 'https://maplibre.org/maplibre-style-spec/'
   *     },
   *     'source-layer': 'poi_label',
   *     type: 'circle',
   *     paint: {
   *       // MapLibre Style Specification paint properties
   *     },
   *     layout: {
   *       // MapLibre Style Specification layout properties
   *     }
   *   });
   * });
   * ```
   * @example
   * ```ts
   * // Set an event listener that will fire
   * // when a feature on the countries layer of the map is clicked
   * map.on('click', 'countries', (e) => {
   *   new Popup()
   *     .setLngLat(e.lngLat)
   *     .setText(`Country name: ${e.features[0].properties.name}`)
   *     .addTo(map);
   * });
   * ```
   * @see [Display popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   * @see [Create a hover effect](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Create a draggable marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  on<T extends keyof MapLayerEventType>(type: T, layer: string, listener: (ev: MapLayerEventType[T] & Object) => void): Subscription;
  /**
   * Overload of the `on` method that allows to listen to events specifying multiple layers.
   * @event
   * @param type - The type of the event.
   * @param layerIds - The array of style layer IDs.
   * @param listener - The listener callback.
   */
  on<T extends keyof MapLayerEventType>(type: T, layerIds: string[], listener: (ev: MapLayerEventType[T] & Object) => void): Subscription;
  /**
   * Overload of the `on` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): Subscription;
  /**
   * Overload of the `on` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  on(type: keyof MapEventType, listener: Listener): Subscription;
  /**
   * Adds a listener that will be called only once to a specified event type, optionally limited to features in a specified style layer.
   *
   * @event
   * @param type - The event type to listen for; one of `'mousedown'`, `'mouseup'`, `'click'`, `'dblclick'`,
   * `'mousemove'`, `'mouseenter'`, `'mouseleave'`, `'mouseover'`, `'mouseout'`, `'contextmenu'`, `'touchstart'`,
   * `'touchend'`, or `'touchcancel'`. `mouseenter` and `mouseover` events are triggered when the cursor enters
   * a visible portion of the specified layer from outside that layer or outside the map canvas. `mouseleave`
   * and `mouseout` events are triggered when the cursor leaves a visible portion of the specified layer, or leaves
   * the map canvas.
   * @param layer - The ID of a style layer or a listener if no ID is provided. Only events whose location is within a visible
   * feature in this layer will trigger the listener. The event will have a `features` property containing
   * an array of the matching features.
   * @param listener - The function to be called when the event is fired.
   * @returns `this` if listener is provided, promise otherwise to allow easier usage of async/await
   */
  once<T extends keyof MapLayerEventType>(type: T, layer: string, listener: (ev: MapLayerEventType[T] & Object) => void): this;
  /**
   * Overload of the `once` method that, with a single layer and no listener, returns a promise
   * resolving with the event for easier usage of async/await.
   * @event
   * @param type - The type of the event.
   * @param layer - The ID of the style layer.
   */
  once<T extends keyof MapLayerEventType>(type: T, layer: string): Promise<MapLayerEventType[T] & Object>;
  /**
   * Overload of the `once` method that allows to listen to events specifying multiple layers.
   * @event
   * @param type - The type of the event.
   * @param layerIds - The array of style layer IDs.
   * @param listener - The listener callback.
   */
  once<T extends keyof MapLayerEventType>(type: T, layerIds: string[], listener: (ev: MapLayerEventType[T] & Object) => void): this;
  /**
   * Overload of the `once` method that, with multiple layers and no listener, returns a promise
   * resolving with the event for easier usage of async/await.
   * @event
   * @param type - The type of the event.
   * @param layerIds - The array of style layer IDs.
   */
  once<T extends keyof MapLayerEventType>(type: T, layerIds: string[]): Promise<MapLayerEventType[T] & Object>;
  /**
   * Overload of the `once` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  once<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): this;
  /**
   * Overload of the `once` method that returns a promise resolving with the event,
   * for easier usage of async/await, when no listener is provided.
   * @event
   * @param type - The type of the event.
   */
  once<T extends keyof MapEventType>(type: T): Promise<MapEventType[T] & Object>;
  /**
   * Overload of the `once` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  once(type: keyof MapEventType, listener?: Listener): this | Promise<any>;
  /**
   * Removes an event listener for events previously added with `{@link Map.on}`.
   *
   * @event
   * @param type - The event type previously used to install the listener.
   * @param layer - The layer ID or listener previously used to install the listener.
   * @param listener - The function previously installed as a listener.
   */
  off<T extends keyof MapLayerEventType>(type: T, layer: string, listener: (ev: MapLayerEventType[T] & Object) => void): this;
  /**
   * Overload of the `off` method that allows to remove an event created with multiple layers.
   * Provide the same layer IDs as to `on` or `once`, when the listener was registered.
   * @event
   * @param type - The type of the event.
   * @param layers - The layer IDs previously used to install the listener.
   * @param listener - The function previously installed as a listener.
   */
  off<T extends keyof MapLayerEventType>(type: T, layers: string[], listener: (ev: MapLayerEventType[T] & Object) => void): this;
  /**
   * Overload of the `off` method that allows to remove an event created without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The function previously installed as a listener.
   */
  off<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): this;
  /**
   * Overload of the `off` method that allows to remove an event created without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The function previously installed as a listener.
   */
  off(type: keyof MapEventType, listener: Listener): this;
  /**
   * Returns an array of MapGeoJSONFeature objects
   * representing visible features that satisfy the query parameters.
   *
   * @param geometryOrOptions - (optional) The geometry of the query region in pixel points within the map viewport:
   * either a single pixel point or a pair of top-left and bottom-right pixel points describing a bounding box.
   * The origin of the pixel points is at the top-left of the map viewport.
   * Omitting this parameter (i.e. calling {@link Map.queryRenderedFeatures} with zero arguments,
   * or with only a `options` argument) is equivalent to passing a bounding box encompassing the entire
   * map viewport.
   * The geometryOrOptions can receive a {@link QueryRenderedFeaturesOptions} only to support a situation where the function receives only one parameter which is the options parameter.
   * @param options - (optional) Options object.
   *
   * @returns An array of MapGeoJSONFeature objects.
   *
   * The `properties` value of each returned feature object contains the properties of its source feature. For GeoJSON sources, only
   * string and numeric property values are supported (i.e. `null`, `Array`, and `Object` values are not supported).
   *
   * Each feature includes top-level `layer`, `source`, and `sourceLayer` properties. The `layer` property is an object
   * representing the style layer to  which the feature belongs. Layout and paint properties in this object contain values
   * which are fully evaluated for the given zoom level and feature.
   *
   * Only features that are currently rendered are included. Some features will **not** be included, like:
   *
   * - Features from layers whose `visibility` property is `"none"`.
   * - Features from layers whose zoom range excludes the current zoom level.
   * - Symbol features that have been hidden due to text or icon collision.
   *
   * Features from all other layers are included, including features that may have no visible
   * contribution to the rendered result; for example, because the layer's opacity or color alpha component is set to
   * 0.
   *
   * The topmost rendered feature appears first in the returned array, and subsequent features are sorted by
   * descending z-order. Features that are rendered multiple times (due to wrapping across the antemeridian at low
   * zoom levels) are returned only once (though subject to the following caveat).
   *
   * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
   * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple
   * times in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
   * The results of the query will be those parts of the highway that lie within the map tiles covering the bounding
   * rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile
   * will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple
   * tiles due to tile buffering.
   *
   * @example
   * Find all features at a point
   * ```ts
   * let features = map.queryRenderedFeatures(
   *   [20, 35],
   *   { layers: ['my-layer-name'] }
   * );
   * ```
   *
   * @example
   * Find all features within a static bounding box
   * ```ts
   * let features = map.queryRenderedFeatures(
   *   [[10, 20], [30, 50]],
   *   { layers: ['my-layer-name'] }
   * );
   * ```
   *
   * @example
   * Find all features within a bounding box around a point
   * ```ts
   * let width = 10;
   * let height = 20;
   * let features = map.queryRenderedFeatures([
   *   [point.x - width / 2, point.y - height / 2],
   *   [point.x + width / 2, point.y + height / 2]
   * ], { layers: ['my-layer-name'] });
   * ```
   *
   * @example
   * Query all rendered features from a single layer
   * ```ts
   * let features = map.queryRenderedFeatures({ layers: ['my-layer-name'] });
   * ```
   * @see [Get features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-features-under-the-mouse-pointer/)
   */
  queryRenderedFeatures(geometryOrOptions?: PointLike | [PointLike, PointLike] | QueryRenderedFeaturesOptions, options?: QueryRenderedFeaturesOptions): MapGeoJSONFeature[];
  /**
   * Returns an array of MapGeoJSONFeature objects
   * representing features within the specified vector tile or GeoJSON source that satisfy the query parameters.
   *
   * @param sourceId - The ID of the vector tile or GeoJSON source to query.
   * @param parameters - The options object.
   * @returns An array of MapGeoJSONFeature objects.
   *
   * In contrast to {@link Map.queryRenderedFeatures}, this function returns all features matching the query parameters,
   * whether or not they are rendered by the current style (i.e. visible). The domain of the query includes all currently-loaded
   * vector tiles and GeoJSON source tiles: this function does not check tiles outside the currently
   * visible viewport.
   *
   * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
   * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple
   * times in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
   * The results of the query will be those parts of the highway that lie within the map tiles covering the bounding
   * rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile
   * will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple
   * tiles due to tile buffering.
   *
   * @example
   * Find all features in one source layer in a vector source
   * ```ts
   * let features = map.querySourceFeatures('your-source-id', {
   *   sourceLayer: 'your-source-layer'
   * });
   * ```
   *
   */
  querySourceFeatures(sourceId: string, parameters?: QuerySourceFeatureOptions | null): GeoJSONFeature[];
  /**
   * Updates the map's MapLibre style object with a new value.
   *
   * If a style is already set when this is used and options.diff is set to true, the map renderer will attempt to compare the given style
   * against the map's current state and perform only the changes necessary to make the map style match the desired state. Changes in sprites
   * (images used for icons and patterns) and glyphs (fonts for label text) **cannot** be diffed. If the sprites or fonts used in the current
   * style and the given style are different in any way, the map renderer will force a full update, removing the current style and building
   * the given one from scratch.
   *
   *
   * @param style - A JSON object conforming to the schema described in the
   * [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/), or a URL to such JSON.
   * @param options - The options object.
   *
   * @example
   * ```ts
   * map.setStyle("https://demotiles.maplibre.org/style.json");
   *
   * map.setStyle('https://demotiles.maplibre.org/style.json', {
   *   transformStyle: (previousStyle, nextStyle) => ({
   *       ...nextStyle,
   *       sources: {
   *           ...nextStyle.sources,
   *           // copy a source from previous style
   *           'osm': previousStyle.sources.osm
   *       },
   *       layers: [
   *           // background layer
   *           nextStyle.layers[0],
   *           // copy a layer from previous style
   *           previousStyle.layers[0],
   *           // other layers from the next style
   *           ...nextStyle.layers.slice(1).map(layer => {
   *               // hide the layers we don't need from demotiles style
   *               if (layer.id.startsWith('geolines')) {
   *                   layer.layout = {...layer.layout || {}, visibility: 'none'};
   *               // filter out US polygons
   *               } else if (layer.id.startsWith('coastline') || layer.id.startsWith('countries')) {
   *                   layer.filter = ['!=', ['get', 'ADM0_A3'], 'USA'];
   *               }
   *               return layer;
   *           })
   *       ]
   *   })
   * });
   *
   * map.setStyle('https://demotiles.maplibre.org/style.json', {
   *   globalState: {
   *     showCircles: true,
   *   }
   * });
   * ```
   */
  setStyle(style: StyleSpecification | string | null, options?: StyleSwapOptions & StyleOptions): this;
  /**
   *  Updates the requestManager's transform request with a new function
   *
   * @param transformRequest - A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
   * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties
   *
   * @example
   * ```ts
   * map.setTransformRequest((url: string, resourceType: string) => {});
   * ```
   */
  setTransformRequest(transformRequest: RequestTransformFunction | null): this;
  _getUIString(key: keyof typeof defaultLocale): string;
  _updateStyle(style: StyleSpecification | string | null, options?: StyleSwapOptions & StyleOptions): this;
  _lazyInitEmptyStyle(): void;
  _diffStyle(style: StyleSpecification | string, options?: StyleSwapOptions & StyleOptions): Promise<void>;
  _updateDiff(style: StyleSpecification, options?: StyleSwapOptions & StyleOptions): void;
  /**
   * Returns the map's MapLibre style object, a JSON object which can be used to recreate the map's style.
   *
   * @returns The map's style JSON object.
   *
   * @example
   * ```ts
   * let styleJson = map.getStyle();
   * ```
   *
   */
  getStyle(): StyleSpecification;
  /**
   * Returns the URL the map's style was loaded from.
   *
   * @returns The URL given to {@link Map.setStyle} or the `style` map option, or `null` when the style was given as an object or the map has no style.
   *
   * @example
   * ```ts
   * const styleUrl = map.getStyleUrl();
   * ```
   */
  getStyleUrl(): string | null;
  /**
   * @internal
   * Returns the map's style and cloned images to restore context.
   * @returns An object containing the style and images.
   */
  _getStyleAndImages(): LostContextStyle;
  /**
   * Returns a Boolean indicating whether the map's style is fully loaded.
   *
   * @returns A Boolean indicating whether the style is fully loaded.
   *
   * @example
   * ```ts
   * let styleLoadStatus = map.isStyleLoaded();
   * ```
   */
  isStyleLoaded(): boolean | void;
  /**
   * Adds a source to the map's style.
   *
   * Events triggered:
   *
   * Triggers the `source.add` event.
   *
   * @param id - The ID of the source to add. Must not conflict with existing sources.
   * @param source - The source object, conforming to the
   * MapLibre Style Specification's [source definition](https://maplibre.org/maplibre-style-spec/sources) or
   * {@link CanvasSourceSpecification}.
   * @example
   * ```ts
   * map.addSource('my-data', {
   *   type: 'vector',
   *   url: 'https://demotiles.maplibre.org/tiles/tiles.json'
   * });
   * ```
   * @example
   * ```ts
   * map.addSource('my-data', {
   *   "type": "geojson",
   *   "data": {
   *     "type": "Feature",
   *     "geometry": {
   *       "type": "Point",
   *       "coordinates": [-77.0396, 38.8891]
   *     },
   *     "properties": {
   *       "title": "Washington DC",
   *       "marker-symbol": "monument"
   *     }
   *   }
   * });
   * ```
   * @see GeoJSON source: [Add live realtime data](https://maplibre.org/maplibre-gl-js/docs/examples/add-live-realtime-data/)
   */
  addSource(id: string, source: SourceSpecification | CanvasSourceSpecification): this;
  /**
   * Returns a Boolean indicating whether the source is loaded. Returns `true` if the source with
   * the given ID in the map's style has no outstanding network requests, otherwise `false`.
   *
   * A {@link ErrorEvent} event will be fired if there is no source with the specified ID.
   *
   * @param id - The ID of the source to be checked.
   * @returns A Boolean indicating whether the source is loaded.
   * @example
   * ```ts
   * let sourceLoaded = map.isSourceLoaded('bathymetry-data');
   * ```
   */
  isSourceLoaded(id: string): boolean;
  /**
   * Loads a 3D terrain mesh, based on a "raster-dem" source.
   *
   * Triggers the `terrain` event.
   *
   * @param options - Options object.
   * @example
   * ```ts
   * map.setTerrain({ source: 'terrain' });
   * ```
   */
  setTerrain(options: TerrainSpecification | null, styleOptions?: StyleSetterOptions): this;
  private _handleTerrainDataEvent;
  /**
   * Get the terrain-options if terrain is loaded
   * @returns the TerrainSpecification passed to setTerrain
   * @example
   * ```ts
   * map.getTerrain(); // { source: 'terrain' };
   * ```
   */
  getTerrain(): TerrainSpecification | null;
  /**
   * Returns a Boolean indicating whether all tiles in the viewport from all sources on
   * the style are loaded.
   *
   * @returns A Boolean indicating whether all tiles are loaded.
   * @example
   * ```ts
   * let tilesLoaded = map.areTilesLoaded();
   * ```
   */
  areTilesLoaded(): boolean;
  /**
   * Removes a source from the map's style.
   *
   * @param id - The ID of the source to remove.
   * @example
   * ```ts
   * map.removeSource('bathymetry-data');
   * ```
   */
  removeSource(id: string): this;
  /**
   * Returns the source with the specified ID in the map's style.
   *
   * This method is often used to update a source using the instance members for the relevant
   * source type as defined in classes that derive from {@link Source}.
   * For example, setting the `data` for a GeoJSON source or updating the `url` and `coordinates`
   * of an image source.
   *
   * @param id - The ID of the source to get.
   * @returns The style source with the specified ID or `undefined` if the ID
   * corresponds to no existing sources.
   * The shape of the object varies by source type.
   * A list of options for each source type is available on the MapLibre Style Specification's
   * [Sources](https://maplibre.org/maplibre-style-spec/sources/) page.
   * @example
   * ```ts
   * let sourceObject = map.getSource('points');
   * ```
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   * @see [Animate a point](https://maplibre.org/maplibre-gl-js/docs/examples/animate-a-point/)
   * @see [Add live realtime data](https://maplibre.org/maplibre-gl-js/docs/examples/add-live-realtime-data/)
   */
  getSource<TSource extends Source>(id: string): TSource | undefined;
  /**
   * Change the tile Level of Detail behavior of the specified source. These parameters have no effect when
   * pitch == 0, and the largest effect when the horizon is visible on screen.
   *
   * @param maxZoomLevelsOnScreen - The maximum number of distinct zoom levels allowed on screen at a time.
   * There will generally be fewer zoom levels on the screen, the maximum can only be reached when the horizon
   * is at the top of the screen. Increasing the maximum number of zoom levels causes the zoom level to decay
   * faster toward the horizon.
   * @param tileCountMaxMinRatio - The ratio of the maximum number of tiles loaded (at high pitch) to the minimum
   * number of tiles loaded. Increasing this ratio allows more tiles to be loaded at high pitch angles. If the ratio
   * would otherwise be exceeded, the zoom level is reduced uniformly to keep the number of tiles within the limit.
   * @param sourceId - The ID of the source to set tile LOD parameters for. All sources will be updated if unspecified.
   * If `sourceId` is specified but a corresponding source does not exist, an error is thrown.
   * @example
   * ```ts
   * map.setSourceTileLodParams(4.0, 3.0, 'terrain');
   * ```
   * @see [Modify Level of Detail behavior](https://maplibre.org/maplibre-gl-js/docs/examples/level-of-detail-control/)
   */
  setSourceTileLodParams(maxZoomLevelsOnScreen: number, tileCountMaxMinRatio: number, sourceId?: string): this;
  /**
   * Triggers a reload of the selected tiles
   *
   * @param sourceId - The ID of the source
   * @param tileIds - An array of tile IDs to be reloaded. If not defined, all tiles will be reloaded.
   * @example
   * ```ts
   * map.refreshTiles('satellite', [{x:1024, y: 1023, z: 11}, {x:1023, y: 1023, z: 11}]);
   * ```
   */
  refreshTiles(sourceId: string, tileIds?: Array<{
    x: number;
    y: number;
    z: number;
  }>): void;
  /**
   * Add an image to the style. This image can be displayed on the map like any other icon in the style's
   * sprite using the image's ID with
   * [`icon-image`](https://maplibre.org/maplibre-style-spec/layers/#layout-symbol-icon-image),
   * [`background-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-background-background-pattern),
   * [`fill-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-fill-fill-pattern),
   * or [`line-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-line-line-pattern).
   *
   * A {@link ErrorEvent} event will be fired if the image parameter is invalid or there is not enough space in the sprite to add this image.
   *
   * @param id - The ID of the image.
   * @param image - The image as an `HTMLImageElement`, `ImageData`, `ImageBitmap` or object with `width`, `height`, and `data`
   * properties with the same format as `ImageData`.
   * @param options - Options object.
   * @example
   * ```ts
   * // If the style's sprite does not already contain an image with ID 'cat',
   * // add the image 'cat-icon.png' to the style's sprite with the ID 'cat'.
   * const image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png');
   * if (!map.hasImage('cat')) map.addImage('cat', image.data);
   *
   * // Add a stretchable image that can be used with `icon-text-fit`
   * // In this example, the image is 600px wide by 400px high.
   * const image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/8/89/Black_and_White_Boxed_%28bordered%29.png');
   * if (map.hasImage('border-image')) return;
   * map.addImage('border-image', image.data, {
   *     content: [16, 16, 300, 384], // place text over left half of image, avoiding the 16px border
   *     stretchX: [[16, 584]], // stretch everything horizontally except the 16px border
   *     stretchY: [[16, 384]], // stretch everything vertically except the 16px border
   * });
   * ```
   * @see Use `HTMLImageElement`: [Add an icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-icon-to-the-map/)
   * @see Use `ImageData`: [Add a generated icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-generated-icon-to-the-map/)
   */
  addImage(id: string, image: StyleImageSource, options?: Partial<StyleImageMetadata>): this;
  /**
   * Sets a callback that is invoked when an icon or pattern needed by the style is missing.
   *
   * The resolver typically loads or generates the image and registers it with {@link Map.addImage}.
   * MapLibre awaits the returned promise before treating the image as missing, so async work is
   * supported. If the image is still missing afterwards, the `styleimagemissing` event is fired.
   *
   * @param resolver - Callback used to resolve missing images, or `null` to remove the resolver.
   * @example
   * ```ts
   * map.setMissingStyleImageResolver(async (id) => {
   *     const response = await fetch(`/icons/${id}.png`);
   *     const image = await createImageBitmap(await response.blob());
   *     map.addImage(id, image, {pixelRatio: 2});
   * });
   * ```
   */
  setMissingStyleImageResolver(resolver: MissingStyleImageResolver | null): this;
  _createStyleImage(image: StyleImageSource, options?: Partial<StyleImageMetadata>): StyleImage | null;
  /**
   * Update an existing image in a style. This image can be displayed on the map like any other icon in the style's
   * sprite using the image's ID with
   * [`icon-image`](https://maplibre.org/maplibre-style-spec/layers/#layout-symbol-icon-image),
   * [`background-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-background-background-pattern),
   * [`fill-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-fill-fill-pattern),
   * or [`line-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-line-line-pattern).
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invalid.
   *
   * @param id - The ID of the image.
   * @param image - The image as an `HTMLImageElement`, `ImageData`, `ImageBitmap` or object with `width`, `height`, and `data`
   * properties with the same format as `ImageData`.
   * @example
   * ```ts
   * // If an image with the ID 'cat' already exists in the style's sprite,
   * // replace that image with a new image, 'other-cat-icon.png'.
   * if (map.hasImage('cat')) map.updateImage('cat', './other-cat-icon.png');
   * ```
   */
  updateImage(id: string, image: StyleImageSource): this;
  /**
   * Returns an image, specified by ID, currently available in the map.
   * This includes both images from the style's original sprite
   * and any images that have been added at runtime using {@link Map.addImage}.
   *
   * @param id - The ID of the image.
   * @returns An image in the map with the specified ID.
   *
   * @example
   * ```ts
   * let coffeeShopIcon = map.getImage("coffee_cup");
   * ```
   */
  getImage(id: string): StyleImage;
  /**
   * Check whether or not an image with a specific ID exists in the style. This checks both images
   * in the style's original sprite and any images
   * that have been added at runtime using {@link Map.addImage}.
   *
   * An {@link ErrorEvent} will be fired if the image ID is missing.
   *
   * @param id - The ID of the image.
   *
   * @returns A Boolean indicating whether the image exists.
   * @example
   * Check if an image with the ID 'cat' exists in the style's sprite.
   * ```ts
   * let catIconExists = map.hasImage('cat');
   * ```
   */
  hasImage(id: string): boolean;
  /**
   * Remove an image from a style. This can be an image from the style's original
   * sprite or any images
   * that have been added at runtime using {@link Map.addImage}.
   *
   * @param id - The ID of the image.
   *
   * @example
   * ```ts
   * // If an image with the ID 'cat' exists in
   * // the style's sprite, remove it.
   * if (map.hasImage('cat')) map.removeImage('cat');
   * ```
   */
  removeImage(id: string): void;
  /**
   * Load an image from an external URL to be used with {@link Map.addImage}. External
   * domains must support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
   *
   * @param url - The URL of the image file. Image file must be in png, webp, or jpg format.
   * @returns a promise that is resolved when the image is loaded, or rejected when the response has no image data (for example an HTTP 204)
   *
   * @example
   * Load an image from an external URL.
   * ```ts
   * const response = await map.loadImage('https://picsum.photos/50/50');
   * // Add the loaded image to the style's sprite with the ID 'photo'.
   * map.addImage('photo', response.data);
   * ```
   * @see [Add an icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-icon-to-the-map/)
   */
  loadImage(url: string): Promise<GetResourceResponse<HTMLImageElement | ImageBitmap>>;
  /**
   * Returns an Array of strings containing the IDs of all images currently available in the map.
   * This includes both images from the style's original sprite
   * and any images that have been added at runtime using {@link Map.addImage}.
   *
   * @returns An Array of strings containing the names of all sprites/images currently available in the map.
   *
   * @example
   * ```ts
   * let allImages = map.listImages();
   * ```
   */
  listImages(): string[];
  /**
   * Adds a [MapLibre style layer](https://maplibre.org/maplibre-style-spec/layers)
   * to the map's style.
   *
   * A layer defines how data from a specified source will be styled. Read more about layer types
   * and available paint and layout properties in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/layers).
   *
   * @param layer - The layer to add,
   * conforming to either the MapLibre Style Specification's [layer definition](https://maplibre.org/maplibre-style-spec/layers) or,
   * less commonly, the {@link CustomLayerInterface} specification. Can also be a layer definition with an embedded source definition.
   * The MapLibre Style Specification's layer definition is appropriate for most layers.
   *
   * @param beforeId - The ID of an existing layer to insert the new layer before,
   * resulting in the new layer appearing visually beneath the existing layer.
   * If this argument is not specified, the layer will be appended to the end of the layers array
   * and appear visually above all other layers.
   *
   * @example
   * Add a circle layer with a vector source
   * ```ts
   * map.addLayer({
   *   id: 'points-of-interest',
   *   source: {
   *     type: 'vector',
   *     url: 'https://demotiles.maplibre.org/tiles/tiles.json'
   *   },
   *   'source-layer': 'poi_label',
   *   type: 'circle',
   *   paint: {
   *     // MapLibre Style Specification paint properties
   *   },
   *   layout: {
   *     // MapLibre Style Specification layout properties
   *   }
   * });
   * ```
   *
   * @example
   * Define a source before using it to create a new layer
   * ```ts
   * map.addSource('state-data', {
   *   type: 'geojson',
   *   data: 'path/to/data.geojson'
   * });
   *
   * map.addLayer({
   *   id: 'states',
   *   // References the GeoJSON source defined above
   *   // and does not require a `source-layer`
   *   source: 'state-data',
   *   type: 'symbol',
   *   layout: {
   *     // Set the label content to the
   *     // feature's `name` property
   *     text-field: ['get', 'name']
   *   }
   * });
   * ```
   *
   * @example
   * Add a new symbol layer before an existing layer
   * ```ts
   * map.addLayer({
   *   id: 'states',
   *   // References a source that's already been defined
   *   source: 'state-data',
   *   type: 'symbol',
   *   layout: {
   *     // Set the label content to the
   *     // feature's `name` property
   *     text-field: ['get', 'name']
   *   }
   * // Add the layer before the existing `cities` layer
   * }, 'cities');
   * ```
   * @see [Create and style clusters](https://maplibre.org/maplibre-gl-js/docs/examples/create-and-style-clusters/)
   * @see [Add a vector tile source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-vector-tile-source/)
   * @see [Add a WMS source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-wms-source/)
   */
  addLayer(layer: AddLayerObject, beforeId?: string): this;
  /**
   * Moves a layer to a different z-position.
   *
   * @param id - The ID of the layer to move.
   * @param beforeId - The ID of an existing layer to insert the new layer before. When viewing the map, the `id` layer will appear beneath the `beforeId` layer. If `beforeId` is omitted, the layer will be appended to the end of the layers array and appear above all other layers on the map.
   *
   * @example
   * Move a layer with ID 'polygon' before the layer with ID 'country-label'. The `polygon` layer will appear beneath the `country-label` layer on the map.
   * ```ts
   * map.moveLayer('polygon', 'country-label');
   * ```
   */
  moveLayer(id: string, beforeId?: string): this;
  /**
   * Removes the layer with the given ID from the map's style.
   *
   * An {@link ErrorEvent} will be fired if no such layer exists.
   *
   * @param id - The ID of the layer to remove
   *
   * @example
   * If a layer with ID 'state-data' exists, remove it.
   * ```ts
   * if (map.getLayer('state-data')) map.removeLayer('state-data');
   * ```
   */
  removeLayer(id: string): this;
  /**
   * Returns the layer with the specified ID in the map's style.
   *
   * @param id - The ID of the layer to get.
   * @returns The layer with the specified ID, or `undefined`
   * if the ID corresponds to no existing layers.
   *
   * @example
   * ```ts
   * let stateDataLayer = map.getLayer('state-data');
   * ```
   * @see [Filter symbols by toggling a list](https://maplibre.org/maplibre-gl-js/docs/examples/filter-symbols-by-toggling-a-list/)
   * @see [Filter symbols by text input](https://maplibre.org/maplibre-gl-js/docs/examples/filter-symbols-by-text-input/)
   */
  getLayer(id: string): StyleLayer | undefined;
  /**
   * Return the ids of all layers currently in the style, including custom layers, in order.
   *
   * @returns ids of layers, in order
   *
   * @example
   * ```ts
   * const orderedLayerIds = map.getLayersOrder();
   * ```
   */
  getLayersOrder(): string[];
  /**
   * Sets the zoom extent for the specified style layer. The zoom extent includes the
   * [minimum zoom level](https://maplibre.org/maplibre-style-spec/layers/#minzoom)
   * and [maximum zoom level](https://maplibre.org/maplibre-style-spec/layers/#maxzoom))
   * at which the layer will be rendered.
   *
   * !!! note
   *     For style layers using vector sources, style layers cannot be rendered at zoom levels lower than the
   *     minimum zoom level of the _source layer_ because the data does not exist at those zoom levels. If the minimum
   *     zoom level of the source layer is higher than the minimum zoom level defined in the style layer, the style
   *     layer will not be rendered at all zoom levels in the zoom range.
   *
   * @param layerId - The ID of the layer to which the zoom extent will be applied.
   * @param minzoom - The minimum zoom to set (0-24).
   * @param maxzoom - The maximum zoom to set (0-24).
   *
   * @example
   * ```ts
   * map.setLayerZoomRange('my-layer', 2, 5);
   * ```
   */
  setLayerZoomRange(layerId: string, minzoom: number, maxzoom: number): this;
  /**
   * Sets the filter for the specified style layer.
   *
   * Filters control which features a style layer renders from its source.
   * Any feature for which the filter expression evaluates to `true` will be
   * rendered on the map. Those that are false will be hidden.
   *
   * Use `setFilter` to show a subset of your source data.
   *
   * To clear the filter, pass `null` or `undefined` as the second parameter.
   *
   * @param layerId - The ID of the layer to which the filter will be applied.
   * @param filter - The filter, conforming to the MapLibre Style Specification's
   * [filter definition](https://maplibre.org/maplibre-style-spec/layers/#filter).  If `null` or `undefined` is provided, the function removes any existing filter from the layer.
   * @param options - Options object.
   *
   * @example
   * Display only features with the 'name' property 'USA'
   * ```ts
   * map.setFilter('my-layer', ['==', ['get', 'name'], 'USA']);
   * ```
   * @example
   * Display only features with five or more 'available-spots'
   * ```ts
   * map.setFilter('bike-docks', ['>=', ['get', 'available-spots'], 5]);
   * ```
   * @example
   * Remove the filter for the 'bike-docks' style layer
   * ```ts
   * map.setFilter('bike-docks', null);
   * ```
   * @see [Create a timeline animation](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-time-slider/)
   */
  setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): this;
  /**
   * Returns the filter applied to the specified style layer.
   *
   * @param layerId - The ID of the style layer whose filter to get.
   * @returns The layer's filter.
   */
  getFilter(layerId: string): FilterSpecification | void;
  /**
   * Sets the value of a paint property in the specified style layer.
   *
   * @param layerId - The ID of the layer to set the paint property in.
   * @param name - The name of the paint property to set.
   * @param value - The value of the paint property to set.
   * Must be of a type appropriate for the property, as defined in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/).
   * Pass `null` to unset the existing value.
   * @param options - Options object.
   * @example
   * ```ts
   * map.setPaintProperty('my-layer', 'fill-color', '#faafee');
   * ```
   * @see [Change a layer's color with buttons](https://maplibre.org/maplibre-gl-js/docs/examples/change-a-layers-color-with-buttons/)
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  setPaintProperty<K extends keyof AllPaintProperties>(layerId: string, name: K, value: AllPaintProperties[K], options?: StyleSetterOptions): this;
  /**
   * Returns the value of a paint property in the specified style layer.
   *
   * @param layerId - The ID of the layer to get the paint property from.
   * @param name - The name of a paint property to get.
   * @returns The value of the specified paint property.
   */
  getPaintProperty<K extends keyof AllPaintProperties>(layerId: string, name: K): AllPaintProperties[K];
  /**
   * Sets the value of a layout property in the specified style layer.
   *
   * @param layerId - The ID of the layer to set the layout property in.
   * @param name - The name of the layout property to set.
   * @param value - The value of the layout property. Must be of a type appropriate for the property, as defined in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/).
   * @param options - The options object.
   * @example
   * ```ts
   * map.setLayoutProperty('my-layer', 'visibility', 'none');
   * ```
   */
  setLayoutProperty<K extends keyof AllLayoutProperties>(layerId: string, name: K, value: AllLayoutProperties[K], options?: StyleSetterOptions): this;
  /**
   * Returns the value of a layout property in the specified style layer.
   *
   * @param layerId - The ID of the layer to get the layout property from.
   * @param name - The name of the layout property to get.
   * @returns The value of the specified layout property.
   */
  getLayoutProperty<K extends keyof AllLayoutProperties>(layerId: string, name: K): AllLayoutProperties[K] | undefined;
  /**
   * Sets the value of the style's glyphs property. Pass a falsy value (null or undefined)
   * to unset glyphs.
   *
   * @param glyphsUrl - Glyph URL to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/glyphs/).
   * @param options - Options object.
   * @example
   * ```ts
   * map.setGlyphs('https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf');
   * ```
   */
  setGlyphs(glyphsUrl: string | null | undefined, options?: StyleSetterOptions): this;
  /**
   * Returns the value of the style's glyphs URL
   *
   * @returns glyphs Style's glyphs url, or `null` if glyphs are unset.
   */
  getGlyphs(): string | null;
  /**
   * Sets the value of the style's `font-faces` property, which points at the font files used to
   * draw text that the style's `glyphs` URL does not cover. Pass a falsy value (null or undefined)
   * to unset it.
   *
   * The files are handed to the browser's CSS Font Loading API, so any format the browser can
   * render text with may be used, and requests for them go through `transformRequest` as glyph
   * requests do. Text is drawn a grapheme cluster at a time, so a letter and the marks written on
   * it are handed to the browser's text engine together and come back as the one shape they are
   * written as -- which is what a `glyphs` URL, serving one codepoint at a time, cannot do.
   *
   * @param fontFaces - The font faces to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/root/#font-faces).
   * A declaration this cannot make sense of is skipped with a warning, as is a font file that
   * fails to load, so the text it would have drawn falls back to the `glyphs` URL.
   * @example
   * ```ts
   * map.setFontFaces({
   *     'Noto Sans Regular': [
   *         {url: 'https://example.com/NotoSansKhmer-Regular.ttf', 'unicode-range': ['U+1780-17FF']}
   *     ]
   * });
   * ```
   */
  setFontFaces(fontFaces: FontFacesSpecification | null | undefined): this;
  /**
   * Returns the value of the style's `font-faces` property.
   *
   * @returns The style's font faces, or `null` if it declares none.
   */
  getFontFaces(): FontFacesSpecification | null;
  /**
   * Adds a sprite to the map's style. Fires the `style` event.
   *
   * @param id - The ID of the sprite to add. Must not conflict with existing sprites.
   * @param url - The URL to load the sprite from
   * @param options - Options object.
   * @example
   * ```ts
   * map.addSprite('sprite-two', 'http://example.com/sprite-two');
   * ```
   */
  addSprite(id: string, url: string, options?: StyleSetterOptions): this;
  /**
   * Removes the sprite from the map's style. Fires the `style` event.
   *
   * @param id - The ID of the sprite to remove. If the sprite is declared as a single URL, the ID must be "default".
   * @example
   * ```ts
   * map.removeSprite('sprite-two');
   * map.removeSprite('default');
   * ```
   */
  removeSprite(id: string): this;
  /**
   * Returns the as-is value of the style's sprite.
   *
   * @returns style's sprite list of id-url pairs
   */
  getSprite(): Array<{
    id: string;
    url: string;
  }>;
  /**
   * Sets the value of the style's sprite property.
   *
   * @param spriteUrl - Sprite URL to set.
   * @param options - Options object.
   * @example
   * ```ts
   * map.setSprite('YOUR_SPRITE_URL');
   * ```
   */
  setSprite(spriteUrl: string | null, options?: StyleSetterOptions): this;
  /**
   * Sets the any combination of light values.
   *
   * @param light - Light properties to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/light).
   * @param options - Options object.
   *
   * @example
   * ```ts
   * let layerVisibility = map.getLayoutProperty('my-layer', 'visibility');
   * ```
   */
  setLight(light: LightSpecification, options?: StyleSetterOptions): this;
  /**
   * Returns the value of the light object.
   *
   * @returns light Light properties of the style.
   */
  getLight(): LightSpecification;
  /**
   * Sets the value of style's sky properties.
   *
   * @param sky - Sky properties to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/sky/).
   * @param options - Options object.
   *
   * @example
   * ```ts
   * map.setSky({'atmosphere-blend': 1.0});
   * ```
   */
  setSky(sky: SkySpecification, options?: StyleSetterOptions): this;
  /**
   * Returns the value of the style's sky.
   *
   * @returns the sky properties of the style.
   * @example
   * ```ts
   * map.getSky();
   * ```
   */
  getSky(): SkySpecification;
  /**
   * Sets the `state` of a feature.
   * A feature's `state` is a set of user-defined key-value pairs that are assigned to a feature at runtime.
   * When using this method, the `state` object is merged with any existing key-value pairs in the feature's state.
   * Features are identified by their `feature.id` attribute, which can be any number or string.
   *
   * This method can only be used with sources that have a `feature.id` attribute. The `feature.id` attribute can be defined in three ways:
   *
   * - For vector or GeoJSON sources, including an `id` attribute in the original data file.
   * - For vector or GeoJSON sources, using the [`promoteId`](https://maplibre.org/maplibre-style-spec/sources/#promoteid) option at the time the source is defined.
   * - For GeoJSON sources, using the [`generateId`](https://maplibre.org/maplibre-style-spec/sources/#generateid) option to auto-assign an `id` based on the feature's index in the source data. If you change feature data using `map.getSource('some id').setData(..)`, you may need to re-apply state taking into account updated `id` values.
   *
   * !!! note
   *     You can use the [`feature-state` expression](https://maplibre.org/maplibre-style-spec/expressions/#feature-state) to access the values in a feature's state object for the purposes of styling.
   *
   * @param feature - Feature identifier. Feature objects returned from
   * {@link Map.queryRenderedFeatures} or event handlers can be used as feature identifiers.
   * @param state - A set of key-value pairs. The values should be valid JSON types.
   *
   * @example
   * ```ts
   * // When the mouse moves over the `my-layer` layer, update
   * // the feature state for the feature under the mouse
   * map.on('mousemove', 'my-layer', (e) => {
   *   if (e.features.length > 0) {
   *     map.setFeatureState({
   *       source: 'my-source',
   *       sourceLayer: 'my-source-layer',
   *       id: e.features[0].id,
   *     }, {
   *       hover: true
   *     });
   *   }
   * });
   * ```
   * @see [Create a hover effect](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   */
  setFeatureState(feature: FeatureIdentifier, state: any): this;
  /**
   * Removes the `state` of a feature, setting it back to the default behavior.
   * If only a `target.source` is specified, it will remove the state for all features from that source.
   * If `target.id` is also specified, it will remove all keys for that feature's state.
   * If `key` is also specified, it removes only that key from that feature's state.
   * Features are identified by their `feature.id` attribute, which can be any number or string.
   *
   * @param target - Identifier of where to remove state. It can be a source, a feature, or a specific key of feature.
   * Feature objects returned from {@link Map.queryRenderedFeatures} or event handlers can be used as feature identifiers.
   * @param key - (optional) The key in the feature state to reset.
   * @example
   * Reset the entire state object for all features in the `my-source` source
   * ```ts
   * map.removeFeatureState({
   *   source: 'my-source'
   * });
   * ```
   *
   * @example
   * When the mouse leaves the `my-layer` layer,
   * reset the entire state object for the
   * feature under the mouse
   * ```ts
   * map.on('mouseleave', 'my-layer', (e) => {
   *   map.removeFeatureState({
   *     source: 'my-source',
   *     sourceLayer: 'my-source-layer',
   *     id: e.features[0].id
   *   });
   * });
   * ```
   *
   * @example
   * When the mouse leaves the `my-layer` layer,
   * reset only the `hover` key-value pair in the
   * state for the feature under the mouse
   * ```ts
   * map.on('mouseleave', 'my-layer', (e) => {
   *   map.removeFeatureState({
   *     source: 'my-source',
   *     sourceLayer: 'my-source-layer',
   *     id: e.features[0].id
   *   }, 'hover');
   * });
   * ```
   */
  removeFeatureState(target: FeatureIdentifier, key?: string): this;
  /**
   * Gets the `state` of a feature.
   * A feature's `state` is a set of user-defined key-value pairs that are assigned to a feature at runtime.
   * Features are identified by their `feature.id` attribute, which can be any number or string.
   *
   * !!! note
   *     To access the values in a feature's state object for the purposes of styling the feature, use the [`feature-state` expression](https://maplibre.org/maplibre-style-spec/expressions/#feature-state).
   *
   * @param feature - Feature identifier. Feature objects returned from
   * {@link Map.queryRenderedFeatures} or event handlers can be used as feature identifiers.
   * @returns The state of the feature: a set of key-value pairs that was assigned to the feature at runtime.
   *
   * @example
   * When the mouse moves over the `my-layer` layer,
   * get the feature state for the feature under the mouse
   * ```ts
   * map.on('mousemove', 'my-layer', (e) => {
   *   if (e.features.length > 0) {
   *     map.getFeatureState({
   *       source: 'my-source',
   *       sourceLayer: 'my-source-layer',
   *       id: e.features[0].id
   *     });
   *   }
   * });
   * ```
   */
  getFeatureState(feature: FeatureIdentifier): any;
  /**
   * Returns the map's containing HTML element.
   *
   * @returns The map's container.
   */
  getContainer(): HTMLElement;
  /**
   * Returns the HTML element containing the map's `<canvas>` element.
   *
   * If you want to add non-GL overlays to the map, you should append them to this element.
   *
   * This is the element to which event bindings for map interactivity (such as panning and zooming) are
   * attached. It will receive bubbled events from child elements such as the `<canvas>`, but not from
   * map controls.
   *
   * @returns The container of the map's `<canvas>`.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  getCanvasContainer(): HTMLElement;
  /**
   * Returns the map's `<canvas>` element.
   *
   * @returns The map's `<canvas>` element.
   * @see [Measure distances](https://maplibre.org/maplibre-gl-js/docs/examples/measure-distances/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   */
  getCanvas(): HTMLCanvasElement;
  /**
   * @internal
   * The viewport in whole CSS pixels, shared by the canvas, the painter and the transform.
   */
  _containerDimensions(): number[];
  /**
   * Determines if the initial resize event should be handled based on the container's dimensions.
   *
   * @returns `true` if the initial resize event should be handled, `false` otherwise.
   */
  _shouldHandleInitialResize(): boolean;
  /**
   * @internal
   * Sets up the ResizeObserver to track container size changes.
   * Uses the owning window's ResizeObserver for cross-window support.
   */
  private _setupResizeObserver;
  /**
   * @internal
   * Resolves the container option to an HTMLElement.
   * Supports string ID, HTMLElement, or cross-window elements (using nodeType check).
   */
  private _resolveContainer;
  _setupContainer(): void;
  /**
   * @internal
   * Reverses the DOM mutations of {@link Map._setupContainer}, returning the container element to its pre-construction state.
   */
  _cleanupContainer(): void;
  /**
   * @internal
   * Sizes the backing store to whole device pixels and the CSS box to cover exactly that many, so
   * the compositor never rescales the canvas. A pixel ratio can sit a fraction below a whole
   * number, where truncating the count would cost a whole pixel per axis.
   */
  _resizeCanvas(width: number, height: number, pixelRatio: number): void;
  /**
   * @internal
   * Creates the WebGL2 context and the painter. Throws {@link GPUInitializationError} when the context cannot be created.
   */
  _setupPainter(): void;
  /**
   * @internal
   * Creates a new specialized transform instance from a projection instance and migrates
   * to this new transform, carrying over all the properties of the old transform (center, pitch, etc.).
   * When the style's projection is changed (or first set), this function should be called.
   */
  migrateProjection(newTransform: ITransform, newCameraHelper: ICameraHelper): void;
  _contextLost: (event: WebGLContextEvent) => void;
  _contextRestored: (event: WebGLContextEvent) => void;
  _onMapScroll: (event: UIEvent) => boolean;
  /**
   * Returns a Boolean indicating whether the map is fully loaded.
   *
   * Returns `false` if the style is not yet fully loaded,
   * or if there has been a change to the sources or style that
   * has not yet fully loaded.
   *
   * @returns A Boolean indicating whether the map is fully loaded.
   */
  loaded(): boolean;
  /**
   * @internal
   * Update this map's style and sources, and re-render the map.
   *
   * @param updateStyle - mark the map's style for reprocessing as
   * well as its sources
   */
  _update(updateStyle?: boolean): this;
  /**
   * @internal
   * Request that the given callback be executed during the next render
   * frame.  Schedule a render frame if one is not already scheduled.
   *
   * @returns An id that can be used to cancel the callback
   */
  _requestRenderFrame(callback: () => void): TaskID;
  _cancelRenderFrame(id: TaskID): void;
  /**
   * @internal
   * Call when a (re-)render of the map is required:
   *
   * - The style has changed (`setPaintProperty()`, etc.)
   * - Source data has changed (e.g. tiles have finished loading)
   * - The map has is moving (or just finished moving)
   * - A transition is in progress
   *
   * @param paintStartTimeStamp - The time when the animation frame began executing.
   */
  _render(paintStartTimeStamp: number): this;
  /**
   * Force a synchronous redraw of the map.
   * @example
   * ```ts
   * map.redraw();
   * ```
   */
  redraw(): this;
  /**
   * Clean up and release all internal resources associated with this map.
   *
   * This includes DOM elements, event bindings, web workers, and WebGL resources.
   *
   * Use this method when you are done using the map and wish to ensure that it no
   * longer consumes browser resources. Afterwards, you must not call any other
   * methods on the map.
   */
  remove(): void;
  /**
   * Trigger the rendering of a single frame. Use this method with custom layers to
   * repaint the map when the layer changes. Calling this multiple times before the
   * next frame is rendered will still result in only a single frame being rendered.
   * @example
   * ```ts
   * map.triggerRepaint();
   * ```
   * @see [Add 3D Tiles, 3D objects and models using Three.js](https://maplibre.org/maplibre-gl-js/docs/examples/add-3d-tiles-3d-objects-and-models-using-threejs/)
   * @see [Add an animated icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-animated-icon-to-the-map/)
   */
  triggerRepaint(): void;
  /**
   * @internal
   * A tile that fails to load fires an error event and no data event, so when it was the last tile loading,
   * no frame would run to fire `load` and `idle`.
   */
  _onStyleError: (event: ErrorEvent & {
    tile?: unknown;
  }) => void;
  _onWindowOnline: () => void;
  /**
   * Gets and sets a Boolean indicating whether the map will render an outline
   * around each tile and the tile ID. These tile boundaries are useful for
   * debugging.
   *
   * The uncompressed file size of the first vector source is drawn in the top left
   * corner of each tile, next to the tile ID.
   *
   * @example
   * ```ts
   * map.showTileBoundaries = true;
   * ```
   */
  get showTileBoundaries(): boolean;
  set showTileBoundaries(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map will visualize
   * the padding offsets.
   */
  get showPadding(): boolean;
  set showPadding(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map will render boxes
   * around all symbols in the data source, revealing which symbols
   * were rendered or which were hidden due to collisions.
   * This information is useful for debugging.
   */
  get showCollisionBoxes(): boolean;
  set showCollisionBoxes(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map should color-code
   * each fragment to show how many times it has been shaded.
   * White fragments have been shaded 8 or more times.
   * Black fragments have been shaded 0 times.
   * This information is useful for debugging.
   */
  get showOverdrawInspector(): boolean;
  set showOverdrawInspector(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map will
   * continuously repaint. This information is useful for analyzing performance.
   */
  get repaint(): boolean;
  set repaint(value: boolean);
  get vertices(): boolean;
  set vertices(value: boolean);
  /**
   * Returns the package version of the library
   * @returns Package version of the library
   */
  get version(): string;
  /**
   * Returns the elevation for the point where the camera is looking.
   * This value corresponds to:
   * "meters above sea level" * "exaggeration"
   * @returns The elevation.
   */
  getCameraTargetElevation(): number;
  /**
   * Gets the {@link ProjectionSpecification}.
   * @returns the projection specification.
   * @example
   * ```ts
   * let projection = map.getProjection();
   * ```
   */
  getProjection(): ProjectionSpecification;
  /**
   * Sets the {@link ProjectionSpecification}.
   * @param projection - the projection specification to set
   * @returns
   */
  setProjection(projection: ProjectionSpecification): this;
}
//#endregion
//#region src/ui/control/navigation_control.d.ts
/**
 * The {@link NavigationControl} options object
 */
type NavigationControlOptions = {
  /**
   * If `true` the compass button is included.
   */
  showCompass?: boolean;
  /**
   * If `true` the zoom-in and zoom-out buttons are included.
   */
  showZoom?: boolean;
  /**
   * If `true` the pitch is visualized by rotating X-axis of compass.
   */
  visualizePitch?: boolean;
  /**
   * If `true` the roll is visualized by rotating the compass.
   */
  visualizeRoll?: boolean;
};
/**
 * A `NavigationControl` control contains zoom buttons and a compass.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let nav = new NavigationControl();
 * map.addControl(nav, 'top-left');
 * ```
 * @see [Display map navigation controls](https://maplibre.org/maplibre-gl-js/docs/examples/display-map-navigation-controls/)
 */
export declare class NavigationControl implements IControl {
  _map: Map$1;
  options: NavigationControlOptions;
  _container: HTMLElement;
  _zoomInButton: HTMLButtonElement;
  _zoomOutButton: HTMLButtonElement;
  _compass: HTMLButtonElement;
  _compassIcon: HTMLElement;
  _handler: MouseRotateWrapper;
  /**
   * @param options - the control's options
   */
  constructor(options?: NavigationControlOptions);
  _updateZoomButtons: () => void;
  _rotateCompassArrow: () => void;
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  _createButton(className: string, fn: (e?: MouseEvent) => unknown): HTMLButtonElement;
  _setButtonTitle: (button: HTMLButtonElement, title: "ZoomIn" | "ZoomOut" | "ResetBearing") => void;
}
declare class MouseRotateWrapper {
  map: Map$1;
  _clickTolerance: number;
  element: HTMLElement;
  _rotatePitchHandler: DragMoveHandler<DragRotateResult, MouseEvent | TouchEvent>;
  _startPos: Point$1;
  _lastPos: Point$1;
  constructor(map: Map$1, element: HTMLElement, pitch?: boolean);
  startMove(e: MouseEvent | TouchEvent, point: Point$1): void;
  move(e: MouseEvent | TouchEvent, point: Point$1): void;
  off(): void;
  offTemp(): void;
  mousedown: (e: MouseEvent) => void;
  mousemove: (e: MouseEvent) => void;
  mouseup: (e: MouseEvent) => void;
  touchstart: (e: TouchEvent) => void;
  touchmove: (e: TouchEvent) => void;
  touchend: (e: TouchEvent) => void;
  reset: () => void;
}
//#endregion
//#region src/ui/anchor.d.ts
/**
 * Where to position the anchor.
 * Used by a popup and a marker.
 */
type PositionAnchor = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
//#endregion
//#region src/ui/popup.d.ts
/**
 * A pixel offset specified as:
 *
 * - A single number specifying a distance from the location
 * - A {@link PointLike} specifying a constant offset
 * - An object of {@link PointLike}s specifying an offset for each anchor position
 *
 * Negative offsets indicate left and up.
 */
type Offset = number | PointLike | { [_ in PositionAnchor]: PointLike; };
/**
 * The {@link Popup} options object
 */
type PopupOptions = {
  /**
   * If `true`, a close button will appear in the top right corner of the popup.
   * @defaultValue true
   */
  closeButton?: boolean;
  /**
   * If `true`, the popup will closed when the map is clicked.
   * @defaultValue true
   */
  closeOnClick?: boolean;
  /**
   * If `true`, the popup will closed when the map moves.
   * @defaultValue false
   */
  closeOnMove?: boolean;
  /**
   * If `true`, the popup will try to focus the first focusable element inside the popup.
   * @defaultValue true
   */
  focusAfterOpen?: boolean;
  /**
   * A string indicating the part of the Popup that should
   * be positioned closest to the coordinate set via {@link Popup.setLngLat}.
   * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`,
   * `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset the anchor will be
   * dynamically set to ensure the popup falls within the map container with a preference
   * for `'bottom'`.
   */
  anchor?: PositionAnchor;
  /**
   * A pixel offset applied to the popup's location
   */
  offset?: Offset;
  /**
   * Space-separated CSS class names to add to popup container
   */
  className?: string;
  /**
   * A string that sets the CSS property of the popup's maximum width, eg `'300px'`.
   * To ensure the popup resizes to fit its content, set this property to `'none'`.
   * Available values can be found here: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
   * @defaultValue '240px'
   */
  maxWidth?: string;
  /**
   * If `true`, rounding is disabled for placement of the popup, allowing for
   * subpixel positioning and smoother movement when the popup is translated.
   * @defaultValue false
   */
  subpixelPositioning?: boolean;
  /**
   * Optional opacity when the location is behind the globe.
   * Note that if a number is provided, it will be converted to a string.
   * @defaultValue undefined
   */
  locationOccludedOpacity?: number | string;
  /**
   * A pixel padding applied to the popup's positioning constraints.
   * The popup will be positioned to avoid being placed within this padding area
   * from the edges of the map container.
   * @defaultValue undefined
   */
  padding?: PaddingOptions;
};
/**
 * The event class for popup events (`open` and `close`).
 *
 * @group Event Related
 */
export declare class PopupEvent extends Event$1 {
  type: keyof PopupEventType;
  /**
   * The `Popup` object that fired the event.
   */
  target: Popup;
}
/**
 * `PopupEventType` - a mapping between the popup event name and the event value.
 * These events are used with the {@link Popup.on} method.
 *
 * @group Event Related
 */
type PopupEventType = {
  /**
   * Fired when the popup is opened manually or programmatically.
   */
  open: PopupEvent;
  /**
   * Fired when the popup is closed manually or programmatically.
   */
  close: PopupEvent;
};
/**
 * A popup component.
 *
 * @group Markers and Controls
 *
 *
 * @example
 * Create a popup
 * ```ts
 * let popup = new Popup();
 * // Set an event listener that will fire
 * // any time the popup is opened
 * popup.on('open', () => {
 *   console.log('popup was opened');
 * });
 * ```
 *
 * @example
 * Create a popup
 * ```ts
 * let popup = new Popup();
 * // Set an event listener that will fire
 * // any time the popup is closed
 * popup.on('close', () => {
 *   console.log('popup was closed');
 * });
 * ```
 *
 * @example
 * ```ts
 * let markerHeight = 50, markerRadius = 10, linearOffset = 25;
 * let popupOffsets = {
 *  'top': [0, 0],
 *  'top-left': [0,0],
 *  'top-right': [0,0],
 *  'bottom': [0, -markerHeight],
 *  'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 *  'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 *  'left': [markerRadius, (markerHeight - markerRadius) * -1],
 *  'right': [-markerRadius, (markerHeight - markerRadius) * -1]
 *  };
 * let popup = new Popup({offset: popupOffsets, className: 'my-class'})
 *   .setLngLat(e.lngLat)
 *   .setHTML("<h1>Hello World!</h1>")
 *   .setMaxWidth("300px")
 *   .addTo(map);
 * ```
 * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup/)
 * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
 * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
 * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/attach-a-popup-to-a-marker-instance/)
 * @see [Show polygon information on click](https://maplibre.org/maplibre-gl-js/docs/examples/show-polygon-information-on-click/)
 *
 * ## Events
 *
 * **Event** `open` of type {@link PopupEvent} will be fired when the popup is opened manually or programmatically.
 *
 * **Event** `close` of type {@link PopupEvent} will be fired when the popup is closed manually or programmatically.
 */
export declare class Popup extends Evented<PopupEventType> {
  _map: Map$1;
  options: PopupOptions;
  _content: HTMLElement;
  _container: HTMLElement;
  _closeButton: HTMLButtonElement;
  _tip: HTMLElement;
  _lngLat: LngLat;
  _trackPointer: boolean;
  _pos: Point$1;
  _flatPos: Point$1;
  /**
   * @param options - the options
   */
  constructor(options?: PopupOptions);
  /**
   * Adds the popup to a map.
   *
   * @param map - The MapLibre GL JS map to add the popup to.
   * @example
   * ```ts
   * new Popup()
   *   .setLngLat([0, 0])
   *   .setHTML("<h1>Null Island</h1>")
   *   .addTo(map);
   * ```
   * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   * @see [Show polygon information on click](https://maplibre.org/maplibre-gl-js/docs/examples/show-polygon-information-on-click/)
   */
  addTo(map: Map$1): this;
  /**
   * Add opacity to popup if in globe projection and location is behind view
   */
  _updateOpacity: () => void;
  /**
   * @returns `true` if the popup is open, `false` if it is closed.
   */
  isOpen(): boolean;
  /**
   * Removes the popup from the map it has been added to.
   *
   * @example
   * ```ts
   * let popup = new Popup().addTo(map);
   * popup.remove();
   * ```
   */
  remove: () => this;
  /**
   * Returns the geographical location of the popup's anchor.
   *
   * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
   * set by `setLngLat` because `Popup` wraps the anchor longitude across copies of the world to keep
   * the popup on screen.
   *
   * @returns The geographical location of the popup's anchor.
   */
  getLngLat(): LngLat;
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it. Replaces trackPointer() behavior.
   *
   * @param lnglat - The geographical location to set as the popup's anchor.
   */
  setLngLat(lnglat: LngLatLike): this;
  /**
   * Tracks the popup anchor to the cursor position on screens with a pointer device (it will be hidden on touchscreens). Replaces the `setLngLat` behavior.
   * For most use cases, set `closeOnClick` and `closeButton` to `false`.
   * @example
   * ```ts
   * let popup = new Popup({ closeOnClick: false, closeButton: false })
   *   .setHTML("<h1>Hello World!</h1>")
   *   .trackPointer()
   *   .addTo(map);
   * ```
   */
  trackPointer(): this;
  /**
   * Returns the `Popup`'s HTML element.
   * @example
   * Change the `Popup` element's font size
   * ```ts
   * let popup = new Popup()
   *   .setLngLat([-96, 37.8])
   *   .setHTML("<p>Hello World!</p>")
   *   .addTo(map);
   * let popupElem = popup.getElement();
   * popupElem.style.fontSize = "25px";
   * ```
   * @returns element
   */
  getElement(): HTMLElement;
  /**
   * Sets the popup's content to a string of text.
   *
   * This function creates a [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) node in the DOM,
   * so it cannot insert raw HTML. Use this method for security against XSS
   * if the popup content is user-provided.
   *
   * @param text - Textual content for the popup.
   * @example
   * ```ts
   * let popup = new Popup()
   *   .setLngLat(e.lngLat)
   *   .setText('Hello, world!')
   *   .addTo(map);
   * ```
   */
  setText(text: string): this;
  /**
   * Sets the popup's content to the HTML provided as a string.
   *
   * This method does not perform HTML filtering or sanitization, and must be
   * used only with trusted content. Consider {@link Popup.setText} if
   * the content is an untrusted text string.
   *
   * @param html - A string representing HTML content for the popup.
   * @example
   * ```ts
   * let popup = new Popup()
   *   .setLngLat(e.lngLat)
   *   .setHTML("<h1>Hello World!</h1>")
   *   .addTo(map);
   * ```
   * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/attach-a-popup-to-a-marker-instance/)
   */
  setHTML(html: string): this;
  /**
   * Returns the popup's maximum width.
   *
   * @returns The maximum width of the popup.
   */
  getMaxWidth(): string;
  /**
   * Sets the popup's maximum width. This is setting the CSS property `max-width`.
   * Available values can be found here: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
   *
   * @param maxWidth - A string representing the value for the maximum width.
   */
  setMaxWidth(maxWidth: string): this;
  /**
   * Sets the popup's content to the element provided as a DOM node.
   *
   * @param htmlNode - A DOM node to be used as content for the popup.
   * @example
   * Create an element with the popup content
   * ```ts
   * let div = document.createElement('div');
   * div.innerHTML = 'Hello, world!';
   * let popup = new Popup()
   *   .setLngLat(e.lngLat)
   *   .setDOMContent(div)
   *   .addTo(map);
   * ```
   */
  setDOMContent(htmlNode: Node): this;
  /**
   * Adds a CSS class to the popup container element.
   *
   * @param className - Non-empty string with CSS class name to add to popup container
   *
   * @example
   * ```ts
   * let popup = new Popup()
   * popup.addClassName('some-class')
   * ```
   */
  addClassName(className: string): this;
  /**
   * Removes a CSS class from the popup container element.
   *
   * @param className - Non-empty string with CSS class name to remove from popup container
   *
   * @example
   * ```ts
   * let popup = new Popup()
   * popup.removeClassName('some-class')
   * ```
   */
  removeClassName(className: string): this;
  /**
   * Sets the popup's offset.
   *
   * @param offset - Sets the popup's offset.
   */
  setOffset(offset?: Offset): this;
  /**
   * Add or remove the given CSS class on the popup container, depending on whether the container currently has that class.
   *
   * @param className - Non-empty string with CSS class name to add/remove
   *
   * @returns if the class was removed return false, if class was added, then return true, undefined if there is no container
   *
   * @example
   * ```ts
   * let popup = new Popup()
   * popup.toggleClassName('toggleClass')
   * ```
   */
  toggleClassName(className: string): boolean | undefined;
  /**
   * Set the option to allow subpixel positioning of the popup by passing a boolean
   *
   * @param value - When boolean is true, subpixel positioning is enabled for the popup.
   *
   * @example
   * ```ts
   * let popup = new Popup()
   * popup.setSubpixelPositioning(true);
   * ```
   */
  setSubpixelPositioning(value: boolean): void;
  /**
   * Sets the popup's padding constraints for positioning.
   *
   * @param padding - The padding to apply as a {@link PaddingOptions} object.
   * @example
   * ```ts
   * popup.setPadding({ top: 10, right: 20, bottom: 30, left: 40 });
   * ```
   */
  setPadding(padding?: PaddingOptions): void;
  _createCloseButton(): void;
  _update: (event?: MapLibreEvent | MapMouseEvent) => void;
  _focusFirstElement(): void;
  _onClose: () => void;
}
//#endregion
//#region src/ui/marker.d.ts
/**
 * Alignment options of rotation and pitch
 */
type Alignment = "map" | "viewport" | "auto";
/**
 * The {@link Marker} options object
 */
type MarkerOptions = {
  /**
   * DOM element to use as a marker. The default is a light blue, droplet-shaped SVG marker.
   */
  element?: HTMLElement;
  /**
   * Space-separated CSS class names to add to marker element.
   */
  className?: string;
  /**
   * The offset in pixels as a {@link PointLike} object to apply relative to the element's center. Negatives indicate left and up.
   */
  offset?: PointLike;
  /**
   * A string indicating the part of the Marker that should be positioned closest to the coordinate set via {@link Marker.setLngLat}.
   * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`.
   * @defaultValue 'center'
   * */
  anchor?: PositionAnchor;
  /**
   * The color to use for the default marker if options.element is not provided. The default is light blue.
   * @defaultValue '#3FB1CE'
   */
  color?: string;
  /**
   * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of `41px` and a width of `27px`.
   * @defaultValue 1
   */
  scale?: number;
  /**
   * A boolean indicating whether or not a marker is able to be dragged to a new position on the map.
   * A draggable default marker also becomes keyboard focusable and, while focused, moves by
   * 1 screen pixel per arrow-key press (10 with Shift), firing the same `dragstart`/`drag`/`dragend`
   * events as pointer dragging. Markers with a custom `element` keep their focusability and
   * keyboard behavior application-owned.
   * @defaultValue false
   */
  draggable?: boolean;
  /**
   * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance.
   * @defaultValue 0
   */
  clickTolerance?: number;
  /**
   * The rotation angle of the marker in degrees, relative to its respective `rotationAlignment` setting. A positive value will rotate the marker clockwise.
   * @defaultValue 0
   */
  rotation?: number;
  /**
   * `map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations. `auto` is equivalent to `viewport`.
   * @defaultValue 'auto'
   */
  rotationAlignment?: Alignment;
  /**
   * `map` aligns the `Marker` to the plane of the map. `viewport` aligns the `Marker` to the plane of the viewport. `auto` automatically matches the value of `rotationAlignment`.
   * @defaultValue 'auto'
   */
  pitchAlignment?: Alignment;
  /**
   * Marker's opacity when it's in clear view (not behind 3d terrain)
   * Accepts any valid CSS opacity value as a number or string.
   * @defaultValue 1
   */
  opacity?: string | number;
  /**
   * Marker's opacity when it's behind 3d terrain
   * Accepts any valid CSS opacity value as a number or string.
   * @defaultValue 0.2
   */
  opacityWhenCovered?: string | number;
  /**
   * If `true`, rounding is disabled for placement of the marker, allowing for
   * subpixel positioning and smoother movement when the marker is translated.
   * @defaultValue false
   */
  subpixelPositioning?: boolean;
};
/**
 * The event class for marker drag events (`dragstart`, `drag` and `dragend`).
 *
 * @group Event Related
 */
export declare class MarkerDragEvent extends Event$1 {
  type: "dragstart" | "drag" | "dragend";
  /**
   * The `Marker` object that fired the event.
   */
  target: Marker;
}
/**
 * The event class for the marker `click` event.
 *
 * @group Event Related
 */
export declare class MarkerClickEvent extends Event$1 {
  type: "click";
  /**
   * The `Marker` object that fired the event.
   */
  target: Marker;
  /**
   * The DOM event which caused the marker click event.
   */
  originalEvent: MouseEvent;
}
/**
 * `MarkerEventType` - a mapping between the marker event name and the event value.
 * These events are used with the {@link Marker.on} method.
 *
 * @group Event Related
 */
type MarkerEventType = {
  /**
   * Fired when dragging starts.
   */
  dragstart: MarkerDragEvent;
  /**
   * Fired while dragging.
   */
  drag: MarkerDragEvent;
  /**
   * Fired when the marker is finished being dragged.
   */
  dragend: MarkerDragEvent;
  /**
   * Fired when the marker is clicked.
   */
  click: MarkerClickEvent;
};
/**
 * Creates a marker component
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let marker = new Marker()
 *   .setLngLat([30.5, 50.5])
 *   .addTo(map);
 * ```
 *
 * @example
 * Set options
 * ```ts
 * let marker = new Marker({
 *     color: "#FFFFFF",
 *     draggable: true
 *   }).setLngLat([30.5, 50.5])
 *   .addTo(map);
 * ```
 * @see [Add a default marker](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-default-marker/)
 * @see [Add custom icons with Markers](https://maplibre.org/maplibre-gl-js/docs/examples/add-custom-icons-with-markers/)
 * @see [Create a draggable Marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-marker/)
 * @see [Animate a marker](https://maplibre.org/maplibre-gl-js/docs/examples/animate-a-marker/)
 * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/attach-a-popup-to-a-marker-instance/)
 *
 * ## Events
 *
 * **Event** `dragstart` of type {@link MarkerDragEvent} will be fired when dragging starts.
 *
 * **Event** `drag` of type {@link MarkerDragEvent} will be fired while dragging.
 *
 * **Event** `dragend` of type {@link MarkerDragEvent} will be fired when the marker is finished being dragged.
 *
 * **Event** `click` of type {@link MarkerClickEvent} will be fired when the marker is clicked.
 *
 * ## CSS Classes
 *
 * **CSS class** `maplibregl-marker-covered` is toggled on the marker element when the marker
 * is hidden behind 3D terrain or on the back of a globe.
 * Use this class to apply custom styles to covered markers.
 *
 * @example
 * ```css
 * .maplibregl-marker-covered {
 *     pointer-events: none;
 *     cursor: default;
 * }
 * ```
 */
export declare class Marker extends Evented<MarkerEventType> {
  _map: Map$1;
  _anchor: PositionAnchor;
  _offset: Point$1;
  _element: HTMLElement;
  _popup: Popup;
  _lngLat: LngLat;
  _pos: Point$1;
  _flatPos: Point$1;
  _color: string;
  _scale: number;
  _defaultMarker: boolean;
  _draggable: boolean;
  _clickTolerance: number;
  _isDragging: boolean;
  _state: "inactive" | "pending" | "active";
  _positionDelta: Point$1;
  _pointerdownPos: Point$1;
  _rotation: number;
  _pitchAlignment: Alignment;
  _rotationAlignment: Alignment;
  _opacity: string;
  _opacityWhenCovered: string;
  _subpixelPositioning: boolean;
  _roleManaged: boolean;
  _tabIndexManaged: boolean;
  _keyboardDragActive: boolean;
  /**
   * @param options - the options
   */
  constructor(options?: MarkerOptions);
  /**
   * Attaches the `Marker` to a `Map` object.
   * @param map - The MapLibre GL JS map to add the marker to.
   * @example
   * ```ts
   * let marker = new Marker()
   *   .setLngLat([30.5, 50.5])
   *   .addTo(map); // add the marker to the map
   * ```
   */
  addTo(map: Map$1): this;
  /**
   * Removes the marker from a map
   * @example
   * ```ts
   * let marker = new Marker().addTo(map);
   * marker.remove();
   * ```
   */
  remove(): this;
  /**
   * Get the marker's geographical location.
   *
   * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
   * set by `setLngLat` because `Marker` wraps the anchor longitude across copies of the world to keep
   * the marker on screen.
   *
   * @returns A {@link LngLat} describing the marker's location.
   * @example
   * ```ts
   * // Store the marker's longitude and latitude coordinates in a variable
   * let lngLat = marker.getLngLat();
   * // Print the marker's longitude and latitude values in the console
   * console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )
   * ```
   * @see [Create a draggable Marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-marker/)
   */
  getLngLat(): LngLat;
  /**
   * Set the marker's geographical position and move it.
   * @param lnglat - A {@link LngLat} describing where the marker should be located.
   * @example
   * Create a new marker, set the longitude and latitude, and add it to the map
   * ```ts
   * new Marker()
   *   .setLngLat([-65.017, -16.457])
   *   .addTo(map);
   * ```
   * @see [Add custom icons with Markers](https://maplibre.org/maplibre-gl-js/docs/examples/add-custom-icons-with-markers/)
   * @see [Create a draggable Marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-marker/)
   */
  setLngLat(lnglat: LngLatLike): this;
  /**
   * Returns the `Marker`'s HTML element.
   * @returns element
   */
  getElement(): HTMLElement;
  /**
   * Binds a {@link Popup} to the {@link Marker}.
   * @param popup - An instance of the {@link Popup} class. If undefined or null, any popup
   * set on this {@link Marker} instance is unset.
   * @example
   * ```ts
   * let marker = new Marker()
   *  .setLngLat([0, 0])
   *  .setPopup(new Popup().setHTML("<h1>Hello World!</h1>")) // add popup
   *  .addTo(map);
   * ```
   * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/attach-a-popup-to-a-marker-instance/)
   */
  setPopup(popup?: Popup | null): this;
  /**
   * Set the option to allow subpixel positioning of the marker by passing a boolean
   *
   * @param value - when set to `true`, subpixel positioning is enabled for the marker.
   *
   * @example
   * ```ts
   * let marker = new Marker()
   * marker.setSubpixelPositioning(true);
   * ```
   */
  setSubpixelPositioning(value: boolean): this;
  _onClick: (e: MouseEvent) => void;
  _onKeyPress: (e: KeyboardEvent) => void;
  /**
   * Move a focused draggable default marker with the arrow keys
   * (1 screen pixel per keydown; 10 with Shift).
   * Mirrors the pointer drag gesture: the position updates before `dragstart`
   * fires on the first movement, every movement fires `drag`, and releasing
   * the arrow key (or losing focus) fires `dragend`. Holding a key down
   * produces repeated `drag` events within a single gesture.
   */
  _onKeyDown: (e: KeyboardEvent) => void;
  _onKeyUp: (e: KeyboardEvent) => void;
  _onBlur: () => void;
  _endKeyboardDrag(): void;
  _onMapClick: (e: MapMouseEvent) => void;
  /**
   * Returns the {@link Popup} instance that is bound to the {@link Marker}.
   * @returns popup
   * @example
   * ```ts
   * let marker = new Marker()
   *  .setLngLat([0, 0])
   *  .setPopup(new Popup().setHTML("<h1>Hello World!</h1>"))
   *  .addTo(map);
   *
   * console.log(marker.getPopup()); // return the popup instance
   * ```
   */
  getPopup(): Popup;
  /**
   * Opens or closes the {@link Popup} instance that is bound to the {@link Marker}, depending on the current state of the {@link Popup}.
   * @example
   * ```ts
   * let marker = new Marker()
   *  .setLngLat([0, 0])
   *  .setPopup(new Popup().setHTML("<h1>Hello World!</h1>"))
   *  .addTo(map);
   *
   * marker.togglePopup(); // toggle popup open or closed
   * ```
   */
  togglePopup(): this;
  _updateOpacity(): void;
  /**
   * @internal
   * Whether the viewport shows the marker's position. There is nothing to compute for one it does not.
   */
  _isInViewport(): boolean;
  /**
   * @internal
   * Applies `opacityWhenCovered` and the covered class while the terrain covers the marker, closing its popup;
   * `_updateCovered` runs it at most once per 100 ms. Nothing to do once the marker, the terrain or the viewport's
   * view of the marker is gone.
   */
  _updateCoveredUnthrottled: () => void;
  /**
   * @internal
   * The terrain check, at most once per 100 ms while the map moves; the last call in a window runs when the window closes.
   */
  _updateCovered: () => ReturnType<typeof setTimeout>;
  /**
   * @internal
   * Whether the terrain covers the marker's center: the location raised by the height `offset` lifts the element
   * above it on screen, or the location itself when the offset lowers the element.
   */
  _isCovered(terrain: Terrain): boolean;
  /**
   * @internal
   * Positions the marker and updates its opacity. As terrain tiles load, the map can adjust to the ground beneath
   * its center without firing a `move` event. The `idle` event triggers a final marker update once the map has
   * finished loading and rendering.
   */
  _update: (e?: {
    type: "move" | "moveend" | "terrain" | "projectiontransition" | "idle";
  }) => void;
  /**
   * Get the marker's offset.
   * @returns The marker's screen coordinates in pixels.
   */
  getOffset(): Point$1;
  /**
   * Sets the offset of the marker
   * @param offset - The offset in pixels as a {@link PointLike} object to apply relative to the element's center. Negatives indicate left and up.
   */
  setOffset(offset: PointLike): this;
  /**
   * Adds a CSS class to the marker element.
   *
   * @param className - on-empty string with CSS class name to add to marker element
   *
   * @example
   * ```
   * let marker = new Marker()
   * marker.addClassName('some-class')
   * ```
   */
  addClassName(className: string): void;
  /**
   * Removes a CSS class from the marker element.
   *
   * @param className - Non-empty string with CSS class name to remove from marker element
   *
   * @example
   * ```ts
   * let marker = new Marker()
   * marker.removeClassName('some-class')
   * ```
   */
  removeClassName(className: string): void;
  /**
   * Add or remove the given CSS class on the marker element, depending on whether the element currently has that class.
   *
   * @param className - Non-empty string with CSS class name to add/remove
   *
   * @returns if the class was removed return false, if class was added, then return true
   *
   * @example
   * ```ts
   * let marker = new Marker()
   * marker.toggleClassName('toggleClass')
   * ```
   */
  toggleClassName(className: string): boolean;
  _onMove: (e: MapMouseEvent | MapTouchEvent) => void;
  _onUp: () => void;
  _addDragHandler: (e: MapMouseEvent | MapTouchEvent) => void;
  /**
   * Sets the `draggable` property and functionality of the marker.
   * A draggable default marker is also keyboard focusable and movable with the
   * arrow keys (see {@link MarkerOptions.draggable}); custom marker elements keep
   * their focusability and keyboard behavior application-owned.
   * @param shouldBeDraggable - Turns drag functionality on/off
   */
  setDraggable(shouldBeDraggable?: boolean): this;
  /**
   * Returns true if the marker can be dragged
   * @returns True if the marker is draggable.
   */
  isDraggable(): boolean;
  /**
   * Keep the marker element focusable while it has built-in keyboard behavior.
   * A popup makes any marker element interactive; dragging only manages
   * focusability for the default marker so custom elements stay
   * application-owned (#7790). A tabindex supplied by the application is
   * never added, changed, or removed here.
   */
  _updateTabIndex(): void;
  /**
   * Keep the default marker role aligned with interactivity.
   * Default markers need a role because `aria-label` is set in {@link Marker.addTo}.
   * Non-interactive markers use `role=img`; interactive ones (draggable or with a popup) use `role=button`.
   * Click listeners are application-owned and do not automatically change the role.
   * Custom marker elements are left alone so applications own their a11y tree.
   * Explicit roles set by the application are preserved.
   */
  _updateAccessibilityRole(): void;
  /**
   * Sets the `rotation` property of the marker.
   * @param rotation - The rotation angle of the marker (clockwise, in degrees), relative to its respective {@link Marker.setRotationAlignment} setting.
   */
  setRotation(rotation?: number): this;
  /**
   * Returns the current rotation angle of the marker (in degrees).
   * @returns The current rotation angle of the marker.
   */
  getRotation(): number;
  /**
   * Sets the `rotationAlignment` property of the marker.
   * @param alignment - Sets the `rotationAlignment` property of the marker. defaults to 'auto'
   */
  setRotationAlignment(alignment?: Alignment): this;
  /**
   * Returns the current `rotationAlignment` property of the marker.
   * @returns The current rotational alignment of the marker.
   */
  getRotationAlignment(): Alignment;
  /**
   * Sets the `pitchAlignment` property of the marker.
   * @param alignment - Sets the `pitchAlignment` property of the marker. If alignment is 'auto', it will automatically match `rotationAlignment`.
   */
  setPitchAlignment(alignment?: Alignment): this;
  /**
   * Returns the current `pitchAlignment` property of the marker.
   * @returns The current pitch alignment of the marker in degrees.
   */
  getPitchAlignment(): Alignment;
  /**
   * Sets the `opacity` and `opacityWhenCovered` properties of the marker.
   * When called without arguments, resets opacity and opacityWhenCovered to defaults
   * @param opacity - Sets the `opacity` property of the marker.
   * @param opacityWhenCovered - Sets the `opacityWhenCovered` property of the marker.
   */
  setOpacity(opacity?: string | number, opacityWhenCovered?: string | number): this;
}
//#endregion
//#region src/ui/control/geolocate_control.d.ts
/**
 * The {@link GeolocateControl} options object
 */
type GeolocateControlOptions = {
  /**
   * A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.
   * @defaultValue `{enableHighAccuracy: false, timeout: 6000}`
   */
  positionOptions?: PositionOptions;
  /**
   * A options object to use when the map is panned and zoomed to the user's location. The default is to use a `maxZoom` of 15 to limit how far the map will zoom in for very accurate locations.
   */
  fitBoundsOptions?: FitBoundsOptions;
  /**
   * If `true` the `GeolocateControl` becomes a toggle button and when active the map will receive updates to the user's location as it changes.
   * @defaultValue false
   */
  trackUserLocation?: boolean;
  /**
   * By default, if `showUserLocation` is `true`, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to `false` to disable. Always disabled when `showUserLocation` is `false`.
   * @defaultValue true
   */
  showAccuracyCircle?: boolean;
  /**
   * By default a dot will be shown on the map at the user's location. Set to `false` to disable.
   * @defaultValue true
   */
  showUserLocation?: boolean;
  /**
   * If `true` then map updates from the user's location may also change the map zoom level based on the location update accuracy. If `false` then the map zoom level will not change.
   * Has no effect when `trackUserLocation` is `false`.
   * @defaultValue true
   */
  zoomToUserAccuracy?: boolean;
};
/**
 * The event class for geolocate control state events
 * (`trackuserlocationstart`, `trackuserlocationend`, `userlocationfocus` and `userlocationlostfocus`).
 *
 * @group Event Related
 */
export declare class GeolocateEvent extends Event$1 {
  type: "trackuserlocationstart" | "trackuserlocationend" | "userlocationfocus" | "userlocationlostfocus";
  /**
   * The `GeolocateControl` object that fired the event.
   */
  target: GeolocateControl;
}
/**
 * The event class for the geolocate control `geolocate` and `outofmaxbounds` events.
 * Carries the [Position](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition) returned by the Geolocation API.
 *
 * @group Event Related
 */
export declare class GeolocatePositionEvent extends Event$1 {
  type: "geolocate" | "outofmaxbounds";
  /**
   * The `GeolocateControl` object that fired the event.
   */
  target: GeolocateControl;
  /**
   * The geographic position returned by the Geolocation API.
   */
  coords: GeolocationCoordinates;
  /**
   * The time at which the position was acquired, in milliseconds since the Unix epoch.
   */
  timestamp: number;
}
/**
 * The event class for the geolocate control `error` event.
 * Carries the [PositionError](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError) returned by the Geolocation API.
 *
 * @group Event Related
 */
export declare class GeolocateErrorEvent extends Event$1 {
  type: "error";
  /**
   * The `GeolocateControl` object that fired the event.
   */
  target: GeolocateControl;
  /**
   * The error code returned by the Geolocation API.
   */
  code: number;
  /**
   * The error message returned by the Geolocation API.
   */
  message: string;
}
/**
 * `GeolocateControlEventType` - a mapping between the geolocate control event name and the event value.
 * These events are used with the {@link GeolocateControl.on} method.
 *
 * @group Event Related
 */
type GeolocateControlEventType = {
  /**
   * Fired on each Geolocation API position update which returned as success.
   */
  geolocate: GeolocatePositionEvent;
  /**
   * Fired on each Geolocation API position update which returned as an error.
   */
  error: GeolocateErrorEvent;
  /**
   * Fired on each Geolocation API position update which returned as success but the user position is out of map `maxBounds`.
   */
  outofmaxbounds: GeolocatePositionEvent;
  /**
   * Fired when the geolocate control changes to the active lock state.
   */
  trackuserlocationstart: GeolocateEvent;
  /**
   * Fired when the geolocate control changes to the background state.
   */
  trackuserlocationend: GeolocateEvent;
  /**
   * Fired when the geolocate control's button is clicked in the active lock state.
   */
  userlocationfocus: GeolocateEvent;
  /**
   * Fired when the user changes the viewport while in the active lock state.
   */
  userlocationlostfocus: GeolocateEvent;
};
/**
 * A `GeolocateControl` control provides a button that uses the browser's geolocation
 * API to locate the user on the map.
 *
 * Not all browsers support geolocation,
 * and some users may disable the feature. Geolocation support for modern
 * browsers including Chrome requires sites to be served over HTTPS. If
 * geolocation support is not available, the `GeolocateControl` will show
 * as disabled.
 *
 * The zoom level applied will depend on the accuracy of the geolocation provided by the device.
 *
 * The `GeolocateControl` has two modes. If `trackUserLocation` is `false` (default) the control acts as a button, which when pressed will set the map's camera to target the user location. If the user moves, the map won't update. This is most suited for the desktop. If `trackUserLocation` is `true` the control acts as a toggle button that when active the user's location is actively monitored for changes. In this mode the `GeolocateControl` has three interaction states:
 * * active - the map's camera automatically updates as the user's location changes, keeping the location dot in the center. Initial state and upon clicking the `GeolocateControl` button.
 * * passive - the user's location dot automatically updates, but the map's camera does not. Occurs upon the user initiating a map movement.
 * * disabled - occurs if Geolocation is not available, disabled or denied.
 *
 * These interaction states can't be controlled programmatically, rather they are set based on user interactions.
 *
 * ## State Diagram
 * ![GeolocateControl state diagram](https://github.com/maplibre/maplibre-gl-js/assets/3269297/78e720e5-d781-4da8-9803-a7a0e6aaaa9f)
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * map.addControl(new GeolocateControl({
 *     positionOptions: {
 *         enableHighAccuracy: true
 *     },
 *     trackUserLocation: true
 * }));
 * ```
 * @see [Locate the user](https://maplibre.org/maplibre-gl-js/docs/examples/locate-the-user/)
 *
 * ## Events
 *
 * **Event** `trackuserlocationend` of type {@link Event} will be fired when the `GeolocateControl` changes to the background state, which happens when a user changes the camera during an active position lock. This only applies when `trackUserLocation` is `true`. In the background state, the dot on the map will update with location updates but the camera will not.
 *
 * **Event** `trackuserlocationstart` of type {@link Event} will be fired when the `GeolocateControl` changes to the active lock state, which happens either upon first obtaining a successful Geolocation API position for the user (a `geolocate` event will follow), or the user clicks the geolocate button when in the background state which uses the last known position to recenter the map and enter active lock state (no `geolocate` event will follow unless the users's location changes).
 *
 * **Event** `userlocationlostfocus` of type {@link Event} will be fired when the `GeolocateControl` changes to the background state, which happens when a user changes the camera during an active position lock. This only applies when `trackUserLocation` is `true`. In the background state, the dot on the map will update with location updates but the camera will not.
 *
 * **Event** `userlocationfocus` of type {@link Event} will be fired when the `GeolocateControl` changes to the active lock state, which happens upon the user clicks the geolocate button when in the background state which uses the last known position to recenter the map and enter active lock state.
 *
 * **Event** `geolocate` of type {@link Event} will be fired on each Geolocation API position update which returned as success.
 * `data` - The returned [Position](https://developer.mozilla.org/en-US/docs/Web/API/Position) object from the callback in [Geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) or [Geolocation.watchPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition).
 *
 * **Event** `error` of type {@link Event} will be fired on each Geolocation API position update which returned as an error.
 * `data` - The returned [PositionError](https://developer.mozilla.org/en-US/docs/Web/API/PositionError) object from the callback in [Geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) or [Geolocation.watchPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition).
 *
 * **Event** `outofmaxbounds` of type {@link Event} will be fired on each Geolocation API position update which returned as success but user position is out of map `maxBounds`.
 * `data` - The returned [Position](https://developer.mozilla.org/en-US/docs/Web/API/Position) object from the callback in [Geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) or [Geolocation.watchPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition).
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when a trackuserlocationend event occurs.
 * geolocate.on('trackuserlocationend', () => {
 *   console.log('A trackuserlocationend event has occurred.')
 * });
 * ```
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when a trackuserlocationstart event occurs.
 * geolocate.on('trackuserlocationstart', () => {
 *   console.log('A trackuserlocationstart event has occurred.')
 * });
 * ```
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when an userlocationlostfocus event occurs.
 * geolocate.on('userlocationlostfocus', function() {
 *   console.log('An userlocationlostfocus event has occurred.')
 * });
 * ```
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when an userlocationfocus event occurs.
 * geolocate.on('userlocationfocus', function() {
 *   console.log('An userlocationfocus event has occurred.')
 * });
 * ```
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when a geolocate event occurs.
 * geolocate.on('geolocate', () => {
 *   console.log('A geolocate event has occurred.')
 * });
 * ```
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when an error event occurs.
 * geolocate.on('error', () => {
 *   console.log('An error event has occurred.')
 * });
 * ```
 *
 * @example
 * ```ts
 * // Initialize the geolocate control.
 * let geolocate = new GeolocateControl({
 *   positionOptions: {
 *       enableHighAccuracy: true
 *   },
 *   trackUserLocation: true
 * });
 * // Add the control to the map.
 * map.addControl(geolocate);
 * // Set an event listener that fires
 * // when an outofmaxbounds event occurs.
 * geolocate.on('outofmaxbounds', () => {
 *   console.log('An outofmaxbounds event has occurred.')
 * });
 * ```
 */
export declare class GeolocateControl extends Evented<GeolocateControlEventType> implements IControl {
  _map: Map$1;
  options: GeolocateControlOptions;
  _container: HTMLElement;
  _dotElement: HTMLElement;
  _circleElement: HTMLElement;
  _geolocateButton: HTMLButtonElement;
  _geolocationWatchID: number;
  _timeoutId: ReturnType<typeof setTimeout>;
  _watchState: "OFF" | "ACTIVE_LOCK" | "WAITING_ACTIVE" | "ACTIVE_ERROR" | "BACKGROUND" | "BACKGROUND_ERROR";
  _lastKnownPosition: any;
  _userLocationDotMarker: Marker;
  _accuracyCircleMarker: Marker;
  _accuracy: number;
  _setup: boolean;
  /**
   * @param options - the control's options
   */
  constructor(options: GeolocateControlOptions);
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  /**
   * Check if the Geolocation API Position is outside the map's `maxBounds`.
   *
   * @param position - the Geolocation API Position
   * @returns `true` if position is outside the map's `maxBounds`, otherwise returns `false`.
   */
  _isOutOfMapMaxBounds(position: GeolocationPosition): boolean;
  _setErrorState(): void;
  /**
   * When the Geolocation API returns a new location, update the `GeolocateControl`.
   *
   * @param position - the Geolocation API Position
   */
  _onSuccess: (position: GeolocationPosition) => void;
  /**
   * Update the camera location to center on the current position.
   * The camera change is tagged with `geolocateSource` so it does not switch the control to the background state.
   *
   * @param position - the Geolocation API Position
   */
  _updateCamera: (position: GeolocationPosition) => void;
  /**
   * Update the user location dot Marker to the current position
   *
   * @param position - the Geolocation API Position
   */
  _updateMarker: (position?: GeolocationPosition | null) => void;
  _updateCircleRadiusIfNeeded(): void;
  _onUpdate: () => void;
  _onError: (error: GeolocationPositionError) => void;
  _finish: () => void;
  _onMoveStart: (event: any) => void;
  _setupUI: () => void;
  _finishSetupUI: (supported: boolean) => void;
  /**
   * Programmatically request and move the map to the user's location.
   *
   * @returns `false` if called before control was added to a map, otherwise returns `true`.
   * @example
   * ```ts
   * // Initialize the geolocate control.
   * let geolocate = new GeolocateControl({
   *  positionOptions: {
   *    enableHighAccuracy: true
   *  },
   *  trackUserLocation: true
   * });
   * // Add the control to the map.
   * map.addControl(geolocate);
   * map.on('load', () => {
   *   geolocate.trigger();
   * });
   * ```
   */
  trigger(): boolean;
  _clearWatch(): void;
}
//#endregion
//#region src/ui/control/logo_control.d.ts
/**
 * The {@link LogoControl} options object
 */
type LogoControlOptions = {
  /**
   * If `true`, force a compact logo.
   * If `false`, force the full logo. The default is a responsive logo that collapses when the map is less than 640 pixels wide.
   */
  compact?: boolean;
};
/**
 * A `LogoControl` is a control that adds the watermark.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * map.addControl(new LogoControl({compact: false}));
 * ```
 **/
export declare class LogoControl implements IControl {
  options: LogoControlOptions;
  _map: Map$1;
  _compact: boolean;
  _container: HTMLElement;
  /**
   * @param options - the control's options
   */
  constructor(options?: LogoControlOptions);
  getDefaultPosition(): ControlPosition;
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  _updateCompact: () => void;
}
//#endregion
//#region src/ui/control/scale_control.d.ts
/**
 * The unit type for length to use for the {@link ScaleControl}
 */
type Unit = "imperial" | "metric" | "nautical";
/**
 * The {@link ScaleControl} options object
 */
type ScaleControlOptions = {
  /**
   * The maximum length of the scale control in pixels.
   * @defaultValue 100
   */
  maxWidth?: number;
  /**
   * Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
   * @defaultValue 'metric'
   */
  unit?: Unit;
};
/**
 * A `ScaleControl` control displays the ratio of a distance on the map to the corresponding distance on the ground.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let scale = new ScaleControl({
 *     maxWidth: 80,
 *     unit: 'imperial'
 * });
 * map.addControl(scale);
 *
 * scale.setUnit('metric');
 * ```
 */
export declare class ScaleControl implements IControl {
  _map: Map$1;
  _container: HTMLElement;
  options: ScaleControlOptions;
  /**
   * @param options - the control's options
   */
  constructor(options?: ScaleControlOptions);
  getDefaultPosition(): ControlPosition;
  _onMove: () => void;
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  /**
   * Set the scale's unit of the distance
   *
   * @param unit - Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
   */
  setUnit: (unit: Unit) => void;
}
//#endregion
//#region src/ui/control/fullscreen_control.d.ts
/**
 * The {@link FullscreenControl} options object
 */
type FullscreenControlOptions = {
  /**
   * `container` is the [compatible DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#Compatible_elements) which should be made full screen. By default, the map container element will be made full screen.
   */
  container?: HTMLElement;
  /**
   * If `true`, the fullscreen control will always use pseudo fullscreen mode (CSS-based, expanding to browser viewport) instead of native fullscreen API.
   * This can be useful for faster transitions and to allow multiple maps to be "fullscreen" simultaneously in different browser windows.
   * @defaultValue false
   */
  pseudo?: boolean;
};
/**
 * The event class for fullscreen control events (`fullscreenstart` and `fullscreenend`).
 *
 * @group Event Related
 */
export declare class FullscreenEvent extends Event$1 {
  type: "fullscreenstart" | "fullscreenend";
  /**
   * The `FullscreenControl` object that fired the event.
   */
  target: FullscreenControl;
}
/**
 * `FullscreenControlEventType` - a mapping between the fullscreen control event name and the event value.
 * These events are used with the {@link FullscreenControl.on} method.
 *
 * @group Event Related
 */
type FullscreenControlEventType = {
  /**
   * Fired when fullscreen mode has started.
   */
  fullscreenstart: FullscreenEvent;
  /**
   * Fired when fullscreen mode has ended.
   */
  fullscreenend: FullscreenEvent;
};
/**
 * A `FullscreenControl` control contains a button for toggling the map in and out of fullscreen mode.
 * When [requestFullscreen](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen) is not supported, fullscreen is handled via CSS properties.
 * The map's `cooperativeGestures` option is temporarily disabled while the map
 * is in fullscreen mode, and is restored when the map exist fullscreen mode.
 *
 * @group Markers and Controls
 * @param options - the full screen control options
 *
 * @example
 * ```ts
 * map.addControl(new FullscreenControl({container: document.querySelector('body')}));
 * ```
 * @see [View a fullscreen map](https://maplibre.org/maplibre-gl-js/docs/examples/view-a-fullscreen-map/)
 *
 * ## Events
 *
 * **Event** `fullscreenstart` of type {@link FullscreenEvent} will be fired when fullscreen mode has started.
 *
 * **Event** `fullscreenend` of type {@link FullscreenEvent} will be fired when fullscreen mode has ended.
 */
export declare class FullscreenControl extends Evented<FullscreenControlEventType> implements IControl {
  _map: Map$1;
  _controlContainer: HTMLElement;
  _fullscreen: boolean;
  _fullscreenchange: string;
  _fullscreenButton: HTMLButtonElement;
  _container: HTMLElement;
  _prevCooperativeGesturesEnabled: boolean;
  _pseudo: boolean;
  /**
   * @param options - the control's options
   */
  constructor(options?: FullscreenControlOptions);
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  _setupUI(): void;
  _updateTitle(): void;
  _getTitle(): string;
  _isFullscreen(): boolean;
  _onFullscreenChange: () => void;
  _handleFullscreenChange(): void;
  _onClickFullscreen: () => void;
  _exitFullscreen(): void;
  _requestFullscreen(): void;
  _togglePseudoFullScreen(): void;
}
//#endregion
//#region src/ui/control/terrain_control.d.ts
/**
 * A `TerrainControl` control contains a button for turning the terrain on and off.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let map = new Map({TerrainControl: false})
 *     .addControl(new TerrainControl({
 *         source: "terrain"
 *     }));
 * ```
 * @see [3D Terrain](https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/)
 * @see [Create a Heatmap layer on a globe with terrain elevation](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-heatmap-layer-on-a-globe-with-terrain-elevation/)
 * @see [Display a hybrid satellite map with terrain elevation](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-hybrid-satellite-map-with-terrain-elevation/)
 * @see [Sky, Fog, Terrain](https://maplibre.org/maplibre-gl-js/docs/examples/sky-fog-terrain/)
 */
export declare class TerrainControl implements IControl {
  options: TerrainSpecification;
  _map: Map$1;
  _container: HTMLElement;
  _terrainButton: HTMLButtonElement;
  /**
   * @param options - the control's options
   */
  constructor(options: TerrainSpecification);
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  _toggleTerrain: () => void;
  _updateTerrainIcon: () => void;
}
//#endregion
//#region src/ui/control/globe_control.d.ts
/**
 * A `GlobeControl` control contains a button for toggling the map projection between "mercator" and "globe".
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let map = new Map()
 *     .addControl(new GlobeControl());
 * ```
 *
 * @see [Display a globe with a fill extrusion layer](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-globe-with-a-fill-extrusion-layer/)
 * @see [Sky, Fog, Terrain](https://maplibre.org/maplibre-gl-js/docs/examples/sky-fog-terrain/)
 */
export declare class GlobeControl implements IControl {
  _map: Map$1;
  _container: HTMLElement;
  _globeButton: HTMLButtonElement;
  /** {@inheritDoc IControl.onAdd} */
  onAdd(map: Map$1): HTMLElement;
  /** {@inheritDoc IControl.onRemove} */
  onRemove(): void;
  _toggleProjection: () => void;
  _updateGlobeIcon: () => void;
}
//#endregion
//#region src/util/time_control.d.ts
/**
 * Returns the current time in milliseconds.
 * When time is frozen via setNow(), returns the frozen timestamp.
 * Otherwise returns real browser time via performance.now().
 *
 * @returns Current time in milliseconds
 * @example
 * ```ts
 * // Measure elapsed time
 * const start = maplibregl.now();
 * // ... later ...
 * const elapsed = maplibregl.now() - start;
 *
 * // During frozen time
 * maplibregl.setNow(16.67);
 * console.log(maplibregl.now()); // 16.67
 * maplibregl.restoreNow();
 * console.log(maplibregl.now()); // real time
 * ```
 */
export declare function now(): number;
/**
 * Freezes time at a specific timestamp for deterministic rendering.
 * Useful for frame-by-frame video capture where each frame needs
 * a consistent time value.
 *
 * @param timestamp - Time in milliseconds to freeze at
 * @example
 * ```ts
 * // Freeze time for video export at 60fps
 * setNow(0);           // First frame
 * // ... render frame ...
 * setNow(16.67);       // Second frame
 * // ... render frame ...
 * setNow(33.34);       // Third frame
 * // ... done ...
 * restoreNow();        // Resume normal time
 * ```
 */
export declare function setNow(timestamp: number): void;
/**
 * Restores normal time flow after freezing with setNow().
 * Call this after finishing deterministic rendering operations.
 *
 * @example
 * ```ts
 * // After video export, resume normal time
 * setNow(0);
 * // ... export frames ...
 * restoreNow(); // Map animations resume normally
 * ```
 */
export declare function restoreNow(): void;
/**
 * Returns whether time is currently frozen.
 * @returns True if time is frozen via setNow(), false otherwise
 * @example
 * ```ts
 * setNow(1000);
 * console.log(isTimeFrozen()); // true
 * restoreNow();
 * console.log(isTimeFrozen()); // false
 * ```
 */
export declare function isTimeFrozen(): boolean;
//#endregion
//#region src/util/global_worker_pool.d.ts
/**
 * Initializes resources like WebWorkers that can be shared across maps to lower load
 * times in some situations. `setWorkerUrl()` and `setWorkerCount()`, if being
 * used, must be set before `prewarm()` is called to have an effect.
 *
 * By default, the lifecycle of these resources is managed automatically, and they are
 * lazily initialized when a Map is first created. By invoking `prewarm()`, these
 * resources will be created ahead of time, and will not be cleared when the last Map
 * is removed from the page. This allows them to be re-used by new Map instances that
 * are created later. They can be manually cleared by calling
 * `clearPrewarmedResources()`. This is only necessary if your web page remains
 * active but stops using maps altogether.
 *
 * This is primarily useful when using GL-JS maps in a single page app, wherein a user
 * would navigate between various views that can cause Map instances to constantly be
 * created and destroyed.
 *
 * @example
 * ```ts
 * prewarm()
 * ```
 */
export declare function prewarm(): void;
/**
 * Clears up resources that have previously been created by `prewarm()`.
 * Note that this is typically not necessary. You should only call this function
 * if you expect the user of your app to not return to a Map view at any point
 * in your application.
 *
 * @example
 * ```ts
 * clearPrewarmedResources()
 * ```
 */
export declare function clearPrewarmedResources(): void;
//#endregion
//#region src/source/raster_tile_source.d.ts
/**
 * A source containing raster tiles (See the [raster source documentation](https://maplibre.org/maplibre-style-spec/sources/#raster) for detailed documentation of options.)
 *
 * @group Sources
 *
 * \> ℹ️ **Note:** The default `tileSize` is `512`. If your tile provider (such as OpenStreetMap or Stadia Maps) serves 256px tiles, set `tileSize: 256` manually to avoid blurry rendering due to upscaling.
 *
 * @example
 * ```ts
 * map.addSource('raster-source', {
 *     'type': 'raster',
 *     'tiles': ['https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'],
 *     'tileSize': 256, // Set this to match tile server output to avoid blurry rendering
 * });
 * ```
 *
 * @example
 * ```ts
 * map.addSource('wms-test-source', {
 *      'type': 'raster',
 * // use the tiles option to specify a WMS tile source URL
 *      'tiles': [
 *          'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
 *      ],
 *      'tileSize': 256 // Important for WMS if tiles are 256px
 * });
 * ```
 * @see [Add a raster tile source](https://maplibre.org/maplibre-gl-js/docs/examples/map-tiles/)
 * @see [Add a WMS source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-wms-source/)
 * @see [Display a satellite map](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-satellite-map/)
 */
export declare class RasterTileSource extends Evented<SourceEventType> implements Source {
  type: "raster" | "raster-dem";
  id: string;
  minzoom: number;
  maxzoom: number;
  url: string;
  scheme: string;
  tileSize: number;
  bounds: [number, number, number, number];
  tileBounds: TileBounds;
  roundZoom: boolean;
  dispatcher: Dispatcher;
  map: Map$1;
  tiles: string[];
  _loaded: boolean;
  _options: RasterSourceSpecification | RasterDEMSourceSpecification;
  _premultiplyAlpha: boolean;
  _tileJSONRequest: AbortController;
  constructor(id: string, options: RasterSourceSpecification | RasterDEMSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
  load(sourceDataChanged?: boolean): Promise<void>;
  loaded(): boolean;
  onAdd(map: Map$1): void;
  onRemove(): void;
  setSourceProperty(callback: Function): void;
  /**
   * Sets the source `tiles` property and re-renders the map.
   *
   * @param tiles - An array of one or more tile source URLs, as in the raster tiles spec (See the [Style Specification](https://maplibre.org/maplibre-style-spec/)
   */
  setTiles(tiles: string[]): this;
  /**
   * Sets the source `url` property and re-renders the map.
   *
   * @param url - A URL to a TileJSON resource. Supported protocols are `http:` and `https:`.
   */
  setUrl(url: string): this;
  serialize(): RasterSourceSpecification | RasterDEMSourceSpecification;
  /**
   * Sets whether alpha premultiplication is applied to raster tile images.
   * Set to `false` to preserve exact RGBA byte values when alpha carries data instead of opacity.
   *
   * @param premultiplyAlpha - If `false`, disables alpha premultiplication for raster tile image decode and texture upload.
   * @example
   * ```ts
   * map.getSource<RasterTileSource>('raster-source').setPremultiplyAlpha(false);
   * ```
   */
  setPremultiplyAlpha(premultiplyAlpha: boolean): this;
  hasTile(tileID: OverscaledTileID): boolean;
  loadTile(tile: Tile): Promise<void>;
  abortTile(tile: Tile): Promise<void>;
  unloadTile(tile: Tile): Promise<void>;
  hasTransition(): boolean;
}
//#endregion
//#region src/source/raster_dem_tile_source.d.ts
/**
 * A source containing raster DEM tiles (See the [Style Specification](https://maplibre.org/maplibre-style-spec/) for detailed documentation of options.)
 * This source can be used to show hillshading and 3D terrain
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('raster-dem-source', {
 *      type: 'raster-dem',
 *      url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
 *      tileSize: 256
 * });
 * ```
 * @see [3D Terrain](https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/)
 */
export declare class RasterDEMTileSource extends RasterTileSource implements Source {
  encoding: DEMEncoding;
  redFactor?: number;
  greenFactor?: number;
  blueFactor?: number;
  baseShift?: number;
  constructor(id: string, options: RasterDEMSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
  override loadTile(tile: Tile): Promise<void>;
  readImageNow(img: ImageBitmap | HTMLImageElement): Promise<RGBAImage | ImageData>;
  _getNeighboringTiles(tileID: OverscaledTileID): Record<string, {
    backfilled: boolean;
  }>;
  unloadTile(tile: Tile): Promise<void>;
}
//#endregion
//#region src/source/video_source.d.ts
/**
 * A data source containing video.
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/#sources-video) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * // add to map
 * map.addSource('some id', {
 *    type: 'video',
 *    url: [
 *        'https://www.mapbox.com/blog/assets/baltimore-smoke.mp4',
 *        'https://www.mapbox.com/blog/assets/baltimore-smoke.webm'
 *    ],
 *    coordinates: [
 *        [-76.54, 39.18],
 *        [-76.52, 39.18],
 *        [-76.52, 39.17],
 *        [-76.54, 39.17]
 *    ]
 * });
 *
 * // update
 * let mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * map.removeSource('some id');  // remove
 * ```
 * @see [Add a video](https://maplibre.org/maplibre-gl-js/docs/examples/video-on-a-map/)
 *
 * Note that when rendered as a raster layer, the layer's `raster-fade-duration` property will cause the video to fade in.
 * This happens when playback is started, paused and resumed, or when the video's coordinates are updated. To avoid this behavior,
 * set the layer's `raster-fade-duration` property to `0`.
 */
export declare class VideoSource extends ImageSource {
  options: VideoSourceSpecification;
  urls: string[];
  video: HTMLVideoElement;
  roundZoom: boolean;
  private _onPlayingHandler;
  constructor(id: string, options: VideoSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
  load(): Promise<void>;
  /**
   * Pauses the video.
   */
  pause(): void;
  /**
   * Plays the video.
   */
  play(): void;
  /**
   * Sets playback to a timestamp, in seconds.
   */
  seek(seconds: number): void;
  /**
   * Returns the HTML `video` element.
   *
   * @returns The HTML `video` element.
   */
  getVideo(): HTMLVideoElement;
  onAdd(map: Map$1): void;
  onRemove(): void;
  /**
   * Sets the video's coordinates and re-renders the map.
   */
  prepare(): this;
  serialize(): VideoSourceSpecification;
  hasTransition(): boolean;
}
//#endregion
//#region src/source/protocol_crud.d.ts
/**
 * Adds a custom load resource function that will be called when using a URL that starts with a custom url schema.
 * This will happen in the main thread, and workers might call it if they don't know how to handle the protocol.
 * The example below will be triggered for custom:// urls defined in the sources list in the style definitions.
 * The function passed will receive the request parameters and should return with the resulting resource.
 * `requestParameters.type` says which kind of resource is expected. A tile is an `ArrayBuffer`, for example
 * a non-compressed pbf vector tile. An image is either its encoded bytes or an `ImageBitmap`/`HTMLImageElement`,
 * which is used without decoding. See {@link AddProtocolResponseData} for every accepted shape.
 *
 * @param customProtocol - the protocol to hook, for example 'custom'
 * @param loadFn - the function to use when trying to fetch a tile specified by the customProtocol
 * @example
 * ```ts
 * // This will fetch a file using the fetch API (this is obviously a non interesting example...)
 * addProtocol('custom', async (params, abortController) => {
 *      const t = await fetch(`https://${params.url.split("://")[1]}`);
 *      if (t.status == 200) {
 *          const buffer = await t.arrayBuffer();
 *          return {data: buffer}
 *      } else {
 *          throw new Error(`Tile fetch error: ${t.statusText}`);
 *      }
 *  });
 * // the following is an example of a way to return an error when trying to load a tile
 * addProtocol('custom2', async (params, abortController) => {
 *      throw new Error('someErrorMessage');
 * });
 * // An image handler that draws or computes its tiles can return them decoded, as an ImageBitmap.
 * addProtocol('drawn', async (params, abortController) => {
 *      const canvas = new OffscreenCanvas(256, 256);
 *      // ... draw the tile ...
 *      return {data: await createImageBitmap(canvas)};
 * });
 * ```
 * @see [Add a COG raster source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-cog-raster-source/)
 * @see [Add Contour Lines](https://maplibre.org/maplibre-gl-js/docs/examples/add-contour-lines/)
 * @see [PMTiles source and protocol](https://maplibre.org/maplibre-gl-js/docs/examples/pmtiles-source-and-protocol/)
 * @see [Use addProtocol to Transform Feature Properties](https://maplibre.org/maplibre-gl-js/docs/examples/use-addprotocol-to-transform-feature-properties/)
 */
export declare function addProtocol(customProtocol: string, loadFn: AddProtocolAction): void;
/**
 * Removes a previously added protocol in the main thread.
 *
 * @param customProtocol - the custom protocol to remove registration for
 * @example
 * ```ts
 * removeProtocol('custom');
 * ```
 */
export declare function removeProtocol(customProtocol: string): void;
//#endregion
//#region src/util/create_tile_mesh.d.ts
/**
 * Options for generating a tile mesh.
 * Can optionally configure any of the following:
 * - mesh subdivision granularity
 * - border presence
 * - special geometry for the north and/or south pole
 */
type CreateTileMeshOptions = {
  /**
   * Specifies how much should the tile mesh be subdivided.
   * A value of 1 leads to a simple quad, a value of 4 will result in a grid of 4x4 quads.
   */
  granularity?: number;
  /**
   * When true, an additional ring of quads is generated along the border, always extending `EXTENT_STENCIL_BORDER` units away from the main mesh.
   */
  generateBorders?: boolean;
  /**
   * When true, additional geometry is generated along the north edge of the mesh, connecting it to the pole special vertex position.
   * This geometry replaces the mesh border along this edge, if one is present.
   */
  extendToNorthPole?: boolean;
  /**
   * When true, additional geometry is generated along the south edge of the mesh, connecting it to the pole special vertex position.
   * This geometry replaces the mesh border along this edge, if one is present.
   */
  extendToSouthPole?: boolean;
};
/**
 * Stores the prepared vertex and index buffer bytes for a mesh.
 */
type TileMesh = {
  /**
   * The vertex data. Each vertex is two 16 bit signed integers, one for X, one for Y.
   */
  vertices: ArrayBuffer;
  /**
   * The index data. Each triangle is defined by three indices. The indices may either be 16 bit or 32 bit unsigned integers,
   * depending on the mesh creation arguments and on whether the mesh can fit into 16 bit indices.
   */
  indices: ArrayBuffer;
  /**
   * A helper boolean indicating whether the indices are 32 bit.
   */
  uses32bitIndices: boolean;
};
/**
 * Describes desired type of vertex indices, either 16 bit uint, 32 bit uint, or, if undefined, any of the two options.
 */
type IndicesType = "32bit" | "16bit" | undefined;
/**
 * Creates a mesh of a quad that covers the entire tile (covering positions in range 0..EXTENT),
 * is optionally subdivided into finer quads, optionally includes a border
 * and optionally extends to the north and/or special pole vertices.
 * Additionally the resulting mesh indices type can be specified using `forceIndicesSize`.
 * @example
 * ```
 * // Creating a mesh for a tile that can be used for raster layers, hillshade, etc.
 * const meshBuffers = createTileMesh({
 *     granularity: map.style.projection.subdivisionGranularity.tile.getGranularityForZoomLevel(tileID.z),
 *     generateBorders: true,
 *     extendToNorthPole: tileID.y === 0,
 *     extendToSouthPole: tileID.y === (1 << tileID.z) - 1,
 * }, '16bit');
 * ```
 * @see [Add a custom layer with tiles to a globe](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-custom-layer-with-tiles-to-a-globe/)
 * @param options - Specify options for tile mesh creation such as granularity or border.
 * @param forceIndicesSize - Specifies what indices type to use. The values '32bit' and '16bit' force their respective indices size. If undefined, the mesh may use either size, and will pick 16 bit indices if possible. If '16bit' is specified and the mesh exceeds 65536 vertices, an exception is thrown.
 * @returns Typed arrays of the mesh vertices and indices.
 */
export declare function createTileMesh(options: CreateTileMeshOptions, forceIndicesSize?: IndicesType): TileMesh;
//#endregion
//#region src/util/gpu_initialization_error.d.ts
/**
 * Thrown by the `Map` constructor when a GPU rendering context cannot be created,
 * or fired via the map's `error` event when recreating the context after a `webglcontextrestored` fails.
 *
 * Carries the canvas attributes that were requested and, when the browser provided one,
 * the originating `webglcontextcreationerror` `statusMessage`.
 * Consumers can branch on `instanceof GPUInitializationError` and inspect the cause programmatically.
 * @see https://wiki.openstreetmap.org/wiki/This_map_requires_WebGL
 */
export declare class GPUInitializationError extends Error {
  readonly requestedAttributes: WebGLContextAttributes;
  readonly statusMessage: string | null;
  constructor(requestedAttributes: WebGLContextAttributes, creationEvent: WebGLContextEvent | null);
}
//#endregion
//#region src/data/extent.d.ts
/**
 * The maximum value of a coordinate in the internal tile coordinate system. Coordinates of
 * all source features normalized to this extent upon load.
 *
 * The value is a consequence of the following:
 *
 * * Vertex buffer store positions as signed 16 bit integers.
 * * One bit is lost for signedness to support tile buffers.
 * * One bit is lost because the line vertex buffer used to pack 1 bit of other data into the int.
 * * One bit is lost to support features extending past the extent on the right edge of the tile.
 * * This leaves us with 2^13 = 8192
 */
export declare const EXTENT = 8192;
//#endregion
//#region src/index.d.ts
/**
 * Sets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text).
 *
 * @deprecated MapLibre shapes Arabic and reorders bidirectional text itself, so nothing has to be
 * loaded for right-to-left languages to be drawn correctly. A plugin set here still replaces the
 * built-in implementation, but this will be removed in a future release.
 * @param pluginURL - URL pointing to the Mapbox RTL text plugin source.
 * @param lazy - If set to `true`, maplibre will defer loading the plugin until rtl text is encountered,
 * rtl text will then be rendered only after the plugin finishes loading.
 * @example
 * ```ts
 * setRTLTextPlugin('https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js', false);
 * ```
 * @see [Add support for right-to-left scripts](https://maplibre.org/maplibre-gl-js/docs/examples/add-support-for-right-to-left-scripts/)
 * @see [Display and style rich text labels](https://maplibre.org/maplibre-gl-js/docs/examples/display-and-style-rich-text-labels/)
 */
declare function setRTLTextPlugin(pluginURL: string, lazy: boolean): Promise<void>;
/**
 * Gets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text) status.
 * The status can be `unavailable` (i.e. not requested or removed), `loading`, `loaded` or `error`.
 * If the status is `loaded` and the plugin is requested again, an error will be thrown.
 *
 * @deprecated The status says nothing about whether right-to-left text can be drawn, which it always
 * can be. It reports only on a plugin set through the deprecated {@link setRTLTextPlugin}.
 * @example
 * ```ts
 * const pluginStatus = getRTLTextPluginStatus();
 * ```
 */
declare function getRTLTextPluginStatus(): string;
/**
 * Returns the package version of the library
 * @returns Package version of the library
 */
declare function getVersion(): string;
/**
 * Gets the number of web workers instantiated on a page with GL JS maps.
 * By default, workerCount is 1 except for Safari browser where it is set to half the number of CPU cores (capped at 3).
 * Make sure to set this property before creating any map instances for it to have effect.
 *
 * @returns Number of workers currently configured.
 * @example
 * ```ts
 * const workerCount = getWorkerCount()
 * ```
 */
declare function getWorkerCount(): number;
/**
 * Sets the number of web workers instantiated on a page with GL JS maps.
 * By default, workerCount is 1 except for Safari browser where it is set to half the number of CPU cores (capped at 3).
 * Make sure to set this property before creating any map instances for it to have effect.
 *
 * @example
 * ```ts
 * setWorkerCount(2);
 * ```
 */
declare function setWorkerCount(count: number): void;
/**
 * Gets and sets the maximum number of images (raster tiles, sprites, icons) to load in parallel,
 * which affects performance in raster-heavy maps. 16 by default.
 *
 * @returns Number of parallel requests currently configured.
 * @example
 * ```ts
 * getMaxParallelImageRequests();
 * ```
 */
declare function getMaxParallelImageRequests(): number;
/**
 * Sets the maximum number of images (raster tiles, sprites, icons) to load in parallel,
 * which affects performance in raster-heavy maps. 16 by default.
 *
 * @example
 * ```ts
 * setMaxParallelImageRequests(10);
 * ```
 */
declare function setMaxParallelImageRequests(numRequests: number): void;
/**
 * Gets the worker url
 * @returns The worker url
 */
declare function getWorkerUrl(): string;
/**
 * Sets the worker url
 */
declare function setWorkerUrl(value: string): void;
/**
 * Allows loading javascript code in the worker thread.
 * *Note* that since this is using some very internal classes and flows it is considered experimental and can break at any point.
 *
 * It can be useful for the following examples:
 * 1. Using `self.addProtocol` in the worker thread - note that you might need to also register the protocol on the main thread.
 * 2. Using `self.registerWorkerSource(workerSource: WorkerSource)` to register a worker source, which should come with `addSourceType` usually.
 * 3. using `self.actor.registerMessageHandler` to override some internal worker operations
 * @param workerUrl - the worker url e.g. a url of a javascript file to load in the worker
 * @returns
 *
 * @example
 * ```ts
 * // below is an example of sending a js file to the worker to load the method there
 * // Note that you'll need to call the global function `addProtocol` in the worker to register the protocol there.
 * // add-protocol-worker.js
 * async function loadFn(params, abortController) {
 *     const t = await fetch(`https://${params.url.split("://")[1]}`);
 *     if (t.status == 200) {
 *         const buffer = await t.arrayBuffer();
 *         return {data: buffer}
 *     } else {
 *         throw new Error(`Tile fetch error: ${t.statusText}`);
 *     }
 * }
 * self.addProtocol('custom', loadFn);
 *
 * // main.js
 * importScriptInWorkers('add-protocol-worker.js');
 * ```
 */
declare function importScriptInWorkers(workerUrl: string): Promise<void>;
//#endregion
export { type Actor, type ActorMessage, type AddLayerObject, type AddProtocolAction, type AddProtocolResponseData, type Alignment, type AlphaImage, type AnchoredCameraOptions, type AnimationOptions, type AroundCenterOptions, type AttributionControlOptions, type BoxZoomEndHandler, type BoxZoomHandlerOptions, type Bucket, type CalculateTileZoomFunction, type CameraForBoundsOptions, type CameraOptions, type CameraUpdateTransformFunction, type CanonicalTileRange, type CanvasSourceSpecification, type CenterZoomBearing, type CollisionBoxArray, type Complete, type ControlPosition, type Coordinates, type CoveringTilesOptions, type CreateTileMeshOptions, type CustomLayerInterface, type CustomLayerProjectionData, type CustomLayerProjectionDataParams, type CustomRenderMethod, type CustomRenderMethodInput, type CustomTerrainRenderInput, type DashEntry, type Dispatcher, type DistributiveKeys, type DistributiveOmit, type DragPanOptions, type EaseToOptions, type ErrorEventType, Event$1 as Event, type EventTypeMap, type EventedParentData, type ExpiryData, type FeatureIdentifier, type FeatureIndex, type FitBoundsOptions, type FlyToOptions, type FullscreenControlEventType, type FullscreenControlOptions, type GeoJSONFeature, type GeoJSONFeatureDiff, type GeoJSONFeatureId, type GeoJSONSourceDiff, type GeolocateControlEventType, type GeolocateControlOptions, type GestureOptions, type GetClusterOptions, type GetResourceResponse, type GlyphMap, type GlyphPosition, type GlyphPositions, type Handler, type HandlerResult, type IActor, type IControl, type ImageAtlas, type ImageSourceImage, type ImageSourceWarp, type IndicesType, type JumpToOptions, type Listener, type LngLatBoundsLike, type LngLatLike, type LoadTileResult, type LogoControlOptions, Map$1 as Map, Map$1 as MapLibreMap, type MapEventType, type MapGeoJSONFeature, type MapLayerEventType, type MapLayerMouseEvent, type MapLayerTouchEvent, type MapOptions, type MapSourceDataType, type MarkerEventType, type MarkerOptions, type Mat4f32, type Mat4f64, type MessageType, type MissingStyleImageResolver, type NavigationControlOptions, type Offset, type OverscaledTileID, type PaddingOptions, type PaintPropertyEntry, type Painter, Point, type PointLike, type PopupEventType, type PopupOptions, type PositionAnchor, type ProjectionData, type ProjectionDataParams, type ProjectionMatrix, type QueryRenderedFeaturesOptions, type QuerySourceFeatureOptions, type RendererProjectionData, type RequestParameters, type RequestResponseMessageMap, type RequestTransformFunction, type RequireAtLeastOne, type ResourceType, type ScaleControlOptions, type SetClusterOptions, type Source, type SourceClass, type SourceEventType, type StyleGlyph, type StyleImage, type StyleImageData, type StyleImageInterface, type StyleImageMetadata, type StyleImageSource, type StyleImageWebGLData, type StyleImageWebGLTarget, type StyleLayer, type StyleOptions, type StyleSetterOptions, type StyleSwapOptions, type Subscription, type TerrainHeightMapTarget, type TextFit, type Tile, type TileMesh, type TransformConstrainFunction, type TransformStyleFunction, type Unit, type UnwrappedTileIDLiteral, type UpdateImageOptions, type WebGLContextAttributesWithType, type WorkerGlobalScopeInterface, type WorkerTileResult, getMaxParallelImageRequests, getRTLTextPluginStatus, getVersion, getWorkerCount, getWorkerUrl, importScriptInWorkers, setMaxParallelImageRequests, setRTLTextPlugin, setWorkerCount, setWorkerUrl };