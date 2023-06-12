import { KnowledgeGraphEdgeParameter } from '../../../src/common/iServer';

describe('KnowledgeGraphEdgeParameter', () => {
  it('constructor destroy', () => {
    var option = {
      id: '1',
      start: '2',
      end: '3',
      type: '标签',
      properties: {}
    };
    var parametersNull = new KnowledgeGraphEdgeParameter();
    expect(parametersNull).not.toBeNull();
    var parameter = new KnowledgeGraphEdgeParameter(option);
    expect(parameter.id).toBe('1');
    expect(parameter.start).toBe('2');
    expect(parameter.end).toBe('3');
    expect(parameter.type).toBe('标签');
    expect(parameter.properties).not.toBeNull();
    expect(parameter.CLASS_NAME).toEqual('SuperMap.KnowledgeGraphEdgeParameter');
    parameter.destroy();
    expect(parameter.id).toBeNull();
    expect(parameter.start).toBeNull();
    expect(parameter.end).toBeNull();
    expect(parameter.type).toBeNull();
    expect(parameter.properties).toBeNull();
  });
});
