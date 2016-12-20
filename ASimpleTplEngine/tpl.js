/**
 * link1: http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html
 * link2: https://github.com/JuneAndGreen/treasure-box/blob/master/template_engine/string_base/src/tpl.js
 * <ul>
 *  <% for ( var i = 0; i < users.length; i++ ) { %>
 *       <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
 *  <% } %>
 * </ul>
 */

/**
 * 默认的过滤器，防止注入
 */
const defaultFilter = {
  escape: (str) => {
    const escapeMap = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      ' ': '&nbsp',
      '"': '&quot;',
      "'": '&#39;',
      '\n': '<br/>',
      '\r': ''
    }

    return str.replace(/\<|\>|\&|\'|\"|\n|\r/g, (match) => escapeMap[match]);
  }
}
// let result = tpl.replace(/<%([^%>]+)?%>/g, (s0,s1) => data[s1])
let tplEngine = (tpl, data) => {
  const reg = /<%([^%>]+)?%>/g;
  const regJs = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
  let [code, cursor, match] = ['let r = []; \n', 0, []];  // cursor的作用定位所匹配的代码的最后一节
  const add = (line, js) => {
    js? (code += line.match(regJs) ? `${line}\n` : `r.push(${line});\n`) :
        (code += `r.push("${line.replace(/"/g, '\\"')}");\n`);
    return add;
  };

  while (match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index))(match[1], true); // 1.添加非逻辑部分 2.添加逻辑部分 match[0] = "<%" + match[1] + "%>"(链式调用)
    cursor = match.index + match[0].length;
  }

  add(tpl.substr(cursor, tpl.length - cursor)); // 增加代码的最后一段

  code += 'return r.join("");'; // 返回结果

  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
