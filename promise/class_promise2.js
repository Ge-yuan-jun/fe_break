class MergeRequest {
    constructor (max, delay, request) {
        this.max = max;
        this.delay = delay;
        this.request = request;
        this.storage = {};
        this.timer = null;
        this.deferred = {};
        this.init();
    }

    init () {
        this.storage = {};

        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = null;
    }

    ready () {
        let { storage, delay } = this;
        
        if (Object.keys(storage).length >= 100) {
            this.launch();
        } else if (!this.timer) {
            setTimeout(this.launch.bind(this), delay)
        }
    }

    launch () {
        const { storage, deferred } = this;
        this.init();

        this.request(Object.keys(storage)).then(profileList => {
            
            let res = {};
            profileList.forEach(item => {
                res[item.uid] = item;
            });

            deferred.resolve(res)
            
        }).catch(deferred.reject);
    }

    add (id) {
        const self= this;

        this.storage[id] = 0;

        return new Promise((resolve, reject) => {
            self.deferred = { resolve, reject };
            self.ready();
        }).then(res => {
            if (res[id]) {
                return res[id];
            } else {
                throw new Error('no data');
            }
        })
    }
}