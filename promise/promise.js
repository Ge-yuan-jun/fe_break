function Promise (executor) {

  this.status = 'pending';
  this.data = undefined;
  this.onResolvedCallback = [];
  this.onRejectedCallback = [];

  function resolve () {
    // todo
  }

  function reject () {
    // todo
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

} 