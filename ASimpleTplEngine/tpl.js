/**
 * link: http://www.cnblogs.com/dolphinX/p/3489269.html
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
    const fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tpl(document.getElementById(str).innerHTML) :
      new Function('obj',
        "let p = [], print=function() {p.push.apply(p, arguments);};" +

        // 利用with进行编译
        "with(obj) {p.push('" +

        str
          .replace(/[\r\t\n]/g, " ")  // 替换回车、制表、换行符
          .split("<%").join("\t") // 替换 <%
          // .replace(/((^|>%)[^\t]*)'/g, "$1\r") // 不明白这个正则的意义 ，最后为什么会有 '
          .replace(/\t=(.*?)%>/g, ",$1,'") // 抽离出变量，用两个逗号做标识
          .split("\t").join("');") // 替换制表符，形成正确的js语句
          .split("%>").join("p.push('")
          // .split("\r").join("\\'") // 这个正则应该是跟上面注释掉的相互呼应，暂未明白具体含义
        + "');}return p.join('');";
      );
    return data ?　fn(data) : fn;
  }
})()
