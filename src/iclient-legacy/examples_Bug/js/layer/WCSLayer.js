/**
 * Class: SuperMap.Layer.WCSLayer
 * WCS图层类。
 *     显示WCS图层。
 *
 * Inherits from:
 *  - <SuperMap.CanvasLayer>
 */

SuperMap.Layer.WCSLayer = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * Property: siteUrl
     * {String} WCS服务地址。
     */
    siteUrl: "",

    /**
     * Property: service
     * {String} 服务类型，请求 WCS 服务，请求类型需要设为“WCS”。
     */
    service: "WCS",

    /**
     * Property: request
     * {String} 请求名称，请求 GetCoverage 操作，请求名称需要设为“GetCoverage”。
     */
    request: "getcoverage",

    /**
     * Property: version
     * {String} 请求的WCS服务的版本。
     */
    version: "1.1.1",

    /**
     * Property: identifier
     * {String} 指定所要请求的Coverage的唯一标识。
     */
    identifier: "0",

    /**
     * Property: format
     * {String} 返回数据的格式，必选。
     */
    format: "image/png",

    /**
     * Property: boundingbox
     * {String} 定义所要请求Coverage的空间范围。
     */
    boundingbox: "-180,-90,180,90",

    /**
     * Property: url
     * {String} 图层的服务地址。
     */
    url: "${siteUrl}?SERVICE=${service}&REQUEST=${request}&Version=${version}&Identifier=${identifier}&BoundingBox=${boundingbox},urn:ogc:def:crs:EPSG::4326&Format=${format}&token=${token}",

    /**
    * Constructor: SuperMap.Layer.WCSLayer
    * WCS服务图层类。
    *
    * Parameters:
    * options - {Object}  附加到图层属性上的可选项。
    */
    initialize: function (name, siteUrl, options) {
        var me = this;
        me.name = name || "";
        me.siteUrl = siteUrl || "";
        SuperMap.CanvasLayer.prototype.initialize.apply(me, [me.name, me.url, null, options]);
    },

    /**
     * APIMethod: destroy
     * 解构WCSLayer类，释放资源。
     */
    destroy: function () {
        var me = this;
        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
        me.name = null;
        me.url = null;
    },

    /**
    * APIMethod: clone
    * 创建当前图层的副本。
    *
    * Parameters:
    * obj - {Object}
    *
    * Returns:
    * {<SuperMap.Layer.WCSLayer>}
    */
    clone: function (obj) {
        var me = this;
        if (obj == null) {
            obj = new SuperMap.Layer.WCSLayer(me.name, me.url, me.getOptions());
        }
        obj = SuperMap.CanvasLayer.prototype.clone.apply(me, [obj]);
        return obj;
    },

    /**
    * Method: getTileUrl
    * 获取瓦片的URL。
    *
    * Parameters:
    * xyz - {Object}  一组键值对，表示瓦片X, Y, Z方向上的索引。
    * bounds - {<SuperMap.Bounds>}  瓦片的bounds，这里只用到了bounds。
    *
    * Returns
    * {String} 瓦片的 URL。
    */
    getTileUrl: function (xyz,bounds) {
        var me = this;
        //同步isever6.1 SP3的功能修改，bbox顺序调整
        var boundStr= bounds.bottom + "," + bounds.left  + "," + bounds.top + "," + bounds.right;

        //格式化url输出
        var url = SuperMap.String.format(me.url, {
            siteUrl: me.siteUrl,
            service: me.service,
            version: me.version,
            identifier: me.identifier,
            request: me.request,
            format: me.format,
            boundingbox: boundStr,
            token: SuperMap.Credential.CREDENTIAL ? SuperMap.Credential.CREDENTIAL.getValue() : ""
        });

        return url;
    },

    /**
     * Method: drawCanvasTile2
     * 将image显示到canvas上。
     *
     * Parameters:
     * image - {<Image>} 要绘制的图块对象
     * positionX - {Number} tile在canvas中的x坐标
     * positionY - {Number} tile在canvas中的y坐标
     * clear - {boolean} 是否需要重新清除。
     */

    drawCanvasTile2: function(image, positionX, positionY, clear){
        clear = clear || true;
        if (image) {
            var w = image.width,
                h = image.height;
            clear && this.canvasContext.clearRect(positionX, positionY, this.tileSize.x, this.tileSize.y);
            this.canvasContext.globalAlpha = image.firstInView ? 0.6 : 1;
            if (w > h) {
                this.canvasContext.drawImage(image, positionX, positionY, 256, 256 * h / w);
            } else {
                this.canvasContext.drawImage(image, positionX, positionY, 256 * w / h, 256);
            }
        }
    },


    /**
     * Method: getURL
     * 根据瓦片的bounds获取URL。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {String} 瓦片的URL。
     */
    getURL: function (bounds) {
        var me = this,
            xyz;
        bounds = me.adjustBounds(bounds);
        xyz = me.getXYZ(bounds);
        return me.getTileUrl(xyz,bounds);
    },

    CLASS_NAME: "SuperMap.Layer.WCSLayer"
});