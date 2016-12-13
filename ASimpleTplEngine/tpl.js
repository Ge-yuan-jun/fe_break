/**
 * <ul>
 *  <% for ( var i = 0; i < users.length; i++ ) { %>
 *       <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
 *  <% } %>
 * </ul>
 */

const tpl = (() => {
  let cache = {};
  /**
   * param:
   * str String html结构的id名
   * data String 模板结构
   */
  this.tpl = function tpl(str, data) {
    const fn = !/\W/.test(str) ? cache[str] = cache[str] || tpl(document.getElementById(str).innerHTML) : new Function('obj',
        'let p = [], print=function() {p.push.apply(p, arguments);};' +

        // 利用with进行编译
        'with(obj) {p.push(' +

        str
          .replace(/[\r\t\n]/g, ' ')  // 替换回车、制表、换行符
          .split('<%').join('\t') // 替换 <%

        ')}'
      );
    return data ?　fn(data) : fn;
  }
})()
