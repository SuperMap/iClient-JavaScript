/**
 * 获取url的某个查询参数值
 */
export function getQueryValue(url, key) {
  const reg = new RegExp('(^|&|\\?)' + key + '=([^&]*)(&|$)');
  const match = reg.exec(url);
  if (match && match.length >= 3) {
    return match[2];
  }
  return null;
}