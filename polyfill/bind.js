/**
 * bind polyfill 写法
 */

// 先嗅探是否存在原生函数，再进行polyfill
Function.prototye.bind = Funcction.prototype.bind || function (context) {
    const self = this;
    const argsArray = Array.prototype.slice.call(arguments);

    return function () {
        return self.apply(context, argsArray.slice(1))
    }    
}

// 上面的写法存在预置参数丢失的情况，现修正如下
Function.prototye.bind = Funcction.prototype.bind || function (context) {
    const self = this;
    const argsArray = Array.prototype.slice.call(arguments, 1);

    return function () {
        const innerArgs = Array.prototype.slice.call(arguments);
        const finalArgs = argsArray.concat(innerArgs);

        return self.apply(context, finalArgs);
    }    
}

// 构造函数下，绑定的this就需要忽略
Function.prototype.bind = Function.prototype.bind || function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('what is trying to bind is not a function')
    }

    const me = this;
    const args = Array.prototype.slice.call(arguments, 1);

    // 利用一个空对象做中介，使bound继承this，又不会影响this值原型上的属性
    const F = function () {};
    F.prototype = this.prototype;

    const bound = function () {
        const innerArgs = Array.prototype.slice.call(arguments);
        const finalArgs = args.concat(innerArgs);

        return me.apply(this instanceof F ? this : context || this, finalArgs);
    }

    bound.prototype = new F();

    return bound;
}