const path = require('path');
const fse = require('fs-extra')

const key = process.argv[2] ? process.argv[2].replace("--", "") : "leaflet";
const sourceDir = path.join(__dirname, "../dist/" + key);
const destDir = path.join(__dirname, "../src/" + key + "/dist");

fse.removeSync(destDir);
fse.copySync(sourceDir, destDir, {
    filter: (src) => {
        return !(src.indexOf("include-") >= 0 || src.indexOf("resources") >= 0)
    }
});
if (key === 'mapboxgl') {
    // 拷贝resources文件夹到src/mapboxgl
    const source = path.join(__dirname, "../dist/resources");
    const target = path.join(__dirname, "../src/mapboxgl/resources");
    fse.removeSync(target);
    fse.copySync(source, target);
}
