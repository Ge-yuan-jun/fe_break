/**
 * 此代码问题有如下：
 * 1. const self = getUserProfile
 * 函数内部引用本身，如果存在闭包，可能有问题，在原型链上访问不到getUserProfile
 * 
 * 2. requestUserProfile(...
 * 直接调用requestUserProfile存在一个问题，如果全局中不存在这样的变量呢？
 * @param {*} uid 
 */

var getUserProfile = function(uid){
    const self = getUserProfile;

    const send = (uidArr) => {
        reset();
        requestUserProfile(uidArr.map(item => item.uid)).
            then(function (profileList) {
                uidArr.forEach((item) => {
                    const profile = profileList.find( p => p && p.uid === item.uid);
                    profile ? item.resolve(profile) : item.reject({uid: profile})
                })
            }) 
    }

    const reset = () => {
        self.uidArr = [];
        if (self.timer) {
            clearTimeout(self.timer);
        }
    }

    return new Promise(function (resolve, reject) {
        self.uidArr = self.uidArr || [];
        self.uidArr.push({uid, resolve, reject});

        if (self.uidArr.length >= 100) {
            const { uidArr } = self;
            send(uidArr);
        } else if (!self.timer) {
            const { uidArr } = self;            
            self.timer = setTimeout(() => {send(uidArr)}, 100)
        }
    })
}

