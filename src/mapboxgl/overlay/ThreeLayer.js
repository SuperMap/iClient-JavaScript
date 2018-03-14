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
    BufferGeometry,
    ExtrudeGeometry
} = THREE;


/**
 * @class mapboxgl.supermap.ThreeLayer
 * @category  Visualization Three
 * @classdesc Three图层
 * @param id - {string} 图层ID。
 * @param renderer -{string} 图层渲染方式(canvas或WebGL)。取值："gl","canvas"。默认值："gl"
 * @param {object} options - 初始化参数。<br>
 * @param {object} options.threeOptions - threejs渲染器初始化参数对象。参数内容详见:
 *          [WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
 *          [CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
 *
 * @extends mapboxgl.Evented{@linkdoc-mapboxgl/#evented}
 * @example
 *  var threeLayer = new mapboxgl.supermap.ThreeLayer('three');
 *  //模型绘制
 *  threeLayer.on("initialized", draw);
 *  threeLayer.addTo(map);
 *
 *  function draw() {
 *        var scene=threeLayer.getScene();
 *            camera=threeLayer.getCamera();
 *        var light = new THREE.PointLight(0xffffff);
 *        camera.add(light);
 *        var material = new THREE.MeshPhongMaterial({color: 0xff0000});
 *        //根据坐标点转换成模型
 *        var mesh = this.toThreeMesh(feature.geometry.coordinates, 10, material, true);
 *        //模型添加到3D场景
 *        scene.add(mesh);
 *  }
 *
 * 叠加模型可以通过两种方式：<br>
 *          1.调用threeLayer.toThreeMesh直接将地理坐标转换成threejs 3D模型（适用于挤压模型，如城市建筑），然后添加到3D场景
 *          2.使用ThreeJS的接口创建好Mesh,然后调用threeLayer.setPosition设置地理位置，然后添加到3D场景
 *
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.toThreeShape
     * @description 创建threejs shape对象
     * @param coordinates 坐标点数组
     * @return THREE.Shape{@link https://threejs.org/docs/index.html#api/extras/core/Shape} threejs shape对象
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.toThreeMesh
     * @description 创建threejs Mesh对象。将地理坐标转换成threejs 3D模型（适用于挤压模型，如城市建筑）。
     * @param coordinates -{Array<Array<number>>} 坐标点数组
     * @param amount -{number} 高度
     * @param material -{THREE.Material} Threejs 材质对象。参考：[THREE.Material]{@link https://threejs.org/docs/index.html#api/extras/core/Material}
     * @param removeDuplicated -{Boolean} 是否移除重复的坐标点
     * @return {THREE.Mesh} threejs Mesh对象。参考：[THREE.Mesh]{@link https://threejs.org/docs/index.html#api/objects/Mesh}
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
        let bufferGeometry = new BufferGeometry().fromGeometry(geometry);
        let mesh = new Mesh(bufferGeometry, material);
        let center = this.lngLatToPosition(this.getCoordinatesCenter(coords));
        mesh.position.set(center.x, center.y, -targetAmount);
        return mesh;
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.addObject
     * @description 设置threejs 3D对象的坐标（经纬度）
     * @param object3D -{THREE.Object3D} threejs 3D对象。参考：[THREE.Object3D]{@link https://threejs.org/docs/index.html#api/core/Object3D}及子类对象
     * @param coordinate -{Array<number>|Object} 添加的three对象坐标（经纬度）
     * @return {this} this
     */
    addObject(object3D, coordinate) {
        if (coordinate && object3D) {
            this.setPosition(object3D, coordinate);
        }
        this.renderer && this.renderer.scene.add(object3D);
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.getScene
     * @description 获取threejs 场景对象
     * @return {THREE.Scene} threejs 场景对象,参考：[THREE.Scene]{@link https://threejs.org/docs/index.html#api/scenes/Scene}
     */
    getScene() {
        return this.renderer.scene;
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.getCamera
     * @description 获取threejs 相机
     * @return {THREE.Camera} threejs 相机。参考：[THREE.Camera]{@link https://threejs.org/docs/index.html#api/cameras/Camera}
     */
    getCamera() {
        return this.renderer.camera;
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.getThreeRenderer
     * @description 获取threejs renderer
     * @return {THREE.WebGLRenderer|THREE.CanvasRenderer} threejs renderer。参考：
     *                      [THREE.WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
     *                      [THREE.CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
     */
    getThreeRenderer() {
        return this.renderer.context;
    }

    // /**
    //  * @function mapboxgl.supermap.ThreeLayer.prototype.getObject
    //  * @description 根据条件获取添加到场景中的对象
    //  * @return {THREE.Object3D} threejs 3D对象。参考：[THREE.Object3D]{@link https://threejs.org/docs/index.html#api/core/Object3D}及子类对象
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.clearMesh
     * @description 清除所有threejs mesh对象
     * @return {this} this
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.clearAll
     * @description 清除所有threejs 对象
     * @param clearCamera -{boolean} 是否同时清除相机
     * @return {this} this
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.setPosition
     * @description 设置threejs 3D对象的坐标（经纬度）
     * @param object3D -{THREE.Object3D} threejs 3D对象，参考：[THREE.Object3D]{@link https://threejs.org/docs/index.html#api/core/Object3D}及子类对象
     * @param coordinate -{Array<number>|Object} 添加的three对象坐标（经纬度）
     * @return {this} this
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.lngLatToPosition
     * @description 经纬度转threejs 3D失量对象
     * @param lngLat -{Array<number>|Object} 经纬度坐标
     * @return {THREE.Vector3} threejs 3D失量对象。参考：[THREE.Vector3]{@link https://threejs.org/docs/index.html#api/math/Vector3}
     */
    lngLatToPosition(lngLat) {
        let zoom = Transform.projection.nativeMaxZoom;
        let point = Transform.lngLatToPoint(lngLat, zoom);
        return new Vector3(point.x, point.y, -0);
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.distanceToThreeVector3
     * @description 计算距离指定坐标给定距离的新坐标的threejs 3D失量对象
     * @param x -{number} x轴距离,单位米
     * @param y -{number} y轴距离,单位米
     * @param lngLat -{Array<number>|Object} 源坐标
     * @return {THREE.Vector3} 目标点的threejs 3D失量对象。参考：[THREE.Vector3]{@link https://threejs.org/docs/index.html#api/math/Vector3}
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.removeDuplicatedCoordinates
     * @description 移除数组中的重复坐标
     * @param coordinates -{Array<Array<number>>} 坐标数组
     * @return {Array<Array<number>>} 新的坐标数组
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.getCoordinatesCenter
     * @description 获取给定坐标数组的中心坐标
     * @param coordinates -{Array<Array<number>>} 坐标数组
     * @return {Object} 包含经纬度的坐标对象
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.addTo
     * @description 添加图层到地图
     * @param map -{Object} 地图对象
     * @return {this} this
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
     * @function mapboxgl.supermap.ThreeLayer.prototype.getCanvasContainer
     * @description 获取three图层容器
     * @return {HTMLElement} three图层的容器
     */
    getCanvasContainer() {
        return this.renderer.getCanvasContainer();
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.getCanvas
     * @description 获取three图层画布
     * @return {HTMLCanvasElement} three图层画布
     */
    getCanvas() {
        return this.renderer.getCanvas();
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.remove
     * @description 移除图层
     */
    remove() {
        let map = this._map, me = this;
        map.off('move', me._update.bind(me));
        map.off('resize', me._resize.bind(me));
        me.renderer.remove();
        me._map = null;
    }

    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.draw
     * @description 提供给外部的threejs模型绘制接口
     * @param gl -{THREE.WebGLRenderer|THREE.CanvasRenderer}  threejs 渲染器上下文 。详情请参考：
     *          [WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
     *          [CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
     * @param scene -{THREE.Scene} threejs 场景对象。详情请参考：[THREE.Scene]{@link https://threejs.org/docs/index.html#api/scenes/Scene}
     * @param camera -{THREE.Camera} threejs 相机对象。详情请参考：[THREE.Camera]{@link https://threejs.org/docs/index.html#api/cameras/Camera}
     * @return {this} this
     * @example
     *  var threeLayer = new mapboxgl.supermap.ThreeLayer('three');
     *  //可以通过重写draw实现模型绘制
     *  threeLayer.draw = function (gl, scene, camera) {
     *        //TODO 绘制操作
     *  }
     *  threeLayer.addTo(map);
     */
    draw(gl, scene, camera) {// eslint-disable-line no-unused-vars
        return this;
    }


    /**
     * @function mapboxgl.supermap.ThreeLayer.prototype.renderScene
     * @description 渲染场景
     * @return {this} this
     */
    renderScene() {
        this.renderer.renderScene();
        /**
         * renderScene 事件，场景渲染后触发
         * @event mapboxgl.supermap.ThreeLayer#renderScene
         * @type {Object}
         * @property {string} type  - renderScene
         * @property {Object} target  - layer
         */
        this.fire("renderScene");
        return this;
    }

    _resize() {
        this.renderer.resize();
    }

    _update() {
        /**
         * render事件，地图渲染时(地图状态改变时)触发
         * @event mapboxgl.supermap.ThreeLayer#render
         * @type {Object}
         * @property {string} type  - render
         * @property {Object} target  - layer
         */
        this.renderScene();
        this.fire('render');
        return this;
    }
}


mapboxgl.supermap.ThreeLayer = ThreeLayer;