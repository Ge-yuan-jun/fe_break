/**
 * link: http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html
 * let result = tpl.replace(/<%([^%>]+)?%>/g, (s0,s1) => data[s1])
 * var tpl = '<% for(var i = 0; i < this.posts.length; i++) {' +　
 *     'var post = posts[i]; %>' +
 *     '<% if(!post.expert){ %>' +
 *         '<span>post is null</span>' +
 *     '<% } else { %>' +
 *         '<a href="#"><% post.expert %> at <% post.time %></a>' +
 *     '<% } %>' +
 * '<% } %>';
 * tplEngine(tpl, data);
 */

/**
 * 解析模板
 */
let tplEngine = (tpl, data) => {

  // 定义正则
  const reg = /<%([^%>]+)?%>/g;
  const regJs = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;

  // 初始化模板变量
  let [code, cursor, match] = ['let r = []; \n', 0, []];  // cursor的作用定位所匹配的代码的最后一节
  const add = (line, js) => {
    js? (code += line.match(regJs) ? `${line}\n` : `r.push(${line});\n`) :
        (code += `r.push("${line.replace(/"/g, '\\"')}");\n`);
    return add;
  };

  // 解析模板内容
  while (match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index))(match[1], true); // 1.添加非逻辑部分 2.添加逻辑部分 match[0] = "<%" + match[1] + "%>"(链式调用)
    cursor = match.index + match[0].length;
  }
  add(tpl.substr(cursor, tpl.length - cursor)); // 增加代码的最后一段

  // 返回结果
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
