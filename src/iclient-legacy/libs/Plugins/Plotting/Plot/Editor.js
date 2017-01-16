/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.Editor
 * 标号对象编辑类，负责标号对象编辑操作（拷贝、粘贴、剪切）。
 */
SuperMap.Plot.Editor = new SuperMap.Class({

    /**
     * Property: map
     * {SuperMap.Map}
     */
    map: null,

    /**
     * Property: pasteGeoAry
     * {Array(<SuperMap.Feature.Vector>)}用于存放拷贝对象的数组。该数组保存的为对象本身，即使用时需要复制。
     */
    pasteGeoAry: null,

    /**
     * APIProperty: activeLayer
     * {<SuperMap.Layer.PlottingLayer>} 可编辑标号对象所在图层，未设置取第一个可编辑图层。
     */
    activeLayer: null,

    /**
     * APIProperty: plottingEdit
     * {<SuperMap.Control.PlottingEdit>} 标号对象的鼠标编辑控件。
     */
    plottingEdit: null,

    /**
     * Constructor: SuperMap.Plot.Editor
     * 构建一个图形对象编辑类。
     *
     * Parameters:
     * map - {<SuperMap.Map>}。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Plot.Editor>}  结果类型对象。
     */
    initialize: function(map, options){
        if(map && map !== null){
            this.map = map;
        }

        if(options && options.activeLayer){
            this.activeLayer = options.activeLayer;
        }
        if(options && options.plottingEdit){
            this.plottingEdit = options.plottingEdit;
        }

        this.pasteGeoAry = [];
        this.init();
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。
     */
    destroy: function() {
        this.map = null;
        this.activeLayer = null;
        this.plottingEdit = null;
        this.pasteGeoAry = null;
    },

    /**
     * Method: init
     * 初始化当前活动图层以及标绘对象编辑控件。
     */
    init: function(){
        if(this.activeLayer === null){
            var layers = this.map.layers;
            for (var n = 0; n < layers.length; n++) {
                if (layers[n].isEditable && layers[n].selectedFeatures.length >= 1) {
                    this.activeLayer = layers[n];
                    break;
                }
            }
        }

        if(this.plottingEdit === null ) {
            var controls = this.map.controls;
            for (var m = 0; m < controls.length; m++) {
                if (controls[m].CLASS_NAME === "SuperMap.Control.PlottingEdit" && controls[m].layer === this.activeLayer) {
                    this.plottingEdit = controls[m];
                }
            }
        }
    },

    /**
     * APIMethod: copyFeatures
     * 拷贝标号对象。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要拷贝的标号对象数组，适用于编程操作。
     */
    copyFeatures: function(features){
        this.pasteGeoAry = [];
        this.init();

        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }

        for(var i = 0;i < features.length; i++){
            var feature = features[i];
            if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)
            {
                this.pasteGeoAry.push(feature);
            }
        }
    },

    /**
     * APIMethod: copy
     * 拷贝选中的标号对象。
     */
    copy: function(){
        this.pasteGeoAry = [];

        this.init();

        for(var i = 0;i < this.activeLayer.selectedFeatures.length; i++){
            var feature = this.activeLayer.selectedFeatures[i];
            if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)
            {
                this.pasteGeoAry.push(feature);
            }
        }
    },

    /**
     * APIMethod: cut
     *  剪切选中的图形对象。
     */
    cut: function(){
        this.pasteGeoAry = [];

        this.init();

        for(var i = 0;i < this.activeLayer.selectedFeatures.length; i++){
            var feature = this.activeLayer.selectedFeatures[i];
            if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)
            {
                SuperMap.Util.removeItem(this.activeLayer.selectedFeatures, feature);
                SuperMap.Util.removeItem(this.activeLayer.features, feature);
                this.plottingEdit.unselectFeature(feature);
                i--;
                this.pasteGeoAry.push(feature);
            }
        }

    },

    /**
     * APIMethod: paste
     *  粘贴复制或剪切的图形对象。
     *
     *  Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要拷贝的标号对象数组，适用于编程操作。
     */
    pasteToPosition: function(position){

        this.init();

        for(var i = 0;i < this.pasteGeoAry.length; i++){
            var feature = this.pasteGeoAry[i];
            if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)
            {
                var copyFeature = SuperMap.Plot.PlottingUtil.copyFeature(feature);
                copyFeature.geometry.setPositionPoints(position);
                this.activeLayer.addFeatures(copyFeature, {silent: true});
            }
        }
    },

    /**
     * APIMethod: paste
     *  粘贴复制或剪切的图形对象。
     */
    paste: function(){

        this.init();

        for(var i = 0;i < this.pasteGeoAry.length; i++){
            var feature = this.pasteGeoAry[i];
            if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)
            {
                var copyFeature = SuperMap.Plot.PlottingUtil.copyFeature(feature);
                this.activeLayer.addFeatures(copyFeature, {silent: true});
            }
        }
    },

    CLASS_NAME: "SuperMap.Plot.Editor"
});