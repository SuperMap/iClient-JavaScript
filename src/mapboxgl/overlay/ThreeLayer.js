/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
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
import mapboxgl from "mapbox-gl";
import {Transform, ThreeLayerRenderer} from "./threejs";

const {
    Vector3,
    Shape,
    Mesh,
    // BufferGeometry,
    ExtrudeGeometry
} = THREE;


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
 * @extends {mapboxgl.Evented}
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
export class ThreeLayer extends mapboxgl.Evented {

    //options.threeOptions是初始化threejs renderer的参数对象
    constructor(id, renderer, options) {
        super();
        this._layerId = id;
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
     * @function ThreeLayer.prototype.toThreeMesh
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
     * @description 获取threejs 场景对象
     * @returns {THREE.Scene} threejs 场景对象。
     */
    getScene() {
        return this.renderer.scene;
    }

    /**
     * @function ThreeLayer.prototype.getCamera
     * @description 获取threejs 相机。
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

    // /**
    //  * @function ThreeLayer.prototype.getObject
    //  * @description 根据条件获取添加到场景中的对象
    //  * @return {THREE.Object3D} threejs 3D 对象及子类对象。
    //  */
    // getObject(conditions) {
    //     if(!conditions){
    //         return;
    //     }
    //     var scene = this.getScene();
    //     var objects = scene.children;
    //     for(let obj of objects ){
    //         for(let condition of conditions ){
    //                 obj[condition]
    //         }
    //     }
    // }


    /**
     * @function ThreeLayer.prototype.clearMesh
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
     * @function ThreeLayer.prototype.clearAll
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
     * @function ThreeLayer.prototype.setPosition
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
     * @function ThreeLayer.prototype.lngLatToPosition
     * @description 经纬度转threejs 3D 失量对象。
     * @param {(Array.<number>|Object)} lngLat - 经纬度坐标。
     * @returns {THREE.Vector3} threejs 3D 失量对象。
     */
    lngLatToPosition(lngLat) {
        let zoom = Transform.projection.nativeMaxZoom;
        let point = Transform.lngLatToPoint(lngLat, zoom);
        return new Vector3(point.x, point.y, -0);
    }

    /**
     * @function ThreeLayer.prototype.distanceToThreeVector3
     * @description 计算距离指定坐标给定距离的新坐标的 threejs 3D 失量对象。
     * @param {number} x - x 轴距离,单位米。
     * @param {number} y - y 轴距离,单位米。
     * @param {(Array.<number>|Object)} lngLat - 源坐标。
     * @returns {THREE.Vector3} 目标点的 threejs 3D 失量对象。
     */
    distanceToThreeVector3(x, y, lngLat) {
        let map = this._map;

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
     * @function ThreeLayer.prototype.removeDuplicatedCoordinates
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
     * @function ThreeLayer.prototype.getCoordinatesCenter
     * @description 获取给定坐标数组的中心坐标。
     * @param {(Array.<Array.<number>>)} coordinates - 坐标数组。
     * @returns {Object} 包含经纬度的坐标对象。
     */
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
        //three mbgl 联动(仅联动相机,不执行重绘操作)
        me._map.on('render', this._update.bind(me));
        me._map.on('resize', this._resize.bind(me));

        me.on('render', (function () {
            this.context && this.context.render(this.scene, this.camera);
        }).bind(me.renderer));

        return this;
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
        let map = this._map, me = this;
        map.off('render', me._update.bind(me));
        map.off('resize', me._resize.bind(me));
        me.renderer.remove();
        me._map = null;
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


