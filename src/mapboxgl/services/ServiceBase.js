import mapboxgl from 'mapbox-gl';
import '../core/Base';

/**
 * @class mapboxgl.supermap.ServiceBase
 * @category  iServer
 * @description mapboxgl.supermap服务基类
 * @param {string} url - 与客户端交互的服务地址。</br>
 * @param {Object} options - 可选参数。</br>
 * @param {string} options.proxy - 服务代理地址</br>
 * @param {SuperMap.ServerType} options.serverType - 服务来源 iServer|iPortal|online </br>
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 */
export class ServiceBase extends mapboxgl.Evented {

    constructor(url, options) {
        super();
        this.options = options || {};
        this.url = url;
        this.fire('initialized', this);
    }
}

mapboxgl.supermap.ServiceBase = ServiceBase;