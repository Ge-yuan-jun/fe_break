/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-07-27 10:41:53 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2017-07-27 11:39:05
 * @desc: 观察者模式的简单实现
 */

const event = {
  clientList: [],
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger() {
    const key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key]

    if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
      return false
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  // 取消订阅的事件
  remove(key, fn) {
    let fns = this.clientList[key]
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
}

const installEvent = (obj) => {
  for (let i in event) {
    obj[i] = event[i]
  }
}

// example

const salesOffices = []
installEvent(salesOffices)

salesOffices.listen('squareMeter88', fn1 = (price) => {
  console.log(`价格=${price}`)
})

salesOffices.listen('squareMeter100', (price) => {
  console.log(`价格=${price}`)  
})

salesOffices.trigger('squareMeter88', 2000000)
setTimeout(() => {
  salesOffices.trigger('squareMeter100', 3000000)
  salesOffices.remove('squareMeter88', fn1)
}, 5000)

setTimeout(() => {
  salesOffices.trigger('squareMeter88', 2000010)
}, 6000)
