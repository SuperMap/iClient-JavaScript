/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import * as maplibregl from 'maplibre-gl';
import { createMapExtendExtending } from '@supermapgis/iclient-common/util/MapExtend';

/**
  * @function MapExtend
  * @description 扩展 maplibregl.Map。
  * maplibre-gl v6 为纯 ESM，命名空间成员只读，不能再整体替换 Map，
  * 因此将扩展类的原型方法直接拷贝到真实 Map.prototype 上。
  * @private
  */
export var MapExtend = (function () {
  const mapProto = maplibregl.Map.prototype;

  if (!mapProto._inherit) {
    const MapExtendBase = createMapExtendExtending(maplibregl);
    Object.getOwnPropertyNames(MapExtendBase.prototype).forEach(name => {
      if (name === 'constructor') {
        return;
      }
      Object.defineProperty(mapProto, name, Object.getOwnPropertyDescriptor(MapExtendBase.prototype, name));
    });
    // 扩展类原本在构造函数中初始化 overlayLayersManager，这里改为实例上的惰性初始化
    Object.defineProperty(mapProto, 'overlayLayersManager', {
      configurable: true,
      enumerable: false,
      get() {
        const overlayLayersManager = {};
        Object.defineProperty(this, 'overlayLayersManager', {
          value: overlayLayersManager,
          writable: true,
          configurable: true,
          enumerable: true
        });
        return overlayLayersManager;
      }
    });
    mapProto._inherit = true;
  }
})();
