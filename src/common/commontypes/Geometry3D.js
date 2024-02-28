/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from './Util';
import {ServerGeometry} from '../iServer/ServerGeometry';

/**
 * @class Geometry3D
 * @deprecatedclass SuperMap.Geometry3D
 * @category BaseTypes Geometry3D
 * @classdesc 所有三维几何类的基类。
 * @usage
 */
export class Geometry3D extends ServerGeometry{

    constructor(options) {
        super(options);

        this.CLASS_NAME = "SuperMap.Geometry3D";
        /**
         * @member {GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>} Geometry3D.prototype.position 
         * @description  三维几何对象的位置。
         *
         */
        this.position = null;

        /**
         * @member {number} Geometry3D.prototype.rotationX 
         * @description 三维几何对象沿 X 轴方向的旋转角度，单位为度。
         */
        this.rotationX = null;

        /**
         * @member {number} Geometry3D.prototype.rotationY
         * @description 三维几何对象沿 Y 轴方向的旋转角度，单位为度。
         */
        this.rotationY = null;

        /**
         * @member {number} Geometry3D.prototype.rotationZ
         * @description 三维几何对象沿 Z 轴方向的旋转角度，单位为度。
         */
        this.rotationZ = null;

        /**
         * @member {number} Geometry3D.prototype.scaleX 
         * @description 三维几何对象沿 X 轴方向的缩放比例。
         */
        this.scaleX = null;

        /**
         * @member {number} Geometry3D.prototype.scaleY
         * @description 三维几何对象沿 Y 轴方向的缩放比例。
         */
        this.scaleY = null;

        /**
         * @member {number} Geometry3D.prototype.scaleZ
         * @description 三维几何对象沿 Z 轴方向的缩放比例。
         */
        this.scaleZ = null;

        Util.extend(this, options);
    }


    /**
     * @function Geometry3D.prototype.destroy
     * @description 释放资源。
     */
    destroy() {
        this.position = null;
        this.rotationX = null;
        this.rotationY = null;
        this.rotationZ = null;
        this.scaleX = null;
        this.scaleY = null;
        this.scaleZ = null;
    }
}
