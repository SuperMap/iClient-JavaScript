---
name: ogcCapabilities
description: 通过工具函数解析 WMTS/WMS Capabilities，并为 MapLibre raster source 准备瓦片参数。
---

# OGC Capabilities 解析工具

此工具供生成的页面按需调用，不会在 skill 加载或识别 URL 时自动执行。它使用 `fast-xml-parser` 解析服务返回的 XML，并返回可用图层及 raster source 所需信息。

## 浏览器依赖

在使用工具函数前，将解析器脚本放在调用代码之前：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/5.2.5/fxparser.min.js"></script>
```

此版本在浏览器中提供 `window.XMLParser.default`。WMTS/WMS 服务还需允许浏览器跨域读取 Capabilities；否则 `fetch` 会失败，应通过服务端 CORS 配置或受控代理解决。

## 工具函数

将以下 JavaScript 放入页面脚本中。工具函数抛出错误而不是返回空图层；调用方应捕获并向用户展示错误。

```javascript
function asArray(value) {
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
}

function xmlText(value) {
    if (value == null) return '';
    if (Array.isArray(value)) return xmlText(value[0]);
    if (typeof value === 'object') return xmlText(value['#text']);
    return String(value).trim();
}

function xmlAttribute(node, name) {
    return node && node['@_' + name] != null ? String(node['@_' + name]) : '';
}

function normalizeCRS(value) {
    var crs = xmlText(value).trim();
    if (/CRS:?84/i.test(crs)) return 'CRS:84';
    if (/EPSG/i.test(crs)) {
        var codes = crs.match(/\d+/g);
        if (codes && codes.length) return 'EPSG:' + codes[codes.length - 1];
    }
    return crs.toUpperCase();
}

function urlWithParams(serviceUrl, params) {
    var url = new URL(serviceUrl, window.location.href);
    Object.keys(params).forEach(function(name) {
        Array.from(url.searchParams.keys())
            .filter(function(key) { return key.toLowerCase() === name.toLowerCase(); })
            .forEach(function(key) { url.searchParams.delete(key); });
        url.searchParams.set(name, params[name]);
    });
    return url.toString().replace(/%7B([^%]+)%7D/gi, '{$1}');
}

function parseOgcXML(xml) {
    if (!window.XMLParser || typeof window.XMLParser.default !== 'function') {
        throw new Error('缺少 XML 解析器，请先加载 fast-xml-parser。');
    }
    var xmlDocument = new DOMParser().parseFromString(xml, 'application/xml');
    if (xmlDocument.getElementsByTagName('parsererror').length) {
        throw new Error('Capabilities 响应包含无效 XML。');
    }
    var parser = new window.XMLParser.default({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        removeNSPrefix: true,
        parseTagValue: false,
        parseAttributeValue: false
    });
    var parsed = parser.parse(xml);
    var rootName = parsed && Object.keys(parsed)[0];
    if (!rootName) throw new Error('Capabilities 响应不是有效的 XML 文档。');
    if (rootName === 'ExceptionReport' || rootName === 'ServiceExceptionReport') {
        throw new Error('OGC 服务返回异常：' + xmlText(parsed[rootName].ExceptionText || parsed[rootName].ServiceException));
    }
    return parsed;
}

async function fetchCapabilities(serviceUrl, service) {
    if (!serviceUrl) throw new Error('必须提供 WMTS/WMS 服务地址。');
    var params = { SERVICE: service, REQUEST: 'GetCapabilities' };
    if (service === 'WMTS') params.VERSION = '1.0.0';
    var response;
    try {
        response = await fetch(urlWithParams(serviceUrl, params), {
            headers: { Accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8' }
        });
    } catch (error) {
        throw new Error(service + ' Capabilities 请求失败：' + error.message);
    }
    if (!response.ok) {
        throw new Error(service + ' Capabilities 请求失败，HTTP 状态码：' + response.status);
    }
    var xml = await response.text();
    if (!xml.trim()) throw new Error(service + ' Capabilities 响应为空。');
    return parseOgcXML(xml);
}

function findDocument(parsed, rootNames, service) {
    for (var index = 0; index < rootNames.length; index += 1) {
        if (parsed[rootNames[index]]) return parsed[rootNames[index]];
    }
    throw new Error('响应中没有有效的 ' + service + ' Capabilities 根节点。');
}

function getGeographicBounds(layer) {
    if (!layer) return undefined;
    var geographic = layer.EX_GeographicBoundingBox;
    if (geographic) {
        var bounds = [
            Number(xmlText(geographic.westBoundLongitude)),
            Number(xmlText(geographic.southBoundLatitude)),
            Number(xmlText(geographic.eastBoundLongitude)),
            Number(xmlText(geographic.northBoundLatitude))
        ];
        if (bounds.every(Number.isFinite)) return bounds;
    }
    var latLon = layer.LatLonBoundingBox;
    if (latLon) {
        var legacyBounds = [
            Number(xmlAttribute(latLon, 'minx')),
            Number(xmlAttribute(latLon, 'miny')),
            Number(xmlAttribute(latLon, 'maxx')),
            Number(xmlAttribute(latLon, 'maxy'))
        ];
        if (legacyBounds.every(Number.isFinite)) return legacyBounds;
    }
    return undefined;
}

function getWmtsZoomMapping(matrices) {
    var rows = asArray(matrices).map(function(matrix) {
        var id = xmlText(matrix.Identifier);
        var match = id.match(/^(.*?)(\d+)$/);
        if (!match || String(Number(match[2])) !== match[2]) {
            throw new Error('TileMatrix 标识符不能安全映射到 MapLibre {z}：' + id);
        }
        var width = Number(xmlText(matrix.TileWidth));
        var height = Number(xmlText(matrix.TileHeight));
        if (!Number.isInteger(width) || width < 1 || width !== height) {
            throw new Error('TileMatrix 必须使用正整数且宽高相同的瓦片尺寸：' + id);
        }
        return { id: id, prefix: match[1], zoom: Number(match[2]), tileSize: width };
    }).sort(function(left, right) { return left.zoom - right.zoom; });

    if (!rows.length) throw new Error('TileMatrixSet 中没有 TileMatrix 定义。');
    for (var index = 0; index < rows.length; index += 1) {
        if (rows[index].prefix !== rows[0].prefix ||
            (index > 0 && rows[index].zoom !== rows[index - 1].zoom + 1) ||
            rows[index].tileSize !== rows[0].tileSize) {
            throw new Error('TileMatrix 标识符或瓦片尺寸无法映射为连续的 MapLibre 缩放级别。');
        }
    }
    return {
        matrixTemplate: encodeURIComponent(rows[0].prefix) + '{z}',
        minzoom: rows[0].zoom,
        maxzoom: rows[rows.length - 1].zoom,
        tileSize: rows[0].tileSize
    };
}

function getWmtsKvpUrl(capabilities) {
    var operations = asArray(capabilities.OperationsMetadata && capabilities.OperationsMetadata.Operation);
    var operation = operations.find(function(item) { return xmlAttribute(item, 'name') === 'GetTile'; });
    var gets = asArray(operation && operation.DCP && operation.DCP.HTTP && operation.DCP.HTTP.Get);
    for (var index = 0; index < gets.length; index += 1) {
        var constraints = asArray(gets[index].Constraint);
        var encodings = [];
        constraints.forEach(function(constraint) {
            asArray(constraint.AllowedValues && constraint.AllowedValues.Value)
                .forEach(function(value) { encodings.push(xmlText(value)); });
        });
        var href = xmlAttribute(gets[index], 'href');
        if (href && (!encodings.length || encodings.includes('KVP'))) return href;
    }
    return '';
}

function resolveTemplateUrl(template, serviceUrl) {
    var tokens = [];
    var safeTemplate = template.replace(/\{[^}]+\}/g, function(token) {
        var index = tokens.push(token) - 1;
        return '__OGC_TOKEN_' + index + '__';
    });
    var resolved = new URL(safeTemplate, serviceUrl).toString();
    return resolved.replace(/__OGC_TOKEN_(\d+)__/g, function(_, index) {
        return tokens[Number(index)];
    });
}

function makeWmtsTileUrl(template, serviceUrl, values) {
    if (!template) return '';
    return resolveTemplateUrl(template, serviceUrl)
        .replace(/\{Layer\}/gi, encodeURIComponent(values.layer))
        .replace(/\{Style\}/gi, encodeURIComponent(values.style))
        .replace(/\{Format\}/gi, encodeURIComponent(values.format))
        .replace(/\{TileMatrixSet\}/gi, encodeURIComponent(values.matrixSet))
        .replace(/\{TileMatrix\}/gi, values.matrixTemplate)
        .replace(/\{TileRow\}/gi, '{y}')
        .replace(/\{TileCol\}/gi, '{x}');
}

async function getWMTSCapabilities(serviceUrl, mapCRS) {
    var parsed = await fetchCapabilities(serviceUrl, 'WMTS');
    var capabilities = findDocument(parsed, ['Capabilities'], 'WMTS');
    var contents = capabilities.Contents;
    if (!contents) throw new Error('WMTS Capabilities 中没有 Contents。');
    var requestedCRS = normalizeCRS(mapCRS || 'EPSG:3857');
    var matrixSets = new Map();

    asArray(contents.TileMatrixSet).forEach(function(matrixSet) {
        var setId = xmlText(matrixSet.Identifier);
        var crs = normalizeCRS(matrixSet.SupportedCRS);
        if (!setId || crs !== requestedCRS) return;
        try {
            matrixSets.set(setId, Object.assign(
                { crs: crs },
                getWmtsZoomMapping(matrixSet.TileMatrix)
            ));
        } catch (error) {
            matrixSets.set(setId, { crs: crs, error: error.message });
        }
    });

    var kvpUrl = getWmtsKvpUrl(capabilities);
    var layers = [];
    var unsupportedLayers = [];
    asArray(contents.Layer).forEach(function(layer) {
        var layerId = xmlText(layer.Identifier);
        var links = asArray(layer.TileMatrixSetLink);
        var selected;
        for (var index = 0; index < links.length; index += 1) {
            var setId = xmlText(links[index].TileMatrixSet);
            var info = matrixSets.get(setId);
            if (info && !info.error) {
                selected = { link: links[index], setId: setId, info: info };
                break;
            }
        }
        if (!selected) {
            unsupportedLayers.push({
                layerId: layerId,
                reason: '没有与 ' + requestedCRS + ' 匹配且可映射的 TileMatrixSet。'
            });
            return;
        }

        var allMatrices = asArray(
            asArray(contents.TileMatrixSet).find(function(item) {
                return xmlText(item.Identifier) === selected.setId;
            }).TileMatrix
        );
        var limits = asArray(selected.link.TileMatrixSetLimits && selected.link.TileMatrixSetLimits.TileMatrixLimits);
        if (limits.length) {
            var allowedIds = new Set(limits.map(function(limit) { return xmlText(limit.TileMatrix); }));
            allMatrices = allMatrices.filter(function(matrix) { return allowedIds.has(xmlText(matrix.Identifier)); });
        }
        var zoom;
        try {
            zoom = getWmtsZoomMapping(allMatrices);
        } catch (error) {
            unsupportedLayers.push({ layerId: layerId, reason: error.message });
            return;
        }

        var styles = asArray(layer.Style);
        var selectedStyle = styles.find(function(style) {
            return xmlAttribute(style, 'isDefault').toLowerCase() === 'true';
        }) || styles[0];
        var styleId = xmlText(selectedStyle && selectedStyle.Identifier);
        var formats = asArray(layer.Format).map(xmlText).filter(Boolean);
        var format = formats.find(function(value) { return /^image\/png$/i.test(value); }) ||
            formats.find(function(value) { return /^image\/(jpeg|jpg)$/i.test(value); }) ||
            formats[0];
        if (!format) {
            unsupportedLayers.push({ layerId: layerId, reason: 'Capabilities 未提供图像格式。' });
            return;
        }

        var resource = asArray(layer.ResourceURL).find(function(item) {
            return xmlAttribute(item, 'resourceType').toLowerCase() === 'tile' &&
                xmlAttribute(item, 'template');
        });
        var resourceFormat = xmlAttribute(resource, 'format');
        if (resourceFormat) {
            var supportedResourceFormat = formats.find(function(value) {
                return value.toLowerCase() === resourceFormat.toLowerCase();
            });
            if (supportedResourceFormat) {
                format = supportedResourceFormat;
            } else {
                resource = undefined;
            }
        }
        var tileUrl = resource
            ? makeWmtsTileUrl(xmlAttribute(resource, 'template'), serviceUrl, {
                layer: layerId,
                style: styleId,
                format: format,
                matrixSet: selected.setId,
                matrixTemplate: zoom.matrixTemplate
            })
            : '';
        if (!tileUrl && kvpUrl) {
            tileUrl = urlWithParams(resolveTemplateUrl(kvpUrl, serviceUrl), {
                SERVICE: 'WMTS',
                REQUEST: 'GetTile',
                VERSION: xmlAttribute(capabilities, 'version') || '1.0.0',
                Layer: layerId,
                Style: styleId,
                TileMatrixSet: selected.setId,
                Format: format,
                TileMatrix: zoom.matrixTemplate,
                TileRow: '{y}',
                TileCol: '{x}'
            });
        }
        if (!tileUrl) {
            unsupportedLayers.push({ layerId: layerId, reason: '没有可用的 WMTS REST 模板或 KVP GetTile 地址。' });
            return;
        }

        var box = layer.WGS84BoundingBox;
        var lower = xmlText(box && box.LowerCorner).split(/\s+/).map(Number);
        var upper = xmlText(box && box.UpperCorner).split(/\s+/).map(Number);
        var bounds = lower.length >= 2 && upper.length >= 2
            ? [lower[0], lower[1], upper[0], upper[1]]
            : undefined;
        layers.push({
            layerId: layerId,
            title: xmlText(layer.Title) || layerId,
            style: styleId,
            format: format,
            matrixSet: selected.setId,
            crs: selected.info.crs,
            tileUrl: tileUrl,
            tileSize: zoom.tileSize,
            minzoom: zoom.minzoom,
            maxzoom: zoom.maxzoom,
            bounds: bounds
        });
    });

    if (!layers.length) {
        var detail = unsupportedLayers.map(function(item) {
            return item.layerId + '：' + item.reason;
        }).join('；');
        throw new Error('没有可用于 ' + requestedCRS + ' raster source 的 WMTS 图层。' + (detail ? ' ' + detail : ''));
    }
    return {
        version: xmlAttribute(capabilities, 'version') || '1.0.0',
        crs: requestedCRS,
        layers: layers,
        unsupportedLayers: unsupportedLayers
    };
}

function buildWMSRasterUrl(serviceUrl, version, layerInfo, options) {
    options = options || {};
    var crs = normalizeCRS(options.crs || layerInfo.crs);
    if (crs !== 'EPSG:3857') {
        throw new Error('当前 WMS raster source 模板仅支持 EPSG:3857 的 {bbox-epsg-3857}。');
    }
    var format = options.format || layerInfo.defaultFormat;
    if (!layerInfo.formats.includes(format)) {
        throw new Error('WMS 图层不支持请求的图像格式：' + format);
    }
    var style = options.style == null ? layerInfo.defaultStyle : options.style;
    if (style && !layerInfo.styles.some(function(item) { return item.name === style; })) {
        throw new Error('WMS 图层不支持请求的样式：' + style);
    }
    var params = {
        SERVICE: 'WMS',
        VERSION: version,
        REQUEST: 'GetMap',
        FORMAT: format,
        TRANSPARENT: 'TRUE',
        LAYERS: layerInfo.layerId,
        STYLES: style || '',
        WIDTH: '256',
        HEIGHT: '256',
        BBOX: '{bbox-epsg-3857}'
    };
    params[parseFloat(version) >= 1.3 ? 'CRS' : 'SRS'] = crs;
    return urlWithParams(serviceUrl, params);
}

function collectWmsLayers(layer, parentCRS, parentBounds, requestedCRS, formats, version, serviceUrl, output, unsupported) {
    if (!layer) return;
    var crsValues = parentCRS.concat(
        asArray(layer.CRS).concat(asArray(layer.SRS))
            .flatMap(function(value) { return xmlText(value).split(/\s+/).filter(Boolean); })
    );
    var bounds = getGeographicBounds(layer) || parentBounds;
    var layerId = xmlText(layer.Name);
    if (layerId) {
        var crs = crsValues.find(function(value) {
            return normalizeCRS(value) === requestedCRS;
        });
        if (!crs) {
            unsupported.push({ layerId: layerId, reason: '图层未声明 ' + requestedCRS + ' 坐标系。' });
        } else {
            var styles = asArray(layer.Style).map(function(style) {
                return {
                    name: xmlText(style.Name),
                    title: xmlText(style.Title)
                };
            });
            var imageFormat = formats.find(function(value) { return /^image\/png$/i.test(value); }) || formats[0];
            var info = {
                layerId: layerId,
                title: xmlText(layer.Title) || layerId,
                crs: requestedCRS,
                styles: styles,
                defaultStyle: styles[0] ? styles[0].name : '',
                formats: formats,
                defaultFormat: imageFormat,
                bounds: bounds
            };
            info.tileUrl = buildWMSRasterUrl(serviceUrl, version, info);
            output.push(info);
        }
    }
    asArray(layer.Layer).forEach(function(child) {
        collectWmsLayers(child, crsValues, bounds, requestedCRS, formats, version, serviceUrl, output, unsupported);
    });
}

async function getWMSCapabilities(serviceUrl, mapCRS) {
    var requestedCRS = normalizeCRS(mapCRS || 'EPSG:3857');
    if (requestedCRS !== 'EPSG:3857') {
        throw new Error('当前 WMS raster source 工具仅生成 EPSG:3857 的 {bbox-epsg-3857} 请求模板。');
    }
    var parsed = await fetchCapabilities(serviceUrl, 'WMS');
    var capabilities = findDocument(parsed, ['WMS_Capabilities', 'WMT_MS_Capabilities'], 'WMS');
    var capability = capabilities.Capability;
    var rootLayer = capability && capability.Layer;
    if (!rootLayer) throw new Error('WMS Capabilities 中没有 Capability.Layer。');
    var formats = asArray(capability.Request && capability.Request.GetMap && capability.Request.GetMap.Format)
        .map(xmlText)
        .filter(Boolean);
    if (!formats.length) throw new Error('WMS Capabilities 未声明 GetMap 图像格式。');
    var version = xmlAttribute(capabilities, 'version') || '1.1.1';
    var layers = [];
    var unsupportedLayers = [];
    collectWmsLayers(rootLayer, [], undefined, requestedCRS, formats, version, serviceUrl, layers, unsupportedLayers);
    if (!layers.length) {
        var detail = unsupportedLayers.map(function(item) {
            return item.layerId + '：' + item.reason;
        }).join('；');
        throw new Error('没有可用于 ' + requestedCRS + ' raster source 的 WMS 图层。' + (detail ? ' ' + detail : ''));
    }
    return {
        version: version,
        crs: requestedCRS,
        formats: formats,
        layers: layers,
        unsupportedLayers: unsupportedLayers
    };
}
```

## 返回结果和错误处理

* `getWMTSCapabilities(url, mapCRS)` 返回 `version`、`crs`、`layers` 和 `unsupportedLayers`。每个可用图层包含 `tileUrl`、`tileSize`、`minzoom`、`maxzoom`、`matrixSet` 及可选 `bounds`。
* `getWMSCapabilities(url, mapCRS)` 返回 `version`、`crs`、`formats`、`layers` 和 `unsupportedLayers`。每个图层包含 `layerId`、样式、格式、`tileUrl` 及可选地理范围；可用 `buildWMSRasterUrl()` 重新指定样式或格式。
* 请求失败、无效 XML、无兼容图层、无图像格式或不支持的投影/瓦片矩阵会抛出错误。调用方必须捕获并显示错误，不要将异常转换为空图层。
* WMTS 仅将同一前缀且连续的数字 `TileMatrix` 标识符映射到 MapLibre `{z}`。非连续、非数字或不同瓦片尺寸的矩阵会列在 `unsupportedLayers`，不应猜测层级对应关系。
* 当前 WMS 工具生成 `EPSG:3857` 的 `{bbox-epsg-3857}` 请求模板；WMS 1.3.0 使用 `CRS` 参数，1.1.x 使用 `SRS`。需要其他坐标系时应扩展并验证对应 BBOX 模板和轴顺序。
