var program = require('commander');
var shell = require("shelljs");
var allModules = require("./deps");

function getCoreModules() {
    var coreModules = [];
    for(var name in allModules){
        if(name.indexOf("Core") === 0){
            coreModules.push(name);
        }
    }
    return coreModules;
}

function getLeafletModules() {
    var leafletModules = [];
    for(var name in allModules){
        if(name.indexOf("Leaflet") === 0){
            leafletModules.push(name);
        }
    }
    return leafletModules;
}

function getOL3Modules() {
    var ol3Modules = [];
    for(var name in allModules){
        if(name.indexOf("OL3") === 0){
            ol3Modules.push(name);
        }
    }
    return ol3Modules;
}

program
    .description('Customized pack iClient9.')
    //.option('ol3, ol3 <cmd>', 'pack iClent9 for ol3', 'GK')

program
    .command('- <key> [modules]')
    .description('pack iClent9')
    .action(function(key, modules){
        if(!key || (key !== "leaflet" && key!== "core" && key !== "ol3")){
            console.log(key + "值输入有误，可选值为leaflet或ol3");
            return;
        }
        var modulePaths = "";
        var packModules = "";
        if(key === "core"){
            packModules = getCoreModules();
        }
        if(key === "ol3"){
            packModules = getOL3Modules();
        }
        if(key === "leaflet"){
            packModules = getLeafletModules();
        }
        if(!modules){
            packModules.map(function (module) {
                allModules[module].map(function (src) {
                    modulePaths += src + " ";
                })
            });
        }else{
            if(key == "ol3" && modules.indexOf("Leaflet") !== -1 || key == "leaflet" && modules.indexOf("OL3") !== -1){
                console.log("Leaflet模块和OL3模块须分开打包");
                return;
            }
            modules.split(",").map(function (module) {
                if(module in allModules){
                    allModules[module].map(function (src) {
                        modulePaths += src + " ";
                    })
                }
            });
        }
        shell.exec('npm run deploy ' + modulePaths);
    });

program.parse(process.argv);