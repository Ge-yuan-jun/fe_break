/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-07-03 10:23:11 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2017-07-03 10:23:31
 * @description: 函数节流的代码实现
 */


const throtte = function(fn, interval) {
    const  _self = fn,
        timer = null,
        first_time = true;

    return function() {
        const args = arguments,
            _me = this;

        if (first_time) {
            _self.apply(_me, args);
            return first_time = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me, args);
        }, interval || 500);
    }
}