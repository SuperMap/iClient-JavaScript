/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control/DragFeature.js
 * @requires SuperMap/Control/SelectFeature.js
 * @requires SuperMap/Handler/Keyboard.js
 */

/**
 * Class: SuperMap.Control.ModifyFeature
 * 矢量要素编辑控件。
 * 该控件激活时，选中需要编辑的要素，会动态绘制要素的顶点，这些顶点可以被拖拽。默认时，
 * 删除键(delete)会删除鼠标下面的顶点。
 * 
 * 通过 active 和 deactive 两个方法，实现动态的激活和注销,该控件的激活和注销用法如下示例所示：
 * 
 * 激活控件用用如下方法： 
 * (code)  
 * modifyFeature.activate(); 
 * (end) 
 * 注销控件,如下方法： 
 * (code) 
 * modifyFeature.deactivate(); 
 * (end) 
 *
 * Inherits From:
 *  - <SuperMap.Control>
 */
SuperMap.Control.ModifyFeature = SuperMap.Class(SuperMap.Control, {
    /**
     * APIProperty: snap
     * {<SuperMap.Snap>}  捕捉对象，用于在绘制过程中对其他要素进行捕捉
     *
     * */
    snap:null,
    /**
     * Constant: EVENT_TYPES
     * 支持的事件类型: 	 
     *  - *beforefeaturemodified* 当图层上的要素开始编辑前触发该事件。
     *  - *featuremodified* 当图层上的要素编辑时触发该事件。
     *  - *afterfeaturemodified* 当图层上的要素编辑完成时，触发该事件。
     */
    EVENT_TYPES: ["beforefeaturemodified", "featuremodified", "afterfeaturemodified"],

    /**
     * APIProperty: geometryTypes
     * {Array(String)} 指定可编辑要素的geometry类型集合。例如：['SuperMap.Geometry.Point']
     */
    geometryTypes: null,

    /**
     * APIProperty: clickout
     * {Boolean} 是否在要素区域外点击鼠标，取消选择要素。默认为true。
     */
    clickout: true,

    /**
     * APIProperty: toggle
     * {Boolean} 是否在选中的要素上点击，取消选择。默认为true。
     */
    toggle: true,
    
    /**
     * APIProperty: standalone
     * {Boolean} 该属性为true时，创建的控件不具有选择要素的能力，若对要素进行编辑，需要调用 'selectFeature' 和
     * (编辑下一个要素之前需要对前一个要素调用)'unselectFeature' 方法。
     * 默认为false。
     */
    standalone: false,

    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>}
     */
    layer: null,
    
    /**
     * Property: feature
     * {<SuperMap.Feature.Vector>} Feature currently available for modification.
     */
    feature: null,
    
    /**
     * Property: vertices
     * {Array(<SuperMap.Feature.Vector>)} Verticies currently available
     *     for dragging.
     */
    vertices: null,
    
    /**
     * Property: virtualVertices
     * {Array(<SuperMap.Feature.Vector>)} Virtual vertices in the middle
     *     of each edge.
     */
    virtualVertices: null,

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
     * Property: handlers
     * {Object}
     */
    handlers: null,
    
    /**
     * APIProperty: deleteCodes
     * {Array(Integer)} 设置删除顶点的键盘快捷键。为空时，不能通过键盘删除顶点。
     * 非空时，按下设置的键，可以删除鼠标位置下的顶点。默认为 46和68，表示'delete'和'd'键。
     */
    deleteCodes: null,

    /**
     * APIProperty: virtualStyle
     * {Object} 虚拟顶点的符号样式。
     */
    virtualStyle: null,
    
    /**
     * APIProperty: vertexRenderIntent
     * {String} 该属性作用于顶点。若virtualStyle属性未设置，顶点会使用fillOpacity、strokeOpacity为0.3的默认值。
     * 默认为null，顶点使用layer的默认样式。
     */
    vertexRenderIntent: null,

    /**
     * APIProperty: mode
     * {Integer} 该属性使用位字段指定编辑模式。默认为
     *      SuperMap.Control.ModifyFeature.RESHAPE。若多个mode组合使用可以用 | 符号隔开。例如：
     * (code)
     * control.mode = SuperMap.Control.ModifyFeature.RESIZE |
     *                SuperMap.Control.ModifyFeature.ROTATE;
     *  (end)
     */
    mode: null,

    /**
     * Property: modified
     * {Boolean} The currently selected feature has been modified.
     */
    modified: false,

    /**
     * Property: radiusHandle
     * {<SuperMap.Feature.Vector>} A handle for rotating/resizing a feature.
     */
    radiusHandle: null,

    /**
     * Property: dragHandle
     * {<SuperMap.Feature.Vector>} A handle for dragging a feature.
     */
    dragHandle: null,

    /**
     * Constructor: SuperMap.Control.ModifyFeature
     * 创建该控件的新实例。
     *
     * Parameters:
     * layer - {<SuperMap.Layer.Vector>} 执行编辑要素的图层。
     * options - {Object} 设置该类开放的属性值。
     * 	 
     * 创建 ModifyFeature 控件新实例的方法如下所示：	 
     * (start code) 
     * //定义一个矢量图层 vectorLayer 进行要素的编辑
     * var vectorLayer = new SuperMap.Layer.Vector("vector Layer"); 
     * //实例化一个 modifyFeature 控件
     * var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer); 	 
     * //地图上添加控件	 
     * map.addControl(modifyFeature);	  	 
     * //激活 modifyFeature 控件  	 
     * modifyFeature.activate();  	 
     * (end) 
     */
    initialize: function(layer, options) {
        options = options || {};
        this.layer = layer;
        this.vertices = [];
        this.virtualVertices = [];
        this.virtualStyle = SuperMap.Util.extend({},
            this.layer.style ||
            this.layer.styleMap.createSymbolizer(null, options.vertexRenderIntent)
        );
        this.virtualStyle.fillOpacity = 0.3;
        this.virtualStyle.strokeOpacity = 0.3;
        this.deleteCodes = [46, 68];
        this.mode = SuperMap.Control.ModifyFeature.RESHAPE;
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        if(!(SuperMap.Util.isArray(this.deleteCodes))) {
            this.deleteCodes = [this.deleteCodes];
        }
        var control = this;

        // configure the select control
        var selectOptions = {
            geometryTypes: this.geometryTypes,
            clickout: this.clickout,
            toggle: this.toggle,
            onBeforeSelect: this.beforeSelectFeature,
            onSelect: this.selectFeature,
            onUnselect: this.unselectFeature,
            scope: this
        };
        if(this.standalone === false) {
            this.selectControl = new SuperMap.Control.SelectFeature(
                layer, selectOptions
            );
        }

        // configure the drag control
        var dragOptions = {
            geometryTypes: ["SuperMap.Geometry.Point"],
            snappingOptions: this.snappingOptions,
            onStart: function(feature, pixel) {
                control.dragStart.apply(control, [feature, pixel]);
            },
            onDrag: function(feature, pixel) {
                control.dragVertex.apply(control, [feature, pixel]);
            },
            onComplete: function(feature) {
                control.dragComplete.apply(control, [feature]);
            },
            featureCallbacks: {
                over: function(feature) {
                    /**
                     * In normal mode, the feature handler is set up to allow
                     * dragging of all points.  In standalone mode, we only
                     * want to allow dragging of sketch vertices and virtual
                     * vertices - or, in the case of a modifiable point, the
                     * point itself.
                     */
                    if(control.standalone !== true || feature._sketch ||
                       control.feature === feature) {
                        control.dragControl.overFeature.apply(
                            control.dragControl, [feature]);
                    }
                }
            }
        };
        dragOptions.organizer=this;
        this.dragControl = new SuperMap.Control.DragFeature(
            layer, dragOptions
        );

        // configure the keyboard handler
        var keyboardOptions = {
            keydown: this.handleKeypress
        };
        this.handlers = {
            keyboard: new SuperMap.Handler.Keyboard(this, keyboardOptions)
        };
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放空间。
     */
    destroy: function() {
        this.layer = null;
        this.standalone || this.selectControl.destroy();
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
    activate: function() {
        return ((this.standalone || this.selectControl.activate()) &&
                this.handlers.keyboard.activate() &&
                SuperMap.Control.prototype.activate.apply(this, arguments));
    },

    /**
     * APIMethod: deactivate
     * 取消激活控件，使其不可用。
     *
     * Returns: 
     * {Boolean} 返回操作是否成功。
     */
    deactivate: function() {
        var deactivated = false;
        // the return from the controls is unimportant in this case
        if(SuperMap.Control.prototype.deactivate.apply(this, arguments)) {
            this.layer.removeFeatures(this.vertices, {silent: true});
            this.layer.removeFeatures(this.virtualVertices, {silent: true});
            this.vertices = [];
            this.dragControl.deactivate();
            var feature = this.feature;
            var valid = feature && feature.geometry && feature.layer;
            if(this.standalone === false) {
                if(valid) {
                    this.selectControl.unselect.apply(this.selectControl,
                                                      [feature]);
                }
                this.selectControl.deactivate();
            } else {
                if(valid) {
                    this.unselectFeature(feature);
                }
            }
            this.handlers.keyboard.deactivate();
            deactivated = true;
        }
        return deactivated;
    },
    
    /**
     * Method: beforeSelectFeature
     * Called before a feature is selected.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The feature about to be selected.
     */
    beforeSelectFeature: function(feature) {
        //增加控件上的事件---解决用户提出的问题（监听此控件的事件）
        this.events.triggerEvent("beforefeaturemodified",{feature : feature});
        return this.layer.events.triggerEvent(
            "beforefeaturemodified", {feature: feature}
        );
    },

    /**
     * APIMethod: selectFeature
     * 在standalone模式下，选择需要编辑的要素。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 被选中的要素。
     */
    selectFeature: function(feature) {
        if (!this.standalone || this.beforeSelectFeature(feature) !== false) {
            this.feature = feature;
            this.modified = false;
            this.resetVertices();
            this.dragControl.activate();
        }
        // keep track of geometry modifications
        var modified = feature.modified;
        if (feature.geometry && !(modified && modified.geometry)) {
            this._originalGeometry = feature.geometry.clone();
        }
    },

    /**
     * APIMethod: unselectFeature
     * 取消选择编辑的要素。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The unselected feature.
     */
    unselectFeature: function(feature) {
        this.layer.removeFeatures(this.vertices, {silent: true});
        this.vertices = [];
        this.layer.destroyFeatures(this.virtualVertices, {silent: true});
        this.virtualVertices = [];
        if(this.dragHandle) {
            this.layer.destroyFeatures([this.dragHandle], {silent: true});
            delete this.dragHandle;
        }
        if(this.radiusHandle) {
            this.layer.destroyFeatures([this.radiusHandle], {silent: true});
            delete this.radiusHandle;
        }
        this.feature = null;
        this.dragControl.deactivate();
        //增加控件上的事件---解决用户提出的问题（监听此控件的事件）
        this.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: this.modified
        });
        this.layer.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: this.modified
        });
        this.modified = false;
    },

    /**
     * Method: dragStart
     * Called by the drag feature control with before a feature is dragged.
     *     This method is used to differentiate between points and vertices
     *     of higher order geometries.  This respects the <geometryTypes>
     *     property and forces a select of points when the drag control is
     *     already active (and stops events from propagating to the select
     *     control).
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The point or vertex about to be
     *     dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragStart: function(feature, pixel) {
        // only change behavior if the feature is not in the vertices array
        if(feature !== this.feature && !feature.geometry.parent &&
           feature !== this.dragHandle && feature !== this.radiusHandle) {
            if(this.standalone === false && this.feature) {
                // unselect the currently selected feature
                this.selectControl.clickFeature.apply(this.selectControl,
                                                      [this.feature]);
            }
            // check any constraints on the geometry type
            if(this.geometryTypes == null ||
               SuperMap.Util.indexOf(this.geometryTypes,
                                       feature.geometry.CLASS_NAME) !== -1) {
                // select the point
                this.standalone || this.selectControl.clickFeature.apply(
                                            this.selectControl, [feature]);
                /**
                 * TBD: These lines improve workflow by letting the user
                 *     immediately start dragging after the mouse down.
                 *     However, it is very ugly to be messing with controls
                 *     and their handlers in this way.  I'd like a better
                 *     solution if the workflow change is necessary.
                 */
                // prepare the point for dragging
                this.dragControl.overFeature.apply(this.dragControl,
                                                   [feature]);
                this.dragControl.lastPixel = pixel;
                this.dragControl.handlers.drag.started = true;
                this.dragControl.handlers.drag.start = pixel;
                this.dragControl.handlers.drag.last = pixel;
            }
        }
        //鼠标手势，IE7、8中需重新设置cursor
        SuperMap.Element.removeClass(
            this.map.viewPortDiv, "smDragDown" );
        this.map.viewPortDiv.style.cursor="pointer";
    },
    
    /**
     * Method: dragVertex
     * Called by the drag feature control with each drag move of a vertex.
     *
     * Parameters:
     * vertex - {<SuperMap.Feature.Vector>} The vertex being dragged.
     * pixel - {<SuperMap.Pixel>} Pixel location of the mouse event.
     */
    dragVertex: function(vertex, pixel) {
        this.modified = true;
        /**
         * Five cases:
         * 1) dragging a simple point
         * 2) dragging a virtual vertex
         * 3) dragging a drag handle
         * 4) dragging a real vertex
         * 5) dragging a radius handle
         */
        if(this.feature.geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
            // dragging a simple point
            if(this.feature !== vertex) {
                this.feature = vertex;
            }
            this.layer.events.triggerEvent("vertexmodified", {
                vertex: vertex.geometry,
                feature: this.feature,
                pixel: pixel
            });
        } else {
            if(vertex._index) {
                // dragging a virtual vertex
                vertex.geometry.parent.addComponent(vertex.geometry,
                                                    vertex._index);
                // move from virtual to real vertex
                delete vertex._index;
                SuperMap.Util.removeItem(this.virtualVertices, vertex);
                this.vertices.push(vertex);
            } else if(vertex === this.dragHandle) {
                // dragging a drag handle
                this.layer.removeFeatures(this.vertices, {silent: true});
                this.vertices = [];
                if(this.radiusHandle) {
                    this.layer.destroyFeatures([this.radiusHandle], {silent: true});
                    this.radiusHandle = null;
                }
            } else if(vertex !== this.radiusHandle) {
                // dragging a real vertex
                this.layer.events.triggerEvent("vertexmodified", {
                    vertex: vertex.geometry,
                    feature: this.feature,
                    pixel: pixel
                });
            }
            // dragging a radius handle - no special treatment
            if(this.virtualVertices.length > 0) {
                this.layer.destroyFeatures(this.virtualVertices, {silent: true});
                this.virtualVertices = [];
            }
            this.layer.drawFeature(this.feature, this.standalone ? undefined :
                                            this.selectControl.renderIntent);
        }
        // keep the vertex on top so it gets the mouseout after dragging
        // this should be removed in favor of an option to draw under or
        // maintain node z-index
        this.layer.drawFeature(vertex);
    },
    
    /**
     * Method: dragComplete
     * Called by the drag feature control when the feature dragging is complete.
     *
     * Parameters:
     * vertex - {<SuperMap.Feature.Vector>} The vertex being dragged.
     */
    dragComplete: function(vertex) {
        this.resetVertices();
        this.setFeatureState();
        //增加控件上的事件---解决用户提出的问题（监听此控件的事件）
        this.events.triggerEvent("featuremodified",
            {feature: this.feature});
        this.layer.events.triggerEvent("featuremodified", 
                                       {feature: this.feature});
    },
    
    /**
     * Method: setFeatureState
     * Called when the feature is modified.  If the current state is not
     *     INSERT or DELETE, the state is set to UPDATE.
     */
    setFeatureState: function() {
        if(this.feature.state !== SuperMap.State.INSERT &&
           this.feature.state !== SuperMap.State.DELETE) {
            this.feature.state = SuperMap.State.UPDATE;
            if (this.modified && this._originalGeometry) {
                var feature = this.feature;
                feature.modified = SuperMap.Util.extend(feature.modified, {
                    geometry: this._originalGeometry
                });
                delete this._originalGeometry;
            }
        }
    },
    
    /**
     * Method: resetVertices
     */
    resetVertices: function() {
        // if coming from a drag complete we're about to destroy the vertex
        // that was just dragged. For that reason, the drag feature control
        // will never detect a mouse-out on that vertex, meaning that the drag
        // handler won't be deactivated. This can cause errors because the drag
        // feature control still has a feature to drag but that feature is
        // destroyed. To prevent this, we call outFeature on the drag feature
        // control if the control actually has a feature to drag.
        if(this.dragControl.feature) {
            this.dragControl.outFeature(this.dragControl.feature);
        }
        if(this.vertices.length > 0) {
            this.layer.removeFeatures(this.vertices, {silent: true});
            this.vertices = [];
        }
        if(this.virtualVertices.length > 0) {
            this.layer.removeFeatures(this.virtualVertices, {silent: true});
            this.virtualVertices = [];
        }
        if(this.dragHandle) {
            this.layer.destroyFeatures([this.dragHandle], {silent: true});
            this.dragHandle = null;
        }
        if(this.radiusHandle) {
            this.layer.destroyFeatures([this.radiusHandle], {silent: true});
            this.radiusHandle = null;
        }
        if(this.feature &&
           this.feature.geometry.CLASS_NAME !== "SuperMap.Geometry.Point") {
            if((this.mode & SuperMap.Control.ModifyFeature.DRAG)) {
                this.collectDragHandle();
            }
            if((this.mode & (SuperMap.Control.ModifyFeature.ROTATE |
                             SuperMap.Control.ModifyFeature.RESIZE))) {
                this.collectRadiusHandle();
            }
            if(this.mode & SuperMap.Control.ModifyFeature.RESHAPE){
                // Don't collect vertices when we're resizing
                if (!(this.mode & SuperMap.Control.ModifyFeature.RESIZE)){
                    this.collectVertices();
                }
            }
        }
    },
    
    /**
     * Method: handleKeypress
     * Called by the feature handler on keypress.  This is used to delete
     *     vertices. If the <deleteCode> property is set, vertices will
     *     be deleted when a feature is selected for modification and
     *     the mouse is over a vertex.
     *
     * Parameters:
     * {Integer} Key code corresponding to the keypress event.
     */
    handleKeypress: function(evt) {
        var code = evt.keyCode;
        
        // check for delete key
        if(this.feature &&
           SuperMap.Util.indexOf(this.deleteCodes, code) !== -1) {
            var vertex = this.dragControl.feature;
            if(vertex &&
               SuperMap.Util.indexOf(this.vertices, vertex) !== -1 &&
               !this.dragControl.handlers.drag.dragging &&
               vertex.geometry.parent) {
                // remove the vertex
                vertex.geometry.parent.removeComponent(vertex.geometry);
                this.layer.events.triggerEvent("vertexremoved", {
                    vertex: vertex.geometry,
                    feature: this.feature,
                    pixel: evt.xy
                });
                this.layer.drawFeature(this.feature, this.standalone ?
                                       undefined :
                                       this.selectControl.renderIntent);
                this.modified = true;
                this.resetVertices();
                this.setFeatureState();
                //增加控件上的事件---解决用户提出的问题（监听此控件的事件）
                this.events.triggerEvent("featuremodified",
                    {feature: this.feature});
                this.layer.events.triggerEvent("featuremodified", 
                                               {feature: this.feature});
            }
        }
    },

    /**
     * Method: collectVertices
     * Collect the vertices from the modifiable feature's geometry and push
     *     them on to the control's vertices array.
     */
    collectVertices: function() {
        this.vertices = [];
        this.virtualVertices = [];        
        var control = this;
        function collectComponentVertices(geometry) {
            var i, vertex, component, len;
            if(geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
                vertex = new SuperMap.Feature.Vector(geometry);
                vertex._sketch = true;
                vertex.renderIntent = control.vertexRenderIntent;
                control.vertices.push(vertex);
            } else {
                var numVert = geometry.components.length;
                if(geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") {
                    numVert -= 1;
                }
                for(i=0; i<numVert; ++i) {
                    component = geometry.components[i];
                    if(component.CLASS_NAME === "SuperMap.Geometry.Point") {
                        vertex = new SuperMap.Feature.Vector(component);
                        vertex._sketch = true;
                        vertex.renderIntent = control.vertexRenderIntent;
                        control.vertices.push(vertex);
                    } else {
                        collectComponentVertices(component);
                    }
                }
                
                // add virtual vertices in the middle of each edge
                if(geometry.CLASS_NAME !== "SuperMap.Geometry.MultiPoint") {
                    for(i=0, len=geometry.components.length; i<len-1; ++i) {
                        var prevVertex = geometry.components[i];
                        var nextVertex = geometry.components[i + 1];
                        if(prevVertex.CLASS_NAME === "SuperMap.Geometry.Point" &&
                           nextVertex.CLASS_NAME === "SuperMap.Geometry.Point") {
                            var x = (prevVertex.x + nextVertex.x) / 2;
                            var y = (prevVertex.y + nextVertex.y) / 2;
                            var point = new SuperMap.Feature.Vector(
                                new SuperMap.Geometry.Point(x, y),
                                null, control.virtualStyle
                            );
                            // set the virtual parent and intended index
                            point.geometry.parent = geometry;
                            point._index = i + 1;
                            point._sketch = true;
                            control.virtualVertices.push(point);
                        }
                    }
                }
            }
        }
        collectComponentVertices.call(this, this.feature.geometry);
        this.layer.addFeatures(this.virtualVertices, {silent: true});
        this.layer.addFeatures(this.vertices, {silent: true});
    },

    /**
     * Method: collectDragHandle
     * Collect the drag handle for the selected geometry.
     */
    collectDragHandle: function() {
        var me = this;
        var geometry = this.feature.geometry;
        var center = geometry.getBounds().getCenterLonLat();
        var originGeometry = new SuperMap.Geometry.Point(
            center.lon, center.lat
        );
        var origin = new SuperMap.Feature.Vector(originGeometry);
        originGeometry.move = function(x, y) {
            SuperMap.Geometry.Point.prototype.move.call(this, x, y);
            geometry.move(x, y);
            me.layer.events.triggerEvent("featuremove", {
                vertex: geometry,
                feature: me.feature,
                pixel: new SuperMap.Pixel(x,y)
            });
        };
        origin._sketch = true;
        this.dragHandle = origin;
        this.layer.addFeatures([this.dragHandle], {silent: true});
    },

    /**
     * Method: collectRadiusHandle
     * Collect the radius handle for the selected geometry.
     */
    collectRadiusHandle: function() {
        var me = this;
        var geometry = this.feature.geometry;
        var bounds = geometry.getBounds();
        var center = bounds.getCenterLonLat();
        var originGeometry = new SuperMap.Geometry.Point(
            center.lon, center.lat
        );
        var radiusGeometry = new SuperMap.Geometry.Point(
            bounds.right, bounds.bottom
        );
        var radius = new SuperMap.Feature.Vector(radiusGeometry);
        var resize = (this.mode & SuperMap.Control.ModifyFeature.RESIZE);
        var reshape = (this.mode & SuperMap.Control.ModifyFeature.RESHAPE);
        var rotate = (this.mode & SuperMap.Control.ModifyFeature.ROTATE);

        radiusGeometry.move = function(x, y) {
            SuperMap.Geometry.Point.prototype.move.call(this, x, y);
            var dx1 = this.x - originGeometry.x;
            var dy1 = this.y - originGeometry.y;
            var dx0 = dx1 - x;
            var dy0 = dy1 - y;
            if(rotate) {
                var a0 = Math.atan2(dy0, dx0);
                var a1 = Math.atan2(dy1, dx1);
                var angle = a1 - a0;
                angle *= 180 / Math.PI;
                geometry.rotate(angle, originGeometry);
                me.layer.events.triggerEvent("featurerotate", {
                    vertex: geometry,
                    feature: me.feature,
                    pixel: new SuperMap.Pixel(x,y)
                });
            }
            if(resize) {
                var scale, ratio;
                // 'resize' together with 'reshape' implies that the aspect 
                // ratio of the geometry will not be preserved whilst resizing 
                if (reshape) {
                    scale = dy1 / dy0;
                    ratio = (dx1 / dx0) / scale;
                } else {
                    var l0 = Math.sqrt((dx0 * dx0) + (dy0 * dy0));
                    var l1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
                    scale = l1 / l0;
                }
                geometry.resize(scale, originGeometry, ratio);
                me.layer.events.triggerEvent("featureresize", {
                    vertex: geometry,
                    feature: me.feature,
                    pixel: new SuperMap.Pixel(x,y)
                });
            }
        };
        radius._sketch = true;
        this.radiusHandle = radius;
        this.layer.addFeatures([this.radiusHandle], {silent: true});
    },

    /**
     * Method: setMap
     * Set the map property for the control and all handlers.
     *
     * Parameters:
     * map - {<SuperMap.Map>} The control's map.
     */
    setMap: function(map) {
        this.standalone || this.selectControl.setMap(map);
        this.dragControl.setMap(map);
        SuperMap.Control.prototype.setMap.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.Control.ModifyFeature"
});

/**
 * Constant: RESHAPE
 * {Integer} reshape模式下使控件激活有效的常量.
 */
SuperMap.Control.ModifyFeature.RESHAPE = 1;
/**
 * Constant: RESIZE
 * {Integer} resize模式下使控件激活有效的常量。
 */
SuperMap.Control.ModifyFeature.RESIZE = 2;
/**
 * Constant: ROTATE
 * {Integer} rotate 模式下使控件激活有效的常量。
 */
SuperMap.Control.ModifyFeature.ROTATE = 4;
/**
 * Constant: DRAG
 * {Integer} drag 模式下使控件激活有效的常量。
 */
SuperMap.Control.ModifyFeature.DRAG = 8;
