/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer.js
 * @requires SuperMap/Renderer.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Console.js
 * @requires SuperMap/Lang.js
 */

/**
 * Class: SuperMap.Layer.AnimatorVector
 * 该图层用于渲染动态矢量要素。
 *
 * 目的在于表达现实事物在时间上的空间变化，如车辆监控、气象模拟等
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.AnimatorVector = SuperMap.Class(SuperMap.Layer, {

    /**
     * Property: isBaseLayer
     * {Boolean} 该图层是否是 基础图层，默认值为 false。不要设置为基础图层。
     */
    isBaseLayer: false,

    /** 
     * Property: isFixed
     * （未验证）
     * {Boolean} 设置当前图层在鼠标拖动时位置是否固定，默认为 false。
     */
    isFixed: false,

    /** 
     * Property: features
     * {Array(<SuperMap.Feature.Vector>)}用于存放矢量要素。
     */
    features: null,
    
    /** 
     * Property: selectedFeatures
     * （未做选择。未验证）
     * {Array(<SuperMap.Feature.Vector>)} 
     */
    selectedFeatures: null,

    /** 
     * Property: style
     * {Object} 当前图层的默认样式。
     */
    style: null,
    

    /**
     * Property: styleMap
     * {<SuperMap.StyleMap>} 适用于图层的样式组，包含不同状态下的样式信息，使用方式参考 <SuperMap.StyleMap>
     */
    styleMap: null,
    /**
     * Property: rendererOptions
     * {Object} 渲染器的可选属性。
     */
    rendererOptions: null, //(未测试)

    /** 
     * Property: ratio
     *
     * {Float} 设置矢量要素在图层中与map上的比例，默认为1。
     */ 
    ratio: 1, //（有问题）

    /** 
     * Property: zoomChanged
     * {Boolean} 当前的地图操作是否是缩放操作。
     */
    zoomChanged: null,

    /**
     * APIProperty: animator
     * {<SuperMap.Animator>} 动画管理。
     * 用于控制动态图层渲染管理。
     */
    animator:null,
    /**
     * APIProperty: featureIdName
     * {String} 确认是同一实物的字段名称。默认为"FEATUREID"。
     * 例如：用户在数据库中存放了车辆监控的信息，其中以字段"CARNAME"作为确认一辆车的唯一标识，
     * 则此处就需要设置 featureIdName = "CARNAME"
     *
     */
    featureIdName:"FEATUREID",
    /**
     * APIProperty: timeName
     * {String} 确认同一实物的不同时间段的字段名称，默认为"TIME"字段。
     * 例如：用户在数据库中存放了车辆监控的信息，以字段"CARNAME"作为确认一辆车的唯一标识，
     * 其中一辆名称为car1的车在数据库中有很多条数据（每隔一段时间记录一条数据），而使用"CARTIME"来
     * 存放每条数据在获取时的具体时刻，则此处就需要设置 timeName = "CARTIME"
     *
     */
    timeName:"TIME",
    /**
     * Property: currentOption
     * {Object} 记录之前的渲染时间状态以及数据位置。
     * 用于在停止后平移缩放地图保持图形重绘，并且可以提高渲染效率
     */
    oldTimeOption:null,

    /**
     * Property: drawedFeatures
     * {Array} 要素中的历史要素，即已经在之前的时间里面渲染过的要素
     * */
    drawedFeatures:null,

    /**
     * APIProperty: needRecordDrawedFeature
     * {Boolean} 是否需要记录绘制过的要素，默认为false
     * */
    needRecordDrawedFeature:false,

    /**
     * APIProperty: smooth
     * {Boolean} 是否开启平滑播放效果，默认为true。
     * 平滑播放指在前后两个动画状态之间加入渐变的动画帧，
     * 使动画播放的协调，但相应播放的过多，会导致效率降低。
     */
    smooth:true,
    /**
     * Property: featureIdNames
     * {Object} 记录所有 featureIdName 对应的最后一个feature，主要用于在addfeature时提高效率
     */
    featureIdNames:{},
    /**
     * APIProperty: rendererType
     * {String} 渲染类型，当前支持：
     * 1、基本动画渲染："AnimatorCanvas"
     * 2、点闪烁、尾巴渲染："TadpolePoint"
     * 3、线伸缩渲染："StretchLine"
     * 4、点发射渲染："RadiatePoint"
     * 默认为 "AnimatorCanvas"
     */
    rendererType: 'AnimatorCanvas',
    /**
     * APIProperty: renderer
     * 渲染方式，在初始化 AnimatorVector 时根据 rendererType 属性生成，
     * 这里只会是动画渲染，即 AnimatorCanvas 或它的子类，如果浏览器不支持则为空
     * {<SuperMap.Renderer>}
     */
    renderer: null,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *drawfeaturestart* 每次绘制在当前时间节点内的feature时触发。
     * - *drawFrame* 绘制帧，动画的每一帧都会触发此事件，传回的参数即为当前渲染的要素
     * - *featurerendered* 要素渲染事件，当要素被渲染后发触发，返回一个当前补间动画中真实被渲染的要素，这样可记录运动的轨迹
     * 例如：
     * (start code)
     *  //使用下面的方法将图层添加到map
     *  var animatorVector = new SuperMap.Layer.AnimatorVector("animatorVector", {}, {
     *      //设置速度为每帧播放0.05的数据
     *      speed:0.05,
     *      //开始时间为0
     *      startTime:0,
     *      //每秒渲染12帧
     *      frameRate:12,
     *      //结束时间设置为10
     *      endTime:10
     *  });
     *  layer.events.on({"drawfeaturestart": drawfeaturestart});
     *
     *
     *  function drawfeaturestart(feature) {
     *
     *  }
     * (end)
     *
     */
    //EVENT_TYPES: ["drawfeaturestart"],


    /**
     * Constructor: SuperMap.Layer.AnimatorVector
     * 创建一个矢量动画图层。
     *
     * (start code)
     * //创建一个名为"AnimatorVector"、采用 Canvas渲染方式渲染的矢量动画图层。
     * var animatorVector = new SuperMap.Layer.AnimatorVector("AnimatorVector");
     * //设置速度为每次播放半年的数据
     * animatorVector.animator.setSpeed(0.5);
     * //设置开始时间为1900年
     * animatorVector.animator.setStartTime(1900);
     * //设置结束时间为2000年
     * animatorVector.animator.setEndTime(2000);
     *
     * (end)     
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     * animatiorOption - {Object} 动画Animator提供的属性。这些属性都可以用过animatorVector.animator来设置。
     *
     * Allowed options properties:
     * featureIdName - {String} 确认是同一实物的字段名称。默认为"FEATUREID"。
     * timeName - {String} 确认同一实物的不同时间段的字段名称，默认为"TIME"字段。
     * smooth - {Boolean} 是否开启平滑播放效果，默认为true。
     *
     * Allowed animatiorOption properties:
     * speed - {Number} 播放速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大播放速度越快。
     * startTime - {Number} 播放的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。
     * endTime - {Number} 播放的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。
     * repeat - {Boolean} 是否重复循环播放。默认为true。
     * reverse - {Boolean} 是否反向播放。默认为false。
     * frameRate - {Number} 帧率，默认为60，即每秒播放60帧动画。由于浏览器每秒渲染60帧是固定的，所以我们只能设置每秒播放的帧数为60、30、20、15、12、10、6、5、4、3、2、1
     * 中的一个
     *
     * Returns:
     * {<SuperMap.Layer.AnimatorVector>} 新的矢量动画图层。
     */
    initialize: function(name, options,animatiorOption) {
        var me = this;
        
        SuperMap.Layer.prototype.initialize.apply(me, arguments);
        me.events.addEventType("drawfeaturestart");
        me.events.addEventType("featurerendered");
        me.events.addEventType("drawFrame");
        me.events.addEventType("mapresized");
        //初始化动画渲染器
        var renderer = SuperMap.Renderer[me.rendererType];
        me.renderer = new renderer(me.div, me.rendererOptions, me);

        //初始化features没有style用的
        if (!this.styleMap) {
            this.styleMap = new SuperMap.StyleMap();
        }
        //初始化features数组
        me.features = [];
        me.selectedFeatures = [];
        me.featureIdNames = {};
        me.drawedFeatures=[];
        //初始化动画管理参数
        var opt;
        if(animatiorOption)
        {
            opt = {
                speed:animatiorOption.speed,
                startTime:animatiorOption.startTime,
                endTime:animatiorOption.endTime,
                repeat:animatiorOption.repeat,
                reverse:animatiorOption.reverse,
                frameRate:animatiorOption.frameRate
            };
        }

        //初始化动画，绑定回调函数
        me.animator = new SuperMap.Animator(function (bounds) {
            return me.drawFeatures(bounds);
        }, opt);
        //初始化

        me.oldTimeOption ={};
    },

    /**
     * APIMethod: addFeatures
     * 给这个矢量动画图层添加features。
     *
     * (start code)
     * animatorVector.addFeatures([feature1,feature2,feature3...]);
     * (end)
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)}需要添加的要素数组。（也可以是单个feature）
     */
    addFeatures: function(features, options) {
        //添加进去的所有features会根据时间进行排序，并且会将代表同一个现实事物的所有features做索引连接

        //如果features不是数组，是一个，创建成为数组
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
//        //触发一下features加载之前的事件
//        var notify = !options || !options.silent;
//
//        if(notify) {
//            var event = {features: features};
//            var ret = this.events.triggerEvent("beforefeaturesadded", event);
//            if(ret === false) {
//                return;
//            }
//            features = event.features;
//        }
        var style=options&&options.style;
        //循环遍历一遍所有features，进行按照时间排序
        for (var i=0, len=features.length; i<len; i++) {
            var feature = features[i];
            if(style){
                feature.style=style;
            }


            //给feature当前图层的引用。
            feature.layer = this;
            //将feature添加进feature数组，使用直接插入法
            //第一个数据直接添加进去
            if(this.features.length<1)
            {
                this.features.push(feature);
                this.featureIdNames[feature.attributes[this.featureIdName]] = feature;
            }
            else
            {
                //后面的数据需要进行按照时间进行排序
                for(var j=this.features.length-1;j>-1;j--)
                {
                    //获取即将插入的feature的时间
                    var time1 = parseFloat(feature.attributes[this.timeName]);
                    //获取当前features位置的时间
                    var time2 = parseFloat(this.features[j].attributes[this.timeName]);
                    //往后排
                    if(time1>=time2)
                    {
                        var feaId1 = feature.attributes[this.featureIdName];
                        if(this.featureIdNames[feaId1])
                        {
                            var featureF = this.featureIdNames[feaId1];
                            if(this.isTheSameType(featureF.geometry.CLASS_NAME,feature.geometry.CLASS_NAME))
                            {
                                this.findFrontOrBackFeature(featureF,feature);
                            }
                            else
                            {
                                continue;
                            }
                        }
                        else
                        {
                            this.featureIdNames[feaId1] = feature;
                        }

                        //插入，有缺陷，如果已经到最前，需要插入到最前
                        this.features.splice(j+1,0,feature);
                        break;
                    }
                    else
                    {
                        if(j==0)
                        {
                            var feaId2 = feature.attributes[this.featureIdName];
                            if(this.featureIdNames[feaId2])
                            {
                                var featureF2 = this.featureIdNames[feaId2];
                                if(this.isTheSameType(featureF2.geometry.CLASS_NAME,feature.geometry.CLASS_NAME))
                                {
                                    this.findFrontOrBackFeature(featureF2,feature);
                                }
                                else
                                {
                                    continue;
                                }
                            }
                            else
                            {
                                this.featureIdNames[feaId2] = feature;
                            }

                            this.features.splice(0,0,feature);
                            break;
                        }
                    }
                }
            }
        }
        this.animator.redraw();
    },

    isTheSameType:function(className0,className1){
        switch(className0){
            case "SuperMap.Geometry.LinearRing":
                if(className1==="SuperMap.Geometry.LinearRing"||
                    className1==="SuperMap.Geometry.LineString"||
                    className1==="SuperMap.Geometry.MultiLineString"||
                    className1==="SuperMap.Geometry.MultiPolygon"||
                    className1==="SuperMap.Geometry.Polygon"){
                    return true;
                }else{
                    return false;
                }
            case "SuperMap.Geometry.LineString":
                if(className1==="SuperMap.Geometry.LinearRing"||
                    className1==="SuperMap.Geometry.LineString"||
                    className1==="SuperMap.Geometry.MultiLineString"){
                    return true;
                }else{
                    return false;
                }
            case "SuperMap.Geometry.MultiLineString":
                if(className1==="SuperMap.Geometry.LinearRing"||
                    className1==="SuperMap.Geometry.LineString"||
                    className1==="SuperMap.Geometry.MultiLineString"){
                    return true;
                }else{
                    return false;
                }
            case "SuperMap.Geometry.MultiPoint":
                if(className1==="SuperMap.Geometry.MultiPoint"||
                    className1==="SuperMap.Geometry.Point"){
                    return true;
                }else{
                    return false;
                }
            case "SuperMap.Geometry.Point":
                if(className1==="SuperMap.Geometry.MultiPoint"||
                    className1==="SuperMap.Geometry.Point"){
                    return true;
                }else{
                    return false;
                }
            case "SuperMap.Geometry.MultiPolygon":
                if(className1==="SuperMap.Geometry.LinearRing"||
                    className1==="SuperMap.Geometry.MultiPolygon"||
                    className1==="SuperMap.Geometry.Polygon"){
                    return true;
                }else{
                    return false;
                }
            case "SuperMap.Geometry.Polygon":
                if(className1==="SuperMap.Geometry.LinearRing"||
                    className1==="SuperMap.Geometry.MultiPolygon"||
                    className1==="SuperMap.Geometry.Polygon"){
                    return true;
                }else{
                    return false;
                }
            default:
                return false;
        }
        return false;
    },

    findFrontOrBackFeature:function(destinationFeature,sourceFeature){
        //目标feature的时间d
        var time1 = parseFloat(destinationFeature.attributes[this.timeName]);
        //源features的时间
        var time2 = parseFloat(sourceFeature.attributes[this.timeName]);
        if(time1<=time2)
        {
            if(destinationFeature.backFeature)
            {
                destinationFeature.backFeature.frontFeature =sourceFeature;
                sourceFeature.backFeature = destinationFeature.backFeature;
            }
            else
            {
                this.featureIdNames[sourceFeature.attributes[this.featureIdName]] = sourceFeature;
            }
            destinationFeature.backFeature = sourceFeature;
            sourceFeature.frontFeature = destinationFeature;

        }
        else
        {
            if(destinationFeature.frontFeature)
            {
                this.findFrontOrBackFeature(destinationFeature.frontFeature,sourceFeature);
            }
            else
            {
                sourceFeature.backFeature = destinationFeature;
                destinationFeature.frontFeature = sourceFeature;
            }
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
        //数组为空或长度为0直接返回，代表没有可移除的
        if(!features || features.length === 0) {
            return;
        }
        //全部移除
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        //如果不是数组创建成数组再一个一个移除
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        //
        if (features === this.selectedFeatures) {
            features = features.slice();
        }
        var removeDrawedFeatures=(features===this.drawedFeatures);
        if(removeDrawedFeatures){
            this.clearDrawedFeatures();
        }
        var featuresFailRemoved = [];
        //循环每一个需要移除的feature
        for (var i = 0,len= features.length - 1; i <= len; i++) {
            //获取featur
            var feature = features[i];

            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = SuperMap.Util.indexOf(this.features, feature);
            if(findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            //从数组中移除
            this.features.splice(findex, 1);
            if(!removeDrawedFeatures){
                //图层中移除要素后，绘制的要素记录相应的要素也要被移除
                this.removeDrawedFeature(feature);
            }
            //不存在这个对象时移除它的闪烁值
            if(!feature.frontFeature && !feature.backFeature)
            {
                delete(this.featureIdNames[feature.attributes[this.featureIdName]]);
            }
            //修改索引
            if(feature.frontFeature)//&& feature.frontFeature.backFeature
            {
                if(feature.backFeature)
                {
                    feature.frontFeature.backFeature = feature.backFeature;
                }
                else
                {
                    feature.frontFeature.backFeature = null;
                }

            }
            if(feature.backFeature)//feature.backFeature.frontFeature
            {
                if(feature.frontFeature)
                {
                    feature.backFeature.frontFeature = feature.frontFeature;
                }
                else
                {
                    feature.backFeature.frontFeature = null;
                }

            }


            //删除索引
            feature.frontFeature = null;
            feature.backFeature = null;
            //删除selectedFeatures中的此feature
            if (SuperMap.Util.indexOf(this.selectedFeatures, feature) !== -1){
                SuperMap.Util.removeItem(this.selectedFeatures, feature);
            }

            //这里移除了feature之后将它的layer也移除掉，避免内存泄露
            feature.layer = null;
        }

        //先清除再重绘。
        this.renderer.clear();
        //后期还需要考虑刷新的时候不要重复注册了帧的事件
        this.redraw();


        var succeed = featuresFailRemoved.length == 0 ? true : false;
//        this.events.triggerEvent("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    },

    /**
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function() {
        this.renderer.clear();
        //清除绘制过的要素记录
        this.clearDrawedFeatures();
        for(var i = 0,len=this.features.length;i<len;i++)
        {
            this.features[i].backFeature = null;
            this.features[i].frontFeature = null;
        }
        this.features = [];
        this.selectedFeatures = [];
        delete(this.featureIdNames);
        this.featureIdNames = {};
//        this.events.triggerEvent("featuresremoved", {features: [], succeed: true});
    },

    /**
     * APIMethod: getFeatureBy
     * 在Vector的要素数组features里面遍历每一个feature，当feature[property]===value时，
     * 返回此feature（并且只返回第一个）。
     *
     * Parameters:
     * property - {String} feature的某个属性名称。
     * value - {String} property所对应的值。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy: function(property, value) {
        var feature = null;
        for(var id in this.features) {
            if(this.features[id][property] === value) {
                feature = this.features[id];
                break;
            }
        }
        return feature;
    },

    /**
     * APIMethod: getFeatureById
     * 通过给定一个id，返回对应的矢量要素。
     *
     * Parameters:
     * featureId - {String} 矢量要素的属性id。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应id的feature，如果不存在则返回null。
     */
    getFeatureById: function(featureId) {
        return this.getFeatureBy('id', featureId);
    },

    /**
     * APIMethod: getFeaturesByAttribute
     * 通过给定一个属性的key值和value值，返回所有匹配的要素数组。
     *
     * Parameters:
     * attrName - {String}属性的key。
     * attrValue - {Mixed}属性对应的value值。
     *
     * Returns:
     * Array(<SuperMap.Feature.Vector>) 一个匹配的feature数组。
     */
    getFeaturesByAttribute: function(attrName, attrValue) {
        var i,
            feature,
            foundFeatures = [];
        for(var id in this.features) {
            feature = this.features[id];
            if(feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    },

    /**
     * APIMethod: destroy
     * 销毁AnimatorVector图层，释放资源。
     */
    destroy: function() {
        //清除所有feature
        for(var i=this.features.length-1; i>=0; i--) {
            //情况索引
            this.features[i].frontFeature = null;
            this.features[i].backFeature = null;
            //销毁
            //因为当feature存在layer属性时，每次destroy都会导致图层的重绘，
            // 因此在此直接将feature的layer属性设置为null,避免了重绘
            this.features[i].layer=null;
            this.features[i].destroy();
        }
        this.features = null;
        this.drawedFeatures=null;
        this.selectedFeatures = null;
        if (this.renderer) {
            this.renderer.destroy();
        }
        this.renderer = null;
        this.animator.destroy();
        this.animator = null;
        this.featureIdName = null;
        this.featureIdNames = null;
        this.timeName = null;
        this.oldTimeOption = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);  
    },

    /**
     * APIMethod: setOpacity
     * 设置图层的不透明度,取值[0-1]之间。使用方法如下详解：
     *
     * (code)
     * var animatorVector = new SuperMap.Layer.AnimatorVector("Vector Layer");
     * animatorVector.setOpacity(0.2);
     * (end)
     *
     * Parameter:
     * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
     */
    setOpacity: function(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.renderer.root;
            SuperMap.Util.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },

    /**
     * APIMethod: display
     * 临时隐藏或者显示图层（地图平移放大缩小后会立即显示）。通过对CSS控制产生即时效果，重新渲染失效。
     * 如果要控制图层的显示和隐藏一般用 setVisibility 方法来实现
     *
     * Parameters:
     * display - {Boolean}true代表不隐藏，false代表隐藏。
     * (start code)
     * animatorVector.display(true/false);
     * (end)
     */
    display: function(display) {
        SuperMap.Layer.prototype.display.apply(this, arguments);
        // we need to set the display style of the root in case it is attached
        // to a foreign layer
        var currentDisplay = this.div.style.display;
        if(currentDisplay !== this.renderer.root.style.display) {
            this.renderer.root.style.display = currentDisplay;
        }
    },

    /**
     * Method: setMap
     * 图层已经添加到Map控件中。
     *
     * 如果没有设置renderer集合，这个图层将不可用，从map控件中删除，
     * 否则，给当前渲染器添加map的引用，并设置渲染器的大小。
     *
     * Parameters:
     * map - {<SuperMap.Map>}需要与图层绑定的map。
     */
    setMap: function(map) {
        SuperMap.Layer.prototype.setMap.apply(this, arguments);

        if (!this.renderer) {
            this.map.removeLayer(this);
        } else {
            this.renderer.map = this.map;

            var newSize = this.map.getSize();
            newSize.w = newSize.w * this.ratio;
            newSize.h = newSize.h * this.ratio;
            this.renderer.setSize(newSize);
        }
    },

//    /**
//     * Method: clone
//     * 创建这个图层的副本。
//     *
//     * 注意: 这个图层上的Features一样会被克隆。
//     *
//     * Returns:
//     * {<SuperMap.Layer.Vector>} 图层对象的副本。
//     */
//    clone: function (obj) {
//
//        if (obj == null) {
//            obj = new SuperMap.Layer.AnimationVector(this.name, this.getOptions());
//        }
//
//        obj = SuperMap.Layer.prototype.clone.apply(this, [obj]);
//
//        var features = this.features;
//        var len = features.length;
//        var clonedFeatures = new Array(len);
//        for(var i=0; i<len; ++i) {
//            clonedFeatures[i] = features[i].clone();
//        }
//        obj.features = clonedFeatures;
//
//        return obj;
//    },
    
    /**
     * Method: refresh
     * 让图层重新请求Features并重绘。
     *     Triggers the refresh event if the layer is in range and visible.
     *
     * Parameters:
     * obj - {Object} Optional object with properties for any listener of
     *     the refresh event.
     */
    refresh: function(obj) {
        if(this.calculateInRange() && this.visibility) {
            this.events.triggerEvent("refresh", obj);
        }
    },
    
    /**
     * Method: onMapResize
     * 通知渲染器的尺寸变化。
     * 
     */
    onMapResize: function() {
        SuperMap.Layer.prototype.onMapResize.apply(this, arguments);
        var newSize = this.map.getSize();
        newSize.w = newSize.w * this.ratio;
        newSize.h = newSize.h * this.ratio;
        this.renderer.setSize(newSize);
        this.events.triggerEvent("mapresized",newSize);
    },

    /**
     * Method: moveTo
     * 重置当前矢量图层的div，再一次与Map控件保持一致。
     * 通知渲染器视图范围的改变，在缩放级别改变时，重绘对象。
     *
     * 如果对象未绘制，则遍历对象，并绘制。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 
     * zoomChanged - {Boolean} 
     * dragging - {Boolean} 
     */
    moveTo: function(bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        this.zoomChanged = zoomChanged;

        var coordSysUnchanged = true;

        if (!dragging) {
            this.renderer.root.style.visibility = "hidden";
            var viewSize = this.map.getSize(),
            viewWidth = viewSize.w,
            viewHeight = viewSize.h,
            offsetLeft = (viewWidth / 2 * this.ratio) - viewWidth / 2,
            offsetTop = (viewHeight / 2 * this.ratio) - viewHeight / 2;
            offsetLeft += parseInt(this.map.layerContainerDiv.style.left, 10);
            offsetLeft = -Math.round(offsetLeft);
            offsetTop += parseInt(this.map.layerContainerDiv.style.top, 10);
            offsetTop = -Math.round(offsetTop);
            this.div.style.left = offsetLeft + 'px';
            this.div.style.top = offsetTop + 'px';
            var extent = this.map.getExtent().scale(this.ratio);
            //在setExtent方法中设置了canvasRenderer的lastbounds。
            coordSysUnchanged = this.renderer.setExtent(extent, zoomChanged);

            this.renderer.root.style.visibility = "visible";

            // Force a reflow on gecko based browsers to prevent jump/flicker.
            // This seems to happen on only certain configurations; it was originally
            // noticed in FF 2.0 and Linux.
            if (SuperMap.IS_GECKO === true) {
                this.div.scrollLeft = this.div.scrollLeft;
            }
        }


        if (zoomChanged || !coordSysUnchanged) {
            this.drawFeatures(bounds);
        }
        

    },
    
    /**
     * Method: drawFeatures
     * 遍历所有features，并绘制，
     */
     drawFeatures: function(bounds) {
        var me = this,
            drawFeatures = me.features;
        //如果当前图层不可见，则不进行绘制
        if(!me.visibility)
        {
            return;
        }
        //获取需要绘制的时间段
        var option = {
            oldTime:me.animator.getOldTime(),
            newTime:me.animator.getCurrentTime()
        };
        //清除图层一下
        this.renderer.clear();
        if(!drawFeatures || drawFeatures.length<1)
        {
            return;
        }
        //方法一：直接循环遍历
        for(var k = 0, len = drawFeatures.length; k < len; k++) {

            //需要判断是否需要绘制

            var feature = drawFeatures[k];
            var featureBack = feature.backFeature;
            var t1 = parseFloat(feature.attributes[me.timeName]);
            var t2 = null;
            if(featureBack)
            {
                t2 = parseFloat(featureBack.attributes[me.timeName]);
            }

            //必须要在时间范围内才可以绘制
            //~这里的等于需要考虑一下
            if(t1>=option.oldTime )
            {
                if(t1<=option.newTime)
                {
                    if(!t2 || t2>option.newTime)
                    {
                        //触发事件
                        me.events.triggerEvent('drawfeaturestart',feature);
                        me.drawFeature(feature,undefined,{smooth:[false,1]});
                    }
                }
                else
                {
                    //大于时间上限直接跳出，减少循环
                    break;
                }
            }
            else
            {
                //需要绘制平滑
                if(t2 && t2>option.newTime && me.smooth)
                {
                    //计算位置
                    var sca =  (option.newTime - option.oldTime)/(t2-t1);
                    //向上取整
                    var jsshu = Math.ceil((option.oldTime - t1)/(option.newTime - option.oldTime));
                    me.drawFeature(featureBack,undefined,{smooth:[true,jsshu*sca]});
                }
            }
        }

        //方法二，在循环遍历上做了优化，遍历次数大大减少，但是性能提高不明显
//        //定义开始遍历的数组索引位置
//        var i = me.oldTimeOption.startIndex !=undefined?me.oldTimeOption.startIndex:0;
//        var j = i+1;
//        var len = drawFeatures.length;
//        me.oldTimeOption.startIndex = len-1;
//        //从当前索引往左寻找
//        for(;i>-1;i--)
//        {
//            //获取当前的feature
//            var _feature = drawFeatures[i];
//            //获取他的后面feature
//            var _featureBack = _feature.backFeature;
//            var _t1 = parseFloat(_feature.attributes[me.timeName]);
//            var _t2 = null;
//            if(_featureBack)
//            {
//                _t2= parseFloat(_featureBack.attributes[me.timeName]);
//            }
//            if(_t1>=option.oldTime )
//            {
//                if(_t1<=option.newTime)
//                {
//                    //后面的feature不存在或者时间超出newTime则绘制
//                    if(!_t2 || _t2>option.newTime)
//                    {
//                        me.drawFeature(_feature,undefined,{smooth:[true,1]});
//                        //存储最靠前的索引
//                        me.oldTimeOption.startIndex = me.oldTimeOption.startIndex<i?me.oldTimeOption.startIndex:i;
//                    }
//                }
//
//            }
//            else
//            {
//                if(_t2 && _t2>option.newTime)
//                {
//                    //计算位置
//                    var _sca =  (option.newTime - option.oldTime)/(_t2-_t1);
//                    //向上取整
//                    var _jsshu = Math.ceil((option.oldTime - _t1)/(option.newTime - option.oldTime));
//                    //这里只考虑了点的情况，以后肯定还是需要修改的
//
//                    var _oldX = _featureBack.geometry.x;
//                    var _oldY = _featureBack.geometry.y;
//                    _featureBack.geometry.x = _feature.geometry.x + (_featureBack.geometry.x - _feature.geometry.x)*_jsshu*_sca;
//                    _featureBack.geometry.y = _feature.geometry.y + (_featureBack.geometry.y - _feature.geometry.y)*_jsshu*_sca;
//                    me.drawFeature(_featureBack,undefined,{smooth:[true,_jsshu*_sca]});
//                    //存储最靠前的索引
//                    me.oldTimeOption.startIndex = me.oldTimeOption.startIndex<i?me.oldTimeOption.startIndex:i;
//                    _featureBack.geometry.x = _oldX;
//                    _featureBack.geometry.y = _oldY;
//                }
//                else
//                {
//                    break;
//                }
//            }
//        }
//        //从当前索引往右寻找
//        for(;j<len;j++)
//        {
//            //获取当前的feature
//            var feature_ = drawFeatures[j];
//            //获取他的后面feature
//            var featureBack_ = feature_.backFeature;
//            var t1_ = parseFloat(feature_.attributes[me.timeName]);
//            var t2_ = null;
//            if(featureBack_)
//            {
//                t2_= parseFloat(featureBack_.attributes[me.timeName]);
//            }
//            //必须要在时间范围内才可以绘制
//            //~这里的等于需要考虑一下
//            if(t1_>=option.oldTime )
//            {
//                if(t1_<=option.newTime)
//                {
//                    //后面的feature不存在或者时间超出newTime则绘制
//                    if(!t2_ || t2_>option.newTime)
//                    {
//                        me.drawFeature(feature_,undefined,{smooth:[true,1]});
//                        //存储最靠前的索引
//                        me.oldTimeOption.startIndex = me.oldTimeOption.startIndex<j?me.oldTimeOption.startIndex:j;
//                    }
//                }
//                else
//                {
//                    //大于时间上限直接跳出，减少循环
//                    break;
//                }
//            }
//            else
//            {
//                if(t2_ && t2_>option.newTime)
//                {
//                    //计算位置
//                    var sca_ =  (option.newTime - option.oldTime)/(t2_-t1_);
//                    //向上取整
//                    var jsshu_ = Math.ceil((option.oldTime - t1_)/(option.newTime - option.oldTime));
//                    //这里只考虑了点的情况，以后肯定还是需要修改的
//
//                    var oldX_ = featureBack_.geometry.x;
//                    var oldY_ = featureBack_.geometry.y;
//                    featureBack_.geometry.x = feature_.geometry.x + (featureBack_.geometry.x - feature_.geometry.x)*jsshu_*sca_;
//                    featureBack_.geometry.y = feature_.geometry.y + (featureBack_.geometry.y - feature_.geometry.y)*jsshu_*sca_;
//                    me.drawFeature(featureBack_,undefined,{smooth:[true,jsshu_*sca_]});
//                    //存储最靠前的索引
//                    me.oldTimeOption.startIndex = me.oldTimeOption.startIndex<j?me.oldTimeOption.startIndex:j;
//                    featureBack_.geometry.x = oldX_;
//                    featureBack_.geometry.y = oldY_;
//                }
//            }
//
//        }


    },
       
    /**
     * Method: redraw
     * 重绘该图层，成功则返回true，否则返回false。
     *
     * Returns:
     * {Boolean} 重绘该图层。
     */
    redraw: function() {

        return SuperMap.Layer.prototype.redraw.apply(this, arguments);
    },


    /**
     * Method: drawFeature
     * 在当前图层中绘制一个feature。如果参数中的样式（style）被设置
     * 则使用。否则使用矢量要素的样式。如果未设置要素的样式，则使用图层上的样式。
     * 
     * 当要素的样式更改或者要素已经添加到图层上需要更新时使用该函数。
     *
     * Parameters: 
     * feature - {<SuperMap.Feature.Vector>}需要绘制的要素
     * style - {String | Object} 风格
     */
     drawFeature: function(feature, style,option) {
        //生成默认的style
        if (typeof style !== "object") {
            if(!style && feature.state === SuperMap.State.DELETE) {
                style = "delete";
            }
            var renderIntent = style || feature.renderIntent;
            style = feature.style || this.style;
            if (!style) {
                style = this.styleMap.createSymbolizer(feature, renderIntent);
            }
        }
        //反正只使用canvas绘制，不考虑其他的绘制了
        var renderedFeature =  this.renderer.drawFeature(feature, style, option);
        renderedFeature && this.recordDrawedFeature(renderedFeature);
        this.renderer.container.style.cursor="pointer";
        renderedFeature && this.events.triggerEvent('featurerendered',renderedFeature);
    },

    /**
     * Method: recordDrawedFeature
     * 记录已经绘制过的要素
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}
     * */
    recordDrawedFeature:function(feature){
        if(this.needRecordDrawedFeature){
            if(SuperMap.Util.indexOf(this.drawedFeatures,feature)<0){
                this.drawedFeatures.push(feature);
                return true;
            }
        }
        return false;
    },

    /**
     * APIMethod: getDrawedFeatures
     * 获取已经绘制过的要素数组
     *
     * Return:
     * {Array(<SuperMap.Feature.Vector>)} 要素数组
     * */
    getDrawedFeatures:function(){
        return this.drawedFeatures;
    },

    /**
     * Method: clearDrawedFeatures
     * 清空历史要素数组
     * */
    clearDrawedFeatures:function(){
        this.drawedFeatures=[];
    },

    /**
     * Method: removeDrawedFeature
     * 移除历史要素数组中的某一项
     * */
    removeDrawedFeature:function(feature){
        var index = SuperMap.Util.indexOf(this.drawedFeatures,feature);
        if(index>-1){
            this.drawedFeatures.splice(index,1);
        }
    },
    
    /**
     * Method: eraseFeatures
     * 擦除feature的显示，但是不从列表中删除。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 
     */
    eraseFeatures: function(features) {
        this.renderer.eraseFeatures(features);
    },

    /**
     * Method: getFeatureFromEvent
     * 通过一个事件，从渲染器中获取一个对应的feature，如果没有则返回null。
     *
     * Parameters:
     * evt - {Event} 
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 一个通过事件选中的feature。
     */
    getFeatureFromEvent: function(evt) {
       if(this.visibility == false)
        return null;

        if (!this.renderer) {
            throw new Error('getFeatureFromEvent called on layer with no ' +
                            'renderer. This usually means you destroyed a ' +
                            'layer, but not some handler which is associated ' +
                            'with it.');
        }
        var feature = null;
        var featureId = this.renderer.getFeatureIdFromEvent(evt);
        if (featureId) {
            if (typeof featureId === "string") {
                feature = this.getFeatureById(featureId);
            } else {
                feature = featureId;
            }
        }
        return feature;
    },



    /**
     * Method: getFeatureByFid
     * 通过给定一个fid，返回对应的矢量要素。
     *
     * Parameters:
     * featureFid - {String}矢量要素的属性fid。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应fid的feature，如果不存在则返回null。
     */
    getFeatureByFid: function(featureFid) {
        return this.getFeatureBy('fid', featureFid);
    },


    //todo
    /** 
     * APIMethod: getDataExtent
     * 计算所有要素集的最大范围。
     * 
     * Returns:
     * {<SuperMap.Bounds>} 如果没有feature则返回null，否则返回
     * 所有feature的geometry的最大范围。
     */
    getDataExtent: function () {
        var maxExtent = null;
        var features = this.features;
        if(features) {
            var geometry = null;
            for(var id in this.features) {
                geometry = features[id].geometry;
                if (geometry) {
                    if (maxExtent === null) {
                        maxExtent = new SuperMap.Bounds();
                    }
                    maxExtent.extend(geometry.getBounds());
                }
            }
        }
        return maxExtent;
    },


    CLASS_NAME: "SuperMap.Layer.AnimatorVector"
});
