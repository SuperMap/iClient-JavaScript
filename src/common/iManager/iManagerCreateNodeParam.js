import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iManagerCreateNodeParam
 * @classdesc iManager 创建节点参数。
 * @category iManager
 * @param params - {Object} iManager创建节点参数。
 *
 */
export class IManagerCreateNodeParam {

    constructor(params) {
        params = params || {};
        this.nodeSpec = 'SMALL';              //取值范围: ['SMALL','MEDIUM','LARGE'] 以及自定义的环境规格名称
        this.nodeCount = 1;                   //要创建vm的个数
        this.nodeName = '';                   //vm名称
        this.password = '';                   //vm的密码,空表示随机分配
        this.description = '';                //描述信息
        this.physicalMachineName = '';        //vm所属的物理机名称.
        this.ips = [];                        //vm的ip,空数组表示随机分配
        this.userName = '';                   //vm所属用户
        Util.extend(this, params);
    }

}

SuperMap.iManagerCreateNodeParam = IManagerCreateNodeParam;

