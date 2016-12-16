/**
 * link: http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html
 * <ul>
 *  <% for ( var i = 0; i < users.length; i++ ) { %>
 *       <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
 *  <% } %>
 * </ul>
 */

const tpl = 'hi, my name is <%name%>, and i\'m <%age%> years old';
let data = {
  name: 'Matthew',
  age: '20'
}

// let result = tpl.replace(/<%([^%>]+)?%>/g, (s0,s1) => data[s1])
let tplEngine = (tpl, data) => {
  const reg = /<%([^%>]+)?%>/g;
  let [code, cursor, match] = ['let r = []; \n', 0, []];  // cursor的作用定位所匹配的代码的最后一节
  const add = (line) => {
    code += `r.push("${line.replace(/"/g, '\\"')}");\n`
  }

  while (match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index)); // 添加非逻辑部分
    add(match[1]); // 添加逻辑部分 match[0] = "<%" + match[1] + "%>"
    cursor = match.index + match[0].length;
  }

  add(tpl.substr(cursor, tpl.length - cursor)); // 增加代码的最后一段

  code += 'return r.join("");'; // 返回结果

  console.log(code)
}
