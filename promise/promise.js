function Promise (executor) {
  
  const self = this;
  this.status = 'pending'; // promise当前的状态
  this.data = undefined; // promise的值
  this.onResolvedCallback = []; // promise resolve时的回调函数，可能有多个回调
  this.onRejectedCallback = []; // promise reject时的回调函数，可能有多个回调

  function resolve (value) {

    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }

    // 保证异步调用执行
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    }, 0)

  }

  function reject (reason) {

    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    }, 0)

  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

} 

function resolvePromise (promise2, x, resolve, reject) {
  let then,
    thenCalledOrThrow = false;

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'));
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function (v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, function rs (y) {
          if (thenCalledOrThrow) return;
          thenCalledOrThrow = true;
          return resolvePromise(promise2, y, resolve, reject);
        }, function rj (r) {
          if (thenCalledOrThrow) return;
          thenCalledOrThrow = true;
          return reject(r);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  let promise2;

  // 判断onResolved, onRejected是否是function，不是则需要重置处理(做值的穿透处理)
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) { return v; };
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) { throw r; };

  if (self.status === 'resolved') {
    
    return promise2 = new Promise(function (resolve, reject) {

      setTimeout(function () {
        try {
        
          let x = onResolved(self.data);

          resolvePromise(promise2, x, resolve, reject);

        } catch (e) {
          
          reject(e);
        
        }
      })
    
    })

  } 
  
  if (self.status === 'rejected') {
    
    return promise2 = new Promise(function (resolve, reject) {

      setTimeout(function () {
      
        try {

          let x = onRejected(self.data);

          resolvePromise(promise2, x, resolve, reject);

        } catch (e) {

          reject(e);
        
        }

      })

    })

  } 
  
  if (self.status === 'pending') {
    
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        
        try {

          let x = onResolved(value);

          resolvePromise(promise2, x, resolve, reject);

        } catch (e) {

          reject(e);

        }

      });

      self.onRejectedCallback.push(function (reason) {
        
        try {
          
          let x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);

        } catch (e) {

          reject(e);

        }

      })
    })

  }

}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

// for test usage
Promise.deferred = Promise.defer = function () {
  let dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;