/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Credential
 * SuperMap的安全证书类，其中包括token等安全验证信息。
 *
 * 需要使用用户名和密码在："http://localhost:8090/iserver/services/security/tokens"下申请value
 *
 * 获得形如："2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ.."的value
 *
 * 目前支持的功能包括：地图服务、专题图、量算、查询、公交换乘、空间分析、网络分析，不支持轮询功能。
 */
SuperMap.Credential = SuperMap.Class({
    /**
     * APIProperty: value
     * {String} 访问受安全限制的服务时用于通过安全认证的验证信息。
     */
    value: "",

    /**
     * APIProperty: name
     * {String} 验证信息前缀，name=value部分的name部分，默认为“token”。
     */
    name: "token",

    /**
     * Constructor: SuperMap.Credential
     * SuperMap地图服务安全验证类。
     *
     * 例如:
     * (start code)
     * var pixcel = new SuperMap.Credential("valueString","token");
     * pixcel.destroy();
     * (end)
     *
     * Parameters:
     * value - {String}  访问受安全限制的服务时用于通过安全认证的验证信息。
     * name - {String}  验证信息前缀，name=value部分的name部分，默认为“token”。
     */
    initialize: function (value, name) {
        this.value = value?value:this.value;
        this.name = name?name:this.name;
    },

    /**
     * Property: getUrlParameters
     *
     * 例如:
     * (start code)
     * var credential = new SuperMap.Credential("valueString","token");
     * //这里 str = "token=valueString";
     * var str = credential.getUrlParameters();
     * (end)
     *
     * Returns:
     * {String} 返回安全信息组成的url片段。
     */
    getUrlParameters: function () {
        //当需要其他安全信息的时候，则需要return this.name + "=" + this.value + "&" + "...";的形式添加。
        return this.name + "=" + this.value;
    },


    /**
     * APIProperty: getValue
     * 获取value
     *
     * 例如:
     * (start code)
     * var credential = new SuperMap.Credential("2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..","token");
     * //这里 str = "2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..";
     * var str = credential.getValue();
     * (end)
     *
     * Returns:
     * {String} 返回value字符串，在iServer服务下该value值即为token值。
     */
    getValue: function () {
        return this.value;
    },
    /**
     *
     * APIMethod: destroy
     * 销毁此对象。
     * 销毁后此对象的所有属性为null，而不是初始值。
     *
     * 例如:
     * (start code)
     * var credential = new SuperMap.Credential("valueString","token");
     * credential.destroy();
     * (end)
     *
     */
    destroy: function() {
        this.value = null;
        this.name = null;
    },

    CLASS_NAME: "SuperMap.Credential"
});

/**
 * Constant: CREDENTIAL
 * {<SuperMap.Credential>} 这个对象保存一个安全类的实例，在服务端需要安全验证的时候必须进行
 * 设置。
 *
 * 代码实例:
 * (code)
 *  // 当iServer启用服务安全的时候，下边的代码是必须的。安全证书类能够接收一个value和一个name参数。
 *  var value = "(以iServer为例，这里是申请的token值)";
 *  var name = "token";
 *  // 默认name参数为token，所以当使用iServer服务的时候可以不进行设置。
 *  SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(value, name);
 * (end)
 *
 */
SuperMap.Credential.CREDENTIAL = null;