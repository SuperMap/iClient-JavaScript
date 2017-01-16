/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap.Feature.Theme.Graph.js
 */

/**
 * Class: SuperMap.Feature.Theme.RankSymbol
 * 符号专题要素基类，此类定义了符号专题要素基础模型，具体的图表模型通过继承此类，在子类中实现 assembleShapes 方法。
 *
 * 符号专题要素模型采用了可视化图形大小自适应策略，用较少的参数控制着图表诸多图形，图表配置对象 <SuperMap.Feature.Theme.RankSymbol::setting> 的基础属性只有 5 个，
 * 它们控制着图表结构、值域范围、数据小数位等基础图表形态。构成图表的图形必须在图表结构里自适应大小。
 *
 * 此类不可实例化，此类的可实例化子类必须实现 assembleShapes() 方法。
 *
 * Inherits:
 *  - <SuperMap.Feature.Theme.Graph>
 */
SuperMap.Feature.Theme.RankSymbol = SuperMap.Class(SuperMap.Feature.Theme.Graph, {
    /**
     * APIProperty: setting
     * {Object} 符号配置对象，该对象控制着图表的可视化显示。
     *
     * 下面是此配置对象的 5 个基础可设属性：
     *
     * Symbolizer properties:
     * codomain - {Array{Number}} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
     * XOffset - {Number}  专题要素（图表）在 X 方向上的偏移值，单位像素。
     * YOffset - {Number}  专题要素（图表）在 Y 方向上的偏移值，单位像素。
     * dataViewBoxParameter - {Array{Number}} 数据视图框 dataViewBox 参数，
     * 它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
     * decimalNumber - {Number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     *
     *
     * 除了以上 5 个基础属性，此对象的可设属性在不同子类中有较大差异，不同子类中对同一属性的解释也可能不同。
     * 请在此类的子类中查看 setting 对象的可设属性和属性含义。
     */
    setting: null,


    /**
     * Constructor: SuperMap.Feature.Theme.RankSymbol
     * 创建一个矢量专题要素。
     *
     * Parameters:
     * data - {<SuperMap.Feature.Vector>}  用户数据，必设参数。
     * layer - {<SuperMap.Layer.RankSymbol>} 此专题要素所在图层，必设参数。
     * fields - {Array{String}} data 中的参与此图表生成的字段名称，必设参数。
     * setting - {Object} 图表配置对象，必设参数。
     * lonlat - {<SuperMap.LonLat>} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
     *
     * Returns:
     * {<SuperMap.Feature.Theme.RankSymbol>} 返回一个统计专题要素。
     */
    initialize: function(data, layer, fields, setting, lonlat, options) {
        SuperMap.Feature.Theme.Graph.prototype.initialize.apply(this, arguments);

        // 图表位置
        if(lonlat){
            this.lonlat = lonlat;
        }
        else{
            // 默认使用 bounds 中心
            var geometry = data.geometry;
            var dataBounds = geometry.getBounds();
            this.lonlat = dataBounds.getCenterLonLat();
        }

        // 配置项检测与赋值
        if(setting && setting.codomain){
            this.setting = setting;
            this.DVBCodomain = this.setting.codomain;
        }

        this.fields = fields? fields: [];

        this.shapeFactory = new SuperMap.Feature.ShapeFactory();
    },

    /**
     * APIMethod: destroy
     * 销毁专题要素。
     */
    destroy: function() {
        this.setting = null;
        SuperMap.Feature.Theme.Graph.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: initBaseParameter
     * 初始化专题要素（图形）基础参数。
     * 在调用此方法前，此类的图表模型相关属性都是不可用的 ，此方法在 assembleShapes 函数中调用。
     *
     * 调用此函数关系到 setting 对象的以下属性
     *
     * Symbolizer properties:
     * codomain - {Array{Number}} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
     * XOffset - {Number}  专题要素（图形）在 X 方向上的偏移值，单位像素。
     * YOffset - {Number}  专题要素（图形）在 Y 方向上的偏移值，单位像素。
     * dataViewBoxParameter - {Array{Number}} 数据视图框 dataViewBox 参数，
     * 它是指图形框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
     * decimalNumber - {Number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     *
     * Returns:
     * {Boolean} 初始化参数是否成功。
     */
    initBaseParameter: function(){
        // 参数初始化是否成功
        var isSuccess = true;

        // setting 属性是否已成功赋值
        if(!this.setting) return false;
        var sets = this.setting;

        // 图表偏移
        if(sets.XOffset) {this.XOffset = sets.XOffset;}
        if(sets.YOffset) {this.YOffset = sets.YOffset;}
        this.XOffset = sets.XOffset? sets.XOffset: 0;
        this.YOffset = sets.YOffset? sets.YOffset: 0;

        // 其他默认值
        this.origonPoint = [];
        this.chartBox = [];
        this.dataViewBox = [];

        this.DVBParameter = sets.dataViewBoxParameter? sets.dataViewBoxParameter: [0, 0, 0, 0];

        this.DVBOrigonPoint = [];
        this.DVBCenterPoint = [];
        this.origonPointOffset = [];

        // 图表位置
        this.resetLocation();

        // 专题要素宽度 w
        var w = this.width;
        // 专题要素高度 h
        var h = this.height;
        // 专题要素像素位置 loc
        var loc = this.location;

        // 专题要素像素位置 loc
        this.origonPoint = [loc[0] - w/2, loc[1] - h/2];
        // 专题要素原点（左上角）
        var op = this.origonPoint;

        // 图表框（[left, bottom, right, top]）
        this.chartBox = [op[0], op[1] + h, op[0] + w, op[1]];
        // 图表框
        var cb = this.chartBox;

        // 数据视图框参数，它是图表框各方向对应的内偏距
        var dbbP = this.DVBParameter;
        // 数据视图框 （[left, bottom, right, top]）
        this.dataViewBox = [cb[0] + dbbP[0], cb[1] - dbbP[1], cb[2] - dbbP[2], cb[3] + dbbP[3]];
        // 数据视图框
        var dvb = this.dataViewBox;
        //检查数据视图框是否合法
        if(dvb[0] >= dvb[2] || dvb[1] <= dvb[3]){
            return false;
        }

        // 数据视图框原点
        this.DVBOrigonPoint = [dvb[0], dvb[3]];
        // 数据视图框宽度
        this.DVBWidth = Math.abs(dvb[2] - dvb[0]);
        // 数据视图框高度
        this.DVBHeight = Math.abs(dvb[1] - dvb[3]);
        // 数据视图框中心点
        this.DVBCenterPoint = [this.DVBOrigonPoint[0] + this.DVBWidth/2, this.DVBOrigonPoint[1] + this.DVBHeight/2];

        // 数据视图框原点与图表框的原点偏移量
        this.origonPointOffset = [this.DVBOrigonPoint[0] - op[0], this.DVBOrigonPoint[1] - op[1]];

        return isSuccess;
    },

    CLASS_NAME: "SuperMap.Feature.Theme.RankSymbol"
});
