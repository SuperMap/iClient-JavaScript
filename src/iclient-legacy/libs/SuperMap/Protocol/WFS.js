/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Protocol.js
 */

/**
 * Class: SuperMap.Protocol.WFS
 * 用来创建带版本号的WFS协议。默认版本是1.0.0，现支持1.0.0和1.1.0。
 *
 * Returns:
 * {<SuperMap.Protocol>} 给定版本的WFS协议。
 *
 * Example:
 * (code)
 *      //1.0.0的例子
 *     var protocol = new SuperMap.Protocol.WFS({
 *         version: "1.0.0",
 *         url:  "http://localhost:8090/iserver/services/data-world/wfs100",
 *         featureType: "Capitals",
 *         featureNS: "http://www.supermap.com/World",
 *         featurePrefix:"World",
 *         geometryName: "the_geom"
 *     });
 * (end)
 * (code)
 *      //1.1.0的例子
 *      vectorLayer = new SuperMap.Layer.Vector("China Countries", {
 *              strategies: [new SuperMap.Strategy.BBOX()],
 *              visibility:true,
 *              protocol: new SuperMap.Protocol.WFS({
 *                  version: "1.1.0",
 *                  srsName: "EPSG:4326",
 *                  //这里的服务是本地电脑发出的arcgis的wfs1.1.0服务
 *                  url: "http://192.168.18.118:6080/arcgis/services/China/MapServer/WFSServer",
 *                  featureType: "Countries",
 *                  featurePrefix: "China",
 *                  maxFeatures: "10",
 *                  schema: null,
 *                  geometryName: "Shape"
 *              }),
 *              projection: new SuperMap.Projection("EPSG:4326")
 *      });
 *
 * (end)
 *
 * 从特定WFS版本的协议查看详情。
 */
SuperMap.Protocol.WFS = function(options) {
    options = SuperMap.Util.applyDefaults(
        options, SuperMap.Protocol.WFS.DEFAULTS
    );
    var cls = SuperMap.Protocol.WFS["v"+options.version.replace(/\./g, "_")];
    if(!cls) {
        throw "Unsupported WFS version: " + options.version;
    }
    return new cls(options);
};

/**
 * Function: fromWMSLayer
 * Convenience function to create a WFS protocol from a WMS layer.  This makes
 *     the assumption that a WFS requests can be issued at the same URL as
 *     WMS requests and that a WFS featureType exists with the same name as the
 *     WMS layer.
 *
 * This function is designed to auto-configure <url>, <featureType>,
 *     <featurePrefix> and <srsName> for WFS <version> 1.1.0. Note that
 *     srsName matching with the WMS layer will not work with WFS 1.0.0.
 *
 * Parameters:
 * layer - {<SuperMap.Layer.WMS>} WMS layer that has a matching WFS
 *     FeatureType at the same server url with the same typename.
 * options - {Object} Default properties to be set on the protocol.
 *
 * Returns:
 * {<SuperMap.Protocol.WFS>}
 */
SuperMap.Protocol.WFS.fromWMSLayer = function(layer, options) {
    var typeName, featurePrefix;
    var param = layer.params["LAYERS"];
    var parts = (SuperMap.Util.isArray(param) ? param[0] : param).split(":");
    if(parts.length > 1) {
        featurePrefix = parts[0];
    }
    typeName = parts.pop();
    var protocolOptions = {
        url: layer.url,
        featureType: typeName,
        featurePrefix: featurePrefix,
        srsName: layer.projection && layer.projection.getCode() ||
                 layer.map && layer.map.getProjectionObject().getCode(),
        version: "1.1.0"
    };
    return new SuperMap.Protocol.WFS(SuperMap.Util.applyDefaults(
        options, protocolOptions
    ));
};

/**
 * Constant: SuperMap.Protocol.WFS.DEFAULTS
 */
SuperMap.Protocol.WFS.DEFAULTS = {
    "version": "1.0.0"
};
