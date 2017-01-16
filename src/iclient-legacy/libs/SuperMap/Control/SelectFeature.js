/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Handler/Feature.js
 * @requires SuperMap/Layer/Vector/RootContainer.js
 */

 /**
  * Class: SuperMap.Control.SelectFeature
  * 要素选择控件，该控件实现在指定的的图层上通过鼠标单击和悬浮选择矢量要素。
  * 
  * 通过 active 和 deactive 两个方法，实现动态的激活和注销,该控件的激活和注销用法如下示例所示：
  * 
  * 激活控件,如下方法： 
  * (code)  
  * selectFeature.activate(); 
  * (end) 
  * 注销控件,如下方法： 
  * (code) 
  * selectFeature.deactivate(); 
  * (end) 
  * 
  * Inherits from:
  *  - <SuperMap.Control>
  */
SuperMap.Control.SelectFeature = SuperMap.Class(SuperMap.Control, {
    
     /**
      * Property: multipleKey
      * {String} An event modifier ('altKey' or 'shiftKey') that temporarily sets
      *     the <multiple> property to true.  Default is null.
      */
    multipleKey: null,
    
     /**
      * Property: toggleKey
      * {String} An event modifier ('altKey' or 'shiftKey') that temporarily sets
      *     the <toggle> property to true.  Default is null.
      */
    toggleKey: null,
    
     /**
      * APIProperty: multiple
      * {Boolean} 允许选择多个地物，默认为false，只能选择一个地物。
      */
    multiple: false,

     /**
      * APIProperty: clickout
      * {Boolean} 是否在地物之外点击，取消选择地物。默认为true。
      */
    clickout: true,

     /**
      * APIProperty: toggle
      * {Boolean} 单击当前选中的要素时，是否取消其选中状态。默认为false。即不取消其选中状态。
      *           仅当hover属性为false有效。
      */
    toggle: false,

     /**
      * APIProperty: repeat
      * {Boolean} 是否重复触发地物选择事件，只在单选非toggle模式下有效。默认为false，表示处于
      * 选中状态的地物不在触发选择事件。
      */
    repeat: false,

     /**
      * APIProperty: hover
      * {Boolean} 在鼠标悬浮在地物上时，选中地物；移出地物时，取消选中。若设置为
      * true，鼠标点击将不起作用。默认为false。
      */
    hover: false,

     /**
      * Property: highlightOnly
      * {Boolean} If true do not actually select features (that is place them in 
      * the layer's selected features array), just highlight them. This property
      * has no effect if hover is false. Defaults to false.
      */
    highlightOnly: false,
    
     /**
      * APIProperty: box
      * {Boolean} 是否允许在图层上绘制矩形框选择地物。默认为false。
      */
    box: false,
    
     /**
      * Property: onBeforeSelect 
      * {Function} Optional function to be called before a feature is selected.
      *     The function should expect to be called with a feature.
      */
    onBeforeSelect: function() {},
    
     /**
      * APIProperty: onSelect 
      * {Function} 当地物被选中时可以调用该方法，完成用户指定的任务。要求用户定义具体方法，
      * 该方法接收当前选中要素作为参数。
      */
    onSelect: function() {},

     /**
      * APIProperty: onUnselect
      * {Function} 当地物被取消选择时可以调用该方法，完成用户指定的任务。要求用户定义具体方法，
      * 该方法接收地物要素作为参数。
      */
    onUnselect: function() {},
    
     /**
      * Property: scope
      * {Object} The scope to use with the onBeforeSelect, onSelect, onUnselect
      *     callbacks. If null the scope will be this control.
      */
    scope: null,

     /**
      * APIProperty: geometryTypes
      * {Array(String)} 通过该属性限制选中地物的类型。该属性为地物类名的字符串数组。
      */
    geometryTypes: null,

     /**
      * Property: layer
      * {<SuperMap.Layer.Vector>} The vector layer with a common renderer
      * root for all layers this control is configured with (if an array of
      * layers was passed to the constructor), or the vector layer the control
      * was configured with (if a single layer was passed to the constructor).
      */
    layer: null,
    
     /**
      * Property: layers
      * {Array(<SuperMap.Layer.Vector>)} The layers this control will work on,
      * or null if the control was configured with a single layer
      */
    layers: null,

     /**
      * APIProperty: callbacks
      * {Object} 传递给 handlers.feature 的回调函数，函数中定义了通过鼠标操作矢量要素的方法，供 handlers.feature 调用。
	  * 有关矢量要素支持的混合事件调用方式，请参考 {<SuperMap.Handler.Feature>}。使用方式如下：
	  * (start code)
      * var callbacks = {
      *     over: function(currentFeature){//todo},
      *     out: function(currentFeature){//todo},
      *     click: function(currentFeature){//todo},
      *     clickout: function(lastFeature){//todo},
      *     rightclick:function(currentFeature){//todo},
      *     dblclick: function(currentFeature){//todo}
      * };
      * var vectorLayer = new SuperMap.Layer.Vector();
      * var selectFeature = new SuperMap.Control.SelectFeature(vectorLayer, {
      *     onSelect: onFeatureSelected,
      *     callbacks: callbacks,
      *     hover: false
      * });
      * var map = new SuperMap.Map("map");
      * map.addControl(selectFeature);
      * function onFeatureSelected(currentFeature){//todo};
      * (end)
      * 上述各事件混合操作说明：
	  *
      * 1、如果要素仅需要支持click事件，在实例化SelectFeature时，只需注册onSelect事件即可，代码如下：
	  * (start code)
      * var selectFeature = new SuperMap.Control.SelectFeature(vectorLayer, {
      *     onSelect: onFeatureSelected
      * });
	  * (end)
      * 2、如果要素仅需要支持over事件，在实例化SelectFeature时，只需注册onSelect事件，
      *    同时设置hover属性为true，代码如下：
	  * (start code)
      * var selectFeature = new SuperMap.Control.SelectFeature(vectorLayer, {
      *     onSelect: onFeatureSelected，
      *     hover：true
      * });
	  * (end)
      * 3、如果要支持混合事件操作，请注册callbacks属性。不过有一点需要注意的就是在
      *    callbacks属性中同时注册了click和dblclick事件，只有click事件起作用。如果
      *    还需要dblclick起作用，请在callbacks属性中取消click注册，修改为使用
      *    onSelect注册，同时确保hover属性为false。
	  *
      * 4、在callbacks属性中注册的click、over事件会覆盖同时注册的onSelect事件。
      */
    callbacks: null,
    
     /**
      * APIProperty: selectStyle 
      * {Object} styles 样式。(样式里面的label如果没有设置则保留feature自身的label)
      */
    selectStyle: null,

    /**
     * APIProperty: allowSelectTheSameFeature
     * 允许多次点击同一要素，默认为false
     */
    allowSelectTheSameFeature:false,
    
     /**
      * Property: renderIntent
      * {String} key used to retrieve the select style from the layer's
      * style map.
      */
    renderIntent: "select",

     /**
      * Property: handlers
      * {Object} Object with references to multiple <SuperMap.Handler>
      *     instances.
      */
    handlers: null,

     /**
      * Constructor: SuperMap.Control.SelectFeature
      * 创建一个选择要素的控件。
      *
      * Parameters:
      * layers - {<SuperMap.Layer.Vector>} vector图层数组。用于从layer(s)选择要素集。
      * options - {Object} 
      *     
      *    创建 SelectFeature 控件，可用如下方法：  
      *    (start code) 
      *    //声明一个矢量图层 vectorLayer，在 vectorLayer 上进行要素选择
      *    vectorLayer = new SuperMap.Layer.Vector("Vector Layer"); 
      *    //实例化 selectFeature 控件，调用了 onSelect 和 onUnselect 方法
      *    //地物被选中时调用 onSelect 方法，地物被取消选中时调用 onUnselect 方法      
      *    selectFeature = new SuperMap.Control.SelectFeature(vectorLayer,
      *        {onSelect:onFeatureSelect,onUnselect:onUnFeatureSelect});
      *    //map上添加控件
      *    map.addControl(selectFeature);
      *    //激活控件      
      *    selectFeature.activate();      
      *          
      *    //要素被选中时调用此函数,需要传入当前选中要素参数feature
      * function onFeatureSelect(feature) {
      *     //TODO
      * }
      *    //要素被取消选中时调用此函数,需要传入当前要素参数feature
      *    function onUnFeatureSelect(feature) {
      *     //TODO
      *    }
      *    (end)       
      */
    initialize: function(layers, options) {
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        
        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);
        var callbacks = {
            click: this.clickFeature,
            clickout: this.clickoutFeature,
            over: this.overFeature,
            out: this.outFeature
        };
             
        this.callbacks = SuperMap.Util.extend(callbacks, this.callbacks);
        this.handlers = {
            feature: new SuperMap.Handler.Feature(
                this, this.layer, this.callbacks,
                {geometryTypes: this.geometryTypes,allowClickTwice:this.allowSelectTheSameFeature}
            )
        };

        if (this.box) {
            this.handlers.box = new SuperMap.Handler.Box(
                this, {done: this.selectBox},
                {boxDivClassName: "smHandlerBoxSelectFeature"}
            ); 
        }
    },

     /**
      * Method: initLayer
      * Assign the layer property. If layers is an array, we need to use
      *     a RootContainer.
      *
      * Parameters:
      * layers - {<SuperMap.Layer.Vector>}, or an array of vector layers.
      */
    initLayer: function(layers) {
        if(SuperMap.Util.isArray(layers)) {
            this.layers = layers;
            this.layer = new SuperMap.Layer.Vector.RootContainer(
                this.id + "_container", {
                    layers: layers
                }
            );
        } else {
            this.layer = layers;
        }
    },
    
     /**
      * Method: destroy
      */
    destroy: function() {
        if(this.active && this.layers) {
            this.map.removeLayer(this.layer);
        }
        SuperMap.Control.prototype.destroy.apply(this, arguments);
        if(this.layers) {
            this.layer.destroy();
        }
    },

     /**
      * Method: activate
      * Activates the control.
      * 
      * Returns:
      * {Boolean} The control was effectively activated.
      */
    activate: function () {
        if (!this.active) {
            if(this.layers) {
                this.map.addLayer(this.layer);
            }
            this.handlers.feature.activate();
            if(this.box && this.handlers.box) {
                this.handlers.box.activate();
            }
        }
        return SuperMap.Control.prototype.activate.apply(
            this, arguments
        );
    },

     /**
      * Method: deactivate
      * Deactivates the control.
      * 
      * Returns:
      * {Boolean} The control was effectively deactivated.
      */
    deactivate: function () {
        if (this.active) {
            this.handlers.feature.deactivate();
            if(this.handlers.box) {
                this.handlers.box.deactivate();
            }
            if(this.layers) {
                this.map.removeLayer(this.layer);
            }
        }
        return SuperMap.Control.prototype.deactivate.apply(
            this, arguments
        );
    },

     /**
      * Method: unselectAll
      * Unselect all selected features.  To unselect all except for a single
      *     feature, set the options.except property to the feature.
      *
      * Parameters:
      * options - {Object} Optional configuration object.
      */
    unselectAll: function(options) {
        // we'll want an option to supress notification here
        var layers = this.layers || [this.layer];
        var layer, feature;
        for(var l=0; l<layers.length; ++l) {
            layer = layers[l];
            for(var i=layer.selectedFeatures.length-1; i>=0; --i) {
                feature = layer.selectedFeatures[i];
                if(!options || options.except !== feature) {
                    this.unselect(feature);
                }
            }
        }
    },

     /**
      * Method: clickFeature
      * Called on click in a feature
      * Only responds if this.hover is false.
      *
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>} 
      */
    clickFeature: function(feature, evt) {
        if(!this.hover) {
            var selected = (SuperMap.Util.indexOf(
                feature.layer.selectedFeatures, feature) > -1);
            if(selected) {
                if(this.toggleSelect()) {
                    this.unselect(feature);
                } else if(!this.multipleSelect()) {
                    this.unselectAll({except: feature});
                    if(this.repeat){
                             this.onSelect.call(this.scope, feature, evt);
                    }
                }
            } else {
                if(!this.multipleSelect()) {
                    this.unselectAll({except: feature});
                }
                this.select(feature, evt);
            }
        }
    },

     /**
      * Method: multipleSelect
      * Allow for multiple selected features based on <multiple> property and
      *     <multipleKey> event modifier.
      *
      * Returns:
      * {Boolean} Allow for multiple selected features.
      */
    multipleSelect: function() {
        return this.multiple || (this.handlers.feature.evt &&
                                 this.handlers.feature.evt[this.multipleKey]);
    },
    
     /**
      * Method: toggleSelect
      * Event should toggle the selected state of a feature based on <toggle>
      *     property and <toggleKey> event modifier.
      *
      * Returns:
      * {Boolean} Toggle the selected state of a feature.
      */
    toggleSelect: function() {
        return this.toggle || (this.handlers.feature.evt &&
                               this.handlers.feature.evt[this.toggleKey]);
    },

     /**
      * Method: clickoutFeature
      * Called on click outside a previously clicked (selected) feature.
      * Only responds if this.hover is false.
      *
      * Parameters:
      * feature - {<SuperMap.Vector.Feature>} 
      */
    clickoutFeature: function(feature) {
        if(!this.hover && this.clickout) {
            this.unselectAll();
        }
    },

     /**
      * Method: overFeature
      * Called on over a feature.
      * Only responds if this.hover is true.
      *
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>} 
      */
    overFeature: function(feature, evt) {
        var layer = feature.layer;
        if(this.hover) {
            if(this.highlightOnly) {
                this.highlight(feature);
            } else if(SuperMap.Util.indexOf(
                layer.selectedFeatures, feature) === -1) {
                this.select(feature, evt);
            }
        }else{
            this.layer.map.eventsDiv.style.cursor="pointer";
        }
    },

     /**
      * Method: outFeature
      * Called on out of a selected feature.
      * Only responds if this.hover is true.
      *
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>} 
      */
    outFeature: function(feature) {
        if(this.hover) {
            if(this.highlightOnly) {
                // we do nothing if we're not the last highlighter of the
                // feature
                if(feature._lastHighlighter === this.id) {
                    // if another select control had highlighted the feature before
                    // we did it ourself then we use that control to highlight the
                    // feature as it was before we highlighted it, else we just
                    // unhighlight it
                    if(feature._prevHighlighter &&
                       feature._prevHighlighter !== this.id) {
                        delete feature._lastHighlighter;
                        var control = this.map.getControl(
                            feature._prevHighlighter);
                        if(control) {
                            control.highlight(feature);
                        }
                    } else {
                        this.unhighlight(feature);
                    }
                }
            } else {
                this.unselect(feature);
            }
        }else{
            this.layer.map.eventsDiv.style.cursor='';
        }
    },

     /**
      * Method: highlight
      * Redraw feature with the select style.
      *
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>} 
      */
    highlight: function(feature) {
        var layer = feature.layer;
         if(layer instanceof SuperMap.Layer.AnimatorVector){
             return;
         }
        var cont = this.events.triggerEvent("beforefeaturehighlighted", {
            feature : feature
        });
        if(cont !== false) {
            feature._prevHighlighter = feature._lastHighlighter;
            feature._lastHighlighter = this.id;
            var style = feature._selectStyle=SuperMap.Util.cloneObject(this.selectStyle);
            feature.renderIntent=this.renderIntent;
            if(style&&!style.label)
            {
                if(feature.style && feature.style.label)
                {
                    style.label = feature.style.label;
                }
            }
            layer.drawFeature(feature, style, {isSelected: true});
            this.events.triggerEvent("featurehighlighted", {feature : feature});
        }
    },

     /**
      * Method: unhighlight
      * Redraw feature with the "default" style
      *
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>} 
      */
    unhighlight: function(feature) {
        var layer = feature.layer;
         if(layer instanceof SuperMap.Layer.AnimatorVector){
             return;
         }
        // three cases:
        // 1. there's no other highlighter, in that case _prev is undefined,
        //    and we just need to undef _last
        // 2. another control highlighted the feature after we did it, in
        //    that case _last references this other control, and we just
        //    need to undef _prev
        // 3. another control highlighted the feature before we did it, in
        //    that case _prev references this other control, and we need to
        //    set _last to _prev and undef _prev
        if(feature._prevHighlighter == undefined) {
            delete feature._lastHighlighter;
        } else if(feature._prevHighlighter === this.id) {
            delete feature._prevHighlighter;
        } else {
            feature._lastHighlighter = feature._prevHighlighter;
            delete feature._prevHighlighter;
        }
         if(feature._selectStyle||feature._selectStyle==null){
             delete feature._selectStyle;
         }
         feature.renderIntent="default";
        layer.drawFeature(feature, feature.style || feature.layer.style ||
            "default",  {isSelected: true});

        this.events.triggerEvent("featureunhighlighted", {feature : feature});
    },
    
     /**
      * Method: select
      * Add feature to the layer's selectedFeature array, render the feature as
      * selected, and call the onSelect function.
      * 
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>} 
      */
    select: function(feature, evt) {
        var cont = this.onBeforeSelect.call(this.scope, feature);
        var layer = feature.layer;
         if(null === layer){
             return;
         }
         
        if(cont !== false) {
            cont = layer.events.triggerEvent("beforefeatureselected", {
                feature: feature
            });
            if(cont !== false) {
                layer.selectedFeatures.push(feature);
                this.highlight(feature);
                // if the feature handler isn't involved in the feature
                // selection (because the box handler is used or the
                // feature is selected programatically) we fake the
                // feature handler to allow unselecting on click
                if(!this.handlers.feature.lastFeature) {
                    this.handlers.feature.lastFeature = layer.selectedFeatures[0];
                }
                layer.events.triggerEvent("featureselected", {feature: feature, evt:evt});
                this.onSelect.call(this.scope, feature, evt);
            }
        }
    },

     /**
      * Method: unselect
      * Remove feature from the layer's selectedFeature array, render the feature as
      * normal, and call the onUnselect function.
      *
      * Parameters:
      * feature - {<SuperMap.Feature.Vector>}
      */
    unselect: function(feature) {
        var layer = feature.layer;
        // Store feature style for restoration later
        this.unhighlight(feature);
        SuperMap.Util.removeItem(layer.selectedFeatures, feature);
        //将不选择的踢出渲染器的渲染对象列表。
        // if(layer.useCanvas && layer.renderer.lastBounds) {
            // delete layer.renderer.features[feature.id];
        // }
        layer.events.triggerEvent("featureunselected", {feature: feature});
        this.onUnselect.call(this.scope, feature);
    },
    
     /**
      * Method: selectBox
      * Callback from the handlers.box set up when <box> selection is true
      *     on.
      *
      * Parameters:
      * position - {<SuperMap.Bounds> || <SuperMap.Pixel> }  
      */
    selectBox: function(position) {
        if (position instanceof SuperMap.Bounds) {
            var minXY = this.map.getLonLatFromPixel({
                x: position.left,
                y: position.bottom
            });
            var maxXY = this.map.getLonLatFromPixel({
                x: position.right,
                y: position.top
            });
            var bounds = new SuperMap.Bounds(
                minXY.lon, minXY.lat, maxXY.lon, maxXY.lat
            );
            
            // if multiple is false, first deselect currently selected features
            if (!this.multipleSelect()) {
                this.unselectAll();
            }
            
            // because we're using a box, we consider we want multiple selection
            var prevMultiple = this.multiple;
            this.multiple = true;
            var layers = this.layers || [this.layer];
            var layer;
            for(var l=0; l<layers.length; ++l) {
                layer = layers[l];
                for(var i=0, len = layer.features.length; i<len; ++i) {
                    var feature = layer.features[i];
                    // check if the feature is displayed
                    if (!feature.getVisibility()) {
                        continue;
                    }

                    if (this.geometryTypes == null || SuperMap.Util.indexOf(
                            this.geometryTypes, feature.geometry.CLASS_NAME) > -1) {
                        if (bounds.toGeometry().intersects(feature.geometry)) {
                            if (SuperMap.Util.indexOf(layer.selectedFeatures, feature) === -1) {
                                this.select(feature);
                            }
                        }
                    }
                }
            }
            this.multiple = prevMultiple;
        }
    },

     /** 
      * Method: setMap
      * Set the map property for the control. 
      * 
      * Parameters:
      * map - {<SuperMap.Map>} 
      */
    setMap: function(map) {
        this.handlers.feature.setMap(map);
        if (this.box) {
            this.handlers.box.setMap(map);
        }
        SuperMap.Control.prototype.setMap.apply(this, arguments);
    },
    
     /**
      * APIMethod: setLayer
      * 将新的图层附加到控件上，覆盖已经存在的图层。
      *
      * Parameters:
      * layers - {<SuperMap.Layer.Vector>}数组或者单个图层 {<SuperMap.Layer.Vector>}
      */
    setLayer: function(layers) {
        var isActive = this.active;
        this.unselectAll();
        this.deactivate();
        if(this.layers) {
            this.layer.destroy();
            this.layers = null;
        }
        this.initLayer(layers);
        this.handlers.feature.layer = this.layer;
        if (isActive) {
            this.activate();
        }
    },
    
    CLASS_NAME: "SuperMap.Control.SelectFeature"
});
