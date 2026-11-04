import { XMLParser } from 'fast-xml-parser';

/**
 * fast-xml-parser 升级兼容性测试
 * 用于验证从 5.5.9 升级到 5.12.0 是否影响现有功能
 *
 * 覆盖的使用场景：
 * - src/common/mapping/WebMapService.js (WMS/WMTS Capabilities 解析)
 * - src/openlayers/mapping/WebMap.js (WMTS 比例尺解析)
 * - src/mapboxgl/mapping/WebMap.js
 * - src/maplibregl/mapping/WebMap.js
 */
describe('FastXmlParserUpgrade', () => {

  // ========================================
  // 测试数据：模拟真实的 WMS/WMTS Capabilities XML
  // ========================================

  const WMS_CAPABILITIES_XML = `<?xml version="1.0" encoding="UTF-8"?>
<WMS_Capabilities version="1.3.0" xmlns="http://www.opengis.net/wms">
  <Service>
    <Name>WMS</Name>
    <Title>SuperMap iServer WMS</Title>
  </Service>
  <Capability>
    <Layer>
      <Title>Test Layer</Title>
      <LatLonBoundingBox minx="-180" miny="-90" maxx="180" maxy="90"/>
      <EX_GeographicBoundingBox>
        <westBoundLongitude>-180</westBoundLongitude>
        <southBoundLatitude>-90</southBoundLatitude>
        <eastBoundLongitude>180</eastBoundLongitude>
        <northBoundLatitude>90</northBoundLatitude>
      </EX_GeographicBoundingBox>
    </Layer>
  </Capability>
</WMS_Capabilities>`;

  const WMTS_CAPABILITIES_XML = `<?xml version="1.0" encoding="UTF-8"?>
<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1">
  <ows:OperationsMetadata>
    <ows:Operation name="GetTile">
      <ows:DCP>
        <ows:HTTP>
          <ows:Get href="http://example.com/wmts">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>KVP</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
        </ows:HTTP>
      </ows:DCP>
    </ows:Operation>
    <ows:Operation name="GetCapabilities">
      <ows:DCP>
        <ows:HTTP>
          <ows:Get href="http://example.com/wmts"/>
        </ows:HTTP>
      </ows:DCP>
    </ows:Operation>
  </ows:OperationsMetadata>
  <Contents>
    <Layer>
      <ows:Identifier>layer1</ows:Identifier>
      <ows:Title>Test Layer 1</ows:Title>
      <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
      </Style>
      <ResourceURL format="image/png" resourceType="tile" template="http://example.com/tile/{TileMatrix}/{TileRow}/{TileCol}.png"/>
    </Layer>
    <Layer>
      <ows:Identifier>layer2</ows:Identifier>
      <ows:Title>Test Layer 2</ows:Title>
      <Style isDefault="false">
        <ows:Identifier>style1</ows:Identifier>
      </Style>
      <ResourceURL format="image/jpeg" resourceType="tile" template="http://example.com/tile2/{TileMatrix}/{TileRow}/{TileCol}.jpg"/>
    </Layer>
    <TileMatrixSet>
      <ows:Identifier>GoogleMapsCompatible</ows:Identifier>
      <TileMatrix>
        <ows:Identifier>0</ows:Identifier>
        <ScaleDenominator>559082264.0287178</ScaleDenominator>
        <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>
      <TileMatrix>
        <ows:Identifier>1</ows:Identifier>
        <ScaleDenominator>279541132.0143589</ScaleDenominator>
        <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>2</MatrixHeight>
      </TileMatrix>
    </TileMatrixSet>
    <TileMatrixSet>
      <ows:Identifier>EPSG:4326</ows:Identifier>
      <TileMatrix>
        <ows:Identifier>0</ows:Identifier>
        <ScaleDenominator>559082264.0287176</ScaleDenominator>
      </TileMatrix>
    </TileMatrixSet>
  </Contents>
</Capabilities>`;

  // ========================================
  // 测试组 1: WMS Capabilities 解析
  // 对应 src/common/mapping/WebMapService.js:184
  // ========================================

  describe('WMS Capabilities Parsing', () => {
    let parser;
    let capabilities;

    beforeEach(() => {
      // 使用项目中实际的配置
      parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_'
      });
      capabilities = parser.parse(WMS_CAPABILITIES_XML);
    });

    it('should parse WMS_Capabilities root node', () => {
      expect(capabilities.WMS_Capabilities).toBeDefined();
    });

    it('should parse version attribute with @_ prefix', () => {
      const version = capabilities.WMS_Capabilities['@_version'];
      expect(version).toBe('1.3.0');
    });

    it('should parse LatLonBoundingBox attributes', () => {
      const wmsCapabilities = capabilities.WMS_Capabilities;
      const latlonBounds = wmsCapabilities['Capability']['Layer']['LatLonBoundingBox'];

      expect(latlonBounds).toBeDefined();
      expect(latlonBounds['@_minx']).toBe('-180');
      expect(latlonBounds['@_miny']).toBe('-90');
      expect(latlonBounds['@_maxx']).toBe('180');
      expect(latlonBounds['@_maxy']).toBe('90');
    });

    it('should parse EX_GeographicBoundingBox elements', () => {
      const wmsCapabilities = capabilities.WMS_Capabilities;
      const exBounds = wmsCapabilities['Capability']['Layer']['EX_GeographicBoundingBox'];

      expect(exBounds).toBeDefined();
      expect(String(exBounds['westBoundLongitude'])).toBe('-180');
      expect(String(exBounds['southBoundLatitude'])).toBe('-90');
      expect(String(exBounds['eastBoundLongitude'])).toBe('180');
      expect(String(exBounds['northBoundLatitude'])).toBe('90');
    });

    it('should convert bounds to numbers correctly', () => {
      const wmsCapabilities = capabilities.WMS_Capabilities;
      const latlonBounds = wmsCapabilities['Capability']['Layer']['LatLonBoundingBox'];

      // 模拟实际代码中的转换
      const bounds = [
        +latlonBounds['@_minx'],
        +latlonBounds['@_miny'],
        +latlonBounds['@_maxx'],
        +latlonBounds['@_maxy']
      ];

      expect(bounds).toEqual([-180, -90, 180, 90]);
    });
  });

  // ========================================
  // 测试组 2: WMTS Capabilities 解析（带命名空间）
  // 对应 src/common/mapping/WebMapService.js:244
  // ========================================

  describe('WMTS Capabilities Parsing with Namespace', () => {
    let parser;
    let capabilities;

    beforeEach(() => {
      // 用于决定哪些字段必须返回数组格式
      const alwaysArray = ['Layer', 'TileMatrixSet', 'ows:Operation', 'ows:Get', 'ResourceURL', 'Style'];

      parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        isArray: (name) => {
          return alwaysArray.indexOf(name) !== -1;
        }
      });

      capabilities = parser.parse(WMTS_CAPABILITIES_XML).Capabilities;
    });

    it('should parse Capabilities root node', () => {
      expect(capabilities).toBeDefined();
    });

    it('should parse Layer as array', () => {
      const layers = capabilities.Contents.Layer;
      expect(Array.isArray(layers)).toBe(true);
      expect(layers.length).toBe(2);
    });

    it('should parse TileMatrixSet as array', () => {
      const tileMatrixSet = capabilities.Contents.TileMatrixSet;
      expect(Array.isArray(tileMatrixSet)).toBe(true);
      expect(tileMatrixSet.length).toBe(2);
    });

    it('should parse ows:Operation as array', () => {
      const operations = capabilities['ows:OperationsMetadata']['ows:Operation'];
      expect(Array.isArray(operations)).toBe(true);
      expect(operations.length).toBe(2);
    });

    it('should parse Operation name attribute', () => {
      const operations = capabilities['ows:OperationsMetadata']['ows:Operation'];
      const getTileOp = operations.find(item => item['@_name'] === 'GetTile');

      expect(getTileOp).toBeDefined();
      expect(getTileOp['@_name']).toBe('GetTile');
    });

    it('should parse ows:Get as array', () => {
      const operations = capabilities['ows:OperationsMetadata']['ows:Operation'];
      const getTileOp = operations.find(item => item['@_name'] === 'GetTile');
      const getConstraints = getTileOp['ows:DCP']['ows:HTTP']['ows:Get'];

      expect(Array.isArray(getConstraints)).toBe(true);
    });

    it('should parse ResourceURL as array for all layers', () => {
      const layers = capabilities.Contents.Layer;

      layers.forEach(layer => {
        expect(Array.isArray(layer.ResourceURL)).toBe(true);
      });
    });

    it('should parse Style as array for all layers', () => {
      const layers = capabilities.Contents.Layer;

      layers.forEach(layer => {
        expect(Array.isArray(layer.Style)).toBe(true);
      });
    });
  });

  // ========================================
  // 测试组 3: WMTS 比例尺解析（无命名空间前缀）
  // 对应 src/openlayers/mapping/WebMap.js:685,1685
  // ========================================

  describe('WMTS Scale Parsing without Namespace Prefix', () => {
    let parser;
    let capabilities;

    // 用于 jpath 测试的节点路径
    const WMTS_ARRAY_NODE_PATHS = [
      'Capabilities.Contents.Layer',
      'Capabilities.Contents.TileMatrixSet',
      'Capabilities.Contents.TileMatrixSet.TileMatrix'
    ];

    beforeEach(() => {
      parser = new XMLParser({
        attributeNamePrefix: '',
        ignoreAttributes: false,
        removeNSPrefix: true,
        isArray: (name, jpath) => {
          return WMTS_ARRAY_NODE_PATHS.includes(jpath);
        }
      });

      capabilities = parser.parse(WMTS_CAPABILITIES_XML).Capabilities;
    });

    it('should remove namespace prefix', () => {
      // 检查命名空间前缀是否被移除
      expect(capabilities.OperationsMetadata).toBeDefined();
      expect(capabilities.Contents.Layer[0].Identifier).toBeDefined();
    });

    it('should parse TileMatrix as array', () => {
      const tileMatrixSet = capabilities.Contents.TileMatrixSet;

      expect(Array.isArray(tileMatrixSet)).toBe(true);

      const googleMatrix = tileMatrixSet.find(t => t.Identifier === 'GoogleMapsCompatible');
      expect(googleMatrix).toBeDefined();
      expect(Array.isArray(googleMatrix.TileMatrix)).toBe(true);
    });

    it('should extract ScaleDenominator values correctly', () => {
      // 模拟 getWMTSScales 方法
      const content = capabilities.Contents;
      const tileMatrixSet = content.TileMatrixSet;
      const identifier = 'GoogleMapsCompatible';
      let scales = [];

      for (let i = 0; i < tileMatrixSet.length; i++) {
        if (tileMatrixSet[i].Identifier === identifier) {
          for (let h = 0; h < tileMatrixSet[i].TileMatrix.length; h++) {
            scales.push(tileMatrixSet[i].TileMatrix[h].ScaleDenominator);
          }
          break;
        }
      }

      expect(scales.length).toBe(2);
      expect(String(scales[0])).toBe('559082264.0287178');
      expect(String(scales[1])).toBe('279541132.0143589');
    });

    it('should parse attributes without prefix', () => {
      const layer = capabilities.Contents.Layer[0];

      // 属性应该没有前缀（attributeNamePrefix: ''）
      const styles = Array.isArray(layer.Style) ? layer.Style : [layer.Style];
      expect(styles[0].isDefault).toBe('true');
    });
  });

  // ========================================
  // 测试组 4: 边界情况和安全性
  // ========================================

  describe('Edge Cases and Security', () => {
    it('should handle HTML entities correctly', () => {
      const xmlWithEntities = `<?xml version="1.0"?>
<root>
  <text>Test &amp; &lt;tag&gt; &quot;quotes&quot;</text>
</root>`;

      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(xmlWithEntities);

      expect(result.root.text).toBe('Test & <tag> "quotes"');
    });

    it('should handle empty and whitespace nodes', () => {
      const xmlWithSpaces = `<?xml version="1.0"?>
<root>
  <empty></empty>
  <whitespace>   </whitespace>
  <text>value</text>
</root>`;

      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(xmlWithSpaces);

      expect(result.root).toBeDefined();
      expect(result.root.text).toBe('value');
    });

    it('should handle deeply nested structures', () => {
      const deepXml = `<?xml version="1.0"?>
<level1>
  <level2>
    <level3>
      <level4>
        <level5>deep value</level5>
      </level4>
    </level3>
  </level2>
</level1>`;

      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(deepXml);

      expect(result.level1.level2.level3.level4.level5).toBe('deep value');
    });

    it('should handle Unicode characters', () => {
      const unicodeXml = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <chinese>中文测试</chinese>
  <emoji>🌏🗺️</emoji>
</root>`;

      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(unicodeXml);

      expect(result.root.chinese).toBe('中文测试');
      expect(result.root.emoji).toBe('🌏🗺️');
    });

    it('should not crash with large scale denominator values', () => {
      // 测试大数值处理
      const largeNumberXml = `<?xml version="1.0"?>
<root>
  <scale>559082264.0287178</scale>
</root>`;

      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(largeNumberXml);

      expect(result.root.scale).toBeDefined();
      expect(typeof result.root.scale === 'number' || typeof result.root.scale === 'string').toBe(true);
    });
  });
});
