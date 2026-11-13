const { execFileSync } = require('child_process');
const path = require('path');

const platforms = ['mapboxgl', 'leaflet', 'openlayers', 'maplibregl', 'classic'];
const args = process.argv.slice(2);

if (args.length !== 1) {
    throw new Error(`Usage: node build/build-skills.js <platform|all>. Available: ${platforms.join(', ')}, all`);
}

const target = args[0];
if (target !== 'all' && !platforms.includes(target)) {
    throw new Error(`Unknown platform: ${target}. Available: ${platforms.join(', ')}, all`);
}

const docsScript = path.join(__dirname, 'build-docs-json.js');
const indexScript = path.join(__dirname, 'build-skills-sqlite.mjs');
const targets = target === 'all' ? platforms : [target];

for (const platform of targets) {
    execFileSync(process.execPath, [docsScript, platform], { stdio: 'inherit' });
    execFileSync(process.execPath, [indexScript, platform], { stdio: 'inherit' });
}
