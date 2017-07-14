var program = require('commander');
var shell = require("shelljs");
var deps = require("./deps");

program.description('Customized pack iClient9.');

program.command('- <key> [modules]')
    .description('pack iClent9')
    .action(function (key, modules) {
        if (!key || (key !== "leaflet" && key !== "common" && key !== "openlayers" && key !== "mapboxgl")) {
            console.log(key + "值输入有误，可选值为leaflet或openlayers");
            return;
        }

        var modulePaths = "";
        if (key === "common") {
            modulePaths = getCommonModulePaths();
            shell.exec('npm run deploy ' + modulePaths);
            return;
        }
        var clientModules;
        if (key === "leaflet") {
            clientModules = deps.leaflet;
        }
        if (key === "openlayers") {
            clientModules = deps.openlayers;
        }
        if (key === "mapboxgl") {
            clientModules = deps.mapboxgl;
        }
        if (!modules) {
            for (var clientModule in clientModules) {
                for (var module in clientModules[clientModule]) {
                    if (module === "title" || module === "description") {
                        continue;
                    }

                    clientModules[clientModule][module].src.map(function (src) {
                        modulePaths += src + " ";
                    })
                }
            }
            shell.exec('npm run deploy-' + key + ' ' + modulePaths);
            return;
        }
        if (modules.indexOf("common") !== -1) {
            modulePaths = getCommonModulePaths();
        }
        modules.split(',').map(function (packModule) {
            for (var clientModule in clientModules) {
                for (var module in clientModules[clientModule]) {
                    if (module === 'title' || module === 'description') {
                        continue;
                    } else {
                        clientModules[clientModule][module].src.map(function (src) {
                            if (module === packModule) {
                                modulePaths += src + " ";
                            }
                        })
                    }
                }
            }
        });
        shell.exec('npm run deploy-' + key + ' ' + modulePaths);
    });

program.parse(process.argv);

function getCommonModulePaths() {
    var modulePaths = "";
    for (var commonModule in deps.common) {
        deps.common[commonModule].map(function (module) {
            modulePaths += module + " ";
        })
    }
    return modulePaths;
}