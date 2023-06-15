/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * reference and modification
 * maptalks.three
 * (https://github.com/maptalks/maptalks.three)
 * Apache Licene 2.0
 * thanks maptalks
 */

import * as THREE from "three";
import { Util } from '../../commontypes/Util';
import { Transform } from "./Transform";

const projection = Transform.projection;
const {
  Color,
  Scene,
  WebGLRenderer,
  CanvasRenderer,
  PerspectiveCamera,
  Vector3,
  Shape,
  Mesh,
  ExtrudeGeometry
} = THREE;

const RADIAN = Math.PI / 180;


const frame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const cancel = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.msCancelAnimationFrame;

/**
 * @private
 * @class ThreeLayerRenderer
 * @category  Visualization Three
 * @classdesc Three 图层渲染器
 * @param {ThreeLayer} layer - ThreeJs图层。
 * @param {string} [renderer="gl"] - 图层渲染方式(canvas或WebGL)。取值："gl","canvas"。
 * @param {Object} options - threejs渲染器初始化参数对象。参数内容详见:
 *          [WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
 *          [CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
 *
 */
export class ThreeLayerRenderer {

  constructor(layer, renderer, options) {
    this._layer = layer;
    this.renderer = renderer || "gl";
    this.options = options;
  }

  setMap(map) {
    this.map = map;
  }

  //开始渲染
  render() {
    if (!this._layer) {
      return;
    }
    this.prepare();
    /**
     * @event ThreeLayer#initialized
     * @description three 初始化之后后触发。
     */
    this._layer.fire("initialized");
    this._layer && this._layer.draw(this.context, this.scene, this.camera);
    /**
     * @event ThreeLayer#draw
     * @description draw 绘制事件，调用提供给外部绘制的接口后触发。
     */
    this._layer.fire("draw");
    this.renderScene();
  }

  update() {
    this.remove();
    this.render();
  }

  //渲染场景（模型已经添加到图层）
  renderScene() {
    this.locationCamera();
    this.animationFrame = this.renderFrame((function () {
      this.animationFrame = null;
      this.context && this.context.render(this.scene, this.camera);
    }).bind(this));
  }

  renderFrame(fn) {
    var render = function () {
      fn && typeof fn === "function" && fn();
    };
    return frame(render);
  }

  resize() {
    this._resetElementSize(this.container);
    this._resetElementSize(this.canvas);

    let width = this.canvas.width,
      height = this.canvas.height;

    let size = this.getMapSize();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.context.setSize(size.width, size.height);
    this.renderScene();
  }

  //创建画布、初始化渲染器、初始化相机等
  prepare() {
    if (!this.map) {
      return new Error("map object is necessary");
    }
    if (!this.canvas) {
      this._initContainer();
      this._initThreeRenderer();
      /**
       * @event ThreeLayer#rendererinitialized
       * @description rendererinitialized 事件，初始化 three 渲染器后触发。
       */
      this._layer.fire("rendererinitialized");
    } else {
      this.clear(this.context);
    }
  }

  getMapSize() {
    let container = this.map.getContainer();
    return { width: container.clientWidth, height: container.clientHeight };
  }

  cancelFrame() {
    if (this.animationFrame != null) {
      cancel(this.animationFrame);
    }
  }

  remove() {
    if (this.animationFrame != null) {
      cancel(this.animationFrame);
    }
    this.container.removeChild(this.canvas);
    this.container.parentNode.removeChild(this.container);
    this.context = null;
    this.canvas = null;
    this.container = null;
  }

  //清理画布内容
  clear(context) {
    context && context.clear && context.clear();
    context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  //计算缩放比例
  getScale(zoom) {
    let map = this.map;
    let z = zoom == null ? map.getZoom() : zoom;
    let max = projection.getResolution(projection.nativeMaxZoom),
      res = projection.getResolution(z);
    return res / max;
  }

  getCanvasContainer() {
    return this.container;
  }

  getCanvas() {
    return this.canvas;
  }


  //重新设置相机位置
  locationCamera() {
    let map = this.map;

    let size = this.getMapSize();
    let scale = map.transform.zoomScale(projection.nativeMaxZoom - map.getZoom() - 1);
    let fovRatio = Math.tan(map.transform.fov / 2 * RADIAN);

    let camera = this.camera;

    //倾斜时，相机位置低于Z轴
    let pitch = map.getPitch() * RADIAN;
    let pZ = -scale * size.height / 2 / fovRatio;
    camera.position.z = pZ * Math.cos(pitch);

    let centerPoint = Transform.lngLatToPoint(map.getCenter(), projection.nativeMaxZoom);
    let distance = Math.sin(pitch) * pZ;
    let bearing = map.getBearing() * RADIAN;
    camera.position.x = centerPoint.x + distance * Math.sin(bearing);
    camera.position.y = centerPoint.y - distance * Math.cos(bearing);

    camera.up.set(Math.sin(bearing), -Math.cos(bearing), 0);
    camera.lookAt(new THREE.Vector3(centerPoint.x, centerPoint.y, 0));

    camera.updateProjectionMatrix();
  }

  /**
   * @function ThreeLayerRenderer.prototype.toThreeShape
   * @description  创建 threejs shape 对象。
   * @param {Array} coordinates - 坐标点数组。
   * @returns {THREE.Shape} threejs shape 对象。
   */
  toThreeShape(coordinates) {
    if (!coordinates) {
      return null;
    }
    let center = this.getCoordinatesCenter(coordinates);
    let centerPoint = this.lngLatToPosition(center);
    let outer = coordinates.map(coords => this.lngLatToPosition({
      lng: coords[0],
      lat: coords[1]
    }).sub(centerPoint));

    return new Shape(outer);
  }

  /**
  * @function ThreeLayerRenderer.prototype.toThreeMesh
  * @description 创建 threejs Mesh 对象。将地理坐标转换成 threejs 3D 模型（适用于挤压模型，如城市建筑）。
  * @param {Array.<Object>} coordinates - 坐标点数组。
  * @param {number} amount - 高度。
  * @param {THREE.Material} material - Threejs 材质对象。
  * @param {boolean} [removeDuplicated] - 是否移除重复的坐标点。
  * @returns {THREE.Mesh} threejs Mesh 对象。
  */
  toThreeMesh(coordinates, amount, material, removeDuplicated) {
    if (!coordinates) {
      return null;
    }
    let coords = coordinates;
    if (removeDuplicated) {
      coords = this.removeDuplicatedCoordinates(coordinates)
    }

    let targetAmount = this.distanceToThreeVector3(amount, amount).x;
    let shape = this.toThreeShape(coords);
    let geometry = new ExtrudeGeometry(shape, {
      'amount': targetAmount,
      'bevelEnabled': true
    });
    let mesh = new Mesh(geometry, material);
    let center = this.lngLatToPosition(this.getCoordinatesCenter(coords));
    mesh.position.set(center.x, center.y, -targetAmount);
    return mesh;
  }

  /**
   * @function ThreeLayerRenderer.prototype.addObject
   * @description 设置threejs 3D 对象的坐标（经纬度）。
   * @param {THREE.Object3D} object3D - threejs 3D 对象及子类对象。
   * @param {(Array.<number>|Object)} coordinate - 添加的 three 对象坐标（经纬度）。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   */
  addObject(object3D, coordinate) {
    if (coordinate && object3D) {
      this.setPosition(object3D, coordinate);
    }
    this.renderer && this.renderer.scene.add(object3D);
  }

  /**
    * @function ThreeLayerRenderer.prototype.clearMesh
    * @description 清除所有 threejs mesh 对象。
    * @returns {ThreeLayer} ThreeLayer的实例对象。
    */
  clearMesh() {
    let scene = this.renderer.scene;
    if (!scene) {
      return this;
    }
    for (let i = scene.children.length - 1; i >= 0; i--) {
      if (scene.children[i] instanceof THREE.Mesh) {
        scene.remove(scene.children[i]);
      }
    }
    return this;
  }

  /**
       * @function ThreeLayerRenderer.prototype.clearAll
       * @description 清除所有 threejs 对象。
       * @param {boolean} clearCamera - 是否清除相机。
       * @returns {ThreeLayer} ThreeLayer的实例对象。
       */
  clearAll(clearCamera) {
    let scene = this.renderer.scene;
    if (!scene) {
      return this;
    }
    for (let i = scene.children.length - 1; i >= 0; i--) {
      if (!clearCamera && scene.children[i] instanceof THREE.Camera) {
        continue;
      }
      scene.remove(scene.children[i]);
    }
    return this;
  }

  /**
     * @function ThreeLayerRenderer.prototype.setPosition
     * @description 设置 threejs 3D 对象的坐标（经纬度）。
     * @param {THREE.Object3D} object3D - threejs 3D 对象及子类对象。
     * @param {(Array.<number>|Object)} coordinate - 添加的 three 对象坐标（经纬度）。
     * @returns {ThreeLayer} ThreeLayer的实例对象。
     */
  setPosition(object3D, coordinate) {
    if (!object3D || !coordinate) {
      return this;
    }

    var pos = this.lngLatToPosition(coordinate);
    object3D.position.set(pos.x, pos.y, pos.z);
    return this;
  }


  /**
   * @function ThreeLayerRenderer.prototype.lngLatToPosition
   * @description 经纬度转threejs 3D 矢量对象。
   * @param {(Array.<number>|Object)} lngLat - 经纬度坐标。
   * @returns {THREE.Vector3} threejs 3D 矢量对象。
   */
  lngLatToPosition(lngLat) {
    let zoom = Transform.projection.nativeMaxZoom;
    let point = Transform.lngLatToPoint(lngLat, zoom);
    return new Vector3(point.x, point.y, -0);
  }

  /**
   * @function ThreeLayerRenderer.prototype.distanceToThreeVector3
   * @description 计算距离指定坐标给定距离的新坐标的 threejs 3D 矢量对象。
   * @param {number} x - x 轴距离，单位米。
   * @param {number} y - y 轴距离，单位米。
   * @param {(Array.<number>|Object)} lngLat - 源坐标。
   * @returns {THREE.Vector3} 目标点的 threejs 3D 矢量对象。
   */
  distanceToThreeVector3(x, y, lngLat) {
    let map = this.map;

    let center = lngLat || map.getCenter(),
      maxZoom = Transform.projection.nativeMaxZoom,
      targetLngLat = Transform.locate(center, x, y);

    let point1 = Transform.lngLatToPoint(center, maxZoom),
      point2 = Transform.lngLatToPoint(targetLngLat, maxZoom);

    let targetX = Math.abs(point2.x - point1.x) * Math.sign(x);
    let targetY = Math.abs(point2.y - point1.y) * Math.sign(y);
    return new Vector3(targetX, targetY, 0);
  }

  /**
   * @function ThreeLayerRenderer.prototype.removeDuplicatedCoordinates
   * @description 移除数组中的重复坐标。
   * @param {(Array.<Array.<number>>)} coordinates - 坐标数组。
   * @returns {(Array.<Array.<number>>)} 新的坐标数组。
   */
  removeDuplicatedCoordinates(coordinates) {
    function equals(point1, point2) {
      return point1[0] === point2[0] && point1[1] === point2[1]
    }

    let coords = [].concat(coordinates);
    let length = coords.length;
    for (let i = length - 1; i >= 1; i--) {
      if (equals(coords[i], coords[i - 1])) {
        coords.splice(i, 1);
      }
    }

    let isClose = equals(coords[0], coords[coords.length - 1]);
    isClose && coords.splice(coords.length - 1, 1);
    return coords;
  }

  /**
   * @function ThreeLayerRenderer.prototype.getCoordinatesCenter
   * @description 获取给定坐标数组的中心坐标。
   * @param {(Array.<Array.<number>>)} coordinates - 坐标数组。
   * @returns {Object} 包含经纬度的坐标对象。
   */
  // 提工具
  getCoordinatesCenter(coordinates) {
    let sumX = 0, sumY = 0, count = 0;
    let i = 0, len = coordinates.length;
    for (; i < len; i++) {
      if (coordinates[i]) {
        sumX += coordinates[i][0];
        sumY += coordinates[i][1];
        count++;
      }
    }
    return {
      lng: sumX / count,
      lat: sumY / count
    };
  }

  _initContainer() {
    var canvas = this._createCanvas();
    var container = this.container = document.createElement("div");
    container.id = this._layer.id;
    container.className = "threejs-wrapper";
    container.style.position = "absolute";
    container.style.left = "0px";
    container.style.top = "0px";
    container.style.overflow = "hidden";
    this._resetElementSize(container);
    container.appendChild(canvas);

    var targetElement = this.map.getCanvasContainer();
    targetElement.appendChild(container)
  }

  _createCanvas() {
    if (this.canvas) {
      return;
    }

    const canvas = this.canvas = document.createElement('canvas');
    canvas.className = "threejs-overlay";
    canvas.style.outline = "none";
    this._resetElementSize(canvas);
    return canvas;
  }

  _resetElementSize(element) {
    if (!element) {
      return;
    }
    const size = this.getMapSize();
    const dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    const width = dpr * size.width;
    const height = dpr * size.height;

    element.width = width;
    element.height = height;
    element.style.width = size.width + 'px';
    element.style.height = size.height + 'px';
  }

  _initThreeRenderer() {
    let map = this.map;
    let size = this.getMapSize();

    let renderer = this.renderer || 'gl';
    let context;

    if (renderer === 'gl') {
      context = new WebGLRenderer({
        'canvas': this.canvas,
        'alpha': true,
        'antialias': true,
        'preserveDrawingBuffer': true
      }, this.options);
      context.autoClear = true;
      context.clear();
    } else {
      context = new CanvasRenderer(Util.extend({
        'canvas': this.canvas,
        'alpha': true
      }, this.options));
    }
    context.setClearColor(new Color(1, 1, 1), 0);
    context.canvas = this.canvas;
    this.context = context;

    let fov = map.transform.fov;
    let fovRatio = Math.tan(fov / 2 * RADIAN);
    let maxScale = this.getScale(projection.minZoom) / this.getScale(projection.nativeMaxZoom);
    let far = maxScale * size.height / 2 / fovRatio;

    this.camera = new PerspectiveCamera(fov, size.width / size.height, 1, far);
    this.scene = new Scene();
    this.scene.add(this.camera);
  }
}