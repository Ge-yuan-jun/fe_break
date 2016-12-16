/**
 * link: http://www.cnblogs.com/dolphinX/p/3489269.html
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

let result = tpl.replace(/<%([^%>]+)?%>/g, (s0,s1) => data[s1])
