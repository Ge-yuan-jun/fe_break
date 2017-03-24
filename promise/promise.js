function Promise (executor) {
  
  const self = this;
  this.status = 'pending'; // promise当前的状态
  this.data = undefined; // promise的值
  this.onResolvedCallback = []; // promise resolve时的回调函数，可能有多个回调
  this.onRejectedCallback = []; // promise reject时的回调函数，可能有多个回调

  function resolve (value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      for (let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject (reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      for (let i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason);
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

} 

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  let promise2;

  // 判断onResolved, onRejected是否是function，不是则需要重置处理
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) {};
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) {};

  if (self.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject) {

    })
  } else if (self.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {

    })
  } else if (self.status === ' pending') {
    promise2 = new Promise(function (resolve, reject) {

    })
  }

  return promise2;

}