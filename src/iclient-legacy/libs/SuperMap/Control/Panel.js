/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */

/**
 * Class: SuperMap.Control.Panel
 * 该类表示控件的容器。
 * 
 * 可以通过两种方法在 map 上添加控件,可通过在实例化 map 时 设置 map 的 options 属性添加，还可以通过 map 的 addControl() 方法添加，如下示例所示:
 * (code)
 * //定义一个矢量图层 vectorLayer 用于 ModifyFeature 控件进行要素的编辑
 * var vector = new SuperMap.Layer.Vector("vector layer");  
 * //实例化 Panel 控件
 * var toolbar = new SuperMap.Control.Panel();
 * // Panel 控件上添加控件
 * toolbar.addControls(new SuperMap.Control.ModifyFeature(vector));
 *
 * // Panel 控件添加到 map 上
 * // 下面是在实例化 map 时设置 map 的 options 属性添加
 * var map = new SuperMap.Map("map",{controls:[
 *     toolbar
 * ]});
 * 
 * // 或者通过 map 的 addControl() 方法添加
 * var map = new SuperMap.Map("map");
 * map.addControl(toolbar);
 * (end)
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.Panel = SuperMap.Class(SuperMap.Control, {
    /**
     * Property: controls
     * {Array(<SuperMap.Control>)}
     */
    controls: null,    
    
    /**
     * APIProperty: autoActivate
     * {Boolean} 设置该类添加到地图时，是否自动激活。默认为 true。
     */
    autoActivate: true,

    /** 
     * APIProperty: defaultControl
     * {<SuperMap.Control>} 被激活的控件。如果saveState设为true，在panel控件被激活之后defaultControl属性将失效。
     */
    defaultControl: null,
    
    /**
     * APIProperty: saveState
     * {Boolean} 如果设置为true，当前panel控件状态可以存储和恢复，默认为false。
     */
    saveState: false,
      
    /**
     * APIProperty: allowDepress
     * {Boolean} 如果设为true，点击 <SuperMap.Control.TYPE_TOOL> 控件图标使其停用。默认为false。
     */
    allowDepress: false,
    
    /**
     * Property: activeState
     * {Object} stores the active state of this panel's controls.
     */
    activeState: null,

    /**
     * Constructor: SuperMap.Control.Panel
     * 创建一个新的panel控件。
     *
     * panel上的每个控件都有个小图标表示，当点击一个小图标时，activateControl方法被调用。
     *
     * panel上控件特有的属性:
     * type - {Number}  <SuperMap.Control.TYPE_TOOL> ,  <SuperMap.Control.TYPE_TOGGLE> ,
	 *  <SuperMap.Control.TYPE_BUTTON> 其中之一，默认为SuperMap.Control.TYPE_TOOL。
     *     
     * title - {string} 当鼠标滑到表示控件图标上时显示的文本。   
     *
     * control的type属性:
     * <SuperMap.Control.TYPE_TOOL> - 一个控件被激活那么在同一panel上的同类型的其他控件将失效。此类型为默认类型。
     * <SuperMap.Control.TYPE_TOGGLE> - 切换控件的激活状态。
     * <SuperMap.Control.TYPE_BUTTON> - <SuperMap.Control.Button.trigger> 方法被调用，但是其激活状态不会发生改变。
     *
     * Parameters:
     * options - {Object} 一个可选的对象，其属性将用于扩展控件。
     */
    initialize: function(options) {
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        this.controls = [];
        this.activeState = {};
    },

    /**
     * APIMethod: destroy
     * 销毁控件，释放相关资源。
     */
    destroy: function() {
        SuperMap.Control.prototype.destroy.apply(this, arguments);
        for (var ctl, i = this.controls.length - 1; i >= 0; i--) {
            ctl = this.controls[i];
            if (ctl.events) {
                ctl.events.un({
                    activate: this.iconOn,
                    deactivate: this.iconOff
                });
            }
            SuperMap.Event.stopObservingElement(ctl.panel_div);
            ctl.panel_div = null;
        }
        this.activeState = null;
    },

    /**
     * APIMethod: activate
     * 激活控件及其相关的处理事件(handler)，控件失效调用deactivate方法。
     */
    activate: function() {
        if (SuperMap.Control.prototype.activate.apply(this, arguments)) {
            var control;
            for (var i=0, len=this.controls.length; i<len; i++) {
                control = this.controls[i];
                if (control === this.defaultControl ||
                            (this.saveState && this.activeState[control.id])) {
                    control.activate();
                }
            }    
            if (this.saveState === true) {
                this.defaultControl = null;
            }
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    
    /**
     * APIMethod: deactivate
     * 使控件及其相关的处理事件(handler)失效。
     */
    deactivate: function() {
        if (SuperMap.Control.prototype.deactivate.apply(this, arguments)) {
            var control;
            for (var i=0, len=this.controls.length; i<len; i++) {
                control = this.controls[i];
                this.activeState[control.id] = control.deactivate();
            }    
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    
    /**
     * Method: draw
     *
     * Returns:
     * {DOMElement}
     */    
    draw: function() {
        SuperMap.Control.prototype.draw.apply(this, arguments);
        this.addControlsToMap(this.controls);
        return this.div;
    },

    /**
     * Method: redraw
     */
    redraw: function() {
        for (var l=this.div.childNodes.length, i=l-1; i>=0; i--) {
            this.div.removeChild(this.div.childNodes[i]);
        }
        this.div.innerHTML = "";
        if (this.active) {
            for (var i=0, len=this.controls.length; i<len; i++) {
                this.div.appendChild(this.controls[i].panel_div);
            }
        }
    },

    /**
     * APIMethod: activateControl
     * 当用户点击表示控件面板的图标时调用此方法。
     *
     * Parameters:
     * control - {<SuperMap.Control>}
     */
    activateControl: function (control) {
        if (!this.active) { return false; }
        if (control.type === SuperMap.Control.TYPE_BUTTON) {
            control.trigger();
            return;
        }
        if (control.type === SuperMap.Control.TYPE_TOGGLE) {
            if (control.active) {
                control.deactivate();
            } else {
                control.activate();
            }
            return;
        }
        if (this.allowDepress && control.active) {
            control.deactivate();
        } else {
            var c;
            for (var i=0, len=this.controls.length; i<len; i++) {
                c = this.controls[i];
                if (c !== control &&
                   (c.type === SuperMap.Control.TYPE_TOOL || c.type == null)) {
                    c.deactivate();
                }
            }
            control.activate();
        }
    },

    /**
     * APIMethod: addControls
     * 创建工具栏，在其之上添加一系列的控件，可以在控件面板上添加单独的一个或者一组控件。
     *
     * Parameters:
     * controls - {<SuperMap.Control>} 在面板上添加的控件。
     */    
    addControls: function(controls) {
        if (!(SuperMap.Util.isArray(controls))) {
            controls = [controls];
        }
        this.controls = this.controls.concat(controls);
        
        // Give each control a panel_div which will be used later.
        // Access to this div is via the panel_div attribute of the 
        // control added to the panel.
        // Also, stop mousedowns and clicks, but don't stop mouseup,
        // since they need to pass through.
        for (var i=0, len=controls.length; i<len; i++) {
            var element = document.createElement("div");
            element.className = controls[i].displayClass + "ItemInactive";
            controls[i].panel_div = element;
            if (controls[i].title != "") {
                controls[i].panel_div.title = controls[i].title;
            }
            SuperMap.Event.observe(controls[i].panel_div, "click", 
                SuperMap.Function.bind(this.onClick, this, controls[i]));
            SuperMap.Event.observe(controls[i].panel_div, "dblclick", 
                SuperMap.Function.bind(this.onDoubleClick, this, controls[i]));
            SuperMap.Event.observe(controls[i].panel_div, "mousedown", 
                SuperMap.Function.bindAsEventListener(SuperMap.Event.stop));
        }    

        if (this.map) { // map.addControl() has already been called on the panel
            this.addControlsToMap(controls);
            this.redraw();
        }
    },
   
    /**
     * Method: addControlsToMap
     * 仅供draw、addControls方法内部使用。
     *
     * Parameters:
     * controls - {Array(<SuperMap.Control>)} 添加到地图上的控件。
     */         
    addControlsToMap: function (controls) {
        var control;
        for (var i=0, len=controls.length; i<len; i++) {
            control = controls[i];
            if (control.autoActivate === true) {
                control.autoActivate = false;
                this.map.addControl(control);
                control.autoActivate = true;
            } else {
                this.map.addControl(control);
                control.deactivate();
            }
            control.events.on({
                activate: this.iconOn,
                deactivate: this.iconOff
            });
        }  
    },

    /**
     * Method: iconOn
     * Internal use, for use only with "controls[i].events.on/un".
     */
     iconOn: function() {
        var d = this.panel_div; // "this" refers to a control on panel!
        d.className = d.className.replace(/ItemInactive$/, "ItemActive");
    },

    /**
     * Method: iconOff
     * Internal use, for use only with "controls[i].events.on/un".
     */
     iconOff: function() {
        var d = this.panel_div; // "this" refers to a control on panel!
        d.className = d.className.replace(/ItemActive$/, "ItemInactive");
    },

    /**
     * Method: onClick
     */
    onClick: function (ctrl, evt) {
        SuperMap.Event.stop(evt ? evt : window.event);
        this.activateControl(ctrl);
    },

    /**
     * Method: onDoubleClick
     */
    onDoubleClick: function(ctrl, evt) {
        SuperMap.Event.stop(evt ? evt : window.event);
    },

    /**
     * APIMethod: getControlsBy
     * 根据给定条件匹配得到的控件列表。
     *
     * Parameter:
     * property - {String} 用来匹配控件的属性。
     * match - {String | Object} 匹配字符串。可以是正则表达式的文字或者对象，也可以用test方法。对于正规表达式，如果  
	 * match.test(control[property])的值是true，则匹配到的控件将会放到数组中被返回。如果没有匹配到控件则返回空数组。
     *
     * Returns:
     * {Array(<SuperMap.Control>)} 根据给定条件匹配到的控件列表。如果没有匹配的控件，则返回空列表。
     */
    getControlsBy: function(property, match) {
        var test = (typeof match.test === "function");
        var found = SuperMap.Array.filter(this.controls, function(item) {
            return item[property] === match || (test && match.test(item[property]));
        });
        return found;
    },

    /**
     * APIMethod: getControlsByName
     * 根据给定名称匹配到的控件名称列表。
     *
     * Parameter:
     * match - {String | Object} 空间名称。可以是正则表达式的文字或者对象，可以用test方法。对于正则表达式，如果  
	 * name.test(control.name) 的值是true，则匹配到的控件将会放到数组中被返回。如果没有匹配到控件则返回空数组。
     *
     * Returns:
     * {Array(<SuperMap.Control>)} 根据给定名称匹配到的控件名称列表，如果没有匹配到则返回空数组。
     */
    getControlsByName: function(match) {
        return this.getControlsBy("name", match);
    },

    /**
     * APIMethod: getControlsByClass
     * 获取一个给定类型的控件列表
     *
     * Parameter:
     * match - {String | Object} 控件类名。类型也可以是一个正则表达式的文字或对象。此外也可以是带有test方法的对象，对于正则表达式，
	 如果type.test(control.CLASS_NAME)值是true，则返回匹配到的控件列表，没有匹配到控件，则返回空数组。
     *
     * Returns:
     * {Array(<SuperMap.Control>)} 一个给定类型的控件列表,如果没有匹配到，则返回空数组。
     */
    getControlsByClass: function(match) {
        return this.getControlsBy("CLASS_NAME", match);
    },

    CLASS_NAME: "SuperMap.Control.Panel"
});

