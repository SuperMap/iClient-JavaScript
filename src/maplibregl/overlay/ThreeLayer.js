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
import maplibregl from "maplibre-gl";
import { ThreeLayerRenderer } from "@supermap/iclient-common/overlay/threejs/ThreeLayerRenderer";

/**
 * @class ThreeLayer
 * @category  Visualization Three
 * @classdesc Three 图层。
 * @param {string} id - 图层 ID。
 * @param {string} [renderer="gl"] - 图层渲染方式( canvas 或 WebGL )。取值："gl","canvas"。
 * @param {Object} options - 初始化参数。
 * @param {Object} options.threeOptions - threejs 渲染器初始化参数对象。参数内容详见:
 *          {@link THREE.WebGLRenderer}
 *          {@link THREE.CanvasRenderer}。
 *
 * @extends {maplibregl.Evented}
 * @fires ThreeLayer#render
 * @fires ThreeLayer#renderscene
 * @example
 * var threeLayer = new ThreeLayer('three');
 * //模型绘制
 * threeLayer.on("initialized", draw);
 * threeLayer.addTo(map);
 *
 * function draw() {
 *    var scene=threeLayer.getScene();
 *    camera=threeLayer.getCamera();
 *    var light = new THREE.PointLight(0xffffff);
 *    camera.add(light);
 *    var material = new THREE.MeshPhongMaterial({color: 0xff0000});
 *    //根据坐标点转换成模型
 *    var mesh = this.toThreeMesh(feature.geometry.coordinates, 10, material, true);
 *    //模型添加到3D场景
 *    scene.add(mesh);
 * }
 *
 * 叠加模型可以通过两种方式：</br>
 *     1.调用 threeLayer.toThreeMesh 直接将地理坐标转换成 threejs 3D 模型（适用于挤压模型，如城市建筑），然后添加到 3D 场景
 *     2.使用 ThreeJS 的接口创建好 Mesh,然后调用 threeLayer.setPosition 设置地理位置，然后添加到 3D 场景
 *
 * @usage
 */
export class ThreeLayer extends maplibregl.Evented {

  //options.threeOptions是初始化threejs renderer的参数对象
  constructor(id, renderer, options) {
    super();
    this.type = 'custom';
    this.renderingMode = '3d';
    this.id = id;
    this.options = options;
    let threeOptions = options && options.threeOptions;
    this.renderer = new ThreeLayerRenderer(this, renderer, threeOptions);
  }

  /**
   * @function ThreeLayer.prototype.toThreeShape
   * @description  创建 threejs shape 对象。
   * @param {Array} coordinates - 坐标点数组。
   * @returns {THREE.Shape} threejs shape 对象。
   */
  toThreeShape(coordinates) {
    return this.renderer.toThreeShape(coordinates);
  }

  /**
   * @function ThreeLayer.prototype.toThreeMesh
   * @description 创建 threejs Mesh 对象。将地理坐标转换成 threejs 3D 模型（适用于挤压模型，如城市建筑）。
   * @param {Array.<Object>} coordinates - 坐标点数组。
   * @param {number} amount - 高度。
   * @param {THREE.Material} material - Threejs 材质对象。
   * @param {boolean} [removeDuplicated] - 是否移除重复的坐标点。
   * @returns {THREE.Mesh} threejs Mesh 对象。
   */
  toThreeMesh(coordinates, amount, material, removeDuplicated) {
    return this.renderer.toThreeMesh(coordinates, amount, material, removeDuplicated);
  }

  /**
   * @function ThreeLayer.prototype.addObject
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
   * @function ThreeLayer.prototype.getScene
   * @description 获取 threejs 场景对象。
   * @returns {THREE.Scene} threejs 场景对象。
   */
  getScene() {
    return this.renderer.scene;
  }

  /**
   * @function ThreeLayer.prototype.getCamera
   * @description 获取 threejs 相机。
   * @returns {THREE.Camera} threejs 相机。
   */
  getCamera() {
    return this.renderer.camera;
  }

  /**
   * @function ThreeLayer.prototype.getThreeRenderer
   * @description 获取 threejs renderer。
   * @returns {THREE.WebGLRenderer|THREE.CanvasRenderer} threejs renderer。
   */
  getThreeRenderer() {
    return this.renderer.context;
  }

  /**
   * @function ThreeLayer.prototype.clearMesh
   * @description 清除所有 threejs mesh 对象。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   */
  clearMesh() {
    this.renderer.clearMesh();
    return this;
  }

  /**
   * @function ThreeLayer.prototype.clearAll
   * @description 清除所有 threejs 对象。
   * @param {boolean} clearCamera - 是否清除相机。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   */
  clearAll(clearCamera) {
    this.renderer.clearAll(clearCamera);
    return this;
  }

  /**
   * @function ThreeLayer.prototype.setPosition
   * @description 设置 threejs 3D 对象的坐标（经纬度）。
   * @param {THREE.Object3D} object3D - threejs 3D 对象及子类对象。
   * @param {(Array.<number>|Object)} coordinate - 添加的 three 对象坐标（经纬度）。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   */
  setPosition(object3D, coordinate) {
    return this.renderer.setPosition(object3D, coordinate);
  }


  /**
   * @function ThreeLayer.prototype.lngLatToPosition
   * @description 经纬度转threejs 3D 矢量对象。
   * @param {(Array.<number>|Object)} lngLat - 经纬度坐标。
   * @returns {THREE.Vector3} threejs 3D 矢量对象。
   */
  lngLatToPosition(lngLat) {
    return this.renderer.lngLatToPosition(lngLat);
  }

  /**
   * @function ThreeLayer.prototype.distanceToThreeVector3
   * @description 计算距离指定坐标给定距离的新坐标的 threejs 3D 矢量对象。
   * @param {number} x - x 轴距离，单位米。
   * @param {number} y - y 轴距离，单位米。
   * @param {(Array.<number>|Object)} lngLat - 源坐标。
   * @returns {THREE.Vector3} 目标点的 threejs 3D 矢量对象。
   */
  distanceToThreeVector3(x, y, lngLat) {
    let map = this._map;
    let center = lngLat || map.getCenter();
    return this.renderer.distanceToThreeVector3(x, y, center);
  }

  /**
   * @function ThreeLayer.prototype.removeDuplicatedCoordinates
   * @description 移除数组中的重复坐标。
   * @param {(Array.<Array.<number>>)} coordinates - 坐标数组。
   * @returns {(Array.<Array.<number>>)} 新的坐标数组。
   */
  removeDuplicatedCoordinates(coordinates) {
    this.renderer.removeDuplicatedCoordinates(coordinates);
  }

  /**
   * @function ThreeLayer.prototype.getCoordinatesCenter
   * @description 获取给定坐标数组的中心坐标。
   * @param {(Array.<Array.<number>>)} coordinates - 坐标数组。
   * @returns {Object} 包含经纬度的坐标对象。
   */
  // 提工具
  getCoordinatesCenter(coordinates) {
    return this.renderer.getCoordinatesCenter(coordinates);
  }

  onAdd(map) {
    this.addTo(map)
  }

  /**
   * @function ThreeLayer.prototype.addTo
   * @description 添加图层到地图。
   * @param {Object} map - 地图对象。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   */
  addTo(map) {
    var me = this;
    me._map = map;
    me.renderer.setMap(map);
    me.renderer.render();
    // me._map.on('render', this._update.bind(me));
    // me._map.on('resize', this._resize.bind(me));
    me.on('render', (function () {
      this.context && this.context.render(this.scene, this.camera);
    }).bind(me.renderer));
    return this;
  }

  render() {
    this._update();
  }

  /**
   * @function ThreeLayer.prototype.getCanvasContainer
   * @description 获取 three 图层容器。
   * @returns {HTMLElement} three 图层的容器。
   */
  getCanvasContainer() {
    return this.renderer.getCanvasContainer();
  }

  /**
   * @function ThreeLayer.prototype.getCanvas
   * @description 获取 three 图层画布。
   * @returns {HTMLCanvasElement} three 图层画布。
   */
  getCanvas() {
    return this.renderer.getCanvas();
  }

  /**
   * @function ThreeLayer.prototype.remove
   * @description 移除图层。
   */
  remove() {
    this.renderer.remove();
    this._map = null;
  }

  /**
   * @function ThreeLayer.prototype.draw
   * @description 提供给外部的 threejs 模型绘制接口。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   * @example
   * var threeLayer = new ThreeLayer('three');
   * //可以通过重写 draw 实现模型绘制
   * threeLayer.draw = function (gl, scene, camera) {
   *     //TODO 绘制操作
   * }
   * threeLayer.addTo(map);
   */
  draw() {
    return this;
  }


  /**
   * @function ThreeLayer.prototype.renderScene
   * @description 渲染场景。
   * @returns {ThreeLayer} ThreeLayer的实例对象。
   */
  renderScene() {
    this.renderer.renderScene();
    /**
     * @event ThreeLayer#renderscene
     * @description renderScene 事件，场景渲染后触发。
     */
    this.fire("renderscene");
    return this;
  }

  _resize() {
    this.renderer.resize();
  }

  _update() {
    /**
     * @event ThreeLayer#render
     * @description render 事件，地图渲染时(地图状态改变时)触发。
     */
    this.renderScene();
    this.fire('render');
    return this;
  }
}


