/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Vector.js
 */

/**
 * Class: SuperMap.Layer.HeatGridLayer
 * 热点格网图，结合了热点图和聚散的特性
 *
 * Inherits from:
 *  - <SuperMap.Layer.Vector>
 */
SuperMap.Layer.HeatGridLayer = SuperMap.Class(SuperMap.Layer.Vector, {
    /**
     * Property: pointFeatures
     * {Array} 存储所有点要素(SuperMap.Feature.Vector)的数组，
     * 此数组内部的feature.geometry只能是SuperMap.Geometry.Point，不能是线或面
     */
    pointFeatures:null,
    /**
     * APIProperty: gridWidth
     * {Number} 每个格网的宽（像素单位），默认大小为50像素
     */
    gridWidth:50,
    /**
     * APIProperty: gridHeight
     * {Number} 每个格网的高（像素单位），默认大小为50像素
     */
    gridHeight:50,
    /**
     * APIProperty: items
     * {Array} 格网子对象数组，
     * 此数组用于设置格网的范围和style，有以下三种情况：
     * 1.不设置此参数，所有格网默认绘制时有一个统一style；
     * 2.此数组非空，每个格网的style会按照它所对应的范围在数组里面取style；
     * 3.如果格网不在数组中的任何一个范围内，会有一个默认的style。
     * 此数组的每一个子对象必须有三个属性：
     * start : 代表格网表示的数据的下限（包含）;
     * end：代表格网表示的数据的上限（不包含）;
     * style：代表需要赋值格网的style。
     * 格网表示的数据由属性labelMode决定，可以使用当前格网内部数据的数量、平均值、最大值、最小值等。
     * (start code)
     * items数组形如：
     * [
     *   {
     *      start:0,
     *      end:2,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#B8E4B8",
     *          fillOpacity: 0.5
     *      }
     *   },
     *   {
     *      start:2,
     *      end:4,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#66dd66",
     *          fillOpacity: 0.5
     *      }
     *   },
     *   {
     *      start:4,
     *      end:6,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#00ee00",
     *          fillOpacity: 0.5
     *      }
     *   },
     *   {
     *      start:6,
     *      end:8,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#008800",
     *          fillOpacity: 0.5
     *      }
     *   },
     *   {
     *      start:8,
     *      end:10,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#df8505",
     *          fillOpacity: 0.5
     *      }
     *   },
     *   {
     *      start:10,
     *      end:12,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#CC9933",
     *          fillOpacity: 0.5
     *      }
     *   },
     *   {
     *      start:12,
     *      end:14,
     *      style:{
     *          strokeColor: "#C69944",
     *          strokeWidth: 1,
     *          fillColor: "#FF0000",
     *          fillOpacity: 0.5
     *      }
     *   }
     * ]
     * (end)
     * style详细属性请查看SuperMap.Feature.Vector.style
     */
    items:null,
    /**
     * APIProperty: isShowLabel
     * 设置是否显示格网的label，此label会根据labelMode的不同而显示不同的信息
     * 此参数如果设置为true，那么每一个格网会显示它当前所代表的数据，
     * 此时用户如果在items.style里面设置label属性无效，如果此属性设置为false，
     * 那么用户在items.style里面设置的label属性可以显示
     * {Boolean} 是否显示格网所代表的数据
     */
    isShowLabel:true,
    /**
     * APIProperty: spreadZoom
     * 此属性用于用户控制格网扩散的地图级数
     * {Number} 当地图放大到这一级的时候格网会自动扩散为点
     */
    spreadZoom:3,
    /**
     * APIProperty: selectGrid
     * 格网选择控件 ,用于控制事件
     * {SuperMap.Control.SelectGrid}
     */
    selectGrid:null,
    /**
     * Property: gridMaxCounts
     * 格网所代表的数据最大量
     * {Number}
     */
    gridMaxCounts:null,
    /**
     * Property: gridMinCounts
     * 格网所代表的数据最小量
     * {Number}
     */
    gridMinCounts:null,
    /**
     * APIProperty: isZoomIn
     * 在点击格网时是否放大地图
     * {Boolean} 默认为true
     */
    isZoomIn:true,
    /**
     * APIProperty: zoomInNumber
     * 在点击格网时放大地图的级数，isZoomIn设置为true时此参数才有效
     * {Number} 默认为1
     */
    zoomInNumber:1,
    /**
     * APIProperty: labelMode
     * label显示数字代表的含义，
     * SuperMap.Layer.HeatGridLayer.LABELMODE_NUMBER代表格网label显示的数字为当前格网包含的数据的数量；
     * SuperMap.Layer.HeatGridLayer.LABELMODE_MEAN代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的平均值；
     * SuperMap.Layer.HeatGridLayer.LABELMODE_MAX代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的最大值；
     * SuperMap.Layer.HeatGridLayer.LABELMODE_MIN代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的最小值；
     * SuperMap.Layer.HeatGridLayer.LABELMODE_SUM代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的总和；
     *
     * {Number} 默认为SuperMap.Layer.HeatGridLayer.LABELMODE_NUMBER
     */
    labelMode:0,
    /**
     * APIProperty: dataField
     * 当属性labelMode非0时，label显示的基础数据来源都需要用户指定，默认数据应该为feature.attributes下的属性
     * feature.attributes的数据一般情况是访问服务器后从服务器中的数据集获取的部分字段的属性，
     * 所以用户的数据可以某字段的形式存放在数据库，前端请求数据后用户需要将存放数据的字段名称制定到此属性上面，
     * 然后内部才会通过此属性去获取到数据，再按照labelMode去进行相应的计算
     * 此属性对应的数据不能为空
     * {String} 默认为null
     */
    dataField:null,
    /**
     * APIProperty: definition
     * 设置label上的数字的精确位数，只能设置为整数，
     * 如果设置为负整数时代表对label显示的数字不做精确度控制，
     * 如0代表取整，1代表精确到小数点后一位，2代表精确到小数点后两位，等依次类推
     * {Number} 默认为2
     */
    definition:2,
    /**
     * Constructor: SuperMap.Layer.HeatGridLayer
     * 热点格网图，主要强调热度、数值
     * 创建一个热点格网图层。
     * (start code)
     * //创建一个名为“heatGrid”的热点格网图层。
     * var heatGridLayer = new SuperMap.Layer.HeatGridLayer("heatGrid");
     * (end)
     *
     *
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.HeatGridLayer>} 新的热点格网图层。
     */
    initialize:function(name,options){
        SuperMap.Layer.Vector.prototype.initialize.apply(this, arguments);

        this.EVENT_TYPES = SuperMap.Layer.Vector.prototype.EVENT_TYPES.concat(
            SuperMap.Layer.prototype.EVENT_TYPES
        );

        this.events = new SuperMap.Events(this, this.div,
            this.EVENT_TYPES);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }


    },
    /**
     * Method: clickGrid
     * 点击格网时需要执行的操作，此操作会在用户注册的点击格网事件之前执行，用于扩展，
     * Parameters:
     * feature - {SuperMap.Feature.Vector} 被点击的格网要素
     */
    clickGrid:function(feature){
        //进行放大
        if(this.isZoomIn)
        {
            var oldLonlat = feature.geometry.getBounds().getCenterLonLat();
            var oldPortPx = this.map.getViewPortPxFromLonLat(oldLonlat);
            var oldCenterLonlat = this.map.getCenter();
            var oldCenterPortPx = this.map.getViewPortPxFromLonLat(oldCenterLonlat);
            var res = this.map.getResolutionForZoom(this.map.getZoom()+1);
            var lonlat = new SuperMap.LonLat(oldLonlat.lon - (oldPortPx.x-oldCenterPortPx.x)*res,oldLonlat.lat + (oldPortPx.y-oldCenterPortPx.y)*res);
            //这里为止后期需要优化一下
            this.map.setCenter(lonlat,this.map.getZoom()+this.zoomInNumber);
        }

    },
    /**
     * Method: clickoutGrid
     * 点击格网后又点击空白处时需要执行的步骤，此操作会在用户注册的clickout事件之前执行，用于扩展，
     * Parameters:
     * feature - {SuperMap.Feature.Vector} 之前被点击的格网要素
     */
    clickoutGrid:function(feature){
        //未作处理
    },


    /**
     * APIMethod: addFeatures
     * （覆盖了父类的方法。）
     * 添加点要素（SuperMap.Feature.Vector）数组，此数组中每一个要素的 geometry对象只能是点，即 SuperMap.Geometry.Point 类型
     *
     * Parameters:
     * features - {Array} 需要绘制的点要素（SuperMap.Feature.Vector）数组。
     */
    addFeatures:function(features){
        if(this.pointFeatures == undefined)
        {
            this.pointFeatures = features;
        }
        else
        {
            //将两数组进行组合
            this.pointFeatures = this.pointFeatures.concat(features);
        }
        if(this.map)
        {
            SuperMap.Layer.Vector.prototype.removeAllFeatures.apply(this, []);
            var feas =  this.calculateFeatures(this.pointFeatures);
            SuperMap.Layer.Vector.prototype.addFeatures.apply(this, [feas]);
        }
    },
    /**
     * APIMethod: removeFeatures
     * 删除点要素数据
     *
     * Parameters:
     *
     * features - {Array} 需要删除的点要素（SuperMap.Feature.Vector）数组
     */
    removeFeatures:function(features){
        if(!this.pointFeatures)
        {
            return;
        }

        for(var i = 0;i<this.pointFeatures.length;i++)
        {
            for(var j = 0;j<features.length;j++)
            {
                if(this.pointFeatures[i] === features[j])
                {
                    this.pointFeatures.splice(i--,1);
                    break;
                }
            }
        }
        if(this.map && this.pointFeatures)
        {
            SuperMap.Layer.Vector.prototype.removeAllFeatures.apply(this, []);
            var feas =  this.calculateFeatures(this.pointFeatures);
            SuperMap.Layer.Vector.prototype.addFeatures.apply(this, [feas]);
        }
    },
    /**
     * APIMethod: removeAllFeatures
     * 删除所有点要素数据
     */
    removeAllFeatures:function(){
        this.pointFeatures = null;
        SuperMap.Layer.Vector.prototype.removeAllFeatures.apply(this, arguments);
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
     * zoomChanged - {Boolean} 地图级别是否改变
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging){
        //如果层级改变了就重新计算features
        if(zoomChanged && this.pointFeatures && this.pointFeatures.length>0)
        {
            SuperMap.Layer.Vector.prototype.removeAllFeatures.apply(this, []);
            var feas = this.calculateFeatures(this.pointFeatures);
            SuperMap.Layer.Vector.prototype.addFeatures.apply(this, [feas]);
        }
        SuperMap.Layer.Vector.prototype.moveTo.apply(this, arguments);
    },
    /**
     * APIMethod: destroy
     * 销毁热点格网图层，释放资源。
     */
    destroy: function() {
        this.pointFeatures = null;
        this.gridWidth = null;
        this.gridHeight = null;
        this.items = null;
        this.isShowLabel = null;
        this.spreadZoom = null;
        if(this.selectGrid)
        {
            this.selectGrid.destroy();
            this.selectGrid = null;
        }
        this.gridMaxCounts = null;
        this.gridMinCounts = null;
        this.isZoomIn = null;
        this.zoomInNumber = null;
        this.labelMode = null;
        this.dataField = null;
        this.definition = null;


        SuperMap.Layer.Vector.prototype.destroy.apply(this, arguments);
    },
    /**
     * Method: calculateFeatures
     * 按照存储的点重新计算需要绘制的features。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateFeatures:function(features){
        var zoom = this.map.getZoom();
        if(zoom >= this.spreadZoom)
        {
            this.events.triggerEvent("calculateFeaturesEnd", this);
            return features;
        }
        else
        {
            if(this.labelMode == 0)
            {
                return this.calculateCounts(features);
            }
            else if(this.labelMode === 1)
            {
                return this.calculateSumOrMean(features,false);
            }
            else if(this.labelMode === 2)
            {
                return this.calculateMaxOrMin(features,true);
            }
            else if(this.labelMode === 3)
            {
                return this.calculateMaxOrMin(features,false);
            }
            else if(this.labelMode === 4)
            {
                return this.calculateMode(features);
            }
            else if(this.labelMode === 5)
            {
                return this.calculateMedian(features);
            }
            else if(this.labelMode === 6)
            {
                return this.calculateStandardDeviation(features);
            }
            else if(this.labelMode===7){
                return this.calculateSumOrMean(features,true);
            }
        }

    },
    /**
     * Method: calculateCounts
     * 计算格网的同时计算格网数量。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateCounts:function(features){
        var gridWidth,gridHeight;
        gridWidth =this.gridWidth*this.map.getResolution();
        gridHeight = this.gridHeight*this.map.getResolution();
        var feas = [],gridFeatures = [];

        for(var i = 0;i<features.length;i++)
        {
            if(!features[i].style)
            {
                features[i].style = {
                    fillColor:"#E0E0A0",
                    strokeColor:"#df8505",
                    strokeOpacity:1,
                    strokeWidth:2,
                    pointRadius:4
                };
            }
            var point = features[i].geometry;
            var _x,_y,_z;
            _z = this.map.getZoom();
            if(point.x >=0)
            {
                _x = (point.x - point.x%gridWidth)/gridWidth;
            }
            else
            {
                _x = (point.x - (gridWidth + point.x%gridWidth))/gridWidth;
            }
            if(point.y >=0)
            {
                _y = (point.y - point.y%gridHeight)/gridHeight;
            }
            else
            {
                _y = (point.y - (gridHeight + point.y%gridHeight))/gridHeight;
            }
            if(gridFeatures[_x+"_"+_y+"_"+_z] ==undefined)
            {
                var points =[new SuperMap.Geometry.Point(_x*gridWidth,_y*gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth,_y*gridHeight+gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth+gridWidth,_y*gridHeight+gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth+gridWidth,_y*gridHeight)
                    ],
                    linearRings = new SuperMap.Geometry.LinearRing(points),
                    region = new SuperMap.Geometry.Polygon([linearRings]);
                var feature = new SuperMap.Feature.Vector(region);
                feature.childArray = [];
                feature.childArray.push(features[i]);
                feature.gridID = _x+"_"+_y+"_"+_z;
                gridFeatures[_x+"_"+_y+"_"+_z] = feature;
                feas.push(feature);
            }
            else
            {
                var rect = gridFeatures[_x+"_"+_y+"_"+_z];
                rect.childArray.push(features[i]);
            }
        }

        //添加风格
        for(var k = 0;k<feas.length;k++)
        {
            var fea = feas[k];
            if(!fea.style)
            {
                fea.style = {
                    strokeColor: "#C69944",
                    strokeWidth: 1,
                    fillColor: "#B8E4B8",
                    fillOpacity: 0.5
                };
            }
            if(this.items)
            {
                for(var n = 0;n<this.items.length;n++)
                {
                    if((this.items[n].start !=undefined)  && (this.items[n].end != undefined) )
                    {
                        if((this.items[n].start<=fea.childArray.length) && (fea.childArray.length<this.items[n].end))
                        {
                            fea.style =SuperMap.Util.cloneObject(this.items[n].style);

                        }
                    }
                }
            }

            var num = fea.childArray.length;
            if(this.isShowLabel)
            {
                if(this.definition <0)
                {
                    fea.style.label = num.toString();
                }
                else
                {
                    var multiple = Math.pow(10,this.definition);
                    //这一步处理是为了防止js自身语法的缺陷
                    //var a =38.3*100;    3829.9999999999995
                    //var b =38.2*100;    3820.0000000000005
                    var ar = num.toString().split('.');
                    if(ar.length === 2 && ar[1].length>this.definition)
                    {
                        num = parseInt(num*multiple)/multiple;
                    }
                    var num = parseInt(num*multiple)/multiple;
                    fea.style.label = num.toString();
                }
            }
        }
        this.events.triggerEvent("calculateFeaturesEnd", this);
        return feas;
    },
    /**
     * Method: calculateSumOrMean
     * 计算格网的同时计算格网内部数据的总和或平均值。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateSumOrMean:function(features,isSum){
        var gridWidth,gridHeight;
        gridWidth =this.gridWidth*this.map.getResolution();
        gridHeight = this.gridHeight*this.map.getResolution();
        var gridFeatures = [];
        var feas = [];

        for(var i = 0;i<features.length;i++)
        {
            var point = features[i].geometry;
            var _x,_y,_z;
            _z = this.map.getZoom();
            if(point.x >=0)
            {
                _x = (point.x - point.x%gridWidth)/gridWidth;
            }
            else
            {
                _x = (point.x - (gridWidth + point.x%gridWidth))/gridWidth;
            }
            if(point.y >=0)
            {
                _y = (point.y - point.y%gridHeight)/gridHeight;
            }
            else
            {
                _y = (point.y - (gridHeight + point.y%gridHeight))/gridHeight;
            }
            if(gridFeatures[_x+"_"+_y+"_"+_z] ==undefined)
            {
                var points =[new SuperMap.Geometry.Point(_x*gridWidth,_y*gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth,_y*gridHeight+gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth+gridWidth,_y*gridHeight+gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth+gridWidth,_y*gridHeight)
                    ],
                    linearRings = new SuperMap.Geometry.LinearRing(points),
                    region = new SuperMap.Geometry.Polygon([linearRings]);
                var feature = new SuperMap.Feature.Vector(region);
                feature.childArray = [];
                feature.childArray.push(features[i]);
                feature.mean = parseFloat(features[i].attributes[this.dataField]);
                feature.gridID = _x+"_"+_y+"_"+_z;
                gridFeatures[_x+"_"+_y+"_"+_z] = feature;
                feas.push(feature);
            }
            else
            {
                var rect = gridFeatures[_x+"_"+_y+"_"+_z];
                rect.childArray.push(features[i]);
                var a=rect.mean,
                    b = parseFloat(features[i].attributes[this.dataField]);
                if(isSum){
                    rect.mean=a+b;
                }else{
                    a *=(rect.childArray.length-1);
                    rect.mean = (a + b)/rect.childArray.length;
                }
            }
        }
        //添加风格
        for(var k = 0;k<feas.length;k++)
        {
            var fea = feas[k];

            if(!fea.style)
            {
                fea.style = {
                    strokeColor: "#C69944",
                    strokeWidth: 1,
                    fillColor: "#B8E4B8",
                    fillOpacity: 0.5
                };
            }
            if(this.items)
            {
                for(var n = 0;n<this.items.length;n++)
                {
                    if((this.items[n].start !=undefined)  && (this.items[n].end != undefined) )
                    {
                        if((this.items[n].start <= fea.mean) && (fea.mean<=this.items[n].end))
                        {
                            fea.style =SuperMap.Util.cloneObject(this.items[n].style);

                        }
                    }
                }
            }
            var num = fea.mean;
            if(this.isShowLabel)
            {
                if(this.definition <0)
                {
                    fea.style.label = num.toString();
                }
                else
                {
                    var multiple = Math.pow(10,this.definition);
                    var ar = num.toString().split('.');
                    if(ar.length === 2 && ar[1].length>this.definition)
                    {
                        num = parseInt(num*multiple)/multiple;
                    }
                    fea.style.label = num.toString();
                }
            }
        }
        this.events.triggerEvent("calculateFeaturesEnd", this);
        return feas;
    },
    /**
     * Method: calculateMaxOrMin
     * 计算格网的同时计算格网内部数据的最大最小值。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateMaxOrMin:function(features,isMax){
        var gridWidth,gridHeight;
        gridWidth =this.gridWidth*this.map.getResolution();
        gridHeight = this.gridHeight*this.map.getResolution();
        var gridFeatures = [];
        var feas = [];

        for(var i = 0;i<features.length;i++)
        {
            var point = features[i].geometry;
            var _x,_y,_z;
            _z = this.map.getZoom();
            if(point.x >=0)
            {
                _x = (point.x - point.x%gridWidth)/gridWidth;
            }
            else
            {
                _x = (point.x - (gridWidth + point.x%gridWidth))/gridWidth;
            }
            if(point.y >=0)
            {
                _y = (point.y - point.y%gridHeight)/gridHeight;
            }
            else
            {
                _y = (point.y - (gridHeight + point.y%gridHeight))/gridHeight;
            }
            if(gridFeatures[_x+"_"+_y+"_"+_z] ==undefined)
            {
                var points =[new SuperMap.Geometry.Point(_x*gridWidth,_y*gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth,_y*gridHeight+gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth+gridWidth,_y*gridHeight+gridHeight),
                        new SuperMap.Geometry.Point(_x*gridWidth+gridWidth,_y*gridHeight)
                    ],
                    linearRings = new SuperMap.Geometry.LinearRing(points),
                    region = new SuperMap.Geometry.Polygon([linearRings]);
                var feature = new SuperMap.Feature.Vector(region);
                feature.childArray = [];
                feature.childArray.push(features[i]);
                feature.max = parseFloat(features[i].attributes[this.dataField]);
                feature.min = parseFloat(features[i].attributes[this.dataField]);
                feature.gridID = _x+"_"+_y+"_"+_z;
                gridFeatures[_x+"_"+_y+"_"+_z] = feature;
                feas.push(feature);
            }
            else
            {
                var rect = gridFeatures[_x+"_"+_y+"_"+_z];
                rect.childArray.push(features[i]);
                var max = parseFloat(features[i].attributes[this.dataField]);
                var min =  parseFloat(features[i].attributes[this.dataField]);

                rect.max = max>rect.max?max:rect.max;
                rect.min = min<rect.min?min:rect.min;
            }
        }
        //添加风格
        for(var k = 0;k<feas.length;k++)
        {
            var fea = feas[k];
            var compareNum =  isMax? fea.max:fea.min;
            if(!fea.style)
            {
                fea.style = {
                    strokeColor: "#C69944",
                    strokeWidth: 1,
                    fillColor: "#B8E4B8",
                    fillOpacity: 0.5
                };
            }
            if(this.items)
            {
                for(var n = 0;n<this.items.length;n++)
                {
                    if((this.items[n].start !=undefined)  && (this.items[n].end != undefined) )
                    {
                        if((this.items[n].start <= compareNum) && (compareNum<=this.items[n].end))
                        {
                            fea.style =SuperMap.Util.cloneObject(this.items[n].style);

                        }
                    }
                }
            }

            if(this.isShowLabel)
            {
                if(this.definition <0)
                {
                    fea.style.label = compareNum.toString();
                }
                else
                {
                    var multiple = Math.pow(10,this.definition);
                    //这一步处理是为了防止js自身语法的缺陷
                    //var a =38.3*100;    3829.9999999999995
                    //var b =38.2*100;    3820.0000000000005
                    var ar = compareNum.toString().split('.');
                    if(ar.length === 2 && ar[1].length>this.definition)
                    {
                        compareNum = parseInt(compareNum*multiple)/multiple;
                    }
                    fea.style.label = compareNum.toString();
                }
            }
        }
        this.events.triggerEvent("calculateFeaturesEnd", this);
        return feas;
    },
    /**
     * Method: calculateMode
     * 计算格网的同时计算格网内部数据的众数。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateMode:function(features){},
    /**
     * Method: calculateMedian
     * 计算格网的同时计算格网内部数据的中位数。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateMedian:function(features){},
    /**
     * Method: calculateStandardDeviation
     * 计算格网的同时计算格网内部数据的标准差。
     *
     * Returns:
     * {Array} 需要绘制的feature数组。
     */
    calculateStandardDeviation:function(features){},
    CLASS_NAME: "SuperMap.Layer.HeatGridLayer"
});
/**
 * APIProperty: SuperMap.Layer.HeatGridLayer.LABELMODE_NUMBER
 * 静态常量，用于代表格网label显示的数字为当前格网包含的数据量的数量
 *
 * {Number} 0
 */
SuperMap.Layer.HeatGridLayer.LABELMODE_NUMBER = 0;
/**
 * APIProperty: SuperMap.Layer.HeatGridLayer.LABELMODE_MEAN
 * 静态常量，用于代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的平均值
 *
 * {Number} 1
 */
SuperMap.Layer.HeatGridLayer.LABELMODE_MEAN  = 1;
/**
 * APIProperty: SuperMap.Layer.HeatGridLayer.LABELMODE_MAX
 * 静态常量，用于代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的最大值
 *
 * {Number} 2
 */
SuperMap.Layer.HeatGridLayer.LABELMODE_MAX   = 2;
/**
 * APIProperty: SuperMap.Layer.HeatGridLayer.LABELMODE_MIN
 * 静态常量，用于代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的最小值
 *
 * {Number} 3
 */
SuperMap.Layer.HeatGridLayer.LABELMODE_MIN  = 3;
/**
 * APIProperty: SuperMap.Layer.HeatGridLayer.LABELMODE_SUM
 * 静态常量，用于代表格网label显示的数字为当前格网包含的数据中的数据（feature.attributes[dataField]上的数据）的总和
 *
 * {Number} 7
 */
SuperMap.Layer.HeatGridLayer.LABELMODE_SUM  = 7;