/**
 * article: http://www.alloyteam.com/2016/10/implement-a-simple-template-engine/
 * code: https://github.com/JuneAndGreen/treasure-box/blob/master/template_engine/string_base/src/tpl.js
 * 变量： {{}}
 */

const parseTpl = (() => {
  /**
   * 默认过滤器
   */
  const defaultFilter = {};

  /**
   * 解析模板
   * @param  {string} content 模板字符串
   * @param  {object} data    模板所需变量
   * @param  {object} filter  过滤器
   * @return {function}       调用执行方法
   */
  const doParseTpl = (content, data, filter) => {

    // 初始化模板处理
    content = content.replace(/\t/g, '  ').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    let [out, struct] = [[], [
      'try { var OUT = [];',
      '', // 模板生成器占位符
      'return OUT.join(\'\');} catch(e) { throw e; }'
    ]];

    // 返回方法传入两个参数 DATA以及FILTER
    return new Function('DATA', 'FILTER', struct.join(''));
  }

  /**
   * 返回函数
   */
  return (content, data, filter) => {
    try {
      data = data || {};
      filter = Object.assign({}, defaultFilter, filter);
      const f = doParseTpl(content, data, filter);
      return f(data, filter);
    } catch (e) {
      throw new Error('parse Error,please try again!')
    }
  }
})();
