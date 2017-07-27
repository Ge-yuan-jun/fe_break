/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-07-27 10:41:53 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2017-07-27 14:26:55
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
