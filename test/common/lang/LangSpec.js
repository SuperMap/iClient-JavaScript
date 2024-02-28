import { Lang } from '../../../src/common/lang/Lang';

describe('Lang', () => {
  const originCookie = window.document.cookie;
  afterAll(() => {
    window.document.cookie = originCookie;
  });
  afterEach(() => {
    Lang.code = null;
  });
  it('getLang_nocookie', () => {
    window.document.cookie = '';
    expect(Lang.getCode()).toBe('zh-CN');
  });
  it('getLang_zh-CN', () => {
    window.document.cookie = 'language=en-US';
    expect(Lang.getCode()).toBe('en-US');
  });
  it('getLang_zh', () => {
    window.document.cookie = 'language=zh';
    expect(Lang.getCode()).toBe('zh-CN');
  });
});
