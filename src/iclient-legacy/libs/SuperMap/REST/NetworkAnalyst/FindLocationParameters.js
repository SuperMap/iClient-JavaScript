/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.FindLocationParameters
 * 选址分区分析参数类。
 * 选址分区分析是为了确定一个或多个待建设施的最佳或最优位置，使得设施可以用一种最经济有效的方式为需求方提供服务或者商品。
 * 选址分区不仅仅是一个选址过程，还要将需求点的需求分配到相应的新建设施的服务区中，因此称之为选址与分区。
 *  分析过程中使用的需求点都为网络结点，即除了各种类型的中心点所对应的网络结点以外，
 * 所有网络结点都作为资源需求点参与选址分区分析，如果要排除某部分结点不分析，可以将其设置为障碍点。
 */
SuperMap.REST.FindLocationParameters = SuperMap.Class({

    /** 
     * APIProperty: expectedSupplyCenterCount
     * {Number} 期望用于最终设施选址的资源供给中心数量，必设字段。
     * 当输入值为0时，最终设施选址的资源供给中心数量默认为覆盖分析区域内的所需最少的供给中心数。
     */
    expectedSupplyCenterCount: null,
    
    /** 
     * APIProperty: isFromCenter
     * {Boolean} 是否从中心点开始分配资源。默认为 false。
     * 由于网路数据中的弧段具有正反阻力，即弧段的正向阻力值与其反向阻力值可能不同，
     * 因此，在进行分析时，从资源供给中心开始分配资源到需求点与从需求点向资源供给中心分配这两种分配形式下，所得的分析结果会不同。
     */ 
    isFromCenter: false,
    
//    /**
//     * APIProperty: nodeDemandField
//     * {String} 结点需求量字段，必设字段。
//     * 该字段是网络数据集中用于表示作为需求地的网络结点所需资源量的字段名称。
//     */
//    nodeDemandField: null,
    
    /** 
     * APIProperty: supplyCenters
     * {Array(<SuperMap.REST.SupplyCenter>)} 资源供给中心集合，必设字段。
     * 资源供给中心是提供资源和服务的设施，对应于网络结点，
     * 资源供给中心的相关信息包括资源量、最大阻力值、资源供给中心类型，资源供给中心在网络中所处结点的 ID 等，以便在进行选址分区分析时使用。
     */ 
    supplyCenters: null,
    
    /** 
     * APIProperty: turnWeightField
     * {String} 转向权值字段的名称。
     */ 
    turnWeightField: null,
    
    /** 
     * APIProperty: weightName
     * {String} 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，必设字段。
     */ 
    weightName: null,
 
    /**
     * Constructor: SuperMap.REST.FindLocationParameters
     * 服务区分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * expectedSupplyCenterCount - {Integer} 期望用于最终设施选址的资源供给中心数量，必设字段。 
     * isFromCenter - {Boolean} 是否从中心点开始分配资源。默认为 false。
     * supplyCenters - {Array(<SuperMap.REST.SupplyCenter>)} 资源供给中心集合，必设字段。
     * turnWeightField - {String} 转向权值字段的名称。
     * weightName - {String} 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，必设字段。
     */
    initialize: function(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() { 
        var me = this;
        me.expectedSupplyCenterCount = null;
        me.isFromCenter = null;
//        me.nodeDemandField = null;
        me.turnWeightField = null;
        me.weightName = null;
        if (me.supplyCenters) {
            for (var i=0, supplyCenters=me.supplyCenters, len=supplyCenters.length; i<len; i++) {
                supplyCenters[i].destroy();
            }
            me.supplyCenters = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindLocationParameters"
}); 