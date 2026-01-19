import {
  mapboxFilterToQueryFilter
} from '../../../src/common/util/FilterCondition';

describe('FilterCondition', () => {
  describe('mapboxFilterToQueryFilter - SQL', () => {
    it('== 普通等值', () => {
      const filter = ['==', 'name', 'Tom'];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("name == 'Tom'");
    });

    it('== null 转 IS NULL', () => {
      const filter = ['==', 'name', null];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe('name IS NULL');
    });

    it('!= null 转 IS NOT NULL', () => {
      const filter = ['!=', 'name', null];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe('name IS NOT NULL');
    });

    it('字符串单引号转义', () => {
      const filter = ['==', 'publisher', "O'Reilly"];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("publisher == 'O''Reilly'");
    });

    it('数值比较 >', () => {
      const filter = ['>', 'age', 18];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe('age > 18');
    });

    it('in 操作符', () => {
      const filter = ['in', 'status', 'A', 'B', 'C'];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("status IN ('A', 'B', 'C')");
    });

    it('!in 操作符', () => {
      const filter = ['!in', 'status', 'A', 'B'];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("status NOT IN ('A', 'B')");
    });

    it('all (AND)', () => {
      const filter = [
        'all',
        ['>', 'age', 18],
        ['==', 'gender', 'M']
      ];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("age > 18 AND gender == 'M'");
    });

    it('any (OR)', () => {
      const filter = [
        'any',
        ['==', 'type', 'A'],
        ['==', 'type', 'B']
      ];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("(type == 'A') OR (type == 'B')");
    });

    it('none (NOT AND)', () => {
      const filter = [
        'none',
        ['==', 'status', 'disabled'],
        ['<', 'age', 10]
      ];
      const result = mapboxFilterToQueryFilter(filter, 'SQL');
      expect(result).toBe("NOT (status == 'disabled') AND NOT (age < 10)");
    });

    it('非法 filter 返回空字符串', () => {
      const result = mapboxFilterToQueryFilter(['get', 'name'], 'SQL');
      expect(result).toBe('');
    });
  });

  describe('mapboxFilterToQueryFilter - XML', () => {
    it('== 普通等值', () => {
      const filter = ['==', 'name', 'Tom'];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:PropertyIsEqualTo>');
      expect(result).toContain('<fes:ValueReference>name</fes:ValueReference>');
      expect(result).toContain('<fes:Literal>Tom</fes:Literal>');
    });

    it('== null 转 PropertyIsNull', () => {
      const filter = ['==', 'name', null];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:PropertyIsNull>');
    });

    it('!= null 转 PropertyIsNotNull', () => {
      const filter = ['!=', 'name', null];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:PropertyIsNotNull>');
    });

    it('in 转 Or', () => {
      const filter = ['in', 'type', 'A', 'B'];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:Or>');
      const equalCount = (result.match(/<fes:PropertyIsEqualTo>/g) || []).length;
      expect(equalCount).toBe(2);
    });
    it('!in 转 Not + Or', () => {
      const filter = ['!in', 'type', 'A', 'B'];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:Not>');
      expect(result).toContain('<fes:Or>');
    });

    it('all 转 And', () => {
      const filter = [
        'all',
        ['>', 'age', 18],
        ['==', 'gender', 'M']
      ];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:And>');
    });

    it('any 转 Or', () => {
      const filter = [
        'any',
        ['==', 'type', 'A'],
        ['==', 'type', 'B']
      ];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      expect(result).toContain('<fes:Or>');
    });

    it('none 使用反转比较', () => {
      const filter = [
        'none',
        ['==', 'status', 'disabled'],
        ['<', 'age', 10]
      ];
      const result = mapboxFilterToQueryFilter(filter, 'XML');
      // == → != , < → >=
      expect(result).toContain('PropertyIsNotEqualTo');
      expect(result).toContain('PropertyIsGreaterThanOrEqualTo');
    });
  });
});
