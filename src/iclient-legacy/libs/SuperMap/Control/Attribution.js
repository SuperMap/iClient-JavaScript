/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */

/**
 * Class: SuperMap.Control.Attribution
 *
 * 将各图层的'attribution'属性显示到地图上。
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.Attribution = 
  SuperMap.Class(SuperMap.Control, {
    
    /**
     * APIProperty: separator
     * {String} 分隔符，用来分离各图层的字符串。
     */
    separator: ", ",
    
    /**
     * APIProperty: template
     * {String} 'attribution'的模版，默认为"${layers}"。
     * 模版中必须包含"${layers}"，${layers}"会被各图层的'attribution'属性所替代 ，并使用<separator>分隔符分开。
     */
    template: "${layers}",
    
    /**
     * Constructor: SuperMap.Control.Attribution.
     *
     * Parameters:
     * options - {Object} Options for control.
     *
     * 使用方式介绍：
     * 1.用户直接创建该控件，并添加至地图
     * 2.指定对应Layer的Attribution属性信息
     * 3.这样Attribution则完成将对应图层属性信息显示在地图页面效果
     * 4.当多个图层叠加显示的时候，多个图层属性信息用”，“ 的形式隔开,如：”Data by 超图云，CloudLayer“。
     *
     * (code)
     * 	var map = new SuperMap.Map("map",{ controls:[
     * 	new SuperMap.Control.Attribution()],
     * 	allOverlays:true});
     *
     *  var layer1=new SuperMap.Layer.CloudLayer();
     *  var layer = new SuperMap.Layer.CloudLayer();
     *  layer.attribution = "Data by 超图云";
     *  layer1.attribution="CloudLayer" ；
     *  map.addLayers([layer,layer1]);
     * (end)
     */

    /** 
     * APIMethod: destroy
     * 销毁控件
     */
    destroy: function() {
        this.map.events.un({
            "removelayer": this.updateAttribution,
            "addlayer": this.updateAttribution,
            "changelayer": this.updateAttribution,
            "changebaselayer": this.updateAttribution,
            scope: this
        });
        SuperMap.Control.prototype.destroy.apply(this, arguments);
    },    
    
    /**
     * Method: draw
     * 绘制
	 * 初始化控件。
     * 
     * Returns: 
     * {DOMElement} 返回一个包含控件的div dom元素
     */    
    draw: function() {
        SuperMap.Control.prototype.draw.apply(this, arguments);
        
        this.map.events.on({
            'changebaselayer': this.updateAttribution,
            'changelayer': this.updateAttribution,
            'addlayer': this.updateAttribution,
            'removelayer': this.updateAttribution,
            scope: this
        });
        this.updateAttribution();
        
        return this.div;    
    },

    /**
     * APIMethod: updateAttribution
     * 更新'attribution'   
     */
    updateAttribution: function() {
        var attributions = [];    
        if (this.map && this.map.layers) {
            for(var i=0, len=this.map.layers.length; i<len; i++) {
                var layer = this.map.layers[i];
                if (layer.attribution && layer.getVisibility()) {
                    // add attribution only if attribution text is unique                  
                    if (SuperMap.Util.indexOf(attributions, layer.attribution) === -1)
                    {
                        attributions.push( layer.attribution );
                    }
                }
            } 
            this.div.innerHTML = SuperMap.String.format(this.template, {
                layers: attributions.join(this.separator)
            });
        }
    },
    CLASS_NAME: "SuperMap.Control.Attribution"
});
