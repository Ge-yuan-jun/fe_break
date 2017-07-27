/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-07-27 10:41:53 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2017-07-27 16:36:51
 * @desc: 观察者模式的简单实现
 * 利用全局对象Event来实现，订阅者不需要知道消息来自哪个发送者
 * 发布者也不知道消息会推送给给哪些订阅者
 */

const Event = (() => {
  let clientList = [],
    listen,
    trigger,
    remove;

  listen = (key, fn) => {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  trigger = (key, ...args) => {
    const fns = clientList[key]

    if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
      return false
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.call(this, ...args)
    }
  }
  // 取消订阅的事件
  remove = (key, fn) => {
    let fns = clientList[key]
    if (!fns) { // 如果key对应的消息没有被人订阅，则直接返回
      return false
    }
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应的消息的所有订阅
      fns & (fns.length = 0)
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i]
        if (_fn === fn) {
          fns.splice(i, 1) // 删除订阅者的回调函数
        }
      }
    }
  }

  return {
    listen,
    trigger,
    remove
  }
})()

// example
Event.listen('squareMeter88', fn1 = (price) => {
  console.log(`价格=${price}`)
})

Event.listen('squareMeter100', (price) => {
  console.log(`价格=${price}`)  
})

Event.trigger('squareMeter88', 2000000)
setTimeout(() => {
  Event.trigger('squareMeter100', 3000000)
  Event.remove('squareMeter88', fn1)
}, 5000)

setTimeout(() => {
  Event.trigger('squareMeter88', 2000010)
}, 6000)

/*************************创建命名空间***************************/

/**
 * 确保
 */
var Event = (() => {
  var global = this,
    Event,
    _default = 'default';
  
  Event = function() {
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function(ary, fn) {
        var ret
        for (var i = 0, l = ary.length; i < l; i++ ) {
          var n = ary[i]
          ret = fn.call(n, i, n)
        }
        return ret
      }

    _listen = function(key, fn, cache) {
      if (!cache[key]) {
        cache[key] = []
      }
      cache[key].push(fn)
    }

    _remove = function(key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i>= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1)
            }
          }
        } else {
          cache[key] = []
        }
      }
    }

    _trigger = function() {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key]

      if (!stack || !stack.length) {
        return
      }

      return each(stack, function() {
        return this.apply(_self, args)
      })
    }

    _create = function(namespace) {
      var namespace = namespace || _default
      var cache = {},
        offlineStack = [], // 离线事件
        ret = {
          listen: function(key, fn, last) {
            _listen(key, fn, cache)
            if (offlineStack === null) {
              return
            }
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()
            } else {
              each(offlineStack, function() {
                this()
              })
            }
            offlineStack = null
          },
          one: function(key, fn, last) {
            _remove(key, cache)
            this.listen(key, fn, last)
          },
          remove: function(key, fn) {
            _remove(key, cache, fn)
          },
          trigger: function() {
            var fn,
              args,
              _self = this;
            
              _unshift.call(arguments, cache)
              args = arguments
              fn = function() {
                return _trigger.apply(_self, args)
              }

              if (offlineStack) {
                return offlineStack.push(fn)
              }
              return fn()
          }
        }

      return namespace 
        ? (namespaceCache[namespace] 
          ? namespaceCache[namespace]
          : namespaceCache[namespace] = ret)
        : ret
    }
    return {
      create: _create,
      one: function(key, fn, last) {
        var event = this.create()
        event.one(key, fn, last)
      },
      remove: function(key, fn) {
        var event = this.create();
        event.remove(key, fn)
      },
      listen: function(key, fn, last) {
        var event = this.create()
        event.listen(key, fn, last)
      },
      trigger: function() {
        var event = this.create()
        event.trigger.apply(this, arguments)
      }
    }
  }()
  return Event
})()
