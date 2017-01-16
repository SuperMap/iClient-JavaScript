/* COPYRIGHT 2016 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Vector.js
 */

/**
 * Class: SuperMap.Layer.PlottingLayer
 * 该图层用于渲染标号。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Vector>
 */
SuperMap.Layer.PlottingLayer = new SuperMap.Class(SuperMap.Layer.Vector,{

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *symbolcreated* 创建标号成功并添加到图层时触发该事件。
     */

    EVENT_TYPES: ["symbolcreated"],

    /**
     * APIProperty: serverUrl
     * {String} serverUrl表示标绘服务的URI
     */
    serverUrl: true,

    /**
     * APIProperty: locked
     * {Boolean} locked表示图层是否锁定
     */
    isLocked: false,

    /**
     * APIProperty: isEditable
     * {Boolean} isEditable表示图层是否可编辑
     */
    isEditable: true,

    /**
     * APIProperty: description
     * {String} description表示图层的描述信息
     */
    description: null,

    /**
     * APIProperty: plottingEdit
     * {<SuperMap.Control.PlottingEdit>} plottingEdit表示该图层上标号的编辑控件
     */
    plottingEdit: null,

    /**
     * APIProperty: drawGraphicObject
     * {<SuperMap.Control.DrawFeature>} drawGraphicObject表示该图层上标号的绘制控件
     */
    drawGraphicObject: null,

    /**
     * Property: symbolDataCache
     * {Object} 上次编程标绘接口创建点标号的数据。
     */
    symbolDataCache: null,

    /**
     * APIProperty: tolerancePixel
     * {Integer} tolerancePixel标识选择对象时的容限。
     */
    tolerancePixel: 5,

    /**
     * Constructor: SuperMap.Layer.PlottingLayer
     * 创建一个标绘图层。
     * (start code)
     * //创建一个名为“PlottingLayer”    、采用 Canvas2 渲染方式渲染的标绘图层。
     *  var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", {renderers: ["Canvas2"]});
     * (end)
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * plottingUrl - {String} 标绘服务地址
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.PlottingLayer>} 新的标绘图层。
     */
    initialize: function(name, serverUrl, options){
        if(options && options.renderers){
            options.renderers = this.changeRenderers(options.renderers);
        } else {
            this.renderers = ["PlotSVG", "PlotVML", "PlotCanvas", "PlotCanvas2"];
        }

        this.serverUrl = serverUrl;
        this.symbolDataCache = [];

        this.EVENT_TYPES =
            SuperMap.Layer.PlottingLayer.prototype.EVENT_TYPES.concat(
                SuperMap.Layer.Vector.prototype.EVENT_TYPES);

        //EVENT_TYPES去重复项
        var n = []
        for(var i = 0; i < this.EVENT_TYPES.length ; i++){
            if(n.indexOf(this.EVENT_TYPES[i]) == -1)
                n.push(this.EVENT_TYPES[i]);
        }
        this.EVENT_TYPES = n;

        SuperMap.Layer.Vector.prototype.EVENT_TYPES = this.EVENT_TYPES;

        SuperMap.Layer.Vector.prototype.initialize.apply(this, [name, options]);
    },

    /**
     * APIMethod: destroy
     * 销毁标绘图层，释放资源。
     */
    destroy: function() {
        this.serverUrl = null;
        this.description = null;
        this.symbolDataCache = null;
        if(this.plottingEdit !== null){
            this.plottingEdit.destroy();
            this.plottingEdit = null;
        }
        if(this.drawGraphicObject !== null){
            this.drawGraphicObject.destroy();
            this.drawGraphicObject = null;
        }

        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: changeRenderers
     * 修改渲染器名称
     */
    changeRenderers: function(renderers){
        function changeRenderer(renderer){
            if(renderer === "SVG"){
                return "PlotSVG";
            } else if(renderer === "VML"){
                return "PlotVML";
            } else if(renderer === "Canvas"){
                return "PlotCanvas";
            } else if(renderer === "Canvas2"){
                return "PlotCanvas2";
            }
        }

        for(var i = 0; i < renderers.length; i++){
            renderers[i] = changeRenderer(renderers[i]);
        }

        return renderers;
    },

    /**
     * APIMethod: drawFeature
     * 在当前图层中绘制一个feature。如果参数中的样式（style）被设置
     * 则使用。否则使用矢量要素的样式。如果未设置要素的样式，则使用图层上的样式。
     * 点标号需要重新计算点，线面标号则沿用以前的处理方式
     *
     * 当要素的样式更改或者要素已经添加到图层上需要更新时使用该函数。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}需要绘制的要素
     * style - {Object | {}} 风格
     */
    drawFeature: function(feature, style, option){
        //标号随图缩放时刷新处理
        if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry){
            feature.geometry.reView();
            this.events.triggerEvent("moveed");
        }

        feature.geometry.clearBounds();
        SuperMap.Layer.Vector.prototype.drawFeature.apply(this,arguments);
        //for(var i = 0; i < feature.geometry.geoSymbolTexts.length; i++){
        //    SuperMap.Layer.Vector.prototype.drawFeature.apply(this,[feature.geometry.geoSymbolTexts[i].feature, feature.geometry.geoSymbolTexts[i].feature.style]);
        //}
    },

    /**
     * Method: drawFeatures
     * 遍历所有features，并绘制，
     */
    drawFeatures: function(bounds) {
        SuperMap.Layer.Vector.prototype.drawFeatures.apply(this,arguments);

        if(this.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas" || this.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas2"){
            this.renderer.locked = false;
        }
    },

    /**
     * APIMethod: removeFeatures
     * 从当前图层中删除feature。这个函数擦除所有传递进来的矢量要素。
     * 参数中的features数组中的每一项，必须是已经添加到当前图层中的feature，
     * 如果无法确定feature数组，则可以调用removeAllFeatures来删除所有feature。
     * 如果要删除的feature数组中的元素特别多，推荐使用removeAllFeatures，
     * 删除所有feature后再重新添加。这样效率会更高。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要删除feature的数组。
     */
    removeFeatures: function(features) {
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }

        for(var i = 0; i < features.length; i++){
            if(SuperMap.Util.indexOf(this.selectedFeatures, features[i]) !== -1 && this.plottingEdit !== null){
                this.plottingEdit.unselectFeature();
            }
        }

        SuperMap.Layer.Vector.prototype.removeFeatures.apply(this,arguments);
    },

    /**
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function() {
        if(this.plottingEdit!==null && this.plottingEdit.feature!==null )
        {
            this.plottingEdit.unselectFeature();
        }
        SuperMap.Layer.Vector.prototype.removeAllFeatures.apply(this,arguments);
    },

    /**
     * APIMethod: getFeatureAt
     * 获取图层上指定索引的feature
     *
     * Parameters:
     * index - {Integer}指定feature的索引
     *
     * Returns:
     * {<SuperMap.Feature.Vector>}
     */
    getFeatureAt: function(index){
        return this.features[index];
    },

    /**
     * APIMethod: getFeatureByUuid
     * 根据用户定义的唯一ID获取图层上指定的feature
     *
     * Parameters:
     * uuid - {String} 用户定义的唯一ID
     *
     * Returns:
     * {<SuperMap.Feature.Vector>}
     */
    getFeatureByUuid: function(uuid){
        for(var i = 0; i < this.features.length; i++){
            if(this.features[i].geometry.uuid === uuid){
                return this.features[i];
            }
        }

        return null;
    },

    /**
     * APIMethod: removeFeatureByID
     * 根据ID删除指定的feature
     *
     * Parameters:
     * id - {String}指定feature的id
     */
    removeFeatureByID: function(id){
        var feature = this.getFeatureById(id);
        this.removeFeatures([feature]);
    },

    /**
     * APIMethod: removeFeatureAt
     * 删除图层上指定索引的feature
     *
     * Parameters:
     * index - {Integer}指定feature的索引
     */
    removeFeatureAt: function(index){
        var feature = this.getFeatureAt(index);
        this.removeFeatures([feature]);
    },

    /**
     * APIMethod: createSymbol
     * 根据屏幕坐标绘制标号
     *
     * Parameters:
     * libID - {Integer} 标号库ID
     * code - {Integer} 标号代码
     * positionPoints - {Array(<SuperMap.Pixel>)} 标号位置点
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createSymbol: function(libID, code, positionPoints, uuid, style, options, custom){
        if(!SuperMap.Util.isArray(positionPoints)){
            positionPoints = [positionPoints];
        }

        var locationPointWCs = [];
        for(var i = 0; i < positionPoints.length; i++){
            var lonLat = this.map.getLonLatFromViewPortPx(positionPoints[i]);
            locationPointWCs.push(new SuperMap.Geometry.Point(lonLat.lon, lonLat.lat));
        }

        this.createSymbolWC(libID, code, locationPointWCs, uuid, style, options, custom);
    },

    /**
     * APIMethod: createSymbolWC
     * 根据地理坐标绘制标号
     *
     * Parameters:
     * libID - {Integer}标号库ID
     * code - {Integer} 标号代码
     * positionPoints - {Array(<SuperMap.Geometry.Point>)} 标号位置点,高度可以由 <SuperMap.Geometry.Point> 的tag值保存
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createSymbolWC: function(libID, code, positionPoints, uuid, style, options, custom){
        var libID = parseInt(libID);
        var code = parseInt(code);
        if(!SuperMap.Util.isArray(positionPoints)){
            positionPoints = [positionPoints];
        }

        if(SuperMap.Geometry.PlottingGeometry.isAccessServer(libID, code)){
            var symbolData = this.getSymbolDataFromCache(libID, code);
            if(symbolData === null){
                // 获取数据成功
                function getCompleted(result){
                    if(result.originResult.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                        if(this.symbolDataCache.length < 10){
                            this.symbolDataCache.push(result.originResult);
                        } else {
                            this.symbolDataCache.splice(0, 1);
                            this.symbolDataCache.push(result.originResult);
                        }
                    }

                    symbolData = SuperMap.Util.cloneObject(result.originResult);
                    if(!options){
                        options = {};
                    }
                    options.symbolData = symbolData;
                    options.uuid = uuid;
                    options.custom = custom;
                    this.createFeature(libID, code, positionPoints, style, options);
                }

                //获取数据失败
                function getFailed(result){
                    return null;
                }

                this.getDataFromServer(libID, code, positionPoints, getCompleted, getFailed,null,options);
            } else {
                if(!options){
                    options = {};
                }
                options.symbolData = symbolData;
                options.uuid = uuid;
                options.custom = custom;
                this.createFeature(libID, code, positionPoints, style, options);
            }
        } else {
            if(!options){
                options = {};
            }
            options.custom = custom;
            options.uuid = uuid;
            this.createFeature(libID, code, positionPoints, style, options);
        }
    },

    /**
     * APIMethod: createLineRelation
     * 创建对象间（打击、侦察、干扰等）关系连线
     *
     * Parameters:
     * startAssociatedUuid - {String} 关联对象的唯一ID
     * endAssociatedUuid - {String} 关联对象的唯一ID
     * lineRelationType - {<SuperMap.Plot.LineRelation>} 连接线类型
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createLineRelation: function(startAssociatedUuid, endAssociatedUuid, lineRelationType, uuid, style, options, custom){
        if(!options){
            options = {};
        }

        options.startAssociatedUuid = startAssociatedUuid;
        options.endAssociatedUuid = endAssociatedUuid;
        options.lineRelationType = lineRelationType;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;
        this.createFeature(0, SuperMap.Plot.SymbolType.LINERELATION, null, style, options);
    },

    /**
     * APIMethod: createInterferenceBeam
     * 创建干扰波束
     *
     * Parameters:
     * associatedUuid - {String} 关联实体对象的唯一ID，即创建该关联实体时的uuid
     * positionPoints - {Array(<SuperMap.Geometry.Point>)} 标号位置点,高度可以由 <SuperMap.Geometry.Point> 的tag值保存
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性，扩展参数
     * custom - {Object | {}} 用户的自定义属性
     */
    createInterferenceBeam: function(associatedUuid, positionPoints, uuid, style, options, custom){
        if(!options){
            options = {};
        }

        options.associatedUuid = associatedUuid;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;
        this.createFeature(0, SuperMap.Plot.SymbolType.INTERFERENCEBEAM, positionPoints, style, options);
    },

    /**
     * APIMethod: createPolygonRegion
     * 创建多边形区域（空域、海域、光学卫星覆盖区域、雷达覆盖范围）
     *
     * Parameters:
     * positionPoints - {Array(<SuperMap.Geomety.Point>)} 区域管理定位点,高度可以由 <SuperMap.Geometry.Point> 的tag值保存
     * textContent - {String} 多边形区域文字说明
     * textPos - {Integer} 文字说明的位置，0代表中心点，1,2,...代表某一个索引点的位置
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性，扩展参数
     * custom - {Object | {}} 用户的自定义属性
     */
    createPolygonRegion: function(positionPoints, textContent, textPos, uuid, style, options, custom){
        if(!options){
            options = {};
        }

        options.textPosition = textPos;
        options.textContent = textContent;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;

        this.createFeature(0, SuperMap.Plot.SymbolType.POLYGONREGION, positionPoints, style, options);
    },

    /**
     * APIMethod: createArcRegion
     * 创建扇形区域（空域、海域、电子卫星覆盖区域、雷达覆盖范围）
     *
     * Parameters:
     * centerPoint - {<SuperMap.Geomety.Point>} 扇形区域的中心点
     * radius - {String} 扇形区域的半径
     * startAngle - {Integer} 扇形区域的起始角
     * endAngle - {Integer} 扇形区域的结束角
     * textContent - {String} 扇形区域说明
     * textPos - {Integer} 扇形区域说明的位置，为文字角度，-1代表中心点
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createArcRegion: function(centerPoint, radius, startAngle, endAngle, textContent, textPos, uuid, style,
                              options, custom){
        if(!options){
            options = {};
        }

        options.centerPoint = centerPoint;
        options.radius = radius;
        options.startAngle = startAngle;
        options.endAngle = endAngle;
        options.textContent = textContent;
        options.textPosition = textPos;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;

        this.createFeature(0, SuperMap.Plot.SymbolType.ARCREGION, null, style, options);
    },

    /**
     * APIMethod: createAirRoute
     * 创建KJ航线
     *
     * Parameters:
     * arrRoutePts - {Array(Array(<SuperMap.Geometry.Point>))} 航线点串
     * routeNodes - {Array<SuperMap.Plot.RouteNode>} 航站点数组。
     * uuid - {String} 实体的唯一标识
     * lineStyle - {Object | {}} 航线的样式
     * options - {Object | {}} 指定标号的属性，扩展参数
     * custom - {Object | {}} 用户的自定义属性
     */
    createAirRoute: function(arrRoutePts, routeNodes, uuid, lineStyle, options, custom){
        if(!options){
            options = {};
        }

        options.routeNodes = routeNodes;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;
        options.arrRoutePts = arrRoutePts;

        this.createFeature(0, SuperMap.Plot.SymbolType.AIRROUTE, null, lineStyle, options);
    },

    /**
     * APIMethod: createNavyRoute
     * 创建HJ航线
     *
     * Parameters:
     * arrRoutePts - {Array(Array(<SuperMap.Geometry.Point>))} 航线点串
     * routeNodes - {Array<SuperMap.Plot.RouteNode>} 航站点数组。
     * uuid - {String} 实体的唯一标识
     * lineStyle - {Object | {}} 航线的样式
     * options - {Object | {}} 指定标号的属性，扩展参数
     * custom - {Object | {}} 用户的自定义属性
     */
    createNavyRoute: function(arrRoutePts,routeNodes, uuid, lineStyle, options, custom){
        if(!options){
            options = {};
        }

        options.routeNodes = routeNodes;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;
        options.arrRoutePts = arrRoutePts;

        this.createFeature(0, SuperMap.Plot.SymbolType.NAVYROUTE, null, lineStyle, options);
    },

    /**
     * APIMethod: createMissileRoute
     * 创建DD航线
     *
     * Parameters:
     * arrRoutePts - {Array(Array(<SuperMap.Geometry.Point>))} 航线点串
     * routeNodes - {Array<SuperMap.Plot.RouteNode>} 航站点数组。
     * uuid - {String} 实体的唯一标识
     * lineStyle - {Object | {}} 航线的样式
     * options - {Object | {}} 指定标号的属性，扩展参数
     * custom - {Object | {}} 用户的自定义属性
     */
    createMissileRoute: function(arrRoutePts,routeNodes, uuid, lineStyle, options, custom){
        if(!options){
            options = {};
        }

        options.routeNodes = routeNodes;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;
        options.arrRoutePts = arrRoutePts;

        this.createFeature(0, SuperMap.Plot.SymbolType.MISSILEROUTE, null, lineStyle, options);
    },

    /**
     * APIMethod: createNavyDeployment
     * 创建HJBL部署
     *
     * Parameters:
     * associatedUuid - {String} HJBL部署关联的实体对象的唯一ID，即创建该关联实体时的uuid
     * subSymbols - {Array(<SuperMap.Plot.SubSymbol>)} 标号的libID、code及textContent信息。
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createNavyDeployment: function (associatedUuid, subSymbols, uuid, style, options, custom) {
        if(!options){
            options = {};
        }

        options.subSymbols = subSymbols;
        options.associatedUuid = associatedUuid;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;

        this.createFeature(0, SuperMap.Plot.SymbolType.NAVYDEPLOYMENT, null, style, options);
    },

    /**
     * APIMethod: createAirDeployment
     * 创建KJBL部署
     *
     * Parameters:
     * associatedUuid - {String} KJBL部署关联的实体对象的唯一ID，即创建该关联实体时的uuid
     * subSymbols - {Array(<SuperMap.Plot.SubSymbol>)} 标号的libID、code及textContent信息。
     * column - {Integer} KJBL部署对象的列数
     * textContent - {String} KJBL部署的注记
     * isShowTooltip - {Boolean} 是否显示指示框
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createAirDeployment: function (associatedUuid, subSymbols, uuid, style, options, custom) {
        if(!options){
            options = {};
        }

        options.subSymbols = subSymbols;
        options.associatedUuid = associatedUuid;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;

        this.createFeature(0, SuperMap.Plot.SymbolType.AIRDEPLOYMENT, null, style, options);
    },

    /**
     * APIMethod: createSatellite
     * 创建卫星
     *
     * Parameters:
     * libID - {Integer} 标号库ID
     * code - {Integer} 标号代码
     * orbitPoints - {Array(<SuperMap.Plot.OrbitPoint>)} 卫星轨道星下点轨迹
     * textContent - {String} 卫星说明
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createSatellite: function(libID, code, orbitPoints, textContent, uuid, style, options, custom){
        //同步从服务器获取数据
        this.getDataFromServer(libID, code, null, getCompleted, getFailed);

        function getCompleted(result) {
            if(!options){
                options = {};
            }

            options.subSymbol = {libID: libID, code: code, symbolData: result.originResult, textContent: textContent};
            options.orbitPoints = orbitPoints;
            options.textContent = textContent;
            options.uuid = uuid;
            options.custom = custom;
            options.layer = this;

            this.createFeature(0, SuperMap.Plot.SymbolType.SATELLITE, null, style, options);
        }

        //获取数据失败
        function getFailed(result) {
            throw new Error(result);
        }
    },

    /**
     * APIMethod: createSatelliteTimeWindows1
     * 根据卫星轨迹点序号创建卫星可见时间窗口
     *
     * Parameters:
     * associatedUuid - {String} 关联的卫星的唯一ID，即创建该关联实体时的uuid
     * timeWindows - {<SuperMap.Plot.TimeWindowParameter>} 卫星可见时间窗(起始、结束轨道点序号)数组
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createSatelliteTimeWindows1: function(associatedUuid, timeWindows, uuid, style, custom){
        this.createFeature(0, SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS, null, style, {
            associatedUuid: associatedUuid,
            timeWindows: timeWindows,
            type: "Number",
            uuid: uuid,
            custom: custom});
    },

    /**
     * APIMethod: createSatelliteTimeWindows2
     * 根据卫星轨迹时刻创建卫星可见时间窗口
     *
     * Parameters:
     * associatedUuid - {String} 关联的卫星的唯一ID，即创建该关联实体时的uuid
     * timeWindows - {<SuperMap.Plot.TimeWindowParameter>} 卫星可见时间窗(起始、结束轨道点时间)数组
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createSatelliteTimeWindows2: function(associatedUuid, timeWindows, uuid, style, custom){
        this.createFeature(0, SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS, null, style, {
            associatedUuid: associatedUuid,
            timeWindows: timeWindows,
            type: "Time",
            uuid: uuid,
            custom: custom});
    },

    /**
     * APIMethod: createSymbolText1
     * 创建对象标注
     *
     * Parameters:
     * associatedUuid - {String} 关联实体对象的唯一ID，即创建该关联实体时的uuid
     * textContents - {Array(String)} 文字内容的数组
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * options - {Object | {}} 指定标号的属性
     * custom - {Object | {}} 用户的自定义属性
     */
    createSymbolText1: function(associatedUuid, textContents, uuid, style, options, custom){
        if(!options){
            options = {};
        }

        options.associatedUuid = associatedUuid;
        options.textContent = textContents;
        options.uuid = uuid;
        options.custom = custom;
        options.layer = this;

        this.createFeature(0, SuperMap.Plot.SymbolType.SYMBOLTEXT1, null, style, options);
    },

    /**
     * APIMethod: createSymbolText
     * 创建对象标注
     *
     * Parameters:
     * associatedUuid - {String} 关联实体对象的唯一ID，即创建该关联实体时的uuid
     * symbolTexts - {Array(<SuperMap.Plot.SymbolText>)} 文字内容的数组
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 指定标号的样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createSymbolText: function(associatedUuid, symbolTexts, uuid, style, custom){
        this.createFeature(0, SuperMap.Plot.SymbolType.SYMBOLTEXT, null, style, {
            associatedUuid: associatedUuid,
            symbolTexts: symbolTexts,
            uuid: uuid,
            custom: custom,
            layer: this});
    },

    /**
     * APIMethod: createText
     * 根据屏幕坐标绘制文本
     *
     * Parameters:
     * content - {String} 文字内容
     * pos - {<SuperMap.Pixel>} 文本内容的位置
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 文本的样式
     * custom - {Object | {}} 用户的自定义属性
     *
     * Returns:
     * {<SuperMap.Feature.Vector>}创建成功返回相应的feature，否则返回空。
     */
    createText: function(content, pos, uuid, style, custom){
        var lonLat = this.map.getLonLatFromViewPortPx(pos);
        var posWC = new SuperMap.Geometry.Point(lonLat.lon, lonLat.lat);

        return this.createTextWC(content, posWC, uuid, style, custom);
    },

    /**
     * APIMethod: createTextWC
     * 根据地理坐标绘制文本
     *
     * Parameters:
     * content - {String} 文字内容
     * pos - {<SuperMap.Geomety.Point>} 文本内容的位置
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 文本的样式
     * custom - {Object | {}} 用户的自定义属性
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 创建成功返回相应的feature，否则返回空。
     */
    createTextWC: function(content, pos, uuid, style, custom){
        if (pos !== null && content !== "undefined") {
            if(!SuperMap.Util.isArray(pos)){
                pos = [pos];
            }
            this.createFeature(0, SuperMap.Plot.SymbolType.TEXTSYMBOL, pos, style, {textContent: content, uuid: uuid, custom: custom});
        }
    },

    /**
     * APIMethod: createPathText
     * 创建沿线文本
     *
     * Parameters:
     * content - {String} 文字内容
     * relLineText - {<SuperMap.Plot.RelLineText>} 文字在路径线的显示位置
     * showPathLine - {Boolean} 是否显示路径线
     * isCurve - {Boolean} 路径线是否是贝塞尔曲线
     * isAvoid - {Bollean} 是否避让
     * pts - {Array<SuperMap.Geomety.Point>} 文本内容的位置
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 文本的样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createPathText: function(content, pts, relLineText, showPathLine, isCurve, isAvoid, uuid, style, custom){
        if (pts !== null && content !== "undefined") {
            if(!SuperMap.Util.isArray(pts)){
                pts = [pts];
            }

            this.createFeature(0, SuperMap.Plot.SymbolType.PATHTEXT, pts, style, {
                textContent: content,
                relLineText:relLineText,
                controlPoints:pts,
                showPathLine:showPathLine,
                isCurve:isCurve,
                isAvoid:isAvoid,
                uuid: uuid,
                custom:custom});
        }
    },

    /**
     * APIMethod: createArrowLine
     * 根据两点创建箭头线对象
     *
     * Parameters:
     * pts - {Array<SuperMap.Geomety.Point>} 线的两个端点位置
     * nArrowTypeStart - {<SuperMap.Plot.ArrowLineType>} 起始箭头类型
     * nArrowTypeEnd - {<SuperMap.Plot.ArrowLineType>} 结尾箭头类型
     * uuid - {String} 实体的唯一标识
     * style - {Object | {}} 文本的样式
     * options - {Object | {}} 指定标号样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createArrowLine: function(pts, nArrowTypeStart, nArrowTypeEnd, uuid, style, options, custom){
        if(pts !== null){
            if(!SuperMap.Util.isArray(pts)){
                pts = [pts];
            }
            this.createFeature(0, SuperMap.Plot.SymbolType.ARROWLINE, pts, style, {
                arrowTypeStart: nArrowTypeStart, arrowTypeEnd: nArrowTypeEnd, uuid: uuid, custom: custom});
        }
    },

    /**
     * APIMethod: createConcentricCircle
     * 创建同心圆
     *
     * Parameters:
     * pts - {Array<SuperMap.Geomety.Point>} 线的两个端点位置
     * startAngle - {Double} 起始角度
     * endAngel - {Double} 结束角度
     * options - {Object | {}} 指定标号样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createConcentricCircle: function(pts, startAngle, endAngel, options, custom){
        if(pts !== null){
            if(!SuperMap.Util.isArray(pts)){
                pts = [pts];
            }
            this.createFeature(0, SuperMap.Plot.SymbolType.CONCENTRICCIRCLE, pts, null, {
                StartAngle: startAngle, EndAngle: endAngel});
        }
    },

    /**
     * APIMethod: createCombinationalCircle
     * 创建组合圆
     *
     * Parameters:
     * pts - {Array<SuperMap.Geomety.Point>} 线的两个端点位置
     * defaultRadius - {Double} 默认圆半径
     * radius - {Array<Double>} 每个圆半径集合
     * options - {Object | {}} 指定标号样式
     * custom - {Object | {}} 用户的自定义属性
     */
    createCombinationalCircle: function(pts, defaultRadius, radius, options, custom){
        if(pts !== null){
            if(!SuperMap.Util.isArray(pts)){
                pts = [pts];
            }

            this.createFeature(0, SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE, pts, null, {
                Radius: radius, DefaultRadius: defaultRadius});
        }
    },


    /**
     * APIMethod: createGroupObject
     * 根据屏幕坐标创建组合对象
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 组合对象的feature。
     * style - {Object | {}} 指定标号的样式
     */
    createGroupObject: function(features, uuid, style){
        var featrueUuid = [];
        for(var i = 0; i < features.length; i++){
            featrueUuid.push(features[i].geometry.uuid);
        }
        this.createFeature(0, SuperMap.Plot.SymbolType.GROUPOBJECT, null, style, {subAssociatedUuids: featrueUuid});
    },

    /**
     * APIMethod: unGroupObject
     * 解组组合对象
     *
     * Parameters:
     * uuid - {String} 组合对象的唯一ID或FeatueId。
     */
    unGroupObject: function(uuid){
        var feature = this.getFeatureByUuid(uuid);
        if(feature === null){
            feature = this.getFeatureById(uuid);
        }

        if(feature !== null && feature.geometry !== null &&
            feature.geometry.CLASS_NAME === "SuperMap.Geometry.GroupObject"){
            feature.geometry.unGroupObject();
            this.removeFeatures([feature]);
        }
    },

    /**
     * APIMethod: createFlags
     * 创建多旗
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 旗帜标号
     * ratio - {Float} 多旗间距与旗子高度的比值，默认是0.8
     * uuid - {String} 组合对象的唯一ID或FeatueId。
     * style - {Object | {}} 指定标号的样式
     */
    createFlags: function(features, ratio, uuid, style){
       /* var flagFeatures = [];

        for(var i = 0; i < features.length; i++) {
            if((features[i].geometry.libID === 100 && (features[i].geometry.code >= 2800 && features[i].geometry.code <= 2900))) {
                flagFeatures.push(features[i]);
            }
        }

        if(ratio === undefined){
            ratio = 0.8;
        }

        if (flagFeatures.length > 0) {
            var obj = flagFeatures[0];
            var pos = obj.geometry.controlPoints[0];
            for(var i = 1; i < flagFeatures.length; i++) {
                var bounds = flagFeatures[i].geometry.getBounds();
                var curPt = new SuperMap.Geometry.Point(pos.x, flagFeatures[i-1].geometry.getBounds().top - (1-ratio)*bounds.getHeight());

                flagFeatures[i].geometry.setPositionPoints([curPt]);
                flagFeatures[i].geometry.calculateParts();

                pos = curPt;
            }

            this.createGroupObject(flagFeatures, uuid);
        }
*/

        var featrueUuid = [];
        for(var i = 0; i < features.length; i++){
            featrueUuid.push(features[i].geometry.uuid);
        }

        if(featrueUuid.length > 0){
            this.createFeature(0, SuperMap.Plot.SymbolType.FLAGGROUP, null, style, {subAssociatedUuids: featrueUuid, ratio: ratio, uuid: uuid});
        }
    },

    /**
     * Method: createFeature
     * 根据数据创建Feature
     *
     * Parameters:
     * libID - {Integer} 标号的ID
     * symbolCode - {Integer}标号的code
     * positionPoints - Array(<SuperMap.Geometry.Point>) 返回相应的controlPoints
     * style - {Object} 自定义标号的样式
     * options - {Object} 标号的不定参数
     */
    createFeature: function(libID, symbolCode, positionPoints, style, options){
        if(!options){
            options = {};
        }
        if(!options.layer || options.layer === null){
            options.layer = this;
        }

        var plottingFeature = SuperMap.Geometry.PlottingGeometry.createFeature(libID, symbolCode, positionPoints, options);
        if(style){
            plottingFeature.style = SuperMap.Util.copyAttributes(plottingFeature.style, style);
        }

        if(!SuperMap.Geometry.PlottingGeometry.isAccessServer(libID, symbolCode) && plottingFeature.geometry.subSymbols && plottingFeature.geometry.subSymbols.length > 0){
            for(var i = 0; i < plottingFeature.geometry.subSymbols.length; i++){
                if(plottingFeature.geometry.subSymbols[i].symbolData === null){
                    var libID = plottingFeature.geometry.subSymbols[i].libID;
                    var code = plottingFeature.geometry.subSymbols[i].code;
                    var symbolData = this.getSymbolDataFromCache(libID, code);

                    if(symbolData !== null){
                        plottingFeature.geometry.subSymbols[i].symbolData = symbolData;
                    } else {
                        var accessServer = true;
                        for(var j = 0; j < i; j++){
                            if(libID === plottingFeature.geometry.subSymbols[j].libID &&
                                code === plottingFeature.geometry.subSymbols[j].code){
                                accessServer = false;
                            }
                        }

                        if(accessServer === true){
                            this.getDataFromServer(libID, code, null, getCompleted, getFailed);
                        }
                    }
                }
            }

            var subSymbolDataFlag = true;
            for(var j = 0; j < plottingFeature.geometry.subSymbols.length; j++){
                if(plottingFeature.geometry.subSymbols[j].symbolData === null){
                    subSymbolDataFlag = false;
                    break;
                }
            }

            if(subSymbolDataFlag === true){
                plottingFeature.geometry.isEdit = false;
                plottingFeature.geometry.calculateParts();
                plottingFeature.geometry.isEdit = true;
                this.addFeatures(plottingFeature);

                this.events.triggerEvent("symbolcreated", {feature: plottingFeature});

                return;
            }

            function getCompleted(result){
                if(result.originResult.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                    if(this.symbolDataCache.length < 10){
                        this.symbolDataCache.push(result.originResult);
                    } else {
                        this.symbolDataCache.splice(0, 1);
                        this.symbolDataCache.push(result.originResult);
                    }
                }

                for(var i = 0; i < plottingFeature.geometry.subSymbols.length; i++){
                    var symbolData = SuperMap.Util.cloneObject(result.originResult);
                    var libID = plottingFeature.geometry.subSymbols[i].libID;
                    var code = plottingFeature.geometry.subSymbols[i].code;
                    if(libID === symbolData.libID && code === symbolData.code){
                        plottingFeature.geometry.subSymbols[i].symbolData = symbolData;
                    }
                }

                var subSymbolDataFlag = true;
                for(var j = 0; j < plottingFeature.geometry.subSymbols.length; j++){
                    if(plottingFeature.geometry.subSymbols[j].symbolData === null){
                        subSymbolDataFlag = false;
                        break;
                    }
                }

                if(subSymbolDataFlag === true){
                    plottingFeature.geometry.isEdit = false;
                    plottingFeature.geometry.calculateParts();
                    plottingFeature.geometry.isEdit = true;
                    this.addFeatures(plottingFeature);

                    this.events.triggerEvent("symbolcreated", {feature: plottingFeature});

                    return;
                }
            }

            //获取数据失败
            function getFailed(result){

            }
        } else {
            this.addFeatures(plottingFeature);

            this.events.triggerEvent("symbolcreated", {feature: plottingFeature});

            return;
        }
    },

    /**
     * Method: getFeatureFromEvent
     * 通过一个事件，从渲染器中获取一个对应的feature，如果没有则返回null。
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {<SuperMap.Feature.PlottingLayer>} 一个通过事件选中的feature。
     */
    getFeatureFromEvent: function(evt) {
        var feature = SuperMap.Layer.Vector.prototype.getFeatureFromEvent.apply(this,arguments);

        if(null === feature)
        {
            if(this.map === null){
                return null;
            }

            //鼠标的经纬度点
            var mousePoint = this.map.getLonLatFromViewPortPx(evt.xy);

            feature = this.selectFeatureByPoint(mousePoint, this.tolerancePixel, evt);

            if(0 < this.selectedFeatures.length){
                for(var i = 0; i < this.features.length; i++){
                    var tempFeature = this.features[i];
                    if(null != tempFeature && tempFeature.geometry instanceof SuperMap.Geometry.EditPoint){
                        var bounds = tempFeature.geometry.getBounds();

                        if(undefined !== bounds && null !== bounds){
                            if(bounds.left < mousePoint.lon && bounds.right > mousePoint.lon &&
                                bounds.bottom < mousePoint.lat && bounds.top > mousePoint.lat){
                                feature = tempFeature;
                                break;
                            }
                        }
                    }
                }
            }
        }

        this.setCursorShape(feature, evt);
        return feature;
    },

    /**
     * Method: selectFeatureByPoint
     * 判断输入点有没有选中标号。
     *
     * Parameters:
     * pt - {SuperMap.Geometry.Point} 位置点,单位经纬度
     * tolerancePixel {Float}容限，如果不输入，默认使用图层设定的容限，单位像素
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 选中的对象。
     */
    getToleranceLonLat: function(tolerancePixel){
        if(!tolerancePixel){
            tolerancePixel = this.tolerancePixel;
        }

        var tempPt0 = this.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
        var tempPt1 = this.map.getLonLatFromViewPortPx(new SuperMap.Pixel(tolerancePixel,0));
        var tolerance = SuperMap.Plot.PlottingUtil.distance({x:tempPt0.lon,y:tempPt0.lat},{x:tempPt1.lon,y:tempPt1.lat});

        return tolerance;
    },

    /**
     * Method: selectFeatureByPoint
     * 判断输入点有没有选中标号。
     *
     * Parameters:
     * pt - {SuperMap.Geometry.Point} 位置点,单位经纬度
     * tolerancePixel {Float}容限，如果不输入，默认使用图层设定的容限，单位像素
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 选中的对象。
     */
    selectFeatureByPoint: function(pt, tolerancePixel){
        if(!tolerancePixel){
            tolerancePixel = this.tolerancePixel;
        }

        var tolerance = this.getToleranceLonLat(tolerancePixel);
        var feature = null;

        for(var i = this.features.length-1; i >= 0 ; i--) {
            feature = this.selectFeature(this.features[i], pt, tolerance);
            if (feature !== null) {
                break;
            }
        }

        return feature;
    },

    /**
     * APIMethod: selectFeature
     * 判断输入点有没有选中标号。
     *
     * Parameters:
     * feature - {<SuperMap.Geometry.Vector>} 要判断是否选中的feature
     * mousePoint - {<SuperMap.Geometry.Point>} 鼠标点,单位经纬度
     * tolerance {Float}容限，如果不输入，默认使用图层设定的容限，单位像素
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 选中的对象。
     */
    selectFeature: function(feature, mousePoint, tolerance){
        if(null == feature || null == feature.geometry) {
            return null;
        }

        if(null !== feature.style && feature.style.display === "none"){
            return null;
        }

        if(feature.geometry instanceof SuperMap.Geometry.EditPoint){
            var dis = SuperMap.Plot.PlottingUtil.distance(feature.geometry,{x:mousePoint.lon,y:mousePoint.lat});
            if(dis < tolerance){
                return feature;
            }
        }

        if(!(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry)) {
            return null;
        }

        if(feature.geometry instanceof SuperMap.Geometry.GroupObject){
            for(var i = 0; i < feature.geometry.components.length; i++){
                if(this.selectFeature(feature.geometry.components[i], mousePoint, tolerance)){
                    return feature;
                }
            }
        } else {
            if(feature.geometry.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL) {
                if(this.mouseSelectCell(mousePoint,tolerance,feature.geometry.components[0])) {
                    return feature;
                }
            } else if(feature.geometry.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT){
                for(var i = 0; i < feature.geometry.components.length; i++){
                    if(this.mouseSelectCell(mousePoint,tolerance,feature.geometry.components[i])) {
                        return feature;
                    }
                }
            }else {
                feature.geometry.clearBounds();
                var bounds = feature.geometry.getBounds();
                if(null == bounds) {
                    return null;
                }
                var tempBounds = bounds.clone();
                tempBounds.bottom -= tolerance;
                tempBounds.top += tolerance;
                tempBounds.left -= tolerance;
                tempBounds.right += tolerance;

                if(!this.pointInBounds(mousePoint, tempBounds)) {
                    return null;
                }

                for(var m = 0; m < feature.geometry.components.length; m++)
                {
                    var cell = feature.geometry.components[m];
                    if(this.mouseSelectCell(mousePoint,tolerance,cell)) {
                        return feature;
                    }
                }
            }
        }

        return null;
    },

    /**
     * Method: pointInBounds
     * 计算点是否在bounds内。
     *
     * Parameters:
     * point - {Point}点
     * bounds
     *
     * Returns:
     * {<SuperMap.Feature.PlottingLayer>} 是否在bounds内。
     */
    pointInBounds : function(point, bounds)
    {
        if(null == point || null == bounds) {
            return false;
        }

        if(point instanceof SuperMap.LonLat &&
            point.lon >= bounds.left && point.lon <= bounds.right &&
            point.lat >= bounds.bottom && point.lat <= bounds.top) {
            return true;
        } else if(point.x >= bounds.left && point.x <= bounds.right &&
            point.y >= bounds.bottom && point.y <= bounds.top) {
            return true;
        }

        return false;
    },

    /**
     * Method: pointInBoundsByPiexl
     * 计算点是否在bounds内,单位是像素。
     *
     * Parameters:
     * point - {Point}点
     * bounds
     *
     * Returns:
     * {<SuperMap.Feature.PlottingLayer>} 是否在bounds内。
     */
    pointInBoundsByPiexl : function(point, bounds)
    {
        if(null == point || null == bounds) {
            return false;
        }
        if(point.x >= bounds.left   && point.x <= bounds.right &&
            point.y <= bounds.bottom && point.y >= bounds.top) {
            return true;
        }

        return false;
    },

    /**
     * Method: mouseSelectCell
     * 判断点是否选中图元。
     *
     * Parameters:
     * mousePoint - {Point}点
     * toleranceDis {double} 容限
     * cell 图元
     *
     * Returns:
     * {<SuperMap.Feature.PlottingLayer>} 是否选中。
     */
    mouseSelectCell : function(mousePoint,toleranceDis, cell)
    {
        if(cell.CLASS_NAME === "SuperMap.Geometry.Point"){
            return false;
        }

        if(cell.CLASS_NAME === "SuperMap.Geometry.GeoText") {
            var textBounds = cell.getBoundsByText(this.map, cell.style);
            var pnt = new SuperMap.Geometry.Point(mousePoint.lon, mousePoint.lat);
            return SuperMap.Plot.PlottingUtil.ptInBounds(pnt, textBounds);
        }

        if(cell.CLASS_NAME !== "SuperMap.Geometry.LinearRing" &&
            cell.CLASS_NAME !== "SuperMap.Geometry.LineString") {
            for(var i = 0; i < cell.components.length; i++) {
                var bSelect = this.mouseSelectCell(mousePoint,toleranceDis,cell.components[i]);
                if(bSelect) {
                    return true;
                }
            }
        }
        else {
            for(var n = 0; n < cell.components.length-1; n++) {
                var pt0 = new SuperMap.Geometry.Point(cell.components[n].x,cell.components[n].y);
                var pt1 = new SuperMap.Geometry.Point(cell.components[n+1].x,cell.components[n+1].y);

                var dis = SuperMap.Plot.PlottingUtil.pointToPloyLineDis({x:mousePoint.lon,y:mousePoint.lat},pt0,pt1);
                if(dis <= toleranceDis) {
                    return true;
                }
            }
        }

        return false;
    },

    /**
     * Method: setCursorShape
     * 设置鼠标形状。
     */
    setCursorShape : function(feature, evt) {
        if( feature && feature !== null){
            if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.EditPoint"){
                if(undefined !== feature.geometry.pt && null !== feature.geometry.pt && undefined !== feature.geometry.pt.nHandle && null !== feature.geometry.pt.nHandle){
                    switch (feature.geometry.pt.nHandle){
                        case 1:
                        case 8:
                            this.setCursor("se-resize");
                            break;
                        case 3:
                        case 6:
                            this.setCursor("ne-resize");
                            break;
                        case 4:
                        case 5:
                            this.setCursor("e-resize");
                            break;
                        case 2:
                        case 7:
                            this.setCursor("n-resize");
                            break;
                        default :
                            this.setCursor("move");
                            break;
                    }
                }
                else if(undefined !== feature.geometry.pt && null !== feature.geometry.pt && true === feature.geometry.pt.isRotatePoint){
                    //var  imagesLocation = SuperMap.Util.getImagesLocation();
                    //var style ="url('"+imagesLocation+"cursors/Rotation.cur'),move";
                    this.setCursor("Default");
                }
                else
                {
                    this.setCursor("pointer");
                }
            }
            else if(feature.geometry instanceof SuperMap.Geometry.PlottingGeometry){
                var isSelectFeature = false;
                for(var i = 0; i < this.selectedFeatures.length; i++){
                    if(feature === this.selectedFeatures[i]){
                        isSelectFeature = true;
                        break;
                    }
                }

                if(isSelectFeature){
                    if(undefined !== this.plottingEdit && null !== this.plottingEdit && true === this.plottingEdit.isAddPoint &&
                        SuperMap.Control.PlottingEdit.AddPoint_WayType.UNKNOW !== this.plottingEdit.getSymbolAlgoWayType(feature)){
                        this.setCursor("crosshair");
                    }
                    else{
                        this.setCursor("move");
                    }

                }
                else{
                    this.setCursor("pointer");
                }
            }
            else{
                this.setCursor("pointer");
            }

        } else {
            var  imagesLocation = SuperMap.Util.getImagesLocation();
            if(this.drawGraphicObject && this.drawGraphicObject.active){
                //if (this.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas" || this.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas2") {
                //    this.renderer.container.style.cursor="url('"+imagesLocation+"cursors/Pan.cur'),default";
                //} else if(this.renderer.CLASS_NAME === "SuperMap.Renderer.SVG"){
                //    this.renderer.vectorRoot.style.cursor ="url('"+imagesLocation+"cursors/Pan.cur'),default";
                //}
                var cursorStyle = "url('"+imagesLocation+"cursors/Pan.cur'),move";
                this.setCursor(cursorStyle);
            } else if(evt && evt.type === "mousedown"){
                //if (this.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas" || this.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas2") {
                //    this.renderer.container.style.cursor="url('"+imagesLocation+"cursors/PanDown.cur'),move";
                //} else if(this.renderer.CLASS_NAME === "SuperMap.Renderer.SVG"){
                //    this.renderer.vectorRoot.style.cursor ="url('"+imagesLocation+"cursors/PanDown.cur'),move";
                //}
                var cursorStyle = "url('"+imagesLocation+"cursors/PanDown.cur'),move";
                this.setCursor(cursorStyle);
            } else if(evt && evt.button === 0){
                //if (this.renderer.CLASS_NAME === "SuperMap.Renderer.PlotCanvas" || this.renderer.CLASS_NAME === "SuperMap.Renderer.PlotCanvas2") {
                //    this.renderer.container.style.cursor="url('"+imagesLocation+"cursors/Pan.cur'),move";
                //} else if(this.renderer.CLASS_NAME === "SuperMap.Renderer.PlotSVG"){
                //    this.renderer.vectorRoot.style.cursor ="url('"+imagesLocation+"cursors/Pan.cur'),move";
                //}
                var cursorStyle = "url('"+imagesLocation+"cursors/Pan.cur'),move";
                this.setCursor(cursorStyle);
            }
        }
    },

    setCursor: function(mouseStyle){
        if (this.renderer.CLASS_NAME === "SuperMap.Renderer.PlotCanvas" || this.renderer.CLASS_NAME === "SuperMap.Renderer.PlotCanvas2") {
            this.renderer.container.style.cursor = mouseStyle;
        } else if (this.renderer.CLASS_NAME === "SuperMap.Renderer.PlotSVG") {
            this.renderer.vectorRoot.style.cursor = mouseStyle;
        }

        this.map.eventsDiv.style.cursor = mouseStyle;
    },
    /**
     * Method: getDataFromServer
     * 获取标号数据。
     */
    getDataFromServer: function(libID, code, positionPoints, success, fail, me, option) {
        if(!me){
            me = this;
        }

        //对接iserver中的服务
        var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.serverUrl);
        getSymbolInfo.events.on({
            "processCompleted": success,
            "processFailed": fail,
            scope: me
        });

        var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
        getSymbolInfoParams.libID = libID;
        getSymbolInfoParams.code = code;
        if(option){
            getSymbolInfoParams.symbolRank = option.symbolRank;
            getSymbolInfoParams.negativeImage = option.negativeImage;
        }

        if(positionPoints !== null){
            if(!SuperMap.Util.isArray(positionPoints)){
                positionPoints = [positionPoints];
            }

            getSymbolInfoParams.inputPoints = positionPoints;
        }

        getSymbolInfo.processAsync(getSymbolInfoParams);
    },

    /**
     * Method: getSymbolDataFromCache
     * 获取缓存数据。
     */
    getSymbolDataFromCache: function(libID, code){
        var symbolDataCopy = null;

        for(var i = 0; i < SuperMap.Plot.SymbolLib.dotSymbols.length; i++){
            if(SuperMap.Plot.SymbolLib.dotSymbols[i].libID === libID && SuperMap.Plot.SymbolLib.dotSymbols[i].code === code){
                symbolDataCopy = {};
                symbolDataCopy = SuperMap.Util.cloneObject(SuperMap.Plot.SymbolLib.dotSymbols[i]);
                break;
            }
        }

        return symbolDataCopy;
    },

    CLASS_NAME: "SuperMap.Layer.PlottingLayer"
});