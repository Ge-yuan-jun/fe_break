/**
 * article: http://www.alloyteam.com/2016/10/implement-a-simple-template-engine/
 * code: https://github.com/JuneAndGreen/treasure-box/blob/master/template_engine/string_base/src/tpl.js
 * 变量： {{}}
 */

const parseTpl = (() => {

  let store = {};

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
   * @param  {string} id      模板引擎的唯一标识（性能优化）
   * @return {function}       调用执行方法
   */
  const doParseTpl = (content, data, filter, id) => {

    if (!store[id]) {
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

      let beg = 0; // 解析文段起始位置
      let stmbeg = 0; // 表达式起始位置
      let stmend = 0; // 表达式结束位置
      let len = content.length;
      let preCode = ''; // 表达式前的代码
      let endCode = ''; // 最后一段代码
      let stmJs = ''; // 表达式
      while (beg < len) {
        // 开始符
        stmbeg = content.indexOf('{', beg);

        // 在 ‘{’ 遇到转义 ‘\’ 的情况
        while (content.charAt(stmbeg - 1) === '\\') {
          stmbeg = content.indexOf('{', stmbeg + 1);
        }

        if (stmbeg === -1) {
          // 到达最后一段代码
          endCode = content.substr(beg);
          out.push('OUT.push(\'' + endCode + '\');');
          break;
        }

        /* 结束符 */
        stmend = content.indexOf('}', stmbeg);
        while (content.charAt(stmend - 1) === '\\') {
          stmend = content.indexOf('}', stmend + 1);
        }

        if (stmend === -1) {
          // 没有结束符】
          break;
        }

        // 开始符之前的代码
        preCode = content.substring(beg, stmbeg);

        if (content.charAt(stmbeg - 1) === '$') {
          // 针对变量
          out.push(`OUT.push(\'${preCode.substr(0, preCode.length - 1)}\');`);
          stmJs = content.substring(stmbeg + 1, stmend);

          // 处理过滤器
          let tmp = '';
          stmJs.spilt('|').forEach((item, index) => {
            if (index === 0) {
              // 变量
              tmp = item;
            } else {
              // 过滤器
              let farr = item.split(':');
              tmp = `FILTERS['${farr[0]}'](${tmp}`;

              if (farr[1]) {
                // 带变量的过滤器
                farr[1].split(',').forEach((fitem) => {
                  tmp = `${tmp}, ${fitem}`;
                });
              }

              tmp = `${tmp})`; // 追加结尾
            }
          });

          out.push(`OUT.push((${tmp}).toString());`);
        } else {
          // 针对js
          out.push(`OUT.push(\'${preCode}\');`);
          stmJs = content.substring(stmbeg + 1, stmend);
          out.push(transStm(stmJs));
        }
        beg = stmend + 1;
      }


      // 返回方法传入两个参数 DATA以及FILTER
      struct[1] = out.join('');

      // 缓存此代码
      store[id] = new Function('DATA', 'FILTER', struct.join(''));
    }


    return store[id];
  }

  /**
   * 返回函数
   */
  return (content, data, filter, id) => {
    try {
      data = data || {};
      filter = Object.assign({}, defaultFilter, filter);
      const f = doParseTpl(content, data, filter, id);
      return f(data, filter);
    } catch (e) {
      throw new Error('parse Error,please try again!')
    }
  }
})();

export default parseTpl;
