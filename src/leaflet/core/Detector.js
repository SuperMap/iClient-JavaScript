/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

export class Detector {
    static supportWebGL() {
        return getContext('webgl');
    }

    static supportWebGL2() {
        return getContext('webgl2');
    }

    static supportCanvas() {
        return getContext('2d');
    }


}

function getContext(context) {
    var canvas = document.createElement('canvas');
    return canvas && canvas.getContext(context);
}