import {IManagerCreateNodeParam} from '../../../src/common/iManager/iManagerCreateNodeParam';

describe('iManagerCreateNodeParam', () => {
    it('constructor', () => {
        var options = {
            nodeName: 'test',
            password: 'test',
            description: 'test',
            physicalMachineName: 'physicalMachineNameTest',
            userName: 'user'
        };
        var iManagerCreateNodeParam = new IManagerCreateNodeParam(options);
        expect(iManagerCreateNodeParam).not.toBeNull();
        expect(iManagerCreateNodeParam.nodeSpec).toBe('SMALL');
        expect(iManagerCreateNodeParam.nodeCount).toBe(1);
        expect(iManagerCreateNodeParam.nodeName).toBe("test");
        expect(iManagerCreateNodeParam.password).toBe("test");
        expect(iManagerCreateNodeParam.description).toBe("test");
        expect(iManagerCreateNodeParam.physicalMachineName).toBe("physicalMachineNameTest");
        expect(iManagerCreateNodeParam.userName).toBe("user");
    })
});