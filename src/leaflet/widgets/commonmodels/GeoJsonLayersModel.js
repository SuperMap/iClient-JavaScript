/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
// import {
//     CommonUtil
// } from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.GeoJsonLayersDataModel
 * @description 多图层数据模型
 * @category Widgets
 * @param {Array.<Object>} layers - 图层数组。
 * @param {L.supermap.widgets.GeoJSONLayersWithName} layers.layerObject - 含有 layerName 与 GeoJSON 图层的对象。 
 */
export var GeoJsonLayersDataModel = L.Evented.extend({
    initialize(layers) {
        this.layers = [];
        if (layers && layers.length > 0) {
            this.addLayers(layers);
        }
        this.currentLayerDataModel = null;
    },
    addLayers(layers) {
        for (let i = 0; i < layers.length; i++) {
            let layerName = layers[i].layerName;
            let geoJsonLayerDataModel = new GeoJsonLayerDataModel(layers[i].layer);
            //赋给 GeoJsonLayersDataModel 对象 layerName 属性，每个图层名对应一个 layerDataModel 对象
            this.layers[layerName] = geoJsonLayerDataModel;
            this.fire("newlayeradded", { newLayer: { layerName: layerName, layer: geoJsonLayerDataModel } });
        }
    },

    /**
     * @function L.supermap.widgets.GeoJsonLayersDataModel.prototype.setCurrentLayerDataModel
     * @description 设置当前选中的图层。
     * @param {string} layerName - 选中的图层名。
     */
    setCurrentLayerDataModel(layerName) {
        if (this.layers[layerName]) {
            this.currentLayerDataModel = this.layers[layerName];
        }
    }
});

L.supermap.widgets.GeoJsonLayersDataModel = GeoJsonLayersDataModel;


/**
 * @class L.supermap.widgets.GeoJsonLayerDataModel
 * @classdesc 图层数据模型，用于图层要素数据及属性管理等。
 * @param {L.GeoJSON} layer - GeoJSON 图层。
 * 注：leaflet没有 feature 的概念
 */
export class GeoJsonLayerDataModel {

    constructor(layer) {
        //图层对象
        this.layer = layer;
        //要素图层数组
        this.features = layer.getLayers();
        //图层属性字段
        this.attributeNames = [];
        //这里一个图层默认共用一套属性字段
        if (this.features[0].feature.properties) {
            for (let field in this.features[0].feature.properties) {
                this.attributeNames.push(field);
            }
        }
        //指定图层操作属性字段
        this.operatingAttributeNames = [];
        //图层属性对象
        this.attributes = {};
    }

    /**
     * @function GeoJsonLayerDataModel.prototype.setOperatingAttributeNames
     * @description 指定操作字段。
     * @param {Array.<string>} operatingAttr - 查询属性字段数组，该数组为 this.attributeNames 的子集。
     */
    setOperatingAttributeNames(operatingAttr) {
        this.operatingAttributeNames = operatingAttr;
    }

    /**
     * @function GeoJsonLayerDataModel.prototype.getAllAttributeNames
     * @description 获取图层所有属性字段。
     * @returns {Array.<string>} - 返回图层所有属性字段。
     */
    getAllAttributeNames() {
        return this.attributeNames;
    }

    /**
     * @function GeoJsonLayerDataModel.prototype.getAttributeNamesByType
     * @description 获取指定类型的图层属性字段。
     * @param {string} [type] - 需要获取的图层属性字段的类型。目前可选 "Num"，若不传此参数，则默认返回所有字段。
     * @returns {Array.<string>} - 返回指定类型的图层属性字段。
     */
    getAttributeNamesByType(type) {
        //图层属性字段
        if (this.features[0].feature.properties) {
            let properties = this.features[0].feature.properties;
            let attributeNames = [];
            if (type === 'Num') {
                for (let field in properties) {
                    if (!isNaN(properties[field])) {
                        attributeNames.push(field);
                    }
                }
            } else {
                attributeNames = this.attributeNames;
            }
            return attributeNames;
        }
    }

    /**
     * @function GeoJsonLayerDataModel.prototype.getAllFeatures
     * @description 获取图层所有要素
     * @returns {Array.<Object>} - 返回图层要素
     */
    getAllFeatures() {
        return this.features;
    }

    /**
     * @function GeoJsonLayerDataModel.prototype.getAttributeValueByAttributeName
     * @description 通过属性字段名获取属性值
     * @param {string} attributeName - 图层要素属性字段名
     * @returns {Object} - 图层要素属性值对象
     */
    getAttributeValueByAttributeName(attributeName) {
        //如果图层属性对象中已存在该属性，则直接返回
        if (this.attributes[attributeName]) {
            return this.attributes[attributeName];
        }

        //若图层属性对象还未存储该属性，则遍历每个feature 读取其属性值，并存储到图层属性对象中
        this.attributes[attributeName] = [];
        for (let i = 0; i < this.features.length; i++) {
            this.attributes[attributeName].push([this.features[i].feature.properties[attributeName]]);
        }

        return this.attributes[attributeName];
    }

    //getAttributeValueByAttributeName(feature,attributeName)
    //getAllFeatures()
    //todo getFeatureByID()
    //getFeaturesByKeywords(keyword,searchAttributeNames)
    //getAllAttributeValues(attributeName)    ??
    //getAllAttributeNames()

    /**
     * @function GeoJsonLayerDataModel.prototype.getFeaturesByKeyWord
     * @description 通过关键字查找要素对象
     * @param {string} keyWord - 查询关键字
     * @returns {Array.<Object>} - 返回要素对象数组
     */
    getFeaturesByKeyWord(keyWord) {
        let features = [], keyReg = new RegExp(keyWord.toLowerCase());
        const self = this;
        this.features.forEach(function (feature) {
            if (!feature.feature.properties) {
                return null;
            }
            let fAttr = feature.feature.properties;
            let operatingAttributeNames;
            //若设置了过滤字段，则按过滤字段查询
            if (self.operatingAttributeNames.length > 0) {
                operatingAttributeNames = self.operatingAttributeNames;
            } else {
                //若未设置了过滤字段，则按图层字段查询
                operatingAttributeNames = self.attributeNames;
            }
            //遍历要素，查询符合条件的要素
            for (let i = 0, len = operatingAttributeNames.length; i < len; i++) {
                if (fAttr[operatingAttributeNames[i]] && keyReg.test(fAttr[operatingAttributeNames[i]].toString().toLowerCase())) {
                    let filterAttributeName = operatingAttributeNames[i];
                    let filterAttributeValue = fAttr[operatingAttributeNames[i]];
                    //将查询出的属性字段及属性值赋给 feature 并返回
                    feature.filterAttribute = {
                        filterAttributeName: filterAttributeName,
                        filterAttributeValue: filterAttributeValue
                    };
                    features.push(feature);
                    break;
                }
            }
        });
        return features;
    }
}
