/*global env: true */
var template = require('jsdoc/template'),
  env = require('jsdoc/env'),
  fs = require('jsdoc/fs'),
  path = require('jsdoc/path'),
  taffy = require('taffydb').taffy,
  handle = require('jsdoc/util/error').handle,
  helper = require('jsdoc/util/templateHelper'),
  logger = require('jsdoc/util/logger'),
  typeLinks = require('./typeLinkExt').typeLinks,
  _ = require('underscore'),
  htmlsafe = helper.htmlsafe,
  linkto = helper.linkto,
  registerLink = helper.registerLink,
  resolveAuthorLinks = helper.resolveAuthorLinks,
  scopeToPunc = helper.scopeToPunc,
  hasOwnProp = Object.prototype.hasOwnProperty,
  data,
  view,
  language,
  outdir = env.opts.destination;
var util = require('util');

function find(spec) {
  return helper.find(data, spec);
}

function tutoriallink(tutorial) {
  return helper.toTutorial(tutorial, null, {
    tag: 'em',
    classname: 'disabled',
    prefix: 'Tutorial: '
  });
}

function getAncestorLinks(doclet) {
  return helper.getAncestorLinks(data, doclet);
}

function hashToLink(doclet, hash) {
  if (!/^(#.+)/.test(hash)) {
    return hash;
  }

  var url = helper.createLink(doclet);

  url = url.replace(/(#.+|$)/, hash);
  return '<a href="' + url + '">' + hash + '</a>';
}

function needsSignature(doclet) {
  var needsSig = false;

  // function and class definitions always get a signature
  if (doclet.kind === 'function' || doclet.kind === 'class') {
    needsSig = true;
  }
  // typedefs that contain functions get a signature, too
  else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names && doclet.type.names.length) {
    for (var i = 0, l = doclet.type.names.length; i < l; i++) {
      if (doclet.type.names[i].toLowerCase() === 'function') {
        needsSig = true;
        break;
      }
    }
  }

  return needsSig;
}

function addSignatureParams(f) {
  var params = helper.getSignatureParams(f, 'optional');

  f.signature = (f.signature || '') + '(' + params.join(', ') + ')';
  if (f.usage) {
    f.usage.paramsNames = params;
  }
}

function addSignatureReturns(f) {
  var returnTypes = helper.getSignatureReturns(f);

  f.signature = '<span class="signature">' + (f.signature || '') + '</span>';

  if (returnTypes.length) {
    f.signature +=
      '<span class="glyphicon glyphicon-circle-arrow-right"></span><span class="type-signature returnType">' +
      (returnTypes.length ? '{' + returnTypes.join('|') + '}' : '') +
      '</span>';
  }
}

function addSignatureTypes(f) {
  var types = helper.getSignatureTypes(f);

  f.signature =
    (f.signature || '') + '<span class="type-signature">' + (types.length ? ' :' + types.join('|') : '') + ' </span>';
}

function shortenPaths(files, commonPrefix) {
  // always use forward slashes
  var regexp = new RegExp('\\\\', 'g');

  Object.keys(files).forEach(function (file) {
    files[file].shortened = files[file].resolved.replace(commonPrefix, '').replace(regexp, '/');
  });

  return files;
}

function resolveSourcePath(filepath) {
  return path.resolve(process.cwd(), filepath);
}

function getPathFromDoclet(doclet) {
  if (!doclet.meta) {
    return;
  }

  var filepath =
    doclet.meta.path && doclet.meta.path !== 'null'
      ? doclet.meta.path + '/' + doclet.meta.filename.split(/[\/\\]/).pop()
      : doclet.meta.filename;

  return filepath;
}

function generateNav(navObject) {
  // var docData = {
  //     filename: "",
  //     title: title,
  //     docs: docs,
  //     packageInfo: ( find({kind: 'package'}) || [] ) [0]
  // };
  var docData = {
    filename: 'nav.html',
    title: '',
    categories: navObject
  };
  var outpath = path.join(outdir, 'nav.html'),
    html = view.partial('navigation.tmpl', docData);

  html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

  fs.writeFileSync(outpath, html, 'utf8');
}

function generate(title, docs, filename, resolveLinks) {
  resolveLinks = resolveLinks === false ? false : true;

  var docData = {
    filename: filename,
    title: title,
    docs: docs,
    packageInfo: (find({
      kind: 'package'
    }) || [])[0]
  };

  var outpath = path.join(outdir, filename),
    html = view.render('container.tmpl', docData);

  if (resolveLinks) {
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
  }

  fs.writeFileSync(outpath, html, 'utf8');
}

function getCustomTagValue(item, title) {
  var tags = item.tags;
  if (!tags || !tags.length) {
    return null;
  }
  for (var i = tags.length - 1; i >= 0; i--) {
    if (tags[i].title === title) {
      return tags[i].value;
    }
  }
  return null;
}

function generateSourceFiles(sourceFiles) {
  Object.keys(sourceFiles).forEach(function (file) {
    var source;
    // links are keyed to the shortened path in each doclet's `meta.filename` property
    var sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);
    helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

    try {
      source = {
        kind: 'source',
        code: helper.htmlsafe(fs.readFileSync(sourceFiles[file].resolved, 'utf8'))
      };
    } catch (e) {
      handle(e);
    }

    generate('Source: ' + sourceFiles[file].shortened, [source], sourceOutfile, false);
  });
}

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
  var symbols = {};

  // build a lookup table
  doclets.forEach(function (symbol) {
    symbols[symbol.longname] = symbol;
  });

  return modules.map(function (module) {
    if (symbols[module.longname]) {
      module.module = symbols[module.longname];
      module.module.name = module.module.name.replace('module:', 'require("') + '")';
    }
  });
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members, view, templatePath) {
  var sorted = sortNav(members);
  view.categories = buildCategories(sorted, templatePath);
  view.navMap = buildNavMap(sorted,view.linkto);
  var methods = {};
  for (const key in view.navMap ) {
    if (Object.hasOwnProperty.call(view.navMap , key)) {
      const element = view.navMap[key];
      const m = element.methods.map(e => {
        return e.name;
      });
      if(!element.fileName && m.length>0){
        console.log("没有文件名的类：", element.longname,element.type,m)
      }
      if(methods[element.fileName]){
        console.log("重复的文件名：", element.longname,element.fileName,element.type,m)
      }else{
        methods[element.fileName] = m;
      }
      
    }
  }
  var methodsPath = path.join(outdir, 'methods.json');
  fs.writeFileSync(methodsPath, JSON.stringify(methods), 'utf8');
}

function sortNav(members) {
  var merged = members.namespaces.concat(members.classes, members.globals);
  merged.sort(function (a, b) {
    return a.longname.toLowerCase() > b.longname.toLowerCase();
  });
  return merged;
}

function buildCategories(members, templatePath) {
  var categories = {};
  _.each(members, function (v) {
    var category = getCustomTagValue(v, 'category');
    if (!category) {
      category = 'BaseTypes';
    }
    var arr = category.split(' ');
    var aa = categories;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (!aa[element]) {
        aa[element] = {};
        aa[element].default = [];
      }
      aa = aa[element];
    }
    aa.default.push(v.longname);
  });
  var outpath = path.resolve(templatePath, 'categories.json');
  fs.writeFileSync(outpath, JSON.stringify(categories), 'utf8');
  return categories;
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNavMap(members,linkto) {
  this.navMap = {};
  _.each(members, function (v) {
    var nav;
    if (v.kind == 'namespace') {
      nav = {
        fileName:`${linkto(v.meta.filename)}#${v.name}`,
        type: 'namespace',
        longname: v.longname,
        version: v.version,
        name: v.name,
        members: find({
          kind: 'member',
          memberof: v.longname
        }),
        methods: find({
          kind: 'function',
          memberof: v.longname
        }),
        typedefs: find({
          kind: 'typedef',
          memberof: v.longname
        }),
        events: find({
          kind: 'event',
          memberof: v.longname
        })
      };
    } else if (v.kind == 'class') {
      nav = {
        fileName:`${linkto(v.meta.filename)}#${v.name}`,
        type: 'class',
        longname: v.longname,
        name: v.name,
        version: v.version,
        members: find({
          kind: 'member',
          memberof: v.longname
        }),
        methods: find({
          kind: 'function',
          memberof: v.longname
        }),
        typedefs: find({
          kind: 'typedef',
          memberof: v.longname
        }),
        fires: v.fires,
        events: find({
          kind: 'event',
          memberof: v.longname
        })
      };
    } else if (v.scope === 'global') {
      nav = {
        fileName:`${linkto(v.meta.filename)}#${v.name}`,
        type: 'global',
        longname: v.longname,
        version: v.version,
        name: v.name,
        members: find({
          kind: 'member',
          memberof: v.longname
        }),
        methods: find({
          kind: 'function',
          memberof: v.longname
        }),
        typedefs: find({
          kind: 'typedef',
          memberof: v.longname
        }),
        events: find({
          kind: 'event',
          memberof: v.longname
        })
      };
    }
    navMap[v.longname] = nav;
  });
  return navMap;
}
// 白名单， 公开接口生成文档白名单
var whiteLists = {
  classic: [
    'SuperMap.REST.AddressMatchService',
    'SuperMap.REST.DatasetService',
    'SuperMap.REST.DatasourceService',
    'SuperMap.REST.ProcessingService',
    'SuperMap.Layer.MapVLayer',
    'ElasticSearch'
  ],
  leaflet: [
    'AddressMatchService',
    'ChartService',
    'CommonServiceBase',
    'DataFlowService',
    'DatasetService',
    'DatasourceService',
    'FeatureService',
    'FieldService',
    'GeoprocessingService',
    'GridCellInfosService',
    'ImageCollectionService',
    'ImageService',
    'LayerInfoService',
    'MapService',
    'MeasureService',
    'NetworkAnalyst3DService',
    'NetworkAnalystService',
    'ProcessingService',
    'QueryService',
    'SpatialAnalystService',
    'ThemeService',
    'TrafficTransferAnalystService',
    'WebPrintingJobService',
    'BaiduTileLayer',
    'ClientComputationLayer',
    'CloudTileLayer',
    'DataFlowLayer',
    'EchartsLayer',
    'GraphicLayer',
    'HeatMapLayer',
    'ImageMapLayer',
    'ImageTileLayer',
    'LabelThemeLayer',
    'RangeThemeLayer',
    'RankSymbolThemeLayer',
    'TiandituTileLayer',
    'TiledVectorLayer',
    'TurfLayer',
    'UniqueThemeLayer',
    'ArrayStatistic',
    'BaiduCRS',
    'CartoCSS',
    'ChangeTileVersion',
    'ChartView',
    'ClientComputationView',
    'ColorsPickerUtil',
    'CommonUtil',
    'DataFlowView',
    'DataServiceQueryView',
    'DistributedAnalysisView',
    'ElasticSearch',
    'FetchRequest',
    'FileReaderUtil',
    'GeoJSONFormat',
    'GeoJSONLayerWithName',
    'GeometryGeoText',
    'GeometryMultiLineString',
    'GeometryMultiPolygon',
    'GeometryRectangle',
    'Grid',
    'IManager',
    'IPortal',
    'IPortalResource',
    'IPortalUser',
    'Lang',
    'Logo',
    'MessageBox',
    'NonEarthCRS',
    'Online',
    'OpenFileView',
    'SearchView',
    'SecurityManager',
    'ThemeDotDensity',
    'ThemeGraduatedSymbol',
    'ThemeGridRange',
    'ThemeGridUnique',
    'ThemeRange',
    'ThemeUnique',
    'TianDiTu_MercatorCRS',
    'TianDiTu_WGS84CRS',
    'TimeFlowControl',
    'UnicodeMarker',
    'WebMachineLearning',
    'WebMap',
    'WKTFormat'
  ],
  mapboxgl: [
    'AddressMatchService',
    'ChartService',
    'CommonServiceBase',
    'DataFlowService',
    'DatasetService',
    'DatasourceService',
    'FeatureService',
    'FieldService',
    'GeoprocessingService',
    'GridCellInfosService',
    'ImageCollectionService',
    'ImageService',
    'LayerInfoService',
    'MapService',
    'MeasureService',
    'NetworkAnalyst3DService',
    'NetworkAnalystService',
    'ProcessingService',
    'QueryService',
    'SpatialAnalystService',
    'ThemeService',
    'TrafficTransferAnalystService',
    'WebPrintingJobService',
    'HillshadeParameter',
    'NDVIParameter',
    'DeckglLayer',
    'GraphicLayer',
    'GraticuleLayer',
    'HeatMapLayer',
    'LabelThemeLayer',
    'MapvLayer',
    'RangeTheme3DLayer',
    'RangeThemeLayer',
    'RankSymbolThemeLayer',
    'Theme3DLayer',
    'ThreeLayer',
    'UniqueTheme3DLayer',
    'UniqueThemeLayer',
    'ArrayStatistic',
    'CartoCSS',
    'ChartView',
    'ColorsPickerUtil',
    'CommonUtil',
    'ElasticSearch',
    'FetchRequest',
    'FileReaderUtil',
    'GeoJSONFormat',
    'GeometryGeoText',
    'GeometryMultiLineString',
    'GeometryMultiPolygon',
    'GeometryRectangle',
    'Grid',
    'IManager',
    'IPortal',
    'IPortalResource',
    'IPortalUser',
    'Lang',
    'Logo',
    'MessageBox',
    'SecurityManager',
    'ThemeDotDensity',
    'ThemeGraduatedSymbol',
    'ThemeGridRange',
    'ThemeGridUnique',
    'ThemeRange',
    'ThemeUnique',
    'TimeFlowControl',
    'WebMachineLearning',
    'WebMap',
    'WKTFormat'
  ],
  maplibregl:[
    'AddressMatchService',
    'ChartService',
    'DataFlowService',
    'DatasetService',
    'DatasourceService',
    'FeatureService',
    'FieldService',
    'GeoprocessingService',
    'GridCellInfosService',
    'ImageCollectionService',
    'ImageService',
    'LayerInfoService',
    'MapService',
    'MeasureService',
    'NetworkAnalyst3DService',
    'NetworkAnalystService',
    'ProcessingService',
    'QueryService',
    'SpatialAnalystService',
    'ThemeService',
    'TrafficTransferAnalystService',
    'WebPrintingJobService',
    'DeckglLayer',
    'FGBLayer',
    'GraphicLayer',
    'GraticuleLayer',
    'HeatMapLayer',
    'MapvLayer',
    'ThreeLayer'
  ],
  openlayers: [
    'AddressMatchService',
    'ChartService',
    'CommonServiceBase',
    'DataFlowService',
    'DatasetService',
    'DatasourceService',
    'FeatureService',
    'FieldService',
    'GeoprocessingService',
    'GridCellInfosService',
    'ImageCollectionService',
    'ImageService',
    'LayerInfoService',
    'MapService',
    'MeasureService',
    'NetworkAnalyst3DService',
    'NetworkAnalystService',
    'ProcessingService',
    'QueryService',
    'SpatialAnalystService',
    'ThemeService',
    'TrafficTransferAnalystService',
    'WebPrintingJobService',
    'BaiduMap',
    'DataFlow',
    'Graphic',
    'HeatMap',
    'ImageSuperMapRest',
    'ImageTileSuperMapRest',
    'Label',
    'Mapv',
    'Range',
    'RankSymbol',
    'SuperMapCloud',
    'Tianditu',
    'TileSuperMapRest',
    'Turf',
    'Unique',
    'VectorTileSuperMapRest',
    'ArrayStatistic',
    'CartoCSS',
    'ChangeTileVersion',
    'ChartView',
    'ColorsPickerUtil',
    'CommonUtil',
    'ElasticSearch',
    'FetchRequest',
    'FileReaderUtil',
    'GeoJSONFormat',
    'GeometryGeoText',
    'GeometryMultiLineString',
    'GeometryMultiPolygon',
    'GeometryRectangle',
    'Grid',
    'IManager',
    'IPortal',
    'IPortalResource',
    'IPortalUser',
    'Lang',
    'Logo',
    'MapboxStyles',
    'MessageBox',
    'Online',
    'ScaleLine',
    'SecurityManager',
    'ThemeDotDensity',
    'ThemeGraduatedSymbol',
    'ThemeGridRange',
    'ThemeGridUnique',
    'ThemeRange',
    'ThemeUnique',
    'TimeFlowControl',
    'VectorTileStyles',
    'WebMachineLearning',
    'WebMap',
    'WKTFormat'
  ]
};

/**
 @param {TAFFY} taffyData See <http://taffydb.com/>.
 @param {object} opts
 @param {Tutorial} tutorials
 */
exports.publish = function (taffyData, opts, tutorials) {
  data = taffyData;
  var langI = env.args.indexOf('-l');
  if (langI >= 0 && env.args.length > langI + 1) {
    language = env.args[langI + 1];
  }
  var conf = env.conf.templates || {};
  conf['default'] = conf['default'] || {};

  var templatePath = opts.template;
  view = new template.Template(templatePath + '/tmpl');

  // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
  // doesn't try to hand them out later
  var indexUrl = helper.getUniqueFilename('index');
  // don't call registerLink() on this one! 'index' is also a valid longname

  var globalUrl = helper.getUniqueFilename('global');
  helper.registerLink('global', globalUrl);
  view.typeLinks = typeLinks;
  // set up templating
  view.layout = 'layout.tmpl';

  // set up tutorials for helper
  helper.setTutorials(tutorials);

  data = helper.prune(data);
  data.sort('longname, version, since');
  helper.addEventListeners(data);

  var sourceFiles = {};
  var sourceFilePaths = [];
  data().each(function (doclet) {
    doclet.attribs = '';

    if (doclet.examples) {
      doclet.examples = doclet.examples.map(function (example) {
        var caption, code;

        if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
          caption = RegExp.$1;
          code = RegExp.$3;
        }

        return {
          caption: caption || '',
          code: code || example
        };
      });
    }
    if (doclet.see) {
      doclet.see.forEach(function (seeItem, i) {
        doclet.see[i] = hashToLink(doclet, seeItem);
      });
    }

    // build a list of source files
    var sourcePath;
    var resolvedSourcePath;
    if (doclet.meta) {
      sourcePath = getPathFromDoclet(doclet);
      resolvedSourcePath = resolveSourcePath(sourcePath);
      sourceFiles[sourcePath] = {
        resolved: resolvedSourcePath,
        shortened: null
      };
      sourceFilePaths.push(resolvedSourcePath);
    }
  });
  // update outdir if necessary, then create outdir
  var packageInfo = (find({
    kind: 'package'
  }) || [])[0];
  if (packageInfo && packageInfo.name) {
    outdir = path.join(outdir, packageInfo.name, packageInfo.version);
  }
  fs.mkPath(outdir);

  // copy the template's static files to outdir
  var fromDir = path.join(templatePath, 'static');
  var staticFiles = fs.ls(fromDir, 3);

  staticFiles.forEach(function (fileName) {
    var toDir = fs.toDir(fileName.replace(fromDir, outdir));
    fs.mkPath(toDir);
    fs.copyFileSync(fileName, toDir);
  });

  // copy user-specified static files to outdir
  var staticFilePaths;
  var staticFileFilter;
  var staticFileScanner;
  if (conf['default'].staticFiles) {
    staticFilePaths = conf['default'].staticFiles.paths || [];
    staticFileFilter = new (require('jsdoc/src/filter').Filter)(conf['default'].staticFiles);
    staticFileScanner = new (require('jsdoc/src/scanner').Scanner)();

    staticFilePaths.forEach(function (filePath) {
      var extraStaticFiles = staticFileScanner.scan([filePath], 10, staticFileFilter);

      extraStaticFiles.forEach(function (fileName) {
        var sourcePath = fs.statSync(filePath).isDirectory() ? filePath : path.dirname(filePath);
        var toDir = fs.toDir(fileName.replace(sourcePath, outdir));
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
      });
    });
  }

  if (sourceFilePaths.length) {
    sourceFiles = shortenPaths(sourceFiles, path.commonPrefix(sourceFilePaths));
  }
  data().each(function (doclet) {
    var url = helper.createLink(doclet);
    helper.registerLink(doclet.longname, url);

    // replace the filename with a shortened version of the full path
    var docletPath;
    if (doclet.meta) {
      docletPath = getPathFromDoclet(doclet);
      docletPath = sourceFiles[docletPath].shortened;
      if (docletPath) {
        doclet.meta.filename = docletPath;
      }
    }
  });

  data().each(function (doclet) {
    var url = helper.longnameToUrl[doclet.longname];

    if (url.indexOf('#') > -1) {
      doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
    } else {
      doclet.id = doclet.name;
    }

    if (needsSignature(doclet)) {
      addSignatureParams(doclet);
      addSignatureReturns(doclet);
    }
  });

  // do this after the urls have all been generated
  data().each(function (doclet) {
    doclet.ancestors = getAncestorLinks(doclet);
    if (doclet.kind === 'member') {
      addSignatureTypes(doclet);
    }
    var docMemberParent = find({ longname: doclet.memberof })[0];
    if (
      doclet.kind === 'constant' ||
      (docMemberParent && docMemberParent.kind === 'class' && doclet.scope === 'static') ||
      doclet.deprecated
    ) {
      doclet.kind === 'constant' && addSignatureTypes(doclet);
      var attribs = helper.getAttribs(doclet);
      if (doclet.deprecated) {
        attribs.unshift('deprecated');
      }
      var attribsString = buildAttribsString(attribs);
      if (!attribs.length) {
        return;
      }
      doclet.attribs = util.format('<span class="type-signature">%s</span>', attribsString);
      doclet.kind === 'constant' && (doclet.kind = 'member');
    }
  });
  for (const typeLink in view.typeLinks) {
    registerLink(typeLink, view.typeLinks[typeLink]);
  }
  var members = helper.getMembers(data);
  members.tutorials = tutorials.children;
  // add template helpers
  var baseTypes = [
    'array',
    'object',
    'number',
    'string',
    'boolean',
    'date',
    'function',
    'any',
    'undefined',
    'promise',
    'THREE.CanvasRenderer',
    'pixeldata',
    'imagebitmap'
  ];
  let linkToMap = new Map();
  let linkHrefs = [];
  function getDeledLinkName(linkName) {
    const haslink_reg = /<a[^>]*href=["'](?<url>[^"']*?)["'][^>]*>(?<text>[\w\W]*?)<\/a>/g;
    let linkNames = linkName.replace(haslink_reg, '').replace(/&lt;/g, '<');
    baseTypes.forEach((reg) => {
      linkNames = linkNames.replace(new RegExp(reg, 'ig'), '');
    });
    return linkNames
      .replace(/\|/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\./g, '')
      .replace(/</g, '')
      .replace(/>/g, '');
  }
  function getLinkHref(str) {
    const haslink_reg = /<a[^>]*href=["'](?<url>[^"']*?)["'][^>]*>(?<text>[\w\W]*?)<\/a>/g;
    let res;
    let hrefs = [];
    while ((res = haslink_reg.exec(str))) {
      let href = res[1];
      const index = href.indexOf('#');
      if (index > -1) {
        href = href.substring(0, index);
      }
      if (href && !href.startsWith('http') && !hrefs.includes(href)) {
        hrefs.push(href);
      }
    }
    return hrefs;
  }
  function delBaseType(name) {
    const linkNames = getDeledLinkName(name);
    return linkNames && !Boolean(baseTypes.find((item) => linkNames === item));
  }
  function setMap(type) {
    if (!linkToMap.has(type)) {
      linkToMap.set(type, 1);
    } else {
      linkToMap.set(type, linkToMap.get(type) + 1);
    }
  }
  view.find = find;
  view.linkto = function (...data) {
    const type = data && data[0];
    // 判断是否是defaultValue
    const index = data.findIndex((item) => item === 'defaultvalue');
    const isDefaultValue = index > -1;
    if (isDefaultValue) {
      data && data.splice(index, 1);
    }
    const res = helper.linkto(...data);
    if (!type.endsWith('.js') && !baseTypes.includes(type.toLowerCase()) && !isDefaultValue) {
      const href = getLinkHref(res)[0];
      if (href && !linkHrefs.find((item) => href === item)) {
        linkHrefs.push(href);
      }
      const linkName = delBaseType(res.toLowerCase());
      if (linkName) {
        setMap(type);
      }
    }
    return res;
  };
  view.resolveAuthorLinks = resolveAuthorLinks;
  view.tutoriallink = tutoriallink;
  view.htmlsafe = htmlsafe;
  view.members = members; //@davidshimjs: To make navigation for customizing
  // once for all
  buildNav(members, view, path.resolve(templatePath, opts.configPath));
  view.navOrder = JSON.parse(fs.readFileSync(path.resolve(templatePath, './config.json')));
  view.language = language;
  generateNav(view.nav);
  attachModuleSymbols(
    find({
      kind: ['class', 'function'],
      longname: {
        left: 'module:'
      }
    }),
    members.modules
  );

  // only output pretty-printed source files if requested; do this before generating any other
  // pages, so the other pages can link to the source files
  if (conf['default'].outputSourceFiles) {
    generateSourceFiles(sourceFiles);
  }

  if (members.globals.length) {
    generate(
      'Global',
      [
        {
          kind: 'globalobj'
        }
      ],
      globalUrl
    );
  }

  // index page displays information from package.json and lists files
  var files = find({
    kind: 'file'
  });

  generate(
    'Index',
    [
      {
        kind: 'mainpage',
        readme: opts.readme,
        longname: opts.mainpagetitle ? opts.mainpagetitle : 'Main Page'
      }
    ].concat(files),
    indexUrl
  );

  // set up the lists that we'll use to generate pages
  var classes = taffy(members.classes);
  var modules = taffy(members.modules);
  var namespaces = taffy(members.namespaces);
  var mixins = taffy(members.mixins);
  var externals = taffy(members.externals);

  for (var longname in helper.longnameToUrl) {
    if (hasOwnProp.call(helper.longnameToUrl, longname)) {
      var myClasses = helper.find(classes, {
        longname: longname
      });
      if (myClasses.length) {
        generate('Class: ' + myClasses[0].name, myClasses, helper.longnameToUrl[longname]);
      }

      var myModules = helper.find(modules, {
        longname: longname
      });
      if (myModules.length) {
        generate('Module: ' + myModules[0].name, myModules, helper.longnameToUrl[longname]);
      }

      var myNamespaces = helper.find(namespaces, {
        longname: longname
      });
      if (myNamespaces.length) {
        generate('Namespace: ' + myNamespaces[0].name, myNamespaces, helper.longnameToUrl[longname]);
      }

      var myMixins = helper.find(mixins, {
        longname: longname
      });
      if (myMixins.length) {
        generate('Mixin: ' + myMixins[0].name, myMixins, helper.longnameToUrl[longname]);
      }

      var myExternals = helper.find(externals, {
        longname: longname
      });
      if (myExternals.length) {
        generate('External: ' + myExternals[0].name, myExternals, helper.longnameToUrl[longname]);
      }
    }
  }

  // TODO: move the tutorial functions to templateHelper.js
  function generateTutorial(title, tutorial, filename) {
    var tutorialData = {
      title: title,
      header: tutorial.title,
      content: tutorial.parse(),
      children: tutorial.children
    };

    var tutorialPath = path.join(outdir, filename),
      html = view.render('tutorial.tmpl', tutorialData);

    // yes, you can use {@link} in tutorials too!
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

    fs.writeFileSync(tutorialPath, html, 'utf8');
  }

  // tutorials can have only one parent so there is no risk for loops
  function saveChildren(node) {
    node.children.forEach(function (child) {
      generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
      saveChildren(child);
    });
  }
  saveChildren(tutorials);

  function buildAttribsString(attribs) {
    var attribsString = '';

    if (attribs && attribs.length) {
      attribsString = htmlsafe(util.format('(%s) ', attribs.join(', ')));
    }
    if (attribs.length === 1) {
      attribsString = attribsString.replace(/\(|\)/g, '');
    }

    return attribsString;
  }

  function getFileNames(excludeFile = ['index.html', 'nav.html']) {
    const files = fs.readdirSync(outdir);
    const tmp = [];
    files.forEach(function (item, index) {
      if (item.indexOf('.html') > -1 && !excludeFile.includes(item)) {
        tmp.push(item);
      }
    });
    return tmp;
  }
  function getWrongLink(allFiles) {
    const privateHtml = linkHrefs.filter((link) => {
      const index = allFiles.findIndex((item) => item == link);
      return index === -1;
    });
    privateHtml.forEach((item) => {
      setMap(item.replace('.html', ''));
    });
    return linkToMap;
  }

  function getHtmlLinks(allFiles) {
    let allHtmlLinks = [];
    allFiles.forEach((fileName) => {
      const html = fs.readFileSync(path.resolve(outdir, fileName));
      let urls = getLinkHref(html).filter((item) => item !== fileName);
      allHtmlLinks = allHtmlLinks.concat([], urls);
    });
    return Array.from(new Set(allHtmlLinks));
  }
  function getMorePages(allFiles, allHtmlLinks, whiteList = getWhiteLists().concat(['global'])) {
    const pages = allFiles.filter((item) => !allHtmlLinks.includes(item));
    let res = pages.filter((item) => {
      const fileName = item.replace('.html', '')
      return !whiteList.includes(fileName);
    });
    res = res.map((item) => item.replace('.html', ''));
    const service = getCategoryPage(res, ['Service', 'ServiceBase']);
    const parameter = getCategoryPage(res, ['Parameter', 'Parameters']);
    const layer = getCategoryPage(res, ['Layer']);
    const others = res.filter(
      (item) => !['Layer', 'Service', 'ServiceBase', 'Parameter', 'Parameters'].some((type) => item.endsWith(type))
    );
    return {
      service,
      parameter,
      layer,
      others
    };
  }
  function getCategoryPage(pages, types = ['Service']) {
    return pages.filter((item) => types.some((type) => item.endsWith(type)));
  }
  function getWhiteLists() {
    const dir = outdir.replace('./docs/', '');
    return whiteLists[dir];
  }

  const allFiles = getFileNames();
  console.error('生成的多余的文档页面: ', getMorePages(allFiles, getHtmlLinks(allFiles)));
  console.error('没有链接的类型: ', getWrongLink(allFiles));
};
