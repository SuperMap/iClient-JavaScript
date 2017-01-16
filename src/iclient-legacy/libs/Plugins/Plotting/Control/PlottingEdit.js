/**
 * @requires SuperMap/Control/DragFeature.js
 * @requires SuperMap/Control/SelectFeature.js
 */

/**
 * Class: SuperMap.Control.PlottingEdit
 * 鼠标编辑动态标绘标号类。该控件激活时，单击即可选中标号，被选中的标号将显示其控制点及比例点，拖拽这些点以编辑标号，拖拽符号本身平移标号。
 *
 * 通过 active 和 deactive 两个方法，实现动态的激活和注销。
 * * 激活控件，方法如下:
 * (code)
 * plottingEdit.activate();
 * (end)
 *
 * 注销控件，方法如下：
 * (code)
 * plottingEdit.deactivate();
 * (end)
 *
 * Inherits From:
 *  - <SuperMap.Control>
 */
SuperMap.Control.PlottingEdit = SuperMap.Class(SuperMap.Control, {

    /**
     * Constant: EVENT_TYPES
     * 支持的事件类型:
     *  - *beforefeaturemodified* 当图层上的要素（标号）开始编辑前触发该事件。
     *  - *featuremodified* 当图层上的要素（标号）编辑时触发该事件。
     *  - *afterfeaturemodified* 当图层上的要素（标号）编辑完成时，触发该事件。
     */
    EVENT_TYPES: ["beforefeaturemodified", "featuremodified", "afterfeaturemodified"],

    /**
     * APIProperty: clickout
     * {Boolean} 是否在要素区域外点击鼠标，取消选择要素。默认为true。
     */
    clickout: true,

    /**
     * APIProperty: controlPointsStyle
     * {Object} 控制点风格。
     *
     * controlPointsStyle的可设属性如下：
     * fillColor - {String} 十六进制填充颜色，默认为"#ee9900"。
     * fillOpacity - {Number} 填充不透明度。默认为0.4。
     * strokeColor - {String} 十六进制描边颜色。
     * strokeOpacity - {Number} 描边的不透明度(0-1),默认为1.0。
     * strokeWidth - {Number} 像素描边宽度，默认为1。
     * pointRadius - {Number} 像素点半径，默认为6
     */
    controlPointsStyle: null,

    /**
     * APIProperty: scalePointsStyle
     * {Object} 比例点 style。
     *
     * scalePointsStyle的可设属性如下：
     * fillColor - {String} 十六进制填充颜色，默认为"#ffff00"。
     * fillOpacity - {Number} 填充不透明度。默认为1.0。
     * strokeColor - {String} 十六进制描边颜色，默认为"#ffff00"。
     * strokeOpacity - {Number} 描边的不透明度(0-1),默认为1.0。
     * strokeWidth - {Number} 像素描边宽度，默认为1。
     * pointRadius - {Number} 像素点半径，默认为6
     */
    scalePointsStyle: null,

    /**
     * APIProperty: isAddPoint
     * {Boolean} 是否添加点.
     */
    isAddPoint: false,

    /**
     * Property: editControlPoint
     * {Integer} 编辑节点的标记
     */
    editControlPoint: false,

    startRotate: false,
    oldGeometryAngle: 0,

    /**
     * APIProperty: featureHighlightColor
     * {Integer} 不可编辑时标号高亮颜色
     */
    featureHighlightColor: "0000ff",

    /**
     * APIProperty: featureHighlightColor
     * {Integer} 不可编辑时标号高亮颜色
     */
    featureHighlightOpacity: 0.8,

    /**
     * Property: defaultControlPointStyle
     * {Boolean} 控制点默认 style。
     */
    defaultControlPointStyle: {
        fillColor: "#00ff00",
        fillOpacity: 1,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 1,
        pointRadius: 6
    },

    /**
     * Property: defaultScalePointStyle
     * {Boolean} 控制点默认 style。
     */
    defaultScalePointStyle: {
        fillColor: "#ffff00",
        fillOpacity: 1,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 1,
        pointRadius: 6
    },

    /**
     * Property: defaultRotatePointStyle
     * {Boolean} 控制点默认 style。
     */
    defaultRotatePointStyle: {
        fillColor: "#ff0000",
        fillOpacity: 1,
        strokeColor: "#ff0000",
        strokeOpacity: 1,
        strokeWidth: 1,
        pointRadius: 6
    },

    /**
     * Property: unEditBoxStyle
     * {Style} 不可编辑时包围盒风格。
     */
    unEditBoxStyle :{
        //fillColor: "#ee9900",
        fillColor: "#0000ff",
        fillOpacity: 0.3,
        strokeColor: "#0000ff",
        strokeOpacity: 0.5,
        strokeWidth: 1
    },
    /**
     * Property: controlPoints
     * 标号的控制点
     */
    controlPoints: [],

    /**
     * Property: controlPoints
     * 线面标号的比例点
     */
    scalePoints: [],

    /**
     * Property: controlPoints
     * 标号的手柄编辑节点
     */
    handlePoints: [],
    /**
     * Property: rotatePoints
     * 线面标号的旋转点
     */
    rotatePoints: [],

    /**
     * Property: unEditBox
     * 标号不可编辑时的包围框
     */
    unEditBox: null,

    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>}
     */
    layer: null,

    /**
     * Property: feature
     * {<SuperMap.Feature.Vector>} Feature（plotting symbol）currently available for modification.
     */
    feature: null,

    /**
     * Property: selectControl
     * {<SuperMap.Control.SelectFeature>}
     */
    selectControl: null,

    /**
     * Property: dragControl
     * {<SuperMap.Control.DragFeature>}
     */
    dragControl: null,

    /**
     * Property: modified
     * {Boolean} The currently selected feature has been modified.
     */
    modified: false,

    /**
     * Property: dragStartScale
     * {float} 拖拽开始的缩放比例.
     */
    dragStartScale: null,

    /**
     * Property: dragStartRotate
     * {float} 拖拽开始的旋转角度.
     */
    dragStartRotate: null,

    /**
     * Property: lastDownTime
     * {float} 上一次编辑的时间.
     */
    lastDownTime:0,

    /**
     * Property: addPointIndex
     * {Integer} 添加点的索引.
     */
    addPointIndex: -1,

    /**
     * Property: addPointFeature
     * {<SuperMap.Feature.Vector>} 添加点的临时Feature.
     */
    addPointFeature: -1,

    /**
     * Property: tolerancePixel
     * {Integer} 添加点容限.
     */
    tolerancePixel: 10,

    /**
     * Constructor: SuperMap.Control.PlottingEdit
     * 创建该控件的新实例。
     *
     * Parameters:
     * layer - {<SuperMap.Layer.PlottingLayer>} 执行编辑的图层。
     * options - {Object} 设置该类开放的属性值。
     *
     * 创建 PlottingEdit 控件新实例的方法如下所示：
     * (start code)
     * //定义一个矢量图层 vectorLayer 进行符号的编辑
     * var plottingLayer = new SuperMap.Layer.PlottingLayer("plottingLayer");
     * //实例化一个 plottingEdit 控件
     * var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
     * //地图上添加控件
     * map.addControl(plottingEdit);
     * //激活 plottingEdit 控件
     * plottingEdit.activate();
     * (end)
     */
    initialize: function (layer, options) {
        options = options || {};
        this.layer = layer;
        this.layer.plottingEdit = this;
        this.controlPoints = [];
        this.scalePoints = [];
        this.handlePoints = [];
        this.rotatePoints = [];
        SuperMap.Control.prototype.initialize.apply(this, [options]);

        var control = this;

        // configure the select control
        var selectOptions = {
            clickout: this.clickout,
            toggle: false,
            onBeforeSelect: this.beforeSelectFeature,
            onSelect: this.selectFeature,
            onUnselect: this.unselectFeature,
            //box:true,
            scope: this,
            callbacks: {
                over: function (feature, evt) {
                    control.selectOverFeature.apply(control, [feature, evt]);
                }
            }
        };
        this.selectControl = new SuperMap.Control.SelectFeature(
            layer, selectOptions
        );
        // configure the drag control
        var dragOptions = {
            onStart: function (feature, pixel) {
                control.dragStart.apply(control, [feature, pixel]);
            },
            onDrag: function (feature, pixel) {
                control.dragControlPoint.apply(control, [feature, pixel]);
            },
            onComplete: function (feature, pixel) {
                control.dragComplete.apply(control, [feature, pixel]);
            },
            dragCallbacks: {
                up: function(pixel){
                    control.upFeature.apply(control, [pixel]);
                },
                move: function(pixel){
                    control.moveFeature.apply(control, [pixel]);
                }
            },
            featureCallbacks: {
                over: function (feature, evt) {
                    control.overFeature.apply(control, [feature, evt]);
                    //control.dragControl.overFeature.apply(
                    //    control.dragControl, [feature]);
                }
            }
        };
        this.dragControl = new SuperMap.Control.DragFeature(
            layer, dragOptions
        );

        this.layer.events.register("moveend", this, this.layerMoveEnd);
        layer.plottingEdit = this;

        this.layer.events.register("featuremodified", this, this.resetControlPointsValue);

    },

    /**
     * Method: destroy
     * 图层缩放 重新计算控制点
     */
    layerMoveEnd: function(){
        this.resetControlPoints();
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放空间。
     */
    destroy: function () {
        this.controlPoints = [];
        this.scalePoints = [];
        this.handlePoints=[];
        this.rotatePoints  = [];
        this.layer = null;
        this.clickout = true;
        this.modified = false;
        this.dragStartScale = null;
        this.dragStartRotate = null;
        this.controlPointsStyle = null;
        this.scalePointsStyle = null;
        this.selectControl.destroy();
        this.dragControl.destroy();

        SuperMap.Control.prototype.destroy.apply(this, []);
    },

    /**
     * APIMethod: activate
     * 激活该控件。
     *
     * Returns:
     * {Boolean} 激活控件是否成功。
     */
    activate: function () {
        if(!this.layer.isLocked){
            return (this.selectControl.activate() &&
            SuperMap.Control.prototype.activate.apply(this, arguments));
        }
        else {
            this.clearSelectFeatures();
            return false;
        }
    },

    /**
     * APIMethod: deactivate
     * 取消激活控件，使其不可用。
     *
     * Returns:
     * {Boolean} 返回操作是否成功。
     */
    deactivate: function () {
        if(this.editControlPoint)
        {
            if(this.feature === null)return ;
            //this.feature.geometry.editMode = false;
            this.editControlPoint = false;

            var feature = this.feature;
            this.unselectFeature();

            this.selectFeature(feature);
            return true;
        }
        var deactivated = false;
        // the return from the controls is unimportant in this case
        if (SuperMap.Control.prototype.deactivate.apply(this, arguments)) {
            var features = [];
            features = features.concat(this.controlPoints);
            features = features.concat(this.scalePoints);
            features = features.concat(this.rotatePoints);
            features = features.concat(this.handlePoints);
            this.layer.removeFeatures(features, {silent: true});

            this.controlPoints = [];
            this.scalePoints = [];
            this.rotatePoints = [];
            this.handlePoints = [];
            this.dragControl.deactivate();
            var feature = this.feature;
            var valid = feature && feature.geometry && feature.layer;

            if (valid) {
                this.selectControl.unselect.apply(this.selectControl,
                    [feature]);
            }
            this.selectControl.deactivate();

            deactivated = true;
        }
        return deactivated;
    },

    /**
     * Method: deleteSelectFeature
     * 删除标绘扩展符号 (选中)
     *
     * Returns:
     * {Boolean} 返回操作是否成功。
     */
    deleteSelectFeature: function () {
        if (this.feature) {
            this.layer.destroyFeatures(this.feature);
			if(null !== this.controlPoints){
				this.layer.destroyFeatures(this.controlPoints);
			}
			if(null !== this.scalePoints){
				this.layer.destroyFeatures(this.scalePoints);
			}
            if(null !== this.rotatePoints){
                this.layer.destroyFeatures(this.rotatePoints);
            }
            if(null !== this.handlePoints){
                this.layer.destroyFeatures(this.handlePoints);
            }
            this.unselectFeature(this.feature);
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Method: selectFeature
     * 选择需要编辑的要素。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 要选中的要素。
     */
    selectFeature: function (feature) {
        if(!this.layer.isEditable || this.layer.isLocked){
            this.feature = feature;
            this.resetControlPoints();
            return;
        }

        if (/*this.beforeSelectFeature(feature) !== false && */feature.geometry instanceof SuperMap.Geometry.PlottingGeometry) {
            this.feature = feature;
            this.modified = false;
            this.resetControlPoints();
            this.dragControl.activate();

            this.feature.geometry.feature = this.feature;


            if(this.selectGroupObject === undefined || this.selectGroupObject === null || SuperMap.Util.indexOf(this.selectGroupObject.components, feature) === -1){
                if(this.feature.geometry instanceof SuperMap.Geometry.GroupObject){
                    this.selectGroupObject = this.feature.geometry;
                } else {
                    this.selectGroupObject = null;
                }
            }
        }
    },

    /**
     * Method: unselectFeature
     * 取消选择编辑的要素。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The unselected feature.
     */
    unselectFeature: function (feature) {
        var features = [];
        features = features.concat(this.controlPoints);
        features = features.concat(this.scalePoints);
        features = features.concat(this.handlePoints);
        features = features.concat(this.rotatePoints);
        if(null !== this.unEditBox){
            features.push(this.unEditBox);
        }

        this.layer.removeFeatures(features, {silent: true});

        this.controlPoints = [];
        this.scalePoints = [];
        this.handlePoints=[];
        this.rotatePoints = [];
        this.feature = null;
        this.unEditBox = null;
        this.dragControl.deactivate();

        //if(feature.geometry instanceof SuperMap.Geometry.GroupObject && this.selectGroupObject === feature.geometry){
        //    this.selectGroupObject = null;
        //}

        this.layer.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: this.modified
        });
        this.modified = false;
    },

    /**
     * Method: beforeSelectFeature
     * Called before a feature is selected.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The feature（plotting symbol） about to be selected.
     */
    beforeSelectFeature: function (feature) {
        this.otherLayerUnSelectFeatures();
        return this.layer.events.triggerEvent(
            "beforefeaturemodified", {feature: feature}
        );
    },

    /**
     * Method: dragStart
     * Called by the drag feature control with before a feature is dragged.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The control point or plotting symbol about to be dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragStart: function (feature, pixel) {
        if(!this.layer.isEditable || this.layer.isLocked){
            this.clearSelectFeatures();
            return;
        }

        this.downPixel = pixel;

        if (feature != this.feature && feature.geometry instanceof SuperMap.Geometry.PlottingGeometry
            && !(feature.geometry instanceof SuperMap.Geometry.GroupObject)) {
            if (this.feature) {
                this.selectControl.clickFeature.apply(this.selectControl,
                    [this.feature]);
            }
            this.selectControl.clickFeature.apply(
                this.selectControl, [feature]);
            this.dragControl.overFeature.apply(this.dragControl,
                [feature]);
            //this.selectGroupObject.isChildFeatureSelected = false;
            //this.selectGroupObject.calculateParts();
            this.selectGroupObject = null;
            this.dragControl.lastPixel = pixel;
            this.dragControl.handlers.drag.started = true;
            this.dragControl.handlers.drag.start = pixel;
            this.dragControl.handlers.drag.last = pixel;
        } else if(feature == this.feature && (feature.geometry instanceof SuperMap.Geometry.PlottingGeometry) && (this.feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)){
            if (this.isAddPoint && this.editControlPoint === true) {
                this.addPoint(feature, pixel);
            }
        }

        this.dragStartRotate = this.feature.geometry.getRotate();
        this.dragStartScale = this.feature.geometry.getScale();
        this.dragStartBounds = this.feature.geometry.getBounds().clone();
        this.dragStartControlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.feature.geometry.controlPoints);

        if(!(this.feature.geometry instanceof SuperMap.Geometry.DotSymbol) &&
            !(this.feature.geometry instanceof SuperMap.Geometry.FlagGroup)){
            var centerLonLat = this.feature.geometry.getBounds().getCenterLonLat();
            this.feature.geometry.anchorPoint = new SuperMap.Geometry.Point(centerLonLat.lon, centerLonLat.lat);
        }
        this._dragPixel = pixel;
        this.lastDownTime = new Date().getTime();
        //鼠标手势，IE7、8中需重新设置cursor
        SuperMap.Element.removeClass(this.map.viewPortDiv, "smDragDown");
        this.map.viewPortDiv.style.cursor = "pointer";
    },

    /**
     * Method: dragControlPoint
     * Called by the drag feature control with each drag move of a control point or a plotting symbol.
     *
     * Parameters:
     * cp - {<SuperMap.Feature.Vector>} The control point being dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragControlPoint: function (cp, pixel) {
        if(this.layer.isLocked){
            this.clearSelectFeatures();
            return;
        }

        this.modified = true;

        if((cp.geometry.CLASS_NAME == "SuperMap.Geometry.EditPoint" && this.editControlPoint === false) ||
            (cp.geometry instanceof SuperMap.Geometry.PlottingGeometry && !this.isAddPoint)){
            //平移的时候不显示控制点
            var features = [];
            features = features.concat(this.controlPoints);
            features = features.concat(this.scalePoints);
            features = features.concat(this.handlePoints);
            features = features.concat(this.rotatePoints);

            if(cp.geometry instanceof SuperMap.Geometry.PlottingGeometry){
                this.layer.removeFeatures(features, {silent: true});
                this.controlPoints = [];
                this.scalePoints = [];
                this.handlePoints = [];
                this.rotatePoints = [];

                this.isRemoveFeature = true;
            } else {
                for(var i = 0; i < features.length; i++){
                    features[i].style.display = "none";
                }

                this.isRemovePoints = true;
            }
        }

        if (cp.geometry.CLASS_NAME == "SuperMap.Geometry.EditPoint") {
            if(this.editControlPoint === false && cp.geometry.pt.isRotatePoint === true){
                this.dragRotate(cp, pixel);
            } else if(this.editControlPoint === false && cp.geometry.pt.nHandle > 0){
                this.dragResize(cp, pixel);
            } else {
                this.dragControlPoints(cp, pixel);
            }
        } else if(cp.geometry instanceof SuperMap.Geometry.PlottingGeometry) {
            if(this.isAddPoint && this.editControlPoint === true){
                this.dragAddPoint(cp,pixel);
                return;
            }

            this.layer.drawFeatures();
            //this.layer.drawFeature(this.feature, this.feature.style, {isSelected:true});
            this._dragPixel = pixel;
        }
    },

    /**
     * Method: dragComplete
     * Called by the drag feature control when the dragging is complete.
     */
    dragComplete: function () {
        if(this.layer.isLocked){
            this.clearSelectFeatures();
            return;
        }

        delete this._dragPixel;
        if(this.feature !== null && (this.isRemovePoints === true || this.isRemoveFeature === true) ){
            this.resetControlPoints();
            this.isRemovePoints = false;
            this.isRemoveFeature = false;
        }

        this.setFeatureState();
        this.feature.geometry.rotateAngle = Number(this.feature.geometry.rotateAngle) - Number(this.rotateAngle );
        this.feature.geometry.rotateAnglePre= Number(this.feature.geometry.rotateAnglePre )- Number(this.rotateAngle);

        this.addPointIndex = -1;
        this.addPointFeature = null;
        this.dragStartRotate = 0;

        this.startRotate = false;
        this.oldGeometryAngle = 0;

        this.layer.events.triggerEvent("featuremodified",
            {feature: this.feature});
    },

    upFeature: function(pixel){
        if(!this.dragControl.over) {
            this.dragControl.handlers.drag.deactivate();
            return;
        }

        var feature = this.dragControl.feature;
        if(this.downPixel.x === pixel.x && this.downPixel.y === pixel.y &&
            feature.geometry instanceof SuperMap.Geometry.GroupObject && this.selectGroupObject === feature.geometry){
            var ptLonLat = this.layer.getLonLatFromViewPortPx(pixel);
            for (var i = 0; i < feature.geometry.components.length; i++) {
                var childFeature = this.layer.selectFeature(feature.geometry.components[i], ptLonLat, this.layer.getToleranceLonLat());
                if (childFeature !== null) {
                    if(feature.geometry instanceof SuperMap.Geometry.Route &&
                        !(childFeature.geometry instanceof SuperMap.Geometry.GeoRouteNode) &&
                        !(childFeature.geometry instanceof SuperMap.Geometry.GeoLiterateSign)){
                        continue;
                    }
                    //this.selectGroupObject.isChildFeatureSelected = true;
                    //this.selectGroupObject.calculateParts();

                    if (this.feature) {
                        this.selectControl.clickFeature.apply(this.selectControl,
                            [this.feature]);
                    }
                    this.selectControl.clickFeature.apply(
                        this.selectControl, [childFeature]);
                    this.dragControl.overFeature.apply(this.dragControl,
                        [childFeature]);

                    break;
                }
            }
        } else if(feature.geometry instanceof SuperMap.Geometry.GroupObject){
            if (this.feature) {
                this.selectControl.clickFeature.apply(this.selectControl,
                    [this.feature]);
            }
            this.selectControl.clickFeature.apply(
                this.selectControl, [feature]);
            this.dragControl.overFeature.apply(this.dragControl,
                [feature]);
        }
    },

    overFeature: function(feature, evt){
        if(feature === this.selectGroupObject && feature !== this.feature){
            var ptLonLat = this.layer.getLonLatFromViewPortPx(evt.xy);
            for (var i = 0; i < feature.geometry.components.length; i++) {
                var childFeature = this.layer.selectFeature(feature.geometry.components[i], ptLonLat, this.layer.getToleranceLonLat());
                if (childFeature !== null) {
                    this.dragControl.overFeature.apply(this.dragControl, [childFeature]);
                }
            }
        } else {
            this.dragControl.overFeature.apply(
                this.dragControl, [feature]);
        }
    },

    /**
     * Method: selectOverFeature
     * Called on over a feature.
     * Only responds if this.hover is true.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}
     */
    selectOverFeature: function(feature, evt) {
        var layer = feature.layer;
        if(this.selectControl.hover) {
            if(this.selectControl.highlightOnly) {
                this.selectControl.highlight(feature);
            } else if(layer !== null && SuperMap.Util.indexOf(
                    layer.selectedFeatures, feature) === -1) {
                this.selectControl.select(feature, evt);
            }
        }else{
            this.layer.map.eventsDiv.style.cursor="pointer";
        }
    },

    /**
     * Method: moveFeature
     * Called when the drag handler detects a mouse-move.  Also calls the
     *     optional onDrag method.
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} Location of the mouse event.
     */
    moveFeature: function(pixel) {
        var isEditPts = false;
        if(this.editControlPoint && !(this.dragControl.feature.geometry instanceof SuperMap.Geometry.DotSymbol)){
            isEditPts = true;
        }

        if((isEditPts === false && this.dragControl.feature.geometry.isPlottingGeometry === true) ||
            !(this.dragControl.feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)){
            var lonLat = this.layer.getLonLatFromViewPortPx(pixel);
            var ll = this.layer.getLonLatFromViewPortPx(this.dragControl.lastPixel);
            this.dragControl.feature.geometry.move(lonLat.lon-ll.lon,lonLat.lat-ll.lat);
        }

        //this.layer.drawFeature(this.dragControl.feature);
        this.dragControl.lastPixel = pixel;
        this.dragControl.onDrag(this.dragControl.feature, pixel);
    },

    /**
     * Method: setFeatureState
     * Called when the feature is modified.  If the current state is not
     *     INSERT or DELETE, the state is set to UPDATE.
     */
    setFeatureState: function () {
        if (this.feature.state != SuperMap.State.INSERT &&
            this.feature.state != SuperMap.State.DELETE) {
            this.feature.state = SuperMap.State.UPDATE;
        }
    },

    /**
     * Method: dragAddPoint
     * 拖动添加的点
     *
     * Parameters:
     * cp - {<SuperMap.Feature.Vector>} The control point being dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragAddPoint: function (cp, pixel) {
        if (this.addPointIndex == -1) {
            return false;
        }

        var tempPt = this.map.getLonLatFromViewPortPx(pixel);
        var pointFeature = this.controlPoints[this.addPointIndex];
        pointFeature.geometry.pt.x = tempPt.lon;
        pointFeature.geometry.pt.y = tempPt.lat;
        pointFeature.geometry.calculateParts();

        this.layer.drawFeature(pointFeature);
        //this.drawFeatures(this.controlPoints);

        //修改线面标号的位置
        this.dragControlPoints(pointFeature, pixel);

        return true;
    },

    /**
     * Method: dragRotate
     * 标号旋转
     *
     * Parameters:
     * cp - {<SuperMap.Feature.Vector>} The control point being dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragRotate: function(cp,pixel){
        var geo = this.feature.geometry;

        var lpLonlat = null;
        if(geo instanceof SuperMap.Geometry.DotSymbol){
            lpLonlat = new SuperMap.LonLat(geo.controlPoints[0].x, geo.controlPoints[0].y);
        } else {
            lpLonlat = new SuperMap.LonLat(geo.anchorPoint.x, geo.anchorPoint.y);
        }

        var anchorPos = this.layer.map.getPixelFromLonLat(lpLonlat);

        var x = (pixel.x - anchorPos.x) - (this._dragPixel.x - anchorPos.x);
        var y = (pixel.y - anchorPos.y) - (this._dragPixel.y - anchorPos.y);
        if (x !== 0 && y !== 0) {
            //旋转角度，单位是弧度
            var dRadian = (Math.atan2(this._dragPixel.y - anchorPos.y, this._dragPixel.x - anchorPos.x) - Math.atan2(pixel.y - anchorPos.y, pixel.x - anchorPos.x));

            //将弧度转换为角度
            var dAngle = dRadian * 180 / Math.PI;

            if(!this.startRotate && undefined !== geo.dRotate && null !== geo.dRotate && geo instanceof SuperMap.Geometry.DotSymbol){
                this.oldGeometryAngle = geo.getRotate();
                this.startRotate = true;
            }

            var angle = dAngle+this.oldGeometryAngle;
            angle %= 360;
            if(angle < 0){
                angle += 360;
            }
            geo.setRotate(angle);
            this.layer.renderer.clear();
            //this.layer.drawFeature(this.feature, this.feature.style, {isSelected:true});
            this.layer.drawFeatures([this.feature]);
        }

        if(!(geo instanceof SuperMap.Geometry.DotSymbol)){
            this._dragPixel = pixel;
        }
    },

    /**
     * Method: dragResize
     * 标号缩放
     *
     * Parameters:
     * cp - {<SuperMap.Feature.Vector>} The control point being dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragResize: function(cp, pixel){
        var geo = this.feature.geometry;
        if(geo.isDot()){
            var rcOld = this.dragStartBounds;
            var scale = 1.0;
            var rcNewBounds = this.feature.geometry.resizeBounds(pixel, cp.geometry.pt.nHandle, rcOld);

            var dscalex = rcNewBounds.getWidth() / rcOld.getWidth();
            var dscaley = rcNewBounds.getHeight() / rcOld.getHeight();

            if(2 === cp.geometry.pt.nHandle || 7 === cp.geometry.pt.nHandle){
                scale = dscaley;
            }
            else if(4 === cp.geometry.pt.nHandle || 5 === cp.geometry.pt.nHandle){
                scale = dscalex;
            }
            else{
                scale = dscalex < dscaley ? dscalex : dscaley;
            }

            scale = this.dragStartScale * scale;
            if(scale >= 0.64 && scale <= 5){
                geo.setScale(scale);
            } else if(scale >= 0.64 && scale < this.dragStartScale){
                geo.setScale(scale);
            }
            else{
                this.resetControlPointsValue();
            }
            this.layer.drawFeature(this.feature, this.feature.style, {isSelected:true});
            //this.layer.removeFeatures([cp]);
        } else {
            if( geo.getHandleCount() === 9 && cp.geometry.pt.nHandle && cp.geometry.pt.nHandle > 0) {
                geo.resizeControlPoints(pixel, cp.geometry.pt.nHandle, this.dragStartBounds, this.dragStartControlPoints);
            }

            if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.feature.geometry.libID, this.feature.geometry.code)){
                // 获取数据成功
                function getCompleted(result){
                    geo.symbolData.innerCells = result.originResult.innerCells;
                    geo.symbolData.scalePoints = result.originResult.scalePoints;
                    geo.symbolData.scaleValues = result.originResult.scaleValues;

                    geo.calculateParts();

                    this.resetControlPointsValue();

                    this.layer.renderer.clear();
                    this.layer.drawFeatures();
                    //this.layer.drawFeature(this.feature, this.feature.style, {isSelected:true});
                }

                //获取数据失败
                function getFailed(result){
                    console.log(result);
                }

                //对接iserver中的服务
                var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.layer.serverUrl);
                getSymbolInfo.events.on({
                    "processCompleted": getCompleted,
                    "processFailed": getFailed,
                    scope: this
                });

                var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
                getSymbolInfoParams.libID = geo.libID;
                getSymbolInfoParams.code = geo.code;
                getSymbolInfoParams.inputPoints = geo.controlPoints;
                getSymbolInfoParams.scaleValues = geo.scaleValues;
                getSymbolInfoParams.subSymbols = geo.subSymbols;
                getSymbolInfo.processAsync(getSymbolInfoParams);
            } else {
                geo.calculateParts();

                this.resetControlPointsValue();

                this.layer.renderer.clear();
                this.layer.drawFeatures();
                //this.layer.drawFeature(this.feature, this.feature.style, {isSelected:true});
            }
        }
    },

    /**
     * Method: dragControlPoints
     * 编辑控制点、比例点
     *
     * Parameters:
     * cp - {<SuperMap.Feature.Vector>} The control point being dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragControlPoints: function(cp, pixel){
        if(this.feature.geometry.CLASS_NAME === "SuperMap.Geometry.DotSymbol"){
            //if(cp.isDotLeaderLine && cp.isDotLeaderLine === true){
            //
            //    this.feature.geometry.eidtLeadLinePoints = true;
            //    if(0 === this.feature.geometry.leadLinePoints){
            //        var pt = new SuperMap.Geometry.Point(this.controlPoints[0].geometry.pt.x,this.controlPoints[0].geometry.pt.y);
            //        this.feature.geometry.leadLinePoints.push(pt);
            //    }
            //    else{
            //        this.feature.geometry.leadLinePoints[0].x = this.controlPoints[0].geometry.pt.x;
            //        this.feature.geometry.leadLinePoints[0].y = this.controlPoints[0].geometry.pt.y;
            //    }
            //
            //    this.feature.geometry.calculateParts();
            //    this.feature.geometry.eidtLeadLinePoints = false;
            //
            //    this.layer.drawFeature(this.feature, this.feature.style, {isSelected:true});
            //    this.layer.removeFeatures(this.controlPoints, {silent: true});
            //    this.layer.addFeatures(this.controlPoints);
            //}
        } else if(this.feature.geometry instanceof SuperMap.Geometry.Route ||
            this.feature.geometry instanceof SuperMap.Geometry.GeoRouteNode){
            var geo = this.feature.geometry;

            //重新计算控制点
            var cps = this.getCpGeos();
            geo.controlPoints = cps;

            if(geo instanceof SuperMap.Geometry.Route){
                for(var i = 0; i < geo.components.length; i++){
                    if(geo.components[i].geometry instanceof SuperMap.Geometry.GeoRouteNode &&
                        geo.components[i].geometry.routeNode.id === cp.geometry.pt.routeNodeId){
                        geo.components[i].geometry.setPosition(cp.geometry.pt);
                    }
                }
            } else {
                geo.setPosition(cp.geometry.pt);
            }

            //绘制符号及控制点
            this.layer.drawFeatures();
        } else if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.feature.geometry.libID, this.feature.geometry.code)){
            //拖拽控制点过程中改变符号的Geometry
            var geo = this.feature.geometry;
            var time = new Date().getTime();

            if(cp.geometry.pt.isScalePoint && cp.geometry.pt.isScalePoint === true ) {
                if(undefined !== this.lastDragPixel && null !== this.lastDragPixel){
                    if (!((Math.abs(pixel.x - this.lastDragPixel.x) > 3 || Math.abs(pixel.y - this.lastDragPixel.y) > 3 ) && time - this.lastDownTime > 100)) {
                        return ;
                    }
                }
            }

            if(geo.symbolType === SuperMap.Plot.SymbolType.REGULARPOLYGON) {
                var tempControlPoints = this.getCpGeos();
                geo.controlPoints[0] = tempControlPoints[0];
                geo.controlPoints[geo.controlPoints.length-1] = tempControlPoints[1];
            } else {
                geo.controlPoints = this.getCpGeos();
            }

            //对接iserver中的服务
            var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.layer.serverUrl);
            getSymbolInfo.events.on({
                "processCompleted": getCompleted,
                "processFailed": getFailed,
                scope: this
            });

            var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
            getSymbolInfoParams.libID = geo.libID;
            getSymbolInfoParams.code = geo.code;
            if( cp.geometry.pt.isScalePoint === true ) {
                getSymbolInfoParams.inputPoints = geo.controlPoints;
                getSymbolInfoParams.scalePoints = geo.scalePoints;
                getSymbolInfoParams.scaleValues = geo.scaleValues;
                getSymbolInfoParams.newScalePoint = cp.geometry.pt;
                getSymbolInfoParams.newScalePointIndex = cp.geometry.pt.tag;
            } else {
                getSymbolInfoParams.inputPoints = geo.controlPoints;
                getSymbolInfoParams.scaleValues = geo.scaleValues;
            }
            getSymbolInfoParams.subSymbols = geo.subSymbols;
            getSymbolInfo.processAsync(getSymbolInfoParams);

            this._dragPixel = pixel;
            this.lastDownTime = new Date().getTime();

            // 获取数据成功
            function getCompleted(result){
                geo.symbolData.innerCells = result.originResult.innerCells;
                geo.symbolData.scalePoints = result.originResult.scalePoints;
                geo.symbolData.scaleValues = result.originResult.scaleValues;

                //存储当前geometry 中的ids
                var ids = [];
                for(var i = 0; i < geo.components.length; i++){
                    ids.push(geo.components[i].id)
                }
                geo.calculateParts();
                //还原ids
                for(var i = 0; i < geo.components.length; i++){
                    geo.components[i].id = ids[i];
                }

                for(var j = 0; j < this.scalePoints.length; j++){
                    this.scalePoints[j].geometry.pt.x = geo.scalePoints[j].x;
                    this.scalePoints[j].geometry.pt.y = geo.scalePoints[j].y;
                    this.scalePoints[j].geometry.calculateParts();
                }

                if(geo.symbolType === SuperMap.Plot.SymbolType.REGULARPOLYGON){
                    if(this.controlPoints.length > 0){
                        this.controlPoints[0].geometry.pt.x = geo.controlPoints[0].x;
                        this.controlPoints[0].geometry.pt.y = geo.controlPoints[0].y;
                        this.controlPoints[0].geometry.calculateParts();
                        this.controlPoints[1].geometry.pt.x = geo.components[0].components[0].components[geo.components[0].components[0].components.length - 1].x;
                        this.controlPoints[1].geometry.pt.y = geo.components[0].components[0].components[geo.components[0].components[0].components.length - 1].y;
                        this.controlPoints[1].geometry.calculateParts();
                    }
                }

                //绘制符号及控制点
                this.layer.renderer.clear();
                this.layer.drawFeatures();

            }

            //获取数据失败
            function getFailed(result){
                console.log(result);
            }
        } else {
            var geo = this.feature.geometry;

            //重新计算控制点
            var cps = this.getCpGeos();
            geo.controlPoints = cps;

            var sps = this.getSpGeos();
            geo.scalePoints = sps;

            if(this.feature.geometry.symbolType === SuperMap.Plot.SymbolType.ELLIPSESYMBOL){
                this.feature.geometry.isCalculate = false;
            }

            var pt = this.map.getLonLatFromViewPortPx(pixel);
            var posPt = new SuperMap.Geometry.Point(pt.lon, pt.lat);
            if(cp.geometry.pt.isScalePoint === true){
                posPt.isScalePoint = true;
            }

            geo.modifyPoint(cp.geometry.pt.tag, posPt);

            if(this.scalePoints.length === geo.scalePoints.length){
                for(var j = 0; j < this.scalePoints.length; j++){
                    this.scalePoints[j].geometry.pt.x = geo.scalePoints[j].x;
                    this.scalePoints[j].geometry.pt.y = geo.scalePoints[j].y;
                    this.scalePoints[j].geometry.calculateParts();
                }
            }

            this.layer.drawFeatures();
        }
    },

    /**
     * Method: resetControlPoints
     * 重设控制点
     */
    resetControlPoints: function () {
        var features = [];
        features = features.concat(this.controlPoints);
        features = features.concat(this.scalePoints);
        features = features.concat(this.handlePoints);
        features = features.concat(this.rotatePoints);

        if(!this.layer.isEditable || this.layer.isLocked){
            if(null !== this.unEditBox){
                features.push(this.unEditBox);
            }
            this.layer.removeFeatures(features);

            if(null !== this.feature){
                var bounds = this.feature.geometry.getBounds().clone();

                var tempBounds = bounds.scale(1.03);
                var polygon = tempBounds.toGeometry();
                this.unEditBox = new SuperMap.Feature.Vector(polygon);
                this.unEditBox._sketch = true;
                this.unEditBox.style = this.unEditBoxStyle;//{strokeColor:"#0000ff",strokeOpacity:0.3, fill:true, fillColor:"#ee9900", fillOpacity:0.3};
                this.unEditBox.layer = this.layer;
                this.layer.addFeatures([this.unEditBox]);
            }
            return;
        }
        else{
            if(null !== this.unEditBox){
                this.layer.removeFeatures([this.unEditBox]);
            }
        }

        if (this.isRemovePoints === true) {
            for (var i = 0; i < features.length; i++) {
                features[i].style.display = "display";
            }
            this.layer.drawFeatures();
        } else {
            //this.controlPoints = [];
            //this.scalePoints = [];
            //this.handlePoints = [];
            //this.rotatePoints = [];
            ////移除当前控制点
            //this.layer.removeFeatures(features, {silent: true});

            //重设控制点
            this.collectControlPoints();
        }
    },



    /**
     * Method: resetControlPointsValue
     * 重设控制点值
     */
    resetControlPointsValue: function (evt) {
        if (!this.feature || !this.feature.geometry) return;

        //if(undefined !== this.isRemovePoints && true === this.isRemovePoints){
        //    return;
        //}

        //this.resetControlPoints();

        var geometry = this.feature.geometry;

        if(geometry.symbolType === SuperMap.Plot.SymbolType.REGULARPOLYGON && this.controlPoints.length > 0){
            this.controlPoints[0].geometry.pt.x = geometry.controlPoints[0].x;
            this.controlPoints[0].geometry.pt.y = geometry.controlPoints[0].y;
            this.controlPoints[0].geometry.calculateParts();

            this.controlPoints[1].geometry.pt.x = geometry.components[0].components[0].components[geometry.components[0].components[0].components.length - 1].x;
            this.controlPoints[1].geometry.pt.y = geometry.components[0].components[0].components[geometry.components[0].components[0].components.length - 1].y;
            this.controlPoints[1].geometry.calculateParts();
        } else {
            if(this.controlPoints.length !== 0){
                for (var i = 0; i < this.controlPoints.length; ++i) {
                    this.controlPoints[i].geometry.pt.x = geometry.controlPoints[i].x;
                    this.controlPoints[i].geometry.pt.y = geometry.controlPoints[i].y;
                    this.controlPoints[i].geometry.calculateParts();
                }
            }
        }

        for (var j = 0; j < this.scalePoints.length; ++j) {
            this.scalePoints[j].geometry.pt.x = geometry.scalePoints[j].x;
            this.scalePoints[j].geometry.pt.y = geometry.scalePoints[j].y;
            this.scalePoints[j].geometry.calculateParts();
        }

        if(this.handlePoints.length !== 0 || this.rotatePoints.length !== 0){
            var obj = geometry.getHandleAndRotatePoints();
            for (var j = 0; j < this.handlePoints.length; ++j) {
                this.handlePoints[j].geometry.pt.x = obj.handlePoints[j].x;
                this.handlePoints[j].geometry.pt.y = obj.handlePoints[j].y;
                this.handlePoints[j].geometry.calculateParts();
            }
            for (var j = 0; j < this.rotatePoints.length; ++j) {
                this.rotatePoints[j].geometry.pt.x = obj.rotatePoints[j].x;
                this.rotatePoints[j].geometry.pt.y = obj.rotatePoints[j].y;
                this.rotatePoints[j].geometry.calculateParts();
            }
        }

        if(this.controlPoints.length > 0) {
            this.drawFeatures(this.controlPoints);
        }
        if(this.scalePoints.length > 0) {
            this.drawFeatures(this.scalePoints);
        }
        if(this.handlePoints.length > 0) {
            this.drawFeatures(this.handlePoints);
        }
        if(this.rotatePoints.length > 0) {
            this.drawFeatures(this.rotatePoints);
        }
    },

    /**
     * Method: collectControlPoints
     * Collect the control points from the modifiable plotting symbol's Geometry and push
     *     them on to the control's controlPoints array.
     */
    collectControlPoints: function () {
        if (!this.feature || !this.feature.geometry) return;
        //this.controlPoints = [];
        //this.scalePoints = [];
        //this.rotatePoints = [];
        //this.handlePoints = [];
        var control = this;

        var isEditPts = false;
        if(!(this.feature.geometry instanceof SuperMap.Geometry.DotSymbol) && this.editControlPoint){
            isEditPts = true;
        }
        else{
            isEditPts = false;
        }

        var isAddControlPts = false;
        if(isEditPts){
            if(this.controlPoints.length === 0 && this.scalePoints.length === 0){
                isAddControlPts = true;
            }

            var features = [];
            features = features.concat(this.handlePoints);
            features = features.concat(this.rotatePoints);
            this.layer.removeFeatures(features);
            this.handlePoints = [];
            this.rotatePoints = [];
        }
        else{
            if(this.handlePoints.length === 0 && this.rotatePoints.length === 0){
                isAddControlPts = true;
            }

            var features = [];
            features = features.concat(this.scalePoints);
            features = features.concat(this.controlPoints);
            this.layer.removeFeatures(features);
            this.scalePoints = [];
            this.controlPoints = [];
        }

        //重设符号 Geometry 的 控制点
        function collectGeometryControlPoints(geometry) {
            var i, controlPoi, cp;
            if (geometry instanceof SuperMap.Geometry.PlottingGeometry) {
                if(isEditPts === false){
                    //创建缩放点
                    var obj = geometry.getHandleAndRotatePoints();
                    if(obj.handlePoints.length !== control.handlePoints.length){
                        if(control.handlePoints.length > 0){
                            control.layer.removeFeatures(control.handlePoints);
                        }

                        for (var j = 0; j < obj.handlePoints.length; j++) {
                            cp = new SuperMap.Geometry.EditPoint(obj.handlePoints[j], control.layer);
                            cp.calculateParts();

                            controlPoi = new SuperMap.Feature.Vector(cp);
                            controlPoi._sketch = true;
                            controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.defaultControlPointStyle);
                            if (control.scalePointsStyle) {
                                controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.controlPointsStyle);
                            }
                            control.handlePoints.push(controlPoi);
                        }
                    }
                    else{
                        for (var j = 0; j < obj.handlePoints.length; j++) {
                            control.handlePoints[j].geometry.pt = obj.handlePoints[j];
                            control.handlePoints[j].geometry.calculateParts();
                        }
                    }

                    //创建旋转点
                    if(obj.rotatePoints.length !== control.rotatePoints.length) {
                        if(control.rotatePoints.length > 0){
                            control.layer.removeFeatures(control.rotatePoints);
                        }

                        for (var j = 0; j < obj.rotatePoints.length; j++) {
                            cp = new SuperMap.Geometry.EditPoint(obj.rotatePoints[j], control.layer);
                            cp.calculateParts();

                            controlPoi = new SuperMap.Feature.Vector(cp);
                            controlPoi._sketch = true;
                            controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.defaultRotatePointStyle);
                            if (control.scalePointsStyle) {
                                controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.scalePointsStyle);
                            }
                            control.rotatePoints.push(controlPoi);
                        }
                    }
                    else{
                        for (var j = 0; j < obj.rotatePoints.length; j++) {
                            control.rotatePoints[j].geometry.pt = obj.rotatePoints[j];
                            control.rotatePoints[j].geometry.calculateParts();
                        }
                    }
                }
                else {
                    if(geometry.symbolType === SuperMap.Plot.SymbolType.REGULARPOLYGON){
                        if(2 !== control.controlPoints.length){
                            if(control.controlPoints.length > 0){
                                control.layer.removeFeatures(control.controlPoints);
                            }

                            var cp1 = new SuperMap.Geometry.EditPoint(geometry.controlPoints[0],control.layer);
                            cp1.calculateParts();
                            var centerControlPoi = new SuperMap.Feature.Vector(cp1);
                            centerControlPoi._sketch = true;
                            centerControlPoi.style = SuperMap.Util.copyAttributes(centerControlPoi.style, control.defaultControlPointStyle);
                            if (control.controlPointsStyle) {
                                centerControlPoi.style = SuperMap.Util.copyAttributes(centerControlPoi.style, control.controlPointsStyle);
                            }
                            control.controlPoints.push(centerControlPoi);

                            var controlPoint = SuperMap.Plot.PlottingUtil.clonePoints(geometry.components[0].components[0].components[geometry.components[0].components[0].components.length - 1])[0];
                            var cp2 = new SuperMap.Geometry.EditPoint(controlPoint,control.layer);
                            cp2.calculateParts();
                            var radiusControlPoi = new SuperMap.Feature.Vector(cp2);
                            radiusControlPoi._sketch = true;
                            radiusControlPoi.style = SuperMap.Util.copyAttributes(radiusControlPoi.style, control.defaultControlPointStyle);
                            if (control.controlPointsStyle) {
                                radiusControlPoi.style = SuperMap.Util.copyAttributes(radiusControlPoi.style, control.controlPointsStyle);
                            }
                            control.controlPoints.push(radiusControlPoi);
                        }
                        else{
                            control.controlPoints[0].geometry.pt = geometry.controlPoints[0].clone();
                            control.controlPoints[0].geometry.calculateParts();
                            var controlPoint = SuperMap.Plot.PlottingUtil.clonePoints(geometry.components[0].components[0].components[geometry.components[0].components[0].components.length - 1])[0];
                            control.controlPoints[1].geometry.pt = controlPoint;
                            control.controlPoints[1].geometry.calculateParts();
                        }

                    } else {
                        if(geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                        //    var numCont = geometry.leadLinePoints.length;
                        //    if(numCont !== control.controlPoints.length){
                        //        if(control.controlPoints.length > 0){
                        //            control.layer.removeFeatures(control.controlPoints);
                        //        }
                        //
                        //        for (i = 0; i < numCont; ++i) {
                        //            cp = new SuperMap.Geometry.EditPoint(geometry.leadLinePoints[i],control.layer);
                        //            cp.calculateParts();
                        //            controlPoi = new SuperMap.Feature.Vector(cp);
                        //            controlPoi._sketch = true;
                        //            controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.defaultControlPointStyle);
                        //            if (control.controlPointsStyle) {
                        //                controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.controlPointsStyle);
                        //            }
                        //            controlPoi.isDotLeaderLine = true;
                        //            control.controlPoints.push(controlPoi);
                        //        }
                        //    }
                        //    else{
                        //        for (i = 0; i < numCont; ++i) {
                        //            control.controlPoints[i].geometry.pt = geometry.leadLinePoints[i];
                        //            control.controlPoints[i].geometry.calculateParts();
                        //        }
                        //    }

                        }else{
                            var numCont = geometry.controlPoints.length;

                            if(numCont !== control.controlPoints.length) {
                                if (control.controlPoints.length > 0) {
                                    control.layer.removeFeatures(control.controlPoints);
                                }

                                for (i = 0; i < numCont; ++i) {
                                    cp = new SuperMap.Geometry.EditPoint(geometry.controlPoints[i], control.layer);
                                    cp.calculateParts();
                                    controlPoi = new SuperMap.Feature.Vector(cp);
                                    controlPoi._sketch = true;
                                    controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.defaultControlPointStyle);
                                    if (control.controlPointsStyle) {
                                        controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.controlPointsStyle);
                                    }
                                    control.controlPoints.push(controlPoi);
                                }
                            }
                            else{
                                for (i = 0; i < numCont; ++i) {
                                    control.controlPoints[i].geometry.pt = geometry.controlPoints[i];
                                    control.controlPoints[i].geometry.calculateParts();
                                }
                            }
                        }

                        //创建比例点
                        if(this.feature.geometry instanceof SuperMap.Geometry.PlottingGeometry && geometry.scalePoints !== null ){
                            if(geometry.scalePoints.length !== control.scalePoints.length){
                                if(control.scalePoints.length > 0){
                                    control.layer.removeFeatures(control.scalePoints);
                                }

                                for (var j = 0; j < geometry.scalePoints.length; j++){
                                    cp = new SuperMap.Geometry.EditPoint(geometry.scalePoints[j],control.layer);
                                    cp.calculateParts();
                                    controlPoi = new SuperMap.Feature.Vector(cp);
                                    controlPoi._sketch = true;
                                    controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.defaultScalePointStyle);
                                    if (control.scalePointsStyle) {
                                        controlPoi.style = SuperMap.Util.copyAttributes(controlPoi.style, control.scalePointsStyle);
                                    }
                                    control.scalePoints.push(controlPoi);
                                }
                            }
                            else{
                                for (var i = 0; i < geometry.scalePoints.length; ++i) {
                                    control.scalePoints[i].geometry.pt = geometry.scalePoints[i];
                                    control.scalePoints[i].geometry.calculateParts();
                                }
                            }
                        }
                    }
                }
            }
        }

        collectGeometryControlPoints.call(this, this.feature.geometry);

        if(isAddControlPts){
            if(this.controlPoints !== null && this.controlPoints.length > 0 && isEditPts){
               this.layer.addFeatures(this.controlPoints, {silent: true});
            }
            if(this.scalePoints !== null && this.scalePoints.length > 0 && isEditPts){
                this.layer.addFeatures(this.scalePoints, {silent: true});
            }
            if(this.rotatePoints !== null && this.rotatePoints.length > 0 && !isEditPts){
                this.layer.addFeatures(this.rotatePoints, {silent: true});
            }
            if(this.handlePoints !== null && this.handlePoints.length > 0 && !isEditPts){
                this.layer.addFeatures(this.handlePoints, {silent: true});
            }
        }
        else{
            var features = [];
            if(this.controlPoints !== null && this.controlPoints.length > 0 && isEditPts){
                features = features.concat(this.controlPoints);
            }
            if(this.scalePoints !== null && this.scalePoints.length > 0 && isEditPts){
                features = features.concat(this.scalePoints);
            }
            if(this.rotatePoints !== null && this.rotatePoints.length > 0 && !isEditPts){
                features = features.concat(this.rotatePoints);
            }
            if(this.handlePoints !== null && this.handlePoints.length > 0 && !isEditPts){
                features = features.concat(this.handlePoints);
            }

            for(var i = 0; i < features.length; i++){
                this.layer.drawFeature(features[i]);
            }
        }
    },


    /**
     * Method: setMap
     * Set the map property for the control and all handlers.
     *
     * Parameters:
     *
     * map - {<SuperMap.Map>} The control's map.
     */
    setMap: function (map) {
        this.selectControl.setMap(map);
        this.dragControl.setMap(map);
        SuperMap.Control.prototype.setMap.apply(this, arguments);
    },

    /**
     * Method: getCpGeos
     * 从 this.controlPoints 中获取出 Geometry 控制点数组
     *
     */
    getCpGeos: function () {
        var cpFeas = [];
        if(this.editControlPoint === true){
            cpFeas = this.controlPoints;
        } else {
            cpFeas = this.handlePoints;
        }
        var cpGeos = [];

        for (var i = 0; i < cpFeas.length; i++) {
            cpGeos.push(cpFeas[i].geometry.pt);
        }

        //var tempPts = [];
        //for(var m = 0; m < cpGeos.length; m++){
        //    var cp = new SuperMap.Geometry.Point(cpGeos[m].x,cpGeos[m].y);
        //    tempPts.push(cp);
        //}

        return cpGeos;
    },

    /**
     * Method: getCpGeos
     * 从 this.controlPoints 中获取出 Geometry 控制点数组
     *
     */
    getSpGeos: function () {
        var spFeas = this.scalePoints;
        var spGeos = [];

        for (var i = 0; i < spFeas.length; i++) {
            spGeos.push(spFeas[i].geometry.pt);
        }

        //var tempPts = [];
        //for(var m = 0; m < spGeos.length; m++){
        //    var cp = new SuperMap.Geometry.Point(spGeos[m].x,spGeos[m].y);
        //    cp.tag = spGeos[m].tag;
        //    cp.isScalePoint = spGeos[m].isScalePoint;
        //    tempPts.push(cp);
        //}

        return spGeos;
    },

    /**
     * Method: clearSelectFeatures
     * 清空当前选择对象
     *
     */
    clearSelectFeatures : function() {
        if(null == this.layer) {
            return;
        }

        for(var i = 0; i < this.layer.selectedFeatures.length; i++) {
            var feature = this.layer.selectedFeatures[i];

            var valid = feature && feature.geometry && feature.layer;
            if (valid) {
                this.selectControl.unselect.apply(this.selectControl,
                    [feature]);
            }
        }
    },

    /**
     * Method: otherLayerUnSelectFeatures
     * 清空其他图层选中对象
     *
     */
    otherLayerUnSelectFeatures : function () {
        if(null === this.map) {
            return;
        }

        for(var i = 0; i < this.map.controls.length; i++) {
            var control = this.map.controls[i];
            if(null === control) {
                continue;
            }

            if(control.CLASS_NAME !== "SuperMap.Control.PlottingEdit") {
                continue;
            }

            if(control === this) {
                continue;
            }

            control.clearSelectFeatures();
        }
    },

    /**
     * Method: addPoint
     * Called by the drag feature control with before a feature is dragged.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The control point or plotting symbol about to be dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    addPoint: function (feature, pixel) {
        if (!this.layer.isEditable || this.layer.isLocked) {
            return;
        }

        if (feature == this.feature && (feature.geometry instanceof SuperMap.Geometry.PlottingGeometry) && (this.feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)) {

            if (SuperMap.Control.PlottingEdit.AddPoint_WayType.UNKNOW === this.getSymbolWayType_AddPoint(feature)) {
                return;
            }

            var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
            var point = new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat);

            //判断有没有到最大点，如果到最大点则不能添加点
            if (this.controlPoints.length >= this.feature.geometry.maxEditPts) {
                return;
            }

            if (SuperMap.Control.PlottingEdit.AddPoint_WayType.CURVE === this.getSymbolWayType_AddPoint(feature)) {
                this.addPointIndex = this.addPointByCurve(point, feature.geometry);
            }
            else if (SuperMap.Control.PlottingEdit.AddPoint_WayType.POLYLINE === this.getSymbolWayType_AddPoint(feature)) {
                this.addPointIndex = this.addPointByPolyLine(point);
            }

            var cps = this.getCpGeos();
            if (this.addPointIndex > 0 && this.addPointIndex < cps.length) {

                var editPt = new SuperMap.Geometry.EditPoint(point, this.layer);
                editPt.calculateParts();
                this.addPointFeature = new SuperMap.Feature.Vector(editPt);

                this.addPointFeature._sketch = true;
                this.addPointFeature.style = SuperMap.Util.copyAttributes(this.addPointFeature.style, this.defaultControlPointStyle);
                if (this.controlPointsStyle) {
                    this.addPointFeature.style = SuperMap.Util.copyAttributes(this.addPointFeature.style, this.controlPointsStyle);
                }

                this.controlPoints.splice(this.addPointIndex, 0, this.addPointFeature);
                this.feature.geometry.controlPoints = this.getCpGeos();
                //this.layer.renderer.clear();
                //this.layer.addFeatures(this.addPointFeature);
                this.drawFeatures(this.controlPoints);
                this.layer.drawFeature(this.feature, this.feature.style, {isSelected: true});
            }
        }
    },

    /**
     * Method: getSymbolWayType_AddPoint
     * 判断标号的位置点类型
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 标号
     *
     *  Returns:
     * {SuperMap.Plot.SymbolType} 标号位置点类型
     */
    getSymbolWayType_AddPoint: function (feature) {
        if (null === feature) {
            return SuperMap.Control.PlottingEdit.AddPoint_WayType.UNKNOW;
        }

        switch (feature.geometry.symbolType) {
            case SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL:
            case SuperMap.Plot.SymbolType.POLYLINESYMBOL:
                return SuperMap.Control.PlottingEdit.AddPoint_WayType.POLYLINE;
            case SuperMap.Plot.SymbolType.POLYBEZIERCLOSESYMBOL:
            case SuperMap.Plot.SymbolType.POLYBEZIERSYMBOL:
                return SuperMap.Control.PlottingEdit.AddPoint_WayType.CURVE;
            case SuperMap.Plot.SymbolType.ALGOSYMBOL:
                return this.getSymbolAlgoWayType(feature);
            default :
                return SuperMap.Control.PlottingEdit.AddPoint_WayType.UNKNOW;
        }
    },

    /**
     * Method: addPointSupportSymbolType
     * 判断线面标号的位置点类型
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 标号
     *
     *  Returns:
     * {SuperMap.Plot.SymbolType} 标号位置点类型
     */
    getSymbolAlgoWayType: function(feature){

        var wayType = SuperMap.Control.PlottingEdit.AddPoint_WayType.UNKNOW;
        if(feature.geometry.symbolType === SuperMap.Plot.SymbolType.POLYLINESYMBOL ||
           feature.geometry.symbolType === SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL){
            return SuperMap.Control.PlottingEdit.AddPoint_WayType.POLYLINE;
        }
        else if(feature.geometry.symbolType === SuperMap.Plot.SymbolType.POLYBEZIERSYMBOL ||
            feature.geometry.symbolType === SuperMap.Plot.SymbolType.POLYBEZIERCLOSESYMBOL){
            return SuperMap.Control.PlottingEdit.AddPoint_WayType.CURVE;
        }
        else if(feature.geometry.symbolType !== SuperMap.Plot.SymbolType.ALGOSYMBOL){
            return wayType;
        }

        var libID = feature.geometry.libID;
        var code = feature.geometry.code;

        if(100 === libID){
            switch (code){
                case 15200:
                case 15201:
                case 16203:
                case 17703:
                case 17704:
                case 21400:
                case 21401:
                case 21500:
                case 21501:
                case 21502:
                case 21503:
                case 21504:
                case 21600:
                case 21900:
                case 22000:
                case 22103:
                case 23800:
                case 24700:
                case 25201:
                case 25400:
                case 25501:
                case 25502:
                case 25503:
                case 25601:
                case 25801:
                case 25901:
                case 26500:
                case 26501:
                case 26502:
                case 26503:
                case 26600:
                case 28900:
                case 29000:
                case 29003:
                case 29903:
                case 30000:
                case 30001:
                case 30002:
                case 30100:
                case 30102:
                case 30200:
                case 30201:
                case 30800:
                case 31803:
                case 33400:
                case 34900:
                case 34901:
                case 34902:
                case 35000:
                case 36400:
                case 39801:
                case 40000:
                case 40900:
                case 44200:
                {
                    wayType = SuperMap.Control.PlottingEdit.AddPoint_WayType.CURVE;
                    break;
                }

                case 12500:
                case 12502:
                case 16100:
                case 20300:
                case 32900:
                case 34700:
                case 35200:
                case 36401:
                case 41200:
                case 41201:
                case 41202:
                case 42700:
                case 44400:
                {
                    wayType = SuperMap.Control.PlottingEdit.AddPoint_WayType.POLYLINE;
                    break;
                }
            }
        }
        else if(22 === libID){
            switch (code){
                case 1005:
                case 1008:
                case 1012:
                case 1014:
                {
                    wayType = SuperMap.Control.PlottingEdit.AddPoint_WayType.CURVE;
                    break;
                }
                case 1007:
                case 1009:
                case 1013:
                case 1015:
                {
                    wayType = SuperMap.Control.PlottingEdit.AddPoint_WayType.POLYLINE;
                }

            }
        }
        else if(421 === libID){

        }

        return wayType;
    },

    /**
     * Method: getAddPointTolerance
     * 获取添加点的经纬度容限
     *
     *
     *  Returns:
     * {Integer} 容限，单位是经纬度
     */
    getAddPointTolerance: function(){
        var tempPt0 = this.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
        var tempPt1 = this.map.getLonLatFromViewPortPx(new SuperMap.Pixel(this.tolerancePixel,0));
        var tolerance = SuperMap.Plot.PlottingUtil.distance({x:tempPt0.lon,y:tempPt0.lat},{x:tempPt1.lon,y:tempPt1.lat});

        return tolerance;
    },

    /**
     * Method: addPointByPolyLine
     * 添加点的标号是折线路径时，计算添加点的索引
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}鼠标位置点（单位是经纬度）
     *
     *  Returns:
     * {Integer} 添加点的位置索引
     */
    addPointByPolyLine: function (point) {
        var index = -1;
        var cps = this.getCpGeos();
        index = this.computePointToLineMinDis(point, cps).index;

        if(index >= 0){
            index++;
        }

        return index;
    },

    /**
     * Method: addPointByCurve
     * 添加点的标号是曲线路径时，计算添加点的索引
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}鼠标位置点（单位是经纬度）
     * geometry - {<SuperMap.Geometry.GeoGraphicObject>} 添加点的标号对象
     *
     *  Returns:
     * {Integer} 添加点的位置索引
     */
    addPointByCurve: function (point, geometry) {
        var cps = this.getCpGeos();
        var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(cps);
        if(2 > allPoints.length){
            return -1;
        }

        //var components = this.getSpatialData(geometry);
        //var cps = this.getCpGeos();
        var arrPts = [];
        var index = 0;
        for (var m = 1; m < cps.length; m++) {
            var pts = [];
            for (var i = index; i < allPoints.length; i++) {
                if (SuperMap.Plot.PlottingUtil.equalFuzzy(cps[m].x, allPoints[i].x) && SuperMap.Plot.PlottingUtil.equalFuzzy(cps[m].y, allPoints[i].y)) {
                    if(pts.length < 1){
                        continue;
                    }
                    pts.push(allPoints[i]);
                    arrPts.push(pts);
                    pts = [];
                    index = i;
                    break;
                }
                else {
                    pts.push(allPoints[i]);
                }
            }
        }

        var addPointIndex = -1;
        var minDis = -1;
        for(var i = 0; i < arrPts.length; i++){
            var tempMinDis = this.computePointToLineMinDis(point, arrPts[i]).minDis;
            if(tempMinDis < 0){
                continue;
            }

            if(minDis < 0){
                minDis = tempMinDis;
                addPointIndex = i + 1;
            }
            else{
                if(minDis > tempMinDis){
                    minDis = tempMinDis;
                    addPointIndex = i + 1;
                }
            }
        }

        return addPointIndex;
    },

    /**
     * Method: computePointToLineMinDis
     * 计算点到折线段的最小距离
     *
     * Parameters:
     * pt - {<SuperMap.Geometry.Point>} 测试点
     * pts - {Array<SuperMap.Geometry.Point>} 折线段的点数组
     *
     *  Returns:
     * {object} 最小距离和最小距离所在折线段的索引
     */
    computePointToLineMinDis:function(pt,pts){
        var tolerance = this.getAddPointTolerance();
        var disAndIndex = SuperMap.Plot.PlottingUtil.computePointToLineMinDis(pt, pts);

        if(disAndIndex.minDis > tolerance){
            disAndIndex.index = -1;
        }

        return disAndIndex;
    },

    /**
     * Method: edit
     * 设置选中或编辑状态
     *
     * Parameters:
     *
     */
    edit: function(){
        if(this.feature === null) return;
        this.editControlPoint = !this.editControlPoint;
        if(this.editControlPoint){
            //this.feature.geometry.editMode = true;

            this.resetControlPoints();
        }else{
            //this.feature.geometry.editMode = false;

            this.resetControlPoints();
        }

    },

    /**
     * Method: edit
     * 设置选中或编辑状态
     *
     * Parameters:
     *
     */
    setEditMode: function(editMode){
        this.editMode = editMode;

        if(this.feature === null) return;

        this.resetControlPoints();
    },

    /**
     * Method: drawFeatures
     * 绘制标号
     *
     * Parameters:
     * features feature数组
     *
     */
    drawFeatures: function(features){
        if(null === features){
            return;
        }

        for(var i = 0; i < features.length; i++){
            var feature = features[i];
            if(undefined === feature || null === feature){
                continue;
            }

            this.layer.drawFeature(feature);
        }
    },


    CLASS_NAME: "SuperMap.Control.PlottingEdit"
});

//标号路径点类型
SuperMap.Control.PlottingEdit.AddPoint_WayType = {
    UNKNOW: 0,
    POLYLINE: 1,
    CURVE: 2
};

SuperMap.Control.EditMode = {
    EditMode_AddControlPoint: 0,
    EditMode_EditControlPoint: 1,
    EditMode_EditOverall: 2
};