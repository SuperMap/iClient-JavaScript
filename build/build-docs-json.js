const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs-json');
const projectRoot = path.resolve(__dirname, '..');

const platforms = ['mapboxgl', 'leaflet', 'openlayers', 'maplibregl', 'classic'];

const jsdocScript = path.join(__dirname, '..', 'node_modules', 'jsdoc', 'jsdoc.js');
const jsdocCompat = path.join(__dirname, 'jsdoc-node-compat.cjs');

if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

function buildJson(platform) {
    console.log(`\n📦 Building ${platform} JSON...`);
    
    const docsJsonPath = path.join(__dirname, 'jsdocs', platform, 'docs.json');
    const indexMdPath = path.join(__dirname, 'jsdocs', platform, 'index.md');
    const outputDir = path.join(docsDir, `iclient-${platform}`);
    
    if (!fs.existsSync(docsJsonPath)) {
        console.log(`⚠ ${platform} docs.json not found, skipping`);
        return false;
    }
    
    let docsJson;
    try {
        docsJson = JSON.parse(fs.readFileSync(docsJsonPath, 'utf8'));
    } catch (e) {
        console.log(`✗ Failed to parse docs.json: ${e.message}`);
        return false;
    }
    
    const excludePatterns = (docsJson.source?.exclude || []).map(p => 
        new RegExp(p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*'))
    );
    
    console.log(`📋 Exclude patterns: ${excludePatterns.length}`);
    
    const tmpJsonPath = path.join(docsDir, `${platform}-tmp.json`);
    
    console.log(`Running JSDoc for ${platform}...`);
    
    try {
        const output = execFileSync(process.execPath, [
            '--require', jsdocCompat, jsdocScript,
            '-c', docsJsonPath, '-R', indexMdPath, '-X'
        ], { cwd: projectRoot, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
        fs.writeFileSync(tmpJsonPath, output);
    } catch (e) {
        if (fs.existsSync(tmpJsonPath)) {
            fs.unlinkSync(tmpJsonPath);
        }
        console.log(`✗ Failed to build ${platform}: ${e.message}`);
        return false;
    }
    
    if (!fs.existsSync(tmpJsonPath)) {
        console.log(`✗ ${platform}: JSON output not found`);
        return false;
    }
    
    let data;
    try {
        data = JSON.parse(fs.readFileSync(tmpJsonPath, 'utf8'));
    } catch (e) {
        console.log(`✗ Failed to parse JSON: ${e.message}`);
        return false;
    }
    
    fs.unlinkSync(tmpJsonPath);
    
    if (excludePatterns.length > 0) {
        const originalCount = data.length;
        data = data.filter(doclet => {
            const filePath = doclet.meta?.path || '';
            const fileName = doclet.meta?.filename || '';
            const fullPath = path.join(filePath, fileName).replace(/^[A-Z]:\\/, '').replace(/\\/g, '/');
            return !excludePatterns.some(regex => regex.test(fullPath));
        });
        const filteredCount = originalCount - data.length;
        console.log(`🚫 Filtered out ${filteredCount} items (${originalCount} → ${data.length})`);
    }
    
    const byModule = {};
    
    let docsJsonConf;
    try {
        docsJsonConf = JSON.parse(fs.readFileSync(docsJsonPath, 'utf8'));
    } catch (e) {}
    const globalParams = docsJsonConf?.templates || {};
    const cdn = globalParams.cdn || '';
    const npm = globalParams.npm || '';
    const defaultNamespace = globalParams.namespace || '';
    
    data.forEach(doclet => {
        const filePath = doclet.meta?.path || '';
        const fileName = doclet.meta?.filename || '';
        const key = path.join(filePath, fileName).replace(/^[A-Z]:\\/, '').replace(/\\/g, '/');
        
        if (!key) {return;}
        
        if (doclet.usage && doclet.kind === 'class') {
            const usage = doclet.usage;
            const className = usage.className || doclet.name || '';
            const aliasClass = usage.aliasClass || '';
            const browserNs = usage.browserNamespace || defaultNamespace;
            const finalClassName = aliasClass || className;
            
            const paramsNames = (doclet.params || []).map(p => p.name);
            const paramsStr = paramsNames.join(', ');
            
            let deprecatedCode = '';
            if (usage.deprecatedClasses?.length > 0) {
                deprecatedCode = '\n  // 弃用的写法\n' + usage.deprecatedClasses.map(d => `  new ${d}(${paramsStr});`).join('\n');
            }
            if (usage.deprecatedClassInstance) {
                deprecatedCode += `\n  ${usage.deprecatedClassInstance}(${paramsStr});`;
            }
            
            const browserCode = `<script type='text/javascript' src="${cdn}"></script>\n<script>\n  new ${browserNs}.${finalClassName}(${paramsStr});${deprecatedCode}\n</script>`;
            
            const es6Code = `import { ${className} } from '${npm}';\n\nnew ${className}(${paramsStr});`;
            
            doclet.usageCodeBrowser = browserCode;
            doclet.usageCodeES6 = es6Code;
        }
        
        if (!byModule[key]) {
            byModule[key] = [];
        }
        byModule[key].push(doclet);
    });
    
    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(outputDir, { recursive: true });
    
    let count = 0;
    const allDocs = [];
    
    Object.keys(byModule).forEach(fileKey => {
        const fileDocs = byModule[fileKey];
        
        let baseName = fileKey.replace(/\.js$/, '').replace(/.*\//, '');
        if (!baseName || baseName === '-' || baseName.startsWith('-')) {return;}
        
        baseName = baseName.replace(/[^a-zA-Z0-9_]/g, '-');
        if (!baseName || baseName === '-') {return;}
        
        const fileName = baseName + '.json';
        
        const outputPath = path.join(outputDir, fileName);
        fs.writeFileSync(outputPath, JSON.stringify(fileDocs, null, 2));
        allDocs.push(...fileDocs);
        count++;
    });
    
    console.log(`✓ ${count} JSON files in iclient-${platform}/`);
    return true;
}

function buildAllDocs() {
    platforms.forEach(platform => buildJson(platform));
}

if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
        const platform = args[0];
        if (platform === 'all') {
            buildAllDocs();
        } else if (platforms.includes(platform)) {
            const built = buildJson(platform);
            if (!built) {throw new Error(`Failed to generate ${platform} JSON docs.`);}
        } else {
            throw new Error(`Unknown platform: ${platform}. Available: ${platforms.join(', ')}`);
        }
    } else {
        buildAllDocs();
    }
}

module.exports = { buildJson };
