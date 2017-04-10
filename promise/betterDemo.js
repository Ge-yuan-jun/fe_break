
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

