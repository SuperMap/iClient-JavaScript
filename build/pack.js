var program = require('commander');
var shell = require("shelljs");
var deps = require("./deps");

program
    .description('Customized pack iClient9.')

program
    .command('- <key> [modules]')
    .description('pack iClent9')
    .action(function (key, modules) {
        if (!key || (key !== "leaflet" && key !== "core" && key !== "ol3")) {
            console.log(key + "值输入有误，可选值为leaflet或ol3");
            return;
        }

        var modulePaths = "";
        if (key === "core") {
            modulePaths = getCoreModulePaths();
            shell.exec('npm run deploy ' + modulePaths);
            return;
        }
        var clientModules;
        if (key === "leaflet") {
            clientModules = deps.Leaflet;
        }
        if (key === "ol3") {
            clientModules = deps.OL3;
        }
        if (!modules) {
            for (var clientModule in clientModules) {
                for (var module in clientModules[clientModule]) {
                    if (module === "title" || module === "description") {
                        continue;
                    } else {
                        clientModules[clientModule][module].src.map(function (src) {
                            modulePaths += src + " ";
                        })
                    }
                }
            }
            shell.exec('npm run deploy-'+key+' '    + modulePaths);
            return;
        }
        if (modules.indexOf("Core") !== -1) {
            modulePaths = getCoreModulePaths();
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
        shell.exec('npm run deploy ' + modulePaths);
    });

program.parse(process.argv);

function getCoreModulePaths() {
    var modulePaths = "";
    for (var coreModule in deps.Core) {
        deps.Core[coreModule].map(function (module) {
            modulePaths += module + " ";
        })
    }
    return modulePaths;
}