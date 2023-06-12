import uniqBy from 'lodash.uniqby';

export function transformGraphMap(data, style) {
  const rst = { nodes: [], edges: [] };
  data.forEach((item) => {
    const pathData = item.path;
    if (pathData) {
      const { nodes, edges } = transformPath(pathData, style);
      rst.nodes.push(...nodes);
      rst.edges.push(...edges);
    } else if (isEdge(item)) {
      const edge = edgeFromGraphMap(item, style);
      rst.edges.push(edge);
    } else {
      const node = nodeFromGraphMap(item, style);
      rst.nodes.push(node);
    }
  });
  return { nodes: uniqData(rst.nodes), edges: uniqData(rst.edges, 'edgeId') };
}

export function uniqData(data, paramName = 'id') {
  return uniqBy(data, paramName);
}

function isEdge(entity) {
  return entity.hasOwnProperty('start') && entity.hasOwnProperty('end');
}

function transformPath(pathData, style) {
  const rst = { nodes: [], edges: [] };
  pathData.forEach((item) => {
    if (isEdge(item)) {
      const edge = edgeFromGraphMap(item, style);
      rst.edges.push(edge);
    } else {
      const node = nodeFromGraphMap(item, style);
      rst.nodes.push(node);
    }
  });
  return rst;
}

export function nodeFromGraphMap(entity, style) {
  const { id, properties, lables } = entity;
  const styleData = style ? getNodeStyle(entity, style) : {};
  const label = getNodeLabel(entity);
  const fillColor = styleData.fillColor || '';
  const node = {
    id: id + '',
    label: label,
    properties,
    lables
  };
  if (styleData.size) {
    node.size = styleData.size;
    delete styleData.size;
  }
  if (styleData.fillColor) {
    node.style = {
      fill: fillColor,
      stroke: fillColor
    };
    delete styleData.fillColor;
  }
  if (Object.keys(styleData).length !== 0) {
    node.labelCfg = {
      style: styleData
    };
  }
  return node;
}
export function edgeFromGraphMap(entity, style) {
  const { start, end, id, type, properties } = entity;
  const styleData = style ? getEdgeStyle(entity, style) : {};
  return {
    source: start + '',
    target: end + '',
    edgeId: id + '',
    label: type,
    labelCfg: {
      style: styleData
    },
    properties
  };
}

function getEdgeStyle(entity, style) {
  if (!style) {
    return {};
  }
  const { id, type } = entity;
  const data = style.filter((item) => item.type === 'relationShip');
  for (let i = 0; i < data.length; i++) {
    const { textColor, font, relationTypes, relationIds } = data[i];
    const ids = JSON.parse(relationIds || '[]');
    const types = JSON.parse(relationTypes || '[]');
    if (ids.includes(id) || types.includes(type)) {
      return {
        fontSize: compileFontSize(font.fontSize),
        fontFamily: font.fontName,
        fill: textColor,

        ...formatFontStyle(font.fontStyle)
      };
    }
  }
  return {};
}

function getNodeStyle(entity, style) {
  if (!style) {
    return {};
  }
  const { id, labels } = entity;
  const data = style.filter((item) => item.type === 'entity');
  for (let i = 0; i < data.length; i++) {
    const { color, textColor, font, size, entityTypes, entityIds } = data[i];
    const ids = JSON.parse(entityIds || '[]');
    const types = JSON.parse(entityTypes || '[]');
    if (ids.includes(id) || types.includes(labels[0])) {
      return {
        fillColor: color,
        fontSize: compileFontSize(font.fontSize),
        fontFamily: font.fontName,
        fill: textColor,
        size: size,
        // stroke: color,
        ...formatFontStyle(font.fontStyle)
      };
    }
  }
  return {};
}

function getNodeLabel(entity) {
  const { properties } = entity;
  const name = properties.labelfieldname;
  return properties[name] || '';
}

function formatFontStyle(fontStyle) {
  if (fontStyle === 1) {
    return { fontWeight: 600 };
  }
  if (fontStyle === 2) {
    return { fontStyle: 'italic' };
  }
  return {};
}

function compileFontSize(fontSize) {
  return fontSize * 0.8;
}
