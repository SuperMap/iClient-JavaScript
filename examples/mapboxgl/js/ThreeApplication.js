/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.*/
var ThreeApplication = {
    data: null,
    buildingMesh: null,
    buildingRoofMesh: null,
    terrainMesh: null,

    rooms: [],
    buildingView: null,
    modelOpacity: 0.4,

    register: function (renderer, scene, camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        return this;
    },

    //threeLayer主要用来设置模型在地图上位置
    setTargetLayer: function (threeLayer) {
        this.threeLayer = threeLayer;
        return this;
    },
    setPosition: function (position) {
        this.position = position;
        return this;
    },

    start: function () {
        //程序入口开始
        SceneBuilder.preLoader(ThreeApplication).load();
    }

};


var SceneBuilder = {
    //预加载模型数据
    preLoader: function (app) {

        var manager, slowLoopIntervalId, is3DDataLoaded = false;

        function loadData(onComplete) {
            var url = '../data/ThreeBuildingData.json';
            $.ajax({
                dataType: 'json',
                url: url,
                success: function (result) {
                    app.data = new DataProcessor(result);
                    onComplete();
                },
                error: function (jqXHR, status, errorThrown) {
                    console.log(status, errorThrown);
                }
            });
        }

        function loadResources() {
            manager = new THREE.LoadingManager();
            manager.onProgress = function (item, loaded, total) {

            };

            manager.onLoad = function () {
                is3DDataLoaded = true;
            };
            loadBuildingModel();
            loadRooms();
        }

        function loadBuildingModel() {

            var loader = new THREE.JSONLoader(manager);
            loader.setTexturePath('./js/obj/building/maps/');
            loader.load('./js/obj/building/building.js', function (geometry, materials) {
                    var material = new THREE.MultiMaterial(materials);
                    for (var i = 0; i < materials.length; i++) {
                        materials[i].transparent = true;
                        materials[i].vertexColors = THREE.FaceColors;
                    }

                    scaleGeometry(geometry);

                    for (var i = 0; i < geometry.faces.length; i++) {
                        geometry.faces[i].color = new THREE.Color(0x08acff);
                        geometry.colorsNeedUpdate = true;
                    }
                    app.buildingMesh = new THREE.Mesh(geometry, material);
                    app.buildingMesh.geometry.computeBoundingSphere();
                }
            );

            var loader = new THREE.JSONLoader(manager);
            loader.load('./js/obj/building/building-roof.js', function (geometry, materials) {
                var material = new THREE.MultiMaterial(materials);
                for (var i = 0; i < materials.length; i++) {
                    materials[i] = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        transparent: true,
                        polygonOffset: true,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1
                    });
                }
                scaleGeometry(geometry);
                app.buildingRoofMesh = new THREE.Mesh(geometry, material);
            });
        }

        function loadRooms() {

            var roomData = app.data.locations;

            for (var i = 0; i < roomData.length; i++) {
                loadRoom(roomData[i]);
            }

            function loadRoom(data) {
                var name = data.name,
                    slug = data.slug,
                    loader = new THREE.JSONLoader(manager);

                loader.load("./js/" + data.objRoom, function (geometry, materials) {
                    var material = new THREE.MeshPhongMaterial({
                        color: 0xffffff
                    });
                    scaleGeometry(geometry);
                    var mesh = new THREE.Mesh(geometry, material);
                    var room = new InteractiveModel(mesh, name, slug);
                    room.setEmissiveDefault(0x333333);
                    room.unmark();
                    app.rooms.push(room);
                });
            }
        }

        function scaleGeometry(geometry) {

            var transform = new THREE.Matrix4(),
                scale = new THREE.Matrix4(),
                translate = new THREE.Matrix4();
            scale.makeScale(0.2, 0.2, 0.2);
            translate.makeTranslation(32.57, 0, 30);
            transform.multiplyMatrices(scale, translate);
            geometry.applyMatrix(transform);
        }

        function waitForLoading() {
            slowLoopIntervalId = setInterval(function () {
                if (is3DDataLoaded) {
                    is3DDataLoaded = false;
                    SceneBuilder.viewBuilder(app).build();
                    clearInterval(slowLoopIntervalId);
                }
            }, 500);
        }

        this.load = function () {
            loadData(function () {
                loadResources();
            });
            waitForLoading();
        };
        return this;
    },

    //构建模型场景
    viewBuilder: function (app) {
        this.build = function () {
            app.buildingView = app.buildingView || new BuildingView(app);
            var buildingView = app.buildingView;
            buildingView.setOpacity(app.modelOpacity);
        };
        return this;
    }
};

//数据处理器
function DataProcessor(data) {

    var locationBySlug = {},
        witnessBySlug = {},

        locations = data.locations,
        witnesses = data.witnesses,

        location,
        witness,
        i;


    for (i = 0; i < locations.length; i++) {
        location = locations[i];
        locationBySlug[location.slug] = location;
    }

    for (i = 0; i < witnesses.length; i++) {
        witness = witnesses[i];
        witnessBySlug[witness.slug] = witness;
    }

    return {
        locations: locations,
        witnesses: witnesses,
        locationBySlug: locationBySlug,
        witnessBySlug: witnessBySlug
    }

}

//可交互对象(建筑和房间)
function InteractiveModel(mesh, name, slug, labelOffset) {

    var object3D = null,
        center = null;

    var scale = 1;

    var emissiveDefault = 0x000000,
        emissiveHighlight = 0xff0000,
        isDoubleSide = true,
        opacityDefault = 1.0,
        opacityHighLight = 1.0;


    build3D();
    calculateCenter();

    function build3D() {

        object3D = mesh;
        object3D.name = slug;

        opacityDefault = object3D.material.opacity;
        opacityHighLight = object3D.material.opacity;

        if (object3D.material.length > 1) {
            for (var i = 0; i < object3D.material.length; i++) {
                setMaterial(object3D.material[i]);
            }
        } else {
            setMaterial(object3D.material);
        }

        function setMaterial(material) {
            material.side = THREE.DoubleSide;
            material.emissive.setHex(emissiveDefault);
            material.polygonOffset = true;
            material.polygonOffsetFactor = -2;
            material.polygonOffsetUnits = 1;
            material.needsUpdate = true;
        }
    }

    function calculateCenter() {
        mesh.geometry.computeBoundingBox();
        center = new THREE.Vector3();
        center.addVectors(
            mesh.geometry.boundingBox.min,
            mesh.geometry.boundingBox.max
        );
        center.divideScalar(2);
    }


    function getName() {
        return name;
    }

    function getSlug() {
        return slug;
    }


    function getCenter() {
        calculateCenter();
        return center;
    }

    function mark() {
        object3D.material.emissive.setHex(emissiveHighlight);
        object3D.material.opacity = opacityHighLight;
        object3D.material.needsUpdate = true;
    }

    function unmark() {
        object3D.material.emissive.setHex(emissiveDefault);
        object3D.material.opacity = opacityDefault;
        object3D.material.needsUpdate = true;
    }

    function setEmissiveDefault(hex) {
        emissiveDefault = hex;
    }

    function setDoubleSide(bool) {
        isDoubleSide = bool;
        object3D.material.side = (bool) ? THREE.DoubleSide : THREE.FrontSide;
        object3D.material.needsUpdate = true;
    }

    function setHighlightOpacity(val) {
        opacityHighLight = val;
    }

    return {
        object3D: object3D,
        getCenter: getCenter,
        getName: getName,
        mark: mark,
        unmark: unmark,
        scale: scale,
        setEmissiveDefault: setEmissiveDefault,
        setDoubleSide: setDoubleSide,
        setHighlightOpacity: setHighlightOpacity
    }

}

//添加three场景，添加模型
function BuildingView(app) {

    var renderer, camera, scene,

        buildingMesh,
        roofMesh,
        roofEdgeHelper,
        rooms, roomsGroup,

        raycaster;


    init();


    function init() {
        renderer = app.renderer;
        camera = app.camera;
        scene = app.scene;

        buildingMesh = app.buildingMesh;
        roofMesh = app.buildingRoofMesh;
        rooms = app.rooms;

        initScene();
        addObjects();
    }

    function initScene() {
        raycaster = app.raycaster = new THREE.Raycaster();
    }

    function addObjects() {

        // building
        correctionObject3D(buildingMesh);
        scene.add(buildingMesh);

        // line helper (building)
        var edgeHelper = new THREE.EdgesHelper(buildingMesh, 0x02f7f8, 1);
        edgeHelper.material.linewidth = 10;
        correctionObject3D(edgeHelper);
        scene.add(edgeHelper);

        // roof
        var materials = roofMesh.material.materials;
        for (var i = 0; i < materials.length; i++) {
            materials[i].transparent = true;
        }
        roofMesh.renderOrder = 1;
        correctionObject3D(roofMesh);
        scene.add(roofMesh);

        // line helper (roof)
        roofEdgeHelper = new THREE.EdgesHelper(roofMesh, 0x02f7f8, 20);
        roofEdgeHelper.material.transparent = true;
        roofEdgeHelper.material.opacity = 0.2;
        roofEdgeHelper.material.linewidth = 1;
        roofEdgeHelper.renderOrder = 1;

        correctionObject3D(roofEdgeHelper);
        scene.add(roofEdgeHelper);

        // rooms
        roomsGroup = new THREE.Object3D();

        for (var i = 0; i < rooms.length; i++) {
            roomsGroup.add(rooms[i].object3D);
        }
        correctionObject3D(roomsGroup);
        scene.add(roomsGroup);
    }

    function correctionObject3D(obj3D) {
        obj3D.rotation.x = -Math.PI / 2;
        obj3D.rotation.y = Math.PI / 7;
        obj3D.scale.set(16, 16, 16);
        app.threeLayer.setPosition(obj3D, app.position);
    }


    this.setOpacity = function (val) {

        var materials = buildingMesh.material.materials;
        for (var i = 0; i < materials.length; i++) {
            materials[i].opacity = 0.1 + val * (1 - 0.15);
            materials[i].needsUpdate = true;
        }

        // roof
        materials = roofMesh.material.materials;
        for (var i = 0; i < materials.length; i++) {
            materials[i].opacity = val * val * 1.1;
            materials[i].needsUpdate = true;
        }
        roofEdgeHelper.material.opacity = val * val * 0.2;
        roofEdgeHelper.material.needsUpdate = true;
    };
}