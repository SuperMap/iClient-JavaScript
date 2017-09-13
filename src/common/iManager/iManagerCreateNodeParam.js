import SuperMap from '../SuperMap';

/**
 * @class SuperMap.iManagerCreateNodeParam
 * @classdesc iManager 创建节点参数。
 * @param params - {Object} iManager创建节点参数。
 *
 */
export default class IManagerCreateNodeParam {

    nodeSpec = 'SMALL';              //取值范围: ['SMALL','MEDIUM','LARGE'] 以及自定义的环境规格名称
    nodeCount = 1;                   //要创建vm的个数
    nodeName = '';                   //vm名称
    password = '';                   //vm的密码,空表示随机分配
    description = '';                //描述信息
    physicalMachineName = '';        //vm所属的物理机名称.
    ips = [];                        //vm的ip,空数组表示随机分配
    userName = '';                   //vm所属用户

    constructor(params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

}

SuperMap.iManagerCreateNodeParam = IManagerCreateNodeParam;

