//现在有一个 Ajax 接口，根据用户 uid 获取用户 profile 信息，是一个批量接口。我把这个 ajax 请求封装成以下的异步函数
let count = 0;
var requestUserProfile = function(uidList){  // uidList 是一个数组，最大接受 100 个 uid
  // 这个方法的实现不能修改
  console.log('--count--', count++);
  console.log(uidList.length);
  /** 先去重 */
  var uidList = uidList || [];
  var _tmp = {};
  var _uidList = [];
  uidList.forEach(function(uid){
    if(!_tmp[uid]){
      _tmp[uid] = 1;
      _uidList.push(uid);
    }
  })
  _tmp = null;
  uidList = null;
  
  return Promise.resolve().then(function(){
    return new Promise(function(resolve, reject){
      setTimeout(function(){ // 模拟 ajax 异步，1s 返回
        resolve();
      }, 1000);
    }).then(function(){
      var profileList = _uidList.map(function(uid){
        if(uid < 0){  // 模拟 uid 传错，服务端异常，获取不到部分 uid 对应的 profile 等异常场景
          return null;
        }else{
          return {
            uid: uid,
            nick: uid + 'Nick',
            age: 18
          }
        }
      });
      return profileList.filter(function(profile){
        return profile !== null;
      });
    });
  });
}

// 现在我们有很多业务都需要根据 uid 获取 userProfile , 大多数业务的需求都是给一个 uid，获取 profile 。为了性能，我们需要把这个单个的请求合并成批量请求。

// 例如，现在页面上 A 模块需要获取 uid 为 1 的 profile，B 模块需要 uid 为 2 的 profile， C 模块需要获取 uid 为 1 的profile
// 这三个模块会单独调用下面这个方法获取 profile，假设这三次调用的时间非常接近(100ms 以内)，最终要求只发送一个 ajax 请求（只调用一次 requestUserProfile )，拿到这三个模块需要的 profile

// 完成以下方法，接收一个参数 uid，返回一个 Promise，当成功请求到 profile 的时候， resolve 对应的profile , 请求失败 reject
// 例如  getUserProfile(1).then(function(profile){ console.log(profile.uid === 1) // true });  // 假设请求成功了。
var getUserProfile = function(uid){
  // 你需要实现这个方法。
  return requestPrepare.add(uid);
}

var requestPrepare = {
    storage: [],
    max: 100,
    timer: null,
    delay: 100,
    deferred: {},
    // promise对象
    sender: {},    
    add: function (uid) {
        const self = this;
        
        if (!this.deferred.resolve) {
            this.reset();
        }

        this.storage.push(uid);
        this.ready();
        
        return this.sender.then(function (res) {
            if (res[uid]) {
                return res[uid];
            } else {
                throw new Error('no data');
            }
        }, () => {
            throw new Error('no data');
        });
    },
    reset: function () {
        const self = this;
        this.storage = [];

        this.sender = new Promise(function (resolve, reject) {
            // deferred 只是相当于一个状态的过渡，并不做处理
            self.deferred = { resolve, reject }   
        });
    },
    ready: function () {

        clearTimeout(this.timer);
        
        if (this.storage.length >= this.max ) {
            this.launch();
            return false;
        }

        this.timer = setTimeout(this.launch.bind(this), this.delay);
    },
    launch: function () {
        const self = this;
        const { storage, reset, deferred } = self;
        self.reset();

        requestUserProfile(storage).then(function (profileList) {
            let res = {};
            profileList.forEach(item => res[item.uid] = item);
            deferred.resolve(res);
        }, deferred.reject);
    }
}

function test(flag,id){
  getUserProfile(id)
    .then(function(res){
      console.log(`test${flag}:resolve`,res);
    })
    .catch(function(err){
      console.log(`test${flag}:reject`,err);
    })
}

// test(1,1);
// test(2,-1);
// test(3,2);
// test(4,2);

// setTimeout(function(){
//   test(5,3);
// },10);

setTimeout(function(){
  test(6,4);
},12);

setTimeout(function(){
  test(7,-1);
  test(8,5);
},200);

// test(9,2);

for (let i = 10 ; i < 300; i++){
  let id = Math.round((Math.random() - 0.1)*1000);
  test(i,id);
}