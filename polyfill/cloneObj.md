
## 拷贝对象的方法

### 一、浅拷贝

#### 手动遍历
```
function shadowCopy (src) {
    let tmp = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            tmp[prop] = src[prop];
        }
    }

    return tmp;
}
```
#### es6方法
`let newObj = Object.assign({}, someObj)` 


### 二、深拷贝
 
#### JSON安全的对象
`let newObj = JSON.parse(JSON.stringify(someObj));`

#### jQuery方法
`let newObj = $.extend(true, {}, someObj)`

#### lodash方法
- `_.clone(obj, true)`
- `_.cloneDeep(obj)`

### 参考
[深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)



