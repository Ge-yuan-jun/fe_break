### 一、template1使用方法

将js语句利用`<% %>`包裹起来就可以进行模板的编译工作

示例如下：
```
var tpl = '<% for(var i = 0; i < this.posts.length; i++) {' +　
       'var post = posts[i]; %>' +
       '<% if(!post.expert){ %>' +
           '<span>post is null</span>' +
       '<% } else { %>' +
           '<a href="#"><% post.expert %> at <% post.time %></a>' +
       '<% } %>' +
   '<% } %>';
```

### 二、template2使用方法

将js语句利用`{ }`包裹起来

例如：

if语句的使用方法：
```
{if condition1}

{elseif condition2}

{else}

{/if}
```

数组遍历的使用方法：
```
{list array as item}
// code
{/list}
```

变量定义：
```
{var a = 1}
```

插值：
```
// 直接插值
${a}

// 使用过滤器
${a|filter1|filter2:b, c}
```
