/**
 * @SuperMap.Control.SelectGrid
 */

/**
 * Class: SuperMap.Control.SelectGrid
 * 针对SuperMap.Layer.HeatGridLayer要素选择控件，该控件实现在指定的的图层上通过鼠标单击和悬浮选择矢量要素。
 *
 * 通过 active 和 deactive 两个方法，实现动态的激活和注销,该控件的激活和注销用法如下示例所示：
 *
 * 激活控件,如下方法：
 * (code)
 * selectGrid.activate();
 * (end)
 * 注销控件,如下方法：
 * (code)
 * selectGrid.deactivate();
 * (end)
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.SelectGrid = SuperMap.Class(SuperMap.Control.SelectFeature, {
    /**
     * Property: _callbacks
     * {Object} 鼠标事件
     */
    _callbacks:{},
    /**
     * Constructor: SuperMap.Control.SelectGrid
     * 创建一个支持SuperMap.Layer.HeatGridLayer的选择要素的控件。
     *
     * Parameters:
     * layer - {<SuperMap.Layer.HeatGridLayer>} HeatGridLayer 图层。用于从layer选择要素集。
     * options - {Object}
     *
     *	创建 SelectGrid 控件，可用如下方法：
     *	(start code)
     *	//声明一个热点格网图层 heatGridLayer ，在 heatGridLayer 上进行要素选择
     *	var heatGridLayer = new SuperMap.Layer.HeatGridLayer("HeatGridLayer");
     * //将 heatGridLayer	 添加到map中
     * map.addLayers([heatGridLayer]);
     *	//实例化 selectGrid 控件
     *	var select = new SuperMap.Control.SelectGrid(heatGridLayer,{
     *       callbacks:{
     *           clickFeature:function(f){
     *               //点击点事件
     *           },
     *            clickGrid:function(f){
     *               //点击网格事件
     *           },
     *           clickout:function(){
     *               //点击要素外
     *           }，
     *           mouseoverFeature:function(f){
     *               //移进点事件
     *           }，
     *           mouseoverGrid:function(f){
     *               //移进网格事件
     *           }，
     *           mouseoutFeature:function(f){
     *               //移出点事件
     *           },
     *           dblclickFeature:function(f){
     *               //双击点事件
     *           }
     *           dblclickGrid:function(f){
     *               //双击网格事件
     *           }
     *       }
     *   });
     *	//map上添加控件
     *	map.addControl(select);
     *	//激活控件
     *	select.activate();
     *
     *	//注册相关事件请见SuperMap.Layer.HeatGridLayer
     *	(end)
     */
    initialize: function(layers, options) {
        var me = this;
        SuperMap.Control.prototype.initialize.apply(this, [options]);

        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);
        this._callbacks = {
            click:function(f){
                try{
                    if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Polygon.prototype.CLASS_NAME)){
                        var layer = f.layer;
                        layer.clickGrid(f);
                        me.callbacks.clickGrid&&me.callbacks.clickGrid.apply(me,[f]);
                    }
                    else if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Point.prototype.CLASS_NAME))
                    {
                        me.callbacks.clickFeature&&me.callbacks.clickFeature.apply(me,[f]);
                    }
                }
                catch(e){}
                //屏蔽掉父类的事件，不执行，不然会出问题
                //me.clickFeature.apply(me,[f]);
            },
            clickout:function(f){
                try{
                    if(f&&f.layer){
                        var layer = f.layer;
                        layer.clickoutGrid(f);
                    }
                    me.callbacks.clickout&&me.callbacks.clickout.apply(me,[f]);
                }
                catch(e){}
                //me.clickoutFeature.apply(me,[f]);
            },
            over:function(f){
                try{
                    if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Polygon.prototype.CLASS_NAME))
                    {
                        me.callbacks.mouseoverGrid&&me.callbacks.mouseoverGrid.apply(me,[f]);
                    }
                    else if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Point.prototype.CLASS_NAME))
                    {
                        me.callbacks.mouseoverFeature&&me.callbacks.mouseoverFeature.apply(me,[f]);
                    }
                }
                catch(e){}
                //me.overFeature.apply(me,[f]);
            },
            out:function(f){
                try{
                    if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Polygon.prototype.CLASS_NAME))
                    {
                        me.callbacks.mouseoutGrid&&me.callbacks.mouseoutGrid.apply(me,[f]);
                    }
                    else if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Point.prototype.CLASS_NAME))
                    {
                        me.callbacks.mouseoutFeature&&me.callbacks.mouseoutFeature.apply(me,[f]);
                    }
                }
                catch(e){}
                //me.outFeature.apply(me,[f]);
            },
            dblclick:function(f){
                if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Polygon.prototype.CLASS_NAME))
                {
                    me.callbacks.dblclickGrid&&me.callbacks.dblclickGrid.apply(me,[f]);
                }
                else if(f&&f.layer&&(f.geometry.CLASS_NAME === SuperMap.Geometry.Point.prototype.CLASS_NAME))
                {
                    me.callbacks.dblclickFeature&&me.callbacks.dblclickFeature.apply(me,[f]);
                }
                //me.dblclick.apply(me,[f]);
            }
        }
        this.handlers = {
            feature: new SuperMap.Handler.Feature(
                this, this.layer, this._callbacks,
                {geometryTypes: this.geometryTypes}
            )
        };

        if (this.box) {
            this.handlers.box = new SuperMap.Handler.Box(
                this, {done: this.selectBox},
                {boxDivClassName: "smHandlerBoxSelectFeature"}
            );
        }
    },


    CLASS_NAME: "SuperMap.Control.SelectGrid"
});

