/**
 * article: http://www.alloyteam.com/2016/10/implement-a-simple-template-engine/
 * code: https://github.com/JuneAndGreen/treasure-box/blob/master/template_engine/string_base/src/tpl.js
 * 变量： {{}}
 */

const parseTpl = (() => {

  // 定义处理字符串的正则
  const regMap = [
    // if语句开始
    {reg: /^if\s+(.+)/i, val: (all, condition) => { return `if (${condition}) {` }},
    // elseif语句开始
    {reg: /^elseif\s+(.+)/i, val: (all, condition) => { return `} else if (${condition}) {`}},
    // else语句开始
    {reg: /^else/i, val: '} else {'},
    // if语句结束
    {reg: /^\/\s*if/i, val: '}'},
    // list语句开始
    {reg: /^list\s+([\S]+)\s+as\s+([\S]+)/i, val: (all, arr, item) => {return `for(var _INDEX_ = 0; _INDEX_ < ${arr}.length; _INDEX_++) {var ${item}=${arr}[_INDEX_];var ${item}_index=_INDEX_;`}},
    // list语句结束
    {reg: /^\/\s*list/i, val: '}'},
    // var声明语句处理
    {reg: /^var\s+(.+)/i, val: (all, expr) => {return `var ${expr};`}}
  ];
  /**
   * 默认过滤器
   */
  const defaultFilter = {
    // 防注入
    escape: (str) => {
      let escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        ' ': '&nbsp;',
        '"': '&quot;',
        "'": '&#39;',
        '\n': '<br/>',
        '\r': ''
      };

      return str.replace(/\<|\>|\&|\r|\n|\s|\'|\"/g, (one) => escapeMap[one]);
    }
  };

  /* 转换模板字符串语句 */
  let transStm = (stmJs) => {
    stmJs = stmJs.trim();
    for (let item of regMap) {
      if (item.reg.test(stmJs)) {
        return (typeof item.val === 'function') ? stmJs.replace(item.reg, item.val) : item.val;
      }
    }
  };

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

    // 初始化模板变量
    let vars = [];
    Object.keys(data).forEach((name) => {
      vars.push(`var ${name} = DATA['${name}'];`);
    });
    out.push(vars.join(''));

    // 初始化过滤器
    let filters = ['var FILTERS = {};'];
    Object.keys(filter).forEach((name) => {
      if (typeof filter[name] === 'function') {
        filters.push(`FILTERS['${name}'] = FILTER['${name}'];`);
      }
    });
    out.push(filters.join(''));



    // 返回方法传入两个参数 DATA以及FILTER
    struct[1] = out.join('');
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

export default parseTpl;
