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
    const fn = !/\W/.test(str) ? cache[str] = cache[str] || tpl(document.getElementById(str).innerHTML) : new Function();
    return data ?　fn(data) : fn;
  }
})()
