
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