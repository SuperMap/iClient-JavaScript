import { KnowledgeGraphNodeParameter } from '../../../src/common/iServer';

describe('KnowledgeGraphNodeParameter', () => {
  it('constructor destroy', () => {
    var option = {
      id: '1',
      labels: ['标签'],
      properties: {}
    };
    var parametersNull = new KnowledgeGraphNodeParameter();
    expect(parametersNull).not.toBeNull();
    var parameter = new KnowledgeGraphNodeParameter(option);
    expect(parameter.id).toBe('1');
    expect(parameter.labels[0]).toBe('标签');
    expect(parameter.properties).not.toBeNull();
    expect(parameter.CLASS_NAME).toEqual('SuperMap.KnowledgeGraphNodeParameter');
    parameter.destroy();
    expect(parameter.id).toBeNull();
    expect(parameter.labels).toBeNull();
    expect(parameter.properties).toBeNull();
  });
});
