/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control/SelectFeature.js
 */

 /**
  * Class: SuperMap.Control.SelectCluster
  * 针对SuperMap.Layer.ClusterLayer要素选择控件，该控件实现在指定的的图层上通过鼠标单击和悬浮选择矢量要素。
  * 
  * 通过 active 和 deactive 两个方法，实现动态的激活和注销,该控件的激活和注销用法如下示例所示：
  * 
  * 激活控件,如下方法： 
  * (code)  
  * selectCluster.activate();
  * (end) 
  * 注销控件,如下方法： 
  * (code) 
  * selectCluster.deactivate();
  * (end) 
  * 
  * Inherits from:
  *  - <SuperMap.Control>
  */
SuperMap.Control.SelectCluster = SuperMap.Class(SuperMap.Control.SelectFeature, {
    /**
     * Property: _callbacks
     * {Object} 鼠标事件
     */
    _callbacks:{},

    /**
     * Constructor: SuperMap.Control.SelectCluster
     * 创建一个支持SuperMap.Layer.ClusterLayer的选择要素的控件。
     *
     * Parameters:
     * layers - {Array<SuperMap.Layer.Vector>} ClusterLayer图层或图层数组(也可以为SuperMap.Layer.Vector图层)。用于从layer(s)选择要素集。
     * options - {Object}
     *
     *	创建 SelectCluster 控件，可用如下方法：
     *	(start code)
     *	//声明一个聚类图层 clusterLayer 控件，在 clusterLayer 上进行要素选择
     *	var clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster");
     *	//实例化 selectCluster 控件
     *	var select = new SuperMap.Control.SelectCluster(clusterLayer,{
     *      callbacks:{
     *           click:function(f){//点击事件
     *               if(f.isCluster){
     *                   //聚散点
     *               }
     *               else{
     *                   //非聚散点
     *               }
     *           },
     *           clickout:function(){//点击要素外
     *               //your code
     *           }，
     *           over:function(f){
     *               //mouseover事件
     *           }，
     *           out:function(f){
     *               //mouseout事件
     *           },
     *           dblclick:function(f){
     *               //双击事件
     *           }
     *       }
     *   });
     *	//map上添加控件
     *	map.addControl(select);
     *	//激活控件
     *	select.activate();
     *	(end)
     */
    initialize: function(layers, options) {
        var me = this;
        SuperMap.Control.prototype.initialize.apply(this, [options]);

        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);
//        var callbacks = {
//            click: me.clickFeature,
//            clickout: me.clickoutFeature
//        };
//        if (this.hover) {
//            callbacks.over = me.overFeature;
//            callbacks.out = me.outFeature;
//        }

        //this.callbacks = SuperMap.Util.extend(callbacks, this.callbacks);
        this._callbacks = {
            click:function(f){
                try{
                    if(f&&f.isCluster&&f.layer){
                        var layer = f.layer;
                        layer.clickCluster(f);
                    }
                    me.callbacks.click&&me.callbacks.click.apply(me,[f]);
                }
                catch(e){}
                me.clickFeature.apply(me,[f]);
            },
            clickout:function(f){
                try{
                    if(f&&f.layer){
                        var layer = f.layer;
                        layer.clickoutCluster(f);
                    }
                    me.callbacks.clickout&&me.callbacks.clickout.apply(me,[f]);
                }
                catch(e){}
                me.clickoutFeature.apply(me,[f]);
            },
            over:function(f){
                try{
                    me.callbacks.over&&me.callbacks.over.apply(me,[f]);
                }
                catch(e){}
                me.overFeature.apply(me,[f]);
            },
            out:function(f){
                try{
                    me.callbacks.out&&me.callbacks.out.apply(me,[f]);
                }
                catch(e){}
                me.outFeature.apply(me,[f]);
            },
            dblclick:function(f){
                me.callbacks.dblclick&&me.callbacks.dblclick.apply(me,[f]);
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
    
    CLASS_NAME: "SuperMap.Control.SelectCluster"
});
